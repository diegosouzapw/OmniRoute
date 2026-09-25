---
title: "Feature Flags"
version: 3.8.51
lastUpdated: 2026-09-03
---

# Feature Flags

> Runtime toggles that change OmniRoute's behavior **without a redeploy**.
> Every flag listed here is defined in
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> — the single source of truth. The dashboard and the REST API both read from
> that file, so the table below is generated to match it 1:1.

---

## What Feature Flags Are

A feature flag is a named toggle (boolean or enum) whose value can be changed at
runtime and persisted in the database, with no process redeploy required. Each
flag is described by a `FeatureFlagDefinition` with a `key`, `label`,
`description`, `category`, `defaultValue`, `type`, and a `requiresRestart` hint.

### Resolution Order

The **effective value** of a flag is resolved by
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) with this
precedence (highest wins):

1. **DB override** — a value stored in the `key_value` table under the
   `feature_flags` namespace (set via the dashboard or the REST API).
2. **Environment variable** — `process.env[<KEY>]`, if set and non-empty.
3. **Definition default** — the `defaultValue` from `featureFlagDefinitions.ts`.

A boolean flag is considered **enabled** when its effective value is `"true"`,
`"1"`, or `"yes"` (see `isFeatureFlagEnabled()`).

> [!NOTE]
> Most flags also have a matching environment variable of the **same name**
> documented in [`ENVIRONMENT.md`](./ENVIRONMENT.md). The flag's DB override
> takes precedence over that environment variable. A flag with
> `requiresRestart: true` is persisted immediately but only re-read at process
> startup — toggling it surfaces a **"Restart Server"** banner in the dashboard.

---

## Flag Catalog

79 flags across 6 categories. **Default** is the definition default — the value
used when neither a DB override nor an environment variable is present.

### Security (10)

| Key                                     | Type    | Default  | Description                                                                                                                                                                                                                                                    |
| --------------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | Require an API key for all incoming requests.                                                                                                                                                                                                                  |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | Enable input sanitization for all requests.                                                                                                                                                                                                                    |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | Prompt injection guard mode. Values: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                         |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | Redact PII from requests (independent of `INPUT_SANITIZER_MODE`).                                                                                                                                                                                              |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | Sanitize PII from provider responses.                                                                                                                                                                                                                          |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | Mode for PII response sanitization. Values: `redact`, `warn`, `block`, `off`.                                                                                                                                                                                  |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | Block outbound requests to private/internal IP ranges.                                                                                                                                                                                                         |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | Allow authenticated dashboard users to reveal stored API keys instead of only seeing masked values.                                                                                                                                                            |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | Include account prefix in AUTH log lines (e.g. "Using <provider> account: abc12345..."). Disabled by default so account identifiers are redacted from shared/multi-tenant process logs. Independent from Debug Mode; flipping Debug Mode does not reveal this. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | When OIDC is enabled, disable password login so users can only authenticate via OIDC Single Sign-On. When disabled (default), both password login and OIDC are available.                                                                                      |

### Network (21)

| Key                                             | Type    | Default | Restart | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------- | ------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓       | Enable TLS fingerprint stealth mode.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |         | Allow the /v1/audio/* routes to use OpenAI-compatible provider nodes hosted outside localhost. Off by default — routing audio to a remote host changes egress identity and must be an explicit operator decision. Loopback nodes are always allowed and unaffected.                                                                                                                                                                                     |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |         | Allow POST /v1/rerank (and the memory engine's loopback rerank step) to use OpenAI-compatible provider nodes hosted outside localhost. Off by default — routing to a remote host changes egress identity and must be an explicit operator decision. Loopback nodes are always allowed; remote nodes must also pass the provider outbound URL policy.                                                                                                    |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |         | When no proxy is assigned to a connection, auto-select the first working proxy from the registry. Off by default (otherwise any registry proxy becomes a global fallback — #3332).                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |         | Allow OAuth and provider validation flows to bypass a pinned proxy and connect directly when proxy reachability pre-checks fail. Off by default because this can change egress IP.                                                                                                                                                                                                                                                                      |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |         | On a network exception (timeout, connection refused/reset) for a multi-account rotation executor, when the failing account has no dedicated proxy, apply a short cooldown and skip other proxy-less accounts for the rest of the request instead of retrying each one. On by default (safe: no egress IP change, only reduces latency/cooldown risk on shared-egress accounts). Disable to restore immediate propagation on the first proxy-less throw. |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |         | Opencode rotation records which account served or was skipped (masked ids only, never full account ids) and links proxy log entries to their request, so the operator can tell skipped accounts apart from unused ones. Off by default.                                                                                                                                                                                                                 |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `true`  |         | Proxy pools and the per-account rotation of opencode stop re-serving a proxy that just failed (refused TCP probe, or a 429 received through it) for a per-process period that doubles on each repeat, up to a cap. No proxy status is written; with every candidate set aside the choice is unchanged. On by default; `false` restores plain selection.                                                                                                 |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |         | Show, under a proxy pool in the dashboard, how many observed egress IPs served its members over the last 24 h and how many connections used them. Read-only, computed from the proxy log, never used for routing. Off by default.                                                                                                                                                                                                                       |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |         | For the OpenCode executor, watch the first body byte of a streamed Responses reply (window: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, default `15000`). A 2xx Responses stream that stays silent past the window is treated as stalled: the account is cooled down and the request rotates to the next account once; a second stall fails fast. Off by default: stalled streams keep today's wait until the stream readiness timeout.                          |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |         | OpenCode executor: on a 403/451 carrying a `user_blocked` refusal (not geo, not a Cloudflare fingerprint rejection), cool the refused account down and rotate to the next account at most once per request; a second refusal is returned as-is, without a success mark. Off by default: routing around an upstream user block can look like evasion and spread the flag across the fleet.                                                               |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |         | OpenCode rotation: after two consecutive transient upstream failures (5xx or an empty 400), pause before the next account — 1.5s doubling per further failure, capped at 6s per pause and 10s per request, skipped on client disconnect; the failed body is released before waiting. Off by default: failover stays immediate.                                                                                                                          |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |         | OpenCode rotation: park the request after repeated transient 429s (or a fresh pool-strain marker) with a heartbeat, then replay one capped leg of up to 3 sequential accounts instead of fanning out the whole fleet. Off by default: every 429 rotates to the next account exactly as before.                                                                                                                                                          |
| `STREAM_READINESS_STALL_RETRY`                  | boolean | `false` |         | Streaming chat: when the first upstream body stalls before producing a usable event, issue one bounded second attempt through the same routing path with the same readiness budget and no account penalty. Off by default: a stalled first body fails the request without a retry.                                                                                                                                                                      |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |         | On translated streaming turns, when the upstream turn carries no usable content (reasoning-only completion or zero valuable chunks), issue bounded retries through the normal credential path (up to `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`) before anything is exposed to the client. Off by default: empty turns keep the current behavior (empty 200 or empty-content 502).                                                                          |
| `OPENCODE_POOL_RESELECT`                        | boolean | `false` |         | OpenCode rotation: after a 429 from an egress-bucketed provider on a proxy-less account under an ambient pool context, ask the connection pool for another member for the next attempt instead of retrying the same egress address. Orders, never excludes: an exhausted pool keeps the current behavior. Off by default: every 429 rotates to the next account exactly as before.                                                                      |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |         | OpenCode rotation: stop the account wave at the first 429 classified as a real rate limit (parseable `Retry-After`, or a body naming a rate/usage limit) and return that upstream 429 unchanged. Unclassified 429s keep rotating. Off by default: the free tier is limited per egress IP (#9611), so every 429 rotates and an exhausted wave returns the last upstream 429.                                                                             |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓       | Disable TLS certificate verification for the MITM proxy. **Danger.**                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |         | Allow provider URLs pointing to private/internal networks.                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |         | Allow adding/validating providers on local/private addresses (127.0.0.1, localhost, LAN). On by default (local-first); disable for strict public-only blocking. Cloud-metadata stays blocked.                                                                                                                                                                                                                                                           |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓       | Enable Claude Code compatible provider mode.                                                                                                                                                                                                                                                                                                                                                                                                            |

### Policies (5)

| Key                             | Type    | Default    | Description                                                                                                                                                                                                                      |
| ------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | Tool-use policy enforcement mode. Values: `disabled`, `warn`, `block`.                                                                                                                                                           |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | Automatically enable rate limiting based on usage patterns.                                                                                                                                                                      |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | Skip OmniRoute's local context-window / max-input-token check for direct single-model requests. Upstream limits still apply.                                                                                                     |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | Reject requests before dispatch when the target model lacks required capabilities (vision, tools, structured output, context window). Protects direct single-provider requests that bypass the combo-layer compatibility filter. |
| `RADAR_ENABLED`                 | boolean | `false`    | Enable the OmniRoute Radar module (catalog feed screens and sync). Off by default; enabling only unlocks the UI — data sync remains a separate opt-in.                                                                           |

### Runtime (33)

| Key                                         | Type    | Default | Restart | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------- | ------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |         | Generate and inject conversation summaries when combo routing switches models. Disable to treat model switches independently and prevent background handoff requests for all existing and future combos.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |         | Drop internal commentary-phase output items from Responses API passthrough streams before forwarding to clients. Disable to receive raw upstream commentary.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `false` |         | Enforce scope restrictions on MCP tool access.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |         | Compress MCP tool descriptions to reduce token usage.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |         | Enable background task processing at runtime.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓       | Disable all background services (quota refresh, sync, etc).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |         | Trust project-level RTK filters without validation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓       | Start the real-time dashboard WebSocket server on import (port 20132 by default).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |         | Allow Codex to use the Responses-over-WebSocket transport. When off, Codex falls back to HTTP Responses.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |         | Allow Codex to use the local app-server WebSocket JSON-RPC transport (codexTransport=app-server). When off, connections opted into app-server fall back to Codex's other transports.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |         | Route budget-exhausted requests to the emergency free fallback provider/model. (See [Emergency Budget Fallback](#emergency-budget-fallback) below.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |         | Enable transparent early retry for truncated upstream SSE streams before any response bytes reach the client.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |         | Allow stream recovery to re-request and stitch a response after bytes have already reached the client.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |         | Make mid-stream continuation tool-call safe: never resume a cut stream once a tool call was emitted (in flight or already finished with finish_reason tool_calls), and close after one empty continuation instead of spending the whole budget. Off: release behavior.                                                                                                                                                                                                                                                                                                                                                                          |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |         | Fail over once to a sibling connection when an SSE stream closes before emitting any useful frame and the bounded same-connection retry is spent; with no usable sibling the original `STREAM_EARLY_EOF` 502 is returned. Off by default: early-EOF stays terminal after the same-connection retry.                                                                                                                                                                                                                                                                                                                                             |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |         | Include display-friendly name fields in `/v1/models` responses. Disable for clients that expect model IDs only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |         | Controls how model IDs are prefixed in /v1/models. 'dual' (default) emits both alias and canonical provider-id prefixes for backward compatibility. 'alias' emits only the short alias prefix (e.g. ds-web/model, not deepseek-web/model). 'canonical' emits only the full provider-id prefix. Values: `dual`, `alias`, `canonical`.                                                                                                                                                                                                                                                                                                            |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |         | Enable periodic Arena AI leaderboard ELO sync for model intelligence rankings.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |         | Advertise `claude/<provider>/<model>` mirror ids on `/v1/models` so Claude Code gateway model discovery lists non-Claude models. Global level of the three-level gate (env wins over the dashboard override). See [Claude Code configuration](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker).                                                                                                                                                                                                                                                                                         |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |         | Master switch for the no-think/<provider>/<model> gateway aliases. On (default): /v1/models advertises a no-thinking variant for every eligible thinking-capable Claude model, and a no-think/ id sent on a request resolves back to the real model with reasoning suppressed. Off: no variants are advertised and a no-think/ id is treated like any other unknown model id. The per-model ModelSpec.noThinkingAlias opt-in/opt-out still applies while this is on.                                                                                                                                                                            |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |         | Disable the generation of thinking level variants (e.g. -low, -medium, -high) in the /v1/models catalog.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓       | Enable per-tenant adaptive virtual admission lanes for provider dispatch (#9654): one tenant's burst no longer 503s another. The OMNIROUTE_CHAT_VIRTUAL_LANES env var wins over this dashboard override; changes take effect at server restart.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |         | Advertise <gateway-alias>/<model> mirror ids on /v1/models for models whose canonical owner has no active credential but a passthrough gateway with an active credential routes them. Warning: adds catalog entries for all clients when enabled globally.                                                                                                                                                                                                                                                                                                                                                                                      |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |         | Enable balance detection for New-API / One-API / Sub2API aggregator compatible nodes. When enabled, compatible nodes with the aggregator flag set will report their balance in the dashboard and quota-preflight routing.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |         | Continue non-streaming server-owned tool calls until the model returns a client-usable response.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |         | Search stats and recent searches only count providers that still have a live connection (keyless providers such as duckduckgo-free always count). Off keeps every retained search row with a provider id.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |         | Dashboard provider pages: show the Free badge only on signals the provider honors — drops the display-name heuristic, non-boolean free fields and :free suffixes on registered providers without a documented free tier. Off keeps the historical badge rule.                                                                                                                                                                                                                                                                                                                                                                                   |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |         | On aggregated 429/503 unavailable responses, omit `Retry-After` when no concrete future retry time is known (instead of a synthetic 1s), add `error.retry_after_provenance` (`signal` \| `none`), and let combo drain paths read prose retry hints from JSON and plain-text upstream bodies. The field only appears on responses built by `unavailableResponse()`; other 429/503 bodies are unchanged.                                                                                                                                                                                                                                          |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |         | When a `priority` combo target marked fallback-only-on-quota-exhaustion stops the combo for a cause that is provably not quota (provider circuit breaker open, predictive latency skip), answer 502 instead of the quota-looking 503. Lockout, cooldown, unavailable, exhaustion and concurrency-cap stops keep 503.                                                                                                                                                                                                                                                                                                                            |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |         | A bare Mistral 401 (`{"detail":"Unauthorized"}`, no explicit auth signal) is identical for a revoked key and for exhausted quota. When on, it cools the connection down instead of parking it as `expired`, at most 3 times per hour per connection; the next one parks it, so a revoked key still converges. Off by default: every bare Mistral 401 parks the connection as before.                                                                                                                                                                                                                                                            |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `true`  |         | Fetch the live xAI model catalog for xai-oauth connections from https://api.x.ai/v1/models using the OAuth bearer token, instead of the frozen static seed. On by default. Set the flag to false to keep serving the static seed. HTTP failures fall back to the seed in the discovery route; the flag getter itself does not issue HTTP.                                                                                                                                                                                                                                                                                                       |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |         | Let the automatic cleanup sweep delete terminal (completed/failed/cancelled/expired) Batch API jobs older than `OMNIROUTE_BATCH_RETENTION_DAYS`, along with their per-line checkpoints, and clear the BLOB content of uploaded files past their own `expires_at`. Off by default: every existing install keeps this data exactly as before until an operator opts in. The operator-triggered `DELETE /api/v1/batches/delete-completed` route is unaffected either way — it is a separate, unconditional public API contract.                                                                                                                    |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |         | Reserve the selected Antigravity account for the streaming lifecycle of the request that picked it, so a concurrent retry or the credential handoff cannot re-pick an account already committed to an in-flight stream. The reservation is scoped to (connection, callable upstream model), so one account can still serve two different models at once. When every eligible account is already leased for that model, the request returns a structured 503 `antigravity_pool_busy` with a bounded `Retry-After` instead of piling onto a busy account. Off by default: account selection stays exactly as before, and no reservation is taken. |

### CLI (5)

| Key                                   | Type    | Default | Restart | Description                                                                                                                                                                                              |
| ------------------------------------- | ------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓       | Enable compatibility mode for all CLI clients.                                                                                                                                                           |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |         | Enable model alias compatibility layer.                                                                                                                                                                  |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |         | Enable automatic pricing data synchronization (also requires the `PRICING_SYNC_ENABLED` environment variable).                                                                                           |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |         | After a provider model sync, automatically (re)write ~/.codex/*.config.toml profile files from the live catalog. Never changes the active/default Codex config. Off by default.                          |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |         | After a provider model sync, automatically (re)write ~/.claude/profiles/<name>/settings.json Claude Code profiles from the live catalog. Never changes the active/default Claude config. Off by default. |

### Health (5)

| Key                                       | Type    | Default | Description                                                                                                                                                                                                                                                          |
| ----------------------------------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | Disable the local instance health check endpoint.                                                                                                                                                                                                                    |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | Disable the token validation health check.                                                                                                                                                                                                                           |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | Enable network access in the skills sandbox environment.                                                                                                                                                                                                             |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | In the proxy health sweep, a probe the target refused (401/403/429) resets the proxy's consecutive-failure streak. Off by default: a refusal stays neutral (#10654). A 5xx stays inconclusive either way; a refusal never removes, disables or re-activates a proxy. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | Run the startup DB integrity/health check after the server starts accepting requests (via `setImmediate`) instead of blocking startup until it completes (#13717). Off by default: startup blocks exactly like before this PR.                                       |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` and its legacy alias
> `INJECTION_GUARD_BLOCK_THRESHOLD` tune the `block` mode of
> `INJECTION_GUARD_MODE`, but they are plain environment variables read by
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts),
> not feature flags: they have no DB override and no dashboard toggle. See
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> The `Restart` column marks flags with `requiresRestart: true` — the value is
> persisted instantly but only takes effect after the process reloads. Enum
> flags reject any value outside their allowed set (validated server-side in
> both `setFeatureFlagOverride()` and the REST `PUT` handler).

---

## Toggling Flags

### Dashboard

Navigate to **Dashboard → Settings → Feature Flags**
(`/dashboard/settings/feature-flags`). The grid
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
supports:

- **Search** by key or description, and **filter** by category (plus a synthetic
  **Requires Restart** view).
- A **toggle** for boolean flags and a **dropdown** for enum flags
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`).
- A **source badge** per flag — `DB`, `ENV`, or `DEF` — showing where the
  effective value came from.
- A **Reset** button (shown only for `DB`-sourced flags) to drop the override,
  and a **Reset All Overrides** button at the bottom.
- A **Restart Server** banner when a `requiresRestart` flag is changed.

### REST API

All operations go through a single route:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts).
Every method requires an authenticated dashboard session (`401` otherwise).

#### `GET /api/settings/feature-flags`

Returns every flag with its effective value, source, and a summary.

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... all 77 flags
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

Set or remove a single override. Body: `{ key: string; value?: string }`.
Omitting `value` removes the override (restoring env / default).

```bash
# Set a DB override
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# Remove the override (no "value")
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

The response echoes the new `effectiveValue`/`source`, the `previousValue`/
`previousSource`, and `requiresRestart`. Unknown keys and out-of-range enum
values are rejected with `400`.

#### `DELETE /api/settings/feature-flags`

Clears **all** DB overrides at once, restoring every flag to its env / default
value. Returns `{ cleared: <count>, message: "..." }`.

> [!NOTE]
> Flags with `requiresRestart: true` only take effect after a process reload.
> The dashboard's restart flow calls `POST /api/restart` and then polls
> `GET /api/health/ping` until the server is back up.

---

## Emergency Budget Fallback

`OMNIROUTE_EMERGENCY_FALLBACK` (category `runtime`, default `true`) controls the
emergency free-fallback path in
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts).
When enabled, requests that exhaust their budget are routed to a free fallback
provider/model instead of failing outright. Set it to `false` (or `0`) — via the
dashboard toggle, a DB override, or the `OMNIROUTE_EMERGENCY_FALLBACK`
environment variable — to disable the behavior and let budget-exhausted requests
fail. (Surfaced as a dashboard toggle in PRs #3741 / #3752.)

---

## See Also

- [Environment Variables Reference](./ENVIRONMENT.md) — most flags have a
  same-named environment variable documented there (the DB override takes
  precedence over it).
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — source of truth for every flag.
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — resolution logic (`resolveFeatureFlag`, `isFeatureFlagEnabled`,
  `resolveAllFeatureFlags`).
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — DB override
  persistence in the `feature_flags` namespace of the `key_value` table.
