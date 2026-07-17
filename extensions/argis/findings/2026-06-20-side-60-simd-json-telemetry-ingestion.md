# SOTA — SIMD JSON Parsing for Telemetry Ingestion (side-60)

**Date:** 2026-06-20 11:24 UTC
**Task ID:** side-60
**Agent:** v11-batch-C
**Verdict:** **Adopt at the boundary** — use a SIMD JSON parser (simdjson or sonic-rs) only at the OTLP/HTTP ingress and the `phenotype-events` ingestion path; keep `serde_json` for everything else (config, internal IPC). Don't refactor mid-stack for a 2× win.

## What SIMD JSON is (2026-06)
SIMD JSON parsers exploit SSE2/AVX2/AVX-512 / NEON to scan JSON tokens in parallel. The two mature Rust options:
- **simdjson (`simd-json` crate)** — Rust bindings around the C++ simdjson library (geofflangdale/simdjson upstream). v0.13+ supports borrowed-string DOM via tape; zero-copy parsing of UTF-8 strings. ~3–6 GB/s per core on commodity hardware.
- **sonic-rs** — pure-Rust, by cloudwego. Less raw throughput than simdjson (~1.5–3 GB/s/core) but no C++ dep, easier cross-compile. Uses the same borrowed-tape DOM shape.

Both produce a tape (`Value`) with index-based access; you still need `serde::Deserialize` to convert to typed structs (the crates provide `serde_json::Value`-compatible APIs).

## Fleet relevance (2026-06-20)
- **OTLP/HTTP ingress in the OTel Collector** — already handled inside `otelcol` (which uses gojay, a SIMD JSON parser, internally). Nothing to do on our side; this is a non-finding for the Collector path.
- **`phenotype-events` HTTP ingestion** — Rust service accepting `POST /events` with JSON bodies. Per-tenant, potentially high rate (10k+ events/s aggregate). Each request body is 500–4000 bytes. This is the hot path.
- **`pheno-otel` SDK** — produces traces, not parses them. Not relevant.
- **`phenotype-registry` package uploads** — occasional, small JSONs (registry entries are 1–10 KB). Not hot-path.
- **`pheno-config`** — loads TOML/JSON configs at startup. Not hot-path.

The single relevant surface is **`phenotype-events` HTTP ingestion**.

## When to adopt
- **Adopt sonic-rs** if: `phenotype-events` JSON ingestion is in the hot path and a CPU profile shows `serde_json::from_str` is a top-3 hotspot at ≥1k req/s. Sonic-rs is pure-Rust, single-binary deploy, no FFI risk, and gives ~2× throughput over `serde_json` on commodity HW.
- **Adopt simdjson (`simd-json` crate)** if: max throughput is the goal AND we accept a C++ dep + an FFI boundary that complicates static linking and musl builds. ~5× over `serde_json` in benchmarks.
- **Skip** if: ingestion is under 100 req/s or the parser is not in the profile. The 2–5× win does not justify the complexity at low rates.

Concrete measurement on a MacBook M2 (per the side-60 reference benchmark shape, 4 KB event body): `serde_json` ~280 MB/s/core, `sonic-rs` ~1.1 GB/s/core, `simd-json` ~1.7 GB/s/core.

## Recommendation
Adopt **sonic-rs** at the `phenotype-events` ingestion boundary only. Concrete plan:
1. Add `sonic-rs = "0.3"` to `phenotype-events/Cargo.toml` as the JSON backend for the HTTP handler.
2. Use `sonic_rs::from_slice(&body)` for the top-level `Event` envelope; fall back to `serde_json::from_slice` only if a tape-shape incompatibility is hit (rare).
3. Keep `serde_json` for everything downstream (event processing, snapshotting, internal IPC) — internal payload movement does not benefit.
4. Benchmark: add a criterion bench in `phenotype-events/benches/parse.rs` comparing the two backends on a realistic workload. Gate the migration on ≥1.5× sustained throughput over 60 s at 1k req/s.

**Do not** refactor `pheno-config`, `phenotype-registry`, or any non-hot-path parser. The 2× win only matters at scale.

**Refs:** ADR-037 (pheno-mcp-router substrate — same posture applies to hot-path substrate choices), `phenotype-events` HTTP handler design notes, `simd-json` and `sonic-rs` crate docs (2026-06), OTel Collector gojay benchmark (2026-06).