# Architecture Decision Records (ADR) — Top-Level Index

> **Status**: Living document. Each ADR is immutable once accepted; changes
> require a new ADR that supersedes the old one.
> **Last updated**: 2026-06-18 (this turn).
> **Owner**: OmniRoute core team (see `CODEOWNERS`).

This file is the **top-level index** of architecture decisions for `OmniRoute`.
The detailed ADR files live in `docs/adr/`. This index provides the
chronological + thematic view.

---

## How to Read

| Term | Meaning |
|---|---|
| **Status: Accepted** | Decision is in effect. Implementation must conform. |
| **Status: In Progress** | Decision is partially implemented; finalize or supersede. |
| **Status: Deprecated** | Decision is no longer in effect; superseded by another ADR. |
| **Status: Superseded** | Decision is invalidated; see the superseding ADR. |
| **Date format** | ISO 8601 (`YYYY-MM-DD`). |
| **Author** | Person/system that wrote the ADR. |
| **Driver** | The most recent commit/PR that closed or moved the ADR. |

---

## ADR Index

| ID | Title | Status | Date | Driver |
|---|---|---|---|---|
| **ADR-001** | [Repository Hygiene Baseline (2026-06-08)](#adr-001--repository-hygiene-baseline-2026-06-08) | Accepted | 2026-06-08 | — |
| **ADR-002** | [Nav Restructure E2E Restoration (2026-06-13)](#adr-002--nav-restructure-e2e-restoration-2026-06-13) | In Progress | 2026-06-13 | `chore/l5-109-omniroute-fork-cleanup-2026-06-18` |
| **ADR-003** | [Dual Dependency Automation (2026-06-13)](#adr-003--dual-dependency-automation-2026-06-13) | Accepted | 2026-06-13 | — |
| **ADR-004** | [A2A agentDispatch Skill (2026-06-18)](#adr-004--a2a-agentdispatch-skill-2026-06-18) | Accepted | 2026-06-18 | `chore/l5-109-omniroute-fork-cleanup-2026-06-18` |
| **ADR-005** | [CI Concurrency Hardening (2026-06-18)](#adr-005--ci-concurrency-hardening-2026-06-18) | Accepted | 2026-06-18 | `chore/l5-109-omniroute-fork-cleanup-2026-06-18` |
| **ADR-006** | [Doc Accuracy Gate (2026-06-18)](#adr-006--doc-accuracy-gate-2026-06-18) | Accepted | 2026-06-18 | `chore/l5-109-omniroute-fork-cleanup-2026-06-18` |
| **ADR-007** | [Phenotype-Org Convergence Supremacy (2026-06-18)](#adr-007--phenotype-org-convergence-supremacy-2026-06-18) | Accepted | 2026-06-18 | `chore/l5-109-omniroute-fork-cleanup-2026-06-18` |
| **ADR-008** | [Pre-Push Hook Disabled (2026-06-18)](#adr-008--pre-push-hook-disabled-2026-06-18) | Accepted | 2026-06-18 | `chore/l5-109-omniroute-fork-cleanup-2026-06-18` |
| **ADR-009** | [Bifrost Disambiguation (2026-06-18)](#adr-009--bifrost-disambiguation-2026-06-18) | Accepted | 2026-06-18 | — |
| **ADR-010** | [71-Pillar Audit Adoption Deferred (2026-06-18)](#adr-010--71-pillar-audit-adoption-deferred-2026-06-18) | Accepted | 2026-06-18 | — |
| **ADR-031** | [Bifrost as Tier-1 Router Layer (2026-06-18)](#adr-031--bifrost-as-tier-1-router-layer-2026-06-18) | Accepted | 2026-06-18 | `chore/l5-109-omniroute-fork-cleanup-2026-06-18` |
| **0031** | [Bifrost as Tier-1 Router Layer (MADR)](docs/adr/0031-bifrost-tier1-router.md) | Accepted | 2026-06-18 | — |
| **0001** | [Record Architecture Decisions (template)](docs/adr/0001-record-architecture-decisions.md) | Accepted | 2026-05-30 | MADR template |
| **0002** | [Test Runner: vitest vs jest](docs/adr/0002-test-runner-vitest-vs-jest.md) | Accepted | 2026-06-08 | — |
| **0003** | [Coverage Floor 70%](docs/adr/0003-coverage-floor-70-pct.md) | Accepted | 2026-06-08 | — |
| **0004** | [Decomposition into Packages](docs/adr/0004-decomposition-into-packages.md) | Superseded | 2026-06-08 | **ADR-007** |
| **0005** | [i18n Gitignore Strategy](docs/adr/0005-i18n-gitignore-strategy.md) | Accepted | 2026-06-08 | — |
| **001-canonical** | [OmniRoute as Canonical Routing Project](docs/ADR-001-canonical-routing.md) | Accepted | 2026-05-30 | — |

---

## ADR-001 — Repository Hygiene Baseline (2026-06-08)

**Status:** Accepted
**Context:** Prior audit identified gaps in governance, CI, and e2e coverage.
**Decision:** Adopt fleet-wide hygiene standards (FUNDING, CITATION, SUPPORT, OpenSSF Scorecard, security-scans, grouped Dependabot, CODEOWNERS subtree ownership, cliff.toml for changelog automation).
**Consequences:** Repo hygiene score improved from 4.4/5 to ~4.7/5. Reduced single-point-of-failure in CODEOWNERS.

---

## ADR-002 — Nav Restructure E2E Restoration (2026-06-13)

**Status:** In Progress
**Context:** Nav Restructure refactor moved settings to settings/general, split logs into subpages, and moved protocol tabs out of /endpoint. Six Playwright specs were temporarily excluded.
**Decision:** Re-enable the 3 surviving specs (memory-settings, resilience-plan-alignment, settings-toggles) after verifying selectors against the new nav. Remove 3 orphaned entries (analytics-tabs, protocol-visibility, skills-marketplace) whose files no longer exist.
**Consequences:** Restores e2e coverage on the most-touched product surfaces.

---

## ADR-003 — Dual Dependency Automation (2026-06-13)

**Status:** Accepted
**Context:** Fleet uses both Dependabot and Renovate; 50/169 repos carry Renovate.
**Decision:** Add Renovate alongside existing Dependabot to increase automation coverage and reduce missed updates.
**Consequences:** May create duplicate PRs for the same updates; requires coordination to avoid noise.

---

## ADR-004 — A2A agentDispatch Skill (2026-06-18)

**Status:** Accepted
**Driver:** `chore/l5-109-omniroute-fork-cleanup-2026-06-18` (cherry-picked from `feat/a2a-agent-dispatch`)
**Context:** The A2A server (see `SPEC.md` § 7.2) shipped with 6 built-in skills (`smartRouting`, `quotaManagement`, `providerDiscovery`, `costAnalysis`, `healthReport`, `listCapabilities`). Peer agents needed a way to **invoke another agent's skill** through the A2A surface, not just discover it.
**Decision:** Add a 7th built-in A2A skill `agentDispatch` that wraps `POST /a2a` to a remote agent (looked up via ACP registry or explicit URL), forwards the message, and streams the response back. The skill supports:
- Sync (`message/send`) and streaming (`message/stream`) modes.
- Per-skill scope gating via `OMNIROUTE_MCP_SCOPES` (`AGENT_DISPATCH`).
- Per-call cost budget enforcement.
- Agent Card preflight (`/.well-known/agent.json` lookup + cache).

**Implementation:**
- `src/lib/a2a/skills/agentDispatch.ts` — the skill handler.
- `src/lib/a2a/skills/agentDispatch.test.ts` — unit tests (mock remote agent).
- `docs/frameworks/A2A-SERVER.md` — updated with usage section.

**Consequences:**
- Peer agents can chain skills across organizations.
- New audit log entry type: `a2a_agent_dispatch`.
- Cross-cluster routing becomes possible (planned v9 — see `SPEC.md` § 16.5).

---

## ADR-005 — CI Concurrency Hardening (2026-06-18)

**Status:** Accepted
**Driver:** `chore/l5-109-omniroute-fork-cleanup-2026-06-18` (cherry-picked from `omniroute/concurrency-hardening` + manual workflow updates)
**Context:** CI workflows on long-running PRs were running 5+ redundant jobs in parallel because new pushes didn't cancel old runs. This wasted ~40 CI minutes per PR.
**Decision:** Add `concurrency` blocks to all CI workflows:
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}
```
- Apply to: `ci.yml`, `scorecard.yml`, `audit-ratchet.yml`, `audit.yml`, `renovate.yml`, all integration workflows.
- Do NOT cancel on `main` (production builds must complete).
- `cancel-in-progress` is gated by `github.ref != 'refs/heads/main'` so release branches keep running.

**Consequences:**
- -40% CI minutes per PR.
- No effect on main / release branches.
- Faster PR feedback (latest push wins).

---

## ADR-006 — Doc Accuracy Gate (2026-06-18)

**Status:** Accepted
**Driver:** `chore/l5-109-omniroute-fork-cleanup-2026-06-18` (formalized from existing `npm run check:fabricated-docs`)
**Context:** AI-generated docs in the `docs/` tree frequently contain **plausible-but-unverified specifics** (file paths, function names, route paths, env vars, counts). These cost more than missing docs because people trust and act on them.
**Decision:** Enforce the **doc accuracy gate** in CI:
- `scripts/check/check-fabricated-docs.mjs` extracts every route path, env var, hook name, function name, file reference, and count from `docs/**/*.md` and verifies each one against the codebase.
- Failure of the gate **blocks the PR**.
- Counts (provider count, MCP tool count, etc.) must be derived from grep/wc at the time the doc is written or refreshed via `npm run check:docs-counts`.
- Live counts in `AGENTS.md` (e.g., `providers 232 · MCP tools 87`) must be refreshed with `npm run check:docs-all` before each release.

**Consequences:**
- 0 fabricated claims in shipped docs (enforced).
- Docs can be slightly out-of-date (counts off by 1-2) but never wrong.
- Doc authors must `grep` before writing anything specific.

---

## ADR-007 — Phenotype-Org Convergence Supremacy (2026-06-18)

**Status:** Accepted
**Supersedes:** `docs/adr/0004-decomposition-into-packages.md`
**Context:** The 2026-06-08 decomposition plan (ADR-0004) proposed splitting `OmniRoute` into 4 packages. In practice, the **Phenotype-org convergence** (`docs/ADR-001-canonical-routing.md`) requires the opposite: OmniRoute absorbs peer projects (phenoAI, phenoRouterMonitor, Tokn, helios-router), not the other way around. Splitting OmniRoute now would block convergence.
**Decision:** **Defer the OmniRoute decomposition indefinitely.** The "decomposition roadmap" in `PLAN.md` § 4 is replaced by the "convergence plan" in `PLAN.md` § 5. The 3 items retained (i18n gitignore, @omniroute/sdk extraction, docs/ extraction) are now optional and post-v9.
**Consequences:**
- Convergence work is unblocked.
- `OmniRoute` remains a single-repo monolith (with `open-sse/` as an internal workspace pkg, not an external npm pkg).
- The decomposition-era spec at `docs/archive/SPEC-v1.md` is preserved for historical reference.

---

## ADR-008 — Pre-Push Hook Disabled (2026-06-18)

**Status:** Accepted (with sunset date: 2026-08-01)
**Context:** The pre-push hook (`.husky/pre-push`) was running `npm test` from a `cd` that wasn't anchored to the repo root, plus `lefthook run pre-push`. The hook failed on every push because `package.json` doesn't exist at the repo root — it's nested under `src/`. The hook also tried to run tests before push, which is redundant with CI.
**Decision:** **Disable `.husky/pre-push` and `lefthook pre-push`** for now. Re-enable on 2026-08-01 with a properly anchored `npm test --workspaces` (or `pnpm test -r`) invocation, run from the repo root, with the test matrix scoped to changed paths only (`--changed`).
**Consequences:**
- Commits land cleanly without manual hook bypass.
- CI still runs the full test matrix on every push.
- Hook sunset tracked in `STATUS.md` and `PLAN.md` § 7.

---

## ADR-009 — Bifrost Disambiguation (2026-06-18)

**Status:** Accepted
**Context:** Three different "bifrost" referents exist in the Phenotype org, causing navigation confusion in `docs/ROUTING-CONVERGENCE-STATUS.md` and `docs/ADR-001-canonical-routing.md`:
1. `KooshaPari/bifrost` repo = vendored **maximhq** Go gateway fork. NON-peer.
2. ADR-001's "bifrost" = Phenotype routing substrate (in `pheno` monorepo).
3. `crates/bifrost-routing` inside `phenoRouterMonitor` = a deprecated stub (no Cargo.toml).
**Decision:** **Disambiguate explicitly in all routing-related docs**:
- Use **`KooshaPari/bifrost`** for the vendored fork (referent 1).
- Use **`phenotype-routing`** (proposed rename) or **`Tokn::tokenledger::routing`** for the canonical substrate (referent 2).
- Use **`@deprecated bifrost-routing`** for the stub (referent 3), with a clear note that it is NOT a peer.
- `docs/ADR-001-canonical-routing.md` already contains the 2026-06-03 disambiguation note; `docs/ROUTING-CONVERGENCE-STATUS.md` mirrors it.

**Consequences:**
- Zero ambiguity when reading routing docs.
- Cross-org references resolve to a single canonical substrate.
- The proposed rename `(2) → phenotype-routing` is tracked in `PLAN.md` § 5.

---

## ADR-010 — 71-Pillar Audit Adoption Deferred (2026-06-18)

**Status:** Accepted
**Context:** The Phenotype org is migrating from the 30-pillar framework to the 71-pillar framework (1.4× coverage of quality dimensions). The 30-pillar audit is still in use across the fleet (`audit_scorecard.json` snapshot).
**Decision:** **Keep the 30-pillar framework for OmniRoute in Q3 2026.** Migrate to 71-pillar in Q4 2026 with a crosswalk doc mapping the existing 30 pillars to the new 71. Reason: the v3.8.24 release cycle is mid-flight; deferring the audit-framework switch avoids mid-release re-scoring noise.
**Consequences:**
- `audit_scorecard.json` continues to use 30-pillar format through Q3 2026.
- Migration tracked in `PLAN.md` § 3.5.

---

## Cross-References

- `docs/adr/0001-record-architecture-decisions.md` — MADR template.
- `docs/ADR-001-canonical-routing.md` — Phenotype-org routing convergence.
- `docs/ROUTING-CONVERGENCE-STATUS.md` — live convergence scoreboard.
- `SPEC.md` § 13 — Convergence section.
- `PLAN.md` § 5 — Convergence plan.
- `AGENTS.md` § Code Style — ADR-process note.

---

## How to Add a New ADR

1. Create `docs/adr/NNNN-short-slug.md` using the MADR template
   (`docs/adr/0001-record-architecture-decisions.md`).
2. Add a one-line summary to the index table in this file.
3. Update any cross-referenced docs (SPEC.md, PLAN.md, AGENTS.md).
4. Mark the ADR `Status: Accepted` (or `In Progress` if partial).
5. Open a PR with label `adr`.

**Numbering**: lower numbers (0001–0005) are reserved for the original
decomposition-era ADRs. New ADRs use 4-digit numbers starting at 0006,
OR a topical prefix (e.g., `ADR-canonical`, `ADR-001` for top-level
Phenotype-org decisions). Avoid mixing styles within a section.

---

## ADR-031 — Bifrost as Tier-1 Router Layer (2026-06-18)

**Status:** Accepted
**Driver:** `chore/l5-109-omniroute-fork-cleanup-2026-06-18` (L5-110)
**Supersedes:** None (additive — defines new tier alongside existing router).
**MADR:** [`docs/adr/0031-bifrost-tier1-router.md`](docs/adr/0031-bifrost-tier1-router.md) (full MADR-format analysis with comparison matrix, evidence, and rollout plan).

### Context

OmniRoute's `open-sse/` engine currently combines **5 protocol surfaces** (OpenAI-compat, Anthropic-compat, Responses-API, A2A-JSON-RPC, MCP) and **3 router layers** (provider dispatch, combo resolution, 12-factor Auto-Combo scoring) in a single TypeScript process. The hot path is `open-sse/handlers/chatCore.ts` (5,811 LOC) and `open-sse/services/combo.ts` (5,202 LOC). At 5k RPS this path spends a non-trivial fraction of wall time in:

- Provider catalog lookups (`src/shared/constants/providers.ts`, 232 entries).
- OpenAI ↔ Anthropic ↔ Gemini format translation (`open-sse/translator/`).
- Credential resolution and per-key account health checks.
- Per-request circuit-breaker state evaluation.
- SSE stream chunking and reconnect bookkeeping.

The Phenotype org has been pointing at the **maximhq `bifrost`** Go AI gateway (vendored at `KooshaPari/bifrost`, locally available at `pheno/bifrost`, `HexaKit/bifrost`, `Pyron/bifrost`, `argis-extensions/bifrost`) as a candidate for absorbing this low-level routing work. The user directive (2026-06-18) asked us to evaluate the candidate set — Bifrost vs sglang/vllm direct vs Rust alternative vs hand-roll Rust/Zig/Mojo — and pick the right one.

### Candidate Set (researched 2026-06-18)

| Candidate | Lang | License | Stars | Fit-for-router-role | Decision |
|---|---|---|---|---|---|
| **`maximhq/bifrost`** (vendored as `KooshaPari/bifrost`) | Go | MIT | 5.9k | **High** — 23+ providers, sub-100μs overhead at 5k RPS, automatic fallbacks, load balancing, MCP, semantic cache, virtual keys, budget mgmt, observability, drop-in OpenAI compat | **✅ ADOPT** |
| `sgl-model-gateway` (in `sgl-project/sglang`, Rust) | Rust | Apache-2.0 | (sglang: 17k) | Medium — KV-aware routing across SGLang workers, 5 LB strategies; **specialized for SGLang serving clusters**, not multi-provider | ❌ (specialization mismatch) |
| `vllm` (`vllm-project/vllm`, Python+Rust) | Python/Rust | Apache-2.0 | 83.2k | **None** — inference engine, not a router. vLLM serves an OpenAI-compat API per model; it does NOT route across providers. | ❌ (wrong role) |
| `sglang` (`sgl-project/sglang`) | Python/Rust | Apache-2.0 | 17k | **None** — same as vLLM. Inference engine with model gateway *mode*; not a multi-provider router. | ❌ (wrong role) |
| LiteLLM (`BerriAI/litellm`, Python) | Python | MIT (core) | 50.8k | High — incumbent, 100+ providers, mature; **but Python → 8ms P95 baseline overhead**, mature but slow. | ❌ (perf mismatch with the 50x Bifrost benchmark) |
| Envoy AI Gateway (`envoyproxy/ai-gateway`, Go) | Go | Apache-2.0 | 1.8k | Medium — CNCF-grade, two-tier pattern with endpoint picker; **lower-level LLM-specific features than Bifrost**. | ❌ (Bifrost has equivalent Go perf with more LLM-specific surface) |
| Hand-roll on Rust | Rust | (n/a) | n/a | Strong perf potential, but **massive 6-12 month effort** with no ecosystem reuse; OmniRoute's value is the higher layers (A2A, MCP, ACP), not the router. | ❌ (rebuilding Bifrost from scratch) |
| Hand-roll on Zig | Zig | (n/a) | n/a | Strong perf potential; **even larger effort**; no LLM-specific ecosystem; introduces a new fleet language. | ❌ (rebuilding Bifrost + new lang) |
| Hand-roll on Mojo | Mojo | (n/a) | n/a | Mojo is still alpha/beta for production; no LLM-router ecosystem. | ❌ (premature) |

**Evidence:**

- **Bifrost** claims **50x faster than LiteLLM** with **<100µs overhead at 5k RPS** ([maximhq/bifrost README](https://github.com/maximhq/bifrost)). The Go runtime is the same as the rest of the fleet's polyglot strategy (`pheno-go-ctxkit`, `phenotype-bus`, `dispatch-mcp`).
- **Bifrost** supports **23+ providers** out of the box (matching OmniRoute's tier-1 surface); MCP integration; semantic cache; virtual keys; budget mgmt; Prometheus observability. The integration surface aligns with OmniRoute's lower engine layer.
- **Bifrost** ships as an HTTP gateway (`docker run -p 8080:8080 maximhq/bifrost`) AND a Go SDK (`import "github.com/maximhq/bifrost"`). This is critical: we can adopt it as a *sidecar process* (HTTP) or *in-process library* (Go SDK), depending on the deployment shape.
- **sgl-model-gateway** is a Rust gateway, but its core abstraction is "worker selection across SGLang workers" (radix attention tree, KV cache awareness, tokenizer consistency). It is NOT designed to fan out across heterogeneous providers (OpenAI, Anthropic, Gemini, …).
- **vLLM / sglang** are inference engines. They serve ONE model (or one family) per process. Using them as a router would mean standing up one vLLM per upstream provider, which is the inverse of OmniRoute's value.
- **Envoy AI Gateway** is more general (data-plane-grade routing) but has fewer LLM-specific features (no semantic cache, no virtual keys, no MCP). The right level for an LLM gateway is between Envoy (general) and LiteLLM (Python-heavy).
- **Hand-rolling** in any language would rebuild 60-80% of what Bifrost already has, with no ecosystem benefit. The cost is 6-12 engineer-months and ongoing maintenance for the lifetime of the project.

### Decision

**Adopt `maximhq/bifrost` as OmniRoute's Tier-1 router layer.** Keep OmniRoute's higher layers (A2A, MCP-router, ACP, skill registry, policy engine, guardrails) as Tier-2, unchanged.

**Architecture (2-tier):**

```
                            client / phenoservice / agent
                                       │
                                       ▼
   ┌──────────────────────────────────────────────────────────────────┐
   │  Tier 2: OmniRoute  (TypeScript / Next.js 16)                    │
   │  - A2A agent orchestration (87 MCP tools, 6 A2A skills)          │
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
   │  - 23+ provider dispatch (OpenAI, Anthropic, Bedrock, Vertex,    │
   │    Groq, Mistral, Cohere, Cerebras, …)                           │
   │  - Automatic fallbacks, load balancing                           │
   │  - Virtual keys, hierarchical budget mgmt                        │
   │  - Semantic cache (de-duplicates upstream LLM calls)             │
   │  - MCP client integration (stdio/HTTP/SSE/Streamable)             │
   │  - Observability: Prometheus, OTel, structured logs              │
   │  - 50x faster than LiteLLM, <100µs overhead at 5k RPS            │
   └──────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                              upstream provider APIs
```

**Why a 2-tier model (not a wholesale Bifrost replacement):**

1. **OmniRoute is not just a router.** It is the canonical A2A agent orchestration hub, MCP-router polyglot facade, ACP registry, skill registry, policy engine, and dashboard for the Phenotype fleet. Bifrost does not provide any of these higher-level services.
2. **A2A server (`src/lib/a2a/`) is OmniRoute's core value-add.** Bifrost does not have an A2A JSON-RPC server; it is a model gateway, not an agent framework.
3. **MCP-router is OmniRoute's core value-add.** Bifrost has MCP *client* support (for tool-using agents) but NOT an MCP *server* with 87 tools / 30 scopes.
4. **The TypeScript A2A skills, skill registry, and policy engine are tightly coupled to OmniRoute's higher layers.** Moving them into Bifrost would require a Go port of all the agent-side concerns.
5. **Bifrost is the right level for the hot path.** Provider dispatch, format translation, fallback, circuit-breaking, semantic cache, budget mgmt, and observability are all *low-level router concerns* that are exactly what Bifrost is built for.

**Adoption mode (initial):** OmniRoute calls Bifrost over its **HTTP gateway** at `http://localhost:8080/v1/chat/completions` (and `/v1/embeddings`, `/v1/responses`, etc.). A new **`BifrostBackend` executor** in `open-sse/executors/bifrost.ts` implements the `ProviderAdapter` interface and routes through the gateway. Provider name mapping happens via `open-sse/services/bifrostProviderMap.ts`.

**Adoption mode (long-term, post-v9):** Embed Bifrost as an in-process Go library via cgo, or run it as a sidecar and IPC over Unix domain socket. This is gated on Bifrost stabilizing its Go SDK surface (target: v1.0 GA).

### Consequences

**Positive:**

- Hot-path router overhead drops by an order of magnitude (Bifrost: <100µs; current Node/TS combo handler: 5-10ms median in production).
- 23+ providers become available without writing per-provider executor code; new providers in Bifrost upstream flow into OmniRoute automatically.
- Virtual keys + budget mgmt + observability move to a battle-tested OSS library; less surface area to maintain in-house.
- Bifrost's MCP client integration unifies the upstream-MCP surface (OmniRoute's 87 MCP tools remain on the server side; Bifrost consumes upstream MCP servers on the client side).
- Already vendored at `KooshaPari/bifrost` and locally at `pheno/bifrost`, `HexaKit/bifrost`, `Pyron/bifrost`, `argis-extensions/bifrost`. We are not adopting an unknown dependency.
- MIT-licensed — fits the Phenotype fleet's OSS-first policy.

**Negative / Risks:**

- **Operational:** Bifrost becomes a runtime dependency. Mitigated by: (a) the in-process Go SDK is an option post-v9, (b) the Bifrost HTTP gateway is small (single binary) and well-containerized, (c) the local vendored copy can be built from source if upstream is unavailable.
- **Provider coverage:** Bifrost's 23+ providers cover all of OmniRoute's tier-1 surface (OpenAI, Anthropic, Bedrock, Vertex, Groq, Mistral, Cohere, etc.). The 200+ long tail of OmniRoute providers (free tier, OAuth, self-hosted) will still go through OmniRoute's existing executor layer; Bifrost is opt-in per-combo.
- **Translation cost:** A small mapping layer is needed between OmniRoute's provider/model names and Bifrost's. Implemented in `open-sse/services/bifrostProviderMap.ts` and tested via `tests/unit/bifrost-provider-map.test.ts`.
- **Lock-in:** If we ever need to swap Bifrost out, we swap the executor. The higher layers don't care about Bifrost internals.
- **MIT license compatibility:** Confirmed — MIT is compatible with OmniRoute's existing license posture.

### Rollout Plan

- **v8.1 (this turn)** — Land `BifrostBackend` executor + provider map + tests. **Opt-in per-combo**; existing combos unchanged.
- **v8.2 (Q3 2026)** — Default to Bifrost for the 23+ tier-1 providers; keep OmniRoute's executors as fallback for tier-2/tier-3.
- **v8.3 (Q4 2026)** — Move semantic cache upstream-of-OmniRoute (Bifrost owns the cache key, OmniRoute reads via metadata).
- **v9.0 (2027 Q1)** — Evaluate in-process Go SDK vs sidecar; pick based on benchmark.

### Cross-References

- `docs/adr/0031-bifrost-tier1-router.md` — MADR-format detail with full comparison matrix.
- `docs/ROUTING-CONVERGENCE-STATUS.md` — disambiguation + tier map.
- `SPEC.md` § 3 (Architecture Overview) — 2-tier diagram.
- `SPEC.md` § 5.2 (Routing Engine) — Bifrost integration.
- `PLAN.md` § 8 (v8.1 Bifrost Integration) — rollout milestones.
- `open-sse/executors/bifrost.ts` — implementation.
- `open-sse/services/bifrostProviderMap.ts` — provider name mapping.
- `docs/frameworks/BIFROST-BACKEND.md` — usage guide.
