import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const comparisonData = [
  { feature: 'FDIC Insurance Coverage', barclays: true, retail: 'Limited' },
  { feature: 'Institutional-Grade Yields', barclays: true, retail: false },
  { feature: 'Multi-Bank CD Programs', barclays: true, retail: false },
  { feature: 'Secondary Market Liquidity', barclays: true, retail: false },
  { feature: 'Dedicated Fixed Income Research', barclays: true, retail: false },
  { feature: 'Personalized Portfolio Structuring', barclays: true, retail: false },
  { feature: 'Tax-Optimization Strategies', barclays: true, retail: 'Basic' },
  { feature: 'Priority Access to New Issues', barclays: true, retail: false },
];

const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl section-title">
            The Barclays Advantage
          </h2>
          <p className="section-description">
            Experience institutional-grade fixed income solutions that deliver more value
            than typical retail alternatives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 16px 60px rgba(0, 0, 0, 0.1)' }}
        >
          {/* Header */}
          <div className="grid grid-cols-3" style={{ background: 'hsl(200 100% 18%)' }}>
            <div className="p-6 font-bold text-white">Feature</div>
            <div className="p-6 font-bold text-center text-white border-l border-white/10">
              Barclays Institutional
            </div>
            <div className="p-6 font-bold text-center text-white/70 border-l border-white/10">
              Typical Retail
            </div>
          </div>

          {/* Body */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`grid grid-cols-3 border-b border-border last:border-b-0 ${
                index % 2 === 0 ? 'bg-muted/30' : 'bg-white'
              }`}
            >
              <div className="p-5 font-medium text-secondary">{row.feature}</div>
              <div className="p-5 flex justify-center items-center border-l border-border">
                {row.barclays === true ? (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(160 84% 39%) 0%, hsl(160 84% 35%) 100%)' }}>
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                ) : (
                  <span className="text-trust-green font-bold">{row.barclays}</span>
                )}
              </div>
              <div className="p-5 flex justify-center items-center border-l border-border">
                {row.retail === false ? (
                  <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-destructive" strokeWidth={2.5} />
                  </div>
                ) : (
                  <span className="text-muted-foreground">{row.retail}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
