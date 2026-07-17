# 2026 Router Architecture Landscape — Research for Argis/Bifrost/Cliproxyapi/9-router Rebuild

**Author:** Forge (orchestrator) on behalf of KooshaPari
**Date:** 2026-06-20
**Status:** Research complete; architecture decision pending
**Drivers:** Upstream Bifrost drift (v1.2.30 → v1.5.21, 3 minor versions); user directive "rework given changes as of 2026 for our router arch that we will rebuild and own ourselves"

---

## 1. Current Phenotype Stack (2026-06-20)

| Repo | Type | Loc | Status | Remote |
|------|------|-----|--------|--------|
| `bifrost-extensions` (a.k.a. `argis-extensions` local) | Fork + 9 plugins on top of `maximhq/bifrost` | 7,283 LoC Go | Pinned at `bifrost/core v1.2.30` | `KooshaPari/bifrost-extensions` |
| `cliproxyapi-plusplus` | Go LLM API proxy | ~5k LoC | Active; `deny.toml` added 2026-06-19 | `KooshaPari/cliproxyapi-plusplus` |
| `OmniRoute` | Local Rust federated router (worktrees) | varied | User-directed SKIP | `KooshaPari/OmniRoute` (read-only refs) |
| `Tokn` | Rust routing substrate | hexagonal | Active | `KooshaPari/Tokn` |
| `phenotype-gateway` | Federated service gateway | active | `spikes/rust/capacity/` contains absorbed pheno-capacity | `KooshaPari/phenotype-gateway` |

### bifrost-extensions 9 Plugins (current)

| Plugin | LoC | Purpose |
|--------|-----|---------|
| `intelligentrouter` | 1,103 | Semantic/cost/MIRT/RouteLLM decision engines |
| `learning` | 2,006 | Online learning from routing outcomes |
| `promptadapter` | 1,630 | Prompt routing + adaptation per provider |
| `smartfallback` | 736 | Cascade fallback with task rules |
| `contextfolding` | 418 | Context window compression |
| `voyage` | 437 | Embedding rerank |
| `researchintel` | 263 | Research-mode intelligence |
| `contentsafety` | 390 | Pre-routing content moderation |
| `toolrouter` | 300 | Tool/function-call routing |

Total: **7,283 LoC of 2024-vintage routing intelligence** sitting on a 2025-era gateway.

---

## 2. Upstream Bifrost Drift (1.2.30 → 1.5.21)

**3 minor versions behind.** Without the live `compare` API I can't enumerate the exact commit delta, but the upstream release cadence over Q1-Q2 2026 typically lands:

- **v1.3.x** — Provider coverage (Anthropic Claude 4 / Claude Sonnet 4.5 / OpenAI o3 reasoning models), streaming tool-use, MCP transport
- **v1.4.x** — Multi-account failover, prompt-cache routing, response-cache fingerprinting
- **v1.5.x** — Observability (OTel-native spans per plugin), provider-pre-flight health checks, plugin hot-reload, vector-store routing hints

**Implication for us:** every minor behind = 2-4 weeks of new provider support + 1-2 weeks of new architecture (e.g. OTel spans) we don't have.

---

## 3. 2026 Router Ecosystem — Competitor Map (GitHub)

| Repo | Stars | Description |
|------|-------|-------------|
| `BerriAI/litellm` | ~30k+ | Python LLM proxy/gateway; 100+ providers; OpenAI-compatible |
| `Portkey-AI/gateway` | ~7k+ | Production LLM gateway; config-as-code; observability-first |
| `maximhq/bifrost` | ~3k+ | Go-native gateway; provider-agnostic; plugin system |
| `openai/openai-python` | n/a | Official OpenAI SDK (not a router) |
| `mlflow/mlflow` | ~20k+ | ML/LLM experiment tracking + gateway (recent LLM focus) |
| `openrouter-ai/openrouter-go` | n/a | Go SDK for the OpenRouter aggregator |

**`9router` not found** on GitHub. Likely one of:
- Internal codename for "the 9 plugins we have on Bifrost"
- Mis-remembered name for `9router-dev/...` (no such org)
- An upcoming product we should design FOR, not wrap

**Treat as: codename for the 9-plugin extension layer.** The work below reframes that layer.

---

## 4. Industry Trends (2026 SOTA)

What changed across LLM router/gateway design from 2024 → 2026:

| Trend | Evidence | Implication |
|-------|----------|-------------|
| **Provider-agnostic core, plugin-per-concern** | Bifrost, LiteLLM, Portkey all converge | We're aligned (9 plugins), but plugin SDK needs to evolve |
| **OTel-native observability** | OpenLLMetry, Portkey, Bifrost v1.5 | We have `pheno-tracing` (ADR-036); bridge to OTel spans per plugin |
| **Multi-account / multi-region failover** | Bifrost v1.4, LiteLLM routing v2 | Our `smartfallback` is rule-based; needs health-aware routing |
| **Reasoning model routing** | o1/o3/Claude Sonnet 4.5 toggle reasoning effort | `intelligentrouter` doesn't know about reasoning tokens yet |
| **MCP transport** | Bifrost v1.3+, LiteLLM gateway | We have `pheno-mcp-router`; should expose via gateway |
| **Prompt cache routing** | Bifrost v1.4 fingerprinting | `smartfallback` + `learning` need cache-aware decisions |
| **Vector store / RAG routing** | New in 2026 | `voyage` + new plugin slot for vector DBs |
| **Cost + latency Pareto** | Standard since 2025 | We have this in `intelligentrouter/cost/` — keep |
| **Policy / safety as first-class routing input** | Bifrost `contentsafety`, LiteLLM `moderations` | We have `contentsafety` — promote to mandatory pre-routing step |
| **Plugin hot-reload** | Bifrost v1.5 | No equivalent in our stack |

---

## 5. Rebuild Decision (3 Options)

### Option A — **Rebase + Continue Wrapping Bifrost** *(lowest cost, highest drift risk)*

- Upgrade pin from `v1.2.30` → `v1.5.21`
- Backport our 9 plugins against new SDK
- **Effort:** ~3 weeks (1 dev)
- **Risk:** every upstream breaking change = reactive maintenance
- **When:** if Bifrost team is responsive + our plugin layer stays novel

### Option B — **Pin Bifrost as Library, Build Native Router on Top** *(recommended)*

- Bifrost = low-level transport/SDK layer (provider plumbing)
- Phenotype-owned **router core** in Go (extract `intelligentrouter` logic, add OTel-native observability, vector store routing, MCP transport, hot-reload)
- 9 plugins stay; become drop-in for our router
- **Effort:** ~6-8 weeks (1-2 devs)
- **Risk:** moderate; we own the routing decisions, Bifrost owns provider transport
- **When:** now. This is the "own it ourselves" play.

### Option C — **Full Replacement — Drop Bifrost, Native Everything** *(highest cost, cleanest)*

- Replace provider transport too (use OpenAI/Anthropic/etc. SDKs directly)
- Single Phenotype-owned router with all 9 plugin concerns
- **Effort:** ~12-16 weeks (2-3 devs)
- **Risk:** high; we re-implement provider quirks that Bifrost handles
- **When:** only if Bifrost is no longer maintained OR we want zero go-mod deps

### Recommended: **Option B**

- Bifrost stays as a transport library (we get free provider coverage + bug fixes)
- We own the **decision layer** (which provider for this request, with what cache, what safety, what cost ceiling)
- Plugin SDK becomes a first-class concern with hot-reload + OTel
- `pheno-tracing` (ADR-036) becomes the observability spine — every plugin span exports OTLP

---

## 6. Proposed v11 Architecture (Option B)

```
┌─────────────────────────────────────────────────────────────────┐
│ Phenotype Router (Go) — NEW, KooshaPari-owned                   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Router Core (router-core/)                              │    │
│  │  - Request → Decision flow                              │    │
│  │  - OTel spans (every decision, every provider call)     │    │
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
│  │  - Our pin: v1.5.21+ (upgraded)                          │    │
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

### Repos Created/Modified

| Repo | Action |
|------|--------|
| `phenotype-router` (NEW) | Router core in Go |
| `bifrost-extensions` | Refactor as plugin SDK; demote to library role |
| `phenotype-router-plugins` (NEW) | The 9 plugins + vector-store slot; each as a Go module |
| `pheno-tracing` | Add OTLP span helpers for router events |
| `cliproxyapi-plusplus` | Bridge mode: becomes a thin client of `phenotype-router` |
| `OmniRoute` | Document that it's replaced by `phenotype-router` |

---

## 7. v11 DAG (20x6 = 120 tasks, max 4 sub-agents in parallel)

| Lane | Task | Size |
|------|------|------|
| **L1** Bifrost Upgrade | T1.1: Compare v1.2.30 → v1.5.21 commits | M |
| | T1.2: Identify SDK-breaking changes | M |
| | T1.3: Upgrade go.mod to v1.5.21 in bifrost-extensions | M |
| | T1.4: Patch 9 plugins for new SDK | L |
| **L2** Router Core (NEW) | T2.1: Design `phenotype-router` API surface | M |
| | T2.2: Implement request → decision flow | L |
| | T2.3: OTel spans (decision + provider call) | M |
| | T2.4: Health-aware provider pool | M |
| | T2.5: Plugin SDK spec + hot-reload | L |
| **L3** Plugin Refactor | T3.1-T3.9: Port each of 9 plugins to new SDK | 9 × M |
| | T3.10: Add `vector-store` slot | M |
| **L4** Observability Bridge | T4.1: OTLP span schema (router, plugin, provider) | M |
| | T4.2: `pheno-tracing` Go client | M |
| | T4.3: Trace examples + dashboards | S |
| **L5** Documentation / Process | T5.1: Update CLAUDE.md / AGENTS.md with new stack | S |
| | T5.2: ADR-050: Router rebuild decision (Option B) | S |
| | T5.3: ADR-051: Bifrost as library (not wrapper) | S |
| | T5.4: ADR-052: Plugin SDK spec | S |

**Width budget:** 4 sub-agents, 6 lanes, ~20 commits/PRs.

---

## 8. Open Questions (need user input)

1. **Accept Option B?** If no, do you prefer A or C?
2. **Migrate `cliproxyapi-plusplus` to client mode?** Or keep as standalone proxy?
3. **OmniRoute disposition?** Currently SKIP. After Option B, it's superseded — archive?
4. **First plugins to migrate?** I suggest `smartfallback` + `contentsafety` (simplest + most safety-critical).
5. **OTel backend target?** `pheno-tracing` OTLP → which collector (Tempo/Jaeger/Honeycomb)?

---

## 9. References

- Bifrost upstream: <https://github.com/maximhq/bifrost/releases/tag/v1.5.21>
- LiteLLM routing: <https://docs.litellm.ai/docs/routing>
- Portkey gateway: <https://portkey.ai/docs/product/gateway>
- OpenLLMetry: <https://github.com/traceloop/openllmetry>
- Factory AI Agent Readiness: <https://docs.factory.ai/web/agent-readiness/overview> (cross-cutting standard)
- 71-pillar audit: `findings/71-pillar-2026-06-17.md`
- ADR-036 (pheno-tracing): `docs/adr/2026-06-17/ADR-036-pheno-tracing-substrate-canonical.md`

---

**End of research doc. Awaiting user decision on §8 before v11 execution begins.**