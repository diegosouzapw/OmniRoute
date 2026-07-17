# SSOT — Single Source of Truth

This document records the canonical authority for cross-cutting facts.
When a fact conflicts across docs, the source listed here wins.

## Scope

| Domain | Authoritative source |
|---|---|
| Agent-effort governance | `docs/adr/2026-06-15/ADR-023-agent-effort-governance.md` |
| Worklog schema | `pheno-worklog-schema` v2.1 — 11-column `device:` enum |
| Config (Rust) | `KooshaPari/Configra` |
| Config (Python) | `pheno-config/` |
| Repo registry + disposition | `phenotype-registry/registry/disposition-index.json` |
| ADR index (2026-06-15) | `docs/adr/2026-06-15/INDEX.md` |

## Precedence order

1. Executable config (workflows, `justfile`, `Cargo.toml`)
2. `*.md` governance files in this SSOT table
3. The L5 governance ADRs (ADR-023 and successors) override any substrate
   decision where the conflict is "should the agent be working on this" —
   effort-decision is L5; substrate decisions are L3/L4.
4. Anything else.

## Updating this file

- Keep the table narrow and unambiguous.
- Cite the canonical file by path; do not duplicate content.
- Update via a governance commit referencing the change.
