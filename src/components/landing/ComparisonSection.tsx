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
    <section id="comparison" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 section-title">
            The Barclays Advantage
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-8">
            Experience institutional-grade fixed income solutions that deliver more value
            than typical retail alternatives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-card rounded-xl overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="grid grid-cols-3 comparison-header">
            <div className="p-5 font-semibold">Feature</div>
            <div className="p-5 font-semibold text-center border-l border-secondary-foreground/20">
              Barclays Institutional
            </div>
            <div className="p-5 font-semibold text-center border-l border-secondary-foreground/20">
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
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`grid grid-cols-3 border-b border-border last:border-b-0 ${
                index % 2 === 0 ? 'bg-barclays-light-blue/30' : ''
              }`}
            >
              <div className="p-5 font-medium text-secondary">{row.feature}</div>
              <div className="p-5 flex justify-center items-center border-l border-border">
                {row.barclays === true ? (
                  <div className="w-8 h-8 rounded-full bg-trust-green/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-trust-green" />
                  </div>
                ) : (
                  <span className="text-trust-green font-medium">{row.barclays}</span>
                )}
              </div>
              <div className="p-5 flex justify-center items-center border-l border-border">
                {row.retail === false ? (
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-destructive" />
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
