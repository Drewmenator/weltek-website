# Weltek Limited — Website

Marketing site for Weltek Limited, a Nigerian Engineering, Procurement and
Construction (EPC) company. Built with Next.js (App Router) + TypeScript +
Tailwind CSS v4.

## Stack
- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css` via `@theme`)
- Resend for the contact form backend
- Deployed on Vercel

## Local development
```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY etc.
npm run dev                  # http://localhost:3000
npm run build                # production build
```

## Structure
- `app/` — routes (App Router). Dynamic: `services/[slug]`, `projects/[slug]`.
- `app/api/contact/route.ts` — contact form backend (Resend).
- `content/` — typed content (single source of truth): services, projects, industries, credentials.
- `lib/site.ts` — site config, navigation, offices, contact details.
- `components/` — reusable components (Header, Footer, cards, ContactForm, CaseStudyTemplate, etc.).
- `public/images/` — placeholder SVGs (replace with real photography).
- `docs/` — content-gap report, responsive-testing checklist, deployment checklist.

## Editing content
Content lives in `content/*.ts`. To confirm a credential number, set
`confirm: false` and add `refNumber` in `content/credentials.ts`. To add a
project or service, add an entry to the relevant file; routes and the sitemap
update automatically.

## Before launch
See `docs/CONTENT-GAPS.md` for every `[CONFIRM]` placeholder, and
`docs/DEPLOYMENT.md` for the Vercel and Resend setup.
