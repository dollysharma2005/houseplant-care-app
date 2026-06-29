-- Add is_favorite column to plants
alter table public.plants
  add column if not exists is_favorite boolean not null default false;

create index if not exists plants_user_id_is_favorite_idx
  on public.plants (user_id, is_favorite)
  where is_favorite = true;
