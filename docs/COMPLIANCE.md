# Compliance & Audit

> **Source of truth:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Last updated:** 2026-05-13 — v3.8.0

OmniRoute records administrative actions, authentication events, provider
credential lifecycle changes, and MCP tool invocations to SQLite-backed audit
tables. This page covers what gets logged, where it lives, how long it is
retained, how API keys can opt out, and how to query the data.

The implementation lives in `src/lib/compliance/index.ts` (T-43 — "Compliance
Controls") and `src/lib/compliance/providerAudit.ts`. Audit writes never throw:
on any failure the call is silently swallowed so audit logging cannot break the
main request flow.

## What Gets Logged

### Administrative audit events (`audit_log`)

Every call to `logAuditEvent({ action, actor, target, details, ... })` produces
one row. Action strings follow a `domain.verb` (or `domain.verb.outcome`)
pattern. Confirmed in-tree action types include:

| Action                               | Source                                  |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Each entry captures `action`, `actor` (defaults to `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id`, and `timestamp`. Sensitive keys (`apiKey`, `accessToken`,
`refreshToken`, `password`, anything matching `*token`/`*secret`/`*apikey`,
etc.) are recursively redacted to `"[redacted]"` before the row is written.

### MCP tool calls (`mcp_tool_audit`)

Every MCP tool invocation writes a row through
`open-sse/mcp-server/audit.ts`. Schema (from
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Column           | Notes                               |
| ---------------- | ----------------------------------- |
| `id`             | autoincrement                       |
| `tool_name`      | MCP tool identifier                 |
| `input_hash`     | sha256 of input (no payload stored) |
| `output_summary` | short, truncated summary            |
| `duration_ms`    | wall time                           |
| `api_key_id`     | caller (nullable)                   |
| `success`        | `1` / `0`                           |
| `error_code`     | terminal error code on failure      |
| `created_at`     | ISO timestamp                       |

### Request / usage logs

These are operational telemetry (not strictly admin audit) but share the same
retention pipeline:

- `usage_history` — per-request usage roll-up
- `call_logs` — full per-request log (subject to row-cap, see below)
- `proxy_logs` — proxy traffic log (subject to row-cap)
- `request_detail_logs` — legacy detailed request log (still pruned if present)

## Storage Schema

`audit_log` is created lazily by `ensureAuditLogSchema()` on first use:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Indexes are created on `timestamp`, `action`, `actor`, `resource_type`,
`status`, and `request_id`. Missing columns on legacy DBs are added via
`ALTER TABLE` on demand.

## Retention & Cleanup

Two separate retention windows are honoured:

| Env var                     | Default  | Applies to                                                        |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Row-cap trim for `call_logs`                                      |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Row-cap trim for `proxy_logs`                                     |

`cleanupExpiredLogs()` runs the retention pass. It is invoked on server startup
from `src/server-init.ts` and `src/instrumentation-node.ts`. Each run logs a
`compliance.cleanup` audit event with the per-table delete counts. Proxy/call
log trimming is batched (`BATCH_SIZE = 5000`) to avoid long write locks.

Defaults are defined in `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` Opt-Out (per API key)

API keys can be flagged so their downstream call traffic is not logged. The
flag lives on the `api_keys` table (`no_log INTEGER DEFAULT 0`) and is mirrored
into an in-memory set for hot-path lookups.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Helpers (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — toggle the in-memory entry
- `isNoLog(apiKeyId)` — checked on the request path; falls back to a 30 s
  cached read from `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, comma-separated) — preloaded into the in-memory
  set on boot; useful when you cannot toggle the column directly

Administrative audit events (login, provider changes, MCP tool calls, etc.)
are **not** affected by `noLog` — only per-request traffic logging is opted
out.

## REST API

| Endpoint                    | Method | Description                                | Auth       |
| --------------------------- | ------ | ------------------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET`  | Paginated admin audit entries with filters | management |
| `/api/mcp/audit`            | `GET`  | Paginated MCP tool audit entries           | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | Aggregated MCP audit stats                 | (open-sse) |

No CSV export endpoint is shipped today — export from the dashboard or query
the SQLite database directly.

### Querying `/api/compliance/audit-log`

Supported query params (all optional, all use `LIKE %value%` matching for
text filters):

- `action`, `actor`, `target`, `resourceType` (or `resource_type`),
  `status`, `requestId` (or `request_id`)
- `from` / `since`, `to` / `until` — ISO timestamps
- `limit` (default `50`, min `1`, max `500`)
- `offset` (default `0`, max `10_000`)

The response is a JSON array. Pagination metadata is returned in headers:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

The dashboard exposes audit data at **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). The page has two tabs:

- **Compliance** (`ComplianceTab.tsx`) — admin audit events from
  `/api/compliance/audit-log`. Filters by event type, severity (info / warning
  / critical, derived from action + status), and date range. Severity is
  computed client-side from the action/status strings.
- **MCP** (`McpAuditTab.tsx`) — MCP tool audit from `/api/mcp/audit`, with
  filters by tool name and success/failure.

Both tabs paginate with page sizes of `50` (compliance) and `25` (MCP).

## Provider Credential Helpers

`src/lib/compliance/providerAudit.ts` provides shaping helpers used by the
provider-management routes when they emit credential events:

- `summarizeProviderConnectionForAudit(connection)` — strips `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, and
  `providerSpecificData.consoleApiKey` before the connection snapshot is
  written to `details`.
- `getProviderAuditTarget(connection)` — composes a stable
  `"<provider>:<name|id>"` string for the `target` field.
- `extractProviderWarnings(...payloads)` — scans provider responses for
  policy/safety warnings (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) and
  surfaces up to 5 hits, each truncated to 400 chars.

## Best Practices

- Flag API keys handling PII (legal, medical, etc.) with `noLog: true`.
- Tune `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` to meet your
  retention policy. The 7-day defaults are conservative.
- Export the audit table off-platform (`sqlite3 dump`) on whatever cadence
  your compliance program requires — no built-in archival exists.
- Track `auth.login.failed` and `auth.login.locked` counts for brute-force
  detection.
- When adding new admin endpoints, call `logAuditEvent({ ... })` with a stable
  `domain.verb.outcome` action string and pass the request context via
  `getAuditRequestContext(request)` so IP and `requestId` are captured
  automatically.

## See Also

- [`docs/GUARDRAILS.md`](./GUARDRAILS.md) — PII masking, prompt injection
- [`docs/MCP-SERVER.md`](./MCP-SERVER.md) — MCP tool catalog and scopes
- [`docs/ENVIRONMENT.md`](./ENVIRONMENT.md) — full env var reference
- Source: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
