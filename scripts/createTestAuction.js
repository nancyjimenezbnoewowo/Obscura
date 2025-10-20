const { ethers } = require('hardhat');

async function main() {
  const contractAddress = '0xF49Aa40a39b64F31fB437cA8a8b346FdfB4Ae69C';
  
  console.log('Creating test auctions...\n');
  
  const [deployer] = await ethers.getSigners();
  const PrivateAuction = await ethers.getContractAt('PrivateAuction', contractAddress);
  
  const auctions = [
    {name: 'Rare Digital Artwork #001', desc: 'Limited edition NFT', ipfs: 'QmTest1', reserve: ethers.parseEther('0.1')},
    {name: 'Vintage Watch Collection', desc: 'Swiss timepiece from 1960s', ipfs: 'QmTest2', reserve: ethers.parseEther('0.08')},
    {name: 'Classic Car Memorabilia', desc: 'Signed collectibles', ipfs: 'QmTest3', reserve: ethers.parseEther('0.15')},
    {name: 'Fine Wine Bottle 1982', desc: 'Premium vintage', ipfs: 'QmTest4', reserve: ethers.parseEther('0.05')}
  ];
  
  for (let i = 0; i < auctions.length; i++) {
    const a = auctions[i];
    console.log('Creating:', a.name);
    const tx = await PrivateAuction.createAuctionPlaintext(a.name, a.desc, a.ipfs, 7*24*60*60, a.reserve);
    await tx.wait();
    console.log('Created!');
  }
  
  console.log('\nSuccess!');
}

main().then(() => process.exit(0)).catch(e => {console.error(e); process.exit(1);});