import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { team, teamGroups } from "@/content/team";

export function TeamSection() {
  const pendingAssets = team.some((m) => !m.photo || !m.bio);

  return (
    <section className="border-t border-border bg-surface-alt">
      <Container className="py-16 lg:py-24">
        <SectionHeading
          eyebrow="Leadership & team"
          title="The people who deliver the work"
          intro="Weltek is run by engineers who have spent their careers on Nigerian projects, supported by discipline leads across engineering, projects, I&E and HSE."
        />

        {teamGroups.map((group) => {
          const members = team.filter((m) => m.group === group);
          if (members.length === 0) return null;
          return (
            <div key={group} className="mt-12">
              <h3 className="overline text-graphite">{group}</h3>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {members.map((member, i) => (
                  <TeamMemberCard key={`${group}-${i}`} member={member} />
                ))}
              </div>
            </div>
          );
        })}

        {pendingAssets && (
          <p className="mt-10 rounded-[4px] border border-dashed border-border bg-surface p-4 text-sm text-graphite">
            [CONFIRM] Headshots and short bios still to be added. Names and titles
            are confirmed; drop photos into{" "}
            <code className="text-navy">public/images/team/</code> and bios into{" "}
            <code className="text-navy">content/team.ts</code>.
          </p>
        )}
      </Container>
    </section>
  );
}
