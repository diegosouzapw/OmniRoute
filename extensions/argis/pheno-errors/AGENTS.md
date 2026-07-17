# AGENTS.md — pheno-errors

**Date:** 2026-06-20
**Status:** ACTIVE
**Substrate type:** `pheno-*-lib` (pure reusable library)

## Project Overview

`pheno-errors` is the canonical error-type substrate for the `pheno-*` fleet.
Provides a single `Error` enum that wraps domain-specific error variants with
contextual metadata (kind, source location, cause chain, remediation hint).
Designed to be the canonical errors substrate per ADR-018 (PRCP pattern).

**Language:** Rust 2021
**Build system:** Cargo
**Test framework:** `cargo test` + `insta` snapshots
**Observability:** `pheno-tracing` (canonical per ADR-012, ADR-036B) + `pheno-otel` (OTLP wire per ADR-037)

## Stack

- **Runtime:** `std` + `thiserror` (derive macros)
- **Backtrace:** `std::backtrace` (Rust 1.65+)
- **Async:** `tokio` (for `From<tokio::io::Error>` conversions)
- **OTel export:** `pheno-otel` — error events emitted as OTLP log records with severity mapping (WARN/ERROR/FATAL)
- **No CLI / no binary** — library-only crate

## Key Commands

```bash
# Build
cargo build --release
cargo build --all-features

# Test
cargo test
cargo test --features otlp-export   # OTLP wire test (requires collector)
cargo test --features snapshot       # insta snapshot tests

# Lint
cargo clippy --all-features -- -D warnings
cargo fmt --check

# Coverage
just coverage    # uses cargo-tarpaulin, gates at 80% (lib threshold per ADR-040)
```

## Substrate Quality (71-Pillar Targets)

- **Spec** (this file)
- **Docs** (`README.md` + `lib.rs` rustdoc — every variant has a `///` doc)
- **Test matrix** — unit + integration + property + snapshot
- **Observability** — `tracing::error!()` on every `Error::new()`; OTLP wire via `pheno-otel` (L46 P0)
- **Coverage gate** — ≥ 80% (lib threshold per ADR-040)
- **CI gate** — `pheno-ci-templates` runs the test matrix + coverage gate + cargo audit
- **Worklog v2.1** — `Date | Task ID | Layer | Action | Files | Notes | device:`

## Public API (Quickstart)

```rust
use pheno_errors::{Error, ErrorKind, Result};

fn load_config(path: &Path) -> Result<Config> {
    let raw = std::fs::read(path)
        .map_err(|e| Error::new(ErrorKind::Io, "config read failed")
            .with_source(e)
            .with_context("path", path.display().to_string())
            .with_hint("check file exists and is readable"))?;
    Ok(toml::from_slice(&raw)?)
}
```

## Active ADRs (apply to this crate)

- **ADR-018** — PRCP pattern (this crate is the polyglot-reuse substrate)
- **ADR-037** — pheno-otel OTLP wire (error events emit to OTLP collector)
- **ADR-012** — pheno-tracing canonical
- **ADR-040** — Test coverage gates per tier

## Error Kind Categories

| Kind | Severity (OTel) | When |
|---|---|---|
| `Io` | ERROR | File / network / subprocess I/O failures |
| `Parse` | WARN | Failed to parse user input or external data |
| `Config` | ERROR | Config validation or schema mismatch |
| `Auth` | ERROR | Auth/permission failures (NEVER WARN — security) |
| `Network` | ERROR | Connection refused / DNS / TLS handshake |
| `Timeout` | WARN | Operation exceeded its budget |
| `NotFound` | INFO | Lookup miss (often not actually an error) |
| `Conflict` | ERROR | Resource state conflict (e.g., duplicate) |
| `Internal` | FATAL | Bug / invariant violation |
| `External` | ERROR | Upstream service returned an error |

## Forward (v12+)

- v12 T1 (L46 OTLP wire) — `pheno-otel` integration landed
- v12 T2 (L11 chaos) — error injection tests for retry logic
- v12 T9 (L57 perf) — benchmark `Error::new()` for hot-path impact

## Related

- `pheno-tracing` — observability sibling
- `pheno-otel` — OTLP wire substrate
- `pheno-port-adapter` — sibling hexagonal port

## Conventions

- **Branch naming:** `chore/<req-id>-<slug>-<date>` / `feat/<req-id>-<slug>-<date>`
- **Commit messages:** Conventional Commits
- **PR labels:** `governance` for cleanup, `L<n>-#<n>` for tracking
- **Breaking changes:** Require ADR + migration guide in `CHANGELOG.md`
