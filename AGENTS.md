<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Design system

Read `DESIGN.md` before making any visual or UI decision. Font choices, the type
scale, colour roles, spacing, radius and homepage section order are defined
there, along with the Tailwind v4 traps this project has already hit.

Do not deviate without explicit user approval. Do not introduce arbitrary
`text-[…]` sizes: use the scale tokens. Flag any code that contradicts
`DESIGN.md`.
