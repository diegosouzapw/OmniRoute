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
import { SPAWN_CAPABLE_PREFIXES } from "@/shared/constants/spawnCapablePrefixes";

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export const LOCAL_ONLY_API_PREFIXES: ReadonlyArray<string> = [
  "/api/mcp/",
  "/api/cli-tools/runtime/",
  "/api/services/", // T-10: embedded service lifecycle (spawn child processes)
  "/dashboard/providers/services/", // T-07: reverse proxy to embedded service UIs
  "/api/copilot/", // unauthenticated LLM driver — CLI-only by default; admins can opt-in to remote access via manage-scope bypass
  "/api/tools/agent-bridge/", // AgentBridge: spawns MITM server + DNS edits (Hard Rules #15 + #17)
  "/api/tools/traffic-inspector/", // Traffic Inspector: http-proxy listener + system proxy (Hard Rules #15 + #17)
  "/api/plugins/", // plugins: load/execute via worker_threads + child_process (Hard Rules #15 + #17)
  "/api/plugins", // bare path: GET list + POST install also trigger plugin loading
  "/api/system/version", // auto-update: spawns git checkout + npm install — RCE-via-tunnel surface (Hard Rules #15 + #17, found by 6A.8 route-guard gate)
  "/api/db-backups/exportAll", // spawns tar for export archive (Hard Rules #15 + #17, found by 6A.8 route-guard gate)
  "/api/local/", // T-12: 1-click local service launchers (Redis today; spawns podman/docker) — loopback-enforced by isLocalRequestAllowed() in src/lib/security/localEndpoints.ts (Hard Rules #15 + #17)
  "/api/headroom/start", // Headroom token-saver proxy lifecycle: spawns headroom-ai python CLI (Hard Rules #15 + #17)
  "/api/headroom/stop", // Headroom token-saver proxy lifecycle: sends SIGTERM/SIGKILL to managed PID (Hard Rules #15 + #17)
  "/api/oauth/cursor/auto-import", // spawns `execFile("which", ["cursor"])` to verify a local Cursor install before importing creds — RCE-via-tunnel surface (Hard Rules #15 + #17, found by 6A.8 route-guard gate). Specific path only: the rest of /api/oauth/ (browser redirect/callback flows) must stay remote-reachable.
];

/**
 * LOCAL_ONLY routes whose spawn-capable segment sits AFTER a dynamic path
 * parameter, so a flat prefix in `LOCAL_ONLY_API_PREFIXES` cannot target them
 * without over-broadening (e.g. locking the entire `/api/providers/` subtree,
 * which remote dashboards legitimately use for provider CRUD). These are matched
 * by regex instead.
 *
 *   - `POST /api/providers/{id}/login` launches a headful Playwright Chromium
 *     (a child process) to drive a web-cookie login. Loopback enforcement must
 *     happen unconditionally before any auth check (Hard Rules #15 + #17), so a
 *     leaked JWT via tunnel cannot trigger a browser spawn.
 */
export const LOCAL_ONLY_API_PATTERNS: ReadonlyArray<RegExp> = [
  /^\/api\/providers\/[^/]+\/login\/?$/,
];

// `SPAWN_CAPABLE_PREFIXES` (the spawn-capable deny-list) now lives in the
// server-free leaf module `@/shared/constants/spawnCapablePrefixes` so that
// client-reachable validation schemas can import it without pulling this module's
// server runtime (runtimeSettings → localDb → ioredis) into the browser bundle.
// Imported above for the runtime check in `isLocalOnlyBypassableByManageScope`;
// re-exported here so existing `@/server/authz/routeGuard` importers keep working.
export { SPAWN_CAPABLE_PREFIXES };

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
  /^100\.(6[4-9]|[78]\d|9\d|1[01]\d|12[0-7])\.\d{1,3}\.\d{1,3}$/,
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

/**
 * Paths that are LOCAL_ONLY for all write methods but may be accessed from
 * non-loopback clients when the request method is GET, HEAD, or OPTIONS.
 *
 * Rule: a path belongs here only when the read methods perform NO child-process
 * spawn and expose NO privileged mutation — only the write methods do.
 *
 * Current exemptions:
 *   /api/system/version — GET reads package.json + npm registry; only POST
 *   triggers the auto-update flow (spawns git checkout + npm install + pm2).
 *   Hard Rules #15/#17 still apply to POST.
 */
export const LOCAL_ONLY_API_GET_EXEMPTIONS: ReadonlySet<string> = new Set([
  "/api/system/version",
]);

/** Safe HTTP methods that can be exempted for read-only paths. */
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/**
 * Returns true when `path` is a local-only route that must be blocked from
 * non-loopback / non-LAN callers.
 *
 * @param path    Normalized request path (e.g. "/api/mcp/sse").
 * @param method  Optional HTTP method. When provided and the method is a safe
 *                read-only method (GET/HEAD/OPTIONS) AND the path exactly
 *                matches an entry in `LOCAL_ONLY_API_GET_EXEMPTIONS`, this
 *                function returns false — i.e. the path is NOT local-only for
 *                that specific safe method.  With no method argument (e.g.
 *                from security-scan scripts that test paths without a method),
 *                the function returns true (safe default) to preserve the
 *                conservative classification used by `check-route-guard-membership`.
 */
export function isLocalOnlyPath(path: string, method?: string): boolean {
  // Method-aware GET exemption: only exact-match paths in the exemption set
  // are eligible; prefix/wildcard matching is intentionally NOT used to avoid
  // accidentally opening sub-paths of a spawn-capable route.
  if (method && SAFE_METHODS.has(method.toUpperCase()) && LOCAL_ONLY_API_GET_EXEMPTIONS.has(path)) {
    return false;
  }
  return (
    LOCAL_ONLY_API_PREFIXES.some((p) => path === p || path.startsWith(p)) ||
    LOCAL_ONLY_API_PATTERNS.some((re) => re.test(path))
  );
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
