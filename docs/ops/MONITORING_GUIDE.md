---
title: "Monitoring & Observability Guide"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Monitoring & Observability Guide

> **TL;DR**: OmniRoute ships with built-in health monitoring, provider autopilot, quota tracking, and observability hooks. This guide covers the dashboard, alerts, and troubleshooting.

**Sources:**

- `src/lib/monitoring/observability.ts` — observability snapshot
- `src/lib/monitoring/comboHealthAutopilot.ts` — combo health autopilot
- `src/lib/monitoring/providerHealthAutopilot.ts` — provider autopilot
- `src/lib/monitoring/providerHealthMatrix.ts` — provider health matrix
- `src/lib/localHealthCheck.ts` — local health check
- `src/lib/tokenHealthCheck.ts` — token refresh health
- `src/lib/proxyHealth.ts` — proxy health cache (covered in PROXY_GUIDE.md)

---

## Overview

OmniRoute has **3 layers of monitoring**:

```
┌──────────────────────────────────────────────────────────────┐
│  Layer 1: System Health (server-level)                        │
│  ├─ localHealthCheck.ts — DB, ports, native deps              │
│  ├─ db/healthCheck.ts — integrity, FK, orphaned artifacts     │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Layer 2: Provider Health (per-provider resilience)            │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowns   │
│  ├─ providerHealthMatrix.ts — health scores by provider/model │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Layer 3: Live Observability (runtime snapshots)               │
│  ├─ observability.ts — circuit breakers, sessions, quota       │
│  ├─ tokenHealthCheck.ts — OAuth token refresh health          │
│  └─ MCP tools: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Dashboard Pages

### `/dashboard/health` (System Health)

The top-level health dashboard shows:

| Section              | What it shows                                      |
| -------------------- | -------------------------------------------------- |
| **Server status**    | Uptime, version, port, active connections          |
| **Database**         | Connection, integrity, WAL size, recent migrations |
| **Provider summary** | Active count, healthy count, breaker open count    |
| **Quota monitors**   | Active sessions, alerting, exhausted               |
| **Recent errors**    | Last 10 errors with stack traces                   |
| **Resource usage**   | Memory, CPU, heap pressure indicator               |

### `/dashboard/providers` (Provider Health)

Per-provider dashboard:

| Column      | Description                           |
| ----------- | ------------------------------------- |
| Provider    | Provider ID + display name            |
| Health      | Green/yellow/red status               |
| Circuit     | Open/closed/half-open state           |
| Connections | Count of connections, last refresh    |
| Models      | Available models, health per model    |
| Cost        | Today's cost, 7-day trend             |
| Errors      | Last 24h error count, top error class |

Click a provider to see:

- Recent requests with latency breakdown
- Per-connection health scores
- Per-model lockouts
- Autopilot recommendations

### `/dashboard/quota` (Quota Tracking)

For each API key:

- Current usage vs limit (progress bar)
- Quota trend (30-day chart)
- Next reset time
- Alert history

### `/dashboard/combos` (Combo Health)

Per-combo:

- Strategy + targets
- Health per target
- Recent fallback events
- Success rate (24h, 7d, 30d)

---

## Health Check API

> **Note:** Only `GET /api/monitoring/health` is exposed as a REST endpoint. All other monitoring data (provider health, autopilot issues, quota monitors, token health, latency) is accessed via the **MCP tool** `observability_snapshot` or the **dashboard** pages — there are no dedicated REST routes for these.

### System Health

```bash
GET /api/monitoring/health
```

Response:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

### Provider Health

> **No REST endpoint.** Provider health data is available via the MCP tool `observability_snapshot` or the dashboard `/dashboard/providers` page.

### Provider Detail

> **No REST endpoint.** Per-provider detail is available via the dashboard `/dashboard/providers` page.

---

## Provider Health Autopilot

The `providerHealthAutopilot.ts` module is a **self-healing system** that:

1. Detects provider issues (circuit open, cooldowns, lockouts, quota warnings)
2. Generates **recommended actions** to resolve them
3. Optionally **auto-executes** low-risk actions

### Issue Types Detected

| Issue kind                   | Severity | Example condition                     |
| ---------------------------- | -------- | ------------------------------------- |
| `provider_circuit_open`      | critical | Circuit breaker open after 5 failures |
| `provider_circuit_half_open` | warning  | Circuit testing recovery              |
| `connection_cooldown`        | warning  | Connection in cooldown after 429      |
| `stale_connection_error`     | warning  | Last refresh failed 30+ minutes ago   |
| `terminal_connection_error`  | critical | OAuth revoked, key invalid            |
| `inactive_connection`        | info     | Connection disabled in settings       |
| `model_lockout`              | warning  | Specific model in quarantine          |
| `quota_monitor_warning`      | warning  | Quota at 80%+ usage                   |

### Action Types Generated

| Action                         | Risk   | Description                         |
| ------------------------------ | ------ | ----------------------------------- |
| `clear_provider_breaker`       | medium | Reset the circuit breaker to closed |
| `clear_connection_cooldown`    | low    | Remove cooldown from a connection   |
| `clear_stale_connection_error` | low    | Clear stale error flag              |
| `clear_model_lockout`          | low    | Re-enable a quarantined model       |
| `reactivate_connection`        | medium | Re-enable a deactivated connection  |
| `deactivate_connection`        | high   | Disable a problematic connection    |

### API

> **No REST endpoint.** Autopilot issues are available via the MCP tool `observability_snapshot` or the dashboard. The autopilot runs internally; its behavior is configured via the settings DB (per-connection `autopilotMode` field), not environment variables — `grep -rn` for an autopilot-mode env var returns zero hits.

### Autopilot Mode

The autopilot operates in **manual mode** by default — it detects issues and generates recommended actions, but does not auto-apply them. Actions can be applied via the dashboard.

---

## Combo Health Autopilot

`comboHealthAutopilot.ts` is the **combo-specific** equivalent of the provider autopilot. It:

- Detects unhealthy combos
- Recommends target reordering
- Suggests disabling broken targets
- Auto-removes dead targets after N failures

### Combo Issue Examples

```
Combo "always-on" (priority strategy)
├─ Target 1: openai/gpt-5 (healthy)
├─ Target 2: anthropic/claude-opus-4-6 (⚠️ model lockout until 14:00)
└─ Target 3: kiro/claude-sonnet-4-5 (healthy)

Recommended action: Reorder — move kiro above anthropic until lockout expires
```

---

## Quota Monitors

`observability.ts` exposes **per-session quota monitors** for subscription providers (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Status Meanings

| Status      | When                     | UI action                         |
| ----------- | ------------------------ | --------------------------------- |
| `starting`  | Initial poll in progress | Spinner                           |
| `idle`      | No recent activity       | Hidden from dashboard             |
| `healthy`   | Quota > 50% remaining    | Green dot                         |
| `warning`   | Quota < 50% remaining    | Yellow alert                      |
| `exhausted` | Quota = 0%               | Red block, route to next provider |
| `error`     | Polling failed           | Red dot, retry soon               |

### API

> **No REST endpoint.** Quota monitor data is available via the MCP tool `observability_snapshot` or the dashboard.

---

## Observability Snapshot

The MCP tool `observability_snapshot` returns a **complete system snapshot** for AI agents:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {
    /* see above */
  },
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agents use this to make **routing decisions** — for example, "if openai's circuit is open, route to anthropic first".

---

## Token Health Check

OAuth providers (Claude Code, GitHub Copilot, Cursor) need **periodic token refresh**. `src/lib/tokenHealthCheck.ts` runs a background scheduler:

- **Sweep tick**: every 60 seconds (sweep in `TICK_MS = 60 * 1000` at `src/lib/tokenHealthCheck.ts:30`)
- **Per-connection health check interval**: default 60 minutes (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); configurable via the settings DB
- **Pre-emptive refresh on 401**: handled by the per-connection interceptor

### Token Health Status

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Configuration

Token health check configuration is handled internally by `tokenHealthCheck.ts`.

### Token Health

> **No REST endpoint.** Token health data is available via the dashboard or the MCP tool `observability_snapshot`.

---

## Alerting

### Built-in Channels

OmniRoute supports **3 alert channels**:

| Channel          | Setup         | Use case                     |
| ---------------- | ------------- | ---------------------------- |
| Dashboard banner | Always on     | In-app notifications         |
| Webhook          | Configure URL | Slack, Discord, PagerDuty    |
| Log              | Default       | For external log aggregation |

### Webhook Configuration

> **Note:** Webhook alerting configuration is handled via the dashboard Settings page. See the Settings UI for webhook URL, event filtering, and payload customization.

### Alert Types

| Alert                        | When                             | Default severity |
| ---------------------------- | -------------------------------- | ---------------- |
| `provider_circuit_open`      | Circuit opens                    | critical         |
| `provider_circuit_half_open` | Circuit testing recovery         | info             |
| `quota_warning`              | Quota at 80%+                    | warning          |
| `quota_exhausted`            | Quota at 100%                    | critical         |
| `token_refresh_failed`       | 3+ consecutive refresh failures  | warning          |
| `token_expired`              | Token past expiry                | critical         |
| `combo_target_unhealthy`     | Combo target in cooldown for 1h+ | warning          |
| `db_integrity_warning`       | FK violations > 0                | warning          |
| `heap_pressure`              | Heap usage > 80% of threshold    | warning          |

---

## Performance Metrics

### Tracked Metrics

| Metric                  | Type      | Source                          |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | counter   | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | counter   | `services/usage.ts`             |
| `cost_usd`              | counter   | `services/usage.ts`             |
| `provider_errors`       | counter   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | counter   | `services/resilience.ts`        |
| `cache_hits`            | counter   | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | gauge     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | gauge     | `observability.ts`              |

### Latency Percentiles (p50/p95/p99)

> **No REST endpoint.** Latency percentile data is available via the dashboard `/dashboard/health` page. Prometheus/OpenTelemetry export is planned for v3.9.

### Prometheus / OpenTelemetry Export (Phase 2)

Planned for v3.9: native export to Prometheus, OpenTelemetry, Datadog.

For now, scrape `/api/monitoring/health` with any HTTP-based monitoring system (Prometheus blackbox exporter, Datadog HTTP check, etc.).

---

## Alerting Recipes

### Slack

> **Note:** Webhook alerting is configured through the dashboard Settings page — there are no dedicated webhook env vars (`grep -rn` returns zero hits). See the Settings UI for webhook URL, event filtering, and payload customization.

### Discord

> Webhook alerting uses the same Settings UI flow as Slack. Discord accepts the same JSON payload shape.

### PagerDuty

> Webhook alerting uses the same Settings UI flow. PagerDuty Events API v2 routing keys are configured in the Settings UI.

### Custom Webhook (JSON)

> Any HTTP endpoint that accepts POST with JSON body will work. Configure the URL in the Settings UI.

---

## Dashboard Configuration

### Customize the Health Dashboard

Create a `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Pin a Provider to the Top

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Troubleshooting

### "Provider says healthy but requests fail"

1. Check the **autopilot issues** — maybe a model is locked out
2. Look at **recent errors** for the specific error class
3. Try the **connection test** in the provider card
4. Check if the provider is **rate-limited at upstream** (not visible locally)

### "Quota says healthy but I see 429s"

- 429 means the provider says you've used your quota
- OmniRoute's quota tracking may be **stale** — the provider's truth is upstream
- Quota data refreshes automatically via the internal quota monitor

### "Combo is failing but all targets look healthy"

- Check **combo health** dashboard for target ordering issues
- Look at **fallback events** — maybe the combo is exhausting too quickly
- Verify the **strategy** matches your use case (priority vs round-robin vs auto)

### "Database health check is failing"

- Run `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- If "ok" — false alarm, the health check is being too strict
- If anything else — **stop OmniRoute** and follow the [disaster recovery guide](./DATABASE_GUIDE.md#disaster-recovery)

### "Memory heap pressure is critical"

```bash
# Check current heap
node -e "console.log(process.memoryUsage())"

# Trigger manual GC (if --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reduce concurrent requests (set via the dashboard Settings page, not an env var)
# There is no `MAX_CONCURRENT_REQUESTS` env var — configure it in Settings → Concurrency.
```

---

## See Also

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — usage & cost tracking
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB schema + health
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy health (separate cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — system architecture
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker details
- Source: `src/lib/monitoring/` (4 files, 2121 LOC)
