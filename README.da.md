# 🚀 OmniRoute — Den gratis AI-gateway

### Stop aldrig med at kode. Smart routing til **GRATIS og billige AI-modeller** med automatisk fallback.

_Din universelle API-proxy — ét slutpunkt, 67+ udbydere, ingen nedetid. Nu med **MCP & A2A** agentorkestrering._

**Chatafslutninger • Indlejringer • Billedgenerering • Video • Musik • Lyd • Genrangering • **Websøgning** • MCP-server • A2A-protokol • 100 % TypeScript**

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

🌐 **Fås i:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Hvad er nyt i v3.0.0

> **Opgradering fra v2.9.5?** — Se [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) for alle ændringer.

| Område                                    | Skift                                                                                                                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **CodeQL Security**                    | Fixed 10+ CodeQL alarmer: polynomial-redos, insecure-randomness, shell-injection remediering                                                                                        |
| ✅ **Rutevalidering**                     | Alle 176 API-ruter er nu valideret med Zod-skemaer + `validateBody()` — CI `check:route-validation:t06`-pas                                                                         |
| 🐛 **omniModel Tag Læk**                  | Interne `<omniModel>`-tags lækker ikke længere til klienter i SSE-streamingsvar (#585)                                                                                              |
| 🔑 **Registrerede nøgler API**            | Automatisk levering af API-nøgler via `POST /api/v1/registered-keys` med håndhævelse af kvoter pr. udbyder/konto, idempotens, SHA-256-lagring og valgfri GitHub-problemrapportering |
| 🎨 **Udbyderikoner**                      | 130+ udbyderlogoer via `@lobehub/icons` (SVG) med PNG → generisk reservekæde                                                                                                        |
| 🔄 **Model Auto-Sync**                    | 24-timers skemalægger og manuel brugergrænseflade skifter til at synkronisere modellister for indbyggede og brugerdefinerede OpenAI-kompatible udbydere                             |
| 🌐 **OpenCode Zen/Go**                    | To nye udbydere fra @kang-heewon via PR #530: gratis niveau + abonnementsniveau via `OpencodeExecutor`                                                                              |
| 🐛 **Gemini CLI OAuth**                   | Handlingsbar fejl, når `GEMINI_OAUTH_CLIENT_SECRET` mangler i Docker (var kryptisk Google-fejl)                                                                                     |
| 🐛 **OpenCode config**                    | `saveOpenCodeConfig()` skriver nu TOML korrekt til `XDG_CONFIG_HOME`                                                                                                                |
| 🐛 **Tilsidesættelse af fastgjort model** | `body.model` korrekt indstillet til `pinnedModel` på kontekst-cache-beskyttelse                                                                                                     |
| 🐛 **Codex/Claude loop**                  | `tool_result` blokke nu konverteret til tekst for at stoppe uendelige sløjfer                                                                                                       |
| 🐛 **Login-omdirigering**                 | Login fryser ikke længere efter at have sprunget adgangskodeopsætning over                                                                                                          |
| 🐛 **Windows stier**                      | MSYS2/Git-Bash stier (`/c/...`) normaliseret til `C:\...` automatisk                                                                                                                |

---

## 🖼️ Main Dashboard

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Dashboard Preview

<details>
<summary><b>Klik for at se skærmbilleder af dashboard</b></summary>

| Side              | Skærmbillede                                      |
| ----------------- | ------------------------------------------------- |
| **Udbydere**      | ![Providers](docs/screenshots/01-providers.png)   |
| **Komboer**       | ![Combos](docs/screenshots/02-combos.png)         |
| **Analyse**       | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Sundhed**       | ![Health](docs/screenshots/04-health.png)         |
| **Oversætter**    | ![Translator](docs/screenshots/05-translator.png) |
| **Indstillinger** | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI-værktøjer** | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Brugslogfiler** | ![Usage](docs/screenshots/08-usage.png)           |
| **Endpunkter**    | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Gratis AI-udbyder til dine foretrukne kodningsagenter

_Tilslut ethvert AI-drevet IDE- eller CLI-værktøj gennem OmniRoute - gratis API-gateway til ubegrænset kodning._

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

<sub>📡 All agents connect via <code>http://localhost:20128/v1</code> or <code>http://cloud.omniroute.online/v1</code> — one config, unlimited models and kvote</sub>

---

## 🤔 Hvorfor OmniRoute?

**Stop wasting money and hitting limits:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Subscription quota expires unused every month
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Rate limits stop you mid-coding
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Expensive APIs ($20-50/month per provider)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manual switching between providers

**OmniRoute løser dette:**

- ✅ **Maximize subscriptions** - Track quota, use every bit before reset
- ✅ **Auto fallback** - Subscription → API Key → Cheap → Free, zero downtime
- ✅ **Multi-account** - Round-robin between accounts per provider
- ✅ **Universal** - Works with Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, any CLI tool

---

## 📧 Support

> 💬 **Join our community!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Get help, share tips, and stay updated.

- **Websted**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md), open a PR, or pick a `good first issue`
- **Originalt projekt**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Rapporterer du en fejl?

When opening an issue, please run the system-info command and attach the generated file:

```bash
npm run system-info
```

Dette genererer en `system-info.txt` med din Node.js-version, OmniRoute-version, OS-detaljer, installerede CLI-værktøjer (iflow, gemini, claude, codex, antigravity, droid osv.), Docker/PM2-status og systempakker - alt hvad vi behøver for hurtigt at genskabe dit problem. Vedhæft filen direkte til dit GitHub-problem.

---

## 🔄 Sådan virker det

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

## 🎯 Hvad OmniRoute løser — 30 rigtige smertepunkter og brugssager

> **Alle udviklere, der bruger AI-værktøjer, står over for disse problemer dagligt.** OmniRoute blev bygget til at løse dem alle - fra omkostningsoverskridelser til regionale blokke, fra ødelagte OAuth-flows til protokoloperationer og observerbarhed i virksomheden.

<details>
<summary><b>💸 1. "Jeg betaler for et dyrt abonnement, men bliver stadig afbrudt af grænser"</b></summary>

Udviklere betaler $20-200/måned for Claude Pro, Codex Pro eller GitHub Copilot. Selv ved betaling har kvoten et loft - 5 timers brug, ugentlige grænser eller satsgrænser pr. minut. Mid-coding session, udbyderen holder op med at svare, og udvikleren mister flow og produktivitet.

**Sådan løser OmniRoute det:**

- **Smart 4-Tier Fallback** — Hvis abonnementskvoten løber ud, omdirigeres automatisk til API Key → Billig → Gratis uden manuel indgriben
- **Kvotesporing i realtid** — Viser tokenforbrug i realtid med nulstillingsnedtælling (5 timer, dagligt, ugentligt)
- **Multi-Account Support** - Flere konti pr. udbyder med automatisk round-robin - når den ene løber tør, skifter til den næste
- **Custom Combos** — Tilpasselige fallback-kæder med 6 balanceringsstrategier (fill-first, round-robin, P2C, tilfældig, mindst brugt, omkostningsoptimeret)
- **Codex Business Quotas** — Business/Team Workspace kvoteovervågning direkte i dashboardet

</details>

<details>
<summary><b>🔌 2. "Jeg skal bruge flere udbydere, men hver har en anden API"</b></summary>

OpenAI bruger et format, Claude (Antropisk) bruger et andet, Gemini endnu et andet. Hvis en udvikler ønsker at teste modeller fra forskellige udbydere eller fallback mellem dem, skal de omkonfigurere SDK'er, ændre slutpunkter, håndtere inkompatible formater. Tilpassede udbydere (FriendLI, NIM) har ikke-standardmodelslutpunkter.

**Sådan løser OmniRoute det:**

- **Unified Endpoint** — En enkelt `http://localhost:20128/v1` fungerer som proxy for alle 67+ udbydere
- **Formatoversættelse** — Automatisk og gennemsigtig: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Responsrensning** — Fjerner ikke-standardfelter (`x_groq`, `usage_breakdown`, `service_tier`), der bryder OpenAI SDK v1.83+
- **Rollenormalisering** — Konverterer `developer` → `system` for ikke-OpenAI-udbydere; `system` → `user` for GLM/ERNIE
- **Think Tag Extraction** — Udtrækker `<think>` blokke fra modeller som DeepSeek R1 til standardiseret `reasoning_content`
- **Structured Output for Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatisk konvertering
- **`stream` er standard til `false`** - Justerer med OpenAI-specifikationer, og undgår uventede SSE i Python/Rust/Go SDK'er

</details>

<details>
<summary><b>🌐 3. "Min AI-udbyder blokerer mit område/land"</b></summary>

Udbydere som OpenAI/Codex blokerer adgang fra visse geografiske områder. Brugere får fejl som `unsupported_country_region_territory` under OAuth- og API-forbindelser. Dette er især frustrerende for udviklere fra udviklingslande.

**Sådan løser OmniRoute det:**

- **3-Level Proxy Config** — Konfigurerbar proxy på 3 niveauer: global (al trafik), pr. udbyder (kun én udbyder) og pr. forbindelse/nøgle
- **Farvekodede proxy-badges** — Visuelle indikatorer: 🟢 global proxy, 🟡 udbyder proxy, 🔵 forbindelsesproxy, viser altid IP'en
- **OAuth-tokenudveksling gennem proxy** — OAuth-flow går også gennem proxyen og løser `unsupported_country_region_territory`
- **Forbindelsestest via proxy** — Forbindelsestest bruger den konfigurerede proxy (ikke mere direkte omgåelse)
- **SOCKS5-understøttelse** — Fuld SOCKS5-proxy-understøttelse til udgående routing
- **TLS Fingerprint Spoofing** — Browserlignende TLS-fingeraftryk via `wreq-js` for at omgå botdetektion
- **🔏 CLI Fingerprint Matching** — Omarrangerer overskrifter og kropsfelter, så de matcher native CLI binære signaturer, hvilket drastisk reducerer risikoen for kontoflaggning. Proxy-IP'en bevares - du får både stealth **og** IP-maskering samtidigt

</details>

<details>
<summary><b>🆓 4. "Jeg vil bruge AI til kodning, men jeg har ingen penge"</b></summary>

Ikke alle kan betale $20-200/måned for AI-abonnementer. Studerende, udviklere fra vækstlande, hobbyfolk og freelancere har brug for adgang til kvalitetsmodeller uden omkostninger.

**Sådan løser OmniRoute det:**

- **Free Tier Providers Indbygget** — Indbygget understøttelse af 100 % gratis udbydere: iFlow (5 ubegrænsede modeller via OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 unlimited-modeller,-r-modeller) qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID gratis), Gemini CLI (180K tokens/måned gratis)
- **Ollama Cloud** — Cloud-hostede Ollama-modeller på `api.ollama.com` med gratis "Light usage"-niveau; brug præfikset `ollamacloud/<model>`
- **Kun gratis kombinationer** — Kæde `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/måned uden nedetid
- **NVIDIA NIM Free Access** — ~40 RPM dev-forever gratis adgang til 70+ modeller på build.nvidia.com (overgang fra kreditter til rene hastighedsgrænser)
- **Cost Optimized Strategy** — Routingstrategi, der automatisk vælger den billigste tilgængelige udbyder

</details>

<details>
<summary><b>🔒 5. "Jeg skal beskytte min AI-gateway mod uautoriseret adgang"</b></summary>

Når en AI-gateway eksponeres for netværket (LAN, VPS, Docker), kan enhver med adressen forbruge udviklerens tokens/kvote. Uden beskyttelse er API'er sårbare over for misbrug, hurtig injektion og misbrug.

**Sådan løser OmniRoute det:**

- **API Key Management** — Generering, rotation og scoping pr. udbyder med en dedikeret `/dashboard/api-manager` side
- **Tilladelser på modelniveau** — Begræns API-nøgler til specifikke modeller (`openai/*`, jokertegnmønstre) med Tillad alt/Begræns-skift
- **API Endpoint Protection** — Kræv en nøgle til `/v1/models` og bloker specifikke udbydere fra fortegnelsen
- **Auth Guard + CSRF Protection** — Alle dashboard-ruter beskyttet med `withAuth` middleware + CSRF-tokens
- **Rate Limiter** — Per-IP hastighedsbegrænsning med konfigurerbare vinduer
- **IP-filtrering** — Tilladelsesliste/blokeringsliste til adgangskontrol
- **Prompt Injection Guard** — Sanering mod ondsindede promptmønstre
- **AES-256-GCM-kryptering** — Legitimationsoplysninger krypteret i hvile

</details>

<details>
<summary><b>🛑 6. "Min udbyder gik ned, og jeg mistede mit kodningsflow"</b></summary>

AI-udbydere kan blive ustabile, returnere 5xx-fejl eller ramme midlertidige hastighedsgrænser. Hvis en udvikler afhænger af en enkelt udbyder, bliver de afbrudt. Uden strømafbrydere kan gentagne genforsøg crashe programmet.

**Sådan løser OmniRoute det:**

- **Circuit Breaker pr. model** — Automatisk åbning/lukning med konfigurerbare tærskler og nedkøling (Lukket/Åben/Halv-Åben), omfang pr. model for at undgå kaskadeblokke
- **Eksponentiel backoff** — Progressive forsinkelser af genforsøg
- **Anti-tordenbesætning** — Mutex + semaforbeskyttelse mod samtidige genforsøgsstorme
- **Combo Fallback Chains** — Hvis den primære udbyder fejler, falder den automatisk gennem kæden uden indgriben
- **Combo Circuit Breaker** - Deaktiverer automatisk fejlende udbydere i en kombinationskæde
- **Health Dashboard** — Oppetidsovervågning, strømafbrydertilstande, lockouts, cachestatistik, p50/p95/p99 latency

</details>

<details>
<summary><b>🔧 7. "Konfiguration af hvert AI-værktøj er trættende og gentagende"</b></summary>

Udviklere bruger Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Hvert værktøj har brug for en anden konfiguration (API-endepunkt, nøgle, model). At omkonfigurere, når du skifter udbyder eller model, er spild af tid.

**Sådan løser OmniRoute det:**

- **CLI Tools Dashboard** — Dedikeret side med et-klik opsætning til Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Genererer `chatLanguageModels.json` til VS-kode med bulk modelvalg
- **Onboarding Wizard** — Guidet 4-trins opsætning for førstegangsbrugere
- **Ét slutpunkt, alle modeller** — Konfigurer `http://localhost:20128/v1` én gang, få adgang til 67+ udbydere

</details>

<details>
<summary><b>🔑 8. "Administration af OAuth-tokens fra flere udbydere er et helvede"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot - alle bruger OAuth 2.0 med udløbende tokens. Udviklere er nødt til konstant at autentificere igen, håndtere `client_secret is missing`, `redirect_uri_mismatch` og fejl på fjernservere. OAuth på LAN/VPS er særligt problematisk.

**Sådan løser OmniRoute det:**

- **Automatisk tokenopdatering** — OAuth-tokens opdateres i baggrunden før udløb
- **OAuth 2.0 (PKCE) Indbygget** — Automatisk flow for Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Flere konti pr. udbyder via JWT/ID-tokenudtrækning
- **OAuth LAN/Remote Fix** — Privat IP-detektering for `redirect_uri` + manuel URL-tilstand til fjernservere
- **OAuth Behind Nginx** — Bruger `window.location.origin` til omvendt proxykompatibilitet
- **Remote OAuth Guide** — Trin-for-trin guide til Google Cloud-legitimationsoplysninger på VPS/Docker

</details>

<details>
<summary><b>📊 9. "Jeg ved ikke, hvor meget jeg bruger eller hvor"</b></summary>

Udviklere bruger flere betalte udbydere, men har ikke noget samlet syn på udgifter. Hver udbyder har sit eget faktureringsdashboard, men der er ingen konsolideret visning. Uventede omkostninger kan hobe sig op.

**Sådan løser OmniRoute det:**

- **Dashboard for omkostningsanalyse** — omkostningssporing pr. token og budgetstyring pr. udbyder
- **Budgetgrænser pr. niveau** — Udgiftsloft pr. niveau, der udløser automatisk fallback
- **Priskonfiguration pr. model** — Konfigurerbare priser pr. model
- **Brugsstatistik pr. API-nøgle** — Antal anmodninger og sidst anvendte tidsstempel pr. nøgle
- **Analytics Dashboard** — Statiske kort, modelbrugsdiagram, udbydertabel med succesrater og latens

</details>

<details>
<summary><b>🐛 10. "Jeg kan ikke diagnosticere fejl og problemer i AI-opkald"</b></summary>

Når et opkald mislykkes, ved udvikleren ikke, om det var en takstgrænse, udløbet token, forkert format eller udbyderfejl. Fragmenterede logfiler på tværs af forskellige terminaler. Uden observerbarhed er fejlfinding trial-and-error.

**Sådan løser OmniRoute det:**

- **Unified Logs Dashboard** — 4 faner: Request Logs, Proxy Logs, Audit Logs, Console
- **Console Log Viewer** — Realtidsterminal-fremviser med farvekodede niveauer, automatisk rulning, søg, filtrer
- **SQLite Proxy Logs** — Vedvarende logfiler, der overlever servergenstarter
- **Oversætterlegeplads** — 4 fejlfindingstilstande: Legeplads (formatoversættelse), Chattester (rundtur), Testbænk (batch), Live Monitor (realtid)
- **Request Telemetri** — p50/p95/p99 latency + X-Request-Id-sporing
- **Filbaseret logning med rotation** — Konsolinterceptor fanger alt til JSON-log med størrelsesbaseret rotation
- **System Info Report** — `npm run system-info` genererer `system-info.txt` med dit fulde miljø (Nodeversion, OmniRoute-version, OS, CLI-værktøjer, Docker/PM2-status). Vedhæft det, når du rapporterer problemer til øjeblikkelig triage.

</details>

<details>
<summary><b>🏗️ 11. "Deployering og vedligeholdelse af gatewayen er kompleks"</b></summary>

Installation, konfiguration og vedligeholdelse af en AI-proxy på tværs af forskellige miljøer (lokalt, VPS, Docker, cloud) er arbejdskrævende. Problemer som hårdkodede stier, `EACCES` på mapper, portkonflikter og cross-platform builds tilføjer friktion.

**Sådan løser OmniRoute det:**

- **npm global installation** — `npm install -g omniroute && omniroute` — udført
- **Docker Multi-Platform** — AMD64 + ARM64 native (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (ingen CLI-værktøjer) og `cli` (med Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — Indbygget app til Windows/macOS/Linux med systembakke, autostart, offlinetilstand
- **Split-Port Mode** — API og Dashboard på separate porte til avancerede scenarier (omvendt proxy, containernetværk)
- **Cloud Sync** — Konfigurer synkronisering på tværs af enheder via Cloudflare Workers
- **DB Backups** — Automatisk backup, gendannelse, eksport og import af alle indstillinger

</details>

<details>
<summary><b>🌍 12. "Grænsefladen er kun engelsk, og mit team taler ikke engelsk"</b></summary>

Hold i ikke-engelsktalende lande, især i Latinamerika, Asien og Europa, kæmper med grænseflader, der kun er på engelsk. Sprogbarrierer reducerer adoption og øger konfigurationsfejl.

**Sådan løser OmniRoute det:**

- **Dashboard i18n — 30 sprog** — Alle 500+ taster er oversat, inklusive arabisk, bulgarsk, dansk, tysk, spansk, finsk, fransk, hebraisk, hindi, ungarsk, indonesisk, italiensk, japansk, koreansk, malaysisk, hollandsk, norsk, polsk, portugisisk (PT/BR), rumænsk, russisk, ukrainsk, kinesisk, ukrainsk, kinesisk, kinesisk, ukrainsk, kinesisk, ukrainsk, kinesisk, ukrainsk, kinesisk, Vietnam, Vietnam
- **RTL-understøttelse** — Højre-til-venstre-understøttelse for arabisk og hebraisk
- **Multi-Language READMEs** — 30 komplette dokumentationsoversættelser
- **Sprogvælger** — Globusikon i overskriften til skift i realtid

</details>

<details>
<summary><b>🔄 13. "Jeg har brug for mere end chat — jeg har brug for indlejringer, billeder, lyd"</b></summary>

AI er ikke bare fuldførelse af chat. Udviklere skal generere billeder, transskribere lyd, oprette indlejringer til RAG, omrangere dokumenter og moderere indhold. Hver API har et andet slutpunkt og format.

**Sådan løser OmniRoute det:**

- **Indlejringer** — `/v1/embeddings` med 6 udbydere og 9+ modeller
- **Billedgenerering** — `/v1/images/generations` med 10 udbydere og 20+ modeller (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Tekst-til-video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) og SD WebUI
- **Tekst-til-musik** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Lydtransskription** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Tekst-til-tale** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + eksisterende udbydere
- **Moderationer** — `/v1/moderations` — Indholdssikkerhedstjek
- **Omrangering** — `/v1/rerank` — Omrangering af dokumentrelevans
- **Responses API** — Fuld `/v1/responses` understøttelse af Codex

</details>

<details>
<summary><b>🧪 14. "Jeg har ingen måde at teste og sammenligne kvalitet på tværs af modeller"</b></summary>

Udviklere vil gerne vide, hvilken model der er bedst til deres brug - kode, oversættelse, ræsonnement - men manuel sammenligning er langsom. Der findes ingen integrerede evalueringsværktøjer.

**Sådan løser OmniRoute det:**

- **LLM-evalueringer** — Gyldne sæt-test med 10 forudindlæste cases, der dækker hilsner, matematik, geografi, kodegenerering, JSON-overholdelse, oversættelse, markdown, sikkerhedsafvisning
- **4 kampstrategier** — `exact`, `contains`, `regex`, `custom` (JS-funktion)
- **Translator Playground Test Bench** — Batchtest med flere input og forventede output, sammenligning på tværs af udbydere
- **Chattester** — Fuld rundtur med visuel responsgengivelse
- **Live Monitor** — Realtidsstream af alle anmodninger, der flyder gennem proxyen

</details>

<details>
<summary><b>📈 15. "Jeg har brug for at skalere uden at miste ydeevne"</b></summary>

Efterhånden som forespørgselsvolumen vokser, genererer de samme spørgsmål duplikerede omkostninger uden cache. Uden idempotens, dublerede anmodninger om affaldsbehandling. Takstgrænser pr. udbyder skal overholdes.

**Sådan løser OmniRoute det:**

- **Semantisk cache** — To-lags cache (signatur + semantisk) reducerer omkostninger og latens
- **Request Idempotency** — 5s deduplikeringsvindue for identiske anmodninger
- **Detektion af hastighedsgrænse** — RPM pr. udbyder, min. gap og maks. samtidig sporing
- **Redigerbare hastighedsgrænser** — Konfigurerbare standardindstillinger i Indstillinger → Modstandsdygtighed med vedholdenhed
- **API Key Validation Cache** — 3-lags cache til produktionsydeevne
- **Health Dashboard med telemetri** — p50/p95/p99 latency, cachestatistik, oppetid

</details>

<details>
<summary><b>🤖 16. "Jeg vil kontrollere modeladfærd globalt"</b></summary>

Udviklere, der ønsker alle svar på et bestemt sprog, med en bestemt tone, eller ønsker at begrænse ræsonnementstokens. Det er upraktisk at konfigurere dette i hvert værktøj/anmodning.

**Sådan løser OmniRoute det:**

- **System Prompt Injection** — Global prompt anvendt på alle anmodninger
- **Thinking Budget Validation** — Reasoning token allocation control pr. anmodning (passthrough, auto, custom, adaptive)
- **6 Routing Strategies** — Globale strategier, der bestemmer, hvordan anmodninger distribueres
- **Wildcard Router** — `provider/*` mønstre ruter dynamisk til enhver udbyder
- **Kombo Aktiver/Deaktiver Til/fra** — Skift kombinationer direkte fra dashboardet
- **Til/fra udbyder** — Aktiver/deaktiver alle forbindelser for en udbyder med et enkelt klik
- **Blokerede udbydere** — Ekskluder specifikke udbydere fra `/v1/models` fortegnelsen

</details>

<details>
<summary><b>🧰 17. "Jeg har brug for MCP-værktøjer som førsteklasses produktegenskaber"</b></summary>

Mange AI-gateways afslører kun MCP som en skjult implementeringsdetalje. Teams har brug for et synligt, overskueligt operationslag.

**Sådan løser OmniRoute det:**

- MCP vises på fanen dashboardnavigation og endepunktsprotokol
- Dedikeret MCP-administrationsside med proces, værktøjer, omfang og revision
- Indbygget hurtigstart til `omniroute --mcp` og klient onboarding

</details>

<details>
<summary><b>🧠 18. "Jeg har brug for A2A-orkestrering med synkronisering + stream opgavestier"</b></summary>

Agentarbejdsgange kræver både direkte svar og langvarig streamet udførelse med livscykluskontrol.

**Sådan løser OmniRoute det:**

- A2A JSON-RPC-slutpunkt (`POST /a2a`) med `message/send` og `message/stream`
- SSE-streaming med udbredelse af terminaltilstand
- Opgavelivscyklus API'er for `tasks/get` og `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Jeg har brug for ægte MCP-processundhed, ikke gættet status"</b></summary>

Operationelle teams skal vide, om MCP faktisk er i live, ikke kun om en API er tilgængelig.

**Sådan løser OmniRoute det:**

- Runtime-hjerteslagsfil med PID, tidsstempler, transport, værktøjstælling og omfangstilstand
- MCP status API, der kombinerer hjerteslag + seneste aktivitet
- UI-statuskort til proces/oppetid/hjerteslagsfriskhed

</details>

<details>
<summary><b>📋 20. "Jeg har brug for revisionsbar MCP-værktøjsudførelse"</b></summary>

Når værktøjer muterer konfiguration eller udløser ops-handlinger, har teams brug for retsmedicinsk sporbarhed.

**Sådan løser OmniRoute det:**

- SQLite-støttet revisionslogning for MCP-værktøjsopkald
- Filtrerer efter værktøj, succes/fiasko, API-nøgle og paginering
- Dashboard revisionstabel + statistik slutpunkter til automatisering

</details>

<details>
<summary><b>🔐 21. "Jeg har brug for scoped MCP-tilladelser pr. integration"</b></summary>

Forskellige klienter bør have mindst privilegeret adgang til værktøjskategorier.

**Sådan løser OmniRoute det:**

- 9 granulære MCP-skoper til kontrolleret værktøjsadgang
- Håndhævelse af omfang og synlighed i MCP management UI
- Sikker standardstilling for operationelt værktøj

</details>

<details>
<summary><b>⚙️ 22. "Jeg har brug for operationelle kontroller uden omfordeling"</b></summary>

Teams har brug for hurtige runtime-ændringer under hændelser eller omkostningsbegivenheder.

**Sådan løser OmniRoute det:**

- Skift kombinationsaktivering direkte fra MCP-dashboard
- Anvend modstandsdygtighedsprofiler fra foruddefinerede politikpakker
- Nulstil strømafbrydertilstand fra det samme betjeningspanel

</details>

<details>
<summary><b>🔄 23. "Jeg har brug for live A2A opgave livscyklus synlighed og annullering"</b></summary>

Uden livscyklussynlighed bliver opgavehændelser svære at triage.

**Sådan løser OmniRoute det:**

- Opgaveliste/filtrering efter tilstand/færdighed med paginering
- Drill-down på opgavemetadata, hændelser og artefakter
- Slutpunkt for annullering af opgave og UI-handling med bekræftelse

</details>

<details>
<summary><b>🌊 24. "Jeg har brug for aktive stream-metrics for A2A-indlæsning"</b></summary>

Streaming-arbejdsgange kræver operationel indsigt i samtidighed og live-forbindelser.

**Sådan løser OmniRoute det:**

- Aktive stream-tællere integreret i A2A-status
- Tidsstempel for sidste opgave og tæller pr. stat
- A2A dashboard-kort til operationsovervågning i realtid

</details>

<details>
<summary><b>🪪 25. "Jeg har brug for standard agentopdagelse til klienter"</b></summary>

Eksterne klienter og orkestratorer har brug for maskinlæsbare metadata til onboarding.

**Sådan løser OmniRoute det:**

- Agentkort afsløret på `/.well-known/agent.json`
- Evner og færdigheder vist i ledelsens brugergrænseflade
- A2A status API inkluderer opdagelsesmetadata til automatisering

</details>

<details>
<summary><b>🧭 26. "Jeg har brug for protokolsynlighed i produktets UX"</b></summary>

Hvis brugere ikke kan opdage protokoloverflader, falder kvaliteten af adoption og support.

**Sådan løser OmniRoute det:**

- Konsolideret **Endpoints**-side med faner til Proxy, MCP, A2A og API Endpoints
- Inline service status skifter (Online/Offline) for MCP og A2A
- Links fra oversigt til dedikerede administrationsfaner

</details>

<details>
<summary><b>🧪 27. "Jeg har brug for end-to-end protokolvalidering med rigtige klienter"</b></summary>

Mock-tests er ikke nok til at validere protokolkompatibilitet før frigivelse.

**Sådan løser OmniRoute det:**

- E2E-pakke, der starter app og bruger ægte MCP SDK-klienttransport
- A2A klient tester for opdagelse, send, stream, hent og annuller flows
- Krydstjek påstande mod MCP-revision og A2A-opgaver API'er

</details>

<details>
<summary><b>📡 28. "Jeg har brug for samlet observerbarhed på tværs af alle grænseflader"</b></summary>

Opdeling af observerbarhed efter protokol skaber blinde pletter og længere MTTR.

**Sådan løser OmniRoute det:**

- Samlede dashboards/logfiler/analyse i ét produkt
- Health + audit + request telemetri på tværs af OpenAI, MCP og A2A lag
- Operationelle API'er til status og automatisering

</details>

<details>
<summary><b>💼 29. "I need one runtime for proxy + tools + agent orchestration"</b></summary>

At køre mange separate tjenester øger driftsomkostninger og fejltilstande.

**Sådan løser OmniRoute det:**

- OpenAI-kompatibel proxy, MCP-server og A2A-server i én stak
- Delt godkendelse, robusthed, datalager og observerbarhed
- Ensartet politikmodel på tværs af alle interaktionsflader

</details>

<details>
<summary><b>🚀 30. "Jeg har brug for at sende agentiske arbejdsgange uden limkodesprawl"</b></summary>

Hold mister hastighed, når de sammensætter flere ad-hoc-tjenester og scripts.

**Sådan løser OmniRoute det:**

- Ensartet slutpunktsstrategi for kunder og agenter
- Indbygget protokolstyring UI'er og røgvalideringsstier
- Produktionsklare fundamenter (sikkerhed, logning, robusthed, backup)

</details>

### Eksempel på Playbooks (Integrated Use Cases)

**Playbook A: Maksimer betalt abonnement + billig backup**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Gratis kodningsstak**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7 altid aktiv reservekæde**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Agent ops med MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Start gratis — Ingen konfigurationsomkostninger

> Konfigurer AI-kodning på få minutter til **$0/måned**. Tilslut disse gratis konti, og brug den indbyggede **Free Stack**-kombination.

| Trin | Handling                                            | Udbydere ulåst                                                      |
| ---- | --------------------------------------------------- | ------------------------------------------------------------------- |
| 1    | Tilslut **Kiro** (AWS Builder ID OAuth)             | Claude Sonnet 4.5, Haiku 4.5 — **ubegrænset**                       |
| 2    | Tilslut **iFlow** (Google OAuth)                    | kimi-k2-tænkning, qwen3-coder-plus, deepseek-r1... — **ubegrænset** |
| 3    | Tilslut **Qwen** (enhedskode)                       | qwen3-coder-plus, qwen3-coder-flash... — **ubegrænset**             |
| 4    | Tilslut **Gemini CLI** (Google OAuth)               | gemini-3-flash, gemini-2.5-pro — **180K/md gratis**                 |
| 5    | `/dashboard/combos` → **Gratis stak ($0)** skabelon | Round-robin alle gratis udbydere automatisk                         |

**Peg enhver IDE/CLI til:** `http://localhost:20128/v1` · API-nøgle: `any-string` · Udført.

> **Valgfri ekstra dækning (også gratis):** Groq API-nøgle (30 RPM gratis), NVIDIA NIM (40 RPM gratis, 70+ modeller), Cerebras (1M tok/dag), LongCat API-nøgle (50M tokens/dag!), Cloudflare Workers AI (10K Neurons/day, 50+ modeller).

## ⚡ Hurtig start

### 1) Installer og kør

```bash
npm install -g omniroute
omniroute
```

> **pnpm-brugere:** Kør `pnpm approve-builds -g` efter installation for at aktivere native build-scripts, der kræves af `better-sqlite3` og `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Dashboard åbner kl. `http://localhost:20128`, og API-base-URL er `http://localhost:20128/v1`.

| Kommando                | Beskrivelse                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `omniroute`             | Start server (`PORT=20128`, API og dashboard på samme port) |
| `omniroute --port 3000` | Indstil kanonisk/API-port til 3000                          |
| `omniroute --mcp`       | Start MCP-server (stdio-transport)                          |
| `omniroute --no-open`   | Åbn ikke browseren automatisk                               |
| `omniroute --help`      | Vis hjælp                                                   |

Valgfri split-port-tilstand:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Tilslut udbydere og opret din API-nøgle

1. Åbn Dashboard → `Providers` og tilslut mindst én udbyder (OAuth- eller API-nøgle).
2. Åbn Dashboard → `Endpoints` og opret en API-nøgle.
3. (Valgfrit) Åbn Dashboard → `Combos` og indstil din reservekæde.

### 3) Peg dit kodningsværktøj til OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Fungerer med Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode og OpenAI-kompatible SDK'er.

### 4) Aktiver og valider protokoller (v2.0)

**MCP (til værktøjsdrevne operationer):**

```bash
omniroute --mcp
```

Tilslut derefter din MCP-klient over `stdio` og test værktøjer som:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (for agent-til-agent arbejdsgange):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Valider alt ende-til-ende (anbefales)

```bash
npm run test:protocols:e2e
```

Denne suite validerer rigtige MCP- og A2A-klientstrømme mod en kørende app.

### Alternativ: Kør fra kilden

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

OmniRoute er tilgængelig som et offentligt Docker-billede på [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Hurtigt løb:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Med miljøfil:**

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

**Brug af Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Billede                  | Tag      | Størrelse | Beskrivelse               |
| ------------------------ | -------- | --------- | ------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB    | Seneste stabile udgivelse |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB    | Nuværende version         |

---

## 🖥️ Desktop-app — offline og altid tændt

> 🆕 **NYT!** OmniRoute er nu tilgængelig som en **native desktop-applikation** til Windows, macOS og Linux.

Kør OmniRoute som en selvstændig desktop-app - ingen terminal, ingen browser, intet internet påkrævet for lokale modeller. Den elektronbaserede app inkluderer:

- 🖥️ **Native Window** — Dedikeret appvindue med systembakkeintegration
- 🔄 **Auto-Start** — Start OmniRoute ved systemlogin
- 🔔 **Native notifikationer** — Få advarsler om kvoteopbrugt eller udbyderproblemer
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline-tilstand** — Fungerer fuldt ud offline med medfølgende server

### Hurtig start

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Systembakke

Når den er minimeret, lever OmniRoute i din procesbakke med hurtige handlinger:

- Åbn instrumentbrættet
- Skift serverport
- Afslut programmet

📖 Fuld dokumentation: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Prissætning på et øjeblik

| Tier              | Udbyder                     | Omkostninger                    | Kvote nulstilling  | Bedst til                            |
| ----------------- | --------------------------- | ------------------------------- | ------------------ | ------------------------------------ |
| **💳 ABONNEMENT** | Claude Code (Pro)           | 20 USD/md.                      | 5 timer + ugentlig | Allerede abonneret                   |
|                   | Codex (Plus/Pro)            | $20-200/md.                     | 5 timer + ugentlig | OpenAI-brugere                       |
|                   | Gemini CLI                  | **GRATIS**                      | 180K/md + 1K/dag   | Alle sammen!                         |
|                   | GitHub Copilot              | $10-19/md.                      | Månedlig           | GitHub-brugere                       |
| **🔑 API NØGLE**  | NVIDIA NIM                  | **GRATIS** (dev for evigt)      | ~40 RPM            | 70+ åbne modeller                    |
|                   | Cerebras                    | **GRATIS** (1M tok/dag)         | 60K TPM / 30 RPM   | Verdens hurtigste                    |
|                   | Groq                        | **GRATIS** (30 RPM)             | 14,4K RPD          | Ultrahurtig Lama/Gemma               |
|                   | DeepSeek V3.2               | 0,27 USD/1,10 USD pr. 1 mio.    | Ingen              | Bedste pris/kvalitet ræsonnement     |
|                   | xAI Grok-4 Hurtig           | **$0,20/$0,50 pr. 1M** 🆕       | Ingen              | Hurtigste + værktøjsopkald, ultralav |
|                   | xAI Grok-4 (standard)       | 0,20 USD/1,50 USD pr. 1 mio. 🆕 | Ingen              | Fornuft flagskib fra xAI             |
|                   | Mistral                     | Gratis prøveperiode + betalt    | Sats begrænset     | Europæisk AI                         |
|                   | OpenRouter                  | Betal pr. brug                  | Ingen              | 100+ modeller aggr.                  |
| **💰 BILLIG**     | GLM-5 (via Z.AI) 🆕         | 0,5 USD/1 mio.                  | Dagligt 10:00      | 128K output, nyeste flagskib         |
|                   | GLM-4.7                     | 0,6 USD/1 mio.                  | Dagligt 10:00      | Budget backup                        |
|                   | MiniMax M2.5 🆕             | $0,3/1 mio. input               | 5-timers rullende  | Begrundelse + agentopgaver           |
|                   | MiniMax M2.1                | $0,2/1 mio.                     | 5-timers rullende  | Billigste mulighed                   |
|                   | Kimi K2.5 (Moonshot API) 🆕 | Betal pr. brug                  | Ingen              | Direkte Moonshot API-adgang          |
|                   | Kimi K2                     | 9 USD/md. lejlighed             | 10M tokens/md.     | Forudsigelige omkostninger           |
| **🆓 GRATIS**     | iFlow                       | **$0**                          | Ubegrænset         | 5 modeller ubegrænset                |
|                   | Qwen                        | **$0**                          | Ubegrænset         | 4 modeller ubegrænset                |
|                   | Kiro                        | **$0**                          | Ubegrænset         | Claude Sonnet/Haiku (AWS Builder)    |
|                   | LongCat Flash-Lite 🆕       | **$0** (50 mio. tok/dag 🔥)     | 1 RPS              | Største gratis kvote på jorden       |
|                   | Bestøvninger AI 🆕          | **$0** (ingen nøgle nødvendig)  | 1 req/15s          | GPT-5, Claude, DeepSeek, Llama 4     |
|                   | Cloudflare Workers AI 🆕    | **$0** (10.000 neuroner/dag)    | ~150 hhv/dag       | 50+ modeller, global kant            |
|                   | Scaleway AI 🆕              | **$0** (1 mio. tokens i alt)    | Sats begrænset     | EU/GDPR, Qwen3 235B, Lama 70B        |

> 🆕 **Nye modeller tilføjet (marts 2026):** Grok-4 Fast-familie til $0,20/$0,50/M (benchmarked ved 1143ms — 30 % hurtigere end Gemini 2.5 Flash), GLM-5 via Z.AI med 128K output, MiniMax M2.5-begrundelse, KimSeidek pr. direkte API.

**💡 $0 Combo Stack — Den komplette gratis opsætning:**

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

**Nul omkostninger. Stopper aldrig med at kode.** Konfigurer dette som én OmniRoute-kombination, og alle fallbacks sker automatisk - ingen manuel skift nogensinde.

---

---

## 🆓 Gratis modeller — hvad du faktisk får

> Alle modeller nedenfor er **100 % gratis uden kreditkort påkrævet**. OmniRoute dirigerer automatisk mellem dem, når én kvote løber ud - kombiner dem alle for en ubrydelig kombination af $0.

### 🔵 CLAUDE MODELLER (via Kiro — AWS Builder ID)

| Model               | Præfiks | Grænse         | Satsgrænse                     |
| ------------------- | ------- | -------------- | ------------------------------ |
| `claude-sonnet-4.5` | `kr/`   | **Ubegrænset** | Ingen rapporteret dagligt loft |
| `claude-haiku-4.5`  | `kr/`   | **Ubegrænset** | Ingen rapporteret dagligt loft |
| `claude-opus-4.6`   | `kr/`   | **Ubegrænset** | Seneste Opus via Kiro          |

### IFLOW MODELLER (gratis OAuth — intet kreditkort)

| Model              | Præfiks | Grænse         | Satsgrænse             |
| ------------------ | ------- | -------------- | ---------------------- |
| `kimi-k2-thinking` | `if/`   | **Ubegrænset** | Ingen rapporteret loft |
| `qwen3-coder-plus` | `if/`   | **Ubegrænset** | Ingen rapporteret loft |
| `deepseek-r1`      | `if/`   | **Ubegrænset** | Ingen rapporteret loft |
| `minimax-m2.1`     | `if/`   | **Ubegrænset** | Ingen rapporteret loft |
| `kimi-k2`          | `if/`   | **Ubegrænset** | Ingen rapporteret loft |

### 🟡 QWEN-MODELLER (Enhedskodegodkendelse)

| Model               | Præfiks | Grænse         | Satsgrænse             |
| ------------------- | ------- | -------------- | ---------------------- |
| `qwen3-coder-plus`  | `qw/`   | **Ubegrænset** | No reported cap        |
| `qwen3-coder-flash` | `qw/`   | **Ubegrænset** | Ingen rapporteret loft |
| `qwen3-coder-next`  | `qw/`   | **Ubegrænset** | Ingen rapporteret loft |
| `vision-model`      | `qw/`   | **Ubegrænset** | Multimodal (billeder)  |

### 🟣 GEMINI CLI (Google OAuth)

| Model                    | Præfiks | Grænse                      | Satsgrænse           |
| ------------------------ | ------- | --------------------------- | -------------------- |
| `gemini-3-flash-preview` | `gc/`   | **180K tok/måned** + 1K/dag | Månedlig nulstilling |
| `gemini-2.5-pro`         | `gc/`   | 180K/måned (delt pool)      | Høj kvalitet         |

### ⚫ NVIDIA NIM (gratis API-nøgle — build.nvidia.com)

| Tier         | Daglig grænse   | Satsgrænse  | Noter                                                  |
| ------------ | --------------- | ----------- | ------------------------------------------------------ |
| Gratis (Dev) | Ingen token cap | **~40 RPM** | 70+ modeller; overgang til rene satsgrænser medio 2025 |

Populære gratis modeller: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (gratis API-nøgle — inference.cerebras.ai)

| Tier   | Daglig grænse         | Satsgrænse       | Noter                                              |
| ------ | --------------------- | ---------------- | -------------------------------------------------- |
| Gratis | **1 mio. tokens/dag** | 60K TPM / 30 RPM | Verdens hurtigste LLM-slutning; nulstilles dagligt |

Tilgængelig gratis: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (gratis API-nøgle — console.groq.com)

| Tier   | Daglig grænse | Satsgrænse       | Noter                                          |
| ------ | ------------- | ---------------- | ---------------------------------------------- |
| Gratis | **14,4K RPD** | 30 RPM pr. model | Intet kreditkort; 429 på grænse, ikke opkrævet |

Tilgængelig gratis: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (gratis API-nøgle — longcat.chat) 🆕

| Model                         | Præfiks | Daglig gratis kvote   | Noter                           |
| ----------------------------- | ------- | --------------------- | ------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`   | **50 mio. tokens** 💥 | Største gratis kvote nogensinde |
| `LongCat-Flash-Chat`          | `lc/`   | 500.000 tokens        | Multi-turn chat                 |
| `LongCat-Flash-Thinking`      | `lc/`   | 500.000 tokens        | Begrundelse / CoT               |
| `LongCat-Flash-Thinking-2601` | `lc/`   | 500.000 tokens        | Jan 2026 version                |
| `LongCat-Flash-Omni-2603`     | `lc/`   | 500.000 tokens        | Multimodal                      |

> 100 % gratis, mens du er i offentlig beta. Tilmeld dig på [longcat.chat](https://longcat.chat) med e-mail eller telefon. Nulstiller dagligt 00:00 UTC.

### 🟢 POLLINATIONS AI (ingen API-nøgle påkrævet) 🆕

| Model      | Præfiks | Satsgrænse | Udbyder bag        |
| ---------- | ------- | ---------- | ------------------ |
| `openai`   | `pol/`  | 1 req/15s  | GPT-5              |
| `claude`   | `pol/`  | 1 req/15s  | Antropiske Claude  |
| `gemini`   | `pol/`  | 1 req/15s  | Google Gemini      |
| `deepseek` | `pol/`  | 1 req/15s  | DeepSeek V3        |
| `llama`    | `pol/`  | 1 req/15s  | Meta Llama 4 Scout |
| `mistral`  | `pol/`  | 1 req/15s  | Mistral AI         |

> ✨ **Nul friktion:** Ingen tilmelding, ingen API-nøgle. Tilføj bestøvningsudbyderen med et tomt nøglefelt, og det virker med det samme.

### 🟠 CLOUDFLARE WORKERS AI (gratis API-nøgle — cloudflare.com) 🆕

| Tier   | Daglige neuroner | Tilsvarende brug                             | Noter                     |
| ------ | ---------------- | -------------------------------------------- | ------------------------- |
| Gratis | **10.000**       | ~150 LLM resp. / 500s lyd / 15K indlejringer | Global kant, 50+ modeller |

Populære gratis modeller: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (gratis lyd!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Kræver API-token + konto-id fra [dash.cloudflare.com](https://dash.cloudflare.com). Gem konto-id i udbyderindstillinger.

### 🟣 SCALEWAY AI (1M gratis tokens — scaleway.com) 🆕

| Tier   | Gratis kvote      | Beliggenhed  | Noter                                           |
| ------ | ----------------- | ------------ | ----------------------------------------------- |
| Gratis | **1 mio. tokens** | 🇫🇷 Paris, EU | Intet kreditkort nødvendigt inden for grænserne |

Tilgængelig gratis: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> EU/GDPR-kompatibel. Hent API-nøgle på [console.scaleway.com](https://console.scaleway.com).

> **💡 Den ultimative gratis stak (11 udbydere, $0 for evigt):**
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

## 🎙️ Gratis transskriptionskombination

> Transskriber enhver lyd/video for **$0** — Deepgram-emner med $200 gratis, AssemblyAI $50 fallback, Groq Whisper som ubegrænset nødbackup.

| Udbyder           | Gratis kreditter             | Bedste model                                | Satsgrænse                           |
| ----------------- | ---------------------------- | ------------------------------------------- | ------------------------------------ |
| **Deepgram**      | **$200 gratis** (tilmelding) | `nova-3` — bedste nøjagtighed, 30+ sprog    | Ingen RPM-grænse på gratis kreditter |
| 🔵 **AssemblyAI** | **$50 gratis** (tilmelding)  | `universal-3-pro` — kapitler, følelser, PII | Ingen RPM-grænse på gratis kreditter |
| 🔴 **Groq**       | **Gratis for evigt**         | `whisper-large-v3` — OpenAI Whisper         | 30 RPM (hastighedsbegrænset)         |

**Foreslået kombination i `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Derefter i `/dashboard/media` → fanen **Transskription**: upload en lyd- eller videofil → vælg dit kombinationsslutpunkt → få transskription i understøttede formater.

## 💡 Nøglefunktioner

OmniRoute v2.0 er bygget som en operationel platform, ikke kun en relæ-proxy.

### 🆕 Nyt — ClawRouter-inspirerede forbedringer (mars 2026)

| Funktion                                   | Hvad det gør                                                                                                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Fast Family**                  | xAI-modeller til $0,20/$0,50/M — benchmarked 1143ms (30 % hurtigere end Gemini 2,5 Flash)                               |
| 🧠 **GLM-5 via Z.AI**                      | 128K output kontekst, $0,5/1M — nyeste flagskib fra GLM-familien                                                        |
| 🔮 **MiniMax M2.5**                        | Begrundelse + agentopgaver til $0,30/1M — betydelig opgradering fra M2.1                                                |
| 🎯 **værktøj Calling Flag per model**      | Pr. model `toolCalling: true/false` i registreringsdatabasen — AutoCombo springer ikke-værktøjskompatible modeller over |
| 🌍 **Flersproget hensigtsdetektion**       | PT/ZH/ES/AR nøgleord i AutoCombo scoring — bedre modelvalg for ikke-engelsk indhold                                     |
| 📊 **Benchmark-drevne fallbacks**          | Ægte p95-forsinkelse fra live-anmodninger feeds combo scoring — AutoCombo lærer af faktiske data                        |
| 🔁 **Anmod om deduplikation**              | Indholdshash-baseret dedup-vindue — multi-agent sikker, forhindrer duplikerede debiteringer                             |
| 🔌 **Strategi, der kan tilsluttes router** | Udvidelig `RouterStrategy` interface — tilføj brugerdefineret routinglogik som plugins                                  |

### 🚀 Forrige v2.0.9+ — Playground, CLI Fingerprints & ACP

| Funktion                                         | Hvad det gør                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Legeplads**                           | Dashboard-side for at teste enhver model direkte — udbyder/model/slutpunktsvælgere, Monaco Editor, streaming, afbrydelse, timing                                                                                                                                                               |
| 🔏 **CLI Fingerprint Matching**                  | Bestilling af header/body pr. udbyder for at matche native CLI-signaturer — skift pr. udbyder i Indstillinger > Sikkerhed. **Din proxy-IP er bevaret**                                                                                                                                         |
| 🤝 **ACP Support (Agent Client Protocol)**       | CLI-agentopdagelse (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 mere), process spawner, `/api/acp/agents` slutpunkt                                                                                                                                                                         |
| 🤖 **ACP Agents Dashboard**                      | Fejlfinding › Agenter-side — gitter med 14 agenter med installationsstatus, version, brugerdefineret agentformular til ethvert CLI-værktøj. **OpenCode**-brugere får en "Download opencode.json"-knap, der automatisk genererer en klar-til-brug-konfiguration med alle tilgængelige modeller. |
| 🔧 **Brugerdefineret model `apiFormat` Routing** | Brugerdefinerede modeller med `apiFormat: "responses"` rutes nu korrekt til Responses API-oversætteren                                                                                                                                                                                         |
| 🏢 **Codex Workspace Isolation**                 | Flere Codex-arbejdsområder pr. e-mail — OAuth adskiller forbindelser korrekt efter arbejdsområde-id                                                                                                                                                                                            |
| 🔄 **Automatisk opdatering af elektroner**       | Desktop-app søger efter opdateringer + automatisk installation ved genstart                                                                                                                                                                                                                    |

### 🤖 Agent- og protokoloperationer (v2.0)

| Funktion                                 | What It Does                                                                                       |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 🔧 **MCP-server (16 værktøjer)**         | IDE/agent tools via 3 transports: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`) |
| 🤝 **A2A-server (JSON-RPC + SSE)**       | Agent-to-agent task execution with sync and streaming flows                                        |
| 🧭 **Konsoliderede slutpunkter-side**    | Tabbed management page with Endpoint Proxy, MCP, A2A, and API Endpoints tabs                       |
| 🎚️ **Tjenesteaktiver/deaktiver skifter** | ON/OFF switches for MCP and A2A with settings persistence (default: OFF)                           |
| 🛰️ **MCP Runtime Heartbeat**             | Real process status (pid, uptime, heartbeat age, transport, scope mode)                            |
| 📋 **MCP Audit Trail**                   | Filterable audit logs with success/failure and key attribution                                     |
| 🔐 **MCP Scope Enforcement**             | 9 granular scope permissions for controlled tool access                                            |
| 📡 **A2A Task Lifecycle Management**     | List/filter tasks, inspect events/artifacts, cancel running tasks                                  |
| 📋 **Agent Card Discovery**              | `/.well-known/agent.json` for client auto-discovery                                                |
| 🧪 **Protokol E2E testsele**             | Real MCP SDK + A2A client flows in `test:protocols:e2e`                                            |
| ⚙️ **Driftskontrol**                     | Switch combo, apply resilience profiles, reset breakers from one control surface                   |

### 🧠 Routing og intelligens

| Feature                            | What It Does                                                             |
| ---------------------------------- | ------------------------------------------------------------------------ |
| 🎯 **Smart 4-Tier Fallback**       | Auto-route: Subscription → API Key → Cheap → Free                        |
| 📊 **Real-Time Quota Tracking**    | Live token count + reset countdown per provider                          |
| 🔄 **Format Translation**          | OpenAI ↔ Claude ↔ Gemini ↔ Responses with schema-safe conversions        |
| 👥 **Multi-Account Support**       | Multiple accounts per provider with intelligent selection                |
| 🔄 **Auto Token Refresh**          | OAuth tokens refresh automatically with retry                            |
| 🎨 **Custom Combos**               | 6 balancing strategies + fallback chain control                          |
| 🌐 **Wildcard Router**             | `provider/*` dynamic routing                                             |
| 🧠 **Thinking Budget Controls**    | Passthrough, auto, custom, and adaptive reasoning limits                 |
| 🔀 **Model Aliases**               | Built-in + custom model aliasing and migration safety                    |
| ⚡ **Background Degradation**      | Route low-priority background tasks to cheaper models                    |
| 🧪 **Task-Aware Smart Routing**    | Auto-select model by content type (coding/vision/analysis/summarization) |
| 💬 **System Prompt Injection**     | Global behavior controls applied consistently                            |
| 📄 **Responses API Compatibility** | Full `/v1/responses` support for Codex and advanced agentic workflows    |

### 🎵 Multi-Modal APIs

| Funktion                 | Hvad det gør                                                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🖼️ **Billedgenerering**  | `/v1/images/generations` med cloud og lokale backends                                                                                                                                |
| 📐 **Indlejringer**      | `/v1/embeddings` til søgning og RAG-rørledninger                                                                                                                                     |
| 🎤 **Lydtransskription** | `/v1/audio/transcriptions` — 7 udbydere (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), automatisk sproggenkendelse, MP4/MP3/WAV-understøttelse |
| 🔊 **Tekst-til-tale**    | `/v1/audio/speech` — 10 udbydere (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) med korrekte fejlmeddelelser                    |
| 🎬 **Videogenerering**   | `/v1/videos/generations` (ComfyUI + SD WebUI-arbejdsgange)                                                                                                                           |
| 🎵 **Music Generation**  | `/v1/music/generations` (ComfyUI-arbejdsgange)                                                                                                                                       |
| 🛡️ **Moderationer**      | `/v1/moderations` sikkerhedstjek                                                                                                                                                     |
| 🔀 **Omrangering**       | `/v1/rerank` for relevansscoring                                                                                                                                                     |
| 🔍 **Websøgning** 🆕     | `/v1/search` — 5 udbydere (Serper, Brave, Perplexity, Exa, Tavily), 6.500+ gratis/måned, auto-failover, cache                                                                        |

### 🛡️ Resiliens, sikkerhed og styring

| Funktion                            | Hvad det gør                                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------------------------- |
| 🔌 **Maksimalafbrydere**            | Pr. model tur/restitution med tærskelkontrol                                                 |
| 🎯 **Endpoint-Aware-modeller**      | Brugerdefinerede modeller erklærer understøttede slutpunkter + API-format                    |
| 🛡️ **Anti-tordenbesætning**         | Mutex + semaforbeskyttelse ved genforsøg/rate hændelser                                      |
| 🧠 **Semantisk + signaturcache**    | Reduktion af omkostninger/latens med to cachelag                                             |
| ⚡ **Anmod om idempotens**          | Duplicate protection window                                                                  |
| 🔒 **TLS Fingerprint Spoofing**     | Browser-like TLS fingerprint — **reduces bot detection and account flagging**                |
| 🔏 **CLI Fingerprint Matching**     | Matcher native CLI-anmodningssignaturer — **reducerer forbudsrisiko, mens proxy-IP bevares** |
| 🌐 **IP-filtrering**                | Tilladelsesliste/blokeringslistekontrol for udsatte implementeringer                         |
| 📊 **Redigerbare satsgrænser**      | Konfigurerbare grænser på globalt niveau/udbyderniveau med persistens                        |
| 🔑 **API Key Management + Scoping** | Sikker nøgleudstedelse/rotation og model-/leverandørkontrol                                  |
| 🛡️ **Beskyttet `/models`**          | Valgfri godkendelse og udbyderskjul til modelkatalog                                         |

### 📊 Observerbarhed og analyse

| Funktion                           | Hvad det gør                                           |
| ---------------------------------- | ------------------------------------------------------ |
| 📝 **Forespørgsel + Proxylogning** | Fuld anmodning/svar og proxy-logning                   |
| 📋 **Unified Logs Dashboard**      | Anmodning, proxy, revision og konsolvisning på én side |
| 🔍 **Anmod om telemetri**          | p50/p95/p99 latens og anmodningssporing                |
| 🏥 **Sundhedskontrolpanel**        | Oppetid, breaker-tilstande, lockouts, cache-statistik  |
| 💰 **Omkostningssporing**          | Budgetkontrol og prisfastsættelse pr. model            |
| 📈 **Analytiske visualiseringer**  | Model-/udbyderbrugsindsigt og trendvisninger           |
| 🧪 **Evalueringsramme**            | Gyldne sæt-test med konfigurerbare matchstrategier     |

### ☁️ Implementering og platform

| Funktion                               | Hvad det gør                                                   |
| -------------------------------------- | -------------------------------------------------------------- |
| 🌐 **Deploy hvor som helst**           | Localhost, VPS, Docker, Cloud-miljøer                          |
| 💾 **Cloud Sync**                      | Synkronisering af konfiguration via cloud worker               |
| 🔄 **Sikkerhedskopiering/gendannelse** | Eksport/import og gendannelsesstrømme                          |
| 🧙 **Onboarding Wizard**               | Første kørsel guidet opsætning                                 |
| 🔧 **CLI Tools Dashboard**             | Et-klik opsætning til populære kodningsværktøjer               |
| 🎮 **Model Legeplads**                 | Test enhver udbyder/model/slutpunkt fra dashboardet            |
| 🔏 **CLI Fingerprint Toggle**          | Fingeraftryksmatchning pr. udbyder i Indstillinger > Sikkerhed |
| 🌐 **i18n (30 sprog)**                 | Fuldt dashboard + understøttelse af docs-sprog med RTL-dækning |
| 🧹 **Ryd alle modeller**               | Rydning af modelliste med ét klik i udbyderoplysninger         |
| 📋 **Udgaveskabeloner**                | Standardiserede GitHub-skabeloner til fejl og funktioner       |
| 📂 **Tilpasset datakatalog**           | `DATA_DIR` tilsidesættelse for lagerplacering                  |

### Feature Deep Dive

#### Smart fallback med praktisk omkostningskontrol

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Når kvote, sats eller sundhed svigter, flytter OmniRoute automatisk til den næste kandidat uden manuel skift.

#### Protokolstyring, der er synlig og funktionsdygtig

- MCP + A2A kan findes i brugergrænsefladen og dokumenter (ikke skjult)
- Protokolstatus API'er afslører live driftsdata (`/api/mcp/*`, `/api/a2a/*`)
- Dashboards inkluderer handlinger for dag-2 operationer (kombinationsskift, nulstilling af breaker, annullering af opgave)

#### Oversætter + valideringsarbejdsgang

Oversætterområdet omfatter:

- **Legeplads**: anmod om transformationstjek
- **Chattester**: fuld anmodning/svar tur/retur
- **Testbænk**: flere sager på én gang
- **Live Monitor**: trafikvisning i realtid

Plus protokolvalidering med rigtige klienter via `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Værktøjsreference, IDE-konfigurationer og klienteksempler
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Færdigheder, JSON-RPC-metoder, streaming og opgavelivscyklus

## 🧪 Evalueringer (evalueringer)

OmniRoute inkluderer en indbygget evalueringsramme til at teste LLM-svarkvaliteten mod et gyldent sæt. Få adgang til det via **Analytics → Evals** i dashboardet.

### Indbygget gyldent sæt

Det forudindlæste "OmniRoute Golden Set" indeholder testcases til:

- Hilsen, matematik, geografi, kodegenerering
- JSON format compliance, oversættelse, markdown generation
- Sikkerhedsafvisning (skadeligt indhold), optælling, boolsk logik

### Evalueringsstrategier

| Strategi   | Beskrivelse                                                             | Eksempel                         |
| ---------- | ----------------------------------------------------------------------- | -------------------------------- |
| `exact`    | Output skal matche nøjagtigt                                            | `"4"`                            |
| `contains` | Output skal indeholde understreng (uafhængig af store og små bogstaver) | `"Paris"`                        |
| `regex`    | Output skal matche regex-mønster                                        | `"1.*2.*3"`                      |
| `custom`   | Brugerdefineret JS-funktion returnerer sand/falsk                       | `(output) => output.length > 10` |

---

## 📖 Opsætningsvejledning

### Protokolopsætning (MCP + A2A)

<details>
<summary><b>🧩 MCP-opsætning (modelkontekstprotokol)</b></summary>

Start MCP-transport i stdio-tilstand:

```bash
omniroute --mcp
```

Anbefalet valideringsflow:

1. Tilslut din MCP-klient via stdio.
2. Kør `omniroute_get_health`.
3. Kør `omniroute_list_combos`.
4. Åbn `/dashboard/mcp` for at bekræfte hjerteslag, aktivitet og audit.

Nyttige API'er til automatisering:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A-opsætning (Agent2Agent)</b></summary>

Opdag agenten:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Send en opgave:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Administrer livscyklus:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Operationel UI:

- `/dashboard/a2a` for observerbarhed af opgave/tilstand/strøm og røghandlinger

</details>

<details>
<summary><b>🧪 End-to-end protokolvalidering</b></summary>

Valider begge protokoller med rigtige klienter:

```bash
npm run test:protocols:e2e
```

This verifies:

- MCP SDK-klient forbinde/liste/opkald
- A2A opdagelse/send/stream/hent/annuller
- Krydstjek data i MCP-audit og A2A opgavestyring API'er

</details>

<details>
<summary><b>💳 Abonnementsudbydere</b></summary>

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

**Prof tip:** Brug Opus til komplekse opgaver, Sonnet for hurtighed. OmniRoute sporer kvote pr. model!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Codex Account Limit Management (5 timer + ugentlig)

Hver Codex-konto har nu politikskift i `Dashboard -> Providers`:

- `5h` (ON/OFF): håndhæv 5-timers vinduestærskelpolitikken.
- `Weekly` (ON/OFF): håndhæv politikken for ugentlige vinduestærskelværdier.
- Tærskeladfærd: Når et aktiveret vindue når >=90 % brug, springes den konto over.
- Rotationsadfærd: OmniRoute ruter automatisk til den næste kvalificerede Codex-konto.
- Nulstil adfærd: Når udbyderens `resetAt` tid går, bliver kontoen automatisk kvalificeret igen.

Scenarier:

- `5h ON` + `Weekly ON`: konto springes over, når et af vinduerne når tærsklen.
- `5h OFF` + `Weekly ON`: kun ugentlig brug kan blokere kontoen.
- `5h ON` + `Weekly OFF`: kun 5-timers brug kan blokere kontoen.
- `resetAt` bestået: Kontoen genindtræder automatisk i rotation (ingen manuel genaktivering).

### Gemini CLI (GRATIS 180K/måned!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Bedste værdi:** Kæmpe gratis niveau! Brug dette før betalte niveauer.

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
<summary><b>🔑 API-nøgleudbydere</b></summary>

### NVIDIA NIM (GRATIS udvikleradgang — 70+ modeller)

1. Tilmeld dig: [build.nvidia.com](https://build.nvidia.com)
2. Få gratis API-nøgle (1000 slutningskreditter inkluderet)
3. Dashboard → Tilføj udbyder → NVIDIA NIM:
   - API-nøgle: `nvapi-your-key`

**Modeller:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` og mere end 50

**Prof tip:** OpenAI-kompatibel API — fungerer problemfrit med OmniRoutes formatoversættelse!

### DeepSeek

1. Tilmeld dig: [platform.deepseek.com](https://platform.deepseek.com)
2. Hent API-nøgle
3. Dashboard → Tilføj udbyder → DeepSeek

**Modeller:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (gratis niveau tilgængelig!)

1. Tilmeld dig: [console.groq.com](https://console.groq.com)
2. Få API-nøgle (gratis niveau inkluderet)
3. Dashboard → Tilføj udbyder → Groq

**Modeller:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Prof tip:** Ultrahurtig slutning — bedst til realtidskodning!

### OpenRouter (100+ modeller)

1. Tilmeld dig: [openrouter.ai](https://openrouter.ai)
2. Hent API-nøgle
3. Dashboard → Tilføj udbyder → OpenRouter

**Modeller:** Få adgang til mere end 100 modeller fra alle større udbydere via en enkelt API-nøgle.

</details>

<details>
<summary><b>💰 Billige udbydere (backup)</b></summary>

### GLM-4.7 (Daglig nulstilling, $0,6/1 mio.)

1. Tilmeld dig: [Zhipu AI](https://open.bigmodel.cn/)
2. Hent API-nøgle fra Coding Plan
3. Dashboard → Tilføj API-nøgle:
   - Udbyder: `glm`
   - API-nøgle: `your-key`

**Brug:** `glm/glm-4.7`

**Pro-tip:** Coding Plan tilbyder 3× kvote til 1/7 pris! Nulstil dagligt 10:00.

### MiniMax M2.1 (5 timers nulstilling, $0,20/1 mio.)

1. Tilmeld dig: [MiniMax](https://www.minimax.io/)
2. Hent API-nøgle
3. Dashboard → Tilføj API-nøgle

**Brug:** `minimax/MiniMax-M2.1`

**Prof tip:** Billigste mulighed for lang sammenhæng (1M tokens)!

### Kimi K2 ($9/måned lejlighed)

1. Abonner: [Moonshot AI](https://platform.moonshot.ai/)
2. Hent API-nøgle
3. Dashboard → Tilføj API-nøgle

**Brug:** `kimi/kimi-latest`

**Prof tip:** Fast $9/måned for 10M tokens = $0,90/1M effektive omkostninger!

</details>

<details>
<summary><b>🆓 GRATIS udbydere (nødbackup)</b></summary>

### iFlow (5 GRATIS modeller via OAuth)

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

### Qwen (4 GRATIS modeller via enhedskode)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude GRATIS)

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
<summary><b>🎨 Opret kombinationer</b></summary>

### Eksempel 1: Maksimer abonnement → Billig backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Eksempel 2: Kun gratis (nul omkostninger)

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
<summary><b>🔧 CLI-integration</b></summary>

### Markør IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Brug siden **CLI Tools** i dashboardet til konfiguration med et enkelt klik, eller rediger `~/.claude/settings.json` manuelt.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Mulighed 1 — Dashboard (anbefalet):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Mulighed 2 — Manuel:** Rediger `~/.openclaw/openclaw.json`:

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

> **Bemærk:** OpenClaw fungerer kun med lokale OmniRoute. Brug `127.0.0.1` i stedet for `localhost` for at undgå problemer med IPv6-opløsning.

### Cline / Fortsæt / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Trin 1:** Tilføj OmniRoute som en tilpasset udbyder:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Trin 2:** Opret/rediger `opencode.json` i dit projektrod:

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

**Trin 3:** Vælg modellen i OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tip:** Tilføj enhver model, der er tilgængelig i dit OmniRoute `/v1/models` slutpunkt til sektionen `models`. Brug formatet `provider/model-id` fra dit OmniRoute-dashboard.

</details>

---

## 🐛 Fejlfinding

<details>
<summary><b>Klik for at udvide fejlfindingsvejledning</b></summary>

**"Sprogmodellen leverede ikke beskeder"**

- Udbyderkvote opbrugt → Tjek dashboardkvotesporing
- Løsning: Brug combo fallback eller skift til et billigere niveau

**Satsbegrænsende**

- Abonnementskontingent ude → Fallback til GLM/MiniMax
- Tilføj kombination: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth-token er udløbet**

- Automatisk genopfrisket af OmniRoute
- Hvis problemerne fortsætter: Dashboard → Udbyder → Genopret forbindelse

**Høje omkostninger**

- Tjek brugsstatistik i Dashboard → Omkostninger
- Skift primær model til GLM/MiniMax
- Brug gratis niveau (Gemini CLI, iFlow) til ikke-kritiske opgaver

**Dashboard/API-porte er forkerte**

- `PORT` er den kanoniske basisport (og API-port som standard)
- `API_PORT` tilsidesætter kun OpenAI-kompatibel API-lytter
- `DASHBOARD_PORT` tilsidesætter kun dashboard/Next.js-lytter
- Indstil `NEXT_PUBLIC_BASE_URL` til dit dashboard/offentlige URL (til OAuth-tilbagekald)

**Skysynkroniseringsfejl**

- Bekræft `BASE_URL` peger på din løbeinstans
- Bekræft `CLOUD_URL` point til dit forventede cloud-endepunkt
- Hold `NEXT_PUBLIC_*` værdier på linje med værdier på serversiden

**Første login virker ikke**

- Tjek `INITIAL_PASSWORD` i `.env`
- Hvis den ikke er angivet, er reserveadgangskoden `123456`

**Ingen anmodningslogfiler**

- Indstil `ENABLE_REQUEST_LOGS=true` i `.env`

**Forbindelsestest viser "Ugyldig" for OpenAI-kompatible udbydere**

- Mange udbydere eksponerer ikke et `/models` slutpunkt
- OmniRoute v1.0.6+ inkluderer fallback-validering via chatafslutninger
- Sørg for, at basis-URL'en inkluderer suffikset `/v1`

### 🔐 OAuth på en fjernserver

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Vigtigt for brugere, der kører OmniRoute på en VPS, Docker eller enhver ekstern server**

#### Hvorfor fejler Antigravity / Gemini CLI OAuth på fjernservere?

**Antigravity** og **Gemini CLI**-udbyderne bruger **Google OAuth 2.0**. Google kræver, at `redirect_uri` i OAuth-flowet nøjagtigt matcher en af ​​de forudregistrerede URI'er i appens Google Cloud Console.

OAuth-legitimationsoplysningerne, der er bundtet i OmniRoute, er registreret **kun for `localhost`**. Når du tilgår OmniRoute på en fjernserver (f.eks. `https://omniroute.myserver.com`), afviser Google godkendelsen med:

```
Error 400: redirect_uri_mismatch
```

#### Løsning: Konfigurer dine egne OAuth-legitimationsoplysninger

Du skal oprette et **OAuth 2.0 Client ID** i Google Cloud Console med din servers URI.

#### Trin-for-trin

**1. Åbn Google Cloud Console**

Gå til: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Opret et nyt OAuth 2.0-klient-id**

- Klik på **"+ Opret legitimationsoplysninger"** → **"OAuth-klient-id"**
- Ansøgningstype: **"Webapplikation"**
- Navn: alt, hvad du kan lide (f.eks. `OmniRoute Remote`)

**3. Tilføj autoriserede omdirigerings-URI'er**

I feltet **"Autoriserede omdirigerings-URI'er"** skal du tilføje:

```
https://your-server.com/callback
```

> Erstat `your-server.com` med din servers domæne eller IP (inkluder porten, hvis det er nødvendigt, f.eks. `http://45.33.32.156:20128/callback`).

**4. Gem og kopier legitimationsoplysningerne**

Efter oprettelse vil Google vise **klient-id** og **klienthemmelighed**.

**5. Indstil miljøvariabler**

I dine `.env` (eller Docker-miljøvariabler):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Genstart OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Prøv at oprette forbindelse igen**

Dashboard → Udbydere → Antigravity (eller Gemini CLI) → OAuth

Google omdirigerer nu korrekt til `https://your-server.com/callback`.

---

#### Midlertidig løsning (uden brugerdefinerede legitimationsoplysninger)

Hvis du ikke ønsker at konfigurere dine egne legitimationsoplysninger lige nu, kan du stadig bruge det **manuelle URL-flow**:

1. OmniRoute åbner Googles autorisations-URL
2. Efter godkendelse forsøger Google at omdirigere til `localhost` (som fejler på fjernserveren)
3. **Kopiér den fulde URL** fra din browsers adresselinje (også selvom siden ikke indlæses)
4. Indsæt denne URL i feltet vist i OmniRoute-forbindelsesmodal
5. Klik på **"Forbind"**

> Dette virker, fordi autorisationskoden i URL'en er gyldig, uanset om omdirigeringssiden er indlæst.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Hvad er OAuth til at gøre Antigravity / Gemini CLI falha em servidores remotos?

Os testedores **Antigravity** og **Gemini CLI** usam **Google OAuth 2.0** for autenticação. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas no Google Cloud Console do aplicativo.

Som credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (ex: `https://omniroute.meuservidor.com`), o Google afviser en autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Løsning: Konfigurer OAuth-tilgængelighed

Você precisa criar um **OAuth 2.0 Client ID** ingen Google Cloud Console med en URI, der udfører denne service.

#### Passo a passo

**1. Adgang til Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 Client ID**

- Klik på dem **"+ Opret legitimationsoplysninger"** → **"OAuth-klient-id"**
- Tipo de aplicativo: **"Webapplikation"**
- Navn: escolha qualquer nome (eks.: `OmniRoute Remote`)

**3. Adicione som autoriseret omdirigerings-URI**

Ingen campo **"Autoriseret omdirigerings-URI'er"**, adicione:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio ou IP do seu servidor (inclua a porta se necessário, ex: `http://45.33.32.156:20128/callback`).

**4. Salve e copy as credenciais**

Após criar, o Google mostrará o **Client ID** e o **Client Secret**.

**5. Konfigurer som variáveis de ambiente**

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

Dashboard → Udbydere → Antigravity (ou Gemini CLI) → OAuth

Agora o Google redirecionará corretamente para `https://seu-servidor.com/callback` og autenticação funcionará.

---

#### Midlertidig løsning (som konfigureret tiltrods próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. O OmniRoute abrirá en URL de autorização til Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **Kopier en URL komplet** da barra de endereço do sin browser (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Klik på **"Forbind"**

> Este workaround funciona porque or código de autorização na URL é válido independente do redirect ter carregado or não.

</details>

---

</details>

## 🛠️ Tech Stack

<details>
<summary><b>Klik for at udvide tekniske stakdetaljer</b></summary>

- **Runtime**: Node.js 18-22 LTS (⚠️ Node.js 24+ er **ikke understøttet** — `better-sqlite3` native binære filer er inkompatible)
- **Sprog**: TypeScript 5.9 — **100 % TypeScript** på tværs af `src/` og `open-sse/` (nul `any` i kernemoduler siden v2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (domænetilstand + proxylogfiler + MCP-revision + routingbeslutninger)
- **Skemaer**: Zod (MCP-værktøj I/O-validering, API-kontrakter)
- **Protokoller**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: Server-sendte hændelser (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-nøgler + MCP Scoped Authorization
- **Test**: Node.js testløber + Vitest (900+ tests inklusive enhed, integration, E2E)
- **CI/CD**: GitHub-handlinger (automatisk npm-udgivelse + Docker Hub ved udgivelse)
- **Websted**: [omniroute.online](https://omniroute.online)
- **Pakke**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resiliens**: Circuit breaker, eksponentiel backoff, anti-tordenbesætning, TLS spoofing, auto-combo selvhelbredelse

</details>

---

## 📖 Dokumentation

| Dokument                                       | Beskrivelse                                                  |
| ---------------------------------------------- | ------------------------------------------------------------ |
| [User Guide](docs/USER_GUIDE.md)               | Udbydere, kombinationer, CLI-integration, implementering     |
| [API Reference](docs/API_REFERENCE.md)         | Alle endepunkter med eksempler                               |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP-værktøjer, IDE-konfigurationer, Python/TS/Go-klienter |
| [A2A Server](src/lib/a2a/README.md)            | JSON-RPC 2.0 protokol, færdigheder, streaming, opgavestyring |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6-faktor scoring, tilstandspakker, selvhelbredende           |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Almindelige problemer og løsninger                           |
| [Architecture](docs/ARCHITECTURE.md)           | Systemarkitektur og indre                                    |
| [Contributing](CONTRIBUTING.md)                | Udviklingsopsætning og retningslinjer                        |
| [OpenAPI Spec](docs/openapi.yaml)              | OpenAPI 3.0-specifikation                                    |
| [Security Policy](SECURITY.md)                 | Sårbarhedsrapportering og sikkerhedspraksis                  |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Komplet guide: VM + nginx + Cloudflare opsætning             |
| [Features Gallery](docs/FEATURES.md)           | Visuel dashboard-rundvisning med skærmbilleder               |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Pre-release valideringstrin                                  |

---

## 🗺️ Køreplan

OmniRoute har **210+ funktioner planlagt** på tværs af flere udviklingsfaser. Her er nøgleområderne:

| Kategori                         | Planlagte funktioner | Højdepunkter                                                                                               |
| -------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| 🧠 **Routing & intelligens**     | 25+                  | Routing med laveste latens, tag-baseret routing, kvote preflight, valg af P2C-konto                        |
| 🔒 **Sikkerhed og overholdelse** | 20+                  | SSRF-hærdning, tilsløring af legitimationsoplysninger, hastighedsgrænse pr. slutpunkt, styringsnøgleomfang |
| 📊 **Observabilitet**            | 15+                  | OpenTelemetry-integration, kvoteovervågning i realtid, omkostningssporing pr. model                        |
| 🔄 **Udbyderintegrationer**      | 20+                  | Dynamisk modelregistrering, udbydernedkøling, multi-konto Codex, Copilot-kvoteparsing                      |
| ⚡ **Ydeevne**                   | 15+                  | Dobbelt cachelag, promptcache, svarcache, streaming keepalive, batch API                                   |
| 🌐 **Økosystem**                 | 10+                  | WebSocket API, config hot-reload, distribueret config butik, kommerciel tilstand                           |

### 🔜 Kommer snart

- 🔗 **OpenCode-integration** — Native udbyderunderstøttelse af OpenCode AI-kodnings-IDE
- 🔗 **TRAE-integration** — Fuld understøttelse af TRAE AI-udviklingsrammen
- 📦 **Batch API** — Asynkron batchbehandling til masseanmodninger
- 🎯 **Tag-baseret Routing** — Ruteanmodninger baseret på tilpassede tags og metadata
- 💰 **Laveste omkostningsstrategi** — Vælg automatisk den billigste tilgængelige udbyder

> 📝 Fuld funktionsspecifikationer tilgængelige i [**OMNI_TOKEN_342**](docs/new-features/) (217 detaljerede specifikationer)

---

## 👥 Bidragydere

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Sådan bidrager du

1. Fork depotet
2. Opret din funktionsgren (`git checkout -b feature/amazing-feature`)
3. Bekræft dine ændringer (`git commit -m 'Add amazing feature'`)
4. Skub til grenen (`git push origin feature/amazing-feature`)
5. Åbn en pull-anmodning

Se [CONTRIBUTING.md](CONTRIBUTING.md) for detaljerede retningslinjer.

### Frigiver en ny version

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Stjernehistorie

## Stjernekiggere over tid

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Tak

Særlig tak til **[9router](https://github.com/decolua/9router)** af **[decolua](https://github.com/decolua)** - det originale projekt, der inspirerede denne gaffel. OmniRoute bygger på det utrolige fundament med yderligere funktioner, multimodale API'er og en fuld TypeScript-omskrivning.

Særlig tak til **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — den originale Go-implementering, der inspirerede denne JavaScript-port.

---

## 📄 Licens

MIT-licens - se [LICENSE](LICENSE) for detaljer.

---

<div align="center">
  <sub>Bygget med ❤️ for udviklere, der koder 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub-diskussioner aktiveret for fællesskabsspørgsmål og svar -->
