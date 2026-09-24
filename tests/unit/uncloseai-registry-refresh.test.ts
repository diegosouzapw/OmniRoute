import test from "node:test";
import assert from "node:assert/strict";

import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";

/**
 * 2026-09-15: uncloseai (hermes.ai.unturf.com) rotated its roster — /v1/models
 * went down to a single live model and every previously catalogued id started
 * returning 404 "model does not exist" on /v1/chat/completions, so requests
 * routed through the static seed failed while the provider itself was healthy
 * (a real completion against the live id succeeds). The seed is only the
 * offline fallback (live discovery via NAMED_OPENAI_STYLE_PROVIDERS), but the
 * dashboard serves it whenever discovery has not run, so the stale ids must
 * not survive in the registry or the free-model catalog.
 */
const LIVE_MODEL = "Lorbus/Qwen3.6-27B-int4-AutoRound";
const DEAD_MODELS = [
  "adamo1139/Hermes-3-Llama-3.1-8B-FP8-Dynamic",
  "qwen3.6:27b",
  "gemma4:31b",
] as const;

test("uncloseai registry seed contains the live upstream model, not the retired ids", () => {
  const entry = getRegistryEntry("uncloseai");
  assert.ok(entry, "uncloseai must stay registered");

  const ids = (entry.models ?? []).map((m) => m.id);
  assert.ok(ids.includes(LIVE_MODEL), `registry seed must list ${LIVE_MODEL}`);
  for (const dead of DEAD_MODELS) {
    assert.equal(ids.includes(dead), false, `retired id ${dead} must not be seeded`);
  }

  const live = entry.models?.find((m) => m.id === LIVE_MODEL);
  assert.equal(live?.contextLength, 65536, "live max_model_len must be declared");
});

test("uncloseai registry keeps the live discovery contract", () => {
  const entry = getRegistryEntry("uncloseai");
  assert.equal(entry?.modelsUrl, "https://hermes.ai.unturf.com/v1/models");
  assert.equal(entry?.passthroughModels, undefined, "uncloseai is not a passthrough provider");
});

test("free-model catalog carries exactly the live uncloseai row", () => {
  const rows = FREE_MODEL_BUDGETS.filter((row) => row.provider === "uncloseai");
  assert.equal(rows.length, 1, "catalog must have a single uncloseai row");
  assert.equal(rows[0].modelId, LIVE_MODEL);
  assert.equal(rows[0].freeType, "keyless");
  assert.equal(rows[0].monthlyTokens, 0);

  for (const dead of DEAD_MODELS) {
    const stillListed = FREE_MODEL_BUDGETS.some(
      (row) => row.provider === "uncloseai" && row.modelId === dead
    );
    assert.equal(stillListed, false, `retired id ${dead} must not remain in the free catalog`);
  }
});
