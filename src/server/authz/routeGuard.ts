/**
 * 3-tier route guard constants and helpers.
 *
 * Tier 1 — LOCAL_ONLY: accessible only from loopback. These routes spawn
 *   child processes; exposing them to non-local traffic is a known CVE class
 *   (GHSA-fhh6-4qxv-rpqj). Blocked unconditionally regardless of auth state.
 *
 * Tier 2 — ALWAYS_PROTECTED: auth is always required, even when
 *   requireLogin=false. Covers destructive / irreversible operations.
 *
 * Tier 3 — MANAGEMENT (default): auth required, but bypassed when
 *   requireLogin=false (existing behaviour).
 */

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export const LOCAL_ONLY_API_PREFIXES: ReadonlyArray<string> = [
  "/api/mcp/",
  "/api/cli-tools/runtime/",
];

export const ALWAYS_PROTECTED_API_PATHS: ReadonlyArray<string> = [
  "/api/shutdown",
  "/api/settings/database",
];

export function isLoopbackHost(hostHeader: string | null): boolean {
  if (!hostHeader) return false;
  let host: string;
  if (hostHeader.startsWith("[")) {
    // IPv6 literal: [::1] or [::1]:port
    const bracketEnd = hostHeader.indexOf("]");
    host = bracketEnd >= 0 ? hostHeader.slice(1, bracketEnd) : hostHeader.slice(1);
  } else {
    // IPv4 / hostname: strip optional :port
    host = hostHeader.split(":")[0];
  }
  return LOOPBACK_HOSTS.has(host.toLowerCase());
}

export function isLocalOnlyPath(path: string): boolean {
  return LOCAL_ONLY_API_PREFIXES.some((p) => path === p || path.startsWith(p));
}

export function isAlwaysProtectedPath(path: string): boolean {
  return ALWAYS_PROTECTED_API_PATHS.some((p) => path === p || path.startsWith(p));
}
