import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="safe-px tech-grid relative border-b border-border-dark bg-navy-900 text-white">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
      <Container className="py-16 lg:py-24">
        {breadcrumb && (
          <div className="mb-7">
            <Breadcrumb items={breadcrumb} tone="onDark" />
          </div>
        )}
        {eyebrow && (
          <p
            className="eyebrow animate-rise text-bronze-soft"
            style={{ animationDelay: "40ms" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="mt-4 max-w-3xl text-balance animate-rise text-[2.1rem] leading-[1.06] text-white sm:text-[2.75rem]"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="mt-5 max-w-2xl animate-rise text-[1.08rem] leading-relaxed text-white/80"
            style={{ animationDelay: "220ms" }}
          >
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
