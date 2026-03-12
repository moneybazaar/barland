import { motion } from 'framer-motion';
import { Video, FileCheck, LayoutDashboard, Smartphone } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Video,
    title: 'Consult & Plan',
    description: 'Connect with a dedicated advisor to discuss your goals and build a personalized fixed income strategy.',
  },
  {
    number: 2,
    icon: FileCheck,
    title: 'Digitally Onboard',
    description: 'Securely complete forms online with industry-leading identity verification and compliance protocols.',
  },
  {
    number: 3,
    icon: LayoutDashboard,
    title: 'Access Your Portal',
    description: 'Monitor your unified portfolio on our secure client platform with real-time valuations and reporting.',
  },
  {
    number: 4,
    icon: Smartphone,
    title: 'Manage & Adjust',
    description: 'Use the Barclays app to view documents, make requests, and connect with your advisory team.',
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden">
      {/* Navy background */}
      <div className="absolute inset-0" style={{ background: 'hsl(200 100% 18%)' }} />
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
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            How the Investment Process Works
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, hsl(195 100% 47%) 0%, hsl(195 100% 60%) 100%)' }} />
          <p className="text-white/60 text-lg max-w-2xl mx-auto mt-6" style={{ lineHeight: 1.7 }}>
            Our streamlined digital journey makes accessing institutional-grade
            fixed income solutions simple and secure.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line — centered on desktop, left-aligned on mobile */}
          <div className="absolute top-0 bottom-0 left-5 md:left-1/2 w-px md:-translate-x-px"
            style={{ background: 'linear-gradient(180deg, transparent 0%, hsl(195 100% 47% / 0.5) 10%, hsl(195 100% 47% / 0.5) 90%, transparent 100%)' }}
          />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={step.number} className="relative">
                  {/* Node on line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="absolute left-5 md:left-1/2 -translate-x-1/2 z-20"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 border-primary text-primary"
                      style={{ background: 'hsl(200 100% 14%)' }}
                    >
                      {step.number}
                    </div>
                    {/* Pulse ring */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="absolute inset-0 rounded-full border border-primary/30 animate-ping"
                      style={{ animationDuration: '3s', animationIterationCount: '1' }}
                    />
                  </motion.div>

                  {/* Card — alternating sides on desktop, always right on mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                    }`}
                  >
                    <div className="group relative rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/40 p-6"
                      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      {/* Top accent */}
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      <div className={`flex items-start gap-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center bg-primary/15 group-hover:bg-primary/25 transition-colors duration-300">
                          <step.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                            {step.title}
                          </h3>
                          <p className="text-sm text-white/50 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
