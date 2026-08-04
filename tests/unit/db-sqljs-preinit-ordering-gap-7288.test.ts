import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Regression guard for #7288 / #7494 — a startup step reaching
// `getDbInstance()` before `preInitSqlJs()` had run threw the misleading
// "sql.js WASM ainda não foi pré-inicializado" error for an EXISTING DB file
// when both synchronous drivers (better-sqlite3, node:sqlite) failed.
//
// NOTE on approach: an earlier version of this fix added a top-level
// `await preInitSqlJs(...)` barrier that used to sit at the bottom of
// `src/lib/db/core.ts` so merely *importing* core.ts guaranteed the
// pre-init. That made core.ts an async ES module — esbuild's CJS bundling
// path (used by `tsx`'s CJS require hook, and hit by several other test
// files that `require("../../src/lib/db/core.ts")` for cleanup, e.g.
// tests/unit/stmt-cache-lru.test.ts) rejects any `require()` of a module
// whose dependency graph contains a top-level await ("This require call is
// not allowed because the transitive dependency ... contains a top-level
// await"), and even where esbuild didn't hard-fail, sharing that pending
// top-level-await Promise across node:test's process broke unrelated tests'
// event-loop bookkeeping ("Promise resolution is still pending but the
// event loop has already resolved" — reproduced with
// tests/unit/api/compression/compression-api.test.ts run in the same
// process as any of the `require(".../core.ts")` cleanup helpers above).
//
// The fix instead closes the ordering gap at the real startup entrypoint:
// `registerNodejs()` (src/instrumentation-node.ts) now calls
// `ensureDbReadyForBoot()` — which pre-initializes sql.js when needed —
// BEFORE any other startup step (ensureSecrets(), clearStaleCrashCooldowns(),
// getSettings(), initAuditLog()) can reach `getDbInstance()`. No top-level
// await anywhere in core.ts.

async function importFreshCore() {
  const url = new URL("../../src/lib/db/core.ts", import.meta.url).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

let dataDir: string;
let prevDataDir: string | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let coreModule: any;

test.after(() => {
  try {
    coreModule?.resetDbInstance?.();
  } catch {
    /* best-effort cleanup */
  }
  if (prevDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = prevDataDir;
  if (dataDir) fs.rmSync(dataDir, { recursive: true, force: true });
});

test("src/lib/db/core.ts has no top-level await (breaks esbuild's CJS require() bundling — #7288 hotfix)", () => {
  const corePath = fileURLToPath(new URL("../../src/lib/db/core.ts", import.meta.url));
  const source = fs.readFileSync(corePath, "utf8");

  // A bare `await <expr>;` at column 0 (module top-level scope, not inside
  // any function) is the exact pattern that broke esbuild's CJS bundling for
  // every transitive `require()` of this module (tsx's CJS require hook,
  // used by tests/unit/stmt-cache-lru.test.ts and friends).
  assert.doesNotMatch(
    source,
    /^await\s/m,
    "core.ts must not contain a top-level `await` — it makes the module " +
      "un-require()-able via esbuild's CJS bundling path and breaks other " +
      "tests' event-loop bookkeeping when required in the same process"
  );
});

test(
  "registerNodejs() calls ensureDbReadyForBoot() before any startup step that " +
    "reaches getDbInstance() (ensureSecrets/clearStaleCrashCooldowns/getSettings/" +
    "initAuditLog) — closes the #7288/#7494 ordering gap at the real entrypoint",
  () => {
    const instrumentationPath = fileURLToPath(
      new URL("../../src/instrumentation-node.ts", import.meta.url)
    );
    const source = fs.readFileSync(instrumentationPath, "utf8");

    const registerStart = source.indexOf("export async function registerNodejs(");
    assert.ok(registerStart >= 0, "registerNodejs() must exist in instrumentation-node.ts");

    const dbReadyIndex = source.indexOf("await ensureDbReadyForBoot();", registerStart);
    assert.ok(
      dbReadyIndex >= 0,
      "registerNodejs() must call `await ensureDbReadyForBoot();` — it is the only " +
        "caller of preInitSqlJs()"
    );

    for (const laterDbTouch of [
      "await ensureSecrets();",
      "clearStaleCrashCooldowns()",
      "await getSettings();",
      "initAuditLog();",
    ]) {
      const touchIndex = source.indexOf(laterDbTouch, registerStart);
      assert.ok(touchIndex >= 0, `expected to find \`${laterDbTouch}\` in registerNodejs()`);
      assert.ok(
        dbReadyIndex < touchIndex,
        `\`await ensureDbReadyForBoot();\` (index ${dbReadyIndex}) must run before ` +
          `\`${laterDbTouch}\` (index ${touchIndex}) — otherwise that step can reach ` +
          "getDbInstance() before sql.js has had a chance to pre-initialize (#7288 / #7494)"
      );
    }
  }
);

test(
  "getDbInstance() called after the REAL ensureDbReadyForBoot() warm-up (the one " +
    "registerNodejs() now runs ahead of every other startup step) no longer throws " +
    "the ordering-gap 'sql.js WASM ainda não foi pré-inicializado' error when both " +
    "sync drivers fail on an EXISTING db file (#7288 / #7494)",
  async () => {
    dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7288-"));
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    // A directory in place of the sqlite file makes BOTH better-sqlite3 and
    // node:sqlite fail to open it for real (no mocking needed), while
    // fs.existsSync(sqliteFile) stays true — the same shape of failure a
    // real ABI mismatch would produce for the two sync drivers.
    fs.mkdirSync(sqliteFile);

    prevDataDir = process.env.DATA_DIR;
    process.env.DATA_DIR = dataDir;

    coreModule = await importFreshCore();

    // Exercise the REAL production warm-up, not a stand-in: registerNodejs()
    // awaits ensureDbReadyForBoot() -> ensureDbInitialized() (which itself
    // calls preInitSqlJs() when the sync drivers can't open the file) BEFORE
    // any other startup step (ensureSecrets() / clearStaleCrashCooldowns() /
    // getSettings() / initAuditLog()) reaches getDbInstance().
    const { ensureDbReadyForBoot } = await import("../../src/instrumentation-node");
    try {
      await ensureDbReadyForBoot(coreModule.ensureDbInitialized);
    } catch {
      // A literal directory can never become a valid DB for ANY driver, so the
      // warm-up itself is expected to fail here. What matters is only WHICH
      // error getDbInstance() reports afterwards — see the assertion below.
    }

    let thrownMessage: string | null = null;
    try {
      coreModule.getDbInstance();
    } catch (err) {
      thrownMessage = err instanceof Error ? err.message : String(err);
    }

    // Acceptance criterion (#7288): "an existing storage.sqlite still boots
    // via the sql.js fallback (no 'ainda não foi pré-inicializado')". A
    // literal directory can't be opened by ANY driver — including sql.js's
    // own fs.readFileSync — so a residual, *different* I/O error here (e.g.
    // EISDIR) is expected and is not the ordering-gap bug under test: what
    // this test proves is that preInitSqlJs() is actually attempted ahead of
    // getDbInstance() (the fix), not that a synthetic directory becomes a
    // valid database (impossible for any driver).
    assert.ok(
      thrownMessage === null || !/ainda não foi pré-inicializado/.test(thrownMessage),
      "expected the fix to make preInitSqlJs() run ahead of getDbInstance() instead of " +
        "throwing the 'not pre-initialized yet' error when both sync drivers fail on an " +
        `existing DB file — got: ${thrownMessage}`
    );
  }
);

test(
  "the warm-up costs nothing on the happy path: sql.js stays un-initialized when a " +
    "sync driver can already open the file",
  async () => {
    const dir2 = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7288-happy-"));
    const file2 = path.join(dir2, "storage.sqlite");
    try {
      const { tryOpenSync, getSqlJsAdapter } = await import(
        "../../src/lib/db/adapters/driverFactory"
      );
      const { default: Database } = await import("better-sqlite3");
      const seed = new Database(file2);
      seed.exec("CREATE TABLE t (id INTEGER)");
      seed.close();

      // The sync-driver probe is what gates the sql.js/WASM fallback: when it
      // succeeds, nothing downstream should ever reach preInitSqlJs().
      const probe = tryOpenSync(file2, { readonly: true });
      assert.ok(probe, "sanity: a sync driver must be able to open a healthy sqlite file here");
      probe!.close();

      assert.equal(
        getSqlJsAdapter(file2),
        null,
        "sql.js must NOT be pre-initialized when a sync driver can already open the file — " +
          "otherwise every boot would pay the WASM-load cost even on the happy path"
      );
    } finally {
      fs.rmSync(dir2, { recursive: true, force: true });
    }
  }
);
