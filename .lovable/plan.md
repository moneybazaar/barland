

## Plan: Add FSCS (UK) Region, Improve Callback Form, and Build Admin Portal with External Supabase

### Overview
Three interconnected changes: (1) add UK/FSCS as a third region, (2) enhance the lead/callback form with date/time booking, and (3) build an admin portal to review leads/appointments — all backed by an external Supabase database.

---

### 1. Add FSCS (UK) Region

**`src/contexts/RegionContext.tsx`**
- Add `'UK'` to the `Region` type: `'US' | 'SG' | 'UK'`
- Add UK config to `regionConfigs`:
  - `insuranceName: 'FSCS'`, `insuranceAbbr: 'FSCS'`
  - `insuranceLogo: '/fscs-logo.png'` (you'll need to upload an FSCS logo to `public/`)
  - `insuranceMotto: 'FSCS Protected - Up to £85,000 per eligible person, per institution'`
  - `coverageAmount: '£85K'`, `coverageAmountFull: '£85,000'`
  - `memberLabel: 'FSCS Protected'`, `currency: 'GBP'`
- Update `detectRegion()` to detect UK timezones (`Europe/London`)

**`src/components/landing/Header.tsx`** — Add UK option to the region toggle

**All insurance badge locations** (FeaturedBondsSection, LeadFormSection, Footer) — Add FSCS logo conditional alongside FDIC/SDIC. Refactor the repeated ternary into a helper that reads `config.insuranceLogo` directly (already available in config).

**Asset needed**: Upload `fscs-logo.png` to `public/` and import in components.

---

### 2. Improve Lead/Callback Form

The FeaturedBondsSection form already has date/time pickers. The LeadFormSection form does not. Changes:

**`src/components/landing/LeadFormSection.tsx`**
- Remove the `message` textarea field
- Add `date` (Calendar/Popover date picker) and `preferredTime` (Select: Morning/Afternoon/Evening) fields — matching the pattern already in FeaturedBondsSection
- Update zod schema to include `date: z.date({ required_error: 'Please select a callback date' })` and `preferredTime: z.string().min(1, 'Please select a time')`
- Make date/time **required** (not optional) since this is a callback booking form
- Update submit handler to send data to Supabase

---

### 3. Supabase Database Setup

**Prerequisite**: Connect an external Supabase project to this Lovable project.

**Database tables** (via migrations):

```sql
-- Leads table
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  preferred_date date,
  preferred_time text,
  region text not null default 'US',
  source text not null default 'landing', -- 'landing' or 'bonds'
  status text not null default 'new', -- 'new', 'contacted', 'converted', 'archived'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: public insert (no auth needed for lead capture), admin read
alter table public.leads enable row level security;

create policy "Anyone can insert leads"
  on public.leads for insert
  with check (true);

create policy "Admins can view leads"
  on public.leads for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update leads"
  on public.leads for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));
```

Also set up the `user_roles` table and `has_role` function per the security guidelines.

**`src/integrations/supabase/`** — Standard Supabase client setup with environment variables.

**Form submit handlers** — Update both FeaturedBondsSection and LeadFormSection `onSubmit` to insert into `public.leads` via Supabase client.

---

### 4. Admin Portal

**New routes and pages:**
- `/admin/login` — Simple email/password login via Supabase Auth
- `/admin` — Protected dashboard (redirect to login if not authenticated + not admin role)

**`src/pages/AdminLogin.tsx`** — Login form using `supabase.auth.signInWithPassword()`

**`src/pages/AdminDashboard.tsx`** — Protected page with:
- Stats cards: total leads, new today, upcoming appointments
- Leads table with columns: Name, Email, Phone, Preferred Date/Time, Region, Status, Created
- Status dropdown to update lead status (new → contacted → converted → archived)
- Filter by status, region, date range
- Uses `@tanstack/react-query` for data fetching

**`src/components/admin/AdminLayout.tsx`** — Sidebar layout with navigation

**`src/hooks/useAdmin.ts`** — Hook to check admin role via `has_role` RPC, redirect non-admins

**`src/App.tsx`** — Add `/admin` and `/admin/login` routes

---

### Files to Create/Modify
- **Modified**: `RegionContext.tsx`, `LeadFormSection.tsx`, `FeaturedBondsSection.tsx`, `Footer.tsx`, `Header.tsx`, `App.tsx`
- **New**: `AdminLogin.tsx`, `AdminDashboard.tsx`, `AdminLayout.tsx`, `useAdmin.ts`, Supabase client config, DB migrations
- **Asset needed**: FSCS logo file (`public/fscs-logo.png`)

### Prerequisites Before Implementation
1. Connect an external Supabase project
2. Upload an FSCS logo image to `public/`

