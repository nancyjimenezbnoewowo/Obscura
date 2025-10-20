import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AuctionsList from '@/components/AuctionsList';
import TechnologySection from '@/components/TechnologySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AuctionsList />
        <TechnologySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
