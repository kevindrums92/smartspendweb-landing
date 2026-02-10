import type { NextConfig } from "next";

// Generate build ID: YYYYMMDD-HHmm (e.g. 20260209-2040)
const now = new Date();
const pad = (n: number) => String(n).padStart(2, "0");
const buildId = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Disable eslint during build for Heroku (faster builds)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript errors are now enabled - fix all errors before build passes
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
};

export default nextConfig;
