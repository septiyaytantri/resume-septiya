#!/bin/bash
set -e

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding admin user..."
node scripts/seed-admin.mjs

echo "🚀 Starting Next.js application..."
exec npm run start -- -H 0.0.0.0 -p 3005