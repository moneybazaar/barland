

## Make Light and Dark Mode Visually Perfect

After auditing every component in both modes, here are all the issues found and fixes needed:

### 1. Theme Toggle Button (Broken Layout)

**Issue:** The Moon icon uses `absolute` positioning but the parent `<button>` is not `relative`, causing the moon icon to float outside its container.

**Fix in `src/components/theme-toggle.tsx`:**
- Add `relative` to the button's className so the Moon icon positions correctly within it.

---

### 2. Hardcoded White Backgrounds (Don't Adapt to Dark Mode)

Several sections and CSS classes use hardcoded `bg-white` or `#f5f5f5` that stay white/light-gray even in dark mode.

**Fixes in `src/index.css`:**

| CSS Class | Current | Fix |
|-----------|---------|-----|
| `.section-gray` | `background-color: #f5f5f5` | Add `dark:bg-card` or use `.dark .section-gray { background-color: hsl(var(--card)); }` |
| `.stats-card` | `@apply bg-white` | Change to `@apply bg-white dark:bg-card` |
| `.faq-item` | `@apply bg-white` | Change to `@apply bg-white dark:bg-card` |
| `.rate-card` | `@apply bg-white` | Change to `@apply bg-white dark:bg-card` |
| `.product-card` | `@apply bg-white` | Change to `@apply bg-white dark:bg-card` |

---

### 3. Hardcoded White Backgrounds in Component JSX

**ProcessSection.tsx (line 33):**
- `bg-white` on the section -- change to `bg-white dark:bg-background`

**ProductsSection.tsx (line 116):**
- Product card `bg-white` -- change to `bg-white dark:bg-card`

**ComparisonSection.tsx:**
- Section (line 17): `bg-white` -- change to `bg-white dark:bg-background`
- Table container (line 40): `bg-white` -- change to `bg-white dark:bg-card`
- Alternating rows (line 63): `bg-white` -- change to `bg-white dark:bg-card`

**FeaturedBondsSection.tsx:**
- Section title `text-secondary` headings should use `dark:text-foreground` for readability
- Bond detail text `text-secondary` entries need `dark:text-foreground`

**Footer.tsx (Disclaimer dialog, line 88):**
- `bg-white` on DialogContent -- change to `bg-white dark:bg-card`
- `text-gray-700` (line 95) -- change to `text-gray-700 dark:text-foreground/80`
- `text-[#00395d]` (line 91) -- change to include dark variant

---

### 4. Section Title Underline in Dark Mode

The `.section-title::after` pseudo-element works fine (uses primary blue gradient), but `.section-title` itself uses `@apply text-secondary`. In dark mode, `--secondary` is a dark blue which may be invisible on dark backgrounds.

**Fix:** Add `.dark .section-title { color: hsl(var(--foreground)); }` or update the class to include `dark:text-foreground`.

---

### 5. Comparison Table Text Visibility

`text-secondary` in the comparison table feature column (line 66) will be hard to read on dark backgrounds.

**Fix:** Add `dark:text-foreground` alongside `text-secondary`.

---

### Summary of Files to Change

| File | Changes |
|------|---------|
| `src/components/theme-toggle.tsx` | Add `relative` to button |
| `src/index.css` | Add dark mode variants for `.section-gray`, `.stats-card`, `.faq-item`, `.rate-card`, `.product-card`, `.section-title` |
| `src/components/landing/ProcessSection.tsx` | `bg-white` to `bg-white dark:bg-background`, `text-secondary` to `text-secondary dark:text-foreground` |
| `src/components/landing/ProductsSection.tsx` | Product card `bg-white` to `bg-white dark:bg-card`, text color fixes |
| `src/components/landing/ComparisonSection.tsx` | All `bg-white` and `text-secondary` instances get dark variants |
| `src/components/landing/FeaturedBondsSection.tsx` | `text-secondary` entries get `dark:text-foreground` |
| `src/components/landing/FAQSection.tsx` | Section title text color dark variant |
| `src/components/landing/Footer.tsx` | Disclaimer dialog dark mode colors |
| `src/components/landing/StatsSection.tsx` | Section title text if needed |
| `src/components/landing/LeadFormSection.tsx` | `text-secondary` headings get dark variants |

