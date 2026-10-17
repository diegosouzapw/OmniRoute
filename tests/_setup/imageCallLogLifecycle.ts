import assert from "node:assert/strict";
import test from "node:test";

// Preloads also run in the native runner parent. Only the per-file worker owns saves.
if (process.argv[1]?.endsWith(".test.ts")) {
  const callLogs = () => import("../../src/lib/usage/callLogs.ts");

  // Import lazily: each fixture selects DATA_DIR before importing application modules.
  test.afterEach(async () => {
    assert.ok(await (await callLogs()).waitForCallLogSaves(5_000), "Image fixture call-log saves did not settle");
  }, { timeout: 6_000 });

  // Registered before file-level hooks so workers close before fixtures reset SQLite.
  test.after(async () => {
    await (await callLogs()).closeCallLogSaves(5_000);
  }, { timeout: 6_000 });
}
