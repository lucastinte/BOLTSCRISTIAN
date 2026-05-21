-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'member', -- 'admin' or 'member'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for content (videos/PDFs)
create table content (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type text not null check (type in ('pdf', 'video_link', 'link')),
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for content
alter table content enable row level security;

-- Everyone can view content
create policy "Content is viewable by everyone" on content
  for select using (true);

-- Only admins can insert/update/delete content
-- Note: This requires a trigger or manual check in the policy using the profiles table.
-- For simplicity in this script, we'll allow authenticated users to view, 
-- but strictly enforce admin-only write via application logic + RLS if possible.
-- Checking admin role in RLS:
create policy "Admins can insert content" on content
  for insert with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Admins can update content" on content
  for update using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Admins can delete content" on content
  for delete using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Create a storage bucket for PDFs
insert into storage.buckets (id, name, public) 
values ('members_content', 'members_content', true);

-- Storage policies
create policy "Any user can view storage objects"
  on storage.objects for select
  using ( bucket_id = 'members_content' );

create policy "Admins can upload storage objects"
  on storage.objects for insert
  with check (
    bucket_id = 'members_content' 
    and exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
