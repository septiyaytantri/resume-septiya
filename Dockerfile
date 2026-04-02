FROM node:22-slim AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
# Set placeholder DATABASE_URL untuk prisma generate
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
RUN npm ci
RUN npx prisma generate

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Skip database connection saat build & disable static page generation
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
ENV SKIP_ENV_VALIDATION="true"
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3005
ENV HOSTNAME=0.0.0.0
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts

RUN printf '#!/bin/sh\nset -e\necho "🔧 Generating Prisma Client..."\nnpx prisma generate\necho "🔄 Running database migrations..."\nnpx prisma migrate deploy\necho "🌱 Seeding admin user..."\nnode scripts/seed-admin.mjs\necho "🚀 Starting Next.js application..."\nexec npm run start -- -H 0.0.0.0 -p 3005\n' > /app/docker-entrypoint.sh && chmod +x /app/docker-entrypoint.sh

EXPOSE 3005
ENTRYPOINT ["/app/docker-entrypoint.sh"]