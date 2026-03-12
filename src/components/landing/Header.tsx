import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import barclaysLogo from '@/assets/barclays-logo.png';
import barclaysLogoDark from '@/assets/barclays-logo-dark.svg';
import { ThemeToggle } from '@/components/theme-toggle';
import { useRegion, Region } from '@/contexts/RegionContext';

const regionCycle: Region[] = ['US', 'SG', 'UK'];
const regionFlags: Record<Region, string> = {
  US: 'https://flagcdn.com/w40/us.png',
  SG: 'https://flagcdn.com/w40/sg.png',
  UK: 'https://flagcdn.com/w40/gb.png',
};

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { region, config, setRegion } = useRegion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLogo = mounted && resolvedTheme === 'dark' ? barclaysLogoDark : barclaysLogo;

  const cycleRegion = () => {
    const idx = regionCycle.indexOf(region);
    setRegion(regionCycle[(idx + 1) % regionCycle.length]);
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm"
    >
      <div className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="https://secure.barclays-ib.app/" className="flex items-center gap-2 sm:gap-3" target="_blank" rel="noopener noreferrer">
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

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href={`tel:${config.phoneNumber}`}
                className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{config.phoneDisplay}</span>
              </a>

              <a
                href={`tel:${config.phoneNumber}`}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5 text-foreground" />
              </a>

              <a
                href="https://secure.barclays-ib.app/openaccount"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Open Account
              </a>

              {/* Region Toggle - cycles US → SG → UK */}
              <button
                onClick={cycleRegion}
                className="flex items-center gap-2 px-3 py-1.5 rounded border border-border hover:bg-muted transition-colors text-foreground"
                aria-label="Switch region"
              >
                <img
                  src={regionFlags[region]}
                  alt={region}
                  className="w-5 h-3.5 object-cover rounded-[2px]"
                />
                <span className="text-xs font-semibold tracking-wide uppercase">{region}</span>
              </button>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
