# ADR-050 — Router rebuild: Option B (Bifrost as transport library + Phenotype-owned decision layer)

- **Status:** Accepted — 2026-06-20 (§8 Option B per user directive "do all of the above"; supersedes AGENTS.md §8 AWAITING state)
- **Date:** 2026-06-20
- **Decision:** @KooshaPari — 2026-06-20 (accepted via orchestrator on `wip/stash-1-v11-agents-md-refresh-2026-06-20`)
- **Plan:** [`plans/2026-06-20-v11-dag-router-rebuild.md`](../../plans/2026-06-20-v11-dag-router-rebuild.md)
- **Research:** [`plans/2026-06-20-router-architecture-2026-research.md`](../../plans/2026-06-20-router-architecture-2026-research.md) §5 (Rebuild Decision — 3 Options)
- **Wave:** v11 L5 — Documentation / Governance (T5.2)
- **Related:** ADR-051 (Bifrost as library, not wrapper); ADR-052 (Plugin SDK spec); ADR-036 (pheno-tracing substrate canonical)

## Context

The Phenotype fleet currently routes LLM traffic through `bifrost-extensions`
(`argis-extensions` local mirror), a fork of `maximhq/bifrost` carrying 9
Phenotype-owned plugins: `intelligentrouter`, `smartfallback`, `learning`,
`promptadapter`, `contextfolding`, `voyage`, `researchintel`, `contentsafety`,
`toolrouter` — **7,283 LoC of 2024-vintage routing intelligence** sitting on a
2025-era gateway (research §1).

Upstream drift (`bifrost/core` `v1.2.30 → v1.5.21`, three minor versions) has
landed provider coverage Bifrost didn't ship at fork-time (Claude Sonnet 4.5,
o3 reasoning models, MCP transport), prompt-cache fingerprinting, OTel-native
spans per plugin, provider-pre-flight health checks, and plugin hot-reload —
**2-4 weeks of new provider support + 1-2 weeks of new architecture per
release** (research §2).

User directive (2026-06-20, per research §drivers): *"rework given changes as
of 2026 for our router arch that we will rebuild and own ourselves"*. The
research doc evaluated three rebuild paths against this directive (research
§5):

| Option | Description | Effort | Risk | Trigger condition |
|---|---|---|---|---|
| **A** | Rebase + continue wrapping Bifrost | ~3 wks (1 dev) | Highest (reactive to upstream breaks) | If Bifrost team is responsive + plugin layer stays novel |
| **B** | Pin Bifrost as library, build native decision layer on top | ~6-8 wks (1-2 devs) | Moderate (we own decisions, Bifrost owns transport) | **Now — "own it ourselves" play** |
| **C** | Full replacement — drop Bifrost, native everything | ~12-16 wks (2-3 devs) | Highest effort, must re-implement provider quirks | Only if Bifrost is unmaintained or zero-deps required |

This ADR formalizes the recommendation from research §5: **adopt Option B**.

## Decision

Adopt **Option B**: pin Bifrost (`v1.5.21`) as a low-level transport SDK,
build a Phenotype-owned decision-layer router (`phenotype-router`, NEW) on top,
and refactor the 9 plugins into a first-class plugin SDK with hot-reload and
OTel-native spans.

### 1. Repo topology after v11

| Repo | Action | Role |
|---|---|---|
| `phenotype-router` (NEW) | Created | Router core: request → decision flow; OTel spans; hot-reload; health-aware provider pool; reasoning-model awareness |
| `phenotype-router-plugins` (NEW) | Created | The 9 plugins + `vector-store` (NEW, Q3 2026) as separate Go modules |
| `bifrost-extensions` | Demoted | Transport library only (provider plumbing, streaming, retries, rate limits); pin `v1.5.21` |
| `pheno-tracing` | Extended | Add OTLP Go client + span helpers for router/plugin/provider events (ADR-036 substrate) |
| `cliproxyapi-plusplus` | Bridged | Thin client of `phenotype-router` (bridge mode) |
| `OmniRoute` | Documented | Marked superseded; archive once research §8 Q3 is resolved |

### 2. Architectural boundary (research §6)

```
┌─────────────────────────────────────────────────────────────────┐
│ Phenotype Router (Go) — KooshaPari-owned                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Router Core (decision layer)                            │    │
│  │  - Request → Decision flow                              │    │
│  │  - OTel spans (decision + provider + plugin)            │    │
│  │  - Plugin hot-reload (Bifrost v1.5 parity)              │    │
│  │  - Health-aware provider pool                            │    │
│  │  - Reasoning-model awareness                            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          │                                      │
│                          ▼                                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐  │
│  │ intelligent│  │ smart      │  │ learning   │  │ contents │  │
│  │ router     │  │ fallback   │  │ (online)   │  │ safety   │  │
│  │ (MIRT+     │  │ (health-   │  │            │  │ (pre-    │  │
│  │  RouteLLM+ │  │  aware)    │  │            │  │  routing)│  │
│  │  semantic) │  │            │  │            │  │          │  │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐  │
│  │ prompt     │  │ context    │  │ tool       │  │ voyage   │  │
│  │ adapter    │  │ folding    │  │ router     │  │ (rerank) │  │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘  │
│  ┌────────────┐  ┌────────────┐                                  │
│  │ research   │  │ vector-    │  ← NEW slots (Q3 2026)          │
│  │ intel      │  │ store      │                                  │
│  └────────────┘  └────────────┘                                  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Transport Layer = maximhq/bifrost/core (Go library)      │    │
│  │  - Provider plumbing (Anthropic, OpenAI, Google, etc.)    │    │
│  │  - Streaming, retries, rate limits                       │    │
│  │  - Our pin: v1.5.21+                                     │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │  pheno-tracing (Rust) │
                  │  OTLP exporter         │
                  │  per ADR-036           │
                  └───────────────────────┘
```

### 3. What Option B buys us (research §4, §6)

- **Provider-agnostic core, plugin-per-concern** — same shape as Bifrost,
  LiteLLM, and Portkey (industry 2026 SOTA). We keep what works; we change
  what we own.
- **OTel-native observability** — every decision, provider call, and plugin
  emits an OTLP span. `pheno-tracing` (ADR-036) is the spine.
- **Reasoning-model awareness** — `intelligentrouter` learns about
  o1/o3/Claude Sonnet 4.5 reasoning tokens; routing decisions respect
  reasoning-effort toggles.
- **MCP transport** — exposed via `phenotype-router` (not via Bifrost).
- **Prompt-cache routing** — `smartfallback` + `learning` become
  cache-aware (fingerprinting from Bifrost v1.4).
- **Vector store / RAG routing** — new `vector-store` plugin slot, Q3 2026.
- **Policy / safety as first-class routing input** — `contentsafety` promoted
  to **mandatory pre-routing** (research §4, last row).
- **Plugin hot-reload** — parity with Bifrost v1.5; no equivalent today in
  our stack.

### 4. Critical path (plan §Critical Path)

```
L1 (1.5w) ─┐
           ├──> L2 (3w) ─┐
L5 (0.5w) ─┘            ├──> L3 (3w) ──> L4 (1w) ──> v11 closure
                        │
                        └──> (parallel) L1.4 regression feeds back into L2.2
```

**Total: ~6.5 weeks** with 2 devs in parallel on L2 + L3 (v11 plan §Critical
Path). L5 (this ADR wave) runs in parallel with L1; L2 starts after L1
exit criteria (`bifrost-extensions` builds + 9 plugin tests pass on v1.5.21).

### 5. Sequencing rules

1. **L1 must complete before L2.2** — the new SDK surface must be stable
   before `phenotype-router` depends on it.
2. **L2.5 (plugin SDK spec) must complete before L3.1** — plugins port
   against the SDK, not against ad-hoc interfaces. See **ADR-052**.
3. **L4.2 (`pheno-tracing` Go client) must complete before L2.3 (OTel
   spans ship)** — otherwise we hand-roll a parallel tracing path that
   diverges from the substrate.
4. **L3.6 (`contentsafety` mandatory pre-routing) is the highest-priority
   plugin** — it gates safety; it must migrate before any other plugin goes
   to `phenotype-router-plugins`.

## Consequences

### Positive

1. **Ownership of decisions.** We own the routing logic, the plugin SDK, and
   the observability. Bifrost upstream breaks no longer block our roadmap
   except in transport (which we want anyway).
2. **OTel-native observability.** Every span flows to `pheno-tracing`
   (ADR-036). No more shadow telemetry.
3. **Hot-reload parity.** Plugins swap without a router restart — needed for
   the 84-task L6 side-DAG filler (v11 plan §L6).
4. **Reasoning-model aware.** Routing decisions respect o1/o3/Claude Sonnet
   4.5 reasoning tokens (research §4 row 4).
5. **New plugin slot.** `vector-store` (Q3 2026) ships in the same SDK
   surface as the existing 9 plugins.
6. **Industry alignment.** Same shape as LiteLLM + Portkey + Bifrost v1.5;
   any future hire or contractor recognizes the topology immediately.

### Negative

1. **Effort:** ~6.5 weeks critical path with 2 devs; ~12 weeks wall with
   1 dev. Higher than Option A (~3 wks).
2. **Two repos to maintain** instead of one (`phenotype-router` +
   `phenotype-router-plugins` + the demoted `bifrost-extensions`).
3. **Plugin refactor churn.** All 9 plugins move from the old SDK to the
   new SDK in L3; risk of regression during the port (mitigated by
   shadow-mode in prod, v11 plan §Risk Register row 2).
4. **OTel overhead risk.** Span sampling at 10% on hot paths to preserve
   p99 latency (v11 plan §Risk Register row 3).
5. **Hot-reload breaks plugin state** if shared state is allowed.
   Mitigated: plugin state is per-request only (v11 plan §Risk Register
   row 4).

### Neutral

1. **Bifrost stays as a dependency.** We accept its release cadence in
   the transport layer only. If Bifrost is abandoned, Option C becomes
   the next decision.
2. **Two SDKs to learn** (Bifrost for transport; our plugin SDK for
   decisions). Mitigated by `phenotype-router` insulating plugin authors
   from Bifrost.

## Follow-ups

| ID | Priority | Action | Owner | Track |
|---|---|---|---|---|
| FU1 | P0 | Resolve research §8 Q1-Q5 (user decisions) | @KooshaPari | Pre-L2 |
| FU2 | P0 | L1.1-L1.4: Bifrost upgrade + 9-plugin regression | forge-1 | L1 |
| FU3 | P0 | L2.1-L2.5: `phenotype-router` v0.1.0 (decision flow + 1 health-aware provider + OTel + hot-reload of 1 plugin) | forge-2/3 | L2 |
| FU4 | P0 | L3.6 first: `contentsafety` mandatory pre-routing | forge-3 | L3 |
| FU5 | P0 | ADR-051 (Bifrost library role) + ADR-052 (plugin SDK spec) authored in this wave | forge-1 | L5 |
| FU6 | P1 | L4.2: `pheno-tracing` Go client per ADR-036 | forge-3 | L4 |
| FU7 | P1 | `cliproxyapi-plusplus` bridge-mode cutover | forge-1 | L3.5 |
| FU8 | P2 | `OmniRoute` archive decision after Option B is live | @KooshaPari | Post-v11 |
| FU9 | P2 | 71-pillar refresh for `phenotype-router` after v0.1.0 ships | worklog-schema circle | Post-L2 |
| FU10 | P2 | Coverage gates per ADR-040 (80% lib / 70% framework / 60% federated service) | forge-2 | L3 |

## Alternatives considered

### Option A — Rebase + continue wrapping Bifrost *(rejected)*

- **Pros:** Lowest cost (~3 weeks, 1 dev). Lowest immediate risk. Keeps the
  existing 7,283 LoC untouched.
- **Cons:** Reactive to every upstream breaking change. We never own the
  decision layer. Reasoning-model awareness, OTel-native spans, and
  hot-reload all arrive at Bifrost's cadence, not ours. Plugin layer
  becomes a thin wrapper, not a first-class concern.
- **Decision:** Rejected. The user directive (*"we will rebuild and own
  ourselves"*) rules out continued wrapping.

### Option C — Full replacement (drop Bifrost, native everything) *(deferred)*

- **Pros:** Cleanest. Zero Bifrost dependency. Single Phenotype-owned
  surface end-to-end.
- **Cons:** ~12-16 weeks (2-3 devs). We re-implement provider quirks
  (Anthropic prompt-cache headers, OpenAI reasoning tokens, Google
  streaming tool-use) that Bifrost already handles. High risk of
  multi-month regression.
- **Decision:** Deferred. Re-evaluate only if Bifrost is abandoned or
  if we want to drop the `go.mod` dependency entirely (e.g., for a
  Rust-native rewrite post-v11).

### Option B (chosen) — Pin Bifrost as library, build native decision layer on top

- **Pros:** Bifrost stays = free provider coverage + bug fixes. We own
  the decision layer (which provider for this request, with what cache,
  what safety, what cost ceiling). Plugin SDK becomes a first-class
  concern with hot-reload + OTel. `pheno-tracing` (ADR-036) becomes the
  observability spine.
- **Cons:** Two repos to maintain. Plugin refactor cost (all 9 ports).
  OTel overhead on hot paths (mitigated by sampling).
- **Decision:** **Adopted.** Best balance of ownership, cost, and risk
  for the user directive.

## References

- **Research (primary):** [`plans/2026-06-20-router-architecture-2026-research.md`](../../plans/2026-06-20-router-architecture-2026-research.md) — §1 current stack, §2 Bifrost drift, §4 industry trends, §5 rebuild decision, §6 architecture, §7 v11 DAG, §8 open questions
- **Plan (primary):** [`plans/2026-06-20-v11-dag-router-rebuild.md`](../../plans/2026-06-20-v11-dag-router-rebuild.md) — L1-L6 lanes, critical path, risk register
- ADR-051 (Bifrost as library): `docs/adr/2026-06-20/ADR-051-bifrost-as-library.md`
- ADR-052 (Plugin SDK spec): `docs/adr/2026-06-20/ADR-052-plugin-sdk-spec.md`
- ADR-036 (pheno-tracing substrate canonical): `docs/adr/2026-06-17/ADR-036-pheno-tracing-substrate-canonical.md` (note: AGENTS.md row has number collision with T12-closure ADR-050 from 2026-06-19; both stand — see References for disambiguation)
- 71-pillar audit: `findings/71-pillar-2026-06-17.md`
- Bifrost upstream: <https://github.com/maximhq/bifrost/releases/tag/v1.5.21>
- LiteLLM routing: <https://docs.litellm.ai/docs/routing>
- Portkey gateway: <https://portkey.ai/docs/product/gateway>
- OpenLLMetry: <https://github.com/traceloop/openllmetry>