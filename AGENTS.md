# AGENTS.md

## Project Overview

STRAW Barter is a single-page static marketing/landing site for a UK barter platform. There is no framework and no build step — the entire site lives in `index.html` at the repo root.

## Architecture

- `index.html` — the whole site: header with sticky nav + "More" dropdown, mobile menu, hero, token section, marketplace, barter, RWA registry, coffee dating (18+ age gate), builder finder, jobs, tools, downloads, events, businesses, sign-up/referral, legal, footer. Interactivity (dropdown, mobile menu, toast, clipboard copy, age gate modal) is vanilla JS in an inline `<script>` at the bottom of the file.
- `netlify.toml` — static deploy config; `publish = "."` (repo root). Functions directory is `netlify/functions` (currently empty).
- No package.json, no dependencies. Tailwind and Font Awesome load from CDNs.

## Conventions

- Colors come from a custom Tailwind palette `s.*` (dark, card, green, gold, text, muted, border, purple, solana) defined in the inline `tailwind.config` in `<head>`. Use these tokens (e.g. `bg-s-card`, `text-s-green`) instead of raw hex classes.
- Custom CSS (`.card`, `.toast`, `.modal-backdrop`, `.dropdown-menu`, `.section-compact`, `.gradient-text`) is in a single `<style>` block in `<head>`. Keep new styles there.
- JS helpers live in the bottom `<script>` block: `toggleDropdown(id, event)`, `toggleMobileMenu()`, `showToast(msg)`, `copyTokenAddress()`, `copyRefLink()`, `openAgeGate()`, `confirmAge()`. The dropdown toggle explicitly receives `event` from inline `onclick` (the original implicit-global `event` was unreliable in strict contexts).
- The page is UK-oriented (en-GB, FCA/amber risk warnings, GBP). Preserve the risk disclaimers when editing token-related sections.
- Solana contract address `2nct6YmdaqJaRQbZSj3SFe96CVsdTbvaWC8cSfKaAfxc` appears in multiple places (header, hero, token section, sign-up, footer) and is duplicated in the JS `copyTokenAddress()` — update all occurrences together if it changes.

## Non-obvious decisions

- Built as a plain static file (no template scaffold) because the user supplied a complete, self-contained HTML page; a framework would add nothing.
- `scroll-margin-top: 90px` on sections offsets the sticky header for anchor navigation.