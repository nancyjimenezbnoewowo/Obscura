const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x2613A679F6961735D23174DaB0a54Fb4aCF2BFE2";
  
  console.log("🔍 Checking auction contract...\n");
  
  const PrivateAuction = await ethers.getContractAt("PrivateAuction", contractAddress);
  
  // Get auction count
  const count = await PrivateAuction.auctionCount();
  console.log(`📊 Total auctions: ${count}\n`);
  
  if (count > 0) {
    for (let i = 1; i <= count; i++) {
      try {
        const info = await PrivateAuction.getAuctionInfo(i);
        console.log(`Auction #${i}:`);
        console.log(`  Seller: ${info[0]}`);
        console.log(`  Name: ${info[1]}`);
        console.log(`  Description: ${info[2]}`);
        console.log(`  State: ${info[4]}`);
        console.log(`  Total Bids: ${info[7]}`);
        console.log(`  Has Winner: ${info[9]}\n`);
      } catch (error) {
        console.log(`❌ Failed to get auction #${i}:`, error.message);
      }
    }
  } else {
    console.log("⚠️  No auctions found. You need to create an auction first!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
