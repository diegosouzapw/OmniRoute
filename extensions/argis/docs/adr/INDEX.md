# ADR Index — Master

Master index of Architecture Decision Records across the Phenotype fleet monorepo.

This file lists all ADRs (by number, subject, date, and disposition) as the canonical
cross-reference. Individual wave INDEX files (`docs/adr/<date>/INDEX.md`) are the
authoritative source for documents in their respective wave.

**Total ADRs tracked here:** 49 (ADR-001 through ADR-049; series continues ADR-050+).
**Source of truth for series number:** `AGENTS.md` § "Active ADRs".

---

## 2026-06-14 wave (ADR-001..006)

| ADR | Subject | Path | Status |
|---|---|---|---|
| ADR-001 | NetScript port → DELETE | `docs/adr/2026-06-14/` | DELETED |
| ADR-002 | KlipDot → KEEP-archived | `docs/adr/2026-06-14/` | ARCHIVED |
| ADR-003 | McpKit → MERGE into PhenoMCP | `docs/adr/2026-06-14/` | MERGED |
| ADR-004 | Metron → KEEP (sole prod Prometheus) | `docs/adr/2026-06-14/` | KEEP |
| ADR-005 | KodeVibe → KEEP | `docs/adr/2026-06-14/` | KEEP |
| ADR-006 | cheap-llm-mcp → archive verified | `docs/adr/ADR-006-Circuit-Breaker.md` | ARCHIVED |

## 2026-06-15 wave (ADR-007..023)

See `docs/adr/2026-06-15/INDEX.md` (auto-generated placeholder — file not yet created).

Master list of 2026-06-15 ADRs is in `AGENTS.md` § "Active ADRs → 2026-06-15 wave" (ADR-007..023).

## 2026-06-17 wave (ADR-024..034)

See `docs/adr/2026-06-17/INDEX.md`.

11 ADRs in this wave: ADR-024 (71-pillar framework), ADR-025 (worklog v2.1), ADR-026
(Factory AI readiness), ADR-027 (LFS policy), ADR-028 (monorepo architecture), ADR-029
(Dmouse92 → KooshaPari), ADR-030 (worklog v2.1 fields), **ADR-031 (Configra absorb)
[CLOSED 2026-06-19]**, ADR-032 (pheno-worklog-schema decision), **ADR-033
(monorepo-state deletion) [CLOSED 2026-06-19]**, **ADR-034 (monorepo-state deletion
schedule) [CLOSED 2026-06-19]**.

## 2026-06-18 wave (ADR-035..049)

See `docs/adr/2026-06-18/INDEX.md`.

15 ADRs in this wave across 3 sub-waves (Wave A substrate canonicals ADR-035..040;
Wave B cadence/quality ADR-041..043; Wave C forward-looking governance ADR-046..049).
**ADR-036 (pheno-capacity) [CLOSED 2026-06-19]**.

## 2026-06-20 wave (ADR-050+)

See `docs/adr/2026-06-20/`. Router-rebuild wave ADRs (ADR-050/051/052) authored
2026-06-20 by orch-v11-direct.

---

## Verification & refresh cadence

- **Refresh cadence:** weekly Monday 09:00 PDT (per ADR-041 codification).
- **Verification rule:** every ADR row in `AGENTS.md` § "Active ADRs" must appear in
  either this master INDEX or its wave-specific INDEX (`docs/adr/<date>/INDEX.md`).
- **Last refresh:** 2026-06-20 (v8-batch-11B sweep — added INDEX files; ADR-031..049
  cross-reference rows).

---

## Closure cross-reference

| ADR | Closed | Reason |
|---|---|---|
| ADR-031 | 2026-06-19 | Configra absorb executed (phenotype-config → Configra canonical) |
| ADR-033 | 2026-06-18 | phenotype-monorepo-state user-deleted; HTTP 404 verified 2026-06-19 |
| ADR-034 | 2026-06-19 | Deletion schedule superseded by 2026-06-18 user action |
| ADR-036 | 2026-06-19 | pheno-capacity extracted to KooshaPari/pheno-capacity; HwLedger reclassified |