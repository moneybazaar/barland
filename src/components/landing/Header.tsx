import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-secondary font-serif tracking-tight">
              BARCLAYS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-muted-foreground hover:text-primary transition-colors font-medium animated-underline">
              Solutions
            </a>
            <a href="#comparison" className="text-muted-foreground hover:text-primary transition-colors font-medium animated-underline">
              Why Barclays
            </a>
            <a href="#process" className="text-muted-foreground hover:text-primary transition-colors font-medium animated-underline">
              Process
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors font-medium animated-underline">
              FAQ
            </a>
          </nav>

          {/* CTA & Security */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 text-trust-green" />
              <span>Secure</span>
            </div>
            <button className="neu-button px-5 py-2.5 rounded-lg font-semibold text-sm">
              Client Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 bg-secondary transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-secondary transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-secondary transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pt-4 pb-2"
          >
            <nav className="flex flex-col gap-4">
              <a href="#products" className="text-muted-foreground hover:text-primary transition-colors py-2">Solutions</a>
              <a href="#comparison" className="text-muted-foreground hover:text-primary transition-colors py-2">Why Barclays</a>
              <a href="#process" className="text-muted-foreground hover:text-primary transition-colors py-2">Process</a>
              <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors py-2">FAQ</a>
              <button className="neu-button px-5 py-2.5 rounded-lg font-semibold text-sm w-full mt-2">
                Client Login
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
