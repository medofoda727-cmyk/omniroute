/**
 * Optional sub-path the site is served from (e.g. "/agency" on GitHub Pages).
 * Empty when hosted at a domain root (Vercel, Netlify, custom domain).
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** Prefix a root-relative path ("/brand/logo.webp") with the base path. */
export const asset = (path: string) => `${basePath}${path}`;
