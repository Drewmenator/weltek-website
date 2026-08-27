# Design System, Weltek Limited

Source of truth for every visual decision on this site. Read it before changing
type, colour, spacing or layout. If a change contradicts this file, either the
change is wrong or this file needs updating first. Do not silently diverge.

Tokens live in `app/globals.css` under `@theme`. There is no `tailwind.config.js`.

## Product context

- **What this is:** marketing site for an Engineering, Procurement and
  Construction contractor working Nigerian oil and gas, power and process assets.
- **Who it is for:** procurement and technical buyers at operators, shortlisting
  contractors. They scan for fit, evidence and compliance, then leave.
- **Register:** Worley, Petrofac, Wood. Not a SaaS landing page.
- **The one thing to remember:** *Weltek executes on live plants.* It is the
  hardest claim in the category to fake and the thing that separates a contractor
  from a broker. Every decision below serves it.

## Aesthetic direction

Industrial precision. Drawing office, not showroom. Heavy whitespace, strong
type, restrained motion, photography that shows work happening rather than
assets looking handsome.

**Hard bans.** No purple or indigo gradients, no gradient text, no glowing
blobs, no glassmorphism, no emoji, no icon-in-a-rounded-square feature cards, no
centred hero with two pills. No em dashes in copy: write human, specific,
confident sentences.

## Typography

One display face, one text face. Archivo carries the voice; Instrument Sans is
the workhorse. Loaded via `next/font/google` in `app/layout.tsx`.

- **Display:** Archivo, weight 650, tight negative tracking.
- **Body:** Instrument Sans. It replaced Inter deliberately. Inter is the house
  default of every AI design tool and reads as "no decision was made here".

### Scale

Use the tokens. Do not invent `text-[1.37rem]` values.

| Token | px | Role |
|---|---|---|
| `text-display` | 68 | Homepage hero only |
| `text-title` | 44 | Page headers, case study and service h1 |
| `text-section` | 42 | Section headings |
| `text-subsection` | 28 | Sub-heads inside a section |
| `text-card` | 20 | Card titles |
| `text-lead` | 20 | Section intros, hero standfirst |
| `text-body` | 18 | Running text, and the `body` default |
| `text-small` | 15 | Captions, meta, nav |
| `text-micro` | 12 | Eyebrows and labels. This is the floor. |

The old scale ran 60 / 38 / 34 / 32. Section headings and card headings read as
one size, so nothing below the h1 had rank. The steps above are wide enough to
be read as steps.

**11px is the floor.** Three strings previously rendered at 9.3 to 9.9px.
Nothing may go below `text-micro` again.

The only legitimate arbitrary sizes left are the mobile halves of responsive
pairs (`text-[2rem] sm:text-title`), the logo wordmark, and the stat figures.
Those are their own roles, not scale steps.

## Colour

Palette is unchanged and clears WCAG AA throughout. What changed is discipline.

- **Ground:** `navy-900` `#071722`. The page floor, for hero, HSE and CTA bands.
- **Raised:** `navy` `#0e2a3b`. Anything sitting on the ground: stat cells, HSE
  pillars, image backdrops.
- **Ink:** `ink` `#16242e` body text, `steel` `#34515f` secondary, `graphite`
  `#5a6870` meta.
- **Accent:** `bronze` `#9c561f`, hover `bronze-strong` `#82481b`.
- **Surfaces:** `surface` white, `canvas` `#f6f4ef`, `surface-alt` `#f1eee6`.
  Warm paper, never clinical white.
- **Gold** `#c6a052` is for stat figures on dark only.

Two darks, not four. `navy-800` and `navy-700` were retired: four near-identical
navies as section backgrounds read as noise rather than hierarchy.

**Bronze has one job: the next action.** It also marks eyebrows and card rules,
which is the most it can carry. If bronze starts appearing on hover states, icon
fills and borders as well, it stops reading as a call to action.

## Layout

- Container `max-w-[1200px]`, padding `px-4 sm:px-6 lg:px-8`.
- **Radius is 0.** `--radius-card: 0px`, applied via `rounded-card`. Every peer
  in the category went soft: Worley 4 to 55px, Petrofac 55px pills, Wood 24 to
  32px. Sharp is the one thing this site already owned, so it is now committed
  to rather than split at 3px. `rounded-full` is reserved for genuinely
  circular elements. Nothing currently qualifies, so there are none on the site.
- Section rhythm `py-16 lg:py-20`, alternating light and dark bands.
- **Grids get a lead tile.** A row of identical rectangles tells the reader
  nothing about where to start. Services lead with brownfield rejuvenation,
  which is the live-plant claim. Projects use one large tile spanning two
  columns and two rows, with two cards stacked beside it.

### Homepage order

Proof before prose. A shortlisting buyer wants to know who already trusted
Weltek, and at what scale, before reading a word about the company.

1. Hero
2. Clients strip
3. Stat strip
4. Who we are
5. Capabilities
6. Selected work
7. HSE and quality
8. Compliance and certifications
9. Sectors we serve
10. Closing CTA

The clients strip used to sit eighth, 152px tall, at 60% scroll depth, on the
same white as the section above it so the seam vanished. Compliance now sits
directly under HSE, where a buyer checking one is already looking for the other.

A separate "Why Weltek" section was removed. It restated the services grid and
the HSE section, and its lead claim is now the featured brownfield card.

## Spacing and motion

- Base unit 4px. Section padding `py-16 lg:py-20`, card padding `p-6`.
- Motion is restrained: short fade and rise on entry, nothing decorative.
  `prefers-reduced-motion` is honoured globally in `app/globals.css`, which
  zeroes durations while `fill: both` preserves end states.

## Accessibility, non-negotiable

- **Zero AA contrast failures.** Verified by compositing colours after alpha
  blending, not by eyeballing. Re-check after any colour or opacity change.
- Text over photographs must carry its own opaque backdrop. Do not rely on how
  dark the image happens to be.
- Touch targets: 44px for primary navigation, 28px minimum in footer lists.
- Form inputs at 16px or larger, which prevents iOS auto-zoom.
- Heading order with no skipped levels. Every `img` carries `alt`.

## Tailwind v4 traps, learned the hard way

- **Check custom `@utility` names against Tailwind's own.** `overline` collided
  with the built-in `text-decoration` utility and drew a stray rule above all 23
  eyebrow labels on the homepage. `h-dvh` collided the same way. They are now
  `eyebrow` and `min-h-viewport`.
- Base element styles must sit inside `@layer base` or they beat utilities like
  `text-white` regardless of specificity.
- `backdrop-filter` makes an element the containing block for `fixed`
  descendants. It broke the mobile drawer once. The header's blur is on a
  sibling span, not an ancestor, which is why the drawer still works.
- **Turbopack global-CSS HMR goes stale.** A `globals.css` change can silently
  not apply in dev while the production build is correct. If a token change is
  not showing, `rm -rf .next/dev .next/cache` and restart before debugging it.

## Parked, not deleted

The "Company film" card (eyebrow *Company film*, title *Watch the Weltek story*,
caption *Three decades of delivery on Nigerian fields*) was removed rather than
relocated, because with the play control gone there was no card left, only a
photograph. Restore it as a real player, not a link, once a film exists: embed
or modal, poster frame, captions. It should not go back in the hero.

## Known trade-off

The homepage is roughly 6,600px against a peer range of 5,242 to 5,543. Removing
the redundant section and tightening the rhythm took it down from 7,465. The
remaining gap is one grid row of image cards: showing three capabilities on the
homepage instead of six would close it. That is a content decision, not a design
one, and it has not been made.

## Decisions log

| Date | Decision | Rationale |
|---|---|---|
| 2026-08-26 | Instrument Sans replaces Inter | Inter is the AI-default tell; peers all run a single characterful face |
| 2026-08-26 | Radius 3px to 0px | Only sharp site in a category that went soft; commit rather than split |
| 2026-08-26 | Type scale tokenised, 31 arbitrary sizes retired | No rank existed below the h1 |
| 2026-08-26 | Four navies collapsed to two | Near-identical darks read as noise, not hierarchy |
| 2026-08-26 | Clients strip moved to position 2 | Strongest credibility signal was the smallest, most buried element |
| 2026-08-26 | "Why Weltek" section removed | Restated services and HSE; lead claim became the featured card |
| 2026-08-26 | Lead tiles on services and projects | Fourteen identical rectangles gave the reader no entry point |
| 2026-08-26 | Film card removed from the hero | It sat on the only part of the hero photograph the gradient was built to reveal, and was a photo inside a photo |
| 2026-08-26 | Play control retired site-wide | There is no video asset anywhere in the repo; the control navigated to a text page, which is a false affordance |
| 2026-08-26 | "Who we are" photo captioned | Naming what it shows turns a decorative image into evidence for the live-plant claim |
