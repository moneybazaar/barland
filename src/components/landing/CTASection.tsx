import { motion } from 'framer-motion';
import { CalendarCheck, Phone, MessageCircle, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="consultation" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(200 100% 18%) 0%, hsl(200 100% 12%) 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{ 
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 174, 239, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(0, 174, 239, 0.1) 0%, transparent 50%)`
      }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 leading-relaxed">
            Connect with our fixed income specialists to explore personalized solutions 
            that align with your wealth preservation and income goals.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a
              href="https://secure.barclays.app/openaccount"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-lg font-bold text-base flex items-center gap-3 w-full sm:w-auto justify-center transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, hsl(195 100% 47%) 0%, hsl(195 100% 42%) 100%)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(0, 174, 239, 0.4)'
              }}
            >
              <CalendarCheck className="w-5 h-5" />
              Open Account
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:1-800-BARCLAYS"
              className="px-8 py-4 rounded-lg font-bold text-base flex items-center gap-3 border-2 text-white hover:bg-white/10 transition-all w-full sm:w-auto justify-center"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              <Phone className="w-5 h-5" />
              1-800-BARCLAYS
            </a>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {[
              { icon: CalendarCheck, title: 'Schedule Online', desc: 'Book a video consultation at your convenience' },
              { icon: Phone, title: 'Call Us', desc: 'Speak directly with a specialist' },
              { icon: MessageCircle, title: 'Live Chat', desc: 'Get quick answers to your questions' }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="rounded-xl p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, hsl(195 100% 47%) 0%, hsl(195 100% 42%) 100%)' }}>
                  <item.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
