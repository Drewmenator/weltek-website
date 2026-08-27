/**
 * Generates the default Open Graph card at public/images/og-default.jpg.
 *
 * Run with: node scripts/generate-og.mjs
 *
 * Why a committed JPEG rather than a runtime ImageResponse: the card never
 * changes per request, JPEG is the format every crawler handles (LinkedIn is
 * unreliable with WebP, and it is the platform that matters most for an EPC
 * contractor), and a static file costs nothing to serve.
 *
 * Why no text: LinkedIn, Slack and X all render og:title and og:description
 * directly beneath the image. Repeating the tagline inside the artwork just
 * says the same thing twice in two typefaces.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => path.join(root, ...s);

const W = 1200;
const H = 630;

const NAVY_900 = "#071722";
const BRONZE = "#9c561f";

// Left-weighted scrim so the logo sits on solid ground while the right side
// keeps the photograph readable. Mirrors the hero treatment on the site.
const scrim = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${NAVY_900}" stop-opacity="0.97"/>
      <stop offset="42%"  stop-color="${NAVY_900}" stop-opacity="0.86"/>
      <stop offset="78%"  stop-color="${NAVY_900}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${NAVY_900}" stop-opacity="0.22"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${BRONZE}"/>
</svg>`);

const LOGO_W = 300;

const logo = await sharp(p("public/images/brand/weltek-logo-white.png"))
  .resize({ width: LOGO_W })
  .toBuffer();
const logoMeta = await sharp(logo).metadata();

const out = p("public/images/og-default.jpg");

await sharp(p("public/images/photos/hero-topside.webp"))
  .resize(W, H, { fit: "cover", position: "right" })
  .composite([
    { input: scrim, top: 0, left: 0 },
    {
      input: logo,
      left: 84,
      top: Math.round((H - logoMeta.height) / 2) - 6,
    },
  ])
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4", mozjpeg: true })
  .toFile(out);

const { size } = await sharp(out).metadata().then(async (m) => ({
  ...m,
  size: (await import("node:fs")).statSync(out).size,
}));

console.log(`wrote public/images/og-default.jpg  ${W}x${H}  ${Math.round(size / 1024)}KB`);
