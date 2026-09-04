# AGENTS.md

## Project Overview

STRAW Barter is a UK barter platform marketing site built with **Eleventy v3 + Tailwind CSS v4**, compiled to static HTML in `dist/` and deployed on Netlify (`netlify.toml`: `command = "npm run build"`, `publish = "dist"`).

## Architecture

- `src/index.html` — homepage hub: hero, explore-the-platform card grid (generated from `nav.js`), token strip, sign-up CTA.
- One page per feature under `src/*.html` — marketplace, barter, rwa, books, dating (18+), repair-upcycle, events, business, builder, jobs, tools, downloads, token, signup, legal, terms, privacy, contact, 404.
- `src/_includes/base.html` — the only layout: head/meta, FCA warning banner, sticky header with CSS-driven dropdowns, mobile menu, footer, toast, age-gate modal, global JS include. Pages contribute **content only** via front-matter `title`/`description` + `layout: base`.
- `src/_data/nav.js` — single source of navigation: desktop dropdown groups, mobile menu, footer links. New pages get an entry here; the homepage explore grid and footer update automatically.
- `src/_data/config.js` — shared constants. The Solana contract address lives here (`config.ADDRESSES.solana`) and is templated everywhere — never hard-code it in pages.
- `src/assets/css/main.css` — Tailwind v4 entry (`@import "tailwindcss"` + `@source`) with the custom palette in `@theme`; compiled by `main.11ty.js` (PostCSS) to `/assets/css/main.css`.
- `src/assets/js/main.js` — global vanilla JS: mobile menu, toast, clipboard copy, modal helpers (open/close, Escape, backdrop click), age gate (localStorage-gated blur on `.age-gate-guard`), book exchange rendering/filtering.

## Conventions

- Colour palette is defined twice on purpose in `@theme`: `s.*` (original tokens: `bg-s-card`, `text-s-green`, …) and `straw-*` aliases (`text-straw-muted`, `bg-straw-card`, …) so user-supplied markup drops in unchanged. Prefer `s.*` for new hand-written code.
- Shared custom CSS (`.card`, `.toast`, `.modal-backdrop`, `.dropdown-menu`, `.section-compact`, `.gradient-text`, `.card-hover`, `.age-gate-guard`) lives in `main.css` after the `@theme` block.
- Inline handlers call helpers exposed on `window` by `main.js`: `toggleMobileMenu`, `showToast`, `copyText`, `copyTokenAddress`, `copyRefLink`, `openAgeGate`, `confirmAge`, `openModal`, `closeModal`.
- UK-oriented (en-GB, FCA/amber risk warnings, GBP). Preserve risk disclaimers in token-related sections.
- The `dist/` directory is build output — never edit or commit it.

## Adding a page

1. `src/my-page.html` with front-matter (`title`, `description`, `layout: base`), then content-only HTML.
2. Add nav entry in `src/_data/nav.js` (dropdown item — desktop, mobile and footer follow automatically).
3. Verify with `npm run build` (or `npm run dev`).

## Non-obvious decisions

- Eleventy was chosen so ~50 planned new pages plug into one shared layout instead of duplicating header/footer/scripts per file (the contract address alone was duplicated 7× in the previous single-file site).
- Dropdowns are pure CSS (`:hover`/`:focus-within`) — no JS toggling needed; JS only closes them on outside click/Escape.
- The age gate actually gates: dating content carries `.age-gate-guard` (blurred + inert) until `confirmAge(true)` sets a `strawAgeVerified` localStorage flag (applied via `html.age-verified`).
- Keep front-matter `description` filled on every page — it feeds the meta description automatically.
