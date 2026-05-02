# 🌐 OmniRoute Proxy Guide

> **Bypass geographic blocks, protect your identity, and route AI traffic through any proxy — with zero configuration complexity.**

OmniRoute includes a full-featured proxy management system that lets you route upstream AI provider traffic through HTTP, HTTPS, or SOCKS5 proxies. Whether you're in a blocked region, need IP rotation, or want stealth fingerprinting — this guide covers everything.

---

## Table of Contents

- [Why Use Proxies?](#why-use-proxies)
- [Architecture Overview](#architecture-overview)
- [3-Level Proxy System](#3-level-proxy-system)
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
│  │ 1proxy Sync │                        │ Upstream         │  │
│  │ (free pool) │                        │ Provider API     │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Key Components

| Component            | File                                         | Role                                                       |
| -------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| **Proxy Registry**   | `src/lib/db/proxies.ts`                      | CRUD for proxy entries + scope assignments                 |
| **Proxy Dispatcher** | `open-sse/utils/proxyDispatcher.ts`          | Creates `undici` ProxyAgent/SOCKS dispatchers with caching |
| **Proxy Fetch**      | `open-sse/utils/proxyFetch.ts`               | Wraps `fetch()` with proxy dispatcher injection            |
| **Settings Route**   | `src/app/api/settings/proxy/route.ts`        | Legacy proxy config API (GET/PUT/DELETE)                   |
| **Management Route** | `src/app/api/v1/management/proxies/route.ts` | Registry CRUD API (GET/POST/PATCH/DELETE)                  |
| **1proxy DB**        | `src/lib/db/oneproxy.ts`                     | Free proxy marketplace persistence                         |
| **1proxy Sync**      | `src/lib/oneproxySync.ts`                    | Fetches proxies from 1proxy API                            |
| **1proxy Rotator**   | `src/lib/oneproxyRotator.ts`                 | Rotation strategies (quality/random/sequential)            |

---

## 3-Level Proxy System

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
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Sync** — OmniRoute fetches validated proxies from the 1proxy API
2. **Store** — Proxies are saved in the same `proxy_registry` table with `source = 'oneproxy'`
3. **Filter** — Filter by protocol, country, quality score
4. **Rotate** — Pick the best proxy using quality, random, or sequential strategies
5. **Auto-degrade** — Failed proxies get their quality score reduced; below threshold → marked inactive

### Syncing Proxies

**Via Dashboard:**

1. Go to **Settings → 1proxy** tab
2. Click **"Sync Now"**
3. View stats: total proxies, active count, average quality, by-country breakdown

**Via API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtering Proxies

```bash
# Filter by protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filter by country
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filter by minimum quality score
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combine filters
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
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

Quality scores are dynamically adjusted:

- **Failed requests** reduce the score by 10 points
- **Score drops to ≤10** → proxy is marked `inactive`
- Inactive proxies are excluded from rotation

### Rotation Strategies

```bash
# Rotate by quality (best proxy first) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Random rotation
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sequential (least recently validated first)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Circuit Breaker

The 1proxy sync has a built-in circuit breaker:

- After **5 consecutive sync failures**, further sync attempts are blocked
- Reset with: `resetOneproxyCircuitBreaker()` or restart the server
- Sync status is available at `GET /api/settings/oneproxy?action=status`

### Clearing 1proxy Proxies

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
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

### 1proxy API

| Method   | Endpoint                               | Description             |
| -------- | -------------------------------------- | ----------------------- |
| `GET`    | `/api/settings/oneproxy`               | List 1proxy proxies     |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Get stats + sync status |
| `GET`    | `/api/settings/oneproxy?action=status` | Get sync status only    |
| `POST`   | `/api/settings/oneproxy`               | Trigger sync            |
| `POST`   | `/api/settings/oneproxy/rotate`        | Rotate to next proxy    |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Delete one              |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Clear all               |

### Upstream Proxy API

| Method   | Endpoint                          | Description                  |
| -------- | --------------------------------- | ---------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Get upstream proxy config    |
| `PUT`    | `/api/upstream-proxy/:providerId` | Set upstream proxy mode      |
| `DELETE` | `/api/upstream-proxy/:providerId` | Remove upstream proxy config |

---

## Environment Variables

| Variable                         | Default                               | Description                     |
| -------------------------------- | ------------------------------------- | ------------------------------- |
| `ENABLE_SOCKS5_PROXY`            | `false`                               | Enable SOCKS5 proxy support     |
| `ONEPROXY_ENABLED`               | `true`                                | Enable 1proxy integration       |
| `ONEPROXY_API_URL`               | `https://1proxy-api.aitradepulse.com` | 1proxy API endpoint             |
| `ONEPROXY_MAX_PROXIES`           | `500`                                 | Maximum proxies to sync         |
| `ONEPROXY_MIN_QUALITY_THRESHOLD` | `50`                                  | Minimum quality score to import |

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
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

If `consecutiveFailures >= 5`, the circuit breaker has tripped. Restart the server to reset, or wait for manual reset.

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

> 📖 **Related documentation:**
>
> - [User Guide](USER_GUIDE.md) — General setup and configuration
> - [API Reference](API_REFERENCE.md) — Full API documentation
> - [Environment Config](ENVIRONMENT.md) — All environment variables
