/**
 * Pre-spawn port/health probe for embedded services (#6205).
 *
 * Before the supervisor spawns a service child, it probes the service's port
 * and health endpoint. This turns two failure modes into graceful outcomes
 * instead of a raw `EADDRINUSE` stack trace crashing the child:
 *
 *   - A healthy prior instance is already answering  → ADOPT it (skip spawn).
 *   - The port is held but nothing healthy answers    → surface a CLEAR error.
 *   - The port is free                                → SPAWN normally.
 *
 * `decidePreSpawn` is a pure function so the decision logic is unit-testable
 * without binding a real port or spawning a process.
 */

import { createConnection } from "node:net";
import { spawn } from "node:child_process";
import os from "node:os";
import { getOriginalFetch } from "@omniroute/open-sse/utils/proxyFetch.ts";

/** Result of probing the service before spawning. */
export interface PreSpawnProbe {
  /** true when the service's healthUrl answered with a 2xx. */
  healthy: boolean;
  /** true when something is already listening on the service's port. */
  portInUse: boolean;
}

/** Outcome of the pre-spawn decision. */
export type PreSpawnDecision =
  { action: "spawn" } | { action: "adopt" } | { action: "error"; message: string };

const HEALTH_PROBE_TIMEOUT_MS = 3_000;
const PORT_PROBE_TIMEOUT_MS = 1_000;
const PID_RESOLVE_TIMEOUT_MS = 2_000;

/**
 * Decide what to do before spawning, given a probe of the port + health.
 *
 * Pure — no I/O — so it can be exhaustively unit-tested.
 */
export function decidePreSpawn(
  probe: PreSpawnProbe,
  port: number,
  allowAdopt = false
): PreSpawnDecision {
  if (probe.healthy) {
    // A 2xx on the health path does NOT prove the listener is our service: a
    // local process can squat the port, answer 200, and get adopted — receiving
    // the injected service API key and script execution inside the dashboard
    // origin (GHSA-wg9p-6m2g-4v27). Adopt an already-healthy listener only when
    // the operator explicitly opts in; otherwise surface the same actionable
    // error we already use for a held-but-unhealthy port instead of silently
    // trusting the listener.
    if (allowAdopt) {
      return { action: "adopt" };
    }
    return {
      action: "error",
      message:
        `Port ${port} is already serving a healthy response, but adopting an ` +
        `existing listener is disabled by default (a 2xx cannot prove the listener ` +
        `is this service). Set OMNIROUTE_ADOPT_EXISTING_SERVICE=1 to allow adoption, ` +
        `or stop the process holding the port and start the service again.`,
    };
  }
  // Port is held but nothing healthy answers: an orphaned or unrelated process
  // is squatting on it. Surface a clear, actionable error instead of letting
  // the child crash with a raw EADDRINUSE stack.
  if (probe.portInUse) {
    return {
      action: "error",
      message:
        `Port ${port} is already in use but the service did not respond to a health ` +
        `check. An orphaned previous instance or an unrelated process may be holding ` +
        `the port — stop it (or free the port) and try starting the service again.`,
    };
  }
  // Port is free and nothing is answering — safe to spawn.
  return { action: "spawn" };
}

/**
 * Whether the operator opted in to adopting an already-healthy listener on a
 * service port. Off by default (GHSA-wg9p-6m2g-4v27): a squatter can answer a
 * 2xx, so auto-adoption is only safe when the operator knows the listener is
 * genuinely their (externally-managed) instance.
 */
export function isAdoptExistingEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const v = env.OMNIROUTE_ADOPT_EXISTING_SERVICE;
  return v === "1" || v === "true";
}

/** TCP connect check: resolves true when something accepts a connection. */
function isPortInUse(port: number, timeoutMs: number): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const socket = createConnection({ host: "127.0.0.1", port }, () => {
      socket.destroy();
      resolve(true);
    });
    socket.setTimeout(timeoutMs);
    socket.on("error", () => resolve(false));
    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

/** Health check: resolves true when healthUrl answers with a 2xx. */
async function isHealthy(healthUrl: string, timeoutMs: number): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    // Embedded-service loopback probes are control-plane I/O. They must never
    // enter the public provider proxy/TLS pipeline: an expected ECONNREFUSED
    // on a free port is normal pre-spawn state, not a ProxyFetch warning.
    const res = await getOriginalFetch()(healthUrl, { signal: controller.signal });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Probe the service's port + health endpoint before spawning.
 *
 * @param healthUrl The service's health endpoint URL.
 * @param port      The service's registered port.
 */
export async function probeBeforeSpawn(healthUrl: string, port: number): Promise<PreSpawnProbe> {
  const [healthy, portInUse] = await Promise.all([
    isHealthy(healthUrl, HEALTH_PROBE_TIMEOUT_MS),
    isPortInUse(port, PORT_PROBE_TIMEOUT_MS),
  ]);
  return { healthy, portInUse };
}

/** `lsof -ti :PORT` prints one pid per line and nothing else. */
export function parseLsofPid(stdout: string): number | null {
  const firstLine = stdout
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  const parsed = firstLine ? Number.parseInt(firstLine, 10) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * `ss -tlnp 'sport = :PORT'` carries the pid inside the process column:
 *
 *   LISTEN 0 511 127.0.0.1:20128 0.0.0.0:* users:(("node",pid=596922,fd=18))
 *
 * The filter is applied by `ss` itself, so any `pid=` on any line belongs to
 * the requested port.
 */
export function parseSsPid(stdout: string): number | null {
  const match = /\bpid=(\d+)/.exec(stdout);
  const parsed = match ? Number.parseInt(match[1], 10) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * `netstat -tlnp` cannot filter by port, so the port is matched here:
 *
 *   tcp 0 0 127.0.0.1:20128 0.0.0.0:* LISTEN 596922/node
 *
 * Matching on the local-address column keeps a foreign address that happens to
 * end in the same number from being read as a listener.
 */
export function parseNetstatPid(stdout: string, port: number): number | null {
  for (const line of stdout.split("\n")) {
    const columns = line.trim().split(/\s+/);
    // Linux: proto recv-q send-q local-address foreign-address state pid/program
    if (columns.length < 7 || columns[5] !== "LISTEN") continue;
    const linuxAddress = columns[3].endsWith(`:${port}`);
    const macAddress = columns[3].endsWith(`.${port}`);
    if (!linuxAddress && !macAddress) continue;

    if (linuxAddress) {
      const linuxPid = Number.parseInt(columns[6], 10);
      if (Number.isFinite(linuxPid)) return linuxPid;
    }

    // macOS `netstat -anv -p tcp` appends a `process:pid` column after
    // the socket counters. Process names may contain spaces, so scan instead
    // of relying on one fixed column index.
    for (const column of columns.slice(6)) {
      const match = /:(\d+)$/.exec(column);
      if (match) return Number.parseInt(match[1], 10);
    }
  }
  return null;
}

/**
 * Windows `netstat -ano` carries the pid in its own last column (#11236):
 *
 *   Proto  Local Address          Foreign Address        State           PID
 *   TCP    0.0.0.0:20128          0.0.0.0:0              LISTENING       12345
 *   TCP    [::]:20128             [::]:0                 LISTENING       12345
 *
 * Only TCP LISTENING rows carry a pid (UDP rows have no state column at all).
 * The local address is matched on `:<port>` — the `:` anchor keeps a port that
 * merely shares a suffix (128 vs 20128) or a foreign address ending in the
 * same digits from being read as the listener.
 */
export function parseWindowsNetstatPid(stdout: string, port: number): number | null {
  for (const line of stdout.split("\n")) {
    const columns = line.trim().split(/\s+/);
    // proto local-address foreign-address state pid
    if (columns.length < 5) continue;
    if (columns[3].toUpperCase() !== "LISTENING") continue;
    if (!columns[1].endsWith(`:${port}`)) continue;
    const pid = Number.parseInt(columns[columns.length - 1], 10);
    if (Number.isFinite(pid)) return pid;
  }
  return null;
}

/**
 * Ways to ask the OS which process holds a port, in preference order.
 *
 * `lsof` stays first because it is the most direct, but it is absent from slim
 * container images, and a missing binary is indistinguishable from a free port
 * once `spawn` has turned ENOENT into a null. `ss` ships with iproute2 and
 * `netstat` with net-tools, so between the three there is normally something
 * to ask on any host the supervisor runs on.
 *
 * The Windows `netstat -ano` probe runs last: on Windows the earlier probes
 * fail fast (lsof/ss do not exist; the net-tools flags are rejected by the
 * Windows netstat), while on Unix `netstat -ano` either errors out or prints
 * the Linux/macOS row shapes the Windows parser deliberately never matches
 * (LISTEN vs LISTENING), so it degrades to a no-op instead of a false pid.
 */
const PID_PROBES: ReadonlyArray<{
  command: string;
  args: (port: number) => string[];
  parse: (stdout: string, port: number) => number | null;
}> = [
  { command: "lsof", args: (port) => ["-ti", `:${port}`], parse: (stdout) => parseLsofPid(stdout) },
  {
    command: "ss",
    args: (port) => ["-tlnp", `sport = :${port}`],
    parse: (stdout) => parseSsPid(stdout),
  },
  {
    command: "netstat",
    // #11236: runtime os.platform() read — a process.platform literal is
    // constant-folded to the Linux build machine in the published artifact,
    // pruning the darwin branch on macOS (same fold class as b43a212680).
    args: () => (os.platform() === "darwin" ? ["-anv", "-p", "tcp"] : ["-tlnp"]),
    parse: parseNetstatPid,
  },
  {
    command: "netstat",
    args: () => ["-ano"],
    parse: parseWindowsNetstatPid,
  },
];

/** Run one probe, resolving null on a missing binary, a non-match or a timeout. */
function runPidProbe(
  probe: (typeof PID_PROBES)[number],
  port: number,
  timeoutMs: number
): Promise<number | null> {
  return new Promise((resolve) => {
    if (timeoutMs <= 0) {
      resolve(null);
      return;
    }

    const proc = spawn(probe.command, probe.args(port));
    let output = "";
    let settled = false;

    const finish = (value: number | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve(value);
    };

    const timeout = setTimeout(() => {
      proc.kill();
      finish(null);
    }, timeoutMs);

    proc.stdout?.on("data", (chunk: Buffer) => {
      output += chunk.toString("utf8");
    });
    // ENOENT when the binary is not installed — fall through to the next probe.
    proc.on("error", () => finish(null));
    proc.on("close", () => finish(probe.parse(output, port)));
  });
}

/**
 * Resolve the pid of whatever process is listening on `port`, if any.
 *
 * Used when adopting an already-healthy instance (see `decidePreSpawn`'s
 * "adopt" outcome): the supervisor didn't spawn that process itself, so it
 * has no pid from a `ChildProcess` handle, but tracking a real pid is still
 * needed for downstream liveness checks to trust an adopted service the same
 * way they trust a freshly-spawned one. Returns null if nothing is found or
 * the lookup fails/times out (best-effort; never blocks adoption on this).
 *
 * Tries `lsof`, then `ss`, then `netstat`, then the Windows `netstat -ano`
 * shape, so a host missing any one of them — including a stock Windows host
 * with none of the Unix tools — still reports a real pid instead of a silent
 * null (#10431, #11236). The probes share one deadline, so the whole lookup
 * still costs at most `PID_RESOLVE_TIMEOUT_MS`.
 */
export async function resolvePortPid(port: number): Promise<number | null> {
  const deadline = Date.now() + PID_RESOLVE_TIMEOUT_MS;

  for (const probe of PID_PROBES) {
    const pid = await runPidProbe(probe, port, deadline - Date.now());
    if (pid !== null) return pid;
  }

  return null;
}
