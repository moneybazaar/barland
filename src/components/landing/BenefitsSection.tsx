import { motion } from 'framer-motion';
import { Building2, BarChart3, FileText, PieChart, Headphones, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: Building2,
    title: 'Institutional Investment Access',
    description: 'Gain access to institutional-grade fixed income products typically reserved for large-scale investors.',
  },
  {
    icon: BarChart3,
    title: 'Professional Portfolio Management',
    description: 'Expert portfolio construction and ongoing management by experienced fixed income specialists.',
  },
  {
    icon: FileText,
    title: 'Transparent Performance Reporting',
    description: 'Comprehensive quarterly reports with full visibility into portfolio performance and holdings.',
  },
  {
    icon: PieChart,
    title: 'Diversified Investment Strategies',
    description: 'Structured diversification across maturities, credit ratings, and geographic exposure.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Client Support',
    description: 'A named relationship manager available to discuss your portfolio and investment objectives.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Protection',
    description: 'Investments held under regulatory oversight with deposit insurance protections where applicable.',
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background image with heavy overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/investment-banking-bg.jpg')` }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(245,245,245,0.95) 100%)' }} />
      <div className="dark:hidden absolute inset-0" />
      {/* Dark mode: full opaque overlay */}
      <div className="hidden dark:block absolute inset-0 bg-background" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl section-title">
            Key Benefits
          </h2>
          <p className="section-description">
            Why private clients choose our institutional fixed income solutions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="benefit-card"
            >
              <div className="benefit-icon">
                <benefit.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-secondary dark:text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
