/**
 * TDD regression for port of https://github.com/decolua/9router/pull/2044:
 * "Fix usage logging dedupe and reduce stats churn"
 *
 * Asserts:
 * 1. Inserting the same request usage entry twice results in exactly ONE row
 *    in usage_history (dedup guard).
 * 2. emitUsageRecorded fires only when a row is actually inserted — not on
 *    a duplicate.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate the DB from other tests and from the real data dir.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-dedup-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports so DATA_DIR is set before any module initialises the DB.
const { resetDbInstance, getDbInstance } = await import("../../../src/lib/db/core.ts");
const { onUsageRecorded } = await import("../../../src/lib/usage/usageEvents.ts");
const { saveRequestUsage } = await import("../../../src/lib/usage/usageHistory.ts");

// Cleanup: close DB handle and temp directory so the test runner doesn't hang.
test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── helpers ──────────────────────────────────────────────────────────────────

let entrySeq = 0;

function makeEntry(overrides: Record<string, unknown> = {}) {
  entrySeq++;
  const timestamp = new Date(Date.now() + entrySeq).toISOString();

  return {
    provider: "test-provider",
    model: "test-model",
    connectionId: `conn-abc123-${entrySeq}`,
    apiKeyId: null,
    apiKeyName: null,
    tokens: { input_tokens: 10, output_tokens: 20 },
    status: "success",
    success: true,
    latencyMs: 100,
    timeToFirstTokenMs: 50,
    errorCode: null,
    comboStrategy: null,
    endpoint: "/v1/chat/completions",
    timestamp,
    ...overrides,
  };
}

function countRows(db: ReturnType<typeof getDbInstance>): number {
  const row = db.prepare("SELECT COUNT(*) AS cnt FROM usage_history").get() as { cnt: number };
  return row.cnt;
}

// ── tests ─────────────────────────────────────────────────────────────────────

test("saveRequestUsage: first insert creates exactly one row", async () => {
  const db = getDbInstance();
  const before = countRows(db);
  const entry = makeEntry({ timestamp: new Date().toISOString() });

  await saveRequestUsage(entry);

  assert.equal(countRows(db), before + 1, "Expected exactly one new row after first insert");
});

test("saveRequestUsage: duplicate entry (same key fields) inserts only ONE row", async () => {
  const db = getDbInstance();
  const ts = new Date().toISOString();
  const entry = makeEntry({ timestamp: ts });

  await saveRequestUsage(entry);
  const afterFirst = countRows(db);

  // Insert identical entry a second time — should be a no-op.
  await saveRequestUsage(entry);
  const afterSecond = countRows(db);

  assert.equal(
    afterSecond,
    afterFirst,
    "Duplicate insert must not create a second row (dedup guard)"
  );
});

test("saveRequestUsage: emitUsageRecorded fires on real insert but NOT on duplicate", async () => {
  const ts = new Date().toISOString();
  const entry = makeEntry({ timestamp: ts });

  let fireCount = 0;
  const unsub = onUsageRecorded(() => {
    fireCount++;
  });

  try {
    await saveRequestUsage(entry); // real insert → should fire
    await saveRequestUsage(entry); // duplicate → must NOT fire

    assert.equal(fireCount, 1, "emitUsageRecorded should fire exactly once (not on duplicate)");
  } finally {
    unsub();
  }
});

test("saveRequestUsage: two entries with different timestamps are both inserted", async () => {
  const db = getDbInstance();
  const before = countRows(db);

  await saveRequestUsage(makeEntry({ timestamp: new Date(Date.now() - 5000).toISOString() }));
  await saveRequestUsage(makeEntry({ timestamp: new Date(Date.now() - 4000).toISOString() }));

  assert.equal(
    countRows(db),
    before + 2,
    "Two distinct entries (different timestamps) should both be inserted"
  );
});

test("saveRequestUsage: two entries with different providers are both inserted", async () => {
  const db = getDbInstance();
  const before = countRows(db);
  const ts = new Date().toISOString();

  await saveRequestUsage(makeEntry({ timestamp: ts, provider: "provider-A" }));
  await saveRequestUsage(makeEntry({ timestamp: ts, provider: "provider-B" }));

  assert.equal(
    countRows(db),
    before + 2,
    "Two entries with different providers should both be inserted"
  );
});
