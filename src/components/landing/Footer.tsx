import { Shield, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-gradient text-primary-foreground">
      {/* Disclaimer Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-6 py-10">
          <h3 className="text-lg font-semibold mb-4">Important Disclosures</h3>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            All investments carry risk. FDIC insurance is subject to limits and applies only to deposit products 
            at insured banks. Past performance is not a guarantee of future results. Fixed income securities 
            are subject to interest rate, credit, and inflation risk. The value of securities may fluctuate, 
            and you may receive more or less than your original investment when sold prior to maturity. 
            Annuities are long-term insurance products. Guarantees are subject to the claims-paying ability 
            of the issuing insurance company. FDIC and SIPC insurance do not apply to annuity contracts. 
            Barclays acts as a marketing agent and/or investment advisor for these products. This material 
            is provided for informational purposes only and does not constitute an offer, solicitation, or 
            recommendation to buy or sell any securities. Please consult with a qualified professional 
            regarding your specific situation.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-serif">BARCLAYS</span>
            </div>
            <p className="text-sm text-primary-foreground/60 mb-6">
              Trusted wealth management solutions for sophisticated investors.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Brokered CDs</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Treasuries</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Agency Bonds</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Fixed Annuities</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Market Insights</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Education Center</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Yield Calculator</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Webinars</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Our Team</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Cookie Preferences</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">Form CRS</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">FINRA BrokerCheck</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Barclays Investment Solutions. All rights reserved.</p>
          <p>Member FINRA/SIPC | NMLS #123456</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
