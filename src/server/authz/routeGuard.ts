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
import {
  SPAWN_CAPABLE_PREFIXES,
  SPAWN_CAPABLE_PATTERNS,
} from "@/shared/constants/spawnCapablePrefixes";
import { VNC_ROUTE_PREFIX } from "@/lib/vncSession/manifest";

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export const LOCAL_ONLY_API_PREFIXES: ReadonlyArray<string> = [
  "/api/mcp/",
  "/api/cli-tools/runtime/",
  "/api/cli-tools/omp-settings", // spawns `which omp` to detect the CLI install (Hard Rules #15 + #17, #6318)
  "/api/cli-tools/letta-settings", // spawns `which letta` to detect the CLI install (Hard Rules #15 + #17, #6318)
  "/api/cli-tools/grok-build-settings", // GET calls getCliRuntimeStatus("grok-build"), which spawns a child process to locate + healthcheck the `grok` binary — same transitive-spawn surface that classified /api/skills/collect/ (Hard Rules #15 + #17). Writing ~/.grok/config.toml is inherently a local-machine operation, so loopback-only costs no real capability.
  "/api/cli-tools/forge-settings", // spawns via getCliRuntimeStatus() to detect the `forge` CLI install (Hard Rules #15 + #17, #7263)
  "/api/cli-tools/jcode-settings", // spawns via getCliRuntimeStatus() to detect the `jcode` CLI install (Hard Rules #15 + #17, #7263)
  "/api/cli-tools/qwen-settings", // GET probes the local `qwen` binary; writes target ~/.qwen config files (Hard Rules #15 + #17)
  "/api/services/", // T-10: embedded service lifecycle (spawn child processes)
  "/api/tunnels/cloudflared", // POST installs/starts/stops cloudflared; safe methods are exempted below
  "/api/tunnels/tailscale/disable", // stops Funnel and may stop tailscaled/Tailscale service
  "/api/tunnels/tailscale/enable", // starts tailscaled/login/funnel subprocesses
  "/api/tunnels/tailscale/install", // downloads/installs Tailscale and starts its daemon
  "/api/tunnels/tailscale/login", // spawns `tailscale up`
  "/api/tunnels/tailscale/start-daemon", // starts tailscaled/Tailscale service
  "/dashboard/providers/services/", // T-07: reverse proxy to embedded service UIs
  "/api/copilot/", // unauthenticated LLM driver — CLI-only by default; admins can opt-in to remote access via manage-scope bypass
  "/api/tools/agent-bridge/", // AgentBridge: spawns MITM server + DNS edits (Hard Rules #15 + #17)
  "/api/settings/mitm", // "Enable MITM" flow: installs a system-wide trusted root CA (security add-trusted-cert / certutil / update-ca-certificates) and writes /etc/hosts DNS overrides via src/mitm/* — host-level TLS interception. Was MANAGEMENT-only, so requireLogin=false left it remotely reachable (GHSA-x7vm-hp44-9p79, Hard Rules #15 + #17). Same tier as /api/tools/agent-bridge/.
  "/api/cli-tools/antigravity-mitm", // Antigravity MITM enable flow: same privileged CA-trust + DNS surface as /api/settings/mitm (GHSA-x7vm-hp44-9p79, Hard Rules #15 + #17). Covers the /alias child route by prefix.
  "/api/tools/traffic-inspector/", // Traffic Inspector: http-proxy listener + system proxy (Hard Rules #15 + #17)
  "/api/issue-agent/", // Issue Agent: recorded/local triage executor surface; keep loopback/LAN until sandbox + audit hardening is complete
  "/api/plugins/", // plugins: load/execute via worker_threads + child_process (Hard Rules #15 + #17)
  "/api/plugins", // bare path: GET list + POST install also trigger plugin loading
  "/api/middleware/", // SECURITY_AUDIT M8: middleware hooks compile+run arbitrary JS via new vm.Script (src/lib/middleware/registry.ts) on the request hot path — same code-exec class as /api/plugins/, so loopback-gate it for parity (Hard Rules #15 + #17)
  "/api/system/version", // auto-update: spawns git checkout + npm install — RCE-via-tunnel surface (Hard Rules #15 + #17, found by 6A.8 route-guard gate)
  "/api/db-backups/exportAll", // spawns tar for export archive (Hard Rules #15 + #17, found by 6A.8 route-guard gate)
  "/api/local/", // T-12: 1-click local service launchers (Redis today; spawns podman/docker) — loopback-enforced by isLocalRequestAllowed() in src/lib/security/localEndpoints.ts (Hard Rules #15 + #17)
  "/api/headroom/start", // Headroom token-saver proxy lifecycle: spawns headroom-ai python CLI (Hard Rules #15 + #17)
  "/api/headroom/stop", // Headroom token-saver proxy lifecycle: sends SIGTERM/SIGKILL to managed PID (Hard Rules #15 + #17)
  "/api/jobs", // JobRegistry control (enable/disable/run-now) + run history - runtime job administration, loopback-only (Hard Rules #15 + #17)
  "/api/jobs/", // sub-paths: /api/jobs/:id/{runs,enable,disable,run-now} (the bare `/api/jobs` above matches the list route; this matches children)
  "/api/oauth/cursor/auto-import", // spawns execFile("which", argv-array-of-one-arg "cursor") to verify a local Cursor install before importing creds — RCE-via-tunnel surface (Hard Rules #15 + #17, found by 6A.8 route-guard gate). Specific path only: the rest of /api/oauth/ (browser redirect/callback flows) must stay remote-reachable. Note: this comment intentionally avoids a literal closing square bracket character — check-openapi-security-tiers.mjs's naive regex parser for this array stops at the first one it finds, silently truncating its view of every entry after this one.
  "/api/oauth/kiro/auto-import", // reads host-local Kiro credential files (homedir kiro-cli data) — must reach the loopback-only gate, not the PUBLIC /api/oauth/ prefix (GHSA-wgwc-crjm-pmwv, GHSA-gxv4-955v-v6cm). Excluded from PUBLIC in publicApiRoutes.ts.
  "/api/skills/collect/", // Skill Collector CLI detection: GET .../detect probes getCliRuntimeStatus() per CLI_TOOL_IDS entry, which spawns a child process to check each tool — RCE-via-tunnel surface (Hard Rules #15 + #17, PR #6294 review).
  "/api/discovery/", // Discovery tool (opt-in provider scanner): the scan route makes outbound probes to provider endpoints (SSRF-adjacent) and the whole surface is an admin research tool — strict-loopback only, no manage-scope bypass (NOT in LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES). See _tasks/features-v3.8.42/gaps/DISCOVERY_TOOL_DESIGN.md.
  VNC_ROUTE_PREFIX, // #7892: /api/vnc-session/* spawns Docker containers via child_process.spawn (src/lib/vncSession/service.ts) — RCE-via-tunnel surface (Hard Rules #15 + #17), same CVE class (GHSA-fhh6-4qxv-rpqj).
  "/api/acp/agents", // ACP custom-agent registry: POST registers a client-chosen `binary`; GET / POST {action:"refresh"} runs detectInstalledAgents() -> execFileSync(probe.command, probe.args, { shell }) transitively (src/lib/acp/registry.ts) — RCE-via-tunnel surface (Hard Rules #15 + #17, #7948)
  "/api/resilience/connections", // Per-account resilience state. NOTE: prefix matching also gates future /api/resilience/connections-* paths.
  "/dashboard/resilience/connections", // Per-account resilience state. NOTE: this endpoint is READ-ONLY (no child process spawn, unlike every other entry in this list); gated because it exposes per-account operational state (cooldown/breaker/lockout). Do not treat as precedent for non-spawning routes.
  "/api/providers/cursor/agent-availability", // credential-free dashboard-nudge check: spawns `cursor-agent status --format json` via checkCursorAgentAvailability()/getCachedCursorAgentAvailability() (src/lib/cursor/renewal.ts) — RCE-via-tunnel surface (Hard Rules #15 + #17). Narrow-scoped like /login and /refresh-cursor, not the whole /api/providers/ tree. Placed under /api/providers/ rather than /api/oauth/ because /api/oauth/ is PUBLIC-classified and never reaches this LOCAL_ONLY gate.
  "/api/modality-bridge/video/", // Video Bridge status + extraction broker; fixed ffmpeg/ffprobe subprocesses, strict loopback only (Hard Rules #15 + #17)
];

/**
 * LOCAL_ONLY routes whose spawn-capable segment sits AFTER a dynamic path
 * parameter, so a flat prefix in `LOCAL_ONLY_API_PREFIXES` cannot target them
 * without over-broadening (e.g. locking the entire `/api/providers/` subtree,
 * which remote dashboards legitimately use for provider CRUD). These are matched
 * by regex instead against the concrete resolved path — which is already
 * `request.nextUrl.pathname` (see `runAuthzPipeline`/`classifyRoute`), the
 * SAME string Next.js's own file-based router uses to resolve the `[id]`
 * dynamic segment, so there is no decode/normalization mismatch between what
 * this regex sees and what actually gets dispatched to the route handler.
 *
 *   - `POST /api/providers/{id}/login` launches a headful Playwright Chromium
 *     (a child process) to drive a web-cookie login. Loopback enforcement must
 *     happen unconditionally before any auth check (Hard Rules #15 + #17), so a
 *     leaked JWT via tunnel cannot trigger a browser spawn.
 *   - `POST /api/providers/{id}/refresh-cursor` nudges `cursor-agent`
 *     (`--list-models`/`status`, via `src/lib/cursor/renewal.ts`) as part of
 *     a manual Cursor session renewal attempt — the same RCE-via-tunnel
 *     surface (Hard Rules #15 + #17). The rest of `/api/providers/`,
 *     including the generic `/refresh` route, intentionally stays
 *     remote-reachable — only this Cursor-specific spawn-capable path is
 *     gated, matching the `/login` precedent's narrow-scoping rationale.
 */
export const LOCAL_ONLY_API_PATTERNS: ReadonlyArray<RegExp> = [
  /^\/api\/providers\/[^/]+\/login\/?$/,
  /^\/api\/providers\/volcengine-plan\/connect(\/.*)?$/, // manual headful flow + session-based phone/SMS auto-login (both spawn Playwright)
  /^\/api\/providers\/[^/]+\/refresh-cursor\/?$/,
  /^\/api\/providers\/[^/]+\/chatgpt-web-codex-doctor\/?$/,
];

// `SPAWN_CAPABLE_PREFIXES` / `SPAWN_CAPABLE_PATTERNS` (the spawn-capable
// deny-lists) now live in the server-free leaf module
// `@/shared/constants/spawnCapablePrefixes` so that client-reachable
// validation schemas can import them without pulling this module's server
// runtime (runtimeSettings → localDb → ioredis) into the browser bundle.
// Imported above for the runtime check in `isLocalOnlyBypassableByManageScope`;
// re-exported here so existing `@/server/authz/routeGuard` importers keep working.
export { SPAWN_CAPABLE_PREFIXES, SPAWN_CAPABLE_PATTERNS };

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
  // Full-database export/import: a credential dump and an irreversible replace.
  // Must stay authenticated even under requireLogin=false, for the same reason
  // /api/settings/database already does. isAlwaysProtectedPath matches on a path
  // boundary, so this covers export, exportAll and import. (GHSA-mghq-58h3-qcqj)
  "/api/db-backups",
  // Legacy siblings of /api/db-backups left out of the mghq fix: export-json
  // dumps every stored credential and import-json irreversibly replaces
  // settings/connections, and both handlers only gate on isAuthRequired() —
  // which is false under requireLogin=false. (GHSA-v7g9-7f55-5g46)
  "/api/settings/export-json",
  "/api/settings/import-json",
  // Bulk log export: call_logs carries prompts and responses, proxy_logs carries
  // client/public IPs, and the handler only calls requireManagementAuth() with no
  // alwaysRequireAuth. Found sweeping the GHSA-5926-2w35-7h4q class.
  "/api/logs/export",
  // Codex CLI profile store. GET leaks the operator's account label; PUT writes
  // attacker-supplied auth.json + config.toml straight into the operator's Codex
  // CLI config (ensureCliConfigWriteAllowed() only checks CLI_ALLOW_CONFIG_WRITES,
  // which defaults to true), so a POST+PUT pair repoints the CLI at attacker
  // credentials or an attacker base URL. Found sweeping the same class.
  "/api/cli-tools/codex-profiles",
  // Writes into ~/.gemini/antigravity-cli/antigravity-oauth-token. Same family
  // as the {claude,codex}-auth/apply-local pattern below; a plain path because
  // it carries no dynamic segment.
  "/api/providers/agy-auth/apply-local",
];

/**
 * ALWAYS_PROTECTED routes whose path carries a dynamic segment, so the plain
 * exact/prefix list above cannot express them: a `/api/providers/` prefix would
 * hard-gate the entire provider surface and break every keyless local-first
 * install. Mirrors LOCAL_ONLY_API_PATTERNS.
 *
 * The Claude/Codex OAuth export routes return the connection's raw
 * access_token / refresh_token (and the Codex id_token) and gate only on
 * `requireManagementAuth(request)` with no `alwaysRequireAuth`, which fails open
 * under requireLogin=false (GHSA-5926-2w35-7h4q). They are the siblings that
 * both GHSA-mghq-58h3-qcqj and GHSA-v7g9-7f55-5g46 missed.
 */
export const ALWAYS_PROTECTED_API_PATTERNS: ReadonlyArray<RegExp> = [
  // `export` hands the caller the raw token; `apply-local` writes it into the
  // host's CLI config (~/.codex/auth.json and the Claude equivalent). The second
  // does not disclose the credential, but "anonymous" is still the wrong
  // audience for it. ALWAYS_PROTECTED rather than LOCAL_ONLY on purpose: it
  // closes the anonymous hole without breaking an operator driving the dashboard
  // through a tunnel.
  /^\/api\/providers\/[^/]+\/(claude|codex)-auth\/(export|apply-local)\/?$/,
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
 *   /api/tunnels/cloudflared — GET reads tunnel status only; only POST
 *   spawns the cloudflared process (#11531).
 */
export const LOCAL_ONLY_API_GET_EXEMPTIONS: ReadonlySet<string> = new Set([
  "/api/system/version",
  "/api/tunnels/cloudflared",
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
  // Precise, unconditional early-deny for regex-matched spawn-capable routes
  // (e.g. /api/providers/{id}/login, /api/providers/{id}/refresh-cursor).
  // Unlike the flat-prefix defence-in-depth check below, this has the
  // concrete resolved `path` already, so it's an exact match — no
  // reachability heuristics needed.
  if (SPAWN_CAPABLE_PATTERNS.some((re) => re.test(path))) return false;

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
  return (
    ALWAYS_PROTECTED_API_PATHS.some((p) => path === p || path.startsWith(p)) ||
    ALWAYS_PROTECTED_API_PATTERNS.some((re) => re.test(path))
  );
}
