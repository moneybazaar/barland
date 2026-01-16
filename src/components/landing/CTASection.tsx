import { motion } from 'framer-motion';
import { CalendarCheck, Phone, MessageCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="consultation" className="py-20 md:py-28 hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-serif">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10">
            Connect with our fixed income specialists to explore personalized solutions 
            that align with your wealth preservation and income goals.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#"
              className="neu-button px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <CalendarCheck className="w-5 h-5" />
              Schedule Consultation
            </a>
            <a
              href="tel:1-800-BARCLAYS"
              className="px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5" />
              1-800-BARCLAYS
            </a>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid sm:grid-cols-3 gap-6"
          >
            <div className="glass rounded-xl p-6 text-center">
              <CalendarCheck className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-secondary mb-1">Schedule Online</h3>
              <p className="text-sm text-muted-foreground">Book a video consultation at your convenience</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-secondary mb-1">Call Us</h3>
              <p className="text-sm text-muted-foreground">Speak directly with a specialist</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-secondary mb-1">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Get quick answers to your questions</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
