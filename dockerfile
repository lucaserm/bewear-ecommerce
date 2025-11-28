FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@latest

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build

FROM node:22-alpine AS runner
COPY --from=builder /app/drizzle.config.ts /app/drizzle ./
WORKDIR /app

ENV PORT=3001
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./

EXPOSE 3000
CMD ["node", "server.js"]
