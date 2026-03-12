

## GitHub Pages Deployment Setup

Two files need to be created/modified:

### 1. Update `vite.config.ts`

Add a `base` property for production builds. GitHub Pages serves from `https://<username>.github.io/<repo-name>/`, so the base path must match the repo name. Since the repo name isn't known yet, we'll use a conditional that reads from an environment variable or defaults to `/`.

```ts
base: mode === "production" ? "/barland/" : "/",
```

> You'll need to adjust `"/barland/"` to match your actual GitHub repository name.

### 2. Create `.github/workflows/deploy.yml`

A GitHub Actions workflow that:
- Triggers on push to `main`
- Installs dependencies with `npm ci`
- Runs `npm run build`
- Deploys the `dist/` folder to GitHub Pages using `actions/deploy-pages`

### 3. After deployment

In your GitHub repo: **Settings > Pages > Source** — select "GitHub Actions".

### Files changed

| File | Action |
|------|--------|
| `vite.config.ts` | Add `base` property |
| `.github/workflows/deploy.yml` | Create workflow file |

