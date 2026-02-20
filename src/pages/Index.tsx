import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ConcernsSection from "@/components/ConcernsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ConcernsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
