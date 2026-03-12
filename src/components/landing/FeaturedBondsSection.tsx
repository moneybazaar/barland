import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';

interface Bond {
  id: string;
  rate: string;
  rateValue: number;
  maturityYear: string;
  maturityDate: string;
  amount: string;
  isin: string;
  payment: string;
  verifyLink: string;
}

const usBonds: Bond[] = [
  {
    id: '1',
    rate: '7.385%',
    rateValue: 7.385,
    maturityYear: '2028',
    maturityDate: '11/02/2028',
    amount: '$1,500,000,000',
    isin: 'US06738ECD58',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202222-28-bond-2028-us06738ecd58',
  },
  {
    id: '2',
    rate: '6.036%',
    rateValue: 6.036,
    maturityYear: '2055',
    maturityDate: '03/12/2055',
    amount: '$750,000,000',
    isin: 'US06738ECS28',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202424-55-bond-2055-us06738ecs28?miRedirects=2',
  },
  {
    id: '3',
    rate: '5.86%',
    rateValue: 5.86,
    maturityYear: '2046',
    maturityDate: '8/11/2046',
    amount: '$1,250,000,000',
    isin: 'US06738EDE23',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202525-46-bond-2046-us06738ede23?miRedirects=2',
  },
  {
    id: '4',
    rate: '4.47%',
    rateValue: 4.47,
    maturityYear: '2029',
    maturityDate: '11/11/2029',
    amount: '$1,500,000,000',
    isin: 'US06738EDD40',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202525-29-bond-2029-us06738edd40?miRedirects=1',
  },
];

const sgBonds: Bond[] = [
  {
    id: 'sg1',
    rate: '7.385%',
    rateValue: 7.385,
    maturityYear: '2028',
    maturityDate: '11/02/2028',
    amount: '$1,500,000,000',
    isin: 'US06738ECD58',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202222-28-bond-2028-us06738ecd58',
  },
  {
    id: 'sg2',
    rate: '6.036%',
    rateValue: 6.036,
    maturityYear: '2055',
    maturityDate: '03/12/2055',
    amount: '$750,000,000',
    isin: 'US06738ECS28',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202424-55-bond-2055-us06738ecs28?miRedirects=2',
  },
  {
    id: 'sg3',
    rate: '5.86%',
    rateValue: 5.86,
    maturityYear: '2046',
    maturityDate: '8/11/2046',
    amount: '$1,250,000,000',
    isin: 'US06738EDE23',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202525-46-bond-2046-us06738ede23?miRedirects=2',
  },
  {
    id: 'sg4',
    rate: '4.47%',
    rateValue: 4.47,
    maturityYear: '2029',
    maturityDate: '11/11/2029',
    amount: '$1,500,000,000',
    isin: 'US06738EDD40',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202525-29-bond-2029-us06738edd40?miRedirects=1',
  },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const FeaturedBondsSection = () => {
  const { config } = useRegion();
  const bonds = config.region === 'SG' ? sgBonds : usBonds;

  return (
    <section id="bonds" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl section-title">
            Investment Strategy Overview
          </h2>
          <p className="section-description">
            Explore our featured fixed rate bonds with competitive yields and institutional backing.
          </p>
        </motion.div>

        {/* Bond Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {bonds.map((bond, index) => (
            <motion.div
              key={bond.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="bond-card group"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/80 to-primary/40" />
              
              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="bond-maturity-badge">
                    Matures {bond.maturityYear}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Fixed Rate Bond
                  </span>
                </div>

                {/* Rate Display with gradient bg */}
                <div className="text-center py-7 mb-5 rounded-xl relative overflow-hidden" style={{
                  background: 'linear-gradient(135deg, hsl(195 100% 47% / 0.08) 0%, hsl(200 100% 18% / 0.06) 100%)',
                }}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 200 }}
                    className="bond-rate"
                  >
                    {bond.rate}
                  </motion.div>
                  <div className="text-muted-foreground text-sm mt-1.5 font-medium tracking-wide">per annum</div>
                </div>

                <div className="space-y-0 border-t border-border pt-4">
                  <div className="bond-detail-row">
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">ISIN</span>
                    <span className="font-mono text-xs text-secondary dark:text-foreground">{bond.isin}</span>
                  </div>
                  <div className="bond-detail-row">
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">Total Amount</span>
                    <span className="font-semibold text-secondary dark:text-foreground">{bond.amount}</span>
                  </div>
                  <div className="bond-detail-row">
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">Payment</span>
                    <span className="text-secondary dark:text-foreground text-sm">{bond.payment}</span>
                  </div>
                  <div className="bond-detail-row">
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">Maturity Date</span>
                    <span className="text-secondary dark:text-foreground text-sm">{bond.maturityDate}</span>
                  </div>
                </div>

                <a
                  href={bond.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="verify-button mt-5"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify on Market
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Buy-back paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground text-sm max-w-3xl mx-auto text-center mb-10"
        >
          Barclays Investment Bank initiated the fixed bond buy back scheme to give private investors security on large capital deposits. The ethos and guiding principles of Barclays Bank plc and its subsidiaries has always been to achieve above market returns whilst achieving capital preservation as the cornerstone of our firm's ethics and credibility. Since the inception of the buy back scheme, Barclays Bank and affiliate brokerages have operated a bond buy back scheme up to {config.buyBackAmount} per client per institution. These bonds apply to fixed income bonds only.
        </motion.p>

        {/* CTA to Lead Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-base text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, hsl(195 100% 47%) 0%, hsl(195 100% 42%) 100%)',
              boxShadow: '0 4px 14px rgba(0, 174, 239, 0.4)',
            }}
          >
            Speak With an Advisor
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Insurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="fdic-banner mt-10 mb-6"
        >
          <img src={config.insuranceLogo} alt={config.insuranceAbbr} className={`h-10 w-auto flex-shrink-0 ${config.region === 'UK' ? '' : 'dark:invert'}`} />
          <div>
            <div className="font-semibold text-secondary dark:text-foreground">{config.insuranceAbbr} Insured Up to {config.coverageAmountFull}</div>
            <div className="text-sm text-muted-foreground">{config.insuranceMotto}</div>
          </div>
        </motion.div>

        {/* Investment Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-muted-foreground text-center leading-relaxed max-w-3xl mx-auto"
        >
          Investment in bonds involves risk, including possible loss of principal. 
          Past performance is not indicative of future results. The bonds featured 
          are subject to availability and market conditions. Verify all details 
          directly with issuing institutions before investing.
        </motion.p>
      </div>
    </section>
  );
};

export default FeaturedBondsSection;
