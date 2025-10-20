import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { usePrivateAuction } from '@/hooks/usePrivateAuction';
import { useAccount } from 'wagmi';
import { Plus } from 'lucide-react';

export const CreateAuctionDialog = () => {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [duration, setDuration] = useState('7');
  const [reservePrice, setReservePrice] = useState('');
  
  const { createAuction, isLoading } = usePrivateAuction();
  const { isConnected } = useAccount();

  const handleCreate = async () => {
    try {
      const price = parseFloat(reservePrice);
      const days = parseInt(duration);
      
      if (!itemName || !description || isNaN(price) || isNaN(days)) {
        alert('Please fill in all fields correctly');
        return;
      }

      await createAuction(
        itemName,
        description,
        ipfsHash || 'QmPlaceholder',
        days,
        Math.floor(price * 1e18) // Convert to wei
      );
      
      setOpen(false);
      // Reset form
      setItemName('');
      setDescription('');
      setIpfsHash('');
      setDuration('7');
      setReservePrice('');
    } catch (error) {
      console.error('Failed to create auction:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!isConnected} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Auction
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Auction</DialogTitle>
          <DialogDescription>
            Create a privacy-preserving auction with encrypted reserve price
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Item Name</label>
            <Input
              placeholder="e.g., Rare Digital Artwork #001"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Describe your item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">IPFS Hash (Optional)</label>
            <Input
              placeholder="QmHash..."
              value={ipfsHash}
              onChange={(e) => setIpfsHash(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reserve Price (ETH)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="1.0"
                value={reservePrice}
                onChange={(e) => setReservePrice(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (Days)</label>
              <Input
                type="number"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-3 text-sm">
            <p className="font-medium mb-1">Privacy Features:</p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>✓ Reserve price encrypted with FHE</li>
              <li>✓ Only visible to you until auction ends</li>
              <li>✓ Bidders can't see reserve price</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreate}
            disabled={isLoading || !itemName || !reservePrice}
            className="w-full"
          >
            {isLoading ? 'Creating...' : 'Create Encrypted Auction'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
