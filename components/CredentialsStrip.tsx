import { Container } from "@/components/ui/Container";
import { credentials } from "@/content/credentials";
import { cn } from "@/lib/cn";

export function CredentialsStrip({ className }: { className?: string }) {
  return (
    <section className={cn("border-y border-border bg-surface-alt", className)}>
      <Container className="py-10">
        <p className="overline text-graphite">Compliance &amp; Certifications</p>
        <ul className="mt-6 flex snap-x gap-x-10 gap-y-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
          {credentials.map((c) => (
            <li
              key={c.label}
              className="min-w-[8.5rem] shrink-0 snap-start border-t-2 border-bronze pt-3 lg:min-w-0"
            >
              <p className="font-heading text-[1.05rem] font-bold text-navy">
                {c.label}
              </p>
              <p className="mt-1 text-xs leading-snug text-graphite">{c.detail}</p>
              {c.confirm ? (
                <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-wide text-bronze">
                  Reg. no. to confirm
                </p>
              ) : (
                c.refNumber && (
                  <p className="mt-2 text-[0.7rem] font-semibold text-steel">
                    {c.refNumber}
                  </p>
                )
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-graphite">
          Registration and certification numbers are being confirmed for
          publication. Contact us for current certificates.
        </p>
      </Container>
    </section>
  );
}
