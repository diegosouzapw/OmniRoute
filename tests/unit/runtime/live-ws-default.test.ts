import { test, describe, after } from "node:test";
import assert from "node:assert/strict";

// NOTE: importing liveServer.ts triggers the module-level auto-start guard at
// the bottom of the file. isBuildOrTest() short-circuits it because:
//   - process.argv for the Node test runner includes "--test"
//   - process.env.NODE_ENV is typically "test" in this suite
// Either condition is sufficient — no socket is opened.

const originalEnv = process.env.OMNIROUTE_ENABLE_LIVE_WS;

after(() => {
  // Restore original env so other tests in the same process are unaffected.
  if (originalEnv === undefined) {
    delete process.env.OMNIROUTE_ENABLE_LIVE_WS;
  } else {
    process.env.OMNIROUTE_ENABLE_LIVE_WS = originalEnv;
  }
});

// Dynamically import so we can verify the named export exists.
const { isLiveWsEnabled } = await import("../../../src/server/ws/liveServer.ts");

describe("isLiveWsEnabled — default-ON behavior", () => {
  test("unset → true (default ON)", () => {
    delete process.env.OMNIROUTE_ENABLE_LIVE_WS;
    assert.equal(isLiveWsEnabled(), true);
  });

  test('"0" → false', () => {
    process.env.OMNIROUTE_ENABLE_LIVE_WS = "0";
    assert.equal(isLiveWsEnabled(), false);
  });

  test('"false" → false', () => {
    process.env.OMNIROUTE_ENABLE_LIVE_WS = "false";
    assert.equal(isLiveWsEnabled(), false);
  });

  test('"FALSE" → false (case-insensitive)', () => {
    process.env.OMNIROUTE_ENABLE_LIVE_WS = "FALSE";
    assert.equal(isLiveWsEnabled(), false);
  });

  test('"1" → true', () => {
    process.env.OMNIROUTE_ENABLE_LIVE_WS = "1";
    assert.equal(isLiveWsEnabled(), true);
  });

  test('"true" → true', () => {
    process.env.OMNIROUTE_ENABLE_LIVE_WS = "true";
    assert.equal(isLiveWsEnabled(), true);
  });

  test('"TRUE" → true (case-insensitive)', () => {
    process.env.OMNIROUTE_ENABLE_LIVE_WS = "TRUE";
    assert.equal(isLiveWsEnabled(), true);
  });
});
