-- ================================================================
-- PromptVault — Complete Supabase Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor → Run
-- ================================================================

-- ── 1. PROFILES ──────────────────────────────────────────────────
-- Auto-created for every new user. Extend this table as you grow.
create table if not exists public.profiles (
  id          uuid references auth.users on delete cascade primary key,
  email       text,
  full_name   text,
  avatar_url  text,
  plan        text not null default 'free',   -- 'free' | 'pro' | 'team'
  created_at  timestamptz default now()
);

-- Trigger: create profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 2. SAVED PROMPTS ─────────────────────────────────────────────
-- Lets users bookmark prompts. prompt_id references the static data file id.
create table if not exists public.saved_prompts (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references auth.users on delete cascade not null,
  prompt_id    text not null,       -- matches id in src/data/prompts.js
  category_id  text not null,       -- matches catId in src/data/prompts.js
  saved_at     timestamptz default now(),
  unique(user_id, prompt_id)
);

create index if not exists saved_prompts_user_id_idx on public.saved_prompts(user_id);

-- ── 3. WAITLIST ───────────────────────────────────────────────────
create table if not exists public.waitlist (
  id         uuid default gen_random_uuid() primary key,
  email      text unique not null,
  created_at timestamptz default now()
);

-- ── 4. COPY EVENTS (analytics) ───────────────────────────────────
-- Optional: track which prompts get copied most (for "popular" sorting).
-- Call from client: supabase.from('copy_events').insert({ prompt_id, user_id })
create table if not exists public.copy_events (
  id         uuid default gen_random_uuid() primary key,
  prompt_id  text not null,
  user_id    uuid references auth.users on delete set null,
  copied_at  timestamptz default now()
);

create index if not exists copy_events_prompt_id_idx on public.copy_events(prompt_id);

-- ── 5. ROW LEVEL SECURITY ─────────────────────────────────────────
alter table public.profiles       enable row level security;
alter table public.saved_prompts  enable row level security;
alter table public.waitlist       enable row level security;
alter table public.copy_events    enable row level security;

-- profiles: users can read and update only their own row
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- saved_prompts: users manage their own saves only
create policy "Users can manage own saves"
  on public.saved_prompts for all using (auth.uid() = user_id);

-- waitlist: anyone can insert (public signup form)
create policy "Anyone can join waitlist"
  on public.waitlist for insert with check (true);

-- copy_events: anyone can insert, no reads via RLS (use service role to read)
create policy "Anyone can insert copy event"
  on public.copy_events for insert with check (true);

-- ── 6. FUTURE: STRIPE INTEGRATION ────────────────────────────────
-- When you add payments, add these columns to profiles:
--   stripe_customer_id   text unique
--   stripe_subscription_id text
--   plan_expires_at      timestamptz
--
-- And create a webhook handler at: src/pages/api/webhooks/stripe.js
