/**
 * #3696 — antigravity/agy gemini-3.1-pro-high / gemini-3.1-pro-low were being collapsed
 * to the bare upstream id `gemini-3.1-pro`, losing the tier distinction.
 *
 * Wire evidence (captured by maintainer via `agy --model gemini-3.1-pro-high --log-file`):
 *   - `gemini-3.1-pro-high` sent literally to `/v1internal:streamGenerateContent` → 200 OK
 *   - `gemini-3.1-pro-low`  sent literally → 200 OK
 *
 * CONCLUSION: the upstream ACCEPTS the suffixed ids directly. The old assumption in #3229
 * ("upstream rejects the suffix for gemini-3.x") was refuted by this wire capture.
 * The collapse aliases must be removed so the tier-specific ids reach the upstream.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  ANTIGRAVITY_PUBLIC_MODELS,
  resolveAntigravityModelId,
} from "../../open-sse/config/antigravityModelAliases.ts";

test("(#3696) resolveAntigravityModelId passes gemini-3.1-pro-high through unchanged", () => {
  assert.equal(resolveAntigravityModelId("gemini-3.1-pro-high"), "gemini-3.1-pro-high");
});

test("(#3696) resolveAntigravityModelId passes gemini-3.1-pro-low through unchanged", () => {
  assert.equal(resolveAntigravityModelId("gemini-3.1-pro-low"), "gemini-3.1-pro-low");
});

test("(#3696) no two ANTIGRAVITY_PUBLIC_MODELS entries resolve to the same upstream id", () => {
  const seen = new Map<string, string>();
  const collisions: string[] = [];
  for (const model of ANTIGRAVITY_PUBLIC_MODELS) {
    const upstream = resolveAntigravityModelId(model.id);
    if (seen.has(upstream)) {
      collisions.push(`${model.id} and ${seen.get(upstream)} both resolve to "${upstream}"`);
    } else {
      seen.set(upstream, model.id);
    }
  }
  assert.deepEqual(collisions, [], `upstream-id collisions: ${collisions.join("; ")}`);
});
