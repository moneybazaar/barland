import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import barclaysLogo from '@/assets/barclays-logo.png';

const interestSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(20, 'Phone number is too long'),
  productInterest: z.string().min(1, 'Please select a product'),
  investmentAmount: z.string().min(1, 'Please select an investment amount'),
  contactConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to be contacted'
  })
});

type InterestFormData = z.infer<typeof interestSchema>;

const productOptions = [
  { value: '', label: 'Select a product' },
  { value: 'fixed-income', label: 'Fixed Income Products' },
  { value: 'annuities', label: 'Guaranteed Annuities' },
  { value: 'both', label: 'Both Products' },
  { value: 'unsure', label: 'Not sure yet' },
];

const investmentOptions = [
  { value: '', label: 'Select an amount' },
  { value: 'under-100k', label: 'Under $100,000' },
  { value: '100k-500k', label: '$100,000 - $500,000' },
  { value: '500k-1m', label: '$500,000 - $1,000,000' },
  { value: '1m-5m', label: '$1,000,000 - $5,000,000' },
  { value: 'over-5m', label: 'Over $5,000,000' },
];

const RegisterInterest = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InterestFormData>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      productInterest: '',
      investmentAmount: '',
      contactConsent: false,
    },
  });

  const onSubmit = async (data: InterestFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    toast({
      title: 'Interest Registered',
      description: 'Thank you! A specialist will contact you within 24 hours.',
    });

    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="interest-page">
        <div className="interest-header">
          <Link to="/" className="flex items-center gap-3">
            <img src={barclaysLogo} alt="Barclays" className="h-10" />
            <span className="text-white font-semibold text-lg">Investment Bank</span>
          </Link>
        </div>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="interest-card text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-secondary mb-3">Thank You</h1>
            <p className="text-muted-foreground mb-6">
              Your interest has been registered. A specialist will contact you within 24 hours.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </div>
        </main>

        <footer className="interest-footer">
          <div className="container mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Use</a>
            </div>
            <span>© {new Date().getFullYear()} Barclays</span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="interest-page">
      {/* Header */}
      <div className="interest-header">
        <Link to="/" className="flex items-center gap-3">
          <img src={barclaysLogo} alt="Barclays" className="h-10" />
          <span className="text-white font-semibold text-lg">Investment Bank</span>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="interest-card">
          <h1 className="interest-title">Register Your Interest</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="form-field">
              <label htmlFor="fullName" className="form-label">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                className="form-input"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="form-error">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-field">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="form-input"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="form-field">
              <label htmlFor="phone" className="form-label">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className="form-input"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="form-error">{errors.phone.message}</p>
              )}
            </div>

            {/* Product Interest */}
            <div className="form-field">
              <label htmlFor="productInterest" className="form-label">
                I'm interested in
              </label>
              <select
                id="productInterest"
                {...register('productInterest')}
                className="form-select"
              >
                {productOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.productInterest && (
                <p className="form-error">{errors.productInterest.message}</p>
              )}
            </div>

            {/* Investment Amount */}
            <div className="form-field">
              <label htmlFor="investmentAmount" className="form-label">
                Investment amount (approx.)
              </label>
              <select
                id="investmentAmount"
                {...register('investmentAmount')}
                className="form-select"
              >
                {investmentOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.investmentAmount && (
                <p className="form-error">{errors.investmentAmount.message}</p>
              )}
            </div>

            {/* Contact Consent */}
            <div className="form-field">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('contactConsent')}
                  className="form-checkbox mt-0.5"
                />
                <span className="text-sm text-muted-foreground">
                  I agree to be contacted by Barclays regarding investment opportunities and services.
                </span>
              </label>
              {errors.contactConsent && (
                <p className="form-error">{errors.contactConsent.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Interest'}
            </button>
          </form>

          <div className="mt-6 text-center">
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

      {/* Footer */}
      <footer className="interest-footer">
        <div className="container mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
          </div>
          <span>© {new Date().getFullYear()} Barclays</span>
        </div>
      </footer>
    </div>
  );
};

export default RegisterInterest;
