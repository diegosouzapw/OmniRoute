# Changelog

All notable changes to OmniRoute are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.7.1] — 2026-02-28

### 🐛 Fixed

- **Dashboard Layout Breakage** — Tailwind CSS v4 auto-detection failed to scan Next.js route group directories with parentheses (e.g. `(dashboard)`), causing all responsive grid utilities (`sm:grid-cols-*`, `md:grid-cols-*`, `lg:grid-cols-*`, `xl:grid-cols-*`) to be purged from production CSS. Cards displayed in a single column instead of multi-column grids. Fixed by adding explicit `@source` directives in `globals.css`

---

## [1.7.0] — 2026-02-28

### ✨ New Features

- **16 Pain Points Documentation** — New collapsible section "🎯 What OmniRoute Solves — 16 Real Pain Points" added to the main README and all 29 language-specific READMEs. Each pain point uses `<details>/<summary>` tags for clean, expandable content
- **Configurable User-Agent per Provider** — User-Agent strings for OAuth providers (Claude, Codex, GitHub, Antigravity, Kiro, iFlow, Qwen, Cursor, Gemini CLI) are now configurable via environment variables. Format: `{PROVIDER_ID}_USER_AGENT=custom-value` ([#155](https://github.com/diegosouzapw/OmniRoute/issues/155))

### 🐛 Fixed

- **Hardcoded `$HOME` Path in Standalone/Bun Builds** — 5 files (`backupService.ts`, `mitm/manager.ts`, `mitm/server.ts`, `mitm/cert/generate.ts`, `codex-profiles/route.ts`) were bypassing the centralized `dataPaths.ts` and using `os.homedir()` directly. This caused paths to bake the build machine's `$HOME` into standalone/bun builds, producing `EACCES: permission denied` errors on other machines. All files now use `resolveDataDir()` from `dataPaths.ts`, respecting `DATA_DIR` env var and XDG conventions ([#156](https://github.com/diegosouzapw/OmniRoute/issues/156))

### 📝 Documentation

- **`.env` and `.env.example` Synced** — Added 9 User-Agent env vars with latest known default values to both environment files
- **30 README Translations Updated** — All language READMEs now include the 16 Pain Points section

---

## [1.6.9] — 2026-02-28

### 🐛 Fixed

- **Proxy Port Preservation** — `new URL()` silently strips default ports (80/443); proxy connections now extract the port from the raw URL string before parsing, preventing connection timeouts ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **Proxy Credential Encoding** — URL-encode special characters in proxy username/password; decode during legacy migration ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **HTTPS Proxy Default Port** — Changed from 8080 to 443 in frontend and migration logic ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **Proxy Dispatcher Cache** — Invalidate cached dispatchers when proxy config is updated or deleted ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **Proxy Logger SQLite Type** — Cast `proxyPort` to `Number` for INTEGER column ([PR #161](https://github.com/diegosouzapw/OmniRoute/pull/161))
- **CopilotToolCard URL** — Use `baseUrl` prop directly instead of redundant `window.location.origin`; filter to chat models only (`!m.type && !m.parent`) ([PR #160](https://github.com/diegosouzapw/OmniRoute/pull/160))

---

## [1.6.8] — 2026-02-28

### 🔧 Improved

- **Electron Release Workflow** — Refactored CI to trigger on git tags (`v*`) + manual dispatch, with version validation, artifact upload/download pattern across 3 platforms, and a single release job. Only installer files (`.dmg`, `.exe`, `.AppImage`) are uploaded — no more 5K+ unpacked files ([PR #159](https://github.com/diegosouzapw/OmniRoute/pull/159))
- **Windows Portable Exe** — Added standalone portable `.exe` build alongside the NSIS installer ([PR #159](https://github.com/diegosouzapw/OmniRoute/pull/159))
- **Source Code Archives** — Releases now include `OmniRoute-vX.Y.Z.source.tar.gz` and `.zip` via `git archive` ([PR #159](https://github.com/diegosouzapw/OmniRoute/pull/159))
- **Installation Docs** — Added platform-specific installation instructions with macOS Gatekeeper workaround ([PR #159](https://github.com/diegosouzapw/OmniRoute/pull/159))

### 🐛 Fixed

- **Next.js App Router Conflict** — Added `app/` (production standalone build) to `.gitignore`. This directory was conflicting with Next.js App Router detection in dev mode, causing all routes to return 404
- **Git Tracking** — Added `electron/node_modules/` to `.gitignore`

---

## [1.6.7] — 2026-02-28

### ✨ New Feature

- **GitHub Copilot Configuration Generator** — New tool on the CLI Tools dashboard page. Select models and generate the `chatLanguageModels.json` config block for VS Code GitHub Copilot using the Azure vendor pattern. Features: bulk model selection from `/v1/models` (includes combos/custom), search/filter, configurable tokens/tool-calling/vision, one-click copy, persistent selection via localStorage. Version compatibility warning for VS Code ≥ 1.109 / Copilot Chat ≥ v0.37 ([#142](https://github.com/diegosouzapw/OmniRoute/issues/142))

### 🧹 Housekeeping

- Added `electron/dist-electron/` to `.gitignore` (build artifact)

---

## [1.6.6] — 2026-02-28

### 🔒 Security Fix

- **Auth bypass after onboarding** — Fixed regression where users could access the dashboard without authentication after upgrading from older versions. The "no password" safeguard (for fresh installs) was incorrectly firing after onboarding was complete, allowing unauthenticated access when `setupComplete=true` but the password DB row was missing ([#151](https://github.com/diegosouzapw/OmniRoute/issues/151))

---

## [1.6.5] — 2026-02-28

### 🖥️ Electron Desktop

- **Official app icons** — Added proper platform-specific icons derived from the OmniRoute SVG logo: `.icns` (macOS), `.ico` (Windows), `.png` (Linux), and `tray-icon.png` (32×32) — via PR [#154](https://github.com/diegosouzapw/OmniRoute/pull/154)
- **Automated release workflow** — New GitHub Actions workflow (`electron-release.yml`) builds Electron for Windows/macOS/Linux on every GitHub release publish
- **CI fix** — Changed `npm ci` → `npm install` in the Electron build step since `electron/package-lock.json` is `.gitignored`

### 📖 Documentation

- **Desktop App section** — Added to all 30 README files (9 fully translated: PT-BR, ES, FR, DE, ZH-CN, JA, RU, KO, AR)
- **Electron Fix Plan** — Published detailed code review and fix documentation at `docs/ELECTRON_FIX_PLAN.md`

### 🐛 Issue Triage

- **#151** — Auth bypass after v1.6.3 upgrade — triaged, requesting more info from reporter
- **#142** — Copilot Config Generator — previously triaged, 5 comments

---

## [1.6.4] — 2026-02-28

### 🖥️ Electron Desktop — Code Review Hardening (16 Fixes)

#### 🔴 Critical

- **Server readiness** — Window now waits for server health check before loading URL; no more blank screens on cold start (#1)
- **Restart timeout** — `restart-server` IPC handler now has 5s timeout + `SIGKILL` to prevent indefinite hangs (#2)
- **Port change lifecycle** — `changePort()` now stops and restarts the server on the new port instead of just reloading the URL (#3)

#### 🟡 Important

- **Tray cleanup** — Old `Tray` instance is now destroyed before recreating, preventing duplicate icons and memory leaks (#4)
- **IPC event emission** — Main process now emits `server-status` and `port-changed` events to renderer, making React hooks functional (#5)
- **Listener accumulation** — Preload now returns disposer functions for precise listener cleanup instead of `removeAllListeners` (#6)
- **useIsElectron performance** — Replaced `useState`+`useEffect` with `useSyncExternalStore` to eliminate 5x unnecessary re-renders (#7)

#### 🔵 Minor

- Removed dead `isProduction` variable (#8)
- Platform-conditional `titleBarStyle` — `hiddenInset` only on macOS, `default` on Windows/Linux (#9)
- `stdio: pipe` — Server output captured for logging and readiness detection instead of `inherit` (#10)
- Shared `AppInfo` type — `useElectronAppInfo` now uses the shared interface from `types.d.ts` (#11)
- `useDataDir` error state — Now exposes errors instead of swallowing silently (#12)
- Synced `electron/package.json` version to `1.6.4` (#13)
- Removed dead `omniroute://` protocol config — no handler existed (#14)
- **Content Security Policy** — Added CSP via `session.webRequest.onHeadersReceived` (#15)
- Simplified preload validation — Generic `safeInvoke`/`safeSend`/`safeOn` wrappers reduce boilerplate (#16)

### 🧪 Test Suite Expansion

- **76 tests** across 15 suites (up from 64 tests / 9 suites)
- New: server readiness timeout, restart race condition, CSP directives, platform options, disposer pattern, generic IPC wrappers

---

## [1.6.3] — 2026-02-28

### 🐛 Bug Fixes

- **Database data preservation on upgrade** — Previously, upgrading from older versions (e.g. v1.2.0 → v1.6.x) could cause data loss by renaming the existing database when a legacy `schema_migrations` table was detected. Now checks for actual data before deciding to reset ([#146](https://github.com/diegosouzapw/OmniRoute/issues/146))
- **Hardcoded build-machine paths in npm package** — Next.js standalone output baked absolute paths from the build machine into `server.js` and `required-server-files.json`. On other machines these paths don't exist, causing `ENOENT` errors. The prepublish script now sanitizes all build paths to relative ([#147](https://github.com/diegosouzapw/OmniRoute/issues/147))

---

## [1.6.2] — 2026-02-27

### ✨ New Features

- **Provider labels in Combos** — Combo cards now show user-defined provider names instead of long UUID identifiers, making complex multi-provider combos easier to read ([#121](https://github.com/diegosouzapw/OmniRoute/issues/121))
- **Improved request log labels** — RequestLoggerV2 resolves OpenAI-compatible provider IDs to user-defined names via provider nodes lookup
- **Smarter API key display** — `formatApiKey()` now shows the full key name for named keys instead of truncating them

---

## [1.6.1] — 2026-02-27

### 🐛 Bug Fixes

- **Cross-platform npm install** — Added `postinstall` script to auto-rebuild `better-sqlite3` for the user's OS/architecture. Previously, the npm package shipped Linux x64 binaries that failed on Windows and macOS ([#129](https://github.com/diegosouzapw/OmniRoute/issues/129))

---

## [1.6.0] — 2026-02-27

> ### 🔀 Feature Release — Split-Port Mode
>
> API and Dashboard can now run on separate ports for advanced deployment scenarios (reverse proxies, container networking, network isolation). Community contribution by [@npmSteven](https://github.com/npmSteven) — PR [#140](https://github.com/diegosouzapw/OmniRoute/pull/140).

### ✨ New Features

- **Split-Port Runtime** — Serve dashboard and OpenAI-compatible API on different ports via `API_PORT` and `DASHBOARD_PORT` env vars. Opt-in; single-port mode unchanged ([#140](https://github.com/diegosouzapw/OmniRoute/pull/140))
- **API Bridge Server** — Lightweight HTTP proxy routes only OpenAI-compatible paths (`/v1`, `/chat/completions`, `/responses`, `/models`, `/codex`) on the API port, returns 404 for everything else
- **Centralized Port Resolution** — New `src/lib/runtime/ports.ts` module ensures consistent port config across server, CLI, OAuth, and cloud sync
- **Runtime Wrapper Scripts** — `scripts/run-next.mjs` and `scripts/run-standalone.mjs` for proper env propagation in dev and Docker modes

### 🐛 Bug Fixes & Polish

- Added 30s timeout to API bridge proxy requests to prevent resource exhaustion
- Extracted healthcheck into `scripts/healthcheck.mjs` (replaces duplicated inline code)
- CLI tools page and onboarding derive endpoints from runtime API port
- OAuth server fallback resolves to effective dashboard port
- Cloud sync internal URL follows dashboard port

### 🔒 Security

- API bridge defaults to `127.0.0.1` (not `0.0.0.0`) — network-safe by default
- `API_HOST` env var available for explicit override when needed

### 📦 Dependencies

- Bump `actions/upload-artifact` from 4 to 7 ([#143](https://github.com/diegosouzapw/OmniRoute/pull/143))
- Bump `actions/download-artifact` from 4 to 8 ([#144](https://github.com/diegosouzapw/OmniRoute/pull/144))

### 🧪 Tests

- Added 14 unit tests for `parsePort` and `resolveRuntimePorts`

---

## [1.5.0] — 2026-02-26

> ### 🌍 Massive i18n Expansion — 30 Languages
>
> Dashboard UI, README, and technical documentation now available in 30 languages. CI pipeline hardened with deploy guards.

### ✨ New Features

- **Dashboard i18n — 30 Languages** — Expanded dashboard internationalization from 2 languages (EN, PT-BR) to 30 languages: Arabic, Bulgarian, Danish, German, Spanish, Finnish, French, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Malay, Dutch, Norwegian, Polish, Portuguese (PT), Portuguese (BR), Romanian, Russian, Slovak, Swedish, Thai, Ukrainian, Vietnamese, Chinese (Simplified), Filipino, and English. All 500+ translation keys fully localized with RTL support for Arabic and Hebrew
- **Multi-Language READMEs** — Added 22 new README translations (total: 30 languages), up from the original 8. Each translation includes full project overview, setup guide, feature list, and pricing table
- **Multi-Language Documentation** — New `docs/i18n/` directory with translations of all core technical docs (API Reference, Architecture, Codebase Documentation, Features, Troubleshooting, User Guide) in 30 languages
- **i18n QA Tooling** — Added `scripts/i18n/` with i18n-specific QA and validation scripts
- **GitHub Discussions** — Enabled Discussions on the repository for community support and Q&A (#136)

### 🐛 Bug Fixes

- **Dashboard Responsiveness** — Fixed layout and responsiveness issues in dashboard components; improved i18n error message handling for missing translation keys

### 🔧 CI/CD

- **Deploy VPS Guard** — Added `DEPLOY_ENABLED` environment variable guard to `deploy-vps.yml` workflow, preventing accidental deployments. Removed broken Tailscale SSH step
- **Deleted Broken Workflow** — Removed non-functional `codex-review.yml` workflow that was failing in CI

---

## [1.4.11] — 2026-02-25

> ### 🐛 Settings Persistence Fix
>
> Fixes routing strategy and wildcard aliases not saving after page refresh.

### 🐛 Bug Fixes

- **Routing Strategy Not Saved After Refresh (#134)** — Added `fallbackStrategy`, `wildcardAliases`, and `stickyRoundRobinLimit` to the Zod validation schema. These fields were silently stripped during validation, preventing them from being persisted to the database

### 📝 Notes

- **#135 Closed** — Feature request for proxy configuration (global + per-provider) was already implemented in v1.4.10

---

## [1.4.10] — 2026-02-25

> ### 🔒 Proxy Visibility + Bug Fixes
>
> Color-coded proxy badges, provider-level proxy configuration, CLI tools page fix, and EACCES fix for restricted environments.

### ✨ New Features

- **Color-Coded Proxy Badges** — Each provider connection now shows its proxy status with color-coded badges: 🟢 green (global proxy), 🟡 amber (provider-level proxy), 🔵 blue (per-connection proxy). Badge always displays the proxy IP/host
- **Provider-Level Proxy Button** — New "Provider Proxy" button in the Connections header of each provider detail page. Allows configuring a proxy that applies to all connections of that provider
- **Proxy IP Display** — The proxy badge now always shows the proxy host/IP address for quick identification

### 🐛 Bug Fixes

- **CLI Tools Page Stuck in Loading** — Fixed the `/api/cli-tools/status` endpoint hanging indefinitely when binary checks stall on VPS. Added 5s server-side timeout per tool and 8s client-side AbortController timeout (#cli-tools-hang)
- **EACCES on Restricted Home Directories** — Fixed crash when `~/.omniroute` directory cannot be created due to permission issues. Now gracefully warns and suggests using the `DATA_DIR` environment variable (#133)

---

> ### 🌐 Full Internationalization (i18n) + Multi-Account Fix
>
> Complete dashboard i18n migration with next-intl, supporting English and Portuguese (Brazil). Fixes production build issues and enables multiple Codex accounts from the same workspace.

### ✨ New Features

- **Full Dashboard Internationalization** — Complete i18n migration of 21+ pages and components using `next-intl`. Every dashboard string is now translatable with full EN and PT-BR support. Includes language selector (globe icon) in the header for real-time language switching
- **Portuguese (Brazil) Translation** — Complete `pt-BR.json` translation file with 500+ keys covering all pages: Home, Providers, Settings, Combos, Analytics, Costs, Logs, Health, CLI Tools, Endpoint, API Manager, and Onboarding
- **Language Selector Component** — New `LanguageSelector` component in the header with flag icons and dropdown for switching between 🇺🇸 English and 🇧🇷 Português

### 🐛 Bug Fixes

- **Multiple Codex Accounts from Same Workspace** — Fixed deduplication logic in `createProviderConnection` that prevented adding multiple OpenAI Pro Business accounts from the same Team workspace. Now uses compound check (workspaceId + email) instead of workspaceId-only, allowing separate connections per user
- **Production Build — Crypto Import** — Fixed `instrumentation.ts` using `eval('require')('crypto')` to bypass webpack's static analysis that blocked the Node.js crypto module in the bundled instrumentation file
- **Production Build — Translation Scope** — Fixed sub-components `ProviderOverviewCard` and `ProviderModelsModal` in `HomePageClient.tsx` that referenced parent-scope translation hooks. Each sub-component now has its own `useTranslations()` call
- **Production Build — app/ Directory Conflict** — Resolved Next.js 16 confusing the production `app/` directory (server build output) with the `src/app/` app router directory, which caused "missing root layout" build failures

### 📄 i18n Pages Migrated

Home, Endpoint, API Manager, Providers (list + detail + new), Combos, Logs, Costs, Analytics, Health, CLI Tools, Settings (General, Security, Routing, Session, IP Filter, Compliance, Fallback Chains, Thinking Budget, Policies, Pricing, Resilience, Advanced), Onboarding Wizard, Audit Log, Usage

---

## [1.4.7] — 2026-02-25

> ### 🐛 Bugfix — Antigravity Model Prefix & Version Sync
>
> Fixes model name sent to Antigravity upstream API containing `antigravity/` prefix, causing 400 errors for non-opus models. Also syncs package-lock.json version.

### 🐛 Bug Fixes

- **Antigravity Model Prefix Stripping** — Model names sent to the Antigravity upstream API (Google Cloud Code) now have any `provider/` prefix defensively stripped. Previously, models like `antigravity/gemini-3-flash` were sent with the prefix intact, causing 400 errors from the upstream API. Only `claude-opus-4-6-thinking` worked because its routing path differed. Fix applied in 3 locations: `antigravity.ts` executor, and both `wrapInCloudCodeEnvelope` and `wrapInCloudCodeEnvelopeForClaude` in the translator
- **Package-lock.json Version Sync** — Fixed `package-lock.json` being stuck at `1.4.3` while `package.json` was at `1.4.6`, which prevented npm from publishing the correct version and caused the VPS deploy to stay on the old version

---

## [1.4.6] — 2026-02-25

> ### ✨ Community Release — Security Fix, Multi-Platform Docker, Model Updates & Plus Tier
>
> Enforces API key model restrictions across all endpoints, adds ARM64 Docker support, updates model registry for latest AI models, and introduces Plus tier in ProviderLimits.

### 🔒 Security

- **API Key Model Restrictions Enforced** — `isModelAllowedForKey()` was never called, allowing API keys with `allowedModels` restrictions to access any model. Created centralized `enforceApiKeyPolicy()` middleware and wired it into all `/v1/*` endpoints (chat, embeddings, images, audio, moderations, rerank). Supports exact match, prefix match (`openai/*`), and wildcard patterns ([#130](https://github.com/diegosouzapw/OmniRoute/issues/130), [PR #131](https://github.com/diegosouzapw/OmniRoute/pull/131) by [@ersintarhan](https://github.com/ersintarhan))
- **ApiKeyMetadata Type Safety** — Replaced `any` types with proper `ApiKeyMetadata` interface in the policy middleware. Added error logging in catch blocks for metadata fetch and budget check failures

### ✨ New Features

- **Docker Multi-Platform Builds** — Restructured Docker CI workflow to support both `linux/amd64` and `linux/arm64` using native runners and digest-based manifest merging. ARM64 users (Apple Silicon, AWS Graviton, Raspberry Pi) can now run OmniRoute natively ([PR #127](https://github.com/diegosouzapw/OmniRoute/pull/127) by [@npmSteven](https://github.com/npmSteven))
- **Plus Tier in ProviderLimits** — Added "Plus" as a separate category in the ProviderLimits dashboard, distinguishing Plus/Paid plans from Pro plans with proper ranking and filtering ([PR #126](https://github.com/diegosouzapw/OmniRoute/pull/126) by [@nyatoru](https://github.com/nyatoru))

### 🔧 Improvements

- **Model Registry Updates** — Updated provider registry, usage tracking, CLI tools config, and pricing for latest AI models: added Claude Sonnet 4.6, Gemini 3.1 Pro (High/Low), GPT OSS 120B Medium; removed deprecated Claude 4.5 variants and Gemini 2.5 Flash ([PR #128](https://github.com/diegosouzapw/OmniRoute/pull/128) by [@nyatoru](https://github.com/nyatoru))
- **Model ID Consistency** — Fixed `claude-sonnet-4-6-thinking` → `claude-sonnet-4-6` mismatch in `importantModels` to match the provider registry

---

## [1.4.5] — 2026-02-24

> ### 🐛 Bugfix Release — Claude Code OAuth & OAuth Proxy Routing
>
> Fixes Claude Code OAuth failures on remote deployments and routes all OAuth token exchanges through configured proxy.

### 🐛 Bug Fixes

- **Claude Code OAuth** — Fixed `400 Bad Request` on remote deployments by using Anthropic's registered `redirect_uri` (`https://platform.claude.com/oauth/code/callback`) instead of the dynamic server URL. Added missing OAuth scopes (`user:sessions:claude_code`, `user:mcp_servers`) to match the official Claude CLI. Configurable via `CLAUDE_CODE_REDIRECT_URI` env var ([#124](https://github.com/diegosouzapw/OmniRoute/issues/124))
- **OAuth Token Exchange Through Proxy** — OAuth token exchange during new connection setup now routes through the configured proxy (provider-level → global → direct), fixing `unsupported_country_region_territory` errors for region-restricted providers like OpenAI Codex ([#119](https://github.com/diegosouzapw/OmniRoute/issues/119))

---

## [1.4.4] — 2026-02-24

> ### ✨ Feature Release — Custom Provider Models in /v1/models
>
> Compatible provider models are now saved to the customModels database, making them visible via `/v1/models` for all OpenAI-compatible clients.

### ✨ New Features

- **Custom Provider Model Persistence** — Compatible provider models (manual or imported) are now saved to the `customModels` database so they appear in `/v1/models` listing for clients like Cursor, Cline, Antigravity, and Claude Code ([PR #122](https://github.com/diegosouzapw/OmniRoute/pull/122) by [@nyatoru](https://github.com/nyatoru))
- **Provider Models API** — New `/api/provider-models` endpoint (GET/POST/DELETE) for managing custom model entries with full authentication via `isAuthenticated`
- **Unified Model Deletion** — New `handleDeleteModel` removes models from both alias configuration and `customModels` database, preventing orphaned entries
- **Provider Node Prefix Resolution** — `getModelInfo` refactored to use provider node prefixes for accurate custom provider model resolution

### 🔒 Security

- **Authentication on Provider Models API** — All `/api/provider-models` endpoints require API key or JWT session authentication via shared `isAuthenticated` utility
- **URL Parameter Injection Fix** — Applied `encodeURIComponent` to all user-controlled URL parameters (`providerStorageAlias`, `providerId`) to prevent query string injection attacks
- **Shared Auth Utility** — Authentication logic extracted to `@/shared/utils/apiAuth.ts`, eliminating code duplication across `/api/models/alias` and `/api/provider-models`

### 🔧 Improvements

- **Toast Notifications** — Replaced blocking `alert()` calls with non-blocking `notify.error`/`notify.success` toast notifications matching the project's notification system
- **Transactional Save** — Model persistence is now transactional: database save must succeed before alias creation, preventing inconsistent state
- **Consistent Error Handling** — All model operations (add, import, delete) now provide user-facing error/success feedback via toast notifications
- **ComboFormModal Matching** — Improved provider node matching by ID or prefix for combo model selection

---

## [1.4.3] — 2026-02-23

### 🐛 Bug Fix

- **OAuth LAN Access** — Fixed OAuth flow for remote/LAN IP access (`192.168.x.x`). Previously, LAN IPs incorrectly used popup mode, leading to a broken redirect loop. Now defaults to manual callback URL input mode for non-localhost access

---

## [1.4.2] — 2026-02-23

### 🐛 Bug Fix

- **OAuth Token Refresh** — Fixed `client_secret is missing` error for Google-based OAuth providers (Antigravity, Gemini, Gemini CLI, iFlow). Desktop/CLI OAuth secrets are now hardcoded as defaults since Next.js inlined empty strings at build time.

---

## [1.4.1] — 2026-02-23

### 🔧 Improvements

- **Endpoint Page Cleanup** — Removed redundant API Key Management section from Endpoint page (now fully managed in the dedicated API Manager page)
- **CI/CD** — Added `deploy-vps.yml` workflow for automatic VPS deployment on new releases

---

## [1.4.0] — 2026-02-23

> ### ✨ Feature Release — Dedicated API Key Manager with Model Permissions
>
> Community-contributed API Key Manager page with model-level access control, enhanced with usage statistics, key status indicators, and improved UX.

### ✨ New Features

- **Dedicated API Key Manager** — New `/dashboard/api-manager` page for managing API keys, extracted from the Endpoint page. Includes create, delete, and permissions management with a clean table UI ([PR #118](https://github.com/diegosouzapw/OmniRoute/pull/118) by [@nyatoru](https://github.com/nyatoru))
- **Model-Level API Key Permissions** — Restrict API keys to specific models using `allowed_models` with wildcard pattern support (e.g., `openai/*`). Toggle between "Allow All" and "Restrict" modes with an intuitive provider-grouped model selector
- **API Key Validation Cache** — 3-tier caching layer (validation, metadata, permission) reduces database hits on every request, with automatic cache invalidation on key changes
- **Usage Statistics Per Key** — Each API key shows total request count and last used timestamp, with a stats summary dashboard (total keys, restricted keys, total requests, models available)
- **Key Status Indicators** — Color-coded lock/unlock icons and copy buttons on each key row for quick identification of restricted vs unrestricted keys

### 🔧 Improvements

- **Endpoint Page Simplified** — API key management removed from Endpoint page and replaced with a prominent link to the API Manager
- **Sidebar Navigation** — New "API Manager" entry with `vpn_key` icon in the sidebar
- **Prepared Statements** — API key database operations now use cached prepared statements for better performance
- **Input Validation** — XSS-safe sanitization and regex validation for key names; ID format validation for API calls

---

## [1.3.1] — 2026-02-23

> ### 🐛 Bugfix Release — Proxy Connection Tests & Compatible Provider Display
>
> Fixes provider connection tests bypassing configured proxy and improves compatible provider display in the request logger.

### 🐛 Bug Fixes

- **Connection Tests Now Use Proxy** — Provider connection tests (`Test Connection` button) now route through the configured proxy (key → combo → provider → global → direct), matching the behavior of real API calls. Previously, `fetch()` was called directly, bypassing the proxy entirely ([#119](https://github.com/diegosouzapw/OmniRoute/issues/119))
- **Compatible Provider Display in Logs** — OpenAI/Anthropic compatible providers now show friendly labels (`OAI-COMPAT`, `ANT-COMPAT`) instead of raw UUID-based IDs in the request logger's provider column, dropdown, and quick filters ([#113](https://github.com/diegosouzapw/OmniRoute/issues/113))

### 🧪 Tests

- **Connection Test Unit Tests** — 26 new test cases covering error classification logic, token expiry detection, and provider display label resolution

---

## [1.3.0] — 2026-02-23

> ### ✨ Feature Release — iFlow Fix, Health Check Logs Toggle, Kilocode Models & Model Deduplication
>
> Community-driven release with iFlow HMAC-SHA256 signature support, health check log management, expanded Kilocode model list, and model deduplication on the dashboard.

### ✨ New Features

- **Hide Health Check Logs** — New toggle in Settings → Appearance to suppress verbose `[HealthCheck]` messages from the server console. Uses a 30-second cache to minimize database reads with request coalescing for concurrent calls ([PR #111](https://github.com/diegosouzapw/OmniRoute/pull/111) by [@nyatoru](https://github.com/nyatoru))
- **Kilocode Custom Models Endpoint** — Added `modelsUrl` support in `RegistryEntry` for providers with non-standard model endpoints. Expanded Kilocode model list from 8 to 26 models including Qwen3, GPT-5, Claude 3 Haiku, Gemini 2.5, DeepSeek V3, Llama 4, and more ([PR #115](https://github.com/diegosouzapw/OmniRoute/pull/115) by [@benzntech](https://github.com/benzntech))

### 🐛 Bug Fixes

- **iFlow 406 Error** — Created dedicated `IFlowExecutor` with HMAC-SHA256 signature support (`session-id`, `x-iflow-timestamp`, `x-iflow-signature` headers). The iFlow provider was previously using the default executor which lacked the required signature headers, causing 406 errors ([#114](https://github.com/diegosouzapw/OmniRoute/issues/114))
- **Duplicate Models in Endpoint Lists** — Filtered out parent models (`!m.parent`) from all model categorization and count logic on the Endpoint page. Provider modal lists also exclude duplicates ([PR #112](https://github.com/diegosouzapw/OmniRoute/pull/112) by [@nyatoru](https://github.com/nyatoru))

### 🧪 Tests

- **IFlowExecutor Unit Tests** — 11 new test cases covering HMAC-SHA256 signature generation, header building, URL construction, body passthrough, and executor registry integration

---

## [1.2.0] — 2026-02-22

> ### ✨ Feature Release — Dashboard Session Auth for Models Endpoint
>
> Dashboard users can now access `/v1/models` via their existing session when API key auth is required.

### ✨ New Features

- **JWT Session Auth Fallback** — When `requireAuthForModels` is enabled, the `/v1/models` endpoint now accepts both API key (Bearer token) for external clients **and** the dashboard JWT session cookie (`auth_token`), allowing logged-in dashboard users to view models without needing an explicit API key ([PR #110](https://github.com/diegosouzapw/OmniRoute/pull/110) by [@nyatoru](https://github.com/nyatoru))

### 🔧 Improvements

- **401 instead of 404** — Authentication failures on `/v1/models` now return `401 Unauthorized` with a structured JSON error body (OpenAI-compatible format) instead of a generic `404 Not Found`, improving debuggability for API clients
- **Simplified auth logic** — Refactored the JWT cookie verification to reuse the same pattern as `apiAuth.ts`, removing redundant same-origin detection (~60 lines) since the `sameSite:lax` + `httpOnly` cookie flags already provide equivalent CSRF protection

---

## [1.1.1] — 2026-02-22

> ### 🐛 Bugfix Release — API Key Creation & Codex Team Plan Quotas
>
> Fixes API key creation crash when `API_KEY_SECRET` is not set and adds Code Review rate limit window to Codex quota display.

### 🐛 Bug Fixes

- **API Key Creation** — Added deterministic fallback for `API_KEY_SECRET` to prevent `crypto.createHmac` crash when the environment variable is not configured. Keys created without the secret are insecure (warned at startup) but the application no longer crashes ([#108](https://github.com/diegosouzapw/OmniRoute/issues/108))
- **Codex Code Review Quota** — Added parsing of the third rate limit window (`code_review_rate_limit`) from the ChatGPT usage API, supporting Plus/Pro/Team plan differences. The dashboard now displays all three quota bars: Session (5h), Weekly, and Code Review ([#106](https://github.com/diegosouzapw/OmniRoute/issues/106))

---

## [1.1.0] — 2026-02-21

> ### 🐛 Bugfix Release — OAuth Client Secret and Codex Business Quotas
>
> Fixes missing remote-server OAuth configurations and adds ChatGPT Business account quota monitoring.

### 🐛 Bug Fixes

- **OAuth Client Secret** — Omitted explicitly empty `client_secret` parameters to resolve token exchange connection rejection on remote servers missing environment variables for Antigravity, Gemini and iFlow ([#103](https://github.com/diegosouzapw/OmniRoute/issues/103))
- **Codex Business Quotas** — Automatically fetches the appropriate ChatGPT workspace to unlock the 5-hour Business usage limits directly inside the Quota tab and mapped `BIZ` string variant perfectly ([#101](https://github.com/diegosouzapw/OmniRoute/issues/101))

---

## [1.0.10] — 2026-02-21

> ### 🐛 Bugfix — Multi-Account Support for Qwen
>
> Solves the issue where adding a second Qwen account would overwrite the first one.

### 🐛 Bug Fixes

- **OAuth Accounts** — Extracted user email from the `id_token` using JWT decoding for Qwen and similar providers, allowing multiple accounts of the same provider to be authenticated simultaneously instead of triggering the fallback overwrite logic ([#99](https://github.com/diegosouzapw/OmniRoute/issues/99))

---

## [1.0.9] — 2026-02-21

> ### 🐛 Hotfix — Settings Persistence
>
> Fixes blocked providers and API auth toggle not being saved after page reload.

### 🐛 Bug Fixes

- **Settings Persistence** — Added `requireAuthForModels` (boolean) and `blockedProviders` (string array) to the Zod validation schema, which was silently stripping these fields during PATCH requests, preventing them from being saved to the database

---

## [1.0.8] — 2026-02-21

> ### 🔒 API Security & Windows Support
>
> Adds API Endpoint Protection for `/models`, Windows server startup fixes, and UI improvements.

### ✨ New Features

- **API Endpoint Protection (`/models`)** — New Security Tab settings to optionally require an API key for the `/v1/models` endpoint (returns 404 when unauthorized) and to selectively block specific providers from appearing in the models list ([#100](https://github.com/diegosouzapw/OmniRoute/issues/100), [#96](https://github.com/diegosouzapw/OmniRoute/issues/96))
- **Interactive Provider UI** — Blocked Providers setting features an interactive chip selector with visual badges for all available AI providers

### 🐛 Bug Fixes

- **Windows Server Startup** — Fixed `ERR_INVALID_FILE_URL_PATH` crash on Windows by safely wrapping `import.meta.url` resolution with a fallback to `process.cwd()` for globally installed npm packages ([#98](https://github.com/diegosouzapw/OmniRoute/issues/98))
- **Combo buttons visibility** — Fixed layout overlap and tight spacing for the Quick Action buttons (Clone / Delete / Test) on the Combos page on narrower screens ([#95](https://github.com/diegosouzapw/OmniRoute/issues/95))

---

## [1.0.7] — 2026-02-20

> ### 🐛 Bugfix Release — OpenAI Compatibility, Custom Models & OAuth UX
>
> Fixes three community-reported issues: stream default now follows OpenAI spec, custom OpenAI-compatible providers appear in `/v1/models`, and Google OAuth shows a clear error + tutorial for remote deployments.

### 🐛 Bug Fixes

- **`stream` defaults to `false`** — Aligns with the OpenAI specification which explicitly states `stream` defaults to `false`. Previously OmniRoute defaulted to `true`, causing SSE data to be returned instead of a JSON object, breaking clients like Spacebot, OpenCode, and standard Python/Rust/Go OpenAI SDKs that don't explicitly set `stream: true` ([#89](https://github.com/diegosouzapw/OmniRoute/issues/89))
- **Custom AI providers now appear in `/v1/models`** — OpenAI-compatible custom providers (e.g. FriendLI) whose provider ID wasn't in the built-in alias map were silently excluded from the models list even when active. Fixed by also checking the raw provider ID from the database against active connections ([#90](https://github.com/diegosouzapw/OmniRoute/issues/90))
- **OAuth `redirect_uri_mismatch` — improved UX for remote deployments** — Google OAuth providers (Antigravity, Gemini CLI) now always use `localhost` as redirect URI matching the registered credentials. Remote-access users see a targeted amber warning with a link to the new setup guide. The token exchange error message explains the root cause and guides users to configure their own credentials ([#91](https://github.com/diegosouzapw/OmniRoute/issues/91))

### 📖 Documentation

- **OAuth em Servidor Remoto tutorial** — New README section with step-by-step guide to configure custom Google Cloud OAuth 2.0 credentials for remote/VPS/Docker deployments
- **`.env.example` Google OAuth block** — Added prominent warning block explaining remote credential requirements with direct links to Google Cloud Console

### 📁 Files Modified

| File                                   | Change                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------- |
| `open-sse/handlers/chatCore.ts`        | `stream` defaults to `false` (was `true`) per OpenAI spec                                   |
| `src/app/api/v1/models/route.ts`       | Added raw `providerId` check for custom models active-provider filter                       |
| `src/shared/components/OAuthModal.tsx` | Force `localhost` redirect for Google OAuth; improved `redirect_uri_mismatch` error message |
| `.env.example`                         | Added ⚠️ Google OAuth remote credentials block with step-by-step instructions               |
| `README.md`                            | New "🔐 OAuth em Servidor Remoto" tutorial section                                          |

---

## [1.0.6] — 2026-02-20

> ### ✨ Provider & Combo Toggles — Strict Model Filtering
>
> `/v1/models` now shows only models from providers with active connections. Combos and providers can be toggled on/off directly from the dashboard.

### ✨ New Features

- **Provider toggle on Providers page** — Enable/disable all connections for a provider directly from the main Providers list. Toggle is always visible, no hover needed
- **Combo enable/disable toggle** — Each combo on the Combos page now has a toggle. Disabled combos are excluded from `/v1/models`
- **OAuth private IP support** — Expanded localhost detection to include private/LAN IPs (`192.168.x.x`, `10.x.x.x`, `172.16-31.x.x`) for correct OAuth redirect URIs

### 🐛 Bug Fixes

- **`/v1/models` strict filtering** — Models are now shown only from providers with active, enabled connections. Previously, if no connections existed or all were disabled, all 378+ models were shown as a fallback
- **Disabled provider models hidden** — Toggling off a provider immediately removes its models from `/v1/models`

---

## [1.0.5] — 2026-02-20

> ### 🐛 Hotfix — Model Filtering & Docker DATA_DIR
>
> Filters all model types in `/v1/models` by active providers and fixes Docker data directory mismatch.

### 🐛 Bug Fixes

- **`/v1/models` full filtering** — Embedding, image, rerank, audio, and moderation models are now filtered by active provider connections, matching chat model behavior. Providers like Together AI no longer appear without a configured API key (#88)
- **Docker `DATA_DIR`** — Added `ENV DATA_DIR=/app/data` to Dockerfile and `docker-compose.yml` ensuring the volume mount always matches the app data directory — prevents empty database on container recreation

---

## [1.0.4] — 2026-02-19

> ### 🔧 Provider Filtering, OAuth Proxy Fix & Documentation
>
> Dashboard model filtering by active providers, provider enable/disable visual indicators, OAuth login fix for nginx reverse proxy, and LLM onboarding documentation.

### ✨ Features

- **API Models filtering** — `GET /api/models` now returns only models from active providers; use `?all=true` for all models (#85)
- **Provider disabled indicator** — Provider cards show ⏸ "Disabled" badge with reduced opacity when all connections are inactive (#85)
- **`llm.txt`** — Comprehensive LLM onboarding file with project overview, architecture, flows, and conventions (#84)
- **WhatsApp Community** — Added WhatsApp group link to README badges and Support section

### 🐛 Bug Fixes

- **OAuth behind nginx** — Fixed OAuth login failing when behind a reverse proxy by using `window.location.origin` for redirect URI instead of hardcoded `localhost` (#86)
- **`NEXT_PUBLIC_BASE_URL` for OAuth** — Documented env var usage as redirect URI override for proxy deployments (#86)

### 📁 Files Added

| File      | Purpose                                            |
| --------- | -------------------------------------------------- |
| `llm.txt` | LLM and contributor onboarding (llms.txt standard) |

### 📁 Files Modified

| File                                               | Change                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| `src/app/api/models/route.ts`                      | Filter by active providers, `?all=true` param, `available` field |
| `src/app/(dashboard)/dashboard/providers/page.tsx` | `allDisabled` detection + ⏸ badge + opacity-50 on provider cards |
| `src/shared/components/OAuthModal.tsx`             | Proxy-aware redirect URI using `window.location.origin`          |
| `.env.example`                                     | Documented `NEXT_PUBLIC_BASE_URL` for OAuth behind proxy         |

---

## [1.0.3] — 2026-02-19

> ### 📊 Logs Dashboard & Real-Time Console Viewer
>
> Unified logs interface with real-time console log viewer, file-based logging via console interception, and server initialization improvements.

### ✨ Features

- **Logs Dashboard** — Consolidated 4-tab page at `/dashboard/logs` with Request Logs, Proxy Logs, Audit Logs, and Console tabs
- **Console Log Viewer** — Terminal-style real-time log viewer with color-coded log levels, auto-scroll, search/filtering, level filter, and 5-second polling
- **Console Interceptor** — Monkey-patches `console.log/info/warn/error/debug` at server start to capture all application output as JSON lines to `logs/application/app.log`
- **Log Rotation** — Size-based rotation and retention-based cleanup for log files

### 🔧 Improvements

- **Instrumentation consolidation** — Moved `initAuditLog()`, `cleanupExpiredLogs()`, and console interceptor initialization to Next.js `instrumentation.ts` (runs on both dev and prod server start)
- **Structured Logger file output** — `structuredLogger.ts` now also appends JSON log entries to the log file
- **Pino Logger fix** — Fixed broken mix of pino `transport` targets + manual `createWriteStream`; now uses `pino/file` transport targets exclusively with absolute paths

### 🗂️ Files Added

| File                                                 | Purpose                                                           |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/logs/page.tsx`        | Tabbed Logs Dashboard page                                        |
| `src/app/(dashboard)/dashboard/logs/AuditLogTab.tsx` | Audit log tab component extracted from standalone page            |
| `src/shared/components/ConsoleLogViewer.tsx`         | Terminal-style real-time log viewer                               |
| `src/app/api/logs/console/route.ts`                  | API endpoint to read log file (filters last 1h, level, component) |
| `src/lib/consoleInterceptor.ts`                      | Console method monkey-patching for file capture                   |
| `src/lib/logRotation.ts`                             | Log rotation by size and cleanup by retention days                |

### 🗂️ Files Modified

| File                                    | Change                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| `src/shared/components/Sidebar.tsx`     | Nav: "Request Logs" → "Logs" with `description` icon                            |
| `src/shared/components/Breadcrumbs.tsx` | Added breadcrumb labels for `logs`, `audit-log`, `console`                      |
| `src/instrumentation.ts`                | Added console interceptor + audit log init + expired log cleanup                |
| `src/server-init.ts`                    | Added console interceptor import (backup init)                                  |
| `src/shared/utils/logger.ts`            | Fixed pino file transport using `pino/file` targets                             |
| `src/shared/utils/structuredLogger.ts`  | Added `appendFileSync` file writing + log file config                           |
| `.env.example`                          | Added `LOG_TO_FILE`, `LOG_FILE_PATH`, `LOG_MAX_FILE_SIZE`, `LOG_RETENTION_DAYS` |

### ⚙️ Configuration

New environment variables:

| Variable             | Default                    | Description                   |
| -------------------- | -------------------------- | ----------------------------- |
| `LOG_TO_FILE`        | `true`                     | Enable/disable file logging   |
| `LOG_FILE_PATH`      | `logs/application/app.log` | Log file path                 |
| `LOG_MAX_FILE_SIZE`  | `50M`                      | Max file size before rotation |
| `LOG_RETENTION_DAYS` | `7`                        | Days to retain old log files  |

---

## [1.0.2] — 2026-02-18

> ### 🔒 Security Hardening, Architecture Improvements & UX Polish
>
> Comprehensive audit-driven improvements across security, architecture, testing, and user experience.

### 🛡️ Security (Phase 0)

- **Auth guard** — API route protection via `withAuth` middleware for all dashboard routes
- **CSRF protection** — Token-based CSRF guard for all state-changing API routes
- **Request payload validation** — Zod schemas for provider, combo, key, and settings endpoints
- **Prompt injection guard** — Input sanitization against malicious prompt patterns
- **Body size guard** — Route-specific body size limits with dedicated audio upload threshold
- **Rate limiter** — Per-IP rate limiting with configurable windows and thresholds

### 🏗️ Architecture (Phase 1–2)

- **DI container** — Simple dependency injection container for service registration
- **Policy engine** — Consolidated `PolicyEngine` for routing, security, and rate limiting
- **SQLite migration** — Database migration system with versioned migration runner
- **Graceful shutdown** — Clean server shutdown with connection draining
- **TypeScript fixes** — Resolved all `tsc` errors; removed redundant `@ts-check` directives
- **Pipeline decomposition** — `handleSingleModelChat` decomposed into composable pipeline stages
- **Prompt template versioning** — Version-tracked prompt templates with rollback support
- **Eval scheduling** — Automated evaluation suite scheduling with cron-based runner
- **Plugin architecture** — Extensible plugin system for custom middleware and handlers

### 🧪 Testing & CI (Phase 2)

- **Coverage thresholds** — Jest coverage thresholds enforced in CI (368 tests passing)
- **Proxy pipeline integration tests** — End-to-end tests for the proxy request pipeline
- **CI audit workflow** — npm audit and security scanning in GitHub Actions
- **k6 load tests** — Performance testing with ramping VUs and custom metrics

### ✨ UX & Polish (Phase 3–4)

- **Session management** — Session info card with login time, age, user agent, and logout
- **Focus indicators** — Global `:focus-visible` styles and `--focus-ring` CSS utility
- **Audit log viewer** — Security event audit log with structured data display
- **Dashboard cleanup** — Removed unused files, fixed Quick Start links to Endpoint page
- **Documentation** — Troubleshooting guide, deployment improvements

---

## [1.0.1] — 2026-02-18

> ### 🔧 API Compatibility & SDK Hardening
>
> Response sanitization, role normalization, and structured output improvements for strict OpenAI SDK compatibility and cross-provider robustness.

### 🛡️ Response Sanitization (NEW)

- **Response sanitizer module** — New `responseSanitizer.ts` strips non-standard fields (`x_groq`, `usage_breakdown`, `service_tier`, etc.) from all OpenAI-format provider responses, fixing OpenAI Python SDK v1.83+ Pydantic validation failures that returned raw strings instead of parsed `ChatCompletion` objects
- **Streaming chunk sanitization** — Passthrough streaming mode now sanitizes each SSE chunk in real-time via `sanitizeStreamingChunk()`, ensuring strict `chat.completion.chunk` schema compliance
- **ID/Object/Usage normalization** — Ensures `id`, `object`, `created`, `model`, `choices`, and `usage` fields always exist with correct types
- **Usage field cleanup** — Strips non-standard usage sub-fields, keeps only `prompt_tokens`, `completion_tokens`, `total_tokens`, and OpenAI detail fields

### 🧠 Think Tag Extraction (NEW)

- **`<think>` tag extraction** — Automatically extracts `<think>...</think>` blocks from thinking model responses (DeepSeek R1, Kimi K2 Thinking, etc.) into OpenAI's standard `reasoning_content` field
- **Streaming think-tag stripping** — Real-time `<think>` extraction in passthrough SSE stream, preventing JSON parsing errors in downstream tools
- **Preserves native reasoning** — Providers that already send `reasoning_content` natively (e.g., OpenAI o1) are not overwritten

### 🔄 Role Normalization (NEW)

- **`developer` → `system` conversion** — OpenAI's new `developer` role is automatically converted to `system` for all non-OpenAI providers (Claude, Gemini, Kiro, etc.)
- **`system` → `user` merging** — For models that reject the `system` role (GLM, ERNIE), system messages are intelligently merged into the first user message with clear delimiters
- **Model-aware normalization** — Uses model name prefix matching (`glm-*`, `ernie-*`) for compatibility decisions, avoiding hardcoded provider-level flags

### 📐 Structured Output for Gemini (NEW)

- **`response_format` → Gemini conversion** — OpenAI's `json_schema` structured output is now translated to Gemini's `responseMimeType` + `responseSchema` in the translator pipeline
- **`json_object` support** — `response_format: { type: "json_object" }` maps to Gemini's `application/json` MIME type
- **Schema cleanup** — Automatically removes unsupported JSON Schema keywords (`$schema`, `additionalProperties`) for Gemini compatibility

### 📁 Files Added

| File                                     | Purpose                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| `open-sse/handlers/responseSanitizer.ts` | Response field stripping, think-tag extraction, ID/usage normalization |
| `open-sse/services/roleNormalizer.ts`    | Developer→system, system→user role conversion pipeline                 |

### 📁 Files Modified

| File                                              | Change                                                                          |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `open-sse/handlers/chatCore.ts`                   | Integrated response sanitizer for non-streaming OpenAI responses                |
| `open-sse/utils/stream.ts`                        | Integrated streaming chunk sanitizer + think-tag extraction in passthrough mode |
| `open-sse/translator/index.ts`                    | Integrated role normalizer into the request translation pipeline                |
| `open-sse/translator/request/openai-to-gemini.ts` | Added `response_format` → `responseMimeType`/`responseSchema` conversion        |

---

## [1.0.0] — 2026-02-18

> ### 🎉 First Major Release — OmniRoute 1.0
>
> OmniRoute is an intelligent API gateway that unifies 20+ AI providers behind a single OpenAI-compatible endpoint. This release represents the culmination of the entire development effort — from initial prototype to production-ready platform.

### 🧠 Core Routing & Intelligence

- **Smart 4-tier fallback** — Auto-routing: Subscription → Cheap → Free → Emergency
- **6 routing strategies** — Fill First, Round Robin, Power-of-Two-Choices, Random, Least Used, Cost Optimized
- **Semantic caching** — Auto-cache responses for deduplication with configurable TTL
- **Request idempotency** — Prevent duplicate processing of identical requests
- **Thinking budget validation** — Control reasoning token allocation per request
- **System prompt injection** — Configurable global system prompts for all requests

### 🔌 Providers & Models

- **20+ AI providers** — OpenAI, Claude (Anthropic), Gemini, GitHub Copilot, DeepSeek, Groq, xAI, Mistral, Qwen, iFlow, Kiro, OpenRouter, GLM, MiniMax, Kimi, NVIDIA NIM, and more
- **Multi-account support** — Multiple accounts per provider with automatic rotation
- **OAuth 2.0 (PKCE)** — Automatic token management and refresh for Claude Code, Codex, Gemini CLI, Copilot, Kiro
- **Auto token refresh** — Background refresh with expiry detection and unrecoverable error handling
- **Model import** — Import models from API-compatible passthrough providers
- **OpenAI-compatible validation** — Fallback validation via chat completions for providers without `/models` endpoint
- **TLS fingerprint spoofing** — Browser-like TLS fingerprinting via `wreq-js` to bypass bot detection

### 🔄 Format Translation

- **Multi-format translation** — Seamless OpenAI ↔ Claude ↔ Gemini ↔ OpenAI Responses API conversion
- **Translator Playground** — 4 interactive modes:
  - **Playground** — Test format translations between any provider formats
  - **Chat Tester** — Send real requests through the proxy with visual response rendering
  - **Test Bench** — Automated batch testing across multiple providers
  - **Live Monitor** — Real-time stream of active proxy requests and translations

### 🎯 Combos & Fallback Chains

- **Custom combos** — Create model combinations with multi-provider fallback chains
- **6 combo balancing strategies** — Fill First, Round Robin, Random, Least Used, P2C, Cost Optimized
- **Combo circuit breaker** — Auto-disable failing providers within a combo chain

### 🛡️ Resilience & Security

- **Circuit breakers** — Auto-recovery with configurable thresholds and cooldown periods
- **Exponential backoff** — Progressive retry delays for failed requests
- **Anti-thundering herd** — Mutex-based protection against concurrent retry storms
- **Rate limit detection** — Per-provider RPM, min gap, and max concurrent request tracking
- **Editable rate limits** — Configurable defaults via Settings → Resilience with persistence
- **Prompt injection guard** — Input sanitization for malicious prompt patterns
- **PII redaction** — Automatic detection and masking of personally identifiable information
- **AES-256-GCM encryption** — Credential encryption at rest
- **IP access control** — Whitelist/blacklist IP filtering
- **SOCKS5 proxy support** — Outbound proxy for upstream provider calls

### 📊 Observability & Analytics

- **Analytics dashboard** — Recharts-based SVG charts: stat cards, model usage bar chart, provider breakdown table with success rates and latency
- **Real-time health monitoring** — Provider health, rate limits, latency telemetry
- **Request logs** — Dedicated page with SQLite-persisted proxy request/response logs
- **Limits & Quotas** — Separate dashboard for quota monitoring with reset countdowns
- **Cost analytics** — Token cost tracking and budget management per provider
- **Request telemetry** — Correlation IDs, structured logging, request timing

### 💾 Database & Backup

- **Dual database** — LowDB (JSON) for config + SQLite for domain state and proxy logs
- **Export database** — `GET /api/db-backups/export` — Download SQLite database file
- **Export all** — `GET /api/db-backups/exportAll` — Full backup as `.tar.gz` archive (DB + settings + combos + providers + masked API keys)
- **Import database** — `POST /api/db-backups/import` — Upload and restore with validation, integrity check, and pre-import backup
- **Automatic backups** — Configurable backup schedule with retention
- **Storage health** — Dashboard widget with database size, path, and backup status

### 🖥️ Dashboard & UI

- **Full dashboard** — Provider management, analytics, health monitoring, settings, CLI tools
- **9 dashboard sections** — Providers, Combos, Analytics, Health, Translator, Settings, CLI Tools, Usage, Endpoint
- **Settings restructure** — 6 tabs: Security, Routing, Resilience, AI, System/Storage, Advanced
- **Shared UI component library** — Reusable components (Avatar, Badge, Button, Card, DataTable, Modal, etc.)
- **Dark/Light/System theme** — Persistent theme selection with system preference detection
- **Agent showcase grid** — Visual grid of 10 AI coding agents in README header
- **Provider logos** — Logo assets for all supported agents and providers
- **Red shield badges** — Styled badge icons across all documentation

### ☁️ Deployment & Infrastructure

- **Docker support** — Multi-stage Dockerfile with `base` and `cli` profiles
- **Docker Hub** — `diegosouzapw/omniroute` with `latest` and versioned tags
- **Docker CI/CD** — GitHub Actions auto-build and push on release
- **npm CLI package** — `npx omniroute` with auto-launch
- **npm CI/CD** — GitHub Actions auto-publish to npm on release
- **Akamai VM deployment** — Production deployment on Nanode 1GB with nginx reverse proxy
- **Cloud sync** — Sync configuration across devices via Cloudflare Worker
- **Edge compatibility** — Native `crypto.randomUUID()` for Cloudflare Workers

### 🧪 Testing & Quality

- **100% TypeScript** — Full migration of `src/` (200+ files) and `open-sse/` (94 files) — zero `@ts-ignore`, zero TypeScript errors
- **CI/CD pipeline** — GitHub Actions for lint, build, test, npm publish, Docker publish
- **Unit tests** — 20+ test suites covering domain logic, security, caching, routing
- **E2E tests** — Playwright specs for API, navigation, and responsive behavior
- **LLM evaluations** — Golden set testing framework with 4 match strategies (`exact`, `contains`, `regex`, `custom`)
- **Security tests** — CLI runtime, Docker hardening, cloud sync, and OpenAI compatibility

### 📖 Documentation

- **8 language READMEs** — English, Portuguese (pt-BR), Spanish, Russian, Chinese (zh-CN), German, French, Italian
- **VM Deployment Guide** — Complete guide (VM + Docker + nginx + Cloudflare + security)
- **Features Gallery** — 9 dashboard screenshots with descriptions
- **API Reference** — Full endpoint documentation including backup/export/import
- **User Guide** — Step-by-step setup, configuration, and usage instructions
- **Architecture docs** — System design, component decomposition, ADRs
- **OpenAPI specification** — Machine-readable API documentation
- **Troubleshooting guide** — Common issues and solutions
- **Security policy** — `SECURITY.md` with vulnerability reporting via GitHub Security Advisories
- **Roadmap** — 150+ planned features across 6 categories

### 🔌 API Endpoints

- `/v1/chat/completions` — OpenAI-compatible chat endpoint with format translation
- `/v1/embeddings` — Embedding generation
- `/v1/images/generations` — Image generation
- `/v1/models` — Model listing with provider filtering
- `/v1/rerank` — Re-ranking endpoint
- `/v1/audio/*` — Audio transcription and translation
- `/v1/moderations` — Content moderation
- `/api/db-backups/export` — Database export
- `/api/db-backups/exportAll` — Full archive export
- `/api/db-backups/import` — Database import with validation
- 30+ dashboard API routes for providers, combos, settings, analytics, health, CLI tools

---

[1.6.3]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.6.3
[1.6.2]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.6.2
[1.6.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.6.1
[1.6.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.6.0
[1.5.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.5.0
[1.4.11]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.11
[1.4.10]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.10
[1.4.9]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.9
[1.4.8]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.8
[1.4.7]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.7
[1.4.6]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.6
[1.4.5]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.5
[1.4.4]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.4
[1.4.3]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.3
[1.4.2]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.2
[1.4.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.1
[1.4.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.4.0
[1.3.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.3.1
[1.3.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.3.0
[1.2.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.2.0
[1.1.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.1.1
[1.0.7]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.7
[1.0.6]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.6
[1.0.5]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.5
[1.0.4]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.4
[1.1.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.1.0
[1.0.1]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.1
[1.0.3]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.3
[1.0.2]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.2
[1.0.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.0
