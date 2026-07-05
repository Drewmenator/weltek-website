import { Container } from "@/components/ui/Container";

// Named clients are cleared for public use (see docs/CONTENT-GAPS.md).
// Names only — client logos require separate trademark permission.
const clients = [
  "Shell / SNEPCo / SPDC",
  "Chevron",
  "ExxonMobil",
  "NPDC",
  "Energia",
  "NGC",
];

export function ClientsStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <Container className="py-10 lg:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          <p className="overline shrink-0 text-graphite lg:max-w-[9rem]">
            Delivered for Nigeria&rsquo;s major operators
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {clients.map((c, i) => (
              <li key={c} className="flex items-center gap-x-7">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="hidden h-4 w-px bg-border-strong sm:block"
                  />
                )}
                <span className="font-heading text-[1.05rem] font-semibold tracking-wide text-navy">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
