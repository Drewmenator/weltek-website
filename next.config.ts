import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * Scoped to what this site actually loads: its own assets, next/font (which
 * self-hosts, so no external font origin is needed), and inline styles, which
 * React and Next both emit. `unsafe-inline` on script-src is required because
 * Next injects inline bootstrap scripts and there is no nonce middleware here;
 * removing it silently breaks hydration. `frame-ancestors 'none'` is the modern
 * replacement for X-Frame-Options, which is sent alongside it for older agents.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Belt and braces with frame-ancestors, for agents that predate CSP level 2.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP as the fallback. Content negotiation picks per browser,
    // so nothing breaks on clients that only speak WebP. Photography is the
    // bulk of this site's weight and AVIF typically lands 25 to 40% smaller
    // than WebP at equivalent quality.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
