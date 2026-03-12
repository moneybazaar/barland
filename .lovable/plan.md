

## Plan: Institutional Landing Page Upgrade + Bond Card Cleanup + Admin Setup

This is a comprehensive upgrade covering bond card refinement, visual improvements with institutional imagery, enhanced animations, and admin user creation.

---

### 1. Bond Cards — Remove badges, improve design
**`src/components/landing/FeaturedBondsSection.tsx`**
- Remove the `AAA` rating badge (Award icon + `bond-rating-badge`)
- Remove the `highlight` badge ("Highest Rate", "Long Term")
- Keep only maturity badge
- Add gradient accent to rate display area
- Improve card spacing and visual hierarchy
- Enhanced staggered entrance + hover animations (scale, shadow, border glow via framer-motion)

**`src/index.css`**
- Remove `.bond-rating-badge` and `.bond-highlight-badge` styles (lines 509-519)
- Enhance `.bond-card` hover with deeper shadow and border glow

### 2. Hero Section — Improve image visibility + animations
**`src/components/landing/HeroSection.tsx`**
- Reduce overlay from `bg-secondary/70` to `bg-secondary/50` so hero-ib.jpg is more visible
- Add slow gradient animation on left panel background
- Enhance form slide-in animation timing

### 3. Institutional Imagery — Add subtle visuals from ib.barclays
Use images from ib.barclays CDN as subtle background/section imagery. These are editorial-quality photos that match the institutional tone.

**`src/components/landing/BenefitsSection.tsx`**
- Add a subtle background image (Investment Banking cityscape from ib.barclays) with heavy overlay to maintain readability
- Image URL: `https://www.ib.barclays/content/dam/barclaysmicrosites/ibpublic/Images/SolutionsRedesignImages/910x1280_SolutionsSubhead_InvestmentBanking.jpg`

**`src/components/landing/CTASection.tsx`**
- Add a subtle background image (Global Markets from ib.barclays) behind the existing gradient
- Image URL: `https://www.ib.barclays/content/dam/barclaysmicrosites/ibpublic/Images/SolutionsRedesignImages/910x1280_SolutionsSubhead_GlobalMarkets.jpg`

**`src/components/landing/ProcessSection.tsx`**
- No imagery changes — keep clean infographic style

Images are used sparingly as atmosphere, not as focal content. Heavy dark overlays (85-90% opacity) ensure text readability and brand consistency.

### 4. Investment Philosophy Section — New component
**`src/components/landing/PhilosophySection.tsx`** — New
- Title: "Our Investment Philosophy"
- 4 principles in large typography with minimal layout: Capital Preservation, Risk Discipline, Long-Term Growth, Institutional Research
- Subtle background with dark navy treatment matching brand
- Clean, whitespace-heavy design matching ib.barclays editorial style

### 5. Enhanced Animations Throughout
- **ProcessSection**: Add staggered scroll reveal with step progression animation
- **BenefitsSection**: Add hover scale + shadow lift on benefit cards
- **SuitabilitySection**: Add staggered checklist item reveal
- **FAQSection**: Already animated — no changes
- **StatsSection**: Already animated — no changes

### 6. Updated Section Order
**`src/pages/Index.tsx`**
```
Hero → Stats → Process → FeaturedBonds → Benefits → Philosophy (NEW) → Suitability → LeadForm → FAQ → CTA → Footer
```

### 7. Admin User Setup
**`src/pages/AdminLogin.tsx`**
- Update placeholder email to `admin@barclays-ib.com`

**`supabase/functions/seed-admin/index.ts`** — New edge function
- Creates auth user `admin@barclays-ib.com` with password `M0n3y@12345678` using Supabase Admin API
- Inserts admin role into `user_roles` table
- Idempotent — safe to call multiple times

### 8. CSS Cleanup
**`src/index.css`**
- Remove unused `.bond-rating-badge` and `.bond-highlight-badge`
- Add `.philosophy-principle` style for the new section

---

### Files Summary

| File | Action |
|------|--------|
| `src/components/landing/FeaturedBondsSection.tsx` | Remove badges, improve cards |
| `src/components/landing/HeroSection.tsx` | Reduce overlay, enhance animations |
| `src/components/landing/BenefitsSection.tsx` | Add subtle background imagery, hover effects |
| `src/components/landing/CTASection.tsx` | Add subtle background imagery |
| `src/components/landing/PhilosophySection.tsx` | New — Investment Philosophy section |
| `src/pages/Index.tsx` | Add PhilosophySection to flow |
| `src/pages/AdminLogin.tsx` | Update placeholder email |
| `src/index.css` | Remove badge styles, add philosophy styles |
| `supabase/functions/seed-admin/index.ts` | New — seed admin user edge function |

