import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const criteria = [
  'Private investors seeking diversified fixed income strategies',
  'Clients looking for professional portfolio management and advisory',
  'Investors seeking institutional-grade investment access',
  'Individuals prioritising capital preservation alongside yield',
  'High-net-worth clients requiring dedicated relationship management',
];

const SuitabilitySection = () => {
  return (
    <section className="py-20 md:py-28 section-gray">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl section-title">
              Who This Is Designed For
            </h2>
            <p className="section-description">
              Our investment solutions are structured for clients who value professional oversight and institutional quality.
            </p>
          </motion.div>

          <div className="space-y-4">
            {criteria.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="checklist-item"
              >
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-secondary dark:text-foreground font-medium">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuitabilitySection;
