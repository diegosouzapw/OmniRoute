---
title: "Environment Variables Reference"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Environment Variables Reference

> Complete reference for every environment variable recognized by OmniRoute.
> For a quick-start template, see [`.env.example`](../../.env.example).

> [!IMPORTANT]
> Every variable documented here must also appear in `.env.example`, and
> every variable in `.env.example` must appear here. `npm run check:env-doc-sync`
> enforces this on commit and in CI. To omit a variable on purpose, add it to
> the allowlist inside `scripts/check-env-doc-sync.mjs`.

---

## Table of Contents

- [1. Required Secrets](#1-required-secrets)
- [2. Storage & Database](#2-storage--database)
- [3. Network & Ports](#3-network--ports)
- [4. Security & Authentication](#4-security--authentication)
- [5. Input Sanitization & PII Protection](#5-input-sanitization--pii-protection)
- [6. Tool & Routing Policies](#6-tool--routing-policies)
- [7. URLs & Cloud Sync](#7-urls--cloud-sync)
- [8. Outbound Proxy](#8-outbound-proxy)
- [9. CLI Tool Integration](#9-cli-tool-integration)
- [10. Internal Agent & MCP Integrations](#10-internal-agent--mcp-integrations)
- [11. OAuth Provider Credentials](#11-oauth-provider-credentials)
- [12. Provider User-Agent Overrides](#12-provider-user-agent-overrides)
- [13. CLI Fingerprint Compatibility](#13-cli-fingerprint-compatibility)
- [14. API Key Providers](#14-api-key-providers)
- [15. Timeout Settings](#15-timeout-settings)
- [16. Logging](#16-logging)
- [17. Memory Optimization](#17-memory-optimization)
- [18. Pricing Sync](#18-pricing-sync)
- [19. Model Sync (Dev)](#19-model-sync-dev)
- [20. Provider-Specific Settings](#20-provider-specific-settings)
- [21. Proxy Health](#21-proxy-health)
- [22. Debugging](#22-debugging)
- [23. GitHub Integration](#23-github-integration)
- [24. Skills Sandbox (v3.8.0+)](#24-skills-sandbox-v380)
- [Deployment Scenarios](#deployment-scenarios)
- [Audit: Removed / Dead Variables](#audit-removed--dead-variables)

---

## 1. Required Secrets

These **must** be set before the first run. Without them, the application will either refuse to start or operate with insecure defaults.

| Variable                     | Required             | Default    | Source File                                        | Description                                                                                                                                                                                                                                                                   |
| ---------------------------- | -------------------- | ---------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`                 | **Yes**              | _(none)_   | `src/lib/auth`                                     | Signs/verifies all dashboard session cookies (JWT). Generate with `openssl rand -base64 48`.                                                                                                                                                                                  |
| `API_KEY_SECRET`             | **Yes**              | _(none)_   | `src/lib/db/apiKeys.ts`                            | AES encryption key for API key values at rest in SQLite. Generate with `openssl rand -hex 32`.                                                                                                                                                                                |
| `INITIAL_PASSWORD`           | **Yes**              | `CHANGEME` | Bootstrap script                                   | Sets the initial admin dashboard password (matches `.env.example` default — kept obviously insecure to force a change). **Change before first use.** After login, change via Dashboard → Settings → Security.                                                                 |
| `OMNIROUTE_WS_BRIDGE_SECRET` | **Yes** (production) | _(unset)_  | `src/app/api/internal/codex-responses-ws/route.ts` | Shared secret for the internal Codex Responses WebSocket bridge. Authenticates bridge requests between the Electron/browser WS relay and OmniRoute. ⚠️ **REQUIRED in production — when unset, all WS bridge requests are rejected.** Generate with `openssl rand -base64 32`. |

### Generation Commands

```bash
# Generate all four secrets at once:
echo "JWT_SECRET=$(openssl rand -base64 48)"
echo "API_KEY_SECRET=$(openssl rand -hex 32)"
echo "INITIAL_PASSWORD=$(openssl rand -base64 16)"
echo "OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -base64 32)"
```

> [!CAUTION]
> Never commit `.env` files with real secrets to version control. The `.gitignore` already excludes `.env`, but verify before pushing.

---

## 2. Storage & Database

OmniRoute uses **SQLite** (via `better-sqlite3`) for all persistence. These variables control data location, encryption, and lifecycle.

| Variable                               | Default              | Source File                                           | Description                                                                                                                      |
| -------------------------------------- | -------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `DATA_DIR`                             | `~/.omniroute/`      | `src/lib/db/core.ts`                                  | Root directory for SQLite DB, backups, and data files. Override for Docker volumes or custom paths.                              |
| `STORAGE_ENCRYPTION_KEY`               | _(empty = disabled)_ | `src/lib/db/encryption.ts`                            | AES key for full SQLite database encryption at rest. Generate with `openssl rand -hex 32`.                                       |
| `STORAGE_ENCRYPTION_KEY_VERSION`       | `v1`                 | `scripts/build/bootstrap-env.mjs`, `electron/main.js` | Version label for the encryption key. Increment when performing key rotation to support decryption of old backups.               |
| `DISABLE_SQLITE_AUTO_BACKUP`           | `false`              | `src/lib/db/backup.ts`                                | When `true`, skips the automatic database backup that runs before migrations on every startup.                                   |
| `OMNIROUTE_CRYPT_KEY`                  | _(unset)_            | `src/lib/db/encryption.ts`                            | **Legacy alias** for `STORAGE_ENCRYPTION_KEY`. Accepted as a fallback when the primary variable is absent.                       |
| `OMNIROUTE_API_KEY_BASE64`             | _(unset)_            | `src/lib/db/encryption.ts`                            | **Legacy alias** (Base64-encoded form) accepted as a fallback. Decoded automatically before use.                                 |
| `OMNIROUTE_DB_HEALTHCHECK_INTERVAL_MS` | _(unset)_            | `src/lib/db/core.ts`                                  | Override the periodic SQLite healthcheck interval (ms). When unset, defaults are derived from `NODE_ENV`.                        |
| `OMNIROUTE_FORCE_DB_HEALTHCHECK`       | `0`                  | `src/lib/db/core.ts`                                  | Set to `1` to force the DB healthcheck loop on, even when it would normally be skipped (e.g., short-lived tasks).                |
| `OMNIROUTE_MIGRATIONS_DIR`             | _(auto-detect)_      | `src/lib/db/migrationRunner.ts`                       | Override the directory that the migration runner scans. Useful when shipping bundled migrations in custom builds.                |
| `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`    | _(default in code)_  | `src/lib/spend/batchWriter.ts`                        | Flush interval (ms) for the batched spend/cost writer. Lower values reduce write coalescing; higher values reduce DB contention. |
| `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`      | _(default in code)_  | `src/lib/spend/batchWriter.ts`                        | Max buffered spend entries before a forced flush. Raise on high-QPS deployments; lower when bounded memory matters more.         |

### Scenarios

| Scenario              | Configuration                                                                    |
| --------------------- | -------------------------------------------------------------------------------- |
| **Local development** | Leave all defaults. DB lives at `~/.omniroute/omniroute.db`.                     |
| **Docker**            | `DATA_DIR=/data` + mount a volume at `/data`.                                    |
| **Encrypted at rest** | Set `STORAGE_ENCRYPTION_KEY` + keep backups of the key! Losing it = losing data. |
| **CI/Testing**        | `DATA_DIR=/tmp/omniroute-test` — ephemeral, no encryption needed.                |

---

## 3. Network & Ports

| Variable                  | Default                         | Source File                       | Description                                                                                                                                                 |
| ------------------------- | ------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`                    | `20128`                         | `src/lib/runtime/ports.ts`        | Primary port for both Dashboard UI and API endpoints (single-port mode).                                                                                    |
| `API_PORT`                | _(unset)_                       | `src/lib/runtime/ports.ts`        | When set, serves the `/v1/*` proxy API on this separate port.                                                                                               |
| `API_HOST`                | `0.0.0.0`                       | `src/lib/runtime/ports.ts`        | Bind address for the API port.                                                                                                                              |
| `DASHBOARD_PORT`          | _(unset)_                       | `src/lib/runtime/ports.ts`        | When set, serves the Dashboard UI on this separate port.                                                                                                    |
| `PROD_DASHBOARD_PORT`     | `20130`                         | `docker-compose.prod.yml`         | Host-side published port for the Dashboard in Docker production mode.                                                                                       |
| `PROD_API_PORT`           | `20131`                         | `docker-compose.prod.yml`         | Host-side published port for the API in Docker production mode.                                                                                             |
| `OMNIROUTE_PORT`          | _(unset)_                       | `src/lib/runtime/ports.ts`        | Takes precedence over `PORT` when running inside Electron or other wrappers.                                                                                |
| `NODE_ENV`                | `production`                    | Next.js core                      | Controls logging verbosity, caching, error detail exposure, and Next.js optimizations.                                                                      |
| `OMNIROUTE_USE_TURBOPACK` | `1` (default in `.env.example`) | `package.json` / Next.js 16       | Toggles the Next.js 16 Turbopack bundler in `npm run dev` and `npm run build`. Set to `0` on Windows or when running into native binding incompatibilities. |
| `HOST`                    | `0.0.0.0`                       | `scripts/run-next.mjs`            | Bind address for the Next.js dev/start server. Overrides the default `0.0.0.0` when set.                                                                    |
| `HOSTNAME`                | `127.0.0.1`                     | `scripts/run-next-playwright.mjs` | Bind address used by the Playwright runner when launching Next.js. Defaults to `127.0.0.1` for hermetic tests.                                              |

### Port Modes

```
┌─────────────────────────── Single Port (default) ──────────────────────────┐
│  PORT=20128                                                                 │
│  → Dashboard: http://localhost:20128                                        │
│  → API:       http://localhost:20128/v1/chat/completions                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────── Split Ports ─────────────────────────────────────┐
│  DASHBOARD_PORT=20128                                                       │
│  API_PORT=20129                                                             │
│  API_HOST=0.0.0.0                                                           │
│  → Dashboard: http://localhost:20128                                        │
│  → API:       http://0.0.0.0:20129/v1/chat/completions                     │
│  Use case: Expose API to LAN while restricting Dashboard to localhost.      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────── Docker Production ──────────────────────────────┐
│  PROD_DASHBOARD_PORT=443   PROD_API_PORT=8443                              │
│  → Maps container ports to host ports in docker-compose.prod.yml.          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Security & Authentication

| Variable                                | Default               | Source File                              | Description                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------- | --------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MACHINE_ID_SALT`                       | `endpoint-proxy-salt` | `src/lib/auth`                           | Salt combined with hardware identifiers for machine fingerprinting. Change per-deployment for isolation.                                                                                                                                                                                                                                                           |
| `AUTH_COOKIE_SECURE`                    | `false`               | `src/lib/auth`                           | Sets the `Secure` flag on session cookies. **Must be `true`** when running behind HTTPS.                                                                                                                                                                                                                                                                           |
| `REQUIRE_API_KEY`                       | `false`               | API middleware                           | When `true`, all `/v1/*` proxy requests must include a valid API key.                                                                                                                                                                                                                                                                                              |
| `ALLOW_API_KEY_REVEAL`                  | `false`               | Dashboard providers page                 | Allows revealing full API key values in the Dashboard UI. Security risk on shared instances.                                                                                                                                                                                                                                                                       |
| `NO_LOG_API_KEY_IDS`                    | _(empty)_             | `src/lib/compliance/index.ts`            | Comma-separated API key IDs that bypass request logging (GDPR compliance).                                                                                                                                                                                                                                                                                         |
| `DEFAULT_RATE_LIMIT_PER_DAY`            | `1000`                | `src/shared/utils/apiKeyPolicy.ts`       | Fallback per-day request budget applied to API keys whose `rate_limits` column is null. Default (unset/empty/malformed) keeps the legacy 1000/day, 5000/week, 20000/month windows. Set explicitly to `0` to opt out (unlimited). Any positive integer N enables N/day, 5N/week, 20N/month. Zod-validated; invalid values log a warning and use the legacy default. |
| `MAX_BODY_SIZE_BYTES`                   | `10485760` (10 MB)    | `src/shared/middleware/bodySizeGuard.ts` | Maximum allowed request body size. Rejects payloads exceeding this limit.                                                                                                                                                                                                                                                                                          |
| `CORS_ORIGIN`                           | `*`                   | Next.js middleware                       | CORS `Access-Control-Allow-Origin` value. Restrict for production.                                                                                                                                                                                                                                                                                                 |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | `true`                | `src/shared/network/outboundUrlGuard.ts` | Block provider calls targeting private/loopback/link-local IP ranges. Disable only in isolated test envs.                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` | `false`               | `src/shared/network/outboundUrlGuard.ts` | Allow provider URLs pointing to private/local networks (localhost, 192.168.x.x, 10.x.x.x, etc.). **REQUIRED for self-hosted providers** (LM Studio, Ollama, vLLM, Llamafile, Triton, SearXNG). When `false`, the dashboard rejects validation of local URLs.                                                                                                       |

### Hardening Checklist

```bash
# Production security minimum:
AUTH_COOKIE_SECURE=true        # Requires HTTPS
REQUIRE_API_KEY=true           # Authenticate all proxy calls
ALLOW_API_KEY_REVEAL=false     # Never expose keys in UI
CORS_ORIGIN=https://your.domain.com
MAX_BODY_SIZE_BYTES=5242880    # 5 MB limit
```

---

## 5. Input Sanitization & PII Protection

OmniRoute provides a two-layer defense: request-side injection scanning and response-side PII stripping.

### Request-Side: Prompt Injection Guard

| Variable                  | Default   | Source File                              | Description                                                                                 |
| ------------------------- | --------- | ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED` | `false`   | `src/middleware/promptInjectionGuard.ts` | Enable scanning of incoming messages for prompt injection patterns.                         |
| `INPUT_SANITIZER_MODE`    | `warn`    | `src/middleware/promptInjectionGuard.ts` | `warn` = log only, `block` = reject request with 400, `redact` = strip suspicious patterns. |
| `INJECTION_GUARD_MODE`    | _(unset)_ | `src/middleware/promptInjectionGuard.ts` | Legacy alias for `INPUT_SANITIZER_MODE` — same behavior.                                    |
| `PII_REDACTION_ENABLED`   | `false`   | `src/middleware/promptInjectionGuard.ts` | Detect PII (emails, phones, SSNs) in incoming requests.                                     |

### Response-Side: PII Sanitizer

| Variable                         | Default  | Source File               | Description                                                             |
| -------------------------------- | -------- | ------------------------- | ----------------------------------------------------------------------- |
| `PII_RESPONSE_SANITIZATION`      | `false`  | `src/lib/piiSanitizer.ts` | Scan LLM responses for leaked PII before returning to client.           |
| `PII_RESPONSE_SANITIZATION_MODE` | `redact` | `src/lib/piiSanitizer.ts` | `redact` = mask PII, `warn` = log only, `block` = drop entire response. |

### Scenarios

| Scenario                  | Configuration                                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Enterprise compliance** | `INPUT_SANITIZER_ENABLED=true`, `INPUT_SANITIZER_MODE=block`, `PII_REDACTION_ENABLED=true`, `PII_RESPONSE_SANITIZATION=true` |
| **Monitoring only**       | `INPUT_SANITIZER_ENABLED=true`, `INPUT_SANITIZER_MODE=warn` — logs but never blocks                                          |
| **Personal use**          | Leave all disabled — zero overhead                                                                                           |

---

## 6. Tool & Routing Policies

| Variable                            | Default                      | Source File                         | Description                                                                                                                               |
| ----------------------------------- | ---------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`                  | `disabled`                   | `src/lib/toolPolicy.ts`             | Controls LLM tool/function-calling access. `allowlist` = only listed tools, `denylist` = all except listed, `disabled` = no restrictions. |
| `OMNIROUTE_PAYLOAD_RULES_PATH`      | `./config/payloadRules.json` | `open-sse/services/payloadRules.ts` | Path to payload manipulation rules JSON file (per-model/protocol upstream tweaks).                                                        |
| `OMNIROUTE_PAYLOAD_RULES_RELOAD_MS` | `5000`                       | `open-sse/services/payloadRules.ts` | Reload interval (ms) for hot-reloading the payload rules file. Minimum `1000`.                                                            |

---

## 7. URLs & Cloud Sync

| Variable                                | Default                                                         | Source File                                 | Description                                                                                                                                                                                                                                                                                       |
| --------------------------------------- | --------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BASE_URL`                              | `http://localhost:20128`                                        | `src/lib/cloudSync.ts`                      | Server-side URL for internal sync jobs to call `/api/sync/cloud`.                                                                                                                                                                                                                                 |
| `CLOUD_URL`                             | _(empty)_                                                       | `src/lib/cloudSync.ts`                      | Cloud relay endpoint URL (premium feature).                                                                                                                                                                                                                                                       |
| `CLOUD_SYNC_TIMEOUT_MS`                 | `12000`                                                         | `src/lib/cloudSync.ts`                      | HTTP timeout for cloud sync requests.                                                                                                                                                                                                                                                             |
| `NEXT_PUBLIC_BASE_URL`                  | `http://localhost:20128`                                        | OAuth, Dashboard, sync                      | Public-facing URL for OAuth redirect_uri, Dashboard links. **Must match your public URL behind reverse proxy.**                                                                                                                                                                                   |
| `NEXT_PUBLIC_CLOUD_URL`                 | _(empty)_                                                       | Client-side                                 | Client-side mirror of `CLOUD_URL`.                                                                                                                                                                                                                                                                |
| `NEXT_PUBLIC_APP_URL`                   | _(unset)_                                                       | `src/shared/services/cloudSyncScheduler.ts` | Legacy fallback for `NEXT_PUBLIC_BASE_URL`.                                                                                                                                                                                                                                                       |
| `OMNIROUTE_PUBLIC_BASE_URL`             | _(unset)_                                                       | `open-sse/executors/chatgpt-web.ts`         | Browser-facing OmniRoute origin used for image URLs in API responses (e.g., `/v1/chatgpt-web/image/<id>`). Set this when OpenWebUI or another relay reaches OmniRoute by an internal URL but the user's browser must fetch images from a LAN, tunnel, or public origin. Do **not** include `/v1`. |
| `OMNIROUTE_CGPT_WEB_IMAGE_TIMEOUT_MS`   | `180000` (3 min)                                                | `open-sse/executors/chatgpt-web.ts`         | Max wait time for an async chatgpt-web image to land via the celsius WebSocket. Increase during upstream queue-deep windows.                                                                                                                                                                      |
| `OMNIROUTE_CGPT_WEB_IMAGE_CACHE_MAX_MB` | `256`                                                           | `open-sse/services/chatgptImageCache.ts`    | Total in-memory byte budget (MB) for the chatgpt-web image cache serving `/v1/chatgpt-web/image/<id>`. Lower on memory-constrained hosts; raise if image generation is heavy and clients race the 30-minute TTL.                                                                                  |
| `KIE_CALLBACK_URL`                      | _(unset)_                                                       | `open-sse/utils/kieTask.ts`                 | Public callback URL for asynchronous kie.ai jobs. Highest-priority override before `OMNIROUTE_KIE_CALLBACK_URL` and `OMNIROUTE_PUBLIC_URL`.                                                                                                                                                       |
| `OMNIROUTE_KIE_CALLBACK_URL`            | _(unset)_                                                       | `open-sse/utils/kieTask.ts`                 | Alternate spelling of `KIE_CALLBACK_URL`. Falls back when the primary variable is unset.                                                                                                                                                                                                          |
| `OMNIROUTE_PUBLIC_URL`                  | _(unset)_                                                       | `open-sse/utils/kieTask.ts`                 | Public origin used to compose async callback URLs. Lowest-priority fallback for kie.ai callbacks; also used as a generic public URL for other relays.                                                                                                                                             |
| `OMNIROUTE_CROF_USAGE_URL`              | `https://crof.ai/usage_api/`                                    | `open-sse/services/usage.ts`                | CrofAI quota lookup endpoint used by the Usage page. Override for relays / test fixtures.                                                                                                                                                                                                         |
| `OMNIROUTE_GEMINI_CLI_USAGE_URL`        | `https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist` | `open-sse/services/usage.ts`                | Gemini CLI quota lookup endpoint. Override for relays / test fixtures.                                                                                                                                                                                                                            |
| `OMNIROUTE_CODEWHISPERER_BASE_URL`      | `https://codewhisperer.us-east-1.amazonaws.com`                 | `open-sse/services/usage.ts`                | CodeWhisperer (AWS Kiro) usage limits endpoint. Override for relays / test fixtures.                                                                                                                                                                                                              |

> [!IMPORTANT]
> When deploying behind a reverse proxy (nginx, Caddy), `NEXT_PUBLIC_BASE_URL` **must** be set to your public URL (e.g., `https://omniroute.example.com`). Without this, OAuth callbacks will fail because the redirect_uri won't match.

---

## 8. Outbound Proxy

Route upstream LLM provider calls through an HTTP or SOCKS5 proxy for egress control, geo-routing, or IP masking.

| Variable                          | Default   | Source File          | Description                                                                         |
| --------------------------------- | --------- | -------------------- | ----------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY`             | `true`    | `open-sse/executors` | Enable SOCKS5 proxy agent for upstream calls.                                       |
| `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY` | `true`    | Client-side          | Client-side awareness of SOCKS5 availability.                                       |
| `HTTP_PROXY`                      | _(unset)_ | Node.js standard     | HTTP proxy for upstream calls.                                                      |
| `HTTPS_PROXY`                     | _(unset)_ | Node.js standard     | HTTPS proxy for upstream calls.                                                     |
| `ALL_PROXY`                       | _(unset)_ | Node.js standard     | Universal proxy (supports `socks5://`).                                             |
| `NO_PROXY`                        | _(unset)_ | Node.js standard     | Comma-separated hostnames/IPs to bypass the proxy.                                  |
| `ENABLE_TLS_FINGERPRINT`          | `false`   | `open-sse/executors` | Spoof TLS fingerprint using wreq-js (mimics Chrome 124). Counters JA3/JA4 blocking. |

### Scenarios

| Scenario                      | Configuration                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **SOCKS5 through SSH tunnel** | `ALL_PROXY=socks5://127.0.0.1:7890`, `ENABLE_SOCKS5_PROXY=true`                                                           |
| **Corporate HTTP proxy**      | `HTTP_PROXY=http://proxy.corp.com:3128`, `HTTPS_PROXY=http://proxy.corp.com:3128`, `NO_PROXY=localhost,internal.corp.com` |
| **Anti-fingerprint**          | `ENABLE_TLS_FINGERPRINT=true` — requires `wreq-js` (included)                                                             |

---

## 9. CLI Tool Integration

Controls how OmniRoute discovers and launches CLI sidecars (Claude Code, Codex, etc.).

| Variable                  | Default    | Source File                         | Description                                                                        |
| ------------------------- | ---------- | ----------------------------------- | ---------------------------------------------------------------------------------- |
| `CLI_MODE`                | `auto`     | `src/shared/services/cliRuntime.ts` | `auto` = search system PATH; `manual` = use explicit paths only.                   |
| `CLI_EXTRA_PATHS`         | _(unset)_  | `src/shared/services/cliRuntime.ts` | Additional PATH entries for CLI binary discovery (colon-separated).                |
| `CLI_CONFIG_HOME`         | _(unset)_  | `src/shared/services/cliRuntime.ts` | Override home directory for reading CLI configs (`~/.claude`, `~/.codex`).         |
| `CLI_ALLOW_CONFIG_WRITES` | `false`    | `src/shared/services/cliRuntime.ts` | Allow OmniRoute to write CLI config files (token refresh, session data).           |
| `CLI_CLAUDE_BIN`          | `claude`   | `src/shared/services/cliRuntime.ts` | Custom path to Claude CLI binary.                                                  |
| `CLI_CODEX_BIN`           | `codex`    | `src/shared/services/cliRuntime.ts` | Custom path to Codex CLI binary.                                                   |
| `CLI_DROID_BIN`           | `droid`    | `src/shared/services/cliRuntime.ts` | Custom path to Droid CLI binary.                                                   |
| `CLI_OPENCLAW_BIN`        | `openclaw` | `src/shared/services/cliRuntime.ts` | Custom path to OpenClaw CLI binary.                                                |
| `CLI_CURSOR_BIN`          | `agent`    | `src/shared/services/cliRuntime.ts` | Custom path to Cursor agent binary.                                                |
| `CLI_CLINE_BIN`           | `cline`    | `src/shared/services/cliRuntime.ts` | Custom path to Cline CLI binary.                                                   |
| `CLI_CONTINUE_BIN`        | `cn`       | `src/shared/services/cliRuntime.ts` | Custom path to Continue CLI binary.                                                |
| `CLI_QODER_BIN`           | `qoder`    | `src/shared/services/cliRuntime.ts` | Custom path to Qoder CLI binary.                                                   |
| `CLI_QWEN_BIN`            | `qwen`     | `src/shared/services/cliRuntime.ts` | Custom path to the Qwen Code CLI binary.                                           |
| `CLI_DEVIN_BIN`           | `devin`    | `open-sse/executors/devin-cli.ts`   | Custom path to the Devin CLI binary (v3.8.0). Used by the Windsurf/Devin executor. |

### Docker Example

```bash
# Mount host binaries into the container and tell OmniRoute where they are:
CLI_EXTRA_PATHS=/host-cli/bin
CLI_CONFIG_HOME=/root
CLI_ALLOW_CONFIG_WRITES=true
CLI_CLAUDE_BIN=/host-cli/bin/claude
```

---

## 10. Internal Agent & MCP Integrations

| Variable                                        | Default     | Source File                                                 | Description                                                                                                                   |
| ----------------------------------------------- | ----------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                            | auto-detect | `open-sse/mcp-server/server.ts`                             | Explicit URL for MCP/A2A tools to reach OmniRoute. Overrides localhost auto-detection.                                        |
| `OMNIROUTE_API_KEY`                             | _(unset)_   | MCP/A2A modules                                             | API key for internal MCP tool and A2A skill calls.                                                                            |
| `OMNIROUTE_API_KEY_ID`                          | _(unset)_   | `open-sse/mcp-server/audit.ts`                              | Key ID for MCP audit log attribution.                                                                                         |
| `ROUTER_API_KEY`                                | _(unset)_   | Legacy                                                      | Legacy alias for `OMNIROUTE_API_KEY`.                                                                                         |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`                  | `false`     | `open-sse/mcp-server/server.ts`                             | Enforce scope-based access control on MCP tool calls.                                                                         |
| `OMNIROUTE_MCP_SCOPES`                          | _(all)_     | `open-sse/mcp-server/server.ts`                             | Comma-separated scopes: `admin`, `combos`, `health`, `models`, `routing`, `budget`, `metrics`, `pricing`, `memory`, `skills`. |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`           | enabled     | `open-sse/mcp-server/descriptionCompressor.ts`              | Compress MCP tool descriptions before serializing the manifest. Disable values: `0`, `false`, `off`.                          |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION`         | `rtk`       | `open-sse/mcp-server/descriptionCompressor.ts`              | Compression algorithm/profile. Disable values: `0`, `false`, `off`.                                                           |
| `MODEL_SYNC_INTERVAL_HOURS`                     | `24`        | `src/shared/services/modelSyncScheduler.ts`                 | Model catalog sync interval in hours.                                                                                         |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES`         | `70`        | `src/server-init.ts`                                        | Provider rate-limit and quota polling interval.                                                                               |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`         | `false`     | `src/instrumentation-node.ts`                               | Disable all background services (sync, pricing, model refresh). Useful for CI/test.                                           |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS`     | _(unset)_   | `src/lib/config/runtimeSettings.ts`                         | Force background tasks on under automated test detection. Set `1` to override the test heuristic.                             |
| `OMNIROUTE_BUDGET_RESET_JOB_INTERVAL_MS`        | `600000`    | `src/lib/jobs/budgetResetJob.ts`                            | Budget reset check cadence (ms). Floor `10000`.                                                                               |
| `OMNIROUTE_REASONING_CACHE_CLEANUP_INTERVAL_MS` | `1800000`   | `src/lib/jobs/reasoningCacheCleanupJob.ts`                  | Reasoning cache cleanup cadence (ms). Floor `60000`.                                                                          |
| `OMNIROUTE_CONFIG_HOT_RELOAD_MS`                | `5000`      | `src/lib/config/hotReload.ts`                               | Polling interval (ms) for config hot-reload. Lower than `1000` is rejected.                                                   |
| `OMNIROUTE_DISABLE_REDIS_AUTH_CACHE`            | _(enabled)_ | `src/lib/db/apiKeys.ts`                                     | Set `1` to bypass the Redis-backed API-key auth cache (forces DB reads).                                                      |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`           | `0`         | `open-sse/services/compression/engines/rtk/filterLoader.ts` | Trust user-managed RTK project filter rules without strict signature checks.                                                  |
| `OMNIROUTE_BOOTSTRAPPED`                        | `false`     | `src/app/(dashboard)/dashboard/page.tsx`                    | Set `true` by bootstrap script after initial setup. Controls setup wizard visibility.                                         |
| `OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE`         | `0`         | `open-sse/executors/antigravity.ts`                         | Escape hatch: allow request body to override the Antigravity project field.                                                   |
| `ANTIGRAVITY_CREDITS`                           | _(unset)_   | `open-sse/services/antigravityCredits.ts`                   | Override Antigravity's advertised remaining credits (testing / forced values).                                                |

### OAuth CLI Bridge (Internal)

| Variable            | Default     | Source File                     | Description                               |
| ------------------- | ----------- | ------------------------------- | ----------------------------------------- |
| `OMNIROUTE_SERVER`  | auto-detect | `src/lib/oauth/config/index.ts` | Server URL for CLI↔OmniRoute auth bridge. |
| `OMNIROUTE_TOKEN`   | _(unset)_   | `src/lib/oauth/config/index.ts` | Auth token for CLI bridge.                |
| `OMNIROUTE_USER_ID` | `cli`       | `src/lib/oauth/config/index.ts` | User ID for CLI bridge sessions.          |
| `SERVER_URL`        | _(unset)_   | `src/lib/oauth/config/index.ts` | Legacy alias for `OMNIROUTE_SERVER`.      |
| `CLI_TOKEN`         | _(unset)_   | `src/lib/oauth/config/index.ts` | Legacy alias for `OMNIROUTE_TOKEN`.       |
| `CLI_USER_ID`       | _(unset)_   | `src/lib/oauth/config/index.ts` | Legacy alias for `OMNIROUTE_USER_ID`.     |

---

## 11. OAuth Provider Credentials

Built-in credentials for **localhost development**. For remote deployments, register your own at each provider's developer console.

| Variable                          | Provider                | Notes                                                                                                                                                                                                                                           |
| --------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLAUDE_OAUTH_CLIENT_ID`          | Claude Code (Anthropic) | Public client — no secret needed.                                                                                                                                                                                                               |
| `CLAUDE_CODE_REDIRECT_URI`        | Claude Code             | Override redirect URI. Default: `https://platform.claude.com/oauth/code/callback`                                                                                                                                                               |
| `CODEX_OAUTH_CLIENT_ID`           | Codex / OpenAI          | Public client.                                                                                                                                                                                                                                  |
| `GEMINI_OAUTH_CLIENT_ID`          | Gemini (Google)         | Requires matching `_SECRET`.                                                                                                                                                                                                                    |
| `GEMINI_OAUTH_CLIENT_SECRET`      | Gemini (Google)         | —                                                                                                                                                                                                                                               |
| `GEMINI_CLI_OAUTH_CLIENT_ID`      | Gemini CLI              | Usually same as Gemini.                                                                                                                                                                                                                         |
| `GEMINI_CLI_OAUTH_CLIENT_SECRET`  | Gemini CLI              | —                                                                                                                                                                                                                                               |
| `QWEN_OAUTH_CLIENT_ID`            | Qwen (Alibaba)          | Public client.                                                                                                                                                                                                                                  |
| `KIMI_CODING_OAUTH_CLIENT_ID`     | Kimi Coding (Moonshot)  | Public client.                                                                                                                                                                                                                                  |
| `ANTIGRAVITY_OAUTH_CLIENT_ID`     | Antigravity (Google)    | Requires matching `_SECRET`.                                                                                                                                                                                                                    |
| `ANTIGRAVITY_OAUTH_CLIENT_SECRET` | Antigravity (Google)    | —                                                                                                                                                                                                                                               |
| `GITHUB_OAUTH_CLIENT_ID`          | GitHub Copilot          | Public client.                                                                                                                                                                                                                                  |
| `WINDSURF_FIREBASE_API_KEY`       | Windsurf / Devin (v3.8) | Public Firebase Web API key used by Windsurf's Secure Token Service to refresh short-lived browser-flow tokens. Client-side credential (not a secret). Long-lived import tokens skip this entirely. Source: extracted from Devin CLI binary.    |
| `WINDSURF_API_KEY`                | Windsurf / Devin (v3.8) | API key fallback used by `open-sse/executors/devin-cli.ts` when no per-connection credential is available. Optional.                                                                                                                            |
| `CLI_DEVIN_BIN`                   | Devin CLI (v3.8)        | Custom path to the Devin CLI binary (`devin`). Resolved by `open-sse/executors/devin-cli.ts`.                                                                                                                                                   |
| `GITLAB_DUO_OAUTH_CLIENT_ID`      | GitLab Duo (v3.8)       | OAuth client ID for GitLab Duo. Register an app at `https://gitlab.com/-/profile/applications` with redirect URI `<NEXT_PUBLIC_BASE_URL>/callback` and scopes `api, read_user, openid, profile, email`. Falls back to `GITLAB_OAUTH_CLIENT_ID`. |
| `GITLAB_DUO_OAUTH_CLIENT_SECRET`  | GitLab Duo (v3.8)       | OAuth client secret for GitLab Duo. Optional — PKCE flow does not require a secret. Falls back to `GITLAB_OAUTH_CLIENT_SECRET`.                                                                                                                 |
| `GITLAB_DUO_BASE_URL`             | GitLab Duo (v3.8)       | Override GitLab base URL (self-hosted GitLab). Defaults to `https://gitlab.com`. Falls back to `GITLAB_BASE_URL`.                                                                                                                               |
| `GITLAB_BASE_URL`                 | GitLab Duo (v3.8)       | Legacy fallback for `GITLAB_DUO_BASE_URL`. Used when the `_DUO_` variant is unset.                                                                                                                                                              |
| `GITLAB_OAUTH_CLIENT_ID`          | GitLab Duo (v3.8)       | Legacy fallback for `GITLAB_DUO_OAUTH_CLIENT_ID` consumed by `src/lib/oauth/constants/oauth.ts`.                                                                                                                                                |
| `GITLAB_OAUTH_CLIENT_SECRET`      | GitLab Duo (v3.8)       | Legacy fallback for `GITLAB_DUO_OAUTH_CLIENT_SECRET` consumed by `src/lib/oauth/constants/oauth.ts`.                                                                                                                                            |
| `QODER_OAUTH_CLIENT_SECRET`       | Qoder                   | —                                                                                                                                                                                                                                               |
| `QODER_OAUTH_AUTHORIZE_URL`       | Qoder                   | Set to enable Qoder OAuth.                                                                                                                                                                                                                      |
| `QODER_OAUTH_TOKEN_URL`           | Qoder                   | —                                                                                                                                                                                                                                               |
| `QODER_OAUTH_USERINFO_URL`        | Qoder                   | —                                                                                                                                                                                                                                               |
| `QODER_OAUTH_CLIENT_ID`           | Qoder                   | —                                                                                                                                                                                                                                               |
| `QODER_PERSONAL_ACCESS_TOKEN`     | Qoder                   | Direct API key fallback (bypasses OAuth).                                                                                                                                                                                                       |
| `QODER_CLI_WORKSPACE`             | Qoder                   | Workspace ID for Qoder CLI.                                                                                                                                                                                                                     |
| `OMNIROUTE_QODER_WORKSPACE`       | Qoder                   | Alias for `QODER_CLI_WORKSPACE`.                                                                                                                                                                                                                |
| `BLACKBOX_WEB_VALIDATED_TOKEN`    | Blackbox Web            | Frontend `tk` token to send as `validated` on `/api/chat`. Required when Blackbox enforces token matching; otherwise OmniRoute falls back to a random UUID. See issue #2252.                                                                    |

> [!WARNING]
> **Google OAuth** (Antigravity, Gemini CLI) credentials **only work on localhost**. For remote servers:
>
> 1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
> 2. Create an OAuth 2.0 Client ID (type: "Web application")
> 3. Add your server URL as Authorized redirect URI
> 4. Replace the credential values in `.env`.

---

## 12. Provider User-Agent Overrides

Override the `User-Agent` header sent to each upstream provider. This is dynamically resolved at runtime by the executor base class:

```
process.env[`${PROVIDER_ID}_USER_AGENT`]
```

> **Source:** `open-sse/executors/base.ts` → `buildHeaders()`

| Variable                 | Default Value                                 | When to Update                                                |
| ------------------------ | --------------------------------------------- | ------------------------------------------------------------- |
| `CLAUDE_USER_AGENT`      | `claude-cli/2.1.137 (external, cli)`          | When Anthropic releases a new CLI version                     |
| `CODEX_USER_AGENT`       | `codex-cli/0.130.0 (Windows 10.0.26200; x64)` | When OpenAI updates the Codex CLI                             |
| `CODEX_CLIENT_VERSION`   | `0.130.0`                                     | Override Codex client version independently of full UA string |
| `GITHUB_USER_AGENT`      | `GitHubCopilotChat/0.45.1`                    | When GitHub Copilot Chat updates                              |
| `ANTIGRAVITY_USER_AGENT` | `antigravity/1.23.2 darwin/arm64`             | When Antigravity IDE updates                                  |
| `KIRO_USER_AGENT`        | `AWS-SDK-JS/3.0.0 kiro-ide/1.0.0`             | When Kiro IDE updates                                         |
| `QODER_USER_AGENT`       | `Qoder-Cli`                                   | When Qoder CLI updates                                        |
| `QWEN_USER_AGENT`        | `QwenCode/0.15.9 (linux; x64)`                | When Qwen Code updates                                        |
| `CURSOR_USER_AGENT`      | `Cursor/3.3`                                  | When Cursor updates                                           |
| `GEMINI_CLI_USER_AGENT`  | `google-api-nodejs-client/10.3.0`             | When Google API client updates                                |

> [!TIP]
> You can add User-Agent overrides for **any** provider using the pattern `{PROVIDER_ID}_USER_AGENT`. The executor dynamically constructs the env var name.

---

## 13. CLI Fingerprint Compatibility

When enabled, OmniRoute reorders HTTP headers and JSON body fields to match the exact signature of official CLI tools. This reduces the risk of account flagging while preserving your proxy IP.

**Source:** `open-sse/config/cliFingerprints.ts`, `open-sse/executors/base.ts`

### Per-Provider

| Variable                 | Activation | Effect                                  |
| ------------------------ | ---------- | --------------------------------------- |
| `CLI_COMPAT_CODEX`       | `=1`       | Mimics Codex CLI request signature      |
| `CLI_COMPAT_CLAUDE`      | `=1`       | Mimics Claude Code request signature    |
| `CLI_COMPAT_GITHUB`      | `=1`       | Mimics GitHub Copilot request signature |
| `CLI_COMPAT_ANTIGRAVITY` | `=1`       | Mimics Antigravity request signature    |
| `CLI_COMPAT_CURSOR`      | `=1`       | Mimics Cursor request signature         |
| `CLI_COMPAT_KIMI_CODING` | `=1`       | Mimics Kimi Coding request signature    |
| `CLI_COMPAT_KILOCODE`    | `=1`       | Mimics Kilo Code request signature      |
| `CLI_COMPAT_CLINE`       | `=1`       | Mimics Cline request signature          |
| `CLI_COMPAT_QWEN`        | `=1`       | Mimics Qwen Code request signature      |

### Global

| Variable         | Activation | Effect                                                          |
| ---------------- | ---------- | --------------------------------------------------------------- |
| `CLI_COMPAT_ALL` | `=1`       | Enable fingerprint compatibility for **all** providers at once. |

### Kimi Coding CLI identity overrides

| Variable                | Default              | Source File                              | Description                                                  |
| ----------------------- | -------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `KIMI_CLI_VERSION`      | `1.36.0`             | `src/lib/oauth/providers/kimi-coding.ts` | Override the Kimi CLI version sent during OAuth/API calls.   |
| `KIMI_CODING_DEVICE_ID` | _(captured default)_ | `src/lib/oauth/providers/kimi-coding.ts` | Override the captured Kimi device ID used in client headers. |

> [!NOTE]
> This feature works alongside the User-Agent overrides (§12). The fingerprint system handles header ordering and body field ordering, while User-Agent overrides handle the specific UA string. Both can be enabled independently.

---

## 14. API Key Providers

API keys for providers that use direct authentication. **Preferred setup:** Dashboard → Providers → Add API Key.

Setting via environment variables is an alternative for Docker or headless deployments.

Recognized pattern: `{PROVIDER_ID}_API_KEY`

| Variable           | Provider   |
| ------------------ | ---------- |
| `DEEPSEEK_API_KEY` | DeepSeek   |
| `NVIDIA_API_KEY`   | NVIDIA NIM |

> [!NOTE]
> Static `${PROVIDER}_API_KEY` entries for Groq, xAI, Mistral, Perplexity, Together AI, Fireworks, Cerebras, Cohere, Nebius, and Qianfan were removed in v3.8.0 because the runtime no longer reads them — those providers rely exclusively on Dashboard / `data/provider-credentials.json` / the encrypted DB. See the _Audit: Removed / Dead Variables_ section at the bottom of this document for the migration path.

> [!TIP]
> Keys set via the Dashboard are stored encrypted in SQLite and take precedence over environment variables.

---

## 15. Timeout Settings

All values are in **milliseconds**. Centralized resolution in `src/shared/utils/runtimeTimeouts.ts`.

### Timeout Hierarchy

```
REQUEST_TIMEOUT_MS (global override)
├─→ FETCH_TIMEOUT_MS (upstream provider calls, default: 600000)
│   ├─→ FETCH_HEADERS_TIMEOUT_MS (inherits from FETCH_TIMEOUT_MS)
│   ├─→ FETCH_BODY_TIMEOUT_MS (inherits from FETCH_TIMEOUT_MS)
│   ├─→ TLS_CLIENT_TIMEOUT_MS (inherits from FETCH_TIMEOUT_MS)
│   ├── FETCH_CONNECT_TIMEOUT_MS (independent, default: 30000)
│   └── FETCH_KEEPALIVE_TIMEOUT_MS (independent, default: 4000)
├─→ STREAM_IDLE_TIMEOUT_MS (inherits from REQUEST_TIMEOUT_MS, default: 600000)
└─→ API_BRIDGE_PROXY_TIMEOUT_MS (inherits from REQUEST_TIMEOUT_MS, default: 30000)
    ├─→ API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS (derived, default: 300000)
    ├── API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS (default: 60000)
    ├── API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS (default: 5000)
    └── API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS (default: 0 = disabled)
```

| Variable                                 | Default              | Description                                                                                 |
| ---------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`                     | _(unset)_            | Global shortcut — overrides both `FETCH_TIMEOUT_MS` and `STREAM_IDLE_TIMEOUT_MS` defaults.  |
| `FETCH_TIMEOUT_MS`                       | `600000`             | Total HTTP request timeout for upstream provider calls.                                     |
| `STREAM_IDLE_TIMEOUT_MS`                 | `600000`             | Max silence between SSE chunks before aborting. Extended-thinking models rarely pause >90s. |
| `FETCH_HEADERS_TIMEOUT_MS`               | = `FETCH_TIMEOUT_MS` | Time to receive response headers.                                                           |
| `FETCH_BODY_TIMEOUT_MS`                  | = `FETCH_TIMEOUT_MS` | Time to receive the full response body.                                                     |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`              | TCP connection establishment timeout.                                                       |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`               | Keep-alive socket idle timeout.                                                             |
| `TLS_CLIENT_TIMEOUT_MS`                  | = `FETCH_TIMEOUT_MS` | TLS fingerprint proxy (wreq-js) timeout.                                                    |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | `30000`              | Proxy hop timeout for `/v1` bridge requests.                                                |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `300000`             | Overall server request timeout for the bridge.                                              |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`              | Time to send response headers via the bridge.                                               |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`               | Bridge keep-alive idle timeout.                                                             |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                  | Raw socket timeout (0 = disabled).                                                          |
| `SHUTDOWN_TIMEOUT_MS`                    | `30000`              | Grace period on SIGTERM/SIGINT before force-exit.                                           |
| `OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS`     | `120000`             | Fallback used by `src/shared/utils/fetchTimeout.ts` when `FETCH_TIMEOUT_MS` is unset.       |
| `OMNIROUTE_CHATGPT_TLS_TIMEOUT_MS`       | `60000`              | Wire-level timeout for the bogdanfinn/tls-client koffi binding (`chatgptTlsClient.ts`).     |
| `OMNIROUTE_CHATGPT_TLS_GRACE_MS`         | `10000`              | JS-side grace added on top of the wire timeout when the native binding is wedged.           |

### Circuit Breaker Thresholds

Provider-level circuit breaker tuning. Defaults reflect the scaled values used since v3.6 for 500+ connections.

| Variable                                      | Default | Source File                    | Description                                                                 |
| --------------------------------------------- | ------- | ------------------------------ | --------------------------------------------------------------------------- |
| `OMNIROUTE_CIRCUIT_BREAKER_OAUTH_THRESHOLD`   | `8`     | `open-sse/config/constants.ts` | Consecutive failure threshold for OAuth providers before the breaker trips. |
| `OMNIROUTE_CIRCUIT_BREAKER_OAUTH_RESET_MS`    | `60000` | `open-sse/config/constants.ts` | Reset window (ms) for OAuth provider breaker.                               |
| `OMNIROUTE_CIRCUIT_BREAKER_API_KEY_THRESHOLD` | `12`    | `open-sse/config/constants.ts` | Consecutive failure threshold for API-key providers.                        |
| `OMNIROUTE_CIRCUIT_BREAKER_API_KEY_RESET_MS`  | `30000` | `open-sse/config/constants.ts` | Reset window (ms) for API-key provider breaker.                             |
| `OMNIROUTE_CIRCUIT_BREAKER_LOCAL_THRESHOLD`   | `2`     | `open-sse/config/constants.ts` | Consecutive failure threshold for local providers (Ollama, LM Studio, ...). |
| `OMNIROUTE_CIRCUIT_BREAKER_LOCAL_RESET_MS`    | `15000` | `open-sse/config/constants.ts` | Reset window (ms) for local provider breaker.                               |

### Scenarios

| Scenario                         | Configuration                                          |
| -------------------------------- | ------------------------------------------------------ |
| **Long-running code generation** | `REQUEST_TIMEOUT_MS=900000` (15 min)                   |
| **Fast-fail for production API** | `API_BRIDGE_PROXY_TIMEOUT_MS=10000`                    |
| **Extended thinking models**     | `STREAM_IDLE_TIMEOUT_MS=300000` (5 min between chunks) |

---

## 16. Logging

The logging system writes to both stdout and rotated log files. All configuration is read by `src/lib/logEnv.ts`.

| Variable                                  | Default                    | Description                                                                       |
| ----------------------------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| `APP_LOG_LEVEL`                           | `info`                     | Minimum log level: `debug`, `info`, `warn`, `error`.                              |
| `APP_LOG_FORMAT`                          | `text`                     | Output format: `text` (human-readable) or `json` (structured).                    |
| `APP_LOG_TO_FILE`                         | `true`                     | Write logs to file alongside stdout.                                              |
| `APP_LOG_FILE_PATH`                       | `logs/application/app.log` | Log file path (relative to project root or `DATA_DIR`).                           |
| `APP_LOG_MAX_FILE_SIZE`                   | `50M`                      | Max file size before rotation. Accepts: `50M`, `1G`, `512K`, or plain bytes.      |
| `APP_LOG_RETENTION_DAYS`                  | `7`                        | Days to keep rotated application log files.                                       |
| `APP_LOG_MAX_FILES`                       | `20`                       | Maximum rotated log file backups.                                                 |
| `CALL_LOG_RETENTION_DAYS`                 | `7`                        | Days to keep request/call log entries in the database.                            |
| `CALL_LOG_MAX_ENTRIES`                    | `10000`                    | Max call log entries in the in-memory buffer.                                     |
| `CALL_LOGS_TABLE_MAX_ROWS`                | `100000`                   | Max rows in the `call_logs` SQLite table before pruning.                          |
| `CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS` | `true`                     | Store stream chunks in pipeline artifacts when `call_log_pipeline_enabled=true`.  |
| `CALL_LOG_PIPELINE_MAX_SIZE_KB`           | `512`                      | Max pipeline call log artifact size in KB when `call_log_pipeline_enabled=true`.  |
| `PROXY_LOGS_TABLE_MAX_ROWS`               | `100000`                   | Max rows in the `proxy_logs` SQLite table before pruning.                         |
| `APP_LOG_ROTATION_CHECK_INTERVAL_MS`      | `60000` (1 min)            | How often `src/lib/logRotation.ts` re-checks the active log file size.            |
| `CHAT_LOG_TEXT_LIMIT`                     | `65536`                    | Max string length retained in chat log artifacts (default 64 KB).                 |
| `CHAT_LOG_ARRAY_TAIL_ITEMS`               | `24`                       | Number of array items retained from the tail when truncating chat log payloads.   |
| `CHAT_LOG_MAX_DEPTH`                      | `6`                        | Max nesting depth before chat log payloads are truncated.                         |
| `CHAT_LOG_MAX_OBJECT_KEYS`                | `80`                       | Max object keys retained in chat log payloads (0 = unlimited).                    |
| `CHAT_DEBUG_FILE`                         | `false`                    | When true, `serializeArtifactForStorage` skips size-based truncation. Debug only. |

---

## 17. Memory Optimization

| Variable                   | Default                         | Description                                                            |
| -------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| `OMNIROUTE_MEMORY_MB`      | `256` (Docker) / system default | V8 heap limit. Sets `--max-old-space-size`.                            |
| `PROMPT_CACHE_MAX_SIZE`    | `50`                            | Max cached system prompt entries.                                      |
| `PROMPT_CACHE_MAX_BYTES`   | `2097152` (2 MB)                | Max total prompt cache size.                                           |
| `PROMPT_CACHE_TTL_MS`      | `300000` (5 min)                | Prompt cache entry TTL.                                                |
| `SEMANTIC_CACHE_MAX_SIZE`  | `100`                           | Max cached temperature=0 responses.                                    |
| `SEMANTIC_CACHE_MAX_BYTES` | `4194304` (4 MB)                | Max total semantic cache size.                                         |
| `SEMANTIC_CACHE_TTL_MS`    | `1800000` (30 min)              | Semantic cache entry TTL.                                              |
| `STREAM_HISTORY_MAX`       | `50`                            | Max recent stream events in the Dashboard live view buffer.            |
| `CONTEXT_LENGTH_DEFAULT`   | `128000`                        | Global fallback max context length for models without explicit config. |
| `USAGE_TOKEN_BUFFER`       | `100`                           | Extra token headroom reserved when tracking usage quotas.              |

### Compression

| Variable                              | Default | Description                                                                                                   |
| ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS` | unset   | Trust project `.rtk/filters.json` without a `.rtk/trust.json` hash. Use only in controlled local development. |

### Low-RAM Docker Example

```bash
OMNIROUTE_MEMORY_MB=128
PROMPT_CACHE_MAX_SIZE=20
PROMPT_CACHE_MAX_BYTES=524288        # 512 KB
SEMANTIC_CACHE_MAX_SIZE=25
SEMANTIC_CACHE_MAX_BYTES=1048576     # 1 MB
STREAM_HISTORY_MAX=10
```

---

## 18. Pricing Sync

Automatic model pricing data synchronization from external sources.

| Variable                | Default       | Source File              | Description                   |
| ----------------------- | ------------- | ------------------------ | ----------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`       | `src/lib/pricingSync.ts` | Opt-in periodic pricing sync. |
| `PRICING_SYNC_INTERVAL` | `86400` (24h) | `src/lib/pricingSync.ts` | Sync interval in seconds.     |
| `PRICING_SYNC_SOURCES`  | `litellm`     | `src/lib/pricingSync.ts` | Comma-separated data sources. |

---

## 19. Model Sync (Dev)

| Variable                   | Default       | Source File                | Description                                              |
| -------------------------- | ------------- | -------------------------- | -------------------------------------------------------- |
| `MODELS_DEV_SYNC_INTERVAL` | `86400` (24h) | `src/lib/modelsDevSync.ts` | Development-time model catalog sync interval in seconds. |

---

## 20. Provider-Specific Settings

| Variable                                  | Default            | Source File                                                           | Description                                                                           |
| ----------------------------------------- | ------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `OPENROUTER_CATALOG_TTL_MS`               | `86400000` (24h)   | `src/lib/catalog/openrouterCatalog.ts`                                | OpenRouter model catalog cache TTL.                                                   |
| `NANOBANANA_POLL_TIMEOUT_MS`              | `120000`           | `open-sse/handlers/imageGeneration.ts`                                | Max wait for NanoBanana image generation jobs.                                        |
| `NANOBANANA_POLL_INTERVAL_MS`             | `2500`             | `open-sse/handlers/imageGeneration.ts`                                | NanoBanana job polling frequency.                                                     |
| `AWS_REGION`                              | _(unset)_          | `src/lib/providers/validation.ts`, `open-sse/handlers/audioSpeech.ts` | Region used to construct AWS Bedrock endpoints (Kiro, audio).                         |
| `AWS_DEFAULT_REGION`                      | _(unset)_          | `src/lib/providers/validation.ts`, `open-sse/handlers/audioSpeech.ts` | Fallback when `AWS_REGION` is not set.                                                |
| `CLOUDFLARE_ACCOUNT_ID`                   | _(unset)_          | `open-sse/executors/cloudflare-ai.ts`                                 | Account ID for Cloudflare Workers AI.                                                 |
| `CLOUDFLARED_BIN`                         | auto-detect        | `src/lib/cloudflaredTunnel.ts`                                        | Custom path to `cloudflared` binary.                                                  |
| `SEARCH_CACHE_TTL_MS`                     | `300000` (5 min)   | `open-sse/services/searchCache.ts`                                    | TTL for search API (Perplexity, Brave, etc.) response caching.                        |
| `ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE` | `false`            | `src/app/api/providers/route.ts`                                      | Allow multiple simultaneous connections per OpenAI-compatible provider.               |
| `ENABLE_CC_COMPATIBLE_PROVIDER`           | `false`            | `src/shared/utils/featureFlags.ts`                                    | Reveal the experimental CC-compatible provider UI for Claude Code-only relays.        |
| `CLIPROXYAPI_HOST`                        | `127.0.0.1`        | `open-sse/executors/cliproxyapi.ts`                                   | CLIProxyAPI bridge host (legacy integration).                                         |
| `CLIPROXYAPI_PORT`                        | `5544`             | `open-sse/executors/cliproxyapi.ts`                                   | CLIProxyAPI bridge port.                                                              |
| `CLIPROXYAPI_CONFIG_DIR`                  | `~/.cli-proxy-api` | `src/lib/versionManager/processManager.ts`                            | CLIProxyAPI config directory.                                                         |
| `LOCAL_HOSTNAMES`                         | _(empty)_          | `open-sse/config/providerRegistry.ts`                                 | Comma-separated additional hostnames treated as "local" (Docker service names, etc.). |

`ENABLE_CC_COMPATIBLE_PROVIDER` is only for third-party relays that accept Claude Code clients
exclusively. OmniRoute rewrites requests so those relays accept them. If you only want to use
Claude Code CLI, or you are not sure what these relays are, keep this disabled and add a regular
Anthropic-compatible provider instead.

---

## 21. Proxy Health

| Variable                     | Default          | Source File                              | Description                                                                                                                                                            |
| ---------------------------- | ---------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`           | `src/lib/proxyHealth.ts`                 | Fast-fail health check timeout.                                                                                                                                        |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`          | `src/lib/proxyHealth.ts`                 | Health check result cache TTL.                                                                                                                                         |
| `RATE_LIMIT_MAX_WAIT_MS`     | `120000` (2 min) | `open-sse/services/rateLimitManager.ts`  | Max time to wait on a 429 before failing the request.                                                                                                                  |
| `RATE_LIMIT_AUTO_ENABLE`     | _(unset)_        | `open-sse/services/rateLimitManager.ts`  | Force the auto-enable rate limit safety net on/off regardless of the persisted Dashboard setting. Accepts `true`/`1`/`on` to force on, `false`/`0`/`off` to force off. |
| `HEALTHCHECK_STAGGER_MS`     | `3000`           | `src/lib/tokenHealthCheck.ts`            | Stagger interval (ms) between provider token healthchecks at startup.                                                                                                  |
| `REQUEST_RETRY`              | `2`              | `src/sse/services/cooldownAwareRetry.ts` | Number of automatic retries on model-scoped cooldown responses before returning error to client.                                                                       |
| `MAX_RETRY_INTERVAL_SEC`     | `30`             | `src/sse/services/cooldownAwareRetry.ts` | Max backoff interval (seconds) between cooldown retries. Capped by this value regardless of upstream `Retry-After`.                                                    |

---

## 22. Debugging

> [!CAUTION]
> These variables produce **verbose output** and may leak sensitive data. **Never enable in production.**

| Variable                         | Default             | Source File                                | Description                                                                       |
| -------------------------------- | ------------------- | ------------------------------------------ | --------------------------------------------------------------------------------- |
| `CURSOR_DEBUG`                   | _(unset)_           | `open-sse/executors/cursor.ts`             | Set `1` to enable verbose Cursor executor logs (decoded SSE chunks, etc.).        |
| `CURSOR_STREAM_DEBUG`            | _(unset)_           | `open-sse/executors/cursor.ts`             | Backward-compatible alias of `CURSOR_DEBUG`.                                      |
| `CURSOR_DUMP_FILE`               | _(unset)_           | `open-sse/executors/cursor.ts`             | Optional file path that receives raw decoded Cursor chunks when `CURSOR_DEBUG=1`. |
| `CURSOR_STREAM_TIMEOUT_MS`       | `300000`            | `open-sse/executors/cursor.ts`             | Stream idle timeout (ms) for the Cursor executor.                                 |
| `CURSOR_STATE_DB_PATH`           | _(probed)_          | `open-sse/utils/cursorVersionDetector.ts`  | Override the Cursor state DB lookup used for version detection.                   |
| `CURSOR_TOKEN`                   | _(unset)_           | `scripts/cursor-tap.cjs`                   | Direct Cursor bearer token used by developer tooling.                             |
| `OMNIROUTE_LOG_REQUEST_SHAPE`    | enabled (`!== "0"`) | `src/app/api/v1/chat/completions/route.ts` | Log content-type/length markers for large chat payloads. Set `"0"` to silence.    |
| `DEBUG_RESPONSES_SSE_TO_JSON`    | _(unset)_           | `open-sse/handlers/responseTranslator.ts`  | Set `true` to log Responses API SSE→JSON translation details.                     |
| `NEXT_PUBLIC_OMNIROUTE_E2E_MODE` | _(unset)_           | E2E test harness                           | Set `true` to enable E2E test mode (relaxed auth, test hooks).                    |

---

## 23. GitHub Integration

Allow users to report issues directly from the Dashboard.

| Variable              | Default   | Source File                             | Description                                                                                                                           |
| --------------------- | --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_ISSUES_REPO`  | _(unset)_ | `src/app/api/v1/issues/report/route.ts` | Repository in `owner/repo` format.                                                                                                    |
| `GITHUB_ISSUES_TOKEN` | _(unset)_ | `src/app/api/v1/issues/report/route.ts` | GitHub Personal Access Token with `issues:write` scope.                                                                               |
| `GITHUB_TOKEN`        | _(unset)_ | issue triage / cloud agent helpers      | Generic GitHub access token used as fallback for `GITHUB_ISSUES_TOKEN` and consumed by cloud agent helpers in `src/lib/cloudAgent/*`. |

---

## Deployment Scenarios

### Minimal Local Development

```bash
JWT_SECRET=$(openssl rand -base64 48)
API_KEY_SECRET=$(openssl rand -hex 32)
INITIAL_PASSWORD=dev123
PORT=20128
NODE_ENV=development
```

### Docker Production

```bash
JWT_SECRET=<generated>
API_KEY_SECRET=<generated>
INITIAL_PASSWORD=<generated>
STORAGE_ENCRYPTION_KEY=<generated>
DATA_DIR=/data
PORT=20128
API_PORT=20129
NODE_ENV=production
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=true
NEXT_PUBLIC_BASE_URL=https://omniroute.example.com
BASE_URL=http://localhost:20128
OMNIROUTE_MEMORY_MB=512
CORS_ORIGIN=https://your-frontend.example.com
```

### Air-Gapped / CI

```bash
JWT_SECRET=test-jwt-secret-for-ci
API_KEY_SECRET=test-api-key-secret-for-ci
INITIAL_PASSWORD=testpass
NODE_ENV=production
OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true
APP_LOG_TO_FILE=false
```

### VPS with Reverse Proxy (nginx + Cloudflare)

```bash
JWT_SECRET=<generated>
API_KEY_SECRET=<generated>
STORAGE_ENCRYPTION_KEY=<generated>
PORT=20128
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=true
NEXT_PUBLIC_BASE_URL=https://omniroute.example.com
BASE_URL=http://127.0.0.1:20128
CORS_ORIGIN=https://omniroute.example.com
ENABLE_TLS_FINGERPRINT=true
CLI_COMPAT_ALL=1
```

---

## 24. Skills Sandbox (v3.8.0+)

Limits and safety knobs applied when the Skills framework (`src/lib/skills/`) executes user-defined automations in a sandboxed environment.

| Variable                          | Default                                       | Source File                  | Description                                                                                                        |
| --------------------------------- | --------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000` (10 s)                                | `src/lib/skills/builtins.ts` | Per-execution wall-clock timeout for sandboxed skill code. Hard cap; anything longer is killed.                    |
| `SKILLS_EXECUTION_TIMEOUT_MS`     | _(falls back to `SKILLS_SANDBOX_TIMEOUT_MS`)_ | `src/lib/skills/`            | High-level skill orchestration timeout. Set higher than `SKILLS_SANDBOX_TIMEOUT_MS` to allow multi-step workflows. |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)                              | `src/lib/skills/builtins.ts` | Max bytes a skill may read from any single sandboxed file.                                                         |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000` (250 KB)                             | `src/lib/skills/builtins.ts` | Max bytes captured from any single HTTP response inside a skill.                                                   |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`                                      | `src/lib/skills/builtins.ts` | Hard cap on stdout/stderr characters returned from a sandbox invocation.                                           |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`                                       | `src/lib/skills/builtins.ts` | Set `1`/`true` to allow outbound network from inside the sandbox. Defaults to **isolated** for safety.             |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | _(empty)_                                     | `src/lib/skills/builtins.ts` | Comma-separated allowlist of container images permitted for sandbox execution. Empty means built-in default only.  |
| `SKILLS_SANDBOX_DOCKER_IMAGE`     | _(built-in default)_                          | `src/lib/skills/`            | Container image used when spawning a Docker-backed sandbox. Override to pin a custom hardened base image.          |

> [!CAUTION]
> Enabling `SKILLS_SANDBOX_NETWORK_ENABLED=true` opens an egress path from arbitrary skill code. Pair with `OUTBOUND_SSRF_GUARD_ENABLED=true` and a strict `CORS_ORIGIN`/proxy policy in shared deployments.

---

## 25. Provider Quotas, Tunnels, Backups & Misc Runtime

Provider quota endpoints, network tunnels (Tailscale, Ngrok, MITM debug proxy), the 1Proxy egress pool, database backups and small per-feature overrides referenced by the executor layer or scripts.

| Variable                         | Default                               | Source File                                         | Description                                                                 |
| -------------------------------- | ------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| `REDIS_URL`                      | `redis://localhost:6379`              | `src/shared/utils/rateLimiter.ts`                   | Redis connection string for the rate limiter backend.                       |
| `ALIBABA_CODING_PLAN_HOST`       | _(production host)_                   | `open-sse/services/bailianQuotaFetcher.ts`          | Override the host used to fetch Alibaba Bailian coding-plan quotas.         |
| `ALIBABA_CODING_PLAN_QUOTA_URL`  | derived from host                     | `open-sse/services/bailianQuotaFetcher.ts`          | Full quota URL override for Alibaba Bailian.                                |
| `CONTEXT_RESERVE_TOKENS`         | `1024`                                | `open-sse/services/contextManager.ts`               | Tokens reserved for completion output when computing prompt budgets.        |
| `MODEL_ALIAS_COMPAT_ENABLED`     | enabled                               | `open-sse/services/model.ts`                        | Toggle the legacy model-alias compatibility layer used by older clients.    |
| `COMMAND_CODE_CALLBACK_PORT`     | _(unset)_                             | `src/app/api/providers/command-code/auth/shared.ts` | Local port used for OAuth-style callbacks from the Command Code CLI helper. |
| `MITM_LOCAL_PORT`                | `443`                                 | `src/mitm/server.cjs`                               | Local bind port for the MITM debug proxy.                                   |
| `MITM_DISABLE_TLS_VERIFY`        | `0`                                   | `src/mitm/server.cjs`                               | Set `1` to disable upstream TLS verification (development only).            |
| `ONEPROXY_ENABLED`               | `true`                                | `src/lib/oneproxySync.ts`                           | Enable the 1Proxy egress pool sync.                                         |
| `ONEPROXY_API_URL`               | `https://1proxy-api.aitradepulse.com` | `src/lib/oneproxySync.ts`                           | 1Proxy service API URL override.                                            |
| `ONEPROXY_MAX_PROXIES`           | `500`                                 | `src/lib/oneproxySync.ts`                           | Maximum proxies imported per sync.                                          |
| `ONEPROXY_MIN_QUALITY_THRESHOLD` | `50`                                  | `src/lib/oneproxySync.ts`                           | Minimum quality score for imported proxies.                                 |
| `TAILSCALE_BIN`                  | _(auto-detect)_                       | `src/lib/tailscaleTunnel.ts`                        | Explicit path to the `tailscale` binary.                                    |
| `TAILSCALED_BIN`                 | _(auto-detect)_                       | `src/lib/tailscaleTunnel.ts`                        | Explicit path to the `tailscaled` daemon binary.                            |
| `NGROK_AUTHTOKEN`                | _(unset)_                             | `src/lib/ngrokTunnel.ts`                            | Authenticates outbound ngrok tunnels.                                       |
| `DB_BACKUP_MAX_FILES`            | `20`                                  | `src/lib/db/backup.ts`                              | Maximum SQLite backup files retained on disk.                               |
| `DB_BACKUP_RETENTION_DAYS`       | `0`                                   | `src/lib/db/backup.ts`                              | Maximum age (days) of retained backups. `0` disables age-based pruning.     |
| `OMNIROUTE_TLS_PROXY_URL`        | _(unset)_                             | `open-sse/services/chatgptTlsClient.ts`             | Override the TLS sidecar URL for tests. Production should leave unset.      |

---

## 26. Test & E2E Harness

Used by `scripts/run-next-playwright.mjs`, `scripts/smoke-electron-packaged.mjs`,
`scripts/run-ecosystem-tests.mjs`, and `scripts/uninstall.mjs`. Leave every
value below unset in production deployments.

| Variable                              | Default                          | Source File                           | Description                                                                              |
| ------------------------------------- | -------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_E2E_BOOTSTRAP_MODE`        | `auth`                           | `scripts/run-next-playwright.mjs`     | E2E bootstrap mode (`auth`, `fresh`, `reuse`) for the Playwright runner.                 |
| `OMNIROUTE_E2E_PASSWORD`              | falls back to `INITIAL_PASSWORD` | `scripts/run-next-playwright.mjs`     | Admin password injected into the Playwright environment.                                 |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK` | `true`                           | `scripts/run-next-playwright.mjs`     | Disable the local healthcheck poll during Playwright runs.                               |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK` | `true`                           | `scripts/run-next-playwright.mjs`     | Disable the OAuth token healthcheck loop during tests.                                   |
| `OMNIROUTE_HIDE_HEALTHCHECK_LOGS`     | `true`                           | `scripts/run-next-playwright.mjs`     | Silence healthcheck noise in Playwright stdout.                                          |
| `OMNIROUTE_PLAYWRIGHT_SKIP_BUILD`     | `0`                              | `scripts/run-next-playwright.mjs`     | Skip the Next.js production build before Playwright starts (CI optimization).            |
| `OMNIROUTE_SKIP_UNINSTALL_HOOK`       | `0`                              | `scripts/uninstall.mjs`               | Skip the OmniRoute uninstall hook (used by CI to keep `node_modules` intact).            |
| `ECOSYSTEM_SERVER_WAIT_MS`            | `180000`                         | `scripts/run-ecosystem-tests.mjs`     | Wait time (ms) for the server to become healthy before running ecosystem/protocol tests. |
| `ELECTRON_SMOKE_URL`                  | `http://127.0.0.1:20128/login`   | `scripts/smoke-electron-packaged.mjs` | URL the Electron smoke harness expects the packaged app to serve.                        |
| `ELECTRON_SMOKE_TIMEOUT_MS`           | `45000`                          | `scripts/smoke-electron-packaged.mjs` | Total timeout (ms) before the smoke harness gives up.                                    |
| `ELECTRON_SMOKE_SETTLE_MS`            | `2000`                           | `scripts/smoke-electron-packaged.mjs` | Settle window (ms) after the page loads.                                                 |
| `ELECTRON_SMOKE_APP_EXECUTABLE`       | _(auto)_                         | `scripts/smoke-electron-packaged.mjs` | Explicit path to the packaged Electron executable.                                       |
| `ELECTRON_SMOKE_DATA_DIR`             | _(tmpdir)_                       | `scripts/smoke-electron-packaged.mjs` | Data directory for the Electron smoke run.                                               |
| `ELECTRON_SMOKE_KEEP_DATA`            | `0`                              | `scripts/smoke-electron-packaged.mjs` | Set `1` to preserve the smoke data directory after the run.                              |
| `ELECTRON_SMOKE_STREAM_LOGS`          | `0`                              | `scripts/smoke-electron-packaged.mjs` | Set `1` to stream Electron logs to stdout during the run.                                |
| `CLI_DEVIN_BIN`                       | _(PATH lookup)_                  | `open-sse/executors/devin-cli.ts`     | Override the Devin CLI binary path.                                                      |

### Docs translation pipeline

Used by `scripts/i18n/run-translation.mjs` (the `npm run i18n:run` command).
All five variables are unset by default — set them in `.env` only on machines
that should be able to run the docs translator.

| Variable                            | Default   | Source File                        | Description                                                               |
| ----------------------------------- | --------- | ---------------------------------- | ------------------------------------------------------------------------- |
| `OMNIROUTE_TRANSLATION_API_URL`     | _(unset)_ | `scripts/i18n/run-translation.mjs` | OpenAI-compatible base URL for the translation backend.                   |
| `OMNIROUTE_TRANSLATION_API_KEY`     | _(unset)_ | `scripts/i18n/run-translation.mjs` | Bearer token for the translation backend (never logged).                  |
| `OMNIROUTE_TRANSLATION_MODEL`       | _(unset)_ | `scripts/i18n/run-translation.mjs` | Model id, e.g. `gpt-4o-mini` or `cx/gpt-5.4-mini`.                        |
| `OMNIROUTE_TRANSLATION_TIMEOUT_MS`  | `60000`   | `scripts/i18n/run-translation.mjs` | Per-request timeout in milliseconds.                                      |
| `OMNIROUTE_TRANSLATION_CONCURRENCY` | `4`       | `scripts/i18n/run-translation.mjs` | Parallel translation requests when running over multiple files / locales. |

---

## Audit: Removed / Dead Variables

The following variables appeared in previous versions of `.env.example` but have **no runtime references** in the current codebase. They have been removed:

| Variable                                                                                                                                                                        | Reason                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `STORAGE_DRIVER=sqlite`                                                                                                                                                         | Never read by any source file. SQLite is the only supported driver — no selection needed.                                                          |
| `INSTANCE_NAME=omniroute`                                                                                                                                                       | Present in old docs/env templates but unused at runtime. May return in a future multi-instance feature.                                            |
| `SQLITE_MAX_SIZE_MB=2048`                                                                                                                                                       | Not referenced in source code. Database size is not artificially limited.                                                                          |
| `SQLITE_CLEAN_LEGACY_FILES=true`                                                                                                                                                | Not referenced in source code. Legacy cleanup was likely removed.                                                                                  |
| `CLI_ROO_BIN`                                                                                                                                                                   | Not registered in `src/shared/services/cliRuntime.ts`.                                                                                             |
| `CLI_KIMI_CODING_BIN`                                                                                                                                                           | Not registered in `src/shared/services/cliRuntime.ts` (Kimi Coding uses OAuth, not a CLI binary).                                                  |
| `IFLOW_OAUTH_CLIENT_ID` / `IFLOW_OAUTH_CLIENT_SECRET`                                                                                                                           | Not referenced anywhere in source code.                                                                                                            |
| `CEREBRAS_API_KEY` / `COHERE_API_KEY` / `FIREWORKS_API_KEY` / `GROQ_API_KEY` / `MISTRAL_API_KEY` / `NEBIUS_API_KEY` / `PERPLEXITY_API_KEY` / `TOGETHER_API_KEY` / `XAI_API_KEY` | Removed in v3.8.0. The runtime no longer reads these env vars — credentials come from Dashboard / `data/provider-credentials.json` / encrypted DB. |
| `CURSOR_PROTOBUF_DEBUG`                                                                                                                                                         | Removed in v3.8.0. Cursor executor uses `CURSOR_DEBUG` / `CURSOR_STREAM_DEBUG` (see §22).                                                          |
| `CLI_COMPAT_KIRO`                                                                                                                                                               | Removed in v3.8.0. Kiro is in `CLI_COMPAT_OMITTED_PROVIDER_IDS` — its toggle has no effect.                                                        |
| `QIANFAN_API_KEY`                                                                                                                                                               | Removed alongside other unused provider API key stubs in v3.8.0.                                                                                   |

### Default Value Corrections

| Variable                  | Old `.env.example` Value | Actual Code Default | Fixed                                                  |
| ------------------------- | ------------------------ | ------------------- | ------------------------------------------------------ |
| `APP_LOG_RETENTION_DAYS`  | `90`                     | `7`                 | ✅ Removed misleading value; documented `7` as default |
| `CALL_LOG_RETENTION_DAYS` | `90`                     | `7`                 | ✅ Removed misleading value; documented `7` as default |
