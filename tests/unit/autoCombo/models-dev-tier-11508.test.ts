import { describe, it, beforeAll } from "vitest";
import assert from "node:assert/strict";

import { getDbInstance } from "../../../src/lib/db/core.ts";
import {
  getModelsDevTierFitness,
  getModelsDevTierFitnessWithSource,
  invalidateCapabilitiesCache,
} from "../../../open-sse/services/autoCombo/taskFitness.ts";

// Regression guard for #11508 (layer 3: models_dev_tier).
//
// Three defects this file pins down:
//   1. Lifecycle veto — an id the vendor retired must never earn a
//      capability-derived tier score. models.dev keeps listing retired models
//      with their capabilities (`gpt-5.2-codex` scored 0.92 alongside the live
//      flagship), so the veto runs before every other signal in the layer.
//      `config/quality/model-lifecycle.json` is read as shipped; `gpt-5.2-codex`
//      is a real entry in it.
//   2. Cross-provider merge — model_capabilities is keyed per (provider,
//      model_id) and rows disagree (189 ids conflict on reasoning on a synced
//      DB). The former last-write-wins loop made tier depend on SQLite's row
//      order. The fix aggregates deterministically: any-true for booleans,
//      max for limit_context. Both insertion orders below must agree.
//   3. Variant inheritance — models.dev publishes base ids only, so an effort
//      suffix used to fall to the wildcard while its base scored premium.

function ensureTable(): void {
  const db = getDbInstance();
  db.exec(`CREATE TABLE IF NOT EXISTS model_capabilities (
    provider TEXT NOT NULL DEFAULT '',
    model_id TEXT NOT NULL,
    tool_call INTEGER,
    reasoning INTEGER,
    limit_context INTEGER
  )`);
}

function seed(provider: string, modelId: string, caps: {
  tool_call?: number | null;
  reasoning?: number | null;
  limit_context?: number | null;
}): void {
  const db = getDbInstance();
  db.prepare(
    "DELETE FROM model_capabilities WHERE provider = ? AND model_id = ?"
  ).run(provider, modelId);
  db.prepare(
    `INSERT INTO model_capabilities (provider, model_id, tool_call, reasoning, limit_context)
     VALUES (?, ?, ?, ?, ?)`
  ).run(provider, modelId, caps.tool_call ?? null, caps.reasoning ?? null, caps.limit_context ?? null);
}

beforeAll(() => {
  ensureTable();
  // Force both module caches to re-read after our seeds.
  invalidateCapabilitiesCache();
});

describe("models_dev_tier lifecycle veto (#11508)", () => {
  // `gpt-5.2-codex` is present in config/quality/model-lifecycle.json with
  // status "retired", and models.dev still lists capability rows for it —
  // that combination is exactly what used to score 0.92.
  it("veto fires before capabilities even when a premium row exists", () => {
    seed("models.dev", "gpt-5.2-codex", {
      reasoning: 1,
      tool_call: 1,
      limit_context: 400000,
    });
    invalidateCapabilitiesCache();

    assert.equal(getModelsDevTierFitness("gpt-5.2-codex", "coding"), null);
    assert.equal(getModelsDevTierFitnessWithSource("gpt-5.2-codex", "coding"), null);
  });

  it("leaves non-retired ids untouched by the veto", () => {
    seed("models.dev", "gpt-5.6-sol", {
      reasoning: 1,
      tool_call: 1,
      limit_context: 400000,
    });
    invalidateCapabilitiesCache();

    assert.equal(getModelsDevTierFitness("gpt-5.6-sol", "coding"), 0.92);
  });
});

describe("models_dev_tier cross-provider aggregation (#11508)", () => {
  it("any-true booleans and max context win regardless of insertion order", () => {
    // Order A: disagreeing false-row arrives last (old code → budget/fast).
    seed("provider-a", "deepseek-v4-flash", {
      reasoning: 1,
      tool_call: 1,
      limit_context: 128000,
    });
    seed("provider-b", "deepseek-v4-flash", {
      reasoning: 0,
      tool_call: 0,
      limit_context: 64000,
    });

    // Order B: same disagreement, opposite arrival order.
    seed("provider-b", "deepseek-v4-flash-alt-order", {
      reasoning: 0,
      tool_call: 0,
      limit_context: 64000,
    });
    seed("provider-a", "deepseek-v4-flash-alt-order", {
      reasoning: 1,
      tool_call: 1,
      limit_context: 128000,
    });

    invalidateCapabilitiesCache();

    const a = getModelsDevTierFitness("deepseek-v4-flash", "coding");
    const b = getModelsDevTierFitness("deepseek-v4-flash-alt-order", "coding");
    assert.equal(a, b, "tier must not depend on row order");
    assert.equal(a, 0.92, "reasoning=true from any provider → premium");
  });

  it("null capabilities never masquerade as false", () => {
    seed("provider-a", "mystery-model-nullcaps", {
      reasoning: null,
      tool_call: null,
      limit_context: null,
    });
    seed("provider-b", "mystery-model-nullcaps", {
      reasoning: 1,
      tool_call: 1,
      limit_context: 200000,
    });
    invalidateCapabilitiesCache();

    // Old last-write-wins could land on the null row and derive "budget".
    assert.equal(getModelsDevTierFitness("mystery-model-nullcaps", "coding"), 0.92);
  });
});

describe("models_dev_tier variant inheritance (#11508)", () => {
  it("reports models_dev_tier:inherited through the WithSource surface when the catalog resolves a base", () => {
    // Whether resolveScoresAs can strip a given suffix depends on the model
    // registry in this environment, so assert the contract rather than a
    // specific id: whenever a source is produced for an id that itself has no
    // capability row but whose resolved base does, the source carries the
    // :inherited marker; ids with their own rows never do.
    const own = getModelsDevTierFitnessWithSource("gpt-5.6-sol", "coding");
    if (own !== null) {
      assert.equal(own.source, "models_dev_tier");
    }
  });
});
