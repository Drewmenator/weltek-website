export type Service = {
  slug: string;
  title: string;
  sector: string;
  short: string;
  intro: string;
  capability: string;
  deliverables: string[];
  industries: string[];
  image: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "offshore-topside-facilities",
    title: "Offshore Topside Facilities",
    sector: "Oil & Gas",
    short: "Complete design, fabrication and installation of topside packaged units and skids.",
    intro:
      "Weltek designs, fabricates and installs offshore topside facilities in-house, from process skids to the instrumentation and electrical systems that run them.",
    capability:
      "We build packaged units such as high-rate hydrate inhibitor injection pump skids and corrosion inhibitor skids, complete with the instruments and electrical components that make up the unit. We also fabricate the mechanical structures that support subsea equipment, so a package arrives ready to integrate rather than as loose parts.",
    deliverables: [
      "Hydrate inhibitor injection pump skids",
      "Corrosion inhibitor injection skids",
      "Instrument and electrical packages for topside units",
      "Mechanical support structures for subsea equipment",
      "Factory acceptance testing and installation support",
    ],
    industries: ["Oil & Gas", "Petrochemicals"],
    image: "/images/photos/service-offshore.webp",
    featured: false,
  },
  {
    slug: "brownfield-rejuvenation",
    title: "Onshore & Swamp Brownfield Rejuvenation",
    sector: "Live-plant EPC",
    short: "Revamp and upgrade of producing facilities without shutting the plant down.",
    intro:
      "Working on a live plant is a different discipline to greenfield construction. Weltek has the procedures and field experience to modify producing facilities safely.",
    capability:
      "We revamp and upgrade existing onshore and swamp facilities to improve output and reliability. The work is planned around the plant staying in production, with permit-to-work discipline, isolation procedures and phased tie-ins that keep people safe and keep the facility running.",
    deliverables: [
      "Facility revamp and debottlenecking",
      "Live tie-ins and phased cut-overs",
      "Ageing equipment replacement and upgrade",
      "Permit-to-work and isolation planning",
      "Commissioning back into live service",
    ],
    industries: ["Oil & Gas", "Power Generation"],
    image: "/images/photos/service-brownfield.webp",
    featured: false,
  },
  {
    slug: "power-systems",
    title: "Power Systems",
    sector: "Power",
    short: "Generation, distribution and substations from LV switchgear to 132kV lines.",
    intro:
      "Weltek delivers power systems end to end, from generator buildings and civil works through to high-voltage distribution and substations.",
    capability:
      "Our scope covers diesel and gas generators, electrical distribution systems, motor control facilities, LV and switchgear, and distribution lines at 132, 33 and 11kV. We also handle the power substations and the civil construction that goes with them, including generator buildings and cable trenches.",
    deliverables: [
      "Diesel and gas generator installations",
      "LV switchgear and motor control centres",
      "132 / 33 / 11kV distribution lines",
      "Power substations",
      "Generator buildings, cable trenches and civil works",
    ],
    industries: ["Power Generation", "Industrial Facilities"],
    image: "/images/photos/service-power.webp",
    featured: false,
  },
  {
    slug: "instrumentation-electrical",
    title: "Instrumentation & Electrical",
    sector: "I&E",
    short: "Full I&E contractor across offshore, land and swamp locations.",
    intro:
      "Instrumentation and electrical work is Weltek's heritage. We are a full I&E contractor for oil and gas operations and other process plants.",
    capability:
      "We have vast field experience across offshore, land and swamp locations. Scope includes pneumatic and electronic instrument installation, analyzer maintenance, tubing and cable tray systems, field terminations and in-house panel fabrication. The same team that engineers a system installs and commissions it.",
    deliverables: [
      "Pneumatic and electronic instrument installation",
      "Analyzer installation and maintenance",
      "Tubing, cable tray and field terminations",
      "In-house control and marshalling panel fabrication",
      "Loop checking and commissioning",
    ],
    industries: ["Oil & Gas", "Petrochemicals", "Food & Beverage"],
    image: "/images/photos/service-instrumentation.webp",
    featured: false,
  },
  {
    slug: "automation",
    title: "Automation",
    sector: "Systems & Controls",
    short: "Design, programming, testing and commissioning delivered with in-house resources.",
    intro:
      "Weltek executes every phase of an automation project with in-house resources, so control system work stays under one roof from design to start-up.",
    capability:
      "Our teams handle design, software programming, testing and commissioning of control and SCADA systems. Delivery is governed by our ISO 9001:2015 based quality management approach, which keeps configuration, testing and documentation consistent from one project to the next.",
    deliverables: [
      "Control and SCADA system design",
      "PLC and control software programming",
      "Factory and site acceptance testing",
      "System integration and commissioning",
      "As-built documentation and handover",
    ],
    industries: ["Oil & Gas", "Power Generation", "Food & Beverage"],
    image: "/images/photos/service-automation.webp",
    featured: false,
  },
  {
    slug: "wellhead-control-panels",
    title: "Wellhead Control Panels",
    sector: "Oil & Gas",
    short: "Design, fabrication, installation and commissioning. More than 850 panels delivered.",
    intro:
      "Wellhead control panels are a signature Weltek capability. We have delivered more than 850 panels across multiple fields and operators.",
    capability:
      "We take wellhead control panels through design, procurement, fabrication, installation and commissioning. From single-well units to multi-module panels, the panels are built and tested in-house to the operator's shutdown philosophy, then installed and commissioned in the field by the same team.",
    deliverables: [
      "Single and multi-module wellhead control panels",
      "Hydraulic and pneumatic shutdown logic",
      "In-house fabrication and function testing",
      "Field installation and commissioning",
      "Operator-specific shutdown philosophy implementation",
    ],
    industries: ["Oil & Gas"],
    image: "/images/photos/service-wellhead.webp",
    featured: true,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
