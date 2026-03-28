# 🚀 OmniRoute — Ang Libreng AI Gateway

### Huwag kailanman ihinto ang coding. Smart routing sa **LIBRE at murang mga modelo ng AI** na may awtomatikong fallback.

_Ang iyong universal API proxy — isang endpoint, 67+ provider, zero downtime. Ngayon ay may **MCP at A2A** na orkestrasyon ng ahente._

**Mga Pagkumpleto sa Chat • Mga Pag-embed • Pagbuo ng Imahe • Video • Musika • Audio • Pag-rerank • **Paghahanap sa Web** • MCP Server • A2A Protocol • 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Available sa:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Ano ang Bago sa v3.0.0

> **Pag-upgrade mula sa v2.9.5?** — Tingnan ang [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) para sa lahat ng pagbabago.

| Lugar                                     | Baguhin                                                                                                                                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔒 **Seguridad ng CodeQL**                | Inayos ang 10+ na alerto sa CodeQL: polynomial-redos, insecure-randomness, shell-injection remediation                                                                                           |
| ✅ **Pagpapatunay ng Ruta**               | Lahat ng 176 na ruta ng API ay napatunayan na ngayon gamit ang mga Zod schema + `validateBody()` — CI `check:route-validation:t06` pass                                                          |
| 🐛 **omniModel Tag Leak**                 | Ang mga panloob na tag na `<omniModel>` ay hindi na tumutulo sa mga kliyente sa mga tugon sa streaming ng SSE (#585)                                                                             |
| 🔑 **Registered Keys API**                | Auto-provision API keys sa pamamagitan ng `POST /api/v1/registered-keys` na may per-provider/account quota enforcement, idempotency, SHA-256 storage, at opsyonal na pag-uulat ng isyu sa GitHub |
| 🎨 **Mga Icon ng Provider**               | 130+ provider logo sa pamamagitan ng `@lobehub/icons` (SVG) na may PNG → generic fallback chain                                                                                                  |
| 🔄 **Modelo Auto-Sync**                   | 24h scheduler at manu-manong UI toggle para i-sync ang mga listahan ng modelo para sa built-in at custom na OpenAI-compatible na provider                                                        |
| 🌐 **OpenCode Zen/Go**                    | Dalawang bagong provider mula sa @kang-heewon sa pamamagitan ng PR #530: libreng tier + subscription tier sa pamamagitan ng `OpencodeExecutor`                                                   |
| 🐛 **Gemini CLI OAuth**                   | Naisasagawang error kapag nawawala ang `GEMINI_OAUTH_CLIENT_SECRET` sa Docker (ay misteryosong error sa Google)                                                                                  |
| 🐛 **OpenCode config**                    | `saveOpenCodeConfig()` ngayon ay tama ang pagsulat ng TOML sa `XDG_CONFIG_HOME`                                                                                                                  |
| 🐛 **Na-override ang naka-pin na modelo** | `body.model` wastong itinakda sa `pinnedModel` sa proteksyon ng context-cache                                                                                                                    |
| 🐛 **Codex/Claude loop**                  | `tool_result` na mga bloke ay na-convert na ngayon sa teksto upang ihinto ang walang katapusang mga loop                                                                                         |
| 🐛 **Login redirect**                     | Hindi na nag-freeze ang pag-login pagkatapos laktawan ang pag-setup ng password                                                                                                                  |
| 🐛 **Mga Windows path**                   | Ang mga path ng MSYS2/Git-Bash (`/c/...`) ay awtomatikong na-normalize sa `C:\...`                                                                                                               |

---

## 🖼️ Pangunahing Dashboard

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Preview ng Dashboard

<details>
<summary><b>Mag-click upang makita ang mga screenshot ng dashboard</b></summary>

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
| **Mga Endpoint**        | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Libreng AI Provider para sa iyong mga paboritong coding agent

_Ikonekta ang anumang AI-powered IDE o CLI tool sa pamamagitan ng OmniRoute — libreng API gateway para sa walang limitasyong coding._

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

<sub>📡 Kumonekta ang lahat ng ahente sa pamamagitan ng <code>http://localhost:20128/v1</code> o <code>http://cloud.omniroute.online/v1</code> o <code>http://cloud.omniroute.online/v1__OMNI_TOKEN —i4 na modelo at \_\_i config. quota</sub>

---

## 🤔 Bakit OmniRoute?

**Itigil ang pag-aaksaya ng pera at pag-abot sa mga limitasyon:**

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
- **Nag-aambag**: Tingnan ang [CONTRIBUTING.md](CONTRIBUTING.md), magbukas ng PR, o pumili ng `good first issue`
- **Orihinal na Proyekto**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Nag-uulat ng Bug?

Kapag nagbubukas ng isyu, mangyaring patakbuhin ang system-info command at ilakip ang nabuong file:

```bash
npm run system-info
```

Bumubuo ito ng `system-info.txt` gamit ang iyong bersyon ng Node.js, bersyon ng OmniRoute, mga detalye ng OS, mga naka-install na tool sa CLI (iflow, gemini, claude, codex, antigravity, droid, atbp.), status ng Docker/PM2, at mga system package — lahat ng kailangan namin para mabilis na ma-reproduce ang iyong isyu. Direktang ilakip ang file sa iyong isyu sa GitHub.

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
<summary><b>🔌 2. "Kailangan kong gumamit ng maramihang provider ngunit may iba't ibang API ang bawat isa"</b></summary>

Gumagamit ang OpenAI ng isang format, gumagamit si Claude (Anthropic) ng isa pa, isa pa ang Gemini. Kung gusto ng isang dev na subukan ang mga modelo mula sa iba't ibang provider o fallback sa pagitan nila, kailangan nilang i-configure muli ang mga SDK, baguhin ang mga endpoint, harapin ang mga hindi tugmang format. Ang mga custom na provider (FriendLI, NIM) ay may hindi karaniwang mga endpoint ng modelo.

**Paano ito niresolba ng OmniRoute:**

- **Pinag-isang Endpoint** — Isang solong `http://localhost:20128/v1` ang nagsisilbing proxy para sa lahat ng 67+ provider
- **Format Translation** — Awtomatiko at transparent: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** — Tinatanggal ang mga hindi karaniwang field (`x_groq`, `usage_breakdown`, `service_tier`) na sumisira sa OpenAI SDK v1.83+
- **Role Normalization** — Kino-convert ang `developer` → `system` para sa mga provider na hindi OpenAI; `system` → `user` para sa GLM/ERNIE
- **Think Tag Extraction** — Kinukuha ang `<think>` block mula sa mga modelo tulad ng DeepSeek R1 sa standardized na `reasoning_content`
- **Structured Output para sa Gemini** — `json_schema` → `responseMimeType`/`responseSchema` awtomatikong conversion
- **`stream` default sa `false`** — Naka-align sa OpenAI spec, iniiwasan ang hindi inaasahang SSE sa Python/Rust/Go SDKs

</details>

<details>
<summary><b>🌐 3. "Bina-block ng aking AI provider ang aking rehiyon/bansa"</b></summary>

Hinaharang ng mga provider tulad ng OpenAI/Codex ang pag-access mula sa ilang partikular na heyograpikong rehiyon. Nakakakuha ang mga user ng mga error tulad ng `unsupported_country_region_territory` sa panahon ng mga koneksyon sa OAuth at API. Ito ay lalo na nakakabigo para sa mga developer mula sa pagbuo ng mga bansa.

**Paano ito niresolba ng OmniRoute:**

- **3-Level Proxy Config** — Nako-configure na proxy sa 3 antas: global (lahat ng trapiko), bawat provider (isang provider lang), at bawat koneksyon/key
- **Color-Coded Proxy Badges** — Visual indicator: 🟢 global proxy, 🟡 provider proxy, 🔵 connection proxy, palaging ipinapakita ang IP
- **OAuth Token Exchange Through Proxy** — Dumadaan din sa proxy ang daloy ng OAuth, na nilulutas ang `unsupported_country_region_territory`
- **Mga Pagsusuri sa Koneksyon sa pamamagitan ng Proxy** — Ginagamit ng mga pagsubok sa koneksyon ang naka-configure na proxy (wala nang direktang bypass)
- **SOCKS5 Support** — Buong SOCKS5 proxy support para sa papalabas na pagruruta
- **TLS Fingerprint Spoofing** — Parang browser ng TLS na fingerprint sa pamamagitan ng `wreq-js` para i-bypass ang pag-detect ng bot
- **🔏 CLI Fingerprint Matching** — Muling inaayos ang mga header at body field upang tumugma sa mga native na CLI binary signature, na lubhang binabawasan ang panganib sa pag-flag ng account. Ang proxy IP ay napanatili — nakakakuha ka ng parehong stealth **at** IP masking nang sabay

</details>

<details>
<summary><b>🆓 4. "Gusto kong gumamit ng AI para sa coding ngunit wala akong pera"</b></summary>

Hindi lahat ay maaaring magbayad ng $20–200/buwan para sa mga subscription sa AI. Ang mga mag-aaral, mga dev mula sa mga umuusbong na bansa, mga hobbyist, at mga freelancer ay nangangailangan ng access sa mga de-kalidad na modelo sa zero cost.

**Paano ito niresolba ng OmniRoute:**

- **Libreng Tier Provider Built-in** — Native na suporta para sa 100% libreng provider: iFlow (5 unlimited na mga modelo sa pamamagitan ng OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 unlimited models: qwender3-wenlash3-coplus qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID nang libre), Gemini CLI (180K token/buwan libre)
- **Ollama Cloud** — Cloud-hosted Ollama models sa `api.ollama.com` na may libreng "Light usage" tier; gumamit ng `ollamacloud/<model>` prefix
- **Free-Only Combos** — Chain `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/buwan na walang downtime
- **NVIDIA NIM Free Access** — ~40 RPM dev-forever na libreng access sa 70+ na modelo sa build.nvidia.com (paglilipat mula sa mga credit patungo sa mga purong limitasyon sa rate)
- **Cost Optimized Strategy** — Istratehiya sa pagruruta na awtomatikong pinipili ang pinakamurang available na provider

</details>

<details>
<summary><b>🔒 5. "Kailangan kong protektahan ang aking AI gateway mula sa hindi awtorisadong pag-access"</b></summary>

Kapag inilantad ang isang gateway ng AI sa network (LAN, VPS, Docker), maaaring kumonsumo ng mga token/quota ng developer ang sinumang may address. Kung walang proteksyon, ang mga API ay mahina sa maling paggamit, agarang pag-iniksyon, at pang-aabuso.

**Paano ito niresolba ng OmniRoute:**

- **API Key Management** — Pagbuo, pag-ikot, at saklaw ng bawat provider na may nakalaang `/dashboard/api-manager` na pahina
- **Mga Pahintulot sa Antas ng Modelo** — Paghigpitan ang mga API key sa mga partikular na modelo (`openai/*`, mga pattern ng wildcard), gamit ang Allow All/Restrict toggle
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

- **Circuit Breaker per-model** — Auto-open/close na may mga na-configure na threshold at cooldown (Closed/Open/Half-Open), scoped per-model para maiwasan ang mga cascading block
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
- **Isang endpoint, lahat ng modelo** — I-configure ang `http://localhost:20128/v1` isang beses, i-access ang 67+ provider

</details>

<details>
<summary><b>🔑 8. "Impiyerno ang pamamahala sa mga token ng OAuth mula sa maraming provider"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — lahat ay gumagamit ng OAuth 2.0 na may mga mag-e-expire na token. Kailangang muling magpatotoo ang mga developer, harapin ang `client_secret is missing`, `redirect_uri_mismatch`, at mga pagkabigo sa mga malalayong server. Ang OAuth sa LAN/VPS ay partikular na may problema.

**Paano ito niresolba ng OmniRoute:**

- **Auto Token Refresh** — Ang mga token ng OAuth ay nagre-refresh sa background bago mag-expire
- **OAuth 2.0 (PKCE) Built-in** — Awtomatikong daloy para sa Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Maramihang account bawat provider sa pamamagitan ng pagkuha ng token ng JWT/ID
- **OAuth LAN/Remote Fix** — Pribadong IP detection para sa `redirect_uri` + manu-manong URL mode para sa mga malalayong server
- **OAuth Behind Nginx** — Gumagamit ng `window.location.origin` para sa reverse proxy compatibility
- **Remote OAuth Guide** — Step-by-step na gabay para sa mga kredensyal ng Google Cloud sa VPS/Docker

</details>

<details>
<summary><b>📊 9. "Hindi ko alam kung magkano ang ginagastos ko o kung saan"</b></summary>

Gumagamit ang mga developer ng maraming bayad na provider ngunit walang pinag-isang pagtingin sa paggastos. Ang bawat provider ay may sariling dashboard ng pagsingil, ngunit walang pinagsama-samang view. Ang mga hindi inaasahang gastos ay maaaring magtambak.

**Paano ito niresolba ng OmniRoute:**

- **Cost Analytics Dashboard** — Per-token cost tracking at pamamahala ng badyet bawat provider
- **Mga Limitasyon sa Badyet bawat Tier** — Paggastos ng kisame sa bawat tier na nagti-trigger ng awtomatikong fallback
- **Per-Model Pricing Configuration** — Nako-configure na mga presyo bawat modelo
- **Mga Istatistika ng Paggamit Bawat API Key** — Bilang ng kahilingan at timestamp na huling ginamit bawat key
- **Analytics Dashboard** — Mga stat card, chart ng paggamit ng modelo, talahanayan ng provider na may mga rate ng tagumpay at latency

</details>

<details>
<summary><b>🐛 10. "Hindi ko matukoy ang mga error at problema sa mga tawag sa AI"</b></summary>

Kapag nabigo ang isang tawag, hindi alam ng dev kung ito ay isang limitasyon sa rate, nag-expire na token, maling format, o error sa provider. Mga pira-pirasong log sa iba't ibang terminal. Kung walang pagmamasid, ang pag-debug ay trial-and-error.

**Paano ito niresolba ng OmniRoute:**

- **Unified Logs Dashboard** — 4 na tab: Request Logs, Proxy Logs, Audit Logs, Console
- **Console Log Viewer** — Real-time na terminal-style viewer na may color-coded level, auto-scroll, paghahanap, filter
- **SQLite Proxy Logs** — Mga paulit-ulit na log na nakaligtas sa pag-restart ng server
- **Translator Playground** — 4 na mode ng pag-debug: Playground (pagsasalin ng format), Chat Tester (round-trip), Test Bench (batch), Live Monitor (real-time)
- **Request Telemetry** — p50/p95/p99 latency + X-Request-Id tracing
- **Pag-log na Nakabatay sa File na may Pag-ikot** — Kinukuha ng Console interceptor ang lahat sa log ng JSON na may pag-ikot batay sa laki
- **Ulat sa Impormasyon ng System** — Ang `npm run system-info` ay bumubuo ng `system-info.txt` kasama ang iyong buong kapaligiran (bersyon ng Node, bersyon ng OmniRoute, OS, mga tool sa CLI, katayuan ng Docker/PM2). Ilakip ito kapag nag-uulat ng mga isyu para sa instant triage.

</details>

<details>
<summary><b>🏗️ 11. "Ang pag-deploy at pagpapanatili ng gateway ay kumplikado"</b></summary>

Ang pag-install, pag-configure, at pagpapanatili ng AI proxy sa iba't ibang kapaligiran (lokal, VPS, Docker, cloud) ay labor-intensive. Nagdaragdag ng friction ang mga problema tulad ng mga hardcoded path, `EACCES` sa mga direktoryo, port conflict, at cross-platform build.

**Paano ito niresolba ng OmniRoute:**

- **npm global install** — `npm install -g omniroute && omniroute` — tapos na
- **Docker Multi-Platform** — AMD64 + ARM64 native (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profile** — `base` (walang CLI tool) at `cli` (na may Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — Native app para sa Windows/macOS/Linux na may system tray, auto-start, offline mode
- **Split-Port Mode** — API at Dashboard sa magkahiwalay na port para sa mga advanced na sitwasyon (reverse proxy, container networking)
- **Cloud Sync** — I-configure ang pag-synchronize sa mga device sa pamamagitan ng Cloudflare Workers
- **DB Backup** — Awtomatikong pag-backup, pagpapanumbalik, pag-export at pag-import ng lahat ng mga setting

</details>

<details>
<summary><b>🌍 12. "Ang interface ay English-only at ang aking team ay hindi nagsasalita ng English"</b></summary>

Ang mga koponan sa mga bansang hindi nagsasalita ng Ingles, lalo na sa Latin America, Asia, at Europe, ay nakikipagpunyagi sa mga interface na Ingles lamang. Binabawasan ng mga hadlang sa wika ang pag-aampon at pinapataas ang mga error sa pagsasaayos.

**Paano ito niresolba ng OmniRoute:**

- **Dashboard i18n — 30 Wika** — Lahat ng 500+ key na isinalin kabilang ang Arabic, Bulgarian, Danish, German, Spanish, Finnish, French, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Malay, Dutch, Norwegian, Polish, Portuguese (PT/BR), Romanian, Russian, Slovak, Swedish, Thai, Ukrainian, Vietnamese,
- **RTL Support** — Kanan-pakaliwa na suporta para sa Arabic at Hebrew
- **Multi-Language READMEs** — 30 kumpletong pagsasalin ng dokumentasyon
- **Language Selector** — Globe icon sa header para sa real-time na paglipat

</details>

<details>
<summary><b>🔄 13. "Kailangan ko ng higit pa sa chat — kailangan ko ng mga pag-embed, larawan, audio"</b></summary>

Ang AI ay hindi lamang pagkumpleto ng chat. Kailangan ng mga dev na bumuo ng mga larawan, mag-transcribe ng audio, gumawa ng mga pag-embed para sa RAG, mag-rerank ng mga dokumento, at katamtamang nilalaman. Ang bawat API ay may iba't ibang endpoint at format.

**Paano ito niresolba ng OmniRoute:**

- **Mga Pag-embed** — `/v1/embeddings` na may 6 na provider at 9+ na modelo
- **Pagbuo ng Larawan** — `/v1/images/generations` na may 10 provider at 20+ modelo (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) at SD WebUI
- **Text-to-Music** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Audio Transcription** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + mga kasalukuyang provider
- **Moderations** — `/v1/moderations` — Mga pagsusuri sa kaligtasan ng content
- **Muling pagraranggo** — `/v1/rerank` — Muling pagraranggo ng kaugnayan ng dokumento
- **Responses API** — Buong `/v1/responses` na suporta para sa Codex

</details>

<details>
<summary><b>🧪 14. "Wala akong paraan para subukan at ihambing ang kalidad sa lahat ng modelo"</b></summary>

Gustong malaman ng mga developer kung aling modelo ang pinakamainam para sa kanilang kaso ng paggamit — code, pagsasalin, pangangatwiran — ngunit mabagal ang paghahambing nang manu-mano. Walang pinagsamang mga tool sa eval ang umiiral.

**Paano ito niresolba ng OmniRoute:**

- **LLM Evaluations** — Golden set testing na may 10 pre-loaded case na sumasaklaw sa mga pagbati, matematika, heograpiya, pagbuo ng code, pagsunod sa JSON, pagsasalin, markdown, pagtanggi sa kaligtasan
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
- **Wildcard Router** — `provider/*` pattern na dynamic na ruta sa anumang provider
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
<summary><b>🧠 18. "Kailangan ko ng A2A orchestration na may sync + stream task paths"</b></summary>

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
<summary><b>🔐 21. "Kailangan ko ng saklaw na mga pahintulot ng MCP sa bawat pagsasama"</b></summary>

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
<summary><b>🌊 24. "Kailangan ko ng aktibong stream metrics para sa A2A load"</b></summary>

Ang mga stream ng workflow ay nangangailangan ng operational insight sa concurrency at live na koneksyon.

**Paano ito niresolba ng OmniRoute:**

- Mga aktibong stream counter na isinama sa A2A status
- Mga huling timestamp ng gawain at mga bilang ng bawat estado
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

- Pinagsama-samang **Mga Endpoint** na pahina na may mga tab para sa Proxy, MCP, A2A, at API Endpoints
- Mga toggle ng katayuan ng inline na serbisyo (Online/Offline) para sa MCP at A2A
- Mga link mula sa pangkalahatang-ideya hanggang sa nakalaang mga tab ng pamamahala

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

### Mga Halimbawang Playbook (Integrated Use Cases)

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
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Magsimula nang Libre — Zero Configuration Cost

> I-setup ang AI coding sa ilang minuto sa **$0/buwan**. Ikonekta ang mga libreng account na ito at gamitin ang built-in na **Free Stack** combo.

| Hakbang | Aksyon                                                | Na-unlock ang Mga Provider                                         |
| ------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| 1       | Ikonekta ang **Kiro** (AWS Builder ID OAuth)          | Claude Sonnet 4.5, Haiku 4.5 — **walang limitasyon**               |
| 2       | Ikonekta ang **iFlow** (Google OAuth)                 | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1... — **unlimited** |
| 3       | Ikonekta ang **Qwen** (Device Code)                   | qwen3-coder-plus, qwen3-coder-flash... — **walang limitasyon**     |
| 4       | Ikonekta ang **Gemini CLI** (Google OAuth)            | gemini-3-flash, gemini-2.5-pro — **180K/mo libre**                 |
| 5       | `/dashboard/combos` → **Libreng Stack ($0)** template | Awtomatikong round-robin lahat ng libreng provider                 |

**Ituro ang anumang IDE/CLI sa:** `http://localhost:20128/v1` · API Key: `any-string` · Tapos na.

> **Opsyonal na karagdagang coverage (libre din):** Groq API key (30 RPM libre), NVIDIA NIM (40 RPM libre, 70+ modelo), Cerebras (1M tok/araw), LongCat API key (50M token/araw!), Cloudflare Workers AI (10K Neurons/araw, 50+ modelo).

## ⚡ Mabilis na Pagsisimula

### 1) I-install at patakbuhin

```bash
npm install -g omniroute
omniroute
```

> **pnpm user:** Patakbuhin ang `pnpm approve-builds -g` pagkatapos i-install upang paganahin ang mga native na build script na kinakailangan ng `better-sqlite3` at `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Magbubukas ang dashboard sa `http://localhost:20128` at ang API base URL ay `http://localhost:20128/v1`.

| Utos                    | Paglalarawan                                                         |
| ----------------------- | -------------------------------------------------------------------- |
| `omniroute`             | Simulan ang server (`PORT=20128`, API at dashboard sa parehong port) |
| `omniroute --port 3000` | Itakda ang canonical/API port sa 3000                                |
| `omniroute --mcp`       | Simulan ang MCP server (stdio transport)                             |
| `omniroute --no-open`   | Huwag awtomatikong buksan ang browser                                |
| `omniroute --help`      | Ipakita ang tulong                                                   |

Opsyonal na split-port mode:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Ikonekta ang mga provider at gawin ang iyong API key

1. Buksan ang Dashboard → `Providers` at ikonekta ang hindi bababa sa isang provider (OAuth o API key).
2. Buksan ang Dashboard → `Endpoints` at gumawa ng API key.
3. (Opsyonal) Buksan ang Dashboard → `Combos` at itakda ang iyong fallback chain.

### 3) Ituro ang iyong coding tool sa OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Gumagana sa Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode, at OpenAI-compatible SDK.

### 4) Paganahin at patunayan ang mga protocol (v2.0)

**MCP (para sa mga pagpapatakbong hinihimok ng tool):**

```bash
omniroute --mcp
```

Pagkatapos ay ikonekta ang iyong MCP client sa `stdio` at mga tool sa pagsubok tulad ng:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (para sa mga daloy ng trabaho ng ahente-sa-agent):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) I-validate ang lahat ng end-to-end (inirerekomenda)

```bash
npm run test:protocols:e2e
```

Ang suite na ito ay nagpapatunay ng totoong MCP at A2A na mga daloy ng kliyente laban sa isang tumatakbong app.

### Alternatibo: tumakbo mula sa pinagmulan

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

Ang OmniRoute ay available bilang pampublikong Docker na imahe sa [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

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

## 🖥️ Desktop App — Offline at Palaging Naka-on

> 🆕 **BAGO!** Available na ngayon ang OmniRoute bilang **katutubong desktop application** para sa Windows, macOS, at Linux.

Patakbuhin ang OmniRoute bilang isang standalone na desktop app — walang terminal, walang browser, walang internet na kailangan para sa mga lokal na modelo. Kasama sa Electron-based na app ang:

- 🖥️ **Native Window** — Nakatuon na window ng app na may integration ng system tray
- 🔄 **Auto-Start** — Ilunsad ang OmniRoute sa system login
- 🔔 **Mga Katutubong Notification** — Makakuha ng mga alerto para sa pagkaubos ng quota o mga isyu sa provider
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Gumagana nang ganap offline sa naka-bundle na server

### Mabilis na Pagsisimula

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### System Tray

Kapag pinaliit, nakatira ang OmniRoute sa iyong system tray na may mabilis na pagkilos:

- Buksan ang dashboard
- Baguhin ang port ng server
- Ihinto ang aplikasyon

📖 Buong dokumentasyon: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Pagpepresyo sa isang Sulyap

| Tier                | Provider                          | Gastos                           | I-reset ang Quota    | Pinakamahusay Para sa                             |
| ------------------- | --------------------------------- | -------------------------------- | -------------------- | ------------------------------------------------- |
| **💳 SUBSCRIPTION** | Claude Code (Pro)                 | $20/buwan                        | 5h + lingguhan       | Naka-subscribe na                                 |
|                     | Codex (Plus/Pro)                  | $20-200/buwan                    | 5h + lingguhan       | Mga user ng OpenAI                                |
|                     | Gemini CLI                        | **LIBRE**                        | 180K/buwan + 1K/araw | Lahat!                                            |
|                     | GitHub Copilot                    | $10-19/buwan                     | Buwanang             | Mga user ng GitHub                                |
| **🔑 API KEY**      | NVIDIA NIM                        | **LIBRE** (dev forever)          | ~40 RPM              | 70+ bukas na mga modelo                           |
|                     | Cerebras                          | **LIBRE** (1M tok/araw)          | 60K TPM / 30 RPM     | Pinakamabilis sa mundo                            |
|                     | Groq                              | **LIBRE** (30 RPM)               | 14.4K RPD            | Napakabilis na Llama/Gemma                        |
|                     | DeepSeek V3.2                     | $0.27/$1.10 bawat 1M             | Wala                 | Pinakamahusay na presyo/kalidad na pangangatwiran |
|                     | xAI Grok-4 Mabilis                | **$0.20/$0.50 bawat 1M** 🆕      | Wala                 | Pinakamabilis + tool na pagtawag, ultralow        |
|                     | xAI Grok-4 (standard)             | $0.20/$1.50 bawat 1M 🆕          | Wala                 | Nangangatuwirang punong barko mula sa xAI         |
|                     | Mistral                           | Libreng pagsubok + bayad         | Limitado ang rate    | European AI                                       |
|                     | OpenRouter                        | Pay-per-use                      | Wala                 | 100+ modelo aggr.                                 |
| **💰 MURA**         | GLM-5 (sa pamamagitan ng Z.AI) 🆕 | $0.5/1M                          | Araw-araw 10AM       | 128K output, pinakabagong flagship                |
|                     | GLM-4.7                           | $0.6/1M                          | Araw-araw 10AM       | Backup ng badyet                                  |
|                     | MiniMax M2.5 🆕                   | $0.3/1M input                    | 5 oras na rolling    | Pangangatwiran + mga ahenteng gawain              |
|                     | MiniMax M2.1                      | $0.2/1M                          | 5 oras na rolling    | Pinaka murang opsyon                              |
|                     | Kimi K2.5 (Moonshot API) 🆕       | Pay-per-use                      | Wala                 | Direktang Moonshot API access                     |
|                     | Kimi K2                           | $9/buwan flat                    | 10M token/buwan      | Nahuhulaang gastos                                |
| **🆓 LIBRE**        | iFlow                             | **$0**                           | Walang limitasyong   | 5 mga modelong walang limitasyon                  |
|                     | Qwen                              | **$0**                           | Walang limitasyong   | 4 na modelong walang limitasyon                   |
|                     | Kiro                              | **$0**                           | Walang limitasyong   | Claude Sonnet/Haiku (AWS Builder)                 |
|                     | LongCat Flash-Lite 🆕             | **$0** (50M tok/araw 🔥)         | 1 RPS                | Pinakamalaking libreng quota sa Earth             |
|                     | Mga polinasyon AI 🆕              | **$0** (walang key na kailangan) | 1 req/15s            | GPT-5, Claude, DeepSeek, Llama 4                  |
|                     | Cloudflare Workers AI 🆕          | **$0** (10K Neuron/araw)         | ~150 resp/araw       | 50+ modelo, pandaigdigang gilid                   |
|                     | Scaleway AI 🆕                    | **$0** (1M token sa kabuuan)     | Limitado ang rate    | EU/GDPR, Qwen3 235B, Llama 70B                    |

> 🆕 **Nagdagdag ng mga bagong modelo (Mar 2026):** Grok-4 Fast family sa $0.20/$0.50/M (na-benchmark sa 1143ms — 30% na mas mabilis kaysa Gemini 2.5 Flash), GLM-5 sa pamamagitan ng Z.AI na may 128K na output, MiniMax M2.5 na pangangatwiran. Kimi2 na direktang pagpepresyo sa pamamagitan ng V3 na pagpepresyo sa Mooni, na-update ng KIM2 na DeepSeek V3

**💡 $0 Combo Stack — Ang Kumpletong Libreng Setup:**

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

**Walang halaga. Hindi kailanman tumitigil sa pag-coding.** I-configure ito bilang isang combo ng OmniRoute at lahat ng fallback ay awtomatikong nangyayari — walang manu-manong paglipat kailanman.

---

---

## 🆓 Mga Libreng Modelo — Ang Talagang Nakukuha Mo

> Lahat ng mga modelo sa ibaba ay **100% libre na walang kinakailangang credit card**. Ang mga awtomatikong ruta ng OmniRoute sa pagitan ng mga ito kapag naubos ang isang quota — pagsamahin silang lahat para sa hindi nababasag na $0 combo.

### 🔵 CLAUDE MODELS (sa pamamagitan ng Kiro — AWS Builder ID)

| Modelo              | Prefix | Limitahan             | Hangganan ng Rate                        |
| ------------------- | ------ | --------------------- | ---------------------------------------- |
| `claude-sonnet-4.5` | `kr/`  | **Walang limitasyon** | Walang iniulat na pang-araw-araw na cap  |
| `claude-haiku-4.5`  | `kr/`  | **Walang limitasyon** | Walang iniulat na pang-araw-araw na cap  |
| `claude-opus-4.6`   | `kr/`  | **Walang limitasyon** | Pinakabagong Opus sa pamamagitan ng Kiro |

### 🟢 MGA MODELONG IFLOW (Libreng OAuth — Walang Credit Card)

| Modelo             | Prefix | Limitahan             | Hangganan ng Rate     |
| ------------------ | ------ | --------------------- | --------------------- |
| `kimi-k2-thinking` | `if/`  | **Walang limitasyon** | Walang naiulat na cap |
| `qwen3-coder-plus` | `if/`  | **Walang limitasyon** | Walang naiulat na cap |
| `deepseek-r1`      | `if/`  | **Walang limitasyon** | Walang naiulat na cap |
| `minimax-m2.1`     | `if/`  | **Walang limitasyon** | Walang naiulat na cap |
| `kimi-k2`          | `if/`  | **Walang limitasyon** | Walang naiulat na cap |

### 🟡 QWEN MODELS (Device Code Auth)

| Modelo              | Prefix | Limitahan             | Hangganan ng Rate        |
| ------------------- | ------ | --------------------- | ------------------------ |
| `qwen3-coder-plus`  | `qw/`  | **Walang limitasyon** | Walang naiulat na cap    |
| `qwen3-coder-flash` | `qw/`  | **Walang limitasyon** | Walang naiulat na cap    |
| `qwen3-coder-next`  | `qw/`  | **Walang limitasyon** | Walang naiulat na cap    |
| `vision-model`      | `qw/`  | **Walang limitasyon** | Multimodal (mga larawan) |

### 🟣 GEMINI CLI (Google OAuth)

| Modelo                   | Prefix | Limitahan                      | Hangganan ng Rate  |
| ------------------------ | ------ | ------------------------------ | ------------------ |
| `gemini-3-flash-preview` | `gc/`  | **180K tok/buwan** + 1K/araw   | Buwanang pag-reset |
| `gemini-2.5-pro`         | `gc/`  | 180K/buwan (nakabahaging pool) | Mataas na kalidad  |

### ⚫ NVIDIA NIM (Libreng API Key — build.nvidia.com)

| Tier        | Pang-araw-araw na Limitasyon | Hangganan ng Rate | Mga Tala                                                                     |
| ----------- | ---------------------------- | ----------------- | ---------------------------------------------------------------------------- |
| Libre (Dev) | Walang token cap             | **~40 RPM**       | 70+ modelo; paglipat sa purong mga limitasyon sa rate sa kalagitnaan ng 2025 |

Mga sikat na libreng modelo: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (Libreng API Key — inference.cerebras.ai)

| Tier  | Pang-araw-araw na Limitasyon | Hangganan ng Rate | Mga Tala                                                      |
| ----- | ---------------------------- | ----------------- | ------------------------------------------------------------- |
| Libre | **1M token/araw**            | 60K TPM / 30 RPM  | Pinakamabilis na LLM inference sa mundo; nire-reset araw-araw |

Available nang libre: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (Libreng API Key — console.groq.com)

| Tier  | Pang-araw-araw na Limitasyon | Hangganan ng Rate   | Mga Tala                                                |
| ----- | ---------------------------- | ------------------- | ------------------------------------------------------- |
| Libre | **14.4K RPD**                | 30 RPM bawat modelo | Walang credit card; 429 sa limitasyon, hindi sinisingil |

Available nang libre: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (Libreng API Key — longcat.chat) 🆕

| Modelo                        | Prefix | Araw-araw na Libreng Quota | Mga Tala                               |
| ----------------------------- | ------ | -------------------------- | -------------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`  | **50M token** 💥           | Pinakamalaking libreng quota kailanman |
| `LongCat-Flash-Chat`          | `lc/`  | 500K token                 | Multi-turn chat                        |
| `LongCat-Flash-Thinking`      | `lc/`  | 500K token                 | Pangangatwiran / CoT                   |
| `LongCat-Flash-Thinking-2601` | `lc/`  | 500K token                 | Ene 2026 na bersyon                    |
| `LongCat-Flash-Omni-2603`     | `lc/`  | 500K token                 | Multimodal                             |

> 100% libre habang nasa pampublikong beta. Mag-sign up sa [longcat.chat](https://longcat.chat) gamit ang email o telepono. Nire-reset araw-araw 00:00 UTC.

### 🟢 POLINATIONS AI (Walang API Key na Kinakailangan) 🆕

| Modelo     | Prefix | Hangganan ng Rate | Provider sa Likod  |
| ---------- | ------ | ----------------- | ------------------ |
| `openai`   | `pol/` | 1 req/15s         | GPT-5              |
| `claude`   | `pol/` | 1 req/15s         | Anthropic Claude   |
| `gemini`   | `pol/` | 1 req/15s         | Google Gemini      |
| `deepseek` | `pol/` | 1 req/15s         | DeepSeek V3        |
| `llama`    | `pol/` | 1 req/15s         | Meta Llama 4 Scout |
| `mistral`  | `pol/` | 1 req/15s         | Mistral AI         |

> ✨ **Zero friction:** Walang pag-signup, walang API key. Idagdag ang Polinations provider na may walang laman na key field at agad itong gagana.

### 🟠 CLOUDFLARE WORKERS AI (Libreng API Key — cloudflare.com) 🆕

| Tier  | Pang-araw-araw na Neuron | Katumbas na Paggamit                          | Mga Tala                   |
| ----- | ------------------------ | --------------------------------------------- | -------------------------- |
| Libre | **10,000**               | ~150 LLM resp / 500s audio / 15K na pag-embed | Global edge, 50+ na modelo |

Mga sikat na libreng modelo: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (libreng audio!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Nangangailangan ng API Token + Account ID mula sa [dash.cloudflare.com](https://dash.cloudflare.com). Store Account ID sa mga setting ng provider.

### 🟣 SCALEWAY AI (1M Libreng Token — scaleway.com) 🆕

| Tier  | Libreng Quota | Lokasyon     | Mga Tala                                                    |
| ----- | ------------- | ------------ | ----------------------------------------------------------- |
| Libre | **1M token**  | 🇫🇷 Paris, EU | Walang kinakailangang credit card sa loob ng mga limitasyon |

Available nang libre: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> Sumusunod sa EU/GDPR. Kunin ang API key sa [console.scaleway.com](https://console.scaleway.com).

> **💡 Ang Ultimate Free Stack (11 Provider, $0 Forever):**
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

## 🎙️ Libreng Transcription Combo

> I-transcribe ang anumang audio/video para sa **$0** — Nangunguna ang Deepgram na may libreng $200, AssemblyAI $50 fallback, Groq Whisper bilang walang limitasyong backup na pang-emergency.

| Provider          | Libreng Credits             | Pinakamahusay na Modelo                          | Hangganan ng Rate                               |
| ----------------- | --------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| 🟢 **Deepgram**   | **$200 libre** (pag-signup) | `nova-3` — pinakamahusay na katumpakan, 30+ wika | Walang limitasyon sa RPM sa mga libreng kredito |
| 🔵 **AssemblyAI** | **$50 libre** (pag-signup)  | `universal-3-pro` — mga kabanata, damdamin, PII  | Walang limitasyon sa RPM sa mga libreng kredito |
| 🔴 **Groq**       | **Libre magpakailanman**    | `whisper-large-v3` — OpenAI Whisper              | 30 RPM (limitado ang rate)                      |

**Iminungkahing combo sa `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Pagkatapos sa `/dashboard/media` → **Transcription** tab: mag-upload ng anumang audio o video file → piliin ang iyong combo endpoint → kumuha ng transkripsyon sa mga sinusuportahang format.

## 💡 Mga Pangunahing Tampok

Ang OmniRoute v2.0 ay binuo bilang isang operating platform, hindi lamang isang relay proxy.

### 🆕 Bago — ClawRouter-Inspired Improvements (Mar 2026)

| Tampok                                    | Ano ang Ginagawa Nito                                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Mabilis na Pamilya**          | mga modelo ng xAI sa $0.20/$0.50/M — na-benchmark na 1143ms (30% mas mabilis kaysa sa Gemini 2.5 Flash)                   |
| 🧠 **GLM-5 sa pamamagitan ng Z.AI**       | 128K na konteksto ng output, $0.5/1M — pinakabagong flagship mula sa pamilyang GLM                                        |
| 🔮 **MiniMax M2.5**                       | Pangangatwiran + mga ahenteng gawain sa $0.30/1M — makabuluhang pag-upgrade mula sa M2.1                                  |
| 🎯 **toolCalling Flag bawat Model**       | Bawat-modelo `toolCalling: true/false` sa registry — Nilaktawan ng AutoCombo ang mga modelong hindi may kakayahan sa tool |
| 🌍 **Multilingual Intent Detection**      | Mga keyword ng PT/ZH/ES/AR sa AutoCombo scoring — mas mahusay na pagpili ng modelo para sa nilalamang hindi Ingles        |
| 📊 **Mga Fallback na Dahil sa Benchmark** | Real p95 latency mula sa mga live na kahilingan feed combo scoring — natututo ang AutoCombo mula sa aktwal na data        |
| 🔁 **Humiling ng Deduplication**          | Content-hash based na dedup window — multi-agent safe, pinipigilan ang mga duplicate na singil                            |
| 🔌 **Pluggable RouterStrategy**           | Extensible `RouterStrategy` interface — magdagdag ng custom na routing logic bilang mga plugin                            |

### 🚀 Nakaraang v2.0.9+ — Palaruan, CLI Fingerprints at ACP

| Tampok                                        | Ano ang Ginagawa Nito                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Modelo Playground**                      | Dashboard page upang direktang subukan ang anumang modelo — provider/modelo/endpoint selector, Monaco Editor, streaming, abort, timing                                                                                                                                                                                                |
| 🔏 **CLI Fingerprint Matching**               | Pag-order ng header/katawan ng bawat provider upang tumugma sa mga native na lagda ng CLI — i-toggle ang bawat provider sa Mga Setting > Seguridad. **Napanatili ang iyong proxy IP**                                                                                                                                                 |
| 🤝 **Suporta sa ACP (Agent Client Protocol)** | Pagtuklas ng ahente ng CLI (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 pa), process spawner, `/api/acp/agents` endpoint                                                                                                                                                                                                           |
| 🤖 **Dashboard ng Mga Ahente ng ACP**         | Debug › Pahina ng mga ahente — grid ng 14 na ahente na may status ng pag-install, bersyon, custom na form ng ahente para sa anumang CLI tool. Ang **OpenCode** na mga user ay nakakakuha ng button na "I-download ang opencode.json" na awtomatikong bumubuo ng isang ready-to-use na config kasama ang lahat ng available na modelo. |
| 🔧 **Custom na Modelo `apiFormat` Routing**   | Ang mga custom na modelo na may `apiFormat: "responses"` ay tama na ang ruta sa tagasalin ng Responses API                                                                                                                                                                                                                            |
| 🏢 **Paghihiwalay ng Codex Workspace**        | Maramihang mga workspace ng Codex bawat email — Tamang pinaghihiwalay ng OAuth ang mga koneksyon ayon sa workspace ID                                                                                                                                                                                                                 |
| 🔄 **Electron Auto-Update**                   | Sinusuri ng desktop app ang mga update + auto-install sa pag-restart                                                                                                                                                                                                                                                                  |

### 🤖 Mga Operasyon ng Ahente at Protocol (v2.0)

| Tampok                                | Ano ang Ginagawa Nito                                                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 🔧 **MCP Server (16 na tool)**        | Mga tool ng IDE/agent sa pamamagitan ng 3 transport: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`) |
| 🤝 **A2A Server (JSON-RPC + SSE)**    | Pagpapatupad ng gawain ng ahente-sa-agent na may pag-sync at mga daloy ng streaming                                   |
| 🧭 **Consolidated Endpoints Page**    | Naka-tab na pahina ng pamamahala na may mga tab na Endpoint Proxy, MCP, A2A, at API Endpoints                         |
| 🎚️ **Service Enable/Disable Toggles** | ON/OFF switch para sa MCP at A2A na may mga setting ng persistence (default: OFF)                                     |
| 🛰️ **MCP Runtime Heartbeat**          | Katayuan ng totoong proseso (pid, uptime, edad ng tibok ng puso, transportasyon, mode ng saklaw)                      |
| 📋 **MCP Audit Trail**                | Na-filter na mga log ng pag-audit na may tagumpay/kabiguan at pangunahing pagpapatungkol                              |
| 🔐 **Pagpapatupad ng Saklaw ng MCP**  | 9 butil na saklaw na pahintulot para sa kontroladong pag-access ng tool                                               |
| 📡 **A2A Task Lifecycle Management**  | Ilista/i-filter ang mga gawain, siyasatin ang mga kaganapan/artifact, kanselahin ang pagpapatakbo ng mga gawain       |
| 📋 **Pagtuklas ng Ahente Card**       | `/.well-known/agent.json` para sa awtomatikong pagtuklas ng kliyente                                                  |
| 🧪 **Protocol E2E Test Harness**      | Ang totoong MCP SDK + A2A client ay dumadaloy sa `test:protocols:e2e`                                                 |
| ⚙️ **Mga Operational Control**        | Lumipat ng combo, ilapat ang mga profile ng resilience, i-reset ang mga breaker mula sa isang control surface         |

### 🧠 Routing at Intelligence

| Tampok                                    | Ano ang Ginagawa Nito                                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 🎯 **Smart 4-Tier Fallback**              | Auto-ruta: Subscription → API Key → Mura → Libre                                               |
| 📊 **Real-Time Quota Tracking**           | Live na bilang ng token + reset countdown bawat provider                                       |
| 🔄 **Format Translation**                 | OpenAI ↔ Claude ↔ Gemini ↔ Mga tugon na may mga conversion na ligtas sa schema                 |
| 👥 **Suporta sa Multi-Account**           | Maramihang account sa bawat provider na may matalinong pagpili                                 |
| 🔄 **Auto Token Refresh**                 | Awtomatikong nagre-refresh ang mga token ng OAuth sa muling pagsubok                           |
| 🎨 **Mga Custom na Combos**               | 6 na diskarte sa pagbabalanse + fallback chain control                                         |
| 🌐 **Wildcard Router**                    | `provider/*` dynamic na pagruruta                                                              |
| 🧠 **Mga Kontrol sa Badyet sa Pag-iisip** | Passthrough, auto, custom, at adaptive na mga limitasyon sa pangangatwiran                     |
| 🔀 **Mga Alyas ng Modelo**                | Built-in + custom na model aliasing at kaligtasan sa paglilipat                                |
| ⚡ **Pagbaba ng Background**              | Iruta ang mga gawain sa background na mababa ang priyoridad sa mas murang mga modelo           |
| 🧪 **Task-Aware Smart Routing**           | Awtomatikong piliin ang modelo ayon sa uri ng nilalaman (coding/vision/analysis/summarization) |
| 💬 **System Prompt Injection**            | Patuloy na inilalapat ang mga pandaigdigang kontrol sa gawi                                    |
| 📄 **Pagkatugma sa API ng Mga Tugon**     | Buong `/v1/responses` na suporta para sa Codex at mga advanced na ahenteng daloy ng trabaho    |

### 🎵 Mga Multi-Modal na API

| Tampok                      | Ano ang Ginagawa Nito                                                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Pagbuo ng Larawan**    | `/v1/images/generations` na may cloud at mga lokal na backend                                                                                                                |
| 📐 **Mga Pag-embed**        | `/v1/embeddings` para sa paghahanap at mga pipeline ng RAG                                                                                                                   |
| 🎤 **Audio Transcription**  | `/v1/audio/transcriptions` — 7 provider (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, suporta sa MP4/MP3/WAV |
| 🔊 **Text-to-Speech**       | `/v1/audio/speech` — 10 provider (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) na may mga tamang mensahe ng error      |
| 🎬 **Pagbuo ng Video**      | `/v1/videos/generations` (ComfyUI + SD WebUI workflows)                                                                                                                      |
| 🎵 **Pagbuo ng Musika**     | `/v1/music/generations` (ComfyUI workflows)                                                                                                                                  |
| 🛡️ **Mga Pag-moderate**     | `/v1/moderations` mga pagsusuri sa kaligtasan                                                                                                                                |
| 🔀 **Reranking**            | `/v1/rerank` para sa pagmamarka ng kaugnayan                                                                                                                                 |
| 🔍 **Paghahanap sa Web** 🆕 | `/v1/search` — 5 provider (Serper, Brave, Perplexity, Exa, Tavily), 6,500+ libre/buwan, auto-failover, cache                                                                 |

### 🛡️ Katatagan, Seguridad at Pamamahala

| Tampok                                    | Ano ang Ginagawa Nito                                                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 🔌 **Mga Circuit Breaker**                | Bawat modelong biyahe/pagbawi na may mga kontrol sa threshold                                                                       |
| 🎯 **Mga Modelo ng Endpoint-Aware**       | Idineklara ng mga custom na modelo ang mga sinusuportahang endpoint + format ng API                                                 |
| 🛡️ **Anti-Thundering Herd**               | Mga proteksyon ng Mutex + semaphore sa muling pagsubok/pag-rate ng mga kaganapan                                                    |
| 🧠 **Semantic + Signature Cache**         | Pagbabawas ng gastos/latency na may dalawang layer ng cache                                                                         |
| ⚡ **Humiling ng Idempotency**            | Duplicate na window ng proteksyon                                                                                                   |
| 🔒 **TLS Fingerprint Spoofing**           | TLS fingerprint na parang browser — **binabawasan ang pag-detect ng bot at pag-flag ng account**                                    |
| 🔏 **CLI Fingerprint Matching**           | Tumutugma sa mga native na lagda ng kahilingan sa CLI — **binabawasan ang panganib sa pagbabawal habang pinapanatili ang proxy IP** |
| 🌐 **Pag-filter ng IP**                   | Allowlist/blocklist control para sa mga nakalantad na deployment                                                                    |
| 📊 **Mga Nae-edit na Limitasyon sa Rate** | Nako-configure ang mga limitasyon sa antas ng global/provider na may pagtitiyaga                                                    |
| 🔑 **API Key Management + Scoping**       | Secure na pagpapalabas/pag-ikot ng susi at mga kontrol ng modelo/tagapagbigay                                                       |
| 🛡️ **Protektado `/models`**               | Opsyonal na auth gating at pagtatago ng provider para sa catalog ng modelo                                                          |

### 📊 Pagmamasid at Analytics

| Tampok                                | Ano ang Ginagawa Nito                                                |
| ------------------------------------- | -------------------------------------------------------------------- |
| 📝 **Kahilingan + Proxy Logging**     | Buong kahilingan/tugon at proxy logging                              |
| 📋 **Unified Logs Dashboard**         | Kahilingan, proxy, audit, at console view sa isang page              |
| 🔍 **Humiling ng Telemetry**          | p50/p95/p99 latency at kahilingan sa pagsubaybay                     |
| 🏥 **Dashboard ng Kalusugan**         | Uptime, breaker states, lockouts, cache stats                        |
| 💰 **Pagsubaybay sa Gastos**          | Mga kontrol sa badyet at visibility ng pagpepresyo sa bawat modelo   |
| 📈 **Mga Visualization ng Analytics** | Mga insight sa paggamit ng modelo/provider at mga view ng trend      |
| 🧪 **Brangkas ng Pagsusuri**          | Golden set testing na may mga configurable na diskarte sa pagtutugma |

### ☁️ Deployment at Platform

| Tampok                              | Ano ang Ginagawa Nito                                                     |
| ----------------------------------- | ------------------------------------------------------------------------- |
| 🌐 **I-deploy Kahit Saan**          | Localhost, VPS, Docker, Cloud environment                                 |
| 💾 **Cloud Sync**                   | Pag-sync ng configuration sa pamamagitan ng cloud worker                  |
| 🔄 **Backup/Restore**               | Mga daloy ng pag-export/pag-import at pagbawi ng kalamidad                |
| 🧙 **Onboarding Wizard**            | First-run guided setup                                                    |
| 🔧 **CLI Tools Dashboard**          | Isang-click na setup para sa mga sikat na coding tool                     |
| 🎮 **Modelo Playground**            | Subukan ang anumang provider/modelo/endpoint mula sa dashboard            |
| 🔏 **CLI Fingerprint Toggle**       | Pagtutugma ng fingerprint ng bawat provider sa Mga Setting > Seguridad    |
| 🌐 **i18n (30 wika)**               | Buong dashboard + suporta sa wika ng mga doc na may saklaw ng RTL         |
| 🧹 **I-clear ang Lahat ng Modelo**  | Isang-click na pag-clear ng listahan ng modelo sa mga detalye ng provider |
| 📋 **Mga Template ng Isyu**         | Standardized GitHub template para sa mga bug at feature                   |
| 📂 **Custom na Direktoryo ng Data** | `DATA_DIR` override para sa lokasyon ng storage                           |

### Tampok ang Deep Dive

#### Smart fallback na may praktikal na kontrol sa gastos

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Kapag nabigo ang quota, rate, o kalusugan, awtomatikong lilipat ang OmniRoute sa susunod na kandidato nang walang manu-manong paglipat.

#### Protocol management na nakikita at nagagamit

- Ang MCP + A2A ay natutuklasan sa UI at mga doc (hindi nakatago)
- Inilalantad ng mga Protocol status API ang live na data ng pagpapatakbo (`/api/mcp/*`, `/api/a2a/*`)
- Kasama sa mga dashboard ang mga aksyon para sa day-2 ops (combo toggle, breaker reset, pagkansela ng gawain)

#### Translator + validation workflow

Kasama sa lugar ng Tagasalin ang:

- **Playground**: humiling ng mga pagsusuri sa pagbabago
- **Chat Tester**: buong kahilingan/tugon round-trip
- **Test Bench**: maraming kaso sa isang pagtakbo
- **Live Monitor**: real-time na view ng trapiko

Dagdag pa ang pagpapatunay ng protocol sa mga tunay na kliyente sa pamamagitan ng `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Sanggunian ng tool, IDE config, at mga halimbawa ng kliyente
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Mga Kasanayan, JSON-RPC na pamamaraan, streaming, at lifecycle ng gawain

## 🧪 Mga Pagsusuri (Evals)

Ang OmniRoute ay may kasamang built-in na balangkas ng pagsusuri upang subukan ang kalidad ng pagtugon ng LLM laban sa isang ginintuang hanay. I-access ito sa pamamagitan ng **Analytics → Evals** sa dashboard.

### Built-in na Golden Set

Ang pre-loaded na "OmniRoute Golden Set" ay naglalaman ng mga test case para sa:

- Pagbati, matematika, heograpiya, pagbuo ng code
- Pagsunod sa format ng JSON, pagsasalin, pagbuo ng markdown
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

### Protocol Setup (MCP + A2A)

<details>
<summary><b>🧩 MCP Setup (Model Context Protocol)</b></summary>

Simulan ang MCP transport sa stdio mode:

```bash
omniroute --mcp
```

Inirerekomendang daloy ng pagpapatunay:

1. Ikonekta ang iyong MCP client sa stdio.
2. Patakbuhin ang `omniroute_get_health`.
3. Patakbuhin ang `omniroute_list_combos`.
4. Buksan ang `/dashboard/mcp` para kumpirmahin ang tibok ng puso, aktibidad, at pag-audit.

Mga kapaki-pakinabang na API para sa automation:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A Setup (Agent2Agent)</b></summary>

Tuklasin ang ahente:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Magpadala ng gawain:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Pamahalaan ang lifecycle:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Operational UI:

- `/dashboard/a2a` para sa gawain/estado/pagmamasid sa stream at mga pagkilos sa usok

</details>

<details>
<summary><b>🧪 End-to-end protocol validation</b></summary>

I-validate ang parehong protocol sa mga totoong kliyente:

```bash
npm run test:protocols:e2e
```

Ito ay nagpapatunay:

- MCP SDK client kumonekta/listahan/tawag
- A2A discovery/send/stream/get/cancel
- Cross-check ang data sa MCP audit at A2A task management API

</details>

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

**Pro Tip:** Gamitin ang Opus para sa mga kumplikadong gawain, Soneto para sa bilis. Sinusubaybayan ng OmniRoute ang quota sa bawat modelo!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Pamamahala sa Limitasyon ng Codex Account (5h + Lingguhan)

Ang bawat Codex account ay mayroon na ngayong mga toggle ng patakaran sa `Dashboard -> Providers`:

- `5h` (ON/OFF): ipatupad ang 5-hour window threshold policy.
- `Weekly` (ON/OFF): ipatupad ang lingguhang patakaran sa threshold ng window.
- Threshold na gawi: kapag ang isang naka-enable na window ay umabot sa >=90% na paggamit, ang account na iyon ay nilalaktawan.
- Pag-uugali ng pag-ikot: Awtomatikong mga ruta ang OmniRoute patungo sa susunod na karapat-dapat na Codex account.
- I-reset ang gawi: kapag lumipas ang oras ng provider `resetAt`, awtomatikong magiging kwalipikadong muli ang account.

Mga sitwasyon:

- `5h ON` + `Weekly ON`: nilalaktawan ang account kapag naabot ng alinmang window ang threshold.
- `5h OFF` + `Weekly ON`: lingguhang paggamit lang ang makakapag-block sa account.
- `5h ON` + `Weekly OFF`: 5 oras na paggamit lang ang makakapag-block sa account.
- `resetAt` ang naipasa: ang account ay awtomatikong pumapasok sa pag-ikot (walang manu-manong muling paganahin).

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

### NVIDIA NIM (LIBRENG access ng developer — 70+ modelo)

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

### iFlow (5 LIBRENG modelo sa pamamagitan ng OAuth)

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

### Qwen (4 na LIBRENG modelo sa pamamagitan ng Device Code)

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

### OpenCode

**Hakbang 1:** Idagdag ang OmniRoute bilang custom na provider:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Hakbang 2:** Lumikha/mag-edit ng `opencode.json` sa ugat ng iyong proyekto:

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

**Hakbang 3:** Piliin ang modelo sa OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tip:** Magdagdag ng anumang modelong available sa iyong OmniRoute `/v1/models` endpoint sa seksyong `models`. Gamitin ang format na `provider/model-id` mula sa iyong OmniRoute dashboard.

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

**Mali ang mga dashboard/API port**

- `PORT` ay ang canonical base port (at API port bilang default)
- Ang `API_PORT` ay nag-o-override lamang sa OpenAI-compatible na API listener
- `DASHBOARD_PORT` override lang ang dashboard/Next.js listener
- Itakda ang `NEXT_PUBLIC_BASE_URL` sa iyong dashboard/pampublikong URL (para sa mga OAuth callback)

**Mga error sa cloud sync**

- I-verify ang `BASE_URL` na mga puntos sa iyong running instance
- I-verify ang `CLOUD_URL` na mga puntos sa iyong inaasahang cloud endpoint
- Panatilihing nakahanay ang mga value ng `NEXT_PUBLIC_*` sa mga value sa gilid ng server

**Hindi gumagana ang unang pag-login**

- Tingnan ang `INITIAL_PASSWORD` sa `.env`
- Kung hindi nakatakda, ang fallback na password ay `123456`

**Walang mga log ng kahilingan**

- Itakda ang `ENABLE_REQUEST_LOGS=true` sa `.env`

**Ang pagsubok sa koneksyon ay nagpapakita ng "Di-wasto" para sa mga provider na katugma sa OpenAI**

- Maraming provider ang hindi naglalantad ng `/models` endpoint
- Kasama sa OmniRoute v1.0.6+ ang fallback validation sa pamamagitan ng mga pagkumpleto ng chat
- Tiyaking may kasamang `/v1` suffix ang base URL

### 🔐 OAuth sa isang Remote Server

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Mahalaga para sa mga user na nagpapatakbo ng OmniRoute sa isang VPS, Docker, o anumang malayuang server**

#### Bakit nabigo ang Antigravity / Gemini CLI OAuth sa mga malalayong server?

Ang **Antigravity** at **Gemini CLI** provider ay gumagamit ng **Google OAuth 2.0**. Kinakailangan ng Google ang `redirect_uri` sa daloy ng OAuth upang eksaktong tumugma sa isa sa mga pre-registered na URI sa Google Cloud Console ng app.

Ang mga kredensyal ng OAuth na naka-bundle sa OmniRoute ay nakarehistro **para sa `localhost` lamang**. Kapag na-access mo ang OmniRoute sa isang malayuang server (hal. `https://omniroute.myserver.com`), tinatanggihan ng Google ang pagpapatotoo gamit ang:

```
Error 400: redirect_uri_mismatch
```

#### Solusyon: I-configure ang sarili mong mga kredensyal sa OAuth

Kailangan mong gumawa ng **OAuth 2.0 Client ID** sa Google Cloud Console gamit ang URI ng iyong server.

#### Hakbang-hakbang

**1. Buksan ang Google Cloud Console**

Pumunta sa: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Gumawa ng bagong OAuth 2.0 Client ID**

- I-click ang **"+ Lumikha ng Mga Kredensyal"** → **"OAuth client ID"**
- Uri ng application: **"Web application"**
- Pangalan: kahit anong gusto mo (hal. `OmniRoute Remote`)

**3. Magdagdag ng mga Awtorisadong Redirect URI**

Sa field na **"Authorized redirect URIs"**, idagdag ang:

```
https://your-server.com/callback
```

> Palitan ang `your-server.com` ng domain o IP ng iyong server (isama ang port kung kinakailangan, hal. `http://45.33.32.156:20128/callback`).

**4. I-save at kopyahin ang mga kredensyal**

Pagkatapos gumawa, ipapakita ng Google ang **Client ID** at **Client Secret**.

**5. Magtakda ng mga variable ng kapaligiran**

Sa iyong `.env` (o mga variable ng kapaligiran ng Docker):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. I-restart ang OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Subukang kumonekta muli**

Dashboard → Mga Provider → Antigravity (o Gemini CLI) → OAuth

Magre-redirect na ngayon ang Google nang tama sa `https://your-server.com/callback`.

---

#### Pansamantalang solusyon (nang walang mga custom na kredensyal)

Kung hindi mo gustong mag-set up ng sarili mong mga kredensyal sa ngayon, maaari mo pa ring gamitin ang **manual na daloy ng URL**:

1. Binubuksan ng OmniRoute ang URL ng awtorisasyon ng Google
2. Pagkatapos magpahintulot, sinusubukan ng Google na mag-redirect sa `localhost` (na nabigo sa remote server)
3. **Kopyahin ang buong URL** mula sa address bar ng iyong browser (kahit na hindi naglo-load ang page)
4. I-paste ang URL na iyon sa field na ipinapakita sa OmniRoute connection modal
5. I-click ang **"Kumonekta"**

> Gumagana ito dahil valid ang authorization code sa URL kahit na-load man ang redirect page.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Para sa que o OAuth do Antigravity / Gemini CLI falha em servidores remotos?

Os provedores **Antigravity** at **Gemini CLI** gamit ang **Google OAuth 2.0** para sa autenticação. O Google exige que a `redirect_uri` use no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas no Google Cloud Console do aplicativo.

Bilang credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para sa `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (hal: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Solução: I-configure ang suas próprias credenciais OAuth

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

</details>

## 🛠️ Tech Stack

<details>
<summary><b>Mag-click upang palawakin ang mga detalye ng tech stack</b></summary>

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ ay **hindi suportado** — `better-sqlite3` native binary ay hindi tugma)
- **Language**: TypeScript 5.9 — **100% TypeScript** sa `src/` at `open-sse/` (zero `any` sa mga core module mula noong v2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (domain state + proxy logs + MCP audit + routing decisions)
- **Schemas**: Zod (MCP tool I/O validation, mga kontrata ng API)
- **Mga Protocol**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: Mga Kaganapang Ipinadala ng Server (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API Keys + MCP Scoped Authorization
- **Pagsubok**: Node.js test runner + Vitest (900+ test kasama ang unit, integration, E2E)
- **CI/CD**: GitHub Actions (auto npm publish + Docker Hub on release)
- **Website**: [omniroute.online](https://omniroute.online)
- **Package**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resilience**: Circuit breaker, exponential backoff, anti-thundering herd, TLS spoofing, auto-combo self-healing

</details>

---

## 📖 Dokumentasyon

| Dokumento                                      | Paglalarawan                                             |
| ---------------------------------------------- | -------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Mga provider, combo, CLI integration, deployment         |
| [API Reference](docs/API_REFERENCE.md)         | Lahat ng mga endpoint na may mga halimbawa               |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP tool, IDE configs, Python/TS/Go client            |
| [A2A Server](src/lib/a2a/README.md)            | JSON-RPC 2.0 protocol, kasanayan, streaming, gawain mgmt |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6-factor scoring, mode pack, self-healing                |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Mga karaniwang problema at solusyon                      |
| [Architecture](docs/ARCHITECTURE.md)           | Arkitektura ng system at mga panloob                     |
| [Contributing](CONTRIBUTING.md)                | Pag-setup at mga alituntunin ng pag-unlad                |
| [OpenAPI Spec](docs/openapi.yaml)              | OpenAPI 3.0 na detalye                                   |
| [Security Policy](SECURITY.md)                 | Pag-uulat ng kahinaan at mga kasanayan sa seguridad      |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Kumpletong gabay: VM + nginx + Cloudflare setup          |
| [Features Gallery](docs/FEATURES.md)           | Visual dashboard tour na may mga screenshot              |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Mga hakbang sa pagpapatunay bago ang paglabas            |

---

## 🗺️ Roadmap

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

> 📝 Available ang buong mga detalye ng feature sa [**OMNI_TOKEN_342**](docs/new-features/) (217 detalyadong spec)

---

## 👥 Mga nag-aambag

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Paano Mag-ambag

1. I-fork ang repositoryo
2. Lumikha ng iyong sangay ng tampok (`git checkout -b feature/amazing-feature`)
3. Ibigay ang iyong mga pagbabago (`git commit -m 'Add amazing feature'`)
4. Itulak sa sangay (`git push origin feature/amazing-feature`)
5. Magbukas ng Pull Request

Tingnan ang [CONTRIBUTING.md](CONTRIBUTING.md) para sa mga detalyadong alituntunin.

### Naglalabas ng Bagong Bersyon

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Kasaysayan ng Bituin

## Stargazers sa paglipas ng panahon

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
<!-- Pinagana ang Mga Talakayan sa GitHub para sa Q&A ng komunidad -->
