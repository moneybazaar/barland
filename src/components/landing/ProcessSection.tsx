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
    <section id="process" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl section-title">
            A Seamless Path from Plan to Account
          </h2>
          <p className="section-description">
            Our streamlined digital journey makes accessing institutional-grade 
            fixed income solutions simple and secure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-7 left-[14%] right-[14%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="text-center relative"
            >
              <div className="process-step-number mx-auto mb-8 relative z-10">
                {step.number}
              </div>
              
              <div className="feature-icon mx-auto mb-5">
                <step.icon strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-bold text-secondary mb-4">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
