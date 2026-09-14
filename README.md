# The Hub

A student committee campaign page. Visitors enter The Hub, describe themselves in one word, and receive a unique archive-style card. Every card is saved and stays on the wall for the next person who walks in.

This is an MVP: no login, no AI image generation, and no dragging. Cards are generated in the browser from a deterministic seed.

## Run locally

```bash
npm install
cp .env.example .env.local
# add your Supabase values, or leave them blank to use a local browser archive
npm run dev
```

Open [http://127.0.0.1:43147](http://127.0.0.1:43147).

Without Supabase keys, cards are stored in `localStorage` so you can still click through the full experience. They will not be shared with other visitors until you connect a project.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. Confirm **Authentication → Providers** can stay unused. This app is anonymous.
4. Copy the project URL and **anon public** key from **Project Settings → API**.
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

## Environment variables

Put these in `.env.local` for local development:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

`NEXT_PUBLIC_` values are exposed to the browser on purpose. Only the anon key belongs here.

On Vercel, add the same two variables in **Project Settings → Environment Variables**.

## Push to GitHub

```bash
git add .
git commit -m "Add The Hub campaign page"
git branch -M main
git remote add origin https://github.com/your-user/the-hub.git
git push -u origin main
```

Skip `git remote add` if the remote already exists.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: Next.js.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Deploy.

After the first deploy, open the site on a phone. The entrance house should stay centered, the card wall should scroll, and the input should remain above the mobile browser chrome.

## What it does

1. Black entrance with a glowing blue house.
2. Click or tap the house to enter the dark green card room.
3. Submit one word (max 20 characters, no spaces or markup).
4. A unique SVG card is generated from the word plus the record id.
5. The card is inserted into Supabase and appears on the wall.

Common words such as curious, calm, bold, creative, and analytical lean toward related motifs. Every other word still gets a coherent card from the seeded visual system.
