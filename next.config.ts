import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP as the fallback. Content negotiation picks per browser,
    // so nothing breaks on clients that only speak WebP. Photography is the
    // bulk of this site's weight and AVIF typically lands 25 to 40% smaller
    // than WebP at equivalent quality.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
