/**
 * Weltek was founded by Pedro Egbe in 1986 (see his profile in content/team.ts).
 * Derive tenure from this rather than writing a literal: a hardcoded "30+" was
 * on the site for months and understated the company by a full decade.
 */
export const FOUNDED_YEAR = 1986;

/** Recomputed at build time, so it cannot go stale the way a literal does. */
export const yearsOfDelivery = new Date().getFullYear() - FOUNDED_YEAR;

export const site = {
  name: "Weltek Limited",
  shortName: "Weltek",
  domain: "weltekng.com",
  /**
   * Canonical origin. Everything derives from this: canonical links, OG and
   * Twitter image URLs, JSON-LD, the sitemap and robots.txt.
   *
   * weltekng.com still serves the previous site, so until DNS moves, every
   * absolute URL here points at a host that 404s. Set NEXT_PUBLIC_SITE_URL in
   * the Vercel project to the live deployment origin to make sharing and
   * crawling work in the meantime, then delete the variable once the domain
   * is pointed here. No code change either way.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://weltekng.com",
  tagline: "Engineering, Procurement and Construction",
  description:
    "Weltek Limited is a Nigerian Engineering, Procurement and Construction company delivering offshore topside facilities, brownfield rejuvenation, power systems, instrumentation and electrical, automation and wellhead control panels for the oil and gas, power and process industries since 1986.",
  capabilityStatement: "/weltek-capability-statement.pdf",
  linkedin: "https://www.linkedin.com/company/weltek-limited",
  email: "info@weltekng.com",
  offices: [
    {
      label: "Corporate Head Office",
      lines: ["Plot 307 Danjuma Drive", "Trans Amadi", "Port Harcourt, Rivers State", "Nigeria"],
      phones: ["+234 208 465 2185", "+234 806 999 6568"],
    },
    {
      label: "United States",
      lines: ["Weltek Inc.", "4927 Bellmead Drive", "Missouri City, Texas 77459"],
      phones: ["+1 281 208 3592"],
    },
  ],
  stats: [
    { figure: `${yearsOfDelivery}`, label: "Years of delivery" },
    { figure: "100+", label: "Projects delivered" },
    { figure: "850+", label: "Wellhead control panels" },
    { figure: "HSE", label: "Governs every scope" },
  ],
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "HSE / Quality", href: "/hse-quality" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About Weltek", href: "/about" },
      { label: "HSE / Quality", href: "/hse-quality" },
      { label: "Careers", href: "/careers" },
      { label: "Vendors & Partners", href: "/vendors" },
    ],
  },
  {
    title: "Capabilities",
    items: [
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Industries", href: "/industries" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
