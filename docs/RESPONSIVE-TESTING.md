# Responsive testing checklist

Test on **real devices**, both platforms, plus tablet and desktop. iOS Safari and
Android Chrome behave differently; do not rely on desktop emulation alone.

## Devices to cover
- iPhone (iOS Safari) — a notched model (e.g. iPhone 12/13/14/15) for safe-area.
- Mid-range Android (Chrome) — the real performance target on 4G.
- Tablet (iPad / Android tablet), portrait and landscape.
- Desktop at 1280 and 1440+.

## Breakpoints (Tailwind defaults)
- `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280.
- Header switches to the inline nav + both CTAs at `xl` (1280). Below that, the mobile drawer is used.

## Layout & navigation
- [ ] Mobile nav opens and closes one-handed; overlay tap and the X both close it.
- [ ] Body scroll locks while the drawer is open; unlocks on close.
- [ ] Both CTAs ("Request a Proposal" + "Download Capability Statement") reachable in the drawer, pinned above the home bar (safe-area).
- [ ] Header remains usable and legible when scrolled (solid background, border appears).
- [ ] Cards reflow: services 1→2→3 cols; projects 1→2→3; industries 2→5.
- [ ] Footer columns stack cleanly on mobile.

## iOS Safari specifics
- [ ] Hero uses `100dvh` (utility `h-dvh`); no content cut off by the Safari toolbar on scroll.
- [ ] Safe-area insets respected on notched iPhones (header `safe-px`, drawer `safe-pb`, hero `safe-pt`). No content under the notch or home bar.
- [ ] Form inputs are 16px+ (they are set to `text-[16px]`) so focus does not trigger auto-zoom.
- [ ] `viewport-fit=cover` set (in `app/layout.tsx` viewport) so insets apply.

## Android Chrome specifics
- [ ] Dynamic URL bar resize does not break the hero (dvh handles this).
- [ ] Tap highlight looks intentional (custom `-webkit-tap-highlight-color`).
- [ ] Native select dropdowns (enquiry type, service, role family, category) are usable.

## Touch targets & interaction
- [ ] All buttons/links ≥ 44x44px (CTAs are min-h 48–52px; nav rows 56px; filter chips 44px).
- [ ] No hover-only affordances: every hover state has a focus/tap equivalent.
- [ ] Focus-visible rings show on keyboard navigation.

## Projects page on a phone
- [ ] Filter chips scroll horizontally and are tappable.
- [ ] Selecting a filter updates the grid and the "Showing N projects" live region.

## Contact / careers / vendor forms on a phone
- [ ] Fields are large and easily tapped; labels visible.
- [ ] Validation errors and the success state are visible without hunting.
- [ ] Submitting shows the sending → success/error transition.

## Images & performance
- [ ] `next/image` serves appropriately sized images per breakpoint (check Network on throttled 4G).
- [ ] No layout shift as images load (aspect ratios reserved).
- [ ] Mobile bundle stays lean (no unnecessary client JS; only Header, ContactForm, ProjectsExplorer, Reveal are client components).

## Accessibility
- [ ] Colour contrast passes AA (navy/bronze/steel on white; white on navy).
- [ ] Headings are ordered; one `h1` per page.
- [ ] Skip-to-content link works.
- [ ] `prefers-reduced-motion` disables reveal animations.
