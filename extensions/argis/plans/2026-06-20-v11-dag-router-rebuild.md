# v11 DAG — Router Architecture Rebuild — 2026-06-20

**Status:** Awaiting user decision on §8 of `2026-06-20-router-architecture-2026-research.md` (Option A/B/C + 5 open questions)
**Depends on:** 2026-06-20 v10 closure ✅; v11 tier-0 audit ✅ (12 findings + 1 triage)
**Width:** 4 sub-agents max
**Tracks:** 6 (L1-L5 above + L6 side-DAG filler)
**Tasks:** 20x6 = 120 nominal; 84 side-DAG fillers tracked separately

---

## Pre-Flight Gate (T0)

| Check | Status |
|-------|--------|
| Auth (`KooshaPari` via `gh` CLI + SSH `push_key`) | ✅ |
| `argis-extensions` → `argis-stale` synced | ✅ at `9b48fe8` |
| All 12 active repos synced | ✅ (12/12) |
| Worktrees pruned | ✅ (1 active) |
| Stashes inventoried | ✅ (13 preserved WIP) |
| v10 closure complete | ✅ |
| v11 tier-0 audit findings documented | ✅ (12 findings + 1 triage) |

**Gate PASSED.** Ready for v11.

---

## L1 — Bifrost Upgrade (4 tasks, M each, 1 dev, ~1.5 weeks)

| ID | Task | Sub-agent |
|----|------|-----------|
| T1.1 | Compare v1.2.30 → v1.5.21; enumerate SDK breaks | forge-1 |
| T1.2 | Patch 9 plugins for new SDK (MIRT, learning, etc.) | forge-1 |
| T1.3 | Update `go.mod` to v1.5.21; resolve transitive deps | forge-1 |
| T1.4 | Regression test all 9 plugins against upgraded SDK | forge-1 |

**Exit criteria:** `bifrost-extensions` builds + all plugin tests pass on v1.5.21.

---

## L2 — Router Core (NEW repo: `phenotype-router`) (5 tasks, L, 2 devs, ~3 weeks)

| ID | Task | Sub-agent |
|----|------|-----------|
| T2.1 | Design API surface (REST + gRPC; OpenAI-compat) | forge-2 |
| T2.2 | Implement request → decision flow | forge-2 |
| T2.3 | OTel spans (decision + provider call + plugin span) | forge-2 + forge-3 |
| T2.4 | Health-aware provider pool (active health checks + failover) | forge-2 |
| T2.5 | Plugin SDK spec + hot-reload (Bifrost v1.5 parity) | forge-2 + forge-3 |

**Exit criteria:** `phenotype-router` v0.1.0 released with decision flow + 1 health-aware provider + OTel + hot-reload of 1 plugin.

---

## L3 — Plugin Refactor (10 tasks, 9×M + 1 NEW, 1-2 devs, ~3 weeks)

| ID | Task | Sub-agent |
|----|------|-----------|
| T3.1 | Port `intelligentrouter` (MIRT/RouteLLM/semantic) | forge-3 |
| T3.2 | Port `smartfallback` (health-aware) | forge-3 |
| T3.3 | Port `learning` (online) | forge-3 |
| T3.4 | Port `promptadapter` | forge-3 |
| T3.5 | Port `contextfolding` | forge-3 |
| T3.6 | Port `contentsafety` (promote to mandatory pre-router) | forge-3 |
| T3.7 | Port `toolrouter` | forge-3 |
| T3.8 | Port `researchintel` | forge-3 |
| T3.9 | Port `voyage` (rerank) | forge-3 |
| T3.10 | NEW: `vector-store` slot (Q3 2026) | forge-3 |

**Exit criteria:** All 10 plugins run on new SDK in `phenotype-router-plugins` repo.

---

## L4 — Observability Bridge (3 tasks, M each, 1 dev, ~1 week)

| ID | Task | Sub-agent |
|----|------|-----------|
| T4.1 | OTLP span schema for router/plugin/provider events | forge-3 |
| T4.2 | `pheno-tracing` Go client (per ADR-036) | forge-3 |
| T4.3 | Trace examples + Grafana/Tempo dashboards | forge-3 |

**Exit criteria:** Every plugin span visible in pheno-tracing dashboard.

---

## L5 — Documentation / Governance (4 tasks, S each, 0.5 dev, ~3 days)

| ID | Task | Sub-agent |
|----|------|-----------|
| T5.1 | Update `AGENTS.md` with new stack map | forge-1 |
| T5.2 | ADR-050: Router rebuild decision (Option B) | forge-1 |
| T5.3 | ADR-051: Bifrost as library (not wrapper) | forge-1 |
| T5.4 | ADR-052: Plugin SDK spec | forge-1 |

**Exit criteria:** Governance reflects new stack; ADRs in `docs/adr/2026-06-20/`.

---

## L6 — Side-DAG Filler (84 tasks across 6 sub-agents, ~12 weeks)

See `findings/2026-06-20-side-dag-v11-filler.md` (placeholder; generated on T0.5).

Filler categories:
- SOTA sweep across 9 substrate crates (12 tasks)
- Guardrail hardening for new repos (10 tasks)
- Coverage analysis on `phenotype-router` (8 tasks)
- Hexagonal audit on plugin SDK (10 tasks)
- Documentation gaps (15 tasks)
- Migration scripts (12 tasks)
- Observability gaps (10 tasks)
- Test infra for hot-reload (7 tasks)

---

## Critical Path

```
L1 (1.5w) ─┐
           ├──> L2 (3w) ─┐
L5 (0.5w) ─┘            ├──> L3 (3w) ──> L4 (1w) ──> v11 closure
                        │
                        └──> (parallel) L1.4 regression feeds back into L2.2
```

**Total critical path: ~6.5 weeks** with 2 devs in parallel on L2 + L3.

---

## Dependencies & Blockers

| Blocker | Owner | Unblock by |
|---------|-------|------------|
| User approval of Option B | kooshapari | EOD 2026-06-20 |
| 5 open questions in research §8 answered | kooshapari | Before L2 starts |
| Bifrost v1.5.21 team responsiveness on SDK break clarifications | external | T1.1 |

---

## Risk Register

| Risk | Mitigation |
|------|-----------|
| Bifrost upstream pulls a breaking change mid-rebuild | Pin v1.5.21; vendor source if needed |
| Plugin regression during SDK migration | One plugin at a time; shadow mode in prod |
| OTel overhead degrades p99 latency | Span sampling (10%) for hot paths |
| Hot-reload breaks plugin state | Plugin state is per-request; no shared state |

---

## File Plan

- `phenotype-router/` (NEW) — Router core
- `phenotype-router-plugins/` (NEW) — 10 plugin modules
- `bifrost-extensions/` — demoted to transport library
- `pheno-tracing/` — add Go client
- `docs/adr/2026-06-20/ADR-050..052.md` (NEW)
- `plans/2026-06-20-v11-execution-log.md` (rolling log)
- `findings/2026-06-20-L5-120-router-rebuild-status.md` (weekly)

---

**v11 DAG complete. Awaiting §8 decision.**