create index if not exists lux_agent_stripe_events_checkout_idx
  on public.lux_agent_stripe_events (checkout_id);

create policy "Checkout catalog blocks browser roles"
  on public.lux_agent_checkout_catalog
  as restrictive for all to anon, authenticated
  using (false) with check (false);

create policy "Checkout sessions block browser roles"
  on public.lux_agent_checkout_sessions
  as restrictive for all to anon, authenticated
  using (false) with check (false);

create policy "Entitlements block browser roles"
  on public.lux_agent_entitlements
  as restrictive for all to anon, authenticated
  using (false) with check (false);

create policy "Stripe events block browser roles"
  on public.lux_agent_stripe_events
  as restrictive for all to anon, authenticated
  using (false) with check (false);
