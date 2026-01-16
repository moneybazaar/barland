import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is FDIC insurance and how does it protect my investments?',
    answer: 'FDIC (Federal Deposit Insurance Corporation) insurance protects depositors against the loss of their insured deposits if an FDIC-insured bank fails. Coverage is up to $250,000 per depositor, per insured bank, for each account ownership category. Our multi-bank CD programs can help maximize your coverage beyond this limit.',
  },
  {
    question: 'How do brokered CDs differ from traditional bank CDs?',
    answer: 'Brokered CDs are issued by banks but purchased through a brokerage. Key advantages include access to CDs from multiple banks through one account, typically higher yields due to institutional pricing, the ability to sell on a secondary market before maturity (rather than facing early withdrawal penalties), and simplified FDIC coverage management across multiple institutions.',
  },
  {
    question: 'What is the minimum investment required?',
    answer: 'Minimum investment amounts vary by product. Brokered CDs typically start at $1,000, while Treasury securities can be purchased in increments of $100. For our fixed annuity solutions and personalized portfolio structuring services, we recommend a minimum of $100,000 to fully benefit from institutional access and dedicated advisory services.',
  },
  {
    question: 'How liquid are these fixed income investments?',
    answer: 'Liquidity varies by product. Treasury securities offer same-day liquidity through a deep secondary market. Brokered CDs can be sold on the secondary market, typically settling in 1-3 business days, though prices may vary based on market conditions. Fixed annuities have contract-specific surrender periods, usually ranging from 3-7 years.',
  },
  {
    question: 'What are the tax implications of these investments?',
    answer: 'U.S. Treasury securities are exempt from state and local income taxes. CD interest is taxable as ordinary income at federal, state, and local levels. Fixed annuity earnings grow tax-deferred until withdrawal, at which point they are taxed as ordinary income. We recommend consulting with a tax advisor for personalized guidance.',
  },
  {
    question: 'How do I get started with Barclays Fixed Income Solutions?',
    answer: 'Getting started is simple. Schedule a consultation with one of our fixed income specialists who will assess your goals, risk tolerance, and time horizon. From there, we will design a customized portfolio, guide you through our secure digital onboarding, and provide ongoing support through your dedicated advisor and our client portal.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            Find answers to common questions about our FDIC-insured fixed income solutions.
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
