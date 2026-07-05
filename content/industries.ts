export type Industry = {
  slug: string;
  name: string;
  blurb: string;
  detail: string;
  image: string;
};

export const industries: Industry[] = [
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    blurb: "Upstream and midstream execution across offshore, land and swamp locations.",
    detail:
      "Weltek supports oil and gas operators with topside facilities, wellhead control panels, brownfield revamps and full instrumentation and electrical scope. Our field teams work offshore, on land and in the swamp, on greenfield builds and on producing facilities.",
    image: "/images/photos/service-offshore.webp",
  },
  {
    slug: "power-generation",
    name: "Power Generation",
    blurb: "Generation, distribution, substations and switchgear from LV to 132kV.",
    detail:
      "We deliver power systems for industrial and utility clients, covering generators, distribution lines, substations, switchgear and the civil works around them, engineered for reliability in the Nigerian operating environment.",
    image: "/images/photos/service-power.webp",
  },
  {
    slug: "petrochemicals",
    name: "Petrochemicals",
    blurb: "Process instrumentation, electrical and automation for refining and petrochemical plants.",
    detail:
      "Petrochemical and refining plants rely on precise instrumentation, robust electrical systems and dependable control. Weltek brings its I&E and automation heritage to process facilities where measurement and control accuracy matter.",
    image: "/images/photos/industry-petrochem.webp",
  },
  {
    slug: "food-and-beverage",
    name: "Food & Beverage",
    blurb: "Automation, controls and electrical systems for production plants.",
    detail:
      "Food and beverage production depends on controlled, repeatable processes. Weltek delivers the automation, instrumentation and electrical systems that keep production lines running consistently.",
    image: "/images/photos/industry-food.webp",
  },
  {
    slug: "industrial-facilities",
    name: "Industrial Facilities",
    blurb: "Power, controls and electrical infrastructure for broader industry.",
    detail:
      "Beyond energy, Weltek supports industrial facilities with power systems, controls and electrical infrastructure, applying the same engineering discipline and HSE culture that governs our oil and gas work.",
    image: "/images/photos/about-plant.webp",
  },
];
