import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Skip static generation untuk page yang butuh database
  ...(process.env.SKIP_BUILD_DATABASE_VALIDATION === 'true' && {
    typescript: {
      ignoreBuildErrors: false,
    },
  }),
};

export default nextConfig;