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
 *
 * Bridge Network Fix: Also probes the container's internal bridge IP (e.g., 172.17.0.2)
 * to handle Docker network setups that isolate loopback interfaces.
 */

import { pathToFileURL } from "node:url";
import { networkInterfaces } from "node:os";

const DEFAULT_HOSTS = ["127.0.0.1", "localhost", "::1"];
const DEFAULT_TIMEOUT_MS = 4000;
const DEFAULT_HEALTH_PATH = "/api/monitoring/health";

function normalizeBasePath(value) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed || trimmed === "/") return "";
  if (!trimmed.startsWith("/") || /[?#\\]/.test(trimmed)) return "";
  const segments = trimmed.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "." || segment === "..")) return "";
  return `/${segments.join("/")}`;
}

/** Prefixes the health route with the configured Next.js basePath. */
export function resolveHealthPath(basePathValue) {
  const basePath = normalizeBasePath(basePathValue);
  return basePath ? `${basePath}${DEFAULT_HEALTH_PATH}` : DEFAULT_HEALTH_PATH;
}

/**
 * Get the primary non-loopback IPv4 address (container internal IP).
 * Falls back to null if unable to determine.
 */
function getContainerInternalIP() {
  try {
    const interfaces = networkInterfaces();
    for (const [name, addrs] of Object.entries(interfaces)) {
      // Skip loopback and docker0, prioritize eth0/veth interfaces
      if (name.startsWith("lo") || name === "docker0") continue;
      const ipv4 = addrs?.find((a) => a.family === "IPv4" && !a.internal);
      if (ipv4) return ipv4.address;
    }
  } catch {
    // silently ignore if unable to read interfaces
  }
  return null;
}

/**
 * Build the health URL for a host, bracketing IPv6 literals (e.g. `::1`).
 * @param {string} host
 * @param {string|number} port
 * @param {string} healthPath path to probe, including any basePath prefix
 */
function healthUrl(host, port, healthPath = DEFAULT_HEALTH_PATH) {
  const hostPart = host.includes(":") ? `[${host}]` : host;
  return `http://${hostPart}:${port}${healthPath}`;
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
 * @param {string} [opts.healthPath]
 * @returns {Promise<string>} the host that succeeded
 */
export async function probeHealth({
  port,
  hosts = DEFAULT_HOSTS,
  fetchImpl = fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  healthPath = DEFAULT_HEALTH_PATH,
} = {}) {
  let lastError = new Error("no hosts to probe");
  for (const host of hosts) {
    try {
      const res = await fetchImpl(healthUrl(host, port, healthPath), {
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

  // Build host list: defaults + detected container bridge IP
  const hosts = [...DEFAULT_HOSTS];
  const containerIP = getContainerInternalIP();
  if (containerIP && !hosts.includes(containerIP)) {
    hosts.push(containerIP);
  }

  try {
    const healthPath = resolveHealthPath(process.env.OMNIROUTE_BASE_PATH);
    await probeHealth({ port, hosts, healthPath });
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
