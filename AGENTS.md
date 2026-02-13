# omniroute — Agent Guidelines

## Project

Unified AI proxy/router — route any LLM through one endpoint. Multi-provider support
(OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI, Mistral, Fireworks, Cohere, etc.)

## Stack

- **Runtime**: Next.js 16 (App Router), Node.js, ES Modules
- **Database**: better-sqlite3 (SQLite) — `DATA_DIR` configurable, default `~/.omniroute/`
- **Streaming**: SSE via `open-sse` internal package
- **Styling**: Tailwind CSS v4
- **Docker**: Multi-stage Dockerfile, 3 profiles (base / cli / host)

## Architecture

### Data Layer (`src/lib/db/`)

All persistence uses SQLite through domain-specific modules:

| Module         | Responsibility                             |
| -------------- | ------------------------------------------ |
| `core.js`      | SQLite engine, migrations, WAL, encryption |
| `providers.js` | Provider connections & nodes               |
| `models.js`    | Model aliases, MITM aliases, custom models |
| `combos.js`    | Combo configurations                       |
| `apiKeys.js`   | API key management & validation            |
| `settings.js`  | Settings, pricing, proxy config            |
| `backup.js`    | Backup / restore operations                |

`src/lib/localDb.js` is a **re-export layer only** — all 27+ consumers import from it,
but the real logic lives in `src/lib/db/`.

### Request Pipeline (`open-sse/`)

| Handler                 | Role                                        |
| ----------------------- | ------------------------------------------- |
| `chatCore.js`           | Main chat completions proxy (SSE / non-SSE) |
| `responsesHandler.js`   | OpenAI Responses API compat                 |
| `responseTranslator.js` | Format translation for Responses API        |
| `embeddings.js`         | Embedding proxy                             |
| `imageGeneration.js`    | Image generation proxy                      |
| `sseParser.js`          | SSE stream parser                           |
| `usageExtractor.js`     | Token usage extraction from responses       |

Translation between provider formats: `open-sse/translator/`

### OAuth & Tokens (`src/lib/oauth/`)

18 modules handling OAuth flows, token refresh, and provider credentials.
Default credentials are hardcoded in `src/lib/oauth/constants/oauth.js`,
overridable via env vars or `data/provider-credentials.json`.

### Supporting Systems

| System                     | Location                                          |
| -------------------------- | ------------------------------------------------- |
| Usage tracking & analytics | `src/lib/usageDb.js`, `src/lib/usageAnalytics.js` |
| Token health checks        | `src/lib/tokenHealthCheck.js`                     |
| Cloud sync                 | `src/lib/cloudSync.js`                            |
| Proxy logging              | `src/lib/proxyLogger.js`                          |
| Data paths resolution      | `src/lib/dataPaths.js`                            |

### Adding a New Provider

1. Register in `src/shared/constants/providers.js`
2. Add executor in `open-sse/executors/`
3. Add translator rules in `open-sse/translator/` (if non-OpenAI format)
4. Add OAuth config in `src/lib/oauth/constants/oauth.js` (if OAuth-based)

## Review Focus

### Security

- No hardcoded API keys or secrets in commits
- Auth middleware on all API routes
- Input validation on user-facing endpoints
- SQLite encryption key must not be logged

### Architecture

- DB operations go through `src/lib/db/` modules, never raw SQL in routes
- Provider requests flow through `open-sse/handlers/`
- Translations use `open-sse/translator/` modules
- `localDb.js` is re-exports only — add new functions to the proper `db/*.js` module

### Code Quality

- Consistent error handling with try/catch
- Proper HTTP status codes
- No memory leaks in SSE streams (abort signals, cleanup)
- Rate limit headers must be parsed correctly

### Docker

- Dockerfile has two targets: `runner-base` and `runner-cli`
- `docker-compose.yml` — development (3 profiles)
- `docker-compose.prod.yml` — isolated production instance (port 20130)
- Data persists in named volumes (`omniroute-data` / `omniroute-prod-data`)

### Review Mode

- Provide analysis and suggestions only
- Focus on bugs, security, performance, and best practices
