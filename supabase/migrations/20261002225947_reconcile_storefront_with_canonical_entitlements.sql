drop table if exists public.lux_agent_entitlements;

alter table public.lux_agent_checkout_sessions
  drop constraint if exists lux_agent_checkout_sessions_status_check;

alter table public.lux_agent_checkout_sessions
  add constraint lux_agent_checkout_sessions_status_check
  check (status in ('pending','checkout_created','paid','claimed','refunded','expired','canceled','failed'));

alter table public.lux_agent_checkout_sessions
  add column if not exists claimed_workspace_id uuid references public.lux_workspaces(id) on delete set null,
  add column if not exists claimed_at timestamptz;

create index if not exists lux_agent_checkout_sessions_claimed_workspace_idx
  on public.lux_agent_checkout_sessions (claimed_workspace_id)
  where claimed_workspace_id is not null;
