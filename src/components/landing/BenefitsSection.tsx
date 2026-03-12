import { motion } from 'framer-motion';
import { Building2, BarChart3, FileText, PieChart, Headphones, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: Building2,
    title: 'Institutional Access',
    description: 'Gain access to institutional-grade fixed income products typically reserved for large-scale investors.',
    stat: 'Tier 1',
    statLabel: 'Bank Backed',
  },
  {
    icon: BarChart3,
    title: 'Portfolio Management',
    description: 'Expert portfolio construction and ongoing management by experienced fixed income specialists.',
    stat: '24/7',
    statLabel: 'Monitoring',
  },
  {
    icon: FileText,
    title: 'Transparent Reporting',
    description: 'Comprehensive quarterly reports with full visibility into portfolio performance and holdings.',
    stat: '100%',
    statLabel: 'Transparency',
  },
  {
    icon: PieChart,
    title: 'Diversified Strategies',
    description: 'Structured diversification across maturities, credit ratings, and geographic exposure.',
    stat: 'AAA',
    statLabel: 'Rated Bonds',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'A named relationship manager available to discuss your portfolio and investment objectives.',
    stat: '<24h',
    statLabel: 'Response Time',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Protection',
    description: 'Investments held under regulatory oversight with deposit insurance protections where applicable.',
    stat: 'FDIC',
    statLabel: 'Insured',
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Navy background */}
      <div className="absolute inset-0" style={{ background: 'hsl(200 100% 18%)' }} />
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Key Benefits
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, hsl(195 100% 47%) 0%, hsl(195 100% 60%) 100%)' }} />
          <p className="text-white/60 text-lg max-w-2xl mx-auto mt-6" style={{ lineHeight: 1.7 }}>
            Why private clients choose our institutional fixed income solutions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/40"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="p-7">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/15 group-hover:bg-primary/25 transition-colors duration-300">
                    <benefit.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  {/* Mini stat badge */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary leading-none">{benefit.stat}</div>
                    <div className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">{benefit.statLabel}</div>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
