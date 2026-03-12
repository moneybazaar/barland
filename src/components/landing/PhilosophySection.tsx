import { motion } from 'framer-motion';
import { ShieldCheck, Target, TrendingUp, BookOpen } from 'lucide-react';

const principles = [
  {
    icon: ShieldCheck,
    title: 'Capital Preservation',
    description: 'Our primary obligation is to protect client capital through rigorous risk management and institutional-grade due diligence.',
  },
  {
    icon: Target,
    title: 'Risk Discipline',
    description: 'We apply systematic risk frameworks to every investment decision, ensuring portfolios remain aligned with client objectives.',
  },
  {
    icon: TrendingUp,
    title: 'Long-Term Growth',
    description: 'Our strategies are designed to compound returns over time, prioritising sustainable performance over short-term speculation.',
  },
  {
    icon: BookOpen,
    title: 'Institutional Research',
    description: 'Every recommendation is underpinned by deep fundamental analysis, macroeconomic insight, and proprietary research capabilities.',
  },
];

const PhilosophySection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(200 100% 15%) 0%, hsl(213 50% 10%) 100%)' }}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 30% 70%, rgba(0, 174, 239, 0.2) 0%, transparent 50%),
                          radial-gradient(circle at 70% 30%, rgba(0, 174, 239, 0.15) 0%, transparent 50%)`
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 block mb-4">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Our Investment Philosophy
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, hsl(195 100% 47%) 0%, hsl(195 100% 60%) 100%)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl border transition-all duration-400"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{
                background: 'linear-gradient(135deg, hsl(195 100% 47% / 0.2) 0%, hsl(195 100% 47% / 0.1) 100%)',
              }}>
                <principle.icon className="w-7 h-7" style={{ color: 'hsl(195 100% 55%)' }} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ letterSpacing: '-0.01em' }}>
                {principle.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
