import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';
import { HelpCircle, User } from 'lucide-react';
import barclaysLogo from '@/assets/barclays-logo.png';
import barclaysLogoDark from '@/assets/barclays-logo-dark.svg';

const RegistrationHeader = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logo = mounted && resolvedTheme === 'dark' ? barclaysLogoDark : barclaysLogo;

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-sm"
    >
      {/* Main Row */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a 
              href="https://www.ib.barclays/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <img src={logo} alt="Barclays" className="h-7 w-auto" />
              <span className="text-muted-foreground/50 text-xl font-light hidden sm:inline">|</span>
              <span className="text-foreground text-lg font-medium hidden sm:inline">Investment Bank</span>
            </a>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="mailto:support@ib.barclays"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Need Help?</span>
              </a>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Client Login</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Page Title Row */}
      <div className="border-b border-border bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <span className="font-semibold text-sm text-foreground">
              Bond Investment Application
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Secure • Bank-grade encryption
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default RegistrationHeader;
