# 🛡️ Resilience Guide — OmniRoute

> How OmniRoute keeps your AI coding workflow running when providers fail.

## Overview

OmniRoute implements a multi-layered resilience system that ensures zero downtime:

```
Client Request
  → Rate Limit Check (per-IP, per-connection)
  → Combo Routing (13 strategies)
  → Connection Selection (P2C, round-robin, etc.)
  → Request Queue & Pacing
  → Execute (provider-specific executor)
    → On Failure:
      → Connection Cooldown (exponential backoff)
      → Circuit Breaker (provider-level)
      → Wait For Cooldown (auto-retry)
      → Next Combo Target (fallback chain)
  → Response
```

---

## Request Queue & Pacing

Per-connection request buckets smooth bursts before they hit upstream rate caps.

Configure in `Dashboard → Settings → Resilience`:

| Setting         | Default | Description                          |
| --------------- | ------- | ------------------------------------ |
| Queue Size      | `10`    | Max queued requests per connection   |
| Pacing Interval | `0ms`   | Minimum gap between requests         |
| Max Concurrent  | `5`     | Simultaneous requests per connection |

---

## Connection Cooldown

A single connection cools down after retryable failures. Features:

- **Exponential Backoff** — progressively longer cooldowns after each failure
- **`Retry-After` Header Support** — respects upstream hints
- **Configurable Base/Max** — tune cooldown duration per use case
- **Auto-Recovery** — connection automatically becomes available after cooldown expires

---

## Circuit Breaker

Provider-level protection against cascading failures:

1. **Connection-scoped `429` rate limits** stay in Connection Cooldown (don't trip the breaker)
2. **Provider-wide transient errors** (5xx, network timeouts) increment the failure counter
3. **Breaker trips** only after fallback is exhausted AND the provider still fails
4. **Recovery** — breaker automatically moves to half-open state after timeout, tests with probe request

Configure thresholds in `Dashboard → Settings → Resilience`.

---

## Wait For Cooldown

Instead of immediately failing when all connections are in cooldown, OmniRoute can wait for the earliest connection to expire and retry:

- **Automatic** — server waits for the earliest cooldown to expire
- **Transparent** — client sees a slightly delayed response instead of an error
- **Configurable** — enable/disable per combo or globally

---

## Anti-Thundering Herd

When multiple concurrent requests hit a failing provider simultaneously:

- **Mutex Protection** — only one retry attempt at a time per connection
- **Semaphore** — limits concurrent retry storms across connections
- **Deduplication** — identical requests within 5s window are deduplicated

---

## Combo Fallback Chains

The primary resilience mechanism. Configure in `Dashboard → Combos`:

```txt
Combo: "always-on"
  1. cc/claude-opus-4-7        ← Primary (subscription)
  2. cx/gpt-5.2-codex          ← Secondary (subscription)
  3. glm/glm-4.7               ← Cheap backup ($0.5/1M)
  4. if/kimi-k2-thinking        ← Free fallback (unlimited)
```

When provider #1 fails (quota, rate, or health), OmniRoute automatically routes to #2, then #3, then #4 — with zero manual intervention.

### 13 Routing Strategies

| Strategy            | Description                        |
| ------------------- | ---------------------------------- |
| `priority`          | First available in order           |
| `weighted`          | Weighted distribution              |
| `fill-first`        | Fill primary before moving         |
| `round-robin`       | Rotate through all targets         |
| `p2c`               | Power-of-two choices (quota-aware) |
| `random`            | Random selection                   |
| `least-used`        | Least recently used                |
| `cost-optimized`    | Cheapest available                 |
| `strict-random`     | True random (no tracking)          |
| `auto`              | OmniRoute selects based on context |
| `lkgp`              | Last Known Good Provider           |
| `context-optimized` | Best for current context window    |
| `context-relay`     | Session handoff during rotation    |

---

## TLS Fingerprint Spoofing

OmniRoute makes proxied traffic look like legitimate browser/CLI requests:

- **Browser-like TLS** via `wreq-js` — prevents bot detection
- **CLI Fingerprint Matching** — reorders headers and body fields to match native CLI binary signatures (Claude Code, Codex, etc.)
- **Proxy IP Preservation** — stealth features work on top of proxy IP masking

---

## Health Dashboard

Monitor all resilience components in real-time at `Dashboard → Health`:

- **Uptime** — server uptime and last restart
- **Provider Breaker States** — open/closed/half-open per provider
- **Connection Cooldowns** — active cooldowns with expiry times
- **Cache Stats** — signature + semantic cache hit rates
- **Lockouts** — API key lockouts and IP bans
- **Latency** — p50/p95/p99 percentiles

---

## See Also

- [Architecture Guide](ARCHITECTURE.md) — System architecture and internals
- [User Guide](USER_GUIDE.md) — Providers, combos, CLI integration
- [Auto-Combo Engine](AUTO-COMBO.md) — 6-factor scoring, mode packs
