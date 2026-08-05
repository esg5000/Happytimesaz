# HappytimesAZ Sanity Studio

Sanity CMS for HappytimesAZ content: posts, listings, deals, events, stations,
dispensaries, restaurants, nightlife venues, and ads.

## Repo layout
- `apps/sanity` — Sanity Studio + schemas

## Quick start
### 1) Install deps
```bash
pnpm install
```

### 2) Configure environment variables
Copy and fill in:
- `apps/sanity/.env.example` → `apps/sanity/.env`

### 3) Run Sanity Studio
```bash
pnpm --filter @happytimesaz/sanity dev
```
Open the Studio URL shown in the terminal.

## Other commands
```bash
pnpm build    # sanity build
pnpm deploy   # sanity deploy
pnpm format   # prettier --write .
```
