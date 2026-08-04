import assert from "node:assert/strict";
import test from "node:test";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

const LIVE_AGENTROUTER_MODEL_IDS = ["claude-opus-4-8", "claude-opus-5", "gpt-5.6-sol"];

test("AgentRouter registry fallback matches the authenticated live catalog", () => {
  const ids = getRegistryEntry("agentrouter")
    ?.models.map((model) => model.id)
    .sort();
  assert.deepEqual(ids, [...LIVE_AGENTROUTER_MODEL_IDS].sort());
});

test("AgentRouter free-model fallback exposes only currently routable model IDs", () => {
  const ids = FREE_MODEL_BUDGETS.filter((model) => model.provider === "agentrouter")
    .map((model) => model.modelId)
    .sort();
  assert.deepEqual(ids, [...LIVE_AGENTROUTER_MODEL_IDS].sort());
});
