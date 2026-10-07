/**
 * Ranking follows the documented free-model catalog.
 *
 * `computeFreeProviderRankings()` must agree with `providerHasFreeModels()`:
 * providers whose only claim to a free tier is the static `hasFree` flag but
 * which have no documented free model stay out of the ranking, while catalog
 * providers with `hasFree: false` stay in. Provider ids and model ids come
 * from the production readers (constants + registry), never hand-written.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rankings-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const intelligenceDb = await import("../../src/lib/db/modelIntelligence.ts");
const rankings = await import("../../src/lib/freeProviderRankings.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { providerHasFreeModels } = await import("../../src/shared/utils/freeModels.ts");

function registryModelIds(providerId: string): string[] {
  const entry = REGISTRY[providerId] as { models?: Array<{ id?: string }> } | undefined;
  return (entry?.models ?? [])
    .map((m) => m.id)
    .filter((id): id is string => typeof id === "string");
}

function seedScores(modelIds: string[]): void {
  for (const model of modelIds) {
    intelligenceDb.upsertModelIntelligence({
      model,
      source: "arena_elo",
      category: "default",
      score: 0.85,
      eloRaw: 1300,
      confidence: "high",
      expiresAt: null,
    });
  }
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("ranking excludes providers with a raw free flag but no documented free model", async () => {
  const outside = ["sarvam", "modal", "openference"];
  for (const id of outside) {
    assert.equal(providerHasFreeModels(id), false, `${id} must be outside the free catalog`);
  }
  for (const id of outside) {
    seedScores(registryModelIds(id));
  }

  const ranking = await rankings.computeFreeProviderRankings(undefined, 200, {});
  const ids = new Set(ranking.map((r) => r.id));
  for (const id of outside) {
    assert.ok(!ids.has(id), `${id} must stay out of the free ranking`);
  }
});

test("ranking keeps catalog providers whose static free flag is off", async () => {
  const cataloged = ["predibase", "publicai"];
  for (const id of cataloged) {
    assert.equal(providerHasFreeModels(id), true, `${id} must be in the free catalog`);
  }
  for (const id of cataloged) {
    seedScores(registryModelIds(id));
  }

  const ranking = await rankings.computeFreeProviderRankings(undefined, 200, {});
  const ids = new Set(ranking.map((r) => r.id));
  for (const id of cataloged) {
    assert.ok(ids.has(id), `${id} must appear in the free ranking`);
  }
});

test("ranking still lists always-free providers from the free catalog", async () => {
  const id = "aihorde";
  assert.equal(providerHasFreeModels(id), true, `${id} must be in the free catalog`);
  seedScores(registryModelIds(id));

  const ranking = await rankings.computeFreeProviderRankings(undefined, 200, {});
  assert.ok(
    ranking.some((r) => r.id === id),
    `${id} must appear in the free ranking`
  );
});
