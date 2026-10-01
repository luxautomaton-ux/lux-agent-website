# Lux Customer Knowledge + Update Publishing

## Source of truth

**Lux Hermes Desktop Knowledge Articles is the staff source of truth.**

Published customer articles flow to:
1. Lux Agent Desktop — Company Brain / Knowledge
2. Lux Agent public website — Knowledge Center
3. Lux Agent Updates / What's New — linked release guidance
4. GitHub customer-content snapshots — outage/offline fallback

Draft or internal articles are never exposed through the customer feed.

## Staff article workflow

1. Open **Hermes Desktop → System → Knowledge Articles**.
2. Create or select an article.
3. Write the title, customer summary, product area, tags, and article body.
4. Save the draft.
5. Review the exact customer-facing content.
6. Choose **Publish to Customers** only when it is ready for public use.
7. Publishing requests the website/GitHub refresh automatically.
8. Use **Refresh Website / GitHub** only as the manual recovery path.

## What happens after Publish

Published content is immediately eligible through the Lux public customer API:

- `GET /portal/knowledge`
- `GET /portal/knowledge/:id`
- `GET /portal/updates`

Lux Agent Desktop and the website try the live Hermes/Core feed first.

If the live API is unavailable, they fall back to the latest GitHub-synced snapshot:
- `public/data/hermes-knowledge-snapshot.json`
- `public/data/hermes-updates-snapshot.json`

The website also retains built-in starter guides so a temporary service outage never leaves a customer with a blank help center.

## GitHub refresh and deploy

Workflow:
`.github/workflows/sync-customer-content.yml`

It can run:
- manually from GitHub Actions
- on its scheduled twice-hourly refresh
- immediately when Hermes requests a workflow dispatch and the backend GitHub token is configured

When the synced snapshots change, the workflow commits them to the repository. A push to `main` triggers the existing GitHub Pages deployment workflow.

## GitHub / backend configuration

Recommended GitHub repository variable:
- `LUX_SUPPORT_API_URL=https://lux-agent-api-337560675313.us-west1.run.app`

Optional backend environment variables for immediate workflow dispatch:
- `GITHUB_CONTENT_SYNC_TOKEN`
- `GITHUB_CONTENT_REPO=luxautomaton-ux/lux-agent-website`
- `GITHUB_CONTENT_SYNC_BRANCH=main`

The GitHub token belongs only in the backend secret store. Never put it in website JavaScript, Knowledge Articles, release packets, screenshots, or customer downloads.

## Release/update workflow

For each customer-facing release:
1. Verify the release candidate.
2. Prepare the customer release summary.
3. Create or update the Knowledge Articles that explain changed behavior.
4. Publish the approved articles.
5. Publish the customer release/update feed entry.
6. Confirm the website/GitHub sync request.
7. Confirm the public website shows the release and related articles.
8. Confirm Lux Agent Desktop's update window links to the Updates / Knowledge experience.
9. Only then treat customer documentation as complete.

Approved release packets may also be dropped into the backend customer-release inbox with `publish: true`. The Core watcher checks that inbox every 15 minutes.

## Support-to-Knowledge loop

Resolved customer cases can create Knowledge Article drafts.

The support team should:
1. resolve the case with clear verification notes;
2. review the generated draft;
3. remove customer-private information;
4. rewrite it as a reusable customer guide;
5. publish it only when the article is accurate and safe;
6. let the automatic website sync run.

A daily Knowledge Gap review uses recent no-result customer searches to identify missing or weak help content.

## Safety rules

- Never publish passwords, API keys, recovery codes, private customer data, internal-only playbooks, or admin tokens.
- Public endpoints expose published articles only.
- Hermes staff/admin endpoints remain authenticated.
- Support case public status lookup requires both the case ID and matching customer email and returns only customer-safe fields.
- Public case mutation is disabled; staff manages case state through Hermes.
- The public website never receives the Hermes admin token.

## Manual recovery checklist

If a customer says a newly published article is missing:
1. Check Hermes: article is actually **Published**, not Draft.
2. Check the public Lux API `/portal/knowledge`.
3. In Hermes Knowledge Articles, choose **Refresh Website / GitHub**.
4. In GitHub: **Actions → Sync Hermes customer content → Run workflow**.
5. Confirm the snapshot commit reached `main`.
6. Confirm **Deploy to GitHub Pages** completed.
7. Refresh the website Knowledge page and Lux Agent Desktop Knowledge panel.
