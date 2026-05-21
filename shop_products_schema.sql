-- ============================================
-- TABLA: shop_products
-- ============================================
create table if not exists public.shop_products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null,
  tab text not null check (tab in ('suplementos', 'indumentaria')),
  description text,
  features text[] default '{}',
  image_url text,
  sort_order integer default 0,
  created_at timestamp with time zone default now()
);

-- Habilitar RLS
alter table public.shop_products enable row level security;

-- SELECT: Todos pueden ver los productos
create policy "Productos visibles para todos"
  on public.shop_products for select
  using (true);

-- INSERT: Solo admins
create policy "Solo admins pueden crear productos"
  on public.shop_products for insert
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- UPDATE: Solo admins
create policy "Solo admins pueden editar productos"
  on public.shop_products for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- DELETE: Solo admins
create policy "Solo admins pueden eliminar productos"
  on public.shop_products for delete
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- STORAGE: bucket shop_images
-- ============================================
insert into storage.buckets (id, name, public)
values ('shop_images', 'shop_images', true)
on conflict (id) do nothing;

-- SELECT: Todos pueden ver las imagenes
create policy "Imagenes de tienda visibles para todos"
  on storage.objects for select
  using (bucket_id = 'shop_images');

-- INSERT: Solo admins pueden subir
create policy "Solo admins pueden subir imagenes de tienda"
  on storage.objects for insert
  with check (
    bucket_id = 'shop_images'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- UPDATE: Solo admins pueden actualizar
create policy "Solo admins pueden actualizar imagenes de tienda"
  on storage.objects for update
  using (
    bucket_id = 'shop_images'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- DELETE: Solo admins pueden eliminar
create policy "Solo admins pueden eliminar imagenes de tienda"
  on storage.objects for delete
  using (
    bucket_id = 'shop_images'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
