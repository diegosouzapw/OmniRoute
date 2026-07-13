import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "@omniroute/open-sse/config/providers/index.ts";
import { FREE_MODEL_BUDGETS } from "@omniroute/open-sse/config/freeModelCatalog.data.ts";

const CURATED_KIRO_FALLBACK_IDS = [
  "claude-opus-4.8",
  "claude-opus-4.7",
  "claude-opus-4.6",
  "claude-sonnet-5",
  "claude-sonnet-4.6",
  "claude-haiku-4.5",
  "deepseek-3.2",
  "glm-5",
  "minimax-m2.5",
  "minimax-m2.1",
  "qwen3-coder-next",
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
];

test("kiro registry preserves the curated fallback model order", () => {
  const ids = (REGISTRY.kiro?.models || []).map((m) => m.id);
  assert.deepEqual(ids, CURATED_KIRO_FALLBACK_IDS);
});

test("kiro free-model catalog carries only upstream model ids", () => {
  const kiroCatalogIds = new Set(
    FREE_MODEL_BUDGETS.filter((e) => e.provider === "kiro").map((e) => e.modelId)
  );

  for (const id of kiroCatalogIds) {
    assert.equal(id.endsWith("-thinking"), false, `free catalog must not synthesize "${id}"`);
    assert.equal(id.endsWith("-agentic"), false, `free catalog must not synthesize "${id}"`);
  }
});
