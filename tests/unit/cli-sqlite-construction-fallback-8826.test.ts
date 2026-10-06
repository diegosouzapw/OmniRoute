import { test } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import Module from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #8826: better-sqlite3 v12 loads its native addon lazily -- import("better-sqlite3")
// SUCCEEDS and only new Database() throws "Could not locate the bindings file" when
// there is no .node binding for the runtime ABI (e.g. CachyOS + Node v26 via AUR).
// openSqliteDatabase() only fell back when the *import* failed; the construction-time
// failure was translated into "Run: omniroute runtime repair" guidance and aborted.

const FIXTURE_DIR = new URL("fixtures/", import.meta.url).pathname;
const hookPath = path.join(FIXTURE_DIR, "8826-mock-better-sqlite3.mjs");

// Register the ESM hook to return a module whose Database constructor throws
register(hookPath, import.meta.url);

// Patch Module._load so CJS createRequire("better-sqlite3") in driverFactory.ts
// also gets a constructor that throws the bindings error.
const originalLoad = Module._load;
Module._load = function patchedLoad(request, parent, isMain) {
  if (request === "better-sqlite3") {
    function FakeBetterSqlite() {
      throw new Error(
        "Could not locate the bindings file. Tried:\n" + " -> /fake/path/better_sqlite3.node"
      );
    }
    return FakeBetterSqlite;
  }
  // @ts-expect-error Module._load is a CJS internal
  return originalLoad.call(this, request, parent, isMain);
};

const { openOmniRouteDb } = await import("../../bin/cli/sqlite.mjs");

test("#8826: openOmniRouteDb() falls back to node:sqlite when better-sqlite3 native binding is missing (construction-time failure)", async (t) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8826-"));
  t.after(() => {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {}
    Module._load = originalLoad;
  });

  const origDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tmpDir;
  t.after(() => {
    if (origDataDir) {
      process.env.DATA_DIR = origDataDir;
    } else {
      delete process.env.DATA_DIR;
    }
  });

  const result = await openOmniRouteDb();

  assert.ok(result.db, "openOmniRouteDb() should return a working db adapter");
  assert.equal(
    result.db.driver,
    "node:sqlite",
    "should fall back to node:sqlite when better-sqlite3 constructor throws (#8826)"
  );
});
