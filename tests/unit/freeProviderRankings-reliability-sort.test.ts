import assert from "node:assert/strict";
import test from "node:test";

import { sortRankingsByReliability } from "../../src/lib/freeProviderRankingsUsage.ts";
import type { FreeProviderRanking } from "../../src/lib/freeProviderRankings.ts";

function ranking(
  id: string,
  elo: number,
  successRate: number | null | undefined
): FreeProviderRanking {
  const base = {
    id,
    name: id,
    category: "apikey",
    topModel: { id: `${id}/model`, name: "M", score: elo },
    averageScore: elo,
    modelCount: 1,
  } as unknown as FreeProviderRanking;
  if (successRate === undefined) return base;
  return {
    ...base,
    reliability: {
      connections: [],
      state: "healthy",
      usage: {
        requests: 100,
        successes: successRate === null ? 0 : Math.round(successRate * 100),
        successRate,
        avgLatencyMs: null,
        lastRequestAt: null,
        windowHours: 24,
      },
    },
  } as unknown as FreeProviderRanking;
}

test("measured providers come before unmeasured ones", () => {
  const sorted = sortRankingsByReliability([
    ranking("no-traffic", 1400, undefined),
    ranking("measured", 1000, 0.9),
  ]);
  assert.deepEqual(
    sorted.map((r) => r.id),
    ["measured", "no-traffic"]
  );
});

test("measured providers are ordered by success rate, highest first", () => {
  const sorted = sortRankingsByReliability([
    ranking("mid", 1400, 0.5),
    ranking("best", 1000, 0.99),
    ranking("worst", 1500, 0.1),
  ]);
  assert.deepEqual(
    sorted.map((r) => r.id),
    ["best", "mid", "worst"]
  );
});

test("equal success rates fall back to the ELO order", () => {
  const sorted = sortRankingsByReliability([
    ranking("low-elo", 1000, 0.9),
    ranking("high-elo", 1500, 0.9),
  ]);
  assert.deepEqual(
    sorted.map((r) => r.id),
    ["high-elo", "low-elo"]
  );
});

test("a sample too small to state a rate counts as unmeasured, never as zero", () => {
  const sorted = sortRankingsByReliability([
    ranking("too-few", 1500, null),
    ranking("measured", 1000, 0.4),
  ]);
  assert.deepEqual(
    sorted.map((r) => r.id),
    ["measured", "too-few"]
  );
});

test("unmeasured providers keep their incoming order", () => {
  const sorted = sortRankingsByReliability([
    ranking("second", 1000, undefined),
    ranking("first", 1500, undefined),
  ]);
  assert.deepEqual(
    sorted.map((r) => r.id),
    ["second", "first"]
  );
});

test("the input array is not mutated", () => {
  const input = [ranking("a", 1000, undefined), ranking("b", 1500, 0.9)];
  const before = input.map((r) => r.id);
  sortRankingsByReliability(input);
  assert.deepEqual(
    input.map((r) => r.id),
    before
  );
});
