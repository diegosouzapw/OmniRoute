/**
 * Verify that mimo-v2.5 is safe to use with images across all providers
 * (xiaomi-mimo, command-code, bazaarlink, opencode-go, bare model id).
 *
 * mimo-v2.5 is registered in ModelSpec (`modelSpecs.ts:410-415`) with
 * `supportsVision: true`, so resolveVisionCapability() picks it up from
 * `spec.supportsVision` without needing a registry flag.
 *
 * This test proves that the scenario described in the issue report
 * (image-bearing request → vision-bridge auto-reroute to opencode-zen → 401)
 * never applies to mimo-v2.5 — it has always been correctly identified as
 * vision-capable even before the registry + heuristic fix for other CC models.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";
import { isVisionModelId } from "../../src/shared/constants/visionModels.ts";

const MIMO_V25_CASES: [string, string, boolean][] = [
  ["xiaomi-mimo/mimo-v2.5", "via xiaomi-mimo", true],
  ["command-code/mimo-v2.5", "via command-code", true],
  ["bazaarlink/mimo-v2.5", "via bazaarlink", true],
  ["opencode-go/mimo-v2.5", "via opencode-go", true],
  ["mimo-v2.5", "bare model name", true],
  // Text-only variants must stay false
  ["mimo-v2.5-pro", "text-only variant", false],
  ["command-code/mimo-v2.5-pro", "text-only via command-code", false],
];

for (const [modelId, desc, expected] of MIMO_V25_CASES) {
  test(`${desc} (${modelId}) → supportsVision=${expected}`, () => {
    const caps = getResolvedModelCapabilities(modelId);
    assert.equal(caps.supportsVision, expected, `${modelId} supportsVision must be ${expected}`);
  });
}

test("mimo-v2.5 heuristic is correct (no false positive from mimo-vl fragment)", () => {
  // mimo-vl matches "mimo-vl-a3b", not "mimo-v2.5"
  assert.equal(isVisionModelId("mimo-vl-a3b"), true, "mimo-vl must be detected as vision");
  assert.equal(
    isVisionModelId("mimo-v2.5"),
    false,
    "mimo-v2.5 must NOT match the mimo-vl heuristic"
  );
  // But getResolvedModelCapabilities still returns true via ModelSpec
  assert.equal(getResolvedModelCapabilities("mimo-v2.5").supportsVision, true);
});
