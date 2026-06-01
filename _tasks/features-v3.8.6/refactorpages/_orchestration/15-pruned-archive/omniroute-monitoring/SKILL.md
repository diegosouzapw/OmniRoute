---
name: omniroute-monitoring
description: Monitor OmniRoute system health, provider circuit breakers, per-provider latency (p50/p95/p99), quota usage, and set budget guards. Use when the user wants to check if the system is healthy, debug slow providers, manage spend limits, or set up oncall-style monitoring.
---

# OmniRoute — Monitoring & Health

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## System health

```bash
curl $OMNIROUTE_URL/api/health \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Returns: uptime, memory, active connections, circuit breaker states, rate limit status, cache stats.

Unauthenticated quick check:

```bash
curl $OMNIROUTE_URL/api/health
# → {"ok":true}
```

## Provider circuit breakers

Circuit breakers prevent traffic from hitting failing providers.

States: `CLOSED` (normal), `OPEN` (blocked), `HALF_OPEN` (probe mode — auto-recovers).

```bash
curl $OMNIROUTE_URL/api/monitoring/health \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Response includes `circuitBreakers` array with per-provider state and `resetAt` timestamp.

## Per-provider metrics (p50/p95/p99)

```bash
curl $OMNIROUTE_URL/api/providers/metrics \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Response shape per provider:

```json
{
  "provider": "anthropic",
  "requests": 1247,
  "successRate": 0.994,
  "latency": { "p50": 820, "p95": 2100, "p99": 3800 },
  "circuitState": "CLOSED",
  "tokensUsed": 2847000
}
```

## Via MCP (if OmniRoute is your MCP server)

```
omniroute_get_health            → full system health snapshot
omniroute_get_provider_metrics  → p50/p95/p99 + circuit state per provider
omniroute_get_session_snapshot  → cost, tokens, errors for current session
omniroute_check_quota           → quota balance + percent remaining + reset time
omniroute_db_health_check       → diagnose + auto-repair database drift
```

## Quota check

```bash
curl $OMNIROUTE_URL/api/quota \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Returns used/total tokens and requests per provider/account, with `resetAt` timestamps.

## Budget guard (spend limit)

Set a session spending limit that degrades or blocks requests when hit:

```bash
curl -X POST $OMNIROUTE_URL/api/budget/guard \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "limitUsd": 5.00,
    "action": "degrade",
    "degradeTo": "openai/gpt-4o-mini"
  }'
```

`action` options:

- `degrade` — switch to a cheaper model when limit is hit
- `block` — return 429 when limit is hit
- `alert` — continue but add `X-Budget-Warning` header

## MCP audit log

OmniRoute logs every MCP tool call to `mcp_audit` table. Query via API:

```bash
curl "$OMNIROUTE_URL/api/mcp/status" \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Returns: server status, heartbeat, recent audit activity summary.

## Errors

- `503` on health endpoint → OmniRoute is starting up; retry in 5s
- Circuit breaker `OPEN` → provider is temporarily blocked; check `resetAt` to know when it auto-recovers
- `429 budget_exceeded` → budget guard limit reached; raise limit or wait for reset
