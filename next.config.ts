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
  // Ensure proper redirects work
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
      {
        source: '/index',
        destination: '/login',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
