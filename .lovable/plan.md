

## Plan: Landing Page Conversion Optimization

### Current Flow
Hero (text + CTA) → Stats → Featured Bonds (with lead form) → FAQ → CTA → Footer

### Optimized Flow
1. **Hero** (headline + inline lead form) → 2. **Stats** (kept) → 3. **Process Steps** (new) → 4. **Featured Bonds** (kept, form removed) → 5. **Key Benefits** (new) → 6. **Investor Suitability** (new) → 7. **Primary Lead Funnel** (existing LeadFormSection, enhanced) → 8. **FAQ** (kept, expanded) → 9. **Final CTA** (kept) → Footer

---

### Changes by File

**`src/components/landing/HeroSection.tsx`** — Major rewrite
- Replace right-side image with an inline lead capture form (Full Name, Email, Phone, Investment Interest select)
- CTA: "Request a Call Back"
- Below form: 3 trust indicators (Private Client Services, Institutional Strategies, Dedicated Management)
- Left side: Update headline to "Institutional Investment Opportunities For Private Clients", update subheadline
- Keep hero-split layout, navy left panel stays
- Fix `barclays-ib.com` → `secure.barclays-ib.app`
- Form submits to Supabase `leads` table (source: 'hero')

**`src/components/landing/ProcessSection.tsx`** — New component
- Title: "How the Investment Process Works"
- 4 horizontal steps with icons: Consultation → Strategy Development → Investment Allocation → Ongoing Management
- Clean infographic layout using existing `process-step-number` CSS class

**`src/components/landing/BenefitsSection.tsx`** — New component
- Title: "Key Benefits"
- 2x3 grid of benefit cards with icons:
  - Institutional Investment Access
  - Professional Portfolio Management
  - Transparent Performance Reporting
  - Diversified Investment Strategies
  - Dedicated Client Support
  - Regulatory Protection
- Uses existing card styling patterns

**`src/components/landing/SuitabilitySection.tsx`** — New component
- Title: "Who This Is Designed For"
- Checklist layout with check icons:
  - Private investors seeking diversified strategies
  - Clients looking for professional portfolio management
  - Investors seeking institutional investment access
  - Individuals prioritising capital preservation

**`src/components/landing/FeaturedBondsSection.tsx`** — Modify
- Remove the embedded lead capture form (lines 316-539)
- Keep bond cards grid and buy-back paragraph
- Add a simple CTA button linking to `#lead-form` instead of the full form

**`src/components/landing/LeadFormSection.tsx`** — Enhance
- Update title to "Speak With an Investment Advisor"
- Update description to consultation-focused copy
- Add optional "Investment Range" select field (schema update)
- Keep existing form fields and Supabase submission

**`src/components/landing/FAQSection.tsx`** — Expand
- Add 2 more questions: "How are portfolios managed?" and "How do clients monitor their investments?"
- Update FSCS/UK region answers

**`src/components/landing/CTASection.tsx`** — Update
- Update headline to "Interested in learning more about our investment strategies?"
- Primary CTA links to `#lead-form` anchor instead of external URL
- Fix `barclays-ib.com` → `secure.barclays-ib.app`

**`src/components/landing/Header.tsx`** — Fix domain
- `barclays-ib.com` → `secure.barclays-ib.app`

**`src/components/landing/Footer.tsx`** — Fix domain
- All `barclays-ib.com` links → `secure.barclays-ib.app`

**`src/pages/Index.tsx`** — Update section order
```
Header → HeroSection → StatsSection → ProcessSection → FeaturedBondsSection → BenefitsSection → SuitabilitySection → LeadFormSection → FAQSection → CTASection → Footer
```

**`src/index.css`** — Minor additions
- Add `.benefit-card` styles (icon circle + card hover)
- Add `.checklist-item` styles
- Add `.process-connector` line between steps

---

### Domain Fix (included in this plan)
All `barclays-ib.com` references → `secure.barclays-ib.app` across Header, Footer, HeroSection, CTASection, RegisterInterest, RegistrationHeader, AdminLogin.

### No Changes To
- Branding, colors, typography (Effra), design tokens
- Existing Supabase schema (leads table already supports all needed fields)
- Admin portal

