import type { NextConfig } from "next";

/**
 * Static export: `npm run build` produces a fully static site in /out
 * that can be hosted anywhere (Netlify, Vercel, Cloudflare Pages, cPanel…).
 */
const nextConfig: NextConfig = {
  output: "export",
  // Set NEXT_PUBLIC_BASE_PATH (e.g. "/agency") when hosting under a sub-path such as GitHub Pages.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
