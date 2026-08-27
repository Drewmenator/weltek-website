import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamGrid } from "@/components/team/TeamGrid";

export function TeamSection() {
  return (
    <section className="border-t border-border bg-surface-alt">
      <Container className="py-16 lg:py-24">
        <SectionHeading
          eyebrow="Leadership & team"
          title="The people who deliver the work"
          intro="Weltek is run by engineers who have spent their careers on Nigerian projects, supported by discipline leads across engineering, projects, I&E and HSE. Select a profile to read more."
        />

        <TeamGrid />
      </Container>
    </section>
  );
}
