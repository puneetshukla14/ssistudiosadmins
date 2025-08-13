import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental features
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  // Ensure proper static file handling
  trailingSlash: false,
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Remove redirects to avoid conflicts with page.tsx
  async redirects() {
    return [];
  },
};

export default nextConfig;
