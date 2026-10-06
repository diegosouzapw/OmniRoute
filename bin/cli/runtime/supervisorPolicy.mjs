import net from "node:net";

// #4425: bumped from 30s — the old window reset the crash counter too quickly, so during
// an EADDRINUSE cascade the supervisor kept "recovering" then crashing within the window
// and exhausted its restart budget. A longer window keeps the counter meaningful.
export const RESTART_RESET_MS = 60_000;

// #4425: bumped from 2 — more recovery headroom before the supervisor gives up.
export const DEFAULT_MAX_RESTARTS = 3;

/**
 * #4425: a clean child exit (code 0) is only intentional when the supervisor itself is
 * shutting down. A spontaneous code-0 exit is anomalous — e.g. a systemd `MemoryMax`
 * cgroup kill reports the process exited with code 0 — and MUST be restarted, not treated
 * as a graceful stop (which left the gateway dead with `Restart=on-failure`).
 */
export function shouldExitInsteadOfRestart(isShuttingDown) {
  return isShuttingDown === true;
}

/** Exponential backoff (1s, 2s, 4s, …) capped at 10s, matching the prior inline formula. */
export function computeRestartDelayMs(restartCount) {
  return Math.min(1000 * 2 ** (Math.max(1, restartCount) - 1), 10_000);
}

/** Resolve true when `host:port` can be bound right now. */
function canBind(port, host) {
  return new Promise((resolve) => {
    const tester = net.createServer();
    tester.once("error", (err) => {
      // EADDRINUSE = something is bound → not free. Any other error → treat as free.
      resolve(!(err && err.code === "EADDRINUSE"));
    });
    tester.once("listening", () => {
      tester.close(() => resolve(true));
    });
    tester.listen(port, host);
  });
}

/**
 * Resolve true when nothing is listening on `port` (so a restart won't hit EADDRINUSE).
 *
 * Probing a single address is not enough. Node sets `SO_REUSEADDR` on every listener it
 * creates, and on macOS/BSD that lets a specific-address bind coexist with an existing
 * wildcard bind (and vice versa) — unlike Linux, which keeps rejecting the overlap in
 * LISTEN state. A gateway listening on `0.0.0.0:20128`, which is what `omniroute serve`
 * binds by default, was therefore reported as "free" by the old loopback-only probe: the
 * supervisor skipped its wait, the respawned child hit EADDRINUSE, and the crash loop
 * that #4425 set out to fix kept running. Probe every address the server may have bound.
 *
 * @param port  Port to test.
 * @param host  Additional address to test; wildcard and loopback are always included.
 * @returns False as soon as any candidate address is occupied.
 */
export async function isPortFree(port, host = "127.0.0.1") {
  for (const candidate of new Set([host, "0.0.0.0", "127.0.0.1"])) {
    if (!(await canBind(port, candidate))) return false;
  }
  return true;
}

/**
 * #4425: wait until `port` is free before respawning. After a crash the OS may not have
 * released the listen socket yet; restarting immediately produced the EADDRINUSE cascade
 * that exhausted the restart budget. Polls up to `timeoutMs`, then proceeds anyway so a
 * stuck port never blocks recovery forever.
 */
export async function waitUntilPortFree(port, timeoutMs = 10_000, intervalMs = 250) {
  const p = Number(port);
  if (!Number.isFinite(p) || p <= 0) return true;
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    if (await isPortFree(p)) return true;
    if (Date.now() >= deadline) return false;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}
