import test from "node:test";
import assert from "node:assert/strict";

import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";

test("T12: pricing table includes MiniMax, GLM, Kimi and gpt-5.4 mini entries", () => {
  const pricing = getDefaultPricing();

  assert.ok(pricing.cx["gpt-5.4"], "missing cx/gpt-5.4");
  assert.ok(pricing.cx["gpt-5.4-mini"], "missing cx/gpt-5.4-mini");

  assert.ok(pricing.minimax["minimax-m2.5"], "missing minimax/minimax-m2.5");
  assert.ok(pricing.minimax["minimax-m2.7"], "missing minimax/minimax-m2.7");
  assert.equal(pricing.minimax["minimax-m2.5"].input, 0.27);
  assert.equal(pricing.minimax["minimax-m2.5"].output, 0.95);

  assert.ok(pricing.glm["glm-4.7"], "missing glm/glm-4.7");
  assert.ok(pricing.glm["glm-5"], "missing glm/glm-5");
  assert.equal(pricing.glm["glm-4.7"].input, 0.6);
  assert.equal(pricing.glm["glm-4.7"].output, 2.2);

  assert.ok(pricing.kimi["kimi-k2.5"], "missing kimi/kimi-k2.5");
  assert.ok(pricing.kimi["kimi-k2.5-thinking"], "missing kimi/kimi-k2.5-thinking");
  assert.ok(pricing.kimi["kimi-for-coding"], "missing kimi/kimi-for-coding");
});

test("T12: minimax default model list starts with M2.7", () => {
  const minimaxModels = REGISTRY.minimax.models.map((m) => m.id);
  const minimaxCnModels = REGISTRY["minimax-cn"].models.map((m) => m.id);

  assert.equal(minimaxModels[0], "minimax-m2.7");
  assert.equal(minimaxCnModels[0], "minimax-m2.7");
});
