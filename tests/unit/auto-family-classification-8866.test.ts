/**
 * #8866 — `auto/<family>` must be recognized as a built-in auto model.
 *
 * classifyAutoModel() is module-private, so this exercises it through the public
 * resolveAutoRoutingState(). Before the fix, a family suffix failed parseAutoSuffix()
 * and fell through to `recognizedBuiltInAuto: false` with no spec, so `auto/glm` was
 * treated as an unknown model instead of a family-scoped auto combo.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { MODEL_FAMILIES } from "@omniroute/open-sse/services/autoCombo/modelFamily.ts";
import { resolveAutoRoutingState } from "../../src/sse/handlers/autoRouting.ts";

test("#8866: every model family is recognized as auto/<family>", async () => {
  assert.ok(MODEL_FAMILIES.length > 0, "expected a non-empty family list");
  for (const family of MODEL_FAMILIES) {
    const state = await resolveAutoRoutingState(`auto/${family}`);
    assert.equal(
      state.recognizedBuiltInAuto,
      true,
      `auto/${family} should be a recognized built-in auto model`
    );
    assert.equal(state.spec?.family, family, `auto/${family} should carry spec.family`);
    assert.equal(state.isAutoRouting, true);
  }
});

test("#8866: a family suffix does not hijack the category/tier spec", async () => {
  // A valid category/tier suffix keeps its own shape — the family branch is only a
  // fallback for suffixes parseAutoSuffix rejects.
  const state = await resolveAutoRoutingState("auto/coding");
  assert.equal(state.recognizedBuiltInAuto, true);
  assert.equal(state.spec?.family, undefined, "auto/coding is a category, not a family");
});

test("#8866: an unknown suffix stays unrecognized", async () => {
  const state = await resolveAutoRoutingState("auto/not-a-real-family-xyz");
  assert.equal(
    state.recognizedBuiltInAuto,
    false,
    "an unknown suffix must not be treated as a built-in auto model"
  );
  assert.equal(state.spec?.family, undefined);
});

test("#8866: a plain model is untouched by the family branch", async () => {
  const state = await resolveAutoRoutingState("gpt-5.6-sol");
  assert.equal(state.isAutoRouting, false);
  assert.equal(state.spec?.family, undefined);
});
