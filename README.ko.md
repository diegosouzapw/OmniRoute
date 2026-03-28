# 🚀 OmniRoute — 무료 AI 게이트웨이

### 코딩을 멈추지 마세요. 자동 폴백을 통해 **무료 및 저가형 AI 모델**로 스마트 라우팅합니다.

_범용 API 프록시 — 하나의 엔드포인트, 67개 이상의 공급자, 가동 중지 시간 없음. 이제 **MCP 및 A2A** 에이전트 오케스트레이션이 가능합니다._

**채팅 완료 • 임베딩 • 이미지 생성 • 비디오 • 음악 • 오디오 • 순위 재지정 • **웹 검색** • MCP 서버 • A2A 프로토콜 • 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) · [🚀 Quick Start](#-quick-start) · [💡 Features](#-key-features) · [📖 Docs](#-documentation) · [💰 Pricing](#-pricing-at-a-glance) · [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Available in:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | instagram [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 v3.0.0의 새로운 기능

> **Upgrading from v2.9.5?** — See the [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) for all changes.

| 면적                       | 변경                                                                                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **CodeQL 보안**         | 10개 이상의 CodeQL 경고 수정: 다항식 재실행, 안전하지 않은 무작위성, 셸 주입 수정                                                                     |
| ✅ **경로 검증**           | 이제 Zod 스키마 + `validateBody()` — CI `check:route-validation:t06` 통과로 검증된 모든 176개 API 경로                                                |
| 🐛 **omniModel 태그 유출** | 내부 `<omniModel>` 태그가 더 이상 SSE 스트리밍 응답에서 클라이언트로 누출되지 않습니다(#585)                                                          |
| 🔑 **등록된 키 API**       | 공급자/계정별 할당량 적용, 멱등성, SHA-256 저장소 및 선택적 GitHub 문제 보고 기능을 갖춘 `POST /api/v1/registered-keys`을 통해 API 키 자동 프로비저닝 |
| 🎨 **공급자 아이콘**       | PNG가 포함된 `@lobehub/icons`(SVG)을 통한 130개 이상의 공급자 로고 → 일반 폴백 체인                                                                   |
| 🔄 **모델 자동 동기화**    | 내장 및 사용자 정의 OpenAI 호환 공급자에 대한 모델 목록을 동기화하기 위한 24시간 스케줄러 및 수동 UI 토글                                             |
| 🌐 **오픈코드 Zen/Go**     | PR #530을 통한 @kang-heewon의 두 가지 새로운 제공자: `OpencodeExecutor`를 통한 무료 등급 + 구독 등급                                                  |
| 🐛 **Gemini CLI OAuth**    | Docker에 `GEMINI_OAUTH_CLIENT_SECRET`이 누락된 경우 실행 가능한 오류(암호적인 Google 오류임)                                                          |
| 🐛 **OpenCode 구성**       | `saveOpenCodeConfig()`은 이제 TOML을 `XDG_CONFIG_HOME`에 올바르게 씁니다.                                                                             |
| 🐛 **고정된 모델 재정의**  | `body.model`이 컨텍스트 캐시 보호에서 `pinnedModel`로 올바르게 설정됨                                                                                 |
| 🐛 **코덱스/클로드 루프**  | `tool_result` 블록이 이제 무한 루프를 중지하기 위해 텍스트로 변환되었습니다.                                                                          |
| 🐛 **로그인 리디렉션**     | 비밀번호 설정을 건너뛴 후 로그인이 더 이상 정지되지 않습니다.                                                                                         |
| 🐛 **Windows 경로**        | MSYS2/Git-Bash 경로(`/c/...`)가 자동으로 `C:\...`로 정규화됨                                                                                          |

---

## 🖼️ 메인 대시보드

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 대시보드 미리보기

<details>
<summary><b>Click to see dashboard screenshots</b></summary>

| 페이지         | Screenshot                                        |
| -------------- | ------------------------------------------------- |
| **Providers**  | ![Providers](docs/screenshots/01-providers.png)   |
| **콤보**       | ![Combos](docs/screenshots/02-combos.png)         |
| **분석**       | ![Analytics](docs/screenshots/03-analytics.png)   |
| **건강**       | ![Health](docs/screenshots/04-health.png)         |
| **번역가**     | ![Translator](docs/screenshots/05-translator.png) |
| **설정**       | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI 도구**   | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **사용 로그**  | ![Usage](docs/screenshots/08-usage.png)           |
| **엔드포인트** | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Free AI Provider for your favorite coding agents

_Connect any AI-powered IDE or CLI tool through OmniRoute — free API gateway for unlimited coding._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 모든 에이전트는 <code>http://localhost:20128/v1</code> 또는 <code>http://cloud.omniroute.online/v1</code>을 통해 연결됩니다. — 하나의 구성, 무제한 모델 및 할당량</sub>

---

## 🤔 왜 OmniRoute인가요?

**돈을 낭비하지 말고 한도에 도달하지 마세요.**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Subscription quota expires unused every month
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Rate limits stop you mid-coding
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Expensive APIs ($20-50/month per provider)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manual switching between providers

**OmniRoute는 이 문제를 해결합니다.**

- ✅ **Maximize subscriptions** - Track quota, use every bit before reset
- ✅ **Auto fallback** - Subscription → API Key → Cheap → Free, zero downtime
- ✅ **Multi-account** - Round-robin between accounts per provider
- ✅ **Universal** - Works with Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, any CLI tool

---

## 📧 지원

> 💬 **Join our community!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Get help, share tips, and stay updated.

- **웹사이트**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **문제**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md), open a PR, or pick a `good first issue`
- **원래 프로젝트**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 버그를 신고하시나요?

When opening an issue, please run the system-info command and attach the generated file:

```bash
npm run system-info
```

그러면 Node.js 버전, OmniRoute 버전, OS 세부 정보, 설치된 CLI 도구(iflow, gemini, claude, codex, antigravity, droid 등), Docker/PM2 상태, 시스템 패키지 등 문제를 신속하게 재현하는 데 필요한 모든 항목이 포함된 `system-info.txt`이 생성됩니다. GitHub 문제에 직접 파일을 첨부하세요.

---

## 🔄 작동 방식

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 What OmniRoute Solves — 30 Real Pain Points & Use Cases

> **AI 도구를 사용하는 모든 개발자는 매일 이러한 문제에 직면합니다.** OmniRoute는 비용 초과부터 지역적 차단, 손상된 OAuth 흐름부터 프로토콜 운영 및 기업 관찰 가능성까지 모든 문제를 해결하기 위해 구축되었습니다.

<details>
<summary><b>💸 1. "비싼 구독 비용을 지불했지만 여전히 한도 때문에 중단됩니다."</b></summary>

Developers pay $20–200/month for Claude Pro, Codex Pro, or GitHub Copilot. Even paying, quota has a ceiling — 5h of usage, weekly limits, or per-minute rate limits. Mid-coding session, the provider stops responding and the developer loses flow and productivity.

**OmniRoute가 이를 해결하는 방법:**

- **스마트 4계층 폴백** — 구독 할당량이 소진되면 수동 개입 없이 자동으로 API 키 → 저렴함 → 무료로 리디렉션됩니다.
- **Real-Time Quota Tracking** — Shows token consumption in real-time with reset countdown (5h, daily, weekly)
- **Multi-Account Support** — Multiple accounts per provider with auto round-robin — when one runs out, switches to the next
- **사용자 정의 콤보** — 6가지 균형 전략(채우기 우선, 라운드 로빈, P2C, 무작위, 최소 사용, 비용 최적화)을 갖춘 사용자 정의 가능한 폴백 체인
- **Codex Business Quotas** — Business/Team workspace quota monitoring directly in the dashboard

</details>

<details>
<summary><b>🔌 2. "I need to use multiple providers but each has a different API"</b></summary>

OpenAI uses one format, Claude (Anthropic) uses another, Gemini yet another. 개발자가 다른 제공업체의 모델을 테스트하거나 이들 사이에서 대체하려는 경우 SDK를 재구성하고, 엔드포인트를 변경하고, 호환되지 않는 형식을 처리해야 합니다. Custom providers (FriendLI, NIM) have non-standard model endpoints.

**OmniRoute가 이를 해결하는 방법:**

- **Unified Endpoint** — A single `http://localhost:20128/v1` serves as proxy for all 67+ providers
- **Format Translation** — Automatic and transparent: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **응답 삭제** — OpenAI SDK v1.83+를 손상시키는 비표준 필드(`x_groq`, `usage_breakdown`, `service_tier`)를 제거합니다.
- **Role Normalization** — Converts `developer` → `system` for non-OpenAI providers; `system` → `user` for GLM/ERNIE
- **Think Tag Extraction** — Extracts `<think>` blocks from models like DeepSeek R1 into standardized `reasoning_content`
- **Structured Output for Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatic conversion
- **`stream` defaults to `false`** — Aligns with OpenAI spec, avoiding unexpected SSE in Python/Rust/Go SDKs

</details>

<details>
<summary><b>🌐 3. "My AI provider blocks my region/country"</b></summary>

Providers like OpenAI/Codex block access from certain geographic regions. Users get errors like `unsupported_country_region_territory` during OAuth and API connections. This is especially frustrating for developers from developing countries.

**OmniRoute가 이를 해결하는 방법:**

- **3-Level Proxy Config** — Configurable proxy at 3 levels: global (all traffic), per-provider (one provider only), and per-connection/key
- **Color-Coded Proxy Badges** — Visual indicators: 🟢 global proxy, 🟡 provider proxy, 🔵 connection proxy, always showing the IP
- **OAuth Token Exchange Through Proxy** — OAuth flow also goes through the proxy, solving `unsupported_country_region_territory`
- **Connection Tests via Proxy** — Connection tests use the configured proxy (no more direct bypass)
- **SOCKS5 Support** — Full SOCKS5 proxy support for outbound routing
- **TLS Fingerprint Spoofing** — Browser-like TLS fingerprint via `wreq-js` to bypass bot detection
- **🔏 CLI 지문 일치** — 기본 CLI 바이너리 서명과 일치하도록 헤더와 본문 필드의 순서를 변경하여 계정 플래그 위험을 대폭 줄입니다. The proxy IP is preserved — you get both stealth **and** IP masking simultaneously

</details>

<details>
<summary><b>🆓 4. "I want to use AI for coding but I have no money"</b></summary>

Not everyone can pay $20–200/month for AI subscriptions. Students, devs from emerging countries, hobbyists, and freelancers need access to quality models at zero cost.

**OmniRoute가 이를 해결하는 방법:**

- **무료 계층 제공자 내장** — 100% 무료 제공자에 대한 기본 지원: iFlow(OAuth를 통한 5개의 무제한 모델: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen(4개의 무제한 모델: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, Vision-model), Kiro (Claude + AWS Builder ID for free), Gemini CLI (180K tokens/month free)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; `ollamacloud/<model>` 접두사 사용
- **Free-Only Combos** — Chain `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/month with zero downtime
- **NVIDIA NIM 무료 액세스** — ~40RPM 개발 - build.nvidia.com에서 70개 이상의 모델에 영원히 무료 액세스(크레딧에서 순수 속도 제한으로 전환)
- **Cost Optimized Strategy** — Routing strategy that automatically chooses the cheapest available provider

</details>

<details>
<summary><b>🔒 5. "I need to protect my AI gateway from unauthorized access"</b></summary>

When exposing an AI gateway to the network (LAN, VPS, Docker), anyone with the address can consume the developer's tokens/quota. Without protection, APIs are vulnerable to misuse, prompt injection, and abuse.

**OmniRoute가 이를 해결하는 방법:**

- **API Key Management** — Generation, rotation, and scoping per provider with a dedicated `/dashboard/api-manager` page
- **Model-Level Permissions** — Restrict API keys to specific models (`openai/*`, wildcard patterns), with Allow All/Restrict toggle
- **API Endpoint Protection** — Require a key for `/v1/models` and block specific providers from the listing
- **Auth Guard + CSRF Protection** — All dashboard routes protected with `withAuth` middleware + CSRF tokens
- **Rate Limiter** — Per-IP rate limiting with configurable windows
- **IP Filtering** — Allowlist/blocklist for access control
- **Prompt Injection Guard** — Sanitization against malicious prompt patterns
- **AES-256-GCM Encryption** — Credentials encrypted at rest

</details>

<details>
<summary><b>🛑 6. "My provider went down and I lost my coding flow"</b></summary>

AI providers can become unstable, return 5xx errors, or hit temporary rate limits. If a dev depends on a single provider, they're interrupted. Without circuit breakers, repeated retries can crash the application.

**OmniRoute가 이를 해결하는 방법:**

- **모델별 회로 차단기** — 구성 가능한 임계값 및 쿨다운(닫힘/열림/반열림)을 통한 자동 열기/닫기, 계단식 블록 방지를 위한 모델별 범위 지정
- **Exponential Backoff** — Progressive retry delays
- **Anti-Thundering Herd** — Mutex + semaphore protection against concurrent retry storms
- **Combo Fallback Chains** — If the primary provider fails, automatically falls through the chain with no intervention
- **Combo Circuit Breaker** — Auto-disables failing providers within a combo chain
- **Health Dashboard** — Uptime monitoring, circuit breaker states, lockouts, cache stats, p50/p95/p99 latency

</details>

<details>
<summary><b>🔧 7. "Configuring each AI tool is tedious and repetitive"</b></summary>

Developers use Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Each tool needs a different config (API endpoint, key, model). Reconfiguring when switching providers or models is a waste of time.

**OmniRoute가 이를 해결하는 방법:**

- **CLI Tools Dashboard** — Dedicated page with one-click setup for Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Generates `chatLanguageModels.json` for VS Code with bulk model selection
- **Onboarding Wizard** — Guided 4-step setup for first-time users
- **One endpoint, all models** — Configure `http://localhost:20128/v1` once, access 67+ providers

</details>

<details>
<summary><b>🔑 8. "Managing OAuth tokens from multiple providers is hell"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — all use OAuth 2.0 with expiring tokens. Developers need to re-authenticate constantly, deal with `client_secret is missing`, `redirect_uri_mismatch`, and failures on remote servers. LAN/VPS의 OAuth는 특히 문제가 됩니다.

**OmniRoute가 이를 해결하는 방법:**

- **Auto Token Refresh** — OAuth tokens refresh in background before expiration
- **OAuth 2.0 (PKCE) Built-in** — Automatic flow for Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Multiple accounts per provider via JWT/ID token extraction
- **OAuth LAN/Remote Fix** — Private IP detection for `redirect_uri` + manual URL mode for remote servers
- **OAuth Behind Nginx** — Uses `window.location.origin` for reverse proxy compatibility
- **Remote OAuth Guide** — Step-by-step guide for Google Cloud credentials on VPS/Docker

</details>

<details>
<summary><b>📊 9. "I don't know how much I'm spending or where"</b></summary>

Developers use multiple paid providers but have no unified view of spending. Each provider has its own billing dashboard, but there's no consolidated view. 예상치 못한 비용이 쌓일 수 있습니다.

**OmniRoute가 이를 해결하는 방법:**

- **Cost Analytics Dashboard** — Per-token cost tracking and budget management per provider
- **Budget Limits per Tier** — Spending ceiling per tier that triggers automatic fallback
- **Per-Model Pricing Configuration** — Configurable prices per model
- **Usage Statistics Per API Key** — Request count and last-used timestamp per key
- **Analytics Dashboard** — Stat cards, model usage chart, provider table with success rates and latency

</details>

<details>
<summary><b>🐛 10. "AI 호출에서는 오류 및 문제를 진단할 수 없습니다."</b></summary>

호출이 실패하면 개발자는 속도 제한, 만료된 토큰, 잘못된 형식 또는 공급자 오류인지 알 수 없습니다. 여러 터미널에 걸쳐 조각화된 로그. 관찰 가능성이 없으면 디버깅은 시행착오를 겪게 됩니다.

**OmniRoute가 이를 해결하는 방법:**

- **통합 로그 대시보드** — 탭 4개: 요청 로그, 프록시 로그, 감사 로그, 콘솔
- **콘솔 로그 뷰어** — 색상으로 구분된 레벨, 자동 스크롤, 검색, 필터 기능을 갖춘 실시간 터미널 스타일 뷰어
- **SQLite 프록시 로그** — 서버를 다시 시작해도 지속되는 영구 로그
- **번역기 플레이그라운드** — 4가지 디버깅 모드: 플레이그라운드(형식 번역), 채팅 테스터(왕복), 테스트 벤치(일괄), 라이브 모니터(실시간)
- **원격 측정 요청** — p50/p95/p99 대기 시간 + X-요청-ID 추적
- **회전을 통한 파일 기반 로깅** — 콘솔 인터셉터는 크기 기반 회전을 통해 모든 것을 JSON 로그에 캡처합니다.
- **시스템 정보 보고서** — `npm run system-info`은 전체 환경(노드 버전, OmniRoute 버전, OS, CLI 도구, Docker/PM2 상태)에서 `system-info.txt`을 생성합니다. 즉각적인 분류를 위해 문제를 보고할 때 첨부하세요.

</details>

<details>
<summary><b>🏗️ 11. "게이트웨이 배포 및 유지 관리가 복잡합니다."</b></summary>

다양한 환경(로컬, VPS, Docker, 클라우드)에서 AI 프록시를 설치, 구성 및 유지 관리하는 것은 노동 집약적입니다. 하드코딩된 경로, 디렉터리의 `EACCES`, 포트 충돌, 크로스 플랫폼 빌드와 같은 문제로 인해 마찰이 가중됩니다.

**OmniRoute가 이를 해결하는 방법:**

- **npm 전역 설치** — `npm install -g omniroute && omniroute` — 완료
- **Docker 다중 플랫폼** — AMD64 + ARM64 기본(Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose 프로필** — `base`(CLI 도구 없음) 및 `cli`(Claude Code, Codex, OpenClaw 포함)
- **Electron 데스크탑 앱** — 시스템 트레이, 자동 시작, 오프라인 모드를 갖춘 Windows/macOS/Linux용 기본 앱
- **분할 포트 모드** — 고급 시나리오(역방향 프록시, 컨테이너 네트워킹)를 위한 별도의 포트에 있는 API 및 대시보드
- **클라우드 동기화** — Cloudflare Workers를 통해 장치 간 구성 동기화
- **DB 백업** — 모든 설정의 자동 백업, 복원, 내보내기 및 가져오기

</details>

<details>
<summary><b>🌍 12. "인터페이스는 영어로만 제공되며 우리 팀은 영어를 구사하지 않습니다."</b></summary>

영어를 사용하지 않는 국가, 특히 라틴 아메리카, 아시아, 유럽의 팀은 영어 전용 인터페이스로 인해 어려움을 겪고 있습니다. 언어 장벽으로 인해 채택이 줄어들고 구성 오류가 증가합니다.

**OmniRoute가 이를 해결하는 방법:**

- **대시보드 i18n — 30개 언어** — 한국어, 아랍어, 불가리아어, 덴마크어, 독일어, 스페인어, 핀란드어, 프랑스어, 히브리어, 힌디어, 헝가리어, 인도네시아어, 이탈리아어, 일본어, 말레이어, 네덜란드어, 노르웨이어, 폴란드어, 포르투갈어(PT/BR), 루마니아어, 러시아어, 슬로바키아어, 스웨덴어, 태국어, 우크라이나어, 베트남어, 중국어, 필리핀어, 영어를 포함한 500개 이상의 키 번역됨
- **RTL 지원** — 아랍어 및 히브리어에 대해 오른쪽에서 왼쪽으로 지원
- **다국어 README** — 30개의 완전한 문서 번역
- **언어 선택기** — 실시간 전환을 위한 헤더의 지구본 아이콘

</details>

<details>
<summary><b>🔄 13. "채팅 이상의 것이 필요합니다. 임베딩, 이미지, 오디오가 필요합니다."</b></summary>

AI는 단순한 채팅 완성이 아닙니다. 개발자는 이미지를 생성하고, 오디오를 기록하고, RAG용 임베딩을 만들고, 문서 순위를 다시 지정하고, 콘텐츠를 조정해야 합니다. 각 API에는 서로 다른 엔드포인트와 형식이 있습니다.

**OmniRoute가 이를 해결하는 방법:**

- **임베딩** — `/v1/embeddings`(6개 공급자 및 9개 이상의 모델 포함)
- **이미지 생성** — 10개 공급자와 20개 이상의 모델(OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)을 갖춘 `/v1/images/generations`
- **텍스트-비디오** — `/v1/videos/generations` — ComfyUI(AnimateDiff, SVD) 및 SD WebUI
- **텍스트-음악** — `/v1/music/generations` — ComfyUI(안정적인 오디오 오픈, MusicGen)
- **오디오 전사** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **텍스트 음성 변환** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + 기존 제공업체
- **조정** — `/v1/moderations` — 콘텐츠 안전 확인
- **재순위** — `/v1/rerank` — 문서 관련성 재순위
- **응답 API** — Codex에 대한 전체 `/v1/responses` 지원

</details>

<details>
<summary><b>🧪 14. "모델 간 품질을 테스트하고 비교할 방법이 없습니다."</b></summary>

개발자는 자신의 사용 사례(코드, 번역, 추론)에 가장 적합한 모델을 알고 싶어하지만 수동으로 비교하는 것은 느립니다. 통합 평가 도구가 없습니다.

**OmniRoute가 이를 해결하는 방법:**

- **LLM 평가** — 인사말, 수학, 지리, 코드 생성, JSON 준수, 번역, 마크다운, 안전 거부를 다루는 사전 로드된 10가지 사례를 사용한 골든 세트 테스트
- **4가지 일치 전략** — `exact`, `contains`, `regex`, `custom`(JS 함수)
- **번역기 플레이그라운드 테스트 벤치** — 여러 입력 및 예상 출력을 사용한 일괄 테스트, 공급업체 간 비교
- **채팅 테스터** — 시각적 응답 렌더링을 포함한 전체 왕복
- **라이브 모니터** — 프록시를 통해 흐르는 모든 요청의 실시간 스트림

</details>

<details>
<summary><b>📈 15. "성능 저하 없이 확장해야 합니다."</b></summary>

요청량이 증가함에 따라 동일한 질문을 캐싱하지 않으면 중복 비용이 발생합니다. 멱등성이 없으면 중복 요청으로 인해 처리가 낭비됩니다. 공급자별 요금 제한을 준수해야 합니다.

**OmniRoute가 이를 해결하는 방법:**

- **의미 체계 캐시** — 2계층 캐시(서명 + 의미 체계)로 비용과 대기 시간 감소
- **멱등성 요청** — 동일한 요청에 대한 중복 제거 기간은 5초입니다.
- **속도 제한 감지** — 제공업체별 RPM, 최소 간격 및 최대 동시 추적
- **편집 가능한 속도 제한** — 설정 → 지속성을 통한 복원력에서 구성 가능한 기본값
- **API 키 검증 캐시** — 프로덕션 성능을 위한 3계층 캐시
- **원격 측정 기능을 갖춘 상태 대시보드** — p50/p95/p99 대기 시간, 캐시 통계, 가동 시간

</details>

<details>
<summary><b>🤖 16. "모델 동작을 전역적으로 제어하고 싶습니다."</b></summary>

특정 언어, 특정 어조로 모든 응답을 원하거나 추론 토큰을 제한하려는 개발자. 모든 도구/요청에서 이를 구성하는 것은 비현실적입니다.

**OmniRoute가 이를 해결하는 방법:**

- **시스템 프롬프트 삽입** — 모든 요청에 전역 프롬프트 적용
- **생각 예산 검증** — 요청별 토큰 할당 제어 추론(패스스루, 자동, 사용자 정의, 적응형)
- **6가지 라우팅 전략** — 요청 배포 방법을 결정하는 글로벌 전략
- **와일드카드 라우터** — `provider/*` 패턴은 모든 공급자에게 동적으로 라우팅됩니다.
- **콤보 활성화/비활성화 토글** — 대시보드에서 직접 콤보를 토글합니다.
- **공급자 토글** — 한 번의 클릭으로 공급자에 대한 모든 연결을 활성화/비활성화합니다.
- **차단된 제공자** — `/v1/models` 목록에서 특정 제공자를 제외합니다.

</details>

<details>
<summary><b>🧰 17. "최고 수준의 제품 기능으로 MCP 도구가 필요합니다."</b></summary>

많은 AI 게이트웨이는 MCP를 숨겨진 구현 세부 사항으로만 노출합니다. 팀에는 가시적이고 관리 가능한 운영 레이어가 필요합니다.

**OmniRoute가 이를 해결하는 방법:**

- 대시보드 탐색 및 엔드포인트 프로토콜 탭에 MCP가 나타납니다.
- 프로세스, 도구, 범위 및 감사가 포함된 전용 MCP 관리 페이지
- `omniroute --mcp` 및 클라이언트 온보딩을 위한 기본 제공 빠른 시작

</details>

<details>
<summary><b>🧠 18. "동기화 + 스트림 작업 경로를 갖춘 A2A 오케스트레이션이 필요합니다."</b></summary>

에이전트 워크플로에는 수명 주기 제어를 통해 직접 응답과 장기 실행 스트리밍 실행이 모두 필요합니다.

**OmniRoute가 이를 해결하는 방법:**

- `message/send` 및 `message/stream`이 있는 A2A JSON-RPC 엔드포인트(`POST /a2a`)
- 터미널 상태 전파를 통한 SSE 스트리밍
- `tasks/get` 및 `tasks/cancel`용 작업 수명 주기 API

</details>

<details>
<summary><b>🛰️ 19. "추측된 상태가 아닌 실제 MCP 프로세스 상태가 필요합니다"</b></summary>

운영팀은 API에 접근할 수 있는지 여부뿐만 아니라 MCP가 실제로 활성화되어 있는지 알아야 합니다.

**OmniRoute가 이를 해결하는 방법:**

- PID, 타임스탬프, 전송, 도구 개수 및 범위 모드가 포함된 런타임 하트비트 파일
- 하트비트 + 최근 활동을 결합한 MCP 상태 API
- 프로세스/가동 시간/하트비트 최신성을 위한 UI 상태 카드

</details>

<details>
<summary><b>📋 20. "감사 가능한 MCP 도구 실행이 필요합니다"</b></summary>

도구가 구성을 변경하거나 운영 작업을 트리거하는 경우 팀에는 법의학적 추적성이 필요합니다.

**OmniRoute가 이를 해결하는 방법:**

- MCP 도구 호출에 대한 SQLite 지원 감사 로깅
- 도구, 성공/실패, API 키, 페이지 매김 기준으로 필터링
- 자동화를 위한 대시보드 감사 테이블 + 통계 엔드포인트

</details>

<details>
<summary><b>🔐 21. "통합당 범위가 지정된 MCP 권한이 필요합니다."</b></summary>

다양한 클라이언트에는 도구 범주에 대한 최소 권한 액세스 권한이 있어야 합니다.

**OmniRoute가 이를 해결하는 방법:**

- 제어된 도구 액세스를 위한 9개의 세분화된 MCP 범위
- MCP 관리 UI의 범위 적용 및 가시성
- 운영 툴링을 위한 안전한 기본 자세

</details>

<details>
<summary><b>⚙️ 22. "재배포 없이 운영 제어가 필요합니다"</b></summary>

팀은 사고 또는 비용 이벤트 중에 빠른 런타임 변경이 필요합니다.

**OmniRoute가 이를 해결하는 방법:**

- MCP 대시보드에서 직접 콤보 활성화 전환
- 사전 정의된 정책 팩의 복원력 프로필 적용
- 동일한 운영 패널에서 회로 차단기 상태 재설정

</details>

<details>
<summary><b>🔄 23. "실시간 A2A 작업 수명주기 가시성 및 취소가 필요합니다."</b></summary>

수명주기 가시성이 없으면 작업 사고를 분류하기가 어려워집니다.

**OmniRoute가 이를 해결하는 방법:**

- 페이지 매김을 통한 상태/기술별 작업 목록/필터링
- 작업 메타데이터, 이벤트 및 아티팩트에 대한 드릴다운
- 작업 취소 끝점 및 확인이 포함된 UI 작업

</details>

<details>
<summary><b>🌊 24. "A2A 로드를 위한 활성 스트림 메트릭이 필요합니다"</b></summary>

스트리밍 워크플로에는 동시성 및 라이브 연결에 대한 운영 통찰력이 필요합니다.

**OmniRoute가 이를 해결하는 방법:**

- A2A 상태에 통합된 활성 스트림 카운터
- 마지막 작업 타임스탬프 및 상태별 개수
- 실시간 운영 모니터링을 위한 A2A 대시보드 카드

</details>

<details>
<summary><b>🪪 25. "클라이언트를 위한 표준 에이전트 검색이 필요합니다."</b></summary>

외부 클라이언트 및 오케스트레이터에는 온보딩을 위해 컴퓨터에서 읽을 수 있는 메타데이터가 필요합니다.

**OmniRoute가 이를 해결하는 방법:**

- `/.well-known/agent.json`에 노출된 에이전트 카드
- 관리 UI에 표시되는 능력과 기술
- A2A 상태 API에는 자동화를 위한 검색 메타데이터가 포함되어 있습니다.

</details>

<details>
<summary><b>🧭 26. "제품 UX에서 프로토콜 검색 기능이 필요합니다"</b></summary>

사용자가 프로토콜 표면을 발견할 수 없는 경우 채택 및 지원 품질이 저하됩니다.

**OmniRoute가 이를 해결하는 방법:**

- 프록시, MCP, A2A 및 API 엔드포인트에 대한 탭이 포함된 통합 **엔드포인트** 페이지
- MCP 및 A2A에 대한 인라인 서비스 상태 토글(온라인/오프라인)
- 개요에서 전용 관리 탭으로의 링크

</details>

<details>
<summary><b>🧪 27. "실제 클라이언트와의 엔드투엔드 프로토콜 검증이 필요합니다"</b></summary>

모의 테스트는 출시 전에 프로토콜 호환성을 검증하기에 충분하지 않습니다.

**OmniRoute가 이를 해결하는 방법:**

- 앱을 부팅하고 실제 MCP SDK 클라이언트 전송을 사용하는 E2E 제품군
- 흐름 검색, 전송, 스트리밍, 가져오기 및 취소에 대한 A2A 클라이언트 테스트
- MCP 감사 및 A2A 작업 API에 대한 교차 확인 주장

</details>

<details>
<summary><b>📡 28. "모든 인터페이스에 걸쳐 통합된 관찰 가능성이 필요합니다."</b></summary>

프로토콜별로 관찰 가능성을 분할하면 사각지대가 발생하고 MTTR이 길어집니다.

**OmniRoute가 이를 해결하는 방법:**

- 대시보드/로그/분석을 하나의 제품으로 통합
- OpenAI, MCP 및 A2A 계층 전반에 걸쳐 상태 + 감사 + 원격 측정 요청
- 상태 및 자동화를 위한 운영 API

</details>

<details>
<summary><b>💼 29. "프록시 + 도구 + 에이전트 오케스트레이션을 위해 하나의 런타임이 필요합니다."</b></summary>

여러 개별 서비스를 실행하면 운영 비용과 오류 모드가 증가합니다.

**OmniRoute가 이를 해결하는 방법:**

- OpenAI 호환 프록시, MCP 서버, A2A 서버가 하나의 스택에 있음
- 공유 인증, 복원력, 데이터 저장소 및 관찰 가능성
- 모든 상호 작용 표면에 걸쳐 일관된 정책 모델

</details>

<details>
<summary><b>🚀 30. "글루 코드 확산 없이 에이전트 워크플로를 제공해야 합니다."</b></summary>

여러 임시 서비스와 스크립트를 결합할 때 팀의 속도가 느려집니다.

**OmniRoute가 이를 해결하는 방법:**

- 클라이언트와 에이전트를 위한 통합 엔드포인트 전략
- 내장된 프로토콜 관리 UI 및 연기 검증 경로
- 프로덕션 준비 기반(보안, 로깅, 탄력성, 백업)

</details>

### 플레이북 예시(통합 사용 사례)

**플레이북 A: 유료 구독 극대화 + 저렴한 백업**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**플레이북 B: 비용이 전혀 들지 않는 코딩 스택**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**플레이북 C: 연중무휴 상시 가동 폴백 체인**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**플레이북 D: MCP + A2A를 사용한 에이전트 작업**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 무료로 시작 — 구성 비용 없음

> **$0/월**로 몇 분 만에 AI 코딩을 설정할 수 있습니다. 무료 계정을 연결하고 내장된 **무료 스택** 콤보를 사용하세요.

| 단계 | 액션                                           | 제공자 잠금 해제                                                |
| ---- | ---------------------------------------------- | --------------------------------------------------------------- |
| 1    | **Kiro** 연결(AWS Builder ID OAuth)            | 클로드 소네트 4.5, 하이쿠 4.5 — **무제한**                      |
| 2    | **iFlow** 연결(Google OAuth)                   | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1... — **무제한** |
| 3    | 연결 **Qwen**(장치 코드)                       | qwen3-coder-plus, qwen3-coder-flash... — **무제한**             |
| 4    | **Gemini CLI**(Google OAuth) 연결              | gemini-3-flash, gemini-2.5-pro — **180K/월 무료**               |
| 5    | `/dashboard/combos` → **무료 스택($0)** 템플릿 | 모든 무료 공급자를 자동으로 라운드 로빈                         |

**IDE/CLI에서 다음을 지정하십시오.** `http://localhost:20128/v1` · API 키: `any-string` · 완료.

> **선택적 추가 적용 범위(무료):** Groq API 키(30RPM 무료), NVIDIA NIM(40RPM 무료, 70개 이상의 모델), Cerebras(100만 토크/일), LongCat API 키(5000만 토큰/일!), Cloudflare Workers AI(10K 뉴런/일, 50개 이상의 모델).

## ⚡ 빠른 시작

### 1) 설치 및 실행

```bash
npm install -g omniroute
omniroute
```

> **pnpm 사용자:** 설치 후 `pnpm approve-builds -g`을 실행하여 `better-sqlite3` 및 `@swc/core`에 필요한 기본 빌드 스크립트를 활성화합니다.
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

대시보드는 `http://localhost:20128`에서 열리고 API 기본 URL은 `http://localhost:20128/v1`입니다.

| 명령                    | 설명                                                            |
| ----------------------- | --------------------------------------------------------------- |
| `omniroute`             | 서버 시작(`PORT=20128`, API 및 대시보드가 ​​동일한 포트에 있음) |
| `omniroute --port 3000` | 표준/API 포트를 3000으로 설정                                   |
| `omniroute --mcp`       | MCP 서버 시작(stdio 전송)                                       |
| `omniroute --no-open`   | 브라우저를 자동으로 열지 않음                                   |
| `omniroute --help`      | 도움말 표시                                                     |

선택적 분할 포트 모드:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) 공급자 연결 및 API 키 생성

1. 대시보드 → `Providers`을 열고 하나 이상의 공급자(OAuth 또는 API 키)를 연결합니다.
2. 대시보드 → `Endpoints`을 열고 API 키를 생성합니다.
3. (선택 사항) 대시보드 → `Combos`을 열고 폴백 체인을 설정합니다.

### 3) 코딩 도구로 OmniRoute를 지정합니다.

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode 및 OpenAI 호환 SDK와 함께 작동합니다.

### 4) 프로토콜 활성화 및 유효성 검사(v2.0)

**MCP(도구 기반 작업용):**

```bash
omniroute --mcp
```

그런 다음 `stdio`을 통해 MCP 클라이언트를 연결하고 다음과 같은 테스트 도구를 사용하십시오.

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A(에이전트 간 워크플로용):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) 모든 것을 처음부터 끝까지 확인하세요(권장)

```bash
npm run test:protocols:e2e
```

이 제품군은 실행 중인 앱에 대해 실제 MCP 및 A2A 클라이언트 흐름의 유효성을 검사합니다.

### 대안: 소스에서 실행

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 도커

OmniRoute는 [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute)에서 공개 Docker 이미지로 사용할 수 있습니다.

**빠른 실행:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**환경 파일 포함:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Docker Compose 사용:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| 이미지                   | 태그     | 사이즈 | 설명             |
| ------------------------ | -------- | ------ | ---------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | 최신 안정 릴리스 |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB | 현재 버전        |

---

## 🖥️ 데스크톱 앱 — 오프라인 및 상시 접속

> 🆕 **신규!** 이제 OmniRoute를 Windows, macOS, Linux용 **기본 데스크톱 애플리케이션**으로 사용할 수 있습니다.

OmniRoute를 독립형 데스크톱 앱으로 실행하세요. 로컬 모델에는 터미널, 브라우저, 인터넷이 필요하지 않습니다. Electron 기반 앱에는 다음이 포함됩니다.

- 🖥️ **기본 창** — 시스템 트레이 통합이 가능한 전용 앱 창
- 🔄 **자동 시작** — 시스템 로그인 시 OmniRoute 실행
- 🔔 **기본 알림** — 할당량 소진 또는 공급자 문제에 대한 알림 받기
- ⚡ **원클릭 설치** — NSIS(Windows), DMG(macOS), AppImage(Linux)
- 🌐 **오프라인 모드** — 번들 서버를 사용하여 완전히 오프라인으로 작동

### 빠른 시작

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### 시스템 트레이

최소화되면 OmniRoute는 빠른 작업을 통해 시스템 트레이에 표시됩니다.

- 대시보드 열기
- 서버 포트 변경
- 애플리케이션 종료

📖 전체 문서: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 가격 한눈에 보기

| 계층          | 공급자                  | 비용                            | 할당량 재설정   | 최고의 대상                            |
| ------------- | ----------------------- | ------------------------------- | --------------- | -------------------------------------- |
| **💳 구독**   | 클로드 코드 (Pro)       | $20/월                          | 5시간 + 매주    | 이미 구독 중                           |
|               | 코덱스(플러스/프로)     | $20-200/월                      | 5시간 + 매주    | OpenAI 사용자                          |
|               | 제미니 CLI              | **무료**                        | 180K/월 + 1K/일 | 모든 사람!                             |
|               | GitHub 부조종사         | $10-19/월                       | 월간            | GitHub 사용자                          |
| **🔑 API 키** | 엔비디아 NIM            | **무료**(영원한 개발)           | ~40RPM          | 70개 이상의 공개 모델                  |
|               | 대뇌                    | **무료** (100만 톡/일)          | 60K TPM/30RPM   | 세계에서 가장 빠른                     |
|               | 그로크                  | **무료**(30RPM)                 | 14.4KRPD        | 초고속 라마/젬마                       |
|               | DeepSeek V3.2           | 100만 달러당 $0.27/$1.10        | 없음            | 최고의 가격/품질 추론                  |
|               | xAI Grok-4 고속         | **100만 달러당 $0.20/$0.50** 🆕 | 없음            | 가장 빠른 + 도구 호출, 초저            |
|               | xAI Grok-4(표준)        | 100만 달러당 $0.20/$1.50 🆕     | 없음            | xAI의 추론 주력                        |
|               | 미스트랄                | 무료 평가판 + 유료              | 요금 제한       | 유럽의 AI                              |
|               | 오픈라우터              | 종량제                          | 없음            | 100개 이상의 모델이 결합되어 있습니다. |
| **💰 저렴한** | GLM-5(Z.AI를 통해) 🆕   | $0.5/1M                         | 매일 오전 10시  | 128K 출력, 최신 플래그십               |
|               | GLM-4.7                 | $0.6/1M                         | 매일 오전 10시  | 예산 백업                              |
|               | 미니맥스 M2.5 🆕        | $0.3/1M 입력                    | 5시간 롤링      | 추론 + 에이전트 작업                   |
|               | 미니맥스 M2.1           | $0.2/1M                         | 5시간 롤링      | 가장 저렴한 옵션                       |
|               | Kimi K2.5(문샷 API) 🆕  | 종량제                          | 없음            | 직접 Moonshot API 액세스               |
|               | 키미 K2                 | $9/월 정액                      | 1000만 토큰/월  | 예측 가능한 비용                       |
| **🆓 무료**   | 아이플로우              | **$0**                          | 무제한          | 5개 모델 무제한                        |
|               | 퀀                      | **$0**                          | 무제한          | 4개 모델 무제한                        |
|               | 키로                    | **$0**                          | 무제한          | 클로드 소네트/하이쿠(AWS 빌더)         |
|               | LongCat 플래시라이트 🆕 | **$0** (5천만 토크/일 🔥)       | 1RPS            | 지구상에서 가장 큰 무료 할당량         |
|               | 수분 AI 🆕              | **$0** (열쇠 필요 없음)         | 요청 1개/15초   | GPT-5, 클로드, DeepSeek, 라마 4        |
|               | Cloudflare 작업자 AI 🆕 | **$0** (10,000개의 뉴런/일)     | ~150회/일       | 50개 이상의 모델, 글로벌 엣지          |
|               | 스케일웨이 AI 🆕        | **$0** (총 1백만 토큰)          | 요금 제한       | EU/GDPR, Qwen3 235B, 라마 70B          |

> 🆕 **새 모델 추가됨(2026년 3월):** $0.20/$0.50/M의 Grok-4 Fast 제품군(1143ms로 벤치마크 — Gemini 2.5 플래시보다 30% 빠름), 128K 출력의 Z.AI를 통한 GLM-5, MiniMax M2.5 추론, DeepSeek V3.2 업데이트된 가격, Moonshot 직접 API를 통한 Kimi K2.5.

**💡 $0 콤보 스택 — 완전한 무료 설정:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

**비용이 0입니다. 코딩을 중단하지 마십시오.** 이를 하나의 OmniRoute 콤보로 구성하면 모든 폴백이 자동으로 수행됩니다. 수동 전환이 필요하지 않습니다.

---

---

## 🆓 무료 모델 — 실제로 얻을 수 있는 것

> 아래의 모든 모델은 **신용카드가 필요 없이 100% 무료**입니다. 하나의 할당량이 소진되면 OmniRoute는 둘 사이를 자동으로 라우팅합니다. 이를 모두 결합하여 깨지지 않는 $0 콤보를 만듭니다.

### 🔵 CLAUDE 모델(Kiro를 통해 — AWS Builder ID)

| 모델                | 접두사 | 한도       | 비율 제한             |
| ------------------- | ------ | ---------- | --------------------- |
| `claude-sonnet-4.5` | `kr/`  | **무제한** | 보고된 일일 한도 없음 |
| `claude-haiku-4.5`  | `kr/`  | **무제한** | 보고된 일일 한도 없음 |
| `claude-opus-4.6`   | `kr/`  | **무제한** | Kiro를 통한 최신 Opus |

### 🟢 IFLOW 모델(무료 OAuth — 신용카드 없음)

| 모델               | 접두사 | 한도       | 비율 제한        |
| ------------------ | ------ | ---------- | ---------------- |
| `kimi-k2-thinking` | `if/`  | **무제한** | 보고된 한도 없음 |
| `qwen3-coder-plus` | `if/`  | **무제한** | 보고된 한도 없음 |
| `deepseek-r1`      | `if/`  | **무제한** | 보고된 한도 없음 |
| `minimax-m2.1`     | `if/`  | **무제한** | 보고된 한도 없음 |
| `kimi-k2`          | `if/`  | **무제한** | 보고된 한도 없음 |

### 🟡 QWEN 모델(장치 코드 인증)

| 모델                | 접두사 | 한도       | 비율 제한         |
| ------------------- | ------ | ---------- | ----------------- |
| `qwen3-coder-plus`  | `qw/`  | **무제한** | 보고된 한도 없음  |
| `qwen3-coder-flash` | `qw/`  | **무제한** | 보고된 한도 없음  |
| `qwen3-coder-next`  | `qw/`  | **무제한** | 보고된 한도 없음  |
| `vision-model`      | `qw/`  | **무제한** | 다중 모드(이미지) |

### 🟣 GEMINI CLI(Google OAuth)

| 모델                     | 접두사 | 한도                   | 비율 제한   |
| ------------------------ | ------ | ---------------------- | ----------- |
| `gemini-3-flash-preview` | `gc/`  | **180K 톡/월** + 1K/일 | 월별 재설정 |
| `gemini-2.5-pro`         | `gc/`  | 180K/월(공유 풀)       | 고품질      |

### ⚫ NVIDIA NIM(무료 API 키 — build.nvidia.com)

| 계층         | 일일 한도      | 비율 제한  | 메모                                                  |
| ------------ | -------------- | ---------- | ----------------------------------------------------- |
| 무료(개발자) | 토큰 한도 없음 | **~40RPM** | 70개 이상의 모델; 2025년 중반 순수 비율 제한으로 전환 |

인기 있는 무료 모델: `moonshotai/kimi-k2.5`(Kimi K2.5), `z-ai/glm4.7`(GLM 4.7), `deepseek-ai/deepseek-v3.2`(DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS(무료 API 키 — inference.cerebras.ai)

| 계층 | 일일 한도         | 비율 제한     | 메모                                     |
| ---- | ----------------- | ------------- | ---------------------------------------- |
| 무료 | **100만 토큰/일** | 60K TPM/30RPM | 세계에서 가장 빠른 LLM 추론; 매일 재설정 |

무료로 사용 가능: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ(무료 API 키 — console.groq.com)

| 계층 | 일일 한도     | 비율 제한    | 메모                                   |
| ---- | ------------- | ------------ | -------------------------------------- |
| 무료 | **14,400RPD** | 모델당 30RPM | 신용카드 없음; 429 한도, 청구되지 않음 |

무료로 사용 가능: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI(무료 API 키 — longcat.chat) 🆕

| 모델                          | 접두사 | 일일 무료 할당량    | 메모                         |
| ----------------------------- | ------ | ------------------- | ---------------------------- |
| `LongCat-Flash-Lite`          | `lc/`  | **5천만 토큰** 품목 | 사상 최대 규모의 무료 할당량 |
| `LongCat-Flash-Chat`          | `lc/`  | 50만 토큰           | 다단계 채팅                  |
| `LongCat-Flash-Thinking`      | `lc/`  | 50만 토큰           | 추론 / CoT                   |
| `LongCat-Flash-Thinking-2601` | `lc/`  | 50만 토큰           | 2026년 1월 버전              |
| `LongCat-Flash-Omni-2603`     | `lc/`  | 50만 토큰           | 다중 모드                    |

> 공개 베타 버전에서는 100% 무료입니다. 이메일이나 전화로 [longcat.chat](https://longcat.chat)에 가입하세요. 매일 00:00 UTC에 재설정됩니다.

### 🟢 POLLINATIONS AI(API 키 필요 없음) 🆕

| 모델       | 접두사 | 비율 제한     | 뒤에 공급자          |
| ---------- | ------ | ------------- | -------------------- |
| `openai`   | `pol/` | 요청 1개/15초 | GPT-5                |
| `claude`   | `pol/` | 요청 1개/15초 | 인류학 클로드        |
| `gemini`   | `pol/` | 요청 1개/15초 | 구글 제미니          |
| `deepseek` | `pol/` | 요청 1개/15초 | DeepSeek V3          |
| `llama`    | `pol/` | 요청 1개/15초 | 메타 라마 4 스카우트 |
| `mistral`  | `pol/` | 요청 1개/15초 | 미스트랄 AI          |

> ✨ **마찰 없음:** 가입이나 API 키가 없습니다. 빈 키 필드가 있는 Pollinations 공급자를 추가하면 즉시 작동합니다.

### 🟠 CLOUDFLARE WORKERS AI(무료 API 키 — cloudflare.com) 🆕

| 계층 | 일일 뉴런  | 동등한 사용법                             | 메모                          |
| ---- | ---------- | ----------------------------------------- | ----------------------------- |
| 무료 | **10,000** | ~150 LLM 응답 / 500초 오디오 / 15K 임베드 | 글로벌 에지, 50개 이상의 모델 |

인기 있는 무료 모델: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo`(무료 오디오!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> [dash.cloudflare.com](https://dash.cloudflare.com)의 API 토큰 + 계정 ID가 필요합니다. 공급자 설정에 계정 ID를 저장합니다.

### 🟣 SCALEWAY AI(100만 개의 무료 토큰 — scaleway.com) 🆕

| 계층 | 무료 할당량         | 위치        | 메모                                       |
| ---- | ------------------- | ----------- | ------------------------------------------ |
| 무료 | **100만 개의 토큰** | 🇫🇷 파리, EU | 한도 내에서는 신용카드가 필요하지 않습니다 |

무료로 사용 가능: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> EU/GDPR을 준수합니다. [console.scaleway.com](https://console.scaleway.com)에서 API 키를 받으세요.

> **💡 최고의 무료 스택(11개 제공자, 영원히 $0):**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ 무료 전사 콤보

> **$0**에 모든 오디오/비디오 전사 — Deepgram이 무료로 200달러, AssemblyAI가 50달러로 대체, Groq Whisper를 무제한 긴급 백업으로 제공합니다.

| 공급자            | 무료 크레딧          | 최고의 모델                                | 비율 제한                           |
| ----------------- | -------------------- | ------------------------------------------ | ----------------------------------- |
| 🟢 **딥그램**     | **$200 무료** (가입) | `nova-3` — 최고의 정확성, 30개 이상의 언어 | 무료 크레딧에는 RPM 제한이 없습니다 |
| 🔵 **AssemblyAI** | **$50 무료**(가입)   | `universal-3-pro` — 장, 감정, PII          | 무료 크레딧에는 RPM 제한이 없습니다 |
| 🔴 **그로크**     | **영원히 무료**      | `whisper-large-v3` — OpenAI 속삭임         | 30RPM(속도 제한)                    |

**`/dashboard/combos`의 제안된 콤보:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

그런 다음 `/dashboard/media` → **기록** 탭에서 오디오 또는 비디오 파일을 업로드하고 → 콤보 엔드포인트를 선택하고 → 지원되는 형식으로 기록을 가져옵니다.

## 💡 주요 기능

OmniRoute v2.0은 단순한 릴레이 프록시가 아닌 운영 플랫폼으로 구축되었습니다.

### 🆕 신규 — ClawRouter에서 영감을 받은 개선 사항(2026년 3월)

| 기능                             | 그것이 하는 일                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 빠른 제품군**        | $0.20/$0.50/M의 xAI 모델 — 벤치마크 1143ms(Gemini 2.5 Flash보다 30% 빠름)                            |
| 🧠 **Z.AI를 통한 GLM-5**         | 128K 출력 컨텍스트, $0.5/1M — GLM 제품군의 최신 플래그십                                             |
| 🔮 **미니맥스 M2.5**             | $0.30/1M의 추론 + 에이전트 작업 — M2.1에서 대폭 업그레이드                                           |
| 🎯 **모델별 toolCalling 플래그** | 레지스트리의 모델별 `toolCalling: true/false` — AutoCombo는 도구를 사용할 수 없는 모델을 건너뜁니다. |
| 🌍 **다국어 의도 감지**          | AutoCombo 채점의 PT/ZH/ES/AR 키워드 — 영어가 아닌 콘텐츠에 대한 더 나은 모델 선택                    |
| 📊 **벤치마크 기반 폴백**        | 라이브 요청의 실제 p95 대기 시간은 콤보 점수를 제공합니다. AutoCombo는 실제 데이터에서 학습합니다    |
| 🔁 **중복 제거 요청**            | 콘텐츠 해시 기반 중복 제거 창 — 다중 에이전트 안전, 중복 청구 방지                                   |
| 🔌 **플러그형 라우터 전략**      | 확장 가능한 `RouterStrategy` 인터페이스 — 사용자 정의 라우팅 논리를 플러그인으로 추가                |

### 🚀 이전 v2.0.9+ — 플레이그라운드, CLI 지문 및 ACP

| 기능                                          | 그것이 하는 일                                                                                                                                                                                                                                                             |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **모델 놀이터**                            | 모든 모델을 직접 테스트할 수 있는 대시보드 페이지 — 제공자/모델/엔드포인트 선택기, 모나코 편집기, 스트리밍, 중단, 타이밍                                                                                                                                                   |
| 🔏 **CLI 지문 매칭**                          | 기본 CLI 서명과 일치하도록 공급자별 헤더/본문 순서 - 설정 > 보안에서 공급자별로 전환합니다. **프록시 IP는 보존됩니다**                                                                                                                                                     |
| 🤝 **ACP 지원(에이전트 클라이언트 프로토콜)** | CLI 에이전트 검색(Codex, Claude, Goose, Gemini CLI, OpenClaw + 9개 이상), 프로세스 생성기, `/api/acp/agents` 엔드포인트                                                                                                                                                    |
| 🤖 **ACP 상담원 대시보드**                    | 디버그 › 에이전트 페이지 — 모든 CLI 도구에 대한 설치 상태, 버전, 사용자 지정 에이전트 양식이 포함된 14개 에이전트의 그리드입니다. **OpenCode** 사용자에게는 사용 가능한 모든 모델과 함께 즉시 사용 가능한 구성을 자동 생성하는 "opencode.json 다운로드" 버튼이 표시됩니다. |
| 🔧 **사용자 정의 모델 `apiFormat` 라우팅**    | `apiFormat: "responses"`을 사용하는 사용자 정의 모델은 이제 Responses API 번역기로 올바르게 라우팅됩니다.                                                                                                                                                                  |
| 🏢 **Codex 작업 공간 격리**                   | 이메일당 여러 Codex 작업 공간 - OAuth는 작업 공간 ID로 연결을 올바르게 구분합니다                                                                                                                                                                                          |
| 🔄 **전자 자동 업데이트**                     | 데스크탑 앱에서 업데이트 확인 + 재시작 시 자동 설치                                                                                                                                                                                                                        |

### 🤖 에이전트 및 프로토콜 운영(v2.0)

| 기능                               | 그것이 하는 일                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 🔧 **MCP 서버(16개 도구)**         | 3가지 전송을 통한 IDE/에이전트 도구: stdio, SSE(`/api/mcp/sse`), 스트리밍 가능 HTTP(`/api/mcp/stream`) |
| 🤝 **A2A 서버(JSON-RPC + SSE)**    | 동기화 및 스트리밍 흐름을 통한 에이전트 간 작업 실행                                                   |
| 🧭 **통합 엔드포인트 페이지**      | 엔드포인트 프록시, MCP, A2A 및 API 엔드포인트 탭이 있는 탭 관리 페이지                                 |
| 🎚️ **서비스 활성화/비활성화 토글** | 설정 지속성을 갖춘 MCP 및 A2A용 ON/OFF 스위치(기본값: OFF)                                             |
| 🛰️ **MCP 런타임 하트비트**         | 실제 프로세스 상태(pid, 가동 시간, 하트비트 기간, 전송, 범위 모드)                                     |
| 📋 **MCP 감사 추적**               | 성공/실패 및 주요 속성이 포함된 필터링 가능한 감사 로그                                                |
| 🔐 **MCP 범위 적용**               | 제어된 도구 액세스를 위한 9개의 세부적인 범위 권한                                                     |
| 📡 **A2A 작업 수명주기 관리**      | 작업 나열/필터링, 이벤트/아티팩트 검사, 실행 중인 작업 취소                                            |
| 📋 **에이전트 카드 검색**          | 클라이언트 자동 검색을 위한 `/.well-known/agent.json`                                                  |
| 🧪 **프로토콜 E2E 테스트 하네스**  | `test:protocols:e2e`의 실제 MCP SDK + A2A 클라이언트 흐름                                              |
| ⚙️ **작동 제어**                   | 하나의 제어 표면에서 콤보 전환, 탄력성 프로필 적용, 차단기 재설정                                      |

### 🧠 라우팅 및 인텔리전스

| 기능                           | 그것이 하는 일                                                    |
| ------------------------------ | ----------------------------------------------------------------- |
| 🎯 **스마트 4계층 폴백**       | 자동 경로: 구독 → API 키 → 저렴한 → 무료                          |
| 📊 **실시간 할당량 추적**      | 라이브 토큰 수 + 공급자별 카운트다운 재설정                       |
| 🔄 **형식 번역**               | OpenAI ⇔ Claude ⇔ Gemini ⇔ 스키마 안전 변환을 통한 응답           |
| 👥 **다중 계정 지원**          | 지능적인 선택을 통해 공급자당 여러 계정                           |
| 🔄 **자동 토큰 새로고침**      | 재시도 시 OAuth 토큰이 자동으로 새로 고쳐집니다.                  |
| 🎨 **맞춤형 콤보**             | 6가지 밸런싱 전략 + 폴백 체인 제어                                |
| 🌐 **와일드카드 라우터**       | `provider/*` 동적 라우팅                                          |
| 🧠 **사고 예산 통제**          | 통과, 자동, 사용자 정의 및 적응형 추론 제한                       |
| 🔀 **모델 별칭**               | 내장 + 사용자 정의 모델 앨리어싱 및 마이그레이션 안전             |
| ⚡ **배경 저하**               | 우선순위가 낮은 백그라운드 작업을 저렴한 모델로 라우팅            |
| 🧪 **작업 인식 스마트 라우팅** | 콘텐츠 유형별 모델 자동 선택(코딩/비전/분석/요약)                 |
| 💬 **시스템 프롬프트 삽입**    | 일관되게 적용되는 글로벌 행동 제어                                |
| 📄 **응답 API 호환성**         | Codex 및 고급 에이전트 작업 흐름에 대한 전체 `/v1/responses` 지원 |

### 🎵 다중 모드 API

| 기능                    | 그것이 하는 일                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **이미지 생성**      | `/v1/images/generations`(클라우드 및 로컬 백엔드 포함)                                                                                                        |
| 📐 **임베딩**           | 검색 및 RAG 파이프라인용 `/v1/embeddings`                                                                                                                     |
| 🎤 **오디오 전사**      | `/v1/audio/transcriptions` — 7개 공급자(Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), 자동 언어 감지, MP4/MP3/WAV 지원  |
| 🔊 **텍스트 음성 변환** | `/v1/audio/speech` — 올바른 오류 메시지가 있는 10개 공급자(ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) |
| 🎬 **비디오 생성**      | `/v1/videos/generations`(ComfyUI + SD WebUI 워크플로)                                                                                                         |
| 🎵 **음악 세대**        | `/v1/music/generations`(ComfyUI 워크플로)                                                                                                                     |
| 🛡️ **조정**             | `/v1/moderations` 안전 확인                                                                                                                                   |
| 🔀 **재순위**           | 관련성 점수를 위한 `/v1/rerank`                                                                                                                               |
| 🔍 **웹 검색** 🆕       | `/v1/search` — 5개 공급자(Serper, Brave, Perplexity, Exa, Tavily), 월 6,500개 이상의 무료, 자동 장애 조치, 캐시                                               |

### 🛡️ 탄력성, 보안 및 거버넌스

| 기능                           | 그것이 하는 일                                                              |
| ------------------------------ | --------------------------------------------------------------------------- |
| 🔌 **회로 차단기**             | 임계값 제어를 통한 모델별 트립/복구                                         |
| 🎯 **엔드포인트 인식 모델**    | 사용자 정의 모델은 지원되는 엔드포인트 + API 형식을 선언합니다              |
| 🛡️ **천둥 방지 무리**          | 재시도/비율 이벤트에 대한 뮤텍스 + 세마포어 보호                            |
| 🧠 **의미 + 서명 캐시**        | 두 개의 캐시 레이어로 비용/지연 시간 감소                                   |
| ⚡ **멱등성 요청**             | 중복 보호 창                                                                |
| 🔒 **TLS 지문 스푸핑**         | 브라우저와 유사한 TLS 지문 — **봇 감지 및 계정 플래그 지정 감소**           |
| 🔏 **CLI 지문 매칭**           | 기본 CLI 요청 서명과 일치 — **프록시 IP를 보존하면서 금지 위험을 줄입니다** |
| 🌐 **IP 필터링**               | 노출된 배포에 대한 허용 목록/차단 목록 제어                                 |
| 📊 **편집 가능한 속도 제한**   | 지속성을 통해 구성 가능한 전역/공급자 수준 제한                             |
| 🔑 **API 키 관리 + 범위 지정** | 보안 키 발급/교체 및 모델/공급자 제어                                       |
| 🛡️ **보호되는 `/models`**      | 모델 카탈로그에 대한 선택적 인증 게이팅 및 공급자 숨기기                    |

### 📊 관찰 가능성 및 분석

| 기능                      | 그것이 하는 일                                  |
| ------------------------- | ----------------------------------------------- |
| 📝 **요청 + 프록시 로깅** | 전체 요청/응답 및 프록시 로깅                   |
| 📋 **통합 로그 대시보드** | 한 페이지에서 요청, 프록시, 감사 및 콘솔 보기   |
| 🔍 **원격 측정 요청**     | p50/p95/p99 대기 시간 및 요청 추적              |
| 🏥 **건강 대시보드**      | 가동 시간, 차단기 상태, 잠금, 캐시 통계         |
| 💰 **비용 추적**          | 예산 제어 및 모델별 가격 가시성                 |
| 📈 **분석 시각화**        | 모델/공급자 사용량 통찰력 및 추세 보기          |
| 🧪 **평가 프레임워크**    | 구성 가능한 매치 전략을 사용한 골든 세트 테스트 |

### ☁️ 배포 및 플랫폼

| 기능                               | 그것이 하는 일                                        |
| ---------------------------------- | ----------------------------------------------------- | ------------------ |
| 🌐 **어디서나 배포**               | 로컬호스트, VPS, Docker, 클라우드 환경                |
| 💾 **클라우드 동기화**             | 클라우드 작업자를 통한 구성 동기화                    |
| 🔄 **백업/복원**                   | 내보내기/가져오기 및 재해 복구 흐름                   |
| 🧙 **온보딩 마법사**               | 첫 실행 안내 설정                                     |
| 🔧 **CLI 도구 대시보드**           | 널리 사용되는 코딩 도구를 위한 원클릭 설정            |
| 🎮 **모델 놀이터**                 | 대시보드에서 공급자/모델/엔드포인트 테스트            |
| 🔏 **CLI 지문 토글**               | 설정 > 보안                                           | 공급자별 지문 일치 |
| 🌐 **i18n(30개 언어)**             | RTL 적용 범위를 포함한 전체 대시보드 + 문서 언어 지원 |
| 🧹 **모든 모델 지우기**            | 공급자 세부정보에서 원클릭 모델 목록 삭제             |
| 📋 **이슈 템플릿**                 | 버그 및 기능을 위한 표준화된 GitHub 템플릿            |
| 📂 **사용자 정의 데이터 디렉터리** | `DATA_DIR` 저장 위치 재정의                           |

### 기능 심층 분석

#### 실용적인 비용 관리를 통한 스마트 폴백

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

할당량, 속도 또는 상태가 실패하면 OmniRoute는 수동 전환 없이 자동으로 다음 후보로 이동합니다.

#### 눈에 보이고 작동 가능한 프로토콜 관리

- MCP + A2A는 UI 및 문서에서 검색 가능합니다(숨겨지지 않음).
- 프로토콜 상태 API는 실시간 운영 데이터를 노출합니다(`/api/mcp/*`, `/api/a2a/*`).
- 대시보드에는 2일차 작업에 대한 작업이 포함됩니다(콤보 토글, 차단기 재설정, 작업 취소).

#### 번역기 + 검증 작업 흐름

번역기 영역에는 다음이 포함됩니다.

- **플레이그라운드**: 변환 확인 요청
- **채팅 테스터**: 전체 요청/응답 왕복
- **테스트 벤치**: 한 번에 여러 사례 실행
- **라이브 모니터**: 실시간 교통 상황 보기

`npm run test:protocols:e2e`을 통해 실제 클라이언트를 사용한 프로토콜 검증도 가능합니다.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — 도구 참조, IDE 구성 및 클라이언트 예
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — 기술, JSON-RPC 방법, 스트리밍 및 작업 수명 주기

## 🧪 평가(Evals)

OmniRoute에는 골든 세트에 대해 LLM 응답 품질을 테스트하기 위한 내장 평가 프레임워크가 포함되어 있습니다. 대시보드의 **분석 → 평가**를 통해 액세스하세요.

### 내장 골든 세트

사전 로드된 "OmniRoute Golden Set"에는 다음에 대한 테스트 사례가 포함되어 있습니다.

- 인사말, 수학, 지리, 코드 생성
- JSON 형식 준수, 번역, 마크다운 생성
- 안전 거부(유해 콘텐츠), 카운팅, 부울 논리

### 평가 전략

| 전략       | 설명                                                           | 예                               |
| ---------- | -------------------------------------------------------------- | -------------------------------- |
| `exact`    | 출력은 정확히 일치해야 합니다                                  | `"4"`                            |
| `contains` | 출력에는 하위 문자열(대소문자 구분 안 함)이 포함되어야 합니다. | `"Paris"`                        |
| `regex`    | 출력은 정규식 패턴과 일치해야 합니다                           | `"1.*2.*3"`                      |
| `custom`   | 사용자 정의 JS 함수가 true/false를 반환합니다.                 | `(output) => output.length > 10` |

---

## 📖 설정 가이드

### 프로토콜 설정(MCP + A2A)

<details>
<summary><b>🧩 MCP 설정(모델 컨텍스트 프로토콜)</b></summary>

stdio 모드에서 MCP 전송을 시작합니다.

```bash
omniroute --mcp
```

권장되는 검증 흐름:

1. stdio를 통해 MCP 클라이언트를 연결합니다.
2. `omniroute_get_health`을 실행합니다.
3. `omniroute_list_combos`을 실행합니다.
4. `/dashboard/mcp`을 열어 하트비트, 활동 및 감사를 확인합니다.

자동화에 유용한 API:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A 설정(Agent2Agent)</b></summary>

에이전트를 검색합니다.

```bash
curl http://localhost:20128/.well-known/agent.json
```

작업 보내기:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

수명주기 관리:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

운영 UI:

- 작업/상태/스트림 관찰 가능성 및 연기 작업을 위한 `/dashboard/a2a`

</details>

<details>
<summary><b>🧪 종단 간 프로토콜 검증</b></summary>

실제 클라이언트에서 두 프로토콜을 모두 검증합니다.

```bash
npm run test:protocols:e2e
```

이는 다음을 확인합니다.

- MCP SDK 클라이언트 연결/목록/호출
- A2A 검색/전송/스트리밍/가져오기/취소
- MCP 감사 및 A2A 작업 관리 API의 데이터 교차 확인

</details>

<details>
<summary><b>💳 구독 제공업체</b></summary>

### 클로드 코드(Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**프로 팁:** 복잡한 작업에는 Opus를 사용하고, 속도를 높이려면 Sonnet을 사용하세요. OmniRoute는 모델당 할당량을 추적합니다!

### OpenAI 코덱스(Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### 코덱스 계정 한도 관리(5시간 + 주간)

이제 각 Codex 계정에는 `Dashboard -> Providers`에 정책 토글이 있습니다.

- `5h` (ON/OFF): 5시간 창 임계값 정책을 시행합니다.
- `Weekly` (ON/OFF): 주간 창 임계값 정책을 시행합니다.
- 임계값 동작: 활성화된 창이 사용량의 90% 이상에 도달하면 해당 계정을 건너뜁니다.
- 순환 동작: OmniRoute는 자동으로 다음 적격 Codex 계정으로 라우팅합니다.
- 동작 재설정: 공급자 `resetAt` 시간이 지나면 계정이 자동으로 다시 자격을 갖추게 됩니다.

시나리오:

- `5h ON` + `Weekly ON`: 두 창이 임계값에 도달하면 계정을 건너뜁니다.
- `5h OFF` + `Weekly ON`: 주간 사용량만 계정을 차단할 수 있습니다.
- `5h ON` + `Weekly OFF`: 5시간 동안만 사용하면 계정이 차단될 수 있습니다.
- `resetAt` 통과: 계정이 자동으로 순환을 다시 시작합니다(수동 재활성화 없음).

### Gemini CLI(월 180,000 무료!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**최고의 가치:** 엄청난 무료 등급! 유료 등급 이전에 사용하세요.

### GitHub 코파일럿

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 API 키 제공자</b></summary>

### NVIDIA NIM(무료 개발자 액세스 — 70개 이상의 모델)

1. 가입: [build.nvidia.com](https://build.nvidia.com)
2. 무료 API 키 받기(1000 추론 크레딧 포함)
3. 대시보드 → 공급자 추가 → NVIDIA NIM:
   - API 키: `nvapi-your-key`

**모델:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` 외 50개 이상

**프로 팁:** OpenAI 호환 API — OmniRoute의 형식 변환과 원활하게 작동합니다!

### 딥시크

1. 가입: [platform.deepseek.com](https://platform.deepseek.com)
2. API 키 받기
3. 대시보드 → 공급자 추가 → DeepSeek

**모델:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq(무료 등급 사용 가능!)

1. 가입: [console.groq.com](https://console.groq.com)
2. API 키 받기(무료 등급 포함)
3. 대시보드 → 공급자 추가 → Groq

**모델:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**프로 팁:** 초고속 추론 — 실시간 코딩에 가장 적합합니다!

### OpenRouter(100개 이상의 모델)

1. 가입: [openrouter.ai](https://openrouter.ai)
2. API 키 받기
3. 대시보드 → 공급자 추가 → OpenRouter

**모델:** 단일 API 키를 통해 모든 주요 제공업체의 100개 이상의 모델에 액세스할 수 있습니다.

</details>

<details>
<summary><b>💰 저렴한 공급자(백업)</b></summary>

### GLM-4.7 (일일 재설정, $0.6/1M)

1. 가입: [Zhipu AI](https://open.bigmodel.cn/)
2. Coding Plan에서 API Key 받기
3. 대시보드 → API 키 추가:
   - 제공자: `glm`
   - API 키: `your-key`

**사용:** `glm/glm-4.7`

**프로 팁:** 코딩 계획은 1/7 비용으로 3배 할당량을 제공합니다! 매일 오전 10시에 초기화됩니다.

### MiniMax M2.1(5시간 재설정, $0.20/1M)

1. 가입: [MiniMax](https://www.minimax.io/)
2. API 키 받기
3. 대시보드 → API Key 추가

**사용:** `minimax/MiniMax-M2.1`

**프로 팁:** 긴 컨텍스트(100만 토큰)를 위한 가장 저렴한 옵션입니다!

### Kimi K2($9/월 정액)

1. 구독: [Moonshot AI](https://platform.moonshot.ai/)
2. API 키 받기
3. 대시보드 → API Key 추가

**사용:** `kimi/kimi-latest`

**프로 팁:** 1,000만 토큰에 대해 고정 $9/월 = $0.90/1M 유효 비용!

</details>

<details>
<summary><b>🆓 무료 제공업체(긴급 백업)</b></summary>

### iFlow(OAuth를 통한 5개 무료 모델)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen(장치 코드를 통한 4개의 무료 모델)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### 키로(클로드 프리)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 콤보 만들기</b></summary>

### 예시 1: 구독 최대화 → 저렴한 백업

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### 예시 2: 무료 전용(비용 없음)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 CLI 통합</b></summary>

### 커서 IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### 클로드 코드

원클릭 구성을 위해 대시보드의 **CLI 도구** 페이지를 사용하거나 `~/.claude/settings.json`을 수동으로 편집하세요.

### 코덱스 CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### 오픈클로

**옵션 1 - 대시보드(권장):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**옵션 2 - 수동:** `~/.openclaw/openclaw.json` 편집:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **참고:** OpenClaw는 로컬 OmniRoute에서만 작동합니다. IPv6 확인 문제를 방지하려면 `localhost` 대신 `127.0.0.1`을 사용하세요.

### 클라인 / 계속 / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### 오픈코드

**1단계:** OmniRoute를 사용자 지정 공급자로 추가합니다.

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**2단계:** 프로젝트 루트에서 `opencode.json`을 생성/편집합니다.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**3단계:** OpenCode에서 모델을 선택합니다.

```bash
/models
# Select any OmniRoute model from the list
```

> **팁:** OmniRoute `/v1/models` 엔드포인트에서 사용 가능한 모델을 `models` 섹션에 추가하세요. OmniRoute 대시보드에서 `provider/model-id` 형식을 사용하세요.

</details>

---

## 🐛 문제 해결

<details>
<summary><b>문제 해결 가이드를 확장하려면 클릭하세요</b></summary>

**"언어 모델이 메시지를 제공하지 않았습니다"**

- 공급자 할당량 소진 → 대시보드 할당량 추적기 확인
- 해결 방법: 콤보 폴백을 사용하거나 더 저렴한 계층으로 전환하세요.

**비율 제한**

- 구독 할당량 초과 → GLM/MiniMax로 대체
- 콤보 추가: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth 토큰이 만료되었습니다**

- OmniRoute에 의해 자동 새로고침
- 문제가 지속되는 경우: Dashboard → Provider → Reconnect

**높은 비용**

- 대시보드 → 비용에서 사용 통계를 확인하세요.
- 기본 모델을 GLM/MiniMax로 전환
- 중요하지 않은 작업에는 무료 계층(Gemini CLI, iFlow)을 사용합니다.

**대시보드/API 포트가 잘못되었습니다**

- `PORT`은 표준 기본 포트(및 기본적으로 API 포트)입니다.
- `API_PORT`은 OpenAI 호환 API 리스너만 재정의합니다.
- `DASHBOARD_PORT`은 대시보드/Next.js 리스너만 재정의합니다.
- `NEXT_PUBLIC_BASE_URL`을 대시보드/공개 URL로 설정합니다(OAuth 콜백용).

**클라우드 동기화 오류**

- `BASE_URL`이 실행 중인 인스턴스를 가리키는지 확인합니다.
- `CLOUD_URL`이 예상 클라우드 엔드포인트를 가리키는지 확인하세요.
- `NEXT_PUBLIC_*` 값을 서버 측 값과 일치하도록 유지합니다.

**첫 번째 로그인이 작동하지 않습니다**

- `.env`에서 `INITIAL_PASSWORD`을 확인하세요.
- 설정되지 않은 경우 대체 비밀번호는 `123456`입니다.

**요청 로그 없음**

- `.env`에 `ENABLE_REQUEST_LOGS=true`을 설정합니다.

**OpenAI 호환 공급자에 대한 연결 테스트에서 "잘못됨"이 표시됩니다**

- 많은 공급자가 `/models` 엔드포인트를 노출하지 않습니다.
- OmniRoute v1.0.6+에는 채팅 완료를 통한 대체 검증이 포함되어 있습니다.
- 기본 URL에 `/v1` 접미사가 포함되어 있는지 확인하세요.

### 🔐 원격 서버의 OAuth

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ VPS, Docker 또는 원격 서버에서 OmniRoute를 실행하는 사용자에게 중요**

#### 원격 서버에서 Antigravity/Gemini CLI OAuth가 실패하는 이유는 무엇입니까?

**Antigravity** 및 **Gemini CLI** 공급자는 **Google OAuth 2.0**을 사용합니다. Google에서는 OAuth 흐름의 `redirect_uri`이 앱의 Google Cloud Console에 사전 등록된 URI 중 하나와 정확히 일치하도록 요구합니다.

OmniRoute에 번들로 제공되는 OAuth 자격 증명은 **`localhost`에 대해서만** 등록됩니다. 원격 서버(예: `https://omniroute.myserver.com`)에서 OmniRoute에 액세스하면 Google은 다음을 통한 인증을 거부합니다.

```
Error 400: redirect_uri_mismatch
```

#### 해결 방법: 자체 OAuth 자격 증명 구성

서버의 URI를 사용하여 Google Cloud Console에서 **OAuth 2.0 클라이언트 ID**를 만들어야 합니다.

#### 단계별

**1. Google Cloud Console 열기**

이동: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. 새 OAuth 2.0 클라이언트 ID 생성**

- **"+ 자격 증명 만들기"** → **"OAuth 클라이언트 ID"**를 클릭합니다.
- 애플리케이션 유형: **"웹 애플리케이션"**
- 이름: 원하는 것(예: `OmniRoute Remote`)

**3. 승인된 리디렉션 URI 추가**

**"승인된 리디렉션 URI"** 필드에 다음을 추가합니다.

```
https://your-server.com/callback
```

> `your-server.com`을 서버의 도메인 또는 IP로 바꿉니다(필요한 경우 포트 포함(예: `http://45.33.32.156:20128/callback`)).

**4. 자격 증명 저장 및 복사**

생성 후 Google은 **클라이언트 ID** 및 **클라이언트 비밀번호**를 표시합니다.

**5. 환경 변수 설정**

`.env`(또는 Docker 환경 변수)에서:

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. OmniRoute 다시 시작**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. 다시 연결해 보세요**

대시보드 → 공급자 → Antigravity(또는 Gemini CLI) → OAuth

이제 Google은 `https://your-server.com/callback`로 올바르게 리디렉션됩니다.

---

#### 임시 해결 방법(사용자 지정 자격 증명 없음)

지금 바로 자격 증명을 설정하고 싶지 않은 경우에도 **수동 URL 흐름**을 사용할 수 있습니다.

1. OmniRoute는 Google 인증 URL을 엽니다.
2. 승인 후 Google은 `localhost`로 리디렉션을 시도합니다(원격 서버에서는 실패함).
3. 브라우저의 주소 표시줄에서 **전체 URL을 복사**하세요(페이지가 로드되지 않는 경우에도 해당).
4. 해당 URL을 OmniRoute 연결 모달에 표시된 필드에 붙여넣습니다.
5. **"연결"**을 클릭하세요.

> 이는 리디렉션 페이지 로드 여부에 관계없이 URL의 인증 코드가 유효하기 때문에 작동합니다.

---

<details>
<summary><b>🇧🇷 포르투갈어 버전</b></summary>

#### OAuth에서 Antigravity/Gemini CLI를 원격 서비스로 사용하려면 어떻게 해야 합니까?

Os는 **반중력** 및 **Gemini CLI**를 인증하기 위해 **Google OAuth 2.0**을 입증했습니다. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pre-cadastradas no Google Cloud Console do aplicativo.

OAuth는 OmniRoute에 대한 신용 정보를 포함하지 않으므로 **`localhost`**에 대한 액세스 권한을 갖습니다. Quando você acessa o OmniRoute em um servidor remoto (예: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### 해결책: 개인 정보 보호 OAuth 구성

Você precisa criar um **OAuth 2.0 Client ID** no Google Cloud Console com a URI do seu servidor.

#### 파쏘 아 파소

**1. Google Cloud Console에 액세스**

아브라: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 클라이언트 ID**

- em 클릭 **"+ 자격 증명 만들기"** → **"OAuth 클라이언트 ID"**
- 적용 분야: **"웹 애플리케이션"**
- 이름: escolha qualquer nome (예: `OmniRoute Remote`)

**3. 승인된 리디렉션 URI로서의 Adicione**

아니요 **"승인된 리디렉션 URI"**, 추가:

```
https://seu-servidor.com/callback
```

> `seu-servidor.com` pelo domínio 또는 IP do seu servidor로 대체합니다(필요한 포트 포함, 예: `http://45.33.32.156:20128/callback`).

**4. 사본을 자격 증명으로 저장**

Após criar, o Google morerá o **클라이언트 ID** e o **클라이언트 비밀번호**.

**5. 다양한 주변 환경으로 구성**

`.env`(Docker의 주변 환경에 따라 다름)이 없습니다.

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie 또는 OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

대시보드 → 공급자 → Antigravity(또는 Gemini CLI) → OAuth

Agora는 `https://seu-servidor.com/callback` 및 자동 기능을 통해 Google을 리디렉션합니다.

---

#### 임시 해결 방법(sem configurar credenciais próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. OmniRoute는 Google 자동 생성 URL을 확인합니다.
2. Após você autorizar, o Google tentará redirectionar para `localhost` (que falha no servidor remoto)
3. **URL 복사 완료** da barra de endereço do seu browser (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Clique em **"연결"**

> 이 해결 방법은 URL을 통해 자동으로 코드를 확인하거나 독립적으로 리디렉션할 수 있도록 하는 것입니다.

</details>

---

</details>

## 🛠️ 기술 스택

<details>
<summary><b>기술 스택 세부정보를 확장하려면 클릭하세요.</b></summary>

- **런타임**: Node.js 18–22 LTS(⚠️ Node.js 24+는 **지원되지 않습니다** — `better-sqlite3` 네이티브 바이너리는 호환되지 않습니다)
- **언어**: TypeScript 5.9 — `src/` 및 `open-sse/`에서 **100% TypeScript**(v2.0 이후 핵심 모듈에서는 `any`이 0임)
- **프레임워크**: Next.js 16 + React 19 + Tailwind CSS 4
- **데이터베이스**: LowDB(JSON) + SQLite(도메인 상태 + 프록시 로그 + MCP 감사 + 라우팅 결정)
- **스키마**: Zod(MCP 도구 I/O 검증, API 계약)
- **프로토콜**: MCP(stdio/HTTP) + A2A v0.3(JSON-RPC 2.0 + SSE)
- **스트리밍**: 서버에서 보낸 이벤트(SSE)
- **인증**: OAuth 2.0(PKCE) + JWT + API 키 + MCP 범위 승인
- **테스트**: Node.js 테스트 실행기 + Vitest(단위, 통합, E2E를 포함한 900개 이상의 테스트)
- **CI/CD**: GitHub Actions(자동 npm 게시 + 출시 시 Docker Hub)
- **웹사이트**: [omniroute.online](https://omniroute.online)
- **패키지**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **도커**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **복원력**: 회로 차단기, 지수 백오프, 천둥 방지 무리, TLS 스푸핑, 자동 콤보 자가 치유

</details>

---

## 📖 문서

| 문서                                           | 설명                                             |
| ---------------------------------------------- | ------------------------------------------------ |
| [User Guide](docs/USER_GUIDE.md)               | 공급자, 콤보, CLI 통합, 배포                     |
| [API Reference](docs/API_REFERENCE.md)         | 예제가 포함된 모든 엔드포인트                    |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP tools, IDE configs, Python/TS/Go clients  |
| [A2A Server](src/lib/a2a/README.md)            | JSON-RPC 2.0 프로토콜, 스킬, 스트리밍, 작업 관리 |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6단계 채점, 모드 팩, 자가 치유                   |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | 일반적인 문제 및 해결 방법                       |
| [Architecture](docs/ARCHITECTURE.md)           | 시스템 아키텍처 및 내부                          |
| [Contributing](CONTRIBUTING.md)                | 개발 설정 및 지침                                |
| [OpenAPI Spec](docs/openapi.yaml)              | OpenAPI 3.0 사양                                 |
| [Security Policy](SECURITY.md)                 | 취약점 보고 및 보안 관행                         |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | 전체 가이드: VM + nginx + Cloudflare 설정        |
| [Features Gallery](docs/FEATURES.md)           | 스크린샷을 포함한 시각적 대시보드 둘러보기       |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | 출시 전 유효성 검사 단계                         |

---

## 🗺️ 로드맵

OmniRoute에는 여러 개발 단계에 걸쳐 **210개 이상의 기능이 계획되어 있습니다**. 주요 영역은 다음과 같습니다.

| 카테고리                    | 계획된 기능 | 하이라이트                                                                     |
| --------------------------- | ----------- | ------------------------------------------------------------------------------ |
| 🧠 **라우팅 및 인텔리전스** | 25세 이상   | 최저 대기 시간 라우팅, 태그 기반 라우팅, 실행 전 할당량, P2C 계정 선택         |
| 🔒 **보안 및 규정 준수**    | 20세 이상   | SSRF 강화, 자격 증명 클로킹, 엔드포인트당 속도 제한, 관리 키 범위 지정         |
| 📊 **관측성**               | 15세 이상   | OpenTelemetry 통합, 실시간 할당량 모니터링, 모델별 비용 추적                   |
| 🔄 **공급자 통합**          | 20세 이상   | 동적 모델 레지스트리, 공급자 쿨다운, 다중 계정 Codex, Copilot 할당량 구문 분석 |
| ⚡ **성능**                 | 15세 이상   | 듀얼 캐시 레이어, 프롬프트 캐시, 응답 캐시, 스트리밍 Keepalive, 배치 API       |
| 🌐 **생태계**               | 10세 이상   | WebSocket API, 구성 핫 리로드, 분산 구성 저장소, 상용 모드                     |

### 🔜 출시 예정

- 🔗 **OpenCode 통합** — OpenCode AI 코딩 IDE에 대한 기본 공급자 지원
- 🔗 **TRAE 통합** — TRAE AI 개발 프레임워크를 완벽하게 지원
- 📦 **Batch API** — 대량 요청에 대한 비동기식 일괄 처리
- 🎯 **태그 기반 라우팅** — 사용자 정의 태그 및 메타데이터를 기반으로 요청 라우팅
- 💰 **최저 비용 전략** — 가장 저렴한 제공업체를 자동으로 선택합니다.

> 📝 [**OMNI_TOKEN_342**](docs/new-features/)에서 사용 가능한 전체 기능 사양(217개 세부 사양)

---

## 👥 기여자

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### 기여 방법

1. 저장소 포크
2. 기능 분기 생성(`git checkout -b feature/amazing-feature`)
3. 변경 사항을 커밋합니다(`git commit -m 'Add amazing feature'`).
4. 브랜치(`git push origin feature/amazing-feature`)로 푸시
5. 풀 리퀘스트 열기

자세한 지침은 [CONTRIBUTING.md](CONTRIBUTING.md)을 참조하세요.

### 새 버전 출시

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 스타 히스토리

## 시간이 지남에 따라 스타게이저가 됨

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 감사의 말씀

이 포크에 영감을 준 원본 프로젝트인 **[decolua](https://github.com/decolua)**의 **[9router](https://github.com/decolua/9router)**에게 특별히 감사드립니다. OmniRoute는 추가 기능, 다중 모드 API 및 전체 TypeScript 재작성을 통해 놀라운 기반을 구축합니다.

이 JavaScript 포트에 영감을 준 최초의 Go 구현인 **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)**에게 특별히 감사드립니다.

---

## 📄 라이센스

MIT 라이선스 - 자세한 내용은 [LICENSE](LICENSE)을 참조하세요.

---

<div align="center">
  <sub>연중무휴</sub>을 코딩하는 개발자를 위해 ❤️으로 구축됨
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- 커뮤니티 Q&A를 위한 GitHub 토론 활성화 -->
