import Image from "next/image";
import Link from "next/link";
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

/** Lead tile first, so the grid has somewhere to start reading. */
const orderedServices = [...services].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
);


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

      {/* Proof before prose. A shortlisting buyer wants to know who already
          trusted us and at what scale before they read a word about us. */}
      <ClientsStrip />
      <StatStrip />

      {/* Who We Are */}
      <section className="bg-surface">
        <Container className="grid gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <Reveal>
            <p className="eyebrow text-bronze">Who we are</p>
            <h2 className="mt-3 text-[1.9rem] sm:text-section">
              An engineering-led EPC company built on three decades of field
              delivery.
            </h2>
            <p className="mt-5 text-body leading-relaxed text-steel">
              Weltek designs, builds and commissions industrial plants and
              infrastructure for the oil and gas, power generation,
              petrochemical and food and beverage industries. Our strength is
              execution on real facilities: topside skids, wellhead control
              panels, power systems and the instrumentation that runs them,
              delivered with a high degree of Nigerian local content.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                More about Weltek
              </Button>
            </div>
          </Reveal>
          {/* Captioned rather than decorative. Naming what the photograph
              actually shows turns it into evidence for the live-plant claim,
              which is the one thing this site is built to prove. */}
          <Reveal delay={80} className="relative min-h-[22rem] overflow-hidden border border-border lg:min-h-full">
            <Image
              src="/images/photos/weltek-panel-commissioning.webp"
              alt="Weltek engineer commissioning a control panel in the field"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 border-t-2 border-bronze bg-navy-900/92 p-4">
              <span className="eyebrow block text-bronze-soft">In the field</span>
              <span className="mt-1 block text-small text-white">
                Commissioning a control panel on a producing plant.
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Core Services */}
      <section className="border-t border-border bg-surface-alt">
        <Container className="py-16 lg:py-20">
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
            {orderedServices.map((service) => (
              <Reveal key={service.slug}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

        </Container>
      </section>

      {/* Featured Projects */}
      <section className="bg-surface">
        <Container className="py-16 lg:py-20">
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
          {/* One lead tile, two supporting. A row of three identical rectangles
              tells the reader nothing about where to start. */}
          <div className="mt-12 grid gap-6 md:grid-cols-3 md:grid-rows-2">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} className={i === 0 ? "md:col-span-2 md:row-span-2" : undefined}>
                <ProjectCard project={project} featured={i === 0} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* HSE / Quality */}
      <section className="tech-grid relative bg-navy-900 text-white">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
        <Container className="py-16 lg:py-20">
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
                  <h3 className="text-lead text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Compliance sits directly under HSE, where a buyer checking one is
          already looking for the other. It used to float near the top. */}
      <CredentialsStrip />

      {/* Industries. A compact row rather than a card grid: the sectors are
          already named in the hero, and each has its own page. */}
      <section className="border-t border-border bg-surface">
        <Container className="py-14">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-12">
            <div className="shrink-0 lg:max-w-[16rem]">
              <p className="eyebrow text-graphite">Sectors we serve</p>
              <p className="mt-2 text-sm leading-relaxed text-steel">
                The same engineering discipline and HSE culture, applied across
                energy and process industry.
              </p>
            </div>
            <ul className="grid flex-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries#${industry.slug}`}
                    className="group flex min-h-[44px] items-center justify-between gap-3 border-b border-border py-2 font-medium text-navy transition-colors hover:text-bronze"
                  >
                    {industry.name}
                    <span
                      aria-hidden
                      className="text-bronze opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
