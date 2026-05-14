---
title: "Resilience Guide"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Resilience Guide

OmniRoute has three distinct but related resilience mechanisms. Each has a different scope and purpose. Keep them separate when debugging routing behavior.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Source: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provider Circuit Breaker

**Scope:** entire provider (e.g., `glm`, `openai`, `anthropic`).

**Purpose:** stop sending traffic to a provider that is repeatedly failing at the upstream/service level.

**Implementation:**

- Core class: `src/shared/utils/circuitBreaker.ts`
- Wiring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API: `GET /api/monitoring/health`
- Reset API: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- DB table: `domain_circuit_breakers`

**States:**

- `CLOSED` — normal traffic allowed
- `OPEN` — provider temporarily blocked; combo routing skips it
- `HALF_OPEN` — reset timeout elapsed; probe request allowed

**Defaults (`open-sse/config/constants.ts`):**

| Class   | Threshold  | Reset timeout |
| ------- | ---------- | ------------- |
| OAuth   | 3 failures | 60s           |
| API-key | 5 failures | 30s           |
| Local   | 2 failures | 15s           |

**Trip codes:** only provider-level statuses `[408, 500, 502, 503, 504]`. Do NOT trip for account-level errors (most 401/403/429 — those belong to cooldown or lockout).

**Lazy recovery:** when `OPEN` expires, `getStatus()`, `canExecute()`, `getRetryAfterMs()` refresh state to `HALF_OPEN`. No background timer needed.

---

## 2. Connection Cooldown

**Scope:** single provider connection/account/key.

**Purpose:** skip one bad key while other connections for the same provider keep serving.

**Implementation:**

- Mark unavailable: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selection: `getProviderCredentials*` in same file
- Cooldown calc: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Settings: `src/lib/resilience/settings.ts`

**Fields per connection:**

- `rateLimitedUntil` — timestamp until cooldown expires
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponential backoff counter

**Default cooldowns:**

- OAuth base: 5s
- API-key base: 3s
- API-key 429: prefers upstream `Retry-After`/reset headers/parseable reset text
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Anti-thundering-herd guard:** prevents concurrent failures from over-extending cooldown or double-incrementing `backoffLevel`.

**Terminal states (NOT cooldowns):**

- `banned`
- `expired`
- `credits_exhausted`

These persist until credentials change or an operator resets them. Do not overwrite terminal states with transient cooldown state.

**Lazy recovery:** when `rateLimitedUntil` is past, connection becomes eligible again. On successful use, `clearAccountError()` clears all error fields.

---

## 3. Model Lockout

**Scope:** provider + connection + model triple.

**Purpose:** avoid disabling a whole connection when only one model is unavailable or quota-limited.

**Examples:**

- Per-model quota providers returning 429
- Local providers returning 404 for one missing model
- Provider-specific mode/model permission failures (e.g., Grok modes)

**Implementation:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns Dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Lists active lockouts with: provider, connection, model, reason, expiresAt. Operators can manually re-enable a model from the card.

**REST API:**

- `GET /api/resilience/model-cooldowns` — list active lockouts
- `DELETE /api/resilience/model-cooldowns` — manual re-enable. Body: `{provider, connection, model}`. Auth: management.

---

## Other Resilience Features

- **14 routing strategies** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, strict-random, auto, lkgp, context-optimized) — see [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-aware routing** (v3.8.0) — prioritizes connections by quota reset time.
- **Background mode degradation** — Responses API `background: true` degraded to sync with warning.
- **Dynamic tool limit detection** — backs off providers when tool count limits hit.

---

## Debugging

- All keys for a provider skipped → check both circuit breaker state AND each connection's `rateLimitedUntil`/`testStatus`.
- Provider permanently excluded after reset window → code reading raw `state` instead of `getStatus()`/`canExecute()`.
- One key fails, others should work → prefer connection cooldown over circuit breaker.
- Only one model fails → prefer model lockout over connection cooldown.
- State should self-recover but doesn't → check for future timestamp + read path that refreshes expired state. Permanent statuses require manual changes.

---

## TLS Fingerprinting & Stealth

Provider-specific stealth (JA3/JA4, CCH, obfuscation) is separately documented — see [STEALTH_GUIDE.md](../security/STEALTH_GUIDE.md).

---

## See Also

- [Architecture Guide](./ARCHITECTURE.md) — System architecture and internals
- [User Guide](../guides/USER_GUIDE.md) — Providers, combos, CLI integration
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — 6-factor scoring, mode packs
