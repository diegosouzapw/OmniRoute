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

`build/` and `prebuilds/` are git-ignored. Distribution via per-platform
prebuilds (linux-x64 / linux-arm64) is a follow-up — IP_TRANSPARENT is
Linux-only, so only Linux prebuilds are needed; everywhere else the loader
returns "unavailable".

## Remaining for the full Epic A (gated follow-ups)

- The TPROXY listener that adopts the fd, terminates TLS, and feeds the capture
  buffer (reusing the MITM path).
- `repairMitm()` calling `revertTproxy()` so a crash flushes the mangle rules.
- The capture-mode route + Traffic Inspector UI tab.
- A live end-to-end intercept (TPROXY → listener) in a dedicated test
  environment (needs a routing scenario; risky on a production proxy).
