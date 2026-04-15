import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-provider-limits-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const providerLimitsDb = await import("../../src/lib/db/providerLimits.ts");

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

test("providerLimits cache returns empty defaults before any writes", () => {
  assert.equal(providerLimitsDb.getProviderLimitsCache("conn-1"), null);
  assert.deepEqual(providerLimitsDb.getAllProviderLimitsCache(), {});
  assert.equal(providerLimitsDb.setProviderLimitsCacheBatch([]), 0);
});

test("providerLimits cache supports single writes, batch writes and deletions", () => {
  const first = providerLimitsDb.setProviderLimitsCache("conn-1", {
    quotas: { remaining: 12 },
    plan: "pro",
    message: "ok",
    fetchedAt: "2026-01-01T00:00:00.000Z",
    source: "sync",
  });

  assert.equal(first.plan, "pro");
  assert.deepEqual(providerLimitsDb.getProviderLimitsCache("conn-1"), first);

  const inserted = providerLimitsDb.setProviderLimitsCacheBatch([
    {
      connectionId: "conn-2",
      entry: {
        quotas: { remaining: 10 },
        plan: { tier: "team" },
        message: null,
        fetchedAt: "2026-01-01T01:00:00.000Z",
      },
    },
    {
      connectionId: "conn-3",
      entry: {
        quotas: null,
        plan: null,
        message: "empty",
        fetchedAt: "2026-01-01T02:00:00.000Z",
      },
    },
  ]);

  assert.equal(inserted, 2);
  assert.equal(Object.keys(providerLimitsDb.getAllProviderLimitsCache()).length, 3);

  providerLimitsDb.deleteProviderLimitsCache("conn-2");
  assert.equal(providerLimitsDb.getProviderLimitsCache("conn-2"), null);
});

test("providerLimits cache ignores malformed stored values", () => {
  const db = coreDb.getDbInstance();
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "providerLimitsCache",
    "broken-json",
    "{not-json"
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "providerLimitsCache",
    "missing-fetched-at",
    JSON.stringify({ quotas: { remaining: 5 } })
  );

  assert.equal(providerLimitsDb.getProviderLimitsCache("broken-json"), null);
  assert.equal(providerLimitsDb.getProviderLimitsCache("missing-fetched-at"), null);
  assert.deepEqual(providerLimitsDb.getAllProviderLimitsCache(), {});
});
