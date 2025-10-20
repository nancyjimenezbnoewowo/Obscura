import { Github, Twitter, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="mb-3 text-lg font-bold text-foreground">FHE Auction House</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              The world's first privacy-preserving blockchain auction platform 
              powered by Zama's fully homomorphic encryption technology.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-foreground">Active Auctions</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">Create Auction</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">My Bids</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">Auction History</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-foreground">Documentation</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">About FHE</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">Smart Contracts</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 FHE Auction House. Built with Zama's FHE technology for unparalleled privacy.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
