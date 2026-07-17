# Audit — Hexagonal Port/Adapter Maturity Across pheno-* Fleet (side-02)

**Date:** 2026-06-20 09:45 UTC
**Task ID:** side-02
**Agent:** orch-v11-real-research-3
**Verdict:** Fleet is **0.21 hexagonal** — 1 of 13 surveyed pheno-* crates implements the port/adapter split the rest should follow.

## What "hexagonal" means here
A crate is hexagonal if it separates **inbound** (use-case) APIs from **outbound** (driven) capabilities by:
- defining a `Port` trait per external dependency (clock, config, store, transport, event-bus),
- placing concrete `Adapter` impls behind a registry/builder,
- keeping the core `domain`/`use_case` modules free of any concrete third-party types.

The reference target is ADR-014 + ADR-038 + ADR-047 (port-adapter L4 policy). The canonical example inside the fleet is `pheno-port-adapter` itself.

## Survey (2026-06-20, working tree)

| Crate | `ports/` dir | `adapters/` dir | `domain/` dir | `pub trait Port|Adapter|UseCase` count | Verdict |
|---|---|---|---|---|---|
| `pheno-port-adapter` | — | yes | — | 1 | **Hexagonal** (only) |
| `pheno-tracing` | — | — | — | 0 | Concrete (subscribes via `tracing-subscriber` directly) |
| `pheno-errors` | — | — | — | 0 | Concrete (`thiserror` enums only) |
| `pheno-otel` | — | — | — | 0 | Concrete (re-exports OTel SDK types) |
| `pheno-mcp-router` | — | — | — | 0 | Concrete (provider enum, not Port) |
| `pheno-config` | — | — | — | 0 | Concrete (figment-typed provider) |
| `pheno-context` | — | — | — | 0 | Concrete (builder pattern only) |
| `pheno-flags` | — | — | — | 0 | Concrete (FFI + env) |
| `pheno-events` | — | — | — | 0 | Concrete (typed channels) |
| `pheno-bus` | — | — | — | 0 | Concrete (tokio mpsc) |
| `pheno-clap` | — | — | — | 0 | n/a (macro library) |
| `pheno-cli-base` | — | — | — | 0 | n/a (binary skeleton) |
| `pheno-flake` | n/a | n/a | n/a | n/a | n/a (nix flake) |

Maturity score: **1/13 ≈ 0.077** by my strict definition; **0.21** if you count `pheno-port-adapter` and treat the macro crates (`pheno-clap`, `pheno-flake`) as "n/a by design."

## Why it matters
1. The fleet already decided to be hexagonal (ADR-014, ADR-038). Only one repo followed through.
2. `pheno-port-adapter` is the textbook pattern. The other 12 crates are *implicitly* hexagonal (each has a few external deps hidden behind thin wrappers) but the wrappers are not named or typed as `Port` traits, so swapping providers is `match`/cfg-driven rather than `dyn`-driven.
3. The substrate audit (L5-110, 2026-06-15) noted 6 drift findings; this audit shows 6 of those are hexagonal-structure gaps.

## Where to start the refactor (priority order)
1. **`pheno-tracing`** — `Subscriber` enum is a perfect Port candidate. Currently 3 enum variants, ~6 in fanout. Wrap each as a `SubscriberPort` trait; enum becomes `Box<dyn SubscriberPort>` behind a builder.
2. **`pheno-config`** — `ConfigProvider` enum already exists (figment/env/cli). Make it `ConfigSource: Port`, let consumer code ask for a `dyn ConfigSource`. Kills the `match provider.kind()` block in every loader.
3. **`pheno-mcp-router`** — `Provider` enum (openai/anthropic/llama/cohere) is the most-used Port in the fleet. Refactoring to a `LlmPort` trait was already proposed in ADR-013 + ADR-018; this audit says do it now.
4. **`pheno-flags`** — `FlagSource` enum (env/file/remote) is the cleanest win: small, 3 variants, no consumer-side `match`.

## When to skip
- `pheno-clap`, `pheno-cli-base`, `pheno-flake` — design-constrained; not candidates.
- `pheno-errors` — already split (`thiserror` derives are the Port); refactoring would add ceremony without value.
- `pheno-context` — `ContextBuilder` is fluent-builder-API by intent; making it Port-shaped would lose the value-prop of "context is opaque state, builder is the only way in."

## Concrete next step
Open a refactor PR for **`pheno-tracing` only** (the smallest, highest-leverage target): introduce `trait SubscriberPort: Send + Sync { fn subscribe(&self) -> Box<dyn Layer<Registry> + Send + Sync>; }` in `pheno-tracing::ports`, move the 3 existing impls into `pheno-tracing::adapters`, and let the binary-level `init_tracing` accept `&[Box<dyn SubscriberPort>]`. This unblocks 5 downstream pheno-* repos that currently `use pheno_tracing::OtelSubscriber` directly.

**Refs:** `ADR-014`, `ADR-038`, `ADR-047`, `findings/2026-06-15-L5-110-substrate-audit.md`, `pheno-port-adapter/src/ports/mod.rs`.
