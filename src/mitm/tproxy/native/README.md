# TPROXY transparent-socket native addon

Tiny N-API addon for Fase 3 / Epic A (TPROXY transparent capture mode). Node's
`net` module cannot `setsockopt(IP_TRANSPARENT)` before `bind()`, which TPROXY
requires (otherwise the kernel drops the redirected packets). `transparent.c`
does `socket()`+`SO_REUSEADDR`+`IP_TRANSPARENT`+`bind()`+`listen()` and returns
the raw fd; Node adopts it via `server.listen({ fd })` and reads the original
destination from `socket.localAddress`/`localPort` (TPROXY preserves it — no
`SO_ORIGINAL_DST`/NAT).

## Status: groundwork (opt-in, not wired into a capture mode yet)

Loaded conditionally by `../transparentSocket.ts`. A JS-only install (no
toolchain, or non-Linux) keeps working — the TPROXY mode is gated on the addon
being available.

**Viability proven on the VPS (kernel 6.8.0-124):** the prebuilt `.node`,
compiled under one Node version, loaded under a different one (N-API is
ABI-stable) and, as root, created the IP_TRANSPARENT socket which Node adopted
via `server.listen({ fd })`. The TPROXY iptables/ip-rule apply+revert was also
validated against the same kernel (see PR #4139).

## Build (opt-in, Linux + C toolchain)

```bash
npm run build:native:tproxy      # -> build/Release/transparent.node
```

`build/` and `prebuilds/` are git-ignored — the binary is **built, never
committed**.

## Distribution (wired into the production build)

1. **`scripts/build/build-tproxy-native.mjs`** runs `node-gyp rebuild` during
   `npm run build` (called from `build-next-isolated.mjs` before the standalone is
   assembled). Linux-only; a missing toolchain is **non-fatal** (the capture mode
   degrades gracefully). The Docker builder already ships `python3 make g++`.
2. **`assembleStandalone.mjs`** (`NATIVE_ASSET_ENTRIES`) copies
   `build/Release/transparent.node` into the standalone bundle at the same
   relative path. The source is absent on non-Linux builds → the copy skips it.
3. **`transparentSocket.ts`** resolves the addon both module-relative (dev/source)
   and **cwd-relative** (`<cwd>/src/mitm/tproxy/native/...`, where the standalone
   server runs and step 2 placed it).

IP_TRANSPARENT is Linux-only, so only the linux-x64 path is built; everywhere else
the loader returns "unavailable" and TPROXY capture mode stays disabled. (Linux
ARM64 / other arches: build on the target, or add to CI when needed.)

## Epic A status: COMPLETE (validated e2e on the VPS)

The full intercept → TLS-terminate → decrypt → capture (`source:"tproxy"`) →
re-encrypted forward → upstream round-trip was validated end-to-end on the VPS
(kernel 6.8.0), including the anti-loop fix (PR #4229). Wired via the capture
manager (#4208), the local-only route + CA installer (#4211), and the Traffic
Inspector toggle (#4216).
