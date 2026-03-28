# 🚀 OmniRoute — Den gratis AI-gatewayen

### Slutt aldri å kode. Smart ruting til **GRATIS og rimelige AI-modeller** med automatisk fallback.

_Din universelle API-proxy – ett endepunkt, 67+ leverandører, null nedetid. Nå med **MCP & A2A** agentorkestrering._

**Chatfullføringer • Innebygginger • Bildegenerering • Video • Musikk • Lyd • Rerangering • **Nettsøk** • MCP-server • A2A-protokoll • 100 % TypeScript**

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

🌐 **Tilgjengelig i:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Hva er nytt i v3.0.0

> **Oppgraderer du fra v2.9.5?** — Se [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) for alle endringer.

| Område                           | Endre                                                                                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔒 **CodeQL Security**           | Faste 10+ CodeQL-varsler: polynom-redos, usikker-tilfeldighet, shell-injection remediation                                                                               |
| ✅ **Rutevalidering**            | Alle 176 API-ruter er nå validert med Zod-skjemaer + `validateBody()` — CI `check:route-validation:t06`-passeringer                                                      |
| 🐛 **omniModel Tag Leak**        | Interne `<omniModel>`-tagger lekker ikke lenger til klienter i SSE-strømmesvar (#585)                                                                                    |
| 🔑 **Registered Keys API**       | Autoprovision API-nøkler via `POST /api/v1/registered-keys` med kvotehåndhevelse per leverandør/konto, idempotens, SHA-256-lagring og valgfri GitHub-problemrapportering |
| 🎨 **Leverandørikoner**          | 130+ leverandørlogoer via `@lobehub/icons` (SVG) med PNG → generisk reservekjede                                                                                         |
| 🔄 **Modell Auto-Sync**          | 24-timers planlegger og manuell brukergrensesnitt for å synkronisere modelllister for innebygde og tilpassede OpenAI-kompatible leverandører                             |
| 🌐 **OpenCode Zen/Go**           | To nye leverandører fra @kang-heewon via PR #530: gratis nivå + abonnementsnivå via `OpencodeExecutor`                                                                   |
| 🐛 **Gemini CLI OAuth**          | Handlingsbar feil når `GEMINI_OAUTH_CLIENT_SECRET` mangler i Docker (var kryptisk Google-feil)                                                                           |
| 🐛 **OpenCode-konfigurasjon**    | `saveOpenCodeConfig()` skriver nå TOML riktig til `XDG_CONFIG_HOME`                                                                                                      |
| 🐛 **Pinned modelloverstyring**  | `body.model` riktig satt til `pinnedModel` på kontekstbufferbeskyttelse                                                                                                  |
| 🐛 **Codex/Claude loop**         | `tool_result` blokker nå konvertert til tekst for å stoppe uendelige løkker                                                                                              |
| 🐛 **Omdirigering av pålogging** | Pålogging fryser ikke lenger etter å ha hoppet over passordoppsett                                                                                                       |
| 🐛 **Windows-baner**             | MSYS2/Git-Bash-baner (`/c/...`) normalisert til `C:\...` automatisk                                                                                                      |

---

## 🖼️ Hoveddashbord

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Forhåndsvisning av dashbord

<details>
<summary><b>Klikk for å se skjermbilder av dashbordet</b></summary>

| Side              | Skjermbilde                                       |
| ----------------- | ------------------------------------------------- |
| **Tilbydere**     | ![Providers](docs/screenshots/01-providers.png)   |
| **Komboer**       | ![Combos](docs/screenshots/02-combos.png)         |
| **Analyse**       | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Helse**         | ![Health](docs/screenshots/04-health.png)         |
| **Oversetter**    | ![Translator](docs/screenshots/05-translator.png) |
| **Innstillinger** | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI-verktøy**   | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Brukslogger**   | ![Usage](docs/screenshots/08-usage.png)           |
| **Endepunkter**   | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Gratis AI-leverandør for dine favorittkodeagenter

_Koble til ethvert AI-drevet IDE- eller CLI-verktøy gjennom OmniRoute – gratis API-gateway for ubegrenset koding._

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

<sub>📡 Alle agenter kobler til via <code>http://localhost:20128/v1</code> eller <code>http://cloud.omniroute.online/v1__OMNI_TOKEN_466, — unlimited one model_466 kvote</sub>

---

## 🤔 Hvorfor OmniRoute?

**Slutt å kaste bort penger og nå grensene:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Abonnementskvoten utløper ubrukt hver måned
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Takstgrenser stopper deg med midtkoding
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Dyre APIer ($20–50/måned per leverandør)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manuell veksling mellom tilbydere

**OmniRoute løser dette:**

- ✅ **Maksimer abonnementer** - Spor kvote, bruk hver bit før tilbakestilling
- ✅ **Automatisk fallback** - Abonnement → API-nøkkel → Billig → Gratis, null nedetid
- ✅ **Multi-konto** - Round-robin mellom kontoer per leverandør
- ✅ **Universal** - Fungerer med Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, hvilket som helst CLI-verktøy

---

## 📧 Støtte

> 💬 **Bli med i fellesskapet vårt!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Få hjelp, del tips og hold deg oppdatert.

- **Nettsted**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Bidra**: Se [CONTRIBUTING.md](CONTRIBUTING.md), åpne en PR, eller velg en `good first issue`
- **Originalt prosjekt**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Rapportere en feil?

Når du åpner et problem, kjør systeminfo-kommandoen og legg ved den genererte filen:

```bash
npm run system-info
```

Dette genererer en `system-info.txt` med Node.js-versjonen, OmniRoute-versjonen, OS-detaljer, installerte CLI-verktøy (iflow, gemini, claude, codex, antigravity, droid, etc.), Docker/PM2-status og systempakker – alt vi trenger for å gjenskape problemet raskt. Legg ved filen direkte til GitHub-problemet ditt.

---

## 🔄 Slik fungerer det

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

## 🎯 Hva OmniRoute løser — 30 ekte smertepoeng og brukstilfeller

> **Hver utviklere som bruker AI-verktøy møter disse problemene daglig.** OmniRoute ble bygget for å løse dem alle – fra kostnadsoverskridelser til regionale blokker, fra ødelagte OAuth-flyter til protokolloperasjoner og observerbarhet i bedrifter.

<details>
<summary><b>💸 1. "Jeg betaler for et dyrt abonnement, men blir fortsatt avbrutt av grenser"</b></summary>

Utviklere betaler $20–200/måned for Claude Pro, Codex Pro eller GitHub Copilot. Selv om du betaler, har kvoten et tak – 5 timers bruk, ukentlige grenser eller rategrenser per minutt. Midtkodingsøkt, leverandøren slutter å svare og utvikleren mister flyt og produktivitet.

**Hvordan OmniRoute løser det:**

- **Smart 4-lags fallback** — Hvis abonnementskvoten går tom, omdirigeres automatisk til API-nøkkel → Billig → Gratis med null manuell intervensjon
- **Sanntidskvotesporing** — Viser tokenforbruk i sanntid med tilbakestilt nedtelling (5 timer, daglig, ukentlig)
- **Støtte for flere kontoer** - Flere kontoer per leverandør med automatisk round-robin - når en går tom, bytter du til den neste
- **Egendefinerte kombinasjoner** — Tilpassbare reservekjeder med 6 balansestrategier (fyll først, round-robin, P2C, tilfeldig, minst brukt, kostnadsoptimalisert)
- **Codex Business Quotas** — Overvåking av bedrifts-/teamarbeidsområdekvoter direkte i dashbordet

</details>

<details>
<summary><b>🔌 2. "Jeg trenger å bruke flere leverandører, men hver har en annen API"</b></summary>

OpenAI bruker ett format, Claude (Anthropic) bruker et annet, Gemini enda et annet. Hvis en utvikler ønsker å teste modeller fra forskjellige leverandører eller fallback mellom dem, må de rekonfigurere SDK-er, endre endepunkter, håndtere inkompatible formater. Tilpassede leverandører (FriendLI, NIM) har ikke-standardmodellende endepunkter.

**Hvordan OmniRoute løser det:**

- **Unified Endpoint** — En enkelt `http://localhost:20128/v1` fungerer som proxy for alle 67+ leverandører
- **Formatoversettelse** — Automatisk og gjennomsiktig: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
  – **Responsrensing** – Fjerner ikke-standardfelter (`x_groq`, `usage_breakdown`, `service_tier`) som bryter OpenAI SDK v1.83+
- **Rollenormalisering** — Konverterer `developer` → `system` for ikke-OpenAI-leverandører; `system` → `user` for GLM/ERNIE
- **Think Tag Extraction** — Trekker ut `<think>` blokker fra modeller som DeepSeek R1 til standardiserte `reasoning_content`
- **Structured Output for Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatisk konvertering
- **`stream` er standard til `false`** - Justerer med OpenAI-spesifikasjoner, og unngår uventet SSE i Python/Rust/Go SDK-er

</details>

<details>
<summary><b>🌐 3. "Min AI-leverandør blokkerer min region/land"</b></summary>

Leverandører som OpenAI/Codex blokkerer tilgang fra visse geografiske områder. Brukere får feil som `unsupported_country_region_territory` under OAuth- og API-tilkoblinger. Dette er spesielt frustrerende for utviklere fra utviklingsland.

**Hvordan OmniRoute løser det:**

- **3-Level Proxy Config** — Konfigurerbar proxy på 3 nivåer: global (all trafikk), per leverandør (kun én leverandør) og per tilkobling/nøkkel
- **Fargekodede proxy-merker** — Visuelle indikatorer: 🟢 global proxy, 🟡 leverandørproxy, 🔵 tilkoblings proxy, viser alltid IP
- **OAuth-tokenutveksling gjennom proxy** — OAuth-flyt går også gjennom proxyen, og løser `unsupported_country_region_territory`
- **Test av tilkobling via proxy** — Tilkoblingstester bruker den konfigurerte proxyen (ikke mer direkte forbikobling)
- **SOCKS5-støtte** — Full SOCKS5-proxystøtte for utgående ruting
- **TLS-fingeravtrykkspoofing** - Nettleserlignende TLS-fingeravtrykk via `wreq-js` for å omgå botdeteksjon
- **🔏 Matching av CLI-fingeravtrykk** — Omorganiserer overskrifter og brødtekstfelter for å matche native CLI-binære signaturer, noe som reduserer risikoen for kontoflagging drastisk. Proxy-IP-en er bevart – du får både skjult **og** IP-maskering samtidig

</details>

<details>
<summary><b>🆓 4. "Jeg vil bruke AI for koding, men jeg har ingen penger"</b></summary>

Ikke alle kan betale $20–200 per måned for AI-abonnementer. Studenter, utviklere fra fremvoksende land, hobbyfolk og frilansere trenger tilgang til kvalitetsmodeller uten kostnad.

**Hvordan OmniRoute løser det:**

- **Gratis-tilbydere innebygd** — Innebygd støtte for 100 % gratis leverandører: iFlow (5 ubegrensede modeller via OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen: 4 qwen3-modeller,-r qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID gratis), Gemini CLI (180K tokens/måned gratis)
- **Ollama Cloud** — Ollama-modeller med skyvert hos `api.ollama.com` med gratis «Lett bruk»-lag; bruk `ollamacloud/<model>` prefiks
- **Kun gratis kombinasjoner** — Kjede `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/måned med null nedetid
- **NVIDIA NIM Free Access** — ~40 RPM dev-forever gratis tilgang til 70+ modeller på build.nvidia.com (overgang fra kreditter til rene rategrenser)
- **Kostnadsoptimalisert strategi** — Rutingstrategi som automatisk velger den billigste tilgjengelige leverandøren

</details>

<details>
<summary><b>🔒 5. "Jeg trenger å beskytte AI-gatewayen min mot uautorisert tilgang"</b></summary>

Når du eksponerer en AI-gateway til nettverket (LAN, VPS, Docker), kan alle med adressen konsumere utviklerens tokens/kvote. Uten beskyttelse er API-er sårbare for misbruk, umiddelbar injeksjon og misbruk.

**Hvordan OmniRoute løser det:**

- **API Key Management** — Generering, rotasjon og scoping per leverandør med en dedikert `/dashboard/api-manager` side
- **Tillatelser på modellnivå** — Begrens API-nøkler til spesifikke modeller (`openai/*`, jokertegnmønstre), med Tillat alt/begrens-bryteren
- **API Endpoint Protection** — Krev en nøkkel for `/v1/models` og blokker spesifikke leverandører fra oppføringen
- **Auth Guard + CSRF Protection** — Alle dashbordruter beskyttet med `withAuth` mellomvare + CSRF-tokens
- **Rate Limiter** — Per-IP ratebegrensning med konfigurerbare vinduer
- **IP-filtrering** — Tillatelsesliste/blokkeringsliste for tilgangskontroll
- **Prompt Injection Guard** — Sanitisering mot ondsinnede spørsmålsmønstre
- **AES-256-GCM-kryptering** — Legitimasjon kryptert i hvile

</details>

<details>
<summary><b>🛑 6. "Tilbyderen min gikk ned og jeg mistet kodeflyten min"</b></summary>

AI-leverandører kan bli ustabile, returnere 5xx-feil eller nå midlertidige hastighetsgrenser. Hvis en utvikler er avhengig av en enkelt leverandør, blir de avbrutt. Uten strømbrytere kan gjentatte forsøk krasje applikasjonen.

**Hvordan OmniRoute løser det:**

- **Circuit Breaker per modell** — Automatisk åpning/lukking med konfigurerbare terskler og nedkjøling (Lukket/Åpen/Halv-Åpen), omfang per modell for å unngå kaskadeblokker
- **Eksponentiell backoff** — Progressive forsinkelser på nytt forsøk
- **Anti-tordenflokk** — Mutex + semaforbeskyttelse mot samtidige stormer på nytt forsøk
- **Combo Fallback Chains** — Hvis primærleverandøren mislykkes, faller den automatisk gjennom kjeden uten inngrep
- **Combo Circuit Breaker** - Deaktiverer sviktende leverandører automatisk i en kombinasjonskjede
- **Helsedashbord** — Oppetidsovervåking, strømbrytertilstander, sperringer, cachestatistikk, p50/p95/p99 latency

</details>

<details>
<summary><b>🔧 7. "Å konfigurere hvert AI-verktøy er kjedelig og repeterende"</b></summary>

Utviklere bruker Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Hvert verktøy trenger en annen konfigurasjon (API-endepunkt, nøkkel, modell). Å konfigurere på nytt når du bytter leverandør eller modell er bortkastet tid.

**Hvordan OmniRoute løser det:**

- **CLI Tools Dashboard** — Dedikert side med ett-klikksoppsett for Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Genererer `chatLanguageModels.json` for VS-kode med bulkmodellvalg
- **Onboarding Wizard** — Veiledet 4-trinns oppsett for førstegangsbrukere
- **Ett endepunkt, alle modeller** — Konfigurer `http://localhost:20128/v1` én gang, få tilgang til 67+ leverandører

</details>

<details>
<summary><b>🔑 8. "Å administrere OAuth-tokens fra flere leverandører er et helvete"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot – alle bruker OAuth 2.0 med tokens som utløper. Utviklere må re-autentisere hele tiden, håndtere `client_secret is missing`, `redirect_uri_mismatch` og feil på eksterne servere. OAuth på LAN/VPS er spesielt problematisk.

**Hvordan OmniRoute løser det:**

- **Automatisk oppdatering av token** — OAuth-tokener oppdateres i bakgrunnen før utløp
- **OAuth 2.0 (PKCE) innebygd** — Automatisk flyt for Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** - Flere kontoer per leverandør via JWT/ID-tokenutvinning
- **OAuth LAN/Remote Fix** — Privat IP-deteksjon for `redirect_uri` + manuell URL-modus for eksterne servere
- **OAuth Behind Nginx** — Bruker `window.location.origin` for omvendt proxy-kompatibilitet
- **Remote OAuth Guide** — Trinn-for-trinn-veiledning for Google Cloud-legitimasjon på VPS/Docker

</details>

<details>
<summary><b>📊 9. "Jeg vet ikke hvor mye jeg bruker eller hvor"</b></summary>

Utviklere bruker flere betalte leverandører, men har ikke noe enhetlig syn på utgifter. Hver leverandør har sitt eget faktureringsdashbord, men det er ingen konsolidert visning. Uventede kostnader kan hope seg opp.

**Hvordan OmniRoute løser det:**

- **Dashboard for kostnadsanalyse** — Kostnadssporing per token og budsjettadministrasjon per leverandør
  – **Budsjettgrenser per nivå** – Utgiftstak per nivå som utløser automatisk fallback
- **Priskonfigurasjon per modell** — Konfigurerbare priser per modell
- **Bruksstatistikk per API-nøkkel** — Antall forespørsler og sist brukte tidsstempel per nøkkel
- **Analytics Dashboard** — Statistiske kort, modellbruksdiagram, leverandørtabell med suksessrater og latens

</details>

<details>
<summary><b>🐛 10. "Jeg kan ikke diagnostisere feil og problemer i AI-anrop"</b></summary>

Når et anrop mislykkes, vet ikke utvikleren om det var en takstgrense, utløpt token, feil format eller leverandørfeil. Fragmenterte logger på tvers av forskjellige terminaler. Uten observerbarhet er feilsøking prøving og feiling.

**Hvordan OmniRoute løser det:**

- **Unified Logs Dashboard** — 4 faner: Forespørselslogger, proxy-logger, revisjonslogger, konsoll
- **Console Log Viewer** — Viser i sanntid i terminalstil med fargekodede nivåer, automatisk rulling, søk, filter
- **SQLite Proxy Logger** — Vedvarende logger som overlever serverstarter
- **Translator Playground** — 4 feilsøkingsmoduser: Playground (formatoversettelse), Chat Tester (tur-retur), Test Bench (batch), Live Monitor (sanntid)
- **Request Telemetri** — p50/p95/p99 latens + X-Request-Id-sporing
- **Filbasert logging med rotasjon** — Konsollinterceptor fanger opp alt til JSON-logg med størrelsesbasert rotasjon
- **Systeminforapport** — `npm run system-info` genererer `system-info.txt` med hele miljøet ditt (nodeversjon, OmniRoute-versjon, OS, CLI-verktøy, Docker/PM2-status). Legg den ved når du rapporterer problemer for umiddelbar triage.

</details>

<details>
<summary><b>🏗️ 11. "Deployering og vedlikehold av gatewayen er kompleks"</b></summary>

Installering, konfigurering og vedlikehold av en AI-proxy på tvers av forskjellige miljøer (lokalt, VPS, Docker, sky) er arbeidskrevende. Problemer som hardkodede baner, `EACCES` på kataloger, portkonflikter og kryssplattformbygg gir friksjon.

**Hvordan OmniRoute løser det:**

- **npm global installasjon** — `npm install -g omniroute && omniroute` — ferdig
- **Docker Multi-Platform** — AMD64 + ARM64 native (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose-profiler** — `base` (ingen CLI-verktøy) og `cli` (med Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — Innebygd app for Windows/macOS/Linux med systemstatusfelt, automatisk start, offline-modus
- **Split-Port Mode** — API og Dashboard på separate porter for avanserte scenarier (omvendt proxy, containernettverk)
- **Cloud Sync** — Konfigurer synkronisering på tvers av enheter via Cloudflare Workers
- **DB-sikkerhetskopier** — Automatisk sikkerhetskopiering, gjenoppretting, eksport og import av alle innstillinger

</details>

<details>
<summary><b>🌍 12. "Grensesnittet er kun engelsk og teamet mitt snakker ikke engelsk"</b></summary>

Lag i ikke-engelsktalende land, spesielt i Latin-Amerika, Asia og Europa, sliter med grensesnitt som kun er på engelsk. Språkbarrierer reduserer bruken og øker konfigurasjonsfeil.

**Hvordan OmniRoute løser det:**

- **Dashboard i18n — 30 språk** — Alle 500+ nøkler oversatt, inkludert arabisk, bulgarsk, dansk, tysk, spansk, finsk, fransk, hebraisk, hindi, ungarsk, indonesisk, italiensk, japansk, koreansk, malaysisk, nederlandsk, norsk, polsk, portugisisk (PT/BR), rumensk, russisk, ukrainsk, ukrainsk, kinesisk, engelsk, kinesisk, ukrainsk, kinesisk, ukrainsk, kinesisk, ukrainsk, kinesisk, ukrainsk, kinesisk
- **RTL-støtte** — Høyre-til-venstre-støtte for arabisk og hebraisk
- **Multi-Language READMEs** - 30 komplette dokumentasjonsoversettelser
- **Språkvelger** — Globusikon i overskriften for sanntidsbytte

</details>

<details>
<summary><b>🔄 13. "Jeg trenger mer enn chat — jeg trenger innbygginger, bilder, lyd"</b></summary>

AI er ikke bare fullføring av chat. Utviklere må generere bilder, transkribere lyd, lage innbygginger for RAG, omrangere dokumenter og moderere innhold. Hver API har et annet endepunkt og format.

**Hvordan OmniRoute løser det:**

- **Innbygging** — `/v1/embeddings` med 6 leverandører og 9+ modeller
- **Bildegenerering** — `/v1/images/generations` med 10 leverandører og 20+ modeller (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Tekst-til-video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) og SD WebUI
- **Tekst-til-musikk** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Lydtranskripsjon** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Tekst-til-tale** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + eksisterende leverandører
- **Moderasjoner** — `/v1/moderations` — Innholdssikkerhetssjekker
- **Rerangering** — `/v1/rerank` — Rerangering av dokumentrelevans
- **Responses API** — Full `/v1/responses`-støtte for Codex

</details>

<details>
<summary><b>🧪 14. "Jeg har ingen måte å teste og sammenligne kvalitet på tvers av modeller"</b></summary>

Utviklere ønsker å vite hvilken modell som er best for deres brukssituasjon – kode, oversettelse, resonnement – men det går tregt å sammenligne manuelt. Det finnes ingen integrerte evalueringsverktøy.

**Hvordan OmniRoute løser det:**

- **LLM-evalueringer** - Gyldent sett-testing med 10 forhåndsinnlastede tilfeller som dekker hilsener, matematikk, geografi, kodegenerering, JSON-overholdelse, oversettelse, nedskrivning, sikkerhetsavslag
- **4 kampstrategier** — `exact`, `contains`, `regex`, `custom` (JS-funksjon)
- **Translator Playground Test Bench** — Batchtesting med flere innganger og forventede utganger, sammenligning på tvers av leverandører
- **Chattetester** — Full rundtur med visuell responsgjengivelse
- **Live Monitor** — Sanntidsstrøm av alle forespørsler som strømmer gjennom proxyen

</details>

<details>
<summary><b>📈 15. "Jeg trenger å skalere uten å miste ytelsen"</b></summary>

Når forespørselsvolumet vokser, genererer de samme spørsmålene dupliserte kostnader uten å bufre. Uten idempotens, dupliserte forespørsler om avfallsbehandling. Satsgrenser per leverandør må respekteres.

**Hvordan OmniRoute løser det:**

- **Semantisk hurtigbuffer** — To-lags cache (signatur + semantisk) reduserer kostnader og ventetid
- **Request Idempotency** — 5s dedupliseringsvindu for identiske forespørsler
- **Deteksjon av hastighetsgrense** - RPM per leverandør, minimum gap og maksimal samtidig sporing
- **Redigerbare frekvensgrenser** — Konfigurerbare standardinnstillinger i Innstillinger → Motstandsdyktighet med utholdenhet
- **API Key Validation Cache** — 3-lags cache for produksjonsytelse
- **Helsedashbord med telemetri** — p50/p95/p99-forsinkelse, hurtigbufferstatistikk, oppetid

</details>

<details>
<summary><b>🤖 16. "Jeg vil kontrollere modellatferd globalt"</b></summary>

Utviklere som vil ha alle svar på et spesifikt språk, med en bestemt tone, eller som ønsker å begrense resonnement-tokens. Å konfigurere dette i hvert verktøy/hver forespørsel er upraktisk.

**Hvordan OmniRoute løser det:**

- **System Prompt Injection** — Global forespørsel brukt på alle forespørsler
- **Thinking Budget Validation** — Reasoning token allocation control per request (passthrough, auto, custom, adaptive)
- **6 rutingstrategier** — Globale strategier som bestemmer hvordan forespørsler distribueres
- **Wildcard-ruter** — `provider/*`-mønstre rutes dynamisk til enhver leverandør
- **Kombo aktiver/deaktiver veksle** — Veksle kombinasjoner direkte fra dashbordet
- **Tilkobling av leverandør** — Aktiver/deaktiver alle tilkoblinger for en leverandør med ett klikk
- **Blokkerte leverandører** — Ekskluder spesifikke leverandører fra `/v1/models`-oppføringen

</details>

<details>
<summary><b>🧰 17. "Jeg trenger MCP-verktøy som førsteklasses produktegenskaper"</b></summary>

Mange AI-gatewayer avslører MCP bare som en skjult implementeringsdetalj. Team trenger et synlig, håndterbart driftslag.

**Hvordan OmniRoute løser det:**

- MCP vises i dashbordnavigasjons- og endepunktprotokollfanen
- Dedikert MCP-administrasjonsside med prosess, verktøy, omfang og revisjon
- Innebygd hurtigstart for `omniroute --mcp` og klient onboarding

</details>

<details>
<summary><b>🧠 18. "Jeg trenger A2A-orkestrering med synkronisering + strømoppgavestier"</b></summary>

Agentarbeidsflyter trenger både direkte svar og langvarig strømmet utførelse med livssykluskontroll.

**Hvordan OmniRoute løser det:**

- A2A JSON-RPC-endepunkt (`POST /a2a`) med `message/send` og `message/stream`
- SSE-streaming med forplantning av terminaltilstand
- Oppgavelivssyklus-API-er for `tasks/get` og `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Jeg trenger ekte MCP-prosesshelse, ikke gjettet status"</b></summary>

Operasjonelle team må vite om MCP faktisk er i live, ikke bare om en API er tilgjengelig.

**Hvordan OmniRoute løser det:**

- Runtime hjerteslag-fil med PID, tidsstempler, transport, verktøytelling og omfangsmodus
- MCP status API som kombinerer hjerteslag + nylig aktivitet
- UI-statuskort for prosess/oppetid/hjerteslag

</details>

<details>
<summary><b>📋 20. "I need auditable MCP toolexecution"</b></summary>

Når verktøy muterer konfigurasjon eller utløser operasjonshandlinger, trenger teamene rettsmedisinsk sporbarhet.

**Hvordan OmniRoute løser det:**

- SQLite-støttet revisjonslogging for MCP-verktøykall
- Filtrerer etter verktøy, suksess/fiasko, API-nøkkel og paginering
- Dashboard revisjonstabell + statistikkendepunkter for automatisering

</details>

<details>
<summary><b>🔐 21. "Jeg trenger scoped MCP-tillatelser per integrasjon"</b></summary>

Ulike klienter bør ha minst privilegert tilgang til verktøykategorier.

**Hvordan OmniRoute løser det:**

- 9 granulære MCP-skoper for kontrollert verktøytilgang
- Håndhevelse av omfang og synlighet i MCP-administrasjonsgrensesnittet
- Sikker standardstilling for operativt verktøy

</details>

<details>
<summary><b>⚙️ 22. "Jeg trenger operasjonelle kontroller uten å omdistribuere"</b></summary>

Lag trenger raske endringer i kjøretiden under hendelser eller kostnadshendelser.

**Hvordan OmniRoute løser det:**

- Bytt kombinasjonsaktivering direkte fra MCP-dashbordet
- Bruk robusthetsprofiler fra forhåndsdefinerte policypakker
- Tilbakestill strømbryterens tilstand fra samme driftspanel

</details>

<details>
<summary><b>🔄 23. "I need live A2A task lifecycle synibility and cancellation"</b></summary>

Uten livssyklussynlighet blir oppgavehendelser vanskelig å triage.

**Hvordan OmniRoute løser det:**

- Oppgaveliste/filtrering etter tilstand/ferdighet med paginering
- Drill-down på oppgavemetadata, hendelser og artefakter
- Sluttpunkt for kansellering av oppgave og UI-handling med bekreftelse

</details>

<details>
<summary><b>🌊 24. "Jeg trenger aktive strømmemålinger for A2A-last"</b></summary>

Strømmearbeidsflyter krever operasjonell innsikt i samtidighet og direkteforbindelser.

**Hvordan OmniRoute løser det:**

- Aktive strømtellere integrert i A2A-status
- Tidsstempel for siste oppgave og antall per stat
- A2A dashbordkort for operasjonsovervåking i sanntid

</details>

<details>
<summary><b>🪪 25. "Jeg trenger standard agentoppdagelse for klienter"</b></summary>

Eksterne klienter og orkestratorer trenger maskinlesbare metadata for onboarding.

**Hvordan OmniRoute løser det:**

- Agentkort avslørt på `/.well-known/agent.json`
- Evner og ferdigheter vist i ledelsens brukergrensesnitt
- A2A status API inkluderer oppdagelsesmetadata for automatisering

</details>

<details>
<summary><b>🧭 26. "Jeg trenger protokolloppdagbarhet i produktets UX"</b></summary>

Hvis brukere ikke kan oppdage protokolloverflater, faller kvaliteten på adopsjon og støtte.

**Hvordan OmniRoute løser det:**

- Konsolidert **Endepunkter**-side med faner for proxy-, MCP-, A2A- og API-endepunkter
- Inline tjenestestatus veksler (Online/Offline) for MCP og A2A
- Lenker fra oversikt til dedikerte administrasjonsfaner

</details>

<details>
<summary><b>🧪 27. "Jeg trenger ende-til-ende protokollvalidering med ekte klienter"</b></summary>

Mock-tester er ikke nok til å validere protokollkompatibilitet før utgivelse.

**Hvordan OmniRoute løser det:**

- E2E-suite som starter opp app og bruker ekte MCP SDK-klienttransport
- A2A-klient tester for å oppdage, sende, streame, hente og kansellere flyter
- Krysssjekk påstander mot MCP-revisjon og A2A-oppgave-APIer

</details>

<details>
<summary><b>📡 28. "Jeg trenger enhetlig observerbarhet på tvers av alle grensesnitt"</b></summary>

Å dele observerbarhet etter protokoll skaper blinde flekker og lengre MTTR.

**Hvordan OmniRoute løser det:**

- Samlede dashboards/logger/analyse i ett produkt
- Helse + revisjon + forespørsel om telemetri på tvers av OpenAI-, MCP- og A2A-lag
- Operasjonelle APIer for status og automatisering

</details>

<details>
<summary><b>💼 29. "Jeg trenger én kjøretid for proxy + verktøy + agentorkestrering"</b></summary>

Å kjøre mange separate tjenester øker driftskostnadene og feilmodusene.

**Hvordan OmniRoute løser det:**

- OpenAI-kompatibel proxy, MCP-server og A2A-server i én stabel
- Delt autentisering, robusthet, datalagring og observerbarhet
- Konsekvent policymodell på tvers av alle interaksjonsflater

</details>

<details>
<summary><b>🚀 30. "I need to ship agentic workflows without glue-code sprawl"</b></summary>

Lag mister hastighet når de setter sammen flere ad-hoc-tjenester og skript.

**Hvordan OmniRoute løser det:**

- Enhetlig endepunktstrategi for kunder og agenter
- Innebygde brukergrensesnitt for protokolladministrasjon og røykvalideringsveier
- Produksjonsklare fundamenter (sikkerhet, logging, robusthet, backup)

</details>

### Eksempel på Playbooks (integrerte brukstilfeller)

**Playbook A: Maksimer betalt abonnement + billig backup**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Nullkostnadskodestabel**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7 alltid aktiv reservekjede**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Agentoperasjoner med MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Start gratis — Null konfigurasjonskostnad

> Konfigurer AI-koding på minutter til **$0/måned**. Koble til disse gratis kontoene og bruk den innebygde **Free Stack**-kombinasjonen.

| Trinn | Handling                                         | Leverandører ulåst                                                  |
| ----- | ------------------------------------------------ | ------------------------------------------------------------------- |
| 1     | Koble til **Kiro** (AWS Builder ID OAuth)        | Claude Sonnet 4.5, Haiku 4.5 — **ubegrenset**                       |
| 2     | Koble til **iFlow** (Google OAuth)               | kimi-k2-tenkning, qwen3-coder-plus, deepseek-r1... — **ubegrenset** |
| 3     | Koble til **Qwen** (enhetskode)                  | qwen3-coder-pluss, qwen3-coder-flash... — **ubegrenset**            |
| 4     | Koble til **Gemini CLI** (Google OAuth)          | gemini-3-flash, gemini-2.5-pro — **180K/mnd gratis**                |
| 5     | `/dashboard/combos` → **Gratis stabel ($0)** mal | Round-robin alle gratisleverandører automatisk                      |

**Pekt en hvilken som helst IDE/CLI til:** `http://localhost:20128/v1` · API-nøkkel: `any-string` · Ferdig.

> **Valgfri ekstra dekning (også gratis):** Groq API-nøkkel (30 RPM gratis), NVIDIA NIM (40 RPM gratis, 70+ modeller), Cerebras (1M tok/dag), LongCat API-nøkkel (50M tokens/dag!), Cloudflare Workers AI (10K Neurons/day, 50+ modeller).

## ⚡ Hurtigstart

### 1) Installer og kjør

```bash
npm install -g omniroute
omniroute
```

> **pnpm-brukere:** Kjør `pnpm approve-builds -g` etter installasjon for å aktivere native build-skript som kreves av `better-sqlite3` og `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Dashboard åpnes på `http://localhost:20128` og API-base-URL er `http://localhost:20128/v1`.

| Kommando                | Beskrivelse                                                |
| ----------------------- | ---------------------------------------------------------- |
| `omniroute`             | Start server (`PORT=20128`, API og dashbord på samme port) |
| `omniroute --port 3000` | Sett kanonisk/API-port til 3000                            |
| `omniroute --mcp`       | Start MCP-server (stdio-transport)                         |
| `omniroute --no-open`   | Ikke åpne nettleseren automatisk                           |
| `omniroute --help`      | Vis hjelp                                                  |

Valgfri delt port-modus:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Koble til leverandører og lag API-nøkkelen din

1. Åpne Dashboard → `Providers` og koble til minst én leverandør (OAuth- eller API-nøkkel).
2. Åpne Dashboard → `Endpoints` og lag en API-nøkkel.
3. (Valgfritt) Åpne Dashboard → `Combos` og sett reservekjeden.

### 3) Pek kodeverktøyet til OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Fungerer med Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode og OpenAI-kompatible SDK-er.

### 4) Aktiver og valider protokoller (v2.0)

**MCP (for verktøydrevne operasjoner):**

```bash
omniroute --mcp
```

Koble deretter til MCP-klienten din over `stdio` og test verktøy som:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (for agent-til-agent arbeidsflyter):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Valider alt ende-til-ende (anbefalt)

```bash
npm run test:protocols:e2e
```

Denne suiten validerer ekte MCP- og A2A-klientflyter mot en kjørende app.

### Alternativ: kjør fra kilden

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

OmniRoute er tilgjengelig som et offentlig Docker-bilde på [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Rask løp:**

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

**Bruke Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Bilde                    | Tag      | Størrelse | Beskrivelse             |
| ------------------------ | -------- | --------- | ----------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB    | Siste stabile utgivelse |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB    | Gjeldende versjon       |

---

## 🖥️ Desktop-app — Frakoblet og alltid på

> 🆕 **NYHET!** OmniRoute er nå tilgjengelig som en **native desktop-applikasjon** for Windows, macOS og Linux.

Kjør OmniRoute som en frittstående skrivebordsapp – ingen terminal, ingen nettleser, ingen internett nødvendig for lokale modeller. Den elektronbaserte appen inkluderer:

- 🖥️ **Native Window** — Dedikert appvindu med systemstatusfeltintegrasjon
- 🔄 **Autostart** — Start OmniRoute ved systempålogging
- 🔔 **Native notifications** — Få varsler for kvotebruk eller leverandørproblemer
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Frakoblet modus** — Fungerer helt offline med medfølgende server

### Hurtigstart

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Systemstatusfelt

Når den er minimert, lever OmniRoute i systemstatusfeltet med raske handlinger:

- Åpne dashbordet
- Endre serverport
- Avslutt programmet

📖 Full dokumentasjon: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Priser på et øyeblikk

| Nivå              | Leverandør                  | Kostnad                            | Kvote Tilbakestill | Best for                          |
| ----------------- | --------------------------- | ---------------------------------- | ------------------ | --------------------------------- |
| **💳 ABONNEMENT** | Claude Code (Pro)           | $20/md                             | 5t + ukentlig      | Allerede abonnert                 |
|                   | Codex (Pluss/Pro)           | $20-200/md                         | 5t + ukentlig      | OpenAI-brukere                    |
|                   | Gemini CLI                  | **GRATIS**                         | 180K/mnd + 1K/dag  | Alle sammen!                      |
|                   | GitHub Copilot              | $10-19/md                          | Månedlig           | GitHub-brukere                    |
| **🔑 API NØKKEL** | NVIDIA NIM                  | **GRATIS** (utvikler for alltid)   | ~40 RPM            | 70+ åpne modeller                 |
|                   | Cerebras                    | **GRATIS** (1M tok/dag)            | 60K TPM / 30 RPM   | Verdens raskeste                  |
|                   | Groq                        | **GRATIS** (30 RPM)                | 14,4K RPD          | Ultrarask Llama/Gemma             |
|                   | DeepSeek V3.2               | $0,27/$1,10 per 1M                 | Ingen              | Beste pris/kvalitet resonnement   |
|                   | xAI Grok-4 Fast             | **$0,20/$0,50 per 1M** 🆕          | Ingen              | Raskeste + verktøykall, ultralavt |
|                   | xAI Grok-4 (standard)       | $0,20/$1,50 per 1M 🆕              | Ingen              | Resonneringsflaggskip fra xAI     |
|                   | Mistral                     | Gratis prøveversjon + betalt       | Begrenset pris     | Europeisk AI                      |
|                   | OpenRouter                  | Betal per bruk                     | Ingen              | 100+ modeller aggr.               |
| **💰 BILLIG**     | GLM-5 (via Z.AI) 🆕         | $0,5/1M                            | Daglig 10:00       | 128K utgang, nyeste flaggskip     |
|                   | GLM-4.7                     | $0,6/1M                            | Daglig 10:00       | Budsjett backup                   |
|                   | MiniMax M2.5 🆕             | $0,3/1 million input               | 5-timers rullende  | Resonnement + agentoppgaver       |
|                   | MiniMax M2.1                | $0,2/1M                            | 5-timers rullende  | Billigste alternativ              |
|                   | Kimi K2.5 (Moonshot API) 🆕 | Betal per bruk                     | Ingen              | Direkte Moonshot API-tilgang      |
|                   | Kimi K2                     | $9/md leilighet                    | 10M tokens/md      | Forutsigbar kostnad               |
| **🆓 GRATIS**     | iFlow                       | **$0**                             | Ubegrenset         | 5 modeller ubegrenset             |
|                   | Qwen                        | **$0**                             | Ubegrenset         | 4 modeller ubegrenset             |
|                   | Kiro                        | **$0**                             | Ubegrenset         | Claude Sonnet/Haiku (AWS-bygger)  |
|                   | LongCat Flash-Lite 🆕       | **$0** (50 millioner tok/dag 🔥)   | 1 RPS              | Største gratis kvote på jorden    |
|                   | Pollinasjoner AI 🆕         | **$0** (ingen nøkkel nødvendig)    | 1 krav/15s         | GPT-5, Claude, DeepSeek, Llama 4  |
|                   | Cloudflare Workers AI 🆕    | **$0** (10K nevroner/dag)          | ~150 resp/dag      | 50+ modeller, global kant         |
|                   | Scaleway AI 🆕              | **$0** (1 millioner tokens totalt) | Begrenset pris     | EU/GDPR, Qwen3 235B, Lama 70B     |

> 🆕 **Nye modeller lagt til (mars 2026):** Grok-4 Fast-familie til $0,20/$0,50/M (benchmarked ved 1143ms — 30 % raskere enn Gemini 2.5 Flash), GLM-5 via Z.AI med 128K-utgang, MiniMax M2.5-resonnement, KimSeidek pr V3.2-oppdatering, KimSeidek pr. direkte API.

**💡 $0 Combo Stack — Det komplette gratis oppsettet:**

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

**Null kostnad. Slutter aldri å kode.** Konfigurer dette som én OmniRoute-kombinasjon og alle fallbacks skjer automatisk – ingen manuell veksling noensinne.

---

---

## 🆓 Gratis modeller — hva du faktisk får

> Alle modellene nedenfor er **100 % gratis uten behov for kredittkort**. OmniRoute ruter automatisk mellom dem når én kvote går tom – kombiner dem alle for en ubrytelig kombinasjon av $0.

### 🔵 CLAUDE MODELLS (via Kiro — AWS Builder ID)

| Modell              | Prefiks | Grens          | Satsgrense                  |
| ------------------- | ------- | -------------- | --------------------------- |
| `claude-sonnet-4.5` | `kr/`   | **Ubegrenset** | Ingen rapportert daglig tak |
| `claude-haiku-4.5`  | `kr/`   | **Ubegrenset** | Ingen rapportert daglig tak |
| `claude-opus-4.6`   | `kr/`   | **Ubegrenset** | Siste Opus via Kiro         |

### IFLOW-MODELLER (gratis OAuth – uten kredittkort)

| Modell             | Prefiks | Grens          | Satsgrense           |
| ------------------ | ------- | -------------- | -------------------- |
| `kimi-k2-thinking` | `if/`   | **Ubegrenset** | Ingen rapportert cap |
| `qwen3-coder-plus` | `if/`   | **Ubegrenset** | Ingen rapportert cap |
| `deepseek-r1`      | `if/`   | **Ubegrenset** | Ingen rapportert cap |
| `minimax-m2.1`     | `if/`   | **Ubegrenset** | Ingen rapportert cap |
| `kimi-k2`          | `if/`   | **Ubegrenset** | Ingen rapportert cap |

### 🟡 QWEN-MODELLER (Auth-enhetskode)

| Modell              | Prefiks | Grens          | Satsgrense           |
| ------------------- | ------- | -------------- | -------------------- |
| `qwen3-coder-plus`  | `qw/`   | **Ubegrenset** | Ingen rapportert cap |
| `qwen3-coder-flash` | `qw/`   | **Ubegrenset** | Ingen rapportert cap |
| `qwen3-coder-next`  | `qw/`   | **Ubegrenset** | Ingen rapportert cap |
| `vision-model`      | `qw/`   | **Ubegrenset** | Multimodal (bilder)  |

### 🟣 GEMINI CLI (Google OAuth)

| Modell                   | Prefiks | Begrensning                 | Satsgrense               |
| ------------------------ | ------- | --------------------------- | ------------------------ |
| `gemini-3-flash-preview` | `gc/`   | **180K tok/måned** + 1K/dag | Månedlig tilbakestilling |
| `gemini-2.5-pro`         | `gc/`   | 180K/måned (delt basseng)   | Høy kvalitet             |

### ⚫ NVIDIA NIM (gratis API-nøkkel — build.nvidia.com)

| Nivå         | Daglig grense   | Satsgrense  | Merknader                                               |
| ------------ | --------------- | ----------- | ------------------------------------------------------- |
| Gratis (Dev) | Ingen token cap | **~40 RPM** | 70+ modeller; overgang til rene takstgrenser medio 2025 |

Populære gratismodeller: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (gratis API-nøkkel — inference.cerebras.ai)

| Nivå   | Daglig grense              | Satsgrense       | Merknader                                            |
| ------ | -------------------------- | ---------------- | ---------------------------------------------------- |
| Gratis | **1 millioner tokens/dag** | 60K TPM / 30 RPM | Verdens raskeste LLM-slutning; tilbakestilles daglig |

Gratis tilgjengelig: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (gratis API-nøkkel — console.groq.com)

| Nivå   | Daglig grense | Satsgrense        | Merknader                                       |
| ------ | ------------- | ----------------- | ----------------------------------------------- |
| Gratis | **14,4K RPD** | 30 RPM per modell | Ingen kredittkort; 429 på grense, ikke belastet |

Tilgjengelig gratis: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (gratis API-nøkkel — longcat.chat) 🆕

| Modell                        | Prefiks | Daglig gratis kvote        | Merknader                      |
| ----------------------------- | ------- | -------------------------- | ------------------------------ |
| `LongCat-Flash-Lite`          | `lc/`   | **50 millioner tokens** 💥 | Største gratis kvote noensinne |
| `LongCat-Flash-Chat`          | `lc/`   | 500K tokens                | Multi-turn chat                |
| `LongCat-Flash-Thinking`      | `lc/`   | 500K tokens                | Begrunnelse / CoT              |
| `LongCat-Flash-Thinking-2601` | `lc/`   | 500K tokens                | Jan 2026 versjon               |
| `LongCat-Flash-Omni-2603`     | `lc/`   | 500K tokens                | Multimodal                     |

> 100 % gratis mens du er i offentlig beta. Registrer deg på [longcat.chat](https://longcat.chat) med e-post eller telefon. Tilbakestilles daglig 00:00 UTC.

### 🟢 POLLINATIONS AI (ingen API-nøkkel kreves) 🆕

| Modell     | Prefiks | Satsgrense | Leverandør bak       |
| ---------- | ------- | ---------- | -------------------- |
| `openai`   | `pol/`  | 1 krav/15s | GPT-5                |
| `claude`   | `pol/`  | 1 krav/15s | Antropiske Claude    |
| `gemini`   | `pol/`  | 1 krav/15s | Google Gemini        |
| `deepseek` | `pol/`  | 1 krav/15s | DeepSeek V3          |
| `llama`    | `pol/`  | 1 krav/15s | Meta Llama 4 speider |
| `mistral`  | `pol/`  | 1 krav/15s | Mistral AI           |

> ✨ **Null friksjon:** Ingen registrering, ingen API-nøkkel. Legg til pollineringsleverandøren med et tomt nøkkelfelt, og det fungerer umiddelbart.

### 🟠 CLOUDFLARE WORKERS AI (gratis API-nøkkel — cloudflare.com) 🆕

| Nivå   | Daglige nevroner | Tilsvarende bruk                           | Merknader                 |
| ------ | ---------------- | ------------------------------------------ | ------------------------- |
| Gratis | **10 000**       | ~150 LLM resp / 500s lyd / 15K innebygging | Global edge, 50+ modeller |

Populære gratismodeller: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (gratis lyd!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Krever API-token + konto-ID fra [dash.cloudflare.com](https://dash.cloudflare.com). Lagre konto-ID i leverandørinnstillingene.

### 🟣 SCALEWAY AI (1M gratis tokens — scaleway.com) 🆕

| Nivå   | Gratis kvote           | Plassering   | Merknader                                     |
| ------ | ---------------------- | ------------ | --------------------------------------------- |
| Gratis | **1 millioner tokens** | 🇫🇷 Paris, EU | Ingen kredittkort nødvendig innenfor grensene |

Gratis tilgjengelig: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> EU/GDPR-kompatibel. Få API-nøkkel på [console.scaleway.com](https://console.scaleway.com).

> **💡 Den ultimate gratisstakken (11 leverandører, $0 for alltid):**
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

## 🎙️ Gratis transkripsjonskombinasjon

> Transkriber hvilken som helst lyd/video for **$0** — Deepgram-emner med $200 gratis, AssemblyAI $50 reserve, Groq Whisper som ubegrenset nødbackup.

| Leverandør        | Gratis kreditter            | Beste modell                                | Satsgrense                           |
| ----------------- | --------------------------- | ------------------------------------------- | ------------------------------------ |
| **Deepgram**      | **$200 gratis** (påmelding) | `nova-3` — beste nøyaktighet, 30+ språk     | Ingen RPM-grense på gratis kreditter |
| 🔵 **AssemblyAI** | **$50 gratis** (påmelding)  | `universal-3-pro` — kapitler, følelser, PII | Ingen RPM-grense på gratis kreditter |
| 🔴 **Groq**       | **Gratis for alltid**       | `whisper-large-v3` — OpenAI Whisper         | 30 RPM (hastighetsbegrenset)         |

**Foreslått kombinasjon i `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Deretter i `/dashboard/media` → **Transkripsjon**-fanen: last opp hvilken som helst lyd- eller videofil → velg det kombinasjonsendepunktet → få transkripsjon i støttede formater.

## 💡 Nøkkelfunksjoner

OmniRoute v2.0 er bygget som en operativ plattform, ikke bare en reléproxy.

### 🆕 Nytt — ClawRouter-inspirerte forbedringer (mars 2026)

| Funksjon                                 | Hva det gjør                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Fast Family**                | xAI-modeller til $0,20/$0,50/M — benchmarked 1143ms (30 % raskere enn Gemini 2.5 Flash)                 |
| 🧠 **GLM-5 via Z.AI**                    | 128K utdatakontekst, $0,5/1M — nyeste flaggskip fra GLM-familien                                        |
| 🔮 **MiniMax M2.5**                      | Resonnering + agentoppgaver til $0,30/1M — betydelig oppgradering fra M2.1                              |
| 🎯 **verktøy Calling Flag per modell**   | Per modell `toolCalling: true/false` i registeret — AutoCombo hopper over modeller som ikke kan verktøy |
| 🌍 **Flerspråklig hensiktsgjenkjenning** | PT/ZH/ES/AR nøkkelord i AutoCombo scoring — bedre modellvalg for ikke-engelsk innhold                   |
| 📊 **Referansedrevne fallbacks**         | Ekte p95-forsinkelse fra live-forespørsler feeds combo scoring — AutoCombo lærer av faktiske data       |
| 🔁 **Be om deduplisering**               | Innhold-hash-basert dedup-vindu – multi-agent trygt, forhindrer dupliserte belastninger                 |
| 🔌 **Plugbar ruterstrategi**             | Utvidbart `RouterStrategy`-grensesnitt — legg til tilpasset rutinglogikk som plugins                    |

### 🚀 Forrige v2.0.9+ — Lekeplass, CLI-fingeravtrykk og ACP

| Funksjon                                      | Hva det gjør                                                                                                                                                                                                                                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Modell lekeplass**                       | Dashboard-side for å teste hvilken som helst modell direkte — leverandør/modell/endepunktvelgere, Monaco Editor, streaming, avbryt, timing                                                                                                                                                     |
| 🔏 **CLI Fingerprint Matching**               | Bestilling av topptekst/kropp per leverandør for å matche native CLI-signaturer – bytt per leverandør i Innstillinger > Sikkerhet. **Din proxy-IP er bevart**                                                                                                                                  |
| 🤝 **ACP Support (Agent Client Protocol)**    | CLI-agentoppdagelse (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 til), prosessoppstarter, `/api/acp/agents` endepunkt                                                                                                                                                                       |
| 🤖 **ACP Agents Dashboard**                   | Feilsøking › Agenter-side — rutenett med 14 agenter med installasjonsstatus, versjon, tilpasset agentskjema for et hvilket som helst CLI-verktøy. **OpenCode**-brukere får en "Last ned opencode.json"-knapp som automatisk genererer en klar-til-bruk konfig med alle tilgjengelige modeller. |
| 🔧 **Egendefinert modell `apiFormat` Ruting** | Egendefinerte modeller med `apiFormat: "responses"` rutes nå riktig til Responses API-oversetteren                                                                                                                                                                                             |
| 🏢 **Codex Workspace Isolering**              | Flere Codex-arbeidsområder per e-post — OAuth skiller tilkoblinger riktig etter arbeidsområde-ID                                                                                                                                                                                               |
| 🔄 **Automatisk oppdatering av elektroner**   | Desktop-app ser etter oppdateringer + automatisk installering ved omstart                                                                                                                                                                                                                      |

### 🤖 Agent- og protokolloperasjoner (v2.0)

| Funksjon                                 | Hva det gjør                                                                                          |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 🔧 **MCP-server (16 verktøy)**           | IDE/agent-verktøy via 3 transporter: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`) |
| 🤝 **A2A-server (JSON-RPC + SSE)**       | Agent-til-agent oppgavekjøring med synkronisering og strømmeflyter                                    |
| 🧭 **Side for konsoliderte endepunkter** | Fanebasert administrasjonsside med Endpoint Proxy, MCP, A2A og API Endpoints faner                    |
| 🎚️ **Tjenesteaktiver/deaktiver brytere** | PÅ/AV-brytere for MCP og A2A med innstillingsfasthet (standard: AV)                                   |
| 🛰️ **MCP Runtime Heartbeat**             | Reell prosessstatus (pid, oppetid, hjerteslagsalder, transport, omfangsmodus)                         |
| 📋 **MCP Audit Trail**                   | Filtrerbare revisjonslogger med suksess/fiasko og nøkkelattribusjon                                   |
| 🔐 **MCP Scope Enforcement**             | 9 granulære omfangstillatelser for kontrollert verktøytilgang                                         |
| 📡 **A2A Task Lifecycle Management**     | List/filtrer oppgaver, inspiser hendelser/artefakter, avbryt kjørende oppgaver                        |
| 📋 **Agent Card Discovery**              | `/.well-known/agent.json` for automatisk oppdagelse av klient                                         |
| 🧪 **Protocol E2E Test Sele**            | Ekte MCP SDK + A2A klient flyter i `test:protocols:e2e`                                               |
| ⚙️ **Operasjonskontroller**              | Bytt kombinasjon, påfør elastisitetsprofiler, tilbakestill brytere fra én kontrollflate               |

### 🧠 Ruting og intelligens

| Funksjon                            | Hva det gjør                                                                |
| ----------------------------------- | --------------------------------------------------------------------------- |
| 🎯 **Smart 4-lags fallback**        | Automatisk rute: Abonnement → API-nøkkel → Billig → Gratis                  |
| 📊 **Sanntidskvotesporing**         | Live tokenantall + tilbakestilt nedtelling per leverandør                   |
| 🔄 **Formatoversettelse**           | OpenAI ↔ Claude ↔ Gemini ↔ Svar med skjemasikre konverteringer              |
| 👥 **Støtte for flere kontoer**     | Flere kontoer per leverandør med intelligent utvalg                         |
| 🔄 **Auto Token Refresh**           | OAuth-tokens oppdateres automatisk med prøv på nytt                         |
| 🎨 **Egendefinerte kombinasjoner**  | 6 balansestrategier + reservekjedekontroll                                  |
| 🌐 **Wildcard-ruter**               | `provider/*` dynamisk ruting                                                |
| 🧠 **Tenker budsjettkontroller**    | Begrensninger for gjennomgang, automatisk, tilpasset og adaptiv resonnement |
| 🔀 **Modellaliaser**                | Innebygd + tilpasset modellaliasing og migrasjonssikkerhet                  |
| ⚡ **Bakgrunnsforringelse**         | Rut lavprioriterte bakgrunnsoppgaver til billigere modeller                 |
| 🧪 **Task-Aware Smart Ruting**      | Auto-velg modell etter innholdstype (koding/visjon/analyse/oppsummering)    |
| 💬 **Systemprompt-injeksjon**       | Globale atferdskontroller brukes konsekvent                                 |
| 📄 **Responses API-kompatibilitet** | Full `/v1/responses` støtte for Codex og avanserte agentarbeidsflyter       |

### 🎵 Multi-Modal APIer

| Funksjon                | Hva det gjør                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🖼️ **Bildegenerering**  | `/v1/images/generations` med sky og lokale backends                                                                                                                            |
| 📐 **Innbygging**       | `/v1/embeddings` for søk og RAG-rørledninger                                                                                                                                   |
| 🎤 **Lydtranskripsjon** | `/v1/audio/transcriptions` — 7 leverandører (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), automatisk språkdeteksjon, MP4/MP3/WAV-støtte |
| 🔊 **Tekst-til-tale**   | `/v1/audio/speech` — 10 leverandører (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) med riktige feilmeldinger             |
| 🎬 **Videogenerering**  | `/v1/videos/generations` (ComfyUI + SD WebUI arbeidsflyter)                                                                                                                    |
| 🎵 **Musikkgenerasjon** | `/v1/music/generations` (ComfyUI-arbeidsflyter)                                                                                                                                |
| 🛡️ **Moderasjoner**     | `/v1/moderations` sikkerhetssjekker                                                                                                                                            |
| 🔀 **Omrangering**      | `/v1/rerank` for relevansscoring                                                                                                                                               |
| 🔍 **Nettsøk** 🆕       | `/v1/search` — 5 leverandører (Serper, Brave, Perplexity, Exa, Tavily), 6500+ gratis/måned, auto-failover, cache                                                               |

### 🛡️ Resiliens, sikkerhet og styring

| Funksjon                            | Hva det gjør                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| 🔌 **Maksimalbrytere**              | Per modell tur/gjenoppretting med terskelkontroller                                                 |
| 🎯 **Endepunktbevisste modeller**   | Egendefinerte modeller erklærer støttede endepunkter + API-format                                   |
| 🛡️ **Anti-tordenflokk**             | Mutex + semaforbeskyttelse ved forsøk på nytt/rate hendelser                                        |
| 🧠 **Semantisk + signaturbuffer**   | Kostnads-/forsinkelsesreduksjon med to hurtigbufferlag                                              |
| ⚡ **Be om idempotens**             | Duplisert beskyttelsesvindu                                                                         |
| 🔒 **TLS-fingeravtrykkspoofing**    | Nettleserlignende TLS-fingeravtrykk — **reduserer botdeteksjon og kontoflagging**                   |
| 🔏 **CLI Fingerprint Matching**     | Matcher native CLI-forespørselssignaturer — **reduserer utestengelsesrisiko mens proxy-IP bevares** |
| 🌐 **IP-filtrering**                | Tillatelsesliste/blokkeringslistekontroll for eksponerte distribusjoner                             |
| 📊 **Redigerbare satsgrenser**      | Konfigurerbare grenser på globalt nivå/leverandørnivå med utholdenhet                               |
| 🔑 **API Key Management + Scoping** | Sikker nøkkelutstedelse/rotasjon og modell/leverandørkontroller                                     |
| 🛡️ **Beskyttet `/models`**          | Valgfri godkjenning og leverandørskjul for modellkatalog                                            |

### 📊 Observerbarhet og analyse

| Funksjon                           | Hva det gjør                                                     |
| ---------------------------------- | ---------------------------------------------------------------- |
| 📝 **Forespørsel + proxy-logging** | Full forespørsel/svar og proxy-logging                           |
| 📋 **Unified Logs Dashboard**      | Forespørsels-, proxy-, revisjons- og konsollvisninger på én side |
| 🔍 **Be om telemetri**             | p50/p95/p99 ventetid og forespørselssporing                      |
| 🏥 **Helse Dashboard**             | Oppetid, breaker-tilstander, lockouts, cachestatistikk           |
| 💰 **Kostnadssporing**             | Budsjettkontroller og prissetting per modell                     |
| 📈 **Analytics-visualiseringer**   | Modell-/leverandørbruksinnsikt og trendvisninger                 |
| 🧪 **Evalueringsramme**            | Gylden sett-testing med konfigurerbare kampstrategier            |

### ☁️ Utrulling og plattform

| Funksjon                                  | Hva det gjør                                                      |
| ----------------------------------------- | ----------------------------------------------------------------- |
| 🌐 **Distribuer hvor som helst**          | Localhost, VPS, Docker, Cloud-miljøer                             |
| 💾 **Cloud Sync**                         | Konfigurasjonssynkronisering via skyarbeider                      |
| 🔄 **Sikkerhetskopiering/gjenoppretting** | Eksport/import og gjenopprettingsflyter                           |
| 🧙 **Onboarding Wizard**                  | Førstegangs veiledet oppsett                                      |
| 🔧 **CLI Tools Dashboard**                | Ett-klikks oppsett for populære kodeverktøy                       |
| 🎮 **Modell lekeplass**                   | Test hvilken som helst leverandør/modell/endepunkt fra dashbordet |
| 🔏 **CLI Fingerprint Toggle**             | Fingeravtrykksmatching per leverandør i Innstillinger > Sikkerhet |
| 🌐 **i18n (30 språk)**                    | Fullt dashbord + støtte for dokumentspråk med RTL-dekning         |
| 🧹 **Slett alle modeller**                | Sletting av modellliste med ett klikk i leverandørdetaljer        |
| 📋 **Utgavemaler**                        | Standardiserte GitHub-maler for feil og funksjoner                |
| 📂 **Tilpasset datakatalog**              | `DATA_DIR` overstyring for lagringssted                           |

### Feature Deep Dive

#### Smart fallback med praktisk kostnadskontroll

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Når kvote, sats eller helse svikter, flytter OmniRoute automatisk til neste kandidat uten manuelt bytte.

#### Protokolladministrasjon som er synlig og operativ

- MCP + A2A kan oppdages i brukergrensesnitt og dokumenter (ikke skjult)
- Protokollstatus-APIer avslører live driftsdata (`/api/mcp/*`, `/api/a2a/*`)
- Dashboards inkluderer handlinger for dag-2 operasjoner (kombinasjonsveksler, tilbakestilling av brytere, kansellering av oppgaver)

#### Oversetter + valideringsarbeidsflyt

Oversetterområdet inkluderer:

- **Lekeplass**: be om transformasjonssjekker
- **Chattetester**: full forespørsel/svar tur/retur
- **Testbenk**: flere kofferter i en kjøring
- **Live Monitor**: trafikkvisning i sanntid

Pluss protokollvalidering med ekte klienter via `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Verktøyreferanse, IDE-konfigurasjoner og klienteksempler
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Ferdigheter, JSON-RPC-metoder, strømming og oppgavelivssyklus

## 🧪 Evalueringer (evalueringer)

OmniRoute inkluderer et innebygd evalueringsrammeverk for å teste LLM-responskvaliteten mot et gyldent sett. Få tilgang til den via **Analytics → Evals** i dashbordet.

### Innebygd gyldent sett

Det forhåndsinnlastede "OmniRoute Golden Set" inneholder testtilfeller for:

- Hilsen, matematikk, geografi, kodegenerering
- Samsvar med JSON-format, oversettelse, generering av markdown
- Sikkerhetsavslag (skadelig innhold), telling, boolsk logikk

### Evalueringsstrategier

| Strategi   | Beskrivelse                                                           | Eksempel                         |
| ---------- | --------------------------------------------------------------------- | -------------------------------- |
| `exact`    | Utdata må samsvare nøyaktig med                                       | `"4"`                            |
| `contains` | Utdata må inneholde understreng (uavhengig av store og små bokstaver) | `"Paris"`                        |
| `regex`    | Utdata må samsvare med regulært uttrykksmønster                       | `"1.*2.*3"`                      |
| `custom`   | Egendefinert JS-funksjon returnerer true/false                        | `(output) => output.length > 10` |

---

## 📖 Oppsettveiledning

### Protokolloppsett (MCP + A2A)

<details>
<summary><b>🧩 MCP-oppsett (Model Context Protocol)</b></summary>

Start MCP-transport i stdio-modus:

```bash
omniroute --mcp
```

Anbefalt valideringsflyt:

1. Koble til MCP-klienten over stdio.
2. Kjør `omniroute_get_health`.
3. Kjør `omniroute_list_combos`.
4. Åpne `/dashboard/mcp` for å bekrefte hjerteslag, aktivitet og revisjon.

Nyttige APIer for automatisering:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A-oppsett (Agent2Agent)</b></summary>

Oppdag agenten:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Send en oppgave:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Administrer livssyklus:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Driftsgrensesnitt:

- `/dashboard/a2a` for observerbarhet for oppgave/tilstand/strøm og røykhandlinger

</details>

<details>
<summary><b>🧪 End-to-end protokollvalidering</b></summary>

Valider begge protokollene med ekte klienter:

```bash
npm run test:protocols:e2e
```

Dette bekrefter:

- MCP SDK-klient koble/liste/ringe
- A2A oppdagelse/send/stream/hent/avbryt
- Krysssjekk data i MCP-revisjon og A2A-oppgavestyrings-APIer

</details>

<details>
<summary><b>💳 Abonnementsleverandører</b></summary>

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

**Profftips:** Bruk Opus for komplekse oppgaver, Sonnet for hastighet. OmniRoute sporer kvote per modell!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Codex Account Limit Management (5 timer + ukentlig)

Hver Codex-konto har nå policy-vekslinger i `Dashboard -> Providers`:

- `5h` (PÅ/AV): håndhev terskelpolicyen for 5-timers vindu.
- `Weekly` (PÅ/AV): håndhev terskelpolicyen for ukentlige vindu.
- Terskeladferd: når et aktivert vindu når >=90 % bruk, hoppes den kontoen over.
- Rotasjonsatferd: OmniRoute ruter automatisk til neste kvalifiserte Codex-konto.
- Tilbakestill atferd: når leverandørens `resetAt` tid går, blir kontoen automatisk kvalifisert igjen.

Scenarier:

- `5h ON` + `Weekly ON`: kontoen hoppes over når et av vinduene når terskelen.
- `5h OFF` + `Weekly ON`: bare ukentlig bruk kan blokkere kontoen.
- `5h ON` + `Weekly OFF`: bare 5-timers bruk kan blokkere kontoen.
- `resetAt` bestått: kontoen går automatisk inn i rotasjon på nytt (ingen manuell reaktivering).

### Gemini CLI (GRATIS 180K/måned!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Mest verdi:** Enormt gratis nivå! Bruk dette før betalte nivåer.

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
<summary><b>🔑 API nøkkelleverandører</b></summary>

### NVIDIA NIM (GRATIS utviklertilgang — 70+ modeller)

1. Registrer deg: [build.nvidia.com](https://build.nvidia.com)
2. Få gratis API-nøkkel (1000 slutningspoeng inkludert)
3. Dashboard → Legg til leverandør → NVIDIA NIM:
   - API-nøkkel: `nvapi-your-key`

**Modeller:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` og 50+ til

**Profftips:** OpenAI-kompatibel API — fungerer sømløst med OmniRoutes formatoversettelse!

### DeepSeek

1. Registrer deg: [platform.deepseek.com](https://platform.deepseek.com)
2. Få API-nøkkel
3. Dashboard → Legg til leverandør → DeepSeek

**Modeller:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (gratis nivå tilgjengelig!)

1. Registrer deg: [console.groq.com](https://console.groq.com)
2. Få API-nøkkel (gratis nivå inkludert)
3. Dashboard → Legg til leverandør → Groq

**Modeller:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Profftips:** Ultrarask slutning — best for sanntidskoding!

### OpenRouter (100+ modeller)

1. Registrer deg: [openrouter.ai](https://openrouter.ai)
2. Få API-nøkkel
3. Dashboard → Legg til leverandør → OpenRouter

**Modeller:** Få tilgang til 100+ modeller fra alle store leverandører gjennom én enkelt API-nøkkel.

</details>

<details>
<summary><b>💰 Billige leverandører (backup)</b></summary>

### GLM-4.7 (Daglig tilbakestilling, $0,6/1M)

1. Registrer deg: [Zhipu AI](https://open.bigmodel.cn/)
2. Få API-nøkkel fra Coding Plan
3. Dashboard → Legg til API-nøkkel:
   - Leverandør: `glm`
   - API-nøkkel: `your-key`

**Bruk:** `glm/glm-4.7`

**Profftips:** Coding Plan tilbyr 3× kvote til 1/7 kostnad! Tilbakestill daglig 10:00.

### MiniMax M2.1 (5t tilbakestilling, $0,20/1M)

1. Registrer deg: [MiniMax](https://www.minimax.io/)
2. Få API-nøkkel
3. Dashboard → Legg til API-nøkkel

**Bruk:** `minimax/MiniMax-M2.1`

**Profftips:** Billigste alternativet for lang kontekst (1M tokens)!

### Kimi K2 ($9/mnd leilighet)

1. Abonner: [Moonshot AI](https://platform.moonshot.ai/)
2. Få API-nøkkel
3. Dashboard → Legg til API-nøkkel

**Bruk:** `kimi/kimi-latest`

**Profftips:** Fast $9/måned for 10M tokens = $0,90/1M effektiv kostnad!

</details>

<details>
<summary><b>🆓 GRATIS Leverandører (Emergency Backup)</b></summary>

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

### Qwen (4 GRATIS modeller via enhetskode)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude FREE)

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
<summary><b>🎨 Lag kombinasjoner</b></summary>

### Eksempel 1: Maksimer abonnement → Billig sikkerhetskopi

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Eksempel 2: Kun gratis (nullkostnad)

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
<summary><b>🔧 CLI-integrasjon</b></summary>

### Markør IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Bruk **CLI Tools**-siden i dashbordet for ett-klikks konfigurasjon, eller rediger `~/.claude/settings.json` manuelt.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Alternativ 1 – Dashboard (anbefalt):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Alternativ 2 — Manuell:** Rediger `~/.openclaw/openclaw.json`:

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

> **Merk:** OpenClaw fungerer bare med lokale OmniRoute. Bruk `127.0.0.1` i stedet for `localhost` for å unngå problemer med IPv6-oppløsning.

### Cline / Fortsett / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Trinn 1:** Legg til OmniRoute som en tilpasset leverandør:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Trinn 2:** Opprett/rediger `opencode.json` i prosjektroten din:

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

**Trinn 3:** Velg modellen i OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tips:** Legg til hvilken som helst modell som er tilgjengelig i OmniRoute `/v1/models`-endepunktet til `models`-delen. Bruk formatet `provider/model-id` fra OmniRoute-dashbordet.

</details>

---

## 🐛 Feilsøking

<details>
<summary><b>Klikk for å utvide feilsøkingsveiledningen</b></summary>

**«Språkmodellen ga ikke meldinger»**

- Leverandørkvoten er oppbrukt → Sjekk dashboardkvotesporing
- Løsning: Bruk kombinasjonsalternativ eller bytt til et billigere nivå

**Satsbegrensning**

- Abonnementskvote ut → Fallback til GLM/MiniMax
- Legg til kombinasjon: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth-token er utløpt**

- Automatisk oppdatering av OmniRoute
- Hvis problemene vedvarer: Dashboard → Leverandør → Koble til på nytt

**Høye kostnader**

- Sjekk bruksstatistikk i Dashboard → Kostnader
- Bytt primærmodell til GLM/MiniMax
- Bruk gratis nivå (Gemini CLI, iFlow) for ikke-kritiske oppgaver

**Dashboard/API-porter er feil**

- `PORT` er den kanoniske basisporten (og API-porten som standard)
- `API_PORT` overstyrer kun OpenAI-kompatibel API-lytter
- `DASHBOARD_PORT` overstyrer kun dashboard/Next.js-lytter
- Angi `NEXT_PUBLIC_BASE_URL` til dashbordet/den offentlige nettadressen din (for OAuth-tilbakeringing)

**Skysynkroniseringsfeil**

- Bekreft at `BASE_URL` peker på løpeforekomsten din
- Bekreft `CLOUD_URL` poeng til det forventede skyendepunktet
- Hold `NEXT_PUBLIC_*` verdier på linje med verdiene på tjenersiden

**Første pålogging fungerer ikke**

- Sjekk `INITIAL_PASSWORD` i `.env`
- Hvis det ikke er angitt, er reservepassordet `123456`

**Ingen forespørselslogger**

- Sett `ENABLE_REQUEST_LOGS=true` i `.env`

**Test viser «Ugyldig» for OpenAI-kompatible leverandører**

- Mange leverandører avslører ikke et `/models`-endepunkt
- OmniRoute v1.0.6+ inkluderer reservevalidering via chatfullføringer
- Sørg for at basis-URL inkluderer suffikset `/v1`

### 🔐 OAuth på en ekstern server

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Viktig for brukere som kjører OmniRoute på en VPS, Docker eller hvilken som helst ekstern server**

#### Hvorfor mislykkes Antigravity / Gemini CLI OAuth på eksterne servere?

**Antigravity** og **Gemini CLI**-leverandørene bruker **Google OAuth 2.0**. Google krever at `redirect_uri` i OAuth-flyten nøyaktig samsvarer med en av de forhåndsregistrerte URIene i appens Google Cloud Console.

OAuth-legitimasjonen som er samlet i OmniRoute er registrert **kun for `localhost`**. Når du får tilgang til OmniRoute på en ekstern server (f.eks. `https://omniroute.myserver.com`), avviser Google autentiseringen med:

```
Error 400: redirect_uri_mismatch
```

#### Løsning: Konfigurer din egen OAuth-legitimasjon

Du må opprette en **OAuth 2.0 Client ID** i Google Cloud Console med serverens URI.

#### Trinn-for-trinn

**1. Åpne Google Cloud Console**

Gå til: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Opprett en ny OAuth 2.0-klient-ID**

- Klikk **"+ Opprett legitimasjon"** → **"OAuth-klient-ID"**
- Søknadstype: **"Nettapplikasjon"**
- Navn: alt du liker (f.eks. `OmniRoute Remote`)

**3. Legg til autoriserte omdirigerings-URIer**

I feltet **«Authorized redirect URIs»** legger du til:

```
https://your-server.com/callback
```

> Erstatt `your-server.com` med serverens domene eller IP (inkluder porten om nødvendig, f.eks. `http://45.33.32.156:20128/callback`).

**4. Lagre og kopier legitimasjonen**

Etter oppretting vil Google vise **klient-ID** og **klienthemmelighet**.

**5. Angi miljøvariabler**

I `.env` (eller Docker-miljøvariabler):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Start OmniRoute** på nytt

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Prøv å koble til på nytt**

Dashboard → Leverandører → Antigravity (eller Gemini CLI) → OAuth

Google vil nå omdirigere riktig til `https://your-server.com/callback`.

---

#### Midlertidig løsning (uten egendefinert legitimasjon)

Hvis du ikke vil sette opp din egen legitimasjon akkurat nå, kan du fortsatt bruke den **manuelle URL-flyten**:

1. OmniRoute åpner Googles autorisasjons-URL
2. Etter godkjenning prøver Google å omdirigere til `localhost` (som mislykkes på den eksterne serveren)
3. **Kopiér hele nettadressen** fra nettleserens adressefelt (selv om siden ikke lastes inn)
4. Lim inn den URL-en i feltet vist i OmniRoute-tilkoblingsmodalen
5. Klikk på **"Koble til"**

> Dette fungerer fordi autorisasjonskoden i URL-en er gyldig uavhengig av om omdirigeringssiden er lastet.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Hva med OAuth gjør Antigravity / Gemini CLI falha em servidores remotos?

Os testedores **Antigravity** og **Gemini CLI** usam **Google OAuth 2.0** for autenticação. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas no Google Cloud Console do aplicativo.

Som credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (eks: `https://omniroute.meuservidor.com`), o Google avviser autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Løsning: Konfigurer OAuth-tilbehør

Você precisa criar um **OAuth 2.0 Client ID** no Google Cloud Console com en URI for seu service.

#### Passo a passo

**1. Tilgang til Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 Client ID**

- Klikk dem **"+ Opprett legitimasjon"** → **"OAuth-klient-ID"**
- Tipo de aplicativo: **"Nettapplikasjon"**
- Navn: escolha qualquer nome (eks.: `OmniRoute Remote`)

**3. Adicione som autorisert omdirigerings-URI**

Ingen campo **"Authorized redirect URIs"**, adicione:

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

Dashboard → Leverandører → Antigravity (ou Gemini CLI) → OAuth

Agora o Google redirecionará corretamente para `https://seu-servidor.com/callback` e a autenticação funcionará.

---

#### Midlertidig midlertidig løsning (som konfigurasjon av credenciais próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. O OmniRoute abrirá en URL fra autorização til Google
2. Após você autorizar, o Google tentará redirecionar for `localhost` (que falha no servidor remoto)
3. **Kopier en URL fullført** da barra de endereço do seu nettleseren (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Klikk dem **"Koble til"**

> Este workaround funciona porque or código de autorização na URL é válido independente do redirect ter carregado or não.

</details>

---

</details>

## 🛠️ Tech Stack

<details>
<summary><b>Klikk for å utvide tekniske stackdetaljer</b></summary>

- **Kjøretid**: Node.js 18–22 LTS (⚠️ Node.js 24+ støttes **ikke** — `better-sqlite3` native binærfiler er inkompatible)
- **Språk**: TypeScript 5.9 — **100 % TypeScript** på tvers av `src/` og `open-sse/` (null `any` i kjernemoduler siden v2.0)
- **Rammeverk**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (domenetilstand + proxy-logger + MCP-revisjon + rutingbeslutninger)
- **Skjemaer**: Zod (MCP-verktøy I/O-validering, API-kontrakter)
- **Protokoller**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Strøming**: Server-sendte hendelser (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-nøkler + MCP-omfanget autorisasjon
- **Test**: Node.js testløper + Vitest (900+ tester inkludert enhet, integrasjon, E2E)
- **CI/CD**: GitHub-handlinger (automatisk npm-publisering + Docker Hub ved utgivelse)
- **Nettsted**: [omniroute.online](https://omniroute.online)
- **Pakke**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resiliens**: Strømbryter, eksponentiell backoff, anti-trdnende flokk, TLS-spoofing, auto-combo selvhelbredelse

</details>

---

## 📖 Dokumentasjon

| Dokument                                       | Beskrivelse                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Leverandører, kombinasjoner, CLI-integrasjon, distribusjon        |
| [API Reference](docs/API_REFERENCE.md)         | Alle endepunkter med eksempler                                    |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP-verktøy, IDE-konfigurasjoner, Python/TS/Go-klienter        |
| [A2A Server](src/lib/a2a/README.md)            | JSON-RPC 2.0-protokoll, ferdigheter, streaming, oppgavehåndtering |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6-faktor scoring, moduspakker, selvhelbredende                    |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Vanlige problemer og løsninger                                    |
| [Architecture](docs/ARCHITECTURE.md)           | Systemarkitektur og innvendig                                     |
| [Contributing](CONTRIBUTING.md)                | Utviklingsoppsett og retningslinjer                               |
| [OpenAPI Spec](docs/openapi.yaml)              | OpenAPI 3.0-spesifikasjon                                         |
| [Security Policy](SECURITY.md)                 | Sårbarhetsrapportering og sikkerhetspraksis                       |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Komplett guide: VM + nginx + Cloudflare-oppsett                   |
| [Features Gallery](docs/FEATURES.md)           | Visuell dashbordomvisning med skjermbilder                        |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Valideringstrinn før utgivelse                                    |

---

## 🗺️ Veikart

OmniRoute har **210+ funksjoner planlagt** på tvers av flere utviklingsfaser. Her er nøkkelområdene:

| Kategori                         | Planlagte funksjoner | Høydepunkter                                                                                   |
| -------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| 🧠 **Routing og intelligens**    | 25+                  | Ruting med lavest ventetid, tag-basert ruting, forhåndskontroll av kvoter, valg av P2C-konto   |
| 🔒 **Sikkerhet og overholdelse** | 20+                  | SSRF-herding, tilsløring av legitimasjon, hastighetsgrense per endepunkt, styringsnøkkelomfang |
| 📊 **Observerbarhet**            | 15+                  | OpenTelemetry-integrasjon, kvoteovervåking i sanntid, kostnadssporing per modell               |
| 🔄 **Tilbyderintegrasjoner**     | 20+                  | Dynamisk modellregister, leverandørnedkjøling, multi-konto Codex, Copilot-kvoteparsing         |
| ⚡ **Ytelse**                    | 15+                  | Dobbelt hurtigbufferlag, promptbuffer, svarbuffer, streaming keepalive, batch API              |
| 🌐 **Økosystem**                 | 10+                  | WebSocket API, config hot-reload, distribuert config store, kommersiell modus                  |

### 🔜 Kommer snart

- 🔗 **OpenCode Integration** — Innebygd leverandørstøtte for OpenCode AI-kodings-IDE
- 🔗 **TRAE-integrasjon** — Full støtte for utviklingsrammeverket for TRAE AI
- 📦 **Batch API** — Asynkron batchbehandling for bulkforespørsler
- 🎯 **Tag-basert ruting** — Ruteforespørsler basert på tilpassede tagger og metadata
- 💰 **Laveste kostnadsstrategi** — Velg automatisk den billigste tilgjengelige leverandøren

> 📝 Full funksjonsspesifikasjoner tilgjengelig i [**OMNI_TOKEN_342**](docs/new-features/) (217 detaljerte spesifikasjoner)

---

## 👥 Bidragsytere

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Hvordan bidra

1. Fordel depotet
2. Lag din funksjonsgren (`git checkout -b feature/amazing-feature`)
3. Bekreft endringene dine (`git commit -m 'Add amazing feature'`)
4. Skyv til grenen (`git push origin feature/amazing-feature`)
5. Åpne en pull-forespørsel

Se [CONTRIBUTING.md](CONTRIBUTING.md) for detaljerte retningslinjer.

### Slipper en ny versjon

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Stjernehistorie

## Stjernekikkere over tid

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Anerkjennelser

Spesiell takk til **[9router](https://github.com/decolua/9router)** av **[decolua](https://github.com/decolua)** — det originale prosjektet som inspirerte denne gaffelen. OmniRoute bygger på det utrolige grunnlaget med tilleggsfunksjoner, multimodale APIer og en full TypeScript-omskriving.

Spesiell takk til **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — den originale Go-implementeringen som inspirerte denne JavaScript-porten.

---

## 📄 Lisens

MIT-lisens - se [LICENSE](LICENSE) for detaljer.

---

<div align="center">
  <sub>Bygget med ❤️ for utviklere som koder 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub-diskusjoner aktivert for spørsmål og svar fra fellesskapet -->
