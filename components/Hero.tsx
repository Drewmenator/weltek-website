import Image from "next/image";
import Link from "next/link";
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

const film = {
  href: "/about",
  label: "Watch the Weltek company documentary",
  poster: "/images/photos/about-plant.webp",
  eyebrow: "Company film",
  title: "Watch the Weltek story",
  caption: "Three decades of delivery on Nigerian fields",
};

function PlayIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

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
        <div className="flex flex-1 shrink-0 items-center justify-between gap-12 pb-8 pt-28 lg:pt-32">
          <div className="max-w-2xl lg:max-w-[56%]">
            <p
              className="eyebrow animate-rise text-bronze-soft"
              style={{ animationDelay: "40ms" }}
            >
              Engineering · Procurement · Construction
            </p>
            <h1
              className="mt-6 text-balance animate-rise text-[2.5rem] leading-[1.02] text-white sm:text-[3.2rem] lg:text-[3.75rem]"
              style={{ animationDelay: "120ms" }}
            >
              Engineering, procurement and construction for critical energy assets.
            </h1>
            <p
              className="mt-6 max-w-xl animate-rise text-[1.075rem] leading-relaxed text-white/75"
              style={{ animationDelay: "220ms" }}
            >
              Weltek delivers EPC, power systems, automation, instrumentation
              and brownfield services for oil and gas, power and industrial
              clients across Nigeria. Thirty years of building and commissioning
              on producing plants.
            </p>
            <div
              className="mt-8 flex animate-rise flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "320ms" }}
            >
              <Button href="/services" variant="primary">
                Explore Our Capabilities
              </Button>
              <Button href="/contact" variant="secondary" tone="onDark">
                Speak With Our Team
              </Button>
            </div>

            {/* Compact film card — stacks under the copy below lg. */}
            <Link
              href={film.href}
              aria-label={film.label}
              className="group mt-5 flex animate-rise items-center gap-3 border border-white/20 bg-navy-900/40 p-2.5 lg:hidden"
              style={{ animationDelay: "380ms" }}
            >
              <span className="relative block h-14 w-14 shrink-0 overflow-hidden">
                <Image
                  src={film.poster}
                  alt=""
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
                <span aria-hidden className="absolute inset-0 bg-navy-900/30" />
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bronze text-white transition-colors group-hover:bg-bronze-strong">
                    <PlayIcon className="ml-0.5 h-3.5 w-3.5" />
                  </span>
                </span>
              </span>
              <span className="min-w-0">
                <span className="eyebrow block text-[0.6rem] text-bronze-soft">
                  {film.eyebrow}
                </span>
                <span className="mt-0.5 block truncate text-sm font-semibold text-white">
                  {film.title}
                </span>
              </span>
            </Link>
          </div>

          {/* Full film card — sits beside the copy from lg up. */}
          <Link
            href={film.href}
            aria-label={film.label}
            className="group hidden w-72 shrink-0 animate-rise lg:block xl:w-80"
            style={{ animationDelay: "420ms" }}
          >
            <span className="relative block aspect-video overflow-hidden border border-white/25">
              <Image
                src={film.poster}
                alt=""
                width={1024}
                height={576}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-navy-900/25 transition-colors group-hover:bg-navy-900/10"
              />
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bronze text-white shadow-panel transition-[background-color,transform] duration-200 group-hover:scale-105 group-hover:bg-bronze-strong"
              >
                <PlayIcon className="ml-0.5 h-5 w-5" />
              </span>
            </span>
            <span className="block border border-t-0 border-white/15 bg-navy-900/70 p-3.5">
              <span className="eyebrow block text-[0.62rem] text-bronze-soft">
                {film.eyebrow}
              </span>
              <span className="mt-1 block text-sm font-semibold text-white">
                {film.title}
              </span>
              <span className="mt-0.5 block text-xs text-white/60">
                {film.caption}
              </span>
            </span>
          </Link>
        </div>

        {/* Client proof row */}
        <div
          className="relative animate-rise border-t border-white/15 py-5"
          style={{ animationDelay: "440ms" }}
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
