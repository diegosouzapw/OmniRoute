---
title: "Resilience Guide"
version: 3.8.40
lastUpdated: 2026-06-28
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
- `DEGRADED` — traffic still allowed, but elevated provider failures are being tracked
- `OPEN` — provider temporarily blocked; combo routing skips it
- `HALF_OPEN` — reset timeout elapsed; probe request allowed

**Configurable defaults (`open-sse/config/constants.ts`, exposed in Dashboard → Settings → Resilience):**

| Class   | Degraded at | Opens at    | Reset timeout |
| ------- | ----------- | ----------- | ------------- |
| OAuth   | 5 failures  | 8 failures  | 60s           |
| API-key | 7 failures  | 12 failures | 30s           |
| Local   | derived     | 2 failures  | 15s           |

`degradationThreshold` controls when a provider enters `DEGRADED`; `failureThreshold` controls when it opens and is skipped. Local provider profiles are not exposed on the Resilience settings page yet.

**Trip codes:** only provider-level statuses `[408, 500, 502, 503, 504]`. Do NOT trip for account-level errors (most 401/403/429 — those belong to cooldown or lockout).

**Lazy recovery:** when `OPEN` expires, `getStatus()`, `canExecute()`, `getRetryAfterMs()` refresh state to `HALF_OPEN`. No background timer needed.

---

### Opt-in global Provider Cooldown (window gate)

A fourth, **opt-in** layer (`PROVIDER_COOLDOWN_ENABLED`, default **off**) keeps a
cross-request memory of failing providers in
`open-sse/services/providerCooldownTracker.ts`, consulted by combo target
resolution so consecutive combo requests stop re-walking a provider that just
failed. Provider-level entries honor the `PROVIDER_PROFILES` window gate:

| Profile | trips after (`providerFailureThreshold`) | inside (`providerFailureWindowMs`) | cools for (`providerCooldownMs`) |
| ------- | ---------------------------------------: | ---------------------------------: | -------------------------------: |
| OAuth   |                                     `10` |                            `15min` |                           `5min` |
| API key |                                     `15` |                            `30min` |                          `10min` |

Below the threshold the provider is **not** considered cooling; a success clears
the window. Connection-level entries (`provider:connectionId`) keep the
exponential `minRetryCooldownMs → maxRetryCooldownMs` backoff instead. Overrides:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regression guard: `tests/unit/provider/provider-cooldown-window-gate.test.ts`.

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

- `banned` — set by banned-keyword / account-ban detection (see [BAN_DETECTION](../security/BAN_DETECTION.md))
- `expired` (transitions to terminal after bounded retries — `EXPIRED_RETRY_MAX = 3` with exponential backoff — so transient OAuth errors can self-heal before the account is permanently deactivated)
- `credits_exhausted`

These persist until credentials change or an operator resets them. Do not overwrite terminal states with transient cooldown state.

**Lazy recovery:** when `rateLimitedUntil` is past, connection becomes eligible again. On successful use, `clearAccountError()` clears all error fields.

### Session affinity (#7274)

**Scope:** one client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) pinned to one connection, for **any** provider.

**Purpose:** keep a multi-turn agent (Claude Code, aider, custom agents) on the same account across requests, reducing cross-account context loss and repeated cold-start 429s on providers with per-account session state.

**Implementation:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header extraction (generic, any provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (global TTL in ms, `0` disables) — `src/lib/db/settings.ts`. Renamed from the Codex-only `codexSessionAffinityTtlMs` by migration `124_generic_session_affinity_ttl.sql`, which carries over any previously-configured Codex TTL as the new default.

Before #7274, `resolveSessionAffinityTtlMs()` hard-bailed to `0` for every provider except `codex`, so the TTL setting (and the session headers) had no effect anywhere else even though the pinning mechanism and header extraction were already provider-agnostic. The fix removed that early-return; the TTL now applies uniformly to every provider once set globally above `0`.

The three session-affinity headers are never forwarded upstream — executors build their own upstream headers from scratch rather than passing client headers through, so this stays an internal correlation id only.

### Exclusive managed session connection leases

**Scope:** one active managed HTTP client/session owns one eligible OmniRoute connection.

**Purpose:** provide durable exclusive connection ownership for clients that need a hard routing
fence across requests. This differs from session affinity, which is a soft continuity preference:
an exclusive lease persists lifecycle state in SQLite, enforces global active-owner and
active-connection uniqueness, and rejects a stale generation before provider dispatch.

The feature is opt-in per API key. A managed key must have the `lease:exclusive` scope and an
explicit non-empty `allowedConnections` list. Any HTTP client can use the lifecycle endpoint; no
client name, user-agent, provider, OAuth method, or model is required. The lease owns a connection,
not a model, so a model change retains the binding while the connection remains ordinarily
eligible. Normal model, quota, health, cooldown, and allowlist rules remain authoritative and may
transition the same generation to another free eligible connection.

The lifecycle is `POST /api/v1/session-leases` with JSON actions `acquire`, `renew`, and `release`.
Managed inference requests present the opaque `X-OmniRoute-Lease-Owner` value and exact
`X-OmniRoute-Lease-Generation`. The owner uses `vlo_` followed by 43 base64url characters; only
its SHA-256 hash is stored. Every final dispatch fence also binds the authenticated API key ID and
active connection ID. Lease control headers are removed from logs, retained request snapshots, and
upstream executor headers.

If ordinary routing has eligible managed candidates but every free candidate is occupied by a
foreign active lease, OmniRoute returns HTTP `429`, lease-capacity-unavailable code, a
waiting-for-capacity state, and a bounded `Retry-After` derived from the earliest relevant expiry.
Ordinary empty eligibility is not lease contention and keeps its existing routing error semantics.

Related mechanisms remain separate:

- OAuth session occupancy is process-local soft distribution for OAuth accounts.
- Account semaphores grant request-concurrency permits and end when a request completes.
- Exclusive managed session leases are durable lifecycle ownership with a generation fence.

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

### Lockout settings UI + success-decay recovery (v3.8.23)

Model lockout went from always-on hardcoded behavior to a fully configurable,
opt-in feature with its own settings card and a self-healing recovery path.

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
This is **distinct** from the read-only `ModelCooldownsCard` above (which only
_lists_ active lockouts) — the new card _configures the parameters_. Defaults
live in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setting                 | Default                          | Meaning                                                        |
| ----------------------- | -------------------------------- | -------------------------------------------------------------- |
| `enabled`               | `false`                          | Master toggle — model lockout is **off by default**.           |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream statuses that count as a model-scoped failure.        |
| `baseCooldownMs`        | `120_000` (120 s)                | Initial lockout duration for the first failure.                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Cap on the escalated cooldown.                                 |
| `maxBackoffSteps`       | `10`                             | Max exponential-backoff escalation steps.                      |
| `useExponentialBackoff` | `true`                           | Whether repeated failures escalate the cooldown exponentially. |

Settings persist through the normal settings store and validate via the
resilience settings schema; the card clamps `baseCooldownMs`/`maxCooldownMs`
(with `maxCooldownMs ≥ baseCooldownMs`) and `maxBackoffSteps`.

**Success-decay recovery:** recovery is **not** purely timer expiry. A healthy
response walks the model's failure count back down so a model that recovered
mid-window stops escalating (and clears) before its timer would. On a successful
combo target, `open-sse/services/combo.ts` calls `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), which **halves** the stored
`failureCount` (`Math.floor(failureCount / 2)`); when it reaches `0` the lockout
entry is deleted entirely. The counterpart `recordModelLockoutFailure()`
increments the count (and escalates the cooldown) on failures within the
escalation window. This success-decay is in addition to plain timer expiry —
either path can re-enable a model.

**State:** lockouts are held **in-memory** (per-process `Map`s of
`ModelLockoutEntry` keyed by `provider:connectionId:model`), not persisted to
the DB — they are lost on restart. The _settings_ are persisted; the active
lockout _state_ is ephemeral.

---

## 4. Quota-Share Concurrency Control (v3.8.36)

Subscription accounts (GLM, MiniMax, etc.) often accept only ~1–3 concurrent
requests; exceeding that triggers 429s and cooldowns. This is acute under
**quota-share** (`qtSd/…`) combos, where several API keys share one upstream
account. Three layers keep a shared account from being flooded.

### Per-connection concurrency cap (`max_concurrent`)

Each provider connection can declare a `max_concurrent` ceiling
(`provider_connections.max_concurrent`, set in the connection modal / API / DB).
Leave it empty for no limit. This is the single knob that drives the serialization
layer below — set it to the account's real concurrency (e.g. GLM ~1, MiniMax ~2).

### Quota-share request serialization

When a quota-share dispatch targets a connection that declares a positive
`max_concurrent`, concurrent requests to that **account** are serialized through a
per-connection semaphore (key `qsconn:<connectionId>`): excess requests **wait in
the queue** instead of flooding the account. It is **fail-open** — a saturated
queue or timeout proceeds without a slot rather than ever rejecting a dispatchable
request. Toggle in **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, default
on). Without a `max_concurrent` cap the behavior is unchanged.

> The quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) is itself
> fail-open and only _deprioritizes_ an at-cap connection — with a
> single-connection pool it cannot hard-limit, so this semaphore is what actually
> contains the flood.

### Combo cooldown-aware retry

For every combo strategy (when enabled), a request that would crystallize a 429
for a SHORT transient cooldown waits it out and re-dispatches instead of
returning the 429 — this covers Gemini-class TPM/RPM windows (~60s retry-after)
on multi-model combos, e.g. both targets of a 2-model combo hitting a per-model
rate limit. Bounded by `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) in **Settings → Resilience**. It never waits on `quota_exhausted`
(locked until midnight) or auth/not-found reasons.

---

## 5. Request Queue Admission Control (v3.8.49 · issue #6593)

**Scope**: the local per-provider+connection rate-limit queue (`open-sse/services/rateLimitManager.ts`,
backed by Bottleneck), one layer below the three mechanisms above.

**`maxWaitMs` is a legacy persisted name for execution expiration.**
`resilienceSettings.requestQueue.maxWaitMs` is passed to Bottleneck as a job
`expiration`, whose timer starts only after dispatch. It therefore bounds
limiter-managed execution, not time spent in the local queue. Expiration is
surfaced as trusted local `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504);
the former queue-timeout code name is accepted only for trusted internal
backward compatibility. The default is 15000ms; override via
`RATE_LIMIT_MAX_WAIT_MS` (env) or the dashboard (**Settings → Resilience**,
1–30000ms UI ceiling). Queue residence has no time deadline; use
`maxQueueDepth` below to bound queued callers.

**`maxQueueDepth` — opt-in admission cap (new).** `resilienceSettings.requestQueue.maxQueueDepth`
bounds how many requests may sit queued (not yet dispatched) for one
provider+connection at once. When the queue already holds `maxQueueDepth`
requests, a new request is fast-rejected with a typed
`code: "RATE_LIMIT_QUEUE_FULL"` error **before** it ever reaches `limiter.schedule()`
— so the rejection is cheap and happens ahead of any downstream
prompt-compression / translation work for that request. Default `0` =
disabled, preserving the existing unbounded-queue behavior; bounded 0–100000.
Override via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) or
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

The admission check itself is a pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) so
it is unit-testable without a real Bottleneck limiter.

> The RFC that opened #6593 also proposed a `bypassCompressionOnRateLimit`
> flag. This repo's `open-sse/services/compression/` pipeline is
> prompt/context compression on the outbound LLM request (`chatCore.ts`,
> around the `resolveCompressionSettings`/`selectCompressionStrategy` block),
> not HTTP response compression on synthesized 429 bodies — there is no
> matching code path for a literal bypass flag. That prompt-compression step
> also currently runs _before_ `withRateLimit()` in the request pipeline, so
> reordering to skip it on a queue-full rejection is a separate, larger
> change than this issue's scope; it was intentionally **not** implemented
> here and is left as a follow-up if the CPU-saving win is worth the
> reordering risk.

---

## 6. Slow-stream throughput watchdog (#9709)

The optional `resilienceSettings.streamRecovery.throughputWatchdog` guard detects
an upstream that is still sending chunks but producing assistant output below the
configured useful-output rate. It is deliberately distinct from the idle timeout:
heartbeats and metadata reset neither timer and do not count as progress. It is also
distinct from the hard attempt deadline (#9153), which remains an absolute safety
ceiling regardless of output quality.

The watchdog requires a warm-up period followed by a complete rolling window before
it can abort. It counts text deltas from Chat Completions and Responses API output
events (a conservative UTF-8 byte proxy), ignores usage-only and empty events, and
suspends judgement while tool-call or reasoning events are in flight. It is disabled
by default and can be enabled with `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; the
window, warm-up, minimum rate, and minimum measurable output are bounded by the
normal resilience-settings normalization layer.

When enabled, a watchdog abort is applied only to the active upstream attempt. Before
any client-visible bytes, the existing same-account early-recovery path may reopen
the attempt. After commit, the stream is never blindly replayed; only the existing
safe mid-stream continuation contract can stitch a suffix. Finalization remains
single-shot, so usage accounting and semaphore release are not duplicated.

---

## 7. Upstream Status Restatement (misstated quota errors)

**Scope:** one upstream gateway that reports temporary quota exhaustion with the wrong HTTP status.

**Purpose:** correct a misleading status BEFORE classification, so downstream consumers (fallback engine, combo aggregation, the client-facing response) see the true retryable nature of the failure.

Some gateways signal TEMPORARY quota exhaustion with a non-retryable HTTP
status. `agentrouter.org` returns `403` (sometimes `400`) with a Chinese body
(`用户额度不足` / `额度不足`) instead of the standard `429`. Clients like Claude
Code treat `403` as permanent and abort the session, and without correction
the fallback engine would classify it as `AUTH_ERROR` instead of a quota
event.

**Implementation:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — a
  per-provider list of rules (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), matched via `applyStatusRestatement()`.
- Call site: the `providerFailure:` block in `open-sse/handlers/chatCore.ts`
  (around line 3654), right after `parseUpstreamError()` parses an upstream
  response with an error HTTP status (`!providerResponse.ok`), and before any
  classification runs, so every downstream consumer sees the corrected
  status. Errors embedded inside a `200` SSE stream follow a separate,
  later stream-parsing path and are **not** covered by this hook today — a
  known limitation, not yet needed for agentrouter's misstatus (which
  surfaces as an error HTTP status).
- Retry eligibility: `429` is in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), so a restated error
  carries a real retry window instead of surfacing as a dead `403`.
- The synthetic `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  is only what the restated response tells the **client**; it is not itself
  the connection's internal cooldown/lockout duration — that is governed
  separately by whichever mechanism actually handles the restated error
  (Connection Cooldown's escalating backoff, §2, base `3s` for API-key
  providers; or Model Lockout, §3, for per-model-quota providers like
  agentrouter). The router can become eligible to retry internally sooner
  than the 60s window it advertises to the client — intentional headroom,
  not a bug.

Permanent errors (agentrouter's `无权访问模型` — no access to this model) are
NEVER restated: `excludeMarkers` vetoes the rule even when `textMarkers` hit,
so the error keeps its original status and nothing retries it forever. The
matching provider classification rule
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, a `6h` declared base cooldown) is
consulted by `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_before_ the generic apikey-category `FORBIDDEN` early-return, gated on
`honorsRuleLockScope(provider)` (#10334 — currently agentrouter-exclusive via
the `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist in
`providerErrorRules.ts`). The rule's declared 6h cooldown flows through as
`fallbackResult.baseCooldownMs`, but it still feeds the pre-existing
per-model-quota lockout path (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, unchanged by #10334 except for the cooldown
source): it is clamped down to the operator's `mlSettings.maxCooldownMs`
(default `1_800_000ms` / 30min), like every other model lockout, and the
_persisted lockout reason_ stays the pre-existing hardcoded `"forbidden"`,
not the rule's `"auth_error"` — only the cooldown duration is honored
end-to-end, not the reason string. The connection itself stays active;
sibling models on the same connection are unaffected.

Restated quota errors (`额度不足`) reach a provider rule in production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, no declared cooldown of its own — the persistence layer's
scaled backoff default applies). Since #10334, `scope` on
`ProviderErrorRuleMatch` IS consumed end-to-end, but **only** for providers in
the `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist (`providerErrorRules.ts` —
today only `"agentrouter"`, gated via `honorsRuleLockScope()`). For every
other provider `scope` remains informational, exactly as before #10334.
`checkFallbackError` surfaces the matched rule's scope as
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) is the shared guard that confirms a
`ruleScope` is genuinely safe to honor as a connection-wide, self-recovering
signal (scope `"connection"`, reason `quota_exhausted`, never `permanent`,
never `creditsExhausted` — a defense against a future rule pairing scope
`"connection"` with a permanent account state). Two consumers call it:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  instead of falling into the passthrough-provider **per-model** lockout
  branch (agentrouter is `passthroughModels: true` → `hasPerModelQuota()`
  returns `true`), it applies a **temporary connection cooldown** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, never a terminal status
  (`credits_exhausted`/`banned`/`expired`) — so the connection self-recovers
  once the cooldown lapses instead of requiring a manual credential reset.
  Skipped for connections with `disableCooling: true` (#2997): that opt-out
  falls through to the per-model lockout instead (a documented trade-off —
  see the code comment above the branch).
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): the same guard marks the
  connection into the in-memory `exhaustedConnections` set, keyed
  `${provider}:${connectionId}`. This only skips a remaining SAME-REQUEST
  target that _itself already carries that exact `connectionId`_ on its own
  target object (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` before the `exhaustedConnections` lookup) — a plain
  model-list combo, where sibling targets carry no pinned `connectionId` of
  their own and one is only resolved per-dispatch from the response's
  `X-OmniRoute-Selected-Connection-Id` header, never hits that key match. For
  that common case, the real protection against a remaining leg reusing the
  just-exhausted account is NOT this Set — it is the persistence layer above
  (the connection's `rateLimitedUntil` is now in the future) combined with
  this same guard suppressing `transientRateLimitedProviders` for the
  failure (see "Two-stage design" and the code comment on the
  `isAgentrouterConnectionQuotaScope` branch in `targetExhaustion.ts`): with
  that Set left unmarked, `combo.ts`'s `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) does NOT kick in for
  the provider's remaining legs, so credential selection's `rateLimitedUntil`
  filter (`src/sse/services/auth.ts:1238`) is honored normally and a
  remaining leg either picks a different, still-eligible agentrouter
  connection or fails with no credentials available — it does not force its
  way back onto the connection this branch just cooled down.

### Two-stage design: status restatement, then classification

Status restatement (`upstreamStatusRestatement.ts`) and provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) are separate registries that both key on provider id
and text markers, but they run in different places and serve different
purposes: restatement rewrites the HTTP status early in `chatCore.ts`;
classification rules pick the fallback `reason` and lock `scope`
(`model` / `provider` / `connection`) inside `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Classification rules only see full error **text** (needed to match body
markers like `额度不足`) for providers listed in the `FULL_TEXT_RULE_PROVIDERS`
allowlist in `providerErrorRules.ts` — currently only `"agentrouter"`. For
every other **built-in catalog** provider, `checkFallbackError` hands
`getProviderErrorRuleMatch` only the structured error (`{code, type}`), which
is enough for header/status/code-based rules but blind to body-text markers.
The helper `resolveRuleMatchBody()` performs this selection: full error text
for allowlisted providers, the structured error otherwise. Adding a
**built-in** provider to `FULL_TEXT_RULE_PROVIDERS` is an explicit per-provider
opt-in — it exists so that the default path for every provider not on the
list stays byte-for-byte unchanged.

A rule's `scope` (`model` / `provider` / `connection`) is a separate opt-in
from `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` only surfaces it as
`fallbackResult.ruleScope`, and downstream consumers only honor it as
anything other than an informational label, for providers in the
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist in the same file (`gated via
honorsRuleLockScope()` — today only `"agentrouter"`). See "Restated quota
errors" above for what a `scope: "connection"` match actually does once a
provider is on that allowlist.

**#11104 — operator-declared rules bypass both allowlists.** An operator can
declare a per-provider rule at runtime via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
without editing this file. Gating an operator rule behind
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlists
meant to protect the **default** behavior of built-in catalog rules — would
make the settings mechanism inert for every provider except the ones already
listed there, since declaring the rule is already the operator's explicit
opt-in. `resolveRuleMatchBody()` and `honorsRuleLockScope()` both check
`hasOperatorRuleForProvider()` first: a provider with an operator rule gets
the raw error text and has its declared `scope` honored, regardless of
whether it also appears in either allowlist.

**Known gap — `providerRuleRegistry` is never consulted for HTTP 400.**
`checkFallbackError`'s `BAD_REQUEST` branch classifies status 400 entirely
through its own pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, etc. in `accountFallback.ts`) and returns before
the `configuredRule`/`getProviderErrorRuleMatch` branch above it is reached.
A built-in catalog rule (or an operator rule) with `status: 400` is
syntactically valid but will never fire. No existing rule targets 400 today,
so nothing in production is affected — but a future 400 rule needs this
branch touched first, which is a larger change than adding a rule (it
reclassifies 400 for every provider already relying on the pattern-array
behavior) and is out of scope for a single-provider rule addition.

### Adding a new quota-misstating gateway

1. Register one rule array in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Keep `textMarkers`
   provider-specific; never reuse generic English phrases that collide with
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Optionally register classification rules in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) to pick
   the right lock scope (`connection` for account-wide quota, `model` for
   per-model errors). This step only takes effect in production for
   providers whose rules need the full error text (body markers): add the
   provider id to `FULL_TEXT_RULE_PROVIDERS` in the same file — otherwise
   `checkFallbackError` only ever hands the rule the structured
   `{code, type}` error and a body-text rule will never match live traffic.
   Rules that match purely on `status`/`headers` (like Opencode's or
   Minimax's) do not need this opt-in. Separately, if the rule declares
   `scope: "connection"` and the intent is an actual connection-wide cooldown
   plus same-request combo skip (not just an informational label), add the
   provider id to `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in the same file — this
   is what gates `isAgentrouterConnectionQuotaScope()`-style consumption in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) and
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); without it, `scope`
   still flows through `fallbackResult.ruleScope` but nothing acts on it.
3. Add unit tests mirroring `tests/unit/upstream/upstream-status-restatement.test.ts`
   and `tests/unit/agentrouter/agentrouter-error-rules.test.ts` (including the
   not-permanent / not-creditsExhausted guards, and — if the provider needs
   the allowlist — a test asserting `resolveRuleMatchBody()` returns the
   full text only for that provider).

No changes to `chatCore.ts`, `classifyError`, or combo are needed.

#### Egress-bucketed lock (#10880)

Providers in `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode family) are treated
as IP-bucketed upstream (the opencode free tier is IP-bucketed, not
account-bucketed — see #9611): a status-429 classified `quota_exhausted`
**or** `rate_limit_exceeded` cools down every allowlisted-family connection
whose last known egress IP matches the failing connection's, before the
rotation can try them
— avoiding N-1 guaranteed-failed upstream calls (same shape as #10460/#10525).
`rate_limit_exceeded` is included deliberately: on the `markAccountUnavailable`
path the opencode-specific rules never match (no headers/body handed to
`checkFallbackError`, opencode not in `FULL_TEXT_RULE_PROVIDERS`), so a 429
whose body carries the subscription-quota text ("monthly usage limit
reached") is classified `quota_exhausted` by the quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) before
the `status_429` rule is ever reached — while a quota-text-free 429 (plain
rate limiting) classifies via the `status_429` rule as `rate_limit_exceeded`
and still cools the IP family down. For an allowlisted provider an IP-bucketed
rate limit is the same signal as an exhausted quota. Honest limits:

- **Best-effort**: the lock resolves the connection's last known `egress_ip`
  from `proxy_logs` (24h window, synchronous, no cache). Cold cache (egress
  IP never probed) or no row → the failing connection is still cooled by the
  branch (recorded like today), only no sibling is locked.
- **Never terminal**: the cooldown is a renewing quota window
  (`testStatus: "unavailable"`); a permanent state is never derived from an
  IP-level signal. `disableCooling` connections skip the branch entirely.
- **Lock granularity changes for the allowlisted family**: this is a scope
  change, not only a sibling optimization. opencode is a `passthroughModels`
  provider, so before this branch a 429 produced a per-MODEL lockout; it now
  produces a connection cooldown — including for an operator running a single
  connection with no sibling at all. That is the granularity the opencode rule
  table already declares correct (`scope: "connection"`,
  `providerErrorRules.ts`), never honored so far because opencode is not in
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. The branch writes the failing
  connection's cooldown + `backoffLevel` itself, mirroring the
  connection-scoped agentrouter branch, and returns — the per-model block and
  the generic path below are never reached.
- **Combo included**: like the agentrouter branch, the scope deliberately
  ignores the `persistUnavailableState`/`isCombo` downgrade a combo caller
  applies to a 429. A per-model lockout is not a weaker form of this scope, it
  is the wrong unit: it says nothing about the exhausted IP, so the combo
  rotation would keep burning one guaranteed-failed call per sibling.
- **Sibling safety**: a sibling already terminal (banned/credits_exhausted)
  or already in a longer cooldown is never overwritten.
- **Exclusive allowlist**: widening `EGRESS_BUCKETED_LOCK_PROVIDERS` is an
  explicit owner decision; no generic wiring (pattern #10334/#10419). The
  sibling query binds that same allowlist rather than repeating it as a SQL
  literal, so widening it stays a one-line change.
- **Egress IP rotation, both directions**: the lookup window (24h) is far
  wider than the egress-IP cache TTL (5 min), so "last known IP" is history,
  not current state. If a connection's proxy rotated within the window the
  lock may **miss** a genuinely shared IP (the recorded IP is the new,
  unexhausted one) — and symmetrically it may **cool a sibling that has since
  rotated away** from the exhausted IP. The second case costs that sibling one
  cooldown window; both are accepted best-effort limits of a history-based
  lookup.
- **Cost**: two bounded scans of `proxy_logs` (window-filtered via
  `idx_pl_timestamp`), only at 429 frequency. No new index (migration 134
  YAGNI). Measured on a real-traffic DB copy of moderate size; a
  high-throughput instance holds proportionally more rows in the same window.

---

## Other Resilience Features

- **19 routing strategies** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — see [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-aware routing** (v3.8.0) — prioritizes connections by quota reset time.
- **Background mode degradation** — Responses API `background: true` degraded to sync with warning.
- **Dynamic tool limit detection** — backs off providers when tool count limits hit.
- **Emergency fallback** — controlled by `OMNIROUTE_EMERGENCY_FALLBACK`; operators can override it from the Feature Flags page without a restart.

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

## Resilience testing (Phase 8 · Block C)

Beyond unit tests for resilience logic, three tests exercise the runtime under
real stress/failure conditions (all integration/nightly — none block PRs):

| Test        | What                                                                                                                                                                          | Run                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream node injects real latency/reset/timeout/503; validates that the circuit breaker opens/recovers and `checkFallbackError` classifies 503 as recoverable fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams per `createSSEStream` under `--expose-gc`; fails if the heap grows beyond the ceiling (OOM guard #3069).                                                         | `npm run test:heap`                      |
| k6 soak     | Sustained load against `/api/monitoring/health`; p95/error thresholds.                                                                                                        | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestrated by `.github/workflows/nightly-resilience.yml` (cron + dispatch). In the
default `test:integration`, chaos and heap self-skip (without `RUN_CHAOS_INT`/`--expose-gc`).

---

## See Also

- [Architecture Guide](./ARCHITECTURE.md) — System architecture and internals
- [User Guide](../guides/USER_GUIDE.md) — Providers, combos, CLI integration
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — 16-factor scoring, mode packs
