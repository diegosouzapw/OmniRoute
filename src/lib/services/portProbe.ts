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

/** Result of probing the service before spawning. */
export interface PreSpawnProbe {
  /** true when the service's healthUrl answered with a 2xx. */
  healthy: boolean;
  /** true when something is already listening on the service's port. */
  portInUse: boolean;
}

/** Outcome of the pre-spawn decision. */
export type PreSpawnDecision =
  | { action: "spawn" }
  | { action: "adopt" }
  | { action: "error"; message: string };

const HEALTH_PROBE_TIMEOUT_MS = 3_000;
const PORT_PROBE_TIMEOUT_MS = 1_000;

/**
 * Decide what to do before spawning, given a probe of the port + health.
 *
 * Pure — no I/O — so it can be exhaustively unit-tested.
 */
export function decidePreSpawn(probe: PreSpawnProbe, port: number): PreSpawnDecision {
  // A healthy instance is already serving on the port — adopt it rather than
  // spawn a duplicate that would immediately die with EADDRINUSE.
  if (probe.healthy) {
    return { action: "adopt" };
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
    const res = await fetch(healthUrl, { signal: controller.signal });
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
