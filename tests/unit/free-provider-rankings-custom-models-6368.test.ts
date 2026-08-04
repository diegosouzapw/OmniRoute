/**
 * Regression test for #6368 (follow-up to #6150).
 *
 * Custom models a user adds to a provider (e.g. "Claude Fable 5" added on
 * top of the Puter provider) were invisible in the Free Provider Rankings
 * once the "Configured only" / "Available only" filters were applied,
 * because `getProviderModels()` only ever walked the static
 * `open-sse/config/providerRegistry.ts` catalog — a provider's user-added
 * custom models were never folded into the candidate model list that gets
 * matched against intelligence scores, so they could never appear in the
 * ranking regardless of the filters.
 *
 * This test proves:
 *  1. `mergeProviderModels` (pure) additively includes custom models and
 *     de-dupes against the registry list.
 *  2. `computeFreeProviderRankings()` end-to-end surfaces a provider whose
 *     *only* matching model is a user-added custom model, under BOTH
 *     `configuredOnly` and `availableOnly` filters.
 *  3. Existing catalog-model based free/paid... i.e. configured/available
 *     filtering still behaves as before (#6150 regression guard) — a
 *     provider with no connection is still dropped under `configuredOnly`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rankings-6368-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const intelligenceDb = await import("../../src/lib/db/modelIntelligence.ts");
const rankings = await import("../../src/lib/freeProviderRankings.ts");

const CUSTOM_MODEL_ID = "claude-fable-5-6368";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("mergeProviderModels: additively includes custom models, de-duping by id", () => {
  const registryModels = [{ id: "known-model", name: "Known Model" }];
  const customModels = [
    { id: "known-model", name: "Should not duplicate" },
    { id: "claude-fable-5-6368", name: "Claude Fable 5" },
  ];
  const merged = rankings.mergeProviderModels(registryModels, customModels);
  assert.deepEqual(
    merged.map((m) => m.id).sort(),
    ["claude-fable-5-6368", "known-model"]
  );
});

test("mergeProviderModels: no custom models returns the registry list unchanged", () => {
  const registryModels = [{ id: "known-model", name: "Known Model" }];
  assert.deepEqual(rankings.mergeProviderModels(registryModels, []), registryModels);
});

test("#6368: a provider whose only scored model is a user-added custom model appears under configuredOnly+availableOnly", async () => {
  // Give the custom model an arena_elo intelligence entry so it survives
  // the ranking builder's scoring step, same as any catalog model would.
  intelligenceDb.upsertModelIntelligence({
    model: CUSTOM_MODEL_ID,
    source: "arena_elo",
    category: "default",
    score: 0.91,
    eloRaw: 1400,
    confidence: "high",
    expiresAt: null,
  });

  await modelsDb.addCustomModel("puter", CUSTOM_MODEL_ID, "Claude Fable 5");

  await providersDb.createProviderConnection({
    provider: "puter",
    authType: "apikey",
    name: "puter-main-6368",
    apiKey: "test-token",
    isActive: true,
  });

  const unfiltered = await rankings.computeFreeProviderRankings(undefined, 100, {});
  const puterUnfiltered = unfiltered.find((r) => r.id === "puter");
  assert.ok(puterUnfiltered, "puter must appear in the unfiltered ranking");
  assert.ok(
    puterUnfiltered!.topModel?.modelId === CUSTOM_MODEL_ID ||
      unfiltered.some((r) => r.id === "puter" && r.modelCount >= 1),
    "puter ranking must reflect the custom model score"
  );

  const filtered = await rankings.computeFreeProviderRankings(undefined, 100, {
    configuredOnly: true,
    availableOnly: true,
  });
  const puterFiltered = filtered.find((r) => r.id === "puter");
  assert.ok(
    puterFiltered,
    "puter (configured + available, ranked only via its custom model) must survive configuredOnly+availableOnly filters"
  );
});

test("#6150 regression guard: a free provider with no connection is still dropped under configuredOnly", async () => {
  // "groq" is a no-auth free provider (always eligible, no connection needed
  // to exist as a *candidate*), but configuredOnly still requires an actual
  // connection row — assert the filter itself hasn't been loosened by the
  // #6368 custom-model change.
  const filtered = await rankings.computeFreeProviderRankings(undefined, 100, {
    configuredOnly: true,
  });
  const groq = filtered.find((r) => r.id === "groq");
  assert.equal(groq, undefined, "groq has no configured connection and must stay excluded");
});
