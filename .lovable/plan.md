

# Remove Dark Mode & Phone Number from Headers

## Changes

### 1. Force light-only theme (`src/App.tsx`)
- Change `ThemeProvider` to `defaultTheme="light"` and add `forcedTheme="light"` (or remove `enableSystem` and set `disableTransitionOnChange`)
- Simplest: just set `forcedTheme="light"` so dark mode is impossible

### 2. Clean up `Header.tsx`
- Remove `ThemeToggle` import and usage
- Remove `useTheme`, dark logo import, mounted state (just use light logo directly)
- Remove phone number links (both desktop and mobile)

### 3. Clean up `RegistrationHeader.tsx`
- Remove `ThemeToggle` import and usage
- Remove `useTheme`, dark logo import, mounted state
- Remove `dark:` classes (e.g. `dark:bg-slate-900`, `dark:bg-muted/10`)

### 4. Optionally remove `dark:` prefixed classes across other components
- Not strictly necessary since `forcedTheme="light"` prevents dark mode, but keeps code clean. I'll clean the most prominent ones (LegalPageLayout, Footer, FeaturedBondsSection, etc.)

## Files Modified

| File | Change |
|------|--------|
| `src/App.tsx` | Add `forcedTheme="light"` to ThemeProvider |
| `src/components/landing/Header.tsx` | Remove theme toggle, phone number, dark logo logic |
| `src/components/registration/RegistrationHeader.tsx` | Remove theme toggle, dark logo logic, dark: classes |

