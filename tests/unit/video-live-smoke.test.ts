import assert from "node:assert/strict";
import test from "node:test";

import {
  executeVideoLiveSmoke,
  validateVideoLiveContext,
} from "../../scripts/ad-hoc/video-live-smoke.ts";

test("a real probe requires explicit execution and never sends private keys outside fixed loopback", async () => {
  assert.equal((await executeVideoLiveSmoke("/does-not-exist", false)).status, "HOLD");
  const context = {
    baseUrl: "http://127.0.0.1:20428",
    owner: "test-owner",
    stranger: "test-stranger",
    cliToken: "test-local-token",
  };
  assert.deepEqual(validateVideoLiveContext(context), context);
  for (const baseUrl of [
    "https://example.com",
    "http://192.168.0.15:20128",
    "http://127.0.0.1:20128",
  ]) {
    assert.throws(() => validateVideoLiveContext({ ...context, baseUrl }));
  }
});
