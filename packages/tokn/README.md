# @omniroute/tokn

Native Node-API binding to the Rust `omniroute-combo` routing substrate.
Sync-only boundary, ≤5ms p99.

When the Rust binary is unavailable (no `cargo`, wrong ABI, fresh clone), the
package automatically falls back to a pure-TS implementation that returns the
same shape. Callers never have to handle the fallback — they just call
`decide(req)` and trust `decision.source` for telemetry.

## Usage

```ts
import { decide, ffiVersion, isHealthy, implKind } from '@omniroute/tokn';

const decision = await decide({ model: 'gpt-4o', tenantId: 'tenant-1' });
// → { provider: 'openai', model: 'gpt-4o', fallbackChain: ['openrouter', 'groq'], source: 'native' }

console.log(implKind()); // 'native' | 'ts' | 'unresolved'
console.log(ffiVersion()); // '0.1.0' or '0.0.0-ts-fallback'
```

## Build

```bash
pnpm build                  # builds native binary via cargo
OMNIROUTE_TOKN_REBUILD=1 pnpm build  # force rebuild
```

The build is invoked automatically by `postinstall` unless
`OMNIROUTE_SKIP_TOKN_BUILD=1` is set.

## Contract

See `omniroute-rs/crates/tokn-ffi/docs/FFI_CONTRACT.md` for the canonical
type mapping, budget, and versioning rules.
