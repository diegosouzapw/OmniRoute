/**
 * Boot wiring for the job registry.
 *
 * startAll() runs each interval job's first tick synchronously (see startInterval
 * in registry.ts), so starting a job before initializeCloudSync() has been awaited
 * runs its handler against a half-initialised app. The previous wiring avoided that
 * two different ways: the budget reset was started after the init call, and the
 * token health check's first sweep sat behind a 10s timer.
 *
 * Neither entry point can be driven from a unit test - both are process-boot
 * functions that reach the real cloud sync - so these read the wiring, the same
 * way tests/unit/model-sync-scheduler.test.ts already asserts on this file.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("initCloudSync: cloud sync is initialised before the registry starts any job", () => {
  const source = readSource("src/lib/initCloudSync.ts");
  const initCall = source.indexOf("await initializeCloudSync(");
  const startAllCall = source.indexOf("registry.startAll(");

  assert.notEqual(initCall, -1, "initializeCloudSync() call not found");
  assert.notEqual(startAllCall, -1, "registry.startAll() call not found");
  assert.ok(
    initCall < startAllCall,
    "startAll() fires each interval job's first tick immediately, so it must come after initializeCloudSync()"
  );
});

test("initCloudSync: both budget and token-health jobs are registered", () => {
  const source = readSource("src/lib/initCloudSync.ts");
  assert.match(
    source,
    /registerBudgetResetJob\s*\(/,
    "src/lib/initCloudSync.ts must register the budget reset job"
  );
  assert.match(
    source,
    /registerTokenHealthCheck\s*\(/,
    "src/lib/initCloudSync.ts must register the token health check job"
  );
});
