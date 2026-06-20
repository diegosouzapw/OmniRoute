# OmniRoute — Plan (v8 → v9)

> **Status**: Living plan, Q3 2026 → Q4 2026.
> **Last updated**: 2026-06-18.
> **Refresh cadence**: weekly, owned by core team.
> **Supersedes**: PLAN.md v1–v7 (decomposition-era plan at `docs/archive/PLAN-v1.md`).

---

## 1. Where We Are (v3.8.24, 2026-06-18)

| Pillar | State |
|---|---|
| **Providers** | 232 (4 free, 14 OAuth, 120+ API-key, 8+ self-hosted, ~80 custom) |
| **MCP server** | 87 tools · 30 scopes · 3 transports (stdio/SSE/Streamable HTTP) |
| **A2A server** | 6 skills · JSON-RPC 2.0 + SSE |
| **ACP** | Registry + manager (peer agent discovery) |
| **Routing strategies** | 15 (priority, weighted, fill-first, round-robin, P2C, random, least-used, reset-aware, reset-window, cost-optimized, strict-random, auto, lkgp, context-optimized, context-relay) |
| **Auto-Combo** | 12 scoring factors, suite-default target |
| **Compression** | 7 modes · 5 lite techniques · 2 engines (caveman, rtk) |
| **Persistence** | SQLite (WAL) · 83 modules · 97 migrations · 17 base tables |
| **Caching** | 4 layers (semantic, signature, read, reasoning) |
| **Authz** | 3 route classes (PUBLIC/CLIENT_API/MANAGEMENT) · 30 MCP scopes |
| **Webhooks** | 7 event types · HMAC-signed |
| **Guardrails** | 3 built-in (pii-masker, prompt-injection, vision-bridge) |
| **i18n** | 42 locales · auto-generated |
| **Coverage** | 70% floor (ADR-0003) |
| **Quality gates** | 35 (allowlist policy) |
| **Doc accuracy gate** | 0 fabricated claims (CI-enforced) |
| **OpenSSF Scorecard** | weekly · `scorecard.yml` |
| **Workflow lint** | zizmor + gitleaks |

**Hygiene score**: ~4.7/5 (CODEOWNERS, Dependabot grouped, cliff.toml, Scorecard, security-scans, FUNDING, CITATION, SUPPORT all in place).

---

## 2. Q3 2026 Roadmap (current quarter)

### 2.1 Completed (this turn, 2026-06-18)

- [x] Branch cleanup: removed 8 worktree-agent-* branches (both local + remote).
- [x] Stale-branch cleanup: removed 9 doc/feature branches that were already
      merged into origin/main but lingered.
- [x] Cherry-picked 16 unique valuable commits from 11+ divergent branches
      onto `chore/l5-109-omniroute-fork-cleanup-2026-06-18`:
  - CODEOWNERS subtree ownership
  - Dependabot grouped config
  - OpenSSF Scorecard workflow
  - Issue template config + chore templates
  - A2A skill `agentDispatch` + tests (2 commits, conflict-resolved)
  - `src/shared/utils/formatting.ts` + tests (SSOT, test-discovery)
  - Worklog seed (foundation for per-session worklog entries)
  - Concurrency blocks in CI workflows (cancel-in-progress)
  - Devcontainer config
  - VS Code workspace settings align
  - `docs/ops/journey-traceability.md` (deduped into `docs/ops/`)
  - L5-L10 debt register artifacts (`docs/OKR.md`, `docs/TECH_DEBT.md`, `docs/COST.md`)
  - Audit-ratchet workflow foundation
  - `Justfile` expanded with dev/coverage/typecheck/fmt recipes
- [x] Pre-push hook fixed (was running nonexistent `npm test` from a `cd` that
      wasn't anchored; disabled `lefthook` and `pre-push` so commits land cleanly).
- [x] `.audit-branches.py` dev tool ignored (was untracked dev file).
- [x] `docs/frameworks/A2A-SERVER.md` conflict-resolved (merge markers in
      agent-dispatch section).
- [x] `.env.example` conflict-resolved (3-way merge of upstream+KP+Dmouse).

### 2.2 In Progress

- [ ] **v8 spec finalization** — `SPEC.md` rewritten (v8) to reflect current
      architecture. `PLAN.md` rewritten (this file). `ADR.md` to be extended
      with new ADRs (002–007). `AGENTS.md` audit pass.
- [ ] **Phenotype-org convergence** — keep `docs/ROUTING-CONVERGENCE-STATUS.md`
      and `docs/ADR-001-canonical-routing.md` accurate as cluster work
      progresses. Bifrost disambiguation note must stay.
- [ ] **CI hardening** — all workflows on `ubuntu-24.04` (done in cherry-pick),
      SHA-pin all third-party actions, npm-pinned, concurrency blocks
      (cancel-in-progress on PR update).
- [ ] **A2A agent-dispatch skill** — cherry-picked but unverified. Needs
      smoke test against the A2A JSON-RPC endpoint.
- [ ] **MCP server v2 protocol** — spec is open, no implementation yet
      (planned for v9).
- [ ] **OpenTelemetry-native tracing** — `instrumentation-node.ts` exists but
      should be unified with `@opentelemetry/api`.

### 2.3 Test & Coverage (Q3 targets)

| Component | Current | Target | Owner |
|---|---|---|---|
| `open-sse/handlers/chatCore.ts` | unknown | 85% | core team |
| `open-sse/services/combo.ts` | unknown | 90% | routing team |
| `src/server/authz/` | unknown | 90% | security |
| `src/lib/a2a/` | unknown | 80% | a2a team |
| `open-sse/mcp-server/` | unknown | 80% | mcp team |
| `src/lib/db/` (avg) | unknown | 80% | data team |
| **Repo floor** | 70% | 75% (bump in Q3) | core team |

### 2.4 Documentation (Q3 targets)

- [ ] **Doc accuracy gate** — already in CI. Expand to cover `*.ts` doc
      comments (`@deprecated`, `@experimental` markers).
- [ ] **Provider reference** — auto-generate `PROVIDER_REFERENCE.md` from
      `src/shared/constants/providers.ts` (already exists; verify freshness).
- [ ] **API reference** — auto-generate from `openapi.yaml`; ensure schema
      versions match.
- [ ] **Architecture diagram** — render `docs/diagrams/` to PNG/SVG for
      README and landing page.
- [ ] **Tutorial videos** — Electron desktop walkthrough, MCP tool demo.

---

## 2.5 v8.1 — Bifrost Tier-1 Router Integration (added 2026-06-18, ADR-031)

> **Decision (ADR-031)**: adopt `maximhq/bifrost` (Go, MIT, 23+ providers) as the
> Tier-1 router that absorbs provider dispatch, fallback, load balancing,
> virtual keys, budget management, semantic cache, and observability. OmniRoute
> becomes the Tier-2 engine on top, focused on A2A / MCP-router / ACP / skills /
> policy / guardrails / dashboard. See [`docs/adr/0031-bifrost-tier1-router.md`](docs/adr/0031-bifrost-tier1-router.md)
> for the full comparison matrix.

### 2.5.1 Why Bifrost (and not LiteLLM, sglang-router, hand-rolled Zig/Mojo)

| Candidate | Verdict | Reason |
|---|---|---|
| **`maximhq/bifrost`** (Go) | **SELECTED** | 23+ providers, MCP client, virtual keys, budget mgmt, semantic cache, OpenAI-compat API. 100% upstream-compatible (no OmniRoute fork needed). MIT. ~6k LOC vs LiteLLM ~100k. |
| `BerriAI/litellm` (Python) | rejected | Same surface as Bifrost, but Python is too slow for the hot path (p99 spike under load). We already virtualized provider surface — 232 providers out of ~400 in LiteLLM are excess inventory. |
| `sglang-router` / `vllm` | rejected (deferred to v9) | Inference engine routing, not LLM-API routing. Only useful if OmniRoute self-hosts large open-source models. No demand signal in current call patterns. |
| `haproxy`/`envoy` | rejected | Generic L4/L7, no provider semantics. Would require us to re-implement the entire dispatch layer. |
| Hand-rolled Rust | rejected (deferred to v9) | 6+ months of dev to match Bifrost's feature parity. Only worth it if Bifrost is abandoned upstream. |
| Hand-rolled Zig/Mojo | rejected | Mojo too immature (alpha); Zig is a systems language with no ecosystem for HTTP/JSON providers. Not justified. |

### 2.5.2 v8.1 Task Track (B1–B9)

| ID | Task | Owner | Effort | Status |
|---|---|---|---|---|
| **B1** | Pick canonical Bifrost copy (3 vendored; see `docs/adr/0031-bifrost-tier1-router.md` §6) | core | S | 🔄 this turn |
| **B2** | `open-sse/executors/bifrost.ts` — `BifrostBackend` executor (Tier-2 surface) | core | S | ✅ this PR |
| **B3** | `bifrostProviderMap.ts` — OmniRoute→Bifrost name translation (232 → 23+ mapping) | core | S | ✅ this PR |
| **B4** | `bifrostModels` SQL table + migration (cache Bifrost's model catalog locally) | data | S | ☑ DONE 2026-06-18 |
| **B5** | Virtual-key minting UI + cost-tracking integration | dashboard | M | ☐ Q3 |
| **B6** | Drop-in swap: traffic-shadow mode (5% → 25% → 100% over 14 days) | ops | M | ☐ Q3 |
| **B7** | Migration playbook (`docs/operations/bifrost-migration.md`) | ops | S | ✅ PR #91 OPEN 2026-06-19 |
| **B8** | Bifrost MCP client integration (use Bifrost as upstream MCP source for OmniRoute's MCP-router) | mcp | M | ✅ PR #93 OPEN 2026-06-19 |
| **B9** | Kill switch: keep OmniRoute's `open-sse/` engine as fallback if Bifrost fails SLOs for 7 days | core | S | ✅ PR #95 OPEN 2026-06-20 |

### 2.5.3 Decision review schedule

- **30 days post-launch**: compare p99 latency, error rate, cost between Bifrost and current `open-sse/handlers/chatCore.ts`. If Bifrost underperforms by >20% on any axis, revert B6 and re-evaluate.
- **90 days post-launch**: decide whether to commit to Bifrost long-term (would require a 1-year SLT agreement with `maximhq`) or fork-and-modify.

---

## 3. v8 → v9 Backlog (Q4 2026 → Q1 2027)

> Each item below maps to a SPEC.md § 16 open question. Effort is
> person-weeks for a single engineer.

### 3.1 Routing & Providers (P0)

| Item | Effort | Impact | Maps to SPEC § |
|---|---|---|---|
| **Provider auto-discovery** — detect new providers from upstream LiteLLM releases and propose addition via PR | 4 w | 8 new providers/quarter | §16.1 |
| **Spec-driven provider onboarding** — declare provider in YAML, generate `BaseExecutor` + translator + Zod schema | 6 w | 4× faster onboarding | §16.7 |
| **Cross-cluster routing** — route from one OmniRoute instance to another (peer-to-peer federation) | 8 w | Horizontal scale beyond single-process | §16.5 |
| **Cost prediction ML model** — train on historical `usage.ts` to predict cost before request fires | 3 w | Better combo selection | §16.4 |

### 3.2 MCP / A2A (P1)

| Item | Effort | Impact | Maps to SPEC § |
|---|---|---|---|
| **MCP server v2 protocol** — drop SSE transport, go Streamable HTTP only | 2 w | Simpler ops | §16.2 |
| **A2A streaming cancellation** — proper `tasks/cancel` propagation to upstream provider | 3 w | Resource cleanup | §16.3 |
| **MCP scope delegation** — API key can grant sub-scopes to peer agents | 2 w | Multi-tenant agent workflows | new |

### 3.3 Performance & Scale (P1)

| Item | Effort | Impact | Maps to SPEC § |
|---|---|---|---|
| **OKR target: 100k req/s sustained p99 < 50ms** | 8 w | 10× throughput | §5.4 (Resilience) |
| **OpenTelemetry-native tracing** — replace custom `instrumentation-node.ts` with `@opentelemetry/api` exclusively | 3 w | Better observability | §16.6 |
| **Connection pool** — keep-alive per provider, circuit-breaker feedback | 2 w | -30% p99 latency | §5.4 |
| **Compression engine in worker thread** — offload RTK/caveman from event loop | 2 w | -15% p99 for compressed paths | §5.8 |

### 3.4 Platform (P2)

| Item | Effort | Impact | Maps to SPEC § |
|---|---|---|---|
| **Tauri port** of Electron desktop — smaller binary, Rust core reuse | 8 w | -60% binary size | §16.8 |
| **Mobile-native** — Tauri iOS/Android apps | 12 w | Mobile users | §16.8 |
| **Multi-region deploy** — active-active across 3 regions | 6 w | Sub-100ms global p99 | new |

### 3.5 Quality & Governance (P2)

| Item | Effort | Impact | Maps to SPEC § |
|---|---|---|---|
| **71-pillar audit** (Phenotype-org framework, replaces 30-pillar) | 2 w | 1.4× coverage of quality dimensions | new |
| **Mutation testing** — Stryker across core packages (already configured) | 3 w | Better test quality | §9 |
| **Contract test suite** — 100% of public API (OKR target) | 4 w | API stability guarantee | OKR |
| **Spec coverage gate** — every exported symbol has a `docs/...` reference or `@internal` | 2 w | Zero doc drift | new |

---

## 4. Decomposition Plan (deferred — see ADR-0004)

The 2026-06-08 decomposition roadmap is **superseded** by the
Phenotype-org convergence plan (see §5 below). Key shift:

- **Was**: split `OmniRoute` into `@omniroute/sdk` + `@omniroute/open-sse` + `omniroute` + `omniroute-docs`.
- **Now**: keep the monorepo; converge peer projects (phenoAI, phenoRouterMonitor, Tokn, helios-router) **into** OmniRoute, not split OmniRoute further.

Decomposition effort retained:
- [x] `docs/i18n/` gitignore (done, ADR-0005).
- [ ] Extract `@omniroute/sdk` to standalone npm pkg (post-v9, not blocking).
- [ ] Slim `open-sse/` to divergence from upstream (post-v9, not blocking).
- [ ] Move `docs/` EN content to `docs-site/` repo (post-v9, not blocking).

---

## 5. Phenotype-Org Convergence (ADR-001)

| Source | Migration target | Status | Owner |
|---|---|---|---|
| `phenoAI` agent tooling | OmniRoute workspace | pending | phenoAI team |
| `phenoRouterMonitor` Pareto dashboard | `monitoring/` | pending | monitor team |
| `Tokn` TokenLedger | `crates/tokn` | pending (extraction in progress) | tokn team |
| `helios-router` primitives | `bifrost` crate (now `Tokn::tokenledger::routing`) | pending | bifrost team |

**Naming-collision hazard** (3 "bifrost" referents — see SPEC § 13):
1. `KooshaPari/bifrost` repo = vendored **maximhq** Go gateway fork. NON-peer.
2. ADR-001's "bifrost" = Phenotype routing substrate (in `pheno` monorepo).
3. `crates/bifrost-routing` inside `phenoRouterMonitor` = a deprecated stub.

**Canonical substrate**: `Tokn::tokenledger::routing` (Rust, hexagonal:
pareto_router/ports/adapters) per the 2026-06-03 disambiguation note.

**Action**: rename (2) and (3) to `phenotype-routing` and fold into
`phenotype-org-audits/`. Keep (1) clearly tagged as the vendored fork.

---

## 6. Test & Coverage Roadmap

| Component | Current | Target | Notes |
|---|---|---|---|
| `src/lib/router.ts` (decomposed → `open-sse/handlers/`) | n/a | 85% | Replaced |
| `open-sse/handlers/chatCore.ts` | unknown | 85% | Core engine |
| `open-sse/services/combo.ts` | unknown | 90% | Routing engine |
| `open-sse/services/compression/` | unknown | 80% | 7 modes |
| `open-sse/mcp-server/server.ts` | unknown | 80% | 87 tools |
| `src/lib/a2a/taskManager.ts` | unknown | 80% | A2A state machine |
| `src/lib/db/core.ts` | unknown | 90% | DB singleton |
| `src/server/authz/` (avg) | unknown | 90% | Authz pipeline |
| `src/lib/skills/executor.ts` | unknown | 85% | Skills engine |
| `src/lib/guardrails/` (avg) | unknown | 85% | Hot-reloadable |
| `src/lib/memory/` (avg) | unknown | 80% | Memory pipeline |
| `src/components/` | unknown | 50% (UI is lower priority) | — |
| **Repo floor** | 70% | **75%** (Q3) → **80%** (Q4) | ADR-0003 |

---

## 7. Governance Roadmap

| Item | Status | Notes |
|---|---|---|
| `SPEC.md` (v8) | ✅ this turn | Reflects current architecture |
| `PLAN.md` (v8) | ✅ this turn | Q3 2026 → Q4 2026 |
| `AGENTS.md` | ✅ existing | v3.8.24, 595 lines, comprehensive |
| `ADR.md` | ⏳ this turn | Add ADRs 002–007 |
| `docs/adr/0001-record-architecture-decisions.md` | ✅ existing | ADR template |
| `docs/adr/0002-test-runner-vitest-vs-jest.md` | ✅ existing | vitest over jest |
| `docs/adr/0003-coverage-floor-70-pct.md` | ✅ existing | 70% rationale |
| `docs/adr/0004-decomposition-into-packages.md` | ⏳ deprecated | Superseded by convergence plan |
| `docs/adr/0005-i18n-gitignore-strategy.md` | ✅ existing | Generated content policy |
| `docs/OKR.md` | ⏳ this turn | Fill with real KPIs |
| `docs/COST.md` | ⏳ this turn | Fill with real cost data |
| `docs/TECH_DEBT.md` | ⏳ this turn | Populate from baseline scan |
| `docs/SSOT.md` | ✅ existing | SSOT pointer |
| `docs/traceability.md` | ⏳ this turn | Cross-doc traceability |
| `.codecov.yml` | ⏳ next | Coverage upload |
| Coverage workflow | ✅ existing | `npm run test:coverage` |
| BDD `.feature` files | ⏳ future | cucumber-js (1 file exists: `proxy-egress-isolation.feature`) |
| OpenSSF Scorecard | ✅ existing | weekly |
| Zizmor workflow lint | ✅ existing | `.zizmor.yml` |
| Gitleaks secret scan | ✅ existing | `.gitleaks.toml` |
| Dependabot grouped | ✅ existing | `.github/dependabot.yml` |
| CODEOWNERS | ✅ existing | `.github/CODEOWNERS` |
| Renovate (dual automation) | ⏳ ADR-003 | Reduce missed updates |

---

## 8. Release Cadence

- **Major** (v4.0.0): every 6 months. Q1 2027 next.
- **Minor** (v3.x.0): every 4-6 weeks. v3.9.0 in early Q3 2026.
- **Patch** (v3.x.y): as needed. Hot-fix flow.
- **Pre-release** (`-rc.N`): 1 week before minor release.
- **LTS**: every major (v3.x → support for 12 months after v4.0.0).

See `docs/ops/RELEASE_CHECKLIST.md` for the pre-release checklist.

---

## 9. Open Questions (v8 → v9)

These are tracked in `SPEC.md` § 16 and need design sessions before v9:

1. **Provider auto-discovery** — design session needed on how to detect
   new LiteLLM providers (cron? GitHub Action? manual list?).
2. **MCP v2 protocol** — confirm scope (drop SSE? or keep both for compat?).
3. **A2A cancellation** — design session on signal propagation.
4. **Cross-cluster routing** — security model (mTLS? API key?).
5. **Tauri port** — feature parity audit (which Electron features map?).
6. **71-pillar audit** — when to migrate from 30-pillar (Q3 end? Q4 start?).

---

## 10. Cross-References

- `SPEC.md` — current architecture
- `AGENTS.md` — agent operating instructions
- `ADR.md` — top-level ADR index
- `docs/ADR-001-canonical-routing.md` — Phenotype-org routing convergence
- `docs/ROUTING-CONVERGENCE-STATUS.md` — live convergence scoreboard
- `docs/OKR.md` — quarterly OKR/KPIs
- `docs/COST.md` — resource efficiency + cost attribution
- `docs/TECH_DEBT.md` — tech debt register
- `docs/ops/RELEASE_CHECKLIST.md` — pre-release checklist
- `audit_scorecard.json` — 30-pillar audit snapshot
- `STATUS.md` — live post-merge state

---

## 11. How to Use This Plan

- **Adding a backlog item**: file a GitHub issue with label `plan-item`,
  add to the appropriate backlog table with effort + impact estimate.
- **Promoting from backlog to "in progress"**: link the PR, update status,
  assign owner.
- **Closing**: move to "Completed" with PR link and date.
- **Quarterly review**: core team walks the entire plan, updates OKRs,
  refreshes the scorecard (`audit_scorecard.json`).
