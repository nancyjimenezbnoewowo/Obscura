import { Shield, Lock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import auctionHero from '@/assets/auction-hero.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${auctionHero})`,
          filter: 'brightness(0.4)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      
      <div className="container relative z-10 px-4 py-24 md:py-32 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 backdrop-blur-sm">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Powered by Zama FHE Technology
            </span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
            Private & Secure
            <span className="block text-accent">Blockchain Auctions</span>
          </h1>
          
          <p className="mb-10 text-lg text-primary-foreground/90 md:text-xl">
            Experience the future of auctions with fully homomorphic encryption. 
            Your bids remain confidential until the auction ends, ensuring fair 
            and transparent outcomes.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg"
            >
              Explore Auctions
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/20 bg-background/10 text-primary-foreground hover:bg-background/20 backdrop-blur-sm"
            >
              Learn About FHE
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border/40 bg-card/50 p-6 backdrop-blur-sm">
              <Lock className="mb-3 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-semibold text-card-foreground">Encrypted Bids</h3>
              <p className="text-sm text-muted-foreground">
                All bids are encrypted on-chain using FHE
              </p>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/50 p-6 backdrop-blur-sm">
              <Eye className="mb-3 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-semibold text-card-foreground">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                No one can see your bid until reveal
              </p>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/50 p-6 backdrop-blur-sm">
              <Shield className="mb-3 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-semibold text-card-foreground">Provably Fair</h3>
              <p className="text-sm text-muted-foreground">
                Smart contracts ensure transparent results
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
