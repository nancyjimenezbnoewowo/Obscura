import { useState } from 'react';
import { Clock, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

interface AuctionCardProps {
  auctionId: number;
  title: string;
  description: string;
  currentBid: string;
  endTime: string;
  bidders: number;
  image: string;
  isActive: boolean;
}

const AuctionCard = ({
  auctionId,
  title,
  description,
  currentBid,
  endTime,
  bidders,
  image,
  isActive
}: AuctionCardProps) => {
  const [open, setOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const { placeBid, isLoading } = usePrivateAuction();
  const { isConnected } = useAccount();

  const handlePlaceBid = async () => {
    try {
      const amount = parseFloat(bidAmount);
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid bid amount');
        return;
      }

      await placeBid(auctionId, Math.floor(amount * 1e18));
      setOpen(false);
      setBidAmount('');
    } catch (error) {
      console.error('Failed to place bid:', error);
    }
  };

  return (
    <Card className="overflow-hidden border-border transition-all hover:shadow-lg hover:shadow-accent/5">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <Badge
          className="absolute right-3 top-3 bg-accent/90 text-accent-foreground"
        >
          <Shield className="mr-1 h-3 w-3" />
          FHE Protected
        </Badge>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          {isActive && (
            <Badge variant="secondary" className="ml-2 whitespace-nowrap">
              Live
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current Bid</p>
            <p className="text-2xl font-bold text-accent">{currentBid}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Bidders</p>
            <div className="flex items-center gap-1 text-lg font-semibold">
              <Users className="h-4 w-4" />
              {bidders}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
          <Clock className="h-4 w-4 text-secondary-foreground" />
          <span className="text-sm font-medium text-secondary-foreground">
            Ends {endTime}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full bg-primary hover:bg-primary/90 font-semibold"
              disabled={!isConnected || !isActive}
            >
              {!isConnected ? 'Connect Wallet' : 'Place Encrypted Bid'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Place Encrypted Bid</DialogTitle>
              <DialogDescription>
                Your bid will be encrypted using FHE and kept private until the auction ends.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="bidAmount" className="text-sm font-medium">
                  Bid Amount (ETH)
                </label>
                <Input
                  id="bidAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="font-medium mb-1">Auction: {title}</p>
                <p className="text-muted-foreground">Current bid: {currentBid}</p>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handlePlaceBid}
                disabled={isLoading || !bidAmount}
                className="w-full"
              >
                {isLoading ? 'Processing...' : 'Submit Encrypted Bid'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AuctionCard;
