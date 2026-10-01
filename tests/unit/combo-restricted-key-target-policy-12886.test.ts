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

test("blockedModels still filters combo targets in all-access mode", async () => {
  let called = 0;
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: {
      modelAccessMode: "all",
      allowedModels: [],
      blockedModels: ["deepseek/*"],
    },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: async () => {
      called += 1;
      return false;
    },
  });
  assert.equal(ok, false);
  assert.equal(called, 0);
});

test("blockedModels takes precedence without disabling allowed combo targets", async () => {
  const apiKeyInfo = {
    modelAccessMode: "restricted",
    allowedModels: [COMBO],
    blockedModels: ["anthropic/*"],
  };
  const checker = allowListChecker([COMBO]);

  const allowed = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo,
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: checker,
  });
  const blocked = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo,
    requestedModelStr: COMBO,
    targetModelStr: OTHER,
    isModelAllowedForKey: checker,
  });

  assert.equal(allowed, true);
  assert.equal(blocked, false);
});

test("allowedCombos admits that combo's inner targets even when allowedModels is restricted to other models", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: {
      modelAccessMode: "restricted",
      allowedCombos: [COMBO],
      allowedModels: ["gemini/*"],
    },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: allowListChecker(["gemini/*"]),
  });
  assert.equal(
    ok,
    true,
    "inner target must not be skipped when combo is in allowedCombos, even if allowedModels restricts direct models"
  );
});

test("allowedCombos with prefix combo/ admits inner targets", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: {
      modelAccessMode: "restricted",
      allowedCombos: [`combo/${COMBO}`],
      allowedModels: ["gemini/*"],
    },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: allowListChecker(["gemini/*"]),
  });
  assert.equal(ok, true, "prefixed combo rule in allowedCombos must admit inner targets");
});

test("disallowed combo falls back to allowedModels filtering", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: {
      modelAccessMode: "restricted",
      allowedCombos: ["other-combo"],
      allowedModels: ["gemini/*"],
    },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: allowListChecker(["gemini/*"]),
  });
  assert.equal(
    ok,
    false,
    "combo not in allowedCombos must fall back to allowedModels and be blocked"
  );
});

test("auto/* combo still enforces per-candidate allowedModels even if auto/* is in allowedCombos", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: {
      modelAccessMode: "restricted",
      allowedCombos: ["auto/best"],
      allowedModels: ["gemini/*"],
    },
    requestedModelStr: "auto/best",
    targetModelStr: "openai/gpt-4o",
    isModelAllowedForKey: allowListChecker(["gemini/*"]),
  });
  assert.equal(ok, false, "auto combo candidate not in allowedModels must stay blocked per #9057");
});

test("explicit allowedCombos overrides blockedModels for inner targets", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: {
      modelAccessMode: "restricted",
      allowedCombos: [COMBO],
      allowedModels: ["gemini/*"],
      blockedModels: ["deepseek/*"],
    },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: allowListChecker(["gemini/*"]),
  });
  assert.equal(ok, true, "an explicitly allowed combo must admit its blocked direct-model target");
});

test("combo/* overrides blockedModels for every stored combo", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: {
      modelAccessMode: "restricted",
      allowedCombos: ["combo/*"],
      allowedModels: ["gemini/*"],
      blockedModels: ["deepseek/*"],
    },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: allowListChecker(["gemini/*"]),
  });
  assert.equal(ok, true, "combo/* must admit inner targets for every stored combo");
});

test("a combo without allowedCombos permission remains blocked by blockedModels", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: {
      modelAccessMode: "restricted",
      allowedCombos: ["other-combo"],
      allowedModels: ["gemini/*"],
      blockedModels: ["deepseek/*"],
    },
    requestedModelStr: COMBO,
    targetModelStr: INNER,
    isModelAllowedForKey: allowListChecker(["gemini/*"]),
  });
  assert.equal(ok, false, "blockedModels must still apply without explicit combo permission");
});

test("auto/* combo keeps blockedModels enforcement even when auto/* is allowed", async () => {
  const ok = await comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo: {
      modelAccessMode: "restricted",
      allowedCombos: ["auto/best"],
      allowedModels: ["gemini/*"],
      blockedModels: ["openai/*"],
    },
    requestedModelStr: "auto/best",
    targetModelStr: "openai/gpt-4o",
    isModelAllowedForKey: allowListChecker(["gemini/*"]),
  });
  assert.equal(ok, false, "auto/* must retain blockedModels enforcement");
});
