/**
 * Regression test (audit 2026-09-12): the compression analytics writer must
 * opt into flatRateAsZero so flat-rate subscription lanes (minimax, glm, kimi,
 * bailian, xiaomi, web-cookie) never book a non-zero dollar "savings" estimate.
 * Cost rows on those lanes are for pre-flight estimates only — booking them as
 * compression savings invents money the operator never pays (audit §5.1).
 *
 * Mirrors the flat-rate convention established by tests/unit/flat-rate-cost-5552.test.ts
 * (upstream #5552) and the opt-in used by src/app/api/usage/analytics/route.ts.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tmpDir = mkdtempSync(join(tmpdir(), "omniroute-caw-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../../src/lib/db/core.ts");
core.resetDbInstance();
const { getDbInstance } = core;
const { writeCompressionAnalytics } =
  await import("../../../open-sse/handlers/chatCore/compressionAnalyticsWrite.ts");

function ensureTables() {
  const db = getDbInstance();
  db.exec(`
    CREATE TABLE IF NOT EXISTS compression_analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      combo_id TEXT,
      provider TEXT,
      mode TEXT NOT NULL,
      original_tokens INTEGER NOT NULL,
      compressed_tokens INTEGER NOT NULL,
      tokens_saved INTEGER NOT NULL,
      duration_ms INTEGER,
      request_id TEXT,
      estimated_usd_saved REAL
    )
  `);
  // costCalculator reads provider pricing through the layered pricing settings;
  // an empty pricing namespace forces the defaults layer, which has non-zero
  // rates for minimax — exactly the condition under which the bug books money.
  db.exec(`
    CREATE TABLE IF NOT EXISTS key_value (
      namespace TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT,
      PRIMARY KEY (namespace, key)
    )
  `);
}

function lastRow() {
  const db = getDbInstance();
  return db
    .prepare(
      "SELECT provider, tokens_saved, estimated_usd_saved FROM compression_analytics ORDER BY id DESC LIMIT 1"
    )
    .get() as { provider: string; tokens_saved: number; estimated_usd_saved: number | null };
}

function makeStats(originalTokens: number, compressedTokens: number) {
  // Minimal CompressionStats shape used by the writer: originalTokens,
  // compressedTokens, durationMs, rtkRawOutputPointers.
  return {
    originalTokens,
    compressedTokens,
    durationMs: 123,
    rtkRawOutputPointers: [] as Array<{ id?: string | null; bytes?: number | null }>,
    engine: "rtk",
  } as never;
}

test("writeCompressionAnalytics books $0 savings for flat-rate providers (minimax)", async () => {
  ensureTables();
  getDbInstance().exec("DELETE FROM compression_analytics");

  await writeCompressionAnalytics({
    stats: makeStats(10_000, 2_000),
    provider: "minimax",
    effectiveModel: "MiniMax-M3",
    effectiveServiceTier: undefined,
    comboName: null,
    mode: "chat",
    compressionComboId: null,
    skillRequestId: "req-flat-rate-test",
    cavemanOutputModeApplied: false,
    cavemanOutputModeIntensity: null,
    log: null,
  });

  const row = lastRow();
  assert.ok(row, "a compression_analytics row should have been written");
  assert.equal(row.provider, "minimax");
  assert.equal(row.tokens_saved, 8_000);
  // THE assertion: flat-rate lanes must not invent dollar savings.
  assert.ok(
    row.estimated_usd_saved === null || row.estimated_usd_saved === 0,
    `expected null/0 estimated_usd_saved for flat-rate provider, got ${row.estimated_usd_saved}`
  );
});

test("writeCompressionAnalytics still books real savings for metered providers (openai)", async () => {
  ensureTables();
  getDbInstance().exec("DELETE FROM compression_analytics");

  await writeCompressionAnalytics({
    stats: makeStats(10_000, 2_000),
    provider: "openai",
    effectiveModel: "gpt-5.5",
    effectiveServiceTier: undefined,
    comboName: null,
    mode: "chat",
    compressionComboId: null,
    skillRequestId: "req-metered-test",
    cavemanOutputModeApplied: false,
    cavemanOutputModeIntensity: null,
    log: null,
  });

  const row = lastRow();
  assert.ok(row, "a compression_analytics row should have been written");
  assert.equal(row.provider, "openai");
  assert.equal(row.tokens_saved, 8_000);
  // Metered providers keep a non-zero estimate (real per-token money avoided).
  assert.ok(
    row.estimated_usd_saved !== null && row.estimated_usd_saved > 0,
    `expected positive estimated_usd_saved for metered provider, got ${row.estimated_usd_saved}`
  );
});
