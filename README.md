# STRAW Barter

Marketing/site for **STRAW Barter** — a UK-focused barter platform ("Trade Anything. Own Everything."). Built with Eleventy (11ty) + Tailwind CSS v4, deployed on Netlify as a fully static site.

## Key Technologies

- **Eleventy v3** — static site generator, outputs plain HTML to `dist/`
- **Tailwind CSS v4** — compiled at build time via `@tailwindcss/postcss` (no CDN)
- **Font Awesome** via CDN (icons), Inter via Google Fonts
- Vanilla JS (`src/assets/js/main.js`) — dropdown, mobile menu, toast, modals, age gate, book exchange

## Project Structure

```
src/
  index.html          Homepage (hub: hero + explore grid + token + sign-up)
  marketplace.html    Marketplace          barter.html    Direct Barter
  rwa.html            RWA Registry         books.html     Book Exchange
  dating.html         Coffee Dating (18+)  repair-upcycle.html  Repair & Upcycle Hub
  events.html         Local Events         business.html  Local Businesses
  builder.html        Find a Builder       jobs.html      Jobs & Income
  tools.html          Free Tools           downloads.html Digital Downloads
  token.html          STRAW Token          signup.html    Join & Referral
  legal.html          Legal & Risk         terms.html     Terms of Service
  privacy.html        Privacy Policy       contact.html   Contact
  404.html            Not-found page
  _includes/base.html Shared layout (head, header/nav, footer, toast, age gate)
  _data/nav.js        Navigation structure — add new pages here
  _data/config.js     Shared constants (e.g. Solana contract address)
  assets/css/         Tailwind entry (main.css) + build via main.11ty.js
  assets/js/          Global vanilla JS
```

## Adding a Page

1. Create `src/my-page.html` starting with front-matter:

   ```
   ---
   title: My Page
   layout: base
   description: One-line description for SEO.
   ---
   ```

2. Below the front-matter, paste **only the page content** (the layout provides `<html>`, head, header, nav, footer, toast, age gate).
3. Add a link to it in `src/_data/nav.js` (desktop dropdown, mobile section, footer is automatic via `nav.groups`).

The custom colour palette is available as `s.*` utilities (`bg-s-card`, `text-s-green`…) and as `straw-*` aliases (`text-straw-muted`, `bg-straw-card`, …) for dropped-in markup.

## Running Locally

```bash
npm install
npm run dev        # dev server with live reload
```

Or `npm run build` then serve `dist/`.

## Deployment

Netlify builds with `npm run build` and publishes `dist/` (see `netlify.toml`). Any commit deploys automatically.
