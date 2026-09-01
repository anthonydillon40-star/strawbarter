# STRAW Barter

A static landing page for **STRAW Barter** — a UK-focused barter platform ("Trade Anything. Own Everything."). The single-page site includes a hero with search, a Solana token (STRAW) showcase with contract address and explorer links, marketplace/barter/RWA-registry/dating/builder/jobs/tools/downloads/events/businesses sections, a referral sign-up block, legal/risk notices, an age-verification modal, and toast notifications.

## Key Technologies

- Plain HTML/CSS/JavaScript (single `index.html`, no build step)
- Tailwind CSS via CDN (custom `s.*` color palette in the inline `tailwind.config`)
- Font Awesome via CDN (icons)

## Running Locally

No build step required — open `index.html` directly in a browser, or serve the directory:

```bash
netlify dev --port 8889
```

Then visit http://localhost:8889.

## Deployment

The site is configured as a static Netlify site (`netlify.toml` publishes the repo root). Any commit deploys automatically.