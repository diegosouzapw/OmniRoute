/**
 * #14587 — MiMo v2.6 family is natively vision-capable but absent from every
 * capability source, so `resolveVisionCapability` falls through the whole
 * cascade and returns `null`, which `/v1/models` and the combo projection both
 * render as text-only. One unresolvable member then flips an entire combo to
 * `multimodal: false`.
 *
 * The last-resort id heuristic (VISION_MODEL_ID_FRAGMENTS, #4072) is the
 * established channel for exactly this case (see
 * vision-models-cc-fragments.test.ts). The `mimo-v2.6-pro` / `mimo-v2.6-flash`
 * fragments must match the documented v2.6 family through provider-qualified
 * ids without over-matching the text-only `*-pro` siblings from earlier
 * generations, and without inheriting the verdict for unrelated v2.6 ids.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";
import { isVisionModelId } from "../../src/shared/constants/visionModels.ts";

// ── The two ids from the report, plus the bare and sibling variants ──

const V26_VISION = [
  "opencode-go/mimo-v2.6-pro",
  "command-code/xiaomi/mimo-v2.6-pro",
  "mimo-v2.6-pro",
  "xiaomi-mimo/mimo-v2.6-pro:free",
  "mimo-v2.6-flash",
  "opencode-go/mimo-v2.6-pro-ultraspeed",
];

for (const id of V26_VISION) {
  test(`#${id} resolves supportsVision=true`, () => {
    assert.equal(isVisionModelId(id), true, `isVisionModelId(${id})`);
    const caps = getResolvedModelCapabilities(id);
    assert.equal(caps.supportsVision, true, `getResolvedModelCapabilities(${id}).supportsVision`);
  });
}

// ── Negative guards: the text-only *-pro siblings must not over-match ──

const STILL_TEXT_ONLY = [
  "mimo-v2.5-pro",
  "opencode-go/mimo-v2.5-pro",
  "command-code/mimo-v2.5-pro",
  "mimo-v2-pro",
  "command-code/xiaomi/mimo-v2-pro",
  "mimo-v2-flash",
  "gemma-2-9b",
  // The narrowed v2.6 fragments must not hand the vision verdict to
  // undocumented siblings of the same generation (maintainer review, #14595).
  "mimo-v2.6-distill-qwen-9b",
  "opencode-go/mimo-v2.6-tts",
];

for (const id of STILL_TEXT_ONLY) {
  test(`#${id} stays non-vision (no false positive)`, () => {
    assert.equal(isVisionModelId(id), false, `isVisionModelId(${id})`);
  });
}

test("resolved capabilities keep the earlier-generation pro verdicts", () => {
  assert.notEqual(
    getResolvedModelCapabilities("opencode-go/mimo-v2.5-pro").supportsVision,
    true,
    "mimo-v2.5-pro is text-only per Xiaomi docs"
  );
  assert.notEqual(
    getResolvedModelCapabilities("command-code/xiaomi/mimo-v2-pro").supportsVision,
    true,
    "mimo-v2-pro is text-only per Xiaomi docs"
  );
  // And the multimodal base siblings from earlier generations are untouched.
  assert.equal(getResolvedModelCapabilities("opencode-go/mimo-v2.5").supportsVision, true);
  assert.equal(getResolvedModelCapabilities("mimo-v2-omni").supportsVision, true);
});
