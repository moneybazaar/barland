import { motion } from 'framer-motion';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Shield, Briefcase, Users, User, Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-ib.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRegion } from '@/contexts/RegionContext';
import { supabase } from '@/integrations/supabase/client';

const heroFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().min(1, 'Last name is required').max(50),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(20),
  investmentInterest: z.string().min(1, 'Please select an investment interest'),
});

type HeroFormData = z.infer<typeof heroFormSchema>;

const trustIndicators = [
  { icon: Shield, label: 'Private Client Services' },
  { icon: Briefcase, label: 'Institutional Strategies' },
  { icon: Users, label: 'Dedicated Management' },
];

const formBenefits = [
  'No obligation consultation',
  'Response within 24 hours',
  'Dedicated specialist assigned',
];

const HeroSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { config } = useRegion();

  const form = useForm<HeroFormData>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      investmentInterest: '',
    },
  });

  const onSubmit = async (data: HeroFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        region: config.region,
        source: 'hero',
      });
      if (error) throw error;

      toast({
        title: 'Thank you for your interest!',
        description: 'A Barclays specialist will contact you within 24 hours.',
      });
      form.reset();
    } catch {
      toast({
        title: 'Submission failed',
        description: 'Please try again or call us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-width Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 hero-pattern opacity-60" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content — 7 columns */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-white/90 mb-6"
            >
              SOLUTIONS
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-4"
              style={{ lineHeight: 1.08, letterSpacing: '-0.02em' }}
            >
              Institutional Investment Opportunities
              <span className="block text-white/80 text-2xl md:text-3xl xl:text-4xl mt-3 font-medium">
                For Private Clients
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg xl:text-xl text-white/80 leading-relaxed mb-10 max-w-xl"
            >
              Access professionally managed investment strategies designed for
              long-term capital growth, backed by the strength and reliability
              of a Tier 1 investment bank.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-5"
            >
              {trustIndicators.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 text-white/70 text-sm">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/20">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side — Floating Glassmorphic Form — 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-primary/20 rounded-3xl blur-xl" />
              
              <div className="relative backdrop-blur-xl bg-background/95 dark:bg-card/90 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Form Header with accent bar */}
                <div className="bg-secondary dark:bg-secondary/80 px-7 py-5">
                  <h2 className="text-lg font-bold text-white">
                    Request a Call Back
                  </h2>
                  <p className="text-sm text-white/70 mt-0.5">
                    Speak with a specialist about your goals
                  </p>
                </div>

                <div className="px-7 py-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {/* Name Row */}
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">First Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                  <Input placeholder="John" className="pl-10 h-11 bg-muted/50 border-border/50 focus:bg-background transition-colors" {...field} />
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
                              <FormLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Last Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                  <Input placeholder="Smith" className="pl-10 h-11 bg-muted/50 border-border/50 focus:bg-background transition-colors" {...field} />
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
                            <FormLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                <Input type="email" placeholder="john.smith@example.com" className="pl-10 h-11 bg-muted/50 border-border/50 focus:bg-background transition-colors" {...field} />
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
                            <FormLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                <Input type="tel" placeholder="+1 (555) 123-4567" className="pl-10 h-11 bg-muted/50 border-border/50 focus:bg-background transition-colors" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="investmentInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Investment Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11 bg-muted/50 border-border/50 focus:bg-background transition-colors">
                                  <SelectValue placeholder="Select interest" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="fixed-income">Fixed Income Bonds</SelectItem>
                                <SelectItem value="portfolio-management">Portfolio Management</SelectItem>
                                <SelectItem value="wealth-preservation">Wealth Preservation</SelectItem>
                                <SelectItem value="general">General Enquiry</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : (
                          <>
                            Request a Call Back
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>

                      {/* Inline trust signals below CTA */}
                      <div className="pt-2 space-y-1.5">
                        {formBenefits.map((benefit) => (
                          <div key={benefit} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
