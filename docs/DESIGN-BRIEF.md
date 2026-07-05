# Weltek website — design/UX brief for a restyle

Hand this folder to a design-focused session to improve the UI/UX across the
whole site. This file orients you; the code is the source of truth.

## What this is
Marketing site for **Weltek Limited**, a Nigerian **EPC** (Engineering,
Procurement & Construction) company. The audience is **procurement and technical
buyers at oil & gas majors** (Shell/SNEPCo/SPDC, Chevron, ExxonMobil, NPDC,
Energia, NNPC). They shortlist on credibility signals, not polish.

## Hard design constraints (must keep)
- **Do not look AI-generated / vibe-coded.** No purple/indigo gradients, no
  gradient text, no glowing blobs, no glassmorphism, no heavy `backdrop-blur`,
  no emoji, no "icon-in-a-rounded-square" feature-card sameness, no generic
  centered-hero-with-two-pills.
- **Premium, industrial, engineering-led.** Think Worley / Petrofac / Wood, not
  a SaaS landing page. Heavy whitespace, strong type, restrained motion.
- **No em dashes in copy.** Human, specific, confident sentences.
- **Mobile-first.** 44px touch targets, `100dvh` (utility `h-dvh`), safe-area
  insets, 16px+ form inputs (prevents iOS auto-zoom), lean mobile bundle.
- The full original brief is at `~/Downloads/weltek-rebuild-spec.md` if you want
  the complete rationale.

## Stack (important for how to edit design)
- Next.js 16 (App Router, Turbopack) + React 19 + **Tailwind CSS v4**.
- **Design tokens live in `app/globals.css` via `@theme`. There is NO
  `tailwind.config.js`.** Change color/spacing/type there and it propagates.
- Fonts loaded in `app/layout.tsx` (Archivo for headings, Inter for body).

### Tailwind v4 gotchas (will bite you)
- Base element styles (e.g. default heading color) MUST live inside
  `@layer base`, or they beat utility classes like `text-white` regardless of
  specificity (unlayered CSS wins over layered). See the `@layer base` block in
  `app/globals.css`.
- `backdrop-filter` on an element makes it the containing block for `fixed`
  descendants — it silently broke the mobile drawer once. Avoid it.
- Turbopack global-CSS HMR can go stale; `rm -rf .next` and restart if a
  `globals.css` change isn't showing.

## Current design system (what to evolve)
- Palette (Option B): navy `#0E2A3B`, steel `#33505F`, bronze accent `#B0692F`
  (hover `#8F5320`), ink `#14232E`, surface white + off-white `#F4F5F2`, border
  `#DBDFDE`, gold `#C9A24B`. Bronze is the single warm accent, used sparingly.
- Type: Archivo (headings, condensed/industrial), Inter (body). `clamp()` scale.
- Radius: 4px everywhere (no pill shapes). Motion: short fade+rise reveals only.

## Where the "look" lives
- `app/globals.css` — tokens + base styles (start here for a re-skin).
- `app/layout.tsx` — fonts, header/footer shell, JSON-LD.
- `components/` — the visual language:
  - Shell: `Header.tsx` (with mobile drawer), `Footer.tsx`, `Logo.tsx`.
  - Sections: `Hero.tsx`, `StatStrip.tsx`, `CredentialsStrip.tsx`, `CTASection.tsx`.
  - Cards: `cards/ServiceCard.tsx`, `cards/ProjectCard.tsx`, `cards/IndustryCard.tsx`.
  - Templates: `CaseStudyTemplate.tsx`, `ContactForm.tsx`, `projects/ProjectsExplorer.tsx`.
  - Primitives: `ui/Button.tsx`, `ui/SectionHeading.tsx`, `ui/PageHeader.tsx`,
    `ui/Container.tsx`, `ui/Breadcrumb.tsx`, `ui/Reveal.tsx`.

## What to KEEP working (do not break)
- Content is data-driven in `content/*.ts` (services, projects, industries,
  credentials) and `lib/site.ts`. Restyle the components, keep the data shape.
- Routes must keep working: Home, About, Services (+`[slug]`), Projects
  (filterable, +`[slug]` case studies), Industries, HSE/Quality, Careers,
  Vendors, Contact, 404. `sitemap.ts`, `robots.ts`, per-page `metadata`.
- The contact form posts to `app/api/contact/route.ts` (Resend). Leave the
  request/response contract intact.

## Per-page UX inventory (what each page must do)
- **Home** (`app/page.tsx`): hero → trust stats → credentials strip → who we are
  → 6 services → featured projects → HSE → industries → why Weltek → CTA.
  Primary jobs: establish credibility fast, surface the Capability Statement +
  "Request a Proposal" CTAs.
- **About** (`app/about/page.tsx`): overview, mission/vision, values, stats,
  leadership placeholder.
- **Services** (`app/services/page.tsx` + `[slug]`): 6 capability tiles →
  detail (capability, deliverables, industries, related projects).
- **Projects** (`app/projects/page.tsx` + `[slug]`): filterable grid (client-side
  chips) → case study (facts rail, challenge, scope, role, highlights, HSE,
  outcome, related services).
- **Industries** (`app/industries/page.tsx`): 5 alternating editorial sections.
- **HSE / Quality** (`app/hse-quality/page.tsx`): practices grid + certifications.
- **Careers** (`app/careers/page.tsx`): why-Weltek, role families, talent form.
- **Vendors** (`app/vendors/page.tsx`): 3-step flow, vendor form.
- **Contact** (`app/contact/page.tsx`): offices, phones, map placeholder, form.

## Known UI/UX areas worth improving (candidates for the redesign)
- Imagery is placeholder SVGs in `public/images/` — the design leans heavily on
  eventual real photography; make sure layouts hold up with strong images.
- Card rhythm is fairly uniform on some grids; could be more editorial/varied.
- The homepage industries grid and services "featured" tile could be more
  distinctive.
- Consider a stronger visual identity in the hero and section transitions
  without adding the AI-tells listed above.
- Logo is a placeholder wordmark in `components/Logo.tsx` (real logo pending).

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
```
