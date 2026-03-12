import { motion } from 'framer-motion';
import { ArrowRight, Shield, Briefcase, Users } from 'lucide-react';
import heroImage from '@/assets/hero-ib.jpg';

const trustIndicators = [
  { icon: Shield, label: 'Private Client Services' },
  { icon: Briefcase, label: 'Institutional Strategies' },
  { icon: Users, label: 'Dedicated Management' },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Full-width Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      <div className="absolute inset-0 hero-pattern opacity-60" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-20">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-white/90 mb-6"
          >
            SOLUTIONS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-4"
            style={{ lineHeight: 1.08, letterSpacing: '-0.02em' }}
          >
            Institutional Investment Opportunities
            <span className="block text-white/80 text-2xl md:text-3xl xl:text-4xl mt-3 font-medium">
              For Private Clients
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg xl:text-xl text-white/80 leading-relaxed mb-10 max-w-xl"
          >
            Access professionally managed investment strategies designed for
            long-term capital growth, backed by the strength and reliability
            of a Tier 1 investment bank.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 px-10 py-4 font-bold text-base text-primary-foreground rounded-md transition-all duration-300 hover:-translate-y-0.5 group"
              style={{
                background: 'linear-gradient(135deg, hsl(195 100% 47%) 0%, hsl(195 100% 42%) 100%)',
                boxShadow: '0 4px 14px rgba(0, 174, 239, 0.4)',
              }}
            >
              Request a Call Back
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#bonds"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-base text-white border border-white/25 rounded-md hover:bg-white/10 transition-all duration-300"
            >
              View Bonds
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-5"
          >
            {trustIndicators.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-white/70 text-sm">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/20">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
