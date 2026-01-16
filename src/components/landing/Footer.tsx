import { Linkedin, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  aboutUs: [
    { label: 'Careers', href: 'https://search.jobs.barclays/investment-bank' },
    { label: 'Citizenship', href: 'https://home.barclays/citizenship/' },
    { label: 'Investor Relations', href: 'https://home.barclays/investor-relations/' },
    { label: 'News', href: 'https://home.barclays/news/' },
    { label: 'Sponsorship', href: 'https://home.barclays/sponsorships/' },
    { label: 'Barclays Live', href: 'https://live.barcap.com/' },
    { label: 'BARX', href: 'https://www.barxis.com/' },
  ],
  otherIBWebsites: [
    { label: 'Barclays Indices', href: 'https://indices.cib.barclays/' },
    { label: 'Barclays Investment Managers', href: 'https://www.barclaysinvestmentmanagers.com/' },
    { label: 'Barclays Japan', href: 'https://japan.cib.barclays/' },
    { label: 'BARX Investor Solutions', href: 'https://www.barxis.com/' },
  ],
  otherBarclaysWebsites: [
    { label: 'Barclaycard', href: 'https://www.barclaycard.co.uk/' },
    { label: 'Barclays Group', href: 'https://home.barclays/' },
    { label: 'Corporate Banking', href: 'https://www.barclayscorporate.com/' },
    { label: 'Personal, Premier and Business Banking', href: 'https://www.barclays.co.uk/' },
    { label: 'Private Bank', href: 'https://privatebank.barclays.com/' },
    { label: 'Wealth Management', href: 'https://www.barclays.co.uk/wealth-management/' },
  ],
  legal: [
    { label: 'Important information', href: 'https://www.ib.barclays/important-information.html' },
    { label: 'Privacy Notice', href: 'https://www.ib.barclays/privacy-and-cookie-policy.html' },
    { label: 'Disclosures', href: 'https://www.ib.barclays/disclosures.html' },
    { label: 'Accessibility', href: 'https://www.ib.barclays/accessibility.html' },
    { label: 'Cookies policy', href: 'https://www.ib.barclays/privacy-and-cookie-policy.html' },
  ],
};

const socialLinks = [
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/showcase/barclays-investment-bank',
    label: 'LinkedIn'
  },
  { 
    icon: Instagram, 
    href: 'https://www.instagram.com/barclaysib/',
    label: 'Instagram'
  },
  { 
    icon: Youtube, 
    href: 'https://www.youtube.com/@barclaysib',
    label: 'YouTube'
  },
];

const Footer = () => {
  return (
    <footer>
      {/* Social Media Bar */}
      <div className="bg-barclays-navy">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-white font-medium">Follow us</span>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="bg-barclays-navy border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* About Us */}
            <div>
              <h3 className="text-white font-semibold mb-6">About Us</h3>
              <ul className="space-y-3">
                {footerLinks.aboutUs.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other IB Websites */}
            <div>
              <h3 className="text-white font-semibold mb-6">Other IB websites</h3>
              <ul className="space-y-3">
                {footerLinks.otherIBWebsites.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Barclays Websites */}
            <div>
              <h3 className="text-white font-semibold mb-6">Other Barclays Websites</h3>
              <ul className="space-y-3">
                {footerLinks.otherBarclaysWebsites.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Strip */}
      <div className="bg-barclays-dark">
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
              {footerLinks.legal.map((link, index) => (
                <span key={link.label} className="flex items-center">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-white/30 ml-4">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Copyright */}
            <span className="text-white/70 text-xs">
              © Barclays {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
