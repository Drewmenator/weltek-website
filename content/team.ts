export type TeamGroup = string;

export type TeamMember = {
  /** Full name, no honorific (initials are derived from this). */
  name: string;
  /** Optional honorific shown before the name, e.g. "Mr" / "Mrs" / "Engr". */
  honorific?: string;
  /** Role / job title. */
  title: string;
  /** Grouping heading. Order of first appearance sets the section order. */
  group: TeamGroup;
  /** 1-3 sentence profile. Leave "" to omit until supplied. */
  bio?: string;
  /** Path under /public, e.g. "/images/team/pedro-egbe.jpg". Omit for initials. */
  photo?: string;
};

/**
 * Leadership and senior management.
 *
 * TO FINISH THESE PROFILES
 * 1. Add a short `bio` (1-3 sentences) per person.
 * 2. Add a headshot to /public/images/team/ and set `photo` to its path.
 *    Portraits look best at roughly 4:5 (e.g. 800x1000).
 * Add/remove people or groups here; the About page updates automatically.
 */
export const team: TeamMember[] = [
  {
    name: "Pedro Egbe",
    honorific: "Mr",
    title: "Managing Director",
    group: "Executive Leadership",
    bio: "Pedro founded Weltek in 1986 and has led it since. He began his career in 1974 with Flopetrol Schlumberger, supervising wireline, well testing and flowstation production services, and his expertise spans mechanical, electrical, instrumentation and control systems integration. A past chairman of the Petroleum Technology Association of Nigeria (PETAN), he helped drive the Nigerian Content Act into law, and holds a BSc in Industrial Technology from the University of Southwestern Louisiana and an MBA from the University of Port Harcourt.",
    photo: "/images/team/pedro-egbe.webp",
  },
  {
    name: "Igweka Uche",
    honorific: "Mr",
    title: "Executive Director",
    group: "Executive Leadership",
    bio: "",
  },
  {
    name: "Sakenim Esiri",
    honorific: "Mrs",
    title: "General Manager, Finance & Operations",
    group: "General Management",
    bio: "Sakenim is a finance and operations executive with over a decade in the engineering, procurement and construction sector, pairing deep financial expertise with hands-on leadership. As General Manager, Finance & Operations, she oversees budgeting, internal controls, risk management, compliance and team development, and has led systems upgrades, governance improvements and operational restructuring focused on sustainable growth. Known for integrity, analytical rigour and composure under pressure, she turns complex financial insight into clear strategic action.",
    photo: "/images/team/sakenim-esiri.png",
  },
  {
    name: "Peter Egwegbete",
    honorific: "Mr",
    title: "General Manager, Technical",
    group: "General Management",
    bio: "",
  },
  {
    name: "Enyinnia Uche",
    honorific: "Mr",
    title: "General Manager, Projects",
    group: "General Management",
    bio: "",
  },
];

// Section order follows first appearance of each group above.
export const teamGroups: TeamGroup[] = [...new Set(team.map((m) => m.group))];

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
