import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRegion } from '@/contexts/RegionContext';

const footerColumns = [
  {
    title: 'About Us',
    links: [
      { label: 'Careers', href: 'https://search.jobs.barclays/search-jobs' },
      { label: 'Citizenship', href: 'https://home.barclays/society/citizenship/' },
      { label: 'Investor Relations', href: 'https://home.barclays/investor-relations/' },
      { label: 'News', href: 'https://home.barclays/news/' },
      { label: 'Sponsorship', href: 'https://home.barclays/who-we-are/sponsorships/' },
    ],
  },
  {
    title: 'Other IB Websites',
    links: [
      { label: 'Barclays Indices', href: 'https://indices.barclays/' },
      { label: 'Barclays Research', href: 'https://live.barcap.com/' },
      { label: 'BARX', href: 'https://www.barx.com/' },
      { label: 'Corporate & Investment Banking', href: 'https://www.cib.barclays/' },
    ],
  },
  {
    title: 'Other Barclays Websites',
    links: [
      { label: 'Barclaycard', href: 'https://www.barclaycard.co.uk/' },
      { label: 'Barclays Corporate', href: 'https://www.barclayscorporate.com/' },
      { label: 'Barclays UK', href: 'https://www.barclays.co.uk/' },
      { label: 'Home.barclays', href: 'https://home.barclays/' },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/showcase/barclays-investment-bank/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/barclaysib/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@barclaysib', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com/baraboraib', label: 'X' },
];

const legalLinks = [
  { label: 'Important information', to: '/important-information' },
  { label: 'Privacy Notice', to: '/privacy-notice' },
  { label: 'Disclosures', to: '/disclosures' },
  { label: 'Accessibility', to: '/accessibility' },
  { label: 'Cookies policy', to: '/cookies-policy' },
];

const Footer = () => {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const { config } = useRegion();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* 4-Column Links Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{column.title}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow Us Column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Follow Us</h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
            {/* Insurance Badge */}
            <div className="flex items-center gap-3 mt-6">
              <img
                src={config.insuranceLogo}
                alt={config.insuranceAbbr}
                className={`h-10 w-auto ${config.region === 'UK' ? '' : 'brightness-0 invert'}`}
              />
              <span className="text-white/50 text-xs leading-tight">{config.insuranceMotto}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom Legal Bar */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
          {legalLinks.map((link, index) => (
            <span key={link.label} className="flex items-center">
              <Link
                to={link.to}
                className="text-primary hover:underline text-xs"
              >
                {link.label}
              </Link>
              {index < legalLinks.length - 1 && (
                <span className="text-white/30 mx-2">|</span>
              )}
            </span>
          ))}
          <span className="text-white/30 mx-2">|</span>
          <Dialog open={disclaimerOpen} onOpenChange={setDisclaimerOpen}>
            <DialogTrigger asChild>
              <button className="text-primary hover:underline text-xs">
                Disclaimer
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] bg-background">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-secondary dark:text-foreground">
                  {config.region === 'US' ? 'FOR RESIDENTS OF THE UNITED STATES ONLY' : config.region === 'SG' ? 'FOR RESIDENTS OF SINGAPORE ONLY' : 'FOR RESIDENTS OF THE UNITED KINGDOM ONLY'}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p className="font-semibold">
                    THIS WEBSITE CONTAINS INDICATIVE SUMMARIES AND INFORMATION RELATING TO ONE OR MORE INDICES. INDICES ARE UNMANAGED AND CANNOT BE INVESTED IN DIRECTLY. THE DEVELOPMENT OR CREATION OF ANY PRODUCT OR TRANSACTION THAT USES, IS BASED ON, OR IS DEVELOPED IN CONNECTION WITH, ANY INDEX IS PROHIBITED WITHOUT THE PRIOR WRITTEN CONSENT OF BARCLAYS.
                  </p>
                  <p>
                    This website has been prepared by Barclays Bank PLC ("Barclays", which term shall include Barclays' affiliates where relevant), for information purposes only. By using this website you accept the use of cookies in accordance with our Privacy Policy.
                  </p>
                  <p>
                    Nothing on this website should be construed as an offer by Barclays to sell or buy, nor a solicitation by Barclays of offers to sell or buy, any products linked to the performance of an index described herein.
                  </p>
                  <p>
                    Barclays does not guarantee the accuracy or completeness of information which is contained in this website. All opinions and estimates are given as of the date hereof and are subject to change. The value of any investment may fluctuate as a result of market changes.
                  </p>
                  <p className="font-semibold">
                    NEITHER BARCLAYS BANK PLC NOR ANY OF ITS AGENTS OR AFFILIATES MAKES ANY WARRANTY, EXPRESS OR IMPLIED, AS TO THE RESULTS TO BE OBTAINED FROM THE USE OF AN INDEX. BARCLAYS BANK PLC, ITS AGENTS AND AFFILIATES EXPRESSLY DISCLAIM ALL WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OR USE WITH RESPECT TO AN INDEX OR ANY DATA INCLUDED THEREIN.
                  </p>
                  <p>
                    Barclays Bank PLC is registered in England No. 1026167. Registered Office: 1 Churchill Place, London E14 5HP. Copyright Barclays Bank PLC, {new Date().getFullYear()} (all rights reserved). Barclays Bank PLC is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority.
                  </p>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <span className="text-white/30 mx-2">|</span>
          <span className="text-white/50 text-xs">© Barclays {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
