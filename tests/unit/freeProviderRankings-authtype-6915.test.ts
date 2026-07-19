/**
 * Unit tests for #6915 — Sort/filter Free Provider Rankings by auth Type.
 *
 * Targets the PURE helpers `filterRankingsByAuthType` + `sortRankingsAuthTypeFirst`
 * (no DB, no I/O) so the new filter/sort logic is exercised in isolation, mirroring
 * `tests/unit/freeProviderRankings-filters.test.ts`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  filterRankingsByAuthType,
  sortRankingsAuthTypeFirst,
  type FreeProviderRanking,
  type ProviderAuthType,
} from "../../src/lib/freeProviderRankings.ts";

function ranking(id: string, category: ProviderAuthType, score: number): FreeProviderRanking {
  return {
    id,
    name: id,
    icon: "",
    color: "#000",
    category,
    topModel: null,
    averageScore: score,
    modelCount: 1,
  };
}

// ──────────────── filterRankingsByAuthType ────────────────

test("filterRankingsByAuthType: 'noauth' keeps only NOAUTH rows", () => {
  const rows = [
    ranking("a", "noauth", 0.9),
    ranking("b", "oauth", 0.8),
    ranking("c", "apikey", 0.7),
    ranking("d", "noauth", 0.6),
  ];
  const result = filterRankingsByAuthType(rows, "noauth");
  assert.deepEqual(
    result.map((r) => r.id),
    ["a", "d"]
  );
});

test("filterRankingsByAuthType: 'oauth' keeps only OAUTH rows", () => {
  const rows = [ranking("a", "noauth", 0.9), ranking("b", "oauth", 0.8)];
  const result = filterRankingsByAuthType(rows, "oauth");
  assert.deepEqual(
    result.map((r) => r.id),
    ["b"]
  );
});

test("filterRankingsByAuthType: 'apikey' keeps only APIKEY rows", () => {
  const rows = [ranking("a", "apikey", 0.9), ranking("b", "oauth", 0.8)];
  const result = filterRankingsByAuthType(rows, "apikey");
  assert.deepEqual(
    result.map((r) => r.id),
    ["a"]
  );
});

test("filterRankingsByAuthType: empty-string type returns input unchanged (identity — 'All')", () => {
  const rows = [ranking("a", "noauth", 0.9), ranking("b", "oauth", 0.8)];
  const result = filterRankingsByAuthType(rows, "");
  assert.equal(result, rows);
});

test("filterRankingsByAuthType: undefined type returns input unchanged (identity — 'All')", () => {
  const rows = [ranking("a", "noauth", 0.9), ranking("b", "oauth", 0.8)];
  const result = filterRankingsByAuthType(rows);
  assert.equal(result, rows);
});

// ──────────────── sortRankingsAuthTypeFirst ────────────────

test("sortRankingsAuthTypeFirst: groups NOAUTH < OAUTH < APIKEY", () => {
  const rows = [
    ranking("apikey-1", "apikey", 0.95),
    ranking("oauth-1", "oauth", 0.9),
    ranking("noauth-1", "noauth", 0.5),
  ];
  const result = sortRankingsAuthTypeFirst(rows);
  assert.deepEqual(
    result.map((r) => r.category),
    ["noauth", "oauth", "apikey"]
  );
});

test("sortRankingsAuthTypeFirst: preserves relative (score) order within each group (stable-sort proof)", () => {
  // Input already sorted by score across mixed types (simulating computeFreeProviderRankings output).
  const rows = [
    ranking("apikey-best", "apikey", 0.95),
    ranking("oauth-best", "oauth", 0.9),
    ranking("noauth-best", "noauth", 0.85),
    ranking("apikey-worst", "apikey", 0.8),
    ranking("oauth-worst", "oauth", 0.6),
    ranking("noauth-worst", "noauth", 0.4),
  ];
  const result = sortRankingsAuthTypeFirst(rows);
  assert.deepEqual(
    result.map((r) => r.id),
    ["noauth-best", "noauth-worst", "oauth-best", "oauth-worst", "apikey-best", "apikey-worst"]
  );
});

test("sortRankingsAuthTypeFirst: does not mutate the input array", () => {
  const rows = [ranking("apikey-1", "apikey", 0.95), ranking("noauth-1", "noauth", 0.5)];
  const original = [...rows];
  sortRankingsAuthTypeFirst(rows);
  assert.deepEqual(rows, original);
});

test("sortRankingsAuthTypeFirst: empty input returns empty output", () => {
  assert.deepEqual(sortRankingsAuthTypeFirst([]), []);
});
