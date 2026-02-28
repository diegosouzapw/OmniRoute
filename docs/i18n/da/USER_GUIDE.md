# Brugervejledning

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Komplet guide til konfiguration af udbydere, oprettelse af kombinationer, integration af CLI-værktøjer og implementering af OmniRoute.

---

## Indholdsfortegnelse

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Prissætning på et øjeblik

| Tier              | Udbyder           | Omkostninger        | Kvote nulstilling  | Bedst til                  |
| ----------------- | ----------------- | ------------------- | ------------------ | -------------------------- |
| **💳 ABONNEMENT** | Claude Code (Pro) | 20 USD/md.          | 5 timer + ugentlig | Allerede abonneret         |
|                   | Codex (Plus/Pro)  | $20-200/md.         | 5 timer + ugentlig | OpenAI-brugere             |
|                   | Gemini CLI        | **GRATIS**          | 180K/md + 1K/dag   | Alle sammen!               |
|                   | GitHub Copilot    | $10-19/md.          | Månedlig           | GitHub-brugere             |
| **🔑 API NØGLE**  | DeepSeek          | Betal pr. brug      | Ingen              | Billig ræsonnement         |
|                   | Groq              | Betal pr. brug      | Ingen              | Ultrahurtig slutning       |
|                   | xAI (Grok)        | Betal pr. brug      | Ingen              | Grok 4 ræsonnement         |
|                   | Mistral           | Betal pr. brug      | Ingen              | EU-hostede modeller        |
|                   | Forvirring        | Betal pr. brug      | Ingen              | Søgeforøget                |
|                   | Sammen AI         | Betal pr. brug      | Ingen              | Open source-modeller       |
|                   | Fyrværkeri AI     | Betal pr. brug      | Ingen              | Fast FLUX billeder         |
|                   | Cerebras          | Betal pr. brug      | Ingen              | Wafer-skala hastighed      |
|                   | Sammenhæng        | Betal pr. brug      | Ingen              | Kommando R+ RAG            |
|                   | NVIDIA NIM        | Betal pr. brug      | Ingen              | Virksomhedsmodeller        |
| **💰 BILLIG**     | GLM-4.7           | 0,6 USD/1 mio.      | Dagligt 10:00      | Budget backup              |
|                   | MiniMax M2.1      | $0,2/1 mio.         | 5-timers rullende  | Billigste mulighed         |
|                   | Kimi K2           | 9 USD/md. lejlighed | 10M tokens/md.     | Forudsigelige omkostninger |
| **🆓 GRATIS**     | iFlow             | $0                  | Ubegrænset         | 8 modeller gratis          |
|                   | Qwen              | $0                  | Ubegrænset         | 3 modeller gratis          |
|                   | Kiro              | $0                  | Ubegrænset         | Claude gratis              |

**💡 Pro-tip:** Start med Gemini CLI (180K gratis/måned) + iFlow (ubegrænset gratis) combo = $0 omkostninger!

---

## 🎯 Use Cases

### Case 1: "Jeg har Claude Pro-abonnement"

**Problem:** Kvoten udløber ubrugt, satsgrænser under tung kodning

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Case 2: "Jeg vil have nul omkostninger"

**Problem:** Har ikke råd til abonnementer, har brug for pålidelig AI-kodning

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Case 3: "Jeg har brug for 24/7 kodning, ingen afbrydelser"

**Problem:** Deadlines, har ikke råd til nedetid

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

### Case 4: "Jeg vil have GRATIS AI i OpenClaw"

**Problem:** Har brug for AI-assistent i beskedapps, helt gratis

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Udbyderopsætning

### 🔐 Abonnementsudbydere

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

**Prof tip:** Brug Opus til komplekse opgaver, Sonnet for hurtighed. OmniRoute sporer kvote pr. model!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (GRATIS 180K/måned!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Bedste værdi:** Kæmpe gratis niveau! Brug dette før betalte niveauer.

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

### 💰 Billige udbydere

#### GLM-4.7 (Daglig nulstilling, $0,6/1 mio.)

1. Tilmeld dig: [Zhipu AI](https://open.bigmodel.cn/)
2. Hent API-nøgle fra Coding Plan
3. Dashboard → Tilføj API-nøgle: Udbyder: `glm`, API-nøgle: `your-key`

**Brug:** `glm/glm-4.7` — **Prof tip:** Kodningsplan tilbyder 3× kvote til 1/7 pris! Nulstil dagligt 10:00.

#### MiniMax M2.1 (5 timers nulstilling, $0,20/1 mio.)

1. Tilmeld dig: [MiniMax](https://www.minimax.io/)
2. Hent API-nøgle → Dashboard → Tilføj API-nøgle

**Brug:** `minimax/MiniMax-M2.1` — **Prof tip:** Billigste mulighed for lang sammenhæng (1M tokens)!

#### Kimi K2 ($9/måned lejlighed)

1. Abonner: [Moonshot AI](https://platform.moonshot.ai/)
2. Hent API-nøgle → Dashboard → Tilføj API-nøgle

**Brug:** `kimi/kimi-latest` — **Prof tip:** Fast $9/måned for 10M tokens = $0,90/1M effektive omkostninger!

### 🆓 GRATIS udbydere

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

#### Kiro (Claude GRATIS)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Kombinationer

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

---

## 🔧 CLI-integration

### Markør IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Rediger `~/.claude/config.json`:

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

Rediger `~/.openclaw/openclaw.json`:

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

**Eller brug Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Fortsæt / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Implementering

### VPS-implementering

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

For værtsintegreret tilstand med CLI-binære filer, se Docker-sektionen i hoveddokumenterne.

### Miljøvariabler

| Variabel              | Standard                             | Beskrivelse                                          |
| --------------------- | ------------------------------------ | ---------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | JWT signeringshemmelighed (**ændring i produktion**) |
| `INITIAL_PASSWORD`    | `123456`                             | Første login-adgangskode                             |
| `DATA_DIR`            | `~/.omniroute`                       | Datamappe (db, forbrug, logfiler)                    |
| `PORT`                | ramme standard                       | Serviceport (`20128` i eksempler)                    |
| `HOSTNAME`            | ramme standard                       | Bind vært (Docker er som standard `0.0.0.0`)         |
| `NODE_ENV`            | runtime default                      | Indstil `production` til implementering              |
| `BASE_URL`            | `http://localhost:20128`             | Intern basis-URL på serversiden                      |
| `CLOUD_URL`           | `https://omniroute.dev`              | Base URL for slutpunkt for skysynkronisering         |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | HMAC-hemmelighed for genererede API-nøgler           |
| `REQUIRE_API_KEY`     | `false`                              | Gennemtving Bearer API-nøgle på `/v1/*`              |
| `ENABLE_REQUEST_LOGS` | `false`                              | Aktiverer anmodnings-/svarlogs                       |
| `AUTH_COOKIE_SECURE`  | `false`                              | Tving `Secure` auth-cookie (bag HTTPS omvendt proxy) |

For den fulde reference til miljøvariablen, se [README](../README.md).

---

## 📊 Tilgængelige modeller

<details>
<summary><b>Se alle tilgængelige modeller</b></summary>

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — 0,6 USD/1 mio.: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0,2/1 mio.: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Forvirring (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Kohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Avancerede funktioner

### Brugerdefinerede modeller

Tilføj ethvert model-id til enhver udbyder uden at vente på en appopdatering:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Eller brug Dashboard: **Udbydere → [Udbyder] → Brugerdefinerede modeller**.

### Dedikerede udbyderruter

Rut anmodninger direkte til en specifik udbyder med modelvalidering:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Udbyderpræfikset tilføjes automatisk, hvis det mangler. Umatchede modeller returnerer `400`.

### Konfiguration af netværksproxy

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

**Forrang:** Nøglespecifik → Kombinationsspecifik → Udbyderspecifik → Global → Miljø.

### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Returnerer modeller grupperet efter udbyder med typer (`chat`, `embedding`, `image`).

### Cloud Sync

- Synkroniser udbydere, kombinationer og indstillinger på tværs af enheder
- Automatisk baggrundssynkronisering med timeout + fejl-hurtig
- Foretrækker server-side `BASE_URL`/`CLOUD_URL` i produktion

### LLM Gateway Intelligence (fase 9)

- **Semantisk cache** — Auto-cacher ikke-streaming, temperatur=0 svar (omgå med `X-OmniRoute-No-Cache: true`)
- **Anmod om idempotens** — Deduplikerer anmodninger inden for 5 sekunder via `Idempotency-Key` eller `X-Request-Id` header
- **Progress Tracking** — Tilmeld SSE `event: progress` begivenheder via `X-OmniRoute-Progress: true` header

---

### Oversætter Legeplads

Adgang via **Dashboard → Oversætter**. Fejlfind og visualiser, hvordan OmniRoute oversætter API-anmodninger mellem udbydere.

| Tilstand         | Formål                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------- |
| **Legeplads**    | Vælg kilde-/målformater, indsæt en anmodning, og se det oversatte output med det samme        |
| **Chattester**   | Send live chatbeskeder gennem proxyen og inspicer den fulde anmodning/svar-cyklus             |
| **Testbænk**     | Kør batchtest på tværs af flere formatkombinationer for at bekræfte oversættelsens korrekthed |
| **Live Monitor** | Se oversættelser i realtid, mens anmodninger strømmer gennem proxyen                          |

**Brugstilfælde:**

- Fejlfinding af, hvorfor en specifik klient/udbyder-kombination mislykkes
- Bekræft, at tankemærker, værktøjsopkald og systembeskeder oversættes korrekt
- Sammenlign formatforskelle mellem OpenAI, Claude, Gemini og Responses API-formater

---

### Routingstrategier

Konfigurer via **Dashboard → Indstillinger → Routing**.

| Strategi                       | Beskrivelse                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Fyld først**                 | Bruger konti i prioriteret rækkefølge — primær konto håndterer alle anmodninger, indtil de ikke er tilgængelige |
| **Round Robin**                | Går gennem alle konti med en konfigurerbar sticky-grænse (standard: 3 opkald pr. konto)                         |
| **P2C (Power of Two Choices)** | Vælger 2 tilfældige konti og ruter til den sundere — balancerer belastning med bevidsthed om sundhed            |
| **Tilfældig**                  | Vælger tilfældigt en konto for hver anmodning ved hjælp af Fisher-Yates shuffle                                 |
| **Mindst brugt**               | Ruter til kontoen med det ældste `lastUsedAt` tidsstempel, der fordeler trafikken jævnt                         |
| **Omkostningsoptimeret**       | Ruter til kontoen med den laveste prioritetsværdi, optimerer til udbydere med laveste omkostninger              |

#### Wildcard-modelaliaser

Opret jokertegnmønstre for at omdanne modelnavne:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Jokertegn understøtter `*` (alle tegn) og `?` (enkelt tegn).

#### Fallback-kæder

Definer globale reservekæder, der gælder på tværs af alle anmodninger:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Modstandsdygtighed og strømafbrydere

Konfigurer via **Dashboard → Indstillinger → Resiliens**.

OmniRoute implementerer modstandsdygtighed på udbyderniveau med fire komponenter:

1. **Udbyderprofiler** — Konfiguration pr. udbyder for:
   - Fejltærskel (hvor mange fejl før åbning)
   - Nedkølingsvarighed
   - Følsomhed for registrering af hastighedsgrænse
   - Eksponentielle backoff-parametre

2. **Redigerbare hastighedsgrænser** — Standardindstillinger på systemniveau, der kan konfigureres i dashboardet:
   - **Requests Per Minute (RPM)** — Maksimale anmodninger pr. minut pr. konto
   - **Min Time Between Requests** — Minimumsafstand i millisekunder mellem anmodninger
   - **Maksimal samtidige anmodninger** — Maksimalt antal samtidige anmodninger pr. konto
   - Klik på **Rediger** for at ændre, og klik derefter på **Gem** eller **Annuller**. Værdier bevarer via resilience API.

3. **Circuit Breaker** — Sporer fejl pr. udbyder og åbner automatisk kredsløbet, når en tærskel er nået:
   - **LUKKET** (Sund) — Anmodninger flyder normalt
   - **ÅBEN** — Udbyderen er midlertidigt blokeret efter gentagne fejl
   - **HALF_OPEN** — Tester, om udbyderen er genoprettet

4. **Politik og låste identifikatorer** — Viser strømafbryderstatus og låste identifikatorer med tvangsoplåsningsfunktion.

5. **Automatisk registrering af hastighedsgrænse** — Overvåger `429` og `Retry-After` overskrifter for proaktivt at undgå at ramme udbyderens satsgrænser.

**Prof tip:** Brug knappen **Nulstil alle** til at rydde alle strømafbrydere og nedkøling, når en udbyder kommer sig efter en fejl.

---

### Databaseeksport/import

Administrer databasesikkerhedskopier i **Dashboard → Indstillinger → System og lager**.

| Handling                     | Beskrivelse                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Eksporter database**       | Downloader den aktuelle SQLite-database som en `.sqlite`-fil                                                                                                  |
| **Eksporter alle (.tar.gz)** | Downloader et komplet backup-arkiv inklusive: database, indstillinger, kombinationer, udbyderforbindelser (ingen legitimationsoplysninger), API-nøglemetadata |
| **Importer database**        | Upload en `.sqlite` fil for at erstatte den aktuelle database. Der oprettes automatisk en pre-import backup                                                   |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Importvalidering:** Den importerede fil er valideret for integritet (SQLite pragmatjek), påkrævede tabeller (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) og størrelse (maks. 100 MB).

**Brugstilfælde:**

- Migrer OmniRoute mellem maskiner
- Opret eksterne sikkerhedskopier til katastrofegendannelse
- Del konfigurationer mellem teammedlemmer (eksporter alle → del arkiv)

---

### Indstillinger Dashboard

Indstillingssiden er organiseret i 5 faner for nem navigation:

| Faneblad      | Indhold                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| **Sikkerhed** | Indstillinger for login/adgangskode, IP-adgangskontrol, API-godkendelse for `/models` og udbyderblokering |
| **Routing**   | Global routingstrategi (6 muligheder), jokertegn-modelaliaser, reservekæder, combo-standarder             |
| **Resiliens** | Udbyderprofiler, redigerbare hastighedsgrænser, strømafbryderstatus, politikker og låste identifikatorer  |
| **AI**        | Tænkende budgetkonfiguration, global systemprompt-injektion, prompt-cache-statistik                       |
| **Avanceret** | Global proxy-konfiguration (HTTP/SOCKS5)                                                                  |

---

### Omkostninger og budgetstyring

Adgang via **Dashboard → Omkostninger**.

| Faneblad   | Formål                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------- |
| **Budget** | Indstil forbrugsgrænser pr. API-nøgle med daglige/ugentlige/månedlige budgetter og realtidssporing |
| **Priser** | Se og rediger modelprissætninger — pris pr. 1K input/output-tokens pr. udbyder                     |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Omkostningssporing:** Hver anmodning logger tokenbrug og beregner omkostninger ved hjælp af pristabellen. Se opdelinger i **Dashboard → Brug** efter udbyder, model og API-nøgle.

---

### Lydtransskription

OmniRoute understøtter lydtransskription via det OpenAI-kompatible slutpunkt:

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

Tilgængelige udbydere: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Understøttede lydformater: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Kombinationsbalanceringsstrategier

Konfigurer balancering pr. kombination i **Dashboard → Combos → Opret/Rediger → Strategi**.

| Strategi                 | Beskrivelse                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| **Round-Robin**          | Roterer sekventielt gennem modeller                                           |
| **Prioritet**            | Prøver altid den første model; falder kun tilbage på fejl                     |
| **Tilfældig**            | Vælger en tilfældig model fra kombinationen for hver anmodning                |
| **Vægtet**               | Ruter proportionalt baseret på tildelte vægte pr. model                       |
| **Mindst brugt**         | Ruter til modellen med de færreste seneste anmodninger (bruger combo-metrics) |
| **Omkostningsoptimeret** | Ruter til den billigste tilgængelige model (bruger pristabel)                 |

Globale kombinationsstandarder kan indstilles i **Dashboard → Indstillinger → Routing → Combo-standarder**.

---

### Sundhedsdashboard

Adgang via **Dashboard → Health**. Oversigt over systemets tilstand i realtid med 6 kort:

| Kort                  | Hvad det viser                                            |
| --------------------- | --------------------------------------------------------- |
| **Systemstatus**      | Oppetid, version, hukommelsesforbrug, datakatalog         |
| **Udbydersundhed**    | Per-leverandør afbrydertilstand (Lukket/Åben/Halv-Åben)   |
| **Satsgrænser**       | Aktive nedkølingsgrænser pr. konto med resterende tid     |
| **Aktive lockouts**   | Udbydere midlertidigt blokeret af lockout-politikken      |
| **Signatur Cache**    | Deduplikeringscache-statistikker (aktive nøgler, hitrate) |
| **Latency Telemetri** | p50/p95/p99 latenssammenlægning pr. udbyder               |

**Prof tip:** Sundhedssiden opdateres automatisk hvert 10. sekund. Brug afbryderkortet til at identificere, hvilke udbydere der oplever problemer.
