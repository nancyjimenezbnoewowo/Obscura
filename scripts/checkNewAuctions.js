const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xc490A8aaF2667ed223f616419A31506A83c787C4";
  const PrivateAuction = await ethers.getContractAt("PrivateAuction", contractAddress);

  console.log("⏰ Checking NEW contract auction timing...\n");

  const now = Math.floor(Date.now() / 1000);
  console.log(`Current time: ${new Date().toLocaleString()}`);
  console.log(`Contract: ${contractAddress}\n`);

  for (let i = 1; i <= 4; i++) {
    const info = await PrivateAuction.getAuctionInfo(i);
    const startTime = Number(info[5]);
    const endTime = Number(info[6]);

    const timeRemaining = endTime - now;
    const daysRemaining = Math.floor(timeRemaining / 86400);
    const hoursRemaining = Math.floor((timeRemaining % 86400) / 3600);

    console.log(`Auction #${i}: ${info[1]}`);
    console.log(`  Start: ${new Date(startTime * 1000).toLocaleString()}`);
    console.log(`  End:   ${new Date(endTime * 1000).toLocaleString()}`);
    console.log(`  Duration: ${(endTime - startTime) / 86400} days`);

    if (timeRemaining > 0) {
      console.log(`  ⏳ Time remaining: ${daysRemaining} days ${hoursRemaining}h`);
      console.log(`  Status: ACTIVE ✅`);
    } else {
      console.log(`  ❌ EXPIRED`);
    }
    console.log();
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
