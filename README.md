# CloakedCollectible-Bazaar

Privacy-preserving NFT auction marketplace powered by Zama's FHE technology.

## Features

- Encrypted bid amounts using FHE
- Private reserve prices
- Automatic winner selection
- Confidential auction outcomes

## Tech Stack

- Solidity 0.8.24
- Zama FHE (@fhevm/solidity)
- React + TypeScript
- RainbowKit + Wagmi

## Deployment

Contract: `0xF49Aa40a39b64F31fB437cA8a8b346FdfB4Ae69C`
Network: Sepolia Testnet

## Usage

```bash
# Install dependencies
npm install
cd frontend && npm install

# Deploy contract
npm run deploy

# Run frontend
cd frontend && npm run dev
```
