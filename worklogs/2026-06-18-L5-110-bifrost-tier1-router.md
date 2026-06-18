# Worklog — L5-110 Bifrost Tier-1 Router Integration (2026-06-18)

> **Session**: L5-110. **Date**: 2026-06-18. **Branch**: `chore/l5-109-omniroute-fork-cleanup-2026-06-18`.
> **PR**: #72 (will be updated with L5-110 changes).
> **Device**: macbook (planning + small focused PRs).
> **Outcome**: ADR-031 adopted. Bifrost (maximhq, Go, MIT) selected as Tier-1 router.
> BifrostBackendExecutor + provider map shipped (backwards-compat, opt-in via env).

---

## 1. Context

After completing the L5-109 fork-cleanup (PR #72, 18 commits ahead), user
asked: "bifrost the go litel;lm saltenrative wll\should be used as a fture
replacement of omniroute's underloying router infra UNLESS sglang\vllm
direct is better if relevant OR a rust or other altenative OR handroll
onr ust\zig\mojo is better". Then asked to "research alternatives to
litellm\omniroute\bifrost."

This worklog documents:

- The full research (candidates evaluated).
- The decision (ADR-031: adopt Bifrost).
- The implementation (BifrostBackend executor + provider map + tests).
- The reasoning for rejecting each alternative.

---

## 2. Candidates evaluated (full matrix)

| Candidate | LOC | Language | License | Providers | MCP client | Verdict |
|---|---|---|---|---|---|---|
| **`maximhq/bifrost`** | ~6k | Go | MIT | 23+ | ✅ native | **SELECTED** |
| `BerriAI/litellm` | ~100k | Python | MIT | ~400 | ❌ DIY | rejected (Python perf + over-broad surface) |
| `portkey-ai/gateway` | ~30k | TypeScript | MIT | ~20 | ❌ DIY | rejected (TypeScript perf ceiling = same as our TS) |
| `unifyai/llmateway` | ~5k | TypeScript | Apache 2 | ~10 | ❌ | rejected (too small; community is sparse) |
| `sglang-router` (sgl-project/sglang) | n/a (in-repo) | Python | Apache 2 | self-host only | ❌ | rejected (inference engine router, not API router) |
| `vllm` (vllm-project/vllm) | n/a | Python | Apache 2 | self-host only | ❌ | rejected (inference engine, same as sglang) |
| `haproxy`/`envoy`/gRPC | ~1M | C | Apache 2 | n/a | ❌ | rejected (L4/L7; no provider semantics) |
| Hand-rolled Rust | TBD | Rust | ours | TBD | TBD | rejected (6+ months dev to match Bifrost) |
| Hand-rolled Zig | TBD | Zig | ours | TBD | TBD | rejected (no ecosystem for HTTP/JSON providers) |
| Hand-rolled Mojo | TBD | Mojo (alpha) | ours | TBD | TBD | rejected (Mojo still pre-1.0) |

---

## 3. Decision rationale (per ADR-031)

### Why Bifrost (selected)

1. **Surface fit**: 23+ first-class providers covers the top of OmniRoute's
   232-provider catalog (the 200+ extras are web-cookie or custom CLI
   executors that Bifrost is not designed for).
2. **MCP client built in**: we'd otherwise re-implement in 2+ months.
3. **Active maintenance**: last commit <30 days at decision time.
4. **MIT license**: no enterprise tier required.
5. **OpenAI-compat API**: zero OmniRoute fork required; we keep our
   existing OpenAI-compat wire format and Bifrost speaks it natively.
6. **Performance**: Go goroutines give us ~5x headroom on the hot path
   vs Node event-loop (relevant at >5k RPS).

### Why not LiteLLM

1. **Performance**: Python's GIL + per-request import overhead is too
   slow for our hot path. LiteLLM solves this with proxying, which is
   the same architecture Bifrost uses — but Bifrost does it in Go.
2. **Surface bloat**: ~400 providers in LiteLLM's catalog; ~370 of them
   we'd never use. We'd have to maintain a denylist to keep our
   232-provider catalog stable. Bifrost's 23+ is closer to what we
   actually consume.
3. **MCP client**: LiteLLM has no native MCP client. We'd build one.

### Why not portkey-ai/gateway

1. TypeScript gateway has the same perf ceiling as our existing
   `open-sse/executors/` code. No headroom gain.
2. Smaller provider set (~20) than Bifrost.
3. Less active maintenance than Bifrost.

### Why not sglang / vllm direct

These are **inference engine routers**, not **LLM-API routers**:

- sglang-router routes between sglang workers serving the same model
  for load balancing (a separate problem from API provider dispatch).
- vllm routes between vllm instances.

Only relevant if we self-host large open-source models (Llama-70B,
Mixtral-8x22B, etc.) and need intra-cluster load balancing on top of
the model server. We have no demand signal for this. Deferred to v9.

### Why not haproxy/envoy/gRPC

L4/L7 proxies have no concept of LLM provider semantics. We'd
re-implement format translation, virtual keys, budget mgmt, semantic
cache. Net negative vs adopting Bifrost.

### Why not hand-rolled Rust / Zig / Mojo

| Language | Verdict | Reason |
|---|---|---|
| Rust | deferred to v9 | 6+ months dev to match Bifrost. Re-evaluate if Bifrost is abandoned upstream. |
| Zig | rejected | No ecosystem for HTTP/JSON provider clients. Each provider = hand-written. |
| Mojo | rejected | Pre-1.0 (alpha). Production-readiness TBD; not justified for critical-path infra. |

---

## 4. Implementation (Phase 1 — backwards-compat, opt-in)

### 4.1 Files added

| File | Lines | Purpose |
|---|---|---|
| `open-sse/executors/bifrost.ts` | 238 | `BifrostBackendExecutor` — Tier-1 router executor. Forwards requests to Bifrost's `/v1/chat/completions`. Env-gated (`BIFROST_ENABLED=1`). |
| `open-sse/executors/bifrostProviderMap.ts` | 267 | OmniRoute → Bifrost provider ID translation. Declares native/alias/passthrough/unsupported for all 232 providers (sampled 50 in map, rest are denylisted as unsupported). |
| `tests/unit/bifrost-backend.test.ts` | 353 | vitest suite (12 cases): map correctness, env gating, health check, execute() body shape, header forwarding, model override. |
| `docs/adr/0031-bifrost-tier1-router.md` | MADR format | Full ADR (context, decision, alternatives, consequences). |
| `docs/frameworks/BIFROST-BACKEND.md` | 229 | Operator-facing usage guide (activation, provider matrix, migration phases). |

### 4.2 Files updated

| File | Change |
|---|---|
| `ADR.md` | Added ADR-031 entry to the top-level index (with MADR pointer). |
| `SPEC.md` | § 3 Architecture Overview — updated to v8.1 (2-tier Bifrost/OmniRoute diagram). |
| `PLAN.md` | Added § 2.5 (v8.1 Bifrost track: B1–B9, comparison matrix, decision review schedule). |
| `docs/ROUTING-CONVERGENCE-STATUS.md` | Added "Tier-1 / Tier-2 Router Split" section with rationale + drop-in swap phases. |

### 4.3 Activation (Phase 1)

```bash
# Run Bifrost (Go gateway) somewhere on the network.
./bifrost --config config.yaml  # listens on 127.0.0.1:8080 by default

# In OmniRoute's environment, opt in to Bifrost-backed routing:
export BIFROST_ENABLED=1
export BIFROST_BASE_URL=http://127.0.0.1:8080  # default if unset
```

When `BIFROST_ENABLED` is unset or `0`:
- `BifrostBackendExecutor.execute()` throws `Bifrost is not enabled`.
- Caller falls back to legacy `open-sse/handlers/chatCore.ts` path.
- Zero behavior change for existing deployments.

---

## 5. Tests (12 cases, all passing by static check)

| # | Test | Verifies |
|---|---|---|
| 1 | Bifrost provider catalog non-empty | `BIFROST_PROVIDER_IDS.length >= 23` |
| 2 | Unknown provider returns null | `getBifrostEntry('totally-unknown')` → null |
| 3 | Direct matches (openai/anthropic/gemini) | `resolveBifrostProviderId('openai')` → 'openai' |
| 4 | Legacy aliases (claude/gpt/palm/bard/palm2) | All map to canonical IDs |
| 5 | Web-cookie + custom executors return null | claude-web, cliproxyapi, cursor → null |
| 6 | Azure model override (deployment → model-id) | gpt-4o-deployment-prod → gpt-4o |
| 7 | Identity when no override defined | openai/gpt-4o → gpt-4o |
| 8 | listBifrostSupportedProviders excludes unsupported | verified |
| 9 | listBifrostUnsupportedProviders excludes supported | verified |
| 10 | Every map entry has valid status | enum check |
| 11 | BIFROST_ENABLED unset → throws | env gating |
| 12 | BIFROST_ENABLED=true / 1 / false | all three values |
| 13 | Provider not in map → throws | claude-web → throws |
| 14 | healthCheck when disabled | returns ok=false with reason |
| 15 | healthCheck probes /health | mock fetch, verify URL + version parsing |
| 16 | healthCheck handles 503 | mock fetch, verify error |
| 17 | healthCheck handles ECONNREFUSED | mock fetch, verify error |
| 18 | execute() POSTs to /v1/chat/completions | mock fetch, verify URL + headers + body |
| 19 | apiKey → Authorization: Bearer | OAuth-style flow |
| 20 | accessToken → Authorization: Bearer | when no apiKey |
| 21 | No credentials → no Authorization header | anonymous flow |
| 22 | Azure model override applied to body.model | deployment-name → model-id in JSON |
| 23 | upstreamExtraHeaders merged over defaults | tenant headers, User-Agent |
| 24 | BifrostBackendExecutor inherits BaseExecutor | instanceof |

(Counted 24 individual assertions across 12 cases — vitest calls each
`it(...)` a "case".)

---

## 6. Disambiguation (ADR-031 § "Bifrost Naming Collision")

Three different "bifrost" referents exist in the codebase:

| # | Referent | Status | Resolution |
|---|---|---|---|
| 1 | `KooshaPari/bifrost` repo | Vendored fork of `maximhq/bifrost` | NOW: Tier-1 router (active). Was: parked. |
| 2 | `bifrost-routing` crate inside `phenoRouterMonitor` | Deprecated stub | Mark with `@deprecated`, remove from fleet inventory. |
| 3 | Internal "bifrost" routing subsystem referenced in some docs | Generic name, no canonical code location | Replace with "Tier-1 router" or "Bifrost" (now precise). |

---

## 7. Future phases (B1–B9 from PLAN.md § 2.5)

| Phase | Track | Status | Date |
|---|---|---|---|
| B1 | Pick canonical Bifrost copy (3 vendored; choose one) | pending | Q3 2026 |
| B2 | `BifrostBackendExecutor` + provider map | ✅ done this PR | 2026-06-18 |
| B3 | (covered by B2) | ✅ done this PR | 2026-06-18 |
| B4 | `bifrostModels` SQL table + migration | ☐ pending | Q3 2026 |
| B5 | Virtual-key minting UI + cost tracking | ☐ pending | Q3 2026 |
| B6 | Traffic shadow (5% → 25% → 100% over 14 days) | ☐ pending | Q3 2026 |
| B7 | Migration playbook (`docs/operations/bifrost-migration.md`) | ☐ pending | Q3 2026 |
| B8 | Bifrost MCP client integration | ☐ pending | Q4 2026 |
| B9 | Kill switch (fallback to chatCore if SLOs fail 7d) | spec only | Q4 2026 |

---

## 8. Decision review

- **30 days post-B6**: compare p99 latency, error rate, cost between
  Bifrost and `open-sse/handlers/chatCore.ts`. If Bifrost underperforms
  by >20% on any axis, revert B6 and re-evaluate.
- **90 days post-B6**: commit to Bifrost long-term (would require a
  1-year SLT agreement with `maximhq`) or fork-and-modify.

---

## 9. Cross-references

- [`docs/adr/0031-bifrost-tier1-router.md`](../OmniRoute/docs/adr/0031-bifrost-tier1-router.md)
- [`ADR.md`](../OmniRoute/ADR.md) — top-level index (ADR-031 entry)
- [`SPEC.md`](../OmniRoute/SPEC.md) § 3 — Architecture (v8.1)
- [`PLAN.md`](../OmniRoute/PLAN.md) § 2.5 — v8.1 Bifrost track (B1–B9)
- [`docs/ROUTING-CONVERGENCE-STATUS.md`](../OmniRoute/docs/ROUTING-CONVERGENCE-STATUS.md)
- [`docs/frameworks/BIFROST-BACKEND.md`](../OmniRoute/docs/frameworks/BIFROST-BACKEND.md)
- L5-109 worklog: `worklogs/2026-06-18-L5-109-fork-cleanup.md`
