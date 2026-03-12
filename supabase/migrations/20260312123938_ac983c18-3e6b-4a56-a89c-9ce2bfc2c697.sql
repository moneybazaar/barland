
-- Create client_applications table to store registration form data
CREATE TABLE public.client_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_type text NOT NULL,
  account_title text,
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  nationality text NOT NULL,
  country_of_residence text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text,
  zip_code text NOT NULL,
  country text NOT NULL,
  employment_status text,
  job_title text,
  phone_work text,
  phone_mobile text NOT NULL,
  phone_home text,
  alternative_email text,
  include_second_applicant boolean DEFAULT false,
  investment_from_company boolean DEFAULT false,
  investment_from_trust boolean DEFAULT false,
  investment_from_pension boolean DEFAULT false,
  exp_equities boolean DEFAULT false,
  exp_property boolean DEFAULT false,
  exp_bonds boolean DEFAULT false,
  exp_options boolean DEFAULT false,
  exp_cfds boolean DEFAULT false,
  exp_cryptocurrency boolean DEFAULT false,
  trading_experience text,
  risk_tolerance text NOT NULL,
  annual_income text NOT NULL,
  investment_holdings_value text NOT NULL,
  current_savings_value text NOT NULL,
  liquid_net_worth text NOT NULL,
  earnings_over_200k text NOT NULL,
  assets_over_1m text NOT NULL,
  terms_accepted boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.client_applications ENABLE ROW LEVEL SECURITY;

-- Users can insert their own application
CREATE POLICY "Users can insert own application"
  ON public.client_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own application
CREATE POLICY "Users can view own application"
  ON public.client_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
  ON public.client_applications
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update applications
CREATE POLICY "Admins can update applications"
  ON public.client_applications
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
