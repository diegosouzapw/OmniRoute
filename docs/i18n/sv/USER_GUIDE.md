# Användarhandbok

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Komplett guide för att konfigurera leverantörer, skapa kombinationer, integrera CLI-verktyg och distribuera OmniRoute.

---

## Innehållsförteckning

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Prissättning i en överblick

| Nivå                 | Leverantör        | Kostnad               | Kvotåterställning        | Bäst för                   |
| -------------------- | ----------------- | --------------------- | ------------------------ | -------------------------- |
| **💳 PRENUMERATION** | Claude Code (Pro) | 20 USD/månad          | 5h + veckovis            | Har redan prenumererat     |
|                      | Codex (Plus/Pro)  | 20-200 USD/månad      | 5h + veckovis            | OpenAI-användare           |
|                      | Gemini CLI        | **GRATIS**            | 180K/månad + 1K/dag      | Alla!                      |
|                      | GitHub Copilot    | 10-19 USD/månad       | Månatlig                 | GitHub-användare           |
| **🔑 API-NYCKEL**    | DeepSeek          | Betala per användning | Inga                     | Billigt resonemang         |
|                      | Groq              | Betala per användning | Inga                     | Ultrasnabb slutledning     |
|                      | xAI (Grok)        | Betala per användning | Inga                     | Grok 4 resonemang          |
|                      | Mistral           | Betala per användning | Inga                     | EU-värdade modeller        |
|                      | Förvirring        | Betala per användning | Inga                     | Sökförstärkt               |
|                      | Tillsammans AI    | Betala per användning | Inga                     | Modeller med öppen källkod |
|                      | Fireworks AI      | Betala per användning | Inga                     | Fast FLUX bilder           |
|                      | Cerebras          | Betala per användning | Inga                     | Wafer-skala hastighet      |
|                      | Sammanhålla       | Betala per användning | Inga                     | Kommando R+ RAG            |
|                      | NVIDIA NIM        | Betala per användning | Inga                     | Företagsmodeller           |
| **💰 BILLIGT**       | GLM-4.7           | $0,6/1M               | Dagligen 10:00           | Budget backup              |
|                      | MiniMax M2.1      | $0,2/1M               | 5-timmars rullande       | Billigaste alternativet    |
|                      | Kimi K2           | 9 USD/mån lägenhet    | 10 miljoner tokens/månad | Förutsägbar kostnad        |
| **🆓 GRATIS**        | iFlow             | $0                    | Obegränsad               | 8 modeller gratis          |
|                      | Qwen              | $0                    | Obegränsad               | 3 modeller gratis          |
|                      | Kiro              | $0                    | Obegränsad               | Claude gratis              |

**💡 Proffstips:** Börja med Gemini CLI (180K gratis/månad) + iFlow (obegränsat gratis) combo = $0 kostnad!

---

## 🎯 Användningsfall

### Fall 1: "Jag har Claude Pro-abonnemang"

**Problem:** Kvoten går ut oanvänd, hastighetsgränser under tung kodning

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Fall 2: "Jag vill ha noll kostnad"

**Problem:** Har inte råd med prenumerationer, behöver pålitlig AI-kodning

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Fall 3: "Jag behöver kodning dygnet runt, inga avbrott"

**Problem:** Deadlines, har inte råd med driftstopp

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Fall 4: "Jag vill ha GRATIS AI i OpenClaw"

**Problem:** Behöver AI-assistent i meddelandeappar, helt gratis

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Leverantörsinställningar

### 🔐 Prenumerationsleverantörer

#### Claude Code (Pro/Max)

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

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (GRATIS 180K/månad!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Bäst värde:** Enorma gratis nivå! Använd detta före betalda nivåer.

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Billiga leverantörer

#### GLM-4.7 (Daglig återställning, $0,6/1M)

1. Registrera dig: [Zhipu AI](https://open.bigmodel.cn/)
2. Hämta API-nyckel från Coding Plan
3. Instrumentpanel → Lägg till API-nyckel: Leverantör: `glm`, API-nyckel: `your-key`

**Användning:** `glm/glm-4.7` — **Proffstips:** Coding Plan erbjuder 3× kvot till 1/7 kostnad! Återställ dagligen 10:00.

#### MiniMax M2.1 (5 timmars återställning, $0,20/1M)

1. Registrera dig: [MiniMax](https://www.minimax.io/)
2. Hämta API-nyckel → Dashboard → Lägg till API-nyckel

**Använd:** `minimax/MiniMax-M2.1` — **Proffstips:** Billigaste alternativet för långa sammanhang (1M tokens)!

#### Kimi K2 ($9/månad platt)

1. Prenumerera: [Moonshot AI](https://platform.moonshot.ai/)
2. Hämta API-nyckel → Dashboard → Lägg till API-nyckel

**Användning:** `kimi/kimi-latest` — **Proffstips:** Fast $9/månad för 10 miljoner tokens = $0,90/1 miljon effektiv kostnad!

### 🆓 GRATIS leverantörer

#### iFlow (8 GRATIS modeller)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 GRATIS modeller)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

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

---

## 🔧 CLI-integration

### Markör IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Redigera `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Redigera `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**Eller använd Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Fortsätt / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Implementering

### VPS-distribution

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### Hamnarbetare

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

För värdintegrerat läge med CLI-binärer, se Docker-sektionen i huvuddokumenten.

### Miljövariabler

| Variabel              | Standard                             | Beskrivning                                            |
| --------------------- | ------------------------------------ | ------------------------------------------------------ |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | JWT-signeringshemlighet (**förändring i produktion**)  |
| `INITIAL_PASSWORD`    | `123456`                             | Första inloggningslösenordet                           |
| `DATA_DIR`            | `~/.omniroute`                       | Datakatalog (db, användning, loggar)                   |
| `PORT`                | ram standard                         | Serviceport (`20128` i exempel)                        |
| `HOSTNAME`            | ram standard                         | Bind värd (Docker har som standard `0.0.0.0`)          |
| `NODE_ENV`            | runtime default                      | Ställ in `production` för distribution                 |
| `BASE_URL`            | `http://localhost:20128`             | Intern bas-URL på serversidan                          |
| `CLOUD_URL`           | `https://omniroute.dev`              | Bas-URL för molnsynkroniseringsslutpunkt               |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | HMAC-hemlighet för genererade API-nycklar              |
| `REQUIRE_API_KEY`     | `false`                              | Framtvinga Bearer API-nyckel på `/v1/*`                |
| `ENABLE_REQUEST_LOGS` | `false`                              | Aktiverar förfrågnings-/svarsloggar                    |
| `AUTH_COOKIE_SECURE`  | `false`                              | Tvinga `Secure` auth-cookie (bakom HTTPS omvänd proxy) |

För den fullständiga referensen till miljövariabeln, se [README](../README.md).

---

## 📊 Tillgängliga modeller

<details>
<summary><b>Visa alla tillgängliga modeller</b></summary>

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0,6/1M: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0,2/1M: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Förvirring (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Kohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Avancerade funktioner

### Anpassade modeller

Lägg till valfritt modell-ID till valfri leverantör utan att vänta på en appuppdatering:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Eller använd Dashboard: **Leverantörer → [Leverantör] → Anpassade modeller**.

### Dedikerade leverantörsrutter

Ruttförfrågningar direkt till en specifik leverantör med modellvalidering:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Providerprefixet läggs till automatiskt om det saknas. Omatchade modeller returnerar `400`.

### Nätverksproxykonfiguration

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**Tillrang:** Nyckelspecifik → Kombinationsspecifik → Leverantörsspecifik → Global → Miljö.

### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Returnerar modeller grupperade efter leverantör med typer (`chat`, `embedding`, `image`).

### Cloud Sync

- Synkronisera leverantörer, kombinationer och inställningar mellan enheter
- Automatisk bakgrundssynkronisering med timeout + felsnabb
- Föredrar serversidan `BASE_URL`/`CLOUD_URL` i produktion

### LLM Gateway Intelligence (fas 9)

- **Semantisk cache** — Autocachar icke-strömmande, temperatur=0 svar (förbikoppla med `X-OmniRoute-No-Cache: true`)
- **Begär idempotens** — Avduplicerar förfrågningar inom 5s via `Idempotency-Key` eller `X-Request-Id` header
- **Förloppsspårning** — Opt-in SSE `event: progress`-händelser via `X-OmniRoute-Progress: true` header

---

### Översättarlekplats

Åtkomst via **Dashboard → Översättare**. Felsöka och visualisera hur OmniRoute översätter API-förfrågningar mellan leverantörer.

| Läge             | Syfte                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------- |
| **Lekplats**     | Välj käll-/målformat, klistra in en begäran och se den översatta utdata direkt              |
| **Chatttestare** | Skicka livechattmeddelanden via proxyn och inspektera hela begäran/svarscykeln              |
| **Testbänk**     | Kör batchtester över flera formatkombinationer för att verifiera översättningens korrekthet |
| **Live Monitor** | Se översättningar i realtid när förfrågningar flödar genom proxyn                           |

**Användningsfall:**

- Felsök varför en specifik kombination av klient/leverantör misslyckas
- Verifiera att tanketaggar, verktygsanrop och systemuppmaningar översätts korrekt
- Jämför formatskillnader mellan OpenAI, Claude, Gemini och Responses API-format

---

### Routingstrategier

Konfigurera via **Dashboard → Inställningar → Routing**.

| Strategi                       | Beskrivning                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Fyll först**                 | Använder konton i prioritetsordning – primärt konto hanterar alla förfrågningar tills det inte är tillgängligt |
| **Round Robin**                | Går igenom alla konton med en konfigurerbar sticky limit (standard: 3 samtal per konto)                        |
| **P2C (Power of Two Choices)** | Väljer 2 slumpmässiga konton och vägar till det friskare — balanserar belastning med medvetenhet om hälsa      |
| **Slumpmässig**                | Väljer slumpmässigt ett konto för varje begäran med Fisher-Yates shuffle                                       |
| **Minst använda**              | Rutter till kontot med den äldsta `lastUsedAt` tidsstämpeln, fördelar trafiken jämnt                           |
| **Kostnadsoptimerad**          | Rutter till kontot med lägst prioritetsvärde, optimerar för lägsta kostnadsleverantörer                        |

#### Modelalias med jokertecken

Skapa jokerteckenmönster för att mappa om modellnamn:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Jokertecken stöder `*` (alla tecken) och `?` (enkeltecken).

#### Reservkedjor

Definiera globala reservkedjor som gäller för alla förfrågningar:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Motståndskraft och effektbrytare

Konfigurera via **Dashboard → Inställningar → Resilience**.

OmniRoute implementerar motståndskraft på leverantörsnivå med fyra komponenter:

1. **Provider Profiles** — Konfiguration per leverantör för:
   - Feltröskel (hur många fel före öppning)
   - Nedkylningstid
   - Känslighet för detektering av hastighetsgräns
   - Exponentiell backoff-parametrar

2. **Redigerbara hastighetsgränser** — Standardinställningar på systemnivå som kan konfigureras i instrumentpanelen:
   - **Requests Per Minute (RPM)** — Maximalt antal förfrågningar per minut och konto
   - **Minsta tid mellan förfrågningar** — Minsta mellanrum i millisekunder mellan förfrågningar
   - **Max samtidiga förfrågningar** — Maximalt antal samtidiga förfrågningar per konto
   - Klicka på **Redigera** för att ändra och sedan på **Spara** eller **Avbryt**. Värden kvarstår via resilience API.

3. **Circuit Breaker** — Spårar fel per leverantör och öppnar automatiskt kretsen när ett tröskelvärde nås:
   - **STÄNGD** (frisk) — Begäran flyter normalt
   - **ÖPPEN** — Leverantören är tillfälligt blockerad efter upprepade fel
   - **HALF_OPEN** — Testar om leverantören har återhämtat sig

4. **Policy & Locked Identifiers** — Visar strömbrytarens status och låsta identifierare med tvångsupplåsning.

5. **Rate Limit Auto-Detection** — Övervakar `429` och `Retry-After` rubriker för att proaktivt undvika att nå leverantörshastighetsgränser.

**Proffstips:** Använd knappen **Återställ alla** för att rensa alla strömbrytare och nedkylningar när en leverantör återhämtar sig efter ett avbrott.

---

### Databasexport/import

Hantera säkerhetskopiering av databas i **Dashboard → Inställningar → System och lagring**.

| Åtgärd                       | Beskrivning                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Exportera databas**        | Laddar ned den aktuella SQLite-databasen som en `.sqlite`-fil                                                                                                        |
| **Exportera alla (.tar.gz)** | Laddar ner ett fullständigt säkerhetskopieringsarkiv inklusive: databas, inställningar, kombinationer, leverantörsanslutningar (inga referenser), API-nyckelmetadata |
| **Importera databas**        | Ladda upp en `.sqlite` fil för att ersätta den aktuella databasen. En säkerhetskopia före import skapas automatiskt                                                  |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Importvalidering:** Den importerade filen är validerad för integritet (SQLite pragmakontroll), obligatoriska tabeller (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) och storlek (max 100 MB).

**Användningsfall:**

- Migrera OmniRoute mellan maskiner
- Skapa externa säkerhetskopior för katastrofåterställning
- Dela konfigurationer mellan teammedlemmar (exportera alla → dela arkiv)

---

### Inställningar Dashboard

Inställningssidan är organiserad i 5 flikar för enkel navigering:

| Tab           | Innehåll                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| **Säkerhet**  | Inställningar för inloggning/lösenord, IP-åtkomstkontroll, API-auth för `/models` och leverantörsblockering |
| **Ruttning**  | Global routingstrategi (6 alternativ), jokerteckenmodellalias, reservkedjor, kombinationsstandarder         |
| **Resiliens** | Leverantörsprofiler, redigerbara hastighetsgränser, strömbrytarstatus, policyer och låsta identifierare     |
| **AI**        | Tänkande budgetkonfiguration, global systempromptinjektion, promptcachestatistik                            |
| **Avancerat** | Global proxykonfiguration (HTTP/SOCKS5)                                                                     |

---

### Kostnader och budgethantering

Åtkomst via **Dashboard → Kostnader**.

| Tab        | Syfte                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| **Budget** | Ställ in utgiftsgränser per API-nyckel med dagliga/veckovisa/månatliga budgetar och realtidsspårning |
| **Priser** | Visa och redigera modellprisposter — kostnad per 1000 in-/utdata-tokens per leverantör               |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Kostnadsspårning:** Varje begäran loggar tokenanvändning och beräknar kostnaden med hjälp av pristabellen. Visa uppdelningar i **Dashboard → Användning** efter leverantör, modell och API-nyckel.

---

### Ljudtranskription

OmniRoute stöder ljudtranskription via den OpenAI-kompatibla slutpunkten:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Tillgängliga leverantörer: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Ljudformat som stöds: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Kombinerade balanseringsstrategier

Konfigurera balansering per kombination i **Dashboard → Kombinationer → Skapa/Redigera → Strategi**.

| Strategi              | Beskrivning                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Round-Robin**       | Roterar genom modeller sekventiellt                                                    |
| **Prioritet**         | Försöker alltid den första modellen; faller tillbaka endast på fel                     |
| **Slumpmässig**       | Väljer en slumpmässig modell från kombinationen för varje begäran                      |
| **Viktad**            | Rutter proportionellt baserade på tilldelade vikter per modell                         |
| **Minst använda**     | Rutter till modellen med de minsta senaste förfrågningarna (använder kombinationsmått) |
| **Kostnadsoptimerad** | Rutter till den billigaste tillgängliga modellen (använder pristabell)                 |

Globala kombinationsstandarder kan ställas in i **Dashboard → Inställningar → Routing → Combo Defaults**.

---

### Health Dashboard

Åtkomst via **Dashboard → Hälsa**. Systemhälsoöversikt i realtid med 6 kort:

| Kort                 | Vad den visar                                                      |
| -------------------- | ------------------------------------------------------------------ |
| **Systemstatus**     | Drifttid, version, minnesanvändning, datakatalog                   |
| **Providers hälsa**  | Tillstånd för strömbrytare per leverantör (stängd/öppen/halvöppen) |
| **Taxegränser**      | Aktiva nedkylningar per konto med återstående tid                  |
| **Aktiva låsningar** | Leverantörer tillfälligt blockerade av lockoutpolicyn              |
| **Signaturcache**    | Dedupliceringscachestatistik (aktiva nycklar, träffhastighet)      |
| **Latens-telemetri** | p50/p95/p99 latensaggregation per leverantör                       |

**Proffstips:** Hälsosidan uppdateras automatiskt var tionde sekund. Använd strömbrytarkortet för att identifiera vilka leverantörer som har problem.
