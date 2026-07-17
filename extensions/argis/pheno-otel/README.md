# `pheno-otel`

> **Canonical OpenTelemetry initialization for the Phenotype fleet.**

`pheno-otel` is the substrate-canonical Rust library that provides one-line
OpenTelemetry initialization with a `Drop`-based `TelemetryGuard` that flushes
and shuts down the global tracer provider on scope exit. It pins the
OpenTelemetry 0.27 line and is used across every `pheno-*` substrate that
exports telemetry.

## Why

Every `pheno-*` substrate that wants OTLP export should not re-implement the
opentelemetry pipeline. `pheno-otel::init()` does it in one call. The
`TelemetryGuard` ensures clean shutdown — no lost spans on panic, no zombie
exporters.

## Where the code lives

- **Governance + meta-bundle:** this path (`pheno-otel/` at the monorepo root)
- **Executable Rust source:** `FocalPoint/pheno-otel/` (separate git repo, its
  own release cadence)
- **Spec:** `FocalPoint/pheno-otel/README.md`

When a release is cut from `FocalPoint/pheno-otel/`, this path's
`CHANGELOG.md` is updated to reflect the new version.

## 5-line quickstart

```rust
use pheno_otel::{init, TelemetryGuard};

fn main() {
    let _guard = init("my-service", "http://otel-collector:4317");
    // ... app runs, telemetry exported via OTLP/gRPC ...
    // _guard drops here, flushes + shuts down cleanly
}
```

## When to use

- Any `pheno-*` Rust service that wants OTLP/gRPC or OTLP/HTTP export.
- Any binary that needs deterministic telemetry shutdown (panic-safe).

## When NOT to use

- If you only need stdout/log export (use `tracing-subscriber` directly).
- If you need custom span processors beyond what `pheno-otel` provides (fork
  it; do not monkey-patch in your consumer).

## Features

- OTLP/gRPC + OTLP/HTTP exporters (feature-gated)
- Panic-safe shutdown via `Drop`
- Resource attribute injection from env (`OTEL_SERVICE_NAME`, `OTEL_RESOURCE_ATTRIBUTES`)
- Honest 1.82 MSRV (no surprises with stable toolchains)

## Status

- **Tier:** 0 (substrate canonical)
- **Coverage gate:** 80% lib minimum (ADR-040)
- **71-pillar score:** see `findings/71-pillar-2026-06-17.md`
- **Substrate canonicals:** ADR-012, ADR-036B

## License

Dual-licensed under MIT or Apache 2.0, at your option. See `LICENSE-MIT` and
`LICENSE-APACHE`.

## Contributing

See `CONTRIBUTING.md`. For security issues, see `SECURITY.md`.
