# API Reference (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇧🇩 [bn](../../bn/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇮🇷 [fa](../../fa/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇮🇳 [gu](../../gu/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇮🇳 [mr](../../mr/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇰🇪 [sw](../../sw/docs/API_REFERENCE.md) · 🇮🇳 [ta](../../ta/docs/API_REFERENCE.md) · 🇮🇳 [te](../../te/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇵🇰 [ur](../../ur/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md)

---

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

| Header                   | Direction | Description                                      |
| ------------------------ | --------- | ------------------------------------------------ |
| `X-OmniRoute-No-Cache`   | Request   | Set to `true` to bypass cache                    |
| `X-OmniRoute-Progress`   | Request   | Set to `true` for progress events                |
| `X-Session-Id`           | Request   | Sticky session key for external session affinity |
| `x_session_id`           | Request   | Underscore variant also accepted (direct HTTP)   |
| `Idempotency-Key`        | Request   | Dedup key (5s window)                            |
| `X-Request-Id`           | Request   | Alternative dedup key                            |
| `X-OmniRoute-Cache`      | Response  | `HIT` or `MISS` (non-streaming)                  |
| `X-OmniRoute-Idempotent` | Response  | `true` if deduplicated                           |
| `X-OmniRoute-Progress`   | Response  | `enabled` if progress tracking on                |
| `X-OmniRoute-Session-Id` | Response  | Effective session ID used by OmniRoute           |

> Nginx note: if you rely on underscore headers (for example `x_session_id`), enable `underscores_in_headers on;`.

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

Available providers: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA, **OpenRouter**, **GitHub Models**.

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

Available providers: OpenAI (DALL-E, GPT Image 1), xAI (Grok Image), Together AI (FLUX), Fireworks AI, Nebius (FLUX), Hyperbolic, NanoBanana, **OpenRouter**, SD WebUI (local), ComfyUI (local).

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
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
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

| Endpoint                     | Method                | Description                                    |
| ---------------------------- | --------------------- | ---------------------------------------------- |
| `/api/providers`             | GET/POST              | List / create providers                        |
| `/api/providers/[id]`        | GET/PUT/DELETE        | Manage a provider                              |
| `/api/providers/[id]/test`   | POST                  | Test provider connection                       |
| `/api/providers/[id]/models` | GET                   | List provider models                           |
| `/api/providers/validate`    | POST                  | Validate provider config                       |
| `/api/provider-nodes*`       | Various               | Provider node management                       |
| `/api/provider-models`       | GET/POST/PATCH/DELETE | Custom models (add, update, hide/show, delete) |

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

| Endpoint                        | Method        | Description            |
| ------------------------------- | ------------- | ---------------------- |
| `/api/settings`                 | GET/PUT/PATCH | General settings       |
| `/api/settings/proxy`           | GET/PUT       | Network proxy config   |
| `/api/settings/proxy/test`      | POST          | Test proxy connection  |
| `/api/settings/ip-filter`       | GET/PUT       | IP allowlist/blocklist |
| `/api/settings/thinking-budget` | GET/PUT       | Reasoning token budget |
| `/api/settings/system-prompt`   | GET/PUT       | Global system prompt   |

### Monitoring

| Endpoint                 | Method     | Description                                                                                          |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------- |
| `/api/sessions`          | GET        | Active session tracking                                                                              |
| `/api/rate-limits`       | GET        | Per-account rate limits                                                                              |
| `/api/monitoring/health` | GET        | Health check + provider summary (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats`       | GET/DELETE | Cache stats / clear                                                                                  |

### Backup & Export/Import

| Endpoint                    | Method | Description                             |
| --------------------------- | ------ | --------------------------------------- |
| `/api/db-backups`           | GET    | List available backups                  |
| `/api/db-backups`           | PUT    | Create a manual backup                  |
| `/api/db-backups`           | POST   | Restore from a specific backup          |
| `/api/db-backups/export`    | GET    | Download database as .sqlite file       |
| `/api/db-backups/import`    | POST   | Upload .sqlite file to replace database |
| `/api/db-backups/exportAll` | GET    | Download full backup as .tar.gz archive |

### Cloud Sync

| Endpoint               | Method  | Description           |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud`      | Various | Cloud sync operations |
| `/api/sync/initialize` | POST    | Initialize sync       |
| `/api/cloud/*`         | Various | Cloud management      |

### Tunnels

| Endpoint                   | Method | Description                                                             |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | GET    | Read Cloudflare Quick Tunnel install/runtime status for the dashboard   |
| `/api/tunnels/cloudflared` | POST   | Enable or disable the Cloudflare Quick Tunnel (`action=enable/disable`) |

### CLI Tools

| Endpoint                           | Method | Description         |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings`   | GET    | Claude CLI status   |
| `/api/cli-tools/codex-settings`    | GET    | Codex CLI status    |
| `/api/cli-tools/droid-settings`    | GET    | Droid CLI status    |
| `/api/cli-tools/openclaw-settings` | GET    | OpenClaw CLI status |
| `/api/cli-tools/runtime/[toolId]`  | GET    | Generic CLI runtime |

CLI responses include: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### ACP Agents

| Endpoint          | Method | Description                                              |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/acp/agents` | GET    | List all detected agents (built-in + custom) with status |
| `/api/acp/agents` | POST   | Add custom agent or refresh detection cache              |
| `/api/acp/agents` | DELETE | Remove a custom agent by `id` query param                |

GET response includes `agents[]` (id, name, binary, version, installed, protocol, isCustom) and `summary` (total, installed, notFound, builtIn, custom).

### Resilience & Rate Limits

| Endpoint                | Method    | Description                                                                        |
| ----------------------- | --------- | ---------------------------------------------------------------------------------- |
| `/api/resilience`       | GET/PATCH | Get/update request queue, connection cooldown, provider breaker, and wait settings |
| `/api/resilience/reset` | POST      | Reset provider circuit breakers                                                    |
| `/api/rate-limits`      | GET       | Per-account rate limit status                                                      |
| `/api/rate-limit`       | GET       | Global rate limit configuration                                                    |

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

| Endpoint                 | Method | Description                                          |
| ------------------------ | ------ | ---------------------------------------------------- |
| `/api/init`              | GET    | Application initialization check (used on first run) |
| `/api/tags`              | GET    | Ollama-compatible model tags (for Ollama clients)    |
| `/api/restart`           | POST   | Trigger graceful server restart                      |
| `/api/shutdown`          | POST   | Trigger graceful server shutdown                     |
| `/api/system/env/repair` | POST   | Repair OAuth provider environment variables          |
| `/api/system-info`       | GET    | Generate system diagnostics report                   |

> **Note:** These endpoints are used internally by the system or for Ollama client compatibility. They are not typically called by end users.

### OAuth Environment Repair _(v3.6.1+)_

```bash
POST /api/system/env/repair
Content-Type: application/json

{
  "provider": "claude-code"
}
```

Repairs missing or corrupted OAuth environment variables for a specific provider. Returns:

```json
{
  "success": true,
  "repaired": ["CLAUDE_CODE_OAUTH_CLIENT_ID", "CLAUDE_CODE_OAUTH_CLIENT_SECRET"],
  "backupPath": "/home/user/.omniroute/backups/env-repair-2026-04-11.bak"
}
```

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
