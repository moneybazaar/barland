import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  return (
    <section className="hero-split">
      {/* Left Content Side */}
      <div className="hero-content">
        <div className="max-w-xl">
          {/* Category Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-category"
          >
            SOLUTIONS
          </motion.span>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-title"
          >
            Investment Banking
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-description mb-10"
          >
            Successfully navigating the rapid, disruptive shifts reshaping industries 
            and business models takes a partner who deeply understands your goals. 
            Together, let's create the tailored, sophisticated financial strategies 
            you need to power possible.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/register-interest"
              className="hero-cta"
            >
              Register Your Interest
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right Image Side */}
      <div 
        className="hero-image"
        style={{ 
          backgroundImage: `url(${heroBackground})`,
          backgroundPosition: 'center 0px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />
    </section>
  );
};

export default HeroSection;
