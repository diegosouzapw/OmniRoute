# API Reference

🌐 **Languages:** 🇺🇸 [English](API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](i18n/pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](i18n/es/API_REFERENCE.md) | 🇫🇷 [Français](i18n/fr/API_REFERENCE.md) | 🇮🇹 [Italiano](i18n/it/API_REFERENCE.md) | 🇷🇺 [Русский](i18n/ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](i18n/zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](i18n/de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](i18n/in/API_REFERENCE.md) | 🇹🇭 [ไทย](i18n/th/API_REFERENCE.md) | 🇺🇦 [Українська](i18n/uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](i18n/ar/API_REFERENCE.md) | 🇯🇵 [日本語](i18n/ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](i18n/vi/API_REFERENCE.md) | 🇧🇬 [Български](i18n/bg/API_REFERENCE.md) | 🇩🇰 [Dansk](i18n/da/API_REFERENCE.md) | 🇫🇮 [Suomi](i18n/fi/API_REFERENCE.md) | 🇮🇱 [עברית](i18n/he/API_REFERENCE.md) | 🇭🇺 [Magyar](i18n/hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](i18n/id/API_REFERENCE.md) | 🇰🇷 [한국어](i18n/ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](i18n/ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](i18n/nl/API_REFERENCE.md) | 🇳🇴 [Norsk](i18n/no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](i18n/pt/API_REFERENCE.md) | 🇷🇴 [Română](i18n/ro/API_REFERENCE.md) | 🇵🇱 [Polski](i18n/pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](i18n/sk/API_REFERENCE.md) | 🇸🇪 [Svenska](i18n/sv/API_REFERENCE.md) | 🇵🇭 [Filipino](i18n/phi/API_REFERENCE.md) | 🇨🇿 [Čeština](i18n/cs/API_REFERENCE.md)

Complete reference for all OmniRoute API endpoints.

---

## Table of Contents

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Files API](#files-api)
- [Batches API](#batches-api)
- [Search API](#search-api)
- [WebSocket Streaming](#websocket-streaming)
- [Quotas & Issues Reporting](#quotas--issues-reporting)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Combo Management](#combo-management)
- [Webhooks](#webhooks)
- [Registered Keys (Auto-Management)](#registered-keys-auto-management)
- [Agents Protocol](#agents-protocol)
- [Management Proxies](#management-proxies)
- [Resilience (extended)](#resilience-extended)
- [Skills](#skills)
- [Memory](#memory)
- [MCP Server](#mcp-server)
- [A2A Server](#a2a-server)
- [Cloud, Evals & Assess](#cloud-evals--assess)
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
  "model": "openai/gpt-image-2",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Available providers: OpenAI (GPT Image 2), xAI (Grok Image), Together AI (FLUX), Fireworks AI, Nebius (FLUX), Hyperbolic, NanoBanana, **OpenRouter**, SD WebUI (local), ComfyUI (local).

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

| Method | Path                        | Format                          |
| ------ | --------------------------- | ------------------------------- |
| POST   | `/v1/chat/completions`      | OpenAI                          |
| POST   | `/v1/messages`              | Anthropic                       |
| POST   | `/v1/responses`             | OpenAI Responses                |
| POST   | `/v1/embeddings`            | OpenAI                          |
| POST   | `/v1/images/generations`    | OpenAI Images                   |
| POST   | `/v1/images/edits`          | OpenAI Images (edit/inpaint)    |
| POST   | `/v1/videos/generations`    | OpenAI-style video generation   |
| POST   | `/v1/music/generations`     | OpenAI-style music generation   |
| POST   | `/v1/audio/transcriptions`  | OpenAI Audio (STT)              |
| POST   | `/v1/audio/speech`          | OpenAI TTS (returns audio body) |
| POST   | `/v1/rerank`                | Cohere/Voyage-style rerank      |
| POST   | `/v1/moderations`           | OpenAI Moderations              |
| GET    | `/v1/models`                | OpenAI                          |
| POST   | `/v1/messages/count_tokens` | Anthropic                       |
| GET    | `/v1beta/models`            | Gemini                          |
| POST   | `/v1beta/models/{...path}`  | Gemini generateContent          |
| POST   | `/v1/api/chat`              | Ollama                          |

All POST routes follow the same shape: `Bearer your-api-key` + Zod-validated JSON body (`v1RerankSchema`, `v1ModerationSchema`, `v1AudioSpeechSchema`, etc., see `src/shared/validation/schemas.ts`). 4xx is returned on schema failure.

```bash
# Rerank
POST /v1/rerank      { "model": "cohere/rerank-3", "query": "...", "documents": ["..."] }

# Moderations
POST /v1/moderations { "model": "omni-moderation-latest", "input": "..." }

# TTS — returns audio/mpeg (or requested format) body
POST /v1/audio/speech { "model": "openai/tts-1", "input": "Hello", "voice": "alloy" }

# Image edit (multipart)
POST /v1/images/edits  -F image=@input.png -F prompt="..." -F mask=@mask.png

# Video / music generation (provider-prefixed model id)
POST /v1/videos/generations { "model": "runway/gen-3", "prompt": "..." }
POST /v1/music/generations  { "model": "suno/v3.5",   "prompt": "..." }
```

### Dedicated Provider Routes

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

The provider prefix is auto-added if missing. Mismatched models return `400`.

---

## Files API

OpenAI-compatible files endpoint for batch input/output and file-purpose uploads.

| Method | Path                     | Description                                                                                                   |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| POST   | `/v1/files`              | Upload a file (multipart: `file`, `purpose`, `expires_after[anchor]`, `expires_after[seconds]`) — 512 MiB max |
| GET    | `/v1/files`              | List files for the authenticated API key                                                                      |
| GET    | `/v1/files/[id]`         | Retrieve a file's metadata                                                                                    |
| DELETE | `/v1/files/[id]`         | Delete a file                                                                                                 |
| GET    | `/v1/files/[id]/content` | Stream the raw file body back                                                                                 |

**Auth:** Bearer API key — files are scoped per-API-key via `getApiKeyRequestScope`.

---

## Batches API

OpenAI-compatible batch processing.

| Method | Path                      | Description                                                                                               |
| ------ | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| POST   | `/v1/batches`             | Create batch — body validated by `v1BatchCreateSchema` (`input_file_id`, `endpoint`, `completion_window`) |
| GET    | `/v1/batches`             | List batches                                                                                              |
| GET    | `/v1/batches/[id]`        | Retrieve batch status + `request_counts`                                                                  |
| DELETE | `/v1/batches/[id]`        | Delete a finished/failed batch                                                                            |
| POST   | `/v1/batches/[id]/cancel` | Cancel an in-progress batch                                                                               |

**Auth:** Bearer API key. Batches are scoped per-API-key.

---

## Search API

Web/search provider abstraction (Tavily, Brave, Exa, Serper, etc.).

| Method | Path                   | Description                                                                          |
| ------ | ---------------------- | ------------------------------------------------------------------------------------ |
| GET    | `/v1/search`           | List configured search providers + capabilities                                      |
| POST   | `/v1/search`           | Run a search query — body validated by `v1SearchSchema`, supports caching/coalescing |
| GET    | `/v1/search/analytics` | Per-provider hit/latency/cache stats                                                 |

**Auth:** Bearer API key (`extractApiKey` + `isValidApiKey`). Search policy enforced via `enforceApiKeyPolicy`.

---

## WebSocket Streaming

```bash
GET /v1/ws?handshake=1
```

Validates a WebSocket upgrade handshake and returns the wire protocol example messages (`request`, `cancel`). Actual WS frames are handled by the bundled WS server outside the Next.js route table.

**Auth:** Bearer API key during handshake.

---

## Quotas & Issues Reporting

| Method | Path                | Description                                                                           |
| ------ | ------------------- | ------------------------------------------------------------------------------------- |
| GET    | `/v1/quotas/check`  | Pre-validate quota for a `provider` + `accountId` before issuing a registered key     |
| POST   | `/v1/issues/report` | Report a quota/key issuance failure to GitHub (requires `GITHUB_ISSUES_REPO` + token) |

**Auth:** Bearer API key (`isAuthenticated`).

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

| Endpoint                        | Method        | Description               |
| ------------------------------- | ------------- | ------------------------- |
| `/api/settings`                 | GET/PUT/PATCH | General settings          |
| `/api/settings/proxy`           | GET/PUT       | Network proxy config      |
| `/api/settings/proxy/test`      | POST          | Test proxy connection     |
| `/api/settings/ip-filter`       | GET/PUT       | IP allowlist/blocklist    |
| `/api/settings/thinking-budget` | GET/PUT       | Reasoning token budget    |
| `/api/settings/system-prompt`   | GET/PUT       | Global system prompt      |
| `/api/settings/compression`     | GET/PUT       | Global compression config |

### Context & Compression

| Endpoint                               | Method         | Description                                                              |
| -------------------------------------- | -------------- | ------------------------------------------------------------------------ |
| `/api/compression/preview`             | POST           | Preview off/lite/standard/aggressive/ultra/RTK/stacked compression       |
| `/api/compression/language-packs`      | GET            | List available Caveman language packs                                    |
| `/api/compression/rules`               | GET            | List Caveman rule metadata                                               |
| `/api/context/caveman/config`          | GET/PUT        | Caveman-specific settings alias                                          |
| `/api/context/rtk/config`              | GET/PUT        | RTK-specific settings, including custom filters and raw-output retention |
| `/api/context/rtk/filters`             | GET            | RTK filter catalog and custom-filter diagnostics                         |
| `/api/context/rtk/test`                | POST           | Run RTK preview/test against a text payload                              |
| `/api/context/rtk/raw-output/[id]`     | GET            | Read retained redacted raw output by pointer id                          |
| `/api/context/combos`                  | GET/POST       | Compression combo list/create                                            |
| `/api/context/combos/[id]`             | GET/PUT/DELETE | Compression combo detail/update/delete                                   |
| `/api/context/combos/[id]/assignments` | GET/PUT        | Assign compression combos to routing combos                              |
| `/api/context/analytics`               | GET            | Compression analytics alias                                              |

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
| `/api/tunnels/ngrok`       | GET    | Read ngrok Tunnel runtime status for the dashboard                      |
| `/api/tunnels/ngrok`       | POST   | Enable or disable the ngrok Tunnel (`action=enable/disable`)            |

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

| Endpoint                          | Method    | Description                                                                          |
| --------------------------------- | --------- | ------------------------------------------------------------------------------------ |
| `/api/resilience`                 | GET/PATCH | Get/update request queue, connection cooldown, provider breaker, and wait settings   |
| `/api/resilience/reset`           | POST      | Reset provider circuit breakers                                                      |
| `/api/resilience/model-cooldowns` | GET       | List active per-(provider, connection, model) lockouts, sorted by remaining time     |
| `/api/resilience/model-cooldowns` | DELETE    | Clear a model lockout — body `{provider, model}` or `{all: true}` to wipe everything |
| `/api/rate-limits`                | GET       | Per-account rate limit status                                                        |
| `/api/rate-limit`                 | GET       | Global rate limit configuration                                                      |

> All four `/api/resilience/*` routes require **management auth** (`requireManagementAuth`). See [Resilience (extended)](#resilience-extended) for a full breakdown of provider breaker vs connection cooldown vs model lockout.

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
  "apiKeyId": "key-123",
  "dailyLimitUsd": 5.00,
  "weeklyLimitUsd": 30.00,
  "monthlyLimitUsd": 100.00,
  "warningThreshold": 0.8,
  "resetInterval": "monthly"
}
```

> **Schema notes** (`setBudgetSchema`): `apiKeyId` is required; at least one of `dailyLimitUsd`, `weeklyLimitUsd`, or `monthlyLimitUsd` must be greater than zero. Optional fields: `warningThreshold` (0–1), `resetInterval` (`daily` | `weekly` | `monthly`), `resetTime` (`HH:MM`). The legacy `{keyId, limit, period}` shape returns `400 Bad Request`.

## Request Processing

1. Client sends request to `/v1/*`
2. Route handler calls `handleChat`, `handleEmbedding`, `handleAudioTranscription`, or `handleImageGeneration`
3. Model is resolved (direct provider/model or alias/combo)
4. Credentials selected from local DB with account availability filtering
5. For chat: `handleChatCore` checks semantic/signature cache and resolves combo compression settings
6. Proactive compression runs before provider translation when enabled (`lite`, Caveman, RTK, or stacked)
7. Provider executor sends upstream request
8. Response translated back to client format (chat) or returned as-is (embeddings/images/audio)
9. Usage, compression analytics, and request logs are recorded
10. Fallback applies on errors according to combo rules

Full architecture reference: [`ARCHITECTURE.md`](ARCHITECTURE.md)

---

## Combo Management

Higher-level routing combos (already summarized under `/api/combos*`) can also be mapped 1:1 from a model id pattern, allowing transparent redirection of an OpenAI-style model id to a combo.

| Method | Path                             | Description                                                                    |
| ------ | -------------------------------- | ------------------------------------------------------------------------------ |
| GET    | `/api/model-combo-mappings`      | List all model→combo mappings                                                  |
| POST   | `/api/model-combo-mappings`      | Create mapping — body: `{pattern, comboId, priority?, enabled?, description?}` |
| GET    | `/api/model-combo-mappings/[id]` | Retrieve a single mapping                                                      |
| PUT    | `/api/model-combo-mappings/[id]` | Update fields of an existing mapping                                           |
| DELETE | `/api/model-combo-mappings/[id]` | Remove a mapping                                                               |

**Auth:** management session/API key (`requireManagementAuth`).

---

## Webhooks

Outbound webhook subscriptions for OmniRoute events (request completion, quota exhaustion, key rotation, etc.).

| Method | Path                      | Description                                                           |
| ------ | ------------------------- | --------------------------------------------------------------------- |
| GET    | `/api/webhooks`           | List webhooks (secrets are masked to `<prefix>...`)                   |
| POST   | `/api/webhooks`           | Create webhook — body: `{url, events?: ["*"], secret?, description?}` |
| GET    | `/api/webhooks/[id]`      | Retrieve a webhook                                                    |
| PUT    | `/api/webhooks/[id]`      | Update url/events/secret/description                                  |
| DELETE | `/api/webhooks/[id]`      | Remove a webhook                                                      |
| POST   | `/api/webhooks/[id]/test` | Send a test payload to the webhook URL and return delivery status     |

**Auth:** management session/API key (`requireManagementAuth`).

---

## Registered Keys (Auto-Management)

Used by the auto-key management subsystem to issue and rotate API keys against a backing provider/account, with daily/hourly quotas.

| Method | Path                                  | Description                                                                                                                                                                                 |
| ------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/registered-keys`             | List registered keys (masked prefix only)                                                                                                                                                   |
| POST   | `/api/v1/registered-keys`             | Issue a new registered key — body: `{name, provider?, accountId?, idempotencyKey?, expiresAt?, dailyBudget?, hourlyBudget?}`. Returns the raw key **once**. Returns `429` on quota refusal. |
| GET    | `/api/v1/registered-keys/[id]`        | Retrieve a registered key's metadata (no raw material)                                                                                                                                      |
| DELETE | `/api/v1/registered-keys/[id]`        | Revoke a registered key                                                                                                                                                                     |
| POST   | `/api/v1/registered-keys/[id]/revoke` | Explicit revoke endpoint (same effect as DELETE)                                                                                                                                            |

**Auth:** Bearer API key (`isAuthenticated`). See also `/v1/quotas/check` and `/v1/issues/report`.

---

## Agents Protocol

Cloud agent tasks (Claude Code, Codex Cloud, OpenHands, etc.) executed remotely on behalf of OmniRoute users.

| Method | Path                          | Description                                                                                                                                   |
| ------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/agents/tasks`        | List tasks — optional `?provider=`, `?status=`, `?limit=` (1–500, default 50)                                                                 |
| POST   | `/api/v1/agents/tasks`        | Create task — body validated by `CreateCloudAgentTaskSchema` (`providerId`, `prompt`, `source`, `options?`). Returns `201` with task envelope |
| DELETE | `/api/v1/agents/tasks?id=...` | Delete a task                                                                                                                                 |
| GET    | `/api/v1/agents/tasks/[id]`   | Read task — synchronously refreshes status from the upstream cloud agent when an `external_id` is set                                         |
| POST   | `/api/v1/agents/tasks/[id]`   | Discriminated action: `{action: "approve"}`, `{action: "message", message}`, or `{action: "cancel"}`                                          |
| DELETE | `/api/v1/agents/tasks/[id]`   | Delete a specific task by id                                                                                                                  |

> **Auth:** management auth required on every method (`requireCloudAgentManagementAuth`). Prior to v3.8.0 these were unauthenticated — see commit `588a0333` for the breaking change.

```bash
# Create a Claude Code cloud task
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Authorization: Bearer your-management-key" \
  -H "Content-Type: application/json" \
  -d '{"providerId":"claude-code-cloud","prompt":"Fix the failing test","source":{"repo":"...","branch":"..."}}'
```

---

## Management Proxies

Outbound HTTP(S)/SOCKS proxies that can be assigned to providers, accounts, or globally.

| Method | Path                                         | Description                                                                                                                                      |
| ------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | `/api/v1/management/proxies`                 | List proxies (with `?id=` returns one; with `?id=&where_used=1` returns the assignment graph)                                                    |
| POST   | `/api/v1/management/proxies`                 | Create proxy — body validated by `createProxyRegistrySchema`                                                                                     |
| PATCH  | `/api/v1/management/proxies`                 | Update proxy — body validated by `updateProxyRegistrySchema` (requires `id`)                                                                     |
| DELETE | `/api/v1/management/proxies?id=...&force=1`  | Delete proxy (use `force=1` to detach assignments)                                                                                               |
| GET    | `/api/v1/management/proxies/assignments`     | List assignments — filterable by `proxy_id`, `scope`, `scope_id`; pass `resolve_connection_id=<id>` to resolve the active proxy for a connection |
| PUT    | `/api/v1/management/proxies/assignments`     | Assign — body validated by `proxyAssignmentSchema` (`{scope, scopeId?, proxyId?}`). Clears dispatcher cache                                      |
| PUT    | `/api/v1/management/proxies/bulk-assign`     | Bulk-assign — body validated by `bulkProxyAssignmentSchema` (`{scope, scopeIds[], proxyId?}`)                                                    |
| GET    | `/api/v1/management/proxies/health?hours=24` | Aggregate proxy health (success/fail counts, latency) over a window                                                                              |

**Auth:** management session/API key on every route (`requireManagementAuth`).

> The task description's `POST /api/v1/management/proxies/[id]/assignments` and `POST /api/v1/management/proxies/[id]/health` are served by the flat `/assignments` and `/health` routes shown above — there are no per-id subroutes in the codebase.

---

## Resilience (extended)

OmniRoute exposes three independent temporary-failure mechanisms; the management endpoints below let operators read and override them:

| Scope               | State storage                              | Read                                      | Reset / clear                               |
| ------------------- | ------------------------------------------ | ----------------------------------------- | ------------------------------------------- |
| Provider breaker    | `domain_circuit_breakers` + in-memory      | `/api/monitoring/health`                  | `POST /api/resilience/reset`                |
| Connection cooldown | `rateLimitedUntil` on provider connections | `/api/rate-limits`, `/api/providers/[id]` | (re-enables lazily; clear via provider PUT) |
| Model lockout       | In-memory model-availability registry      | `GET /api/resilience/model-cooldowns`     | `DELETE /api/resilience/model-cooldowns`    |

```bash
# Clear a single model lockout
curl -X DELETE http://localhost:20128/api/resilience/model-cooldowns \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","model":"gpt-4o-mini"}'

# Wipe every lockout
curl -X DELETE http://localhost:20128/api/resilience/model-cooldowns \
  -H "Cookie: auth_token=..." \
  -d '{"all":true}'
```

Full conceptual reference and breaker defaults: see [`CLAUDE.md`](../CLAUDE.md) → "Resilience Runtime State".

---

## Skills

Skill framework for extending OmniRoute with custom executable handlers, plus marketplace integrations.

| Method | Path                              | Description                                                                                                                |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/skills`                     | List installed skills — filterable by `?q=`, `?mode=on\|off\|auto`, `?source=skillsmp\|skillssh\|local`, paginated         |
| GET    | `/api/skills/[id]`                | Retrieve one skill                                                                                                         |
| PUT    | `/api/skills/[id]`                | Update skill (name, description, mode, schema, handler, tags)                                                              |
| DELETE | `/api/skills/[id]`                | Uninstall a skill                                                                                                          |
| POST   | `/api/skills/install`             | Install a skill from a raw manifest — body: `{name, version, description, schema:{input, output}, handlerCode, apiKeyId?}` |
| GET    | `/api/skills/executions`          | List recent skill executions (audit trail with inputs/outputs/duration)                                                    |
| GET    | `/api/skills/marketplace?q=...`   | Search/popular list from the SkillsMP marketplace (requires `skillsmpApiKey` setting)                                      |
| POST   | `/api/skills/marketplace/install` | Install a skill by id from SkillsMP                                                                                        |
| GET    | `/api/skills/skillssh?q=&limit=`  | Search the skills.sh registry                                                                                              |
| POST   | `/api/skills/skillssh/install`    | Install a skill by id from skills.sh                                                                                       |

**Auth:** management session/API key. Marketplace search routes accept either management auth or a Bearer API key (`isAuthenticated`).

---

## Memory

Persistent conversational/factual memory store, scoped per API key / session.

| Method | Path                 | Description                                                                                                  |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| GET    | `/api/memory`        | List memories — `?apiKeyId=`, `?type=`, `?sessionId=`, `?q=`, with `offset/limit` or `page/limit` pagination |
| POST   | `/api/memory`        | Create memory — body validated by Zod: `{content, key, type?, sessionId?, apiKeyId?, metadata?, expiresAt?}` |
| GET    | `/api/memory/[id]`   | Retrieve one memory                                                                                          |
| DELETE | `/api/memory/[id]`   | Delete a memory                                                                                              |
| GET    | `/api/memory/health` | Memory subsystem health (DB connectivity, embeddings backend, vector index status)                           |

**Auth:** management session/API key (`requireManagementAuth`). `type` enum: `FACTUAL`, `EPISODIC`, `SEMANTIC`, `PROCEDURAL` (see `MemoryType` in `src/lib/memory/types.ts`).

---

## MCP Server

OmniRoute ships an embedded Model Context Protocol server with 3 transports (stdio, SSE, streamable-http) and scoped tools. The dashboard endpoints below read status/audit data and proxy the HTTP transports.

| Method | Path                   | Description                                                                                      |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------ | -------------------- |
| GET    | `/api/mcp/status`      | Heartbeat, transport, online state, last call, top tools, 24h success rate                       |
| GET    | `/api/mcp/tools`       | List of MCP tools with `name`, `description`, `scopes`, `phase`, `auditLevel`, `sourceEndpoints` |
| GET    | `/api/mcp/sse`         | Open SSE stream for the SSE transport (returns `503` if MCP disabled or transport mismatch)      |
| POST   | `/api/mcp/sse`         | Send JSON-RPC frame on the SSE transport                                                         |
| GET    | `/api/mcp/stream`      | Open SSE side of the Streamable HTTP transport (server-initiated messages)                       |
| POST   | `/api/mcp/stream`      | Send JSON-RPC frame on the Streamable HTTP transport                                             |
| DELETE | `/api/mcp/stream`      | End a Streamable HTTP session                                                                    |
| GET    | `/api/mcp/audit`       | Query audit log — `?limit=`, `?offset=`, `?tool=`, `?success=true                                | false`, `?apiKeyId=` |
| GET    | `/api/mcp/audit/stats` | Aggregate audit stats (totals, success rate, avg duration, top tools)                            |

**Auth:** the `sse`/`stream` transports honor the MCP-specific auth surface (Bearer API key with `mcp` scope); the `status`/`tools`/`audit*` routes are readable from the dashboard (no extra auth required beyond reaching the dashboard host).

> Both HTTP transports are gated by `settings.mcpEnabled` and `settings.mcpTransport` — a transport mismatch returns `400`, an MCP disabled state returns `503`.

---

## A2A Server

OmniRoute exposes an A2A (Agent-to-Agent) JSON-RPC 2.0 endpoint plus a REST wrapper for inspection/dashboard use.

### JSON-RPC

```bash
POST /a2a
Authorization: Bearer your-api-key   # optional unless OMNIROUTE_API_KEY is set
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "message/send",
  "params": {
    "skill": "smart-routing",
    "messages": [{"role": "user", "content": "Route this coding task"}]
  }
}
```

Supported methods (all gated on `settings.a2aEnabled`):

| Method           | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| `message/send`   | Synchronous skill execution; returns `{task, artifacts, metadata}` |
| `message/stream` | Streaming SSE execution of the same skill set                      |
| `tasks/get`      | Fetch a task by `taskId`                                           |
| `tasks/cancel`   | Cancel a task by `taskId`                                          |

Built-in skills: `smart-routing`, `quota-management`, `provider-discovery`, `cost-analysis`, `health-report`.

### Agent Card

```bash
GET /.well-known/agent.json
```

Returns the public A2A agent card (name, description, capabilities, skill catalog, auth scheme) — cached publicly for 1h. No auth required.

### REST helpers

| Method | Path                         | Description                                                                                                     |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/a2a/status`            | A2A enabled + task stats + cached agent card summary                                                            |
| GET    | `/api/a2a/tasks`             | List tasks — `?state=submitted\|working\|completed\|failed\|cancelled`, `?skill=`, `?limit=` (≤200), `?offset=` |
| POST   | `/api/a2a/tasks`             | (Not implemented as a REST helper — create via JSON-RPC `message/send`)                                         |
| GET    | `/api/a2a/tasks/[id]`        | Retrieve one task                                                                                               |
| POST   | `/api/a2a/tasks/[id]/cancel` | Cancel a task                                                                                                   |

**Auth:** the REST helpers run without management auth (dashboard-readable); the JSON-RPC `/a2a` route uses Bearer `OMNIROUTE_API_KEY` if configured.

---

## Cloud, Evals & Assess

| Method | Path                            | Description                                                                                       |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------- |
| POST   | `/api/cloud/auth`               | Verify a Bearer key and return masked provider connections + model aliases for cloud sync clients |
| POST   | `/api/cloud/credentials/update` | Update encrypted credentials for a cloud-synced provider                                          |
| POST   | `/api/cloud/model/resolve`      | Resolve a logical model id to a concrete provider/model using the local routing table             |
| GET    | `/api/cloud/models/alias`       | List model aliases as exposed to cloud sync                                                       |
| GET    | `/api/assess`                   | Read latest assessment categorizations (per-provider/model)                                       |
| POST   | `/api/assess`                   | Run an assessment — body: `{scope: {type:"all"}                                                   | {type:"provider", providerId} | {type:"model", modelId}, trigger?}` |
| GET    | `/api/evals`                    | List built-in eval suites + most recent runs                                                      |
| POST   | `/api/evals`                    | Trigger an eval run                                                                               |
| POST   | `/api/evals/suites`             | Create a custom eval suite — body validated by `evalSuiteSaveSchema`                              |
| GET    | `/api/evals/suites/[id]`        | Retrieve a custom eval suite                                                                      |

**Auth:** `/api/cloud/auth` validates a Bearer key directly; the other `/api/cloud/*`, `/api/evals/*`, and `/api/assess` routes require management session/API key. `/api/assess` POST uses `validateBody` with a discriminated-union scope schema.

---

## Authentication

- Dashboard routes (`/dashboard/*`) use `auth_token` cookie
- Login uses saved password hash; fallback to `INITIAL_PASSWORD`
- `requireLogin` toggleable via `/api/settings/require-login`
- `/v1/*` routes optionally require Bearer API key when `REQUIRE_API_KEY=true`

> **Breaking change (v3.8.0)** — `/api/v1/agents/tasks/*` and the cooldown management endpoints now require **management auth** (dashboard `auth_token` cookie or a management-scoped API key). Clients that previously called these routes unauthenticated will receive `401 Unauthorized`. See commit `588a0333` (`fix(auth): require management auth for agent and cooldown APIs`).
