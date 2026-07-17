# ADR-051 — Bifrost as library, not wrapper

- **Status:** Accepted — 2026-06-20 (paired with ADR-050 acceptance; takes effect on Option B adoption per §8 user directive)
- **Date:** 2026-06-20
- **Decision:** @KooshaPari — 2026-06-20 (accepted via orchestrator on `wip/stash-1-v11-agents-md-refresh-2026-06-20`)
- **Plan:** [`plans/2026-06-20-v11-dag-router-rebuild.md`](../../plans/2026-06-20-v11-dag-router-rebuild.md) §L1 + §L2
- **Research:** [`plans/2026-06-20-router-architecture-2026-research.md`](../../plans/2026-06-20-router-architecture-2026-research.md) §1, §5, §6
- **Wave:** v11 L5 — Documentation / Governance (T5.3)
- **Paired with:** ADR-050 (Router rebuild: Option B); ADR-052 (Plugin SDK spec)
- **Supersedes:** The implicit 2024-2026 convention of `bifrost-extensions` carrying Phenotype plugins as wrappers around `maximhq/bifrost`'s plugin SDK

## Context

`bifrost-extensions` (`KooshaPari/bifrost-extensions`; local mirror
`argis-extensions`) is a fork of `maximhq/bifrost` carrying 9 Phenotype-owned
plugins: `intelligentrouter` (1,103 LoC), `learning` (2,006), `promptadapter`
(1,630), `smartfallback` (736), `contextfolding` (418), `voyage` (437),
`researchintel` (263), `contentsafety` (390), `toolrouter` (300) — **7,283
LoC total** (research §1).

Historically, this worked because the plugins were **wrappers** around the
Bifrost plugin SDK: each plugin implemented `bifrost.Plugin` (or equivalent)
and got pulled into the gateway at startup. Bifrost owned the
**transport** (provider plumbing, streaming, retries, rate limits); we owned
the **decision logic** the plugins embodied.

That boundary drifted in 2024-2026. Three failures drove the v11 rebuild
(research §drivers, §5):

1. **Drift latency.** Every Bifrost release landed provider support and
   architecture (OTel spans, health checks, hot-reload) on Bifrost's
   cadence. Our plugins couldn't adopt those features without waiting for
   Bifrost to ship them.
2. **Decision logic bleeding into transport.** The 9 plugins started
   carrying transport concerns (rate-limit handling, provider retry
   policies, response shaping) that Bifrost already provided. We were
   re-implementing transport while claiming to do routing.
3. **Ownership ambiguity.** When a routing decision went wrong, it was
   unclear whether the bug was "ours" (plugin) or "theirs" (Bifrost
   transport). The boundary needed to be sharp, not permeable.

This ADR **sharpens** the boundary: Bifrost is the transport library;
`phenotype-router` is the decision layer. Plugins belong to the decision
layer. The transport library does not call into plugins; the decision
layer calls into the transport library.

## Decision

Adopt a strict two-layer architecture with a **one-way dependency**:

```
phenotype-router (decision layer) ──► bifrost/core (transport library)
        │
        ├──► phenotype-router-plugins (the 9 plugins + vector-store slot)
        │
        └──► pheno-tracing (OTLP exporter per ADR-036)

bifrost-extensions (transport library wrapper)
        │
        └──► maximhq/bifrost/core (upstream, pinned v1.5.21+)
```

**The dependency arrow points down only.** Plugins call into the router.
The router calls into Bifrost. Bifrost does not call into the router.
Plugins do not call into Bifrost directly (they go through the router's
transport port).

### 1. What stays in `bifrost-extensions` (transport role)

| Concern | Where | Rationale |
|---|---|---|
| Provider plumbing (Anthropic, OpenAI, Google, etc.) | `bifrost/core/providers/*` | Provider quirks are upstream-owned; we benefit from their bug fixes |
| Streaming, retries, rate limits | `bifrost/core/transport/*` | Same |
| Provider SDK shims (OAI-compatible adapters, Anthropic-specific headers) | `bifrost/core/providers/*/sdk` | Same |
| Our pin: `v1.5.21` | `bifrost-extensions/go.mod` | Per research §6; pin + vendor-source fallback if upstream breaks (v11 plan §Risk Register row 1) |

**`bifrost-extensions` is demoted from "our router with 9 plugins" to "our
transport-library fork of Bifrost with provider-side patches."** The 9
plugins move out (see §2). The repo's primary artifact becomes a Go module
that `phenotype-router` imports.

### 2. What moves to `phenotype-router` (decision role)

| Concern | Where | Rationale |
|---|---|---|
| Request → decision flow | `phenotype-router/core/router.go` | We own it; OTel spans live here |
| Provider selection (which provider for this request) | `phenotype-router/core/selector.go` | Driven by plugin chain (see ADR-052) |
| Plugin host (load, hot-reload, lifecycle) | `phenotype-router/pluginhost/*` | First-class concern; Bifrost v1.5 parity |
| Health-aware provider pool | `phenotype-router/health/*` | Replaces `smartfallback` rule-based logic with circuit-breaker-driven health (cf. ADR-006) |
| Reasoning-model awareness (o1/o3/Claude Sonnet 4.5 reasoning tokens) | `phenotype-router/core/reasoning.go` | Plugin chain input; we own the schema |
| OTel span emission (decision + provider + plugin) | `phenotype-router/tracing/*` | Bridge to `pheno-tracing` Go client (ADR-036) |
| Plugin SDK surface (the contract plugins implement) | `phenotype-router/sdk/*` | See ADR-052 |

### 3. What moves to `phenotype-router-plugins` (the 9 plugins + vector-store)

| Plugin | Migration target | Notes |
|---|---|---|
| `intelligentrouter` (MIRT / RouteLLM / semantic / cost) | `phenotype-router-plugins/intelligentrouter/` | Largest plugin (1,103 LoC); first or last to port? **First** — it gates cost + latency tradeoffs (research §4) |
| `smartfallback` (cascade + task rules) | `phenotype-router-plugins/smartfallback/` | Becomes **health-aware** (research §4 row 3) |
| `learning` (online) | `phenotype-router-plugins/learning/` | Becomes **cache-aware** (prompt-cache fingerprinting, research §4 row 7) |
| `promptadapter` (prompt routing per provider) | `phenotype-router-plugins/promptadapter/` | No architectural change |
| `contextfolding` (window compression) | `phenotype-router-plugins/contextfolding/` | No architectural change |
| `voyage` (embedding rerank) | `phenotype-router-plugins/voyage/` | No architectural change |
| `researchintel` | `phenotype-router-plugins/researchintel/` | No architectural change |
| `contentsafety` (pre-routing content moderation) | `phenotype-router-plugins/contentsafety/` | **Promoted to mandatory pre-routing step** (research §4 row 9); L3.6 first |
| `toolrouter` (function-call routing) | `phenotype-router-plugins/toolrouter/` | No architectural change |
| `vector-store` (NEW, Q3 2026) | `phenotype-router-plugins/vectorstore/` | New slot per research §6 + v11 plan §L3 T3.10 |

Each plugin is a **separate Go module** in `phenotype-router-plugins/`. They
import `phenotype-router/sdk` (the contract from ADR-052), not Bifrost.

### 4. Dependency rules (enforced by `pheno-framework-lint` per ADR-048)

| Caller | Callee | Permitted? |
|---|---|---|
| `phenotype-router-plugins/*` | `phenotype-router/sdk` | ✅ |
| `phenotype-router-plugins/*` | `bifrost/core` | ❌ (goes through router transport port) |
| `phenotype-router` | `bifrost-extensions` | ✅ |
| `phenotype-router` | `phenotype-router-plugins/*` | ❌ (plugins loaded at runtime via pluginhost) |
| `bifrost-extensions` | `phenotype-router` | ❌ (one-way dependency) |
| `bifrost-extensions` | `phenotype-router-plugins/*` | ❌ |

The last two rows are the critical ones: **Bifrost never calls into the
router or the plugins**. Plugins never call into Bifrost directly. The router
owns both call sites.

### 5. Migration sequencing

1. **L1 (1.5 wks):** Pin Bifrost `v1.5.21` in `bifrost-extensions`; regress
   9 plugins against the new SDK (v11 plan §L1). Outcome: `bifrost-extensions`
   builds clean.
2. **L2 (3 wks):** Author `phenotype-router` v0.1.0 — decision flow + 1
   health-aware provider + OTel + hot-reload of 1 plugin. The 9 plugins
   stay in `bifrost-extensions` until L3 begins.
3. **L3 (3 wks):** Move each plugin to `phenotype-router-plugins/` against
   the new SDK (ADR-052). **Order:** `contentsafety` first (L3.6), then
   `smartfallback` + `learning` (cache-aware), then the remaining 6.
4. **L3.5 (parallel):** Cut `cliproxyapi-plusplus` over to bridge mode
   (thin client of `phenotype-router`).
5. **L4 (1 wk):** OTLP span schema + `pheno-tracing` Go client; trace every
   plugin span.
6. **Post-v11:** Archive `bifrost-extensions` plugin layer (transport fork
   stays); document `OmniRoute` as superseded.

## Consequences

### Positive

1. **Sharp ownership boundary.** Every concern has exactly one home.
   Decision-layer bugs are ours; transport-layer bugs are Bifrost's (with
   our patches).
2. **Drift becomes bounded.** Bifrost upgrades affect transport only;
   plugins and decision logic are insulated.
3. **Plugin author ergonomics.** A plugin author imports
   `phenotype-router/sdk` and never sees Bifrost. The transport surface is
   the router's concern, not theirs.
4. **Hot-reload parity.** `phenotype-router/pluginhost` is a first-class
   concern; the router owns plugin lifecycle, not Bifrost.
5. **Reasoning-model awareness ships without waiting for Bifrost.** When
   o3-pro or Claude Sonnet 5 lands, we update `phenotype-router/core/reasoning.go`
   the day the model ships, not the day Bifrost ships a release with the
   shim.

### Negative

1. **Two repos to maintain.** `phenotype-router` (decision) +
   `bifrost-extensions` (transport) both need CI, coverage, governance.
2. **Plugin refactor cost.** All 9 plugins move from old SDK to new SDK.
   Mitigated by sequential porting (one plugin at a time, shadow mode in
   prod per v11 plan §Risk Register row 2).
3. **Bifrost upgrade tax.** When we want a new Bifrost feature (e.g.,
   v1.6.x), we still need to upgrade `bifrost-extensions` and verify the
   transport layer. Mitigated by vendoring source if upstream pulls a
   breaking change mid-rebuild (v11 plan §Risk Register row 1).
4. **Two SDKs to learn.** Bifrost SDK (for transport contributors) +
   `phenotype-router/sdk` (for plugin authors). Mitigated by the
   boundary being clear: plugin authors only need the latter.

### Neutral

1. **`bifrost-extensions` continues to exist** but in a narrower role.
   It is no longer "the router"; it is "our patched transport library."
2. **The `argis-extensions` local mirror** keeps tracking upstream Bifrost
   releases; only our transport-layer patches land on top.

## Follow-ups

| ID | Priority | Action | Owner | Track |
|---|---|---|---|---|
| FU1 | P0 | ADR-052 (Plugin SDK spec) authored in this wave; codifies the contract plugins implement | forge-1 | L5 |
| FU2 | P0 | L1.1-L1.4: Pin Bifrost v1.5.21 + 9-plugin regression in `bifrost-extensions` (transport fork only) | forge-1 | L1 |
| FU3 | P0 | L2.1-L2.5: `phenotype-router` v0.1.0 | forge-2/3 | L2 |
| FU4 | P0 | L3.1-L3.10: Move 9 plugins + add `vector-store` slot | forge-3 | L3 |
| FU5 | P1 | `pheno-framework-lint` rule for the dependency matrix in §4 (per ADR-048) | forge-1 | L2.5 |
| FU6 | P1 | Update `bifrost-extensions/README.md` to reflect transport-only role + migration pointer | forge-1 | L1 |
| FU7 | P1 | Update `phenotype-router/README.md` to declare ownership of decision layer | forge-2 | L2 |
| FU8 | P2 | Archive decision for `OmniRoute` after Option B is live | @KooshaPari | Post-v11 |
| FU9 | P2 | Coverage gates per ADR-040 applied to both `phenotype-router` (70% framework) and `bifrost-extensions` (60% federated service) | forge-2 | Post-L3 |

## Alternatives considered

### Alternative A — Keep `bifrost-extensions` as the all-in-one router *(rejected)*

- **Pros:** No new repo. No SDK split. Lowest cost to start.
- **Cons:** Decision logic stays coupled to transport. Plugin authors must
  import Bifrost. Drift is unbounded (every Bifrost change touches every
  plugin). Reasoning-model awareness, OTel spans, hot-reload all arrive on
  Bifrost's cadence.
- **Decision:** Rejected. The 2026 router ecosystem research (research §4)
  shows Bifrost, LiteLLM, and Portkey all converge on
  provider-agnostic-core + plugin-per-concern — but with **plugin authors
  importing only the gateway SDK, never the transport layer**. Keeping the
  all-in-one shape leaves us out of step with the industry pattern.

### Alternative B — Drop Bifrost, native everything *(deferred, see ADR-050 §Alternatives)*

- **Pros:** Sharpest boundary. Zero Bifrost dependency.
- **Cons:** ~12-16 weeks; we re-implement provider quirks. Deferred.
- **Decision:** Re-evaluate only if Bifrost is abandoned.

### Alternative C — Wrap Bifrost at the boundary but keep its SDK for plugins *(rejected)*

- **Pros:** Plugins can stay close to Bifrost's SDK; smaller refactor.
- **Cons:** Plugins still import Bifrost directly; the boundary is
  permeable. We still re-implement transport in plugins when Bifrost is
  slow to ship.
- **Decision:** Rejected. ADR-050 §Alternatives Option A covers this case
  in full. Same drift risk; same ownership ambiguity.

### This ADR's choice — Bifrost as library, plugin authors shielded

- **Pros:** Sharp one-way dependency. Plugin authors see only the router
  SDK. We own decisions; Bifrost owns transport. Drift is bounded.
- **Cons:** Two repos + a SDK to author + a migration tax per Bifrost
  release.
- **Decision:** **Adopted.** Aligns with ADR-050 Option B; aligns with
  industry 2026 SOTA; aligns with the "own it ourselves" user directive.

## References

- ADR-050 (Router rebuild: Option B): `docs/adr/2026-06-20/ADR-050-router-rebuild.md`
- ADR-052 (Plugin SDK spec): `docs/adr/2026-06-20/ADR-052-plugin-sdk-spec.md`
- ADR-036 (pheno-tracing substrate canonical): `docs/adr/2026-06-17/ADR-036-pheno-tracing-substrate-canonical.md`
- ADR-048 (Substrate graduation path): `docs/adr/2026-06-18/ADR-048-substrate-graduation-path.md`
- Research (primary): [`plans/2026-06-20-router-architecture-2026-research.md`](../../plans/2026-06-20-router-architecture-2026-research.md) §1 (current stack), §5 (rebuild decision), §6 (architecture)
- Plan (primary): [`plans/2026-06-20-v11-dag-router-rebuild.md`](../../plans/2026-06-20-v11-dag-router-rebuild.md) §L1, §L2, §L3
- Bifrost upstream: <https://github.com/maximhq/bifrost>
- Bifrost v1.5.21 release: <https://github.com/maximhq/bifrost/releases/tag/v1.5.21>
- ADR-006 (Circuit Breaker pattern, for `smartfallback` health-aware port): `docs/adr/ADR-006-Circuit-Breaker.md`