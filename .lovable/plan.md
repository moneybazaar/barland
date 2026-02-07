

## Update All "Open Account" Links

The domain for the secure account portal needs to be updated from `secure.barclays.app` to `secure.barclays-ib.app` across three files.

### Changes

| File | Current URL | New URL |
|------|------------|---------|
| `src/components/landing/Header.tsx` | `https://secure.barclays.app/openaccount` | `https://secure.barclays-ib.app/openaccount` |
| `src/components/landing/HeroSection.tsx` | `https://secure.barclays.app/openaccount` | `https://secure.barclays-ib.app/openaccount` |
| `src/components/landing/CTASection.tsx` | `https://secure.barclays.app/openaccount` | `https://secure.barclays-ib.app/openaccount` |

All three files contain an "Open Account" button/link that will be updated to point to the new domain.

