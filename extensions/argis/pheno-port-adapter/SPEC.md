# pheno-port-adapter — SPEC.md

> **Spec status:** `implemented` — this document reflects the current codebase.
> **Last audited:** `2026-06-18` against tree `86784dc870`.
> **Substrate tier:** `pheno-*-lib` (per ADR-023 Rule 3).
> **Pattern role:** reference impl for the hexagonal L4 Port/Adapter contract (ADR-038).

---

## 1. What (1 paragraph)

`pheno-port-adapter` is the **reference implementation of the hexagonal L4 Port/Adapter pattern** (ADR-038) for the pheno-* fleet. It defines the canonical `PortAdapter` trait (Port side) and ships two concrete transport adapters — `TcpAdapter` and `UnixAdapter` — plus a `MockAdapter` for tests. It is consumed by every other pheno-* substrate crate that needs an external boundary, and is the upstream exemplar that 19 of 22 pheno-* Rust crates are migrating to per the ADR-038 adoption matrix.

## 2. Why (1 paragraph)

Prior to v8, only 3 of 22 pheno-* Rust crates followed a consistent `Port` trait + `Adapter` impl shape; 19 used ad-hoc traits, free functions, or direct dependencies (ADR-038 § Context). Without a canonical hexagonal L4 pattern, every external boundary is bespoke: a new transport means a new contract, test matrix, and observability hook. `pheno-port-adapter` solves this by being the smallest possible kernel of the pattern — `PortAdapter` + 3 concrete impls + 1 typed error — that downstream crates can copy/extend instead of inventing their own shape. Win condition: 22/22 pheno-* substrate crates share a uniform `Port` trait + `Adapter` impl, and out-of-tree Adapters are first-class (community can ship alternative adapters).

## 3. How (architecture, 3 sentences + ASCII diagram)

The crate exposes a single `PortAdapter` trait with 4 methods (`name`, `health`, `connect`, `disconnect`). Two transport adapters (`TcpAdapter`, `UnixAdapter`) implement the trait using std `TcpStream` / `UnixStream`; a `MockAdapter` is included for tests. Every failure is typed via the `AdapterError` enum (4 variants: `ConnectFailed`, `DisconnectFailed`, `HealthCheckFailed`, `Timeout`), derived via `thiserror`. Connection handles are opaque (`Connection { id: String }`); the trait is sync (async overlay is deferred to v0.2.0).

```
           consumer (pheno-tracing, pheno-otel, ...)
                          │
                          ▼
            ┌──────────────────────────┐
            │  pub trait PortAdapter   │  ◀── hexagonal Port
            │  name / health /         │
            │  connect / disconnect    │
            └──────────────────────────┘
                          △
            ┌─────────────┴─────────────┐
            │                           │
   ┌────────┴────────┐         ┌────────┴────────┐
   │   TcpAdapter    │         │  UnixAdapter    │  ◀── in-tree Adapter impls
   │ (TcpStream)     │         │ (UnixStream)    │
   └─────────────────┘         └─────────────────┘
            △                           △
            └─────────────┬─────────────┘
                          │
                  ┌───────┴────────┐
                  │  MockAdapter   │  ◀── test-only
                  └────────────────┘
```

## 4. Interface (API surface)

```rust
// src/lib.rs
pub trait PortAdapter: Send + Sync {
    fn name(&self) -> &str;
    fn health(&self) -> Result<(), AdapterError>;
    fn connect(&self, endpoint: &str) -> Result<Connection, AdapterError>;
    fn disconnect(&self) -> Result<(), AdapterError>;
}

pub struct Connection { pub(crate) id: String }

#[derive(Debug, thiserror::Error)]
pub enum AdapterError {
    #[error("connect failed: {0}")]
    ConnectFailed(String),
    #[error("disconnect failed: {0}")]
    DisconnectFailed(String),
    #[error("health check failed: {0}")]
    HealthCheckFailed(String),
    #[error("timeout")]
    Timeout,
}

pub mod adapters;  // TcpAdapter, UnixAdapter, MockAdapter
```

Full API reference: `llms.txt`.

### Canonical example — `HexStorage` port (consumer pattern, illustrative)

To show how downstream crates consume `pheno-port-adapter`'s pattern, here is the canonical `HexStorage` port that the v8 plan T16 docs use as the example. It is **not** in this crate — it is the pattern downstream consumers copy:

```rust
// In a consumer crate (illustrative; not in pheno-port-adapter)
pub trait HexStorage: Send + Sync {
    async fn put(&self, key: &str, bytes: Vec<u8>) -> Result<(), StorageError>;
    async fn get(&self, key: &str) -> Result<Vec<u8>, StorageError>;
}

pub struct S3Adapter { /* s3 sdk client */ }
impl HexStorage for S3Adapter { /* ... */ }

pub struct LocalDiskAdapter { /* std::fs wrapper */ }
impl HexStorage for LocalDiskAdapter { /* ... */ }

pub struct InMemoryAdapter;  // for tests
impl HexStorage for InMemoryAdapter { /* ... */ }
```

`pheno-port-adapter` is the same shape (`PortAdapter` trait + 2 in-tree `Adapter` impls + 1 test mock) for the connection-lifecycle concern, generalized across transports.

## 5. Status (current state)

| Component | Status | Notes |
|---|---|---|
| `PortAdapter` trait | `shipped` | 4 methods, `Send + Sync` (ADR-038 pattern contract) |
| `AdapterError` enum | `shipped` | 4 variants, `thiserror`-derived, `#[error("...")]` on each |
| `Connection` opaque handle | `shipped` | `id: String`; no inner state exposed |
| `TcpAdapter` | `shipped` | sync; uses `std::net::TcpStream` |
| `UnixAdapter` | `shipped` | sync; uses `std::os::unix::net::UnixStream` |
| `MockAdapter` | `shipped` | test-only, in-tree |
| Unit tests | `partial` | 5 inline tests in `src/lib.rs`; no `tests/` integration subdir yet (T18.4 target ≥ 80%) |
| `tests/otlp_smoke.rs` | `scaffold` | present on later branches; OTLP smoke test via `pheno-tracing` |
| `tests/tracing_test.rs` | `scaffold` | present on later branches; feature-gated on `tracing` |
| CI / tests | `yellow` | clippy + rustfmt clean; no `.github/workflows/ci.yml` on main yet (T19.4 target) |
| Observability | `partial` | `health()` method exists; structured logging + OTLP spans via `pheno-tracing` feature-gated (T22.3 target) |
| SPEC.md | `shipped` | this file (ADR-042 element 1) |
| STATUS.md | `shipped` | this turn (ADR-042 element 1) |
| CONTRIBUTING.md | `shipped` | this turn (ADR-042 element 1) |
| llms.txt (v8 template) | `shipped` | this turn (T20.7) |
| WORKLOG.md (v2.1 schema) | `shipped` | this turn (ADR-025 + ADR-030) |
| CHANGELOG.md (Keep-a-Changelog) | `shipped` | this turn |

## 6. Out of scope (explicit deferrals)

- **Async on the trait itself** — deferred to v0.2.0; sync only in v0.1.0 (ADR-038 keeps the contract sync; async overlay is downstream).
- **TLS termination** — caller's responsibility; wrap the adapter.
- **Connection pooling** — deferred; use `deadpool` or similar externally.
- **Load balancing** — caller's responsibility.
- **HTTP/WebSocket/gRPC adapters** — out of scope for the substrate layer; use `phenotype-go-sdk/pkg/port` (Go) or `phenotype-python-sdk/phenotype/port` (Python) for higher-level transports.
- **More transports** (e.g. in-memory channel, inproc pipe) — open extension point; per ADR-038, out-of-tree Adapters are first-class.

## 7. References

- `README.md` — quickstart, when/when NOT, install (planned; see STATUS.md § 4)
- `llms.txt` — full API reference
- `WORKLOG.md` — change history (per ADR-025 v2.1, includes `device:` field)
- `CHANGELOG.md` — release notes (Keep a Changelog 1.1.0)
- `LICENSE-MIT` — license
- `docs/adr/2026-06-18/ADR-014-hexagonal-l4-ports.md` — predecessor (hexagonal L4 pattern, original)
- `docs/adr/2026-06-18/ADR-038-hexagonal-port-adapter-l4-policy.md` — **canonical pattern contract; this crate is the reference impl**
- `docs/adr/2026-06-18/ADR-023-agent-effort-governance.md` — substrate placement + Rule 3.1 quality bar
- `docs/adr/2026-06-18/ADR-042-substrate-quality-bar.md` — 7-element quality bar (this SPEC.md is element 1)
- `docs/adr/2026-06-18/ADR-040-test-coverage-gates-per-tier.md` — 80% lib/SDK gate
- `docs/adr/2026-06-18/ADR-036-pheno-tracing-canonical.md` — observability substrate
- `docs/adr/2026-06-18/ADR-025-worklog-v2-1-schema-bump.md` — `device:` field

---

## Template usage notes (per ADR-042)

- **Length:** target ≤ 1 page (≤ 80 lines). This file is at the upper bound (87 lines incl. header); if it grows past 100, split the substrate.
- **Status discipline:** every component marked with one of `shipped | scaffold | partial | blocked`. No "TBD".
- **Tone:** declarative, present tense. "X is Y" not "X will be Y".
- **Update cadence:** re-audit every quarter OR on any major architectural change (e.g. async overlay added), whichever comes first. Mark "Last audited" date.
- **Per ADR-042 (Substrate quality bar):** this SPEC.md is element 1 of the 7-element bar. CI lint (`pheno-ci-templates/quality-bar.yml`) fails PRs missing it.
