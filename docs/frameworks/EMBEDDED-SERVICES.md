---
title: "Embedded Services"
description: "Reference for 9Router, CLIProxyAPI, Mux, and Bifrost"
---

# Embedded Services

> **Version:** v3.8.44
> **Last updated:** 2026-07-03
> **Audience:** Engineers adding, maintaining, or debugging embedded services (9Router, CLIProxyAPI, Mux, Bifrost).

Embedded services are locally-installed process sidecar tools that OmniRoute installs, supervises, and
exposes as first-class routing targets. Unlike external providers (which are reached over the internet
via API keys), embedded services run on the same machine as OmniRoute and communicate over loopback.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture — 4 layers](#2-architecture--4-layers)
3. [Lifecycle state machine](#3-lifecycle-state-machine)
4. [API reference](#4-api-reference)
5. [Security](#5-security)
6. [Adding a new embedded service](#6-adding-a-new-embedded-service)
7. [Troubleshooting](#7-troubleshooting)
8. [FAQ](#8-faq)

---

## 1. Overview

### Why embedded services?

Four services are embedded as of v3.8.44:

| Service         | npm package                                    | Default port | Purpose                                                                                                          |
| --------------- | ----------------------------------------------- | :----------: | ------------------------------------------------------------------------------------------------------------------ |
| **9Router**     | `9router`                                      |    20130     | AI router that OmniRoute can use as a sub-provider. Models exposed as `9router/{sub}/{model}`                     |
| **CLIProxyAPI** | `@anthropic/cli-proxy` (via `cliproxy` binary) |     auto     | Local proxy adapter for Anthropic CLI auth flows. Provides fallback routing when OAuth tokens expire              |
| **Mux**         | `mux` (headless `mux server`)                  |     8322     | Local agent-orchestration daemon (coder/mux). Lifecycle-managed only — not a routing target (no LLM proxying).   |
| **Bifrost**     | `@maximhq/bifrost`                             |    8080      | Go AI-gateway relay backend. When running, auto-selected by the relay route (`/v1/relay/`)                       |

All four follow the same supervisory model:

- OmniRoute installs them under `DATA_DIR/services/{name}/` (isolated from OmniRoute's own `package.json`)
- OmniRoute spawns and monitors them as child processes
- OmniRoute injects an ephemeral API key into the child's environment and rotates it without downtime (where applicable)
- All management routes (`/api/services/*`) are **LOCAL_ONLY** — accessible only from loopback (hard rule #17)

### Key decisions (from design plan)

| Decision                              | Value                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------ |
| Dashboard access to 9Router native UI | Reverse proxy at `/dashboard/providers/services/9router/embed/*`         |
| Installation mechanism                | `npm install {package}` via `execFile` (no shell interpolation)          |
| Consumption mode                      | Provider registered as `9router/{sub}/{model}` in routing engine         |
| API key management                    | OmniRoute generates, encrypts at-rest (AES-256-GCM), and injects via env |
| Dashboard location                    | `/dashboard/providers/services` (three tabs)                             |
| Auto-start                            | Toggle per service, default OFF                                          |

---

## 2. Architecture — 4 layers

```
┌────────────────────────────────────────────────────────────────────┐
│  Layer 1 — UI                                                      │
│  /dashboard/providers/services  (tabs: CLIProxyAPI | 9Router | Mux)│
│  Logs live (SSE), Start/Stop/Restart/Update, Settings, Install     │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Shell + tab routing by ?tab=         │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 2 — API (LOCAL_ONLY — loopback only)                        │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (reverse HTTP + WebSocket proxy → 9Router upstream)             │
│                                                                    │
│  Gate: LOCAL_ONLY_API_PREFIXES includes "/api/services/" and       │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ in-process calls
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 3 — ServiceSupervisor (src/lib/services/)                   │
│                                                                    │
│  ServiceSupervisor.ts   Generic supervisor (child_process.spawn)   │
│    ├── install:    execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── start:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 for 9Router (configurable)                │
│    ├── logs:       stdio ring buffer 5 MB → SSE events             │
│    ├── health:     HTTP GET /health every 2–5 s, lazy recovery     │
│    └── lifecycle:  SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Bootstraps all SERVICES[] at process start     │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Periodic GET /v1/models → service_models table │
│  ringBuffer.ts      Circular log buffer (5 MB per service)         │
│  healthCheck.ts     Polling HTTP health probe                      │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      (installer adapters)                          │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-compatible HTTP (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 4 — Provider / Routing                                      │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Re-looks up port and API key per-request (no caching).          │
│    Strips "9router/" prefix from model id before proxying.         │
│    Returns 503 service_not_running if supervisor not in "running". │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entry for "9router": isEmbeddedService: true                    │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Models stored as "9router/{sub}/{model}" (prefixed).            │
│    Synced every 5 min by modelSync.ts.                             │
│                                                                    │
│  Mux is lifecycle-managed ONLY (Layers 1-3) — it is an agent-       │
│  orchestration daemon, not an LLM proxy, so it has no Layer 4      │
│  executor/provider entry and is never a routing target.            │
└────────────────────────────────────────────────────────────────────┘
```

### Key source files

| File                                        | Role                                             |
| ------------------------------------------- | ------------------------------------------------ |
| `src/lib/services/ServiceSupervisor.ts`     | Core class: lifecycle, lock, health, ring buffer |
| `src/lib/services/bootstrap.ts`             | Process-level registration and auto-start        |
| `src/lib/services/registry.ts`              | Singleton map `tool → supervisor`                |
| `src/lib/services/apiKey.ts`                | Key generation, AES-256-GCM encryption at-rest   |
| `src/lib/services/modelSync.ts`             | Periodic model sync (5 min) + on-demand          |
| `src/lib/services/ringBuffer.ts`            | 5 MB circular log buffer with SSE subscribe      |
| `src/lib/services/healthCheck.ts`           | HTTP health probe (configurable interval)        |
| `src/lib/services/installers/ninerouter.ts` | npm install/update/uninstall for 9Router         |
| `src/lib/services/installers/cliproxy.ts`   | npm install/update/uninstall for CLIProxyAPI     |
| `src/lib/services/installers/mux.ts`        | npm install/update/uninstall for Mux             |
| `src/app/api/services/9router/_lib.ts`      | `getOrInitSupervisor()` helper                   |
| `src/app/api/services/[name]/logs/route.ts` | Shared SSE logs endpoint                         |
| `open-sse/executors/ninerouter.ts`          | Provider executor (Layer 4)                      |

---

## 3. Lifecycle state machine

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
                  health probe ok   │         crash / SIGTERM    │
                               ┌────▼─────┐  (exit within 5s)   │
                               │ running  │──── crash ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

States stored in the `version_manager` DB table (`status` column) and mirrored
in `ServiceSupervisor` in-memory state. The in-memory state is authoritative for
a running process; the DB state is the durable fallback at boot.

### State transitions

| From            | Event                              | To                     |
| --------------- | ---------------------------------- | ---------------------- |
| `not_installed` | `install()` succeeds               | `stopped`              |
| `stopped`       | `start()` called                   | `starting`             |
| `starting`      | health probe returns 200           | `running`              |
| `starting`      | process exits before healthy       | `error`                |
| `running`       | `stop()` called                    | `stopping` → `stopped` |
| `running`       | process exits unexpectedly (< 5 s) | `error` (fast crash)   |
| `running`       | process exits unexpectedly (> 5 s) | `error`                |
| `error`         | `start()` called                   | `starting`             |
| any             | `stop()` while `stopping`          | no-op                  |

### Operation lock

`ServiceSupervisor` serializes lifecycle operations through an async operation lock
(`withLock()`). Concurrent `start()` calls on the same supervisor result in exactly
one spawn; the second caller waits and returns the existing status. This prevents
race conditions when, for example, auto-start and a UI button fire simultaneously.

---

## 4. API reference

All routes under `/api/services/` are **LOCAL_ONLY** (loopback only, hard rule #17).
Non-loopback requests receive `403 LOCAL_ONLY` regardless of auth token.

### 4.1 9Router endpoints (8 routes)

#### `POST /api/services/9router/install`

Install 9Router from npm. Creates `DATA_DIR/services/9router/` with its own
`package.json` and `node_modules/`. Does not conflict with OmniRoute's own deps.

**Request body** (all optional):

```json
{ "version": "latest" }
```

| Field     | Type     | Default    | Description                          |
| --------- | -------- | ---------- | ------------------------------------ |
| `version` | `string` | `"latest"` | npm version tag or semver to install |

**Responses:**

| Status | Description                                            |
| ------ | ------------------------------------------------------ |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }` |
| `400`  | Invalid request body (Zod validation failure)          |
| `409`  | Already installing (lock held)                         |
| `500`  | npm install failed — see `message` for friendly error  |

**Notes:** Uses `execFile('npm', [...])` — no shell, no interpolation (hard rule #13).
EACCES errors are surfaced as friendly messages.

---

#### `POST /api/services/9router/start`

Start 9Router. Registers a supervisor if not already registered, then calls
`supervisor.start()`. Idempotent when already running.

**Request body:** none

**Responses:**

| Status | Description                                          |
| ------ | ---------------------------------------------------- |
| `200`  | `ServiceStatus` object (see schema below)            |
| `409`  | 9Router is not installed (`status: "not_installed"`) |
| `503`  | Start failed (process error — see `lastError`)       |

**ServiceStatus schema:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Gracefully stop 9Router. Sends SIGTERM, waits 15 s, then SIGKILL if still alive.
Idempotent when already stopped.

**Request body:** none

**Responses:**

| Status | Description                        |
| ------ | ---------------------------------- |
| `200`  | `ServiceStatus` (state: "stopped") |
| `503`  | Stop failed unexpectedly           |

---

#### `POST /api/services/9router/restart`

Equivalent to `stop()` then `start()` under the operation lock.

**Request body:** none

**Responses:** same as `start` (returns final `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Updates 9Router to a newer npm version. If the service is running, it is stopped
first, npm install is run (installing the newer version in-place), and then the
service is restarted.

**Request body** (all optional):

```json
{ "version": "latest" }
```

**Responses:**

| Status | Description                                                     |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Invalid body                                                    |
| `500`  | npm update failed                                               |

---

#### `POST /api/services/9router/rotate-key`

Generates a new API key for 9Router, encrypts it at-rest, and restarts the service
(if running) so it picks up the new key from its environment. The old key is
invalidated immediately.

**Request body:** none

**Responses:**

| Status | Description                                |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Rotation failed                            |

**Security:** The new key is never returned in the response (no credential leak).
It is stored encrypted (AES-256-GCM) in the `version_manager` table.

---

#### `GET /api/services/9router/status`

Returns combined live + DB status including version metadata and API key preview.

**Responses:**

| Status | Description        |
| ------ | ------------------ |
| `200`  | See schema below   |
| `500`  | Status read failed |

**Response schema:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Toggle the auto-start flag. When `enabled: true`, the service starts automatically
the next time OmniRoute boots (if the service is installed).

**Request body:**

```json
{ "enabled": true }
```

**Responses:**

| Status | Description           |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Invalid body          |

---

#### `GET /api/services/9router/logs`

SSE stream of live logs from 9Router's stdout/stderr ring buffer.

**Query parameters:**

| Param    | Type      | Default | Description                                               |
| -------- | --------- | ------- | --------------------------------------------------------- |
| `tail`   | `integer` | 200     | How many historical lines to send first (max 1000)        |
| `filter` | `string`  | none    | Case-insensitive substring filter (no regex — ReDoS-safe) |

**SSE events:**

| Event       | Data        | Description             |
| ----------- | ----------- | ----------------------- |
| `snapshot`  | `LogLine[]` | Initial historical tail |
| `log`       | `LogLine`   | Live log line           |
| `heartbeat` | `{}`        | Keep-alive every 15 s   |

**LogLine schema:**

```json
{ "ts": 1716633600000, "stream": "stdout", "line": "[9router] Listening on :20130" }
```

**Responses:**

| Status | Description                                   |
| ------ | --------------------------------------------- |
| `200`  | `text/event-stream`                           |
| `400`  | `filter` parameter too long (> 200 chars)     |
| `404`  | Service not found (supervisor not registered) |

---

### 4.2 CLIProxyAPI endpoints (7 routes)

CLIProxyAPI has the same endpoint shape as 9Router minus `rotate-key` (CLIProxyAPI
does not require an injected API key; it authenticates via the host's existing CLI
config) and `status` includes fewer fields.

| Method | Path                                | Description                          |
| ------ | ----------------------------------- | ------------------------------------ |
| `POST` | `/api/services/cliproxy/install`    | Install CLIProxyAPI from npm         |
| `POST` | `/api/services/cliproxy/start`      | Start CLIProxyAPI                    |
| `POST` | `/api/services/cliproxy/stop`       | Stop CLIProxyAPI                     |
| `POST` | `/api/services/cliproxy/restart`    | Restart CLIProxyAPI                  |
| `POST` | `/api/services/cliproxy/update`     | Update to newer version              |
| `GET`  | `/api/services/cliproxy/status`     | Live + DB status (no `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Toggle auto-start                    |

The shared `GET /api/services/{name}/logs` endpoint (see §4.1) works for all
four services using the `[name]` dynamic segment.

---

### 4.3 Mux endpoints (7 routes)

Mux has the same endpoint shape as CLIProxyAPI — no `rotate-key` route in the API
surface (the bearer token is generated the same way as 9Router's via
`getOrCreateApiKey("mux")` and injected via the `MUX_SERVER_AUTH_TOKEN` env var, but
there is no dedicated rotation endpoint yet). Mux is lifecycle-managed only: unlike
9Router, it has no Layer 4 executor and is never registered as a routing provider.

| Method | Path                            | Description                          |
| ------ | -------------------------------- | ------------------------------------- |
| `POST` | `/api/services/mux/install`    | Install Mux from npm (`npm i mux`)   |
| `POST` | `/api/services/mux/start`      | Start Mux (`mux server`)             |
| `POST` | `/api/services/mux/stop`       | Stop Mux                             |
| `POST` | `/api/services/mux/restart`    | Restart Mux                          |
| `POST` | `/api/services/mux/update`     | Update to newer npm version          |
| `GET`  | `/api/services/mux/status`     | Live + DB status                     |
| `POST` | `/api/services/mux/auto-start` | Toggle auto-start                    |

---

### 4.4 Bifrost endpoints (7 routes)

Bifrost is a Go AI-gateway relay backend (`@maximhq/bifrost`). It uses the same
endpoint shape as CLIProxyAPI (no `rotate-key` — Bifrost manages its own provider
keys in `config.json` under its `-app-dir`).

| Method | Path                               | Description                                            |
| ------ | ---------------------------------- | ------------------------------------------------------ |
| `POST` | `/api/services/bifrost/install`    | Install Bifrost from npm (`@maximhq/bifrost`)          |
| `POST` | `/api/services/bifrost/start`      | Start Bifrost on port 8080 (default)                   |
| `POST` | `/api/services/bifrost/stop`       | Stop Bifrost                                           |
| `POST` | `/api/services/bifrost/restart`    | Restart Bifrost                                        |
| `POST` | `/api/services/bifrost/update`     | Update to newer version                                |
| `GET`  | `/api/services/bifrost/status`     | Live + DB status                                       |
| `POST` | `/api/services/bifrost/auto-start` | Toggle auto-start                                      |
| `GET`  | `/api/services/bifrost/logs`       | SSE log tail (via shared `[name]/logs` dynamic route)  |

**Routing wiring:** When `BIFROST_BASE_URL` is unset and the supervised Bifrost
instance is running, `getBifrostRoutingConfig()` (in `routingBackend.ts`) automatically
uses `http://127.0.0.1:{port}` as the relay base URL. Explicit `BIFROST_BASE_URL` env
always takes precedence.

---

### 4.4 Reverse proxy (9Router dashboard embed)

The dashboard embeds the 9Router web UI inside an iframe via an internal reverse
proxy at:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

This proxy:

- Forwards the request to `http://127.0.0.1:{port}/{path}` (loopback only)
- Strips incoming `cookie` and `authorization` headers (no leakage of OmniRoute session)
- Injects `Authorization: Bearer {apiKey}` for 9Router authentication
- Strips `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` from the response
- Rewrites HTML responses to inject `<base href>` and normalize absolute paths (`/foo` → `/dashboard/.../embed/foo`)

WebSocket upgrades for the embedded dashboard are handled by a companion server on a
dedicated port (see `src/lib/services/embedWsProxy.ts`).

**Security:** The embed proxy routes are classified under `LOCAL_ONLY_API_PREFIXES`
and can only be reached from loopback. An attacker who obtains a JWT via a
Cloudflare/Ngrok tunnel cannot proxy into embedded services.

---

## 5. Security

### LOCAL_ONLY enforcement (hard rule #17)

All routes under `/api/services/` and `/dashboard/providers/services/*/embed/` are
classified as LOCAL_ONLY in `src/server/authz/routeGuard.ts`. The loopback check
runs unconditionally before any auth branch:

```
request arrives
  → isLocalOnlyPath(path)?
      → non-loopback → 403 LOCAL_ONLY (always, before auth check)
      → loopback    → fall through to normal auth
```

This prevents a leaked JWT (e.g., via a tunnel) from triggering `npm install` or
process spawning. See `docs/security/ROUTE_GUARD_TIERS.md` for the full tier
matrix.

### API key injection

9Router and Mux require an API key/bearer token for their own HTTP endpoints.
OmniRoute:

1. Generates a key via `crypto.randomBytes(32).toString("base64url")` with a
   service-specific prefix (`nr_` for 9Router, `mx_` for Mux).
2. Encrypts it at-rest using AES-256-GCM (same cipher used for provider credentials).
3. Decrypts and injects it as an environment variable at spawn time —
   `NINEROUTER_API_KEY` for 9Router, `MUX_SERVER_AUTH_TOKEN` for Mux (never a CLI
   flag, so the token never appears in `ps`/process listings).
4. Never returns the plaintext key in any HTTP response.

CLIProxyAPI does not require an injected key (it authenticates via the host's
existing CLI config).

### SSRF defense

The reverse HTTP proxy (`/dashboard/.../embed/[...path]`) is hardcoded to forward
only to `http://127.0.0.1:{port}`. It never follows redirects to non-loopback
destinations. The `ssrf-req-filter` library is used to reject any upstream URL that
resolves outside the loopback range.

### Shell safety (hard rule #13)

`npm install` is invoked via `execFile('npm', ['install', pkg, '--prefix', dir])` —
no template literals, no shell, no interpolation of external paths into the command
string. Runtime values (ports, API keys) are passed via the child's `env` object.

### Error sanitization (hard rule #12)

All error responses from `/api/services/*` go through `buildErrorBody()` or
`sanitizeErrorMessage()`. Raw `err.stack` and `err.message` are never returned
verbatim to the caller.

---

## 6. Adding a new embedded service

Follow these 8 steps. Read the existing implementations in `src/lib/services/installers/`
and `src/app/api/services/` as the canonical reference.

### Step 1 — Create the installer

Create `src/lib/services/installers/{name}.ts` modeled on `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // pick a free port

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Use `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` from `installers/utils.ts`
— never `execSync` or shell interpolation.

### Step 2 — Register in bootstrap

Add a `ServiceEntry` to the `SERVICES` array in `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false if no API key needed
}
```

Extend `buildSpawnArgsFactory()` to handle `cfg.tool === "myservice"`.

#### Pluggable provider-plugin contract (Phase 1, #7333)

`src/lib/services/providerPlugins/` introduces a `ServiceProviderPlugin` contract that
packages a backend's `bootstrap.ts` `ServiceEntry` fields and `serviceBackends.ts`
manifest-template fields into one object, instead of the same backend's shape being
expressed separately in two unrelated files. As of this writing **only `9router` is
migrated** — `bootstrap.ts` derives its `SERVICES[]` entry from
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`),
throwing a startup error if the plugin is ever missing. `cliproxy`, `mux`, and `bifrost`
remain on the pre-existing inline `SERVICES[]` literals unchanged.

`open-sse/config/providerPluginManifest.ts` also gained an additive
`createServiceBackendManifestEntry(pluginId, template)` helper that builds a well-formed
`ProviderPluginManifestEntry` from a `SERVICE_BACKEND_MANIFEST_TEMPLATE` entry — it is
**not** wired into any live request path yet (neither `generateProviderPluginManifestFromRegistry()`
nor `/v1/providers/[provider]/models`); that remains a follow-up once the contract is
proven for a second backend.

Deferred to follow-up PRs, tracked under issue #7333: migrating `cliproxyapi` through the
same registry, generalizing `mux`/`bifrost` into the `ServiceBackendPluginId` union,
folding the executor-routing special-casing (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) into the plugin contract, and wiring
`createServiceBackendManifestEntry()` into a live manifest/models code path.

### Step 3 — Add migration and DB seed

Ensure the service has a row in `version_manager` via a migration in
`src/lib/db/migrations/`. The row should have:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Step 4 — Create the 7 API endpoints

Under `src/app/api/services/{name}/`:

```
_lib.ts            getOrInitSupervisor() helper
install/route.ts   POST — calls installer.install()
start/route.ts     POST — calls supervisor.start()
stop/route.ts      POST — calls supervisor.stop()
restart/route.ts   POST — calls supervisor.restart()
update/route.ts    POST — calls installer.update()
status/route.ts    GET  — merges live + DB status
auto-start/route.ts POST — toggles auto_start flag
```

The shared `GET /api/services/[name]/logs` route is already wired — no changes
needed there.

Delegate all error responses through `createErrorResponse()` / `buildErrorBody()`.

### Step 5 — Add to LOCAL_ONLY_API_PREFIXES

In `src/server/authz/routeGuard.ts`, verify that `/api/services/` is already listed.
If you introduce a new prefix (e.g., `/api/tools/`), add it to both
`LOCAL_ONLY_API_PREFIXES` and, if it spawns processes, to `SPAWN_CAPABLE_PREFIXES`.
Add a test in `tests/unit/authz/routeGuard.test.ts`.

### Step 6 — Add the UI tab

Create `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Reuse shared components:

- `ServiceStatusCard` — live state + health badge
- `ServiceLifecycleButtons` — Start / Stop / Restart / Update
- `ServiceLogsPanel` — SSE log tail (connects to `/api/services/{name}/logs`)
- `ApiKeyCard` — key reveal + rotate (if `needsApiKey: true`)

Register the tab in `ServicesPageShell.tsx`.

### Step 7 — Add the provider entry (if the service is a routing target)

If the embedded service exposes an OpenAI-compatible `/v1/chat/completions` endpoint:

1. Add a provider entry in `src/shared/constants/providers.ts` with `isEmbeddedService: true`.
2. Create `open-sse/executors/{name}.ts` extending `BaseExecutor`. Re-lookup port and
   API key per-request (never cache in the constructor). Return a `503 service_not_running`
   response when the supervisor state is not `"running"`.
3. Register models in `open-sse/config/providerRegistry.ts` with the service prefix
   (e.g., `myservice/sub/model`). `modelSync.ts` will keep them updated.

### Step 8 — Document and test

1. Update `docs/frameworks/EMBEDDED-SERVICES.md` (this file) — add the service to the
   table in §1 and any new endpoints to §4.
2. Add unit tests in `tests/unit/services/` (lifecycle, installer, API shape).
3. Add integration test in `tests/integration/services/` (behind `RUN_SERVICES_INT=1`).
4. Update `docs/openapi.yaml` with the new endpoints.

---

## 7. Troubleshooting

### Service does not start

**Symptoms:** Start button returns 503, state stays `"error"` or `"starting"`.

**Checklist:**

1. Check `GET /api/services/{name}/logs` (or the Logs panel in the dashboard). Look
   for lines like `Error: ENOENT`, `address already in use`, or `Cannot find module`.
2. Verify `npm` is in PATH: `which npm` from the same user account that runs OmniRoute.
3. Verify the service is installed: check `GET /api/services/{name}/status` for
   `installedVersion`. If `null`, run install first.
4. Check `DATA_DIR/services/{name}/node_modules/` exists and is not empty.
5. Check the `lastError` field in the status response for the sanitized exit reason.

---

### Cold start is slow (> 10 s to reach `running`)

**Symptoms:** State stays `"starting"` for a long time before going to `"running"` or `"error"`.

**Explanation:** 9Router's cold start includes importing large dependency trees (DNS,
tunnel, MITM modules). Default health interval is 2 s with 3 attempts before the
supervisor declares a timeout (but continues polling).

**Fix:** The `healthIntervalMs` and the `waitForHealthy` timeout
(`healthIntervalMs * 3`) are configurable in `bootstrap.ts`. For services with longer
startup times, increase `healthIntervalMs` to 5000 and `stopTimeoutMs` to 30 000.

---

### Port collision (`EADDRINUSE`)

**Symptoms:** Logs show `address already in use :::20130`.

**Causes:**

- Another process is already using port 20130.
- A previous 9Router process was not fully stopped (zombie PID).

**Fix:**

1. Change the default port via `NINEROUTER_PORT` environment variable in `.env`.
2. Find and kill the conflicting process: `lsof -ti :20130 | xargs kill -9`.
3. The port is configurable per service in `bootstrap.ts` via the `port` field.

**Note:** 9Router defaults to port 20130 specifically to avoid colliding with
OmniRoute's default port 20128.

---

### Permission denied (EACCES) on install

**Symptoms:** Install returns 500, logs show `EACCES` or `permission denied`.

**Causes:**

- `DATA_DIR` or its parent is not writable by the OmniRoute process.
- Running inside Docker rootless without write access to the mapped volume.

**Fix:**

1. Check `DATA_DIR` (default: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Ensure the OmniRoute process user owns the directory: `chown -R $USER ~/.omniroute/`
3. In Docker, ensure the volume mount has the correct permissions for the container user.

---

### Update fails (`npm install` timeout or network error)

**Symptoms:** Update returns 500 with `InstallError`, logs show network timeout.

**Checklist:**

1. Confirm npm registry is reachable: `npm ping`.
2. Check for corporate proxy: `npm config get proxy`, `npm config get https-proxy`.
3. Try the install manually: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. If behind an air-gap, pre-download the tarball and use `npm install /path/to/tarball.tgz`.

---

### Service shows `"error"` state immediately after start (fast crash)

**Symptoms:** State transitions from `"starting"` to `"error"` in under 5 seconds.
`lastError` shows `"Fast crash (exited with code 1)"`.

**Checklist:**

1. Read the full log tail: `GET /api/services/{name}/logs?tail=500`.
2. Common cause: missing environment variables expected by the service.
3. For 9Router: verify `NINEROUTER_DISABLE_MITM=true` and
   `NINEROUTER_DISABLE_TUNNEL=true` are in the env passed at spawn (see
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. FAQ

**Q: Can I expose the embedded services endpoints to non-loopback clients?**

No. The LOCAL_ONLY tier is intentional (hard rule #17). Routes that can invoke
`npm install` or spawn `node` processes must not be reachable from non-loopback
traffic, because a leaked JWT via a tunnel (Cloudflare, Ngrok, Tailscale) would
otherwise allow arbitrary process spawning. There is no opt-out carve-out for
`/api/services/` — unlike `/api/mcp/`, it is excluded from the manage-scope bypass
list. See `docs/security/ROUTE_GUARD_TIERS.md`.

---

**Q: Will 9Router and CLIProxyAPI be available in production/cloud deployments?**

Yes. Both services follow the same local-first model as OmniRoute itself. They run
on the same machine and communicate over loopback. "Production" here means the VPS
or local server where OmniRoute is deployed, not a remote cloud provider.

---

**Q: How do I debug the supervisor?**

1. Tail the SSE log stream: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Check structured logs in OmniRoute's pino output filtered by
   `service:supervisor` namespace.
3. Inspect the DB row: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Use `GET /api/services/9router/status` to see the current live state, PID, health,
   and `lastError` in one call.

---

**Q: The supervisor shows `health: "degraded"` or `health: "unknown"` but state is `"running"`. Is that a problem?**

`"degraded"` means the health probe returned a non-200 response. `"unknown"` means no
probe has completed yet (race with first poll). Both are transient during startup.
If health stays `"degraded"` for more than `healthIntervalMs * 3` ms after
`"running"`, the embedded service is running but its HTTP API is not responding. Check
whether the port is correct in the status response and whether the service is actually
listening on that port.

---

**Q: Can I change the 9Router API key without a full restart?**

No. The API key is passed to 9Router via an environment variable at spawn time.
Environment variables cannot be changed in a running process. `POST .../rotate-key`
automatically stops and restarts the service to apply the new key. The key rotation
takes effect within the service's `stopTimeoutMs` (default 15 s) plus its startup
time.

---

**Q: What is the ring buffer limit and what happens when it fills?**

Each service has a dedicated 5 MB ring buffer. When the buffer is full, the oldest
log lines are evicted to make room for new ones. The SSE `snapshot` event returns
the most recent lines within the `tail` limit. Logs are not persisted to disk unless
`logsBufferPath` is set in the DB row.

---

## See also

- `docs/security/ROUTE_GUARD_TIERS.md` — LOCAL_ONLY tier details
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 Embedded Services module mapping
- `docs/architecture/ARCHITECTURE.md` — system-level context
- `docs/openapi.yaml` — machine-readable endpoint definitions
- `CLAUDE.md` §"Adding a New Embedded Service" — quick-reference checklist
