import Image from "next/image";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";
import { CredentialsStrip } from "@/components/CredentialsStrip";
import { ClientsStrip } from "@/components/ClientsStrip";
import { CTASection } from "@/components/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Weltek Limited | EPC Company in Nigeria",
  description:
    "Weltek Limited is a Nigerian EPC company with 30+ years delivering offshore topside facilities, brownfield rejuvenation, power systems, instrumentation, automation and wellhead control panels.",
  alternates: { canonical: "/" },
};

const featuredProjects = projects.filter((p) => p.featured);

const whyWeltek = [
  {
    n: "01",
    title: "Live-plant and brownfield execution",
    body: "We modify producing facilities without shutting them down, using permit-to-work discipline and phased tie-ins.",
  },
  {
    n: "02",
    title: "In-house automation",
    body: "Design, programming, testing and commissioning stay under one roof, governed by an ISO 9001 based approach.",
  },
  {
    n: "03",
    title: "Instrumentation and electrical heritage",
    body: "I&E is where Weltek started. The team that engineers a system installs and commissions it.",
  },
  {
    n: "04",
    title: "HSE-led delivery",
    body: "Safety governs how work is planned and executed, offshore, on land and in the swamp.",
  },
  {
    n: "05",
    title: "Deep Nigerian operating experience",
    body: "Three decades of delivery for the operators working Nigerian fields, with strong local content.",
  },
  {
    n: "06",
    title: "A proven record",
    body: "100+ projects and 850+ wellhead control panels delivered for Shell, Chevron, ExxonMobil, NPDC and Energia.",
  },
];

const hsePillars = [
  {
    title: "Safe live-plant modification",
    body: "Permit-to-work, isolation and phased execution keep people safe while facilities stay in production.",
  },
  {
    title: "Quality management discipline",
    body: "An ISO 9001 based QMS keeps configuration, testing and documentation consistent across projects.",
  },
  {
    title: "Competency and training",
    body: "Field teams are trained and assessed for the offshore, land and swamp environments they work in.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <StatStrip />
      <CredentialsStrip />

      {/* Who We Are */}
      <section className="bg-surface">
        <Container className="grid gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <Reveal>
            <p className="overline text-bronze">Who we are</p>
            <h2 className="mt-3 text-[1.7rem] sm:text-[2.1rem]">
              An engineering-led EPC company built on three decades of field
              delivery.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-steel">
              Weltek is an Engineering, Procurement and Construction company
              serving the oil and gas, power generation, petrochemical and food
              and beverage industries. We design, build and commission
              industrial plants and infrastructure using current technology and
              experienced people.
            </p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-steel">
              Our strength is execution on real facilities. From topside skids
              and wellhead control panels to power systems and the
              instrumentation that runs them, we deliver work that has to
              perform in the field, with a high degree of Nigerian local
              content.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                More about Weltek
              </Button>
            </div>
          </Reveal>
          <Reveal delay={80} className="relative min-h-[20rem] overflow-hidden border border-border lg:min-h-full">
            <Image
              src="/images/about-plant.svg"
              alt="Weltek engineers commissioning a control system on a process plant"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </Reveal>
        </Container>
      </section>

      {/* Core Services */}
      <section className="border-t border-border bg-surface-alt">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="What we do"
              title="Six capabilities, delivered end to end"
              intro="Engineering, procurement, fabrication and commissioning under one roof, so a scope is delivered by the team that designed it."
            />
            <Button href="/services" variant="ghost" className="shrink-0">
              All services →
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <ServiceCard service={service} featured={service.featured} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="bg-surface">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects delivered for Nigeria's major operators"
              intro="A sample of Weltek's portfolio across oil and gas, power and automation."
            />
            <Button href="/projects" variant="ghost" className="shrink-0">
              All projects →
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Clients & operators */}
      <ClientsStrip />

      {/* HSE / Quality */}
      <section className="tech-grid relative bg-navy-900 text-white">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="HSE &amp; Quality"
                tone="onDark"
                title="Safety is how we execute, not a box we tick"
                intro="On a producing plant, safety and quality are the difference between a job that finishes and one that stops. They are built into how Weltek plans and runs every scope."
              />
              <div className="mt-8">
                <Button href="/hse-quality" variant="secondary" tone="onDark">
                  Our HSE approach
                </Button>
              </div>
            </div>
            <div className="grid gap-px overflow-hidden border border-border-dark bg-border-dark sm:grid-cols-1">
              {hsePillars.map((pillar) => (
                <div key={pillar.title} className="bg-navy p-6 lg:p-8">
                  <h3 className="text-[1.15rem] text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="border-t border-border bg-surface-alt">
        <Container className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="Industries"
            title="Sectors we serve"
            intro="The same engineering discipline and HSE culture, applied across energy and process industry."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {industries.map((industry, i) => (
              <IndustryCard
                key={industry.slug}
                industry={industry}
                className={i === 0 ? "col-span-2 lg:col-span-1" : ""}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Why Weltek */}
      <section className="bg-surface">
        <Container className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="Why Weltek"
            title="What sets our delivery apart"
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyWeltek.map((item) => (
              <Reveal key={item.n} className="border-t border-border pt-5">
                <p className="tnum font-heading text-[1.5rem] font-bold text-bronze">
                  {item.n}
                </p>
                <h3 className="mt-2 text-[1.15rem] text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
