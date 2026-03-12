

## Four Changes

### 1. Add Date/Time Picker to Contact Form (LeadFormSection)

Add a "Preferred Contact Date" and "Preferred Contact Time" field to the lead form in `FeaturedBondsSection.tsx` (the active contact form). Will use the Shadcn date picker (Popover + Calendar) for date, and a Select dropdown for time slots.

**File: `src/components/landing/FeaturedBondsSection.tsx`**
- Add `date` (optional Date) and `preferredTime` (optional string) to the form schema
- Add a date picker field using Popover + Calendar after the phone field
- Add a time select dropdown (Morning, Afternoon, Evening slots)
- Import Calendar, Popover, Select components

### 2. Replace All FDIC Logos with SVG + Add Motto

Currently using `fdic-logo.png` in FeaturedBondsSection and LeadFormSection. Change all instances to use the SVG version (`/fdic-logo.svg` or the src/assets version) and add the FDIC motto text "Each depositor insured to at least $250,000" alongside the logo.

**Files to change:**
- `src/components/landing/FeaturedBondsSection.tsx` -- 3 FDIC logo instances (bond cards, form info box, banner): switch from PNG import to SVG, add motto text
- `src/components/landing/LeadFormSection.tsx` -- 1 FDIC logo instance: switch to SVG, add motto
- `src/components/landing/Footer.tsx` -- already uses SVG, just add motto text

### 3. Remove Second Hero Paragraph

**File: `src/components/landing/HeroSection.tsx`**
- Delete lines 42-49 (the "Successfully navigating..." paragraph)

### 4. Move Buy-Back Paragraph Below Bond Cards

Currently the buy-back scheme description paragraph sits above the bond cards grid in FeaturedBondsSection. Move it to after the bond cards grid and reduce font size.

**File: `src/components/landing/FeaturedBondsSection.tsx`**
- Remove the paragraph from the section header (line 155-157)
- Add it back after the bond cards grid (after line 238), with `text-sm` instead of `text-lg`

