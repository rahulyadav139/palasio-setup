import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/web-ui', '@repo/shared'],
};

export default nextConfig;
