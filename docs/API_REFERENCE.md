# API Reference

Complete reference for all OmniRoute API endpoints.

---

## Table of Contents

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

## Chat Completions

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

### Custom Headers

| Header                   | Direction | Description                       |
| ------------------------ | --------- | --------------------------------- |
| `X-OmniRoute-No-Cache`   | Request   | Set to `true` to bypass cache     |
| `X-OmniRoute-Progress`   | Request   | Set to `true` for progress events |
| `Idempotency-Key`        | Request   | Dedup key (5s window)             |
| `X-Request-Id`           | Request   | Alternative dedup key             |
| `X-OmniRoute-Cache`      | Response  | `HIT` or `MISS` (non-streaming)   |
| `X-OmniRoute-Idempotent` | Response  | `true` if deduplicated            |
| `X-OmniRoute-Progress`   | Response  | `enabled` if progress tracking on |

---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Available providers: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Image Generation

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

Available providers: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## List Models

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Compatibility Endpoints

| Method | Path                        | Format                 |
| ------ | --------------------------- | ---------------------- |
| POST   | `/v1/chat/completions`      | OpenAI                 |
| POST   | `/v1/messages`              | Anthropic              |
| POST   | `/v1/responses`             | OpenAI Responses       |
| POST   | `/v1/embeddings`            | OpenAI                 |
| POST   | `/v1/images/generations`    | OpenAI                 |
| GET    | `/v1/models`                | OpenAI                 |
| POST   | `/v1/messages/count_tokens` | Anthropic              |
| GET    | `/v1beta/models`            | Gemini                 |
| POST   | `/v1beta/models/{...path}`  | Gemini generateContent |
| POST   | `/v1/api/chat`              | Ollama                 |

### Dedicated Provider Routes

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

The provider prefix is auto-added if missing. Mismatched models return `400`.

---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Response example:

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

### Authentication

| Endpoint                      | Method  | Description           |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/login`             | POST    | Login                 |
| `/api/auth/logout`            | POST    | Logout                |
| `/api/settings/require-login` | GET/PUT | Toggle login required |

### Provider Management

| Endpoint                     | Method          | Description              |
| ---------------------------- | --------------- | ------------------------ |
| `/api/providers`             | GET/POST        | List / create providers  |
| `/api/providers/[id]`        | GET/PUT/DELETE  | Manage a provider        |
| `/api/providers/[id]/test`   | POST            | Test provider connection |
| `/api/providers/[id]/models` | GET             | List provider models     |
| `/api/providers/validate`    | POST            | Validate provider config |
| `/api/provider-nodes*`       | Various         | Provider node management |
| `/api/provider-models`       | GET/POST/DELETE | Custom models            |

### OAuth Flows

| Endpoint                         | Method  | Description             |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[provider]/[action]` | Various | Provider-specific OAuth |

### Routing & Config

| Endpoint              | Method   | Description                   |
| --------------------- | -------- | ----------------------------- |
| `/api/models/alias`   | GET/POST | Model aliases                 |
| `/api/models/catalog` | GET      | All models by provider + type |
| `/api/combos*`        | Various  | Combo management              |
| `/api/keys*`          | Various  | API key management            |
| `/api/pricing`        | GET      | Model pricing                 |

### Usage & Analytics

| Endpoint                    | Method | Description          |
| --------------------------- | ------ | -------------------- |
| `/api/usage/history`        | GET    | Usage history        |
| `/api/usage/logs`           | GET    | Usage logs           |
| `/api/usage/request-logs`   | GET    | Request-level logs   |
| `/api/usage/[connectionId]` | GET    | Per-connection usage |

### Settings

| Endpoint                        | Method  | Description            |
| ------------------------------- | ------- | ---------------------- |
| `/api/settings`                 | GET/PUT | General settings       |
| `/api/settings/proxy`           | GET/PUT | Network proxy config   |
| `/api/settings/proxy/test`      | POST    | Test proxy connection  |
| `/api/settings/ip-filter`       | GET/PUT | IP allowlist/blocklist |
| `/api/settings/thinking-budget` | GET/PUT | Reasoning token budget |
| `/api/settings/system-prompt`   | GET/PUT | Global system prompt   |

### Monitoring

| Endpoint                 | Method     | Description             |
| ------------------------ | ---------- | ----------------------- |
| `/api/sessions`          | GET        | Active session tracking |
| `/api/rate-limits`       | GET        | Per-account rate limits |
| `/api/monitoring/health` | GET        | Health check            |
| `/api/cache`             | GET/DELETE | Cache stats / clear     |

### Cloud Sync

| Endpoint               | Method  | Description           |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud`      | Various | Cloud sync operations |
| `/api/sync/initialize` | POST    | Initialize sync       |
| `/api/cloud/*`         | Various | Cloud management      |

### CLI Tools

| Endpoint                           | Method | Description         |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings`   | GET    | Claude CLI status   |
| `/api/cli-tools/codex-settings`    | GET    | Codex CLI status    |
| `/api/cli-tools/droid-settings`    | GET    | Droid CLI status    |
| `/api/cli-tools/openclaw-settings` | GET    | OpenClaw CLI status |
| `/api/cli-tools/runtime/[toolId]`  | GET    | Generic CLI runtime |

CLI responses include: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Resilience & Rate Limits

| Endpoint                | Method  | Description                     |
| ----------------------- | ------- | ------------------------------- |
| `/api/resilience`       | GET/PUT | Get/update resilience profiles  |
| `/api/resilience/reset` | POST    | Reset circuit breakers          |
| `/api/rate-limits`      | GET     | Per-account rate limit status   |
| `/api/rate-limit`       | GET     | Global rate limit configuration |

### Evals

| Endpoint     | Method   | Description                       |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | GET/POST | List eval suites / run evaluation |

### Policies

| Endpoint        | Method          | Description             |
| --------------- | --------------- | ----------------------- |
| `/api/policies` | GET/POST/DELETE | Manage routing policies |

### Compliance

| Endpoint                    | Method | Description                   |
| --------------------------- | ------ | ----------------------------- |
| `/api/compliance/audit-log` | GET    | Compliance audit log (last N) |

### v1beta (Gemini-Compatible)

| Endpoint                   | Method | Description                       |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/models`           | GET    | List models in Gemini format      |
| `/v1beta/models/{...path}` | POST   | Gemini `generateContent` endpoint |

These endpoints mirror Gemini's API format for clients that expect native Gemini SDK compatibility.

### Internal / System APIs

| Endpoint        | Method | Description                                          |
| --------------- | ------ | ---------------------------------------------------- |
| `/api/init`     | GET    | Application initialization check (used on first run) |
| `/api/tags`     | GET    | Ollama-compatible model tags (for Ollama clients)    |
| `/api/restart`  | POST   | Trigger graceful server restart                      |
| `/api/shutdown` | POST   | Trigger graceful server shutdown                     |

> **Note:** These endpoints are used internally by the system or for Ollama client compatibility. They are not typically called by end users.

---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transcribe audio files using Deepgram or AssemblyAI.

**Request:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Response:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Supported providers:** `deepgram/nova-3`, `assemblyai/best`.

**Supported formats:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Ollama Compatibility

For clients that use Ollama's API format:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Requests are automatically translated between Ollama and internal formats.

---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Response:**

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

## Model Availability

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

## Request Processing

1. Client sends request to `/v1/*`
2. Route handler calls `handleChat`, `handleEmbedding`, `handleAudioTranscription`, or `handleImageGeneration`
3. Model is resolved (direct provider/model or alias/combo)
4. Credentials selected from local DB with account availability filtering
5. For chat: `handleChatCore` — format detection, translation, cache check, idempotency check
6. Provider executor sends upstream request
7. Response translated back to client format (chat) or returned as-is (embeddings/images/audio)
8. Usage/logging recorded
9. Fallback applies on errors according to combo rules

Full architecture reference: [`ARCHITECTURE.md`](ARCHITECTURE.md)

---

## Authentication

- Dashboard routes (`/dashboard/*`) use `auth_token` cookie
- Login uses saved password hash; fallback to `INITIAL_PASSWORD`
- `requireLogin` toggleable via `/api/settings/require-login`
- `/v1/*` routes optionally require Bearer API key when `REQUIRE_API_KEY=true`
