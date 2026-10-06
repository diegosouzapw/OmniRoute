/**
 * #10060 — during the Next.js production build the native better-sqlite3 addon
 * must never load. Its Statement destructor aborts with SIGABRT when a build
 * worker thread exits (assertion in node::RemoveEnvironmentCleanupHook), which
 * can leave the build with no standalone output.
 *
 * The reliable build signal is OMNIROUTE_BUILDING=1 (set by
 * build-next-isolated.mjs and inherited by every spawned build worker), because
 * Next.js workers sometimes drop NEXT_PHASE. These tests pin the two contracts
 * that keep the addon out of the build:
 *
 *   1. build-next-isolated.mjs exports OMNIROUTE_BUILDING=1 into the build env.
 *   2. getDbInstance() returns a no-op stub (never the native driver) whenever
 *      the build signal is set, and that stub satisfies the SqliteAdapter shape.
 */

import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import { resolveNextBuildEnv } from "../../../scripts/build/build-next-isolated.mjs";

describe("#10060 build env carries OMNIROUTE_BUILDING", () => {
  it("resolveNextBuildEnv sets OMNIROUTE_BUILDING=1", () => {
    const env = resolveNextBuildEnv({}, "linux");
    assert.equal(env.OMNIROUTE_BUILDING, "1");
  });

  it("preserves provided env keys and does not clobber the build-worker flag", () => {
    const env = resolveNextBuildEnv({ NEXT_PRIVATE_BUILD_WORKER: "1" }, "linux");
    assert.equal(env.NEXT_PRIVATE_BUILD_WORKER, "1");
    assert.equal(env.OMNIROUTE_BUILDING, "1");
  });
});

describe("#10060 getDbInstance stubs SQLite during build", () => {
  const savedBuilding = process.env.OMNIROUTE_BUILDING;
  const savedPhase = process.env.NEXT_PHASE;

  beforeEach(() => {
    delete process.env.NEXT_PHASE;
    process.env.OMNIROUTE_BUILDING = "1";
  });

  afterEach(() => {
    if (savedBuilding === undefined) delete process.env.OMNIROUTE_BUILDING;
    else process.env.OMNIROUTE_BUILDING = savedBuilding;
    if (savedPhase === undefined) delete process.env.NEXT_PHASE;
    else process.env.NEXT_PHASE = savedPhase;
  });

  it("returns a no-op stub (never the native better-sqlite3 driver) under the build signal", async () => {
    // Import fresh so isBuildPhase is evaluated with OMNIROUTE_BUILDING set.
    const mod = await import(`../../../src/lib/db/core.ts?build-stub=${Date.now()}`);
    const db = mod.getDbInstance();

    // Must NOT be the native addon — that is the whole point of the fix.
    assert.notEqual(db.driver, "better-sqlite3");
    assert.equal(db.open, true);

    // The stub satisfies the SqliteAdapter surface the build's module-eval touches.
    const stmt = db.prepare("SELECT 1 AS x");
    assert.equal(stmt.get(), undefined);
    assert.deepEqual(stmt.all(), []);
    assert.deepEqual(stmt.run(), { changes: 0, lastInsertRowid: 0 });
    assert.doesNotThrow(() => db.exec("CREATE TABLE t (a)"));
    assert.doesNotThrow(() => db.pragma("journal_mode = WAL"));
    assert.doesNotThrow(() => db.close());
  });
});
