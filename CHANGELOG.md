# Changelog

## [Unreleased]

### ✨ Added

- **`@omniroute/opencode-plugin` bundled + `omniroute setup opencode`** ([#3726] — thanks @herjarsa):
  The opencode-plugin now ships pre-built inside the `omniroute` npm package (`package.json`
  `files` includes `@omniroute/`). A new `omniroute setup opencode` CLI command automates
  installation:
  1. Copies the bundled plugin into `~/.config/opencode/plugins/omniroute/`
  2. Creates/updates `opencode.json` with the plugin entry (idempotent,
     replaces legacy `opencode-omniroute-auth` entries automatically)
  3. Optional `--auth` flag runs `opencode auth login --provider <id>`
     The prepublish pipeline (Step 8.8) now builds the plugin's `dist/` via tsup so every
     published tarball includes it. Users no longer need to extract the plugin manually.

### 🐛 Fixed

- **`@omniroute/opencode-plugin`: baseURL resolution for partner/tiered providers**
  ([#3711] / [#3726] — thanks @herjarsa):
  The `provider.models` hook now checks `_provider.options.baseURL` (set by the config
  hook or opencode.json) as a third fallback after plugin opts and auth.json. Previously,
  providers whose baseURL came from options returned zero models. A diagnostic `console.warn`
  fires when no baseURL is resolvable from any source.

---

## [3.8.22] — TBD
## [3.8.23] — TBD

### 🐛 Bug Fixes

- **Emergency budget fallback no longer leaks the failing provider's API key to the emergency provider** (combo/resilience audit): the executor-level emergency hop in `chatCore` re-sent the FAILING provider's credentials to the emergency provider's endpoint (e.g. the OpenAI key in the `Authorization` header of a request to `integrate.api.nvidia.com`) on every quota/billing error of a non-stream request — a cross-provider credential leak that also never succeeded upstream (the foreign key is always rejected). The hop is now orchestrated exclusively by the routing layer (`src/sse/handlers/chat.ts`), which resolves credentials FOR the emergency provider via account selection, and it no longer fires inside combo targets (the combo is the operator's fallback policy; the global fallback #689 still runs after it). Restores the five `#1731` fast-skip integration tests that had been `test.skip`-ed since v3.8.2, plus a new credential-leak guard test.
- **`/v1/messages/count_tokens` now honors the connection's proxy assignment**: the provider-side token count was issued with no proxy context at all — every count call went DIRECT to the provider regardless of configured account/provider/global proxies, leaking the host IP for proxy-isolated setups. The route now resolves the connection proxy (`safeResolveProxy`) and wraps the executor call in `runWithProxyContext`, exactly like chat execution. Validated by a new integration test that also pins per-target proxy independence inside combos.
- **Proxy resolution failures are no longer silent**: `safeResolveProxy` downgraded any resolution error (DB error, corrupt registry row) to a `debug` log and fell back to a DIRECT connection — invisible proxy bypass for traffic-isolation setups. Now logged at `warn` with the connection id.

### ✅ Tests

- **Combo strategy fallback coverage** (`tests/unit/combo-strategy-fallbacks.test.ts`, 11 tests): fill-first / p2c / random / cost-optimized / strict-random fallback paths (previously happy-path only), price-tie stability, stale strict-random deck degradation, unknown-strategy normalization to priority, and circuit-breaker HALF_OPEN recovery inside the combo loop + `preScreenTargets` (lazy-recovery contract).
- **`#1731` fast-skip suite restored** (`tests/integration/combo-provider-exhaustion.test.ts`): the five skipped tests were rewritten against the current routing policy (quota-exhausted 429 marks the provider for the request; transient 429 retries other connections; connection errors skip per-connection; nothing persists across requests) and re-enabled — 8/8 green.
- **Proxy context passthrough** (`tests/integration/proxy-context-passthrough.test.ts`): combo targets each execute under their own connection's proxy; `count_tokens` runs inside the connection's proxy context.
### 🐛 Fixed

- chore(quality-gate): reconcile check-file-size baseline — freeze 27 inherited/this-round grown files at current LOC + register providerLimits.ts (greens the file-size gate; shrink tracked via #3501)
- fix(gemini): standard Gemini provider no longer sends tool calls without a thought_signature (falls back to context mode when the signature is unavailable), fixing HTTP 400 on multi-turn thinking-model tool calls (#3688)
- fix(antigravity): preserve gemini-3.1-pro High/Low budget tiers (upstream accepts the suffixed ids; stop collapsing to bare gemini-3.1-pro) (#3696)
- fix: streaming combos now fail over to the next target when an upstream returns an empty/content-filtered response instead of surfacing a blank reply (#3685)
- fix(qwen-web): migrate the Qwen Web provider to the v2 chat API. The legacy `/api/chat/completions` endpoint was retired upstream and returned `504` HTML from Alibaba's gateway for every request regardless of credentials, so no token refresh could help (#3288, discussion #2768). The executor now uses the two-step v2 flow (`/api/v2/chats/new` → `/api/v2/chat/completions?chat_id=`), replays the full browser cookie jar (cna + ssxmod_itna/itna2 + token) required by Alibaba's WAF instead of only a Bearer token, parses the phase-based SSE (think→reasoning, answer→content), and maps the WAF/expired HTML page to a clear actionable auth error instead of surfacing raw HTML. The credential requirement is now a full Cookie header, browser-login capture grabs the WAF cookies, and the model catalog is refreshed to the current upstream ids (`qwen3.7-max`, `qwen3.7-plus`, `qwen3.6-plus`; legacy ids kept as aliases). 17 unit tests.
- fix(cache): semantic cache responses are now scoped to the requesting API key — two callers with different API keys that send the same prompt and model will no longer receive each other's cached responses (#3740). `generateSignature` includes the `api_key_id` dimension in the SHA-256 hash; unauthenticated requests (no API key) remain isolated from keyed requests. Existing cache entries (generated without the key dimension) are cleared by migration `098`.

---

## [3.8.22] — 2026-06-11

### ✨ Added

- **MiMoCode free-tier provider** ([#3659] — thanks @pizzav-xyz): new no-auth provider `mimocode` (alias `mcode`) exposing Xiaomi's `mimo-auto` model (1M context) via device-fingerprint bootstrap-JWT auth (`/api/free-ai/bootstrap` → Bearer JWT → `/api/free-ai/openai/chat`). Supports multiple accounts (N fingerprints → round-robin with exponential cooldown), re-bootstrap on 401/403, and cooldown on 429. Reuses a new generic `NoAuthAccountCard` dashboard component (also wired for `opencode`). 22 unit tests; upstream validated live during review. (Maintainer follow-up: added the required `authHeader: "none"` field to the registry entry.) Co-authored with @pizzav-xyz.
- **Prefer Claude Code for unprefixed `claude-*` model IDs** ([#3540] — thanks @Witroch4): opt-in setting (default off) that routes bare `claude-*` model IDs from Claude Code clients through the Claude Code OAuth account instead of requiring a provider prefix. Configurable via the `OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS` env flag or a dashboard toggle on the Claude provider page; explicit provider prefixes still win. Full layer coverage (resolver + DB setting + zod schemas + types + UI) with 6 tests. Co-authored with @Witroch4.
- **Codex Responses-WebSocket call history** ([#3616] — thanks @kkkayye): Codex `/v1/responses` WebSocket calls are now persisted to request history — success completions plus prepare-failures, upstream WS errors and premature closes — with `sanitizeErrorMessage` applied to the stored error. Two proxy-side integration tests cover the success and failure paths.
- **Obsidian/WebDAV**: add the `/api/v1/webdav` file server (PROPFIND/GET/PUT/DELETE/MKCOL/MOVE, Basic-Auth, path-traversal hardened) so Obsidian mobile can sync the vault (#3485, part 2). Implemented in the custom server layer (`scripts/dev/webdav-handler.mjs`) — intercepted before Next.js to support non-standard HTTP methods (`PROPFIND`, `MKCOL`, `MOVE`, `LOCK`). Reads vault path and credentials (with enc:v1: AES-256-GCM decryption) directly from the SQLite `key_value` table; credentials configured via PR1's `/api/settings/obsidian/webdav` endpoint. 36 TDD unit tests covering traversal guard, constant-time auth, decrypt round-trip, XML generation, and full CRUD cycle.
- **Quota overview**: deactivate/activate an account directly from the quota card header (toggle button) so users can park a near-zero-quota account without navigating to the provider detail page. ([#3675](https://github.com/diegosouzapw/OmniRoute/pull/3675) — thanks @leninejunior)

### ♻️ Code Quality

- **providers/[id]**: extract `useProviderConnections`, `useProviderSettings`, `useProviderModels` hooks from the god-component — #3501 Phase 1f. `ProviderDetailPageClient.tsx`: 4,948 → 4,063 LOC (−885 lines). New hooks in `hooks/`: `useProviderConnections.ts` (954 LOC — all connection management, batch ops, proxy/CLIProxyAPI state, batch-test runner with MAX_BULK_IDS chunking), `useProviderSettings.ts` (264 LOC — Codex global service mode + Claude routing preference), `useProviderModels.ts` (155 LOC — model metadata, aliases). Frozen baselines updated. 10 Phase-1f smoke tests; typecheck/cycles/lint green. Co-authored with @oyi77.
- **providers/[id]**: extract `useModelCompatState` hook + model sections (`ModelRow`, `PassthroughModelRow`, `PassthroughModelsSection`, `CustomModelsSection`, `CompatibleModelsSection`) from the god-component — #3501 Phase 1e. `ProviderDetailPageClient.tsx`: 6,838 → 4,922 LOC (−1,916 lines). New leaf `hooks/useModelCompatState.ts` (101 LOC); compat helpers moved to `providerPageHelpers.ts`. Frozen baselines: `providerPageHelpers.ts: 822`. 12 Phase-1e smoke tests; typecheck/cycles/lint green; #3610 auto-hide fix preserved.
- **providers/[id]**: extract `ConnectionRow` (+ `CooldownTimer`/`inferErrorType`/`getStatusPresentation`), `ModelCompatPopover` (+ `recordToHeaderRows`), and `SiliconFlowEndpointModal` from the god-component into `components/` — #3501 Phase 1d. `ProviderDetailPageClient.tsx`: 8,092 → 6,838 LOC (−1,254 lines). Frozen baselines: `ConnectionRow.tsx: 941`. 7 new Phase-1d smoke tests; typecheck/cycles/lint green.
- **providers/[id]: extract AddApiKeyModal + EditConnectionModal (+ WebSessionCredentialGuide) from the god-component into components/** ([#3501] Phase 1c): extracted the two heaviest inline modals — `AddApiKeyModal` (~787-LOC body) and `EditConnectionModal` (~1091-LOC body) — plus shared `WebSessionCredentialGuide` (~103 LOC) into standalone files under `providers/[id]/components/modals/` and `providers/[id]/components/` respectively. Added `ERROR_TYPE_LABELS` and `formatTimeAgo` to `providerPageHelpers.ts` (leaf) so `EditConnectionModal` and `ConnectionRow` share them without cycles. Pruned 14 now-unused imports from the god-component. `ProviderDetailPageClient.tsx`: 9,981 → 8,092 LOC (−1,889 lines). Frozen baselines: `AddApiKeyModal.tsx: 842`, `EditConnectionModal.tsx: 1170`. 6 new Phase-1c smoke tests; all 21 vitest modal tests pass; typecheck/cycles/lint green.
- **refactor: small db/utils cleanup** ([#3523] — thanks @androw): table-driven `compression_analytics` column migration (replaces 17 repeated `ALTER TABLE` calls), a single merged `serializeJsonField` helper in `db/providers.ts` (folded two byte-identical serializers), and removal of the dead no-op `syncProviderDataToCloud`/`getProvidersNeedingRefresh` stubs from `shared/utils/machine.ts` (no remaining callers). Pure refactor; behavior unchanged.
- **Provider-detail god-component decomposition — Phase 2b (remaining shared helpers→leaf)** ([#3501]): extended `providers/[id]/providerPageHelpers.ts` with all remaining pure helpers needed by the heavy modals (`AddApiKeyModal`/`EditConnectionModal`) before they can be extracted. Moved 22 symbols: web-session credential label/hint/check/title helpers; upstream-headers helpers (`upstreamHeadersRecordsEqual`, `headerRowsToRecord`, `effectiveUpstreamHeadersForProtocol`, `anyUpstreamHeadersBadge`, `getProtoSlice`) plus their `HeaderDraftRow`/`CompatModelRow`/`CompatModelMap`/`CompatByProtocolMap` types; Codex consts and helpers (`CODEX_REASONING_STRENGTH_OPTIONS`, `CODEX_ACCOUNT_SERVICE_TIER_VALUES`, `CODEX_GLOBAL_SERVICE_MODE_VALUES`, `getCodexServiceTierLabel`, `normalizeCodexLimitPolicy`, `getCodexRequestDefaults`, `getClaudeCodeCompatibleRequestDefaults`); misc helpers (`compatProtocolLabelKey`, `extractCommandCodeCredentialInput`, `normalizeAndValidateHttpBaseUrl`, `SILICONFLOW_ENDPOINTS`, `CommandCodeAuthFlowState`). New transitive imports wired into the leaf: `MODEL_COMPAT_PROTOCOL_KEYS` (`@/shared/constants/modelCompat`), `CodexServiceTier`/`getCodexRequestDefaults`/`getClaudeCodeCompatibleRequestDefaults` (`@/lib/providers/requestDefaults`), `CodexGlobalServiceMode` (`@/lib/providers/codexFastTier`), `WebSessionCredentialRequirement` (`./webSessionCredentials`). `ProviderDetailPageClient.tsx`: 10,288 → 9,980 LOC. Leaf module: 589 LOC (acyclic). 25-assertion unit test suite passes; smoke test 3/3; no import cycles. Co-authored with @oyi77.
- **Provider-detail god-component decomposition — Phase 2 (helpers→lib)** ([#3501]): extracted the pure shared helpers — `ProviderMessageTranslator`/`LocalProviderMetadata` types, `providerText`/`providerCountText`/`readBooleanToggle`, and the provider base-URL + routing-tag/excluded-model parse/format block — into a new leaf `providers/[id]/providerPageHelpers.ts` (imports only `@/shared`, so the client and modals share them with no import cycle). `ProviderDetailPageClient.tsx`: 10,435 → 10,288 LOC. Unblocks extracting the heavier `AddApiKeyModal`/`EditConnectionModal` (which depend on these helpers) without cycling. The Phase 0 smoke test caught a missing transitive import (`isSelfHostedChatProvider`) at mount — now wired + locked by a new helpers unit test (12 assertions). Co-authored with @oyi77.

- **#3500 fully resolved** — Hard Rule #5 (no raw SQL in route handlers): all 13 internal offenders migrated to `src/lib/db/` modules across slices (call_logs, usage_history/daily_usage_summary, community_servers, usage_logs, semantic_cache, proxy_logs, skills UPDATE, db-backups). The gate's `KNOWN_RAW_SQL` set is renamed to `EXTERNAL_DB_ALLOWED` (with a back-compat alias) and now holds only the **2 external-DB reads** (`oauth/cursor/auto-import`, `oauth/kiro/auto-import`) — these open *another app's* SQLite to import credentials, so by design they cannot live in OmniRoute's `db/` domain. The gate still blocks any NEW raw SQL against OmniRoute's DB.
- **#3500 fully resolved** — Hard Rule #5 (no raw SQL in route handlers): all 13 internal offenders migrated to `src/lib/db/` modules across slices (call*logs, usage_history/daily_usage_summary, community_servers, usage_logs, semantic_cache, proxy_logs, skills UPDATE, db-backups). The gate's `KNOWN_RAW_SQL` set is renamed to `EXTERNAL_DB_ALLOWED` (with a back-compat alias) and now holds only the **2 external-DB reads** (`oauth/cursor/auto-import`, `oauth/kiro/auto-import`) — these open \_another app's* SQLite to import credentials, so by design they cannot live in OmniRoute's `db/` domain. The gate still blocks any NEW raw SQL against OmniRoute's DB.
- **chore(db-gate):** reclassify `KNOWN_UNEXPORTED` → `INTENTIONALLY_INTERNAL` in `scripts/check/check-db-rules.mjs` ([#3499]): a full audit of all 25 db modules confirmed each is consumed via direct/dynamic import per Hard Rule #2 ("Never barrel-import from localDb.ts"). The old framing labelled them as "debt", which was misleading — they are the correct pattern. The gate's blocking behaviour is unchanged (a NEW unexported module still fails); only the name, comments, and per-module justifications were updated to reflect audited truth. Four modules flagged `DEAD?` (`compressionScheduler`, `discovery`, `pluginMetrics`, `prompts`) have zero production importers and are documented as schema-reserved. A new regression-guard test (`tests/unit/check-db-rules-classification.test.ts`) asserts every non-dead module in the set has ≥1 real importer, so a future consumer removal surfaces as a test failure requiring explicit reclassification.
- **refactor(db): move `call_logs` aggregations into `callLogStats` db module** ([#3500]): extracted raw SQL from three route handlers (`/api/provider-metrics`, `/api/search/stats`, `/api/v1/search/analytics`) into a new `src/lib/db/callLogStats.ts` domain module (`getProviderMetrics`, `getSearchProviderStats`, `getRecentSearchLogs`, `getSearchAggregateStats`, `getSearchProviderCounts`). First slice of #3500 (call_logs cluster). Behavior unchanged; the three routes are removed from `KNOWN_RAW_SQL` in the gate. Validated with TDD unit tests (6 assertions seeding an in-memory SQLite fixture).
- **refactor(db): move `usage_history`/`daily_usage_summary` SQL into `usageAnalytics` db module** ([#3500]): extracted all inline `db.prepare(...)` calls from two route handlers (`/api/usage/analytics`, `/api/settings/export-json`) into a new `src/lib/db/usageAnalytics.ts` module and extended `src/lib/db/callLogStats.ts` with `getFallbackStats`. New exports: `buildUnifiedSource`, `buildPresetUnifiedSource` (UNION CTE builders), plus 12 typed query functions covering summary, daily, daily-cost, heatmap, model, provider, account, api-key, service-tier, weekly-pattern, and preset-cost aggregations, plus `getAllUsageHistory`/`getAllDomainCostHistory`/`getAllDomainBudgets` for backup export. Second slice of #3500. `KNOWN_RAW_SQL` drops from 12 → 10. Validated with 21 TDD unit tests (`tests/unit/db-usage-analytics-3500.test.ts`) seeding a temp SQLite fixture.

- **refactor(db): move `community_servers` auth look-up into `gamification` db module** ([#3500]): extracted raw SQL from two federation route handlers (`/api/gamification/federation/leaderboard`, `/api/gamification/federation/score`) into a new `getConnectedServerByKeyHash(apiKeyHash)` function in `src/lib/db/gamification.ts`. Third slice of #3500 (gamification federation cluster). Behavior unchanged; the two routes are removed from `KNOWN_RAW_SQL` in the gate. Validated with TDD unit tests (3 assertions seeding a temp SQLite fixture).

- **refactor(db): move `skills UPDATE` + `db-backups` SQL into db modules** ([#3500]): fifth slice of #3500. Extracted the dynamic `UPDATE skills SET …` from `src/app/api/skills/[id]/route.ts` into a new `src/lib/db/skills.ts` module (`updateSkill(id, patch)`). The dynamic SET clause is injection-safe: column names are validated against a hard-coded allowlist of known writable columns before being interpolated; unknown keys are silently ignored. Extended `src/lib/db/backup.ts` with three new functions: `exportAllSummaryRows()` (multi-table SELECT for key_value / combos / provider_connections / api_keys, used by exportAll), `getTableNamesFromAdapter()` (sqlite_master introspection via an adapter arg, used by import validation), and `countImportedRows()` (post-import COUNT(*) per table). The backup domain module is the correct home for sqlite_master introspection — it is not "raw SQL in a route" once moved there. `KNOWN_RAW_SQL` drops by 3 (from 8 → 5). Validated with 11 TDD unit tests (`tests/unit/db-backups-skills-3500.test.ts`).
- **refactor(db): move `skills UPDATE` + `db-backups` SQL into db modules** ([#3500]): fifth slice of #3500. Extracted the dynamic `UPDATE skills SET …` from `src/app/api/skills/[id]/route.ts` into a new `src/lib/db/skills.ts` module (`updateSkill(id, patch)`). The dynamic SET clause is injection-safe: column names are validated against a hard-coded allowlist of known writable columns before being interpolated; unknown keys are silently ignored. Extended `src/lib/db/backup.ts` with three new functions: `exportAllSummaryRows()` (multi-table SELECT for key_value / combos / provider_connections / api_keys, used by exportAll), `getTableNamesFromAdapter()` (sqlite_master introspection via an adapter arg, used by import validation), and `countImportedRows()` (post-import COUNT(\*) per table). The backup domain module is the correct home for sqlite_master introspection — it is not "raw SQL in a route" once moved there. `KNOWN_RAW_SQL` drops by 3 (from 8 → 5). Validated with 11 TDD unit tests (`tests/unit/db-backups-skills-3500.test.ts`).
- **refactor(db): move `usage_logs`/`semantic_cache`/`proxy_logs` SQL into db modules** ([#3500]): extracted raw `db.prepare(...)` SQL from three route handlers (`/api/analytics/auto-routing` → `usageLogs.ts`; `/api/cache/entries` → `semanticCache.ts`; `/api/logs/export` → `proxyLogs.ts`) into new `src/lib/db/` domain modules. New exports: `getAutoRoutingTotalCount`, `getAutoRoutingVariantBreakdown`, `getAutoRoutingTopProviders` (usage_logs), `listSemanticCacheEntries`, `deleteSemanticCacheBySignature`, `deleteSemanticCacheByModel` (semantic_cache), and `exportProxyLogsSince` (proxy_logs). Fourth slice of #3500. `KNOWN_RAW_SQL` drops from 8 → 5. Validated with 13 TDD unit tests (`tests/unit/db-logs-cache-3500.test.ts`) seeding temp SQLite fixtures.

- **Provider-detail god-component decomposition — Phase 0** ([#3501]): introduced `ProviderDetailPageClient.tsx` and reduced `providers/[id]/page.tsx` to a thin 9-line route wrapper (was 12,882 LOC), following the repo's `*PageClient` convention. Added the first-ever smoke render test for the page (Hard Rule #8) as the safety net every later extraction phase is diffed against. Behavior unchanged; the `check-file-size` ratchet now tracks the extracted client. Foundation for Phases 1–6 (strangler-fig). Thanks @oyi77 for the parallel modularization effort in #3627.
- **Provider-detail god-component decomposition — Phase 1a** ([#3501]): extracted the three self-contained auth-import modal clusters (Codex/Claude/Gemini `Import*AuthModal` + `Apply*AuthModal` + their co-located helpers, ~2,160 LOC) into `providers/[id]/components/modals/`. `ProviderDetailPageClient.tsx` drops 12,882 → 10,719 LOC. Behavior unchanged (smoke test green; clusters had clean `{ onClose, onSuccess }` / inline-prop interfaces). Co-authored with @oyi77.
- **Provider-detail god-component decomposition — Phase 1b** ([#3501]): extracted `EditCompatibleNodeModal` (+ its node/props types) into `providers/[id]/components/modals/`, and moved the shared `CC_COMPATIBLE_DEFAULT_CHAT_PATH` constant into a leaf `providerDetailConstants.ts` so the page client and the modal can both import it without a circular dependency. Also removed two dangling section comments left by Phase 1a. `ProviderDetailPageClient.tsx`: 10,719 → 10,435 LOC. Behavior unchanged (smoke test + a new standalone modal render test green; `check:cycles` clean). Co-authored with @oyi77.

### 🔧 Bug Fixes

- **Combos / Auto-Combo: premature context compaction ("agent keeps forgetting things")** ([#3680]): two related context-window bugs fixed. (1) `GET /api/combos/auto` now advertises `context_length` / `max_output_tokens` (MAX across the candidate pool — safe because the auto-combo context pre-filter routes oversized requests to large-window candidates), and the opencode plugin consumes them instead of hardcoding `limit: { context: 0 }` — a zero context silently disables opencode's smart auto-compaction, letting sessions grow until the gateway's destructive history purge kicks in. (2) chatCore's proactive compression for DB combos (incl. quota-shared pools) no longer compresses at `min(...allTargets)`: it now uses the EXECUTING target's own window (`resolveComboContextLimit`), keeping min-of-targets only as a defensive fallback when the current provider/model resolves no specific limit. TDD: 8 server tests (`tests/unit/auto-combo-context-advertising.test.ts`) + 3 plugin tests (`tests/auto-combo-context.test.ts`).
- **Obsidian/WebDAV**: add the `/api/settings/obsidian/webdav` config route (enable/disable vault sync), encrypt WebDAV credentials at rest, and remove the duplicate UI block (#3485, part 1).

- **OpenCode Free / passthrough**: "Test all models" now respects "Auto-hide failed models" and switches the list to the visible filter so hidden models actually disappear (#3610). Three related bugs fixed: `autoHideFailed` is now threaded from the outer component into `PassthroughModelsSection` via a prop (single shared checkbox); the `/api/models/test-all` request body now includes `autoHideFailed: true` so the server persists the hide; and after the loop, `visibilityFilter` is switched to `"visible"` when ≥1 model was hidden. Two pure-function helpers (`buildPassthroughTestBody`, `shouldSwitchToVisibleFilter`) extracted to `providerPageHelpers.ts` with 7 unit tests.
- **Resilience**: clear stale transient connection cooldowns on startup so a prior unclean crash no longer makes every request time out at 120s after restart (#3625)

- **fix(home topology): restore live in-flight request pulse** ([#3507]): the animated "pulse" edges in the home Provider Topology panel went dead after PR #3401 unified request visibility, because `activeRequests` was hardcoded to `[]`. Re-wired to `useLiveRequests()` (the existing WebSocket hook on port 20129) so that every pending/running request drives the animation in real time. A pure `selectActiveRequests` mapping helper was extracted to `home/topologyUtils.ts` with 5 unit tests.
- **Electron desktop**: launch the peer-stamping `server-ws.mjs` entrypoint so local-only routes (AgentBridge, MCP, services) no longer return 403 LOCAL_ONLY (#3386)
- **Provider Topology**: stop flagging healthy providers as errored based on stale historical failures; use current request status (#3619)
- **OpenCode Free**: fetch the live model catalog from the provider's `modelsUrl` for the no-auth model picker instead of serving a stale hardcoded list (#3611)
- **Hermes Agent**: honour the `HERMES_HOME` env var when writing/reading the agent config instead of always using `~/.hermes` (#3628). Introduced `getHermesHome()` / `getHermesConfigPath()` helpers (read at call-time) and routed all four hardcoded callsites through them so OmniRoute's config lands in the same directory that the Hermes PowerShell installer configures on Windows.
- **MITM/cert**: remove the duplicated "Command failed:" prefix in system-command error messages ([#3641](https://github.com/diegosouzapw/OmniRoute/issues/3641)): `execFileText` was prepending its own `"Command failed: "` prefix on top of Node's `execFile` error message, which already begins with `"Command failed: <cmd>"` for non-zero exits. The error message now surfaces Node's message directly (no double prefix), with stderr appended only when non-empty.

- **fix(reasoning): replay `reasoning_content` on plain DeepSeek turns** ([#3632] — thanks @adivekar-utexas): the reasoning-replay gate previously only fired when an assistant message already carried `reasoning_content`. Plain (non-tool-call) turns whose `reasoning_content` was stripped by the client (e.g. Cursor) were forwarded without it, so DeepSeek V4+ rejected the request with 400 "the reasoning_content in the thinking mode must be passed back". The gate now also covers missing/empty `reasoning_content` on DeepSeek replay targets, injecting the cached reasoning (or the non-Anthropic placeholder) so multi-turn text conversations no longer 400. Fixes #1682. 2 regression tests.
- **fix(kiro): route enterprise IAM Identity Center accounts to their regional endpoint** ([#3631] — thanks @artickc): Kiro/CodeWhisperer access tokens and Q Developer profile ARNs are region-bound, so enterprise IAM Identity Center accounts outside `us-east-1` (e.g. `eu-central-1`) were rejected by the default host. Adds `resolveKiroRegion` (stored region → profileArn region → `us-east-1`) and `kiroRuntimeHost` (regional `q.{region}.amazonaws.com`, legacy `codewhisperer.us-east-1` for the default), routes chat + usage to the regional endpoint, and discovers the region-matched `profileArn` via `ListAvailableProfiles` in a best-effort `postExchange` hook. 9 tests.
- **fix(combo): skip same-provider/connection targets on connection-level errors** ([#3637] — thanks @herjarsa): on connection-level upstream errors (408/500/502/503/504/524), remaining same-`provider:connection` targets in a combo request are now skipped to avoid hammering a known-bad connection, in both the priority and round-robin paths. Adjusted in review to **exclude OmniRoute circuit-breaker-open responses** (503 + `X-OmniRoute-Provider-Breaker` / `provider_circuit_open`) from this skip, preserving the invariant that a breaker-open is an ordinary target failure (the next same-provider target is still tried). Co-authored with @herjarsa.
- **/v1/responses**: detect stream readiness for tool-call-only and `object`-less chunks so Codex-shaped (reasoning + tools) requests no longer fail with "Stream ended before producing useful content" (#3612)
- **RTL locales (ar/fa/he/ur)**: use logical CSS direction utilities for the sidebar and key overlays so the layout mirrors correctly under `dir=rtl` (#3541, partial — core layout)
- **Kiro/AWS auto-import**: set a descriptive account name and dedupe by `profileArn` so imports no longer create nameless duplicate "OAuth Account" rows (#3615)
- **fix(guardrails):** the `/api/guardrails/test` route now validates its body through `validateBody()` (Zod) instead of parsing raw JSON directly, aligning it with the repo-wide input-validation pattern (Hard Rule #7). ([#3621](https://github.com/diegosouzapw/OmniRoute/pull/3621) — thanks @diegosouzapw)
- **fix(dashboard): bulk provider connection actions** — close audit, API, and UX gaps in the batch activate/deactivate flow: register the `provider.credentials.batch_updated` event in `HIGH_LEVEL_ACTIONS` and `ACTIVITY_ICONS` (was silently dropped from the Activity feed); fix `/api/providers` PATCH to return `warn` status when `notFound` is non-empty instead of always `success`; `/api/providers/test-batch` empty-result early-return now includes a `summary` so stale-ID mode reports to the user; bulk activate/deactivate chunks selection by 100 to avoid the Zod 400 cap on large provider accounts. ([#3673](https://github.com/diegosouzapw/OmniRoute/pull/3673) — thanks @leninejunior)

### 📝 Maintenance

- **fix(ci):** increase the `execFileSync` `maxBuffer` in `validate-pack-artifact` so the npm-pack inventory no longer overflows on large tarballs during release validation — follow-up to the v3.8.21 pack-artifact hotfix. ([#3622](https://github.com/diegosouzapw/OmniRoute/pull/3622) — thanks @diegosouzapw)

---

## [3.8.21] — 2026-06-11

### ✨ Added

- **feat(cli):** `omniroute autostart` now accepts the shorthand the headless / `omniroute serve` path was missing — `omniroute autostart on` / `... true` (aliases of `enable`), `... off` / `... false` (aliases of `disable`), a new `... toggle`, and a default `... status` (bare `omniroute autostart` is a safe read-only). Previously autostart could only be toggled from the tray (`serve --tray`) or the Electron Appearance tab, so a plain `omniroute serve` user had no way to enable it. (The cross-platform launchd/systemd/registry logic is unchanged — this only wires the ergonomic CLI surface.) ([#3331](https://github.com/diegosouzapw/OmniRoute/issues/3331) — thanks @uniQta)

### ♻️ Code Quality

- **refactor(chatCore):** extract the chatCore request phases — idempotency check, semantic cache check, common request sanitization, and memory/skills injection — into dedicated `open-sse/handlers/chatCore/` modules (`idempotency.ts`, `semanticCache.ts`, `sanitization.ts`, `memorySkillsInjection.ts`), slimming the monolithic handler with no behavior change. (Maintainer follow-up: re-derive `idempotencyKey` at the Phase 9.2 save site after the check moved into the module, fixing a `ReferenceError` on successful non-cached responses.) ([#3598](https://github.com/diegosouzapw/OmniRoute/pull/3598) — thanks @oyi77)
- **docs(opencode-provider):** soft-deprecate `@omniroute/opencode-provider` in favour of `@omniroute/opencode-plugin`. The provider package writes a **static** model list to `opencode.json` that drifts behind the live OmniRoute catalog, whereas the plugin fetches `/v1/models` at OpenCode startup. The package keeps working (no code/behavior change), but its npm description and README now carry a deprecation banner with the one-line migration, and a guard test pins the notice. ([#3419](https://github.com/diegosouzapw/OmniRoute/issues/3419) — thanks @herjarsa)
- **chore(review):** pre-release hardening from a multi-reviewer `/review-reviews` battery over the v3.8.21 diff (7 Opus reviewers; zero blocker/high). Resolved findings: npm tarball no longer ships co-located test files (`files[]` negations + reconciled `.npmignore`; the #3578 closure gate now asserts the real `npm pack` output in both directions); `getSanitizedCachedProviderLimitsMap` scopes its connection scan to antigravity/agy instead of decrypting every active connection on each dashboard poll; the Antigravity quota-tier remap (`toClientAntigravityQuotaModelId`) is centralized in `antigravityModelAliases.ts` (was an inline if-ladder in `usage.ts`); the chatCore idempotency check returns its resolved key so the save site reuses a single derivation; and new tests pin the chatCore extracted modules, the Antigravity `usage_history` fallback contract, the reasoning-wrapper prefix-preservation heuristic, the Antigravity SSE `markdown` branch, and the upstream-ca/test no-persist guarantee. (Live-verified that agy consumer tokens are accepted by the non-daily `cloudcode-pa` host used by `retrieveUserQuota`, so #3604 is not agy-host-limited.)

### 🔧 Bug Fixes

- **fix(routing):** reasoning models (deepseek-v4-flash, nemotron, etc.) no longer return empty content in combo routing when they spend all of `max_tokens` on reasoning — `validateResponseQuality` now rejects an empty-content-but-`reasoning_content` response when reasoning consumed ≥90% of completion tokens (so the combo loop retries/falls back), and reasoning models receive a `max_tokens` buffer (+50%, +1000 floor) so reasoning and content both fit. (Maintainer follow-up: the round-robin buffer is applied to a per-attempt copy so it does not compound across models/retries — `4096 → 6144 → 9216 → …`.) ([#3588](https://github.com/diegosouzapw/OmniRoute/pull/3588) — thanks @herjarsa)
- **fix(routing):** a valid `max_tokens`-truncated upstream response is no longer misclassified as empty content and rewritten into a fake 502 — `isEmptyContentResponse()` flagged any Claude `content:[]` / OpenAI empty-choice payload regardless of `stop_reason`/`finish_reason`, so a Claude Code `max_tokens: 1` connectivity ping (HTTP 200, `stop_reason:"max_tokens"`, empty content) became a synthetic `502 "Provider returned empty content"` and triggered a needless family fallback. The guard now treats a terminal truncation/tool signal (Claude `stop_reason` `max_tokens`/`tool_use`, OpenAI `finish_reason` `length`/`tool_calls`) as a legitimate completion; genuinely empty responses (no terminal reason, or `stop`/`end_turn` with empty content) are still caught. ([#3572](https://github.com/diegosouzapw/OmniRoute/issues/3572))
- **fix(api):** `/v1/completions` now returns the legacy OpenAI Completions shape (`object:"text_completion"`, `choices[].text`) instead of chat payloads (`choices[].message|delta.content`) — the endpoint routes internally through the chat pipeline, so legacy Completion clients like TabbyML's `openai/completion` backend crashed with `missing field "text"`. The response (both non-streaming JSON and the SSE stream) is now translated back to the text-completion shape; `[DONE]` and error bodies pass through unchanged. ([#3571](https://github.com/diegosouzapw/OmniRoute/issues/3571))
- **fix(usage):** the z.ai/GLM coding-plan quota card no longer shows "Monthly 0%" — coding plans have no monthly cap (only 5-hour windows), so the quota API reports the `TIME_LIMIT` ("Monthly") entry with `total=0`, and the `total>0 ? … : 0` fallback rendered a misleading 0% remaining (which can skew downstream model-choice). With no absolute cap the remaining percentage now falls back to the percentage-derived value (full/100% when 0% used). ([#3580](https://github.com/diegosouzapw/OmniRoute/issues/3580))
- **docs(discovery):** mark `DISCOVERY_TOOL_DESIGN.md`'s API Endpoints table with an explicit "⚠️ Not yet implemented — Phase 2" banner — the discovery routes are a design proposal (Phase-1 stub only), and the banner makes clear the `KNOWN_STALE_DOC_REFS` gate suppression is intentional, not stale drift. ([#3498](https://github.com/diegosouzapw/OmniRoute/issues/3498))
- **fix(agent-bridge):** add the missing `POST /api/tools/agent-bridge/upstream-ca/test` route — the UpstreamCaField "Test" button POSTed to it but it didn't exist (404). The new validate-only route checks the CA file exists and is a parseable PEM certificate (returns the subject/expiry) **without** persisting the path or activating it; it inherits the `/api/tools/agent-bridge/` LOCAL_ONLY classification. ([#3488](https://github.com/diegosouzapw/OmniRoute/issues/3488))
- **fix(gamification):** the dashboard Profile page no longer hits three 404s — added the missing `GET /api/gamification/{level,badges,badges/earned}` routes (management-scoped). The page is operator-wide (no `apiKeyId`), so `level`/`badges/earned` aggregate across all keys (with an optional `?apiKeyId` for a single key), and `badges` seeds the built-in catalog first (idempotent) so the grid is populated even on installs that never seeded it (see #3472). ([#3484](https://github.com/diegosouzapw/OmniRoute/issues/3484))
- **security(oauth):** migrate the five public OAuth client_ids (Claude, Codex, Qwen, Kimi, GitHub Copilot — 9 server-side call-sites in `providerRegistry.ts` + `oauth.ts`) from string literals to `resolvePublicCred()` (Hard Rule #11), matching the existing Gemini/Antigravity pattern. The values decode byte-for-byte to the same public client_ids (env overrides still win), so OAuth flows are unchanged; the `check-public-creds` allowlist is now empty. The browser-bundled `codexDeviceFlow.ts` copy stays a literal by necessity (it cannot import `open-sse`). ([#3493](https://github.com/diegosouzapw/OmniRoute/issues/3493))
- **fix(mcp):** `omniroute --mcp` no longer crashes on npm installs with `ERR_MODULE_NOT_FOUND` (e.g. `src/lib/combos/steps.ts`) — the MCP server runs from raw TypeScript and imports across `src/` + `open-sse/`, but the published `files` allowlist only shipped a handful of cherry-picked paths, so the transitive closure (~400 files) was absent from the tarball. `files` now ships the backend source the MCP server needs (`open-sse/` + `src/{domain,lib,mitm,server,shared,sse,types}/`, excluding the `src/app` UI), and a new regression test computes the MCP import closure and fails if any reachable source file is not covered by `files`. ([#3578](https://github.com/diegosouzapw/OmniRoute/issues/3578))
- **fix(api):** `API_REFERENCE.md` no longer documents a non-existent `/api/guardrails*` / `/api/shadow*` surface (doc-fiction flagged by `check-docs-symbols`, frozen in `KNOWN_STALE_DOC_REFS`). The guardrail pipeline is real (`src/lib/guardrails`), so the two routes that map to actual behavior are now implemented — `GET /api/guardrails` (list the registered guardrails + status) and `POST /api/guardrails/test` (dry-run the pre-call pipeline over a sample input), both management-scoped — while the fictional `enable`/`disable`/`logs` rows and the entire `/api/shadow*` table (shadow A-B comparison is combo-config + `/api/combos/metrics`) were removed from the doc and dropped from the allowlist. ([#3496](https://github.com/diegosouzapw/OmniRoute/issues/3496))
- **fix(agent-bridge):** the MITM "Start" button no longer reports a misleading "port 443 may be in use" for every failure cause — `startMitm()` only matched the EADDRINUSE stderr line and always threw the port-443 message, so a missing `ROUTER_API_KEY` or an `EACCES` permission error sent users debugging the wrong thing. The startup watcher now buffers the MITM child's stderr and `interpretMitmStartupError()` maps the real `server.cjs` `❌` cause (port-in-use / permission-denied / missing API key / any other diagnostic line) into the surfaced error; with no captured output it stays generic instead of guessing port 443. ([#3606](https://github.com/diegosouzapw/OmniRoute/issues/3606))
- **fix(oauth):** Kiro "Import Token" no longer reports a bare `Internal server error` that hides the real cause — the import validates/refreshes the pasted refresh token against AWS, and the catch returned a generic 500 string, so an `invalid_grant`, an expired token, or a region mismatch all surfaced identically in the dashboard. The import error now carries the sanitized upstream cause via `sanitizeErrorMessage()` (Hard Rule #12 — no stack, no secrets), keeping the same `{ error: <string> }` response shape, and still falls back to the generic message when there is nothing to report. ([#3589](https://github.com/diegosouzapw/OmniRoute/issues/3589))
- **fix(antigravity):** the Antigravity/agy Gemini 3.5 Flash catalog now exposes clean public tier IDs (`gemini-3.5-flash-low`/`-medium`/`-high`, matching Antigravity 2.0.4's Low/Medium/High selector) and maps them to the live upstream IDs at the executor boundary, instead of the old confusing `-preview`/`-agent` names. Antigravity model-id normalization moved out of the global model resolver into the executor so client-visible IDs are no longer rewritten before account/credential routing and logging. (Maintainer follow-up: kept `gemini-3.5-flash-preview` as a hidden backward-compat alias routing to the High tier so saved combos/configs keep working; live-validated the tier set via the `agy` CLI catalog.) ([#3603](https://github.com/diegosouzapw/OmniRoute/pull/3603) — thanks @dhaern)
- **fix(usage):** Antigravity/agy Provider Limits now report accurate consumption — `retrieveUserQuota` (live usage) is preferred over the `fetchAvailableModels` catalog view (which keeps reporting full buckets after real usage), with a local `usage_history` fallback for buckets that are only catalog-visible; cached entries are sanitized so retired upstream IDs are not re-exposed, and a deduplicated post-usage refresh keeps the dashboard fresh after each request. (Maintainer follow-up: the post-usage refresh is decoupled through a lightweight `usageEvents` bus so `usageHistory` no longer imports `providerLimits`/the executors graph, keeping the `typecheck:core` surface stable.) ([#3604](https://github.com/diegosouzapw/OmniRoute/pull/3604) — thanks @dhaern)
- **fix(gemini):** textual reasoning wrappers emitted as assistant prose (`<think>`/`<thinking>`/`<thought>`/`<internal_thought>`, including malformed/open tags like `<thought\n…` before a tool call) are now routed to `reasoning_content` instead of leaking into visible `content`, in both the non-streaming sanitizer and the Gemini streaming translator (with split-chunk buffering so a tag fragmented across SSE chunks stays hidden). Structured tool calls and the existing textual tool-call conversion are preserved. ([#3605](https://github.com/diegosouzapw/OmniRoute/pull/3605) — thanks @dhaern)
- **fix(gemini):** a signed native `functionCall` arriving while a textual reasoning wrapper opened in an earlier streaming chunk is still buffered now flushes that buffered reasoning to `reasoning_content` before the tool call, instead of silently discarding it. (Pre-release `/review-reviews` finding.)
- **fix(api):** `/v1/completions` now drops a stale upstream `content-length` on the SSE branch too (the JSON branch already did) — re-serialization changes the byte length, so a buffered SSE body could otherwise advertise the pre-rewrite length and truncate/hang the client. (Pre-release `/review-reviews` finding.)

---

## [3.8.20] — 2026-06-10

### ✨ New Features

- **feat(providers):** add Claude Fable 5 (`claude-fable-5`) — wires the new flagship model across the full pipeline: `cc` and `kiro` provider registries (1M context, 128k output), pricing at $15/$75 per 1M tokens, model spec (adaptive thinking, vision, tool use), fast mode, 1M-context beta header, fallback chain (`claude-fable-5 → claude-opus-4-8 → claude-opus-4-7 → claude-sonnet-4-6`), and cost data. ([#3524](https://github.com/diegosouzapw/OmniRoute/pull/3524) — thanks @ggiak)
- **feat(resilience):** add global provider cooldown tracking to prevent combo re-walking — after a provider fails in a combo request, subsequent requests skip it for a configurable exponential backoff (default 5s min, 5min max, doubling per failure), reducing wasted time on known-failing providers. Configurable and opt-out via Settings → Resilience. ([#3556](https://github.com/diegosouzapw/OmniRoute/pull/3556) — thanks @pizzav-xyz)
- **feat(resilience):** expose provider breaker degradation threshold setting — the consecutive-failure count before a provider enters the DEGRADED state is now configurable in Settings → Resilience alongside the existing open/half-open thresholds. ([#3535](https://github.com/diegosouzapw/OmniRoute/pull/3535) — thanks @rdself)

### 🔧 Bug Fixes

- **fix(translator):** scope the Gemini `thoughtSignature` bypass to the Antigravity/CLI path and unwrap array-shaped Gemini error bodies — signature-less historical tool calls on Antigravity/CLI are emitted as native parts carrying the `skip_thought_signature_validator` sentinel (preventing upstream 400s), while the standard Gemini direct path keeps its existing text/context representation untouched. ([#3560](https://github.com/diegosouzapw/OmniRoute/issues/3560) — thanks @oyi77 and @Six7Day via [#3414](https://github.com/diegosouzapw/OmniRoute/pull/3414))

- **fix(routing):** combo model substitution no longer forwards a client `thinking:{type:"disabled"}` to a target model that rejects it — when a combo/route swaps the upstream model (e.g. `claude-opus-4-8` → `claude-fable-5`), OmniRoute now strips the now-invalid `thinking.type:"disabled"` for models flagged `rejectsThinkingDisabled` (Fable 5 defaults to adaptive and rejects it), preventing the upstream 400 that silently broke Claude Code's internal title/name-generation calls. Models that accept `disabled` (opus/sonnet) are untouched. ([#3554](https://github.com/diegosouzapw/OmniRoute/issues/3554))
- **fix(usage):** the budget dashboard can now save a budget with some limit fields left empty and clear all limits — `setBudgetSchema` used `.positive()` (rejecting the `0` the form sends for blank fields) plus a superRefine requiring at least one limit `> 0`, so saving with one field filled 400'd and clearing all limits was impossible. Limits now accept `0` (= "no limit for this period"; enforcement only kicks in above 0) and the cross-field minimum was removed; negatives are still rejected. ([#3537](https://github.com/diegosouzapw/OmniRoute/issues/3537))
- **fix(gamification):** badge-unlock events no longer re-fire on every request — the "already unlocked?" guard used `getBadges()`, which INNER-JOINs `badge_definitions` (empty until seeded), so it always reported "not earned" and re-emitted `events.badge_unlocked` per request. Added a `hasBadge()` helper that reads `user_badges` directly, so dedup is correct regardless of whether definitions are seeded. ([#3472](https://github.com/diegosouzapw/OmniRoute/issues/3472))
- **fix(routing):** the `auto` model keyword now works on the Codex `/v1/responses` path — `resolveResponsesApiModel` rewrote the bare `auto` keyword to `codex/auto`, which ChatGPT rejects (`The 'auto' model is not supported when using Codex with a ChatGPT account`). `auto` (OmniRoute's zero-config auto-routing keyword) now passes through untouched so combo routing handles it. ([#3509](https://github.com/diegosouzapw/OmniRoute/issues/3509))
- **fix(cli-tools):** saving the OpenCode/CLI tool config no longer 400s in cloud mode — every CLI tool card posts `apiKey: null` (the real key is resolved server-side from `keyId`), but `guideSettingsSaveSchema` used `z.string().optional()`, which rejects `null`. The schema now normalizes `null` → `undefined`, so the save succeeds and the `keyId`/default path is used. ([#3552](https://github.com/diegosouzapw/OmniRoute/issues/3552))
- **fix(catalog):** PublicAI is no longer miscatalogued as keyless/free — it requires an API key (registry `authType:"apikey"`; signup grants a one-time credit, then it bills). The three PublicAI models moved from `freeType:"keyless"` (which could pick them into the no-auth pool and dispatch with no `Authorization` header) to `"one-time-initial"`, and the provider's `hasFree` flag is now `false` — matching `freeTierCatalog.ts`, which already excluded publicai. ([#3558](https://github.com/diegosouzapw/OmniRoute/issues/3558))
- **fix(gemini-web):** a missing Playwright Chromium browser no longer loops and trips the provider breaker — when the browser binary is not installed, `chromium.launch()` threw an error surfaced as a retryable **500**, so accountFallback marked the account unavailable and retry-looped. It is now classified as a host/config problem and returns **503** with an actionable message (`npx playwright install chromium`) and the `X-Omni-Fallback-Hint: connection_cooldown` header, which skips the provider circuit breaker and applies a short non-exponential cooldown. ([#3516](https://github.com/diegosouzapw/OmniRoute/issues/3516))
- **fix(proxy):** the SOCKS5 proxy option now follows the runtime `ENABLE_SOCKS5_PROXY` env instead of the build-time `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY` — Next.js inlines `NEXT_PUBLIC_*` at build time, so a prebuilt Docker image ignored a runtime setting and the SOCKS5 type stayed hidden. The proxy modal now reads `socks5Enabled` from `GET /api/settings/proxies` (server-side `ENABLE_SOCKS5_PROXY`), with the build-time value kept only as a static-deploy fallback. ([#3508](https://github.com/diegosouzapw/OmniRoute/issues/3508))
- **fix(playground):** the playground model selector now lists models from custom-endpoint (OpenAI/Anthropic-compatible) providers — it filtered `/v1/models` by the provider's connection id, but the catalog emits compatible-provider models under the node's custom prefix (`prefix/model`), so the list came up empty ("None"/"-"). The selector now filters by the node prefix (exposed additively as `modelPrefix` on provider options; the connection id is unchanged, so translator send/translate and connection lookups are unaffected). ([#3505](https://github.com/diegosouzapw/OmniRoute/issues/3505))
- **fix(usage):** the Kiro quota card no longer renders a blank when the account returns no usage breakdown — `getKiroUsage` returned `quotas:{}` for a successful GetUsageLimits response without a `usageBreakdownList` (observed with some AWS IAM / Builder ID accounts), which the dashboard showed as an unexplained empty card. It now returns an informative message (surfaced via the card's connection-message path). ([#3506](https://github.com/diegosouzapw/OmniRoute/issues/3506))
- **fix(security):** route raw `err.message` through `sanitizeErrorMessage()` in five web executors (`adapta-web`, `deepseek-web`, `perplexity-web`, `qoder`, `veoaifree-web`) and the embeddings + search handlers (Hard Rule #12) — these built error response bodies from the raw upstream/exception message, which could leak internal detail. ([#3494](https://github.com/diegosouzapw/OmniRoute/issues/3494), [#3495](https://github.com/diegosouzapw/OmniRoute/issues/3495))
- **fix(dashboard):** correct two dashboard fetches that hit non-existent routes (404) — `CustomHostsManager` called `/api/tools/traffic-inspector/custom-hosts` (the real route is `/hosts`), and `FeatureFlagsGrid`'s post-restart liveness probe called `/api/health` (the real lightweight endpoint is `/api/health/ping`). ([#3486](https://github.com/diegosouzapw/OmniRoute/issues/3486), [#3487](https://github.com/diegosouzapw/OmniRoute/issues/3487))
- **chore(providers):** remove the dead `krutrim` registry entry — it was half-registered (present in `providerRegistry.ts` with a baseUrl + one model, but absent from `providers.ts`, with no executor/translator/OAuth), so it was never selectable. Dropped its `ProviderIcon` entry and the `KNOWN_REGISTRY_ONLY` exception. ([#3483](https://github.com/diegosouzapw/OmniRoute/issues/3483))
- **docs(api):** fix the agent-bridge per-agent state route in `openapi.yaml` and `AGENTBRIDGE.md` — both documented `/api/tools/agent-bridge/agents/{id}/state`, which has no route; corrected to the real per-agent `/api/tools/agent-bridge/agents/{id}` (global state remains `/api/tools/agent-bridge/state`). ([#3489](https://github.com/diegosouzapw/OmniRoute/issues/3489))
- **docs(api):** correct `API_REFERENCE.md` endpoints that documented non-existent routes — skills (`PUT /api/skills/[id]`, `POST`/`GET /api/skills/executions`), plugins (`[id]`→`[name]`, `activate`/`deactivate`), ACP (`DELETE`/`POST /api/acp/agents` via `?id`/`{action:"refresh"}`), cache (`DELETE /api/cache/reasoning`, `/api/cache/entries`), and removed the fabricated `/api/admin/circuit-breaker`, `/api/admin/rate-limits`, and `/api/system-info` (admin only exposes `/concurrency`). ([#3497](https://github.com/diegosouzapw/OmniRoute/issues/3497))
- **fix(executor):** strip provider prefix from versioned built-in tool model field — Anthropic rejects `tools[N].model: "cc/claude-opus-4-8"` from Claude Code's `advisor_20260301` and similar versioned built-in tools; the native Claude OAuth execute path now strips any provider prefix from `model` on tools whose name matches `name_YYYYMMDD`. ([#3532](https://github.com/diegosouzapw/OmniRoute/pull/3532) — thanks @ggiak)
- **fix(dashboard):** handle DEGRADED and unknown provider breaker states on the Runtime page — an unrecognised breaker state (e.g. DEGRADED) caused a crash because the styling map had no entry for it; now falls back to a neutral style so the page never throws on unknown states. ([#3533](https://github.com/diegosouzapw/OmniRoute/pull/3533) — thanks @rdself)
- **fix(usage):** make opencode-go quota fetcher fail-open instead of throwing 500 — the quota API rejects chat API keys with a JSON-401 body even though the same key works for chat; previously this threw and crashed the dashboard with a red error banner. It now returns an informative message and keeps rendering like other connection-message cases. ([#3522](https://github.com/diegosouzapw/OmniRoute/pull/3522) — thanks @wilsonicdev)
- **fix(translator):** map the Codex `local_shell` tool type — `local_shell` was absent from the translator's tool-type map, causing it to fall through as an unknown type; it is now forwarded correctly to the upstream. ([#3534](https://github.com/diegosouzapw/OmniRoute/pull/3534) — thanks @kamaka)
- **fix(images):** prefer bare combo names over built-in image model aliases — a user combo named `gpt-image-2` can now shadow the native OpenAI alias so image requests route through the combo; provider-qualified IDs like `openai/gpt-image-2` still resolve via the built-in path. ([#3527](https://github.com/diegosouzapw/OmniRoute/pull/3527) — thanks @AveryanAlex)
- **fix(translator):** fix OpenAI→Gemini translation of historical tool calls — tool results from earlier turns were being converted to text, causing Gemini to pattern-match the response as prose rather than structured content; they now use the native Gemini `functionResponse` part format. ([#3569](https://github.com/diegosouzapw/OmniRoute/pull/3569) — thanks @hartmark)
- **fix(plugins):** forward plugin lifecycle hooks (`onInstall`, `onActivate`, `onDeactivate`, `onUninstall`) via IPC and wrap `onDeactivate`/`onUninstall` in try/catch so a buggy plugin handler can no longer brick teardown; also removes redundant `RegExp()` wrappers in `accountFallback.ts` and fixes indentation in `requestLogger.ts`. ([#3562](https://github.com/diegosouzapw/OmniRoute/pull/3562) — thanks @oyi77)
- **fix(auto-update):** use a stable PROJECT_ROOT walker instead of frozen `process.cwd()` — `resolveProjectRoot` now walks up from `__dirname` to find the nearest directory containing `package.json` or `.git` (bounded at 16 levels), preventing ENOENT errors when the working directory is not the project root. ([#3561](https://github.com/diegosouzapw/OmniRoute/pull/3561) — thanks @oyi77 / @ViFigueiredo via [#3423](https://github.com/diegosouzapw/OmniRoute/pull/3423))
- **fix(resilience):** expose `providerCooldown` in `GET /api/resilience` and accept it in `PATCH` — PR #3556 added the global provider cooldown tracker to the settings model and `ResilienceTab` UI, but the API route never returned the field (causing a crash when the tab loaded) and `updateResilienceSchema` (`.strict()`) rejected PATCH bodies containing it with 400. `providerCooldownSettingsSchema` is now wired into the Zod schema, returned in the GET response, and merged in the PATCH handler. Caught during v3.8.20 VPS homologation (Hard Rule #18 — 5 TDD tests); shipped to main via [#3591](https://github.com/diegosouzapw/OmniRoute/pull/3591). ([#3590](https://github.com/diegosouzapw/OmniRoute/pull/3590) — thanks @diegosouzapw)

---

## [3.8.19] — 2026-06-09

> Focused quality-infrastructure release: the complete **quality-gate ratchet + anti-hallucination guardrail system** (Phases 0–6 + fast-tracked 6A.1/6A.2). No external PRs were taken this cycle by design — community PRs carry over to the next cycle.

### ✨ New Features

- **feat(quality):** quality-gate ratchet + anti-hallucination/rule-enforcement guardrails (Phases 0–6) — generic multi-metric ratchet engine (`quality-baseline.json` + collector + comparator, regression-only) and ~18 deterministic gates wired into CI: provider-consistency, dashboard `fetch()`→route and OpenAPI/docs→route resolution (anti-hallucination), dependency allowlist (anti-slopsquatting), file-size/duplication/complexity ratchets (frozen debt only shrinks), anti test-masking (assert-removal/tautology detection on PR diffs), error-helper (Hard Rule #12), public-creds (Rule #11), route-guard membership (Rules #15/#17), db-rules (Rules #2/#5), known-symbols (executors/strategies/translators), migration numbering. Re-enabled the cheap pre-commit hook, tiered `npm audit`, reconciled the CI coverage gate (40→60) and wired 3 orphaned contract gates. ([#3471](https://github.com/diegosouzapw/OmniRoute/pull/3471) — thanks @diegosouzapw)
- **feat(quality):** test-discovery gate + 135 orphan tests re-wired + vitest in CI (fast-tracked Phase 6A.1/6A.2) — new `check:test-discovery` proves every `*.test.ts|tsx` is collected by a runner that actually executes (15 collectors with textual drift-check; orphans frozen in a shrink-only baseline). Found **195 orphan test files** (incl. `authz/routeGuard.test.ts` guarding Rules #15/#17 — already rotten); 135 re-wired into the node runner via explicit-braces recursive globs across all scripts + 4 CI call sites; the remaining 60 are categorized debt. New `test-vitest` CI job: `test:vitest` blocking (146/146), `test:vitest:ui` informational (14 pre-existing UI-drift fails, triage 2026-06-16). ([#3536](https://github.com/diegosouzapw/OmniRoute/pull/3536) — thanks @diegosouzapw)

### 🔧 Bug Fixes

- **fix(authz):** restored the missing `BYPASS_PREFIX_NOT_ALLOWED` schema guard (Hard Rules #15/#17) — the zod refine documented as layer-1 in `routeGuard.ts` was absent from the live `settingsSchemas.ts`, so `PATCH /api/settings` accepted spawn-capable prefixes (e.g. `/api/cli-tools/runtime/`) into the manage-scope bypass list (the layer-2 runtime predicate still refused to honour them). Surfaced by re-wired orphan tests AC-8/AC-10c, which now stand as the permanent regression guard. ([#3536](https://github.com/diegosouzapw/OmniRoute/pull/3536) — thanks @diegosouzapw)
- **fix(db):** `closeDbInstance()`/`resetDbInstance()` now fire the `stateReset.ts` module-state resetters (previously only backup-restore did) — `apiKeys.ts` kept a process-level schema memo across a recreated DB, so the stale re-prepare exploded with `no such column: is_active` and clients received **503 instead of 403** for an invalid bearer; the same path hit production when restoring an older backup snapshot. Includes a dedicated regression test; a test that had accommodated the buggy 503 now asserts the deterministic 403. ([#3536](https://github.com/diegosouzapw/OmniRoute/pull/3536) — thanks @diegosouzapw)

### 🔒 Security

- **fix(security):** block the cloud-metadata SSRF pivot in the cli-tools catalog fetch (CodeQL `js/request-forgery`, **critical**) — `fetchOmniRouteCatalog()` built its `/v1/models` URL from a user-controlled `baseUrl` and fetched it. Since the legitimate target is the user's own OmniRoute (loopback), the public-only guard can't apply; `assertSafeCatalogUrl()` now blocks the cloud-metadata/link-local pivot (`169.254.169.254`, `metadata.google.internal`, …) unconditionally, plus non-http(s) protocols and embedded credentials, and the request fetches the re-parsed (taint-severed) URL. Loopback and public OmniRoute Cloud targets stay allowed. ([#3544](https://github.com/diegosouzapw/OmniRoute/pull/3544) — thanks @diegosouzapw)

### 📝 Maintenance

- **docs(quality):** Phase 6A critical-audit plan + Phase 7 community-tooling additions, both stored with an activation gate of **2026-06-16** — 6A: stale-allowlist enforcement, ratchet `--require-tighten`, gate scope expansions, remaining orphan/UI-suite triage; Phase 7 additions: gitleaks (Betterleaks noted), actionlint + zizmor, SPDX license compliance. ([#3530](https://github.com/diegosouzapw/OmniRoute/pull/3530) — thanks @diegosouzapw)
- **chore(quality):** conscious, documented re-baselines so the quality-gate debuts holding the REAL published line — file-size frozen at current sizes for 9 files that grew in the v3.8.18 era (RequestLoggerV2 +281, stream +101, combo +73, chatCore +45, …) and `eslintWarnings` 3482→3501 (the published v3.8.18 tag already measured 3501; this cycle is neutral). Driving both down is Phase 6A work. ([#3538](https://github.com/diegosouzapw/OmniRoute/pull/3538) — thanks @diegosouzapw)
- **chore(release):** open the v3.8.19 development cycle (version bump + electron lockfile sync) and ignore generated yt-downloader artifacts. (thanks @diegosouzapw)
- **test:** release-gate stabilization — the re-wired suites + the debuting CI gates surfaced and fixed 6 latent test defects: 2 suites depended on the dev machine's configured password (now hermetic), the breaker reset-timeout test ran on a 5ms margin, the bypass-prefix schema test consecrated the pre-#3536 bug, the chatcore upstream-timeout test had a structurally-broken pending-detail predicate (tested `.providerRequest` on an array — never passed isolated, even at the published v3.8.18 tag), and internal planning docs were excluded from the docs-symbols gate. Coverage floors re-baselined to the honest post-re-wire denominator (78.4% measured: previously-never-imported modules now count). (thanks @diegosouzapw)

---

## [3.8.18] — 2026-06-09

### ✨ New Features

- **feat(ui):** unified Active + Finished requests into a single view — the dashboard now shows in-flight and completed requests in one list with deep-linking, live streaming detail, and a dedicated `/api/logs/[id]` detail route; pending requests are tracked per connection and finalized as they complete. ([#3401](https://github.com/diegosouzapw/OmniRoute/pull/3401) — thanks @hartmark / @diegosouzapw)
- **feat(plugins):** plugin lifecycle hooks + theme-manager example — adds `onInstall`/`onActivate`/`onDeactivate`/`onUninstall` lifecycle events dispatched by the plugin manager, thins `index.ts` to a backward-compatible re-export shim over `hooks.ts`, and ships theme-manager + request-logger example plugins. ([#3473](https://github.com/diegosouzapw/OmniRoute/pull/3473) — thanks @oyi77 / @diegosouzapw)
- **feat(browserPool):** Playwright proxy resolved from the proxy registry — browser-backed providers (claude-web/gemini-web) now route through the configured per-provider/global proxy instead of connecting directly, matching how OAuth/token-refresh already honor `resolveProxyForProvider` (closes the VPS IP-rate-limit gap for the browser path). Fully additive with graceful degradation. ([#3492](https://github.com/diegosouzapw/OmniRoute/pull/3492) — thanks @borodulin)

### 🔧 Bug Fixes

- **fix(executor):** Llama / OpenAI-compat base URL normalization — a `baseURL` without a path (e.g. `llama.example.foo`) or with a non-`/v1` path (e.g. `bar.example.com/foo`) now correctly gets `/v1/chat/completions` appended, fixing the 404 on message sends while `GET /model` still worked. ([#3519](https://github.com/diegosouzapw/OmniRoute/pull/3519) — thanks @hartmark)
- **fix(sse):** empty-choices chunks without usage are dropped instead of injecting retry text — a streamed chunk carrying an empty `choices` array and no `usage` is now silently skipped rather than emitting placeholder retry text into the stream, eliminating spurious content for clients that send such keepalive-style frames. ([#3513](https://github.com/diegosouzapw/OmniRoute/pull/3513) — thanks @diegosouzapw)
- **fix(types):** restored a clean `typecheck:core` — typed `getPendingRequests()` to its real shape (`Record<string, Record<string, number>>`) so the unified-requests view (#3401) no longer treats pending counts as `unknown`, cast the `streamChunks` log payload to its declared type, and aligned `preScreenTargets` (#3169) to the canonical `IsModelAvailable` signature (sync-or-async, normalized via `Promise.resolve`). (thanks @diegosouzapw)
- **fix(opencode-plugin):** repaired the corrupted `index.ts` that broke the npm `publish-opencode-plugin` build (introduced by the #3435 branch) — removed two duplicated code blocks (apiFormat + debug-logging), dropped the local `normaliseFreeLabel` superseded by the `naming.ts` extraction, fixed an undefined `sdkBaseURL` reference, declared the missing `startupDebug` / `logLevel` feature-schema fields, and fixed `shortProviderLabel` dropping the prefix on a long displayName with no alias. Plugin now builds (DTS clean) with all 254 tests green. ([#3435](https://github.com/diegosouzapw/OmniRoute/pull/3435) — thanks @diegosouzapw)
- **fix(catalog):** Codex CLI model-catalog refresh no longer errors — `GET /v1/models` now returns a top-level `models: []` array for Codex clients (detected via the `originator` / `user-agent` = `codex_*` headers it sends on `GET /v1/models?client_version=...`), so `codex_models_manager` stops failing to decode the OpenAI-standard response and no longer logs `failed to refresh available models` on every startup. The array is intentionally empty: Codex replaces its built-in per-model agent prompt (`base_instructions`, ~21k chars) with whatever a populated entry carries for the selected model, so emitting our catalog would break Codex's agent behaviour — an empty list keeps Codex on its built-in model info (same inference as before, minus the error). Non-Codex OpenAI clients receive the unchanged `{object,data}` response. ([#3481](https://github.com/diegosouzapw/OmniRoute/pull/3481) — thanks @diegosouzapw)
- **fix(provider):** Cursor's Responses-API-shaped bodies on `/chat/completions` are detected and handled — a body with `input` but no `messages` is now classified as `openai-responses` (instead of forcing `openai` and building from undefined `messages` → upstream 400); standard OpenAI clients are unaffected by the `messages===undefined` guard. ([#3490](https://github.com/diegosouzapw/OmniRoute/pull/3490) — thanks @borodulin)
- **fix(sse):** numeric provider IDs normalized to strings across 4 more surfaces — extends #3427 to the Responses-API SSE passthrough (`response_id`/`item_id`/`call_id`), the buffered/flush path in `stream.ts`, the dedup-key builders, and `sseParser.ts`, preventing `undefined` lookups when IDs arrive as numbers. ([#3451](https://github.com/diegosouzapw/OmniRoute/pull/3451) — thanks @disafronov)
- **fix(theoldllm):** `X-Request-Token` generated server-side, dropping the Playwright dependency — replicates the site's client `rie()` token (djb2 hash + `oldllm-client-2026` seed + UA prefix + 8-hex `crypto.randomUUID` suffix) directly, so The Old LLM no longer needs a headless browser to mint tokens. ([#3491](https://github.com/diegosouzapw/OmniRoute/pull/3491) — thanks @borodulin / @diegosouzapw)
- **fix(combo):** parallel pre-screen + circuit-breaker fast-exit for priority combos — provider profiles and model availability for all targets are pre-screened concurrently (max 5), and targets whose circuit breaker is OPEN are skipped immediately, reducing first-token latency on multi-target priority combos. ([#3169](https://github.com/diegosouzapw/OmniRoute/pull/3169) — thanks @pizzav-xyz)
- **fix(authz):** URL-tokenized client endpoints (`/api/v1/vscode/<key>/...`) authenticate again when the caller sends its own non-OmniRoute `Authorization` header — a non-`Bearer <token>` header (e.g. VS Code Copilot's own, or an empty `Bearer `) no longer short-circuits auth; it falls through to the path-scoped URL token (still validated downstream), instead of 401'ing under `REQUIRE_API_KEY=true`. ([#3504](https://github.com/diegosouzapw/OmniRoute/pull/3504) — thanks @zhiru / @diegosouzapw)
- **fix(playground):** the dashboard provider Test playground works under `REQUIRE_API_KEY=true` — it previously sent the **masked** key (`sk-xxxx****yyyy`) as a bearer (always invalid → 401). It now authenticates via the dashboard session and sends only the key **id** (`x-omniroute-playground-key-id`); the gateway resolves the secret server-side, honored **only** for an authenticated session and never putting the key secret on the wire. ([#3503](https://github.com/diegosouzapw/OmniRoute/pull/3503) — thanks @zhiru / @diegosouzapw)

### 📝 Maintenance

- **feat(docs):** doc-accuracy gate — new `npm run check:fabricated-docs` (`scripts/check/check-fabricated-docs.mjs`) indexes the codebase (api routes, env vars, CLI commands) and flags API-path/env-var/CLI/hook/file-ref claims in `docs/**` + `AGENTS.md` that don't exist in source (soft-fail by default, `--strict` for CI; wired into `check:docs-all`). Also refreshes the AGENTS.md live counts against source. ([#3510](https://github.com/diegosouzapw/OmniRoute/pull/3510) — thanks @oyi77)
- **chore:** ignore local quality reports and prompt artifacts (`quality-metrics.json`, `PLANO-/RELATORIO-QUALITY-GATES.md`, stray prompt `.txt` files) so they no longer surface in `git status`. (thanks @diegosouzapw)

### 🔒 Security

- **fix(opencode-plugin):** bounded the regex quantifiers in `normaliseFreeLabel` to close a polynomial-ReDoS (CodeQL `js/polynomial-redos`) — an unbounded `\s*` before an anchored `\s*$` allowed O(n²) backtracking on attacker-influenced provider/model display names; bounded to `{0,8}`/`{1,8}`. (thanks @diegosouzapw)

---

## [3.8.17] — 2026-06-09

### ✨ New Features

- **feat(providers):** LMArena provider — routes requests to the LMArena battle platform via the new `lmarena` executor; supports streaming chat completions. ([#3421](https://github.com/diegosouzapw/OmniRoute/pull/3421) — thanks @oyi77)
- **feat(providers):** ZenMux provider — adds the `zenmux` executor for ZenMux's OpenAI-compatible endpoint with streaming support. ([#3429](https://github.com/diegosouzapw/OmniRoute/pull/3429) — thanks @oyi77)
- **feat(providers):** Gemini Business provider — adds the `gemini-business` executor (Phase 2C of the Google provider expansion), enabling Gemini models via Google Workspace accounts. ([#3436](https://github.com/diegosouzapw/OmniRoute/pull/3436) — thanks @oyi77)
- **feat(plugin+api):** auto-combos API + free model quota display — new `GET /api/combos/auto` endpoint lists dynamically scored combos; provider pages now surface free-tier quotas inline; MCP-plugin surface extended to match. ([#3435](https://github.com/diegosouzapw/OmniRoute/pull/3435) — thanks @mrmm)
- **feat(opencode-plugin):** per-prefix API format selection, debug logging, and free-label normaliser — three backports from the mrmm fork: each route prefix can specify its own wire format (OpenAI / Anthropic / Gemini), structured debug output is toggled via env var, and free-tier labels are normalized across providers. ([#3420](https://github.com/diegosouzapw/OmniRoute/pull/3420) — thanks @herjarsa)
- **feat(connections):** connection pagination, health filter, batch-delete confirmation, and custom banned keywords — the provider connections table is now paginated; a health-state filter lets operators show only healthy/degraded/failed connections; multi-select + confirm dialog for bulk deletes; per-connection keyword denylist for content safety. ([#3454](https://github.com/diegosouzapw/OmniRoute/pull/3454) — thanks @sdfsdfw2)
- **feat(settings):** Endpoint Token Saver visibility toggle — operators can now show or hide the Token Saver widget on the endpoint page from Settings → Appearance. ([#3461](https://github.com/diegosouzapw/OmniRoute/pull/3461) — thanks @rdself)
- **feat(catalog):** model catalog name feature flag — a new feature flag controls whether the catalog exposes provider-prefixed model names, letting deployments opt into the legacy bare-name format for downstream tooling compatibility. ([#3464](https://github.com/diegosouzapw/OmniRoute/pull/3464) — thanks @rdself)

### 🔧 Bug Fixes

- **fix(translator):** Vertex AI tool calls no longer fail with `400 Unknown name "id"` — the OpenAI-style `id` field is stripped from `functionCall`/`functionResponse` parts for `vertex`/`vertex-partner`; the public Gemini API still receives `id` as required for Gemini 3+ signature matching. ([#3457](https://github.com/diegosouzapw/OmniRoute/pull/3457) — thanks @nullbytef0x / @diegosouzapw)
- **fix(claude):** Claude Code `claude-opus-4-8` tool calls no longer break with `tool call could not be parsed` — OmniRoute no longer force-injects `interleaved-thinking` / `advanced-tool-use` / `effort` beta flags the client never negotiated; clients sending their own `anthropic-beta` header control those betas themselves. ([#3458](https://github.com/diegosouzapw/OmniRoute/pull/3458) — thanks @Forcerecon / @diegosouzapw)
- **fix(catalog):** imported/custom models on no-auth providers (e.g. The Old LLM) now appear in `GET /api/v1/models` and the Playground model selector — the eligibility gate required a DB connection row which no-auth providers never have, silently dropping every imported model for them. ([#3463](https://github.com/diegosouzapw/OmniRoute/pull/3463) — thanks @tjengbudi / @diegosouzapw)
- **fix(browser):** optional `cloakbrowser` import no longer causes bundle errors when the package is absent — the import is now wrapped in a dynamic require so the build succeeds on environments that don't install the optional dep. ([#3460](https://github.com/diegosouzapw/OmniRoute/pull/3460) — thanks @rdself)
- **fix(claude-web):** claude-web session handling cleanup — corrects an edge case where session cookies were not properly refreshed after a Turnstile challenge, and removes stale wrapper code left over from the provider split. ([#3449](https://github.com/diegosouzapw/OmniRoute/pull/3449) — thanks @androw)
- **fix(analytics):** SQL named params are now scoped per query context — a shared params object was being mutated across concurrent analytics queries, causing `SQLITE_MISUSE: named parameter not found` errors under load. ([#3447](https://github.com/diegosouzapw/OmniRoute/pull/3447) — thanks @ReqX)
- **fix(command-code):** chat endpoint reverted to `/alpha/generate` and model-sync discovery fixed — a prior refactor incorrectly targeted the wrong path, causing Command Code completions to silently 404; model listing now also resolves from the correct discovery endpoint. ([#3432](https://github.com/diegosouzapw/OmniRoute/pull/3432) — thanks @TapZe)
- **fix(command-code):** CLI version header aligned to current Command Code release — the `X-Command-Code-Version` header value was pinned to a stale version string, causing upstream version-gated features to be rejected. ([#3462](https://github.com/diegosouzapw/OmniRoute/pull/3462) — thanks @hevener10)
- **fix(sse):** provider IDs are normalized to strings before lookup — numeric provider IDs (e.g. from legacy DB rows) caused `undefined` lookups in the executor registry; all IDs are now coerced to string at the SSE entry point. ([#3427](https://github.com/diegosouzapw/OmniRoute/pull/3427) — thanks @disafronov)
- **fix(stream):** textual tool-call slicing index mismatch resolved and `containsTextualToolCallMarker` deduplicated — two related bugs in the rolling-buffer parser caused partial tool-call chunks to be emitted twice or sliced from the wrong offset, producing garbled JSON in streamed tool responses. ([#3413](https://github.com/diegosouzapw/OmniRoute/pull/3413) — thanks @Ardem2025)
- **fix(stream):** OpenAI usage-only chunks (empty `choices: []`) are now passed through instead of being dropped — some providers emit a trailing stats-only chunk after the last content delta; discarding it caused usage counters to be missing in logged responses. ([#3422](https://github.com/diegosouzapw/OmniRoute/pull/3422) — thanks @xz-dev)
- **fix(translator):** empty-string `reasoning_content` replaced with placeholder on cache miss — `injectEmptyReasoningContentForToolCalls` pre-sets `reasoning_content=""` before the cache lookup; the old guard checked for `undefined`, never firing on miss and leaving `""` in place, which DeepSeek V4+ rejects with a 400. ([#3433](https://github.com/diegosouzapw/OmniRoute/pull/3433) — thanks @ViFigueiredo)
- **fix(catalog):** combos auto-compute `context_length` for any provider-ID form — the context-length resolution only matched exact-string provider IDs, missing combos declared with a numeric or aliased ID; the lookup now normalizes before matching. ([#3417](https://github.com/diegosouzapw/OmniRoute/pull/3417) — thanks @herjarsa)
- **fix(healthcheck):** container bridge network IP probed correctly — the healthcheck script was hard-coded to `localhost` which resolves to IPv6 `::1` inside some container runtimes; it now queries the bridge gateway IP so the probe succeeds on both bridge and host networking modes. ([#3434](https://github.com/diegosouzapw/OmniRoute/pull/3434) — thanks @naimo84)
- **fix(publish):** onnxruntime CUDA binary removed from npm tarball — the native `.node` binary exceeded npm's 413 payload limit and was never needed at runtime (OmniRoute uses the CPU build); the pack policy now excludes the CUDA artifact. ([#3437](https://github.com/diegosouzapw/OmniRoute/pull/3437) — thanks @herjarsa)

### 📝 Maintenance

- **docs:** critical documentation gaps closed — new guides for ACP protocol, router strategies, compression, REST API reference, and updated AUTO-COMBO deep-dive; getting-started section added with Quick Start, Providers, Free Tiers, Auto-Combo, and Troubleshooting pages. ([#3438](https://github.com/diegosouzapw/OmniRoute/pull/3438) — thanks @oyi77)
- **docs(opencode-plugin):** plugin README rewritten to lead with the why — positions the plugin as the recommended integration path over the legacy `@omniroute/opencode-provider` package, with migration guidance. ([#3418](https://github.com/diegosouzapw/OmniRoute/pull/3418) — thanks @herjarsa)
- **docs(env):** `COMMAND_CODE_VERSION` override documented — environment variable added to `.env.example` and reference docs so operators can pin the CLI version header without a code change. ([#3462](https://github.com/diegosouzapw/OmniRoute/pull/3462) — thanks @hevener10)
- **test(auto-combo):** same-provider connection identity assertion added — regression test covering the case where two connections for the same provider share an account ID, verifying the combo engine selects the correct one. ([#3378](https://github.com/diegosouzapw/OmniRoute/pull/3378) — thanks @oyi77)
- **deps:** electron upgraded to 42.3.3; electron-builder to 26.15.2; electron-updater to 6.8.9; 4 development-group and 10 production-group packages bumped via Dependabot. ([#3441](https://github.com/diegosouzapw/OmniRoute/pull/3441) / [#3442](https://github.com/diegosouzapw/OmniRoute/pull/3442) / [#3443](https://github.com/diegosouzapw/OmniRoute/pull/3443) / [#3444](https://github.com/diegosouzapw/OmniRoute/pull/3444) / [#3445](https://github.com/diegosouzapw/OmniRoute/pull/3445) — thanks @diegosouzapw)
- **chore(release):** v3.8.17 development cycle opened from `main`. (thanks @diegosouzapw)

---

## [3.8.16] — 2026-06-08

### ✨ New Features

- **feat(vision-bridge):** auto-routing to the fastest available vision model — when a request carries image content and the selected model does not support vision, OmniRoute now transparently delegates to the best-match vision-capable model instead of returning an error. ([#3377](https://github.com/diegosouzapw/OmniRoute/pull/3377) — thanks @herjarsa)
- **feat(web-session):** web-session pool observability — new MCP tool `get_web_session_pool_health` and a health-matrix REST response (`GET /api/web-session-pool/health`) expose per-provider slot counts, lease ages, and error budgets so operators can diagnose pool exhaustion without digging through logs. ([#3395](https://github.com/diegosouzapw/OmniRoute/pull/3395) — thanks @oyi77)
- **feat(web-session):** adaptive keepalive threshold — the keepalive heartbeat interval now self-adjusts based on observed provider idle-disconnect behaviour instead of using a fixed constant, reducing both unnecessary pings and unexpected session drops. ([#3397](https://github.com/diegosouzapw/OmniRoute/pull/3397) — thanks @oyi77)
- **feat(web-session):** bulk credential import endpoint (`POST /api/web-session/import`) — import a JSON array of session credentials in one call; each entry is validated and inserted atomically, with per-entry success/failure reported in the response. ([#3403](https://github.com/diegosouzapw/OmniRoute/pull/3403) — thanks @oyi77)
- **feat(api):** REST API for session pool health (`GET /api/session-pool/health`) — a dashboard-facing endpoint that aggregates live slot usage, wait-queue depth, and error rates across all active session pools; wired to a new dashboard widget. ([#3404](https://github.com/diegosouzapw/OmniRoute/pull/3404) — thanks @oyi77)

### 🔧 Bug Fixes

- **fix(sse):** eliminate race window in `usageTokenBuffer` settings update — a concurrent save + stream-start could race to apply stale settings, causing token counts to roll back by up to 2 000 tokens after a restart; the update now uses an atomic read-modify-write on the shared settings ref. ([#3405](https://github.com/diegosouzapw/OmniRoute/pull/3405) — thanks @diegosouzapw)
- **fix(context-cache):** server-side context-cache pinning now correctly persists across restarts; proxy message content no longer leaks into the upstream prompt; and the `context_cache_protection` toggle is properly saved to the DB on change. ([#3399](https://github.com/diegosouzapw/OmniRoute/pull/3399) — thanks @k0valik)
- **fix(providers):** the provider settings page now refreshes its model list after a successful `sync-models` call — previously the stale list remained until a full page reload. ([#3402](https://github.com/diegosouzapw/OmniRoute/pull/3402) — thanks @0xtbug)
- **fix(stream):** empty-choices chunks (choices array present but empty, no `finish_reason`) are now silently dropped rather than emitted as a `retry:` SSE event — removes spurious retry lines from streaming responses for providers that emit heartbeat keep-alive chunks. ([#3400](https://github.com/diegosouzapw/OmniRoute/pull/3400) — thanks @0xtbug)
- **fix(account-fallback):** the connection cooldown deduplication state is now preserved across the fallback retry chain — previously a second concurrent failure on the same account could clear the dedupe flag set by the first, allowing the cooldown window to be extended twice. ([#3381](https://github.com/diegosouzapw/OmniRoute/pull/3381) — thanks @oyi77)
- **fix(stream):** false-positive textual tool-call marker truncation — `containsTextualToolCallMarker` now tracks how much of the accumulated streamed content has already been emitted, so it only withholds the unemitted tail rather than re-scanning from the start on every new chunk. ([#3382](https://github.com/diegosouzapw/OmniRoute/pull/3382) — thanks @Ardem2025)
- **fix(sanitizer):** `containsTextualToolCallContent()` now requires the complete `[Tool call: name]\nArguments:` header pattern instead of a bare `.includes("[Tool call:")` check — prevents the non-streaming response sanitizer from nulling out model responses that merely quote `[Tool call:]` in prose or code examples. ([#3355](https://github.com/diegosouzapw/OmniRoute/pull/3410) — thanks @diegosouzapw)
- **fix(stream):** the streaming textual tool-call guard now flushes any remaining buffered content as plain text when the stream ends, regardless of whether the buffer contains `"Arguments:"` — previously, a partial/incomplete tool-call header that arrived at end-of-stream was silently dropped. ([#3355](https://github.com/diegosouzapw/OmniRoute/pull/3410) — thanks @diegosouzapw)
- **fix(executor):** Mistral (and any provider in `PROVIDERS_REQUIRING_USER_LAST_MESSAGE`) no longer receives a trailing `assistant` message with plain text content — `stripTrailingAssistantForProvider` drops it on the upstream-send path, fixing the `400: Expected last role User or Tool … but got assistant` rejection. ([#3396](https://github.com/diegosouzapw/OmniRoute/pull/3409) — thanks @diegosouzapw)
- **fix(mitm):** `getMitmStatus()` in the build-time stub (Docker image) now returns a graceful `{ running: false }` status instead of throwing, so the Agent Bridge UI shows a clean "stopped" state rather than an error banner in containerised deployments. ([#3390](https://github.com/diegosouzapw/OmniRoute/pull/3408) — thanks @diegosouzapw)
- **fix(env):** corrected casing of `OMNIROUTE_TRACE` in `.env.example` and all related documentation files — was previously mixed-case in some places, causing the variable to be silently ignored on case-sensitive file systems. ([#3393](https://github.com/diegosouzapw/OmniRoute/pull/3393) — thanks @androw)
- **fix(featureFlags):** `PRICING_SYNC_ENABLED` description now clearly states that the feature requires the corresponding environment variable to be set — removes the ambiguity that led operators to enable it via the UI only and wonder why sync never ran. ([#3394](https://github.com/diegosouzapw/OmniRoute/pull/3394) — thanks @androw)

### 📝 Maintenance

- **ci(docker):** the CI pipeline now builds and publishes the `-web` image variant in the same Docker publish workflow, so both the standard and browser-backed images stay in sync on every release. ([#3389](https://github.com/diegosouzapw/OmniRoute/pull/3389) — thanks @zhiru)
- **ci(e2e):** E2E shard suite hardened — timeout raised to 45 min for the heaviest shard; build artifact now uses an explicit `tar` bundle to avoid `upload-artifact@v4` LCA path ambiguity; `node_modules` copied into standalone after download; browser cache added to cut cold-shard time; `sync-models` endpoint mocked in `providers-management.spec.ts` so the import modal reaches "done" immediately. (thanks @diegosouzapw)
- **docs:** Codex CLI configuration guide added to the dashboard (`/dashboard/codex-config`) — covers profile naming, model selection, and the `CODEX_*` environment variables accepted by OmniRoute. (thanks @diegosouzapw)
- **chore(agentSkills):** catalog expanded to 43 entries — `config-codex-cli` added as a new `CONFIG_SKILL_IDS` category; all skill-count assertions updated across unit and integration test suites; `next-fetch` opts cast to satisfy the TypeScript overload signature in the skill runner. (thanks @diegosouzapw)

---

## [3.8.15] — 2026-06-07

### ✨ New Features

- **feat(error-rules):** provider-specific error classification with scope — a declarative rules layer lets providers map upstream error shapes to the right resilience action (provider circuit-breaker vs connection cooldown vs model lockout) at the correct scope, instead of relying on generic status-code heuristics. ([#3370](https://github.com/diegosouzapw/OmniRoute/pull/3370) — thanks @herjarsa)

### 🔧 Bug Fixes

- **fix(combo):** add `429` to `PROVIDER_FAILURE_ERROR_CODES` so a rate-limited target no longer drives an infinite retry loop — the combo now cools the target down and moves on. ([#3366](https://github.com/diegosouzapw/OmniRoute/pull/3366) — thanks @herjarsa)
- **fix(catalog):** add a `getTokenLimit` fallback for combo targets with an unknown context window, so a target whose context can't be resolved no longer breaks token-limit computation for the combo. ([#3369](https://github.com/diegosouzapw/OmniRoute/pull/3369) — thanks @herjarsa)
- **fix(auto-combo):** include no-auth providers in Auto-Combo declaratively (driven by provider metadata rather than a hard-coded list), so keyless providers are eligible candidates. ([#3365](https://github.com/diegosouzapw/OmniRoute/pull/3365) — thanks @oyi77)
- **fix(auto-combo):** validate web-session credentials before selecting a web-cookie provider as an Auto-Combo target, so an expired/empty session doesn't get picked. ([#3371](https://github.com/diegosouzapw/OmniRoute/pull/3371) — thanks @oyi77)
- **fix(command-code):** update the Command Code base URL from `/alpha/` to `/provider/v1/` (upstream moved the endpoint). ([#3372](https://github.com/diegosouzapw/OmniRoute/pull/3372) — thanks @TapZe)
- **fix(kiro):** probe `%APPDATA%\kiro\storage.db` on Windows during Kiro auto-import, so the import finds the credential store where Kiro actually writes it on Windows. ([#3375](https://github.com/diegosouzapw/OmniRoute/pull/3375), fixes #3363 — thanks @diegosouzapw; reported by @Gerashka2)

### 📝 Maintenance

- **fix(migrations):** restore `095_provider_node_custom_headers.sql` — it was twice deleted from the release branch by a contributor branch's `git rm` of a duplicate getting folded into the squash merge; restored and guarded. (thanks @diegosouzapw)

### 🙌 Contributors

Thanks to everyone whose work landed in v3.8.15:

| Contributor                                      | PRs / Issues                                       |
| ------------------------------------------------ | -------------------------------------------------- |
| [@herjarsa](https://github.com/herjarsa)         | #3366, #3369, #3370                                |
| [@oyi77](https://github.com/oyi77)               | #3365, #3371                                       |
| [@TapZe](https://github.com/TapZe)               | #3372                                              |
| [@Gerashka2](https://github.com/Gerashka2)       | reported #3363                                     |
| [@diegosouzapw](https://github.com/diegosouzapw) | maintainer — #3375 shepherding, migration restores |

---

## [3.8.14] — 2026-06-07

### ✨ New Features

- **feat(api):** per-provider **custom headers** for OpenAI/Anthropic-compatible provider nodes — attach operator-defined headers (e.g. tenant/routing headers) to upstream requests via a new `customHeaders` field on provider nodes (`custom_headers_json` column, migration 095). Hardened on merge: values/names validated through the canonical `upstreamHeadersRecordSchema` (CRLF/control-char/length/16-max) with a single shared `isForbiddenCustomHeaderName()` denylist (hop-by-hop + auth), applied case-insensitively, and honored for `anthropic-compatible-cc-*` nodes too. ([#3338](https://github.com/diegosouzapw/OmniRoute/pull/3338) — thanks @pizzav-xyz / @diegosouzapw)

### 🔒 Security

- **fix(security):** provider auto-sync self-fetch now uses a trusted loopback/env-pinned origin (`getModelSyncInternalBaseUrl()`) instead of `new URL(request.url).origin`, so a management-authenticated caller can no longer redirect the credential-bearing internal request to an arbitrary host via the `Host` header (CodeQL `js/request-forgery`, critical). Shipped to Docker/Electron in v3.8.13; reaches npm here (npm `3.8.13` was immutable). ([#3336](https://github.com/diegosouzapw/OmniRoute/pull/3336), CodeQL #323 — thanks @diegosouzapw)

### 🔧 Bug Fixes

- **fix(translator):** every Gemini/Vertex `functionDeclaration.parameters` is now coerced to an OBJECT-typed schema before cleaning. Clients like GitHub Copilot send some tools (e.g. `terminal_last_command`) whose `parameters` is present but lacks a top-level `type: "object"` (just `{ properties }`, a scalar type, or `{}`); these slipped through `buildGeminiTools`' `params || default` guard and Vertex rejected them with `[400] ... functionDeclaration parameters schema should be of type OBJECT`. Hardens every OpenAI→Gemini tool request (Vertex / antigravity / agy / gemini). (#3357 — thanks @nullbytef0x)
- **fix(gemini):** normalize Gemini/Antigravity textual `[Tool call: ...]` markers — stop suppressing **false positives** (legitimate assistant prose that merely mentions `[Tool call: terminal]`, e.g. in backticks, is preserved instead of being swallowed) and correctly buffer markers **split across streaming chunks** (`[Tool` + ` call: terminal]` + `Arguments: {...}`), flushing the text when it turns out not to be a tool call. Dedups the parsing/validation into a shared `open-sse/utils/textualToolCall.ts` (new `isValidToolCallHeaderPrefix`) and adds `gemini-2.5-flash`/`gemini-3.5-flash-low` model specs. ([#3358](https://github.com/diegosouzapw/OmniRoute/pull/3358) — thanks @Ardem2025 / @diegosouzapw)
- **fix(electron):** clicking "Exit" (or applying an update) now terminates the **whole** server process tree, not just the direct child. The embedded server runs as `omniroute.exe`-as-node (`ELECTRON_RUN_AS_NODE`) and spawns grandchildren (embedded services, MITM proxy, tunnels); on Windows `ChildProcess.kill()` only terminates the direct child, so survivors kept `omniroute.exe` locked — the process "hung in memory" after Exit and updates failed with "file in use". New `killProcessTree()` helper uses `taskkill /PID <pid> /T /F` on Windows (signal-based on POSIX); wired into `stopNextServer`, the `waitForServerExit` force-kill, and `installUpdate`. (#3347 — thanks @Flexible78)
- **fix(proxy):** proxy auto-selection is now **opt-in** (new `PROXY_AUTO_SELECT_ENABLED` flag, default off). Previously a single proxy in the registry silently became a global fallback for **all** provider connections (the Step-11 fallback listed every registry proxy, ignoring assignments and per-connection `proxy_enabled`). It now no-ops unless the operator enables the flag. (#3332 — thanks @hertznsk)
- **fix(cli):** write the OpenCode config to `~/.config/opencode/opencode.json` on **all** platforms — on Windows OmniRoute wrote to `%APPDATA%\opencode\` but OpenCode reads from `%USERPROFILE%\.config\opencode\` (XDG), so dashboard-saved config silently had no effect. (#3330 — thanks @abdulkadirozyurt)
- **fix(catalog):** remove `minimaxai/minimax-m3` from the **NVIDIA NIM** tier — NVIDIA does not host it yet, so every request 404'd (`404 page not found`), while sibling `minimax-m2.7` on the same provider works. MiniMax M3 stays available on the tiers that actually serve it. (#3329 — thanks @mikmaneggahommie)
- **fix(sse):** treat **MiniMax M3** as multimodal so the compression layer no longer strips image parts from vision requests — `lite.ts modelSupportsVision` now keeps images for `minimax-m3*` (see also the registry `supportsVision` alignment in Maintenance). ([#3328](https://github.com/diegosouzapw/OmniRoute/pull/3328) — thanks @diegosouzapw)
- **fix(oauth):** Kiro **Builder ID** token import no longer fails with "Bad credentials" — `validateImportToken` only ever tried the social-auth refresh; it now uses the cached AWS SSO `clientId`/`clientSecret` (`~/.aws/sso/cache/*.json`) and the OIDC refresh path (`authMethod: "builder-id"`), with a TDD harness. ([#3333](https://github.com/diegosouzapw/OmniRoute/pull/3333) — thanks @quanturbo / @diegosouzapw)
- **fix(provider-proxy):** honor per-account proxy toggles — a connection with `proxy_enabled = false` is no longer forced through an assigned/registry proxy. ([#3349](https://github.com/diegosouzapw/OmniRoute/pull/3349) — thanks @rdself)
- **fix(providers):** reduce proxy label noise on the provider page (clearer proxy assignment/state display). ([#3346](https://github.com/diegosouzapw/OmniRoute/pull/3346) — thanks @wilsonicdev)
- **fix(noauth):** expose only **usable** model aliases for no-auth providers, so the catalog no longer advertises aliases that can't actually be called. ([#3345](https://github.com/diegosouzapw/OmniRoute/pull/3345) — thanks @oyi77)
- **fix(duckduckgo):** restore the bare `Response` contract for the DuckDuckGo/browser-backed executor (rebased onto the cycle), fixing a wrapping-contract regression. ([#3323](https://github.com/diegosouzapw/OmniRoute/pull/3323) — thanks @oyi77 / @diegosouzapw)
- **fix(dashboard):** drop the duplicate "Distribute Proxies" button on the provider page — it rendered twice at once (provider toolbar + accounts-list header) whenever connections existed and none were selected. The toolbar button (global) and the per-tag-group buttons remain. ([#3352](https://github.com/diegosouzapw/OmniRoute/pull/3352) — thanks @diegosouzapw)
- **fix(electron):** ship `loginManager.js` in the packaged app — #3292 added it (and a `require("./loginManager")` in `main.js`) without adding it to electron-builder's `build.files`, so the packaged app crashed at startup with "Cannot find module" on the Linux/macOS smoke tests. Plus a regression test asserting every local `require("./x")` in the Electron entry points is shipped. ([#3334](https://github.com/diegosouzapw/OmniRoute/pull/3334) — thanks @diegosouzapw)
- **fix(startup):** correct the #3292 auto-refresh daemon import (`@/open-sse/...` → `@omniroute/open-sse/services/autoRefreshDaemon`); the `@/` alias maps to `src/`, so the daemon silently never ran in the built standalone (non-fatal "Cannot find module", caught at runtime). Adds a regression test banning `@/open-sse/*` imports in `src/`. ([#3335](https://github.com/diegosouzapw/OmniRoute/pull/3335) — thanks @diegosouzapw)
- **fix(electron):** wrap `autoUpdater.checkForUpdates()` so a 404/offline/rate-limited update check can no longer surface as an unhandled rejection (the `error` event still notifies the user); fixes the macOS-intel packaged-app smoke failure. ([#3339](https://github.com/diegosouzapw/OmniRoute/pull/3339) — thanks @diegosouzapw)
- **fix(dashboard):** stop the infinite render loop on `/dashboard/cli-agents/hermes-agent` — `HermesAgentToolCard` listed `currentRoles` in the config-load effect's deps while `loadCurrentConfig()` set `currentRoles` to a fresh object on every fetch, so the effect re-fired → refetched → re-set forever (the page spun and spammed `GET /api/cli-tools/hermes-agent-settings` in the console; it manifested only on the always-expanded detail page). `loadCurrentConfig` is now memoized and the batch-seed reads `currentRoles` via a functional update, so the effect runs once. Adds a jsdom regression test asserting the settings endpoint is fetched a bounded number of times. ([#3353](https://github.com/diegosouzapw/OmniRoute/pull/3353) — thanks @diegosouzapw)
- **fix(dashboard):** the Usage Analytics card now surfaces the **real** backend error (status + message) instead of a generic placeholder when `/api/usage/analytics` fails — a new shared `fetchError.ts` helper extracts a useful message. ([#3356](https://github.com/diegosouzapw/OmniRoute/pull/3356) — thanks @diegosouzapw)

### 📝 Maintenance

- **fix(review):** harden the per-provider custom-headers feature surfaced by the `/review-reviews` battery — `updateProviderNode` no longer wipes stored `custom_headers_json` on a partial update that omits the field; `customHeadersSchema` reuses the canonical `upstreamHeadersRecordSchema` guards (CRLF/control-char/length/16-max) and rejects auth header names via a single shared `isForbiddenCustomHeaderName()` denylist (executor + schema no longer keep divergent copies); custom headers now reach the wire for `anthropic-compatible-cc-*` nodes and override the executor's own `Content-Type`/`Accept` case-insensitively instead of duplicating them; and `rowToCamel` normalizes a NULL `_json` column to `baseKey: null`. ([#3350](https://github.com/diegosouzapw/OmniRoute/pull/3350) — thanks @diegosouzapw)
- **fix(catalog):** flag every `minimax-m3` registry entry `supportsVision` (not just the opencode free tier) so the vision-bridge guardrail and the compression layer agree the model is multimodal on all tiers (completes #3328). (thanks @diegosouzapw)
- **fix(oauth):** Kiro Builder ID import forwards the requested `region` to the OIDC validation refresh (no longer pinned to `us-east-1`), prefers the region-matching cached SSO client registration over the first file found, and falls `expiresIn` back to 3600 on the OIDC path. (thanks @diegosouzapw)
- **fix(db):** migration `095` gains an `isSchemaAlreadyApplied` guard so a fresh DB (where `SCHEMA_SQL` already creates `custom_headers_json`) skips it cleanly instead of throwing-then-catching a duplicate-column error. (thanks @diegosouzapw)
- **test:** align stale cycle tests with shipped behavior — NVIDIA `minimaxai/minimax-m3` removal (#3329), the 29th feature flag (`PROXY_AUTO_SELECT_ENABLED`, #3332), and the OpenCode `~/.config` path on Windows (#3330). (thanks @diegosouzapw)
- **docs:** add a documentation comment to the exported `GET` handler in the context-analytics route. ([#3337](https://github.com/diegosouzapw/OmniRoute/pull/3337) — thanks @Lang-Qiu)
- **docs(i18n):** translate 25 core documentation files to Indonesian. ([#3348](https://github.com/diegosouzapw/OmniRoute/pull/3348) — thanks @KrisnaSantosa15)

### 🙌 Contributors

Thanks to everyone whose work landed in v3.8.14:

| Contributor                                              | PRs / Issues                                                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [@pizzav-xyz](https://github.com/pizzav-xyz)             | #3338                                                                                                  |
| [@quanturbo](https://github.com/quanturbo)               | #3333                                                                                                  |
| [@oyi77](https://github.com/oyi77)                       | #3323, #3345                                                                                           |
| [@rdself](https://github.com/rdself)                     | #3349                                                                                                  |
| [@wilsonicdev](https://github.com/wilsonicdev)           | #3346                                                                                                  |
| [@hertznsk](https://github.com/hertznsk)                 | #3332                                                                                                  |
| [@abdulkadirozyurt](https://github.com/abdulkadirozyurt) | #3330                                                                                                  |
| [@mikmaneggahommie](https://github.com/mikmaneggahommie) | #3329                                                                                                  |
| [@Flexible78](https://github.com/Flexible78)             | #3347                                                                                                  |
| [@Lang-Qiu](https://github.com/Lang-Qiu)                 | #3337                                                                                                  |
| [@KrisnaSantosa15](https://github.com/KrisnaSantosa15)   | #3348                                                                                                  |
| [@nullbytef0x](https://github.com/nullbytef0x)           | #3357                                                                                                  |
| [@Ardem2025](https://github.com/Ardem2025)               | #3358                                                                                                  |
| [@diegosouzapw](https://github.com/diegosouzapw)         | maintainer — #3334, #3335, #3336, #3339, #3350, #3352, #3353, #3356; review/hardening across the cycle |

---

## [3.8.13] — 2026-06-06

### ✨ New Features

- **feat(web-cookie):** self-service login infrastructure for 21 web-cookie providers — three login pathways (Electron BrowserWindow, Playwright dashboard fallback, `POST /api/providers/{id}/login`), token-extraction configs, and a 15-min cookie-validity auto-refresh daemon. Hardened on merge: error bodies sanitized (Hard Rule #12), the spawn-capable login route classified LOCAL_ONLY (Hard Rules #15/#17), and the Electron status listener de-duplicated. ([#3292](https://github.com/diegosouzapw/OmniRoute/pull/3292), closes #3070 — thanks @oyi77 / @diegosouzapw)
- **feat(api):** accept path-scoped API keys on client API routes — keys may arrive via `/api/v1/vscode/<key>/…` path aliases (incl. `raw`/`combos`); explicit `Authorization`/`x-api-key` headers still take precedence. Split out of #3073. ([#3300](https://github.com/diegosouzapw/OmniRoute/pull/3300) — thanks @zhiru)
- **feat(api):** model-catalog enrichment + MCP `model-catalog` tools — richer per-model metadata (context window, capabilities) surfaced through `/v1/models` and new MCP tools, plus `readHeaderValue` header-record support. Split out of #3073; reconciled on merge with the #3309 URL-token hardening (kept the security gate — no query-string credential fallback, management auth stays header-only). ([#3306](https://github.com/diegosouzapw/OmniRoute/pull/3306) — thanks @zhiru / @diegosouzapw)
- **feat(dashboard):** internationalize the proxy settings UI — `ProxyTab` + the proxy `DocumentationTab`/`FreePoolTab`/`VercelRelayModal` now render via `t(...)`, with matching `en`/`pt-BR` message keys. Split out of #3073. ([#3307](https://github.com/diegosouzapw/OmniRoute/pull/3307), [#3310](https://github.com/diegosouzapw/OmniRoute/pull/3310) — thanks @zhiru)
- **feat(provider):** provider test-all endpoint + per-connection rate-limit overrides + model visibility — `POST /api/models/test-all` runs parallel model tests (chunked, timeout-skip) atop a shared `runSingleModelTest` runner; per-connection rate-limit overrides land via `PATCH /api/providers/:id` (new `rate_limit_overrides_json` column + Zod schema); a dashboard model-visibility toolbar (All / Visible / Hidden) drives a `/v1/models` catalog that excludes user-hidden models; models auto-fetch on every connection add; and passthrough (OpenRouter) models gain test buttons. Folds in dashboard fixes on merge (missing alias/delete handlers, duplicate-model-ID React keys, "Hide all" restored) and a build fix so empty `.env` values no longer override real config. ([#3267](https://github.com/diegosouzapw/OmniRoute/pull/3267) — thanks @Vinayrnani)
- **feat(api):** VS Code Copilot Ollama-compatible BYOK endpoint — exposes an Ollama-shaped surface so VS Code Copilot's "bring your own key" Ollama provider can target OmniRoute directly, with a `VscodeTokenAliasCard` in the dashboard endpoint tab to generate the path-scoped token alias. ([#3316](https://github.com/diegosouzapw/OmniRoute/pull/3316) — thanks @zhiru)
- **feat(combo):** Auto-Combo candidate-expansion optimization + playground model dropdown + "only configured" model toggle — reworks the `auto` strategy's candidate selection in `combo.ts` and surfaces a model picker in the playground `StudioConfigPane` / `useAvailableModels`. ([#3322](https://github.com/diegosouzapw/OmniRoute/pull/3322) — thanks @oyi77)

### 🔒 Security

- **fix(auth):** follow-up hardening of the client-API key extractor (#3300) — removed the generic query-string token fallbacks (`?token=`/`?key=`/`?apiKey=`/`?api_key=`), which leak credentials into access logs / Referer headers, and gated URL-borne tokens to client routes only (management auth is now header-only) so a credential in the URL can never authenticate a management route. The path-scoped `/vscode/<key>/…` form the VS Code integration needs is unchanged. (security review follow-up to [#3300](https://github.com/diegosouzapw/OmniRoute/pull/3300) — thanks @zhiru / @diegosouzapw)

### 🔧 Bug Fixes

- **fix(dashboard):** Agent Bridge page (`/dashboard/tools/agent-bridge`) no longer crashes with "Internal Server Error" — the page replaced its well-shaped state with the raw `/api/tools/agent-bridge/state` response (`{ server, agents }`), leaving `serverState` undefined and throwing `Cannot read properties of undefined (reading 'running')`. A shared `normalizeAgentBridgeState()` now maps the route shape into the page contract (incl. `server.certExists → certTrusted`) and always returns safe defaults, used by both the SSR loader and the polling hook. (#3318 — thanks @tycronk20)
- **fix(codex):** strip client-only params (`prompt_cache_retention`, `safety_identifier`, `user`) on the native `codex/` `/v1/responses` passthrough — Codex upstream rejects them with `400 Unsupported parameter`, which broke Factory Droid and any client injecting those fields. The chat-completions path already stripped them; the responses→responses passthrough now does too. (#3317 — thanks @tycronk20)
- **fix(theoldllm):** stop the `[502]: Body is unusable: Body has already been read` error on the cached-token path — the executor read the same upstream `Response` body with `.text()` twice; it now reads it once and only re-reads after a token-rejection refetch. (#3296 — thanks @onizukashonan14-png)
- **fix(dashboard):** keep no-auth providers (opencode, duckduckgo-web, theoldllm, veoaifree-web) visible under the "Show configured only" filter — they never create a connection row (`stats.total === 0`) but are always usable and already appear in `/v1/models`, so the filter now treats `displayAuthType === "no-auth"` as configured. (#3290 — thanks @uniQta)
- **fix(dashboard):** refresh the connection list after a Codex/Claude/Gemini auth import — the import modals called `fetchData()` (which only reloads provider metadata), so a freshly-imported connection stayed invisible until a manual reload; they now call `fetchConnections()`. ([#3320](https://github.com/diegosouzapw/OmniRoute/pull/3320) — thanks @zhiru)
- **fix(cli):** `omniroute update` no longer always fails on a global install — `getCurrentVersion()` and `createBackup()` now resolve `package.json`/`bin` relative to the script (`import.meta.url`) instead of `process.cwd()` (the user's working dir on a global npm/brew install → _"Could not determine current version"_), and the backup copies the `cli` directory with `cpSync({recursive:true})` instead of `copyFileSync`, which threw a swallowed `EISDIR` → _"Failed to create backup. Aborting"_. (#3295 — thanks @uniQta)
- **fix(sse):** harden the passthrough stream against empty upstream responses — emit a synthetic retry chunk on an empty `choices: []` (fixes a Copilot Chat crash) and log empty post-`tool_calls` completions; also registers **MiniMax M3** (1M context) across 8 provider tiers. ([#3297](https://github.com/diegosouzapw/OmniRoute/pull/3297), #3110 — thanks @wilsonicdev)
- **fix(opencode-provider):** extract `contextLength` from the live `/v1/models` catalog (live > `modelContextLengths` > static map) so passthrough models outside the legacy 8-model map no longer silently truncate to OpenCode's 128K default. ([#3298](https://github.com/diegosouzapw/OmniRoute/pull/3298) — thanks @herjarsa / @diegosouzapw)
- **fix(dev):** auto-rebuild `better-sqlite3` on a Node ABI mismatch at `npm run dev` startup (nvm 22↔24) — dev-only, no-op on the healthy path, unrelated errors not swallowed. ([#3301](https://github.com/diegosouzapw/OmniRoute/pull/3301) — thanks @zhiru)
- **fix(api):** remove the bundled **Completions.me** provider preset — empirically verified to return Rick Astley lyrics instead of real completions for every model/prompt. ([#3302](https://github.com/diegosouzapw/OmniRoute/pull/3302), discussion #3293 — thanks @diegosouzapw; reported by @mikmaneggahommie)
- **fix(ci):** skip the auto-deploy step when the VPS SSH port is unreachable from the GitHub runner (private LAN / firewall) instead of red-failing every release pipeline; genuine deploy/boot failures still fail honestly. ([#3299](https://github.com/diegosouzapw/OmniRoute/pull/3299) — thanks @diegosouzapw)
- **fix(sse):** strip leaked internal tool-call envelopes (`to=functions.*` / `multi_tool_use.parallel { … }`) from visible assistant text and sanitize Responses-API streaming (drop `commentary`-phase output items) so harness syntax never reaches the client. ([#3311](https://github.com/diegosouzapw/OmniRoute/pull/3311) — thanks @zhiru)
- **fix(sse):** expose the Claude (`claude-opus-4-6-thinking`, `claude-sonnet-4-6`) and Gemini budget tiers (`gemini-3.1-pro-{high,low}`, `gemini-3.5-flash-{low,extra-low}`) in the Antigravity catalog — they are user-callable on the Antigravity OAuth backend (agy parity), correcting an earlier assumption that Claude had been removed. ([#3303](https://github.com/diegosouzapw/OmniRoute/pull/3303), discussion #3184 — thanks @diegosouzapw)
- **fix(catalog):** compute a combo's `context_length` from the known targets only — a single target with unknown context no longer collapses the whole combo to `undefined`; also accepts live `{id, contextLength}` model entries in the opencode-provider helper (follow-up to #3298). ([#3304](https://github.com/diegosouzapw/OmniRoute/pull/3304) — thanks @herjarsa / @diegosouzapw)

### 📝 Maintenance

- **test(catalog):** align the Antigravity preview-alias catalog test with the #3303 budget tiers — asserts the restored Claude/Gemini tiers are surfaced, locking in the behavior so a future tier change can't silently drop them again (thanks @diegosouzapw)
- **docs:** rename the `resolve-issues` skill references to `review-issues` across the docs/skill surfaces, matching the renamed governance skill (thanks @diegosouzapw)
- **docs:** document the VS Code / Ollama endpoints (API reference + new `docs/reference/CLI-TOOLS.md`) and improve the env-bootstrap + i18n key-coverage tooling. ([#3319](https://github.com/diegosouzapw/OmniRoute/pull/3319) — thanks @zhiru)
- **chore(release):** open the v3.8.13 development cycle (version bump + cycle bookkeeping) and finalize this changelog (thanks @diegosouzapw)

### 🙌 Contributors

Thanks to everyone whose work landed in v3.8.13:

| Contributor                                                    | PRs / Issues                                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [@zhiru](https://github.com/zhiru)                             | #3300, #3306, #3307 / #3310, #3309, #3301, #3311, #3320, #3319, #3316                |
| [@tycronk20](https://github.com/tycronk20)                     | #3317, #3318                                                                         |
| [@Vinayrnani](https://github.com/Vinayrnani)                   | #3267                                                                                |
| [@oyi77](https://github.com/oyi77)                             | #3292 (closes #3070), #3322                                                          |
| [@onizukashonan14-png](https://github.com/onizukashonan14-png) | #3296                                                                                |
| [@uniQta](https://github.com/uniQta)                           | #3290, #3295                                                                         |
| [@wilsonicdev](https://github.com/wilsonicdev)                 | #3297                                                                                |
| [@herjarsa](https://github.com/herjarsa)                       | #3298, #3304                                                                         |
| [@mikmaneggahommie](https://github.com/mikmaneggahommie)       | reported the Completions.me rickroll (discussion #3293)                              |
| [@diegosouzapw](https://github.com/diegosouzapw)               | maintainer — #3299, #3302, #3303; co-author on #3292 / #3306 / #3298 / #3304 / #3309 |

---

## [3.8.12] — 2026-06-06

### ✨ New Features

- **chipotle:** add Chipotle Pepper AI — a free provider implemented via the reverse-engineered Amelia protocol, with its executor error body routed through `sanitizeErrorMessage()` (Hard Rule #12) ([#3250](https://github.com/diegosouzapw/OmniRoute/pull/3250) — thanks @oyi77)
- **web-cookie:** add tool-call translation to 8 web-cookie executors via shared `webTools` helpers, so cookie-backed providers can participate in tool/function calling through a single serialize/parse path ([#3259](https://github.com/diegosouzapw/OmniRoute/pull/3259) — thanks @oyi77)
- **free-tiers:** per-model free-token budget catalog + a Monthly Budget dashboard card surfacing each provider's monthly free allowance (joins the honest free-token catalog/API/headline work from #3257) ([#3263](https://github.com/diegosouzapw/OmniRoute/pull/3263), [#3257](https://github.com/diegosouzapw/OmniRoute/pull/3257) — thanks @diegosouzapw)
- **dashboard:** bulk activate / deactivate / retest for selected provider connections — multi-select with batch lifecycle actions on the providers page ([#3271](https://github.com/diegosouzapw/OmniRoute/pull/3271) — thanks @leninejunior)
- **models:** register MiniMax-M3 (frontier coding/agentic model, 1M context, Anthropic-compatible) across 8 provider tiers — `minimax`, `minimax-cn`, `opencode` (free), `opencode-go`, `opencode-zen`, `trae`, `ollama-cloud`, `nvidia` ([#3287](https://github.com/diegosouzapw/OmniRoute/pull/3287), #3110 — thanks @wilsonicdev)

### 🔧 Bug Fixes

- **api/responses:** combo names without a slash (e.g. `paid-premium`, `n8n-text`) are no longer force-rewritten to `codex/<combo>` on `/v1/responses` — `resolveResponsesApiModel` now returns the request unchanged when the model resolves to a combo (regression from the v3.8.9 Codex WS→HTTP fallback) ([#3268](https://github.com/diegosouzapw/OmniRoute/pull/3268), fixes #3227 / #3233 — thanks @wilsonicdev; supersedes the earlier closed #3242)
- **sse:** strip **every** `<omniModel>` tag before forwarding to the provider, not just the first — a global-regex variant prevents stray routing tags from leaking into the upstream prompt ([#3248](https://github.com/diegosouzapw/OmniRoute/pull/3248), fixes #454 — thanks @MikeTuev)
- **grok-web:** add TLS fingerprint impersonation to bypass Cloudflare anti-bot on the Grok web endpoint, with the executor's error bodies routed through `sanitizeErrorMessage()` (Hard Rule #12) ([#3249](https://github.com/diegosouzapw/OmniRoute/pull/3249), fixes #3180 — thanks @wilsonicdev)
- **providers:** improve provider refresh/validation and the model-catalog UI — including the OpenRouter catalog and the proxy UI, plus the NVIDIA NIM `/models`-suffix probe path (real-VPS validated) ([#3261](https://github.com/diegosouzapw/OmniRoute/pull/3261) — thanks @strangersp)
- **embeddings:** block cross-dimension failover inside embedding combos so a fallback target with a different vector dimension can no longer corrupt results ([#3256](https://github.com/diegosouzapw/OmniRoute/pull/3256) — thanks @diegosouzapw)
- **sse/web-tools:** web-cookie providers (e.g. `ds-web`/`deepseek-v4-pro`) that wrap tool calls as `<tool_call name="...">{json}</tool_call>` are now parsed correctly — the real tool name is read from the JSON body instead of the tag attribute, and the call is no longer silently dropped when `arguments` is absent ([#3275](https://github.com/diegosouzapw/OmniRoute/pull/3275), fixes #3260 — thanks @diegosouzapw)
- **sse/groq:** non-reasoning Groq models (`llama-3.3-70b-versatile`, `llama-4-scout`) are now flagged `supportsReasoning: false`, so `reasoning_effort` / `output_config.effort` / `thinking` are stripped before dispatch instead of being forwarded and rejected with HTTP 400 — fixes the Claude Code → Groq regression of #764 ([#3277](https://github.com/diegosouzapw/OmniRoute/pull/3277), fixes #3258 — thanks @diegosouzapw)
- **api/images:** `POST /v1/images/edits` to a custom OpenAI-compatible provider no longer forwards an empty `model`. The multipart body is now built as a `Buffer` with an explicit boundary instead of a global `FormData` — the patched undici `fetch` serialized a native `FormData` as the literal string `[object FormData]` (text/plain), dropping every field including `model` ([#3278](https://github.com/diegosouzapw/OmniRoute/pull/3278), fixes #3273 — thanks @diegosouzapw)
- **db:** detect SQLite driver-unavailable errors to avoid a destructive DB rename + an optional FTS5 migration guard, so a transient driver-load failure no longer triggers the backup-and-recreate path on a healthy database (split from #3073) ([#3274](https://github.com/diegosouzapw/OmniRoute/pull/3274) — thanks @zhiru)
- **quota:** repair the Quota Sharing Engine — `poolUsageWithDimensions()` promoted onto the `QuotaStore` interface (kills the dynamic type-narrowing hack), single-snapshot burn rate via `computeBurnRateFromWindow()` (the dashboard previously always showed 0), zero-weight allocations normalized to equal distribution, Anthropic `anthropic-ratelimit-*` saturation signals, a `quota.exceeded` webhook fired on block, and quota enforcement extended to the embeddings handler ([#3280](https://github.com/diegosouzapw/OmniRoute/pull/3280) — thanks @oyi77)
- **plugins:** `emitHookBlocking` now chains the payload between handlers — each blocking handler receives the body/metadata as mutated by previous handlers, so a later plugin can observe an earlier plugin's changes (previously every handler got the original static payload) ([#3286](https://github.com/diegosouzapw/OmniRoute/pull/3286) — thanks @oyi77)
- **api/webhooks:** webhook URLs may now target a private/internal address (e.g. `192.168.x`, a docker-internal host) when `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS=true` — the webhook guard reuses the same explicit opt-in as private provider URLs (default OFF; protocol and embedded-credential checks stay unconditional). Cloud-metadata / link-local endpoints (`169.254.169.254`, `metadata.google.internal`, `100.100.100.200`, `169.254.0.0/16`) are blocked **unconditionally** even with the opt-in on, and the webhook test endpoint redacts the upstream response body for private targets (no SSRF→IAM-credential pivot, no content exfiltration) ([#3279](https://github.com/diegosouzapw/OmniRoute/pull/3279), [#3281](https://github.com/diegosouzapw/OmniRoute/pull/3281), fixes #3269 — thanks @diegosouzapw)
- **sse/qoder:** a valid Qoder Personal Access Token is no longer wrongly reported as "expired" when the Cosy validation endpoint returns a generic `Internal Server Error` (HTTP 500). A Cosy 500 only marks the PAT invalid when its body carries an explicit auth signal; a generic server fault now falls back to the #1391 valid-bypass rule ([#3283](https://github.com/diegosouzapw/OmniRoute/pull/3283), fixes #3247 — thanks @wilsonicdev, who independently diagnosed the same root cause and filed [#3282](https://github.com/diegosouzapw/OmniRoute/pull/3282); refined here to keep rejecting on an explicit-auth-signal 500)

### 📝 Maintenance

- **ci:** `deploy-vps` recreates the PM2 process via the `omniroute` bin (instead of a bare `pm2 restart` pinned to the removed `app/server-ws.mjs` path) and gates the deploy on `/api/monitoring/health` reporting `"status":"healthy"`, failing the job (with recent PM2 logs) when the box never becomes healthy — supersedes #3262 ([#3270](https://github.com/diegosouzapw/OmniRoute/pull/3270) — thanks @diegosouzapw)
- **security:** harden the Chipotle executor against CodeQL findings — `Math.random()` → `crypto.randomInt()`/`crypto.randomUUID()` (imported from `node:crypto`) for session/server IDs, and a strict `new URL().hostname` check (replacing a substring match) in its test ([#3285](https://github.com/diegosouzapw/OmniRoute/pull/3285) — thanks @oyi77)
- **governance:** raise the coverage gate from 40% to 60% (statements/lines/functions/branches) now that real coverage sits at ~80% — brings the threshold in line with Hard Rule #9 (thanks @diegosouzapw)
- **docs:** consolidate the community links (Discord + Telegram + WhatsApp) at the top of the README and promote the Free-Token Budget section ([#3289](https://github.com/diegosouzapw/OmniRoute/pull/3289) — thanks @diegosouzapw)
- **docs:** richer free-tier budget-card image (28 models + first-month strip) and softer ToS framing (caution rather than warning) ([#3284](https://github.com/diegosouzapw/OmniRoute/pull/3284) — thanks @diegosouzapw)

### 🙌 Contributors

Thanks to everyone whose work landed in v3.8.12:

| Contributor                                      | PRs / Issues                                                                      |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| [@oyi77](https://github.com/oyi77)               | #3250, #3259, #3280, #3285, #3286                                                 |
| [@wilsonicdev](https://github.com/wilsonicdev)   | #3249, #3268, #3282 / #3283 (co-author, #3247 diagnosis), #3287                   |
| [@strangersp](https://github.com/strangersp)     | #3261                                                                             |
| [@MikeTuev](https://github.com/MikeTuev)         | #3248                                                                             |
| [@leninejunior](https://github.com/leninejunior) | #3271                                                                             |
| [@zhiru](https://github.com/zhiru)               | #3274                                                                             |
| [@diegosouzapw](https://github.com/diegosouzapw) | maintainer — #3256, #3263, #3270, #3275, #3277, #3278, #3279, #3281, #3284, #3289 |

---

## [3.8.11] — 2026-06-05

### ✨ New Features

- **theoldllm:** add The Old LLM — a free, Playwright-backed provider with dual-mode operation (cached browser token + direct fetch) bridged through a Vercel relay (#3217 — thanks @oyi77)
- **codex:** add Codex login via OpenAI's browser-driven device authorization flow, exposed as a shareable "Adicionar Externo" public link (`/connect/codex/{token}`) so a third party can complete the OpenAI device login without dashboard access (#3195 — thanks @zhiru)
- **proxy:** per-connection proxy distribution — `proxy_enabled` DB schema + Zod-validated resolution backend, automatic proxy-fallback selection when provider validation hits a network error, and a dashboard UI with per-connection toggles and a tag-filtered "Distribute Proxies" button (#3170, #3171, #3172 — thanks @pizzav-xyz)
- **api:** `/v1/images/generations` and `/v1/images/edits` now resolve a bare combo/alias model name (e.g. `image`) to its single image target, and `/v1/images/edits` forwards multipart edits to custom OpenAI-compatible providers' `{base_url}/images/edits` (also accepting JSON/data-URL edit input) instead of rejecting everything but chatgpt-web (#3214, #3215 — thanks @ngocquynh85)

### 🔧 Bug Fixes

- **api:** combo names sent to `/v1/responses` are no longer force-rewritten to `codex/<name>` — the Codex CLI WS→HTTP fallback rewrite now skips bare names that are combos, so combos (e.g. `n8n-text`, `paid-premium`) route correctly again instead of failing with "No credentials for provider: codex" (regression since v3.8.9) (#3227, #3233 — thanks @Marcus1Pierce, @Dima-Kal)
- **antigravity:** the `agy` `gemini-3.1-pro-high`/`-low` models now alias to the plain `gemini-3.1-pro` upstream id (the `-high`/`-low` suffix is rejected for gemini-3.x), and non-streaming upstream 4xx/5xx errors surface as real error bodies instead of being masked as an empty `chat.completion` envelope (#3229)
- **auth:** honor the effective `REQUIRE_API_KEY` feature flag (DB override > env > default) in client API auth instead of reading `process.env` directly, and align the route-local optional-auth checks (`/v1/embeddings`, `/v1/web/fetch`, `/v1/combos`, playground) with it (#3188 — thanks @xz-dev)
- **oauth:** use `api.anthropic.com` for the Claude OAuth token exchange so self-hosted VPS deployments are no longer blocked by Cloudflare Bot Management on `console.anthropic.com` (#3203, fixes #3192 — thanks @wilsonicdev; the same root cause was independently diagnosed by @ibanunmangun in [#3193](https://github.com/diegosouzapw/OmniRoute/pull/3193), credited here as co-author)
- **oauth:** validate OAuth client IDs against `resolvePublicCred` so adding an Antigravity / Gemini CLI / AGY connection with the built-in public client no longer fails with a Google `redirect_uri_mismatch` (#3206 — thanks @juandisay)
- **auto-combo:** include zero-config OpenCode Free in `auto/*` virtual combos even with no `provider_connections` row, reusing the synthetic `noauth` connection id and routing through the `oc/` prefix (#3189, fixes #3155 — thanks @wilsonicdev)
- **sse:** refine Kimi thinking-block handling and add regression tests for assistant tool-call replay (#3191 — thanks @bypanghu)
- **openrouter:** report the true upstream `context_length` for passthrough models instead of the 128K default — `normalizeDiscoveredModels` now reads `context_length`/`top_provider.context_length` (and `max_completion_tokens` for output) when `inputTokenLimit` is absent (#3202 — thanks @pulyankote)
- **images:** custom image-generation providers now use the provider node's base URL (`providerSpecificData.baseUrl`) and resolve the `prefix/model` form, instead of silently falling back to the Gemini endpoint (#3205 — thanks @ngocquynh85)
- **docker:** the container healthcheck now probes `127.0.0.1`/`localhost`/`::1` and prints the failure to stderr instead of swallowing it, fixing false "unhealthy" status when the server binds to a non-loopback address (#3151 — thanks @naimo84)
- **docker:** copy `scripts/dev/healthcheck.mjs` into the runner-base image — the Next.js standalone output doesn't trace it, so the `HEALTHCHECK CMD ["node", "healthcheck.mjs"]` probe silently exited 1 (#3201 — thanks @wilsonicdev)
- **llama-cpp:** fall back to the provider's local default base URL (`127.0.0.1:8080/v1`) when a local connection has no base URL set, instead of silently routing to OpenAI (residual of #3136) (#3197 — thanks @tjengbudi)
- **provider-models:** allow deleting synced/fetched models (e.g. llama-cpp) via `DELETE /api/provider-models` — the handler now clears the `syncedAvailableModels` namespace, not just `customModels` (#3204, fixes #3199 — thanks @wilsonicdev); and a deleted synced model now stays deleted across an auto-fetch re-import (the DELETE marks it hidden and the re-import skips hidden ids) (#3199 — thanks @tjengbudi)
- **db/electron:** fix `Cannot find module 'better-sqlite3'` crash when importing a database backup in the packaged Electron app (Windows installer) — the `db-backups/import` route now opens its integrity-check DB through the resilient driver factory (better-sqlite3 → node:sqlite → sql.js) instead of a static native import that is stripped from the standalone server bundle; a guard test prevents any API route from reintroducing a direct native import (#3025 — thanks @yeardie)
- **dashboard:** the home provider-topology graph now shows the friendly provider name instead of the internal UUID for custom providers — the label precedence let `getProviderConfig`'s `{ name: providerId }` fallback shadow the pre-resolved name (#3198 — thanks @tjengbudi)
- **providers:** NVIDIA key validation now probes the universally-available `meta/llama-3.1-8b-instruct` instead of the catalog's first model (`z-ai/glm-5.1`), which requires the "Public API Endpoints" account permission and could hang/be DEGRADED — making a valid key fail with a misleading "Upstream Error" (#3116 — thanks @miracuves)
- **providers:** NVIDIA NIM key validation no longer times out (504) — the probe bypasses the global undici `fetch` proxy patch (`open-sse/utils/proxyFetch.ts`) that is incompatible with NVIDIA's endpoint and made the request hang silently (#3226 — thanks @miracuves)
- **dashboard:** corrected two misleading provider credential hints — Grok Web now states both `sso` and `sso-rw` cookies are required (was just `sso`), and the Vertex AI Service Account field shows real instructional placeholder text instead of an untranslated stub across 40 locales (#3180, #3091 — thanks @YoursSweetDom, @Guru01100101)
- **i18n:** normalize dotted `compliance.eventTypes` keys into nested objects at load time so next-intl no longer throws `INVALID_KEY: Namespace keys cannot contain "."` (the same PR also corrects the Codex import-auth provider hint) ([#3185](https://github.com/diegosouzapw/OmniRoute/pull/3185) — thanks @zhiru; the same i18n bug was independently fixed by @androw in [#3167](https://github.com/diegosouzapw/OmniRoute/pull/3167), credited here as co-author)
- **usage:** route the `agy` provider's quota through the existing Antigravity usage implementation (register `agy` in `USAGE_FETCHER_PROVIDERS`, all four `getUsageForProvider` call sites + `parseQuotaData` + `syncAntigravitySubscriptionIfNeeded`) so it no longer falls through to "Usage API not implemented" (#3232, fixes #3230 — thanks @wilsonicdev)
- **cli:** show OpenCode Free in the Hermes Agent model picker even with no active connection — new optional `alwaysIncludeProviders` prop on `ModelSelectModal` (defaults to `[]`, so other callers are unaffected) lets zero-config providers like `opencode` surface in the grouped list (#3240 — thanks @wilsonicdev)
- **gemini:** refresh the Gemini (AI Studio) static fallback so the provider tab exposes current 3.x / 2.5 models on first run, preserving the `gemini-2.0-flash` default ordering; the full catalog still comes from API sync once a key is added (#3241, fixes #3231 — thanks @wilsonicdev)

### 📝 Maintenance

- **build:** finish the build-output-isolation cleanup — `assembleStandalone.mjs` now derives both its async (`syncStandalone*`) and sync copy paths from a single `NATIVE_ASSET_ENTRIES`/`EXTRA_MODULE_ENTRIES` source of truth (previously two hand-maintained lists that could silently drift), guarded by a new parity test; and the `Dockerfile` drops 5 redundant per-module `COPY` overrides (`@swc/helpers`, `pino-abstract-transport`, `pino-pretty`, `split2`, `migrations`) now that `assembleStandalone` bundles them into the standalone regardless of NFT/Turbopack tracing (validated with a real Turbopack `docker build` + boot → `/api/monitoring/health` 200; `better-sqlite3` stays explicit since only its native `build/` is synced) (#3187 — thanks @diegosouzapw)
- **combo:** add a regression guard asserting the same-provider cascade is short-circuited by the connection-cooldown layer (#3200 — thanks @diegosouzapw)
- **repo:** housekeeping — ignore the generated `coverage/` output dir and prune deprecated `.agents/skills/*` SKILL definitions superseded by the current workflow skills (thanks @diegosouzapw)

### 🙌 Contributors

Thanks to everyone whose work landed in v3.8.11:

| Contributor                                        | PRs / Issues                                    |
| -------------------------------------------------- | ----------------------------------------------- |
| [@wilsonicdev](https://github.com/wilsonicdev)     | #3189, #3201, #3203, #3204, #3232, #3240, #3241 |
| [@pizzav-xyz](https://github.com/pizzav-xyz)       | #3170, #3171, #3172                             |
| [@zhiru](https://github.com/zhiru)                 | #3185, #3195                                    |
| [@oyi77](https://github.com/oyi77)                 | #3217                                           |
| [@miracuves](https://github.com/miracuves)         | #3116, #3226                                    |
| [@ngocquynh85](https://github.com/ngocquynh85)     | #3205, #3214, #3215                             |
| [@xz-dev](https://github.com/xz-dev)               | #3188                                           |
| [@bypanghu](https://github.com/bypanghu)           | #3191                                           |
| [@juandisay](https://github.com/juandisay)         | #3206                                           |
| [@tjengbudi](https://github.com/tjengbudi)         | #3197, #3198, #3199                             |
| [@naimo84](https://github.com/naimo84)             | #3151                                           |
| [@yeardie](https://github.com/yeardie)             | #3025                                           |
| [@pulyankote](https://github.com/pulyankote)       | #3202                                           |
| [@YoursSweetDom](https://github.com/YoursSweetDom) | #3180                                           |
| [@Guru01100101](https://github.com/Guru01100101)   | #3091                                           |
| [@androw](https://github.com/androw)               | #3167 (co-author)                               |
| [@ibanunmangun](https://github.com/ibanunmangun)   | #3193 (co-author)                               |
| [@diegosouzapw](https://github.com/diegosouzapw)   | maintainer — #3187, #3200, issue-fix batches    |

---

## [3.8.10] — 2026-06-04

OAuth resilience & observability release: spaced/sequential quota sync for OAuth accounts, a per-provider proactive-refresh skip list to keep short-TTL providers (Kimi) alive without re-exposing the Codex Auth0 cascade, token-expiry visibility on the provider cards, a new provider-stats dashboard, plus a wide batch of provider fixes (DeepSeek-web tool calls, Antigravity, Qoder, MiniMax, GitHub Copilot, Fireworks, llama.cpp, t3.chat-web, Kiro, Kilocode) and Podman deployment support.

### ✨ New Features

- **dashboard:** new Provider Stats page + `/api/provider-stats` endpoint — per-provider and per-model aggregates from `call_logs` plus live combo/telemetry/tool-latency overlays. (#3175 — thanks @pizzav-xyz / @diegosouzapw)
- **metrics:** cross-request TTFT and gap-after-tool-call latency tracking, aggregated per provider. (#3173 — thanks @pizzav-xyz / @diegosouzapw)
- **quota:** show the OAuth token expiry on provider cards (small, blue, informative — "Token expires in …" / "Token expired"). (#3178 — thanks @diegosouzapw)
- **responses:** strip `previous_response_id` for stateless Responses upstreams, with an auto/strip/preserve setting + UI so stateless clients (e.g. VS Code Custom Endpoint) keep context. (#3143 — thanks @JxnLexn)
- **deploy:** Podman/rootless deployment support (contrib units + `CONTAINER_HOST` hint) and larger upload body-size limits for `/v1/files`. (#3128 — thanks @hartmark)

### 🔧 Bug Fixes

- **usage:** sequential + spaced OAuth quota sync (`PROVIDER_LIMITS_SYNC_SPACING_MS`) so a host no longer bursts simultaneous usage/refresh requests; reactive forced re-mint after a 401 on the per-card refresh (recovers imported accounts); a genuine 401 now surfaces a re-authenticate hint. (#3156 — thanks @diegosouzapw)
- **healthcheck:** per-provider proactive-refresh skip list (`OMNIROUTE_HEALTHCHECK_SKIP_PROVIDERS`) — keep rotating-cascade providers (Codex/OpenAI) reactive-only while short-TTL providers (Kimi-coding) keep refreshing proactively. (#3159 — thanks @diegosouzapw)
- **providers:** on `?refresh=true` with no remote models, don't resurface the just-cleared synced cache into the local-catalog fallback. (#3181 — thanks @diegosouzapw)
- **providers:** use synced models as the authoritative local catalog across all providers (even on connections that didn't run the sync). (#3148 — thanks @herjarsa)
- **web-tools:** parse bare-JSON tool calls for DeepSeek-web with fuzzy tool-name matching scoped to the requested tools. (#3157 — thanks @wilsonicdev)
- **responses:** normalize `image_url` parts across every Responses input path (message content, replayed output items, `function_call_output`) to avoid upstream 400s. (#3150 — thanks @wilsonicdev)
- **antigravity:** dynamic upstream model resolution via the MITM alias table (server-only executor), with a guard against corrupted alias values. (#3144 — thanks @herjarsa)
- **qoder:** bifurcate validation by token type — PAT (`pt-`) → Cosy, regular API key → dashscope — matching the executor's routing. (#3149 — thanks @herjarsa)
- **api-manager:** preserve API key expiration in local time (the `datetime-local` input no longer silently shifts to UTC) + a clear button. (#3146 — thanks @xz-dev)
- **opencode-plugin:** map `caps.thinking → ModelV2.capabilities.interleaved` for single models and combos. (#3138 — thanks @mrmm)
- **kiro:** optional `targetProvider` on the social-OAuth exchange so Kiro-based providers can reuse the social login flow. (#3176 — thanks @pizzav-xyz)
- **misc:** broaden the DeepSeek reasoning-replay regex (`-free` / `zen/deepseek-v4`), export `ProviderProfile`, and guard a non-string directory entry in the binary manager. (#3177 — thanks @pizzav-xyz)
- **providerRegistry:** point kilocode at the OpenAI format + default executor (matching its sibling `kilo-gateway`). (#3166 — thanks @androw)
- **fireworks:** preserve fully-qualified router/model IDs so Fire Pass router IDs (`accounts/fireworks/routers/...`) are no longer double-prefixed into an upstream 404. (#3133 — thanks @KooshaPari)
- **llama-cpp:** route requests to the configured local baseUrl instead of OpenAI's API (which returned an OpenAI-worded 401). (#3136 — thanks @tjengbudi)
- **t3-chat-web:** parse cookies + convexSessionId from the single stored credential so t3.chat web connections work (the executor previously read fields the credential pipeline never produced). (#3007 — thanks @minhtran162)
- **minimax:** stop capping MiniMax-M3 / MiniMax-M2.7 `max_tokens` at the 8192 default — add the M3 model spec (512K output) and make model-spec lookups case-insensitive. (#3141 — thanks @totaltube)
- **github-copilot:** discover the model catalog live from `api.githubcopilot.com/models` so Import Models refreshes and only entitled models are listed (with fallback to the static catalog). (#3120, #3121 — thanks @gabrielmoreira)
- **combo:** invalidate the nested-combo cache on combo edits so removed targets/models stop being served within the 10s window; log the resolved DATA_DIR at startup to diagnose multi-replica volume mismatches. (#3147 — thanks @ViFigueiredo)
- **providers:** resolve web-provider alias collisions. (thanks @diegosouzapw)

### 📝 Maintenance

- **deps:** bump hono from 4.12.18 to 4.12.23. (#3179 — thanks @dependabot)
- **ci(electron):** make the macOS-arm64 smoke step best-effort (headless GPU crash). (#3137 — thanks @diegosouzapw)
- **chore(release):** open the v3.8.10 development cycle. (thanks @diegosouzapw)

---

## [3.8.9] — 2026-06-03

### ✨ New Features

- **Obsidian context source — 24 MCP tools** (`read:obsidian` / `write:obsidian`) — search, read, write, and bidirectional sync against a local Obsidian vault via the [Local REST API community plugin](https://github.com/obsidianmd/obsidian-local-rest-api). Dashboard "Context Sources" tab, settings API, DB config. (#3077 — thanks @branben)
- **cursor:** vision (`image_url`) input for the Cursor provider — OpenAI image parts are encoded as `SelectedContext.selected_images[]` in the `agent.v1` protobuf, plus a tool-commit directive (lifts composer-2.5's tool-call rate), `tool_choice` none/required/specific handling, and `response_format`/`max_tokens`/`stop` output constraints surfaced to the agent. Hardened with SSRF + DNS-rebinding guards, a 1 MiB pre-decode cap, and a protobuf length-overrun check. (#3104 — thanks @payne0420)
- **deepseek-web:** opt-in persistent session + rolling-window conversation memory (`persistSession`, `historyWindow` per-connection settings) and bidirectional tool-call translation — tool schemas are injected as a system prompt and `<tool>{…}</tool>` blocks in the reply are parsed back into OpenAI `tool_calls` (replacing the old hard `400`). ([#2942](https://github.com/diegosouzapw/OmniRoute/issues/2942), [#2820](https://github.com/diegosouzapw/OmniRoute/issues/2820))
- **i18n:** Turkish locale-aware search & sorting — a `turkishText` helper (`normalizeForSearch`, `matchesSearch`, `compareTr`) folds the dotted/dotless İ/ı correctly and uses `Intl.Collator("tr")`, wired across dashboard search/sort call-sites with an ESLint guard (warn) against raw `toLowerCase().includes()`. (#3115 — thanks @osrt91)
- **kiro:** add Claude Opus 4.8 to the Kiro (AWS CodeWhisperer) model catalog — Kiro previously topped out at Opus 4.7 even though Opus 4.8 was already defined and served by the `claude` provider. (#3131 — thanks @artickc)

### 🔧 Bug Fixes

- **sse:** stop 502'ing streaming requests when a "reasoning" openai-compatible upstream ignores `stream:true` and returns a complete `application/json` body — the streaming readiness check only recognized SSE `data:` frames, so such a JSON body (even with valid `content`/`reasoning_content`) produced a spurious `STREAM_EARLY_EOF`. OmniRoute now detects a non-SSE JSON upstream body on the streaming path and synthesizes an equivalent OpenAI SSE stream (`synthesizeOpenAiSseFromJson`), preserving content + reasoning_content. ([#3089](https://github.com/diegosouzapw/OmniRoute/issues/3089))
- **cache:** serve semantic-cache hits as SSE for streaming clients — a cache hit returned `application/json` regardless of the `stream` flag, so OpenAI-compatible streaming clients lost `reasoning_content` (and got a non-stream body) on cached responses. Stream requests now SSE-wrap the cached completion. ([#2952](https://github.com/diegosouzapw/OmniRoute/issues/2952))
- **i18n:** fill the missing Chinese (zh-CN) and Russian (ru) UI translations — both locales were missing 9 entire sections (`quotaPlans`, `activity`, `agentBridge`, `trafficInspector`, `cliCommon`, `cliCode`, `cliAgents`, `acpAgents`, `agentSkills`, ~823 keys each) added after the last translation sweep, so those buttons/labels rendered in English. Both catalogs are now at full key parity with `en.json` (8025 keys). ([#3026](https://github.com/diegosouzapw/OmniRoute/issues/3026), [#3067](https://github.com/diegosouzapw/OmniRoute/issues/3067))
- **dashboard:** fix "Ambiguous model" error in the provider Playground for vendor-namespaced models — the Playground only prefixed models without a `/`, so ids like `moonshotai/kimi-k2.6` or `nvidia/zyphra/zamba2-7b-instruct` (NVIDIA NIM) were sent bare and rejected when the same id exists under multiple providers. The Playground now always qualifies the selected model with its `providerId/` prefix (without double-prefixing). ([#3050](https://github.com/diegosouzapw/OmniRoute/issues/3050))
- **db:** stop accepting duplicate API keys for the same provider — `createProviderConnection` now dedups by the decrypted key value (not just by name), so re-adding the same key under a different/blank name updates the existing connection instead of inserting a second row. Whitespace-only differences also dedup. ([#3023](https://github.com/diegosouzapw/OmniRoute/issues/3023))
- **dashboard:** "Import from /models" now works for no-auth providers (e.g. OpenCode Free) — the button used to silently no-op because no-auth providers have no connection row, so `handleImportModels` returned early and the models route 404'd. The route now serves the provider's model catalog when called with a no-auth provider id, and the dashboard falls back to the provider id when there is no connection. ([#3047](https://github.com/diegosouzapw/OmniRoute/issues/3047))
- **providers:** forward Grok's paired `sso-rw` cookie for grok-web — both the executor and the connection validator now send `sso=…; sso-rw=…` (via the new `buildGrokCookieHeader` helper) when the pasted blob carries `sso-rw`, fixing the `403` _"Request rejected by anti-bot rules"_ that Grok returns for `sso` alone. The add-account hint now asks for the full cookie line. ([#3063](https://github.com/diegosouzapw/OmniRoute/issues/3063))
- **providers:** fix claude-web persistent 403 — `execute()` was calling the synchronous `normalizeClaudeSessionCookie()` which never injects `cf_clearance`; changed to async `normalizeClaudeSessionCookieWithAutoRefresh()` with `allowAutoSolve:true`. Also removes dead executor `claude-web-auto-refresh.ts` and correctly reclassifies `duckduckgo-web` and `veoaifree-web` as `NOAUTH_PROVIDERS`. (#3090 — thanks @oyi77)
- **autoCombo:** rotate across all provider connections, never waste capacity — `buildAutoCandidates` now expands each provider into one candidate per active connection (e.g. 43 Cerebras keys → 43 candidates). Adds `ScoreTierRotator` with per-combo round-robin state, combo-name-aware tier preferences (smart/fast/cheap/coding), `connectionDensity` factor (weight 0.05), and budget-cap degradation using the rotator. (#3078 — thanks @oyi77)
- **providers:** fix SiliconFlow model sync from configured endpoint — routes model discovery through `providerSpecificData.baseUrl` so CN (`api.siliconflow.cn`) vs Global endpoint selection is respected, and prevents `/sync-models` from treating `source: "local_catalog"` fallback responses as successful remote syncs. (#3094 — thanks @xz-dev)
- **resilience:** a per-model subscription/permission `403` from a passthrough provider (e.g. Ollama Cloud `deepseek-v4-pro` → _"this model requires a subscription"_) now locks out **only that model** instead of cooling down the whole connection — the free models on the same key keep serving, and repeated paid-model 403s no longer escalate a connection-wide backoff. Generalizes the grok-web 403 precedent to all `hasPerModelQuota` providers; terminal/credential 403s (banned/deactivated key) still deactivate the connection. ([#3027](https://github.com/diegosouzapw/OmniRoute/issues/3027))
- **cache:** preserve client-side `cache_control` breakpoints for Xiaomi MiMo — added `xiaomi-mimo` to the prompt-caching provider allowlist so Claude Code (via cc-switch) cache hints are no longer stripped by the OpenAI-format translator, restoring cache hits. ([#3088](https://github.com/diegosouzapw/OmniRoute/issues/3088))
- **tools:** keep opaque object schemas open — empty object schemas (and the `web_search` passthrough shim) now get `additionalProperties: true` so GPT-5.5/Codex stop pruning untyped nested payloads (e.g. `SPLOX_EXECUTE_TOOL.args`). (#3097 — thanks @nmime)
- **codex:** preserve native Responses passthrough tools and history — `tool_search` and `custom` tools (e.g. `apply_patch`) survive `normalizeCodexTools`, and `phase:"commentary"` history items are kept, only on the native passthrough path (`_nativeCodexPassthrough`). (#3107 — thanks @yinaoxiong)
- **responses:** resolve bare ChatGPT model ids (e.g. `gpt-5.5`) to `codex/…` on the `/v1/responses` HTTP fallback path, fixing the Codex CLI WS→HTTP fallback that was routing to a credential-less provider (#3113).
- **sse:** bound the Antigravity 429 short-retry loop (per-URL `MAX_AUTO_RETRIES` guard — no more infinite loop on a persistent 429) and lock quota-exhausted accounts for the full "Resets in XhYmZs" window via model lockout. (#3122 — thanks @ahmet-cetinkaya)
- **image-gen:** add an AbortController timeout to `fetchImageEndpoint` so a stuck image provider surfaces a `504` instead of hanging until the server timeout. (#3105 — thanks @mgarmash)
- **logs (perf):** fix browser freeze and network saturation on `/dashboard/logs` — smaller page size, 15s polling, pause polling on a hidden tab / past the first page, and memoized derived lists. (#3109 — thanks @0xtbug)
- **cli:** handle Windows `.exe` healthchecks with spaces in the path — direct executables skip the shell (so `cmd.exe` doesn't split `C:\…\Name With Spaces\…\claude.exe`) while `.cmd`/`.bat` wrappers still run through it. (#3111 — thanks @EmpRider)
- **cli:** don't write `STORAGE_ENCRYPTION_KEY` to `.env` on informational commands — `omniroute --version`/`--help` no longer generate a key or create `~/.omniroute/.env`; provisioning is scoped to commands that actually touch encrypted storage (#3129).
- **tests:** remove a stale lowercase `db-apikeys-crud.test.ts` duplicate that collided with the canonical `db-apiKeys-crud.test.ts` on case-insensitive filesystems (no coverage lost). (#3125 — thanks @juandisay)
- **kimi:** add a dedicated `KimiExecutor` so Kimi thinking-mode responses no longer drop `reasoning_content` — the reasoning stream is now surfaced instead of being lost. (#3132 — thanks @bypanghu)
- **handler:** provide a `connectionId` fallback when it is undefined, fixing kilo (kilocode) calls that were silently not being written to `call_logs`. (#3130 — thanks @androw)

### 🔧 Build

- **build-output-isolation:** unified standalone assembly into one shared `assembleStandalone` module; isolated build output into `.build/` (intermediates, gitignored) and `dist/` (shippable bundle, gitignored), replacing the old repo-root `app/` and `.next/` directories; dropped the duplicate `next build` that prepublish previously ran; added `build:release` script for a clean rebuild with a `dist/BUILD_SHA` HEAD sentinel that guards against deploying stale bundles. **Operators using custom `app/` paths:** the published bundle directory on the VPS image (`/usr/lib/node_modules/omniroute/app/`) is unchanged — only the in-repo build output path moved. Update any local scripts that reference the repo-local `app/` build output to `dist/` instead.
- **build:** re-apply the build-reorg follow-ups that landed after the main refactor merged — the `serve` CLI now falls back from `dist/` to the legacy `app/` location for upgrade safety, and the deploy skills `pm2 stop` before `rsync --delete` to avoid a transient `Cannot find module ./chunks/…` race (#3127).
- **build:** fix the standalone static-asset path so the dashboard renders after the build-output reorg — `assembleStandalone` was copying `static/` into `<bundle>/.next/static`, but the standalone server (built with `distDir=.build/next`) serves `/_next/static` from `<bundle>/.build/next/static`, so every JS/CSS chunk 404'd and the login UI rendered as a blank page. The static (and `required-server-files.json` / Turbopack chunk) destinations are now derived from the configured `distDir` instead of a hard-coded `.next`.

### 📦 Dependencies

- **electron:** bump to 42.3.2 (crash fix desktopCapturer, Chromium 148.0.7778.218, ThinLTO perf) (#3083)
- **electron-updater:** bump to 6.8.8 (security: harden auto-update flow against path traversal and env var intercepts) (#3084)
- **electron-builder:** bump to 26.14.0 (security hardening, pure-JS blockmap/icon migration) (#3082)
- **dev deps:** bump eslint-config-next 16.2.7, lint-staged 17.0.7, typescript-eslint 8.60.1, vitest 4.1.8 (#3086)
- **prod deps:** bump next 16.2.7, react/react-dom 19.2.7, tsx 4.22.4, ws 8.21.0, parse5 8.0.1, commander 15.0.0, and 15 other packages (#3085)

### 🙌 Contributors

Huge thanks to everyone whose work shipped in v3.8.9:

@branben (Obsidian context source), @oyi77 (claude-web 403 fix, autoCombo connection rotation), @xz-dev (SiliconFlow model sync), @nmime (open opaque tool schemas), @payne0420 (Cursor vision input), @mgarmash (image-gen fetch timeout), @yinaoxiong (Codex native passthrough tools/history), @0xtbug (logs page perf), @EmpRider (Windows CLI healthcheck paths), @ahmet-cetinkaya (Antigravity 429 retry bound + quota lockout), @juandisay (duplicate test cleanup), @osrt91 (Turkish locale-aware search & sorting), @artickc (Kiro Opus 4.8 catalog), @bypanghu (Kimi thinking-mode reasoning_content fix), and @androw (connectionId fallback + kilo call logging).

And thank you to the OmniRoute community for the bug reports, reproductions, and testing that drove these fixes. 🎉

---

## [3.8.8] — 2026-06-03

### Added

- **Plugins framework** (`src/lib/plugins/`, `/api/plugins/*`, `/dashboard/plugins`) — hooks + registry unification, plugin SDK (`definePlugin`), worker-thread sandbox, per-plugin hook rate limiting, SHA-256 integrity verification, semver-gated upgrade, and execution analytics. Plugin routes are loopback-only (`isLocalOnlyPath`) and `child_process` exec is opt-in via `OMNIROUTE_PLUGINS_ALLOW_EXEC`. (#2913 / #3041 — thanks @oyi77)
- **Plugin system: response-hook wiring + startup load + example plugin** — wires the plugin `onResponse` hook into the chat success path, loads active plugins on server startup so they survive restarts (`pluginManager.loadAll()` in `server-init`), and ships a `welcome-banner` example plugin (`examples/plugins/`) plus a comprehensive plugin test suite. (#3045 — thanks @oyi77)
- **API key option: disable non-published models** — a per-key flag restricting the key to discovered, public models (combos / `auto/*` / `qtSd/*` routing still allowed). (#3017 — thanks @androw)
- **SessionPool — modular & provider-agnostic** (`open-sse/services/sessionPool/`) — pooled
  cookie/session manager with round-robin fingerprint rotation (distinct fingerprint per pooled
  session), per-session cooldown/backoff, and a provider-agnostic `webExecutorWrapper`. Adds pool
  support for DuckDuckGo Web and LLM7 providers and an MCP `poolTools` toolset. (#2954 / #2978 — thanks @oyi77)
- **AgentBridge** (`/dashboard/tools/agent-bridge`) — MITM proxy consolidating 9 IDE agents
  (Antigravity, Kiro, GitHub Copilot, OpenAI Codex, Cursor IDE, Zed Industries, Claude Code,
  Open Code, Trae stub) with server card, per-agent setup wizard, model mapping table,
  bypass list, upstream CA cert support, and redirect from legacy `/dashboard/system/mitm-proxy`.
  See `docs/frameworks/AGENTBRIDGE.md`. (#2858 — thanks @diegosouzapw)
- **Traffic Inspector** (`/dashboard/tools/traffic-inspector`) — LLM-aware HTTPS debugger with
  4 capture modes (AgentBridge hook, Custom Hosts DNS, HTTP_PROXY :8080, System-wide proxy),
  DevTools split UI, 7 detail tabs (Conversation, Headers, Request, Response, Timing, LLM Details,
  Stats), resizable panels, session recording (.har/.jsonl export), SSE stream merger,
  conversation normalizer (multi-provider), system-prompt fingerprint colorization, and annotations.
  See `docs/frameworks/TRAFFIC_INSPECTOR.md`.
- **MITM handler base + 9 agent handlers** (`src/mitm/handlers/`) — `MitmHandlerBase` abstract
  class with `hookBufferStart`/`hookBufferUpdate` for Traffic Inspector integration; concrete
  handlers for all 9 agents.
- **MITM targets registry** (`src/mitm/targets/`) — declarative `MitmTarget` shape per agent;
  emits `DATA_DIR/mitm/targets.json` for dynamic `server.cjs` resolution.
- **Traffic Inspector core** (`src/mitm/inspector/`) — `TrafficBuffer` in-memory ring,
  `kindDetector`, `sseMerger` (MIT port from chouzz/llm-interceptor), `conversationNormalizer`
  (MIT port), `contextKey` fingerprinting, `httpProxyServer`, `systemProxyConfig`.
- **AgentBridge passthrough + bypass** (`src/mitm/passthrough.ts`) — TCP tunnel for
  non-mapped hosts; bypass list with default sensitive-host patterns + user-defined patterns.
- **Upstream CA cert** (`src/mitm/upstreamTrust.ts`) — `AGENTBRIDGE_UPSTREAM_CA_CERT` for
  corporate TLS environments.
- **Secret masking** (`src/mitm/maskSecrets.ts`) — sk-/Bearer/generic token masking before
  any log or Traffic Inspector broadcast.
- **DB migrations 073–075** — `agent_bridge_state`, `agent_bridge_mappings`,
  `agent_bridge_bypass`, `inspector_custom_hosts`, `inspector_sessions`,
  `inspector_session_requests`.
- **~28 API routes** under `/api/tools/agent-bridge/` (12 routes) and
  `/api/tools/traffic-inspector/` (16+ routes). All LOCAL_ONLY + SPAWN_CAPABLE.
- **i18n** PT-BR + EN for all new keys in `agentBridge.*` and `trafficInspector.*` namespaces;
  all other locales fall back to EN automatically.
- **E2E smoke tests** — `tests/e2e/agent-bridge.spec.ts`,
  `tests/e2e/traffic-inspector.spec.ts`, `tests/e2e/agent-bridge-traffic-cross.spec.ts`
  (skip-gated on CI by `RUN_AGENT_BRIDGE_E2E` / `RUN_TRAFFIC_INSPECTOR_E2E` / `RUN_CROSS_E2E`).
- **Documentation** — `docs/frameworks/AGENTBRIDGE.md` and `docs/frameworks/TRAFFIC_INSPECTOR.md`;
  `docs/architecture/REPOSITORY_MAP.md` updated; `docs/reference/openapi.yaml` updated with
  ~28 new routes and 20+ new schemas.
- **i18n:** translate Ukrainian (uk-UA) menu and UI strings, plus complete uk-UA UI coverage (#2981 / #2988 — thanks @Lion-killer)
- **providers:** add SiliconFlow endpoint selector (#2975 — thanks @xz-dev)
- **oauth:** add Trae SOLO provider (work/code modes) (#2964 — thanks @S0yora)
- **providers:** add Qwen Web (chat.qwen.ai) web-cookie provider (#2947 — thanks @oyi77)
- **Quota Share Engine — multi-provider quota pools** — Monitoring/Costs reorg plus a Quota Share Engine: group selector, grouped pool cards, exclusive-quota API keys (`allowedQuotas`), `quotaShared-*` routing models via combos, a 3-step pool wizard (legacy Plans page retired), endpoint + key preview, and full pool editing. Adds quota-pool DB migrations. (#2859 / #3022 / #3032 — thanks @diegosouzapw)
- **Dashboard page redesigns (Nav Restructure)** — agent-skills + omni-skills with a dynamic 42-skill catalog and MCP/A2A discovery (#2827); CLI Code's + CLI Agents + ACP Agents pages (#2839); translator friendly redesign, 5 tabs → 2 (#2847); functional `/batch` + `/batch/files` redesign (#2849); Playground Studio + Search Tools Studio (#2869); memory engine redesign — sqlite-vec + hybrid RRF + Studio UI (#2873). (thanks @diegosouzapw)
- **notion:** add Notion as an MCP context source — 6 tools (`notion_search`, `notion_list_databases`, `notion_get_database`, `notion_query_database`, `notion_read`, `notion_append_blocks`) scoped under `read:notion` / `write:notion`, with dashboard "Context Sources" tab, settings API, and token persistence in `key_value` table (#2959 — thanks @branben)
- **Per-API-key stream default mode** — a per-key setting that forces JSON or SSE as the default response shape (migration `077_api_key_stream_default_mode`), so integrations that expect non-streaming JSON work without client changes. (thanks @JxnLexn)
- **Codex Responses-over-WebSocket** — opt-out flag `OMNIROUTE_CODEX_WS_ENABLED` (default ON) upgrading Codex Responses traffic to a WebSocket bridge with a clean handshake and bridge-secret auth; the Quota Share endpoints card now surfaces the Responses + codex-WS endpoints. (thanks @diegosouzapw)
- **Xiaomi MiMo usage tracking** — self-reported usage accounting for Xiaomi MiMo plus a monthly cap preset; DeepSeek USD preset and a Claude plan preset (percent 5h + weekly) seeded into the plan registry. (thanks @diegosouzapw)
- **API Manager: Normal vs Quota key sections** — the API keys screen now splits keys into Normal and Quota sections in a compact 2-table layout, and the Quota Share screen gains a beta banner, live per-account upstream quota, and a real-time Codex quota view backed by the cascade-safe serialized refresh. (thanks @diegosouzapw)

### Changed

- Sidebar Tools group: added `agent-bridge` and `traffic-inspector` items after `cloud-agents`.
- `/api/tools/agent-bridge/` and `/api/tools/traffic-inspector/` added to `LOCAL_ONLY_API_PREFIXES`
  and `SPAWN_CAPABLE_PREFIXES` in `src/server/authz/routeGuard.ts`.
- `.env.example`: documented 9 new env vars (`AGENTBRIDGE_UPSTREAM_CA_CERT`,
  `INSPECTOR_BUFFER_SIZE`, `INSPECTOR_HTTP_PROXY_PORT`, `INSPECTOR_HTTP_PROXY_AUTOSTART`,
  `INSPECTOR_TLS_INTERCEPT`, `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`, `INSPECTOR_MAX_BODY_KB`,
  `INSPECTOR_MASK_SECRETS`, `INSPECTOR_LLM_HOSTS_EXTRA`, `INSPECTOR_INTERNAL_INGEST_TOKEN`).

### Fixed

- **memory:** the `recent` retrieval strategy no longer drops recent memories whose
  text doesn't overlap the current prompt. It was internally mapped to the `exact`
  path, which relevance-filtered by the forwarded prompt (`score > 0`), so
  recency-based injection silently returned nothing for unrelated prompts. The
  prompt is no longer forwarded for `recent` (semantic/hybrid still use it for
  vector search).
- **combo:** custom-provider credential lookup now expands `provider_nodes` prefixes
  (e.g. `78code/gpt-5.4`) to the generated internal connection ids during account
  selection, so combos targeting compatible/custom providers resolve their live
  credentials instead of failing to find a connection. (#3058)
- **build:** Docker image build (`docker compose --profile cli build`, which runs
  `next build` with Turbopack) no longer errors. Two Turbopack-only failures were
  fixed: `sqlite-vec` is now externalized so Turbopack stops trying to bundle its
  native `vec0.so` ("Unknown module type"), and `manager.stub.ts` now exports
  `getAllAgentsStatus` (statically imported by `/api/tools/agent-bridge/state` — the
  missing export aborted the build). The webpack-based VM build was unaffected, which
  is why the deploy validated while the Docker build errored. The sqlite-vec native
  binary is also now bundled into the standalone output, so vector/semantic memory keeps
  working in the container instead of silently degrading to FTS5 keyword search.
  (#3066 — thanks @freefrank)
- **codex/providers:** `POST /api/providers/[id]/refresh` (the manual/auto "refresh
  token" endpoint) no longer rotates rotating-refresh providers (Codex/OpenAI share
  one Auth0 `client_id`). This was the last unguarded proactive-refresh entry point:
  when the dashboard auto-refreshed every expiring connection on a page load (or an
  old cached frontend bulk-called it), each Codex account's single-use refresh_token
  was rotated, and Auth0 revoked the whole token family (`openai/codex#9648`) — every
  account but the last died with `[403] <!DOCTYPE`. The endpoint now skips proactive
  rotation for rotating providers and defers to the reactive, serialized 401 path
  (same guard as `refreshAndUpdateCredentials` and the connection-test route).
- **codex/quota:** opening the Quota / Providers dashboard no longer disconnects
  Codex multi-account setups. The quota-sync path
  (`refreshAndUpdateCredentials`) proactively refreshed every connection — for
  rotating-refresh providers (Codex/OpenAI share one Auth0 `client_id`) it
  refreshed siblings concurrently, so Auth0 revoked the whole token family
  (`openai/codex#9648`) and every account but the last died with
  `[403] <!DOCTYPE html>`. The quota path now skips proactive refresh for
  rotating providers (`rotationGroupFor`) and reuses the current access*token,
  deferring genuine expiry to the reactive, serialized 401 path. Defense in
  depth: `serializeRefresh` now leaves a settle gap between two \_queued* sibling
  refreshes (default 2000 ms, tunable via `CODEX_REFRESH_SPACING_MS`, `"0"` to
  opt out) while releasing a lone refresh immediately, so the reactive path adds
  no latency.
- **payload-rules:** saved payload rules now survive a server restart. When no
  in-memory override is set (fresh process before the boot hook ran, or a
  separate module instance in the standalone build), `getPayloadRulesConfig`
  now reads the DB-persisted rules (the source of truth) before the file config,
  instead of silently returning the empty file default. (#2986)
- **models/custom:** custom models can now carry a per-model `targetFormat`
  override (e.g. an opencode-go custom model that must use the Anthropic Messages
  shape). Previously custom models always routed as OpenAI-compatible because
  `targetFormat` was neither persisted nor consulted at routing time. Threaded
  through `addCustomModel`/`replaceCustomModels`/`updateCustomModel`, the API
  schema/route, `getModelInfo`, and chatCore's targetFormat resolution. (#2905)
- **providers/pollinations:** route to `gen.pollinations.ai/v1` instead of the
  retired `text.pollinations.ai` host, which now returns `404 "legacy API"` for
  all models. The gen gateway is the current OpenAI-compatible endpoint. (#2987)
- **executors/codex:** drop the CLI-injected `image_generation` hosted tool for
  free-plan Codex accounts (`workspacePlanType === "free"`), which can't run it
  server-side and would otherwise get an upstream 400. Paid plans keep it.
  (mirrors CLIProxyAPI's free-plan guard; spun off from the #2980 analysis)
- **dashboard:** custom providers (`openai-compatible-*` / `anthropic-compatible-*`)
  now show their user-given node name instead of the raw UUID id across the
  active-requests panel, proxy logger, and home-page provider topology. The
  display-label resolver was extracted into a shared util reused by all surfaces
  (previously only the request-log viewer resolved it). (#2968)
- **docker:** the standalone launcher (Docker `CMD`) now honors
  `OMNIROUTE_MEMORY_MB` (default 512, clamped [64, 16384]) and overrides the
  image `NODE_OPTIONS` fallback, fixing random OOM crashes under load / with
  large SQLite DBs. Previously only `omniroute serve` honored the knob. (#2939)
- **docker:** add a `web` compose profile (`omniroute-web`, target `runner-web`,
  image `omniroute:web`) so web-cookie providers (gemini-web, claude-web,
  claude-turnstile) work out of the box — the default `base` image ships without
  Chromium/Playwright, which made those providers fail with
  "Executable doesn't exist at .../ms-playwright/chromium...". (#2832)
- **routing/codex:** fix two gpt-5.5 Codex defects (#2877). (A) For a Codex-only
  account, a bare `gpt-5.5` Responses request was rerouted to codex with the
  model hardcoded to `gpt-5.5-medium` (`chatHelpers.ts`); the executor read that
  `-medium` suffix as an explicit `modelEffort` that (per #2331) overrode a
  client `reasoning.effort=xhigh`, silently demoting it — now it keeps the bare
  `gpt-5.5` id so the client effort wins. (B) `gpt-5.5-xhigh`/`-high`/`-low`
  misrouted to `openai` (→ "No credentials" for codex-only users); the suffixed
  variants are now in `CODEX_PREFERRED_UNPREFIXED_MODELS` so they infer codex.
- **sse/chatCore:** remove a duplicate `const settings` declaration in
  `handleChatCore` (introduced alongside the per-key stream-default-mode
  feature). The same-scope redeclaration made esbuild/tsx fail with
  "The symbol 'settings' has already been declared", which turned every unit
  test that imports chatCore red and broke the production build. The earlier
  consolidated `settings` const is now reused.
- **db/migrations:** resolve a `077` migration version collision
  (`077_api_key_stream_default_mode.sql` vs `077_quota_pools.sql`) that made
  `getMigrationFiles()` throw and blocked `getDbInstance()` at startup (app would
  not boot; every DB-touching test was red). Renumbered the dependency-free,
  idempotent `quota_pools` migration to `085`, kept the non-idempotent
  `api_key_stream_default_mode` `ALTER` at `077`, added a retroactive
  `isSchemaAlreadyApplied` guard (case `085`), and a regression test enforcing
  unique migration prefixes.
- **routing/reasoning-replay:** OpenCode `big-pickle` (provider `opencode`/`oc`
  and `opencode-zen`) now declares the interleaved `reasoning_content` contract
  via a new `RegistryModel.interleavedField` field, so follow-up/tool-use turns
  replay reasoning_content. Previously `big-pickle` matched no replay pattern and
  failed with `[400] The reasoning_content in the thinking mode must be passed
back to the API` (its DeepSeek-thinking upstream is not detectable from the
  model id, and `requiresReasoningReplay` does not consume `supportsReasoning`).
  `getResolvedModelCapabilities` now surfaces the registry `interleavedField`. (#2900)
- **providers/github-copilot:** built-in GitHub Copilot Claude Opus and Gemini
  models (`claude-opus-4.7`, `claude-opus-4-5-20251101`, `gemini-3.1-pro-preview`,
  `gemini-3-flash-preview`) no longer carry `targetFormat: "openai-responses"`, so
  they route through `chat/completions` (the provider default, like the working
  `claude-opus-4.6`) instead of the Responses API, which Copilot does not serve for
  non-OpenAI models (returned `[400]`). Native OpenAI `gpt-*` models keep the
  Responses API. (#2911)
- **translator/responses:** Codex Desktop injects an `image_generation` hosted
  tool into every Responses API request (even text-only ones), which OmniRoute
  rejected with `[400] image_generation tool type is not supported`. It is now
  treated like `tool_search`: allowed past the tool-type validator and dropped
  silently from the tools array before forwarding to Chat Completions. (#2950)
- **combo/builder:** no-auth OpenCode Free combo entries now use the `oc/` routing
  alias instead of the `opencode/` prefix. `parseModel("opencode/<model>")`
  resolves to the `opencode-zen` api-key tier (via a manual `ALIAS_TO_PROVIDER_ID`
  override), so combos built with the bare provider id misrouted away from the
  no-auth `opencode` provider; `oc/<model>` resolves correctly. (#2901)
- **resilience/providers:** a route-restriction `403` (e.g. Fireworks Fire Pass
  `fpk_*` keys returning "…not authorized for this route." on `/models`, while
  chat still works) no longer marks the connection unavailable. Provider
  validation falls through to the chat probe for such 403s instead of returning
  "Invalid API key", and `checkFallbackError` short-circuits them to no cooldown.
  Genuine auth failures (401 / generic 403) still fail fast. (#2929)
- **auth/opencode-zen:** the OpenCode Zen free model now works in the Playground
  and combos without an API key. `opencode-zen` serves the public, signup-free
  endpoint (`https://opencode.ai/zen/v1`); when no api-key connection is
  configured, credential resolution now falls back to anonymous (no-auth) access
  instead of failing with "No credentials for provider: opencode-zen". A
  configured, active key is still used when present. (#2962)
- **translator/responses:** fixed an upstream `[400] Messages with role 'tool'
must be a response to a preceding message with 'tool_calls'` when a Codex
  client sent a `function_call` with an empty/missing `call_id`. The orphaned
  `function_call_output` previously slipped past the orphan filter. Now
  empty-`call_id` function calls are skipped (no dangling assistant tool_call)
  and any tool result without a matching tool_call id is dropped. (#2893)
- **deps:** remove the `proxifly` npm dependency (#3000 — thanks @terence71-glitch)
- **proxy:** use connection proxy for OAuth refresh (#3012 — thanks @terence71-glitch)
- **usage:** export pure helper functions for unit testing (#3015 — thanks @oyi77)
- **docs/docker:** align memory default docs to 1024MB (#3006 — thanks @terence71-glitch)
- **providers:** fix DuckDuckGo missing API key & update OpenCode free model list (#3008 — thanks @NekoMonci12)
- **claude:** bump Claude Code identity to 2.1.158 and sync beta flags (#3010 — thanks @Tentoxa)
- **test:** increase DB and usage utils coverage to >60% (#3018 — thanks @oyi77)
- **oom:** resolve memory leak in Bottleneck limiter caches and provider registry (#2965 — thanks @soyelmismo)
- **proxy:** show registry provider proxies in dashboard after Custom proxy flow moved them into the proxy registry (#2963 — thanks @terence71-glitch)
- **routing:** add agy to executor map so it uses AntigravityExecutor (#2957 — thanks @ReqX)
- **skills:** avoid Claude assistant tool_result blocks (#2956 — thanks @terence71-glitch)
- **perf:** CPU leak from Bottleneck limiter accumulation + per-request optimizations (#2951 — thanks @soyelmismo)
- **combo:** combo credential resolution ignores target.providerId — prefer combo target's providerId over model-inferred provider (#2946 — thanks @oyi77)
- **dashboard:** v3.8.8 screen fixes — agent-bridge SSR + audit/logs/memory/playground (#2944)
- **claude:** sanitize tool schemas + cloak third-party tool names on native Claude OAuth (#2943 — thanks @NomenAK)
- **auth:** prevent Codex multi-account refresh_token family revocation (#2941)
- **combo:** fix combo vision passthrough and Codex tool history repair (#2940 — thanks @charithharshana)
- **claude:** map WebSearch to Responses web_search (#2938 — thanks @makcimbx)
- **claude:** strip empty Read pages tool input (#2937 — thanks @makcimbx)
- **dashboard:** improve self-service provider quota visibility (#2931 — thanks @guanbear)
- **antigravity:** avoid visible signatureless tool history (#2927 — thanks @dhaern)
- **sse/web-search:** bypass the web-search fallback on a Claude → Claude passthrough so native Claude requests aren't rewritten (#2960 — thanks @terence71-glitch)
- **oom:** prevent per-request memory accumulation (~256MB heap growth) (#2973 — thanks @soyelmismo)
- **perf/proxy:** parallelize provider proxy overlay lookups (#2984 — thanks @terence71-glitch)
- **privacy/PII:** resolve the PII feature flag correctly and fix PII response sanitization in streaming SSE requests (#3021 — thanks @dangeReis)
- **electron:** improve macOS window chrome (#3029 — thanks @bobbyunknown)
- **i18n:** fix missing API key scope translations (#3031 — thanks @guanbear)
- **stream/responses:** drop a leaked chat bootstrap chunk for Responses-API clients (#3035 — thanks @CitrusIce)
- **docker:** warn-only on the `/app/data` permission check instead of `exit 1`, so a non-writable bind mount no longer kills the container at boot (#3036 — thanks @wussh)
- **mcp:** resolve streamable-HTTP transport readiness reporting an offline status (#3037 — thanks @Chewji9875)
- **dashboard:** use a lightweight ping endpoint for the MaintenanceBanner (fixes #3040) (#3043 — thanks @herjarsa)
- **test:** resolve pre-existing test failures — env sync, PII, quota, sidebar (#3039 — thanks @oyi77)
- **docs/mcp:** regenerate the mcp-tools diagram for 43 tools and fix the tool count (#3028 — thanks @diegosouzapw)
- **mcp:** move `enforceScopes` guard before `MCP_TOOL_MAP` lookup, add inline `scopes` parameter to `withScopeEnforcement()`, and declare scopes on all 24 dynamic tool definitions (memory, skills, plugins, gamification, compression) to fix scope enforcement for dynamic MCP tool groups (#2958 — thanks @branben)
- **sse/chatCore:** the heap-pressure guard now auto-calibrates its threshold to 85%
  of the live V8 heap ceiling (floor 400 MB) instead of a fixed 200 MB that sat below
  the app's ~260 MB baseline and returned `503 Service temporarily unavailable due to
resource pressure` for every request once the heap warmed up. It now tracks
  `--max-old-space-size` across 1 GB / 2 GB / large VPS; `HEAP_PRESSURE_THRESHOLD_MB`
  still overrides. (#3052)
- **proxy:** fail closed for OAuth usage-account proxies (#3051 — thanks @terence71-glitch)
- **proxy:** resolve registry proxy assignments for combo and key levels (#3048 — thanks @terence71-glitch)
- **providers/web:** wire the session pool for fingerprint rotation on Pollinations / DuckDuckGo (#3049 — thanks @oyi77)
- **providers/claude-web:** add `cf_clearance` cookie support and session-pool fingerprint rotation for Pollinations / DuckDuckGo (#3046 — thanks @oyi77)
- **usage:** handle MiniMax coding-plan percent quotas (`general`/percent dimension) so MiniMax coding plans report remaining quota correctly. (thanks @diegosouzapw)
- **home:** pass `providerId` to the quota widget icons so provider brand icons resolve on the home dashboard (#3064 — thanks @xz-dev)
- **quota:** block `qtSd/*` models for keys with no quota-pool allocation (enforcement Check 2.9), and never flag rotating-refresh providers (Codex/OpenAI) as expired during the quota sync (#3030). (thanks @diegosouzapw)

### 🏆 Contributors

A special thanks to everyone who contributed to this release — 746 commits since `v3.8.7`:

| Contributor                                              | PRs / Contribution                                                                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [@diegosouzapw](https://github.com/diegosouzapw)         | maintainer — AgentBridge, Traffic Inspector, Quota Share Engine, Nav Restructure, Plugins integration, releases & upstream ports |
| [@oyi77](https://github.com/oyi77)                       | #2913, #2947, #2954, #2978, #3015, #3018, #3039, #3041, #3045, #3046, #3049                                                      |
| [@terence71-glitch](https://github.com/terence71-glitch) | #2956, #2960, #2963, #2984, #3000, #3006, #3012, #3048, #3051                                                                    |
| [@soyelmismo](https://github.com/soyelmismo)             | #2951, #2965, #2973                                                                                                              |
| [@branben](https://github.com/branben)                   | #2958, #2959                                                                                                                     |
| [@makcimbx](https://github.com/makcimbx)                 | #2937, #2938                                                                                                                     |
| [@guanbear](https://github.com/guanbear)                 | #2931, #3031                                                                                                                     |
| [@Lion-killer](https://github.com/Lion-killer)           | #2981, #2988                                                                                                                     |
| [@JxnLexn](https://github.com/JxnLexn)                   | per-API-key stream default mode                                                                                                  |
| [@androw](https://github.com/androw)                     | #3017                                                                                                                            |
| [@xz-dev](https://github.com/xz-dev)                     | #2975, #3064                                                                                                                     |
| [@S0yora](https://github.com/S0yora)                     | #2964                                                                                                                            |
| [@NekoMonci12](https://github.com/NekoMonci12)           | #3008                                                                                                                            |
| [@Tentoxa](https://github.com/Tentoxa)                   | #3010                                                                                                                            |
| [@ReqX](https://github.com/ReqX)                         | #2957                                                                                                                            |
| [@NomenAK](https://github.com/NomenAK)                   | #2943                                                                                                                            |
| [@charithharshana](https://github.com/charithharshana)   | #2940                                                                                                                            |
| [@dhaern](https://github.com/dhaern)                     | #2927                                                                                                                            |
| [@dangeReis](https://github.com/dangeReis)               | #3021                                                                                                                            |
| [@bobbyunknown](https://github.com/bobbyunknown)         | #3029                                                                                                                            |
| [@CitrusIce](https://github.com/CitrusIce)               | #3035, #3058                                                                                                                     |
| [@wussh](https://github.com/wussh)                       | #3036                                                                                                                            |
| [@Chewji9875](https://github.com/Chewji9875)             | #3037                                                                                                                            |
| [@herjarsa](https://github.com/herjarsa)                 | #3043                                                                                                                            |
| [@freefrank](https://github.com/freefrank)               | #3066 (reported the Docker build failure)                                                                                        |

A special thanks to everyone who contributed code, reviews, and tests for this release:
@androw, @bobbyunknown, @branben, @charithharshana, @Chewji9875, @CitrusIce, @dangeReis, @dhaern, @diegosouzapw, @freefrank, @guanbear, @herjarsa, @JxnLexn, @Lion-killer, @makcimbx, @NekoMonci12, @NomenAK, @oyi77, @ReqX, @S0yora, @soyelmismo, @Tentoxa, @terence71-glitch, @wussh, @xz-dev

---

## [3.8.7] — 2026-05-29

### ✨ New Features

- **api (self-service):** add `GET /api/v1/me/status` so a delegated API key can view its own usage (USD used, budget percent, token totals) and optional shared Codex account quota, backed by migration `075_api_key_self_service_usage_scopes` (#2908 — thanks @guanbear).
- **analytics:** roll up usage logs to `daily_usage_summary` before raw log cleanup, and query a SQL `UNION` of raw and rolled-up data to prevent analytics history data loss (#2904 — thanks @unitythemaker).
- **perf (RAM):** reduce server memory footprint by capping 11 in-memory caches, limiting SQLite page cache, lazy-loading provider registries via Proxy, and optimizing Next.js startup database probes (#2903 — thanks @soyelmismo).

### 🔧 Bug Fixes

- **sse:** guard against numeric or non-string upstream error codes and malformed model strings to prevent runtime string-method crashes in `proxyFetch`, `parseModel`, and combo routing (#2463)
- **docker:** add dedicated `runner-web` Docker stage with Playwright + Chromium + system libs so web-cookie providers (Gemini Web, Claude Turnstile) work in container deployments without bloating the base image (#2832)
- **token-accounting:** prefer `prompt_tokens` over compatibility `input_tokens` for Anthropic Claude streams to avoid double-counting cached tokens (#2904 — thanks @unitythemaker).

- **agy:** add the **Antigravity CLI (`agy`)** as a standalone OAuth provider next to `gemini-cli`/`antigravity`. It reuses the antigravity inference backend (identical Google client, `daily-cloudcode-pa.googleapis.com`) but ships its own model catalog — notably the Claude models the backend exposes (`claude-opus-4-6-thinking`, `claude-sonnet-4-6`) — its own account pool, and connection methods: import the `agy` CLI token file (paste/upload), auto-detect a local CLI login (`~/.gemini/antigravity-cli/antigravity-oauth-token`), browser OAuth, and bulk/ZIP import. New routes: `POST /api/providers/agy-auth/{import,import-bulk,zip-extract,apply-local}`.

### Breaking Changes

- **proxy-logs:** `GET /api/usage/proxy-logs` now returns `clientIp` instead of `publicIp` for each log entry. External consumers reading `log.publicIp` must update to `log.clientIp`. The underlying SQLite column (`public_ip`) is unchanged, so callers that query the database directly are unaffected (#2880 — thanks @rdself).

### Known Inconsistency

- **log-export:** `GET /api/logs/export?type=proxy-logs` returns raw SQLite rows whose IP field is still named `public_ip` (the historical column name). This differs from the `clientIp` field exposed by `GET /api/usage/proxy-logs`. The two endpoints are intentionally inconsistent for now and will be aligned in a future migration (#2880).

### ✨ New Features

- **usage:** add per-API-key token limits scoped to model/provider/global with two-tier inline enforcement and in-memory cache accelerator (#2888 — thanks @mugnimaestra).
- **providers:** audit web cookie providers, fix 4 missing registry entries, and add DuckDuckGo AI Chat provider (#2862 — thanks @oyi77).
- **compression:** expand pt-BR pack with 34 new rules inspired by the troglodita project (#2818 — thanks @leninejunior).

### 🔧 Bug Fixes

- **oauth:** hotfix Windsurf login — drop dead PKCE flow, promote import-token, and resolve SQLite bind type errors (#2884 — thanks @yunaamelia).
- **models:** prune stale synced available models for inactive connections and dynamically map Antigravity MITM aliases loop-safely (#2886 — thanks @herjarsa).
- **antigravity:** harden signatureless tool history replay by making text representation inert (#2878 — thanks @dhaern).
- **i18n:** complete 144 missing Portuguese (pt-BR) locale keys and synchronize them with English (#2870 — thanks @alltomatos).
- **opencode-go:** add OpenCode Go provider limits quota fetcher to retrieve Z.AI quota windows (#2861 — thanks @RajvardhanPatil07).
- **reasoning:** gate reasoning trace replay injection on model interleaved capability metadata (#2843 — thanks @nickwizard).
- **audio:** construct multipart body manually for transcription form-data to prevent dropped boundary headers under Next.js fetch (#2842 — thanks @soyelmismo).
- **gemini-cli:** prefer real Google Cloud project IDs over default-project during model synchronization (#2841 — thanks @nickwizard).
- **mcp:** redirect console.log and console.warn startup messages to stderr in stdio MCP mode to prevent JSON-RPC parsing failures (#2840 — thanks @disonjer).
- **antigravity:** normalize unescaped tool calls and classify resource exhaustion 429 errors as lockout cooldowns (#2828 — thanks @Ardem2025).
- **sse:** repair RTK engine defaults to resolve consecutive-line deduplication and direct compression calls (#2825 — thanks @leninejunior).
- **fix(usage):** add opencode-go / opencode / opencode-zen quota fetcher so the provider limits page surfaces $12/5h, $30/wk, $60/mo windows alongside other quota-aware providers ([#2852](https://github.com/diegosouzapw/OmniRoute/issues/2852) — thanks @apoapostolov)

---

## [3.8.6] — 2026-05-29

### ✨ New Features

- **providers (Unlimited LLM Access):** add 7 new web-cookie providers plus a research catalog and discovery tool, expanding free/session-based model access ([#2887](https://github.com/diegosouzapw/OmniRoute/pull/2887) — thanks @oyi77)
- **combo (Zero-Latency Combos):** add Hedging, Proactive Compression, and Predictive TTFT strategies for lower tail latency on combo routing ([#2868](https://github.com/diegosouzapw/OmniRoute/pull/2868) — thanks @herjarsa)
- **api,oauth (agy):** add the `agy` (Antigravity CLI) standalone provider with CLI token import ([#2899](https://github.com/diegosouzapw/OmniRoute/pull/2899) — thanks @diegosouzapw)
- **usage:** per-API-key token limits scoped to model / provider / global, backed by migration `073_per_model_token_limits` ([#2888](https://github.com/diegosouzapw/OmniRoute/pull/2888) — thanks @mugnimaestra)
- **providers (web-cookie audit):** fix 4 missing registry entries and add DuckDuckGo ([#2862](https://github.com/diegosouzapw/OmniRoute/pull/2862) — thanks @oyi77)
- **logs:** add clean log history action button to Logs page dashboard (#2799 — thanks @apoapostolov)
- **settings:** restore settings-driven home page layout toggles and auto-refresh limits widget (#2800 — thanks @apoapostolov)
- **modelSpecs:** register explicit model specifications and context/output caps for Moonshot, Qwen, Hunyuan, DeepSeek, MiniMax, GLM on the `opencode-go` provider (#2802 — thanks @jeferssonlemes)
- **claude:** default `xhigh` reasoning-effort support for newer Opus models ([#2874](https://github.com/diegosouzapw/OmniRoute/pull/2874) — thanks @rdself)
- **compression (RTK):** add RTK command filters for `kubectl`, `docker-build`, `composer`, and `gh` ([#2824](https://github.com/diegosouzapw/OmniRoute/pull/2824) — thanks @leninejunior)
- **compression:** expand the pt-BR "troglodita" compression pack from 15 to 49 rules ([#2818](https://github.com/diegosouzapw/OmniRoute/pull/2818) — thanks @leninejunior)
- **opencode-go:** register 4 missing models from the upstream catalog ([#2790](https://github.com/diegosouzapw/OmniRoute/pull/2790) — thanks @jeferssonlemes)
- **build:** nix multi-OS package-manager install (`flake.nix` / `flake.lock`) ([#2806](https://github.com/diegosouzapw/OmniRoute/pull/2806) — thanks @levonk)

### 🛡️ Security

- **mitm:** refactor `runElevatedPowerShell` to write the elevated payload to a per-call temp `.ps1` file (mode 0o600) and reference it via `-File` instead of `-EncodedCommand <base64utf16le>`, removing the textbook fingerprint flagged by Socket.dev (#2863 — thanks @a-dmx)
- **cloud-sync:** require HMAC verification of the Cloud response (`X-Cloud-Sig`) when `OMNIROUTE_CLOUD_SYNC_SECRET` is set; default-off opt-in `OMNIROUTE_CLOUD_SYNC_SECRETS` flag now required to overwrite `accessToken` / `refreshToken` / `providerSpecificData` from the Cloud payload. Closes silent-credential-swap surface (#2863)
- **providers/zed-import:** split into 2-step `discover` + `import` flow. `/import` now requires `confirmedAccounts: [{ service, account, fingerprint }]` and re-reads the keychain server-side to filter by fingerprint, so a tampered discover response cannot trick the endpoint into saving an unrelated token. `OMNIROUTE_ZED_IMPORT_LEGACY_ONE_STEP=true` preserves v3.8.5 behaviour (deprecated, removed in v3.9) (#2863)
- **build:** add `OMNIROUTE_BUILD_PROFILE=minimal` (`npm run build:secure`) that physically removes the four sensitive modules (MITM cert install, Zed keychain reader, Cloud Sync, 9router installer) from the standalone bundle via webpack `NormalModuleReplacementPlugin` aliases. Stubs return HTTP 503 `feature-disabled` at runtime. Intended for the `omniroute-secure` artifact (#2863)
- **docs:** add `docs/security/SOCKET_DEV_FINDINGS.md` per-finding maintainer attestation + `socket.yml` v2 config + in-source `SECURITY-AUDITOR-NOTE:` blocks at every flagged call site (#2863)
- **windsurf:** redact the public Firebase Web key from the Windsurf provider spec (secret-scanning #7) and document the SHA-256 cache-key rationale (code-scanning #261) ([#2894](https://github.com/diegosouzapw/OmniRoute/pull/2894), [#2896](https://github.com/diegosouzapw/OmniRoute/pull/2896) — thanks @diegosouzapw)

### 🔧 Bug Fixes

- **antigravity:** harden signature-less tool history handling to prevent malformed tool-call replays ([#2878](https://github.com/diegosouzapw/OmniRoute/pull/2878) — thanks @dhaern)
- **providers:** provider model-sync pruning and dynamic Antigravity MITM proxy mappings ([#2886](https://github.com/diegosouzapw/OmniRoute/pull/2886) — thanks @herjarsa)
- **audio:** build the multipart body manually to preserve `Content-Type` on transcription requests ([#2842](https://github.com/diegosouzapw/OmniRoute/pull/2842) — thanks @soyelmismo)
- **opencode-go:** add a provider-limits quota fetcher so quota state is reported correctly ([#2861](https://github.com/diegosouzapw/OmniRoute/pull/2861) — thanks @RajvardhanPatil07)
- **validation:** add specialty validators for connection test, bypassing the `/models` probe for providers that don't expose it ([#2837](https://github.com/diegosouzapw/OmniRoute/pull/2837) — thanks @oyi77)
- **cli:** restore `omniroute logs` command — create missing `/api/cli-tools/logs` route that `log-streamer.ts` was calling, returning filtered pino log entries with `follow` and `filter` query-param support (#2756)
- **cli:** replace `cli-table3` dependency with a ~50-line hand-rolled ASCII formatter to resolve Node 24 / ESM interop breakage and remove tourniquet `package.json` overrides pinning `ansi-regex@^5`, `strip-ansi@^6`, `string-width@^4` (#2752)
- **fix(opencode-go,opencode-zen):** mark qwen3.7-max / 3.6-plus / 3.5-plus as supportsVision:false to stop forwarding image blocks to vision-incapable upstream models ([#2822])
- **nous-research:** append /chat/completions to provider baseUrl so DefaultExecutor's default URL builder hits the correct endpoint instead of returning 404 ([#2826])
- **fix(quota):** honor explicit per-connection `quotaPreflightEnabled: false` even when the provider has global window defaults — adds early-return guard before the AND-of-negations gate in auth.ts ([#2831])
- **api:** include noAuth providers (opencode, etc.) in `/v1/models` active aliases so their models surface without a DB connection row (#2798)
- **opencode-go:** route Qwen3.x via Claude messages format and repair `fixMissingToolResponses` helper for Claude-shape upstreams (#2791 — thanks @jeferssonlemes)
- **validation:** register missing validation helper checks for web-cookie providers (`claude-web`, `gemini-web`, `copilot-web`, `t3-web`) (#2793 — thanks @oyi77)
- **docker:** check and warn if `/app/data` is not writable in the Docker entrypoint script to fail fast with helpful host instructions (#2795 — thanks @hartmark)
- **oauth:** repair native Google loopback callback flow and support remote callbacks via state matching on 127.0.0.1 (#2796 — thanks @akarray)
- **combo:** resolve custom `openai-compatible-responses-*` provider targets correctly when called via combo name — combo steps storing the internal UUID-prefixed provider id now match the provider node by id as well as by prefix, fixing 503 errors for users with custom providers used inside combos (#2778)
- **combos:** fix combo handling so transient 429 rate limit errors do not poison or persist the rate limited state for the same-provider connection (#2800 — thanks @apoapostolov)
- **gemini:** translate signature-less Gemini thinking model tool calls to text parts to prevent `400 "missing thought_signature"` errors (#2801 — thanks @herjarsa)
- **translator:** strip `safety_identifier` from `/v1/responses` body before forwarding to Chat Completions upstream; fixes LobeHub-originated `400` errors (#2770)
- **warning-cleanup:** relax node engine constraint to `>=22.0.0` and clean dependencies (keeping `marked-terminal` to prevent TUI REPL crash) (#2792 — thanks @oyi77)
- **combo:** normalize upstream Headers into a plain object before classification to avoid Node 24 / undici cross-instance `Cannot read private member #headers` crash on combo failover (#2751)
- **translator:** silently drop `tool_search` built-in tool type instead of returning 400 — newer Codex clients send `tool_search` as a Responses API built-in with no Chat Completions equivalent (#2766)
- **usage:** un-invert GitHub Copilot Free / limited plan quota — `limited_user_quotas` is the _remaining_ count, not used, so the dashboard now shows 100% when the quota is untouched and 0% when fully exhausted (#2876 — thanks @androw)
- **fix(cli):** register openclaw in the CLI tool-detector so it appears in `omniroute status` alongside its existing API and config support ([#2833](https://github.com/diegosouzapw/OmniRoute/issues/2833))
- **oauth (windsurf):** hotfix Windsurf login — drop the dead PKCE flow and promote the import-token flow as the default ([#2884](https://github.com/diegosouzapw/OmniRoute/pull/2884) — thanks @yunaamelia)
- **antigravity:** normalize textual SSE tool calls and classify Gemini Antigravity resource exhaustion as a model lockout instead of a connection failure ([#2828](https://github.com/diegosouzapw/OmniRoute/pull/2828) — thanks @Ardem2025)
- **reasoning:** gate reasoning replay by the `interleaved` capability field and guard the interleaved capability lookup ([#2843](https://github.com/diegosouzapw/OmniRoute/pull/2843) — thanks @nickwizard)
- **gemini-cli:** prefer real project IDs over `default-project` during discovery ([#2841](https://github.com/diegosouzapw/OmniRoute/pull/2841) — thanks @nickwizard)
- **geminiHelper:** support the `rec.image` content shape and warn on dropped remote image URLs ([#2855](https://github.com/diegosouzapw/OmniRoute/pull/2855) — thanks @Tushar49)
- **deepseek-web:** return `400` when the client sends `tools[]` — `chat.deepseek.com` has no tool support ([#2854](https://github.com/diegosouzapw/OmniRoute/pull/2854) — thanks @Tushar49)
- **claude:** preserve max reasoning effort for supported models ([#2875](https://github.com/diegosouzapw/OmniRoute/pull/2875) — thanks @rdself)
- **github:** route `claude-opus-4.6` via the chat-completions path ([#2821](https://github.com/diegosouzapw/OmniRoute/pull/2821) — thanks @marchlhw)
- **logs:** rename proxy-log "Public IP" to "Client IP" ([#2880](https://github.com/diegosouzapw/OmniRoute/pull/2880) — thanks @rdself)
- **qoder:** reject invalid/expired PATs that surface as a Cosy `500` error ([#2860](https://github.com/diegosouzapw/OmniRoute/pull/2860) — thanks @herjarsa)
- **combo:** preserve system messages during context-handoff summary generation ([#2865](https://github.com/diegosouzapw/OmniRoute/pull/2865) — thanks @herjarsa)
- **cli:** allow nullable/optional `apiKey` in `cliMitmStartSchema` ([#2857](https://github.com/diegosouzapw/OmniRoute/pull/2857) — thanks @herjarsa)
- **chatCore:** wire CLIProxyAPI fallback settings into the chatCore routing engine ([#2866](https://github.com/diegosouzapw/OmniRoute/pull/2866) — thanks @oyi77)
- **skills:** skip interception for unregistered client-native tools ([#2817](https://github.com/diegosouzapw/OmniRoute/pull/2817) — thanks @jeferssonlemes)
- **mcp:** redirect `console.log`/`console.warn` to stderr in `--mcp` stdio mode so they don't corrupt the JSON-RPC stream ([#2840](https://github.com/diegosouzapw/OmniRoute/pull/2840) — thanks @disonjer)
- **cli:** respect the `PORT` env var in the `serve` command ([#2845](https://github.com/diegosouzapw/OmniRoute/pull/2845) — thanks @gogones)
- **sse (RTK):** repair RTK engine defaults so dedup and direct calls work ([#2825](https://github.com/diegosouzapw/OmniRoute/pull/2825) — thanks @leninejunior)
- **i18n:** translate 144 new `__MISSING__` pt-BR strings ([#2816](https://github.com/diegosouzapw/OmniRoute/pull/2816) — thanks @leninejunior); complete and sync remaining pt-BR strings with `en.json` ([#2870](https://github.com/diegosouzapw/OmniRoute/pull/2870) — thanks @alltomatos); translate 162 missing zh-CN UI strings ([#2789](https://github.com/diegosouzapw/OmniRoute/pull/2789) — thanks @InkshadeWoods)

### 🧹 Chores

- **ci:** resolve `release/v3.8.6` gate failures — docs-sync, any-budget, and pack-artifact ([#2895](https://github.com/diegosouzapw/OmniRoute/pull/2895) — thanks @diegosouzapw)
- **security (re-land):** re-integrate the Socket.dev supply-chain mitigations, secrets opt-in, and minimal build profile onto the release branch ([#2871](https://github.com/diegosouzapw/OmniRoute/pull/2871) — thanks @diegosouzapw)
- **skills:** implement automated skill workflows and update system configuration + validation schemas (thanks @diegosouzapw)
- **tests:** stabilize unit suites (blackbox-web, schema-coercion, translator-helper-branches, usage-service-hardening, audio-transcription) and isolate `services-branch-hardening` DB directory to avoid concurrency flakes (thanks @diegosouzapw)
- **chore:** remove stale agent skill documentation files and streamline maintenance workflows (thanks @diegosouzapw)
- **gitignore:** ignore `.claude/settings.local.json` so per-user Claude Code permissions never get committed by accident
- **release:** version bump and metadata sync (package.json, package-lock.json, electron, open-sse, openapi.yaml)

### 🏆 Contributors

A special thanks to everyone who contributed to this release. Ranked by commits since `v3.8.6` (105 commits total):

| Contributor                                                | Commits | PRs                                             |
| ---------------------------------------------------------- | ------: | ----------------------------------------------- |
| [@diegosouzapw](https://github.com/diegosouzapw)           |      38 | maintainer — releases, upstream ports & fixes   |
| [@oyi77](https://github.com/oyi77)                         |      10 | #2887, #2862, #2866, #2837, #2885, #2792, #2793 |
| [@yunaamelia](https://github.com/yunaamelia)               |       7 | #2884                                           |
| [@herjarsa](https://github.com/herjarsa)                   |       6 | #2868, #2886, #2865, #2860, #2857, #2801        |
| [@leninejunior](https://github.com/leninejunior)           |       4 | #2818, #2824, #2825, #2816                      |
| [@jeferssonlemes](https://github.com/jeferssonlemes)       |       3 | #2791, #2802, #2815, #2817                      |
| [@rdself](https://github.com/rdself)                       |       3 | #2874, #2875, #2880                             |
| Dmitry Kuznetsov                                           |       3 | textual tool-call & lockout hardening           |
| [@apoapostolov](https://github.com/apoapostolov)           |       2 | #2799, #2800                                    |
| [@unitythemaker](https://github.com/unitythemaker)         |       2 | #2904                                           |
| Nikolay Alafuzov                                           |       2 | reasoning interleaved gating                    |
| [@Tushar49](https://github.com/Tushar49)                   |       2 | #2854, #2855, #2807                             |
| [@guanbear](https://github.com/guanbear)                   |       2 | #2908                                           |
| [@soyelmismo](https://github.com/soyelmismo)               |       2 | #2903, #2842                                    |
| [@RajvardhanPatil07](https://github.com/RajvardhanPatil07) |       1 | #2861                                           |
| [@mugnimaestra](https://github.com/mugnimaestra)           |       1 | #2888                                           |
| [@dhaern](https://github.com/dhaern)                       |       1 | #2878                                           |
| [@hartmark](https://github.com/hartmark)                   |       1 | #2795, #2771                                    |
| [@marchlhw](https://github.com/marchlhw)                   |       1 | #2821                                           |
| [@alltomatos](https://github.com/alltomatos)               |       1 | i18n pt-BR                                      |
| [@akarray](https://github.com/akarray)                     |       1 | #2796                                           |
| [@gogones](https://github.com/gogones)                     |       1 | #2845                                           |
| [@disonjer](https://github.com/disonjer)                   |       1 | #2840                                           |
| [@nickwizard](https://github.com/nickwizard)               |       1 | #2841                                           |
| [@levonk](https://github.com/levonk)                       |       1 | #2806                                           |

_Reviews & additional contributions: @androw, @Ardem2025, @InkshadeWoods._
A special thanks to everyone who contributed code, reviews, and tests for this release:
@akarray, @alltomatos, @androw, @apoapostolov, @Ardem2025, @dhaern, @disonjer, @gogones, @hartmark, @herjarsa, @InkshadeWoods, @jeferssonlemes, @leninejunior, @levonk, @marchlhw, @mugnimaestra, @nickwizard, @oyi77, @RajvardhanPatil07, @rdself, @soyelmismo, @Tushar49, @yunaamelia, Dmitry Kuznetsov, Nikolay Alafuzov

---

## [3.8.5] — 2026-05-27

### ✨ New Features

- **auth:** support restricting API keys to specific endpoint categories (e.g., chat only, search only, embeddings only) with full dashboard configuration and centralized policy enforcement (#2777 — thanks @hijak)
- **batch:** recover stale `in_progress` and `finalizing` batches back to `validating` state on startup, reset counters, and apply a configurable concurrency limit (`BATCH_MAX_CONCURRENT`) (#2755 — thanks @hartmark)

### 🔧 Bug Fixes

- **docker:** rebuild `better-sqlite3` native bindings after hardened install to resolve container startup crash (#2772 — thanks @thanet-s)
- **combos:** make combo target timeout configurable, inheriting resolved request timeout by default and clamping values so they only shorten fallback latency (#2775 — thanks @rdself)
- **oauth:** use public callbacks for remote Google OAuth with custom creds (#2787 — thanks @akarray)
- **combos:** allow rate-limited provider connections after transient 429s (#2786 — thanks @JxnLexn)
- **logs:** keep database log settings in sync with the pipeline toggle (#2785 — thanks @JxnLexn)
- **docker:** speedup docker creation by reducing steps and bunch up copy operations (#2784 — thanks @hartmark)
- **codex:** apply global service tiers to combo request bodies (#2783 — thanks @JxnLexn)

### ⚡ Performance / CI

- **ci:** build Docker platforms on native runners (linux/amd64 on ubuntu-24.04 and linux/arm64 on ubuntu-24.04-arm) instead of emulated QEMU, reducing build times significantly (#2774 — thanks @thanet-s)

### 📝 Documentation

- **docs:** fix broken documentation links in README after Fumadocs migration (#2782 — thanks @kjhq)

### 🏆 Hall of Contributors

A special thanks to everyone who contributed code, reviews, and tests for this release:
@akarray, @hartmark, @hijak, @JxnLexn, @kjhq, @rdself, @thanet-s

---

## [3.8.4] — 2026-05-26

### 🔒 Security

- **authz:** redirect `/home` and `/home/:path*` to `/login` when unauthenticated — Next.js middleware matcher omitted `/home`, so any visit reached the page directly on `REQUIRE_LOGIN` deployments (#2712 — thanks @diegosouzapw)
- **review:** resolve v3.8.4 important + minor findings from consolidated review including SSRF guards (#2749 — thanks @diegosouzapw)

### ✨ New Features

- **feat(credential-health):** fail-fast credential health check with TTL cache and background scheduler — validates API key + OAuth connections before combo dispatch, skips failed targets in <1ms instead of 10-30s timeout
- **feat(middleware):** pre-request middleware pipeline with global, combo-specific, and per-request scopes — hooks can mutate body/headers/model, short-circuit, or skip remaining hooks
- **feat(websocket):** live dashboard WebSocket server on port 20129 with EventBus integration — real-time request started/combo target attempt/succeeded/failed and credential health events
- **feat(circuit-breaker):** three-state circuit breaker (CLOSED→DEGRADED→OPEN) with adaptive backoff per failure kind (rate-limit/auth/timeout), escalation count, and historical state tracking
- **feat(key-groups):** API key groups with migration 066 — key_groups, group_model_permissions, key_group_members tables and CRUD, REST endpoints, group auth integration
- **feat(copilot):** OmniRoute Copilot with CodeGraph knowledge base and CLI harness — LLM-guided configurator at POST /api/copilot/chat
- **feat(combo-playground):** combo routing simulation API and dashboard UI under /dashboard/combos/playground/
- **feat(pwa):** improved PWA manifest with icons, categories, and service worker with push notification support
- **feat(relay):** serverless relay proxies with migration 067 — relay_tokens, relay_rate_limits, relay_logs, public endpoint at /api/v1/relay/chat/completions, management API, dashboard UI
- **feat(cost):** cost optimization engine with alerts (budget/spike/trend thresholds), 6 REST endpoints, dashboard alerts UI
- **feat(backup):** backup and restore system with export/import API and dashboard UI
- **feat(config-templates):** config templates with migration 070, seed data, CRUD + apply API, dashboard UI
- **feat(custom-models):** custom model registry with migration 069, CRUD API, dashboard UI
- **feat(webhooks-cicd):** webhook CI/CD actions with migration 071 — ActionEngine supporting deploy/restart/sync actions, REST API
- **feat(multitenant):** multi-tenant dashboard with per-API-key usage aggregation and provider/model breakdown
- **feat(sla):** SLA dashboard with uptime/latency/error rate queries, summary/trend APIs, uptime badges and sparklines
- **feat(routing-analytics):** AI-powered usage pattern analysis and routing recommendations — combo_metrics queries, hourly failure heatmap, provider breakdown, cost-vs-latency scatter chart
- **feat(teams):** fixed team execution with 13 git worktrees and project-level team configs
- **feat(providers):** add Inner.ai provider support with native executor, translation support, and model catalog definitions (#2704 — thanks @df4p)
- **feat(proxy):** unified free proxy pool, Vercel Relay serverless endpoints, and a redesigned 4-tab proxy dashboard interface (#2705 — thanks @diegosouzapw)
- **feat(webhooks):** 3-step configuration wizard for Slack, Telegram, Discord, and Custom webhook destinations, with reorganized React components (#2703 — thanks @diegosouzapw)
- **feat(openapi):** comprehensive API endpoints content audit with 100% schema coverage, authz security tiers, and full i18n localization support (#2701 — thanks @diegosouzapw)
- **feat(providers):** add BluesMinds, FreeModel.dev, and FreeAIAPIKey to the provider catalog (#2709 — thanks @oyi77)
- **feat(routing/providers):** broaden routing, provider capabilities, and dashboard views — adds AWS Bedrock provider executor, combo scoring inspector, route explainability, reset-aware combo routing, and improves UI views for quota and resilience (#2750 — thanks @JxnLexn)
- **feat(batch-fixes):** clean batch UI, Docker compose base profile, and support for parallel testing execution (#2761 — thanks @diegosouzapw)
- **chore(deps):** added ws + @types/ws for WebSocket support, recharts ^3.8.1 for analytics charts

### 🔧 Bug Fixes

- **validation:** add Poolside specialty validator (direct `/chat/completions` probe — Poolside has no `/v1/models` endpoint and returns 401 for unknown routes, which the generic `/models` flow misread as "invalid API key") (#2723)
- **validation:** add NVIDIA NIM specialty validator and harden `normalizeBaseUrl` against non-string `providerSpecificData.baseUrl` — fixes the `e.startsWith is not a function` TypeError that surfaced after minification (#2463)
- **cli:** `omniroute compression *` falls back to direct REST endpoints (`/api/settings/compression`, `/api/context/combos`, `/api/context/analytics`) when `/api/mcp/tools/call` returns 404; normalize `none → off` / `hybrid → stacked` engine aliases (#2688)
- **cli:** import `cli-helper/tool-detector` and `cli-helper/doctor/checks` with the explicit `.ts` extension that tsx resolves directly, so the published npm package (which ships only the `.ts` source) no longer crashes with `Cannot find module '…tool-detector.js'` (#2509)
- **authz:** make the DB feature-flag override authoritative over `process.env` for `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`, so toggling "Allow Private Provider URLs" in the Electron dashboard takes effect without restarting the spawned server (#2575)
- **fix(antigravity):** stabilize model detection, OAuth handling, and token refresh logic (#2757 — thanks @oyi77)
- **fix(batch):** recover and resume stale batch jobs on server restart instead of failing them, and add configurable concurrency limit (#2755 — thanks @hartmark)
- **fix(harness):** resolve Headers private slot errors and type check compiler issues, and stabilize cooldown retry test flakiness (#2763 — thanks @diegosouzapw)
- Fix combo cascade skipping on credential check timeout
- Fix team sessions going idle (worktree initialization)
- **feat(providers):** enhance Google Gemini, CLI, and Antigravity resilience and features — introduces explicit TypeScript typing to translation layers, adds new Gemini 2.0 models, implements backoff and retry logic in the Gemini CLI executor, extracts Google Search grounding metadata into standard `citations`, and adds backend definitions for the `vertex-partner` provider. ([#2676](https://github.com/diegosouzapw/OmniRoute/pull/2676) — thanks @alltomatos)
- **fix(proxy):** atomically save and assign custom dashboard proxies in a single SQLite transaction, preventing orphan configuration rows (#2697 — thanks @terence71-glitch)
- **fix(reasoning):** inject thinking blocks into Claude-format messages for Kimi K2 to prevent infinite tool-calling loops (#2699 — thanks @herjarsa)
- **fix(antigravity):** default exhausted quota status display to 0% instead of 100% (#2700 — thanks @ahmet-cetinkaya)
- **fix(electron):** add Caps Lock indicator, custom reset warnings, and suppress shell window spawning on startup (#2714 — thanks @benzntech)
- **fix(combos):** resolve context handoff tags ordering issue and enforce a 60-second request timeout limit per combo target to prevent capacity leaks (#2717 — thanks @herjarsa)
- **fix(oauth):** resolve parallel token refresh race conditions in Codex and implement comprehensive error checking across OAuth providers (#2718 — thanks @diegosouzapw)
- **fix(docker):** install `python3`, `make`, and `g++` in the Docker builder stage to support native Node.js addon compilation (#2713 — thanks @mrmm)
- **fix(i18n):** restore real hint and placeholder translation strings for web-cookie providers in `en.json` (#2694 — thanks @diegosouzapw)
- **fix(db):** resolve migration version prefix collision between services and webhook metadata tables (#2727 — thanks @diegosouzapw)
- **fix(vision-bridge):** ensure images are processed when a vision-capable model is matched through a combo routing mapping (#2706 — thanks @herjarsa)
- **mcp:** break callLogs ↔ compliance ESM cycle that deadlocks the bundled MCP server on Node.js 24 — extract no-log state to `compliance/noLog.ts`, switch callers to the leaf module, keep `compliance/index.ts` re-exports for backwards compat (#2650 — thanks @disonjer)
- **deepseek:** guard PoW solver Web Worker handler so `require()` no longer throws `ReferenceError: onmessage is not defined` under Node strict mode (#2724 — thanks @thanet-s)
- **combos:** include no-auth providers (FreeAIAPIKey, BluesMinds, FreeModel.dev, opencode, …) in the combo builder picker — they were invisible because they never get rows in `provider_connections` (#2737 — thanks @herjarsa)
- **translator:** allow the `web_search` server-tool family (`web_search_20250305`, `web_search_20250101`, plain `web_search`) in the Responses API translator and preserve the original versioned name on output (#2695 — thanks @diegosouzapw)
- **oauth:** register the missing `trae` provider with `import_token` flow so the Trae IDE no longer 500s during token import (#2658 — thanks @diegosouzapw)
- **model:** merge settings-based aliases with the legacy DB alias namespace so aliases set via the Settings UI (e.g. `gpt-5.4 → cx/gpt-5.4`) are honored instead of being overridden by provider inference (#2618, #2208 — thanks @diegosouzapw)
- **kiro:** fall back to `document.execCommand("copy")` when the Clipboard API is unavailable (HTTP/non-secure contexts), so the "Copy authorization link" button works on LAN deployments (#2689 — thanks @disonjer)
- **cli:** raise `omniroute serve` ready timeout from 20s to 60s and add a TCP-listening fallback so Windows users no longer get phantom timeouts during slow Next.js cold start (#2460 — thanks @benzntech)
- **mcp:** break circular await deadlock in compliance→callLogs + Kiro refresh resilience (#2747 — thanks @disonjer)
- **ui:** claude-web provider shows 'API Key' label instead of 'Session Cookie' (#2744 — thanks @oyi77)
- **deepseek-web:** lazy start session refresh (#2742 — thanks @thanet-s)
- **docker:** keep fumadocs doc assets in Docker build context (#2741 — thanks @janeza2)
- **vision-bridge:** force bridge for opencode-go/zen models that overstate vision support (#2740 — thanks @herjarsa)
- **combos:** enable universal handoff by default to preserve cross-model conversation context (#2736 — thanks @herjarsa)

### 🚀 Embedded Services

- **feat(services):** embedded service manager for 9Router and CLIProxyAPI — introduces a full lifecycle management system for locally-run AI proxy daemons accessible on loopback only:
  - **ServiceSupervisor** (`src/lib/services/supervisor.ts`) — EventEmitter-based child process manager with state machine (`not_installed → stopped → starting → running → stopping → error`), ring-buffer log capture (5 MB/service), health polling, and configurable stop timeout.
  - **ServiceRegistry** (`src/lib/services/registry.ts`) — process-scoped map of active `ServiceSupervisor` instances; integrates with `bootstrap.ts` for auto-start on app launch.
  - **9Router lifecycle** — npm-installer (`src/lib/services/installers/ninerouter.ts`), 8 REST endpoints under `/api/services/9router/` (install, start, stop, restart, update, status, auto-start, rotate-key), NineRouterExecutor at `open-sse/executors/ninerouter.ts`, model-sync job, and provider registration.
  - **CLIProxyAPI lifecycle** — GitHub-release installer (`src/lib/services/installers/cliproxy.ts`), 7 REST endpoints under `/api/services/cliproxy/` (install, start, stop, restart, update, status, auto-start), health probe at `/v1/models` (CPA 6.x has no `/health` endpoint).
  - **SSE log streaming** — `/api/services/{name}/logs` with `tail` and `filter` query params, `snapshot` + `log` SSE events, 30-second heartbeat.
  - **WebSocket proxy** — `/api/services/{name}/ws` reverse-proxies WebSocket connections to the embedded service UI port (port 20131); `isLocalOnlyPath()` guard in `routeGuard.ts` (Hard Rule #17).
  - **HTTP UI proxy** — `/api/services/9router/proxy/[...path]` for iframe asset loading.
  - **Dashboard page** `/dashboard/providers/services` — URL-based tab navigation (`?tab=cliproxy` default / `?tab=9router`), shared components (`ServiceStatusCard`, `ServiceLifecycleButtons`, `ServiceLogsPanel`), sidebar item under Omni Proxy (hideable, `material-symbols-outlined: deployed_code`).
  - **CliproxyServiceTab** — auto-start toggle, fallback routing card (enable/disable, URL, status codes); fallback settings remain mirrored in Settings → CLIProxyAPI for backward compatibility.
  - **NinerouterServiceTab** — auto-start toggle, API key display + rotation, collapsible embedded Web UI iframe (`sandbox="allow-scripts allow-same-origin allow-forms"`, loopback-only).
  - **DB migration 071** (originally 068, renumbered post-merge to avoid collision with `068_free_proxies` and `068_webhooks_kind_metadata`) — extends `version_manager` table with `autoStart`, `autoUpdate`, `providerExpose`, `apiKey`, and `port` columns. `migrationRunner.ts` now throws at boot if two `.sql` files share the same numeric prefix.
  - All service routes classified as `LOCAL_ONLY` in `routeGuard.ts`; loopback enforcement is unconditional before any auth check (leaked JWT via tunnel cannot trigger process spawning).

### 🏆 Hall de Contribuidores

Um agradecimento especial a todos que contribuíram com código, revisões e testes para este release:
@ahmet-cetinkaya, @alltomatos, @benzntech, @Chewji9875, @df4p, @diegosouzapw, @disonjer, @hartmark, @herjarsa, @janeza2, @JxnLexn, @mrmm, @oyi77, @thanet-s, @terence71-glitch

---

## [3.8.3] — 2026-05-24

### ✨ New Features

- **feat(combos):** universal context handoff for cross-model conversation continuity — structured XML summary system (`<context_handoff>`) that preserves conversation continuity and handles state transfer when combo routing switches models. ([#2653](https://github.com/diegosouzapw/OmniRoute/pull/2653) — thanks @herjarsa)
- **feat(docs):** migrate `/docs` to Fumadocs MDX with nested routes — replaces the custom docs engine with Fumadocs, adding `[...slug]` catch-all routing, search API at `/docs/api/search`, `source.config.ts` content configuration, and `meta.json` navigation files across 8 doc sections (`architecture/`, `compression/`, `frameworks/`, `guides/`, `ops/`, `reference/`, `routing/`, `security/`). Includes 50+ URL redirects for backward compatibility via `next.config.mjs`. ([#2614](https://github.com/diegosouzapw/OmniRoute/pull/2614) — thanks @ovehbe)
- **feat(dashboard):** add search and filters to `/dashboard/api-manager` — filter bar with search by name/key, active-only toggle (persisted to localStorage), status filter (active/disabled/banned/expired), type filter (standard/manage/restricted), filter count badges, and empty state with "Clear Filters" button. ([#2628](https://github.com/diegosouzapw/OmniRoute/pull/2628) / [#2641](https://github.com/diegosouzapw/OmniRoute/pull/2641) — thanks @diegosouzapw)
- **feat(dashboard):** free-tier grouping with symbolic link in `/dashboard/providers` — groups and displays all free-tier providers from all categories dynamically using `hasFree: true` properties without removing them from their native lists. Displays category dot and amber dot with localizable tooltips, dedupes search results by provider ID, and corrects free tier count statistics. ([#2632](https://github.com/diegosouzapw/OmniRoute/pull/2632) — thanks @diegosouzapw)
- **feat(dashboard):** risk notice modal for sensitive providers — show a soft, informative warning modal when connecting to session-based or OAuth providers (like Claude, Cursor, Copilot) for the first time. Adds `subscriptionRisk` properties to 20 providers, localizable templates, and stores acknowledgment in localStorage. ([#2633](https://github.com/diegosouzapw/OmniRoute/pull/2633) / [#2638](https://github.com/diegosouzapw/OmniRoute/pull/2638) — thanks @diegosouzapw)
- **feat(dashboard):** refactor free-tier provider dashboard layout — cleans up visual clutter, reorganizes categories, hides redundant banners, and integrates free-tier categories nicely into the primary provider interface. ([#2640](https://github.com/diegosouzapw/OmniRoute/pull/2640) — thanks @diegosouzapw)
- **feat(dashboard):** mini-playground inline (Phase 4) — integrated interactive mini-playground capabilities to provider details pages, including support for specialized example cards (Embedding, Image, LLM Chat, Music, STT, TTS, Video, Web Fetch, Web Search), unified API key loading hooks, model listing hooks, and curl command builder. ([#2648](https://github.com/diegosouzapw/OmniRoute/pull/2648) — thanks @diegosouzapw)
- **feat(webfetch):** category support with dedicated media providers page and executors for Firecrawl, Jina Reader, and Tavily. ([#2645](https://github.com/diegosouzapw/OmniRoute/pull/2645) — thanks @diegosouzapw)
- **feat(adapta):** integrate Adapta Org (`adapta-web`) provider with automatic Clerk authentication refresh and custom onboarding tutorial modal. ([#2643](https://github.com/diegosouzapw/OmniRoute/pull/2643) — thanks @df4p)
- **feat(i18n):** complete translations for Simplified Chinese — translates 1220 missing keys bringing UI coverage to 98.8% with 0 placeholders. ([#2655](https://github.com/diegosouzapw/OmniRoute/pull/2655) — thanks @L-aros)
- **feat(dashboard):** add Cmd+K / Ctrl+K command palette for sidebar navigation and a slideover panel for LLM provider testing UI. ([#2656](https://github.com/diegosouzapw/OmniRoute/pull/2656) — thanks @mrmm)
- **feat(i18n):** finish Simplified Chinese (zh-CN) UI coverage with 377 translated entries. ([#2659](https://github.com/diegosouzapw/OmniRoute/pull/2659) — thanks @L-aros)
- **feat(dashboard):** chat-first test slide-over layout — consolidates header controls (Model/Key selects, Clear button) into a unified toolbar, maximizes vertical conversation space, integrates live tailing of provider logs in Logs tab, and locks composer focus for keyboard-only convenience. ([#2660](https://github.com/diegosouzapw/OmniRoute/pull/2660) — thanks @mrmm)
- **feat(cli):** desktop updates, autostart, and headless CLI modes — integrates native auto-updater checks, login autostart (Linux .desktop, macOS/Windows login items), and a background headless server CLI daemon mode (`--headless` or `OMNIROUTE_HEADLESS=true`) into the Electron app wrapper. ([#2662](https://github.com/diegosouzapw/OmniRoute/pull/2662) — thanks @benzntech)
- **feat(quota):** card-grid layout and provider group headers under quota management — replaces monolithic table with a beautiful 4-column card grid in limits. ([#2667](https://github.com/diegosouzapw/OmniRoute/pull/2667) — thanks @Gi99lin)
- **feat(dashboard):** real-time WebSocket live monitoring daemon — runs a Node.js WebSocket daemon sidecar on port `20129` to emit real-time events for request starts/completes/fails, combo attempts, and credential status in the dashboard logs. ([#2668](https://github.com/diegosouzapw/OmniRoute/pull/2668) — thanks @herjarsa)
- **feat(copilot):** AI assistant with CodeGraph + CLI + knowledge base — integrates a dashboard assistant with CodeGraph knowledge base access and CLI capabilities for app exploration. ([#2669](https://github.com/diegosouzapw/OmniRoute/pull/2669) — thanks @ovehbe / @herjarsa)
- **feat(pipeline):** pre-request middleware hooks — pipeline executing custom JS hooks before routing/combo logic to mutate headers/body or short-circuit requests. ([#2670](https://github.com/diegosouzapw/OmniRoute/pull/2670) — thanks @herjarsa)
- **feat(resilience):** credential health check + adaptive circuit breaker v2 — background connection health check scheduler with progressive circuit breaker adding DEGRADED state and HALF-OPEN recovery validation to avoid latency spikes. ([#2671](https://github.com/diegosouzapw/OmniRoute/pull/2671) — thanks @herjarsa)
- **feat(playground):** combo routing visual simulator — interactive route simulation page at `/dashboard/combos/playground` to showcase cascade hops, latency, and cost estimates. ([#2672](https://github.com/diegosouzapw/OmniRoute/pull/2672) — thanks @herjarsa)
- **feat(auth):** API key groups with model-level permissions — group definitions with model-level wildcards/denies where API keys inherit group-scoped restrictions. ([#2673](https://github.com/diegosouzapw/OmniRoute/pull/2673) — thanks @herjarsa)
- **feat(pwa):** enhanced manifest + push notification support — polishes offline shortcuts, screenshots, display metadata, and push service workers. ([#2674](https://github.com/diegosouzapw/OmniRoute/pull/2674) — thanks @herjarsa)
- **feat(proxy):** serverless relay proxy endpoints with rate limiting — public relay proxy endpoints with cost caps and rate limits, CRUD API, and dashboard usage tracking. ([#2675](https://github.com/diegosouzapw/OmniRoute/pull/2675) — thanks @herjarsa)

### 🔧 Bug Fixes

- **fix(settings):** Require Login modal Cancel button text and dismissal — modal now renders localized cancel label via the `common` namespace and closes correctly without modifying settings when cancelled. ([#2649](https://github.com/diegosouzapw/OmniRoute/pull/2649) — thanks @Chewji9875)
- **fix(deepseek-web):** re-apply SSE parser, prompt format, and error handling fixes — handles all 3 DeepSeek SSE stream formats (initial fragments, APPEND operations, bare string tokens), uses non-greedy regex for markdown image stripping, simplifies prompt to single-turn, checks `json.code` before token extraction, and uses `accessToken` fallback for session cache eviction on auth errors. ([#2616](https://github.com/diegosouzapw/OmniRoute/pull/2616) — thanks @ovehbe)
- **fix(deepseek-web):** SSE thinking/search routing and session lifecycle — properly routes thinking vs content fragments based on `thinking_enabled` flag, handles search results with citation indices, appends search result footnotes, refactors `transformSSE()` and `collectSSEContent()` with shared helpers. ([#2624](https://github.com/diegosouzapw/OmniRoute/pull/2624) — thanks @ovehbe)
- **fix(codex):** use allowlist to strip non-Responses-API fields in non-passthrough path — strips residual Chat Completions fields (`stream_options`, `service_tier`, `store`, `metadata`) from the request body when routing through the non-passthrough (translation) code path, preventing GPT-5.5 from receiving invalid parameters. ([#2615](https://github.com/diegosouzapw/OmniRoute/pull/2615) — thanks @diegosouzapw)
- **fix(catalog):** skip static PROVIDER_MODELS when synced models exist — prevents stale/duplicate model entries in `/v1/models` for auto-synced providers. ([#2625](https://github.com/diegosouzapw/OmniRoute/pull/2625) — thanks @herjarsa)
- **fix(qoder):** Cosy auth fallback for PAT tokens + vision support for qwen3-vl-plus — when a PAT token gets 401, falls back to Cosy auth against `api1.qoder.sh`; adds `supportsVision: true` to qwen3-vl-plus. ([#2629](https://github.com/diegosouzapw/OmniRoute/pull/2629) — thanks @herjarsa)
- **fix(cli):** register tsx loader and add opencode config subcommand — registers `tsx/esm` at CLI startup so dynamic `.ts` imports resolve; adds `omniroute config opencode` convenience alias. ([#2631](https://github.com/diegosouzapw/OmniRoute/pull/2631) — thanks @amogus22877769)
- **fix(claude):** improve Pi and OpenCode compatibility — adds Pi Coding Agent anchors to system transform removal, stores `_toolNameMap` as non-enumerable, strips `context_management` when thinking is disabled. ([#2621](https://github.com/diegosouzapw/OmniRoute/pull/2621) — thanks @unitythemaker)
- **fix(passthrough):** restore semantic passthrough system-role-only extraction — reverts full `normalizeClaudeUpstreamMessages()` to lighter `extractSystemRoleMessages()` in CC semantic passthrough paths, preventing document/tool chain corruption. ([#2620](https://github.com/diegosouzapw/OmniRoute/pull/2620) — thanks @Tentoxa)
- **fix(kiro):** stabilize conversationId across prompt compression — captures pre-compression body and uses the original first user message as seed for UUID v5, keeping Kiro's AWS conversation context stable. ([#2630](https://github.com/diegosouzapw/OmniRoute/pull/2630) — thanks @HALDRO)
- **fix(t3-chat-web):** close implementation gaps for t3.chat TanStack Start, tracking of stream_options, and retry configurations — parses TSS Turbo Stream Serialization from `_serverFn/*`, tracks request `combo_strategy` via database migration `062_usage_history_combo_strategy.sql`, and makes batch retry backoffs custom-configurable via environment variables. ([#2634](https://github.com/diegosouzapw/OmniRoute/pull/2634) — thanks @oyi77)
- **fix(reasoning):** extend empty `reasoning_content` injection to prevent tool call loops in Kimi K2 and replay models — injects empty `reasoning_content` field to Kimi models during tool-calling sequences to bypass loop issues. ([#2639](https://github.com/diegosouzapw/OmniRoute/pull/2639) — thanks @herjarsa)
- **fix(cli):** Linux autostart via systemd user service on headless VPS — adds auto-generating systemd user service unit for headless setups on Linux, updating tray configs and system variables allowlist (`LOGNAME` and `XDG_CURRENT_DESKTOP`). ([#2635](https://github.com/diegosouzapw/OmniRoute/pull/2635) — thanks @janeza2)
- **fix(combo):** preserve `<omniModel>` tag in SSE stream output for combos when using `context_cache_protection` to ensure correct context pinning round-trips. ([#2646](https://github.com/diegosouzapw/OmniRoute/pull/2646) — thanks @herjarsa)
- **fix(rtk):** prevent false positives in RTK compression by skipping content-based filter matching for non-shell tool results (e.g. read_file, grep_search). ([#2642](https://github.com/diegosouzapw/OmniRoute/pull/2642) — thanks @HALDRO)
- **fix(translator):** enable Claude extended thinking for Copilot Responses-API requests — handles reasoning budget and translations for Copilot. ([#2647](https://github.com/diegosouzapw/OmniRoute/pull/2647) — thanks @ivan-mezentsev)
- **fix(tests):** remove duplicate assertion in schema coercion & fix(cli): ignore system vars in env check. (thanks @diegosouzapw)
- **fix(combo):** resolve pending request leaks on unresponsive combo targets — implements a default 60-second per-target timeout during combo routing loops to abort hanging upstream requests and release capacity limits. ([#2663](https://github.com/diegosouzapw/OmniRoute/pull/2663) — thanks @Chewji9875)
- **fix(proxy):** save custom dashboard proxies directly in SQLite registry — writes new provider/account/global/combo custom proxies directly to the modern `proxy_registry` database and assigns them via `proxy_assignments` instead of creating duplicate configurations. ([#2661](https://github.com/diegosouzapw/OmniRoute/pull/2661) — thanks @terence71-glitch)
- **fix(settings):** expand effortLevel enum to support xhigh and max reasoning efforts — adds `xhigh` and `max` levels to the updateThinkingBudgetSchema to resolve validation failures that silently discarded top-effort request payloads. ([#2666](https://github.com/diegosouzapw/OmniRoute/pull/2666) — thanks @mrmm)
- **fix(codex):** Codex OAuth refresh token reuse race condition under parallel requests. ([#2667](https://github.com/diegosouzapw/OmniRoute/pull/2667) — thanks @diegosouzapw)

### 📝 Maintenance

- **chore(config):** ignore additional agent workflow command files (`.agents/commands/`). (thanks @diegosouzapw)
- **chore(config):** ignore `memory-bank` and Cursor agent rules from tracking. (thanks @ovehbe)
- **chore(ci):** publish @omniroute/opencode-plugin to npm — adds a parallel build, test, and publish job to the npm release workflow for automated package deployment. ([#2666](https://github.com/diegosouzapw/OmniRoute/pull/2666) — thanks @mrmm)

### 🏆 Hall de Contribuidores

Um agradecimento especial a todos que contribuíram com código, revisões e testes para este release:
@amogus22877769, @benzntech, @Chewji9875, @df4p, @diegosouzapw, @Gi99lin, @HALDRO, @herjarsa, @ivan-mezentsev, @janeza2, @L-aros, @mrmm, @ovehbe, @oyi77, @Tentoxa, @terence71-glitch, @unitythemaker

---

## [3.8.2] — 2026-05-22

### ✨ New Features

- **feat(@omniroute/opencode-plugin):** upstream-provider suffix in model display name — appends provider label to enriched names (e.g. `Claude Opus 4.7 · Claude` vs `Claude Opus 4.7 · Kiro`) so the OC TUI model picker can differentiate same-id models routed through different upstream connections. Default-on, opt-out via `features.providerTag: false`. ([#2602](https://github.com/diegosouzapw/OmniRoute/pull/2602) — thanks @mrmm)
- **feat(@omniroute/opencode-plugin):** provider-tag becomes a prefix + traffic-light compression emoji — provider label now prepends (`Claude - Claude Opus 4.7`) for better TUI column grouping, with smart abbreviation for long labels (`GitHub Models` → `GHM`). Compression pipelines render intensity as emoji (🟢🟡🟠🔴). ([#2604](https://github.com/diegosouzapw/OmniRoute/pull/2604) — thanks @mrmm)
- **feat(providers):** add 7 free-tier providers (Wave 1) — Arcee AI, InclusionAI, Krutrim, Liquid AI, MonsterAPI, Nomic, and Poolside now available as new API-key providers with provider icons, model specs, and full routing support. ([#2479](https://github.com/diegosouzapw/OmniRoute/pull/2479) — thanks @oyi77)
- **feat(providers):** add Astraflow provider support with global + China endpoints — new provider with dual-region base URLs for global and mainland China access. ([#2486](https://github.com/diegosouzapw/OmniRoute/pull/2486) — thanks @ucloudnb666)
- **feat(providers):** add `claude-web` provider — cookie-based Claude Web chat access without OAuth. ([#2476](https://github.com/diegosouzapw/OmniRoute/pull/2476) — thanks @oyi77)
- **feat(providers):** add 14 free-tier providers (Wave 1b) — 360AI, Baichuan, Baidu, ByteDance/Doubao, IDEO, Kuaishou/Kling, Kunlun/Skywork, SenseTime/SenseNova, Stepfun, Tencent HunYuan, Zhipu GLM, Replicate, RunPod, and Modal with provider icons, model specs, and routing support. ([#2488](https://github.com/diegosouzapw/OmniRoute/pull/2488) — thanks @oyi77)
- **feat(hermes):** add rich multi-role Hermes Agent CLI support — 7 configurable roles (default, delegation, vision, compression, web_extract, skills_hub, approval), per-role model selection with YAML config generation, dashboard card with preview, and home widget integration. ([#2526](https://github.com/diegosouzapw/OmniRoute/pull/2526) — thanks @apoapostolov)
- **feat(cloud-agents):** cloud agents UX overhaul — tabs (tasks/agents/settings), status filters, Material icons, duration formatting, cloud agent credentials and health API endpoints, memory stats endpoint. ([#2516](https://github.com/diegosouzapw/OmniRoute/pull/2516) — thanks @oyi77)
- **feat(authz):** manage-scope API keys may reach `/api/mcp/*` from non-loopback — Route Guard Tiers system (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT), narrow carve-out for remote MCP access gated by `manage` scope; `/api/cli-tools/runtime/*` stays strict-loopback. Includes dashboard AuthzSection, inventory API, and comprehensive docs. ([#2473](https://github.com/diegosouzapw/OmniRoute/pull/2473) — thanks @mrmm)
- **feat(home):** home page customization for experienced users — pin Provider Quota to home, toggle Quick Start and Provider Topology visibility via Appearance settings. ([#2531](https://github.com/diegosouzapw/OmniRoute/pull/2531) — thanks @apoapostolov)
- **feat(home):** automatic refresh of Provider Quota — configurable interval (60s–600s) with toggle in Appearance settings; auto-refreshes pinned quota on the home page. ([#2532](https://github.com/diegosouzapw/OmniRoute/pull/2532) — thanks @apoapostolov)
- **feat(@omniroute/opencode-plugin):** OmniRoute OpenCode plugin — live models fetched from OmniRoute API, combo-aware model listing, Gemini request sanitization, multi-instance support, auth flow integration, and 10 test files. ([#2529](https://github.com/diegosouzapw/OmniRoute/pull/2529) — thanks @mrmm)
- **feat(executors):** forward OpenCode client headers to upstream providers — OpenCode-specific headers are now forwarded through the executor pipeline for improved compatibility. ([#2538](https://github.com/diegosouzapw/OmniRoute/pull/2538) — thanks @kang-heewon)
- **feat(fireworks):** add new models with `modelIdPrefix` support — generic registry field that stores short model IDs and prepends the full path prefix before upstream API calls. Adds 6 new Fireworks models, `modelsUrl` for dynamic sync, and Qwen3 reranker. ([#2560](https://github.com/diegosouzapw/OmniRoute/pull/2560) — thanks @HALDRO)
- **feat(@omniroute/opencode-plugin):** readable + filterable + offline-resilient model picker — `usableOnly` filter (only show providers with healthy connections), `diskCache` for offline hydration, `Combo:` prefix labeling, and compression metadata tags in combo display names. ([#2572](https://github.com/diegosouzapw/OmniRoute/pull/2572) — thanks @mrmm)
- **feat(smart-pipeline):** multi-stage pipeline for auto combo routing — rule-based + intent-classifier + domain-specific stages with configurable pipeline router, accuracy benchmarks, and comprehensive tests. ([#2551](https://github.com/diegosouzapw/OmniRoute/pull/2551) — thanks @oyi77)
- **feat(ops):** skip DB health check on startup via `OMNIROUTE_SKIP_DB_HEALTHCHECK=1` — replaces slow `integrity_check` (7+ min on large WAL) with `quick_check`, and adds env var to skip entirely. ([#2554](https://github.com/diegosouzapw/OmniRoute/pull/2554) — thanks @soyelmismo)
- **refactor(dashboard):** Provider Quota grouped layout with vertical rail — restructures the page to a 2-column per-provider layout (left rail with icon/name/status, right content with dynamic per-provider columns), new `providerColumns.ts` / `ProviderGroup.tsx` / `AccountRow.tsx` components, env chip-filter row, bulk-refresh per group, and inline expanded panels. ([#2528](https://github.com/diegosouzapw/OmniRoute/pull/2528) — thanks @Gi99lin)
- **feat(providers):** add 26 free-tier providers missing from registry — Novita, Avian, Chutes, Kluster, Targon, Nineteen, Celery, Ditto, Atoma, and more. ([#2590](https://github.com/diegosouzapw/OmniRoute/pull/2590) — thanks @oyi77)
- **feat(providers):** add api-airforce free provider with 55 models. ([#2587](https://github.com/diegosouzapw/OmniRoute/pull/2587) — thanks @oyi77)
- **feat(dashboard):** configurable sidebar — presets, drag-and-drop ordering, smart-grouping, and new Settings → Sidebar page. ([#2581](https://github.com/diegosouzapw/OmniRoute/pull/2581) — thanks @Gi99lin)

### 🔧 Bug Fixes

- **fix(validation):** stop appending a second `/models` when the Gemini base URL already ends in `/models` — Google AI Studio connections using the default base URL were validating against `.../v1beta/models/models` and failing with `404` for every connection. ([#2545](https://github.com/diegosouzapw/OmniRoute/issues/2545))
- **fix(cloudflare-ai):** flatten OpenAI content-part arrays to plain strings for the Workers AI (`cf/`) executor — Workers AI's `/ai/v1/chat/completions` rejects `content: [{type:"text",...}]` with HTTP 400, so requests with array content now have their text parts joined into a string. ([#2539](https://github.com/diegosouzapw/OmniRoute/issues/2539))
- **fix(i18n):** replace leftover Portuguese strings in the English source with English on the Quota dashboards — the quota-share Beta notice (`betaConfigSaved*`) and the Provider Quota row's `Edit cutoffs` / `Refresh now` fallbacks were showing Portuguese. ([#2540](https://github.com/diegosouzapw/OmniRoute/issues/2540))

- **fix(proxy):** honor the legacy per-provider/global proxy config in `resolveProxyForProvider` — the Claude OAuth token exchange and token refresh only consulted the new proxy registry, so a proxy configured the legacy way (`/api/settings/proxy?level=provider`) was ignored and the exchange went out directly from the host, tripping Anthropic's IP `rate_limit_error` on VPS deployments. It now falls back to the legacy config, mirroring `resolveProxyForConnection`. ([#2456](https://github.com/diegosouzapw/OmniRoute/issues/2456))
- **fix(antigravity):** auto-discover a missing Cloud Code `projectId` via `loadCodeAssist` before failing — a freshly re-added Antigravity account whose stored `projectId` was empty (OAuth-time discovery returned nothing) now recovers the project on the first request instead of returning `422 Missing Google projectId`, mirroring the `gemini-cli` bootstrap. ([#2334](https://github.com/diegosouzapw/OmniRoute/issues/2334), [#2541](https://github.com/diegosouzapw/OmniRoute/issues/2541))
- **fix(stream):** keep the `/v1/responses` SSE connection warm for strict clients — emit an early keepalive while the upstream produces its first token and lower the heartbeat cadence to 4s, so Codex CLI's `reqwest` client (≈5s idle-read timeout) no longer drops the stream "before completion" on slow/reasoning models. `curl` was unaffected because it has no idle timeout. ([#2544](https://github.com/diegosouzapw/OmniRoute/issues/2544))
- **fix(electron):** wait longer for the server on first launch and reload once it responds — long post-upgrade DB migrations could exceed the 30s readiness probe, leaving the desktop app stuck on the "Server starting" screen even though the backend was healthy. The probe now targets the auth-exempt health endpoint with a generous timeout and reloads the window once the server comes up. ([#2460](https://github.com/diegosouzapw/OmniRoute/issues/2460))

- **fix(cli):** mark `bin/omniroute.mjs` as executable (mode 755) so the globally-installed CLI runs directly without a manual `chmod +x`. ([#2469](https://github.com/diegosouzapw/OmniRoute/issues/2469) — thanks @disonjer)
- **fix(settings):** restore the Global System Prompt into the in-memory config on server startup and after JSON/SQLite import — it was only loaded by the PUT endpoint, so the toggle/prompt silently reverted to defaults after any restart or import. ([#2470](https://github.com/diegosouzapw/OmniRoute/issues/2470) — thanks @disonjer)
- **fix(settings):** append the Global System Prompt **after** existing system content instead of prepending it, so provider/agent instructions (Kiro, OpenCode, Hermes, …) injected into the system message no longer override the user's global prompt via recency bias. ([#2468](https://github.com/diegosouzapw/OmniRoute/issues/2468) — thanks @disonjer)
- **fix(kiro):** refresh imported social tokens (`authMethod === "imported"`) via the Kiro social-auth endpoint instead of AWS SSO OIDC — imported tokens carry a registered `clientId`/`clientSecret` but a social-issued refresh token the OIDC client cannot refresh, so auto-refresh was failing with "provider returned no new token". ([#2467](https://github.com/diegosouzapw/OmniRoute/issues/2467) — thanks @disonjer)
- **fix(antigravity):** resolve the Cloud Code `projectId` from `providerSpecificData` as a fallback (and preserve it across token refresh) so the Gemini `/v1beta` streaming path stops returning a spurious `422 Missing Google projectId` for connections that store the project there. ([#2480](https://github.com/diegosouzapw/OmniRoute/issues/2480))
- **fix(api):** `GET /v1beta/models` now lists only models whose provider has an active/validated connection, matching the OpenAI-format `/v1/models` behavior, instead of returning the entire catalog. ([#2483](https://github.com/diegosouzapw/OmniRoute/issues/2483))

- **fix(cli):** persist `STORAGE_ENCRYPTION_KEY` into `DATA_DIR` (not only `~/.omniroute`) and refuse to auto-generate a fresh key when a `storage.sqlite` already exists — a new key cannot decrypt previously-encrypted credentials, so silently regenerating it locked users out of their database. The CLI now mirrors the server `bootstrapEnv` guard. (reported by Daniel Nach; original key persistence by @Chewji9875 — follow-up to [#1622](https://github.com/diegosouzapw/OmniRoute/issues/1622))
- **fix(gemini):** preserve and re-attach the `thoughtSignature` on Gemini thinking-model tool calls — thread the signature namespace through the `FORMATS.GEMINI` and `FORMATS.GEMINI_CLI` request translators so the cached signature (keyed by connection + tool-call id) is found on the follow-up turn. Fixes `[400]: Function call is missing a thought_signature in functionCall parts` on agentic Gemini tool use. ([#2504](https://github.com/diegosouzapw/OmniRoute/issues/2504))
- **fix(translator):** accept PDFs sent in the Responses-API `input_file` shape on the Gemini path, and the Gemini-style `document` shape on the Responses/Codex path — content parts are now normalized across `input_file` / `file` / `document` so a PDF reaches the model regardless of which field name the client used. ([#2515](https://github.com/diegosouzapw/OmniRoute/issues/2515))
- **fix(stream):** count `thinking` arrays and `reasoning_details` as useful stream output — a reasoning-only response (e.g. Mistral/StepFun with a low `max_tokens`) was misclassified as "Stream ended before producing useful content" and turned into a spurious 502; it is now recognized as valid output. ([#2520](https://github.com/diegosouzapw/OmniRoute/issues/2520))
- **fix(claude):** extract system/developer role messages in Claude Code semantic passthrough paths — moves `role:"system"` / `role:"developer"` messages from the `messages[]` array to the top-level `system` parameter before sending to Anthropic, which rejects them inside messages. Fixes memory injection context being silently dropped. ([#2497](https://github.com/diegosouzapw/OmniRoute/pull/2497) — thanks @unitythemaker)
- **fix(vision-bridge):** auto-route non-standard provider models through OmniRoute self-loop — vision-bridge now detects when a model doesn't natively support vision and automatically re-routes the image through OmniRoute's own endpoint for format translation. ([#2487](https://github.com/diegosouzapw/OmniRoute/pull/2487) — thanks @herjarsa)
- **fix(mitm):** add IPv6 DNS redirect, modular antigravity target, improved logging — MITM DNS handler now correctly redirects IPv6 (AAAA) queries alongside IPv4, adds a dedicated `antigravity.ts` target module, and enhances DNS/TLS logging for debugging. ([#2514](https://github.com/diegosouzapw/OmniRoute/pull/2514) — thanks @herjarsa)
- **fix(usage):** improve Claude and MiniMax plan label detection — better tier name resolution for Claude OAuth usage (tier/plan/subscription_type/org fields) and new MiniMax plan label inference from quota totals. ([#2498](https://github.com/diegosouzapw/OmniRoute/pull/2498) — thanks @Gi99lin)
- **fix(codex):** fan out image `n` requests in parallel — when Codex requests `n > 1` images, the image-generation handler now dispatches them concurrently instead of sequentially, significantly reducing total latency. ([#2499](https://github.com/diegosouzapw/OmniRoute/pull/2499) — thanks @nmime)
- **fix(embeddings):** strip stale `Content-Encoding` headers from upstream response — prevents clients from receiving gzip-encoded responses with `identity` encoding declared, which caused silent data corruption. ([#2477](https://github.com/diegosouzapw/OmniRoute/pull/2477) — thanks @lordavadon2)
- **fix(model):** return clear error instead of silent OpenAI default for unrecognized models — previously, an unrecognized model silently fell back to OpenAI; now returns a 404 with a descriptive message listing known providers. ([#2492](https://github.com/diegosouzapw/OmniRoute/pull/2492) — thanks @herjarsa)
- **fix(dark-mode):** correct background token on Compression Override select — the combo compression override `<select>` was using a hard-coded white background that was invisible in dark mode. ([#2513](https://github.com/diegosouzapw/OmniRoute/pull/2513) — thanks @apoapostolov)
- **fix(antigravity):** align subscription tier detection with Antigravity Manager — `extractCodeAssistSubscriptionTier` now parses the correct nested field from the `loadCodeAssist` response, and a new `extractCodeAssistOnboardTierId` fallback handles the onboarding flow. Subscription info is cached per access-token with 5-min TTL. ([#2496](https://github.com/diegosouzapw/OmniRoute/pull/2496) — thanks @Gi99lin)
- **fix(opencode-zen):** add `opencode` provider alias and sync model list with live API — `opencode-zen` and `opencode-go` are now also reachable via the shorter `opencode` alias, and the default model list is kept in sync with the live `/v1/models` catalog. ([#2508](https://github.com/diegosouzapw/OmniRoute/pull/2508) — thanks @herjarsa)
- **fix(combo):** clarify log message when combo target is skipped due to unavailable credentials — previously logged a misleading "provider not found" message; now says "skipped: credentials unavailable". ([#2494](https://github.com/diegosouzapw/OmniRoute/pull/2494) — thanks @herjarsa)
- **fix(security):** replace `Math.random` with `crypto.randomUUID` in `generateTaskId`/`ActivityId` and fix URL hostname check in test — eliminates weak PRNG usage flagged by CodeQL. ([#2489](https://github.com/diegosouzapw/OmniRoute/pull/2489))
- **fix(electron):** downgrade to Electron 41.x for better-sqlite3 V8 compatibility — Electron 42.x shipped a V8 version that broke `better-sqlite3` native bindings at runtime; pinning to 41.x restores stability.
- **fix(@omniroute/opencode-provider):** include `limit.context` in model entries for OpenCode context window detection — OpenCode reads `limit.context` to determine usable context length for compaction and overflow detection.
- **fix(providers):** make `gitlawb/gitlawb-gmi` model entry optional — prevents provider initialization failure when the model is not available in the catalog. ([#2476](https://github.com/diegosouzapw/OmniRoute/pull/2476) — thanks @oyi77)
- **fix(translator):** inject `omniroute_web_search` in the Responses-API flat tool shape (`{ type, name }`) when the target provider speaks the Responses API — previously it was always emitted in the Chat Completions nested shape, so Codex/relay upstreams rejected the request. ([#2390](https://github.com/diegosouzapw/OmniRoute/issues/2390))
- **fix(kiro):** serialize non-string `role:"tool"` message content before sending to CodeWhisperer — structured/array tool output was collapsing to `content:[{ text: "" }]`, which Kiro rejects with `400 Improperly formed request`. ([#2446](https://github.com/diegosouzapw/OmniRoute/issues/2446))
- **fix(claude):** gate the heavy-agent beta headers (`context-1m`, `effort`, `advanced-tool-use`) on Opus/Sonnet only — Haiku with OAuth was receiving `context-1m` and rejecting it with 400. Also sanitizes historical `thinking` block signatures in passthrough. ([#2454](https://github.com/diegosouzapw/OmniRoute/issues/2454) — thanks @havockdev)
- **fix(perplexity-web):** route requests through a Firefox-148 TLS-impersonating client so Perplexity's Cloudflare edge stops rejecting VPS/datacenter IPs with a 403 challenge. ([#2459](https://github.com/diegosouzapw/OmniRoute/issues/2459) — thanks @havockdev)
- **fix(validation):** guard `apiKey`/`modelsUrl` against non-string values before calling `.startsWith()` / `.trim()` in the provider connection-test path. ([#2463](https://github.com/diegosouzapw/OmniRoute/issues/2463))
- **fix(cost):** prevent double-billing of `cache_creation_input_tokens` — `prompt_tokens` from token extractors already includes both `cache_read` and `cache_creation`, so `nonCachedInput` now subtracts both cache types to avoid pricing cache at the full input rate. ([#2522](https://github.com/diegosouzapw/OmniRoute/pull/2522) — thanks @herjarsa)
- **fix(handler):** always normalize system role messages in Claude passthrough paths — `normalizeClaudeUpstreamMessages()` is now called unconditionally in both `compatibleBridge` and pure passthrough, ensuring `role:"system"` messages are always extracted to the top-level `system` parameter. ([#2519](https://github.com/diegosouzapw/OmniRoute/pull/2519) — thanks @herjarsa)
- **fix(handler):** capture Gemini `thought_signature` in non-streaming response path — the non-streaming translator now captures `thoughtSignature` from Gemini thinking model parts and persists them so follow-up turns can resolve them correctly. ([#2518](https://github.com/diegosouzapw/OmniRoute/pull/2518) — thanks @herjarsa)
- **fix(kiro):** replace broken social OAuth with device flow — rewrites Kiro's Google/GitHub social login from the broken PKCE `kiro://` custom protocol to AWS Cognito device flow, which works correctly in web/proxy environments. ([#2524](https://github.com/diegosouzapw/OmniRoute/pull/2524) — thanks @disonjer)
- **fix(providers):** resolve `opencode/` → `opencode-zen` slug mismatch + add 40+ new models — `opencode` is now a proper alias for `opencode-zen` in executor, model resolver, and provider registry; adds GPT 5.x, Claude 4.x, Gemini 3.x, Grok, Kimi, and other models with tests. ([#2517](https://github.com/diegosouzapw/OmniRoute/pull/2517) — thanks @herjarsa)
- **fix(antigravity):** fail over stalled Antigravity sessions — new `ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE` shared constant for pre-response timeout detection, automatic failover to next account when session stalls before headers arrive. Node.js engine range relaxed to `>=20.20.2`. ([#2464](https://github.com/diegosouzapw/OmniRoute/pull/2464) — thanks @dhaern)
- **fix(deepseek-web):** fix SSE parser, prompt format, and error handling — handles all 3 DeepSeek SSE stream formats (initial fragments, APPEND operations, bare string tokens), simplifies prompt to single-turn to prevent chat marker leakage, and checks `json.code` before token extraction. ([#2502](https://github.com/diegosouzapw/OmniRoute/pull/2502) — thanks @ovehbe)
- **fix(codex):** accept `auth.json` without `auth_mode` field on import — Codex CLI no longer writes `auth_mode`; import now accepts both formats as long as required tokens are present. Semantic cache read now requires explicit `temperature: 0`. ([#2536](https://github.com/diegosouzapw/OmniRoute/pull/2536) — thanks @janeza2)
- **fix(freetheai):** add `/chat/completions` to baseUrl to resolve 404 errors. ([#2557](https://github.com/diegosouzapw/OmniRoute/pull/2557) — thanks @lordavadon2)
- **fix(qoder):** route PAT tokens to Qoder native API instead of DashScope — detects `pt-` prefixed tokens and routes to `api.qoder.com` with proper User-Agent header. ([#2559](https://github.com/diegosouzapw/OmniRoute/pull/2559) — thanks @herjarsa)
- **fix(perf):** cache compiled RegExp in RTK compression hot path — eliminates thousands of redundant `new RegExp()` instantiations per second. ([#2553](https://github.com/diegosouzapw/OmniRoute/pull/2553) — thanks @soyelmismo)
- **fix(reasoning-cache):** auto-start periodic cleanup on module load — the `server-init.ts` job was never imported (dead code), causing the `reasoning_cache` table to grow indefinitely. Now runs 30-min cleanup cycles automatically. ([#2552](https://github.com/diegosouzapw/OmniRoute/pull/2552) — thanks @soyelmismo)
- **fix(claude):** omit `context-1m` beta for Sonnet — restrict to Opus-only to avoid long-context credit gate errors. Add `afk-mode-2026-01-31`, replace `redact-thinking` with `thinking-token-count-2026-05-13`. ([#2568](https://github.com/diegosouzapw/OmniRoute/pull/2568) — thanks @unitythemaker)
- **fix(codex):** relax `auth_mode` check in frontend import preview — accept `undefined`/`null`/`"chatgpt"` instead of requiring `"chatgpt"` strictly, matching the backend fix in #2536. ([#2567](https://github.com/diegosouzapw/OmniRoute/pull/2567) — thanks @janeza2)
- **fix(kimi):** declare vision capability for Kimi K2.6 in all 4 layers — `providerRegistry`, `modelSpecs`, `catalog.ts` keyword list, and Playground `VISION_MODELS`; previously the model silently rejected image uploads. ([#2573](https://github.com/diegosouzapw/OmniRoute/pull/2573) — thanks @herjarsa)
- **fix(dashboard):** paginate request-log viewer beyond 300 rows — `getCallLogs` now accepts `offset` with parameterized SQL (eliminates string-interpolated `LIMIT`); `RequestLoggerV2` grows its window via "Load more" + IntersectionObserver infinite scroll, resetting on filter change. ([#2576](https://github.com/diegosouzapw/OmniRoute/pull/2576))
- **fix(cli):** use `/api/monitoring/health` for server readiness check — `waitForServer()` was polling the auth-protected `/api/health` (401), causing `omniroute serve` to hang indefinitely. ([#2578](https://github.com/diegosouzapw/OmniRoute/pull/2578) — thanks @amogus22877769)
- **fix(combo):** detect invalid model errors via structured error codes + regex fallback — when a combo target rejects a model (e.g. free account vs Pro), the router now recognizes `model_not_found` / `deployment_not_found` codes and 6 regex patterns, and falls through to the next target instead of stopping the loop. ([#2534](https://github.com/diegosouzapw/OmniRoute/pull/2534) — thanks @HALDRO)
- **fix(security):** post-review hardening batch — `spawnSync` arg-array replaces `execSync` string-template (command injection), CSP `unsafe-eval` gated on `!app.isPackaged`, `requireManagementAuth` guard on budget/bulk and resilience/reset endpoints, error messages sanitized in gemini-web/claude-web/copilot-web/oauth/agents catch blocks, circuit breaker persists `lastFailureKind`, and combo resets `exhaustedProviders` per set-retry iteration. ([#2435](https://github.com/diegosouzapw/OmniRoute/pull/2435))
- **fix(@omniroute/opencode-plugin):** honor `geminiSanitization` and `fetchInterceptor` feature flags — both were applied unconditionally; now each fetch layer is gated by its flag (default ON), and disabling both falls back to plain SDK fetch. ([#2546](https://github.com/diegosouzapw/OmniRoute/pull/2546))
- **fix(#2575):** check DB feature flag override in `arePrivateProviderUrlsAllowed()` — supports runtime toggle without restart. ([#2595](https://github.com/diegosouzapw/OmniRoute/pull/2595) — thanks @herjarsa)
- **fix(mimo):** add `supportsVision` flag to MiMo-V2.5, V2.5-Pro, and V2-Omni — previously image uploads were silently rejected. ([#2592](https://github.com/diegosouzapw/OmniRoute/pull/2592) — thanks @herjarsa)
- **fix(ops):** propagate `OMNIROUTE_SKIP_DB_HEALTHCHECK` env var to periodic DB health check scheduler — companion fix to #2554. ([#2591](https://github.com/diegosouzapw/OmniRoute/pull/2591) — thanks @soyelmismo)
- **fix(github):** remove incorrect `openai-responses` targetFormat from GitHub Copilot's Haiku/Sonnet models. ([#2583](https://github.com/diegosouzapw/OmniRoute/pull/2583) — thanks @oyi77)
- **fix(copilot):** stabilize responses configuration — removes 865 lines of unstable config, simplifies handler. ([#2579](https://github.com/diegosouzapw/OmniRoute/pull/2579) — thanks @ivan-mezentsev)
- **fix(#2544):** add SSE heartbeat keepalive to Responses API transform stream — prevents Codex CLI 0.130.0 from disconnecting during long thinking/reasoning phases. ([#2599](https://github.com/diegosouzapw/OmniRoute/pull/2599) — thanks @herjarsa)
- **fix(memory):** extract system role messages in semantic passthrough path to prevent 400 on memory injection — system messages were being passed as-is to providers that reject mixed roles. ([#2474](https://github.com/diegosouzapw/OmniRoute/pull/2474) — thanks @Tentoxa)
- **fix(@omniroute/opencode-provider):** include `limit.context` in model entries for OpenCode context window detection — previously OpenCode couldn't determine model context size. ([#2482](https://github.com/diegosouzapw/OmniRoute/pull/2482) — thanks @herjarsa)
- **fix(mimo):** add `supportsVision` flag to Kimi K2.6 in providerRegistry + comprehensive vision tests for MiMo V2.5/V2.5-Pro/V2-Omni. ([#2600](https://github.com/diegosouzapw/OmniRoute/pull/2600) — thanks @herjarsa)
- **fix(proxy):** prefer scoped proxies over registry global fallback — legacy provider-specific proxy was being shadowed by a registry-global fallback across both storage backends. Resolution now follows strict specificity: account → provider → combo → global. ([#2606](https://github.com/diegosouzapw/OmniRoute/pull/2606) — thanks @terence71-glitch)
- **fix(@omniroute/opencode-plugin):** canonical-twin dedup + alias-fallback enrichment — `/v1/models` returned the same model under both alias (`cc/claude-opus-4-7`) and canonical (`claude/claude-opus-4-7`) names; now drops ~75 canonical duplicates and rescues ~88 raw-id rows with proper provider prefix via alias-index fallback. Also emits `cost`, `release_date`, `modalities` fields in static catalog and raises provider label threshold to 12 chars (preserves `AssemblyAI`, `Antigravity` verbatim). ([#2607](https://github.com/diegosouzapw/OmniRoute/pull/2607) — thanks @mrmm)
- **fix(registry):** populate empty models arrays for HuggingFace (6 models) and HackClub (3 models) + fix Snowflake placeholder baseUrl to `{account}` template pattern. ([#2611](https://github.com/diegosouzapw/OmniRoute/pull/2611) — thanks @oyi77)

### 🌐 Internationalization

- **i18n(zh-CN):** translate 830 missing UI strings — replaces all `__MISSING__:` placeholders with proper Chinese translations. ([#2523](https://github.com/diegosouzapw/OmniRoute/pull/2523) — thanks @InkshadeWoods)
- **i18n(dashboard):** add missing dashboard keys and fix EN fallbacks — hundreds of hardcoded English strings across cache, caveman, costs, skills, memory, and evals pages replaced with `t()` calls. ([#2500](https://github.com/diegosouzapw/OmniRoute/pull/2500) — thanks @Gi99lin)
- **i18n(pt-BR):** complete and fix Brazilian Portuguese translation — comprehensive overhaul of pt-BR locale with ~3000 lines of quality translations, filling all missing keys and correcting existing entries. ([#2543](https://github.com/diegosouzapw/OmniRoute/pull/2543) — thanks @alltomatos)
- **i18n(ru):** comprehensive Russian translation update — ~2000 lines of corrected and filled translations. ([#2550](https://github.com/diegosouzapw/OmniRoute/pull/2550) — thanks @AgentAlexAI)
- **i18n(all):** comprehensive localization and UI refactoring — 42 locale files synchronized with missing keys, cloud-agents page i18n rewrite, and consistent `t()` usage across 21 dashboard components. ([#2580](https://github.com/diegosouzapw/OmniRoute/pull/2580) — thanks @alltomatos)
- **i18n(all):** translate freeTier provider strings across 41 locales — replaces `__MISSING__:Free Tier Providers` placeholders with proper translations in both `common` and `providers` namespaces. ([#2609](https://github.com/diegosouzapw/OmniRoute/pull/2609) — thanks @leninejunior)
- **i18n(pt-BR):** eliminate all 1270 remaining `__MISSING__` markers — completes pt-BR translation across 41 namespaces to true 100% coverage. ([#2610](https://github.com/diegosouzapw/OmniRoute/pull/2610) — thanks @leninejunior)

### 📝 Maintenance

- **chore:** remove Akamai VPS deploy from release workflow and skills.
- **chore(deps):** bump `actions/setup-node` from v4 to v6 + `randomBytes` security fix for cloud agent task IDs. ([#2589](https://github.com/diegosouzapw/OmniRoute/pull/2589))
- **chore(deps):** bump `actions/upload-artifact` from v4 to v7. ([#2588](https://github.com/diegosouzapw/OmniRoute/pull/2588))
- **chore:** ignore `.claude/worktrees` from git tracking.
- **chore(ci):** auto-lock release branch on version publish — new CI workflow applies `lock_branch` protection when a GitHub Release is published. ([#2542](https://github.com/diegosouzapw/OmniRoute/pull/2542))
- **docs:** redesign README — marketing-first layout with accurate provider counts. ([#2490](https://github.com/diegosouzapw/OmniRoute/pull/2490))

---

## [3.8.1] — 2026-05-21

### ✨ New Features

- **feat(settings):** Feature Flags Settings Page (Card Grid + DB overrides) — fully implements the feature flags UI dashboard using Variant A (Card Grid) with Glassmorphism, complete with global `GET/PUT/DELETE` API routes, Zod validation, debounced search, category filters, and full 30+ locale i18n support. Resolves priority hierarchy to DB > ENV > Defaults. ([#2457](https://github.com/diegosouzapw/OmniRoute/pull/2457))
- **feat(db):** multi-driver SQLite abstraction layer — new `SqliteAdapter` interface with 3 concrete adapters (`betterSqliteAdapter`, `nodeSqliteAdapter`, `sqljsAdapter`) and a `driverFactory` that cascades `better-sqlite3` → `node:sqlite` → `sql.js (WASM)`. Enables OmniRoute to run on any JavaScript runtime (Node.js, Bun, Deno, Cloudflare Workers) without native binary dependencies. `better-sqlite3` moved to `optionalDependencies`. ([#2447](https://github.com/diegosouzapw/OmniRoute/pull/2447))
- **feat(settings):** Claude Fast Mode toggle in Settings › AI — opt-in toggle that forwards `X-CPA-Force-Fast-Mode` header so a paired CLIProxyAPI build can reach Anthropic Fast Mode (`speed:"fast"`). Model-gated to Opus models matching Anthropic's binary KT() check. ([#2449](https://github.com/diegosouzapw/OmniRoute/pull/2449) — thanks @NomenAK)
- **feat(settings):** Codex Fast Tier — tier dropdown (`default`/`priority`/`flex`) + per-model gate preventing 400 errors from OpenAI when the tier toggle was on for non-Fast-eligible models. ([#2451](https://github.com/diegosouzapw/OmniRoute/pull/2451) — thanks @NomenAK)
- **feat:** align Antigravity 2.0.1 support — updated client profile, upstream headers, and model aliases. ([#2443](https://github.com/diegosouzapw/OmniRoute/pull/2443) — thanks @dhaern)
- **feat:** enhance `extractBearer` to support `x-api-key` for Anthropic API style auth. ([#2436](https://github.com/diegosouzapw/OmniRoute/pull/2436) — thanks @thedtvn)
- **feat(memory):** wire `createMemory` to `upsertSemanticMemoryPoint` (Qdrant). ([#2439](https://github.com/diegosouzapw/OmniRoute/pull/2439) — thanks @NomenAK)

### 🔧 Bug Fixes & Refactors

- **fix(deepseek-web):** rewrite auth to userToken Bearer + WASM PoW solver. ([#2452](https://github.com/diegosouzapw/OmniRoute/pull/2452) — thanks @ovehbe)
- **chore:** update node dependencies and runtime support. ([#2453](https://github.com/diegosouzapw/OmniRoute/pull/2453) — thanks @backryun)
- **fix(translator):** fix 3 Kiro `tool_result` defects causing 400 on follow-up turns — missing `tool_use_id` mapping, orphan result blocks, and conversation ID collision on assistant-first turns. ([#2447](https://github.com/diegosouzapw/OmniRoute/pull/2447))
- **fix(translator):** treat `developer` role as system in OpenAI → Claude translation — `openAIToClaude` now extracts `developer`-role messages into `systemParts` (same as `system`) and filters them from the non-system message list, preventing identity context injected via the Responses API `developer` role from silently becoming an assistant turn when routing to a Claude-format provider. ([#2407](https://github.com/diegosouzapw/OmniRoute/issues/2407))
- **fix(antigravity):** deduplicate `removeHeaderCaseInsensitive` — export canonical implementation from `antigravityClientProfile.ts` and remove the local copy in `antigravity.ts`; export `AntigravityCredentialsLike` type for cross-module use. (#2433 — thanks @Gi99lin)
- **refactor(docs):** enhance frontmatter handling in DocPage — gray-matter Date object parsing bug fix. ([#2448](https://github.com/diegosouzapw/OmniRoute/pull/2448) — thanks @ovehbe)
- **fix(jules):** Jules API parity and cloud-agent provider registration. ([#2438](https://github.com/diegosouzapw/OmniRoute/pull/2438))
- **fix(i18n):** harden diff key extraction tag sanitization in `extract-keys-from-diff.mjs`.
- **chore(i18n):** refresh fr/es/de locales + add missing `settings.update` key. ([#2437](https://github.com/diegosouzapw/OmniRoute/pull/2437))
- **fix(dashboard):** allow bracketed combo names — align dashboard combo-name validator regex with the shared/server schema updated in PR #2354; names like `Claude [1m]` are now accepted in the create/edit form. ([#2458](https://github.com/diegosouzapw/OmniRoute/pull/2458) — thanks @congvc-dev)
- **docs(agentrouter):** recommend native provider as the simple path — guide now prefers the built-in AgentRouter provider instead of manual OpenAI-compatible configuration. ([#2429](https://github.com/diegosouzapw/OmniRoute/pull/2429) — thanks @leninejunior)
- **feat(settings):** surface Codex Fast Tier toggle in Settings › AI — companion UI toggle for the Codex Fast Tier feature. ([#2440](https://github.com/diegosouzapw/OmniRoute/pull/2440) — thanks @NomenAK)

### 🔒 Security Fixes

- **fix(security):** replace `execSync` string-template with `spawnSync` arg-array in `plugin.mjs` — eliminates shell command injection via malicious plugin names.
- **fix(security):** gate Electron CSP `unsafe-eval` on `!app.isPackaged` instead of URL substring match — was leaking `unsafe-eval` into production builds; merged duplicate `connect-src` directives.
- **fix(api):** add `requireManagementAuth` to `/api/usage/budget/bulk` and `/api/resilience/reset` — both endpoints exposed spend data and circuit-breaker controls without auth.
- **fix(security):** route catch-block error messages through `sanitizeErrorMessage()` in `gemini-web`, `claude-web`, `copilot-web` executors, `oauth` route, and cloud-agent task routes — prevents stack traces and internal paths leaking into HTTP responses.
- **fix(codex):** `refreshCredentials` returns `null` (not error-object) on token refresh failure — prevents base executor from spreading `{error}` onto active credentials.
- **fix(tokenRefresh):** safe `unknown`-error access in `catch` block (`error instanceof Error ? error.message : String(error)`).
- **fix(combo):** reset `exhaustedProviders` set at start of each set-retry iteration — providers excluded in a failing pass now get a second chance on retry.
- **fix(circuitBreaker):** persist and restore `lastFailureKind` via the `options` JSON column — kind-based cooldown overrides (`cooldownByKind`) now survive server restarts.

---

## [3.8.0] — 2026-05-06

### 🚀 Post-release hotfixes e contribuições (2026-05-06 → 2026-05-20)

#### 2026-05-20

- **feat(batch):** implement 10 feature requests harvested from issues — T3 Chat Web executor (cookie-based), per-request exhausted-provider tracking (#1731) to skip quota-drained providers mid-combo, Zed Docker detection, API key rotator health dashboard, Kiro multi-account isolation, context-window model filtering, cost blending in combos, combo config tests, provider validation branches, and postinstall support scripts. ([#2414](https://github.com/diegosouzapw/OmniRoute/pull/2414))
- **feat(combos):** add `falloverBeforeRetry` strategy — combo routing now falls over to the next target before retrying the same model, eliminating the tail-latency spike from exhausting all per-model retries on a failing endpoint. Also wraps the retry loop in a `setTry` outer loop for per-target retry coordination. ([#2417](https://github.com/diegosouzapw/OmniRoute/pull/2417) — thanks @hartmark)
- **fix(gamification):** resolve 6 implementation gaps — missing `SELECT` in `checkActionCountBadges` SQL (was silently skipping 8 badges), federation leaderboard auth enforcement, pagination `offset` parameter no longer silently discarded, admin anomaly view now computes real z-scores, `addXp` correctly calculates initial level from XP amount, and barrel `index.ts` for clean module exports. 72-test suite covering all fixes. ([#2421](https://github.com/diegosouzapw/OmniRoute/pull/2421) — thanks @oyi77)
- **docs:** add AgentRouter provider setup guide — step-by-step instructions for connecting OmniRoute to AgentRouter.org's Claude-compatible relay endpoint, covering API key configuration and wire-image headers. ([#2422](https://github.com/diegosouzapw/OmniRoute/pull/2422) — thanks @leninejunior)
- **fix(claude):** drop orphan `tool_result` blocks left behind when `fixToolAdjacency` strips a dangling `tool_use` — resolves HTTP 400 "unexpected tool_use_id in tool_result blocks" from the Anthropic API on truncated histories. `fixToolPairs` now re-runs after every `fixToolAdjacency` pass across all three call sites (`contextManager.ts`, `base.ts`, `claudeCodeCompatible.ts`). (discussion [#2410](https://github.com/diegosouzapw/OmniRoute/discussions/2410))
- **fix(playground):** guard against `null`/non-string model IDs in Playground dropdowns — `typeof m?.id !== "string"` check prevents a silent crash in the provider discovery loop and `filteredModels` computation that was leaving all Playground dropdowns empty when `/v1/models` returned entries with `id: null`; adds deduplication via `Set` to eliminate duplicate React key warnings.
- **fix(mitm):** point MITM runtime manager re-export to the compiled `.js` entrypoint — fixes module resolution after build when the `.ts` source is no longer present.
- **fix(storage):** persist `STORAGE_ENCRYPTION_KEY` across upgrades (closes #1622) — ensures that SQLite encryption keys are preserved during version upgrades. ([#2428](https://github.com/diegosouzapw/OmniRoute/pull/2428) — thanks @Chewji9875)
- **fix(auth):** auto-reset credential `apiKeyHealth` status on successful connection test. ([#2427](https://github.com/diegosouzapw/OmniRoute/pull/2427) — thanks @clousky2020)
- **fix(mitm):** drop `.js` extension on `manager.runtime` re-export to fix webpack packaging issue. ([#2425](https://github.com/diegosouzapw/OmniRoute/pull/2425) — thanks @NomenAK)
- **fix(image):** support Antigravity image generation and add Gemini 3.5 Flash support. ([#2423](https://github.com/diegosouzapw/OmniRoute/pull/2423) — thanks @backryun)

#### 2026-05-19

- **chore(i18n):** comprehensive dashboard i18n coverage — 6 rounds of parallel refactoring replacing hardcoded English/Portuguese text with `t()` calls across 57+ dashboard pages; 420+ new keys added to `en.json` covering `settings`, `playground`, `analytics`, `apiManager`, `providers`, `skills`, `memory`, `agents`, and 15 other namespaces (coverage: ~88%, up from ~20%).
- **fix(offline):** avoid SSR/CSR hydration mismatch on the offline status page — switches from a `useState` lazy initializer (which accessed `navigator.onLine` on the server) to `useSyncExternalStore` with a distinct `false` server snapshot, eliminating the React hydration warning.
- **fix(cli-tools):** guard `modelId` type before calling `.indexOf()` — prevents a `TypeError` when a model entry without a string `id` reaches the comparison logic in CLI Tools.
- **fix(providers):** add missing `isLocalProvider` import and update changelog.
- **fix(resilience):** add API Key health tracking with automatic rotation and UI toast alerts. ([#2412](https://github.com/diegosouzapw/OmniRoute/pull/2412) — thanks @clousky2020)
- **feat(providers):** support Gemini API keys for Gemini CLI executor. ([#2408](https://github.com/diegosouzapw/OmniRoute/pull/2408) — thanks @benzntech)
- **feat(gamification):** implement Gamification & Leaderboard System with non-blocking event-driven updates. ([#2405](https://github.com/diegosouzapw/OmniRoute/pull/2405) — thanks @oyi77)
- **fix(providers):** Kilo Code provider no longer blocks on a missing local `kilocode` CLI binary — the provider uses OAuth device flow + direct HTTPS to `api.kilo.ai` and never required the CLI at runtime; the connection test was hard-failing with "Local CLI runtime is not installed" even when the OAuth token was valid. CLI Tools integration (`/api/cli-tools/kilo-settings`) keeps its own runtime check. ([#2404](https://github.com/diegosouzapw/OmniRoute/issues/2404) — thanks @Flexible78)
- **fix(db):** `bun add -g omniroute` (and other runtimes that skip postinstall) no longer surfaces a generic 500 — `isNativeSqliteLoadError` now also detects "Could not locate the bindings file" / `MODULE_NOT_FOUND`, so the user gets the friendly rebuild guide instead. ([#2358](https://github.com/diegosouzapw/OmniRoute/issues/2358) — thanks @yamansin)
- **fix(kiro):** enable Google OAuth login option in the Kiro auth modal — surfaces the Google SSO button alongside the existing identity providers. ([#2392](https://github.com/diegosouzapw/OmniRoute/pull/2392) — thanks @congvc-dev)
- **fix(security):** drop hashing layer in `sessionPoolKey` after switching to a non-cryptographic key derivation strategy that clears CodeQL alert #247. ([#2396](https://github.com/diegosouzapw/OmniRoute/pull/2396))
- **feat(providers):** Gemini Web cookie-based provider — proxies google.com chat through a session cookie, allowing free Gemini access without API keys. ([#2380](https://github.com/diegosouzapw/OmniRoute/pull/2380) — thanks @oyi77)
- **model:** add Composer 2.5 to the Cursor provider catalog. ([#2381](https://github.com/diegosouzapw/OmniRoute/pull/2381) — thanks @backryun)
- **fix:** `tool_use` without adjacent `tool_result` causes Claude 400 — adjacency guard now also applies inside `compressContext`. ([#2383](https://github.com/diegosouzapw/OmniRoute/pull/2383) — thanks @oyi77)
- **build(deps):** bump `electron` from 42.0.1 to 42.1.0 in `/electron`. ([#2397](https://github.com/diegosouzapw/OmniRoute/pull/2397))
- **build(deps):** production group bumps — 4 updates. ([#2398](https://github.com/diegosouzapw/OmniRoute/pull/2398))
- **build(deps):** development group bumps — 4 updates. ([#2399](https://github.com/diegosouzapw/OmniRoute/pull/2399))
- **chore:** sync `release/v3.8.0` with `main` (CodeQL hotfixes + Dependabot bumps) via merge commit.

#### 2026-05-18

- **fix(security):** resolve CodeQL alerts #243/#244/#245 — incomplete URL substring sanitization and weak crypto signal hardening. ([#2391](https://github.com/diegosouzapw/OmniRoute/pull/2391))
- **fix(security):** switch `sessionPoolKey` derivation to HMAC-SHA256 to clear CodeQL alert #246 (insecure hash for sensitive data). ([#2394](https://github.com/diegosouzapw/OmniRoute/pull/2394))
- **docs(readme):** restore the 9router acknowledgment that was inadvertently dropped during the v3.8.0 README rework. ([#2393](https://github.com/diegosouzapw/OmniRoute/pull/2393))
- **refactor(dashboard):** comprehensive nav, providers, endpoint, runtime, quota, pricing, budget redesign + quota sharing preview (sidebar restructure → 12 collapsible sections, 22 new routes). ([#2384](https://github.com/diegosouzapw/OmniRoute/pull/2384))
- **fix(dashboard):** PR #2384 follow-up review fixes — Runtime quota i18n, Budget projection logic, QuotaShare i18n externalization, Provider Limits semantic markup, bulk endpoint usage. ([#2389](https://github.com/diegosouzapw/OmniRoute/pull/2389))
- **feat(content):** add Haiper, Leonardo, Ideogram, Suno, and Udio as content/media providers. ([#2377](https://github.com/diegosouzapw/OmniRoute/pull/2377) — thanks @oyi77)
- **feat(@omniroute/opencode-provider):** expand config helpers, add MCP entry, live model fetch, and combo builder. ([#2375](https://github.com/diegosouzapw/OmniRoute/pull/2375) — thanks @mrmm)
- **fix(claude-oauth):** enable system-transforms pipeline for the native Claude executor (closes 400 billing-gate). ([#2370](https://github.com/diegosouzapw/OmniRoute/pull/2370) — thanks @thepigdestroyer)
- **feat(content):** extend providers with video, audio, TTS, music capabilities — Pollinations, MiniMax, Together, Replicate across Audio TTS and Transcription registries. ([#2369](https://github.com/diegosouzapw/OmniRoute/pull/2369) — thanks @oyi77)
- **feat(providers):** add Veo AI Free as a web-wrapper provider for generating video, image, and TTS without an API key. ([#2366](https://github.com/diegosouzapw/OmniRoute/pull/2366) — thanks @oyi77)
- **feat(providers):** add Replicate as a free provider for OpenAI-compatible inference with community models. ([#2364](https://github.com/diegosouzapw/OmniRoute/pull/2364) — thanks @oyi77)
- **fix(claude):** avoided redundant deep cloning of Claude Code messages during semantic passthrough preparation, improving memory/CPU efficiency for large histories. ([#2362](https://github.com/diegosouzapw/OmniRoute/pull/2362) — thanks @terence71-glitch)
- **fix(providers):** register `llm7` in the executor registry and route Cohere via OpenAI-compatible layer. ([#2361](https://github.com/diegosouzapw/OmniRoute/pull/2361), [#2360](https://github.com/diegosouzapw/OmniRoute/pull/2360))
- **fix(rate-limiter):** Redis is now opt-in — when `REDIS_URL` is unset, the rate limiter falls back to the in-memory store instead of spamming `ECONNREFUSED`. ([#2357](https://github.com/diegosouzapw/OmniRoute/pull/2357))
- **fix(streaming):** emit protocol-aware stream errors — `createDisconnectAwareStream()` now emits native Responses API or Claude API SSE error blocks based on the client protocol. ([#2355](https://github.com/diegosouzapw/OmniRoute/pull/2355) — thanks @dhaern)
- **fix(combos):** allow bracketed combo names (e.g. `Claude [1m]`) by updating validation schemas. ([#2354](https://github.com/diegosouzapw/OmniRoute/pull/2354) — thanks @congvc-dev)
- **fix(claude-code):** semantic passthrough — preserve Claude Code `messages[]` structure for native Claude OAuth and relay routes. ([#2351](https://github.com/diegosouzapw/OmniRoute/pull/2351) — thanks @terence71-glitch)
- **fix(usage):** extract flat `cached_tokens` and `reasoning_tokens` from OpenAI-compatible usage objects. ([#2350](https://github.com/diegosouzapw/OmniRoute/pull/2350) — thanks @TF0rd)
- **fix(translator):** DeepSeek tool-call response lookup reads cached reasoning before falling back to empty string. ([#2349](https://github.com/diegosouzapw/OmniRoute/pull/2349) — thanks @herjarsa)
- **fix(ui/tooltip):** render in portal + clamp to viewport so tooltips aren't clipped in modal dialogs. ([#2352](https://github.com/diegosouzapw/OmniRoute/pull/2352) — thanks @slider23)
- **fix(auto-routing):** replace bare `getSettings()` with `getCachedSettings` to stop 500 on `auto/*` requests. ([#2346](https://github.com/diegosouzapw/OmniRoute/pull/2346))
- **fix(docker):** ship Dashboard Docs markdown in the container image. ([#2348](https://github.com/diegosouzapw/OmniRoute/pull/2348))
- **fix(combo/validator):** treat upstream responses carrying a non-empty `reasoning_content` as valid output. ([#2341](https://github.com/diegosouzapw/OmniRoute/pull/2341))
- **fix(account-fallback):** classify Anthropic `Usage Limit Reached` as `QUOTA_EXHAUSTED` with a 1h cooldown. ([#2321](https://github.com/diegosouzapw/OmniRoute/pull/2321))
- **feat(providers):** add GitHub Models as a free provider — GPT-5, o-series, DeepSeek-R1, Llama 4, Grok 3. ([#2344](https://github.com/diegosouzapw/OmniRoute/pull/2344) — thanks @oyi77)
- **feat(providers):** add Hackclub AI as a free provider — 30+ models, no credit card required. ([#2339](https://github.com/diegosouzapw/OmniRoute/pull/2339) — thanks @oyi77)
- **feat(providers):** add Microsoft Copilot Web executor — WebSocket-based provider. ([#2340](https://github.com/diegosouzapw/OmniRoute/pull/2340) — thanks @oyi77)
- **feat(routing):** LKGP stores last known good account `connectionId` alongside provider. ([#2338](https://github.com/diegosouzapw/OmniRoute/pull/2338) — thanks @oyi77)
- **feat(dashboard):** add Claude Code auth import/export UI + i18n (three-PR series: libs, API routes, dashboard UI).
- **feat(dashboard):** add Gemini CLI auth import/export UI + i18n (three-PR series: libs, API routes, dashboard UI).
- **fix(routing):** implement embedding combos, local provider validation bypass, and resolve migration collisions.
- **fix(build):** import Monaco ESM API to fix webpack `nls.messages-loader` error.
- **fix(ui):** v3.8.0 polish — connections border, sticky tabs, EN translations, save toasts, auto-combo catalog. ([#2305](https://github.com/diegosouzapw/OmniRoute/pull/2305) — thanks @mrmm)
- **fix(auth+build):** Bearer manage scope on management routes + lazy-load deepseek PoW solver. ([#2308](https://github.com/diegosouzapw/OmniRoute/pull/2308) — thanks @mrmm)
- **fix(claude):** guard orphan tool_use/tool_result pairs before upstream send. ([#2312](https://github.com/diegosouzapw/OmniRoute/pull/2312) — thanks @mrmm)
- **fix(ui):** remove count from batch removal button. ([#2309](https://github.com/diegosouzapw/OmniRoute/pull/2309) — thanks @hartmark)
- **fix:** remove implicit API key request caps — removes default 1K/5K/20K rate caps. ([#2289](https://github.com/diegosouzapw/OmniRoute/pull/2289) — thanks @josephvoxone)
- **fix(sse):** strip stale `Content-Encoding`, `Content-Length`, and `Transfer-Encoding` headers on non-streaming forward. ([#2264](https://github.com/diegosouzapw/OmniRoute/pull/2264) — thanks @gleber)
- **chore(providers):** refresh provider model metadata and ordering. ([#2318](https://github.com/diegosouzapw/OmniRoute/pull/2318) — thanks @backryun)
- **chore(providers):** consolidate Alibaba provider entries. ([#2319](https://github.com/diegosouzapw/OmniRoute/pull/2319) — thanks @backryun)
- **fix(streaming):** harden stream readiness detection. ([#2317](https://github.com/diegosouzapw/OmniRoute/pull/2317) — thanks @dhaern)
- **fix(v1/messages):** default to non-streaming when `stream` field is absent for Anthropic format. ([#2326](https://github.com/diegosouzapw/OmniRoute/pull/2326) — thanks @thepigdestroyer)
- **fix(claude):** `fitThinkingToMaxTokens` caps thinking budget to model's output ceiling. ([#2327](https://github.com/diegosouzapw/OmniRoute/pull/2327) — thanks @thepigdestroyer)
- **fix(codex):** Codex reasoning priority resolves `modelEffort` before `explicitReasoning`. ([#2335](https://github.com/diegosouzapw/OmniRoute/pull/2335) — thanks @terence71-glitch)
- **fix(providers):** providers page no longer deadlocks when no providers are configured. ([#2329](https://github.com/diegosouzapw/OmniRoute/pull/2329) — thanks @slider23)
- **chore(providers):** update HuggingFace to use the new `/v1/` router endpoint. ([#2322](https://github.com/diegosouzapw/OmniRoute/pull/2322) — thanks @backryun)
- **fix(security):** resolve CodeQL ReDoS + URL sanitization alerts.
- **fix(auth):** stop retrying unrecoverable token refresh failures and include connection id in token health check credentials.
- **fix(auth):** return synthetic credentials for noAuth free providers and show no-auth card in dashboard instead of OAuth modal.
- **fix(endpoint):** replace nested `<button>` with `<div role=button>` in tunnel toggle rows to fix hydration warnings.
- **fix(migrations):** resolve version collision at migration slot 056 and add batch deletion API. ([#2294](https://github.com/diegosouzapw/OmniRoute/pull/2294) — thanks @hartmark)
- **feat(batch):** global rate-limit header cache with 60s TTL + 24h retry window. ([#2299](https://github.com/diegosouzapw/OmniRoute/pull/2299) — thanks @hartmark)
- **feat(cc-bridge):** config-driven per-provider system-block transform DSL. ([#2286](https://github.com/diegosouzapw/OmniRoute/pull/2286), closes #2260 — thanks @mrmm)
- **feat(deepseek-web):** full DeepSeek web API executor with Keccak PoW solver. ([#2295](https://github.com/diegosouzapw/OmniRoute/pull/2295) — thanks @oyi77)
- **feat(i18n):** add Azerbaijani (az / 🇦🇿) language support — new locale in `config/i18n.json`, 42 total supported languages.
- **build(deps):** bump `actions/checkout` from 4 to 6 in CI workflows. ([#2288](https://github.com/diegosouzapw/OmniRoute/pull/2288))

#### 2026-05-17

- **fix(codex):** bulk import Codex `auth.json` — multi-file upload, paste-from-clipboard, and ZIP archive support. ([#2343](https://github.com/diegosouzapw/OmniRoute/pull/2343))
- **feat(codex):** import single Codex `auth.json` as an OAuth connection (one-click migration from Codex Desktop). ([#2336](https://github.com/diegosouzapw/OmniRoute/pull/2336))
- **feat(codex-auth):** rename `export` action + gate "Apply Local" behind a confirmation modal to prevent accidental local config overwrite. ([#2332](https://github.com/diegosouzapw/OmniRoute/pull/2332))
- **fix(providers):** providers page empty-state — missing i18n keys and "Add Provider" CTA so first-time users can add a provider. ([#2333](https://github.com/diegosouzapw/OmniRoute/pull/2333), [#2337](https://github.com/diegosouzapw/OmniRoute/pull/2337))
- **fix(providers):** Fix Providers empty state blocking first provider setup. (thanks @slider23)
- **feat(providers):** bulk add API keys with Single/Bulk tabs.
- **feat(ui):** comprehensive dashboard UX rework including simple/advanced modes for RTK/Caveman, human-readable error badges, InfoTooltip/PresetSlider shared components, sidebar subtitles, and provider category filters. ([#2315](https://github.com/diegosouzapw/OmniRoute/pull/2315), [#2316](https://github.com/diegosouzapw/OmniRoute/pull/2316) — thanks @oyi77)
- **feat(provider):** add Gitlawb Opengateway provider (xiaomi-mimo + gmi-cloud) with hasFree flag support. ([#2314](https://github.com/diegosouzapw/OmniRoute/pull/2314) — thanks @oyi77)
- **feat(i18n):** add simple/advanced mode keys and missing provider filter keys (`allProviders`, `audioProviders`, `showFreeOnly`).

#### 2026-05-16

- **feat(deepseek-web):** full DeepSeek web API executor with PoW solver — also landed via PR #2295. (thanks @oyi77)
- **feat(batch):** global rate-limit header cache with 60s TTL — also via #2299.
- **feat(cc-bridge):** config-driven per-provider system-block transform DSL — also via #2286.
- **feat(dashboard):** provider summary card, free test button, sidebar order, i18n fix.
- **feat(dashboard):** A2A audit page, stats bar on MCP audit, sidebar deduplication.
- **feat(skills):** add 5 CLI skill manifests + AgentSkills / OmniSkills dashboard pages. ([#2284](https://github.com/diegosouzapw/OmniRoute/pull/2284))
- **fix(translator):** map `developer` → `system` by default for non-OpenAI-family providers. ([#2281](https://github.com/diegosouzapw/OmniRoute/pull/2281))
- **fix(api/combos):** add API-key-safe `GET /v1/combos` endpoint. ([#2300](https://github.com/diegosouzapw/OmniRoute/pull/2300))
- **fix(embeddings/registry):** add DeepInfra to the embedding provider registry. ([#2298](https://github.com/diegosouzapw/OmniRoute/pull/2298))
- **fix(opencode-zen):** flag `qwen3.6-plus` and `qwen3.6-plus-free` with `targetFormat: "claude"`. ([#2292](https://github.com/diegosouzapw/OmniRoute/pull/2292))
- **fix(settings):** default `debugMode` to `true` on fresh installations.
- **fix(sse):** remove dead-code flag leak in `claudeCodeToolRemapper`. ([#2290](https://github.com/diegosouzapw/OmniRoute/pull/2290) — thanks @thepigdestroyer)
- **fix(sse):** strip stale `Content-Encoding`, `Content-Length`, `Transfer-Encoding` from upstream responses. ([#2291](https://github.com/diegosouzapw/OmniRoute/pull/2291) — thanks @thepigdestroyer)
- **fix(migrations):** resolve version collisions and add schema repair for quota thresholds.

#### 2026-05-15

- **feat(cli):** CLI v4 — Commander.js architecture, 50+ commands, interactive TUI, full i18n (42 locales), plugin system (Fases 0–9). ([#2280](https://github.com/diegosouzapw/OmniRoute/pull/2280))
- **feat(skills):** publish 3 operational SKILL.md manifests + AI Skills dashboard entry. ([#2276](https://github.com/diegosouzapw/OmniRoute/pull/2276))
- **feat(termux):** Android/Termux headless support — auto-detect Android platform for headless mode. ([#2273](https://github.com/diegosouzapw/OmniRoute/pull/2273) — thanks @t-way666)
- **feat(limits):** per-window quota cutoffs across all providers with usage data. ([#2267](https://github.com/diegosouzapw/OmniRoute/pull/2267) — thanks @payne0420)
- **feat(api-keys):** configurable default rate limits via `DEFAULT_RATE_LIMIT_PER_DAY` env var. ([#2266](https://github.com/diegosouzapw/OmniRoute/pull/2266) — thanks @gleber)
- **feat(authz):** `managementPolicy` accepts API keys with `manage` scope. ([#2265](https://github.com/diegosouzapw/OmniRoute/pull/2265) — thanks @gleber)
- **feat(mcp):** MCP accessibility-tree smart filter engine — collapses ≥30 repeated sibling lines, 60-80% token savings.
- **feat(auth):** CLI machine-ID HMAC-SHA256 token for zero-friction local auth without JWT/password.
- **feat(security):** route protection tiers — 5 tiers: public/read-only/protected/always/local-only.
- **feat(compression):** Caveman `SHARED_BOUNDARIES` — all 6 languages × 3 intensities embed boundary clause.
- **feat(runtime):** dynamic SQLite 5-step fallback chain — bundled → runtime-installed → lazy-install → node:sqlite → sql.js.
- **feat(cli):** standalone system tray with PowerShell fallback on Windows (`omniroute --tray`).
- **fix(providers/command-code):** send required `skills` and `stream` payload fields. ([#2271](https://github.com/diegosouzapw/OmniRoute/pull/2271) — thanks @ddarkr)
- **chore:** ignore `.playwright-mcp/` generated artifacts. ([#2269](https://github.com/diegosouzapw/OmniRoute/pull/2269) — thanks @backryun)
- **chore:** tidy up deprecated models from Windsurf provider registry. ([#2279](https://github.com/diegosouzapw/OmniRoute/pull/2279) — thanks @backryun)
- **chore(deps):** node dependency updates. ([#2259](https://github.com/diegosouzapw/OmniRoute/pull/2259) — thanks @backryun)
- **build(deps):** bump `mermaid` from 11.14.0 to 11.15.0. ([#2178](https://github.com/diegosouzapw/OmniRoute/pull/2178))

#### 2026-05-08 a 2026-05-14

- **feat(guardrails/vision-bridge):** add `VISION_BRIDGE_BASE_URL` + `VISION_BRIDGE_API_KEY` env overrides for non-Anthropic vision-bridge routing. ([#2232](https://github.com/diegosouzapw/OmniRoute/pull/2232))
- **feat(claude-web):** implement session-based Claude Web executor with auto-refresh authentication. ([#2283](https://github.com/diegosouzapw/OmniRoute/pull/2283) — thanks @oyi77)
- **refactor(@omniroute/opencode-provider):** complete rewrite of the npm helper — tsup build (CJS + ESM + `.d.ts`), schema-correct output, `baseURL` deduplication, input validation, 13 unit tests. Versioned as `0.1.0`.
- **BREAKING:** dropped Node 20.x support. Minimum Node version is now 22.22.2 (or 24.0.0+).
- **fix(auth):** accept `x-api-key` header in `extractApiKey` so Anthropic-native clients hit the same per-key policy enforcement. ([#2225](https://github.com/diegosouzapw/OmniRoute/pull/2225))
- **fix(translator/claude-to-openai):** stop including `cache_creation_input_tokens` in `prompt_tokens`. ([#2215](https://github.com/diegosouzapw/OmniRoute/pull/2215))
- **fix(kiro):** harden OpenAI-to-Kiro translator for API compliance. ([#2251](https://github.com/diegosouzapw/OmniRoute/pull/2251) — thanks @8mbe)
- **fix(models):** sync managed model aliases with provider model visibility. ([#2250](https://github.com/diegosouzapw/OmniRoute/pull/2250) — thanks @InkshadeWoods)
- **fix(models/cleanup):** align managed model cleanup for imported models. ([#2261](https://github.com/diegosouzapw/OmniRoute/pull/2261) — thanks @InkshadeWoods)
- **fix(executor/claude-code):** store tool-name round-trip metadata in non-enumerable `_toolNameMap`. ([#2254](https://github.com/diegosouzapw/OmniRoute/pull/2254) — thanks @Rikonorus)
- **fix(streaming):** strip upstream `Content-Encoding`, `Content-Length`, `Transfer-Encoding` headers from SSE responses. ([#2253](https://github.com/diegosouzapw/OmniRoute/pull/2253) — thanks @Rikonorus)
- **fix(security):** remediate CodeQL vulnerabilities (ReDoS, cryptographic bias, stack trace exposure, weak password hashing). ([#216](https://github.com/diegosouzapw/OmniRoute/issues/216), [#215](https://github.com/diegosouzapw/OmniRoute/issues/215), [#211](https://github.com/diegosouzapw/OmniRoute/issues/211), [#208](https://github.com/diegosouzapw/OmniRoute/issues/208), [#206](https://github.com/diegosouzapw/OmniRoute/issues/206), [#210](https://github.com/diegosouzapw/OmniRoute/issues/210))
- **fix(providers/blackbox-web):** add `BLACKBOX_WEB_VALIDATED_TOKEN` env override and 403 token-error disambiguation. ([#2252](https://github.com/diegosouzapw/OmniRoute/pull/2252))
- **fix(auth):** `REQUIRE_API_KEY=false` invalid Bearer no longer 401s the whole request. ([#2257](https://github.com/diegosouzapw/OmniRoute/pull/2257))
- **feat(resilience):** add model cooldowns dashboard card with real-time list, individual/bulk re-enable, and auto-refresh.
- **feat(resilience):** `useUpstream429BreakerHints` toggle. ([#2133](https://github.com/diegosouzapw/OmniRoute/pull/2133) — thanks @eleata)
- **feat(auto):** zero-config auto-routing with `auto/` prefix — dynamic virtual combo from connected providers with 6 variant profiles. ([#2131](https://github.com/diegosouzapw/OmniRoute/pull/2131) — thanks @oyi77)
- **feat(kiro):** headless auth via kiro-cli SQLite, image support, tool overflow handling, model list sync. ([#2129](https://github.com/diegosouzapw/OmniRoute/pull/2129) — thanks @christlau)
- **feat(cursor):** surface Cursor Pro plan usage on provider-limits dashboard. ([#2128](https://github.com/diegosouzapw/OmniRoute/pull/2128) — thanks @payne0420)
- **feat(mitm):** dynamic Linux certificate path detection for multi-distro MITM cert trust. ([#2134](https://github.com/diegosouzapw/OmniRoute/pull/2134) — thanks @flyingmongoose)
- **feat(1proxy):** add dedicated settings tab with proxy rotation support. ([#2135](https://github.com/diegosouzapw/OmniRoute/pull/2135) — thanks @oyi77)
- **feat(responses):** degrade `background: true` to synchronous execution with a warning. ([#2164](https://github.com/diegosouzapw/OmniRoute/pull/2164) — thanks @Yosee11)
- **feat(api):** aggregate combo model metadata in catalog endpoint. ([#2166](https://github.com/diegosouzapw/OmniRoute/pull/2166) — thanks @faisalill)
- **feat(oauth):** complete Windsurf and Devin CLI OAuth + API-token flows. ([#2168](https://github.com/diegosouzapw/OmniRoute/pull/2168) — thanks @Zhaba1337228)
- **feat(antigravity):** support custom Google Cloud project ID. ([#2227](https://github.com/diegosouzapw/OmniRoute/pull/2227) — thanks @nickwizard)
- **feat(cli):** CLI Integration Suite — 5 new management commands, 3 API endpoints, config generators for 6 tools. ([#2240](https://github.com/diegosouzapw/OmniRoute/pull/2240) — thanks @oyi77)
- **fix(sanitizer):** preserve `reasoning_content` on assistant messages with `tool_calls`. ([#2140](https://github.com/diegosouzapw/OmniRoute/pull/2140) — thanks @DavyMassoneto)
- **fix(catalog):** ensure individual models expose `context_length` via `getTokenLimit()` fallback chain. ([#2136](https://github.com/diegosouzapw/OmniRoute/pull/2136) — thanks @herjarsa)
- **fix(docker):** remove docs directory from `.dockerignore`. ([#2137](https://github.com/diegosouzapw/OmniRoute/pull/2137), [#2120](https://github.com/diegosouzapw/OmniRoute/pull/2120) — thanks @hartmark)
- **fix(providers):** restore cloud agent provider exports and logger import. ([#2138](https://github.com/diegosouzapw/OmniRoute/pull/2138) — thanks @backryun)
- **fix(providers):** remove duplicate `CLOUD_AGENT_PROVIDERS` declaration. ([#2141](https://github.com/diegosouzapw/OmniRoute/pull/2141) — thanks @backryun)
- **fix(translator):** preserve `body.system` in openai→claude when Claude Code sends native format. ([#2130](https://github.com/diegosouzapw/OmniRoute/pull/2130))
- **fix(authz):** classify `/dashboard/onboarding` as PUBLIC to unblock setup wizard. ([#2127](https://github.com/diegosouzapw/OmniRoute/pull/2127))
- **fix(i18n):** complete Simplified Chinese translations. ([#2115](https://github.com/diegosouzapw/OmniRoute/pull/2115) — thanks @boa-z)
- **fix(sse):** classify hour quota errors as QUOTA_EXHAUSTED. ([#2119](https://github.com/diegosouzapw/OmniRoute/pull/2119) — thanks @clousky2020)
- **fix(sse):** fix CC-compatible streaming bridge. ([#2118](https://github.com/diegosouzapw/OmniRoute/pull/2118) — thanks @rdself)
- **fix(cliproxyapi):** detect Anthropic-shaped request bodies and route to `/v1/messages`. ([#2165](https://github.com/diegosouzapw/OmniRoute/pull/2165) — thanks @Brkic-Nikola)
- **fix(claudeHelper):** preserve latest assistant thinking blocks verbatim. ([#2224](https://github.com/diegosouzapw/OmniRoute/pull/2224) — thanks @NomenAK)
- **fix(deepseek):** preserve `reasoning_content` through full pipeline for DeepSeek V4 models. ([#2231](https://github.com/diegosouzapw/OmniRoute/pull/2231) — thanks @kang-heewon)
- **fix(chatcore):** stop leaking provider credentials in response headers.
- **fix(export):** exclude telemetry/usage-history tables from JSON config backups by default. ([#2125](https://github.com/diegosouzapw/OmniRoute/pull/2125))
- **build(deps):** regenerate `package-lock.json` to match `http-proxy-middleware` 4.x bump. ([#2228](https://github.com/diegosouzapw/OmniRoute/pull/2228) — thanks @NomenAK)

#### 2026-05-06 a 2026-05-07 (lançamento inicial v3.8.0)

- **feat(zed):** Zed IDE Docker support — when OmniRoute runs in Docker and Zed is on the host, the Import flow now returns a 422 with `zedDockerEnvironment: true` and the dashboard auto-expands a Manual Token Import panel (new `POST /api/providers/zed/manual-import` endpoint with Zod validation). Includes Docker detection utility (`/.dockerenv` + cgroup heuristics) and a setup guide at [`docs/providers/ZED-DOCKER.md`](docs/providers/ZED-DOCKER.md). ([#2306])
- **feat(workflow):** `/implement-features` gains pre-flight triage script (`scripts/features/feature-triage.mjs`) classifying open feature requests into 8 buckets — fresh issues (<14d) stay dormant to give the community time to react, engagement override (≥5 👍 or ≥3 unique non-bot commenters) absorbs early, already-delivered detection via merged PRs + CHANGELOG + git log closes issues with version + PR reference, stale `need_details/` (>30d) is closed politely, aged `defer/` (>90d) is re-evaluated, and externally-closed issues clean up `_ideia/` automatically. Idea files now carry a YAML frontmatter snapshot enabling incremental comment re-sync. 53 unit tests cover the new logic.
- **feat(providers):** add GitHub Models as a free provider — GPT-5, o-series, DeepSeek-R1, Llama 4, Grok 3 with GitHub PAT auth and dynamic model fetch from `api.github.com`. ([#2344](https://github.com/diegosouzapw/OmniRoute/pull/2344) — thanks @oyi77)
- **feat(providers):** add Hackclub AI as a free provider — 30+ models, no credit card required, optional API key auth with passthrough model support. ([#2339](https://github.com/diegosouzapw/OmniRoute/pull/2339) — thanks @oyi77)
- **feat(providers):** add Microsoft Copilot Web executor — WebSocket-based provider translating OpenAI chat completions to Copilot's proprietary event protocol with per-token session pool isolation. ([#2340](https://github.com/diegosouzapw/OmniRoute/pull/2340) — thanks @oyi77)
- **feat(routing):** LKGP stores last known good account `connectionId` alongside provider — combo routing now prioritizes the exact connection that last succeeded, with graceful provider-level fallback for old records. ([#2338](https://github.com/diegosouzapw/OmniRoute/pull/2338) — thanks @oyi77)
- **feat(i18n):** add Azerbaijani (az / 🇦🇿) language support — new locale in `config/i18n.json` (source of truth), `src/i18n/messages/az.json` (UI strings), `docs/i18n/az/` (full documentation set), README language bar, docs i18n index, and both translation pipeline scripts (`generate-multilang.mjs`, `i18n_autotranslate.py`). Total supported languages: **42**.
- **feat(limits):** per-window quota cutoffs across all providers with usage data — operators can set per-quota-window thresholds (e.g. `session=95%, weekly=80%`) with cascading resolver (connection → provider default → global 98%) and zero-latency gate when nothing is configured. New migration 056, new `GET /api/providers/quota-windows` endpoint, and Dashboard › Limits cutoff modal. ([#2267](https://github.com/diegosouzapw/OmniRoute/pull/2267) — thanks @payne0420)
- **feat(api-keys):** configurable default rate limits via `DEFAULT_RATE_LIMIT_PER_DAY` env var — replaces hardcoded 1000/day fallback with Zod-validated configuration while preserving secure defaults for existing deployments. ([#2266](https://github.com/diegosouzapw/OmniRoute/pull/2266) — thanks @gleber)
- **feat(authz):** `managementPolicy` accepts API keys with `manage` scope — enables headless/programmatic management (provisioning providers, setting rate limits) without a browser session. ([#2265](https://github.com/diegosouzapw/OmniRoute/pull/2265) — thanks @gleber)
- **feat(termux):** Android/Termux headless support — auto-detect Android platform for headless mode (no browser open), move `wreq-js` and `tls-client-node` to `optionalDependencies` for ARM compatibility, lazy-load WS proxy with graceful 503 when unavailable, set `GYP_DEFINES` for `better-sqlite3` ARM build, extended build timeout to 600s. ([#2273](https://github.com/diegosouzapw/OmniRoute/pull/2273) — thanks @t-way666)
- **feat(deepseek-web):** full DeepSeek web API executor with Keccak PoW solver (`DeepSeekHashV1`), SSE streaming, and auto-refresh session management via `ds_session_id`. ([#2295](https://github.com/diegosouzapw/OmniRoute/pull/2295) — thanks @oyi77)
- **feat(cc-bridge):** config-driven per-provider system-block transform DSL — operators can now configure system prompt transformations per-provider via Dashboard settings UI. ([#2286](https://github.com/diegosouzapw/OmniRoute/pull/2286), closes #2260 — thanks @mrmm)
- **feat(batch):** global rate-limit header cache with 60s TTL + 24h time-based retry window — shares rate-limit throttle state across sequential batches and uses time-based retry limits for robust large-batch processing. ([#2299](https://github.com/diegosouzapw/OmniRoute/pull/2299) — thanks @hartmark)
- **feat(providers):** improve Cohere provider support, expanding models and accurately updating OpenAI context limits. ([#2313](https://github.com/diegosouzapw/OmniRoute/pull/2313) — thanks @backryun)
- **feat(claude-web):** implement session-based Claude Web executor with auto-refresh authentication — enables direct Claude Web API access without an API key. ([#2283](https://github.com/diegosouzapw/OmniRoute/pull/2283) — thanks @oyi77)
- **feat(skills):** add 5 CLI skill manifests + AgentSkills / OmniSkills dashboard pages — enables external AI agents to discover and invoke OmniRoute capabilities. ([#2284](https://github.com/diegosouzapw/OmniRoute/pull/2284))
- **feat(providers):** add llama.cpp as local provider — `llama-cpp` (alias `llamacpp`) added to `LOCAL_PROVIDERS` and `SELF_HOSTED_CHAT_PROVIDER_IDS`; default base URL `http://127.0.0.1:8080/v1`; no API key required; uses the default OpenAI-compatible executor ([#1980](https://github.com/diegosouzapw/OmniRoute/issues/1980))
- **feat(providers):** bulk add API keys with Single/Bulk tabs.
- **feat(provider):** add Gitlawb Opengateway provider (xiaomi-mimo + gmi-cloud) with hasFree flag support. ([#2314](https://github.com/diegosouzapw/OmniRoute/pull/2314) — thanks @oyi77)
- **feat(ui):** comprehensive dashboard UX rework including simple/advanced modes for RTK/Caveman, human-readable error badges, InfoTooltip/PresetSlider shared components, sidebar subtitles, and provider category filters. ([#2315](https://github.com/diegosouzapw/OmniRoute/pull/2315), [#2316](https://github.com/diegosouzapw/OmniRoute/pull/2316) — thanks @dhaern, @oyi77)
- **feat(i18n):** add simple/advanced mode keys and missing provider filter keys (`allProviders`, `audioProviders`, `showFreeOnly`).
- **feat(cli):** full i18n support — 42 locales, `--lang` flag, `config lang get/set/list` commands for CLI language selection. ([#2285](https://github.com/diegosouzapw/OmniRoute/pull/2285))
- **feat(claude-code):** semantic passthrough for Claude Code `/v1/messages` payloads — preserves client `messages[]` structure (document blocks, tool_use/tool_result chains, cache_control, unknown content types) for native Claude OAuth and `anthropic-compatible-cc-*` relay routes, skipping broad normalization that could rewrite valid Claude Code semantics. ([#2351](https://github.com/diegosouzapw/OmniRoute/pull/2351) — thanks @terence71-glitch)

### Changed

- **CLI**: Refactored architecture to use Commander.js as framework. Monolith `bin/cli-commands.mjs` (2853 lines) removed — commands now live individually in `bin/cli/commands/`. No breaking changes in normal usage; all previously listed subcommands continue working.
- **API keys**: keys without explicit rate-limit rules continue to receive the legacy default safety net (`1000/day`, `5000/week`, `20000/month`). Operators that need the previous uncapped behavior can set `DEFAULT_RATE_LIMIT_PER_DAY=0`; positive values scale the daily/weekly/monthly defaults from that daily limit.
- **Cloud features**: fresh installations now start with Cloud disabled by default. Existing deployments with a persisted `cloudEnabled` setting are unchanged; operators can enable Cloud again from Dashboard settings.

### Removed

- `bin/cli-commands.mjs` — replaced by modular structure in `bin/cli/commands/`.
- `bin/cli/index.mjs` — replaced by `bin/cli/program.mjs` + `bin/cli/commands/registry.mjs`.
- `bin/cli/args.mjs` — replaced by Commander.js native parsing support.

- **refactor(@omniroute/opencode-provider):** complete rewrite of the npm helper. The `1.0.0` artifact was non-functional — `index.js` re-exported from `.ts` (unrunnable at install time) and the emitted shape didn't match the OpenCode `https://opencode.ai/config.json` schema. The new release ships a real `tsup` build (CJS + ESM + `.d.ts`), schema-correct output (`npm: "@ai-sdk/openai-compatible"`, with `models` catalog), `baseURL` deduplication (no more `/v1/v1`), input validation, 13 unit tests, and full documentation in [`docs/frameworks/OPENCODE.md`](docs/frameworks/OPENCODE.md). Versioned as `0.1.0` to signal the pre-1.0 reset.
- **chore(npm):** [`@omniroute/opencode-provider@0.1.0`](https://www.npmjs.com/package/@omniroute/opencode-provider) published to npmjs.com under the new `@omniroute` org. Install with `npm install --save-dev @omniroute/opencode-provider`.
- **BREAKING**: dropped Node 20.x support. Minimum Node version is now 22.22.2 (or 24.0.0+). Required because http-proxy-middleware 4.x requires `node >=22.15.0`. Users on Node 20 must upgrade — see [`package.json` engines field](package.json) and the README Node badge.

### Security

- **fix(oauth/windsurf):** Windsurf Firebase token refresh now reads `WINDSURF_CONFIG.firebaseApiKey` instead of `process.env.WINDSURF_FIREBASE_API_KEY` directly.
- **fix(kiro/translator):** assistant-first conversations no longer collide on a single `conversationId`.
- **fix(utils/publicCreds):** `decodePublicCred()` no longer silently mangles raw credential overrides that don't match `RAW_VALUE_PATTERN`.
- **fix(auth/extractApiKey):** `x-api-key` fallback now only triggers when the request also carries an `anthropic-version` header.
- **fix(providers/qoder):** the OAuth+PAT disambiguation message now actually surfaces.
- **fix(authz/clientApi):** when `REQUIRE_API_KEY=false`, an invalid Bearer no longer 401s the whole request — falls through to anonymous (matching the "no auth required" semantics of the flag) with a single warning log carrying the masked key id. Fixes the surprise 401s that hit CLI integrations (Codex Desktop auto-config, Hermes Agent) that ship a stale Bearer in their saved config. (#2257)

### Fixed

- **fix(providers/llm7):** add `llm7` to the executor registry (`open-sse/config/providerRegistry.ts`). The provider was advertised in the dashboard catalog but missing from the executor table, so every connection test failed with a credential error. Now routes through the standard OpenAI-compatible `https://api.llm7.io/v1/chat/completions` endpoint with optional bearer auth. (#2361)
- **fix(providers/cohere):** switch the Cohere upstream from `https://api.cohere.com/v2/chat` (native shape) to `https://api.cohere.com/compatibility/v1/chat/completions` (OpenAI-compatible). The native endpoint returned `{ message: { content: [...] } }` which the combo test validator could not read, surfacing as `Provider returned HTTP 200 but no text content.` (#2360)
- **fix(combo/dispatch):** add defensive `typeof target.modelStr === "string"` guards around the LKGP fallback findIndex and the combo test target builder. Combo entries whose `modelStr` failed to resolve at routing time (regression after #2338 added per-account LKGP) used to crash the request with `TypeError: e.startsWith is not a function`; we now surface a clean error instead. (#2359)
- **fix(rate-limiter):** Redis is now opt-in. When `REDIS_URL` is unset, the rate limiter and API-key auth cache fall back silently to the in-memory store instead of spamming `connect ECONNREFUSED 127.0.0.1:6379` for every request. Connection-error logging is also deduped so docker logs no longer flood under sustained outage. Single-instance deployments work out of the box; multi-instance deployments continue to use Redis when `REDIS_URL` is provided. (#2357)
- **fix(auto-routing):** stop the `ReferenceError: getSettings is not defined` 500 that every `auto` / `auto/*` request raised. `src/sse/handlers/chat.ts` called the bare `getSettings` symbol without importing it; replaced with the already-imported `getCachedSettings` (same shape, plus the auto-routing hot path benefits from the cache). (#2346)
- **fix(combo/validator):** treat upstream responses carrying a non-empty `reasoning_content` (or `reasoning`) field as valid output, even when `content` is null. Reasoning models like `moonshotai/Kimi-K2.5-TEE`, `zai-org/GLM-5-TEE`, and the QwQ family put their answer in `reasoning_content` only — the quality validator was rejecting them with `502: empty content` and triggering unnecessary combo fallbacks. (#2341)
- **fix(docker):** the Dashboard Docs viewer now actually has documents to show. `.dockerignore` was hiding every file under `docs/` except `openapi.yaml`, so the in-product `/docs/*` viewer threw `ENOENT: no such file or directory, open '/app/docs/...'` for every page. We now ship the ~5 MB English markdown tree and still exclude the ~45 MB of translations/screenshots/raster diagrams that were the original optimization target. (#2348)
- **fix(account-fallback):** Anthropic OAuth (Claude Code Pro/Team) 429 responses carrying phrases like `Usage Limit Reached`, `Claude Pro usage limit reached`, or `you've reached your usage limit` are now classified as `QUOTA_EXHAUSTED` with a 1h cooldown instead of `RATE_LIMIT_EXCEEDED` with a ~5s transient backoff. Previously every Claude Pro account cascaded into a tight retry loop until the 5h subscription window genuinely reset. Also honors absolute ISO timestamps embedded in the error body (`Try again at 2026-05-17T10:00:00Z`) so the cooldown matches the upstream's stated recovery time. (#2321)
- **fix(ui/tooltip):** the shared `<Tooltip>` component now renders into a React portal anchored to `document.body` by default, so tooltips in modal dialogs (combo editor, etc.) are no longer clipped by `overflow:hidden` ancestors. Adds an optional `multiline` prop that swaps the legacy `whitespace-nowrap` clamp for `max-w-xs whitespace-normal break-words` when the label is long. Coordinates are clamped to the viewport so triggers near the right edge don't bleed off-screen. (#2352)
- **fix(claude):** avoided redundant deep cloning of Claude Code messages during semantic passthrough preparation, improving memory/CPU efficiency for large histories. ([#2362](https://github.com/diegosouzapw/OmniRoute/pull/2362) — thanks @terence71-glitch)
- **fix(streaming):** emit protocol-aware stream errors — `createDisconnectAwareStream()` now emits native Responses API (`response.failed`) or Claude API (`event: error`) SSE error blocks based on the client protocol instead of falling back to raw Chat Completions chunks, resolving upstream client parse failures on mid-stream disconnects. ([#2355](https://github.com/diegosouzapw/OmniRoute/pull/2355) — thanks @dhaern)
- **fix(combos):** allow bracketed combo names (e.g. `Claude [1m]`) by updating validation schemas and pinning exact combo lookup behavior before model suffix parsing. ([#2354](https://github.com/diegosouzapw/OmniRoute/pull/2354) — thanks @congvc-dev)
- **fix(v1/messages):** `POST /v1/messages` now defaults to non-streaming when the `stream` field is absent and the Anthropic source format is detected — prevents `STREAM_EARLY_EOF` errors from Anthropic SDK clients that omit the field per spec. ([#2326](https://github.com/diegosouzapw/OmniRoute/pull/2326) — thanks @thepigdestroyer)
- **fix(claude):** `fitThinkingToMaxTokens` caps thinking budget to the model's output ceiling — eliminates HTTP 400 from Anthropic when `max_tokens + budget` exceeds model limits (e.g. Opus 4.7's 128K ceiling). ([#2327](https://github.com/diegosouzapw/OmniRoute/pull/2327) — thanks @thepigdestroyer)
- **fix(codex):** Codex reasoning priority now resolves `modelEffort` before `explicitReasoning` — aligns with expected precedence and fixes suffix alias mismatches. ([#2335](https://github.com/diegosouzapw/OmniRoute/pull/2335) — thanks @terence71-glitch)
- **fix(translator):** DeepSeek tool-call response lookup reads cached reasoning before falling back to empty string — preserves reasoning content in multi-turn tool-call flows. ([#2349](https://github.com/diegosouzapw/OmniRoute/pull/2349) — thanks @herjarsa)
- **fix(providers):** providers page no longer deadlocks when no providers are configured — setup hint is shown instead of an empty filtered list, allowing the first provider to be added. ([#2329](https://github.com/diegosouzapw/OmniRoute/pull/2329) — thanks @slider23)
- **fix(usage):** extract flat `cached_tokens` and `reasoning_tokens` from OpenAI-compatible usage objects — providers like Xiaomi MiMo that return these as top-level fields instead of nesting in `prompt_tokens_details`/`completion_tokens_details` now properly surface in call logs and dashboard. ([#2350](https://github.com/diegosouzapw/OmniRoute/pull/2350) — thanks @TF0rd)
- **chore(providers):** update HuggingFace to use the new `/v1/` router endpoint with dynamic model list (`router.huggingface.co/v1/`), removing the stale static model list. ([#2322](https://github.com/diegosouzapw/OmniRoute/pull/2322) — thanks @backryun)
- **fix(security):** resolve CodeQL ReDoS + URL sanitization alerts.
- **fix(auth):** stop retrying unrecoverable token refresh failures and include connection id in token health check credentials.
- **fix(auth):** return synthetic credentials for noAuth free providers and show no-auth card in dashboard instead of OAuth modal.
- **fix(endpoint):** replace nested `<button>` with `<div role=button>` in tunnel toggle rows to fix hydration warnings.
- **fix(claude):** guard orphan tool_use/tool_result pairs before upstream send, resolving a critical Anthropic 400 error on truncated histories. ([#2312](https://github.com/diegosouzapw/OmniRoute/pull/2312) — thanks @mrmm)
- **fix(ui):** remove count from batch removal button for cleaner interface. ([#2309](https://github.com/diegosouzapw/OmniRoute/pull/2309) — thanks @hartmark)
- **fix(sse):** strip stale `Content-Encoding`, `Content-Length`, and `Transfer-Encoding` headers on non-streaming forward — fixes JSON truncation on gzipped Gemini responses where clients honoring `Content-Length` read only the compressed byte count of the decompressed payload, causing `"Unterminated string in JSON"` parse failures. RFC 7230 §6.1 compliant. ([#2264](https://github.com/diegosouzapw/OmniRoute/pull/2264) — thanks @gleber)
- **fix(executor/claude-code):** store tool-name round-trip metadata in non-enumerable `_toolNameMap` so it survives in-memory but is stripped by `JSON.stringify()` — prevents internal OmniRoute metadata from leaking to upstream providers. ([#2254](https://github.com/diegosouzapw/OmniRoute/pull/2254) — thanks @Rikonorus)
- **fix(streaming):** strip upstream `Content-Encoding`, `Content-Length`, and `Transfer-Encoding` headers from SSE responses — prevents client-side decompression corruption when the proxy serves plain-text event streams through nginx/caddy. ([#2253](https://github.com/diegosouzapw/OmniRoute/pull/2253) — thanks @Rikonorus)
- **fix(kiro):** harden OpenAI-to-Kiro translator for API compliance: recursively strip `additionalProperties` and empty `required: []` from tool schemas; merge consecutive assistant messages; prepend synthetic user for assistant-first conversations; convert orphaned tool results to inline text; enforce `origin: "AI_EDITOR"` on all history user messages; deterministic `uuidv5` session caching. Closes #2213. ([#2251](https://github.com/diegosouzapw/OmniRoute/pull/2251) — thanks @8mbe)
- **fix(models):** sync managed model aliases with provider model visibility — remove aliases when models are hidden/deleted, skip alias creation for hidden models during sync, restore aliases when unhidden, cross-connection safety guard prevents pruning aliases still valid from another connection. ([#2250](https://github.com/diegosouzapw/OmniRoute/pull/2250) — thanks @InkshadeWoods)
- **fix(models/cleanup):** align managed model cleanup for imported models — provider-level "Delete All" now also removes synced available model storage; delete-alias button only shown for alias-source rows; compatible models section uses proper 3-way source-aware delete logic. ([#2261](https://github.com/diegosouzapw/OmniRoute/pull/2261) — thanks @InkshadeWoods)
- **fix(auth):** accept `x-api-key` header in `extractApiKey` so Anthropic-native clients (Claude Code, `@anthropic-ai/sdk`) hit the same per-key policy enforcement as Bearer clients. Previously these requests were treated as anonymous, bypassing model/budget/rate-limit policies and showing up as `NULL` in `usage_history.api_key_id` (~50% of traffic invisible in Costs/Analytics). `Authorization: Bearer` still wins when both are present (back-compat). (#2225)
- **fix(translator/claude-to-openai):** stop including `cache_creation_input_tokens` in `prompt_tokens`. Anthropic pads short prompts up to a 1024-token minimum on cache creation, so a 2-token `"hi"` could be reported as ~2008 `prompt_tokens` and inflate downstream billing (Sub2API/NewAPI/OneAPI) ~250x. `prompt_tokens` now matches the dashboard "Total In" (`input + cache_read`); `cache_creation_tokens` is exposed separately in `prompt_tokens_details.cache_creation_tokens` for auditing. (#2215)
- **fix(ui/claude-extra-usage):** clarify the toggle-success notification text to spell out the toggle→effect relationship ("Claude extra-usage blocking enabled/disabled" instead of the ambiguous "blocked/allowed"). (#2157)
- **fix(providers/qoder):** disambiguate the "Local CLI runtime is not installed" error when a user pastes a Personal Access Token but the connection is in OAuth/CLI-flavored mode. The test route now surfaces a single actionable message ("switch this connection to API Key auth") instead of cascading CLI + 401 errors. (#2247)
- **fix(dashboard/api-manager):** route custom OpenAI-/Anthropic-compatible provider IDs through `getProviderDisplayName` so the model grouping label shows `Compatible (openai)` instead of leaking the raw synthetic `openai-compatible-chat-<uuid>` value. (#2021)
- **fix(providers/blackbox-web):** add `BLACKBOX_WEB_VALIDATED_TOKEN` env override and 403 token-error disambiguation. Blackbox `/api/chat` started rejecting requests whose `validated` field didn't match the frontend `tk` token, even with a valid cookie + active subscription. Operators with the real token can now set the env var; otherwise the previous random-UUID fallback still ships, and a 403 with a token-specific body now surfaces a one-line "set BLACKBOX_WEB_VALIDATED_TOKEN" hint instead of the generic "cookie expired" message. (#2252)
- **fix(guardrails/vision-bridge):** add `VISION_BRIDGE_BASE_URL` + `VISION_BRIDGE_API_KEY` env overrides so non-Anthropic vision-bridge calls can be routed through OmniRoute's own `/v1` self-loop, Google's Gemini OpenAI-compat endpoint, OpenRouter, or any other OpenAI-compatible URL — instead of being hardcoded to `https://api.openai.com/v1` (which failed with 401 for users without an OpenAI key, even when they configured `visionBridgeModel: "google/gemini-2.0-flash"`). Anthropic models keep their dedicated path. (#2232)
- **docs(security):** document the ToS-violation hot spot of `ANTIGRAVITY_CREDITS=always` in `STEALTH_GUIDE.md`, including why it draws Google abuse detection more aggressively than free-tier-only usage and the recommended posture (`=retry`, Auto-Combo spread, per-connection RPM caps). (#2246)
- **fix(translator/developer-role):** convert OpenAI `developer` role → `system` by default for non-OpenAI-family providers. Codex/Responses API clients hitting DeepSeek (and other OpenAI-compatible gateways: MiniMax, Mimo, GLM, Fireworks, Together, etc.) were getting `400: unknown variant 'developer'` because the previous default preserved `developer` for any `targetFormat=openai` upstream. New default: preserve only for `openai`/`azure-openai`/`azure`/`github` (and any id containing `"openai"`); convert everywhere else. Operators can still force preservation per-model via the dashboard "Compatibility → preserveOpenAIDeveloperRole = true" toggle. (#2281)
- **fix(api/combos):** add API-key-safe `GET /v1/combos` endpoint that mirrors the `/v1/models` auth model. Previously `/api/combos` was management-gated, blocking read-only integrations (e.g. `opencode-omniroute-auth` plugin) that need to enrich combo capabilities from a normal Bearer API key. The new endpoint projects only public metadata (name, strategy, model ids, providerId, description) — internal routing details like `connectionId`, weights, and labels are stripped. `/api/combos` (management) is unchanged. (#2300)
- **fix(embeddings/registry):** add DeepInfra to the embedding provider registry. Custom embedding models on the DeepInfra provider (e.g. `Qwen/Qwen3-Embedding-8B`, `BAAI/bge-large-en-v1.5`) were failing with `Unknown embedding provider: deepinfra` because the registry only included Nebius/OpenAI/Together/Fireworks/NVIDIA/etc. Now ships 8 popular DeepInfra embedding models out of the box and routes through `https://api.deepinfra.com/v1/openai/embeddings`. (#2298)
- **fix(opencode-zen):** flag `qwen3.6-plus` and `qwen3.6-plus-free` with `targetFormat: "claude"`. The opencode-zen upstream returns Claude-format SSE bodies (`type: "message_start"`, no `choices` array) for these Qwen3.6 models even when the request hits the OpenAI-compatible `/chat/completions` endpoint, causing client-side Zod failures (`expected "choices" (array), received undefined`). Routing them through the Claude `/messages` endpoint + translator fixes the format mismatch. (#2292)
- **fix(settings):** default `debugMode` to `true` on fresh installations — the Debug sidebar section (Translator, Playground, Search Tools) was hidden on new installs because `debugMode` was not in the settings defaults object, making `data?.debugMode === true` evaluate to `false`. The toggle in System & Storage appeared active but had no effect until manually set. Now all sidebar sections are visible out of the box.
- **fix(providers/command-code):** send required `skills` and `stream` payload fields — Command Code upstream wrapper now includes `skills: ""` and forces `params.stream: true` to align with upstream API requirements. Validation probe defaults to `deepseek/deepseek-v4-flash`. ([#2271](https://github.com/diegosouzapw/OmniRoute/pull/2271) — thanks @ddarkr)
- **fix(sse):** strip stale `Content-Encoding`, `Content-Length`, and `Transfer-Encoding` from upstream responses — prevents JSON truncation and `ZlibError` on gzipped provider responses forwarded through the proxy. ([#2291](https://github.com/diegosouzapw/OmniRoute/pull/2291) — thanks @thepigdestroyer)
- **fix(sse):** remove dead-code flag leak in `claudeCodeToolRemapper` — eliminates a stale boolean flag that could cause incorrect tool remapping behavior on subsequent requests. ([#2290](https://github.com/diegosouzapw/OmniRoute/pull/2290) — thanks @thepigdestroyer)
- **fix(ui):** v3.8.0 polish — connections border, sticky tabs, EN translations, save toasts, auto-combo catalog. ([#2305](https://github.com/diegosouzapw/OmniRoute/pull/2305) — thanks @mrmm)
- **fix:** remove implicit API key request caps — removes the default daily/weekly/monthly rate caps (1K/5K/20K) that silently applied 429s to API keys without explicit limits configured, causing unexpected throttling for operators who hadn't set custom rate policies. ([#2289](https://github.com/diegosouzapw/OmniRoute/pull/2289) — thanks @josephvoxone)
- **fix(auth+build):** Bearer manage scope on management routes + lazy-load deepseek PoW solver — unblocks MCP remote usage and Docker Next.js standalone builds. ([#2308](https://github.com/diegosouzapw/OmniRoute/pull/2308) — thanks @mrmm)
- **fix(migrations):** resolve version collision at migration slot 056 by renaming the quota thresholds migration to 057, and add batch deletion API with bulk cleanup support and batch/file management UI. ([#2294](https://github.com/diegosouzapw/OmniRoute/pull/2294) — thanks @hartmark)
- **chore:** ignore `.playwright-mcp/` generated artifacts (CSP error logs, accessibility tree snapshots) — removes tracked test artifacts and adds the directory to `.gitignore`. ([#2269](https://github.com/diegosouzapw/OmniRoute/pull/2269) — thanks @backryun)
- **chore:** tidy up deprecated models from Windsurf provider registry. ([#2279](https://github.com/diegosouzapw/OmniRoute/pull/2279) — thanks @backryun)
- **build(deps):** bump `actions/checkout` from 4 to 6 in CI workflows. ([#2288](https://github.com/diegosouzapw/OmniRoute/pull/2288))
- **build(deps):** regenerate `package-lock.json` to match `http-proxy-middleware` 4.x bump. ([#2228](https://github.com/diegosouzapw/OmniRoute/pull/2228) — thanks @NomenAK)
- **fix(streaming):** harden stream readiness detection — recognize OpenAI Responses API lifecycle events (`response.created`, `response.in_progress`, `response.output_item.added`) and Chat Completions start chunks as readiness signals; switch GLM from idle timeout to readiness timeout; compact Provider Limits cutoff UI with i18n fallback labels; fix DeepSeek PoW dynamic import warning; static locale for docs prerender. ([#2317](https://github.com/diegosouzapw/OmniRoute/pull/2317) — thanks @dhaern)
- **chore(providers):** refresh provider model metadata, sort dashboard entries by display name, fix docs generator relative links and frontmatter. ([#2318](https://github.com/diegosouzapw/OmniRoute/pull/2318) — thanks @backryun)
- **chore(providers):** consolidate Alibaba provider entries — merge `alicode`/`alicode-intl` into shared `ALIBABA_DASHSCOPE_MODELS` array, update 42 i18n llm.txt files. ([#2319](https://github.com/diegosouzapw/OmniRoute/pull/2319) — thanks @backryun)
- **chore:** narrow `.claude/` gitignore to runtime files only and untrack `scheduled_tasks.lock`.
- **Docs:** 270 broken internal markdown links repaired.

### 🏆 v3.8.0 Hall of Fame — extended credits (post-release)

The following contributions landed after the initial v3.8.0 cut and supplement the 55+ community hall of fame below. Updated tallies:

| Contributor                                              | New PRs in this cycle                                                | Full v3.8.0 PR list                                                                                                  |
| :------------------------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| [@oyi77](https://github.com/oyi77)                       | #2338, #2339, #2340, #2344, #2364, #2366, #2369, #2377, #2380, #2383 | (+ already listed: #2010, #2014, #2041, #2052, #2061, #2074, #2091, #2094, #2096, #2131, #2135, #2240, #2283, #2295) |
| [@backryun](https://github.com/backryun)                 | #2269, #2279, #2313, #2318, #2319, #2381                             | (+ already listed: #1992, #2033, #2088, #2123, #2138, #2141, #2150, #2177)                                           |
| [@thepigdestroyer](https://github.com/thepigdestroyer)   | #2326, #2327, #2370                                                  | (+ already listed: #2290, #2291)                                                                                     |
| [@mrmm](https://github.com/mrmm)                         | #2375, #2286 _(closes #2260)_, #2305, #2308, #2312                   | (consolidates the row)                                                                                               |
| [@dhaern](https://github.com/dhaern)                     | #2315, #2316, #2317, #2355                                           | (+ already listed: #2028, #2039, #2087, #2090)                                                                       |
| [@hartmark](https://github.com/hartmark)                 | #2294, #2299, #2309                                                  | (+ already listed: #2045, #2137)                                                                                     |
| [@gleber](https://github.com/gleber)                     | #2264, #2265, #2266                                                  | (+ already listed: #2103)                                                                                            |
| [@herjarsa](https://github.com/herjarsa)                 | #2349                                                                | (+ already listed: #2030, #2136, #2152)                                                                              |
| [@congvc-dev](https://github.com/congvc-dev)             | #2354, #2392                                                         | (+ already listed: #2004)                                                                                            |
| [@terence71-glitch](https://github.com/terence71-glitch) | #2335, #2351, #2362                                                  | (new contributor — 3 PRs)                                                                                            |
| [@TF0rd](https://github.com/TF0rd)                       | #2350                                                                | (new contributor — 1 PR)                                                                                             |
| [@slider23](https://github.com/slider23)                 | #2329, #2352                                                         | (new contributor — 2 PRs)                                                                                            |
| [@t-way666](https://github.com/t-way666)                 | #2273                                                                | (new contributor — 1 PR)                                                                                             |
| [@payne0420](https://github.com/payne0420)               | #2267                                                                | (+ already listed: #2082, #2128)                                                                                     |
| [@Rikonorus](https://github.com/Rikonorus)               | #2253, #2254                                                         | (new contributor — 2 PRs)                                                                                            |
| [@8mbe](https://github.com/8mbe)                         | #2251                                                                | (new contributor — 1 PR)                                                                                             |
| [@InkshadeWoods](https://github.com/InkshadeWoods)       | #2250, #2261                                                         | (+ already listed: #2202)                                                                                            |
| [@clousky2020](https://github.com/clousky2020)           | #2412                                                                | (+ already listed: 15 PRs)                                                                                           |
| [@benzntech](https://github.com/benzntech)               | #2408                                                                | (+ already listed: 8 PRs)                                                                                            |

Thanks also to **@app/dependabot** for keeping our dependency tree current via #2178, #2228, #2288, #2397, #2398, #2399.

---

### Detalhes completos — features do release (2026-05-15)

- **feat(providers):** expanded capabilities for Pollinations, MiniMax, Together, and Replicate across Video, Audio TTS, and Transcription registries. ([#2369](https://github.com/diegosouzapw/OmniRoute/pull/2369) — thanks @oyi77)
- **feat(providers):** added Veo AI Free as a web-wrapper provider for generating video, image, and TTS without an API key. ([#2366](https://github.com/diegosouzapw/OmniRoute/pull/2366) — thanks @oyi77)
- **feat(providers):** added Replicate as a free provider for OpenAI-compatible inference with community models. ([#2364](https://github.com/diegosouzapw/OmniRoute/pull/2364) — thanks @oyi77)
- `feat(mcp): MCP accessibility-tree smart filter engine` — collapses ≥30 repeated sibling lines, preserves `[ref=eXX]` anchors, 60-80% savings on browser snapshot outputs (Task 1)
- `docs(skills): publish 10 SKILL.md manifests for external AI agents` — zero-friction onboarding for Claude Desktop, ChatGPT, Cursor, Cline (Task 2)
- `feat(cli): standalone system tray with PowerShell fallback on Windows` — no Electron required; `omniroute --tray`; autostart via LaunchAgent/.desktop/registry (Task 3)
- `feat(auth): CLI machine-ID HMAC-SHA256 token` — zero-friction local auth without JWT/password; loopback-only; constant-time compare (Task 4)
- `feat(security): route protection tiers` — 5 tiers: public/read-only/protected/always/local-only; spawn-capable routes enforce loopback even with valid JWT (Task 5)
- `feat(compression): Caveman SHARED_BOUNDARIES` — all 6 languages × 3 intensities embed boundary clause; `alreadyApplied` check order fixed (Task 6)
- `feat(runtime): dynamic SQLite 5-step fallback chain` — bundled → runtime-installed → lazy-install → node:sqlite → sql.js; magic-byte validation (ELF/Mach-O/PE) (Task 7)
- `docs/ux: tier 1/2/3 marketing, onboarding tour, dashboard widget` — README tier diagram, `docs/marketing/TIERS.md`, TierTour onboarding step, Tier Coverage widget (Task 8)
- `docs(comparison): OMNIROUTE_VS_ALTERNATIVES.md` — objective comparison vs LiteLLM, OpenRouter, Portkey

### Changed

- `getDbInstance()` requires prior `ensureDbInitialized()` call — server startup awaits it automatically (see release notes for migration)
- Caveman prompts embed `SHARED_BOUNDARIES` verbatim (LITE/FULL/ULTRA × 6 languages)
- README "Why OmniRoute?" enhanced with 3-tier ASCII diagram and comparison table
- Onboarding wizard gains "How It Works" tier tour step (after Welcome, before Security)
- Home dashboard shows "Tier coverage" widget (configured + active counts per tier)

### Security

- Hard Rule #15: spawn-capable routes must call `assertRouteAllowed(req)` (CLAUDE.md)
- CLI token rejected on non-loopback hosts even when the HMAC is correct
- `always`-protected routes (shutdown, db export) reject CLI tokens unconditionally

### Documentation

- `docs/security/CLI_TOKEN.md`
- `docs/security/ROUTE_GUARD_TIERS.md`
- `docs/ops/SQLITE_RUNTIME.md`
- `docs/marketing/TIERS.md`
- `docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md`
- `docs/releases/v3.8.0.md`

---

### Dependencies

- **chore(deps):** node dependency updates — bump multiple runtime and dev dependencies to latest patch/minor versions. ([#2259](https://github.com/diegosouzapw/OmniRoute/pull/2259) — thanks @backryun)

### Detalhes completos — features e fixes do lançamento (2026-05-06 a 2026-05-14)

#### ✨ New Features

- **feat(providers):** add Command Code provider (#2199 — thanks @ddarkr)
- **feat(providers):** add ModelScope provider-specific 429 handling and retry logic (#2202 — thanks @InkshadeWoods)
- **feat(providers):** update Gemini CLI provider models catalog (#2196 — thanks @nickwizard)
- **feat(antigravity):** integrate Antigravity provider with dynamic `maxOutputTokens` calculation, identity fingerprinting overhaul, and Cloud Code envelope payload sanitization (#2055, #2063)
- **feat(gemini-cli):** add custom projectId support for Gemini CLI transport (UI, DB, executor) (#1991)
- **feat(providers):** add KIE media provider support with dynamic polling, text models, and expanded video models catalog (#2009 — thanks @wauputr4)
- **feat(providers):** add Z.AI provider support with GLM quota handling and new quota labels — thanks @JxnLexn
- **feat(providers):** add 9 new free AI providers — LLM7, Lepton, Kluster, UncloseAI, BazaarLink, Completions, Enally, FreeTheAi (#2096 — thanks @oyi77)
- **feat(providers):** batch delete provider connections via checkbox multi-select (#2094 — thanks @oyi77)
- **feat(cursor):** full OpenAI parity — tool calls, streaming, and session management (#2082 — thanks @payne0420)
- **feat(cursor):** surface Cursor Pro plan usage on provider-limits dashboard (#2128 — thanks @payne0420)
- **feat(cli):** comprehensive CLI enhancement suite with 20+ new commands including `omniroute providers`, `omniroute combos`, `omniroute doctor` (#2074 — thanks @oyi77)
- **feat(cli):** add modular CLI setup and provider management commands (#2046 — thanks @wauputr4)
- **feat(mcp):** add DeepSeek quota and limit monitoring feature (#2089 — thanks @HoaPham98)
- **feat(circuit-breaker):** classify 429 errors and apply per-kind cooldowns (#2116 — thanks @eleata)
- **feat(multi):** manifest-aware tier routing — W1-W4 complete (#2014 — thanks @oyi77)
- **feat(combos):** add reset-aware routing strategy for quota-based providers — thanks @JxnLexn
- **feat(combo):** add context_length input field to combo edit form (#2047 — thanks @ddarkr)
- **feat(combo):** add `fallbackDelayMs` to combo configuration and related settings — thanks @JxnLexn
- **feat(chat):** dynamic tool limit detection with proactive truncation (#2061 — thanks @oyi77)
- **feat(chat):** add `STREAM_READINESS_TIMEOUT_MS` and integrate into chat handling — thanks @JxnLexn
- **feat(chat):** enhance error handling for semaphore capacity with fallback logic — thanks @JxnLexn
- **feat(sse):** refresh Claude OAuth wire image to claude-cli/2.1.131 (#2011 — thanks @Tentoxa)
- **feat(github):** add `targetFormat: openai-responses` to all GitHub models (#2122 — thanks @abhinavjnu)
- **feat(api):** allow configuration via API calls — open management routes to Bearer keys with manage scope (#2103 — thanks @gleber)
- **feat(api):** update API bridge proxy timeout to 600,000ms (#2019 — thanks @JxnLexn)
- **feat(api):** aggregate combo model metadata in catalog endpoint — `buildComboCatalogMetadata()` inlines contextLength, strategy, and target count for combo entries (#2166 — thanks @faisalill)
- **feat(usage):** add service tier breakdown, codex fast service tier analytics, and account for fast tier — thanks @JxnLexn
- **feat(qdrant):** embedding model discovery (#2086 — thanks @rafacpti23)
- **feat(auth):** per-session sticky routing for Codex (#1887)
- **feat(oauth):** complete Windsurf and Devin CLI OAuth + API-token flows — WindsurfExecutor (gRPC-web/protobuf), DevinCliExecutor (ACP JSON-RPC 2.0 over stdio), model alias map, OAuth provider config (#2168 — thanks @Zhaba1337228)
- **feat(inworld):** enhance Inworld TTS support (#2123 — thanks @backryun)
- **feat(kiro):** headless auth via kiro-cli SQLite, image support, tool overflow handling, and model list sync (#2129 — thanks @christlau)
- **feat(auto):** zero-config auto-routing with `auto/` prefix — dynamic virtual combo from connected providers with 6 variant profiles (coding, fast, cheap, offline, smart, lkgp), analytics tab, and settings UI (#2131 — thanks @oyi77)
- **feat(resilience):** add model cooldowns dashboard card with real-time list, individual/bulk re-enable, and auto-refresh (#2146 — thanks @rafacpti23)
- **feat(resilience):** `useUpstream429BreakerHints` toggle — per-provider default policy for upstream 429 hint trust at the circuit-breaker cooldown layer with tri-state PATCH semantics (#2133 — thanks @eleata)
- **feat(search):** add Ollama Search as a web search provider with registry integration and validation (#2176 — thanks @andrewmunsell)
- **feat(search):** add Z.AI Coding Plan Search via MCP protocol integration (#2238 — thanks @andrewmunsell)
- **feat(debug):** configurable chat log truncation limits via environment variables (`CHAT_LOG_TEXT_LIMIT`, `CHAT_LOG_ARRAY_TAIL_ITEMS`, `CHAT_LOG_MAX_DEPTH`, `CHAT_LOG_MAX_OBJECT_KEYS`) and `CHAT_DEBUG_FILE` mode for untruncated JSON payloads (#2156 — thanks @bypanghu)
- **feat(responses):** degrade `background: true` to synchronous execution with a warning instead of throwing `unsupportedFeature` (#2164 — thanks @Yosee11)
- **feat(mitm):** dynamic Linux certificate path detection for multi-distro MITM cert trust (Debian, Arch/CachyOS, Fedora/RHEL, openSUSE) with NSS browser database injection (#2134 — thanks @flyingmongoose)
- **feat(1proxy):** add dedicated settings tab with proxy rotation support (#2135 — thanks @oyi77)
- **feat(antigravity):** support custom Google Cloud project ID for Antigravity provider (#2227 — thanks @nickwizard)
- **feat(cli):** CLI Integration Suite — 5 new management commands (`config`, `status`, `logs`, `update`, `provider`), 3 API endpoints, config generators for 6 tools (Claude, Cline, Codex, Continue, KiloCode, OpenCode), zero-config `auto/` routing, and `@omniroute/opencode-provider` npm package (#2240 — thanks @oyi77)

### 🐛 Bug Fixes

- **fix(pricing):** make `getPricingForModel` fully case-insensitive to ensure custom prices correctly reflect in new incoming requests cost calculations
- **fix(gemini):** prevent `functionDeclarations` from being dropped by the sanitizer when `googleSearch` tool is present (#2077)
- **fix(pollinations):** add `jsonMode: true` flag in the request transformation to enforce correct JSON structure from Pollinations API (#2109)
- **fix(docker):** update Dockerfile to copy `/docs` directory during build ensuring API catalog availability at runtime (#2083)
- **fix(docker):** include OpenAPI spec in runtime image (#2007 — thanks @tatsster)
- **fix(providers):** strip OpenAI-specific fields in Kiro translator to prevent 400 errors (#2037)
- **fix(kiro):** normalize tool-use payloads to prevent 400 errors from agents (#2104 — thanks @rilham97)
- **fix(kiro):** merge adjacent user history turns after role normalization (#2105 — thanks @Gioxaa)
- **fix(ui):** resolve text contrast issues for zero-config warning banner in light mode (#2050)
- **fix(core):** inject global system prompt correctly into downstream chat completions pipeline (#2080)
- **fix(core):** restore Claude Code adaptive thinking defaults and resolve audio transcription CORS regression
- **fix(routing):** add missing v1beta rewrites to next.config to resolve 404 on Gemini models endpoint (#2102)
- **fix(routing):** fix bare GPT-5.5 routing for Codex-only installations (#2054 — thanks @guanbear)
- **fix(routing):** add fuzzy auto-combo routing for `auto/*` model prefix (#2010 — thanks @oyi77)
- **fix(cache):** optimize cache_control preservation logic and explicitly align tool schema with upstream Claude Code expectations
- **fix(db):** preserve legacy SQLite database path on Windows to prevent data loss (#1973)
- **fix(db):** reduce hot-path persistence overhead (#2039 — thanks @dhaern)
- **fix(db):** resolve migration conflict by renumbering overlapping migration entries (#2041 — thanks @oyi77)
- **fix(settings):** resolve model alias persistence double stringification preventing UI updates (#2018)
- **fix(routing):** dynamically filter bare model auto-resolution by active provider connections to prevent dead-routing (#2029)
- **fix(embeddings):** add Google Gemini embeddings compatibility via OpenAI-compatible endpoint mapping (#2006)
- **fix(sse):** prevent Claude OAuth multi-account correlation via metadata.user_id (#2053 — thanks @Tentoxa)
- **fix(sse):** prevent Claude Code identity cloak overrides and fix fallback resilience (#2053 — thanks @Tentoxa)
- **fix(sse):** classify hour quota errors as QUOTA_EXHAUSTED (#2119 — thanks @clousky2020)
- **fix(sse):** fix CC-compatible streaming bridge (#2118 — thanks @rdself)
- **fix(antigravity):** sanitize Claude Cloud Code payloads (#2090 — thanks @dhaern)
- **fix(antigravity):** add duplex half for streaming bodies — thanks @Gi99lin
- **fix(antigravity):** align identity protocol and behavior with official AM — thanks @Gi99lin
- **fix(chatgpt-web):** plumb proxy through to native tls-client (#2022, #2023 — thanks @xssdem)
- **fix(codex):** expose native model IDs in catalog (#2012 — thanks @Tr0sT)
- **fix(glm):** add dedicated coding transport (#2087 — thanks @dhaern)
- **fix(compression):** support Responses input and expand Spanish compression rules (#2028 — thanks @dhaern)
- **fix(catalog):** auto-calculate combo context_length from target model limits (#2030 — thanks @herjarsa)
- **fix(api):** fix usage analytics and API key identity (#2008, #2092 — thanks @AveryanAlex, @yoviarpauzi)
- **fix(api-key):** allow Unicode letters in API key name validation (#1996 — thanks @rodrigogbbr-stack)
- **fix(auth):** allow bootstrap without password (#2048 — thanks @tces1)
- **fix(proxy):** clean up proxy page redundancy and fix 1proxy sync empty body error (#2052 — thanks @oyi77)
- **fix(dashboard):** resolve Unknown plan display in Provider Limits — thanks @congvc-dev
- **fix(usage):** add extensible CURRENCY_SYMBOLS mapping for deepseek currencies
- **fix(runtime):** harden timer handling and model pricing fallback
- **fix(i18n):** complete Simplified Chinese translations (#2115 — thanks @boa-z)
- **fix(mitm):** add Linux cert install and skip sudo password when root (#1999 — thanks @NekoMonci12)
- **fix(mitm):** prevent stub from loading at runtime via bypass module — thanks @NekoMonci12
- **fix:** remove Anthropic-Beta header from non-Anthropic providers to fix identity contamination (#1989)
- **fix(cli):** resolve .env loading failure for global npm installations
- **fix(authz):** classify `/dashboard/onboarding` as PUBLIC to unblock setup wizard (#2127)
- **fix(chatcore):** stop leaking provider credentials in response headers
- **fix(analytics):** precise SQL matching for `auto/` prefix models
- **fix(export):** exclude telemetry/usage-history tables from JSON config backups by default to prevent unbounded file growth (#2125)
- **fix(translator):** preserve `body.system` in openai→claude translator when Claude Code sends native Anthropic system array through /chat/completions — fixes v3.7.9 regression where system prompt was silently dropped, triggering Anthropic 429 (#2130)
- **fix(sanitizer):** preserve `reasoning_content` on assistant messages with `tool_calls` or `function_call` — fixes Kimi and other thinking-enabled providers returning 400 errors when reasoning_content was incorrectly stripped (#2140 — thanks @DavyMassoneto)
- **fix(catalog):** ensure individual (non-combo) models expose `context_length` via `getTokenLimit()` fallback chain — prevents OpenCode and other clients from falling back to conservative ~4000 token limit (#2136 — thanks @herjarsa)
- **fix(docker):** remove docs directory from `.dockerignore` so API catalog documentation is available at runtime inside containers (#2137, #2120 — thanks @hartmark)
- **fix(types):** systematic `any` type elimination across 8 core files — `antigravity.ts`, `accountFallback.ts`, `usage.ts`, `geminiHelper.ts`, `error.ts`, `apiKeys.ts`, `settings.ts`, `logger.ts` (#2137 — thanks @hartmark)
- **fix(providers):** restore cloud agent provider exports and logger import (#2138 — thanks @backryun)
- **fix(providers):** remove duplicate `CLOUD_AGENT_PROVIDERS` declaration, move Kiro dash→dot Claude model aliases to `PROVIDER_MODEL_ALIASES`, and trim deprecated Kiro registry entries (#2141 — thanks @backryun)
- **fix:** Follow OpenAI specification, handle throttling in batch and fix UI (#2045)
- **fix(cliproxyapi):** probe `/v1/models` for health when CPA 6.x has no `/health` endpoint (#2189 — thanks @Brkic-Nikola)
- **fix(cliproxyapi):** detect Anthropic-shaped request bodies and route to `/v1/messages`, strip Capy extras, and round-trip `mcp_*` tool name rewrites to `Mcp_*` (#2165 — thanks @Brkic-Nikola)
- **fix(cliproxyapi):** detect Anthropic shape on minimal Capy bodies (#2192 — thanks @Brkic-Nikola)
- **fix(stream):** skip `[DONE]` terminator for Claude SSE clients (#2190 — thanks @Brkic-Nikola)
- **fix(claudeHelper):** emit `data` field on `redacted_thinking`, drop bogus signature (#2191 — thanks @Brkic-Nikola)
- **fix(modelSpecs):** cap thinking budget for Claude Opus 4.6 / 4.7 / Sonnet 4.6 (#2197 — thanks @Brkic-Nikola)
- **fix(reasoning-cache):** include xiaomi-mimo in replay provider/model detection (#2198 — thanks @Brkic-Nikola)
- **fix(kiro):** synthesize minimal tools schema when `body.tools` is omitted but message history contains `tool_calls`, preventing 400 errors from Claude Code and OpenCode (#2149 — thanks @Gioxaa)
- **fix(kiro):** avoid treating high-traffic 429s as quota exhaustion — use `classify429FromError` to prevent premature account deactivation (#2153 — thanks @Gioxaa)
- **fix(responses):** propagate `include` array (e.g. `reasoning.encrypted_content`) during Chat→Responses API translation, fixing broken thinking panel in Codex/OpenCode (#2154 — thanks @Gioxaa)
- **fix(responses):** emit reasoning summary as `delta.reasoning_content` (flat) instead of `delta.reasoning.summary` (nested) for Chat Completions client compatibility (#2159 — thanks @Gioxaa)
- **fix(cloudflare):** add state file write serialization lock to prevent race conditions in `cloudflaredTunnel.ts` (#2156 — thanks @bypanghu)
- **fix(providers):** allow optional-key providers to pass connection test (#2169 — thanks @andrewmunsell)
- **fix(providers):** correct pollinations requests and provider dashboard state
- **fix(providers):** fix Azure AI Foundry provider connection handling (#2236 — thanks @one-vs)
- **fix(providers/command-code):** fix validation request format for Command Code API (#2243 — thanks @ddarkr)
- **fix(antigravity):** strip `generationConfig.thinkingConfig` for Claude models routed through Antigravity to prevent upstream errors (#2217 — thanks @NomenAK)
- **fix(antigravity):** bootstrap project via `loadCodeAssist` + `fetchAvailableModels` fallback for robust startup (#2219 — thanks @NomenAK)
- **fix(rateLimit):** never `.stop()` during runtime reset, evict cache instead to prevent stale rate-limit state (#2218 — thanks @NomenAK)
- **fix(ModelSync):** shared loopback readiness gate + IPv4 force to prevent model sync failures on dual-stack hosts (#2221 — thanks @NomenAK)
- **fix(proxyFetch):** retry once on undici dispatcher failure before native fallback (#2222 — thanks @NomenAK)
- **fix(model):** local aliases override cross-proxy provider inference to prevent incorrect model resolution (#2223 — thanks @NomenAK)
- **fix(claudeHelper):** preserve latest assistant thinking blocks verbatim to prevent Anthropic HTTP 400 errors (#2224 — thanks @NomenAK)
- **fix(deepseek):** preserve `reasoning_content` through full pipeline for DeepSeek V4 models — prevents reasoning context loss on multi-turn conversations (#2231 — thanks @kang-heewon)
- **fix(sse-heartbeat):** shape-aware keepalives keep streams alive through stricter proxies (#2233 — thanks @NomenAK)
- **fix(translator):** coerce `submit_pr_review` `functionalChanges`/`findings` to arrays to prevent upstream schema errors (#2242 — thanks @NomenAK)
- **fix(api):** validate model cooldown delete payload
- **fix(ci):** run coverage gate serially, align resilience and thinking checks, align cloud code thinking and model catalog tests

### 🔒 Security

- **fix(security):** remediate CodeQL vulnerabilities (ReDoS, cryptographic bias, stack trace exposure, and weak password hashing) (#216, #215, #211, #208, #206, #210)
- **fix(security):** sanitize error messages in API routes to prevent stack trace exposure (CodeQL js/stack-trace-exposure) (#2209)
- **fix(security):** remediate regex validation backtracking path in core compression cleanup (#1990)
- **fix(core):** harden input handling and stabilization for prompt compression edge cases

### 📝 Documentation

- **docs:** add competitive marketing tables and SEO/AEO optimizations to README (#2091)
- **docs:** refresh providers, model catalogs, and docs for v3.8.0 (#2088)
- **docs:** update Claude MD and update GLM-CN max context to 200k (#2027)
- **docs(env):** add `GITLAB_DUO_OAUTH_CLIENT_ID` to `.env.example` (#2031)
- **docs:** add Brazilian WhatsApp group link to README (#2201 — thanks @rafacpti23)

### 🔧 Improvements

- **refactor(executor):** `sanitizeReasoningEffortForProvider()` hook in `BaseExecutor.execute()` — downgrades `xhigh`→`high` for unsupporting providers, strips effort for mistral/devstral and github claude models (#2162 — thanks @hachimed)
- **refactor(translator):** remove redundant provider guard from Claude thinking placeholder injection — applies to all `targetFormat === FORMATS.CLAUDE` bodies (#2161 — thanks @JohnDoe-oss)
- **refactor(catalog):** remove 11 `.ts` extension imports, eliminate all `as any` casts, add `CustomModelEntry` interface and `ComboModelStep` type predicate, normalize alias resolution with `resolveCanonicalProviderId()` (#2152 — thanks @herjarsa)
- **feat(resilience):** `useUpstream429BreakerHints` tri-state PATCH field — `true`/`false` persists, `null` resets to undefined (omitted from JSON) (#2146 tests — thanks @rafacpti23)

### 🧹 Chores & Maintenance

- **chore(providers):** prune redundant local provider icon assets in favor of `@lobehub/icons` web fonts (#1992)
- **chore(providers):** remove deprecated models (#2033)
- **chore(providers):** improve BazaarLink and Completions.me support (#2177 — thanks @backryun)
- **chore(registry):** refresh `contextLength` and `maxOutputTokens` for claude, kiro, github, kimi-coding, xiaomi-mimo, codex/gpt-5.5 models (#2163 — thanks @brucevoin)
- **chore(models):** tidy up Alibaba Coding Plan base URL, reorganize Cursor model list by family, fix `gpt-4o` model ID, update OpenCode Zen model (#2150 — thanks @backryun)
- **chore(deps):** resolve npm audit moderate vulnerability (hono)
- **chore(deps):** move `gray-matter` from devDependencies to dependencies (runtime requirement) (#2156 — thanks @bypanghu)
- **deps:** bump `fast-uri` from 3.1.0 to 3.1.2 (#2078)
- **deps:** bump `hono` from 4.12.14 to 4.12.18 (#2065, #2079)
- **deps:** bump the development group with 6 updates (#2184)
- **deps:** bump `electron-builder` from 26.9.1 to 26.10.0 (#2183)
- **ci:** update build-fork workflow to build from main branch (#2055)
- **ci:** skip SonarCloud scan on main pushes to optimize CI time
- **test:** stabilize cooldown abort coverage case in integration testing
- **build(deps):** regenerate `package-lock.json` to match `http-proxy-middleware` 4.x bump (#2228 — thanks @NomenAK)
- **fix(requestLogger):** exempt tools field from array truncation for full debug visibility (#2234 — thanks @NomenAK)

### 🏆 v3.8.0 Community Contributors

Thank you to all **55+ community contributors** who made v3.8.0 possible! 🎉

| Contributor                                                | PRs | Contributions                                                                                    |
| :--------------------------------------------------------- | :-: | :----------------------------------------------------------------------------------------------- |
| [@NomenAK](https://github.com/NomenAK)                     | 12  | #2217, #2218, #2219, #2221, #2222, #2223, #2224, #2228, #2233, #2234, #2242, #2192               |
| [@oyi77](https://github.com/oyi77)                         | 14  | #2010, #2014, #2041, #2052, #2061, #2074, #2091, #2094, #2096, #2131, #2135, #2240, #2283, #2295 |
| [@backryun](https://github.com/backryun)                   |  9  | #1992, #2033, #2088, #2123, #2138, #2141, #2150, #2177, #2279                                    |
| [@Brkic-Nikola](https://github.com/Brkic-Nikola)           |  6  | #2165, #2189, #2190, #2191, #2192, #2197                                                         |
| [@Gioxaa](https://github.com/Gioxaa)                       |  5  | #2105, #2149, #2153, #2154, #2159                                                                |
| [@dhaern](https://github.com/dhaern)                       |  4  | #2028, #2039, #2087, #2090                                                                       |
| [@andrewmunsell](https://github.com/andrewmunsell)         |  3  | #2169, #2176, #2238                                                                              |
| [@ddarkr](https://github.com/ddarkr)                       |  4  | #2047, #2199, #2243, #2271                                                                       |
| [@nickwizard](https://github.com/nickwizard)               |  3  | #1991, #2196, #2227                                                                              |
| [@herjarsa](https://github.com/herjarsa)                   |  3  | #2030, #2136, #2152                                                                              |
| [@rafacpti23](https://github.com/rafacpti23)               |  3  | #2086, #2146, #2201                                                                              |
| [@Tentoxa](https://github.com/Tentoxa)                     |  2  | #2011, #2053                                                                                     |
| [@wauputr4](https://github.com/wauputr4)                   |  2  | #2009, #2046                                                                                     |
| [@hartmark](https://github.com/hartmark)                   |  4  | #2045, #2137, #2294, #2299                                                                       |
| [@payne0420](https://github.com/payne0420)                 |  2  | #2082, #2128                                                                                     |
| [@bypanghu](https://github.com/bypanghu)                   |  2  | #2027, #2156                                                                                     |
| [@eleata](https://github.com/eleata)                       |  2  | #2116, #2133                                                                                     |
| [@Tr0sT](https://github.com/Tr0sT)                         |  1  | #2012                                                                                            |
| [@AveryanAlex](https://github.com/AveryanAlex)             |  1  | #2008                                                                                            |
| [@rodrigogbbr-stack](https://github.com/rodrigogbbr-stack) |  1  | #1996                                                                                            |
| [@NekoMonci12](https://github.com/NekoMonci12)             |  1  | #1999                                                                                            |
| [@congvc-dev](https://github.com/congvc-dev)               |  1  | #2004                                                                                            |
| [@tatsster](https://github.com/tatsster)                   |  1  | #2007                                                                                            |
| [@xssdem](https://github.com/xssdem)                       |  1  | #2023                                                                                            |
| [@wucm667](https://github.com/wucm667)                     |  1  | #2031                                                                                            |
| [@tces1](https://github.com/tces1)                         |  1  | #2048                                                                                            |
| [@guanbear](https://github.com/guanbear)                   |  1  | #2054                                                                                            |
| [@Gi99lin](https://github.com/Gi99lin)                     |  1  | #2055                                                                                            |
| [@ivan-mezentsev](https://github.com/ivan-mezentsev)       |  1  | #2063                                                                                            |
| [@JxnLexn](https://github.com/JxnLexn)                     |  1  | #2019                                                                                            |
| [@yoviarpauzi](https://github.com/yoviarpauzi)             |  1  | #2092                                                                                            |
| [@gleber](https://github.com/gleber)                       |  1  | #2103                                                                                            |
| [@rilham97](https://github.com/rilham97)                   |  1  | #2104                                                                                            |
| [@boa-z](https://github.com/boa-z)                         |  1  | #2115                                                                                            |
| [@rdself](https://github.com/rdself)                       |  1  | #2118                                                                                            |
| [@clousky2020](https://github.com/clousky2020)             |  1  | #2119                                                                                            |
| [@abhinavjnu](https://github.com/abhinavjnu)               |  1  | #2122                                                                                            |
| [@HoaPham98](https://github.com/HoaPham98)                 |  1  | #2089                                                                                            |
| [@christlau](https://github.com/christlau)                 |  1  | #2129                                                                                            |
| [@flyingmongoose](https://github.com/flyingmongoose)       |  1  | #2134                                                                                            |
| [@05dunski](https://github.com/05dunski)                   |  1  | #1978 (cherry-picked)                                                                            |
| [@DavyMassoneto](https://github.com/DavyMassoneto)         |  1  | #2140                                                                                            |
| [@Zhaba1337228](https://github.com/Zhaba1337228)           |  1  | #2168                                                                                            |
| [@faisalill](https://github.com/faisalill)                 |  1  | #2166                                                                                            |
| [@Yosee11](https://github.com/Yosee11)                     |  1  | #2164                                                                                            |
| [@hachimed](https://github.com/hachimed)                   |  1  | #2162                                                                                            |
| [@JohnDoe-oss](https://github.com/JohnDoe-oss)             |  1  | #2161                                                                                            |
| [@brucevoin](https://github.com/brucevoin)                 |  1  | #2163                                                                                            |
| [@InkshadeWoods](https://github.com/InkshadeWoods)         |  1  | #2202                                                                                            |
| [@kang-heewon](https://github.com/kang-heewon)             |  1  | #2231                                                                                            |
| [@one-vs](https://github.com/one-vs)                       |  1  | #2236                                                                                            |
| [@thepigdestroyer](https://github.com/thepigdestroyer)     |  2  | #2290, #2291                                                                                     |
| [@josephvoxone](https://github.com/josephvoxone)           |  1  | #2289                                                                                            |
| [@mrmm](https://github.com/mrmm)                           |  3  | #2286, #2305, #2308                                                                              |

## [3.7.9] — 2026-05-03

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)

- **feat(compression):** major upgrade to Caveman and RTK compression pipelines (#1876, #1889):
  - Add RTK tool-output compression, stacked Caveman + RTK pipelines, compression combo assignments, dashboard context pages, MCP management tools, and language-aware Caveman rule packs.
  - Expand RTK parity with a 39-filter catalog, RTK-style JSON DSL stages, inline verify/benchmark coverage, trust-gated custom filters, expanded command detection, and redacted raw-output recovery.
  - Expose rule intensities, track USD savings, unify config validation, and persist MCP savings.
  - Expand Caveman parity and MCP metadata compression.
- **feat(provider):** update Jina AI model catalog to support Embeddings and Rerank natively (#1874 — thanks @backryun)
- **feat(provider):** add NanoGPT image generation provider (#1899 — thanks @Aculeasis)
- **feat(ui):** move proxy configuration to dedicated System → Proxy page (#1907 — thanks @oyi77)
- **feat(ui):** add K/M/B/T cost shortener utility (#1902 — thanks @oyi77)
- **feat(providers):** implement bulk paste for extra API keys (#1916 — thanks @0xtbug)
- **feat(analytics):** usage history API key backfill + dark mode pricing (#1896 — thanks @Gi99lin)
- **feat(logs):** show RTK and Caveman compression token savings accurately in request log UI (#1923 — thanks @emdash)
- **feat(routing):** auto-skip exhausted quota accounts (Issue #1952)
- **feat(docs):** docs site overhaul (#1976 — thanks @oyi77)
- **feat(db):** consolidate all database settings into SystemStorageTab (closes #1935) (#1947 — thanks @oyi77)
- **feat(sse):** codex 429 mid-task failover with account rotation (#1888 — thanks @smartenok-ops)
- **feat(auto-assessment):** add auto-assessment engine for combo self-healing (#1918 — thanks @oyi77)
- **feat(usage):** DeepSeek V4 native cache token extraction (#1930 — thanks @smartenok-ops)
- **feat(cost):** enhance cost formatting and add Codex GPT-5.5 pricing support (#1944 — thanks @JxnLexn)

### 🐛 Bug Fixes

- **fix(auth):** implement session affinity sticky routing logic
- **fix(dashboard):** derive display base URL from origin instead of hardcoding localhost (#1960 — thanks @jeanfbrito)
- **fix(proxy):** use credentials.connectionId instead of non-existent credentials.id for image proxy resolution (#1929 — thanks @Aculeasis)
- **fix(routing):** codex bare-name disambiguation + family-native fallback (#1933 — thanks @smartenok-ops)
- **fix(infrastructure):** move wreq-js to optionalDependencies and add Node 25/26 to secure runtime policy (#1924)
- **fix(providers):** resolve ChatGPT Web authentication failure by aligning TLS fingerprint User-Agent strings (#1925)
- **fix(mitm):** support root user for MITM sudo handling (#1948 — thanks @NekoMonci12)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941, #1945)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)
- **fix(mcp):** reclassify MCP endpoints to ensure API key authentication works even when dashboard auth is enabled (#1970)
- **fix(providers):** allow local OpenAI-compatible endpoints (like Ollama) to be added without an API key (fixes #1893)
- **fix(providers):** bypass AgentRouter unauthorized_client_error by spoofing Claude CLI headers via Anthropic endpoints (fixes #1921)
- **fix(copilot):** emit compatible reasoning text deltas (#1919 — thanks @ivan-mezentsev)
- **fix(api-manager):** show validation errors inline in modals, not behind (#1920 — thanks @andrewmunsell)
- **fix(compression):** align seeded standard savings combo with stacked default, preserve stacked defaults, and secure metadata routes.
- **fix(gemini-cli):** separate Cloud Code transport from Antigravity (#1869 — thanks @dhaern)
- **fix(codex):** map prompt field to input array for Cursor compatibility (fixes #1872)
- **fix(core):** align stream parameter default to false per strict OpenAI spec (fixes #1873)
- **fix(ui):** restore Next.js CSP `unsafe-eval` in production `script-src` to fix unresponsive Onboarding button (fixes #1883)
- **fix(proxy):** globally strip `prompt_cache_retention` in `BaseExecutor` to prevent upstream 400 errors from strict endpoints like droid/gemini-2-pro (fixes #1884)
- **fix(ui):** include `isOpen` dependency in `EditConnectionModal` state sync to ensure `maxConcurrent` is properly hydrated when reopening the modal (fixes #1859)
- **fix(security):** remediate 4 polynomial-redos CodeQL alerts in compression regexes by bounding repetitions and removing overlapping quantifiers
- **fix(codex):** flatten Chat Completions tool format to Codex Responses format in `normalizeCodexTools` — prevents `Missing required parameter: tools[0].name` upstream errors (#1914 — thanks @tranduykhanh030)
- **fix(proxy):** add proxy-aware execution context to image generation route — proxy settings are now correctly applied for image providers behind restricted networks (#1904 — thanks @Aculeasis)
- **fix(translator):** inject `properties: {}` into zero-argument MCP tool schemas during Anthropic→OpenAI translation — prevents 400 errors from OpenAI strict schema validation (#1898 — thanks @bryceIT)
- **fix(codex):** sanitize raw responses input (#1895 — thanks @dhaern)
- **fix(combos):** align strategy contracts (#1892 — thanks @dhaern)
- **fix(combos):** fix combo provider breaker profile handling (#1891 — thanks @rdself)
- **fix(migrations):** duplicate-column no-op fix (#1886 — thanks @smartenok-ops)
- **fix(auth):** per-connection OAuth refresh mutex (#1885 — thanks @smartenok-ops)
- **fix(auth):** require dashboard management auth for compression preview

### 🔄 Updates

- **chore(provider):** Add reka models list (#1956 — thanks @backryun)
- **chore(model):** Update new models, Delete Deprecated models (#1949 — thanks @backryun)

### 📝 Documentation

- **docs(compression):** document RTK+Caveman stacked savings ranges

### 🏆 Release Attribution & Retroactive Credits

- **@payne0420** (PR #1828 / #1839) — Implementation of the **Rate Limit Watchdog** and environment overrides. (This feature was manually backported to v3.7.8, causing the automatic GitHub Release notes to omit the author's credit).

---

## [3.7.8] — 2026-05-01

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** add Grok 4.3 and Xiaomi Mimo TTS provider (#1837)
- **feat(core):** implement Rate Limit Watchdog with environment override capability to detect and reset stalled queues (#1839)
- **feat(providers):** add muse-spark-web provider with multiple models and reasoning support (#1843)
- **feat(1proxy):** integrate 1proxy free proxy marketplace with dashboard management and new MCP tools (closes #1788) (#1847)

### 🐛 Bug Fixes

- **fix(codex):** sanitize Responses replay state to prevent internal assistant commentary from leaking (#1868 — thanks @dhaern)
- **fix(cli):** add capture-backed Gemini CLI fingerprint (#1866)
- **fix(ui):** hide combo compression controls when the global setting is disabled (#1840)
- **fix(db):** tolerate missing request_detail_logs table for legacy deployments (#1848)
- **fix(core):** remove unneeded \`store\` payload parameter for providers lacking support (closes #1841)
- **fix(core):** ensure safeOutboundFetch and A2A routers return 503 Service Unavailable when security guardrails are triggered
- **fix(usage):** correct Unix seconds vs milliseconds parsing logic for Kiro AI quota reset (closes #1849)
- **fix(ui):** apply robust NaN handling, ensure 24h consistency, and fix missing hour slots in Compression Analytics (closes #1844)
- **fix(ui):** implement short number formatting for token consumption metrics on cache pages to prevent overflow (closes #1842)
- **fix(combo):** stabilize provider routing at 500+ connections by bounding semaphore queues and adjusting circuit breaker tracking (closes #1846) (#1854)
- **fix(maritalk):** update Maritalk model list, use Authorization Key header, and align with latest API endpoints (#1856)
- **fix(grok-web):** stabilize tool calling (bash, readFile, webSearch) and response parsing by mapping native Grok intents to standard OpenAI payloads (#1857)
- **fix(providers):** correctly map and expose the Upstage embedding and chat model catalogs (#1855)
- **fix(executor):** apply proper urlSuffix and custom authHeaders for unknown registry-based providers in DefaultExecutor (closes #1846) (#1861)

### 🛠️ Maintenance

- **fix(workflow):** build docker images on version tags (#1838)

---

## [3.7.7] — 2026-04-30

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **Prompt Compression Pipeline:** Implemented a multi-phase prompt compression engine including `lite` (whitespace/duplication collapse), `aggressive` (summarization, tool compression), and `ultra` modes (heuristic pruning and SLM stub) (#1633, #1738, #1739, #1741)
- **Compression Dashboard & Analytics:** Added a compression settings UI, real-time log viewer, pipeline statistics tracking, and interactive playground preview (#1756)
- **Compression Caching & MCP:** Added caching-aware strategy adjustments to the compression pipeline, alongside new MCP tools for status and configuration (#1758)
- **Analytics Custom Filters:** Added custom date range selection, API key filtering, and NULL key analytics backfilling to the Costs Dashboard (#1830)

### 🐛 Bug Fixes

- **Combo Routing:** Fixed an issue where Gemini `-preview` models were incorrectly normalized to their canonical names, causing 404 errors during combo routing (#1834)
- **Codex Native Passthrough:** Added support for Cursor 5.5 sending `messages` arrays to the `responses/compact` endpoint, preventing upstream rejections with empty requests (#1832)
- **Rate-limit Watchdog:** Implemented a new rate-limit watchdog with environment override capabilities and Stage Tracing to prevent and diagnose silent wedges (#1828)
- **Encryption Resiliency:** Prevent sending encrypted tokens to providers by returning null on decryption failure (#763d353)
- **i18n & Locales:** Fixed OpenCode baseUrl locale placeholders and added compression keys across 32 languages
- **Startup Stability:** Hardened resilience integration server startup logic (#9aa89b17)

### 🛠️ Maintenance

- **Tests & Docs:** Expanded the test suite with 61 unit/integration tests for the compression pipeline and updated `AGENTS.md`
- **Workflow:** Fixed the changelog extraction logic to accurately capture GitHub release descriptions

---

## [3.7.6] — 2026-04-30

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(api-keys):** add rename support in the permissions modal — editable key name field with validation (#1796)
- **feat(chatgpt-web):** support `thinking_effort` parameter (Standard/Extended) for thinking-capable models (#1821)
- **feat(dashboard):** implement remaining v3.7.6 dashboard features — Costs overview, Translator pipeline, and Endpoint tabs improvements
- **feat(tools):** inject fallback tool names to prevent upstream 400 errors on providers that require tool names (#1775)
- **feat(db):** auto-restore probe-failed database on startup to prevent data loss after failed upgrades (#1810)
- **feat(analytics):** add cost-based usage insights and activity streaks in the analytics dashboard

### 🔒 Security

- **fix(security):** resolve ReDoS vulnerability in Codex executor regex patterns (#1797, #1789)

### 🐛 Bug Fixes

- **fix(stability):** resolve codex input validation, enable combo circuit breaker, and fix broken unit tests (#1804, #1805)
- **fix(stability):** safely cast inputs to strings before calling `.trim()` to avoid crashes on numeric fields in proxy modal (#1825)
- **fix(stability):** clear active requests and recover providers after connection failures (#1824)
- **fix(xiaomi-mimo):** update models to V2.5, fix Token Plan validation and default region (#1823)
- **fix(codex):** omit compact client metadata to prevent upstream rejections (#1822)
- **fix(dashboard):** fix endpoint visibility, A2A status display, and API catalog consistency (#1806)
- **fix(analytics):** use pure SQL aggregations — no history rows loaded into memory (#1802)
- **fix(dashboard):** correct `loadPresets` ReferenceError in CostOverviewTab
- **fix(mitm):** enforce transparent interception on port 443 only

### 🧹 Chores

- **chore(workflow):** mandate implementation plan generation in `/review-issues` workflow before coding
- **chore(release):** expand contributor credits to 155 PRs across full project history

### 🏆 Community Contributors Acknowledgment

We identified that **155 community PRs** across the entire project history (from inception through v3.7.5) were manually integrated into release branches but closed instead of properly merged through GitHub, preventing contributors from receiving merge credit on their profiles. We sincerely apologize for this oversight and have since updated our workflows to ensure this never happens again.

**The following contributors had their code and ideas integrated across multiple releases without proper merge credit. Thank you for your invaluable contributions to OmniRoute:**

| Contributor                                                  | PRs (Total) | All Contributions                                                                                                                                                                   |
| :----------------------------------------------------------- | :---------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@rdself](https://github.com/rdself)                         |     28      | #542, #705, #717, #737, #738, #841, #851, #853, #875, #880, #888, #891, #903, #904, #974, #1069, #1089, #1196, #1267, #1272, #1299, #1300, #1356, #1357, #1441, #1443, #1549, #1742 |
| [@oyi77](https://github.com/oyi77)                           |     27      | #644, #672, #700, #850, #859, #862, #868, #874, #881, #883, #908, #926, #931, #983, #990, #1019, #1020, #1021, #1103, #1281, #1286, #1363, #1368, #1377, #1411, #1689, #1717        |
| [@clousky2020](https://github.com/clousky2020)               |     15      | #1244, #1323, #1365, #1366, #1408, #1442, #1484, #1595, #1598, #1599, #1611, #1618, #1620, #1621, #1644                                                                             |
| [@benzntech](https://github.com/benzntech)                   |      8      | #158, #1264, #1435, #1436, #1437, #1440, #1444, #1677                                                                                                                               |
| [@kang-heewon](https://github.com/kang-heewon)               |      5      | #530, #854, #884, #1235, #1574                                                                                                                                                      |
| [@herjarsa](https://github.com/herjarsa)                     |      4      | #1472, #1474, #1477, #1480                                                                                                                                                          |
| [@backryun](https://github.com/backryun)                     |      4      | #1358, #1609, #1627, #1722                                                                                                                                                          |
| [@tombii](https://github.com/tombii)                         |      4      | #708, #856, #900, #1013                                                                                                                                                             |
| [@christopher-s](https://github.com/christopher-s)           |      3      | #868, #885, #992                                                                                                                                                                    |
| [@zen0bit](https://github.com/zen0bit)                       |      3      | #561, #650, #912                                                                                                                                                                    |
| [@k0valik](https://github.com/k0valik)                       |      3      | #554, #587, #596                                                                                                                                                                    |
| [@zhangqiang8vip](https://github.com/zhangqiang8vip)         |      2      | #470, #575                                                                                                                                                                          |
| [@wlfonseca](https://github.com/wlfonseca)                   |      2      | #997, #1016                                                                                                                                                                         |
| [@RaviTharuma](https://github.com/RaviTharuma)               |      2      | #1188, #1277                                                                                                                                                                        |
| [@prakersh](https://github.com/prakersh)                     |      2      | #419, #480                                                                                                                                                                          |
| [@payne0420](https://github.com/payne0420)                   |      2      | #1593, #1670                                                                                                                                                                        |
| [@only4copilot](https://github.com/only4copilot)             |      2      | #855, #1039                                                                                                                                                                         |
| [@jay77721](https://github.com/jay77721)                     |      2      | #581, #582                                                                                                                                                                          |
| [@hijak](https://github.com/hijak)                           |      2      | #295, #578                                                                                                                                                                          |
| [@hartmark](https://github.com/hartmark)                     |      2      | #1494, #1500                                                                                                                                                                        |
| [@defhouse](https://github.com/defhouse)                     |      2      | #906, #946                                                                                                                                                                          |
| [@xiaoge1688](https://github.com/xiaoge1688)                 |      1      | #1304                                                                                                                                                                               |
| [@xandr0s](https://github.com/xandr0s)                       |      1      | #1376                                                                                                                                                                               |
| [@willbnu](https://github.com/willbnu)                       |      1      | #882                                                                                                                                                                                |
| [@slewis3600](https://github.com/slewis3600)                 |      1      | #1624                                                                                                                                                                               |
| [@sergey-v9](https://github.com/sergey-v9)                   |      1      | #594                                                                                                                                                                                |
| [@razllivan](https://github.com/razllivan)                   |      1      | #987                                                                                                                                                                                |
| [@nmime](https://github.com/nmime)                           |      1      | #1271                                                                                                                                                                               |
| [@Moutia-Ben-Yahia](https://github.com/Moutia-Ben-Yahia)     |      1      | #1663                                                                                                                                                                               |
| [@Mind-Dragon](https://github.com/Mind-Dragon)               |      1      | #467                                                                                                                                                                                |
| [@mercs2910](https://github.com/mercs2910)                   |      1      | #1001                                                                                                                                                                               |
| [@MAINER4IK](https://github.com/MAINER4IK)                   |      1      | #196                                                                                                                                                                                |
| [@luandiasrj](https://github.com/luandiasrj)                 |      1      | #996                                                                                                                                                                                |
| [@knopki](https://github.com/knopki)                         |      1      | #1434                                                                                                                                                                               |
| [@kfiramar](https://github.com/kfiramar)                     |      1      | #389                                                                                                                                                                                |
| [@ken2190](https://github.com/ken2190)                       |      1      | #166                                                                                                                                                                                |
| [@keith8496](https://github.com/keith8496)                   |      1      | #569                                                                                                                                                                                |
| [@jonesfernandess](https://github.com/jonesfernandess)       |      1      | #1118                                                                                                                                                                               |
| [@JasonLandbridge](https://github.com/JasonLandbridge)       |      1      | #1626                                                                                                                                                                               |
| [@i1hwan](https://github.com/i1hwan)                         |      1      | #1386                                                                                                                                                                               |
| [@Gorchakov-Pressure](https://github.com/Gorchakov-Pressure) |      1      | #754                                                                                                                                                                                |
| [@foxy1402](https://github.com/foxy1402)                     |      1      | #934                                                                                                                                                                                |
| [@dt418](https://github.com/dt418)                           |      1      | #896                                                                                                                                                                                |
| [@dhaern](https://github.com/dhaern)                         |      1      | #1647                                                                                                                                                                               |
| [@DavyMassoneto](https://github.com/DavyMassoneto)           |      1      | #211                                                                                                                                                                                |
| [@dail45](https://github.com/dail45)                         |      1      | #1413                                                                                                                                                                               |
| [@congvc-dev](https://github.com/congvc-dev)                 |      1      | #1569                                                                                                                                                                               |
| [@be0hhh](https://github.com/be0hhh)                         |      1      | #1581                                                                                                                                                                               |
| [@andruwa13](https://github.com/andruwa13)                   |      1      | #1457                                                                                                                                                                               |
| [@AndrewDragonIV](https://github.com/AndrewDragonIV)         |      1      | #898                                                                                                                                                                                |
| [@AndersonFirmino](https://github.com/AndersonFirmino)       |      1      | #362                                                                                                                                                                                |
| [@alexsvdk](https://github.com/alexsvdk)                     |      1      | #1280                                                                                                                                                                               |
| [@abhinavjnu](https://github.com/abhinavjnu)                 |      1      | #550                                                                                                                                                                                |

---

## [3.7.5] — 2026-04-29

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(tunnels):** integrate native ngrok tunnel support with dashboard UI parity (#1753)

### 🐛 Bug Fixes

- **fix(dashboard):** add manual 'Clear All' button to terminate stalled long-running requests in Active Requests panel (#1799)
- **fix(schema):** remove empty string values from optional tool parameters to prevent upstream validation errors (#1674)
- **fix(providers):** ensure proper streaming cleanup and semaphore release to prevent stalls with nanoGPT (#1781)
- **fix(db):** wrap quota_snapshots access in try/catch to gracefully handle pending database migrations (#1784)
- **feat(providers):** add support for glm-cn (BigModel) provider (#1770)
- **fix(grok-web):** fix Grok validator and cookie parsing (#1793)
- **fix(antigravity):** scrub internal OmniRoute headers (#1794)
- **fix(chatgpt-web):** restore validator + expand model catalog to ChatGPT Plus tier (#1792)
- **fix(codex):** stabilize Copilot responses replay state (#1791)
- **fix(antigravity):** cap Claude bridge output tokens (#1785)
- **fix(schema):** strip `default` properties from tool-call JSON schemas during egress to prevent injection errors (#1782)
- **fix(db):** add `quota_snapshots` table to core DB schema initialization to prevent startup failures on fresh installs
- **fix(models):** apply blocked providers filter to non-chat catalog models (image, embedding, audio, etc.) (#1752)
- **fix(antigravity):** stabilize streaming payload parsing and deduplicate usage/model metadata refreshes (#1748)
- **fix(antigravity):** normalize Gemini bridge payloads — sanitize tool names, cap output tokens, and fix thinking budget (#1769)
- **fix(sse):** propagate AbortSignal to pre-fetch semaphore and rate-limit awaits to prevent memory leaks (#1771)
- **fix(models):** fix model sync import handling — separate synced models from custom models to prevent data loss (#1755)
- **fix(codex):** improve VS Code Copilot /responses reasoning and tool follow-ups (#1750)
- **fix(memory):** resolve build issues and implement memory UPSERT logic to prevent duplicate entries (#1763)
- **fix(kiro):** support organization IDC OAuth with regional endpoints and refresh (#1754)
- **fix(combo):** include 429 in provider circuit breaker to stop infinite retry loops on exhausted quotas (#1767)
- **fix(claude):** respect client-set thinking/effort params — only inject adaptive thinking and high effort when the client hasn't explicitly set them, preventing forced quota drain on Claude Max accounts (#1761)
- **fix(blackbox-web):** correct cookie name and populate session/subscription fields (#1776)
- **fix(codex):** align client identity metadata (#1778)
- **fix(claude):** fix support for claude-cli using Gemini provider (#1779)
- **test(reasoning-cache):** isolate DB state using mkdtempSync to prevent 401 middleware errors

### 🛠️ Maintenance

- **chore(docs):** add MseeP.ai security assessment badge to README (#1727)
- **chore(xiaomi):** update Xiaomi provider model list (#1759)
- **chore(db):** move DB health endpoint to management API (#1757)
- **chore(ui):** speed up endpoint initial render with background task loading (#1760)
- **chore(workflows):** add strict PR contributor credit policy to prevent future merge credit loss

---

## [3.7.4] — 2026-04-28

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(ui):** add endpoint tunnel visibility settings (#1743)
- **feat(cli):** refresh CLI fingerprint provider profiles (#1746)
- **feat(proxy):** implement bulk proxy import via pipe-delimited parser with update-or-create (upsert) logic and real-time preview table
- **feat(pwa):** add fullscreen installable PWA with manifest, service worker, and cross-platform app icons (#1728)

### 🔒 Security

- **security:** replace insecure `Math.random` with `crypto.getRandomValues` for fallback UUID generation to resolve CodeQL CWE-338 finding (#182)

### 🐛 Bug Fixes

- **fix(cc-compatible):** fix CC-compatible relay format and UI copy (#1742)
- **fix(codex):** normalize max reasoning effort for Codex routing (#1744)
- **fix(claude-code):** fix Claude Code gateway config helper (#1745)
- **fix(db):** reconcile legacy `create_reasoning_cache` migration tracking to prevent version shadowing on `032` and resolve startup warnings (#1734)
- **fix(db):** intercept `007` migration to use idempotent `IF NOT EXISTS` logic via `PRAGMA table_info`, preventing syntax crashes on fresh installs (#1733)
- **fix(cc-compatible):** preserve Claude Code system skeleton to prevent request rejection by strict compatible upstream providers (#1740)

- **fix(providers):** add API key validation for image-only providers and fix Stability AI requests to use `multipart/form-data` instead of JSON (#1726)
- **fix(codex):** preserve `previous_response_id` and `conversation_id` fields when input array is empty to prevent schema validation errors (#1729)
- **fix(searxng):** bypass UI validation block when `apiKeyOptional` is true and fix typing errors in provider dashboard to allow saving search providers without credentials (#1721)
- **fix(proxy):** disable HTTP keep-alive and pipelining in Undici proxy dispatcher to prevent "Socket hang up" rotation failures
- **stream:** correctly identify `thought` and `error` blocks in Antigravity/Gemini SSE streams to prevent premature 502 timeouts (#1725, #1705)

### 🛠️ Maintenance

- **workflow:** add phase 4 release monitoring instructions to `/generate-release` workflow
- **test:** fix typescript compilation errors in unit tests to keep CI typecheck pipeline fully green
- **test:** update responses store expectations for empty input arrays

---

## [3.7.3] — 2026-04-28

### 🐛 Bug Fixes

- **fix(claude):** strip existing billing headers from system array before injecting to prevent Anthropic prompt cache misses — stacked `x-anthropic-billing-header` blocks invalidated prefix matching, causing ~100% cache_create instead of cache_read (#1712)
- **fix(claude):** strip `output_config.format` for non-Anthropic Claude-compatible providers during passthrough — third-party Claude endpoints (MiniMax, DeepSeek via aggregators) reject structured output fields with 400 errors (#1719)
- **fix(combo):** set terminal error state on response quality validation failure — prevents misleading `ALL_ACCOUNTS_INACTIVE` 503 when the real issue is response quality validation (#1707, #1710)
- **fix(combo):** treat combo fallback as target-level orchestration — all non-ok responses (including generic 400s) now fall through to the next target instead of being terminal; removes complex bad-request allowlist regex (#1713)
- **fix(codex):** restore namespace MCP tools and hosted-tool whitelist — regression from #1581 that silently dropped all MCP tool groups and Responses-API hosted tools (#1715)
- **fix(codex):** add neutral instructions for bare chat requests — Codex Responses backend rejects requests without `instructions`, making Codex unusable for normal chat (#1709)
- **fix(proxy):** wrap proxy assignment queries in try-catch for missing `proxy_assignments` table — Electron installs where migration 004 hasn't run no longer crash with `no such table` error (#1706)
- **fix(migration):** improve Windows file URL path resolution in migration runner — adds direct URL path extraction and `process.cwd()` fallback for CI-built bundles with leaked build-time paths (#1704)
- **fix(ui):** fix light mode active request payload modal — add missing `--color-card` theme token, use opaque `bg-surface` instead of translucent `bg-card/70`, add backdrop blur (#1714)

### 🔄 Updates

- **chore(image-models):** refresh image generation model registry — replace stale FLUX aliases with FLUX Kontext / FLUX.2 mappings, remove deprecated FLUX Redux/Depth/Canny variants (#1722)

---

## [3.7.2] — 2026-04-28

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(authz):** introduce centralized proxy-based authz pipeline and lifecycle policy (#1632)
- **feat(logs):** configure call log pipeline artifacts (#1650)
- **feat(network):** add guarded remote image fetch utility
- **feat(codex):** enable native Codex websocket responses on beta-gated models (#1658)
- **feat(muse-spark-web):** continue the same meta.ai conversation across turns (#1673)

### 🐛 Bug Fixes

- **fix(responses):** sanitize empty string placeholders from tool-call optional arguments in stream delta accumulation to avoid breaking strict clients (#1674)
- **fix(codex):** prevent unexpected protocol leakage and fabricated instructions on bare chat completion requests without tools (#1686)
- **fix(executors):** truncate tools array to 128 items max in GitHub Copilot and OpenCode executors to mitigate 400 Bad Request errors from upstream (#1687)
- **fix:** add body-read timeout to prevent stuck pending requests (#1680)
- **fix(rate-limit):** replace unsupported Bottleneck `maxWait` option with job-level `expiration` to prevent indefinite queue stalls (#1694)
- **fix(sse):** sanitize OpenAI tool schemas for strict upstream validators — strips null from enum arrays, normalizes tuple items, filters invalid required keys (#1692)
- **fix(stream):** fail zombie SSE streams before accepting response — returns 504 instead of hanging indefinitely, enables combo fallback (#1693)
- **fix(combo):** complete context truncation hotfix — cache getCombos() with 10s TTL, pass allCombosData to resolveComboTargets() for nested combo resolution, consolidate duplicated context overflow regex patterns (#1685)
- **fix(codex):** raise default quota threshold from 90% to 99% to avoid premature account blocking when usable quota remains (#1697)
- **fix(memory):** use `user` role for GLM/ZAI/Qianfan providers — providers with strict role constraints (no `system` role) now correctly receive memory context as a `user` message instead of a `system` message, preventing 422 validation errors (#1701)
- **fix(oauth):** target specific connection by ID on re-auth token exchange — prevents duplicate account creation when re-authenticating an existing OAuth connection (#1702 — thanks @namhhitvn)
- **feat(email-privacy):** integrate email visibility toggle in RequestLoggerV2 — log detail modal now respects global email privacy state, hiding email addresses by default (#1700 — thanks @namhhitvn)
- **fix(combo):** trigger fallback on Anthropic `Invalid signature in thinking block` errors instead of returning 400 directly (#1696)
- **fix:** combo retry loop stops immediately on client disconnect (499) (#1681)
- **fix(search):** support optional bearer auth for SearXNG (#1683)
- **fix(vision):** respect native GPT vision support — prevents VisionBridge from intercepting models that already handle images natively (#1678)
- **fix(qwen):** use `security.auth` format instead of `modelProviders` for Qwen Code config generation (#1677)
- **fix(codex):** remove stale websocket transport lookup that caused fallback errors (#1676)
- **fix(chatgpt-web):** bound tls-client native deadlocks so requests never hang forever (#1664)
- **fix(codex):** default gpt-5.5 to HTTP transport instead of WebSocket (#1660)
- **fix(codex):** [urgent] fix gpt-5.5 websocket transport and model labels (#1656)
- **fix(grokweb):** update Request and Response Specifications (#1655)
- **fix(blackbox-web):** set isPremium flag to true to enable premium model access (#1661)
- **fix(core):** avoid OpenAI stream options for Anthropic-compatible providers (#1654)
- **fix(electron):** resolve MCP server start failure on Windows (#1662)
- **fix(electron):** make Windows smoke test non-blocking (continue-on-error), pre-create userData dir for Windows + stream logs in CI, and add --no-sandbox and sandbox env for CI smoke tests
- **fix(codex):** fix `getWreqWebsocket` ReferenceError causing 502 on all Codex requests (#1652, #1653)
- **fix(codex):** default `store` to `false` — Codex OAuth backend rejects `store=true` (#1635)
- **fix(db):** add post-migration guards for missing `batches` table and `combos.sort_order` column on DB upgrades (#1648, #1657)
- **fix(db):** renumber duplicate migration `032` to prevent collision
- **fix(perplexity-web):** update API version and user-agent to match upstream requirements (#1666)
- **fix(docker):** copy SQLite migration files and explicitly trace in standalone build (#1665)
- **fix(muse-spark-web):** update to Meta's Ecto-era persisted query — fixes 502 `Unknown type "RewriteOptionsInput"` after Meta retired the Abra mutation (#1668)
- **fix(dev):** enable Turbopack by default and repair Codex CORS headers (#1669)
- **fix(authz):** restore `REQUIRE_API_KEY` support in clientApi policy
- **fix(auth):** align fallback API key format with test setup

### 🛠️ Maintenance

- **build(prepublish):** make Next.js build bundler configurable (webpack/turbopack)
- **ci:** align sonar analysis scope
- **ci:** stabilize release branch checks
- **ci:** remove expired advanced security scans job

### 🧪 Tests

- **test:** fix TypeScript configuration errors in plan3-p0.test.ts
- **test:** fix implicit any types across test suites
- **test:** disable type checking in flaky unit tests
- **test:** fix failing tests due to recent refactors
- **fix(tests):** align integration tests with authz pipeline refactor
- **fix(tests):** align test assertions with v3.7.2 source code changes
- **fix(tests):** CORS test now checks object body instead of entire file
- **fix(e2e):** fix E2E flakiness and implicit any type errors

---

## [3.7.1] — 2026-04-26

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Add GPT-5.5 support to the Codex provider — includes 1.05M context window, tool calling, vision, and reasoning capabilities with proper pricing entries across `cx` and `openai` providers. Refactors `splitCodexReasoningSuffix()` into a shared helper for cleaner effort-level parsing (#1617 — thanks @Zhaba1337228).
- **feat(cli):** Add `omniroute reset-encrypted-columns` recovery command — nulls encrypted credential columns (`api_key`, `access_token`, `refresh_token`, `id_token`) in `provider_connections` while preserving provider metadata, giving users affected by #1622 a clean recovery path without losing configurations.
- **feat(i18n):** Expand locale coverage with nine new language packs (Bengali, Farsi, Gujarati, Indonesian, Marathi, Swahili, Tamil, Telugu, Urdu), bringing total language support from 32 to 41 locales.

### 🐛 Bug Fixes

- **fix(rate-limit):** Add per-model rate limiting for GitHub Copilot provider — a 429 on one model (e.g. `gpt-5.1-codex-max`) no longer locks the entire connection, matching the existing Gemini per-model quota pattern (#1624 — thanks @slewis3600).
- **fix(cli-tools):** Preserve existing OpenCode configuration (MCP servers, custom providers, comments) when saving OmniRoute settings — uses `jsonc-parser` for tree-preserving edits instead of destructive JSON roundtrip. Fix API key clipboard copy to use raw keys instead of masked placeholders. Add theme-aware OpenCode light/dark SVG logos (#1626 — thanks @JasonLandbridge).
- **fix(cli-tools):** Fix OpenCode guide step 3 `{{baseUrl}}` double-brace placeholder to use ICU-style `{baseUrl}` across all 41 locales, restoring next-intl interpolation (#1626).
- **fix(codex):** Make `wreq-js` native module import lazy and optional to prevent server crash on startup when the platform-specific binary is missing — affects pnpm installs, Docker Alpine, macOS ARM, and Windows (#1612, #1613, #1616).
- **fix(i18n):** Add 14 missing translation keys (`logs.runningRequests`, `logs.model`, `logs.provider`, `logs.account`, `logs.elapsed`, `logs.count`, `logs.payloads`, etc.) for the Active Requests panel across all locales. Replace 83 placeholder values in usage/evals namespace. Add 5 missing health namespace keys for rate limit status.
- **fix(encryption):** Prevent `STORAGE_ENCRYPTION_KEY` from being silently regenerated during `npm install -g` upgrades, which made all previously-encrypted provider credentials permanently unrecoverable due to AES-GCM auth-tag mismatch (#1622).
- **fix(startup):** Add decrypt-probe diagnostic at server bootstrap — if `STORAGE_ENCRYPTION_KEY` doesn't match encrypted credentials in the database, a prominent warning is logged directing users to restore the key or use the new recovery command.
- **fix(cli-tools):** Allow `null` API key values in `cliModelConfigSchema` to prevent 400 Bad Request errors when saving cloud-based CLI tool configurations. Fix error handling across all 10 ToolCard components to safely extract messages from structured error objects, preventing React Error #31 crashes.
- **fix(docker):** Set `NPM_CONFIG_LEGACY_PEER_DEPS=true` in the Docker builder layer before `npm ci` and remove duplicate `postinstallSupport.mjs` COPY instruction — fixes container image build failures introduced in v3.7.0 (#1630 — thanks @rdself).
- **fix(antigravity):** Hide deprecated Gemini-routed Claude 4.5 models from public catalogs and model lists. Legacy `gemini-claude-*` aliases now silently resolve to current Claude 4.6 equivalents. Replace dynamic reverse-alias generation with an explicit allowlist for predictable model visibility (#1631 — thanks @backryun).
- **fix(types):** Add explicit type annotations to sync-env test helpers and dynamic import casts to satisfy `typecheck:noimplicit:core` CI gate.
- **fix(reasoning):** Implement Reasoning Replay Cache — hybrid memory/SQLite persistence for `reasoning_content` in multi-turn tool-calling flows. Automatically captures reasoning from DeepSeek V4, Kimi K2, Qwen-Thinking, and GLM models and re-injects it on follow-up turns to prevent HTTP 400 errors from strict reasoning-content validation. Includes dashboard telemetry tab, REST API, and 21 unit tests (#1628 — thanks @JasonLandbridge).
- **fix(postinstall):** Extend postinstall native module repair to cover `wreq-js` — detects missing platform-specific `.node` binaries inside `app/node_modules/wreq-js/rust/` and copies them from the root install. Fixes global `pnpm` installs on macOS arm64 where the standalone app directory only contained Linux binaries (#1634 — thanks @MarcosT96).
- **fix(migration):** Prevent compat-renamed migration slots from shadowing new migrations at the same version number. After rewriting `028_provider_connection_max_concurrent` → `029`, the runner now verifies the old version slot is clear, ensuring `028_create_files_and_batches` runs on v3.6.x → v3.7.x upgrades. Adds `batches` table as a physical schema sentinel for upgrade recovery (#1637 — thanks @V8-Software).
- **fix(registry):** Route GitHub Copilot GPT 5.4/5.5 models through the Responses API (`targetFormat: "openai-responses"`). Fixes `gpt-5.4-mini` and `gpt-5.4` being rejected on `/chat/completions` by GitHub (#1641 — thanks @dhaern).
- **fix(usage):** Correct MiniMax token plan quota display — the newer `/v1/token_plan/remains` endpoint reports used counts, not remaining counts. Rounds floating-point percentage artifacts in Provider Limits UI (#1642 — thanks @CruxExperts).
- **fix(codex):** Lazy-load `wreq-js` WebSocket transport via `createRequire` instead of top-level import. Server boots cleanly when native module is unavailable and returns 503 only when Codex WebSocket is actually requested. Fixes #1612 (#1640 — thanks @dendyadinirwana).
- **fix(electron):** Package Electron runtime dependencies into `resources/app/node_modules/` via separate `extraResources` FileSet. Adds cross-platform packaged app smoke test script and CI integration to prevent future regressions. Closes #1636 (#1639 — thanks @prateek).
- **feat(account-fallback):** Add model-level daily quota lockout. When a provider returns 429 with `quota_exhausted`, cooldown is set to tomorrow 00:00 instead of exponential backoff. Detects daily quota patterns via `isDailyQuotaExhausted()` in chat handler (#1644 — thanks @clousky2020).
- **fix(codex):** Use per-conversation `session_id`/`conversation_id` from client body as `prompt_cache_key` instead of account-wide `workspaceId`. The official Codex CLI uses `conversation_id` (a unique UUID per session); using the shared `workspaceId` capped cache hit-rate at ~49%. Includes 10 unit tests (#1643).
- **fix(claude):** Stabilize billing header fingerprint to prevent Anthropic prompt-cache prefix invalidation. The fingerprint was derived from the first user message text, which changes every turn, mutating `system[]` and forcing ~100% `cache_create`. Now uses a stable per-day hash, preserving ~96% `cache_read` hit rate (#1638).
- **fix(transport):** Harden GitHub and Kiro streaming — thread `clientHeaders` through `BaseExecutor.buildHeaders()` to eliminate mutable singleton state race condition on concurrent requests. Remove redundant `[DONE]` stripping TransformStream from GitHub executor. Add defensive `parseToolInput()` for malformed Kiro tool call arguments. Hoist `TextEncoder`/`TextDecoder` to module singletons and use zero-copy `subarray()` (#1645 — thanks @dhaern).
- **fix(transport):** Prevent memory bloat and database exhaustion from large, fragmented streaming responses. Implemented `ByteQueue` in `kiro.ts` for zero-copy binary accumulation, refactored `antigravity.ts` for incremental SSE parsing, and enforced a strict 512KB tiered truncation limit (`MAX_CALL_LOG_ARTIFACT_BYTES`) on stream request logs and call artifacts (#1647).
- **chore(ci):** Update build environment dependencies — bump Node to `24.15.0`, `actions/checkout@v6`, `docker/build-push-action@v7`, pin `actions/setup-python` to major tag (#1646 — thanks @backryun).

### 📝 Documentation

- **docs(env):** Add `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` to `.env.example` with documentation for LM Studio and other local provider use cases (#1623).

---

## [3.7.0] — 2026-04-26

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).
- **feat(providers):** Add CrofAI as a built-in API-key provider with quota/usage monitoring wired into the dashboard Limits page (#1604, #1606).
- **feat(skills):** Add workspace-scoped built-in skills (`file_read`, `file_write`, `http_request`, `eval_code`, `execute_command`) with real sandbox execution via Docker, replacing stub responses. Browser skills now fail explicitly when runtime is not configured.

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(provider):** add ChatGPT Web (Plus/Pro) session provider (#1593)
- **feat(provider):** add Baidu Qianfan chat provider (#1582)
- **feat(codex):** support GPT-5.5 responses websocket (#1573)
- **feat(sse):** Codex CLI image_generation + DALL-E-style image route (#1544)
- **feat(dashboard):** Complete the reconciled v3.7.0 dashboard task set: MCP cache tools and count, video endpoint visibility, provider taxonomy, upstream proxy visibility, provider count badges, costs overview, eval suite management, Custom CLI builder, ACP-focused Agents copy, Translator stream transformer, logs convergence, learned rate-limit health cards, docs expansion, and active request payload inspection.
- **feat(mcp):** Register `omniroute_cache_stats` and `omniroute_cache_flush` across MCP schemas, server registration, handlers, docs, and tests.
- **feat(providers):** Complete the v3.7.0 provider onboarding wave with self-hosted/local providers (`lm-studio`, `vllm`, `lemonade`, `llamafile`, `triton`, `docker-model-runner`, `xinference`, `oobabooga`), OpenAI-compatible gateways (`glhf`, `cablyai`, `thebai`, `fenayai`, `empower`, `poe`), enterprise providers (`datarobot`, `azure-openai`, `azure-ai`, `bedrock`, `watsonx`, `oci`, `sap`), specialty providers (`clarifai`, `modal`, `reka`, `nous-research`, `nlpcloud`, `petals`, `vertex-partner`), `amazon-q`, GitLab/GitLab Duo, and Chutes.ai.
- **feat(providers):** Add Cloudflare Workers AI integration and UI support for robust backend execution.
- **feat(telemetry):** Implement proactive public IP capture from client headers (`x-forwarded-for`, `x-real-ip`, etc.) within `safeLogEvents` for accurate database observability.
- **feat(audio):** Add AWS Polly as an audio speech provider with SigV4 request signing, static engine catalog, provider validation, managed-provider UI coverage, and sanitization for AWS secret/session fields.
- **feat(search):** Add You.com search provider support with dashboard discovery, validation, livecrawl option handling, and search handler normalization.
- **feat(video):** Add RunwayML task-based video generation support, task polling, provider catalog metadata, validation, and dashboard/model-list coverage.
- **feat(providers):** Add search functionality to the providers dashboard with i18n support. (#1511 — thanks @th-ch)
- **feat(providers):** Register 6 new models in the opencode-go provider catalog. (#1510 — thanks @kang-heewon)
- **feat(providers):** Add ModelScope provider (Chinese AI marketplace) with Kimi K2.5, GLM-5, and Step-3.5-Flash integration. (#1430 — thanks @clousky2020)
- **feat(providers):** Add LM Studio as an OpenAI-compatible local provider for self-hosted model inference.
- **feat(providers):** Add Grok 4.3 thinking model support for xAI web executor requests.
- **feat(core):** Implement provider-level Circuit Breaker to prevent cascading failures across connections, enforcing a 10-minute cooldown after 5 consecutive transient failures. (#1430)
- **feat(core):** Add daily quota exhaustion lock to detect "quota exceeded" signals and lock the specific model until midnight. (#1430)
- **feat(core):** Auto-inject `stream_options.include_usage = true` for OpenAI format streams to guarantee token usage is reported correctly during streaming. (#1423)
- **feat(core):** Add OpenAI Batch Processing API support — submit, monitor, and manage batch jobs through the proxy with full lifecycle tracking.
- **feat(vision-bridge):** Add automatic image description fallback for non-vision models via `VisionBridgeGuardrail` (priority 5). Intercepts image-bearing requests to non-vision models, extracts descriptions via a configurable vision model (default: gpt-4o-mini), and replaces images with text before forwarding. Fails open on any error. (#1476)
- **feat(dashboard):** Introduce real-time model status badges with countdown timers in the provider detail and combo panel interfaces. (#1430)
- **feat(dashboard):** Add Batch/File management data grid with full i18n translations for batch processing workflows. (#1479)
- **feat(usage):** MiniMax + MiniMax-CN quota tracking in provider limits dashboard. (#1516)
- **feat(providers):** Fix OpenRouter remote discovery and unify managed model sync. (#1521)
- **feat(providers):** Implement provider and account-level concurrency cap enforcement (`maxConcurrent`) using robust semaphore mechanisms. (#1524)
- **feat(core):** Implement Hermes CLI config generation and message content stripping. (#1475)
- **feat(combos):** Add expert combo configuration mode for advanced routing controls. (#1547)
- **feat(providers):** Register Codex auto review and expand icon coverage.
- **feat(tunnels):** Add Tailscale tunnel management routes and runtime helpers for install, login, daemon start, enable/disable, and health checks.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(chatgpt-web):** Fix empty-file race in `tlsFetchStreaming` where `waitForFile` accepted zero-byte files, silently degrading streaming requests to buffered mode. Replaced with `waitForContent` requiring `file.size > 0` with early exit on request settlement. (#1597 — thanks @trader-payne)
- **fix(chatgpt-web):** Fix stale NextAuth session-token cookies surviving rotation shape changes (unchunked↔chunked). `mergeRefreshedCookie` now drops all session-token family members via `SESSION_TOKEN_FAMILY_RE` before appending the refreshed set, preventing auth failures from dual cookie submission. (#1597 — thanks @trader-payne)
- **fix(codex):** WebSocket memory retention and weekly limit handling (#1581)
- **fix(providers):** Default models list logic (#1577)
- **fix(ui):** Dashboard endpoint URL hydration respects `NEXT_PUBLIC_BASE_URL` when behind a reverse proxy (#1579)
- **fix(providers):** Restore strict PascalCase header masquerading for Claude Code to resolve HTTP 429 upstream errors (#1556)
- **fix(sse):** make Responses passthrough robust for size-sensitive clients (#1580)
- **fix(codex):** update client version for gpt-5.5 (#1578)
- **fix(vision-bridge):** force GPT-family image fallback (#1571)
- **fix(claude):** skip adaptive thinking defaults for unsupported models (#1563)
- **fix(claude):** preserve tool_result adjacency in native and CC-compatible paths (#1555)
- **fix(reasoning):** Preserve OpenAI Chat Completions `reasoning_effort` through assistant-prefill requests and label OpenAI request protocols explicitly as `OpenAI-Chat` or `OpenAI-Responses`. (#1550)
- **fix(codex):** Fix Codex auto-review model routing so review traffic resolves to the intended configured model. (#1551)
- **fix(resilience):** Route HTTP 429 cooldowns through runtime settings so cooldown behavior follows the configured resilience profile. (#1548)
- **fix(providers):** Normalize Anthropic header keys to lowercase in the provider registry to avoid duplicate or case-variant upstream headers. (#1527)
- **fix(providers):** Preserve audio, embedding, rerank, image, video, and OpenAI-compatible alias metadata when `/v1/models` merges static and discovered catalogs.
- **fix(providers):** Discover Azure OpenAI deployments from resource endpoints using `api-key` auth and configurable API versions.
- **fix(providers):** Keep local OpenAI-style providers authless when no API key is configured, including the Lemonade Server default endpoint.
- **fix(translator):** Preserve Antigravity default system instructions and caller-provided system prompts as separate Gemini `systemInstruction` parts instead of concatenating them.
- **fix(security):** Sanitize provider-specific AWS secrets and session tokens from provider management API responses.
- **fix(release):** Resolve combo prefixing, Electron packaging, CLI auth, and release-branch integration regressions. (#1471, #1492, #1496, #1497, #1486)
- **fix(providers):** Resolve 400 errors for GLM and Antigravity Claude adapter during request translation by scoping prompt caching to compatible Anthropic endpoints and flattening system instructions. (#1514, #1520, #1522)
- **fix(core):** Strip `reasoning_content` from OpenAI format messages for non-reasoning models to prevent upstream HTTP 400 validation errors. (#1505)
- **fix(sse):** Map Claude `output_config/thinking` to OpenAI `reasoning_effort` for proper Antigravity tool translation. (#1528)
- **fix(combo):** Fallback to next model on all-accounts-rate-limited (HTTP 503/429) to maintain high availability. (#1523)
- **fix(api):** Harden batch and file endpoints for auth and recovery to prevent schema state collisions.
- **fix(ui):** Add missing UI wiring for "Add Memory" and "Import" buttons on the `/dashboard/memory` page. (#1506)
- **fix(ui):** Prevent Dark Mode FOUC (Flash of Unstyled Content) by injecting a synchronous theme initialization script into the root `layout.tsx`.
- **fix(ui):** Fix mobile layout text overflow in provider and combo cards, and enable touch-friendly reordering arrows across all combo strategies.
- **fix(core):** Add periodic runtime log rotation checks to prevent disk exhaustion in long-running instances. (#1504 — thanks @ether-btc)
- **fix(build):** Resolve missing `process` module in webpack client build for pino-abstract-transport. (#1509 — thanks @hartmark)
- **fix(ui):** Add dark mode support for native dropdown `<option>` elements on Linux/Windows, resolving invisible text in settings and combo builders (#1488)
- **fix(batch):** Add batch item dispatching to specific handlers based on URL to support embeddings and other modalities (#1495 — thanks @hartmark)
- **fix(dashboard):** Correct TOML round-trip corruption in Codex config serializer by dequoting keys and preserving array/boolean structures properly. (#1438 — thanks @benzntech)
- **fix(security):** Resolve CodeQL alert 164 (ReDoS in extraction) and 163 (incomplete URL sanitization). (#163, #164)
- **fix(providers):** Add optional chaining to connection object before accessing `providerSpecificData`, preventing runtime errors when the connection is null/undefined.
- **fix(codex):** Preserve namespace MCP tools forwarded to Codex Responses API, preventing tool name stripping during translation. (#1483)
- **fix(codex):** Deduplicate case-variant `anthropic-version` header in Claude Code patch to prevent duplicate header injection. (#1481)
- **fix(fallback):** Use shared `CircuitBreaker` instead of undefined constants, fixing runtime errors in provider failure handling. (#1485)
- **fix(fallback):** Merge new provider failure threshold fields (`providerFailureThreshold`, `providerFailureWindowMs`, `providerCooldownMs`) into resilience profiles.
- **fix(fallback):** Remove 429 from `PROVIDER_FAILURE_ERROR_CODES` — rate limits are already handled by model-level and account-level locks; including them in the provider-wide circuit breaker caused premature cooldown.
- **fix(sse):** Enable tool calling for GPT OSS and DeepSeek Reasoner models. (#1455)
- **fix(encryption):** Return null on decryption failure to prevent sending encrypted tokens to providers. (#1462)
- **fix(combo):** Resolve cross-provider thinking 400 errors and HTTP clipboard issues during combo routing. (#1444)
- **fix(core):** Resolve skills, memory, and encryption system issues affecting startup and runtime stability. (#1456)
- **fix(core):** Fix model ID parsing for providers with slashes in model names — use `indexOf`/`substring` instead of `split` to handle models like `modelscope/moonshotai/Kimi-K2.5`.
- **fix(core):** Fix reference counting in `ModelStatusContext` — changed `registeredModels` from `Set` to `Map<string, number>` to prevent polling stop when one component unmounts while others still track the same model.
- **fix(security):** Prompt injection guard failures now return an explicit 500 response instead of silently passing through (fail-closed policy).
- **fix(security):** Encryption now derives new keys from a secret-based salt while falling back to the legacy static-salt key during decryption, preserving existing stored credentials.
- **fix(combo):** Resolve context truncation bug in combo routing to prevent incomplete execution states. (#1517)
- **fix(compression):** Implement bidirectional tool_pair cleaning for anthropic inputs (fixes #1592).
- **fix:** Resolve v3.7.0 stabilization issues including dashboard navigation routing, ProxyRegistryManager component layout, and models API response merging (#1566, #1560, #1559).
- **fix(cli):** Preserve TOML integer/boolean types in Codex config round-trip to prevent `tui.model_availability_nux` validation errors.
- **fix(tailscale):** Support sudo auth prompts and live daemon socket detection for non-root tunnel management.
- **fix(dashboard):** Stabilize usage tab loading and refresh behavior to prevent empty state flashes.
- **fix(i18n):** Translate 519 untranslated pt-BR keys and add missing Windsurf/Cline/Kimi docs keys.
- **fix(i18n):** Add missing dashboard message keys across all 30 locales.
- **fix(cli):** Align OpenCode config preview and add multi-model selection (#1602).
- **fix(security):** Harden management API auth and OpenAPI try-proxy endpoint.
- **fix(security):** Resolve vulnerability scan findings for auth-guarded routes.

### ♻️ Refactoring

- **refactor(fallback):** Make provider failure thresholds configurable via `PROVIDER_PROFILES` instead of hardcoded constants, supporting different failure tolerance per provider type. (#1449)
- **refactor(resilience):** Unify resilience controls across the codebase for consistent circuit breaker and fallback behavior. (#1449)
- **refactor(core):** Implement shared path utilities, add custom date formatting, improve type safety, and unify database imports across modules.
- **refactor(security):** Harden backup archive creation by switching to `execFileSync`, validate ACP agent IDs, expand shared CORS handling.
- **refactor(release):** Remove obsolete agent workflow playbooks and the stale compiled `src/lib/dataPaths.js` artifact. (#1541)

### 🧪 Tests

- **test(providers):** Add targeted coverage for AWS Polly SigV4 speech/validation, Azure OpenAI deployment discovery, Lemonade local discovery, provider dashboard taxonomy, managed provider catalog behavior, and merged `/v1/models` alias metadata.
- **test(catalog):** Add v3.7.0 catalog coverage for Pollinations text models, Perplexity Sonar via Puter, and NVIDIA free-model alias resolution.
- **test(vision-bridge):** Add 51 unit tests covering all VisionBridge spec scenarios (VB-S01 through VB-S10), including helper functions for `callVisionModel`, `extractImageParts`, `replaceImageParts`, and `resolveImageAsDataUri`.
- **test(batch-api):** Isolate batch API unit tests with temp `DATA_DIR` to prevent schema state collisions.
- **test(settings-api):** Add test harness with `createSettingsApiHarness` function for proper temp directory setup and storage reset between tests.
- **test(security):** Update prompt injection test for fail-closed policy alignment.
- **test(core):** Restore local test fixes for encryption and resilience modules.
- **test(next):** Align transpile package expectations for the Next.js standalone build.
- **test(ci):** Fix CI-only test failures from environment differences — clear `INITIAL_PASSWORD` and `JWT_SECRET` in integration tests, handle `XDG_CONFIG_HOME` for guide-settings tests.

### 📚 Documentation

- **docs:** Update the root changelog with all release-branch changes through 2026-04-24, including PRs #1544, #1555, #1551, #1550, #1548, #1547, #1541, #1538, #1536, and #1527.
- **docs:** Fix broken README and localized documentation links. (#1536)
- **docs:** Add dashboard docs coverage for current API endpoints, management APIs, ACP, MCP tools, provider onboarding, and v3.7.0 task reconciliation.
- **docs:** Add Arch Linux AUR install notes for community package support. (#1478)
- **docs(i18n):** Improve Ukrainian (uk-UA) translation quality — full Ukrainian translation for README, SECURITY, A2A-SERVER, API_REFERENCE, AUTO-COMBO, and USER_GUIDE documents. Fix mixed Latin/Cyrillic typos, translate model table entries, and standardize section headers.

### 🛠️ Maintenance

- **chore:** Add `.tmp/` to `.gitignore` to keep local build/test artifacts out of release diffs. (#1538)
- **chore(release):** Clarify release version parity and changelog segregation rules for generated release workflows.

### 📦 Dependencies

- **deps:** Bump the development group with 4 updates. (#1464)
- **deps:** Bump the production group with 4 updates. (#1463)
- **deps:** Update `@lobehub/icons` to `5.5.4`, add explicit `react-is@19.2.5` for Recharts, pin npm installs to skip unused peer auto-installs, and override Electron's transitive `@xmldom/xmldom` to `0.9.10` so audit findings stay closed.

---

## [3.6.9] — 2026-04-19

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Mark Qwen OAuth provider as deprecated following the upstream free tier shutdown on 2026-04-15. Adds deprecation warning to CLI tool UI and rewrites `saveQwenConfig` to inject OmniRoute as a multi-provider (openai, anthropic, gemini) via `.qwen/settings.json` and `.qwen/.env` (#1437)
- **feat(cc-compatible):** Align Claude Code-compatible request shape with the official Claude CLI protocol, including proper system skeleton and request normalization (#1411)
- **feat(skills):** Provider-aware marketplace UX with scored AUTO injection and memory pipeline hardening. Skills now show relevance scores and can automatically inject context into requests (#1411)
- **feat(claude-code):** Update Claude Code obfuscation to version 2.1.114, centralize hardcoded version strings, and use standard logger (#1403)
- **feat(cli-tools):** Add direct configuration file generation and override support for Qwen Code local settings (#1394)
- **feat(providers):** Derive Claude CLI model defaults dynamically from provider registry to stay current with upstream API changes (#1393)
- **feat(core):** Implement persistent API key, backup pruning, and GPU optimization (#1350, #1367, #1369)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(cli-tools):** Prevent masked API keys (`sk-31c4****8600`) from being written to CLI tool config files. The dashboard UI now passes `key.id` to the backend, which resolves the unmasked key from the database via a new `resolveApiKey()` helper. Fixes auth failures across all CLI tools (Claude, Codex, Cline, Kilo, Droid, OpenClaw, Antigravity) (#1435)
- **fix(cc-compatible):** Trim the default Claude Code-compatible system prompt skeleton from a multi-paragraph instruction set down to a single identifier line, reducing redundant token usage since Claude Code already injects its own extensive system context (#1433)
- **fix(security):** Resolve SSRF environment static evaluation bug where the outbound URL guard could be bypassed via computed expressions (#1427)
- **fix(auth):** Reload fresh token state and unify expiry persistence to prevent stale credentials from causing cascading auth failures
- **fix(core):** Stabilization fixes for token refresh, usage translation, and testing infrastructure
- **fix(api):** Stop sending unsupported parameters to Gemini and Codex upstream APIs, preventing 400 Bad Request errors
- **fix(skills):** Optimize AUTO scoring algorithm and include Responses API input context for more accurate skill relevance matching (#1418)
- **fix(responses):** Preserve reasoning content when translating Chat Completions format to Responses API format, preventing loss of chain-of-thought data (#1414)
- **fix(cc-compatible):** Add Claude CLI system skeleton for OpenAI-format inputs to ensure consistent behavior when CC-compatible providers receive OpenAI-style payloads
- **fix(providers):** Add `ref` to `GEMINI_UNSUPPORTED_SCHEMA_KEYS` to fix 400 errors from Gemini CLI when tool schemas contain JSON Schema `$ref` fields
- **fix(codex):** Prevent proactive token refresh from consuming valid tokens and strip the unsupported `background` parameter from upstream requests
- **fix(providers):** Fix `usage.prompt_tokens` under-reporting when translating Claude caching responses to OpenAI format (#1426)
- **fix(core):** Fix token refresh resilience for Codex providers. Unrecoverable OAuth refresh errors (`token_expired` and `invalid_token`) now correctly mark the connection as invalid to prompt user re-authentication, rather than silently failing (#1415)
- **fix(providers):** Fix Gemini tool calling by removing the unsupported `additionalProperties` schema field, resolving 400 errors during complex tool invocations (#1421)
- **fix(providers):** Remove arbitrary user thought signature injection in Gemini responses to comply with updated API constraints (#1410)
- **fix(providers):** Fix Gemini API part count mismatch for streaming responses (#1412)
- **fix(codex):** Respect `openaiStoreEnabled` setting during native passthrough for Responses API to prevent unsupported upstream arguments (#1432)
- **fix(ui):** Makes dropdown text visible in dark mode within the Combo Builder modal (#1409)
- **fix(chatcore):** Apply proactive compression before provider translation to prevent token limit errors in combo routes (#1406)
- **fix(claude-code):** Scope thinking stripping to executor boundaries to prevent issues with normal API requests (#1401)
- **fix(claude-code):** Scope obfuscation logic to CLI clients only and fix associated test assertions
- **fix(mitm):** Resolve MITM not working when connecting Antigravity (#1399)
- **fix(security):** Resolve CodeQL password hash alert and fix TruffleHog CI failure (#161)
- **fix(combo):** Fallback to the next model when all provider accounts return a 503 rate-limited signal instead of aborting the routing sequence (#1398)
- **fix(codex):** Strip server-generated IDs from response items in input to prevent 404 lookup errors in multi-turn Codex Conversations (#1397)
- **fix(codex):** Optimize Chat Completions paths by converting `system` to `developer` roles instead of hoisting them into instructions, enabling prompt caching for system messages on GPT-5 models (#1400)
- **fix(providers):** Resolve Claude passthrough corruption (#1359), Kimi-k2 reasoning header rejections (#1360), thinking parameter leaks (#1361), and Ollama proxy redirect drops (#1381)
- **fix(core):** Proxy lookup in key validation respects the new ProxyRegistry environments, and proxy contexts correctly inherit downwards during token refresh preventing expiration loops (#1384, #1390)
- **fix(providers):** Treat upstream legacy validation HTTP 5xx responses as a valid bypass for Qoder PAT tokens to prevent false negative invalidation (#1391)
- **fix(electron):** Resolve type error in Header electronAPI properties
- **fix(security):** Resolve CodeQL security alerts including safe prototype bindings (#151, #152, #154, #155-159)
- **fix(tsc):** Silence `baseUrl` deprecation warnings for TypeScript 5.5+ configurations

### 🧪 Tests

- **test(core):** Resolve typescript strictness complaints and fix combo-routing-engine test regression
- **test(core):** Resolve remaining strict type errors across all unit test files
- **test(providers):** Fix provider service assertion for anthropic-compatible header format
- **test(codex):** Align codex passthrough assertions with explicit store retention policy
- **test(codex):** Fix store assertion for codex responses
- **test(cli):** Resolve strict null checks in Qoder unit tests

### 🛠️ Maintenance

- **chore:** Sync infrastructure with docker postinstall components and secondary CodeQL analysis rules
- **chore:** Enforce contributor credit rule in review-prs workflow
- **chore:** Fix TS errors and update review-prs workflow for improved automation
- **ci:** Allow manual CI dispatch for release branches
- **ci:** Shard long-running test suites and relax timeouts for stability
- **ci:** Restore release v3.6.9 build pipeline and fix flaky tests
- **docs:** Update generate-release workflow to use full changelog for PR body
- **docs:** Enforce PR merge instead of manual close in workflows

---

## [3.6.8] — 2026-04-17

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(providers):** Support `xhigh` reasoning tier exclusively on Claude models that expose it (#1356)
- **feat(providers):** Add CC Compatible connection-level 1M context toggle (#1357)
- **feat(core):** Add full support for Node.js 24 LTS (Krypton) environments with continuous integration coverage (#1340)
- **feat(dashboard):** Display Antigravity credit balance in dashboard Limits & Quotas (#1338)
- **feat(i18n):** Add internationalization support for combo features and dashboard components; sync translations across 31 keys (#1318)
- **feat(providers):** Add Claude Opus 4.7 to Claude Code OAuth models natively with extended context and caching (#1347)
- **feat(core):** Add stopSequences support and expand tool definitions to include Google Search capabilities
- **feat(auth):** Enforce dashboard session authentication on all management API routes, preventing unauthenticated access to configuration endpoints
- **feat(runtime):** Add hot-reloadable guardrails and model diagnostics for real-time rule evaluation without restarts
- **feat(core):** Add payload rules, tag-based routing, and scheduled budget systems for fine-grained request governance
- **feat(providers):** Expose Antigravity preview model aliases and Gemini CLI onboarding flow for first-time setup
- **feat(antigravity):** Add client model aliases and thoughtSignature bypass modes for Antigravity OAuth connections
- **feat(providers):** Expand image provider registry with extended model support including SD3.5, FLUX, and DALL-E 3 HD configurations
- **feat(combos):** Add new routing strategies and full i18n support for agent features section across 31 languages

### 🔒 Security

- **security:** Resolve 18 GitHub CodeQL scan alerts including ReDoS, incomplete sanitization, and bad HTML filtering regexp patterns
- **fix(auth):** Seal privilege escalation vector by enforcing JWT session checking exclusively on `/api/keys` management endpoints (#1353)
- **fix(providers):** Resolve Codex token refresh race condition via mutex `getAccessToken` preventing `refresh_token_reused` Auth0 revocations

### 🔧 Maintenance & Architecture

- **refactor(core):** Split CLI runner and decouple migration engine for extensibility (#1358)
- **refactor(audit):** Rewire audit dashboard from dead in-memory `configAudit` store to live SQLite `audit_log` table — 331+ hidden compliance entries now visible in `/dashboard/audit`
- **build(deps):** Bump `softprops/action-gh-release` from v2 to v3
- **ci:** Bump GitHub Actions CI node-version to Node.js 24 natively
- **fix(types):** Resolve TypeScript compilation errors in `claudeCodeCompatible.ts` (type predicates, `cache_control` index access) and `proxyFetch.ts` (`signal` nullability)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(context):** Scale reserved context tokens dynamically using a 15% sliding window for smaller models
- **test(core):** Replace unit test with integration test for proactive context compression to align with isolated runner rules (#1378)
- **fix(services):** Pass origin provider to refreshWithRetry to avoid tripping the generic "unknown" circuit breaker (fixes Codex accounts erroneously disabling)
- **fix(db):** Prevent native module ABI load crashes from assuming database corruption and skipping databases
- **fix(db):** Increase mass-migration threshold from 5 to 50 pending migrations to protect legacy users upgrading node
- **fix(db):** Prevent migration runner safety aborts from triggering on fresh `DATA_DIR` installations by detecting new databases (#1328)
- **fix(mcp):** Checkpoint and close MCP audit SQLite database safely on process signals and shutdown (#1348)
- **fix(mcp):** Fully decouple MCP audit SQLite connection caching via globalThis to fix unhandled teardown in standalone Next.js chunks (#1349)
- **fix(cli):** Avoid creating app router directory during postinstall initialization on non-built source trees (#1351)
- **fix(codex):** Correctly translate `system` role to `developer` in input array to unlock GPT-5 automatic prompt caching (#1346)
- **fix(core):** Pass client headers to executor in chatCore (#1335)
- **fix(providers):** Separate test batch calls and ignore unknown connections
- **fix(providers):** Add grok-web SSO cookie validation handler (#1334)
- **fix(db):** Preserve key_value settings (dashboard passwords, saved aliases) across DB heuristic recreation cycles (#1333)
- **fix(routing):** Allow combo fallback to cascade context overflow 400 errors instead of immediate aborts (#1331)
- **fix(core):** Resolve thinking leaks, consecutive roles, and missing thoughtSignatures for Antigravity translator (#1316)
- **fix(translator):** Only apply thoughtSignature to the first `functionCall` part in Gemini parallel tool calls, preventing duplicate signatures
- **fix(providers):** Default to batch testing execution blocks for web, search, and audio modalities to prevent connection timeouts
- **fix(cli):** Resolve Node 22 TS entrypoint incompatibility by using esbuild compilation (#1315)
- **fix(chat):** Preserve max_output_tokens for Responses API targets in chatCore sanitization (#1313)
- **fix(api):** API Manager usage stats showing 0 for all registered keys (#1310)
- **fix(api):** Support image-only models in catalog and allow authless search providers to bypass validation requirements
- **fix(routes):** Require prompts for media generation requests (`/images`, `/videos`, `/music`), returning 400 on missing payloads
- **fix(dashboard):** Auto-scroll ActivityHeatmap to show current date (#1309)
- **fix(dashboard):** Restore horizontal layout with `w-max` wrapper in heatmap components
- **fix(i18n):** Update `nodeIncompatibleHint` to recommend Node 24 LTS across all 31 languages
- **fix(i18n):** Add Chinese i18n support to remaining dashboard components (`Loading.tsx`, `DataTable`, etc.)
- **fix(requestLogger):** Add missing `cacheSource` and `tps` columns to i18n log detail views

## [3.6.6] — 2026-04-15

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(storage):** Add database backup cleanup controls, UI management, and customizable retention period env vars (#1304)
- **feat(providers):** Add Freepik Pikaso image generation provider with support for cookie/subscription-based auth modes (#1277)
- **feat(providers): Add Perplexity Web (Session) Provider** — Routes through Perplexity's internal SSE API using a session cookie, giving native proxy access without separate API costs to GPT-5.4, Claude Opus, Gemini 3.1 Pro, and Nemotron via preferences mapping (#1289)
- **feat(api): Sync Tokens & V1 WebSocket Bridge** — Dedicated sync token storage, issuance, revocation, and bundle download routes backed by stable config bundle versioning with ETag support. Exposes `/v1/ws` WebSocket upgrade route and a custom Next.js server bridge (`scripts/v1-ws-bridge.mjs`) so OpenAI-compatible WebSocket traffic can be proxied through the gateway. Compliance auditing expanded with structured metadata, pagination, request context, auth/provider credential events, and SSRF-blocked validation logging. New migrations: `024_create_sync_tokens.sql`. New modules: `syncTokens.ts`, `src/lib/sync/bundle.ts`, `src/lib/sync/tokens.ts`, `src/lib/ws/handshake.ts`, `src/lib/apiBridgeServer.ts`, `src/lib/compliance/providerAudit.ts`.
- **feat(models): GLM Thinking Preset & Hybrid Token Counting** — GLM Thinking (`glmt`) registered as a first-class provider preset with shared GLM model metadata, pricing, per-connection usage sync, dashboard support, and `maxTokens: 65536 / thinkingBudgetTokens: 24576` request defaults with 900s extended timeout. Provider-side `/messages/count_tokens` endpoint used when a Claude-compatible upstream supports it; gracefully falls back to estimation on missing models, missing credentials, or upstream failures. Startup seeding of default model aliases (`src/lib/modelAliasSeed.ts`) normalizes common cross-proxy model dialects so canonical slash-based model IDs are not misrouted. New file `open-sse/config/glmProvider.ts`.
- **feat(core): Hardened Outbound Provider Calls & Cooldown Retries** — Guarded outbound fetch helpers (`src/shared/network/safeOutboundFetch.ts`, `src/shared/network/outboundUrlGuard.ts`) blocking private/local URLs with configurable retry, timeout normalisation, and route-level status propagation for provider validation and model discovery. Cooldown-aware chat retries (`src/sse/services/cooldownAwareRetry.ts`) with configurable `requestRetry` and `maxRetryIntervalSec` settings and model-scoped cooldown responses. Improved rate-limit learning from headers and error bodies so short upstream lockouts can recover automatically. Runtime environment validation (`src/lib/env/runtimeEnv.ts`) checks env at startup. Pollinations now requires an API key. Antigravity and Codex header handling aligned via `open-sse/config/antigravityUpstream.ts` and `open-sse/config/codexClient.ts`. Gemini tool names restored in translated responses; synthetic Claude text block injected when upstream SSE completes empty.
- **feat(logs):** Add TPS (Tokens Per Second) metric to log details modal metadata grid (#1182)
- **feat(memory+skills):** Full-featured Memory & Skills systems with FTS5 SQLite search, dynamic UI pagination, backend observability, and extensive test coverage (#1228)
- **feat(bailian-quota):** Add Alibaba Coding Plan quota monitoring, multi-window quota extraction, and UI credential validation (#1235)
- **feat(storage): Call Log Storage Refactor** — Extracted heavy request/response JSON payloads from the core SQLite database (`storage.sqlite`) into filesystem artifacts stored within `DATA_DIR/call_logs`. This massively reduces WAL bloat and eliminates `SQLITE_FULL` crashes on high-traffic nodes (#1307).
- **feat(providers): Add Grok Web (Subscription) Provider** — Routes through the xAI web interface for subscription users via cookie session mapping (#1295).
- **feat(api): Advanced Media Support** — Extends OpenAI generic proxy layer to natively support `image`, `embeddings`, `audio-transcriptions`, and `audio-speech` workflows (#1297).
- **feat(cli-tools): Qwen Code CLI Integration** — Full integration for Qwen Code local execution mapping, model resolution, and dynamic API key fetching (#1266, #1263).
- **feat(oauth):** Supports `cursor-agent` CLI as a native Cursor credential source alongside the standard configuration (#1258).
- **feat(models):** Custom and imported models now merge correctly into filter lists for all available global providers (#1191).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(providers):** match correct endpoint api.xiaomimimo.com for Xiaomi MiMo (#1303)
- **fix(core):** strip provider alias routing prefix from payload for custom endpoints to fix Azure OpenAI 400 errors (#1261)
- **fix(core):** ProxyFetch Undici dispatcher automatically bypasses LAN/local addresses, preventing fetch failures on internal OpenRouter requests (#1254)
- **fix(core):** Gemini thought stream signature detection upgraded to use native part.thought boolean, preventing reasoning text leaks (#1298)
- **deps:** bump hono from 4.12.12 to 4.12.14 to resolve CVE SSR HTML injection vulnerability (#1306, #59)
- **deps:** update dompurify to 3.4.0 in frontend overrides mitigating XSS HTML Injection (CVE-XYZ / Dependabot #60)
- **test:** Disable SQLite automatic backups during continuous integration (CI) tests to resolve E2E timeout issues limiting runner scaling (#24481475058)
- **feat(core): Proactive Context Compression** — `chatCore` now proactively compresses oversized message contexts before hitting upstream providers to dramatically reduce `context_length_exceeded` errors. Employs binary-search message pruning with structural integrity guarantees tracking explicit `tool_use` boundaries ensuring truncated tool inputs drop paired outputs appropriately (#1292, #1293)

- **fix(cli):** Resolve codex routing config parsing by strictly quoting section keys array, enforcing responses wire_api with fallback, and standardizing select-model button positioning mirroring Claude UI
- **fix(providers):** Correct Lobehub provider icons rendering by removing unsupported local references ensuring local SVG/PNG fallback mechanism invokes natively
- **fix(db):** Implement Database migration tracking safety abort safeguards (pre-migration backups via `VACUUM INTO` and mass renumbering warnings) to protect existing database structures on startup upgrades (#1281)
- **fix(dashboard):** Cleaned up target codex `config.toml` structure preventing recursive section rendering by enforcing quotes on section dot paths and mapping correct UI `OMNIROUTE_API_KEY` names.
- **fix(mcp):** Add dedicated explicit timeout constraint overrides for search handlers (#1280)
- **fix(crypto):** Add validation guard to encryption layer to surface clear UI errors when cryptographic environment variables are missing, replacing raw Node.js TypeErrors. Legacy env vars `OMNIROUTE_CRYPT_KEY` and `OMNIROUTE_API_KEY_BASE64` now also accepted as fallbacks (#1165)
- **fix(providers):** Update Pollinations provider definition to require API keys and specify their new limited pollen/hour free tier (#1177)
- **Streaming `\n\n` Artifact Fix (#1211):** Changed `<omniModel>` tag-stripping regex from `?` to `*` quantifier across `combo.ts`, `comboAgentMiddleware.ts`, and `contextHandoff.ts` to greedily strip all accumulated JSON-escaped newline sequences surrounding the tag. This prevents literal `\n\n` prefix artifacts from appearing in consumer streaming responses
- **E2E Combo Test Locator:** Fixed Playwright strict-mode violation in `combo-unification.spec.ts` by replacing ambiguous `getByRole` locator with a compound filter locator for the "All" strategy tab
- **fix(cc-compatible):** Trim beta flags and preserve cache passthrough for third-party HTTP proxy compatibility (#1230)
- **fix(providers):** Update Xiaomi MiMo endpoints to the live token-plan, migrating away from dead API URLs (#1238)
- **fix:** Forward client `x-initiator` header to GitHub Copilot upstream to accurately distinguish agent vs user turns (#1227)
- **fix:** Resolve backlog bugs including streaming edge cases, unhandled rejections, and quota parse failures (#1206, #1220, #1231, #1175, #1187, #1218, #1202)
- **fix(tests):** Resolve memory migration and skills route pagination bugs arising from PR overlaps
- **fix(i18n):** Add missing Chinese i18n support to dashboard components (`DataTable`, `EmptyState`, etc), update `en.json/zh-CN.json` routing keys, and natively resolve JSX defaults via `next-intl` (#1274)

### 🔧 Internal Improvements

- **Compliance Audit Expansion:** `src/lib/compliance/index.ts` expanded with structured metadata, pagination support, request context enrichment, and new `providerAudit.ts` module logging auth and provider credential events, SSRF-blocked validation attempts, and provider CRUD operations
- **Config Sync Bundle:** `src/lib/sync/bundle.ts` exports `buildConfigBundle()` generating a versioned JSON snapshot of settings, provider connections, nodes, model aliases, combos, and API keys (passwords redacted) with ETag support for bandwidth-efficient polling
- **Codex Client Constants:** Centralized `CODEX_CLIENT_VERSION`, `CODEX_USER_AGENT_PLATFORM`, and pattern-validated env overrides (`CODEX_CLIENT_VERSION`, `CODEX_USER_AGENT`) in `open-sse/config/codexClient.ts`
- **Antigravity Upstream Constants:** `open-sse/config/antigravityUpstream.ts` consolidates all Antigravity base URLs and model/fetchAvailableModels discovery path builders
- **Model Alias Seed:** `src/lib/modelAliasSeed.ts` seeds 30+ cross-proxy model dialect aliases (e.g. `openai/gpt-5` → `gpt-5`, `anthropic/claude-opus-4-6` → `cc/claude-opus-4-6`) at startup via idempotent `upsert`
- **Test Coverage:** 15+ new unit test suites covering sync routes, WebSocket bridge, compliance index, GLM provider config, cooldown-aware retry, safe outbound fetch, stream utilities, Codex executor, provider validation branches, model cross-proxy compatibility, and model alias seeding
- **TypeScript Migration:** Finalized migration of remaining JS tests (`proxy-load` and `testFromFile`) to TypeScript ES modules, ensuring a fully synchronized TS stack.
- **Reliability & Resilience:** Added exponential backoff to `models.dev` auto-sync to combat transient network failures, raised interval floor to 1 hour, and added LKGP debug logging for enhanced observability during routing. (#1286)

---

## [3.6.5] — 2026-04-13

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Antigravity AI Credits Fallback:** Automatically retries with `GOOGLE_ONE_AI` credit injection when free-tier quota is exhausted. Per-account credit balance (5-hour TTL) is cached from SSE `remainingCredits` and exposed as a numeric badge in the Provider Usage dashboard (#1190 — thanks @sFaxsy)
- **Claude Code Native Parity:** Full header/body signing parity with the Claude Code 2.1.87 OAuth client — CCH xxHash64 body signing with singleton WASM initialization promise (fixing race conditions), dynamic per-request fingerprint, bidirectional TitleCase ↔ lowercase tool name remapping (14 tools), API constraint enforcement (`temperature=1` for thinking, max 4 `cache_control` blocks, auto-inject ephemeral on last user message), and optional ZWJ obfuscation. Wired into `BaseExecutor` for automatic CCH signing on all `anthropic-compatible-cc-*` providers and into `chatCore` for synchronous parity pipeline steps (#1188 — thanks @RaviTharuma)
- **Per-Connection Codex Defaults:** Codex Fast Service Tier and Reasoning Effort settings are now per-connection instead of a single global toggle. Existing connections are migrated automatically on startup via an idempotent backfill migration (#1176 — thanks @rdself)
- **Cursor Usage Dashboard:** New `getCursorUsage()` fetches quotas from Cursor's `/api/usage`, `/api/auth/me`, and `/api/subscription` endpoints. Displays standard requests, on-demand usage, and per-plan limits (Free/Pro/Business/Team). Client version bumped to `3.1.0` and `x-cursor-user-agent` header added for parity
- **Database Health Check System:** Automated periodic SQLite integrity monitoring via `runDbHealthCheck()` — detects orphan quota/domain rows, broken combo references, stale snapshots, and invalid JSON state. Runs every 6 hours (configurable via `OMNIROUTE_DB_HEALTHCHECK_INTERVAL_MS`), with auto-repair and pre-repair backup. Exposed as **MCP tool #18** (`omniroute_db_health_check`) with Zod schemas and `autoRepair` option. Dashboard panel in Health page with status card, issue count, repaired count, and one-click repair button
- **OpenAI Responses API Store Opt-In:** Per-connection `openaiStoreEnabled` flag controls whether the `store` field is preserved or forced to `false` on Codex Responses API requests. When enabled, `previous_response_id`, `prompt_cache_key`, `session_id`, and `conversation_id` fields are round-tripped through the Chat Completions → Responses translation, enabling multi-turn context caching on supported providers
- **Email Privacy Toggle (Combos Page):** Global email visibility toggle (`EmailPrivacyToggle`) added to the Combos page header with responsive layout, tooltip guidance, and per-connection label masking via `pickDisplayValue()`. All combo builder options, provider connection lists, and quota screens now respect the global privacy state from `emailPrivacyStore`
- **skills.sh Integration:** Added `skills.sh` as an external skill provider. Users can now search, browse, and install agent skills directly from a new "skills.sh" tab in the Skills dashboard. Includes backend API resolvers, frontend implementation with search/install states, and a dedicated unit test suite (#1223 — thanks @RaviTharuma)
- **Stabilization Settings:** Added persistence support for `lkgpEnabled` and `backgroundDegradation` settings, integrated into `instrumentation-node.ts` for improved lifecycle awareness (#1212)
- **xxhash-wasm dependency:** Added `xxhash-wasm@^1.1.0` for CCH signing (xxHash64 with seed `0x6E52736AC806831E`)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Codex `stream: false` via Combo (ALL_ACCOUNTS_INACTIVE):** Fixed a critical bug where Codex combos returned `ALL_ACCOUNTS_INACTIVE` or empty content when the client sent `stream: false`. Root cause was triple: (1) `CodexExecutor.transformRequest()` mutated `body.stream` in-place to `true`, contaminating the combo's quality check which skipped validation thinking it was streaming; (2) the non-stream SSE parser used the wrong format (Chat Completions instead of Responses API) for Codex SSE output; (3) combo quality validation read the mutated `body.stream` instead of the client's original intent. Fixed by: cloning the body via `structuredClone()` in CodexExecutor, detecting Codex/Responses SSE format in the non-stream fallback path (with auto-translation back to Chat Completions), and capturing `clientRequestedStream` before the combo loop
- **Gemini CLI Tool Schema Rejection:** Fixed 400 Bad Request errors from the Google API by strictly filtering non-standard vendor extensions (starting with `x-`) and `deprecated` fields from tool parameter schemas (#1206)
- **SOCKS5 Proxy Interop (Node.js 22):** Resolved `invalid onRequestStart method` crashes caused by `undici` version mismatches between dispatchers and the built-in fetch. Hardened `proxyFetch.ts` to strictly use the library's fetch implementation for custom dispatchers (#1219)
- **Search Cache Coalescing with TTL=0:** Fixed a bug where providers configured with `cacheTTLMs: 0` (caching explicitly disabled) still had concurrent requests coalesced and returned `{ cached: true }`. Now each call gets its own independent upstream fetch (#1178 — thanks @sjhddh)
- **Antigravity Credit Cache Alignment (PR #1190):** Reconciled `accountId` derivation between `AntigravityExecutor.collectStreamToResponse` and `getAntigravityUsage` to use consistent cache keys (`email || sub || "unknown"`). Previously, SSE-parsed credit balances could be written under a different key than the one read by the usage dashboard, causing stale/missing credit badges
- **Non-streaming reasoning_content Duplication:** Fixed clients rendering duplicated reasoning panels when both `reasoning_content` and visible `content` were present in non-streaming responses. `responseSanitizer` now strips `reasoning_content` from messages that already have visible text content, preserving it only for reasoning-only messages
- **Streaming Regression Fix:** Hardened the `sanitize` TransformStream in the combo engine to strip both literal and JSON-escaped newline sequences, eliminating leading `\n\n` prefixes in assistant responses (#1211)
- **Gemini Empty Choice Fix:** Ensured initial assistant deltas always include an empty `content: ""` string to satisfy strict OpenAI client requirements and prevent empty choice responses in tools (#1209)
- **Gemini Tools Sanitizer Deduplication:** Extracted shared tool conversion logic into `buildGeminiTools()` helper (`geminiToolsSanitizer.ts`), eliminating duplicate implementations between `openai-to-gemini.ts` and `claude-to-gemini.ts`. The new helper correctly handles `web_search` / `web_search_preview` tool types by emitting `googleSearch` tools with priority over function declarations
- **Qwen/Qoder Thinking+Tool_Choice Conflict:** Added `sanitizeQwenThinkingToolChoice()` to both `DefaultExecutor` (for Qwen provider) and `QoderExecutor` to prevent provider-side 400 errors when clients send `tool_choice` alongside thinking/reasoning parameters that are mutually exclusive upstream
- **API Key Deletion Orphan Cleanup:** Deleting an API key now also removes associated `domain_budgets` and `domain_cost_history` rows, preventing orphan data accumulation
- **CC-compatible test assertion:** Fixed pre-existing test that expected no `cache_control` on system blocks — the billing header system block now carries `cache_control: { type: "ephemeral" }` per PR #1188 design
- **Codex Combo Smoke Test False Positives:** Fixed combo tests incorrectly reporting `ERROR` for valid Codex streaming responses when `response.output` is empty but text deltas were emitted. The summary now falls back to accumulated delta text (#1176 — thanks @rdself)
- **Electron Builder Version Mismatch:** Fixed Electron desktop startup failures on Windows packaged builds caused by native modules (`better-sqlite3`) being under `app.asar.unpacked` while helpers were in `app/node_modules`. `resolveServerNodePath()` now merges both locations with deduplication and existence checks (#1172 — thanks @backryun)

### 🔧 Internal Improvements

- **SSE Parser: Responses API Non-Stream Conversion:** Added full `parseSSEToResponsesOutput()` implementation in `sseParser.ts` (255+ lines) — reconstructs complete Responses API objects from SSE event streams, handling `response.output_text.delta/done`, `response.reasoning_summary_text.delta/done`, `response.function_call_arguments.delta/done`, and terminal events. Used by the new chatCore non-stream fallback path for Codex
- **Cursor Executor Version Sync:** Updated Cursor client User-Agent to `3.1.0` and centralized version constants (`CURSOR_CLIENT_VERSION`, `CURSOR_USER_AGENT`) for consistent fingerprinting across executor, usage fetcher, and OAuth flows
- **Responses API Translator Parity:** `convertResponsesApiFormat()` now accepts credentials and passes them through to the translator, enabling store-aware field propagation. Round-trip preservation of `previous_response_id`, `prompt_cache_key`, `session_id`, and `conversation_id` fields
- **Provider Schema Validation:** Added `openaiStoreEnabled` boolean validation to `providerSpecificData` Zod schema
- **Combo Error Response Normalization:** Empty combo targets now return 404 (`comboModelNotFoundResponse`) instead of generic 503, improving client-side error differentiation
- **Dependency Updates:** Bumps `typescript-eslint` to `8.58.2` (dev), `axios` to `1.15.0` (prod), and `next` to `16.2.2` (prod) (#1224, #1225)

### ⚠️ Breaking Changes

- **`DELETE /api/settings/codex-service-tier` removed:** This endpoint no longer exists. Codex Service Tier configuration has moved to per-connection `providerSpecificData.requestDefaults`. Existing connections are migrated automatically on first startup after upgrade. Any external scripts or integrations that call this endpoint should be updated — use `PUT /api/providers/:id` with `providerSpecificData.requestDefaults.serviceTier` instead (#1176).
- **CCH signing on CC-compatible providers:** All requests to `anthropic-compatible-cc-*` providers now include an xxHash64 integrity token (`cch=...`) in the billing header. Providers that do not validate CCH will ignore it (no behavioral change), but any custom middleware inspecting the billing header should expect a 5-character hex token instead of the `00000` placeholder

---

## [3.6.4] — 2026-04-12

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Combo Builder v2 (Wizard UI):** Completely redesigned the combo creation/editing interface as a multi-stage wizard with stages: Basics → Steps → Strategy → Review. The builder fetches provider, model, and connection metadata via a new `GET /api/combos/builder/options` endpoint, enabling precise provider/model/account selection with duplicate detection and automatic next-connection suggestion. Heavy UI components (`ModelSelectModal`, `ProxyConfigModal`, `ModelRoutingSection`) are now lazily loaded via `next/dynamic` for faster initial page render
- **Combo Step Architecture (Schema v2):** Introduced a structured step model (`ComboModelStep`, `ComboRefStep`) replacing the legacy flat string/object combo entries. Steps carry explicit `id`, `kind`, `providerId`, `connectionId`, `weight`, and `label` fields, enabling pinned-account routing, cross-combo references, and per-step metrics. All combo CRUD operations normalize entries through the new `src/lib/combos/steps.ts` module. Zod schemas updated with `comboModelStepInputSchema` and `comboRefStepInputSchema` unions
- **Composite Tiers System:** Added tiered model routing via `config.compositeTiers` — each tier maps a named stage to a specific combo step with optional fallback chains. Includes comprehensive validation (`src/lib/combos/compositeTiers.ts`) ensuring step existence, preventing circular fallback, and validating default tier references. Zod schema enforcement blocks composite tiers on global defaults (concrete combos only)
- **Model Capabilities Registry:** Created `src/lib/modelCapabilities.ts` providing `getResolvedModelCapabilities()` — a unified resolver that merges static specs, provider registry data, and live-synced capabilities into a single `ResolvedModelCapabilities` object covering tool calling, reasoning, vision, context window, thinking budget, modalities, and model lifecycle metadata
- **Observability Module:** Extracted health and telemetry payload construction into `src/lib/monitoring/observability.ts` with `buildHealthPayload()`, `buildTelemetryPayload()`, and `buildSessionsSummary()` builders. The health endpoint now returns session activity, quota monitor status, and per-provider breakdowns alongside existing system metrics
- **Session & Quota Monitor Dashboard:** Added live Session Activity and Quota Monitors panels to the Health dashboard, showing active session counts, sticky-bound sessions, per-API-key breakdowns, and top session details alongside quota monitor alerting/exhausted/error status with per-provider drill-down
- **Combo Health Per-Target Analytics:** The combo-health API now resolves per-target metrics using the new `resolveNestedComboTargets()` function, providing step-level success rates, latency, and historical usage breakdowns per execution key — enabling per-account, per-connection health visibility
- **Auto-Combo → Combos Unification:** Merged the separate `/dashboard/auto-combo` page into the main `/dashboard/combos` page. Auto/LKGP combos are now managed alongside all other combos with a new strategy filter tabs system (All / Intelligent / Deterministic). The old auto-combo route redirects to `/dashboard/combos?filter=intelligent`. Removed the `auto-combo` sidebar entry, consolidating navigation into the single `Combos` item
- **Intelligent Routing Panel (`IntelligentComboPanel`):** New inline panel (371 lines) within the combos page that shows real-time provider scores, 6-factor scoring breakdown (quota, health, cost, latency, task fitness, stability), mode pack selector, incident mode status, and excluded providers for `auto`/`lkgp` combos — replacing the former standalone auto-combo dashboard
- **Builder Intelligent Step (`BuilderIntelligentStep`):** New conditional wizard step (280 lines) that appears in the Builder v2 flow only when `strategy=auto` or `strategy=lkgp` is selected. Exposes candidate pool selection, mode pack presets, router sub-strategy selector, exploration rate slider, budget cap, and collapsible advanced scoring weights configuration
- **Intelligent Routing Module (`intelligentRouting.ts`):** Extracted strategy categorization and filtering logic into a dedicated shared module (210 lines) with `getStrategyCategory()`, `isIntelligentStrategy()`, `filterCombosByStrategyCategory()`, `normalizeIntelligentRoutingFilter()`, and `normalizeIntelligentRoutingConfig()` utility functions
- **LKGP Standalone Strategy:** Implemented `lkgp` (Last Known Good Provider) as a fully functional standalone combo strategy. Previously, `lkgp` as a combo strategy silently fell through to `priority` ordering — the LKGP lookup only ran inside the `auto` engine. Now `strategy: "lkgp"` correctly queries the LKGP state, moves the last successful provider to the top of the target list, and saves the LKGP state after each successful request. Falls back to priority ordering when no LKGP state exists
- **Unified Routing Rules & Model Aliases:** Consolidated the routing rules and model alias management controls into the Settings page, reducing fragmentation across the dashboard

### ⚡ Performance

- **Middleware Lazy Loading:** Refactored `src/proxy.ts` to lazy-import `apiAuth`, `db/settings`, and `modelSyncScheduler` modules, reducing middleware cold-start overhead. Added inline `isPublicApiRoute()` to avoid loading the full auth module for public routes
- **E2E Auth Bypass:** Added `NEXT_PUBLIC_OMNIROUTE_E2E_MODE` environment flag to bypass authentication gates for dashboard and management API routes during Playwright E2E test runs

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **P2C Credential Selection:** Implemented Power-of-Two-Choices (P2C) connection scoring in `src/sse/services/auth.ts` with quota headroom awareness, error/recency penalties, and forced/excluded connection support. The new `getProviderCredentialsWithQuotaPreflight()` function integrates quota preflight checks directly into credential selection, eliminating the separate Codex-only preflight path
- **Fixed-Account Combo Steps:** Combo steps with explicit `connectionId` now correctly bypass provider-level model cooldowns and circuit breakers, preventing a single account failure from blocking pinned-connection routing for the same model
- **Combo Metrics Per-Target Tracking:** Extended `comboMetrics.ts` to track `byTarget` metrics keyed by execution path, recording per-step `provider`, `providerId`, `connectionId`, and `label` alongside existing per-model aggregates
- **Call Logs Schema Expansion:** Added `requested_model`, `request_type`, `tokens_cache_read`, `tokens_cache_creation`, `tokens_reasoning`, `combo_step_id`, and `combo_execution_key` columns to `call_logs` with auto-migration. Added composite index `idx_cl_combo_target` for efficient per-target historical queries
- **Quota Monitor Enrichment:** Expanded `quotaMonitor.ts` with full lifecycle state tracking (`status`, `startedAt`, `lastPolledAt`, `consecutiveFailures`, `totalPolls`, `totalAlerts`), ISO-formatted snapshots via `getQuotaMonitorSnapshots()`, and sorted summary via `getQuotaMonitorSummary()`
- **Codex Quota Fetcher Hardening:** Improved `codexQuotaFetcher.ts` with safer connection registration and quota fetch error handling
- **LKGP Save Refactored to Async/Await:** Replaced fire-and-forget `.then()` chain for LKGP persistence after successful combo routing with proper `async/await` + `try/catch`, preventing unhandled promise rejections and ensuring LKGP state is reliably saved before the response is returned
- **Duplicate `auto` in Combo Strategy Schema:** Removed duplicate `"auto"` entry from `comboStrategySchema` (was listed on both line 104 and 108). Harmless to Zod runtime but cleaned up to avoid confusion. Schema now has exactly 13 unique strategy values
- **Legacy Combo Refs Normalization:** Fixed combo step normalization to preserve legacy string combo references during CRUD operations, preventing data loss when editing combos created before the v2 step architecture

### 🔒 Security

- **Auth Bypass on Backup Routes (Critical):** Added `isAuthenticated` guards to `/api/db-backups/exportAll` (full database export) and `/api/db-backups` (list, create, and restore backups) — both were previously accessible without authentication
- **Auth Guard on Translator Save:** Added `isAuthenticated` guard to `/api/translator/save` for defense-in-depth consistency
- **API Key Secret Hardening:** Removed the hardcoded `"omniroute-default-insecure-api-key-secret"` fallback from `apiKey.ts` — the function now fails fast if `API_KEY_SECRET` is unset, relying on the startup validator to auto-generate it
- **NPM Tarball Leak Fix:** Added `app/.env*` to `.npmignore` to prevent the working `.env` file from being shipped inside the npm tarball distribution
- **Electron Builder CVE Fix:** Bumped `electron-builder` to 26.8.1 to resolve `tar` CVEs in the desktop build pipeline

### 🔧 Maintenance & Infrastructure

- **DB Migration 021:** Added `combo_call_log_targets` migration for `combo_step_id` and `combo_execution_key` columns in call_logs
- **Combo CRUD Normalization:** `db/combos.ts` now normalizes all stored combo entries through the step normalization pipeline on read, ensuring consistent step IDs and kind annotations regardless of when the combo was created
- **Playwright Config:** Updated Playwright configuration and `run-next-playwright.mjs` script for improved E2E test orchestration
- **Build Script:** Updated `build-next-isolated.mjs` with additional reliability improvements
- **Auto-Combo UI Cleanup:** Deleted `AutoComboModal.tsx` (161 lines), replaced `auto-combo/page.tsx` (478→5 lines) with a server-side redirect to `/dashboard/combos?filter=intelligent`
- **Sidebar Consolidation:** Removed `"auto-combo"` from `HIDEABLE_SIDEBAR_ITEM_IDS` and `PRIMARY_SIDEBAR_ITEMS` — `normalizeHiddenSidebarItems()` silently discards any stale `"auto-combo"` entries in user settings
- **Schema Cleanup:** Removed obsolete `createAutoComboSchema` from `schemas.ts`. Exported `comboStrategySchema` for direct use in test and filter modules
- **A2A Agent Card Update:** Renamed skill ID from `auto-combo` to `intelligent-routing` with updated description referencing the unified combos dashboard
- **Builder Draft Refactor:** Extended `builderDraft.ts` with dynamic stage list generation via `getComboBuilderStages()` and `isIntelligentBuilderStrategy()`. Stage navigation (`getNextComboBuilderStage`, `getPreviousComboBuilderStage`, `canAccessComboBuilderStage`) now accepts options to conditionally include/skip the `intelligent` wizard step
- **i18n Consolidation:** Removed the standalone `"autoCombo"` i18n block (22 keys) from all 30 language files. Migrated keys into the `"combos"` block with new additions for filter tabs, intelligent panel, and builder step labels

### 🧪 Tests

- **16 New Test Suites:** Added comprehensive test coverage including:
  - `combo-builder-draft.test.mjs` (186 lines) — Builder draft step construction and validation
  - `combo-builder-options-route.test.mjs` (228 lines) — Builder options API endpoint
  - `combo-health-route.test.mjs` (266 lines) — Combo health analytics with per-target metrics
  - `combo-routes-composite-tiers.test.mjs` (157 lines) — Composite tiers API integration
  - `composite-tiers-validation.test.mjs` (131 lines) — Composite tier validation rules
  - `db-combos-crud.test.mjs` — Combo CRUD with step normalization
  - `db-core-init.test.mjs` (129 lines) — DB initialization and column migrations
  - `model-capabilities-registry.test.mjs` (105 lines) — Model capabilities resolution
  - `observability-payloads.test.mjs` (165 lines) — Health/telemetry payload construction
  - `openapi-spec-route.test.mjs` — OpenAPI spec generation
  - `proxy-e2e-mode.test.mjs` (74 lines) — E2E mode auth bypass
  - `quota-monitor.test.mjs` — Quota monitor lifecycle state
  - `run-next-playwright.test.mjs` (119 lines) — Playwright runner script
  - `sse-auth.test.mjs` (154 lines) — P2C credential selection and quota preflight
  - `telemetry-summary-route.test.mjs` (35 lines) — Telemetry summary endpoint
  - Plus updates to 12 existing test files for compatibility with new step architecture
- **Auto-Combo Unification Tests:**
  - `autocombo-unification.test.mjs` (156 lines) — Strategy categorization, schema deduplication, sidebar cleanup, and routing strategies metadata validation
  - `combo-unification.spec.ts` (189 lines) — Playwright E2E tests for filter tabs, intelligent panel rendering, redirect from old route, sidebar entry removal, and Builder v2 intelligent step flow
  - 3 new LKGP standalone tests in `combo-routing-engine.test.mjs` — Validates LKGP provider prioritization, fallback to priority when no state exists, and LKGP state persistence after successful requests
  - Updated `combo-builder-draft.test.mjs` with intelligent stage navigation tests
  - Updated `sidebar-visibility.test.mjs` to reflect `auto-combo` removal

---

## [3.6.3] — 2026-04-11

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **OpenAI-Compatible Loose Validation:** Empty API keys can now be naturally submitted and saved for any `openai-compatible-*` providers (e.g. Pollinations, localized routes) directly in the UI instead of blocking save actions (#1152)
- **Cloudflare Configuration:** Updated the provider schema and UI integration for Cloudflare AI to officially expose and support the backend `accountId` field securely without overrides (#1150)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Vertex JSON Validation Crash:** Prevented `invalid character in header` crashes inside the `/validate` endpoint by creating a native authentication parser that correctly handles Google Identity Service Account JSON flows prior to pinging endpoints (#1153)
- **Extraneous Payload Rejection:** Globally prevented upstream `400 Bad Request` execution crashes by stripping the non-standard `prompt_cache_retention` attribute forcibly attached by Cursor/Cline IDE engines when targeting strict OpenAI/Anthropic routes (#1154)
- **Reasoning Content Drop:** Prevented pure reasoning packets, common in advanced fallback models like DeepSeek, from being aborted mid-stream by explicitly adjusting the `Empty Content (502)` circuit breakers to acknowledge `reasoning_content` states as valid (#1155)
- **Desktop Windows Build Crash:** Fixed `better_sqlite3.node is not a valid Win32 application` preventing OmniRoute Desktop from launching on Windows by properly removing the ABI-mismatched sqlite cache from Next.js standalone and falling back to the cross-compiled Electron equivalent during packager build steps (#1163)
- **Login Visual Security:** Removed the raw fallback hash dump that artificially rendered underneath the login modal in Docker instances missing `OMNIROUTE_API_KEY_BASE64` flags (#1148)

### 🔧 Maintenance & Dependencies

- **Dependabot Updates:** Safely bumped GitHub Actions `docker/build-push-action` to v7 and `actions/download-artifact` to v8
- **Electron Updates:** Upgraded desktop wrapper core to Electron `41.2.0` and `electron-builder` to `26.8.1`, incorporating essential V8/Chromium security patches
- **NPM Package Groups:** Updated `production` and `development` NPM groups to securely handle minor audit warnings and keep toolchains modern
- **CI/CD Reliability:** Fixed persistent `Snyk` token-absence failures on automated pull requests by appropriately bypassing on dependabot actions

## [3.6.2] — 2026-04-11

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **33 New API Key Providers:** Massive provider expansion adding DeepInfra, Vercel AI Gateway, Lambda AI, SambaNova, nScale, OVHcloud AI, Baseten, PublicAI, Moonshot AI, Meta Llama API, v0 (Vercel), Morph, Featherless AI, FriendliAI, LlamaGate, Galadriel, Weights & Biases Inference, Volcengine, AI21 Labs, Venice.ai, Codestral, Upstage, Maritalk, Xiaomi MiMo, Inference.net, NanoGPT, Predibase, Bytez, Heroku AI, Databricks, Snowflake Cortex, and GigaChat (Sber). OmniRoute now supports **100+ providers** (4 Free + 8 OAuth + 91 API Key + Custom compatible)
- **Global Email Privacy Toggle:** Added a persistent eye-icon toggle button across all dashboard pages (Providers, Usage Limits, Playground) that reveals or hides masked email addresses. Toggle state is stored in localStorage and synced globally via Zustand store
- **Documentation Refresh:** Updated README, ARCHITECTURE, FEATURES, AGENTS.md, and API_REFERENCE for v3.6.2 with accurate provider counts (100+), new executor list, and system API documentation
- **Uninstall Guide:** Created comprehensive `docs/guides/UNINSTALL.md` covering clean uninstallation for all deployment methods (npm, Docker, Electron, source)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **PDF Attachments:** Unlocked deep string object parsing (`geminiHelper`) ensuring Gemini translation successfully passes complex PDF payloads from OpenAI-compatible streams without dropping them silently (#993)
- **SkillsMP Engine:** Corrected object extraction path mappings inside the API router to fix UI marketplace rendering under Docker/Standalone Node isolated deployments (#988)

---

## [3.6.1] — 2026-04-10

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **OAuth Env Repair Action:** Added a "Repair env" button to the OAuth Providers dashboard that detects and restores missing OAuth client IDs from `.env.example` — with timestamped backup and append-only safety. Includes full 33-language i18n support and sanitized API responses (#1116, by @yart)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **i18n: Missing Provider Keys:** Added missing `filterModels`, `modelsActive`, `showModel`, `hideModel` keys across all 32 locale files, fixing runtime `MISSING_MESSAGE` errors in the providers UI. Also cleaned up duplicate keys in `en.json` (#1111, by @rilham97)
- **GPT-5.4 Routing:** Added missing `targetFormat: "openai-responses"` to `gpt-5.4` and `gpt-5.4-mini` models in both the Codex and GitHub Copilot providers, fixing `[400]: model not accessible via /chat/completions` errors (#1114, by @ask33r)

---

## [3.6.0] — 2026-04-10

### ✨ New Features & Analytics

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Combo Smoke Test:** Raised the default token budget to 2048 to prevent truncation of thinking models during preflight checks, and fully randomized the arithmetic probe prompt to bypass deterministic caching from upstream relays (#1105)

### 🐛 Bug Fixes & Compliance

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **DB Bloat / Row Limits:** Added `CALL_LOGS_TABLE_MAX_ROWS` and `PROXY_LOGS_TABLE_MAX_ROWS` (default: 100,000) to the backend DB compliance cleaner to prevent runaway SQLite growth. Limits are enforced automatically on the TTL cycle (#1104, fixes #1101)
- **HTML Error Handling:** The router now correctly identifies unexpected HTML responses (e.g. `<!DOCTYPE html>`) sent by upstream providers (like Azure/Copilot) instead of throwing obscure `Unexpected token '<'` JSON parse errors, bubbling up a clean 502 Bad Gateway (#1104, fixes #1066)
- **Android/Termux SQLite Native Support:** `better-sqlite3` is now correctly built from source with cross-compilation flags in ARM64 local Termux deployments without failing on missing prebuilt binaries (#1107)

---

## [3.5.9] — 2026-04-09

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Persistent Combo Ordering:** Drag combo cards by handle to reorder them in the dashboard; order is persisted to SQLite via a new `sort_order` column and `POST /api/combos/reorder` endpoint. Includes DB migration `020_combo_sort_order.sql` and JSON import preservation (#1095)
- **Sidebar Group Reorder:** Moved "Logs" before "Health" in the System section and "Limits & Quotas" after "Cache" in the Primary section for a more logical navigation flow (#1095)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Stream Failure Surfacing:** Upstream `response.failed` events (e.g. Codex rate-limit errors) are now properly surfaced as non-200 errors instead of being silently swallowed as empty 200 OK streams. Rate-limit failures return HTTP 429 (#1098, closes #1093)
- **Upstream Model Preservation:** The Responses-to-OpenAI stream translator now preserves the actual upstream model (e.g. `gpt-5.4`) instead of hardcoding a `gpt-4` fallback (#1098, closes #1094)
- **Docker EXDEV Fix:** `build-next-isolated.mjs` now falls back from `fs.rename()` to `cp/rm` when Docker buildx raises `EXDEV` (cross-device link), unblocking the Docker image publish workflow (#1097)
- **macOS CLI Path Resolution:** `cliRuntime.ts` resolves symlink parents with `fs.realpath()` to handle macOS `/var` → `/private/var` chains, preventing false `symlink_escape` rejections (#1097)
- **Request Log Token Layout:** Split token badges into separate Input (Total In, Cache Read, Cache Write) and Output (Total Out, Reasoning) groups for clearer readability; renamed "Time" label to "Completed Time" (#1096)

---

## [3.5.8] — 2026-04-09

### ✨ New Features & Analytics

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Analytics Layout Redesign:** Replaced flat metrics with a responsive `CompactStatGrid`, grouping data visually across sections (#1089)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Build Core:** Force Turbopack cleanup via Prepbulish script to prevent Next.js 16 app/ routing conflicts on runtime.
- **Provider Quarantine:** Introduces model/provider circuit-breakers with adaptive TTL exponential backoff for recurring upstream errors (#1090)
- **Oauth Keep-Alive:** Safely protects authenticated active accounts against spontaneous dropping from router due to transient token refresh failures (#1085)

### 🔒 Security & Maintenance

- **Dependabot:** bumped axios from 1.14.0 to 1.15.0 addressing SSRF flags (#1088)

---

## [3.5.7] — 2026-04-09

### 🐛 Bug Fixes & Security

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Turbopack Standalone Chunks:** Fixed a critical bug in `scripts/prepublish.mjs` where Turbopack chunks missing from the `.next/standalone` trace resulted in a `500 ChunkLoadError` (e.g., `_not-found` page crash) during production deployments via NPM or Docker. Standalone chunks are now explicitly copied and correctly stripped of Turbopack hashes.

---

## [3.5.6] — 2026-04-09

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Email Privacy Masking:** OAuth account emails are now masked in the provider dashboard (e.g. `di*****@g****.com`) to prevent accidental exposure when sharing screenshots. Full address visible on hover via `title` attribute (#1025).
- **OpenRouter & GitHub in Embedding/Image Registries:** OpenRouter (3 embedding models, 4 image models) and GitHub Models (2 embedding models via Azure inference) are now first-class entries in the provider registries, enabling their use for `/v1/embeddings` and `/v1/images/generations` (#960).
- **Model Visibility Toggle & Search Filter:** The provider page model list now includes a real-time search/filter bar and a per-model visibility toggle (👁 icon). Hidden models are grayed out and excluded from the `/v1/models` catalog. An active-count badge (`N/M active`) shows at a glance how many models are enabled (#750).
- **Chinese Localization (zh-CN):** Added missing translations for Context Relay, Memory, LKGP, and Models.dev sync features, while standardizing terminology across the application (#1079).
- **Environment Auto-Sync:** Added `sync-env.mjs` to auto-generate and append `.env` from `.env.example` during installation, automatically generating cryptographic secrets on first run.
- **Source Mode Dashboard Update:** Fixed real-time Source (git-checkout) updating in the dashboard, enabling secure, real-time update pipelines for non-NPM installations.

### 🐛 Bug Fixes & Security

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Hardcoded Secret Cleanup:** Removed 12 hardcoded OAuth credential fallbacks from the source code, forcing secure reliance on environment variables and resolving static analysis security alerts.
- **Next.js Security Patch:** Bumped `next` from 16.2.2 to 16.2.3 to resolve critical RSC deserialization RCE vulnerability (SNYK-JS-NEXT-15954202).
- **Memory/Cache UI Crash:** Added null-safety guards (`?? 0`) to `.toLocaleString()` calls in Memory and Cache dashboard pages, preventing `TypeError` crashes when database tables are empty or contain null numeric values (#1083).
- **WebSearch tool_choice Translation:** Fixed OpenAI-to-Claude translator dropping `tool_choice` objects with `type: "function"` as-is, which Claude rejects. Now properly maps all OpenAI `tool_choice` variants (`function`, `required`, `none`) to Claude-compatible format (`tool`, `any`, `auto`), fixing "Did 0 searches" in Claude Code WebSearch (#1072).
- **Provider Validation baseUrl Override:** Added `baseUrl` passthrough from frontend validation requests to the backend validation endpoint. Chinese-site users of Alibaba Coding Plan (bailian-coding-plan) can now validate API keys against their custom Base URL instead of always hitting the international endpoint (#1078).
- **Minimax Auth Header:** Switched Minimax provider from `x-api-key` to `Authorization: Bearer` header format, matching the current API spec (#1076).
- **Native Fetch Fallback:** Added graceful fallback to native `fetch` when the `undici` dispatcher fails, improving resilience in environments where undici is unavailable (#1054).
- **EPIPE Flood Fix:** Added circuit-breaker logic to prevent EPIPE errors from creating a feedback loop that fills logs at GB/s (#1006).
- **Qoder PAT Validation:** Improved Qoder Personal Access Token validation with actionable error messages that guide users to the correct token format (#966).
- **CI/CD Pipeline:** Fixed `check:docs-sync` failure by syncing OpenAPI version to 3.5.6 and finalizing CHANGELOG release heading. Commented out `DATA_DIR` in `.env.example` to prevent E2E test failures in CI runners lacking root permissions.

### 🌍 i18n

- **Auto Language Generation (CI):** Added CI pipeline to auto-generate missing language files and strings via `feat(CI,i18n)` workflow, covering 30+ locales (#1071).

---

## [3.5.5] — 2026-04-08

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Node.js 24 Compatibility Warning:** Added a proactive version incompatibility warning on the login page to guide users to the stable Node.js 22 LTS, preventing native sqlite binding crashes.
- **Context Relay Combo Strategy:** Added the new `context-relay` combo strategy with priority-style routing, structured handoff summary generation once quota usage reaches the warning threshold, and handoff injection after the next real account switch.
- **Global Context Relay Defaults:** Added global Settings defaults plus combo-level configuration for `handoffThreshold`, `handoffModel`, and `handoffProviders`, so new or unconfigured combos can inherit the feature consistently.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Proxy Connection Healthchecks:** Applied proxy resolution per connection in the sweeping loop (`tokenHealthCheck.ts`) and global provider validation sweeps, resolving Node 22 bypass and improving proxy stability (#1051, #1056, #1061).
- **Security Vulnerability Remediation:** Resolved multiple CodeQL scanning alerts including SSRF in model sync, insecure randomness in web crypto (`generateSessionId`), and incomplete URL sanitization.
- **Context Relay Typing & Synchronization:** Reverted out-of-scope test breakages and resolved `handoffProvider` and response `input` extraction payload typing.
- **Legacy OpenAI-Compatible Responses Routing:** Fixed legacy/imported OpenAI-compatible providers (for example `openai-compatible-sp-openai`) incorrectly routing Chat Completions traffic to `/chat/completions` when the real provider node was configured as `apiType: "responses"`. OmniRoute now treats `providerSpecificData.apiType` as authoritative across routing, executors, and translator tools, avoiding false empty-content failures during combo/provider smoke tests (#1069).
- **Gemini PDF Attachment Integration:** Fixed payload generation and format for parsing `inline_data` and generic base64 sources for deep Gemini PDF routing (#993, #1021).
- **Vercel AI SDK Fallbacks:** Mapped `max_output_tokens` to `max_tokens` for strict OpenAI-compatible providers, resolving errors from standard AI agents and frameworks (#994).
- **External Auth & UI Reliability:** Handled null `state` failures in Cline OAuth exchange (#1016), added 3rd-party 400 error patterns to combo fallback (#1024), and resolved desktop sidebar layout and popover overflows (#1039, #1001).
- **Context Relay In-Flight Deduplication:** Prevented duplicate handoff generation for the same session/combo while an earlier summary request is still in flight.
- **Context Relay Provider Gating:** Aligned runtime behavior with configuration so explicit `handoffProviders` exclusions, including an empty array, now disable handoff generation as expected.

### 🛠️ Maintenance & Dependabot

- **Updated Sub-dependencies:** Bumped `hono` to `4.12.12` and `@hono/node-server` to `1.19.13` to patch critical security gaps (#1063, #1064, #1067, #1068).

### 📚 Documentation

- **Documentation Synchronization:** Updated system documentation (README, Architecture, Features, Tools, Troubleshooting) and synced `i18n` configurations to match the v3.5.5 context relay patterns and proxy troubleshooting steps.
- **Context Relay Delivery Notes:** Documented the current architecture, runtime flow, and Codex-focused scope in the feature docs, changelog, and agent guidance.

---

## [3.5.4] — 2026-04-07

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Detailed Token Tracking:** Added granular token breakdown columns (cache read, cache write, reasoning) to call logs with proper null vs zero distinction. Includes DB migration 018 and 5-label UI display per provider capability (#1017 — thanks @rdself).
- **Legacy JSON Config Import/Export:** Restored JSON-based settings export and import for migration from legacy configurations. Security-hardened with Zero-Trust redaction of passwords and `requireLogin` fields, and automatic pre-import database backups (#1012 — thanks @luandiasrj).
- **Non-Stream Aliases:** Added API support for explicit non-streaming aliases (`non_stream`, `disable_stream`, `disable_streaming`, `streaming=false`), normalized at the boundary before provider translation (#1036 — thanks @wlfonseca).
- **Russian Dashboard Localization:** Comprehensive Russian translation for the dashboard UI, including fixes for 2 Ukrainian locale keys (#1003 — thanks @mercs2910).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Anthropic Streaming Input Undercount:** Fixed a critical bug where Anthropic streaming `prompt_tokens` only reported non-cached tokens (e.g., `in=3` when actual total was 113,616). Cache tokens are now summed into prompt_tokens during streaming (#1017).
- **Built-in Responses API Tool Types:** Preserved built-in Responses API tools (`web_search`, `file_search`, `computer`, `code_interpreter`, `image_generation`) from being silently stripped by the empty-name tool filter — these tools carry no `.name` field (#1014 — thanks @rdself).
- **Cursor/Codex Responses Compatibility:** Fixed empty output in Cursor when using Codex models by hoisting system input items to `instructions`, sanitizing invalid tool names, and detecting Responses-format payloads on chat/completions endpoint (#1002 — thanks @mercs2910).
- **OAuth Token Expiry Display:** Fixed OAuth connections showing "expired" badge even with valid tokens by reading `tokenExpiresAt` (updated on refresh) instead of `expiresAt` (original grant timestamp) (#1032 — thanks @tombii).
- **Codex Fast-Tier Copy:** Corrected dashboard settings copy from `service_tier=fast` to `service_tier=priority`, matching the actual Codex wire format (#1045 — thanks @kfiramar).
- **macOS Desktop App Startup:** Stabilized packaged macOS app launch by excluding desktop artifacts from the standalone bundle and improving launch path detection (#1004 — thanks @mercs2910).
- **macOS Sidebar Layout:** Fixed macOS traffic light overlap, sidebar spacing, and button overflow in the Electron desktop app (#1001 — thanks @mercs2910).

### ⚡ Performance

- **Analytics Page Load:** Dramatically reduced analytics page load times (30s→1-2s for 50K entries) via date-filtered DB queries, parallel `Promise.all()` cost calculations, and merged 6 COUNT queries into a single CASE WHEN aggregate (#1038 — thanks @oyi77).

### 🔒 Security & Dependencies

- **Node Base Image:** Upgraded Docker base from `22-bookworm-slim` to `22.22.2-trixie-slim` (#1011 — Snyk).
- **Production Dependencies:** Bumped 5 production dependencies (#1044 — Dependabot).
- **Vite:** Bumped from 8.0.3 to 8.0.5 (#1031 — Dependabot).
- **Development Dependencies:** Bumped 4 development dependencies (#1030 — Dependabot).

### 🧪 Tests

- **Token Accounting Tests:** Added 18 new unit tests covering detailed token breakdown, null vs zero semantics, per-provider token extraction, and Anthropic streaming input fix (#1017).
- **Built-in Tool Tests:** Added 3 new test cases for built-in Responses API tool type preservation (#1014).
- **ChatCore Sanitization:** Updated sanitization tests to accommodate Responses format detection (PR #1002) and built-in tool preservation (PR #1014).

### 🛠️ Maintenance

- **PR Workflow:** Updated `/review-prs` workflow to merge PRs into the release branch (`release/vX.Y.Z`) instead of directly into `main`, ensuring proper pre-release staging.

### Coverage

- **2537 tests, 2532 passing** — Statement coverage: 91.95%, Branch coverage: 78.79%, Function coverage: 93.19%

## [3.5.3] - 2026-04-07

### Security

- **Vulnerabilities:** Fully remediated 12 High-Severity CodeQL vulnerabilities by migrating from Math.random to `crypto.randomUUID()`, wrapping SSE injection points with aggressive backslash escaping, sanitizing trailing HTTP fragments, and enforcing rigid SSRF HTTP verification schemes across internal routes.
- **Dependencies:** Upgraded Next.js to `^16.2.2` and Vite to `>=8.0.5` resolving critical DoS, arbitrary file reads and CSRF vectors in the build/server environments.

### Fixed

- **E2E Stability:** Eliminated extreme CI unreliability and transient test timeouts (Playwright) by propagating internal standalone `_next/static` assets properly and refactoring deep UI interactions inside defensive `expect().toPass()` loops.
- **Middleware:** Resolved infinite redirect loop on dashboard for fresh instances when requireLogin is disabled.
- **Core Fallbacks:** Preserved primary failure contexts and enhanced Edge-case error handling pipelines across chat and fallback loops.
- **Proxy/Hooks:** Optimized local git hooks, normalized token coverage endpoints into `/coverage`, and guarded GLM region lookups.

### 🛠️ Maintenance

- **CI/CD Stabilization:** Prevented random GitHub Runner freezes by decoupling sharded processes, adjusting test concurrencies, unref-ing active connections on server teardown, and strictly capping job timeout durations.

### Documentation

- **I18n Engine:** Synchronized and pushed deep Machine Translation updates across all 32 natively-supported languages (682 translation nodes aligned).

### Coverage

- **Testing:** Consolidated the workspace test coverage framework hitting 92.1% statement line coverage, with new rigid unit-tests matching API key policies and tool scopes.

---

## [3.5.2] — 2026-04-05

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Qoder API Native Integration:** Completely refactored the Qoder Executor to bypass the legacy COSY AES/RSA encryption algorithm, routing directly into the native DashScope OpenAi-compatible URL. Eliminates complex dependencies on Node `crypto` modules while improving stream fidelity.
- **Resilience Engine Overhaul:** Integrated context overflow graceful fallbacks, proactive OAuth token detection, and empty-content emission prevention (#990).
- **Context-Optimized Routing Strategy:** Added new intelligent routing capability to natively maximize context windows in automated combo deployments (#990).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Responses API Stream Corruption:** Fixed deep-cloning corruption where Anthropic/OpenAI translation boundaries stripped `response.` specific SSE prefixes from streaming boundaries (#992).
- **Claude Cache Passthrough Alignment:** Aligned CC-Compatible cache markers consistently with upstream Client Pass-Through mode preserving prompt caching.
- **Turbopack Memory Leak:** Pinned Next.js to strict `16.0.10` preventing memory leaks and build staleness from recent upstream Turbopack hashed module regressions (#987).

---

## [3.5.1] — 2026-04-04

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Models.dev Integration:** Integrated models.dev as the authoritative runtime source for model pricing, capabilities, and specifications, overriding hardcoded prices. Includes a settings UI to manage sync intervals, translation strings for all 30 languages, and robust test coverage.
- **Provider Native Capabilities:** Added support for declaring and checking native API features (e.g. `systemInstructions_supported`) preventing failures by sanitizing invalid roles. Currently configured for Gemini Base and Antigravity OAuth providers.
- **API Provider Advanced Settings:** Added per-connection custom `User-Agent` overrides for API-key provider connections. The override is stored in `providerSpecificData.customUserAgent` and now applies to validation probes and upstream execution requests.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Qwen OAuth Reliability:** Resolved a series of OAuth integration issues including a 400 Bad Request blocker on expired tokens, fallback generation for parsing OIDC `access_token` properties when `id_token` is omitted, model catalog discovery errors, and strict filtering of `X-Dashscope-*` headers to avoid 400 rejection from OpenAI-compatible endpoints.

## [3.5.0] — 2026-04-03

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Auto-Combo & Routing:** Completed native CRUD lifecycle integration for the advanced Auto-Combo engine (#955).
- **Core Operations:** Fixed missing translations for new native Auto-Combos options (#955).
- **Security Validation:** Disabled SQLite auto-backup tasks natively during unit test CI execution to explicitly resolve Node 22 Event Loop hanging memory leaks (#956).
- **Ecosystem Proxies:** Completed explicit integration mapping model synchronization schedulers, OAuth cycles, and Token Check refreshes safely through OmniRoute's native system upstream proxies (#953).
- **MCP Extensibility:** Added and successfully registered the new `omniroute_web_search` MCP framework tool out of beta into production schemas (#951).
- **Tokens Buffer Logic:** Added runtime configuration limits extending configurable input/output token buffers for precise Usage Tracking metrics (#959).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **CodeQL Remediation:** Fully resolved and secured critical string indexing operations preventing Server-Side Request Forgery (SSRF) arrays indexing heuristics alongside polynomial algorithmic backtracking (ReDoS) inside deep proxy dispatcher modules.
- **Crypto Hashes:** Replaced weak unverified legacy OAuth 1.0 hashes with robust HMAC-SHA-256 standard validation primitives ensuring tight access controls.
- **API Boundary Protection:** Correctly verified and mapped structural route protections enforcing strict `isAuthenticated()` middleware logic covering newer dynamic endpoints targeting settings manipulation and native skills loading.
- **CLI Ecosystem Compat:** Resolved broken native runtime parser bindings crashing `where` environment detectors strictly over `.cmd/.exe` edge cases gracefully for external plugins (#969).
- **Cache Architecture:** Refactored exact Analytics and System Settings dashboard parameters layout structure caching to maintain stable re-hydration persistence cycles resolving visual unaligned state flashes (#952).
- **Claude Caching Standards:** Normalized and accurately strictly preserved critical ephemeral block markers `ephemeral` caching TTL orders for downstream nodes enforcing standard compatible CC requests mapping cleanly without dropped metrics (#948).
- **Internal Aliases Auth:** Simplified internal runtime mappings normalizing Codex credential payload lookups inside global translation parameters resolving 401 unauthenticated drops (#958).

### 🛠️ Maintenance

- **UI Discoverability:** Correctly adjusted layout categorizations explicitly separating free tier providers logic improving UX sorting flows inside the general API registry pages (#950).
- **Deployment Topology:** Unified Docker deployment artifacts ensuring the root `fly.toml` matches expected cloud instance parameters out-of-the-box natively handling automated deployments scaling properly.
- **Development Tooling:** Decoupled `LKGP` runtime parameters into explicit DB layer abstraction caching utilities ensuring strict test isolation coverage for core caching layers safely.

---

## [3.4.9] — 2026-04-03

### Features & Refactoring

- **Dashboard Auto-Combo Panel:** Completely refactored the `/dashboard/auto-combo` UI to seamlessly integrate with native Dashboard Cards and standardized visual padding/headers. Added dynamic visual progress bars mapping model selection weight mechanisms.
- **Settings Routing Sync:** Fully exposed advanced routing `priority` and `weighted` schema targets internally inside global settings fallback lists.

### Bug Fixes

- **Memory & Skills Locale Nodes:** Resolved empty rendering tags for Memory and Skills options directly inside global settings views by wiring all `settings.*` mapping values internally into `en.json` (also mapped implicitly for cross-translation tools).

### Internal Integrations

- Integrated PR #946 — fix: preserve Claude Code compatibility in responses conversion
- Integrated PR #944 — fix(gemini): preserve thought signatures across antigravity tool calls
- Integrated PR #943 — fix: restore GitHub Copilot body
- Integrated PR #942 — Fix cc-compatible cache markers
- Integrated PR #941 — refactor(auth): improve NVIDIA alias lookup + add LKGP error logging
- Integrated PR #939 — Restore Claude OAuth localhost callback handling
- _(Note: PR #934 was omitted from 3.4.9 cycle to prevent core conflict regressions)_

---

## [3.4.8] — 2026-04-03

### Security

- Fully remediated all outstanding Github Advanced Security (CodeQL) findings and Dependabot alerts.
- Fixed insecure randomness vulnerabilities by migrating from `Math.random` to `crypto.randomUUID()`.
- Secured shell commands in automated scripts from string injection.
- Migrated vulnerable catastrophic backtracking RegEx parsing patterns in chat/translation pipelines.
- Enhanced output sanitization controls inside React UI components and Server Sent Events (SSE) tag injection.

---

## [3.4.7] — 2026-04-03

### Features

- Added `Cryptography` node to Monitoring and MCP health checks (#798)
- Hardened model-catalog route permissions mapping (`/models`) (#781)

### Bug Fixes

- Fixed Claude OAuth token refreshes failing to preserve cache contexts (#937)
- Fixed CC-Compatible provider errors rendering cached models unreachable (#937)
- Fixed GitHub Executor errors related to invalid context arrays (#937)
- Fixed NPM-installed CLI tools healthcheck failures on Windows (#935)
- Fixed payload translation dropping valid content due to invalid API fields (#927)
- Fixed runtime crash in Node 25 regarding API key execution (#867)
- Fixed MCP standalone module-resolution (`ERR_MODULE_NOT_FOUND`) via `esbuild` (#936)
- Fixed NVIDIA NIM routing credential resolution alias mismatch (#931)

### Security

- Added safe strict input boundary protection against raw `shell: true` remote-code execution injections.

---

## [3.4.6] - 2026-04-02

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Providers:** Registered new image, video, and audio generation providers from the community-requested list (#926).
- **Dashboard UI:** Added standalone sidebar navigation for the new Memory and Skills modules (#926).
- **i18n:** Added translation strings and layout mappings across 30 languages for the Memory and Skills namespaces.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Resilience:** Prevented the proxy Circuit Breaker from becoming stuck in an OPEN state indefinitely by handling direct transitions to CLOSED state inside fallback combo paths (#930).
- **Protocol Translation:** Patched the streaming transformer to sanitize response blocks based on the expected _source_ protocol rather than the provider _target_ protocol, fixing Anthropics models wrapped in OpenAI payloads crashing Claude Code (#929).
- **API Specs & Gemini:** Fixed `thought_signature` parsing in `openai-to-gemini` and `claude-to-gemini` translators, preventing HTTP 400 errors across all Gemini 3 API tool-calls.
- **Providers:** Cleaned up non-OpenAI-compatible endpoints preventing valid upstream connections (#926).
- **Cache Trends:** Fixed an invalid property mapping data mismatch causing Cache Trends UI charts to crash, and extracted redundant cache metric widgets (#926).

---

## [3.4.5] - 2026-04-02

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **CLIProxyAPI Ecosystem Integration:** Added the `cliproxyapi` executor with built-in module-level caching and proxy routing. Introduced a comprehensive Version Manager service to automatically test health, download binaries from GitHub, spawn isolated background processes, and cleanly manage the lifecycle of external CLI tools directly through the UI. Includes DB tables for proxy configuration to enable automatic SSRF-gated cross-routing of external OpenAI requests via the local CLI tool layer (#914, #915, #916).
- **Qoder PAT Support:** Integrated Personal Access Tokens (PAT) support directly via the local `qodercli` transport instead of legacy remote `.cn` browser configurations (#913).
- **Gemini 3.1 Pro Preview (GitHub):** Added `gemini-3.1-pro-preview` canonical explicit model support natively into the GitHub Copilot provider while preserving older routing aliases (#924).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **GitHub Copilot Token Stability:** Repaired the Copilot token refresh loop where stale tokens weren't deep-merged into DB, and removed `reasoning_text` fields that were fatally breaking downstream Anthropic block conversions for multi-turn chats (#923).
- **Global Timeout Matrix:** Centralized and parameterized request timeouts explicitly from `REQUEST_TIMEOUT_MS` to prevent hidden (~300s) default fetch buffers prematurely cutting off long-lived SSE streaming responses from heavy reasoning models (#918).
- **Cloudflare Quick Tunnels State:** Fixed a severe state inconsistency where restarted OmniRoute instances erroneously showed destroyed tunnels as active, and defaulted cloudflared tunneling to `HTTP/2` to eliminate UDP receive buffer log spam (#925).
- **i18n Translation Overhaul (Czech & Hindi):** Fixed Hindi code from DEPRECATED `in.json` to canonical `hi.json`, overhauled Czech text mappings, extracted `untranslatable-keys.json` to fix CI/CD false-positive validations, and generated comprehensive `I18N.md` docs to guide translators (#912).
- **Tokens Provider Recovery:** Fixed Qwen losing specific `resourceUrl` endpoints after automatic health-check token refreshes because of missing DB deep merges (#917).
- **CC Compatible UX & Streaming:** Unified the Add CC/OpenAI/Anthropic compatible actions around the Anthropic UI treatment, forced CC-compatible upstream requests to use SSE while still returning streaming or non-streaming responses based on the client request, removed CC model-list configuration/import support in favor of an explicit unsupported-model-listing error, and made CC-compatible Available Models mirror the OAuth Claude Code registry list (#921).

---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Responses API Token Reporting:** Emit `response.completed` with correct `input_tokens`/`output_tokens` fields for Codex CLI clients, fixing token usage display (#909 — thanks @christopher-s).
- **SQLite WAL Checkpoint on Shutdown:** Flush WAL changes into the primary database file during graceful shutdown/restart, preventing data loss on Docker container stops (#905 — thanks @rdself).
- **Graceful Shutdown Signal:** Changed `/api/restart` and `/api/shutdown` routes from `process.exit(0)` to `process.kill(SIGTERM)`, ensuring the shutdown handler runs before exit.
- **Docker Stop Grace Period:** Added `stop_grace_period: 40s` to Docker Compose files and `--stop-timeout 40` to Docker run examples.

### 🛠️ Maintenance

- Closed 5 resolved/not-a-bug issues (#872, #814, #816, #890, #877).
- Triaged 6 issues with needs-info requests (#892, #887, #886, #865, #895, #870).
- Responded to CLI detection tracking issue (#863) with contributor guidance.

---

## [3.4.3] - 2026-04-02

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Antigravity Memory & Skills:** Completed remote memory and skills injection for the Antigravity provider at the proxy network level.
- **Claude Code Compatibility:** Built a natively hidden compatibility bridge for Claude Code, passing tools and formatting through cleanly.
- **Web Search MCP:** Added the `omniroute_web_search` tool with the `execute:search` scope.
- **Cache Components:** Implemented dynamic cache components utilizing TDD.
- **UI & Customization:** Added custom favicon support, appearance tabs, wired whitelabeling to the sidebar, and added Windsurf guide steps across all 33 languages.
- **Log Retention:** Unified request log retention and artifacts natively.
- **Model Enhancements:** Added explicit `contextLength` for all opencode-zen models.
- **i18n & translations:** Integrated 33 language translations natively, including placeholder CI validations and Chinese documentation updates (#873, #869).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Qwen OAuth Mapping:** Reverted `id_token` reliance to `access_token` and enabled dynamic `resource_url` API endpoint injection for proper regional routing (#900).
- **Model Sync Engine:** Stored the strict internal Provider ID in `getCustomModels()` sync routines instead of the UI Channel Alias format, preventing SQLite catalog insertion failures (#903).
- **Claude Code & Codex:** Standardized non-streaming blank responses to Anthropic-formatted `(empty response)` to prevent CLI proxy crashes (#866).
- **CC Compatible Routing:** Resolved duplicate `/v1` endpoint collision during path concatenation for generic Claude Code gateways (#904).
- **Antigravity Dashboards:** Blocked unlimited quota models from falsely registering as exhausted `100% Usage` limit states in the Provider Usage UI (#857).
- **Claude Image Passthrough:** Fixed Claude models missing image block passthroughs (#898).
- **Gemini CLI Routing:** Resolved 403 authorization lockouts and content accumulation issues by refreshing the project ID via `loadCodeAssist` (#868).
- **Antigravity Stability:** Corrected model access lists, enforced 404 lockouts, fixed 429 cascades locking out standard connections, and capped `gemini-3.1-pro` output tokens (#885).
- **Provider Sync Cadence:** Repaired the provider limits synchronization cadence via the internal scheduler (#888).
- **Dashboard Optimization:** Resolved `/dashboard/limits` UI freezing when processing 70+ accounts via chunk parallelization (#784).
- **SSRF Hardening:** Enforced strict SSRF IP range filtering and blocked the `::1` loopback interface.
- **MIME Types:** Standardized `mime_type` to snake_case to match Gemini API specifications.
- **CI Stabilization:** Fixed failing analytics/settings Playwright selectors and request assertions so GitHub Actions E2E runs pass reliably across localized UIs and switch-based controls.
- **Deterministic Tests:** Removed date-sensitive quota fixtures from Copilot usage tests and aligned idempotency/model catalog tests with the merged runtime behavior.
- **MCP Type Hardening:** Removed zero-budget explicit `any` regressions from the MCP server tool registration path.
- **Model Sync Engine:** Bypassed destructive `replace` overrides when the provider's auto-sync yields an empty model list, maintaining stability for dynamic catalogs (#899).

### 🛠️ Maintenance

- **Pipeline Logging:** Refined pipeline logging artifacts and enforce retention caps (#880).
- **AGENTS.md Overhaul:** Condensed from 297→153 lines. Added build/test/style guidelines, code workflows (Prettier, TypeScript, ESLint), and trimmed verbose tables (#882).
- **Release Branch Integration:** Consolidated the active feature branches into `release/v3.4.2` on top of current `main` and validated the branch with lint, unit, coverage, build, and CI-mode E2E runs.
- **Testing:** Added vitest configuration for component testing and Playwright specs for settings toggles.
- **Doc Updates:** Expanded root readmes, translated chinese documents natively, and cleaned up obsolete files.

## [3.4.1] - 2026-03-31

> [!WARNING]
> **BREAKING CHANGE: request logging, retention, and logging environment variables have been redesigned.**
> On the first startup after upgrading, OmniRoute archives legacy request logs from `DATA_DIR/logs/`, legacy `DATA_DIR/call_logs/`, and `DATA_DIR/log.txt` into `DATA_DIR/log_archives/*.zip`, then removes the deprecated layout and switches to the new unified artifact format under `DATA_DIR/call_logs/`.

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **.ENV Migration Utility:** Included `scripts/migrate-env.mjs` to seamlessly migrate `<v3.3` configurations to `v3.4.x` strict security validation constraints (FASE-01), repairing startup crashes caused by short `JWT_SECRET` instances.
- **Kiro AI Cache Optimization:** Implemented deterministic `conversationId` generation (uuidv5) to enable AWS Builder ID Prompt Caching properly across invocations (#814).
- **Dashboard UI Restoration & Consolidation:** Resolved sidebar logic omitting the Debug section, and cleared Nextjs routing warnings by moving standalone `/dashboard/mcp` and `/dashboard/a2a` pages explicitly into embedded Endpoint Proxy UI components.
- **Unified Request Log Artifacts:** Request logging now stores one SQLite index row plus one JSON artifact per request under `DATA_DIR/call_logs/`, with optional pipeline capture embedded in the same file.
- **Language:** Improved the Chinese translation (#855)
- **Opencode-Zen Models:** Added 4 free models to opencode-zen registry (#854)
- **Tests:** Added unit and E2E tests for settings toggles and bug fixes (#850)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **429 Quota Parsing:** Parsed long quota reset times from error bodies to honor correct backoffs and prevent rate-limited account bans (#859)
- **Prompt Caching:** Preserved client `cache_control` headers for all Claude-protocol providers (like Minimax, GLM, and Bailian), correctly recognizing caching support (#856)
- **Model Sync Logs:** Reduced log spam by recording `sync-models` only when the channel actually modifies the list (#853)
- **Provider Quota & Token Parsing:** Switched Antigravity limits to use `retrieveUserQuota` natively and correctly mapped Claude token refresh payloads to URL-encoded forms (#862)
- **Rate-Limiting Stability:** Universalized the 429 Retry-After parsing architecture to cap provider-induced cooldowns at 24 hours max (#862)
- **Dashboard Limit Rendering:** Re-architected `/dashboard/limits` quota mapping to render immediately inside chunks, fixing a major UI freezing delay on accounts exceeding 70 active connections (#784)
- **QWEN OAuth Authorization:** Mapped the OIDC `id_token` as the primary API Bearer token for Dashscope requests, fixing immediate 401 Unauthorized errors after connecting accounts or refreshing tokens (#864)
- **ZAI API Stability:** Hardened Server-Sent Events compiler to gracefully fallback to empty strings when DeepSeek providers stream mathematically null content during reasoning phases (#871)
- **Claude Code/Codex Translations:** Protected non-streaming payload conversions against empty responses from upstream Codex tools, avoiding catastrophic TypeErrors (#866)
- **NVIDIA NIM Rendering:** Conditionally stripped identical provider prefixes dynamically pushed by audio models, eliminating duplicate `nim/nim` tag structures throwing 404 on the Media Playground (#872)

### ⚠️ Breaking Changes

- **Request Log Layout:** Removed the old multi-file `DATA_DIR/logs/` request log sessions and the `DATA_DIR/log.txt` summary file. New requests are written as single JSON artifacts in `DATA_DIR/call_logs/YYYY-MM-DD/`.
- **Logging Environment Variables:** Replaced `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE`, and `PROXY_LOG_MAX_ENTRIES` with the new `APP_LOG_*` and `CALL_LOG_RETENTION_DAYS` configuration model.
- **Pipeline Toggle Setting:** Replaced the legacy `detailed_logs_enabled` setting with `call_log_pipeline_enabled`. New pipeline details are embedded inside the request artifact instead of being stored as separate `request_detail_logs` records.

### 🛠️ Maintenance

- **Legacy Request Log Upgrade Backup:** Upgrades now archive old `data/logs/`, legacy `data/call_logs/`, and `data/log.txt` layouts into `DATA_DIR/log_archives/*.zip` before removing the deprecated structure.
- **Streaming Usage Persistence:** Streaming requests now write a single `usage_history` row on completion instead of emitting a duplicate in-progress usage row with empty status metadata.
- **Logging Follow-up Cleanup:** Pipeline logs no longer capture `SOURCE REQUEST`, request artifact entries now honor `CALL_LOG_MAX_ENTRIES`, and application log archives now honor `APP_LOG_MAX_FILES`.

---

## [3.4.0] - 2026-03-31

### 🚀 Features

- **Subscription Utilization Analytics:** Added quota snapshot time-series tracking, Provider Utilization and Combo Health tabs with recharts visualizations, and corresponding API endpoints (#847)
- **SQLite Backup Control:** New `OMNIROUTE_DISABLE_AUTO_BACKUP` env flag to disable automatic SQLite backups (#846)
- **Model Registry Update:** Injected `gpt-5.4-mini` into the Codex provider's array of models (#756)
- **Provider Limit Tracking:** Track and display when provider rate limits were last refreshed per account (#843)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Qwen Auth Routing:** Re-routed Qwen OAuth completions from the DashScope API to the Web Inference API (`chat.qwen.ai`), resolving authorization failures (#844, #807, #832)
- **Qwen Auto-Retry Loop:** Added targeted 429 Quota Exceeded backoff handling inside `chatCore` protecting burst requests
- **Codex OAuth Fallback:** Modern browser popup blocking no longer traps the user; it automatically falls back to manual URL entry (#808)
- **Claude Token Refresh:** Anthropic's strict `application/json` boundaries are now respected during token generation instead of encoded URLs (#836)
- **Codex Messages Schema:** Stripped purist `messages` injects from native passthrough requests to avoid structural rejections from the ChatGPT upstream (#806)
- **CLI Detection Size Limit:** Safely bumped the Node binary scanning upper bound from 100MB to 350MB, allowing heavy standalone tools like Claude Code (229MB) and OpenCode (153MB) to be correctly detected by the VPS runtime (#809)
- **CLI Runtime Environment:** Restored ability for CLI configurations to respect user override paths (`CLI_{PROVIDER}_BIN`) bypassing strict path-bound discovery rules
- **Nvidia Header Conflicts:** Removed `prompt_cache_key` properties from upstream headers when calling non-Anthropic providers (#848)
- **Codex Fast Tier Toggle:** Restored Codex service tier toggle contrast in light mode (#842)
- **Test Infrastructure:** Updated `t28-model-catalog-updates` test that incorrectly expected the outdated DashScope endpoint for the Qwen native registry

---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Custom Provider Rotation:** Integrated `getRotatingApiKey` internally inside DefaultExecutor, ensuring `extraApiKeys` rotation triggers correctly for custom and compatible upstream providers (#815)

---

## [3.3.8] - 2026-03-30

### 🚀 Features

- **Models API Filtering:** Endpoint `/v1/models` now dynamically filters its list based on the permissions tied to the `Authorization: Bearer <token>` when restricted access is on (#781)
- **Qoder Integration:** Native integration for Qoder AI natively replacing the legacy iFlow platform mappings (#660)
- **Prompt Cache Tracking:** Added tracking capabilities and frontend visualization (Stats card) for semantic and prompt caching in the Dashboard UI

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Cache Dashboard Sizing:** Improved the UI layout sizes and context headers for the advanced cache pages (#835)
- **Debug Sidebar Visibility:** Fixed an issue where the debug toggle wouldn't correctly show/hide sidebar debug details (#834)
- **Gemini Model Prefixing:** Modified the namespace fallback to properly route via `gemini-cli/` instead of `gc/` to respect upstream specs (#831)
- **OpenRouter Sync:** Improved compatibility synchronization to automatically ingest the available models catalog correctly from OpenRouter (#830)
- **Streaming Payloads Mapping:** Reserialization of reasoning fields natively resolves conflict alias paths when output is streaming to edge devices

---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **OpenCode Config:** Restructured generated `opencode.json` to use the `@ai-sdk/openai-compatible` record-based schema with `options` and `models` as object maps instead of flat arrays, fixing config validation failures (#816)
- **i18n Missing Keys:** Added missing `cloudflaredUrlNotice` translation key across all 30 language files to prevent `MISSING_MESSAGE` console errors in the Endpoint page (#823)

---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Token Accounting:** Included prompt cache tokens safely in historical usage inputs calculations for correct quota deductions (PR #822)
- **Combo Test Probes:** Fixed combo testing logic false negatives by resolving parsing for reasoning-only responses and enabled massive parallelization via Promise.all (PR #828)
- **Docker Quick Tunnels:** Embedded required ca-certificates inside the base runtime container to resolve Cloudflared TLS startup failures, and surfaced stdout network errors replacing generic exit codes (PR #829)

---

## [3.3.5] - 2026-03-30

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Gemini Quota Tracking:** Added real-time Gemini CLI quota tracking via the `retrieveUserQuota` API (PR #825)
- **Cache Dashboard:** Enhanced the Cache Dashboard to display prompt cache metrics, 24h trends, and estimated cost savings (PR #824)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **User Experience:** Removed invasive auto-opening OAuth modal loops on barren provider detailed pages (PR #820)
- **Dependency Updates:** Bumped and locked down dependencies for development and production trees including Next.js 16.2.1, Recharts, and TailwindCSS 4.2.2 (PR #826, #827)

---

## [3.3.4] - 2026-03-30

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **A2A Workflows:** Added deterministic FSM orchestrator for multi-step agent workflows.
- **Graceful Degradation:** Added a new multi-layer fallback framework to preserve core functionality during partial system outages.
- **Config Audit:** Added an audit trail with diff detection to track changes and enable configuration rollbacks.
- **Provider Health:** Added provider expiration tracking with proactive UI alerts for expiring API keys.
- **Adaptive Routing:** Added an adaptive volume and complexity detector to override routing strategies dynamically based on load.
- **Provider Diversity:** Implemented provider diversity scoring via Shannon entropy to improve load distribution.
- **Auto-Disable Bounds:** Added an Auto-Disable Banned Accounts setting toggle to the Resilience dashboard.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Codex & Claude Compatibility:** Fixed UI fallbacks, patched Codex non-streaming integration issues, and resolved CLI runtime detection on Windows.
- **Release Automation:** Expanded permissions required for the Electron App build in GitHub Actions.
- **Cloudflare Runtime:** Addressed correct runtime isolation exit codes for Cloudflared tunnel components.

### 🧪 Tests

- **Test Suite Updates:** Expanded test coverage for volume detectors, provider diversity, configuration audit, and FSM.

---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **CI/CD Reliability:** Patched GitHub Actions to stable dependency versions (`actions/checkout@v4`, `actions/upload-artifact@v4`) to mitigate unannounced builder environment deprecations.
- **Image Fallbacks:** Replaced arbitrary fallback chains in `ProviderIcon.tsx` with explicit asset validation to prevent UI loading `<Image>` components for files that don't exist, eliminating `404` errors in dashboard console logs (#745).
- **Admin Updater:** Dynamic source-installation detection for the dashboard Updater. Safely disables the `Update Now` button when OmniRoute is built locally rather than through npm, prompting for `git pull` (#743).
- **Update ERESOLVE Error:** Injected `package.json` overrides for `react`/`react-dom` and enabled `--legacy-peer-deps` within the internal automatic updater scripts to resolve breaking dependency tree conflicts with `@lobehub/ui`.

---

## [3.3.2] - 2026-03-29

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Cloudflare Tunnels:** Cloudflare Quick Tunnel integration with dashboard controls (PR #772).
- **Diagnostics:** Semantic cache bypass for combo live tests (PR #773).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Streaming Stability:** Apply `FETCH_TIMEOUT_MS` to streaming requests' initial `fetch()` call to prevent 300s Node.js TCP timeout causing silent task failures (#769).
- **i18n:** Add missing `windsurf` and `copilot` entries to `toolDescriptions` across all 33 locale files (#748).
- **GLM Coding Audit:** Complete provider audit fixing ReDoS vulnerabilities, context window sizing (128k/16k), and model registry syncing (PR #778).

---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **OpenAI Codex:** Fallback processing fix for `type: "text"` elements carrying null or empty datasets that caused 400 rejection (#742).
- **Opencode:** Update schema alignment to singular `provider` to match official spec (#774).
- **Gemini CLI:** Inject missing end-user quota headers preventing 403 authorization lockouts (#775).
- **DB Recovery:** Refactor multipart payload imports into raw binary buffered arrays to bypass reverse proxy max body limits (#770).

---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

- **Release Stabilization** — Finalized v3.2.9 release (combo diagnostics, quality gates, Gemini tool fix) and created missing git tag. Consolidated all staged changes into a single atomic release commit.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Auto-Update Test** — Fixed `buildDockerComposeUpdateScript` test assertion to match unexpanded shell variable references (`$TARGET_TAG`, `${TARGET_TAG#v}`) in the generated deploy script, aligning with the refactored template from v3.2.8.
- **Circuit Breaker Test** — Hardened `combo-circuit-breaker.test.mjs` by injecting `maxRetries: 0` to prevent retry inflation from skewing failure count assertions during breaker state transitions.

---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

- **Combo Diagnostics** — Introduced a live test bypass flag (`forceLiveComboTest`) allowing administrators to execute real upstream health checks that bypass all local circuit-breaker and cooldown state mechanisms, enabling precise diagnostics during rolling outages (PR #759)
- **Quality Gates** — Added automated response quality validation for combos and officially integrated `claude-4.6` model support into the core routing schemas (PR #762)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Tool Definition Validation** — Repaired Gemini API integration by normalizing enum types inside tool definitions, preventing upstream HTTP 400 parameter errors (PR #760)

---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

- **Docker Auto-Update UI** — Integrated a detached background update process for Docker Compose deployments. The Dashboard UI now seamlessly tracks update lifecycle events combining JSON REST responses with SSE streaming progress overlays for robust cross-environment reliability.
- **Cache Analytics** — Repaired zero-metrics visualization mapping by migrating Semantic Cache telemetry logs directly into the centralized tracking SQLite module.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Authentication Logic** — Fixed a bug where saving dashboard settings or adding models failed with a 401 Unauthorized error when `requireLogin` was disabled. API endpoints now correctly evaluate the global authentication toggle. Resolved global redirection by reactivating `src/middleware.ts`.
- **CLI Tool Detection (Windows)** — Prevented fatal initialization exceptions during CLI environment detection by catching `cross-spawn` ENOENT errors correctly. Adds explicit detection paths for `\AppData\Local\droid\droid.exe`.
- **Codex Native Passthrough** — Normalized model translation parameters preventing context poisoning in proxy pass-through mode, enforcing generic `store: false` constraints explicitly for all Codex-originated requests.
- **SSE Token Reporting** — Normalized provider tool-call chunk `finish_reason` detection, fixing 0% Usage analytics for stream-only responses missing strict `<DONE>` indicators.
- **DeepSeek <think> Tags** — Implemented an explicit `<think>` extraction mapping inside `responsesHandler.ts`, ensuring DeepSeek reasoning streams map equivalently to native Anthropic `<thinking>` structures.

---

## [3.2.7] - 2026-03-29

### Fixed

- **Seamless UI Updates**: The "Update Now" feature on the Dashboard now provides live, transparent feedback using Server-Sent Events (SSE). It performs package installation, native module rebuilds (better-sqlite3), and PM2 restarts reliably while showing real-time loaders instead of silently hanging.

---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

- **API Key Reveal (#740)** — Added a scoped API key copy flow in the Api Manager, protected by the `ALLOW_API_KEY_REVEAL` environment variable.
- **Sidebar Visibility Controls (#739)** — Admins can now hide any sidebar navigation link via the Appearance settings to reduce visual clutter.
- **Strict Combo Testing (#735)** — Hardened the combo health check endpoint to require live text responses from models instead of just soft reachability signals.
- **Streamed Detailed Logs (#734)** — Switched detailed request logging for SSE streams to reconstruct the final payload, saving immense amounts of SQLite database size and significantly cleaning up the UI.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **OpenCode Go MiniMax Auth (#733)** — Corrected the authentication header logic for `minimax` models on OpenCode Go to use `x-api-key` instead of standard bearer tokens across the `/messages` protocol.

---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

- **Void Linux Deployment Support (#732)** — Integrated `xbps-src` packaging template and instructions to natively compile and install OmniRoute with `better-sqlite3` bindings via cross-compilation target.

## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

- **Qoder AI Migration (#660)** — Completely migrated the legacy `iFlow` core provider onto `Qoder AI` maintaining stable API routing capabilities.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Gemini Tools HTTP 400 Payload Invalid Argument (#731)** — Prevented `thoughtSignature` array injections inside standard Gemini `functionCall` sequences blocking agentic routing flows.

---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

- **Provider Limits Quota UI (#728)** — Normalized quota limit logic and data labeling inside the Limits interface.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Core Routing Schemas & Leaks** — Expanded `comboStrategySchema` to natively support `fill-first` and `p2c` strategies to unblock complex combo editing natively.
- **Thinking Tags Extraction (CLI)** — Restructured CLI token responses sanitizer RegEx capturing model reasoning structures inside streams avoiding broken `<thinking>` extractions breaking response text output format.
- **Strict Format Enforcements** — Hardened pipeline sanitization execution making it universally apply to translation mode targets.

---

## [3.2.2] — 2026-03-29

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Four-Stage Request Log Pipeline (#705)** — Refactored log persistence to save comprehensive payloads at four distinct pipeline stages: Client Request, Translated Provider Request, Provider Response, and Translated Client Response. Introduced `streamPayloadCollector` for robust SSE stream truncation and payload serialization.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Mobile UI Fixes (#659)** — Prevented table components on the dashboard from breaking the layout on narrow viewports by adding proper horizontal scrolling and overflow containment to `DashboardLayout`.
- **Claude Prompt Cache Fixes (#708)** — Ensured `cache_control` blocks in Claude-to-Claude fallback loops are faithfully preserved and passed safely back to Anthropic models.
- **Gemini Tool Definitions (#725)** — Fixed schema translation errors when declaring simple `object` parameter types for Gemini function calling.

## [3.2.1] — 2026-03-29

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Global Fallback Provider (#689)** — When all combo models are exhausted (502/503), OmniRoute now attempts a configurable global fallback model before returning the error. Set `globalFallbackModel` in settings to enable.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #721** — Fixed context pinning bypass during tool-call responses. Non-streaming tagging used wrong JSON path (`json.messages` → `json.choices[0].message`). Streaming injection now triggers on `finish_reason` chunks for tool-call-only streams. `injectModelTag()` now appends synthetic pin messages for non-string content.
- **Fix #709** — Confirmed already fixed (v3.1.9) — `system-info.mjs` creates directories recursively. Closed.
- **Fix #707** — Confirmed already fixed (v3.1.9) — empty tool name sanitization in `chatCore.ts`. Closed.

### 🧪 Tests

- Added 6 unit tests for context pinning with tool-call responses (null content, array content, roundtrip, re-injection)

## [3.2.0] — 2026-03-28

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Cache Management UI** — Added a dedicated semantic caching dashboard at \`/dashboard/cache\` with targeted API invalidation and 31-language i18n support (PR #701 by @oyi77)
- **GLM Quota Tracking** — Added real-time usage and session quota tracking for the GLM Coding (Z.AI) provider (PR #698 by @christopher-s)
- **Detailed Log Payloads** — Wired full four-stage pipeline payload capturing (original, translated, provider-response, streamed-deltas) directly into the UI (PR #705 by @rdself)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #708** — Prevented token bleeding for Claude Code users routing through OmniRoute by correctly preserving native \`cache_control\` headers during Claude-to-Claude passthrough (PR #708 by @tombii)
- **Fix #719** — Setup internal auth boundaries for \`ModelSyncScheduler\` to prevent unauthenticated daemon failures on startup (PR #719 by @rdself)
- **Fix #718** — Rebuilt badge rendering in Provider Limits UI preventing bad quota boundaries overlap (PR #718 by @rdself)
- **Fix #704** — Fixed Combo Fallbacks breaking on HTTP 400 content-policy errors preventing model-rotation dead-routing (PR #704 by @rdself)

### 🔒 Security & Dependencies

- Bumped \`path-to-regexp\` to \`8.4.0\` resolving dependabot vulnerabilities (PR #715)

## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #706** — Fixed icon fallback rendering caused by Tailwind V4 `font-sans` override by applying `!important` to `.material-symbols-outlined`.
- **Fix #703** — Fixed GitHub Copilot broken streams by enabling `responses` to `openai` format translation for any custom models leveraging `apiFormat: "responses"`.
- **Fix #702** — Replaced flat-rate usage tracking with accurate DB pricing calculations for both streaming and non-streaming responses.
- **Fix #716** — Cleaned up Claude tool-call translation state, correctly parsing streaming arguments and preventing OpenAI `tool_calls` chunks from repeating the `id` field.

## [3.1.9] — 2026-03-28

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Schema Coercion** — Auto-coerce string-encoded numeric JSON Schema constraints (e.g. `"minimum": "1"`) to proper types, preventing 400 errors from Cursor, Cline, and other clients sending malformed tool schemas.
- **Tool Description Sanitization** — Ensure tool descriptions are always strings; converts `null`, `undefined`, or numeric descriptions to empty strings before sending to providers.
- **Clear All Models Button** — Added i18n translations for the "Clear All Models" provider action across all 30 languages.
- **Codex Auth Export** — Added Codex `auth.json` export and apply-local buttons for seamless CLI integration.
- **Windsurf BYOK Notes** — Added official limitation warnings to the Windsurf CLI tool card documenting BYOK constraints.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #709** — `system-info.mjs` no longer crashes when the output directory doesn't exist (added `mkdirSync` with recursive flag).
- **Fix #710** — A2A `TaskManager` singleton now uses `globalThis` to prevent state leakage across Next.js API route recompilations in dev mode. E2E test suite updated to handle 401 gracefully.
- **Fix #711** — Added provider-specific `max_tokens` cap enforcement for upstream requests.
- **Fix #605 / #592** — Strip `proxy_` prefix from tool names in non-streaming Claude responses; fixed LongCat validation URL.
- **Call Logs Max Cap** — Upgraded `getMaxCallLogs()` with caching layer, env var support (`CALL_LOGS_MAX`), and DB settings integration.

### 🧪 Tests

- Test suite expanded from 964 → 1027 tests (63 new tests)
- Added `schema-coercion.test.mjs` — 9 tests for numeric field coercion and tool description sanitization
- Added `t40-opencode-cli-tools-integration.test.mjs` — OpenCode/Windsurf CLI integration tests
- Enhanced feature-tests branch with comprehensive coverage tooling

### 📁 New Files

| File                                                     | Purpose                                                     |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schema coercion and tool description sanitization utilities |
| `tests/unit/schema-coercion.test.mjs`                    | Unit tests for schema coercion                              |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI tool integration tests                                  |
| `COVERAGE_PLAN.md`                                       | Test coverage planning document                             |

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Claude Prompt Caching Passthrough** — Fixed cache_control markers being stripped in Claude passthrough mode (Claude → OmniRoute → Claude), which caused Claude Code users to deplete their Anthropic API quota 5-10x faster than direct connections. OmniRoute now preserves client's cache_control markers when sourceFormat and targetFormat are both Claude, ensuring prompt caching works correctly and dramatically reducing token consumption.

## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Platform Core:** Implemented global state handling for Hidden Models & Combos preventing them from cluttering the catalog or leaking into connected MCP agents (#681).
- **Stability:** Patched streaming crashes related to the native Antigravity provider integration failing due to unhandled undefined state arrays (#684).
- **Localization Sync:** Deployed a fully overhauled `i18n` synchronizer detecting missing nested JSON properties and retro-fitting 30 locales sequentially (#685).## [3.1.7] - 2026-03-27

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Streaming Stability:** Fixed `hasValuableContent` returning `undefined` for empty chunks in SSE streams (#676).
- **Tool Calling:** Fixed an issue in `sseParser.ts` where non-streaming Claude responses with multiple tool calls dropped the `id` of subsequent tool calls due to incorrect index-based deduplication (#671).

---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Claude Native Tool Name Restoration** — Tool names like `TodoWrite` are no longer prefixed with `proxy_` in Claude passthrough responses (both streaming and non-streaming). Includes unit test coverage (PR #663 by @coobabm)
- **Clear All Models Alias Cleanup** — "Clear All Models" button now also removes associated model aliases, preventing ghost models in the UI (PR #664 by @rdself)

---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Backoff Auto-Decay** — Rate-limited accounts now auto-recover when their cooldown window expires, fixing a deadlock where high `backoffLevel` permanently deprioritized accounts (PR #657 by @brendandebeasi)

### 🌍 i18n

- **Chinese translation overhaul** — Comprehensive rewrite of `zh-CN.json` with improved accuracy (PR #658 by @only4copilot)

---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Streaming Override Fix** — Explicit `stream: true` in request body now takes priority over `Accept: application/json` header. Clients sending both will correctly receive SSE streaming responses (#656)

### 🌍 i18n

- **Czech string improvements** — Refined terminology across `cs.json` (PR #655 by @zen0bit)

---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

- **~70 missing translation keys** added to `en.json` and 12 languages (PR #652 by @zen0bit)
- **Czech documentation updated** — CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT guides (PR #652)
- **Translation validation scripts** — `check_translations.py` and `validate_translation.py` for CI/QA (PR #651 by @zen0bit)

---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Critical: Tool Calling Regression** — Fixed `proxy_Bash` errors by disabling the `proxy_` tool name prefix in the Claude passthrough path. Tools like `Bash`, `Read`, `Write` were being renamed to `proxy_Bash`, `proxy_Read`, etc., causing Claude to reject them (#618)
- **Kiro Account Ban Documentation** — Documented as upstream AWS anti-fraud false positive, not an OmniRoute issue (#649)

### 🧪 Tests

- **936 tests, 0 failures**

---

## [3.1.1] — 2026-03-26

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Vision Capability Metadata**: Added `capabilities.vision`, `input_modalities`, and `output_modalities` to `/v1/models` entries for vision-capable models (PR #646)
- **Gemini 3.1 Models**: Added `gemini-3.1-pro-preview` and `gemini-3.1-flash-lite-preview` to the Antigravity provider (#645)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Ollama Cloud 401 Error**: Fixed incorrect API base URL — changed from `api.ollama.com` to official `ollama.com/v1/chat/completions` (#643)
- **Expired Token Retry**: Added bounded retry with exponential backoff (5→10→20 min) for expired OAuth connections instead of permanently skipping them (PR #647)

### 🧪 Tests

- **936 tests, 0 failures**

---

## [3.1.0] — 2026-03-26

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **GitHub Issue Templates**: Added standardized bug report, feature request, and config/proxy issue templates (#641)
- **Clear All Models**: Added a "Clear All Models" button to the provider detail page with i18n support in 29 languages (#634)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Locale Conflict (`in.json`)**: Renamed the Hindi locale file from `in.json` (Indonesian ISO code) to `hi.json` to fix translation conflicts in Weblate (#642)
- **Codex Empty Tool Names**: Moved tool name sanitization before the native Codex passthrough, fixing 400 errors from upstream providers when tools had empty names (#637)
- **Streaming Newline Artifacts**: Added `collapseExcessiveNewlines` to the response sanitizer, collapsing runs of 3+ consecutive newlines from thinking models into a standard double newline (#638)
- **Claude Reasoning Effort**: Converted OpenAI `reasoning_effort` param to Claude's native `thinking` budget block across all request paths, including automatic `max_tokens` adjustment (#627)
- **Qwen Token Refresh**: Implemented proactive pre-expiry OAuth token refreshes (5-minute buffer) to prevent requests from failing when using short-lived tokens (#631)

### 🧪 Tests

- **936 tests, 0 failures** (+10 tests since 3.0.9)

---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **NaN tokens in Claude Code / client responses (#617):**
  - `sanitizeUsage()` now cross-maps `input_tokens`→`prompt_tokens` and `output_tokens`→`completion_tokens` before the whitelist filter, fixing responses showing NaN/0 token counts when providers return Claude-style usage field names

### 🔒 Security

- Updated `yaml` package to fix stack overflow vulnerability (GHSA-48c2-rrv3-qjmp)

### 📋 Issue Triage

- Closed #613 (Codestral — resolved with Custom Provider workaround)
- Commented on #615 (OpenCode dual-endpoint — workaround provided, tracked as feature request)
- Commented on #618 (tool call visibility — requesting v3.0.9 test)
- Commented on #627 (effort level — already supported)

---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Translation Failures for OpenAI-format Providers in Claude CLI (#632):**
  - Handle `reasoning_details[]` array format from StepFun/OpenRouter — converts to `reasoning_content`
  - Handle `reasoning` field alias from some providers → normalized to `reasoning_content`
  - Cross-map usage field names: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` in `filterUsageForFormat`
  - Fix `extractUsage` to accept both `input_tokens`/`output_tokens` and `prompt_tokens`/`completion_tokens` as valid usage fields
  - Applied to both streaming (`sanitizeStreamingChunk`, `openai-to-claude.ts` translator) and non-streaming (`sanitizeMessage`) paths

---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Antigravity Token Refresh:** Fixed `client_secret is missing` error for npm-installed users — the `clientSecretDefault` was empty in providerRegistry, causing Google to reject token refresh requests (#588)
- **OpenCode Zen Models:** Added `modelsUrl` to the OpenCode Zen registry entry so "Import from /models" works correctly (#612)
- **Streaming Artifacts:** Fixed excessive newlines left in responses after thinking-tag signature stripping (#626)
- **Proxy Fallback:** Added automatic retry without proxy when SOCKS5 relay fails
- **Proxy Test:** Test endpoint now resolves real credentials from DB via proxyId

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Playground Account/Key Selector:** Persistent, always-visible dropdown to select specific provider accounts/keys for testing — fetches all connections at startup and filters by selected provider
- **CLI Tools Dynamic Models:** Model selection now dynamically fetches from `/v1/models` API — providers like Kiro now show their full model catalog
- **Antigravity Model List:** Updated with Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; enabled `passthroughModels` for dynamic model access (#628)

### 🔧 Maintenance

- Merged PR #625 — Provider Limits light mode background fix

---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Limits/Proxy:** Fixed Codex limit fetching for accounts behind SOCKS5 proxies — token refresh now runs inside proxy context
- **CI:** Fixed integration test `v1/models` assertion failure in CI environments without provider connections
- **Settings:** Proxy test button now shows success/failure results immediately (previously hidden behind health data)

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Playground:** Added Account selector dropdown — test specific connections individually when a provider has multiple accounts

### 🔧 Maintenance

- Merged PR #623 — LongCat API base URL path correction

---

## [3.0.5] — 2026-03-25

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Limits UI:** Added tag grouping feature to the connections dashboard to improve visual organization for accounts with custom tags.

---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Streaming:** Fixed `TextDecoder` state corruption inside combo `sanitize` TransformStream which caused SSE garbled output matching multibyte characters (PR #614)
- **Providers UI:** Safely render HTML tags inside provider connection error tooltips using `dangerouslySetInnerHTML`
- **Proxy Settings:** Added missing `username` and `password` payload body properties allowing authenticated proxies to be successfully verified from the Dashboard.
- **Provider API:** Bound soft exception returns to `getCodexUsage` preventing API HTTP 500 failures when token fetch fails

---

## [3.0.3] — 2026-03-25

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Auto-Sync Models:** Added a UI toggle and `sync-models` endpoint to automatically synchronise model lists per provider using a scheduled interval scheduler (PR #597)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Timeouts:** Elevated default proxies `FETCH_TIMEOUT_MS` and `STREAM_IDLE_TIMEOUT_MS` to 10 minutes to properly support deep reasoning models (like o1) without aborting requests (Fixes #609)
- **CLI Tool Detection:** Improved cross-platform detection handling NVM paths, Windows `PATHEXT` (preventing `.cmd` wrappers issue), and custom NPM prefixes (PR #598)
- **Streaming Logs:** Implemented `tool_calls` delta accumulation in streaming response logs so function calls are tracked and persisted accurately in DB (PR #603)
- **Model Catalog:** Removed auth exemption, properly hiding `comfyui` and `sdwebui` models when no provider is explicitly configured (PR #599)

### 🌐 Translations

- **cs:** Improved Czech translation strings across the app (PR #601)

## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Added a Tag/Group field to `EditConnectionModal` (stored in `providerSpecificData.tag`) without requiring DB schema migrations.
- Connections in the provider view now dynamically group by tag with visual dividers.
- Untagged connections appear first without a header, followed by tagged groups in alphabetical order.
- The tag grouping automatically applies to the Codex/Copilot/Antigravity Limits section since toggles exist inside connection rows.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

#### fix(ui): Proxy Management UI Stabilization

- **Missing badges on connection cards:** Fixed by using `resolveProxyForConnection()` rather than static mapping.
- **Test Connection disabled in saved mode:** Enabled the Test button by resolving proxy config from the saved list.
- **Config Modal freezing:** Added `onClose()` calls after save/clear to prevent the UI from freezing.
- **Double usage counting:** `ProxyRegistryManager` now loads usage eagerly on mount with deduplication by `scope` + `scopeId`. Usage counts were replaced with a Test button displaying IP/latency inline.

#### fix(translator): `function_call` prefix stripping

- Repaired an incomplete fix from PR #607 where only `tool_use` blocks stripped Claude's `proxy_` tool prefix. Now, clients using the OpenAI Responses API format will also correctly receive tool tools without the `proxy_` prefix.

---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Three critical regressions reported by users after the v3.0.0 launch have been resolved.

#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

The `proxy_` prefix added by Claude OAuth was only stripped from **streaming** responses. In **non-streaming** mode, `translateNonStreamingResponse` had no access to the `toolNameMap`, causing clients to receive mangled tool names like `proxy_read_file` instead of `read_file`.

**Fix:** Added optional `toolNameMap` parameter to `translateNonStreamingResponse` and applied prefix stripping in the Claude `tool_use` block handler. `chatCore.ts` now passes the map through.

#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI does not expose `GET /v1/models`. The generic `validateOpenAICompatibleProvider` validator fell through to a chat-completions fallback only if `validationModelId` was set, which LongCat doesn't configure. This caused provider validation to fail with a misleading error on add/save.

**Fix:** Added `longcat` to the specialty validators map, probing `/chat/completions` directly and treating any non-auth response as a pass.

#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP tools (e.g. `pencil`, `computer_use`) forward tool definitions with `{type:"object"}` but without a `properties` field. Anthropic's API rejects these with: `object schema missing properties`.

**Fix:** In `openai-to-claude.ts`, inject `properties: {}` as a safe default when `type` is `"object"` and `properties` is absent.

---

### 🔀 Community PRs Merged (2)

| PR       | Author  | Summary                                                                    |
| -------- | ------- | -------------------------------------------------------------------------- |
| **#589** | @flobo3 | docs(i18n): fix Russian translation for Playground and Testbed             |
| **#591** | @rdself | fix(ui): improve Provider Limits light mode contrast and plan tier display |

---

### ✅ Issues Resolved

`#592` `#595` `#605`

---

### 🧪 Tests

- **926 tests, 0 failures** (unchanged from v3.0.0)

---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **The biggest release ever.** From 36 providers in v2.9.5 to **67+ providers** in v3.0.0 — with MCP Server, A2A Protocol, auto-combo engine, Provider Icons, Registered Keys API, 926 tests, and contributions from **12 community members** across **10 merged PRs**.
>
> Consolidated from v3.0.0-rc.1 through rc.17 (17 release candidates over 3 days of intense development).

---

### 🆕 New Providers (+31 since v2.9.5)

| Provider                      | Alias           | Tier        | Notes                                                                       |
| ----------------------------- | --------------- | ----------- | --------------------------------------------------------------------------- |
| **OpenCode Zen**              | `opencode-zen`  | Free        | 3 models via `opencode.ai/zen/v1` (PR #530 by @kang-heewon)                 |
| **OpenCode Go**               | `opencode-go`   | Paid        | 4 models via `opencode.ai/zen/go/v1` (PR #530 by @kang-heewon)              |
| **LongCat AI**                | `lc`            | Free        | 50M tokens/day (Flash-Lite) + 500K/day (Chat/Thinking) during public beta   |
| **Pollinations AI**           | `pol`           | Free        | No API key needed — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s) |
| **Cloudflare Workers AI**     | `cf`            | Free        | 10K Neurons/day — ~150 LLM responses or 500s Whisper audio, edge inference  |
| **Scaleway AI**               | `scw`           | Free        | 1M free tokens for new accounts — EU/GDPR compliant (Paris)                 |
| **AI/ML API**                 | `aiml`          | Free        | $0.025/day free credits — 200+ models via single endpoint                   |
| **Puter AI**                  | `pu`            | Free        | 500+ models (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)       |
| **Alibaba Cloud (DashScope)** | `ali`           | Paid        | International + China endpoints via `alicode`/`alicode-intl`                |
| **Alibaba Coding Plan**       | `bcp`           | Paid        | Alibaba Model Studio with Anthropic-compatible API                          |
| **Kimi Coding (API Key)**     | `kmca`          | Paid        | Dedicated API-key-based Kimi access (separate from OAuth)                   |
| **MiniMax Coding**            | `minimax`       | Paid        | International endpoint                                                      |
| **MiniMax (China)**           | `minimax-cn`    | Paid        | China-specific endpoint                                                     |
| **Z.AI (GLM-5)**              | `zai`           | Paid        | Zhipu AI next-gen GLM models                                                |
| **Vertex AI**                 | `vertex`        | Paid        | Google Cloud — Service Account JSON or OAuth access_token                   |
| **Ollama Cloud**              | `ollamacloud`   | Paid        | Ollama's hosted API service                                                 |
| **Synthetic**                 | `synthetic`     | Paid        | Passthrough models gateway                                                  |
| **Kilo Gateway**              | `kg`            | Paid        | Passthrough models gateway                                                  |
| **Perplexity Search**         | `pplx-search`   | Paid        | Dedicated search-grounded endpoint                                          |
| **Serper Search**             | `serper-search` | Paid        | Web search API integration                                                  |
| **Brave Search**              | `brave-search`  | Paid        | Brave Search API integration                                                |
| **Exa Search**                | `exa-search`    | Paid        | Neural search API integration                                               |
| **Tavily Search**             | `tavily-search` | Paid        | AI search API integration                                                   |
| **NanoBanana**                | `nb`            | Paid        | Image generation API                                                        |
| **ElevenLabs**                | `el`            | Paid        | Text-to-speech voice synthesis                                              |
| **Cartesia**                  | `cartesia`      | Paid        | Ultra-fast TTS voice synthesis                                              |
| **PlayHT**                    | `playht`        | Paid        | Voice cloning and TTS                                                       |
| **Inworld**                   | `inworld`       | Paid        | AI character voice chat                                                     |
| **SD WebUI**                  | `sdwebui`       | Self-hosted | Stable Diffusion local image generation                                     |
| **ComfyUI**                   | `comfyui`       | Self-hosted | ComfyUI local workflow node-based generation                                |
| **GLM Coding**                | `glm`           | Paid        | BigModel/Zhipu coding-specific endpoint                                     |

**Total: 67+ providers** (4 Free, 8 OAuth, 55 API Key) + unlimited OpenAI/Anthropic-Compatible custom providers.

---

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Auto-generate and issue OmniRoute API keys programmatically with per-provider and per-account quota enforcement.

| Endpoint                        | Method       | Description                                      |
| ------------------------------- | ------------ | ------------------------------------------------ |
| `/api/v1/registered-keys`       | `POST`       | Issue a new key — raw key returned **once only** |
| `/api/v1/registered-keys`       | `GET`        | List registered keys (masked)                    |
| `/api/v1/registered-keys/{id}`  | `GET/DELETE` | Get metadata / Revoke                            |
| `/api/v1/quotas/check`          | `GET`        | Pre-validate quota before issuing                |
| `/api/v1/providers/{id}/limits` | `GET/PUT`    | Configure per-provider issuance limits           |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`    | Configure per-account issuance limits            |
| `/api/v1/issues/report`         | `POST`       | Report quota events to GitHub Issues             |

**Security:** Keys stored as SHA-256 hashes. Raw key shown once on creation, never retrievable again.

#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ provider logos using `@lobehub/icons` React components (SVG). Fallback chain: **Lobehub SVG → existing PNG → generic icon**. Applied across Dashboard, Providers, and Agents pages with standardized `ProviderIcon` component.

#### 🔄 Model Auto-Sync Scheduler (#488)

Auto-refreshes model lists for connected providers every **24 hours**. Runs on server startup. Configurable via `MODEL_SYNC_INTERVAL_HOURS`.

#### 🔀 Per-Model Combo Routing (#563)

Map model name patterns (glob) to specific combos for automatic routing:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- New `model_combo_mappings` table with glob-to-regex matching
- Dashboard UI section: "Model Routing Rules" with inline add/edit/toggle/delete

#### 🧭 API Endpoints Dashboard

Interactive catalog, webhooks management, OpenAPI viewer — all in one tabbed page at `/dashboard/endpoint`.

#### 🔍 Web Search Providers

5 new search provider integrations: **Perplexity Search**, **Serper**, **Brave Search**, **Exa**, **Tavily** — enabling grounded AI responses with real-time web data.

#### 📊 Search Analytics

New tab in `/dashboard/analytics` — provider breakdown, cache hit rate, cost tracking. API: `GET /api/v1/search/analytics`.

#### 🛡️ Per-API-Key Rate Limits (#452)

`max_requests_per_day` and `max_requests_per_minute` columns with in-memory sliding-window enforcement returning HTTP 429.

#### 🎵 Media Playground

Full media generation playground at `/dashboard/media`: Image Generation, Video, Music, Audio Transcription (2GB upload limit), and Text-to-Speech.

---

### 🔒 Security & CI/CD

- **CodeQL remediation** — Fixed 10+ alerts: 6 polynomial-redos, 1 insecure-randomness (`Math.random()` → `crypto.randomUUID()`), 1 shell-command-injection
- **Route validation** — Zod schemas + `validateBody()` on **176/176 API routes** — CI enforced
- **CVE fix** — dompurify XSS vulnerability (GHSA-v2wj-7wpq-c8vv) resolved via npm overrides
- **Flatted** — Bumped 3.3.3 → 3.4.2 (CWE-1321 prototype pollution)
- **Docker** — Upgraded `docker/setup-buildx-action` v3 → v4

---

### 🐛 Bug Fixes (40+)

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

#### OAuth & Auth

- **#537** — Gemini CLI OAuth: clear actionable error when `GEMINI_OAUTH_CLIENT_SECRET` missing in Docker
- **#549** — CLI settings routes now resolve real API key from `keyId` (not masked strings)
- **#574** — Login no longer freezes after skipping wizard password setup
- **#506** — Cross-platform `machineId` rewritten (Windows REG.exe → macOS ioreg → Linux → hostname fallback)

#### Providers & Routing

- **#536** — LongCat AI: fixed `baseUrl` and `authHeader`
- **#535** — Pinned model override: `body.model` correctly set to `pinnedModel`
- **#570** — Unprefixed Claude models now resolve to Anthropic provider
- **#585** — `<omniModel>` internal tags no longer leak to clients in SSE streaming
- **#493** — Custom provider model naming no longer mangled by prefix stripping
- **#490** — Streaming + context cache protection via `TransformStream` injection
- **#511** — `<omniModel>` tag injected into first content chunk (not after `[DONE]`)

#### CLI & Tools

- **#527** — Claude Code + Codex loop: `tool_result` blocks now converted to text
- **#524** — OpenCode config saved correctly (XDG_CONFIG_HOME, TOML format)
- **#522** — API Manager: removed misleading "Copy masked key" button
- **#546** — `--version` returning `unknown` on Windows (PR by @k0valik)
- **#544** — Secure CLI tool detection via known installation paths (PR by @k0valik)
- **#510** — Windows MSYS2/Git-Bash paths normalized automatically
- **#492** — CLI detects `mise`/`nvm`-managed Node when `app/server.js` missing

#### Streaming & SSE

- **PR #587** — Revert `resolveDataDir` import in responsesTransformer for Cloudflare Workers compat (@k0valik)
- **PR #495** — Bottleneck 429 infinite wait: drop waiting jobs on rate limit (@xandr0s)
- **#483** — Stop trailing `data: null` after `[DONE]` signal
- **#473** — Zombie SSE streams: timeout reduced 300s → 120s for faster fallback

#### Media & Transcription

- **Transcription** — Deepgram `video/mp4` → `audio/mp4` MIME mapping, auto language detection, punctuation
- **TTS** — `[object Object]` error display fixed for ElevenLabs-style nested errors
- **Upload limits** — Media transcription increased to 2GB (nginx `client_max_body_size 2g` + `maxDuration=300`)

---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

- **T01** — `requested_model` column in call logs (migration 009)
- **T02** — Strip empty text blocks from nested `tool_result.content`
- **T03** — Parse `x-codex-5h-*` / `x-codex-7d-*` quota headers
- **T04** — `X-Session-Id` header for external sticky routing
- **T05** — Rate-limit DB persistence with dedicated API
- **T06** — Account deactivated → permanent block (1-year cooldown)
- **T07** — X-Forwarded-For IP validation (`extractClientIp()`)
- **T08** — Per-API-key session limits with sliding-window enforcement
- **T09** — Codex vs Spark rate-limit scopes (separate pools)
- **T10** — Credits exhausted → distinct 1h cooldown fallback
- **T11** — `max` reasoning effort → 131072 budget tokens
- **T12** — MiniMax M2.7 pricing entries
- **T13** — Stale quota display fix (reset window awareness)
- **T14** — Proxy fast-fail TCP check (≤2s, cached 30s)
- **T15** — Array content normalization for Anthropic
- **T23** — Intelligent quota reset fallback (header extraction)
- **T24** — `503` cooldown + `406` mapping
- **T25** — Provider validation fallback
- **T29** — Vertex AI Service Account JWT auth
- **T33** — Thinking level to budget conversion
- **T36** — `403` vs `429` error classification
- **T38** — Centralized model specifications (`modelSpecs.ts`)
- **T39** — Endpoint fallback for `fetchAvailableModels`
- **T41** — Background task auto-redirect to flash models
- **T42** — Image generation aspect ratio mapping

#### Other Improvements

- **Per-model upstream custom headers** — via configuration UI (PR #575 by @zhangqiang8vip)
- **Model context length** — configurable in model metadata (PR #578 by @hijak)
- **Model prefix stripping** — option to remove provider prefix from model names (PR #582 by @jay77721)
- **Gemini CLI deprecation** — marked deprecated with Google OAuth restriction warning
- **YAML parser** — replaced custom parser with `js-yaml` for correct OpenAPI spec parsing
- **ZWS v5** — HMR leak fix (485 DB connections → 1, memory 2.4GB → 195MB)
- **Log export** — New JSON export button on dashboard with time range dropdown
- **Update notification banner** — dashboard homepage shows when new versions are available

---

### 🌐 i18n & Documentation

- **30 languages** at 100% parity — 2,788 missing keys synced
- **Czech** — Full translation: 22 docs, 2,606 UI strings (PR by @zen0bit)
- **Chinese (zh-CN)** — Complete retranslation (PR by @only4copilot)
- **VM Deployment Guide** — Translated to English as source document
- **API Reference** — Added `/v1/embeddings` and `/v1/audio/speech` endpoints
- **Provider count** — Updated from 36+/40+/44+ to **67+** across README and all 30 i18n READMEs

---

### 🔀 Community PRs Merged (10)

| PR       | Author          | Summary                                                              |
| -------- | --------------- | -------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): revert resolveDataDir import for Cloudflare Workers compat |
| **#582** | @jay77721       | feat(proxy): model name prefix stripping option                      |
| **#581** | @jay77721       | fix(npm): link electron-release to npm-publish workflow              |
| **#578** | @hijak          | feat: configurable context length in model metadata                  |
| **#575** | @zhangqiang8vip | feat: per-model upstream headers, compat PATCH, chat alignment       |
| **#562** | @coobabm        | fix: MCP session management, Claude passthrough, detectFormat        |
| **#561** | @zen0bit        | fix(i18n): Czech translation corrections                             |
| **#555** | @k0valik        | fix(sse): centralized `resolveDataDir()` for path resolution         |
| **#546** | @k0valik        | fix(cli): `--version` returning `unknown` on Windows                 |
| **#544** | @k0valik        | fix(cli): secure CLI tool detection via installation paths           |
| **#542** | @rdself         | fix(ui): light mode contrast CSS theme variables                     |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go providers with `OpencodeExecutor`            |
| **#512** | @zhangqiang8vip | feat: per-protocol model compatibility (`compatByProtocol`)          |
| **#497** | @zhangqiang8vip | fix: dev-mode HMR resource leaks (ZWS v5)                            |
| **#495** | @xandr0s        | fix: Bottleneck 429 infinite wait (drop waiting jobs)                |
| **#494** | @zhangqiang8vip | feat: MiniMax developer→system role fix                              |
| **#480** | @prakersh       | fix: stream flush usage extraction                                   |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 and Anthropic pricing entries                    |
| **#475** | @only4copilot   | feat(i18n): improved Chinese translation                             |

**Thank you to all contributors!** 🙏

---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`

---

### 🧪 Tests

- **926 tests, 0 failures** (up from 821 in v2.9.5)
- +105 new tests covering: model-combo mappings, registered keys, OpencodeExecutor, Bailian provider, route validation, error classification, aspect ratio mapping, and more

---

### 📦 Database Migrations

| Migration | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| **008**   | `registered_keys`, `provider_key_limits`, `account_key_limits` tables |
| **009**   | `requested_model` column in `call_logs`                               |
| **010**   | `model_combo_mappings` table for per-model combo routing              |

---

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Breaking changes:** None. All existing configurations, combos, and API keys are preserved.
> Database migrations 008-010 run automatically on startup.

---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

- **CodeQL remediation** — Fixed 10+ alerts:
  - 6 polynomial-redos in `provider.ts` / `chatCore.ts` (replaced `(?:^|/)` alternation patterns with segment-based matching)
  - 1 insecure-randomness in `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
  - 1 shell-command-injection in `prepublish.mjs` (`JSON.stringify()` path escaping)
- **Route validation** — Added Zod schemas + `validateBody()` to 5 routes missing validation:
  - `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
  - CI `check:route-validation:t06` now passes: **176/176 routes validated**

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **#585** — `<omniModel>` internal tags no longer leak to clients in SSE responses. Added outbound sanitization `TransformStream` in `combo.ts`

### ⚙️ Infrastructure

- **Docker** — Upgraded `docker/setup-buildx-action` from v3 → v4 (Node.js 20 deprecation fix)
- **CI cleanup** — Deleted 150+ failed/cancelled workflow runs

### 🧪 Tests

- Test suite: **926 tests, 0 failures** (+3 new)

---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- Increased media transcription limits
- Added Model Context Length to registry metadata
- Added per-model upstream custom headers via configuration UI
- Fixed multiple bugs, Zod valiadation for patches, and resolved various community issues.

## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **#563** — Per-model Combo Routing: map model name patterns (glob) to specific combos for automatic routing
  - New `model_combo_mappings` table (migration 010) with pattern, combo_id, priority, enabled
  - `resolveComboForModel()` DB function with glob-to-regex matching (case-insensitive, `*` and `?` wildcards)
  - `getComboForModel()` in `model.ts`: augments `getCombo()` with model-pattern fallback
  - `chat.ts`: routing decision now checks model-combo mappings before single-model handling
  - API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
  - Dashboard: "Model Routing Rules" section added to Combos page with inline add/edit/toggle/delete
  - Examples: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo

### 🌐 i18n

- **Full i18n Sync**: 2,788 missing keys added across 30 language files — all languages now at 100% parity with `en.json`
- **Agents page i18n**: OpenCode Integration section fully internationalized (title, description, scanning, download labels)
- **6 new keys** added to `agents` namespace for OpenCode section

### 🎨 UI/UX

- **Provider Icons**: 16 missing provider icons added (3 copied, 2 downloaded, 11 SVG created)
- **SVG fallback**: `ProviderIcon` component updated with 4-tier strategy: Lobehub → PNG → SVG → Generic icon
- **Agents fingerprinting**: Synced with CLI tools — added droid, openclaw, copilot, opencode to fingerprint list (14 total)

### 🔒 Security

- **CVE fix**: Resolved dompurify XSS vulnerability (GHSA-v2wj-7wpq-c8vv) via npm overrides forcing `dompurify@^3.3.2`
- `npm audit` now reports **0 vulnerabilities**

### 🧪 Tests

- Test suite: **923 tests, 0 failures** (+15 new model-combo mapping tests)

---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Author   | Summary                                                                                      |
| -------- | -------- | -------------------------------------------------------------------------------------------- |
| **#562** | @coobabm | fix(ux): MCP session management, Claude passthrough normalization, OAuth modal, detectFormat |
| **#561** | @zen0bit | fix(i18n): Czech translation corrections — HTTP method names and documentation updates       |

### 🧪 Tests

- Test suite: **908 tests, 0 failures**

---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

- **config:** resolve real API key from `keyId` in CLI settings routes (`codex-settings`, `droid-settings`, `kilo-settings`) to prevent writing masked strings (#549)

---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Author   | Summary                                                                                                                                                       |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **#546** | @k0valik | fix(cli): `--version` returning `unknown` on Windows — use `JSON.parse(readFileSync)` instead of ESM import                                                   |
| **#555** | @k0valik | fix(sse): centralized `resolveDataDir()` for path resolution in credentials, autoCombo, responses logger, and request logger                                  |
| **#544** | @k0valik | fix(cli): secure CLI tool detection via known installation paths (8 tools) with symlink validation, file-type checks, size bounds, minimal env in healthcheck |
| **#542** | @rdself  | fix(ui): improve light mode contrast — add missing CSS theme variables (`bg-primary`, `bg-subtle`, `text-primary`) and fix dark-only colors in log detail     |

### 🔧 Bug Fixes

- **TDZ fix in `cliRuntime.ts`** — `validateEnvPath` was used before initialization at module startup by `getExpectedParentPaths()`. Reordered declarations to fix `ReferenceError`.
- **Build fixes** — Added `pino` and `pino-pretty` to `serverExternalPackages` to prevent Turbopack from breaking Pino's internal worker loading.

### 🧪 Tests

- Test suite: **905 tests, 0 failures**

---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

- **#509 / #508** — Electron build regression: downgraded Next.js from `16.1.x` to `16.0.10` to eliminate Turbopack module-hashing instability that caused blank screens in the Electron desktop bundle.
- **Unit test fixes** — Corrected two stale test assertions (`nanobanana-image-handler` aspect ratio/resolution, `thinking-budget` Gemini `thinkingConfig` field mapping) that had drifted after recent implementation changes.
- **#541** — Responded to user feedback about installation complexity; no code changes required.

---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **T29** — Vertex AI SA JSON Executor: implemented using the `jose` library to handle JWT/Service Account auth, along with configurable regions in the UI and automatic partner model URL building.
- **T42** — Image generation aspect ratio mapping: created `sizeMapper` logic for generic OpenAI formats (`size`), added native `imagen3` handling, and updated NanoBanana endpoints to utilize mapped aspect ratios automatically.
- **T38** — Centralized model specifications: `modelSpecs.ts` created for limits and parameters per model.

### 🔧 Improvements

- **T40** — OpenCode CLI tools integration: native `opencode-zen` and `opencode-go` integration completed in earlier PR.

---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

- **T24** — `503` cooldown await fix + `406` mapping: mapped `406 Not Acceptable` to `503 Service Unavailable` with proper cooldown intervals.
- **T25** — Provider validation fallback: graceful fallback to standard validation models when a specific `validationModelId` is not present.
- **T36** — `403` vs `429` provider handling refinement: extracted into `errorClassifier.ts` to properly segregate hard permissions failures (`403`) from rate limits (`429`).
- **T39** — Endpoint Fallback for `fetchAvailableModels`: implemented a tri-tier mechanism (`/models` -> `/v1/models` -> local generic catalog) + `list_models_catalog` MCP tool updates to reflect `source` and `warning`.
- **T33** — Thinking level to budget conversion: translates qualitative thinking levels into precise budget allocations.
- **T41** — Background task auto redirect: routes heavy background evaluation tasks to flash/efficient models automatically.
- **T23** — Intelligent quota reset fallback: accurately extracts `x-ratelimit-reset` / `retry-after` header values or maps static cooldowns.

---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Upgrade from v2.9.5:** 16 issues resolved · 2 community PRs merged · 2 new providers · 7 new API endpoints · 3 new features · DB migration 008+009 · 832 tests passing · 15 sub2api gap improvements (T01–T15 complete).

### 🆕 New Providers

| Provider         | Alias          | Tier | Notes                                                          |
| ---------------- | -------------- | ---- | -------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Free | 3 models via `opencode.ai/zen/v1` (PR #530 by @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Paid | 4 models via `opencode.ai/zen/go/v1` (PR #530 by @kang-heewon) |

Both providers use the new `OpencodeExecutor` with multi-format routing (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).

---

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

#### 🔑 Registered Keys Provisioning API (#464)

Auto-generate and issue OmniRoute API keys programmatically with per-provider and per-account quota enforcement.

| Endpoint                              | Method    | Description                                      |
| ------------------------------------- | --------- | ------------------------------------------------ |
| `/api/v1/registered-keys`             | `POST`    | Issue a new key — raw key returned **once only** |
| `/api/v1/registered-keys`             | `GET`     | List registered keys (masked)                    |
| `/api/v1/registered-keys/{id}`        | `GET`     | Get key metadata                                 |
| `/api/v1/registered-keys/{id}`        | `DELETE`  | Revoke a key                                     |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | Revoke (for clients without DELETE support)      |
| `/api/v1/quotas/check`                | `GET`     | Pre-validate quota before issuing                |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | Configure per-provider issuance limits           |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | Configure per-account issuance limits            |
| `/api/v1/issues/report`               | `POST`    | Report quota events to GitHub Issues             |

**DB — Migration 008:** Three new tables: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Security:** Keys stored as SHA-256 hashes. Raw key shown once on creation, never retrievable again.
**Quota types:** `maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` per provider and per account.
**Idempotency:** `idempotency_key` field prevents duplicate issuance. Returns `409 IDEMPOTENCY_CONFLICT` if key was already used.
**Budget per key:** `dailyBudget` / `hourlyBudget` — limits how many requests a key can route per window.
**GitHub reporting:** Optional. Set `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` to auto-create GitHub issues on quota exceeded or issuance failures.

#### 🎨 Provider Icons — @lobehub/icons (#529)

All provider icons in the dashboard now use `@lobehub/icons` React components (130+ providers with SVG).
Fallback chain: **Lobehub SVG → existing `/providers/{id}.png` → generic icon**. Uses a proper React `ErrorBoundary` pattern.

#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute now automatically refreshes model lists for connected providers every **24 hours**.

- Runs on server startup via the existing `/api/sync/initialize` hook
- Configurable via `MODEL_SYNC_INTERVAL_HOURS` environment variable
- Covers 16 major providers
- Records last sync time in the settings database

---

### 🔧 Bug Fixes

#### OAuth & Auth

- **#537 — Gemini CLI OAuth:** Clear actionable error when `GEMINI_OAUTH_CLIENT_SECRET` is missing in Docker/self-hosted deployments. Previously showed cryptic `client_secret is missing` from Google. Now provides specific `docker-compose.yml` and `~/.omniroute/.env` instructions.

#### Providers & Routing

- **#536 — LongCat AI:** Fixed `baseUrl` (`api.longcat.chat/openai`) and `authHeader` (`Authorization: Bearer`).
- **#535 — Pinned model override:** `body.model` is now correctly set to `pinnedModel` when context-cache protection is active.
- **#532 — OpenCode Go key validation:** Now uses the `zen/v1` test endpoint (`testKeyBaseUrl`) — same key works for both tiers.

#### CLI & Tools

- **#527 — Claude Code + Codex loop:** `tool_result` blocks are now converted to text instead of dropped, stopping infinite tool-result loops.
- **#524 — OpenCode config save:** Added `saveOpenCodeConfig()` handler (XDG_CONFIG_HOME aware, writes TOML).
- **#521 — Login stuck:** Login no longer freezes after skipping password setup — redirects correctly to onboarding.
- **#522 — API Manager:** Removed misleading "Copy masked key" button (replaced with a lock icon tooltip).
- **#532 — OpenCode Go config:** Guide settings handler now handles `opencode` toolId.

#### Developer Experience

- **#489 — Antigravity:** Missing `googleProjectId` returns a structured 422 error with reconnect guidance instead of a cryptic crash.
- **#510 — Windows paths:** MSYS2/Git-Bash paths (`/c/Program Files/...`) are now normalized to `C:\Program Files\...` automatically.
- **#492 — CLI startup:** `omniroute` CLI now detects `mise`/`nvm`-managed Node when `app/server.js` is missing and shows targeted fix instructions.

---

### 📖 Documentation Updates

- **#513** — Docker password reset: `INITIAL_PASSWORD` env var workaround documented
- **#520** — pnpm: `pnpm approve-builds better-sqlite3` step documented

---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`

---

### 🔀 Community PRs Merged

| PR       | Author       | Summary                                                                |
| -------- | ------------ | ---------------------------------------------------------------------- |
| **#530** | @kang-heewon | OpenCode Zen + Go providers with `OpencodeExecutor` and improved tests |

---

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

- **T05** — Rate-limit DB persistence: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` in `providers.ts`. The existing `rate_limited_until` column is now exposed as a dedicated API — OAuth token refresh must NOT touch this field to prevent rate-limit loops.
- **T08** — Per-API-key session limit: `max_sessions INTEGER DEFAULT 0` added to `api_keys` via auto-migration. `sessionManager.ts` gains `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()`, and `getActiveSessionCountForKey()`. Callers in `chatCore.js` can enforce the limit and decrement on `req.close`.
- **T09** — Codex vs Spark rate-limit scopes: `getCodexModelScope()` and `getCodexRateLimitKey()` in `codex.ts`. Standard models (`gpt-5.x-codex`, `codex-mini`) get scope `"codex"`; spark models (`codex-spark*`) get scope `"spark"`. Rate-limit keys should be `${accountId}:${scope}` so exhausting one pool doesn't block the other.
- **T13** — Stale quota display fix: `getEffectiveQuotaUsage(used, resetAt)` returns `0` when the reset window has passed; `formatResetCountdown(resetAt)` returns a human-readable countdown string (e.g. `"2h 35m"`). Both exported from `providers.ts` + `localDb.ts` for dashboard consumption.
- **T14** — Proxy fast-fail: new `src/lib/proxyHealth.ts` with `isProxyReachable(proxyUrl, timeoutMs=2000)` (TCP check, ≤2s instead of 30s timeout), `getCachedProxyHealth()`, `invalidateProxyHealth()`, and `getAllProxyHealthStatuses()`. Results cached 30s by default; configurable via `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.

### 🧪 Tests

- Test suite: **832 tests, 0 failures**

---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

- **T01** — `requested_model` column in `call_logs` (migration 009): track which model the client originally requested vs the actual routed model. Enables fallback rate analytics.
- **T02** — Strip empty text blocks from nested `tool_result.content`: prevents Anthropic 400 errors (`text content blocks must be non-empty`) when Claude Code chains tool results.
- **T03** — Parse `x-codex-5h-*` / `x-codex-7d-*` headers: `parseCodexQuotaHeaders()` + `getCodexResetTime()` extract Codex quota windows for precise cooldown scheduling instead of generic 5-min fallback.
- **T04** — `X-Session-Id` header for external sticky routing: `extractExternalSessionId()` in `sessionManager.ts` reads `x-session-id` / `x-omniroute-session` headers with `ext:` prefix to avoid collision with internal SHA-256 session IDs. Nginx-compatible (hyphenated header).
- **T06** — Account deactivated → permanent block: `isAccountDeactivated()` in `accountFallback.ts` detects 401 deactivation signals and applies a 1-year cooldown to prevent retrying permanently dead accounts.
- **T07** — X-Forwarded-For IP validation: new `src/lib/ipUtils.ts` with `extractClientIp()` and `getClientIpFromRequest()` — skips `unknown`/non-IP entries in `X-Forwarded-For` chains (Nginx/proxy-forwarded requests).
- **T10** — Credits exhausted → distinct fallback: `isCreditsExhausted()` in `accountFallback.ts` returns 1h cooldown with `creditsExhausted` flag, distinct from generic 429 rate limiting.
- **T11** — `max` reasoning effort → 131072 budget tokens: `EFFORT_BUDGETS` and `THINKING_LEVEL_MAP` updated; reverse mapping now returns `"max"` for full-budget responses. Unit test updated.
- **T12** — MiniMax M2.7 pricing entries added: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` added to pricing table (sub2api PR #1120). M2.5/GLM-4.7/GLM-5/Kimi pricing already existed.
- **T15** — Array content normalization: `normalizeContentToString()` helper in `openai-to-claude.ts` correctly collapses array-formatted system/tool messages to string before sending to Anthropic.

### 🧪 Tests

- Test suite: **832 tests, 0 failures** (unchanged from rc.5)

---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **#464** — Registered Keys Provisioning API: auto-issue API keys with per-provider & per-account quota enforcement
  - `POST /api/v1/registered-keys` — issue keys with idempotency support
  - `GET /api/v1/registered-keys` — list (masked) registered keys
  - `GET /api/v1/registered-keys/{id}` — get key metadata
  - `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — revoke keys
  - `GET /api/v1/quotas/check` — pre-validate before issuing
  - `PUT /api/v1/providers/{id}/limits` — set provider issuance limits
  - `PUT /api/v1/accounts/{id}/limits` — set account issuance limits
  - `POST /api/v1/issues/report` — optional GitHub issue reporting
  - DB migration 008: `registered_keys`, `provider_key_limits`, `account_key_limits` tables

---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **#530 (PR)** — OpenCode Zen and OpenCode Go providers added (by @kang-heewon)
  - New `OpencodeExecutor` with multi-format routing (`/chat/completions`, `/messages`, `/responses`)
  - 7 models across both tiers

---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **#529** — Provider icons now use [@lobehub/icons](https://github.com/lobehub/lobe-icons) with graceful PNG fallback and a `ProviderIcon` component (130+ providers supported)
- **#488** — Auto-update model lists every 24h via `modelSyncScheduler` (configurable via `MODEL_SYNC_INTERVAL_HOURS`)

### 🔧 Bug Fixes

- **#537** — Gemini CLI OAuth: now shows clear actionable error when `GEMINI_OAUTH_CLIENT_SECRET` is missing in Docker/self-hosted deployments

---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

- **#536** — LongCat AI key validation: fixed baseUrl (`api.longcat.chat/openai`) and authHeader (`Authorization: Bearer`)
- **#535** — Pinned model override: `body.model` is now set to `pinnedModel` when context-cache protection detects a pinned model
- **#524** — OpenCode config now saved correctly: added `saveOpenCodeConfig()` handler (XDG_CONFIG_HOME aware, writes TOML)

---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

- **#521** — Login no longer gets stuck after skipping password setup (redirects to onboarding)
- **#522** — API Manager: Removed misleading "Copy masked key" button (replaced with lock icon tooltip)
- **#527** — Claude Code + Codex superpowers loop: `tool_result` blocks now converted to text instead of dropped
- **#532** — OpenCode GO API key validation now uses the correct `zen/v1` endpoint (`testKeyBaseUrl`)
- **#489** — Antigravity: missing `googleProjectId` returns structured 422 error with reconnect guidance
- **#510** — Windows: MSYS2/Git-Bash paths (`/c/Program Files/...`) are now normalized to `C:\Program Files\...`
- **#492** — `omniroute` CLI now detects `mise`/`nvm` when `app/server.js` is missing and shows targeted fix

### 📖 Documentation

- **#513** — Docker password reset: `INITIAL_PASSWORD` env var workaround documented
- **#520** — pnpm: `pnpm approve-builds better-sqlite3` documented

### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532

---

## [2.9.5] — 2026-03-22

> Sprint: New OpenCode providers, embedding credentials fix, CLI masked key bug, CACHE_TAG_PATTERN fix.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **CLI tools save masked API key to config files** — `claude-settings`, `cline-settings`, and `openclaw-settings` POST routes now accept a `keyId` param and resolve the real API key from DB before writing to disk. `ClaudeToolCard` updated to send `keyId` instead of the masked display string. Fixes #523, #526.
- **Custom embedding providers: `No credentials` error** — `/v1/embeddings` now tracks `credentialsProviderId` separately from the routing prefix, so credentials are fetched from the matching provider node ID rather than the public prefix string. Fixes a regression where `google/gemini-embedding-001` and similar custom-provider models would always fail with a credentials error. Fixes #532-related. (PR #528 by @jacob2826)
- **Context cache protection regex misses `
` prefix** — `CACHE_TAG_PATTERN` in `comboAgentMiddleware.ts` updated to match both literal `
` (backslash-n) and actual newline U+000A that `combo.ts` streaming injects around the `<omniModel>` tag after fix #515. Fixes #531.

### ✨ New Providers

- **OpenCode Zen** — Free tier gateway at `opencode.ai/zen/v1` with 3 models: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano`
- **OpenCode Go** — Subscription service at `opencode.ai/zen/go/v1` with 4 models: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude format), `minimax-m2.5` (Claude format)
- Both providers use the new `OpencodeExecutor` which routes dynamically to `/chat/completions`, `/messages`, `/responses`, or `/models/{model}:generateContent` based on the requested model. (PR #530 by @kang-heewon)

---

## [2.9.4] — 2026-03-21

> Sprint: Bug fixes — preserve Codex prompt cache key, fix tagContent JSON escaping, sync expired token status to DB.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(translator)**: Preserve `prompt_cache_key` in Responses API → Chat Completions translation (#517)
  — The field is a cache-affinity signal used by Codex; stripping it was preventing prompt cache hits.
  Fixed in `openai-responses.ts` and `responsesApiHelper.ts`.

- **fix(combo)**: Escape `
` in `tagContent` so injected JSON string is valid (#515)
  — Template literal newlines (U+000A) are not allowed unescaped inside JSON string values.
  Replaced with `\n` literal sequences in `open-sse/services/combo.ts`.

- **fix(usage)**: Sync expired token status back to DB on live auth failure (#491)
  — When the Limits & Quotas live check returns 401/403, the connection `testStatus` is now updated
  to `"expired"` in the database so the Providers page reflects the same degraded state.
  Fixed in `src/app/api/usage/[connectionId]/route.ts`.

---

## [2.9.3] — 2026-03-21

> Sprint: Add 5 new free AI providers — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.

### ✨ New Providers

- **feat(providers/longcat)**: Add LongCat AI (`lc/`) — 50M tokens/day free (Flash-Lite) + 500K/day (Chat/Thinking) during public beta. OpenAI-compatible, standard Bearer auth.
- **feat(providers/pollinations)**: Add Pollinations AI (`pol/`) — no API key required. Proxies GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s free). Custom executor handles optional auth.
- **feat(providers/cloudflare-ai)**: Add Cloudflare Workers AI (`cf/`) — 10K Neurons/day free (~150 LLM responses or 500s Whisper audio). 50+ models on global edge. Custom executor builds dynamic URL with `accountId` from credentials.
- **feat(providers/scaleway)**: Add Scaleway Generative APIs (`scw/`) — 1M free tokens for new accounts. EU/GDPR compliant (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2.
- **feat(providers/aimlapi)**: Add AI/ML API (`aiml/`) — $0.025/day free credit, 200+ models (GPT-4o, Claude, Gemini, Llama) via single aggregator endpoint.

### 🔄 Provider Updates

- **feat(providers/together)**: Add `hasFree: true` + 3 permanently free model IDs: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free`
- **feat(providers/gemini)**: Add `hasFree: true` + `freeNote` (1,500 req/day, no credit card needed, aistudio.google.com)
- **chore(providers/gemini)**: Rename display name to `Gemini (Google AI Studio)` for clarity

### ⚙️ Infrastructure

- **feat(executors/pollinations)**: New `PollinationsExecutor` — omits `Authorization` header when no API key provided
- **feat(executors/cloudflare-ai)**: New `CloudflareAIExecutor` — dynamic URL construction requires `accountId` in provider credentials
- **feat(executors)**: Register `pollinations`, `pol`, `cloudflare-ai`, `cf` executor mappings

### 📝 Documentation

- **docs(readme)**: Expanded free combo stack to 11 providers ($0 forever)
- **docs(readme)**: Added 4 new free provider sections (LongCat, Pollinations, Cloudflare AI, Scaleway) with model tables
- **docs(readme)**: Updated pricing table with 4 new free tier rows
- **docs(i18n/pt-BR)**: Updated pricing table + added LongCat/Pollinations/Cloudflare AI/Scaleway sections in Portuguese
- **docs(new-features/ai)**: 10 task spec files + master implementation plan in `docs/new-features/ai/`

### 🧪 Tests

- Test suite: **821 tests, 0 failures** (unchanged)

---

## [2.9.2] — 2026-03-21

> Sprint: Fix media transcription (Deepgram/HuggingFace Content-Type, language detection) and TTS error display.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(transcription)**: Deepgram and HuggingFace audio transcription now correctly map `video/mp4` → `audio/mp4` and other media MIME types via new `resolveAudioContentType()` helper. Previously, uploading `.mp4` files consistently returned "No speech detected" because Deepgram was receiving `Content-Type: video/mp4`.
- **fix(transcription)**: Added `detect_language=true` to Deepgram requests — auto-detects audio language (Portuguese, Spanish, etc.) instead of defaulting to English. Fixes non-English transcriptions returning empty or garbage results.
- **fix(transcription)**: Added `punctuate=true` to Deepgram requests for higher-quality transcription output with correct punctuation.
- **fix(tts)**: `[object Object]` error display in Text-to-Speech responses fixed in both `audioSpeech.ts` and `audioTranscription.ts`. The `upstreamErrorResponse()` function now correctly extracts nested string messages from providers like ElevenLabs that return `{ error: { message: "...", status_code: 401 } }` instead of a flat error string.

### 🧪 Tests

- Test suite: **821 tests, 0 failures** (unchanged)

### Triaged Issues

- **#508** — Tool call format regression: requested proxy logs and provider chain info (`needs-info`)
- **#510** — Windows CLI healthcheck path: requested shell/Node version info (`needs-info`)
- **#485** — Kiro MCP tool calls: closed as external Kiro issue (not OmniRoute)
- **#442** — Baseten /models endpoint: closed (documented manual workaround)
- **#464** — Key provisioning API: acknowledged as roadmap item

---

## [2.9.1] — 2026-03-21

> Sprint: Fix SSE omniModel data loss, merge per-protocol model compatibility.

### Bug Fixes

- **#511** — Critical: `<omniModel>` tag was sent after `finish_reason:stop` in SSE streams, causing data loss. Tag is now injected into the first non-empty content chunk, guaranteeing delivery before SDKs close the connection.

### Merged PRs

- **PR #512** (@zhangqiang8vip): Per-protocol model compatibility — `normalizeToolCallId` and `preserveOpenAIDeveloperRole` can now be configured per client protocol (OpenAI, Claude, Responses API). New `compatByProtocol` field in model config with Zod validation.

### Triaged Issues

- **#510** — Windows CLI healthcheck_failed: requested PATH/version info
- **#509** — Turbopack Electron regression: upstream Next.js bug, documented workarounds
- **#508** — macOS black screen: suggested `--disable-gpu` workaround

---

## [2.9.0] — 2026-03-20

> Sprint: Cross-platform machineId fix, per-API-key rate limits, streaming context cache, Alibaba DashScope, search analytics, ZWS v5, and 8 issues closed.

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(search)**: Search Analytics tab in `/dashboard/analytics` — provider breakdown, cache hit rate, cost tracking. New API: `GET /api/v1/search/analytics` (#feat/search-provider-routing)
- **feat(provider)**: Alibaba Cloud DashScope added with custom endpoint path validation — configurable `chatPath` and `modelsPath` per node (#feat/custom-endpoint-paths)
- **feat(api)**: Per-API-key request-count limits — `max_requests_per_day` and `max_requests_per_minute` columns with in-memory sliding-window enforcement returning HTTP 429 (#452)
- **feat(dev)**: ZWS v5 — HMR leak fix (485 DB connections → 1), memory 2.4GB → 195MB, `globalThis` singletons, Edge Runtime warning fix (@zhangqiang8vip)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(#506)**: Cross-platform `machineId` — `getMachineIdRaw()` rewritten with try/catch waterfall (Windows REG.exe → macOS ioreg → Linux file read → hostname → `os.hostname()`). Eliminates `process.platform` branching that Next.js bundler dead-code-eliminated, fixing `'head' is not recognized` on Windows. Also fixes #466.
- **fix(#493)**: Custom provider model naming — removed incorrect prefix stripping in `DefaultExecutor.transformRequest()` that mangled org-scoped model IDs like `zai-org/GLM-5-FP8`.
- **fix(#490)**: Streaming + context cache protection — `TransformStream` intercepts SSE to inject `<omniModel>` tag before `[DONE]` marker, enabling context cache protection for streaming responses.
- **fix(#458)**: Combo schema validation — `system_message`, `tool_filter_regex`, `context_cache_protection` fields now pass Zod validation on save.
- **fix(#487)**: KIRO MITM card cleanup — removed ZWS_README, generified `AntigravityToolCard` to use dynamic tool metadata.

### 🧪 Tests

- Added Anthropic-format tools filter unit tests (PR #397) — 8 regression tests for `tool.name` without `.function` wrapper
- Test suite: **821 tests, 0 failures** (up from 813)

### 📋 Issues Closed (8)

- **#506** — Windows machineId `head` not recognized (fixed)
- **#493** — Custom provider model naming (fixed)
- **#490** — Streaming context cache (fixed)
- **#452** — Per-API-key request limits (implemented)
- **#466** — Windows login failure (same root cause as #506)
- **#504** — MITM inactive (expected behavior)
- **#462** — Gemini CLI PSA (resolved)
- **#434** — Electron app crash (duplicate of #402)

## [2.8.9] — 2026-03-20

> Sprint: Merge community PRs, fix KIRO MITM card, dependency updates.

### Merged PRs

- **PR #498** (@Sajid11194): Fix Windows machine ID crash (`undefined\REG.exe`). Replaces `node-machine-id` with native OS registry queries. **Closes #486.**
- **PR #497** (@zhangqiang8vip): Fix dev-mode HMR resource leaks — 485 leaked DB connections → 1, memory 2.4GB → 195MB. `globalThis` singletons, Edge Runtime warning fix, Windows test stability. (+1168/-338 across 22 files)
- **PRs #499-503** (Dependabot): GitHub Actions updates — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.

### Bug Fixes

- **#505** — KIRO MITM card now displays tool-specific instructions (`api.anthropic.com`) instead of Antigravity-specific text.
- **#504** — Responded with UX clarification (MITM "Inactive" is expected behavior when proxy is not running).

---

## [2.8.8] — 2026-03-20

> Sprint: Fix OAuth batch test crash, add "Test All" button to individual provider pages.

### Bug Fixes

- **OAuth batch test crash** (ERR_CONNECTION_REFUSED): Replaced sequential for-loop with 5-connection concurrency limit + 30s per-connection timeout via `Promise.race()` + `Promise.allSettled()`. Prevents server crash when testing large OAuth provider groups (~30+ connections).

### Features

- **"Test All" button on provider pages**: Individual provider pages (e.g., `/providers/codex`) now show a "Test All" button in the Connections header when there are 2+ connections. Uses `POST /api/providers/test-batch` with `{mode: "provider", providerId}`. Results displayed in a modal with pass/fail summary and per-connection diagnosis.

---

## [2.8.7] — 2026-03-20

> Sprint: Merge PR #495 (Bottleneck 429 drop), fix #496 (custom embedding providers), triage features.

### Bug Fixes

- **Bottleneck 429 infinite wait** (PR #495 by @xandr0s): On 429, `limiter.stop({ dropWaitingJobs: true })` immediately fails all queued requests so upstream callers can trigger fallback. Limiter is deleted from Map so next request creates a fresh instance.
- **Custom embedding models unresolvable** (#496): `POST /v1/embeddings` now resolves custom embedding models from ALL provider_nodes (not just localhost). Enables models like `google/gemini-embedding-001` added via dashboard.

### Issues Responded

- **#452** — Per-API-key request-count limits (acknowledged, on roadmap)
- **#464** — Auto-issue API keys with provider/account limits (needs more detail)
- **#488** — Auto-update model lists (acknowledged, on roadmap)
- **#496** — Custom embedding provider resolution (fixed)

---

## [2.8.6] — 2026-03-20

> Sprint: Merge PR #494 (MiniMax role fix), fix KIRO MITM dashboard, triage 8 issues.

### Features

- **MiniMax developer→system role fix** (PR #494 by @zhangqiang8vip): Per-model `preserveDeveloperRole` toggle. Adds "Compatibility" UI in providers page. Fixes 422 "role param error" for MiniMax and similar gateways.
- **roleNormalizer**: `normalizeDeveloperRole()` now accepts `preserveDeveloperRole` parameter with tri-state behavior (undefined=keep, true=keep, false=convert).
- **DB**: New `getModelPreserveOpenAIDeveloperRole()` and `mergeModelCompatOverride()` in `models.ts`.

### Bug Fixes

- **KIRO MITM dashboard** (#481/#487): `CLIToolsPageClient` now routes any `configType: "mitm"` tool to `AntigravityToolCard` (MITM Start/Stop controls). Previously only Antigravity was hardcoded.
- **AntigravityToolCard generic**: Uses `tool.image`, `tool.description`, `tool.id` instead of hardcoded Antigravity values. Guards against missing `defaultModels`.

### Cleanup

- Removed `ZWS_README_V2.md` (development-only docs from PR #494).

### Issues Triaged (8)

- **#487** — Closed (KIRO MITM fixed in this release)
- **#486** — needs-info (Windows REG.exe PATH issue)
- **#489** — needs-info (Antigravity projectId missing, OAuth reconnect needed)
- **#492** — needs-info (missing app/server.js on mise-managed Node)
- **#490** — Acknowledged (streaming + context cache blocking, fix planned)
- **#491** — Acknowledged (Codex auth state inconsistency)
- **#493** — Acknowledged (Modal provider model name prefix, workaround provided)
- **#488** — Feature request backlog (auto-update model lists)

---

## [2.8.5] — 2026-03-19

> Sprint: Fix zombie SSE streams, context cache first-turn, KIRO MITM, and triage 5 external issues.

### Bug Fixes

- **Zombie SSE Streams** (#473): Reduce `STREAM_IDLE_TIMEOUT_MS` from 300s → 120s for faster combo fallback when providers hang mid-stream. Configurable via env var.
- **Context Cache Tag** (#474): Fix `injectModelTag()` to handle first-turn requests (no assistant messages) — context cache protection now works from the very first response.
- **KIRO MITM** (#481): Change KIRO `configType` from `guide` → `mitm` so the dashboard renders MITM Start/Stop controls.
- **E2E Test** (CI): Fix `providers-bailian-coding-plan.spec.ts` — dismiss pre-existing modal overlay before clicking Add API Key button.

### Closed Issues

- #473 — Zombie SSE streams bypass combo fallback
- #474 — Context cache `<omniModel>` tag missing on first turn
- #481 — MITM for KIRO not activatable from dashboard
- #468 — Gemini CLI remote server (superseded by #462 deprecation)
- #438 — Claude unable to write files (external CLI issue)
- #439 — AppImage doesn't work (documented libfuse2 workaround)
- #402 — ARM64 DMG "damaged" (documented xattr -cr workaround)
- #460 — CLI not runnable on Windows (documented PATH fix)

---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI deprecation, VM guide i18n fix, dependabot security fix, provider schema expansion.

### Features

- **Gemini CLI Deprecation** (#462): Mark `gemini-cli` provider as deprecated with warning — Google restricts third-party OAuth usage from March 2026
- **Provider Schema** (#462): Expand Zod validation with `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint` optional fields

### Bug Fixes

- **VM Guide i18n** (#471): Add `VM_DEPLOYMENT_GUIDE.md` to i18n translation pipeline, regenerate all 30 locale translations from English source (were stuck in Portuguese)

### Security

- **deps**: Bump `flatted` 3.3.3 → 3.4.2 — fixes CWE-1321 prototype pollution (#484, @dependabot)

### Closed Issues

- #472 — Model Aliases regression (fixed in v2.8.2)
- #471 — VM guide translations broken
- #483 — Trailing `data: null` after `[DONE]` (fixed in v2.8.3)

### Merged PRs

- #484 — deps: bump flatted from 3.3.3 to 3.4.2 (@dependabot)

---

## [2.8.3] — 2026-03-19

> Sprint: Czech i18n, SSE protocol fix, VM guide translation.

### Features

- **Czech Language** (#482): Full Czech (cs) i18n — 22 docs, 2606 UI strings, language switcher updates (@zen0bit)
- **VM Deployment Guide**: Translated from Portuguese to English as the source document (@zen0bit)

### Bug Fixes

- **SSE Protocol** (#483): Stop sending trailing `data: null` after `[DONE]` signal — fixes `AI_TypeValidationError` in strict AI SDK clients (Zod-based validators)

### Merged PRs

- #482 — Add Czech language + Fix VM_DEPLOYMENT_GUIDE.md English source (@zen0bit)

---

## [2.8.2] — 2026-03-19

> Sprint: 2 merged PRs, model aliases routing fix, log export, and issue triage.

### Features

- **Log Export**: New Export button on `/dashboard/logs` with time range dropdown (1h, 6h, 12h, 24h). Downloads JSON of request/proxy/call logs via `/api/logs/export` API (#user-request)

### Bug Fixes

- **Model Aliases Routing** (#472): Settings → Model Aliases now correctly affect provider routing, not just format detection. Previously `resolveModelAlias()` output was only used for `getModelTargetFormat()` but the original model ID was sent to the provider
- **Stream Flush Usage** (#480): Usage data from the last SSE event in the buffer is now correctly extracted during stream flush (merged from @prakersh)

### Merged PRs

- #480 — Extract usage from remaining buffer in flush handler (@prakersh)
- #479 — Add missing Codex 5.3/5.4 and Anthropic model ID pricing entries (@prakersh)

---

## [2.8.1] — 2026-03-19

> Sprint: Five community PRs — streaming call log fixes, Kiro compatibility, cache token analytics, Chinese translation, and configurable tool call IDs.

### ✨ Features

- **feat(logs)**: Call log response content now correctly accumulated from raw provider chunks (OpenAI/Claude/Gemini) before translation, fixing empty response payloads in streaming mode (#470, @zhangqiang8vip)
- **feat(providers)**: Per-model configurable 9-char tool call ID normalization (Mistral-style) — only models with the option enabled get truncated IDs (#470)
- **feat(api)**: Key PATCH API expanded to support `allowedConnections`, `name`, `autoResolve`, `isActive`, and `accessSchedule` fields (#470)
- **feat(dashboard)**: Response-first layout in request log detail UI (#470)
- **feat(i18n)**: Improved Chinese (zh-CN) translation — complete retranslation (#475, @only4copilot)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(kiro)**: Strip injected `model` field from request body — Kiro API rejects unknown top-level fields (#478, @prakersh)
- **fix(usage)**: Include cache read + cache creation tokens in usage history input totals for accurate analytics (#477, @prakersh)
- **fix(callLogs)**: Support Claude format usage fields (`input_tokens`/`output_tokens`) alongside OpenAI format, include all cache token variants (#476, @prakersh)

---

## [2.8.0] — 2026-03-19

> Sprint: Bailian Coding Plan provider with editable base URLs, plus community contributions for Alibaba Cloud and Kimi Coding.

### ✨ Features

- **feat(providers)**: Added Bailian Coding Plan (`bailian-coding-plan`) — Alibaba Model Studio with Anthropic-compatible API. Static catalog of 8 models including Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5, and Kimi K2.5. Includes custom auth validation (400=valid, 401/403=invalid) (#467, @Mind-Dragon)
- **feat(admin)**: Editable default URL in Provider Admin create/edit flows — users can configure custom base URLs per connection. Persisted in `providerSpecificData.baseUrl` with Zod schema validation rejecting non-http(s) schemes (#467)

### 🧪 Tests

- Added 30+ unit tests and 2 e2e scenarios for Bailian Coding Plan provider covering auth validation, schema hardening, route-level behavior, and cross-layer integration

---

## [2.7.10] — 2026-03-19

> Sprint: Two new community-contributed providers (Alibaba Cloud Coding, Kimi Coding API-key) and Docker pino fix.

### ✨ Features

- **feat(providers)**: Added Alibaba Cloud Coding Plan support with two OpenAI-compatible endpoints — `alicode` (China) and `alicode-intl` (International), each with 8 models (#465, @dtk1985)
- **feat(providers)**: Added dedicated `kimi-coding-apikey` provider path — API-key-based Kimi Coding access is no longer forced through OAuth-only `kimi-coding` route. Includes registry, constants, models API, config, and validation test (#463, @Mind-Dragon)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(docker)**: Added missing `split2` dependency to Docker image — `pino-abstract-transport` requires it at runtime but it was not being copied into the standalone container, causing `Cannot find module 'split2'` crashes (#459)

---

## [2.7.9] — 2026-03-18

> Sprint: Codex responses subpath passthrough natively supported, Windows MITM crash fixed, and Combos agent schemas adjusted.

### ✨ Features

- **feat(codex)**: Native responses subpath passthrough for Codex — natively routes `POST /v1/responses/compact` to Codex upstream, maintaining Claude Code compatibility without stripping the `/compact` suffix (#457)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(combos)**: Zod schemas (`updateComboSchema` and `createComboSchema`) now include `system_message`, `tool_filter_regex`, and `context_cache_protection`. Fixes bug where agent-specific settings created via the dashboard were silently discarded by the backend validation layer (#458)
- **fix(mitm)**: Kiro MITM profile crash on Windows fixed — `node-machine-id` failed due to missing `REG.exe` env, and the fallback threw a fatal `crypto is not defined` error. Fallback now safely and correctly imports crypto (#456)

---

## [2.7.8] — 2026-03-18

> Sprint: Budget save bug + combo agent features UI + omniModel tag security fix.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(budget)**: "Save Limits" no longer returns 422 — `warningThreshold` is now correctly sent as fraction (0–1) instead of percentage (0–100) (#451)
- **fix(combos)**: `<omniModel>` internal cache tag is now stripped before forwarding requests to providers, preventing cache session breaks (#454)

### ✨ Features

- **feat(combos)**: Agent Features section added to combo create/edit modal — expose `system_message` override, `tool_filter_regex`, and `context_cache_protection` directly from the dashboard (#454)

---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino crash, Codex CLI responses worker fix, package-lock sync.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(docker)**: `pino-abstract-transport` and `pino-pretty` now explicitly copied in Docker runner stage — Next.js standalone trace misses these peer deps, causing `Cannot find module pino-abstract-transport` crash on startup (#449)
- **fix(responses)**: Remove `initTranslators()` from `/v1/responses` route — was crashing Next.js worker with `the worker has exited` uncaughtException on Codex CLI requests (#450)

### 🔧 Maintenance

- **chore(deps)**: `package-lock.json` now committed on every version bump to ensure Docker `npm ci` uses exact dependency versions

---

## [2.7.5] — 2026-03-18

> Sprint: UX improvements and Windows CLI healthcheck fix.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(ux)**: Show default password hint on login page — new users now see `"Default password: 123456"` below the password input (#437)
- **fix(cli)**: Claude CLI and other npm-installed tools now correctly detected as runnable on Windows — spawn uses `shell:true` to resolve `.cmd` wrappers via PATHEXT (#447)

---

## [2.7.4] — 2026-03-18

> Sprint: Search Tools dashboard, i18n fixes, Copilot limits, Serper validation fix.

### 🚀 Features

- **feat(search)**: Add Search Playground (10th endpoint), Search Tools page with Compare Providers/Rerank Pipeline/Search History, local rerank routing, auth guards on search API (#443 by @Regis-RCR)
  - New route: `/dashboard/search-tools`
  - Sidebar entry under Debug section
  - `GET /api/search/providers` and `GET /api/search/stats` with auth guards
  - Local provider_nodes routing for `/v1/rerank`
  - 30+ i18n keys in search namespace

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(search)**: Fix Brave news normalizer (was returning 0 results), enforce max_results truncation post-normalization, fix Endpoints page fetch URL (#443 by @Regis-RCR)
- **fix(analytics)**: Localize analytics day/date labels — replace hardcoded Portuguese strings with `Intl.DateTimeFormat(locale)` (#444 by @hijak)
- **fix(copilot)**: Correct GitHub Copilot account type display, filter misleading unlimited quota rows from limits dashboard (#445 by @hijak)
- **fix(providers)**: Stop rejecting valid Serper API keys — treat non-4xx responses as valid authentication (#446 by @hijak)

---

## [2.7.3] — 2026-03-18

> Sprint: Codex direct API quota fallback fix.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(codex)**: Block weekly-exhausted accounts in direct API fallback (#440)
  - `resolveQuotaWindow()` prefix matching: `"weekly"` now matches `"weekly (7d)"` cache keys
  - `applyCodexWindowPolicy()` enforces `useWeekly`/`use5h` toggles correctly
  - 4 new regression tests (766 total)

---

## [2.7.2] — 2026-03-18

> Sprint: Light mode UI contrast fixes.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(logs)**: Fix light mode contrast in request logs filter buttons and combo badge (#378)
  - Error/Success/Combo filter buttons now readable in light mode
  - Combo row badge uses stronger violet in light mode

---

## [2.7.1] — 2026-03-17

> Sprint: Unified web search routing (POST /v1/search) with 5 providers + Next.js 16.1.7 security fixes (6 CVEs).

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(search)**: Unified web search routing — `POST /v1/search` with 5 providers (Serper, Brave, Perplexity, Exa, Tavily)
  - Auto-failover across providers, 6,500+ free searches/month
  - In-memory cache with request coalescing (configurable TTL)
  - Dashboard: Search Analytics tab in `/dashboard/analytics` with provider breakdown, cache hit rate, cost tracking
  - New API: `GET /api/v1/search/analytics` for search request statistics
  - DB migration: `request_type` column on `call_logs` for non-chat request tracking
  - Zod validation (`v1SearchSchema`), auth-gated, cost recorded via `recordCost()`

### 🔒 Security

- **deps**: Next.js 16.1.6 → 16.1.7 — fixes 6 CVEs:
  - **Critical**: CVE-2026-29057 (HTTP request smuggling via http-proxy)
  - **High**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Server Actions)
  - **Medium**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7

### 📁 New Files

| File                                                             | Purpose                                    |
| ---------------------------------------------------------------- | ------------------------------------------ |
| `open-sse/handlers/search.ts`                                    | Search handler with 5-provider routing     |
| `open-sse/config/searchRegistry.ts`                              | Provider registry (auth, cost, quota, TTL) |
| `open-sse/services/searchCache.ts`                               | In-memory cache with request coalescing    |
| `src/app/api/v1/search/route.ts`                                 | Next.js route (POST + GET)                 |
| `src/app/api/v1/search/analytics/route.ts`                       | Search stats API                           |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Analytics dashboard tab                    |
| `src/lib/db/migrations/007_search_request_type.sql`              | DB migration                               |
| `tests/unit/search-registry.test.mjs`                            | 277 lines of unit tests                    |

---

## [2.7.0] — 2026-03-17

> Sprint: ClawRouter-inspired features — toolCalling flag, multilingual intent detection, benchmark-driven fallback, request deduplication, pluggable RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 pricing.

### ✨ New Models & Pricing

- **feat(pricing)**: xAI Grok-4 Fast — `$0.20/$0.50 per 1M tokens`, 1143ms p50 latency, tool calling supported
- **feat(pricing)**: xAI Grok-4 (standard) — `$0.20/$1.50 per 1M tokens`, reasoning flagship
- **feat(pricing)**: GLM-5 via Z.AI — `$0.5/1M`, 128K output context
- **feat(pricing)**: MiniMax M2.5 — `$0.30/1M input`, reasoning + agentic tasks
- **feat(pricing)**: DeepSeek V3.2 — updated pricing `$0.27/$1.10 per 1M`
- **feat(pricing)**: Kimi K2.5 via Moonshot API — direct Moonshot API access
- **feat(providers)**: Z.AI provider added (`zai` alias) — GLM-5 family with 128K output

### 🧠 Routing Intelligence

- **feat(registry)**: `toolCalling` flag per model in provider registry — combos can now prefer/require tool-calling capable models
- **feat(scoring)**: Multilingual intent detection for AutoCombo scoring — PT/ZH/ES/AR script/language patterns influence model selection per request context
- **feat(fallback)**: Benchmark-driven fallback chains — real latency data (p50 from `comboMetrics`) used to re-order fallback priority dynamically
- **feat(dedup)**: Request deduplication via content-hash — 5-second idempotency window prevents duplicate provider calls from retrying clients
- **feat(router)**: Pluggable `RouterStrategy` interface in `autoCombo/routerStrategy.ts` — custom routing logic can be injected without modifying core

### 🔧 MCP Server Improvements

- **feat(mcp)**: 2 new advanced tool schemas: `omniroute_get_provider_metrics` (p50/p95/p99 per provider) and `omniroute_explain_route` (routing decision explanation)
- **feat(mcp)**: MCP tool auth scopes updated — `metrics:read` scope added for provider metrics tools
- **feat(mcp)**: `omniroute_best_combo_for_task` now accepts `languageHint` parameter for multilingual routing

### 📊 Observability

- **feat(metrics)**: `comboMetrics.ts` extended with real-time latency percentile tracking per provider/account
- **feat(health)**: Health API (`/api/monitoring/health`) now returns per-provider `p50Latency` and `errorRate` fields
- **feat(usage)**: Usage history migration for per-model latency tracking

### 🗄️ DB Migrations

- **feat(migrations)**: New column `latency_p50` in `combo_metrics` table — zero-breaking, safe for existing users

### 🐛 Bug Fixes / Closures

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **close(#411)**: better-sqlite3 hashed module resolution on Windows — fixed in v2.6.10 (f02c5b5)
- **close(#409)**: GitHub Copilot chat completions fail with Claude models when files attached — fixed in v2.6.9 (838f1d6)
- **close(#405)**: Duplicate of #411 — resolved

## [2.6.10] — 2026-03-17

> Windows fix: better-sqlite3 prebuilt download without node-gyp/Python/MSVC (#426).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(install/#426)**: On Windows, `npm install -g omniroute` used to fail with `better_sqlite3.node is not a valid Win32 application` because the bundled native binary was compiled for Linux. Adds **Strategy 1.5** to `scripts/postinstall.mjs`: uses `@mapbox/node-pre-gyp install --fallback-to-build=false` (bundled within `better-sqlite3`) to download the correct prebuilt binary for the current OS/arch without requiring any build tools (no node-gyp, no Python, no MSVC). Falls back to `npm rebuild` only if the download fails. Adds platform-specific error messages with clear manual fix instructions.

---

## [2.6.9] — 2026-03-17

> CI fixes (t11 any-budget), bug fix #409 (file attachments via Copilot+Claude), release workflow correction.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(ci)**: Remove word "any" from comments in `openai-responses.ts` and `chatCore.ts` that were failing the t11 `any` budget check (false positive from regex counting comments)
- **fix(chatCore)**: Normalize unsupported content part types before forwarding to providers (#409 — Cursor sends `{type:"file"}` when `.md` files are attached; Copilot and other OpenAI-compat providers reject with "type has to be either 'image_url' or 'text'"; fix converts `file`/`document` blocks to `text` and drops unknown types)

### 🔧 Workflow

- **chore(generate-release)**: Add ATOMIC COMMIT RULE — version bump (`npm version patch`) MUST happen before committing feature files to ensure tag always points to a commit containing all version changes together

---

## [2.6.8] — 2026-03-17

> Sprint: Combo as Agent (system prompt + tool filter), Context Caching Protection, Auto-Update, Detailed Logs, MITM Kiro IDE.

### 🗄️ DB Migrations (zero-breaking — safe for existing users)

- **005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0`
- **006_detailed_request_logs.sql**: New `request_detail_logs` table with 500-entry ring-buffer trigger, opt-in via settings toggle

### ✨ Features

- **feat(combo)**: System Message Override per Combo (#399 — `system_message` field replaces or injects system prompt before forwarding to provider)
- **feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` keeps only tools matching pattern; supports OpenAI + Anthropic formats)
- **feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` tags responses with `<omniModel>provider/model</omniModel>` and pins model for session continuity)
- **feat(settings)**: Auto-Update via Settings (#320 — `GET /api/system/version` + `POST /api/system/update` — checks npm registry and updates in background with pm2 restart)
- **feat(logs)**: Detailed Request Logs (#378 — captures full pipeline bodies at 4 stages: client request, translated request, provider response, client response — opt-in toggle, 64KB trim, 500-entry ring-buffer)
- **feat(mitm)**: MITM Kiro IDE profile (#336 — `src/mitm/targets/kiro.ts` targets api.anthropic.com, reuses existing MITM infrastructure)

---

## [2.6.7] — 2026-03-17

> Sprint: SSE improvements, local provider_nodes extensions, proxy registry, Claude passthrough fixes.

### ✨ Features

- **feat(health)**: Background health check for local `provider_nodes` with exponential backoff (30s→300s) and `Promise.allSettled` to avoid blocking (#423, @Regis-RCR)
- **feat(embeddings)**: Route `/v1/embeddings` to local `provider_nodes` — `buildDynamicEmbeddingProvider()` with hostname validation (#422, @Regis-RCR)
- **feat(audio)**: Route TTS/STT to local `provider_nodes` — `buildDynamicAudioProvider()` with SSRF protection (#416, @Regis-RCR)
- **feat(proxy)**: Proxy registry, management APIs, and quota-limit generalization (#429, @Regis-RCR)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(sse)**: Strip Claude-specific fields (`metadata`, `anthropic_version`) when target is OpenAI-compat (#421, @prakersh)
- **fix(sse)**: Extract Claude SSE usage (`input_tokens`, `output_tokens`, cache tokens) in passthrough stream mode (#420, @prakersh)
- **fix(sse)**: Generate fallback `call_id` for tool calls with missing/empty IDs (#419, @prakersh)
- **fix(sse)**: Claude-to-Claude passthrough — forward body completely untouched, no re-translation (#418, @prakersh)
- **fix(sse)**: Filter orphaned `tool_result` items after Claude Code context compaction to avoid 400 errors (#417, @prakersh)
- **fix(sse)**: Skip empty-name tool calls in Responses API translator to prevent `placeholder_tool` infinite loops (#415, @prakersh)
- **fix(sse)**: Strip empty text content blocks before translation (#427, @prakersh)
- **fix(api)**: Add `refreshable: true` to Claude OAuth test config (#428, @prakersh)

### 📦 Dependencies

- Bump `vitest`, `@vitest/*` and related devDependencies (#414, @dependabot)

---

## [2.6.6] — 2026-03-17

> Hotfix: Turbopack/Docker compatibility — remove `node:` protocol from all `src/` imports.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: Removed `node:` protocol prefix from `import` statements in 17 files under `src/`. The `node:fs`, `node:path`, `node:url`, `node:os` etc. imports caused `Ecmascript file had an error` on Turbopack builds (Next.js 15 Docker) and on upgrades from older npm global installs. Affected files: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts`, and 12 others in `src/app/api/` and `src/lib/`.
- **chore(workflow)**: Updated `generate-release.md` to make Docker Hub sync and dual-VPS deploy **mandatory** steps in every release.

---

## [2.6.5] — 2026-03-17

> Sprint: reasoning model param filtering, local provider 404 fix, Kilo Gateway provider, dependency bumps.

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(api)**: Added **Kilo Gateway** (`api.kilo.ai`) as a new API Key provider (alias `kg`) — 335+ models, 6 free models, 3 auto-routing models (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Passthrough models supported via `/api/gateway/models` endpoint. (PR #408 by @Regis-RCR)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(sse)**: Strip unsupported parameters for reasoning models (o1, o1-mini, o1-pro, o3, o3-mini). Models in the `o1`/`o3` family reject `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs`, and `n` with HTTP 400. Parameters are now stripped at the `chatCore` layer before forwarding. Uses a declarative `unsupportedParams` field per model and a precomputed O(1) Map for lookup. (PR #412 by @Regis-RCR)
- **fix(sse)**: Local provider 404 now results in a **model-only lockout (5 seconds)** instead of a connection-level lockout (2 minutes). When a local inference backend (Ollama, LM Studio, oMLX) returns 404 for an unknown model, the connection remains active and other models continue working immediately. Also fixes a pre-existing bug where `model` was not passed to `markAccountUnavailable()`. Local providers detected via hostname (`localhost`, `127.0.0.1`, `::1`, extensible via `LOCAL_HOSTNAMES` env var). (PR #410 by @Regis-RCR)

### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8

---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(providers)**: Removed non-existent model names across 5 providers:
  - **gemini / gemini-cli**: removed `gemini-3.1-pro/flash` and `gemini-3-*-preview` (don't exist in Google API v1beta); replaced with `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash`
  - **antigravity**: removed `gemini-3.1-pro-high/low` and `gemini-3-flash` (invalid internal aliases); replaced with real 2.x models
  - **github (Copilot)**: removed `gemini-3-flash-preview` and `gemini-3-pro-preview`; replaced with `gemini-2.5-flash`
  - **nvidia**: corrected `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM uses `meta/` namespace for Meta models); added `nvidia/llama-3.1-70b-instruct` and `nvidia/llama-3.1-405b-instruct`
- **fix(db/combo)**: Updated `free-stack` combo on remote DB: removed `qw/qwen3-coder-plus` (expired refresh token), corrected `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, corrected `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`, added `if/deepseek-v3.2`

---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip baked into build pipeline, Synthetic provider added, VPS PM2 path corrected.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: Turbopack hash-strip now runs at **compile time** for ALL packages — not just `better-sqlite3`. Step 5.6 in `prepublish.mjs` walks every `.js` in `app/.next/server/` and strips the 16-char hex suffix from any hashed `require()`. Fixes `zod-dcb22c...`, `pino-...`, etc. MODULE_NOT_FOUND on global npm installs. Closes #398
- **fix(deploy)**: PM2 on both VPS was pointing to stale git-clone directories. Reconfigured to `app/server.js` in the npm global package. Updated `/deploy-vps` workflow to use `npm pack + scp` (npm registry rejects 299MB packages).

### ✨ Features

- **feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)) — privacy-focused OpenAI-compatible inference. `passthroughModels: true` for dynamic HuggingFace model catalog. Initial models: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 by @Regis-RCR)

### 📋 Issues Closed

- **close #398**: npm hash regression — fixed by compile-time hash-strip in prepublish
- **triage #324**: Bug screenshot without steps — requested reproduction details

---

## [2.6.2] — 2026-03-16

> Sprint: module hashing fully fixed, 2 PRs merged (Anthropic tools filter + custom endpoint paths), Alibaba Cloud DashScope provider added, 3 stale issues closed.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: Extended webpack `externals` hash-strip to cover ALL `serverExternalPackages`, not just `better-sqlite3`. Next.js 16 Turbopack hashes `zod`, `pino`, and every other server-external package into names like `zod-dcb22c6336e0bc69` that don't exist in `node_modules` at runtime. A HASH_PATTERN regex catch-all now strips the 16-char suffix and falls back to the base package name. Also added `NEXT_PRIVATE_BUILD_WORKER=0` in `prepublish.mjs` to reinforce webpack mode, plus a post-build scan that reports any remaining hashed refs. (#396, #398, PR #403)
- **fix(chat)**: Anthropic-format tool names (`tool.name` without `.function` wrapper) were silently dropped by the empty-name filter introduced in #346. LiteLLM proxies requests with `anthropic/` prefix in Anthropic Messages API format, causing all tools to be filtered and Anthropic to return `400: tool_choice.any may only be specified while providing tools`. Fixed by falling back to `tool.name` when `tool.function.name` is absent. Added 8 regression unit tests. (PR #397)

### ✨ Features

- **feat(api)**: Custom endpoint paths for OpenAI-compatible provider nodes — configure `chatPath` and `modelsPath` per node (e.g. `/v4/chat/completions`) in the provider connection UI. Includes a DB migration (`003_provider_node_custom_paths.sql`) and URL path sanitization (no `..` traversal, must start with `/`). (PR #400)
- **feat(provider)**: Alibaba Cloud DashScope added as OpenAI-compatible provider. International endpoint: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 models: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth: Bearer API key.

### 📋 Issues Closed

- **close #323**: Cline connection error `[object Object]` — fixed in v2.3.7; instructed user to upgrade from v2.2.9
- **close #337**: Kiro credit tracking — implemented in v2.5.5 (#381); pointed user to Dashboard → Usage
- **triage #402**: ARM64 macOS DMG damaged — requested macOS version, exact error, and advised `xattr -d com.apple.quarantine` workaround

---

## [2.6.1] — 2026-03-15

> Critical startup fix: v2.6.0 global npm installs crashed with a 500 error due to a Turbopack/webpack module-name hashing bug in the Next.js 16 instrumentation hook.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: Force `better-sqlite3` to always be required by its exact package name in the webpack server bundle. Next.js 16 compiled the instrumentation hook into a separate chunk and emitted `require('better-sqlite3-<hash>')` — a hashed module name that doesn't exist in `node_modules` — even though the package was listed in `serverExternalPackages`. Added an explicit `externals` function to the server webpack config so the bundler always emits `require('better-sqlite3')`, resolving the startup `500 Internal Server Error` on clean global installs. (#394, PR #395)

### 🔧 CI

- **ci**: Added `workflow_dispatch` to `npm-publish.yml` with version sync safeguard for manual triggers (#392)
- **ci**: Added `workflow_dispatch` to `docker-publish.yml`, updated GitHub Actions to latest versions (#392)

---

## [2.6.0] - 2026-03-15

> Issue resolution sprint: 4 bugs fixed, logs UX improved, Kiro credit tracking added.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(media)**: ComfyUI and SD WebUI no longer appear in the Media page provider list when unconfigured — fetches `/api/providers` on mount and hides local providers with no connections (#390)
- **fix(auth)**: Round-robin no longer re-selects rate-limited accounts immediately after cooldown — `backoffLevel` is now used as primary sort key in the LRU rotation (#340)
- **fix(oauth)**: Qoder (and other providers that redirect to their own UI) no longer leave the OAuth modal stuck at "Waiting for Authorization" — popup-closed detector auto-transitions to manual URL input mode (#344)
- **fix(logs)**: Request log table is now readable in light mode — status badges, token counts, and combo tags use adaptive `dark:` color classes (#378)

### ✨ Features

- **feat(kiro)**: Kiro credit tracking added to usage fetcher — queries `getUserCredits` from AWS CodeWhisperer endpoint (#337)

### 🛠 Chores

- **chore(tests)**: Aligned `test:plan3`, `test:fixes`, `test:security` to use same `tsx/esm` loader as `npm test` — eliminates module resolution false negatives in targeted runs (PR #386)

---

## [2.5.9] - 2026-03-15

> Codex native passthrough fix + route body validation hardening.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(codex)**: Preserve native Responses API passthrough for Codex clients — avoids unnecessary translation mutations (PR #387)
- **fix(api)**: Validate request bodies on pricing/sync and task-routing routes — prevents crashes from malformed inputs (PR #388)
- **fix(auth)**: JWT secrets persist across restarts via `src/lib/db/secrets.ts` — eliminates 401 errors after pm2 restart (PR #388)

---

## [2.5.8] - 2026-03-15

> Build fix: restore VPS connectivity broken by v2.5.7 incomplete publish.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: `scripts/prepublish.mjs` still used deprecated `--webpack` flag causing Next.js standalone build to fail silently — npm publish completed without `app/server.js`, breaking VPS deployment

---

## [2.5.7] - 2026-03-15

> Media playground error handling fixes.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(media)**: Transcription "API Key Required" false positive when audio contains no speech (music, silence) — now shows "No speech detected" instead
- **fix(media)**: `upstreamErrorResponse` in `audioTranscription.ts` and `audioSpeech.ts` now returns proper JSON (`{error:{message}}`), enabling correct 401/403 credential error detection in the MediaPageClient
- **fix(media)**: `parseApiError` now handles Deepgram's `err_msg` field and detects `"api key"` in error messages for accurate credential error classification

---

## [2.5.6] - 2026-03-15

> Critical security/auth fixes: Antigravity OAuth broken + JWT sessions lost after restart.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(oauth) #384**: Antigravity Google OAuth now correctly sends `client_secret` to the token endpoint. The fallback for `ANTIGRAVITY_OAUTH_CLIENT_SECRET` was an empty string, which is falsy — so `client_secret` was never included in the request, causing `"client_secret is missing"` errors for all users without a custom env var. Closes #383.
- **fix(auth) #385**: `JWT_SECRET` is now persisted to SQLite (`namespace='secrets'`) on first generation and reloaded on subsequent starts. Previously, a new random secret was generated each process startup, invalidating all existing cookies/sessions after any restart or upgrade. Affects both `JWT_SECRET` and `API_KEY_SECRET`. Closes #382.

---

## [2.5.5] - 2026-03-15

> Model list dedup fix, Electron standalone build hardening, and Kiro credit tracking.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(models) #380**: `GET /api/models` now includes provider aliases when building the active-provider filter — models for `claude` (alias `cc`) and `github` (alias `gh`) were always shown regardless of whether a connection was configured, because `PROVIDER_MODELS` keys are aliases but DB connections are stored under provider IDs. Fixed by expanding each active provider ID to also include its alias via `PROVIDER_ID_TO_ALIAS`. Closes #353.
- **fix(electron) #379**: New `scripts/prepare-electron-standalone.mjs` stages a dedicated `/.next/electron-standalone` bundle before Electron packaging. Aborts with a clear error if `node_modules` is a symlink (electron-builder would ship a runtime dependency on the build machine). Cross-platform path sanitization via `path.basename`. By @kfiramar.

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(kiro) #381**: Kiro credit balance tracking — usage endpoint now returns credit data for Kiro accounts by calling `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (same endpoint Kiro IDE uses internally). Returns remaining credits, total allowance, renewal date, and subscription tier. Closes #337.

## [2.5.4] - 2026-03-15

> Logger startup fix, login bootstrap security fix, and dev HMR reliability improvement. CI infrastructure hardened.

### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(logger) #376**: Restore pino transport logger path — `formatters.level` combined with `transport.targets` is rejected by pino. Transport-backed configs now strip the level formatter via `getTransportCompatibleConfig()`. Also corrects numeric level mapping in `/api/logs/console`: `30→info, 40→warn, 50→error` (was shifted by one).
- **fix(login) #375**: Login page now bootstraps from the public `/api/settings/require-login` endpoint instead of the protected `/api/settings`. In password-protected setups, the pre-auth page was receiving a 401 and falling back to safe defaults unnecessarily. The public route now returns all bootstrap metadata (`requireLogin`, `hasPassword`, `setupComplete`) with a conservative 200 fallback on error.
- **fix(dev) #374**: Add `localhost` and `127.0.0.1` to `allowedDevOrigins` in `next.config.mjs` — HMR websocket was blocked when accessing the app via loopback address, producing repeated cross-origin warnings.

### 🔧 CI & Infrastructure

- **ESLint OOM fix**: `eslint.config.mjs` now ignores `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**`, and `clipr/**` — ESLint was crashing with a JS heap OOM by scanning VS Code binary blobs and compiled chunks.
- **Unit test fix**: Removed stale `ALTER TABLE provider_connections ADD COLUMN "group"` from 2 test files — column is now part of the base schema (added in #373), causing `SQLITE_ERROR: duplicate column name` on every CI run.
- **Pre-commit hook**: Added `npm run test:unit` to `.husky/pre-commit` — unit tests now block broken commits before they reach CI.

## [2.5.3] - 2026-03-14

> Critical bugfixes: DB schema migration, startup env loading, provider error state clearing, and i18n tooltip fix. Code quality improvements on top of each PR.

### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(db) #373**: Add `provider_connections.group` column to base schema + backfill migration for existing databases — column was used in all queries but missing from schema definition
- **fix(i18n) #371**: Replace non-existent `t("deleteConnection")` key with existing `providers.delete` key — fixes `MISSING_MESSAGE: providers.deleteConnection` runtime error on provider detail page
- **fix(auth) #372**: Clear stale error metadata (`errorCode`, `lastErrorType`, `lastErrorSource`) from provider accounts after genuine recovery — previously, recovered accounts kept appearing as failed
- **fix(startup) #369**: Unify env loading across `npm run start`, `run-standalone.mjs`, and Electron to respect `DATA_DIR/.env → ~/.omniroute/.env → ./.env` priority — prevents generating a new `STORAGE_ENCRYPTION_KEY` over an existing encrypted database

### 🔧 Code Quality

- Documented `result.success` vs `response?.ok` patterns in `auth.ts` (both intentional, now explained)
- Normalized `overridePath?.trim()` in `electron/main.js` to match `bootstrap-env.mjs`
- Added `preferredEnv` merge order comment in Electron startup

> Codex account quota policy with auto-rotation, fast tier toggle, gpt-5.4 model, and analytics label fix.

### ✨ New Features (PRs #366, #367, #368)

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Codex Quota Policy (PR #366)**: Per-account 5h/weekly quota window toggles in Provider dashboard. Accounts are automatically skipped when enabled windows reach 90% threshold and re-admitted after `resetAt`. Includes `quotaCache.ts` with side-effect free status getter.
- **Codex Fast Tier Toggle (PR #367)**: Dashboard → Settings → Codex Service Tier. Default-off toggle injects `service_tier: "flex"` only for Codex requests, reducing cost ~80%. Full stack: UI tab + API endpoint + executor + translator + startup restore.
- **gpt-5.4 Model (PR #368)**: Adds `cx/gpt-5.4` and `codex/gpt-5.4` to the Codex model registry. Regression test included.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix #356**: Analytics charts (Top Provider, By Account, Provider Breakdown) now display human-readable provider names/labels instead of raw internal IDs for OpenAI-compatible providers.

> Major release: strict-random routing strategy, API key access controls, connection groups, external pricing sync, and critical bug fixes for thinking models, combo testing, and tool name validation.

### ✨ New Features (PRs #363 & #365)

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Strict-Random Routing Strategy**: Fisher-Yates shuffle deck with anti-repeat guarantee and mutex serialization for concurrent requests. Independent decks per combo and per provider.
- **API Key Access Controls**: `allowedConnections` (restrict which connections a key can use), `is_active` (enable/disable key with 403), `accessSchedule` (time-based access control), `autoResolve` toggle, rename keys via PATCH.
- **Connection Groups**: Group provider connections by environment. Accordion view in Limits page with localStorage persistence and smart auto-switch.
- **External Pricing Sync (LiteLLM)**: 3-tier pricing resolution (user overrides → synced → defaults). Opt-in via `PRICING_SYNC_ENABLED=true`. MCP tool `omniroute_sync_pricing`. 23 new tests.
- **i18n**: 30 languages updated with strict-random strategy, API key management strings. pt-BR fully translated.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix #355**: Stream idle timeout increased from 60s to 300s — prevents aborting extended-thinking models (claude-opus-4-6, o3, etc.) during long reasoning phases. Configurable via `STREAM_IDLE_TIMEOUT_MS`.
- **fix #350**: Combo test now bypasses `REQUIRE_API_KEY=true` using internal header, and uses OpenAI-compatible format universally. Timeout extended from 15s to 20s.
- **fix #346**: Tools with empty `function.name` (forwarded by Claude Code) are now filtered before upstream providers receive them, preventing "Invalid input[N].name: empty string" errors.

### 🗑️ Closed Issues

- **#341**: Debug section removed — replacement is `/dashboard/logs` and `/dashboard/health`.

> API Key Round-Robin support for multi-key provider setups, and confirmation of wildcard routing and quota window rolling already in place.

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **API Key Round-Robin (T07)**: Provider connections can now hold multiple API keys (Edit Connection → Extra API Keys). Requests rotate round-robin between primary + extra keys via `providerSpecificData.extraApiKeys[]`. Keys are held in-memory indexed per connection — no DB schema changes required.

### 📝 Already Implemented (confirmed in audit)

- **Wildcard Model Routing (T13)**: `wildcardRouter.ts` with glob-style wildcard matching (`gpt*`, `claude-?-sonnet`, etc.) is already integrated into `model.ts` with specificity ranking.
- **Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` already auto-advances the window — if `Date.now() > entry.until`, lock is deleted immediately (no stale blocking).

> UI polish, routing strategy additions, and graceful error handling for usage limits.

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Fill-First & P2C Routing Strategies**: Added `fill-first` (drain quota before moving on) and `p2c` (Power-of-Two-Choices low-latency selection) to combo strategy picker, with full guidance panels and color-coded badges.
- **Free Stack Preset Models**: Creating a combo with the Free Stack template now auto-fills 7 best-in-class free provider models (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Users just activate the providers and get a $0/month combo out-of-the-box.
- **Wider Combo Modal**: Create/Edit combo modal now uses `max-w-4xl` for comfortable editing of large combos.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Limits page HTTP 500 for Codex & GitHub**: `getCodexUsage()` and `getGitHubUsage()` now return a user-friendly message when the provider returns 401/403 (expired token), instead of throwing and causing a 500 error on the Limits page.
- **MaintenanceBanner false-positive**: Banner no longer shows "Server is unreachable" spuriously on page load. Fixed by calling `checkHealth()` immediately on mount and removing stale `show`-state closure.
- **Provider icon tooltips**: Edit (pencil) and delete icon buttons in the provider connection row now have native HTML tooltips — all 6 action icons are now self-documented.

> Multiple improvements from community issue analysis, new provider support, bug fixes for token tracking, model routing, and streaming reliability.

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Task-Aware Smart Routing (T05)**: Automatic model selection based on request content type — coding → deepseek-chat, analysis → gemini-2.5-pro, vision → gpt-4o, summarization → gemini-2.5-flash. Configurable via Settings. New `GET/PUT/POST /api/settings/task-routing` API.
- **HuggingFace Provider**: Added HuggingFace Router as an OpenAI-compatible provider with Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini.
- **Vertex AI Provider**: Added Vertex AI (Google Cloud) provider with Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex.
- **Playground File Uploads**: Audio upload for transcription, image upload for vision models (auto-detect by model name), inline image rendering for image generation results.
- **Model Select Visual Feedback**: Already-added models in combo picker now show ✓ green badge — prevents duplicate confusion.
- **Qwen Compatibility (PR #352)**: Updated User-Agent and CLI fingerprint settings for Qwen provider compatibility.
- **Round-Robin State Management (PR #349)**: Enhanced round-robin logic to handle excluded accounts and maintain rotation state correctly.
- **Clipboard UX (PR #360)**: Hardened clipboard operations with fallback for non-secure contexts; Claude tool normalization improvements.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #302 — OpenAI SDK stream=False drops tool_calls**: T01 Accept header negotiation no longer forces streaming when `body.stream` is explicitly `false`. Was causing tool_calls to be silently dropped when using the OpenAI Python SDK in non-streaming mode.
- **Fix #73 — Claude Haiku routed to OpenAI without provider prefix**: `claude-*` models sent without a provider prefix now correctly route to the `antigravity` (Anthropic) provider. Added `gemini-*`/`gemma-*` → `gemini` heuristic as well.
- **Fix #74 — Token counts always 0 for Antigravity/Claude streaming**: The `message_start` SSE event which carries `input_tokens` was not being parsed by `extractUsage()`, causing all input token counts to drop. Input/output token tracking now works correctly for streaming responses.
- **Fix #180 — Model import duplicates with no feedback**: `ModelSelectModal` now shows ✓ green highlight for models already in the combo, making it obvious they're already added.
- **Media page generation errors**: Image results now render as `<img>` tags instead of raw JSON. Transcription results shown as readable text. Credential errors show an amber banner instead of silent failure.
- **Token refresh button on provider page**: Manual token refresh UI added for OAuth providers.

### 🔧 Improvements

- **Provider Registry**: HuggingFace and Vertex AI added to `providerRegistry.ts` and `providers.ts` (frontend).
- **Read Cache**: New `src/lib/db/readCache.ts` for efficient DB read caching.
- **Quota Cache**: Improved quota cache with TTL-based eviction.

### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)

### 📁 New Files

| File                                          | Purpose                                 |
| --------------------------------------------- | --------------------------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Task-aware routing logic (7 task types) |
| `src/app/api/settings/task-routing/route.ts`  | Task routing config API                 |
| `src/app/api/providers/[id]/refresh/route.ts` | Manual OAuth token refresh              |
| `src/lib/db/readCache.ts`                     | Efficient DB read cache                 |
| `src/shared/utils/clipboard.ts`               | Hardened clipboard with fallback        |

## [2.4.1] - 2026-03-13

### 🐛 Fix

- **Combos modal: Free Stack visible and prominent** — Free Stack template was hidden (4th in 3-column grid). Fixed: moved to position 1, switched to 2x2 grid so all 4 templates are visible, green border + FREE badge highlight.

## [2.4.0] - 2026-03-13

> **Major release** — Free Stack ecosystem, transcription playground overhaul, 44+ providers, comprehensive free tier documentation, and UI improvements across the board.

### ✨ Features

- **Combos: Free Stack template** — New 4th template "Free Stack ($0)" using round-robin across Kiro + Qoder + Qwen + Gemini CLI. Suggests the pre-built zero-cost combo on first use.
- **Media/Transcription: Deepgram as default** — Deepgram (Nova 3, $200 free) is now the default transcription provider. AssemblyAI ($50 free) and Groq Whisper (free forever) shown with free credit badges.
- **README: "Start Free" section** — New early-README 5-step table showing how to set up zero-cost AI in minutes.
- **README: Free Transcription Combo** — New section with Deepgram/AssemblyAI/Groq combo suggestion and per-provider free credit details.
- **providers.ts: hasFree flag** — NVIDIA NIM, Cerebras, and Groq marked with hasFree badge and freeNote for the providers UI.
- **i18n: templateFreeStack keys** — Free Stack combo template translated and synced to all 30 languages.

## [2.3.16] - 2026-03-13

### 📖 Documentation

- **README: 44+ Providers** — Updated all 3 occurrences of "36+ providers" to "44+" reflecting the actual codebase count (44 providers in providers.ts)
- **README: New Section "🆓 Free Models — What You Actually Get"** — Added 7-provider table with per-model rate limits for: Kiro (Claude unlimited via AWS Builder ID), Qoder (5 models unlimited), Qwen (4 models unlimited), Gemini CLI (180K/mo), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1M tok/day / 60K TPM), Groq (30 RPM / 14.4K RPD). Includes the \/usr/bin/bash Ultimate Free Stack combo recommendation.
- **README: Pricing Table Updated** — Added Cerebras to API KEY tier, fixed NVIDIA from "1000 credits" to "dev-forever free", updated Qoder/Qwen model counts and names
- **README: Qoder 8→5 models** (named: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2)
- **README: Qwen 3→4 models** (named: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)

## [2.3.15] - 2026-03-13

### ✨ Features

- **Auto-Combo Dashboard (Tier Priority)**: Added `🏷️ Tier` as the 7th scoring factor label in the `/dashboard/auto-combo` factor breakdown display — all 7 Auto-Combo scoring factors are now visible.
- **i18n — autoCombo section**: Added 20 new translation keys for the Auto-Combo dashboard (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) to all 30 language files.

## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Qoder OAuth (#339)**: Restored the valid default `clientSecret` — was previously an empty string, causing "Bad client credentials" on every connect attempt. The public credential is now the default fallback (overridable via `QODER_OAUTH_CLIENT_SECRET` env var).
- **MITM server not found (#335)**: `prepublish.mjs` now compiles `src/mitm/*.ts` to JavaScript using `tsc` before copying to the npm bundle. Previously only raw `.ts` files were copied — meaning `server.js` never existed in npm/Volta global installs.
- **GeminiCLI missing projectId (#338)**: Instead of throwing a hard 500 error when `projectId` is missing from stored credentials (e.g. after Docker restart), OmniRoute now logs a warning and attempts the request — returning a meaningful provider-side error instead of an OmniRoute crash.
- **Electron version mismatch (#323)**: Synced `electron/package.json` version to `2.3.13` (was `2.0.13`) so the desktop binary version matches the npm package.

### ✨ New Models (#334)

- **Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto`
- **Codex**: `gpt5.4`

### 🔧 Improvements

- **Tier Scoring (API + Validation)**: Added `tierPriority` (weight `0.05`) to the `ScoringWeights` Zod schema and the `combos/auto` API route — the 7th scoring factor is now fully accepted by the REST API and validated on input. `stability` weight adjusted from `0.10` to `0.05` to keep total sum = `1.0`.

### ✨ New Features

- **feat(docs):** integrate multi-page documentation into OmniRoute dashboard (#1969)
- **feat(settings):** add request body limit setting (#1968)
- **feat(auth):** add Gemini CLI OAuth client secret default (#1974)
- **feat(models):** expose models.dev context windows in /v1/models (#1972)
- **fix(db):** resolve legacy encryption fallback causing re-encryption loops (#1941)
- **fix(auth):** fix Codex assistant final_answer response sanitization (#1965)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Tiered Quota Scoring (Auto-Combo)**: Added `tierPriority` as a 7th scoring factor — accounts with Ultra/Pro tiers are now preferred over Free tiers when other factors are equal. New optional fields `accountTier` and `quotaResetIntervalSecs` on `ProviderCandidate`. All 4 mode packs updated (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`).
- **Intra-Family Model Fallback (T5)**: When a model is unavailable (404/400/403), OmniRoute now automatically falls back to sibling models from the same family before returning an error (`modelFamilyFallback.ts`).
- **Configurable API Bridge Timeout**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var lets operators tune the proxy timeout (default 30s). Fixes 504 errors on slow upstream responses. (#332)
- **Star History**: Replaced star-history.com widget with starchart.cc (`?variant=adaptive`) in all 30 READMEs — adapts to light/dark theme, real-time updates.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Auth — First-time password**: `INITIAL_PASSWORD` env var is now accepted when setting the first dashboard password. Uses `timingSafeEqual` for constant-time comparison, preventing timing attacks. (#333)
- **README Truncation**: Fixed a missing `</details>` closing tag in the Troubleshooting section that caused GitHub to stop rendering everything below it (Tech Stack, Docs, Roadmap, Contributors).
- **pnpm install**: Removed redundant `@swc/helpers` override from `package.json` that conflicted with the direct dependency, causing `EOVERRIDE` errors on pnpm. Added `pnpm.onlyBuiltDependencies` config.
- **CLI Path Injection (T12)**: Added `isSafePath()` validator in `cliRuntime.ts` to block path traversal and shell metacharacters in `CLI_*_BIN` env vars.
- **CI**: Regenerated `package-lock.json` after override removal to fix `npm ci` failures on GitHub Actions.

### 🔧 Improvements

- **Response Format (T1)**: `response_format` (json_schema/json_object) now injected as a system prompt for Claude, enabling structured output compatibility.
- **429 Retry (T2)**: Intra-URL retry for 429 responses (2× attempts with 2s delay) before falling back to next URL.
- **Gemini CLI Headers (T3)**: Added `User-Agent` and `X-Goog-Api-Client` fingerprint headers for Gemini CLI compatibility.
- **Pricing Catalog (T9)**: Added `deepseek-3.1`, `deepseek-3.2`, and `qwen3-coder-next` pricing entries.

### 📁 New Files

| File                                       | Purpose                                                  |
| ------------------------------------------ | -------------------------------------------------------- |
| `open-sse/services/modelFamilyFallback.ts` | Model family definitions and intra-family fallback logic |

### Fixed

- **KiloCode**: kilocode healthcheck timeout already fixed in v2.3.11
- **OpenCode**: Add opencode to cliRuntime registry with 15s healthcheck timeout
- **OpenClaw / Cursor**: Increase healthcheck timeout to 15s for slow-start variants
- **VPS**: Install droid and openclaw npm packages; activate CLI_EXTRA_PATHS for kiro-cli
- **cliRuntime**: Add opencode tool registration and increase timeout for continue

## [2.3.11] - 2026-03-12

### Fixed

- **KiloCode healthcheck**: Increase `healthcheckTimeoutMs` from 4000ms to 15000ms — kilocode renders an ASCII logo banner on startup causing false `healthcheck_failed` on slow/cold-start environments

## [2.3.10] - 2026-03-12

### Fixed

- **Lint**: Fix `check:any-budget:t11` failure — replace `as any` with `as Record<string, unknown>` in OAuthModal.tsx (3 occurrences)

### Docs

- **CLI-TOOLS.md**: Complete guide for all 11 CLI tools (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw)
- **i18n**: CLI-TOOLS.md synced to 30 languages with translated title + intro

## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

- **/v1/completions**: New legacy OpenAI completions endpoint — accepts both `prompt` string and `messages` array, normalizes to chat format automatically
- **EndpointPage**: Now shows all 3 OpenAI-compatible endpoint types: Chat Completions, Responses API, and Legacy Completions
- **i18n**: Added `completionsLegacy/completionsLegacyDesc` to 30 language files

### Fixed

- **OAuthModal**: Fix `[object Object]` displayed on all OAuth connection errors — properly extract `.message` from error response objects in all 3 `throw new Error(data.error)` calls (exchange, device-code, authorize)
- Affects Cline, Codex, GitHub, Qwen, Kiro, and all other OAuth providers

## [2.3.7] - 2026-03-12

### Fixed

- **Cline OAuth**: Add `decodeURIComponent` before base64 decode so URL-encoded auth codes from the callback URL are parsed correctly, fixing "invalid or expired authorization code" errors on remote (LAN IP) setups
- **Cline OAuth**: `mapTokens` now populates `name = firstName + lastName || email` so Cline accounts show real user names instead of "Account #ID"
- **OAuth account names**: All OAuth exchange flows (exchange, poll, poll-callback) now normalize `name = email` when name is missing, so every OAuth account shows its email as the display label in the Providers dashboard
- **OAuth account names**: Removed sequential "Account N" fallback in `db/providers.ts` — accounts with no email/name now use a stable ID-based label via `getAccountDisplayName()` instead of a sequential number that changes when accounts are deleted

## [2.3.6] - 2026-03-12

### Fixed

- **Provider test batch**: Fixed Zod schema to accept `providerId: null` (frontend sends null for non-provider modes); was incorrectly returning "Invalid request" for all batch tests
- **Provider test modal**: Fixed `[object Object]` display by normalizing API error objects to strings before rendering in `setTestResults` and `ProviderTestResultsView`
- **i18n**: Added missing keys `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` to `en.json`
- **i18n**: Synchronized 1111 missing keys across all 29 non-English language files using English values as fallbacks

## [2.3.5] - 2026-03-11

### Fixed

- **@swc/helpers**: Added permanent `postinstall` fix to copy `@swc/helpers` into the standalone app's `node_modules` — prevents MODULE_NOT_FOUND crash on global npm installs

## [2.3.4] - 2026-03-10

### Added

- Multiple provider integrations and dashboard improvements
