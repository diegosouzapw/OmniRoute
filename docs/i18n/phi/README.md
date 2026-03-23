<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — Ang Libreng AI Gateway

### Huwag kailanman ihinto ang coding. Smart routing sa **LIBRE at murang mga modelo ng AI** na may awtomatikong fallback.

_Iyong unibersal na API proxy — isang endpoint, 36+ provider, zero downtime._

**Mga Pagkumpleto ng Chat • Mga Pag-embed • Pagbuo ng Imahe • Audio • Pag-rerank • 100% TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

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

### 🤖 Libreng AI Provider para sa iyong mga paboritong coding agent

_Ikonekta ang anumang AI-powered IDE o CLI tool sa pamamagitan ng OmniRoute — libreng API gateway para sa walang limitasyong coding._

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

<sub>📡 Kumonekta ang lahat ng ahente sa pamamagitan ng <code>http://localhost:20128/v1</code> o <code>http://cloud.omniroute.online/v1 >http://cloud.omniroute.online/v1 —iisang modelo at hindi config. quota</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

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

## 🤔 Bakit OmniRoute?

**Ihinto ang pag-aaksaya ng pera at pag-abot sa mga limitasyon:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Mag-e-expire ang quota ng subscription na hindi nagamit bawat buwan
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Pinipigilan ka ng mga limitasyon sa rate sa mid-coding
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Mga Mamahaling API ($20-50/buwan bawat provider)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manu-manong paglipat sa pagitan ng mga provider

**Sumalutas ito ng OmniRoute:**

- ✅ **I-maximize ang mga subscription** - Subaybayan ang quota, gamitin ang bawat bit bago i-reset
- ✅ **Auto fallback** - Subscription → API Key → Mura → Libre, zero downtime
- ✅ **Multi-account** - Round-robin sa pagitan ng mga account sa bawat provider
- ✅ **Universal** - Gumagana sa Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, anumang CLI tool

---

## 📧 Suporta

> 💬 **Sumali sa aming komunidad!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Humingi ng tulong, magbahagi ng mga tip, at manatiling updated.

- **Website**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Mga Isyu**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Orihinal na Proyekto**: [9router by decolua](https://github.com/decolua/9router)

---

## 🔄 Paano Ito Gumagana

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

## 🎯 Ano ang Lutasin ng OmniRoute — 30 Tunay na Pain Points at Mga Kaso ng Paggamit

> **Ang bawat developer na gumagamit ng mga tool ng AI ay nahaharap sa mga problemang ito araw-araw.** Binuo ang OmniRoute para lutasin ang lahat ng ito — mula sa mga pag-overrun sa gastos hanggang sa mga panrehiyong bloke, mula sa mga sirang daloy ng OAuth hanggang sa mga pagpapatakbo ng protocol at pagmamasid sa enterprise.

<details>
<summary><b>💸 1. "Nagbabayad ako para sa isang mamahaling subscription ngunit naaantala pa rin ng mga limitasyon"</b></summary>

Nagbabayad ang mga developer ng $20–200/buwan para sa Claude Pro, Codex Pro, o GitHub Copilot. Kahit na nagbabayad, may kisame ang quota — 5h ng paggamit, lingguhang limitasyon, o bawat minutong limitasyon sa rate. Sesyon sa kalagitnaan ng coding, hihinto sa pagtugon ang provider at nawawalan ng daloy at pagiging produktibo ang developer.

**Paano ito niresolba ng OmniRoute:**

- **Smart 4-Tier Fallback** — Kung maubusan ang quota ng subscription, awtomatikong magre-redirect sa API Key → Murang → Libre nang walang manu-manong interbensyon
- **Real-Time Quota Tracking** — Ipinapakita ang pagkonsumo ng token sa real-time na may reset countdown (5h, araw-araw, lingguhan)
- **Multi-Account Support** — Maramihang account sa bawat provider na may auto round-robin — kapag naubos ang isa, lilipat sa susunod
- **Custom Combos** — Nako-customize na fallback chain na may 6 na diskarte sa pagbabalanse (fill-first, round-robin, P2C, random, hindi gaanong ginagamit, cost-optimized)
- **Codex Business Quotas** — Direktang pagsubaybay sa quota ng workspace ng Negosyo/Team sa dashboard

</details>

<details>
<summary><b>🔌 2. "Kailangan kong gumamit ng maraming provider ngunit bawat isa ay may iba't ibang API"</b></summary>

Gumagamit ang OpenAI ng isang format, gumagamit si Claude (Anthropic) ng isa pa, isa pa ang Gemini. Kung gusto ng isang dev na subukan ang mga modelo mula sa iba't ibang provider o fallback sa pagitan nila, kailangan nilang i-configure muli ang mga SDK, baguhin ang mga endpoint, harapin ang mga hindi tugmang format. Ang mga custom na provider (FriendLI, NIM) ay may hindi karaniwang mga endpoint ng modelo.

**Paano ito niresolba ng OmniRoute:**

- **Pinag-isang Endpoint** — Isang `http://localhost:20128/v1` ang nagsisilbing proxy para sa lahat ng 36+ provider
- **Format Translation** — Awtomatiko at transparent: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** — Tinatanggal ang mga hindi karaniwang field (`x_groq`, `usage_breakdown`, `service_tier`) na sumisira sa OpenAI SDK v1.83+
- **Role Normalization** — Kino-convert ang `developer` → `system` para sa mga provider na hindi OpenAI; `system` → `user` para sa GLM/ERNIE
- **Think Tag Extraction** — Kinukuha ang `<think>` block mula sa mga modelo tulad ng DeepSeek R1 sa standardized `reasoning_content`
- **Structured Output para sa Gemini** — `json_schema` → `responseMimeType`/`responseSchema` awtomatikong conversion
- **`stream` ang mga default sa `false`** — Naka-align sa OpenAI spec, iniiwasan ang hindi inaasahang SSE sa Python/Rust/Go SDK

</details>

<details>
<summary><b>🌐 3. "Bina-block ng aking AI provider ang aking rehiyon/bansa"</b></summary>

Hinaharang ng mga provider tulad ng OpenAI/Codex ang pag-access mula sa ilang partikular na heyograpikong rehiyon. Nakakakuha ang mga user ng mga error tulad ng `unsupported_country_region_territory` sa panahon ng mga koneksyon sa OAuth at API. Ito ay lalo na nakakabigo para sa mga developer mula sa pagbuo ng mga bansa.

**Paano ito niresolba ng OmniRoute:**

- **3-Level Proxy Config** — Nako-configure na proxy sa 3 antas: global (lahat ng trapiko), bawat provider (isang provider lang), at bawat koneksyon/key
- **Color-Coded Proxy Badges** — Visual indicator: 🟢 global proxy, 🟡 provider proxy, 🔵 connection proxy, palaging ipinapakita ang IP
- **OAuth Token Exchange Through Proxy** — Ang daloy ng OAuth ay dumadaan din sa proxy, na nilulutas ang `unsupported_country_region_territory`
- **Mga Pagsusuri sa Koneksyon sa pamamagitan ng Proxy** — Ginagamit ng mga pagsubok sa koneksyon ang naka-configure na proxy (wala nang direktang bypass)
- **SOCKS5 Support** — Buong SOCKS5 proxy support para sa papalabas na pagruruta
- **TLS Fingerprint Spoofing** — tulad ng browser na TLS fingerprint sa pamamagitan ng `wreq-js` para i-bypass ang pag-detect ng bot

</details>

<details>
<summary><b>🆓 4. "Gusto kong gumamit ng AI para sa coding ngunit wala akong pera"</b></summary>

Hindi lahat ay maaaring magbayad ng $20–200/buwan para sa mga subscription sa AI. Ang mga mag-aaral, mga dev mula sa mga umuusbong na bansa, mga hobbyist, at mga freelancer ay nangangailangan ng access sa mga de-kalidad na modelo sa zero cost.

**Paano ito niresolba ng OmniRoute:**

- **Libreng Tier Provider Built-in** — Native na suporta para sa 100% libreng provider: iFlow (8 unlimited na modelo), Qwen (3 unlimited na modelo), Kiro (Claude nang libre), Gemini CLI (180K/buwan libre)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Free-Only Combos** — Chain `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/buwan na walang downtime
- **NVIDIA NIM Free Credits** — 1000 libreng credits na isinama
- **Cost Optimized Strategy** — Istratehiya sa pagruruta na awtomatikong pinipili ang pinakamurang available na provider

</details>

<details>
<summary><b>🔒 5. "Kailangan kong protektahan ang aking AI gateway mula sa hindi awtorisadong pag-access"</b></summary>

Kapag inilantad ang isang gateway ng AI sa network (LAN, VPS, Docker), maaaring kumonsumo ng mga token/quota ng developer ang sinumang may address. Kung walang proteksyon, ang mga API ay mahina sa maling paggamit, agarang pag-iniksyon, at pang-aabuso.

**Paano ito niresolba ng OmniRoute:**

- **API Key Management** — Pagbuo, pag-ikot, at saklaw ng bawat provider na may nakalaang `/dashboard/api-manager` na pahina
- **Mga Pahintulot sa Antas ng Modelo** — Limitahan ang mga API key sa mga partikular na modelo (`openai/*`, mga wildcard pattern), na may Allow All/Restrict toggle
- **API Endpoint Protection** — Mangangailangan ng key para sa `/v1/models` at i-block ang mga partikular na provider mula sa listahan
- **Auth Guard + CSRF Protection** — Lahat ng mga ruta ng dashboard ay protektado ng `withAuth` middleware + CSRF token
- **Rate Limiter** — Per-IP rate na naglilimita sa mga na-configure na window
- **IP Filtering** — Allowlist/blocklist para sa access control
- **Prompt Injection Guard** — Sanitization laban sa malisyosong prompt pattern
- **AES-256-GCM Encryption** — Ang mga kredensyal ay naka-encrypt sa pahinga

</details>

<details>
<summary><b>🛑 6. "Bumaba ang provider ko at nawala ang coding flow ko"</b></summary>

Ang mga tagapagbigay ng AI ay maaaring maging hindi matatag, magbalik ng 5xx na mga error, o maabot ang mga pansamantalang limitasyon sa rate. Kung ang isang dev ay nakadepende sa isang provider, maaantala sila. Kung walang mga circuit breaker, ang mga paulit-ulit na pagsubok ay maaaring mag-crash sa application.

**Paano ito niresolba ng OmniRoute:**

- **Circuit Breaker per-model** — Awtomatikong buksan/sarado na may mga na-configure na threshold at cooldown (Sarado/Bukas/Kalahating Bukas)
- **Exponential Backoff** — Progressive retry delays
- **Anti-Thundering Herd** — Mutex + semaphore na proteksyon laban sa kasabay na muling pagsubok na mga bagyo
- **Combo Fallback Chains** — Kung nabigo ang pangunahing provider, awtomatikong mahuhulog sa chain nang walang interbensyon
- **Combo Circuit Breaker** — Awtomatikong idi-disable ang mga nabigong provider sa loob ng combo chain
- **Health Dashboard** — Uptime monitoring, circuit breaker states, lockouts, cache stats, p50/p95/p99 latency

</details>

<details>
<summary><b>🔧 7. "Ang pag-configure ng bawat AI tool ay nakakapagod at paulit-ulit"</b></summary>

Gumagamit ang mga developer ng Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Ang bawat tool ay nangangailangan ng ibang config (API endpoint, key, model). Ang muling pag-configure kapag lumipat ng mga provider o modelo ay isang pag-aaksaya ng oras.

**Paano ito niresolba ng OmniRoute:**

- **CLI Tools Dashboard** — Nakatuon na page na may isang-click na setup para sa Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Bumubuo ng `chatLanguageModels.json` para sa VS Code na may maramihang pagpili ng modelo
- **Onboarding Wizard** — May gabay na 4-step na pag-setup para sa mga unang beses na user
- **Isang endpoint, lahat ng modelo** — I-configure ang `http://localhost:20128/v1` nang isang beses, i-access ang 36+ provider

</details>

<details>
<summary><b>🔑 8. "Impiyerno ang pamamahala sa mga token ng OAuth mula sa maraming provider"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — lahat ay gumagamit ng OAuth 2.0 na may mga mag-e-expire na token. Kailangang muling mag-authenticate ang mga developer, harapin ang `client_secret is missing`, `redirect_uri_mismatch`, at mga pagkabigo sa mga malalayong server. Ang OAuth sa LAN/VPS ay partikular na may problema.

**Paano ito niresolba ng OmniRoute:**

- **Auto Token Refresh** — Ang mga token ng OAuth ay nagre-refresh sa background bago mag-expire
- **OAuth 2.0 (PKCE) Built-in** — Awtomatikong daloy para sa Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Maramihang account bawat provider sa pamamagitan ng pagkuha ng token ng JWT/ID
- **OAuth LAN/Remote Fix** — Pribadong IP detection para sa `redirect_uri` + manual URL mode para sa mga malalayong server
- **OAuth Behind Nginx** — Gumagamit ng `window.location.origin` para sa reverse proxy compatibility
- **Remote OAuth Guide** — Step-by-step na gabay para sa mga kredensyal ng Google Cloud sa VPS/Docker

</details>

<details>
<summary><b>📊 9. "Hindi ko alam kung magkano ang ginagastos ko o kung saan"</b></summary>

Gumagamit ang mga developer ng maraming bayad na provider ngunit walang pinag-isang pagtingin sa paggastos. Ang bawat provider ay may sariling dashboard ng pagsingil, ngunit walang pinagsama-samang view. Maaaring tumambak ang mga hindi inaasahang gastos.

**Paano ito niresolba ng OmniRoute:**

- **Cost Analytics Dashboard** — Per-token cost tracking at pamamahala ng badyet bawat provider
- **Mga Limitasyon sa Badyet bawat Tier** — Paggastos ng kisame sa bawat tier na nagti-trigger ng awtomatikong fallback
- **Per-Model Pricing Configuration** — Nako-configure na mga presyo bawat modelo
- **Mga Istatistika ng Paggamit Bawat API Key** — Bilang ng kahilingan at timestamp na huling ginamit bawat key
- **Analytics Dashboard** — Mga stat card, chart ng paggamit ng modelo, talahanayan ng provider na may mga rate ng tagumpay at latency

</details>

<details>
<summary><b>🐛 10. "Hindi ko matukoy ang mga error at problema sa mga tawag sa AI"</b></summary>

Kapag nabigo ang isang tawag, hindi alam ng dev kung ito ay isang limitasyon sa rate, nag-expire na token, maling format, o error sa provider. Mga fragment na log sa iba't ibang terminal. Kung walang pagmamasid, ang pag-debug ay trial-and-error.

**Paano ito niresolba ng OmniRoute:**

- **Unified Logs Dashboard** — 4 na tab: Request Logs, Proxy Logs, Audit Logs, Console
- **Console Log Viewer** — Real-time na terminal-style viewer na may color-coded level, auto-scroll, paghahanap, filter
- **SQLite Proxy Logs** — Mga paulit-ulit na log na nakaligtas sa pag-restart ng server
- **Translator Playground** — 4 na mode ng pag-debug: Playground (pagsasalin ng format), Chat Tester (round-trip), Test Bench (batch), Live Monitor (real-time)
- **Request Telemetry** — p50/p95/p99 latency + X-Request-Id tracing
- **Pag-log na Nakabatay sa File na may Pag-ikot** — Kinukuha ng Console interceptor ang lahat sa log ng JSON na may pag-ikot batay sa laki

</details>

<details>
<summary><b>🏗️ 11. "Ang pag-deploy at pagpapanatili ng gateway ay kumplikado"</b></summary>

Ang pag-install, pag-configure, at pagpapanatili ng AI proxy sa iba't ibang kapaligiran (lokal, VPS, Docker, cloud) ay labor-intensive. Ang mga problema tulad ng mga hardcoded na path, `EACCES` sa mga direktoryo, port conflict, at cross-platform build ay nagdaragdag ng friction.

**Paano ito niresolba ng OmniRoute:**

- **npm global install** — `npm install -g omniroute && omniroute` — tapos na
- **Docker Multi-Platform** — AMD64 + ARM64 native (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (walang CLI tool) at `cli` (na may Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — Native app para sa Windows/macOS/Linux na may system tray, auto-start, offline mode
- **Split-Port Mode** — API at Dashboard sa magkahiwalay na port para sa mga advanced na sitwasyon (reverse proxy, container networking)
- **Cloud Sync** — I-configure ang pag-synchronize sa mga device sa pamamagitan ng Cloudflare Workers
- **DB Backup** — Awtomatikong pag-backup, pagpapanumbalik, pag-export at pag-import ng lahat ng mga setting

</details>

<details>
<summary><b>🌍 12. "Ang interface ay English-only at ang aking team ay hindi nagsasalita ng English"</b></summary>

Ang mga koponan sa mga bansang hindi nagsasalita ng Ingles, lalo na sa Latin America, Asia, at Europe, ay nakikipagpunyagi sa mga interface na Ingles lamang. Binabawasan ng mga hadlang sa wika ang pag-aampon at pinapataas ang mga error sa pagsasaayos.

**Paano ito niresolba ng OmniRoute:**

- **Dashboard i18n — 30 Wika** — Lahat ng 500+ key na isinalin kasama ang Arabic, Bulgarian, Danish, German, Spanish, Finnish, French, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Malay, Dutch, Norwegian, Polish, Portuguese (PT/BR), Romanian, Russian, Slovak, Swedish, Thai, Ukrainian, Vietnamese, Vietnamese
- **RTL Support** — Kanan-pakaliwa na suporta para sa Arabic at Hebrew
- **Multi-Language READMEs** — 30 kumpletong pagsasalin ng dokumentasyon
- **Language Selector** — Globe icon sa header para sa real-time na paglipat

</details>

<details>
<summary><b>🔄 13. "Kailangan ko ng higit pa sa chat — kailangan ko ng mga embed, larawan, audio"</b></summary>

Ang AI ay hindi lamang pagkumpleto ng chat. Kailangan ng mga dev na bumuo ng mga larawan, mag-transcribe ng audio, gumawa ng mga pag-embed para sa RAG, mag-rerank ng mga dokumento, at katamtamang nilalaman. Ang bawat API ay may iba't ibang endpoint at format.

**Paano ito niresolba ng OmniRoute:**

- **Mga Pag-embed** — `/v1/embeddings` na may 6 na provider at 9+ na modelo
- **Pagbuo ng Larawan** — `/v1/images/generations` na may 10 provider at 20+ modelo (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) at SD WebUI
- **Text-to-Music** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Audio Transcription** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + mga kasalukuyang provider
- **Moderations** — `/v1/moderations` — Mga pagsusuri sa kaligtasan ng content
- **Muling pagraranggo** — `/v1/rerank` — Muling pagraranggo ng kaugnayan ng dokumento
- **Responses API** — Buong `/v1/responses` na suporta para sa Codex

</details>

<details>
<summary><b>🧪 14. "Wala akong paraan para subukan at paghambingin ang kalidad sa mga modelo"</b></summary>

Gustong malaman ng mga developer kung aling modelo ang pinakamainam para sa kanilang kaso ng paggamit — code, pagsasalin, pangangatwiran — ngunit mabagal ang paghahambing nang manu-mano. Walang pinagsamang mga tool sa eval ang umiiral.

**Paano ito niresolba ng OmniRoute:**

- **LLM Evaluations** — Golden set testing na may 10 pre-loaded na case na sumasaklaw sa mga pagbati, matematika, heograpiya, pagbuo ng code, pagsunod sa JSON, pagsasalin, markdown, pagtanggi sa kaligtasan
- **4 na Istratehiya sa Pagtutugma** — `exact`, `contains`, `regex`, `custom` (JS function)
- **Translator Playground Test Bench** — Batch testing na may maraming input at inaasahang output, cross-provider na paghahambing
- **Chat Tester** — Buong round-trip na may visual response rendering
- **Live Monitor** — Real-time na stream ng lahat ng kahilingang dumadaloy sa proxy

</details>

<details>
<summary><b>📈 15. "Kailangan kong mag-scale nang hindi nawawala ang performance"</b></summary>

Habang lumalaki ang dami ng kahilingan, nang walang pag-cache sa parehong mga tanong ay bumubuo ng mga dobleng gastos. Nang walang idempotency, humihiling ang duplicate sa pagpoproseso ng basura. Dapat igalang ang mga limitasyon sa rate ng bawat provider.

**Paano ito niresolba ng OmniRoute:**

- **Semantic Cache** — Ang two-tier na cache (pirma + semantiko) ay binabawasan ang gastos at latency
- **Request Idempotency** — 5s deduplication window para sa magkaparehong mga kahilingan
- **Pagtukoy sa Limitasyon ng Rate** — RPM ng bawat provider, min na gap, at max na kasabay na pagsubaybay
- **Editable Rate Limits** — Configurable defaults in Settings → Resilience with persistence
- **API Key Validation Cache** — 3-tier na cache para sa performance ng produksyon
- **Health Dashboard na may Telemetry** — p50/p95/p99 latency, cache stats, uptime

</details>

<details>
<summary><b>🤖 16. "Gusto kong kontrolin ang gawi ng modelo sa buong mundo"</b></summary>

Mga developer na gusto ang lahat ng tugon sa isang partikular na wika, na may partikular na tono, o gustong limitahan ang mga token ng pangangatwiran. Ang pag-configure nito sa bawat tool/kahilingan ay hindi praktikal.

**Paano ito niresolba ng OmniRoute:**

- **System Prompt Injection** — Inilapat ang pandaigdigang prompt sa lahat ng kahilingan
- **Thinking Budget Validation** — Reasoning token allocation control bawat kahilingan (passthrough, auto, custom, adaptive)
- **6 Mga Istratehiya sa Pagruruta** — Mga pandaigdigang diskarte na tumutukoy kung paano ipinamamahagi ang mga kahilingan
- **Wildcard Router** — Ang mga pattern ng `provider/*` ay dynamic na ruta sa anumang provider
- **Combo Enable/Disable Toggle** — I-toggle ang mga combo nang direkta mula sa dashboard
- **Toggle ng Provider** — I-enable/i-disable ang lahat ng koneksyon para sa isang provider sa isang click
- **Mga Naka-block na Provider** — Ibukod ang mga partikular na provider mula sa listahan ng `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Kailangan ko ng mga tool sa MCP bilang mga first-class na kakayahan ng produkto"</b></summary>

Maraming AI gateway ang naglalantad sa MCP bilang isang nakatagong detalye ng pagpapatupad. Ang mga koponan ay nangangailangan ng isang nakikita, napapamahalaang layer ng operasyon.

**Paano ito niresolba ng OmniRoute:**

- Lumilitaw ang MCP sa dashboard navigation at tab ng endpoint protocol
- Nakatuon na pahina ng pamamahala ng MCP na may proseso, mga tool, saklaw, at pag-audit
- Built-in na quick-start para sa `omniroute --mcp` at onboarding ng kliyente

</details>

<details>
<summary><b>🧠 18. "Kailangan ko ng A2A orchestration na may sync + stream task path"</b></summary>

Ang mga daloy ng trabaho ng ahente ay nangangailangan ng parehong direktang tugon at matagal na naka-stream na pagpapatupad na may kontrol sa lifecycle.

**Paano ito niresolba ng OmniRoute:**

- A2A JSON-RPC endpoint (`POST /a2a`) na may `message/send` at `message/stream`
- SSE streaming na may terminal state propagation
- Mga task lifecycle API para sa `tasks/get` at `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Kailangan ko ng totoong kalusugan ng proseso ng MCP, hindi nahulaan ang status"</b></summary>

Kailangang malaman ng mga operational team kung talagang buhay ang MCP, hindi lang kung maaabot ang isang API.

**Paano ito niresolba ng OmniRoute:**

- Runtime heartbeat file na may PID, timestamp, transport, bilang ng tool, at mode ng saklaw
- MCP status API na pinagsasama ang tibok ng puso + kamakailang aktibidad
- Mga UI status card para sa pagiging bago ng proseso/uptime/heartbeat

</details>

<details>
<summary><b>📋 20. "Kailangan ko ng auditable MCP tool execution"</b></summary>

Kapag ang mga tool ay nag-mutate ng config o nag-trigger ng mga pagkilos ng ops, ang mga team ay nangangailangan ng forensic traceability.

**Paano ito niresolba ng OmniRoute:**

- SQLite-backed audit logging para sa mga tawag sa tool ng MCP
- Mga filter ayon sa tool, tagumpay/kabiguan, API key, at pagination
- Dashboard audit table + stats endpoints para sa automation

</details>

<details>
<summary><b>🔐 21. "Kailangan ko ng mga saklaw na pahintulot ng MCP sa bawat pagsasama"</b></summary>

Ang iba't ibang mga kliyente ay dapat magkaroon ng hindi gaanong pribilehiyong pag-access sa mga kategorya ng tool.

**Paano ito niresolba ng OmniRoute:**

- 9 na butil na saklaw ng MCP para sa kontroladong pag-access ng tool
- Pagpapatupad ng saklaw at kakayahang makita sa UI ng pamamahala ng MCP
- Ligtas na default na postura para sa operational tooling

</details>

<details>
<summary><b>⚙️ 22. "Kailangan ko ng mga kontrol sa pagpapatakbo nang hindi nagre-redeploy"</b></summary>

Ang mga koponan ay nangangailangan ng mabilis na mga pagbabago sa runtime sa panahon ng mga insidente o mga kaganapan sa gastos.

**Paano ito niresolba ng OmniRoute:**

- Lumipat ng combo activation nang direkta mula sa MCP dashboard
- Ilapat ang mga profile ng katatagan mula sa paunang natukoy na mga pack ng patakaran
- I-reset ang estado ng circuit breaker mula sa parehong panel ng mga operasyon

</details>

<details>
<summary><b>🔄 23. "Kailangan ko ng live A2A task lifecycle visibility at pagkansela"</b></summary>

Kung walang lifecycle visibility, ang mga insidente ng gawain ay nagiging mahirap subukan.

**Paano ito niresolba ng OmniRoute:**

- Listahan ng gawain/pag-filter ayon sa estado/kasanayan sa pagination
- Mag-drill-down sa metadata ng gawain, mga kaganapan, at mga artifact
- Endpoint ng pagkansela ng gawain at pagkilos ng UI na may kumpirmasyon

</details>

<details>
<summary><b>🌊 24. "Kailangan ko ng mga aktibong sukatan ng stream para sa A2A load"</b></summary>

Ang mga stream ng workflow ay nangangailangan ng operational insight sa concurrency at live na koneksyon.

**Paano ito niresolba ng OmniRoute:**

- Mga aktibong stream counter na isinama sa A2A status
- Mga bilang ng huling timestamp ng gawain at bawat estado
- A2A dashboard card para sa real-time na pagsubaybay sa ops

</details>

<details>
<summary><b>🪪 25. "Kailangan ko ng karaniwang pagtuklas ng ahente para sa mga kliyente"</b></summary>

Ang mga panlabas na kliyente at orkestra ay nangangailangan ng metadata na nababasa ng makina para sa onboarding.

**Paano ito niresolba ng OmniRoute:**

- Nalantad ang Agent Card sa `/.well-known/agent.json`
- Mga kakayahan at kasanayan na ipinapakita sa management UI
- Kasama sa A2A status API ang metadata ng pagtuklas para sa automation

</details>

<details>
<summary><b>🧭 26. "Kailangan ko ang pagtuklas ng protocol sa UX ng produkto"</b></summary>

Kung hindi matuklasan ng mga user ang mga surface ng protocol, bumababa ang kalidad ng pag-aampon at suporta.

**Paano ito niresolba ng OmniRoute:**

- Mga entry sa sidebar para sa MCP at A2A
- Tab na Mga Protokol ng pahina ng Endpoint na may mabilis na pagsisimula at katayuan
- Mga link mula sa pangkalahatang-ideya hanggang sa nakalaang mga dashboard ng pamamahala

</details>

<details>
<summary><b>🧪 27. "Kailangan ko ng end-to-end protocol validation sa mga totoong kliyente"</b></summary>

Ang mga kunwaring pagsubok ay hindi sapat upang patunayan ang pagiging tugma ng protocol bago ilabas.

**Paano ito niresolba ng OmniRoute:**

- E2E suite na nagbo-boot ng app at gumagamit ng totoong MCP SDK client transport
- Mga pagsubok sa A2A client para sa pagtuklas, pagpapadala, pag-stream, pagkuha, at pagkansela ng mga daloy
- Cross-check assertion laban sa MCP audit at A2A tasks API

</details>

<details>
<summary><b>📡 28. "Kailangan ko ng pinag-isang observability sa lahat ng interface"</b></summary>

Ang paghahati ng observability sa pamamagitan ng protocol ay lumilikha ng mga blind spot at mas mahabang MTTR.

**Paano ito niresolba ng OmniRoute:**

- Pinag-isang mga dashboard/log/analytics sa isang produkto
- Health + audit + humiling ng telemetry sa mga layer ng OpenAI, MCP, at A2A
- Mga Operational API para sa status at automation

</details>

<details>
<summary><b>💼 29. "Kailangan ko ng isang runtime para sa proxy + tool + orkestrasyon ng ahente"</b></summary>

Ang pagpapatakbo ng maraming magkakahiwalay na serbisyo ay nagpapataas ng gastos sa pagpapatakbo at mga mode ng pagkabigo.

**Paano ito niresolba ng OmniRoute:**

- OpenAI-compatible na proxy, MCP server, at A2A server sa isang stack
- Nakabahaging auth, resilience, data store, at observability
- Pare-parehong modelo ng patakaran sa lahat ng surface ng pakikipag-ugnayan

</details>

<details>
<summary><b>🚀 30. "Kailangan kong magpadala ng mga ahenteng daloy ng trabaho nang walang glue-code sprawl"</b></summary>

Nawawalan ng bilis ang mga koponan kapag nagtatahi ng maraming ad-hoc na serbisyo at script.

**Paano ito niresolba ng OmniRoute:**

- Pinag-isang endpoint na diskarte para sa mga kliyente at ahente
- Mga built-in na UI sa pamamahala ng protocol at mga daanan sa pagpapatunay ng usok
- Mga pundasyong handa sa produksyon (seguridad, pag-log, katatagan, backup)

</details>

### Mga Halimbawang Playbook

**Playbook A: I-maximize ang bayad na subscription + murang backup**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Zero-cost coding stack**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7 always-on fallback chain**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Ahente ops sa MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Mabilis na Pagsisimula

**1. I-install sa buong mundo:**

```bash
npm install -g omniroute
omniroute
```

🎉 Magbubukas ang dashboard sa `http://localhost:20128`

| Utos                    | Paglalarawan                            |
| ----------------------- | --------------------------------------- |
| `omniroute`             | Simulan ang server (default port 20128) |
| `omniroute --port 3000` | Gumamit ng custom na port               |
| `omniroute --no-open`   | Huwag awtomatikong buksan ang browser   |
| `omniroute --help`      | Ipakita ang tulong                      |

**2. Ikonekta ang isang LIBRENG provider:**

Dashboard → Mga Provider → Ikonekta ang **Claude Code** o **Antigravity** → OAuth login → Tapos na!

**3. Gamitin sa iyong CLI tool:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**Iyon na!** Magsimulang mag-coding gamit ang LIBRENG mga modelo ng AI.

**Alternatibong — tumakbo mula sa pinagmulan:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

Available ang OmniRoute bilang isang pampublikong larawan ng Docker sa [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Mabilis na pagtakbo:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Na may environment file:**

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

**Gumagamit ng Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Larawan                  | Tag      | Sukat  | Paglalarawan                   |
| ------------------------ | -------- | ------ | ------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Pinakabagong stable na release |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB | Kasalukuyang bersyon           |

---

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 Pagpepresyo sa isang Sulyap

| Tier                | Provider          | Gastos                   | I-reset ang Quota    | Pinakamahusay Para sa           |
| ------------------- | ----------------- | ------------------------ | -------------------- | ------------------------------- |
| **💳 SUBSCRIPTION** | Claude Code (Pro) | $20/buwan                | 5h + lingguhan       | Naka-subscribe na               |
|                     | Codex (Plus/Pro)  | $20-200/buwan            | 5h + lingguhan       | Mga user ng OpenAI              |
|                     | Gemini CLI        | **LIBRE**                | 180K/buwan + 1K/araw | Lahat!                          |
|                     | GitHub Copilot    | $10-19/buwan             | Buwanang             | Mga user ng GitHub              |
| **🔑 API KEY**      | NVIDIA NIM        | **LIBRE** (1000 credits) | Isang beses          | Libreng tier na pagsubok        |
|                     | DeepSeek          | Pay-per-use              | Wala                 | Pinakamahusay na presyo/kalidad |
|                     | Groq              | Libreng tier + bayad     | Limitado ang rate    | Napakabilis na hinuha           |
|                     | xAI (Grok)        | Pay-per-use              | Wala                 | Mga modelong Grok               |
|                     | Mistral           | Libreng tier + bayad     | Limitado ang rate    | European AI                     |
|                     | OpenRouter        | Pay-per-use              | Wala                 | 100+ modelo                     |
| **💰 MURA**         | GLM-4.7           | $0.6/1M                  | Araw-araw 10AM       | Backup ng badyet                |
|                     | MiniMax M2.1      | $0.2/1M                  | 5 oras na rolling    | Pinaka murang opsyon            |
|                     | Kimi K2           | $9/buwan flat            | 10M token/buwan      | Nahuhulaang gastos              |
| **🆓 LIBRE**        | iFlow             | $0                       | Walang limitasyong   | 8 mga modelong libre            |
|                     | Qwen              | $0                       | Walang limitasyong   | 3 mga modelong libre            |
|                     | Kiro              | $0                       | Walang limitasyong   | Claude libre                    |

**💡 Pro Tip:** Magsimula sa Gemini CLI (180K libre/buwan) + iFlow (walang limitasyong libre) combo = $0 na halaga!

---

## 💡 Mga Pangunahing Tampok

### 🧠 Core Routing at Intelligence

| Tampok                          | Ano ang Ginagawa Nito                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| 🎯 **Smart 4-Tier Fallback**    | Auto-ruta: Subscription → API Key → Mura → Libre                                             |
| 📊 **Real-Time Quota Tracking** | Live na bilang ng token + reset countdown bawat provider                                     |
| 🔄 **Format Translation**       | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro seamless + response sanitization                    |
| 👥 **Suporta sa Multi-Account** | Maramihang account sa bawat provider na may matalinong pagpili                               |
| 🔄 **Auto Token Refresh**       | Awtomatikong nagre-refresh ang mga token ng OAuth sa muling pagsubok                         |
| 🎨 **Mga Custom na Combos**     | 6 na diskarte: fill-first, round-robin, p2c, random, hindi gaanong ginagamit, cost-optimized |
| 🧩 **Mga Custom na Modelo**     | Magdagdag ng anumang ID ng modelo sa anumang provider                                        |
| 🌐 **Wildcard Router**          | Iruta ang `provider/*` na mga pattern sa anumang provider nang dynamic na                    |
| 🧠 **Badyet sa Pag-iisip**      | Passthrough, auto, custom, at adaptive mode para sa mga modelo ng pangangatwiran             |
| 🔀 **Model Aliases**            | Auto-forward deprecated model IDs to current replacements (built-in + custom)                |
| ⚡ **Background Degradation**   | Auto-route background tasks (titles, summaries) to cheaper models                            |
| 💬 **System Prompt Injection**  | Inilapat ang global system prompt sa lahat ng kahilingan                                     |
| 📄 **Responses API**            | Buong OpenAI Responses API (`/v1/responses`) na suporta para sa Codex                        |

### 🎵 Mga Multi-Modal na API

| Tampok                     | Ano ang Ginagawa Nito                                                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Pagbuo ng Larawan**   | `/v1/images/generations` — 4 na provider, 9+ na modelo                                                                                                                     |
| 📐 **Mga Pag-embed**       | `/v1/embeddings` — 6 na provider, 9+ na modelo                                                                                                                             |
| 🎤 **Audio Transcription** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Text-to-Speech**      | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Mga Pag-moderate**    | `/v1/moderations` — Mga pagsusuri sa kaligtasan ng nilalaman                                                                                                               |
| 🔀 **Reranking**           | `/v1/rerank` — Muling pagraranggo ng kaugnayan ng dokumento                                                                                                                |

### 🛡️ Katatagan at Seguridad

| Tampok                                    | Ano ang Ginagawa Nito                                                                  |
| ----------------------------------------- | -------------------------------------------------------------------------------------- |
| 🔌 **Circuit Breaker**                    | Awtomatikong buksan/isara ang bawat provider na may mga na-configure na threshold      |
| 🎯 **Endpoint-Aware Models**              | Custom models declare supported endpoints + API format                                 |
| 🛡️ **Anti-Thundering Herd**               | Mutex + semaphore rate-limit para sa mga API key provider                              |
| 🧠 **Semantic Cache**                     | Binabawasan ng two-tier na cache (pirma + semantiko) ang gastos at latency             |
| ⚡ **Humiling ng Idempotency**            | 5s dedup window para sa mga duplicate na kahilingan                                    |
| 🔒 **TLS Fingerprint Spoofing**           | I-bypass ang TLS-based na bot detection sa pamamagitan ng wreq-js                      |
| 🔏 **CLI Fingerprint Matching**           | Matches native CLI request signatures — **reduces ban risk while preserving proxy IP** |
| 🌐 **Pag-filter ng IP**                   | Allowlist/blocklist para sa API access control                                         |
| 📊 **Mga Nae-edit na Limitasyon sa Rate** | Configurable RPM, min gap, at max na kasabay sa antas ng system                        |
| 💾 **Rate Limit Persistence**             | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness           |
| 🔄 **Token Refresh Resilience**           | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                 |
| 🛡 **Proteksyon sa Endpoint ng API**      | Auth gating + pagharang ng provider para sa `/models` endpoint                         |
| 🔒 **Proxy Visibility**                   | Mga color-coded na badge: 🟢 global, 🟡 provider, 🔵 per-connection na may IP display  |
| 🌐 **3-Level Proxy Config**               | I-configure ang mga proxy sa global, per-provider, o per-connection level              |

### 📊 Pagmamasid at Analytics

| Tampok                          | Ano ang Ginagawa Nito                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| 📝 **Kahilingan sa Pag-log**    | Debug mode na may buong kahilingan/tugon logs                                                |
| 💾 **SQLite Proxy Logs**        | Ang mga paulit-ulit na proxy log ay nakaligtas sa pag-restart ng server                      |
| 📊 **Analytics Dashboard**      | Recharts-powered: mga stat card, chart ng paggamit ng modelo, talahanayan ng provider        |
| 📈 **Pagsubaybay sa Pag-unlad** | Mag-opt-in sa mga kaganapan sa pag-usad ng SSE para sa streaming                             |
| 🧪 **Mga Pagsusuri sa LLM**     | Golden set testing na may 4 na diskarte sa pagtutugma                                        |
| 🔍 **Humiling ng Telemetry**    | p50/p95/p99 latency aggregation + X-Request-Id tracing                                       |
| 📋 **Dashboard ng Mga Log**     | Pinag-isang 4-tab na pahina: Mga Log ng Kahilingan, Mga Proxy Log, Mga Log ng Audit, Console |
| 🖥️ **Console Log Viewer**       | Real-time na terminal-style viewer na may level filter, search, auto-scroll                  |
| 📑 **File-Based Logging**       | Kinukuha ng Console interceptor ang lahat ng output sa JSON log file na may pag-ikot         |
| 🏥 **Dashboard ng Kalusugan**   | System uptime, circuit breaker states, lockouts, cache stats                                 |
| 💰 **Pagsubaybay sa Gastos**    | Pamamahala ng badyet + configuration ng pagpepresyo sa bawat modelo                          |

### ☁️ Deployment at Pag-sync

| Tampok                              | Ano ang Ginagawa Nito                                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| 💾 **Cloud Sync**                   | I-sync ang config sa mga device sa pamamagitan ng Cloudflare Workers                            |
| 🌐 **I-deploy Kahit Saan**          | Localhost, VPS, Docker, Cloudflare Workers                                                      |
| 🔑 **API Key Management**           | Bumuo, paikutin, at saklawin ang mga API key sa bawat provider                                  |
| 🧙 **Onboarding Wizard**            | 4-step guided setup para sa mga unang beses na user                                             |
| 🔧 **CLI Tools Dashboard**          | One-click configure Claude, Codex, Cline, OpenClaw, Kilo, Antigravity                           |
| 🔄 **Mga Backup ng DB**             | Awtomatikong pag-backup, pagpapanumbalik, pag-export at pag-import para sa lahat ng mga setting |
| 🌐 **Internasyonalisasyon**         | Buong i18n na may next-intl — suporta sa English + Portuguese (Brazil)                          |
| 🌍 **Pili ng Wika**                 | Globe icon sa header para sa real-time na paglipat ng wika (🇺🇸/🇧🇷)                              |
| 📂 **Custom na Direktoryo ng Data** | `DATA_DIR` env var to override default `~/.omniroute` storage path                              |

<details>
<summary><b>📖 Mga Detalye ng Tampok</b></summary>

### 🎯 Smart 4-Tier Fallback

Gumawa ng mga combo na may awtomatikong fallback:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Real-Time na Pagsubaybay sa Quota

- Pagkonsumo ng token bawat provider
- I-reset ang countdown (5 oras, araw-araw, lingguhan)
- Pagtatantya ng gastos para sa mga bayad na tier
- Mga ulat sa buwanang paggasta

### 🔄 Pagsasalin ng Format

Walang putol na pagsasalin sa pagitan ng mga format:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI Responses**
- Ang iyong CLI tool ay nagpapadala ng OpenAI na format → OmniRoute nagsasalin → Provider ay tumatanggap ng katutubong format
- Gumagana sa anumang tool na sumusuporta sa mga custom na endpoint ng OpenAI
- **Response sanitization** — Tinatanggal ang mga hindi karaniwang field para sa mahigpit na OpenAI SDK compatibility
- **Pag-normalize ng tungkulin** — `developer` → `system` para sa hindi OpenAI; `system` → `user` para sa mga modelo ng GLM/ERNIE
- **Think tag extraction** — `<think>` block → `reasoning_content` para sa mga modelo ng pag-iisip
- **Structured output** — `json_schema` → Gemini's `responseMimeType`/`responseSchema`

### 👥 Multi-Account Support

- Magdagdag ng maramihang mga account sa bawat provider
- Auto round-robin o priority-based na pagruruta
- Fallback sa susunod na account kapag naabot ng isa ang quota

### 🔄 Auto Token Refresh

- Awtomatikong nagre-refresh ang mga token ng OAuth bago mag-expire
- Walang kinakailangang manu-manong muling pagpapatotoo
- Walang putol na karanasan sa lahat ng provider

### 🎨 Mga Custom na Combos

- Lumikha ng walang limitasyong mga kumbinasyon ng modelo
- 6 na diskarte: fill-first, round-robin, power-of-two-choices, random, hindi gaanong ginagamit, cost-optimized
- Magbahagi ng mga combo sa mga device na may Cloud Sync

### 🏥 Dashboard ng Kalusugan

- Katayuan ng system (uptime, bersyon, paggamit ng memorya)
- Mga estado ng circuit breaker bawat provider (Sarado/Bukas/Kalahating Bukas)
- Katayuan ng limitasyon sa rate at mga aktibong lockout
- Mga istatistika ng cache ng lagda
- Latency telemetry (p50/p95/p99) + prompt cache
- I-reset ang katayuan ng kalusugan sa isang pag-click

### 🔧 Palaruan ng Tagasalin

Kasama sa OmniRoute ang isang malakas na built-in na Playground ng Translator na may **4 na mode** para sa pag-debug, pagsubok, at pagsubaybay sa mga pagsasalin ng API:

| Mode                | Paglalarawan                                                                                                                                                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Palaruan**     | Direktang pagsasalin ng format — i-paste ang anumang katawan ng kahilingan sa API at agad na makita kung paano ito isinasalin ng OmniRoute sa pagitan ng mga format ng provider (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). May kasamang mga halimbawang template at format ng auto-detection. |
| **💬 Chat Tester**  | Magpadala ng mga totoong kahilingan sa chat sa pamamagitan ng OmniRoute at tingnan ang buong round-trip: ang iyong input, ang isinaling kahilingan, ang tugon ng provider, at ang isinaling tugon pabalik. Napakahalaga para sa pagpapatunay ng combo routing.                                 |
| **🧪 Test Bench**   | Batch testing mode — tumukoy ng maraming test case na may iba't ibang input at inaasahang output, patakbuhin ang mga ito nang sabay-sabay, at paghambingin ang mga resulta sa mga provider at modelo.                                                                                          |
| **📱 Live Monitor** | Real-time na pagsubaybay sa kahilingan — panoorin ang mga papasok na kahilingan habang dumadaloy ang mga ito sa OmniRoute, tingnan ang mga pagsasalin ng format na nangyayari nang live, at tukuyin kaagad ang mga isyu.                                                                       |

**Access:** Dashboard → Translator (sidebar)

### 💾 Cloud Sync

- I-sync ang mga provider, combo, at mga setting sa mga device
- Awtomatikong pag-sync sa background
- Secure na naka-encrypt na imbakan

</details>

## 🧪 Mga Pagsusuri (Evals)

Ang OmniRoute ay may kasamang built-in na balangkas ng pagsusuri upang subukan ang kalidad ng pagtugon ng LLM laban sa isang ginintuang hanay. I-access ito sa pamamagitan ng **Analytics → Evals** sa dashboard.

### na Set

Ang pre-loaded na "OmniRoute Golden Set" ay naglalaman ng 10 test case na sumasaklaw sa:

- Pagbati, matematika, heograpiya, pagbuo ng code
- Pagsunod sa format ng JSON, pagsasalin, markdown
- Pagtanggi sa kaligtasan (nakapipinsalang nilalaman), pagbibilang, lohika ng boolean

### Estratehiya sa Pagsusuri

| Diskarte   | Paglalarawan                                                 | Halimbawa                        |
| ---------- | ------------------------------------------------------------ | -------------------------------- |
| `exact`    | Dapat na eksaktong tumugma ang output                        | `"4"`                            |
| `contains` | Ang output ay dapat maglaman ng substring (case-insensitive) | `"Paris"`                        |
| `regex`    | Ang output ay dapat tumugma sa regex pattern                 | `"1.*2.*3"`                      |
| `custom`   | Ang custom na JS function ay nagbabalik ng true/false        | `(output) => output.length > 10` |

---

## 📖 Gabay sa Pag-setup

<details>
<summary><b>💳 Mga Tagabigay ng Subscription</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Pro Tip:** Gamitin ang Opus para sa mga kumplikadong gawain, Soneto para sa bilis. Sinusubaybayan ng OmniRoute ang quota bawat modelo!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (LIBRE 180K/buwan!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Pinakamahusay na Halaga:** Malaking libreng tier! Gamitin ito bago ang mga bayad na tier.

### GitHub Copilot

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
<summary><b>🔑 API Key Provider</b></summary>

### NVIDIA NIM (LIBRE 1000 credits!)

1. Mag-sign up: [build.nvidia.com](https://build.nvidia.com)
2. Kumuha ng libreng API key (1000 inference credits kasama)
3. Dashboard → Magdagdag ng Provider → NVIDIA NIM:
   - API Key: `nvapi-your-key`

**Mga Modelo:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct`, at 50+ pa

**Pro Tip:** OpenAI-compatible na API — gumagana nang walang putol sa pagsasalin ng format ng OmniRoute!

### DeepSeek

1. Mag-sign up: [platform.deepseek.com](https://platform.deepseek.com)
2. Kunin ang API key
3. Dashboard → Magdagdag ng Provider → DeepSeek

**Mga Modelo:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (Magagamit ang Libreng Tier!)

1. Mag-sign up: [console.groq.com](https://console.groq.com)
2. Kunin ang API key (kasama ang libreng tier)
3. Dashboard → Magdagdag ng Provider → Groq

**Mga Modelo:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Pro Tip:** Napakabilis na inference — pinakamahusay para sa real-time na coding!

### OpenRouter (100+ Modelo)

1. Mag-sign up: [openrouter.ai](https://openrouter.ai)
2. Kunin ang API key
3. Dashboard → Magdagdag ng Provider → OpenRouter

**Mga Modelo:** I-access ang 100+ na modelo mula sa lahat ng pangunahing provider sa pamamagitan ng iisang API key.

</details>

<details>
<summary><b>💰 Mga Murang Provider (Backup)</b></summary>

### GLM-4.7 (Araw-araw na pag-reset, $0.6/1M)

1. Mag-sign up: [Zhipu AI](https://open.bigmodel.cn/)
2. Kumuha ng API key mula sa Coding Plan
3. Dashboard → Magdagdag ng API Key:
   - Provider: `glm`
   - API Key: `your-key`

**Gamitin:** `glm/glm-4.7`

**Pro Tip:** Nag-aalok ang Coding Plan ng 3× na quota sa 1/7 na halaga! I-reset araw-araw 10:00 AM.

### MiniMax M2.1 (5h reset, $0.20/1M)

1. Mag-sign up: [MiniMax](https://www.minimax.io/)
2. Kunin ang API key
3. Dashboard → Magdagdag ng API Key

**Gamitin:** `minimax/MiniMax-M2.1`

**Pro Tip:** Ang pinakamurang opsyon para sa mahabang konteksto (1M token)!

### Kimi K2 ($9/month flat)

1. Mag-subscribe: [Moonshot AI](https://platform.moonshot.ai/)
2. Kunin ang API key
3. Dashboard → Magdagdag ng API Key

**Gamitin:** `kimi/kimi-latest`

**Pro Tip:** Nakapirming $9/buwan para sa 10M token = $0.90/1M epektibong gastos!

</details>

<details>
<summary><b>🆓 LIBRENG Provider (Emergency Backup)</b></summary>

### iFlow (8 LIBRENG modelo)

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

### Qwen (3 LIBRENG modelo)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude LIBRE)

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
<summary><b>🎨 Lumikha ng mga Combo</b></summary>

### Halimbawa 1: I-maximize ang Subscription → Murang Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Halimbawa 2: Libre-Lamang (Zero na Gastos)

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
<summary><b>🔧 CLI Integration</b></summary>

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Gamitin ang pahina ng **CLI Tools** sa dashboard para sa isang pag-click na configuration, o manu-manong i-edit ang `~/.claude/settings.json`.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Pagpipilian 1 — Dashboard (inirerekomenda):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Pagpipilian 2 — Manwal:** I-edit ang `~/.openclaw/openclaw.json`:

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

> **Tandaan:** Ang OpenClaw ay gumagana lamang sa lokal na OmniRoute. Gamitin ang `127.0.0.1` sa halip na `localhost` upang maiwasan ang mga isyu sa paglutas ng IPv6.

### Cline / Magpatuloy / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Pag-troubleshoot

<details>
<summary><b>Mag-click upang palawakin ang gabay sa pag-troubleshoot</b></summary>

**"Ang modelo ng wika ay hindi nagbigay ng mga mensahe"**

- Naubos na ang quota ng provider → Suriin ang tracker ng quota ng dashboard
- Solusyon: Gumamit ng combo fallback o lumipat sa mas murang tier

**Paglilimita sa rate**

- Out na ang quota ng subscription → Fallback sa GLM/MiniMax
- Magdagdag ng combo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Nag-expire ang token ng OAuth**

- Auto-refresh ng OmniRoute
- Kung magpapatuloy ang mga isyu: Dashboard → Provider → Muling kumonekta

**Mataas na gastos**

- Suriin ang mga istatistika ng paggamit sa Dashboard → Mga Gastos
- Ilipat ang pangunahing modelo sa GLM/MiniMax
- Gumamit ng libreng tier (Gemini CLI, iFlow) para sa mga hindi kritikal na gawain

**Nagbubukas ang dashboard sa maling port**

- Itakda ang `PORT=20128` at `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Mga error sa cloud sync**

- I-verify ang `BASE_URL` na mga puntos sa iyong running instance
- I-verify ang `CLOUD_URL` na mga puntos sa iyong inaasahang cloud endpoint
- Panatilihing nakahanay ang mga value ng `NEXT_PUBLIC_*` sa mga value sa gilid ng server

**Hindi gumagana ang unang pag-login**

- Suriin ang `INITIAL_PASSWORD` sa `.env`
- Kung hindi nakatakda, ang fallback na password ay `123456`

**Walang mga log ng kahilingan**

- Itakda ang `ENABLE_REQUEST_LOGS=true` sa `.env`

**Ang pagsubok sa koneksyon ay nagpapakita ng "Di-wasto" para sa mga provider na katugma sa OpenAI**

- Maraming provider ang hindi naglalantad ng `/models` endpoint
- Kasama sa OmniRoute v1.0.6+ ang fallback validation sa pamamagitan ng mga pagkumpleto ng chat
- Tiyaking may kasamang `/v1` suffix ang base URL

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ MAHALAGA para sa usuários com OmniRoute sa VPS/Docker/servidor remoto**

### OAuth

Os provedores **Antigravity** at **Gemini CLI** gamit ang **Google OAuth 2.0** para sa autenticação. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas no Google Cloud Console do aplicativo.

Bilang credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para sa `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (hal: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

### Solusyon: I-configure ang suas próprias credenciais OAuth

Você precisa criar um **OAuth 2.0 Client ID** walang Google Cloud Console com a URI do seu servidor.

#### Passo a passo

**1. Mag-access sa Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 Client ID**

- Clique em **"+ Lumikha ng Mga Kredensyal"** → **"OAuth client ID"**
- Tipo de aplicativo: **"Web application"**
- Pangalan: escolha qualquer nome (hal: `OmniRoute Remote`)

**3. Idagdag bilang Mga Awtorisadong URI sa Pag-redirect**

Walang campo **"Mga Awtorisadong URI sa pag-redirect"**, idagdag:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio ou IP do seu servidor (kasama ang porta se necessário, hal: `http://45.33.32.156:20128/callback`).

**4. I-save at kopyahin bilang kredensyal**

Após criar, o Google mostrará o **Client ID** at ** Client Secret**.

**5. I-configure bilang variáveis de ambiente**

No seu `.env` (ou nas variáveis de ambiente do Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie o OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Dashboard → Mga Provider → Antigravity (ou Gemini CLI) → OAuth

Agora o Google redirectionará corretamente para sa `https://seu-servidor.com/callback` at a autenticação funcionará.

---

#### Workaround temporário (sem configurar credenciais próprias)

Se não quiser criar credenciais próprias agora, may posibilidad na magamit o fluxo **manual de URL**:

1. OmniRoute abrirá a URL de authorização do Google
2. Após você authorizar, o Google tentará redirectionar para sa `localhost` (que falha no servidor remoto)
3. **Kopyahin ang isang URL completa** sa barra de endereço do seu browser (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Clique em **"Kumonekta"**

> Ang workaround na ito ay gumagana sa pamamagitan ng código de authorização na URL ay maaaring mag-redirect sa iyong carregado ou não.

</details>

---

## 🛠️

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ ay **hindi suportado** — `better-sqlite3` native binary ay hindi tugma)
- **Wika**: TypeScript 5.9 — **100% TypeScript** sa `src/` at `open-sse/` (v1.0.6)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (domain state + proxy logs)
- **Streaming**: Mga Kaganapang Ipinadala ng Server (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API Keys
- **Pagsubok**: Node.js test runner (368+ unit test)
- **CI/CD**: GitHub Actions (auto npm publish + Docker Hub on release)
- **Website**: [omniroute.online](https://omniroute.online)
- **Package**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resilience**: Circuit breaker, exponential backoff, anti-thundering herd, TLS spoofing

---

## 📖 Dokumentasyon

| Dokumento                                    | Paglalarawan                                        |
| -------------------------------------------- | --------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Mga provider, combo, CLI integration, deployment    |
| [API Reference](docs/API_REFERENCE.md)       | Lahat ng mga endpoint na may mga halimbawa          |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Mga karaniwang problema at solusyon                 |
| [Architecture](docs/ARCHITECTURE.md)         | Arkitektura ng system at mga panloob                |
| [Contributing](CONTRIBUTING.md)              | Pag-setup at mga alituntunin ng pag-unlad           |
| [OpenAPI Spec](docs/openapi.yaml)            | OpenAPI 3.0 na detalye                              |
| [Security Policy](SECURITY.md)               | Pag-uulat ng kahinaan at mga kasanayan sa seguridad |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Kumpletong gabay: VM + nginx + Cloudflare setup     |
| [Features Gallery](docs/FEATURES.md)         | Visual dashboard tour na may mga screenshot         |

### 📸 Preview ng Dashboard

<details>
<summary><b>Mag-click para makita ang mga screenshot ng dashboard</b></summary>

| Pahina                  | Screenshot                                        |
| ----------------------- | ------------------------------------------------- |
| **Mga Provider**        | ![Providers](docs/screenshots/01-providers.png)   |
| **Combos**              | ![Combos](docs/screenshots/02-combos.png)         |
| **Analytics**           | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Kalusugan**           | ![Health](docs/screenshots/04-health.png)         |
| **Tagasalin**           | ![Translator](docs/screenshots/05-translator.png) |
| **Mga Setting**         | ![Settings](docs/screenshots/06-settings.png)     |
| **Mga CLI Tools**       | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Mga Log ng Paggamit** | ![Usage](docs/screenshots/08-usage.png)           |
| **Endpoint**            | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

Ang OmniRoute ay may **210+ feature na binalak** sa maraming yugto ng pag-unlad. Narito ang mga pangunahing lugar:

| Kategorya                        | Mga Nakaplanong Tampok | Mga Highlight                                                                                     |
| -------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------- |
| 🧠 **Routing at Intelligence**   | 25+                    | Lowest-latency routing, tag-based na routing, quota preflight, P2C account selection              |
| 🔒 **Seguridad at Pagsunod**     | 20+                    | SSRF hardening, credential cloaking, rate-limit sa bawat endpoint, management key scoping         |
| 📊 **Pagmamasid**                | 15+                    | Pagsasama ng OpenTelemetry, real-time na pagsubaybay sa quota, pagsubaybay sa gastos bawat modelo |
| 🔄 **Mga Pagsasama ng Provider** | 20+                    | Dynamic na model registry, provider cooldowns, multi-account Codex, Copilot quota parsing         |
| ⚡ **Pagganap**                  | 15+                    | Dual cache layer, prompt cache, response cache, streaming keepalive, batch API                    |
| 🌐 **Ecosystem**                 | 10+                    | WebSocket API, config hot-reload, distributed config store, commercial mode                       |

### 🔜 Malapit na

- 🔗 **OpenCode Integration** — Suporta ng katutubong provider para sa OpenCode AI coding IDE
- 🔗 **TRAE Integration** — Buong suporta para sa balangkas ng pag-develop ng TRAE AI
- 📦 **Batch API** — Asynchronous na pagproseso ng batch para sa maramihang kahilingan
- 🎯 **Tag-Based Routing** — Mga kahilingan sa ruta batay sa mga custom na tag at metadata
- 💰 **Diskarte sa Pinakamababang Gastos** — Awtomatikong piliin ang pinakamurang available na provider

> 📝 Available ang buong detalye ng feature sa [link](docs/new-features/) (217 detalyadong spec)

---

## 👥 Mga nag-aambag

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Paano Mag-ambag

1. I-fork ang repositoryo
2. Gawin ang iyong sangay ng tampok (`git checkout -b feature/amazing-feature`)
3. Ibigay ang iyong mga pagbabago (`git commit -m 'Add amazing feature'`)
4. Itulak sa sangay (`git push origin feature/amazing-feature`)
5. Magbukas ng Pull Request

Tingnan ang [CONTRIBUTING.md](CONTRIBUTING.md) para sa mga detalyadong alituntunin.

### Naglalabas ng Bagong Bersyon

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Kasaysayan ng Bituin

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Pasasalamat

Espesyal na pasasalamat kay **[9router](https://github.com/decolua/9router)** ni **[decolua](https://github.com/decolua)** — ang orihinal na proyektong nagbigay inspirasyon sa tinidor na ito. Bumubuo ang OmniRoute sa hindi kapani-paniwalang pundasyong iyon na may mga karagdagang feature, multi-modal na API, at buong TypeScript na muling pagsulat.

Espesyal na salamat sa **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — ang orihinal na pagpapatupad ng Go na nagbigay inspirasyon sa JavaScript port na ito.

---

## 📄 Lisensya

Lisensya ng MIT - tingnan ang [LICENSE](LICENSE) para sa mga detalye.

---

<div align="center">
  <sub>Built with ❤️ para sa mga developer na nagko-code 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
