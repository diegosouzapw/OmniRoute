# pheno-port-adapter — AGENTS.md (Agent Constitution)

**Date:** 2026-06-18
**Status:** ACTIVE
**Substrate:** `pheno-*-lib` (ADR-023)
**Reference role:** canonical hexagonal L4 Port/Adapter primitive (ADR-038) — `pheno-port-adapter` is the **reference impl** that the other 21 pheno-* substrate crates migrate toward.
**MSRV:** 1.82 (see `Cargo.toml`)

## Purpose

Hexagonal L4 Port/Adapter pattern primitive for the pheno-* fleet. Defines the canonical `PortAdapter` trait and ships two concrete transport adapters (TCP, Unix-domain socket). Per ADR-014 + ADR-038, every pheno-* substrate crate that exposes an external boundary is expected to follow the same `Port` trait + `Adapter` impl shape.

This crate is the **reference impl** for the hexagonal L4 pattern. It is not a wrapper or framework — it is the smallest possible kernel of the pattern that downstream crates are migrating to (see ADR-038 adoption matrix).

## Public API

```rust
// Core trait (hexagonal Port side)
pub trait PortAdapter: Send + Sync {
    fn name(&self) -> &str;
    fn health(&self) -> Result<(), AdapterError>;
    fn connect(&self, endpoint: &str) -> Result<Connection, AdapterError>;
    fn disconnect(&self) -> Result<(), AdapterError>;
}

// Opaque handle returned by connect()
pub struct Connection { pub(crate) id: String }

// Typed error envelope (thiserror-based)
pub enum AdapterError {
    ConnectFailed(String),
    DisconnectFailed(String),
    HealthCheckFailed(String),
    Timeout,
}

// Concrete Adapter impls (in-tree)
pub mod adapters;   // TcpAdapter, UnixAdapter, MockAdapter (test-only)
```

## Build & Test

```bash
cargo build --release
cargo test --workspace --all-features
cargo clippy --all-targets -- -D warnings
cargo fmt --all -- --check
```

## Conventions

- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `build:`, `ci:`).
- Branch: `<layer>/<slug>-<YYYY-MM-DD>` or `chore/<req-id>-<slug>-<date>`.
- WORKLOG: append 1 row to `WORKLOG.md` per v8 DAG task ID (schema v2.1, 11 columns including `device:` per ADR-025 + ADR-030).
- PRs: reference task ID in body, e.g. `Refs L5-116 (this PR)`.
- **Substrate placement** (ADR-023): this is a `pheno-*-lib` — pure reusable Rust library, single concern, single crate.
- **Test coverage gate** (ADR-040): 80% line coverage (ADR-023 Rule 3.1, lib/SDK gate).
- **Quality bar** (ADR-042): spec + docs + test matrix + OTLP observability via pheno-tracing (ADR-036) + 80% coverage + CI gate + worklog v2.1.
- **Pattern contract** (ADR-038): Port trait + Adapter impl — no ad-hoc free functions, no global singletons, no I/O outside trait methods.
- **Errors are typed**: every failure returns an `AdapterError` variant, never a stringly-typed error.
- **No `unwrap()` in lib code** (allowed in tests + bin).
- **Public API surface fully documented** (`#![warn(missing_docs)]` is on the way, ADR-042 element 2).

## Do-Not-Touch Zones

- `Cargo.toml` `[workspace]` table — empty (standalone crate); do not add members.
- `src/adapters/tcp.rs` + `src/adapters/unix.rs` — concrete adapters are the in-tree reference impls; only modify when porting the trait itself.
- `<archive>/`, `<vendor>/`, `<target>/` — third-party / build output.
- `**/Cargo.lock` — unless explicitly updating deps.
- Files marked `# DO NOT EDIT` header.

## Authority

- Spec: `SPEC.md` (per ADR-042 element 1; 1-page max).
- Status: `STATUS.md` (weekly refresh, 71-pillar honest).
- Worklog: `pheno-worklog-schema` v2.1 (ADR-015 + ADR-025 + ADR-030).
- Changelog: Keep a Changelog 1.1.0.
- llms.txt: see `pheno-llms-txt` (T20.7).
- Substrate governance: `docs/adr/2026-06-18/ADR-023-agent-effort-governance.md` (Rule 3 placement + Rule 3.1 quality bar).
- Pattern contract: `docs/adr/2026-06-18/ADR-038-hexagonal-port-adapter-l4-policy.md`.
- Quality bar: `docs/adr/2026-06-18/ADR-042-substrate-quality-bar.md`.
- Coverage gates: `docs/adr/2026-06-18/ADR-040-test-coverage-gates-per-tier.md`.
- CI templates: `KooshaPari/pheno-ci-templates`.

## See also

- `pheno-tracing` (canonical observability substrate, ADR-036) — `pheno-port-adapter` adopts it for OTLP smoke test.
- `pheno-otel` (OTLP exporter, ADR-037) — consumes `pheno-port-adapter`'s connection-lifecycle spans.
- `pheno-context` (request context propagation) — connection IDs flow through `Context::request_id`.
- `pheno-errors` (thiserror-aligned error envelope) — `AdapterError` follows the same derive pattern.
- `phenotype-port-adapter` (substrate name in registry): same crate, registered under the polyglot substrate convention.
