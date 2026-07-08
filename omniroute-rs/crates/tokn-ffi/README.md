# omniroute-tokn-ffi

Node-API binding that exposes `omniroute-combo::resolve` to the TypeScript
dashboard/CLI. Sync-only boundary, ≤5ms p99.

## Build

```bash
cargo build -p omniroute-tokn-ffi --release
```

Produces `target/release/libomniroute_tokn_ffi.node` (napi-rs naming).

## Test

```bash
cargo test -p omniroute-tokn-ffi          # unit + contract
cargo bench -p omniroute-tokn-ffi         # latency gate
```

## Consume

From the OmniRoute monorepo, use `@omniroute/tokn` (npm package) which wraps
this crate's binary. See `docs/FFI_CONTRACT.md` for the surface.

## Source of truth

All routing logic lives in `omniroute-combo`. This crate is a pure adapter.
