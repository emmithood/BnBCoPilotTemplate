import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // Environment indicator to detect localhost/development
    IS_DEVELOPMENT: process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
  // Add webpack config to allow MCP window object
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;