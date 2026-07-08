# Tokn FFI Contract

**Status:** stable as of `omniroute-tokn-ffi` v0.1.0.
**Audience:** `crates/tokn-ffi` maintainers + JS-side consumers in `packages/tokn/` and `src/lib/tokn/`.

## Purpose

Expose the Rust routing substrate (`omniroute-combo`) to the TypeScript dashboard
and CLI via a Node-API boundary. The Rust crate is the source of truth for the
Pareto decision; the TS layer is a thin consumer with a pure-TS fallback.

## Boundary rules

| Rule | Rationale |
|------|-----------|
| **Sync-only on the FFI boundary.** | napi-rs's async path adds ≥10x overhead and obscures the perf budget. Callers that need async wrap with `spawnSync` themselves. |
| **Typed JSON in/out.** | No exceptions cross the boundary. All errors resolve to a fallback decision (provider = "openrouter"). |
| **No I/O on the FFI call.** | The combo resolver is pure compute. Network and DB live in `omniroute-transport` and are not exposed via FFI in this slice. |
| **Per-call budget ≤5ms p99.** | The Rust impl is measured at p99 ≈ 0.02ms; the budget is a hard ceiling for any future algorithm change. |

## Surface

```ts
// JS-facing shape (auto-generated via napi-derive):
export interface RouteRequest {
  model: string;
  tenantId?: string;  // defaults to "_default"
}

export interface RouteDecision {
  provider: string;
  model: string;
  fallbackChain: string[];
}

export function decide(req: RouteRequest): RouteDecision;
export function ffiVersion(): string;   // semver, bump on any breaking change
export function isHealthy(): boolean;   // false if .node missing/incompatible
```

## Type mapping (Rust ↔ JS)

| Rust | JS | Notes |
|------|----|-------|
| `RouteRequest { model: String, tenant_id: String }` | `{ model, tenantId }` | serde rename_all = "camelCase" |
| `RouteDecision { provider, model, fallback_chain: Vec<String> }` | `{ provider, model, fallbackChain: string[] }` | same |
| `ProviderError` enum | **never crosses boundary** | resolves to fallback `provider = "openrouter"` upstream in combo layer |

## Versioning

- `ffiVersion()` returns the crate's `Cargo.toml` version. Bump on any
  breaking change to the `decide` signature, return shape, or budget.
- The TS side checks `ffiVersion()` on first load and falls back to the pure-TS
  impl if the major version doesn't match `@omniroute/tokn`'s expected range.

## Failure modes

| Failure | Resolution |
|---------|-----------|
| `.node` binary missing | `isHealthy()` returns false; JS uses TS fallback |
| ABI mismatch (Node 22 vs Node 24) | `isHealthy()` returns false; JS uses TS fallback |
| Cargo build fails (no rustc) | postinstall skips build; JS uses TS fallback |
| Unknown model | Returns `{ provider: "openrouter", fallbackChain: [] }` (deliberate, not an error) |

## Performance contract

- Per-call p99 ≤5ms (gate).
- Measured on M-series: ~0.02ms p99 for known models, ~0.01ms for unknown.
- No allocations on the hot path beyond the response object (verified with
  `cargo bench` + heaptrack).

## Test parity

The Rust contract tests in `tests/contract.rs` and the JS contract tests in
`src/lib/tokn/__tests__/contract.test.ts` MUST agree on every test case.
Drift = breaking change.
