const { ethers } = require("hardhat");

async function main() {
  const CoprocessorAddress = "0x848B0066793BcC60346Da1F49049357399B8D595";
  const KMSVerifierAddress = "0x1364cBBf2cDF5032C47d8226a6f6FBD2AFCDacAC";
  
  console.log("Testing Zama Coprocessor on Sepolia...\n");
  
  const provider = ethers.provider;
  
  // Check if addresses have code
  const coprocessorCode = await provider.getCode(CoprocessorAddress);
  const kmsCode = await provider.getCode(KMSVerifierAddress);
  
  console.log("Coprocessor deployed:", coprocessorCode !== "0x");
  console.log("KMS Verifier deployed:", kmsCode !== "0x");
  
  if (coprocessorCode === "0x") {
    console.log("\n❌ Coprocessor not deployed on Sepolia!");
    console.log("This means FHE.fromExternal() will ALWAYS fail.");
    console.log("\nZama FHE might only work on their devnet, not public Sepolia.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
