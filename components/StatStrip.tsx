import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function StatStrip() {
  return (
    <section className="bg-navy-800 text-white">
      <Container className="grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
        {site.stats.map((stat) => (
          <div
            key={stat.label}
            className="relative px-2 py-8 text-center lg:py-10"
          >
            <p className="tnum font-heading text-[2.4rem] font-bold leading-none text-gold lg:text-[2.75rem]">
              {stat.figure}
            </p>
            <p className="mt-2 text-sm text-white/70">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
