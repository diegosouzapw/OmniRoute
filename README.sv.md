# 🚀 OmniRoute — Den kostnadsfria AI-gatewayen

### Sluta aldrig koda. Smart routing till **GRATIS & lågkostnads ​​AI-modeller** med automatisk reserv.

_Din universella API-proxy — en slutpunkt, 67+ leverantörer, noll driftstopp. Nu med **MCP & A2A** agentorkestrering._

**Slutförda chatt • Inbäddningar • Bildgenerering • Video • Musik • Ljud • Omrankning • **Webbsökning** • MCP-server • A2A-protokoll • 100 % TypeScript**

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

🌐 **Tillgänglig i:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Vad är nytt i v3.0.0

> **Uppgraderar du från v2.9.5?** — Se [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) för alla ändringar.

| Område                                   | Ändra                                                                                                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **CodeQL Security**                   | Fixade 10+ CodeQL-varningar: polynom-redos, insecure-randomness, shell-injection remediation                                                                                 |
| ✅ **Ruttvalidering**                    | Alla 176 API-rutter nu validerade med Zod-scheman + `validateBody()` — CI `check:route-validation:t06` pass                                                                  |
| 🐛 **omniModel Tag Leak**                | Interna `<omniModel>`-taggar läcker inte längre till klienter i SSE-strömningssvar (#585)                                                                                    |
| 🔑 **Registered Keys API**               | Autoprovision API-nycklar via `POST /api/v1/registered-keys` med kvotupprätthållande per leverantör/konto, idempotens, SHA-256-lagring och valfri GitHub-problemrapportering |
| 🎨 **Providerikoner**                    | 130+ leverantörslogotyper via `@lobehub/icons` (SVG) med PNG → generisk reservkedja                                                                                          |
| 🔄 **Modell Auto-Sync**                  | 24-timmars schemaläggare och manuellt användargränssnitt för att synkronisera modelllistor för inbyggda och anpassade OpenAI-kompatibla leverantörer                         |
| 🌐 **OpenCode Zen/Go**                   | Två nya leverantörer från @kang-heewon via PR #530: gratis nivå + prenumerationsnivå via `OpencodeExecutor`                                                                  |
| 🐛 **Gemini CLI OAuth**                  | Åtgärdsfel när `GEMINI_OAUTH_CLIENT_SECRET` saknas i Docker (var ett kryptiskt Google-fel)                                                                                   |
| 🐛 **OpenCode config**                   | `saveOpenCodeConfig()` skriver nu TOML korrekt till `XDG_CONFIG_HOME`                                                                                                        |
| 🐛 **Åsidosatt modell av fästad modell** | `body.model` korrekt inställd på `pinnedModel` på skydd av kontextcache                                                                                                      |
| 🐛 **Codex/Claude loop**                 | `tool_result` block nu konverterade till text för att stoppa oändliga loopar                                                                                                 |
| 🐛 **Omdirigering av inloggning**        | Inloggningen låser sig inte längre efter att ha hoppat över lösenordsinställningar                                                                                           |
| 🐛 **Fönstervägar**                      | MSYS2/Git-Bash-sökvägar (`/c/...`) normaliserade till `C:\...` automatiskt                                                                                                   |

---

## 🖼️ Huvudinstrumentpanel

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Förhandsgranskning av instrumentpanelen

<details>
<summary><b>Klicka för att se skärmdumpar på instrumentpanelen</b></summary>

| Sida                  | Skärmdump                                         |
| --------------------- | ------------------------------------------------- |
| **Leverantörer**      | ![Providers](docs/screenshots/01-providers.png)   |
| **Kombos**            | ![Combos](docs/screenshots/02-combos.png)         |
| **Analytics**         | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Hälsa**             | ![Health](docs/screenshots/04-health.png)         |
| **Översättare**       | ![Translator](docs/screenshots/05-translator.png) |
| **Inställningar**     | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI-verktyg**       | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Användningsloggar** | ![Usage](docs/screenshots/08-usage.png)           |
| **Slutpunkter**       | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Gratis AI-leverantör för dina favoritkodningsagenter

_Anslut alla AI-drivna IDE- eller CLI-verktyg via OmniRoute — gratis API-gateway för obegränsad kodning._

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

<sub>📡 Alla agenter ansluter via <code>http://localhost:20128/v1</code> eller <code>http://cloud.omniroute.online/v1__OMNI_TOKEN_466, — unlimited one config kvot</sub>

---

## 🤔 Varför OmniRoute?

**Sluta slösa pengar och nå gränser:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Prenumerationskvoten löper ut oanvänd varje månad
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Prisgränser stoppar dig mellankodning
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Dyra API:er ($20-50/månad per leverantör)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manuellt byte mellan leverantörer

**OmniRoute löser detta:**

- ✅ **Maximera prenumerationer** - Spåra kvot, använd varje bit innan återställning
- ✅ **Automatisk reserv** - Prenumeration → API-nyckel → Billigt → Gratis, noll driftstopp
- ✅ **Multi-konto** - Round-robin mellan konton per leverantör
- ✅ **Universal** - Fungerar med Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, vilket CLI-verktyg som helst

---

## 📧 Support

> 💬 **Gå med i vår community!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Få hjälp, dela tips och håll dig uppdaterad.

- **Webbplats**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Frågor**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Bidrar**: Se [CONTRIBUTING.md](CONTRIBUTING.md), öppna en PR eller välj en `good first issue`
- **Originalprojekt**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Rapportera en bugg?

När du öppnar ett problem, kör kommandot system-info och bifoga den genererade filen:

```bash
npm run system-info
```

Detta genererar en `system-info.txt` med din Node.js-version, OmniRoute-version, OS-detaljer, installerade CLI-verktyg (iflow, gemini, claude, codex, antigravity, droid, etc.), Docker/PM2-status och systempaket – allt vi behöver för att snabbt återskapa ditt problem. Bifoga filen direkt till ditt GitHub-problem.

---

## 🔄 Hur det fungerar

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

## 🎯 Vad OmniRoute löser — 30 verkliga smärtpunkter och användningsfall

> **Varje utvecklare som använder AI-verktyg möter dessa problem dagligen.** OmniRoute byggdes för att lösa dem alla — från kostnadsöverskridanden till regionala block, från trasiga OAuth-flöden till protokolloperationer och observerbarhet i företag.

<details>
<summary><b>💸 1. "Jag betalar för ett dyrt abonnemang men blir ändå avbruten av limits"</b></summary>

Utvecklare betalar $20–200/månad för Claude Pro, Codex Pro eller GitHub Copilot. Även om du betalar har kvoten ett tak - 5 timmars användning, veckogränser eller gränser per minut. Mid-coding session, leverantören slutar svara och utvecklaren tappar flöde och produktivitet.

**Hur OmniRoute löser det:**

- **Smart 4-lagers fallback** — Om prenumerationskvoten tar slut, omdirigeras automatiskt till API-nyckel → Billigt → Gratis med noll manuellt ingrepp
- **Kvotspårning i realtid** — Visar tokenförbrukning i realtid med återställningsnedräkning (5 timmar, dagligen, veckovis)
- **Multi-Account Support** — Flera konton per leverantör med automatisk round-robin — när ett tar slut, byter du till nästa
- **Anpassade kombinationer** — Anpassningsbara reservkedjor med 6 balanseringsstrategier (fill-first, round-robin, P2C, slumpmässig, minst använda, kostnadsoptimerad)
- **Codex Business Quotas** — Övervakning av företags-/teamarbetsutrymmeskvoter direkt i instrumentpanelen

</details>

<details>
<summary><b>🔌 2. "Jag måste använda flera leverantörer men alla har olika API"</b></summary>

OpenAI använder ett format, Claude (Anthropic) använder ett annat, Gemini ännu ett annat. Om en utvecklare vill testa modeller från olika leverantörer eller fallback mellan dem måste de konfigurera om SDK:er, ändra slutpunkter, hantera inkompatibla format. Anpassade leverantörer (FriendLI, NIM) har icke-standardiserade modellslutpunkter.

**Hur OmniRoute löser det:**

- **Unified Endpoint** — En enda `http://localhost:20128/v1` fungerar som proxy för alla 67+ leverantörer
- **Formatöversättning** — Automatisk och transparent: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Responssanering** — Tar bort icke-standardiserade fält (`x_groq`, `usage_breakdown`, `service_tier`) som bryter OpenAI SDK v1.83+
- **Rollnormalisering** — Konverterar `developer` → `system` för icke-OpenAI-leverantörer; `system` → `user` för GLM/ERNIE
- **Think Tag Extraction** — Extraherar `<think>`-block från modeller som DeepSeek R1 till standardiserade `reasoning_content`
- **Structured Output for Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatisk konvertering
- **`stream` är standard till `false`** - Justerar med OpenAI-specifikationen, undviker oväntad SSE i Python/Rust/Go SDK:er

</details>

<details>
<summary><b>🌐 3. "Min AI-leverantör blockerar min region/land"</b></summary>

Leverantörer som OpenAI/Codex blockerar åtkomst från vissa geografiska regioner. Användare får fel som `unsupported_country_region_territory` under OAuth- och API-anslutningar. Detta är särskilt frustrerande för utvecklare från utvecklingsländer.

**Hur OmniRoute löser det:**

- **3-Level Proxy Config** — Konfigurerbar proxy på 3 nivåer: global (all trafik), per leverantör (endast en leverantör) och per anslutning/nyckel
- **Färgkodade proxymärken** — Visuella indikatorer: 🟢 global proxy, 🟡 leverantörsproxy, 🔵 anslutningsproxy, visar alltid IP:n
- **OAuth Token Exchange Through Proxy** — OAuth-flödet går också genom proxyn och löser `unsupported_country_region_territory`
- **Anslutningstester via proxy** — Anslutningstester använder den konfigurerade proxyn (ingen mer direkt förbikoppling)
- **SOCKS5-stöd** — Fullständigt SOCKS5-proxystöd för utgående routing
- **TLS Fingerprint Spoofing** — Webbläsarliknande TLS-fingeravtryck via `wreq-js` för att kringgå botdetektering
- **🔏 CLI Fingerprint Matching** — Ordnar om rubriker och kroppsfält för att matcha inbyggda CLI-binära signaturer, vilket drastiskt minskar risken för kontoflaggning. Proxy-IP:n bevaras – du får både smyg **och** IP-maskering samtidigt

</details>

<details>
<summary><b>🆓 4. "Jag vill använda AI för kodning men jag har inga pengar"</b></summary>

Alla kan inte betala $20–200/månad för AI-prenumerationer. Studenter, utvecklare från tillväxtländer, hobbyister och frilansare behöver tillgång till kvalitetsmodeller utan kostnad.

**Hur OmniRoute löser det:**

- **Gratis leverantörer inbyggda** — Inbyggt stöd för 100 % gratis leverantörer: iFlow (5 obegränsade modeller via OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen: 4 unlimited-modeller,-r qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID gratis), Gemini CLI (180K tokens/månad gratis)
- **Ollama Cloud** — Molnvärdade Ollama-modeller på `api.ollama.com` med gratis nivå "Lätt användning"; använd `ollamacloud/<model>` prefix
- **Free-Only Combos** — Chain `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/månad utan stilleståndstid
- **NVIDIA NIM fri tillgång** — ~40 RPM dev-för evigt fri tillgång till 70+ modeller på build.nvidia.com (övergång från krediter till rena hastighetsgränser)
- **Kostnadsoptimerad strategi** — Routingstrategi som automatiskt väljer den billigaste tillgängliga leverantören

</details>

<details>
<summary><b>🔒 5. "Jag behöver skydda min AI-gateway från obehörig åtkomst"</b></summary>

När du exponerar en AI-gateway för nätverket (LAN, VPS, Docker) kan vem som helst med adressen konsumera utvecklarens tokens/kvot. Utan skydd är API:er sårbara för missbruk, snabb injektion och missbruk.

**Hur OmniRoute löser det:**

- **API Key Management** — Generering, rotation och omfattning per leverantör med en dedikerad `/dashboard/api-manager` sida
- **Behörigheter på modellnivå** — Begränsa API-nycklar till specifika modeller (`openai/*`, jokerteckenmönster), med växlingen Tillåt alla/Begränsa
- **API Endpoint Protection** — Kräv en nyckel för `/v1/models` och blockera specifika leverantörer från listan
- **Auth Guard + CSRF-skydd** — Alla instrumentpanelsrutter skyddade med `withAuth` middleware + CSRF-tokens
- **Rate Limiter** — Per-IP-hastighetsbegränsning med konfigurerbara fönster
- **IP-filtrering** — Tillåtelselista/blockeringslista för åtkomstkontroll
- **Prompt Injection Guard** — Sanering mot skadliga promptmönster
- **AES-256-GCM-kryptering** — Autentiseringsuppgifter krypterade i vila

</details>

<details>
<summary><b>🛑 6. "Min leverantör gick ner och jag tappade mitt kodningsflöde"</b></summary>

AI-leverantörer kan bli instabila, returnera 5xx-fel eller nå tillfälliga hastighetsgränser. Om en utvecklare är beroende av en enskild leverantör avbryts de. Utan strömbrytare kan upprepade försök krascha programmet.

**Hur OmniRoute löser det:**

- **Circuit Breaker per modell** — Autoöppning/stängning med konfigurerbara trösklar och nedkylning (stängd/öppen/halvöppen), omfattning per modell för att undvika kaskadblock
- **Exponentiell backoff** — Progressiva fördröjningar igen
- **Anti-Thundering Herd** — Mutex + semaforskydd mot samtidiga stormar igen
- **Combo reservkedjor** — Om den primära leverantören misslyckas, faller den automatiskt genom kedjan utan ingrepp
- **Combo Circuit Breaker** - Inaktiverar automatiskt felande leverantörer inom en kombinationskedja
- **Health Dashboard** — Drifttidsövervakning, strömbrytartillstånd, låsningar, cachestatistik, p50/p95/p99 latens

</details>

<details>
<summary><b>🔧 7. "Att konfigurera varje AI-verktyg är tråkigt och repetitivt"</b></summary>

Utvecklare använder Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Varje verktyg behöver en annan konfiguration (API-slutpunkt, nyckel, modell). Att konfigurera om när man byter leverantör eller modell är ett slöseri med tid.

**Hur OmniRoute löser det:**

- **CLI Tools Dashboard** — Dedikerad sida med ett-klicksinställningar för Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Genererar `chatLanguageModels.json` för VS-kod med bulkmodellval
- **Onboarding Wizard** — Guidad 4-stegs installation för förstagångsanvändare
- **En slutpunkt, alla modeller** — Konfigurera `http://localhost:20128/v1` en gång, få tillgång till 67+ leverantörer

</details>

<details>
<summary><b>🔑 8. "Hantera OAuth-tokens från flera leverantörer är ett helvete"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — alla använder OAuth 2.0 med utgående tokens. Utvecklare måste autentisera på nytt hela tiden, ta itu med `client_secret is missing`, `redirect_uri_mismatch` och fel på fjärrservrar. OAuth på LAN/VPS är särskilt problematiskt.

**Hur OmniRoute löser det:**

- **Automatisk uppdatering av token** — OAuth-tokens uppdateras i bakgrunden innan de löper ut
- **OAuth 2.0 (PKCE) Inbyggd** — Automatiskt flöde för Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Flera konton per leverantör via JWT/ID-tokenextraktion
- **OAuth LAN/Remote Fix** — Privat IP-detektering för `redirect_uri` + manuellt URL-läge för fjärrservrar
- **OAuth Behind Nginx** — Använder `window.location.origin` för omvänd proxykompatibilitet
- **Remote OAuth Guide** — Steg-för-steg-guide för Google Cloud-uppgifter på VPS/Docker

</details>

<details>
<summary><b>📊 9. "Jag vet inte hur mycket jag spenderar eller var"</b></summary>

Utvecklare använder flera betalleverantörer men har ingen enhetlig syn på utgifter. Varje leverantör har sin egen faktureringspanel, men det finns ingen konsoliderad vy. Oväntade kostnader kan hopa sig.

**Hur OmniRoute löser det:**

- **Kostnadsanalysinstrumentpanel** — Kostnadsspårning per token och budgethantering per leverantör
- **Budgetgränser per nivå** — Utgiftstak per nivå som utlöser automatisk reserv
- **Priskonfiguration per modell** — Konfigurerbara priser per modell
- **Användningsstatistik per API-nyckel** — Antal förfrågningar och senast använda tidsstämpel per nyckel
- **Analytics Dashboard** — Statistikkort, modellanvändningsdiagram, leverantörstabell med framgångsfrekvens och latens

</details>

<details>
<summary><b>🐛 10. "Jag kan inte diagnostisera fel och problem i AI-samtal"</b></summary>

När ett samtal misslyckas vet inte utvecklaren om det var en hastighetsgräns, utgången token, fel format eller leverantörsfel. Fragmenterade loggar över olika terminaler. Utan observerbarhet är felsökning att trial-and-error.

**Hur OmniRoute löser det:**

- **Unified Logs Dashboard** — 4 flikar: Request Logs, Proxy Logs, Audit Logs, Console
- **Console Log Viewer** — Viewer i realtid i terminalstil med färgkodade nivåer, automatisk rullning, sökning, filtrering
- **SQLite Proxy-loggar** — Beständiga loggar som överlever serverstarter
- **Translator Playground** — 4 felsökningslägen: Playground (formatöversättning), Chat Tester (tur och retur), Testbänk (batch), Live Monitor (realtid)
- **Request Telemetri** — p50/p95/p99 latens + X-Request-Id-spårning
- **Filbaserad loggning med rotation** — Konsolinterceptor fångar allt till JSON-logg med storleksbaserad rotation
- **Systeminforapport** — `npm run system-info` genererar `system-info.txt` med din fullständiga miljö (nodversion, OmniRoute-version, OS, CLI-verktyg, Docker/PM2-status). Bifoga den när du rapporterar problem för omedelbar triage.

</details>

<details>
<summary><b>🏗️ 11. "Det är komplext att distribuera och underhålla gatewayen"</b></summary>

Att installera, konfigurera och underhålla en AI-proxy i olika miljöer (lokalt, VPS, Docker, moln) är arbetskrävande. Problem som hårdkodade sökvägar, `EACCES` på kataloger, portkonflikter och plattformsoberoende konstruktioner skapar friktion.

**Hur OmniRoute löser det:**

- **npm global installation** — `npm install -g omniroute && omniroute` — klar
- **Docker Multi-Platform** — AMD64 + ARM64 inbyggt (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (inga CLI-verktyg) och `cli` (med Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — Inbyggd app för Windows/macOS/Linux med systemfältet, autostart, offlineläge
- **Split-Port Mode** — API och Dashboard på separata portar för avancerade scenarier (omvänd proxy, containernätverk)
- **Cloud Sync** — Konfigurera synkronisering mellan enheter via Cloudflare Workers
- **DB-säkerhetskopior** — Automatisk säkerhetskopiering, återställning, export och import av alla inställningar

</details>

<details>
<summary><b>🌍 12. "Gränssnittet är endast engelska och mitt team talar inte engelska"</b></summary>

Lag i icke-engelsktalande länder, särskilt i Latinamerika, Asien och Europa, kämpar med enbart engelska gränssnitt. Språkbarriärer minskar användningen och ökar konfigurationsfelen.

**Hur OmniRoute löser det:**

- **Dashboard i18n — 30 språk** — Alla 500+ nycklar översatta inklusive arabiska, bulgariska, danska, tyska, spanska, finska, franska, hebreiska, hindi, ungerska, indonesiska, italienska, japanska, koreanska, malaysiska, holländska, norska, polska, portugisiska (PT/BR), rumänska, ryska, thailändska, ukrainska, ukrainska, kinesiska, engelska, ukrainska, vietnamesiska, kinesiska, ukrainska, vietnamesiska, ukrainska, svenska
- **RTL-stöd** — Höger-till-vänster-stöd för arabiska och hebreiska
- **Multi-Language READMEs** — 30 fullständiga dokumentationsöversättningar
- **Språkväljare** — Globikon i rubriken för växling i realtid

</details>

<details>
<summary><b>🔄 13. "Jag behöver mer än chatt — jag behöver inbäddningar, bilder, ljud"</b></summary>

AI är inte bara att slutföra chatt. Utvecklare måste generera bilder, transkribera ljud, skapa inbäddningar för RAG, ranka om dokument och moderera innehåll. Varje API har olika slutpunkt och format.

**Hur OmniRoute löser det:**

- **Inbäddningar** — `/v1/embeddings` med 6 leverantörer och 9+ modeller
- **Bildgenerering** — `/v1/images/generations` med 10 leverantörer och 20+ modeller (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-till-video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) och SD WebUI
- **Text-till-musik** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Ljudtranskription** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-till-tal** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + befintliga leverantörer
- **Moderationer** — `/v1/moderations` — Innehållssäkerhetskontroller
- **Omrankning** — `/v1/rerank` — Omrankning av dokumentrelevans
- **Responses API** — Fullständigt `/v1/responses`-stöd för Codex

</details>

<details>
<summary><b>🧪 14. "Jag har inget sätt att testa och jämföra kvalitet mellan olika modeller"</b></summary>

Utvecklare vill veta vilken modell som är bäst för deras användningsfall - kod, översättning, resonemang - men det går långsamt att jämföra manuellt. Det finns inga integrerade utvärderingsverktyg.

**Hur OmniRoute löser det:**

- **LLM-utvärderingar** — Golden set-testning med 10 förinstallerade fall som täcker hälsningar, matematik, geografi, kodgenerering, JSON-efterlevnad, översättning, markdown, säkerhetsvägran
- **4 matchningsstrategier** — `exact`, `contains`, `regex`, `custom` (JS-funktion)
- **Translator Playground Test Bench** — Batchtestning med flera ingångar och förväntade utgångar, jämförelse mellan olika leverantörer
- **Chatttestare** — Fullständig tur och retur med visuell responsåtergivning
- **Live Monitor** — Realtidsström av alla förfrågningar som flödar genom proxyn

</details>

<details>
<summary><b>📈 15. "Jag behöver skala utan att förlora prestanda"</b></summary>

När förfrågningsvolymen ökar, utan att cachelagra genererar samma frågor dubbla kostnader. Utan idempotens, dubbletter begär avfallshantering. Prisgränser per leverantör måste respekteras.

**Hur OmniRoute löser det:**

- **Semantisk cache** — Tvåskiktscache (signatur + semantisk) minskar kostnaden och fördröjningen
- **Request Idempotency** — 5s dedupliceringsfönster för identiska förfrågningar
- **Rate Limit Detection** — RPM per leverantör, min gap och max samtidig spårning
- **Redigerbara hastighetsgränser** — Konfigurerbara standardinställningar i Inställningar → Motståndskraft med uthållighet
- **API Key Validation Cache** — 3-lagers cache för produktionsprestanda
- **Hälsoinstrumentpanel med telemetri** — p50/p95/p99 latens, cachestatistik, drifttid

</details>

<details>
<summary><b>🤖 16. "Jag vill kontrollera modellbeteende globalt"</b></summary>

Utvecklare som vill ha alla svar på ett specifikt språk, med en specifik ton, eller som vill begränsa resonemangstokens. Att konfigurera detta i varje verktyg/förfrågan är opraktiskt.

**Hur OmniRoute löser det:**

- **System Prompt Injection** — Global prompt tillämpas på alla förfrågningar
- **Thinking Budget Validation** — Reasoning token allocation control per request (passthrough, auto, custom, adaptive)
- **6 routingstrategier** — Globala strategier som avgör hur förfrågningar distribueras
- **Wildcard Router** — `provider/*` mönster dirigeras dynamiskt till vilken leverantör som helst
- **Kombo Aktivera/Inaktivera Växla** — Växla kombinationer direkt från instrumentpanelen
- **Visa leverantör** — Aktivera/inaktivera alla anslutningar för en leverantör med ett klick
- **Blockerade leverantörer** — Exkludera specifika leverantörer från `/v1/models`-listan

</details>

<details>
<summary><b>🧰 17. "Jag behöver MCP-verktyg som förstklassiga produktegenskaper"</b></summary>

Många AI-gateways exponerar MCP endast som en dold implementeringsdetalj. Team behöver ett synligt, hanterbart driftlager.

**Hur OmniRoute löser det:**

- MCP visas på navigeringspanelen och fliken för slutpunktsprotokoll
- Dedikerad MCP-hanteringssida med process, verktyg, omfattningar och revision
- Inbyggd snabbstart för `omniroute --mcp` och klientintroduktion

</details>

<details>
<summary><b>🧠 18. "Jag behöver A2A-orkestrering med synkronisering + strömningssökvägar"</b></summary>

Agentarbetsflöden kräver både direkta svar och långvarig streamad exekvering med livscykelkontroll.

**Hur OmniRoute löser det:**

- A2A JSON-RPC-slutpunkt (`POST /a2a`) med `message/send` och `message/stream`
- SSE-strömning med terminaltillståndspridning
- Task lifecycle API:er för `tasks/get` och `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Jag behöver riktig MCP-processhälsa, inte gissad status"</b></summary>

Operativa team måste veta om MCP faktiskt lever, inte bara om ett API är tillgängligt.

**Hur OmniRoute löser det:**

- Runtime heartbeat-fil med PID, tidsstämplar, transport, verktygsräkning och scope-läge
- MCP status API som kombinerar hjärtslag + senaste aktivitet
- UI-statuskort för process/upptid/hjärtslagsnyhet

</details>

<details>
<summary><b>📋 20. "Jag behöver revisionsbart MCP-verktygsexekvering"</b></summary>

När verktyg muterar konfiguration eller utlöser operationsåtgärder behöver team rättsmedicinsk spårbarhet.

**Hur OmniRoute löser det:**

- SQLite-stödd revisionsloggning för MCP-verktygsanrop
- Filtrerar efter verktyg, framgång/misslyckande, API-nyckel och paginering
- Dashboard revisionstabell + statistikslutpunkter för automatisering

</details>

<details>
<summary><b>🔐 21. "Jag behöver scoped MCP-behörigheter per integration"</b></summary>

Olika klienter bör ha minst privilegierad åtkomst till verktygskategorier.

**Hur OmniRoute löser det:**

- 9 granulära MCP-scopes för kontrollerad verktygsåtkomst
- Tillämpning av omfattning och synlighet i MCP-hanteringsgränssnitt
- Säker standardställning för operativa verktyg

</details>

<details>
<summary><b>⚙️ 22. "Jag behöver operativa kontroller utan att omdistribuera"</b></summary>

Team behöver snabba körtidsförändringar under incidenter eller kostnadshändelser.

**Hur OmniRoute löser det:**

- Växla kombinationsaktivering direkt från MCP-instrumentpanelen
- Tillämpa motståndskraftsprofiler från fördefinierade policypaket
- Återställ strömbrytarens tillstånd från samma manöverpanel

</details>

<details>
<summary><b>🔄 23. "Jag behöver synlighet och annullering av livscykeln för A2A-uppgiften"</b></summary>

Utan livscykelsynlighet blir uppgiftsincidenter svåra att triage.

**Hur OmniRoute löser det:**

- Uppgiftslista/filtrering efter stat/färdighet med sidnumrering
- Drill down på uppgiftens metadata, händelser och artefakter
- Slutpunkt för annullering av uppgifter och gränssnittsåtgärd med bekräftelse

</details>

<details>
<summary><b>🌊 24. "Jag behöver aktiv strömningsstatistik för A2A-laddning"</b></summary>

Strömmande arbetsflöden kräver operativ insikt i samtidighet och direktanslutningar.

**Hur OmniRoute löser det:**

- Aktiva strömräknare integrerade i A2A-status
- Senaste uppgiftens tidsstämpel och antal per stat
- A2A instrumentpanelskort för operationsövervakning i realtid

</details>

<details>
<summary><b>🪪 25. "Jag behöver standardagentupptäckt för klienter"</b></summary>

Externa klienter och orkestratorer behöver maskinläsbar metadata för onboarding.

**Hur OmniRoute löser det:**

- Agentkort exponerat på `/.well-known/agent.json`
- Förmåga och färdigheter som visas i management UI
- A2A status API inkluderar upptäcktsmetadata för automatisering

</details>

<details>
<summary><b>🧭 26. "Jag behöver protokollupptäckbarhet i produktens UX"</b></summary>

Om användare inte kan upptäcka protokollytor, sjunker kvaliteten på adoption och support.

**Hur OmniRoute löser det:**

- Konsoliderad sida **Endpoints** med flikar för proxy-, MCP-, A2A- och API-slutpunkter
- Inline-tjänststatus växlar (Online/Offline) för MCP och A2A
- Länkar från översikt till dedikerade hanteringsflikar

</details>

<details>
<summary><b>🧪 27. "Jag behöver end-to-end protokollvalidering med riktiga klienter"</b></summary>

Mock-tester räcker inte för att validera protokollkompatibilitet före release.

**Hur OmniRoute löser det:**

- E2E-svit som startar appen och använder riktig MCP SDK-klienttransport
- A2A-klient testar för upptäckt, skicka, streama, hämta och avbryta flöden
- Korskontrollera påståenden mot MCP-revision och A2A-uppgifter API:er

</details>

<details>
<summary><b>📡 28. "Jag behöver enhetlig observerbarhet över alla gränssnitt"</b></summary>

Att dela upp observerbarheten enligt protokoll skapar blinda fläckar och längre MTTR.

**Hur OmniRoute löser det:**

- Enhetliga instrumentpaneler/loggar/analyser i en produkt
- Hälsa + revision + begäran om telemetri över OpenAI-, MCP- och A2A-lager
- Operativa API:er för status och automatisering

</details>

<details>
<summary><b>💼 29. "Jag behöver en körtid för proxy + verktyg + agentorkestrering"</b></summary>

Att köra många separata tjänster ökar driftskostnaderna och fellägen.

**Hur OmniRoute löser det:**

- OpenAI-kompatibel proxy, MCP-server och A2A-server i en stack
- Delad autentisering, resiliens, datalagring och observerbarhet
- Konsekvent policymodell över alla interaktionsytor

</details>

<details>
<summary><b>🚀 30. "Jag behöver skicka agentiska arbetsflöden utan limkodsprawl"</b></summary>

Lag tappar hastighet när de sammanfogar flera ad-hoc-tjänster och skript.

**Hur OmniRoute löser det:**

- Enhetlig slutpunktsstrategi för kunder och agenter
- Inbyggda gränssnitt för protokollhantering och rökvalideringsvägar
- Produktionsfärdiga grunder (säkerhet, loggning, resiliens, backup)

</details>

### Exempel Playbooks (integrerade användningsfall)

**Playbook A: Maximera betald prenumeration + billig backup**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Noll-kostnad kodningsstack**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7 alltid på reservkedja**

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

## 🆓 Börja gratis — noll konfigurationskostnad

> Ställ in AI-kodning på några minuter till **$0/månad**. Anslut dessa gratiskonton och använd den inbyggda **Free Stack**-kombinationen.

| Steg | Åtgärd                                           | Leverantörer olåsta                                                 |
| ---- | ------------------------------------------------ | ------------------------------------------------------------------- |
| 1    | Anslut **Kiro** (AWS Builder ID OAuth)           | Claude Sonnet 4.5, Haiku 4.5 — **obegränsad**                       |
| 2    | Anslut **iFlow** (Google OAuth)                  | kimi-k2-tänkande, qwen3-coder-plus, deepseek-r1... — **obegränsat** |
| 3    | Anslut **Qwen** (enhetskod)                      | qwen3-coder-plus, qwen3-coder-flash... — **obegränsat**             |
| 4    | Anslut **Gemini CLI** (Google OAuth)             | gemini-3-flash, gemini-2.5-pro — **180K/månad gratis**              |
| 5    | `/dashboard/combos` → **Gratis stack ($0)** mall | Round-robin alla gratis leverantörer automatiskt                    |

**Peka valfri IDE/CLI till:** `http://localhost:20128/v1` · API-nyckel: `any-string` · Klart.

> **Valfri extra täckning (även gratis):** Groq API-nyckel (30 rpm gratis), NVIDIA NIM (40 rpm gratis, 70+ modeller), Cerebras (1M tok/dag), LongCat API-nyckel (50M tokens/dag!), Cloudflare Workers AI (10K Neurons/day, 50+ modeller).

## ⚡ Snabbstart

### 1) Installera och kör

```bash
npm install -g omniroute
omniroute
```

> **pnpm-användare:** Kör `pnpm approve-builds -g` efter installationen för att aktivera inbyggda byggskript som krävs av `better-sqlite3` och `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Instrumentpanelen öppnas vid `http://localhost:20128` och API:s basadress är `http://localhost:20128/v1`.

| Kommando                | Beskrivning                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| `omniroute`             | Starta server (`PORT=20128`, API och instrumentpanel på samma port) |
| `omniroute --port 3000` | Ställ in kanonisk/API-port till 3000                                |
| `omniroute --mcp`       | Starta MCP-server (stdio-transport)                                 |
| `omniroute --no-open`   | Öppna inte webbläsaren automatiskt                                  |
| `omniroute --help`      | Visa hjälp                                                          |

Valfritt läge med delad port:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Anslut leverantörer och skapa din API-nyckel

1. Öppna Dashboard → `Providers` och anslut minst en leverantör (OAuth- eller API-nyckel).
2. Öppna Dashboard → `Endpoints` och skapa en API-nyckel.
3. (Valfritt) Öppna Dashboard → `Combos` och ställ in din reservkedja.

### 3) Rikta ditt kodningsverktyg till OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Fungerar med Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode och OpenAI-kompatibla SDK:er.

### 4) Aktivera och validera protokoll (v2.0)

**MCP (för verktygsdrivna operationer):**

```bash
omniroute --mcp
```

Anslut sedan din MCP-klient över `stdio` och testa verktyg som:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (för agent-till-agent-arbetsflöden):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Validera allt från början till slut (rekommenderas)

```bash
npm run test:protocols:e2e
```

Denna svit validerar riktiga MCP- och A2A-klientflöden mot en app som körs.

### Alternativ: kör från källan

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Hamnarbetare

OmniRoute är tillgänglig som en offentlig Docker-bild på [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Snabbkörning:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Med miljöfil:**

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

**Använda Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Bild                     | Tagga    | Storlek | Beskrivning             |
| ------------------------ | -------- | ------- | ----------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Senaste stabila utgåvan |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB  | Aktuell version         |

---

## 🖥️ Desktop-app — offline och alltid på

> 🆕 **NYTT!** OmniRoute är nu tillgängligt som ett **inbyggt skrivbordsprogram** för Windows, macOS och Linux.

Kör OmniRoute som en fristående skrivbordsapp — ingen terminal, ingen webbläsare, inget internet krävs för lokala modeller. Den elektronbaserade appen innehåller:

- 🖥️ **Native Window** — Dedikerat appfönster med systemfältsintegration
- 🔄 **Autostart** — Starta OmniRoute vid systeminloggning
- 🔔 **Native Notifications** — Få varningar om kvotutmattning eller leverantörsproblem
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offlineläge** — Fungerar helt offline med medföljande server

### Snabbstart

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Systemfältet

När den är minimerad, finns OmniRoute i systemfältet med snabba åtgärder:

- Öppna instrumentpanelen
- Byt serverport
- Avsluta applikationen

📖 Fullständig dokumentation: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Prissättning i en överblick

| Nivå                 | Leverantör                  | Kostnad                           | Kvotåterställning      | Bäst för                            |
| -------------------- | --------------------------- | --------------------------------- | ---------------------- | ----------------------------------- |
| **💳 PRENUMERATION** | Claude Code (Pro)           | 20 USD/månad                      | 5h + veckovis          | Har redan prenumererat              |
|                      | Codex (Plus/Pro)            | 20-200 USD/månad                  | 5h + veckovis          | OpenAI-användare                    |
|                      | Gemini CLI                  | **GRATIS**                        | 180K/månad + 1K/dag    | Alla!                               |
|                      | GitHub Copilot              | $10-19/månad                      | Månatlig               | GitHub-användare                    |
| **🔑 API-NYCKEL**    | NVIDIA NIM                  | **GRATIS** (dev forever)          | ~40 RPM                | 70+ öppna modeller                  |
|                      | Cerebras                    | **GRATIS** (1M tok/dag)           | 60K TPM / 30 RPM       | Världens snabbaste                  |
|                      | Groq                        | **GRATIS** (30 RPM)               | 14,4K RPD              | Ultrasnabba Lama/Gemma              |
|                      | DeepSeek V3.2               | 0,27 USD/1,10 USD per 1M          | Inga                   | Bästa pris/kvalitetsresonemang      |
|                      | xAI Grok-4 Fast             | **$0,20/$0,50 per 1M** 🆕         | Inga                   | Snabbast + verktygsanrop, ultralågt |
|                      | xAI Grok-4 (standard)       | 0,20 USD/1,50 USD per 1M 🆕       | Inga                   | Resonerande flaggskepp från xAI     |
|                      | Mistral                     | Gratis provperiod + betald        | Begränsat pris         | Europeisk AI                        |
|                      | OpenRouter                  | Betala per användning             | Inga                   | 100+ modeller aggr.                 |
| **💰 BILLIGT**       | GLM-5 (via Z.AI) 🆕         | $0,5/1M                           | Dagligen 10:00         | 128K-utgång, senaste flaggskeppet   |
|                      | GLM-4.7                     | $0,6/1M                           | Dagligen 10:00         | Budget backup                       |
|                      | MiniMax M2.5 🆕             | $0,3/1M ingång                    | 5-timmars rullande     | Resonemang + agentuppgifter         |
|                      | MiniMax M2.1                | $0,2/1M                           | 5-timmars rullande     | Billigaste alternativet             |
|                      | Kimi K2.5 (Moonshot API) 🆕 | Betala per användning             | Inga                   | Direkt åtkomst till Moonshot API    |
|                      | Kimi K2                     | 9 USD/mån lägenhet                | 10 miljoner tokens/mån | Förutsägbar kostnad                 |
| **🆓 GRATIS**        | iFlow                       | **$0**                            | Obegränsad             | 5 modeller obegränsat               |
|                      | Qwen                        | **$0**                            | Obegränsad             | 4 modeller obegränsat               |
|                      | Kiro                        | **$0**                            | Obegränsad             | Claude Sonnet/Haiku (AWS Builder)   |
|                      | LongCat Flash-Lite 🆕       | **$0** (50 miljoner tok/dag 🔥)   | 1 RPS                  | Största gratiskvoten på jorden      |
|                      | Pollinationer AI 🆕         | **$0** (ingen nyckel behövs)      | 1 req/15s              | GPT-5, Claude, DeepSeek, Llama 4    |
|                      | Cloudflare Workers AI 🆕    | **$0** (10 000 neuroner/dag)      | ~150 resp/dag          | 50+ modeller, global edge           |
|                      | Scaleway AI 🆕              | **$0** (1 miljoner tokens totalt) | Begränsat pris         | EU/GDPR, Qwen3 235B, Lama 70B       |

> 🆕 **Nya modeller tillagda (mars 2026):** Grok-4 Fast-familjen till $0,20/$0,50/M (benchmarkerad till 1143ms — 30 % snabbare än Gemini 2.5 Flash), GLM-5 via Z.AI med 128K-utgång, MiniMax M2.5-resonemang, DeepSeek2.5-resonemang, KimSeek2.5 updates. direkt API.

**💡 $0 Combo Stack — Den kompletta gratis installationen:**

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

**Noll kostnad. Slutar aldrig koda.** Konfigurera detta som en OmniRoute-kombination och alla fallbacks sker automatiskt – ingen manuell växling någonsin.

---

---

## 🆓 Gratis modeller — vad du faktiskt får

> Alla modeller nedan är **100 % gratis utan kreditkort krävs**. OmniRoute dirigerar automatiskt mellan dem när en kvot tar slut — kombinera dem alla för en okrossbar 0 $-kombination.

### 🔵 CLAUDE MODELLS (via Kiro — AWS Builder ID)

| Modell              | Prefix | Begränsa       | Prisgräns                     |
| ------------------- | ------ | -------------- | ----------------------------- |
| `claude-sonnet-4.5` | `kr/`  | **Obegränsat** | Inget rapporterat dagligt tak |
| `claude-haiku-4.5`  | `kr/`  | **Obegränsat** | Inget rapporterat dagligt tak |
| `claude-opus-4.6`   | `kr/`  | **Obegränsat** | Senaste Opus via Kiro         |

### IFLOW-MODELLER (gratis OAuth – inget kreditkort)

| Modell             | Prefix | Begränsa       | Prisgräns             |
| ------------------ | ------ | -------------- | --------------------- |
| `kimi-k2-thinking` | `if/`  | **Obegränsat** | Inget rapporterat tak |
| `qwen3-coder-plus` | `if/`  | **Obegränsat** | Inget rapporterat tak |
| `deepseek-r1`      | `if/`  | **Obegränsat** | Inget rapporterat tak |
| `minimax-m2.1`     | `if/`  | **Obegränsat** | Inget rapporterat tak |
| `kimi-k2`          | `if/`  | **Obegränsat** | Inget rapporterat tak |

### 🟡 QWEN-MODELLER (Auth. enhetskod)

| Modell              | Prefix | Begränsa       | Prisgräns             |
| ------------------- | ------ | -------------- | --------------------- |
| `qwen3-coder-plus`  | `qw/`  | **Obegränsat** | Inget rapporterat tak |
| `qwen3-coder-flash` | `qw/`  | **Obegränsat** | Inget rapporterat tak |
| `qwen3-coder-next`  | `qw/`  | **Obegränsat** | Inget rapporterat tak |
| `vision-model`      | `qw/`  | **Obegränsat** | Multimodal (bilder)   |

### 🟣 GEMINI CLI (Google OAuth)

| Modell                   | Prefix | Begränsa                    | Prisgräns              |
| ------------------------ | ------ | --------------------------- | ---------------------- |
| `gemini-3-flash-preview` | `gc/`  | **180K tok/månad** + 1K/dag | Månatlig återställning |
| `gemini-2.5-pro`         | `gc/`  | 180K/månad (delad pool)     | Hög kvalitet           |

### ⚫ NVIDIA NIM (gratis API-nyckel — build.nvidia.com)

| Nivå         | Daglig gräns    | Prisgräns   | Anteckningar                                                   |
| ------------ | --------------- | ----------- | -------------------------------------------------------------- |
| Gratis (Dev) | Ingen token cap | **~40 RPM** | 70+ modeller; övergång till rena räntegränser i mitten av 2025 |

Populära gratismodeller: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (gratis API-nyckel — inference.cerebras.ai)

| Nivå   | Daglig gräns      | Prisgräns        | Anteckningar                                            |
| ------ | ----------------- | ---------------- | ------------------------------------------------------- |
| Gratis | **1M tokens/dag** | 60K TPM / 30 RPM | Världens snabbaste LLM slutledning; återställs dagligen |

Tillgänglig gratis: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (gratis API-nyckel — console.groq.com)

| Nivå   | Daglig gräns  | Prisgräns         | Anteckningar                                   |
| ------ | ------------- | ----------------- | ---------------------------------------------- |
| Gratis | **14,4K RPD** | 30 RPM per modell | Inget kreditkort; 429 på gräns, inte debiterad |

Tillgänglig gratis: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (gratis API-nyckel — longcat.chat) 🆕

| Modell                        | Prefix | Daglig gratiskvot         | Anteckningar                  |
| ----------------------------- | ------ | ------------------------- | ----------------------------- |
| `LongCat-Flash-Lite`          | `lc/`  | **50 miljoner tokens** 💥 | Största gratiskvoten någonsin |
| `LongCat-Flash-Chat`          | `lc/`  | 500 000 tokens            | Multi-turn chat               |
| `LongCat-Flash-Thinking`      | `lc/`  | 500 000 tokens            | Resonemang / CoT              |
| `LongCat-Flash-Thinking-2601` | `lc/`  | 500 000 tokens            | Jan 2026 version              |
| `LongCat-Flash-Omni-2603`     | `lc/`  | 500 000 tokens            | Multimodal                    |

> 100 % gratis medan den är i offentlig beta. Registrera dig på [longcat.chat](https://longcat.chat) med e-post eller telefon. Återställs dagligen 00:00 UTC.

### 🟢 POLLINATIONS AI (ingen API-nyckel krävs) 🆕

| Modell     | Prefix | Prisgräns | Provider bakom      |
| ---------- | ------ | --------- | ------------------- |
| `openai`   | `pol/` | 1 req/15s | GPT-5               |
| `claude`   | `pol/` | 1 req/15s | Antropisk Claude    |
| `gemini`   | `pol/` | 1 req/15s | Google Tvillingarna |
| `deepseek` | `pol/` | 1 req/15s | DeepSeek V3         |
| `llama`    | `pol/` | 1 req/15s | Meta Llama 4 Scout  |
| `mistral`  | `pol/` | 1 req/15s | Mistral AI          |

> ✨ **Noll friktion:** Ingen registrering, ingen API-nyckel. Lägg till pollineringsleverantören med ett tomt nyckelfält så fungerar det direkt.

### 🟠 CLOUDFLARE WORKERS AI (gratis API-nyckel — cloudflare.com) 🆕

| Nivå   | Dagliga neuroner | Likvärdig användning                             | Anteckningar              |
| ------ | ---------------- | ------------------------------------------------ | ------------------------- |
| Gratis | **10 000**       | ~150 LLM resp / 500-tals ljud / 15K inbäddningar | Global edge, 50+ modeller |

Populära gratismodeller: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (gratis ljud!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Kräver API-token + konto-ID från [dash.cloudflare.com](https://dash.cloudflare.com). Lagra konto-ID i leverantörsinställningar.

### 🟣 SCALEWAY AI (1M gratis tokens — scaleway.com) 🆕

| Nivå   | Gratis kvot   | Plats        | Anteckningar                           |
| ------ | ------------- | ------------ | -------------------------------------- |
| Gratis | **1M tokens** | 🇫🇷 Paris, EU | Inget kreditkort behövs inom gränserna |

Tillgänglig gratis: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> EU/GDPR-kompatibel. Hämta API-nyckel på [console.scaleway.com](https://console.scaleway.com).

> **💡 Den ultimata gratisstacken (11 leverantörer, $0 för alltid):**
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

## 🎙️ Gratis transkriptionskombination

> Transkribera valfritt ljud/video för **$0** — Deepgram leads med $200 gratis, AssemblyAI $50 reserv, Groq Whisper som obegränsad nödbackup.

| Leverantör        | Gratis krediter                | Bästa modellen                              | Prisgräns                          |
| ----------------- | ------------------------------ | ------------------------------------------- | ---------------------------------- |
| **Deepgram**      | **$200 gratis** (registrering) | `nova-3` — bästa noggrannhet, 30+ språk     | Ingen RPM-gräns på gratis krediter |
| 🔵 **AssemblyAI** | **$50 gratis** (registrering)  | `universal-3-pro` — kapitel, sentiment, PII | Ingen RPM-gräns på gratis krediter |
| 🔴 **Groq**       | **Fri för alltid**             | `whisper-large-v3` — OpenAI Whisper         | 30 RPM (hastighetsbegränsad)       |

**Föreslagen kombination i `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Sedan i `/dashboard/media` → fliken **Transkription**: ladda upp valfri ljud- eller videofil → välj din kombinationsslutpunkt → hämta transkription i format som stöds.

## 💡 Nyckelfunktioner

OmniRoute v2.0 är byggd som en operativ plattform, inte bara en reläproxy.

### 🆕 Nytt — ClawRouter-inspirerade förbättringar (mars 2026)

| Funktion                               | Vad det gör                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ⚡ **Grok-4 Fast Family**              | xAI-modeller för $0,20/$0,50/M — benchmarkerade 1143ms (30 % snabbare än Gemini 2.5 Flash)             |
| 🧠 **GLM-5 via Z.AI**                  | 128K utdatakontext, $0,5/1M — senaste flaggskeppet från GLM-familjen                                   |
| 🔮 **MiniMax M2.5**                    | Resonemang + agentuppgifter för $0,30/1M — betydande uppgradering från M2.1                            |
| 🎯 **verktyg Calling Flag per modell** | Per modell `toolCalling: true/false` i registret — AutoCombo hoppar över modeller som inte kan verktyg |
| 🌍 **Flerspråkig avsiktsdetektering**  | PT/ZH/ES/AR-nyckelord i AutoCombo-poängsättning — bättre modellval för icke-engelsk innehåll           |
| 📊 **Benchmarkdrivna fallbacks**       | Verklig p95 latens från liveförfrågningar feeds combo scoring — AutoCombo lär sig av faktiska data     |
| 🔁 **Begär deduplicering**             | Innehållshashbaserat dedup-fönster – säker för flera agenter, förhindrar dubbletter av avgifter        |
| 🔌 **Strategi för pluggbar router**    | Utökningsbart `RouterStrategy`-gränssnitt — lägg till anpassad routinglogik som plugins                |

### 🚀 Föregående v2.0.9+ — Playground, CLI Fingerprints & ACP

| Funktion                                    | Vad det gör                                                                                                                                                                                                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Modell lekplats**                      | Dashboard-sida för att testa alla modeller direkt — leverantör/modell/slutpunktsväljare, Monaco Editor, streaming, avbryt, timing                                                                                                                                                         |
| 🔏 **CLI Fingerprint Matching**             | Beställning av rubrik/kropp per leverantör för att matcha inbyggda CLI-signaturer – växla per leverantör i Inställningar > Säkerhet. **Din proxy-IP bevaras**                                                                                                                             |
| 🤝 **ACP Support (Agent Client Protocol)**  | CLI-agentupptäckt (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 till), process spawner, `/api/acp/agents` slutpunkt                                                                                                                                                                     |
| 🤖 **ACP Agents Dashboard**                 | Felsökning › Agentsida — rutnät med 14 agenter med installationsstatus, version, anpassat agentformulär för alla CLI-verktyg. **OpenCode**-användare får en "Ladda ner opencode.json"-knapp som automatiskt genererar en färdig att använda konfiguration med alla tillgängliga modeller. |
| 🔧 **Anpassad modell `apiFormat` Routing**  | Anpassade modeller med `apiFormat: "responses"` dirigeras nu korrekt till Responses API-översättaren                                                                                                                                                                                      |
| 🏢 **Codex Workspace Isolation**            | Flera Codex-arbetsytor per e-post — OAuth separerar anslutningar korrekt efter arbetsyte-ID                                                                                                                                                                                               |
| 🔄 **Automatisk uppdatering av elektroner** | Skrivbordsapp söker efter uppdateringar + automatisk installation vid omstart                                                                                                                                                                                                             |

### 🤖 Agent & Protocol Operations (v2.0)

| Funktion                                  | Vad det gör                                                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 🔧 **MCP-server (16 verktyg)**            | IDE/agent-verktyg via 3 transporter: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`) |
| 🤝 **A2A-server (JSON-RPC + SSE)**        | Agent-till-agent-uppgiftskörning med synkroniserings- och streamingflöden                             |
| 🧭 **Konsoliderade slutpunkterssida**     | Hanteringssida med flikar med flikarna Endpoint Proxy, MCP, A2A och API Endpoints                     |
| 🎚️ **Service aktivera/inaktivera växlar** | ON/OFF-omkopplare för MCP och A2A med inställningsbeständighet (standard: OFF)                        |
| 🛰️ **MCP Runtime Heartbeat**              | Verklig processstatus (pid, drifttid, hjärtslagsålder, transport, omfångsläge)                        |
| 📋 **MCP Audit Trail**                    | Filtrerbara granskningsloggar med framgång/misslyckande och nyckeltillskrivning                       |
| 🔐 **MCP Scope Enforcement**              | 9 granulära scope-behörigheter för kontrollerad verktygsåtkomst                                       |
| 📡 **A2A Task Lifecycle Management**      | Lista/filtrera uppgifter, inspektera händelser/artefakter, avbryt pågående uppgifter                  |
| 📋 **Agent Card Discovery**               | `/.well-known/agent.json` för automatisk upptäckt av klient                                           |
| 🧪 **Protokoll E2E testsele**             | Verkliga MCP SDK + A2A-klientflöden i `test:protocols:e2e`                                            |
| ⚙️ **Driftskontroller**                   | Switch combo, applicera elasticitetsprofiler, återställ brytare från en kontrollyta                   |

### 🧠 Routing & Intelligence

| Funktion                            | Vad det gör                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| 🎯 **Smart 4-lagers reserv**        | Automatisk rutt: Prenumeration → API-nyckel → Billigt → Gratis                    |
| 📊 **Kvotspårning i realtid**       | Live token count + återställ nedräkning per leverantör                            |
| 🔄 **Formatöversättning**           | OpenAI ↔ Claude ↔ Gemini ↔ Svar med schemasäkra konverteringar                    |
| 👥 **Multi-Account Support**        | Flera konton per leverantör med intelligent urval                                 |
| 🔄 **Auto Token Refresh**           | OAuth-tokens uppdateras automatiskt med försök igen                               |
| 🎨 **Anpassade kombinationer**      | 6 balanseringsstrategier + reservkedjekontroll                                    |
| 🌐 **Wildcard-router**              | `provider/*` dynamisk routing                                                     |
| 🧠 **Tänker på budgetkontroller**   | Gränser för passthrough, auto, anpassade och adaptiva resonemang                  |
| 🔀 **Modellalias**                  | Inbyggd + anpassad modellaliasing och migreringssäkerhet                          |
| ⚡ **Bakgrundsförsämring**          | Rikta lågprioriterade bakgrundsuppgifter till billigare modeller                  |
| 🧪 **Task-Aware Smart Routing**     | Välj modell automatiskt efter innehållstyp (kodning/vision/analys/sammanfattning) |
| 💬 **System Prompt Injection**      | Globala beteendekontroller tillämpas konsekvent                                   |
| 📄 **Responses API-kompatibilitet** | Fullständigt `/v1/responses` stöd för Codex och avancerade agentarbetsflöden      |

### 🎵 Multimodala API:er

| Funktion                 | Vad det gör                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🖼️ **Bildgenerering**    | `/v1/images/generations` med moln och lokala backends                                                                                                                          |
| 📐 **Inbäddningar**      | `/v1/embeddings` för sök- och RAG-pipelines                                                                                                                                    |
| 🎤 **Ljudtranskription** | `/v1/audio/transcriptions` — 7 leverantörer (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), automatisk språkdetektering, MP4/MP3/WAV-stöd |
| 🔊 **Text-till-tal**     | `/v1/audio/speech` — 10 leverantörer (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) med korrekta felmeddelanden           |
| 🎬 **Videogenerering**   | `/v1/videos/generations` (ComfyUI + SD WebUI-arbetsflöden)                                                                                                                     |
| 🎵 **Music Generation**  | `/v1/music/generations` (ComfyUI-arbetsflöden)                                                                                                                                 |
| 🛡️ **Moderationer**      | `/v1/moderations` säkerhetskontroller                                                                                                                                          |
| 🔀 **Omrankning**        | `/v1/rerank` för relevanspoäng                                                                                                                                                 |
| 🔍 **Webbsökning** 🆕    | `/v1/search` — 5 leverantörer (Serper, Brave, Perplexity, Exa, Tavily), 6 500+ gratis/månad, auto-failover, cache                                                              |

### 🛡️ Motståndskraft, säkerhet och styrning

| Funktion                             | Vad det gör                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| 🔌 **Cremsbrytare**                  | Per modell trip/återhämtning med tröskelkontroller                                                |
| 🎯 **Endpoint-Aware Models**         | Anpassade modeller deklarerar stödda slutpunkter + API-format                                     |
| 🛡️ **Anti-ånflock**                  | Mutex + semaforskydd vid återförsök/hastighetshändelser                                           |
| 🧠 **Semantisk + Signaturcache**     | Kostnads-/latensminskning med två cachelager                                                      |
| ⚡ **Begär idempotens**              | Dubblett skyddsfönster                                                                            |
| 🔒 **TLS Fingerprint Spoofing**      | Webbläsarliknande TLS-fingeravtryck — **minskar botdetektering och kontoflaggning**               |
| 🔏 **CLI Fingerprint Matching**      | Matchar inbyggda CLI-begäransignaturer — **minskar förbudsrisken samtidigt som proxy-IP bevaras** |
| 🌐 **IP-filtrering**                 | Kontroll av tillåtelse/blockeringslista för exponerade distributioner                             |
| 📊 **Redigerbara hastighetsgränser** | Konfigurerbara globala/leverantörsnivågränser med beständighet                                    |
| 🔑 **API Key Management + Scoping**  | Säker nyckelutgivning/rotation och modell/leverantörskontroller                                   |
| 🛡️ **Skyddad `/models`**             | Valfri autentisering och leverantörsdöljning för modellkatalog                                    |

### 📊 Observerbarhet och analys

| Funktion                          | Vad det gör                                            |
| --------------------------------- | ------------------------------------------------------ |
| 📝 **Begäran + proxyloggning**    | Fullständig begäran/svar och proxyloggning             |
| 📋 **Unified Logs Dashboard**     | Begäran, proxy, revision och konsolvyer på en sida     |
| 🔍 **Begär telemetri**            | p50/p95/p99 latens och spårning av begäran             |
| 🏥 **Hälsoinstrumentpanel**       | Drifttid, brytartillstånd, lockouter, cachestatistik   |
| 💰 **Kostnadsspårning**           | Budgetkontroller och prissättning per modell           |
| 📈 **Analytiska visualiseringar** | Modell-/leverantörsanvändningsinsikter och trendvyer   |
| 🧪 **Utvärderingsram**            | Golden set-testning med konfigurerbara matchstrategier |

### ☁️ Implementering och plattform

| Funktion                                | Vad det gör                                                           |
| --------------------------------------- | --------------------------------------------------------------------- |
| 🌐 **Distribuera var som helst**        | Localhost, VPS, Docker, Molnmiljöer                                   |
| 💾 **Cloud Sync**                       | Konfigurationssynkronisering via molnarbetare                         |
| 🔄 **Säkerhetskopiering/återställning** | Export/import och katastrofåterställningsflöden                       |
| 🧙 **Onboarding Wizard**                | Första körningen guidad installation                                  |
| 🔧 **CLI Tools Dashboard**              | Inställning med ett klick för populära kodningsverktyg                |
| 🎮 **Modell lekplats**                  | Testa valfri leverantör/modell/slutpunkt från instrumentpanelen       |
| 🔏 **CLI Fingerprint Toggle**           | Fingeravtrycksmatchning per leverantör i Inställningar > Säkerhet     |
| 🌐 **i18n (30 språk)**                  | Fullständig instrumentpanel + stöd för dokumentspråk med RTL-täckning |
| 🧹 **Rensa alla modeller**              | Rensa modelllistan med ett klick i leverantörsinformation             |
| 📋 **Utgåvamallar**                     | Standardiserade GitHub-mallar för buggar och funktioner               |
| 📂 **Anpassad datakatalog**             | `DATA_DIR` åsidosättning för lagringsplats                            |

### Feature Deep Dive

#### Smart reserv med praktisk kostnadskontroll

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

När kvot, ränta eller hälsa misslyckas, flyttar OmniRoute automatiskt till nästa kandidat utan manuell växling.

#### Protokollhantering som är synlig och funktionsduglig

- MCP + A2A kan upptäckas i användargränssnitt och dokument (inte dolda)
- Protokollstatus-API:er exponerar driftdata (`/api/mcp/*`, `/api/a2a/*`)
- Dashboards inkluderar åtgärder för dag-2 operationer (kombinationsväxlingar, återställning av brytare, avbokning av uppgifter)

#### Översättare + valideringsarbetsflöde

Översättarområdet inkluderar:

- **Lekplats**: begär omvandlingskontroller
- **Chatttestare**: fullständig begäran/svar tur och retur
- **Testbänk**: flera fall i en körning
- **Live Monitor**: trafikvy i realtid

Plus protokollvalidering med riktiga klienter via `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Verktygsreferens, IDE-konfigurationer och klientexempel
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Färdigheter, JSON-RPC-metoder, streaming och uppgiftslivscykel

## 🧪 Utvärderingar (Evals)

OmniRoute inkluderar ett inbyggt utvärderingsramverk för att testa LLM-svarskvalitet mot en gyllene uppsättning. Få åtkomst till den via **Analytics → Evals** i instrumentpanelen.

### Inbyggt gyllene set

Det förinstallerade "OmniRoute Golden Set" innehåller testfall för:

- Hälsningar, matematik, geografi, kodgenerering
- Överensstämmelse med JSON-format, översättning, generering av markdown
- Säkerhetsvägran (skadligt innehåll), räkning, boolesk logik

### Utvärderingsstrategier

| Strategi   | Beskrivning                                          | Exempel                          |
| ---------- | ---------------------------------------------------- | -------------------------------- |
| `exact`    | Utdata måste matcha exakt                            | `"4"`                            |
| `contains` | Utdata måste innehålla delsträng (skiftlägeskänslig) | `"Paris"`                        |
| `regex`    | Utdata måste matcha regexmönster                     | `"1.*2.*3"`                      |
| `custom`   | Anpassad JS-funktion returnerar true/false           | `(output) => output.length > 10` |

---

## 📖 Installationsguide

### Protokollinställningar (MCP + A2A)

<details>
<summary><b>🧩 MCP-inställning (Model Context Protocol)</b></summary>

Starta MCP-transport i stdio-läge:

```bash
omniroute --mcp
```

Rekommenderat valideringsflöde:

1. Anslut din MCP-klient via stdio.
2. Kör `omniroute_get_health`.
3. Kör `omniroute_list_combos`.
4. Öppna `/dashboard/mcp` för att bekräfta hjärtslag, aktivitet och revision.

Användbara API:er för automatisering:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A-inställning (Agent2Agent)</b></summary>

Upptäck agenten:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Skicka en uppgift:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Hantera livscykel:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Operativt användargränssnitt:

- `/dashboard/a2a` för observerbarhet för uppgift/tillstånd/ström och rökåtgärder

</details>

<details>
<summary><b>🧪 End-to-end-protokollvalidering</b></summary>

Validera båda protokollen med riktiga klienter:

```bash
npm run test:protocols:e2e
```

Detta verifierar:

- MCP SDK-klientanslut/lista/samtal
- A2A upptäckt/skicka/strömma/få/avbryt
- Korskontrollera data i MCP-revision och A2A-uppgiftshanterings-API:er

</details>

<details>
<summary><b>💳 Prenumerationsleverantörer</b></summary>

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

**Proffstips:** Använd Opus för komplexa uppgifter, Sonnet för snabbhet. OmniRoute spårar kvot per modell!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Codex Account Limit Management (5 timmar + veckovis)

Varje Codex-konto har nu policyväxlingar i `Dashboard -> Providers`:

- `5h` (PÅ/AV): tillämpa 5-timmars fönstertröskelpolicyn.
- `Weekly` (PÅ/AV): tillämpa policyn för veckofönstertröskel.
- Tröskelbeteende: när ett aktiverat fönster når >=90 % användning hoppas kontot över.
- Rotationsbeteende: OmniRoute leder automatiskt till nästa kvalificerade Codex-konto.
- Återställ beteende: när leverantörens `resetAt` tid går, blir kontot kvalificerat igen automatiskt.

Scenarier:

- `5h ON` + `Weekly ON`: kontot hoppas över när något av fönstren når tröskeln.
- `5h OFF` + `Weekly ON`: endast veckovis användning kan blockera kontot.
- `5h ON` + `Weekly OFF`: endast 5 timmars användning kan blockera kontot.
- `resetAt` godkänd: kontot återgår till rotation automatiskt (ingen manuell återaktivering).

### Gemini CLI (GRATIS 180K/månad!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Bäst värde:** Enorma gratis nivå! Använd detta före betalda nivåer.

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
<summary><b>🔑 API-nyckelleverantörer</b></summary>

### NVIDIA NIM (GRATIS utvecklaråtkomst — 70+ modeller)

1. Registrera dig: [build.nvidia.com](https://build.nvidia.com)
2. Få gratis API-nyckel (1000 slutsatspoäng ingår)
3. Dashboard → Lägg till leverantör → NVIDIA NIM:
   - API-nyckel: `nvapi-your-key`

**Modeller:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` och 50+ till

**Proffstips:** OpenAI-kompatibelt API — fungerar sömlöst med OmniRoutes formatöversättning!

### DeepSeek

1. Registrera dig: [platform.deepseek.com](https://platform.deepseek.com)
2. Hämta API-nyckel
3. Dashboard → Lägg till leverantör → DeepSeek

**Modeller:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (gratis nivå tillgänglig!)

1. Registrera dig: [console.groq.com](https://console.groq.com)
2. Skaffa API-nyckel (gratis nivå ingår)
3. Dashboard → Lägg till leverantör → Groq

**Modeller:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Proffstips:** Ultrasnabb slutledning — bäst för realtidskodning!

### OpenRouter (100+ modeller)

1. Registrera dig: [openrouter.ai](https://openrouter.ai)
2. Hämta API-nyckel
3. Dashboard → Lägg till leverantör → OpenRouter

**Modeller:** Få tillgång till 100+ modeller från alla större leverantörer genom en enda API-nyckel.

</details>

<details>
<summary><b>💰 Billiga leverantörer (backup)</b></summary>

### GLM-4.7 (Daglig återställning, $0,6/1M)

1. Registrera dig: [Zhipu AI](https://open.bigmodel.cn/)
2. Hämta API-nyckel från Coding Plan
3. Instrumentpanel → Lägg till API-nyckel:
   - Leverantör: `glm`
   - API-nyckel: `your-key`

**Använd:** `glm/glm-4.7`

**Proffstips:** Coding Plan erbjuder 3× kvot till 1/7 kostnad! Återställ dagligen 10:00.

### MiniMax M2.1 (5 timmars återställning, $0,20/1M)

1. Registrera dig: [MiniMax](https://www.minimax.io/)
2. Hämta API-nyckel
3. Instrumentpanel → Lägg till API-nyckel

**Använd:** `minimax/MiniMax-M2.1`

**Proffstips:** Billigaste alternativet för långa sammanhang (1M tokens)!

### Kimi K2 ($9/månad lägenhet)

1. Prenumerera: [Moonshot AI](https://platform.moonshot.ai/)
2. Hämta API-nyckel
3. Instrumentpanel → Lägg till API-nyckel

**Använd:** `kimi/kimi-latest`

**Proffstips:** Fast $9/månad för 10 miljoner tokens = $0,90/1 miljon effektiv kostnad!

</details>

<details>
<summary><b>🆓 GRATIS leverantörer (nödbackup)</b></summary>

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

### Qwen (4 GRATIS modeller via enhetskod)

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
<summary><b>🎨 Skapa kombinationer</b></summary>

### Exempel 1: Maximera prenumeration → Billig backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Exempel 2: Endast gratis (noll kostnad)

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

### Markör IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Använd sidan **CLI Tools** i instrumentpanelen för konfiguration med ett klick, eller redigera `~/.claude/settings.json` manuellt.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Alternativ 1 — Instrumentpanel (rekommenderas):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Alternativ 2 — Manuell:** Redigera `~/.openclaw/openclaw.json`:

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

> **Obs!** OpenClaw fungerar endast med lokal OmniRoute. Använd `127.0.0.1` istället för `localhost` för att undvika problem med IPv6-upplösning.

### Cline / Fortsätt / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Steg 1:** Lägg till OmniRoute som en anpassad leverantör:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Steg 2:** Skapa/redigera `opencode.json` i din projektrot:

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

**Steg 3:** Välj modell i OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tips:** Lägg till valfri modell som är tillgänglig i din OmniRoute `/v1/models` slutpunkt till avsnittet `models`. Använd formatet `provider/model-id` från din OmniRoute-instrumentpanel.

</details>

---

## 🐛 Felsökning

<details>
<summary><b>Klicka för att utöka felsökningsguide</b></summary>

**"Språkmodellen gav inga meddelanden"**

- Leverantörskvoten är slut → Kontrollera instrumentpanelens kvotföljare
- Lösning: Använd kombinationsalternativ eller byt till billigare nivå

**Taxebegränsning**

- Prenumerationskvot ute → Fallback till GLM/MiniMax
- Lägg till kombination: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth-token har löpt ut**

- Automatisk uppdatering av OmniRoute
- Om problemen kvarstår: Dashboard → Leverantör → Återanslut

**Höga kostnader**

- Kontrollera användningsstatistik i Dashboard → Kostnader
- Byt primär modell till GLM/MiniMax
- Använd gratis nivå (Gemini CLI, iFlow) för icke-kritiska uppgifter

**Dashboard/API-portar är fel**

- `PORT` är den kanoniska basporten (och API-porten som standard)
- `API_PORT` åsidosätter endast OpenAI-kompatibel API-lyssnare
- `DASHBOARD_PORT` åsidosätter endast instrumentpanelen/Next.js-lyssnaren
- Ställ in `NEXT_PUBLIC_BASE_URL` till din instrumentpanel/offentliga URL (för OAuth-återuppringningar)

**Molnsynkroniseringsfel**

- Verifiera att `BASE_URL` pekar på din körinstans
- Verifiera `CLOUD_URL`-punkter till din förväntade molnändpunkt
- Håll `NEXT_PUBLIC_*` värden i linje med värden på serversidan

**Första inloggningen fungerar inte**

- Kontrollera `INITIAL_PASSWORD` i `.env`
- Om det inte är inställt är reservlösenordet `123456`

**Inga förfrågningsloggar**

- Ställ in `ENABLE_REQUEST_LOGS=true` i `.env`

**Anslutningstest visar "Invalid" för OpenAI-kompatibla leverantörer**

- Många leverantörer exponerar inte en `/models` slutpunkt
- OmniRoute v1.0.6+ inkluderar reservvalidering via chattslutföranden
- Se till att baswebbadressen innehåller suffixet `/v1`

### 🔐 OAuth på en fjärrserver

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Viktigt för användare som kör OmniRoute på en VPS, Docker eller vilken fjärrserver som helst**

#### Varför misslyckas Antigravity / Gemini CLI OAuth på fjärrservrar?

**Antigravity** och **Gemini CLI**-leverantörerna använder **Google OAuth 2.0**. Google kräver att `redirect_uri` i OAuth-flödet exakt matchar en av de förregistrerade URI:erna i appens Google Cloud Console.

OAuth-uppgifterna som paketeras i OmniRoute är registrerade **endast för `localhost`**. När du får åtkomst till OmniRoute på en fjärrserver (t.ex. `https://omniroute.myserver.com`), avvisar Google autentiseringen med:

```
Error 400: redirect_uri_mismatch
```

#### Lösning: Konfigurera dina egna OAuth-uppgifter

Du måste skapa ett **OAuth 2.0 Client ID** i Google Cloud Console med din servers URI.

#### Steg-för-steg

**1. Öppna Google Cloud Console**

Gå till: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Skapa ett nytt OAuth 2.0-klient-ID**

- Klicka på **"+ Skapa inloggningsuppgifter"** → **"OAuth-klient-ID"**
- Applikationstyp: **"Webbapplikation"**
- Namn: allt du gillar (t.ex. `OmniRoute Remote`)

**3. Lägg till auktoriserade omdirigerings-URI:er**

I fältet **"Auktoriserade omdirigerings-URI:er"** lägger du till:

```
https://your-server.com/callback
```

> Ersätt `your-server.com` med din servers domän eller IP (inkludera porten om det behövs, t.ex. `http://45.33.32.156:20128/callback`).

**4. Spara och kopiera inloggningsuppgifterna**

När du har skapat kommer Google att visa **klient-ID** och **klienthemlighet**.

**5. Ställ in miljövariabler**

I din `.env` (eller Docker-miljövariabler):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Starta om OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Försök ansluta igen**

Dashboard → Leverantörer → Antigravity (eller Gemini CLI) → OAuth

Google kommer nu att omdirigera korrekt till `https://your-server.com/callback`.

---

#### Tillfällig lösning (utan anpassade autentiseringsuppgifter)

Om du inte vill ställa in dina egna autentiseringsuppgifter just nu kan du fortfarande använda det **manuella URL-flödet**:

1. OmniRoute öppnar Googles auktoriserings-URL
2. Efter auktorisering försöker Google omdirigera till `localhost` (vilket misslyckas på fjärrservern)
3. **Kopiera hela webbadressen** från webbläsarens adressfält (även om sidan inte laddas)
4. Klistra in den URL:en i fältet som visas i OmniRoute-anslutningsmodalen
5. Klicka på **"Anslut"**

> Detta fungerar eftersom auktoriseringskoden i URL:en är giltig oavsett om omdirigeringssidan har laddats.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Hur kan du göra Antigravity / Tvilling CLI på fjärrkontroller?

Os provedores **Antigravity** och **Gemini CLI** usam **Google OAuth 2.0** för autenticação. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas no Google Cloud Console do aplicativo.

Som credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (ex: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Lösning: Konfigurera självständigt OAuth

Você precisa criar um **OAuth 2.0 Client ID** no Google Cloud Console com a URI do seu service.

#### Passo a passo

**1. Åtkomst till Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 Client ID**

- Klicka på dem **"+ Skapa inloggningsuppgifter"** → **"OAuth-klient-ID"**
- Typo de aplicativo: **"Webbapplikation"**
- Namn: escolha qualquer nome (ex: `OmniRoute Remote`)

**3. Adicione som auktoriserade omdirigerings-URI**

Ingen campo **"Auktoriserade omdirigerings-URIs"**, adicione:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio ou IP do seu servidor (inclua a porta se necessário, ex: `http://45.33.32.156:20128/callback`).

**4. Spara e kopia som credenciais**

Após criar, o Google mostrará o **Client ID** e o **Client Secret**.

**5. Konfigurera som variáveis de ambiente**

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

Dashboard → Leverantörer → Antigravity (ou Gemini CLI) → OAuth

Agora o Google redirecionará corretamente para `https://seu-servidor.com/callback` e a autenticação funcionará.

---

#### Lösning temporário (som konfigurerad credenciais próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. O OmniRoute abrirá en URL de autorização till Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **Kopiera en webbadress komplett** da barra de endereço do seu webbläsare (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Klicka på **"Anslut"**

> Este workaround funciona porque o código de autorização na URL é válido independente do redirect ter carregado ou não.

</details>

---

</details>

## 🛠️ Tech Stack

<details>
<summary><b>Klicka för att expandera teknisk stackdetaljer</b></summary>

- **Körtid**: Node.js 18–22 LTS (⚠️ Node.js 24+ stöds **inte** — `better-sqlite3` inbyggda binärer är inkompatibla)
- **Språk**: TypeScript 5.9 — **100 % TypeScript** över `src/` och `open-sse/` (noll `any` i kärnmoduler sedan v2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Databas**: LowDB (JSON) + SQLite (domäntillstånd + proxyloggar + MCP-granskning + routingbeslut)
- **Schema**: Zod (MCP-verktyg I/O-validering, API-kontrakt)
- **Protokoll**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: Serversända händelser (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-nycklar + MCP Scoped Authorization
- **Test**: Node.js testlöpare + Vitest (900+ tester inklusive enhet, integration, E2E)
- **CI/CD**: GitHub-åtgärder (automatisk npm-publicering + Docker Hub vid release)
- **Webbplats**: [omniroute.online](https://omniroute.online)
- **Paket**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resiliens**: Strömbrytare, exponentiell backoff, anti-dundrande flock, TLS-spoofing, auto-combo självläkning

</details>

---

## 📖 Dokumentation

| Dokument                                       | Beskrivning                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Leverantörer, kombinationer, CLI-integration, distribution        |
| [API Reference](docs/API_REFERENCE.md)         | Alla slutpunkter med exempel                                      |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP-verktyg, IDE-konfigurationer, Python/TS/Go-klienter        |
| [A2A Server](src/lib/a2a/README.md)            | JSON-RPC 2.0-protokoll, färdigheter, streaming, uppgiftshantering |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6-faktor poäng, lägespaket, självläkande                          |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Vanliga problem och lösningar                                     |
| [Architecture](docs/ARCHITECTURE.md)           | Systemarkitektur och interna delar                                |
| [Contributing](CONTRIBUTING.md)                | Utvecklingsupplägg och riktlinjer                                 |
| [OpenAPI Spec](docs/openapi.yaml)              | OpenAPI 3.0-specifikation                                         |
| [Security Policy](SECURITY.md)                 | Sårbarhetsrapportering och säkerhetsrutiner                       |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Komplett guide: VM + nginx + Cloudflare-installation              |
| [Features Gallery](docs/FEATURES.md)           | Visuell visning av instrumentpanelen med skärmdumpar              |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Steg för validering av pre-release                                |

---

## 🗺️ Färdkarta

OmniRoute har **210+ funktioner planerade** över flera utvecklingsfaser. Här är nyckelområdena:

| Kategori                        | Planerade funktioner | Höjdpunkter                                                                                                  |
| ------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| 🧠 **Routing & intelligens**    | 25+                  | Routning med lägsta latens, taggbaserad routing, kvotförhandskontroll, val av P2C-konto                      |
| 🔒 **Säkerhet och efterlevnad** | 20+                  | SSRF-härdning, cloaking av autentiseringsuppgifter, hastighetsgräns per endpoint, hanteringsnyckelomfattning |
| 📊 **Observerbarhet**           | 15+                  | OpenTelemetry-integration, kvotövervakning i realtid, kostnadsspårning per modell                            |
| 🔄 **Providerintegrationer**    | 20+                  | Dynamiskt modellregister, nedkylning av leverantörer, Codex för flera konton, Copilot-kvotanalys             |
| ⚡ **Prestanda**                | 15+                  | Dubbla cachelager, promptcache, svarscache, streaming keepalive, batch API                                   |
| 🌐 **Ekosystem**                | 10+                  | WebSocket API, config hot-reload, distribuerad config store, kommersiellt läge                               |

### 🔜 Kommer snart

- 🔗 **OpenCode Integration** — Inbyggt leverantörsstöd för OpenCode AI-kodnings-IDE
- 🔗 **TRAE Integration** — Fullständigt stöd för TRAE AI-utvecklingsramverket
- 📦 **Batch API** — Asynkron batchbearbetning för bulkförfrågningar
- 🎯 **Taggbaserad routing** — Ruttbegäranden baserade på anpassade taggar och metadata
- 💰 **Lägsta kostnadsstrategi** — Välj automatiskt den billigaste tillgängliga leverantören

> 📝 Fullständiga funktionsspecifikationer tillgängliga i [**OMNI_TOKEN_342**](docs/new-features/) (217 detaljerade specifikationer)

---

## 👥 Bidragsgivare

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Hur man bidrar

1. Dela förvaret
2. Skapa din funktionsgren (`git checkout -b feature/amazing-feature`)
3. Bekräfta dina ändringar (`git commit -m 'Add amazing feature'`)
4. Tryck till grenen (`git push origin feature/amazing-feature`)
5. Öppna en Pull Request

Se [CONTRIBUTING.md](CONTRIBUTING.md) för detaljerade riktlinjer.

### Släpper en ny version

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Stjärnhistorik

## Stjärnskådare över tid

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Tack

Särskilt tack till **[9router](https://github.com/decolua/9router)** av **[decolua](https://github.com/decolua)** — originalprojektet som inspirerade denna gaffel. OmniRoute bygger på den otroliga grunden med ytterligare funktioner, multimodala API:er och en fullständig TypeScript-omskrivning.

Särskilt tack till **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — den ursprungliga Go-implementeringen som inspirerade denna JavaScript-port.

---

## 📄 Licens

MIT-licens - se [LICENSE](LICENSE) för detaljer.

---

<div align="center">
  <sub>Byggd med ❤️ för utvecklare som kodar 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub-diskussioner aktiverade för gemenskapsfrågor och svar -->
