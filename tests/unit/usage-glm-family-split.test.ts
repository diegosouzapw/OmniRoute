// Characterization of the services/usage.ts GLM-family split (god-file decomposition): the GLM (Zhipu)
// usage family — token/window quota naming, ordering, monthly-remaining math, getGlmUsage fetcher —
// moved into services/usage/glm.ts. Behavior-preserving move; the locks pin the module surface, the
// monthly-remaining math, and that usage.ts re-exports glmMonthlyRemainingPercentage (the
// glm-coding-plan-monthly test imports it from services/usage).
import { test } from "node:test";
import assert from "node:assert/strict";

const G = await import("../../open-sse/services/usage/glm.ts");
const HOST = await import("../../open-sse/services/usage.ts");

test("leaf exposes getGlmUsage + glmMonthlyRemainingPercentage", () => {
  assert.equal(typeof (G as Record<string, unknown>).getGlmUsage, "function");
  assert.equal(typeof (G as Record<string, unknown>).glmMonthlyRemainingPercentage, "function");
});

test("host re-exports glmMonthlyRemainingPercentage with the same identity", () => {
  assert.equal(
    (HOST as Record<string, unknown>).glmMonthlyRemainingPercentage,
    (G as Record<string, unknown>).glmMonthlyRemainingPercentage
  );
});

test("glmMonthlyRemainingPercentage clamps to 0..100", () => {
  assert.equal(G.glmMonthlyRemainingPercentage(0, 100), 100);
  assert.equal(G.glmMonthlyRemainingPercentage(1000, 500), 50);
  assert.equal(G.glmMonthlyRemainingPercentage(1000, 1000), 100);
  assert.equal(G.glmMonthlyRemainingPercentage(1000, 0), 0);
  assert.equal(G.glmMonthlyRemainingPercentage(0, -5), 0);
});
