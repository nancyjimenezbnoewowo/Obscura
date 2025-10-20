export const PRIVATE_AUCTION_ABI = [
  {
    "inputs": [],
    "name": "version",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "itemName", "type": "string" },
      { "internalType": "string", "name": "itemDescription", "type": "string" },
      { "internalType": "string", "name": "ipfsHash", "type": "string" },
      { "internalType": "uint256", "name": "duration", "type": "uint256" },
      { "internalType": "bytes32", "name": "reservePriceExt", "type": "bytes32" },
      { "internalType": "bytes", "name": "proof", "type": "bytes" }
    ],
    "name": "createAuction",
    "outputs": [{ "internalType": "uint256", "name": "auctionId", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" },
      { "internalType": "bytes32", "name": "bidAmountExt", "type": "bytes32" },
      { "internalType": "bytes", "name": "proof", "type": "bytes" }
    ],
    "name": "placeBid",
    "outputs": [{ "internalType": "uint256", "name": "bidId", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" }
    ],
    "name": "endAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" }
    ],
    "name": "cancelAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" }
    ],
    "name": "settleAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "bidId", "type": "uint256" }
    ],
    "name": "withdrawBid",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" }
    ],
    "name": "getAuctionInfo",
    "outputs": [
      { "internalType": "address", "name": "seller", "type": "address" },
      { "internalType": "string", "name": "itemName", "type": "string" },
      { "internalType": "string", "name": "itemDescription", "type": "string" },
      { "internalType": "string", "name": "ipfsHash", "type": "string" },
      { "internalType": "enum PrivateAuction.AuctionState", "name": "state", "type": "uint8" },
      { "internalType": "uint256", "name": "startTime", "type": "uint256" },
      { "internalType": "uint256", "name": "endTime", "type": "uint256" },
      { "internalType": "uint256", "name": "totalBids", "type": "uint256" },
      { "internalType": "address", "name": "winningBidder", "type": "address" },
      { "internalType": "bool", "name": "hasWinner", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "bidId", "type": "uint256" }
    ],
    "name": "getBidInfo",
    "outputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" },
      { "internalType": "address", "name": "bidder", "type": "address" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "bool", "name": "processed", "type": "bool" },
      { "internalType": "bool", "name": "withdrawn", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" }
    ],
    "name": "getReservePriceHandle",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" }
    ],
    "name": "getWinningBidHandle",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "bidId", "type": "uint256" }
    ],
    "name": "getBidAmountHandle",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" }
    ],
    "name": "getAuctionBids",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" }
    ],
    "name": "getUserBids",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" }
    ],
    "name": "isAuctionActive",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "auctionId", "type": "uint256" }
    ],
    "name": "getTimeRemaining",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "auctionCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "auctionId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "seller", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "itemName", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "endTime", "type": "uint256" }
    ],
    "name": "AuctionCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "bidId", "type": "uint256" },
      { "indexed": true, "internalType": "uint256", "name": "auctionId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "bidder", "type": "address" },
      { "indexed": false, "internalType": "bytes32", "name": "bidAmountHandle", "type": "bytes32" }
    ],
    "name": "BidPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "auctionId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "winner", "type": "address" },
      { "indexed": false, "internalType": "bytes32", "name": "winningBidHandle", "type": "bytes32" }
    ],
    "name": "AuctionEnded",
    "type": "event"
  }
] as const;

// Contract address will be set after deployment
export const PRIVATE_AUCTION_ADDRESS = '0xc490A8aaF2667ed223f616419A31506A83c787C4'; // TODO: Update after deployment
