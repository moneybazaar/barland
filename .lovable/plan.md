

# Docker Deployment: Static Site with Runtime Config Injection

## Recommendation: Static (Nginx)

This is a **Vite + React SPA**. All backend calls go to Lovable Cloud (hosted Supabase) via the JS client — there is no server-side rendering, no Node.js server, no direct PostgreSQL connection. The app is purely client-side.

The bond data is hardcoded in `FeaturedBondsSection.tsx`. Database interactions (leads table, invite tokens, admin auth) all go through the Supabase REST API using the anon key baked into the JS bundle at build time.

**Therefore: serve it as a static site with Nginx.** You already have this setup in your existing `Dockerfile` and `nginx.conf`.

## What You Already Have (and it's correct)

Your current `Dockerfile` and `nginx.conf` are production-ready for this use case. The only improvement needed is **runtime environment variable injection** so you don't bake Supabase URLs into the Docker image.

## Changes

### 1. Runtime env injection script (`docker-entrypoint.sh`)

Create a shell script that replaces placeholder values in the built JS files at container startup, so you can pass `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` as Docker environment variables instead of hardcoding them.

### 2. Updated Dockerfile

Add the entrypoint script and use placeholder values during build:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Build with placeholders — replaced at runtime
ENV VITE_SUPABASE_URL="__SUPABASE_URL_PLACEHOLDER__"
ENV VITE_SUPABASE_PUBLISHABLE_KEY="__SUPABASE_KEY_PLACEHOLDER__"
ENV VITE_SUPABASE_PROJECT_ID="__SUPABASE_PROJECT_ID_PLACEHOLDER__"
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

### 3. Entrypoint script (`docker-entrypoint.sh`)

```bash
#!/bin/sh
# Replace placeholders in built JS files with actual env vars
for file in /usr/share/nginx/html/assets/*.js; do
  sed -i "s|__SUPABASE_URL_PLACEHOLDER__|${VITE_SUPABASE_URL}|g" "$file"
  sed -i "s|__SUPABASE_KEY_PLACEHOLDER__|${VITE_SUPABASE_PUBLISHABLE_KEY}|g" "$file"
  sed -i "s|__SUPABASE_PROJECT_ID_PLACEHOLDER__|${VITE_SUPABASE_PROJECT_ID}|g" "$file"
done
exec "$@"
```

### 4. Updated `nginx.conf`

Add security headers for production:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 5. Docker Compose snippet (for your VPS)

```yaml
bonds-app:
  build: ./bonds
  container_name: bonds-app
  restart: unless-stopped
  environment:
    - VITE_SUPABASE_URL=https://pgnvofalgkamtqxcjqpc.supabase.co
    - VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    - VITE_SUPABASE_PROJECT_ID=pgnvofalgkamtqxcjqpc
  networks:
    - webnet
```

Your Nginx reverse proxy routes `bonds.barclays-ib.app` → `bonds-app:80`.

## Key Points

- **No `DATABASE_URL` needed** — this app never talks to PostgreSQL directly. All DB access is via the Supabase REST API (same as Lovable Cloud).
- **No Node.js runtime needed** — pure static files served by Nginx.
- **Same database** — the portal app and bonds app share data through the same Supabase project; they just use different anon/service keys as needed.
- **Port 80 internally** — your reverse proxy handles TLS termination via Cloudflare.

## Files to Create/Modify

| File | Action |
|------|--------|
| `Dockerfile` | Update with placeholder env vars + entrypoint |
| `docker-entrypoint.sh` | New — runtime env injection |
| `nginx.conf` | Add security headers |
| `.dockerignore` | Already correct |

