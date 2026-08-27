import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { services, getService } from "@/content/services";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Weltek Nigeria`,
    description: service.intro,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = projects
    .filter((p) => p.relatedServices.includes(service.slug))
    .slice(0, 3);

  return (
    <>
      <section className="safe-px tech-grid relative border-b border-border-dark bg-navy-900 text-white">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
        <Container className="py-10 lg:py-14">
          <Breadcrumb
            tone="onDark"
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <p
            className="eyebrow animate-rise mt-7 text-bronze-soft"
            style={{ animationDelay: "40ms" }}
          >
            {service.sector}
          </p>
          <h1
            className="mt-4 max-w-3xl animate-rise text-balance text-[2rem] leading-[1.06] text-white sm:text-title"
            style={{ animationDelay: "120ms" }}
          >
            {service.title}
          </h1>
          <p
            className="mt-5 max-w-2xl animate-rise text-lead leading-relaxed text-white/80"
            style={{ animationDelay: "220ms" }}
          >
            {service.intro}
          </p>
        </Container>
      </section>

      <div className="relative aspect-[21/9] w-full border-b border-border">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="text-subsection">Our capability</h2>
            <p className="mt-4 leading-relaxed text-steel">{service.capability}</p>

            <h2 className="mt-10 text-subsection">Typical deliverables</h2>
            <ol className="mt-5 divide-y divide-border border-t border-border">
              {service.deliverables.map((d, i) => (
                <li key={d} className="flex gap-4 py-3.5 text-steel">
                  <span className="tnum shrink-0 font-heading text-sm font-bold text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-surface p-6 shadow-card lg:p-7">
              <h2 className="eyebrow text-graphite">Industries served</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.industries.map((ind) => (
                  <li
                    key={ind}
                    className="border border-border px-3 py-1.5 text-sm font-medium text-navy"
                  >
                    {ind}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-border pt-5">
                <h2 className="eyebrow text-graphite">Other capabilities</h2>
                <ul className="mt-2 divide-y divide-border">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group flex min-h-[44px] items-center justify-between gap-3 py-2 text-sm font-medium text-navy transition-colors hover:text-bronze"
                        >
                          {s.title}
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

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-bronze transition-colors hover:text-bronze-strong"
              >
                Discuss this capability
                <span aria-hidden>→</span>
              </Link>
            </div>
          </aside>
        </div>

        {relatedProjects.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="text-subsection">Related projects</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        )}
      </Container>

      <CTASection
        variant="navy"
        heading="Have a scope that needs delivering?"
        body="Tell us what you need engineered, built or commissioned. We will respond with the right capability and team."
      />
    </>
  );
}
