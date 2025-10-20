const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting PrivateAuction deployment to Sepolia...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  if (balance === 0n) {
    throw new Error("❌ Deployer account has no funds. Please add Sepolia ETH to your wallet.");
  }

  // Deploy PrivateAuction
  console.log("📦 Deploying PrivateAuction contract...");
  const PrivateAuction = await hre.ethers.getContractFactory("PrivateAuction");
  const privateAuction = await PrivateAuction.deploy();

  await privateAuction.waitForDeployment();
  const contractAddress = await privateAuction.getAddress();

  console.log("✅ PrivateAuction deployed to:", contractAddress);

  // Get contract version
  const version = await privateAuction.version();
  console.log("📌 Contract version:", version);

  // Update .env file
  console.log("\n📝 Updating .env file...");
  const envPath = path.join(__dirname, "../.env");
  let envContent = "";

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8");
    // Update existing address
    if (envContent.includes("PRIVATE_AUCTION_ADDRESS=")) {
      envContent = envContent.replace(
        /PRIVATE_AUCTION_ADDRESS=.*/,
        `PRIVATE_AUCTION_ADDRESS=${contractAddress}`
      );
    } else {
      envContent += `\nPRIVATE_AUCTION_ADDRESS=${contractAddress}\n`;
    }
  } else {
    envContent = `PRIVATE_AUCTION_ADDRESS=${contractAddress}\n`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log("✅ .env file updated");

  // Update frontend ABI file
  console.log("\n📝 Updating frontend contract address...");
  const abiPath = path.join(__dirname, "../frontend/src/lib/PrivateAuctionABI.ts");

  if (fs.existsSync(abiPath)) {
    let abiContent = fs.readFileSync(abiPath, "utf8");
    abiContent = abiContent.replace(
      /export const PRIVATE_AUCTION_ADDRESS = '.+';/,
      `export const PRIVATE_AUCTION_ADDRESS = '${contractAddress}';`
    );
    fs.writeFileSync(abiPath, abiContent);
    console.log("✅ Frontend ABI file updated");
  }

  // Create frontend .env file
  console.log("\n📝 Creating frontend .env file...");
  const frontendEnvPath = path.join(__dirname, "../frontend/.env");
  const frontendEnvContent = `VITE_CONTRACT_ADDRESS=${contractAddress}
VITE_SEPOLIA_CHAIN_ID=11155111
VITE_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
`;
  fs.writeFileSync(frontendEnvPath, frontendEnvContent);
  console.log("✅ Frontend .env file created");

  // Deployment summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("=".repeat(60));
  console.log("\n📋 Deployment Summary:");
  console.log("  Contract:", "PrivateAuction");
  console.log("  Address: ", contractAddress);
  console.log("  Network: ", hre.network.name);
  console.log("  Deployer:", deployer.address);
  console.log("  Version: ", version);
  console.log("\n🔗 View on Etherscan:");
  console.log(`  https://sepolia.etherscan.io/address/${contractAddress}`);
  console.log("\n📝 Next Steps:");
  console.log("  1. Verify contract: npm run verify ${contractAddress}");
  console.log("  2. Test frontend: cd frontend && npm run dev");
  console.log("  3. Create test auction with encrypted reserve price");
  console.log("\n" + "=".repeat(60) + "\n");

  // Save deployment info to JSON
  const deploymentInfo = {
    network: hre.network.name,
    contractName: "PrivateAuction",
    contractAddress: contractAddress,
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    version: version,
    blockNumber: await hre.ethers.provider.getBlockNumber(),
  };

  const deploymentPath = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentPath)) {
    fs.mkdirSync(deploymentPath);
  }

  const deploymentFile = path.join(
    deploymentPath,
    `${hre.network.name}-${Date.now()}.json`
  );
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to:", deploymentFile);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
