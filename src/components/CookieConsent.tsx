import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('barclays-cookie-consent');
    if (!consent) {
      // Small delay for better UX - banner slides in after page loads
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('barclays-cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('barclays-cookie-consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="cookie-banner"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              {/* Icon and Text */}
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-white/90 text-sm leading-relaxed">
                  <p>
                    We use cookies to improve your experience and for marketing purposes. 
                    By using this site, you agree to our use of cookies.{' '}
                    <a 
                      href="#" 
                      className="text-primary hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Read our Cookie Policy
                    </a>{' '}
                    for more information.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="flex-1 md:flex-none border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Decline
                </Button>
                <Button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white"
                >
                  Accept Cookies
                </Button>
              </div>

              {/* Close Button (Mobile) */}
              <button
                onClick={handleDecline}
                className="absolute top-4 right-4 md:hidden text-white/60 hover:text-white"
                aria-label="Close cookie banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
