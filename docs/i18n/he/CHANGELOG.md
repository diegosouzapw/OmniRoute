# Changelog (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md)

---

## [Unreleased]

### 🛠️ Maintenance

- **AGENTS.md rewrite:** Condensed from 297→153 lines. Added build/lint/test commands (including single-test execution), code style guidelines (Prettier, TypeScript, ESLint, naming, imports, error handling, security), and trimmed verbose architecture tables for AI agent consumption.

## [3.4.2] - 2026-04-01

### 🐛 Bug Fixes

- **CI Stabilization:** Fixed failing analytics/settings Playwright selectors and request assertions so GitHub Actions E2E runs pass reliably across localized UIs and switch-based controls.
- **Deterministic Tests:** Removed date-sensitive quota fixtures from Copilot usage tests and aligned idempotency/model catalog tests with the merged runtime behavior.
- **MCP Type Hardening:** Removed zero-budget explicit `any` regressions from the MCP server tool registration path, restoring the `check:any-budget:t11` workflow gate.

### 🛠️ Maintenance

- **Release Branch Integration:** Consolidated the active feature branches into `release/v3.4.2` on top of current `main` and validated the branch with lint, unit, coverage, build, and CI-mode E2E runs.

## [3.4.1] - 2026-03-31

> [!WARNING]
> **BREAKING CHANGE: request logging, retention, and logging environment variables have been redesigned.**
> On the first startup after upgrading, OmniRoute archives legacy request logs from `DATA_DIR/logs/`, legacy `DATA_DIR/call_logs/`, and `DATA_DIR/log.txt` into `DATA_DIR/log_archives/*.zip`, then removes the deprecated layout and switches to the new unified artifact format under `DATA_DIR/call_logs/`.

### ✨ New Features

- **.ENV Migration Utility:** Included `scripts/migrate-env.mjs` to seamlessly migrate `<v3.3` configurations to `v3.4.x` strict security validation constraints (FASE-01), repairing startup crashes caused by short `JWT_SECRET` instances.
- **Kiro AI Cache Optimization:** Implemented deterministic `conversationId` generation (uuidv5) to enable AWS Builder ID Prompt Caching properly across invocations (#814).
- **Dashboard UI Restoration & Consolidation:** Resolved sidebar logic omitting the Debug section, and cleared Nextjs routing warnings by moving standalone `/dashboard/mcp` and `/dashboard/a2a` pages explicitly into embedded Endpoint Proxy UI components.
- **Unified Request Log Artifacts:** Request logging now stores one SQLite index row plus one JSON artifact per request under `DATA_DIR/call_logs/`, with optional pipeline capture embedded in the same file.
- **Language:** Improved the Chinese translation (#855)
- **Opencode-Zen Models:** Added 4 free models to opencode-zen registry (#854)
- **Tests:** Added unit and E2E tests for settings toggles and bug fixes (#850)

### 🐛 Bug Fixes

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

### תכונות

- **Subscription Utilization Analytics:** Added quota snapshot time-series tracking, Provider Utilization and Combo Health tabs with recharts visualizations, and corresponding API endpoints (#847)
- **SQLite Backup Control:** New `OMNIROUTE_DISABLE_AUTO_BACKUP` env flag to disable automatic SQLite backups (#846)
- **Model Registry Update:** Injected `gpt-5.4-mini` into the Codex provider's array of models (#756)
- **Provider Limit Tracking:** Track and display when provider rate limits were last refreshed per account (#843)

### 🐛 Bug Fixes

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

- **Custom Provider Rotation:** Integrated `getRotatingApiKey` internally inside DefaultExecutor, ensuring `extraApiKeys` rotation triggers correctly for custom and compatible upstream providers (#815)

---

## [3.3.8] - 2026-03-30

### תכונות

- **Models API Filtering:** Endpoint `/v1/models` now dynamically filters its list based on the permissions tied to the `Authorization: Bearer <token>` when restricted access is on (#781)
- **Qoder Integration:** Native integration for Qoder AI natively replacing the legacy iFlow platform mappings (#660)
- **Prompt Cache Tracking:** Added tracking capabilities and frontend visualization (Stats card) for semantic and prompt caching in the Dashboard UI

### 🐛 Bug Fixes

- **Cache Dashboard Sizing:** Improved the UI layout sizes and context headers for the advanced cache pages (#835)
- **Debug Sidebar Visibility:** Fixed an issue where the debug toggle wouldn't correctly show/hide sidebar debug details (#834)
- **Gemini Model Prefixing:** Modified the namespace fallback to properly route via `gemini-cli/` instead of `gc/` to respect upstream specs (#831)
- **OpenRouter Sync:** Improved compatibility synchronization to automatically ingest the available models catalog correctly from OpenRouter (#830)
- **Streaming Payloads Mapping:** Reserialization of reasoning fields natively resolves conflict alias paths when output is streaming to edge devices

---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

- **OpenCode Config:** Restructured generated `opencode.json` to use the `@ai-sdk/openai-compatible` record-based schema with `options` and `models` as object maps instead of flat arrays, fixing config validation failures (#816)
- **i18n Missing Keys:** Added missing `cloudflaredUrlNotice` translation key across all 30 language files to prevent `MISSING_MESSAGE` console errors in the Endpoint page (#823)

---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

- **Token Accounting:** Included prompt cache tokens safely in historical usage inputs calculations for correct quota deductions (PR #822)
- **Combo Test Probes:** Fixed combo testing logic false negatives by resolving parsing for reasoning-only responses and enabled massive parallelization via Promise.all (PR #828)
- **Docker Quick Tunnels:** Embedded required ca-certificates inside the base runtime container to resolve Cloudflared TLS startup failures, and surfaced stdout network errors replacing generic exit codes (PR #829)

---

## [3.3.5] - 2026-03-30

### ✨ New Features

- **Gemini Quota Tracking:** Added real-time Gemini CLI quota tracking via the `retrieveUserQuota` API (PR #825)
- **Cache Dashboard:** Enhanced the Cache Dashboard to display prompt cache metrics, 24h trends, and estimated cost savings (PR #824)

### 🐛 Bug Fixes

- **User Experience:** Removed invasive auto-opening OAuth modal loops on barren provider detailed pages (PR #820)
- **Dependency Updates:** Bumped and locked down dependencies for development and production trees including Next.js 16.2.1, Recharts, and TailwindCSS 4.2.2 (PR #826, #827)

---

## [3.3.4] - 2026-03-30

### ✨ New Features

- **A2A Workflows:** Added deterministic FSM orchestrator for multi-step agent workflows.
- **Graceful Degradation:** Added a new multi-layer fallback framework to preserve core functionality during partial system outages.
- **Config Audit:** Added an audit trail with diff detection to track changes and enable configuration rollbacks.
- **Provider Health:** Added provider expiration tracking with proactive UI alerts for expiring API keys.
- **Adaptive Routing:** Added an adaptive volume and complexity detector to override routing strategies dynamically based on load.
- **Provider Diversity:** Implemented provider diversity scoring via Shannon entropy to improve load distribution.
- **Auto-Disable Bounds:** Added an Auto-Disable Banned Accounts setting toggle to the Resilience dashboard.

### 🐛 Bug Fixes

- **Codex & Claude Compatibility:** Fixed UI fallbacks, patched Codex non-streaming integration issues, and resolved CLI runtime detection on Windows.
- **Release Automation:** Expanded permissions required for the Electron App build in GitHub Actions.
- **Cloudflare Runtime:** Addressed correct runtime isolation exit codes for Cloudflared tunnel components.

### 🧪 Tests

- **Test Suite Updates:** Expanded test coverage for volume detectors, provider diversity, configuration audit, and FSM.

---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

- **CI/CD Reliability:** Patched GitHub Actions to stable dependency versions (`actions/checkout@v4`, `actions/upload-artifact@v4`) to mitigate unannounced builder environment deprecations.
- **Image Fallbacks:** Replaced arbitrary fallback chains in `ProviderIcon.tsx` with explicit asset validation to prevent UI loading `<Image>` components for files that don't exist, eliminating `404` errors in dashboard console logs (#745).
- **Admin Updater:** Dynamic source-installation detection for the dashboard Updater. Safely disables the `Update Now` button when OmniRoute is built locally rather than through npm, prompting for `git pull` (#743).
- **Update ERESOLVE Error:** Injected `package.json` overrides for `react`/`react-dom` and enabled `--legacy-peer-deps` within the internal automatic updater scripts to resolve breaking dependency tree conflicts with `@lobehub/ui`.

---

## [3.3.2] - 2026-03-29

### ✨ New Features

- **Cloudflare Tunnels:** Cloudflare Quick Tunnel integration with dashboard controls (PR #772).
- **Diagnostics:** Semantic cache bypass for combo live tests (PR #773).

### 🐛 Bug Fixes

- **Streaming Stability:** Apply `FETCH_TIMEOUT_MS` to streaming requests' initial `fetch()` call to prevent 300s Node.js TCP timeout causing silent task failures (#769).
- **i18n:** Add missing `windsurf` and `copilot` entries to `toolDescriptions` across all 33 locale files (#748).
- **GLM Coding Audit:** Complete provider audit fixing ReDoS vulnerabilities, context window sizing (128k/16k), and model registry syncing (PR #778).

---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

- **OpenAI Codex:** Fallback processing fix for `type: "text"` elements carrying null or empty datasets that caused 400 rejection (#742).
- **Opencode:** Update schema alignment to singular `provider` to match official spec (#774).
- **Gemini CLI:** Inject missing end-user quota headers preventing 403 authorization lockouts (#775).
- **DB Recovery:** Refactor multipart payload imports into raw binary buffered arrays to bypass reverse proxy max body limits (#770).

---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

- **Release Stabilization** — Finalized v3.2.9 release (combo diagnostics, quality gates, Gemini tool fix) and created missing git tag. Consolidated all staged changes into a single atomic release commit.

### 🐛 Bug Fixes

- **Auto-Update Test** — Fixed `buildDockerComposeUpdateScript` test assertion to match unexpanded shell variable references (`$TARGET_TAG`, `${TARGET_TAG#v}`) in the generated deploy script, aligning with the refactored template from v3.2.8.
- **Circuit Breaker Test** — Hardened `combo-circuit-breaker.test.mjs` by injecting `maxRetries: 0` to prevent retry inflation from skewing failure count assertions during breaker state transitions.

---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

- **Combo Diagnostics** — Introduced a live test bypass flag (`forceLiveComboTest`) allowing administrators to execute real upstream health checks that bypass all local circuit-breaker and cooldown state mechanisms, enabling precise diagnostics during rolling outages (PR #759)
- **Quality Gates** — Added automated response quality validation for combos and officially integrated `claude-4.6` model support into the core routing schemas (PR #762)

### 🐛 Bug Fixes

- **Tool Definition Validation** — Repaired Gemini API integration by normalizing enum types inside tool definitions, preventing upstream HTTP 400 parameter errors (PR #760)

---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

- **Docker Auto-Update UI** — Integrated a detached background update process for Docker Compose deployments. The Dashboard UI now seamlessly tracks update lifecycle events combining JSON REST responses with SSE streaming progress overlays for robust cross-environment reliability.
- **Cache Analytics** — Repaired zero-metrics visualization mapping by migrating Semantic Cache telemetry logs directly into the centralized tracking SQLite module.

### 🐛 Bug Fixes

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

- **OpenCode Go MiniMax Auth (#733)** — Corrected the authentication header logic for `minimax` models on OpenCode Go to use `x-api-key` instead of standard bearer tokens across the `/messages` protocol.

---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

- **Void Linux Deployment Support (#732)** — Integrated `xbps-src` packaging template and instructions to natively compile and install OmniRoute with `better-sqlite3` bindings via cross-compilation target.

## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

- **Qoder AI Migration (#660)** — Completely migrated the legacy `iFlow` core provider onto `Qoder AI` maintaining stable API routing capabilities.

### 🐛 Bug Fixes

- **Gemini Tools HTTP 400 Payload Invalid Argument (#731)** — Prevented `thoughtSignature` array injections inside standard Gemini `functionCall` sequences blocking agentic routing flows.

---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

- **Provider Limits Quota UI (#728)** — Normalized quota limit logic and data labeling inside the Limits interface.

### 🐛 Bug Fixes

- **Core Routing Schemas & Leaks** — Expanded `comboStrategySchema` to natively support `fill-first` and `p2c` strategies to unblock complex combo editing natively.
- **Thinking Tags Extraction (CLI)** — Restructured CLI token responses sanitizer RegEx capturing model reasoning structures inside streams avoiding broken `<thinking>` extractions breaking response text output format.
- **Strict Format Enforcements** — Hardened pipeline sanitization execution making it universally apply to translation mode targets.

---

## [3.2.2] — 2026-03-29

### ✨ New Features

- **Four-Stage Request Log Pipeline (#705)** — Refactored log persistence to save comprehensive payloads at four distinct pipeline stages: Client Request, Translated Provider Request, Provider Response, and Translated Client Response. Introduced `streamPayloadCollector` for robust SSE stream truncation and payload serialization.

### 🐛 Bug Fixes

- **Mobile UI Fixes (#659)** — Prevented table components on the dashboard from breaking the layout on narrow viewports by adding proper horizontal scrolling and overflow containment to `DashboardLayout`.
- **Claude Prompt Cache Fixes (#708)** — Ensured `cache_control` blocks in Claude-to-Claude fallback loops are faithfully preserved and passed safely back to Anthropic models.
- **Gemini Tool Definitions (#725)** — Fixed schema translation errors when declaring simple `object` parameter types for Gemini function calling.

## [3.2.1] — 2026-03-29

### ✨ New Features

- **Global Fallback Provider (#689)** — When all combo models are exhausted (502/503), OmniRoute now attempts a configurable global fallback model before returning the error. Set `globalFallbackModel` in settings to enable.

### 🐛 Bug Fixes

- **Fix #721** — Fixed context pinning bypass during tool-call responses. Non-streaming tagging used wrong JSON path (`json.messages` → `json.choices[0].message`). Streaming injection now triggers on `finish_reason` chunks for tool-call-only streams. `injectModelTag()` now appends synthetic pin messages for non-string content.
- **Fix #709** — Confirmed already fixed (v3.1.9) — `system-info.mjs` creates directories recursively. Closed.
- **Fix #707** — Confirmed already fixed (v3.1.9) — empty tool name sanitization in `chatCore.ts`. Closed.

### 🧪 Tests

- Added 6 unit tests for context pinning with tool-call responses (null content, array content, roundtrip, re-injection)

## [3.2.0] — 2026-03-28

### ✨ New Features

- **Cache Management UI** — Added a dedicated semantic caching dashboard at \`/dashboard/cache\` with targeted API invalidation and 31-language i18n support (PR #701 by @oyi77)
- **GLM Quota Tracking** — Added real-time usage and session quota tracking for the GLM Coding (Z.AI) provider (PR #698 by @christopher-s)
- **Detailed Log Payloads** — Wired full four-stage pipeline payload capturing (original, translated, provider-response, streamed-deltas) directly into the UI (PR #705 by @rdself)

### 🐛 Bug Fixes

- **Fix #708** — Prevented token bleeding for Claude Code users routing through OmniRoute by correctly preserving native \`cache_control\` headers during Claude-to-Claude passthrough (PR #708 by @tombii)
- **Fix #719** — Setup internal auth boundaries for \`ModelSyncScheduler\` to prevent unauthenticated daemon failures on startup (PR #719 by @rdself)
- **Fix #718** — Rebuilt badge rendering in Provider Limits UI preventing bad quota boundaries overlap (PR #718 by @rdself)
- **Fix #704** — Fixed Combo Fallbacks breaking on HTTP 400 content-policy errors preventing model-rotation dead-routing (PR #704 by @rdself)

### 🔒 Security & Dependencies

- Bumped \`path-to-regexp\` to \`8.4.0\` resolving dependabot vulnerabilities (PR #715)

## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

- **Fix #706** — Fixed icon fallback rendering caused by Tailwind V4 `font-sans` override by applying `!important` to `.material-symbols-outlined`.
- **Fix #703** — Fixed GitHub Copilot broken streams by enabling `responses` to `openai` format translation for any custom models leveraging `apiFormat: "responses"`.
- **Fix #702** — Replaced flat-rate usage tracking with accurate DB pricing calculations for both streaming and non-streaming responses.
- **Fix #716** — Cleaned up Claude tool-call translation state, correctly parsing streaming arguments and preventing OpenAI `tool_calls` chunks from repeating the `id` field.

## [3.1.9] — 2026-03-28

### ✨ New Features

- **Schema Coercion** — Auto-coerce string-encoded numeric JSON Schema constraints (e.g. `"minimum": "1"`) to proper types, preventing 400 errors from Cursor, Cline, and other clients sending malformed tool schemas.
- **Tool Description Sanitization** — Ensure tool descriptions are always strings; converts `null`, `undefined`, or numeric descriptions to empty strings before sending to providers.
- **Clear All Models Button** — Added i18n translations for the "Clear All Models" provider action across all 30 languages.
- **Codex Auth Export** — Added Codex `auth.json` export and apply-local buttons for seamless CLI integration.
- **Windsurf BYOK Notes** — Added official limitation warnings to the Windsurf CLI tool card documenting BYOK constraints.

### 🐛 Bug Fixes

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

- **Claude Prompt Caching Passthrough** — Fixed cache_control markers being stripped in Claude passthrough mode (Claude → OmniRoute → Claude), which caused Claude Code users to deplete their Anthropic API quota 5-10x faster than direct connections. OmniRoute now preserves client's cache_control markers when sourceFormat and targetFormat are both Claude, ensuring prompt caching works correctly and dramatically reducing token consumption.

## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

- **Platform Core:** Implemented global state handling for Hidden Models & Combos preventing them from cluttering the catalog or leaking into connected MCP agents (#681).
- **Stability:** Patched streaming crashes related to the native Antigravity provider integration failing due to unhandled undefined state arrays (#684).
- **Localization Sync:** Deployed a fully overhauled `i18n` synchronizer detecting missing nested JSON properties and retro-fitting 30 locales sequentially (#685).## [3.1.7] - 2026-03-27

### 🐛 Bug Fixes

- **Streaming Stability:** Fixed `hasValuableContent` returning `undefined` for empty chunks in SSE streams (#676).
- **Tool Calling:** Fixed an issue in `sseParser.ts` where non-streaming Claude responses with multiple tool calls dropped the `id` of subsequent tool calls due to incorrect index-based deduplication (#671).

---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

- **Claude Native Tool Name Restoration** — Tool names like `TodoWrite` are no longer prefixed with `proxy_` in Claude passthrough responses (both streaming and non-streaming). Includes unit test coverage (PR #663 by @coobabm)
- **Clear All Models Alias Cleanup** — "Clear All Models" button now also removes associated model aliases, preventing ghost models in the UI (PR #664 by @rdself)

---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

- **Backoff Auto-Decay** — Rate-limited accounts now auto-recover when their cooldown window expires, fixing a deadlock where high `backoffLevel` permanently deprioritized accounts (PR #657 by @brendandebeasi)

### 🌍 i18n

- **Chinese translation overhaul** — Comprehensive rewrite of `zh-CN.json` with improved accuracy (PR #658 by @only4copilot)

---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

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

- **Critical: Tool Calling Regression** — Fixed `proxy_Bash` errors by disabling the `proxy_` tool name prefix in the Claude passthrough path. Tools like `Bash`, `Read`, `Write` were being renamed to `proxy_Bash`, `proxy_Read`, etc., causing Claude to reject them (#618)
- **Kiro Account Ban Documentation** — Documented as upstream AWS anti-fraud false positive, not an OmniRoute issue (#649)

### 🧪 Tests

- **936 tests, 0 failures**

---

## [3.1.1] — 2026-03-26

### ✨ New Features

- **Vision Capability Metadata**: Added `capabilities.vision`, `input_modalities`, and `output_modalities` to `/v1/models` entries for vision-capable models (PR #646)
- **Gemini 3.1 Models**: Added `gemini-3.1-pro-preview` and `gemini-3.1-flash-lite-preview` to the Antigravity provider (#645)

### 🐛 Bug Fixes

- **Ollama Cloud 401 Error**: Fixed incorrect API base URL — changed from `api.ollama.com` to official `ollama.com/v1/chat/completions` (#643)
- **Expired Token Retry**: Added bounded retry with exponential backoff (5→10→20 min) for expired OAuth connections instead of permanently skipping them (PR #647)

### 🧪 Tests

- **936 tests, 0 failures**

---

## [3.1.0] — 2026-03-26

### ✨ New Features

- **GitHub Issue Templates**: Added standardized bug report, feature request, and config/proxy issue templates (#641)
- **Clear All Models**: Added a "Clear All Models" button to the provider detail page with i18n support in 29 languages (#634)

### 🐛 Bug Fixes

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

- **NaN tokens in Claude Code / client responses (#617):**
  - `sanitizeUsage()` now cross-maps `input_tokens`→`prompt_tokens` and `output_tokens`→`completion_tokens` before the whitelist filter, fixing responses showing NaN/0 token counts when providers return Claude-style usage field names

### אבטחה

- Updated `yaml` package to fix stack overflow vulnerability (GHSA-48c2-rrv3-qjmp)

### 📋 Issue Triage

- Closed #613 (Codestral — resolved with Custom Provider workaround)
- Commented on #615 (OpenCode dual-endpoint — workaround provided, tracked as feature request)
- Commented on #618 (tool call visibility — requesting v3.0.9 test)
- Commented on #627 (effort level — already supported)

---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

- **Translation Failures for OpenAI-format Providers in Claude CLI (#632):**
  - Handle `reasoning_details[]` array format from StepFun/OpenRouter — converts to `reasoning_content`
  - Handle `reasoning` field alias from some providers → normalized to `reasoning_content`
  - Cross-map usage field names: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` in `filterUsageForFormat`
  - Fix `extractUsage` to accept both `input_tokens`/`output_tokens` and `prompt_tokens`/`completion_tokens` as valid usage fields
  - Applied to both streaming (`sanitizeStreamingChunk`, `openai-to-claude.ts` translator) and non-streaming (`sanitizeMessage`) paths

---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

- **Antigravity Token Refresh:** Fixed `client_secret is missing` error for npm-installed users — the `clientSecretDefault` was empty in providerRegistry, causing Google to reject token refresh requests (#588)
- **OpenCode Zen Models:** Added `modelsUrl` to the OpenCode Zen registry entry so "Import from /models" works correctly (#612)
- **Streaming Artifacts:** Fixed excessive newlines left in responses after thinking-tag signature stripping (#626)
- **Proxy Fallback:** Added automatic retry without proxy when SOCKS5 relay fails
- **Proxy Test:** Test endpoint now resolves real credentials from DB via proxyId

### ✨ New Features

- **Playground Account/Key Selector:** Persistent, always-visible dropdown to select specific provider accounts/keys for testing — fetches all connections at startup and filters by selected provider
- **CLI Tools Dynamic Models:** Model selection now dynamically fetches from `/v1/models` API — providers like Kiro now show their full model catalog
- **Antigravity Model List:** Updated with Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; enabled `passthroughModels` for dynamic model access (#628)

### 🔧 Maintenance

- Merged PR #625 — Provider Limits light mode background fix

---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

- **Limits/Proxy:** Fixed Codex limit fetching for accounts behind SOCKS5 proxies — token refresh now runs inside proxy context
- **CI:** Fixed integration test `v1/models` assertion failure in CI environments without provider connections
- **Settings:** Proxy test button now shows success/failure results immediately (previously hidden behind health data)

### ✨ New Features

- **Playground:** Added Account selector dropdown — test specific connections individually when a provider has multiple accounts

### 🔧 Maintenance

- Merged PR #623 — LongCat API base URL path correction

---

## [3.0.5] — 2026-03-25

### ✨ New Features

- **Limits UI:** Added tag grouping feature to the connections dashboard to improve visual organization for accounts with custom tags.

---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

- **Streaming:** Fixed `TextDecoder` state corruption inside combo `sanitize` TransformStream which caused SSE garbled output matching multibyte characters (PR #614)
- **Providers UI:** Safely render HTML tags inside provider connection error tooltips using `dangerouslySetInnerHTML`
- **Proxy Settings:** Added missing `username` and `password` payload body properties allowing authenticated proxies to be successfully verified from the Dashboard.
- **Provider API:** Bound soft exception returns to `getCodexUsage` preventing API HTTP 500 failures when token fetch fails

---

## [3.0.3] — 2026-03-25

### ✨ New Features

- **Auto-Sync Models:** Added a UI toggle and `sync-models` endpoint to automatically synchronise model lists per provider using a scheduled interval scheduler (PR #597)

### 🐛 Bug Fixes

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

- **#585** — `<omniModel>` internal tags no longer leak to clients in SSE responses. Added outbound sanitization `TransformStream` in `combo.ts`

### ⚙️ Infrastructure

- **Docker** — Upgraded `docker/setup-buildx-action` from v3 → v4 (Node.js 20 deprecation fix)
- **CI cleanup** — Deleted 150+ failed/cancelled workflow runs

### 🧪 Tests

- Test suite: **926 tests, 0 failures** (+3 new)

---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Increased media transcription limits
- Added Model Context Length to registry metadata
- Added per-model upstream custom headers via configuration UI
- Fixed multiple bugs, Zod valiadation for patches, and resolved various community issues.

## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

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

### אבטחה

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
- **#510 — Windows paths:** MSYS2/Git-Bash paths (`/c/Program Files/...`) are now normalized to `C:\\Program Files\\...` automatically.
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

- **#530 (PR)** — OpenCode Zen and OpenCode Go providers added (by @kang-heewon)
  - New `OpencodeExecutor` with multi-format routing (`/chat/completions`, `/messages`, `/responses`)
  - 7 models across both tiers

---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

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
- **#510** — Windows: MSYS2/Git-Bash paths (`/c/Program Files/...`) are now normalized to `C:\\Program Files\\...`
- **#492** — `omniroute` CLI now detects `mise`/`nvm` when `app/server.js` is missing and shows targeted fix

### תיעוד

- **#513** — Docker password reset: `INITIAL_PASSWORD` env var workaround documented
- **#520** — pnpm: `pnpm approve-builds better-sqlite3` documented

### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532

---

## [2.9.5] — 2026-03-22

> Sprint: New OpenCode providers, embedding credentials fix, CLI masked key bug, CACHE_TAG_PATTERN fix.

### 🐛 Bug Fixes

- **CLI tools save masked API key to config files** — `claude-settings`, `cline-settings`, and `openclaw-settings` POST routes now accept a `keyId` param and resolve the real API key from DB before writing to disk. `ClaudeToolCard` updated to send `keyId` instead of the masked display string. Fixes #523, #526.
- **Custom embedding providers: `No credentials` error** — `/v1/embeddings` now tracks `credentialsProviderId` separately from the routing prefix, so credentials are fetched from the matching provider node ID rather than the public prefix string. Fixes a regression where `google/gemini-embedding-001` and similar custom-provider models would always fail with a credentials error. Fixes #532-related. (PR #528 by @jacob2826)
- **Context cache protection regex misses `\n` prefix** — `CACHE_TAG_PATTERN` in `comboAgentMiddleware.ts` updated to match both literal `\n` (backslash-n) and actual newline U+000A that `combo.ts` streaming injects around the `<omniModel>` tag after fix #515. Fixes #531.

### ✨ New Providers

- **OpenCode Zen** — Free tier gateway at `opencode.ai/zen/v1` with 3 models: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano`
- **OpenCode Go** — Subscription service at `opencode.ai/zen/go/v1` with 4 models: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude format), `minimax-m2.5` (Claude format)
- Both providers use the new `OpencodeExecutor` which routes dynamically to `/chat/completions`, `/messages`, `/responses`, or `/models/{model}:generateContent` based on the requested model. (PR #530 by @kang-heewon)

---

## [2.9.4] — 2026-03-21

> Sprint: Bug fixes — preserve Codex prompt cache key, fix tagContent JSON escaping, sync expired token status to DB.

### 🐛 Bug Fixes

- **fix(translator)**: Preserve `prompt_cache_key` in Responses API → Chat Completions translation (#517)
  — The field is a cache-affinity signal used by Codex; stripping it was preventing prompt cache hits.
  Fixed in `openai-responses.ts` and `responsesApiHelper.ts`.

- **fix(combo)**: Escape `\n` in `tagContent` so injected JSON string is valid (#515)
  — Template literal newlines (U+000A) are not allowed unescaped inside JSON string values.
  Replaced with `\\n` literal sequences in `open-sse/services/combo.ts`.

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

### תיעוד

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

- **feat(search)**: Search Analytics tab in `/dashboard/analytics` — provider breakdown, cache hit rate, cost tracking. New API: `GET /api/v1/search/analytics` (#feat/search-provider-routing)
- **feat(provider)**: Alibaba Cloud DashScope added with custom endpoint path validation — configurable `chatPath` and `modelsPath` per node (#feat/custom-endpoint-paths)
- **feat(api)**: Per-API-key request-count limits — `max_requests_per_day` and `max_requests_per_minute` columns with in-memory sliding-window enforcement returning HTTP 429 (#452)
- **feat(dev)**: ZWS v5 — HMR leak fix (485 DB connections → 1), memory 2.4GB → 195MB, `globalThis` singletons, Edge Runtime warning fix (@zhangqiang8vip)

### 🐛 Bug Fixes

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

### תכונות

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

### תכונות

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

### תכונות

- **Gemini CLI Deprecation** (#462): Mark `gemini-cli` provider as deprecated with warning — Google restricts third-party OAuth usage from March 2026
- **Provider Schema** (#462): Expand Zod validation with `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint` optional fields

### Bug Fixes

- **VM Guide i18n** (#471): Add `VM_DEPLOYMENT_GUIDE.md` to i18n translation pipeline, regenerate all 30 locale translations from English source (were stuck in Portuguese)

### אבטחה

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

### תכונות

- **Czech Language** (#482): Full Czech (cs) i18n — 22 docs, 2606 UI strings, language switcher updates (@zen0bit)
- **VM Deployment Guide**: Translated from Portuguese to English as the source document (@zen0bit)

### Bug Fixes

- **SSE Protocol** (#483): Stop sending trailing `data: null` after `[DONE]` signal — fixes `AI_TypeValidationError` in strict AI SDK clients (Zod-based validators)

### Merged PRs

- #482 — Add Czech language + Fix VM_DEPLOYMENT_GUIDE.md English source (@zen0bit)

---

## [2.8.2] — 2026-03-19

> Sprint: 2 merged PRs, model aliases routing fix, log export, and issue triage.

### תכונות

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

### תכונות

- **feat(logs)**: Call log response content now correctly accumulated from raw provider chunks (OpenAI/Claude/Gemini) before translation, fixing empty response payloads in streaming mode (#470, @zhangqiang8vip)
- **feat(providers)**: Per-model configurable 9-char tool call ID normalization (Mistral-style) — only models with the option enabled get truncated IDs (#470)
- **feat(api)**: Key PATCH API expanded to support `allowedConnections`, `name`, `autoResolve`, `isActive`, and `accessSchedule` fields (#470)
- **feat(dashboard)**: Response-first layout in request log detail UI (#470)
- **feat(i18n)**: Improved Chinese (zh-CN) translation — complete retranslation (#475, @only4copilot)

### 🐛 Bug Fixes

- **fix(kiro)**: Strip injected `model` field from request body — Kiro API rejects unknown top-level fields (#478, @prakersh)
- **fix(usage)**: Include cache read + cache creation tokens in usage history input totals for accurate analytics (#477, @prakersh)
- **fix(callLogs)**: Support Claude format usage fields (`input_tokens`/`output_tokens`) alongside OpenAI format, include all cache token variants (#476, @prakersh)

---

## [2.8.0] — 2026-03-19

> Sprint: Bailian Coding Plan provider with editable base URLs, plus community contributions for Alibaba Cloud and Kimi Coding.

### תכונות

- **feat(providers)**: Added Bailian Coding Plan (`bailian-coding-plan`) — Alibaba Model Studio with Anthropic-compatible API. Static catalog of 8 models including Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5, and Kimi K2.5. Includes custom auth validation (400=valid, 401/403=invalid) (#467, @Mind-Dragon)
- **feat(admin)**: Editable default URL in Provider Admin create/edit flows — users can configure custom base URLs per connection. Persisted in `providerSpecificData.baseUrl` with Zod schema validation rejecting non-http(s) schemes (#467)

### 🧪 Tests

- Added 30+ unit tests and 2 e2e scenarios for Bailian Coding Plan provider covering auth validation, schema hardening, route-level behavior, and cross-layer integration

---

## [2.7.10] — 2026-03-19

> Sprint: Two new community-contributed providers (Alibaba Cloud Coding, Kimi Coding API-key) and Docker pino fix.

### תכונות

- **feat(providers)**: Added Alibaba Cloud Coding Plan support with two OpenAI-compatible endpoints — `alicode` (China) and `alicode-intl` (International), each with 8 models (#465, @dtk1985)
- **feat(providers)**: Added dedicated `kimi-coding-apikey` provider path — API-key-based Kimi Coding access is no longer forced through OAuth-only `kimi-coding` route. Includes registry, constants, models API, config, and validation test (#463, @Mind-Dragon)

### 🐛 Bug Fixes

- **fix(docker)**: Added missing `split2` dependency to Docker image — `pino-abstract-transport` requires it at runtime but it was not being copied into the standalone container, causing `Cannot find module 'split2'` crashes (#459)

---

## [2.7.9] — 2026-03-18

> Sprint: Codex responses subpath passthrough natively supported, Windows MITM crash fixed, and Combos agent schemas adjusted.

### תכונות

- **feat(codex)**: Native responses subpath passthrough for Codex — natively routes `POST /v1/responses/compact` to Codex upstream, maintaining Claude Code compatibility without stripping the `/compact` suffix (#457)

### 🐛 Bug Fixes

- **fix(combos)**: Zod schemas (`updateComboSchema` and `createComboSchema`) now include `system_message`, `tool_filter_regex`, and `context_cache_protection`. Fixes bug where agent-specific settings created via the dashboard were silently discarded by the backend validation layer (#458)
- **fix(mitm)**: Kiro MITM profile crash on Windows fixed — `node-machine-id` failed due to missing `REG.exe` env, and the fallback threw a fatal `crypto is not defined` error. Fallback now safely and correctly imports crypto (#456)

---

## [2.7.8] — 2026-03-18

> Sprint: Budget save bug + combo agent features UI + omniModel tag security fix.

### 🐛 Bug Fixes

- **fix(budget)**: "Save Limits" no longer returns 422 — `warningThreshold` is now correctly sent as fraction (0–1) instead of percentage (0–100) (#451)
- **fix(combos)**: `<omniModel>` internal cache tag is now stripped before forwarding requests to providers, preventing cache session breaks (#454)

### תכונות

- **feat(combos)**: Agent Features section added to combo create/edit modal — expose `system_message` override, `tool_filter_regex`, and `context_cache_protection` directly from the dashboard (#454)

---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino crash, Codex CLI responses worker fix, package-lock sync.

### 🐛 Bug Fixes

- **fix(docker)**: `pino-abstract-transport` and `pino-pretty` now explicitly copied in Docker runner stage — Next.js standalone trace misses these peer deps, causing `Cannot find module pino-abstract-transport` crash on startup (#449)
- **fix(responses)**: Remove `initTranslators()` from `/v1/responses` route — was crashing Next.js worker with `the worker has exited` uncaughtException on Codex CLI requests (#450)

### 🔧 Maintenance

- **chore(deps)**: `package-lock.json` now committed on every version bump to ensure Docker `npm ci` uses exact dependency versions

---

## [2.7.5] — 2026-03-18

> Sprint: UX improvements and Windows CLI healthcheck fix.

### 🐛 Bug Fixes

- **fix(ux)**: Show default password hint on login page — new users now see `"Default password: 123456"` below the password input (#437)
- **fix(cli)**: Claude CLI and other npm-installed tools now correctly detected as runnable on Windows — spawn uses `shell:true` to resolve `.cmd` wrappers via PATHEXT (#447)

---

## [2.7.4] — 2026-03-18

> Sprint: Search Tools dashboard, i18n fixes, Copilot limits, Serper validation fix.

### תכונות

- **feat(search)**: Add Search Playground (10th endpoint), Search Tools page with Compare Providers/Rerank Pipeline/Search History, local rerank routing, auth guards on search API (#443 by @Regis-RCR)
  - New route: `/dashboard/search-tools`
  - Sidebar entry under Debug section
  - `GET /api/search/providers` and `GET /api/search/stats` with auth guards
  - Local provider_nodes routing for `/v1/rerank`
  - 30+ i18n keys in search namespace

### 🐛 Bug Fixes

- **fix(search)**: Fix Brave news normalizer (was returning 0 results), enforce max_results truncation post-normalization, fix Endpoints page fetch URL (#443 by @Regis-RCR)
- **fix(analytics)**: Localize analytics day/date labels — replace hardcoded Portuguese strings with `Intl.DateTimeFormat(locale)` (#444 by @hijak)
- **fix(copilot)**: Correct GitHub Copilot account type display, filter misleading unlimited quota rows from limits dashboard (#445 by @hijak)
- **fix(providers)**: Stop rejecting valid Serper API keys — treat non-4xx responses as valid authentication (#446 by @hijak)

---

## [2.7.3] — 2026-03-18

> Sprint: Codex direct API quota fallback fix.

### 🐛 Bug Fixes

- **fix(codex)**: Block weekly-exhausted accounts in direct API fallback (#440)
  - `resolveQuotaWindow()` prefix matching: `"weekly"` now matches `"weekly (7d)"` cache keys
  - `applyCodexWindowPolicy()` enforces `useWeekly`/`use5h` toggles correctly
  - 4 new regression tests (766 total)

---

## [2.7.2] — 2026-03-18

> Sprint: Light mode UI contrast fixes.

### 🐛 Bug Fixes

- **fix(logs)**: Fix light mode contrast in request logs filter buttons and combo badge (#378)
  - Error/Success/Combo filter buttons now readable in light mode
  - Combo row badge uses stronger violet in light mode

---

## [2.7.1] — 2026-03-17

> Sprint: Unified web search routing (POST /v1/search) with 5 providers + Next.js 16.1.7 security fixes (6 CVEs).

### ✨ New Features

- **feat(search)**: Unified web search routing — `POST /v1/search` with 5 providers (Serper, Brave, Perplexity, Exa, Tavily)
  - Auto-failover across providers, 6,500+ free searches/month
  - In-memory cache with request coalescing (configurable TTL)
  - Dashboard: Search Analytics tab in `/dashboard/analytics` with provider breakdown, cache hit rate, cost tracking
  - New API: `GET /api/v1/search/analytics` for search request statistics
  - DB migration: `request_type` column on `call_logs` for non-chat request tracking
  - Zod validation (`v1SearchSchema`), auth-gated, cost recorded via `recordCost()`

### אבטחה

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

- **close(#411)**: better-sqlite3 hashed module resolution on Windows — fixed in v2.6.10 (f02c5b5)
- **close(#409)**: GitHub Copilot chat completions fail with Claude models when files attached — fixed in v2.6.9 (838f1d6)
- **close(#405)**: Duplicate of #411 — resolved

## [2.6.10] — 2026-03-17

> Windows fix: better-sqlite3 prebuilt download without node-gyp/Python/MSVC (#426).

### 🐛 Bug Fixes

- **fix(install/#426)**: On Windows, `npm install -g omniroute` used to fail with `better_sqlite3.node is not a valid Win32 application` because the bundled native binary was compiled for Linux. Adds **Strategy 1.5** to `scripts/postinstall.mjs`: uses `@mapbox/node-pre-gyp install --fallback-to-build=false` (bundled within `better-sqlite3`) to download the correct prebuilt binary for the current OS/arch without requiring any build tools (no node-gyp, no Python, no MSVC). Falls back to `npm rebuild` only if the download fails. Adds platform-specific error messages with clear manual fix instructions.

---

## [2.6.9] — 2026-03-17

> CI fixes (t11 any-budget), bug fix #409 (file attachments via Copilot+Claude), release workflow correction.

### 🐛 Bug Fixes

- **fix(ci)**: Remove word "any" from comments in `openai-responses.ts` and `chatCore.ts` that were failing the t11 `\bany\b` budget check (false positive from regex counting comments)
- **fix(chatCore)**: Normalize unsupported content part types before forwarding to providers (#409 — Cursor sends `{type:"file"}` when `.md` files are attached; Copilot and other OpenAI-compat providers reject with "type has to be either 'image_url' or 'text'"; fix converts `file`/`document` blocks to `text` and drops unknown types)

### 🔧 Workflow

- **chore(generate-release)**: Add ATOMIC COMMIT RULE — version bump (`npm version patch`) MUST happen before committing feature files to ensure tag always points to a commit containing all version changes together

---

## [2.6.8] — 2026-03-17

> Sprint: Combo as Agent (system prompt + tool filter), Context Caching Protection, Auto-Update, Detailed Logs, MITM Kiro IDE.

### 🗄️ DB Migrations (zero-breaking — safe for existing users)

- **005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0`
- **006_detailed_request_logs.sql**: New `request_detail_logs` table with 500-entry ring-buffer trigger, opt-in via settings toggle

### תכונות

- **feat(combo)**: System Message Override per Combo (#399 — `system_message` field replaces or injects system prompt before forwarding to provider)
- **feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` keeps only tools matching pattern; supports OpenAI + Anthropic formats)
- **feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` tags responses with `<omniModel>provider/model</omniModel>` and pins model for session continuity)
- **feat(settings)**: Auto-Update via Settings (#320 — `GET /api/system/version` + `POST /api/system/update` — checks npm registry and updates in background with pm2 restart)
- **feat(logs)**: Detailed Request Logs (#378 — captures full pipeline bodies at 4 stages: client request, translated request, provider response, client response — opt-in toggle, 64KB trim, 500-entry ring-buffer)
- **feat(mitm)**: MITM Kiro IDE profile (#336 — `src/mitm/targets/kiro.ts` targets api.anthropic.com, reuses existing MITM infrastructure)

---

## [2.6.7] — 2026-03-17

> Sprint: SSE improvements, local provider_nodes extensions, proxy registry, Claude passthrough fixes.

### תכונות

- **feat(health)**: Background health check for local `provider_nodes` with exponential backoff (30s→300s) and `Promise.allSettled` to avoid blocking (#423, @Regis-RCR)
- **feat(embeddings)**: Route `/v1/embeddings` to local `provider_nodes` — `buildDynamicEmbeddingProvider()` with hostname validation (#422, @Regis-RCR)
- **feat(audio)**: Route TTS/STT to local `provider_nodes` — `buildDynamicAudioProvider()` with SSRF protection (#416, @Regis-RCR)
- **feat(proxy)**: Proxy registry, management APIs, and quota-limit generalization (#429, @Regis-RCR)

### 🐛 Bug Fixes

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

- **fix(build)**: Removed `node:` protocol prefix from `import` statements in 17 files under `src/`. The `node:fs`, `node:path`, `node:url`, `node:os` etc. imports caused `Ecmascript file had an error` on Turbopack builds (Next.js 15 Docker) and on upgrades from older npm global installs. Affected files: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts`, and 12 others in `src/app/api/` and `src/lib/`.
- **chore(workflow)**: Updated `generate-release.md` to make Docker Hub sync and dual-VPS deploy **mandatory** steps in every release.

---

## [2.6.5] — 2026-03-17

> Sprint: reasoning model param filtering, local provider 404 fix, Kilo Gateway provider, dependency bumps.

### ✨ New Features

- **feat(api)**: Added **Kilo Gateway** (`api.kilo.ai`) as a new API Key provider (alias `kg`) — 335+ models, 6 free models, 3 auto-routing models (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Passthrough models supported via `/api/gateway/models` endpoint. (PR #408 by @Regis-RCR)

### 🐛 Bug Fixes

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

- **fix(build)**: Turbopack hash-strip now runs at **compile time** for ALL packages — not just `better-sqlite3`. Step 5.6 in `prepublish.mjs` walks every `.js` in `app/.next/server/` and strips the 16-char hex suffix from any hashed `require()`. Fixes `zod-dcb22c...`, `pino-...`, etc. MODULE_NOT_FOUND on global npm installs. Closes #398
- **fix(deploy)**: PM2 on both VPS was pointing to stale git-clone directories. Reconfigured to `app/server.js` in the npm global package. Updated `/deploy-vps` workflow to use `npm pack + scp` (npm registry rejects 299MB packages).

### תכונות

- **feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)) — privacy-focused OpenAI-compatible inference. `passthroughModels: true` for dynamic HuggingFace model catalog. Initial models: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 by @Regis-RCR)

### 📋 Issues Closed

- **close #398**: npm hash regression — fixed by compile-time hash-strip in prepublish
- **triage #324**: Bug screenshot without steps — requested reproduction details

---

## [2.6.2] — 2026-03-16

> Sprint: module hashing fully fixed, 2 PRs merged (Anthropic tools filter + custom endpoint paths), Alibaba Cloud DashScope provider added, 3 stale issues closed.

### 🐛 Bug Fixes

- **fix(build)**: Extended webpack `externals` hash-strip to cover ALL `serverExternalPackages`, not just `better-sqlite3`. Next.js 16 Turbopack hashes `zod`, `pino`, and every other server-external package into names like `zod-dcb22c6336e0bc69` that don't exist in `node_modules` at runtime. A HASH_PATTERN regex catch-all now strips the 16-char suffix and falls back to the base package name. Also added `NEXT_PRIVATE_BUILD_WORKER=0` in `prepublish.mjs` to reinforce webpack mode, plus a post-build scan that reports any remaining hashed refs. (#396, #398, PR #403)
- **fix(chat)**: Anthropic-format tool names (`tool.name` without `.function` wrapper) were silently dropped by the empty-name filter introduced in #346. LiteLLM proxies requests with `anthropic/` prefix in Anthropic Messages API format, causing all tools to be filtered and Anthropic to return `400: tool_choice.any may only be specified while providing tools`. Fixed by falling back to `tool.name` when `tool.function.name` is absent. Added 8 regression unit tests. (PR #397)

### תכונות

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

- **fix(build)**: Force `better-sqlite3` to always be required by its exact package name in the webpack server bundle. Next.js 16 compiled the instrumentation hook into a separate chunk and emitted `require('better-sqlite3-<hash>')` — a hashed module name that doesn't exist in `node_modules` — even though the package was listed in `serverExternalPackages`. Added an explicit `externals` function to the server webpack config so the bundler always emits `require('better-sqlite3')`, resolving the startup `500 Internal Server Error` on clean global installs. (#394, PR #395)

### 🔧 CI

- **ci**: Added `workflow_dispatch` to `npm-publish.yml` with version sync safeguard for manual triggers (#392)
- **ci**: Added `workflow_dispatch` to `docker-publish.yml`, updated GitHub Actions to latest versions (#392)

---

## [2.6.0] - 2026-03-15

> Issue resolution sprint: 4 bugs fixed, logs UX improved, Kiro credit tracking added.

### 🐛 Bug Fixes

- **fix(media)**: ComfyUI and SD WebUI no longer appear in the Media page provider list when unconfigured — fetches `/api/providers` on mount and hides local providers with no connections (#390)
- **fix(auth)**: Round-robin no longer re-selects rate-limited accounts immediately after cooldown — `backoffLevel` is now used as primary sort key in the LRU rotation (#340)
- **fix(oauth)**: Qoder (and other providers that redirect to their own UI) no longer leave the OAuth modal stuck at "Waiting for Authorization" — popup-closed detector auto-transitions to manual URL input mode (#344)
- **fix(logs)**: Request log table is now readable in light mode — status badges, token counts, and combo tags use adaptive `dark:` color classes (#378)

### תכונות

- **feat(kiro)**: Kiro credit tracking added to usage fetcher — queries `getUserCredits` from AWS CodeWhisperer endpoint (#337)

### 🛠 Chores

- **chore(tests)**: Aligned `test:plan3`, `test:fixes`, `test:security` to use same `tsx/esm` loader as `npm test` — eliminates module resolution false negatives in targeted runs (PR #386)

---

## [2.5.9] - 2026-03-15

> Codex native passthrough fix + route body validation hardening.

### 🐛 Bug Fixes

- **fix(codex)**: Preserve native Responses API passthrough for Codex clients — avoids unnecessary translation mutations (PR #387)
- **fix(api)**: Validate request bodies on pricing/sync and task-routing routes — prevents crashes from malformed inputs (PR #388)
- **fix(auth)**: JWT secrets persist across restarts via `src/lib/db/secrets.ts` — eliminates 401 errors after pm2 restart (PR #388)

---

## [2.5.8] - 2026-03-15

> Build fix: restore VPS connectivity broken by v2.5.7 incomplete publish.

### 🐛 Bug Fixes

- **fix(build)**: `scripts/prepublish.mjs` still used deprecated `--webpack` flag causing Next.js standalone build to fail silently — npm publish completed without `app/server.js`, breaking VPS deployment

---

## [2.5.7] - 2026-03-15

> Media playground error handling fixes.

### 🐛 Bug Fixes

- **fix(media)**: Transcription "API Key Required" false positive when audio contains no speech (music, silence) — now shows "No speech detected" instead
- **fix(media)**: `upstreamErrorResponse` in `audioTranscription.ts` and `audioSpeech.ts` now returns proper JSON (`{error:{message}}`), enabling correct 401/403 credential error detection in the MediaPageClient
- **fix(media)**: `parseApiError` now handles Deepgram's `err_msg` field and detects `"api key"` in error messages for accurate credential error classification

---

## [2.5.6] - 2026-03-15

> Critical security/auth fixes: Antigravity OAuth broken + JWT sessions lost after restart.

### 🐛 Bug Fixes

- **fix(oauth) #384**: Antigravity Google OAuth now correctly sends `client_secret` to the token endpoint. The fallback for `ANTIGRAVITY_OAUTH_CLIENT_SECRET` was an empty string, which is falsy — so `client_secret` was never included in the request, causing `"client_secret is missing"` errors for all users without a custom env var. Closes #383.
- **fix(auth) #385**: `JWT_SECRET` is now persisted to SQLite (`namespace='secrets'`) on first generation and reloaded on subsequent starts. Previously, a new random secret was generated each process startup, invalidating all existing cookies/sessions after any restart or upgrade. Affects both `JWT_SECRET` and `API_KEY_SECRET`. Closes #382.

---

## [2.5.5] - 2026-03-15

> Model list dedup fix, Electron standalone build hardening, and Kiro credit tracking.

### 🐛 Bug Fixes

- **fix(models) #380**: `GET /api/models` now includes provider aliases when building the active-provider filter — models for `claude` (alias `cc`) and `github` (alias `gh`) were always shown regardless of whether a connection was configured, because `PROVIDER_MODELS` keys are aliases but DB connections are stored under provider IDs. Fixed by expanding each active provider ID to also include its alias via `PROVIDER_ID_TO_ALIAS`. Closes #353.
- **fix(electron) #379**: New `scripts/prepare-electron-standalone.mjs` stages a dedicated `/.next/electron-standalone` bundle before Electron packaging. Aborts with a clear error if `node_modules` is a symlink (electron-builder would ship a runtime dependency on the build machine). Cross-platform path sanitization via `path.basename`. By @kfiramar.

### ✨ New Features

- **feat(kiro) #381**: Kiro credit balance tracking — usage endpoint now returns credit data for Kiro accounts by calling `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (same endpoint Kiro IDE uses internally). Returns remaining credits, total allowance, renewal date, and subscription tier. Closes #337.

## [2.5.4] - 2026-03-15

> Logger startup fix, login bootstrap security fix, and dev HMR reliability improvement. CI infrastructure hardened.

### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

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

- **Codex Quota Policy (PR #366)**: Per-account 5h/weekly quota window toggles in Provider dashboard. Accounts are automatically skipped when enabled windows reach 90% threshold and re-admitted after `resetAt`. Includes `quotaCache.ts` with side-effect free status getter.
- **Codex Fast Tier Toggle (PR #367)**: Dashboard → Settings → Codex Service Tier. Default-off toggle injects `service_tier: "flex"` only for Codex requests, reducing cost ~80%. Full stack: UI tab + API endpoint + executor + translator + startup restore.
- **gpt-5.4 Model (PR #368)**: Adds `cx/gpt-5.4` and `codex/gpt-5.4` to the Codex model registry. Regression test included.

### 🐛 Bug Fixes

- **fix #356**: Analytics charts (Top Provider, By Account, Provider Breakdown) now display human-readable provider names/labels instead of raw internal IDs for OpenAI-compatible providers.

> Major release: strict-random routing strategy, API key access controls, connection groups, external pricing sync, and critical bug fixes for thinking models, combo testing, and tool name validation.

### ✨ New Features (PRs #363 & #365)

- **Strict-Random Routing Strategy**: Fisher-Yates shuffle deck with anti-repeat guarantee and mutex serialization for concurrent requests. Independent decks per combo and per provider.
- **API Key Access Controls**: `allowedConnections` (restrict which connections a key can use), `is_active` (enable/disable key with 403), `accessSchedule` (time-based access control), `autoResolve` toggle, rename keys via PATCH.
- **Connection Groups**: Group provider connections by environment. Accordion view in Limits page with localStorage persistence and smart auto-switch.
- **External Pricing Sync (LiteLLM)**: 3-tier pricing resolution (user overrides → synced → defaults). Opt-in via `PRICING_SYNC_ENABLED=true`. MCP tool `omniroute_sync_pricing`. 23 new tests.
- **i18n**: 30 languages updated with strict-random strategy, API key management strings. pt-BR fully translated.

### 🐛 Bug Fixes

- **fix #355**: Stream idle timeout increased from 60s to 300s — prevents aborting extended-thinking models (claude-opus-4-6, o3, etc.) during long reasoning phases. Configurable via `STREAM_IDLE_TIMEOUT_MS`.
- **fix #350**: Combo test now bypasses `REQUIRE_API_KEY=true` using internal header, and uses OpenAI-compatible format universally. Timeout extended from 15s to 20s.
- **fix #346**: Tools with empty `function.name` (forwarded by Claude Code) are now filtered before upstream providers receive them, preventing "Invalid input[N].name: empty string" errors.

### 🗑️ Closed Issues

- **#341**: Debug section removed — replacement is `/dashboard/logs` and `/dashboard/health`.

> API Key Round-Robin support for multi-key provider setups, and confirmation of wildcard routing and quota window rolling already in place.

### ✨ New Features

- **API Key Round-Robin (T07)**: Provider connections can now hold multiple API keys (Edit Connection → Extra API Keys). Requests rotate round-robin between primary + extra keys via `providerSpecificData.extraApiKeys[]`. Keys are held in-memory indexed per connection — no DB schema changes required.

### 📝 Already Implemented (confirmed in audit)

- **Wildcard Model Routing (T13)**: `wildcardRouter.ts` with glob-style wildcard matching (`gpt*`, `claude-?-sonnet`, etc.) is already integrated into `model.ts` with specificity ranking.
- **Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` already auto-advances the window — if `Date.now() > entry.until`, lock is deleted immediately (no stale blocking).

> UI polish, routing strategy additions, and graceful error handling for usage limits.

### ✨ New Features

- **Fill-First & P2C Routing Strategies**: Added `fill-first` (drain quota before moving on) and `p2c` (Power-of-Two-Choices low-latency selection) to combo strategy picker, with full guidance panels and color-coded badges.
- **Free Stack Preset Models**: Creating a combo with the Free Stack template now auto-fills 7 best-in-class free provider models (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Users just activate the providers and get a $0/month combo out-of-the-box.
- **Wider Combo Modal**: Create/Edit combo modal now uses `max-w-4xl` for comfortable editing of large combos.

### 🐛 Bug Fixes

- **Limits page HTTP 500 for Codex & GitHub**: `getCodexUsage()` and `getGitHubUsage()` now return a user-friendly message when the provider returns 401/403 (expired token), instead of throwing and causing a 500 error on the Limits page.
- **MaintenanceBanner false-positive**: Banner no longer shows "Server is unreachable" spuriously on page load. Fixed by calling `checkHealth()` immediately on mount and removing stale `show`-state closure.
- **Provider icon tooltips**: Edit (pencil) and delete icon buttons in the provider connection row now have native HTML tooltips — all 6 action icons are now self-documented.

> Multiple improvements from community issue analysis, new provider support, bug fixes for token tracking, model routing, and streaming reliability.

### ✨ New Features

- **Task-Aware Smart Routing (T05)**: Automatic model selection based on request content type — coding → deepseek-chat, analysis → gemini-2.5-pro, vision → gpt-4o, summarization → gemini-2.5-flash. Configurable via Settings. New `GET/PUT/POST /api/settings/task-routing` API.
- **HuggingFace Provider**: Added HuggingFace Router as an OpenAI-compatible provider with Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini.
- **Vertex AI Provider**: Added Vertex AI (Google Cloud) provider with Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex.
- **Playground File Uploads**: Audio upload for transcription, image upload for vision models (auto-detect by model name), inline image rendering for image generation results.
- **Model Select Visual Feedback**: Already-added models in combo picker now show ✓ green badge — prevents duplicate confusion.
- **Qwen Compatibility (PR #352)**: Updated User-Agent and CLI fingerprint settings for Qwen provider compatibility.
- **Round-Robin State Management (PR #349)**: Enhanced round-robin logic to handle excluded accounts and maintain rotation state correctly.
- **Clipboard UX (PR #360)**: Hardened clipboard operations with fallback for non-secure contexts; Claude tool normalization improvements.

### 🐛 Bug Fixes

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

### תכונות

- **Combos: Free Stack template** — New 4th template "Free Stack ($0)" using round-robin across Kiro + Qoder + Qwen + Gemini CLI. Suggests the pre-built zero-cost combo on first use.
- **Media/Transcription: Deepgram as default** — Deepgram (Nova 3, $200 free) is now the default transcription provider. AssemblyAI ($50 free) and Groq Whisper (free forever) shown with free credit badges.
- **README: "Start Free" section** — New early-README 5-step table showing how to set up zero-cost AI in minutes.
- **README: Free Transcription Combo** — New section with Deepgram/AssemblyAI/Groq combo suggestion and per-provider free credit details.
- **providers.ts: hasFree flag** — NVIDIA NIM, Cerebras, and Groq marked with hasFree badge and freeNote for the providers UI.
- **i18n: templateFreeStack keys** — Free Stack combo template translated and synced to all 30 languages.

## [2.3.16] - 2026-03-13

### תיעוד

- **README: 44+ Providers** — Updated all 3 occurrences of "36+ providers" to "44+" reflecting the actual codebase count (44 providers in providers.ts)
- **README: New Section "🆓 Free Models — What You Actually Get"** — Added 7-provider table with per-model rate limits for: Kiro (Claude unlimited via AWS Builder ID), Qoder (5 models unlimited), Qwen (4 models unlimited), Gemini CLI (180K/mo), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1M tok/day / 60K TPM), Groq (30 RPM / 14.4K RPD). Includes the \/usr/bin/bash Ultimate Free Stack combo recommendation.
- **README: Pricing Table Updated** — Added Cerebras to API KEY tier, fixed NVIDIA from "1000 credits" to "dev-forever free", updated Qoder/Qwen model counts and names
- **README: Qoder 8→5 models** (named: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2)
- **README: Qwen 3→4 models** (named: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)

## [2.3.15] - 2026-03-13

### תכונות

- **Auto-Combo Dashboard (Tier Priority)**: Added `🏷️ Tier` as the 7th scoring factor label in the `/dashboard/auto-combo` factor breakdown display — all 7 Auto-Combo scoring factors are now visible.
- **i18n — autoCombo section**: Added 20 new translation keys for the Auto-Combo dashboard (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) to all 30 language files.

## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

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

- **Tiered Quota Scoring (Auto-Combo)**: Added `tierPriority` as a 7th scoring factor — accounts with Ultra/Pro tiers are now preferred over Free tiers when other factors are equal. New optional fields `accountTier` and `quotaResetIntervalSecs` on `ProviderCandidate`. All 4 mode packs updated (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`).
- **Intra-Family Model Fallback (T5)**: When a model is unavailable (404/400/403), OmniRoute now automatically falls back to sibling models from the same family before returning an error (`modelFamilyFallback.ts`).
- **Configurable API Bridge Timeout**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var lets operators tune the proxy timeout (default 30s). Fixes 504 errors on slow upstream responses. (#332)
- **Star History**: Replaced star-history.com widget with starchart.cc (`?variant=adaptive`) in all 30 READMEs — adapts to light/dark theme, real-time updates.

### 🐛 Bug Fixes

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
