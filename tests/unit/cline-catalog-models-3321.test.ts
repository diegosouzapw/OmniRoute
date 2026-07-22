import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

// #3321 — Cline maps its model catalog through OpenRouter (`modelsProviderId:
// "openrouter"`) and OmniRoute's Cline provider forwards any id (passthroughModels).
// The free OpenRouter-served models reporters asked for were missing from the
// static catalog, so they never showed in the model picker. Verify the verified
// additions are present with their 1M context windows.
test("#3321: Cline catalog exposes the verified OpenRouter free additions", () => {
  const models = getModelsByProviderId("cline");
  const byId = new Map(models.map((m) => [m.id, m]));

  const minimax = byId.get("minimax/minimax-m3");
  assert.ok(minimax, "cline must expose minimax/minimax-m3");
  assert.equal(minimax.contextLength, 1048576);

  // Upstream OpenRouter id carries the `:free` variant suffix (confirmed against the
  // real OpenRouter free lineup) — 1M context, not 1048576.
  const nemotron = byId.get("nvidia/nemotron-3-ultra-550b-a55b:free");
  assert.ok(nemotron, "cline must expose nvidia/nemotron-3-ultra-550b-a55b:free");
  assert.equal(nemotron.contextLength, 1000000);
});
