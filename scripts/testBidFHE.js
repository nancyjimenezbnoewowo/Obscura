const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xF49Aa40a39b64F31fB437cA8a8b346FdfB4Ae69C";

  console.log("🧪 Testing FHE bid placement...\n");

  const PrivateAuction = await ethers.getContractAt("PrivateAuction", contractAddress);

  // Check auction 1
  const info = await PrivateAuction.getAuctionInfo(1);
  console.log("Auction #1:");
  console.log(`  Seller: ${info[0]}`);
  console.log(`  Name: ${info[1]}`);
  console.log(`  State: ${info[4]}`);
  console.log(`  Total Bids: ${info[7]}\n`);

  // Try to place a test bid with dummy encrypted data
  // This will fail but we want to see the error message
  try {
    console.log("📝 Attempting to place bid with dummy encrypted data...");

    // Create dummy encrypted input (32 bytes)
    const dummyHandle = "0x" + "11".repeat(32);
    const dummyProof = "0x" + "22".repeat(100); // 100 bytes proof

    console.log("Handle:", dummyHandle);
    console.log("Proof length:", dummyProof.length);

    // Estimate gas first to see the error
    const gasEstimate = await PrivateAuction.placeBid.estimateGas(
      1,
      dummyHandle,
      dummyProof
    );

    console.log("✅ Gas estimate succeeded:", gasEstimate.toString());

    // If gas estimate works, try actual transaction
    const tx = await PrivateAuction.placeBid(
      1,
      dummyHandle,
      dummyProof
    );

    console.log("Transaction hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("✅ Bid placed! Gas used:", receipt.gasUsed.toString());

  } catch (error) {
    console.log("\n❌ Expected error (FHE validation should fail):");
    console.log("Error message:", error.message);

    if (error.data) {
      console.log("Error data:", error.data);
    }

    // Check if it's a revert with no message
    if (error.message.includes("missing revert data")) {
      console.log("\n🔍 This is the issue - contract reverts without error message");
      console.log("Possible causes:");
      console.log("  1. FHE.fromExternal() validation fails silently");
      console.log("  2. Coprocessor not accessible");
      console.log("  3. Invalid proof format");
    }
  }

  // Let's also check the contract's FHE imports
  console.log("\n📋 Checking contract version...");
  try {
    const version = await PrivateAuction.version();
    console.log("Contract version:", version);
  } catch (e) {
    console.log("No version() function");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
