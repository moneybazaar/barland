import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Rocket, Loader2, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

// Constants
const ACCOUNT_TYPES = [
  { value: '', label: 'Select account type' },
  { value: 'individual', label: 'Individual Account' },
  { value: 'joint', label: 'Joint Account' },
];

const ACCOUNT_TITLES = [
  { value: '', label: 'Select title' },
  { value: 'mr', label: 'Mr' },
  { value: 'mrs', label: 'Mrs' },
  { value: 'ms', label: 'Ms' },
  { value: 'miss', label: 'Miss' },
  { value: 'dr', label: 'Dr' },
  { value: 'prof', label: 'Prof' },
];

const EMPLOYMENT_STATUS = [
  { value: '', label: 'Select status' },
  { value: 'employed-full', label: 'Employed Full-Time' },
  { value: 'employed-part', label: 'Employed Part-Time' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'student', label: 'Student' },
  { value: 'unemployed', label: 'Unemployed' },
];

const TRADING_EXPERIENCE = [
  { value: '', label: 'Select experience' },
  { value: 'none', label: 'None' },
  { value: 'less-1', label: 'Less than 1 year' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: 'more-5', label: 'More than 5 years' },
];

const INCOME_RANGES = [
  { value: '', label: 'Select range' },
  { value: 'under-25k', label: 'Under $25,000' },
  { value: '25k-50k', label: '$25,001 - $50,000' },
  { value: '50k-100k', label: '$50,001 - $100,000' },
  { value: '100k-250k', label: '$100,001 - $250,000' },
  { value: '250k-500k', label: '$250,001 - $500,000' },
  { value: '500k-1m', label: '$500,001 - $1,000,000' },
  { value: 'over-1m', label: 'Over $1,000,000' },
];

const COUNTRIES = [
  { value: '', label: 'Select country' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
  { value: 'SG', label: 'Singapore' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'IE', label: 'Ireland' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'OTHER', label: 'Other' },
];

const RISK_TOLERANCE_OPTIONS = [
  {
    value: 'conservative',
    title: 'Conservative',
    description: 'Stay within my comfort zone with low expected returns but also few surprises.',
  },
  {
    value: 'moderatelyConservative',
    title: 'Moderately Conservative',
    description: 'Take the edge off the ride while maintaining a slightly below-average expected return.',
  },
  {
    value: 'moderate',
    title: 'Moderate',
    description: 'Accept average variance in exchange for average expected returns.',
  },
  {
    value: 'moderatelyAggressive',
    title: 'Moderately Aggressive',
    description: 'Accept slightly more variance in returns for a slightly higher expected return.',
  },
  {
    value: 'significantRisk',
    title: 'Significant Risk',
    description: 'Go for maximum expected returns by accepting potentially significant risk and variance.',
  },
];

// Validation Schema
const applicationSchema = z.object({
  // Account Type
  accountType: z.string().min(1, 'Please select an account type'),
  
  // Personal Information
  accountTitle: z.string().optional(),
  firstName: z.string().trim().min(2, 'First name is required').max(50, 'First name is too long'),
  middleName: z.string().optional(),
  lastName: z.string().trim().min(2, 'Last name is required').max(50, 'Last name is too long'),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  nationality: z.string().min(1, 'Nationality is required'),
  countryOfResidence: z.string().min(1, 'Country of residence is required'),
  
  // Address
  addressLine1: z.string().trim().min(5, 'Address is required').max(100, 'Address is too long'),
  addressLine2: z.string().optional(),
  city: z.string().trim().min(2, 'City is required').max(50, 'City is too long'),
  state: z.string().optional(),
  zipCode: z.string().trim().min(3, 'Zip code is required').max(20, 'Zip code is too long'),
  country: z.string().min(1, 'Country is required'),
  
  // Employment
  employmentStatus: z.string().optional(),
  jobTitle: z.string().optional(),
  
  // Contact
  phoneWork: z.string().optional(),
  phoneMobile: z.string().trim().min(10, 'Mobile phone is required').max(20, 'Phone number is too long'),
  phoneHome: z.string().optional(),
  alternativeEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  
  // Credentials
  username: z.string().trim().min(4, 'Username must be at least 4 characters').max(30, 'Username is too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email is too long'),
  
  // Joint Account
  includeSecondApplicant: z.boolean().optional(),
  
  // Investment Sources
  investmentFromCompany: z.boolean().optional(),
  investmentFromTrust: z.boolean().optional(),
  investmentFromPension: z.boolean().optional(),
  
  // Investment Experience
  expEquities: z.boolean().optional(),
  expProperty: z.boolean().optional(),
  expBonds: z.boolean().optional(),
  expOptions: z.boolean().optional(),
  expCFDs: z.boolean().optional(),
  expCryptocurrency: z.boolean().optional(),
  tradingExperience: z.string().optional(),
  
  // Risk Tolerance
  riskTolerance: z.enum(['conservative', 'moderatelyConservative', 'moderate', 'moderatelyAggressive', 'significantRisk']),
  
  // Financial Information
  annualIncome: z.string().min(1, 'Please select your annual income'),
  investmentHoldingsValue: z.string().min(1, 'Please select investment holdings value'),
  currentSavingsValue: z.string().min(1, 'Please select current savings value'),
  liquidNetWorth: z.string().min(1, 'Please select liquid net worth'),
  
  // Accredited Investor
  earningsOver200k: z.enum(['yes', 'no']),
  assetsOver1m: z.enum(['yes', 'no']),
  
  // Terms
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

// Form Section Component
const FormSection = ({ title, children, index }: { title: string; children: React.ReactNode; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="form-section"
  >
    <div className="form-section-header">
      <h2 className="form-section-title">{title}</h2>
    </div>
    <div className="form-section-content">
      {children}
    </div>
  </motion.div>
);

// Risk Card Component
const RiskCard = ({ 
  option, 
  selected, 
  onSelect 
}: { 
  option: typeof RISK_TOLERANCE_OPTIONS[0]; 
  selected: boolean; 
  onSelect: () => void;
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={cn('risk-card', selected && 'selected')}
  >
    <div className="flex items-start gap-4">
      <div className={cn(
        'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all',
        selected ? 'border-primary bg-primary' : 'border-border'
      )}>
        {selected && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        )}
      </div>
      <div className="text-left">
        <div className="risk-card-title">{option.title}</div>
        <div className="risk-card-description">{option.description}</div>
      </div>
    </div>
  </button>
);

const RegisterInterest = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      accountType: '',
      accountTitle: '',
      firstName: '',
      middleName: '',
      lastName: '',
      nationality: '',
      countryOfResidence: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      employmentStatus: '',
      jobTitle: '',
      phoneWork: '',
      phoneMobile: '',
      phoneHome: '',
      alternativeEmail: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      includeSecondApplicant: false,
      investmentFromCompany: false,
      investmentFromTrust: false,
      investmentFromPension: false,
      expEquities: false,
      expProperty: false,
      expBonds: false,
      expOptions: false,
      expCFDs: false,
      expCryptocurrency: false,
      tradingExperience: '',
      riskTolerance: 'moderate',
      annualIncome: '',
      investmentHoldingsValue: '',
      currentSavingsValue: '',
      liquidNetWorth: '',
      earningsOver200k: 'no',
      assetsOver1m: 'no',
      termsAccepted: false,
    },
  });

  const accountType = watch('accountType');

  const onSubmit = async (data: ApplicationFormData) => {
    // Simulate API call - don't log sensitive data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    toast({
      title: 'Application Submitted',
      description: 'Thank you! Your application has been received. A specialist will contact you within 24-48 hours.',
    });

    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-accent" />
            </motion.div>
            <h1 className="text-3xl font-bold text-secondary dark:text-foreground mb-4">Application Submitted</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for completing your client application. A dedicated specialist will review your information and contact you within 24-48 hours.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted dark:bg-background">
      <Header />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-secondary dark:text-foreground mb-4">
              Client Application Form
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete your application to get started. Fields marked with <span className="text-destructive">*</span> are required.
              Providing additional information helps us deliver the best possible service.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Section 1: Account Type */}
            <FormSection title="Account Type" index={0}>
              <div className="form-field">
                <label className="form-label">
                  Account Type <span className="text-destructive">*</span>
                </label>
                <select {...register('accountType')} className="form-select">
                  {ACCOUNT_TYPES.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.accountType && <p className="form-error">{errors.accountType.message}</p>}
              </div>
            </FormSection>

            {/* Section 2: Personal Information */}
            <FormSection title="Personal Information" index={1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="form-field">
                  <label className="form-label">Title</label>
                  <select {...register('accountTitle')} className="form-select">
                    {ACCOUNT_TITLES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">First Name <span className="text-destructive">*</span></label>
                  <input {...register('firstName')} className="form-input" placeholder="John" />
                  {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Middle Name(s)</label>
                  <input {...register('middleName')} className="form-input" placeholder="Optional" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-field">
                  <label className="form-label">Last Name <span className="text-destructive">*</span></label>
                  <input {...register('lastName')} className="form-input" placeholder="Smith" />
                  {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Date of Birth <span className="text-destructive">*</span></label>
                  <Controller
                    control={control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              'form-input text-left flex items-center justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : 'Select date'}
                            <CalendarIcon className="w-4 h-4 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="form-label">Nationality <span className="text-destructive">*</span></label>
                  <select {...register('nationality')} className="form-select">
                    {COUNTRIES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.nationality && <p className="form-error">{errors.nationality.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Country of Residence <span className="text-destructive">*</span></label>
                  <select {...register('countryOfResidence')} className="form-select">
                    {COUNTRIES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.countryOfResidence && <p className="form-error">{errors.countryOfResidence.message}</p>}
                </div>
              </div>
            </FormSection>

            {/* Section 3: Address Information */}
            <FormSection title="Address Information" index={2}>
              <div className="space-y-4">
                <div className="form-field">
                  <label className="form-label">Address Line 1 <span className="text-destructive">*</span></label>
                  <input {...register('addressLine1')} className="form-input" placeholder="123 Main Street" />
                  {errors.addressLine1 && <p className="form-error">{errors.addressLine1.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Address Line 2</label>
                  <input {...register('addressLine2')} className="form-input" placeholder="Apartment, suite, etc. (optional)" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-field">
                    <label className="form-label">City <span className="text-destructive">*</span></label>
                    <input {...register('city')} className="form-input" placeholder="London" />
                    {errors.city && <p className="form-error">{errors.city.message}</p>}
                  </div>
                  <div className="form-field">
                    <label className="form-label">State/County</label>
                    <input {...register('state')} className="form-input" placeholder="Optional" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Zip/Postal Code <span className="text-destructive">*</span></label>
                    <input {...register('zipCode')} className="form-input" placeholder="SW1A 1AA" />
                    {errors.zipCode && <p className="form-error">{errors.zipCode.message}</p>}
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Country <span className="text-destructive">*</span></label>
                  <select {...register('country')} className="form-select">
                    {COUNTRIES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.country && <p className="form-error">{errors.country.message}</p>}
                </div>
              </div>
            </FormSection>

            {/* Section 4: Employment */}
            <FormSection title="Employment" index={3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="form-label">Employment Status</label>
                  <select {...register('employmentStatus')} className="form-select">
                    {EMPLOYMENT_STATUS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Job Title</label>
                  <input {...register('jobTitle')} className="form-input" placeholder="e.g. Financial Analyst" />
                </div>
              </div>
            </FormSection>

            {/* Section 5: Contact Details */}
            <FormSection title="Contact Details" index={4}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="form-field">
                  <label className="form-label">Phone (Work)</label>
                  <input type="tel" {...register('phoneWork')} className="form-input" placeholder="+44 20 1234 5678" />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone (Mobile) <span className="text-destructive">*</span></label>
                  <input type="tel" {...register('phoneMobile')} className="form-input" placeholder="+44 7123 456789" />
                  {errors.phoneMobile && <p className="form-error">{errors.phoneMobile.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Phone (Home)</label>
                  <input type="tel" {...register('phoneHome')} className="form-input" placeholder="+44 20 1234 5678" />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Alternative Email</label>
                <input type="email" {...register('alternativeEmail')} className="form-input" placeholder="alternate@example.com" />
                {errors.alternativeEmail && <p className="form-error">{errors.alternativeEmail.message}</p>}
              </div>
            </FormSection>

            {/* Section 6: Account Credentials */}
            <FormSection title="Account Credentials" index={5}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-field">
                  <label className="form-label">Username <span className="text-destructive">*</span></label>
                  <input {...register('username')} className="form-input" placeholder="Choose a username" />
                  {errors.username && <p className="form-error">{errors.username.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Email Address <span className="text-destructive">*</span></label>
                  <input type="email" {...register('email')} className="form-input" placeholder="john.smith@example.com" />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="form-label">Password <span className="text-destructive">*</span></label>
                  <input type="password" {...register('password')} className="form-input" placeholder="Min. 8 characters" />
                  {errors.password && <p className="form-error">{errors.password.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Confirm Password <span className="text-destructive">*</span></label>
                  <input type="password" {...register('confirmPassword')} className="form-input" placeholder="Confirm password" />
                  {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </FormSection>

            {/* Section 7: Joint Account */}
            {accountType === 'joint' && (
              <FormSection title="Joint Account" index={6}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('includeSecondApplicant')} className="form-checkbox" />
                  <span className="text-sm text-foreground">
                    Do you want to include a second applicant? (They will need to complete a separate application)
                  </span>
                </label>
              </FormSection>
            )}

            {/* Section 8: Investment Sources */}
            <FormSection title="Investment Sources" index={7}>
              <p className="text-sm text-muted-foreground mb-4">
                Where will your investment funds come from? (Select all that apply)
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('investmentFromCompany')} className="form-checkbox" />
                  <span className="text-sm text-foreground">From a Company</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('investmentFromTrust')} className="form-checkbox" />
                  <span className="text-sm text-foreground">From a Trust</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('investmentFromPension')} className="form-checkbox" />
                  <span className="text-sm text-foreground">From a self-managed or qualifying pension</span>
                </label>
              </div>
            </FormSection>

            {/* Section 9: Investment Experience */}
            <FormSection title="Investment Experience" index={8}>
              <p className="text-sm text-muted-foreground mb-4">
                What types of investments have you previously held? (Select all that apply)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('expEquities')} className="form-checkbox" />
                  <span className="text-sm text-foreground">Equities</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('expProperty')} className="form-checkbox" />
                  <span className="text-sm text-foreground">Property</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('expBonds')} className="form-checkbox" />
                  <span className="text-sm text-foreground">Bonds</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('expOptions')} className="form-checkbox" />
                  <span className="text-sm text-foreground">Options</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('expCFDs')} className="form-checkbox" />
                  <span className="text-sm text-foreground">CFDs</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register('expCryptocurrency')} className="form-checkbox" />
                  <span className="text-sm text-foreground">Cryptocurrency</span>
                </label>
              </div>
              <div className="form-field">
                <label className="form-label">Trading Experience</label>
                <select {...register('tradingExperience')} className="form-select">
                  {TRADING_EXPERIENCE.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </FormSection>

            {/* Section 10: Risk Tolerance */}
            <FormSection title="Risk Tolerance" index={9}>
              <p className="text-sm text-muted-foreground mb-4">
                Please select the statement that best describes your investment risk tolerance:
              </p>
              <Controller
                control={control}
                name="riskTolerance"
                render={({ field }) => (
                  <div className="space-y-3">
                    {RISK_TOLERANCE_OPTIONS.map((option) => (
                      <RiskCard
                        key={option.value}
                        option={option}
                        selected={field.value === option.value}
                        onSelect={() => field.onChange(option.value)}
                      />
                    ))}
                  </div>
                )}
              />
              {errors.riskTolerance && <p className="form-error mt-2">{errors.riskTolerance.message}</p>}
            </FormSection>

            {/* Section 11: Financial Information */}
            <FormSection title="Financial Information" index={10}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="form-label">Annual Income <span className="text-destructive">*</span></label>
                  <select {...register('annualIncome')} className="form-select">
                    {INCOME_RANGES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.annualIncome && <p className="form-error">{errors.annualIncome.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Investment Holdings Value <span className="text-destructive">*</span></label>
                  <select {...register('investmentHoldingsValue')} className="form-select">
                    {INCOME_RANGES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.investmentHoldingsValue && <p className="form-error">{errors.investmentHoldingsValue.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Current Savings Value <span className="text-destructive">*</span></label>
                  <select {...register('currentSavingsValue')} className="form-select">
                    {INCOME_RANGES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.currentSavingsValue && <p className="form-error">{errors.currentSavingsValue.message}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">Liquid Net Worth <span className="text-destructive">*</span></label>
                  <select {...register('liquidNetWorth')} className="form-select">
                    {INCOME_RANGES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.liquidNetWorth && <p className="form-error">{errors.liquidNetWorth.message}</p>}
                </div>
              </div>
            </FormSection>

            {/* Section 12: Accredited Investor Qualification */}
            <FormSection title="Accredited Investor Qualification" index={11}>
              <div className="space-y-6">
                <div className="form-field">
                  <label className="form-label mb-3 block">
                    Have you earned $200,000+ in each of the past two years and expect to earn the same this year?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" {...register('earningsOver200k')} value="yes" className="form-radio" />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" {...register('earningsOver200k')} value="no" className="form-radio" />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label mb-3 block">
                    Do you have $1,000,000+ in assets, excluding your primary residence?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" {...register('assetsOver1m')} value="yes" className="form-radio" />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" {...register('assetsOver1m')} value="no" className="form-radio" />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </FormSection>

            {/* Section 13: Legal & Submit */}
            <FormSection title="Legal Disclaimers" index={12}>
              <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By submitting this application, you agree that the information provided is accurate and complete.
                  Your personal data will be processed in accordance with our{' '}
                  <a href="https://www.ib.barclays/privacy-and-cookie-policy.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Privacy Policy
                  </a>.
                  We may use this information to contact you regarding your application and related services.
                </p>
              </div>
              
              <div className="form-field mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register('termsAccepted')} className="form-checkbox mt-0.5" />
                  <span className="text-sm text-foreground">
                    I have read and agree to the{' '}
                    <a href="https://www.ib.barclays/important-information.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="https://www.ib.barclays/privacy-and-cookie-policy.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Privacy Policy
                    </a>.
                    <span className="text-destructive"> *</span>
                  </span>
                </label>
                {errors.termsAccepted && <p className="form-error">{errors.termsAccepted.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button-enhanced"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            </FormSection>
          </form>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterInterest;
