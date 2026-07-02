---
title: "Native Router Backend Migration Plan"
version: 3.8.44
lastUpdated: 2026-07-02
---

> **Status:** Proposed · **Context:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670) ·
> **Related:** [Router Backends & Embedded Services](ROUTER_BACKENDS.md)

Issue #5670 tracks moving OmniRoute's hot routing path toward a native backend
without losing the TypeScript surface that makes providers, adapters, dashboard
state, and release operations easy to evolve. This plan defines the target
responsibilities, migration gates, benchmark targets, rollback model, and how
CLIProxyAPI/VibeProxy-style adapters fit during and after the migration.

## Target shape

The migration keeps `ts` as the contract owner and introduces native execution
behind the existing router-backend registry. Native code is not a new product
surface; it is an implementation behind the same OpenAI-compatible request,
provider, telemetry, quota, and guardrail contracts.

| Layer                                | Owner                              | Responsibility                                                                                                                                                                           | Non-goals                                                                                               |
| ------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| TypeScript                           | Product contract and orchestration | API validation, authz, provider manifests, dashboard state, env parsing, feature flags, quota/cost policy, fallback decisions, adapter registration, telemetry shape, and release gating | Rewriting low-level streaming, scoring, or retry loops once native parity is proven                     |
| Go/Bifrost                           | First native backend candidate     | Provider dispatch, connection pooling, streaming relay, retry/cooldown primitives, model sync where supported, and manifest-driven eligibility                                           | Owning OmniRoute's public API or dashboard schema                                                       |
| Rust/Zig/Mojo                        | Future specialized native modules  | Optional hot-path kernels such as scoring, compression primitives, SSE parsing, transport shims, or sandboxed provider plugins after the Go/Bifrost contract is stable                   | Replacing the registry before measurable Bifrost parity exists                                          |
| CLIProxyAPI/VibeProxy-style adapters | Provider bridge layer              | External or supervised provider adapters consumed by the native pipeline through a stable provider-connection contract                                                                   | Becoming relay routing backends unless they implement the full backend contract and pass the same gates |

## Backend boundaries

Native router work must preserve the two-axis model from the router backends ADR:

- **Relay backend:** `ts`, `bifrost`, or `auto` selects which engine dispatches a
  relay request.
- **Embedded/external service:** CLIProxyAPI, 9Router, VibeProxy-compatible
  bridges, and similar tools expose provider connections consumed by whichever
  relay backend is active.

The native backend cannot special-case sidecars by process name. It reads the
same provider manifest contract as TypeScript, then treats sidecars as provider
connections with declared capabilities such as `chat`, `streaming`, `tools`,
`vision`, `oauth-backed`, and `model-sync`.

## Migration phases

### Phase 0: Contract freeze

- Keep the TypeScript router as the reference implementation.
- Treat `domain/routing/routerBackends.ts`, provider manifests, OpenAPI request
  shapes, and telemetry events as compatibility boundaries.
- Add fixture coverage for request normalization, streaming chunks, tool calls,
  fallback decisions, quota accounting, and sanitized error bodies before native
  behavior is accepted.
- Require every candidate native path to produce a comparable trace ID, backend
  ID, provider ID, model ID, retry count, latency, token estimate, and final
  outcome.

### Phase 1: Shadow mode

- Run Bifrost behind `auto` only for manifest-eligible providers.
- Mirror eligible requests in non-mutating shadow mode where provider terms and
  credentials permit it; otherwise replay sanitized fixtures offline.
- Compare normalized responses, stream framing, error categories, retry behavior,
  and quota/cost accounting against the TypeScript path.
- Keep user-visible responses served by TypeScript unless an explicit local
  developer flag opts into Bifrost serving.

### Phase 2: Canary serving

- Allow Bifrost to serve a small allowlist of low-risk providers and models.
- Gate serving by provider manifest eligibility, feature flag, backend health,
  cooldown state, and benchmark budget.
- Keep TypeScript fallback enabled for `auto`; forced `bifrost` mode may fail
  hard with `502` so operators can test failure behavior explicitly.
- Exclude providers with incomplete tool-call parity, nonstandard stream
  framing, or fragile auth refresh until fixtures prove equivalence.

### Phase 3: Default for eligible providers

- Make `auto` prefer Bifrost for eligible providers after canary metrics stay
  inside budget for at least two release trains.
- Keep TypeScript as the default for unsupported providers, dashboard/API
  orchestration, provider manifests, quota policy, and admin/service routes.
- Publish a compatibility matrix listing provider families, supported features,
  known exclusions, and rollback flags.

### Phase 4: Specialized native modules

- Consider Rust, Zig, or Mojo modules only after the Bifrost contract is stable
  and profiling identifies a narrow bottleneck.
- Require a stable FFI or process boundary, deterministic fixtures, packaging
  support for release platforms, and a TypeScript fallback.
- Prefer Rust for memory-safe parsing/transport kernels, Zig for small static
  shims where toolchain cost is acceptable, and Mojo only for isolated compute
  experiments until its packaging and deployment story matches project needs.

## Migration gates

Each phase advances only when these gates pass:

| Gate            | Required evidence                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Contract parity | Fixture diff shows equivalent normalized request, stream, tool-call, usage, and sanitized error shapes for the targeted provider set                         |
| Safety          | No bypass of authz, local-only service guards, public credential handling, egress policy, or error sanitization                                              |
| Observability   | Native path emits the same request IDs, backend/provider/model labels, latency buckets, retry/cooldown state, and failure categories as TypeScript           |
| Operability     | Health checks, startup failure handling, logs, version reporting, and dashboard status match the service supervisor contract where the backend is supervised |
| Packaging       | Supported release platforms install or skip the native backend predictably, with clear diagnostics and no broken default install                             |
| Rollback        | A documented flag or env override returns traffic to TypeScript without data migration, rebuild, or dashboard schema change                                  |

## Benchmark targets

Benchmarks compare TypeScript and native paths with the same provider fixtures,
same local network profile, and both streaming and non-streaming requests.

| Metric                           | Target before canary                                                | Target before default                                                                |
| -------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Streaming first-token overhead   | Native p95 no worse than TypeScript + 10 ms                         | Native p95 at least 15% faster than TypeScript or no worse with materially lower CPU |
| End-to-end relay latency         | Native p95 no worse than TypeScript + 5%                            | Native p95 at least 10% faster for eligible providers                                |
| CPU per 1,000 streamed chunks    | No worse than TypeScript                                            | At least 20% lower than TypeScript                                                   |
| Memory at 100 concurrent streams | No unbounded growth over 15 minutes                                 | At least 15% lower RSS or equivalent RSS with better latency                         |
| Stream correctness               | 100% fixture parity for chunk order and terminal usage/error frames | 100% fixture parity plus live canary error budget compliance                         |
| Fallback correctness             | `auto` fallback succeeds for induced native failures                | No regression in TypeScript fallback success rate                                    |

If an upstream provider dominates latency, the target can be met through lower
CPU, lower memory, or better fallback correctness rather than raw wall-clock
latency, but the exception must be recorded in the compatibility matrix.

## Rollback plan

Rollback must be operational, not a code revert:

- Set `OMNIROUTE_RELAY_BACKEND=ts` or the equivalent release flag to force the
  TypeScript backend.
- Disable manifest eligibility for the affected provider family if only one
  provider class regresses.
- Keep Bifrost cooldown and health state visible in telemetry so `auto` can fall
  back before operators change flags.
- Preserve TypeScript request normalization, quota accounting, and adapter
  dispatch as the long-term fallback path.
- Avoid native-only migrations of user data, provider credentials, dashboard
  settings, or service rows until at least one full release after native default.

Rollback is considered complete when new relay requests use TypeScript, in-flight
native streams either finish or fail with sanitized errors, and dashboard/service
state no longer advertises the native backend as preferred for the affected
scope.

## Adapter fit

CLIProxyAPI, VibeProxy-compatible bridges, and similar adapters stay below the
relay-backend line unless they implement the full backend contract. Their target
contract is:

- Declare capabilities through provider manifests instead of hard-coded router
  branches.
- Expose OpenAI-compatible chat/model surfaces or a thin adapter that normalizes
  to them.
- Provide health checks suitable for supervised or external lifecycle modes.
- Return errors that can be mapped into OmniRoute's sanitized error taxonomy.
- Support streaming fixtures so TypeScript and native backends can verify the
  same adapter behavior.

This lets the TypeScript backend, Bifrost, and any future Rust/Zig/Mojo module
consume the same adapter catalog. A sidecar graduates to a relay backend only
when it can own dispatch, fallback, observability, and rollback for an entire
request path, not merely proxy one provider family.

## PR acceptance checklist

- The change references #5670 and does not modify runtime code.
- The plan is indexed from `docs/README.md` and the local docs metadata.
- Responsibilities are explicit for TypeScript, Go/Bifrost, Rust/Zig/Mojo, and
  CLIProxyAPI/VibeProxy-style adapters.
- Migration gates include parity, safety, observability, operability, packaging,
  and rollback evidence.
- Benchmark targets include latency, CPU, memory, stream correctness, and
  fallback correctness.
