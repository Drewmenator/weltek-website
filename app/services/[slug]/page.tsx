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
        <Container className="py-14 lg:py-20">
          <Breadcrumb
            tone="onDark"
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <p
            className="overline animate-rise mt-7 flex items-center gap-3 text-bronze-soft"
            style={{ animationDelay: "40ms" }}
          >
            <span aria-hidden className="animate-line h-px w-8 bg-bronze" style={{ animationDelay: "140ms" }} />
            {service.sector}
          </p>
          <h1
            className="mt-4 max-w-3xl animate-rise text-balance text-[2rem] leading-[1.06] text-white sm:text-[2.7rem]"
            style={{ animationDelay: "120ms" }}
          >
            {service.title}
          </h1>
          <p
            className="mt-5 max-w-2xl animate-rise text-[1.08rem] leading-relaxed text-white/80"
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

      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="text-[1.5rem]">Our capability</h2>
            <p className="mt-4 leading-relaxed text-steel">{service.capability}</p>

            <h2 className="mt-10 text-[1.5rem]">Typical deliverables</h2>
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
              <h2 className="overline text-graphite">Industries served</h2>
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
            <h2 className="text-[1.5rem]">Related projects</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        )}
      </Container>

      <CTASection variant="navy" />
    </>
  );
}
