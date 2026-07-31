/**
 * Compile-time deny-list: route prefixes whose handlers can spawn arbitrary local
 * subprocesses (npm install, node, MITM server, python CLIs) on behalf of the
 * caller. These MUST NEVER appear in the manage-scope bypass list — regardless of
 * DB state — because reaching them from non-loopback would re-introduce the
 * GHSA-fhh6-4qxv-rpqj surface that the LOCAL_ONLY tier exists to close.
 *
 * Enforced at two layers:
 *   1. zod schema (`settingsSchemas.ts`): rejects `PATCH /api/settings` with error
 *      code `BYPASS_PREFIX_NOT_ALLOWED` if any entry in
 *      `localOnlyManageScopeBypassPrefixes` falls inside this set.
 *   2. runtime (`isLocalOnlyBypassableByManageScope` in `routeGuard.ts`): even if a
 *      malformed DB row claims a spawn-capable path is bypassable, the policy refuses.
 *
 * 🔒 This constant lives in `@/shared/constants` — a server-free leaf module — and
 * NOT in `@/server/authz/routeGuard`, on purpose. `settingsSchemas.ts` is reachable
 * from client components (dashboard onboarding wizard → validation barrel), and
 * importing it from `routeGuard.ts` dragged routeGuard's server runtime
 * (runtimeSettings → localDb → apiKeys → rateLimiter → ioredis) into the browser
 * bundle, breaking the Next CLI/client webpack build with
 * `Module not found: Can't resolve 'dns'/'net'`. Keeping the value here lets both the
 * client-safe schema and the server routeGuard import it with no server coupling.
 * Regression guard: `tests/unit/authz/spawn-capable-prefixes-client-safe.test.ts`.
 * Hard Rules #15 + #17.
 */
export const SPAWN_CAPABLE_PREFIXES: ReadonlyArray<string> = [
  "/api/cli-tools/runtime/",
  "/api/cli-tools/qwen-settings", // GET probes the Qwen Code binary; the route also mutates local ~/.qwen files
  "/api/services/", // T-10: can run npm install + spawn node processes
  "/api/tools/agent-bridge/", // start/stop MITM server + DNS edits (Hard Rules #15 + #17)
  "/api/tools/traffic-inspector/", // http-proxy listener + system proxy (Hard Rules #15 + #17)
  "/api/plugins/", // plugins: load/execute via worker_threads + child_process (Hard Rules #15 + #17)
  "/api/local/", // T-12: 1-click local service launchers (Redis today) — must never be whitelistable via manage-scope bypass (Hard Rules #15 + #17)
  "/api/skills/collect/", // Skill Collector CLI detection: GET .../detect spawns a child process per CLI_TOOL_IDS entry — must never be whitelistable via manage-scope bypass (Hard Rules #15 + #17, PR #6294 review)
  "/api/headroom/start", // spawns headroom-ai python CLI — must never be bypassable (Hard Rules #15 + #17)
  "/api/headroom/stop", // kills tracked PID — must never be bypassable (Hard Rules #15 + #17)
  "/api/vnc-session", // #7892: spawns Docker containers via child_process.spawn (src/lib/vncSession/service.ts) — must never be whitelistable via manage-scope bypass (Hard Rules #15 + #17)
];

/**
 * Regex-matched companion to `SPAWN_CAPABLE_PREFIXES`, for spawn-capable
 * routes whose spawn-capable segment sits AFTER a dynamic path parameter
 * (e.g. `/api/providers/{id}/refresh-cursor`) — a flat prefix would either
 * miss them entirely or require over-broadening the shared `/api/providers/`
 * prefix (used for legitimate remote provider CRUD). Mirrors the
 * `LOCAL_ONLY_API_PREFIXES`/`LOCAL_ONLY_API_PATTERNS` split already
 * established in `routeGuard.ts` for this exact shape. Checked against a
 * CONCRETE resolved request path — an exact regex match, no approximation.
 */
export const SPAWN_CAPABLE_PATTERNS: ReadonlyArray<RegExp> = [
  /^\/api\/providers\/[^/]+\/login\/?$/, // pre-existing gap: in LOCAL_ONLY_API_PATTERNS today but never in a spawn-capable deny-list
  /^\/api\/providers\/[^/]+\/refresh-cursor\/?$/, // spawns cursor-agent via renewal.ts (Hard Rules #15 + #17)
  /^\/api\/providers\/cursor\/agent-availability\/?$/, // static path (no dynamic segment), but kept in this array alongside its /api/providers/ siblings rather than the flat SPAWN_CAPABLE_PREFIXES array — spawns cursor-agent status via checkCursorAgentAvailability()/getCachedCursorAgentAvailability() (Hard Rules #15 + #17)
];

/**
 * Companion to `SPAWN_CAPABLE_PATTERNS`, used ONLY by the zod-level candidate
 * bypass-prefix check (`settingsSchemas.ts`), which validates a candidate
 * BYPASS PREFIX STRING (not a concrete path) at `PATCH /api/settings` time —
 * general prefix-vs-regex reachability is undecidable, so this conservatively
 * treats the shared literal ancestor of the dynamic/static-segment patterns
 * as off-limits. Intentionally coarser than `SPAWN_CAPABLE_PATTERNS`'s exact
 * per-route match, but costs nothing security-wise: the runtime check in
 * `isLocalOnlyBypassableByManageScope` (Layer 2) is the actual enforcement
 * boundary and stays exact. `SPAWN_CAPABLE_PREFIXES` itself is untouched.
 */
export const SPAWN_CAPABLE_PATTERN_ANCESTORS: ReadonlyArray<string> = ["/api/providers/"];
