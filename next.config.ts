import { withPayload } from '@payloadcms/next/withPayload';
import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  experimental: {
    // Tree-shake unused exports from heavy packages (Payload, Lexical)
    optimizePackageImports: [
      '@payloadcms/richtext-lexical',
      '@payloadcms/next',
      '@payloadcms/ui',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default withBundleAnalyzer(withPayload(nextConfig));
