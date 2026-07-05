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
    bio: "",
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
    title: "General Manager, Finance",
    group: "General Management",
    bio: "",
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
