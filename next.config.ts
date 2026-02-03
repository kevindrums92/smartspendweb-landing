import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Disable eslint during build for Heroku
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable typescript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
