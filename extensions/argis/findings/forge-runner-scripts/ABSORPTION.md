# forge-runner-scripts (absorbed 2026-06-19)

**Date:** 2026-06-19
**Source:** `KooshaPari/forge-runner-scripts` (33 files, 5,597 LOC, archived 2026-06-19)
**Target:** `KooshaPari/phenotype-org-audits` (this directory) + `KooshaPari/phenodag` (dag_*.py Go rewrite per ADR-013)
**L5 ID:** L5-113 (follow-up to 2026-06-18 phenodag absorption of dag_*.py)
**Audit:** `findings/2026-06-19-L5-110-112-second-half-4-repo-absorption-audit.md`

## Split placement (per ADR-013 + ADR-023)

| Content | Target | Reason |
|---|---|---|
| `bin/subagents-orchestration/dag_*.py` (2 files) | `phenodag/scripts/` (Go rewrite) | Per ADR-013, dispatching lives in phenodag. The 2 Python dag_*.py scripts were superseded by phenodag Go modules. See `phenodag/docs/absorbed-from-forge-runner-scripts.md`. |
| `bin/subagents-orchestration/{launch,resume,open}*.sh` (7 files) | **this dir** | macOS Ghostty window helpers + subagent launchers. Operational scripts that complement phenodag dispatch. |
| `bin/autoqueue/*.sh` (7 files) | **this dir** | Autoqueue pipeline + corpus builder + monitor + launcher. Operational scripts for the autoqueue pattern. |
| `bin/subagents-orchestration/dag_launch_2026_06_13.sh` | **this dir** (preserved as historical) | One-time wave launcher (date-stamped). Preserved for reference but NOT used in any ongoing wave. |
| `install.sh`, `INDEX.md`, `PROVENANCE.md`, `README.md`, `LICENSE-MIT` | **this dir** | Provenance + install + license |
| `docs/{ARCHITECTURE,INSTALL,PROVENANCE}.md` | **this dir** | Architecture + install + provenance docs |
| `specs/loop*` | **this dir** | Loop feature spec/task/request |
| `commands/{loop,enhancement-plan}.md` | **this dir** | Loop command + enhancement plan |

## What was NOT migrated

- 782 hardcoded `forge --conversation-id <uuid>` invocations across the 17 scripts — point-in-time session state. These would launch stale forge conversations.
- `bin/subagents-orchestration/dag_dispatcher.py` and `dag_orchestrator.py` — fully superseded by `phenodag` Go modules. Already absorbed into phenodag on 2026-06-18 (L5-113).

## Status

- Source repo `KooshaPari/forge-runner-scripts` archived 2026-06-19.
- 31 files absorbed into this directory.
- 2 dag_*.py files previously absorbed into phenodag (L5-113, 2026-06-18).
- 0 last-resort exceptions.
- 0 net content loss.

L5-110/111/112 second-half absorption audit.
</content>
</invoke>