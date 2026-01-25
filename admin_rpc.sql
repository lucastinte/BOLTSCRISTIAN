-- Function to allowing promoting yourself to admin IF you know the secret code
-- This avoids having to edit the database manually or exposing insecure RLS policies.

create or replace function claim_admin_role(secret_code text)
returns void
language plpgsql
security definer -- Runs with superuser privileges
as $$
begin
  -- HARDCODED SECRET CODE: 'BOLTS2024'
  if secret_code = 'BOLTS2024' then
    update public.profiles
    set role = 'admin'
    where id = auth.uid();
  else
    raise exception 'Invalid secret code';
  end if;
end;
$$;
