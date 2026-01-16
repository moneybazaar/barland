import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, X, Menu } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import barclaysLogo from '@/assets/barclays-logo.png';
import { ThemeToggle } from '@/components/theme-toggle';

interface SubMenuItem {
  title: string;
  description: string;
  href: string;
}

interface MenuColumn {
  title: string;
  description: string;
  items: SubMenuItem[];
}

const solutionsMenu: MenuColumn[] = [
  {
    title: 'Investment Banking',
    description: 'Powering long-term growth for companies, governments and financial institutions worldwide through expert strategic advice, financing and risk management solutions.',
    items: [
      { title: 'Mergers & Acquisitions', description: 'Strategic advice for complex transactions', href: 'https://www.ib.barclays/investment-banking/mergers-and-acquisitions.html' },
      { title: 'Equity Capital Markets', description: 'Guidance through all aspects of the equity financing process', href: 'https://www.ib.barclays/investment-banking/equity-capital-markets.html' },
      { title: 'Debt Capital Markets', description: 'Investment grade fixed income debt financing solutions', href: 'https://www.ib.barclays/investment-banking/debt-capital-markets.html' },
      { title: 'Leveraged Finance', description: 'Advisory, arranging and underwriting of high yield debt', href: 'https://www.ib.barclays/investment-banking/leveraged-finance.html' },
      { title: 'Risk Management', description: 'Strategic and tactical risk management solutions', href: 'https://www.ib.barclays/investment-banking/risk-management.html' },
    ],
  },
  {
    title: 'Global Markets',
    description: 'Powering performance for institutional investors with a full range of execution services, forward-thinking ideas and risk management solutions across asset classes.',
    items: [
      { title: 'Macro', description: 'Strategy and execution in global rates and FX products', href: 'https://www.ib.barclays/global-markets/macro.html' },
      { title: 'Equities', description: 'Deep liquidity in cash and derivative products', href: 'https://www.ib.barclays/global-markets/equities.html' },
      { title: 'Credit', description: 'Debt instruments across the capital structure', href: 'https://www.ib.barclays/global-markets/credit.html' },
      { title: 'Securitised Products', description: 'Global solutions across vertically integrated business', href: 'https://www.ib.barclays/global-markets/securitised-products.html' },
      { title: 'Prime Services', description: 'Equity financing and prime derivatives services', href: 'https://www.ib.barclays/global-markets/prime-services.html' },
      { title: 'Fixed Income Financing', description: 'Financing of all fixed income securities', href: 'https://www.ib.barclays/global-markets/fixed-income-financing.html' },
      { title: 'Barclays Investment Managers', description: 'Customised fund solutions across multiple asset classes', href: 'https://www.barclaysinvestmentmanagers.com/' },
    ],
  },
  {
    title: 'Research',
    description: 'Powering perspectives for institutional investors through data-driven analysis, actionable insights and access to our Research analysts across global sectors, markets and economies.',
    items: [
      { title: 'Equity Research', description: 'Industry sector research fuelled by deep expertise', href: 'https://www.ib.barclays/research/equity-research.html' },
      { title: 'Credit Research', description: 'Actionable company, sector and strategy insights', href: 'https://www.ib.barclays/research/credit-research.html' },
      { title: 'Macro & Strategy Research', description: 'Actionable analysis of developed and emerging economies', href: 'https://www.ib.barclays/research/macro-research.html' },
      { title: 'Thematic Investing Research', description: 'Insights to help you navigate long-term, disruptive trends', href: 'https://www.ib.barclays/research/thematic-investing.html' },
      { title: 'Sustainable Investing Research', description: 'Analysis that enhances sustainable investing strategies', href: 'https://www.ib.barclays/research/sustainable-investing.html' },
      { title: 'Data & Investment Sciences', description: 'Finding new ways to leverage data in investing', href: 'https://www.ib.barclays/research/data-investment-sciences.html' },
      { title: 'Quantitative Portfolio Strategy', description: 'Insights into all aspects of the investment process', href: 'https://www.ib.barclays/research/quantitative-portfolio-strategy.html' },
      { title: 'Barclays Live', description: 'Our client portal for institutional investors', href: 'https://live.barcap.com/' },
    ],
  },
  {
    title: 'International Corporate Banking',
    description: 'International Corporate Banking powers the world\'s largest businesses with wholesale lending and sophisticated treasury solutions supported by deep industry knowledge and on-the-ground specialists across the world.',
    items: [
      { title: 'Trade and Working Capital', description: 'A full suite of services to support international operations', href: 'https://www.ib.barclays/corporate-banking/trade-working-capital.html' },
      { title: 'Cash Management', description: 'Solutions to streamline operations and optimise cash flow', href: 'https://www.ib.barclays/corporate-banking/cash-management.html' },
      { title: 'Foreign Exchange', description: 'Expertise to streamline cross-currency transactions', href: 'https://www.ib.barclays/corporate-banking/foreign-exchange.html' },
      { title: 'Lending', description: 'Bespoke lending tailored to your business and goals', href: 'https://www.ib.barclays/corporate-banking/lending.html' },
      { title: 'Green Solutions', description: 'Driving your sustainability ambitions', href: 'https://www.ib.barclays/corporate-banking/green-solutions.html' },
      { title: 'Currency Clearing', description: 'Efficient payments clearing, integration and insight', href: 'https://www.ib.barclays/corporate-banking/currency-clearing.html' },
      { title: 'Payments', description: 'Integrated, innovative and flexible payment solutions', href: 'https://www.ib.barclays/corporate-banking/payments.html' },
      { title: 'Digital Banking', description: 'Bringing you a simpler, more effective digital journey', href: 'https://www.ib.barclays/corporate-banking/digital-banking.html' },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isClientLoginOpen, setIsClientLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const clientLoginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
      if (clientLoginRef.current && !clientLoginRef.current.contains(event.target as Node)) {
        setIsClientLoginOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-sm"
      >
        {/* Top Row - Logo and Actions */}
        <div className="border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="https://www.ib.barclays/" className="flex items-center gap-3" target="_blank" rel="noopener noreferrer">
                <img 
                  src={barclaysLogo} 
                  alt="Barclays" 
                  className="h-7 w-auto" 
                />
                <span className="text-muted-foreground/50 text-xl font-light">|</span>
                <span className="text-foreground text-lg font-medium tracking-wide">
                  Investment Bank
                </span>
              </a>

              {/* Right Side Actions - Desktop */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Contact Us Button */}
                <a
                  href="https://www.ib.barclays/contact-us.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>

                {/* Client Login Dropdown */}
                <div ref={clientLoginRef} className="relative">
                  <button
                    onClick={() => setIsClientLoginOpen(!isClientLoginOpen)}
                    className="flex items-center gap-1.5 px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    Client Login
                    <ChevronDown className={`w-4 h-4 transition-transform ${isClientLoginOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isClientLoginOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-border py-2 z-50"
                      >
                        <a
                          href="https://live.barcap.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 text-foreground hover:bg-muted transition-colors text-sm"
                        >
                          Barclays Live
                        </a>
                        <a
                          href="https://www.barxis.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 text-foreground hover:bg-muted transition-colors text-sm"
                        >
                          BARX
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Search Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 text-foreground hover:text-primary transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                  <span className="text-sm">Search</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row - Navigation */}
        <div className="hidden lg:block border-b border-border">
          <div className="container mx-auto px-6">
            <nav className="flex items-center gap-1 h-12">
              {/* Solutions Dropdown */}
              <div ref={solutionsRef} className="relative">
                <button
                  onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                  className="flex items-center gap-1.5 px-4 py-2 text-foreground hover:text-primary transition-colors font-semibold text-sm"
                >
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <a 
                href="https://www.ib.barclays/insights.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 text-foreground hover:text-primary transition-colors font-semibold text-sm"
              >
                Insights
              </a>

              <a 
                href="https://www.ib.barclays/news-and-events.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 text-foreground hover:text-primary transition-colors font-semibold text-sm"
              >
                News and Events
              </a>
            </nav>
          </div>
        </div>

        {/* Desktop Mega Menu */}
        <AnimatePresence>
          {isSolutionsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="hidden lg:block bg-white dark:bg-slate-800 border-b border-border shadow-xl"
            >
              <div className="container mx-auto px-6 py-8">
                {/* Solutions Header */}
                <div className="mb-6 pb-4 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-2">SOLUTIONS</h2>
                  <p className="text-muted-foreground text-sm max-w-2xl">
                    Barclays Investment Bank offers advisory, finance and risk management services that connect your ideas to capital and power possibilities.
                  </p>
                  <a
                    href="https://www.ib.barclays/solutions.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-primary font-medium text-sm hover:underline"
                  >
                    Explore Solutions →
                  </a>
                </div>

                {/* Four Columns */}
                <div className="grid grid-cols-4 gap-8">
                  {solutionsMenu.map((column) => (
                    <div key={column.title}>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        {column.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        {column.description}
                      </p>
                      <ul className="space-y-2">
                        {column.items.map((item) => (
                          <li key={item.title}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block"
                            >
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                              </span>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.description}
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-slate-900 border-t border-border"
            >
              <nav className="container mx-auto px-6 py-4">
                {/* Solutions Accordion */}
                <div className="border-b border-border pb-2">
                  <button
                    onClick={() => setActiveMobileSection(activeMobileSection === 'solutions' ? null : 'solutions')}
                    className="w-full flex items-center justify-between py-3 text-foreground font-semibold"
                  >
                    Solutions
                    <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileSection === 'solutions' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeMobileSection === 'solutions' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 pb-4"
                      >
                        {solutionsMenu.map((section) => (
                          <div key={section.title} className="mb-4">
                            <h4 className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{section.title}</h4>
                            <ul className="space-y-2">
                              {section.items.slice(0, 4).map((item) => (
                                <li key={item.title}>
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground hover:text-primary text-sm transition-colors"
                                  >
                                    {item.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a 
                  href="https://www.ib.barclays/insights.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block py-3 text-foreground hover:text-primary border-b border-border font-semibold"
                >
                  Insights
                </a>
                <a 
                  href="https://www.ib.barclays/news-and-events.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block py-3 text-foreground hover:text-primary border-b border-border font-semibold"
                >
                  News and Events
                </a>

                <div className="pt-4 space-y-3">
                  <a
                    href="https://www.ib.barclays/contact-us.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm text-center"
                  >
                    Contact Us
                  </a>
                  <a
                    href="https://live.barcap.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-5 py-2.5 border border-border text-foreground rounded-full font-medium text-sm text-center"
                  >
                    Barclays Live
                  </a>
                  <a
                    href="https://www.barxis.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-5 py-2.5 border border-border text-foreground rounded-full font-medium text-sm text-center"
                  >
                    BARX
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center pt-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex items-center gap-4">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="flex-1 text-lg outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
