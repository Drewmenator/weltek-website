import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Vendors & Partners | Supplier Registration",
  description:
    "Register as a Weltek vendor or partner. Submit your company details and our procurement team will follow up on supplier onboarding.",
  alternates: { canonical: "/vendors" },
};

const steps = [
  {
    n: "01",
    title: "Register your interest",
    body: "Send your company details and supply category using the form. Tell us what you provide and where you operate.",
  },
  {
    n: "02",
    title: "Compliance review",
    body: "We review capability, quality and HSE compliance, and Nigerian local content standing.",
  },
  {
    n: "03",
    title: "Onboarding",
    body: "Approved vendors are added to our supplier database and considered against project requirements.",
  },
];

export default function VendorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vendors & Partners"
        title="Supply to Weltek projects"
        intro="We work with suppliers and partners who meet our quality, HSE and local content standards. Register below to be considered for upcoming project requirements."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Vendors & Partners" }]}
      />

      <section className="bg-surface">
        <Container className="py-16 lg:py-24">
          <SectionHeading eyebrow="How it works" title="Becoming a vendor" />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-border pt-5">
                <p className="tnum font-heading text-subsection font-bold text-bronze">
                  {s.n}
                </p>
                <h3 className="mt-2 text-lead text-navy">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-steel">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-alt">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Registration"
                title="Register as a vendor or partner"
                intro="Complete the form and our procurement team will follow up. Supplier compliance documents will be requested during onboarding."
              />
            </div>
            <div>
              <ContactForm variant="vendor" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
