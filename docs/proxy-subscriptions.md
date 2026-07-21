# Operator Proxy Subscriptions (Karing-style)

> Feature design + implementation notes for OmniRoute's operator-level proxy
> subscription flow. This is the v1 cut: a single operator pastes subscription
> links, picks a mode (global or rule), and OmniRoute binds the resulting proxy
> pool into the existing scope resolution. Multi-tenant per-API-key, advanced
> traffic rules, latency-driven per-rule weights, and so on are explicitly
> out-of-scope and listed in §7.

---

## 1. Motivation

Today, OmniRoute's proxy pool is hand-curated: every node lives in
`proxy_registry` with hand-written host/port/credentials, and every binding to
the upstream dispatchers (account → provider → combo → global → direct) is a
manual `proxy_assignments` row. Operators who already maintain a Clash/V2Ray/
sing-box subscription (e.g. from an airport service) have to retype every node
into OmniRoute and re-bind them whenever the upstream list changes.

The goal of v1 is to make OmniRoute first-class for **operator-supplied**
subscriptions, similar to how Karing / Clash / sing-box let users paste a
`https://...` URL and have the client manage the lifecycle.

## 2. User stories

| # | As a(n) | I want to | So that |
|---|---------|-----------|---------|
| U1 | Operator | paste a subscription URL once | I don't retype nodes every time the airport refreshes |
| U2 | Operator | toggle the subscription on/off | I can fall back to direct without deleting the URL |
| U3 | Operator | pick **global** mode | every provider's traffic exits via the subscription |
| U4 | Operator | pick **rule** mode and select specific providers | only selected providers route through the proxy; others stay direct |
| U5 | Operator | supply a local sing-box/clash SOCKS5 endpoint | SS/VMess/Trojan/VLESS nodes (which OmniRoute's dispatcher can't speak natively) become usable through a local kernel bridge |
| U6 | Operator | see fetch status and a recent redacted node summary | I can debug "why is this empty / erroring" without leaking credentials |

## 3. Non-goals (v1)

- Per-API-key subscription overrides (multi-tenant). v1 is operator-only.
- Per-provider traffic rules beyond `global` / `rule-on-selected-providers`.
- Latency-based smart routing between subscription nodes and other pools
  (existing `resolveProxyForConnectionFromRegistry` already does this for the
  global pool; v1 just feeds subscription nodes into it).
- Auto-importing URL/password from headers or query params.
- SSRF mitigation beyond loopback-only local-core endpoints (the subscription
  URL itself is operator-controlled, so we trust it the same way we trust
  upstream provider URLs today).

## 4. Architecture

```
            ┌─────────────────────────────────────────┐
            │  dashboard / settings / 代理 / 订阅代理   │
            │  (client component, SubscriptionTab)    │
            └──────────────────┬──────────────────────┘
                               │ fetch
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │  /api/v1/management/proxy-subscriptions                │
   │  ├ GET    list                                        │
   │  ├ POST   create                                      │
   │  ├ GET    /:id                                        │
   │  ├ PATCH  /:id                                        │
   │  ├ DELETE /:id                                        │
   │  ├ POST   /:id/refresh                                │
   │  └ GET    /:id/nodes                                  │
   └────────────────────────┬───────────────────────────────┘
                            │ uses
                            ▼
   ┌────────────────────────────────────────────────────────┐
   │  src/lib/proxySubscription/                           │
   │  ├ parse.ts          (Clash YAML / V2Ray JSON / URIs) │
   │  ├ subscriptionService.ts                              │
   │  │   CRUD, sync, apply, unapply, scheduler            │
   │  └ index.ts          (barrel)                          │
   └──────────┬─────────────────────────────┬───────────────┘
              │ upsert/scope-bind            │ DB
              ▼                              ▼
   ┌─────────────────────────┐    ┌──────────────────────────┐
   │  proxy_registry          │    │  proxy_subscriptions     │
   │  (existing) +             │    │  (NEW — subscription     │
   │  subscription_id column  │    │   metadata + scheduler   │
   │  + status/health checks  │    │   state)                 │
   └─────────────────────────┘    └──────────────────────────┘
              │
              ▼ (existing)
   resolveProxyForConnectionFromRegistry
   hasBlockingProxyAssignment (fail-closed)
   proxyDispatcher (open-sse/utils/proxyDispatcher)
```

Key design decision: **we do not invent a new scope or routing pipeline**. We
upsert subscription-derived nodes into `proxy_registry` with `source =
'subscription'` + `subscription_id`, and then `applySubscription()` walks the
existing `addProxyToScopePool(scope, scopeId, proxyId)` API. This means:

- Existing rotation, health checks, and fail-closed guards apply for free.
- Existing dashboards (ProxyPoolTab, SourceToggleBar, GlobalConfigTab) work
  unchanged — subscription nodes just appear in the pool with a `source`
  badge.
- Deleting/disabling a subscription cleanly removes its bindings without
  touching manual proxies.

## 5. Data model

### 5.1 New table `proxy_subscriptions`

| Column | Type | Notes |
|---|---|---|
| `id` | TEXT PK | UUID |
| `name` | TEXT NOT NULL | display name |
| `url` | TEXT NOT NULL | subscription URL |
| `enabled` | INTEGER NOT NULL DEFAULT 0 | 1 = active |
| `mode` | TEXT NOT NULL DEFAULT `'global'` | `'global'` or `'rule'` |
| `rule_providers` | TEXT NULL | JSON array of provider IDs (mode='rule' only) |
| `local_core_endpoint` | TEXT NULL | loopback SOCKS5/HTTP for SS/VMess/etc. (e.g. `socks5://127.0.0.1:2080`) |
| `update_interval_minutes` | INTEGER NOT NULL DEFAULT 60 | background refresh cadence |
| `last_fetched_at` | TEXT NULL | ISO timestamp of last successful fetch |
| `status` | TEXT NOT NULL DEFAULT `'empty'` | `'ok'` / `'error'` / `'empty'` |
| `error` | TEXT NULL | last error / warning text (redacted) |
| `last_nodes` | TEXT NULL | JSON array, redacted node summaries |
| `created_at` | TEXT NOT NULL | ISO |
| `updated_at` | TEXT NOT NULL | ISO |

Index: `idx_proxy_subscriptions_enabled (enabled)` for the scheduler tick.

### 5.2 Extended `proxy_registry`

Added one column:

| Column | Type | Notes |
|---|---|---|
| `subscription_id` | TEXT NULL | FK by convention (no enforced FK; subscription row lives in `proxy_subscriptions`) |

Existing rows on upgrade: `subscription_id = NULL`, behavior unchanged.
Migration: `ALTER TABLE proxy_registry ADD COLUMN subscription_id TEXT;`
(applied as `123_proxy_subscriptions.sql`, idempotent via the migration
runner's `ALTER` semantics).

### 5.3 Extended `proxy_subscriptions` test isolation

The migration runner applies new migrations automatically; the only places
that need to know about the new column are `types.ts` and `mappers.ts` (one
extra field each) and `proxies.ts` (3 SQL statements: INSERT/UPDATE/SELECT).

## 6. Modes

### 6.1 Global mode

- Pool bound to `scope='global', scope_id=NULL`.
- `proxyEnabled` setting forced to `true` whenever any subscription (or any
  non-subscription global proxy) is active.
- All provider traffic exits via the subscription pool, with rotation/health
  applied by the existing `resolveProxyForConnectionFromRegistry`.

### 6.2 Rule mode

- Pool bound to `scope='provider', scope_id=<selected provider id>` for each
  selected provider.
- Providers NOT in the list fall through to direct (their own provider-level
  proxy or no proxy).
- Toggling a subscription from global → rule first calls `unapplySubscription`
  to detach the previous global bindings, then re-syncs.

## 7. Protocol support

The existing `proxyDispatcher` only speaks **http / https / socks5 / vercel /
deno / cloudflare**. v1 follows that:

| Parser-detected type | Goes into pool directly? | Needs `localCoreEndpoint`? |
|---|---|---|
| `http` / `https` | yes | no |
| `socks5` | yes | no |
| `ss` / `ssr` | no | yes (sing-box/clash → loopback SOCKS5) |
| `vmess` / `vless` | no | yes |
| `trojan` | no | yes |
| `hysteria` / `tuic` / `wireguard` | no | yes |
| `relay` (vercel/deno/cloudflare) | yes | no |

Without `localCoreEndpoint`, SS-class nodes are surfaced in the status as a
warning but **not routed**. This matches the "fail-closed, but don't lie about
capability" policy: we never silently drop traffic; we report unrouteable
nodes and let the operator decide.

## 8. Parser (`src/lib/proxySubscription/parse.ts`)

Hand-rolled, no external dependency. Inputs accepted:

1. **Clash / Clash.Meta YAML** — `proxies:` array, with `type` dispatch.
2. **Base64-wrapped URI list** — `parseSubscription` detects base64 by length
   and charset, decodes, then URI-parses.
3. **V2RayN-style JSON-array-of-URI** — uses `vmess://` / `vless://` URIs.
4. **Plain URI list** — `ss://`, `vmess://`, `vless://`, `trojan://`,
   `hysteria://`, `tuic://`, `wireguard://`, `socks5://`, `http(s)://`.

Output:

```ts
type ParsedSubscription = {
  nodes: DirectlyUsableNode[];   // http/https/socks5/relay
  needsCore: NeedsCoreNode[];    // ss/vmess/... — redacted summary
  rawProtocols: string[];        // for diagnostics
  parserWarnings: string[];      // per-line parse errors, redacted
};

type DirectlyUsableNode = {
  name: string;
  type: "http" | "https" | "socks5" | "vercel" | "deno" | "cloudflare";
  host: string;
  port: number;
  username?: string;
  password?: string;
};
```

`redactedNodeSummary` returns a JSON-serializable array of `{name, type,
host, port, hasCredentials}` with credentials omitted. This is what gets
persisted in `last_nodes` for the operator UI.

## 9. Security

- **SSRF on `localCoreEndpoint`**: the only SSRF surface here is the local
  core endpoint (the subscription URL itself is operator-supplied). Allowed
  hosts: `127.0.0.1`, `::1`, `localhost`. Any other host is rejected at parse
  time with a `subscription_needs_core_endpoint_invalid` status.
- **No outbound to operator-internal hosts** from a subscription URL. The URL
  fetch goes through Node's `fetch` (same trust model as the existing
  `proxyLatency` health checks and the provider ping tasks). The operator
  already trusts the URL by pasting it.
- **Fail-closed**: if a subscription's proxy is dead but still bound to a
  scope, `hasBlockingProxyAssignment` returns true and traffic fails closed —
  matches existing policy for any pool proxy. The operator can always disable
  the subscription or remove the binding.
- **No secret echo**: `last_nodes` is redacted; the UI never sends secrets
  back. `password` / `username` are stored encrypted at rest by the existing
  `proxy_registry` encryption path.
- **No cross-tenant write**: the API routes are gated by `requireManagementAuth`
  (dashboard session OR a manage-scope API key). Per-API-key overrides are
  explicitly out-of-scope.

## 10. UI

A new sub-tab **"订阅代理"** in `dashboard / settings / 代理`, placed after
"documentation". List view shows:

- Name + URL (truncated, with full URL in `title` attribute)
- Status badge: `ok` / `error` / `empty`
- Enabled switch (optimistic toggle)
- Action buttons: edit / refresh / delete

The edit form has:

- Name (text, required)
- URL (text, required, validated as URL)
- Mode toggle (global / rule)
- Provider multi-select (visible only in rule mode; populated from
  `/api/providers`)
- Local core endpoint (text, optional; placeholder `socks5://127.0.0.1:2080`)
- Update interval (number, default 60 minutes)
- Enabled toggle

When `status === 'error'`, an inline warning banner shows `subscription.error`.
When `status === 'ok'` and there are nodes that needed a local core, a soft
warning banner shows which protocols were skipped.

## 11. Migration & rollout

1. New migration `123_proxy_subscriptions.sql` runs on first DB open after
   upgrade (auto-discovered by the existing migration runner).
2. The migration is **idempotent**: `ALTER TABLE … ADD COLUMN …` against an
   already-migrated DB is a no-op in SQLite when wrapped in the runner's
   "ignore duplicate column" path. See the existing
   `040_oneproxy_proxy_fields.sql` and `093_proxy_enable_toggles.sql`
   precedents.
3. No backfill: existing rows get `subscription_id = NULL`, which the
   service treats as "manual, not subscription-managed".
4. UI hides the tab when there are zero subscriptions, but the API is always
   available — that's intentional, so headless operators can manage
   subscriptions via API only.

## 12. Auto-refresh

`startSubscriptionScheduler()` is idempotent and:

- Skips in the browser (`typeof window !== "undefined"`).
- Skips under `NODE_ENV=test`.
- Otherwise starts a 60s `setInterval` that:
  - Lists enabled subscriptions.
  - For each, computes `due = now - lastFetchedAt >= updateIntervalMinutes * 60_000`.
  - Calls `syncSubscription` for due ones, swallowing errors (logged).
- The interval timer is `.unref()`'d so it never blocks process exit.

The scheduler is started on:
- First `GET /api/v1/management/proxy-subscriptions` (dashboard open).
- Any `syncSubscription` call (defensive — for CLI / automation paths that
  bypass the GET).

## 13. Testing strategy

`tests/unit/proxySubscription.parse.test.ts` — 7 pure-parser cases, no DB,
runnable in <1s:

1. Clash YAML with `direct` (http) and `needsCore` (ss) nodes.
2. Base64-wrapped URI list (decoded correctly).
3. V2Ray JSON-array-of-URI (vmess / vless).
4. Plain URI list (mixed protocols).
5. Clash.Meta outbounds (socks5).
6. Empty / unknown input → `nodes=[]`, `needsCore=[]`, parserWarnings filled.
7. `redactedNodeSummary` strips credentials.

`tests/unit/proxySubscription.service.test.ts` — 4 integration tests using
`process.env.DATA_DIR` + `core.resetDbInstance()`:

1. **Global**: create enabled global subscription → `syncSubscription` →
   verify pool rows in `proxy_registry` with `subscription_id` set →
   `resolveProxyForConnectionFromRegistry` returns one of those rows →
   `proxyEnabled` is true.
2. **Rule**: create enabled rule subscription on provider P1 → verify only
   P1's scope is bound, P2's scope is untouched.
3. **Fail-closed**: subscription fetch URL is unreachable → `status='error'`,
   pool is empty, but if pool ever had rows they are cleaned up;
   `hasBlockingProxyAssignment` returns false (no dead proxies in any scope).
4. **Delete**: delete subscription → registry rows for that subscription are
   removed with `force: true` (manual deletions can't cascade-block it) →
   `proxyEnabled` recomputed.

Test runner command:

```bash
node --import tsx/esm \
     --import ./open-sse/utils/setupPolyfill.ts \
     --import ./tests/_setup/isolateDataDir.ts \
     --test \
     tests/unit/proxySubscription.parse.test.ts \
     tests/unit/proxySubscription.service.test.ts
```

## 14. Future work (NOT in v1)

- Per-API-key subscription overrides (multi-tenant; needs a `key_subscription_overrides` table).
- Per-provider traffic rules with domain matchers (would slot into the existing `interceptionRules` table).
- Latency-weighted rotation across subscription pools (we already have `ProxyRotationStrategy = "latency"`; just expose it in the UI).
- Proxying the subscription fetch itself through a separate egress (so operators can fetch behind a corporate firewall).
- Browser-side preview of a parsed subscription before saving (currently must save → wait → see nodes).

## 15. Files touched / added

**Added (new):**

- `src/lib/proxySubscription/parse.ts`
- `src/lib/proxySubscription/subscriptionService.ts`
- `src/lib/proxySubscription/index.ts`
- `src/lib/db/migrations/123_proxy_subscriptions.sql`
- `src/app/api/v1/management/proxy-subscriptions/route.ts`
- `src/app/api/v1/management/proxy-subscriptions/[id]/route.ts`
- `src/app/api/v1/management/proxy-subscriptions/[id]/refresh/route.ts`
- `src/app/api/v1/management/proxy-subscriptions/[id]/nodes/route.ts`
- `src/app/(dashboard)/dashboard/settings/components/proxy/SubscriptionTab.tsx`
- `tests/unit/proxySubscription.parse.test.ts`
- `tests/unit/proxySubscription.service.test.ts`
- `docs/proxy-subscriptions.md` (this file)

**Modified (minimal):**

- `src/lib/db/proxies/types.ts` — `+ subscriptionId: string | null` on
  `ProxyRegistryRecord`; `+ subscriptionId?: string | null` on `ProxyPayload`.
- `src/lib/db/proxies/mappers.ts` — `mapProxyRow` reads
  `subscription_id` from the row.
- `src/lib/db/proxies.ts` — INSERT / UPDATE / SELECT add `subscription_id`.
- `src/app/(dashboard)/dashboard/settings/components/ProxyTab.tsx` — adds
  one new sub-tab ("订阅代理") + the `literal` fallback for labels that
  aren't in the i18n catalog yet.