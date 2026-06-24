---
title: "🌐 OmniRoute Proxy Guide"
version: 3.8.2
lastUpdated: 2026-05-13
---

# 🌐 OmniRoute Proxy Guide

> **Bypass geographic blocks, protect your identity, and route AI traffic through any proxy — with zero configuration complexity.**

OmniRoute includes a full-featured proxy management system that lets you route upstream AI provider traffic through HTTP, HTTPS, or SOCKS5 proxies. Whether you're in a blocked region, need IP rotation, or want stealth fingerprinting — this guide covers everything.

---

## Table of Contents

- [Why Use Proxies?](#why-use-proxies)
- [Architecture Overview](#architecture-overview)
- [4-Level Proxy System](#4-level-proxy-system)
- [Proxy Registry (CRUD)](#proxy-registry-crud)
- [1proxy Free Marketplace](#1proxy-free-proxy-marketplace)
- [Proxy Rotation](#proxy-rotation)
- [Anti-Detection & Stealth](#anti-detection--stealth)
- [Upstream Proxy Modes](#upstream-proxy-modes)
- [Dashboard UI](#dashboard-ui)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Why Use Proxies?

Many AI providers restrict access by geographic region. Developers in **Russia, China, Iran, Cuba, Turkey**, and other countries encounter errors like:

```
unsupported_country_region_territory
```

Even outside blocked regions, proxies are useful for:

| Use Case              | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| **Geographic bypass** | Access OpenAI, Anthropic, Codex, Copilot from blocked countries |
| **IP rotation**       | Distribute requests across multiple IPs to avoid rate limiting  |
| **Privacy**           | Hide your real IP from upstream providers                       |
| **Compliance**        | Route traffic through specific jurisdictions                    |
| **Testing**           | Simulate requests from different regions                        |

---

## Architecture Overview

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute Server                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proxy       │    │ Proxy        │    │ Proxy            │  │
│  │ Registry    │───▶│ Dispatcher   │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (cached)     │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Free Proxy  │                        │ Upstream         │  │
│  │ Sync        │                        │ Provider API     │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Key Components

| Component              | File                                         | Role                                                       |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| **Proxy Registry**     | `src/lib/db/proxies.ts`                      | CRUD for proxy entries + scope assignments                 |
| **Proxy Dispatcher**   | `open-sse/utils/proxyDispatcher.ts`          | Creates `undici` ProxyAgent/SOCKS dispatchers with caching |
| **Proxy Fetch**        | `open-sse/utils/proxyFetch.ts`               | Wraps `fetch()` with proxy dispatcher injection            |
| **Settings Route**     | `src/app/api/settings/proxy/route.ts`        | Legacy proxy config API (GET/PUT/DELETE)                   |
| **Management Route**   | `src/app/api/v1/management/proxies/route.ts` | Registry CRUD API (GET/POST/PATCH/DELETE)                  |
| **Free Proxy DB**      | `src/lib/db/freeProxies.ts`                  | Free proxy source persistence                              |
| **Free Proxy Sources** | `src/lib/freeProxyProviders/`                | Source adapters for 1proxy, Proxifly, and IPLocate         |
| **Free Proxy Routes**  | `src/app/api/settings/free-proxies/`         | Sync, list, stats, and promote-to-pool APIs                |

---

## 4-Level Proxy System

OmniRoute supports proxy configuration at **four independent scopes**, resolved in priority order:

```
Priority Resolution Order (highest → lowest):

  1. 🔵 Account/Connection Proxy  →  per API key / OAuth connection
  2. 🟡 Provider Proxy            →  per provider (e.g., all OpenAI traffic)
  3. 🟠 Combo Proxy               →  per combo/routing configuration
  4. 🟢 Global Proxy              →  all traffic, all providers
```

### How Resolution Works

When OmniRoute sends a request to an upstream provider, it calls `resolveProxyForConnectionFromRegistry()` which checks each level in order:

1. **Account-level** — Is there a proxy assigned to this specific connection ID?
2. **Provider-level** — Is there a proxy assigned to this provider (e.g., `openai`)?
3. **Global-level** — Is there a global proxy configured?
4. **No proxy** — Direct connection to the provider.

The first match wins. This means you can set a global proxy as a fallback but override it for specific providers or connections.

### What Gets Proxied

| Traffic Type         | Proxied? | Notes                                         |
| -------------------- | -------- | --------------------------------------------- |
| Chat completions     | ✅       | All `/v1/chat/completions` requests           |
| Embeddings           | ✅       | `/v1/embeddings`                              |
| Image generation     | ✅       | `/v1/images/generations`                      |
| Audio (TTS/STT)      | ✅       | `/v1/audio/*`                                 |
| OAuth token exchange | ✅       | Solves `unsupported_country_region_territory` |
| Connection tests     | ✅       | "Test Connection" button uses proxy           |
| Token refresh        | ✅       | Background OAuth renewal                      |
| Model sync           | ✅       | Model listing and discovery                   |

---

## Proxy Registry (CRUD)

The proxy registry is a SQLite table (`proxy_registry`) that stores all your proxies. Each proxy has:

| Field      | Type    | Description                         |
| ---------- | ------- | ----------------------------------- |
| `id`       | UUID    | Unique identifier                   |
| `name`     | String  | Human-readable label                |
| `type`     | String  | Protocol: `http`, `https`, `socks5` |
| `host`     | String  | Proxy hostname or IP                |
| `port`     | Integer | Port number                         |
| `username` | String  | Auth username (encrypted at rest)   |
| `password` | String  | Auth password (encrypted at rest)   |
| `region`   | String  | Geographic region label             |
| `notes`    | String  | Free-text notes                     |
| `status`   | String  | `active` or `inactive`              |
| `source`   | String  | `manual` or `oneproxy`              |

### Creating a Proxy

**Via Dashboard:**

1. Go to **Settings → Proxy**
2. Click **Add Proxy**
3. Fill in the type, host, port, and optional auth credentials
4. Save

**Via API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Updating a Proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Note:** Credentials are preserved unless you explicitly send non-empty replacements. Sending empty strings for `username`/`password` will keep the stored values.

### Deleting a Proxy

```bash
# Fails if proxy is assigned to any scope
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Force delete (removes assignments too)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Listing Proxies

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Assigning Proxies to Scopes

```bash
# Assign to global scope
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Assign to a specific provider
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Assign to a specific connection/key
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Resolving Effective Proxy

Check which proxy would be used for a given connection:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Returns the resolved proxy with its level (`account`, `provider`, or `global`) and source.

### Bulk Assignment

Assign one proxy to multiple providers or connections at once:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Import/Export

Proxies are included in the **Backup/Restore** system. When you export your OmniRoute configuration:

1. Go to **Dashboard → Settings → Backup**
2. Click **Export** — proxy registry and assignments are included
3. To restore, click **Import** and upload the backup file

The proxy registry also supports **upsert by host+port** — if you import a proxy that already exists (same host and port), it updates instead of creating a duplicate.

### Legacy Migration

If you configured proxies in an older version (pre-registry), OmniRoute automatically migrates them:

```
Legacy key_value store → proxy_registry + proxy_assignments
```

This happens once on first startup after upgrade. Use `migrateLegacyProxyConfigToRegistry({ force: true })` to re-run.

---

## 1proxy Free Proxy Marketplace

> 🆕 **Contributed by [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Issue [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute integrates with the **[1proxy](https://1proxy-api.aitradepulse.com)** community platform to provide access to **hundreds of free, validated proxies** from around the world. This is perfect for users who don't have their own proxy infrastructure.

### How It Works

```
┌─────────────┐     Sync      ┌──────────────┐    Add to Pool    ┌──────────┐
│  1proxy API │ ────────────▶ │ free_proxies │ ────────────────▶ │ Provider │
│  (external) │   up to 500   │ source=1proxy│  proxy_registry  │   API    │
└─────────────┘    proxies    └──────────────┘                   └──────────┘
```

1. **Sync** — OmniRoute fetches validated proxies from the 1proxy API
2. **Store** — Proxies are saved in `free_proxies` with `source = '1proxy'`
3. **Filter** — Filter by protocol, country, quality score
4. **Promote** — Add selected free proxies into the main `proxy_registry` pool
5. **Route** — Normal proxy resolution chooses assigned registry proxies for provider traffic

### Syncing Proxies

**Via Dashboard:**

1. Go to **Settings → 1proxy** tab
2. Click **"Sync Now"**
3. View stats: total proxies, active count, average quality, by-country breakdown

**Via API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/free-proxies/sync \
  -H "Content-Type: application/json" \
  -d '{"sources":["1proxy"]}'

# Response:
# { "success": true, "results": { "1proxy": { "fetched": 172, "added": 127, "updated": 45, "errors": [] } } }
```

### Filtering Proxies

```bash
# Filter by protocol
curl "http://localhost:20128/api/settings/free-proxies?sources=1proxy&protocol=socks5"

# Filter by country
curl "http://localhost:20128/api/settings/free-proxies?sources=1proxy&country=US"

# Filter by minimum quality score
curl "http://localhost:20128/api/settings/free-proxies?sources=1proxy&minQuality=80"

# Combine filters
curl "http://localhost:20128/api/settings/free-proxies?sources=1proxy&protocol=http&country=DE&minQuality=70"
```

### Proxy Quality Scores

Each 1proxy proxy comes with metadata:

| Field           | Description                                  |
| --------------- | -------------------------------------------- |
| `qualityScore`  | 0-100 rating from 1proxy validation          |
| `latencyMs`     | Measured network latency                     |
| `anonymity`     | `transparent`, `anonymous`, or `elite`       |
| `googleAccess`  | Whether the proxy can access Google services |
| `countryCode`   | Two-letter ISO country code                  |
| `lastValidated` | Timestamp of last validation                 |

Quality scores are preserved from source validation:

- Free proxies keep their upstream validation score in `free_proxies`
- Promoted proxies are copied into `proxy_registry`
- Production routing uses the normal registry status, assignment, and health checks

### Adding Free Proxies to the Pool

```bash
# Add one free proxy to the main proxy pool
curl -X POST http://localhost:20128/api/settings/free-proxies/free-proxy-uuid/add-to-pool \
  -H "Content-Type: application/json" \
  -d '{}'

# Add several visible free proxies to the pool
curl -X POST http://localhost:20128/api/settings/free-proxies/bulk-add-to-pool \
  -H "Content-Type: application/json" \
  -d '{"ids":["free-proxy-uuid"]}'
```

### Circuit Breaker

The 1proxy free-proxy provider has a built-in circuit breaker:

- After **5 consecutive sync failures**, further sync attempts are blocked
- Restart the server to reset the in-memory provider state
- Aggregate free-proxy status is available at `GET /api/settings/free-proxies/stats`

### Clearing 1proxy Proxies

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/free-proxies?id=free-proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/free-proxies?source=1proxy"
```

---

## Anti-Detection & Stealth

OmniRoute doesn't just route traffic through a proxy — it makes the traffic look legitimate:

### TLS Fingerprint Spoofing

Uses `wreq-js` to generate browser-like TLS fingerprints, bypassing bot detection systems that flag non-browser TLS handshakes.

### CLI Fingerprint Matching

The **CLI Fingerprint Toggle** (`Settings → Security`) reorders HTTP headers and JSON body fields to match the exact signature of native CLI binaries (Claude Code, Codex, etc.). This works **on top of** the proxy:

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

You get both **IP masking** and **request authenticity** simultaneously.

### Proxy IP Preservation

Color-coded badges in the dashboard show which proxy level is active:

| Badge | Level      | Meaning                                   |
| ----- | ---------- | ----------------------------------------- |
| 🟢    | Global     | All traffic goes through this proxy       |
| 🟡    | Provider   | Only this provider's traffic is proxied   |
| 🔵    | Connection | This specific key/account uses this proxy |

The badge also shows the resolved proxy IP for verification.

---

## Upstream Proxy Modes

For providers that use the CLIProxyAPI pattern, OmniRoute supports three upstream proxy modes:

| Mode          | Description                                        |
| ------------- | -------------------------------------------------- |
| `native`      | OmniRoute handles proxy routing directly (default) |
| `cliproxyapi` | Delegates to an external CLIProxyAPI instance      |
| `fallback`    | Tries native first, falls back to CLIProxyAPI      |

Configure per-provider:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Dashboard UI

### Settings → Proxy Tab

- **Global proxy** configuration (set once for all traffic)
- **Per-provider proxy** overrides
- **Per-connection proxy** assignments
- **Connection test** through configured proxy
- **Color-coded badges** showing active proxy level

### Settings → 1proxy Tab

- **Sync Now** button to fetch free proxies
- **Stats cards**: Total, Active, Avg Quality, Last Sync
- **Filters**: Protocol, Country Code, Min Quality
- **Proxy table** with host, protocol, country, quality score, latency, anonymity, Google access
- **Sync status** panel with success/failure tracking and consecutive failure count
- **Clear All** to remove all 1proxy entries

---

## API Reference

### Proxy Settings API

| Method   | Endpoint                                       | Description             |
| -------- | ---------------------------------------------- | ----------------------- |
| `GET`    | `/api/settings/proxy`                          | Get full proxy config   |
| `GET`    | `/api/settings/proxy?level=global`             | Get global proxy        |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Get provider proxy      |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Resolve effective proxy |
| `PUT`    | `/api/settings/proxy`                          | Update proxy config     |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Remove proxy at level   |

### Proxy Registry API

| Method   | Endpoint                                          | Description           |
| -------- | ------------------------------------------------- | --------------------- |
| `GET`    | `/api/v1/management/proxies`                      | List all proxies      |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Get proxy by ID       |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Get proxy assignments |
| `POST`   | `/api/v1/management/proxies`                      | Create proxy          |
| `PATCH`  | `/api/v1/management/proxies`                      | Update proxy          |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Delete proxy          |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Force delete          |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Bulk assign           |
| `GET`    | `/api/v1/management/proxies/assignments`          | List assignments      |
| `GET`    | `/api/v1/management/proxies/health`               | Proxy health stats    |

### Tunnels API

For exposing your OmniRoute instance to the public internet (Cloudflare/ngrok/Tailscale) instead of routing outbound through a proxy, see [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). The tunnel REST API lives under `/api/tunnels/{cloudflared,ngrok,tailscale}/*` and is orthogonal to the outbound proxy chain documented above.

### Free Proxy API

| Method   | Endpoint                                      | Description                           |
| -------- | --------------------------------------------- | ------------------------------------- |
| `GET`    | `/api/settings/free-proxies`                  | List free proxies                     |
| `GET`    | `/api/settings/free-proxies/stats`            | Get free-proxy stats                  |
| `POST`   | `/api/settings/free-proxies/sync`             | Trigger source sync                   |
| `POST`   | `/api/settings/free-proxies/{id}/add-to-pool` | Add one proxy to the main pool        |
| `POST`   | `/api/settings/free-proxies/bulk-add-to-pool` | Add multiple proxies to the main pool |
| `DELETE` | `/api/settings/free-proxies?id=uuid`          | Delete one                            |
| `DELETE` | `/api/settings/free-proxies?source=1proxy`    | Clear one source                      |

### Upstream Proxy API

| Method   | Endpoint                          | Description                  |
| -------- | --------------------------------- | ---------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Get upstream proxy config    |
| `PUT`    | `/api/upstream-proxy/:providerId` | Set upstream proxy mode      |
| `DELETE` | `/api/upstream-proxy/:providerId` | Remove upstream proxy config |

---

## Environment Variables

| Variable                        | Default        | Description                                                    |
| ------------------------------- | -------------- | -------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY`           | `true`         | Enable SOCKS5 proxy support (default `true` in `.env.example`) |
| `FREE_PROXY_1PROXY_ENABLED`     | `true`         | Enable the 1proxy free-proxy source                            |
| `FREE_PROXY_1PROXY_API_URL`     | _(see source)_ | 1proxy API endpoint                                            |
| `FREE_PROXY_1PROXY_MAX`         | `500`          | Maximum 1proxy proxies to sync                                 |
| `FREE_PROXY_1PROXY_MIN_QUALITY` | `50`           | Minimum quality score to import                                |

---

## Troubleshooting

### "SOCKS5 proxy is disabled"

Set `ENABLE_SOCKS5_PROXY=true` in your `.env` file and restart.

### "socket hang up" errors through proxy

This is normal with cheap proxies that drop idle connections. OmniRoute already handles this by:

- Disabling keep-alive on proxy connections (`keepAliveTimeout: 1`)
- Disabling pipelining (`pipelining: 0`)
- Caching dispatchers to avoid repeated handshakes

If it persists, try a different proxy or use the 1proxy rotation feature.

### "unsupported_country_region_territory" during OAuth

Make sure the proxy is configured **before** starting the OAuth flow. OmniRoute routes OAuth token exchange through the configured proxy. Set a global or provider-level proxy first, then connect.

### Proxy not being used

Check the resolution order:

1. Verify with `GET /api/settings/proxy?resolve=your-connection-id`
2. Check if the proxy `status` is `active` (not `inactive`)
3. Ensure the proxy assignment scope matches your connection

### 1proxy sync failing

Check the sync status:

```bash
curl "http://localhost:20128/api/settings/free-proxies/stats"
```

If the provider reports repeated errors, restart the server to reset the in-memory circuit breaker.

---

## Database Schema

### `proxy_registry` Table

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' or 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (1proxy only)
  latency_ms INTEGER,                        -- milliseconds (1proxy only)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- can access Google? (1proxy)
  last_validated TEXT,                       -- ISO timestamp (1proxy)
  country_code TEXT,                         -- ISO 2-letter code (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` Table

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- provider ID, connection ID, or combo ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Proxy Health Checking (v3.8.16+)

OmniRoute's **proxy fast-fail** mechanism (`src/lib/proxyHealth.ts`) detects dead proxies in <2s via a quick TCP connection check, then **caches the result** to avoid per-request overhead.

### How It Works

```
Request ──▶ ProxyHealthCache.get(url)
             │
             ├─ Cache hit + fresh?  ──▶ return cached status
             │
             └─ Cache miss / stale?  ──▶ TCP connect to host:port
                                          (timeout: FAST_FAIL_TIMEOUT_MS)
                                          ──▶ cache for HEALTH_CACHE_TTL_MS
                                          ──▶ return result
```

Without this, a dead proxy would block every request for the full `PROXY_TIMEOUT_MS` (default 30s) before failing.

### Tunable Environment Variables

| Variable                     | Default | Purpose                                 |
| ---------------------------- | ------- | --------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | TCP connection timeout per health check |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | How long a health result is cached      |

**Recommended values:**

| Scenario                    | Fast-fail timeout | Cache TTL | Reasoning                                                       |
| --------------------------- | ----------------- | --------- | --------------------------------------------------------------- |
| High-throughput API gateway | 1500ms            | 60000ms   | Aggressive fail-fast, longer cache to reduce checks             |
| Geo-distributed nodes       | 3000ms            | 15000ms   | Slower networks need more time; shorter cache for fast failover |
| Dev / testing               | 1000ms            | 10000ms   | Quick iteration on local proxies                                |
| Stealth / anti-detection    | 2500ms            | 45000ms   | Avoid rapid probing that could trigger rate limits              |

### Inspecting Proxy Health

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Force re-check a specific proxy
invalidateProxyHealth("http://user:pass@1.2.3.4:8080");
```

The `stale` flag is `true` when the cache entry has exceeded `HEALTH_CACHE_TTL_MS` and the next request will trigger a fresh check.

### Per-Proxy Type Defaults

The health check uses sensible defaults based on the URL scheme:

| Scheme                     | Default port |
| -------------------------- | ------------ |
| `http://`                  | 8080         |
| `https://`                 | 443          |
| `socks5://` / `socks5h://` | 1080         |

Custom ports in the URL (`http://host:9999`) always take precedence over the scheme default.

---

## Proxy Analytics & Observability

OmniRoute tracks per-proxy usage to help operators diagnose routing patterns, latency spikes, and recurring failures.

### What's Tracked

For every request through a configured proxy, OmniRoute records:

| Metric       | Description                                     |
| ------------ | ----------------------------------------------- |
| `proxy_url`  | Full proxy URL (with auth credentials masked)   |
| `provider`   | Upstream provider ID (openai, anthropic, etc.)  |
| `latency_ms` | Total round-trip time including proxy handshake |
| `connect_ms` | TCP connect time only                           |
| `status`     | HTTP status code from upstream                  |
| `error`      | Error class if request failed                   |
| `timestamp`  | ISO 8601 UTC                                    |

### Accessing the Data

```bash
# Recent proxy events
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

The real endpoint is `/api/usage/proxy-logs` (see `src/app/api/usage/proxy-logs/route.ts`). This endpoint supports:

- `GET /api/usage/proxy-logs` — retrieve proxy logs
- `DELETE /api/usage/proxy-logs` — clear all proxy logs

Aggregate stats can be queried directly from the `proxy_logs` table via SQL if needed. The dashboard UI may offer aggregate views.

### Common Patterns

**Detect a flapping proxy** (alternates between success/failure):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Find slow proxies** (p95 latency > 2s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Rotation Strategy Decision Tree

When multiple proxies are assigned to a scope, OmniRoute uses a **rotation strategy** to pick which one to use for each request. The strategy is configured at the scope level (global, per-provider, per-account, per-combo).

### Available Strategies

| Strategy            | When to use                           | Trade-off                                             |
| ------------------- | ------------------------------------- | ----------------------------------------------------- |
| `quality` (default) | Production with mixed-quality proxies | Favors high-rated proxies; may starve low-rated ones  |
| `random`            | Load distribution, privacy            | Even distribution; ignores quality signals            |
| `sequential`        | Debugging, deterministic testing      | Cycles through proxies in order; easy to reason about |

### Decision Tree

```
                    Do you have quality scores for your proxies?
                    │
        ┌───────────┴───────────┐
        │                       │
       YES                     NO
        │                       │
   Are all proxies             │
   roughly equal                  │
   in quality?                   │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  YES       NO                Use
   │         │              `random`
   │         │              (even spread
   │         │              builds quality
   │         │              data over time)
   │         │
   │    Use `quality`
   │    (best for
   │    mixed quality)
   │
Use `random`
(spread load
evenly)
```

> 📖 **Related documentation:**
>
> - [User Guide](../guides/USER_GUIDE.md) — General setup and configuration
> - [API Reference](../reference/API_REFERENCE.md) — Full API documentation
> - [Environment Config](../reference/ENVIRONMENT.md) — All environment variables
