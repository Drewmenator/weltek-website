import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/CTASection";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { projects, projectFilters } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects | EPC, Power, Automation & Wellhead Control Panels",
  description:
    "Selected Weltek projects delivered for Shell, Chevron, ExxonMobil, NPDC, Energia and others across oil and gas, power, automation, instrumentation and brownfield rejuvenation in Nigeria.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Delivered for the operators working Nigerian fields"
        intro="A selection of Weltek's portfolio across oil and gas, power, automation and instrumentation. Client names are shown with permission."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <section className="bg-surface">
        <Container className="py-14 lg:py-20">
          <h2 className="sr-only">Project portfolio</h2>
          <ProjectsExplorer projects={projects} filters={projectFilters} />
        </Container>
      </section>

      <CTASection
        variant="light"
        heading="Planning similar work?"
        body="Talk to the team that delivered these projects. We will bring the same discipline to your scope, onshore, offshore or swamp."
      />
    </>
  );
}
