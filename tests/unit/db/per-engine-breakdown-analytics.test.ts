/**
 * TDD: per-engine breakdown persistence.
 *
 * A real stacked run records ONE compression_analytics row (engine = stats.engine ??
 * mode, e.g. "stacked") — so per-engine savings were previously lost. The
 * compression_engine_breakdown table stores one row per engine in the stacked
 * pipeline, and getPerEngineAnalytics aggregates breakdown + legacy single-engine
 * rows (deduped by request_id, no double counting).
 *
 * DB isolation mirrors tests/unit/db/per-engine-analytics.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ceb-analytics-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
core.resetDbInstance();

const { insertCompressionAnalyticsRow, insertCompressionEngineBreakdown, getPerEngineAnalytics } =
  await import("../../../src/lib/db/compressionAnalytics.ts");

function resetDb(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("per-engine breakdown from a stacked run is attributed to each engine", () => {
  const now = new Date().toISOString();

  // One aggregate row for the stacked request (engine column = mode, NOT per-engine).
  insertCompressionAnalyticsRow({
    timestamp: now,
    mode: "stacked",
    engine: "stacked",
    request_id: "req-stacked-1",
    original_tokens: 1000,
    compressed_tokens: 700,
    tokens_saved: 300,
  });

  // Per-engine breakdown for that same request: rtk (1000→800) then headroom (800→700).
  insertCompressionEngineBreakdown([
    {
      timestamp: now,
      request_id: "req-stacked-1",
      engine: "rtk",
      original_tokens: 1000,
      compressed_tokens: 800,
      tokens_saved: 200,
    },
    {
      timestamp: now,
      request_id: "req-stacked-1",
      engine: "headroom",
      original_tokens: 800,
      compressed_tokens: 700,
      tokens_saved: 100,
    },
  ]);

  const headroom = getPerEngineAnalytics("headroom");
  assert.equal(headroom.runs, 1, "headroom ran once (inside the stacked pipeline)");
  assert.equal(headroom.tokensSaved, 100, "headroom's own contribution");
  // avg = round(((800-700)/800)*1000)/10 = round(125)/10 = 12.5
  assert.equal(headroom.avgSavingsPercent, 12.5);

  const rtk = getPerEngineAnalytics("rtk");
  assert.equal(rtk.runs, 1);
  assert.equal(rtk.tokensSaved, 200);
});

test("legacy single-engine rows still count (no breakdown present)", () => {
  const now = new Date().toISOString();
  insertCompressionAnalyticsRow({
    timestamp: now,
    mode: "aggressive",
    engine: "aggressive",
    request_id: "req-single",
    original_tokens: 500,
    compressed_tokens: 400,
    tokens_saved: 100,
  });

  const aggressive = getPerEngineAnalytics("aggressive");
  assert.equal(aggressive.runs, 1, "single-engine run counted via the legacy engine column");
  assert.equal(aggressive.tokensSaved, 100);
});

test("breakdown + legacy combine for the same engine without double counting", () => {
  const now = new Date().toISOString();

  // Stacked run where headroom contributed 100 (recorded in breakdown).
  insertCompressionAnalyticsRow({
    timestamp: now,
    mode: "stacked",
    engine: "stacked",
    request_id: "req-A",
    original_tokens: 1000,
    compressed_tokens: 800,
    tokens_saved: 200,
  });
  insertCompressionEngineBreakdown([
    {
      timestamp: now,
      request_id: "req-A",
      engine: "headroom",
      original_tokens: 1000,
      compressed_tokens: 900,
      tokens_saved: 100,
    },
  ]);

  // Separate single-engine headroom run (no breakdown) contributed 50.
  insertCompressionAnalyticsRow({
    timestamp: now,
    mode: "headroom",
    engine: "headroom",
    request_id: "req-B",
    original_tokens: 200,
    compressed_tokens: 150,
    tokens_saved: 50,
  });

  const headroom = getPerEngineAnalytics("headroom");
  assert.equal(headroom.runs, 2, "one stacked contribution + one single-engine run");
  assert.equal(headroom.tokensSaved, 150, "100 (stacked) + 50 (single), counted once each");
});

test("a stacked run does NOT double-count the aggregate row under its breakdown engines", () => {
  const now = new Date().toISOString();
  insertCompressionAnalyticsRow({
    timestamp: now,
    mode: "stacked",
    engine: "stacked",
    request_id: "req-X",
    original_tokens: 1000,
    compressed_tokens: 700,
    tokens_saved: 300,
  });
  insertCompressionEngineBreakdown([
    {
      timestamp: now,
      request_id: "req-X",
      engine: "caveman",
      original_tokens: 1000,
      compressed_tokens: 700,
      tokens_saved: 300,
    },
  ]);

  // caveman gets exactly the breakdown contribution, not also the "stacked" aggregate.
  const caveman = getPerEngineAnalytics("caveman");
  assert.equal(caveman.runs, 1);
  assert.equal(caveman.tokensSaved, 300);
});
