# API-reference

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Komplet reference for alle OmniRoute API-slutpunkter.

---

## Indholdsfortegnelse

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

## Chatafslutninger

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

### Brugerdefinerede overskrifter

| Overskrift               | Retning   | Beskrivelse                                    |
| ------------------------ | --------- | ---------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Anmodning | Indstil til `true` for at omgå cache           |
| `X-OmniRoute-Progress`   | Anmodning | Indstil til `true` for fremskridtsbegivenheder |
| `Idempotency-Key`        | Anmodning | Dedup nøgle (5s vindue)                        |
| `X-Request-Id`           | Anmodning | Alternativ dedup nøgle                         |
| `X-OmniRoute-Cache`      | Svar      | `HIT` eller `MISS` (ikke-streaming)            |
| `X-OmniRoute-Idempotent` | Svar      | `true` hvis deduplikeret                       |
| `X-OmniRoute-Progress`   | Svar      | `enabled` hvis statussporing på                |

---

## Indlejringer

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Tilgængelige udbydere: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Billedgenerering

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

Tilgængelige udbydere: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Liste over modeller

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Kompatibilitetsslutpunkter

| Metode | Sti                         | Format                 |
| ------ | --------------------------- | ---------------------- |
| POST   | `/v1/chat/completions`      | OpenAI                 |
| POST   | `/v1/messages`              | Antropisk              |
| POST   | `/v1/responses`             | OpenAI-svar            |
| POST   | `/v1/embeddings`            | OpenAI                 |
| POST   | `/v1/images/generations`    | OpenAI                 |
| FÅ     | `/v1/models`                | OpenAI                 |
| POST   | `/v1/messages/count_tokens` | Antropisk              |
| FÅ     | `/v1beta/models`            | Tvillingerne           |
| POST   | `/v1beta/models/{...path}`  | Gemini generer indhold |
| POST   | `/v1/api/chat`              | Ollama                 |

### Dedikerede udbyderruter

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Udbyderpræfikset tilføjes automatisk, hvis det mangler. Umatchede modeller returnerer `400`.

---

## Semantisk cache

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Eksempel på svar:

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

### Godkendelse

| Slutpunkt                     | Metode  | Beskrivelse          |
| ----------------------------- | ------- | -------------------- |
| `/api/auth/login`             | POST    | Log ind              |
| `/api/auth/logout`            | POST    | Log ud               |
| `/api/settings/require-login` | GET/PUT | Skift login påkrævet |

### Udbyderstyring

| Slutpunkt                    | Metode        | Beskrivelse                  |
| ---------------------------- | ------------- | ---------------------------- |
| `/api/providers`             | GET/POST      | Liste/opret udbydere         |
| `/api/providers/[id]`        | GET/SETT/SLET | Administrer en udbyder       |
| `/api/providers/[id]/test`   | POST          | Test udbyderforbindelse      |
| `/api/providers/[id]/models` | FÅ            | Liste udbydermodeller        |
| `/api/providers/validate`    | POST          | Valider udbyderkonfiguration |
| `/api/provider-nodes*`       | Forskellige   | Udbyder node management      |
| `/api/provider-models`       | GET/POST/SLET | Brugerdefinerede modeller    |

### OAuth-flows

| Slutpunkt                        | Metode      | Beskrivelse           |
| -------------------------------- | ----------- | --------------------- |
| `/api/oauth/[provider]/[action]` | Forskellige | Udbyderspecifik OAuth |

### Routing & Config

| Slutpunkt             | Metode      | Beskrivelse                        |
| --------------------- | ----------- | ---------------------------------- |
| `/api/models/alias`   | GET/POST    | Modelaliaser                       |
| `/api/models/catalog` | FÅ          | Alle modeller efter udbyder + type |
| `/api/combos*`        | Forskellige | Combo management                   |
| `/api/keys*`          | Forskellige | API nøglestyring                   |
| `/api/pricing`        | FÅ          | Modelpriser                        |

### Brug og analyse

| Slutpunkt                   | Metode | Beskrivelse                  |
| --------------------------- | ------ | ---------------------------- |
| `/api/usage/history`        | FÅ     | Brugshistorik                |
| `/api/usage/logs`           | FÅ     | Brugslogs                    |
| `/api/usage/request-logs`   | FÅ     | Logfiler på anmodningsniveau |
| `/api/usage/[connectionId]` | FÅ     | Brug pr. forbindelse         |

### Indstillinger

| Slutpunkt                       | Metode  | Beskrivelse                         |
| ------------------------------- | ------- | ----------------------------------- |
| `/api/settings`                 | GET/PUT | Generelle indstillinger             |
| `/api/settings/proxy`           | GET/PUT | Netværk proxy-konfiguration         |
| `/api/settings/proxy/test`      | POST    | Test proxyforbindelse               |
| `/api/settings/ip-filter`       | GET/PUT | IP-tilladelsesliste/blokeringsliste |
| `/api/settings/thinking-budget` | GET/PUT | Begrundelse token budget            |
| `/api/settings/system-prompt`   | GET/PUT | Global systemprompt                 |

### Overvågning

| Slutpunkt                | Metode  | Beskrivelse           |
| ------------------------ | ------- | --------------------- |
| `/api/sessions`          | FÅ      | Aktiv sessionssporing |
| `/api/rate-limits`       | FÅ      | Satsgrænser pr. konto |
| `/api/monitoring/health` | FÅ      | Sundhedstjek          |
| `/api/cache`             | FÅ/SLET | Cache-statistik/ryd   |

### Sikkerhedskopiering og eksport/import

| Slutpunkt                   | Metode | Beskrivelse                                  |
| --------------------------- | ------ | -------------------------------------------- |
| `/api/db-backups`           | FÅ     | Liste over tilgængelige sikkerhedskopier     |
| `/api/db-backups`           | SÆT    | Opret en manuel backup                       |
| `/api/db-backups`           | POST   | Gendan fra en specifik sikkerhedskopi        |
| `/api/db-backups/export`    | FÅ     | Download database som .sqlite-fil            |
| `/api/db-backups/import`    | POST   | Upload .sqlite-fil for at erstatte databasen |
| `/api/db-backups/exportAll` | FÅ     | Download fuld backup som .tar.gz-arkiv       |

### Cloud Sync

| Slutpunkt              | Metode      | Beskrivelse                      |
| ---------------------- | ----------- | -------------------------------- |
| `/api/sync/cloud`      | Forskellige | Cloud-synkroniseringsoperationer |
| `/api/sync/initialize` | POST        | Initialiser synkronisering       |
| `/api/cloud/*`         | Forskellige | Cloud management                 |

### CLI-værktøjer

| Slutpunkt                          | Metode | Beskrivelse          |
| ---------------------------------- | ------ | -------------------- |
| `/api/cli-tools/claude-settings`   | FÅ     | Claude CLI status    |
| `/api/cli-tools/codex-settings`    | FÅ     | Codex CLI-status     |
| `/api/cli-tools/droid-settings`    | FÅ     | Droid CLI status     |
| `/api/cli-tools/openclaw-settings` | FÅ     | OpenClaw CLI status  |
| `/api/cli-tools/runtime/[toolId]`  | FÅ     | Generisk CLI runtime |

CLI-svar inkluderer: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Modstandsdygtighed og satsgrænser

| Slutpunkt               | Metode  | Beskrivelse                          |
| ----------------------- | ------- | ------------------------------------ |
| `/api/resilience`       | GET/PUT | Få/opdater resiliensprofiler         |
| `/api/resilience/reset` | POST    | Nulstil afbrydere                    |
| `/api/rate-limits`      | FÅ      | Satsgrænsestatus pr. konto           |
| `/api/rate-limit`       | FÅ      | Global hastighedsgrænsekonfiguration |

### Evals

| Slutpunkt    | Metode   | Beskrivelse                         |
| ------------ | -------- | ----------------------------------- |
| `/api/evals` | GET/POST | Liste eval suiter / køre evaluering |

### Politikker

| Slutpunkt       | Metode        | Beskrivelse                   |
| --------------- | ------------- | ----------------------------- |
| `/api/policies` | GET/POST/SLET | Administrer routingpolitikker |

### Overholdelse

| Slutpunkt                   | Metode | Beskrivelse                          |
| --------------------------- | ------ | ------------------------------------ |
| `/api/compliance/audit-log` | FÅ     | Overholdelsesrevisionslog (sidste N) |

### v1beta (Gemini-kompatibel)

| Slutpunkt                  | Metode | Beskrivelse                        |
| -------------------------- | ------ | ---------------------------------- |
| `/v1beta/models`           | FÅ     | Vis modeller i Gemini-format       |
| `/v1beta/models/{...path}` | POST   | Gemini `generateContent` slutpunkt |

Disse endepunkter afspejler Geminis API-format for klienter, der forventer indbygget Gemini SDK-kompatibilitet.

### Interne / System API'er

| Slutpunkt       | Metode | Beskrivelse                                               |
| --------------- | ------ | --------------------------------------------------------- |
| `/api/init`     | FÅ     | Applikationsinitieringskontrol (bruges ved første kørsel) |
| `/api/tags`     | FÅ     | Ollama-kompatible modelmærker (til Ollama-kunder)         |
| `/api/restart`  | POST   | Udløs yndefuld servergenstart                             |
| `/api/shutdown` | POST   | Udløs yndefuld serverlukning                              |

> **Bemærk:** Disse endepunkter bruges internt af systemet eller til Ollama-klientkompatibilitet. De kaldes typisk ikke af slutbrugere.

---

## Lydtransskription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transskriber lydfiler ved hjælp af Deepgram eller AssemblyAI.

**Forespørgsel:**

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

**Understøttede udbydere:** `deepgram/nova-3`, `assemblyai/best`.

**Understøttede formater:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Ollama-kompatibilitet

For klienter, der bruger Ollamas API-format:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Forespørgsler oversættes automatisk mellem Ollama og interne formater.

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

## Modeltilgængelighed

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

## Anmodningsbehandling

1. Klient sender anmodning til `/v1/*`
2. Rutehandler kalder `handleChat`, `handleEmbedding`, `handleAudioTranscription` eller `handleImageGeneration`
3. Modellen er løst (direkte udbyder/model eller alias/kombination)
4. Oplysninger valgt fra lokal DB med filtrering af kontotilgængelighed
5. Til chat: `handleChatCore` — formatdetektion, oversættelse, cachecheck, idempotenstjek
6. Udbyder eksekutør sender upstream anmodning
7. Svar oversat tilbage til klientformat (chat) eller returneret som det er (indlejringer/billeder/lyd)
8. Brug/logning registreret
9. Fallback gælder for fejl i henhold til combo regler

Fuld arkitekturreference: [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## Godkendelse

- Dashboard-ruter (`/dashboard/*`) bruger `auth_token`-cookie
- Login bruger gemt adgangskode-hash; tilbagefald til `INITIAL_PASSWORD`
- `requireLogin` kan skiftes via `/api/settings/require-login`
- `/v1/*`-ruter kræver valgfrit Bearer API-nøgle, når `REQUIRE_API_KEY=true`
