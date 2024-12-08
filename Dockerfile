FROM node:6-alpine AS base
 
FROM base AS builder

WORKDIR /app

COPY package.json angular-cli.json ./
COPY src ./src/

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1
