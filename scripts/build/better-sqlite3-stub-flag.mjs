/**
 * Decide whether the Next.js build should alias `better-sqlite3` to the
 * build-time stub (src/lib/db/better-sqlite3.stub.js).
 *
 * History (#11343): the alias was UNCONDITIONAL, added to keep the bundler from
 * tracing the native addon into a Next.js build worker, whose thread teardown
 * can abort with SIGABRT (assertion in node::RemoveEnvironmentCleanupHook) and
 * leave the build without standalone output (#10060).
 *
 * The premise recorded next to that alias — "runtime still uses the real
 * package via serverExternalPackages" — does not hold. A Turbopack
 * `resolveAlias` rewrites the request BEFORE the externals check runs, so
 * `better-sqlite3` becomes a relative path, no longer matches the
 * `serverExternalPackages` entry, and the stub is baked into the bundle. Every
 * artifact built from that config answered HTTP 500 on every route: the stub's
 * default export is not a constructor, the sync driver chain fell through to
 * `node:sqlite` and then sql.js, and the instrumentation hook aborted at boot.
 *
 * This is the same failure shape as #6344 (the @/mitm/manager stub shipping to
 * every npm/Electron/VPS artifact), so it gets the same treatment: the alias is
 * opt-in, and a default build gets the real, externalized native package.
 *
 * Set OMNIROUTE_BETTER_SQLITE3_STUB=1 ONLY on a build host that actually hits
 * the SIGABRT worker teardown, and never for an artifact that will be run —
 * the resulting bundle cannot open a database.
 */
export function shouldStubBetterSqlite3(env = process.env) {
  return env.OMNIROUTE_BETTER_SQLITE3_STUB === "1";
}

/** Turbopack resolveAlias fragment for `better-sqlite3`, derived from the env. */
export function betterSqlite3AliasFor(env = process.env) {
  return shouldStubBetterSqlite3(env)
    ? { "better-sqlite3": "./src/lib/db/better-sqlite3.stub.js" }
    : {};
}
