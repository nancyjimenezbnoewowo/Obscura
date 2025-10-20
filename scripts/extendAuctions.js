const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xc490A8aaF2667ed223f616419A31506A83c787C4";

  console.log("Creating new 90-day auctions...\n");

  const PrivateAuction = await ethers.getContractAt("PrivateAuction", contractAddress);

  const auctions = [
    {
      name: "Rare Digital Artwork #001",
      description: "Limited edition NFT",
      ipfsHash: "QmX1...",
      reservePrice: 1000000000000000000n
    },
    {
      name: "Vintage Watch Collection",
      description: "Swiss timepiece from 1960s",
      ipfsHash: "QmX2...",
      reservePrice: 2500000000000000000n
    },
    {
      name: "Classic Car Memorabilia",
      description: "Signed collectibles",
      ipfsHash: "QmX3...",
      reservePrice: 500000000000000000n
    },
    {
      name: "Fine Wine Bottle 1982",
      description: "Premium vintage",
      ipfsHash: "QmX4...",
      reservePrice: 1800000000000000000n
    }
  ];

  const durationInSeconds = 90 * 24 * 60 * 60;

  for (let i = 0; i < auctions.length; i++) {
    const auction = auctions[i];

    console.log(`Creating auction ${i + 1}: ${auction.name}`);

    const tx = await PrivateAuction.createAuctionPlaintext(
      auction.name,
      auction.description,
      auction.ipfsHash,
      durationInSeconds,
      auction.reservePrice
    );

    const receipt = await tx.wait();
    console.log(`  ✅ Created! Tx: ${receipt.hash.slice(0, 10)}...`);
  }

  console.log("\n✅ All 90-day auctions created!");

  const totalAuctions = await PrivateAuction.auctionCount();
  console.log(`Total auctions: ${totalAuctions}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
