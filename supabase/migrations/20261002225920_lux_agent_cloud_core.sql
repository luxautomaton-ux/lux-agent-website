create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create table if not exists public.lux_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lux_workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,62}$'),
  owner_user_id uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists lux_workspaces_owner_user_idx on public.lux_workspaces(owner_user_id);

create table if not exists public.lux_workspace_members (
  workspace_id uuid not null references public.lux_workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','member','viewer')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);
create index if not exists lux_workspace_members_user_idx on public.lux_workspace_members(user_id);

create table if not exists public.lux_contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.lux_workspaces(id) on delete cascade,
  client_id text,
  name text not null default '',
  company text not null default '',
  email text not null default '',
  phone text not null default '',
  job_title text not null default '',
  website text not null default '',
  location text not null default '',
  source text not null default '',
  stage text not null default 'New' check (stage in ('New','Contacted','Qualified','Proposal','Won','Lost')),
  estimated_value_cents bigint not null default 0 check (estimated_value_cents >= 0),
  next_follow_up date,
  notes text not null default '',
  tags text[] not null default '{}',
  warmconnect_id text,
  archived boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, client_id)
);
create unique index if not exists lux_contacts_workspace_email_unique
  on public.lux_contacts(workspace_id, lower(email)) where email <> '';
create index if not exists lux_contacts_workspace_stage on public.lux_contacts(workspace_id, stage);
create index if not exists lux_contacts_created_by_idx on public.lux_contacts(created_by);
create table if not exists public.lux_desk_records (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.lux_workspaces(id) on delete cascade,
  client_id text,
  desk_path text not null check (desk_path like '/lux-%'),
  title text not null check (char_length(title) between 1 and 240),
  owner_label text not null default '',
  due_date date,
  state text not null,
  fields jsonb not null default '{}'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  archived boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  updated_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, desk_path, client_id)
);
create index if not exists lux_desk_workspace_path on public.lux_desk_records(workspace_id, desk_path);
create index if not exists lux_desk_records_created_by_idx on public.lux_desk_records(created_by);
create index if not exists lux_desk_records_updated_by_idx on public.lux_desk_records(updated_by);

create table if not exists public.lux_entitlements (
  workspace_id uuid not null references public.lux_workspaces(id) on delete cascade,
  product_key text not null,
  status text not null check (status in ('active','trialing','past_due','canceled','expired')),
  source text not null check (source in ('stripe','manual')),
  source_ref text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now(),
  primary key (workspace_id, product_key)
);
create index if not exists lux_entitlements_workspace_status on public.lux_entitlements(workspace_id, status);

create table if not exists public.lux_billing_customers (
  workspace_id uuid primary key references public.lux_workspaces(id) on delete cascade,
  stripe_customer_id text not null unique,
  updated_at timestamptz not null default now()
);

create table if not exists public.lux_billing_events (
  provider text not null check (provider = 'stripe'),
  event_id text primary key,
  event_type text not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  outcome text,
  payload_sha256 text not null
);

alter table public.lux_profiles enable row level security;
alter table public.lux_workspaces enable row level security;
alter table public.lux_workspace_members enable row level security;
alter table public.lux_contacts enable row level security;
alter table public.lux_desk_records enable row level security;
alter table public.lux_entitlements enable row level security;
alter table public.lux_billing_customers enable row level security;
alter table public.lux_billing_events enable row level security;

create or replace function private.lux_is_workspace_member(target_workspace uuid)
returns boolean
language sql stable security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.lux_workspace_members m
    where m.workspace_id = target_workspace
      and m.user_id = (select auth.uid())
  )
$$;

create or replace function private.lux_can_edit_workspace(target_workspace uuid)
returns boolean
language sql stable security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.lux_workspace_members m
    where m.workspace_id = target_workspace
      and m.user_id = (select auth.uid())
      and m.role in ('owner','admin','member')
  )
$$;

revoke all on function private.lux_is_workspace_member(uuid) from public, anon, service_role;
revoke all on function private.lux_can_edit_workspace(uuid) from public, anon, service_role;
grant execute on function private.lux_is_workspace_member(uuid) to authenticated;
grant execute on function private.lux_can_edit_workspace(uuid) to authenticated;
create policy "profile self read" on public.lux_profiles for select to authenticated
  using (user_id = (select auth.uid()));
create policy "profile self insert" on public.lux_profiles for insert to authenticated
  with check (user_id = (select auth.uid()));
create policy "profile self update" on public.lux_profiles for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "workspace owners create" on public.lux_workspaces for insert to authenticated
  with check (owner_user_id = (select auth.uid()));
create policy "workspace members read" on public.lux_workspaces for select to authenticated
  using (private.lux_is_workspace_member(id));
create policy "workspace admins update" on public.lux_workspaces for update to authenticated
  using (private.lux_can_edit_workspace(id))
  with check (private.lux_can_edit_workspace(id));

create policy "membership members read" on public.lux_workspace_members for select to authenticated
  using (private.lux_is_workspace_member(workspace_id));
create policy "membership owner insert" on public.lux_workspace_members for insert to authenticated
  with check (exists (
    select 1 from public.lux_workspaces w
    where w.id = lux_workspace_members.workspace_id
      and w.owner_user_id = (select auth.uid())
  ));
create policy "membership owner update" on public.lux_workspace_members for update to authenticated
  using (exists (
    select 1 from public.lux_workspaces w
    where w.id = lux_workspace_members.workspace_id
      and w.owner_user_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.lux_workspaces w
    where w.id = lux_workspace_members.workspace_id
      and w.owner_user_id = (select auth.uid())
  ));
create policy "membership owner delete" on public.lux_workspace_members for delete to authenticated
  using (exists (
    select 1 from public.lux_workspaces w
    where w.id = lux_workspace_members.workspace_id
      and w.owner_user_id = (select auth.uid())
  ));

create policy "contacts members read" on public.lux_contacts for select to authenticated
  using (private.lux_is_workspace_member(workspace_id));
create policy "contacts editors insert" on public.lux_contacts for insert to authenticated
  with check (private.lux_can_edit_workspace(workspace_id) and created_by = (select auth.uid()));
create policy "contacts editors update" on public.lux_contacts for update to authenticated
  using (private.lux_can_edit_workspace(workspace_id))
  with check (private.lux_can_edit_workspace(workspace_id));
create policy "contacts admins delete" on public.lux_contacts for delete to authenticated
  using (exists (
    select 1 from public.lux_workspace_members m
    where m.workspace_id = lux_contacts.workspace_id
      and m.user_id = (select auth.uid())
      and m.role in ('owner','admin')
  ));

create policy "desk members read" on public.lux_desk_records for select to authenticated
  using (private.lux_is_workspace_member(workspace_id));
create policy "desk editors insert" on public.lux_desk_records for insert to authenticated
  with check (
    private.lux_can_edit_workspace(workspace_id)
    and created_by = (select auth.uid())
    and updated_by = (select auth.uid())
  );
create policy "desk editors update" on public.lux_desk_records for update to authenticated
  using (private.lux_can_edit_workspace(workspace_id))
  with check (private.lux_can_edit_workspace(workspace_id) and updated_by = (select auth.uid()));
create policy "desk admins delete" on public.lux_desk_records for delete to authenticated
  using (exists (
    select 1 from public.lux_workspace_members m
    where m.workspace_id = lux_desk_records.workspace_id
      and m.user_id = (select auth.uid())
      and m.role in ('owner','admin')
  ));

create policy "entitlements members read" on public.lux_entitlements for select to authenticated
  using (private.lux_is_workspace_member(workspace_id));
create policy "billing customer members read" on public.lux_billing_customers for select to authenticated
  using (private.lux_is_workspace_member(workspace_id));
create policy "billing events block clients" on public.lux_billing_events
  as restrictive for all to anon, authenticated using (false) with check (false);
revoke all on table public.lux_profiles from public, anon, authenticated;
revoke all on table public.lux_workspaces from public, anon, authenticated;
revoke all on table public.lux_workspace_members from public, anon, authenticated;
revoke all on table public.lux_contacts from public, anon, authenticated;
revoke all on table public.lux_desk_records from public, anon, authenticated;
revoke all on table public.lux_entitlements from public, anon, authenticated;
revoke all on table public.lux_billing_customers from public, anon, authenticated;
revoke all on table public.lux_billing_events from public, anon, authenticated;

grant select, insert, update on table public.lux_profiles to authenticated;
grant select, insert, update on table public.lux_workspaces to authenticated;
grant select, insert, update, delete on table public.lux_workspace_members to authenticated;
grant select, insert, update, delete on table public.lux_contacts to authenticated;
grant select, insert, update, delete on table public.lux_desk_records to authenticated;
grant select on table public.lux_entitlements to authenticated;
grant select on table public.lux_billing_customers to authenticated;

grant all on table public.lux_profiles to service_role;
grant all on table public.lux_workspaces to service_role;
grant all on table public.lux_workspace_members to service_role;
grant all on table public.lux_contacts to service_role;
grant all on table public.lux_desk_records to service_role;
grant all on table public.lux_entitlements to service_role;
grant all on table public.lux_billing_customers to service_role;
grant all on table public.lux_billing_events to service_role;

create or replace function public.lux_create_workspace(workspace_name text, workspace_slug text)
returns uuid
language plpgsql
set search_path = public, pg_temp
as $$
declare new_id uuid;
begin
  if (select auth.uid()) is null then raise exception 'authentication required'; end if;
  insert into public.lux_workspaces(name, slug, owner_user_id)
  values (workspace_name, workspace_slug, (select auth.uid()))
  returning id into new_id;
  insert into public.lux_workspace_members(workspace_id, user_id, role)
  values (new_id, (select auth.uid()), 'owner');
  return new_id;
end;
$$;
revoke all on function public.lux_create_workspace(text,text) from public, anon;
grant execute on function public.lux_create_workspace(text,text) to authenticated, service_role;
