import { motion } from 'framer-motion';
import { ExternalLink, Award, Send, Phone, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import fdicLogo from '@/assets/fdic-logo.png';

interface Bond {
  id: string;
  rate: string;
  rateValue: number;
  maturityYear: string;
  maturityDate: string;
  amount: string;
  isin: string;
  payment: string;
  verifyLink: string;
  highlight?: string;
}

const bonds: Bond[] = [
  {
    id: '1',
    rate: '7.385%',
    rateValue: 7.385,
    maturityYear: '2028',
    maturityDate: '11/02/2028',
    amount: '$1,500,000,000',
    isin: 'US06738ECD58',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202222-28-bond-2028-us06738ecd58',
    highlight: 'Highest Rate',
  },
  {
    id: '2',
    rate: '6.036%',
    rateValue: 6.036,
    maturityYear: '2055',
    maturityDate: '03/12/2055',
    amount: '$750,000,000',
    isin: 'US06738ECS28',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202424-55-bond-2055-us06738ecs28?miRedirects=2',
    highlight: 'Long Term',
  },
  {
    id: '3',
    rate: '5.86%',
    rateValue: 5.86,
    maturityYear: '2046',
    maturityDate: '8/11/2046',
    amount: '$1,250,000,000',
    isin: 'US06738EDE23',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202525-46-bond-2046-us06738ede23?miRedirects=2',
  },
  {
    id: '4',
    rate: '4.47%',
    rateValue: 4.47,
    maturityYear: '2029',
    maturityDate: '11/11/2029',
    amount: '$1,500,000,000',
    isin: 'US06738EDD40',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202525-29-bond-2029-us06738edd40?miRedirects=1',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const formSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().min(1, 'Last name is required').max(50),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(20),
});

type FormData = z.infer<typeof formSchema>;

const FeaturedBondsSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Send to database on barclays-ib.app when Cloud is enabled
      console.log('Lead form submission:', data);
      toast({
        title: "Thank you for your interest!",
        description: "A Barclays specialist will contact you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Featured Fixed Rate Bonds
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            At Barclays, we take a bespoke approach to wealth management—aligning your investments with your goals, lifestyle, and long-term vision. Speak with our team to begin your personalized strategy.
          </p>
        </motion.div>

        {/* Bond Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          {bonds.map((bond) => (
            <motion.div
              key={bond.id}
              variants={cardVariants}
              className="bond-card"
            >
              <div className="p-6">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex flex-col gap-2">
                    <span className="bond-maturity-badge">
                      Matures {bond.maturityYear}
                    </span>
                    {bond.highlight && (
                      <span className="bond-highlight-badge">
                        {bond.highlight}
                      </span>
                    )}
                  </div>
                  <span className="bond-rating-badge">
                    <Award className="w-3.5 h-3.5 mr-1" />
                    AAA
                  </span>
                </div>

                {/* Rate Display */}
                <div className="text-center mb-6">
                  <div className="bond-rate">{bond.rate}</div>
                  <div className="text-muted-foreground text-sm mt-1">
                    per annum
                  </div>
                </div>

                {/* Bond Details */}
                <div className="space-y-0 border-t border-border pt-4">
                  <div className="bond-detail-row">
                    <span className="text-muted-foreground">ISIN</span>
                    <span className="font-mono text-xs text-secondary">{bond.isin}</span>
                  </div>
                  <div className="bond-detail-row">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-semibold text-secondary">{bond.amount}</span>
                  </div>
                  <div className="bond-detail-row">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="text-secondary">{bond.payment}</span>
                  </div>
                </div>

                {/* Verify Button */}
                <a
                  href={bond.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="verify-button mt-5"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify on Business Insider
                </a>

                {/* FDIC Badge */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
                  <img src={fdicLogo} alt="FDIC Insured" className="h-5 w-auto dark:invert" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    FDIC Insured
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lead Capture Form - CTA after bonds */}
        <motion.div
          id="lead-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-background rounded-2xl p-8 md:p-10 shadow-lg border border-border mb-10"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Form Info */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
                Interested in These Bonds?
              </h3>
              <p className="text-muted-foreground mb-6">
                Complete the form and a Barclays specialist will contact you within 24 hours to discuss your investment options.
              </p>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                <img src={fdicLogo} alt="FDIC Insured" className="h-8 w-auto dark:invert" />
                <div>
                  <p className="text-sm font-medium text-foreground">FDIC Insured</p>
                  <p className="text-xs text-muted-foreground">Federal Deposit Insurance Corporation</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="John" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Smith" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input type="email" placeholder="john.smith@example.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input type="tel" placeholder="+1 (555) 123-4567" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Request Consultation
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your information is secure and will never be shared.
                </p>
              </form>
            </Form>
          </div>
        </motion.div>

        {/* FDIC Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="fdic-banner mb-6"
        >
          <img src={fdicLogo} alt="FDIC" className="h-10 w-auto flex-shrink-0 dark:invert" />
          <div>
            <div className="font-semibold text-secondary">FDIC Insured Up to $250,000</div>
            <div className="text-sm text-muted-foreground">
              Your deposits are protected by the Federal Deposit Insurance Corporation
            </div>
          </div>
        </motion.div>

        {/* Investment Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-muted-foreground text-center leading-relaxed max-w-3xl mx-auto"
        >
          Investment in bonds involves risk, including possible loss of principal. 
          Past performance is not indicative of future results. The bonds featured 
          are subject to availability and market conditions. Verify all details 
          directly with issuing institutions before investing.
        </motion.p>
      </div>
    </section>
  );
};

export default FeaturedBondsSection;
