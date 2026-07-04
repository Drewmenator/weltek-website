export type Credential = {
  label: string;
  detail: string;
  refNumber?: string; // shown when confirmed
  confirm: boolean; // true = data gap to be filled by Weltek
};

export const credentials: Credential[] = [
  {
    label: "NCDMB",
    detail: "Nigerian Content Development and Monitoring Board registration",
    confirm: true,
  },
  {
    label: "NUPRC / OGISP",
    detail: "Group registration with the upstream regulator",
    confirm: true,
  },
  {
    label: "Nigerian Local Content",
    detail: "Local content execution and workforce development",
    confirm: true,
  },
  {
    label: "ISO 9001",
    detail: "Quality Management System (referenced 9001:2015)",
    confirm: true,
  },
  {
    label: "ISO 14001",
    detail: "Environmental Management System",
    confirm: true,
  },
  {
    label: "ISO 45001",
    detail: "Occupational Health & Safety Management",
    confirm: true,
  },
];
