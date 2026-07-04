export const site = {
  name: "Weltek Limited",
  shortName: "Weltek",
  domain: "weltekng.com",
  url: "https://weltekng.com",
  tagline: "Engineering, Procurement and Construction",
  description:
    "Weltek Limited is a Nigerian Engineering, Procurement and Construction company with 30+ years delivering offshore topside facilities, brownfield rejuvenation, power systems, instrumentation and electrical, automation and wellhead control panels for the oil and gas, power and process industries.",
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
    { figure: "30+", label: "Years of experience" },
    { figure: "100+", label: "Projects delivered" },
    { figure: "850+", label: "Wellhead control panels" },
    { figure: "HSE", label: "Led delivery culture" },
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
