import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { config } = useRegion();

  const faqs = [
    {
      question: `What is ${config.insuranceAbbr} insurance and how does it protect my investments?`,
      answer: config.region === 'US'
        ? 'FDIC (Federal Deposit Insurance Corporation) insurance protects depositors against the loss of their insured deposits if an FDIC-insured bank fails. Coverage is up to $250,000 per depositor, per insured bank, for each account ownership category.'
        : 'SDIC (Singapore Deposit Insurance Corporation) protects depositors by insuring their deposits placed with member banks and finance companies. Coverage is up to S$100,000 per depositor, per Scheme member.',
    },
    {
      question: 'What is the minimum investment for fixed rate bonds?',
      answer: `Minimum investment amounts vary by bond issuance. Typically, Barclays fixed rate bonds are available from ${config.region === 'US' ? '$1,000' : 'S$1,000'} in face value. For personalised portfolio structuring and dedicated advisory services, we recommend a minimum of ${config.region === 'US' ? '$100,000' : 'S$100,000'}.`,
    },
    {
      question: 'How liquid are fixed rate bonds?',
      answer: 'Barclays fixed rate bonds can be sold on the secondary market prior to maturity, typically settling in 1-3 business days. Pricing on the secondary market will reflect prevailing interest rates and market conditions. Holding to maturity guarantees the stated coupon rate and full return of principal.',
    },
    {
      question: 'What does the bond buy-back scheme mean for investors?',
      answer: `Barclays operates a bond buy-back scheme allowing private investors to sell their fixed income bonds back to the bank or affiliated brokerages, up to ${config.buyBackAmount} per client per institution. This provides an additional liquidity option beyond the secondary market.`,
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 section-gray">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl section-title">
            Frequently Asked Questions
          </h2>
          <p className="section-description">
            Find answers to common questions about our {config.insuranceAbbr}-insured fixed income solutions.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="faq-item"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className="faq-question pr-6">{faq.question}</span>
                <div className="faq-toggle flex-shrink-0">
                  {openIndex === index ? (
                    <Minus strokeWidth={2} />
                  ) : (
                    <Plus strokeWidth={2} />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
