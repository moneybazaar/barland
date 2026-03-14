#!/bin/sh
# Replace placeholders in built JS files with actual env vars
for file in /usr/share/nginx/html/assets/*.js; do
  sed -i "s|__SUPABASE_URL_PLACEHOLDER__|${VITE_SUPABASE_URL}|g" "$file"
  sed -i "s|__SUPABASE_KEY_PLACEHOLDER__|${VITE_SUPABASE_PUBLISHABLE_KEY}|g" "$file"
  sed -i "s|__SUPABASE_PROJECT_ID_PLACEHOLDER__|${VITE_SUPABASE_PROJECT_ID}|g" "$file"
done
exec "$@"
