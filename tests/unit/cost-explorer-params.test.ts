import test from "node:test";
import assert from "node:assert/strict";
import {
  parseApiKeyIds,
  parseCostRange,
  parseExplorerGroupBy,
} from "../../src/app/(dashboard)/dashboard/costs/costExplorerParams.ts";

// ─── parseCostRange ────────────────────────────────────────────────────────

test("parseCostRange accepts every valid range", () => {
  for (const r of ["7d", "30d", "90d", "180d", "365d", "all"]) {
    assert.equal(parseCostRange(r), r);
  }
});

test("parseCostRange accepts the extended 180d/365d periods (#7213)", () => {
  assert.equal(parseCostRange("180d"), "180d");
  assert.equal(parseCostRange("365d"), "365d");
});

test("parseCostRange falls back to 30d for null/invalid input", () => {
  assert.equal(parseCostRange(null), "30d");
  assert.equal(parseCostRange(""), "30d");
  assert.equal(parseCostRange("1y"), "30d");
  assert.equal(parseCostRange("ALL"), "30d"); // case-sensitive on purpose
  assert.equal(parseCostRange("30d; DROP TABLE"), "30d"); // untrusted URL param
});

// ─── parseExplorerGroupBy ──────────────────────────────────────────────────

test("parseExplorerGroupBy accepts every valid group", () => {
  for (const g of ["provider", "model", "apiKey", "account", "serviceTier"]) {
    assert.equal(parseExplorerGroupBy(g), g);
  }
});

test("parseExplorerGroupBy falls back to provider for null/invalid input", () => {
  assert.equal(parseExplorerGroupBy(null), "provider");
  assert.equal(parseExplorerGroupBy(""), "provider");
  assert.equal(parseExplorerGroupBy("apikey"), "provider"); // wrong casing
  assert.equal(parseExplorerGroupBy("__proto__"), "provider");
});

// ─── parseApiKeyIds ────────────────────────────────────────────────────────

test("parseApiKeyIds returns empty list for null/empty", () => {
  assert.deepEqual(parseApiKeyIds(null), []);
  assert.deepEqual(parseApiKeyIds(""), []);
  assert.deepEqual(parseApiKeyIds("   "), []);
  assert.deepEqual(parseApiKeyIds(",, ,"), []);
});

test("parseApiKeyIds splits, trims, and drops blanks", () => {
  assert.deepEqual(parseApiKeyIds("a, b ,c"), ["a", "b", "c"]);
  assert.deepEqual(parseApiKeyIds(" key-1 "), ["key-1"]);
});

test("parseApiKeyIds de-duplicates while preserving first-seen order", () => {
  assert.deepEqual(parseApiKeyIds("a,b,a,c,b"), ["a", "b", "c"]);
});
