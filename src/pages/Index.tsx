import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import FeaturedBondsSection from '@/components/landing/FeaturedBondsSection';
// LeadFormSection is now integrated into FeaturedBondsSection
import ProductsSection from '@/components/landing/ProductsSection';
import ComparisonSection from '@/components/landing/ComparisonSection';
import ProcessSection from '@/components/landing/ProcessSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedBondsSection />
        {/* Lead form is now inside FeaturedBondsSection */}
        <ProductsSection />
        <ComparisonSection />
        <ProcessSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
