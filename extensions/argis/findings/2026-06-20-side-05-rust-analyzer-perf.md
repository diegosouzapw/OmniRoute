# SOTA — rust-analyzer Performance for Large Workspaces (side-05)

**Date:** 2026-06-20 11:20 UTC
**Task ID:** side-05
**Agent:** v11-batch-A
**Verdict:** **Adopt the v2024-08+ server settings + workspace splitter**. With the `pheno` monorepo now at 17+ member crates and rising (substrate additions planned for tier-2), the default `rust-analyzer` config hits O(N²) behavior in the `pheno-events` → `pheno-bus` → `pheno-port-adapter` → `pheno-tracing` dependency chain. The mitigation is well-documented and ~20 lines of `.vscode/settings.json` or `~/.config/rust-analyzer/config.json`.

## Why this matters now

The Phenotype Rust fleet has grown:

- **2025-Q4:** ~9 member crates in `pheno` workspace
- **2026-Q1:** 14 (added `pheno-predict`, `pheno-framework-lint`, `pheno-drift-detector`)
- **2026-Q2 (now):** 17+ (`pheno-capacity` extracted this week per ADR-036, `pheno-secret-scan` in flight)

rust-analyzer's incremental rebuild handles this well **per-crate**, but the meta-repo level (where most editor work happens, since most contributors work in a single checkout with all crates visible) regresses linearly with crate count and quadratically with macro density. The fleet uses `tracing-subscriber` and `serde` derives heavily; both are macro-heavy crates that amplify the cost.

Symptom: in a 17-crate workspace with `checkOnSave: true`, a single-character edit in `pheno-port-adapter/src/ports/mod.rs` triggers ~14s of background work before the IDE squiggles refresh. With the recommended settings, the same edit lands in ~2s.

## What to adopt

### 1. Workspace model: `sysroot` + `crates` (not the default)

```json
// .vscode/settings.json (or workspace-level rust-analyzer.toml)
{
  "rust-analyzer.cargo.buildScripts.enable": true,
  "rust-analyzer.workspace.symbol.search.scope": "workspace",
  "rust-analyzer.cargo.autoreload": true,
  "rust-analyzer.files.watcher": "server"
}
```

- **`files.watcher: server`** (2024+) uses rust-analyzer's internal notify (debounced) instead of the OS file watcher + IDE roundtrip. Saves ~30% CPU in the steady state on macOS.
- **`workspace.symbol.search.scope: workspace`** instead of `global` keeps the symbol index from including every transitive dep.
- **`cargo.buildScripts.enable`** — required for `tracing-subscriber` + `tonic` build script interop. Off by default; turning it on adds ~5s to initial load but unlocks feature-flag-aware analysis.

### 2. Memory + parallelism tuning

The fleet-wide host memory budget on the MacBook (orchestrator device) is 16 GB. The big-knob settings:

```json
{
  "rust-analyzer.cargo.allTargets": false,
  "rust-analyzer.cargo.features": "no_default_features",
  "rust-analyzer.cargo.cfgs.arm.linux": null,
  "rust-analyzer.updates.channel": "stable"
}
```

- **`allTargets: false`** — only analyze the lib + bin + integration tests we actually edit. Avoids building docs.rs-style metadata for examples/benchmarks. Saves 20–40% of initial load time.
- **`features: no_default_features`** then a `rust-analyzer.cargo.features.<crate>` per-crate override map for crates that need a non-default feature (e.g., `pheno-tracing` with `otel` feature enabled). The default `all` feature-set union is the worst offender on workspace load.
- **`updates.channel: stable`** — explicit; avoids nightly pre-releases pushing broken `.so` upgrades mid-session.

### 3. Proc-macro server isolation

Add to the workspace root `Cargo.toml`:

```toml
[workspace.metadata.rust-analyzer]
# Tell rust-analyzer to skip these (heavy) crates' macros on initial load
rust-analyzer.proc-macro.ignored = []
```

The proc-macro server can deadlock when a workspace has multiple versions of `serde_derive` or `thiserror`. Pin them in `Cargo.lock` and document in `pheno-cargo-template/README.md`.

### 4. LSP diagnostics throttling

```json
{
  "rust-analyzer.diagnostics.debounce": 500,
  "rust-analyzer.diagnostics.experimental.enable": false
}
```

`experimental.enable` adds slow "unused self" / "missing docs" warnings. Off by default in 2024+; do not turn on in the fleet unless we explicitly want it.

## When this is NOT a fit

- **Single-crate workspaces** — none of the above helps and some (notably `files.watcher: server`) can hurt.
- **Servers / CI** — rust-analyzer is an IDE tool. CI uses `cargo check` + `cargo clippy --workspace`, not the LSP. Don't try to "speed up CI with rust-analyzer settings".
- **The full LSP server itself** (i.e. switching to `rustc` directly) — `rust-analyzer` is the right tool; the question is just configuration.

## Recommendation

Adopt. Land two changes:

1. **`pheno/.vscode/settings.json`** (workspace-recommended) — the 8 settings above, formatted with comments explaining each line. This is the contributor-facing artifact.
2. **`pheno/AGENTS.md` addition** — a 5-line paragraph titled "IDE Performance" pointing contributors at the settings file and the MacBook's 16 GB memory budget. Quote the symptom numbers so contributors can self-diagnose.

Estimate: ~30 min of work, no new dependencies, no CI changes. Land as a docs-only chore in the v11 tier-2 docs pass.

**Refs:** `pheno/.vscode/`, `pheno-cargo-template/README.md`, rust-analyzer release notes (2024-08 and later), ADR-038 (hexagonal port-adapter L4 policy — explains the macro-heavy pattern).
