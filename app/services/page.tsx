import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services | Offshore, Power, I&E, Automation & Wellhead Control Panels",
  description:
    "Weltek's six EPC capabilities: offshore topside facilities, onshore and swamp brownfield rejuvenation, power systems, instrumentation and electrical, automation, and wellhead control panels.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Six capabilities, delivered end to end"
        intro="Engineering, procurement, fabrication, installation and commissioning under one roof. Each capability is backed by field experience across offshore, land and swamp locations."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="bg-surface-alt">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 80}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection variant="navy" />
    </>
  );
}
