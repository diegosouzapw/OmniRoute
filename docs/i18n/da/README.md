# 🚀 OmniRoute — Den gratis AI-gateway

### Stop aldrig med at kode. Smart routing til **GRATIS og billige AI-modeller** med automatisk fallback.

_Din universelle API-proxy — ét slutpunkt, 36+ udbydere, ingen nedetid. Nu med **MCP & A2A** agentorkestrering._

**Chatafslutninger • Indlejringer • Billedgenerering • Video • Musik • Lyd • Genrangering • MCP-server • A2A-protokol • 100 % TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Licens](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Websted](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Hjemmeside](https://omniroute.online) • [🚀 Hurtig start](#-quick-start) • [💡 Funktioner](#-key-features) • [📖 Docs](#-documentation) • [💡 Priser](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Tilgængelig på:** 🇺🇸 [engelsk](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Tysk](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [engelsk](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesien](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [filippinsk](../phi/README.md)

---

## 🖼️ Hovedbetjeningspanel

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Dashboard Preview

<details>
<summary><b>Klik for at se skærmbilleder af dashboard</b></summary>

| Side              | Skærmbillede                                        |
| ----------------- | --------------------------------------------------- |
| **Udbydere**      | ![Udbydere](docs/screenshots/01-providers.png)      |
| **Komboer**       | ![Combos](docs/screenshots/02-combos.png)           |
| **Analyse**       | ![Analytics](docs/screenshots/03-analytics.png)     |
| **Sundhed**       | ![Sundhed](docs/screenshots/04-health.png)          |
| **Oversætter**    | ![Oversætter](docs/screenshots/05-translator.png)   |
| **Indstillinger** | ![Indstillinger](docs/screenshots/06-settings.png)  |
| **CLI-værktøjer** | ![CLI-værktøjer](docs/screenshots/07-cli-tools.png) |
| **Brugslogfiler** | ![Brug](docs/screenshots/08-usage.png)              |
| **Endpunkt**      | ![Endpoint](docs/screenshots/09-endpoint.png)       |

</details>

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

### 🤖 Gratis AI-udbyder til dine foretrukne kodningsagenter

_Tilslut ethvert AI-drevet IDE- eller CLI-værktøj gennem OmniRoute - gratis API-gateway til ubegrænset kodning._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/><sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20,9K</sub>
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
        <sub>⭐ 9,9K</sub>
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
          <b>Claude Kode</b>
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
          <b>Kilo-kode</b>
        </a><br/>
        <sub>⭐ 15,5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Alle agenter opretter forbindelse via <code>http://localhost:20128/v1</code> eller <code>http://cloud.omniroute.online/v1XQZPH00 og unlimited model conf. quota</sub>

---

## 🤔 Hvorfor OmniRoute?

**Stop med at spilde penge og nå grænser:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Abonnementskontingent udløber ubrugt hver måned
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Hastighedsgrænser stopper dig med midtkodning
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Dyre API'er ($20-50/måned pr. udbyder)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manuel skift mellem udbydere

**OmniRoute løser dette:**

- ✅ **Maksimer abonnementer** - Spor kvote, brug hver bit før nulstilling
- ✅ **Automatisk fallback** - Abonnement → API-nøgle → Billig → Gratis, ingen nedetid
- ✅ **Multi-konto** - Round-robin mellem konti pr. udbyder
- ✅ **Universal** - Virker med Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, ethvert CLI-værktøj

---

## 📧 Support> 💬 **Tilmeld dig vores fællesskab!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Få hjælp, del tips, og hold dig opdateret.

- **Websted**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Fællesskabsgruppe](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Bidrager**: Se [CONTRIBUTING.md](CONTRIBUTING.md), åbn en PR, eller vælg en `good first issue`
- **Originalt projekt**: [9router af decolua](https://github.com/decolua/9router)

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
<summary><b>🔌 2. "Jeg skal bruge flere udbydere, men hver har en forskellig API"</b></summary>

OpenAI bruger et format, Claude (Antropisk) bruger et andet, Gemini endnu et andet. Hvis en udvikler ønsker at teste modeller fra forskellige udbydere eller fallback mellem dem, skal de omkonfigurere SDK'er, ændre slutpunkter, håndtere inkompatible formater. Tilpassede udbydere (FriendLI, NIM) har ikke-standardmodelslutpunkter.

**Sådan løser OmniRoute det:**

- **Unified Endpoint** — En enkelt `http://localhost:20128/v1` fungerer som proxy for alle 36+ udbydere
- **Formatoversættelse** — Automatisk og gennemsigtig: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Responssanering** — Fjerner ikke-standardfelter (`x_groq`, `usage_breakdown`, `service_tier`), der bryder OpenAI SDK v1.83+
- **Rollenormalisering** — Konverterer `developer` → `system` for ikke-OpenAI-udbydere; `system` → `user` til GLM/ERNIE
- **Think Tag Extraction** — Udtrækker `<think>`-blokke fra modeller som DeepSeek R1 til standardiseret `reasoning_content`
- **Structured Output for Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatisk konvertering
- **`stream` er som standard `false`** — Justerer med OpenAI-specifikationer, og undgår uventede SSE i Python/Rust/Go SDK'er</details>

<details>
<summary><b>🌐 3. "Min AI-udbyder blokerer mit område/land"</b></summary>

Udbydere som OpenAI/Codex blokerer adgang fra visse geografiske områder. Brugere får fejl som `unsupported_country_region_territory` under OAuth- og API-forbindelser. Dette er især frustrerende for udviklere fra udviklingslande.

**Sådan løser OmniRoute det:**

- **3-Level Proxy Config** — Konfigurerbar proxy på 3 niveauer: global (al trafik), pr. udbyder (kun én udbyder) og pr. forbindelse/nøgle
- **Farvekodede proxy-badges** — Visuelle indikatorer: 🟢 global proxy, 🟡 udbyder proxy, 🔵 forbindelsesproxy, viser altid IP'en
- **OAuth-tokenudveksling gennem proxy** — OAuth-flowet går også gennem proxyen og løser `unsupported_country_region_territory`
- **Forbindelsestest via proxy** — Forbindelsestest bruger den konfigurerede proxy (ikke mere direkte omgåelse)
- **SOCKS5-understøttelse** — Fuld SOCKS5-proxy-understøttelse til udgående routing
- **TLS Fingerprint Spoofing** — Browserlignende TLS-fingeraftryk via `wreq-js` for at omgå botdetektion

</details>

<details>
<summary><b>🆓 4. "Jeg vil bruge AI til kodning, men jeg har ingen penge"</b></summary>

Ikke alle kan betale $20-200/måned for AI-abonnementer. Studerende, udviklere fra vækstlande, hobbyfolk og freelancere har brug for adgang til kvalitetsmodeller uden omkostninger.

**Sådan løser OmniRoute det:**

- **Free Tier Providers Indbygget** — Indbygget support for 100 % gratis udbydere: iFlow (8 ubegrænsede modeller), Qwen (3 ubegrænsede modeller), Kiro (Claude gratis), Gemini CLI (180K/måned gratis)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Kun gratis kombinationer** — Kæde `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/måned uden nedetid
- **NVIDIA NIM gratis kreditter** — 1000 gratis kreditter integreret
- **Cost Optimized Strategy** — Routingstrategi, der automatisk vælger den billigste tilgængelige udbyder

</details>

<details>
<summary><b>🔒 5. "Jeg skal beskytte min AI-gateway mod uautoriseret adgang" </b></summary>

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
<summary><b>🛑 6. "Min udbyder gik ned, og jeg mistede mit kodningsflow"</b></summary>AI-udbydere kan blive ustabile, returnere 5xx-fejl eller ramme midlertidige hastighedsgrænser. Hvis en udvikler afhænger af en enkelt udbyder, bliver de afbrudt. Uden strømafbrydere kan gentagne genforsøg crashe programmet.

**Sådan løser OmniRoute det:**

- **Circuit Breaker pr. udbyder** — Automatisk åbning/lukning med konfigurerbare tærskler og nedkøling (lukket/åbent/halvt åbent)
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Eksponentiel backoff** — Progressive forsinkelser af genforsøg
- **Anti-tordenbesætning** — Mutex + semaforbeskyttelse mod samtidige genforsøgsstorme
- **Combo Fallback Chains** — Hvis den primære udbyder fejler, falder den automatisk gennem kæden uden indgriben
- **Combo Circuit Breaker** - Deaktiverer automatisk fejlende udbydere i en kombinationskæde
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Health Dashboard** — Oppetidsovervågning, strømafbrydertilstande, lockouts, cachestatistik, p50/p95/p99 latency

</details>

<details>
<summary><b>🔧 7. "Konfiguration af hvert AI-værktøj er trættende og gentagende" </b></summary>

Udviklere bruger Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Hvert værktøj har brug for en anden konfiguration (API-endepunkt, nøgle, model). At omkonfigurere, når du skifter udbyder eller model, er spild af tid.

**Sådan løser OmniRoute det:**

- **CLI Tools Dashboard** — Dedikeret side med et-klik opsætning til Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Genererer `chatLanguageModels.json` til VS-kode med bulk modelvalg
- **Onboarding Wizard** — Guidet 4-trins opsætning for førstegangsbrugere
- **Ét slutpunkt, alle modeller** — Konfigurer `http://localhost:20128/v1` én gang, få adgang til 36+ udbydere

</details>

<details>
<summary><b>🔑 8. "Administration af OAuth-tokens fra flere udbydere er et helvede" </b></summary>

Claude Code, Codex, Gemini CLI, Copilot - alle bruger OAuth 2.0 med udløbende tokens. Udviklere skal re-godkende konstant, håndtere `client_secret is missing`, `redirect_uri_mismatch` og fejl på fjernservere. OAuth på LAN/VPS er særligt problematisk.

**Sådan løser OmniRoute det:**

- **Automatisk tokenopdatering** — OAuth-tokens opdateres i baggrunden før udløb
- **OAuth 2.0 (PKCE) Indbygget** — Automatisk flow for Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Flere konti pr. udbyder via JWT/ID-tokenudtrækning
- **OAuth LAN/Remote Fix** — Privat IP-detektion for `redirect_uri` + manuel URL-tilstand til fjernservere
- **OAuth Behind Nginx** — Bruger `window.location.origin` til omvendt proxykompatibilitet
- **Remote OAuth Guide** — Trin-for-trin guide til Google Cloud-legitimationsoplysninger på VPS/Docker

</details>

<details>
<summary><b>📊 9. "Jeg ved ikke, hvor meget jeg bruger eller hvor" </b></summary>

Udviklere bruger flere betalte udbydere, men har ikke noget samlet syn på udgifter. Hver udbyder har sit eget faktureringsdashboard, men der er ingen konsolideret visning. Uventede omkostninger kan hobe sig op.

**Sådan løser OmniRoute det:**

- **Dashboard for omkostningsanalyse** — omkostningssporing pr. token og budgetstyring pr. udbyder
- **Budgetgrænser pr. niveau** — Udgiftsloft pr. niveau, der udløser automatisk fallback
- **Priskonfiguration pr. model** — Konfigurerbare priser pr. model- **Brugsstatistik pr. API-nøgle** — Antal anmodninger og sidst anvendte tidsstempel pr. nøgle
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

</details>

<details>
<summary><b>🏗️ 11. "Deployering og vedligeholdelse af gatewayen er kompleks" </b></summary>

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

- **Dashboard i18n — 30 sprog** — Alle 500+ taster oversat, inklusive arabisk, bulgarsk, dansk, tysk, spansk, finsk, fransk, hebraisk, hindi, ungarsk, indonesisk, italiensk, japansk, koreansk, malaysisk, hollandsk, norsk, polsk, portugisisk (PT/BR), rumænsk, russisk, ukrainsk, kinesisk, ukrainsk, kinesisk, kinesisk, ukrainsk, kinesisk, ukrainsk, kinesisk, ukrainsk, svensk, Vietnam, Vietnam
- **RTL-understøttelse** — Højre-til-venstre-understøttelse for arabisk og hebraisk
- **Multi-Language READMEs** — 30 komplette dokumentationsoversættelser
- **Sprogvælger** — Globusikon i overskriften til skift i realtid</details>

<details>
<summary><b>🔄 13. "Jeg har brug for mere end chat — jeg har brug for indlejringer, billeder, lyd"</b></summary>

AI er ikke kun fuldførelse af chat. Udviklere skal generere billeder, transskribere lyd, oprette indlejringer til RAG, omrangere dokumenter og moderere indhold. Hver API har et andet slutpunkt og format.

**Sådan løser OmniRoute det:**

- **Indlejringer** — `/v1/embeddings` med 6 udbydere og 9+ modeller
- **Billedgenerering** — `/v1/images/generations` med 10 udbydere og 20+ modeller (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Tekst-til-video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) og SD WebUI
- **Tekst-til-musik** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Lydtransskription** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Tekst-til-tale** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + eksisterende udbydere
- **Moderationer** — `/v1/moderations` — Indholdssikkerhedstjek
- **Omrangering** — `/v1/rerank` — Omrangering af dokumentrelevans
- **Responses API** — Fuld `/v1/responses`-understøttelse af Codex

</details>

<details>
<summary><b>🧪 14. "Jeg har ingen måde at teste og sammenligne kvalitet på tværs af modeller" </b></summary>

Udviklere vil gerne vide, hvilken model der er bedst til deres brug - kode, oversættelse, ræsonnement - men manuel sammenligning er langsom. Der findes ingen integrerede evalueringsværktøjer.

**Sådan løser OmniRoute det:**

- **LLM-evalueringer** — Gyldne sæt-test med 10 forudindlæste cases, der dækker hilsner, matematik, geografi, kodegenerering, JSON-overholdelse, oversættelse, markdown, sikkerhedsafvisning
- **4 matchstrategier** — `exact`, `contains`, `regex`, `custom` (JS-funktion)
- **Translator Playground Test Bench** — Batchtest med flere input og forventede output, sammenligning på tværs af udbydere
- **Chattester** — Fuld rundtur med visuel responsgengivelse
- **Live Monitor** — Realtidsstream af alle anmodninger, der flyder gennem proxyen

</details>

<details>
<summary><b>📈 15. "Jeg har brug for at skalere uden at miste ydeevne" </b></summary>

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
<summary><b>🤖 16. "Jeg vil kontrollere modeladfærd globalt" </b></summary>Udviklere, der ønsker alle svar på et bestemt sprog, med en bestemt tone, eller ønsker at begrænse ræsonnementstokens. Det er upraktisk at konfigurere dette i hvert værktøj/anmodning.

**Sådan løser OmniRoute det:**

- **System Prompt Injection** — Global prompt anvendt på alle anmodninger
- **Thinking Budget Validation** — Reasoning token allocation control pr. anmodning (passthrough, auto, custom, adaptive)
- **6 Routing Strategies** — Globale strategier, der bestemmer, hvordan anmodninger distribueres
- **Wildcard-router** — `provider/*`-mønstre ruter dynamisk til enhver udbyder
- **Kombo Aktiver/Deaktiver Til/fra** — Skift kombinationer direkte fra dashboardet
- **Tilskiftning af udbyder** — Aktiver/deaktiver alle forbindelser for en udbyder med et enkelt klik
- **Blokerede udbydere** — Ekskluder specifikke udbydere fra `/v1/models`-fortegnelsen

</details>

<details>
<summary><b>🧰 17. "Jeg har brug for MCP-værktøjer som førsteklasses produktegenskaber" </b></summary>

Mange AI-gateways afslører kun MCP som en skjult implementeringsdetalje. Teams har brug for et synligt, overskueligt operationslag.

**Sådan løser OmniRoute det:**

- MCP vises på fanen dashboardnavigation og endepunktsprotokol
- Dedikeret MCP-administrationsside med proces, værktøjer, omfang og revision
- Indbygget hurtigstart til `omniroute --mcp` og klient onboarding

</details>

<details>
<summary><b>🧠 18. "Jeg har brug for A2A-orkestrering med synkronisering + streamopgavestier"</b></summary>

Agentarbejdsgange kræver både direkte svar og langvarig streamet udførelse med livscykluskontrol.

**Sådan løser OmniRoute det:**

- A2A JSON-RPC slutpunkt (`POST /a2a`) med `message/send` og `message/stream`
- SSE-streaming med udbredelse af terminaltilstand
- Task lifecycle API'er til `tasks/get` og `tasks/cancel`

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
<summary><b>🔐 21. "Jeg har brug for scoped MCP-tilladelser pr. integration" </b></summary>

Forskellige klienter bør have mindst privilegeret adgang til værktøjskategorier.

**Sådan løser OmniRoute det:**

- 9 granulære MCP-skoper til kontrolleret værktøjsadgang
- Håndhævelse af omfang og synlighed i MCP management UI
- Sikker standardstilling for operationelt værktøj

</details>

<details><summary><b>⚙️ 22. "Jeg har brug for operationelle kontroller uden omfordeling" </b></summary>

Teams har brug for hurtige runtime-ændringer under hændelser eller omkostningsbegivenheder.

**Sådan løser OmniRoute det:**

- Skift kombinationsaktivering direkte fra MCP-dashboard
- Anvend modstandsdygtighedsprofiler fra foruddefinerede politikpakker
- Nulstil strømafbrydertilstand fra det samme betjeningspanel

</details>

<details>
<summary><b>🔄 23. "Jeg har brug for live A2A opgave livscyklus synlighed og annullering" </b></summary>

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
<summary><b>🪪 25. "Jeg har brug for standardagentopdagelse til klienter"</b></summary>

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

- Sidebar-indgange til MCP og A2A
- Endpoint-siden Protokoller-fane med hurtig start og status
- Links fra oversigt til dedikerede ledelsesdashboards

</details>

<details>
<summary><b>🧪 27. "Jeg har brug for end-to-end protokolvalidering med rigtige klienter" </b></summary>

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
<summary><b>💼 29. "Jeg har brug for én køretid til proxy + værktøjer + agentorkestrering" </b></summary>

At køre mange separate tjenester øger driftsomkostninger og fejltilstande.

**Sådan løser OmniRoute det:**- OpenAI-kompatibel proxy, MCP-server og A2A-server i én stak

- Delt godkendelse, robusthed, datalager og observerbarhed
- Ensartet politikmodel på tværs af alle interaktionsflader

</details>

<details>
<summary><b>🚀 30. "Jeg har brug for at sende agentiske arbejdsgange uden limkodesprawl" </b></summary>

Hold mister hastighed, når de sammensætter flere ad-hoc-tjenester og scripts.

**Sådan løser OmniRoute det:**

- Ensartet slutpunktsstrategi for kunder og agenter
- Indbygget protokolstyring UI'er og røgvalideringsstier
- Produktionsklare fundamenter (sikkerhed, logning, robusthed, backup)

</details>

### Eksempler på Playbooks

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
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Hurtig start

### 1) Installer og kør

```bash
npm install -g omniroute
omniroute
```

Dashboard åbner ved `http://localhost:20128`, og API-base-URL er `http://localhost:20128/v1`.

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
2. Åbn Dashboard → `Endpoint` og opret en API-nøgle.
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

## 🖥️

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

📖 Fuld dokumentation: [`electron/README.md`](electron/README.md)

---

## 💰 Prissætning på et øjeblik

| Tier              | Udbyder           | Omkostninger                | Kvote nulstil      | Bedst til                  |
| ----------------- | ----------------- | --------------------------- | ------------------ | -------------------------- |
| **💳 ABONNEMENT** | Claude Code (Pro) | 20 USD/md.                  | 5 timer + ugentlig | Allerede abonneret         |
|                   | Codex (Plus/Pro)  | $20-200/md.                 | 5 timer + ugentlig | OpenAI-brugere             |
|                   | Gemini CLI        | **GRATIS**                  | 180K/md + 1K/dag   | Alle sammen!               |
|                   | GitHub Copilot    | $10-19/md.                  | Månedlig           | GitHub-brugere             |
| **🔑 API NØGLE**  | NVIDIA NIM        | **GRATIS** (1000 kreditter) | Engangs            | Gratis tier test           |
|                   | DeepSeek          | Betal pr. brug              | Ingen              | Bedste pris/kvalitet       |
|                   | Groq              | Gratis niveau + betalt      | Sats begrænset     | Ultrahurtig slutning       |
|                   | xAI (Grok)        | Betal pr. brug              | Ingen              | Grok modeller              |
|                   | Mistral           | Gratis niveau + betalt      | Sats begrænset     | Europæisk AI               |
|                   | OpenRouter        | Betal pr. brug              | Ingen              | 100+ modeller              |
| **💰 BILLIG**     | GLM-4.7           | 0,6 USD/1 mio.              | Dagligt 10:00      | Budget backup              |
|                   | MiniMax M2.1      | $0,2/1 mio.                 | 5-timers rullende  | Billigste mulighed         |
|                   | Kimi K2           | 9 USD/md. lejlighed         | 10M tokens/md.     | Forudsigelige omkostninger |
| **🆓 GRATIS**     | iFlow             | $0                          | Ubegrænset         | 8 modeller gratis          |
|                   | Qwen              | $0                          | Ubegrænset         | 3 modeller gratis          |
|                   | Kiro              | $0                          | Ubegrænset         | Claude gratis              |

**💡 Pro-tip:** Start med Gemini CLI (180K gratis/måned) + iFlow (ubegrænset gratis) combo = $0 omkostninger!

---

## 💡 Nøglefunktioner

OmniRoute v2.0 er bygget som en operationel platform, ikke kun en relæ-proxy.

### 🤖 Agent- og protokoloperationer (v2.0)| Funktion | Hvad det gør |

| ------------------------------------ | ---------------------------------------------------------------------------------- |
| 🔧 **MCP-server (16 værktøjer)** | IDE/agent-værktøjer kontrollerer routing, sundhed, kombinationer, grænser og operationer | IDE/agent tools via 3 transports: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`)
| 🤝 **A2A-server (JSON-RPC + SSE)** | Agent-til-agent opgaveudførelse med synkronisering og streaming flows |
| 🧭 **Consolidated Endpoints Page** | Dedikerede administrationssider (`/dashboard/mcp`, `/dashboard/a2a`) |
| 🎚️ **Service Enable/Disable Toggles** | ON/OFF switches for MCP and A2A with settings persistence (default: OFF) |
| 🛰️ **MCP Runtime Heartbeat** | Reel processtatus (pid, oppetid, hjerteslagsalder, transport, omfangstilstand) |
| 📋 **MCP Audit Trail** | Filtrerbare revisionslogfiler med succes/fejl og nøgletilskrivning |
| 🔐 **MCP Scope Enforcement** | 9 granulære omfangstilladelser til kontrolleret værktøjsadgang |
| 📡 **A2A Task Lifecycle Management** | Liste/filtrere opgaver, inspicere hændelser/artefakter, annullere kørende opgaver |
| 📋 **Agent Card Discovery** | `/.well-known/agent.json` til klientens automatiske opdagelse |
| 🧪 **Protokol E2E testsele** | Ægte MCP SDK + A2A klientstrømme i `test:protocols:e2e` |
| ⚙️ **Driftskontrol** | Switch combo, påfør elasticitetsprofiler, nulstil afbrydere fra én kontrolflade |

### 🧠 Routing og intelligens

| Funktion                            | Hvad det gør                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| 🎯 **Smart 4-lags fallback**        | Auto-rute: Abonnement → API-nøgle → Billig → Gratis                             |
| 📊 **Kvotesporing i realtid**       | Live token count + nulstil nedtælling pr. udbyder                               |
| 🔄 **Formatoversættelse**           | OpenAI ↔ Claude ↔ Gemini ↔ Svar med skemasikre konverteringer                   |
| 👥 **Multi-Account Support**        | Flere konti pr. udbyder med intelligent valg                                    |
| 🔄 **Automatisk token-opdatering**  | OAuth-tokens opdateres automatisk med genforsøg                                 |
| 🎨 **Tilpassede kombinationer**     | 6 balanceringsstrategier + fallback kædekontrol                                 |
| 🌐 **Wildcard-router**              | `provider/*` dynamisk routing                                                   |
| 🧠 **Tænker på budgetkontrol**      | Grænser for gennemstrømning, automatisk, brugerdefineret og adaptiv ræsonnement |
| 🔀 **Modelaliaser**                 | Indbygget + brugerdefineret model aliasing og migration sikkerhed               |
| ⚡ **Baggrundsforringelse**         | Send baggrundsopgaver med lav prioritet til billigere modeller                  |
| 💬 **System Prompt Injection**      | Globale adfærdskontroller anvendes konsekvent                                   |
| 📄 **Responses API-kompatibilitet** | Fuld `/v1/responses`-understøttelse af Codex og avancerede agentarbejdsgange    |

### 🎵 Multi-Modal API'er

| Funktion | Hvad det gør || -------------------------- | -------------------------------------------------------------------- |
| 🖼️ **Billedgenerering** | `/v1/images/generations` med cloud og lokale backends |
| 📐 **Indlejringer** | `/v1/embeddings` til søgning og RAG-rørledninger |
| 🎤 **Lydtransskription** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Tekst-til-tale** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) |
| 🎬 **Videogenerering** | `/v1/videos/generations` (ComfyUI + SD WebUI-arbejdsgange) |
| 🎵 **Music Generation** | `/v1/music/generations` (ComfyUI-arbejdsgange) |
| 🛡️ **Moderationer** | `/v1/moderations` sikkerhedstjek |
| 🔀 **Omrangering** | `/v1/rerank` for relevansscoring |

### 🛡️ Resiliens, sikkerhed og styring

| Funktion                            | Hvad det gør                                                                           |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| 🔌 **Maksimalafbrydere**            | Trip/recover på udbyderniveau med tærskelkontrol                                       |
| 🛡️ **Anti-tordenbesætning**         | Mutex + semaforbeskyttelse ved genforsøg/rate hændelser                                |
| 🧠 **Semantisk + signaturcache**    | Reduktion af omkostninger/latens med to cachelag                                       |
| ⚡ **Anmod om idempotens**          | Dobbelt beskyttelsesvindue                                                             |
| 🔒 **TLS Fingerprint Spoofing**     | Bedre kompatibilitet med anti-bot-filtrerede udbydere                                  |
| 🔏 **CLI Fingerprint Matching**     | Matches native CLI request signatures — **reduces ban risk while preserving proxy IP** |
| 🌐 **IP-filtrering**                | Tilladelsesliste/blokeringslistekontrol for udsatte implementeringer                   |
| 📊 **Redigerbare satsgrænser**      | Konfigurerbare grænser på globalt niveau/udbyderniveau med persistens                  |
| 🔑 **API Key Management + Scoping** | Sikker nøgleudstedelse/rotation og model-/leverandørkontrol                            |
| 🛡️ **Beskyttet `/models`**          | Valgfri godkendelse og udbyderskjul til modelkatalog                                   |

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
| -------------------------------------- | -------------------------------------------------------------- | --- | ----------------- | ------------------------------------------------ |
| 🌐 **Deploy hvor som helst**           | Localhost, VPS, Docker, Cloud-miljøer                          |     | 💾 **Cloud Sync** | Synkronisering af konfiguration via cloud worker |
| 🔄 **Sikkerhedskopiering/gendannelse** | Eksport/import og gendannelsesstrømme                          |
| 🧙 **Onboarding Wizard**               | Første kørsel guidet opsætning                                 |
| 🔧 **CLI Tools Dashboard**             | Et-klik opsætning til populære kodningsværktøjer               |
| 🌐 **i18n (30 sprog)**                 | Fuldt dashboard + understøttelse af docs-sprog med RTL-dækning |
| 📂 **Tilpasset datakatalog**           | `DATA_DIR` tilsidesættelse af lagerplacering                   |

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

<details><summary><b>🤝 A2A-opsætning (Agent2Agent)</b></summary>

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

- `/dashboard/a2a` til observerbarhed af opgave/tilstand/strøm og røghandlinger

</details>

<details>
<summary><b>🧪 End-to-end protokolvalidering</b></summary>

Valider begge protokoller med rigtige klienter:

```bash
npm run test:protocols:e2e
```

Dette verificerer:

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
<summary><b>🔑 API nøgleudbydere</b></summary>

### NVIDIA NIM (GRATIS 1000 kreditter!)

1. Tilmeld dig: [build.nvidia.com](https://build.nvidia.com)
2. Få gratis API-nøgle (1000 slutningskreditter inkluderet)
3. Dashboard → Tilføj udbyder → NVIDIA NIM:
   - API-nøgle: `nvapi-your-key`

**Modeller:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` og 50+ flere

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

### iFlow (8 GRATIS modeller)```bash

Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
if/kimi-k2-thinking
if/qwen3-coder-plus
if/glm-4.7
if/minimax-m2
if/deepseek-r1

````

### Qwen (3 GRATIS modeller)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
````

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

> **Tip:** Tilføj enhver tilgængelig model i dit OmniRoute `/v1/models`-endepunkt til `models`-sektionen. Brug formatet `provider/model-id` fra dit OmniRoute-dashboard.

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

- Bekræft, at `BASE_URL` peger på din kørende instans
- Bekræft `CLOUD_URL`-punkter til dit forventede cloud-endepunkt
- Hold `NEXT_PUBLIC_*`-værdier på linje med værdier på serversiden

**Første login virker ikke**

- Tjek `INITIAL_PASSWORD` i `.env`
- Hvis den ikke er indstillet, er reserveadgangskoden `123456`

**Ingen anmodningslogfiler**

- Indstil `ENABLE_REQUEST_LOGS=true` i `.env`

**Forbindelsestest viser "Ugyldig" for OpenAI-kompatible udbydere**

- Mange udbydere eksponerer ikke et `/models`-endepunkt
- OmniRoute v1.0.6+ inkluderer fallback-validering via chatafslutninger
- Sørg for, at basis-URL inkluderer `/v1` suffiks

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ VIGTIGT til brugere af OmniRoute med VPS/Docker/server-fjernbetjening**

#### OAuth

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

> Substitua `seu-servidor.com` pelo domínio eller IP do seu servidor (inklusive en porta se necessário, ex: `http://45.33.32.156:20128/callback`).

**4. Salve e copy as credenciais**

Após criar, o Google mostrará o **Client ID** e o **Client Secret**.

**5. Konfigurer som variáveis de ambiente**

Ingen seu `.env` (denne variáveis de ambiente do Docker):

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

Agora eller Google redirecionará corretamente para `https://seu-servidor.com/callback` og autenticação funcionará.

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

## 🛠️

<details>
<summary><b>Klik for at udvide tekniske stakdetaljer</b></summary>

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ er **ikke understøttet** — `better-sqlite3` native binære filer er inkompatible)
- **Sprog**: TypeScript 5.9 — **100 % TypeScript** på tværs af `src/` og `open-sse/` (nul `any` i kernemoduler siden v2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (domænetilstand + proxylogfiler + MCP-revision + routingbeslutninger)
- **Skemaer**: Zod (MCP-værktøj I/O-validering, API-kontrakter)
- **Protokoller**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: Server-sendte hændelser (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-nøgler + MCP Scoped Authorization
- **Test**: Node.js testløber + Vitest (900+ tests inklusive enhed, integration, E2E)- **CI/CD**: GitHub-handlinger (automatisk npm-udgivelse + Docker Hub ved udgivelse)
- **Websted**: [omniroute.online](https://omniroute.online)
- **Pakke**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resiliens**: Circuit breaker, eksponentiel backoff, anti-tordenbesætning, TLS spoofing, auto-combo selvhelbredelse

</details>

---

## 📖 Dokumentation

| Dokument                                         | Beskrivelse                                                  |
| ------------------------------------------------ | ------------------------------------------------------------ |
| [Brugervejledning](docs/USER_GUIDE.md)           | Udbydere, kombinationer, CLI-integration, implementering     |
| [API-reference](docs/API_REFERENCE.md)           | Alle endepunkter med eksempler                               |
| [MCP-server](open-sse/mcp-server/README.md)      | 16 MCP-værktøjer, IDE-konfigurationer, Python/TS/Go-klienter |
| [A2A-server](src/lib/a2a/README.md)              | JSON-RPC 2.0 protokol, færdigheder, streaming, opgavestyring |
| [Auto-kombimotor](docs/auto-combo.md)            | 6-faktor scoring, tilstandspakker, selvhelbredende           |
| [Fejlfinding](docs/TROUBLESHOOTING.md)           | Almindelige problemer og løsninger                           |
| [Arkitektur](docs/ARCHITECTURE.md)               | Systemarkitektur og indre                                    |
| [Bidrager](CONTRIBUTING.md)                      | Udviklingsopsætning og retningslinjer                        |
| [OpenAPI Spec](docs/openapi.yaml)                | OpenAPI 3.0-specifikation                                    |
| [Sikkerhedspolitik](SECURITY.md)                 | Sårbarhedsrapportering og sikkerhedspraksis                  |
| [VM-implementering](docs/VM_DEPLOYMENT_GUIDE.md) | Komplet guide: VM + nginx + Cloudflare opsætning             |
| [Feature Gallery](docs/FEATURES.md)              | Visuel dashboard-rundvisning med skærmbilleder               |
| [Udgivelsestjekliste](docs/RELEASE_CHECKLIST.md) | Pre-release valideringstrin                                  |

---

## 🗺️

OmniRoute har **210+ funktioner planlagt** på tværs af flere udviklingsfaser. Her er nøgleområderne:

| Kategori                         | Planlagte funktioner | Højdepunkter                                                                                               |
| -------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| 🧠 **Routing & intelligens**     | 25+                  | Routing med laveste latens, tag-baseret routing, kvote preflight, valg af P2C-konto                        |
| 🔒 **Sikkerhed og overholdelse** | 20+                  | SSRF-hærdning, tilsløring af legitimationsoplysninger, hastighedsgrænse pr. slutpunkt, styringsnøgleomfang |
| 📊 **Observabilitet**            | 15+                  | OpenTelemetry-integration, kvoteovervågning i realtid, omkostningssporing pr. model                        |
| 🔄 **Udbyderintegrationer**      | 20+                  | Dynamisk modelregistrering, leverandørnedkøling, multi-konto Codex, Copilot-kvoteparsing                   |
| ⚡ **Ydeevne**                   | 15+                  | Dobbelt cachelag, promptcache, svarcache, streaming keepalive, batch API                                   |
| 🌐 **Økosystem**                 | 10+                  | WebSocket API, config hot-reload, distribueret config butik, kommerciel tilstand                           |

### 🔜 Kommer snart- 🔗 **OpenCode-integration** — Native udbyderunderstøttelse af OpenCode AI-kodnings-IDE

- 🔗 **TRAE-integration** — Fuld understøttelse af TRAE AI-udviklingsrammen
- 📦 **Batch API** — Asynkron batchbehandling til masseanmodninger
- 🎯 **Tag-baseret Routing** — Ruteanmodninger baseret på tilpassede tags og metadata
- 💰 **Laveste omkostningsstrategi** — Vælg automatisk den billigste tilgængelige udbyder

> 📝 Fuld funktionsspecifikationer tilgængelige i [`docs/new-features/`](docs/new-features/) (217 detaljerede specifikationer)

---

## 👥 Bidragydere

[![Bidragydere](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

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

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Tak

Særlig tak til **[9router](https://github.com/decolua/9router)** af **[decolua](https://github.com/decolua)** — det originale projekt, der inspirerede denne gaffel. OmniRoute bygger på det utrolige fundament med yderligere funktioner, multimodale API'er og en fuld TypeScript-omskrivning.

Særlig tak til **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — den originale Go-implementering, der inspirerede denne JavaScript-port.

---

## 📄 Licens

MIT-licens - se [LICENS](LICENSE) for detaljer.

---

<div align="center">
  <sub>Bygget med ❤️ for udviklere, der koder 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub Discussions enabled for community Q&A -->
