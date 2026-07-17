# ADR-052 — Router plugin SDK spec

- **Status:** Proposed — 2026-06-20 (paired with ADR-050; takes effect on Option B adoption)
- **Date:** 2026-06-20
- **Decision:** @KooshaPari (pending)
- **Plan:** [`plans/2026-06-20-v11-dag-router-rebuild.md`](../../plans/2026-06-20-v11-dag-router-rebuild.md) §L2.5 + §L3
- **Wave:** v11 L5 — Documentation / Governance (T5.4)
- **Paired with:** ADR-050 (Router rebuild: Option B); ADR-051 (Bifrost as library)
- **Repo:** `phenotype-router/sdk` (the contract this ADR defines)

## Context

The Phenotype router currently has 9 plugins (`intelligentrouter`,
`smartfallback`, `learning`, `promptadapter`, `contextfolding`, `voyage`,
`researchintel`, `contentsafety`, `toolrouter`) plus a planned `vector-store`
slot. They were authored as wrappers around Bifrost's plugin SDK; their
interfaces are heterogeneous (per-plugin config shapes, per-plugin span
schemas, per-plugin lifecycle hooks) — a fragmentation that blocks
hot-reload, blocks reasoning-model awareness, and blocks OTel-native
observability (research §4, §6; v11 plan §L2.5).

The v11 rebuild (ADR-050) requires a **first-class plugin SDK** with three
properties that no current plugin enjoys:

1. **A single Go interface** every plugin implements, regardless of
   concern (cost, safety, fallback, learning, rerank, vector-store).
2. **A hot-reload protocol** so a plugin swap does not require a router
   restart — required for the 84-task L6 side-DAG filler (v11 plan §L6)
   and for safe iteration in prod.
3. **An OTel span contract** so every plugin emits spans in a uniform
   shape that `pheno-tracing` (ADR-036) can aggregate, dashboard, and
   alert on without per-plugin custom code.

This ADR defines the SDK surface that ADR-050 §Decision and ADR-051 §Decision
both depend on. It is **the contract** plugins implement against and the
router loads against.

## Decision

`phenotype-router/sdk` ships three artifacts: the **Plugin interface**, the
**hot-reload protocol**, and the **OTel span contract**. Each is normative:
any plugin that diverges from the contract does not load.

### 1. The Plugin interface (Go)

```go
// Package sdk is the contract every phenotype-router plugin implements.
// Plugins are loaded into phenotype-router at startup or via hot-reload
// (see §2). Plugins MUST NOT import bifrost/core directly; they call into
// the router via the Transport port (see ADR-051 §4 dependency rules).
package sdk

import (
    "context"

    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/trace"

    "phenotype-router/sdk/transport"
    "phenotype-router/sdk/types"
)

// Plugin is the contract every router plugin implements.
//
// Concurrency: Plugin methods MAY be called concurrently from multiple
// goroutines. Implementations MUST be safe for concurrent use.
//
// Lifecycle: see Lifecycle hooks below.
type Plugin interface {
    // Metadata is called once at load time. It MUST return a stable
    // identity (Name, Version) used for hot-reload diffing (§2) and
    // span attribution (§3).
    Metadata() Metadata

    // Init is called once after Metadata. It receives a RouterContext
    // for emitting spans, reading config, and acquiring a transport
    // port. Init MUST be idempotent: a re-init on hot-reload MUST
    // produce the same observable state as the original Init.
    Init(ctx context.Context, rc RouterContext) error

    // Close is called on shutdown OR before a hot-reload swap. Plugins
    // MUST release any per-process resources (goroutines, file handles,
    // network connections) here. Plugins MUST NOT hold shared mutable
    // state across Close + re-Init — state is per-request only.
    Close(ctx context.Context) error

    // Phase returns the routing phase this plugin participates in.
    // The router invokes plugins in phase order (see §1.1).
    Phase() Phase

    // Apply is the per-request decision hook. The router calls Apply
    // once per request that flows through this plugin's phase.
    //
    // Contract:
    //   - Apply MUST be cheap (no network I/O in the hot path unless
    //     explicitly opted in via the Capabilities flag).
    //   - Apply MAY return a Decision that alters request flow
    //     (provider choice, prompt rewrite, abort, etc.).
    //   - Apply MUST emit exactly one span per invocation (see §3).
    //   - Apply MUST honor ctx cancellation.
    Apply(ctx context.Context, req *types.Request) (*types.Decision, error)
}

// Metadata identifies a plugin and declares its capabilities.
type Metadata struct {
    Name         string            // stable, kebab-case; e.g. "smart-fallback"
    Version      string            // semver; e.g. "1.4.2"
    Phase        Phase             // see Phase enum
    Capabilities Capabilities      // bitmask; see Capabilities enum
    Labels       map[string]string // free-form (e.g. "domain": "research")
}

// Phase declares where in the routing pipeline a plugin runs.
type Phase int

const (
    PhasePreRouting   Phase = iota // contentsafety (mandatory)
    PhaseProviderSelection         // intelligentrouter, smart-fallback
    PhaseRequestTransform          // prompt-adapter, context-folding
    PhaseToolSelection             // tool-router
    PhasePostRouting               // voyage (rerank), research-intel, learning
    PhaseObservability             // hooks into span emission only
)

// Capabilities declare optional behaviors a plugin opts into. Plugins
// that don't opt in MUST NOT perform those behaviors (the router may
// skip the plugin if a capability is required).
type Capabilities uint32

const (
    CapNetworkIO     Capabilities = 1 << iota // plugin makes outbound calls
    CapStateful                                // plugin maintains per-process state (rare)
    CapPreRoutingMandatory                     // must run in PhasePreRouting (contentsafety only)
    CapReasoningAware                          // plugin reasons about o1/o3-style tokens
)

// RouterContext is the surface a plugin sees of the router. It exposes
// only the SDK contract — plugins MUST NOT hold a RouterContext beyond
// the Init call.
type RouterContext interface {
    // Tracer returns the OTel tracer plugins MUST use for span emission.
    // See §3 for the span contract.
    Tracer() trace.Tracer

    // Transport returns the transport port plugins call into for
    // provider I/O. This is phenotype-router's wrapper around Bifrost
    // (per ADR-051 §4). Plugins MUST go through this port — they MUST
    // NOT import bifrost/core.
    Transport() transport.Port

    // Config returns the plugin's own config block (router.yaml keys
    // matching Metadata.Name).
    Config() Config

    // Logger returns a structured logger scoped to this plugin.
    Logger() Logger
}
```

#### 1.1 Phase ordering (router enforcement)

The router invokes plugins in this order. A plugin may only register for
**one** phase (the router rejects multi-phase plugins at load time):

```
inbound request
       │
       ▼
┌────────────────────┐
│ PhasePreRouting    │ ← contentsafety (CapPreRoutingMandatory)
│   (mandatory)      │
└─────────┬──────────┘
          │ Decision{Continue=true}
          ▼
┌────────────────────┐
│ PhaseProvider      │ ← intelligentrouter, smart-fallback, learning
│ Selection          │   (CostAware ordering; CapReasoningAware respected)
└─────────┬──────────┘
          │ Decision{Provider=..., Model=..., ...}
          ▼
┌────────────────────┐
│ PhaseRequest       │ ← prompt-adapter, context-folding
│ Transform          │
└─────────┬──────────┘
          │ Decision{TransformedPrompt=...}
          ▼
       provider call (via Transport port)
          │
          ▼
┌────────────────────┐
│ PhasePostRouting   │ ← voyage (rerank), research-intel
└─────────┬──────────┘
          │ Decision{SelectedResponse=...}
          ▼
       response to caller

(PhaseObservability plugins observe every span; they do not mutate flow.)
```

### 2. Hot-reload protocol

Hot-reload is **filesystem-watch + versioned-binary**. The router watches
the plugin directory (`$PHENOTYPE_ROUTER_PLUGIN_DIR`, default
`./plugins/`); a new `.so` file with a higher `Metadata.Version` triggers a
swap. The protocol is **state-preserving per-request, stateless across
swap**:

```
┌──────────────────────────────────────────────────────────────────┐
│ Hot-reload lifecycle                                              │
│                                                                  │
│  watcher fires (new .so detected)                                │
│         │                                                        │
│         ▼                                                        │
│  router: load new plugin (dlopen)                                │
│         │                                                        │
│         ▼                                                        │
│  router: call new.Metadata() — verify Name matches loaded        │
│         │                                                        │
│         ▼                                                        │
│  router: drain in-flight requests on the OLD plugin              │
│         │ (wait ≤ DrainTimeout, default 30s)                     │
│         ▼                                                        │
│  router: call old.Close(ctx)                                     │
│         │                                                        │
│         ▼                                                        │
│  router: call new.Init(ctx, RouterContext) — same context        │
│         │                                                        │
│         ▼                                                        │
│  router: atomically swap old ↔ new in plugin registry            │
│         │                                                        │
│         ▼                                                        │
│  new requests routed to new plugin                               │
└──────────────────────────────────────────────────────────────────┘
```

**Contract:**

| Rule | Enforcement |
|---|---|
| Plugin `Metadata.Name` MUST match across the swap | Router rejects the swap; old plugin stays loaded |
| Plugin `Metadata.Version` MUST be a strict semver increase | Same |
| Plugin state MUST be per-request only (no shared mutable state) | Enforced by `CapStateful` capability — plugins without this flag are restricted to request-scoped state |
| Drain timeout default 30s; configurable per-plugin via `Config()` | Router returns `ErrDrainTimeout` if exceeded; old plugin re-loaded |
| Hot-reload emits a router-level OTel span `phenotype.router.plugin.reload` with attributes `plugin.name`, `from.version`, `to.version`, `drain.ms` | See §3 |

**State rule rationale:** A plugin that maintains shared mutable state
across requests cannot be hot-reloaded safely — concurrent requests would
see two implementations of the state simultaneously. The `CapStateful`
flag is the explicit opt-in for plugins that need this (e.g., the online
`learning` plugin's reward model); such plugins are not hot-reloadable
without a router restart, and the router warns at load time.

### 3. OTel span contract

Every plugin `Apply` call emits **exactly one** span. The span name,
attributes, and events are normative; `pheno-tracing` (ADR-036) dashboards
depend on this contract.

```go
// SpanName is the conventional OTel span name for a plugin Apply call.
// Plugins MUST use this name verbatim; pheno-tracing groups by this.
const SpanName = "phenotype.router.plugin.apply"

// Span attributes plugins MUST set on the Apply span.
// Plugins MAY set additional attributes prefixed "phenotype.plugin.*".
type SpanAttrs struct {
    // Required (every plugin MUST set):
    PluginName    attribute.KeyValue // attribute.String("phenotype.plugin.name", md.Name)
    PluginVersion attribute.KeyValue // attribute.String("phenotype.plugin.version", md.Version)
    PluginPhase   attribute.KeyValue // attribute.Int("phenotype.plugin.phase", int(md.Phase))
    RequestID     attribute.KeyValue // attribute.String("phenotype.request.id", req.ID)
    DecisionKind  attribute.KeyValue // attribute.String("phenotype.decision.kind", decision.Kind.String())

    // Optional (plugins set if applicable):
    Provider       attribute.KeyValue // attribute.String("phenotype.provider", decision.Provider)
    Model          attribute.KeyValue // attribute.String("phenotype.model", decision.Model)
    ReasoningModel attribute.KeyValue // attribute.Bool("phenotype.reasoning_model", true) — CapReasoningAware plugins
    CostUSD        attribute.KeyValue // attribute.Float64("phenotype.cost.usd", decision.CostUSD)
    LatencyMs      attribute.KeyValue // attribute.Int64("phenotype.latency.ms", applyMs)
}

// Span events plugins MUST emit on decision changes:
//   "phenotype.decision.made"   — Decision returned successfully
//   "phenotype.decision.abort"  — Decision aborted the request
//   "phenotype.decision.defer"  — Decision deferred to next plugin in chain
```

**Span hierarchy (parent-child):**

```
phenotype.router.request (root)
   ├── phenotype.router.plugin.reload           (hot-reload only; §2)
   ├── phenotype.router.phase.pre_routing       (per phase)
   │      └── phenotype.router.plugin.apply     (per plugin in phase)
   │             └── phenotype.router.provider.call (transport-layer span)
   ├── phenotype.router.phase.provider_selection
   │      └── phenotype.router.plugin.apply × N
   ├── phenotype.router.phase.request_transform
   │      └── ...
   ├── phenotype.router.phase.post_routing
   │      └── ...
   └── phenotype.router.phase.observability
          └── phenotype.router.plugin.apply (hooks; no mutation)
```

Plugins MUST use the router's `Tracer()` (from `RouterContext`) so the span
parentage is correct. Plugins that bring their own tracer violate the
contract.

### 4. Configuration

Each plugin's config block lives in `router.yaml`:

```yaml
plugins:
  - name: intelligentrouter
    version: "^1.4.0"
    path: ./plugins/intelligentrouter.so
    config:
      cost_ceiling_usd: 0.05
      reasoning_aware: true
      mirt:
        enabled: true
        threshold: 0.7

  - name: contentsafety
    version: "^1.0.0"
    path: ./plugins/contentsafety.so
    config:
      mandatory: true      # sets CapPreRoutingMandatory at load
      providers: [anthropic, openai]
```

The router validates each block against `Metadata().Capabilities` at load
time. A plugin that declares `CapPreRoutingMandatory` MUST have
`config.mandatory: true`; otherwise load fails.

### 5. Versioning policy

- **Plugin semver is strict.** Major version bumps = SDK-breaking change
  (router rejects the plugin on a major-version mismatch with the SDK).
- **SDK semver is strict.** A plugin built against `sdk/v1.x` will not load
  into a router built against `sdk/v1.(x±1)` (router enforces at dlopen).
- **Deprecation:** A capability marked `Deprecated` in `sdk/v1.(x+1)` is
  honored for one minor cycle and removed in `v1.(x+2)`.

### 6. Testing contract

Every plugin MUST ship (per ADR-023 Rule 3.1, ADR-040):

1. **Unit tests** against the SDK's mock `RouterContext` (provided in
   `phenotype-router/sdk/testutil`). Coverage gate: ≥ 80% per ADR-040.
2. **Phase-flow integration test** that loads the plugin into a test
   router and exercises one full request through every phase it
   participates in.
3. **OTel span assertion test** that runs the plugin under a
   `sdktrace.NewTracerProvider` with an in-memory exporter and asserts the
   span attributes match §3.
4. **Hot-reload test** (if `!CapStateful`): dlopen an old + new version
   and assert the swap succeeds, drain completes, and no in-flight request
   is lost.
5. **Lifecycle idempotence test**: call `Init` twice on the same
   `RouterContext`; observable state must match.

## Consequences

### Positive

1. **Single contract.** Every plugin implements the same 5-method Go
   interface. Heterogeneity is gone.
2. **Hot-reload works uniformly.** The 84-task L6 filler (v11 plan §L6) can
   swap plugins without router restarts.
3. **OTel is uniform.** `pheno-tracing` dashboards group by span name and
   attributes; per-plugin custom span code is eliminated.
4. **Reasoning-model awareness is a capability.** Plugins opt in via
   `CapReasoningAware`; the router threads reasoning tokens through the
   chain.
5. **Plugin authors are shielded from Bifrost.** They import only
   `phenotype-router/sdk`; transport is hidden behind the `Transport()`
   port (per ADR-051 §4).
6. **Test surface is standardized.** The 5-test contract in §6 is the
   same for every plugin; coverage gate is mechanical.

### Negative

1. **SDK is normative.** Plugins that don't fit the 5-method shape need
   an SDK revision. Mitigated: the SDK is versioned (semver); a plugin
   can pin to an older SDK via `path:` in `router.yaml`.
2. **Hot-reload requires stateless plugins.** Plugins that need
   process-scoped state (e.g., the online `learning` reward model) opt in
   to `CapStateful` and lose hot-reload until the router restarts.
3. **OTel overhead.** Every `Apply` emits a span; per-request latency
   rises by OTel span emission cost (~µs). Mitigated by 10% sampling on
   hot paths (v11 plan §Risk Register row 3).
4. **Versioning tax.** Strict semver means SDK changes require per-plugin
   rebuilds. Mitigated by the 1-minor-cycle deprecation window.

### Neutral

1. **Plugins become `.so` files.** This is a build-time choice; plugin
   authors `go build -buildmode=plugin`. Source-only plugins are
   supported via the in-process loader (debug mode only).
2. **The router binary ships the SDK embedded.** Plugin authors do not
   vendor the SDK; they build against the SDK header the router exposes.

## Follow-ups

| ID | Priority | Action | Owner | Track |
|---|---|---|---|---|
| FU1 | P0 | Author `phenotype-router/sdk` Go package per §1-§5 | forge-2 | L2.5 |
| FU2 | P0 | `phenotype-router/sdk/testutil` mock `RouterContext` + in-memory tracer for plugin tests | forge-2 | L2.5 |
| FU3 | P0 | L2.5 hot-reload: implement watcher + drain + atomic swap | forge-2/3 | L2.5 |
| FU4 | P0 | ADR-051 §4 dependency rules enforced by `pheno-framework-lint` (per ADR-048) | forge-1 | L2.5 |
| FU5 | P0 | L3.6 first: port `contentsafety` to the new SDK as the reference implementation | forge-3 | L3 |
| FU6 | P1 | Port remaining 8 plugins + add `vector-store` slot | forge-3 | L3 |
| FU7 | P1 | OTel span assertions in CI for every plugin (per §6 test 3) | forge-1 | L3 |
| FU8 | P1 | Coverage gate ≥ 80% on `phenotype-router/sdk` per ADR-040 | forge-2 | L2.5 |
| FU9 | P2 | Author `docs/adr/2026-06-20/SDK_MIGRATION_NOTES.md` for plugin authors transitioning from Bifrost plugin SDK | forge-1 | Post-L3 |
| FU10 | P2 | 71-pillar refresh for `phenotype-router/sdk` after L2.5 ships | worklog-schema circle | Post-L2 |

## Alternatives considered

### Alternative A — Per-plugin Go interfaces (status quo) *(rejected)*

- **Pros:** Each plugin's interface is bespoke; maximal per-plugin freedom.
- **Cons:** No hot-reload (each plugin loads differently). No uniform OTel
  span schema. Reasoning-model awareness can't be threaded. Test surface
  is per-plugin custom.
- **Decision:** Rejected. The 9 plugins' heterogeneity is the root cause
  of every gap in v11 plan §L2.5.

### Alternative B — WebAssembly plugin host *(rejected)*

- **Pros:** Language-agnostic (plugin authors could use Python, Rust,
  anything). Stronger isolation.
- **Cons:** Cold-start latency (10-100 ms per request); Wasm GC is not
  yet a stable target in 2026; debugging is harder; SDK surface is
  larger; the 9 existing plugins are all Go.
- **Decision:** Rejected. The plugin author pool is Go-fluent;
  Bifrost v1.5 hot-reload uses native `.so`; uniformity with the
  Bifrost ecosystem matters.

### Alternative C — In-process Go plugin via `go plugin` package *(accepted with caveats)*

- **Pros:** Native to Go. No Wasm runtime. Plugin authors use the same
  `go build` they already use.
- **Cons:** `go plugin` has known limitations (single Go runtime version
  per host; no plugin unload in some Go versions). Mitigated by process
  restart on plugin unload if needed.
- **Decision:** **Adopted.** This ADR §2 specifies the `.so`-based
  hot-reload protocol; the implementation uses `go plugin` where the
  runtime permits and falls back to fork-reload otherwise. The
  protocol (state-preserving-per-request, versioned-binary, drain
  timeout) is the same in both implementations.

### Alternative D — gRPC plugin host *(deferred)*

- **Pros:** Language-agnostic. Strong isolation. Each plugin is a
  separate process.
- **Cons:** Per-request IPC cost; higher operational complexity;
  existing 9 plugins are Go; over-engineered for the current fleet size.
- **Decision:** Deferred. Re-evaluate if/when a non-Go plugin author
  (Python, Rust) appears with a concrete plugin need.

## References

- ADR-050 (Router rebuild: Option B): `docs/adr/2026-06-20/ADR-050-router-rebuild.md`
- ADR-051 (Bifrost as library): `docs/adr/2026-06-20/ADR-051-bifrost-as-library.md`
- ADR-036 (pheno-tracing substrate canonical): `docs/adr/2026-06-17/ADR-036-pheno-tracing-substrate-canonical.md`
- ADR-023 (substrate quality bar): `docs/adr/2026-06-15/ADR-023-agent-effort-governance.md` Rule 3.1
- ADR-040 (test coverage gates per tier): `docs/adr/2026-06-18/ADR-040-test-coverage-gates-per-tier.md`
- ADR-048 (substrate graduation path, framework-lint rule authoring): `docs/adr/2026-06-18/ADR-048-substrate-graduation-path.md`
- ADR-006 (Circuit Breaker pattern, for `smart-fallback` health-aware port): `docs/adr/ADR-006-Circuit-Breaker.md`
- Plan (primary): [`plans/2026-06-20-v11-dag-router-rebuild.md`](../../plans/2026-06-20-v11-dag-router-rebuild.md) §L2.5, §L3
- Research (primary): [`plans/2026-06-20-router-architecture-2026-research.md`](../../plans/2026-06-20-router-architecture-2026-research.md) §4 (industry trends), §6 (architecture)
- OpenTelemetry Go SDK: <https://opentelemetry.io/docs/languages/go/>
- Bifrost v1.5 hot-reload precedent: <https://github.com/maximhq/bifrost/releases/tag/v1.5.21>
- Go `plugin` package: <https://pkg.go.dev/plugin>