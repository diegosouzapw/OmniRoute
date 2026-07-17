import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

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

test(
  "getDbInstance() called ahead of ensureDbReadyForBoot()/preInitSqlJs() no longer throws " +
    "the ordering-gap 'sql.js WASM ainda não foi pré-inicializado' error when both sync " +
    "drivers fail on an EXISTING db file (#7288 / #7494)",
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

    // Simulates a startup step (ensureSecrets() / clearStaleCrashCooldowns() /
    // getSettings() / initAuditLog() in src/instrumentation-node.ts) reaching
    // getDbInstance() BEFORE ensureDbReadyForBoot() -> preInitSqlJs() has had
    // a chance to run — preInitSqlJs() is never called explicitly in this
    // test, matching the real ordering gap.
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
      "expected the fix to make preInitSqlJs() run ahead of getDbInstance() (e.g. via a " +
        "top-level pre-initialization barrier) instead of throwing the 'not pre-initialized " +
        `yet' error when both sync drivers fail on an existing DB file — got: ${thrownMessage}`
    );
  }
);

test(
  "preInitSqlJsIfSyncDriversUnavailable() is a no-op when a sync driver can already open the file",
  async () => {
    const dir2 = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7288-happy-"));
    const file2 = path.join(dir2, "storage.sqlite");
    try {
      const { preInitSqlJsIfSyncDriversUnavailable, getSqlJsAdapter } = await import(
        "../../src/lib/db/adapters/driverFactory"
      );
      const { default: Database } = await import("better-sqlite3");
      const seed = new Database(file2);
      seed.exec("CREATE TABLE t (id INTEGER)");
      seed.close();

      await preInitSqlJsIfSyncDriversUnavailable(file2);

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
