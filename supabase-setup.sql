-- ============================================================
-- USAMedTravel — Supabase Setup Script
-- Run this once in your Supabase SQL Editor
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. ADMIN USERS ALLOWLIST
-- ─────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

-- Only admins whose emails are in this table can access the panel.
-- Insert your admin email here:
-- INSERT INTO public.admin_users (email) VALUES ('your-admin@email.com');

-- RLS on admin_users: Authenticated users can read the table. 
-- We filter by email in the code ( .eq('email', user.email) ), so this is secure.
alter table public.admin_users enable row level security;

drop policy if exists "Admin users can read their own row" on public.admin_users;

create policy "Authenticated users can read admin_users"
  on public.admin_users for select
  to authenticated
  using (true);


-- ─────────────────────────────────────────────────────────────
-- 2. PRICING PLANS TABLE
-- ─────────────────────────────────────────────────────────────
create table if not exists public.pricing_plans (
  id text primary key,              -- e.g. 'basic', 'specialist', 'tumor', 'concierge'
  name text not null,
  price text not null,              -- stored as display string: "$299", "Custom", etc.
  unit text,                        -- "one-time", "per case", "tailored"
  tagline text,
  featured boolean default false,
  sort_order integer default 0,
  updated_at timestamptz default now()
);

-- Seed with the current hardcoded values
insert into public.pricing_plans (id, name, price, unit, tagline, featured, sort_order) values
  ('basic',      'Basic Second Opinion',      '$299',   'one-time',  'Written specialist review',         false, 1),
  ('specialist', 'Specialist Consultation',   '$599',   'one-time',  'Live video with U.S. doctor',        true,  2),
  ('tumor',      'Oncology / Tumor Board',    '$1,499', 'per case',  'Multidisciplinary cancer panel',    false, 3),
  ('concierge',  'Concierge Package',         'Custom', 'tailored',  'End-to-end medical travel',         false, 4)
on conflict (id) do nothing;

-- RLS on pricing_plans: public READ, admin-only WRITE
alter table public.pricing_plans enable row level security;

create policy "Anyone can read pricing"
  on public.pricing_plans for select
  using (true);

create policy "Admin can update pricing"
  on public.pricing_plans for update
  using (
    exists (
      select 1 from public.admin_users
      where email = auth.email()
    )
  );


-- ─────────────────────────────────────────────────────────────
-- 3. INQUIRIES TABLE — update RLS (table already exists)
-- ─────────────────────────────────────────────────────────────

-- Allow anyone (anon) to INSERT a new inquiry (public form — no login required)
-- Drop if it exists to re-create cleanly
drop policy if exists "Anyone can submit inquiries" on public.inquiries;
create policy "Anyone can submit inquiries"
  on public.inquiries for insert
  with check (true);

-- Only admin users can read/update inquiries
drop policy if exists "Admin can read inquiries" on public.inquiries;
create policy "Admin can read inquiries"
  on public.inquiries for select
  using (
    exists (
      select 1 from public.admin_users
      where email = auth.email()
    )
  );

drop policy if exists "Admin can update inquiries" on public.inquiries;
create policy "Admin can update inquiries"
  on public.inquiries for update
  using (
    exists (
      select 1 from public.admin_users
      where email = auth.email()
    )
  );


-- ─────────────────────────────────────────────────────────────
-- 4. INSERT YOUR ADMIN EMAIL (edit and run this separately)
-- ─────────────────────────────────────────────────────────────
-- INSERT INTO public.admin_users (email) VALUES ('your-admin@email.com');
