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
      <section className="safe-px border-b border-border-dark bg-navy text-white">
        <Container className="py-12 lg:py-16">
          <Breadcrumb
            tone="onDark"
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <p className="overline mt-6 text-gold">{service.sector}</p>
          <h1 className="mt-3 max-w-3xl text-[2rem] leading-[1.1] text-white sm:text-[2.6rem]">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-white/80">
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
            <ul className="mt-4 space-y-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-steel">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-bronze" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:border-l lg:border-border lg:pl-10">
            <h2 className="overline text-graphite">Industries served</h2>
            <ul className="mt-4 space-y-2">
              {service.industries.map((ind) => (
                <li key={ind} className="text-navy">
                  {ind}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/contact"
                className="text-sm font-semibold text-bronze hover:text-bronze-strong"
              >
                Discuss this capability →
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
