import { useState } from 'react';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/BarclaysUS', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/baraboraib', label: 'X' },
  { icon: Youtube, href: 'https://www.youtube.com/@barclaysib', label: 'YouTube' },
  { icon: Instagram, href: 'https://www.instagram.com/barclaysib/', label: 'Instagram' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: 'https://www.ib.barclays/privacy-and-cookie-policy.html' },
  { label: 'Terms of Use', href: 'https://www.ib.barclays/important-information.html' },
  { label: 'Accessibility', href: 'https://www.ib.barclays/accessibility.html' },
  { label: 'FAQs', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Careers', href: 'https://search.jobs.barclays/investment-bank' },
];

const Footer = () => {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  return (
    <footer className="bg-[#333333]">
      {/* Social Media Bar */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-white/80 text-lg font-light">Connect with us:</span>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
          {/* FDIC Badge */}
          <div className="flex items-center gap-4">
            <img src="/fdic-logo.svg" alt="FDIC" className="h-6 w-auto brightness-0 invert" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20" />

      {/* Legal Links */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          {legalLinks.map((link, index) => (
            <span key={link.label} className="flex items-center">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00aeef] hover:underline text-sm"
              >
                {link.label}
              </a>
              {index < legalLinks.length - 1 && (
                <span className="text-white/40 mx-2">|</span>
              )}
            </span>
          ))}
          <span className="text-white/40 mx-2">|</span>
          <Dialog open={disclaimerOpen} onOpenChange={setDisclaimerOpen}>
            <DialogTrigger asChild>
              <button className="text-[#00aeef] hover:underline text-sm">
                Disclaimer
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] bg-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#00395d]">
                  FOR RESIDENTS OF THE UNITED STATES ONLY
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                  <p className="font-semibold">
                    THIS WEBSITE CONTAINS INDICATIVE SUMMARIES AND INFORMATION RELATING TO ONE OR MORE INDICES. INDICES ARE UNMANAGED AND CANNOT BE INVESTED IN DIRECTLY. THE DEVELOPMENT OR CREATION OF ANY PRODUCT OR TRANSACTION THAT USES, IS BASED ON, OR IS DEVELOPED IN CONNECTION WITH, ANY INDEX IS PROHIBITED WITHOUT THE PRIOR WRITTEN CONSENT OF BARCLAYS.
                  </p>
                  <p className="font-semibold">
                    YOU MUST NOT ACCESS THIS WEBSITE WITHOUT HAVING PREVIOUSLY READ AND UNDERSTOOD THE FOLLOWING DISCLAIMERS. THE INFORMATION ON THIS WEBSITE IS ONLY BEING OFFERED TO AND IS ONLY INTENDED TO BE AVAILABLE TO PERSONS WHO ARE RESIDENTS OF THE UNITED STATES.
                  </p>
                  <p>
                    This website has been prepared by Barclays Bank PLC ("Barclays", which term shall include Barclays' affiliates where relevant), for information purposes only. By using this website you accept the use of cookies in accordance with our Privacy Policy. Barclays uses cookies to help us to know a little bit about you and how you use our website, which improves the browsing experience and marketing – both for you and for others. They are stored locally on your computer or mobile device. To accept cookies continue browsing as normal. For more information and preferences refer to the Cookie Policy.
                  </p>
                  <p>
                    We have updated our Privacy Notice to provide additional information required under the EU General Data Protection Regulation.
                  </p>
                  <p>
                    Nothing on this website should be construed as an offer by Barclays to sell or buy, nor a solicitation by Barclays of offers to sell or buy, any products linked to the performance of an index described herein.
                  </p>
                  <p>
                    This website does not (and does not purport to) disclose all the risks and other significant issues relating to any Index. Barclays does not (and shall not be deemed to) provide, and has not provided, any investment advice or recommendation to you in relation to any Index or any product that is based on the performance of an Index described herein (a "Product") You may not rely on any communication (written or oral) from Barclays as investment advice or as a recommendation relating to any Index or any Product. You are urged to read carefully the relevant product offering documentation and consult with your own legal, financial and tax advisors before investing in any such Product. Barclays accepts no liability whatsoever for any losses arising from the use of this website or its content or reliance on the information contained herein, even if Barclays knew of the possibility of those losses.
                  </p>
                  <p>
                    Barclays does not guarantee the accuracy or completeness of information which is contained in this website and which is stated to have been obtained from or is based upon trade and statistical services or other third party sources. Any data on past performance, modelling, scenario analysis or back-testing contained herein is no indication as to future performance. No representation is made as to the reasonableness of the assumptions made within or the accuracy or completeness of any modelling, scenario analysis or back-testing. All opinions and estimates are given as of the date hereof and are subject to change. The value of any investment may fluctuate as a result of market changes.
                  </p>
                  <p>
                    The information on this website is not intended to predict actual results and no assurances are given with respect thereto.
                  </p>
                  <p>
                    No assurances are given with respect to the future performance of any Index and past performance is no indication as to future performance. Past performance may be simulated past performance (including back-testing) which may involve the use of proxy or substitute Index constituents or Index methodology adjustments where necessary. Back-tested performance data benefits from hindsight and knowledge of factors that may have favorably affected the performance and cannot account for all financial risk that may affect the actual performance of an index. It is in Barclays' interest to demonstrate favorable past simulated index performance. The actual performance of an index may vary significantly from past simulated index performance. You should not rely on hypothetical index performance information for any purpose.
                  </p>
                  <p>
                    None of Barclays, any of its affiliates or subsidiaries nor any of its directors, officers, employees, representatives, delegates or agents shall have any responsibility to any person (whether as a result of negligence or otherwise) for any determination made or anything done (or omitted to be determined or done) in respect of an Index or publication of the levels of the Index and any use to which any person may put the Index or the levels of the Index. In addition, although Barclays reserves the right to make adjustments to correct previously incorrectly published information, including but not limited to the levels of the Index, Barclays is under no obligation to do so and Barclays shall have no liability in respect of any errors or omissions.
                  </p>
                  <p className="font-semibold">
                    NEITHER BARCLAYS BANK PLC NOR ANY OF ITS AGENTS OR AFFILIATES MAKES ANY WARRANTY, EXPRESS OR IMPLIED, AS TO THE RESULTS TO BE OBTAINED FROM THE USE OF AN INDEX. BARCLAYS BANK PLC, ITS AGENTS AND AFFILIATES EXPRESSLY DISCLAIM ALL WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OR USE WITH RESPECT TO AN INDEX OR ANY DATA INCLUDED THEREIN. WITHOUT LIMITING ANY OF THE FOREGOING, IN NO EVENT SHALL BARCLAYS BANK PLC OR ANY OF ITS AGENTS OR AFFILIATES HAVE LIABILITY FOR ANY SPECIAL, PUNITIVE, INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS, LOSS OF OPPORTUNITY OR OTHER FINANCIAL LOSS, EVEN IF NOTIFIED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>
                  <p className="font-semibold">
                    POTENTIAL CONFLICTS OF INTEREST MAY EXIST WITHIN BARCLAYS IN THE NORMAL COURSE OF CARRYING OUT THE ACTIVITIES OF BARCLAYS AND THE OPERATIONS OF OTHER DIVISIONS, TEAMS, AND/OR ENTITIES WITHIN BARCLAYS' GROUP.
                  </p>
                  <p>
                    Barclays does not provide tax advice and nothing contained herein should be construed to be tax advice. Please be advised that any discussion of U.S. tax matters contained herein (including any attachments) is not intended or written to be used, and cannot be used, by you for the purpose of avoiding U.S. tax-related penalties. You should seek advice based on your particular circumstances from an independent tax advisor.
                  </p>
                  <p>
                    Barclays Bank PLC is registered in England No. 1026167. Registered Office: 1 Churchill Place, London E14 5HP. Copyright Barclays Bank PLC, 2021 (all rights reserved). This website is confidential, and no part of it may be reproduced, distributed or transmitted without the prior written permission of Barclays. Barclays Bank PLC is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority.
                  </p>
                  <p>
                    Nothing in this disclaimer shall exclude or limit liability to the extent such exclusion or limitation is not permitted by law.
                  </p>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-6 py-4">
        <div className="text-center text-white/60 text-xs space-y-1">
          <p>© {new Date().getFullYear()} Barclays Bank PLC. All rights reserved.</p>
          <p>Member FDIC</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
