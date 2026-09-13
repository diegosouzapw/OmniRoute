---
title: "ADR-031: Bifrost Relay Architecture"
version: 1.0.0
status: Accepted
date: 2026-09-12
context:
  - "#5670"
  - "#5817"
  - "#5868"
  - "#5869"
  - "#5870"
contract: "domain/routing/routerBackends.ts"
supersedes: null
---

# ADR-031: Bifrost Relay Architecture

## Status

Accepted

## Context

OmniRoute's relay proxy at `/api/v1/relay/chat/completions` handles the hot path for
LLM request routing. The TypeScript `handleChat` pipeline in `open-sse` provides full
functionality (provider negotiation, SSE translation, tool execution, guardrails) but
suffers at scale:

- **Latency**: Node.js V8 stack-walking adds 40-60% overhead vs a native Go HTTP handler
  for the same request path.
- **Memory**: Each concurrent request carries ~30 MB of handler closures through the
  TypeScript pipeline.
- **Streaming**: Node `ReadableStream` conversion adds latency to SSE chunked encoding;
  Go's `net/http` handles this natively with zero-copy pipes.
- **Concurrency ceiling**: A single Node handler cannot saturate a 10Gb NIC, while a Go
  process can reach ~80k req/s on equivalent hardware.

Meanwhile, the upstream project [maximhq/bifrost](https://github.com/maximhq/bifrost)
provides a high-performance, Go-based LLM gateway (Apache-2.0) with 23+ provider
integrations, load balancing, fallbacks, semantic caching, and enterprise governance
features. Bifrost is actively maintained (7,056 commits, 8,003 stars, coordinated
multi-plugin releases, security tooling with Snyk).

The problem was twofold:

1. **Performance**: The relay hot path needed to move off Node.js for latency-sensitive
   workloads.
2. **Integration model**: Bifrost needed to be consumable by OmniRoute without duplicating
   security logic (auth, rate limiting, injection guards) or coupling OmniRoute's Node
   lifecycle to Bifrost's Go binary.

Prior to this decision, Bifrost was only reachable via an explicit `BIFROST_BASE_URL`
environment variable — an `external` lifecycle model where OmniRoute had no control over
the Bifrost process. This meant operators had to separately install, start, monitor, and
restart Bifrost outside OmniRoute.

## Decision

We adopt a **supervised Go sidecar relay pattern** with three architectural pillars:

### 1. Two Orthogonal Axes (from ROUTER_BACKENDS.md ADR)

Every routing engine is described by two independent axes:

- **Lifecycle** (`RouterBackendLifecycle`): _how_ the engine runs
  - `in-process` — inside the OmniRoute Node process (the native TS pipeline).
  - `supervised` — a local child process OmniRoute installs/starts/stops/health-checks
    via `ServiceSupervisor`, then consumes as a provider connection.
  - `external` — an HTTP endpoint OmniRoute dispatches to but does not manage.
  - `disabled` — registered but not selectable.
- **Selection axis** (relay routing backend): _whether_ the relay dispatches to it
  - `RelayRoutingBackend = "ts" | "bifrost" | "auto"` in
    `routingBackend.ts`.

Bifrost starts as `external`-only (reachable solely via `BIFROST_BASE_URL`) and is
promoted to `supervised` with the service lifecycle routes
(`/api/services/bifrost/start|stop|status|restart`).

### 2. ServiceSupervisor Lifecycle Management

The `ServiceSupervisor` class (`src/lib/services/ServiceSupervisor.ts`) provides a
generic process lifecycle manager for embedded services:

- **Spawning**: `start()` spawns the child process via `spawn()` with `windowsHide: true`,
  gates on `waitForHealthy()`, and pipes stdout/stderr into a `RingBuffer`.
- **Health monitoring**: `HealthChecker` polls the health endpoint at configurable
  intervals. Consecutive failures transition the service to `error` state.
- **Port probing**: `probeBeforeSpawn` (opt-in per `ServiceConfig`) probes the port
  before spawning. A healthy prior instance is adopted; a held-but-unhealthy port yields
  a clear error instead of `EADDRINUSE`.
- **Shutdown**: `stop()` sends SIGTERM with a timeout, then SIGKILL. All operations are
  serialized under a lock. `SIGINT`/`SIGTERM` handlers drive every supervisor to
  completion before exit.
- **Adoption**: When `probeBeforeSpawn` detects a running Bifrost on the configured port,
  the supervisor adopts it rather than crashing. Adopted processes have no piped
  stdout/stderr until replaced.

The supervisor is registered in a singleton registry (`src/lib/services/registry.ts`) and
lazily initialized on demand via `getOrInitSupervisor()` in the Bifrost API routes.

### 3. Security Boundary: Auth in Node, Routing in Go

Auth, rate limiting, and injection guards **remain in the Node.js layer** — moving these
into the Go sidecar would duplicate security logic and weaken the audit surface. Only the
LLM routing/execution moves to Go:

```
Request → Node.js (auth + rate limit + injection guard + model allowlist)
         → Go Bifrost sidecar (provider routing + LLM execution)
         → Response (strip sensitive headers, record usage)
```

This boundary is explicit in the route contract:

- `src/app/api/v1/relay/chat/completions/bifrost/route.ts` — the Go sidecar proxy route.
  Handles auth, rate limiting, injection guard, model allowlist, then forwards to
  `BIFROST_BASE_URL/v1/chat/completions`.
- `src/app/api/v1/relay/chat/completions/route.ts` — the TS relay fallback. Auth,
  rate limiting, injection guard, then forwards to `handleChat()`.

### Routing Decision Flow

The relay route consults `resolveRelayRoutingBackend()` to pick a dispatch strategy:

1. **`ts` (forced)**: Always use the native TS pipeline. Bifrost is never consulted.
2. **`bifrost` (forced)**: Always try Bifrost. Failure → hard 502, no fallback.
3. **`auto`**: Try Bifrost. On failure/cooldown, silently fall through to the TS native
   pipeline. Fallback reason is signaled via `X-Routing-Fallback` and
   `X-Routing-Fallback-Reason` headers.

Per-request gating (`shouldTryBifrostForRequest`) checks the provider plugin manifest
for `sidecar` eligibility — only manifest-eligible providers route through Bifrost in
`auto` mode.

### Cooldown Mechanism

`bifrostCooldown.ts` implements per-`baseUrl` failure cooldowns:

- On timeout/error, `recordBifrostFailure()` sets a cooldown (default 5s, configurable
  via `OMNIROUTE_BIFROST_FAILURE_COOLDOWN_MS`).
- During cooldown, `auto` mode skips Bifrost and falls through to TS immediately.
- On success, `clearBifrostFailure()` removes the cooldown.
- Setting cooldown to 0 disables the mechanism entirely.

### Fallback Signaling

When Bifrost is unavailable, both routes signal the TS fallback path via the
`X-Bifrost-Fallback` response header, pointing callers to
`/api/v1/relay/chat/completions`. The caller retries against that path; the route does
not proxy the fallback itself (it would defeat the point of skipping the Node handler).

## Alternatives Considered

### Alternative 1: In-Process SDK Embedding

Embed Bifrost as a Go library compiled into the Node process via N-API or WASM.

- **Rejected because**: Process isolation is what makes install/start/stop/health/logs
  independently controllable per sidecar. An in-process SDK couples the Bifrost lifecycle
  to OmniRoute's Node process, makes upgrades harder (recompile + restart), and prevents
  the loopback spawn-guard from applying. The `native-hot-path` capability flag in the
  registry is where in-process would be expressed if adopted later.

### Alternative 2: Direct Provider Connections (No Gateway)

Skip Bifrost entirely and connect OmniRoute directly to each LLM provider.

- **Rejected because**: This is what the TS pipeline already does. The value of Bifrost
  is the unified gateway pattern: provider-specific retries, load balancing, semantic
  caching, cost governance, and 23+ provider integrations maintained by an active
  upstream project. Reimplementing these in TypeScript would be a maintenance burden with
  no performance benefit.

### Alternative 3: External-Only (No Supervision)

Keep Bifrost as `external`-only, requiring operators to manage it independently.

- **Rejected because**: This was the prior state and created operational friction.
  Operators had to separately install, start, monitor, and restart Bifrost. The supervised
  pattern lets OmniRoute own the full lifecycle — install from npm, start/stop via API,
  health-check with automatic error recovery, and dashboard integration for visibility.

## Consequences

### Positive

- **Performance**: Relay hot path moves off Node.js. Bifrost handles provider routing,
  SSE encoding, and concurrency in Go. The TS pipeline remains available as fallback.
- **Operational simplicity**: Bifrost is installable/startable from the OmniRoute
  dashboard. Health checks, log capture, and auto-restart are handled by the supervisor.
- **Security boundary**: Auth, rate limiting, and injection guards stay in Node.js — a
  single audit surface. Only LLM routing moves to Go.
- **Graceful degradation**: The `auto` routing mode with cooldown provides automatic
  fallback to the TS pipeline when Bifrost is unavailable.
- **Extensibility**: New supervised services (9router, cliproxy) reuse the same
  `ServiceSupervisor` pattern. The registry + capability flags mean new engines gain
  discoverability without per-id branches.

### Negative

- **Process management complexity**: The supervisor adds a process lifecycle layer
  (spawn, health, adoption, shutdown) that must be correct across platforms (Linux,
  macOS, Windows).
- **Dual code paths**: Two parallel relay routes (Bifrost sidecar + TS native) must
  maintain behavioral parity for auth, rate limiting, and error handling.
- **Port management**: The `probeBeforeSpawn` adoption mechanism adds complexity to
  avoid `EADDRINUSE` when prior instances linger.
- **Cooldown tuning**: The default 5s cooldown may need tuning per deployment. Too short
  → rapid fallback oscillation; too long → delayed recovery.

### Risks

- **Upstream dependency**: Bifrost is a critical dependency. The upstream health audit
  (2026-09-12) found it HEALTHY (active commits, security tooling, coordinated releases),
  but a major upstream breaking change or abandonment would require either forking or
  reverting to TS-only.
- **Security surface**: The Go sidecar process runs locally and trusts the Node.js auth
  boundary. A compromise of the Bifrost process could bypass auth checks (mitigated by
  the loopback-only network binding and `LOCAL_ONLY_API_PREFIXES`).

## References

- [maximhq/bifrost](https://github.com/maximhq/bifrost) — upstream Bifrost repository
- `src/lib/services/ServiceSupervisor.ts` — generic supervisor implementation
- `src/lib/services/registry.ts` — singleton supervisor registry
- `src/lib/services/types.ts` — `ServiceConfig`, `ServiceState`, `ServiceStatus`
- `src/lib/services/installers/bifrost.ts` — Bifrost install/spawn configuration
- `src/app/api/services/bifrost/_lib.ts` — supervisor initialization helper
- `src/app/api/v1/relay/chat/completions/routingBackend.ts` — routing decision logic
- `src/app/api/v1/relay/chat/completions/bifrost/route.ts` — Go sidecar proxy route
- `src/app/api/v1/relay/chat/completions/route.ts` — TS relay fallback route
- `src/app/api/v1/relay/chat/completions/bifrostCooldown.ts` — failure cooldown
- `docs/architecture/ROUTER_BACKENDS.md` — router backends ADR (lifecycle + selection axes)
- Issue #5670 — Bifrost integration tracking
- Issue #5817 — Bifrost supervision promotion
- PR #5868 — typed router-backend registry
- PR #5869 — provider plugin manifest
- PR #5870 — per-request Bifrost gating
