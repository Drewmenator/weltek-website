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
    <section className={cn(dark ? "bg-navy text-white" : "bg-surface-alt")}>
      <Container className="py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className={cn("text-[1.8rem] sm:text-[2.2rem]", dark && "text-white")}>
              {heading}
            </h2>
            <p
              className={cn(
                "mt-4 max-w-xl text-[1.05rem] leading-relaxed",
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
