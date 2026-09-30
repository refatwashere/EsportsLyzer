# Supabase Auth + Favorites Setup

## 1. Create project
1. Go to https://supabase.com → New Project (free tier is fine)
2. Copy **Project URL** and **anon public** key → put in `frontend/.env.local`
3. Only if using privileged backend operations, put the **service_role** key in `backend/.env` and keep it secret. Never expose it to the frontend.

## 2. Run this SQL in Supabase SQL Editor

```sql
-- Users are handled by auth.users automatically

create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  sport text not null,
  match_id text not null,
  home_team text,
  away_team text,
  created_at timestamp with time zone default now(),
  unique(user_id, sport, match_id)
);

alter table favorites enable row level security;

create policy "Users can manage own favorites"
  on favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

## 3. Enable Email Auth
Dashboard → Authentication → Providers → Email → Enable

## 4. Restart backend + frontend
The AuthPanel on the homepage will now work.

The sign-in and favorites UI use the Supabase browser client directly; row-level security protects the `favorites` table. `backend/services/supabase.js` contains helper functions but is not currently mounted as an API route.
