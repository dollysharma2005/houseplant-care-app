-- HomePlant initial schema: profiles, plants, RLS, auth trigger

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- plants
-- ---------------------------------------------------------------------------
create table public.plants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  plant_name text not null,
  species text,
  room text,
  status text not null default 'healthy',
  notes text,
  created_at timestamptz not null default now()
);

create index plants_user_id_idx on public.plants (user_id);

alter table public.plants enable row level security;

create policy "Users can read own plants"
  on public.plants
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own plants"
  on public.plants
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own plants"
  on public.plants
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own plants"
  on public.plants
  for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- auto-create profile on sign-up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
