# API-referens

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Fullständig referens för alla OmniRoute API-slutpunkter.

---

## Innehållsförteckning

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## Chattavslut

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Anpassade rubriker

| Rubrik                   | Riktning | Beskrivning                               |
| ------------------------ | -------- | ----------------------------------------- |
| `X-OmniRoute-No-Cache`   | Begäran  | Ställ in på `true` för att kringgå cache  |
| `X-OmniRoute-Progress`   | Begäran  | Ställ in på `true` för framstegshändelser |
| `Idempotency-Key`        | Begäran  | Dedup-nyckel (5s fönster)                 |
| `X-Request-Id`           | Begäran  | Alternativ dedup-nyckel                   |
| `X-OmniRoute-Cache`      | Svar     | `HIT` eller `MISS` (icke-streaming)       |
| `X-OmniRoute-Idempotent` | Svar     | `true` om deduplicerad                    |
| `X-OmniRoute-Progress`   | Svar     | `enabled` om förloppsspårning på          |

---

## Inbäddningar

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Tillgängliga leverantörer: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Bildgenerering

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Tillgängliga leverantörer: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Lista modeller

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Kompatibilitetsslutpunkter

| Metod | Väg                         | Format                   |
| ----- | --------------------------- | ------------------------ |
| POST  | `/v1/chat/completions`      | OpenAI                   |
| POST  | `/v1/messages`              | Antropisk                |
| POST  | `/v1/responses`             | OpenAI-svar              |
| POST  | `/v1/embeddings`            | OpenAI                   |
| POST  | `/v1/images/generations`    | OpenAI                   |
| FÅ    | `/v1/models`                | OpenAI                   |
| POST  | `/v1/messages/count_tokens` | Antropisk                |
| FÅ    | `/v1beta/models`            | Tvillingarna             |
| POST  | `/v1beta/models/{...path}`  | Gemini generera innehåll |
| POST  | `/v1/api/chat`              | Ollama                   |

### Dedikerade leverantörsrutter

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Providerprefixet läggs till automatiskt om det saknas. Omatchade modeller returnerar `400`.

---

## Semantisk cache

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Exempel på svar:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Dashboard & Management

### Autentisering

| Slutpunkt                     | Metod   | Beskrivning            |
| ----------------------------- | ------- | ---------------------- |
| `/api/auth/login`             | POST    | Logga in               |
| `/api/auth/logout`            | POST    | Logga ut               |
| `/api/settings/require-login` | GET/PUT | Växla inloggning krävs |

### Leverantörshantering

| Slutpunkt                    | Metod            | Beskrivning                          |
| ---------------------------- | ---------------- | ------------------------------------ |
| `/api/providers`             | GET/POSTA        | Lista / skapa leverantörer           |
| `/api/providers/[id]`        | GET/PUT/DELETE   | Hantera en leverantör                |
| `/api/providers/[id]/test`   | POST             | Testa leverantörsanslutning          |
| `/api/providers/[id]/models` | FÅ               | Lista leverantörsmodeller            |
| `/api/providers/validate`    | POST             | Validera leverantörens konfiguration |
| `/api/provider-nodes*`       | Olika            | Leverantörsnodhantering              |
| `/api/provider-models`       | GET/POSTA/RADERA | Anpassade modeller                   |

### OAuth-flöden

| Slutpunkt                        | Metod | Beskrivning               |
| -------------------------------- | ----- | ------------------------- |
| `/api/oauth/[provider]/[action]` | Olika | Leverantörsspecifik OAuth |

### Routing & Config

| Slutpunkt             | Metod     | Beskrivning                          |
| --------------------- | --------- | ------------------------------------ |
| `/api/models/alias`   | GET/POSTA | Modellalias                          |
| `/api/models/catalog` | FÅ        | Alla modeller efter leverantör + typ |
| `/api/combos*`        | Olika     | Kombinationshantering                |
| `/api/keys*`          | Olika     | API-nyckelhantering                  |
| `/api/pricing`        | FÅ        | Modellprissättning                   |

### Användning och analys

| Slutpunkt                   | Metod | Beskrivning               |
| --------------------------- | ----- | ------------------------- |
| `/api/usage/history`        | FÅ    | Användningshistorik       |
| `/api/usage/logs`           | FÅ    | Användningsloggar         |
| `/api/usage/request-logs`   | FÅ    | Loggar på begäran-nivå    |
| `/api/usage/[connectionId]` | FÅ    | Användning per anslutning |

### Inställningar

| Slutpunkt                       | Metod   | Beskrivning                         |
| ------------------------------- | ------- | ----------------------------------- |
| `/api/settings`                 | GET/PUT | Allmänna inställningar              |
| `/api/settings/proxy`           | GET/PUT | Nätverksproxykonfiguration          |
| `/api/settings/proxy/test`      | POST    | Testa proxyanslutning               |
| `/api/settings/ip-filter`       | GET/PUT | IP-tillståndslista/blockeringslista |
| `/api/settings/thinking-budget` | GET/PUT | Resonera token budget               |
| `/api/settings/system-prompt`   | GET/PUT | Global systemprompt                 |

### Övervakning

| Slutpunkt                | Metod        | Beskrivning            |
| ------------------------ | ------------ | ---------------------- |
| `/api/sessions`          | FÅ           | Aktiv sessionsspårning |
| `/api/rate-limits`       | FÅ           | Räntegränser per konto |
| `/api/monitoring/health` | FÅ           | Hälsokontroll          |
| `/api/cache`             | HÄMTA/RADERA | Cachestatistik / rensa |

### Säkerhetskopiering & export/import

| Slutpunkt                   | Metod | Beskrivning                                            |
| --------------------------- | ----- | ------------------------------------------------------ |
| `/api/db-backups`           | FÅ    | Lista tillgängliga säkerhetskopior                     |
| `/api/db-backups`           | SÄTT  | Skapa en manuell säkerhetskopia                        |
| `/api/db-backups`           | POST  | Återställ från en specifik säkerhetskopia              |
| `/api/db-backups/export`    | FÅ    | Ladda ner databas som .sqlite-fil                      |
| `/api/db-backups/import`    | POST  | Ladda upp .sqlite-fil för att ersätta databas          |
| `/api/db-backups/exportAll` | FÅ    | Ladda ner fullständig säkerhetskopia som .tar.gz-arkiv |

### Cloud Sync

| Slutpunkt              | Metod | Beskrivning                    |
| ---------------------- | ----- | ------------------------------ |
| `/api/sync/cloud`      | Olika | Molnsynkroniseringsoperationer |
| `/api/sync/initialize` | POST  | Initiera synkronisering        |
| `/api/cloud/*`         | Olika | Molnhantering                  |

### CLI-verktyg

| Slutpunkt                          | Metod | Beskrivning         |
| ---------------------------------- | ----- | ------------------- |
| `/api/cli-tools/claude-settings`   | FÅ    | Claude CLI status   |
| `/api/cli-tools/codex-settings`    | FÅ    | Codex CLI-status    |
| `/api/cli-tools/droid-settings`    | FÅ    | Droid CLI-status    |
| `/api/cli-tools/openclaw-settings` | FÅ    | OpenClaw CLI-status |
| `/api/cli-tools/runtime/[toolId]`  | FÅ    | Generisk CLI-körtid |

CLI-svar inkluderar: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Resiliens och hastighetsgränser

| Slutpunkt               | Metod   | Beskrivning                         |
| ----------------------- | ------- | ----------------------------------- |
| `/api/resilience`       | GET/PUT | Skaffa/uppdatera resiliensprofiler  |
| `/api/resilience/reset` | POST    | Återställ brytare                   |
| `/api/rate-limits`      | FÅ      | Räntegränsstatus per konto          |
| `/api/rate-limit`       | FÅ      | Global hastighetsgränskonfiguration |

### Evals

| Slutpunkt    | Metod     | Beskrivning                                |
| ------------ | --------- | ------------------------------------------ |
| `/api/evals` | GET/POSTA | Lista utvärderingssviter / kör utvärdering |

### Policyer

| Slutpunkt       | Metod            | Beskrivning          |
| --------------- | ---------------- | -------------------- |
| `/api/policies` | GET/POSTA/RADERA | Hantera ruttpolicyer |

### Efterlevnad

| Slutpunkt                   | Metod | Beskrivning                               |
| --------------------------- | ----- | ----------------------------------------- |
| `/api/compliance/audit-log` | FÅ    | Granskningslogg för efterlevnad (sista N) |

### v1beta (Gemini-kompatibel)

| Slutpunkt                  | Metod | Beskrivning                        |
| -------------------------- | ----- | ---------------------------------- |
| `/v1beta/models`           | FÅ    | Lista modeller i Gemini-format     |
| `/v1beta/models/{...path}` | POST  | Gemini `generateContent` slutpunkt |

Dessa slutpunkter speglar Geminis API-format för klienter som förväntar sig inbyggd Gemini SDK-kompatibilitet.

### Interna / System API: er

| Slutpunkt       | Metod | Beskrivning                                                    |
| --------------- | ----- | -------------------------------------------------------------- |
| `/api/init`     | FÅ    | Applikationsinitieringskontroll (används vid första körningen) |
| `/api/tags`     | FÅ    | Ollama-kompatibla modelltaggar (för Ollama-klienter)           |
| `/api/restart`  | POST  | Utlösa graciös serveromstart                                   |
| `/api/shutdown` | POST  | Utlösa graciös serveravstängning                               |

> **Obs:** Dessa slutpunkter används internt av systemet eller för Ollama-klientkompatibilitet. De anropas vanligtvis inte av slutanvändare.

---

## Ljudtranskription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transkribera ljudfiler med Deepgram eller AssemblyAI.

**Begäran:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Svar:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

** Leverantörer som stöds:** `deepgram/nova-3`, `assemblyai/best`.

**Format som stöds:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Ollama-kompatibilitet

För klienter som använder Ollamas API-format:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Förfrågningar översätts automatiskt mellan Ollama och interna format.

---

## Telemetri

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Svar:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Budget

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## Modelltillgänglighet

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Bearbetning av begäran

1. Kunden skickar förfrågan till `/v1/*`
2. Rutthanteraren anropar `handleChat`, `handleEmbedding`, `handleAudioTranscription` eller `handleImageGeneration`
3. Modellen är löst (direkt leverantör/modell eller alias/kombo)
4. Inloggningsuppgifter valda från lokal DB med filtrering av kontotillgänglighet
5. För chatt: `handleChatCore` — formatdetektering, översättning, cachekontroll, idempotenskontroll
6. Leverantörs exekutor skickar uppströmsbegäran
7. Svar översatt till klientformat (chatt) eller returnerat som det är (inbäddningar/bilder/ljud)
8. Användning/loggning registrerad
9. Fallback gäller vid fel enligt komboregler

Fullständig arkitekturreferens: [link](ARCHITECTURE.md)

---

## Autentisering

- Dashboard rutter (`/dashboard/*`) använder `auth_token` cookie
- Inloggning använder sparad lösenordshash; reserv till `INITIAL_PASSWORD`
- `requireLogin` kan växlas via `/api/settings/require-login`
- `/v1/*` rutter kräver valfritt Bearer API-nyckel när `REQUIRE_API_KEY=true`
