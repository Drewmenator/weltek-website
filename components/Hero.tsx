import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {/* Industrial photography (placeholder). Bleeds off the right on desktop. */}
      <div className="absolute inset-0 lg:left-[42%]">
        <Image
          src="/images/hero-topside.svg"
          alt="Weltek field engineers on an offshore topside facility"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        {/* Navy scrim so headline stays legible on any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20 lg:bg-gradient-to-r lg:from-navy lg:via-navy/85 lg:to-transparent" />
      </div>

      <Container className="relative flex h-dvh flex-col justify-end pb-16 pt-28 safe-pt sm:justify-center lg:min-h-0 lg:py-32">
        <div className="max-w-xl lg:max-w-[46%]">
          <p className="overline text-gold">Engineering · Procurement · Construction</p>
          <h1 className="mt-5 text-[2.4rem] leading-[1.04] sm:text-[3rem] lg:text-[3.4rem] text-white">
            Live-plant EPC execution for Nigeria&rsquo;s energy sector.
          </h1>
          <p className="mt-6 max-w-lg text-[1.1rem] leading-relaxed text-white/80">
            Thirty years of offshore, onshore and swamp delivery. Topside
            facilities, wellhead control panels, power systems and the
            instrumentation that ties them together, built and commissioned by
            teams who work on producing plants.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/services" variant="primary">
              Explore Our Capabilities
            </Button>
            <Button href="/contact" variant="secondary" tone="onDark">
              Speak With Our Team
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
