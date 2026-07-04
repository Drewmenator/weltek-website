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
    <section className="safe-px border-b border-border-dark bg-navy text-white">
      <Container className="py-14 lg:py-20">
        {breadcrumb && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumb} tone="onDark" />
          </div>
        )}
        {eyebrow && <p className="overline text-gold">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-[2rem] leading-[1.08] text-white sm:text-[2.6rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-white/80">
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
