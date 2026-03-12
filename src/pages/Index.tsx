import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturedBondsSection from '@/components/landing/FeaturedBondsSection';
import LeadFormSection from '@/components/landing/LeadFormSection';
import ProcessSection from '@/components/landing/ProcessSection';
import StatsSection from '@/components/landing/StatsSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import SuitabilitySection from '@/components/landing/SuitabilitySection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedBondsSection />
        <LeadFormSection />
        <ProcessSection />
        <StatsSection />
        <BenefitsSection />
        <SuitabilitySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
