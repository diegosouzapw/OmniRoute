# Gebruikershandleiding

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Volledige gids voor het configureren van providers, het maken van combo's, het integreren van CLI-tools en het implementeren van OmniRoute.

---

## Inhoudsopgave

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Prijzen in één oogopslag

| Niveau             | Aanbieder         | Kosten              | Quotum opnieuw instellen | Beste voor                  |
| ------------------ | ----------------- | ------------------- | ------------------------ | --------------------------- |
| **💳 ABONNEMENT**  | Claude Code (Pro) | $ 20/maand          | 5u + wekelijks           | Al geabonneerd              |
|                    | Codex (Plus/Pro)  | $ 20-200/maand      | 5u + wekelijks           | OpenAI-gebruikers           |
|                    | Tweeling CLI      | **GRATIS**          | 180K/maand + 1K/dag      | Iedereen!                   |
|                    | GitHub-copiloot   | $ 10-19/maand       | Maandelijks              | GitHub-gebruikers           |
| **🔑 API-SLEUTEL** | DeepSeek          | Betalen per gebruik | Geen                     | Goedkoop redeneren          |
|                    | Groq              | Betalen per gebruik | Geen                     | Ultrasnelle gevolgtrekking  |
|                    | xAI (Grok)        | Betalen per gebruik | Geen                     | Grok 4 redenering           |
|                    | Mistral           | Betalen per gebruik | Geen                     | Door de EU gehoste modellen |
|                    | Verbijstering     | Betalen per gebruik | Geen                     | Zoek-uitgebreid             |
|                    | Samen AI          | Betalen per gebruik | Geen                     | Open source-modellen        |
|                    | Vuurwerk AI       | Betalen per gebruik | Geen                     | Snelle FLUX-afbeeldingen    |
|                    | Hersenen          | Betalen per gebruik | Geen                     | Snelheid op wafelschaal     |
|                    | Cohier            | Betalen per gebruik | Geen                     | Commando R+ RAG             |
|                    | NVIDIA NIM        | Betalen per gebruik | Geen                     | Enterprise-modellen         |
| **💰GOEDKOOP**     | GLM-4.7           | $ 0,6/1 miljoen     | Dagelijks 10.00 uur      | Budgetback-up               |
|                    | MiniMax M2.1      | $ 0,2/1 miljoen     | 5-uurs rollen            | Goedkoopste optie           |
|                    | Kimi K2           | $ 9/maand plat      | 10 miljoen tokens/maand  | Voorspelbare kosten         |
| **🆓 GRATIS**      | iFlow             | $0                  | Onbeperkt                | 8 modellen gratis           |
|                    | Qwen              | $0                  | Onbeperkt                | 3 modellen gratis           |
|                    | Kiro              | $0                  | Onbeperkt                | Claude vrij                 |

**💡 Pro-tip:** Begin met Gemini CLI (180K gratis/maand) + iFlow (onbeperkt gratis) combo = $ 0 kosten!

---

## 🎯 Gebruiksscenario's

### Geval 1: "Ik heb een Claude Pro-abonnement"

**Probleem:** Quotum verloopt ongebruikt, snelheidslimieten tijdens intensief coderen

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Geval 2: "Ik wil geen kosten"

**Probleem:** Ik kan geen abonnementen betalen, heb betrouwbare AI-codering nodig

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Geval 3: "Ik heb 24/7 codering nodig, geen onderbrekingen"

**Probleem:** Deadlines, downtime is niet mogelijk

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

### Case 4: "Ik wil GRATIS AI in OpenClaw"

**Probleem:** AI-assistent nodig in berichtenapps, geheel gratis

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Providerconfiguratie

### 🔐 Abonnementsaanbieders

#### Claude-code (Pro/Max)

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

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (GRATIS 180K/maand!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Beste waarde:** Enorm gratis niveau! Gebruik dit vóór betaalde niveaus.

#### GitHub-copiloot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Goedkope aanbieders

#### GLM-4.7 (dagelijkse reset, $0,6/1 miljoen)

1. Aanmelden: [Zhipu AI](https://open.bigmodel.cn/)
2. Haal de API-sleutel op uit het Coderingsplan
3. Dashboard → API-sleutel toevoegen: Provider: `glm`, API-sleutel: `your-key`

**Gebruik:** `glm/glm-4.7` — **Pro-tip:** Codeerplan biedt 3× quota tegen 1/7 kosten! Dagelijks resetten om 10:00 uur.

#### MiniMax M2.1 (5 uur resetten, $0,20/1M)

1. Aanmelden: [MiniMax](https://www.minimax.io/)
2. API-sleutel ophalen → Dashboard → API-sleutel toevoegen

**Gebruik:** `minimax/MiniMax-M2.1` — **Pro-tip:** Goedkoopste optie voor lange context (1 miljoen tokens)!

#### Kimi K2 ($9/maand vast)

1. Abonneer je: [Moonshot AI](https://platform.moonshot.ai/)
2. API-sleutel ophalen → Dashboard → API-sleutel toevoegen

**Gebruik:** `kimi/kimi-latest` — **Pro-tip:** Vaste $ 9/maand voor 10 miljoen tokens = $ 0,90/1 miljoen effectieve kosten!

### 🆓 GRATIS Aanbieders

#### iFlow (8 GRATIS modellen)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 GRATIS modellen)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude GRATIS)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨Combo's

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

---

## 🔧 CLI-integratie

### Cursor-IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude-code

Bewerk `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex-CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### Open Klauw

Bewerk `~/.openclaw/openclaw.json`:

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

**Of gebruik Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Doorgaan / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Implementatie

### VPS-implementatie

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

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Voor de host-geïntegreerde modus met CLI-binaire bestanden raadpleegt u de Docker-sectie in de hoofddocumentatie.

### Omgevingsvariabelen

| Variabel              | Standaard                            | Beschrijving                                              |
| --------------------- | ------------------------------------ | --------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | JWT-ondertekeningsgeheim (**productiewijziging**)         |
| `INITIAL_PASSWORD`    | `123456`                             | Wachtwoord voor eerste aanmelding                         |
| `DATA_DIR`            | `~/.omniroute`                       | Gegevensmap (db, gebruik, logs)                           |
| `PORT`                | standaard raamwerk                   | Servicepoort (`20128` in voorbeelden)                     |
| `HOSTNAME`            | standaard raamwerk                   | Bind host (Docker is standaard ingesteld op `0.0.0.0`)    |
| `NODE_ENV`            | runtime-standaard                    | Stel `production` in voor implementatie                   |
| `BASE_URL`            | `http://localhost:20128`             | Interne basis-URL aan serverzijde                         |
| `CLOUD_URL`           | `https://omniroute.dev`              | Basis-URL van cloudsynchronisatie-eindpunt                |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | HMAC-geheim voor gegenereerde API-sleutels                |
| `REQUIRE_API_KEY`     | `false`                              | Bearer API-sleutel afdwingen op `/v1/*`                   |
| `ENABLE_REQUEST_LOGS` | `false`                              | Schakelt verzoek-/antwoordlogboeken in                    |
| `AUTH_COOKIE_SECURE`  | `false`                              | Forceer `Secure` auth-cookie (achter HTTPS reverse proxy) |

Zie [README](../README.md) voor de volledige referentie van de omgevingsvariabelen.

---

## 📊 Beschikbare modellen

<details>
<summary><b>Bekijk alle beschikbare modellen</b></summary>

**Claude-code (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub-copiloot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $ 0,6/1 miljoen: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $ 0,2/1 miljoen: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Verbijstering (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Samen AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Vuurwerk AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebra's (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Samenhang (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Geavanceerde functies

### Aangepaste modellen

Voeg elke model-ID toe aan elke provider zonder te wachten op een app-update:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Of gebruik Dashboard: **Aanbieders → [Aanbieder] → Aangepaste modellen**.

### Speciale providerroutes

Routeer verzoeken rechtstreeks naar een specifieke provider met modelvalidatie:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Het providervoorvoegsel wordt automatisch toegevoegd als het ontbreekt. Niet-overeenkomende modellen retourneren `400`.

### Netwerkproxyconfiguratie

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

**Voorrang:** Sleutelspecifiek → Combospecifiek → Providerspecifiek → Globaal → Omgeving.

### Modelcatalogus-API

```bash
curl http://localhost:20128/api/models/catalog
```

Retourneert modellen gegroepeerd op provider met typen (`chat`, `embedding`, `image`).

### Cloudsynchronisatie

- Synchroniseer providers, combo's en instellingen op verschillende apparaten
- Automatische achtergrondsynchronisatie met time-out + fail-fast
- Geef de voorkeur aan server-side `BASE_URL`/`CLOUD_URL` in productie

### LLM Gateway Intelligence (Fase 9)

- **Semantische cache** — Niet-streaming automatisch cachen, temperatuur=0 reacties (omzeilen met `X-OmniRoute-No-Cache: true`)
- **Request Idempotency** — Ontdubbelt verzoeken binnen 5 seconden via `Idempotency-Key` of `X-Request-Id` header
- **Voortgang bijhouden** — Meld u aan voor SSE `event: progress`-gebeurtenissen via de `X-OmniRoute-Progress: true` header

---

### Vertalerspeeltuin

Toegang via **Dashboard → Vertaler**. Debug en visualiseer hoe OmniRoute API-verzoeken tussen providers vertaalt.

| Modus           | Doel                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **Speeltuin**   | Selecteer bron-/doelformaten, plak een verzoek en bekijk direct de vertaalde uitvoer                  |
| **Chattester**  | Stuur livechatberichten via de proxy en inspecteer de volledige aanvraag/antwoordcyclus               |
| **Proefbank**   | Voer batchtests uit voor meerdere formaatcombinaties om de juistheid van de vertalingen te verifiëren |
| **Livemonitor** | Bekijk realtime vertalingen terwijl verzoeken via de proxy                                            |

**Gebruiksscenario's:**

- Debug waarom een specifieke client/provider-combinatie mislukt
- Controleer of denktags, tooloproepen en systeemprompts correct worden vertaald
- Vergelijk formaatverschillen tussen OpenAI-, Claude-, Gemini- en Responses API-formaten

---

### Routeringsstrategieën

Configureer via **Dashboard → Instellingen → Routing**.

| Strategie                        | Beschrijving                                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Eerst invullen**               | Gebruikt accounts in volgorde van prioriteit: het primaire account handelt alle verzoeken af ​​totdat deze niet meer beschikbaar zijn |
| **Ronde Robin**                  | Bladert door alle accounts met een configureerbare sticky limiet (standaard: 3 oproepen per account)                                  |
| **P2C (Kracht van twee keuzes)** | Kiest 2 willekeurige accounts en routes naar de gezondere – balanceert de belasting met bewustzijn van de gezondheid                  |
| **Willekeurig**                  | Selecteert willekeurig een account voor elk verzoek met behulp van Fisher-Yates shuffle                                               |
| **Minst gebruikt**               | Routes naar het account met de oudste `lastUsedAt` tijdstempel, waardoor het verkeer gelijkmatig wordt verdeeld                       |
| **Kostengeoptimaliseerd**        | Routes naar het account met de laagste prioriteitswaarde, geoptimaliseerd voor providers met de laagste kosten                        |

#### Wildcard-modelaliassen

Maak jokertekenpatronen om modelnamen opnieuw toe te wijzen:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Jokertekens ondersteunen `*` (willekeurige tekens) en `?` (enkel teken).

#### Terugvalketens

Definieer globale fallback-ketens die op alle verzoeken van toepassing zijn:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Veerkracht en stroomonderbrekers

Configureer via **Dashboard → Instellingen → Veerkracht**.

OmniRoute implementeert veerkracht op providerniveau met vier componenten:

1. **Providerprofielen** — Configuratie per provider voor:
   - Foutdrempel (hoeveel fouten vóór opening)
   - Cooldown-duur
   - Snelheidslimietdetectiegevoeligheid
   - Exponentiële uitstelparameters

2. **Bewerkbare tarieflimieten** — Standaardinstellingen op systeemniveau configureerbaar in het dashboard:
   - **Verzoeken per minuut (RPM)** — Maximaal aantal verzoeken per minuut per account
   - **Min. tijd tussen verzoeken** — Minimale pauze in milliseconden tussen verzoeken
   - **Max. gelijktijdige verzoeken** — Maximaal gelijktijdige verzoeken per account
   - Klik op **Bewerken** om te wijzigen en vervolgens op **Opslaan** of **Annuleren**. Waarden blijven behouden via de veerkracht-API.

3. **Circuit Breaker** — Volgt storingen per provider en opent automatisch het circuit wanneer een drempel wordt bereikt:
   - **GESLOTEN** (Gezond) — Verzoeken stromen normaal door
   - **OPEN** — Provider is tijdelijk geblokkeerd na herhaalde fouten
   - **HALF_OPEN** — Testen of de provider is hersteld

4. **Beleid en vergrendelde identificatiegegevens** — Toont de status van de stroomonderbreker en vergrendelde identificatiegegevens met de mogelijkheid tot geforceerd ontgrendelen.

5. **Automatische detectie van tarieflimiet** — Controleert de headers `429` en `Retry-After` om proactief te voorkomen dat de tarieflimieten van de provider worden overschreden.

**Pro-tip:** Gebruik de knop **Alles resetten** om alle stroomonderbrekers en cooldowns te wissen wanneer een provider herstelt van een storing.

---

### Database exporteren/importeren

Beheer databaseback-ups in **Dashboard → Instellingen → Systeem en opslag**.

| Actie                          | Beschrijving                                                                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Database exporteren**        | Downloadt de huidige SQLite-database als een `.sqlite` bestand                                                                                       |
| **Alles exporteren (.tar.gz)** | Downloadt een volledig back-uparchief inclusief: database, instellingen, combo's, providerverbindingen (geen inloggegevens), API-sleutelmetagegevens |
| **Database importeren**        | Upload een `.sqlite` bestand om de huidige database te vervangen. Er wordt automatisch een pre-importback-up gemaakt                                 |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Importvalidatie:** Het geïmporteerde bestand wordt gevalideerd op integriteit (SQLite pragmacontrole), vereiste tabellen (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) en grootte (max. 100 MB).

**Gebruiksscenario's:**

- Migreer OmniRoute tussen machines
- Maak externe back-ups voor noodherstel
- Deel configuraties tussen teamleden (alles exporteren → archief delen)

---

### Instellingendashboard

De instellingenpagina is onderverdeeld in 5 tabbladen voor eenvoudige navigatie:

| Tabblad         | Inhoud                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Beveiliging** | Login-/wachtwoordinstellingen, IP-toegangscontrole, API-authenticatie voor `/models` en providerblokkering                |
| **Routing**     | Globale routeringsstrategie (6 opties), wildcard-modelaliassen, fallback-ketens, combo-standaardwaarden                   |
| **Veerkracht**  | Providerprofielen, bewerkbare tarieflimieten, status van stroomonderbrekers, beleid en vergrendelde identificatiegegevens |
| **AI**          | Denken aan budgetconfiguratie, globale systeempromptinjectie, prompt cachestatistieken                                    |
| **Geavanceerd** | Globale proxyconfiguratie (HTTP/SOCKS5)                                                                                   |

---

### Kosten- en budgetbeheer

Toegang via **Dashboard → Kosten**.

| Tabblad       | Doel                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Begroting** | Stel bestedingslimieten per API-sleutel in met dagelijkse/wekelijkse/maandelijkse budgetten en realtime tracking |
| **Prijzen**   | Bekijk en bewerk modelprijsgegevens — kosten per 1K input/output-tokens per provider                             |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Kosten bijhouden:** Bij elk verzoek wordt het tokengebruik geregistreerd en worden de kosten berekend met behulp van de prijstabel. Bekijk de uitsplitsingen in **Dashboard → Gebruik** per provider, model en API-sleutel.

---

### Audiotranscriptie

OmniRoute ondersteunt audiotranscriptie via het OpenAI-compatibele eindpunt:

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

Beschikbare providers: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Ondersteunde audioformaten: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Combo-balanceringsstrategieën

Configureer de balans per combo in **Dashboard → Combo's → Maken/bewerken → Strategie**.

| Strategie                 | Beschrijving                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------- |
| **Round-Robin**           | Roteert opeenvolgend door modellen                                                  |
| **Prioriteit**            | Probeert altijd het eerste model; valt alleen terug op fouten                       |
| **Willekeurig**           | Kiest voor elk verzoek een willekeurig model uit de combo                           |
| **Gewogen**               | Routes proportioneel op basis van toegekende gewichten per model                    |
| **Minst gebruikt**        | Routes naar het model met de minste recente verzoeken (gebruikt combo-statistieken) |
| **Kostengeoptimaliseerd** | Routes naar het goedkoopste beschikbare model (gebruikt prijstabel)                 |

Algemene combo-standaardinstellingen kunnen worden ingesteld in **Dashboard → Instellingen → Routing → Combo-standaardwaarden**.

---

### Gezondheidsdashboard

Toegang via **Dashboard → Gezondheid**. Realtime overzicht van de systeemstatus met 6 kaarten:

| Kaart                       | Wat het laat zien                                                          |
| --------------------------- | -------------------------------------------------------------------------- |
| **Systeemstatus**           | Uptime, versie, geheugengebruik, datadirectory                             |
| **Provider Gezondheid**     | Status stroomonderbreker per provider (gesloten/open/halfopen)             |
| **Tarieflimieten**          | Actieve afkoelperiodes voor tarieflimieten per account met resterende tijd |
| **Actieve vergrendelingen** | Providers tijdelijk geblokkeerd door het lockoutbeleid                     |
| **Handtekeningcache**       | Deduplicatiecachestatistieken (actieve sleutels, trefpercentage)           |
| **Latentietelemetrie**      | p50/p95/p99-latentieaggregatie per provider                                |

**Pro-tip:** De Gezondheidspagina wordt elke 10 seconden automatisch vernieuwd. Gebruik de stroomonderbrekerkaart om te identificeren welke providers problemen ondervinden.
