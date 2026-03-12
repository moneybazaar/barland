

## Plan: Replace Expert Sans with Effra Font Family

Based on the CSS reference provided, the site uses two Effra variants: **Effra-Regular** (weight 400) and **Effra-Bold** (weight 700). The current codebase has "Expert Sans" in 3 places.

### Changes

#### 1. `src/index.css`
- Rename all `@font-face` declarations from `'Expert Sans'` to `'Effra'`
- Update font file paths: `expert-sans-regular` → `effra-regular`, `expert-sans-bold` → `effra-bold`, `expert-sans-light` → `effra-light`
- Replace every `font-family: 'Expert Sans'` reference with `font-family: 'Effra'`
- Update `--font-sans` CSS variable to `'Effra'`
- Update comment from "Expert Sans" to "Effra"

#### 2. `tailwind.config.ts`
- Replace `'Expert Sans'` with `'Effra'` in `fontFamily.sans` and `fontFamily.serif`

#### 3. Rename font files in `public/fonts/`
- `expert-sans-regular.woff2` → `effra-regular.woff2` (and `.woff`)
- `expert-sans-bold.woff2` → `effra-bold.woff2` (and `.woff`)
- `expert-sans-light.woff2` → `effra-light.woff2` (and `.woff`)

> **Note**: The renamed files will still contain the same font binaries. To get true Effra rendering, you'll need to upload actual Effra `.woff2`/`.woff` files to `public/fonts/`.

