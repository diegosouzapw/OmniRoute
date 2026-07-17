# SOTA — tokio-console for Runtime Observability (side-04)

**Date:** 2026-06-20 11:10 UTC
**Task ID:** side-04
**Agent:** v11-batch-A
**Verdict:** **Adopt in dev/CI, gated for prod**. tokio-console 0.1.13+ gives us per-task live debugging with negligible runtime cost when wired through the `console-subscriber` feature flag. Worth wiring into `pheno-tracing` as an opt-in layer, behind the existing `init_tracing` builder.

## What tokio-console is (2026-06)

`tokio-console` is a debugger for the Tokio async runtime, designed by the Tokio team and shipped as a `tokio` subcommand + a `console-subscriber` library crate. It provides:

- **Task view** — every spawned task with current state (`Idle`, `Scheduled`, `Running`, `Yielded`), waker chain, polls, total busy time.
- **Resource view** — current and historical counts of `Semaphore` permits, `Notify` waiters, mutex holders, `mpsc` channel depths.
- **Waker view** — diagnose missed wakeups or starvation.
- **Stream/Sink view** — show pending messages on internal channels.

Wire-up is two lines:

```rust
console_subscriber::init();   // replaces tracing-subscriber::fmt::init in dev
// or layered:
let console_layer = console_subscriber::ConsoleLayer::builder().spawn();
tracing_subscriber::registry().with(console_layer).with(fmt_layer()).init();
```

The CLI side: `tokio-console http://localhost:6669` connects over a Unix domain socket / TCP, with optional TLS.

## Fleet relevance (2026-06-20)

Which fleet services run on Tokio and would benefit:

- **`pheno-events`** — the event-bus substrate; spawns one task per consumer. Hard to debug "why is consumer X not draining?" without per-task state.
- **`pheno-bus`** — same shape; ~5–50 concurrent tasks at steady state.
- **`phenotype-hub`** — framework runtime; long-lived tasks for consumer registration, dispatch loop. A consumer that wedges is currently invisible until logs trip.
- **`phenotype-gateway`** — federation ingress; per-connection task. Need to know "which connections are blocked on which downstream" during incidents.
- **`pheno-mcp-router`** — provider adapter dispatcher; each `LlmPort::call` is a task. Currently we time-out at the consumer level; per-task state would tell us which provider is slow.

OTLP + `tracing-subscriber` already covers structured spans + export, but **does not** give the live "what is every task doing right now" view. That is exactly tokio-console's gap-fill.

## Concrete recommendations

1. **Wire `console-subscriber` into `pheno-tracing::init_tracing` as an opt-in layer**. Default off in release builds (the binary `tokio-console` server is a dev/CI tool, not a prod dependency); default on in `cfg(debug_assertions)` and in `PHENO_TRACING_CONSOLE=1` env. Total added binary size: ~200 KB; runtime overhead: <1% per the Tokio team's measurements.
2. **CI workflow**: in the integration-test job, set `TOKIO_CONSOLE_BIND=127.0.0.1:6669`, spawn `tokio-console --no-palette --output json` for 30 seconds during the long-running test, snapshot the task count histogram, fail the test if any task is stuck in `Running > 5s` without making progress. Catches the "one consumer is wedged" bug class without human intervention.
3. **Dev wrapper**: add a `just trace-console` target that runs `RUSTFLAGS=... cargo run --bin <service>` with the console subscriber pre-wired.
4. **Reuse the OTLP export path**: `console-subscriber` exports its data via `tracing` spans, so existing `pheno-otel` ingest already gets task-state events for free if we hook the right `Layer`. Validate this in the spike.
5. **Security note**: tokio-console binds plaintext by default; **do not** expose port 6669 outside localhost without TLS. The `console-subscriber` crate supports `with_tls` but it is still flagged unstable in 0.1.x — wait for 0.2.

## When NOT to adopt

- **Headless, single-shot CLI tools** (`pheno-clap`-derived binaries that run and exit in <1s). The console adds zero value because there is no live state to inspect.
- **Production release builds** without explicit opt-in. The console listener is a debug surface; leaving it bound in prod is an unnecessary information-disclosure risk.
- **Anything where the `cfg(target_has_atomic = "64")` constraint blocks us**. Tokio currently requires 64-bit atomics; this is a non-issue for the fleet (all targets are 64-bit) but worth noting for any future wasm32-side deployment.

## Recommendation

Adopt. Open a tracking issue on `pheno-tracing` for the `init_tracing` builder change. Spike: 1 PR (`pheno-tracing#N`) that adds the opt-in layer + a sample `pheno-events` integration test that asserts no task is `Running > 5s`. Estimate: 2–4 hours including CI integration. Land in v11 tier-2.

**Refs:** `pheno-tracing/src/init.rs`, `pheno-events/src/runtime.rs`, `phenotype-hub/src/dispatcher.rs`, `tokio-console` 0.1.13 docs, ADR-012 (`pheno-tracing` canonical).
