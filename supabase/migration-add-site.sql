-- Если таблица comments уже была без колонки site — выполните этот файл в SQL Editor.

alter table public.comments
  add column if not exists site text;

update public.comments
set site = 'plinko-slot'
where site is null or trim(site) = '';

alter table public.comments
  alter column site set not null;

alter table public.comments
  drop constraint if exists comments_site_check;

alter table public.comments
  add constraint comments_site_check check (char_length(trim(site)) between 2 and 64);

create index if not exists comments_site_created_idx
  on public.comments (site, created_at desc);
