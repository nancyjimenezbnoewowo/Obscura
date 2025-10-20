const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x2613A679F6961735D23174DaB0a54Fb4aCF2BFE2";
  
  console.log("Testing placeBidPlaintext...\n");
  
  const [bidder] = await ethers.getSigners();
  console.log("Bidder:", bidder.address);
  
  const PrivateAuction = await ethers.getContractAt("PrivateAuction", contractAddress);
  
  const auctionId = 1;
  const bidAmount = ethers.parseEther("0.12"); // 0.12 ETH
  
  console.log("Placing bid:");
  console.log("  Auction ID:", auctionId);
  console.log("  Bid Amount:", ethers.formatEther(bidAmount), "ETH");
  
  const tx = await PrivateAuction.placeBidPlaintext(auctionId, bidAmount);
  console.log("\nTX:", tx.hash);
  
  const receipt = await tx.wait();
  console.log("✅ Bid placed successfully!");
  
  // Check auction info
  const info = await PrivateAuction.getAuctionInfo(auctionId);
  console.log("\nAuction info:");
  console.log("  Total Bids:", info[7].toString());
  console.log("  Winning Bidder:", info[8]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
