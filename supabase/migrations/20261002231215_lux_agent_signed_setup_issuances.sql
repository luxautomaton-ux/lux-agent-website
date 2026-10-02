create table if not exists public.lux_agent_setup_issuances (
  id uuid primary key default gen_random_uuid(),
  checkout_id uuid not null references public.lux_agent_checkout_sessions(id) on delete restrict,
  workspace_id uuid not null references public.lux_workspaces(id) on delete restrict,
  setup_hash text not null check (setup_hash ~ '^[a-f0-9]{64}$'),
  key_id text not null references public.lux_agent_signing_keys(key_id) on delete restrict,
  payload_hash text not null check (payload_hash ~ '^[a-f0-9]{64}$'),
  issued_at timestamptz not null default now(),
  unique(checkout_id, workspace_id, setup_hash, key_id)
);
create index if not exists lux_agent_setup_issuances_workspace_idx on public.lux_agent_setup_issuances(workspace_id, issued_at desc);
alter table public.lux_agent_setup_issuances enable row level security;
revoke all on table public.lux_agent_setup_issuances from public, anon, authenticated;
grant select, insert, update, delete on table public.lux_agent_setup_issuances to service_role;
create policy "setup issuances block browser roles" on public.lux_agent_setup_issuances
  as restrictive for all to anon, authenticated using (false) with check (false);
