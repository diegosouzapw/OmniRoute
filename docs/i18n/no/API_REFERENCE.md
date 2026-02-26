# API-referanse

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Fullstendig referanse for alle OmniRoute API-endepunkter.

---

## Innholdsfortegnelse

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

## Chatfullføringer

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

### Egendefinerte topptekster

| Overskrift               | Retning     | Beskrivelse                             |
| ------------------------ | ----------- | --------------------------------------- |
| `X-OmniRoute-No-Cache`   | Forespørsel | Sett til `true` for å omgå cache        |
| `X-OmniRoute-Progress`   | Forespørsel | Sett til `true` for fremdriftshendelser |
| `Idempotency-Key`        | Forespørsel | Dedup-nøkkel (5s-vindu)                 |
| `X-Request-Id`           | Forespørsel | Alternativ dedup-nøkkel                 |
| `X-OmniRoute-Cache`      | Svar        | `HIT` eller `MISS` (ikke-streaming)     |
| `X-OmniRoute-Idempotent` | Svar        | `true` hvis deduplisert                 |
| `X-OmniRoute-Progress`   | Svar        | `enabled` hvis fremdriftssporing på     |

---

## Innebygginger

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Tilgjengelige leverandører: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Bildegenerering

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

Tilgjengelige leverandører: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

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

## Kompatibilitetsendepunkter

| Metode  | Sti                         | Format                 |
| ------- | --------------------------- | ---------------------- |
| INNLEGG | `/v1/chat/completions`      | OpenAI                 |
| INNLEGG | `/v1/messages`              | Antropisk              |
| INNLEGG | `/v1/responses`             | OpenAI-svar            |
| INNLEGG | `/v1/embeddings`            | OpenAI                 |
| INNLEGG | `/v1/images/generations`    | OpenAI                 |
| FÅ      | `/v1/models`                | OpenAI                 |
| INNLEGG | `/v1/messages/count_tokens` | Antropisk              |
| FÅ      | `/v1beta/models`            | Tvillingene            |
| INNLEGG | `/v1beta/models/{...path}`  | Gemini generer innhold |
| INNLEGG | `/v1/api/chat`              | Ollama                 |

### Dedikerte leverandørruter

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Leverandørprefikset blir automatisk lagt til hvis det mangler. Umatchede modeller returnerer `400`.

---

## Semantisk buffer

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

## Dashboard og administrasjon

### Autentisering

| Endepunkt                     | Metode   | Beskrivelse            |
| ----------------------------- | -------- | ---------------------- |
| `/api/auth/login`             | INNLEGG  | Logg inn               |
| `/api/auth/logout`            | INNLEGG  | Logg ut                |
| `/api/settings/require-login` | GET/SETT | Bytt innlogging kreves |

### Leverandøradministrasjon

| Endepunkt                    | Metode         | Beskrivelse                     |
| ---------------------------- | -------------- | ------------------------------- |
| `/api/providers`             | GET/POST       | Liste / opprette leverandører   |
| `/api/providers/[id]`        | GET/SETT/SLETT | Administrer en leverandør       |
| `/api/providers/[id]/test`   | INNLEGG        | Test leverandørtilkobling       |
| `/api/providers/[id]/models` | FÅ             | Liste leverandørmodeller        |
| `/api/providers/validate`    | INNLEGG        | Valider leverandørkonfigurasjon |
| `/api/provider-nodes*`       | Diverse        | Leverandørnodeadministrasjon    |
| `/api/provider-models`       | GET/POST/SLETT | Egendefinerte modeller          |

### OAuth-flyter

| Endepunkt                        | Metode  | Beskrivelse               |
| -------------------------------- | ------- | ------------------------- |
| `/api/oauth/[provider]/[action]` | Diverse | Leverandørspesifikk OAuth |

### Ruting og konfig

| Endepunkt             | Metode   | Beskrivelse                           |
| --------------------- | -------- | ------------------------------------- |
| `/api/models/alias`   | GET/POST | Modellaliaser                         |
| `/api/models/catalog` | FÅ       | Alle modeller etter leverandør + type |
| `/api/combos*`        | Diverse  | Combo management                      |
| `/api/keys*`          | Diverse  | API-nøkkelstyring                     |
| `/api/pricing`        | FÅ       | Modellprising                         |

### Bruk og analyse

| Endepunkt                   | Metode | Beskrivelse                |
| --------------------------- | ------ | -------------------------- |
| `/api/usage/history`        | FÅ     | Brukshistorikk             |
| `/api/usage/logs`           | FÅ     | Brukslogger                |
| `/api/usage/request-logs`   | FÅ     | Logger på forespørselsnivå |
| `/api/usage/[connectionId]` | FÅ     | Bruk per tilkobling        |

### Innstillinger

| Endepunkt                       | Metode   | Beskrivelse                           |
| ------------------------------- | -------- | ------------------------------------- |
| `/api/settings`                 | GET/SETT | Generelle innstillinger               |
| `/api/settings/proxy`           | GET/SETT | Nettverks proxy-konfigurasjon         |
| `/api/settings/proxy/test`      | INNLEGG  | Test proxy-tilkobling                 |
| `/api/settings/ip-filter`       | GET/SETT | IP-godkjenningsliste/blokkeringsliste |
| `/api/settings/thinking-budget` | GET/SETT | Begrunnelse token budsjett            |
| `/api/settings/system-prompt`   | GET/SETT | Global systemmelding                  |

### Overvåking

| Endepunkt                | Metode   | Beskrivelse              |
| ------------------------ | -------- | ------------------------ |
| `/api/sessions`          | FÅ       | Aktiv øktsporing         |
| `/api/rate-limits`       | FÅ       | Satsgrenser per konto    |
| `/api/monitoring/health` | FÅ       | Helsesjekk               |
| `/api/cache`             | FÅ/SLETT | Bufferstatistikk / slett |

### Sikkerhetskopiering og eksport/import

| Endepunkt                   | Metode  | Beskrivelse                                    |
| --------------------------- | ------- | ---------------------------------------------- |
| `/api/db-backups`           | FÅ      | Liste tilgjengelige sikkerhetskopier           |
| `/api/db-backups`           | PUT     | Lag en manuell sikkerhetskopi                  |
| `/api/db-backups`           | INNLEGG | Gjenopprett fra en bestemt sikkerhetskopi      |
| `/api/db-backups/export`    | FÅ      | Last ned database som .sqlite-fil              |
| `/api/db-backups/import`    | INNLEGG | Last opp .sqlite-fil for å erstatte databasen  |
| `/api/db-backups/exportAll` | FÅ      | Last ned full sikkerhetskopi som .tar.gz-arkiv |

### Cloud Sync

| Endepunkt              | Metode  | Beskrivelse                   |
| ---------------------- | ------- | ----------------------------- |
| `/api/sync/cloud`      | Diverse | Skysynkroniseringsoperasjoner |
| `/api/sync/initialize` | INNLEGG | Initialiser synkronisering    |
| `/api/cloud/*`         | Diverse | Cloud management              |

### CLI-verktøy

| Endepunkt                          | Metode | Beskrivelse           |
| ---------------------------------- | ------ | --------------------- |
| `/api/cli-tools/claude-settings`   | FÅ     | Claude CLI status     |
| `/api/cli-tools/codex-settings`    | FÅ     | Codex CLI-status      |
| `/api/cli-tools/droid-settings`    | FÅ     | Droid CLI-status      |
| `/api/cli-tools/openclaw-settings` | FÅ     | OpenClaw CLI-status   |
| `/api/cli-tools/runtime/[toolId]`  | FÅ     | Generisk CLI kjøretid |

CLI-svar inkluderer: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Resiliens- og rategrenser

| Endepunkt               | Metode   | Beskrivelse                    |
| ----------------------- | -------- | ------------------------------ |
| `/api/resilience`       | GET/SETT | Få/oppdater resiliensprofiler  |
| `/api/resilience/reset` | INNLEGG  | Tilbakestill effektbrytere     |
| `/api/rate-limits`      | FÅ       | Satsgrensestatus per konto     |
| `/api/rate-limit`       | FÅ       | Global rategrensekonfigurasjon |

### Evaler

| Endepunkt    | Metode   | Beskrivelse                        |
| ------------ | -------- | ---------------------------------- |
| `/api/evals` | GET/POST | List eval suiter / kjør evaluering |

### Retningslinjer

| Endepunkt       | Metode         | Beskrivelse                |
| --------------- | -------------- | -------------------------- |
| `/api/policies` | GET/POST/SLETT | Administrer rutingpolicyer |

### Samsvar

| Endepunkt                   | Metode | Beskrivelse                          |
| --------------------------- | ------ | ------------------------------------ |
| `/api/compliance/audit-log` | FÅ     | Overholdelsesrevisjonslogg (siste N) |

### v1beta (Gemini-kompatibel)

| Endepunkt                  | Metode  | Beskrivelse                        |
| -------------------------- | ------- | ---------------------------------- |
| `/v1beta/models`           | FÅ      | Vis modeller i Gemini-format       |
| `/v1beta/models/{...path}` | INNLEGG | Gemini `generateContent` endepunkt |

Disse endepunktene gjenspeiler Geminis API-format for klienter som forventer naturlig Gemini SDK-kompatibilitet.

### Interne / System APIer

| Endepunkt       | Metode  | Beskrivelse                                                       |
| --------------- | ------- | ----------------------------------------------------------------- |
| `/api/init`     | FÅ      | Initialiseringssjekk av applikasjonen (brukes ved første kjøring) |
| `/api/tags`     | FÅ      | Ollama-kompatible modellkoder (for Ollama-klienter)               |
| `/api/restart`  | INNLEGG | Utløs grasiøs serveromstart                                       |
| `/api/shutdown` | INNLEGG | Utløs grasiøs serveravslutning                                    |

> **Merk:** Disse endepunktene brukes internt av systemet eller for Ollama-klientkompatibilitet. De kalles vanligvis ikke opp av sluttbrukere.

---

## Lydtranskripsjon

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transkribere lydfiler ved hjelp av Deepgram eller AssemblyAI.

**Forespørsel:**

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

**Støttede leverandører:** `deepgram/nova-3`, `assemblyai/best`.

**Støttede formater:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Ollama-kompatibilitet

For klienter som bruker Ollamas API-format:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Forespørsler oversettes automatisk mellom Ollama og interne formater.

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

## Budsjett

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

## Modelltilgjengelighet

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

## Forespørselsbehandling

1. Klient sender forespørsel til `/v1/*`
2. Rutebehandler anroper `handleChat`, `handleEmbedding`, `handleAudioTranscription` eller `handleImageGeneration`
3. Modellen er løst (direkte leverandør/modell eller alias/kombinasjon)
4. Påloggingsinformasjon valgt fra lokal DB med filtrering av kontotilgjengelighet
5. For chat: `handleChatCore` — formatdeteksjon, oversettelse, hurtigbuffersjekk, idempotenssjekk
6. Leverandør eksekutør sender oppstrømsforespørsel
7. Svar oversatt tilbake til klientformat (chat) eller returnert som det er (innbygginger/bilder/lyd)
8. Bruk/logging registrert
9. Fallback gjelder feil i henhold til kombinasjonsregler

Full arkitekturreferanse: [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## Autentisering

- Dashboard-ruter (`/dashboard/*`) bruker `auth_token`-informasjonskapsel
- Innlogging bruker lagret passordhash; fallback til `INITIAL_PASSWORD`
- `requireLogin` kan byttes via `/api/settings/require-login`
- `/v1/*`-ruter krever valgfritt Bearer API-nøkkel når `REQUIRE_API_KEY=true`
