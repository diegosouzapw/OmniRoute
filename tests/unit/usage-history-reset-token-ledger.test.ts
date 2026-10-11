/**
 * The on-demand "Reset usage data" action wipes usage analytics. `token_ledger`
 * is not analytics: it is the record of token transfers between API keys,
 * balances are computed from it (`getBalance`) and `idempotency_key` is what
 * makes a retried transfer a no-op. Deleting its rows silently changes balances
 * and lets an already-applied transfer be applied again.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reset-ledger-test-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = tempDir;

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { resetUsageHistory } = await import("../../src/lib/db/cleanup.ts");
const { getBalance, transferTokens } = await import("../../src/lib/db/gamification.ts");

test.after(() => {
  resetDbInstance();
  if (originalDataDir !== undefined) {
    process.env.DATA_DIR = originalDataDir;
  } else {
    delete process.env.DATA_DIR;
  }
  fs.rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function seedLedger() {
  const db = getDbInstance();
  db.prepare("DELETE FROM token_ledger").run();
  const old = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const insert = db.prepare(
    "INSERT INTO token_ledger (from_api_key_id, to_api_key_id, amount, reason, idempotency_key, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  );
  insert.run("system", "alice", 100, "grant", "grant-1", old);
  insert.run("alice", "bob", 40, "share", "transfer-1", old);
  return db;
}

for (const period of ["1d", "all"] as const) {
  test(`resetUsageHistory("${period}") keeps token_ledger rows, balances and idempotency keys`, async () => {
    const db = seedLedger();
    assert.equal(getBalance("alice"), 60);

    const result = await resetUsageHistory(period);

    const rows = (db.prepare("SELECT COUNT(*) AS c FROM token_ledger").get() as { c: number }).c;
    assert.equal(rows, 2, "the ledger must survive a usage reset");
    assert.equal(getBalance("alice"), 60, "balances must not change");
    assert.equal(getBalance("bob"), 40);
    assert.equal(result.deletedTokenLedger, 0);

    // A retry of an already-applied transfer must stay a no-op.
    transferTokens("alice", "bob", 40, "share", "transfer-1");
    assert.equal(getBalance("alice"), 60, "a retried transfer must not be applied twice");
  });
}
