# Proxy Port Clash Investigation

## Summary

There is **no port clash** in the proxy auto-select / proxyFallback / proxyEgress system.
The proxy subsystem uses **pre-assigned registry ports** — it never binds to TCP ports
directly. The real EADDRINUSE history is in the **process supervisor** layer, where
the server's main listen port can clash during crash-loop restarts.

---

## Proxy Subsystem: No Port Binding

| Module | What It Does |
|---|---|
| `proxyAutoSelector.ts` | Selects a proxy config from the DB by applying health scores and rotation groups |
| `proxyFallback.ts` | Implements retry/fallback strategies when a selected proxy fails (try another proxy, then direct) |
| `proxyEgress.ts` | Probes/propagates egress IP info for logging — uses HTTP echo, not port binding |
| `proxyDispatcher.ts` | Creates `undici.ProxyAgent` dispatchers — these are HTTP-level (forward proxy), not TCP listen sockets |
| `proxyFetch.ts` | Patched global fetch that applies proxy dispatchers at the undici level |

None of these modules call `net.createServer()`, `http.createServer()`, or `app.listen()`.
Port management is entirely within the request life cycle — undici manages the TCP
connection pool internally.

**Fallback flow** (from `proxyFetch.ts` `runWithProxyContext`):
1. Try assigned proxy → proxy dispatcher
2. If unreachable → direct fallback (no dispatcher)
3. If still failing → error propagated up

No port allocation or release happens in this flow.

---

## Real EADDRINUSE Root Cause: Crash-Loop Restart Race

The actual port clash was in the **process supervisor** (`bin/cli/runtime/`):

| File | Role |
|---|---|
| `processSupervisor.mjs` | `ServerSupervisor` — spawns a child process, monitors exit code, restarts |
| `supervisorPolicy.mjs` | `waitUntilPortFree()`, `isPortFree()`, restart policy constants |

**Root cause:** When the server child process crashed and was immediately restarted, the
OS had not yet released the listen socket (TIME_WAIT / TCP lingering). The restart
attempt would bind to the same port and immediately fail with `EADDRINUSE`, causing
another crash → another restart → exhausted restart budget → gateway dead.

**Fix (#4425, in `supervisorPolicy.mjs`):**
1. Added `isPortFree(port)` — attempts a `net.createServer().listen()` on the target
   port; resolves `false` if EADDRINUSE.
2. Added `waitUntilPortFree(port, timeoutMs=10000, intervalMs=250)` — polls every 250ms
   for up to 10s until the port is free, then allows the restart.
3. Bumped `RESTART_RESET_MS` from 30s → 60s — the crash window was too short, causing
   rapid cascading restarts inside the window.
4. Bumped `DEFAULT_MAX_RESTARTS` from 2 → 3 — more headroom for transient failures.

The `writePidFile()` / `killAllSubprocesses()` / `cleanupPidFile()` utilities in
`bin/cli/utils/pid.mjs` ensure clean PID file lifecycle.

## Related: Live-Dashboard EADDRINUSE (#6324)

A parallel fix (`live-ws-eaddrinuse-6324.test.ts`) ensures `startLiveDashboardServer()`
rejects with a proper `EADDRINUSE` error (instead of an unhandled socket 'error' event
that would crash the process). The dashboard server uses a separate port from the main
API server, so when both are configured on the same port, the second bind fails
gracefully.

---

## Current State

| Risk | Status | Remaining |
|---|---|---|
| Supervisor restart EADDRINUSE | **Fixed** (#4425) | None |
| LiveWS port clash | **Fixed** (#6324) | None |
| Proxy selection port clash | **Never applicable** | None |
| Two Redis CLIENT factories bind no TCP ports | **Never applicable** | None |

No further action needed on port clash.
