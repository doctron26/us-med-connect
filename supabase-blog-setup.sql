-- ============================================================
-- USAMedTravel — Blog Posts Table Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- BLOG POSTS TABLE
-- ─────────────────────────────────────────────────────────────
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  author text not null default 'USAMedTravel Team',
  cover_image_url text,
  published boolean default false
);

-- RLS
alter table public.blog_posts enable row level security;

-- Anyone can read published posts
drop policy if exists "Anyone can read published blogs" on public.blog_posts;
create policy "Anyone can read published blogs"
  on public.blog_posts for select
  using (published = true);

-- Admin can read ALL posts (including drafts)
drop policy if exists "Admin can read all blogs" on public.blog_posts;
create policy "Admin can read all blogs"
  on public.blog_posts for select
  using (
    exists (
      select 1 from public.admin_users
      where email = auth.email()
    )
  );

-- Admin can insert
drop policy if exists "Admin can create blogs" on public.blog_posts;
create policy "Admin can create blogs"
  on public.blog_posts for insert
  with check (
    exists (
      select 1 from public.admin_users
      where email = auth.email()
    )
  );

-- Admin can update
drop policy if exists "Admin can update blogs" on public.blog_posts;
create policy "Admin can update blogs"
  on public.blog_posts for update
  using (
    exists (
      select 1 from public.admin_users
      where email = auth.email()
    )
  );

-- Admin can delete
drop policy if exists "Admin can delete blogs" on public.blog_posts;
create policy "Admin can delete blogs"
  on public.blog_posts for delete
  using (
    exists (
      select 1 from public.admin_users
      where email = auth.email()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- SEED: One initial blog post
-- ─────────────────────────────────────────────────────────────
insert into public.blog_posts (title, slug, excerpt, content, author, published) values (
  'Why a U.S. Medical Second Opinion Could Save Your Life',
  'why-us-medical-second-opinion-could-save-your-life',
  'Medical research shows that up to 30% of initial diagnoses are refined or changed after a second expert review. Learn how accessing America''s top specialists can give you the clarity and confidence to make the best decisions about your health.',
  E'## Why a U.S. Medical Second Opinion Could Save Your Life\n\nWhen facing a serious medical diagnosis — whether it''s cancer, a neurological condition, or a complex surgical recommendation — the stakes couldn''t be higher. Yet studies published in the Journal of Clinical Oncology and BMJ Quality & Safety consistently show that **up to 30% of initial diagnoses change** after an independent second review.\n\n### The Power of a Fresh Perspective\n\nA second opinion isn''t about doubting your current doctor. It''s about leveraging the depth of expertise available at America''s leading medical institutions — Mayo Clinic, Johns Hopkins, MD Anderson, Cleveland Clinic, and others — to ensure your diagnosis is accurate and your treatment plan is optimal.\n\n### What Can Change?\n\n- **Diagnosis refinement**: A more precise staging of cancer, or an entirely different diagnosis altogether\n- **Treatment alternatives**: Access to clinical trials, immunotherapy options, or minimally invasive approaches not available locally\n- **Surgical necessity**: Confirmation of whether surgery is truly needed, or if conservative treatment is a better path\n- **Rare disease insights**: Connection to specialists who have seen your condition hundreds of times\n\n### How USAMedTravel Makes It Simple\n\nWe''ve built a seamless process that eliminates the complexity of navigating the U.S. healthcare system:\n\n1. **Submit your case** through our secure platform\n2. **Share your records** — MRI, CT, lab reports, biopsy results\n3. **Expert review** by a board-certified U.S. specialist in 3–5 business days\n4. **Receive a written opinion** with clear recommendations\n\nYou don''t need to travel. You don''t need a visa. You get world-class medical guidance from the comfort of your home.\n\n### Who Should Consider a Second Opinion?\n\n- Patients diagnosed with **cancer** at any stage\n- Anyone facing **major surgery** (cardiac, neurological, orthopedic)\n- Patients with **rare or undiagnosed conditions**\n- Families seeking **pediatric specialist guidance**\n- Anyone who feels uncertain about their current treatment plan\n\n### The Bottom Line\n\nA second opinion is not a luxury — it''s a medical best practice. The world''s top hospitals recommend it. Insurance companies encourage it. And now, with USAMedTravel, international patients can access it without leaving home.\n\n---\n\n*Ready to get started? [Request your second opinion today](/second-opinion) or [contact our team](/#contact) for a free initial consultation.*',
  'USAMedTravel Team',
  true
) on conflict (slug) do nothing;
