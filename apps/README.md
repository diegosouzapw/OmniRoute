# OmniRoute v4 Monorepo

Subpath monorepo for the OmniRoute v4 frontend + native shell rewrite.

## Stack

- **apps/web** — SvelteKit 2 + Svelte 5 (runes) + Tailwind 4 + adapter-node
- **apps/bff** — Hono 4 + Zod 4 + `@hono/node-server` (Bun runtime)
- **apps/desktop** — Tauri 2 + 14 plugins + Rust gateway stub (also binds Unix socket via OMNIROUTE_BFF_SOCKET)
- **packages/api-contracts** — Zod 4 schemas shared between web + bff
- **packages/design-tokens** — design system (coral primary, indigo accent, 32px grid)

## Quickstart

```bash
bun install                    # workspace install
bun run dev                    # parallel dev (web:4321, bff:4322, desktop:tauri dev)
bun run build                  # per-package builds
bun run typecheck              # per-package tsc / svelte-check
bun run lint                   # oxlint
```

## BFF

The BFF reverse-proxies `/api/v1/*` to the existing Next.js upstream at `:20128`, serves typed `/api/dashboard/*` for the SvelteKit web, and (in Phase 3) is the cutover feature-flag boundary.

### Run modes

```bash
# Default: TCP only
bun run dev
# -> listens on http://localhost:4322

# TCP + Unix domain socket (low-latency local IPC for Tauri shell)
OMNIROUTE_BFF_SOCKET=/var/run/omniroute/bff.sock bun run dev
# -> also listens on the Unix socket; Tauri uses this when available

# Production env vars
PORT=4322                              # TCP port (default 4322)
OMNIROUTE_UPSTREAM=http://localhost:20128
OMNI_WEB_STACK_ROLLOUT=100             # 0-100 percent served the new dashboard
OMNIROUTE_BFF_SOCKET=/var/run/omniroute/bff.sock
```

When `OMNI_WEB_STACK_ROLLOUT < 100`, the BFF returns `410 Gone` for users
in the "still on Next.js" bucket. The Next.js upstream path remains live
for them. See `docs/CUTOVER.md`.

## Phase 3 cutover

See `docs/CUTOVER.md` for the production rollout plan (1% → 10% → 50% → 100%).

Per-user opt-in:
- `?web=svelte` sets a 1-year `web_stack=svelte` cookie, serves the Svelte app
- `?web=next` sets a 1-year `web_stack=next` cookie, redirects to the Next.js upstream

## Phase 4 (planned)

- **kbridge**: BFF ↔ Rust gateway daemon over Unix domain socket (MessagePack-RPC)
- **tRPC**: replace hand-rolled Hono RPC stubs with `hono.trpc` end-to-end types
- **Combos editor full port**: the 4,629 LoC Next.js page in Svelte 5 + `@xyflow/svelte`
- **Paraglide 41 more locales**: tool-assisted translation pass for the 38 stub locales
- **Mobile native**: defer to v4.2 (out of scope per locked decision)
- **Tauri 2 code signing + notarization**: production deployment requirement
