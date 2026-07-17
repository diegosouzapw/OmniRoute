# pheno-otel — SPEC.md

> **Spec status:** `implemented` — this document reflects the current codebase.
> **Last audited:** `2026-06-20` against branch `chore/orch-v11-016-tier0-2026-06-20`.
> **Substrate tier:** `pheno-*-lib` (per ADR-023 Rule 3).
> **Substrate role:** canonical OTLP wire-format export substrate (per ADR-037).

---

## 1. What (1 paragraph)

`pheno-otel` is the **canonical OTLP (OpenTelemetry Protocol) wire-format export substrate** for the pheno-* fleet. It defines the `OtlpPort` trait (hexagonal Port side, per ADR-038) and ships two concrete exporters — `StdoutExporter` (writes to stderr for local dev) and `HttpExporter` (POSTs OTLP/JSON to an OTLP/HTTP endpoint for traces/metrics/logs). It is the **export-side sibling** of `pheno-tracing` (ADR-036, the *produce* side) and is the substrate that downstream consumers (and language-specific SDKs in `phenotype-go-sdk`, `phenotype-python-sdk`) depend on for consistent OTLP wire-format export.

## 2. Why (1 paragraph)

Prior to v11, OTLP export across the pheno-* fleet was inconsistent: some crates embedded the `opentelemetry` SDK directly (heavyweight, version-skewed), others used bespoke exporters, and 2 pheno-* crates had no export path at all. Without a canonical OTLP export substrate, every consumer reinvents the wire-format handling, batch-processor behavior, and resource-attribute propagation — a new OTLP backend means a new contract, test matrix, and observability hook. `pheno-otel` solves this by being the smallest possible kernel of the export pattern — `OtlpPort` + 2 concrete impls + 1 typed error + 1 opaque handle — that downstream consumers and SDKs align to.

## 3. How (architecture, 3 sentences + ASCII diagram)

The crate exposes a single `OtlpPort` trait with 4 methods (`name`, `health`, `export`, `flush`). Two concrete exporters (`StdoutExporter`, `HttpExporter`) implement the trait for stderr and OTLP/HTTP targets respectively. Every failure is typed via the `OtlpError` enum (4 variants: `SerializeFailed`, `Transport`, `NotConfigured`, `InvalidAttribute`), derived via `thiserror`. Export handles are opaque (`ExportHandle { endpoint, service_name }`); the trait is sync (async backends should buffer internally).

```
           producer (pheno-tracing, app code, ...)
                          │
                          ▼
            ┌──────────────────────────┐
            │   pub trait OtlpPort     │  ◀── hexagonal Port
            │   name / health /        │
            │   export / flush         │
            └──────────────────────────┘
                          △
            ┌─────────────┴─────────────┐
            │                           │
   ┌────────┴─────────┐       ┌─────────┴────────┐
   │ StdoutExporter   │       │  HttpExporter    │  ◀── in-tree Adapter impls
   │ (writes stderr)  │       │ /v1/traces       │
   │                  │       │ /v1/metrics      │
   │                  │       │ /v1/logs         │
   └──────────────────┘       └──────────────────┘
            △                           △
            └─────────────┬─────────────┘
                          │
                  ┌───────┴────────┐
                  │  MockExporter  │  ◀── test-only (in src/lib.rs)
                  └────────────────┘
```

## 4. Interface (API surface)

```rust
// src/lib.rs
pub trait OtlpPort: Send + Sync {
    fn name(&self) -> &str;
    fn health(&self) -> Result<(), OtlpError>;
    fn export(&self, payload: &[u8]) -> Result<ExportHandle, OtlpError>;
    fn flush(&self) -> Result<(), OtlpError>;
}

pub struct ExportHandle {
    pub endpoint: String,
    pub service_name: String,
}

#[derive(Debug, thiserror::Error)]
pub enum OtlpError {
    #[error("serialization failed: {0}")]
    SerializeFailed(String),
    #[error("transport error: {0}")]
    Transport(String),
    #[error("exporter not configured: {0}")]
    NotConfigured(String),
    #[error("invalid attribute: {0}")]
    InvalidAttribute(String),
}

pub mod exporters;        // StdoutExporter, HttpExporter (traces/metrics/logs)
pub fn test_handle(endpoint: &str) -> ExportHandle;
```

## 5. Consumers

- `pheno-tracing` — produces spans; uses `pheno-otel` to export them via OTLP.
- `pheno-port-adapter` — connection-lifecycle spans flow through `pheno-otel`.
- `phenotype-go-sdk` / `phenotype-python-sdk` — polyglot substrate mirrors.
- Application crates across the pheno-* fleet that need OTLP export.

## 6. Status

- Implemented: `OtlpPort` trait + 2 concrete exporters + 4-variant error + 1 opaque handle.
- Tests: 23 inline unit tests (7 in `src/lib.rs`, 6 in `src/exporters/stdout.rs`, 10 in `src/exporters/http.rs`).
- Coverage gate (ADR-040, lib tier): 80% lines (target — first llvm-cov run pending).
- Pattern conformance: yes, follows `Port` trait + `Adapter` impl per ADR-038.
- Observability: this crate IS the observability substrate; OTLP smoke test wired in `ci.yml` of every consumer.

## 7. References

- ADR-037 — pheno-mcp-router substrate canonical (analogous substrate-assignment ADR; this crate is the OTLP substrate assignment under the same family).
- ADR-036 — pheno-tracing canonical (sibling substrate; this crate exports what pheno-tracing produces).
- ADR-038 — Hexagonal L4 Port/Adapter policy (this crate is a consumer of the pattern).
- ADR-023 — Agent-effort governance (substrate placement + Rule 3.1 quality bar).
- ADR-040 — Test coverage gates per tier (80% lib gate).
- ADR-042 — Substrate quality bar (7-element).
