import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { site } from "@/lib/site";

export function StatStrip() {
  return (
    <section className="tech-grid relative bg-navy text-white">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
      <Container>
        <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-navy px-3 py-9 text-center lg:py-12"
            >
              <CountUp
                value={stat.figure}
                className="tnum block font-heading text-[2.6rem] font-bold leading-none text-gold lg:text-[3rem]"
              />
              <p className="mt-3 text-micro uppercase tracking-[0.08em] text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
