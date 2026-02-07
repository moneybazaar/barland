import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import barclaysLogo from '@/assets/barclays-logo.png';
import barclaysLogoDark from '@/assets/barclays-logo-dark.svg';
import { ThemeToggle } from '@/components/theme-toggle';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLogo = mounted && resolvedTheme === 'dark' ? barclaysLogoDark : barclaysLogo;

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-sm"
    >
      <div className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="https://www.ib.barclays/" className="flex items-center gap-2 sm:gap-3" target="_blank" rel="noopener noreferrer">
              <img 
                src={currentLogo} 
                alt="Barclays" 
                className="h-6 sm:h-7 w-auto" 
              />
              <span className="hidden sm:inline text-muted-foreground/50 text-xl font-light">|</span>
              <span className="hidden sm:inline text-foreground text-lg font-medium tracking-wide">
                Investment Bank
              </span>
            </a>

            {/* Right Side - Phone + CTA + Theme Toggle */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Phone Number - Hidden on mobile, shown on sm+ */}
              <a
                href="tel:+18002272597"
                className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">1-800-BARCLAYS</span>
              </a>

              {/* Phone Icon Only - Shown on mobile */}
              <a
                href="tel:+18002272597"
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5 text-foreground" />
              </a>

              {/* Contact CTA */}
              <a
                href="https://secure.barclays-ib.app/openaccount"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Open Account
              </a>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
