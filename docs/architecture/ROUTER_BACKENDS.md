# Router Backends & Embedded Services — architecture contract (ADR)

> **Status:** Accepted · **Context:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Contract:** `src/domain/routing/routerBackends.ts`

This ADR pins down how `ts` (native), `bifrost`, `cliproxy`, `9router`, and
VibeProxy-compatible engines relate to each other, so contributors stop
conflating two things that are architecturally distinct. It documents the typed
registry introduced by the router-backend-registry work as the single source of
truth for that model.

## The core distinction — two orthogonal axes

An engine's role is described by **two independent axes**, encoded together in the
registry's `RouterBackendDefinition`:

1. **Lifecycle** (`RouterBackendLifecycle`) — _how the engine runs_:
   - `in-process` — runs inside the OmniRoute Node process (the native TS pipeline).
   - `supervised` — a local child process OmniRoute installs/starts/stops/health-checks
     via `ServiceSupervisor`, then consumes as a provider connection.
   - `external` — an HTTP endpoint OmniRoute dispatches to but does **not** manage
     (configured by an env base URL).
   - `disabled` — registered but not selectable.
2. **Selection axis** (relay routing backend) — _whether the relay dispatches to it_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` in
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

The mistake to avoid: treating "embedded service" and "routing backend" as one
list. They are not. A `supervised` engine (9router/cliproxy) is a **provider
connection consumed by the native pipeline**, not an alternate relay dispatch
backend. `bifrost` is the reverse — a relay dispatch backend that (historically)
was `external`-only.

## The registry — single source of truth

`src/domain/routing/routerBackends.ts` declares every engine once, with its
lifecycle, capabilities, service identity, default port, health config, and
telemetry support. Consumers look engines up via `getRouterBackend(id)`,
`listRouterBackends()`, and `listRouterBackendsByCapability(cap)` instead of
special-casing each sidecar.

| Backend     | Lifecycle    | Service (axis A) | Relay backend (axis B) | Health        | Default port |
| ----------- | ------------ | ---------------- | ---------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —                | `ts` (native)          | —             | —            |
| `bifrost`   | `external`¹  | —¹               | `bifrost` / `auto`     | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`       | — (provider)           | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`        | — (provider)           | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —                | — (provider adapter)   | `/v1/models`  | —            |

¹ Bifrost's promotion to a `supervised` embedded service (installable/startable
from `/api/services/bifrost/`) is tracked in
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); until it merges,
Bifrost is `external`-only (reachable solely via `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) let callers
filter by what an engine can actually do rather than hard-coding per-id branches.

## Axis A — embedded services (supervised process side)

- **Registry of supervised processes:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (today: `9router`, `cliproxy`).
- **Lifecycle owner:** `src/lib/services/ServiceSupervisor.ts` — `start()` spawns the
  child, gates on `waitForHealthy()`, taps stdout/stderr into a ring buffer;
  `stop()` SIGTERM→SIGKILL; all serialized under a lock.
- **State union** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, plus an
  orthogonal `HealthState = healthy | unhealthy | unknown`.
- **Why a separate process (not an in-proc SDK)?** Process isolation is what makes
  install/start/stop/health/logs independently controllable per sidecar and lets the
  loopback spawn-guard apply. Modeling an in-proc adapter is future work — the
  `native-hot-path` capability flag is where that would be expressed.

### Lifecycle route contract (`/api/services/<tool>/…`)

Status codes are **state/verb/path-specific by design** — this is the contract, not
inconsistency:

| Call                         | Condition                       | Status                               |
| ---------------------------- | ------------------------------- | ------------------------------------ |
| `POST .../start`             | service `not_installed`         | **409** (precondition)               |
| `POST .../stop`              | already stopped                 | **200** (idempotent no-op)           |
| `GET .../status`             | OK                              | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | spawn failure                   | **503** (transient)                  |
| `GET .../status`, `.../stop` | uncaught error                  | **500**                              |
| `GET /api/services/<x>/logs` | unknown tool `<x>`              | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | missing `X-Reveal-Confirm: yes` | **403** (9router only)               |
| **any** `/api/services/*`    | caller not loopback/private-LAN | **403 LOCAL_ONLY**                   |

All error bodies are shaped by `createErrorResponse()` →
`{ error: { message, type }, requestId }`, where `type` is derived from the status
(`500→server_error`, `404→not_found`, `409→conflict`, else `invalid_request`) and is
the machine-actionable discriminator. Messages are pre-sanitized
(`sanitizeErrorMessage()`, Hard Rule #12).

**The loopback guard** is the most common source of a `403`: `/api/services/` is in
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) and
`src/server/authz/policies/management.ts` rejects any non-loopback / non-private-LAN
caller **before auth**, because these routes spawn child processes (Hard Rules 15
and 17). Reaching them through a public tunnel is `403` by design.

## Axis B — relay routing backend (dispatch side)

Only the relay proxy path `/api/v1/relay/chat/completions` selects a dispatch
backend; the main `/api/v1/chat/completions` surface never consults
`routingBackend.ts`.

- **Selection** (`resolveRelayRoutingBackend`): a single global env toggle —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  If unset, `auto` when Bifrost is configured+enabled, else `ts`.
- **Behavior:**
  - `bifrost` (forced): Bifrost failure → hard `502`, no fallback.
  - `auto`: try Bifrost, on failure/cooldown silently fall through to native.
  - `ts` / post-fallback: the native `open-sse` translator/executor pipeline.
- **Cooldown:** per-`baseUrl` failure cooldown in `bifrostCooldown.ts`.

Selection is **all-or-nothing at the relay level today** — there is no per-provider
or per-request engine swap on `release/v3.8.43`. The per-request gate is being added
by the sidecar-manifest work
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
which lets `auto` route only manifest-eligible providers through Bifrost.

## Dashboard integration

The services dashboard polls `GET /api/services/<tool>/status` every 5s via
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
returning `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. There is no shared availability-context provider —
each component calls the hook per tool. On `!res.ok` the hook currently surfaces a
bare `HTTP <status>`; mapping the `error.type` field to a human explanation is a
tracked UX improvement, not a contract change.

## Consequences

- New engines register once in `ROUTER_BACKENDS`; consumers gain them via capability
  queries without new per-id branches.
- "Is this a service or a routing backend?" is answered by the `lifecycle` field, not
  by which list an id happens to appear in.
- The Bifrost supervision (#5817) and native hot-path migration (#5670) build on this
  shared contract instead of special-casing each sidecar.
