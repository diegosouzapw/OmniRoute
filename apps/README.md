# argismonitor v4 Monorepo

Subpath monorepo for the argismonitor frontend + native shell rewrite (was OmniRoute v4).

## Stack

- **apps/web** — SvelteKit 2 + Svelte 5 (runes) + Tailwind 4 + adapter-node (32 routes + combos flow editor)
- **apps/bff** — Hono 4 + Zod 4 + tRPC 11 + `@hono/node-server` + Unix domain socket listener + kbridge client (BFF↔Rust gateway)
- **apps/desktop** — Tauri 2 + 14 plugins + Rust gateway state machine + production bundle pipeline (DMG/MSI/.deb/.rpm/AppImage) + code signing + notarization
- **packages/api-contracts** — Zod 4 schemas (Provider/Combo/User/Settings) shared web↔bff
- **packages/design-tokens** — Design system (coral primary, indigo accent, 32px grid, mono font)

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
# -> also listens on the Unix socket

# TCP + kbridge (BFF <-> Rust gateway daemon over MessagePack-RPC)
OMNIRoute_GATEWAY_SOCKET=/var/run/omniroute/gateway.sock bun run dev

# Production env vars
PORT=4322                              # TCP port (default 4322)
OMNIROUTE_UPSTREAM=http://localhost:20128
OMNI_WEB_STACK_ROLLOUT=100             # 0-100 percent served the new dashboard
OMNIROUTE_BFF_SOCKET=/var/run/omniroute/bff.sock
OMNIRoute_GATEWAY_SOCKET=/var/run/omniroute/gateway.sock
```

### Endpoints

- `GET  /healthz` — BFF health
- `GET  /api/dashboard/*` — typed dashboard surface (Zod-validated)
- `GET  /api/dashboard/health/stream` — Hono streamSSE for live health events
- `GET  /api/dashboard/gateway/{ping,health}` — kbridge proxy to Rust gateway
- `POST /api/trpc/*` — tRPC fetch handler (typed end-to-end via `AppRouter`)
- `*    /api/v1/*` — reverse-proxy to Next.js upstream (with 410 Gone for non-Svelte users in Phase 3)

When `OMNI_WEB_STACK_ROLLOUT < 100`, the BFF returns `410 Gone` for users in
the "still on Next.js" bucket. The Next.js upstream path remains live for
them. See `docs/CUTOVER.md`.

## Phase 3 cutover

See `docs/CUTOVER.md` for the production rollout plan (1% → 10% → 50% → 100%).

Per-user opt-in:
- `?web=svelte` sets a 1-year `web_stack=svelte` cookie, serves the Svelte app
- `?web=next` sets a 1-year `web_stack=next` cookie, redirects to the Next.js upstream

## Desktop (Tauri 2)

Production bundle matrix:
- macOS: DMG + .app.tar.gz (codesign + notarize via Apple notarytool)
- Windows: NSIS .exe + MSIX (Azure Trusted Signing)
- Linux: .deb + .rpm + AppImage
- Tauri updater: GitHub Releases channel with self-signed release key

See `apps/desktop/CODESIGNING.md` for the cert matrix, the release flow,
and the bundle outputs per platform.

## i18n

- 13 active locales: en, es, fr, de, zh-CN, ja, ko, pt-BR, it, ru, ar, he, nl
- 31 stub locales fall back to English at runtime
- RTL support: ar + he explicitly handled (`document.documentElement.dir`)
- 44 total registered in `project.inlang/settings.json`
- Messages live in `apps/web/src/lib/i18n/<locale>.json`
- Runtime loader at `apps/web/src/lib/i18n/index.ts` (use `t()` in components)

## Phase 4 (planned)

All shipped:
- **tRPC swap** for SvelteKit↔BFF end-to-end typed RPC (`apps/bff/src/trpc/`, `apps/web/src/lib/trpc/`)
- **kbridge** BFF↔Rust gateway over UDS + MessagePack-RPC (`apps/bff/src/kbridge/`)
- **Combos editor step 1**: typed form + fallback chain reorder
- **Combos editor step 2**: `@xyflow/svelte` flow editor at `/dashboard/combos/[id]/edit` (Form/Flow view toggle)

Outstanding:
- **Bidirectional Form↔Flow sync** (deferred to v4.0.1 — the original Next.js combo was 4,629 LoC with rule-based routing + perf tracking; full parity is its own sprint)
- **Paraglide 31 more locales** translation pass (machine-assisted, deferrable — currently English-fallback)
- **Mobile native** (iOS/Android) — deferred to v4.2 per locked decision; PWA covers mobile browsers
