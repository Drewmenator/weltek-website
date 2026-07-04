export type ProjectFilter =
  | "Oil & Gas"
  | "Power"
  | "Automation"
  | "I&E"
  | "Brownfield"
  | "Wellhead Control Panels"
  | "EPC";

export type Project = {
  slug: string;
  title: string;
  client: string;
  location: string;
  sector: string;
  serviceType: string;
  filters: ProjectFilter[];
  scope: string;
  // Case-study fields. Outcomes are placeholders until confirmed by Weltek.
  challenge: string;
  work: string[];
  role: string;
  highlights: string[];
  hseNote: string;
  outcome: string; // [CONFIRM]
  relatedServices: string[]; // service slugs
  image: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ebendo-integrated-metering-system",
    title: "Ebendo Flow Station Integrated Metering System",
    client: "Energia",
    location: "Ebendo Field, Nigeria [CONFIRM]",
    sector: "Oil & Gas",
    serviceType: "EPC · Instrumentation & Electrical",
    filters: ["Oil & Gas", "I&E", "EPC"],
    scope:
      "Engineering, procurement and construction of an integrated metering system for the Ebendo flow station, including instrumentation, electrical works and system integration.",
    challenge:
      "The flow station needed accurate custody-grade measurement integrated into existing station infrastructure with minimal disruption to production.",
    work: [
      "Metering system design and engineering",
      "Procurement of metering, instrument and electrical packages",
      "Installation and field terminations",
      "System integration and commissioning",
    ],
    role: "EPC contractor delivering the metering system end to end.",
    highlights: [
      "Integrated metering into a producing flow station",
      "In-house instrumentation and electrical execution",
    ],
    hseNote: "Executed under station permit-to-work and isolation procedures. [CONFIRM]",
    outcome: "[CONFIRM] Outcome metrics to be provided by Weltek.",
    relatedServices: ["instrumentation-electrical", "automation"],
    image: "/images/project-ebendo.svg",
    featured: true,
  },
  {
    slug: "wellhead-control-panels-oml-111-65",
    title: "7 Wellhead Control Panels for OML-111/65",
    client: "NPDC",
    location: "OML-111 / OML-65, Nigeria [CONFIRM]",
    sector: "Oil & Gas",
    serviceType: "Wellhead Control Panels",
    filters: ["Oil & Gas", "Wellhead Control Panels", "EPC"],
    scope:
      "Design, fabrication, installation and commissioning of seven wellhead control panels for OML-111 and OML-65.",
    challenge:
      "Seven wells required control panels built to the operator's shutdown philosophy and delivered to a coordinated field schedule.",
    work: [
      "Panel design to operator shutdown philosophy",
      "In-house fabrication and function testing",
      "Field installation across seven wellheads",
      "Commissioning and handover",
    ],
    role: "Design, fabrication, installation and commissioning contractor.",
    highlights: [
      "Seven panels delivered to a single shutdown philosophy",
      "In-house fabrication and function testing",
    ],
    hseNote: "Field installation under live-field HSE controls. [CONFIRM]",
    outcome: "[CONFIRM] Outcome metrics to be provided by Weltek.",
    relatedServices: ["wellhead-control-panels", "instrumentation-electrical"],
    image: "/images/project-whcp.svg",
    featured: true,
  },
  {
    slug: "cawthorne-channel-flow-station-revamp",
    title: "Cawthorne Channel Flow Station Revamp",
    client: "SPDC (Shell)",
    location: "Cawthorne Channel, Rivers State [CONFIRM]",
    sector: "Oil & Gas",
    serviceType: "Brownfield Rejuvenation",
    filters: ["Oil & Gas", "Brownfield", "EPC"],
    scope:
      "Revamp of the Cawthorne Channel flow station as part of a further oil development, executed on a producing facility.",
    challenge:
      "Upgrading a producing swamp flow station meant carrying out modifications while the plant stayed in service.",
    work: [
      "Brownfield engineering and planning",
      "Live tie-ins and phased modifications",
      "Instrumentation and electrical upgrades",
      "Commissioning back into service",
    ],
    role: "Brownfield revamp contractor on a live facility.",
    highlights: [
      "Modifications carried out on a producing facility",
      "Phased tie-ins to protect production",
    ],
    hseNote: "Live-plant permit-to-work and isolation discipline throughout. [CONFIRM]",
    outcome: "[CONFIRM] Outcome metrics to be provided by Weltek.",
    relatedServices: ["brownfield-rejuvenation", "instrumentation-electrical"],
    image: "/images/project-cawthorne.svg",
    featured: true,
  },
  {
    slug: "topsides-facilities-snepco",
    title: "Topsides Facilities Installation & Commissioning",
    client: "SNEPCo (Shell)",
    location: "Offshore Nigeria [CONFIRM]",
    sector: "Oil & Gas",
    serviceType: "EPC · Offshore Topside Facilities",
    filters: ["Oil & Gas", "EPC", "I&E"],
    scope:
      "Installation and commissioning support for offshore topside facilities, including instrumentation and electrical components.",
    challenge:
      "Offshore topside work required packaged units and field teams coordinated to an offshore installation window.",
    work: [
      "Topside package preparation",
      "Instrument and electrical installation",
      "Offshore installation support",
      "Commissioning",
    ],
    role: "Installation and commissioning contractor for topside facilities.",
    highlights: ["Offshore topside execution", "In-house I&E scope"],
    hseNote: "Offshore HSE controls and permit systems. [CONFIRM]",
    outcome: "[CONFIRM] Outcome metrics to be provided by Weltek.",
    relatedServices: ["offshore-topside-facilities", "instrumentation-electrical"],
    image: "/images/project-topsides.svg",
  },
  {
    slug: "lekki-power-system-upgrade",
    title: "Lekki Power System Upgrade",
    client: "Chevron",
    location: "Lekki, Lagos [CONFIRM]",
    sector: "Power",
    serviceType: "Power Systems",
    filters: ["Power", "EPC"],
    scope: "Upgrade of the power system serving the Lekki facility, including distribution and switchgear works.",
    challenge:
      "The facility needed a more reliable power system upgraded without extended interruption to operations.",
    work: [
      "Power system engineering",
      "Switchgear and distribution works",
      "Installation and testing",
      "Commissioning",
    ],
    role: "Power systems upgrade contractor.",
    highlights: ["Distribution and switchgear upgrade", "Executed around live operations"],
    hseNote: "Electrical safety and isolation procedures. [CONFIRM]",
    outcome: "[CONFIRM] Outcome metrics to be provided by Weltek.",
    relatedServices: ["power-systems", "instrumentation-electrical"],
    image: "/images/project-lekki.svg",
  },
  {
    slug: "wellhead-control-panel-asasa-va",
    title: "12-Module Wellhead Control Panel, Asasa VA",
    client: "ExxonMobil",
    location: "Asasa VA, Nigeria [CONFIRM]",
    sector: "Oil & Gas",
    serviceType: "Wellhead Control Panels",
    filters: ["Oil & Gas", "Wellhead Control Panels"],
    scope: "Design, fabrication and commissioning of a 12-module wellhead control panel for Asasa VA.",
    challenge:
      "A twelve-module panel had to integrate control logic for multiple wells into a single coordinated unit.",
    work: [
      "12-module panel design",
      "In-house fabrication and function testing",
      "Installation",
      "Commissioning",
    ],
    role: "Design, fabrication and commissioning contractor.",
    highlights: ["12 modules in a single panel", "In-house function testing"],
    hseNote: "Field HSE controls during installation. [CONFIRM]",
    outcome: "[CONFIRM] Outcome metrics to be provided by Weltek.",
    relatedServices: ["wellhead-control-panels"],
    image: "/images/project-asasa.svg",
  },
  {
    slug: "cao-scada-instrumentation-system",
    title: "Electronic Instrumentation System for CAO / SCADA",
    client: "SPDC (Shell)",
    location: "Nigeria [CONFIRM]",
    sector: "Oil & Gas",
    serviceType: "Automation · Instrumentation",
    filters: ["Oil & Gas", "Automation", "I&E"],
    scope: "Supply and installation of an electronic instrumentation system supporting CAO and SCADA operations.",
    challenge:
      "SCADA operations depended on accurate field instrumentation feeding a central control and automation environment.",
    work: [
      "Instrumentation system design",
      "Electronic instrument installation",
      "SCADA integration",
      "Commissioning",
    ],
    role: "Instrumentation and automation contractor.",
    highlights: ["Field instrumentation for SCADA", "Automation integration"],
    hseNote: "Site HSE procedures observed. [CONFIRM]",
    outcome: "[CONFIRM] Outcome metrics to be provided by Weltek.",
    relatedServices: ["automation", "instrumentation-electrical"],
    image: "/images/project-scada.svg",
  },
  {
    slug: "gph-33kva-power-supply",
    title: "33kVA Power Supply Installation",
    client: "GPH City Development Authority",
    location: "Port Harcourt, Rivers State [CONFIRM]",
    sector: "Power",
    serviceType: "Power Systems",
    filters: ["Power", "EPC"],
    scope: "Installation of a 33kVA power supply for the GPH City Development Authority.",
    challenge: "A development authority site required a reliable power supply installed to schedule.",
    work: ["Power supply engineering", "Installation", "Testing", "Commissioning"],
    role: "Power supply installation contractor.",
    highlights: ["33kVA supply installation", "Civil and electrical scope"],
    hseNote: "Construction HSE controls. [CONFIRM]",
    outcome: "[CONFIRM] Outcome metrics to be provided by Weltek.",
    relatedServices: ["power-systems"],
    image: "/images/project-gph.svg",
  },
];

export const projectFilters: ProjectFilter[] = [
  "Oil & Gas",
  "Power",
  "Automation",
  "I&E",
  "Brownfield",
  "Wellhead Control Panels",
  "EPC",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
