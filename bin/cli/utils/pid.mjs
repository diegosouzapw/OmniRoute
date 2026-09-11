import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { resolveDataDir } from "../data-dir.mjs";

// #9455: "supervisor" must be tracked so killAllSubprocesses() can stop the
// supervisor process, not just the child server it spawned (and respawns).
const SERVICES = ["server", "supervisor", "mitm", "tunnel/cloudflared", "tunnel/tailscale"];

function getServicePidPath(service) {
  return join(resolveDataDir(), service, ".pid");
}

export function writePidFile(service, pid) {
  try {
    const dir = join(resolveDataDir(), service);
    mkdirSync(dir, { recursive: true });
    writeFileSync(getServicePidPath(service), String(pid), "utf8");
    return true;
  } catch {
    return false;
  }
}

export function readPidFile(service) {
  try {
    const file = getServicePidPath(service);
    if (!existsSync(file)) return null;
    const pid = parseInt(readFileSync(file, "utf8").trim(), 10);
    return Number.isFinite(pid) ? pid : null;
  } catch {
    return null;
  }
}

export function cleanupPidFile(service) {
  try {
    unlinkSync(getServicePidPath(service));
  } catch {}
}

export function killAllSubprocesses() {
  for (const service of SERVICES) {
    const pid = readPidFile(service);
    if (!pid) continue;
    try {
      process.kill(pid, "SIGTERM");
    } catch {}
    cleanupPidFile(service);
  }
}

export function isPidRunning(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// A probe that times out is classified "hanging" and never counts toward
// readiness (#6800), so a FIXED per-probe timeout puts a hard ceiling on how
// slow a healthy first response is allowed to be. On a cold Windows boot the
// health route resolves ~10 dynamic imports and reads the DB before it can
// answer; when that first response lands past the ceiling the poll can never
// succeed, because each abort discards the in-flight request before the route
// finishes (its own 1s payload cache is never populated either) and the next
// probe restarts the same work into the same ceiling — for the whole budget.
// The CLI then printed "⚠ Server did not respond within 60s" over a server
// that went on to serve traffic normally. Escalating the timeout keeps #6800's
// guarantee (a socket that never answers still yields "hanging" forever) while
// letting a slow-but-real response actually be observed.
const INITIAL_PROBE_TIMEOUT_MS = 2000;
const MAX_PROBE_TIMEOUT_MS = 15000;
// Floor for the last probe of a budget that is nearly spent — long enough for a
// loopback round-trip, short enough not to overrun the caller's timeout.
const MIN_PROBE_TIMEOUT_MS = 250;

// #2460: Default raised from 15s to 60s so Windows users (slower Next.js
// cold start due to filesystem watchers, antivirus, etc.) get a working
// "server ready" signal instead of a phantom timeout while the server is
// still booting. TCP fallback marks the server as ready when the port
// has been listening for >= 3s consecutively AND the health route is
// actively rejecting/resetting connections fast (route not mounted yet,
// but the HTTP server is clearly alive and responsive) — never for a
// socket that merely accepts TCP and then hangs without ever completing
// a single request (#6800: that's a still-booting/CPU-bound process, not
// a "route not mounted" gap, and must NOT be reported as ready).
//
// `onOutcome` receives every probe classification so a caller can tell a
// "nothing ever bound the port" timeout apart from a "port is up, the health
// route is just still warming" one when it reports the failure.
export async function waitForServer(port, timeout = 60000, { onOutcome } = {}) {
  const start = Date.now();
  let tcpListeningSince = null;
  let probeTimeout = INITIAL_PROBE_TIMEOUT_MS;
  while (Date.now() - start < timeout) {
    const remaining = timeout - (Date.now() - start);
    const outcome = await pollHealthOnce(
      port,
      Math.max(MIN_PROBE_TIMEOUT_MS, Math.min(probeTimeout, remaining))
    );
    onOutcome?.(outcome);
    if (outcome === "ready") return true;
    if (outcome === "fast-reject") {
      if (tcpListeningSince === null) tcpListeningSince = Date.now();
      if (Date.now() - tcpListeningSince >= 3000) return true;
    } else {
      // "hanging" (request timed out with no response at all) or
      // "not-listening" — neither counts toward the grace window.
      tcpListeningSince = null;
      // Only a hang says "this server may simply need longer to answer";
      // widen the next probe instead of aborting into the same ceiling again.
      if (outcome === "hanging") {
        probeTimeout = Math.min(probeTimeout * 2, MAX_PROBE_TIMEOUT_MS);
      }
    }
    await sleep(500);
  }
  return false;
}

// Polls /api/monitoring/health once and classifies the outcome:
// - "ready": got a 2xx HTTP response.
// - "fast-reject": got a non-2xx HTTP response, or the connection was
//   actively refused/reset (not a timeout) — the HTTP server is alive and
//   answering quickly, just not routing this endpoint yet (#2460).
// - "hanging": the request timed out waiting for any response — the
//   process accepted the TCP connection but never answered (#6800). The
//   caller widens `probeTimeoutMs` after a hang so a merely slow (rather
//   than dead) server is not aborted into the same ceiling on every probe.
// - "not-listening": nothing is accepting connections on the port at all.
// #11766: probe both IPv4 and IPv6 loopback to handle servers listening on
// either family (or both).
async function pollHealthOnce(port, probeTimeoutMs = INITIAL_PROBE_TIMEOUT_MS) {
  const hosts = ["127.0.0.1", "::1"];
  const outcomes = [];

  // Probe both loopback families concurrently
  const results = await Promise.all(
    hosts.map(async (host) => {
      try {
        const res = await fetch(`http://${host}:${port}/api/monitoring/health`, {
          signal: AbortSignal.timeout(probeTimeoutMs),
        });
        return { host, outcome: res.ok ? "ready" : "fast-reject" };
      } catch (err) {
        const outcome = err?.name === "TimeoutError" ? "hanging" : "error";
        return { host, outcome };
      }
    })
  );

  outcomes.push(...results.map((r) => r.outcome));

  // If either family is ready, the server is ready
  if (outcomes.includes("ready")) return "ready";

  // If either family is fast-reject, treat as fast-reject
  // (TCP is listening and rejecting, just route not ready yet)
  if (outcomes.includes("fast-reject")) return "fast-reject";

  // If either family is hanging, server accepted TCP but not answering
  // (still booting, must not report as ready per #6800)
  if (outcomes.includes("hanging")) return "hanging";

  // Both families failed — check if either port is actually listening
  // If listening, then errors above are route-level (fast-reject case)
  const listening = await isPortListening(port).catch(() => false);
  return listening ? "fast-reject" : "not-listening";
}

async function isPortListening(port) {
  const net = await import("node:net");
  // #11766: check both IPv4 and IPv6 loopback. Return true if either is listening.
  const hosts = ["127.0.0.1", "::1"];
  const results = await Promise.all(
    hosts.map(
      (host) =>
        new Promise((resolve) => {
          const socket = net.connect({ host, port, timeout: 1000 });
          const finish = (ok) => {
            try {
              socket.destroy();
            } catch {}
            resolve(ok);
          };
          socket.once("connect", () => finish(true));
          socket.once("error", () => finish(false));
          socket.once("timeout", () => finish(false));
        })
    )
  );
  return results.some((ok) => ok);
}
