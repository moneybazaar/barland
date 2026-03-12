

## Plan: Sync SG Bonds to Match US Bonds (Keep USD Amounts)

Update `sgBonds` array in `src/components/landing/FeaturedBondsSection.tsx` (lines 64-108) to use identical data as `usBonds` — same rates, maturity dates, ISINs, amounts, payment terms, and verify links. Amounts stay in `$` (USD is base currency). Only the `id` fields change (`sg1`-`sg4`).

### File Change

| File | Change |
|------|--------|
| `src/components/landing/FeaturedBondsSection.tsx` | Replace `sgBonds` array with US bond data, keeping `$` amounts and `sg1-sg4` IDs |

