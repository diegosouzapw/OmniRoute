# ADR Index — 2026-06-17 wave

Wave-specific index for Architecture Decision Records authored on 2026-06-17.
This wave comprises 11 ADRs (ADR-024..034) covering the 71-pillar audit framework,
Factory AI readiness model, LFS policy, monorepo architecture eval, Dmouse92 migration,
and the Configra absorb / monorepo-state deletion closure decisions.

---

## ADR-024 — 71-pillar industry-standard audit framework (L1-L71, 9 domains)

- **Path:** `docs/adr/2026-06-17/ADR-024-71-pillar-audit-framework.md`
- **Status:** ACTIVE (schema doc re-authored 2026-06-20 in d20cbc72 after disk-loss event)
- **Owner:** worklog-schema circle (L5-102)
- **Cross-refs:** `findings/71-pillar-2026-06-17-schema.md`, `findings/71-pillar-2026-06-17.md`,
  `findings/71-pillar-2026-06-17-mapping.md`

## ADR-025 — ADR-015 v2.1 worklog schema bump (11th column `device:`)

- **Path:** `docs/adr/2026-06-17/ADR-025-worklog-v2-1-schema-bump.md`
- **Status:** ACTIVE (v2.0 deprecation 2026-06-22)
- **Owner:** worklog-schema circle (L5-103)

## ADR-026 — Factory AI Agent Readiness Model (external standard)

- **Path:** `docs/adr/2026-06-17/ADR-026-factory-ai-readiness.md`
- **Status:** ACTIVE (cross-cutting external standard)
- **Owner:** worklog-schema circle (L5-104)
- **Cross-refs:** `audit-71-pillar-2026-06-17-wrapup.md` § 10

## ADR-027 — Git LFS 3-tier policy (always-track / on-demand / never-track)

- **Path:** `docs/adr/2026-06-17/ADR-027-git-lfs-3-tier-policy.md`
- **Status:** ACTIVE
- **Owner:** platform (L5-105); see `.gitattributes.example`

## ADR-028 — Monorepo architecture eval: hybrid-with-staging-repo

- **Path:** `docs/adr/2026-06-17/ADR-028-monorepo-architecture-eval.md`
- **Status:** ACTIVE
- **Owner:** platform (L5-106)
- **Staging repo:** `KooshaPari/phenotype-org-audits`

## ADR-029 — Dmouse92 → KooshaPari migration

- **Path:** `docs/adr/2026-06-17/ADR-029-dmouse92-kooshapari-migration.md`
- **Status:** ACTIVE (migration COMPLETE 2026-06-17 22:15 PDT)
- **Owner:** orch-w1-a (L5-108)
- **Cross-refs:** `findings/2026-06-17-L5-104-dmouse92-to-kooshapari.md`

## ADR-030 — pheno-worklog-schema v2.1 (add 11th `device:` column)

- **Path:** `docs/adr/2026-06-17/ADR-030-worklog-schema-v2-1.md`
- **Status:** ACTIVE
- **Owner:** worklog-schema circle (L5-104.5)
- **Cross-refs:** `pheno-worklog-schema/SPEC-v2.1.md`

## ADR-031 — Configra absorb (phenotype-config → Configra canonical)

- **Path:** `docs/adr/2026-06-17/ADR-031-configra-absorb.md`
- **Status:** **CLOSED 2026-06-19** (executed ahead of 2026-07-15 archive date)
- **Owner:** orch-w1-a (L5-104.7)
- **Outcome:** `KooshaPari/pheno#238` merge `3f12e254`; sub-crate CANONICAL.md markers
  re-pointed; phenotype-config deprecation continues on 2026-07-15 schedule.

## ADR-032 — pheno-worklog-schema is a primitive lib (NOT AgilePlus duplicate)

- **Path:** `docs/adr/2026-06-17/ADR-032-pheno-worklog-schema-decision.md`
- **Status:** ACTIVE (deferred decision on merge; both formats coexist)
- **Owner:** orch-w1-a (L5-104.8)

## ADR-033 — Delete KooshaPari/phenotype-monorepo-state

- **Path:** `docs/adr/2026-06-17/ADR-033-phenotype-monorepo-state-deletion.md`
- **Status:** **CLOSED 2026-06-19** (user-deleted 2026-06-18, 18 days ahead of schedule)
- **Owner:** orch-w1-a (L5-104.9)
- **Outcome:** HTTP 404 verified 2026-06-19 04:46 UTC; registry row `sr-monorepo-state`
  `fsm: done`.

## ADR-034 — KooshaPari/phenotype-monorepo-state deletion schedule (2026-07-17)

- **Path:** `docs/adr/2026-06-17/ADR-034-monorepo-state-deletion-schedule.md`
- **Status:** **CLOSED 2026-06-19** (schedule superseded by 2026-06-18 user action)
- **Owner:** orch-w1-a (L5-104.10)

---

## Refresh cadence

- Refreshed: 2026-06-20 (v8-batch-11B sweep — INDEX scaffold added)
- Next refresh: 2026-06-22 (with v2.0 worklog deprecation verification)