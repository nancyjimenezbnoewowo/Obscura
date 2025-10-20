// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, ebool, euint64, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

contract PrivateAuction is SepoliaConfig {
    function version() external pure returns (string memory) {
        return "PrivateAuction/1.0.0";
    }

    enum AuctionState {
        Active,
        Ended,
        Canceled,
        Settled
    }

    struct Auction {
        uint256 auctionId;
        address seller;
        string itemName;
        string itemDescription;
        string ipfsHash;
        AuctionState state;
        uint256 startTime;
        uint256 endTime;
        euint64 reservePrice;
        bool hasReserve;
        euint64 winningBid;
        address winningBidder;
        bool hasWinner;
        uint256 totalBids;
        bool settled;
    }

    struct Bid {
        uint256 bidId;
        uint256 auctionId;
        address bidder;
        euint64 bidAmount;
        ebool meetsReserve;
        ebool isHighest;
        uint256 timestamp;
        bool processed;
        bool withdrawn;
    }

    uint256 public auctionCount;
    uint256 public bidCount;

    mapping(uint256 => Auction) private _auctions;
    mapping(uint256 => Bid) private _bids;
    mapping(uint256 => uint256[]) private _auctionBids;
    mapping(address => uint256[]) private _userBids;

    uint256 public constant MIN_AUCTION_DURATION = 1 hours;
    uint256 public constant MAX_AUCTION_DURATION = 30 days;

    event AuctionCreated(uint256 indexed auctionId, address indexed seller, string itemName, uint256 endTime);
    event BidPlaced(uint256 indexed bidId, uint256 indexed auctionId, address indexed bidder, bytes32 bidAmountHandle);
    event AuctionEnded(uint256 indexed auctionId, address indexed winner, bytes32 winningBidHandle);
    event AuctionCanceled(uint256 indexed auctionId);
    event AuctionSettled(uint256 indexed auctionId, address indexed winner, address indexed seller);
    event BidWithdrawn(uint256 indexed bidId, address indexed bidder);

    error AuctionNotFound();
    error AuctionNotActive();
    error AuctionNotEnded();
    error AuctionAlreadyEnded();
    error Unauthorized();
    error InvalidDuration();
    error AlreadyProcessed();
    error NoWinner();
    error AlreadySettled();
    error CannotWithdraw();

    modifier onlySeller(uint256 auctionId) {
        Auction storage a = _auctions[auctionId];
        require(a.seller != address(0), "auction not found");
        require(msg.sender == a.seller, "not seller");
        _;
    }

    modifier auctionActive(uint256 auctionId) {
        Auction storage a = _auctions[auctionId];
        require(a.state == AuctionState.Active, "auction not active");
        require(block.timestamp < a.endTime, "auction ended");
        _;
    }

    modifier auctionEnded(uint256 auctionId) {
        Auction storage a = _auctions[auctionId];
        require(block.timestamp >= a.endTime || a.state == AuctionState.Ended, "auction not ended");
        _;
    }

    function createAuction(
        string calldata itemName,
        string calldata itemDescription,
        string calldata ipfsHash,
        uint256 duration,
        externalEuint64 reservePriceExt,
        bytes calldata proof
    ) external returns (uint256 auctionId) {
        require(duration >= MIN_AUCTION_DURATION && duration <= MAX_AUCTION_DURATION, "invalid duration");
        require(proof.length > 0, "empty proof");

        euint64 reservePrice = FHE.fromExternal(reservePriceExt, proof);

        auctionId = ++auctionCount;
        Auction storage a = _auctions[auctionId];

        a.auctionId = auctionId;
        a.seller = msg.sender;
        a.itemName = itemName;
        a.itemDescription = itemDescription;
        a.ipfsHash = ipfsHash;
        a.state = AuctionState.Active;
        a.startTime = block.timestamp;
        a.endTime = block.timestamp + duration;
        a.reservePrice = reservePrice;
        a.hasReserve = true;
        a.totalBids = 0;
        a.hasWinner = false;
        a.settled = false;

        FHE.allowThis(reservePrice);
        FHE.allow(reservePrice, msg.sender);

        emit AuctionCreated(auctionId, msg.sender, itemName, a.endTime);
    }

    function createAuctionPlaintext(
        string calldata itemName,
        string calldata itemDescription,
        string calldata ipfsHash,
        uint256 duration,
        uint64 reservePricePlain
    ) external returns (uint256 auctionId) {
        require(duration >= MIN_AUCTION_DURATION && duration <= MAX_AUCTION_DURATION, "invalid duration");

        euint64 reservePrice = FHE.asEuint64(reservePricePlain);

        auctionId = ++auctionCount;
        Auction storage a = _auctions[auctionId];

        a.auctionId = auctionId;
        a.seller = msg.sender;
        a.itemName = itemName;
        a.itemDescription = itemDescription;
        a.ipfsHash = ipfsHash;
        a.state = AuctionState.Active;
        a.startTime = block.timestamp;
        a.endTime = block.timestamp + duration;
        a.reservePrice = reservePrice;
        a.hasReserve = true;
        a.totalBids = 0;
        a.hasWinner = false;
        a.settled = false;

        FHE.allowThis(reservePrice);
        FHE.allow(reservePrice, msg.sender);

        emit AuctionCreated(auctionId, msg.sender, itemName, a.endTime);
    }

    function placeBid(
        uint256 auctionId,
        externalEuint64 bidAmountExt,
        bytes calldata proof
    ) external auctionActive(auctionId) returns (uint256 bidId) {
        require(proof.length > 0, "empty proof");

        Auction storage a = _auctions[auctionId];
        require(msg.sender != a.seller, "seller cannot bid");

        euint64 bidAmount = FHE.fromExternal(bidAmountExt, proof);

        bidId = ++bidCount;
        Bid storage b = _bids[bidId];

        b.bidId = bidId;
        b.auctionId = auctionId;
        b.bidder = msg.sender;
        b.bidAmount = bidAmount;
        b.timestamp = block.timestamp;
        b.processed = false;
        b.withdrawn = false;

        b.meetsReserve = FHE.ge(bidAmount, a.reservePrice);

        if (a.totalBids == 0) {
            b.isHighest = b.meetsReserve;
            a.winningBid = bidAmount;
            a.winningBidder = msg.sender;
        } else {
            ebool isHigher = FHE.gt(bidAmount, a.winningBid);
            b.isHighest = FHE.and(b.meetsReserve, isHigher);
            a.winningBid = FHE.select(b.isHighest, bidAmount, a.winningBid);
            if (a.totalBids > 0) {
                a.winningBidder = msg.sender;
            }
        }

        a.totalBids++;
        a.hasWinner = true;

        _auctionBids[auctionId].push(bidId);
        _userBids[msg.sender].push(bidId);

        FHE.allowThis(bidAmount);
        FHE.allowThis(b.meetsReserve);
        FHE.allowThis(b.isHighest);
        FHE.allow(bidAmount, msg.sender);

        emit BidPlaced(bidId, auctionId, msg.sender, FHE.toBytes32(bidAmount));
    }

    function endAuction(uint256 auctionId)
        external
        auctionEnded(auctionId)
        onlySeller(auctionId)
    {
        Auction storage a = _auctions[auctionId];
        require(a.state == AuctionState.Active, "already ended");

        a.state = AuctionState.Ended;

        if (a.hasWinner) {
            FHE.allow(a.winningBid, a.winningBidder);
            FHE.allow(a.winningBid, a.seller);
            FHE.makePubliclyDecryptable(a.winningBid);

            emit AuctionEnded(auctionId, a.winningBidder, FHE.toBytes32(a.winningBid));
        } else {
            emit AuctionEnded(auctionId, address(0), bytes32(0));
        }
    }

    function cancelAuction(uint256 auctionId) external onlySeller(auctionId) {
        Auction storage a = _auctions[auctionId];
        require(a.state == AuctionState.Active, "cannot cancel");
        require(a.totalBids == 0, "has bids");

        a.state = AuctionState.Canceled;
        emit AuctionCanceled(auctionId);
    }

    function settleAuction(uint256 auctionId) external {
        Auction storage a = _auctions[auctionId];
        require(a.state == AuctionState.Ended, "not ended");
        require(a.hasWinner, "no winner");
        require(!a.settled, "already settled");
        require(msg.sender == a.seller || msg.sender == a.winningBidder, "not authorized");

        a.state = AuctionState.Settled;
        a.settled = true;

        emit AuctionSettled(auctionId, a.winningBidder, a.seller);
    }

    function withdrawBid(uint256 bidId) external {
        Bid storage b = _bids[bidId];
        require(b.bidder == msg.sender, "not your bid");
        require(!b.withdrawn, "already withdrawn");

        Auction storage a = _auctions[b.auctionId];
        require(a.state == AuctionState.Ended || a.state == AuctionState.Settled, "auction not ended");
        require(a.winningBidder != msg.sender, "cannot withdraw winning bid");

        b.withdrawn = true;

        emit BidWithdrawn(bidId, msg.sender);
    }

    function getAuctionInfo(uint256 auctionId)
        external
        view
        returns (
            address seller,
            string memory itemName,
            string memory itemDescription,
            string memory ipfsHash,
            AuctionState state,
            uint256 startTime,
            uint256 endTime,
            uint256 totalBids,
            address winningBidder,
            bool hasWinner
        )
    {
        Auction storage a = _auctions[auctionId];
        return (
            a.seller,
            a.itemName,
            a.itemDescription,
            a.ipfsHash,
            a.state,
            a.startTime,
            a.endTime,
            a.totalBids,
            a.winningBidder,
            a.hasWinner
        );
    }

    function getBidInfo(uint256 bidId)
        external
        view
        returns (
            uint256 auctionId,
            address bidder,
            uint256 timestamp,
            bool processed,
            bool withdrawn
        )
    {
        Bid storage b = _bids[bidId];
        return (b.auctionId, b.bidder, b.timestamp, b.processed, b.withdrawn);
    }

    function getReservePriceHandle(uint256 auctionId) external view returns (bytes32) {
        Auction storage a = _auctions[auctionId];
        require(a.hasReserve, "no reserve");
        return FHE.toBytes32(a.reservePrice);
    }

    function getWinningBidHandle(uint256 auctionId) external view returns (bytes32) {
        Auction storage a = _auctions[auctionId];
        require(a.hasWinner, "no winner");
        return FHE.toBytes32(a.winningBid);
    }

    function getBidAmountHandle(uint256 bidId) external view returns (bytes32) {
        Bid storage b = _bids[bidId];
        return FHE.toBytes32(b.bidAmount);
    }

    function getAuctionBids(uint256 auctionId) external view returns (uint256[] memory) {
        return _auctionBids[auctionId];
    }

    function getUserBids(address user) external view returns (uint256[] memory) {
        return _userBids[user];
    }

    function isAuctionActive(uint256 auctionId) external view returns (bool) {
        Auction storage a = _auctions[auctionId];
        return a.state == AuctionState.Active && block.timestamp < a.endTime;
    }

    function getTimeRemaining(uint256 auctionId) external view returns (uint256) {
        Auction storage a = _auctions[auctionId];
        if (block.timestamp >= a.endTime) return 0;
        return a.endTime - block.timestamp;
    }
}
