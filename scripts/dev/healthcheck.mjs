#!/usr/bin/env node

/**
 * Docker healthcheck script for OmniRoute.
 * Probes the /api/monitoring/health endpoint on the dashboard port.
 * Used by Dockerfile and docker-compose files.
 *
 * #3151 — in some Docker network setups the server binds to a container IP and
 * a probe against `127.0.0.1` is not reachable, while `localhost`/`::1` (or vice
 * versa) is. The previous version probed ONLY `127.0.0.1` and swallowed every
 * error, so the container was reported `unhealthy` with an empty, undiagnosable
 * `State.Health[].Output`. We now try an ordered list of hosts and surface the
 * last error on total failure.
 */

import { pathToFileURL } from "node:url";

const DEFAULT_HOSTS = ["127.0.0.1", "localhost", "::1"];
const DEFAULT_TIMEOUT_MS = 4000;

/**
 * Build the health URL for a host, bracketing IPv6 literals (e.g. `::1`).
 * @param {string} host
 * @param {string|number} port
 */
function healthUrl(host, port) {
  const hostPart = host.includes(":") ? `[${host}]` : host;
  return `http://${hostPart}:${port}/api/monitoring/health`;
}

/**
 * Probe the health endpoint across an ordered list of hosts. Resolves with the
 * first host that returns a 2xx response; rejects with the last error if every
 * host fails. Each attempt is bounded by a per-host timeout so one unreachable
 * host cannot hang the whole probe.
 *
 * @param {object} opts
 * @param {string|number} opts.port
 * @param {string[]} [opts.hosts]
 * @param {typeof fetch} [opts.fetchImpl]
 * @param {number} [opts.timeoutMs]
 * @returns {Promise<string>} the host that succeeded
 */
export async function probeHealth({
  port,
  hosts = DEFAULT_HOSTS,
  fetchImpl = fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
} = {}) {
  let lastError = new Error("no hosts to probe");
  for (const host of hosts) {
    try {
      const res = await fetchImpl(healthUrl(host, port), {
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (res.ok) return host;
      lastError = new Error(`${host}: HTTP ${res.status}`);
    } catch (err) {
      lastError = new Error(`${host}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  throw lastError;
}

async function main() {
  const port = process.env.DASHBOARD_PORT || process.env.PORT || "20128";
  try {
    await probeHealth({ port });
    process.exit(0);
  } catch (err) {
    // Surface the failure so `docker inspect ... .State.Health[].Output` is
    // diagnostic instead of empty (#3151).
    process.stderr.write(`healthcheck failed: ${err instanceof Error ? err.message : err}\n`);
    process.exit(1);
  }
}

// Only auto-run when invoked as the entrypoint (so importing the helper in
// tests does not trigger a real probe + process.exit).
const isEntrypoint =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isEntrypoint) {
  main();
}
