-- Create the public card archive, then enable row-level security.
create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  word text not null check (char_length(word) > 0 and char_length(word) <= 20 and word !~ '\s'),
  seed text not null,
  created_at timestamptz not null default now()
);

create index if not exists cards_created_at_idx on public.cards (created_at desc);

alter table public.cards enable row level security;

-- Anyone can read the wall.
create policy "Public can read cards"
on public.cards
for select
to anon, authenticated
using (true);

-- Anyone can add a card. No updates or deletes from the client.
create policy "Public can insert cards"
on public.cards
for insert
to anon, authenticated
with check (
  char_length(word) > 0
  and char_length(word) <= 20
  and word !~ '\s'
);

-- Optional: live updates for open visitors.
-- You can also toggle Realtime for public.cards in the Supabase dashboard.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'cards'
  ) then
    execute 'alter publication supabase_realtime add table public.cards';
  end if;
end $$;
