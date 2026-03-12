import { motion } from 'framer-motion';
import { ExternalLink, Award, Send, Phone, Mail, User, CalendarIcon, Clock } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRegion } from '@/contexts/RegionContext';
import { supabase } from '@/integrations/supabase/client';

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

const usBonds: Bond[] = [
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

const sgBonds: Bond[] = [
  {
    id: 'sg1',
    rate: '6.85%',
    rateValue: 6.85,
    maturityYear: '2029',
    maturityDate: '15/06/2029',
    amount: 'S$750,000,000',
    isin: 'XS2693851425',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202222-28-bond-2028-us06738ecd58',
    highlight: 'Highest Rate',
  },
  {
    id: 'sg2',
    rate: '5.92%',
    rateValue: 5.92,
    maturityYear: '2050',
    maturityDate: '20/03/2050',
    amount: 'S$500,000,000',
    isin: 'XS2754831290',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202424-55-bond-2055-us06738ecs28?miRedirects=2',
    highlight: 'Long Term',
  },
  {
    id: 'sg3',
    rate: '5.45%',
    rateValue: 5.45,
    maturityYear: '2040',
    maturityDate: '10/09/2040',
    amount: 'S$600,000,000',
    isin: 'XS2819475632',
    payment: 'Semi-Annual (payable every 6 months)',
    verifyLink: 'https://markets.businessinsider.com/bonds/barclays_plcdl-flr_notes_202525-46-bond-2046-us06738ede23?miRedirects=2',
  },
  {
    id: 'sg4',
    rate: '4.15%',
    rateValue: 4.15,
    maturityYear: '2028',
    maturityDate: '22/11/2028',
    amount: 'S$800,000,000',
    isin: 'XS2891634578',
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
  date: z.date().optional(),
  preferredTime: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const FeaturedBondsSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { config } = useRegion();
  const bonds = config.region === 'SG' ? sgBonds : usBonds;

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
      const { error } = await supabase.from('leads').insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        preferred_date: data.date ? new Date(data.date).toISOString().split('T')[0] : undefined,
        preferred_time: data.preferredTime || undefined,
        region: config.region,
        source: 'bonds',
      });
      if (error) throw error;
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
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-foreground mb-4">
            Featured Fixed Rate Bonds
          </h2>
        </motion.div>

        {/* Bond Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
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
                    <span className="font-mono text-xs text-secondary dark:text-foreground">{bond.isin}</span>
                  </div>
                  <div className="bond-detail-row">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-semibold text-secondary dark:text-foreground">{bond.amount}</span>
                  </div>
                  <div className="bond-detail-row">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="text-secondary dark:text-foreground">{bond.payment}</span>
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
                  Verify
                </a>

                {/* Insurance Badge */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
                  <img src={config.insuranceLogo} alt={`${config.insuranceAbbr} Insured`} className="h-5 w-auto dark:invert" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {config.insuranceMotto}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Buy-back paragraph - moved below bond cards with smaller font */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground text-sm max-w-3xl mx-auto text-center mb-10"
        >
          Barclays Investment Bank initiated the fixed bond buy back scheme to give private investors security on large capital deposits. The ethos and guiding principles of Barclays Bank plc and its subsidiaries has always been to achieve above market returns whilst achieving capital preservation as the cornerstone of our firm's ethics and credibility. Since the inception of the buy back scheme, Barclays Bank and affiliate brokerages have operated a bond buy back scheme up to {config.buyBackAmount} per client per institution. These bonds apply to fixed income bonds only.
        </motion.p>

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
              <h3 className="text-2xl md:text-3xl font-bold text-secondary dark:text-foreground mb-3">
                Interested in These Bonds?
              </h3>
              <p className="text-muted-foreground mb-6">
                Complete the form and a Barclays specialist will contact you within 24 hours to discuss your investment options.
              </p>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                <img src={config.insuranceLogo} alt={`${config.insuranceAbbr} Insured`} className="h-8 w-auto dark:invert" />
                <div>
                  <p className="text-sm font-medium text-foreground">{config.insuranceAbbr} Insured</p>
                  <p className="text-xs text-muted-foreground">{config.insuranceMotto}</p>
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

                {/* Date and Time Pickers */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Preferred Contact Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Select time" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                            <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
          <img src={config.region === 'US' ? fdicLogo : sdicLogo} alt={config.insuranceAbbr} className="h-10 w-auto flex-shrink-0 dark:invert" />
          <div>
            <div className="font-semibold text-secondary dark:text-foreground">{config.insuranceAbbr} Insured Up to {config.coverageAmountFull}</div>
            <div className="text-sm text-muted-foreground">
              {config.insuranceMotto}
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
