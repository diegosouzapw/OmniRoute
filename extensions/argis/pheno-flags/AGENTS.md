# AGENTS.md — pheno-flags

**Date:** 2026-06-20
**Status:** ACTIVE
**Substrate type:** `pheno-*-lib` (pure reusable library)

## Project Overview

`pheno-flags` is a boolean feature-flag library for the `pheno-*` fleet.
It provides a deterministic, allocation-free flag store with compile-time
flag registration and runtime evaluation. Designed to be the canonical
flags substrate for the fleet per ADR-022 (config consolidation) and
ADR-031 (Configra absorb — flags stay separate from config).

**Language:** Rust 2021
**Build system:** Cargo
**Test framework:** `cargo test` (standard library + `tokio::test`)

## Stack

- **Runtime:** `std` + `tokio` (async flag updates)
- **Serialization:** `serde` + `serde_json` (flag persistence)
- **Concurrency:** `parking_lot::RwLock` (low-contention reads)
- **Observability:** `pheno-tracing` (substrate canonical per ADR-012, ADR-036B)
- **No CLI / no binary** — library-only crate

## Key Commands

```bash
# Build
cargo build --release
cargo check --all-features

# Test
cargo test
cargo test --release
cargo test -- --nocapture    # show println! output

# Lint
cargo clippy --all-features -- -D warnings
cargo fmt --check

# Format
cargo fmt

# Coverage
cargo install cargo-tarpaulin
just coverage

# Docs
cargo doc --no-deps --open
```

## Substrate Quality (71-Pillar Targets)

This crate ships with:

- **Spec** (this file) — 1-page overview
- **Docs** (`README.md` + `lib.rs` rustdoc) — what, when, when not, 5-line quickstart
- **Test matrix** — unit + integration + property tests
- **Observability** — `tracing` instrumentation via `pheno-tracing`
- **Coverage gate** — ≥ 80% (lib/SDK threshold per ADR-040)
- **CI gate** — `pheno-ci-templates` runs the test matrix
- **Worklog v2.1** — `Date | Task ID | Layer | Action | Files | Notes | device:`

## Public API (Quickstart)

```rust
use pheno_flags::{Flag, FlagStore, FlagValue};

let mut store = FlagStore::new();
store.register(Flag::bool("dark_mode").with_default(false));
store.register(Flag::string("theme").with_default("light"));

assert_eq!(store.get_bool("dark_mode"), Some(false));
store.set("dark_mode", FlagValue::Bool(true));
assert_eq!(store.get_bool("dark_mode"), Some(true));
```

## Active ADRs (apply to this crate)

- **ADR-022** — Config consolidation (flags stay separate from Configra)
- **ADR-031** — Configra absorb (this crate remains standalone, not absorbed)
- **ADR-040** — Test coverage gates per tier (80% lib threshold)
- **ADR-012** — `pheno-tracing` as canonical tracing substrate

## Forward (v12+)

- v12 T3 (L29 justfile migration) — `justfile` added
- v12 T7 (L46 vuln mgmt) — `cargo audit --deny warnings` in CI
- v12 T9 (L57 perf regression) — benchmark `FlagStore::get` for hot-path latency

## Related

- `pheno-config` — sibling (absorbed into Configra, this crate is separate)
- `pheno-context` — sibling (also absorbed)
- `pheno-tracing` — observability substrate
- `pheno-port-adapter` — sibling hexagonal port

## Conventions

- **Branch naming:** `chore/<req-id>-<slug>-<date>` / `feat/<req-id>-<slug>-<date>`
- **Commit messages:** Conventional Commits
- **PR labels:** `governance` for cleanup, `L<n>-#<n>` for tracking
