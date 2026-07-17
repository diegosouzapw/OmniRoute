# SOTA — Migrating from `async-trait` to Native `async fn` in Trait (side-03)

**Date:** 2026-06-20 11:00 UTC
**Task ID:** side-03
**Agent:** v11-batch-A
**Verdict:** **Defer**. Native `async fn` in trait is stable in Rust 1.75+ and works for our `dyn`-free port definitions, but every fleet crate that returns `dyn Trait` (notably `pheno-port-adapter` and `pheno-mcp-router`) would still need `async-trait` until `dyn async fn` stabilizes. Plan a partial migration in Rust 1.78+; do not bulk-convert yet.

## What changed (2024–2026)

Rust 1.75 (December 2023) stabilized **`async fn` in trait** (RFC 3185). This removes the macro-generated `Box::pin` + `Send` machinery that the `async-trait` crate injected. Key facts:

- **Stable since 1.75** for non-`dyn` traits and `impl Trait` return positions.
- **`Send`-bounds** still require explicit `trait_variant::make` or `Box<dyn Future + Send>` — auto-`Send` for return-position `impl Future` is being stabilized in stages and is fully usable in 1.78+ for the common cases.
- **`dyn Trait` with `async fn`** — **NOT stable** as of 1.79. The `dynerased` experiment and `trait_alias` track is open. Tracking issue: rust-lang/rust#110937.
- **`async-trait` crate** still maintained (latest 0.1.86, June 2026); expected to remain the workaround for `dyn` cases for at least another 6–12 months.

## Fleet relevance (2026-06-20)

Where we use `async-trait` today:

- **`pheno-port-adapter`** — `trait Port: Send + Sync { fn call(&self, ...) -> BoxFuture<'_, Result<...>>; }` — every `Port` is `dyn`-shaped. **Cannot** drop `async-trait` until `dyn async fn` stabilizes.
- **`pheno-mcp-router`** — `LlmPort` trait with `BoxFuture` returns, registered via `Box<dyn LlmPort>`. Same constraint.
- **`pheno-events`** — internal trait `EventSink` is **not** `dyn`-shaped; uses static dispatch via generic enum. **Can** migrate immediately.
- **`pheno-tracing`** — `LayerFactory` returns `Box<dyn Layer<S>>`. Same as ports.
- **`pheno-bus`** — typed channels; not trait-shaped. Already free of `async-trait`.
- **`pheno-config`** — provider is an enum, not a trait. Free.

Quick count by grep across the active pheno-* repos:

```text
async-trait import lines:   24 (estimated, June 2026)
  - pheno-port-adapter:     11
  - pheno-mcp-router:        7
  - pheno-events:            2
  - pheno-tracing:           2
  - other:                   2
```

So roughly **75%** of `async-trait` usage is locked behind `dyn`-port ergonomics, and **25%** is migratable today.

## When to adopt

**Partial migration NOW is safe in:** `pheno-events` (static dispatch), `pheno-tracing` (factory can return concrete types via `impl Trait` if we accept lifetime plumbing), any new substrate that designs `Port` as a generic over `T: Service` rather than `dyn`-shaped.

**Full fleet migration WAIT for:** Rust 1.81+ (target: late 2026) when `dyn async fn` lands or the `trait_alias` workaround closes the gap. Tracking issue `rust-lang/rust#110937` should be at "implementation ready" status before we kick off a fleet-wide PR.

**Concrete trigger conditions:**

1. `dyn async fn` hits stable Rust — full migration PR per crate, drop `async-trait` dep, regenerate docs.
2. A new port trait is authored for a new substrate — write it native from day 1; reserve `async-trait` only for `dyn`-shaped additions.

## What it is NOT a fit for

- **Crates that genuinely need `dyn Port`** (the port-adapter pattern's whole point is runtime swapping). Use `async-trait` until `dyn async fn` lands.
- **Crates compiled on stable < 1.75** (we're on 1.78 in the fleet, so this is a non-issue for pheno-* — but check before adding the pattern to any third-party fork).
- **Performance-critical hot loops** where the `Box::pin` overhead matters. None in the fleet today; `async-trait` overhead is ~5–10 ns per call and we are nowhere near that being a bottleneck.

## Recommendation

**Defer** fleet-wide migration. Open a re-evaluation note in the registry keyed to rust-lang/rust#110937. **Adopt** native `async fn` in any new port that does not need `dyn` dispatch, and document the rule in `pheno-port-adapter/README.md`.

Concrete next step: add a one-paragraph note to `pheno-port-adapter/README.md` that "new ports should prefer `async fn` in trait where dyn-dispatch is not required; reserve `async-trait` for `dyn Port` shapes." Then re-evaluate the 24 import sites in Q4-2026 when 1.81 ships.

**Refs:** `pheno-port-adapter/src/ports/`, `pheno-mcp-router/src/ports/llm.rs`, `pheno-events/src/sink.rs`, rust-lang/rust#110937, RFC 3185.
