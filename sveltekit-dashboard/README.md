# OmniRoute SvelteKit Dashboard

SvelteKit + Hono replacement for the Next.js dashboard.

Phase 1 scaffold — full port in progress.

## Run

```bash
bun install
bun dev
```

The dev server runs on port 5173 by default.
Requires OmniRoute running on `:20128`.

## Toolchain

This layer is web/UI code, so it lives in the JS/TS ecosystem. Where JS is
unavoidable we run the fastest, most native-backed toolchain available — the
compute-heavy stages are Rust/Go/Zig-native under the hood:

| Stage           | Tool                                             | Native core       |
| --------------- | ------------------------------------------------ | ----------------- |
| Package mgmt    | **Bun** `1.3.11` (`packageManager` pinned)       | Zig               |
| Transpile       | **Vite 8** (`vite build`/`dev`)                  | Oxc (Rust)        |
| Type-check      | **tsgo** / `@typescript/native-preview` (TS7)    | Go ("Corsa" port) |
| SFC type-check  | **svelte-check 4.7** (`--tsgo-experimental-api`) | Go (opt-in)       |

### Type-checking scripts

- `bun run typecheck:fast` — **tsgo** (`--noEmit`) over the plain `.ts` files.
  Go-native TypeScript compiler; fastest path, use this in the inner loop.
- `bun run check` — **svelte-check** default (blocking gate). Type-checks the
  full graph including `.svelte` SFC `<script>` blocks. This is the CI gate.
- `bun run check:tsgo` — svelte-check with the **experimental tsgo API**
  (`--tsgo-experimental-api`, ~2.9× faster). Advisory until svelte-check's tsgo
  integration covers the full SFC graph (today it checks a subset).

`typescript@6` is kept as a devDependency because svelte-check's default path and
the editor LSP both import `typescript` as a library. tsgo (TS7) is additive — it
does not replace `typescript` for those consumers yet.

## Why a JS/TS web stack and not Rust / Zig / Mojo / Go / Carbon

The operator's default language preference is systems-first — Rust / Zig / Mojo /
Go / Carbon — and JS/TS only where the web platform forces it. This dashboard is
one of those forced cases, and here is the concrete justification:

1. **The UI layer is I/O- and render-bound, not CPU-bound.** A provider/settings/
   logs dashboard spends its time on `fetch()` to the OmniRoute API and DOM
   diffing — there is no hot compute loop where a systems language would move the
   needle. Choosing Rust/Zig/Mojo/Go/Carbon for the *component model* would be a
   category error: it trades the entire Svelte reactivity model and the npm
   component ecosystem (shadcn-svelte, Tailwind) for zero measurable runtime win.

2. **Native speed is already captured at the toolchain layer, not the language.**
   The expensive stages — dependency resolution, transpile, type-check — run on
   Zig (Bun), Rust (Oxc, inside Vite 8), and Go (tsgo / `@typescript/native-preview`).
   We get systems-language performance on every build without leaving the type-
   shared TS source. That is the point of TS7/tsgo: a Go-native compiler for the
   same language, so the "slow JS toolchain" objection no longer holds.

3. **Rust/Go web-UI frameworks would fragment, not consolidate.** Leptos / Dioxus
   (Rust→WASM) or a Go+templ stack are viable for *some* apps, but here they would:
   (a) ship a WASM blob or a second server runtime alongside the Node-only
   OmniRoute core, widening the deploy surface; (b) lose direct, typed reuse of the
   OmniRoute API response shapes that `src/lib/api.ts` shares with the rest of the
   TS codebase; (c) abandon shadcn-svelte / Tailwind, forcing a hand-rolled
   component layer — the opposite of the wrap-over-handroll mandate. The dashboard
   is a thin client over an existing TS API; matching its language maximizes type
   sharing and minimizes moving parts.

4. **Hono (not a Rust/Go BFF) for the same reason.** The server/BFF layer is a thin
   proxy/aggregator in front of the OmniRoute API. Hono runs on the same Node
   runtime as the core, shares the same TS types, and (if ever needed) also runs on
   Bun/Deno/Workers — no second toolchain, no cross-language serialization boundary.

**Rule of thumb for this repo:** systems languages (Rust/Zig/Mojo/Go/Carbon) are
the default for anything compute-bound or a standalone binary/service. The web/UI
layer stays TS — but on the TS7/tsgo + Bun + Oxc toolchain so the native-speed
performance is captured where it actually exists (the build), not bolted onto the
UI language where it would buy nothing.
