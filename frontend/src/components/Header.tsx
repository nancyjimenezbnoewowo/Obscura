import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Eye, EyeOff } from 'lucide-react';
import { CreateAuctionDialog } from './CreateAuctionDialog';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/obscura-logo.svg" alt="Obscura" className="h-12 w-12" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Obscura
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <EyeOff className="h-3 w-3" />
              Private Auctions
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <a
            href="#auctions"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Auctions
          </a>
          <a
            href="#technology"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Technology
          </a>
          <CreateAuctionDialog />
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
