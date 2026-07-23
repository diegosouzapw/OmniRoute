<div align="center">

<img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="820"/>

<br/>

# 🚀 OmniRoute — The Free AI Gateway

<img src="./docs/diagrams/readme-hero.svg" width="100%" alt="OmniRoute — Never stop coding. Every AI tool → 278 providers — 90+ free — through one endpoint. Claude Code, Codex, Cursor, Cline, Copilot & Antigravity into FREE Claude / GPT / Gemini with auto-fallback. RTK + Caveman stacked compression saves 15–95% tokens (~89% avg) — never hit limits. 278 AI providers · 90+ free tiers · ~1.53B free tokens/mo · 19 routing strategies · $0 to start."/>

</div>

<div align="center">

# 💰 ~1.53B Free Tokens / Month

</div>

> Stacking free tiers by hand is painful — dozens of SDKs, dozens of rate limits, and no idea how much you actually have. OmniRoute aggregates the **documented** free tiers of **43 provider pools / 460+ models** into one honest number and shows it live on the dashboard (`/dashboard/free-tiers`).

<img src="./docs/diagrams/free-tier-budget.svg" width="100%" alt="OmniRoute free-tier budget card: ~1.53B free tokens per month steady, up to ~2.15B in the first month with signup credits, from the documented free tiers of 43 provider pools / 460+ models behind one endpoint. Honest pool-deduped math — each shared pool counted once (counting every rate limit 24/7 would read ~10B; not published), 15 providers ToS-flagged so you decide. Budget bar of the countable free pools with per-model grid (Mistral Large 3 1B, GPT-4o mini 150M, Gemini 2.5 Flash 60M … Claude Sonnet 4.5 25K), one-time first-month signup credits (vertex 300M, agentrouter 200M, predibase 25M, together 25M, glm-cn 20M, doubao 15M, ai21 10M, longcat 10M, deepseek 5M, hyperbolic 5M, nscale 5M), plus permanently-free no-token-cap providers (SiliconFlow, Z.AI GLM-Flash, Kilo, OpenCode Zen, baidu …) and a $10 OpenRouter top-up unlocking +24M/mo — surfaced separately so they never inflate the headline. Live used/remaining on /dashboard/free-tiers."/>

> Animated summary of the live `/dashboard/free-tiers` page. Full methodology (pool dedupe, credit tiers, provider terms): **[docs/reference/FREE_TIERS.md](docs/reference/FREE_TIERS.md)**.
>
> <sub>These figures are re-audited every two weeks against the live catalog and **move both ways** — a provider ends a free tier and the number drops; a new one lands and it climbs. We publish what the catalog actually computes, never a rounded-up best case. A CI gate (`check:docs-counts`) fails the build if this headline drifts from the code.</sub>

<div align="center">

<h3>

⭐ Star the repo if OMNIROUTE helped you save money and make your work easier.

</h3>

[![Stars](https://img.shields.io/github/stars/diegosouzapw/OmniRoute?style=social)](https://github.com/diegosouzapw/OmniRoute)
<a href="https://trendshift.io/repositories/23589" target="_blank"><img src="https://trendshift.io/api/badge/repositories/23589" alt="diegosouzapw%2FOmniRoute | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
[![Star History Rank](https://api.star-history.com/badge?repo=diegosouzapw/OmniRoute&theme=dark)](https://www.star-history.com/diegosouzapw/omniroute)

<br/>

### 💬 Join the community

[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/U47eFqAXCn)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/omnirouteOficial)
[![WhatsApp Global](https://img.shields.io/badge/WhatsApp_Global-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
[![WhatsApp Brasil](https://img.shields.io/badge/WhatsApp_Brasil-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/LTSpdFhXTxjH4R6CCNiKWz)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)

**Questions, provider tips, roadmap & support → [Discord](https://discord.gg/U47eFqAXCn) · [Telegram](https://t.me/omnirouteOficial) · WhatsApp [🌍 Global](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) / [🇧🇷 Brasil](https://chat.whatsapp.com/LTSpdFhXTxjH4R6CCNiKWz)**

<br/>

### 🧩 Available

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
![NPM Monthly](https://img.shields.io/npm/dm/omniroute?label=npm/month&color=cb3837&logo=npm)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?label=docker%20pulls&logo=docker&color=2496ED)
![Electron Downloads](https://img.shields.io/github/downloads/diegosouzapw/omniroute/total?style=flat&label=electron%20downloads&logo=electron&color=47848F)

[**🚀 Quick Start**](#-quick-start) • [**🎯 Combos**](#-combos--the-flagship) • [**🌐 Providers**](#-283-ai-providers--90-free) • [**🔌 CLI & MCP**](#-full-cli--a2a--mcp) • [**🗜️ Compression**](#%EF%B8%8F-save-1595-tokens--automatically) • [**🌍 Website**](https://omniroute.online)

[💥 The Promise](#-the-promise) • [🤔 Why](#-why-omniroute) • [🏆 What Sets Apart](#-what-sets-omniroute-apart) • [🤖 Compatible CLIs](#-compatible-clis--coding-agents) • [🖥️ Where It Runs](#%EF%B8%8F-where-omniroute-runs--anywhere) • [🔒 Private](#-private--local-first) • [🎬 In Action](#-omniroute-in-action) • [📸 Screenshots](#-dashboard-screenshots) • [📧 Support](#-support--community)

</div>

<div align="center">
 <b>🌐 In 43 languages</b>
 <table>
  <tr>
    <td align="center"><a href="README.md">🇺🇸</a></td>
    <td align="center"><a href="docs/i18n/pt-BR/README.md">🇧🇷</a></td>
    <td align="center"><a href="docs/i18n/pt/README.md">🇵🇹</a></td>
    <td align="center"><a href="docs/i18n/es/README.md">🇪🇸</a></td>
    <td align="center"><a href="docs/i18n/fr/README.md">🇫🇷</a></td>
    <td align="center"><a href="docs/i18n/it/README.md">🇮🇹</a></td>
    <td align="center"><a href="docs/i18n/de/README.md">🇩🇪</a></td>
    <td align="center"><a href="docs/i18n/nl/README.md">🇳🇱</a></td>
    <td align="center"><a href="docs/i18n/ru/README.md">🇷🇺</a></td>
    <td align="center"><a href="docs/i18n/uk-UA/README.md">🇺🇦</a></td>
    <td align="center"><a href="docs/i18n/pl/README.md">🇵🇱</a></td>
    <td align="center"><a href="docs/i18n/cs/README.md">🇨🇿</a></td>
    <td align="center"><a href="docs/i18n/sk/README.md">🇸🇰</a></td>
    <td align="center"><a href="docs/i18n/ro/README.md">🇷🇴</a></td>
    <td align="center"><a href="docs/i18n/hu/README.md">🇭🇺</a></td>
  </tr>
  <tr>
    <td align="center"><a href="docs/i18n/bg/README.md">🇧🇬</a></td>
    <td align="center"><a href="docs/i18n/da/README.md">🇩🇰</a></td>
    <td align="center"><a href="docs/i18n/fi/README.md">🇫🇮</a></td>
    <td align="center"><a href="docs/i18n/no/README.md">🇳🇴</a></td>
    <td align="center"><a href="docs/i18n/sv/README.md">🇸🇪</a></td>
    <td align="center"><a href="docs/i18n/zh-CN/README.md">🇨🇳</a></td>
    <td align="center"><a href="docs/i18n/zh-TW/README.md">🇹🇼</a></td>
    <td align="center"><a href="docs/i18n/ja/README.md">🇯🇵</a></td>
    <td align="center"><a href="docs/i18n/ko/README.md">🇰🇷</a></td>
    <td align="center"><a href="docs/i18n/th/README.md">🇹🇭</a></td>
    <td align="center"><a href="docs/i18n/vi/README.md">🇻🇳</a></td>
    <td align="center"><a href="docs/i18n/id/README.md">🇮🇩</a></td>
    <td align="center"><a href="docs/i18n/ms/README.md">🇲🇾</a></td>
    <td align="center"><a href="docs/i18n/phi/README.md">🇵🇭</a></td>
  </tr>
  <tr>
    <td align="center"><a href="docs/i18n/in/README.md">🇮🇳</a></td>
    <td align="center"><a href="docs/i18n/hi/README.md">🇮🇳</a></td>
    <td align="center"><a href="docs/i18n/gu/README.md">🇮🇳</a></td>
    <td align="center"><a href="docs/i18n/mr/README.md">🇮🇳</a></td>
    <td align="center"><a href="docs/i18n/ta/README.md">🇮🇳</a></td>
    <td align="center"><a href="docs/i18n/te/README.md">🇮🇳</a></td>
    <td align="center"><a href="docs/i18n/bn/README.md">🇧🇩</a></td>
    <td align="center"><a href="docs/i18n/ur/README.md">🇵🇰</a></td>
    <td align="center"><a href="docs/i18n/fa/README.md">🇮🇷</a></td>
    <td align="center"><a href="docs/i18n/ar/README.md">🇸🇦</a></td>
    <td align="center"><a href="docs/i18n/he/README.md">🇮🇱</a></td>
    <td align="center"><a href="docs/i18n/tr/README.md">🇹🇷</a></td>
    <td align="center"><a href="docs/i18n/az/README.md">🇦🇿</a></td>
    <td align="center"><a href="docs/i18n/sw/README.md">🇹🇿</a></td>
  </tr>
</table>
</div>

<div align="center">

# 🆓 Works the second you install it — no keys, no config

</div>

> **Install → point your tool at the endpoint → it already answers.** OmniRoute ships with keyless free providers (OpenCode Free, Felo) already wired into the `auto` combo, so a **fresh install responds out of the box** — no API key, no signup, no configuration.

```bash
# Fresh install, zero credentials — `auto` already works:
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'
```

- ✅ **`auto` responds immediately** — OmniRoute builds a virtual combo from the built-in keyless free providers and routes to a healthy one, with no setup.
- ➕ **Add more providers anytime** — drop in a Claude / GPT / Gemini key (or any of the 278 providers) from the dashboard and they join the `auto` pool automatically.
- 🎛️ **Build your own free combos** — chain your free tiers with any of the 19 routing strategies so you never run out of quota.

<sub>Prefer a specific free backend? Call it directly, e.g. `oc/…` (OpenCode Free) or `felo/…` (Felo). Then graduate to `auto` and let OmniRoute pick.</sub>

<div align="center">

# 💥 The Promise

</div>

<img src="./docs/diagrams/promise-pillars.svg" width="100%" alt="The Promise — One endpoint. 278 providers. Never stop building — OmniRoute picks the cheapest one that works. Six pillars: Never hit limits (auto-fallback across 278 providers in milliseconds, zero downtime) · Save up to 95% tokens (RTK + Caveman stacked compression cuts 15–95%, ~89% avg on tool-heavy sessions) · $0 to start (90+ free tiers, 40+ free forever — no card needed) · Every tool works (33 coding agents through one config) · One endpoint (OpenAI ↔ Claude ↔ Gemini ↔ Responses API at /v1) · Production-grade (circuit breakers, TLS stealth, MCP 104 tools, A2A, memory, guardrails, evals — 25,000+ tests)."/>

<br/>
<br/>

<div align="center">

# 🤔 Why OmniRoute?

</div>

<img src="./docs/diagrams/why-pain-fix.svg" width="100%" alt="Why OmniRoute — stop juggling 10 dashboards, dead API keys and surprise bills. Ten daily pains vs fixes: quota expiring unused → maximize subscriptions; rate limits mid-coding → 4-tier auto-fallback (Subscription → API → Cheap → Free); tool outputs burning tokens → RTK + Caveman compression (15–95%); expensive APIs → cost-optimized routing; every tool its own setup → one endpoint, one dashboard; AI blocked → 3-level proxy + TLS stealth; dead keys → 3-layer resilience (circuit breakers, key cooldown, model lockout); team sharing one subscription → key pools with fair-share quotas; prompts through someone's cloud → local-first with AES-256-GCM encrypted keys; no spend visibility → live analytics (usage, quota, savings, p95 latency)."/>

<div align="center">

<img src="./docs/diagrams/tier-cascade.svg" width="100%" alt="OmniRoute request flow: your IDE or CLI (Claude Code, Cursor, Cline…) calls one local endpoint (http://localhost:20128/v1); the OmniRoute Smart Router (RTK + Caveman compression, 19 routing strategies, circuit breakers, TLS stealth, MCP, A2A, guardrails) auto-falls back across 4 provider tiers — Tier 1 Subscription (Claude Code, Codex, Copilot), quota out? Tier 2 API Key (DeepSeek, Groq, xAI), budget hit? Tier 3 Cheap (GLM $0.5, MiniMax $0.2), budget hit? Tier 4 Free (Kiro, Qoder, Pollinations) — always on."/>

</div>

<br/>

<div align="center">

# 🎯 Combos — The Flagship

</div>

> A **combo** is a chain of models OmniRoute routes across **automatically**. Quota runs out, a provider fails, or costs spike — the combo silently slides to the next model. **This is what makes OmniRoute unbreakable.** 🛡️

### ⚡ Zero-config — just use `auto`

No combo to create. Set your model to `auto` (or a variant) and OmniRoute builds a virtual combo from your connected providers, scored live:

| Model ID       | What it optimizes for                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`         | 🎯 Balanced default (LKGP — sticks to your last good provider)                                                                                                                         |
| `auto/coding`  | 🧑‍💻 Quality-first weights for code generation                                                                                                                                           |
| `auto/fast`    | ⚡ Lowest latency first                                                                                                                                                                |
| `auto/cheap`   | 💰 Cheapest per token first                                                                                                                                                            |
| `auto/offline` | 🔋 Most quota / rate-limit headroom first                                                                                                                                              |
| `auto/smart`   | 🔭 Quality-first + 10% exploration to discover better models                                                                                                                           |

##

### 🔀 Or build your own — 19 routing strategies

All **19** strategies — mix & match per combo step:

| #   | Strategy            | What it does                                                                                                                                                             |
| --- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `priority`          | First-target ordered list — drain each before the next 🥇                                                                                                                |
| 2   | `fill-first`        | Fill each target's quota fully before moving on                                                                                                                          |
| 3   | `weighted`          | Weighted random by per-target weight                                                                                                                                     |
| 4   | `round-robin`       | Cycle through targets in order                                                                                                                                           |
| 5   | `p2c`               | Power-of-two-choices random load balancing                                                                                                                               |
| 6   | `least-used`        | Pick the target with the lowest current load                                                                                                                             |
| 7   | `random`            | Uniform random pick (deduplicated)                                                                                                                                       |
| 8   | `strict-random`     | Random without de-duplicating repeats 🎲                                                                                                                                 |
| 9   | `cost-optimized`    | Minimize $ per request from live catalog pricing 💸                                                                                                                      |
| 10  | `headroom`          | Pick the target with the most remaining quota                                                                                                                            |
| 11  | `reset-window`      | Prefer the target whose quota window resets soonest                                                                                                                      |
| 12  | `reset-aware`       | Rank by quota reset time — short windows first 📊                                                                                                                        |
| 13  | `context-relay`     | Hand off context across targets for long conversations 🧠                                                                                                                |
| 14  | `context-optimized` | Pick the best fit for the current context size                                                                                                                           |
| 15  | `cache-optimized`   | Pin each reusable prompt prefix to the same account — maximize prompt-cache hits 🎯                                                                                      |
| 16  | `lkgp`              | Last-Known-Good Path — sticky to the last successful target                                                                                                              |
| 17  | `auto`              | 12-factor live scoring across every connection 🤖                                                                                                                        |
| 18  | `fusion`            | Fan out to a panel of models + a judge synthesizes one answer 🧬                                                                                                         |
| 19  | `pipeline`          | Chain steps — each target's output feeds the next one 🔗                                                                                                                 |

<img src="./docs/diagrams/strategies-grid.svg" width="100%" alt="All 19 combo routing strategies animated — one tile per strategy: priority, fill-first, weighted, round-robin, p2c, least-used, random, strict-random, cost-optimized, headroom, reset-window, reset-aware, context-relay, context-optimized, cache-optimized, lkgp, auto, fusion, pipeline. See the table above for what each one does."/>

<sub>The Auto-Combo engine scores every candidate on **12 factors** (health, quota, cost, latency, success rate, freshness…) — see [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md).</sub>

##

### ⚖️ Quota-Share — split one subscription across a team ✨ NEW

> Running several keys against the **same upstream account** (one Codex Pro plan, one Kimi key, one GLM Coding seat)? A burst on one key can burn the whole 5-hour / hourly quota and lock everyone else out. **Quota-Share** distributes a provider's time-based quota **fairly** across the keys in a pool — and it's _work-conserving_, so an idle member's slice is lent out instead of wasted.

| Knob                     | What it controls                                                                                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚖️ **Allocation weight** | each key's slice of the pool — e.g. `50 / 30 / 20`                                                                                                                            |
| 📐 **Dimensions**        | track `%` · requests · tokens · `$`, per **5h / 7d / per-model** window                                                                                                       |
| 🚦 **Policy**            | `hard` (block over share) · `soft` (deprioritize) · `burst` (use idle headroom)                                                                                               |
| 🧱 **Cap**               | absolute ceiling per key, independent of mode                                                                                                                                 |

<img src="./docs/diagrams/pool-fair-share.svg" width="100%" alt="OmniRoute key pool 'team-codex': one Codex Pro account shared by 3 keys over a 5-hour window. alice weight 50 (up to 50% of the shared 5h quota), bob weight 30, ci-bot weight 20. In generous mode (under 50% pool used) idle shares are lent out; once the pool crosses 50% strict mode holds each key to its fair share."/>

<sub>Enforced in the hot path **before** the request leaves OmniRoute, with per-(key, model) caps + session stickiness for prompt-cache integrity (now with a per-combo / global disable toggle). 📖 [Quota Sharing Engine](docs/routing/QUOTA_SHARE.md)</sub>

##

### 🧱 Resilience is built in (3 independent layers)

<img src="./docs/diagrams/resilience-layers.svg" width="100%" alt="OmniRoute resilience — 3 independent self-healing layers, the right layer for the right failure. Layer 1 provider circuit breaker (whole provider): trips only on 408/5xx, thresholds OAuth 3× / API-key 5× / local 2×, resets 60s/30s/15s into a HALF-OPEN probe, lazy recovery; while OPEN the combo reroutes to the next provider. Layer 2 connection cooldown (one key/account): base 5s OAuth / 3s API-key, exponential ×2 backoff with anti-thundering-herd guard, 429 honors Retry-After, success clears all error state; one cooling key is skipped while sibling keys keep serving. Layer 3 model lockout (one model): per-model 429, local 404 or mode denials lock just that model — never the whole connection. Terminal states (banned, expired, credits exhausted) are for the operator, not cooldowns."/>

<sub>📖 [Auto-Combo Engine](docs/routing/AUTO-COMBO.md) · [Resilience Guide](docs/architecture/RESILIENCE_GUIDE.md)</sub>

<br/>

<div align="center">

# 🏆 What Sets OmniRoute Apart

</div>

| Feature                                | OmniRoute                              | Other routers |
| -------------------------------------- | -------------------------------------- | ------------- |
| 🌐 Providers                           | **278**                                | 20–100        |
| 🆓 Free providers                      | **90+ (40+ free forever)**             | 1–5           |
| 🔀 Routing strategies                  | **19** strategies                      | 1–3           |
| 🗜️ Token compression                   | **RTK + Caveman stacked (15–95%)**     | None / 20–40% |
| 🧰 Built-in MCP server                 | **104 tools, 3 transports, 31 scopes** | Rare          |
| 🤝 A2A agent protocol                  | **6 skills, JSON-RPC 2.0**             | None          |
| 🧠 Memory (FTS5 + vector)              | **Yes**                                | Rare          |
| 🛡️ Guardrails (PII, injection, vision) | **Yes**                                | Rare          |
| ☁️ Cloud agents                        | **Codex, Cursor, Devin, Jules**        | None          |
| 🥷 TLS fingerprint stealth             | **JA3/JA4 via wreq-js**                | None          |
| 🖥️ Multi-platform                      | **Web · Desktop · Termux · PWA**       | Web only      |
| 🌍 i18n                                | **43 locales**                         | 0–4           |

<sub>📊 Detailed comparison vs LiteLLM, OpenRouter & Portkey → [`docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md`](docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md)</sub>

<br/>

<div align="center">

# ✨ What's New

</div>

> Recent highlights from **v3.8.20 → v3.8.49**. Full history in [`CHANGELOG.md`](CHANGELOG.md).

- **🗜️ Compression hardening** — default-on inflation guard, Caveman packs for DE / FR / JA + Chinese (wényán), RTK filters for Gradle & .NET. → [Compression](docs/compression/COMPRESSION_ENGINES.md)
- **💸 Honest flat-rate cost** — subscription / coding-plan providers read **$0** in cost analytics; budget, quota & routing keep estimating. → [API Reference](docs/reference/API_REFERENCE.md)
- **⚖️ Quota-Share routing** — split a shared account's quota fairly across pooled keys, work-conserving so idle slices are lent out. → [Resilience Guide](docs/architecture/RESILIENCE_GUIDE.md)
- **🤖 One-command CLI/agent setup** — `setup-*` configures 12+ coding tools; `omniroute launch` / `launch-codex` are zero-config. → [CLI Integrations](docs/guides/CLI-INTEGRATIONS.md)
- **🛰️ Remote mode** — drive a remote OmniRoute with scoped tokens (`connect` / `contexts` / `tokens`) + an `antigravity` OAuth helper for VPS installs. → [Remote Mode](docs/guides/REMOTE-MODE.md)
- **🧭 Smarter auto-routing** — `auto/<category>:<tier>` combos, **Fusion** (model panel + judge), task-aware routing, per-request model / mode / USD-budget overrides. → [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **🗜️ Pluggable compression** — 12 composable engines + Compression Studios: LLMLingua-2, two-tier Ultra, omniglyph, per-step fidelity gate, GCF v3.2, drag-reorder editor. → [Compression](docs/compression/COMPRESSION_ENGINES.md)
- **🕵️ Transparent MITM decrypt (TPROXY)** — capture CLIs that ignore proxy env vars, with a per-SNI CA + trust-store installer. → [MITM/TPROXY](docs/security/MITM-TPROXY-DECRYPT.md)
- **💸 Cost telemetry everywhere** — `X-OmniRoute-*` cost/usage headers on every endpoint, cache-HIT savings header, per-key USD spend quotas. → [API Reference](docs/reference/API_REFERENCE.md)
- **🧠 Memory you control** — off by default, opt-in int8 vector quantization + typed decay, per-request `x-omniroute-no-memory`. → [Memory](docs/frameworks/MEMORY.md)
- **🛡️ Security** — prompt-injection guard on every LLM route (red-team suite) + free DuckDuckGo last-resort web search. → [Guardrails](docs/security/GUARDRAILS.md)
- **🖼️ New endpoints** — `/v1/ocr` (Mistral OCR) and `/v1/audio/translations` (Whisper-style) round out the media surface. → [API Reference](docs/reference/API_REFERENCE.md)
- **🌍 Deployment & ops** — reverse-proxy `basePath`, browser-language auto-detect, per-key device tracking, root-less MITM trust, zh-TW localization. → [Environment](docs/reference/ENVIRONMENT.md)
- **🤝 More providers & agents** — Cursor Cloud Agent, Grok Build (xAI), Ollama first-class card, Claude Sonnet 5, Zed, Requesty, SenseNova, Yuanbao… and a refreshed 250-provider catalog. → [Providers](docs/reference/PROVIDER_REFERENCE.md)
- **⚡ Local performance & infra** — one-click local Redis, Cloudflare Workers / Deno Deploy relay deployers, Bifrost & Mux as supervised embedded services. → [Embedded Services](docs/frameworks/EMBEDDED-SERVICES.md)

<br/>

<div align="center">

# 🤖 Compatible CLIs & Coding Agents

> One config — `http://localhost:20128/v1` — and **every** AI IDE or CLI runs on free & low-cost models.

<div align="center">
<table>
  <tr>
    <td align="center" width="76"><a href="https://github.com/anthropics/claude-code"><img src="./public/providers/claude.svg" width="40" alt="Claude Code"/><br/><sub><b>Claude Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><a href="https://github.com/openai/codex"><img src="./public/providers/codex.svg" width="40" alt="Codex CLI"/><br/><sub><b>Codex CLI</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/cline.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cline.svg" width="40" alt="Cline"/></picture><br/><sub><b>Cline</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://github.com/Kilo-Org/kilocode"><img src="./public/providers/kilocode.svg" width="40" alt="Kilo Code"/><br/><sub><b>Kilo Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/roocode.png#gh-dark-mode-only" width="40" alt="Roo Code"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/roocode.svg#gh-light-mode-only" width="40" alt="Roo Code"/><br/><sub><b>Roo Code</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/continue.svg" width="40" alt="Continue"/><br/><sub><b>Continue</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Aider"/><br/><sub><b>Aider</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="ForgeCode"/><br/><sub><b>ForgeCode</b></sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="jcode"/><br/><sub><b>jcode</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/deepseek.svg" width="40" alt="DeepSeek TUI"/><br/><sub><b>DeepSeek TUI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="CodeWhale"/><br/><sub><b>CodeWhale</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://github.com/anomalyco/opencode"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/opencode.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/opencode.svg" width="40" alt="OpenCode"/></picture><br/><sub><b>OpenCode</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><img src="./public/providers/droid.svg" width="40" alt="Factory Droid"/><br/><sub><b>Factory Droid</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/copilot.svg" width="40" alt="GitHub Copilot CLI"/><br/><sub><b>Copilot CLI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cursor.svg" width="40" alt="Cursor CLI"/><br/><sub><b>Cursor CLI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Smelt"/><br/><sub><b>Smelt</b></sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Pi (pi-coding-agent)"/><br/><sub><b>Pi</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/grok.svg" width="40" alt="Grok Build (xAI)"/><br/><sub><b>Grok Build</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/nousresearch.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/nousresearch.svg" width="40" alt="Hermes Agent (Nous Research)"/></picture><br/><sub><b>Hermes Agent</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/openclaw.svg" width="40" alt="OpenClaw"/><br/><sub><b>OpenClaw</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/goose.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/goose.svg" width="40" alt="Goose"/></picture><br/><sub><b>Goose</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Open Interpreter"/><br/><sub><b>Open Interpreter</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Warp AI"/><br/><sub><b>Warp AI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Agent Deck"/><br/><sub><b>Agent Deck</b></sub><br/><sub>                           </sub></td>
  </tr>
</table>
</div>

<div align="center">
<b>＋ also works with</b> · Kiro · Command Code · Antigravity · Windsurf · AMP · <b>any OpenAI-compatible tool</b>
</div>

<sub>📖 Per-tool setup for all 33 tools (25 CLI Code's + 8 CLI Agents) → [`docs/reference/CLI-TOOLS.md`](docs/reference/CLI-TOOLS.md) · 🧩 OpenCode plugin → [`@omniroute/opencode-provider`](https://www.npmjs.com/package/@omniroute/opencode-provider)</sub>

</div>

<br/>

<div align="center">

# 🌐 283 AI Providers — 90+ Free

</div>

> The most complete catalog of any open-source router: **283 providers**, **90+ with a free tier**, **40+ free forever**.

<div align="center">

### 🏢 Every major lab — through one endpoint

<table>
  <tr>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/openai.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/openai.svg" width="40" alt="OpenAI"/></picture><br/><sub>OpenAI</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/claude-color.svg" width="40" alt="Anthropic"/><br/><sub>Anthropic</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/gemini-color.svg" width="40" alt="Gemini"/><br/><sub>Gemini</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/grok.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/grok.svg" width="40" alt="xAI Grok"/></picture><br/><sub>xAI Grok</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/deepseek-color.svg" width="40" alt="DeepSeek"/><br/><sub>DeepSeek</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/mistral-color.svg" width="40" alt="Mistral"/><br/><sub>Mistral</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qwen-color.svg" width="40" alt="Qwen"/><br/><sub>Qwen</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/meta-color.svg" width="40" alt="Meta Llama"/><br/><sub>Meta Llama</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/groq.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/groq.svg" width="40" alt="Groq"/></picture><br/><sub>Groq</sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/nvidia-color.svg" width="40" alt="NVIDIA"/><br/><sub>NVIDIA</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/minimax-color.svg" width="40" alt="MiniMax"/><br/><sub>MiniMax</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cohere-color.svg" width="40" alt="Cohere"/><br/><sub>Cohere</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/perplexity-color.svg" width="40" alt="Perplexity"/><br/><sub>Perplexity</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/huggingface-color.svg" width="40" alt="Hugging Face"/><br/><sub>HuggingFace</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/together-color.svg" width="40" alt="Together"/><br/><sub>Together</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/fireworks-color.svg" width="40" alt="Fireworks"/><br/><sub>Fireworks</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cloudflare-color.svg" width="40" alt="Cloudflare"/><br/><sub>Cloudflare</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/baidu-color.svg" width="40" alt="Baidu"/><br/><sub>Baidu</sub><br/><sub>                           </sub></td>
  </tr>
</table>

<sub>…and 220+ more — every icon resolves live from the dashboard's provider catalog. 📖 [Provider Reference](docs/reference/PROVIDER_REFERENCE.md)</sub>

<br/>

### 🆓 Free Forever — $0, no card

<table>
  <tr>
    <td align="center" width="104"><img src="./public/providers/agentrouter.png" width="44" alt="AgentRouter"/><br/><b>AgentRouter</b><br/><sub>GPT-5, Claude, Gemini<br/>$100 free credits</sub><br/><sub>                                     </sub></td>
    <td align="center" width="104"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qoder-color.svg" width="44" alt="Qoder AI"/><br/><b>Qoder AI</b><br/><sub>Kimi-K2, DeepSeek-R1<br/>Unlimited FREE</sub><br/><sub>                                     </sub></td>
    <td align="center" width="104"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/pollinations.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/pollinations.svg" width="44" alt="Pollinations"/></picture><br/><b>Pollinations</b><br/><sub>GPT-5, Claude, Llama 4<br/>No key needed</sub><br/><sub>                                     </sub></td>
    <td align="center" width="104"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/longcat-color.svg" width="44" alt="LongCat"/><br/><b>LongCat</b><br/><sub>LongCat-2.0<br/>10M tokens one-time (KYC) 🔑</sub><br/><sub>                                     </sub></td>
    <td align="center" width="104"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cloudflare-color.svg" width="44" alt="Cloudflare AI"/><br/><b>Cloudflare AI</b><br/><sub>50+ models<br/>10K neurons/day</sub><br/><sub>                                     </sub></td>
    <td align="center" width="104"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/nvidia-color.svg" width="44" alt="NVIDIA NIM"/><br/><b>NVIDIA NIM</b><br/><sub>129 models<br/>~40 RPM free</sub><br/><sub>                                     </sub></td>
    <td align="center" width="104"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cerebras-color.svg" width="44" alt="Cerebras"/><br/><b>Cerebras</b><br/><sub>Qwen3 235B<br/>1M tokens/day</sub><br/><sub>                                     </sub></td>
  </tr>
</table>

📖 Full machine-readable catalog → [`docs/reference/PROVIDER_REFERENCE.md`](docs/reference/PROVIDER_REFERENCE.md)

<br/>
</div>

<div align="center">

# 🖥️ Where OmniRoute Runs — Anywhere

</div>

> Same app, your machine, your rules. From a global npm install to **your phone** via Termux.

| Platform                  | Install                                  | Highlights                                                |
| ------------------------- | ---------------------------------------- | --------------------------------------------------------- |
| 📦 **npm (global)**       | `npm install -g omniroute`               | One command, any OS                                       |
| 🐳 **Docker**             | `docker run … diegosouzapw/omniroute`    | Multi-arch **AMD64 + ARM64**                              |
| 🖥️ **Desktop (Electron)** | `npm run electron:build`                 | Native window + system tray — **Windows / macOS / Linux** |
| 💪 **ARM**                | native `arm64`                           | Raspberry Pi, ARM servers, Apple Silicon                  |
| 📱 **Android (Termux)**   | `pkg install nodejs && npx -y omniroute` | Runs **on your phone**, 24/7, no root                     |
| 📲 **PWA**                | "Add to Home Screen"                     | Fullscreen, offline, installable from browser             |
| 🧩 **OpenCode plugin**    | `@omniroute/opencode-provider`           | Native OpenCode integration                               |
| 🛠️ **From source**        | `npm install && npm run dev`             | Hack on it, contribute                                    |

<sub>📖 [Docker Guide](docs/guides/DOCKER_GUIDE.md) · [Desktop](electron/README.md) · [Termux](docs/guides/TERMUX_GUIDE.md) · [PWA](docs/guides/PWA_GUIDE.md) · [OpenCode](docs/frameworks/OPENCODE.md)</sub>

<br/>

<div align="center">

# 🔒 Private & Local-First

</div>

<img src="./docs/diagrams/privacy-local.svg" width="100%" alt="Private and local-first — your keys, your machine, your data; OmniRoute is a local proxy that never phones home. Eleven guarantees: runs 100% on your hardware (0 cloud hops), zero telemetry by default, credentials encrypted at rest (AES-256-GCM), no account or sign-up, hardened gateway (API-key scoping, IP filtering, rate limits, prompt-injection guard), loopback-only process routes, upstream header scrubbing, strictly opt-in PII redaction, sanitized errors that never leak internals, a local audit trail in your own SQLite, and MIT-licensed fully open-source code."/>

<sub>📖 [Authorization](docs/architecture/AUTHZ_GUIDE.md) · [Guardrails](docs/security/GUARDRAILS.md) · [Compliance](docs/security/COMPLIANCE.md)</sub>

<br/>

<div align="center">

# 🔌 Full CLI + A2A & MCP

</div>

> Beyond the server, OmniRoute is a **full command-line cockpit** with **80+ commands**, plus open agent protocols so an AI agent can drive it **on its own**.

### ⌨️ A real CLI (not just `start`)

```bash
omniroute               # serve gateway + dashboard (port 20128)
omniroute chat          # interactive TUI chat client (slash: /model /combo /skill /memory)
omniroute setup         # guided first-run wizard
omniroute doctor        # diagnose providers, ports, native deps
```

### 🛰️ Remote mode — run the CLI here, OmniRoute on a VPS

OmniRoute on a server? Drive it from your laptop with the **same CLI**. Log in once
with a scoped access token; every command then targets the remote.

```bash
omniroute connect 192.168.0.15            # password → scoped token, saved as a context
omniroute models list                     # ← runs against the REMOTE server
omniroute configure codex                 # ← picks a remote model, writes a local Codex profile
omniroute tokens create --name ci --scope read   # mint narrower tokens for other machines
omniroute contexts use default            # ← switch back to the local server
```

Tokens are scoped `read` / `write` / `admin`; process-spawning routes stay loopback-only.
<sub>📖 [Remote Mode](docs/guides/REMOTE-MODE.md)</sub>

<div align="center">

<img src="./docs/diagrams/cli-terminal.svg" width="100%" alt="Animated terminal demoing the OmniRoute CLI — omniroute providers list, omniroute combo list, omniroute health — cycling over the 80+ command surface: providers · oauth · keys · combo · nodes · models · cache · compression · cost · usage · quota · health · resilience · telemetry · logs · audit · mcp · a2a · cloud · memory · skills · eval · tunnel · backup · sync · webhooks · policy · pricing · translator · simulate …"/>

</div>

### 🤝 Connect an agent — and it controls OmniRoute itself

Expose OmniRoute over **MCP** or **A2A** and any capable agent gets the keys to the whole gateway — routing, providers, combos, cache, compression, memory — autonomously. HTTP endpoints below are served under `http://localhost:20128`.

| Protocol           | Endpoint                  | Use it for                                              |
| ------------------ | ------------------------- | ------------------------------------------------------- |
| 🧰 **MCP (stdio)** | `omniroute --mcp`         | Plug into Claude Desktop, Cursor, any MCP client        |
| 🌊 **MCP (HTTP)**  | `/api/mcp/stream`         | Remote MCP — **104 tools**, 31 scopes, full audit trail |
| 📡 **MCP (SSE)**   | `/api/mcp/sse`            | Streaming MCP transport                                 |
| 🤝 **A2A**         | `/.well-known/agent.json` | Agent-to-agent, **JSON-RPC 2.0** + SSE, 6 skills        |

```bash
# Give Claude Code the full OmniRoute toolset over MCP:
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

<sub>📖 [MCP Server](docs/frameworks/MCP-SERVER.md) · [A2A Server](docs/frameworks/A2A-SERVER.md) · [Agent Protocols](docs/frameworks/AGENT_PROTOCOLS_GUIDE.md)</sub>

<br/>

<div align="center">

# 🗜️ Save 15–95% Tokens — Automatically

</div>

> **Why use many tokens when few tokens do the trick?** Every request passes through OmniRoute's compression pipeline **transparently** — no client changes. It's now a **stack of 12 composable engines** that run in order and mix & match per routing combo — building on ideas from [RTK](https://github.com/rtk-ai/rtk), [Caveman](https://github.com/JuliusBrussee/caveman) (⭐ 90K+), [LLMLingua-2](https://github.com/microsoft/LLMLingua), and [Troglodita](https://github.com/leninejunior/troglodita) (PT-BR).

### 🧱 The 12-engine stack

Engines run in pipeline order; each is independently toggleable and configurable per combo:

| #   | Engine                    | What it does                                                                                              |
| --- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1   | **Session-Dedup**         | Drops content repeated across turns (content-addressed, cross-turn)                                       |
| 2   | **CCR**                   | Archives large blocks behind retrieve markers, fetched on demand                                          |
| 3   | **Lite**                  | Whitespace + image-URL trimming (latency-light baseline)                                                  |
| 4   | **RTK**                   | Smart tool-result filtering, dedup & truncation (command-aware)                                           |
| 5   | **Responses Tool Output** | Lossless-first JSON + bounded diagnostic compression for shell/patch/search/build outputs (Responses API) |
| 6   | **Headroom**              | Lossless tabular compaction of JSON arrays (~30%) via a vendored **GCF** codec                            |
| 7   | **Relevance**             | Extractive sentence scoring against the last user query                                                   |
| 8   | **Caveman**               | Rule-based prose compression (~65–75% on output)                                                          |
| 9   | **Aggressive**            | Summarization + progressive aging of old turns                                                            |
| 10  | **LLMLingua-2**           | ML semantic pruning via MobileBERT ONNX — code-safe, async                                                |
| 11  | **Ultra**                 | Heuristic token pruning with an optional small-model (SLM) tier                                           |
| 12  | **OmniGlyph**             | Experimental context-as-image encoding routed to Claude Fable 5 (most aggressive; opt-in)                 |

Code blocks, URLs and structured data are **always preserved** byte-perfect. **One-click presets** combine the engines:

| Mode                           | Savings    | Best for                                                                                                                                        |
| ------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 🪶 **Lite**                    | ~15%       | Always-on safe default                                                                                                                          |
| 🪨 **Standard (Caveman)**      | ~30%       | Daily coding                                                                                                                                    |
| ⚡ **Aggressive**              | ~50%       | Long tool-heavy sessions                                                                                                                        |
| 🔥 **Ultra**                   | ~75%       | Maximum savings                                                                                                                                 |
| 🧰 **RTK**                     | 60–90%     | Shell/test/build/git output                                                                                                                     |
| 🔗 **Stacked (RTK → Caveman)** | **78–95%** | Mixed prompts + tool logs                                                                                                                       |

**Real example — Standard mode:**

> **Before (69 tokens):** _"The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time, which triggers a re-render. I would recommend using useMemo to memoize the object."_
>
> **After (19 tokens):** _"New object ref each render. Inline object prop = new ref = re-render. Wrap in useMemo."_
>
> **Same answer. 72% fewer tokens. Zero accuracy loss.** ✅

**PT-BR example — [Troglodita](https://github.com/leninejunior/troglodita) mode:**

> **Antes (42 tokens):** _"O problema é que o componente está re-renderizando porque uma nova referência de objeto está sendo criada em cada ciclo de renderização. Eu recomendaria usar useMemo."_
>
> **Depois (12 tokens):** _"Re-render: ref nova cada ciclo (objeto inline recriado). Usar `useMemo`."_
>
> **Mesma resposta. ~70% menos tokens. Precisão técnica intacta.** ✅

<br/>

### 📖 How it works — pipeline, architecture & savings math

<img src="./docs/diagrams/compression-pipeline.svg" width="100%" alt="OmniRoute compression pipeline: a client request of 10,000 tokens passes through 12 stacked engines — Session-Dedup, CCR, Lite, RTK, Responses Tool Output, Headroom, Relevance, Caveman, Aggressive, LLMLingua-2, Ultra, OmniGlyph — and reaches the provider at about 1,080 tokens, up to 95% saved. Code, URLs and JSON are always preserved byte-perfect."/>

Default stacked combo runs `RTK → Caveman`. When both act on the same tool/context payload, savings compound:

```txt
combined = 1 − (1 − RTK) × (1 − Caveman_input)
average  = 1 − (1 − 0.80) × (1 − 0.46) = 89.2%
range    = 78.4 – 94.6%
```

Code blocks, URLs, JSON and structured data are **always protected** by the preservation engine.

### 🎚️ Beyond the engines — output styles, the adaptive dial & per-request control

The 12 engines above shrink what goes **in**. Three more layers shape **how**, **when**, and what comes **out**:

- **🪄 Output Styles** _(output-axis steering)_ — inject deterministic, cache-safe response-shaping instructions; combinable, each at `lite` / `full` / `ultra` intensity. Adding a style is a one-line registry entry:
  - **Terse prose** — drop filler / articles / hedging; keep technical substance exact.
  - **Less code** — "lazy senior dev" YAGNI: smallest working change, no unrequested scaffolding.
  - **Terse CJK (文言)** — classical-Chinese ultra-terse style (locale-gated to `zh`).
- **🎯 Adaptive context-budget** _(the dial)_ — instead of one on/off token threshold, escalate the cheapest, most-lossless engines only as far as needed to **fit the model's context window**. Policy: `reserve-output` (default, model-aware) · `percentage` · `absolute`. Mode: `floor` (guarantee fit) · `replace-autotrigger` (your explicit choice wins) · `off` (legacy threshold).
- **🎛️ Where compression is decided** _(precedence, high → low)_ — per-request `x-omniroute-compression` header › routing-combo override › active named profile › adaptive / auto-trigger › panel default › off. The applied plan echoes back in the `X-OmniRoute-Compression: <mode>; source=<source>` response header.

Auto-trigger by token threshold, flip on the adaptive dial, pin a named profile, set a one-off per request, or assign a pipeline per routing combo — whichever fits the workload. An opt-in offline **eval harness** (`npm run eval:compression`) scores fidelity vs. savings on a pinned corpus before you promote a change.

📖 [`COMPRESSION_GUIDE.md`](docs/compression/COMPRESSION_GUIDE.md) · [`RTK_COMPRESSION.md`](docs/compression/RTK_COMPRESSION.md) · [`COMPRESSION_ENGINES.md`](docs/compression/COMPRESSION_ENGINES.md)

<br/>

<div align="center">

# ⚡ Quick Start

</div>

**1) Install & run**

```bash
npm install -g omniroute
omniroute
```

> 💡 See `npm warn ERESOLVE` or peer-dep warnings? [They're harmless](docs/getting-started/TROUBLESHOOTING.md#npm-install-warnings-eresolve--peer--deprecated).

Dashboard at `http://localhost:20128` · API at `http://localhost:20128/v1`.

**2) Connect a FREE provider (no signup)**

Dashboard → **Providers** → connect **Kiro AI** (free Claude, ~50 credits/month per account) or **OpenCode Free** (no auth) → done.

**3) Point your coding tool**

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Dashboard → Endpoints]
Model:    auto            (zero-config smart routing — or any provider/model)
```

**4) Verify it's working**

```bash
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

You should see your connected models listed. 🎉 That's it — start coding, and OmniRoute auto-routes & falls back for you.

If your client cannot send custom headers, OmniRoute also exposes tokenized compatibility aliases:

```txt
OpenAI catalog:   http://localhost:20128/vscode/YOUR_KEY/
OpenAI models:    http://localhost:20128/vscode/YOUR_KEY/models
OpenAI chat:      http://localhost:20128/vscode/YOUR_KEY/chat/completions
OpenAI responses: http://localhost:20128/vscode/YOUR_KEY/responses
Ollama chat:      http://localhost:20128/vscode/YOUR_KEY/api/chat
Ollama tags:      http://localhost:20128/vscode/YOUR_KEY/api/tags
```

Use these only for clients that cannot attach `Authorization: Bearer ...`. Header auth remains the preferred mode.

<br/>

## 📦 More install methods — Docker, source, pnpm, Arch

**🐳 Docker**

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

**🛠️ From source**

```bash
cp .env.example .env && npm install
PORT=20128 npm run dev
```

**📦 pnpm**

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core && omniroute
```

**🐧 Arch Linux (AUR)**

```bash
yay -S omniroute-bin && systemctl --user enable --now omniroute.service
```

**🔧 Nix (Flake)**

```bash
# Using Nix flakes
nix develop
npm run dev

# Or using devbox
devbox run npm run dev
```

📖 [Docker Guide](docs/guides/DOCKER_GUIDE.md) — Compose profiles, Caddy HTTPS, Cloudflare tunnels.

**🦭 Podman**

```bash
# 1. Build the image
podman build --target runner-base -t omniroute:base .

# 2. Fix data directory permissions for rootless Podman
mkdir -p data && podman unshare chown 1000:1000 ./data

# 3. Set runtime in .env, then run (see contrib/podman/ for Quadlet)
echo "CONTAINER_HOST=podman" >> .env
podman compose --profile base up -d
```

📖 [Podman Guide](contrib/podman/README.md) — Quadlet setup, podman-compose, Quadlet.

**⚡ Faster / leaner install (skip the native build)**

The native SQLite engine (`better-sqlite3`) is an **optional** dependency, so a global
install never blocks on compiling from source: it uses a prebuilt binary when one matches
your platform/Node, and otherwise falls back transparently to a pure-JS engine
(`node:sqlite` on Node 22+, else the bundled `sql.js` WASM) — no build tools required.

To skip the post-install native warm-up entirely (CI, headless, or slow machines):

```bash
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute   # CI=1 also skips it
```

For the fastest installs prefer **pnpm** (content-addressed store + hard links — see above).
For a dashboard-free, headless runtime use the Docker `base` profile (above) or the
[Termux guide](docs/guides/TERMUX_GUIDE.md). The CLI and the web dashboard are served by the
same process on one port, so there is no separate CLI-only package today.

<br/>

<div align="center">

# 🎬 OmniRoute in Action

</div>

<div align="center">
<table>
  <tr>
    <td align="center" width="264">
      <a href="https://www.youtube.com/watch?v=Rxdc36yUyOQ"><img src="https://img.youtube.com/vi/Rxdc36yUyOQ/maxresdefault.jpg" alt="Guia em Português" width="260"/></a><br/>
      <b>🇧🇷 Português</b><br/><sub>Guia completo</sub>
    </td>
    <td align="center" width="264">
      <a href="https://www.youtube.com/watch?v=CMzyOiUyEVc"><img src="https://img.youtube.com/vi/CMzyOiUyEVc/maxresdefault.jpg" alt="English Guide" width="260"/></a><br/>
      <b>🇺🇸 English</b><br/><sub>Complete walkthrough</sub>
    </td>
    <td align="center" width="264">
      <a href="https://www.youtube.com/watch?v=il_5Ii6v4-Y"><img src="https://img.youtube.com/vi/il_5Ii6v4-Y/maxresdefault.jpg" alt="Руководство" width="260"/></a><br/>
      <b>🇷🇺 Русский</b><br/><sub>Полное руководство</sub>
    </td>
  </tr>
</table>
</div>

<div align="center">

> 🎬 **Made a video about OmniRoute?** Open an [issue](https://github.com/diegosouzapw/OmniRoute/issues/new) or [discussion](https://github.com/diegosouzapw/OmniRoute/discussions) with the link — we'll feature it here.

<br/>
</div>

<div align="center">

# 📸 Dashboard Screenshots

</div>

<div align="center">
<table>
  <tr>
    <td align="center"><b>Providers</b><br/><img src="docs/screenshots/01-providers.png" width="400" alt="Providers"/></td>
    <td align="center"><b>Combos</b><br/><img src="docs/screenshots/02-combos.png" width="400" alt="Combos"/></td>
  </tr>
  <tr>
    <td align="center"><b>Analytics</b><br/><img src="docs/screenshots/03-analytics.png" width="400" alt="Analytics"/></td>
    <td align="center"><b>Health</b><br/><img src="docs/screenshots/04-health.png" width="400" alt="Health"/></td>
  </tr>
  <tr>
    <td align="center"><b>Translator</b><br/><img src="docs/screenshots/05-translator.png" width="400" alt="Translator"/></td>
    <td align="center"><b>Settings</b><br/><img src="docs/screenshots/06-settings.png" width="400" alt="Settings"/></td>
  </tr>
  <tr>
    <td align="center"><b>CLI Tools</b><br/><img src="docs/screenshots/07-cli-tools.png" width="400" alt="CLI Tools"/></td>
    <td align="center"><b>Usage Logs</b><br/><img src="docs/screenshots/08-usage.png" width="400" alt="Usage Logs"/></td>
  </tr>
</table>
</div>

<br/>

<div align="center">

# 📧 Support & Community

> 💬 **Chat with the community** — Discord, Telegram & WhatsApp (🌍 / 🇧🇷) links are at the [top of this README](#-join-the-community).

- 🌍 **Website**: [omniroute.online](https://omniroute.online)
- 🐙 **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- 🐛 **Issues**: [report a bug](https://github.com/diegosouzapw/OmniRoute/issues) (attach `npm run system-info` output)
- 🤝 **Contributing**: see [CONTRIBUTING.md](CONTRIBUTING.md), [Branching & Release Model](docs/ops/BRANCHING_MODEL.md), or pick a `good first issue`

</div>

---

<br/>
<div align="center">

## 🛠️ Tech Stack

</div>

- **Runtime**: Node.js 22.x or 24.x LTS (24 LTS recommended) — `>=22.22.2 <23 || >=24.0.0 <27`
- **Language**: TypeScript 6.0 — **100% TypeScript** across `src/` and `open-sse/` (zero `any` in core modules since v2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: better-sqlite3 (SQLite) + LowDB (JSON legacy) — domain state, proxy logs, MCP audit, routing decisions, memory, skills
- **Schemas**: Zod (MCP tool I/O validation, API contracts)
- **Protocols**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: Server-Sent Events (SSE) + WebSocket bridge (`/v1/ws`)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API Keys + MCP Scoped Authorization
- **Testing**: Node.js test runner + Vitest (**25,000+ test cases** across 3,300+ files — unit, integration, E2E, security, ecosystem)
- **Platforms**: Desktop (Electron), Android (Termux), PWA (any browser)
- **CI/CD**: GitHub Actions (auto npm publish + Docker Hub on release)
- **Website**: [omniroute.online](https://omniroute.online)
- **Package**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resilience**: Circuit breaker, exponential backoff, anti-thundering herd, TLS spoofing, auto-combo self-healing

<div align="center">

<br/>

## 📖 Documentation

</div>

### 📘 Getting Started

| Document                                                       | Description                                                                                                                                                                          |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [User Guide](docs/guides/USER_GUIDE.md)                        | Providers, combos, CLI integration, deployment                                                                                                                                       |
| [Setup Guide](docs/guides/SETUP_GUIDE.md)                      | Full install methods, CLI tool configs, protocol setup, timeout tuning                                                                                                               |
| [CLI Tools Guide](docs/reference/CLI-TOOLS.md)                 | Per-tool setup for Claude Code, Codex, Cursor, Cline, OpenClaw, Kilo, Copilot                                                                                                        |
| [Remote Mode](docs/guides/REMOTE-MODE.md)                      | Drive a remote OmniRoute (VPS) from your laptop CLI via scoped access tokens                                                                                                         |
| [Claude Code Config](docs/guides/CLAUDE-CODE-CONFIGURATION.md) | Point Claude Code at OmniRoute (local/remote) with `launch` + per-model profiles                                                                                                     |
| [Quick Start](README.md#-quick-start)                          | 3-step install → connect → configure                                                                                                                                                 |

### 🔧 Operations & Deployment

| Document                                                 | Description                                                                                                                                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Docker Guide](docs/guides/DOCKER_GUIDE.md)              | Docker run, Compose profiles, Caddy HTTPS, tunnels, image tags                                                                                                                      |
| [Podman Guide](contrib/podman/README.md)                 | Quadlet systemd integration, podman-compose, SELinux                                                                                                                                |
| [VM Deployment](docs/ops/VM_DEPLOYMENT_GUIDE.md)         | Complete guide: VM + nginx + Cloudflare setup                                                                                                                                       |
| [Fly.io Deployment](docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) | Deploy to Fly.io with persistent storage                                                                                                                                            |
| [Termux Guide](docs/guides/TERMUX_GUIDE.md)              | Run OmniRoute on Android via Termux                                                                                                                                                 |
| [PWA Guide](docs/guides/PWA_GUIDE.md)                    | Progressive Web App install, caching, architecture                                                                                                                                  |
| [Uninstall Guide](docs/guides/UNINSTALL.md)              | Clean removal for all install methods                                                                                                                                               |
| [Environment Config](docs/reference/ENVIRONMENT.md)      | Complete `.env` variables and references                                                                                                                                            |

### 🧠 Features & Architecture

| Document                                                                     | Description                                                                                                                                                        |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Architecture](docs/architecture/ARCHITECTURE.md)                            | System architecture, data flow, and internals                                                                                                                      |
| [Compression Guide](docs/compression/COMPRESSION_GUIDE.md)                   | 7-option pipeline: off / lite / standard / aggressive / ultra / RTK / stacked                                                                                      |
| [RTK Compression](docs/compression/RTK_COMPRESSION.md)                       | Command-output compression, filters, trust, verify, raw-output recovery                                                                                            |
| [Compression Engines](docs/compression/COMPRESSION_ENGINES.md)               | Caveman, RTK, stacked pipelines, dashboard/API/MCP surfaces                                                                                                        |
| [Compression Rules Format](docs/compression/COMPRESSION_RULES_FORMAT.md)     | JSON rule-pack schemas for Caveman and RTK filters                                                                                                                 |
| [Compression Language Packs](docs/compression/COMPRESSION_LANGUAGE_PACKS.md) | Language detection and Caveman rule-pack authoring                                                                                                                 |
| [Resilience Guide](docs/architecture/RESILIENCE_GUIDE.md)                    | Circuit breakers, cooldowns, queue, anti-thundering herd, TLS spoofing                                                                                             |
| [Auto-Combo Engine](docs/routing/AUTO-COMBO.md)                              | 12-factor scoring, mode packs, self-healing                                                                                                                        |
| [Proxy Guide](docs/ops/PROXY_GUIDE.md)                                       | 3-level proxy system, 1proxy marketplace, registry CRUD                                                                                                            |
| [Free Tiers](docs/reference/FREE_TIERS.md)                                   | 25+ free API providers consolidated directory                                                                                                                      |
| [Features Gallery](docs/guides/FEATURES.md)                                  | Visual dashboard tour with screenshots                                                                                                                             |
| [Codebase Documentation](docs/architecture/CODEBASE_DOCUMENTATION.md)        | Beginner-friendly codebase walkthrough                                                                                                                             |

### 🤖 Protocols & APIs

| Document                                          | Description                                                                                                                                                                             |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [API Reference](docs/reference/API_REFERENCE.md)  | All endpoints with examples                                                                                                                                                             |
| [OpenAPI Spec](docs/openapi.yaml)                 | OpenAPI 3.0 specification                                                                                                                                                               |
| [MCP Server](open-sse/mcp-server/README.md)       | 104 MCP tools, IDE configs, Python/TS/Go clients                                                                                                                                        |
| [MCP Server Guide](docs/frameworks/MCP-SERVER.md) | MCP installation, transports, and tool reference                                                                                                                                        |
| [A2A Server](src/lib/a2a/README.md)               | JSON-RPC 2.0 protocol, skills, streaming, task mgmt                                                                                                                                     |
| [A2A Server Guide](docs/frameworks/A2A-SERVER.md) | A2A agent card, tasks, skills, and streaming                                                                                                                                            |

### 📋 Project & Quality

| Document                                                 | Description                                                                                                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Contributing](CONTRIBUTING.md)                          | Development setup and guidelines                                                                                                                                                         |
| [Branching & Release Model](docs/ops/BRANCHING_MODEL.md) | Where PRs target (`release/*`), what `main` and tags mean                                                                                                                                |
| [Changelog](CHANGELOG.md)                                | Full per-version release history                                                                                                                                                         |
| [Security Policy](SECURITY.md)                           | Vulnerability reporting and security practices                                                                                                                                           |
| [i18n Guide](docs/guides/I18N.md)                        | 40+ language support, translation workflow, RTL                                                                                                                                          |
| [Release Checklist](docs/ops/RELEASE_CHECKLIST.md)       | Pre-release validation steps                                                                                                                                                             |
| [Coverage Plan](docs/ops/COVERAGE_PLAN.md)               | Test coverage strategy and 25,000+ test suite                                                                                                                                            |

<br/>

<div align="center">

# ⭐ Top Contributors

> OmniRoute is shaped by a passionate open-source community. These individuals have made exceptional contributions that directly impact the quality, stability, and reach of the project. **Thank you.**

<table>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/oyi77">
        <img src="https://github.com/oyi77.png" width="40" style="border-radius:50%" alt="oyi77"/><br/>
        <b>oyi77</b>
      </a><br/>
      <sub>🥇 213 commits • +114K lines</sub><br/>
      <sub>Analytics engine, SQL aggregations,<br/>proxy marketplace, test coverage</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/rdself">
        <img src="https://github.com/rdself.png" width="40" style="border-radius:50%" alt="R.D. &amp; Randi"/><br/>
        <b>R.D. &amp; Randi</b>
      </a><br/>
      <sub>🥈 108 commits • +38K lines</sub><br/>
      <sub>Endpoints page, tunnel integrations,<br/>Docker workflows, A2A status, compression UI</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/christopher-s">
        <img src="https://github.com/christopher-s.png" width="40" style="border-radius:50%" alt="Chris Staley"/><br/>
        <b>Chris Staley</b>
      </a><br/>
      <sub>🥉 70 commits • +1.8K lines</sub><br/>
      <sub>SSE stream hardening, Responses API,<br/>Gemini pagination, test regression fixes</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/zen0bit">
        <img src="https://github.com/zen0bit.png" width="40" style="border-radius:50%" alt="zenobit"/><br/>
        <b>zenobit</b>
      </a><br/>
      <sub>🏅 62 commits • +22K lines</sub><br/>
      <sub>CI/CD pipeline, i18n for 33 languages,<br/>Void Linux package, platform fixes</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/JxnLexn">
        <img src="https://github.com/JxnLexn.png" width="40" style="border-radius:50%" alt="Jan Leon"/><br/>
        <b>Jan Leon</b>
      </a><br/>
      <sub>🏅 58 commits • +22K lines</sub><br/>
      <sub>Reasoning-effort routing, proxy controls,<br/>quota visibility, Live Zone compression</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/backryun">
        <img src="https://github.com/backryun.png" width="40" style="border-radius:50%" alt="backryun"/><br/>
        <b>backryun</b>
      </a><br/>
      <sub>🏅 53 commits • +70K lines</sub><br/>
      <sub>Provider catalog curation — Perplexity, Kimi,<br/>Cerebras, Copilot, LMArena refreshes</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/chirag127">
        <img src="https://github.com/chirag127.png" width="40" style="border-radius:50%" alt="Chirag Singhal"/><br/>
        <b>Chirag Singhal</b>
      </a><br/>
      <sub>🏅 46 commits • +4.8K lines</sub><br/>
      <sub>Error sanitization, MITM prefill fix,<br/>fusion judge, breaker/429 correctness</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/kfiramar">
        <img src="https://github.com/kfiramar.png" width="40" style="border-radius:50%" alt="kfiramar"/><br/>
        <b>kfiramar</b>
      </a><br/>
      <sub>🏅 38 commits • +1.7K lines</sub><br/>
      <sub>Codex websocket + passthrough, auth/onboarding,<br/>Electron hardening, DB migrations</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/benzntech">
        <img src="https://github.com/benzntech.png" width="40" style="border-radius:50%" alt="Benson K B"/><br/>
        <b>Benson K B</b>
      </a><br/>
      <sub>🏅 28 commits • +9.2K lines</sub><br/>
      <sub>Electron desktop app, auto-updater,<br/>release build workflows, cross-platform CI</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/herjarsa">
        <img src="https://github.com/herjarsa.png" width="40" style="border-radius:50%" alt="Hernan J. Ardila"/><br/>
        <b>Hernan J. Ardila</b>
      </a><br/>
      <sub>🏅 25 commits • +174K lines</sub><br/>
      <sub>Zero-latency combos, vision-bridge auto-routing,<br/>catalog context-length, resilience 429 hints</sub>
    </td>
  </tr>
</table>

> 🙏 These contributors' features, bug fixes, and infrastructure improvements are a **core part** of what makes OmniRoute reliable and feature-rich. Every pull request, every test case, and every i18n translation file matters. Open source is built by people like them.

</div>

---

<br/>

<div align="center">

## 👥 500+ Contributors

</div>

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=400&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### How to Contribute

1. Fork the repository
2. Branch from the **active** `release/vX.Y.Z` tip (not `main`) — see [Branching & Release Model](docs/ops/BRANCHING_MODEL.md)
3. Create your feature branch (`git checkout -b feat/amazing-feature`)
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feat/amazing-feature`)
6. Open a Pull Request with **base = that `release/vX.Y.Z` branch**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Releasing a New Version

```bash
# Create a release — npm publish happens automatically
gh release create v3.8.2 --title "v3.8.2" --generate-notes
```

<br/>

<div align="center">

## 📊 Stars

<a href="https://www.star-history.com/?repos=diegosouzapw%2FOmniRoute&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&theme=dark&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
 </picture>
</a>

<br/>

<div align="center">

## 🌍 StarMapper

<a href="https://starmapper.bruniaux.com/diegosouzapw/omniroute">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute?theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute?theme=light" />
    <img alt="StarMapper" src="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute" />
  </picture>
</a>
</div>

<br/>

<div align="center">

## 🙏 Acknowledgments

</div>

OmniRoute stands on the shoulders of giants. It started as a fork of **[9router](https://github.com/decolua/9router)** and a TypeScript port of the Go project **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — and from there, every subsystem below was inspired by an open-source project that got there first. Each one shaped a concrete piece of OmniRoute. This is our thank-you to all of them. 🙏

> ⭐ star counts as of July 2026 — go give these projects a star.

### 🧬 Lineage & gateway

| Project                                                                         |    ⭐ | How it inspired OmniRoute                                                                                                             |
| ------------------------------------------------------------------------------- | ----: | ------------------------------------------------------------------------------------------------------------------------------------- |
| **[9router](https://github.com/decolua/9router)** · decolua                     | 22.7k | The original project this fork is built on — extended here with multi-modal APIs and a full TypeScript rewrite.                       |
| **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** · router-for-me | 43.6k | The Go implementation that inspired this JavaScript / TypeScript port.                                                                |
| **[LiteLLM](https://github.com/BerriAI/litellm)** · BerriAI                     | 54.0k | The AI gateway whose public pricing dataset feeds our cost-tracking sync and whose provider-normalization model informed our routing. |

### 🗜️ Context & token compression — engines

| Project                                                                       |    ⭐ | How it inspired OmniRoute                                                                                                                                                                                |
| ----------------------------------------------------------------------------- | ----: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Caveman](https://github.com/JuliusBrussee/caveman)** · JuliusBrussee       | 90.8k | The viral "why use many token when few token do trick" project — its caveman-speak philosophy powers our standard compression mode and 30+ filler/condensation rules.                                    |
| **[RTK – Rust Token Killer](https://github.com/rtk-ai/rtk)** · rtk-ai         | 71.8k | High-performance command-output compression — inspired our RTK engine, JSON filter DSL, raw-output recovery and the stacked RTK → Caveman pipeline.                                                      |
| **[headroom](https://github.com/headroomlabs-ai/headroom)** · headroomlabs-ai | 60.1k | Reversible context-compression (SmartCrusher) — inspired our `headroom` engine and the `ccr` retrieve-marker pattern.                                                                                    |
| **[LLMLingua](https://github.com/microsoft/LLMLingua)** · Microsoft           |  6.5k | Prompt-compression research (LLMLingua / LLMLingua-2) — inspired our async, code-safe, fail-open `llmlingua` engine.                                                                                     |
| **[llmlingua-2-js](https://github.com/atjsh/llmlingua-2-js)** · atjsh         |    30 | The JS/ONNX port (MobileBERT / XLM-RoBERTa) used as the worker-thread backend for our LLMLingua engine.                                                                                                  |
| **[Troglodita](https://github.com/leninejunior/troglodita)** · Lenine Júnior  |    26 | PT-BR token compression — powers our pt-BR language pack: pleonasm reduction and filler removal tuned for Brazilian-Portuguese grammar.                                                                  |
| **[ponytail](https://github.com/DietrichGebert/ponytail)** · DietrichGebert   | 86.0k | The viral "lazy senior dev" YAGNI-coder skill — inspired our **less-code** Output Style: smallest-working-change steering that cuts _generated_ code (the output-axis sibling to Caveman's terse prose). |

### 🧩 Compact formats, token research & code-aware tooling

| Project                                                                                        |    ⭐ | How it inspired OmniRoute                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------- | ----: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[TOON](https://github.com/toon-format/toon)** · toon-format                                  | 24.9k | Token-Oriented Object Notation — its columnar, header-plus-rows model shaped our tabular compaction stage.                                                                                                     |
| **[GCF – Graph Compact Format](https://github.com/blackwell-systems/gcf)** · Blackwell Systems |    22 | First inspired our tabular compaction stage; now its zero-dependency, lossless generic-profile encoder is **vendored directly** as the Headroom codec (MIT, SPDX-marked), current with GCF spec v3.2.          |
| **[token-optimizer-mcp](https://github.com/ooples/token-optimizer-mcp)** · ooples              |   444 | Brotli/SQLite cache + per-session context-delta — inspired our `session-dedup` engine.                                                                                                                         |
| **[token-savior](https://github.com/Mibayy/token-savior)** · Mibayy                            |  1.1k | Bash-output compaction + MCP profiles — inspired our compression bail-out discipline and MCP tool-manifest reduction.                                                                                          |
| **[token-saver](https://github.com/ppgranger/token-saver)** · ppgranger                        |   117 | Content-aware, per-file-type output compression with failure-aware bail-out — validated our per-type dispatch and minimum-gain skip.                                                                           |
| **[token-optimizer](https://github.com/alexgreensh/token-optimizer)** · alexgreensh            |  1.7k | "Find the ghost tokens" — its offload + recoverable-handle pattern informed our CCR offload thinking.                                                                                                          |
| **[TokenMizer](https://github.com/Shweta-Mishra-ai/tokenmizer)** · Shweta-Mishra-ai            |    16 | A session-graph + cross-turn line-dedup blueprint that informed our session-dedup design.                                                                                                                      |
| **[OmniCompress](https://github.com/jessefreitas/OmniCompress)** · jessefreitas                |     3 | Rust columnar-JSON + content-addressed retrieve + cross-message dedup — validated our `headroom`/`ccr`/`session-dedup` engine design and the cache-stable "compressed form is position-independent" invariant. |
| **[mcp-compressor](https://github.com/atlassian-labs/mcp-compressor)** · Atlassian Labs        |    98 | MCP tool-schema/description compression — informed our MCP tool-manifest cardinality reduction.                                                                                                                |
| **[RepoMapper](https://github.com/pdavis68/RepoMapper)** · pdavis68                            |   187 | Aider-style repo-map ranking — informed our repo-map / retrieval-ranking exploration.                                                                                                                          |
| **[quiet-shell-mcp](https://github.com/mrsimpson/quiet-shell-mcp)** · mrsimpson                |     4 | Declarative shell-output reduction over MCP — validated our declarative bash-output compaction.                                                                                                                |
| **[ts-morph](https://github.com/dsherret/ts-morph)** · David Sherret                           |  6.1k | TypeScript Compiler API toolkit — inspired our parser-based comment removal that preserves string, template and regex literals.                                                                                |

### 🧠 Memory & RAG

| Project                                                            |    ⭐ | How it inspired OmniRoute                                                                                           |
| ------------------------------------------------------------------ | ----: | ------------------------------------------------------------------------------------------------------------------- |
| **[Mem0](https://github.com/mem0ai/mem0)** · mem0ai                | 61.2k | Universal memory layer — its proxy-as-write/read-boundary model shaped our memory architecture.                     |
| **[Letta (MemGPT)](https://github.com/letta-ai/letta)** · letta-ai | 23.9k | Stateful agents with tiered memory — inspired our Context Control & Recovery (CCR) tiered model.                    |
| **[WFGY](https://github.com/onestardao/WFGY)** · onestardao        |  1.8k | The ProblemMap taxonomy of 16 recurring RAG/LLM failure modes — the shared vocabulary in our troubleshooting guide. |

### 🛰️ Traffic inspection, MITM & transparent proxy

| Project                                                                           |   ⭐ | How it inspired OmniRoute                                                                                                                                                        |
| --------------------------------------------------------------------------------- | ---: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[llm-interceptor](https://github.com/chouzz/llm-interceptor)** · chouzz         |   49 | MITM interception/analysis of coding-assistant ↔ LLM traffic — our Traffic Inspector ports its SSE merge, conversation normalization, host passthrough and secret masking (MIT). |
| **[ProxyBridge](https://github.com/InterceptSuite/ProxyBridge)** · InterceptSuite | 5.5k | Transparent per-process proxy routing — inspired our crash-safe MITM teardown, socket idle-timeouts, `/proc` process attribution and TPROXY capture.                             |

### 📚 Model data, observability & UI

| Project                                                                    |    ⭐ | How it inspired OmniRoute                                                                                                  |
| -------------------------------------------------------------------------- | ----: | -------------------------------------------------------------------------------------------------------------------------- |
| **[models.dev](https://github.com/anomalyco/models.dev)** · SST / OpenCode |  6.0k | Open database of AI model specs, pricing and capabilities — synced natively into our model catalog.                        |
| **[React Flow / xyflow](https://github.com/xyflow/xyflow)** · xyflow       | 37.7k | The node-based graph library powering our real-time Compression Studio and Combo/Routing Studio.                           |
| **[LangGraph](https://github.com/langchain-ai/langgraph)** · LangChain     | 37.6k | LangGraph Studio's live workflow-graph visualization inspired our Studios' real-time cascade view.                         |
| **[Langfuse](https://github.com/langfuse/langfuse)** · Langfuse            | 31.4k | Its trace → span → generation observability model shaped our Compression Studio waterfall.                                 |
| **[Kiali](https://github.com/kiali/kiali)** · Kiali                        |  3.6k | Istio service-mesh observability — inspired our circuit-breaker badges and error-edge visuals in the Routing/Combo Studio. |
| **[lobe-icons](https://github.com/lobehub/lobe-icons)** · LobeHub          |  2.2k | AI/LLM brand logos that render the provider icons across our dashboard.                                                    |

### 🛡️ Security

| Project                                                                                     |  ⭐ | How it inspired OmniRoute                                                                                                                        |
| ------------------------------------------------------------------------------------------- | --: | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)** · tldrsec | 710 | A curated list of secure-by-default libraries that guides our security choices (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). |

### 🧭 Complementary tools

| Project                                                                       | How it composes with OmniRoute                                                                                                                                                                             |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[CodeWebChat](https://github.com/robertpiosik/CodeWebChat)** · robertpiosik | Editor-side companion — VS Code + browser extension that autofills 15+ chatbot web UIs with editor context. Owns the free-web-UI rail alongside OmniRoute's API rail; can point its API mode at OmniRoute. |

## 🤝 Supported by our Open Source Friends

<p align="center">
  <a href="https://www.kimi.com/code?aff=omniroute">
    <img src="public/sponsors/kimi-k3-banner.png" width="100%" alt="Kimi K3 — Open Frontier Intelligence · 2.8T parameters · 1M-token context"/>
  </a>
</p>

> **Want to join as an Open Source Friend?** These are the companies that back open source and help keep OmniRoute moving — and we say publicly where every token they give us goes. Reach out: [diegosouza.pw@outlook.com](mailto:diegosouza.pw@outlook.com)

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://www.kimi.com/code?aff=omniroute">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/providers/kimi-logomark-dark.svg">
          <img src="public/providers/kimi-logomark-light.svg" width="64" alt="Kimi (Moonshot AI)"/>
        </picture>
      </a>
      <br/><b>Kimi</b><br/><sub>Moonshot AI</sub><br/><br/>
      <img src="https://img.shields.io/badge/Founding_Friend-1783FF?style=flat-square" alt="Founding Open Source Friend"/>
    </td>
    <td>
      Thanks to <b>Kimi (Moonshot AI)</b>, our founding Open Source Friend, for backing this project! Kimi is the AI lab behind the open-weight K2 and K3 model families — <b>Kimi K3</b> delivers a 1M-token context window, native vision and frontier-level coding at a fraction of closed-model prices, and works out of the box with Claude Code, Codex and every coding tool OmniRoute serves.
      <br/><br/>
      <b>What Kimi's support powers:</b> Kimi's API credits power OmniRoute's AI-validated release pipeline — the <i>merge validation powered by Kimi K3</i> stage that reviews every pull request before it ships — plus day-to-day feature development. First-class Kimi support ships on both rails: the direct <a href="https://platform.kimi.ai?aff=omniroute">Kimi API</a> (<code>kimi-k3</code>) and the <a href="https://www.kimi.com/code?aff=omniroute">Kimi Code coding plan</a> (OAuth and API key). OmniRoute is also the first Brazilian open-source project in Kimi's support program. <a href="https://platform.kimi.ai?aff=omniroute"><b>Get a Kimi API key →</b></a>
    </td>
  </tr>
</table>

<sub>Links tagged <code>aff=omniroute</code> are partner links. They fund the project at no extra cost to you.</sub>

## 💖 Sponsors

A heartfelt thank-you to the people who fund OmniRoute out of their own pocket. Every contribution keeps the project free, independent and moving.

<p align="center">
  <a href="https://github.com/igormorais123"><img src="https://github.com/igormorais123.png?size=140" width="80" alt="Professor Igor Morais Vasconcelos (@igormorais123)"/></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/longtao77"><img src="https://github.com/longtao77.png?size=140" width="80" alt="longtao (@longtao77)"/></a>
</p>

<p align="center">
  <sub><b><a href="https://github.com/igormorais123">Professor Igor Morais Vasconcelos</a></b> &nbsp;·&nbsp; <b><a href="https://github.com/longtao77">longtao</a></b> &nbsp;·&nbsp; and others who prefer to stay private 💛</sub>
</p>

> **Want to support OmniRoute?** <a href="https://github.com/sponsors/diegosouzapw"><b>Become a sponsor →</b></a> Every dollar goes straight into keeping the project free and independent.

## ❤️ Support

OmniRoute is free and open source, built and maintained in the open. If it saves you time or money, consider supporting development:

- ⭐ **Star the repo** — it genuinely helps visibility
- 💖 **[GitHub Sponsors](https://github.com/sponsors/diegosouzapw)** — fund ongoing maintenance and new providers
- 🐛 **Report bugs and share feedback** in [Discussions](https://github.com/diegosouzapw/OmniRoute/discussions)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**[⬆ Back to top](#-omniroute)** · Built with ❤️ for the open-source AI community.

<sub>OmniRoute v3.8.49 · Node ≥22.22.2 · MIT License · <a href="https://omniroute.online">omniroute.online</a></sub>

</div>
<!-- GitHub Discussions enabled for community Q&A -->
