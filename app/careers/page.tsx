import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Careers | Engineering, Project, Field & HSE Roles",
  description:
    "Engineering, project, field and HSE roles at Weltek. Send your details and we will contact you when a suitable position opens.",
  alternates: { canonical: "/careers" },
};

const roleFamilies = [
  { title: "Engineering", body: "Process, instrumentation, electrical, mechanical and civil engineers." },
  { title: "Project management", body: "Planners, project engineers and controls professionals." },
  { title: "Procurement", body: "Buyers and supply-chain specialists sourcing to project schedule." },
  { title: "Field & construction", body: "Supervisors, technicians and crews for offshore, land and swamp." },
  { title: "Instrumentation & electrical", body: "I&E technicians and engineers, the core of our heritage." },
  { title: "Automation", body: "Controls and SCADA engineers across the full project cycle." },
  { title: "HSE", body: "Safety officers and advisors who keep live-plant work safe." },
  { title: "Administration", body: "Finance, HR and operations support for the business." },
];

const reasons = [
  {
    title: "Real project exposure",
    body: "Work on live facilities for Nigeria's major operators, not just on paper.",
  },
  {
    title: "End-to-end delivery",
    body: "Engineer, build and commission under one roof, and see your work run.",
  },
  {
    title: "A safety-led culture",
    body: "HSE is genuinely how we operate, so you go home safe every day.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build things that have to work in the field"
        intro="Weltek hires engineers, project professionals and field crews who want to deliver real EPC work to a high standard, safely."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      {/* Why work with Weltek */}
      <section className="bg-surface">
        <Container className="py-16 lg:py-24">
          <SectionHeading eyebrow="Why Weltek" title="Why work with us" />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="border-t-2 border-bronze pt-5">
                <h3 className="text-lead text-navy">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-steel">{r.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Role families */}
      <section className="border-t border-border bg-surface-alt">
        <Container className="py-16 lg:py-24">
          <SectionHeading eyebrow="Where you fit" title="Role families" />
          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {roleFamilies.map((rf) => (
              <div key={rf.title} className="border border-border bg-surface p-5">
                <h3 className="text-body text-navy">{rf.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{rf.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Openings + talent submission */}
      <section className="bg-surface">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Current openings"
                title="Submit your details for future roles"
                intro="There are no published vacancies at the moment. Send your details and role family, and we will contact you when a suitable position opens."
              />
            </div>
            <div>
              <ContactForm variant="careers" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
