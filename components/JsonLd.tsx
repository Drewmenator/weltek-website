import { site } from "@/lib/site";

/**
 * Organization structured data. Rendered once in the root layout.
 * Uses real Weltek contact data; some fields flagged for confirmation.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: "Weltek Limited",
    url: site.url,
    logo: `${site.url}/images/og-default.svg`,
    description: site.description,
    email: site.email,
    sameAs: [site.linkedin],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 307 Danjuma Drive, Trans Amadi",
      addressLocality: "Port Harcourt",
      addressRegion: "Rivers State",
      addressCountry: "NG",
    },
    contactPoint: site.offices.map((o) => ({
      "@type": "ContactPoint",
      contactType: o.label,
      telephone: o.phones[0],
      areaServed: o.label.includes("United States") ? "US" : "NG",
    })),
    knowsAbout: [
      "Engineering Procurement and Construction",
      "Offshore Topside Facilities",
      "Wellhead Control Panels",
      "Instrumentation and Electrical",
      "Power Systems",
      "Automation",
      "Brownfield Rejuvenation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data must be raw JSON in the DOM.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
