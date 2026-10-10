import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "transfer-validation-16198-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core.ts");
const { transferTokens, getBalance, getHistory } =
  await import("../../../src/lib/gamification/sharing.ts");
const db = core.getDbInstance();

test.beforeEach(() => {
  db.exec("DELETE FROM token_ledger");
  db.prepare(
    "INSERT INTO token_ledger (from_api_key_id, to_api_key_id, amount, reason, idempotency_key) VALUES (?, ?, ?, ?, ?)"
  ).run("fixture-seed", "sender", 1000, "fixture-credit", "seed");
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

async function assertBalancesUnchanged() {
  assert.equal(await getBalance("sender"), 1000);
  assert.equal(await getBalance("recipient"), 0);
  assert.equal((await getHistory("sender")).length, 1);
  assert.deepEqual(await getHistory("recipient"), []);
}

for (const amount of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
  test(`rejects non-finite amount ${amount} before retaining an idempotency key`, async () => {
    assert.deepEqual(await transferTokens("sender", "recipient", amount, "gift", "invalid-key"), {
      success: false,
      idempotencyKey: "",
      error: "Amount must be positive",
    });
    await assertBalancesUnchanged();
  });
}

for (const amount of [0, -5]) {
  test(`preserves rejection of non-positive amount ${amount}`, async () => {
    assert.deepEqual(await transferTokens("sender", "recipient", amount), {
      success: false,
      idempotencyKey: "",
      error: "Amount must be positive",
    });
    await assertBalancesUnchanged();
  });
}

for (const amount of [5, Number.NaN]) {
  test(`self-transfer remains the first validation for amount ${amount}`, async () => {
    assert.deepEqual(await transferTokens("sender", "sender", amount), {
      success: false,
      idempotencyKey: "",
      error: "Cannot transfer to yourself",
    });
    await assertBalancesUnchanged();
  });
}

test("successful integer transfer generates a UUID and keeps the default reason", async () => {
  const result = await transferTokens("sender", "recipient", 100);
  assert.equal(result.success, true);
  assert.match(result.idempotencyKey, /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i);
  assert.equal(await getBalance("sender"), 900);
  assert.equal(await getBalance("recipient"), 100);
  const [entry] = await getHistory("recipient");
  assert.equal(entry.idempotencyKey, result.idempotencyKey);
  assert.equal(entry.reason, "transfer");
});

test("finite positive fractions keep their amount, supplied key and reason", async () => {
  assert.deepEqual(
    await transferTokens("sender", "recipient", 1.5, "fractional gift", "fraction"),
    {
      success: true,
      idempotencyKey: "fraction",
    }
  );
  assert.equal(await getBalance("sender"), 998.5);
  assert.equal(await getBalance("recipient"), 1.5);
  const [entry] = await getHistory("recipient");
  assert.equal(entry.amount, 1.5);
  assert.equal(entry.reason, "fractional gift");
});

test("the same supplied key records one transfer while a new key records another", async () => {
  for (let attempt = 0; attempt < 2; attempt++) {
    assert.deepEqual(await transferTokens("sender", "recipient", 75, "gift", "repeat"), {
      success: true,
      idempotencyKey: "repeat",
    });
  }
  assert.equal(await getBalance("sender"), 925);
  assert.equal((await getHistory("recipient")).length, 1);
  assert.deepEqual(await transferTokens("sender", "recipient", 25, "gift", "second"), {
    success: true,
    idempotencyKey: "second",
  });
  assert.equal(await getBalance("sender"), 900);
  assert.equal(await getBalance("recipient"), 100);
  assert.equal((await getHistory("recipient")).length, 2);
});

test("insufficient balance retains its existing error and supplied key", async () => {
  assert.deepEqual(await transferTokens("sender", "recipient", 1001, undefined, "too-much"), {
    success: false,
    idempotencyKey: "too-much",
    error: "insufficient_balance",
  });
  await assertBalancesUnchanged();
});

test("a real SQLite failure returns a legible error without synthetic credentials or paths", async () => {
  db.exec(`CREATE TRIGGER reject_synthetic_transfer BEFORE INSERT ON token_ledger
    BEGIN SELECT RAISE(ABORT, 'Synthetic ledger failure Bearer synthetic-token-16198 access_token=synthetic-access-16198 /srv/omniroute-fixture/private.ts
    at syntheticTransfer (/srv/omniroute-fixture/private.ts:12:3)'); END`);
  try {
    const result = await transferTokens("sender", "recipient", 25, "gift", "failure");
    assert.equal(result.success, false);
    assert.equal(result.idempotencyKey, "failure");
    assert.equal(typeof result.error, "string");
    assert.match(result.error ?? "", /^Synthetic ledger failure/);
    assert.doesNotMatch(
      result.error ?? "",
      /synthetic-token-16198|synthetic-access-16198|\/srv\/|at syntheticTransfer/
    );
    await assertBalancesUnchanged();
  } finally {
    db.exec("DROP TRIGGER reject_synthetic_transfer");
  }
});

test("a rejected transaction preserves balances and allows its key after recovery", async () => {
  db.exec(`CREATE TRIGGER reject_transfer BEFORE INSERT ON token_ledger
    BEGIN SELECT RAISE(ABORT, 'Synthetic transfer temporarily rejected'); END`);
  try {
    assert.deepEqual(await transferTokens("sender", "recipient", 25, "gift", "recovered"), {
      success: false,
      idempotencyKey: "recovered",
      error: "Synthetic transfer temporarily rejected",
    });
    await assertBalancesUnchanged();
  } finally {
    db.exec("DROP TRIGGER reject_transfer");
  }
  assert.deepEqual(await transferTokens("sender", "recipient", 25, "gift", "recovered"), {
    success: true,
    idempotencyKey: "recovered",
  });
  assert.equal(await getBalance("sender"), 975);
  assert.equal(await getBalance("recipient"), 25);
  assert.equal((await getHistory("recipient")).length, 1);
});
