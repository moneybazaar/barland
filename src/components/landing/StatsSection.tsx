import { motion } from 'framer-motion';
import { Shield, TrendingUp, Lock, Clock } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const stats = [
  {
    icon: Shield,
    value: '$250K',
    label: 'FDIC Insurance Per Institution',
    suffix: '',
  },
  {
    icon: TrendingUp,
    value: '4.5-7.5',
    label: 'Current Yield Range',
    suffix: '%',
  },
  {
    icon: Lock,
    value: '100',
    label: 'Principal Protection at Maturity',
    suffix: '%',
  },
  {
    icon: Clock,
    value: '3-5',
    label: 'Days Typical Liquidity Access',
    suffix: ' Days',
  },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 -mt-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="container mx-auto"
      >
        <div className="stats-card p-10 md:p-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="stat-icon mx-auto">
                  <stat.icon strokeWidth={1.5} />
                </div>
                <div className="stat-value">
                  {stat.value}{stat.suffix}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
