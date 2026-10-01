import fs from 'node:fs/promises'
import path from 'node:path'

const DEFAULT_API = 'https://lux-agent-api-337560675313.us-west1.run.app'
const api = String(process.env.LUX_SUPPORT_API_URL || DEFAULT_API).replace(/\/$/, '')
const root = process.cwd()
const dataDir = path.join(root, 'public', 'data')

async function getJson(url) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`)
  }
  return response.json()
}

function stableSort(items, key) {
  return [...items].sort((a, b) => String(b?.[key] || '').localeCompare(String(a?.[key] || '')))
}

await fs.mkdir(dataDir, { recursive: true })

try {
  const [knowledgePayload, updatesPayload] = await Promise.all([
    getJson(api + '/portal/knowledge?limit=100'),
    getJson(api + '/portal/updates'),
  ])

  const articles = Array.isArray(knowledgePayload?.articles)
    ? stableSort(knowledgePayload.articles, 'updated_at')
    : []
  const updates = Array.isArray(updatesPayload?.updates)
    ? stableSort(updatesPayload.updates, 'date')
    : []

  const syncedAt = new Date().toISOString()

  await fs.writeFile(
    path.join(dataDir, 'hermes-knowledge-snapshot.json'),
    JSON.stringify({ syncedAt, count: articles.length, articles }, null, 2) + '\n',
  )
  await fs.writeFile(
    path.join(dataDir, 'hermes-updates-snapshot.json'),
    JSON.stringify({ syncedAt, count: updates.length, updates }, null, 2) + '\n',
  )
  await fs.writeFile(
    path.join(dataDir, 'customer-content-sync.json'),
    JSON.stringify({
      syncedAt,
      knowledgeCount: articles.length,
      updateCount: updates.length,
      source: 'Lux Hermes/Core public customer feed',
    }, null, 2) + '\n',
  )

  console.log(`Synced ${articles.length} Knowledge Articles and ${updates.length} customer updates at ${syncedAt}`)
} catch (error) {
  console.warn('Customer content feed is not reachable yet; keeping the last committed snapshots.')
  console.warn(error instanceof Error ? error.message : String(error))
}
