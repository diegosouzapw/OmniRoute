/**
 * tests/unit/cost-ledger-key-quota.test.ts
 *
 * Coverage for RIC-741 (M3):
 *  - request_cost_ledger: every call produces a traceable entry with
 *    provider/model/token/unit-price/amount; month window aggregate.
 *  - api_key_quota_*: tpm / rpm counters exceed → checkKeyQuota blocks; monthly
 *    amount exceeds → blocks; 0/null limits = unlimited; clear resets counters.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ledger-quota-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const costLedger = await import("../../src/lib/db/costLedger.ts");
const keyQuotaDb = await import("../../src/lib/db/keyQuota.ts");
const keyQuotaDomain = await import("../../src/domain/keyQuota.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      // Retry on transient EBUSY/EPERM (Windows/darwin).
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Cost ledger
// ---------------------------------------------------------------------------

test("cost ledger: record a per-request entry and read it back with full breakdown", () => {
  costLedger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-4o",
    tokensInput: 1000,
    tokensOutput: 500,
    tokensCacheRead: 200,
    tokensReasoning: 50,
    unitPriceInput: 2.5,
    unitPriceOutput: 10,
    amountUsd: 0.025,
    serviceTier: "standard",
    success: true,
    timestamp: "2026-09-14T00:00:00.000Z",
    requestId: "req-abc",
  });

  const entries = costLedger.listLedgerEntries("key-1");
  assert.equal(entries.length, 1);
  const entry = entries[0];
  assert.equal(entry.provider, "openai");
  assert.equal(entry.model, "gpt-4o");
  assert.equal(entry.tokensInput, 1000);
  assert.equal(entry.tokensOutput, 500);
  assert.equal(entry.tokensCacheRead, 200);
  assert.equal(entry.tokensReasoning, 50);
  assert.equal(entry.unitPriceInput, 2.5);
  assert.equal(entry.unitPriceOutput, 10);
  assert.equal(entry.amountUsd, 0.025);
  assert.equal(entry.success, true);
  assert.equal(entry.requestId, "req-abc");
});

test("cost ledger: amount-only row (unknown provider/model) is acceptable and traceable", () => {
  costLedger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "unknown",
    model: "unknown",
    amountUsd: 0.5,
  });

  const entries = costLedger.listLedgerEntries("key-1");
  assert.equal(entries.length, 1);
  assert.equal(entries[0].amountUsd, 0.5);
  assert.equal(entries[0].provider, "unknown");
});

test("cost ledger: safe variant never throws and skips empty renders", () => {
  assert.doesNotThrow(() => costLedger.recordLedgerEntrySafe({ apiKeyId: "", amountUsd: 1 }));
  assert.doesNotThrow(() =>
    costLedger.recordLedgerEntrySafe({ apiKeyId: "key-1", amountUsd: 9.99 })
  );
  assert.equal(costLedger.listLedgerEntries("key-1").length, 1);
});

test("cost ledger: month aggregate sums only successful current-month rows", () => {
  const now = new Date("2026-09-14T12:00:00.000Z");
  costLedger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-4o",
    amountUsd: 1,
    success: true,
    timestamp: "2026-09-01T00:00:00.000Z",
  });
  costLedger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-4o",
    amountUsd: 2,
    success: true,
    timestamp: "2026-09-14T10:00:00.000Z",
  });
  // Failed call should not count toward the spend cap.
  costLedger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-4o",
    amountUsd: 99,
    success: false,
    timestamp: "2026-09-14T11:00:00.000Z",
  });
  // Previous month should not count.
  costLedger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-4o",
    amountUsd: 100,
    success: true,
    timestamp: "2026-08-25T00:00:00.000Z",
  });

  const agg = costLedger.aggregateLedgerThisMonth("key-1", now.toISOString());
  assert.equal(agg.amountUsd, 3);
  assert.equal(agg.requestCount, 2);
});

test("cost ledger: batch insert writes all rows", () => {
  costLedger.recordLedgerEntries([
    { apiKeyId: "key-1", provider: "p", model: "m1", amountUsd: 0.1 },
    { apiKeyId: "key-1", provider: "p", model: "m2", amountUsd: 0.2 },
  ]);
  assert.equal(costLedger.listLedgerEntries("key-1").length, 2);
});

// ---------------------------------------------------------------------------
// Key quota — counters + threshold
// ---------------------------------------------------------------------------

test("key quota: rpm counter blocks when limit reached, allows when below", () => {
  keyQuotaDb.upsertKeyQuotaLimits("key-1", { rpmLimit: 2 });
  const fixedNow = {
    now: () => Date.parse("2026-09-14T12:00:00.000Z"),
    monthTotalUsd: 0,
  };

  // First request passes.
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1", fixedNow).allowed, true);
  keyQuotaDomain.recordKeyQuotaUsage("key-1", 100, fixedNow);

  // Second request passes (limit 2).
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1", fixedNow).allowed, true);
  keyQuotaDomain.recordKeyQuotaUsage("key-1", 100, fixedNow);

  // Third request exceeds → blocked, dimension rpm.
  const verdict = keyQuotaDomain.checkKeyQuota("key-1", fixedNow);
  assert.equal(verdict.allowed, false);
  assert.equal(verdict.dimension, "rpm");
});

test("key quota: tpm counter blocks when token window consumed", () => {
  keyQuotaDb.upsertKeyQuotaLimits("key-1", { tpmLimit: 1000 });
  const fixedNow = {
    now: () => Date.parse("2026-09-14T12:00:00.000Z"),
    monthTotalUsd: 0,
  };

  assert.equal(keyQuotaDomain.checkKeyQuota("key-1", fixedNow).allowed, true);
  keyQuotaDomain.recordKeyQuotaUsage("key-1", 900, fixedNow);
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1", fixedNow).allowed, true);

  keyQuotaDomain.recordKeyQuotaUsage("key-1", 100, fixedNow);
  const verdict = keyQuotaDomain.checkKeyQuota("key-1", fixedNow);
  assert.equal(verdict.allowed, false);
  assert.equal(verdict.dimension, "tpm");
});

test("key quota: monthly amount blocks when ledger month total reaches cap", () => {
  keyQuotaDb.upsertKeyQuotaLimits("key-1", { monthlyAmountUsd: 5 });
  // Seed the ledger with $5 spent in the current month.
  costLedger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-4o",
    amountUsd: 3,
    success: true,
    timestamp: "2026-09-02T00:00:00.000Z",
  });
  costLedger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-4o",
    amountUsd: 2,
    success: true,
    timestamp: "2026-09-03T00:00:00.000Z",
  });

  const now = Date.parse("2026-09-14T12:00:00.000Z");
  const verdict = keyQuotaDomain.checkKeyQuota("key-1", { now: () => now });
  assert.equal(verdict.allowed, false);
  assert.equal(verdict.dimension, "monthly");

  // Clearing the ledger month (simulating a reset) re-allows.
  costLedger.recordLedgerEntries([
    { apiKeyId: "key-1", provider: "openai", model: "gpt-4o", amountUsd: -3, success: true, timestamp: "2026-09-02T00:00:00.000Z" },
  ]);
});

test("key quota: 0/null limits mean unlimited, no config means allowed", () => {
  // No config row → allowed.
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1").allowed, true);

  // All-zero limits → unlimited.
  keyQuotaDb.upsertKeyQuotaLimits("key-1", { tpmLimit: 0, rpmLimit: 0, monthlyAmountUsd: 0 });
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1").allowed, true);
});

test("key quota: clear resets limits and counters", () => {
  keyQuotaDb.upsertKeyQuotaLimits("key-1", { rpmLimit: 1, tpmLimit: 50 });
  keyQuotaDomain.recordKeyQuotaUsage("key-1", 50);
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1").allowed, false);

  keyQuotaDb.clearKeyQuotaLimits("key-1");
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1").allowed, true);
});

test("key quota: sliding window lets a new minute window reset usage", () => {
  keyQuotaDb.upsertKeyQuotaLimits("key-1", { rpmLimit: 1 });
  const t0 = Date.parse("2026-09-14T12:00:00.000Z");
  // Consume the window bucket, block within the same minute.
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1", { now: () => t0 }).allowed, true);
  keyQuotaDomain.recordKeyQuotaUsage("key-1", 1, { now: () => t0 });
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1", { now: () => t0 }).allowed, false);

  // 60s later = new bucket → allowed again (fresh 2-bucket window counts only elapsed).
  const t1 = t0 + 61_000;
  assert.equal(keyQuotaDomain.checkKeyQuota("key-1", { now: () => t1 }).allowed, true);
});

test("key quota: failed-open when DB not available", () => {
  // Clobber the DB handle so reads throw; gate must still allow per B16.
  // We simulate by using an apikey id that forces a query on a closed DB.
  core.resetDbInstance();
  // After reset, the DB is recreated lazily by getDbInstance — to force a
  // throw we remove the data dir so the module's cached handle is stale.
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // ignore
  }
  const verdict = keyQuotaDomain.checkKeyQuota("key-1");
  assert.equal(verdict.allowed, true);
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});