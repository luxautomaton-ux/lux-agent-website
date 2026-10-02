create table if not exists public.lux_agent_signing_keys (
  key_id text primary key,
  algorithm text not null check (algorithm = 'Ed25519'),
  public_key_spki_b64 text not null,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  retired_at timestamptz
);
alter table public.lux_agent_signing_keys enable row level security;
revoke all on table public.lux_agent_signing_keys from public, anon, authenticated;
grant select, insert, update, delete on table public.lux_agent_signing_keys to service_role;
create policy "signing keys block browser roles" on public.lux_agent_signing_keys
  as restrictive for all to anon, authenticated using (false) with check (false);

create or replace function public.lux_agent_get_signing_secret(secret_name text)
returns text language sql stable security definer
set search_path = vault, public, pg_temp
as $$
  select decrypted_secret from vault.decrypted_secrets
  where name = secret_name limit 1
$$;
revoke all on function public.lux_agent_get_signing_secret(text) from public, anon, authenticated;
grant execute on function public.lux_agent_get_signing_secret(text) to service_role;

insert into public.lux_agent_signing_keys(key_id, algorithm, public_key_spki_b64, active)
values ('lux-agent-setup-ed25519-v1', 'Ed25519', 'MCowBQYDK2VwAyEAfpWINKBeji47m0klGLWqZx/XTqHxSy5Khab7NCozFe0=', true)
on conflict (key_id) do update set public_key_spki_b64=excluded.public_key_spki_b64, active=true, retired_at=null;
