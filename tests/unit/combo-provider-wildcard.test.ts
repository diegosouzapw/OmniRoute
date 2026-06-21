/**
 * Unit tests for provider-wildcard combo expansion (#2562).
 *
 * Tests cover:
 *  - Detection of wildcard notation in combo models
 *  - Expansion against static providerRegistry models
 *  - Expansion against synced DB models (mocked)
 *  - Glob pattern filtering (`prefix*`)
 *  - Preservation of step metadata (weight, label, connectionId, allowedConnectionIds)
 *  - Graceful no-op when no models found (keeps original entry)
 *  - Non-wildcard entries pass through unchanged
 *  - Object-form `{ kind: "provider-wildcard", ... }` syntax
 *  - Collection-level expansion
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-wildcard-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// ── Imports ─────────────────────────────────────────────────────────────────

const {
  isProviderWildcardEntry,
  expandProviderWildcardsInCombo,
  expandProviderWildcardsInCollection,
} = await import("../../open-sse/services/combo/providerWildcard.ts");

const { replaceSyncedAvailableModelsForConnection, getSyncedAvailableModels } =
  await import("../../src/lib/db/models.ts");

const core = await import("../../src/lib/db/core.ts");
core.getDbInstance(); // initialise DB + run migrations

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeCombo(models: unknown[], name = "test-combo") {
  return { name, models, id: "test-id" };
}

// Seed synced models for a provider into the DB.
async function seedSyncedModels(providerId: string, connectionId: string, modelIds: string[]) {
  await replaceSyncedAvailableModelsForConnection(
    providerId,
    connectionId,
    modelIds.map((id) => ({ id, name: id, source: "imported" as const }))
  );
}

// ── isProviderWildcardEntry ───────────────────────────────────────────────────

test("isProviderWildcardEntry: detects string wildcard `provider/*`", () => {
  assert.equal(isProviderWildcardEntry("fta/*"), true);
  assert.equal(isProviderWildcardEntry("openai/*"), true);
  assert.equal(isProviderWildcardEntry("opc/deepseek*"), true);
  assert.equal(isProviderWildcardEntry("openai/gpt-4*"), true);
});

test("isProviderWildcardEntry: rejects plain model strings", () => {
  assert.equal(isProviderWildcardEntry("fta/some-model"), false);
  assert.equal(isProviderWildcardEntry("openai/gpt-4o"), false);
  assert.equal(isProviderWildcardEntry("openai"), false);
  assert.equal(isProviderWildcardEntry(""), false);
  assert.equal(isProviderWildcardEntry(null), false);
  assert.equal(isProviderWildcardEntry(42), false);
});

test("isProviderWildcardEntry: detects object form `{ kind: 'provider-wildcard' }`", () => {
  assert.equal(
    isProviderWildcardEntry({ kind: "provider-wildcard", providerId: "fta", modelPattern: "*" }),
    true
  );
});

test("isProviderWildcardEntry: rejects object without kind=provider-wildcard", () => {
  assert.equal(isProviderWildcardEntry({ kind: "model", model: "fta/some-model" }), false);
  assert.equal(isProviderWildcardEntry({ kind: "provider-wildcard" }), false); // missing providerId
});

// ── expandProviderWildcardsInCombo — static registry ─────────────────────────

test("expandProviderWildcardsInCombo: expands `openai/*` against static registry", async () => {
  // `openai` is a built-in provider with models in providerRegistry
  const combo = makeCombo(["openai/*"]);
  const result = await expandProviderWildcardsInCombo(combo);

  // Should have expanded to at least 1 model
  assert.ok(result.models.length > 0, "should have expanded to ≥1 model");

  // Every expanded entry should be a model step object with `kind: "model"`
  for (const entry of result.models) {
    assert.equal(typeof entry, "object");
    assert.equal((entry as any).kind, "model");
    assert.ok(
      typeof (entry as any).model === "string" && (entry as any).model.startsWith("openai/"),
      `model should start with openai/, got: ${(entry as any).model}`
    );
  }
});

test("expandProviderWildcardsInCombo: `_expandedFromWildcard` tag is set on expanded entries", async () => {
  const combo = makeCombo(["openai/*"]);
  const result = await expandProviderWildcardsInCombo(combo);
  for (const entry of result.models) {
    assert.equal((entry as any)._expandedFromWildcard, "openai/*");
  }
});

// ── expandProviderWildcardsInCombo — synced DB models ────────────────────────

test("expandProviderWildcardsInCombo: expands against synced DB models", async () => {
  const providerId = "test-custom-provider-" + Date.now();
  await seedSyncedModels(providerId, "conn-1", ["model-alpha", "model-beta", "model-gamma"]);

  const combo = makeCombo([`${providerId}/*`]);
  const result = await expandProviderWildcardsInCombo(combo);

  assert.equal(result.models.length, 3);
  const modelStrs = result.models.map((e) => (e as any).model);
  assert.ok(modelStrs.includes(`${providerId}/model-alpha`));
  assert.ok(modelStrs.includes(`${providerId}/model-beta`));
  assert.ok(modelStrs.includes(`${providerId}/model-gamma`));
});

test("expandProviderWildcardsInCombo: glob prefix filter `provider/pre*`", async () => {
  const providerId = "test-prefix-provider-" + Date.now();
  await seedSyncedModels(providerId, "conn-1", [
    "deepseek-v4-pro",
    "deepseek-v4-flash",
    "qwen3-free",
    "minimax-m3",
  ]);

  const combo = makeCombo([`${providerId}/deepseek*`]);
  const result = await expandProviderWildcardsInCombo(combo);

  assert.equal(result.models.length, 2);
  const ids = result.models.map((e) => (e as any).model);
  assert.ok(ids.includes(`${providerId}/deepseek-v4-pro`));
  assert.ok(ids.includes(`${providerId}/deepseek-v4-flash`));
  assert.ok(!ids.includes(`${providerId}/qwen3-free`));
  assert.ok(!ids.includes(`${providerId}/minimax-m3`));
});

// ── Step metadata preservation ────────────────────────────────────────────────

test("expandProviderWildcardsInCombo: weight is inherited on expanded entries", async () => {
  const providerId = "test-weight-provider-" + Date.now();
  await seedSyncedModels(providerId, "conn-1", ["model-a", "model-b"]);

  const combo = makeCombo([
    { kind: "provider-wildcard", providerId, modelPattern: "*", weight: 50, label: "fast" },
  ]);
  const result = await expandProviderWildcardsInCombo(combo);

  for (const entry of result.models) {
    assert.equal((entry as any).weight, 50, "weight should be inherited");
    assert.equal((entry as any).label, "fast", "label should be inherited");
  }
});

test("expandProviderWildcardsInCombo: connectionId is inherited on expanded entries", async () => {
  const providerId = "test-conn-provider-" + Date.now();
  await seedSyncedModels(providerId, "conn-42", ["model-x"]);

  const combo = makeCombo([
    { kind: "provider-wildcard", providerId, modelPattern: "*", connectionId: "conn-42" },
  ]);
  const result = await expandProviderWildcardsInCombo(combo);

  assert.equal(result.models.length, 1);
  assert.equal((result.models[0] as any).connectionId, "conn-42");
});

test("expandProviderWildcardsInCombo: allowedConnectionIds is inherited", async () => {
  const providerId = "test-acl-provider-" + Date.now();
  await seedSyncedModels(providerId, "conn-a", ["model-m"]);

  const combo = makeCombo([
    {
      kind: "provider-wildcard",
      providerId,
      modelPattern: "*",
      allowedConnectionIds: ["conn-a", "conn-b"],
    },
  ]);
  const result = await expandProviderWildcardsInCombo(combo);

  assert.equal(result.models.length, 1);
  assert.deepEqual((result.models[0] as any).allowedConnectionIds, ["conn-a", "conn-b"]);
});

// ── Non-wildcard pass-through ─────────────────────────────────────────────────

test("expandProviderWildcardsInCombo: non-wildcard string entries pass through unchanged", async () => {
  const combo = makeCombo(["anthropic/claude-opus-4", "openai/gpt-4o"]);
  const result = await expandProviderWildcardsInCombo(combo);

  assert.equal(result.models.length, 2);
  assert.equal(result.models[0], "anthropic/claude-opus-4");
  assert.equal(result.models[1], "openai/gpt-4o");
});

test("expandProviderWildcardsInCombo: mixed combo — wildcards expand, explicit entries preserved", async () => {
  const providerId = "test-mixed-provider-" + Date.now();
  await seedSyncedModels(providerId, "conn-1", ["model-1", "model-2"]);

  const combo = makeCombo(["anthropic/claude-opus-4", `${providerId}/*`, "openai/gpt-4o"]);
  const result = await expandProviderWildcardsInCombo(combo);

  // anthropic/claude-opus-4, model-1, model-2, openai/gpt-4o
  assert.equal(result.models.length, 4);
  assert.equal(result.models[0], "anthropic/claude-opus-4");
  assert.equal((result.models[1] as any).model, `${providerId}/model-1`);
  assert.equal((result.models[2] as any).model, `${providerId}/model-2`);
  assert.equal(result.models[3], "openai/gpt-4o");
});

// ── No models found — graceful fallback ──────────────────────────────────────

test("expandProviderWildcardsInCombo: keeps original entry when no models found for provider", async () => {
  const combo = makeCombo(["nonexistent-provider-xyz/*"]);
  const result = await expandProviderWildcardsInCombo(combo);

  // Should not silently drop the step
  assert.equal(result.models.length, 1);
  assert.equal(result.models[0], "nonexistent-provider-xyz/*");
});

test("expandProviderWildcardsInCombo: keeps original entry when pattern matches nothing", async () => {
  const providerId = "test-nomatch-provider-" + Date.now();
  await seedSyncedModels(providerId, "conn-1", ["some-model"]);

  const combo = makeCombo([`${providerId}/zzzz*`]);
  const result = await expandProviderWildcardsInCombo(combo);

  // Pattern matches nothing — original entry preserved
  assert.equal(result.models.length, 1);
});

// ── Collection expansion ──────────────────────────────────────────────────────

test("expandProviderWildcardsInCollection: expands wildcards in every combo in the collection", async () => {
  const p1 = "test-col-p1-" + Date.now();
  const p2 = "test-col-p2-" + Date.now();
  await seedSyncedModels(p1, "c1", ["m1", "m2"]);
  await seedSyncedModels(p2, "c2", ["m3"]);

  const combos = [
    makeCombo([`${p1}/*`], "combo-a"),
    makeCombo([`${p2}/*`, "openai/gpt-4o"], "combo-b"),
    makeCombo(["anthropic/claude-opus-4"], "combo-c"), // no wildcard
  ];

  const results = await expandProviderWildcardsInCollection(combos);

  assert.equal(results[0].models.length, 2); // m1, m2
  assert.equal(results[1].models.length, 2); // m3, gpt-4o
  assert.equal(results[2].models.length, 1); // unchanged
  assert.equal(results[2].models[0], "anthropic/claude-opus-4");
});

// ── Return identity when no wildcards ────────────────────────────────────────

test("expandProviderWildcardsInCombo: returns same object when no wildcards", async () => {
  const combo = makeCombo(["openai/gpt-4o"]);
  const result = await expandProviderWildcardsInCombo(combo);
  // Same reference — no allocation when nothing to expand
  assert.strictEqual(result, combo);
});

test("expandProviderWildcardsInCombo: returns same object for empty models array", async () => {
  const combo = makeCombo([]);
  const result = await expandProviderWildcardsInCombo(combo);
  assert.strictEqual(result, combo);
});

// ── Multi-provider wildcard combo ─────────────────────────────────────────────
// Validates the primary use-case from issue #2562:
// a single combo that spans multiple providers, each expressed as a wildcard.
// e.g.  freetheai/* + deepseek-web/* (or any other provider)
// The expanded model list is the ordered union of all providers' model catalogs.

test("expandProviderWildcardsInCombo: two provider wildcards expand independently and maintain order", async () => {
  const p1 = "test-multi-p1-" + Date.now();
  const p2 = "test-multi-p2-" + Date.now();
  await seedSyncedModels(p1, "conn-1", ["fast-model", "smart-model"]);
  await seedSyncedModels(p2, "conn-2", ["web-search-model", "reasoning-model"]);

  // Simulate: freetheai/* + deepseek-web/*
  const combo = makeCombo([`${p1}/*`, `${p2}/*`]);
  const result = await expandProviderWildcardsInCombo(combo);

  // Should have all 4 models, p1 first then p2 (insertion order preserved)
  assert.equal(result.models.length, 4);
  const models = result.models.map((e) => (e as any).model);
  assert.ok(
    models.indexOf(`${p1}/fast-model`) < models.indexOf(`${p2}/web-search-model`),
    "p1 models should come before p2 models"
  );
  assert.ok(models.includes(`${p1}/fast-model`));
  assert.ok(models.includes(`${p1}/smart-model`));
  assert.ok(models.includes(`${p2}/web-search-model`));
  assert.ok(models.includes(`${p2}/reasoning-model`));
});

test("expandProviderWildcardsInCombo: two providers with prefix filters", async () => {
  const p1 = "test-prefix-p1-" + Date.now();
  const p2 = "test-prefix-p2-" + Date.now();
  await seedSyncedModels(p1, "conn-1", ["free-fast", "free-smart", "paid-pro"]);
  await seedSyncedModels(p2, "conn-2", ["web-basic", "web-turbo", "local-model"]);

  // Only free models from p1, only web models from p2
  const combo = makeCombo([`${p1}/free*`, `${p2}/web*`]);
  const result = await expandProviderWildcardsInCombo(combo);

  assert.equal(result.models.length, 4); // free-fast, free-smart, web-basic, web-turbo
  const models = result.models.map((e) => (e as any).model);
  assert.ok(models.includes(`${p1}/free-fast`));
  assert.ok(models.includes(`${p1}/free-smart`));
  assert.ok(!models.includes(`${p1}/paid-pro`)); // filtered out
  assert.ok(models.includes(`${p2}/web-basic`));
  assert.ok(models.includes(`${p2}/web-turbo`));
  assert.ok(!models.includes(`${p2}/local-model`)); // filtered out
});

test("expandProviderWildcardsInCombo: three providers mixed with explicit entries", async () => {
  const p1 = "test-three-p1-" + Date.now();
  const p2 = "test-three-p2-" + Date.now();
  await seedSyncedModels(p1, "conn-1", ["m-a", "m-b"]);
  await seedSyncedModels(p2, "conn-2", ["m-c"]);

  // anchor explicit entry first, then two wildcards, then another explicit
  const combo = makeCombo(["anthropic/claude-opus-4", `${p1}/*`, `${p2}/*`, "openai/gpt-4o"]);
  const result = await expandProviderWildcardsInCombo(combo);

  // anthropic + 2 (p1) + 1 (p2) + openai = 5
  assert.equal(result.models.length, 5);
  assert.equal(result.models[0], "anthropic/claude-opus-4");
  assert.equal((result.models[1] as any).model, `${p1}/m-a`);
  assert.equal((result.models[2] as any).model, `${p1}/m-b`);
  assert.equal((result.models[3] as any).model, `${p2}/m-c`);
  assert.equal(result.models[4], "openai/gpt-4o");
});
