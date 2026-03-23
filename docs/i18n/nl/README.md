<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — De gratis AI-gateway

### Stop nooit met coderen. Slimme routering naar **GRATIS en voordelige AI-modellen** met automatische terugval.

_Uw universele API-proxy: één eindpunt, meer dan 36 providers, geen downtime._

**Chatvoltooiingen • Insluitingen • Afbeelding genereren • Audio • Herrangschikking • 100% TypeScript**

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

### 🤖 Gratis AI-provider voor uw favoriete codeeragenten

_Verbind elke AI-aangedreven IDE- of CLI-tool via OmniRoute: gratis API-gateway voor onbeperkte codering._

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

<sub>📡 Alle agenten maken verbinding via <code>http://localhost:20128/v1</code> of <code>http://cloud.omniroute.online/v1</code> — één configuratie, onbeperkte modellen en quota</sub>

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

## 🤔 Waarom OmniRoute?

**Stop met het verspillen van geld en het bereiken van grenzen:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Het abonnementsquotum verloopt elke maand ongebruikt
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Snelheidslimieten voorkomen dat u halverwege codeert
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Dure API's ($20-50/maand per provider)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Handmatig schakelen tussen providers

**OmniRoute lost dit op:**

- ✅ **Maximaliseer abonnementen** - Houd quota bij, gebruik elk bit voordat u het opnieuw instelt
- ✅ **Automatische fallback** - Abonnement → API-sleutel → Goedkoop → Gratis, geen downtime
- ✅ **Multi-account** - Round-robin tussen accounts per provider
- ✅ **Universeel** - Werkt met Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, elke CLI-tool

---

## 📧 Ondersteuning

> 💬 **Word lid van onze community!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Krijg hulp, deel tips en blijf op de hoogte.

- **Website**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problemen**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Origineel project**: [9router by decolua](https://github.com/decolua/9router)

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
- **Realtime bijhouden van quota** — Toont het tokenverbruik in realtime met aftellen van de reset (5 uur, dagelijks, wekelijks)
- **Ondersteuning voor meerdere accounts** — Meerdere accounts per provider met automatische round-robin — als de ene op is, wordt er overgeschakeld naar de volgende
- **Aangepaste combo's** — Aanpasbare fallback-ketens met 6 balanceringsstrategieën (fill-first, round-robin, P2C, willekeurig, minst gebruikt, kostengeoptimaliseerd)
- **Codex Business Quota** — Quotabewaking van zakelijke/teamwerkruimte rechtstreeks in het dashboard

</details>

<details>
<summary><b>🔌 2. "Ik moet meerdere providers gebruiken, maar elk heeft een andere API"</b></summary>

OpenAI gebruikt het ene formaat, Claude (Anthropic) gebruikt een ander, Gemini nog een ander. Als een ontwikkelaar modellen van verschillende providers wil testen of terug wil vallen tussen deze providers, moet hij SDK's opnieuw configureren, eindpunten wijzigen en omgaan met incompatibele formaten. Aangepaste providers (FriendLI, NIM) hebben niet-standaard modeleindpunten.

**Hoe OmniRoute het oplost:**

- **Unified Endpoint** — Eén enkele `http://localhost:20128/v1` dient als proxy voor alle 36+ providers
- **Formatvertaling** — Automatisch en transparant: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** — Verwijdert niet-standaardvelden (`x_groq`, `usage_breakdown`, `service_tier`) die OpenAI SDK v1.83+ breken
- **Rolnormalisatie** — Converteert `developer` → `system` voor niet-OpenAI-providers; `system` → `user` voor GLM/ERNIE
- **Think Tag Extraction** — Extraheert `<think>`-blokken uit modellen zoals DeepSeek R1 naar gestandaardiseerde `reasoning_content`
- **Gestructureerde uitvoer voor Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatische conversie
- **`stream` is standaard ingesteld op `false`** — Sluit aan bij de OpenAI-specificaties en vermijdt onverwachte SSE in Python/Rust/Go SDK's

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

</details>

<details>
<summary><b>🆓 4. "Ik wil AI gebruiken voor codering, maar ik heb geen geld"</b></summary>

Niet iedereen kan $ 20-200 per maand betalen voor AI-abonnementen. Studenten, ontwikkelaars uit opkomende landen, hobbyisten en freelancers hebben kosteloos toegang nodig tot kwaliteitsmodellen.

**Hoe OmniRoute het oplost:**

- **Free Tier Providers ingebouwd** — Native ondersteuning voor 100% gratis providers: iFlow (8 onbeperkte modellen), Qwen (3 onbeperkte modellen), Kiro (Claude gratis), Gemini CLI (180K/maand gratis)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Alleen gratis combo's** — Chain `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $ 0/maand zonder downtime
- **NVIDIA NIM Free Credits** — 1000 gratis credits geïntegreerd
- **Kostengeoptimaliseerde strategie** — Routingstrategie die automatisch de goedkoopste beschikbare provider kiest

</details>

<details>
<summary><b>🔒 5. "Ik moet mijn AI-gateway beschermen tegen ongeoorloofde toegang"</b></summary>

Bij het blootstellen van een AI-gateway aan het netwerk (LAN, VPS, Docker) kan iedereen met het adres de tokens/quota van de ontwikkelaar gebruiken. Zonder bescherming zijn API's kwetsbaar voor misbruik, snelle injectie en misbruik.

**Hoe OmniRoute het oplost:**

- **API Key Management** — Generatie, rotatie en bereik per provider met een speciale `/dashboard/api-manager`-pagina
- **Machtigingen op modelniveau** — Beperk API-sleutels tot specifieke modellen (`openai/*`, jokertekenpatronen), met de schakelaar Alles toestaan/Beperken
- **API Endpoint Protection** — Vereist een sleutel voor `/v1/models` en blokkeer specifieke providers uit de lijst
- **Auth Guard + CSRF-bescherming** — Alle dashboardroutes beschermd met `withAuth` middleware + CSRF-tokens
- **Rate Limiter** — Per-IP-snelheidslimiet met configureerbare vensters
- **IP-filtering** — Toelatingslijst/blokkeerlijst voor toegangscontrole
- **Prompt Injection Guard** — Sanering tegen kwaadaardige promptpatronen
- **AES-256-GCM-codering** — Inloggegevens gecodeerd in rust

</details>

<details>
<summary><b>🛑 6. "Mijn provider is uitgevallen en ik ben mijn codeerstroom kwijt"</b></summary>

AI-aanbieders kunnen instabiel worden, 5xx-fouten retourneren of tijdelijke tarieflimieten bereiken. Als een ontwikkelaar afhankelijk is van één enkele provider, worden deze onderbroken. Zonder stroomonderbrekers kunnen herhaalde pogingen de toepassing laten crashen.

**Hoe OmniRoute het oplost:**

- **Stroomonderbreker per provider** — Automatisch openen/sluiten met configureerbare drempels en cooldown (gesloten/open/halfopen)
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
- **Eén eindpunt, alle modellen** — Configureer `http://localhost:20128/v1` één keer, krijg toegang tot meer dan 36 providers

</details>

<details>
<summary><b>🔑 8. "Het beheren van OAuth-tokens van meerdere providers is een hel"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot: ze gebruiken allemaal OAuth 2.0 met aflopende tokens. Ontwikkelaars moeten zich voortdurend opnieuw authenticeren en omgaan met `client_secret is missing`, `redirect_uri_mismatch` en storingen op externe servers. OAuth op LAN/VPS is bijzonder problematisch.

**Hoe OmniRoute het oplost:**

- **Automatische tokenvernieuwing**: OAuth-tokens worden op de achtergrond vernieuwd voordat ze verlopen
- **OAuth 2.0 (PKCE) ingebouwd** — Automatische stroom voor Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Meerdere accounts per provider via JWT/ID-tokenextractie
- **OAuth LAN/Remote Fix** — Privé-IP-detectie voor `redirect_uri` + handmatige URL-modus voor externe servers
- **OAuth achter Nginx** — gebruikt `window.location.origin` voor reverse proxy-compatibiliteit
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

</details>

<details>
<summary><b>🏗️ 11. "Het implementeren en onderhouden van de gateway is complex"</b></summary>

Het installeren, configureren en onderhouden van een AI-proxy in verschillende omgevingen (lokaal, VPS, Docker, cloud) is arbeidsintensief. Problemen zoals hardgecodeerde paden, `EACCES` in mappen, poortconflicten en platformonafhankelijke builds zorgen voor wrijving.

**Hoe OmniRoute het oplost:**

- **npm globale installatie** — `npm install -g omniroute && omniroute` — klaar
- **Docker Multi-Platform** — AMD64 + ARM64 native (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (geen CLI-tools) en `cli` (met Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — Native app voor Windows/macOS/Linux met systeemvak, automatisch starten, offlinemodus
- **Split-Port-modus** — API en Dashboard op afzonderlijke poorten voor geavanceerde scenario's (reverse proxy, containernetwerken)
- **Cloud Sync** — Configureer synchronisatie tussen apparaten via Cloudflare Workers
- **DB-back-ups** — Automatische back-up, herstel, export en import van alle instellingen

</details>

<details>
<summary><b>🌍 12. "De interface is alleen in het Engels en mijn team spreekt geen Engels"</b></summary>

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

- **Inbedding** — `/v1/embeddings` met 6 providers en 9+ modellen
- **Beeldgeneratie** — `/v1/images/generations` met 10 providers en 20+ modellen (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Tekst-naar-video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) en SD WebUI
- **Tekst-naar-muziek** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Audiotranscriptie** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Tekst-naar-spraak** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + bestaande providers
- **Moderaties** — `/v1/moderations` — Veiligheidscontroles van inhoud
- **Herschikking** — `/v1/rerank` — Herschikking van de relevantie van documenten
- **Responses API** — Volledige `/v1/responses`-ondersteuning voor Codex

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
- **Wildcard Router** — `provider/*`-patronen routeren dynamisch naar elke provider
- **Combo in-/uitschakelen schakelen** — Schakel combo's rechtstreeks vanuit het dashboard in
- **Provider wisselen** — Schakel alle verbindingen voor een provider met één klik in/uit
- **Geblokkeerde providers**: sluit specifieke providers uit van de `/v1/models`-lijst

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
<summary><b>🔐 21. "Ik heb MCP-rechten per integratie nodig"</b></summary>

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

- Agentkaart zichtbaar op `/.well-known/agent.json`
- Mogelijkheden en vaardigheden weergegeven in de management-UI
- A2A-status-API bevat ontdekkingsmetagegevens voor automatisering

</details>

<details>
<summary><b>🧭 26. "Ik heb protocolvindbaarheid nodig in de product-UX"</b></summary>

Als gebruikers protocoloppervlakken niet kunnen ontdekken, neemt de acceptatie- en ondersteuningskwaliteit af.

**Hoe OmniRoute het oplost:**

- Zijbalkinvoer voor MCP en A2A
- Eindpuntpagina Tabblad Protocollen met snelstart en status
- Koppelingen van overzicht naar speciale managementdashboards

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
<summary><b>📡 28. "Ik heb uniforme observatie nodig over alle interfaces heen"</b></summary>

Het opsplitsen van de waarneembaarheid per protocol creëert blinde vlekken en een langere MTTR.

**Hoe OmniRoute het oplost:**

- Uniforme dashboards/logboeken/analyses in één product
- Gezondheid + audit + verzoektelemetrie over OpenAI-, MCP- en A2A-lagen
- Operationele API's voor status en automatisering

</details>

<details>
<summary><b>💼 29. "Ik heb één runtime nodig voor proxy + tools + agentorkestratie"</b></summary>

Het uitvoeren van veel afzonderlijke services verhoogt de operationele kosten en faalwijzen.

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
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Snelle start

**1. Wereldwijd installeren:**

```bash
npm install -g omniroute
omniroute
```

🎉 Dashboard wordt geopend op `http://localhost:20128`

| Commando                | Beschrijving                       |
| ----------------------- | ---------------------------------- |
| `omniroute`             | Startserver (standaardpoort 20128) |
| `omniroute --port 3000` | Gebruik aangepaste poort           |
| `omniroute --no-open`   | Browser niet automatisch openen    |
| `omniroute --help`      | Hulp tonen                         |

**2. Sluit een GRATIS provider aan:**

Dashboard → Providers → **Claude Code** of **Antigravity** verbinden → OAuth-aanmelding → Klaar!

**3. Gebruik in uw CLI-tool:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**Dat is alles!** Begin met coderen met GRATIS AI-modellen.

**Alternatief — uitvoeren vanaf bron:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
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

** Docker Compose gebruiken:**

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

## 💰 Prijzen in één oogopslag

| Niveau             | Aanbieder         | Kosten                    | Quotum opnieuw instellen | Beste voor                 |
| ------------------ | ----------------- | ------------------------- | ------------------------ | -------------------------- |
| **💳 ABONNEMENT**  | Claude Code (Pro) | $ 20/maand                | 5u + wekelijks           | Al geabonneerd             |
|                    | Codex (Plus/Pro)  | $ 20-200/maand            | 5u + wekelijks           | OpenAI-gebruikers          |
|                    | Tweeling CLI      | **GRATIS**                | 180K/maand + 1K/dag      | Iedereen!                  |
|                    | GitHub-copiloot   | $ 10-19/maand             | Maandelijks              | GitHub-gebruikers          |
| **🔑 API-SLEUTEL** | NVIDIA NIM        | **GRATIS** (1000 credits) | Eenmalig                 | Gratis niveautesten        |
|                    | DeepSeek          | Betalen per gebruik       | Geen                     | Beste prijs/kwaliteit      |
|                    | Groq              | Gratis niveau + betaald   | Tarief beperkt           | Ultrasnelle gevolgtrekking |
|                    | xAI (Grok)        | Betalen per gebruik       | Geen                     | Grok-modellen              |
|                    | Mistral           | Gratis niveau + betaald   | Tarief beperkt           | Europese AI                |
|                    | OpenRouter        | Betalen per gebruik       | Geen                     | 100+ modellen              |
| **💰GOEDKOOP**     | GLM-4.7           | $ 0,6/1 miljoen           | Dagelijks 10.00 uur      | Budgetback-up              |
|                    | MiniMax M2.1      | $ 0,2/1 miljoen           | 5-uurs rollen            | Goedkoopste optie          |
|                    | Kimi K2           | $ 9/maand plat            | 10 miljoen tokens/maand  | Voorspelbare kosten        |
| **🆓 GRATIS**      | iFlow             | $0                        | Onbeperkt                | 8 modellen gratis          |
|                    | Qwen              | $0                        | Onbeperkt                | 3 modellen gratis          |
|                    | Kiro              | $0                        | Onbeperkt                | Claude vrij                |

**💡 Pro-tip:** Begin met Gemini CLI (180K gratis/maand) + iFlow (onbeperkt gratis) combo = $ 0 kosten!

---

## 💡 Belangrijkste kenmerken

### 🧠 Kernroutering en intelligentie

| Kenmerk                                     | Wat het doet                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 🎯 **Slimme terugval op 4 niveaus**         | Autoroute: Abonnement → API-sleutel → Goedkoop → Gratis                                           |
| 📊 **Realtime quota bijhouden**             | Live tokentelling + reset-aftelling per provider                                                  |
| 🔄 **Formaatvertaling**                     | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro naadloos + responsopschoning                             |
| 👥 **Ondersteuning voor meerdere accounts** | Meerdere accounts per aanbieder met intelligente selectie                                         |
| 🔄 **Automatische tokenvernieuwing**        | OAuth-tokens worden automatisch vernieuwd bij nieuwe poging                                       |
| 🎨 **Aangepaste combo's**                   | 6 strategieën: eerst vullen, round-robin, p2c, willekeurig, minst gebruikt, kostengeoptimaliseerd |
| 🧩 **Aangepaste modellen**                  | Voeg elke model-ID toe aan elke provider                                                          |
| 🌐 **Wildcard-router**                      | Stuur `provider/*` patronen dynamisch naar elke provider                                          |
| 🧠 **Denkbudget**                           | Passthrough-, automatische, aangepaste en adaptieve modi voor redeneermodellen                    |
| 🔀 **Model Aliases**                        | Auto-forward deprecated model IDs to current replacements (built-in + custom)                     |
| ⚡ **Background Degradation**               | Auto-route background tasks (titles, summaries) to cheaper models                                 |
| 💬 **Systeempromptinjectie**                | Algemene systeemprompt toegepast op alle verzoeken                                                |
| 📄 **Reacties-API**                         | Volledige OpenAI Responses API (`/v1/responses`) ondersteuning voor Codex                         |

### 🎵 Multimodale API's

| Kenmerk                  | Wat het doet                                                                                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Beeldgeneratie**    | `/v1/images/generations` — 4 providers, 9+ modellen                                                                                                                        |
| 📐 **Insluitingen**      | `/v1/embeddings` — 6 providers, 9+ modellen                                                                                                                                |
| 🎤 **Audiotranscriptie** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Tekst-naar-spraak** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Moderaties**        | `/v1/moderations` — Veiligheidscontroles van inhoud                                                                                                                        |
| 🔀 **Herschikking**      | `/v1/rerank` — Herschikking van documentrelevantie                                                                                                                         |

### 🛡️ Veerkracht en veiligheid

| Kenmerk                               | Wat het doet                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------- |
| 🔌 **Stroomonderbreker**              | Automatisch openen/sluiten per provider met configureerbare drempels                     |
| 🛡️ **Anti-donderende kudde**          | Mutex + semafoorsnelheidslimiet voor API-sleutelproviders                                |
| 🧠 **Semantische cache**              | Tweelaagse cache (handtekening + semantisch) verlaagt de kosten en latentie              |
| ⚡ **Idempotentie aanvragen**         | 5s ontdubbelingsvenster voor dubbele verzoeken                                           |
| 🔒 **TLS-vingerafdrukspoofing**       | Omzeil TLS-gebaseerde botdetectie via wreq-js                                            |
| 🌐 **IP-filtering**                   | Toelatingslijst/blokkeerlijst voor API-toegangscontrole                                  |
| 📊 **Bewerkbare tarieflimieten**      | Configureerbare RPM, minimale tussenruimte en maximale gelijktijdigheid op systeemniveau |
| 💾 **Rate Limit Persistence**         | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness             |
| 🔄 **Token Refresh Resilience**       | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                   |
| 🛡 **API-eindpuntbescherming**        | Auth-gating + providerblokkering voor het `/models` eindpunt                             |
| 🔒 **Proxyzichtbaarheid**             | Kleurgecodeerde badges: 🟢 wereldwijd, 🟡 provider, 🔵 per verbinding met IP-display     |
| 🌐 **Proxyconfiguratie op 3 niveaus** | Configureer proxy's op globaal, per provider of per verbindingsniveau                    |

### 📊 Waarneembaarheid en analyse

| Kenmerk                                           | Wat het doet                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 📝 **Logboekregistratie aanvragen**               | Foutopsporingsmodus met volledige aanvraag-/antwoordlogboeken                               |
| 💾 **SQLite Proxy-logboeken**                     | Aanhoudende proxylogboeken overleven het opnieuw opstarten van de server                    |
| 📊 **Analytics-dashboard**                        | Recharts-aangedreven: statistische kaarten, modelgebruiksgrafiek, providertabel             |
| 📈 **Voortgang bijhouden**                        | SSE-voortgangsgebeurtenissen aanmelden voor streaming                                       |
| 🧪 **LLM-evaluaties**                             | Gouden settesten met 4 wedstrijdstrategieën                                                 |
| 🔍 **Telemetrie aanvragen**                       | p50/p95/p99 latentie-aggregatie + X-Request-Id-tracering                                    |
| 📋 **Logdashboard**                               | Uniforme pagina met 4 tabbladen: aanvraaglogboeken, proxylogboeken, auditlogboeken, console |
| 🖥️ **Consolelogviewer**                           | Realtime viewer in terminalstijl met niveaufilter, zoeken, automatisch scrollen             |
| 📑 **Op bestanden gebaseerde logboekregistratie** | Console-interceptor legt alle uitvoer vast naar JSON-logbestand met rotatie                 |
| 🏥 **Gezondheidsdashboard**                       | Systeemuptime, status van stroomonderbrekers, uitsluitingen, cachestatistieken              |
| 💰 **Kosten bijhouden**                           | Budgetbeheer + prijsconfiguratie per model                                                  |

### ☁️ Implementatie en synchronisatie

| Kenmerk                       | Wat het doet                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------- |
| 💾 **Cloudsynchronisatie**    | Synchroniseer de configuratie op verschillende apparaten via Cloudflare Workers |
| 🌐 **Overal implementeren**   | Localhost, VPS, Docker, Cloudflare Workers                                      |
| 🔑 **API-sleutelbeheer**      | Genereer, roteer en bereik API-sleutels per provider                            |
| 🧙 **Onboarding-wizard**      | Begeleide installatie in 4 stappen voor nieuwe gebruikers                       |
| 🔧 **CLI Tools-dashboard**    | Configureer met één klik Claude, Codex, Cline, OpenClaw, Kilo, Antigravity      |
| 🔄 **DB-back-ups**            | Automatische back-up, herstel, export en import voor alle instellingen          |
| 🌐 **Internationalisering**   | Volledige i18n met next-intl — Engels + Portugees (Brazilië) ondersteuning      |
| 🌍 **Taalkiezer**             | Wereldbolpictogram in koptekst voor realtime taalwisseling (🇺🇸/🇧🇷)              |
| 📂 **Aangepaste gegevensmap** | `DATA_DIR` env var om standaard `~/.omniroute` opslagpad te overschrijven       |

<details>
<summary><b>📖 Functiedetails</b></summary>

### 🎯 Slimme terugval op 4 niveaus

Creëer combo's met automatische terugval:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Realtime quota bijhouden

- Tokenverbruik per aanbieder
- Aftellen resetten (5 uur, dagelijks, wekelijks)
- Kostenraming voor betaalde niveaus
- Maandelijkse uitgavenrapporten

### 🔄 Formaatvertaling

Naadloze vertaling tussen formaten:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI-reacties**
- Uw CLI-tool verzendt OpenAI-formaat → OmniRoute vertaalt → Provider ontvangt native formaat
- Werkt met elke tool die aangepaste OpenAI-eindpunten ondersteunt
- **Reactieopschoning** — Verwijdert niet-standaardvelden voor strikte OpenAI SDK-compatibiliteit
- **Rolnormalisatie** — `developer` → `system` voor niet-OpenAI; `system` → `user` voor GLM/ERNIE-modellen
- **Extractie van Think-tags** — `<think>` blokken → `reasoning_content` voor denkmodellen
- **Gestructureerde uitvoer** — `json_schema` → Gemini's `responseMimeType`/`responseSchema`

### 👥 Ondersteuning voor meerdere accounts

- Voeg meerdere accounts per aanbieder toe
- Automatische round-robin of op prioriteit gebaseerde routering
- Terugval naar het volgende account wanneer één het quotum bereikt

### 🔄 Automatische tokenvernieuwing

- OAuth-tokens worden automatisch vernieuwd voordat ze verlopen
- Geen handmatige herauthenticatie nodig
- Naadloze ervaring bij alle providers

### 🎨 Aangepaste combo's

- Creëer onbeperkte modelcombinaties
- 6 strategieën: eerst vullen, round-robin, macht van twee keuzes, willekeurig, minst gebruikt, kostengeoptimaliseerd
- Deel combo's op verschillende apparaten met Cloud Sync

### 🏥 Gezondheidsdashboard

- Systeemstatus (uptime, versie, geheugengebruik)
- Status van de stroomonderbrekers per provider (Gesloten/Open/Half-Open)
- Tarieflimietstatus en actieve uitsluitingen
- Kenmerkende cachestatistieken
- Latency-telemetrie (p50/p95/p99) + promptcache
- Reset de gezondheidsstatus met één klik

### 🔧 Vertalerspeeltuin

OmniRoute bevat een krachtige ingebouwde Translator Playground met **4 modi** voor het debuggen, testen en monitoren van API-vertalingen:

| Modus             | Beschrijving                                                                                                                                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Speeltuin**  | Directe formaatvertaling: plak de hoofdtekst van een API-verzoek en zie direct hoe OmniRoute deze vertaalt tussen providerformaten (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). Bevat voorbeeldsjablonen en automatische detectie van formaten. |
| **💬 Chattester** | Stuur echte chatverzoeken via OmniRoute en bekijk het volledige overzicht: uw invoer, het vertaalde verzoek, het antwoord van de provider en het vertaalde antwoord terug. Van onschatbare waarde voor het valideren van combo-routering.      |
| **🧪 Proefbank**  | Batchtestmodus: definieer meerdere testgevallen met verschillende inputs en verwachte outputs, voer ze allemaal tegelijk uit en vergelijk de resultaten van verschillende providers en modellen.                                               |
| **📱Livemonitor** | Real-time monitoring van verzoeken: bekijk binnenkomende verzoeken terwijl ze door OmniRoute stromen, bekijk de formaatvertalingen live en identificeer problemen direct.                                                                      |

**Toegang:** Dashboard → Vertaler (zijbalk)

### 💾Cloudsynchronisatie

- Synchroniseer providers, combo's en instellingen op verschillende apparaten
- Automatische achtergrondsynchronisatie
- Veilige gecodeerde opslag

</details>

## 🧪 Evaluaties (Evals)

OmniRoute bevat een ingebouwd evaluatieframework om de LLM-responskwaliteit te testen aan de hand van een gouden set. U kunt deze openen via **Analytics → Evaluaties** in het dashboard.

### Ingebouwde gouden set

De vooraf geladen "OmniRoute Golden Set" bevat 10 testcases die betrekking hebben op:

- Groeten, wiskunde, aardrijkskunde, codegeneratie
- Naleving van JSON-formaat, vertaling, prijsverlaging
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

<details>
<summary><b>💳 Abonnementaanbieders</b></summary>

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

### NVIDIA NIM (GRATIS 1000 credits!)

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

**Modellen:** Krijg toegang tot meer dan 100 modellen van alle grote providers via één API-sleutel.

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

### iFlow (8 GRATIS modellen)

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

### Qwen (3 GRATIS modellen)

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

**Dashboard opent op verkeerde poort**

- Stel `PORT=20128` en `NEXT_PUBLIC_BASE_URL=http://localhost:20128` in

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

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ BELANGRIJK voor gebruik met OmniRoute op VPS/Docker/server op afstand**

### OAuth

Deze bewijzen **Antigravity** en **Gemini CLI** gebruiken **Google OAuth 2.0** voor authenticatie. O Google vraagt ​​dat `redirect_uri` geen OAuth-stroom gebruikt **exatamente** een van de URI's vóór de kadaster zonder toepassing van Google Cloud Console.

Omdat OAuth geen OmniRoute heeft geregistreerd, is dit **apenas para `localhost`**. Wanneer u OmniRoute op een externe server opent (bijvoorbeeld: `https://omniroute.meuservidor.com`), of Google een authenticatie aanvraagt:

```
Error 400: redirect_uri_mismatch
```

### Oplossing: Configureer uw eigen OAuth-credenciais

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

Nadat Google de juiste verwijzing naar `https://seu-servidor.com/callback` heeft gemaakt, is deze autenticaal functioneel geworden.

---

### Tijdelijke tijdelijke oplossing (sem credenciais próprias configureren)

Als u geen geloofwaardige geloofwaardigheid meer heeft, is het mogelijk om de stroom **handleiding van de URL** te gebruiken:

1. OmniRoute gebruikt een autorisatie-URL van Google
2. Als u de autorisatie heeft gegeven, zal Google de doorverwijzing naar `localhost` uitvoeren (die geen externe service biedt)
3. **Kopieer een volledige URL** door de browser van uw browser (het bericht dat de pagina niet verder gaat)
4. Cole essa URL is niet beschikbaar op de verbindingswijze van OmniRoute
5. Klik op **"Verbinden"**

> Deze tijdelijke oplossing werkt door de autorisatiecode van de URL en is onafhankelijk van het omleiden naar uw autorisatie of niet.

</details>

---

## 🛠️Technische stapel

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ wordt **niet ondersteund** — `better-sqlite3` native binaire bestanden zijn incompatibel)
- **Taal**: TypeScript 5.9 — **100% TypeScript** voor `src/` en `open-sse/` (v1.0.6)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (domeinstatus + proxylogboeken)
- **Streaming**: door de server verzonden gebeurtenissen (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-sleutels
- **Testen**: Node.js-testloper (368+ unit-tests)
- **CI/CD**: GitHub-acties (automatische npm-publicatie + Docker Hub bij release)
- **Website**: [omniroute.online](https://omniroute.online)
- **Pakket**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Veerkracht**: stroomonderbreker, exponentieel uitstel, anti-donderkudde, TLS-spoofing

---

## 📖 Documentatie

| Document                                     | Beschrijving                                        |
| -------------------------------------------- | --------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Providers, combo's, CLI-integratie, implementatie   |
| [API Reference](docs/API_REFERENCE.md)       | Alle eindpunten met voorbeelden                     |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Veelvoorkomende problemen en oplossingen            |
| [Architecture](docs/ARCHITECTURE.md)         | Systeemarchitectuur en internals                    |
| [Contributing](CONTRIBUTING.md)              | Ontwikkelingsopstelling en richtlijnen              |
| [OpenAPI Spec](docs/openapi.yaml)            | OpenAPI 3.0-specificatie                            |
| [Security Policy](SECURITY.md)               | Kwetsbaarheidsrapportage en beveiligingspraktijken  |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Volledige gids: VM + nginx + Cloudflare-installatie |
| [Features Gallery](docs/FEATURES.md)         | Visuele dashboardrondleiding met screenshots        |

### 📸 Dashboardvoorbeeld

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
| **Eindpunt**          | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute heeft **210+ functies gepland** over meerdere ontwikkelingsfasen. Dit zijn de belangrijkste gebieden:

| Categorie                       | Geplande functies                                      | Hoogtepunten                                                                                              |
| ------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| 🎯 **Endpoint-Aware Models**    | Custom models declare supported endpoints + API format |
| 🧠 **Routing en intelligentie** | 25+                                                    | Routering met de laagste latentie, op tags gebaseerde routering, quota-preflight, P2C-accountselectie     |
| 🔒 **Beveiliging en naleving**  | 20+                                                    | SSRF-verharding, cloaking van inloggegevens, snelheidslimiet per eindpunt, scoping van beheersleutels     |
| 📊 **Waarneembaarheid**         | 15+                                                    | OpenTelemetry-integratie, realtime quotabewaking, kostenregistratie per model                             |
| 🔄 **Provider-integraties**     | 20+                                                    | Dynamisch modelregister, cooldowns van providers, Codex met meerdere accounts, parseren van Copilot-quota |
| ⚡ **Prestaties**               | 15+                                                    | Dubbele cachelaag, promptcache, responscache, streaming keepalive, batch-API                              |
| 🌐 **Ecosysteem**               | 10+                                                    | WebSocket API, configuratie hot-reload, gedistribueerde configuratieopslag, commerciële modus             |

### 🔜 Binnenkort beschikbaar

- 🔗 **OpenCode-integratie** — Native providerondersteuning voor de OpenCode AI-coderings-IDE
- 🔗 **TRAE-integratie** — Volledige ondersteuning voor het TRAE AI-ontwikkelingsframework
- 📦 **Batch API** — Asynchrone batchverwerking voor bulkaanvragen
- 🎯 **Op tags gebaseerde routering** — Routeer verzoeken op basis van aangepaste tags en metagegevens
- 💰 **Laagste kostenstrategie** — Selecteer automatisch de goedkoopste beschikbare provider

> 📝 Volledige functiespecificaties beschikbaar in [link](docs/new-features/) (217 gedetailleerde specificaties)

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
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Sterrengeschiedenis

## Stargazers over time

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
