import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Disable eslint during build for Heroku (faster builds)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript errors are now enabled - fix all errors before build passes
};

export default nextConfig;
