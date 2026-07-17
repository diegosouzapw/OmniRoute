# SOTA — wasmtime vs wasmer for Plugin Runtime (side-13)

**Date:** 2026-06-20 11:30 UTC
**Task ID:** side-13
**Agent:** v11-batch-A
**Verdict:** **Adopt wasmtime** (with a wasmer escape hatch). wasmtime's Cranelift codegen + `wasi-preview2` + the WASM Component Model are the right substrate for any fleet plugin runtime. wasmer is competitive on raw instantiation speed but its compilation story (LLVM) is now heavier to operate and the ecosystem is moving to wasmtime-compatible Component Model interfaces.

## What the two are (2026-06)

**wasmtime** (Bytecode Alliance, Rust-native, ~50K LOC):

- Backend: Cranelift (fast compile, slightly slower steady-state than LLVM).
- Standards: WASI preview1 + preview2 (Component Model), `wasi-http`, `wasi-config`, threads, SIMD.
- Embed API: `wasmtime::Engine`, `Store`, `Linker`, `Instance`. First-class `bindgen!`-style host bindings for typed imports.
- License: Apache-2.0.
- Release cadence: monthly; current 27.x line (June 2026).

**wasmer** (Wasmer Inc., Rust + LLVM backend pluggable):

- Backends: Cranelift (default, fast compile), LLVM (slow compile, fast runtime), Singlepass (AOT for embedded).
- Standards: WASI preview1 only on stable; preview2 is in beta as of 4.x.
- Embed API: similar shape; the `wasmer::Store`, `Module`, `Instance`. No Component Model `bindgen!` yet.
- License: MIT for runtime, custom for some compiler backends; closed-source WASI-X extension pack.
- Release cadence: ~6 weeks.

## Why wasmtime wins for the Phenotype fleet

1. **Standards trajectory.** The WASM Component Model is the future of polyglot plugin interfaces (canonicalized 2024, broad implementer adoption by 2026). wasmtime supports it on stable; wasmer is still catching up. Any fleet plugin author writing `wit` interface definitions gets first-class wasmtime support today and a forward-portable path to other runtimes (wasmtime's `wasi-preview2-component` is the de-facto reference impl).
2. **Cranelift is the right default for our workload.** Plugin compilation happens once at install/load; runtime speed matters but is bounded by per-call host-bindings overhead, not raw FP. Cranelift's compile-time edge is the bigger win — we don't need LLVM's compile cost.
3. **Bytecode Alliance governance.** wasmtime is governed by the Bytecode Alliance (Fastly, Microsoft, Intel, Cosmonic, etc.); no single-vendor lock-in. Wasmer Inc. is a single company with a closed-source WASI-X extension tier.
4. **Embedded Rust ergonomics.** The `wasmtime::component::bindgen!` macro generates typed host trait impls from `.wit` files — the same shape as our `pheno-port-adapter` `Port` traits. The mental model maps 1:1 to fleet substrate style.

## Fleet relevance

- **`phenotype-hub`** (framework) — the existing plugin slot today uses dynamic library loading (`.so` / `.dylib`). WASM as the plugin substrate would let us ship a single binary per platform with plugins loaded by content hash, without platform-specific loader quirks.
- **`pheno-mcp-router`** — every adapter is currently a Rust `impl LlmPort`. WASM-based adapters would let third parties ship providers without a recompile of the host. Worth a spike.
- **`phenotype-tooling`** — long-running dev tools that want a stable plugin boundary. Currently none, but the next "monorepo bootstrap" PR will want this.
- **`pheno-otel`** — collector adapters (per-collector WASM processors). Otel-collector's own WASM processor uses wasmtime; if we ever ship our own, reuse that path.
- **`Dino`** (game engine, paused) — out of scope per ADR-023; flagged only because scripting-language support often becomes a question.

There is **no current production plugin runtime** in the fleet. This is a "if we add one, pick the right substrate" decision.

## When wasmer is the right call

- **Cold-start <1ms is a hard requirement** — wasmer's Singlepass backend has slightly better cold-start than Cranelift on small modules. wasmtime 27.x has caught up on this; the gap is now ~5% either direction and not a real differentiator.
- **Need for LLVM AOT** — if we want to ship pre-compiled native modules (`.so`) instead of `.wasm` to consumers with restrictive runtime environments, wasmer's LLVM backend is mature. wasmtime is moving toward AOT via `wasmtime compile` but it's not the same product shape.
- **Embedded WASI-X extensions** (closed-source) — would only apply if we hit a WASI capability wasmtime refuses to implement. Not on our roadmap.

## Concrete recommendations

1. **Spike: `pheno-plugin-runtime` as a new substrate** — wrap `wasmtime::Engine` + `wasmtime::component::bindgen!` behind a `Plugin: Port` trait so the rest of the fleet (notably `pheno-mcp-router` for provider adapters) can adopt incrementally. Crate size budget: <3000 LOC. Estimated 1 PR-week of work.
2. **First concrete consumer: a `LlmWasmAdapter`** — port one of the existing providers (e.g., the OpenAI-compat adapter from `pheno-mcp-router` PR #3) to a `.wasm` component, ship it as the spike's validation. If round-trip latency is within 2x of the native impl, the abstraction is worth it.
3. **Do not adopt wasmer as a co-runtime.** Supporting two WASM engines doubles the security review surface (different CVE feeds, different supply-chain). The wasmer escape hatch is "if wasmtime misses a critical WASI capability we need," not "let's evaluate both at the call site."
4. **`WIT` interface authoring standard.** Any new plugin contract gets authored as a `.wit` file in `pheno-plugin-runtime/wit/`. This is the same shape the Component Model community uses and gives us free interop with non-Rust plugin authors (JS via `jco`, Python via `componentize-py`).

## What it is NOT a fit for

- **Hot-path in-process code.** WASM has a ~10–50ns per-call overhead vs a native FFI call; if a "plugin" runs in a tight loop, do not make it a plugin.
- **GPU / SIMD-heavy compute.** WASM SIMD is supported in wasmtime but the performance story is uneven across hosts; offload to native.
- **Anything where plugin authors need to call our internal Rust types directly.** WASM's whole value-prop is the boundary; if the boundary has to be Rust-aware, dynamic loading (dlopen) is simpler.

## Recommendation

Adopt wasmtime as the canonical WASM plugin runtime for any future fleet substrate. Open a tracking issue for `pheno-plugin-runtime` v0.1.0 spike (wasmer escape hatch noted). Land in v11 tier-3 if the spike ships clean.

**Refs:** Bytecode Alliance roadmap 2026, wasmer 4.x docs, ADR-014 (hexagonal ports — explains why WASM Components map cleanly to `pheno-port-adapter`), `pheno-mcp-router/src/adapters/`.
