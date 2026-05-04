### ✨ New Features

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

### 🐛 Bug Fixes

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

### 📝 Documentation

- **docs(compression):** document RTK+Caveman stacked savings ranges

### 🏆 Release Attribution & Retroactive Credits

- **@payne0420** (PR #1828 / #1839) — Implementation of the **Rate Limit Watchdog** and environment overrides. (This feature was manually backported to v3.7.8, causing the automatic GitHub Release notes to omit the author's credit).
