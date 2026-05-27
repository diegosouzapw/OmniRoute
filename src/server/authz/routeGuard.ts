/**
 * 3-tier route guard constants and helpers.
 *
 * Tier 1 — LOCAL_ONLY: accessible only from loopback. These routes spawn
 *   child processes; exposing them to non-local traffic is a known CVE class
 *   (GHSA-fhh6-4qxv-rpqj). Blocked unconditionally regardless of auth state.
 *
 *   Carve-out: paths matching the live manage-scope bypass list (DB-stored,
 *   read via `getAuthzBypassSnapshot()`) MAY also be accessed from
 *   non-loopback if and only if the request carries an API key with the
 *   `manage` scope (or an authenticated dashboard session — see
 *   `policies/management.ts`). The bypass is opt-in per prefix and can be
 *   killed globally via the `localOnlyManageScopeBypassEnabled` setting.
 *   Unauthenticated requests to bypassable paths are still rejected with
 *   403 LOCAL_ONLY.
 *
 * Tier 2 — ALWAYS_PROTECTED: auth is always required, even when
 *   requireLogin=false. Covers destructive / irreversible operations.
 *
 * Tier 3 — MANAGEMENT (default): auth required, but bypassed when
 *   requireLogin=false (existing behaviour).
 */

import { getAuthzBypassSnapshot } from "@/lib/config/runtimeSettings";

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export const LOCAL_ONLY_API_PREFIXES: ReadonlyArray<string> = [
  "/api/mcp/",
  "/api/cli-tools/runtime/",
  "/api/services/", // T-10: embedded service lifecycle (spawn child processes)
  "/dashboard/providers/services/", // T-07: reverse proxy to embedded service UIs
  "/api/copilot/", // unauthenticated LLM driver — CLI-only by default; admins can opt-in to remote access via manage-scope bypass
];

/**
 * Compile-time deny-list: route prefixes that can spawn arbitrary local
 * subprocesses on behalf of the caller. These MUST NEVER appear in the
 * manage-scope bypass list — regardless of DB state — because reaching them
 * from non-loopback would re-introduce the GHSA-fhh6-4qxv-rpqj surface that
 * the LOCAL_ONLY tier exists to close.
 *
 * Enforced at two layers:
 *   1. zod schema (`settingsSchemas.ts`): rejects `PATCH /api/settings` with
 *      error code `BYPASS_PREFIX_NOT_ALLOWED` if any entry in
 *      `localOnlyManageScopeBypassPrefixes` falls inside this set.
 *   2. runtime (`isLocalOnlyBypassableByManageScope` below): even if a
 *      malformed DB row somehow claims a spawn-capable path is bypassable,
 *      the policy still refuses to honour it.
 */
export const SPAWN_CAPABLE_PREFIXES: ReadonlyArray<string> = [
  "/api/cli-tools/runtime/",
  "/api/services/", // T-10: can run npm install + spawn node processes
];

/**
 * Compile-time default of the manage-scope bypass list. Kept as an exported
 * constant so the Settings inventory page (and audit code) can render the
 * "available bypassable prefixes" choices independent of current DB state.
 *
 * The RUNTIME decision in `isLocalOnlyBypassableByManageScope` does NOT
 * consult this constant — it reads `getAuthzBypassSnapshot().prefixes`,
 * which is hot-reloaded on every settings PATCH.
 */
export const LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES: ReadonlyArray<string> = ["/api/mcp/"];

export const ALWAYS_PROTECTED_API_PATHS: ReadonlyArray<string> = [
  "/api/shutdown",
  "/api/providers/health-autopilot/actions",
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
  host = host.replace(/^::ffff:/i, "");
  return LOOPBACK_HOSTS.has(host.toLowerCase());
}

export function isLocalOnlyPath(path: string): boolean {
  return LOCAL_ONLY_API_PREFIXES.some((p) => path === p || path.startsWith(p));
}

/**
 * Runtime predicate consulted by the management policy on every non-loopback
 * request to a LOCAL_ONLY path. Reads the live snapshot:
 *   - returns false if the global kill-switch is off
 *     (`localOnlyManageScopeBypassEnabled === false`),
 *   - returns true iff `path` matches one of the live bypass prefixes AND
 *     that prefix is not in `SPAWN_CAPABLE_PREFIXES` (defence-in-depth: the
 *     zod schema already rejects spawn-capable entries, but a malformed DB
 *     row should not be able to grant a bypass).
 *
 * O(1) (no I/O, no async). Hot-reload SLA: <50 ms — satisfied structurally.
 */
export function isLocalOnlyBypassableByManageScope(path: string): boolean {
  const snapshot = getAuthzBypassSnapshot();
  if (!snapshot.enabled) return false;
  return snapshot.prefixes.some((p) => {
    // Defence-in-depth: reject a bypass prefix that is the same as, child of,
    // OR PARENT of any spawn-capable prefix. The parent case catches e.g.
    // `/api/cli-tools/` (parent of `/api/cli-tools/runtime/`) — a request to
    // `/api/cli-tools/runtime/foo` would otherwise satisfy `path.startsWith(p)`
    // and reach the spawn-capable surface without a loopback check.
    if (
      SPAWN_CAPABLE_PREFIXES.some(
        (spawn) => p === spawn || p.startsWith(spawn) || spawn.startsWith(p)
      )
    ) {
      return false;
    }
    return path === p || path.startsWith(p);
  });
}

export function isAlwaysProtectedPath(path: string): boolean {
  return ALWAYS_PROTECTED_API_PATHS.some((p) => path === p || path.startsWith(p));
}
