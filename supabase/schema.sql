-- Supabase Dashboard → SQL Editor → New query → вставьте ВЕСЬ файл → Run
-- Прямая ссылка: https://supabase.com/dashboard/project/jdhuierlzbfmthrupdpo/sql/new

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  site text not null check (char_length(trim(site)) between 2 and 64),
  author text not null check (char_length(trim(author)) between 2 and 40),
  body text not null check (char_length(trim(body)) between 10 and 2000),
  score int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists comments_site_created_idx
  on public.comments (site, created_at desc);

create table if not exists public.comment_votes (
  comment_id uuid not null references public.comments (id) on delete cascade,
  fingerprint text not null,
  value smallint not null check (value in (-1, 1)),
  primary key (comment_id, fingerprint)
);

create or replace function public.refresh_comment_score(p_comment_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.comments c
  set score = coalesce((
    select sum(v.value)::int
    from public.comment_votes v
    where v.comment_id = p_comment_id
  ), 0)
  where c.id = p_comment_id;
end;
$$;

create or replace function public.vote_comment(p_comment_id uuid, p_fingerprint text, p_value smallint)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_value not in (-1, 1) then
    raise exception 'invalid vote';
  end if;

  insert into public.comment_votes (comment_id, fingerprint, value)
  values (p_comment_id, p_fingerprint, p_value)
  on conflict (comment_id, fingerprint)
  do update set value = excluded.value;

  perform public.refresh_comment_score(p_comment_id);
end;
$$;

alter table public.comments enable row level security;
alter table public.comment_votes enable row level security;

drop policy if exists "comments_select" on public.comments;
create policy "comments_select" on public.comments for select using (true);

drop policy if exists "comments_insert" on public.comments;
create policy "comments_insert" on public.comments for insert with check (true);

drop policy if exists "votes_select" on public.comment_votes;
create policy "votes_select" on public.comment_votes for select using (true);

drop policy if exists "votes_insert" on public.comment_votes;
create policy "votes_insert" on public.comment_votes for insert with check (true);

drop policy if exists "votes_update" on public.comment_votes;
create policy "votes_update" on public.comment_votes for update using (true);

grant usage on schema public to anon, authenticated, service_role;
grant select, insert on public.comments to anon, authenticated, service_role;
grant select, insert, update on public.comment_votes to anon, authenticated, service_role;
grant execute on function public.vote_comment(uuid, text, smallint) to anon, authenticated, service_role;
