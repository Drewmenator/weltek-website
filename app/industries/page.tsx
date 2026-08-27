import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/CTASection";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries | Oil & Gas, Power, Petrochemicals, Food & Beverage",
  description:
    "How Weltek supports oil and gas, power generation, petrochemicals, food and beverage, and broader industrial facilities across Nigeria with EPC, I&E, power and automation capability.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Sectors we serve"
        intro="The same engineering discipline and HSE culture, applied across energy and process industry in Nigeria and beyond."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />

      <section className="bg-surface">
        <Container className="py-8 lg:py-12">
          {industries.map((industry, i) => (
            <article
              key={industry.slug}
              id={industry.slug}
              className="grid scroll-mt-24 items-center gap-8 border-b border-border py-12 last:border-b-0 lg:grid-cols-2 lg:gap-16 lg:py-16"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[16/10] overflow-hidden border border-border">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="text-[1.9rem] sm:text-section">{industry.name}</h2>
                <p className="mt-4 text-body leading-relaxed text-steel">
                  {industry.detail}
                </p>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <CTASection
        variant="navy"
        heading="Working in one of these sectors?"
        body="Send us your scope. We will respond with the right engineering and field team for your industry."
      />
    </>
  );
}
