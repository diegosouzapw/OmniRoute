# Cross-Repo Duplication Matrix

**Date:** 2026-06-19
**Scope:** Stage1 Config Consolidation — cross-repo feature/code duplication assessment
**Author:** Orchestrator (auto-generated from T12/L5-500 sweep)

## Methodology

Each repo in scope for Stage1 was scanned for features, types, and utilities that overlap with another KooshaPari repo. The matrix below captures:
- **Duplicated feature** — what overlaps
- **Source repos** — which repos have it
- **Canonical target** — where it should live
- **Absorption status** — what was done

## Duplication Matrix

| # | Feature / Type | Source(s) | Canonical Target | Status |
|---|---------------|-----------|-----------------|--------|
| 1 | `AppError` enum (Domain, NotFound, Conflict, Validation, Storage) | pheno-errors, various pheno-* crates | `pheno-errors` | ✅ Absorbed — v0.1.0 created |
| 2 | Config loading / parsing (YAML, JSON, TOML) | Settly (Go), Configra (Rust), pheno-config | `Configra` | ✅ Absorbed — Settly crates migrated to Configra/crates/ |
| 3 | CLI argument parsing | clap-ext (published crate), sharecli (local) | `clap-ext` (crates.io) | ✅ Verified — sharecli has no `clap_ext` refs |
| 4 | Python utility functions | `phenotype-py-utils` (does not exist), `phenotype-py-extras` | `phenotype-py-extras` | ⚠️ py-utils does not exist on GitHub. py-extras serves as the consolidated extras repo. No active duplication. |
| 5 | LLM dispatch (cheap-llm) | cheap-llm-mcp (archived), dispatch-mcp, thegent | `dispatch-mcp` | ✅ Verified — no `.rs` refs to `cheap_llm` remain in fleet |
| 6 | Profiling / performance analysis scripts | Profila (9 Python scripts), ObservabilityKit/python/performance_kit/ | `ObservabilityKit` | ✅ Cross-ref created — MOVED_TO_OBSERVABILITYKIT.md + README table |
| 7 | Error handling patterns (From impls, logging) | pheno-errors, pheno-shared, phenotype-sdk | `pheno-errors` | ✅ Absorbed — pheno-errors now canonical |
| 8 | Go config structs (`Config`, `Provider`, etc.) | Settly (Go), Configra (Rust reimplementation) | `Configra` | ✅ Absorbed — Go code archived, Rust equivalents in Configra |

## Notes

1. **phenotype-py-utils** does not exist as a GitHub repository. The name appears in local file references but is a phantom repo — likely a planned but never-created separation. No action needed beyond noting it.
2. **phenotype-py-extras** is active and contains consolidated Python extras. It is the de-facto Python utilities repo.
3. All config-related Go code from Settly has been ported to Rust in Configra's workspace crates. No Go source remains in production use.

## Next Steps

- Monitor for new duplication as pheno-errors v0.1.0 gains adoption across the fleet
- Consider a `pheno-utils` crate for truly generic utilities that don't fit pheno-errors (but defer — let the pattern emerge)

---

*Generated as part of Stage1 Config Consolidation (Task 12 / L5-500 of the v11 DAG).*
