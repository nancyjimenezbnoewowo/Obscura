const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xF49Aa40a39b64F31fB437cA8a8b346FdfB4Ae69C";
  const PrivateAuction = await ethers.getContractAt("PrivateAuction", contractAddress);

  console.log("⏰ Checking auction timing details...\n");

  const now = Math.floor(Date.now() / 1000);
  console.log(`Current time: ${new Date().toLocaleString()}`);
  console.log(`Unix timestamp: ${now}\n`);

  for (let i = 1; i <= 4; i++) {
    const info = await PrivateAuction.getAuctionInfo(i);
    const startTime = Number(info[5]);
    const endTime = Number(info[6]);

    const timeRemaining = endTime - now;
    const hoursRemaining = Math.floor(timeRemaining / 3600);
    const minutesRemaining = Math.floor((timeRemaining % 3600) / 60);

    console.log(`Auction #${i}: ${info[1]}`);
    console.log(`  Start: ${new Date(startTime * 1000).toLocaleString()}`);
    console.log(`  End:   ${new Date(endTime * 1000).toLocaleString()}`);
    console.log(`  Duration: ${(endTime - startTime) / 3600} hours`);

    if (timeRemaining > 0) {
      console.log(`  ⏳ Time remaining: ${hoursRemaining}h ${minutesRemaining}m`);
      console.log(`  Status: ACTIVE ✅`);
    } else {
      console.log(`  ❌ EXPIRED ${Math.abs(hoursRemaining)}h ${Math.abs(minutesRemaining)}m ago`);
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
