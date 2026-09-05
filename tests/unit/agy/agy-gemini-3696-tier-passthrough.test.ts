/**
 * #3696 — the callable `gemini-3.1-pro-low` tier must reach Antigravity unchanged.
 * High now uses the distinct live id `gemini-pro-agent`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  ANTIGRAVITY_PUBLIC_MODELS,
  resolveAntigravityModelId,
} from "../../../open-sse/config/antigravityModelAliases.ts";

test("(#3696) resolveAntigravityModelId passes gemini-3.1-pro-low through unchanged", () => {
  assert.equal(resolveAntigravityModelId("gemini-3.1-pro-low"), "gemini-3.1-pro-low");
});

test("(#3696) non-tiered ANTIGRAVITY_PUBLIC_MODELS entries resolve to distinct upstream ids", () => {
  const seen = new Map<string, string>();
  const collisions: string[] = [];
  for (const model of ANTIGRAVITY_PUBLIC_MODELS) {
    // Gemini 3.7 Flash tiers intentionally share the upstream `gemini-3.7-flash-tiered`
    // endpoint with different reasoning token budgets.
    if (model.id.startsWith("gemini-3.7-flash")) continue;
    const upstream = resolveAntigravityModelId(model.id);
    if (seen.has(upstream)) {
      collisions.push(`${model.id} and ${seen.get(upstream)} both resolve to "${upstream}"`);
    } else {
      seen.set(upstream, model.id);
    }
  }
  assert.deepEqual(collisions, [], `upstream-id collisions: ${collisions.join("; ")}`);
});
