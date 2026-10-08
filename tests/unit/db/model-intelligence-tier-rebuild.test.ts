/**
 * Unit tests for the models_dev_tier persistence added to
 * src/lib/db/modelIntelligence.ts (buildModelsDevTierEntries,
 * applyModelsDevTierRefresh, rebuildModelsDevTierIntelligence).
 *
 * Uses the project's own DB infrastructure (core.ts getDbInstance) with a
 * temp DATA_DIR. Follows the Node.js native test runner pattern used by
 * tests/unit/model-intelligence-db.test.ts.
 */

import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mi-tier-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const mi = await import("../../../src/lib/db/modelIntelligence.ts");
const modelsDevSync = await import("../../../src/lib/modelsDevSync.ts");
const taskFitness = await import("../../../open-sse/services/autoCombo/taskFitness.ts");

function resetStorage(): void {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR)) {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  } catch {
    /* EBUSY — ignore */
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  taskFitness.invalidateFitnessCache();
}

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Seed `model_capabilities` with one row per provider/model given. */
function seedCapabilities(
  rows: Array<{
    provider: string;
    modelId: string;
    toolCall?: boolean | null;
    reasoning?: boolean | null;
    limitContext?: number | null;
  }>
): void {
  modelsDevSync.ensureCapabilitiesTable();
  const db = core.getDbInstance();
  const insert = db.prepare(`
    INSERT INTO model_capabilities (
      provider, model_id, tool_call, reasoning, attachment, structured_output,
      temperature, modalities_input, modalities_output, knowledge_cutoff,
      release_date, last_updated, status, family, open_weights,
      limit_context, limit_input, limit_output, interleaved_field, last_synced
    ) VALUES (?, ?, ?, ?, NULL, NULL, NULL, '[]', '[]', NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, NULL, datetime('now'))
  `);
  for (const row of rows) {
    insert.run(
      row.provider,
      row.modelId,
      row.toolCall === undefined ? null : row.toolCall ? 1 : 0,
      row.reasoning === undefined ? null : row.reasoning ? 1 : 0,
      row.limitContext ?? null
    );
  }
}

describe("buildModelsDevTierEntries", () => {
  beforeEach(() => {
    resetStorage();
  });

  it("returns [] when model_capabilities is empty", () => {
    modelsDevSync.ensureCapabilitiesTable();
    const entries = mi.buildModelsDevTierEntries();
    assert.deepEqual(entries, []);
  });

  it("derives a premium-tier entry for every category when reasoning=true", () => {
    seedCapabilities([{ provider: "openai", modelId: "o3", reasoning: true, toolCall: true }]);

    const entries = mi.buildModelsDevTierEntries();
    const byCategory = Object.fromEntries(entries.map((e) => [e.category, e]));

    assert.strictEqual(entries.length, 7, "one row per task category");
    assert.strictEqual(byCategory.coding.score, 0.92);
    assert.strictEqual(byCategory.coding.source, "models_dev_tier");
    assert.strictEqual(byCategory.coding.eloRaw, null);
    assert.strictEqual(byCategory.coding.confidence, "high");
    assert.strictEqual(byCategory.coding.expiresAt, null);
    assert.strictEqual(byCategory.analysis.score, 0.95);
  });

  it("aggregation parity: matches taskFitness.ts live derivation for the same capabilities", () => {
    seedCapabilities([
      { provider: "openrouter", modelId: "glm-5.1", reasoning: true, toolCall: true },
      { provider: "together", modelId: "mixtral-8x22b", toolCall: true, limitContext: 65536 },
      { provider: "fireworks", modelId: "llama-3-8b", toolCall: false, reasoning: false },
    ]);

    const entries = mi.buildModelsDevTierEntries();
    const byModelCategory = new Map(entries.map((e) => [`${e.model}:${e.category}`, e.score]));

    for (const [model, category] of [
      ["glm-5.1", "coding"],
      ["mixtral-8x22b", "coding"],
      ["llama-3-8b", "default"],
    ] as const) {
      const live = taskFitness.getModelsDevTierFitnessWithSource(model, category);
      assert.ok(live, `live derivation should resolve for ${model}/${category}`);
      assert.strictEqual(
        byModelCategory.get(`${model}:${category}`),
        live.score,
        `persisted score for ${model}/${category} should match live derivation`
      );
    }
  });

  it("aggregates capability-maximal booleans and max limit_context across providers for the same model", () => {
    // Same model id under two providers: one asserts tool_call=false, the
    // other tool_call=true + a larger context. Capability-maximal rule says
    // true wins and the larger context wins (same rule as taskFitness.ts).
    seedCapabilities([
      { provider: "a", modelId: "shared-model", toolCall: false, limitContext: 8000 },
      { provider: "b", modelId: "shared-model", toolCall: true, limitContext: 200000 },
    ]);

    const entries = mi.buildModelsDevTierEntries();
    const coding = entries.find((e) => e.category === "coding");
    assert.ok(coding);
    // tool_call=true + context >= 128000 => "standard" tier => coding 0.85
    assert.strictEqual(coding.score, 0.85);
  });

  it("lifecycle veto: a vendor-retired model id is excluded from the derived set", () => {
    // chatgpt-4o-latest is marked status:"retired" in the real
    // config/quality/model-lifecycle.json fixture this module reads.
    seedCapabilities([
      { provider: "openai", modelId: "chatgpt-4o-latest", reasoning: true, toolCall: true },
      { provider: "openai", modelId: "gpt-4o", reasoning: false, toolCall: true, limitContext: 128000 },
    ]);

    const entries = mi.buildModelsDevTierEntries();
    const models = new Set(entries.map((e) => e.model));

    assert.ok(!models.has("chatgpt-4o-latest"), "retired model must not get a tier row");
    assert.ok(models.has("gpt-4o"), "non-retired model is still included");
  });
});

describe("applyModelsDevTierRefresh", () => {
  beforeEach(() => {
    resetStorage();
  });

  it("upserts all entries and reports zero pruned on first write", () => {
    const entries = mi.buildModelsDevTierEntries(
      Object.fromEntries([["model-a", { tool_call: true, reasoning: true, limit_context: 200000 }]])
    );
    const { upserted, pruned } = mi.applyModelsDevTierRefresh(entries);

    assert.strictEqual(upserted, 7);
    assert.strictEqual(pruned, 0);
    assert.strictEqual(mi.listModelIntelligence({ source: "models_dev_tier" }).length, 7);
  });

  it("prunes rows for (model, category) pairs no longer in the refreshed set", () => {
    const first = mi.buildModelsDevTierEntries(
      Object.fromEntries([
        ["model-a", { tool_call: true, reasoning: true, limit_context: 200000 }],
        ["model-b", { tool_call: true, reasoning: false, limit_context: 200000 }],
      ])
    );
    mi.applyModelsDevTierRefresh(first);
    assert.strictEqual(mi.listModelIntelligence({ source: "models_dev_tier" }).length, 14);

    // Second rebuild only derives model-a — model-b's rows must be pruned.
    const second = mi.buildModelsDevTierEntries(
      Object.fromEntries([["model-a", { tool_call: true, reasoning: true, limit_context: 200000 }]])
    );
    const { pruned } = mi.applyModelsDevTierRefresh(second);

    assert.strictEqual(pruned, 7, "all 7 model-b category rows should be pruned");
    const remaining = mi.listModelIntelligence({ source: "models_dev_tier" });
    assert.strictEqual(remaining.length, 7);
    assert.ok(remaining.every((e) => e.model === "model-a"));
  });

  it("does not touch rows from other sources", () => {
    mi.upsertModelIntelligence({
      model: "model-a",
      source: "arena_elo",
      category: "coding",
      score: 0.5,
      eloRaw: 1200,
      confidence: "medium",
      expiresAt: null,
    });

    mi.applyModelsDevTierRefresh([
      {
        model: "model-a",
        source: "models_dev_tier",
        category: "coding",
        score: 0.6,
        eloRaw: null,
        confidence: "low",
        expiresAt: null,
      },
    ]);

    const arenaEntry = mi.getModelIntelligenceBySource("model-a", "arena_elo", "coding");
    assert.ok(arenaEntry, "arena_elo row must survive a models_dev_tier refresh");
    assert.strictEqual(arenaEntry.score, 0.5);
  });
});

describe("rebuildModelsDevTierIntelligence", () => {
  beforeEach(() => {
    resetStorage();
  });

  it("no-op + prunes all existing tier rows when model_capabilities is empty", () => {
    mi.upsertModelIntelligence({
      model: "stale-model",
      source: "models_dev_tier",
      category: "coding",
      score: 0.5,
      eloRaw: null,
      confidence: "low",
      expiresAt: null,
    });
    modelsDevSync.ensureCapabilitiesTable();

    const result = mi.rebuildModelsDevTierIntelligence();

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.source, "models_dev_tier");
    assert.strictEqual(result.modelCount, 0);
    assert.strictEqual(result.pruned, 1);
    assert.strictEqual(mi.listModelIntelligence({ source: "models_dev_tier" }).length, 0);
  });

  it("reports modelCount as the number of distinct models, not rows", () => {
    seedCapabilities([
      { provider: "a", modelId: "model-x", toolCall: true, reasoning: true },
      { provider: "b", modelId: "model-y", toolCall: true, limitContext: 200000 },
    ]);

    const result = mi.rebuildModelsDevTierIntelligence();

    assert.strictEqual(result.modelCount, 2);
    assert.strictEqual(mi.listModelIntelligence({ source: "models_dev_tier" }).length, 14);
  });

  it("updates getLatestSyncedAt('models_dev_tier') after a successful rebuild", () => {
    seedCapabilities([{ provider: "a", modelId: "model-x", toolCall: true, reasoning: true }]);

    assert.strictEqual(mi.getLatestSyncedAt("models_dev_tier"), null);
    mi.rebuildModelsDevTierIntelligence();

    const latest = mi.getLatestSyncedAt("models_dev_tier");
    assert.ok(latest, "synced_at should be populated after rebuild");
    const ageMs = Date.now() - new Date(latest + "Z".replace(/Z?$/, latest.endsWith("Z") ? "" : "Z")).getTime();
    assert.ok(ageMs < 60_000, "rebuild timestamp should be within the last minute");
  });
});

describe("getIntelligenceSourcesHealth", () => {
  beforeEach(() => {
    resetStorage();
  });

  it("reports count:0 and lastSync:null for a source with no rows", () => {
    const health = mi.getIntelligenceSourcesHealth();
    assert.deepEqual(health.models_dev_tier, { count: 0, lastSync: null, oldestExpiresAt: null });
    assert.deepEqual(health.user_override, { count: 0, lastSync: null, oldestExpiresAt: null });
    assert.deepEqual(health.arena_elo, { count: 0, lastSync: null, oldestExpiresAt: null });
  });

  it("reports per-source counts and lastSync after writes to multiple sources", () => {
    seedCapabilities([{ provider: "a", modelId: "model-x", toolCall: true, reasoning: true }]);
    mi.rebuildModelsDevTierIntelligence();
    mi.setUserFitnessOverrideEntry("gpt-4o", "coding", 0.9);
    mi.upsertModelIntelligence({
      model: "claude",
      source: "arena_elo",
      category: "coding",
      score: 0.8,
      eloRaw: 1300,
      confidence: "high",
      expiresAt: "2099-12-31T23:59:59Z",
    });

    const health = mi.getIntelligenceSourcesHealth();
    assert.strictEqual(health.models_dev_tier.count, 7);
    assert.ok(health.models_dev_tier.lastSync);
    assert.strictEqual(health.user_override.count, 1);
    assert.strictEqual(health.arena_elo.count, 1);
    assert.strictEqual(health.arena_elo.oldestExpiresAt, "2099-12-31T23:59:59Z");
  });
});
