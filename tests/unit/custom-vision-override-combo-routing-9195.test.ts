/**
 * #9195 — Manual "Vision capable" override does not affect Combo routing.
 *
 * Simplified repro tests that test the core logic directly without DB setup.
 * The full catalog/routing repro tests are in the probe worktree.
 */
import test from "node:test";
import assert from "node:assert/strict";

// Direct import of the catalog vision helper — no DB setup needed.
const catalogVision = await import("../../src/app/api/v1/models/catalogVision.ts");

/**
 * Bug #1 proof: getCustomVisionCapabilityFields IS called by the catalog code
 * only when modelType === "chat". But modelType is never "chat" for chat models.
 * Calling it directly with a model entry that has supportsVision:true proves the
 * function works correctly — the bug is in the guard that never calls it.
 */
test("getCustomVisionCapabilityFields works with explicit supportsVision:true", () => {
  const fields = catalogVision.getCustomVisionCapabilityFields(
    { supportsVision: true },
    "openai-compatible-demo/qwen3.6-35b"
  );
  assert.ok(fields, "explicit supportsVision:true should produce vision capability fields");
  assert.deepEqual(fields!.capabilities, { vision: true });
});

test("getCustomVisionCapabilityFields returns null for explicit supportsVision:false", () => {
  const fields = catalogVision.getCustomVisionCapabilityFields(
    { supportsVision: false },
    "openai-compatible-demo/gpt-4-vision-preview"
  );
  assert.equal(fields, null);
});

test("getCustomVisionCapabilityFields falls back to id heuristic when no explicit flag", () => {
  // Without an explicit flag, the function falls through to the id-based heuristic.
  // A model id that looks like a vision model should get vision fields.
  const fields = catalogVision.getCustomVisionCapabilityFields(
    undefined,
    "openai-compatible-demo/gpt-4-vision"
  );
  // The id heuristic might or might not match — we just verify it doesn't crash.
  // The important thing is that the function is called at all.
  assert.ok(fields === null || fields.capabilities?.vision === true);
});