import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';

const CTASection = () => {
  const { config } = useRegion();
  return (
    <section id="consultation" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background image with heavy overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/global-markets-bg.jpg')` }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(200 100% 18% / 0.92) 0%, hsl(200 100% 12% / 0.95) 100%)' }} />
      
      <div className="absolute inset-0 opacity-30" style={{ 
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 174, 239, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(0, 174, 239, 0.1) 0%, transparent 50%)`
      }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Interested in Learning More About Our Investment Strategies?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 leading-relaxed">
            Speak with a member of our team to discuss your objectives 
            and explore personalised investment solutions.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#lead-form"
              className="group px-8 py-4 rounded-lg font-bold text-base flex items-center gap-3 w-full sm:w-auto justify-center transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, hsl(195 100% 47%) 0%, hsl(195 100% 42%) 100%)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(0, 174, 239, 0.4)'
              }}
            >
              Request Call Back
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`tel:${config.phoneNumber}`}
              className="px-8 py-4 rounded-lg font-bold text-base flex items-center gap-3 border-2 text-white hover:bg-white/10 transition-all w-full sm:w-auto justify-center"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              <Phone className="w-5 h-5" />
              {config.phoneDisplay}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
