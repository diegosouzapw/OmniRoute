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
  "/api/tools/agent-bridge/", // AgentBridge: spawns MITM server + DNS edits (Hard Rules #15 + #17)
  "/api/tools/traffic-inspector/", // Traffic Inspector: http-proxy listener + system proxy (Hard Rules #15 + #17)
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
  "/api/tools/agent-bridge/", // start/stop MITM server + DNS edits (Hard Rules #15 + #17)
  "/api/tools/traffic-inspector/", // http-proxy listener + system proxy (Hard Rules #15 + #17)
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
  let host = hostHeader.trim();
  if (host.startsWith("[")) {
    // IPv6 literal: [::1] or [::1]:port
    const bracketEnd = host.indexOf("]");
    host = bracketEnd >= 0 ? host.slice(1, bracketEnd) : host.slice(1);
  } else if ((host.match(/:/g) || []).length === 1) {
    // IPv4 / hostname with a single :port — strip it. A bare IPv6 address
    // ("::1", "::ffff:127.0.0.1") has multiple colons and must stay intact
    // (splitting on ":" would mangle it to "" and miss the loopback match).
    host = host.split(":")[0];
  }
  host = host.replace(/^::ffff:/i, "");
  return LOOPBACK_HOSTS.has(host.toLowerCase());
}

/**
 * Classify a resolved peer IP into the locality tiers the authz layer cares
 * about. `null`/unknown → "remote" (fail closed). Used by the pipeline to stamp
 * a trusted locality marker that route handlers read without re-deriving it
 * from the spoofable Host header.
 */
export function classifyHostLocality(ip: string | null): "loopback" | "lan" | "remote" {
  if (!ip) return "remote";
  if (isLoopbackHost(ip)) return "loopback";
  if (isPrivateLanHost(ip)) return "lan";
  return "remote";
}

/**
 * Private-LAN ranges (RFC 1918 IPv4 + IPv6 ULA/link-local). Matched against the
 * real socket peer address (NOT the spoofable Host header), so a public-internet
 * client — which presents a public source IP — never matches.
 */
const PRIVATE_LAN_PATTERNS: ReadonlyArray<RegExp> = [
  /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  /^192\.168\.\d{1,3}\.\d{1,3}$/,
  /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/,
  /^f[cd][0-9a-f]{2}:/i, // IPv6 ULA fc00::/7
  /^fe80:/i, // IPv6 link-local
];

/**
 * True when the peer address is a private-LAN address. Used to widen the
 * LOCAL_ONLY tier to a trusted private network (owner-authorized 2026-05-30 for
 * a LAN-deployed instance). Loopback-only surfaces that do NOT use this (e.g.
 * the CLI-token path) remain strictly loopback.
 */
export function isPrivateLanHost(hostHeader: string | null): boolean {
  if (!hostHeader) return false;
  let host = hostHeader.trim();
  if (host.startsWith("[")) {
    const bracketEnd = host.indexOf("]");
    host = bracketEnd >= 0 ? host.slice(1, bracketEnd) : host.slice(1);
  }
  host = host.replace(/^::ffff:/i, "");
  // Strip :port only for IPv4 / hostname (a lone colon); leave IPv6 intact.
  if ((host.match(/:/g) || []).length === 1) host = host.split(":")[0];
  host = host.toLowerCase();
  return PRIVATE_LAN_PATTERNS.some((re) => re.test(host));
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
