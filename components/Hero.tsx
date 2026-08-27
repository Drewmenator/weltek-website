import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const clients = [
  "Shell / SNEPCo / SPDC",
  "Chevron",
  "ExxonMobil",
  "NPDC",
  "Energia",
  "NGC",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/photos/hero-topside.webp"
          alt="Offshore topside facility, representative of Weltek's EPC delivery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/85 to-navy-900/45 lg:bg-gradient-to-r lg:from-navy-900 lg:via-navy-900/80 lg:to-navy-900/10" />
      </div>

      <Container className="safe-pt safe-pb relative flex min-h-viewport flex-col">
        <div className="flex flex-1 shrink-0 items-center pb-8 pt-28 lg:pt-32">
          <div className="max-w-2xl lg:max-w-[56%]">
            <p
              className="eyebrow animate-rise text-bronze-soft"
              style={{ animationDelay: "40ms" }}
            >
              Engineering · Procurement · Construction
            </p>
            <h1
              className="mt-6 text-balance animate-rise text-[2.5rem] leading-[1.02] text-white sm:text-[3.4rem] lg:text-display"
              style={{ animationDelay: "100ms" }}
            >
              Engineering, procurement and construction for critical energy assets.
            </h1>
            <p
              className="mt-6 max-w-xl animate-rise text-lead leading-relaxed text-white/75"
              style={{ animationDelay: "160ms" }}
            >
              Weltek delivers EPC, power systems, automation, instrumentation
              and brownfield services for oil and gas, power and industrial
              clients across Nigeria. Building and commissioning on producing
              plants since 1986.
            </p>
            <div
              className="mt-8 flex animate-rise flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <Button href="/services" variant="primary">
                Explore Our Capabilities
              </Button>
              <Button href="/contact" variant="secondary" tone="onDark">
                Speak With Our Team
              </Button>
            </div>
          </div>
        </div>

        {/* Client proof row */}
        <div
          className="relative animate-rise border-t border-white/15 py-5"
          style={{ animationDelay: "280ms" }}
        >
          <p className="eyebrow text-white/60">Project delivery for</p>
          <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
            {clients.map((c) => (
              <li
                key={c}
                className="text-sm font-medium tracking-wide text-white/70"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
