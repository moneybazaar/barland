

## Plan: Reorder Sections + Admin Dashboard Design Upgrade

### 1. Move Bond Cards to Top Priority Position

The bond cards are the core product — they should appear immediately after the hero. Current order has Stats and Process before bonds, pushing the most important content too far down.

**`src/pages/Index.tsx`** — New section order:
```
Hero → FeaturedBonds → Stats → Process → Benefits → Philosophy → Suitability → LeadForm → FAQ → CTA
```

### 2. Admin Dashboard Design Upgrade

Inspired by the barclayportal.lovable.app design language (clean header, card-based layout, institutional typography), upgrade the admin dashboard from basic to a polished institutional portal.

**`src/pages/AdminDashboard.tsx`** — Full redesign:

- **Header**: Add Barclays logo, styled navy header matching brand, user email display
- **Stats Cards**: Add percentage change indicators, subtle icon backgrounds, border-left accent color per card type
- **Filters Bar**: Cleaner layout with search input, date range display, export button placeholder
- **Table**: Improved typography, row hover effects, better status badge styling with dot indicators, click-to-expand row detail (phone, notes)
- **Empty State**: Better illustration/messaging when no leads found
- **Overall**: Use brand navy (`bg-secondary`) for header, consistent with landing page design system

### Files

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Reorder — move FeaturedBonds right after Hero |
| `src/pages/AdminDashboard.tsx` | Design upgrade — institutional admin portal |

