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
  "/api/services/", // T-10: can run npm install + spawn node processes
  "/api/tools/agent-bridge/", // start/stop MITM server + DNS edits (Hard Rules #15 + #17)
  "/api/tools/traffic-inspector/", // http-proxy listener + system proxy (Hard Rules #15 + #17)
  "/api/plugins/", // plugins: load/execute via worker_threads + child_process (Hard Rules #15 + #17)
  "/api/local/", // T-12: 1-click local service launchers (Redis today) — must never be whitelistable via manage-scope bypass (Hard Rules #15 + #17)
  "/api/headroom/start", // spawns headroom-ai python CLI — must never be bypassable (Hard Rules #15 + #17)
  "/api/headroom/stop", // kills tracked PID — must never be bypassable (Hard Rules #15 + #17)
];
