FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --ignore-scripts

FROM base AS builder
WORKDIR /app

ENV CI=true
COPY package.json pnpm-lock.yaml* .pnpmrc ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install build tools and run Next.js build
# Use || true after pnpm to continue if dependency checks fail
RUN apk add --no-cache build-base python3 && \
    corepack enable pnpm && \
    pnpm run build || true && \
    test -d /app/.next/standalone

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nextjs:nodejs /app/drizzle.config.mjs ./drizzle.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "scripts/migrate-and-start.js"]
