# OKR & KPI Alignment (OmniRoute, v3.8.24)

> **Status**: Living doc, refreshed quarterly.
> **Last reviewed**: 2026-06-18 (this turn).
> **Review cadence**: Quarterly (next: 2026-09-18).
> **Owner**: TBD — assign via CODEOWNERS (proposal: `@KooshaPari/core`).
> **Per**: 30-pillar framework L05 (OKR/KPI Alignment). Migrating to 71-pillar
> in Q4 2026 per `ADR.md` § ADR-010.

---

## Vision

**Universal request router — protocol-agnostic proxy with policy + cost governance.**

A single drop-in surface for the Phenotype ecosystem that accepts any LLM
request, routes it across 232 providers based on policy + cost + latency +
capability, and exposes the same surface to agents (MCP), peer agents (A2A),
and human operators (dashboard, webhooks, evals).

---

## Quarterly Objectives (current cycle: Q3 2026)

### Objective 1: Reach 100k req/s sustained p99 < 50ms

| Key Result | Current | Target | Status |
|---|---|---|---|
| p99 latency < 50ms under 100k req/s | unknown (bench pending) | <50ms | not started |
| Connection pool deployed per provider | 0 (current: per-request) | all 232 providers | not started |
| Compression engine in worker thread | 0 (current: main thread) | 100% offload | not started |
| Cache hit rate | unknown | >40% on routing decisions | not started |
| Circuit-breaker feedback loop | unknown | 100% of providers | not started |

### Objective 2: Add 2 new policy primitives per quarter

| Key Result | Current | Target | Status |
|---|---|---|---|
| New primitives shipped in Q3 2026 | 0 | 2 | not started |
| **Candidate primitives** | — | **Quota-bucket inheritance** (per-tenant caps that compose), **Time-of-day routing** (cheaper after hours), **PII-aware provider selection** (mask PII before forwarding), **Cost-cap circuit breaker** (auto-disable on budget exhaustion) | candidates |
| All primitives have spec + tests + docs | 0/0 | 2/2 | not started |

### Objective 3: Cover 100% of public API with contract tests

| Key Result | Current | Target | Status |
|---|---|---|---|
| OpenAPI surface covered by contract tests | unknown | 100% | in progress |
| A2A JSON-RPC methods covered | 0/4 | 4/4 | not started |
| MCP tools covered | unknown | 87/87 | not started |
| Provider executors covered | unknown | 232/232 (smoke + happy path) | not started |

---

## Outcome KPIs

| KPI | Target | Current | Refresh |
|---|---|---|---|
| p99_latency_ms | <50 | unknown | daily |
| throughput_rps | 100k | unknown | weekly |
| policy_primitives_per_quarter | 2 | 0 (Q3 2026) | quarterly |
| contract_test_coverage | 100% | unknown | per release |
| provider_uptime | 99.9% | unknown | monthly |
| mcp_tool_invocations_per_day | growing | unknown | weekly |
| a2a_skill_invocations_per_day | growing | unknown | weekly |
| cost_per_request_usd | <$0.001 (avg) | unknown | weekly |
| compression_savings_pct | 10-15% lite, 30%+ rtk | 10-15% (lite measured) | per request |
| doc_fabrication_count | 0 | 0 (CI-enforced, ADR-006) | per PR |
| open_pr_age_days | <7 | unknown | weekly |
| mean_time_to_merge_days | <3 | unknown | weekly |

---

## Process Notes

- OKR review happens at the start of every sprint; updated at the end of every
  quarter.
- Targets are **measurable** and **time-bound**.
- Every KPI has a designated owner in CODEOWNERS (proposal: split across
  `@KooshaPari/routing`, `@KooshaPari/mcp-a2a`, `@KooshaPari/data`,
  `@KooshaPari/security`, `@KooshaPari/release`).
- Quarterly cadence:
  - **Q1** (Jan–Mar): OKR review + adjustment.
  - **Q2** (Apr–Jun): mid-year update; new primitives + tests.
  - **Q3** (Jul–Sep): performance push (100k req/s OKR).
  - **Q4** (Oct–Dec): contract-test push (100% coverage OKR) + 71-pillar migration.

---

## Cross-References

- [`SPEC.md`](../SPEC.md) § 2 — Core tenets that motivate these OKRs.
- [`PLAN.md`](../PLAN.md) § 2 — Q3 2026 roadmap (per-OKR initiatives).
- [`PLAN.md`](../PLAN.md) § 3 — v8 → v9 backlog (OKR-driven).
- [`docs/architecture/QUALITY_GATES.md`](../docs/architecture/QUALITY_GATES.md) — 35 quality gates that feed contract-test coverage.
- [`docs/audits/FLEET-AUDIT-30-PILLAR.md`](../docs/audits/FLEET-AUDIT-30-PILLAR.md) — 30-pillar audit framework (L05 = this OKR doc).
- [`audit_scorecard.json`](../audit_scorecard.json) — 30-pillar scorecard snapshot.

---

## History

| Date | Cycle | OKR state |
|---|---|---|
| 2026-06-16 | Q2 close | OKR doc created (skeleton); no objectives tracked |
| 2026-06-18 | Q3 plan | OKR doc fleshed out (this version); 3 objectives defined; KPIs enumerated |
| 2026-09-18 (target) | Q3 close | Mid-year assessment; p99 latency + primitives measured |
| 2026-12-18 (target) | Q4 close | Year-end assessment; contract test coverage at 100%? |
| 2027-01-18 (target) | Q1 2027 plan | New OKR cycle; 71-pillar migration in flight |
