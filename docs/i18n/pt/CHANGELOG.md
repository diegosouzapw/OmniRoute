# Changelog (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇧🇩 [bn](../bn/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇮🇷 [fa](../fa/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇮🇳 [gu](../gu/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇮🇳 [mr](../mr/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇰🇪 [sw](../sw/CHANGELOG.md) · 🇮🇳 [ta](../ta/CHANGELOG.md) · 🇮🇳 [te](../te/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇵🇰 [ur](../ur/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md)

---

## [3.8.31] — 2026-06-20

## [3.8.38] — 2026-06-27

### ✨ New Features

- **feat(sidebar): colored menu icons** — sidebar menu icons now render with a per-item accent color: curated colors for known items (`SIDEBAR_ICON_ACCENTS`) plus a deterministic hash-based fallback (`getSidebarIconAccent`) so every item gets a stable, distinct color across sessions. ([#3812](https://github.com/diegosouzapw/OmniRoute/pull/3812) — thanks @rafacpti23)
- **feat(providers): add Factory (factory.ai) as a subscription gateway provider** — `factory` (Factory Droids' hosted gateway) is now a first-class routing provider on the OpenAI-compatible `https://api.factory.ai/v1` endpoint with Bearer apikey auth; the key is supplied from the Dashboard connection (not env). ([#5065](https://github.com/diegosouzapw/OmniRoute/pull/5065) — thanks @KooshaPari)
- **feat(providers): add Grok Build (xAI) provider with OAuth import-token flow** — `grok-cli` (alias `gc`) routes through Grok's CLI chat proxy; users paste their `~/.grok/auth.json` (or the JWT), with automatic `refresh_token` rotation. The public xAI client_id is embedded via `resolvePublicCred("grok_id")` (Hard Rule #11), never a literal. ([#5020](https://github.com/diegosouzapw/OmniRoute/pull/5020) — thanks @fulorgnas)
- **feat(dashboard): click-to-edit model alias in the provider page** — click an alias to edit it inline (Enter/blur saves, Escape cancels), instead of only being able to delete and re-add it. ([#5119](https://github.com/diegosouzapw/OmniRoute/pull/5119) — thanks @waguriagentic)
- **feat(providers): add ZenMux Free (session-cookie free-tier) provider** — `zenmux-free` (alias `zmf`) with a dedicated executor translating ZenMux's Anthropic-style SSE to OpenAI format; ships 12 free-tier models (DeepSeek V3.2, GLM 4.7 Flash Free, etc.). ([#5105](https://github.com/diegosouzapw/OmniRoute/pull/5105) — thanks @mrnasil)
- **feat(providers): allow local/private provider URLs by default (`Allow Local Provider URLs` flag)** — adding/validating an OpenAI-compatible provider on a loopback/LAN address (e.g. `http://127.0.0.1:3264/api`) was rejected by the SSRF guard with "Blocked private or local provider URL", even though OmniRoute is local-first. A new `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS` feature flag (default **ON**, toggle in Settings → Feature Flags) now scopes the provider-validation guard to allow local/private hosts while still blocking cloud-metadata endpoints (169.254.169.254, metadata.google.internal). Disable it to restore strict public-only blocking. Webhook/remote-image SSRF defaults are unchanged. ([#5066](https://github.com/diegosouzapw/OmniRoute/issues/5066), thanks @daniij)
- **feat(blackbox):** refresh provider model catalog with latest models. (thanks @ptkelanatechsolutions)
- **kiro**: inline `<thinking>` stream splitter — when `<thinking_mode>enabled</thinking_mode>` is present, `assistantResponseEvent` content is now split into separate `delta.content` / `delta.reasoning_content` SSE chunks (new `open-sse/executors/kiroThinking.ts` module wired into `KiroExecutor.transformEventStreamToSSE`).
- **feat(cursor):** parse Cursor Composer DeepSeek-style inline tool calls — Composer `cu/composer-2.5*` models embed tool invocations in their visible text using `<｜tool▁calls▁begin｜>…<｜tool▁calls▁end｜>` markers instead of structured protobuf frames; a new streaming parser (`composerToolCalls.ts`) intercepts these in both streaming and non-streaming paths, suppresses the markers from the client-visible content, and emits proper OpenAI `tool_calls` deltas so downstream clients handle them natively. (thanks @noestelar)
- **feat(proxy):** support auth-less `host:port` batch import and surface proxy-test failures. (thanks @dimaslanjaka)
- **feat(video): Alibaba DashScope video provider (`wan2.7-t2v`)** — adds the `alibaba` video provider (DashScope async task → poll → MP4) wired through the standard apikey credential path, so text-to-video requests can route to Alibaba's `wan2.7-t2v` model. (thanks @josevictorferreira)
- **feat(cc): per-connection "summarized thinking display" toggle for Claude-Code-compatible providers** — exposes a connection-level toggle that drives the existing Copilot summarized-thinking marker, so operators can opt a CC-compatible connection into summarized reasoning display from the UI (schema + request defaults + provider modals, with i18n). (thanks @rdself)
- **feat(compression): compression playground in the studio (Play + Compare tabs)** — `/dashboard/compression/studio` gains a synthetic playground: paste text → per-engine **lanes** (each deterministic engine run alone via `/api/compression/preview`) plus a **combined waterfall** ordered by `stackPriority`, and a free **A/B Compare** grid with on-demand, **USD-capped** fidelity verdicts (`/api/compression/compare` + `compare/verify`). The preview route now uses the real cl100k tokenizer, returns `engineBreakdown`, and accepts an ordered `pipeline[]`; new `compare` / `compare/verify` / `retrieve` routes; the live WS feed moved to `/dashboard/compression/live`. Management-only. ([#5080](https://github.com/diegosouzapw/OmniRoute/pull/5080))
- **feat(dashboard): expose Fusion `judgeModel` + `fusionTuning` in the combo editor** — the Fusion strategy editor now surfaces the judge model (synthesizes the panel answers; defaults to the first panel model) plus the quorum-grace tuning fields (`minPanel`, `stragglerGraceMs`, `panelHardTimeoutMs`) that `open-sse/services/fusion.ts` already reads. Schema-validated + bounded; empty tuning is never persisted. ([#5074](https://github.com/diegosouzapw/OmniRoute/pull/5074))
- **feat(compression): opt-in per-step fidelity gate for the stacked pipeline** — each compression step can now be guarded by a pure fidelity checker (4 invariants, fail-open) so a lossy engine that would degrade the prompt past a threshold is rejected and its lane skipped instead of silently shipping. Configurable via `fidelityGate` (advanced thresholds intentionally API-omitted), with a per-lane rejection breakdown surfaced in the studio playground toggle. ([#5143](https://github.com/diegosouzapw/OmniRoute/pull/5143))
- **feat(compression): fuzzy near-duplicate dedup (session-dedup 2nd pass)** — the session-dedup engine gains a second fuzzy pass that collapses near-duplicate (not just byte-identical) segments, with a playground toggle to compare on/off. ([#5143](https://github.com/diegosouzapw/OmniRoute/pull/5143))
- **feat(quota): opt-in Codex/Claude auto-ping keepalive** — an opt-in background keepalive can periodically ping Codex/Claude connections to keep their session/quota state warm, reducing cold-start failures on the first real request. ([#5102](https://github.com/diegosouzapw/OmniRoute/pull/5102))
- **feat(ops): SRE playbooks + ops helper scripts** — salvaged from a closed stale PR; adds operator runbooks and ops helper scripts. ([#5138](https://github.com/diegosouzapw/OmniRoute/pull/5138) — thanks @KooshaPari / @diegosouzapw)
- **feat(mcp): web-session robustness — cookie dedup + browser-pool observability** — the MCP web-session path now de-duplicates cookies when (re)hydrating a session (avoiding conflicting duplicate `Cookie` headers) and exposes browser-pool observability (pool size / in-use / acquisition metrics) for the headless web providers. ([#5121](https://github.com/diegosouzapw/OmniRoute/pull/5121), builds on [#3368](https://github.com/diegosouzapw/OmniRoute/issues/3368))

### 🔧 Bug Fixes

- **fix(proxy): make the SOCKS5 handshake timeout operator-tunable (`SOCKS_HANDSHAKE_TIMEOUT_MS`)** — under high concurrency against a single residential gateway host, the SOCKS5 connect handshake could exceed the hardcoded 10s even though the proxy was reachable, surfacing as a false `[Proxy Fast-Fail] Proxy unreachable` (the pool size is already tunable via `OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS`). The handshake timeout now reads `SOCKS_HANDSHAKE_TIMEOUT_MS` (default unchanged at `10000`, capped at `120000`) so a concurrency-heavy deployment can raise it without a code change. Mitigation for #5109 (the full concurrency-100 collapse still needs the reporter's live load-test confirmation). ([#5109](https://github.com/diegosouzapw/OmniRoute/issues/5109))
- **fix(api): resolve `GET /v1/models/{id}` case-insensitively** — clients that normalise the model id (e.g. OpenCode requesting `minimax/minimax-m3` for the canonical catalog entry `minimax/MiniMax-M3`) missed the single-model lookup, which is case-sensitive, and fell back to advertising `context_length: 0`. `findModelById` now prefers an exact-case match and falls back to a case-insensitive match, so the real entry (and its context window) is returned regardless of casing. ([#5082](https://github.com/diegosouzapw/OmniRoute/issues/5082))
- **fix(services): embed WS proxy honours `LIVE_WS_HOST`; reject empty `messages` early** — two headless/Docker deployment fixes (#5110). The embed WebSocket proxy (`:20131`) only read `EMBED_WS_PROXY_HOST`, so behind a reverse proxy/tunnel it stayed bound to `127.0.0.1` even with `LIVE_WS_HOST=0.0.0.0` set and the Live dashboard showed "WebSocket disconnected"; it now falls back to `LIVE_WS_HOST` (default still loopback). Separately, a request with an explicitly empty `messages: []` array was forwarded upstream and bounced back as a confusing raw `400/502`; `handleChat` now rejects it up front with a clear `messages: at least one message is required` (Responses-API `input` requests are unaffected). ([#5110](https://github.com/diegosouzapw/OmniRoute/issues/5110))
- **fix(proxy): repair one-click Deno & Cloudflare relay deployments** — the `/api/settings/proxy/test` endpoint only recognized the `vercel` relay type, so testing a deployed Deno or Cloudflare relay returned `proxy.type must be http, https, or socks5` and never reached the relay; it now routes all relay types through `isRelayType()`. On installs with `STORAGE_ENCRYPTION_KEY` the relay-auth token is read via `extractRelayAuth` (encrypted `relayAuthEnc` form), fixing the silent `401` that left `publicIp` null. The Cloudflare Worker upload now sends the script part as `application/javascript` (the API rejects `application/javascript+module`; ES-module semantics come from `main_module`), and the proxy-registry schema accepts the `deno`/`cloudflare` types + `deno-relay`/`cloudflare-relay` sources so editing a deployed relay no longer 400s. ([#5128](https://github.com/diegosouzapw/OmniRoute/issues/5128))
- **fix(kiro): retire `claude-sonnet-4.5` from the Kiro catalog + pin the exact Kiro 400 error** — `claude-sonnet-4.5` left the Kiro free-tier lineup (current active models: Opus 4.8/4.7/4.6, Sonnet 4.6, Haiku 4.5), so it is removed from the Kiro registry entry and the free-model catalog. A regression test now pins Kiro's verbatim `[400] Invalid model. Please select a different model to continue.` to the `isModelUnavailableError` model-unavailable classification. A 400 on every model (including current ones) points to a server-side Kiro tier/region gate, not an OmniRoute catalog bug. ([#5140](https://github.com/diegosouzapw/OmniRoute/pull/5140), closes [#4484](https://github.com/diegosouzapw/OmniRoute/issues/4484))
- **fix(dashboard): preserve every rendered field when loading/saving Resilience settings** — `ResilienceTab` renders `comboCooldownWait` and `quotaShareConcurrencyLimit`, but both the initial-load and save paths rewrote component state without those fields, so after a successful `/api/resilience` response the cards received `undefined` and the page fell back to the generic "failed to load" state. A shared `toResilienceResponse()` mapper now keeps all rendered fields, and `PATCH /api/resilience` returns `quotaShareConcurrencyLimit` to match GET and the UI contract. ([#5139](https://github.com/diegosouzapw/OmniRoute/pull/5139) — thanks @rdself)
- **fix(quota): hydrate the in-memory quota cache from snapshots + scope auto-combo candidates** — after a restart the quota cache was empty, so a known-exhausted connection looked healthy until re-queried; `isAccountQuotaExhausted` now lazily hydrates from persisted `quota_snapshots`. Auto-combo candidate expansion is also scoped to the connections each combo target actually allows, instead of pulling in every connection for the provider. ([#5015](https://github.com/diegosouzapw/OmniRoute/pull/5015) — thanks @JxnLexn)
- **fix(resilience): harden quota cutoff, Gemini audio MIME, and model-lockout cooldown** — stored quota hard-cutoff values are no longer coerced to `enabled=true` from arbitrary strings; Gemini audio input parts have their MIME type validated/normalized before forwarding; and model lockout now honours the configured `maxCooldownMs` ceiling. ([#5093](https://github.com/diegosouzapw/OmniRoute/pull/5093) — thanks @KooshaPari)
- **fix(streaming): harden long OpenAI-compatible SSE streams** — a late pipeline-wind-down error can no longer overwrite an already-recorded successful stream (`streamCompletionRecorded` guard), client disconnects finalize as `499 client_disconnected` instead of poisoning provider/account failure state, JSON bodies that are actually SSE (wrong `application/json` content-type) are sniffed and re-streamed, and reasoning fields (`reasoning`/`reasoning_content` + OpenRouter/Gemini encrypted `reasoning_details`) are preserved through the JSON-as-SSE fallback. ([#5124](https://github.com/diegosouzapw/OmniRoute/pull/5124) — thanks @rdself)
- **fix(usage): dedupe request-usage logging and debounce stats events** — `saveRequestUsage` now guards against duplicate inserts (natural key: timestamp + provider + model + connection + api-key + token counts), back-fills a missing `endpoint`, and only emits `usageRecorded` when a row was actually inserted; stats `update`/`pending` event bursts are collapsed into a single debounced notification to reduce churn. ([#4940](https://github.com/diegosouzapw/OmniRoute/pull/4940) — thanks @nguyenxvotanminh3)
- **fix(sse): convert the native Gemini request body to OpenAI format in the Antigravity MITM handler** — `contents` / `systemInstruction` / `generationConfig` / `thinkingConfig` are now translated to OpenAI chat-completions format before forwarding to `/v1/chat/completions`, so thinking-capable models (e.g. `ag/claude-opus-4-6-thinking`) no longer fail with provider-side 400 "invalid argument" errors. ([#4845](https://github.com/diegosouzapw/OmniRoute/pull/4845) — thanks @anuragg-saxenaa)
- **fix(db): translate the two pt-BR SQLite driver-fallback log lines to English** — `[DB] Pré-inicializando sql.js WASM…` and `[DB] Drivers síncronos indisponíveis…` were the only non-English server log strings, mixing languages in the logs. Now `[DB] Pre-initializing sql.js WASM (synchronous drivers unavailable)…` / `[DB] Synchronous drivers unavailable — falling back to sql.js (WASM)`, guarded by a test that scans the driver path for accented log strings. ([#5103](https://github.com/diegosouzapw/OmniRoute/issues/5103))
- **fix(diagnostics): non-streaming Claude responses no longer false-502 as `empty_choices`** — the v3.8.37 malformed-200 detector (#4942) only understood OpenAI `choices` and Responses-API `output` shapes, so a `/v1/messages` response that stays in Claude shape (`{type:"message", content:[…]}`) fell through to `empty_choices` → 502 (cascading to "All models failed" in a combo). Most visibly, an extended-thinking turn whose buffered body is a single **empty thinking block with a valid `signature`** (Claude Code's non-streaming Bash classifier) 502'd on every call. `detectMalformedNonStream` now understands the Claude shape: text/tool_use blocks and thinking blocks carrying a signature count as valid output, while a genuinely empty `content:[]` is still flagged. ([#5108](https://github.com/diegosouzapw/OmniRoute/issues/5108), thanks @insoln)
- **fix(combo): empty-content 502 now fails over within the same request instead of exhausting the provider** — a leg that answers HTTP 200 with no usable completion is rewritten to `502 "Provider returned empty content"`, but the combo exhaustion classifier treated that synthetic 502 as a connection-level failure (`#1731v2`) and marked the whole provider/connection exhausted, skipping every remaining **same-provider** leg in that request. The connection is actually healthy (it just returned an empty body), so empty-content 502s are now classified as model-level transient failures: the request advances to the next leg and the rest of that provider's legs stay eligible. Genuine gateway 502s still trip connection exhaustion. ([#5085](https://github.com/diegosouzapw/OmniRoute/issues/5085), thanks @andrea-kingautomation)
- **fix(dashboard): surface the detailed credential-validation error instead of a bare "invalid" badge** — the inline "Check" in the Add-Connection modal discarded the `error` message returned by `/api/providers/validate` and showed only an `invalid` badge. For web providers (claude-web / chatgpt-web) the real cause is often an environment error the backend already reports (e.g. `TLS impersonation client failed to start: EACCES … mkdir tls-client-node/bin`), so users were left guessing. The modal now renders the full reason next to the badge. ([#5088](https://github.com/diegosouzapw/OmniRoute/issues/5088), thanks @tkhs101)
- **fix(executors): strip `client_metadata` from forwarded body for Cerebras and Mistral** — Cerebras returns 400 (`wrong_api_format`) and Mistral returns 422 (`extra_forbidden`) when the passthrough body carries `client_metadata` (an OpenAI Codex / Claude CLI field with no equivalent on these upstreams). The default executor now drops it for these two providers before sending downstream; other providers (notably `openai`/`codex`) keep it. (thanks @saurabh321gupta)
- **fix(codebuddy):** only send reasoning params when the client requests reasoning. (thanks @anki1kr)
- **fix(sse):** keep streaming for forceStream providers when a JSON client requests it. Providers marked `forceStream:true` reject `stream:false` upstream (HTTP 400); `resolveStreamFlag` now guards against this so stream-only providers keep streaming even when the client sends `Accept: application/json` or `stream:false`. (thanks @anki1kr)
- **fix(sse):** prevent non-JSON SSE lines and duplicate `[DONE]` from breaking clients. (thanks @qianze0628)
- **fix(sse):** dedupe case-variant Anthropic headers in the executor `buildHeaders` path — Node/undici's `fetch` merges `anthropic-version` and `Anthropic-Version` into a single `"v, v"` value that the Anthropic API rejects, so both case variants are now collapsed to one canonical lowercase header (same for `anthropic-beta`). (thanks @Delcado19)
- **oauth(kiro):** support Kiro IDC (organization) token import — when the `~/.aws/sso/cache` token carries a `clientIdHash`, auto-import now reads the linked client registration file to obtain `clientId`/`clientSecret`, probes the Kiro IDE `profile.json` for `profileArn` (ARN region normalized to `us-east-1` for the runtime gateway), and refreshes via the regional AWS OIDC endpoint instead of the social path; the import schema and modal forward these credentials so manual imports also work for IDC tokens. (thanks @enjoyer-hub)
- **fix(translator):** preserve client `cache_control` breakpoints when routing Claude-format requests (e.g. Claude Code) to Alibaba DashScope's OpenAI-compatible providers (`alibaba` / `alibaba-cn`). The Claude→OpenAI translation previously stripped the markers from the system and message text blocks, so DashScope's explicit caching never engaged and every request was a cache miss. Cache hints now survive when preservation is requested for caching-capable OpenAI-format providers. (thanks @sacrtap)
- **fix(tts):** resolve Gemini TTS models from catalog and add `gemini-3.1-flash-tts-preview` as the new default Vertex TTS model. (thanks @nguyenha935)
- **fix(sse): don't cool down a healthy connection on a self-inflicted upstream timeout (504)** — when OmniRoute's own deadline elapses (surfaced as `TimeoutError`/`BodyTimeoutError` → 504), the connection is no longer disabled/failed-over, so a slow-but-healthy provider isn't penalised for our timeout. Genuine upstream 5xx/429 still trigger cooldown; antigravity keeps its own policy. (thanks @costaeder)
- **fix(translator):** forward image `tool_result` blocks as `image_url` instead of stringifying base64. (thanks @alican532)
- **fix(sse): robust Anthropic `/v1/messages` streaming — real ping keepalive + client-disconnect guard** — slow first tokens on reasoning models could trip strict clients' idle-read watchdog; the route now keeps the stream warm with a real `event: ping` (Anthropic clients ignore SSE comments) from the very first frame, and a client disconnect (AbortError / controller-closed) no longer counts as a provider failure (no failover/cooldown). (thanks @costaeder)
- **fix: preserve model hidden flags (`isHidden`) across model sync** — `replaceCustomModels` pruned the compat-override list to the new custom-model ids, silently wiping the `isHidden` flag of eye-hidden SYNCED models on every periodic sync / import (all hidden models turned back on). The redundant cleanup is removed (per-model removal already handles its own compat cleanup), so eye-hidden models stay hidden across re-sync. ([#5086](https://github.com/diegosouzapw/OmniRoute/pull/5086) — thanks @herjarsa)
- **fix(models): derive model-discovery config from the registry `modelsUrl`** — providers absent from the hardcoded `PROVIDER_MODELS_CONFIG` but carrying a registry `modelsUrl` (e.g. MiniMax) now get an auto-derived Bearer `/v1/models` discovery config, so "discover models" works instead of returning nothing. (thanks @herjarsa)
- **fix(compression): resolve worker + rule/filter assets via runtime anchors (standalone bundle)** — the LLMLingua worker and the RTK rule/filter loaders relied on `fileURLToPath(import.meta.url)`, which the standalone bundle freezes to the build-machine path, so the worker never spawned and rule/filter packs failed to resolve. They now anchor on `process.cwd()`/`argv[1]` (with `pathToFileURL` for the worker URL). (thanks @fulorgnas)
- **fix(api): sanitize error responses on seven management routes (Rule #12 hardening)** — `cli-tools/backups`, `cli-tools/guide-settings/[toolId]`, `logs/export`, `models/catalog`, `providers/test-batch`, `settings/import-json` and `usage/proxy-logs` no longer return raw `error.message`; they wrap caught errors in `sanitizeErrorMessage(...)`, and the routes are removed from the `check-error-helper` allowlist. (thanks @JxnLexn)
- **fix(sse): keep `output_text`-only Responses bodies from being dropped/false-502'd** — some upstreams return a shorthand Responses body whose answer is only in `output_text` with an empty `output[]`. `sanitizeResponsesApiResponse` discarded the text, so the response then tripped the malformed-200 guard. The sanitizer now synthesizes an `output[]` message item from a non-empty `output_text` (complements the Claude-native fix in #5108; both stem from #4942).
- **fix(executors): preserve a lone caller-supplied `Anthropic-Version` header casing** — the case-variant dedupe (#4846) unconditionally rewrote `Anthropic-Version`/`Anthropic-Beta` to lowercase even when only one variant was present, clobbering the caller's header. Dedupe now runs only when both case variants coexist (the actual undici-merge collision it was meant to fix).
- **fix(responses):** default `text.format` to `{ type: "text" }` for openai-compatible **responses** providers — some Responses-compatible upstreams (e.g. LM Studio) reject a `text` object missing `text.format` with a 400 `missing_required_parameter`; the default executor now fills the Responses-API default before forwarding (guarded to `openai-compatible-*responses*`, never overwriting an existing format). (thanks @StevanusPangau)
- **fix(translator): stop stripping client-provided `reasoning_content` for reasoning-replay providers** — the #4849 agentic-context strip (which drops `reasoning_content` from tool-call assistant turns to avoid O(n²) token growth) ran unconditionally, so replay providers (DeepSeek V4, Kimi K2, Qwen-Thinking, etc.) lost the client's reasoning and the reasoning-replay cache then overwrote it with a stale cached value (and such upstreams 400 without the original reasoning). The strip now skips reasoning-replay targets while non-reasoning providers keep the O(n²) protection. ([#5122](https://github.com/diegosouzapw/OmniRoute/pull/5122))
- **fix(providers): add MiniMax M3 & Nemotron 3 Ultra to the Cline catalog** — the two models were missing from Cline's provider catalog and could not be selected; both are now registered. ([#5136](https://github.com/diegosouzapw/OmniRoute/pull/5136), closes [#3321](https://github.com/diegosouzapw/OmniRoute/issues/3321))
- **fix(dashboard): key model-visibility toggle on the canonical `providerId`** — the per-model visibility toggle keyed off a display id, so toggling a model on one provider alias could mis-target another; it now keys on the canonical `providerId`. ([#5091](https://github.com/diegosouzapw/OmniRoute/pull/5091) — thanks @Theadd)
- **fix(diagnostics): recognize the Claude API format in `detectMalformedNonStream`** — salvaged null-guard so a Claude-shaped non-streaming body is no longer misclassified. ([#5141](https://github.com/diegosouzapw/OmniRoute/pull/5141) — thanks @herjarsa / @diegosouzapw)
- **fix(logging): track the final connection IDs in failover logs** — failover log lines now record the connection that actually served (or last failed) the request, instead of only the first attempt. ([#5016](https://github.com/diegosouzapw/OmniRoute/pull/5016) — thanks @JxnLexn)
- **fix(sse): ignore disconnect races during in-band stream error handling** — a client disconnect that races with in-band upstream error handling no longer surfaces as a spurious provider failure. ([#5007](https://github.com/diegosouzapw/OmniRoute/pull/5007) — thanks @JxnLexn)
- **fix(dashboard): surface the server error on `handleToggleCombo` failure** — a failed combo toggle now shows the backend error instead of silently no-op'ing. ([#5138](https://github.com/diegosouzapw/OmniRoute/pull/5138) — thanks @KooshaPari / @diegosouzapw)
- **fix(quota): track provider quota reset windows + enrich the Codex playground** — observed quota reset windows are tracked and surfaced, and the Codex playground gains the enriched quota metadata. ([#5141](https://github.com/diegosouzapw/OmniRoute/pull/5141) — thanks @Witroch4 / @diegosouzapw)
- **fix(sidebar): drop the orphan `settings` accent color** — removed a dangling accent-color entry that broke `typecheck:core`. ([#5142](https://github.com/diegosouzapw/OmniRoute/pull/5142))

### 🔒 Security

- **fix(security): exact-host Anthropic `baseUrl` check** — the Anthropic base-URL guard used a substring match that a crafted host could partially satisfy; it now requires an exact host match (resolves CodeQL `js/incomplete-url-substring-sanitization` alert #674). ([#5130](https://github.com/diegosouzapw/OmniRoute/pull/5130))

### 📝 Maintenance

- **refactor(store): remove dead legacy store modules** — salvaged cleanup of unused legacy store code. ([#5138](https://github.com/diegosouzapw/OmniRoute/pull/5138) — thanks @JxnLexn / @diegosouzapw)
- **test(combo): deterministic routing-decision matrix for all 17 strategies** — a deterministic E2E matrix pins the routing decision of every combo strategy. ([#5146](https://github.com/diegosouzapw/OmniRoute/pull/5146))
- **chore:** baseline reconciliations (complexity / file-size / cognitive), golden-snapshot + apikey-count alignment for new providers, orphan-test relocation, release base-red repairs, CHANGELOG i18n mirror sync, and an `actions/cache` 5→6 bump. ([#5145](https://github.com/diegosouzapw/OmniRoute/pull/5145), [#5144](https://github.com/diegosouzapw/OmniRoute/pull/5144), [#5125](https://github.com/diegosouzapw/OmniRoute/pull/5125), [#5126](https://github.com/diegosouzapw/OmniRoute/pull/5126), [#5120](https://github.com/diegosouzapw/OmniRoute/pull/5120), [#5117](https://github.com/diegosouzapw/OmniRoute/pull/5117), [#5112](https://github.com/diegosouzapw/OmniRoute/pull/5112))

---

## [3.8.37] — 2026-06-26

### ✨ New Features

- **feat(providers):** add DGrid AI gateway provider — OpenAI-compatible gateway at `api.dgrid.ai/v1` (alias `dgrid`, API-key auth, passthrough models). Free router tier (10 RPM / 100 RPD); a $5 lifetime top-up raises limits to 20 RPM / 1,000 RPD. ([#4931](https://github.com/diegosouzapw/OmniRoute/pull/4931) — thanks @dgridOP)

- **feat(providers):** add Pioneer AI (Fastino Labs) provider — OpenAI-compatible chat completions at `api.pioneer.ai/v1`. Registered with alias `pn`, `X-API-Key` auth, and a catalog of 10 open-tier serverless models (Qwen3, Llama 3.1/3.2, Gemma 3, SmolLM3). Free $75 credits, no credit card required. Gated enterprise models (Claude/GPT/Gemini) require prior fine-tuning on the Pioneer platform and are intentionally excluded from the catalog. ([#4909](https://github.com/diegosouzapw/OmniRoute/pull/4909) — thanks @HikiNarou)

- **feat(providers):** add xAI Grok inbound translators and a thinking patcher — Grok requests are now translated on the inbound path and reasoning is normalized so Grok modes behave consistently across clients. ([#4910](https://github.com/diegosouzapw/OmniRoute/pull/4910) — thanks @mugnimaestra)

- **feat(oauth):** Codex bulk-import endpoint — `POST /api/oauth/codex/import` accepts multiple Codex OAuth credentials in one call for fast multi-account onboarding. ([#4914](https://github.com/diegosouzapw/OmniRoute/pull/4914) — thanks @beaaan)

- **feat(embeddings):** add a `dimensions` override field to embedding combos so an embedding combo can pin the output vector size per target. ([#4913](https://github.com/diegosouzapw/OmniRoute/pull/4913) — thanks @wenzetan)

- **feat(sse):** auto-promote successful combo model — a new opt-in `comboAutoPromoteEnabled` setting reorders a combo's persisted model list so that, when a combo model responds successfully, it is moved to position #1 for future requests. ([#4852](https://github.com/diegosouzapw/OmniRoute/pull/4852) — thanks @arssnndr)

- **feat(sse):** add toggleable tool-source diagnostics — an opt-in switch surfaces where each tool definition originated when debugging tool-routing issues. ([#4856](https://github.com/diegosouzapw/OmniRoute/pull/4856) — thanks @DuyPrX)

- **feat(headroom):** proxy lifecycle management + dashboard UI — start/stop/monitor a Headroom compression proxy from the dashboard, with Docker sidecar support. ([#4649](https://github.com/diegosouzapw/OmniRoute/pull/4649) — thanks @diegosouzapw / @carmelogunsroses)

- **feat(sse):** `x-omniroute-strip-reasoning` request header to drop `reasoning_content` from upstream responses (opt-in, preserving reasoning-aware clients). ([#4678](https://github.com/diegosouzapw/OmniRoute/pull/4678) — thanks @anuragg-saxenaa / @diegosouzapw)

- **feat(cli):** multi-model support for the Factory Droid CLI integration. ([#4682](https://github.com/diegosouzapw/OmniRoute/pull/4682) — thanks @anuragg-saxenaa / @diegosouzapw)

- **feat(sse):** parse Gemini CLI 429 `retryDelay` from the structured `RetryInfo` payload so cooldowns honor the upstream-provided backoff. ([#4738](https://github.com/diegosouzapw/OmniRoute/pull/4738) — thanks @NoxzRCW)

- **feat(sse):** add GPT-4 and GPT-4o mini to the GitHub Copilot provider catalog. ([#4798](https://github.com/diegosouzapw/OmniRoute/pull/4798), [#4797](https://github.com/diegosouzapw/OmniRoute/pull/4797) — thanks @decolua)

- **feat(api):** add the `MiniMax-M3` pricing row (canonical + lowercase alias) so the new MiniMax default model gets accurate per-request cost accounting instead of falling back to a zero/default rate. ([#4814](https://github.com/diegosouzapw/OmniRoute/pull/4814) — thanks @octo-patch)

### 🔧 Bug Fixes

- **fix(sse):** dense, deterministic `response.output` ordering in `response.completed` — items are now sorted by their actual `output_index` (via a recorded-as-emitted accumulator + stable sort) instead of being rebuilt from unordered state dicts; `normalizeOutputIndex` replaces fragile `parseInt` calls for robust index coercion; superseded tool calls (replaced at the same index mid-stream) are excluded from the final output array. ([#4906](https://github.com/diegosouzapw/OmniRoute/pull/4906) — thanks @Marco9113)

- **fix(sse):** normalize Codex custom/freeform tools (`apply_patch`, `type:"custom"` with no `parameters`) to a `{ input: string }` function schema instead of an empty schema — the empty schema made models invoke `apply_patch` with `{}`, breaking the Codex runtime which expects `{ input: string }`. Also maps `custom_tool_call` / `custom_tool_call_output` input items and streams `apply_patch` tool calls via `custom_tool_call_input.delta`/`.done` events. ([#4862](https://github.com/diegosouzapw/OmniRoute/pull/4862) — thanks @nstung463)

- **fix(sse):** preserve the `required` array when translating Draft 2020-12 antigravity tool schemas (e.g. from OpenCode), stripping unsupported JSON Schema meta keywords while keeping mandatory arguments required so the model no longer calls tools without them. ([#4843](https://github.com/diegosouzapw/OmniRoute/pull/4843) — thanks @anuragg-saxenaa)

- **fix(sse):** Kiro tool-schema sanitizer — strip unsupported JSON-Schema keywords (`anyOf`/`$ref`/`if`-`then`, etc.) and hash-truncate tool names >64 chars before dispatch, mapping the streamed tool-call name back for the client, so Kiro no longer rejects tool calls with `400 "Improperly formed request"`. ([#4847](https://github.com/diegosouzapw/OmniRoute/pull/4847) — thanks @smarthomeblack)

- **fix(sse):** make the `anthropic-version` default-guard case-insensitive for `anthropic-compatible-*` providers, so a caller/operator-supplied `Anthropic-Version` (any casing) is no longer clobbered by a second lowercase `anthropic-version: 2023-06-01` header. ([#4823](https://github.com/diegosouzapw/OmniRoute/pull/4823) — thanks @zakirkun)

- **fix(db):** validate HuggingFace API tokens via the `whoami-v2` endpoint as a pure auth probe so fine-grained Inference-Provider tokens (valid even when model/task endpoints reject them) are no longer falsely marked invalid; only 401/403 means an invalid key, other non-OK statuses surface as transient upstream errors. ([#4819](https://github.com/diegosouzapw/OmniRoute/pull/4819) — thanks @Delcado19)

- **fix(sse):** reject the Anthropic-only `[1m]` context-1m suffix in `buildKiroPayload` before it reaches AWS Bedrock — Kiro is Bedrock-backed and cannot honor the beta, so a forwarded `kr/*[1m]` model id was malformed upstream; callers now get a clear error pointing them at a direct-Anthropic provider for 1M-context routing. ([#4816](https://github.com/diegosouzapw/OmniRoute/pull/4816) — thanks @Delcado19)

- **fix(dashboard):** align the Engine Combos editor engines with the API schema — the named-combos pipeline dropdown offered four engines (`headroom`, `session-dedup`, `ccr`, `llmlingua`) that `PUT /api/context/combos/[id]` rejects, so selecting one made the save return 400 while the UI swallowed the error. The dropdown is now sourced from a single canonical engine map shared with `stackedPipelineStepSchema` (parity guarded by a unit test), and the editor surfaces save errors plus empty-name/empty-pipeline validation instead of failing quietly. ([#5062](https://github.com/diegosouzapw/OmniRoute/pull/5062) — closes #4955)

- **fix(sse):** surface malformed HTTP-200 upstream responses instead of treating them as success, so combo fallback can trigger. ([#4942](https://github.com/diegosouzapw/OmniRoute/pull/4942) — thanks @haipham22)

- **fix(antigravity):** retry transient upstream failures rather than failing the request outright. ([#4941](https://github.com/diegosouzapw/OmniRoute/pull/4941) — thanks @Jordannst)

- **fix(sse):** exclude WS-bridge controller-closed errors from the provider circuit breaker so a client disconnect no longer trips the whole provider. ([#4870](https://github.com/diegosouzapw/OmniRoute/pull/4870) — closes #4602, thanks @huohua-dev)

- **fix(sse):** resolve custom combos by id and case-insensitive name. ([#4869](https://github.com/diegosouzapw/OmniRoute/pull/4869) — closes #4446, thanks @herjarsa)

- **fix(sse):** forward AI SDK image parts in the Responses translator. ([#4859](https://github.com/diegosouzapw/OmniRoute/pull/4859) — thanks @mugnimaestra)

- **fix(sse):** emit valid concatenable Kiro `tool_calls.arguments` deltas. ([#4855](https://github.com/diegosouzapw/OmniRoute/pull/4855) — thanks @wahyuzero)

- **fix(sse):** strip `temperature` for Claude models with extended thinking enabled (the upstream rejects it). ([#4853](https://github.com/diegosouzapw/OmniRoute/pull/4853) — thanks @noestelar)

- **fix(sse):** unwrap the Qoder HTTP-200 SSE error envelope so combo fallback can trigger. ([#4850](https://github.com/diegosouzapw/OmniRoute/pull/4850) — thanks @vianlearns)

- **fix(sse):** strip reasoning blobs from agentic context to prevent O(n²) token growth across multi-turn agent loops. ([#4849](https://github.com/diegosouzapw/OmniRoute/pull/4849) — thanks @GodrezJr2)

- **fix(sse):** close the reasoning block before message content in the Responses stream so clients render reasoning and answer in the right order. ([#4848](https://github.com/diegosouzapw/OmniRoute/pull/4848) — thanks @kwanLeeFrmVi)

- **fix(config):** sync the full SiliconFlow model list into the registry. ([#4844](https://github.com/diegosouzapw/OmniRoute/pull/4844) — thanks @letanphuc)

- **fix(sse):** strip Composer `<｜final｜>` sentinel markers that leaked after Composer reasoning. ([#4842](https://github.com/diegosouzapw/OmniRoute/pull/4842) — thanks @noestelar)

- **fix(build):** trace-include `sql.js`'s `sql-wasm.wasm` in the standalone bundle so SQLite-WASM works in the packaged build. ([#4839](https://github.com/diegosouzapw/OmniRoute/pull/4839) — thanks @Delcado19)

- **fix(cli):** persist lazily-installed native runtime deps (`better-sqlite3`, `systray2`) to the shared runtime `package.json` with `--save-exact` instead of `--no-save`, so installing one no longer prunes the other as "extraneous" — fixing a "No SQLite driver available" failure after a `--tray` install. ([#4841](https://github.com/diegosouzapw/OmniRoute/pull/4841) — thanks @omartuhintvs)

- **fix(sse):** resolve bare model names to a connection's `defaultModel` before upstream calls. ([#4825](https://github.com/diegosouzapw/OmniRoute/pull/4825) — thanks @anuragg-saxenaa)

- **fix(api):** surface a Docker-localhost hint on provider-node validation connection errors. ([#4822](https://github.com/diegosouzapw/OmniRoute/pull/4822) — thanks @anuragg-saxenaa)

- **fix(sse):** strip Gemini built-in tools when `functionDeclarations` are present in the Antigravity envelope (the two are mutually exclusive upstream). ([#4821](https://github.com/diegosouzapw/OmniRoute/pull/4821) — thanks @vanszs)

- **fix(sse):** strip `X-Stainless-*` headers and normalize the SDK `User-Agent` for OpenAI-compatible endpoints. ([#4820](https://github.com/diegosouzapw/OmniRoute/pull/4820) — thanks @anuragg-saxenaa)

- **fix(oauth):** allow a per-connection refresh lead-time override via `providerSpecificData.refreshLeadMs`. ([#4818](https://github.com/diegosouzapw/OmniRoute/pull/4818) — thanks @anuragg-saxenaa)

- **fix(dashboard):** resolve passthrough model aliases by `providerId` in `ModelSelectModal`. ([#4815](https://github.com/diegosouzapw/OmniRoute/pull/4815) — thanks @anuragg-saxenaa)

- **fix(sse):** strip `enumDescriptions` from Antigravity tool schemas. ([#4813](https://github.com/diegosouzapw/OmniRoute/pull/4813), [#4740](https://github.com/diegosouzapw/OmniRoute/pull/4740) — thanks @anuragg-saxenaa)

- **fix(dashboard):** keep the desktop sidebar visible via an explicit CSS class. ([#4812](https://github.com/diegosouzapw/OmniRoute/pull/4812) — thanks @Delcado19)

- **fix(sse):** filter nameless hosted tools when converting Responses API to Chat format. ([#4789](https://github.com/diegosouzapw/OmniRoute/pull/4789) — upstream, thanks Владимир Акимов)

- **fix(sse):** stream-writer mock `abort()` now returns a Promise (test-stability fix). ([#4788](https://github.com/diegosouzapw/OmniRoute/pull/4788) — thanks @decolua)

- **fix(sse):** use the WorkOS auth-token shape for Cline. ([#4787](https://github.com/diegosouzapw/OmniRoute/pull/4787) — thanks @apeltekci)

- **fix(api):** fall back to the existing access token for any OAuth provider when a refresh fails. ([#4786](https://github.com/diegosouzapw/OmniRoute/pull/4786) — thanks @decolua)

- **fix(sse):** read Antigravity usage from the `response.usageMetadata` envelope. ([#4785](https://github.com/diegosouzapw/OmniRoute/pull/4785) — thanks @decolua)

- **fix(oauth):** verify Cursor installation on Linux before auto-import. ([#4770](https://github.com/diegosouzapw/OmniRoute/pull/4770) — upstream, thanks Ibrahim Ryan)

- **fix(cli):** fall back to the default data dir when `DATA_DIR` is not writable. ([#4767](https://github.com/diegosouzapw/OmniRoute/pull/4767) — upstream, thanks Thiên Toán)

- **fix(sse):** `json_schema` fallback for OpenAI-compatible providers that don't support structured outputs. ([#4766](https://github.com/diegosouzapw/OmniRoute/pull/4766) — thanks @mustafabozkaya)

- **fix(cli):** verify launchd registration and skip self-SIGTERM in macOS autostart. ([#4765](https://github.com/diegosouzapw/OmniRoute/pull/4765) — thanks @ntdung6868)

- **fix(sse):** finalize the `tool_calls` `finish_reason` on early stream end in the OpenAI Responses translator. ([#4764](https://github.com/diegosouzapw/OmniRoute/pull/4764) — thanks @decolua)

- **fix(sse):** gate Kiro image attachments behind a Claude-capability check. ([#4763](https://github.com/diegosouzapw/OmniRoute/pull/4763) — thanks @decolua)

- **fix(sse):** track Ollama streaming usage from raw NDJSON chunks. ([#4754](https://github.com/diegosouzapw/OmniRoute/pull/4754) — thanks @fresent)

- **fix(sse):** include low-level cause details in `formatProviderError`. ([#4741](https://github.com/diegosouzapw/OmniRoute/pull/4741) — thanks @decolua)

- **fix(executors):** `anthropic-compatible-*` gateways now get a `Bearer` token alongside `x-api-key`. ([#4729](https://github.com/diegosouzapw/OmniRoute/pull/4729) — thanks @hodtien)

- **fix(translator):** strip the `x-anthropic-billing-header` in the claude-to-openai path. ([#4728](https://github.com/diegosouzapw/OmniRoute/pull/4728) — thanks @weimaozhen)

- **fix(translator):** preserve `reasoning_effort` for non-Copilot Responses clients. ([#4688](https://github.com/diegosouzapw/OmniRoute/pull/4688) — thanks @ryanngit / @diegosouzapw)

- **fix(codex):** treat an OAuth 401 as an unrecoverable refresh failure (stop retrying a dead token). ([#4686](https://github.com/diegosouzapw/OmniRoute/pull/4686) — thanks @sacwooky / @diegosouzapw)

- **fix(translator):** coerce tool descriptions to strings in OpenAI normalization. ([#4675](https://github.com/diegosouzapw/OmniRoute/pull/4675) — thanks @East-rayyy / @diegosouzapw)

- **fix(dashboard):** stop double-masking an already-masked API key in the list view (E2E 3/9 regression). ([#4671](https://github.com/diegosouzapw/OmniRoute/pull/4671) — thanks @diegosouzapw)

- **fix(combo):** flatten Anthropic tool messages + tool history to prevent an upstream 503. ([#4648](https://github.com/diegosouzapw/OmniRoute/pull/4648) — thanks @warelik / @diegosouzapw)

- **fix(providers):** require a Default Model in the compatible-provider API-key setup flow. ([#4641](https://github.com/diegosouzapw/OmniRoute/pull/4641) — thanks @arden1601)

### 🔒 Security

- **fix(auth):** only trust forwarding headers (`X-Forwarded-For` / `X-Real-IP`) from loopback TCP peers, so a non-loopback client can't spoof its origin to bypass local-only route guards. ([#4689](https://github.com/diegosouzapw/OmniRoute/pull/4689) — thanks @Jordannst / @diegosouzapw)

- **fix(sse):** redact the API key from the AUTH debug log in the chat handler. ([#4858](https://github.com/diegosouzapw/OmniRoute/pull/4858) — thanks @sacwooky)

- **fix(oauth):** classify `/api/oauth/cursor/auto-import` as a local-only route in the route guard, so the loopback-enforced process-spawning endpoint can't be reached through a tunneled/leaked JWT (Hard Rule #17). ([#5070](https://github.com/diegosouzapw/OmniRoute/pull/5070) — thanks @diegosouzapw)

### 📝 Maintenance

- **chore(ci):** harden the release flow — decouple the Quality Ratchet from coverage-shard flakes (`if: !cancelled()` + `--allow-missing`), add fast-path drift gates (`check:complexity`, `check:cognitive-complexity`, `check:pack-policy`, `check:build-scope`), and raise the default build heap to 8 GB. ([#5054](https://github.com/diegosouzapw/OmniRoute/pull/5054) — thanks @diegosouzapw)

- **docs(routing):** sync the combo strategy docs for Fusion (17 strategies). ([#5067](https://github.com/diegosouzapw/OmniRoute/pull/5067) — thanks @diegosouzapw)

- **test(sse):** golden-lock the `provider.ts` translate-path across all providers. ([#4734](https://github.com/diegosouzapw/OmniRoute/pull/4734) — thanks @diegosouzapw / @decolua)

- **docs(env):** document `HEADROOM_URL` in `.env.example` + `ENVIRONMENT.md`. (thanks @diegosouzapw)

- **chore(quality):** rebaseline the file-size ratchet across the rc17 PR-batch levas (leva2/leva3/leva4) to absorb cycle drift. (thanks @diegosouzapw)

---

## [3.8.36] — 2026-06-25

### ✨ New Features

**Quota-Share system**

- **feat(quota):** introduce a dedicated `quota-share` combo strategy (Fase 3 #9) — Deficit Round Robin scheduling with per-model in-flight gating (P2C), automatic DB migration that promotes existing `qtSd/*` combos, and per-policy gating so invalid allocations cannot bleed `allow` to unintended connections. ([#4939](https://github.com/diegosouzapw/OmniRoute/pull/4939), [#4901](https://github.com/diegosouzapw/OmniRoute/pull/4901))
- **feat(quota):** multi-window usage buckets, per-(key,model) caps, and session stickiness — connections now track consumption across 5 h, 7 d, and per-model windows; `quota_allocation_model_caps` enforces per-key/model limits; session stickiness preserves prompt-cache integrity across turns. ([#4928](https://github.com/diegosouzapw/OmniRoute/pull/4928), [#4927](https://github.com/diegosouzapw/OmniRoute/pull/4927), [#4929](https://github.com/diegosouzapw/OmniRoute/pull/4929))
- **feat(quota):** headroom strategy + proactive saturation — new `headroom` combo strategy selects connections by available quota margin; universal proactive saturation via upstream token-usage response headers; real Claude quota saturation sourced from `/api/oauth/usage`. ([#4908](https://github.com/diegosouzapw/OmniRoute/pull/4908), [#4907](https://github.com/diegosouzapw/OmniRoute/pull/4907), [#4885](https://github.com/diegosouzapw/OmniRoute/pull/4885))
- **feat(quota):** concurrency control + cooldown-wait (Fase 2.1) — `max_concurrent` is enforced at dispatch time; quota-share combos queue concurrent requests with a short cooldown-wait and re-dispatch on slot availability (Variant A); a cron heal proactively restores connections after their window resets. ([#4965](https://github.com/diegosouzapw/OmniRoute/pull/4965), [#4970](https://github.com/diegosouzapw/OmniRoute/pull/4970), [#4967](https://github.com/diegosouzapw/OmniRoute/pull/4967), [#4900](https://github.com/diegosouzapw/OmniRoute/pull/4900))

**Combo routing**

- **feat(combo):** task-aware routing strategy — routes requests to the best-fit connection based on task-type metadata, enabling per-task provider specialization within a combo. ([#4945](https://github.com/diegosouzapw/OmniRoute/pull/4945))
- **feat(combo):** Fusion strategy (16th strategy) — fan out to a configurable panel of models in parallel, then synthesize results through a judge model. ([#4652](https://github.com/diegosouzapw/OmniRoute/pull/4652))
- **feat(combos):** add an editable per-combo `description` field. The routing-combo form now has a Description input, persisted in the combo `data` blob via `/api/combos` (POST/PUT) and round-tripped through GET — no new DB column. ([#5005](https://github.com/diegosouzapw/OmniRoute/issues/5005))
- **feat(routing):** honor `X-Route-Model` request header to override `body.model`, enabling per-request model switching without modifying the request body. ([#4863](https://github.com/diegosouzapw/OmniRoute/pull/4863) — thanks @costaeder)

**Providers & models**

- **feat(providers):** update volcengine-ark model list, adding DeepSeek-V4-Flash and DeepSeek-V4-Pro. ([#4905](https://github.com/diegosouzapw/OmniRoute/pull/4905) — thanks @kenlin8827)
- **feat(provider):** add CodeBuddy CN (`copilot.tencent.com`) — full OAuth + executor + model catalog stack. ([#4664](https://github.com/diegosouzapw/OmniRoute/pull/4664))
- **feat(opencode-go):** advertise `glm-5.2` and `kimi-k2.7-code` to align with official Go endpoints. ([#4711](https://github.com/diegosouzapw/OmniRoute/pull/4711))
- **feat(sse):** add Google Flow video-generation provider. ([#4769](https://github.com/diegosouzapw/OmniRoute/pull/4769))
- **feat(api/v1):** include alias-backed models in the `/v1/models` listing. ([#4630](https://github.com/diegosouzapw/OmniRoute/pull/4630))

**Proxy pool**

- **feat(proxy-pool):** Cloudflare Workers proxy deployer + pool integration — deploy Cloudflare Workers relays directly from the dashboard and register them in the proxy pool. ([#4640](https://github.com/diegosouzapw/OmniRoute/pull/4640))
- **feat(proxy-pool):** Deno Deploy relays + group action buttons — deploy Deno Deploy relay workers and manage proxy groups with new bulk-action controls. ([#4643](https://github.com/diegosouzapw/OmniRoute/pull/4643))

**Compression & infrastructure**

- **feat(compression):** Kiro/CodeWhisperer tool-result compression engine — dedicated compressor for Kiro/CodeWhisperer tool outputs integrated into the streaming pipeline. ([#4635](https://github.com/diegosouzapw/OmniRoute/pull/4635))
- **feat(endpoint):** per-endpoint custom system prompt injection. A toggle + text field in the Endpoint settings card lets users inject a custom system prompt into every model request, applied via the existing system-prompt engine. Stored in settings DB. ([#5022](https://github.com/diegosouzapw/OmniRoute/pull/5022) — thanks @whale9820)
- **feat(live-ws):** allow non-loopback clients via `LIVE_WS_ALLOWED_HOSTS` env var, enabling multi-host setups to access the live WebSocket API. ([#4877](https://github.com/diegosouzapw/OmniRoute/pull/4877) — thanks @KooshaPari)
- **feat(db):** track API endpoint dimension on `usage_history` for per-endpoint cost and usage analytics. ([#4676](https://github.com/diegosouzapw/OmniRoute/pull/4676))

---

### 🔧 Bug Fixes

**Translator**

- **fix(translator):** regroup parallel tool results to be adjacent to their originating assistant turn, fixing tool-message ordering for providers that require strict interleaving. ([#4882](https://github.com/diegosouzapw/OmniRoute/pull/4882))
- **fix(translator):** preserve literal empty-string tool arguments in OpenAI-to-Claude streaming — they were previously dropped, causing tool calls to arrive with missing parameters. ([#4959](https://github.com/diegosouzapw/OmniRoute/pull/4959))
- **fix(translator):** normalize tools to Anthropic-native shape for non-Anthropic providers, ensuring tool definitions pass validation regardless of the format at the call site. ([#4650](https://github.com/diegosouzapw/OmniRoute/pull/4650))
- **fix(translator):** provider thinking compatibility — correct thinking-block serialization for DeepSeek and Gemini providers. ([#4946](https://github.com/diegosouzapw/OmniRoute/pull/4946))
- **fix(translator):** emit `</think>` close marker for Anthropic thinking blocks, fixing truncated reasoning output in streamed responses. ([#4633](https://github.com/diegosouzapw/OmniRoute/pull/4633))
- **fix(translator):** normalize `developer` role to `system` for OpenAI-format providers. ([#4625](https://github.com/diegosouzapw/OmniRoute/pull/4625))
- **fix(translator):** strip top-level `client_metadata` on the OpenAI passthrough path (port from 9router#1157). ([#4624](https://github.com/diegosouzapw/OmniRoute/pull/4624))
- **fix(translator):** replay `reasoning_content` on plain Xiaomi MiMo turns (port from 9router#1321). ([#4639](https://github.com/diegosouzapw/OmniRoute/pull/4639))

**Copilot / GitHub executor**

- **fix(copilot):** never route Gemini/Claude model variants to the `/responses` endpoint — these models require the chat-completions path only. ([#4627](https://github.com/diegosouzapw/OmniRoute/pull/4627))
- **fix(github):** route Copilot Codex models to `/responses` (port from 9router#102). ([#4626](https://github.com/diegosouzapw/OmniRoute/pull/4626))
- **fix(copilot,antigravity):** cap `maxOutputTokens` at 16384 to stop "Invalid Argument" 400 errors on high-token requests. ([#4636](https://github.com/diegosouzapw/OmniRoute/pull/4636))
- **fix(codex):** drop non-standard `codex.*` streaming events that break `responses.stream` consumers. ([#4715](https://github.com/diegosouzapw/OmniRoute/pull/4715) — thanks @jeffer1312)

**Claude / Anthropic**

- **fix(claude):** omit `adaptive_thinking` and `output_config.effort` for Haiku model variants, which reject those parameters. ([#4661](https://github.com/diegosouzapw/OmniRoute/pull/4661))
- **fix(claude):** skip `mcp__` tool-name cloaking and guard against missing `connectionId` to prevent crashes on Claude-native MCP tool calls. ([#4861](https://github.com/diegosouzapw/OmniRoute/pull/4861) — thanks @costaeder)
- **fix(claude-oauth):** respect `429` backoff headers on the Claude OAuth usage endpoint to reduce polling spam during quota checks. ([#4655](https://github.com/diegosouzapw/OmniRoute/pull/4655))

**Routing & SSE**

- **fix(sse):** fail over on `400` responses that carry rate-limit text in the body, not just on canonical `429` status codes. ([#4986](https://github.com/diegosouzapw/OmniRoute/pull/4986))
- **fix(sse):** honor per-account proxy and fingerprint-rotation settings in the opencode executor. ([#4989](https://github.com/diegosouzapw/OmniRoute/pull/4989))
- **fix(sse):** soft-penalize exhausted providers in auto-combo scoring instead of hard-excluding them, improving fallback resilience. ([#4990](https://github.com/diegosouzapw/OmniRoute/pull/4990))
- **fix(sse):** drop the CCP pin when the pinned provider is durably unhealthy, with anti-flap logic to prevent oscillation. ([#4864](https://github.com/diegosouzapw/OmniRoute/pull/4864) — thanks @costaeder)
- **fix(combo):** fetch models dynamically from custom provider endpoints instead of relying on a static list. ([#4860](https://github.com/diegosouzapw/OmniRoute/pull/4860))
- **fix(combo):** propagate the selected connection ID to fallback error responses so model lockout applies to the correct connection rather than the wrong fallback target. ([#4809](https://github.com/diegosouzapw/OmniRoute/pull/4809) — thanks @Chewji9875)
- **fix(sse):** skip third-party tool-name cloaking for Anthropic-native server tools to prevent naming conflicts. ([#4808](https://github.com/diegosouzapw/OmniRoute/pull/4808) — thanks @NomenAK)

**Quota**

- **fix(quota):** quota-exclusive `qtSd/*` connections now appear in `/v1/models` listings; EPSILON-threshold check no longer falsely blocks under-budget allocations. ([#4830](https://github.com/diegosouzapw/OmniRoute/pull/4830))
- **fix(quota):** migration 107 correctly activates the `quota-share` strategy on existing `qtSd/*` combos. ([#4962](https://github.com/diegosouzapw/OmniRoute/pull/4962))

**API / responses**

- **fix(api):** parse the `/v1/responses` request body once instead of 3–4 times on the hot path, reducing per-request overhead. ([#4958](https://github.com/diegosouzapw/OmniRoute/pull/4958))
- **fix(api):** evict stale in-memory rate-limit windows to stop a slow heap leak on long-running instances. ([#4957](https://github.com/diegosouzapw/OmniRoute/pull/4957))
- **fix(api):** require authentication on the compression `run-telemetry` endpoint; document `OMNIROUTE_EVAL_CREDENTIALS` env var. ([#4796](https://github.com/diegosouzapw/OmniRoute/pull/4796))
- **fix(api):** stop `GET /api/system/env/repair` returning HTTP `500` on packaged installs (it broke the onboarding wizard). `createRequire(import.meta.url)` ran at module top-level; once webpack bundles the route into the standalone build, `import.meta.url` is frozen to the build-machine path and `createRequire` throws during evaluation, so the whole route failed to load. `createRequire` is now resolved lazily inside the guarded `better-sqlite3` block, root-dir resolution falls back to `process.cwd()`, and the route passes an explicit `rootDir`. ([#5028](https://github.com/diegosouzapw/OmniRoute/pull/5028))

**Dashboard**

- **fix(dashboard):** show custom provider given-name instead of internal id across dashboard pages — cache, combo health, compression analytics, cost overview, health/autopilot, provider stats, route explainability, provider utilization, runtime. Adds shared `resolveProviderName` resolver and `useProviderNodeMap` hook. (#4603)
- **fix(dashboard):** on OAuth providers (e.g. GLM Coding), "Test all models" with auto-hide-failed now switches the model list to the "visible" filter after the run, so just-hidden failed models actually disappear on-screen — parity with the passthrough-provider path (#3610). Previously they were hidden in the DB but stayed visible under the "All" filter, so it looked like nothing was hidden. (#4887)
- **fix(dashboard):** restore the home-page provider topology card that was hidden by a default state change in #4596. ([#4963](https://github.com/diegosouzapw/OmniRoute/pull/4963))
- **fix(dashboard):** proxy-pool success gating, sync-timestamp persistence, and opt-in Redis backend. ([#4988](https://github.com/diegosouzapw/OmniRoute/pull/4988))
- **fix(dashboard):** show custom vision models in the LLM selector dropdown. ([#4653](https://github.com/diegosouzapw/OmniRoute/pull/4653))

**Providers**

- **fix(pollinations):** stop forcing `jsonMode` on every request. Pollinations treats `jsonMode=true` as "the model MUST return JSON" and rejects (HTTP 400 "messages must contain the word 'json'") any normal chat request whose messages don't mention "json", so all non-JSON chat was broken. `jsonMode` is now only enabled when the caller actually requests JSON output (`response_format.type` of `json_object` or `json_schema`). (#3981)
- **fix(antigravity):** default `safetySettings` to all-OFF for parity with the native Gemini paths. The Antigravity (Google Cloud Code) request builder set `safetySettings: undefined`, which `JSON.stringify` drops — so no safety settings reached Google and its server-side defaults false-flagged benign technical prompts as `prohibited_content` (HTTP 200 + blocked body, which combo failover treats as terminal). Now honors a caller-supplied value and otherwise defaults to `DEFAULT_SAFETY_SETTINGS`, matching the claude-to-gemini / openai-to-gemini paths. (#5003)
- **fix(antigravity):** exclude the standard Gemini rate-limit message from quota-exhaustion keyword matching to prevent false-positive saturation flags. ([#4810](https://github.com/diegosouzapw/OmniRoute/pull/4810) — thanks @Chewji9875)
- **fix(chatgpt-web):** map the advertised `gpt-5.5`, `gpt-5.5-pro`, `gpt-5.4-pro` and `gpt-5.2-pro` catalog ids to their dash-form ChatGPT backend slugs. They were missing from `MODEL_MAP`, so the executor sent the dot-form id verbatim, which the ChatGPT backend silently ignored and served the default Plus model instead of the requested one. Adds a drift guard asserting no advertised dot-form id reaches the backend verbatim. (#4665)
- **fix(gemini):** preserve the `pattern` field in the Antigravity tool schema sanitizer to avoid stripping valid regex constraints from tool definitions. ([#4651](https://github.com/diegosouzapw/OmniRoute/pull/4651))
- **fix(opencode):** preserve DeepSeek reasoning content in streamed responses. ([#4631](https://github.com/diegosouzapw/OmniRoute/pull/4631))
- **fix(perplexity):** validate API keys via the `/v1/models` endpoint instead of issuing a full chat request. ([#4654](https://github.com/diegosouzapw/OmniRoute/pull/4654))
- **fix(qoder):** exchange PAT for `jt-*` job token before initiating Cosy chat, fixing auth failures after the Qoder credential format change. ([#4884](https://github.com/diegosouzapw/OmniRoute/pull/4884))
- **fix(executors):** strip parameters unsupported by the target provider/model to prevent `400 Invalid parameter` errors on strict endpoints. ([#4658](https://github.com/diegosouzapw/OmniRoute/pull/4658))
- **fix(executors):** preserve literal `reasoning_effort: "max"` for Ollama Cloud instead of normalizing to `xhigh`. Ollama Cloud accepts `high|medium|low|max|none` and rejects `xhigh` (`invalid reasoning value: 'xhigh'`); OpenRouter DeepSeek `max→xhigh` normalization is unaffected. ([#4993](https://github.com/diegosouzapw/OmniRoute/pull/4993) — thanks @Thinkscape)
- **fix(headroom):** translate openai-responses input through OpenAI for external compression. `adaptBodyForCompression` now serialises `function_call_output` items whose `output` field is a JSON object (not a string) so compression engines can process the content — previously those items were excluded from compression because `hasTextContent()` returned false for object values. ([#5023](https://github.com/diegosouzapw/OmniRoute/pull/5023) — thanks @anki1kr)
- **fix(proxy):** fan out direct dispatcher streams to all registered proxy endpoints. ([#4803](https://github.com/diegosouzapw/OmniRoute/pull/4803) — thanks @makcimbx)

**Compression**

- **fix(compression):** eliminate ReDoS in the `math_inline` preservation regex — the previous pattern could catastrophically backtrack on untrusted input. ([#4838](https://github.com/diegosouzapw/OmniRoute/pull/4838))
- **fix(compression):** stop RTK over-truncating file-read tool results — RTK now respects the full content length for file-read outputs. ([#4987](https://github.com/diegosouzapw/OmniRoute/pull/4987))

**Build / CLI / infrastructure**

- **fix(build):** drop `@omniroute/open-sse` from `optimizePackageImports` to fix the Next.js build OOM crash. ([#4968](https://github.com/diegosouzapw/OmniRoute/pull/4968))
- **fix(cli):** SIGKILL the systray child PID before closing the IPC channel to prevent macOS NSStatusItem orphan processes. ([#4732](https://github.com/diegosouzapw/OmniRoute/pull/4732))
- **fix(cli):** bump `better-sqlite3` runtime pin to 12.10.1 for Node 26 compatibility. ([#4685](https://github.com/diegosouzapw/OmniRoute/pull/4685))
- **fix(cli):** harden the systray2 tray runtime (port from 9router#1080). ([#4628](https://github.com/diegosouzapw/OmniRoute/pull/4628))
- **fix(cli-tools):** tolerate JSONC (comments and trailing commas) in tool settings files. ([#4659](https://github.com/diegosouzapw/OmniRoute/pull/4659))
- **fix(install):** make the `transformers` dependency optional so CUDA-host installs that lack Python bindings succeed. ([#4807](https://github.com/diegosouzapw/OmniRoute/pull/4807) — thanks @megamen32)
- **fix(db):** correct storage tuning settings to prevent WAL runaway on high-write workloads. ([#4834](https://github.com/diegosouzapw/OmniRoute/pull/4834) — thanks @rdself)
- **fix(image):** prevent compatible nodes from shadowing provider aliases in the image routing table. ([#4656](https://github.com/diegosouzapw/OmniRoute/pull/4656))

**Plugin**

- **fix(plugin):** opencode `auth.json` dual-key fallback for the auto-prefix migration. The config hook now looks up both the prefixed (`opencode-omniroute`) and bare (`omniroute`) keys, so users who authenticated before the `opencode-` prefix landed no longer need to re-auth. ([#5027](https://github.com/diegosouzapw/OmniRoute/pull/5027) — thanks @herjarsa)

---

### 🔒 Security

- **fix(security):** block SSRF allowlist bypass via `x-relay-path` header manipulation on Deno/Vercel relays. ([#4899](https://github.com/diegosouzapw/OmniRoute/pull/4899))
- **fix(security):** pin image-fetch DNS resolution to prevent SSRF DNS-rebinding attacks (GHSA-cmhj-wh2f-9cgx). ([#4634](https://github.com/diegosouzapw/OmniRoute/pull/4634))
- **fix(security):** do not trust the loopback socket as local-only when the server is behind a reverse proxy, closing a potential auth bypass path. ([#4632](https://github.com/diegosouzapw/OmniRoute/pull/4632))
- **fix(security):** validate the Kiro region parameter to prevent SSRF via crafted region strings (GHSA-6mwv-4mrm-5p3m). ([#4629](https://github.com/diegosouzapw/OmniRoute/pull/4629))
- **fix(copilot):** replace `execSync` shell interpolation with `execFile` in the `runOmniRouteCli` tool to prevent command injection. The user-supplied command is now split into an argv array and passed to `execFile` (no shell), so shell metacharacters are treated as literal text; error output is routed through `sanitizeErrorMessage()`. ([#5024](https://github.com/diegosouzapw/OmniRoute/pull/5024) — thanks @hamsa0x7)

---

### 📝 Maintenance

**God-file decomposition (continued, #3501)**

- **refactor(chatCore):** extracted 12 focused helpers from `chatCore.ts` covering the streaming pipeline (`assembleStreamingPipeline`), cache-store logic (`storeStreamingSemanticCacheResponse`, `storeSemanticCacheResponse`), response headers (`assembleStreamingResponseHeaders`, `buildNonStreamingResponseHeaders`), JSON→SSE bridge (`maybeConvertJsonBodyToSse`), guardrail context (`buildPostCallGuardrailContext`), usage buffer (`applyClientUsageBuffer`), plugin hook (`runPluginOnRequestHook`), analytics (`writeCompressionAnalytics`, `emitOutputStyleTelemetry`), and compression predicates/settings (`resolveCompressionSettings`, et al.). ([#4811](https://github.com/diegosouzapw/OmniRoute/pull/4811)–[#4837](https://github.com/diegosouzapw/OmniRoute/pull/4837))
- **refactor(sse/db/api):** continued decomposition of `services/usage.ts` (extracted quota-core, scalar/format helpers, Antigravity/GLM/MiniMax usage families), `db/core.ts` (schema-column reconciliation, snake↔camel column-mapping), `db/apiKeys.ts` (row-parsers, model-permission matching), and `validation.ts` (URL/headers/transport leaf layer, web-cookie/Meta-AI validators, enterprise-cloud + probe, audio/speech/apikey, search/embedding/rerank, and OpenAI/Anthropic format validators). ([#4921](https://github.com/diegosouzapw/OmniRoute/pull/4921)–[#4956](https://github.com/diegosouzapw/OmniRoute/pull/4956))
- **refactor(pricing/providers):** decomposed `pricing.ts` into shared tiers + partitioned `DEFAULT_PRICING` modules, and split the `providers.ts` catalog into semantic data modules organized by provider family. ([#4917](https://github.com/diegosouzapw/OmniRoute/pull/4917), [#4918](https://github.com/diegosouzapw/OmniRoute/pull/4918))
- **refactor(open-sse):** extract `safeParseJSON` utility and dedup `tryParseJSON` call sites; extract and dedup the fallback `tool_call` ID generation helper. ([#4735](https://github.com/diegosouzapw/OmniRoute/pull/4735), [#4736](https://github.com/diegosouzapw/OmniRoute/pull/4736))

**Quality & CI**

- **chore(quality):** release base-red reconciliation + ratchet rebaselines — file-size, env-doc, and catalog baseline updates across multiple gates. ([#4630](https://github.com/diegosouzapw/OmniRoute/pull/4630), [#4879](https://github.com/diegosouzapw/OmniRoute/pull/4879), [#4886](https://github.com/diegosouzapw/OmniRoute/pull/4886), [#4915](https://github.com/diegosouzapw/OmniRoute/pull/4915), [#4961](https://github.com/diegosouzapw/OmniRoute/pull/4961), [#4973](https://github.com/diegosouzapw/OmniRoute/pull/4973))
- **ci(quality):** shift heavy validation gates to the PR→release merge fast-path to accelerate the release cycle. ([#4857](https://github.com/diegosouzapw/OmniRoute/pull/4857))
- **fix(ci):** include `coverage/lcov.info` in the coverage-report artifact so SonarQube can consume it. ([#4670](https://github.com/diegosouzapw/OmniRoute/pull/4670))
- **fix(test):** validate Anthropic-compatible connections via `POST /v1/messages` for accurate connectivity testing. ([#4657](https://github.com/diegosouzapw/OmniRoute/pull/4657))

**Docs**

- **docs(resilience):** document Quota-Share Concurrency Control — `max_concurrent` enforcement, serialization behavior, and cooldown-wait semantics. ([#4980](https://github.com/diegosouzapw/OmniRoute/pull/4980))
- **docs(perf):** add per-endpoint p50/p95/p99 latency and cost budgets reference. ([#4867](https://github.com/diegosouzapw/OmniRoute/pull/4867) — thanks @KooshaPari)
- **docs(ops):** add canonical incident response runbook. ([#4868](https://github.com/diegosouzapw/OmniRoute/pull/4868) — thanks @KooshaPari)
- **docs(ops):** document the release-green family — `green-prs`, `check:release-green`, `babysit`, and nightly gate workflows. ([#4679](https://github.com/diegosouzapw/OmniRoute/pull/4679))
- **docs(agentbridge):** document Electron `NODE_EXTRA_CA_CERTS`, real model IDs, and identity caveat for agent bridge integrations. ([#4718](https://github.com/diegosouzapw/OmniRoute/pull/4718))
- **docs:** clarify Kiro provides ~50 credits/month per account, not unlimited. ([#4690](https://github.com/diegosouzapw/OmniRoute/pull/4690))

**Misc**

- **chore(claude,codex):** bump pinned CLI identities — Claude `2.1.158 → 2.1.187`, Codex `0.132.0 → 0.142.0`. ([#4883](https://github.com/diegosouzapw/OmniRoute/pull/4883))
- **chore(dashboard):** rename Qoder display label from "Qoder AI" to "Qoder". ([#4733](https://github.com/diegosouzapw/OmniRoute/pull/4733))

---

## [3.8.35] — 2026-06-23

### ✨ New Features

- **Adaptive context compression (Phase 4)**: a four-layer compression upgrade landed across stacked PRs — an **Output Styles** registry (`terse-prose` / `less-code` / `terse-cjk`) ([#4694](https://github.com/diegosouzapw/OmniRoute/pull/4694) — thanks @diegosouzapw), an opt-in **SLM `ultra` tier** (two-tier LLMLingua with heuristic fallback) ([#4707](https://github.com/diegosouzapw/OmniRoute/pull/4707) — thanks @diegosouzapw), a **context-budget adaptive dial** (reserve-output ladder + floor) ([#4716](https://github.com/diegosouzapw/OmniRoute/pull/4716) — thanks @diegosouzapw), and an **offline evaluation harness** (PII-gated corpus, self-test judge, gold-grader, real-pipeline runner behind a `ModelClient` seam) ([#4720](https://github.com/diegosouzapw/OmniRoute/pull/4720) — thanks @diegosouzapw). All four layers share a single `CompressionRunTelemetry` contract.
- **Redoc-rendered API docs**: a consolidated OpenAPI spec now lives at `docs/openapi.yaml` and is served as interactive Redoc documentation at `/api/docs`. ([#4781](https://github.com/diegosouzapw/OmniRoute/pull/4781) — thanks @KooshaPari / @diegosouzapw)

### 🔧 Bug Fixes

- **db-backups**: make the database-import size cap configurable via `OMNIROUTE_DB_IMPORT_MAX_MB` (default 100 MB, 4 GB ceiling) so backups larger than 100 MB can be restored; error message now points to the env var and to VACUUM ([#4757](https://github.com/diegosouzapw/OmniRoute/pull/4757) — closes #4719, thanks @diegosouzapw).
- **Onboarding**: add the missing `onboarding.tiers` step-title translation so the setup wizard no longer crashes with `MISSING_MESSAGE: onboarding.tiers` ([#4755](https://github.com/diegosouzapw/OmniRoute/pull/4755) — closes #4698, thanks @diegosouzapw).
- **deepseek-web**: fold `role:"tool"` results into the single-prompt transcript (`messagesToPrompt`) so tool outputs reach the model instead of being silently dropped when a follow-up turn omits the `tools[]` array ([#4756](https://github.com/diegosouzapw/OmniRoute/pull/4756) — closes #4712, thanks @diegosouzapw).
- **Dashboard**: remove the dead, unconditional `useLiveRequests()` call from `HomePageClient.tsx` — it crashed the `/home` page in production builds with `ReferenceError: useLiveRequests is not defined` (#4759, #4745) and opened the live-dashboard WebSocket even when Provider Topology was hidden (#4596). The live feed remains owned by the settings-gated `HomeProviderTopologySection` ([#4761](https://github.com/diegosouzapw/OmniRoute/pull/4761) — thanks @diegosouzapw).
- **Providers dashboard**: dedupe provider nodes by id when adding a compatible provider (`upsertProviderNodeById`) so the same provider can no longer appear twice and no-op adds don't invalidate the compatible-provider memo ([#4768](https://github.com/diegosouzapw/OmniRoute/pull/4768) — closes #4746, thanks @diegosouzapw).
- **Storage VACUUM**: the scheduled VACUUM job now follows the Storage page settings (`scheduledVacuum` / `vacuumHour`) as the single source of truth; the legacy env-flag control path was removed ([#4726](https://github.com/diegosouzapw/OmniRoute/pull/4726) — thanks @rdself).
- **Tiers**: no-auth providers are now counted as free, and the free-tier filter returns an empty set instead of falling through to every provider ([#4753](https://github.com/diegosouzapw/OmniRoute/pull/4753) — thanks @megamen32 / @diegosouzapw).
- **Combos**: auto-promote `zeroLatencyOptimizationsEnabled` so legacy configs (pre-3.8.33 `fallbackCompressionMode="lite"`) round-trip cleanly on the first GUI edit ([#4774](https://github.com/diegosouzapw/OmniRoute/pull/4774) — thanks @KooshaPari / @diegosouzapw).

### 📝 Maintenance

- **chatCore (#3501)**: continued the incremental decomposition of `executeProviderRequest` and the streaming/non-streaming hooks into pure leaf modules — top-level helpers + 6 pure leaves ([#4571](https://github.com/diegosouzapw/OmniRoute/pull/4571)), `resolveExecutorWithProxy` + `getExecutionCredentials` ([#4646](https://github.com/diegosouzapw/OmniRoute/pull/4646)), Claude message transforms ([#4708](https://github.com/diegosouzapw/OmniRoute/pull/4708)), `persistAttemptLogs` ([#4717](https://github.com/diegosouzapw/OmniRoute/pull/4717)), `stageTrace` + `compressionUsageReceipt` ([#4721](https://github.com/diegosouzapw/OmniRoute/pull/4721)), `prepareUpstreamBody` ([#4730](https://github.com/diegosouzapw/OmniRoute/pull/4730)), parse + non-streaming usage-stats ([#4762](https://github.com/diegosouzapw/OmniRoute/pull/4762)), `recordContextEditingTelemetryHook` ([#4779](https://github.com/diegosouzapw/OmniRoute/pull/4779)), `scheduleQuotaShareConsumption` ([#4780](https://github.com/diegosouzapw/OmniRoute/pull/4780)), `emitRequestGamificationEvent` ([#4776](https://github.com/diegosouzapw/OmniRoute/pull/4776)), `runPluginOnResponseHook` ([#4782](https://github.com/diegosouzapw/OmniRoute/pull/4782)), `scheduleStreamingQuotaShareConsumption` ([#4784](https://github.com/diegosouzapw/OmniRoute/pull/4784)), `recordCompressionCacheStats` ([#4792](https://github.com/diegosouzapw/OmniRoute/pull/4792)), `writeCavemanOutputAnalytics` ([#4794](https://github.com/diegosouzapw/OmniRoute/pull/4794)), `recordStreamingUsageStats` ([#4791](https://github.com/diegosouzapw/OmniRoute/pull/4791)), and `recordStreamingCost` ([#4790](https://github.com/diegosouzapw/OmniRoute/pull/4790)). (thanks @diegosouzapw)
- **Quality**: expand `check:release-green` to reproduce the full release-PR gate set locally ([#4758](https://github.com/diegosouzapw/OmniRoute/pull/4758) — thanks @diegosouzapw).
- **db**: re-export `compressionRunTelemetry` from `localDb` to satisfy the db-rules gate ([#4775](https://github.com/diegosouzapw/OmniRoute/pull/4775) — thanks @diegosouzapw).
- **Security docs**: add a canonical STRIDE-based threat model ([#4783](https://github.com/diegosouzapw/OmniRoute/pull/4783) — thanks @KooshaPari).
- **Tests**: add a smoke test for the home-client dashboard ([#4793](https://github.com/diegosouzapw/OmniRoute/pull/4793) — thanks @JxnLexn).
- **Docs**: credit **ponytail** and **OmniCompress** in the README inspiring-projects list and restore the `check:env-doc-sync` release-green by exempting the harness-only `OMNIROUTE_EVAL_CREDENTIALS` var ([#4799](https://github.com/diegosouzapw/OmniRoute/pull/4799) — thanks @diegosouzapw); declare the Phase 4 compression layers in the README + GUIDE ([#4801](https://github.com/diegosouzapw/OmniRoute/pull/4801) — thanks @diegosouzapw).
- **Quality**: trim `combo-config.test.ts` comments back under the file-size cap (follow-up to #4774) ([#4800](https://github.com/diegosouzapw/OmniRoute/pull/4800) — thanks @diegosouzapw).

---

## [3.8.34] — 2026-06-23

### ✨ New Features

- **feat(executors): Microsoft 365 Copilot pure framing + connection helpers** — adds the request/response framing and connection helpers to support `m365.cloud.microsoft/chat` for individual M365 plans. ([#4696](https://github.com/diegosouzapw/OmniRoute/pull/4696) — thanks @skyzea1 / @diegosouzapw)
- **feat(compression): per-request `x-omniroute-compression` header (Phase 3)** — a request header now overrides the compression plan with the highest precedence (`request-header > routing > profile > auto-trigger > Default > off`), accepting `off` / `default` / `engine:<id>` / `<combo>`. The response echoes `X-OmniRoute-Compression: <mode>; source=<source>`. ([#4645](https://github.com/diegosouzapw/OmniRoute/pull/4645) — thanks @diegosouzapw)
- **feat(audio): MiniMax T2A v2 TTS dispatch in `audioSpeech`** — adds MiniMax text-to-speech dispatch (port of upstream #1043). ([#4553](https://github.com/diegosouzapw/OmniRoute/pull/4553) — thanks @diegosouzapw)
- **feat(opencode): OpenCode Go DeepSeek reasoning variants** — registers the Go DeepSeek reasoning model variants. ([#4647](https://github.com/diegosouzapw/OmniRoute/pull/4647) — thanks @DevEstacion)
- **feat(quota): quota scraping for OpenCode Go and Ollama Cloud** — surfaces quota windows for the OpenCode Go and Ollama Cloud providers. ([#4642](https://github.com/diegosouzapw/OmniRoute/pull/4642) — thanks @JxnLexn)
- **feat(settings): expose stream recovery feature flags** — surfaces the stream-recovery toggles in settings. ([#4586](https://github.com/diegosouzapw/OmniRoute/pull/4586) — thanks @rdself)
- **feat(providers): optional model ID for custom API-key validation** — custom API-key connection tests can now specify the model ID used to validate the key. ([#4555](https://github.com/diegosouzapw/OmniRoute/pull/4555) — thanks @diegosouzapw)

### 🐛 Fixed

- **fix(db): scheduled cleanup actually runs + queries target the real tables (DB-bloat / OOM)** — `runAutoCleanup` was never scheduled, so retention cleanup never executed and tables (`compression_analytics`, `usage_history`, …) grew unbounded into multi-GB SQLite files driving high RSS. Worse, several cleanup queries referenced wrong table/column names (`call_logs.created_at`→`timestamp`, `compression_analytics.created_at`→`timestamp`, `mcp_audit_log`→`mcp_tool_audit`, `a2a_events`→`a2a_task_events`, `memory_entries`→`memories`), so even a manual run silently no-op'd or errored. Fixed the five queries to match the real schema, added `cleanupProxyLogs`, and wired a `startCleanupScheduler` (startup + every 6h, VACUUM after deletes) into `server-init` alongside the existing budget-reset and reasoning-cache jobs. ([#4691](https://github.com/diegosouzapw/OmniRoute/pull/4691), extracted from [#4428](https://github.com/diegosouzapw/OmniRoute/pull/4428) — thanks @oyi77 / @diegosouzapw)
- **fix(routing): include all noAuth models in auto-combos + add reka-flash + best-free template** — noAuth provider models are no longer skipped when building auto-combos, `reka-flash` is registered, and a `best-free` combo template is added. ([#4621](https://github.com/diegosouzapw/OmniRoute/pull/4621) — thanks @oyi77)
- **fix: noAuth provider validation + Kimi executor routing** — corrects noAuth provider membership checks and removes a mis-routed Kimi alias. (closes #4620) ([#4699](https://github.com/diegosouzapw/OmniRoute/pull/4699) — thanks @oyi77)
- **fix(executors): Firecrawl `web_fetch` 500 with `include_metadata=true`** — fixes a crash when Firecrawl web_fetch is invoked with metadata extraction enabled. ([#4692](https://github.com/diegosouzapw/OmniRoute/pull/4692) — thanks @ponkcore)
- **fix(proxy): apply `pipelining:0` + connections cap to the direct dispatcher** — same-provider concurrent requests no longer serialize behind a long/streaming request on the direct path. ([#4684](https://github.com/diegosouzapw/OmniRoute/pull/4684) — thanks @jeffer1312 / @diegosouzapw)
- **fix(telemetry): back off live-WS event forwarding when the sidecar is unreachable** — stops repeatedly attempting to connect to `LIVE_WS_PORT` when live monitoring is not configured. ([#4687](https://github.com/diegosouzapw/OmniRoute/pull/4687) — thanks @FikFikk / @diegosouzapw)
- **fix(api): serve `GET /v1/models/{model}` as JSON, not the HTML dashboard** — the per-model endpoint (IDs with slashes via a catch-all route) now returns JSON, unbreaking Claude Code. ([#4677](https://github.com/diegosouzapw/OmniRoute/pull/4677) — thanks @papajo / @diegosouzapw)
- **fix(executors): robust deepseek-web tool-call parsing and agentic context retention** — hardens DeepSeek-web tool-call parsing and preserves agentic context across turns. ([#4644](https://github.com/diegosouzapw/OmniRoute/pull/4644) — thanks @BugsBag)
- **fix(cli): authenticate `omniroute logs` and honor the active context** — the `logs` command now authenticates and respects the active context. ([#4638](https://github.com/diegosouzapw/OmniRoute/pull/4638) — thanks @Rahulsharma0810)
- **fix(stream): estimate input tokens when upstream reports `prompt_tokens=0`** — input token usage is estimated when the upstream omits it. ([#4615](https://github.com/diegosouzapw/OmniRoute/pull/4615) — thanks @adivekar-utexas)
- **fix(plugin): auto-prefix providerId with `opencode-` for OpenCode 1.17.8+ native gate** — adapts provider IDs to the OpenCode 1.17.8+ native provider gate. ([#4527](https://github.com/diegosouzapw/OmniRoute/pull/4527) — thanks @herjarsa)
- **fix(catalog): shorten no-thinking gateway prefix to `no-think/`** — renames the no-thinking gateway prefix. ([#4525](https://github.com/diegosouzapw/OmniRoute/pull/4525) — thanks @Rahulsharma0810)
- **fix(models): unknown max output limits no longer default to 8192** — models without synced/registry/static `maxOutputTokens` resolve the limit as unknown instead of a generic 8192 cap; clamping/injection only happens when a real cap is known. ([#4584](https://github.com/diegosouzapw/OmniRoute/pull/4584) — thanks @rdself)
- **fix(resilience): respect upstream retry-hint toggle** — honors the configured toggle for upstream retry hints. ([#4585](https://github.com/diegosouzapw/OmniRoute/pull/4585) — thanks @rdself)
- **fix(providers): show revealed connection API keys** — fixes revealing stored connection API keys in the UI. ([#4583](https://github.com/diegosouzapw/OmniRoute/pull/4583) — thanks @rdself)
- **fix(logs): make active-request stale sweep configurable** — exposes the stale-request sweep interval as a setting. ([#4599](https://github.com/diegosouzapw/OmniRoute/pull/4599) — thanks @rdself)
- **fix(resilience): retain provider cooldowns for the configured max window** — cooldowns persist for the configured maximum window. ([#4588](https://github.com/diegosouzapw/OmniRoute/pull/4588) — thanks @KooshaPari)
- **fix(resilience): reject invalid provider cooldown bounds** — validates cooldown bound configuration. ([#4589](https://github.com/diegosouzapw/OmniRoute/pull/4589) — thanks @KooshaPari)
- **fix(combo): preserve production combo metrics on shadow eviction** — shadow eviction no longer drops production combo metrics. ([#4590](https://github.com/diegosouzapw/OmniRoute/pull/4590) — thanks @KooshaPari)
- **fix(combo): exclude exhausted connections from auto scoring** — exhausted connections are no longer scored as auto-combo candidates. ([#4592](https://github.com/diegosouzapw/OmniRoute/pull/4592) — thanks @KooshaPari)
- **fix(relay): apply IP rate limit to the Bifrost sidecar** — extends IP rate limiting to the Bifrost relay sidecar. ([#4593](https://github.com/diegosouzapw/OmniRoute/pull/4593) — thanks @KooshaPari)
- **fix(bifrost): finalize SSE relay usage after stream** — finalizes relay usage accounting once the SSE stream completes. ([#4612](https://github.com/diegosouzapw/OmniRoute/pull/4612) — thanks @KooshaPari)
- **fix(quota): expose Bailian quota windows** — surfaces Bailian provider quota windows. ([#4610](https://github.com/diegosouzapw/OmniRoute/pull/4610) — thanks @KooshaPari)
- **fix(dashboard): gate home topology live-WS networking behind widget visibility** — the home dashboard no longer starts topology polling / live sockets when topology is hidden. ([#4618](https://github.com/diegosouzapw/OmniRoute/pull/4618), [#4606](https://github.com/diegosouzapw/OmniRoute/pull/4606) — thanks @KooshaPari)
- **fix(dashboard): isolate the quota widget refresh clock** — the quota widget refresh no longer drives unrelated re-renders. ([#4611](https://github.com/diegosouzapw/OmniRoute/pull/4611) — thanks @KooshaPari)
- **fix(dashboard): memoize compatible provider groups** — avoids recomputing compatible provider groups on every render. ([#4613](https://github.com/diegosouzapw/OmniRoute/pull/4613) — thanks @KooshaPari)
- **fix(cli): align `omniroute` data dir and env loading with the runtime** — the CLI's data-dir/env loading no longer drifts from the server runtime configuration. ([#4619](https://github.com/diegosouzapw/OmniRoute/pull/4619), [#4607](https://github.com/diegosouzapw/OmniRoute/pull/4607) — thanks @KooshaPari)
- **fix(api/settings): prevent cached `/api/settings` responses** — disables caching on the settings endpoint (port from 9router#951). ([#4566](https://github.com/diegosouzapw/OmniRoute/pull/4566) — thanks @diegosouzapw)
- **fix(executors): strip temperature for the GitHub Copilot gpt-5.4 family** — removes the unsupported `temperature` param for Copilot gpt-5.4 models (port from 9router#612). ([#4564](https://github.com/diegosouzapw/OmniRoute/pull/4564) — thanks @diegosouzapw)
- **fix(dashboard): keep play_arrow spinning on provider "Test All" buttons** — fixes the spinner state on the provider test buttons (port from 9router#715). ([#4563](https://github.com/diegosouzapw/OmniRoute/pull/4563) — thanks @diegosouzapw)
- **fix(dashboard): surface manual config CTA when Open Claw CLI auto-detect fails** — shows a manual-config call-to-action on the Open Claw CLI card when auto-detection fails. ([#4562](https://github.com/diegosouzapw/OmniRoute/pull/4562) — thanks @diegosouzapw)
- **fix(oauth): update Qwen OAuth URLs from `chat.qwen.ai` to `qwen.ai`** — refreshes the Qwen OAuth endpoints (port of decolua/9router#683). ([#4561](https://github.com/diegosouzapw/OmniRoute/pull/4561) — thanks @diegosouzapw)

### 📝 Maintenance

- **refactor(imageGeneration): extract 8 provider families to co-located files** — splits the image-generation module into eight co-located per-provider files with no behavioral change. ([#4609](https://github.com/diegosouzapw/OmniRoute/pull/4609) — thanks @KooshaPari)
- **deps: bump production + development groups; migrate js-yaml to v5 (ESM)** — dependency bumps plus a `js-yaml` v4→v5 migration to the ESM-only namespace import. ([#4697](https://github.com/diegosouzapw/OmniRoute/pull/4697) — thanks @diegosouzapw)
- **chore(quality): release-green pre-flight validator + nightly signal** — new `npm run check:release-green` (`scripts/quality/validate-release-green.mjs`) reproduces the release-equivalent validation (full unit + vitest + ratchets + typecheck + lint, optional `--with-build` package-artifact) against the current working tree and classifies each red as **HARD** (real defect) vs **DRIFT** (ratchet, rebaselined at release) — purely diagnostic, never blocking contributors. A new `nightly-release-green` workflow runs it on the active release branch and opens/updates a tracking issue on hard failures. Closes the gap where the full gate (`ci.yml`) only ran on the release PR, so reds accrued silently on `release/**` and surfaced in layers at release time. ([#4622](https://github.com/diegosouzapw/OmniRoute/pull/4622) — thanks @diegosouzapw)
- **chore(quality): reconcile file-size baseline for #4644 (`deepseek-web.ts` 1117→1125)** — rebaselines the file-size gate after the deepseek-web hardening. ([#4695](https://github.com/diegosouzapw/OmniRoute/pull/4695) — thanks @diegosouzapw)

---

## [3.8.33] — TBD

_See English CHANGELOG for v3.8.33 details._

## [3.8.32] — TBD

_See English CHANGELOG for v3.8.32 details._

---

## [3.8.31] — 2026-06-20

### ✨ New Features

- **perf(dashboard): combos UI leaf-split, Next.js config tuning, 1-click Redis & Bifrost sidecar** — delivers four of the five performance/UX tracks from the #3932 thread: the combos dashboard page is split into focused leaf components (smaller bundles, faster reloads), `next.config` is tuned for the standalone build, Redis can be provisioned in one click, and a Bifrost sidecar option is wired in. (The fifth track — chatLogHelpers extraction — was already covered upstream and dropped.) ([#4381](https://github.com/diegosouzapw/OmniRoute/pull/4381) — thanks @KooshaPari)

### 🐛 Fixed

- **fix(embeddings): NVIDIA NIM asymmetric embedding models inject the required `input_type`** — NVIDIA NIM asymmetric embedders (e.g. `nvidia/nv-embedqa-e5-v5`) reject requests without an `input_type` parameter with `400 "'input_type' parameter is required"`, but OmniRoute only forwarded `input_type` when the client supplied it — so callers (and OpenAI-style SDKs that don't emit the field) got a hard failure. The embedding registry now carries a model-level default (`input_type: "query"`) for the asymmetric NVIDIA model, and the embeddings handler injects a model's default params into the upstream body **only** when the client didn't already send them — a client-supplied `input_type` (e.g. `"passage"`) is respected unchanged, and symmetric models that carry no default are unaffected. ([#4341](https://github.com/diegosouzapw/OmniRoute/pull/4341) — thanks @hydraromania)
- **fix(api): migrate the deprecated Codex `[features].codex_hooks` flag to `[features].hooks`** — Codex renamed the `codex_hooks` feature flag to `hooks`; recent Codex CLI versions ignore the old key and print a deprecation notice. When OmniRoute rewrites an existing `~/.codex/config.toml` (configuring/resetting the Codex provider) it now carries the user's intent forward by renaming `[features].codex_hooks` → `[features].hooks` (preserving its value, never clobbering an already-present `hooks`) and dropping the deprecated key. No-op when the flag is absent. ([#4342](https://github.com/diegosouzapw/OmniRoute/pull/4342) — thanks @Bian-Sh)
- **fix(translator): same-format response path no longer leaks a `data: null` SSE event** — the streaming response translator's same-format fast path returned `[chunk]` unconditionally, so the end-of-stream null/flush signal (`chunk === null`) propagated as a literal `[null]`. Downstream this surfaced as an empty `data: null` SSE event between chunks and crashed strict clients (e.g. Factory Droid BYOK on `/v1/responses`). The fast path now drops the null flush (returns `[]`) while still passing real chunks through unchanged. ([#4344](https://github.com/diegosouzapw/OmniRoute/pull/4344) — thanks @thaitryhand)
- **fix(translator): strip client-only assistant echo fields on the OpenAI target path (Mistral 422)** — strict OpenAI-compatible upstreams (e.g. `mistral/codestral-latest`) reject client-only assistant "echo" fields sent back as input history with `422 extra_forbidden` (the report hit `messages[].assistant.reasoning_content` via Codex `/responses`). Only `reasoning_content` was being stripped on the OpenAI target path; the sibling echo fields `reasoning`, `refusal`, `annotations` and `cache_control` leaked through and tripped the 422. They are now all dropped on the non-reasoner OpenAI target path. `audio` is deliberately preserved (OpenAI audio models reference a prior assistant audio response by id on multi-turn; Mistral never emits audio, so nothing is lost there). ([#4350](https://github.com/diegosouzapw/OmniRoute/pull/4350) — thanks @xxy9468615)
- **fix(translator): accept AI SDK-style `{ type: "image", image: "data:…" }` content parts** — several OpenAI-input translators only recognized images shaped as `image_url.url` (or an object with `.source`/`.url`), so an AI SDK-style part where `image` is a bare data-URL **string** was silently dropped before reaching a vision provider (OpenCode is one affected client; the gap is generic). The OpenAI→Claude, OpenAI→Kiro and OpenAI→Gemini/Antigravity translators now parse a string `image` data URL into each provider's native image shape (Claude `{source:{type:"base64"}}`, Kiro `images[].source.bytes`, Gemini `inlineData`). ([#4345](https://github.com/diegosouzapw/OmniRoute/pull/4345) — thanks @mugnimaestra)
- **fix(translator): Gemini accepts HTTP/HTTPS image URLs instead of silently dropping them** — the OpenAI→Gemini request helper (`convertOpenAIContentToParts`) discarded remote `image_url` parts (emitting only a `console.warn`) because Gemini's `inlineData` needs base64 and the synchronous helper can't fetch+encode upstream. It now uses Gemini's native `fileData: { fileUri }` part for HTTP/HTTPS URLs (the model fetches the asset itself), so vision requests carrying a URL — not a `data:` URI — reach Gemini intact. ([#4373](https://github.com/diegosouzapw/OmniRoute/pull/4373) — ported from 9router#344, thanks @diegosouzapw)
- **fix(executors): strip `stream_options` for qwen non-streaming / thinking Claude-Code requests** — Claude-Code-compatible providers force the executor-level `stream` flag on while the outgoing body keeps the caller's original `stream: false`, so `DefaultExecutor.transformRequest` injected `stream_options: { include_usage: true }` onto a body that still said `stream: false`, and qwen rejected it with `400 "'stream_options' only set this when you set stream: true"`. The executor now strips `stream_options` whenever the body's effective `stream` is false. ([#4374](https://github.com/diegosouzapw/OmniRoute/pull/4374) — ported from 9router#663, thanks @anuragg-saxenaa / @diegosouzapw)
- **fix(executors): don't inject `thinking` when `tool_choice` forces a tool (native Claude)** — the Claude-Code wire-image emulation injects `thinking: { type: "adaptive" }` for non-Haiku Claude models, but Anthropic rejects `thinking` when `tool_choice` forces a specific tool (`{type:"any"|"tool"}`) with `400 "Thinking may not be enabled when tool_choice forces tool use."`. Any Opus/Sonnet call that pins a tool (e.g. Claude Code's `message_user`, or agent harnesses that force a tool) hit a hard 400; the injection is now suppressed when `tool_choice` forces a tool. ([#4389](https://github.com/diegosouzapw/OmniRoute/pull/4389) — thanks @NomenAK)
- **fix(codex): request reasoning summaries on Codex Responses requests** — Codex/OpenAI Responses can return reasoning-token accounting and empty reasoning items unless visible reasoning summaries are requested, so Codex CLI / pi.dev paths missed visible thinking text. OmniRoute now requests `reasoning.summary: "auto"` (and includes `reasoning.encrypted_content`) when reasoning is enabled — preserving an explicit client `reasoning.summary` and existing `include` entries, and skipping it for `reasoning.effort: "none"`. ([#4359](https://github.com/diegosouzapw/OmniRoute/pull/4359) — thanks @xz-dev)
- **fix(sse): default the combo per-target timeout to 120s for fast failover** — a combo's per-target timeout inherited the full `FETCH_TIMEOUT_MS` (600s default) when the combo didn't set `targetTimeoutMs`, so a single hung/slow target (e.g. an openai-compatible upstream returning 524/504) could stall the **whole** combo for up to 10 minutes before failing over. A new `DEFAULT_COMBO_TARGET_TIMEOUT_MS = 120_000` is used as the default-when-unset in `resolveComboTargetTimeoutMs` (backward-compatible 3rd arg, wired in `phaseComboSetup`); an explicit ceiling/opt-out is preserved. ([#4365](https://github.com/diegosouzapw/OmniRoute/pull/4365) — thanks @diegosouzapw)
- **fix(cli): Tailscale login honors `TAILSCALE_AUTHKEY` for non-interactive sign-in** — `startTailscaleLogin` built `tailscale up` without ever reading `process.env.TAILSCALE_AUTHKEY`, so on a pre-authenticated / headless daemon the login waited for an interactive auth URL and timed out (~15s). When `TAILSCALE_AUTHKEY` is set it is now passed via `--auth-key=` (as a spawn argv element — no shell interpolation) so the daemon authenticates non-interactively; when unset, behavior is unchanged. ([#4343](https://github.com/diegosouzapw/OmniRoute/pull/4343) — thanks @ipeterpetrus)
- **fix(dashboard): OAuth modal shows the real error on a non-JSON server response** — the OAuth connect/reauth modal called `await res.json()` unconditionally, so when a build/OAuth endpoint returned a plain-text error (e.g. a `500 Internal Server Error` page) the modal threw `Unexpected token 'I'…` and hid the real failure. Two shared helpers (`parseResponseBody` / `getErrorMessage` in `src/shared/utils/api.ts`) now read the body safely (JSON when it is JSON, raw text otherwise) and surface a clean message either way; all modal fetch sites use them. ([#4351](https://github.com/diegosouzapw/OmniRoute/pull/4351) — thanks @DNNYF)
- **fix(dashboard): a disabled connection's last error is now visible** — the provider card's error badge counts a disabled connection (`isActive === false`) that has an error (its effective status is still error/expired/unavailable), but the connection row hid the `lastError` text for disabled rows — so the operator saw the error count without being able to see what failed. The row now shows the error text whenever there is one, regardless of the active toggle. ([#4352](https://github.com/diegosouzapw/OmniRoute/pull/4352) — thanks @ntdung6868)
- **fix(providers): the "Test Connection One-by-One" OAuth probe can no longer hang the queue forever** — the OAuth connection-test path called bare `fetch(url, { method, headers })` with no `AbortController`/signal/timeout, so when a provider's probe endpoint accepted the socket but never responded, the awaited fetch never settled and the one-by-one test queue stalled indefinitely (the API-key path was already bounded via `validateProviderApiKey`'s `timeoutMs`). Both the initial probe and the post-refresh retry are now bounded with `AbortSignal.timeout(30s)` — matching the API-key path's 30s budget — and a timed-out probe resolves as a failure with a clear `Test timed out after 30s` message in the same shape as every other test error. ([#4347](https://github.com/diegosouzapw/OmniRoute/pull/4347) — thanks @ntdung6868)
- **fix(providers): a deactivated account is labeled distinctly from a revoked token** — a Codex connection whose OAuth refresh is fully healthy but whose ChatGPT account has been deactivated by the provider gets a `401` from the upstream API. The connection test labeled that the same as a bad credential (`Token invalid or revoked` → `upstream_auth_error`), so the operator couldn't tell a deactivated account from a revoked token. The test now reads the `401`/`403` body and, when it indicates account deactivation, classifies it as `account_deactivated` — which the dashboard already renders as "Account Deactivated". A plain auth `401` is unchanged. ([#4353](https://github.com/diegosouzapw/OmniRoute/pull/4353) — thanks @ntdung6868)
- **fix(db): cascade-delete orphaned model aliases when a provider is removed** — deleting a custom provider removed its connections and node but left behind the imported model-alias rows (stored as `key=<alias>`, `value="<providerId>/<model>"`). Those stale aliases then blocked re-importing the same provider — the import dedup treated them as "already exists", so no new models appeared. A new `deleteModelAliasesForProvider(providerId)` DB helper drops every alias whose stored value begins with `<providerId>/` (leaving other providers and user-defined settings aliases untouched), and the provider-node DELETE handler now calls it after removing the connections and node, so a fresh import is unblocked. ([#4348](https://github.com/diegosouzapw/OmniRoute/pull/4348) — thanks @nguyenvanhuy0612)
- **fix(api): persist `max_input_tokens` / `max_output_tokens` when adding a custom model** — `POST /api/provider-models` silently dropped the per-model token limits set in the "add custom model" form: the handler destructured the rest of the body but never read `max_input_tokens` / `max_output_tokens`, and `addCustomModel()` had no parameter for them, so the values were thrown away on write. The DB layer (`inputTokenLimit` / `outputTokenLimit`) and the `/v1/models` catalog already round-trip these fields — only the write path was missing. The validation schema now accepts the two optional limits, the handler forwards them, and `addCustomModel()` persists them so a custom model's context/output window survives into the catalog. ([#4349](https://github.com/diegosouzapw/OmniRoute/pull/4349) — thanks @codename-zen)
- **fix(plugin): the OpenCode static-catalog plugin prefixes combo/raw model keys with the provider id** — OpenCode's static-catalog reader misdetected the `omniroute` provider: combo keys emitted as `combo/MASTER` were parsed as provider `combo` ("No credentials for provider: omniroute"), while a bare-`MASTER` form was misread as a model with no resolvable provider, and mixed `omniroute/MASTER` + bare-raw keys were rejected by OpenCode's schema. The plugin now emits every combo and raw model key prefixed with the `omniroute` provider id, emits the provider id explicitly, and drops the legacy `combo/` prefix — so the static-catalog reader detects the provider and the auth loader returns the right credentials (the catalog-fetch timeout was also raised so a cold-start server doesn't publish an empty stub). ([#4384](https://github.com/diegosouzapw/OmniRoute/pull/4384) — thanks @herjarsa)

### 🔒 Security

- **fix(security): scope the OAuth callback `postMessage` to a trusted-origin allowlist** — the OAuth callback at `/callback` previously posted `{ code, state, … }` to `window.opener.postMessage(…, "*")` whenever the opener was cross-origin, so a hostile page that opened the well-known redirect URI in a popup could receive the OAuth code/state and complete the flow as the user. The wildcard fallback is replaced with iteration over a fixed allowlist (same-origin + Codex's `localhost:1455` / `127.0.0.1:1455` loopback helper); the browser silently drops `postMessage` to any opener whose origin isn't listed. ([#4372](https://github.com/diegosouzapw/OmniRoute/pull/4372) — ported from 9router#998, thanks @aeonframework / @diegosouzapw)
- **fix(mitm): exact host membership in the MITM hosts test (CodeQL false positive)** — `tests/unit/mitm-tool-hosts.test.ts` checked host membership with `Array.includes(host)`, which CodeQL's `js/incomplete-url-substring-sanitization` heuristic misreads as a `String.includes()` URL-substring sanitization test (HIGH false positive). Switched to `.some((h) => h === host)` — identical semantics, no flagged pattern. ([#4386](https://github.com/diegosouzapw/OmniRoute/pull/4386))

### 📝 Maintenance

- **docs: one-time feature-documentation catch-up (v3.8.20 → v3.8.30)** — reconciled the docs with every user-facing feature shipped since v3.8.20: a new README **✨ What's New** section; new guides for [CLI integrations](docs/guides/CLI-INTEGRATIONS.md), [MITM TPROXY transparent decrypt](docs/security/MITM-TPROXY-DECRYPT.md) and [delegated Anthropic Context Editing](docs/compression/CONTEXT_EDITING.md); refreshed AUTO-COMBO (`auto/<category>:<tier>` + Arena-ELO), API_REFERENCE (`x-omniroute-no-memory`), MEMORY (int8 quantization, off-by-default), RESILIENCE (model-lockout success-decay), RTK, AGENTBRIDGE, TRAFFIC_INSPECTOR, GUARDRAILS, CLOUD_AGENT, ENVIRONMENT; regenerated PROVIDER_REFERENCE (231 providers) and synced the provider count in README/CLAUDE/AGENTS. Going forward this runs every release (generate-release step 6b). ([#4391](https://github.com/diegosouzapw/OmniRoute/pull/4391))
- **refactor(chatCore): extract the `checkHeapPressureGuard` leaf (god-file decomposition start)** — first increment of decomposing `chatCore.ts` (~5127 LOC, the hottest path — every chat request flows through `handleChatCore`). The V8 heap-pressure guard at the top of `handleChatCore` (rejects with 503 when `heapUsed` exceeds the shed threshold) is moved to a self-contained, co-located `utils/heapPressure.ts::checkHeapPressureGuard(...)` with no behavior change. ([#4371](https://github.com/diegosouzapw/OmniRoute/pull/4371) — thanks @diegosouzapw)
- **refactor(combo): de-dup the exhausted-target skip predicate across both dispatchers** — the byte-identical `#1731`/`#1731v2` pre-check (skip a target already exhausted on the provider/connection within a request) lived in both combo dispatchers; extracted to a shared `combo/comboPredicates.ts` helper. ([#4362](https://github.com/diegosouzapw/OmniRoute/pull/4362) — thanks @diegosouzapw)
- **refactor(combo): de-dup the upstream-error exhaustion classification across both dispatchers** — both dispatchers ran a near-identical post-error block classifying the upstream error and updating the exhaustion Sets (`#1731` provider exhausted / `#1731v2` connection error / transient rate-limited); extracted to a shared `combo/targetExhaustion.ts::applyComboTargetExhaustion(...)`. ([#4366](https://github.com/diegosouzapw/OmniRoute/pull/4366) — thanks @diegosouzapw)
- **chore(cli): localize CLI / scraping copy and stabilize fetch, memory & coverage handling** — localizes CLI and scraping UX copy plus the Adapta onboarding tutorial (and corrects the CLI Code page title), makes fetch retries honor the start timeout, tightens SSE/response typing, respects configured memory token limits during search, and reduces CI coverage-merge memory by merging V8 data incrementally. ([#4383](https://github.com/diegosouzapw/OmniRoute/pull/4383) — thanks @JxnLexn)
- **test(combo): reset circuit breakers between stream-readiness cases (restore green)** — a stream-readiness fallback case failed on the release branch since the cycle-open tip due to test isolation: earlier combo-dispatch cases in the same file deliberately fail `glm` (tripping the module-level provider circuit breaker), and that OPEN state leaked into the next test so `combo.ts` skipped the model. The test now resets the circuit breakers between cases. ([#4396](https://github.com/diegosouzapw/OmniRoute/pull/4396) — thanks @diegosouzapw)
- **chore(quality): reconcile the complexity ratchet baseline (1896 → 1900)** — absorbs the small complexity-metric increase from the v3.8.31 `/review-prs` merge batch into `quality-baseline.json` so the ratchet reflects the shipped code (no production change). ([#4410](https://github.com/diegosouzapw/OmniRoute/pull/4410) — thanks @diegosouzapw)
- **test/gate: reconcile release-time drift surfaced by the full CI gate** — three already-merged changes left the release branch's full-CI gate red (the per-PR fast gates don't run it): the Gemini `convertOpenAIContentToParts` tests were realigned to the [#4373](https://github.com/diegosouzapw/OmniRoute/pull/4373) HTTP/HTTPS-URL `fileData` pass-through (they still asserted the old warn-and-drop behavior), the `t11` any-budget for `open-sse/executors/base.ts` was raised to 2 with a justification ([#4389](https://github.com/diegosouzapw/OmniRoute/pull/4389) compares `tool_choice` against the string literal `"any"`, not a TS `any` type), and the [#4384](https://github.com/diegosouzapw/OmniRoute/pull/4384) opencode-plugin combos test's net-assert reduction (dropping the obsolete `combo/` namespace) was allowlisted. No production behavior change. (thanks @diegosouzapw)

---

## [3.8.30] — 2026-06-20

### ✨ New Features

- **feat(dashboard): category (media serviceKind) filter on the providers page** — `/dashboard/providers` gains a media-category filter row (Image / Video / Music / Text→Speech / Speech→Text / Embedding) that composes with the existing search, free-only and "show configured only" filters. Membership is derived from the backend media registries (a provider that serves a kind is surfaced even if it never declared `serviceKinds`), keeping the UI in lockstep with the backend. ([#4240](https://github.com/diegosouzapw/OmniRoute/issues/4240))
- **feat(combo): per-step account allowlist — scope a round-robin/weighted step to a subset of a provider's connections** — a combo model step can now carry a first-class account allowlist so a round-robin (or weighted) strategy is scoped to a chosen subset of a provider's connections (e.g. only `foo1`+`foo2` out of `foo1..foo4`) without hand-pinning one step per account. Empty = the whole active pool (unchanged). When a step both has an allowlist and is tag-routed, the two intersect (most-restrictive wins); a single pinned account still takes precedence. The combo builder's Precision step editor gains an optional "Restrict to accounts" picker. ([#3266](https://github.com/diegosouzapw/OmniRoute/issues/3266))
- **feat(providers): add OpenAdapter, dit.ai and TokenRouter as OpenAI-compatible providers** — three community-requested OpenAI-compatible aggregators now register as standard named OpenAI-style providers with live `/v1/models` discovery (the zenmux pattern), falling back to a seeded catalog when the upstream list is unavailable: **OpenAdapter** (`https://api.openadapter.in/v1`, free tier, 70+ open-source models — [#4239](https://github.com/diegosouzapw/OmniRoute/issues/4239)), **dit.ai** (`https://api.dit.ai/v1`, dynamic-pricing router/gateway — [#4155](https://github.com/diegosouzapw/OmniRoute/issues/4155)), and **TokenRouter** (`https://api.tokenrouter.com/v1`, free MiniMax model — [#3841](https://github.com/diegosouzapw/OmniRoute/issues/3841), thanks @FerLuisxd). No custom executor/translator — default OpenAI passthrough.
- **feat(api): `x-omniroute-no-memory` request header — per-request opt-out of memory/skills injection** — clients that manage their own context (e.g. their own RAG/memory) can send `x-omniroute-no-memory: true` (mirrors the existing `x-omniroute-no-cache` convention) to skip the gateway injecting up to `memorySettings.maxTokens` (~2k) tokens of memory **and** skills context into that chat request — avoiding the token/cost inflation it otherwise adds on every call. Absent the header, behavior is unchanged. (PRD-2026-06-19-no-memory-header)
- **feat(dashboard): MITM tool card lists the exact hosts-file entries to add manually** — the CLI-tools MITM card's "How it works" section now lists the full set of `127.0.0.1 <host>` lines for the selected tool (sourced from the canonical MITM target registry) instead of a single example domain. Users on locked-down machines — where the automatic, sudo-gated hosts-file edit isn't available — can now copy every required entry by hand. (thanks @mrcyclo)
- **feat(cli): `omniroute launch-codex` + `setup-codex` — run/configure the Codex CLI against OmniRoute** — a launcher and setup command that point the Codex CLI at an OmniRoute endpoint (remote-mode aware). ([#4270](https://github.com/diegosouzapw/OmniRoute/pull/4270))
- **feat(cli): Claude Code launcher + setup — remote mode + profiles** — `omniroute launch`/`setup` for Claude Code with remote-mode support and named connection profiles. ([#4274](https://github.com/diegosouzapw/OmniRoute/pull/4274))
- **feat(cli): OpenCode setup — OpenAI-compatible provider + remote-aware plugin** — `setup-opencode` registers OmniRoute as an OpenAI-compatible provider for OpenCode and installs a remote-aware plugin. ([#4277](https://github.com/diegosouzapw/OmniRoute/pull/4277))
- **feat(cli): one-command setup for popular AI coding tools** — new `setup-*` commands that configure each tool to talk to OmniRoute: **Cline** ([#4280](https://github.com/diegosouzapw/OmniRoute/pull/4280)), **Kilo Code** ([#4284](https://github.com/diegosouzapw/OmniRoute/pull/4284)), **Continue** ([#4289](https://github.com/diegosouzapw/OmniRoute/pull/4289)), **Cursor** ([#4291](https://github.com/diegosouzapw/OmniRoute/pull/4291)), **Roo Code** ([#4292](https://github.com/diegosouzapw/OmniRoute/pull/4292)), **Crush** ([#4298](https://github.com/diegosouzapw/OmniRoute/pull/4298)), **Goose** ([#4300](https://github.com/diegosouzapw/OmniRoute/pull/4300)), **Qwen Code** ([#4301](https://github.com/diegosouzapw/OmniRoute/pull/4301)), **Aider** ([#4302](https://github.com/diegosouzapw/OmniRoute/pull/4302)) and the **Gemini CLI** (native `/v1beta`) ([#4303](https://github.com/diegosouzapw/OmniRoute/pull/4303)).
- **feat(providers): provider model sweep — live discovery, refreshed catalogs, dead-provider cleanup** — a broad sweep that enables live `/v1/models` discovery for more OpenAI-style providers (the zenmux pattern), refreshes the seeded catalogs with current models, and marks dead providers `deprecated`. ([#4324](https://github.com/diegosouzapw/OmniRoute/pull/4324))
- **feat(mitm): translate Antigravity cloudcode end-to-end (Gap B)** — the MITM decrypt path now translates Antigravity `cloudcode` traffic end-to-end. ([#4299](https://github.com/diegosouzapw/OmniRoute/pull/4299))
- **feat(keys): per-key USD usage quota controls** — an API key can now carry a USD spend quota that caps its usage once the threshold is reached. ([#4327](https://github.com/diegosouzapw/OmniRoute/pull/4327) — thanks @Witroch4)

### 🔧 Changed

- **change(memory): memory is now OFF by default** — `DEFAULT_MEMORY_SETTINGS.enabled` now defaults to `false`. Enabling memory injects up to ~2,000 tokens of retrieved context into **every** chat request (and that context is billed), which was a surprising default for new installs and for clients with their own context. Memory is now an explicit opt-in: installs that already enabled it keep it on; installs that never configured it default to off. The Settings → Memory panel now shows a token-cost warning when memory is enabled. (PRD-2026-06-19-no-memory-header)

### 🐛 Fixed

- **fix(translator): Gemini accepts HTTP/HTTPS image URLs (no longer silently dropped)** — OpenAI-style `image_url` parts whose URL was `http://…` or `https://…` reached `convertOpenAIContentToParts` (the OpenAI→Gemini request helper) and were dropped with only a `console.warn`, because Gemini's `inlineData` requires base64 and the helper is synchronous (it cannot fetch + encode). Gemini's `Part` schema, however, natively accepts `fileData: { fileUri }` for remote URIs — the model fetches the asset itself. The helper now emits a `fileData` part (`mimeType: "image/*"`, inferred upstream on fetch) instead of dropping, so vision requests that pass a URL — not a data: URI — now reach Gemini intact. `data:` URIs still go through `inlineData` unchanged; unsupported schemes (e.g. `ftp:`) are still skipped. (thanks @East-rayyy)
- **fix(security): OAuth callback page no longer relays `code`/`state` to a wildcard `postMessage` target** — the OAuth callback at `/callback` posted `{ code, state, ... }` to `window.opener.postMessage(..., "*")` whenever the opener was cross-origin (a fallback for the legitimate remote-dashboard + local-loopback callback scenario). A hostile page that opened the callback URL in a popup against the well-known redirect URI would therefore receive the OAuth code+state and could complete the OAuth flow as the user. The wildcard fallback is replaced with an iteration over a fixed allowlist of trusted target origins (same-origin + Codex's loopback helper at `localhost:1455` / `127.0.0.1:1455`); the browser silently drops the message for any opener whose origin is not in the list. Methods 2 (`BroadcastChannel`) and 3 (`localStorage`) — already in the page — still cover same-origin parents when the opener was severed by COOP. (thanks @aeonframework)
- **fix(compliance): startup cleanup honors the dashboard data-retention setting instead of always trimming to 7 days** — on every restart, `cleanupExpiredLogs()` (run at startup) read retention only from the `CALL_LOG_RETENTION_DAYS` / `APP_LOG_RETENTION_DAYS` env vars, which default to **7 days** when unset, and trimmed `usage_history` (the Usage Analysis data) before the dashboard-based `runAutoCleanup()` — which respects the configured retention — ever ran. So a dashboard "Data Retention" of 90 days was silently overridden and the Usage Analysis page only ever showed the last 7 days after a restart. Retention now follows the precedence **explicit env var → dashboard DB setting → 7-day default**, per table (`usage_history`→`usageHistory`, `call_logs`/`proxy_logs`/`request_detail_logs`→`callLogs`, `mcp_tool_audit`→`mcpAudit`); an operator who sets the env var still wins, and non-DB deployments still fall back to it. ([#4354](https://github.com/diegosouzapw/OmniRoute/issues/4354) — thanks @akbardwi)
- **fix(providers): bailian-coding-plan static fallback catalog matches the registry (10 models)** — the provider-model sweep (#4324) added four current Model Studio coding-plan models (`qwen3.7-plus`, `qwen3-coder-plus`, `qwen3-coder-next`, `glm-4.7`) to the `bailian-coding-plan` registry entry but missed the static fallback mirror in `staticModels.ts`, which still listed only the older six. The static catalog (served when live discovery is unavailable) therefore diverged from the registry, and the existing static↔registry parity test went red on the release branch (only surfacing when test-impact analysis happened to select it). The static mirror now carries all ten models in registry order, restoring parity. ([#4324](https://github.com/diegosouzapw/OmniRoute/pull/4324))
- **fix(executors): ArenaLLM accepts LMArena's split Supabase SSR auth cookie** — LMArena migrated to `@supabase/ssr` chunked auth cookies: the single `arena-auth-prod-v1` cookie is now empty and the real session is split across `arena-auth-prod-v1.0`, `arena-auth-prod-v1.1`, … (ascending). A user who pasted the (now-empty) single cookie therefore sent an empty session and upstream rejected it as "invalid cookie". The LMArena executor now reconstructs the single cookie from its chunks — reading `.0`, `.1`, … in ascending numeric order until one is missing and concatenating their raw values (`@supabase/ssr`'s `combineChunks` rule: plain `join("")`, no base64-decode, no JSON-parse, the `base64-` prefix kept verbatim) — while preserving the rest of the pasted jar. A non-empty single cookie is still forwarded unchanged (back-compat). The credential UX now instructs pasting the **full Cookie header** and tracks the `.0`/`.1` storage keys. ([#4271](https://github.com/diegosouzapw/OmniRoute/issues/4271) — thanks @caussao)
- **fix(compression): preserve the cacheable prefix for automatic-cache providers** — OpenAI / Codex (and Azure-OpenAI) use _automatic_ prefix caching: the upstream caches the longest matching prefix of a request (system prompt + earliest messages) **without** any explicit `cache_control` markers in the body. The cache-aware compression guard only protected that prefix when the request carried explicit `cache_control`, so for automatic-cache providers the guard was skipped — and with compression enabled and `preserveSystemPrompt: false` (or a prefix-compressing mode like `aggressive`/`ultra`) it rewrote the system prompt / earliest messages, guaranteeing a cache miss and **higher** token spend through OmniRoute than going direct. The guard now treats a caching provider as sufficient on its own (`isCachingProvider` alone, independent of `cache_control`) to skip the system prompt and downgrade prefix-compressing modes, and OpenAI/Codex/Azure are now recognized as caching providers. Compression is still off by default — this only affects operators who enabled it with prefix preservation turned off. ([#3955](https://github.com/diegosouzapw/OmniRoute/issues/3955))
- **fix(executors): DuckDuckGo AI Chat uses duckduckgo.com (fixes 400)** — the DuckDuckGo AI Chat executor fetched status/chat and set `Origin`/`Referer` against `https://duck.ai` while still sending `Sec-Fetch-Site: same-origin`, so the request's same-origin triplet (host + Origin + Referer) was inconsistent and the backend rejected it with HTTP 400. All current DDG reverse-engineering references — and the provider registry's own `baseUrl` — use `https://duckduckgo.com`; the executor now uses it consistently for the status URL, chat URL, `Origin`, and `Referer` (the same-origin header is now coherent). The `x-fe-version` scrape regex also required a 40-hex tail but the real served token has a 20-hex tail (e.g. `serp_20250401_100419_ET-19d438eb199b2bf7c300`), so it silently fell back to a hardcoded default; the pattern is relaxed to a bounded `{20,40}` tail (still ReDoS-safe). This addresses the DuckDuckGo half of the report; the separate Chipotle/`chipotle` upstream breakage is tracked independently. ([#4037](https://github.com/diegosouzapw/OmniRoute/issues/4037) — thanks @daniij)
- **fix(security): bound the prompt-injection scan to the first 16 KB (hot-path perf)** — the prompt-injection guard joined every message/system string into one buffer and ran several regexes over the **whole** thing on every chat request, with no size cap — so a 300 KB body (pasted code, RAG context) meant O(body) CPU scanning on the hot path, a self-inflicted latency/GC source under concurrency. Both detection call sites (`detectInjection` in `inputSanitizer.ts` and the custom-pattern scan in `promptInjection.ts`) now slice the joined text to the first **16 KB** (`MAX_INJECTION_SCAN_BYTES`) before the regex loop. Injection directives sit near the top of a prompt, so the generous cap preserves real detection while scanning only a bounded prefix; the existing 10 MB body-size cap (which protects ingestion) is unchanged. ([#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932) — thanks @KooshaPari)
- **fix(sse): retry direct-connection socket failures on a fresh socket (fewer `502` bursts)** — the default direct-connection undici dispatcher pools keep-alive sockets for up to 4 s, but some edges (e.g. `nvidia`, `opencode-zen`) silently close idle keep-alive sockets within that window, so the next request reusing a pooled socket fails with `UND_ERR_SOCKET` ("other side closed") — in bursts. `proxyFetch` already retried once on such transient errors, but the retry reused the **same** pooled dispatcher and could grab another stale socket, then fell through to native fetch (which also pools) → the job sat in the rate-limit queue until the 30 s timeout → `502` + circuit-breaker open. The retry now uses a dedicated **no-keep-alive / no-pipelining** dispatcher so it opens a brand-new socket that can't be a dead pooled one; the first attempt still uses the pooled dispatcher (healthy keep-alive reuse is preserved). Complements the v3.8.29 diagnostics (`describeFetchCause`, #4281). ([#4252](https://github.com/diegosouzapw/OmniRoute/issues/4252) — thanks @klimadev)
- **fix(sse): combo now stops at the first body-specific 400 instead of trying every target** — the `#2101` guard that detects a body-specific 400 (context overflow / malformed / model-access-denied, e.g. "model is not supported when using Codex with a ChatGPT account") logged "stopping combo" but executed a bare `break`, which only exited the inner retry loop; `executeTarget` then returned `null` and the outer target loop treated that as "this target produced nothing" and advanced to the next model. A combo of N targets that all reject the same request body therefore marched through all N (the report shows a 143-model Codex combo iterating every target), wasting upstream calls and per-attempt work. The guard now surfaces the 400 via the `{ ok, response }` contract (mirroring the 499 client-disconnect path) so the combo resolves and stops immediately. ([#4279](https://github.com/diegosouzapw/OmniRoute/issues/4279))
- **fix(sse): non-streaming combo over a Responses-API target no longer returns empty content** — a Responses-API target (codex/`cx`) streams from upstream even on `stream:false`, and its terminal `response.completed` snapshot can carry a non-empty `output` that lacks the assistant message item (e.g. only a `reasoning` item) while the streamed `output_text` deltas had reconstructed the full message. The SSE→JSON aggregator preferred the terminal `output` wholesale, dropping the reconstructed text → HTTP 200 with empty content (hit notably via n8n, which defaults to `stream:false`). The aggregator now falls back to the reconstructed delta output when the terminal output has no message item but the reconstruction does; the terminal snapshot still wins whenever it already carries the message. ([#3948](https://github.com/diegosouzapw/OmniRoute/issues/3948))
- **fix(executors): preserve tool-name casing on native Claude OAuth (`read` no longer leaks back as `Read`)** — native Claude OAuth traffic runs through an anti-fingerprint tool-name cloak that renames a tool literally named `read` to `Read` on the wire and records the reverse alias on a non-enumerable `_toolNameMap`, which the response side uses to restore the client's original casing. Since v3.8.27 the executor returned a JSON-round-tripped copy of the body as `transformedBody`, and that round-trip dropped the non-enumerable map — so the restore saw an empty map and the cloaked `Read` streamed verbatim to the client, corrupting the tool name. The executor now re-attaches the cloak map onto the serialized body (mirroring the Antigravity executor), so tool-name casing round-trips correctly. ([#4307](https://github.com/diegosouzapw/OmniRoute/issues/4307) — thanks @dev-cj)
- **fix(api): cache-HIT `X-OmniRoute-Response-Cost` now reports the incremental cost (≈0), not the original** — on a semantic-cache HIT the gateway serves the stored response **without** an upstream call, but `X-OmniRoute-Response-Cost` was reporting the original call's full cost (recomputed from the cached `usage`). A consumer summing `response-cost` for billing was therefore charging for responses that cost ≈$0 to serve (and stale entries could inflate it). Cache hits now bill `X-OmniRoute-Response-Cost: 0.0000000000` (the real incremental cost), and the avoided cost is surfaced in a new **`X-OmniRoute-Cost-Saved`** header for cache analytics — mirroring the existing `tokens_saved` concept. The MISS path is unchanged. (PRD-2026-06-19-cache-hit-cost-reporting)
- **fix(models): imported vision-capable models keep their vision capability** — after importing a provider key, vision-capable models (e.g. OpenRouter models whose `architecture` declares image input, and other synced providers) were listed as text-only in `/v1/models` and the dashboard — even though image requests actually worked. Synced model records never captured the vision flag, and the catalog's OpenRouter live-enrichment (which derives vision from `architecture.input_modalities`) is skipped once a provider has synced models. Discovery now captures `supportsVision` at sync time (from `architecture.input_modalities`, the string `architecture.modality`, or a top-level `input_modalities`), mirroring the existing `supportsThinking` capture, and the catalog surfaces `capabilities.vision` for synced models. ([#4264](https://github.com/diegosouzapw/OmniRoute/issues/4264) — thanks @FerLuisxd)
- **fix(providers): Cloudflare Workers AI model discovery shows model names, not UUIDs** — importing a Cloudflare Workers AI key listed models with internal UUID identifiers (e.g. `429b9e8b-d99e-…`) instead of their usable slugs (`@cf/meta/llama-3.1-8b-instruct`). Cloudflare's `/ai/models/search` returns `{ id: "<uuid>", name: "@cf/…" }`, and discovery was passing the raw objects through — so the UUID `id` became the callable model id. The `cloudflare-ai` discovery now maps each result's `name` → id, surfacing the real `@cf/…` model ids. ([#4259](https://github.com/diegosouzapw/OmniRoute/issues/4259) — thanks @FerLuisxd)
- **fix(translator): clamp Responses API `call_id` to 64 characters** — the OpenAI Responses API rejects `call_id` values longer than 64 characters with a 400. Long upstream tool-call ids (some clients emit ids well over the limit) are now clamped deterministically on both the `function_call` item and its matching `function_call_output`, so the pair stays matched through the orphaned-output filter and the request is accepted. (thanks @anuragg-saxenaa, @ngapngap)
- **fix(oauth): GitHub Copilot token refresh now sends the public client_id** — the `github` provider config never carried a `clientId`, so GitHub OAuth `refresh_token` exchanges either omitted `client_id` or sent the literal string `undefined` (and a bogus `client_secret=undefined`), which GitHub rejects — leaving a Copilot connection stuck once its short-lived token expired and the long-lived refresh path was needed. The provider now resolves its public device-flow `client_id` from the embedded public credential and omits `client_secret` entirely (GitHub's Copilot app is a public client with no secret). (thanks @baslr)
- **fix(translator): a tool property named `pattern` survives Gemini/Antigravity schema sanitization** — the Gemini schema sanitizer strips JSON-Schema constraint keywords Gemini rejects (`pattern`, `minLength`, …) at every nesting level, but it also deleted any tool **property** literally _named_ one of those keywords. glob/grep tools declare a property called `pattern`, so on `ag/*` (Antigravity) backends that argument (and its `required` entry) was silently dropped, breaking the tools. Keyword stripping is now position-aware: it only removes constraint keywords at the schema-node level and never against the user-defined names inside a `properties` map. A genuine string-level `pattern` _constraint_ is still stripped. (thanks @youthanh)
- **fix(translator): MCP `namespace` tools flatten to individual functions on the Responses→Chat path** — when a Codex CLI client routes a Responses-API request to a non-Codex backend (e.g. `kr/claude-opus-4.7`), each MCP server is declared as a `namespace` tool (`{ type:"namespace", name, tools:[…] }`). The Responses→Chat translator had no `namespace` branch, so the whole group collapsed into a single empty-schema function named `mcp__<server>__` and every MCP call returned `unsupported call: mcp__<server>__`, breaking all MCP-based workflows (context7, codegraph, custom MCPs) for that combination. The translator now expands a namespace into one Chat function per sub-tool (preserving each sub-tool's name and parameters); an empty namespace yields no tools instead of a broken placeholder. The native Codex passthrough path was already correct. (thanks @V13t4nh)
- **fix(cli): the active remote-context credential wins over an ambient `OMNIROUTE_API_KEY`** — when a remote context is selected, its scoped access token now takes precedence over an `OMNIROUTE_API_KEY` present in the environment, so the connected remote is targeted as expected. ([#4364](https://github.com/diegosouzapw/OmniRoute/pull/4364))
- **fix(cli): wire the `contexts` command into the CLI program** — the `omniroute contexts` command (list/switch saved remote contexts) was implemented but never registered, so it was unreachable; it is now wired into the CLI program. ([#4369](https://github.com/diegosouzapw/OmniRoute/pull/4369))
- **fix(mitm): mask bare `Bearer <token>` header values in the Traffic Inspector** — the inspector now redacts bare `Authorization: Bearer …` values so tokens don't leak into captured traffic. ([#4358](https://github.com/diegosouzapw/OmniRoute/pull/4358))
- **fix(pricing): price the `gpt-5.x-pro` OpenAI models + align the opencode-go discovery test** — adds pricing for the gpt-5.x-pro models so cost telemetry reports a real cost instead of zero. ([#4355](https://github.com/diegosouzapw/OmniRoute/pull/4355))
- **fix(sse): release the reader and cancel the stream on abort/error (no more Undici pool socket leak)** — on abort or a mid-stream error the response reader is released and the stream cancelled, preventing leaked pooled sockets that degraded later requests. ([#4309](https://github.com/diegosouzapw/OmniRoute/pull/4309) — thanks @Ardem2025)
- **fix(kiro): emit an early role-only start chunk to release the stream-readiness gate** — Kiro streams now send an initial role-only chunk so the stream-readiness gate releases promptly instead of stalling. ([#4311](https://github.com/diegosouzapw/OmniRoute/pull/4311) — thanks @artickc)
- **fix(dashboard): the proxy modal stops pre-filling new scopes with an unrelated proxy** — adding a new scope assignment no longer inherits a previously-selected proxy's configuration. ([#4312](https://github.com/diegosouzapw/OmniRoute/pull/4312))
- **fix(open-sse): inner-ai stops silently rerouting unmatched models to `models[0]`** — an unmatched model id is no longer silently served by the first available model; the lookup now returns null and the request is handled explicitly. ([#4310](https://github.com/diegosouzapw/OmniRoute/pull/4310))
- **fix(pollinations): handle auth-required premium models (claude, gemini, midjourney)** — premium Pollinations models that require authentication are now handled correctly instead of failing. ([#4266](https://github.com/diegosouzapw/OmniRoute/pull/4266) — thanks @oyi77)
- **fix(codex): isolate the Spark quota scope** — Codex Spark usage is tracked under its own quota scope so it no longer bleeds into other Codex quotas. ([#4293](https://github.com/diegosouzapw/OmniRoute/pull/4293) — thanks @xz-dev)
- **fix(dashboard): improve the API "try it" functionality** — fixes the request path used by the dashboard's API "try it" panel. ([#4296](https://github.com/diegosouzapw/OmniRoute/pull/4296) — thanks @edrickrenan)
- **fix: polyfill `crypto.randomUUID` for non-secure contexts** — restores UUID generation when the dashboard is served over a non-secure (plain-HTTP) origin where `crypto.randomUUID` is unavailable. ([#4287](https://github.com/diegosouzapw/OmniRoute/pull/4287) — thanks @pizzav-xyz)
- **fix(proxy): allow concurrent proxy dispatcher streams** — the proxy dispatcher no longer serializes streams, so concurrent requests through a proxied connection run in parallel. ([#4288](https://github.com/diegosouzapw/OmniRoute/pull/4288) — thanks @wilsonicdev)
- **fix(build): co-locate llmlingua SLM optionals into `dist/node_modules` (postinstall)** — the optional llmlingua SLM packages are co-located into the standalone build so the compression worker can actually spawn in production. ([#4286](https://github.com/diegosouzapw/OmniRoute/pull/4286))
- **fix(mitm): surface AgentBridge traffic in the Traffic Inspector (D4 ingest)** — AgentBridge requests now appear in the Traffic Inspector. ([#4285](https://github.com/diegosouzapw/OmniRoute/pull/4285))
- **fix(sse): surface undici `err.cause` on dispatcher failure** — dispatcher failures now flatten the cause chain (and `AggregateError`s) into the error detail for diagnosability. ([#4281](https://github.com/diegosouzapw/OmniRoute/pull/4281))
- **fix(cli): harden `launch`/`launch-codex` with free-claude-code patterns** — the launchers adopt the hardened launch patterns ported from free-claude-code. ([#4278](https://github.com/diegosouzapw/OmniRoute/pull/4278))
- **fix(compression): end-to-end audit — fixes across the whole compression flow** — a sweep of the compression pipeline fixing ultra/aggressive/lossless edge cases, accessibility-anchor handling, language detection, and mode decoupling. ([#4323](https://github.com/diegosouzapw/OmniRoute/pull/4323))

### 🧪 Tests

- **test: align two tests left red by merged PRs** — re-aligns the db-rules classification count (#4335) and the LMArena split-cookie metadata test (#4271) after concurrent merges. ([#4346](https://github.com/diegosouzapw/OmniRoute/pull/4346))
- **test(ci): reconcile the release/v3.8.30 baseline + test drift** — reconciles quality baselines and drifted tests accumulated on the release branch. ([#4276](https://github.com/diegosouzapw/OmniRoute/pull/4276))

### 📝 Maintenance

- **refactor(combo): `ComboContext` + extract `phaseComboSetup` (god-file split, phase 1)** — begins decomposing the combo god-file by extracting combo setup into a context object, without touching dispatch/semaphore logic. ([#4326](https://github.com/diegosouzapw/OmniRoute/pull/4326))
- **feat(quality): cap test-file size — anti-reinflation Layer 1** — freezes the existing god-tests and caps new test files at 800 lines to stop re-inflation. ([#4273](https://github.com/diegosouzapw/OmniRoute/pull/4273))
- **feat(quality): seed per-module mutationScore floors + a blocking aggregation ratchet (T3)** — adds per-module mutation-score floors with a blocking aggregate gate. ([#4305](https://github.com/diegosouzapw/OmniRoute/pull/4305))
- **feat(quality): make the a11y gate real (`@axe-core/playwright` in nightly)** — wires the previously-phantom accessibility gate into the nightly run with real baselines. ([#4321](https://github.com/diegosouzapw/OmniRoute/pull/4321))
- **feat(quality): unblock R1 — test-redundancy measurement via `disableBail`** — enables the test-redundancy measurement that was previously blocked by fail-fast. ([#4322](https://github.com/diegosouzapw/OmniRoute/pull/4322))
- **fix(quality): the complexity gate now covers `bin/` + `electron/`, and tracked-artifacts runs in pre-commit** — extends the complexity gate's scope and moves the tracked-artifacts check into the pre-commit hook. ([#4318](https://github.com/diegosouzapw/OmniRoute/pull/4318))
- **fix(quality): restore release/v3.8.30 green — 3 latent reds from concurrent merges** — fixes three latent test reds surfaced by concurrent merges into the release branch. ([#4335](https://github.com/diegosouzapw/OmniRoute/pull/4335))
- **fix(combo): keep `phaseComboSetup` under the complexity ceiling** — extracts a helper so the new combo setup phase stays under the complexity gate. ([#4338](https://github.com/diegosouzapw/OmniRoute/pull/4338))
- **ci(mutation): split over-budget batches by range/pair so every batch fits the job cap** — re-splits the mutation batches so each fits the CI job budget. ([#4272](https://github.com/diegosouzapw/OmniRoute/pull/4272))
- **chore(ci): align the electron audit gate to the root advisory policy** — the electron-workspace audit gate now follows the same advisory policy as the root. ([#4275](https://github.com/diegosouzapw/OmniRoute/pull/4275))
- **chore(quality): reconcile the complexity/quality baselines across concurrent-merge drift** — rolls up the cycle's baseline reconciliations driven by concurrent merges into the release branch. ([#4330](https://github.com/diegosouzapw/OmniRoute/pull/4330), [#4336](https://github.com/diegosouzapw/OmniRoute/pull/4336), [#4370](https://github.com/diegosouzapw/OmniRoute/pull/4370))
- **docs: ban AI-generation footers in commits/PRs/CHANGELOG (Hard Rule #16)** — codifies the prohibition on AI-generation footers and bot co-author trailers. ([#4328](https://github.com/diegosouzapw/OmniRoute/pull/4328))
- **docs(design): add the OmniRoute design system and visual identity specification** — adds the design-system / visual-identity specification document. (thanks @diegosouzapw)

### 🔒 Security

- **fix(sse): harden the DuckDuckGo lite scraper sanitization (CodeQL)** — closes four HIGH CodeQL alerts in the no-key web-search scraper: `decodeEntities` now resolves `&amp;` **last** so an already-escaped entity (e.g. `&amp;lt;`) survives as literal text instead of being double-unescaped (`js/double-escaping`); `stripTags` decodes entities first, then strips tags in a loop to a fixpoint and drops any trailing unclosed `<…`, so entity-encoded markup like `&lt;script&gt;` can never reach the LLM/client as a live tag (`js/incomplete-multi-character-sanitization`); and the host checks in the search tests use `new URL().hostname` equality instead of substring `.includes` (`js/incomplete-url-substring-sanitization`). ([#4356](https://github.com/diegosouzapw/OmniRoute/pull/4356))

### 🔧 Dependencies

- **fix(deps): bump undici to 7.28.0 and dompurify to 3.4.11 (security)** — addresses the undici SOCKS5-TLS / cache advisories and the dompurify advisory. ([#4306](https://github.com/diegosouzapw/OmniRoute/pull/4306))
- **chore(deps): bump actions/checkout from 4 to 7** — CI checkout-action update. ([#4297](https://github.com/diegosouzapw/OmniRoute/pull/4297))
- **fix(executors): strip `stream_options` for qwen non-streaming / thinking-mode Claude Code requests** — Claude-Code-compatible providers force the executor-level `stream` flag on via `upstreamStream = stream || isClaudeCodeCompatible` (`open-sse/handlers/chatCore.ts`), but the outgoing body keeps the caller's original `stream: false`. The shared `stream && targetFormat === "openai"` branch in `DefaultExecutor.transformRequest` then injected `stream_options: { include_usage: true }` onto a body that still said `stream: false`, and qwen upstream rejected it with `400 "'stream_options' only set this when you set stream: true"`. Same rejection when the body carries `thinking` / `enable_thinking`. The qwen branch now skips the injection (and strips any client-sent `stream_options`) when the body explicitly says `stream: false` or requests thinking, leaving regular qwen streaming requests with the usage injection intact. (thanks @anuragg-saxenaa)

---

## [3.8.29] — 2026-06-19

### ✨ New Features

- **feat(cloud-agent): Cursor Cloud Agent via the official API-key REST API (no IDE-OAuth ban risk)** — adds a `cursor-cloud` cloud agent that drives Cursor's Background / Cloud Agents through the official REST API (`api.cursor.com`) authenticated with a user or service-account API key — the safer, first-party alternative to re-using the Cursor IDE's OAuth session (the existing `cursor` provider, which carries a ban-risk warning). Implemented as a plain REST adapter mirroring the Devin/Jules agents (`createTask`/`getStatus`/`sendMessage`/`listSources`), so it does **not** pull in the `@cursor/sdk` package and its per-platform native binaries (Cursor's SDK is itself a thin wrapper over this REST API). Cursor's UPPERCASE status enums (`CREATING`/`RUNNING`/`FINISHED`/`ERROR`) are mapped explicitly to the shared `CloudAgentStatus`, and `baseUrl` is overridable per-credential. Credentials are stored encrypted via the existing `cloud_agent_credentials` table; no schema change. ([#4227](https://github.com/diegosouzapw/OmniRoute/issues/4227) — thanks @MRDGH2821)
- **feat(routing): OpenRouter-style `auto/<category>:<tier>` combos** — auto-routing now understands suffixed combos that separate the _category_ (what kind of route) from the _tier_ (how to optimize): `auto/coding:fast`, `auto/coding:cheap` (alias `:floor`), `auto/coding:free`, `auto/coding:pro`, `auto/coding:reliable`, plus the new category roots `auto/reasoning`, `auto/vision`, `auto/multimodal`. The **tier** picks the scoring weights — `:fast` → ship-fast, `:cheap`/`:floor` → cost-saver, `:reliable` → a new reliability-first pack (circuit-breaker health + latency stability) — while `:free`/`:pro` filter the candidate pool by model tier (`classifyTier`: free-tier vs. premium models). The **category** filters the pool by capability (`vision`/`multimodal` → vision-capable models, `reasoning` → reasoning/thinking models). Any valid `auto/<category>:<tier>` resolves on demand; a curated set is advertised in `/v1/models` and the dashboard. Filtering is fail-open — if a constraint matches no connected models the full pool is used so routing never breaks. All composition lives in the new `open-sse/services/autoCombo/suffixComposition.ts`; the core combo scorer (`combo.ts`) is untouched. Second slice of #4235 (premium account-tier weighting is a later follow-up). ([#4235](https://github.com/diegosouzapw/OmniRoute/issues/4235) — thanks @MRDGH2821)
- **feat(routing): advertise the `auto/cheap`, `auto/offline`, `auto/smart` combos (catalog ↔ README sync)** — the README lists `auto/cheap` (cheapest-per-token first), `auto/offline` (most quota/rate-limit headroom first) and `auto/smart` (quality-first + 10% exploration), and they already resolved at request time via `parseAutoPrefix` → `createVirtualAutoCombo`. But they were missing from `AUTO_TEMPLATE_VARIANTS`, so `/v1/models` and the dashboard combos list (which iterate that catalog) never showed them — the catalog drifted from the docs (visible in the issue's screenshots). Added the three entries so they're advertised everywhere alongside the other built-in `auto/*` combos. First slice of #4235 (OpenRouter-style `auto/<category>:<tier>` suffixes + new categories follow). ([#4235](https://github.com/diegosouzapw/OmniRoute/issues/4235) — thanks @MRDGH2821)
- **feat(cli): remote mode — drive a remote OmniRoute with scoped access tokens** — a new CLI mode that connects to a remote OmniRoute instance using scoped access tokens, so a local CLI can drive a server you don't own a session on. ([#4256](https://github.com/diegosouzapw/OmniRoute/pull/4256))
- **feat(api): cost-telemetry parity — `X-OmniRoute-*` headers on every endpoint + a non-token cost engine** — every endpoint now emits the `X-OmniRoute-*` cost/usage headers, backed by a cost engine that also prices non-token (media/request-based) usage. ([#4247](https://github.com/diegosouzapw/OmniRoute/pull/4247))
- **feat(api): register Kimi K2.7 Code models (`kimi-k2.7-code` + `-highspeed`)** — the new Moonshot thinking-only coding models are registered (fixed sampling; `temperature`/`top_p` marked unsupported). ([#4183](https://github.com/diegosouzapw/OmniRoute/pull/4183))
- **feat(catalog): add `kimi-k2.7-code` to the kmca catalog + qwen-web models discovery** — surfaces the new Kimi coding model in the kmca catalog and wires qwen-web into model discovery. ([#4185](https://github.com/diegosouzapw/OmniRoute/pull/4185))
- **feat(api): expand the `zai` provider catalog with GLM-5.2 / GLM-4.7** — adds the real GLM-5.2, GLM-4.7 and GLM-4.7-flash model ids to the Anthropic-direct `zai` provider. ([#4201](https://github.com/diegosouzapw/OmniRoute/pull/4201))
- **feat(api): no-thinking gateway model IDs (FCC port, Fase 8.1)** — gateway model id variants that force thinking off, ported from free-claude-code. ([#4145](https://github.com/diegosouzapw/OmniRoute/pull/4145))
- **feat(sse): mid-stream continuation for truncated streams (FCC port, Task 4.4)** — when a stream is cut short, OmniRoute can transparently continue it, ported from free-claude-code. ([#4147](https://github.com/diegosouzapw/OmniRoute/pull/4147))
- **feat(sse): per-provider sliding-window rate-limit fallback (FCC port, Fase 8.2)** — a per-provider sliding-window rate limiter as a fallback path, ported from free-claude-code. ([#4146](https://github.com/diegosouzapw/OmniRoute/pull/4146))
- **feat(sse): transparent stream recovery (FCC port, Fase 4, opt-in)** — opt-in transparent recovery of interrupted upstream streams, ported from free-claude-code. ([#4131](https://github.com/diegosouzapw/OmniRoute/pull/4131))
- **feat(search): free DuckDuckGo web search as a last-resort provider (FCC port, Fase 6)** — adds a no-key DuckDuckGo web-search provider used as a last resort, ported from free-claude-code. ([#4136](https://github.com/diegosouzapw/OmniRoute/pull/4136))
- **feat(logging): credential-redaction safety net in the pino logger (FCC port, Fase 8.3)** — a logger-level redaction pass that scrubs credentials from log output, ported from free-claude-code. ([#4140](https://github.com/diegosouzapw/OmniRoute/pull/4140))
- **feat(memory): opt-in Qdrant scalar int8 quantization (F4.4 Q1)** — opt-in int8 scalar quantization for Qdrant-backed memory vectors. ([#4187](https://github.com/diegosouzapw/OmniRoute/pull/4187))
- **feat(memory): opt-in sqlite-vec int8 vector quantization (F4.4 Q2)** — opt-in int8 quantization for the sqlite-vec memory backend. ([#4190](https://github.com/diegosouzapw/OmniRoute/pull/4190))
- **feat(deploy): keep optional deps on `update` (`--include=optional`)** — the in-place update path now passes `--include=optional` so native/optional packages aren't dropped on update. ([#4260](https://github.com/diegosouzapw/OmniRoute/pull/4260))
- **feat(dashboard): unified visual identity — grid, primitives, tables, form controls (design phases 1-4)** — a sweeping design pass aligning the dashboard with the site: grid wallpaper, button/card/input primitives, theme-aware tables and form controls. ([#4122](https://github.com/diegosouzapw/OmniRoute/pull/4122))
- **feat(dashboard): grid wallpaper on all standalone screens + fluid 4K layout** — the identity grid now backs every standalone screen and the layout scales fluidly to 4K. ([#4158](https://github.com/diegosouzapw/OmniRoute/pull/4158))
- **feat(dashboard): make the identity grid visible + unify the focus ring on accent** — design follow-up making the grid actually visible and standardizing focus rings on the accent color. ([#4141](https://github.com/diegosouzapw/OmniRoute/pull/4141))
- **feat(dashboard): import only free models + free-model list controls** — the model-import page can import just the free models, with controls to manage the free-model list. ([#4176](https://github.com/diegosouzapw/OmniRoute/pull/4176) — thanks @felipesartori)
- **feat(dashboard): compact grid layout for no-auth provider accounts** — a denser grid layout for provider accounts when auth is disabled. ([#4137](https://github.com/diegosouzapw/OmniRoute/pull/4137) — thanks @felipesartori)
- **feat(dashboard): derive media `serviceKinds` from the registries (surface MiniMax + the media catalog)** — `/media-providers/[kind]` now derives its service kinds from the registries instead of a hand-maintained list, surfacing ~48 previously-invisible media providers (incl. MiniMax TTS/video/music). ([#4212](https://github.com/diegosouzapw/OmniRoute/pull/4212))
- **feat(traffic-inspector): live (in-flight) request filter (Gap 5)** — the Traffic Inspector can filter to in-flight requests as they happen. ([#4130](https://github.com/diegosouzapw/OmniRoute/pull/4130))
- **feat(agent-bridge): maintenance & diagnostics dashboard controls** — adds maintenance and diagnostics controls for the Agent Bridge to the dashboard. ([#4127](https://github.com/diegosouzapw/OmniRoute/pull/4127))
- **feat(mitm): TPROXY IP_TRANSPARENT native addon + conditional loader (Epic A)** — a native `IP_TRANSPARENT` addon with a conditional loader, the foundation for TPROXY capture. ([#4148](https://github.com/diegosouzapw/OmniRoute/pull/4148))
- **feat(mitm): Fase 3 Epic A spike — TPROXY command builder** — a transactional builder for the iptables/TPROXY command set. ([#4139](https://github.com/diegosouzapw/OmniRoute/pull/4139))
- **feat(mitm): TPROXY setup layer — transactional apply/revert (Epic A)** — applies and reverts the TPROXY routing setup transactionally. ([#4144](https://github.com/diegosouzapw/OmniRoute/pull/4144))
- **feat(mitm): add `setSocketMark` to the TPROXY addon (anti-loop primitive)** — exposes `setSocketMark` so OmniRoute's own egress can be marked and skipped (anti-loop). ([#4160](https://github.com/diegosouzapw/OmniRoute/pull/4160))
- **feat(mitm): TPROXY capture-mode listener + `connectMarked` (Epic A)** — the capture-mode listener plus a marked-connect primitive. ([#4169](https://github.com/diegosouzapw/OmniRoute/pull/4169))
- **feat(mitm): dynamic per-SNI cert authority for TPROXY (TLS decrypt 1/N)** — a per-SNI on-the-fly certificate authority, the first slice of TLS decrypt. ([#4173](https://github.com/diegosouzapw/OmniRoute/pull/4173))
- **feat(mitm): TLS-terminating capture for TPROXY (decrypt 2/N)** — terminates TLS to capture decrypted traffic. ([#4179](https://github.com/diegosouzapw/OmniRoute/pull/4179))
- **feat(mitm): wire the TLS decrypt engine into TPROXY capture mode (decrypt 3/N)** — connects the decrypt engine to the capture-mode pipeline. ([#4200](https://github.com/diegosouzapw/OmniRoute/pull/4200))
- **feat(mitm): TPROXY capture-mode manager (decrypt 4a/N)** — a manager coordinating the TPROXY capture lifecycle. ([#4208](https://github.com/diegosouzapw/OmniRoute/pull/4208))
- **feat(mitm): local-only route + trust-store installer for TPROXY decrypt (4b/N)** — a loopback-only management route plus a CA trust-store installer for the decrypt CA. ([#4211](https://github.com/diegosouzapw/OmniRoute/pull/4211))
- **feat(dashboard): TPROXY decrypt capture toggle in the Traffic Inspector (4c/N)** — a UI toggle to enable/disable decrypted capture. ([#4216](https://github.com/diegosouzapw/OmniRoute/pull/4216))
- **feat(compression): replace the headroom tabular encoder with a vendored GCF** — swaps the tabular encoder for a vendored GCF implementation. ([#4167](https://github.com/diegosouzapw/OmniRoute/pull/4167) — thanks @blackwell-systems)
- **feat(compression): live per-engine streaming via `compression.step` (F3.3)** — streams per-engine compression progress through a `compression.step` event. ([#4217](https://github.com/diegosouzapw/OmniRoute/pull/4217))
- **feat(compression): show an engine node for single-engine runs in the studio** — the Compression Studio now renders an engine node even when only one engine runs. ([#4210](https://github.com/diegosouzapw/OmniRoute/pull/4210))
- **feat(compression): expose the WaterfallInspector via a Canvas/Waterfall toggle** — adds a Canvas/Waterfall view toggle that surfaces the WaterfallInspector. ([#4238](https://github.com/diegosouzapw/OmniRoute/pull/4238))
- **feat(compression): make `mcpAccessibility` config reachable via a settings sub-route** — exposes the `mcpAccessibility` config under a dedicated settings sub-route. ([#4237](https://github.com/diegosouzapw/OmniRoute/pull/4237))
- **feat(compression): runnable A/B benchmark CLI (F2.4)** — a CLI to run A/B compression benchmarks. ([#4220](https://github.com/diegosouzapw/OmniRoute/pull/4220))
- **feat(compression): add a transcript loader to the replay harness** — the replay harness can now load real transcripts. ([#4246](https://github.com/diegosouzapw/OmniRoute/pull/4246))
- **feat(compression): wire MCP tool-cardinality reduction (F4.3, opt-in)** — opt-in reduction of MCP tool-set cardinality to shrink prompts. ([#4221](https://github.com/diegosouzapw/OmniRoute/pull/4221))
- **feat(compression): wire RTK comment-stripping config + honor `preserveDocstrings`** — RTK comment-stripping is now configurable and honors a `preserveDocstrings` flag. ([#4242](https://github.com/diegosouzapw/OmniRoute/pull/4242))
- **feat(compression): honor the per-filter RTK `deduplicate` flag** — RTK filters now respect a per-filter `deduplicate` flag. ([#4231](https://github.com/diegosouzapw/OmniRoute/pull/4231))
- **feat(compression): honor the registry `enabled` flag in the stacked loop** — the stacked compression loop now skips engines disabled in the registry. ([#4244](https://github.com/diegosouzapw/OmniRoute/pull/4244))
- **feat(compression): persist RTK grouping config (unlock R5 `enableGrouping`)** — persists the RTK grouping configuration, unlocking the R5 `enableGrouping` rule. ([#4207](https://github.com/diegosouzapw/OmniRoute/pull/4207))
- **feat(compression): wire ultra's `modelPath`/`slmFallbackToAggressive` to the LLMLingua SLM tier** — connects the ultra tier's small-language-model knobs to the LLMLingua SLM path. ([#4257](https://github.com/diegosouzapw/OmniRoute/pull/4257))
- **feat(quality): Onda 2 mutation-gate tooling — radiography classifier (T1) + `mutationScore` ratchet (T3)** — new mutation-testing tooling: a survivor-radiography classifier and a `mutationScore` ratchet. ([#4234](https://github.com/diegosouzapw/OmniRoute/pull/4234))
- **feat(ci): wire the F2.4 compression budget-gate ratchet** — adds a CI ratchet that gates compression budget regressions. ([#4232](https://github.com/diegosouzapw/OmniRoute/pull/4232))

### 🐛 Fixed

- **fix(providers): qwen-web model discovery now lists the live catalog instead of nothing** — the `qwen-web` cookie provider had no entry in `PROVIDER_MODELS_CONFIG`, so its model-discovery page returned an empty/stale local catalog (the OAuth fallback at the top of the route only fires for `provider === "qwen"`, leaving `qwen-web` to fall through to the no-config branch). Added a `qwen-web` entry that fetches the **public** `https://chat.qwen.ai/api/v2/models` endpoint (no auth header) and parses the `{ data: { data: [{ id, name, owned_by }] } }` shape (with a flatter `{ data: [] }` fallback). This is Problem #3 of #3931 (diagnosed by @thezukiru); Problem #1 — validator bare-token false-positive — shipped earlier in #3958, and Problem #2 — empty stream from Qwen WAF bot-detection on the streaming endpoint — remains a separate upstream/stealth concern. ([#3931](https://github.com/diegosouzapw/OmniRoute/issues/3931) — thanks @thezukiru)
- **fix(providers): ZenMux model discovery now lists the live catalog (incl. the free models) instead of the stale 9-entry hardcoded list** — adding a ZenMux key validated fine, but the connection then showed `API unavailable — using local catalog` and was missing the free models ZenMux advertises (`z-ai/glm-5.2-free`, `moonshotai/kimi-k2.7-code-free`). Root cause: `zenmux` carries a correct `modelsUrl` in the registry, but — like `llm7`/`byteplus` before #3976 — it was not classified by any live-fetch branch of the model-import route (not `openai-compatible-*`, not self-hosted, not in `NAMED_OPENAI_STYLE_PROVIDERS`), so the route never probed the upstream `/models` and fell through to the registry's hardcoded `models[]`. Added `zenmux` to `NAMED_OPENAI_STYLE_PROVIDERS`, so the route probes `https://zenmux.ai/api/v1/models` (the `/chat/completions`-stripped `<baseUrl>/models` candidate) and serves the live list, falling back to the local catalog only when the upstream fetch fails — import never breaks. ([#4202](https://github.com/diegosouzapw/OmniRoute/issues/4202) — thanks @mikmaneggahommie)
- **fix(providers): Vercel AI Gateway "import models" now loads the live catalog instead of nothing** — adding a Vercel AI Gateway key worked, but clicking **import** on the models page loaded nothing usable (manually adding the same models worked). Same class as #4202 (zenmux) / #3976 (llm7/byteplus): `vercel-ai-gateway` carries a real `baseUrl` (`https://ai-gateway.vercel.sh/v1/chat/completions`, format `openai`) in the registry, but was not classified by any live-fetch branch of the model-import route (not `openai-compatible-*`, not self-hosted, not in `NAMED_OPENAI_STYLE_PROVIDERS`), so the route never probed the upstream `/models` and fell through to the registry's tiny 5-entry hardcoded `models[]`. Added `vercel-ai-gateway` to `NAMED_OPENAI_STYLE_PROVIDERS`, so the route probes `https://ai-gateway.vercel.sh/v1/models` (the `/chat/completions`-stripped `<baseUrl>/models` candidate) and serves the live list, falling back to the local catalog only when the upstream fetch fails — import never breaks. ([#4249](https://github.com/diegosouzapw/OmniRoute/issues/4249) — thanks @FerLuisxd)
- **fix(sse): clear error when the request queue drops a job (no more fake-upstream "This job timed out after Nms")** — under concurrent load, requests that exceed the per-connection rate-limit queue budget (`resilienceSettings.requestQueue.maxWaitMs`) were dropped by Bottleneck with its raw `This job timed out after <maxWaitMs> ms.` message. That string is indistinguishable from an upstream gateway timeout, so the 502 body and call-log `last_error` looked like a provider outage across unrelated providers (TI:0\|TO:0) — an operator spent ~3h misdiagnosing local queue saturation as upstream failures. `withRateLimit` now rewrites that specific Bottleneck error into a clear, OmniRoute-owned message that names the knob (`requestQueue.maxWaitMs`, tunable in Settings → Resilience), explicitly disclaims an upstream timeout, preserves the original as `cause`, and tags `code: "RATE_LIMIT_QUEUE_TIMEOUT"`. Behavior is unchanged — the job is still dropped so combo falls back to the next target. ([#4165](https://github.com/diegosouzapw/OmniRoute/issues/4165) — thanks @KooshaPari)
- **fix(api): advertise the built-in `auto/*` combos in `/v1/models`** — OmniRoute ships a zero-setup `auto/*` catalog (`auto/best-coding`, `auto/pro-reasoning`, …, 16 variants) that the dashboard advertises and that resolve on demand, but the `/v1/models` listing only emitted persisted DB combos + provider models. Clients that build their model picker from `/v1/models` (e.g. Hermes Agent) never saw any `auto/*` option. The catalog now emits every `AUTO_TEMPLATE_VARIANTS` id (as `owned_by: "combo"`) at the top of the list, deduped against persisted combos. (Showing each `auto/*`'s dynamically-selected members is a separate enhancement.) ([#4164](https://github.com/diegosouzapw/OmniRoute/issues/4164) — thanks @MRDGH2821)
- **fix(sse): restore MCP / third-party tool names on the native Claude path (MCP dispatch broken in Claude Code)** — since 3.8.27, every MCP tool call routed through OmniRoute to a native Claude OAuth provider failed client-side with `Error: No such tool available: <PascalCaseName>`: tool schemas arrived fine but the streamed `tool_use.name` reached Claude Code in its cloaked form (e.g. `McpN8nMcpSearchWorkflows` instead of the registered `mcp__n8n-mcp__search_workflows`). The native-Claude tool-name cloak stashes its per-request alias→original map as a **non-enumerable** `_toolNameMap` on the request body; the request-inspector capture added in 3.8.27 rebuilds the captured body from its serialized form (`JSON.parse(JSON.stringify(...))`), which drops non-enumerable properties, so `finalBody._toolNameMap` was empty and the response-side un-cloak silently fell back to the static built-in map — never restoring dynamic MCP / snake_case names. Built-in tools (Bash/Read/…) were unaffected (static map); cross-format paths were unaffected (they attach the map enumerably). The provider-request capture now re-attaches the per-request map (kept non-enumerable, so it still never re-serializes upstream) when the captured copy lost it, restoring MCP tool dispatch. ([#4091](https://github.com/diegosouzapw/OmniRoute/issues/4091) — thanks @pedrotecinf, @NakHalal)
- **fix(dashboard): Logs auto-refresh self-heals in embedded/proxied hosts that pin or mis-fire visibility** — a follow-up to #4054: the Request Logger still froze auto-refresh on some hosts (reported on 3.8.28 Docker, works on 3.8.24). #4054 made the initial visibility fail-open, but the pause is event-driven — a host that fires a one-shot `visibilitychange` → hidden and then keeps reporting `"hidden"` (or recovers without firing the event again) left the cached visibility flag stuck `false`, so the interval ticked but never polled (only the manual Refresh button worked). The poll tick now also re-checks the **live** `document.visibilityState`, and a **window `focus`** listener re-arms polling (a focused window is a reliable signal the page is actively viewed). A genuinely backgrounded browser tab still pauses (it reports `"hidden"` and never receives focus), preserving the #3109 network-saturation optimization. ([#4133](https://github.com/diegosouzapw/OmniRoute/issues/4133) — thanks @tjengbudi)
- **fix(capabilities): unify vision model-id detection into one shared source** — three code paths kept independent, drifting vision-model lists, so the same model id could get up to three different verdicts. Two concrete bugs: lite compression's gate was missing pixtral / llava / qwen-vl / glm-4v / kimi-vl / mistral-medium-3, so it **stripped images for those real vision models and blinded them** (same class as #4071 / #4012); and the `/v1/models` list was too broad, flagging text models (`gemma`, bare `kimi` like `kimi-k2`) as vision. All three (`modelCapabilities` routing fallback, `/v1/models` listing, lite image-strip gate) now delegate to a single conservative source `src/shared/constants/visionModels.ts`, which also restores `glm-4v` / `gemini-3` coverage and keeps the #3328 MiniMax M3 carve-out. ([#4072](https://github.com/diegosouzapw/OmniRoute/issues/4072) — thanks @diego-anselmo)
- **fix(sse): surface mid-stream Gemini errors instead of returning a truncated 200** — when an upstream Gemini SSE stream emitted some partial content and then a JSON error object (`{"error":{"code":503,"message":"…high demand…","status":"UNAVAILABLE"}}`) instead of a `candidates` payload, OmniRoute silently dropped it: the gemini→openai translator's no-candidate branch only handled `promptFeedback` (content-filter) and returned `null` for anything else, so the stream simply ended and the client got HTTP 200 with a truncated body and `finish_reason: "stop"` — masking the failure and skipping combo fallback. `geminiToOpenAIResponse` now detects an `error` object (optionally wrapped in `response`), records it as `state.upstreamError` (preserving the real status — 503/`UNAVAILABLE`, or 429 for `RESOURCE_EXHAUSTED`), and lets `stream.ts` error the stream out through the existing `onFailure`/`buildErrorBody`/`controller.error` path — the same mechanism the openai-responses translator already uses. ([#4177](https://github.com/diegosouzapw/OmniRoute/issues/4177) — thanks @hartmark)
- **fix(capabilities): resolve models.dev-synced vision metadata for Mistral `-latest` aliases** — root cause behind the #4071 heuristic: `getResolvedModelCapabilities("mistral/pixtral-12b-latest").supportsVision` resolved `null` (vision came only from the #4071 model-id heuristic, with `attachment` still `null`) even though models.dev exposes the model as multimodal. Confirmed against the live models.dev API: it catalogs Pixtral 12B under the **short** id `pixtral-12b` (with `attachment: true`, `modalities.input: ["text","image"]`), while requests use the Mistral API alias `pixtral-12b-latest`. The synced lookup tried the exact / raw / static-spec-canonical ids — all of which miss the short form — so it fell through to the heuristic. `getSyncedCapabilityForResolved` now adds a last-resort fallback that retries with a trailing `-latest` stripped, so synced metadata (`attachment` / image modalities) wins for these aliases; models whose `-latest` id is stored verbatim (e.g. `pixtral-large-latest`) keep resolving directly. Note: the models.dev sync is currently manual-only (Settings → models.dev) with no scheduled refresh, so a fresh instance still relies on the #4071 heuristic until that sync runs — a periodic-refresh cadence is left as a separate follow-up. ([#4073](https://github.com/diegosouzapw/OmniRoute/issues/4073) — thanks @diego-anselmo)
- **fix(sse): map Xiaomi MiMo reasoning control to its native `thinking:{type}` shape** — MiMo (`api.xiaomimimo.com`) controls chain-of-thought **only** via top-level `thinking:{type:"enabled"|"disabled"}` and does not understand OpenAI's `reasoning_effort`/`reasoning`, while its request validator is strict (`400 Param Incorrect`). OmniRoute's OpenAI path carried reasoning intent as `reasoning_effort`, and the claude→openai translator can leave a Claude-shaped `thinking:{type, budget_tokens}` — so the client's on/off choice was silently dropped and `budget_tokens`/`reasoning_effort` rode along as extra params the validator can reject. New `open-sse/services/mimoThinking.ts::normalizeMimoThinking` (wired in `chatCore` for `provider==="xiaomi-mimo"`) reduces any thinking object to just `{type}` (`disabled` stays; `enabled`/`adaptive`/other → `enabled`) and drops `reasoning_effort`/`reasoning`. It deliberately does **not** synthesize thinking from a bare `reasoning_effort` — `mimo-v2-omni` is non-thinking, so that could turn a silently-ignored param into a hard error. ([#4224](https://github.com/diegosouzapw/OmniRoute/pull/4224))
- **fix(capabilities): Xiaomi MiMo `*-pro` chat models are text-only (no vision)** — only `mimo-v2.5` and `mimo-v2-omni` accept images per Xiaomi's docs; `mimo-v2.5-pro`/`mimo-v2-pro` are text-only, but `modelSpecs` marked them vision-capable and models.dev mislabels them ([hermes-agent#18884](https://github.com/NousResearch/hermes-agent/issues/18884)). Since `resolveVisionCapability` lets a synced `attachment:true` win first, an image request could be routed to a blind model (the #4071 failure mode). Corrected the specs **and** added a hard override in `resolveVisionCapability` (checked before the synced branch, anchored so `mimo-v2.5-pro` never matches the multimodal `mimo-v2.5`) that beats the wrong synced attachment. Also registered the missing native `mimo-v2-pro` chat model and the missing `mimo-v2-tts` speech model. ([#4224](https://github.com/diegosouzapw/OmniRoute/pull/4224))
- **fix(sse): Claude Opus 4.7+/Fable 5 use adaptive thinking only (no more manual-budget 400s)** — Opus 4.7 and later (Opus 4.7/4.8, Fable 5) removed manual extended thinking: `thinking.type:"enabled"` or **any** `thinking.budget_tokens` now returns `400` ("Any request that tries to set a fixed thinking budget gets a 400" — Anthropic migration guide). Reasoning is adaptive-only, steered by `output_config.effort`. OmniRoute's OpenAI→Claude translator mapped `reasoning_effort` low/medium/high to a manual `thinking:{type:"enabled", budget_tokens}`, so those requests hard-400'd on the most-used provider (and a Claude-native passthrough client sending the legacy shape did too). A new `adaptiveThinkingOnly` model flag now drives two fixes: the translator maps `reasoning_effort` of **every** level to `{type:"adaptive"}` + `output_config.effort` (preserving the requested level, never a budget) for these models, and a `normalizeClaudeAdaptiveThinking` catch-all at the existing post-translation thinking-normalization chokepoint collapses any residual manual thinking (passthrough legacy shape, per-model defaults) to `{type:"adaptive"}`, keyed on the resolved upstream model so it covers every routing mode. Pre-4.7 models (Opus 4.6/4.5, Sonnet, Haiku) keep manual budgets unchanged. ([#4230](https://github.com/diegosouzapw/OmniRoute/pull/4230))
- **fix(providers): strip non-default temperature/top_p/top_k for Claude Opus 4.7+/Fable 5 (fixed sampling → no 400)** — Opus 4.7 and later reject non-default `temperature`/`top_p`/`top_k` with a `400` (sampling is fixed; reasoning moved to `output_config.effort`). The translator forwarded client-supplied `temperature`/`top_p` unconditionally and the Claude registry models carried no `unsupportedParams`, so a plain OpenAI-format request with `temperature: 0.7` to `claude-opus-4-8` hard-400'd. Added `unsupportedParams: ["temperature","top_p","top_k"]` to the Opus 4.7+/Fable 5 ids in both the `claude` (dashed `claude-opus-4-8`) and `anthropic` (dotted `claude-opus-4.7`) registries, so they're stripped at the existing `getUnsupportedParams` dispatch chokepoint. Pre-4.7 Claude models still accept sampling params. ([#4230](https://github.com/diegosouzapw/OmniRoute/pull/4230))
- **fix(providers): conditionally strip temperature/top_p for GPT-5 reasoning on the `openai` Chat Completions path (no 400 when an effort is active)** — GPT-5 reasoning models reject non-default `temperature`/`top_p` with a `400` whenever a reasoning effort is active, yet accept them again under `reasoning_effort:"none"` (the GPT-5.1+ default, i.e. non-reasoning mode). On the `openai` provider only `o3` carried `REASONING_UNSUPPORTED`; `gpt-5.5`/`gpt-5.4`/`gpt-5.4-mini`/`gpt-5.4-nano` carried no sampling guard, so a `temperature` + active-effort request hard-400'd. A static `unsupportedParams` list can't express the `none`-mode carve-out (it would over-strip the legitimate case), so the new `gpt5SamplingGuard` drops `temperature`/`top_p` only when the resolved effort is active — wired at the existing `getUnsupportedParams` chokepoint and scoped to the `openai` Chat Completions surface (the `codex` Responses path is already covered by the CodexExecutor allowlist; other providers are untouched). ([#4245](https://github.com/diegosouzapw/OmniRoute/pull/4245))
- **fix(codex): stop silently dropping GPT-5 output verbosity (`verbosity` / `text.verbosity`)** — the GPT-5 series added an output-verbosity control: `verbosity` (low/medium/high) on Chat Completions, nested as `text.verbosity` on the Responses API. The CodexExecutor gates translated requests through an allowlist that had no `text` entry, so for the `codex` provider the hint was dropped before reaching upstream (the `openai` Chat path already forwarded it). `normalizeCodexVerbosity` now folds whichever shape arrived into a single validated `text:{verbosity}` before the allowlist (which now permits `text`), and the OpenAI Chat↔Responses request translators map `verbosity` across formats so the hint survives a format crossing for non-codex Responses backends too. Invalid/absent verbosity collapses to no `text` (status quo). ([#4245](https://github.com/diegosouzapw/OmniRoute/pull/4245))
- **fix(sse): map `reasoning_effort` to DeepSeek V4's native `{high, max}` vocabulary** — DeepSeek V4 only understands `high`/`max` reasoning levels, so other `reasoning_effort` values are mapped onto its native vocabulary instead of being rejected. ([#4219](https://github.com/diegosouzapw/OmniRoute/pull/4219))
- **fix(glm): default `max_tokens` and an extended timeout for GLM-5.2+ thinking** — GLM-5.2+ thinking responses are slow and need headroom, so OmniRoute now sets a sensible default `max_tokens` and a longer timeout for them. ([#4255](https://github.com/diegosouzapw/OmniRoute/pull/4255) — thanks @dhaern)
- **fix(antigravity): default `includeThoughts` for modern Gemini models** — modern Gemini models on the Antigravity path now default to including thoughts so reasoning isn't silently dropped. ([#4180](https://github.com/diegosouzapw/OmniRoute/pull/4180) — thanks @dhaern)
- **fix(provider-registry): add correct `contextLength` to theoldllm models** — fills in accurate context-window sizes for theoldllm's models. ([#4184](https://github.com/diegosouzapw/OmniRoute/pull/4184) — thanks @herjarsa)
- **fix(models): expose combo model token limits** — `/v1/models` now reports token limits for combo models. ([#4189](https://github.com/diegosouzapw/OmniRoute/pull/4189) — thanks @megamen32)
- **fix(combo): keep the passthrough quota fallback scoped** — prevents the passthrough quota fallback from leaking across unrelated targets. ([#4194](https://github.com/diegosouzapw/OmniRoute/pull/4194) — thanks @Svetznaniy33)
- **fix(combo): opt proactive-fallback compression into the TV1 bail-out (no silent target drop)** — proactive-fallback compression now participates in the TV1 bail-out so a target is never silently dropped. ([#4228](https://github.com/diegosouzapw/OmniRoute/pull/4228))
- **fix(compression): show engine preview output** — the Compression Studio preview now renders the engine's output. ([#4128](https://github.com/diegosouzapw/OmniRoute/pull/4128) — thanks @megamen32)
- **fix(compression): harden engines against I/O failures and misconfig (F5.3)** — compression engines degrade gracefully on I/O errors and bad configuration instead of throwing. ([#4198](https://github.com/diegosouzapw/OmniRoute/pull/4198))
- **fix(compression): harden RTK raw-output redaction + ReDoS guard for custom filters (F5.3)** — broadens RTK raw-output redaction and adds a ReDoS guard for user-supplied filter patterns. ([#4203](https://github.com/diegosouzapw/OmniRoute/pull/4203))
- **fix(compression): bound `mcpAccessibility` `maxTextChars` on the live read path** — the live read path now clamps `maxTextChars` so a small value can't make tools disappear. ([#4206](https://github.com/diegosouzapw/OmniRoute/pull/4206))
- **fix(dashboard): data tables paint an opaque surface so the grid doesn't bleed through** — data tables now render on an opaque surface, fixing the grid wallpaper showing through. ([#4233](https://github.com/diegosouzapw/OmniRoute/pull/4233))
- **fix(dashboard): make the provider card hover visible (was ~1% opacity)** — the provider-card hover state was effectively invisible; it now has a visible surface. ([#4214](https://github.com/diegosouzapw/OmniRoute/pull/4214))
- **fix(vscode): sanitize implicit editor context** — redacts sensitive filenames/keywords from the implicit VS Code editor context before it's sent upstream. ([#4124](https://github.com/diegosouzapw/OmniRoute/pull/4124) — thanks @zhiru)
- **fix(build): raise the Node heap for the local `next build` to stop OOM/stall** — bumps the build-time heap so the local production build no longer OOMs or stalls. ([#4171](https://github.com/diegosouzapw/OmniRoute/pull/4171))
- **fix(mitm): TPROXY OUTPUT-based recipe for local traffic (validated e2e on VPS)** — switches the TPROXY rules to an OUTPUT-chain recipe so locally-originated traffic is captured; validated end-to-end on the VPS. ([#4156](https://github.com/diegosouzapw/OmniRoute/pull/4156))
- **fix(mitm): forward anti-loop — put the bypass-marked socket on the Agent (decrypt 4d)** — places the bypass-marked socket on the HTTP Agent so OmniRoute's own forwarded traffic never re-enters the capture loop; VPS-validated. ([#4229](https://github.com/diegosouzapw/OmniRoute/pull/4229))
- **fix(free-tiers): retire dead-tier `hasFree`, round the headline to ~1.6B, regenerate the per-provider table** — drops dead free tiers from the headline math and regenerates the per-provider free-tier table. ([#4142](https://github.com/diegosouzapw/OmniRoute/pull/4142))
- **fix(free-tiers): retire 4 re-verified-dead free tiers, flag iflytek/sparkdesk ToS, clarify monsterapi one-time** — removes four confirmed-dead free tiers and annotates ToS/one-time caveats. ([#4152](https://github.com/diegosouzapw/OmniRoute/pull/4152))

### 🧪 Tests

- **test(sse): guard the Antigravity `_toolNameMap` cloak map through the request-capture round-trip** — follow-up to #4091: the generic capture fix in `createPreparedRequestLogger().body()` (#4153) re-attaches the non-enumerable `_toolNameMap` that the request-inspector drops when it rebuilds the upstream body via `JSON.parse(JSON.stringify(...))`, but the only regression test covered the native-Claude OAuth cloak (PascalCase aliases). The Antigravity cloak differs — `cloakAntigravityToolPayload` suffixes custom tools with `_ide` (`workspace_read` → `workspace_read_ide`), leaves native tools untouched, and returns the reverse map separately — so a refactor of `providerRequestLogging.ts` or the executor could silently re-break Antigravity tool dispatch without tripping the Claude test. Adds a dedicated regression test driving the real `cloakAntigravityToolPayload` through the capture round-trip and asserting the `_ide` reverse map survives, stays non-enumerable (never re-serializes upstream), and that all-native traffic produces no spurious map (verified failing with the #4153 re-attach removed). No production change. ([#4181](https://github.com/diegosouzapw/OmniRoute/issues/4181) — thanks @hertznsk)
- **test(chatcore): dedicated unit tests for 6 leaves + wire into stryker mutate (QG v2 Fase 9 T5 Fase 3)** — adds focused unit tests for 6 chatCore leaf helpers and enrolls them in mutation testing. ([#4218](https://github.com/diegosouzapw/OmniRoute/pull/4218))
- **test(chatcore): telemetry / memory-skills / semantic-cache tests + wire 2 into stryker (QG v2 Fase 9 T5 Fase 3)** — new tests for the telemetry, memory-skills and semantic-cache leaves, two of which are added to the mutation set. ([#4222](https://github.com/diegosouzapw/OmniRoute/pull/4222))
- **test+ci(chatcore): semanticCache HIT-path fixture (15/15 mutate) + 350min budget headroom** — closes the semantic-cache HIT path to a full 15/15 mutation score and gives the nightly auth/accountFallback batches more budget headroom. ([#4225](https://github.com/diegosouzapw/OmniRoute/pull/4225))
- **test(compression): close F5.1 coverage gaps (replay reducer, live accumulator, StatusDot)** — fills the remaining F5.1 compression coverage gaps. ([#4192](https://github.com/diegosouzapw/OmniRoute/pull/4192))
- **test(db,sse): de-flake db-backup + chatcore streaming timing assertions** — stabilizes two timing-sensitive tests (fire-and-forget backup completion + a streaming race). ([#4132](https://github.com/diegosouzapw/OmniRoute/pull/4132))
- **test: align stale integration tests surfaced post-v3.8.28 on main** — realigns integration tests that drifted after the v3.8.28 merge. ([#4129](https://github.com/diegosouzapw/OmniRoute/pull/4129))

### 📝 Maintenance

- **refactor(sse): split chatCore.ts pure helpers into chatCore/ modules (−561 LOC)** — extracts pure helpers out of the chatCore god-file into dedicated modules (Onda 3). ([#4159](https://github.com/diegosouzapw/OmniRoute/pull/4159))
- **refactor(chatcore): extract passthrough/header/telemetry helpers (QG v2 Fase 9 T5 C2-C3-C5)** — further chatCore decomposition. ([#4188](https://github.com/diegosouzapw/OmniRoute/pull/4188))
- **refactor(chatcore): extract combo/proxy context cache + semaphore helpers (QG v2 Fase 9 T5 C6-C7)** — continues the chatCore split. ([#4193](https://github.com/diegosouzapw/OmniRoute/pull/4193))
- **refactor(combo): god-file split pilot — types + validateQuality + predicates (QG v2 Fase 9 T5 D1-D3)** — first slice of the combo.ts decomposition. ([#4162](https://github.com/diegosouzapw/OmniRoute/pull/4162))
- **refactor(combo): god-file split part 2 — shadow + sorters + structure (QG v2 Fase 9 T5 D4-D6)** — continues the combo.ts split. ([#4175](https://github.com/diegosouzapw/OmniRoute/pull/4175))
- **refactor(combo): god-file split part 3 — auto strategy (QG v2 Fase 9 T5 D8)** — extracts the auto strategy from combo.ts. ([#4186](https://github.com/diegosouzapw/OmniRoute/pull/4186))
- **refactor(combo): extract round-robin sticky state to `combo/rrState.ts` (D7a)** — moves round-robin sticky state into its own module. ([#4196](https://github.com/diegosouzapw/OmniRoute/pull/4196))
- **refactor(combo): extract the reset-aware quota block to `combo/quotaStrategies.ts` (D7b)** — moves the reset-aware quota strategies into their own module. ([#4204](https://github.com/diegosouzapw/OmniRoute/pull/4204))
- **refactor(compression): remove vestigial SLM seam + dead deprecated alias** — drops dead compression code. ([#4253](https://github.com/diegosouzapw/OmniRoute/pull/4253))
- **chore(compression): remove vestigial reconstructCcr/SessionDedup round-trip helpers** — removes unused round-trip helpers. ([#4226](https://github.com/diegosouzapw/OmniRoute/pull/4226))
- **chore(compression): remove dead exports + fix stale llmlingua docs** — prunes dead exports and corrects stale LLMLingua docs. ([#4223](https://github.com/diegosouzapw/OmniRoute/pull/4223))
- **chore(build): build + ship the TPROXY native addon in the standalone (prebuilds 4e)** — bundles the native TPROXY addon prebuilds into the standalone build. ([#4236](https://github.com/diegosouzapw/OmniRoute/pull/4236))
- **chore(ci): add quota + 6 covered chatCore leaves to stryker mutate (QG v2 Fase 9 T5 Fase 3 follow-up)** — enrolls more covered leaves into mutation testing. ([#4209](https://github.com/diegosouzapw/OmniRoute/pull/4209))
- **chore(ci): re-add 8 combo split leaves to stryker mutate + expand nightly batch-matrix 3→5 (QG v2 Fase 9 T5 Fase 3)** — restores mutation coverage for the split combo leaves and widens the nightly matrix. ([#4205](https://github.com/diegosouzapw/OmniRoute/pull/4205))
- **chore(quality): close v3.8.28 cycle gate drift (re-baseline + nightly-mutation scope)** — reconciles quality-gate baselines after the v3.8.28 cycle. ([#4135](https://github.com/diegosouzapw/OmniRoute/pull/4135))
- **ci(mutation): split nightly into 3 parallel batches to fit the 180min budget (QG v2 Fase 9 T0)** — parallelizes the nightly mutation run. ([#4150](https://github.com/diegosouzapw/OmniRoute/pull/4150))
- **ci(mutation): restore cold-seed timeout headroom (a/b lost in #4225 squash) + extend to c/d/g/h** — restores and extends per-batch cold-seed timeouts. ([#4258](https://github.com/diegosouzapw/OmniRoute/pull/4258))
- **ci(docs): harden the fabricated-docs checker + enforce `--strict` (QG v2 Fase 9 T9)** — tightens the anti-hallucination docs checker. ([#4149](https://github.com/diegosouzapw/OmniRoute/pull/4149))
- **ci: derive the oasdiff base-ref from the package version + flag the mutation-toolchain regression** — fixes the OpenAPI-diff base-ref and surfaces a mutation-toolchain regression. ([#4134](https://github.com/diegosouzapw/OmniRoute/pull/4134))
- **docs(ci): correct the mutation-gate note (no regression — `stryker -c` is `--concurrency`); record Task 12 GO** — corrects a misread of the stryker flag and records the spike GO. ([#4138](https://github.com/diegosouzapw/OmniRoute/pull/4138))
- **docs(api): document the `/api/v1/ws` chat WebSocket endpoint in openapi.yaml** — adds the WebSocket chat endpoint to the OpenAPI spec. ([#4215](https://github.com/diegosouzapw/OmniRoute/pull/4215))
- **docs(readme): expand Acknowledgments into a themed, star-counted credits hall** — reworks the README acknowledgments section. ([#4195](https://github.com/diegosouzapw/OmniRoute/pull/4195))
- **style(dashboard): shrink the identity grid cell 46px → 32px (~30% smaller)** — tightens the identity grid density. ([#4143](https://github.com/diegosouzapw/OmniRoute/pull/4143))

### 🔧 Dependencies

- **deps: bump the production group with 5 updates** — routine production-dependency bumps. ([#4121](https://github.com/diegosouzapw/OmniRoute/pull/4121))
- **chore(deps): bump github/codeql-action from 3 to 4** — CI action update. ([#4120](https://github.com/diegosouzapw/OmniRoute/pull/4120))
- **chore(deps): bump actions/setup-python from 5 to 6** — CI action update. ([#4119](https://github.com/diegosouzapw/OmniRoute/pull/4119))

---

## [3.8.28] — 2026-06-17

### ✨ New Features

- **feat(providers): add OrcaRouter (OpenAI-compatible routing gateway)** — OrcaRouter is now registered as an API-key provider. Its adaptive router is exposed as `orcarouter/auto` (smart routing across 150+ upstream models), alongside a curated flagship set (GPT-5.5, Gemini 3.5 Flash, Claude Opus 4.8, Grok 4.3, DeepSeek V4 Pro, MiniMax M2.7, Qwen3.7 Max). `passthroughModels` is enabled so any OrcaRouter model id works. OpenAI-compatible endpoint (`https://api.orcarouter.ai/v1`), Bearer (`sk-orca-…`) auth — no custom executor or translator required. ([#4070](https://github.com/diegosouzapw/OmniRoute/pull/4070) — thanks @jinhaosong-source)
- **feat(providers): add Wafer AI (Anthropic-compatible, Bearer auth)** — Wafer AI is now a built-in provider speaking the Anthropic Messages format with Bearer authentication, registered with its model catalog so it works out of the box. ([#4098](https://github.com/diegosouzapw/OmniRoute/pull/4098) — thanks @diegosouzapw)
- **feat(cli): `omniroute launch` — zero-config Claude Code launcher** — a new CLI subcommand that boots OmniRoute (if not already running) and launches Claude Code pre-wired to it, with no manual env/settings editing. ([#4097](https://github.com/diegosouzapw/OmniRoute/pull/4097) — thanks @diegosouzapw)
- **feat(api): exact offline token counting for the `count_tokens` fallback via tiktoken** — the local `count_tokens` fallback now uses a real tiktoken (BPE) tokenizer for exact offline counts instead of a heuristic estimate, so token budgeting is accurate even when no upstream count endpoint is reachable. ([#4087](https://github.com/diegosouzapw/OmniRoute/pull/4087) — thanks @diegosouzapw)
- **feat(sse): Claude Code quota-probe bypass + command meta-request helpers** — ported from free-claude-code: OmniRoute now recognizes Claude Code's quota-probe and command meta-requests and serves them locally instead of burning an upstream call, reducing wasted quota during CLI sessions. ([#4083](https://github.com/diegosouzapw/OmniRoute/pull/4083) — thanks @diegosouzapw)
- **feat(sse): generic 400 field-downgrade retry + Groq field stripping** — when an upstream rejects a request with `400` because of an unsupported field, OmniRoute now strips the offending field and retries (a generic downgrade path), with Groq-specific field stripping wired in. Aligned with the existing `context_management` retry handling. ([#4096](https://github.com/diegosouzapw/OmniRoute/pull/4096) — thanks @diegosouzapw)
- **feat(sse): delegated Anthropic Context Editing — relay coverage + 400-fallback** — extends the Claude server-side Context Editing delegation (#4021) with broader relay coverage and a `400`-fallback so a request the upstream rejects for the context-management beta degrades gracefully instead of failing. ([#4065](https://github.com/diegosouzapw/OmniRoute/pull/4065) — thanks @diegosouzapw)
- **feat(compression): record per-engine Context Editing telemetry** — the compression pipeline now records a `context-editing` engine entry so the dashboard attributes server-side Context Editing savings alongside the local compression engines. ([#4062](https://github.com/diegosouzapw/OmniRoute/pull/4062) — thanks @diegosouzapw)
- **feat(compression): RTK learn/discover (sample source + API + UI)** — the rule-based RTK compression engine gains a learn/discover workflow: sample a source, surface candidate rules through a new API, and review/apply them in the dashboard. ([#4088](https://github.com/diegosouzapw/OmniRoute/pull/4088) — thanks @diegosouzapw)
- **feat(dashboard): 2026-06-17 free-tier refresh — honest catalog, uncapped + boost tiers, Layout A budget table** — the free-tier page was refreshed with an honest, deep-researched catalog (pooled/realistic figures rather than inflated 24/7 RPM math), new `recurring-uncapped` and boost tiers, new providers, and a KPI + budget table (Layout A). ([#4089](https://github.com/diegosouzapw/OmniRoute/pull/4089) — thanks @diegosouzapw)
- **feat(dashboard): Combo Studio connection-cooldown badge (U1b Slice 2)** — the Combo Live cascade now surfaces each connection's cooldown state as a badge, complementing the circuit-breaker badge shipped in 3.8.27. ([#4068](https://github.com/diegosouzapw/OmniRoute/pull/4068) — thanks @diegosouzapw)
- **feat(mitm): attribute intercepted requests to the originating process (Gap 1)** — the Traffic Inspector now resolves each intercepted connection back to the originating local process (via `/proc`), so captured traffic can be attributed to the app that produced it. (ProxyBridge-inspired hardening.) ([#4085](https://github.com/diegosouzapw/OmniRoute/pull/4085) — thanks @diegosouzapw)
- **feat(mitm): capture-pipeline self-test route (Gap 12)** — a diagnostic route that exercises the MITM capture pipeline end-to-end so operators can confirm interception is working without crafting a real upstream call. ([#4093](https://github.com/diegosouzapw/OmniRoute/pull/4093) — thanks @diegosouzapw)
- **feat(mitm): loop-guard self-check + verbosity control in `server.cjs` (Gaps 14+15)** — the MITM proxy gains a self-referential loop guard (so it never proxies its own traffic into an infinite loop) and a `MITM_VERBOSE` routing-decision log level. ([#4101](https://github.com/diegosouzapw/OmniRoute/pull/4101) — thanks @diegosouzapw)
- **feat(agent-bridge): portable JSON import/export of config (Gap 4)** — the Agent Bridge / MITM configuration can now be exported to and imported from a portable JSON file, so a working setup can be backed up or moved between machines. ([#4094](https://github.com/diegosouzapw/OmniRoute/pull/4094) — thanks @diegosouzapw)

### 🐛 Fixed

- **fix(ws): start the LiveWS sidecar with `cwd` at the package root (global/systemd installs)** — the standalone LiveWS launcher (`scripts/start-ws-server.mjs`) re-spawns itself with `node --import tsx <self>` but did not set `cwd`. When the WebSocket sidecar was launched from outside the package directory — a global npm/homebrew install, or a `systemd`/`launchd` unit started from `$HOME` — Node could not resolve the `tsx` package (`ERR_MODULE_NOT_FOUND: Cannot find package 'tsx'`), and even from the package directory `tsx` could not resolve the tsconfig `@/*` path aliases (e.g. `@/types/databaseSettings`), so the sidecar never booted. The spawn now pins `cwd` to the package root (the directory above `scripts/`, where `package.json` + `tsconfig.json` live), which resolves both `tsx` discovery and the `@/*` aliases regardless of launch directory. ([#4055](https://github.com/diegosouzapw/OmniRoute/issues/4055) — thanks @Rahulsharma0810)
- **fix(dashboard): Logs page auto-refresh now works in embedded/proxied dashboards** — the Request Logger gated each auto-refresh tick on a static `document.visibilityState === "visible"` read. Hosts that report a permanent non-`"visible"` state without ever firing a `visibilitychange` event (Docker dashboard wrappers, embedded webviews) froze auto-refresh entirely — only the manual Refresh button worked, a regression from 3.8.24's unconditional polling. The pause is now event-driven and fail-open: polling starts enabled and only pauses after a real `visibilitychange` → hidden transition (still preserving the backgrounded-tab optimization for normal browser tabs). ([#4054](https://github.com/diegosouzapw/OmniRoute/issues/4054) — thanks @tjengbudi)
- **fix(docker): raise the build-stage Node heap to stop the production-build OOM** — the Docker `builder` stage ran `npm run build` with V8's default heap ceiling (~2 GB). After #4052 forced the heavier webpack engine (Turbopack panics on this Next.js version), the production optimization pass exceeded that ceiling and the build died with `FATAL ERROR: … JavaScript heap out of memory` at `[builder] npm run build`. The builder stage now sets `NODE_OPTIONS=--max-old-space-size` (default 4096 MB, overridable via `--build-arg OMNIROUTE_BUILD_MEMORY_MB=…`) before the build; the value propagates to the spawned `next build`. Build-only — the runtime heap (`OMNIROUTE_MEMORY_MB` on the runner stage) is unchanged. ([#4076](https://github.com/diegosouzapw/OmniRoute/issues/4076) — thanks @kamenkadmitry)
- **fix(dashboard): "Update Available" banner reappears reliably across Docker/npm/desktop installs** — the home-page banner is gated on `GET /api/system/version`'s `updateAvailable`, which derived the latest version ONLY from `npm info omniroute version --json` via the `npm` CLI binary. When that binary is absent from the runtime PATH (Docker/desktop/locked-down installs) or the registry is unreachable, the call returned `null` → `updateAvailable=false` → the banner silently never rendered even when a newer release existed. The route now resolves the latest version through `resolveLatestVersion()`: the fast `npm` CLI path first, then an npm-binary-free fallback over the registry HTTP API (`registry.npmjs.org/omniroute/latest`), and a logged warning instead of silent degradation when both fail. Version comparison was also hardened to tolerate `v`-prefixed and pre-release version strings. ([#4100](https://github.com/diegosouzapw/OmniRoute/issues/4100))
- **fix(sse): route image requests only to confirmed-vision combo targets** — a combo could route an image-bearing request to a member that doesn't actually support vision. Routing now requires `supportsVision === true` (plus a model-id heuristic) before sending images to a target, so multimodal requests land only on members that can handle them. ([#4071](https://github.com/diegosouzapw/OmniRoute/pull/4071) — thanks @diego-anselmo)
- **fix(security): injection guard respects the `INJECTION_GUARD_MODE` DB feature flag** — the prompt-injection guard ignored the database feature-flag, so operators couldn't change its mode at runtime; it now reads the flag and honors the configured mode. ([#4077](https://github.com/diegosouzapw/OmniRoute/pull/4077) — thanks @zhiru)
- **fix(ws): proxy LAN `/live-ws` upgrades and warn on an unset `JWT_SECRET`** — WebSocket upgrade requests arriving over the LAN proxy path were not forwarded to the LiveWS sidecar; they are now proxied correctly, and the server logs a clear warning when `JWT_SECRET` is unset. ([#4079](https://github.com/diegosouzapw/OmniRoute/pull/4079) — thanks @Rahulsharma0810)
- **fix(dev): force webpack in the custom dev server (Turbopack 16.2.x panics)** — the custom dev server now forces the webpack engine because Turbopack panics on this Next.js version, so `npm run dev` boots reliably. ([#4092](https://github.com/diegosouzapw/OmniRoute/pull/4092) — thanks @chirag127)
- **fix(auto): resolve built-in `auto/*` catalog combos** — referencing a built-in `auto/*` combo returned a premature `400` because the catalog entry wasn't resolved; the built-in auto catalog is now resolved before validation so those combos work. ([#4058](https://github.com/diegosouzapw/OmniRoute/pull/4058) — thanks @megamen32)
- **fix(sse): friendly 413 message for ChatGPT-web payload-too-large** — an oversized ChatGPT-web payload returned an opaque error; it now returns a clear `413` with a human-readable message. ([#4080](https://github.com/diegosouzapw/OmniRoute/pull/4080) — thanks @diegosouzapw)
- **fix(ws): warm the SSE auth import on LiveWS startup; relocate the boot test to integration** — the LiveWS sidecar now pre-imports the SSE auth module at startup to avoid a first-request stall, and its boot test was moved to the integration suite. ([#4063](https://github.com/diegosouzapw/OmniRoute/pull/4063) — thanks @diegosouzapw)
- **fix(mitm): crash-safe system-state teardown + socket timeouts (ProxyBridge-inspired hardening)** — the MITM proxy could leave the host's system proxy settings applied if it crashed mid-teardown, and long-lived tunnels could leak as half-open sockets. Teardown is now crash-safe (system state is always restored) and proxied sockets get an idle timeout (`MITM_IDLE_TIMEOUT_MS`, default 60s). ([#4084](https://github.com/diegosouzapw/OmniRoute/pull/4084) — thanks @diegosouzapw)
- **fix(responses): clear the `/v1/responses` keep-alive timer on cancel/abort** — a cancelled or aborted `/v1/responses` stream left its keep-alive timer running, leaking a timer and burning CPU; the timer is now cleared on cancel/abort. ([#4105](https://github.com/diegosouzapw/OmniRoute/pull/4105) — thanks @artickc)
- **fix(usage): reap orphaned pending-request details (unbounded memory leak)** — pending-request detail entries whose request never completed accumulated without bound; they are now reaped, closing a slow memory leak. ([#4107](https://github.com/diegosouzapw/OmniRoute/pull/4107) — thanks @artickc)
- **fix(auth): prune expired entries from the login brute-force guard map (unbounded growth)** — the login brute-force guard map grew without bound because expired entries were never removed; expired entries are now pruned. ([#4111](https://github.com/diegosouzapw/OmniRoute/pull/4111) — thanks @artickc)
- **fix(logger): hard-cap the error-dedup map to bound memory under unique-message bursts** — a burst of unique error messages could grow the dedup map without limit; it is now hard-capped. ([#4113](https://github.com/diegosouzapw/OmniRoute/pull/4113) — thanks @artickc)
- **fix(circuit-breaker): enforce `MAX_REGISTRY_SIZE` (declared but never applied)** — the circuit-breaker registry declared a maximum size that was never enforced, so it could grow unbounded; the cap is now applied. ([#4114](https://github.com/diegosouzapw/OmniRoute/pull/4114) — thanks @artickc)
- **fix(webhook): clear the abort timer in `finally` to avoid dangling timers on fetch error** — a webhook dispatch that threw before clearing its abort timer left the timer dangling; it is now cleared in a `finally` block. ([#4115](https://github.com/diegosouzapw/OmniRoute/pull/4115) — thanks @artickc)
- **fix(combo): detach the per-target listener from the shared hedge abort signal** — combo hedging attached a per-target listener to a shared abort signal without detaching it, leaking listeners across requests; the listener is now detached. ([#4116](https://github.com/diegosouzapw/OmniRoute/pull/4116) — thanks @artickc)
- **fix(timers): unref background interval timers so they don't block clean shutdown** — long-lived background interval timers kept the event loop alive and blocked a clean process exit; they are now `unref`'d. ([#4117](https://github.com/diegosouzapw/OmniRoute/pull/4117) — thanks @artickc)

### ⚡ Performance

- **perf(registry): precompute the model→provider index in `parseModelFromRegistry`** — model→provider lookups now use a precomputed index instead of scanning the registry on every call. ([#4110](https://github.com/diegosouzapw/OmniRoute/pull/4110) — thanks @artickc)
- **perf(obfuscation): cache per-word regexes instead of recompiling every request** — the obfuscation pass now caches its per-word regexes rather than recompiling them on each request. ([#4109](https://github.com/diegosouzapw/OmniRoute/pull/4109) — thanks @artickc)
- **perf(stream): use `structuredClone` instead of a JSON round-trip for per-chunk reasoning split** — the per-chunk reasoning split now clones with `structuredClone` rather than `JSON.parse(JSON.stringify(...))`. ([#4108](https://github.com/diegosouzapw/OmniRoute/pull/4108) — thanks @artickc)
- **perf(gemini): cache the reasoning close-tag regex instead of recompiling per token** — the Gemini reasoning close-tag regex is now compiled once and reused instead of per token. ([#4106](https://github.com/diegosouzapw/OmniRoute/pull/4106) — thanks @artickc)

### 📝 Maintenance

- **ci(quality): flip the TIA impacted-unit-tests gate from advisory to blocking (Fase 9)** — the test-impact-analysis gate that runs the unit tests impacted by a diff is now blocking on PRs. ([#4069](https://github.com/diegosouzapw/OmniRoute/pull/4069) — thanks @diegosouzapw)
- **ci(quality): dedup the doubly-run `check:docs-sync` + record the validated ROI backlog (Fase 9)** — `check:docs-sync` was running twice in CI; the duplicate was removed and the validated quality-gate ROI backlog recorded. ([#4099](https://github.com/diegosouzapw/OmniRoute/pull/4099) — thanks @diegosouzapw)
- **docs(quality-gates): reconcile the gate inventory with `ci.yml` + add the ROI rationalization backlog** — the quality-gate inventory doc was reconciled against the actual CI jobs and a rationalization backlog added. ([#4095](https://github.com/diegosouzapw/OmniRoute/pull/4095) — thanks @diegosouzapw)
- **test(infra): isolate `DATA_DIR` per test process; raise Stryker concurrency 1→4** — test processes now get an isolated `DATA_DIR` (no shared-DB cross-talk) and the mutation runner's concurrency was raised. ([#4078](https://github.com/diegosouzapw/OmniRoute/pull/4078) — thanks @diegosouzapw)
- **test(dashboard): smoke e2e for the Combo Live Studio page** — adds a Playwright smoke test covering the Combo Live Studio page. ([#4075](https://github.com/diegosouzapw/OmniRoute/pull/4075) — thanks @diegosouzapw)
- **docs(compression): document LLMLingua optional deps + on-demand install** — documents the optional LLMLingua dependencies and how they are installed on demand. ([#4061](https://github.com/diegosouzapw/OmniRoute/pull/4061) — thanks @diegosouzapw)
- **chore(deps): freeze `@huggingface/transformers` in dependabot (hard-pin)** — the transformers dependency is hard-pinned and frozen in dependabot to protect the VPS-validated LLMLingua + memory-embeddings stack from a breaking major bump. ([#4066](https://github.com/diegosouzapw/OmniRoute/pull/4066) — thanks @diegosouzapw)
- **chore(docs): update the Discord invite link to a non-expiring one** — replaces the expiring Discord invite with a permanent link. ([#4067](https://github.com/diegosouzapw/OmniRoute/pull/4067) — thanks @diegosouzapw)
- **chore(docs): document the new MITM env vars + reconcile the env-doc contract** — documents `MITM_IDLE_TIMEOUT_MS` and `MITM_VERBOSE` in `.env.example` + `ENVIRONMENT.md`, allowlists the framework-internal `TURBOPACK` and the Claude Code `ANTHROPIC_AUTH_TOKEN`, and relocates/prunes stale provider/guide docs. (thanks @diegosouzapw)

### 🔧 Dependencies

- **deps: bump the development group with 10 updates** — routine dependabot dev-dependency bumps. ([#4051](https://github.com/diegosouzapw/OmniRoute/pull/4051))
- **deps(electron): bump electron 42.4.0 → 42.4.1** — ([#4049](https://github.com/diegosouzapw/OmniRoute/pull/4049))
- **ci(deps): bump `actions/setup-node` 4 → 6** — ([#4048](https://github.com/diegosouzapw/OmniRoute/pull/4048))
- **ci(deps): bump `actions/cache` 4.3.0 → 5.0.5** — ([#4047](https://github.com/diegosouzapw/OmniRoute/pull/4047))
- **ci(deps): bump `actions/github-script` 7 → 9** — ([#4046](https://github.com/diegosouzapw/OmniRoute/pull/4046))
- **ci(deps): bump `ossf/scorecard-action` 2.4.0 → 2.4.3** — ([#4045](https://github.com/diegosouzapw/OmniRoute/pull/4045))
- **ci(deps): bump `actions/upload-artifact` 4 → 7** — ([#4044](https://github.com/diegosouzapw/OmniRoute/pull/4044))

---

## [3.8.27] — 2026-06-17

### ✨ New Features

- **feat(combos): advertise combo capabilities (multimodal / reasoning / caching) on the import surfaces** — importing a combo package into a client (LobeHub / OpenCode / VS Code, via `/v1/combos` and the VS Code combo catalog) no longer requires manually enabling multimodal/image-input, reasoning, and caching afterwards. `projectCombo` now attaches a registry-derived `capabilities` block, gated conservatively: `multimodal`/`reasoning` are advertised only when **every** concrete model step proves the capability (an unprovable nested combo-ref drops them, since the strategy may route to any member), and `caching` reflects the combo's explicit Context-Cache-Protection setting (no surprise prompt-cache cost). The public `/v1/combos` default projection (#2300) is unchanged unless the caller opts in. ([#3979](https://github.com/diegosouzapw/OmniRoute/issues/3979) — thanks @xenstar)
- **feat(sse): delegated Anthropic Context Editing for Claude (`clear_tool_uses`)** — Claude requests can now offload context trimming to Anthropic's server-side context-management API (beta `context-management-2025-06-27`, `clear_tool_uses_20250919`), pruning stale tool-use turns upstream instead of locally. Claude-only by nature (the edit runs server-side); multi-provider context trimming remains the job of the local compression engines. ([#4021](https://github.com/diegosouzapw/OmniRoute/pull/4021) — thanks @diegosouzapw)
- **feat(sse): real LLMLingua-2 ONNX compression engine (stable)** — the LLMLingua-2 prompt-compression engine is now a real local ONNX model (TinyBERT default, transformers.js + tfjs), promoted to stable after VPS validation, replacing the previous placeholder. ([#4014](https://github.com/diegosouzapw/OmniRoute/pull/4014) — thanks @diegosouzapw)
- **feat(compression): capture per-engine analytics + Lite schema fix** — the compression pipeline now persists a per-engine breakdown for historical analytics so the dashboard can attribute savings to each engine in a stacked pipeline, and a Lite-schema mismatch was corrected. ([#4018](https://github.com/diegosouzapw/OmniRoute/pull/4018) — thanks @diegosouzapw)
- **feat(dashboard): real circuit-breaker state in the Combo Live cascade (U1b)** — the Combo Live cascade view now surfaces each provider's real circuit-breaker state (CLOSED / OPEN / HALF_OPEN) as a badge, read live from `/api/monitoring/health`, instead of inferring health from request outcomes. ([#4029](https://github.com/diegosouzapw/OmniRoute/pull/4029) — thanks @diegosouzapw)
- **feat(openai): honor a custom base URL in model discovery + complete openai/codex pricing** — OpenAI-format providers configured with a custom base URL now have that URL honored during model discovery (not just inference), and the openai/codex pricing table was completed. Discovery is routed through the SSRF-guarded outbound fetch. ([#4005](https://github.com/diegosouzapw/OmniRoute/pull/4005) — thanks @artickc)
- **feat(observability): capture actual upstream provider requests** — the request inspector now records the exact payload sent to the upstream provider (post-translation), so you can see what OmniRoute actually dispatched rather than only the client's original request. ([#3941](https://github.com/diegosouzapw/OmniRoute/pull/3941) — thanks @rdself)
- **feat(providers): provider auth visibility controls** — adds controls to show/hide provider auth details in the dashboard so credentials can be revealed only when needed. ([#3953](https://github.com/diegosouzapw/OmniRoute/pull/3953) — thanks @rdself)
- **feat(providers): model search filter on the provider dashboard** — the provider dashboard gains a search filter to quickly narrow a provider's model list. ([#3950](https://github.com/diegosouzapw/OmniRoute/pull/3950) — thanks @felipesartori)
- **feat(compression): Indonesian caveman rules + language pack** — adds an Indonesian "caveman" rule set and language pack to the rule-based compression engine. ([#3975](https://github.com/diegosouzapw/OmniRoute/pull/3975) — thanks @Veier04)
- **feat(dashboard): sidebar group separator toggles** — the dashboard sidebar can now toggle group separators for a cleaner navigation layout. ([#3971](https://github.com/diegosouzapw/OmniRoute/pull/3971) — thanks @rdself)
- **feat(api): local `@@om-usage` command for cached per-key usage** — API clients can send a message that is exactly `@@om-usage` to retrieve cached Claude-style usage data locally, without forwarding the prompt to an upstream provider. Gated by a new per-key allowance flag. ([#4034](https://github.com/diegosouzapw/OmniRoute/pull/4034) — thanks @Witroch4)

### 🐛 Fixed

- **fix(opencode): forward the OpenCode session id to the upstream regardless of how the user named the provider** — the `OpencodeExecutor` forwarded the `x-opencode-session/request/project/client` headers, but the OpenCode CLI only emits those when the configured `providerID` **starts with** `"opencode"`. A user who adds OmniRoute as a custom provider (e.g. `"omniroute"`) makes the CLI send `x-session-affinity` / `X-Session-Id` instead (both carry the same session id), which the executor never read — so the session-metadata forwarding was effectively dead code for the realistic provider-naming case. The opencode-family executor now falls back to `x-session-affinity` / `X-Session-Id` and maps it onto `x-opencode-session` when the client didn't send the header directly, so session continuity to the `opencode.ai` upstream works for any provider name (a direct `x-opencode-session` still wins). Scoped to this executor only — the generic `DefaultExecutor` intentionally does **not** do this, to avoid leaking the client session id to arbitrary third-party upstreams. ([#4022](https://github.com/diegosouzapw/OmniRoute/issues/4022) — thanks @pizzav-xyz)
- **fix(guardrails): Vision Bridge no longer drops the image when the describe call fails (Nvidia NIM "Image unavailable")** — the Vision Bridge is enabled by default and engages for any model whose vision capability OmniRoute can't prove from the registry (`supportsVision !== true`, which includes uncatalogued models that resolve to `null`). When the per-image describe call failed (e.g. no vision model configured), it replaced the image with the literal text `[Image N]: (unavailable)` and dropped the original `image_url` — so a genuinely vision-capable upstream (Nvidia NIM) received text only and answered "Image unavailable. Cannot provide description without visual data." A describe failure is no longer destructive: `replaceImageParts` now receives `null` for failed images and **preserves the original image part** so the upstream can still see it (successful describes still replace the image with the text description; `meta.descriptions` observability is unchanged). ([#4012](https://github.com/diegosouzapw/OmniRoute/issues/4012) — thanks @daniij)
- **fix(kiro): preserve `finish_reason: "tool_calls"` on the Kiro streaming path** — streaming tool-call requests through the Kiro (Responses API) provider had their terminal `finish_reason` reported as `"stop"` instead of `"tool_calls"`, so agent clients (Hermes) treated the tool-call turn as a finished turn, never ran the tool, and the next request failed with HTTP 400 on the incomplete tool state. `convertKiroToOpenAI`'s terminal `messageStopEvent`/`done` branch hardcoded `finish_reason: "stop"` regardless of whether the stream had emitted `toolUseEvent`s. The translator now records `state.sawToolUse` when a tool-use chunk is emitted and reports `finish_reason: "tool_calls"` on the terminal chunk (and in `state.finishReason`) whenever the stream produced tool calls. The non-streaming path was already correct. ([#3980](https://github.com/diegosouzapw/OmniRoute/issues/3980) — thanks @lordavadon2)
- **fix(resilience): respect connection cooldown stored as a numeric epoch** — the router kept dispatching to connections still inside their rate-limit cooldown because `rate_limited_until` (a `TEXT` column) was persisted as a raw epoch number, which SQLite coerced to a string like `"1781696905131.0"` that `new Date(...)` parsed as `NaN`, so the cooling connection was never skipped. The cooldown read predicates now normalize numeric-epoch strings via a shared `cooldownUntilMs()` helper; ISO behavior is unchanged. ([#3995](https://github.com/diegosouzapw/OmniRoute/pull/3995) — thanks @diegosouzapw)
- **fix(providers): fetch the live `/models` catalog for LLM7 and BytePlus** — importing an LLM7 or BytePlus key surfaced only a small, outdated hardcoded list because neither provider was classified by any live-fetch branch of the model-import route. Both are now in `NAMED_OPENAI_STYLE_PROVIDERS`, so the route probes `<baseUrl>/models` with the key and serves the live catalog, falling back to the local catalog only when the upstream fetch fails. ([#3996](https://github.com/diegosouzapw/OmniRoute/pull/3996) — thanks @FerLuisxd / @diegosouzapw)
- **fix(dashboard): logs auto-refresh reads live visibility, not a stale mount ref** — the Logs page never auto-refreshed when the tab loaded in the background because the auto-refresh interval gated each tick on a visibility ref seeded once at mount; the tick now reads the live `document.visibilityState`, so polling self-heals as soon as the tab is visible while still pausing when genuinely hidden. ([#3997](https://github.com/diegosouzapw/OmniRoute/pull/3997) — thanks @tjengbudi / @diegosouzapw)
- **fix(combo): shuffle the strict-random fallback remainder to spread load** — with the `strict-random` strategy a persistently-failing model was retried on essentially every request because only the deck-selected slot 0 was shuffled while the fallback remainder stayed in fixed priority order; the remainder is now shuffled too, so fallback load (and recovery from a failing target) spreads evenly across healthy peers. ([#3998](https://github.com/diegosouzapw/OmniRoute/pull/3998) — thanks @KeNJiKunG / @diegosouzapw)
- **fix(claude): forward the client `tool-search-tool-2025-10-19` anthropic-beta on the Claude OAuth path** — with deferred tools active, Claude Code negotiates the `tool-search-tool-2025-10-19` beta, but OmniRoute dropped it on both Claude code paths, so the claude.ai backend rejected every deferred-tool request with `400 Tool reference not found`. A new allowlist-merge (`mergeClientAnthropicBeta`) now unions the client's negotiated beta into the outbound set on both paths, appending only allowlisted client betas (preserving the #3415 fix). ([#3999](https://github.com/diegosouzapw/OmniRoute/pull/3999) — thanks @huohua-dev / @diegosouzapw)
- **fix(executor): strip `stream_options` on non-streaming requests (NVIDIA NIM 400)** — clients that send `stream_options: { include_usage: true }` regardless of `stream` (e.g. the OpenAI Python SDK) had it passed through untouched on non-streaming calls, and NVIDIA NIM rejected it with `400 "Stream options can only be defined when stream=True"`. `DefaultExecutor.transformRequest` now strips `stream_options` whenever `stream` is false; the streaming injection path is unchanged. ([#4000](https://github.com/diegosouzapw/OmniRoute/pull/4000) — thanks @andrea-kingautomation / @daniij / @diegosouzapw)
- **fix(sse): guard model-less registry entries in `getUnsupportedParams` (mimocode)** — a registry entry without a model map (mimocode) threw when computing unsupported params; the lookup now guards the model-less case so request validation no longer crashes. ([#4015](https://github.com/diegosouzapw/OmniRoute/pull/4015) — thanks @diegosouzapw)
- **fix(perplexity-web): parse the schematized `diff_block` stream so answers aren't empty** — Perplexity web streamed its answer as RFC-6902 `diff_block` patches that OmniRoute didn't apply during the `PENDING` phase, so responses came back empty; the parser now applies the patches and materializes the text only on `COMPLETED`. ([#4001](https://github.com/diegosouzapw/OmniRoute/pull/4001) — thanks @artickc)
- **fix(default-executor): honor a custom `providerSpecificData.baseUrl` for OpenAI-format providers** — OpenAI-format providers configured with a custom base URL had it ignored on the inference path; the default executor now honors `providerSpecificData.baseUrl` so requests reach the configured endpoint. ([#4002](https://github.com/diegosouzapw/OmniRoute/pull/4002) — thanks @artickc)
- **fix(live-ws): bridge LiveWS sidecar events to the dashboard** — events emitted by the LiveWS sidecar were not reaching the dashboard; they are now bridged so live websocket activity is visible. (A cookie-auth regression in the sidecar's auth-token parsing was also corrected.) ([#4004](https://github.com/diegosouzapw/OmniRoute/pull/4004) — thanks @megamen32)
- **fix(qwen-web): cookie validation false-positive — check the response body for a user object** — Qwen web cookie validation reported a valid cookie as invalid; it now inspects the response body for the `user` object instead of relying on the status code alone. ([#3958](https://github.com/diegosouzapw/OmniRoute/pull/3958) — thanks @thezukiru)
- **fix(vision-bridge): force the bridge for tokenrouter deepseek models** — tokenrouter DeepSeek models are now forced through the Vision Bridge so image inputs are handled correctly. ([#3946](https://github.com/diegosouzapw/OmniRoute/pull/3946) — thanks @WormAlien)
- **fix(api): return 400 (not 500) for malformed JSON on `/api/auth/login`** — a malformed JSON body on the login endpoint returned an opaque 500; it now returns a proper 400. ([#4031](https://github.com/diegosouzapw/OmniRoute/pull/4031) — thanks @rdself)
- **fix(dashboard): Playground Compare tab loading + HTTP method guard** — the Playground Compare tab failed to load; the loading path was fixed and an HTTP method guard added. ([#4024](https://github.com/diegosouzapw/OmniRoute/pull/4024) — thanks @rdself)
- **fix(proxy): gate the control-plane proxy direct fallback behind a feature flag (fail-closed)** — the direct-connection fallback for control-plane ops when a pinned proxy is unreachable is now gated behind a feature flag and fails closed, so a pinned proxy is never silently bypassed unless explicitly allowed. ([#3963](https://github.com/diegosouzapw/OmniRoute/pull/3963) — thanks @rdself)
- **fix(db): persist backup retention days** — the backup retention-days setting was not persisted across restarts; it is now stored durably. ([#3970](https://github.com/diegosouzapw/OmniRoute/pull/3970) — thanks @rdself)
- **fix(dashboard): refine the provider quota card display** — the provider quota card layout was refined for clearer quota/usage presentation. ([#3969](https://github.com/diegosouzapw/OmniRoute/pull/3969) — thanks @rdself)
- **fix(dashboard): refine compression settings, storage labels, and sidebar grouping** — polishes the compression-settings UI, clarifies storage labels, and tidies the sidebar grouping. ([#4033](https://github.com/diegosouzapw/OmniRoute/pull/4033) — thanks @rdself)

### 🔒 Security & Hardening

- **fix(security): eliminate a polynomial ReDoS in the combo `<omniModel>` tag regex** — `comboAgentMiddleware`'s cache-tag pattern wrapped the tag in an unbounded newline run (`(?:\n|\r)*`), making `.test()` / `.replace()` run in O(n²) on inputs with many newlines (CodeQL `js/polynomial-redos`). The detection pattern now matches only the core `<omniModel>…</omniModel>` and the global strip pattern bounds the surrounding newline runs, keeping it linear; detection / extraction / multi-tag stripping behavior is unchanged. ([#3982](https://github.com/diegosouzapw/OmniRoute/pull/3982) — thanks @diegosouzapw)
- **ci(security): harden workflows — artipacked `persist-credentials`, cache-poisoning, SC2086** — GitHub Actions workflows were hardened against the artipacked `persist-credentials` leak and cache-poisoning, and shell-quoting (`SC2086`) issues were fixed. ([#3965](https://github.com/diegosouzapw/OmniRoute/pull/3965) — thanks @diegosouzapw)
- **ci(quality): flip require-tighten + osv + Trivy to blocking (cycle-end)** — the per-module require-tighten check and the OSV / Trivy scanners moved from advisory to blocking for the v3.8.27 cycle close, so new dependency or coverage regressions fail CI. ([#3984](https://github.com/diegosouzapw/OmniRoute/pull/3984) — thanks @diegosouzapw)
- **chore(deps): dependabot security bumps + drop unused gray-matter** — applies a batch of Dependabot security bumps and removes the unused `gray-matter` dependency from the tree. ([#4036](https://github.com/diegosouzapw/OmniRoute/pull/4036) — thanks @diegosouzapw)
- **chore(deps): automated dependency bumps** — Dependabot upgraded the production dependency group (13 updates), `vite`, `form-data`, and the `npm_and_yarn` group. ([#3915](https://github.com/diegosouzapw/OmniRoute/pull/3915), [#3942](https://github.com/diegosouzapw/OmniRoute/pull/3942), [#3943](https://github.com/diegosouzapw/OmniRoute/pull/3943), [#3944](https://github.com/diegosouzapw/OmniRoute/pull/3944) — thanks @dependabot)

### 🧹 Internal / Quality / Docs

- **feat(ci): Quality Gate v2 — Onda 0 + Onda 1** — first two waves of the Quality Gate v2 program: gate flips, test-impact analysis (TIA), SAST, DAST-smoke, and mutation-testing infrastructure. ([#4016](https://github.com/diegosouzapw/OmniRoute/pull/4016) — thanks @diegosouzapw)
- **refactor: modularize the provider registry into individual provider plugins** — `providerRegistry.ts` was split into individual per-provider plugin modules (non-stacked). A forward-fix restored the `byteplus` + `mimocode` modules dropped by the move. ([#3993](https://github.com/diegosouzapw/OmniRoute/pull/3993) — thanks @oyi77 / @diegosouzapw)
- **refactor: modularize schemas (non-stacked)** — the request/response schema definitions were split into individual modules to reduce file size and improve maintainability. ([#3988](https://github.com/diegosouzapw/OmniRoute/pull/3988) — thanks @oyi77)
- **fix: restore unit regressions dropped by the lossy schema/registry modularizations** — the schema/registry modularizations (#3988, #3993) silently dropped internal logic covered by unit tests; this PR restores the regressed units. ([#4030](https://github.com/diegosouzapw/OmniRoute/pull/4030) — thanks @diegosouzapw)
- **refactor(dashboard): settings UI layout + API Keys naming** — the settings UI layout was reorganized and the "API Keys" naming clarified. ([#4020](https://github.com/diegosouzapw/OmniRoute/pull/4020) — thanks @rdself)
- **大量UI显示和i18n优化 (dashboard UI display + i18n improvements)** — a batch of dashboard UI-display refinements and i18n string improvements. ([#3973](https://github.com/diegosouzapw/OmniRoute/pull/3973) — thanks @rdself)
- **fix(ci): scope TIA to `node:test` unit files only** — test-impact analysis was matching files the `node:test` runner doesn't execute, producing 99 false failures; the TIA glob now mirrors the `test:unit` glob exactly. ([#4035](https://github.com/diegosouzapw/OmniRoute/pull/4035) — thanks @diegosouzapw)
- **fix(ci): electron-release publish-npm needs `contents: write`** — the reusable npm-publish job invoked by the electron release lacked `contents: write`, causing a v3.8.26 `startup_failure`; the permission was granted. ([#3966](https://github.com/diegosouzapw/OmniRoute/pull/3966) — thanks @diegosouzapw)
- **test(opencode-plugin): ESM default-export test (drop the stale CJS bundle test)** — replaces the stale CJS bundle test with an ESM default-export test, following up the #3883 ESM-only migration. ([#3967](https://github.com/diegosouzapw/OmniRoute/pull/3967) — thanks @diegosouzapw)
- **fix(ci): Fix promptfoo security-assertion parsing** — the promptfoo (DAST/security eval) assertion parser was corrected so security assertions are read reliably. ([#4032](https://github.com/diegosouzapw/OmniRoute/pull/4032) — thanks @rdself)
- **docs(troubleshooting): note that the MITM proxy cannot intercept Windows-host apps under WSL** — documents that the MITM proxy running inside WSL cannot intercept traffic from apps on the Windows host. ([#4003](https://github.com/diegosouzapw/OmniRoute/pull/4003) — thanks @diegosouzapw)
- **chore(quality): maintenance roll-up** — assorted quality-gate hygiene that does not change runtime behavior: re-baseline `validation.ts` for the #3958 qwen body-check, allowlist the `socks` dependency declared by #4004, ignore jscpd major bumps (the v5 Rust rewrite breaks the pinned duplication gate), untrack an accidentally-committed root `node_modules` symlink (and gitignore it), rehome the #3972 logs auto-refresh test so a runner collects it, and open the v3.8.27 development cycle. (thanks @diegosouzapw)

---

## [3.8.26] — 2026-06-15

### ✨ New Features

- **feat(media): Vertex AI (Google) speech, transcription, music & video generation** — Vertex AI's Google media models are now routable through dynamic discovery: speech synthesis, audio transcription, music generation, and video generation. ([#3929](https://github.com/diegosouzapw/OmniRoute/pull/3929) — thanks @artickc)
- **feat(glm): add GLM-5.2 with effort-tier routing (high/max)** — GLM-5.2 is registered with high/max effort-tier routing. ([#3885](https://github.com/diegosouzapw/OmniRoute/pull/3885) — thanks @dhaern)
- **feat(combo): add a sticky round-robin target limit** — round-robin combos can cap how many targets stay "sticky" within a session (`stickyRoundRobinLimit`), balancing stickiness against spread. ([#3846](https://github.com/diegosouzapw/OmniRoute/pull/3846) — thanks @adivekar-utexas)
- **feat(openrouter): connection presets** — OpenRouter connections support reusable presets (provider routing / sort / quantization preferences), selectable when adding a connection. ([#3878](https://github.com/diegosouzapw/OmniRoute/pull/3878) — thanks @rdself)

### 🐛 Fixed

- **fix(compression/memory): stop memory + compression from poisoning the upstream prompt cache** — with compression and/or memory enabled, requests to caching providers (Anthropic-family) missed the prompt cache on every turn, multiplying cost. Two root causes: (1) memory injection prepended the retrieved memories — which **vary per user query** — at index 0 of the message array, shifting the entire cacheable prefix every turn; memory is now inserted just before the last user message when the request carries `cache_control` breakpoints, keeping the cacheable prefix (system prompt + prior turns) byte-stable. (2) the cache-aware `skipSystemPrompt` flag computed by `getCacheAwareStrategy()` was dropped by `selectCompressionStrategy()` (which can only return a mode), so the system prompt could still be compressed under caching; a new `resolveCacheAwareConfig()` now forces `preserveSystemPrompt` on for caching requests. ([#3936](https://github.com/diegosouzapw/OmniRoute/pull/3936), closes [#3890](https://github.com/diegosouzapw/OmniRoute/issues/3890) — thanks @xenstar / @diegosouzapw)
- **fix(providers): register BytePlus ModelArk so its API key can be added** — adding a BytePlus (`ark-…`) key reported "invalid". `byteplus` was present in the provider catalog (`APIKEY_PROVIDERS`) but **never registered in the routing registry**, so key validation fell through to `{ unsupported: true }` → HTTP 400 → the UI rendered every key as invalid (and the provider was unusable for inference). Added a registry entry modeled on the existing Volcengine Ark provider: OpenAI-compatible format, base `https://ark.ap-southeast.bytepluses.com/api/v3` (region `ap-southeast-1`), `Authorization: Bearer` auth, seeded with the catalog's advertised models (Seed 2.0, Kimi K2 Thinking, GLM 4.7, GPT-OSS-120B). ([#3935](https://github.com/diegosouzapw/OmniRoute/pull/3935), closes [#3877](https://github.com/diegosouzapw/OmniRoute/issues/3877) — thanks @nikohd12 / @diegosouzapw)
- **fix(providers): Nous Research key validation no longer fails on a stale probe model** — adding a valid Nous Research API key reported "invalid" even though the same key worked via the portal's copy-shell `curl`. The validation probe sent `model: "nousresearch/hermes-4-70b"`, which Nous does not serve, so the API returned `400` and the validator (which only treated `200`/`429` as success) reported the key invalid. The probe now uses the real `Hermes-4-70B` slug, and any non-auth 4xx (`400`/`404`/`422`) is treated as a valid key (the request shape was wrong, not the credentials) — mirroring the longcat/nvidia validators so a future model rename can't re-break key validation. ([#3934](https://github.com/diegosouzapw/OmniRoute/pull/3934), closes [#3881](https://github.com/diegosouzapw/OmniRoute/issues/3881) — thanks @FerLuisxd / @diegosouzapw)
- **fix(stream): persist mid-stream upstream failures** — when an upstream stream fails partway through, the partial response and incremental usage are now finalized and persisted instead of lost; extracts a shared `streamFailureFinalization` path and merges incremental Claude usage (follow-up to #3879). ([#3937](https://github.com/diegosouzapw/OmniRoute/pull/3937) — thanks @rdself)
- **fix(perplexity-web): update the request payload to schema v2.18 (HTTP 400)** — Perplexity web requests started returning HTTP 400; the request payload was updated to Perplexity's v2.18 schema. ([#3938](https://github.com/diegosouzapw/OmniRoute/pull/3938) — thanks @artickc)
- **fix(stream): keep the in-flight request payload in sync** — the pending-by-id request record is now updated in place (`Object.assign`) so the in-flight payload stays consistent with what was dispatched (coexists with #3937). ([#3940](https://github.com/diegosouzapw/OmniRoute/pull/3940) — thanks @rdself)
- **fix: stabilize reasoning streams and request logs** — reasoning-token streaming and the request-log capture path were stabilized to avoid dropped/duplicated reasoning frames and inconsistent log entries. ([#3879](https://github.com/diegosouzapw/OmniRoute/pull/3879) — thanks @rdself)
- **fix(opencode-plugin): include nested combo-refs in the LCD context window** — the OpenCode plugin now follows nested combo references when computing the least-common-denominator context window, so a combo nested inside another no longer reports an inflated window. ([#3910](https://github.com/diegosouzapw/OmniRoute/pull/3910) — thanks @herjarsa)
- **fix(models): correct the failed-model auto-hide defaults** — the defaults governing when a failed model is auto-hidden were corrected, and auto-hide is now opt-in so models are no longer dropped unexpectedly. ([#3930](https://github.com/diegosouzapw/OmniRoute/pull/3930) — thanks @rdself)
- **fix(openrouter): show the preset field when editing a connection** — the connection-preset field appeared only when creating a connection, not when editing one; it now appears in both (follow-up to #3878). ([#3921](https://github.com/diegosouzapw/OmniRoute/pull/3921) — thanks @rdself)
- **fix(sse): announce the assistant role on the first delta (Responses→Chat)** — the first SSE delta of a Responses-API→Chat-Completions stream now carries `role: "assistant"`, which strict OpenAI-compatible clients expect before content deltas. ([#3911](https://github.com/diegosouzapw/OmniRoute/pull/3911) — thanks @diego-anselmo)
- **fix(vertex): add the generative-language scope so SA-JSON model discovery works** — Vertex service-account (SA-JSON) model discovery failed without the `generative-language` OAuth scope; the scope is now requested. ([#3922](https://github.com/diegosouzapw/OmniRoute/pull/3922) — thanks @artickc)
- **fix(proxy): direct-connection fallback for control-plane ops when a pinned proxy is unreachable** — control-plane operations (validation, discovery) now fall back to a direct connection when a connection's pinned proxy is unreachable, instead of failing outright. ([#3906](https://github.com/diegosouzapw/OmniRoute/pull/3906) — thanks @zhiru)
- **fix(providers): prevent zombie-socket hangs for zai/glm and tighten the default keepAlive** — zai/glm could hang on dead keep-alive sockets; the default keepAlive was tightened to evict zombie sockets. ([#3907](https://github.com/diegosouzapw/OmniRoute/pull/3907) — thanks @insoln)
- **fix(setup): remove the stale CJS bundle check from setup-open-code** — the OpenCode setup helper no longer checks for a CJS bundle that the now ESM-only plugin no longer ships. ([#3908](https://github.com/diegosouzapw/OmniRoute/pull/3908) — thanks @herjarsa)
- **fix(opencode-plugin): drop the CJS bundle to fix the OpenCode plugin loader** — the plugin is now ESM-only, fixing the OpenCode loader which failed on the dual CJS/ESM build. ([#3883](https://github.com/diegosouzapw/OmniRoute/pull/3883) — thanks @herjarsa)
- **fix(mcp): fall back to `node:sqlite` when the better-sqlite3 binding is missing** — the MCP server now falls back to Node's built-in `node:sqlite` when the native better-sqlite3 binding is unavailable, instead of crashing. ([#3887](https://github.com/diegosouzapw/OmniRoute/pull/3887) — thanks @megamen32)
- **fix(models): correct the generate-models alias lookup** — alias resolution during model generation was corrected so aliased model ids resolve to their canonical entry. ([#3870](https://github.com/diegosouzapw/OmniRoute/pull/3870) — thanks @YunyunZhai)
- **fix(combo): guard the candidate pool against an empty array** — combo candidate-pool selection no longer throws when the pool resolves to an empty array. ([#3871](https://github.com/diegosouzapw/OmniRoute/pull/3871) — thanks @YunyunZhai)

### 🔒 Security & Hardening

- **fix(security): bump form-data + vite (2 HIGH), harden workflow template-injection & allowlist guarded `workflow_run`** — two HIGH Dependabot advisories (`form-data`, `vite`) were upgraded; GitHub Actions workflows were hardened against `${{ }}` template-injection (untrusted values now passed via `env:`); and the guarded `workflow_run` trigger was allowlisted. ([#3949](https://github.com/diegosouzapw/OmniRoute/pull/3949) — thanks @diegosouzapw)

### 🧹 Internal / Quality / Docs

- **fix(ci): grant `contents: write` to the npm publish job for SBOM attach** — the v3.8.25 TokenPermissions hardening set the npm-publish `publish` job to `contents: read`, but its "Attach SBOM to GitHub Release" step (`gh release upload`) needs `contents: write` and failed with HTTP 403 on the v3.8.25 release (npm / GitHub Packages / opencode-plugin / Docker / Electron all published fine; only the SBOM attach broke — the v3.8.25 SBOM was attached manually). ([#3874](https://github.com/diegosouzapw/OmniRoute/pull/3874) — thanks @diegosouzapw)
- **ci(quality): make zizmor / gitleaks / osv scanners functional + freeze advisory baselines** — the supply-chain scanners are now actually executed (correct install + invocation) with frozen advisory baselines so new findings surface as diffs. ([#3947](https://github.com/diegosouzapw/OmniRoute/pull/3947) — thanks @diegosouzapw)
- **ci(quality): fix scanner install + size-limit preset, promote `codeqlAlerts` to blocking** — corrected the scanner install and the size-limit preset, and promoted the `codeqlAlerts` ratchet from advisory to blocking. ([#3945](https://github.com/diegosouzapw/OmniRoute/pull/3945) — thanks @diegosouzapw)
- **ci(quality): wire Stryker mutation testing as an advisory nightly** — Stryker mutation testing runs nightly (advisory) — Quality Gates Fase 7 · Task 11. ([#3898](https://github.com/diegosouzapw/OmniRoute/pull/3898) — thanks @diegosouzapw)
- **ci(quality): freeze per-module coverage floors + wire require-tighten (advisory)** — per-module coverage floors are frozen with an advisory "require-tighten" check that flags modules drifting below their floor. ([#3901](https://github.com/diegosouzapw/OmniRoute/pull/3901) — thanks @diegosouzapw)
- **ci(quality): enforce the stale-allowlist check on `check-known-symbols`** — stale allowlist entries (suppressing a symbol that no longer exists) now fail the gate — Fase 6A.3 follow-up. ([#3899](https://github.com/diegosouzapw/OmniRoute/pull/3899) — thanks @diegosouzapw)
- **test(ci): de-flake pipeline-payloads via per-test re-seed + honest reset** — the pipeline-payloads suite now re-seeds per test and performs an honest cache reset, eliminating a cross-test ordering flake. ([#3893](https://github.com/diegosouzapw/OmniRoute/pull/3893) — thanks @diegosouzapw)
- **fix(ci): drop the `secrets`-in-job-`if` from nightly-llm-security** — referencing `secrets` in a job-level `if` caused a `startup_failure` on push; the gating was moved so the workflow starts cleanly. ([#3892](https://github.com/diegosouzapw/OmniRoute/pull/3892) — thanks @diegosouzapw)
- **test: reconcile the runtime-timeouts keepAlive baseline to 4000 after the #3907 source revert** — the keepAlive assertion was realigned to the source value (4000) after #3907's source-side revert. ([#3933](https://github.com/diegosouzapw/OmniRoute/pull/3933) — thanks @diegosouzapw)
- **chore(repo): nest quality-gate state under `config/quality`, declutter the repo root** — baselines / allowlists / metrics moved under `config/quality/`, trimming the tracked root file count. ([#3896](https://github.com/diegosouzapw/OmniRoute/pull/3896) — thanks @diegosouzapw)
- **docs: refresh the provider count to 226 + regenerate `PROVIDER_REFERENCE.md`** — the README advertised a stale `177 providers`; the canonical generator (`scripts/docs/gen-provider-reference.ts`) now reports **226 unique provider IDs**, so the README badges/anchors and the generated provider reference were brought in sync. Also adds a documentation audit/sync report. (thanks @diegosouzapw)
- **docs: sync all documentation to v3.8.24 + count-guard & wiki/prose CI** — a full documentation sync with a strict provider/locale count-guard plus Vale / markdownlint prose CI. ([#3804](https://github.com/diegosouzapw/OmniRoute/pull/3804) — thanks @diegosouzapw)
- **docs: regenerate stale counts to canonical values** — 226 providers / 87 MCP tools / 15 strategies / 42 locales. ([#3904](https://github.com/diegosouzapw/OmniRoute/pull/3904) — thanks @diegosouzapw)
- **docs(quality): correct the stale gate count + add an opt-in agent-lsp scaffold** — ([#3902](https://github.com/diegosouzapw/OmniRoute/pull/3902) — thanks @diegosouzapw)
- **docs(mcp): correct the MCP tool-inventory diagram source + text to 87 tools** — ([#3909](https://github.com/diegosouzapw/OmniRoute/pull/3909) — thanks @diegosouzapw)
- **docs: update the compression section to the 9-engine multi-layer stack** — ([#3894](https://github.com/diegosouzapw/OmniRoute/pull/3894) — thanks @diegosouzapw)
- **ci(docs): automate GitHub wiki sync (add missing pages + cover counts)** — ([#3900](https://github.com/diegosouzapw/OmniRoute/pull/3900) — thanks @diegosouzapw)
- **docs: require a dedicated git worktree + branch per development task (Hard Rule #19)** — codifies the worktree-isolation rule after the shared-checkout incidents. ([#3939](https://github.com/diegosouzapw/OmniRoute/pull/3939) — thanks @diegosouzapw)
- **fix(docs): add MDX frontmatter to `DOCUMENTATION_AUDIT_REPORT` so the fumadocs build passes** — the audit report lacked the `title:` frontmatter MDX pages require. (thanks @diegosouzapw)

---

## [3.8.25] — 2026-06-14

### ✨ New Features

- **feat(compression): pluggable compression engines + async pipeline + Compression Studios** — a new prompt-compression subsystem with selectable engines (Lite / Aggressive / Ultra), an asynchronous compression pipeline wired into the chat core, and "Compression Studios" tooling for inspecting and tuning compression. ([#3848](https://github.com/diegosouzapw/OmniRoute/pull/3848))
- **feat(compression-ui): unified compression configuration UI** — a Compression Hub with per-engine pages (Lite / Aggressive / Ultra), a combos editor, a dedicated sidebar entry, and live-WS default-on. ([#3860](https://github.com/diegosouzapw/OmniRoute/pull/3860))
- **feat(security): prompt-injection guard across every LLM route + red-team suite** — the prompt-injection guard now runs on all LLM routes (chat, responses, embeddings, images, audio, rerank, search, moderations, videos, music) with a shared input sanitizer and a promptfoo-based red-team suite (Quality Gates Fase 8 · Bloco D). ([#3857](https://github.com/diegosouzapw/OmniRoute/pull/3857))
- **feat(kiro): live per-account model discovery** — Kiro now discovers each account/tier's entitled models via CodeWhisperer `ListAvailableModels` (region-matched, with a static-catalog fallback). ([#3836](https://github.com/diegosouzapw/OmniRoute/pull/3836) — thanks @artickc)
- **feat(gemini/vertex): surface Veo video models in dynamic discovery** — Veo video models (`predictLongRunning`) now appear in Gemini/Vertex dynamic model discovery. ([#3839](https://github.com/diegosouzapw/OmniRoute/pull/3839) — thanks @artickc)
- **feat(mimocode): per-account proxy for multi-account round-robin** — each mimocode account can route through its own proxy (resolved per account by fingerprint via `runWithProxyContext`), with a "Distribute proxies" UI helper. ([#3837](https://github.com/diegosouzapw/OmniRoute/pull/3837) — thanks @pizzav-xyz)
- **feat(intelligence): expose Arena ELO sync as a feature flag** — the LM Arena ELO leaderboard sync is now toggleable (`ARENA_ELO_SYNC_ENABLED`, DB-override + env fallback). ([#3821](https://github.com/diegosouzapw/OmniRoute/pull/3821) — thanks @rdself)

### 🐛 Fixed

- **test(oauth): prove refresh_token preservation for the real gemini-cli / antigravity dispatch** — the #3679/#3766 regression test used a synthetic provider that routes through the generic `tokenUrl` path, so the fix was never proven for the actual Google-family providers, which dispatch through `refreshGoogleToken()` against the hardcoded `OAUTH_ENDPOINTS.google.token`. Added a test that drives `checkConnection` through the real `gemini-cli`/`antigravity` path (redirecting the Google token endpoint to a local server returning `invalid_grant`) and asserts the `refresh_token` is preserved (not nulled) — confirming these connections are not spuriously destroyed on a failed refresh. ([#3850](https://github.com/diegosouzapw/OmniRoute/issues/3850) — thanks @3xa228148)
- **fix(oauth): clear setup message for GitLab Duo instead of "Internal server error"** — adding a GitLab Duo connection without a registered OAuth client returned an opaque `Internal server error` at the Add Connection step. `buildAuthUrl` **threw** when `GITLAB_DUO_OAUTH_CLIENT_ID` was missing, and the route swallowed it into a generic 500. It now returns `null` (mirroring the Qoder provider) and the authorize route surfaces an actionable message: register an OAuth app at `https://gitlab.com/-/profile/applications` with redirect URI `http://localhost:20128/callback` and scopes `ai_features read_user`, then set `GITLAB_DUO_OAUTH_CLIENT_ID`. ([#3861](https://github.com/diegosouzapw/OmniRoute/issues/3861) — thanks @sidinsearch)
- **fix(db): persist the "Keep latest backups" retention setting** — changing the backup-retention count in Settings → Database backup retention had no effect: it always snapped back to 20 on refresh (and editing `.env` post-start was ignored too, since `process.env` isn't reloaded). `getDbBackupMaxFiles()` only read the `DB_BACKUP_MAX_FILES` env var — there was no setter and no persisted value. The value now round-trips through a dedicated `key_value` store (`getDbBackupMaxFiles` precedence: env override → persisted UI value → default 20), and the "Clean old backups" action persists the chosen count. Existing installs keep the historical default of 20 until explicitly changed. ([#3834](https://github.com/diegosouzapw/OmniRoute/issues/3834) — thanks @netstratego)
- **fix(sse): clamp Gemini thinking budget to the model's real cap (`reasoning_effort`/`effort=high` 400)** — translating OpenAI `reasoning_effort=high` (and Claude-Code `output_config.effort=high`) to a Gemini target sent a hardcoded `thinkingBudget: 32768`, which exceeds Flash-tier Gemini's real max of 24576 → upstream HTTP 400 (the `thinkingLevel=high` path already used 24576 and worked on the same model). `gemini-2.5-flash` now declares its real `thinkingBudgetCap` (24576) so the existing `capThinkingBudget()` chokepoint actually clamps, and the Claude→Gemini `output_config.effort` path — which previously sent the raw value with no cap at all — now routes through the same clamp (pro-tier, real cap 32768, is left untouched). ([#3842](https://github.com/diegosouzapw/OmniRoute/issues/3842) — thanks @andrea-kingautomation)
- **fix(intelligence): run pricing + models.dev sync from the live startup path** — like the Arena ELO sync (v3.8.24), the external **pricing sync** (`PRICING_SYNC_ENABLED`) and the **models.dev capability sync** (Settings → AI toggle) were only initialized from `server-init.ts`, which the Next standalone runtime never executes — and models.dev had no caller at all. Their toggles were inert in production. Both are now initialized from `instrumentation-node.ts` (self-gated, opt-in preserved, non-blocking, never fatal). (thanks @diegosouzapw)
- **test(proxy): guard the per-connection 'direct' bypass over a global proxy + clearer label** — the per-connection "Proxy Off" toggle (`proxyEnabled: false`) already overrides a configured **global** proxy (`resolveProxyForConnection` short-circuits to `level: "direct"` before the global step). Added an explicit regression test proving the bypass beats a global assignment (and round-trips on re-enable), and relabeled the UI to "Direct (bypass proxy)" so operators recognize it. Closes the verification gap in [#2996](https://github.com/diegosouzapw/OmniRoute/issues/2996). (thanks @diegosouzapw)
- **feat(connections): per-connection "disable cooldown" opt-out** — a connection can now opt out of the transient cooldown (`providerSpecificData.disableCooling`, with a toggle in the Edit Connection modal). When set, a recoverable failure still records the error/backoff but does **not** take the connection out of rotation, so it stays eligible for selection — useful for a primary key you never want parked on a blip. Terminal states (banned / expired / credits_exhausted) still apply. ([#2997](https://github.com/diegosouzapw/OmniRoute/issues/2997) — thanks @diegosouzapw)
- **fix(combo): restore sessionless combo stickiness + reasoning-aware readiness (504 / TPS regression after v3.8.14)** — #3399 (v3.8.16) replaced the `<omniModel>`-tag combo pinning with a server-side context-cache pin gated on a client `sessionId`. Clients that send no session id (most OpenAI-compatible tools) lost combo stickiness, so combos re-ran strategy selection every turn → upstream prompt-cache misses → cold high-reasoning starts (~78s) → intermittent `[504] Upstream request did not return response headers` + TPS collapse (only on combos). The pin now falls back to a stable per-conversation fingerprint (`extractSessionAffinityKey(body)`) when no session id is present — **only when `context_cache_protection` is on**, so #3399's anti-leak behaviour is preserved. Separately, the stream-readiness window now grants the +30s reasoning budget **unconditionally** for high-reasoning Codex GPT-5.x (small high-reasoning prompts were 504-ing at the 80s base regardless of stickiness). ([#3825](https://github.com/diegosouzapw/OmniRoute/issues/3825) — thanks @bypanghu)
- **test(combo): cover the `skipProviderBreaker` consumer gate** — the producer was tested but the consumer (whether a failed combo target trips the whole-provider circuit breaker) was not; the breaker decision is now an exported pure predicate (`shouldRecordProviderBreakerFailure`, behaviour-identical) with direct tests asserting a `connection_cooldown` 503 does not trip the breaker while a plain 503 does. Closes another deferred test gap from [#2743](https://github.com/diegosouzapw/OmniRoute/issues/2743). (thanks @diegosouzapw)
- **fix(providers): surface the real Devin error + correct the Windsurf auth instructions** — Devin chat returned a generic 502 "Invalid SSE response for non-streaming request" that swallowed the real cause (e.g. "Devin CLI not found"): an error-only SSE chunk (no `choices`) is now propagated with its sanitized message. The Windsurf "Visit windsurf.com/show-auth-token" instruction (the bare URL shows no token without an IDE-supplied `?state=`) now directs users to the `Windsurf: Provide Auth Token` command-palette flow. ([#3324](https://github.com/diegosouzapw/OmniRoute/issues/3324) — thanks @mikmaneggahommie)
- **fix(grok-web): clearer 403 message for anti-bot / IP-reputation blocks** — a Grok Web subscription validating from a flagged datacenter/VPS IP got a 403 that read like an invalid cookie, sending users to chase a cookie that was actually fine. A non-auth 403 (Cloudflare challenge / anti-bot body) now returns a message stating the cookie is likely OK and the block is IP-reputation-based — retry from a residential IP or configure a proxy (auth-shaped 403s keep the re-paste guidance). ([#3474](https://github.com/diegosouzapw/OmniRoute/issues/3474) — thanks @friedtofu1608)
- **fix(db): make the mass-pending-migrations safety threshold env-overridable** — restoring a backup DB from an older version could trip "Detected N pending migrations … threshold is 50" with no way to override the hardcoded `50`. The threshold is now configurable via `OMNIROUTE_MAX_PENDING_MIGRATIONS` (resolved at startup; `0` disables the check). ([#3416](https://github.com/diegosouzapw/OmniRoute/issues/3416) — thanks @samuraiIT)
- **test(proxy): cover the Vercel-relay `proxyFetch` path** — net-new tests for `buildVercelRelayHeaders` and the `vercel`-type relay short-circuit (`x-relay-target`/`-path`/`-auth`, TCP-skip, missing-auth fail-closed), closing one of the deferred test gaps tracked in [#2743](https://github.com/diegosouzapw/OmniRoute/issues/2743). (thanks @diegosouzapw)
- **fix(cli): surface `omniroute runtime repair` in the native-module error messages** — after a Node major upgrade, `better-sqlite3`'s prebuilt binary mismatches the ABI and the service can crash-loop; the error only mentioned `npm rebuild better-sqlite3` (which fails for global / no-toolchain installs). The startup + SQLite error hints now also point to the existing self-heal command `omniroute runtime repair` (rebuilds into a user-writable runtime), and a top-level `omniroute repair` alias was added. ([#3476](https://github.com/diegosouzapw/OmniRoute/issues/3476) — thanks @Rahulsharma0810)
- **fix(antigravity): per-request Pro-family upstream-id fallback chain (`gemini-3.1-pro-high` 400)** — Antigravity silently renamed the Gemini 3.1 Pro-high upstream id, so `gemini-3.1-pro-high` started returning HTTP 400 (while `-low` still worked) and the live id can't be determined statically (competitor proxies disagree). The executor now retries alternative ids on a 400 (`gemini-3.1-pro-high` → `gemini-pro-agent` → `gemini-3-pro-high`, analogous for pro-low), bounded and only on a 400, with zero extra cost on the happy path; the 1:1 tier-passthrough invariant is preserved (the chain is request-time, not a static alias remap). ([#3786](https://github.com/diegosouzapw/OmniRoute/issues/3786) — thanks @aliaksandrsen)
- **fix(sse): retry once on an early stream close (`STREAM_EARLY_EOF`) for single-model requests** — flaky OpenAI-compatible upstreams (e.g. NVIDIA NIM with minimax-m3 / qwen3.5 / glm-5.1) intermittently send HTTP 200 then close the SSE with zero useful frames, surfacing as a 502 "Stream ended before producing useful content". Only Antigravity got an early-close retry; every other provider returned the 502 immediately on the non-combo single-model path. A bounded one-retry (early-close only — not readiness-timeout — and without marking the account unavailable) now generalizes it. (The separate qwen-web validation SSRF part of the same report was already fixed in v3.8.24, [#3767](https://github.com/diegosouzapw/OmniRoute/pull/3767).) ([#3758](https://github.com/diegosouzapw/OmniRoute/issues/3758) — thanks @Svatosalav)
- **fix(models): preserve eye-hidden models across auto-sync / import** — hiding models via the visibility (eye) toggle to keep only a combo's models was undone on every model import or auto-sync, which re-showed all of them. The sync re-import treated "hidden" identically to "deleted" and dropped both; a distinct `isDeleted` marker now separates the trash/delete path (still dropped on re-import, #3199) from the eye toggle (preserved as listed-but-hidden), and eye-hidden models are no longer re-aliased into the routable catalog on sync. ([#3782](https://github.com/diegosouzapw/OmniRoute/issues/3782) — thanks @xenstar)
- **fix(providers): correct the lmarena cookie hint (`session` → `arena-auth-prod-v1`)** — the lmarena credential hint asked for a cookie named `session`, but lmarena.ai's real auth cookie is `arena-auth-prod-v1`, so users who pasted only `session=…` hit validation failures. The credential name, placeholder and storage keys now use the correct name (the legacy `session` key is retained for back-compat with already-saved credentials). ([#3810](https://github.com/diegosouzapw/OmniRoute/issues/3810) — thanks @xspylol)
- **fix(reasoning): normalize OpenAI-compatible `max` effort to `xhigh` by default** — OpenAI-compatible providers do not accept literal `max`, but some upstreams (for example DeepSeek through OpenRouter) support `xhigh`; `max` now maps to `xhigh` unless the target model explicitly opts out of `xhigh`, with Claude alias variants still honoring the canonical Claude opt-out list. ([#3826](https://github.com/diegosouzapw/OmniRoute/pull/3826) — thanks @rdself)
- **fix(combo): return the replay response on the round-robin streaming path** — a round-robin combo with a streaming target returned a body already locked by the readiness peek, surfacing as a 500 "ReadableStream is locked"; the round-robin path now returns the replay clone like the priority path does. ([#3811](https://github.com/diegosouzapw/OmniRoute/pull/3811) — thanks @0xtbug)
- **fix(claude): strip the reasoning-effort suffix from Claude model ids** — Claude ids carrying an effort suffix (`…-low` … `…-max`) 404'd upstream and tripped the circuit breaker into a misleading "rate-limited" state; the suffix is now stripped before dispatch. ([#3807](https://github.com/diegosouzapw/OmniRoute/pull/3807) — thanks @zhiru)
- **fix(sse): flush routed SSE chunks promptly (ping/zombie readiness filter)** — combo stream-readiness now filters ping/zombie frames so routed SSE chunks stream out without waiting on the readiness window. ([#3759](https://github.com/diegosouzapw/OmniRoute/pull/3759) — thanks @rdself)
- **fix(models): don't auto-hide transient (rate-limited / timeout) failures on Test All** — a parallel Test All across many models could rate-limit an account and auto-hide every model that 429'd / timed out (dropping them from `/v1/models`); transient failures now surface an error state but stay visible. ([#3849](https://github.com/diegosouzapw/OmniRoute/pull/3849) — thanks @lukmanc405)
- **fix(quota): surface OpenCode Go's missing quota-API as a latched diagnostic** — OpenCode Go keys whose quota endpoints return 404/401 no longer hammer the dead endpoints; the gap is latched with a clear message and an `OMNIROUTE_OPENCODE_GO_QUOTA_URL` override hint. ([#3838](https://github.com/diegosouzapw/OmniRoute/pull/3838) — thanks @adivekar-utexas)
- **fix(pricing): add the missing Kiro model pricing rows** — Kiro models the registry serves (e.g. `claude-sonnet-4.6`) had no pricing row and reported $0.00; the rows were added. ([#3835](https://github.com/diegosouzapw/OmniRoute/pull/3835) — thanks @artickc)
- **fix(ui): render country flags via flagcdn SVGs for Windows compatibility** — Windows doesn't render regional-indicator flag emoji; flags now use flagcdn SVGs with an emoji fallback. ([#3814](https://github.com/diegosouzapw/OmniRoute/pull/3814) — thanks @rafacpti23)
- **fix(ui): expand the request log table with a vertical resize handle** — the request log table now shows ~10 rows and can be resized vertically. ([#3820](https://github.com/diegosouzapw/OmniRoute/pull/3820) — thanks @rafacpti23)
- **fix(i18n): translate the missing `embeddedServices` keys across 37 locales** — the `embeddedServices` strings showed `__MISSING__` in 37 locales; they are now translated. ([#3819](https://github.com/diegosouzapw/OmniRoute/pull/3819) — thanks @rafacpti23)

### 🔒 Security & Hardening

- **fix(security): CCR cross-tenant IDOR — per-principal scope store + bounded memory** — the compression CCR scope store was shared across principals, allowing cross-tenant reads; it is now scoped per-principal with bounded memory. ([#3859](https://github.com/diegosouzapw/OmniRoute/pull/3859))
- **feat(supply-chain): build provenance, SBOM, Trivy scan & OpenSSF Scorecard (advisory)** — added npm build provenance, a CycloneDX SBOM, Trivy image scanning, and an OpenSSF Scorecard workflow (Quality Gates Fase 8 · Bloco A, advisory). ([#3824](https://github.com/diegosouzapw/OmniRoute/pull/3824))

### 🧹 Internal / Quality / Docs

- **Consolidate the email-privacy control into Settings → Appearance** — the per-page email-privacy toggles were replaced by a single global switch. ([#3822](https://github.com/diegosouzapw/OmniRoute/pull/3822) — thanks @rdself)
- **docs(ui): clarify the routing-settings copy (strategy sync + sticky limit)** — ([#3843](https://github.com/diegosouzapw/OmniRoute/pull/3843) — thanks @adivekar-utexas)
- **Quality Gates — Fase 7 & 8** — promoted the dead-code / cognitive-complexity / type-coverage ratchets to blocking, installed advisory CI scanners (gitleaks / osv / actionlint / zizmor), and added property + golden + SSE-correctness tests and a runtime-resilience (chaos / heap-growth / k6 soak) suite. ([#3809](https://github.com/diegosouzapw/OmniRoute/pull/3809), [#3858](https://github.com/diegosouzapw/OmniRoute/pull/3858), [#3808](https://github.com/diegosouzapw/OmniRoute/pull/3808), [#3854](https://github.com/diegosouzapw/OmniRoute/pull/3854))
- **fix(docs): add MDX frontmatter to `SUPPLY_CHAIN.md`** — the new security doc lacked the `title:` frontmatter that MDX pages require, which broke the production Build + Docker Hub publish; the frontmatter was added. ([#3864](https://github.com/diegosouzapw/OmniRoute/pull/3864))
- **chore(deps): bump `aquasecurity/trivy-action` 0.28.0 → 0.36.0** ([#3862](https://github.com/diegosouzapw/OmniRoute/pull/3862))
- **chore(quality): reconcile the file-size ratchet baseline for Prettier-inflated v3.8.25 fixes + `chat.ts` growth** — the per-file size baseline was re-frozen to absorb the formatting/line-count growth from this cycle's chat-core and combo fixes (manual edits, never an automatic upward ratchet). ([#3823](https://github.com/diegosouzapw/OmniRoute/pull/3823), [#3833](https://github.com/diegosouzapw/OmniRoute/pull/3833) — thanks @diegosouzapw)
- **test(suite): green the unit suite at release time — align stale tests to this cycle's intended behavior + de-flake two new suites** — release-gate housekeeping: updated tests that lagged behind intended behavior changes (OpenCode Go latched quota message #3838, the email-privacy control consolidated into Settings #3822, SOCKS5 default-on proxy-type message, the `[id]` provider-detail strangler-fig decomposition #3501, Vertex Express-mode keys, Antigravity discovery using a current user-callable model id) and the same-provider 503 fall-through resilience test; de-flaked the compression benchmark reproducibility test (sequential passes) and the ServiceSupervisor crash test (poll instead of fixed sleep). No production code changed. Also documented `OMNIROUTE_MAX_PENDING_MIGRATIONS` (#3416) in `.env.example` + `ENVIRONMENT.md`. (thanks @diegosouzapw)

---

## [3.8.24] — TBD

_See English CHANGELOG for v3.8.24 details._

---

## [3.8.22] — TBD

_See English CHANGELOG for v3.8.22 details._

---

## [3.8.21] — 2026-06-11

_See [English CHANGELOG](/CHANGELOG.md) for v3.8.21 details._

---

## [3.8.20] — Unreleased

_Development cycle in progress._

---

## [3.8.19] — Unreleased

_Development cycle in progress._

---

## [3.8.18] — Unreleased

_Development cycle in progress._

---

## [3.8.17] — Unreleased

_Development cycle in progress._

---

## [3.8.16] — Unreleased

_Development cycle in progress._

---

## [3.8.15] — Unreleased

_Development cycle in progress._

---

## [3.8.14] — Unreleased

_Development cycle in progress._

---

## [3.8.13] — Unreleased

_Development cycle in progress._

---

## [3.8.12] — Unreleased

_Development cycle in progress._

---

## [3.8.11] — Unreleased

_Development cycle in progress._

---

## [3.8.10] — Unreleased

---

## [3.8.9] — Unreleased

---

## [3.8.8] — 2026-06-01

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
- **notion:** add Notion as an MCP context source — 6 tools (`notion_search`, `notion_list_databases`, `notion_get_database`, `notion_query_database`, `notion_read`, `notion_append_blocks`) scoped under `read:notion` / `write:notion`, with dashboard "Context Sources" tab, settings API, and token persistence in `key_value` table (#2959)

### Changed

- Sidebar Tools group: added `agent-bridge` and `traffic-inspector` items after `cloud-agents`.
- `/api/tools/agent-bridge/` and `/api/tools/traffic-inspector/` added to `LOCAL_ONLY_API_PREFIXES`
  and `SPAWN_CAPABLE_PREFIXES` in `src/server/authz/routeGuard.ts`.
- `.env.example`: documented 9 new env vars (`AGENTBRIDGE_UPSTREAM_CA_CERT`,
  `INSPECTOR_BUFFER_SIZE`, `INSPECTOR_HTTP_PROXY_PORT`, `INSPECTOR_HTTP_PROXY_AUTOSTART`,
  `INSPECTOR_TLS_INTERCEPT`, `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`, `INSPECTOR_MAX_BODY_KB`,
  `INSPECTOR_MASK_SECRETS`, `INSPECTOR_LLM_HOSTS_EXTRA`, `INSPECTOR_INTERNAL_INGEST_TOKEN`).

### Fixed

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
- **mcp:** move `enforceScopes` guard before `MCP_TOOL_MAP` lookup, add inline `scopes` parameter to `withScopeEnforcement()`, and declare scopes on all 24 dynamic tool definitions (memory, skills, plugins, gamification, compression) to fix scope enforcement for dynamic MCP tool groups (#2958)

---

## [3.8.7] — 2026-05-29

### ✨ New Features

- **api (self-service):** add `GET /api/v1/me/status` so a delegated API key can view its own usage (USD used, budget percent, token totals) and optional shared Codex account quota, backed by migration `075_api_key_self_service_usage_scopes` (#2908 — thanks @guanbear).
- **analytics:** roll up usage logs to `daily_usage_summary` before raw log cleanup, and query a SQL `UNION` of raw and rolled-up data to prevent analytics history data loss (#2904 — thanks @unitythemaker).
- **perf (RAM):** reduce server memory footprint by capping 11 in-memory caches, limiting SQLite page cache, lazy-loading provider registries via Proxy, and optimizing Next.js startup database probes (#2903 — thanks @soyelmismo).

### 🔧 Bug Fixes

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

## [3.8.6] — 2026-05-27

### 🧹 Chores

- **gitignore:** ignore `.claude/settings.local.json` so per-user Claude Code permissions never get committed by accident
- **release:** version bump and metadata sync (package.json, package-lock.json, electron, open-sse, openapi.yaml)

> v3.8.6 is a maintenance/scaffolding patch. All feature and bug-fix work from the post-v3.8.5 cycle (44 commits — community PRs #2777, #2782–#2787, #2789, #2790, plus internal hotfixes) was already integrated into v3.8.5 and is documented under that section.

---

## [3.8.5] — 2026-05-26

### 🔒 Security

- **authz:** redirect `/home` and `/home/:path*` to `/login` when unauthenticated (#2712)

### 🔧 Bug Fixes

- **mcp:** break callLogs ↔ compliance ESM cycle that deadlocks the bundled MCP server on Node.js 24 (#2650)
- **deepseek:** guard PoW solver Web Worker handler under Node strict mode (#2724)
- **combos:** include no-auth providers in the combo builder picker (#2737)
- **translator:** allow the `web_search` server-tool family in the Responses API translator (#2695)
- **oauth:** register the missing `trae` provider with `import_token` flow (#2658)
- **model:** merge settings-based aliases with the legacy DB alias namespace (#2618, #2208)
- **kiro:** clipboard fallback for HTTP / non-secure contexts (#2689)
- **cli:** raise `omniroute serve` ready timeout to 60s with TCP fallback for Windows cold start (#2460)

---

## [Unreleased]

---

## [3.8.23] — TBD

---

### ✨ New Features

### 🔧 Bug Fixes

---

## [3.8.4] — 2026-05-25

### Added

- Embedded services (work in progress — 9Router, CLIProxyAPI; see T-15 for full entry).

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

### 📝 Maintenance

- **chore(config):** ignore additional agent workflow command files (`.agents/commands/`). (thanks @diegosouzapw)
- **chore(config):** ignore `memory-bank` and Cursor agent rules from tracking. (thanks @ovehbe)

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

- **chore(workflow):** mandate implementation plan generation in `/resolve-issues` workflow before coding
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
