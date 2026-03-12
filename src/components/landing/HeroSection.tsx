import { motion } from 'framer-motion';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Shield, Briefcase, Users, User, Mail, Phone } from 'lucide-react';
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
    <section className="hero-split">
      {/* Left Content Side */}
      <div className="hero-content">
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-category"
          >
            SOLUTIONS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-title"
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
            className="hero-description mb-8"
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
            className="flex flex-wrap gap-4"
          >
            {trustIndicators.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white/70 text-sm">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,174,239,0.2)' }}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Hero Image + Lead Capture Form */}
      <div className="relative flex items-center justify-center px-6 py-16 lg:py-0 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-secondary/70 dark:bg-secondary/80" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-background rounded-2xl p-8 shadow-xl border border-border">
            <h2 className="text-xl font-bold text-secondary dark:text-foreground mb-1">
              Request a Call Back
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Speak with a specialist about your investment goals.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="John" className="pl-10 h-10" {...field} />
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
                        <FormLabel className="text-xs">Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Smith" className="pl-10 h-10" {...field} />
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
                      <FormLabel className="text-xs">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input type="email" placeholder="john.smith@example.com" className="pl-10 h-10" {...field} />
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
                      <FormLabel className="text-xs">Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input type="tel" placeholder="+1 (555) 123-4567" className="pl-10 h-10" {...field} />
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
                      <FormLabel className="text-xs">Investment Interest</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
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
                  className="w-full h-11 text-base font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Request a Call Back
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-center text-muted-foreground">
                  Your information is secure and will never be shared.
                </p>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
