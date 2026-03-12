import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import ProcessSection from '@/components/landing/ProcessSection';
import FeaturedBondsSection from '@/components/landing/FeaturedBondsSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import SuitabilitySection from '@/components/landing/SuitabilitySection';
import LeadFormSection from '@/components/landing/LeadFormSection';
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
        <ProcessSection />
        <FeaturedBondsSection />
        <BenefitsSection />
        <SuitabilitySection />
        <LeadFormSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
