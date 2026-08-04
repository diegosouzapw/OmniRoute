import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  registerBuiltinCompressionEngines,
  clearCompressionEngineRegistry,
  getCompressionEngine,
} from "../../../open-sse/services/compression/index.ts";

// F5.3: registerBuiltinCompressionEngines() guards on a module-level `registered` latch.
// clearCompressionEngineRegistry() empties the engine map but does NOT reset that latch, so
// a subsequent registerBuiltinCompressionEngines() no-ops and leaves the registry empty —
// any getCompressionEngine() then returns null. This file runs in its own process so the
// latch starts false (no cross-file interference).
describe("builtin compression engine registration after clear", () => {
  it("re-registers builtin engines after the registry is cleared", () => {
    registerBuiltinCompressionEngines();
    assert.ok(getCompressionEngine("rtk"), "builtins registered initially");

    clearCompressionEngineRegistry();
    assert.equal(getCompressionEngine("rtk"), null, "registry emptied by clear");

    // The `registered` latch must not block this re-registration.
    registerBuiltinCompressionEngines();
    assert.ok(getCompressionEngine("rtk"), "builtins must repopulate after a clear");
    assert.ok(getCompressionEngine("session-dedup"), "all builtins restored, not just one");
  });
});
