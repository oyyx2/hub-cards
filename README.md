# The Hub

A student committee campaign page. Visitors enter The Hub, describe themselves in one word, and that word becomes a unique leaf on a shared vine. Every word is saved and stays on the vine for the next person who walks in.

This is an MVP: no login, no AI image generation. Leaf shapes are generated in the browser from a deterministic seed.

## Run locally

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` with your Supabase values, or leave them blank to use a local browser archive.

```bash
npm run dev
```

Open [http://127.0.0.1:43147](http://127.0.0.1:43147). The growing-vine prototype is at [http://127.0.0.1:43147/vine-demo](http://127.0.0.1:43147/vine-demo).

Without Supabase keys, words are stored in `localStorage`. They will not be shared with other visitors until you connect a project.

```bash
npm run build
npm run start
```

## Environment variables

Only these two values are required. Both are safe to expose in the browser. Never add the Supabase **service role** key.

| Name | Where to find it | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → Data API → Project URL | `https://abcd1234.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API Keys → `anon` `public` | long JWT starting with `eyJ` |

Local file: `.env.local` (gitignored; copy from `.env.example`).

Vercel: Project Settings → Environment Variables. Add both for **Production**, **Preview**, and **Development**, then redeploy.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. Leave authentication unused. This app is anonymous.
4. Copy the project URL and **anon public** key.
5. Do **not** put the service role key in this app.

The SQL file creates:

- table `public.cards` with `id`, `word`, `seed`, `created_at`
- row level security
- public `SELECT` and `INSERT`
- no public `UPDATE` or `DELETE`
- optional realtime publication for new cards

### Table

```sql
create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  word text not null check (char_length(word) > 0 and char_length(word) <= 20 and word !~ '\s'),
  seed text not null,
  created_at timestamptz not null default now()
);
```

### RLS policies

```sql
alter table public.cards enable row level security;

create policy "Public can read cards"
on public.cards
for select
to anon, authenticated
using (true);

create policy "Public can insert cards"
on public.cards
for insert
to anon, authenticated
with check (
  char_length(word) > 0
  and char_length(word) <= 20
  and word !~ '\s'
);
```

Leave update and delete policies off so the public client cannot change or remove cards.

### Realtime (optional)

In **Database → Publications**, make sure `cards` is part of `supabase_realtime`. The schema file does this automatically when possible.

## Push to GitHub

This project is already a git repo on `main`. If you are working in Cursor’s New Project flow, create the GitHub repository first:

1. In the Cursor agent view, click **Create repo**.
2. Choose the GitHub account and a public name such as `the-hub`.
3. Create the repository.

After that remote exists, push:

```bash
git branch -M main
git push -u origin main
```

If you created an empty GitHub repo yourself and need to point this project at it:

```bash
git remote add github https://github.com/YOUR_GITHUB_USERNAME/the-hub.git
git push -u github main
```

Replace `YOUR_GITHUB_USERNAME` and `the-hub` with your account and repo name. Use a GitHub personal access token as the password if GitHub asks you to sign in.

## Deploy to Vercel

1. Sign in at [vercel.com](https://vercel.com) with the same GitHub account.
2. Open [vercel.com/new](https://vercel.com/new).
3. Click **Import** next to the `the-hub` GitHub repository.
4. Framework Preset: **Next.js**. Leave the build command and output directory as the defaults (`next build`, no extra output dir).
5. Open **Environment Variables** and add:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   Add each one for Production, Preview, and Development.
6. Click **Deploy**.
7. Wait for the build to turn green. Copy the URL, which looks like `https://the-hub-xxxx.vercel.app`.

If you change env vars later, go to **Settings → Environment Variables**, save, then **Deployments → ⋮ → Redeploy**. `NEXT_PUBLIC_` values are baked in at build time, so a redeploy is required.

### After deploy, verify

1. Open the Vercel URL on desktop. Click the house, choose **Leave Your Mark**, add a word, confirm a leaf appears.
2. Refresh. The same leaf should still be there (this proves Supabase, not only local storage).
3. Open the same URL on a phone. The house should stay centered, the vine should scroll, and the input should stay visible.
4. Add a second word on the phone, refresh, and confirm both leaves remain.
5. Use that Vercel URL for the QR code.

If leaves disappear after refresh, the Vercel env vars are missing or the Supabase SQL has not been run.

## What it does

1. Black entrance with a glowing blue house.
2. Click or tap the house to enter The Hub navigation.
3. Choose **Leave Your Mark** to grow the shared vine, **Explore Our Plan** to draw from the year-plan deck, or **Meet The Team**.
4. On the vine: submit one word (max 20 characters, no spaces or markup). It is saved with the existing `cards` flow and becomes a unique leaf.
5. In the annual plan: draw a card, read it, then draw another until every activity has been seen.

The annual-plan deck and team module are local static content. One-word leaves still use Supabase (or a local archive if keys are missing). The previous personality-card components remain in the repo but are no longer opened from Hub navigation.

Temporary isolated demo routes:

- `/plan-demo` — annual-plan deck
- `/team-demo` — Meet The Team
- `/vine-demo` — the same vine experience, kept for comparison/debugging

Common words such as curious, calm, bold, creative, and analytical lean toward related motifs. Every other word still gets a coherent card from the seeded visual system.
