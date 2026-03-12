

## Plan: Fix FSCS logo sizing + Replicate ib.barclays footer pages

### Problem 1: FSCS logo inconsistent sizing
The FSCS logo uses `dark:invert` in the bond section and lead form, which would incorrectly invert the purple logo. The footer correctly skips inversion for UK but the other two sections do not.

Three locations use the insurance logo:
- **Footer** (line 57): `h-6`, region-aware inversion -- correct
- **FeaturedBondsSection** (line 269): `h-10`, uses `dark:invert` -- needs fix
- **LeadFormSection** (line 121): `h-10`, uses `dark:invert` -- needs fix

### Fix
- Standardize all insurance logos to `h-10 w-auto` across all 3 locations (footer currently `h-6`, bump to `h-10`)
- Add region-aware inversion logic to FeaturedBondsSection and LeadFormSection (skip inversion for UK region, same as footer)

### Problem 2: Footer links don't match ib.barclays
The real ib.barclays footer has:
- A 4-column link section: **About Us** (Careers, Citizenship, Investor Relations, News, Sponsorship), **Other IB websites** (Barclays Indices, etc.), **Other Barclays Websites** (Barclaycard, etc.), **Follow us** (LinkedIn, Instagram, YouTube, X)
- Bottom bar: **Important information** | **Privacy Notice** | **Disclosures** | **Accessibility** | **Cookies policy** | **© Barclays 2026**

Current footer has different links pointing to `secure.barclays-ib.app`. Need to:
1. Create local pages for: `/important-information`, `/privacy-notice`, `/disclosures`, `/accessibility`, `/cookies-policy`
2. Restructure footer to match ib.barclays layout with the 4-column design
3. Update bottom legal links bar

### Changes

**Files to modify:**
1. `src/components/landing/Footer.tsx` -- Restructure to match ib.barclays footer with 4-column layout + bottom legal bar
2. `src/components/landing/FeaturedBondsSection.tsx` -- Fix FSCS logo inversion logic
3. `src/components/landing/LeadFormSection.tsx` -- Fix FSCS logo inversion logic

**Files to create (5 new pages):**
4. `src/pages/ImportantInformation.tsx` -- Legal page with Barclays important information content
5. `src/pages/PrivacyNotice.tsx` -- Privacy notice page
6. `src/pages/Disclosures.tsx` -- Disclosures page with status disclosure content (replicated from ib.barclays)
7. `src/pages/Accessibility.tsx` -- Accessibility statement page
8. `src/pages/CookiesPolicy.tsx` -- Cookies policy page

**File to update:**
9. `src/App.tsx` -- Add routes for the 5 new pages

Each page will use the same Header + Footer layout as the main site and contain appropriate legal/regulatory content matching the style and substance from ib.barclays.

