-- =============================================================
-- J Square Photography - Digital NFC Business Card Platform
-- Supabase SQL Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- =============================================================

-- 1. PROFILES TABLE
-- Linked to auth.users via id (uuid)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  email text not null,
  full_name text not null default '',
  job_title text default '',
  bio text default '',
  profile_photo_url text default '',
  cover_image_url text default '',
  phone text default '',
  whatsapp text default '',
  telegram text default '',
  contact_email text default '',
  instagram text default '',
  linkedin text default '',
  facebook text default '',
  tiktok text default '',
  youtube text default '',
  twitter text default '',
  behance text default '',
  accent_color text default '#000000',
  theme_preset text default 'minimal',
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. PORTFOLIO IMAGES TABLE
create table if not exists public.portfolio_images (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  image_url text not null,
  caption text default '',
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 3. EMBEDDED VIDEOS TABLE
create table if not exists public.embedded_videos (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  video_url text not null,
  title text default '',
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 4. UPLOADED FILES TABLE
create table if not exists public.uploaded_files (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  file_url text not null,
  file_name text not null,
  file_type text default 'application/pdf',
  file_size_bytes bigint default 0,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 5. CUSTOM LINKS TABLE
create table if not exists public.custom_links (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  url text not null,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- =============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================

alter table public.profiles enable row level security;
alter table public.portfolio_images enable row level security;
alter table public.embedded_videos enable row level security;
alter table public.uploaded_files enable row level security;
alter table public.custom_links enable row level security;

-- PROFILES: anyone can read published profiles, users can update their own
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (is_published = true);

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- PORTFOLIO IMAGES: public read (via published profile), owner CRUD
create policy "Portfolio images viewable via published profile"
  on public.portfolio_images for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = portfolio_images.profile_id
      and (profiles.is_published = true or profiles.id = auth.uid())
    )
  );

create policy "Users can manage own portfolio images"
  on public.portfolio_images for all
  using (auth.uid() = profile_id);

-- EMBEDDED VIDEOS: same pattern
create policy "Videos viewable via published profile"
  on public.embedded_videos for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = embedded_videos.profile_id
      and (profiles.is_published = true or profiles.id = auth.uid())
    )
  );

create policy "Users can manage own videos"
  on public.embedded_videos for all
  using (auth.uid() = profile_id);

-- UPLOADED FILES: same pattern
create policy "Files viewable via published profile"
  on public.uploaded_files for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = uploaded_files.profile_id
      and (profiles.is_published = true or profiles.id = auth.uid())
    )
  );

create policy "Users can manage own files"
  on public.uploaded_files for all
  using (auth.uid() = profile_id);

-- CUSTOM LINKS: same pattern
create policy "Links viewable via published profile"
  on public.custom_links for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = custom_links.profile_id
      and (profiles.is_published = true or profiles.id = auth.uid())
    )
  );

create policy "Users can manage own links"
  on public.custom_links for all
  using (auth.uid() = profile_id);

-- =============================================================
-- TRIGGERS
-- =============================================================

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, email, full_name)
  values (
    new.id,
    'user_' || substr(new.id::text, 1, 8),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at timestamp
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

-- =============================================================
-- STORAGE BUCKETS
-- Run these in SQL Editor or create manually in Storage dashboard
-- =============================================================

-- Note: Storage buckets are best created via the Supabase Dashboard:
-- 1. Go to Storage > New Bucket
-- 2. Create these buckets (all PUBLIC):
--    - profile-photos   (5MB max, images only)
--    - cover-images     (10MB max, images only)
--    - portfolio-images  (10MB max, images only)
--    - uploaded-files    (20MB max, PDFs only)
--
-- For each bucket, add these storage policies:
--
-- SELECT (read): Allow public access
--   (bucket_id = 'bucket-name')
--
-- INSERT (upload): Allow authenticated users to upload to their folder
--   (bucket_id = 'bucket-name' AND auth.uid()::text = (storage.foldername(name))[1])
--
-- DELETE: Allow users to delete from their folder
--   (bucket_id = 'bucket-name' AND auth.uid()::text = (storage.foldername(name))[1])

-- Alternatively, create buckets via SQL:
insert into storage.buckets (id, name, public) values ('profile-photos', 'profile-photos', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('cover-images', 'cover-images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('portfolio-images', 'portfolio-images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('uploaded-files', 'uploaded-files', true) on conflict (id) do nothing;

-- Storage policies: public read for all buckets
create policy "Public read for profile-photos" on storage.objects for select using (bucket_id = 'profile-photos');
create policy "Public read for cover-images" on storage.objects for select using (bucket_id = 'cover-images');
create policy "Public read for portfolio-images" on storage.objects for select using (bucket_id = 'portfolio-images');
create policy "Public read for uploaded-files" on storage.objects for select using (bucket_id = 'uploaded-files');

-- Storage policies: authenticated upload to own folder
create policy "Auth upload profile-photos" on storage.objects for insert with check (bucket_id = 'profile-photos' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth upload cover-images" on storage.objects for insert with check (bucket_id = 'cover-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth upload portfolio-images" on storage.objects for insert with check (bucket_id = 'portfolio-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth upload uploaded-files" on storage.objects for insert with check (bucket_id = 'uploaded-files' and auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: authenticated delete from own folder
create policy "Auth delete profile-photos" on storage.objects for delete using (bucket_id = 'profile-photos' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth delete cover-images" on storage.objects for delete using (bucket_id = 'cover-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth delete portfolio-images" on storage.objects for delete using (bucket_id = 'portfolio-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth delete uploaded-files" on storage.objects for delete using (bucket_id = 'uploaded-files' and auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: authenticated update (upsert) in own folder
create policy "Auth update profile-photos" on storage.objects for update using (bucket_id = 'profile-photos' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth update cover-images" on storage.objects for update using (bucket_id = 'cover-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth update portfolio-images" on storage.objects for update using (bucket_id = 'portfolio-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth update uploaded-files" on storage.objects for update using (bucket_id = 'uploaded-files' and auth.uid()::text = (storage.foldername(name))[1]);
