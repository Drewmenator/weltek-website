import Image from "next/image";
import { Container } from "@/components/ui/Container";

// Named clients are cleared for public use (see docs/CONTENT-GAPS.md).
// Logo/trademark usage is covered by separate written permission — confirm
// before adding any operator not already listed here.
//
// NPDC and NGC are NNPC subsidiaries and share the NNPC mark, so each carries
// a text label alongside it. Where a logo is the whole identifier, the name
// lives in the image's alt text instead.
const clients = [
  { name: "Shell / SNEPCo / SPDC", logo: "/images/clients/shell.png", width: 371 },
  { name: "Chevron", logo: "/images/clients/chevron.png", width: 86 },
  { name: "ExxonMobil", logo: "/images/clients/exxonmobil.png", width: 510 },
  { name: "NPDC", logo: "/images/clients/nnpc.png", width: 96, label: "NPDC" },
  { name: "NGC", logo: "/images/clients/nnpc.png", width: 96, label: "NGC" },
  { name: "Energia", logo: "/images/clients/energia.png", width: 221 },
  { name: "Total", logo: "/images/clients/total.png", width: 305 },
  { name: "GE", logo: "/images/clients/ge.png", width: 220 },
];

export function ClientsStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <Container className="py-10 lg:py-12">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-12">
          <p className="eyebrow shrink-0 text-graphite lg:max-w-[9rem]">
            Delivered for Nigeria&rsquo;s major operators
          </p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {clients.map((c) => (
              <li key={c.name} className="flex items-center gap-2">
                <Image
                  src={c.logo}
                  alt={c.label ? "" : c.name}
                  width={c.width}
                  height={96}
                  className="h-7 w-auto"
                />
                {c.label && (
                  <span className="font-heading text-[1.05rem] font-bold tracking-wide text-navy">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
