// Build-time stub for better-sqlite3 (#10060).
//
// OPT-IN ONLY — set OMNIROUTE_BETTER_SQLITE3_STUB=1 to alias it in, and only on
// a build host that actually hits the SIGABRT worker teardown: the native
// Statement destructor aborts when a Next.js build worker thread exits
// (assertion in node::RemoveEnvironmentCleanupHook, env == nullptr), which can
// leave the build with no standalone output.
//
// It is NOT a build-only stand-in. A Turbopack resolveAlias rewrites the
// request before the externals check, so aliasing `better-sqlite3` here also
// removes it from serverExternalPackages' reach and bakes THIS FILE into the
// shipped bundle. An artifact built with the flag on cannot open a database:
// the sync driver chain fails with "r(...) is not a constructor", falls through
// node:sqlite and sql.js, and the instrumentation hook aborts at boot, so every
// route answers HTTP 500. That is exactly what an unconditional alias shipped
// in #11343. See scripts/build/better-sqlite3-stub-flag.mjs.
class Database {
  constructor() {}
  prepare() {
    return {
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    };
  }
  exec() {}
  pragma() {}
  transaction(fn) {
    return fn;
  }
  backup() {
    return Promise.resolve({});
  }
  close() {}
}

module.exports = Database;
