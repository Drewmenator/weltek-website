import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function CTASection({
  heading = "Ready to discuss your next project?",
  body = "Send us your scope. We will respond with the right engineering and field team for the work, onshore, offshore or swamp.",
  variant = "navy",
}: {
  heading?: string;
  body?: string;
  variant?: "navy" | "light";
}) {
  const dark = variant === "navy";
  return (
    <section
      className={cn(
        "relative",
        dark ? "tech-grid bg-navy-900 text-white" : "bg-surface-alt"
      )}
    >
      {dark && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
      )}
      <Container className="py-16 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className={cn("text-[1.9rem] text-balance sm:text-section", dark && "text-white")}>
              {heading}
            </h2>
            <p
              className={cn(
                "mt-4 max-w-xl text-body leading-relaxed",
                dark ? "text-white/75" : "text-steel"
              )}
            >
              {body}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button href="/contact" variant="primary">
              Request a Proposal
            </Button>
            <Button
              href={site.capabilityStatement}
              download
              variant="secondary"
              tone={dark ? "onDark" : "onLight"}
            >
              Capability Statement
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
