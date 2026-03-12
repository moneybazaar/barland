

## Plan: Update FSCS Logo to Current Purple Branding

The current FSCS logo (`/fscs-logo.png`) is outdated. The official FSCS branding uses a purple color scheme (#5F2167 / #7B2D8E).

### Changes

1. **Create new SVG** (`public/fscs-logo.svg`) — Purple FSCS logo matching the current official branding with the "Financial Services Compensation Scheme" text
2. **Update RegionContext** (`src/contexts/RegionContext.tsx` line 56) — Change `insuranceLogo` from `/fscs-logo.png` to `/fscs-logo.svg`

