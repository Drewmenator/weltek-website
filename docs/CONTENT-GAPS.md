# Content-gap report — items flagged `[CONFIRM]`

Every placeholder below must be confirmed or supplied by Weltek before launch.
None of these are invented facts; they are gaps where real data is needed.

## 1. Compliance & certifications (highest priority — shortlisting signals)
Location: `content/credentials.ts`, homepage credentials strip, HSE/Quality page.

- **NCDMB** registration number.
- **NUPRC / OGISP** group registration number(s) and category.
- **Nigerian Local Content** certificate / posture statement and any reference number.
- **ISO 9001** certificate number, issuing body, and validity dates. (Site references ISO 9001:2015 for automation; confirm the certificate is current and company-wide.)
- **ISO 14001** — confirm whether held. Remove if not certified.
- **ISO 45001** — confirm whether held. Remove if not certified.
- Any other client-required registrations (e.g. specific operator vendor IDs).

> When a number is confirmed, set `confirm: false` and add `refNumber` on that entry in `content/credentials.ts`. The "to confirm" flag disappears automatically.

## 2. Projects (`content/projects.ts`)
For each project: confirm permission to name the client publicly and to use any logo.

- **Locations** for: Ebendo, OML-111/65, Cawthorne Channel, SNEPCo topsides, Lekki, Asasa VA, CAO/SCADA, GPH.
- **Dates / durations** for each project.
- **Outcomes / metrics** — every project currently reads `[CONFIRM] Outcome metrics to be provided`. Provide 1–2 concrete results each (uptime, schedule, panels delivered, etc.).
- **HSE notes** — confirm the safety statement per project (currently generic + `[CONFIRM]`).
- Confirm the client short-names are how Weltek is permitted to refer to them (e.g. "SPDC (Shell)", "SNEPCo").

## 3. Company facts
- **Founding year** (site says 30+ years; confirm exact year for "since 19XX").
- Confirm the **100+ projects** and **850+ wellhead control panels** figures are approved for public use.

## 4. About page (`app/about/page.tsx`)
- **Leadership** names, titles, short bios.
- **Technical team** description and total **headcount**.

## 5. Careers (`app/careers/page.tsx`)
- **Current vacancies** (or confirm "no open roles" is acceptable).
- Decision on **CV upload** vs. link-in-message (upload deferred; see note on page).

## 6. Vendors (`app/vendors/page.tsx`)
- **Supplier compliance document** checklist.
- **Procurement contact** email (if different from info@weltekng.com).

## 7. Contact (`app/contact/page.tsx`)
- **Map embed** for Plot 307 Danjuma Drive, Trans Amadi, Port Harcourt (currently a placeholder box).
- Confirm both office phone numbers and the USA office details are current.

## 8. Brand & media
- **Official logo** file (SVG preferred). Current wordmark is a placeholder in `components/Logo.tsx`.
- **Exact brand hex values** from the logo (bronze inferred as `#B0692F`; confirm).
- **Industrial photography** to replace the 22 placeholder SVGs in `public/images/` (filenames indicate the intended subject).
- **Capability Statement PDF** to replace `public/weltek-capability-statement.pdf` (placeholder).
- **Open Graph image** to replace `public/images/og-default.svg` (ideally a 1200x630 PNG/JPG).

## 9. Legal / footer
- Confirm copyright entity and whether a privacy policy / terms page is required.
