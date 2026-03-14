

# Docker Container Deployment on `bonds.*` Subdomain

The project currently deploys to GitHub Pages with a `/barland/` base path. Since it will live on a `bonds.` subdomain (e.g., `bonds.yourdomain.com`) inside a Docker container, the base path should be `/` (root) and we need a Dockerfile + nginx config for serving the SPA.

## Changes

### 1. Fix Vite base path
Change production `base` from `"/barland/"` to `"/"` since the app will be at the root of the `bonds.*` subdomain.

### 2. Create `Dockerfile`
Multi-stage build:
- **Stage 1 (build)**: Node 20, `npm ci`, `npm run build`
- **Stage 2 (serve)**: Nginx Alpine, copy `dist/` into nginx, use custom config for SPA routing

### 3. Create `nginx.conf`
- Serve static files from `/usr/share/nginx/html`
- `try_files $uri $uri/ /index.html` for SPA client-side routing
- Gzip compression enabled
- Cache headers for static assets
- Listen on port 80

### 4. Create `.dockerignore`
Exclude `node_modules`, `.git`, `dist`, etc. to keep build context small.

### 5. Update `.github/workflows/deploy.yml`
Replace GitHub Pages deployment with Docker image build and push (to your container registry). Alternatively, keep it as-is if you build Docker images separately — I'll add a new workflow for Docker builds.

## File summary

| File | Action |
|------|--------|
| `vite.config.ts` | Change base to `"/"` |
| `Dockerfile` | Create (multi-stage Node + Nginx) |
| `nginx.conf` | Create (SPA routing config) |
| `.dockerignore` | Create |
| `.github/workflows/deploy.yml` | Update or replace with Docker build workflow |

