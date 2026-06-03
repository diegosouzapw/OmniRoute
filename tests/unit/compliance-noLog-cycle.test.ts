import test from "node:test";
import assert from "node:assert/strict";

// #2650: callLogs.ts ↔ compliance/index.ts had a circular import that
// deadlocked the bundled MCP server under Node.js 24. The cycle was broken
// by extracting noLog state to compliance/noLog.ts. These tests guard the
// new boundary so the cycle does not regress.

test("compliance/noLog can be imported without pulling callLogs (#2650)", async () => {
  const noLog = await import("../../src/lib/compliance/noLog.ts");
  assert.equal(typeof noLog.isNoLog, "function");
  assert.equal(typeof noLog.setNoLog, "function");
});

test("compliance/index re-exports isNoLog and setNoLog (backwards compat)", async () => {
  const compliance = await import("../../src/lib/compliance/index.ts");
  assert.equal(typeof compliance.isNoLog, "function");
  assert.equal(typeof compliance.setNoLog, "function");
});

test("callLogs and compliance can both be loaded sequentially without deadlock (#2650)", async () => {
  // If a circular __esm init returns, this would hang. Wrap in a timeout
  // race so the test fails fast on regression instead of timing out the
  // whole suite.
  const loadBoth = (async () => {
    await import("../../src/lib/usage/callLogs.ts");
    await import("../../src/lib/compliance/index.ts");
    return true;
  })();

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("module load timed out — circular init regression")), 5000)
  );

  const ok = await Promise.race([loadBoth, timeout]);
  assert.equal(ok, true);
});

test("noLog state set via compliance/index is visible via compliance/noLog", async () => {
  const compliance = await import("../../src/lib/compliance/index.ts");
  const noLog = await import("../../src/lib/compliance/noLog.ts");
  compliance.setNoLog("__test-cycle-key__", true);
  assert.equal(noLog.isNoLog("__test-cycle-key__"), true);
  compliance.setNoLog("__test-cycle-key__", false);
});
