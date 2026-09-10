/**
 * #12886 — restricted API key whose allowedModels is the combo name must not
 * skip every combo target at pre-dispatch (#9057 per-target check).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { comboTargetPassesKeyModelPolicy } from "../../src/sse/handlers/chat/comboTargetKeyPolicy.ts";

const KEY = "sk-test-12886";
const COMBO = "combo-deepseek-v4-flash";
const INNER = "deepseek/deepseek-v4-flash";
const OTHER = "anthropic/claude-sonnet-5";

function allowListChecker(patterns: string[]) {
  return async (_key: string, model: string) =>
    patterns.some((pattern) => {
      if (pattern.endsWith("/*")) return model.startsWith(pattern.slice(0, -1));
      return pattern === model;
    });
}

test("#12886: combo-name-only allow-list admits that combo's inner targets", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: { modelAccessMode: "restricted", allowedModels: [COMBO] },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: allowListChecker([COMBO]),
  });
  assert.equal(ok, true, "inner target must not be skipped when the combo name is allowed");
});

test("#12886: provider-prefix allow-list still filters inner targets", async () => {
  const checker = allowListChecker(["deepseek/*"]);
  const deepseekOk = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: { modelAccessMode: "restricted", allowedModels: ["deepseek/*"] },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: checker,
  });
  const otherOk = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: { modelAccessMode: "restricted", allowedModels: ["deepseek/*"] },
    requestedModelStr: COMBO,
    targetModelStr: OTHER,
    isModelAllowedForKey: checker,
  });
  assert.equal(deepseekOk, true);
  assert.equal(otherOk, false, "non-matching inner target stays blocked");
});

test("#9057: disableNonPublicModels still rejects a keyless inner target", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: { disableNonPublicModels: true },
    requestedModelStr: "auto/best",
    targetModelStr: "big-pickle",
    isModelAllowedForKey: async () => false,
  });
  assert.equal(ok, false);
});

test("#12886: unrestricted key skips the gate", async () => {
  let called = 0;
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: { modelAccessMode: "all", allowedModels: [] },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: async () => {
      called += 1;
      return false;
    },
  });
  assert.equal(ok, true);
  assert.equal(called, 0);
});
