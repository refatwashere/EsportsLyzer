# Supabase Auth + Favorites Setup

## 1. Create the project
1. Go to https://supabase.com → New Project (free tier is fine)
2. Copy the **Project URL** and **anon public** key into `frontend/.env.local`
3. Only if you need privileged backend operations, add the **service_role** key to `backend/.env` and keep it secret. Never expose it to the frontend.

Example frontend values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Example backend values:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 2. Run this SQL in the Supabase SQL Editor

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

## 3. Enable email auth
Dashboard → Authentication → Providers → Email → Enable

## 4. Restart the app
Restart both the frontend and backend after saving the environment values. The auth panel on the homepage will then enable sign-in and favorites.

## 5. Operational notes
- The browser client is used for UI auth and favorites. Row-level security protects the `favorites` table.
- The backend helper in `backend/services/supabase.js` is ready for admin operations, but it is not mounted as a public route yet.
- If the keys are missing, the UI now shows a clear setup message instead of failing unexpectedly.
