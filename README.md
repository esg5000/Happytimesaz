# HappytimesAZ Full-Stack (Cursor-ready)

This repo implements the planned HappytimesAZ v1 rebuild:
- Consistent page templates + standardized ad slots
- Cannabis-only deals system
- Persistent floating corner radio player with 4 stations
- Stripe Checkout for ad purchases (assets uploaded by admin for now)
- Sanity CMS for content + directories

## Repo layout
- `apps/web` — Next.js app (routes, UI, server routes, Stripe checkout)
- `apps/sanity` — Sanity Studio + schemas (Post, Listing, Deal, Event, Station)
- `supabase` — SQL migrations / schema (optional but recommended)

## Quick start
### 1) Install deps
```bash
pnpm install
```

### 2) Configure environment variables
Copy and fill in:
- `apps/web/.env.local.example` → `apps/web/.env.local`
- `apps/sanity/.env.example` → `apps/sanity/.env`

### 3) Run Sanity Studio
```bash
pnpm --filter @happytimesaz/sanity dev
```
Open the Studio URL shown in the terminal.

### 4) Run the web app
```bash
pnpm --filter @happytimesaz/web dev
```
Open http://localhost:3000

## Stripe setup (ads)
1. Create Stripe **Products** matching the SKUs in `apps/web/src/lib/ads/catalog.ts`.
2. Create Prices (weekly / monthly).
3. Put the **Price IDs** into `apps/web/.env.local`:
   - `STRIPE_PRICE_SPONSORED_LISTING_30D=price_...`
   - etc.

The checkout endpoint is:
- `POST /api/stripe/checkout`

## Supabase / Postgres
Optional for v1 (since reviews/jobs are later), but recommended so you can store:
- advertiser orders
- ad placement status
- audit logs

SQL is in `supabase/001_init.sql`.

## Notes
- Ads are rendered as standardized components (`AdSlot`) and are **labeled Sponsored**.
- Deals are only shown under `/cannabis` and on dispensary listing pages.
- Radio player persists across navigation via the root layout.

