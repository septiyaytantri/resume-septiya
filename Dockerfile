FROM node:22-alpine AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3005
ENV HOSTNAME=0.0.0.0
RUN apk add --no-cache openssl bash
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts

RUN echo '#!/bin/bash\n\
set -e\n\
echo "🔄 Running database migrations..."\n\
npx prisma migrate deploy\n\
echo "🌱 Seeding admin user..."\n\
node scripts/seed-admin.mjs\n\
echo "🚀 Starting Next.js application..."\n\
exec npm run start -- -H 0.0.0.0 -p 3005' > /app/docker-entrypoint.sh \
    && chmod +x /app/docker-entrypoint.sh

EXPOSE 3005
ENTRYPOINT ["/app/docker-entrypoint.sh"]