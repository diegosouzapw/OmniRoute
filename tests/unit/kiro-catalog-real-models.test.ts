import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "@omniroute/open-sse/config/providers/index.ts";
import { FREE_MODEL_BUDGETS } from "@omniroute/open-sse/config/freeModelCatalog.data.ts";

// Kiro's upstream (`generateAssistantResponse`) returns 400 "Invalid model.
// Please select a different model" for any model id it does not recognize. The
// registry must therefore expose ONLY ids Kiro actually serves. These ids were
// fabricated (copied from OmniRoute's own Anthropic catalog) and live-verified
// to 400 on the VPS — they must never reappear. Regression guard for the kiro
// cluster (#6112/#6113/#6099).
const FABRICATED_KIRO_IDS = [
  "auto-kiro", // no "auto" model id on Kiro — was sent verbatim and 400'd
  "claude-fable-5", // Kiro offers no Fable
  "claude-opus-4.8", // Kiro offers no Opus
  "claude-opus-4.7",
  "claude-opus-4.6",
  "claude-sonnet-4.6", // Kiro's Sonnet is 4.5, not 4.6
];

// Ids proven to return 200 on the VPS (or a real, plan-gated Kiro model).
const REAL_KIRO_IDS = [
  "claude-sonnet-5", // real model, plan-gated per account (kept)
  "claude-sonnet-4.5", // proven 200 (replaces the fabricated 4.6)
  "claude-haiku-4.5", // proven 200
  "deepseek-3.2", // proven 200
  "glm-5", // proven 200
  "minimax-m2.5", // proven 200
  "minimax-m2.1", // proven 200
  "qwen3-coder-next", // proven 200
];

test("kiro registry exposes no fabricated model ids", () => {
  const ids = new Set((REGISTRY.kiro?.models || []).map((m) => m.id));
  for (const bad of FABRICATED_KIRO_IDS) {
    assert.ok(!ids.has(bad), `kiro registry must not expose fabricated id "${bad}"`);
  }
});

test("kiro registry exposes exactly the real Kiro model ids", () => {
  const ids = (REGISTRY.kiro?.models || []).map((m) => m.id).sort();
  assert.deepEqual(ids, [...REAL_KIRO_IDS].sort());
});

test("kiro free-model catalog carries no fabricated ids", () => {
  const kiroCatalogIds = new Set(
    FREE_MODEL_BUDGETS.filter((e) => e.provider === "kiro").map((e) => e.modelId)
  );
  for (const bad of FABRICATED_KIRO_IDS) {
    assert.ok(!kiroCatalogIds.has(bad), `free catalog must not list fabricated kiro id "${bad}"`);
  }
  // Every kiro free-catalog entry must exist in the registry (no orphans).
  const registryIds = new Set((REGISTRY.kiro?.models || []).map((m) => m.id));
  for (const id of kiroCatalogIds) {
    assert.ok(registryIds.has(id), `free catalog kiro id "${id}" is not in the registry`);
  }
});
