<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — 무료 AI 게이트웨이

### 코딩을 멈추지 마세요. 자동 폴백을 통해 **무료 및 저가형 AI 모델**로 스마트 라우팅합니다.

_범용 API 프록시 — 하나의 엔드포인트, 36개 이상의 공급자, 가동 중지 시간 없음._

**채팅 완료 • 임베딩 • 이미지 생성 • 오디오 • 순위 재지정 • 100% TypeScript**

---

### 🆕 v2.7.0 새로운 기능

- **플러그형 RouterStrategy** — 규칙, 비용, 지연 전략 지원
- **다국어 의도 감지** — 30개 이상 언어로 라우팅 스코어링
- **요청 중복 제거** — 콘텐츠 해시로 중복 API 호출 방지
- **새 공급자:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **가격 업데이트:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 좋아하는 코딩 에이전트를 위한 무료 AI 제공업체

_무제한 코딩을 위한 무료 API 게이트웨이인 OmniRoute를 통해 AI 기반 IDE 또는 CLI 도구를 연결하세요._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
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

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) · [🚀 Quick Start](#-quick-start) · [💡 Features](#-key-features) · [📖 Docs](#-documentation) · [💰 Pricing](#-pricing-at-a-glance) · [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 왜 OmniRoute인가요?

**돈을 낭비하지 말고 한도에 도달하지 마세요.**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 구독 할당량은 매달 사용하지 않은 채 만료됩니다.
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 속도 제한으로 인해 코딩이 중단됩니다.
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 고가의 API(공급자당 월 $20-50)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 공급자 간 수동 전환

**OmniRoute는 이 문제를 해결합니다.**

- ✅ **구독 극대화** - 할당량을 추적하고 재설정하기 전에 모든 비트를 사용하세요.
- ✅ **자동 대체** - 구독 → API 키 → 저렴한 → 무료, 다운타임 없음
- ✅ **다중 계정** - 공급자별 계정 간 라운드 로빈
- ✅ **유니버설** - Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, 모든 CLI 도구와 함께 작동

---

## 📧 지원

> 💬 **커뮤니티에 가입하세요!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — 도움을 받고, 팁을 공유하고, 최신 소식을 받아보세요.

- **웹사이트**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **문제**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **원래 프로젝트**: [9router by decolua](https://github.com/decolua/9router)

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

## 🎯 OmniRoute가 해결하는 것 — 30가지 실제 문제점 및 사용 사례

> **AI 도구를 사용하는 모든 개발자는 매일 이러한 문제에 직면합니다.** OmniRoute는 비용 초과부터 지역적 차단, 손상된 OAuth 흐름부터 프로토콜 운영 및 기업 관찰 가능성까지 모든 문제를 해결하기 위해 구축되었습니다.

<details>
<summary><b>💸 1. "비싼 구독료를 지불했지만 여전히 한도 때문에 방해를 받습니다."</b></summary>

개발자는 Claude Pro, Codex Pro 또는 GitHub Copilot에 대해 월 20~200달러를 지불합니다. 비용을 지불하더라도 할당량에는 5시간 사용량, 주간 한도 또는 분당 비율 한도 등 상한선이 있습니다. 코딩 세션이 진행되는 동안 공급자는 응답을 중단하고 개발자는 흐름과 생산성을 잃게 됩니다.

**OmniRoute가 이를 해결하는 방법:**

- **스마트 4계층 폴백** — 구독 할당량이 소진되면 수동 개입 없이 자동으로 API 키 → 저렴함 → 무료로 리디렉션됩니다.
- **실시간 할당량 추적** — 재설정 카운트다운(5시간, 매일, 매주)을 통해 실시간으로 토큰 소비를 표시합니다.
- **다중 계정 지원** — 자동 라운드 로빈 기능을 갖춘 공급자당 여러 계정 — 하나가 소진되면 다음 계정으로 전환
- **사용자 정의 콤보** — 6가지 균형 전략(채우기 우선, 라운드 로빈, P2C, 무작위, 최소 사용, 비용 최적화)을 갖춘 사용자 정의 가능한 폴백 체인
- **Codex 비즈니스 할당량** — 대시보드에서 직접 비즈니스/팀 작업 공간 할당량 모니터링

</details>

<details>
<summary><b>🔌 2. "여러 공급자를 사용해야 하는데 각각 API가 다릅니다"</b></summary>

OpenAI는 하나의 형식을 사용하고 Claude(Anthropic)는 또 다른 형식을 사용하고 Gemini는 또 다른 형식을 사용합니다. 개발자가 다른 제공업체의 모델을 테스트하거나 이들 사이에서 대체하려는 경우 SDK를 재구성하고, 엔드포인트를 변경하고, 호환되지 않는 형식을 처리해야 합니다. 사용자 지정 공급자(FriendLI, NIM)에는 비표준 모델 끝점이 있습니다.

**OmniRoute가 이를 해결하는 방법:**

- **통합 엔드포인트** — 단일 `http://localhost:20128/v1`가 36개 이상의 모든 공급자에 대한 프록시 역할을 합니다.
- **형식 번역** — 자동 및 투명함: OpenAI ← Claude ← Gemini ← Responses API
- **응답 삭제** — OpenAI SDK v1.83+를 손상시키는 비표준 필드(`x_groq`, `usage_breakdown`, `service_tier`)를 제거합니다.
- **역할 정규화** — OpenAI가 아닌 제공업체에 대해 `developer` → `system`로 변환합니다. GLM/ERNIE의 경우 `system` → `user`
- **Think Tag Extraction** — DeepSeek R1과 같은 모델에서 `<think>` 블록을 표준화된 `reasoning_content`로 추출합니다.
- **Gemini용 구조화된 출력** — `json_schema` → `responseMimeType`/`responseSchema` 자동 변환
- **`stream`의 기본값은 `false`** — OpenAI 사양에 맞춰 Python/Rust/Go SDK에서 예기치 않은 SSE를 방지합니다.

</details>

<details>
<summary><b>🌐 3. "내 AI 공급자가 내 지역/국가를 차단합니다."</b></summary>

OpenAI/Codex와 같은 공급자는 특정 지역의 액세스를 차단합니다. OAuth 및 API 연결 중에 사용자에게 `unsupported_country_region_territory`와 같은 오류가 발생합니다. 이는 특히 개발도상국의 개발자에게 실망스러운 일입니다.

**OmniRoute가 이를 해결하는 방법:**

- **3레벨 프록시 구성** — 3가지 레벨로 구성 가능한 프록시: 글로벌(모든 트래픽), 공급자별(하나의 공급자만), 연결/키별
- **색상으로 구분된 프록시 배지** — 시각적 표시기: 🟢 글로벌 프록시, 🟡 공급자 프록시, 🔵 연결 프록시, 항상 IP 표시
- **프록시를 통한 OAuth 토큰 교환** — OAuth 흐름도 프록시를 통과하여 `unsupported_country_region_territory`를 해결합니다.
- **프록시를 통한 연결 테스트** - 연결 테스트에서는 구성된 프록시를 사용합니다(더 이상 직접 우회 없음).
- **SOCKS5 지원** — 아웃바운드 라우팅을 위한 전체 SOCKS5 프록시 지원
- **TLS 지문 스푸핑** — `wreq-js`를 통한 브라우저와 유사한 TLS 지문으로 봇 감지 우회

</details>

<details>
<summary><b>🆓 4. "AI로 코딩하고 싶은데 돈이 없어요"</b></summary>

모든 사람이 AI 구독 비용으로 월 20~200달러를 지불할 수 있는 것은 아닙니다. 학생, 신흥 국가의 개발자, 취미생활자, 프리랜서는 무료로 고품질 모델에 액세스해야 합니다.

**OmniRoute가 이를 해결하는 방법:**

- **무료 계층 제공자 내장** — 100% 무료 제공자에 대한 기본 지원: iFlow(8개 무제한 모델), Qwen(3개 무제한 모델), Kiro(Claude 무료), Gemini CLI(180K/월 무료)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **무료 전용 콤보** — 체인 `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/월, 가동 중지 시간 없음
- **NVIDIA NIM 무료 크레딧** — 1000개의 무료 크레딧 통합
- **비용 최적화 전략** — 가장 저렴한 공급자를 자동으로 선택하는 라우팅 전략

</details>

<details>
<summary><b>🔒 5. "AI 게이트웨이를 무단 액세스로부터 보호해야 합니다"</b></summary>

AI 게이트웨이를 네트워크(LAN, VPS, Docker)에 노출하면 주소가 있는 사람은 누구나 개발자의 토큰/할당량을 사용할 수 있습니다. 보호하지 않으면 API는 오용, 즉각적인 주입, 남용에 취약해집니다.

**OmniRoute가 이를 해결하는 방법:**

- **API 키 관리** — 전용 `/dashboard/api-manager` 페이지를 사용하여 공급자별 생성, 순환 및 범위 지정
- **모델 수준 권한** — 모두 허용/제한 토글을 사용하여 API 키를 특정 모델(`openai/*`, 와일드카드 패턴)로 제한합니다.
- **API 엔드포인트 보호** — `/v1/models`에 대한 키가 필요하며 목록에서 특정 공급자를 차단합니다.
- **Auth Guard + CSRF 보호** — `withAuth` 미들웨어 + CSRF 토큰으로 보호되는 모든 대시보드 경로
- **속도 제한기** — 구성 가능한 창으로 IP당 속도 제한
- **IP 필터링** — 액세스 제어를 위한 허용 목록/차단 목록
- **프롬프트 주입 가드** — 악성 프롬프트 패턴 제거
- **AES-256-GCM 암호화** — 저장된 자격 증명은 암호화됩니다.

</details>

<details>
<summary><b>🛑 6. "공급업체가 다운되어 코딩 흐름이 손실되었습니다."</b></summary>

AI 제공자는 불안정해지거나, 5xx 오류를 반환하거나, 임시 속도 제한에 도달할 수 있습니다. 개발자가 단일 공급자에 의존하는 경우 중단됩니다. 회로 차단기가 없으면 반복적으로 재시도하면 애플리케이션이 중단될 수 있습니다.

**OmniRoute가 이를 해결하는 방법:**

- **공급업체별 회로 차단기** — 구성 가능한 임계값 및 쿨다운을 통한 자동 열기/닫기(닫힘/열림/반열림)
- **지수 백오프** — 점진적인 재시도 지연
- **Anti-Thundering Herd** — 동시 재시도 폭풍에 대한 뮤텍스 + 세마포어 보호
- **콤보 폴백 체인** — 기본 공급자가 실패하면 개입 없이 자동으로 체인을 통과합니다.
- **콤보 회로 차단기** — 콤보 체인 내에서 실패한 공급자를 자동으로 비활성화합니다.
- **상태 대시보드** — 가동 시간 모니터링, 회로 차단기 상태, 잠금, 캐시 통계, p50/p95/p99 대기 시간

</details>

<details>
<summary><b>🔧 7. "각 AI 도구를 구성하는 것은 지루하고 반복적입니다."</b></summary>

개발자는 Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code 등을 사용합니다. 각 도구에는 서로 다른 구성(API 엔드포인트, 키, 모델)이 필요합니다. 공급자나 모델을 전환할 때 재구성하는 것은 시간 낭비입니다.

**OmniRoute가 이를 해결하는 방법:**

- **CLI 도구 대시보드** — Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline을 원클릭으로 설정할 수 있는 전용 페이지
- **GitHub Copilot Config Generator** — 대량 모델 선택을 통해 VS Code용 `chatLanguageModels.json`를 생성합니다.
- **온보딩 마법사** — 처음 사용자를 위한 4단계 설정 안내
- **하나의 엔드포인트, 모든 모델** — `http://localhost:20128/v1`를 한 번 구성하면 36개 이상의 공급자에 액세스할 수 있습니다.

</details>

<details>
<summary><b>🔑 8. "여러 공급자의 OAuth 토큰 관리는 지옥입니다"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — 모두 만료되는 토큰과 함께 OAuth 2.0을 사용합니다. 개발자는 지속적으로 재인증을 수행하고 `client_secret is missing`, `redirect_uri_mismatch` 및 원격 서버의 오류를 처리해야 합니다. LAN/VPS의 OAuth는 특히 문제가 됩니다.

**OmniRoute가 이를 해결하는 방법:**

- **자동 토큰 새로 고침** — OAuth 토큰이 만료되기 전에 백그라운드에서 새로 고쳐집니다.
- **OAuth 2.0(PKCE) 내장** — Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow에 대한 자동 흐름
- **다중 계정 OAuth** — JWT/ID 토큰 추출을 통해 공급자당 여러 계정
- **OAuth LAN/원격 수정** — `redirect_uri`에 대한 개인 IP 감지 + 원격 서버에 대한 수동 URL 모드
- **Nginx 뒤의 OAuth** — 역방향 프록시 호환성을 위해 `window.location.origin`를 사용합니다.
- **원격 OAuth 가이드** — VPS/Docker의 Google Cloud 자격 증명에 대한 단계별 가이드

</details>

<details>
<summary><b>📊 9. "얼마나 쓰고 있는지, 어디에 쓰는지 모르겠어요"</b></summary>

개발자는 여러 유료 제공업체를 이용하지만 지출에 대한 통합된 보기가 없습니다. 각 제공업체에는 자체 청구 대시보드가 ​​있지만 통합된 보기는 없습니다. 예상치 못한 비용이 쌓일 수 있습니다.

**OmniRoute가 이를 해결하는 방법:**

- **비용 분석 대시보드** — 토큰별 비용 추적 및 공급자별 예산 관리
- **계층당 예산 한도** — 자동 폴백을 트리거하는 계층당 지출 한도
- **모델별 가격 구성** — 모델당 가격 구성 가능
- **API 키당 사용 통계** — 키당 요청 수 및 마지막으로 사용된 타임스탬프
- **분석 대시보드** — 통계 카드, 모델 사용 차트, 성공률 및 대기 시간이 포함된 공급자 테이블

</details>

<details>
<summary><b>🐛 10. "AI 호출 오류 및 문제 진단이 안 돼요"</b></summary>

호출이 실패하면 개발자는 속도 제한, 만료된 토큰, 잘못된 형식 또는 공급자 오류인지 알 수 없습니다. 여러 터미널에 걸쳐 조각화된 로그. 관찰 가능성이 없으면 디버깅은 시행착오를 겪게 됩니다.

**OmniRoute가 이를 해결하는 방법:**

- **통합 로그 대시보드** — 탭 4개: 요청 로그, 프록시 로그, 감사 로그, 콘솔
- **콘솔 로그 뷰어** — 색상으로 구분된 레벨, 자동 스크롤, 검색, 필터 기능을 갖춘 실시간 터미널 스타일 뷰어
- **SQLite 프록시 로그** — 서버를 다시 시작해도 지속되는 영구 로그
- **번역기 플레이그라운드** — 4가지 디버깅 모드: 플레이그라운드(형식 번역), 채팅 테스터(왕복), 테스트 벤치(일괄), 라이브 모니터(실시간)
- **원격 측정 요청** — p50/p95/p99 대기 시간 + X-요청-ID 추적
- **회전을 통한 파일 기반 로깅** — 콘솔 인터셉터는 크기 기반 회전을 통해 모든 것을 JSON 로그에 캡처합니다.

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

- **임베딩** — 6개 공급자와 9개 이상의 모델이 포함된 `/v1/embeddings`
- **이미지 생성** — 10개 공급자와 20개 이상의 모델(OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)을 갖춘 `/v1/images/generations`
- **텍스트-비디오** — `/v1/videos/generations` — ComfyUI(AnimateDiff, SVD) 및 SD WebUI
- **텍스트-음악** — `/v1/music/generations` — ComfyUI(안정적인 오디오 개방형, MusicGen)
- **오디오 녹음** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **텍스트 음성 변환** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + 기존 제공업체
- **조정** — `/v1/moderations` — 콘텐츠 안전 확인
- **재순위** — `/v1/rerank` — 문서 관련성 재지정
- **응답 API** — Codex에 대한 전체 `/v1/responses` 지원

</details>

<details>
<summary><b>🧪 14. "모델별 품질을 테스트하고 비교할 방법이 없어요"</b></summary>

개발자는 자신의 사용 사례(코드, 번역, 추론)에 가장 적합한 모델을 알고 싶어하지만 수동으로 비교하는 것은 느립니다. 통합 평가 도구가 없습니다.

**OmniRoute가 이를 해결하는 방법:**

- **LLM 평가** — 인사말, 수학, 지리, 코드 생성, JSON 준수, 번역, 마크다운, 안전 거부를 다루는 사전 로드된 10가지 사례를 사용한 골든 세트 테스트
- **4가지 일치 전략** — `exact`, `contains`, `regex`, `custom`(JS 함수)
- **번역기 플레이그라운드 테스트 벤치** — 여러 입력 및 예상 출력을 사용한 일괄 테스트, 공급업체 간 비교
- **채팅 테스터** — 시각적 응답 렌더링을 포함한 전체 왕복
- **라이브 모니터** — 프록시를 통해 흐르는 모든 요청의 실시간 스트림

</details>

<details>
<summary><b>📈 15. "성능 저하 없이 확장해야 합니다"</b></summary>

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
<summary><b>🤖 16. "모델 동작을 전체적으로 제어하고 싶습니다"</b></summary>

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
<summary><b>🧰 17. "일류 제품 기능으로 MCP 도구가 필요합니다"</b></summary>

많은 AI 게이트웨이는 MCP를 숨겨진 구현 세부 사항으로만 노출합니다. 팀에는 가시적이고 관리 가능한 운영 레이어가 필요합니다.

**OmniRoute가 이를 해결하는 방법:**

- 대시보드 탐색 및 엔드포인트 프로토콜 탭에 MCP가 나타납니다.
- 프로세스, 도구, 범위 및 감사가 포함된 전용 MCP 관리 페이지
- `omniroute --mcp` 및 클라이언트 온보딩을 위한 빠른 시작 내장

</details>

<details>
<summary><b>🧠 18. "동기화 + 스트림 작업 경로를 갖춘 A2A 오케스트레이션이 필요합니다"</b></summary>

에이전트 워크플로에는 수명 주기 제어를 통해 직접 응답과 장기 실행 스트리밍 실행이 모두 필요합니다.

**OmniRoute가 이를 해결하는 방법:**

- `message/send` 및 `message/stream`가 포함된 A2A JSON-RPC 엔드포인트(`POST /a2a`)
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
<summary><b>⚙️ 22. "재배치 없이 작전 통제가 필요해요"</b></summary>

팀은 사고 또는 비용 이벤트 중에 빠른 런타임 변경이 필요합니다.

**OmniRoute가 이를 해결하는 방법:**

- MCP 대시보드에서 직접 콤보 활성화 전환
- 사전 정의된 정책 팩의 복원력 프로필 적용
- 동일한 운영 패널에서 회로 차단기 상태 재설정

</details>

<details>
<summary><b>🔄 23. "실시간 A2A 작업 수명주기 가시성 및 취소가 필요합니다"</b></summary>

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
<summary><b>🪪 25. "클라이언트를 위한 표준 에이전트 검색이 필요합니다"</b></summary>

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

- MCP 및 A2A용 사이드바 항목
- 빠른 시작 및 상태가 포함된 엔드포인트 페이지 프로토콜 탭
- 개요에서 전용 관리 대시보드로의 링크

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
<summary><b>📡 28. "모든 인터페이스에 걸쳐 통합된 관찰 가능성이 필요합니다"</b></summary>

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
<summary><b>🚀 30. "글루 코드 확장 없이 에이전트 워크플로를 제공해야 합니다."</b></summary>

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
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ 빠른 시작

**1. 전역적으로 설치:**

```bash
npm install -g omniroute
omniroute
```

🎉 대시보드는 `http://localhost:20128`에서 열립니다.

| 명령                    | 설명                          |
| ----------------------- | ----------------------------- |
| `omniroute`             | 서버 시작(기본 포트 20128)    |
| `omniroute --port 3000` | 사용자 정의 포트 사용         |
| `omniroute --no-open`   | 브라우저를 자동으로 열지 않음 |
| `omniroute --help`      | 도움말 표시                   |

**2. 무료 공급자 연결:**

대시보드 → 공급자 → **Claude Code** 또는 **Antigravity** 연결 → OAuth 로그인 → 완료!

**3. CLI 도구에서 사용:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**그렇습니다!** 무료 AI 모델로 코딩을 시작해 보세요.

**대안 — 소스에서 실행:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 도커

OmniRoute는 [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute)에서 공개 Docker 이미지로 제공됩니다.

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

---

## 🖥️

> 🆕 **새 기능!** OmniRoute가 Windows, macOS, Linux용 **네이티브 데스크톱 앱**으로 출시되었습니다.

- 🖥️ **네이티브 윈도우** — 시스템 트레이 통합 전용 창
- 🔄 **자동 시작** — 시스템 로그인 시 OmniRoute 실행
- 🔔 **네이티브 알림** — 할당량 소진 또는 공급자 문제 알림
- ⚡ **원클릭 설치** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **오프라인 모드** — 내장 서버로 완전 오프라인 작동

```bash
npm run electron:dev           # 개발 모드
npm run electron:build         # 현재 플랫폼
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 전체 문서: [`electron/README.md`](electron/README.md)

---

## 💰 가격 한눈에 보기

| 계층          | 공급자              | 비용                  | 할당량 재설정   | 최고의 대상       |
| ------------- | ------------------- | --------------------- | --------------- | ----------------- |
| **💳 구독**   | 클로드 코드 (Pro)   | $20/월                | 5시간 + 매주    | 이미 구독 중      |
|               | 코덱스(플러스/프로) | $20-200/월            | 5시간 + 매주    | OpenAI 사용자     |
|               | 제미니 CLI          | **무료**              | 180K/월 + 1K/일 | 모든 사람!        |
|               | GitHub 부조종사     | $10-19/월             | 월간            | GitHub 사용자     |
| **🔑 API 키** | 엔비디아 NIM        | **무료** (1000크레딧) | 일회성          | 무료 등급 테스트  |
|               | 딥시크              | 종량제                | 없음            | 최고의 가격/품질  |
|               | 그로크              | 무료 등급 + 유료      | 요금 제한       | 초고속 추론       |
|               | xAI(그록)           | 종량제                | 없음            | 그록 모델         |
|               | 미스트랄            | 무료 등급 + 유료      | 요금 제한       | 유럽의 AI         |
|               | 오픈라우터          | 종량제                | 없음            | 100개 이상의 모델 |
| **💰 저렴한** | GLM-4.7             | $0.6/1M               | 매일 오전 10시  | 예산 백업         |
|               | 미니맥스 M2.1       | $0.2/1M               | 5시간 롤링      | 가장 저렴한 옵션  |
|               | 키미 K2             | $9/월 정액            | 1000만 토큰/월  | 예측 가능한 비용  |
| **🆓 무료**   | 아이플로우          | $0                    | 무제한          | 8개 모델 무료     |
|               | 퀀                  | $0                    | 무제한          | 3개 모델 무료     |
|               | 키로                | $0                    | 무제한          | 클로드 프리       |

**💡 전문가 팁:** Gemini CLI(월 180K 무료) + iFlow(무제한 무료) 콤보 = 비용 $0로 시작하세요!

---

## 💡 주요 기능

### 🧠 코어 라우팅 및 인텔리전스

| 기능                          | 그것이 하는 일                                                                |
| ----------------------------- | ----------------------------------------------------------------------------- |
| 🎯 **스마트 4계층 폴백**      | 자동 경로: 구독 → API 키 → 저렴한 → 무료                                      |
| 📊 **실시간 할당량 추적**     | 라이브 토큰 수 + 공급자별 카운트다운 재설정                                   |
| 🔄 **형식 번역**              | OpenAI ⇔ Claude ⇔ Gemini ⇔ Cursor ⇔ Kiro 심리스 + 반응위생                    |
| 👥 **다중 계정 지원**         | 지능적인 선택을 통해 공급자당 여러 계정                                       |
| 🔄 **자동 토큰 새로고침**     | 재시도 시 OAuth 토큰이 자동으로 새로 고쳐집니다.                              |
| 🎨 **맞춤형 콤보**            | 6가지 전략: 채우기 우선, 라운드 로빈, p2c, 무작위, 최소 사용, 비용 최적화     |
| 🧩 **맞춤형 모델**            | 모든 공급자에 모델 ID 추가                                                    |
| 🌐 **와일드카드 라우터**      | `provider/*` 패턴을 모든 공급자에게 동적으로 라우팅                           |
| 🧠 **예산 고려**              | 추론 모델을 위한 패스스루, 자동, 사용자 정의 및 적응형 모드                   |
| 🔀 **Model Aliases**          | Auto-forward deprecated model IDs to current replacements (built-in + custom) |
| ⚡ **Background Degradation** | Auto-route background tasks (titles, summaries) to cheaper models             |
| 💬 **시스템 프롬프트 삽입**   | 모든 요청에 ​​전역 시스템 프롬프트 적용                                       |
| 📄 **응답 API**               | Codex에 대한 전체 OpenAI 응답 API(`/v1/responses`) 지원                       |

### 🎵 다중 모드 API

| 기능                    | 그것이 하는 일                                                                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **이미지 생성**      | `/v1/images/generations` — 4개 공급자, 9개 이상의 모델                                                                                                                     |
| 📐 **임베딩**           | `/v1/embeddings` — 6개 공급자, 9개 이상의 모델                                                                                                                             |
| 🎤 **오디오 전사**      | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **텍스트 음성 변환** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **조정**             | `/v1/moderations` — 콘텐츠 안전 확인                                                                                                                                       |
| 🔀 **재순위**           | `/v1/rerank` — 문서 관련성 재순위                                                                                                                                          |

### 🛡️ 복원력 및 보안

| 기능                            | 그것이 하는 일                                                               |
| ------------------------------- | ---------------------------------------------------------------------------- |
| 🔌 **회로 차단기**              | 구성 가능한 임계값을 사용하여 공급자별 자동 열기/닫기                        |
| 🛡️ **천둥 방지 무리**           | API 키 공급자에 대한 뮤텍스 + 세마포 속도 제한                               |
| 🧠 **의미론적 캐시**            | 2계층 캐시(서명 + 의미 체계)로 비용 및 대기 시간 감소                        |
| ⚡ **멱등성 요청**              | 중복 요청에 대한 5초 중복 제거 기간                                          |
| 🔒 **TLS 지문 스푸핑**          | wreq-js를 통해 TLS 기반 봇 감지 우회                                         |
| 🌐 **IP 필터링**                | API 액세스 제어를 위한 허용 목록/차단 목록                                   |
| 📊 **편집 가능한 속도 제한**    | 시스템 수준에서 구성 가능한 RPM, 최소 간격 및 최대 동시                      |
| 💾 **Rate Limit Persistence**   | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness |
| 🔄 **Token Refresh Resilience** | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt       |
| 🛡 **API 엔드포인트 보호**      | `/models` 엔드포인트에 대한 인증 게이팅 + 공급자 차단                        |
| 🔒 **프록시 가시성**            | 색상으로 구분된 배지: 🟢 글로벌, 🟡 공급자, 🔵 IP 디스플레이를 통한 연결별   |
| 🌐 **3단계 프록시 구성**        | 글로벌, 공급자별 또는 연결별 수준에서 프록시 구성                            |

### 📊 관찰 가능성 및 분석

| 기능                      | 그것이 하는 일                                                       |
| ------------------------- | -------------------------------------------------------------------- |
| 📝 **로깅 요청**          | 전체 요청/응답 로그가 포함된 디버그 모드                             |
| 💾 **SQLite 프록시 로그** | 영구 프록시 로그는 서버를 다시 시작해도 유지됩니다.                  |
| 📊 **분석 대시보드**      | Recharts 기반: 통계 카드, 모델 사용 차트, 공급자 테이블              |
| 📈 **진행 상황 추적**     | 스트리밍을 위한 옵트인 SSE 진행 이벤트                               |
| 🧪 **LLM 평가**           | 4가지 매치 전략을 사용한 골든 세트 테스트                            |
| 🔍 **원격 측정 요청**     | p50/p95/p99 대기 시간 집계 + X-요청-ID 추적                          |
| 📋 **로그 대시보드**      | 통합된 4개 탭 페이지: 요청 로그, 프록시 로그, 감사 로그, 콘솔        |
| 🖥️ **콘솔 로그 뷰어**     | 레벨 필터, 검색, 자동 스크롤 기능을 갖춘 실시간 터미널 스타일 뷰어   |
| 📑 **파일 기반 로깅**     | 콘솔 인터셉터는 회전을 통해 모든 출력을 JSON 로그 파일로 캡처합니다. |
| 🏥 **건강 대시보드**      | 시스템 가동 시간, 회로 차단기 상태, 잠금, 캐시 통계                  |
| 💰 **비용 추적**          | 예산 관리 + 모델별 가격 구성                                         |

### ☁️ 배포 및 동기화

| 기능                               | 그것이 하는 일                                                    |
| ---------------------------------- | ----------------------------------------------------------------- |
| 💾 **클라우드 동기화**             | Cloudflare Workers를 통해 장치 간 구성 동기화                     |
| 🌐 **어디서나 배포**               | 로컬호스트, VPS, Docker, Cloudflare 작업자                        |
| 🔑 **API 키 관리**                 | 공급자별 API 키 생성, 회전 및 범위 지정                           |
| 🧙 **온보딩 마법사**               | 처음 사용자를 위한 4단계 안내 설정                                |
| 🔧 **CLI 도구 대시보드**           | 원클릭 구성 Claude, Codex, Cline, OpenClaw, Kilo, Antigravity     |
| 🔄 **DB 백업**                     | 모든 설정에 대한 자동 백업, 복원, 내보내기 및 가져오기            |
| 🌐 **국제화**                      | next-intl이 포함된 전체 i18n — 영어 + 포르투갈어(브라질) 지원     |
| 🌍 **언어 선택기**                 | 실시간 언어 전환을 위한 헤더의 지구본 아이콘(🇺🇸/🇧🇷)               |
| 📂 **사용자 정의 데이터 디렉터리** | `DATA_DIR` env var는 기본 `~/.omniroute` 저장 경로를 재정의합니다 |

<details>
<summary><b>📖 기능 세부정보</b></summary>

### 🎯 스마트 4계층 폴백

자동 대체 기능을 사용하여 콤보 만들기:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 실시간 할당량 추적

- 제공자별 토큰 소비
- 카운트다운 재설정(5시간, 매일, 매주)
- 유료 계층에 대한 비용 추정
- 월별 지출 보고서

### 🔄 형식 번역

형식 간 원활한 번역:

- **OpenAI** ← **Claude** ← **Gemini** ← **OpenAI 응답**
- CLI 도구가 OpenAI 형식 전송 → OmniRoute 변환 → 공급자가 기본 형식 수신
- 맞춤형 OpenAI 엔드포인트를 지원하는 모든 도구와 함께 작동
- **응답 삭제** — 엄격한 OpenAI SDK 호환성을 위해 비표준 필드를 제거합니다.
- **역할 정규화** — OpenAI가 아닌 경우 `developer` → `system`; `system` → GLM/ERNIE 모델의 경우 `user`
- **사고 태그 추출** — 사고 모델의 경우 `<think>` 블록 → `reasoning_content`
- **구조화된 출력** — `json_schema` → Gemini의 `responseMimeType`/`responseSchema`

### 👥 다중 계정 지원

- 공급자당 여러 계정 추가
- 자동 라운드 로빈 또는 우선순위 기반 라우팅
- 한 계정이 할당량에 도달하면 다음 계정으로 대체

### 🔄 자동 토큰 새로고침

- OAuth 토큰은 만료되기 전에 자동으로 새로 고쳐집니다.
- 수동 재인증이 필요하지 않습니다.
- 모든 제공업체에 걸친 원활한 경험

### 🎨 맞춤 콤보

- 무제한 모델 조합 생성
- 6가지 전략: 채우기 우선, 라운드 로빈, 두 가지 선택의 힘, 무작위, 최소 사용, 비용 최적화
- Cloud Sync를 통해 여러 기기에서 콤보를 공유하세요

### 🏥 건강 대시보드

- 시스템 상태(가동 시간, 버전, 메모리 사용량)
- 공급자별 회로 차단기 상태(Closed/Open/Half-Open)
- 속도 제한 상태 및 활성 잠금
- 서명 캐시 통계
- 대기 시간 원격 측정(p50/p95/p99) + 프롬프트 캐시
- 한 번의 클릭으로 건강 상태 재설정

### 🔧 번역기 놀이터

OmniRoute에는 API 번역 디버깅, 테스트 및 모니터링을 위한 **4가지 모드**를 갖춘 강력한 내장 번역기 플레이그라운드가 포함되어 있습니다.

| 모드                 | 설명                                                                                                                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 놀이터**        | 직접 형식 변환 — API 요청 본문을 붙여넣고 OmniRoute가 공급자 형식(OpenAI ← Claude ← Gemini ← Responses API) 간에 이를 어떻게 변환하는지 즉시 확인하세요. 예제 템플릿과 형식 자동 감지가 포함되어 있습니다. |
| **💬 채팅 테스터**   | OmniRoute를 통해 실제 채팅 요청을 보내고 전체 왕복(입력, 번역된 요청, 공급자 응답, 번역된 응답)을 확인하세요. 콤보 라우팅을 검증하는 데 매우 중요합니다.                                                   |
| **🧪 테스트 벤치**   | 배치 테스트 모드 — 서로 다른 입력과 예상 출력으로 여러 테스트 케이스를 정의하고, 이를 모두 한 번에 실행하고, 공급자와 모델 간에 결과를 비교합니다.                                                         |
| **📱 라이브 모니터** | 실시간 요청 모니터링 — OmniRoute를 통해 들어오는 요청을 감시하고, 실시간으로 발생하는 형식 변환을 확인하고, 문제를 즉시 식별합니다.                                                                        |

**액세스:** 대시보드 → 번역기(사이드바)

### 💾 클라우드 동기화

- 여러 장치에서 공급자, 콤보 및 설정을 동기화합니다.
- 자동 백그라운드 동기화
- 안전한 암호화 저장

</details>

## 🧪 평가(Evals)

OmniRoute에는 골든 세트에 대해 LLM 응답 품질을 테스트하기 위한 내장 평가 프레임워크가 포함되어 있습니다. 대시보드의 **분석 → 평가**를 통해 액세스하세요.

### 내장 골든 세트

사전 로드된 "OmniRoute Golden Set"에는 다음을 다루는 10개의 테스트 사례가 포함되어 있습니다.

- 인사말, 수학, 지리, 코드 생성
- JSON 형식 준수, 번역, 마크다운
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

### NVIDIA NIM(무료 1000 크레딧!)

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

### iFlow(8개 무료 모델)

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

### Qwen(3개 무료 모델)

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

**옵션 2 — 수동:** `~/.openclaw/openclaw.json` 편집:

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

**대시보드가 잘못된 포트에서 열립니다**

- `PORT=20128` 및 `NEXT_PUBLIC_BASE_URL=http://localhost:20128` 설정

**클라우드 동기화 오류**

- `BASE_URL`이 실행 중인 인스턴스를 가리키는지 확인합니다.
- `CLOUD_URL`이 예상 클라우드 엔드포인트를 가리키는지 확인하세요.
- `NEXT_PUBLIC_*` 값을 서버측 값과 일치하도록 유지합니다.

**첫 번째 로그인이 작동하지 않습니다**

- `.env`에서 `INITIAL_PASSWORD`을 확인하세요.
- 설정되지 않은 경우 대체 비밀번호는 `123456`입니다.

**요청 로그 없음**

- `.env`에 `ENABLE_REQUEST_LOGS=true`을 설정합니다.

**OpenAI 호환 공급자에 대한 연결 테스트에서 "잘못됨"이 표시됩니다**

- 많은 공급자가 `/models` 엔드포인트를 노출하지 않습니다.
- OmniRoute v1.0.6+에는 채팅 완료를 통한 대체 검증이 포함되어 있습니다.
- 기본 URL에 `/v1` 접미사가 포함되어 있는지 확인하세요.

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ VPS/Docker/remotor의 OmniRoute를 사용하는 경우 중요**

### OAuth

Os는 **반중력** 및 **Gemini CLI**를 인증하기 위해 **Google OAuth 2.0**을 입증했습니다. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pre-cadastradas no Google Cloud Console do aplicativo.

OAuth는 OmniRoute에 대한 신용 정보를 포함하지 않으므로 **`localhost`**에 대한 액세스 권한을 갖습니다. Quando você acessa o OmniRoute em um servidor remoto (예: `https://omniroute.meuservidor.com`), o Google rejeita autenticação com:

```
Error 400: redirect_uri_mismatch
```

### 해결책: 개인 정보 보호 OAuth 구성

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

Agora는 `https://seu-servidor.com/callback` 및 자동 기능에 대한 Google 리디렉션을 수정합니다.

---

### 임시 해결 방법(sem configurar credenciais próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. OmniRoute는 Google 자동 생성 URL을 확인합니다.
2. Após você autorizar, o Google tentará redirectionar para `localhost` (que falha no servidor remoto)
3. **URL 복사 완료** da barra de endereço do seu browser (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Clique em **"연결"**

> 이 해결 방법은 URL을 통해 자동으로 코드를 확인하거나 독립적으로 리디렉션할 수 있도록 하는 것입니다.

</details>

---

## 🛠️

- **런타임**: Node.js 18–22 LTS(⚠️ Node.js 24+는 **지원되지 않습니다** — `better-sqlite3` 네이티브 바이너리는 호환되지 않습니다)
- **언어**: TypeScript 5.9 — `src/` 및 `open-sse/`에서 **100% TypeScript**(v1.0.6)
- **프레임워크**: Next.js 16 + React 19 + Tailwind CSS 4
- **데이터베이스**: LowDB(JSON) + SQLite(도메인 상태 + 프록시 로그)
- **스트리밍**: 서버에서 보낸 이벤트(SSE)
- **인증**: OAuth 2.0(PKCE) + JWT + API 키
- **테스트**: Node.js 테스트 실행기(368개 이상의 단위 테스트)
- **CI/CD**: GitHub Actions(자동 npm 게시 + 출시 시 Docker Hub)
- **웹사이트**: [omniroute.online](https://omniroute.online)
- **패키지**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **도커**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **복원력**: 회로 차단기, 지수 백오프, 천둥 방지 무리, TLS 스푸핑

---

## 📖 문서

| 문서                                         | 설명                                       |
| -------------------------------------------- | ------------------------------------------ |
| [User Guide](docs/USER_GUIDE.md)             | 공급자, 콤보, CLI 통합, 배포               |
| [API Reference](docs/API_REFERENCE.md)       | 예제가 포함된 모든 엔드포인트              |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | 일반적인 문제 및 해결 방법                 |
| [Architecture](docs/ARCHITECTURE.md)         | 시스템 아키텍처 및 내부                    |
| [Contributing](CONTRIBUTING.md)              | 개발 설정 및 지침                          |
| [OpenAPI Spec](docs/openapi.yaml)            | OpenAPI 3.0 사양                           |
| [Security Policy](SECURITY.md)               | 취약점 보고 및 보안 관행                   |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | 전체 가이드: VM + nginx + Cloudflare 설정  |
| [Features Gallery](docs/FEATURES.md)         | 스크린샷을 포함한 시각적 대시보드 둘러보기 |

### 📸 대시보드 미리보기

<details>
<summary><b>대시보드 스크린샷을 보려면 클릭하세요.</b></summary>

| 페이지         | 스크린샷                                          |
| -------------- | ------------------------------------------------- |
| **공급자**     | ![Providers](docs/screenshots/01-providers.png)   |
| **콤보**       | ![Combos](docs/screenshots/02-combos.png)         |
| **분석**       | ![Analytics](docs/screenshots/03-analytics.png)   |
| **건강**       | ![Health](docs/screenshots/04-health.png)         |
| **번역가**     | ![Translator](docs/screenshots/05-translator.png) |
| **설정**       | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI 도구**   | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **사용 로그**  | ![Usage](docs/screenshots/08-usage.png)           |
| **엔드포인트** | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute에는 여러 개발 단계에 걸쳐 **210개 이상의 기능이 계획되어 있습니다**. 주요 영역은 다음과 같습니다.

| 카테고리                     | 계획된 기능                                            | 하이라이트                                                                     |
| ---------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
| 🧠 **라우팅 및 인텔리전스**  | 25세 이상                                              | 최저 대기 시간 라우팅, 태그 기반 라우팅, 실행 전 할당량, P2C 계정 선택         |
| 🔒 **보안 및 규정 준수**     | 20세 이상                                              | SSRF 강화, 자격 증명 클로킹, 엔드포인트당 속도 제한, 관리 키 범위 지정         |
| 📊 **관측성**                | 15세 이상                                              | OpenTelemetry 통합, 실시간 할당량 모니터링, 모델별 비용 추적                   |
| 🔄 **공급자 통합**           | 20세 이상                                              | 동적 모델 레지스트리, 공급자 쿨다운, 다중 계정 Codex, Copilot 할당량 구문 분석 |
| ⚡ **성능**                  | 15세 이상                                              | 듀얼 캐시 레이어, 프롬프트 캐시, 응답 캐시, 스트리밍 Keepalive, 배치 API       |
| 🌐 **생태계**                | 10세 이상                                              | WebSocket API, 구성 핫 리로드, 분산 구성 저장소, 상용 모드                     |

### 🔜 출시 예정

- 🔗 **OpenCode 통합** — OpenCode AI 코딩 IDE에 대한 기본 공급자 지원
- 🔗 **TRAE 통합** — TRAE AI 개발 프레임워크를 완벽하게 지원
- 📦 **Batch API** — 대량 요청에 대한 비동기식 일괄 처리
- 🎯 **태그 기반 라우팅** — 사용자 정의 태그 및 메타데이터를 기반으로 요청 라우팅
- 💰 **최저 비용 전략** — 가장 저렴한 제공업체를 자동으로 선택합니다.

> 📝 [link](docs/new-features/)에서 사용 가능한 전체 기능 사양(217개 세부 사양)

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
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 스타 히스토리

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 감사의 말씀

이 포크에 영감을 준 원본 프로젝트인 **[decolua](https://github.com/decolua)**의 **[9router](https://github.com/decolua/9router)**에게 특별히 감사드립니다. OmniRoute는 추가 기능, 다중 모드 API 및 전체 TypeScript 재작성을 통해 놀라운 기반을 구축합니다.

이 JavaScript 포트에 영감을 준 최초의 Go 구현인 **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)**에게 특별히 감사드립니다.

---

## 📄 라이센스

MIT 라이선스 - 자세한 내용은 [LICENSE](LICENSE)을 참조하세요.

---

<div align="center">
  <sub> 연중무휴</sub>을 코딩하는 개발자를 위해 ❤️으로 구축됨
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
