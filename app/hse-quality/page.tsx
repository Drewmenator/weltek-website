import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { credentials } from "@/content/credentials";

export const metadata: Metadata = {
  title: "HSE & Quality | Safety-Led EPC Delivery in Nigeria",
  description:
    "Safe live-plant execution, permit-to-work discipline, an ISO 9001 based quality system and the certifications operators check when shortlisting.",
  alternates: { canonical: "/hse-quality" },
};

const practices = [
  {
    title: "Safety culture",
    body: "Management commits to the highest health and safety standards across engineering, procurement and construction, reviewed annually with employees and clients. The aim is to eliminate hazards and reduce risk to as low as reasonably practicable.",
  },
  {
    title: "Quality management",
    body: "Our quality management system fulfils applicable contractual, statutory and regulatory requirements. Quality objectives are set at each process level and reviewed periodically, with an ISO 9001 based approach to configuration, testing and documentation.",
  },
  {
    title: "Field execution procedures",
    body: "On producing facilities we work to permit-to-work, isolation and phased tie-in procedures, so modifications happen without putting people or production at risk.",
  },
  {
    title: "Risk management",
    body: "Hazards are identified and controlled before work starts. Job safety analysis and method statements govern how field teams execute each task.",
  },
  {
    title: "Competency & training",
    body: "Field teams are trained and assessed for the offshore, land and swamp environments they work in, so competency is matched to the hazard.",
  },
  {
    title: "Client confidence",
    body: "For operators, HSE and quality are shortlisting criteria. Weltek's record of safe live-plant delivery is part of why clients return.",
  },
];

export default function HsePage() {
  return (
    <>
      <PageHeader
        eyebrow="HSE & Quality"
        title="Safety is how we execute, not a box we tick"
        intro="On a producing plant, health, safety and quality are the difference between a job that finishes and one that stops. They are built into how Weltek plans and runs every scope of work."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "HSE / Quality" }]}
      />

      <section className="bg-surface">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {practices.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 2) * 90}
                className="border-t-2 border-bronze pt-5"
              >
                <h2 className="text-subsection text-navy">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-steel">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="border-t border-border bg-surface-alt">
        <Container className="py-16 lg:py-24">
          <SectionHeading
            eyebrow="Standards & certifications"
            title="Credentials that support shortlisting"
            intro="Contact us for current copies of our registrations and certificates."
          />
          <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((c) => (
              <li key={c.label} className="border border-border bg-surface p-6">
                <p className="font-heading text-lead font-bold text-navy">
                  {c.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-steel">{c.detail}</p>
                {!c.confirm && c.refNumber && (
                  <p className="mt-3 text-micro font-semibold uppercase tracking-wide text-bronze">
                    {c.refNumber}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        variant="navy"
        heading="Deliver your next scope safely"
        body="Send us your scope. We will plan and execute it with the same HSE discipline, offshore, on land or in the swamp."
      />
    </>
  );
}
