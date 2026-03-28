# 🚀 OmniRoute — De gratis AI-gateway

### Stop nooit met coderen. Slimme routering naar **GRATIS en voordelige AI-modellen** met automatische terugval.

_Uw universele API-proxy: één eindpunt, meer dan 67 providers, geen downtime. Nu met **MCP- en A2A**-agentorkestratie._

**Chat voltooid • Insluitingen • Beeld genereren • Video • Muziek • Audio • Herrangschikking • **Webzoeken** • MCP-server • A2A-protocol • 100% TypeScript**

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

🌐 **Verkrijgbaar in:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Wat is er nieuw in v3.0.0

> **Upgraden vanaf v2.9.5?** — Zie [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) voor alle wijzigingen.

| Gebied                                   | Wijzig                                                                                                                                                                                   |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **CodeQL-beveiliging**                | Meer dan 10 CodeQL-waarschuwingen opgelost: polynomiale herhalingen, onveilige willekeur, herstel door shell-injectie                                                                    |
| ✅ **Routevalidatie**                    | Alle 176 API-routes nu gevalideerd met Zod-schema's + `validateBody()` — CI `check:route-validation:t06` passen                                                                          |
| 🐛 **omniModel-tag lekt**                | Interne `<omniModel>`-tags lekken niet langer naar clients in SSE-streamingreacties (#585)                                                                                               |
| 🔑 **Geregistreerde sleutels-API**       | API-sleutels automatisch inrichten via `POST /api/v1/registered-keys` met handhaving van quota per provider/account, idempotentie, SHA-256-opslag en optionele GitHub-probleemrapportage |
| 🎨 **Providerpictogrammen**              | 130+ providerlogo's via `@lobehub/icons` (SVG) met PNG → generieke fallback-keten                                                                                                        |
| 🔄 **Model automatische synchronisatie** | 24-uurs planner en handmatige UI-schakelaar om modellijsten te synchroniseren voor ingebouwde en aangepaste OpenAI-compatibele providers                                                 |
| 🌐 **OpenCode Zen/Go**                   | Twee nieuwe providers van @kang-heewon via PR #530: gratis niveau + abonnementsniveau via `OpencodeExecutor`                                                                             |
| 🐛 **Gemini CLI OAuth**                  | Bruikbare fout wanneer `GEMINI_OAUTH_CLIENT_SECRET` ontbreekt in Docker (was een cryptische Google-fout)                                                                                 |
| 🐛 **OpenCode-configuratie**             | `saveOpenCodeConfig()` schrijft nu correct TOML naar `XDG_CONFIG_HOME`                                                                                                                   |
| 🐛 **Vastgezette modeloverschrijving**   | `body.model` correct ingesteld op `pinnedModel` bij contextcachebeveiliging                                                                                                              |
| 🐛 **Codex/Claude-lus**                  | `tool_result` blokken nu geconverteerd naar tekst om oneindige lussen te stoppen                                                                                                         |
| 🐛 **Inlogomleiding**                    | Inloggen loopt niet langer vast na het overslaan van het instellen van het wachtwoord                                                                                                    |
| 🐛 **Windows-paden**                     | MSYS2/Git-Bash-paden (`/c/...`) automatisch genormaliseerd naar `C:\...`                                                                                                                 |

---

## 🖼️ Hoofddashboard

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Dashboardvoorbeeld

<details>
<summary><b>Klik om dashboardscreenshots te bekijken</b></summary>

| Pagina                | Schermafbeelding                                  |
| --------------------- | ------------------------------------------------- |
| **Aanbieders**        | ![Providers](docs/screenshots/01-providers.png)   |
| **Combo's**           | ![Combos](docs/screenshots/02-combos.png)         |
| **Analytics**         | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Gezondheid**        | ![Health](docs/screenshots/04-health.png)         |
| **Vertaler**          | ![Translator](docs/screenshots/05-translator.png) |
| **Instellingen**      | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI-hulpmiddelen**  | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Gebruikslogboeken** | ![Usage](docs/screenshots/08-usage.png)           |
| **Eindpunten**        | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Gratis AI-provider voor uw favoriete codeeragenten

_Verbind elke AI-aangedreven IDE- of CLI-tool via OmniRoute: gratis API-gateway voor onbeperkte codering._

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

<sub>📡 Alle agenten maken verbinding via <code>http://localhost:20128/v1</code> of <code>http://cloud.omniroute.online/v1</code> — één configuratie, onbeperkte modellen en quota</sub>

---

## 🤔 Waarom OmniRoute?

**Stop met het verspillen van geld en het bereiken van grenzen:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Het abonnementsquotum verloopt elke maand ongebruikt
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Snelheidslimieten voorkomen dat u halverwege codeert
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Dure API's ($20-50/maand per provider)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Handmatig schakelen tussen providers

**OmniRoute lost dit op:**

- ✅ **Maximaliseer abonnementen** - Houd quota bij, gebruik elk bit voordat u het opnieuw instelt
- ✅ **Automatische terugval** - Abonnement → API-sleutel → Goedkoop → Gratis, geen downtime
- ✅ **Multi-account** - Round-robin tussen accounts per provider
- ✅ **Universeel** - Werkt met Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, elke CLI-tool

---

## 📧 Ondersteuning

> 💬 **Word lid van onze community!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Krijg hulp, deel tips en blijf op de hoogte.

- **Website**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problemen**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Bijdragen**: zie [CONTRIBUTING.md](CONTRIBUTING.md), open een PR of kies een `good first issue`
- **Origineel project**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Een bug melden?

Wanneer u een probleem opent, voert u de opdracht system-info uit en voegt u het gegenereerde bestand toe:

```bash
npm run system-info
```

Dit genereert een `system-info.txt` met uw Node.js-versie, OmniRoute-versie, OS-details, geïnstalleerde CLI-tools (iflow, gemini, claude, codex, antigravity, droid, enz.), Docker/PM2-status en systeempakketten - alles wat we nodig hebben om uw probleem snel te reproduceren. Voeg het bestand rechtstreeks toe aan uw GitHub-probleem.

---

## 🔄 Hoe het werkt

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

## 🎯 Wat OmniRoute oplost — 30 echte pijnpunten en gebruiksscenario's

> **Elke ontwikkelaar die AI-tools gebruikt, wordt dagelijks met deze problemen geconfronteerd.** OmniRoute is gebouwd om ze allemaal op te lossen: van kostenoverschrijdingen tot regionale blokkades, van kapotte OAuth-stromen tot protocolbewerkingen en bedrijfsobservatie.

<details>
<summary><b>💸 1. "Ik betaal voor een duur abonnement, maar word nog steeds onderbroken door limieten"</b></summary>

Ontwikkelaars betalen $20-200/maand voor Claude Pro, Codex Pro of GitHub Copilot. Zelfs als je betaalt, heeft het quotum een ​​plafond: 5 uur gebruik, wekelijkse limieten of tarieflimieten per minuut. Halverwege de codeersessie reageert de provider niet meer en verliest de ontwikkelaar flow en productiviteit.

**Hoe OmniRoute het oplost:**

- **Smart 4-Tier Fallback** — Als het abonnementsquotum opraakt, wordt automatisch doorgestuurd naar API Key → Goedkoop → Gratis zonder handmatige tussenkomst
- **Realtime bijhouden van quota** — Toont het tokenverbruik in realtime met aftelling van de reset (5 uur, dagelijks, wekelijks)
- **Ondersteuning voor meerdere accounts** — Meerdere accounts per provider met automatische round-robin — als de ene op is, wordt er overgeschakeld naar de volgende
- **Aangepaste combo's** — Aanpasbare fallback-ketens met 6 balanceringsstrategieën (fill-first, round-robin, P2C, willekeurig, minst gebruikt, kostengeoptimaliseerd)
- **Codex Business Quota** — Quotabewaking van zakelijke/teamwerkruimte rechtstreeks in het dashboard

</details>

<details>
<summary><b>🔌 2. "Ik moet meerdere providers gebruiken, maar elke provider heeft een andere API"</b></summary>

OpenAI gebruikt het ene formaat, Claude (Anthropic) gebruikt een ander, Gemini nog een ander. Als een ontwikkelaar modellen van verschillende providers wil testen of terug wil vallen tussen deze providers, moet hij SDK's opnieuw configureren, eindpunten wijzigen en omgaan met incompatibele formaten. Aangepaste providers (FriendLI, NIM) hebben niet-standaard modeleindpunten.

**Hoe OmniRoute het oplost:**

- **Unified Endpoint** — Eén enkele `http://localhost:20128/v1` fungeert als proxy voor alle 67+ providers
- **Formatvertaling** — Automatisch en transparant: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** — Verwijdert niet-standaard velden (`x_groq`, `usage_breakdown`, `service_tier`) die de OpenAI SDK v1.83+ verbreken
- **Rolnormalisatie** — Converteert `developer` → `system` voor niet-OpenAI-providers; `system` → `user` voor GLM/ERNIE
- **Think Tag Extraction** — Extraheert `<think>` blokken uit modellen zoals DeepSeek R1 naar gestandaardiseerde `reasoning_content`
- **Gestructureerde uitvoer voor Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatische conversie
- **`stream` is standaard `false`** — Sluit aan bij de OpenAI-specificaties en vermijdt onverwachte SSE in Python/Rust/Go SDK's

</details>

<details>
<summary><b>🌐 3. "Mijn AI-provider blokkeert mijn regio/land"</b></summary>

Providers zoals OpenAI/Codex blokkeren de toegang vanuit bepaalde geografische regio's. Gebruikers krijgen fouten zoals `unsupported_country_region_territory` tijdens OAuth- en API-verbindingen. Dit is vooral frustrerend voor ontwikkelaars uit ontwikkelingslanden.

**Hoe OmniRoute het oplost:**

- **Proxyconfiguratie op 3 niveaus** — Configureerbare proxy op 3 niveaus: globaal (al het verkeer), per provider (slechts één provider) en per verbinding/sleutel
- **Kleurgecodeerde proxybadges** — Visuele indicatoren: 🟢 globale proxy, 🟡 providerproxy, 🔵verbindingsproxy, waarbij altijd het IP-adres wordt weergegeven
- **OAuth-tokenuitwisseling via proxy**: de OAuth-stroom verloopt ook via de proxy, waardoor `unsupported_country_region_territory` wordt opgelost
- **Verbindingstests via proxy** — Verbindingstests gebruiken de geconfigureerde proxy (geen directe bypass meer)
- **SOCKS5-ondersteuning** — Volledige SOCKS5-proxyondersteuning voor uitgaande routering
- **TLS Fingerprint Spoofing** — Browserachtige TLS-vingerafdruk via `wreq-js` om botdetectie te omzeilen
- **🔏 CLI Fingerprint Matching** — Herschikt headers en body-velden zodat ze overeenkomen met de oorspronkelijke binaire CLI-handtekeningen, waardoor het risico op accountmarkeringen drastisch wordt verminderd. Het proxy-IP blijft behouden: u krijgt tegelijkertijd zowel stealth** als** IP-maskering

</details>

<details>
<summary><b>🆓 4. "Ik wil AI gebruiken voor codering, maar ik heb geen geld"</b></summary>

Niet iedereen kan $ 20-200 per maand betalen voor AI-abonnementen. Studenten, ontwikkelaars uit opkomende landen, hobbyisten en freelancers hebben kosteloos toegang nodig tot kwaliteitsmodellen.

**Hoe OmniRoute het oplost:**

- **Free Tier Providers ingebouwd** — Native ondersteuning voor 100% gratis providers: iFlow (5 onbeperkte modellen via OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 onbeperkte modellen: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID gratis), Gemini CLI (180K tokens/maand gratis)
- **Ollama Cloud** — In de cloud gehoste Ollama-modellen op `api.ollama.com` met gratis laag "Licht gebruik"; gebruik het voorvoegsel `ollamacloud/<model>`
- **Alleen gratis combo's** — Chain `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/maand zonder downtime
- **NVIDIA NIM Free Access** — ~40 RPM ontwikkelaars-voor altijd gratis toegang tot meer dan 70 modellen op build.nvidia.com (overgang van credits naar pure tarieflimieten)
- **Kostengeoptimaliseerde strategie** — Routingstrategie die automatisch de goedkoopste beschikbare provider kiest

</details>

<details>
<summary><b>🔒 5. "Ik moet mijn AI-gateway beschermen tegen ongeautoriseerde toegang"</b></summary>

Bij het blootstellen van een AI-gateway aan het netwerk (LAN, VPS, Docker) kan iedereen met het adres de tokens/quota van de ontwikkelaar gebruiken. Zonder bescherming zijn API's kwetsbaar voor misbruik, snelle injectie en misbruik.

**Hoe OmniRoute het oplost:**

- **API Key Management** — Generatie, rotatie en bereik per provider met een speciale `/dashboard/api-manager` pagina
- **Machtigingen op modelniveau** — Beperk API-sleutels tot specifieke modellen (`openai/*`, jokertekenpatronen), met de schakelaar Alles toestaan/Beperken
- **API Endpoint Protection** — Vereist een sleutel voor `/v1/models` en blokkeer specifieke providers uit de lijst
- **Auth Guard + CSRF-bescherming** — Alle dashboardroutes beschermd met `withAuth` middleware + CSRF-tokens
- **Rate Limiter** — Per-IP-snelheidslimiet met configureerbare vensters
- **IP-filtering** — Toelatingslijst/blokkeerlijst voor toegangscontrole
- **Prompt Injection Guard** — Sanering tegen kwaadaardige promptpatronen
- **AES-256-GCM-codering** — Inloggegevens gecodeerd in rust

</details>

<details>
<summary><b>🛑 6. "Mijn provider is uitgevallen en ik ben mijn codeerstroom kwijtgeraakt"</b></summary>

AI-aanbieders kunnen instabiel worden, 5xx-fouten retourneren of tijdelijke tarieflimieten bereiken. Als een ontwikkelaar afhankelijk is van één enkele provider, worden deze onderbroken. Zonder stroomonderbrekers kunnen herhaalde pogingen de toepassing laten crashen.

**Hoe OmniRoute het oplost:**

- **Stroomonderbreker per model** — Automatisch openen/sluiten met configureerbare drempels en cooldown (Gesloten/Open/Half-Open), bereik per model om trapsgewijze blokkades te voorkomen
- **Exponentiële uitstel** — Progressieve vertragingen bij nieuwe pogingen
- **Anti-Thundering Herd** — Mutex + semafoorbescherming tegen gelijktijdige nieuwe stormen
- **Combo Fallback Chains** — Als de primaire provider faalt, valt deze automatisch zonder tussenkomst door de keten
- **Combo-stroomonderbreker** — Schakelt falende providers binnen een combo-keten automatisch uit
- **Gezondheidsdashboard** — Uptime-monitoring, status van stroomonderbrekers, uitsluitingen, cachestatistieken, p50/p95/p99-latentie

</details>

<details>
<summary><b>🔧 7. "Het configureren van elke AI-tool is vervelend en repetitief"</b></summary>

Ontwikkelaars gebruiken Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Elke tool heeft een andere configuratie nodig (API-eindpunt, sleutel, model). Opnieuw configureren bij het wisselen van provider of model is tijdverspilling.

**Hoe OmniRoute het oplost:**

- **CLI Tools Dashboard** — Speciale pagina met installatie met één klik voor Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Genereert `chatLanguageModels.json` voor VS-code met bulkmodelselectie
- **Onboarding Wizard** — Begeleide installatie in 4 stappen voor nieuwe gebruikers
- **Eén eindpunt, alle modellen** — Configureer `http://localhost:20128/v1` één keer, krijg toegang tot meer dan 67 providers

</details>

<details>
<summary><b>🔑 8. "Het beheren van OAuth-tokens van meerdere providers is een hel"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot: ze gebruiken allemaal OAuth 2.0 met aflopende tokens. Ontwikkelaars moeten zich voortdurend opnieuw authenticeren en omgaan met `client_secret is missing`, `redirect_uri_mismatch` en storingen op externe servers. OAuth op LAN/VPS is bijzonder problematisch.

**Hoe OmniRoute het oplost:**

- **Automatische tokenvernieuwing**: OAuth-tokens worden op de achtergrond vernieuwd voordat ze verlopen
- **OAuth 2.0 (PKCE) ingebouwd** — Automatische stroom voor Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Meerdere accounts per provider via JWT/ID-tokenextractie
- **OAuth LAN/Remote Fix** — Privé-IP-detectie voor `redirect_uri` + handmatige URL-modus voor externe servers
- **OAuth achter Nginx** — Gebruikt `window.location.origin` voor reverse proxy-compatibiliteit
- **Remote OAuth-handleiding** — Stapsgewijze handleiding voor Google Cloud-inloggegevens op VPS/Docker

</details>

<details>
<summary><b>📊 9. "Ik weet niet hoeveel ik uitgeef of waar"</b></summary>

Ontwikkelaars gebruiken meerdere betaalde providers, maar hebben geen uniform beeld van de uitgaven. Elke provider heeft zijn eigen factureringsdashboard, maar er is geen geconsolideerd overzicht. Onverwachte kosten kunnen zich opstapelen.

**Hoe OmniRoute het oplost:**

- **Cost Analytics Dashboard** — Kostenregistratie per token en budgetbeheer per provider
- **Budgetlimieten per niveau** — Uitgavenplafond per niveau dat automatische terugval activeert
- **Prijsconfiguratie per model** — Configureerbare prijzen per model
- **Gebruiksstatistieken per API-sleutel** — Verzoekaantal en laatst gebruikte tijdstempel per sleutel
- **Analytics Dashboard** — Statistiekkaarten, modelgebruiksgrafiek, providertabel met succespercentages en latentie

</details>

<details>
<summary><b>🐛 10. "Ik kan geen fouten en problemen in AI-oproepen diagnosticeren"</b></summary>

Wanneer een oproep mislukt, weet de ontwikkelaar niet of het een snelheidslimiet, een verlopen token, een verkeerd formaat of een providerfout is. Gefragmenteerde logboeken over verschillende terminals. Zonder waarneembaarheid is debuggen een kwestie van vallen en opstaan.

**Hoe OmniRoute het oplost:**

- **Unified Logs Dashboard** — 4 tabbladen: aanvraaglogboeken, proxylogboeken, auditlogboeken, console
- **Consolelogviewer** — Realtime viewer in terminalstijl met kleurgecodeerde niveaus, automatisch scrollen, zoeken, filteren
- **SQLite Proxy Logs** — Persistente logs die het opnieuw opstarten van de server overleven
- **Translator Playground** — 4 foutopsporingsmodi: Playground (formaatvertaling), Chat Tester (retour), Testbank (batch), Live Monitor (realtime)
- **Request Telemetry** — p50/p95/p99 latentie + X-Request-Id-tracering
- **Op bestanden gebaseerde logboekregistratie met rotatie** — Console-interceptor legt alles vast in JSON-logboek met op grootte gebaseerde rotatie
- **Systeeminforapport** — `npm run system-info` genereert `system-info.txt` met uw volledige omgeving (knooppuntversie, OmniRoute-versie, besturingssysteem, CLI-tools, Docker/PM2-status). Voeg het toe bij het melden van problemen, zodat u direct kunt triageen.

</details>

<details>
<summary><b>🏗️ 11. "Het implementeren en onderhouden van de gateway is complex"</b></summary>

Het installeren, configureren en onderhouden van een AI-proxy in verschillende omgevingen (lokaal, VPS, Docker, cloud) is arbeidsintensief. Problemen zoals hardgecodeerde paden, `EACCES` in mappen, poortconflicten en platformonafhankelijke builds zorgen voor extra wrijving.

**Hoe OmniRoute het oplost:**

- **npm globale installatie** — `npm install -g omniroute && omniroute` — klaar
- **Docker Multi-Platform** — AMD64 + ARM64 native (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (geen CLI-tools) en `cli` (met Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — Native app voor Windows/macOS/Linux met systeemvak, automatisch starten, offline modus
- **Split-Port-modus** — API en Dashboard op afzonderlijke poorten voor geavanceerde scenario's (reverse proxy, containernetwerken)
- **Cloud Sync** — Configureer synchronisatie tussen apparaten via Cloudflare Workers
- **DB-back-ups** — Automatische back-up, herstel, export en import van alle instellingen

</details>

<details>
<summary><b>🌍 12. "De interface is alleen Engels en mijn team spreekt geen Engels"</b></summary>

Teams in niet-Engelssprekende landen, vooral in Latijns-Amerika, Azië en Europa, worstelen met interfaces die alleen in het Engels beschikbaar zijn. Taalbarrières verminderen de adoptie en vergroten de configuratiefouten.

**Hoe OmniRoute het oplost:**

- **Dashboard i18n — 30 talen** — Alle 500+ toetsen vertaald, waaronder Arabisch, Bulgaars, Deens, Duits, Spaans, Fins, Frans, Hebreeuws, Hindi, Hongaars, Indonesisch, Italiaans, Japans, Koreaans, Maleis, Nederlands, Noors, Pools, Portugees (PT/BR), Roemeens, Russisch, Slowaaks, Zweeds, Thais, Oekraïens, Vietnamees, Chinees, Filipijns, Engels
- **RTL-ondersteuning** — Ondersteuning van rechts naar links voor Arabisch en Hebreeuws
- **Meertalige README's** — 30 volledige documentatievertalingen
- **Taalkiezer** — Wereldbolpictogram in de koptekst voor realtime schakelen

</details>

<details>
<summary><b>🔄 13. "Ik heb meer nodig dan chatten - ik heb insluitingen, afbeeldingen en audio nodig"</b></summary>

AI is niet alleen het voltooien van chats. Ontwikkelaars moeten afbeeldingen genereren, audio transcriberen, insluitingen voor RAG maken, documenten opnieuw rangschikken en inhoud modereren. Elke API heeft een ander eindpunt en formaat.

**Hoe OmniRoute het oplost:**

- **Insluitingen** — `/v1/embeddings` met 6 providers en 9+ modellen
- **Beeldgeneratie** — `/v1/images/generations` met 10 providers en 20+ modellen (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Tekst-naar-video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) en SD WebUI
- **Tekst-naar-muziek** — `/v1/music/generations` — ComfyUI (stabiele audio open, MusicGen)
- **Audiotranscriptie** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Tekst-naar-spraak** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + bestaande providers
- **Moderaties** — `/v1/moderations` — Veiligheidscontroles van inhoud
- **Herschikking** — `/v1/rerank` — Herschikking van de relevantie van documenten
- **Responses API** — Volledige `/v1/responses` ondersteuning voor Codex

</details>

<details>
<summary><b>🧪 14. "Ik heb geen manier om de kwaliteit van verschillende modellen te testen en te vergelijken"</b></summary>

Ontwikkelaars willen weten welk model het beste is voor hun gebruiksscenario (code, vertaling, redenering), maar handmatig vergelijken gaat traag. Er bestaan ​​geen geïntegreerde evaluatietools.

**Hoe OmniRoute het oplost:**

- **LLM-evaluaties** — Golden set-tests met 10 vooraf geladen cases over begroetingen, wiskunde, aardrijkskunde, codegeneratie, JSON-compliance, vertaling, prijsverlaging, veiligheidsweigering
- **4 Matchstrategieën** — `exact`, `contains`, `regex`, `custom` (JS-functie)
- **Translator Playground Test Bench** — Batchtests met meerdere inputs en verwachte outputs, vergelijking tussen providers
- **Chat Tester** — Volledige rondreis met visuele responsweergave
- **Live Monitor** — Realtime stream van alle verzoeken die door de proxy stromen

</details>

<details>
<summary><b>📈 15. "Ik moet schalen zonder prestatieverlies"</b></summary>

Naarmate het verzoekvolume groeit, genereren dezelfde vragen dubbele kosten als dezelfde vragen niet in de cache worden opgeslagen. Zonder idempotentie verspillen dubbele aanvragen de verwerking. Tarieflimieten per aanbieder moeten worden gerespecteerd.

**Hoe OmniRoute het oplost:**

- **Semantische cache** — Cache met twee lagen (handtekening + semantisch) verlaagt de kosten en de latentie
- **Request Idempotency** — 5s deduplicatievenster voor identieke verzoeken
- **Detectie van tarieflimiet** — RPM per provider, minimale tussenruimte en maximale gelijktijdige tracking
- **Bewerkbare snelheidslimieten** — Configureerbare standaardinstellingen in Instellingen → Veerkracht met doorzettingsvermogen
- **API Key Validation Cache** — 3-tier cache voor productieprestaties
- **Gezondheidsdashboard met telemetrie** — p50/p95/p99-latentie, cachestatistieken, uptime

</details>

<details>
<summary><b>🤖 16. "Ik wil het modelgedrag wereldwijd controleren"</b></summary>

Ontwikkelaars die alle antwoorden in een specifieke taal willen, met een specifieke toon, of redeneringstokens willen beperken. Het is onpraktisch om dit in elke tool/verzoek te configureren.

**Hoe OmniRoute het oplost:**

- **Systeempromptinjectie**: algemene prompt toegepast op alle verzoeken
- **Thinking Budget Validation** — Redenering van tokentoewijzingscontrole per verzoek (passthrough, automatisch, aangepast, adaptief)
- **6 Routingstrategieën** — Globale strategieën die bepalen hoe verzoeken worden gedistribueerd
- **Wildcard Router** — `provider/*` patronen routeren dynamisch naar elke provider
- **Combo in-/uitschakelen schakelen** — Schakel combo's rechtstreeks vanuit het dashboard in
- **Provider wisselen** — Schakel alle verbindingen voor een provider met één klik in/uit
- **Geblokkeerde providers**: sluit specifieke providers uit van de `/v1/models` lijst

</details>

<details>
<summary><b>🧰 17. "Ik heb MCP-tools nodig als eersteklas productmogelijkheden"</b></summary>

Veel AI-gateways stellen MCP alleen bloot als een verborgen implementatiedetail. Teams hebben een zichtbare, beheersbare operationele laag nodig.

**Hoe OmniRoute het oplost:**

- MCP verschijnt op het dashboardnavigatie- en eindpuntprotocoltabblad
- Speciale MCP-beheerpagina met proces, tools, scopes en audit
- Ingebouwde snelstart voor `omniroute --mcp` en onboarding van klanten

</details>

<details>
<summary><b>🧠 18. "Ik heb A2A-orkestratie nodig met synchronisatie- en streamtaakpaden"</b></summary>

Agentworkflows hebben zowel directe antwoorden nodig als langdurige gestreamde uitvoering met levenscycluscontrole.

**Hoe OmniRoute het oplost:**

- A2A JSON-RPC-eindpunt (`POST /a2a`) met `message/send` en `message/stream`
- SSE-streaming met voortplanting van de terminalstatus
- Taaklevenscyclus-API's voor `tasks/get` en `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Ik heb echte MCP-processtatus nodig, geen geraden status"</b></summary>

Operationele teams moeten weten of MCP daadwerkelijk leeft, en niet alleen of een API bereikbaar is.

**Hoe OmniRoute het oplost:**

- Runtime-hartslagbestand met PID, tijdstempels, transport, aantal gereedschappen en scope-modus
- MCP-status-API die hartslag + recente activiteit combineert
- UI-statuskaarten voor proces/uptime/hartslagversheid

</details>

<details>
<summary><b>📋 20. "Ik heb controleerbare MCP-tooluitvoering nodig"</b></summary>

Wanneer tools de configuratie muteren of operationele acties activeren, hebben teams forensische traceerbaarheid nodig.

**Hoe OmniRoute het oplost:**

- SQLite-ondersteunde auditregistratie voor MCP-toolaanroepen
- Filters op tool, succes/mislukking, API-sleutel en paginering
- Dashboard-audittabel + statistiekeneindpunten voor automatisering

</details>

<details>
<summary><b>🔐 21. "Ik heb MCP-machtigingen met bereik nodig per integratie"</b></summary>

Verschillende clients moeten toegang tot de toolcategorieën met de minste bevoegdheden hebben.

**Hoe OmniRoute het oplost:**

- 9 gedetailleerde MCP-scopes voor gecontroleerde toegang tot tools
- Scopehandhaving en zichtbaarheid in de MCP-beheerinterface
- Veilige standaardhouding voor operationeel gereedschap

</details>

<details>
<summary><b>⚙️ 22. "Ik heb operationele controles nodig zonder opnieuw te implementeren"</b></summary>

Teams hebben snelle runtimewijzigingen nodig tijdens incidenten of kostengebeurtenissen.

**Hoe OmniRoute het oplost:**

- Schakel combo-activering rechtstreeks vanuit het MCP-dashboard
- Pas veerkrachtprofielen toe uit vooraf gedefinieerde beleidspakketten
- Reset de status van de stroomonderbreker vanaf hetzelfde bedieningspaneel

</details>

<details>
<summary><b>🔄 23. "Ik heb live zichtbaarheid en annulering van de levenscyclus van A2A-taken nodig"</b></summary>

Zonder inzicht in de levenscyclus worden taakincidenten moeilijk te beoordelen.

**Hoe OmniRoute het oplost:**

- Takenlijst/filteren op staat/vaardigheid met paginering
- Inzoomen op taakmetagegevens, gebeurtenissen en artefacten
- Eindpunt voor het annuleren van taken en UI-actie met bevestiging

</details>

<details>
<summary><b>🌊 24. "Ik heb actieve streamstatistieken nodig voor A2A-belasting"</b></summary>

Streamingworkflows vereisen operationeel inzicht in gelijktijdigheid en liveverbindingen.

**Hoe OmniRoute het oplost:**

- Actieve streamtellers geïntegreerd in de A2A-status
- Tijdstempel van de laatste taak en tellingen per staat
- A2A-dashboardkaarten voor real-time operationele monitoring

</details>

<details>
<summary><b>🪪 25. "Ik heb standaard agentdetectie nodig voor klanten"</b></summary>

Externe klanten en orkestrators hebben machinaal leesbare metagegevens nodig voor onboarding.

**Hoe OmniRoute het oplost:**

- Agentkaart getoond op `/.well-known/agent.json`
- Mogelijkheden en vaardigheden weergegeven in de management-UI
- A2A-status-API bevat ontdekkingsmetagegevens voor automatisering

</details>

<details>
<summary><b>🧭 26. "Ik heb protocolvindbaarheid nodig in de product-UX"</b></summary>

Als gebruikers protocoloppervlakken niet kunnen ontdekken, neemt de acceptatie- en ondersteuningskwaliteit af.

**Hoe OmniRoute het oplost:**

- Geconsolideerde pagina **Eindpunten** met tabbladen voor proxy-, MCP-, A2A- en API-eindpunten
- Inline servicestatus schakelt (online/offline) voor MCP en A2A
- Links van overzicht naar speciale beheertabbladen

</details>

<details>
<summary><b>🧪 27. "Ik heb end-to-end protocolvalidatie nodig met echte clients"</b></summary>

Mock-tests zijn niet voldoende om de protocolcompatibiliteit vóór de release te valideren.

**Hoe OmniRoute het oplost:**

- E2E-suite die de app opstart en echt MCP SDK-clienttransport gebruikt
- A2A-clienttests voor het ontdekken, verzenden, streamen, ophalen en annuleren van stromen
- Controleer beweringen aan de hand van MCP-audit- en A2A-taken-API's

</details>

<details>
<summary><b>📡 28. "Ik heb uniforme observatie nodig over alle interfaces"</b></summary>

Het opsplitsen van de waarneembaarheid per protocol creëert blinde vlekken en een langere MTTR.

**Hoe OmniRoute het oplost:**

- Uniforme dashboards/logboeken/analyses in één product
- Gezondheid + audit + verzoektelemetrie over OpenAI-, MCP- en A2A-lagen
- Operationele API's voor status en automatisering

</details>

<details>
<summary><b>💼 29. "Ik heb één runtime nodig voor proxy + tools + agentorkestratie"</b></summary>

Het uitvoeren van veel afzonderlijke services verhoogt de operationele kosten en faalmodi.

**Hoe OmniRoute het oplost:**

- OpenAI-compatibele proxy, MCP-server en A2A-server in één stapel
- Gedeelde authenticatie, veerkracht, gegevensopslag en waarneembaarheid
- Consistent beleidsmodel op alle interactieoppervlakken

</details>

<details>
<summary><b>🚀 30. "Ik moet agentische workflows verzenden zonder wildgroei van lijmcodes"</b></summary>

Teams verliezen snelheid bij het samenvoegen van meerdere ad-hocservices en scripts.

**Hoe OmniRoute het oplost:**

- Uniforme eindpuntstrategie voor klanten en agenten
- Ingebouwde gebruikersinterfaces voor protocolbeheer en rookvalidatiepaden
- Productieklare fundamenten (beveiliging, loggen, veerkracht, back-up)

</details>

### Voorbeeld-playbooks (geïntegreerde gebruiksscenario's)

**Playbook A: Maximaliseer betaald abonnement + goedkope back-up**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Codeerstapel zonder kosten**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7, altijd actieve fallback-keten**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Agentoperaties met MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Begin gratis: nul configuratiekosten

> Stel AI-codering in enkele minuten in voor **$0/maand**. Verbind deze gratis accounts en gebruik de ingebouwde **Gratis Stack**-combinatie.

| Stap | Actie                                                 | Aanbieders ontgrendeld                                             |
| ---- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| 1    | Verbind **Kiro** (AWS Builder ID OAuth)               | Claude Sonnet 4.5, Haiku 4.5 — **onbeperkt**                       |
| 2    | **iFlow** (Google OAuth) verbinden                    | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1... — **onbeperkt** |
| 3    | Verbind **Qwen** (apparaatcode)                       | qwen3-coder-plus, qwen3-coder-flash... — **onbeperkt**             |
| 4    | **Gemini CLI** verbinden (Google OAuth)               | gemini-3-flash, gemini-2.5-pro — **180K/maand gratis**             |
| 5    | `/dashboard/combos` → **Gratis stapel ($0)**-sjabloon | Round-robin alle gratis aanbieders automatisch                     |

**Wijs een IDE/CLI naar:** `http://localhost:20128/v1` · API-sleutel: `any-string` · Klaar.

> **Optionele extra dekking (ook gratis):** Groq API-sleutel (30 RPM gratis), NVIDIA NIM (40 RPM gratis, 70+ modellen), Cerebras (1M tok/dag), LongCat API-sleutel (50M tokens/dag!), Cloudflare Workers AI (10K Neurons/dag, 50+ modellen).

## ⚡ Snelle start

### 1) Installeren en uitvoeren

```bash
npm install -g omniroute
omniroute
```

> **pnpm-gebruikers:** Voer `pnpm approve-builds -g` uit na de installatie om native build-scripts in te schakelen die vereist zijn door `better-sqlite3` en `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Dashboard wordt geopend op `http://localhost:20128` en de API-basis-URL is `http://localhost:20128/v1`.

| Commando                | Beschrijving                                                   |
| ----------------------- | -------------------------------------------------------------- |
| `omniroute`             | Startserver (`PORT=20128`, API en dashboard op dezelfde poort) |
| `omniroute --port 3000` | Stel de canonieke/API-poort in op 3000                         |
| `omniroute --mcp`       | MCP-server starten (stdio-transport)                           |
| `omniroute --no-open`   | Browser niet automatisch openen                                |
| `omniroute --help`      | Hulp tonen                                                     |

Optionele split-port-modus:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Verbind providers en maak uw API-sleutel aan

1. Open Dashboard → `Providers` en verbind minimaal één provider (OAuth of API-sleutel).
2. Open Dashboard → `Endpoints` en maak een API-sleutel.
3. (Optioneel) Open Dashboard → `Combos` en stel uw fallback-keten in.

### 3) Verwijs uw codeertool naar OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Werkt met Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode en OpenAI-compatibele SDK's.

### 4) Protocollen inschakelen en valideren (v2.0)

**MCP (voor gereedschapgestuurde bewerkingen):**

```bash
omniroute --mcp
```

Verbind vervolgens uw MCP-client via `stdio` en test tools zoals:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (voor agent-tot-agent-workflows):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Valideer alles end-to-end (aanbevolen)

```bash
npm run test:protocols:e2e
```

Deze suite valideert echte MCP- en A2A-clientstromen tegen een actieve app.

### Alternatief: uitvoeren vanaf de bron

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

OmniRoute is beschikbaar als openbare Docker-image op [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Snelle uitvoering:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Met omgevingsbestand:**

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

**Met behulp van Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Afbeelding               | Label    | Maat   | Beschrijving              |
| ------------------------ | -------- | ------ | ------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Nieuwste stabiele release |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB | Huidige versie            |

---

## 🖥️ Desktop-app — Offline en altijd aan

> 🆕 **NIEUW!** OmniRoute is nu beschikbaar als **native desktop-applicatie** voor Windows, macOS en Linux.

Voer OmniRoute uit als een zelfstandige desktop-app: geen terminal, geen browser, geen internet vereist voor lokale modellen. De op Electron gebaseerde app omvat:

- 🖥️ **Native Window** — Speciaal app-venster met systeemvakintegratie
- 🔄 **Autostart** — Start OmniRoute bij systeemaanmelding
- 🔔 **Native Notificaties** — Ontvang waarschuwingen voor opgebruikte quota of problemen met providers
- ⚡ **Installeren met één klik** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offlinemodus** — Werkt volledig offline met gebundelde server

### Snelle start

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Systeemvak

Wanneer geminimaliseerd, blijft OmniRoute in uw systeemvak staan met snelle acties:

- Dashboard openen
- Wijzig de serverpoort
- Sluit de applicatie af

📖 Volledige documentatie: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Prijzen in één oogopslag

| Niveau             | Aanbieder                   | Kosten                                | Quotum opnieuw instellen | Beste voor                              |
| ------------------ | --------------------------- | ------------------------------------- | ------------------------ | --------------------------------------- |
| **💳 ABONNEMENT**  | Claude Code (Pro)           | $ 20/maand                            | 5u + wekelijks           | Al geabonneerd                          |
|                    | Codex (Plus/Pro)            | $ 20-200/maand                        | 5u + wekelijks           | OpenAI-gebruikers                       |
|                    | Tweeling CLI                | **GRATIS**                            | 180K/maand + 1K/dag      | Iedereen!                               |
|                    | GitHub-copiloot             | $ 10-19/maand                         | Maandelijks              | GitHub-gebruikers                       |
| **🔑 API-SLEUTEL** | NVIDIA NIM                  | **GRATIS** (ontwikkelaar voor altijd) | ~40 tpm                  | 70+ open modellen                       |
|                    | Hersenen                    | **GRATIS** (1 miljoen tok/dag)        | 60K TPM / 30 RPM         | 's Werelds snelste                      |
|                    | Groq                        | **GRATIS** (30 toeren)                | 14,4K RPD                | Ultrasnelle lama/gemma                  |
|                    | DeepSeek V3.2               | $0,27/$1,10 per 1 miljoen             | Geen                     | Beste prijs/kwaliteit-redenering        |
|                    | xAI Grok-4 Snel             | **$0,20/$0,50 per 1M** 🆕             | Geen                     | Snelste + gereedschapsoproep, ultralaag |
|                    | xAI Grok-4 (standaard)      | $ 0,20/$ 1,50 per 1 miljoen 🆕        | Geen                     | Redenerend vlaggenschip van xAI         |
|                    | Mistral                     | Gratis proefversie + betaald          | Tarief beperkt           | Europese AI                             |
|                    | OpenRouter                  | Betalen per gebruik                   | Geen                     | 100+ modellen aggr.                     |
| **💰GOEDKOOP**     | GLM-5 (via Z.AI) 🆕         | $ 0,5/1 miljoen                       | Dagelijks 10.00 uur      | 128K-uitvoer, nieuwste vlaggenschip     |
|                    | GLM-4.7                     | $ 0,6/1 miljoen                       | Dagelijks 10.00 uur      | Budgetback-up                           |
|                    | MiniMax M2.5 🆕             | $0,3/1 miljoen invoer                 | 5-uurs rollen            | Redeneren + agenttaken                  |
|                    | MiniMax M2.1                | $ 0,2/1 miljoen                       | 5-uurs rollen            | Goedkoopste optie                       |
|                    | Kimi K2.5 (Moonshot-API) 🆕 | Betalen per gebruik                   | Geen                     | Directe Moonshot API-toegang            |
|                    | Kimi K2                     | $ 9/maand plat                        | 10 miljoen tokens/maand  | Voorspelbare kosten                     |
| **🆓 GRATIS**      | iFlow                       | **$0**                                | Onbeperkt                | 5 modellen onbeperkt                    |
|                    | Qwen                        | **$0**                                | Onbeperkt                | 4 modellen onbeperkt                    |
|                    | Kiro                        | **$0**                                | Onbeperkt                | Claude Sonnet/Haiku (AWS-bouwer)        |
|                    | LongCat Flash-Lite 🆕       | **$0** (50 miljoen tok/dag 🔥)        | 1 RPS                    | Grootste gratis quotum ter wereld       |
|                    | Bestuivingen AI 🆕          | **$0** (geen sleutel nodig)           | 1 verzoek/15s            | GPT-5, Claude, DeepSeek, Lama 4         |
|                    | Cloudflare Workers AI 🆕    | **$0** (10.000 neuronen/dag)          | ~150 resp./dag           | 50+ modellen, mondiale voorsprong       |
|                    | Scaleway-AI 🆕              | **$0** (totaal 1 miljoen tokens)      | Tarief beperkt           | EU/AVG, Qwen3 235B, Lama 70B            |

> 🆕 **Nieuwe modellen toegevoegd (maart 2026):** Grok-4 Fast-familie voor $ 0,20/$ 0,50/M (benchmarked op 1143 ms - 30% sneller dan Gemini 2.5 Flash), GLM-5 via Z.AI met 128K-uitvoer, MiniMax M2.5-redenering, DeepSeek V3.2 bijgewerkte prijzen, Kimi K2.5 via Moonshot direct API.

**💡 $0 Combo Stack — De complete gratis installatie:**

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

**Nul kosten. Stopt nooit met coderen.** Configureer dit als één OmniRoute-combo en alle fallbacks gebeuren automatisch - nooit handmatig schakelen.

---

---

## 🆓 Gratis modellen — wat u daadwerkelijk krijgt

> Alle onderstaande modellen zijn **100% gratis, zonder creditcard**. OmniRoute berekent automatisch routes tussen hen wanneer één quotum op is – combineer ze allemaal voor een onbreekbare combinatie van $ 0.

### 🔵CLAUDE-MODELLEN (via Kiro — AWS Builder ID)

| Model               | Voorvoegsel | Limiet        | Tarieflimiet                          |
| ------------------- | ----------- | ------------- | ------------------------------------- |
| `claude-sonnet-4.5` | `kr/`       | **Onbeperkt** | Geen gerapporteerde dagelijkse limiet |
| `claude-haiku-4.5`  | `kr/`       | **Onbeperkt** | Geen gerapporteerde dagelijkse limiet |
| `claude-opus-4.6`   | `kr/`       | **Onbeperkt** | Nieuwste opus via Kiro                |

### 🟢 IFLOW-MODELLEN (gratis OAuth — geen creditcard)

| Model              | Voorvoegsel | Limiet        | Tarieflimiet               |
| ------------------ | ----------- | ------------- | -------------------------- |
| `kimi-k2-thinking` | `if/`       | **Onbeperkt** | Geen gerapporteerde limiet |
| `qwen3-coder-plus` | `if/`       | **Onbeperkt** | Geen gerapporteerde limiet |
| `deepseek-r1`      | `if/`       | **Onbeperkt** | Geen gerapporteerde limiet |
| `minimax-m2.1`     | `if/`       | **Onbeperkt** | Geen gerapporteerde limiet |
| `kimi-k2`          | `if/`       | **Onbeperkt** | Geen gerapporteerde limiet |

### 🟡 QWEN-MODELLEN (apparaatcodeauthenticatie)

| Model               | Voorvoegsel | Limiet        | Tarieflimiet               |
| ------------------- | ----------- | ------------- | -------------------------- |
| `qwen3-coder-plus`  | `qw/`       | **Onbeperkt** | Geen gerapporteerde limiet |
| `qwen3-coder-flash` | `qw/`       | **Onbeperkt** | Geen gerapporteerde limiet |
| `qwen3-coder-next`  | `qw/`       | **Onbeperkt** | Geen gerapporteerde limiet |
| `vision-model`      | `qw/`       | **Onbeperkt** | Multimodaal (afbeeldingen) |

### 🟣 GEMINI CLI (Google OAuth)

| Model                    | Voorvoegsel | Limiet                       | Tarieflimiet       |
| ------------------------ | ----------- | ---------------------------- | ------------------ |
| `gemini-3-flash-preview` | `gc/`       | **180K tok/maand** + 1K/dag  | Maandelijkse reset |
| `gemini-2.5-pro`         | `gc/`       | 180K/maand (gedeeld zwembad) | Hoge kwaliteit     |

### ⚫ NVIDIA NIM (gratis API-sleutel — build.nvidia.com)

| Niveau                | Dagelijkse limiet | Tarieflimiet | Opmerkingen                                                   |
| --------------------- | ----------------- | ------------ | ------------------------------------------------------------- |
| Gratis (ontwikkelaar) | Geen tokenlimiet  | **~40 tpm**  | 70+ modellen; overgang naar zuivere tarieflimieten medio 2025 |

Populaire gratis modellen: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (gratis API-sleutel - inference.cerebras.ai)

| Niveau | Dagelijkse limiet        | Tarieflimiet     | Opmerkingen                                                    |
| ------ | ------------------------ | ---------------- | -------------------------------------------------------------- |
| Gratis | **1 miljoen tokens/dag** | 60K TPM / 30 RPM | 's Werelds snelste LLM-gevolgtrekking; wordt dagelijks gereset |

Gratis verkrijgbaar: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (gratis API-sleutel — console.groq.com)

| Niveau | Dagelijkse limiet | Tarieflimiet     | Opmerkingen                                               |
| ------ | ----------------- | ---------------- | --------------------------------------------------------- |
| Gratis | **14,4K RPD**     | 30 RPM per model | Geen creditcard; 429 op limiet, niet in rekening gebracht |

Gratis verkrijgbaar: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (gratis API-sleutel — longcat.chat) 🆕

| Model                         | Voorvoegsel | Dagelijks gratis quotum  | Opmerkingen                 |
| ----------------------------- | ----------- | ------------------------ | --------------------------- |
| `LongCat-Flash-Lite`          | `lc/`       | **50 miljoen tokens** 💥 | Grootste gratis quotum ooit |
| `LongCat-Flash-Chat`          | `lc/`       | 500K-tokens              | Chat met meerdere beurten   |
| `LongCat-Flash-Thinking`      | `lc/`       | 500K-tokens              | Redenering / CoT            |
| `LongCat-Flash-Thinking-2601` | `lc/`       | 500K-tokens              | Versie januari 2026         |
| `LongCat-Flash-Omni-2603`     | `lc/`       | 500K-tokens              | Multimodaal                 |

> 100% gratis tijdens de openbare bèta. Meld u aan op [longcat.chat](https://longcat.chat) met e-mail of telefoon. Wordt dagelijks gereset om 00:00 UTC.

### 🟢 POLLINATIONS AI (geen API-sleutel vereist) 🆕

| Model      | Voorvoegsel | Tarieflimiet  | Aanbieder achter   |
| ---------- | ----------- | ------------- | ------------------ |
| `openai`   | `pol/`      | 1 verzoek/15s | GPT-5              |
| `claude`   | `pol/`      | 1 verzoek/15s | Antropische Claude |
| `gemini`   | `pol/`      | 1 verzoek/15s | Google Tweeling    |
| `deepseek` | `pol/`      | 1 verzoek/15s | DeepSeek V3        |
| `llama`    | `pol/`      | 1 verzoek/15s | Meta Lama 4 Scout  |
| `mistral`  | `pol/`      | 1 verzoek/15s | Mistral-AI         |

> ✨ **Geen wrijving:** Geen aanmelding, geen API-sleutel. Voeg de Pollinations-provider toe met een leeg sleutelveld en het werkt meteen.

### 🟠 CLOUDFLARE WORKERS AI (gratis API-sleutel — cloudflare.com) 🆕

| Niveau | Dagelijkse neuronen | Equivalent gebruik                            | Opmerkingen                          |
| ------ | ------------------- | --------------------------------------------- | ------------------------------------ |
| Gratis | **10.000**          | ~150 LLM resp / 500s audio / 15K insluitingen | Wereldwijde voorsprong, 50+ modellen |

Populaire gratis modellen: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (gratis audio!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Vereist API-token + account-ID van [dash.cloudflare.com](https://dash.cloudflare.com). Bewaar account-ID in providerinstellingen.

### 🟣 SCALEWAY AI (1M gratis tokens — scaleway.com) 🆕

| Niveau | Gratis quotum        | Locatie       | Opmerkingen                                   |
| ------ | -------------------- | ------------- | --------------------------------------------- |
| Gratis | **1 miljoen tokens** | 🇫🇷 Parijs, EU | Binnen bepaalde grenzen geen creditcard nodig |

Gratis verkrijgbaar: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> EU/AVG-compatibel. Ontvang de API-sleutel op [console.scaleway.com](https://console.scaleway.com).

> **💡 De ultieme gratis stapel (11 providers, $ 0 voor altijd):**
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

## 🎙️ Gratis transcriptiecombinatie

> Transcribeer audio/video voor **$0** — Deepgram-leads met $200 gratis, AssemblyAI $50 fallback, Groq Whisper als onbeperkte noodback-up.

| Aanbieder           | Gratis tegoeden              | Beste model                                        | Tarieflimiet                      |
| ------------------- | ---------------------------- | -------------------------------------------------- | --------------------------------- |
| 🟢 **Deepgram**     | **$200 gratis** (aanmelding) | `nova-3` — beste nauwkeurigheid, meer dan 30 talen | Geen RPM-limiet op gratis credits |
| 🔵 **AssemblageAI** | **$ 50 gratis** (aanmelding) | `universal-3-pro` — hoofdstukken, sentiment, PII   | Geen RPM-limiet op gratis credits |
| 🔴 **Groq**         | **Voor altijd gratis**       | `whisper-large-v3` — OpenAI-fluisteren             | 30 RPM (snelheid beperkt)         |

**Voorgestelde combinatie in `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Ga vervolgens naar `/dashboard/media` → tabblad **Transcriptie**: upload een audio- of videobestand → selecteer uw combo-eindpunt → ontvang transcriptie in ondersteunde formaten.

## 💡 Belangrijkste kenmerken

OmniRoute v2.0 is gebouwd als een operationeel platform, niet alleen als een relay-proxy.

### 🆕 Nieuw — op ClawRouter geïnspireerde verbeteringen (maart 2026)

| Kenmerk                            | Wat het doet                                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Fast Familie**         | xAI-modellen voor $ 0,20/$ 0,50/M — gebenchmarkt 1143 ms (30% sneller dan Gemini 2.5 Flash)                      |
| 🧠 **GLM-5 via Z.AI**              | 128K outputcontext, $0,5/1M — nieuwste vlaggenschip uit de GLM-familie                                           |
| 🔮 **MiniMax M2.5**                | Redeneren + agenttaken voor $ 0,30/1 miljoen – aanzienlijke upgrade van M2.1                                     |
| 🎯 **toolCalling-vlag per model**  | Per model `toolCalling: true/false` in register: AutoCombo slaat modellen die niet geschikt zijn voor tools over |
| 🌍 **Meertalige intentiedetectie** | PT/ZH/ES/AR-trefwoorden in AutoCombo-scores — betere modelselectie voor niet-Engelse inhoud                      |
| 📊 **Benchmarkgestuurde terugval** | Echte p95-latentie van live-verzoeken feeds combo-scores - AutoCombo leert van feitelijke gegevens               |
| 🔁 **Ontdubbeling aanvragen**      | Op inhoud-hash gebaseerd ontdubbelingsvenster — veilig voor meerdere agenten, voorkomt dubbele kosten            |
| 🔌 **Inplugbare routerstrategie**  | Uitbreidbare `RouterStrategy` interface — voeg aangepaste routeringslogica toe als plug-ins                      |

### 🚀 Vorige v2.0.9+ — Speeltuin, CLI-vingerafdrukken en ACP

| Kenmerk                                          | Wat het doet                                                                                                                                                                                                                                                                            |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Modelspeeltuin**                            | Dashboardpagina om elk model rechtstreeks te testen: provider/model/eindpuntkiezers, Monaco Editor, streaming, afbreken, timing                                                                                                                                                         |
| 🔏 **CLI-vingerafdrukmatching**                  | Kop-/tekstvolgorde per provider zodat deze overeenkomt met de oorspronkelijke CLI-handtekeningen: schakel per provider in Instellingen > Beveiliging. **Uw proxy-IP blijft behouden**                                                                                                   |
| 🤝 **ACP-ondersteuning (Agent Client Protocol)** | CLI-agentdetectie (Codex, Claude, Goose, Gemini CLI, OpenClaw + nog 9), processpawner, `/api/acp/agents` eindpunt                                                                                                                                                                       |
| 🤖 **ACP-agentendashboard**                      | Debug › Agentenpagina — raster van 14 agenten met installatiestatus, versie en aangepast agentformulier voor elke CLI-tool. **OpenCode**-gebruikers krijgen een knop 'Opencode.json downloaden' die automatisch een gebruiksklare configuratie genereert met alle beschikbare modellen. |
| 🔧 **Aangepast model `apiFormat` Routing**       | Aangepaste modellen met `apiFormat: "responses"` routeren nu correct naar de Responses API-vertaler                                                                                                                                                                                     |
| 🏢 **Codex-werkruimte-isolatie**                 | Meerdere Codex-werkruimten per e-mail: OAuth scheidt verbindingen correct op werkruimte-ID                                                                                                                                                                                              |
| 🔄 **Elektronische automatische update**         | Desktop-app controleert op updates + automatisch installeren bij opnieuw opstarten                                                                                                                                                                                                      |

### 🤖 Agent- en protocolbewerkingen (v2.0)

| Kenmerk                                  | Wat het doet                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 🔧 **MCP-server (16 tools)**             | IDE/agent-tools via 3 transporten: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`) |
| 🤝 **A2A-server (JSON-RPC + SSE)**       | Agent-naar-agent-taakuitvoering met synchronisatie- en streamingstromen                             |
| 🧭 **Geconsolideerde eindpuntenpagina**  | Beheerpagina met tabbladen met tabbladen Endpoint Proxy, MCP, A2A en API Endpoints                  |
| 🎚️ **Service in-/uitschakelen schakelt** | AAN/UIT-schakelaars voor MCP en A2A met persistentie van de instellingen (standaard: UIT)           |
| 🛰️ **MCP Runtime-hartslag**              | Echte processtatus (pid, uptime, hartslagleeftijd, transport, scopemodus)                           |
| 📋 **MCP-audittraject**                  | Filterbare auditlogboeken met succes/mislukking en sleuteltoeschrijving                             |
| 🔐 **MCP-scopehandhaving**               | 9 gedetailleerde scope-machtigingen voor gecontroleerde toegang tot tools                           |
| 📡 **A2A Taaklevenscyclusbeheer**        | Lijst/filter taken, inspecteer gebeurtenissen/artefacten, annuleer lopende taken                    |
| 📋 **Agentenkaart ontdekken**            | `/.well-known/agent.json` voor automatische detectie van clients                                    |
| 🧪 **Protocol E2E-testharnas**           | Echte MCP SDK + A2A-clientstromen in `test:protocols:e2e`                                           |
| ⚙️ **Operationele controles**            | Wissel van combo, pas veerkrachtprofielen toe, reset onderbrekers vanaf één bedieningsoppervlak     |

### 🧠 Routing en intelligentie

| Kenmerk                                     | Wat het doet                                                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| 🎯 **Slimme terugval op 4 niveaus**         | Autoroute: Abonnement → API-sleutel → Goedkoop → Gratis                                 |
| 📊 **Realtime quota bijhouden**             | Live tokentelling + reset-aftelling per provider                                        |
| 🔄 **Formaatvertaling**                     | OpenAI ↔ Claude ↔ Gemini ↔ Reacties met schemaveilige conversies                        |
| 👥 **Ondersteuning voor meerdere accounts** | Meerdere accounts per aanbieder met intelligente selectie                               |
| 🔄 **Automatische tokenvernieuwing**        | OAuth-tokens worden automatisch vernieuwd bij nieuwe poging                             |
| 🎨 **Aangepaste combo's**                   | 6 balanceringsstrategieën + terugvalketencontrole                                       |
| 🌐 **Wildcard-router**                      | `provider/*` dynamische routering                                                       |
| 🧠 **Begrotingscontroles bedenken**         | Passthrough-, automatische, aangepaste en adaptieve redeneerlimieten                    |
| 🔀 **Modelaliassen**                        | Ingebouwde + aangepaste modelaliasing en migratieveiligheid                             |
| ⚡ **Achtergronddegradatie**                | Achtergrondtaken met lage prioriteit routeren naar goedkopere modellen                  |
| 🧪 **Taakbewuste slimme routering**         | Model automatisch selecteren op inhoudstype (codering/visie/analyse/samenvatting)       |
| 💬 **Systeempromptinjectie**                | Wereldwijde gedragscontroles consequent toegepast                                       |
| 📄 **Reacties API-compatibiliteit**         | Volledige `/v1/responses` ondersteuning voor Codex en geavanceerde agentische workflows |

### 🎵 Multimodale API's

| Kenmerk                  | Wat het doet                                                                                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Beeldgeneratie**    | `/v1/images/generations` met cloud- en lokale backends                                                                                                                             |
| 📐 **Insluitingen**      | `/v1/embeddings` voor zoek- en RAG-pijplijnen                                                                                                                                      |
| 🎤 **Audiotranscriptie** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), automatische taaldetectie, MP4/MP3/WAV-ondersteuning |
| 🔊 **Tekst-naar-spraak** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) met correcte foutmeldingen                   |
| 🎬 **Videogeneratie**    | `/v1/videos/generations` (ComfyUI + SD WebUI-workflows)                                                                                                                            |
| 🎵 **Muziekgeneratie**   | `/v1/music/generations` (ComfyUI-workflows)                                                                                                                                        |
| 🛡️ **Moderaties**        | `/v1/moderations` veiligheidscontroles                                                                                                                                             |
| 🔀 **Herschikking**      | `/v1/rerank` voor relevantiescore                                                                                                                                                  |
| 🔍 **Webzoeken** 🆕      | `/v1/search` — 5 providers (Serper, Brave, Perplexity, Exa, Tavily), 6.500+ gratis/maand, automatische failover, cache                                                             |

### 🛡️ Veerkracht, veiligheid en bestuur

| Kenmerk                                | Wat het doet                                                                                                                        |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 🔌 **Stroomonderbrekers**              | Trip/herstel per model met drempelcontroles                                                                                         |
| 🎯 **Eindpuntbewuste modellen**        | Aangepaste modellen declareren ondersteunde eindpunten + API-indeling                                                               |
| 🛡️ **Anti-donderende kudde**           | Mutex + semafoorbescherming bij nieuwe pogingen/beoordeelgebeurtenissen                                                             |
| 🧠 **Semantische + handtekeningcache** | Kosten-/latentiereductie met twee cachelagen                                                                                        |
| ⚡ **Idempotentie aanvragen**          | Dubbelbeschermingsvenster                                                                                                           |
| 🔒 **TLS-vingerafdrukspoofing**        | Browserachtige TLS-vingerafdruk — **vermindert botdetectie en accountmarkering**                                                    |
| 🔏 **CLI-vingerafdrukmatching**        | Komt overeen met de handtekeningen van native CLI-verzoeken — **vermindert het verbodsrisico terwijl het proxy-IP behouden blijft** |
| 🌐 **IP-filtering**                    | Toelatingslijst/blokkeerlijstbeheer voor blootgestelde implementaties                                                               |
| 📊 **Bewerkbare tarieflimieten**       | Configureerbare limieten op globaal/providerniveau met persistentie                                                                 |
| 🔑 **API-sleutelbeheer + Scoping**     | Veilige sleuteluitgifte/roulatie en controles op modellen/providers                                                                 |
| 🛡️ **Beschermd `/models`**             | Optionele authenticatie en providerverberging voor modelcatalogus                                                                   |

### 📊 Waarneembaarheid en analyse

| Kenmerk                           | Wat het doet                                                            |
| --------------------------------- | ----------------------------------------------------------------------- |
| 📝 **Verzoek + proxyregistratie** | Volledige aanvraag/antwoord en proxyregistratie                         |
| 📋 **Unified Logdashboard**       | Verzoek-, proxy-, audit- en consoleweergaven op één pagina              |
| 🔍 **Telemetrie aanvragen**       | p50/p95/p99-latentie en tracering van aanvragen                         |
| 🏥 **Gezondheidsdashboard**       | Uptime, status van stroomonderbrekers, uitsluitingen, cachestatistieken |
| 💰 **Kosten bijhouden**           | Budgetcontroles en prijszichtbaarheid per model                         |
| 📈 **Analytische visualisaties**  | Gebruiksinzichten in modellen/aanbieders en trendweergaven              |
| 🧪 **Evaluatiekader**             | Golden set-testen met configureerbare wedstrijdstrategieën              |

### ☁️ Implementatie en platform

| Kenmerk                           | Wat het doet                                                            |
| --------------------------------- | ----------------------------------------------------------------------- |
| 🌐 **Overal implementeren**       | Localhost, VPS, Docker, Cloudomgevingen                                 |
| 💾 **Cloudsynchronisatie**        | Configuratiesynchronisatie via cloudwerker                              |
| 🔄 **Back-up/herstellen**         | Export/import en noodherstelstromen                                     |
| 🧙 **Onboarding-wizard**          | Begeleide installatie bij eerste gebruik                                |
| 🔧 **CLI Tools-dashboard**        | Installatie met één klik voor populaire codeertools                     |
| 🎮 **Modelspeeltuin**             | Test elke provider/model/eindpunt vanaf het dashboard                   |
| 🔏 **CLI-vingerafdrukschakelaar** | Matching van vingerafdrukken per provider in Instellingen > Beveiliging |
| 🌐 **i18n (30 talen)**            | Volledig dashboard + documenttaalondersteuning met RTL-dekking          |
| 🧹 **Alle modellen wissen**       | Modellijst wissen met één klik in providergegevens                      |
| 📋 **Uitgiftesjablonen**          | Gestandaardiseerde GitHub-sjablonen voor bugs en functies               |
| 📂 **Aangepaste gegevensmap**     | `DATA_DIR` overschrijven voor opslaglocatie                             |

### Functie Diepe duik

#### Slimme terugval met praktische kostenbeheersing

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Wanneer quota, tarief of gezondheid falen, gaat OmniRoute automatisch naar de volgende kandidaat zonder handmatig te schakelen.

#### Protocolbeheer dat zichtbaar en bedienbaar is

- MCP + A2A zijn vindbaar in de gebruikersinterface en documenten (niet verborgen)
- Protocolstatus-API's geven live operationele gegevens weer (`/api/mcp/*`, `/api/a2a/*`)
- Dashboards bevatten acties voor operaties van dag 2 (combinatieschakelaars, reset van onderbrekers, annulering van taken)

#### Vertaler + validatieworkflow

Het Vertalergebied omvat:

- **Speeltuin**: transformatiecontroles aanvragen
- **Chat Tester**: volledige aanvraag/antwoordrondreis
- **Testbank**: meerdere cases in één run
- **Live Monitor**: realtime verkeersinformatie

Plus protocolvalidatie met echte clients via `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Toolreferentie, IDE-configuraties en clientvoorbeelden
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Vaardigheden, JSON-RPC-methoden, streaming en taaklevenscyclus

## 🧪 Evaluaties (Evals)

OmniRoute bevat een ingebouwd evaluatieframework om de LLM-responskwaliteit te testen aan de hand van een gouden set. U kunt deze openen via **Analytics → Evaluaties** in het dashboard.

### Ingebouwde gouden set

De vooraf geladen "OmniRoute Golden Set" bevat testcases voor:

- Groeten, wiskunde, aardrijkskunde, codegeneratie
- Naleving van JSON-formaten, vertaling, genereren van prijsverlagingen
- Veiligheidsweigering (schadelijke inhoud), tellen, booleaanse logica

### Evaluatiestrategieën

| Strategie  | Beschrijving                                                          | Voorbeeld                        |
| ---------- | --------------------------------------------------------------------- | -------------------------------- |
| `exact`    | De uitvoer moet exact overeenkomen met                                | `"4"`                            |
| `contains` | De uitvoer moet een subtekenreeks bevatten (niet hoofdlettergevoelig) | `"Paris"`                        |
| `regex`    | Uitvoer moet overeenkomen met regex-patroon                           | `"1.*2.*3"`                      |
| `custom`   | Aangepaste JS-functie retourneert waar/onwaar                         | `(output) => output.length > 10` |

---

## 📖 Installatiehandleiding

### Protocolinstelling (MCP + A2A)

<details>
<summary><b>🧩 MCP-installatie (modelcontextprotocol)</b></summary>

Start MCP-transport in stdio-modus:

```bash
omniroute --mcp
```

Aanbevolen validatiestroom:

1. Verbind uw MCP-client via stdio.
2. Voer `omniroute_get_health` uit.
3. Voer `omniroute_list_combos` uit.
4. Open `/dashboard/mcp` om hartslag, activiteit en audit te bevestigen.

Handige API's voor automatisering:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A-installatie (Agent2Agent)</b></summary>

Ontdek de makelaar:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Stuur een taak:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Levenscyclus beheren:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Operationele gebruikersinterface:

- `/dashboard/a2a` voor observatie van taken/status/streams en rookacties

</details>

<details>
<summary><b>🧪 End-to-end protocolvalidatie</b></summary>

Valideer beide protocollen met echte clients:

```bash
npm run test:protocols:e2e
```

Dit verifieert:

- MCP SDK-client verbinden/lijst/oproepen
- A2A-detectie/verzenden/streamen/ophalen/annuleren
- Controleer gegevens in MCP-audit en A2A-taakbeheer-API's

</details>

<details>
<summary><b>💳 Abonnementsaanbieders</b></summary>

### Claude-code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Pro-tip:** Gebruik Opus voor complexe taken, Sonnet voor snelheid. OmniRoute houdt quota bij per model!

### OpenAI-codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Beheer van Codex-accountlimieten (5 uur + wekelijks)

Elk Codex-account heeft nu beleidsschakelaars in `Dashboard -> Providers`:

- `5h` (AAN/UIT): het drempelbeleid voor een periode van 5 uur afdwingen.
- `Weekly` (AAN/UIT): dwing het wekelijkse vensterdrempelbeleid af.
- Drempelgedrag: wanneer een ingeschakeld venster >=90% gebruik bereikt, wordt dat account overgeslagen.
- Rotatiegedrag: OmniRoute routeert automatisch naar het volgende in aanmerking komende Codex-account.
- Resetgedrag: wanneer de provider `resetAt` tijd verstrijkt, komt het account automatisch weer in aanmerking.

Scenario's:

- `5h ON` + `Weekly ON`: account wordt overgeslagen wanneer een van beide vensters de drempel bereikt.
- `5h OFF` + `Weekly ON`: alleen wekelijks gebruik kan het account blokkeren.
- `5h ON` + `Weekly OFF`: slechts 5 uur gebruik kan het account blokkeren.
- `resetAt` geslaagd: account wordt automatisch opnieuw gerouleerd (niet handmatig opnieuw inschakelen).

### Gemini CLI (GRATIS 180K/maand!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Beste waarde:** Enorm gratis niveau! Gebruik dit vóór betaalde niveaus.

### GitHub-copiloot

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
<summary><b>🔑 API-sleutelproviders</b></summary>

### NVIDIA NIM (GRATIS toegang voor ontwikkelaars - 70+ modellen)

1. Aanmelden: [build.nvidia.com](https://build.nvidia.com)
2. Ontvang een gratis API-sleutel (inclusief 1000 inferentiecredits)
3. Dashboard → Provider toevoegen → NVIDIA NIM:
   - API-sleutel: `nvapi-your-key`

**Modellen:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` en nog meer dan 50

**Pro-tip:** OpenAI-compatibele API — werkt naadloos samen met de formaatvertaling van OmniRoute!

### Diepzoeken

1. Aanmelden: [platform.deepseek.com](https://platform.deepseek.com)
2. Haal de API-sleutel op
3. Dashboard → Provider toevoegen → DeepSeek

**Modellen:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (gratis niveau beschikbaar!)

1. Aanmelden: [console.groq.com](https://console.groq.com)
2. Ontvang een API-sleutel (inclusief gratis laag)
3. Dashboard → Provider toevoegen → Groq

**Modellen:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Pro-tip:** Ultrasnelle gevolgtrekking — het beste voor realtime coderen!

### OpenRouter (meer dan 100 modellen)

1. Aanmelden: [openrouter.ai](https://openrouter.ai)
2. Haal de API-sleutel op
3. Dashboard → Provider toevoegen → OpenRouter

**Modellen:** Krijg toegang tot meer dan 100 modellen van alle grote providers via één enkele API-sleutel.

</details>

<details>
<summary><b>💰 Goedkope providers (back-up)</b></summary>

### GLM-4.7 (dagelijkse reset, $0,6/1 miljoen)

1. Aanmelden: [Zhipu AI](https://open.bigmodel.cn/)
2. Haal de API-sleutel op uit het Coderingsplan
3. Dashboard → API-sleutel toevoegen:
   - Aanbieder: `glm`
   - API-sleutel: `your-key`

**Gebruik:** `glm/glm-4.7`

**Pro-tip:** Coderingsplan biedt 3× quotum tegen 1/7 kosten! Dagelijks resetten om 10:00 uur.

### MiniMax M2.1 (5 uur resetten, $0,20/1M)

1. Aanmelden: [MiniMax](https://www.minimax.io/)
2. Haal de API-sleutel op
3. Dashboard → API-sleutel toevoegen

**Gebruik:** `minimax/MiniMax-M2.1`

**Pro-tip:** Goedkoopste optie voor lange context (1 miljoen tokens)!

### Kimi K2 ($9/maand vast)

1. Abonneer je: [Moonshot AI](https://platform.moonshot.ai/)
2. Haal de API-sleutel op
3. Dashboard → API-sleutel toevoegen

**Gebruik:** `kimi/kimi-latest`

**Pro-tip:** Vaste $ 9/maand voor 10 miljoen tokens = $ 0,90/1 miljoen effectieve kosten!

</details>

<details>
<summary><b>🆓 GRATIS providers (noodback-up)</b></summary>

### iFlow (5 GRATIS modellen via OAuth)

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

### Qwen (4 GRATIS modellen via apparaatcode)

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
<summary><b>🎨 Combo's maken</b></summary>

### Voorbeeld 1: Maximaliseer abonnement → Goedkope back-up

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Voorbeeld 2: Alleen gratis (geen kosten)

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
<summary><b>🔧 CLI-integratie</b></summary>

### Cursor-IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude-code

Gebruik de pagina **CLI Tools** in het dashboard voor configuratie met één klik, of bewerk `~/.claude/settings.json` handmatig.

### Codex-CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### Open Klauw

**Optie 1 — Dashboard (aanbevolen):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Optie 2 — Handmatig:** Bewerk `~/.openclaw/openclaw.json`:

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

> **Opmerking:** OpenClaw werkt alleen met lokale OmniRoute. Gebruik `127.0.0.1` in plaats van `localhost` om IPv6-resolutieproblemen te voorkomen.

### Cline / Doorgaan / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Stap 1:** Voeg OmniRoute toe als aangepaste provider:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Stap 2:** Maak/bewerk `opencode.json` in de hoofdmap van uw project:

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

**Stap 3:** Selecteer het model in OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tip:** Voeg elk model dat beschikbaar is in uw OmniRoute `/v1/models` eindpunt toe aan de sectie `models`. Gebruik het formaat `provider/model-id` van uw OmniRoute-dashboard.

</details>

---

## 🐛 Problemen oplossen

<details>
<summary><b>Klik om de probleemoplossingsgids uit te vouwen</b></summary>

**"Taalmodel heeft geen berichten verstrekt"**

- Providerquotum opgebruikt → Controleer dashboardquotumtracker
- Oplossing: gebruik combo-fallback of schakel over naar een goedkoper niveau

**Snelheidslimiet**

- Abonnementquotum op → Terugval op GLM/MiniMax
- Combinatie toevoegen: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth-token verlopen**

- Automatisch vernieuwd door OmniRoute
- Als de problemen aanhouden: Dashboard → Provider → Opnieuw verbinding maken

**Hoge kosten**

- Controleer gebruiksstatistieken in Dashboard → Kosten
- Schakel het primaire model over naar GLM/MiniMax
- Gebruik de gratis laag (Gemini CLI, iFlow) voor niet-kritieke taken

**Dashboard-/API-poorten zijn verkeerd**

- `PORT` is de canonieke basispoort (en standaard de API-poort)
- `API_PORT` overschrijft alleen de OpenAI-compatibele API-listener
- `DASHBOARD_PORT` overschrijft alleen dashboard/Next.js-listener
- Stel `NEXT_PUBLIC_BASE_URL` in op uw dashboard/openbare URL (voor OAuth-callbacks)

**Cloudsynchronisatiefouten**

- Controleer of `BASE_URL` verwijst naar uw actieve exemplaar
- Controleer of `CLOUD_URL` verwijst naar uw verwachte cloudeindpunt
- Houd `NEXT_PUBLIC_*` waarden afgestemd op de waarden op de server

**Eerste login werkt niet**

- Controleer `INITIAL_PASSWORD` in `.env`
- Indien niet ingesteld, is het reservewachtwoord `123456`

**Geen verzoeklogboeken**

- Stel `ENABLE_REQUEST_LOGS=true` in in `.env`

**Verbindingstest toont "Ongeldig" voor OpenAI-compatibele providers**

- Veel providers stellen geen `/models` eindpunt beschikbaar
- OmniRoute v1.0.6+ omvat fallback-validatie via chat-voltooiingen
- Zorg ervoor dat de basis-URL het achtervoegsel `/v1` bevat

### 🔐 OAuth op een externe server

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Belangrijk voor gebruikers die OmniRoute gebruiken op een VPS, Docker of een externe server**

#### Waarom mislukt Antigravity / Gemini CLI OAuth op externe servers?

De providers **Antigravity** en **Gemini CLI** gebruiken **Google OAuth 2.0**. Google vereist dat de `redirect_uri` in de OAuth-stroom exact overeenkomt met een van de vooraf geregistreerde URI's in de Google Cloud Console van de app.

De OAuth-inloggegevens die in OmniRoute zijn gebundeld, zijn **alleen voor `localhost`** geregistreerd. Wanneer u OmniRoute opent op een externe server (bijvoorbeeld `https://omniroute.myserver.com`), weigert Google de authenticatie met:

```
Error 400: redirect_uri_mismatch
```

#### Oplossing: Configureer uw eigen OAuth-inloggegevens

U moet een **OAuth 2.0 Client ID** maken in Google Cloud Console met de URI van uw server.

#### Stap voor stap

**1. Open de Google Cloud Console**

Ga naar: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Maak een nieuwe OAuth 2.0-client-ID**

- Klik op **"+ Credentials aanmaken"** → **"OAuth-client-ID"**
- Applicatietype: **"Webapplicatie"**
- Naam: wat je maar wilt (bijvoorbeeld `OmniRoute Remote`)

**3. Geautoriseerde omleidings-URI's toevoegen**

Voeg in het veld **"Geautoriseerde omleidings-URI's"** het volgende toe:

```
https://your-server.com/callback
```

> Vervang `your-server.com` door het domein of IP-adres van uw server (voeg indien nodig de poort toe, bijvoorbeeld `http://45.33.32.156:20128/callback`).

**4. Bewaar en kopieer de inloggegevens**

Na het maken toont Google de **Client-ID** en **Clientgeheim**.

**5. Omgevingsvariabelen instellen**

In uw `.env` (of Docker-omgevingsvariabelen):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Start OmniRoute opnieuw**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Probeer opnieuw verbinding te maken**

Dashboard → Providers → Antigravity (of Gemini CLI) → OAuth

Google zal nu correct doorverwijzen naar `https://your-server.com/callback`.

---

#### Tijdelijke oplossing (zonder aangepaste inloggegevens)

Als u nu niet uw eigen inloggegevens wilt instellen, kunt u nog steeds de **handmatige URL-stroom** gebruiken:

1. OmniRoute opent de Google-autorisatie-URL
2. Na autorisatie probeert Google om te leiden naar `localhost` (wat mislukt op de externe server)
3. **Kopieer de volledige URL** uit de adresbalk van uw browser (zelfs als de pagina niet wordt geladen)
4. Plak die URL in het veld dat wordt weergegeven in het OmniRoute-verbindingsmodel
5. Klik op **"Verbinden"**

> Dit werkt omdat de autorisatiecode in de URL geldig is, ongeacht of de omleidingspagina is geladen.

---

<details>
<summary><b>🇧🇷 Versão in Português</b></summary>

#### Waarom werkt OAuth met Antigravity / Gemini CLI op externe servers?

Deze bewijzen **Antigravity** en **Gemini CLI** gebruiken **Google OAuth 2.0** voor authenticatie. O Google vraagt ​​dat `redirect_uri` geen OAuth-stroom gebruikt **exatamente** een van de URI's vóór de kadaster zonder toepassing van Google Cloud Console.

Omdat OAuth geen OmniRoute heeft geregistreerd, is dit **apenas para `localhost`**. Wanneer u OmniRoute op een externe server opent (bijvoorbeeld: `https://omniroute.meuservidor.com`), of Google een authenticatie aanvraagt:

```
Error 400: redirect_uri_mismatch
```

#### Oplossing: Configureer uw eigen OAuth-credenciais

U kunt precies zien hoe **OAuth 2.0 Client ID** geen Google Cloud Console heeft met een URI van zijn server.

#### Passo een passo

**1. Toegang tot Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Nieuwe OAuth 2.0 client-ID**

- Klik op **"+ Credentials aanmaken"** → **"OAuth-client-ID"**
- Applicatietip: **"Webapplicatie"**
- Nome: escolha qualquer nome (bijvoorbeeld: `OmniRoute Remote`)

**3. Adicione als geautoriseerde omleidings-URI's**

Geen campagne **"Geautoriseerde omleidings-URI's"**, aanbevolen:

```
https://seu-servidor.com/callback
```

> Vervang `seu-servidor.com` door de domicilie of het IP-adres van uw server (inclusief een noodzakelijke poort, bijvoorbeeld: `http://45.33.32.156:20128/callback`).

**4. Bewaar en kopieer als credenciais**

U kunt ook op Google klikken op **Client-ID** en **Clientgeheim**.

**5. Configureer als variáveis de ambiente**

Geen `.env` (of de verschillende omgevingen van Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie van OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Nieuwe verbinding**

Dashboard → Providers → Antigravity (ou Gemini CLI) → OAuth

Nadat Google de juiste verwijzing naar `https://seu-servidor.com/callback` heeft gemaakt, is deze autenticaal functioneel.

---

#### Tijdelijke tijdelijke oplossing (zoals de juiste referentie configureren)

Als u geen geloofwaardige geloofwaardigheid meer heeft, is het mogelijk om de stroom **handleiding van de URL** te gebruiken:

1. OmniRoute gebruikt een autorisatie-URL van Google
2. U heeft de autorisatie verleend of Google heeft een doorverwijzing naar `localhost` ingesteld (die geen externe service biedt)
3. **Kopieer een volledige URL** door de browser van uw browser (het bericht dat de pagina niet verder gaat)
4. Cole essa URL is niet beschikbaar op de verbindingswijze van OmniRoute
5. Klik op **"Verbinden"**

> Deze tijdelijke oplossing werkt door de autorisatiecode van de URL en is onafhankelijk van het omleiden naar uw autorisatie of niet.

</details>

---

</details>

## 🛠️Technische stapel

<details>
<summary><b>Klik om de details van de tech-stack uit te vouwen</b></summary>

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ wordt **niet ondersteund** — `better-sqlite3` native binaire bestanden zijn incompatibel)
- **Taal**: TypeScript 5.9 — **100% TypeScript** voor `src/` en `open-sse/` (nul `any` in kernmodules sinds v2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (domeinstatus + proxylogboeken + MCP-audit + routeringsbeslissingen)
- **Schema's**: Zod (MCP-tool I/O-validatie, API-contracten)
- **Protocollen**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: door de server verzonden gebeurtenissen (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-sleutels + MCP-scoped autorisatie
- **Testen**: Node.js testrunner + Vitest (900+ tests inclusief unit, integratie, E2E)
- **CI/CD**: GitHub-acties (automatische npm-publicatie + Docker Hub bij release)
- **Website**: [omniroute.online](https://omniroute.online)
- **Pakket**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Veerkracht**: stroomonderbreker, exponentiële uitstel, anti-donderkudde, TLS-spoofing, automatische combo-zelfherstel

</details>

---

## 📖 Documentatie

| Document                                       | Beschrijving                                               |
| ---------------------------------------------- | ---------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Providers, combo's, CLI-integratie, implementatie          |
| [API Reference](docs/API_REFERENCE.md)         | Alle eindpunten met voorbeelden                            |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP-tools, IDE-configuraties, Python/TS/Go-clients      |
| [A2A Server](src/lib/a2a/README.md)            | JSON-RPC 2.0-protocol, vaardigheden, streaming, taakbeheer |
| [Auto-Combo Engine](docs/auto-combo.md)        | Scoren met 6 factoren, moduspakketten, zelfgenezing        |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Veelvoorkomende problemen en oplossingen                   |
| [Architecture](docs/ARCHITECTURE.md)           | Systeemarchitectuur en internals                           |
| [Contributing](CONTRIBUTING.md)                | Ontwikkelingsopstelling en richtlijnen                     |
| [OpenAPI Spec](docs/openapi.yaml)              | OpenAPI 3.0-specificatie                                   |
| [Security Policy](SECURITY.md)                 | Kwetsbaarheidsrapportage en beveiligingspraktijken         |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Volledige gids: VM + nginx + Cloudflare-installatie        |
| [Features Gallery](docs/FEATURES.md)           | Visuele dashboardrondleiding met screenshots               |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Validatiestappen vóór de release                           |

---

## 🗺️ Routekaart

OmniRoute heeft **210+ functies gepland** over meerdere ontwikkelingsfasen. Dit zijn de belangrijkste gebieden:

| Categorie                       | Geplande functies | Hoogtepunten                                                                                              |
| ------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| 🧠 **Routing en intelligentie** | 25+               | Routering met de laagste latentie, op tags gebaseerde routering, quota-preflight, P2C-accountselectie     |
| 🔒 **Beveiliging en naleving**  | 20+               | SSRF-verharding, cloaking van inloggegevens, snelheidslimiet per eindpunt, scoping van beheersleutels     |
| 📊 **Waarneembaarheid**         | 15+               | OpenTelemetry-integratie, realtime quotabewaking, kostenregistratie per model                             |
| 🔄 **Provider-integraties**     | 20+               | Dynamisch modelregister, cooldowns van providers, Codex met meerdere accounts, parseren van Copilot-quota |
| ⚡ **Prestaties**               | 15+               | Dubbele cachelaag, promptcache, responscache, streaming keepalive, batch-API                              |
| 🌐 **Ecosysteem**               | 10+               | WebSocket API, configuratie hot-reload, gedistribueerde configuratieopslag, commerciële modus             |

### 🔜 Binnenkort beschikbaar

- 🔗 **OpenCode-integratie** — Native providerondersteuning voor de OpenCode AI-coderings-IDE
- 🔗 **TRAE-integratie** — Volledige ondersteuning voor het TRAE AI-ontwikkelingsframework
- 📦 **Batch API** — Asynchrone batchverwerking voor bulkaanvragen
- 🎯 **Op tags gebaseerde routering** — Routeer verzoeken op basis van aangepaste tags en metagegevens
- 💰 **Laagste-kostenstrategie** — Selecteer automatisch de goedkoopste beschikbare provider

> 📝 Volledige functiespecificaties beschikbaar in [**OMNI_TOKEN_342**](docs/new-features/) (217 gedetailleerde specificaties)

---

## 👥 Bijdragers

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Hoe u kunt bijdragen

1. Fork de repository
2. Maak uw feature branch (`git checkout -b feature/amazing-feature`)
3. Leg uw wijzigingen vast (`git commit -m 'Add amazing feature'`)
4. Duw naar het filiaal (`git push origin feature/amazing-feature`)
5. Open een Pull Request

Zie [CONTRIBUTING.md](CONTRIBUTING.md) voor gedetailleerde richtlijnen.

### Er wordt een nieuwe versie uitgebracht

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Sterrengeschiedenis

## Sterrenkijkers in de loop van de tijd

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Dankbetuigingen

Speciale dank aan **[9router](https://github.com/decolua/9router)** door **[decolua](https://github.com/decolua)** — het originele project dat deze vork inspireerde. OmniRoute bouwt voort op die ongelooflijke basis met extra functies, multimodale API's en een volledige TypeScript-herschrijving.

Speciale dank aan **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — de originele Go-implementatie die deze JavaScript-port inspireerde.

---

## 📄 Licentie

MIT-licentie - zie [LICENSE](LICENSE) voor details.

---

<div align="center">
  <sub>Gebouwd met ❤️ voor ontwikkelaars die 24/7 coderen</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub Discussies ingeschakeld voor community Q&A -->
