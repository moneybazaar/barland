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
    <section ref={sectionRef} className="relative z-20 -mt-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container mx-auto"
      >
        <div className="stats-card p-8 md:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="feature-icon mx-auto mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
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
