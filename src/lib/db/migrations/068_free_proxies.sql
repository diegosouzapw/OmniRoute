-- 068_free_proxies.sql
-- Cria tabela de staging/catálogo para proxies gratuitos de múltiplas fontes.
-- Os proxies "promovidos" ao pool real ficam em proxy_registry; free_proxies
-- só rastreia o catálogo + quais foram promovidos (in_pool=1, pool_proxy_id=FK).

CREATE TABLE IF NOT EXISTS free_proxies (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,          -- '1proxy' | 'proxifly' | 'iplocate'
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  country_code TEXT,
  quality_score INTEGER,
  latency_ms INTEGER,
  anonymity TEXT,
  last_validated TEXT,
  in_pool INTEGER DEFAULT 0,     -- 0 = not in registry, 1 = promoted to proxy_registry
  pool_proxy_id TEXT,            -- FK para proxy_registry.id se in_pool=1
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(source, host, port)
);

CREATE INDEX IF NOT EXISTS idx_free_proxies_source ON free_proxies(source);
CREATE INDEX IF NOT EXISTS idx_free_proxies_quality ON free_proxies(quality_score DESC);
CREATE INDEX IF NOT EXISTS idx_free_proxies_in_pool ON free_proxies(in_pool);

-- Migrar dados existentes do proxy_registry (source='oneproxy') para free_proxies.
-- O proxy permanece em proxy_registry (não o removemos), mas o free_proxies o
-- referencia como já "in_pool".
INSERT OR IGNORE INTO free_proxies (
  id, source, host, port, type, country_code,
  quality_score, latency_ms, anonymity, last_validated,
  in_pool, pool_proxy_id, created_at, updated_at
)
SELECT
  id,
  '1proxy',
  host,
  port,
  type,
  country_code,
  quality_score,
  latency_ms,
  anonymity,
  last_validated,
  1,    -- já está no registry
  id,   -- pool_proxy_id = próprio id (mesmo registro)
  created_at,
  updated_at
FROM proxy_registry
WHERE source = 'oneproxy';
