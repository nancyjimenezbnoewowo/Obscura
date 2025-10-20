import AuctionCard from './AuctionCard';

const mockAuctions = [
  {
    id: 1,
    title: "Rare Digital Artwork #001",
    description: "Limited edition NFT by renowned artist",
    currentBid: "2.5 ETH",
    endTime: "in 2 hours",
    bidders: 12,
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop",
    isActive: true
  },
  {
    id: 2,
    title: "Vintage Watch Collection",
    description: "Swiss timepiece from 1960s",
    currentBid: "1.8 ETH",
    endTime: "in 5 hours",
    bidders: 8,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop",
    isActive: true
  },
  {
    id: 3,
    title: "Classic Car Memorabilia",
    description: "Signed collectibles from racing history",
    currentBid: "3.2 ETH",
    endTime: "in 1 day",
    bidders: 15,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    isActive: true
  },
  {
    id: 4,
    title: "Fine Wine Bottle 1982",
    description: "Premium vintage from Bordeaux",
    currentBid: "0.9 ETH",
    endTime: "in 3 days",
    bidders: 6,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop",
    isActive: true
  }
];

const AuctionsList = () => {
  return (
    <section id="auctions" className="py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Active Auctions
          </h2>
          <p className="text-lg text-muted-foreground">
            All bids are encrypted using Zama's FHE technology
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockAuctions.map((auction) => (
            <AuctionCard key={auction.id} auctionId={auction.id} {...auction} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuctionsList;
