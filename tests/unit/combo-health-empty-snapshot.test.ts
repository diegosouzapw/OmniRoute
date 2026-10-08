// tests/unit/combo-health-empty-snapshot.test.ts — pattern db-quota-snapshots.test.ts:7-26 :
// isolation DB réelle, zéro mock (mock.module indisponible sous tsx/ESM ; sans polyfill+isolateDataDir,
// DATA_DIR tombe sur ~/.omniroute réel → flaky).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-combo-health-null-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const { buildProviderHealth, buildQuotaHealth } =
  await import("../../src/lib/usage/comboHealth.ts");

async function resetStorage() {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const SNAP = {
  provider: "openrouter",
  connection_id: "conn-1",
  window_key: "hourly",
  is_exhausted: 0,
  next_reset_at: "2026-01-01T01:00:00.000Z",
  window_duration_ms: 3600000,
  raw_data: "{}",
} as const;

test("empty snapshots read null, not 0%, and stay non-exhausted", () => {
  const h = buildProviderHealth("openrouter", []);
  assert.equal(h.remainingPct, null);
  assert.equal(h.isExhausted, false);
  assert.equal(h.trend, "stable");
});

test("all-null percentages read null (B3)", () => {
  quotaSnapshotsDb.saveQuotaSnapshot({ ...SNAP, remaining_percentage: null });
  quotaSnapshotsDb.saveQuotaSnapshot({ ...SNAP, remaining_percentage: null });
  const q = buildQuotaHealth(["openrouter"], "1970-01-01T00:00:00.000Z");
  assert.equal(q.providers[0].remainingPct, null);
  assert.equal(q.worstRemainingPct, null);
});

test("worstRemainingPct ignores nulls, null when all null", () => {
  quotaSnapshotsDb.saveQuotaSnapshot({ ...SNAP, remaining_percentage: null });
  quotaSnapshotsDb.saveQuotaSnapshot({ ...SNAP, remaining_percentage: 42.346 });
  const q = buildQuotaHealth(["openrouter"], "1970-01-01T00:00:00.000Z");
  assert.equal(q.worstRemainingPct, 42.35);
});
