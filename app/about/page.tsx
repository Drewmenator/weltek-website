import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { StatStrip } from "@/components/StatStrip";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TeamSection } from "@/components/team/TeamSection";

export const metadata: Metadata = {
  title: "About Weltek | EPC Company in Nigeria",
  description:
    "Weltek Limited is a Nigerian EPC company with 30+ years and 100+ projects delivered for the oil and gas, power and process industries, built on instrumentation and electrical heritage and an HSE-led culture.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Quality",
    body: "We deliver to a global standard and stand behind the work. Quality is designed in, tested, and documented.",
  },
  {
    title: "Safety",
    body: "Safety governs how every scope is planned and run. On a live plant, it is the difference between finishing and stopping.",
  },
  {
    title: "Local content",
    body: "We build Nigerian capability, using local people and suppliers while delivering to international standards.",
  },
  {
    title: "Reliability",
    body: "Operators return to Weltek because the work performs and the schedule holds. A proven record earns the next project.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Weltek"
        title="An engineering-led EPC company, thirty years in the field."
        intro="Weltek Limited designs, builds and commissions industrial plants and infrastructure for the oil and gas, power generation, petrochemical and food and beverage industries, from Nigerian roots to a global standard."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="bg-surface">
        <Container className="grid gap-12 py-16 lg:grid-cols-[2fr_1fr] lg:gap-16 lg:py-24">
          <div className="max-w-2xl">
            <h2 className="text-[1.6rem] sm:text-[2rem]">Who we are</h2>
            <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-steel">
              <p>
                Weltek is an Engineering, Procurement and Construction company
                that provides specialised services to the oil and gas, power
                generation, petrochemical and food and beverage industries. Over
                more than thirty years we have delivered upstream and infrastructure
                work across offshore, land and swamp locations.
              </p>
              <p>
                Our roots are in instrumentation and electrical engineering. That
                heritage still shapes how we work: the team that engineers a
                system installs and commissions it, so accountability runs from
                design through to start-up. Around that core we have built
                topside fabrication, wellhead control panels, power systems and
                in-house automation.
              </p>
              <p>
                We combine engineering expertise across disciplines with
                procurement leverage through global supplier networks and
                flexible execution models. The result is reliable, cost-effective
                delivery with a high degree of Nigerian local content.
              </p>
            </div>
          </div>
          <div className="space-y-8 lg:border-l lg:border-border lg:pl-10">
            <div>
              <h3 className="overline text-bronze">Our mission</h3>
              <p className="mt-2 leading-relaxed text-navy">
                To design, build and operate industrial plants and infrastructure
                using current technology and high-calibre people.
              </p>
            </div>
            <div>
              <h3 className="overline text-bronze">Our vision</h3>
              <p className="mt-2 leading-relaxed text-navy">
                To be a leading EPC company in Nigerian oil and gas, refining,
                petrochemical, power, water, food and beverage and other
                industries, for the benefit of society.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <StatStrip />

      {/* Values */}
      <section className="border-t border-border bg-surface-alt">
        <Container className="py-16 lg:py-24">
          <SectionHeading
            eyebrow="What we value"
            title="The principles behind the work"
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={(i % 2) * 90}
                className="border-t border-border pt-5"
              >
                <h3 className="text-[1.2rem] text-navy">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-steel">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership & team */}
      <TeamSection />

      <CTASection
        heading="Work with a team that has delivered for three decades"
        body="Tell us about your scope. We will bring the right engineering and field capability to it."
      />
    </>
  );
}
