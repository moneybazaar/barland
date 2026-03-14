# Stage 1: Build
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

# Stage 2: Serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
