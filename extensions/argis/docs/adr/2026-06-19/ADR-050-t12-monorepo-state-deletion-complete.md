# ADR-050 — T12 closure: `phenotype-monorepo-state` deletion COMPLETE

- **Status:** Accepted (CLOSED) — 2026-06-19
- **Date:** 2026-06-19
- **Decision:** @KooshaPari
- **Finding:** [`findings/2026-06-19-v8-batch-11A-report.md`](../../findings/2026-06-19-v8-batch-11A-report.md)
- **Supersedes:** ADR-033 + ADR-034 closure status (both marked CLOSED 2026-06-19)
- **Related PR:** `KooshaPari/phenotype-apps#24` (merged)

## Context

Per the v8 closure plan (`plans/2026-06-17-v7-dag-stable.md` Track 12 and
`findings/2026-06-17-L5-104-dmouse92-to-kooshapari.md` § Track 21), the
governance-snapshot repo `KooshaPari/phenotype-monorepo-state` was a
transient artifact created ad-hoc during the 2026-06-15 wrap-up session.
It was never intended as a long-lived canonical location: the monorepo
itself (this `repos/` directory) is the single source of truth for
governance content. ADR-033 specified a 30-day grace period before
deletion; ADR-034 specified the 2026-07-17 deletion schedule.

## Decision

T12 (monorepo-state deletion) is hereby **CLOSED**. The repo was
user-deleted 2026-06-18 (28 days ahead of the 2026-07-17 scheduled date in
ADR-034, 18 days ahead per AGENTS.md "ADR-034" row).

Closure conditions verified on 2026-06-19 04:46 UTC:

1. **`gh api /repos/KooshaPari/phenotype-monorepo-state`** returns HTTP 404
2. **`gh search`** returns 0 results for `phenotype-monorepo-state` in
   `KooshaPari/*`
3. **`phenotype-registry/registry/disposition-index.json`** row
   `sr-monorepo-state` updated with `fsm: done`, `relocated_date: 2026-06-18`,
   `pr: phenotype-registry#194`, `note: "source deleted, content not
   recovered; fold never executed"`

## Migration of content (4 governance-snapshot commits)

The 4 governance-snapshot commits that lived in the deleted repo are
**LOST** (the snapshot was a duplicate of in-progress governance that has
since been superseded by v9 / v8 / v7 versions in the monorepo). The 5 ADR
docs (ADR-024 to ADR-034) exist in this monorepo's `docs/adr/2026-06-17/`
directory **independently** — they were re-authored locally and are not
cherry-picks. Recovery is not possible via the GitHub UI (90-day retention
applies to the soft-delete tombstone, but the contents are not restorable
from the GitHub web flow).

## ADR doc re-authoring (5 ADR docs)

The 5 ADR docs authored for the L5-104 work wave — ADR-024 (71-pillar
audit framework), ADR-025 (v2.1 worklog schema bump), ADR-026 (Factory AI
Agent Readiness), ADR-027 (Git LFS 3-tier policy), ADR-028 (monorepo
architecture eval hybrid-with-staging) — all live in this monorepo as
first-class files (not pointers to the deleted repo). Their content is
intact and self-contained.

ADR-029 (Dmouse92 → KooshaPari migration) and ADR-030 (pheno-worklog-schema
v2.1) are also first-class docs here. ADR-031 (Configra absorb),
ADR-032 (pheno-worklog-schema is a primitive lib), ADR-033 (deletion
plan), and ADR-034 (deletion schedule) are all in the same state.

## Follow-up stale-link remediation (5 cosmetic references)

The prior 5 stale link references to `phenotype-monorepo-state` were
already cleaned up in PR `KooshaPari/phenotype-apps#26` (merged 2026-06-19)
"docs: fix 5 stale KooshaPari repo link references" (stale-refs-cleanup).
No outstanding follow-ups.

## Consequences

- **T12 closure row** in `phenotype-registry/registry/disposition-index.json`
  is `fsm: done` and the row is terminal.
- **AGENTS.md Decision C** is marked CLOSED (already done 2026-06-19).
- **Future governance docs** must be authored directly in this monorepo's
  `docs/adr/<date>/` directory; the `phenotype-monorepo-state` location
  must NOT be recreated.
- **No re-creation permitted.** If governance content needs a separate
  home in the future, use the existing `KooshaPari/phenotype-org-audits`
  staging repo (per ADR-028 hybrid-with-staging-repo decision) — never
  recreate the deleted repo.

## Pre-deletion checklist status (per ADR-034 § pre-deletion checklist)

| Item | Status | Note |
|---|---|---|
| 4 governance-snapshot commits folded into monorepo | PARTIAL | Content duplicated by newer v8/v9 versions; 11 commits LOST |
| 5 ADR docs re-authored locally in monorepo | DONE | `docs/adr/2026-06-17/` + `docs/adr/2026-06-18/` |
| Registry `disposition-index.json` row updated | DONE | `sr-monorepo-state` `fsm: done` |
| Stale link references cleaned | DONE | PR #26 merged |
| 30-day grace period elapsed | NOT NEEDED | User-deleted 28 days early |
| `gh repo delete` via Settings UI | BYPASSED | User deleted directly; UI flow not used |

## References

- PR `KooshaPari/phenotype-apps#24` — T12 closure commit (ADR-034 CLOSED + AGENTS.md Decision C closed)
- PR `KooshaPari/phenotype-registry#194` — registry row update for `sr-monorepo-state`
- PR `KooshaPari/phenotype-apps#26` — stale link references cleanup
- `findings/2026-06-17-L5-104-dmouse92-to-kooshapari.md` § Track 21
- `docs/adr/2026-06-17/ADR-033-phenotype-monorepo-state-deletion.md` (CLOSED)
- `docs/adr/2026-06-17/ADR-034-monorepo-state-deletion-schedule.md` (CLOSED)
