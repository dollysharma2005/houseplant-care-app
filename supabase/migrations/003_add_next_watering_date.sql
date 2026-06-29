-- Add next_watering_date column to plants
alter table public.plants
  add column if not exists next_watering_date date;

create index if not exists plants_user_id_next_watering_date_idx
  on public.plants (user_id, next_watering_date);
