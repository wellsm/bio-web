# ---- Stage 1: build ----
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm and project dependencies (using cache)
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Copy code and build
COPY . .

RUN pnpm run build

# ---- Stage 2: runtime (Caddy) ----
FROM caddy:2-alpine

ARG PORT=8080
ENV PORT=$PORT

COPY --from=builder /app/dist /srv

COPY ./Caddyfile /etc/caddy/Caddyfile

# Caddy exposes 80 and 443 by default
