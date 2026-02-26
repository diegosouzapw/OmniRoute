# Brukerveiledning

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Komplett veiledning for å konfigurere leverandører, lage kombinasjoner, integrere CLI-verktøy og distribuere OmniRoute.

---

## Innholdsfortegnelse

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Priser på et øyeblikk

| Nivå              | Leverandør        | Kostnad         | Kvote Tilbakestill      | Best for                 |
| ----------------- | ----------------- | --------------- | ----------------------- | ------------------------ |
| **💳 ABONNEMENT** | Claude Code (Pro) | $20/md          | 5t + ukentlig           | Allerede abonnert        |
|                   | Codex (Pluss/Pro) | $20-200/md      | 5t + ukentlig           | OpenAI-brukere           |
|                   | Gemini CLI        | **GRATIS**      | 180K/mnd + 1K/dag       | Alle sammen!             |
|                   | GitHub Copilot    | $10-19/md       | Månedlig                | GitHub-brukere           |
| **🔑 API NØKKEL** | DeepSeek          | Betal per bruk  | Ingen                   | Billig resonnement       |
|                   | Groq              | Betal per bruk  | Ingen                   | Ultrarask slutning       |
|                   | xAI (Grok)        | Betal per bruk  | Ingen                   | Grok 4 resonnement       |
|                   | Mistral           | Betal per bruk  | Ingen                   | EU-vertsbaserte modeller |
|                   | Forvirring        | Betal per bruk  | Ingen                   | Søkeutvidet              |
|                   | Sammen AI         | Betal per bruk  | Ingen                   | Åpen kildekode-modeller  |
|                   | Fyrverkeri AI     | Betal per bruk  | Ingen                   | Rask FLUX bilder         |
|                   | Cerebras          | Betal per bruk  | Ingen                   | Wafer-skala hastighet    |
|                   | Sammenheng        | Betal per bruk  | Ingen                   | Kommando R+ RAG          |
|                   | NVIDIA NIM        | Betal per bruk  | Ingen                   | Bedriftsmodeller         |
| **💰 BILLIG**     | GLM-4.7           | $0,6/1M         | Daglig 10:00            | Budsjett backup          |
|                   | MiniMax M2.1      | $0,2/1 million  | 5-timers rullende       | Billigste alternativ     |
|                   | Kimi K2           | $9/md leilighet | 10 millioner tokens/mnd | Forutsigbar kostnad      |
| **🆓 GRATIS**     | iFlow             | $0              | Ubegrenset              | 8 modeller gratis        |
|                   | Qwen              | $0              | Ubegrenset              | 3 modeller gratis        |
|                   | Kiro              | $0              | Ubegrenset              | Claude gratis            |

**💡 Profftips:** Start med Gemini CLI (180K gratis/måned) + iFlow (ubegrenset gratis) kombinasjon = $0 kostnad!

---

## 🎯 Brukssaker

### Sak 1: "Jeg har Claude Pro-abonnement"

**Problem:** Kvoten utløper ubrukt, satsgrenser under tung koding

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Tilfelle 2: "Jeg vil ha null kostnad"

**Problem:** Har ikke råd til abonnementer, trenger pålitelig AI-koding

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Tilfelle 3: "Jeg trenger 24/7 koding, ingen avbrudd"

**Problem:** Tidsfrister, har ikke råd til nedetid

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

### Tilfelle 4: "Jeg vil ha GRATIS AI i OpenClaw"

**Problem:** Trenger AI-assistent i meldingsapper, helt gratis

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Leverandøroppsett

### 🔐 Abonnementsleverandører

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

**Profftips:** Bruk Opus for komplekse oppgaver, Sonnet for hastighet. OmniRoute sporer kvote per modell!

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

**Mest verdi:** Enormt gratis nivå! Bruk dette før betalte nivåer.

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

### 💰 Billige leverandører

#### GLM-4.7 (Daglig tilbakestilling, $0,6/1M)

1. Registrer deg: [Zhipu AI](https://open.bigmodel.cn/)
2. Få API-nøkkel fra Coding Plan
3. Dashboard → Legg til API-nøkkel: Leverandør: `glm`, API-nøkkel: `your-key`

**Bruk:** `glm/glm-4.7` — **Profftips:** Kodeplan tilbyr 3× kvote til 1/7 kostnad! Tilbakestill daglig 10:00.

#### MiniMax M2.1 (5t tilbakestilling, $0,20/1M)

1. Registrer deg: [MiniMax](https://www.minimax.io/)
2. Hent API-nøkkel → Dashboard → Legg til API-nøkkel

**Bruk:** `minimax/MiniMax-M2.1` — **Profftips:** Billigste alternativet for lang kontekst (1M tokens)!

#### Kimi K2 ($9/mnd leilighet)

1. Abonner: [Moonshot AI](https://platform.moonshot.ai/)
2. Hent API-nøkkel → Dashboard → Legg til API-nøkkel

**Bruk:** `kimi/kimi-latest` — **Profftips:** Fast $9/måned for 10M tokens = $0,90/1M effektiv kostnad!

### 🆓 GRATIS Leverandører

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

## 🎨 Kombinasjoner

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

---

## 🔧 CLI-integrasjon

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

**Eller bruk Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Fortsett / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Utrulling

### VPS-distribusjon

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

For vertsintegrert modus med CLI-binærfiler, se Docker-delen i hoveddokumentene.

### Miljøvariabler

| Variabel              | Standard                             | Beskrivelse                                                      |
| --------------------- | ------------------------------------ | ---------------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | JWT signeringshemmelighet (**endring i produksjon**)             |
| `INITIAL_PASSWORD`    | `123456`                             | Første påloggingspassord                                         |
| `DATA_DIR`            | `~/.omniroute`                       | Datakatalog (db, bruk, logger)                                   |
| `PORT`                | standard rammeverk                   | Tjenesteport (`20128` i eksempler)                               |
| `HOSTNAME`            | standard rammeverk                   | Bind vert (Docker er standard til `0.0.0.0`)                     |
| `NODE_ENV`            | kjøretidsstandard                    | Sett `production` for distribusjon                               |
| `BASE_URL`            | `http://localhost:20128`             | Intern basis-URL på tjenersiden                                  |
| `CLOUD_URL`           | `https://omniroute.dev`              | Nettadresse for endepunkt for nettskysynkronisering              |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | HMAC-hemmelighet for genererte API-nøkler                        |
| `REQUIRE_API_KEY`     | `false`                              | Håndhev Bearer API-nøkkel på `/v1/*`                             |
| `ENABLE_REQUEST_LOGS` | `false`                              | Aktiverer forespørsels-/svarlogger                               |
| `AUTH_COOKIE_SECURE`  | `false`                              | Tving `Secure` auth-informasjonskapsel (bak HTTPS omvendt proxy) |

For hele miljøvariabelreferansen, se [README](../README.md).

---

## 📊 Tilgjengelige modeller

<details>
<summary><b>Se alle tilgjengelige modeller</b></summary>

**Claude-kode (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Kodeks (`cx/`)** — Pluss/Proff: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

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

**Forvirring (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Kohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Avanserte funksjoner

### Egendefinerte modeller

Legg til hvilken som helst modell-ID til en hvilken som helst leverandør uten å vente på en appoppdatering:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Eller bruk Dashboard: **Leverandører → [Leverandør] → Egendefinerte modeller**.

### Dedikerte leverandørruter

Rute forespørsler direkte til en spesifikk leverandør med modellvalidering:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Leverandørprefikset blir automatisk lagt til hvis det mangler. Umatchede modeller returnerer `400`.

### Network Proxy Configuration

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

**Forrang:** Nøkkelspesifikk → Kombinasjonsspesifikk → Leverandørspesifikk → Global → Miljø.

### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Returnerer modeller gruppert etter leverandør med typer (`chat`, `embedding`, `image`).

### Cloud Sync

- Synkroniser leverandører, kombinasjoner og innstillinger på tvers av enheter
- Automatisk bakgrunnssynkronisering med timeout + feil-rask
- Foretrekk server-side `BASE_URL`/`CLOUD_URL` i produksjon

### LLM Gateway Intelligence (fase 9)

- **Semantisk hurtigbuffer** — Automatisk hurtigbufring uten strømming, temperatur=0 svar (omgå med `X-OmniRoute-No-Cache: true`)
- **Request Idempotency** — Dedupliserer forespørsler innen 5 sekunder via `Idempotency-Key` eller `X-Request-Id` header
- **Fremdriftssporing** — Meld deg på SSE `event: progress` hendelser via `X-OmniRoute-Progress: true` header

---

### Oversetter Lekeplass

Tilgang via **Dashboard → Oversetter**. Feilsøk og visualiser hvordan OmniRoute oversetter API-forespørsler mellom leverandører.

| Modus            | Formål                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| **Lekeplass**    | Velg kilde-/målformater, lim inn en forespørsel og se den oversatte utgangen umiddelbart         |
| **Chattetester** | Send live chat-meldinger gjennom proxyen og inspiser hele forespørsels-/svarsyklusen             |
| **Testbenk**     | Kjør batch-tester på tvers av flere formatkombinasjoner for å bekrefte oversettelsens korrekthet |
| **Live Monitor** | Se sanntidsoversettelser mens forespørsler strømmer gjennom proxyen                              |

**Brukstilfeller:**

- Feilsøk hvorfor en spesifikk klient/leverandør-kombinasjon mislykkes
- Bekreft at tankekoder, verktøykall og systemmeldinger oversettes riktig
- Sammenlign formatforskjeller mellom OpenAI, Claude, Gemini og Responses API-formater

---

### Rutingstrategier

Konfigurer via **Dashboard → Innstillinger → Ruting**.

| Strategi                       | Beskrivelse                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **Fyll først**                 | Bruker kontoer i prioritert rekkefølge — primærkonto håndterer alle forespørsler inntil utilgjengelig    |
| **Round Robin**                | Bla gjennom alle kontoer med en konfigurerbar klebrig grense (standard: 3 samtaler per konto)            |
| **P2C (Power of Two Choices)** | Velger 2 tilfeldige kontoer og ruter til den sunnere — balanserer belastning med bevissthet om helse     |
| **Tilfeldig**                  | Velger tilfeldig en konto for hver forespørsel ved hjelp av Fisher-Yates shuffle                         |
| **Minst brukt**                | Ruter til kontoen med det eldste `lastUsedAt` tidsstemplet, fordeler trafikk jevnt                       |
| **Kostnadsoptimalisert**       | Ruter til kontoen med den laveste prioritetsverdien, optimalisering for de laveste kostnadsleverandørene |

#### Jokertegn modellaliaser

Lag jokertegnmønstre for å tilordne modellnavn på nytt:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Jokertegn støtter `*` (alle tegn) og `?` (enkelttegn).

#### Reservekjeder

Definer globale reservekjeder som gjelder for alle forespørsler:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Spenst og effektbrytere

Konfigurer via **Dashboard → Innstillinger → Resiliens**.

OmniRoute implementerer motstandskraft på leverandørnivå med fire komponenter:

1. **Leverandørprofiler** — Konfigurasjon per leverandør for:
   - Feilterskel (hvor mange feil før åpning)
   - Nedkjølingsvarighet
   - Følsomhet for deteksjon av hastighetsgrense
   - Eksponentielle backoff-parametere

2. **Redigerbare rategrenser** — Standardinnstillinger på systemnivå som kan konfigureres i dashbordet:
   - **Forespørsler per minutt (RPM)** — Maksimalt antall forespørsler per minutt per konto
   - **Min time Between Requests** — Minimumsavstand i millisekunder mellom forespørsler
   - **Maks samtidige forespørsler** — Maksimalt antall samtidige forespørsler per konto
   - Klikk på **Rediger** for å endre, deretter **Lagre** eller **Avbryt**. Verdiene vedvarer via resilience API.

3. **Circuit Breaker** — Sporer feil per leverandør og åpner automatisk kretsen når en terskel er nådd:
   - **STENGT** (Sunn) — Forespørslene flyter normalt
   - **ÅPEN** — Leverandøren er midlertidig blokkert etter gjentatte feil
   - **HALF_OPEN** — Tester om leverandøren har kommet seg

4. **Retningslinjer og låste identifikatorer** — Viser strømbryterstatus og låste identifikatorer med tvangsopplåsingsfunksjon.

5. **Rate Limit Auto-Detection** — Overvåker `429` og `Retry-After` overskrifter for å proaktivt unngå å treffe leverandørens takstgrenser.

**Profftips:** Bruk **Tilbakestill alle**-knappen for å fjerne alle strømbrytere og nedkjøling når en leverandør kommer seg etter et strømbrudd.

---

### Databaseeksport/import

Administrer sikkerhetskopiering av databaser i **Dashboard → Innstillinger → System og lagring**.

| Handling                     | Beskrivelse                                                                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Eksporter database**       | Laster ned gjeldende SQLite-database som en `.sqlite`-fil                                                                                                        |
| **Eksporter alle (.tar.gz)** | Laster ned et fullstendig sikkerhetskopiarkiv inkludert: database, innstillinger, kombinasjoner, leverandørtilkoblinger (ingen legitimasjon), API-nøkkelmetadata |
| **Importer database**        | Last opp en `.sqlite`-fil for å erstatte gjeldende database. En forhåndsimport-sikkerhetskopi opprettes automatisk                                               |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Importvalidering:** Den importerte filen er validert for integritet (SQLite pragmasjekk), nødvendige tabeller (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) og størrelse (maks 100 MB).

**Brukstilfeller:**

- Migrer OmniRoute mellom maskiner
- Lag eksterne sikkerhetskopier for katastrofegjenoppretting
- Del konfigurasjoner mellom teammedlemmer (eksporter alle → del arkiv)

---

### Innstillinger Dashboard

Innstillingssiden er organisert i 5 faner for enkel navigering:

| Tab           | Innhold                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Sikkerhet** | Innstillinger for pålogging/passord, IP-tilgangskontroll, API-autentisering for `/models` og leverandørblokkering |
| **Ruting**    | Global rutingstrategi (6 alternativer), jokertegnmodellaliaser, reservekjeder, kombinasjonsstandarder             |
| **Resiliens** | Leverandørprofiler, redigerbare hastighetsgrenser, strømbryterstatus, retningslinjer og låste identifikatorer     |
| **AI**        | Tenker budsjettkonfigurasjon, global systempromptinjeksjon, promptbufferstatistikk                                |
| **Avansert**  | Global proxy-konfigurasjon (HTTP/SOCKS5)                                                                          |

---

### Kostnader og budsjettstyring

Tilgang via **Dashboard → Kostnader**.

| Tab          | Formål                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------ |
| **Budsjett** | Angi utgiftsgrenser per API-nøkkel med daglige/ukentlige/månedlige budsjetter og sanntidssporing |
| **Pris**     | Se og rediger modellprisoppføringer — kostnad per 1K input/output tokens per leverandør          |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Kostnadssporing:** Hver forespørsel logger tokenbruk og beregner kostnad ved hjelp av pristabellen. Se oversikter i **Dashboard → Bruk** etter leverandør, modell og API-nøkkel.

---

### Lydtranskripsjon

OmniRoute støtter lydtranskripsjon via det OpenAI-kompatible endepunktet:

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

Tilgjengelige leverandører: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Støttede lydformater: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Kombinasjonsbalanseringsstrategier

Konfigurer balansering per kombinasjon i **Dashboard → Combos → Opprett/Rediger → Strategi**.

| Strategi                 | Beskrivelse                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Round-Robin**          | Roterer gjennom modellene sekvensielt                                               |
| **Prioritet**            | Prøver alltid den første modellen; faller tilbake kun på feil                       |
| **Tilfeldig**            | Velger en tilfeldig modell fra kombinasjonen for hver forespørsel                   |
| **Vektet**               | Ruter proporsjonalt basert på tildelte vekter per modell                            |
| **Minst brukt**          | Ruter til modellen med færrest nylige forespørsler (bruker kombinasjonsberegninger) |
| **Kostnadsoptimalisert** | Ruter til den billigste tilgjengelige modellen (bruker pristabell)                  |

Globale kombinasjonsstandarder kan angis i **Dashboard → Innstillinger → Ruting → Combo-standarder**.

---

### Helse Dashboard

Tilgang via **Dashboard → Helse**. Sanntids systemhelseoversikt med 6 kort:

| Kort                  | Hva det viser                                                 |
| --------------------- | ------------------------------------------------------------- |
| **Systemstatus**      | Oppetid, versjon, minnebruk, datakatalog                      |
| **Leverandørs helse** | Per leverandør effektbrytertilstand (lukket/åpen/halvåpen)    |
| **Satsgrenser**       | Aktive nedkjølingshastigheter per konto med gjenværende tid   |
| **Aktive Lockouts**   | Leverandører midlertidig blokkert av lockout-policyen         |
| **Signaturbuffer**    | Dedupliseringsbufferstatistikk (aktive nøkler, trefffrekvens) |
| **Latens-telemetri**  | p50/p95/p99 latensaggregering per leverandør                  |

**Profftips:** Helsesiden oppdateres automatisk hvert 10. sekund. Bruk kretsbryterkortet til å identifisere hvilke leverandører som har problemer.
