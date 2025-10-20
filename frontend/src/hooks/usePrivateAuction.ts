import { useState, useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { Contract, BrowserProvider } from 'ethers';
import { PRIVATE_AUCTION_ABI, PRIVATE_AUCTION_ADDRESS } from '@/lib/PrivateAuctionABI';
import { encryptUint64, initializeFHE } from '@/lib/fhe';
import { toast } from 'sonner';

export const usePrivateAuction = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);

  const getContract = useCallback(async () => {
    if (!walletClient) throw new Error('Wallet not connected');
    const provider = new BrowserProvider(walletClient as any);
    const signer = await provider.getSigner();
    return new Contract(PRIVATE_AUCTION_ADDRESS, PRIVATE_AUCTION_ABI, signer);
  }, [walletClient]);

  const placeBid = useCallback(async (auctionId: number, bidAmount: number) => {
    if (!address) {
      toast.error('Connect wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const contract = await getContract();
      const auctionInfo = await contract.getAuctionInfo(auctionId);
      const seller = auctionInfo[0];

      if (seller.toLowerCase() === address.toLowerCase()) {
        toast.error('Sellers cannot bid on their own auctions');
        throw new Error('Sellers cannot bid on their own auctions');
      }

      toast.info('Encrypting bid...');
      await initializeFHE();

      const encrypted = await encryptUint64(bidAmount, PRIVATE_AUCTION_ADDRESS, address);

      toast.info('Submitting bid...');
      const tx = await contract.placeBid(auctionId, encrypted.data, encrypted.signature);
      await tx.wait();

      toast.success('Bid placed successfully');
      return tx;
    } catch (error: any) {
      const errorMsg = error.message || 'Bid failed';
      toast.error(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, getContract]);

  const createAuction = useCallback(async (
    itemName: string,
    itemDescription: string,
    ipfsHash: string,
    durationInDays: number,
    reservePrice: number
  ) => {
    if (!address) {
      toast.error('Connect wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const contract = await getContract();
      const durationSeconds = durationInDays * 24 * 60 * 60;
      const tx = await contract.createAuctionPlaintext(
        itemName,
        itemDescription,
        ipfsHash,
        durationSeconds,
        reservePrice
      );
      await tx.wait();
      toast.success('Auction created');
      return tx;
    } catch (error: any) {
      toast.error(error.message || 'Creation failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, getContract]);

  const getAuctionInfo = useCallback(async (auctionId: number) => {
    const contract = await getContract();
    return await contract.getAuctionInfo(auctionId);
  }, [getContract]);

  return { placeBid, createAuction, getAuctionInfo, isLoading };
};
