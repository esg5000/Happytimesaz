-- Optional database schema (Supabase/Postgres)
-- Stores ad purchases + placements so your AdSlot components can be data-driven.

create table if not exists advertisers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  business text,
  created_at timestamptz not null default now()
);

create table if not exists ad_orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  sku text not null,
  title text,
  amount_cents integer,
  currency text,
  status text not null default 'pending',
  advertiser_id uuid references advertisers(id) on delete set null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists ad_placements (
  id uuid primary key default gen_random_uuid(),
  page text not null, -- 'home', 'news', 'food', 'cannabis', etc.
  slot text not null, -- 'HERO_COMPANION', 'MID_FEED', 'END_CAP', etc.
  order_id uuid references ad_orders(id) on delete set null,
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean not null default false,
  creative_json jsonb, -- store headline, image URL, link, etc.
  created_at timestamptz not null default now()
);

create index if not exists ad_placements_page_slot_active_idx on ad_placements(page, slot, active);
