import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import type { Project } from "@/content/projects";
import { getService } from "@/content/services";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-graphite">{label}</dt>
      <dd className="mt-1 text-small font-medium text-navy">{value}</dd>
    </div>
  );
}

export function CaseStudyTemplate({ project }: { project: Project }) {
  const related = project.relatedServices
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      {/* Header */}
      <section className="safe-px tech-grid relative border-b border-border-dark bg-navy-900 text-white">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
        <Container className="py-14 lg:py-20">
          <Breadcrumb
            tone="onDark"
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
          />
          <p
            className="eyebrow animate-rise mt-7 text-bronze-soft"
            style={{ animationDelay: "40ms" }}
          >
            {project.serviceType}
          </p>
          <h1
            className="mt-4 max-w-3xl animate-rise text-balance text-[2rem] leading-[1.08] text-white sm:text-title"
            style={{ animationDelay: "120ms" }}
          >
            {project.title}
          </h1>
          <p
            className="mt-5 max-w-2xl animate-rise text-lead leading-relaxed text-white/80"
            style={{ animationDelay: "220ms" }}
          >
            Delivered for {project.client}.
          </p>
        </Container>
      </section>

      {/* Image */}
      <div className="relative aspect-[21/9] w-full border-b border-border">
        <Image
          src={project.image}
          alt={`${project.title} for ${project.client}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container className="py-16 lg:py-24">
        {/* Narrative leads; the facts rail follows it in source order so the
            story is what a reader (and a crawler) meets first. */}
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <section>
              <h2 className="text-subsection">The challenge</h2>
              <p className="mt-3 leading-relaxed text-steel">{project.challenge}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-subsection">Scope of work</h2>
              <ol className="mt-5 divide-y divide-border border-t border-border">
                {project.work.map((w, i) => (
                  <li key={w} className="flex gap-4 py-3.5 text-steel">
                    <span className="tnum shrink-0 font-heading text-sm font-bold text-bronze">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{w}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10">
              <h2 className="text-subsection">Weltek&rsquo;s role</h2>
              <p className="mt-3 leading-relaxed text-steel">{project.role}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-subsection">Execution highlights</h2>
              <ul className="mt-4 space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-steel">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-bronze" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* HSE note and outcome render only once Weltek confirms them. */}
            {project.hseNote && (
              <section className="mt-10 border-l-2 border-bronze bg-surface-alt p-5">
                <h2 className="text-card">HSE &amp; quality</h2>
                <p className="mt-2 text-sm leading-relaxed text-steel">
                  {project.hseNote}
                </p>
              </section>
            )}

            {project.outcome && (
              <section className="mt-10 border border-border bg-surface-alt p-6 shadow-card">
                <h2 className="eyebrow text-bronze">Outcome</h2>
                <p className="mt-2 leading-relaxed text-navy">{project.outcome}</p>
              </section>
            )}
          </div>

          {/* Facts rail */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-surface p-6 shadow-card">
              <p className="eyebrow text-graphite">Project facts</p>
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1">
                <Field label="Client" value={project.client} />
                {project.location && (
                  <Field label="Location" value={project.location} />
                )}
                <Field label="Sector" value={project.sector} />
                <Field label="Service category" value={project.serviceType} />
              </dl>

              {related.length > 0 && (
                <div className="mt-6 border-t border-border pt-5">
                  <p className="eyebrow text-graphite">Related services</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {related.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="border border-border px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:border-bronze hover:text-bronze"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-bronze transition-colors hover:text-bronze-strong"
              >
                Discuss a similar scope
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </Container>

      <CTASection
        variant="light"
        heading="Planning similar work?"
        body="Talk to the team that delivered this project. We will bring the same discipline to your scope, onshore, offshore or swamp."
      />
    </>
  );
}
