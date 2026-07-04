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
      <dt className="overline text-graphite">{label}</dt>
      <dd className="mt-1 text-[0.95rem] font-medium text-navy">{value}</dd>
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
      <section className="safe-px border-b border-border-dark bg-navy text-white">
        <Container className="py-12 lg:py-16">
          <Breadcrumb
            tone="onDark"
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
          />
          <p className="overline mt-6 text-gold">{project.serviceType}</p>
          <h1 className="mt-3 max-w-3xl text-[1.9rem] leading-[1.1] text-white sm:text-[2.4rem]">
            {project.title}
          </h1>
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

      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* Facts rail */}
          <aside className="lg:border-r lg:border-border lg:pr-10">
            <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
              <Field label="Client" value={project.client} />
              <Field label="Location" value={project.location} />
              <Field label="Sector" value={project.sector} />
              <Field label="Service category" value={project.serviceType} />
            </dl>
          </aside>

          {/* Body */}
          <div className="max-w-2xl">
            <section>
              <h2 className="text-[1.4rem]">The challenge</h2>
              <p className="mt-3 leading-relaxed text-steel">{project.challenge}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-[1.4rem]">Scope of work</h2>
              <ul className="mt-4 space-y-2">
                {project.work.map((w) => (
                  <li key={w} className="flex gap-3 text-steel">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-bronze" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-[1.4rem]">Weltek&rsquo;s role</h2>
              <p className="mt-3 leading-relaxed text-steel">{project.role}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-[1.4rem]">Execution highlights</h2>
              <ul className="mt-4 space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-steel">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-bronze" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 border-l-2 border-bronze bg-surface-alt p-5">
              <h2 className="text-[1.1rem]">HSE &amp; quality</h2>
              <p className="mt-2 text-sm leading-relaxed text-steel">{project.hseNote}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-[1.4rem]">Outcome</h2>
              <p className="mt-3 leading-relaxed text-steel">{project.outcome}</p>
            </section>

            {related.length > 0 && (
              <section className="mt-10 border-t border-border pt-8">
                <h2 className="overline text-graphite">Related services</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {related.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="border border-border px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-bronze hover:text-bronze"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </Container>

      <CTASection variant="light" />
    </>
  );
}
