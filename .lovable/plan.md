

## Changes from PDF Review

After comparing the PDF document against the current codebase, here is what still needs to be done:

### 1. Update Favicon
Replace the current favicon with the uploaded `download.png` (Barclays eagle icon).
- Copy `download.png` to `public/favicon.png`
- `index.html` already references `/favicon.png`, so no HTML change needed

### 2. Add Missing Text to Featured Bonds Section
The PDF includes two additional sentences in the Featured Bonds description that are currently missing:

> "Since the inception of the buy back scheme, Barclays Bank and affiliate brokerages have operated a bond buy back scheme up to $2,000,000 per client per institution. These bonds apply to fixed income bonds only."

This will be appended to the existing paragraph in `FeaturedBondsSection.tsx`.

### 3. Add Second Paragraph to Hero Section
The PDF shows a second descriptive paragraph in the hero area that is not currently present:

> "Successfully navigating the rapid, disruptive shifts reshaping industries and business models takes a partner who deeply understands your goals. Together, let's create the tailored, sophisticated financial strategies you need to power possible."

This will be added as a second paragraph below the existing hero description in `HeroSection.tsx`.

---

### Files to Modify
- **`public/favicon.png`** -- replaced with `download.png`
- **`src/components/landing/FeaturedBondsSection.tsx`** -- add missing sentences to description
- **`src/components/landing/HeroSection.tsx`** -- add second paragraph

### Already Correct (No Changes Needed)
- Hero title: "Investment In Bonds"
- Hero CTA: "Open Account" linking to `secure.barclays.app/openaccount`
- Header: phone number + "Open Account" button
- CTA Section: "Open Account" button
