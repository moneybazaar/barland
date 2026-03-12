

## Plan: Singapore-Specific Content, Regional Phone Numbers, and Link Fixes

### Issues Found

**1. Hardcoded FDIC in FeaturedBondsSection (not using region config)**
- Lead form info box (lines 275-281): hardcoded FDIC logo, "FDIC Insured", "$250,000"
- FDIC Banner (lines 445-460): hardcoded FDIC logo, "FDIC Insured Up to $250,000"
- Buy-back paragraph (line 254): hardcoded "$2,000,000"

**2. Hardcoded US phone numbers**
- Header: `tel:+18002272597` and "1-800-BARCLAYS" (lines 48, 52, 57)
- CTASection: `tel:1-800-BARCLAYS` and "1-800-BARCLAYS" (lines 52, 57)
- SG should show: `+65 6308 3858` (Barclays Singapore office)

**3. No SGD bond listings for Singapore region**
- All 4 bonds are USD with US ISINs — SG users should see SGD-denominated equivalents

**4. External links to verify**
All links found across the site:
- `https://www.barclays-ib.com/` — Logo link
- `https://secure.barclays-ib.com/openaccount` — Open Account CTA (x3)
- `https://www.facebook.com/BarclaysUS` — Social
- `https://twitter.com/baraboraib` — Social
- `https://www.youtube.com/@barclaysib` — Social
- `https://www.instagram.com/barclaysib/` — Social
- `https://www.barclays-ib.com/privacy-and-cookie-policy.html` — Footer legal
- `https://www.barclays-ib.com/important-information.html` — Footer legal
- `https://www.barclays-ib.com/accessibility.html` — Footer legal
- `https://www.barclays-ib.com/careers` — Footer legal
- 4x Business Insider bond verify links

These all point to `barclays-ib.com` which is the site's own domain — they should remain as-is since they're self-referential. The Business Insider verify links are third-party and should be kept.

---

### Changes

#### 1. `src/components/landing/FeaturedBondsSection.tsx`
- **Add SGD bond data** for SG region (4 SGD-denominated bonds with different ISINs and verify links)
- **Fix lead form info box** to use `config` for insurance logo, name, and motto
- **Fix FDIC banner** to use `config` for insurance logo, name, coverage amount, and motto
- **Regionalize buy-back paragraph** currency amounts

#### 2. `src/components/landing/Header.tsx`
- Switch phone number based on region: US = `+18002272597` / "1-800-BARCLAYS", SG = `+6563083858` / "+65 6308 3858"

#### 3. `src/components/landing/CTASection.tsx`
- Use `useRegion` to switch phone number and label based on region

#### 4. `src/contexts/RegionContext.tsx`
- Add `phoneNumber` and `phoneDisplay` fields to `RegionConfig`

