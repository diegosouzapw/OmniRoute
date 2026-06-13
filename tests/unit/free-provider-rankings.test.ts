import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression coverage for the free-provider-rankings feature (#3799), which shipped
// without tests. The matching helpers are pure; computeFreeProviderRankings needs a DB
// (model_intelligence) so we point DATA_DIR at a throwaway SQLite file.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-rankings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const { stripVersionSuffix, findMatchingIntelligence, computeFreeProviderRankings } =
  await import("../../src/lib/freeProviderRankings.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

test("stripVersionSuffix strips only the trailing version numbers", () => {
  assert.equal(stripVersionSuffix("kimi-k2.6"), "kimi-k2");
  assert.equal(stripVersionSuffix("gpt-5.5"), "gpt-5");
  assert.equal(stripVersionSuffix("claude-opus-4.8.1"), "claude-opus-4");
  assert.equal(stripVersionSuffix("gpt-5"), "gpt-5"); // no version suffix → unchanged
  assert.equal(stripVersionSuffix("llama-3-70b"), "llama-3-70b"); // digits not a trailing .N
});

test("findMatchingIntelligence prefers exact, then version-stripped, then prefix", () => {
  const intelMap = new Map([
    ["gpt-5", [{ score: 90, eloRaw: 1400, confidence: "high", category: "default" }]],
    ["kimi-k2", [{ score: 80, eloRaw: 1300, confidence: "mid", category: "default" }]],
  ]);

  // Strategy 1: exact match.
  assert.equal(findMatchingIntelligence("gpt-5", intelMap)?.score, 90);
  // Strategy 2: "kimi-k2.6" → stripped "kimi-k2".
  assert.equal(findMatchingIntelligence("kimi-k2.6", intelMap)?.score, 80);
  // Strategy 3: prefix — "gpt-5-turbo" starts with "gpt-5-".
  assert.equal(findMatchingIntelligence("gpt-5-turbo", intelMap)?.score, 90);
  // No match anywhere.
  assert.equal(findMatchingIntelligence("mistral-large", intelMap), null);
});

test("findMatchingIntelligence picks the highest-scoring entry on a tie key", () => {
  const intelMap = new Map([
    [
      "gpt-5",
      [
        { score: 70, eloRaw: 1200, confidence: "low", category: "default" },
        { score: 95, eloRaw: 1450, confidence: "high", category: "default" },
      ],
    ],
  ]);
  assert.equal(findMatchingIntelligence("gpt-5", intelMap)?.score, 95);
});

test("computeFreeProviderRankings returns an array and respects the limit", () => {
  const all = computeFreeProviderRankings();
  assert.ok(Array.isArray(all), "expected an array of rankings");

  const limited = computeFreeProviderRankings(undefined, 2);
  assert.ok(limited.length <= 2, `expected at most 2 rankings, got ${limited.length}`);

  for (const ranking of limited) {
    assert.equal(typeof ranking.id, "string");
    assert.ok(["noauth", "oauth", "apikey"].includes(ranking.category));
  }
});
