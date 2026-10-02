# Lux Agent Launch Backend

## Canonical purchase path

1. Build My Lux selects the core team, one optional Success Pack, optional Memory Packs, install target, and optional premium team customization.
2. The static website calls the public `lux-agent-checkout` Edge Function.
3. Checkout refuses to create a charge unless all three launch gates are present:
   - `STRIPE_SECRET_KEY`
   - `LUX_AGENT_CHECKOUT_ALLOWED_ORIGINS`
   - every requested catalog item is active and has an approved Stripe Price ID
4. Stripe Checkout redirects the customer to the configured success/cancel route.
5. Stripe sends signed events to `lux-agent-stripe-webhook`. The webhook only marks the checkout paid/expired and records the event.
6. The authenticated customer claims the paid order into a workspace through `lux-agent-claim-order`.
7. Claiming grants the canonical `lux_entitlements` rows to that workspace. A checkout cannot be claimed by another email/workspace.
8. `lux-agent-signed-setup` verifies workspace membership + active entitlements and produces the signed setup bundle for Lux Agent Desktop.
9. Lux Agent Desktop verifies the signature, shows the pending setup to the customer, and records installation separately.

## Authority boundaries

- Browser clients cannot read or mutate checkout sessions, Stripe events, or signing records directly.
- The Stripe webhook never grants workspace entitlements.
- A paid order is not install authority until an authenticated workspace claims it.
- Signed setup issuance is separate from payment and requires entitlements.
- Public checkout remains fail-closed until launch pricing and server secrets are intentionally activated.
- Local `/checkout/mock-pay` is synthetic acceptance only. It never calls Stripe or creates a production entitlement.

## Migration ledger

Local migration filenames intentionally match the migration versions already recorded in the shared production Supabase project:

- `20261002223704_create_lux_agent_checkout_backbone.sql`
- `20261002223729_harden_lux_agent_checkout_backbone.sql`
- `20261002225553_seed_lux_agent_checkout_catalog_inactive.sql`
- `20261002225920_lux_agent_cloud_core.sql`
- `20261002225947_reconcile_storefront_with_canonical_entitlements.sql`
- `20261002230311_harden_lux_agent_cloud_core.sql`
- `20261002231037_closeout_least_privilege_lux_cloud_core.sql`
- `20261002231127_lux_agent_setup_signing_key_registry.sql`
- `20261002231215_lux_agent_signed_setup_issuances.sql`
- `20261002232203_closeout_harden_setup_signing_registry.sql`

The cloud-core hardening/least-privilege end state is consolidated into the `225920` source migration for clean-environment reproducibility; later version files are retained for migration-ledger parity.

## Launch activation gates

Do not activate these early.

1. Approve the final Lux Agent price catalog.
2. Create the matching Stripe Products/Prices and place only their Price IDs into `lux_agent_checkout_catalog`.
3. Keep every catalog row inactive until its price, product scope, and fulfillment path are approved.
4. Configure Edge Function secrets:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SIGNING_SECRET`
   - `LUX_AGENT_CHECKOUT_ALLOWED_ORIGINS`
5. Configure the Lux Agent setup-signing private key under the existing secure signing-key contract. Never commit the private key.
6. Enable compromised-password protection before public customer authentication is opened.
7. Run `npm run test:day-one`, `npm run lint`, and `npm run build`.
8. Run a Stripe test-mode purchase through payment → webhook → authenticated order claim → entitlement → signed setup.
9. Only after those receipts pass, switch approved catalog rows/live Stripe credentials and run one controlled live founder purchase.

## Current pre-launch expected state

- Checkout endpoint: deployed, but `chargesAllowed=false`.
- Stripe webhook: deployed, but signing secret is not active.
- Catalog: seeded but inactive.
- Payment / entitlement / signed-issuance tables: empty before the first controlled purchase.
- Day-One synthetic matrix: expected to pass while production charges remain disabled.
