# Obscura

Privacy-preserving auction marketplace for digital art, physical collectibles, and real-world assets powered by Zama's FHE technology.

## Overview

Obscura is a decentralized auction platform where bid amounts remain completely encrypted throughout the entire auction process. Using Fully Homomorphic Encryption (FHE), bidders can compete without revealing their bids to anyone - including other bidders, the seller, or even the platform itself.

## Features

- **🔐 Encrypted Bidding**: All bid amounts are encrypted using Zama's FHE technology
- **🎨 Multi-Asset Support**: Digital art, physical collectibles, watches, wines, cars, and more
- **🏆 Fair Auctions**: Automatic winner selection based on encrypted bids
- **🔒 Privacy-First**: Only the winner and seller learn the final price after auction ends
- **⏱️ Flexible Duration**: Auctions from 1 hour to 90 days
- **🌐 Decentralized**: All operations on-chain with Sepolia testnet

## Use Cases

- Digital artwork auctions
- Vintage watch collections
- Fine wine and spirits
- Classic car memorabilia
- Luxury goods and jewelry
- Real estate tokenized assets
- Collectible trading cards

## Tech Stack

- **Smart Contracts**: Solidity 0.8.24
- **FHE Library**: @fhevm/solidity v0.8.0
- **Frontend**: React + TypeScript + Vite
- **Wallet Integration**: RainbowKit + Wagmi v2
- **Encryption SDK**: Zama Relayer SDK v0.2.0
- **Network**: Ethereum Sepolia Testnet

## Contract Architecture

```
PrivateAuction.sol
├── Encrypted Types
│   ├── euint64 (bid amounts, reserve prices)
│   └── ebool (comparison results)
├── Core Functions
│   ├── createAuction() - with FHE-encrypted reserve
│   ├── placeBid() - encrypted bid submission
│   ├── endAuction() - finalize and reveal winner
│   └── settleAuction() - payment settlement
└── Privacy Features
    ├── FHE.fromExternal() - ZK proof validation
    ├── FHE.ge/gt/select() - encrypted comparisons
    └── ACL permissions - selective decryption
```

## Deployment

**Current Contract**: `0xc490A8aaF2667ed223f616419A31506A83c787C4`
**Network**: Sepolia Testnet
**Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0xc490A8aaF2667ed223f616419A31506A83c787C4)

## Installation

### Prerequisites

- Node.js 18+
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH

### Setup

```bash
# Clone repository
git clone https://github.com/nancyjimenezbnoewowo/Obscura.git
cd Obscura

# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend && npm install
```

### Environment Configuration

Create `.env` file in root directory:

```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Usage

### Deploy Contract

```bash
npm run compile
npm run deploy
```

### Run Frontend

```bash
cd frontend
npm run dev
```

Open http://localhost:5173 in your browser.

### Create Auction

1. Connect your wallet
2. Click "Create Auction"
3. Fill in auction details
4. Set reserve price (encrypted)
5. Choose auction duration
6. Submit transaction

### Place Bid

1. Browse active auctions
2. Click "Place Encrypted Bid"
3. Enter bid amount
4. FHE SDK encrypts your bid
5. Submit encrypted bid on-chain
6. Your bid remains private until auction ends

## How It Works

### Encrypted Bidding Process

```
┌─────────────┐
│   Bidder    │
└──────┬──────┘
       │ 1. Enter bid amount (plaintext)
       ▼
┌─────────────────┐
│   FHE SDK       │ 2. Encrypt with ZK proof
│  (Client-side)  │
└──────┬──────────┘
       │ 3. Send encrypted bid + proof
       ▼
┌────────────────────┐
│  Smart Contract    │ 4. Verify proof & store encrypted bid
│  (On-chain)        │ 5. Compare with FHE.gt/ge (stays encrypted)
└──────┬─────────────┘
       │ 6. Update encrypted winner
       ▼
┌────────────────────┐
│  Auction Ends      │ 7. Decrypt only for winner & seller
│  (Reveal Phase)    │
└────────────────────┘
```

### Privacy Guarantees

- ✅ Bidders cannot see others' bid amounts
- ✅ Seller cannot see individual bids during auction
- ✅ Platform cannot access bid amounts
- ✅ Only winning bid is revealed after auction ends
- ✅ Losers can withdraw without revealing their bids

## Testing

### Check Auction Status

```bash
npx hardhat run scripts/checkAuction.js --network sepolia
```

### Create Test Auctions

```bash
npx hardhat run scripts/createTestAuction.js --network sepolia
```

### Test Encrypted Bidding

```bash
npx hardhat run scripts/testBidFHE.js --network sepolia
```

## Security Features

- **ZK Proof Validation**: `FHE.fromExternal()` validates all encrypted inputs
- **ACL Permissions**: Fine-grained control over who can decrypt values
- **Seller Protection**: Sellers cannot bid on their own auctions
- **Time Locks**: Bids only accepted during active auction period
- **Encrypted Comparisons**: All bid comparisons done on encrypted values

## Limitations

- **Testnet Only**: Currently deployed on Sepolia testnet
- **Gas Costs**: FHE operations have higher gas costs
- **Decryption Time**: Winning bid decryption may take a few minutes
- **Max Duration**: 90 days maximum auction length

## Roadmap

- [ ] Mainnet deployment
- [ ] Multiple currency support (ETH, ERC20 tokens)
- [ ] Auction templates for different asset types
- [ ] Reputation system for sellers
- [ ] Batch auction creation
- [ ] Mobile app
- [ ] IPFS integration for asset metadata

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT

## Resources

- [Zama FHE Documentation](https://docs.zama.ai/)
- [fhEVM Solidity](https://github.com/zama-ai/fhevm)
- [Relayer SDK](https://www.npmjs.com/package/@zama-fhe/relayer-sdk)

## Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Zama's Fully Homomorphic Encryption**
