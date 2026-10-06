import { hostname, platform } from "node:os";

/**
 * Resolve the bind host passed to the standalone Next.js server.
 *
 * HOSTNAME is a standard shell variable on Unix-like systems, so only the
 * dedicated OmniRoute variable is treated as configuration there. Windows
 * keeps the legacy HOSTNAME fallback for compatibility with existing .env
 * files, while still ignoring the OS-reported machine name.
 *
 * @param {NodeJS.ProcessEnv} [env]
 * @param {NodeJS.Platform} [runtimePlatform]
 * @param {string} [machineHostname]
 * @returns {string}
 */
export function resolveServerHost(
  env = process.env,
  runtimePlatform = platform(),
  machineHostname = hostname()
) {
  if (env.OMNIROUTE_SERVER_HOST) return env.OMNIROUTE_SERVER_HOST;
  if (runtimePlatform === "win32" && env.HOSTNAME && env.HOSTNAME !== machineHostname) {
    return env.HOSTNAME;
  }
  return "0.0.0.0";
}

const LOOPBACK_HOSTS = new Set(["127.0.0.1", "localhost", "::1", "[::1]"]);

/**
 * Boot-time exposure warning (GHSA-wmgv-ph3p-rv57): the shipped default binds
 * all interfaces while the inference plane requires no credentials, so any
 * LAN peer can spend the operator's quota. That local-first posture is a
 * deliberate, documented default — but it must be LOUD at startup so an
 * operator who never read the docs still learns the two escape hatches.
 *
 * Returns the warning text when the server will listen on a non-loopback
 * interface with no API-key requirement, or null when the exposure is closed.
 *
 * @param {NodeJS.ProcessEnv} [env]
 * @param {string} [host]
 * @returns {string | null}
 */
export function resolveExposureWarning(env = process.env, host = resolveServerHost(env)) {
  if (LOOPBACK_HOSTS.has(host)) return null;
  const requireKey = String(env.REQUIRE_API_KEY || "")
    .trim()
    .toLowerCase();
  if (requireKey === "true" || requireKey === "1" || requireKey === "yes") return null;
  return (
    `SECURITY: listening on ${host} with NO API-key requirement — the inference ` +
    `plane (/v1/*) is reachable by ANY device that can route to this host, and ` +
    `requests are billed to your configured providers. This local-first default ` +
    `is intentional, but on an untrusted network either set REQUIRE_API_KEY=true ` +
    `or bind loopback with OMNIROUTE_SERVER_HOST=127.0.0.1.`
  );
}
