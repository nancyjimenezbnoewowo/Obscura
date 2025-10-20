import { Shield, Lock, Code, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TechnologySection = () => {
  return (
    <section id="technology" className="border-t border-border bg-secondary/30 py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Powered by Zama
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Fully Homomorphic Encryption (FHE)
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Revolutionary cryptographic technology that allows computations on encrypted data 
            without ever decrypting it.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Lock className="mb-2 h-8 w-8 text-accent" />
              <CardTitle className="text-lg">Private Bidding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your bid amounts are encrypted end-to-end. Nobody can see your bid until 
                the auction concludes.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Code className="mb-2 h-8 w-8 text-accent" />
              <CardTitle className="text-lg">On-Chain Computation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Winner determination happens directly on encrypted bids using smart contracts.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Shield className="mb-2 h-8 w-8 text-accent" />
              <CardTitle className="text-lg">Verifiable Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every auction result is cryptographically provable and publicly verifiable 
                on the blockchain.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Zap className="mb-2 h-8 w-8 text-accent" />
              <CardTitle className="text-lg">Gas Efficient</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Optimized FHE operations ensure competitive transaction costs while 
                maintaining security.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 rounded-lg border border-border bg-card p-8">
          <h3 className="mb-4 text-xl font-semibold text-card-foreground">
            How It Works
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                1
              </div>
              <h4 className="font-semibold">Encrypt Your Bid</h4>
              <p className="text-sm text-muted-foreground">
                Your wallet automatically encrypts your bid amount using FHE before 
                submitting to the blockchain.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                2
              </div>
              <h4 className="font-semibold">Secure Processing</h4>
              <p className="text-sm text-muted-foreground">
                Smart contracts compare encrypted bids without decrypting them, 
                determining the winner privately.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                3
              </div>
              <h4 className="font-semibold">Reveal Winner</h4>
              <p className="text-sm text-muted-foreground">
                When the auction ends, only the winning bid and bidder are revealed, 
                keeping all other bids private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
