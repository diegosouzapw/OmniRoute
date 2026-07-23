import { test } from "node:test";
import assert from "node:assert/strict";

// #8045: on Windows, closing the console window delivers CTRL_CLOSE_EVENT, which
// Node/libuv maps to a JS-visible "SIGHUP" event (confirmed: nodejs/node#10165,
// Node process docs — "SIGHUP is generated on Windows when the console window is
// closed"). Before this fix, initGracefulShutdown() only registered SIGTERM/SIGINT,
// so the "close the window" path never ran cleanup() (WAL checkpoint(TRUNCATE) +
// closeDbInstance()), leaving storage.sqlite's WAL un-checkpointed for the next launch.
test("initGracefulShutdown registers a SIGHUP handler (Windows console-close path)", async () => {
  const before = process.listenerCount("SIGHUP");
  const { initGracefulShutdown } = await import("../../src/lib/gracefulShutdown.ts");
  initGracefulShutdown();
  const after = process.listenerCount("SIGHUP");
  assert.ok(
    after > before,
    `Expected initGracefulShutdown() to add a SIGHUP listener (before=${before}, after=${after}).`
  );

  // Clean up: remove all SIGHUP listeners added by this test so it doesn't leak
  // into other test files sharing the same process.
  process.removeAllListeners("SIGHUP");
});
