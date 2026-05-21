import test from "node:test";
import assert from "node:assert/strict";
import { getAntigravityLoadCodeAssistMetadata } from "../../open-sse/services/antigravityHeaders.ts";

test("loadCodeAssist metadata matches Antigravity Manager (ideType only)", () => {
  assert.deepEqual(getAntigravityLoadCodeAssistMetadata(), { ideType: "ANTIGRAVITY" });
  assert.equal("platform" in getAntigravityLoadCodeAssistMetadata(), false);
  assert.equal("pluginType" in getAntigravityLoadCodeAssistMetadata(), false);
});
