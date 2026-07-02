/**
 * Custom vision models in the LLM selector / `/v1/models` catalog
 * (port of upstream decolua/9router 5e5e78d3 — "fix: show custom vision
 * models in LLM selector and model list").
 *
 * Upstream stored an `imageToText` kind on user-added custom models and the
 * selector hid them from the default LLM list. OmniRoute already keeps custom
 * chat models in the LLM list, but the equivalent gap is the `supportsVision`
 * flag on a custom model: the catalog used to only set `capabilities.vision`
 * when the model id matched the conservative `isVisionModelId` heuristic
 * (`pixtral`, `llava`, `qwen-vl`, …). A user who registered a custom chat
 * model called e.g. `my-vision-llm` and explicitly checked "vision-capable"
 * still saw no `capabilities.vision` in `/v1/models`, so the LLM selector and
 * downstream routing treated it as text-only.
 *
 * This file pins the OmniRoute-flavoured behaviour:
 *   • a custom chat model with `supportsVision: true` MUST surface
 *     `capabilities: { vision: true }` via the catalog helper, regardless of
 *     whether the model id matches the static vision heuristic.
 *   • the existing id-based heuristic (`isVisionModelId`) still works.
 *   • when neither signal is present, no vision fields are emitted (no false
 *     positives — same conservative guard #4071 / #4072).
 */
import test from "node:test";
import assert from "node:assert/strict";

const catalog = await import("../../src/app/api/v1/models/catalog.ts");

type VisionFields = { capabilities: { vision: true } } | null;
type Helper = (entry: unknown, ...candidateIds: Array<string | null | undefined>) => VisionFields;

const getCustomVisionCapabilityFields = (
  catalog as unknown as { getCustomVisionCapabilityFields?: Helper }
).getCustomVisionCapabilityFields;

test("custom vision helper is exported from the catalog module", () => {
  assert.equal(
    typeof getCustomVisionCapabilityFields,
    "function",
    "expected getCustomVisionCapabilityFields to be exported from src/app/api/v1/models/catalog.ts"
  );
});

test("supportsVision flag on a custom model surfaces capabilities.vision (LLM selector unblock)", () => {
  const helper = getCustomVisionCapabilityFields as Helper;
  const entry = { id: "my-vision-llm", supportsVision: true };
  const fields = helper(entry, "openai-compat/my-vision-llm", "my-vision-llm");
  assert.ok(fields, "supportsVision=true must yield vision fields");
  assert.equal(fields?.capabilities.vision, true);
});

test("id-based isVisionModelId heuristic still works when supportsVision is unset", () => {
  const helper = getCustomVisionCapabilityFields as Helper;
  const entry = { id: "pixtral-12b" };
  const fields = helper(entry, "openai-compat/pixtral-12b", "pixtral-12b");
  assert.ok(fields, "well-known vision model id must yield vision fields");
  assert.equal(fields?.capabilities.vision, true);
});

test("no signal → no vision fields (avoids #4071-style false positives)", () => {
  const helper = getCustomVisionCapabilityFields as Helper;
  const entry = { id: "plain-text-llm" };
  const fields = helper(entry, "openai-compat/plain-text-llm", "plain-text-llm");
  assert.equal(fields, null);
});

test("explicit supportsVision=false is respected (text-only override)", () => {
  const helper = getCustomVisionCapabilityFields as Helper;
  // Even if the id matches the heuristic, an explicit false flag wins so the
  // user can downgrade a mis-classified model.
  const entry = { id: "pixtral-12b", supportsVision: false };
  const fields = helper(entry, "alias/pixtral-12b", "pixtral-12b");
  assert.equal(fields, null);
});
