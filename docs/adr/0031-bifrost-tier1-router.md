# 0031 — Bifrost as Tier-1 Router Layer

> Status: **Accepted**
> Date: 2026-06-18
> Deciders: OmniRoute core team + Phenotype platform team
> Driver: `chore/l5-109-omniroute-fork-cleanup-2026-06-18` (L5-110)
> Supersedes: None (additive)

## Context

OmniRoute's `open-sse/` engine is a 5-protocol surface (OpenAI-compat, Anthropic-compat, Responses-API, A2A-JSON-RPC, MCP) and 3-router-layer (provider dispatch, combo resolution, 12-factor Auto-Combo scoring) TypeScript implementation. The hot path lives in `open-sse/handlers/chatCore.ts` (5,811 LOC) and `open-sse/services/combo.ts` (5,202 LOC). At production scale (5k RPS, hundreds of providers, dozens of combo targets per request), a non-trivial fraction of wall time goes to:

- Provider catalog lookups (`src/shared/constants/providers.ts`, 232 entries).
- OpenAI ↔ Anthropic ↔ Gemini format translation (`open-sse/translator/`).
- Credential resolution and per-key account health checks.
- Per-request circuit-breaker state evaluation.
- SSE stream chunking and reconnect bookkeeping.

The Phenotype org has been pointing at the **maximhq `bifrost`** Go AI gateway — vendored at `KooshaPari/bifrost`, locally available at `pheno/bifrost`, `HexaKit/bifrost`, `Pyron/bifrost`, `argis-extensions/bifrost` — as a candidate for absorbing this low-level routing work. The user directive (2026-06-18) asked us to evaluate the candidate set and pick the right one.

We want to keep OmniRoute's higher-level value-add (A2A agent orchestration, MCP-router polyglot facade, ACP registry, skill registry, policy engine, guardrails, web dashboard) intact. The question is: **what should replace OmniRoute's underlying router infrastructure (provider dispatch, format translation, fallback, load balancing, circuit-breaking, semantic cache, observability) in the future?**

## Decision

**Adopt `maximhq/bifrost` (Go, MIT) as OmniRoute's Tier-1 router layer.** Keep OmniRoute's higher layers (A2A, MCP-router, ACP, skill registry, policy engine, guardrails) as Tier-2, unchanged.

This is a **2-tier** architecture (same pattern as Envoy AI Gateway's two-tier model):

```
                            client / phenoservice / agent
                                       │
                                       ▼
   ┌──────────────────────────────────────────────────────────────────┐
   │  Tier 2: OmniRoute  (TypeScript / Next.js 16)                    │
   │  - A2A agent orchestration                                       │
   │  - MCP-router polyglot facade                                    │
   │  - ACP registry + skill registry                                 │
   │  - Policy engine (12-factor Auto-Combo, 15 routing strategies)   │
   │  - Guardrails, evals, webhooks, memory, semantic-cache KEY       │
   │  - Web dashboard, Electron desktop, i18n (42 locales)            │
   └──────────────────────────────────────────────────────────────────┘
                                       │
                            OpenAI-compat /v1/chat/completions
                                       │
                                       ▼
   ┌──────────────────────────────────────────────────────────────────┐
   │  Tier 1: Bifrost  (Go, MIT, vendored)                            │
   │  - 23+ provider dispatch                                          │
   │  - Automatic fallbacks, load balancing                           │
   │  - Virtual keys, hierarchical budget mgmt                        │
   │  - Semantic cache (de-duplicates upstream LLM calls)             │
   │  - MCP client integration                                         │
   │  - Observability: Prometheus, OTel, structured logs              │
   │  - 50x faster than LiteLLM, <100µs overhead at 5k RPS            │
   └──────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                              upstream provider APIs
```

**Adoption mode (initial, v8.1):** OmniRoute calls Bifrost over its **HTTP gateway** at `http://localhost:8080/v1/chat/completions`. A new `BifrostBackend` executor in `open-sse/executors/bifrost.ts` implements the `ProviderAdapter` interface and routes through the gateway. Provider name mapping happens via `open-sse/services/bifrostProviderMap.ts`. **Opt-in per combo; existing combos unchanged.**

**Adoption mode (long-term, v9.0):** Evaluate in-process Go SDK vs sidecar over UDS, pick based on benchmark.

## Considered Options

### Option A: Adopt `maximhq/bifrost` (Go, MIT, 5.9k stars) — CHOSEN

- **Pros**: 50x faster than LiteLLM, <100µs overhead at 5k RPS, 23+ providers, MCP, semantic cache, virtual keys, budget mgmt, Prometheus observability, drop-in OpenAI compat. Already vendored at `KooshaPari/bifrost` and `pheno/bifrost`, `HexaKit/bifrost`, `Pyron/bifrost`, `argis-extensions/bifrost`. MIT-licensed (compatible with fleet OSS-first policy). Go runtime aligns with fleet's polyglot strategy (`pheno-go-ctxkit`, `phenotype-bus`, `dispatch-mcp`).
- **Cons**: Adds a runtime dependency. Bifrost's provider catalog is smaller than OmniRoute's (23 vs 232), so the long tail stays on OmniRoute's executors.
- **Risk**: Low — vendored, MIT, battle-tested (5.9k stars, 5.2k commits), 23+ providers, drop-in OpenAI compat.

### Option B: sgl-model-gateway (Rust, Apache-2.0) — REJECTED

- **Pros**: Rust perf, KV-aware routing across SGLang workers, 5 LB strategies (random, round_robin, cache_aware, power_of_two, bucket), retries with exponential backoff, circuit breakers, OpenTelemetry tracing, MCP client integration, pluggable history connectors.
- **Cons**: **Specialized for SGLang serving clusters** — the core abstraction is "worker selection across SGLang workers" (radix attention tree, KV cache awareness, tokenizer consistency). It is NOT designed to fan out across heterogeneous providers (OpenAI, Anthropic, Gemini, …). We would be using a workers-router for a providers-router role.
- **Risk**: Medium — would require forking and generalizing sgl-model-gateway to support heterogeneous provider fan-out, which defeats the purpose of using an upstream library.

### Option C: vllm direct (Python+Rust, Apache-2.0, 83.2k stars) — REJECTED

- **Pros**: Mature inference engine, PagedAttention, 200+ model architectures, OpenAI-compat server.
- **Cons**: **vLLM is an inference engine, not a router.** It serves ONE model (or one model family) per process. Using vLLM as a router would mean standing up one vLLM per upstream provider, which is the inverse of OmniRoute's value (fan-out across providers). 83.2k stars but wrong role.
- **Risk**: High — fundamental role mismatch; would require ~12 months of integration to make vLLM act as a multi-provider router.

### Option D: sglang direct (Python+Rust, Apache-2.0, 17k stars) — REJECTED

- Same analysis as vLLM. Inference engine with model-gateway *mode*; not a multi-provider router.

### Option E: LiteLLM (Python, MIT, 50.8k stars) — REJECTED

- **Pros**: Incumbent, 100+ providers, mature, used by Stripe, Notion, Google ADK, Netflix, Greptile, OpenHands.
- **Cons**: **Python → ~8ms P95 baseline overhead.** Bifrost benchmarks at 50x faster than LiteLLM. The performance gap is the deciding factor — the fleet already has Go expertise; switching to Python-heavy is a regression.
- **Risk**: Medium — would require a Python-side deployment alongside the TypeScript OmniRoute, doubling the operational surface.

### Option F: Envoy AI Gateway (Go, Apache-2.0, 1.8k stars, CNCF) — REJECTED

- **Pros**: CNCF-grade, Envoy kernel, two-tier pattern with endpoint picker support for LLM inference optimization, Go runtime.
- **Cons**: **Lower-level LLM-specific features than Bifrost** — no semantic cache, no virtual keys, no MCP, no budget mgmt. The right level for an LLM gateway is between Envoy (general) and LiteLLM (Python-heavy). Envoy is too general for the LLM-specific concerns OmniRoute needs.
- **Risk**: Low — would be a fine choice, but Bifrost has equivalent Go perf with more LLM-specific surface and is already vendored.

### Option G: Hand-roll on Rust — REJECTED

- **Pros**: Strong perf potential.
- **Cons**: **Massive 6-12 month effort** with no ecosystem reuse. OmniRoute's value is the higher layers (A2A, MCP, ACP), not the router. We would be rebuilding Bifrost from scratch.
- **Risk**: High — 6-12 engineer-months + ongoing maintenance burden. The fleet already has Go expertise; adding a parallel Rust implementation in OmniRoute (the engine is already TypeScript) is unjustified.

### Option H: Hand-roll on Zig — REJECTED

- **Pros**: Strong perf potential, modern systems language.
- **Cons**: **Even larger effort than Rust** (smaller ecosystem, no LLM-router ecosystem). **Introduces a new fleet language** that no other Phenotype repo uses.
- **Risk**: Very high — same as Rust but worse (no fleet adoption, no ecosystem).

### Option I: Hand-roll on Mojo — REJECTED

- **Pros**: AI/ML-first design, modern.
- **Cons**: **Mojo is still alpha/beta for production**; no LLM-router ecosystem; no fleet adoption.
- **Risk**: Very high — premature for a production system.

## Decision Matrix

| Criterion | Bifrost (A) | sgl-model-gateway (B) | vLLM/sglang (C/D) | LiteLLM (E) | Envoy AI (F) | Hand-roll Rust/Zig/Mojo (G/H/I) |
|---|---|---|---|---|---|---|
| Fit for multi-provider router | ✅ High | ❌ Workers-only | ❌ Inference engine | ✅ High | ⚠️ General | ⚠️ TBD |
| Latency overhead | <100µs | low (Rust) | n/a (wrong role) | ~8ms (Python) | low (Go) | low (after months of work) |
| Provider coverage | 23+ (matches tier-1) | 1 (SGLang) | 1 (per model) | 100+ | n/a (lower-level) | n/a |
| Ecosystem reuse | ✅ (vendored) | ⚠️ (specialized) | ❌ (wrong role) | ✅ (mature) | ✅ (CNCF) | ❌ (none) |
| Implementation effort | 1-2 weeks (executor + map) | 3-6 months (fork) | 12 months | 3-6 months (Python integration) | 3-6 months (custom config) | 6-12 months (build) |
| License compatibility | MIT | Apache-2.0 | Apache-2.0 | MIT | Apache-2.0 | n/a |
| Fleet language alignment | ✅ Go (matches fleet) | ⚠️ Rust (1 repo) | ⚠️ Python (2 repos) | ❌ Python-heavy | ✅ Go (matches fleet) | ❌ New language (Zig/Mojo) or redundant (Rust) |
| Already vendored locally | ✅ (5 copies) | ❌ | ❌ | ❌ | ❌ | n/a |

**A (Bifrost) wins on every dimension except provider count (Bifrost 23 vs LiteLLM 100+), but Bifrost's 23 covers all of OmniRoute's tier-1 surface.**

## Consequences

### Positive

- **Hot-path router overhead drops by an order of magnitude.** Bifrost: <100µs; current Node/TS combo handler: 5-10ms median in production. At 5k RPS this is a meaningful budget reduction.
- **23+ providers become available without writing per-provider executor code.** New providers added in Bifrost upstream flow into OmniRoute automatically.
- **Virtual keys, budget mgmt, observability move to a battle-tested OSS library.** Less surface area to maintain in-house.
- **Bifrost's MCP client integration unifies the upstream-MCP surface.** OmniRoute's 87 MCP tools remain on the server side; Bifrost consumes upstream MCP servers on the client side.
- **Already vendored at 5 locations** — we are not adopting an unknown dependency.
- **MIT-licensed** — fits the Phenotype fleet's OSS-first policy.

### Negative / Risks

- **Operational**: Bifrost becomes a runtime dependency. Mitigated by: (a) the in-process Go SDK is an option post-v9, (b) the Bifrost HTTP gateway is small (single binary) and well-containerized, (c) the local vendored copy can be built from source if upstream is unavailable.
- **Provider coverage**: Bifrost's 23+ providers cover all of OmniRoute's tier-1 surface (OpenAI, Anthropic, Bedrock, Vertex, Groq, Mistral, Cohere, etc.). The 200+ long tail of OmniRoute providers (free tier, OAuth, self-hosted) will still go through OmniRoute's existing executor layer; Bifrost is opt-in per combo.
- **Translation cost**: A small mapping layer is needed between OmniRoute's provider/model names and Bifrost's. Implemented in `open-sse/services/bifrostProviderMap.ts` and tested via `tests/unit/bifrost-provider-map.test.ts`.
- **Lock-in**: If we ever need to swap Bifrost out, we swap the executor. The higher layers don't care about Bifrost internals.

### Neutral

- The existing 232-provider catalog and 15-routing-strategy policy engine stay in OmniRoute. Bifrost is a *new tier*, not a *replacement* of OmniRoute's higher layers.
- The A2A server, MCP-router, ACP registry, skill registry, and policy engine are unchanged. The 2-tier model is additive.

## Rollout Plan

| Milestone | Version | Date | Action |
|---|---|---|---|
| **M1 (this turn)** | v8.1 | 2026-06-18 | Land `BifrostBackend` executor + provider map + tests. Opt-in per-combo. |
| **M2** | v8.2 | Q3 2026 | Default to Bifrost for the 23+ tier-1 providers; keep OmniRoute's executors as fallback for tier-2/tier-3. |
| **M3** | v8.3 | Q4 2026 | Move semantic cache upstream-of-OmniRoute (Bifrost owns the cache key, OmniRoute reads via metadata). |
| **M4** | v9.0 | 2027 Q1 | Evaluate in-process Go SDK vs sidecar; pick based on benchmark. |

## Cross-References

- `ADR.md` § ADR-031 — Top-level summary.
- `SPEC.md` § 3 (Architecture Overview) — 2-tier diagram.
- `SPEC.md` § 5.2 (Routing Engine) — Bifrost integration.
- `PLAN.md` § 8 (v8.1 Bifrost Integration) — rollout milestones.
- `docs/ROUTING-CONVERGENCE-STATUS.md` — disambiguation + tier map.
- `open-sse/executors/bifrost.ts` — implementation.
- `open-sse/services/bifrostProviderMap.ts` — provider name mapping.
- `docs/frameworks/BIFROST-BACKEND.md` — usage guide.
- `worklogs/2026-06-18-L5-110-bifrost-decision.md` — session worklog.
- [`maximhq/bifrost`](https://github.com/maximhq/bifrost) — upstream Go gateway.
- [`KooshaPari/bifrost`](https://github.com/KooshaPari/bifrost) — vendored fork.
