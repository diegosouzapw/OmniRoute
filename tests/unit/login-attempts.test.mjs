import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-login-attempts-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { recordLoginFailure, checkLoginLockout, clearLoginAttempts } =
  await import("../../src/lib/db/loginAttempts.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
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

test("checkLoginLockout returns not locked for unknown identifier", () => {
  const result = checkLoginLockout("192.0.2.1");
  assert.equal(result.locked, false);
  assert.equal(result.retryAfterMs, 0);
});

test("recordLoginFailure returns attemptsLeft and not locked below threshold", () => {
  const result = recordLoginFailure("192.0.2.2");
  assert.equal(result.locked, false);
  assert.equal(result.attemptsLeft, 9); // 10 - 1
});

test("lockout triggers after MAX_ATTEMPTS failures", () => {
  const ip = "192.0.2.3";
  for (let i = 0; i < 9; i++) {
    const r = recordLoginFailure(ip);
    assert.equal(r.locked, false);
  }
  const final = recordLoginFailure(ip);
  assert.equal(final.locked, true);
  assert.equal(final.attemptsLeft, 0);
});

test("checkLoginLockout reports locked after threshold", () => {
  const ip = "192.0.2.4";
  for (let i = 0; i < 10; i++) recordLoginFailure(ip);
  const result = checkLoginLockout(ip);
  assert.equal(result.locked, true);
  assert.ok(result.retryAfterMs > 0);
});

test("clearLoginAttempts removes lockout", () => {
  const ip = "192.0.2.5";
  for (let i = 0; i < 10; i++) recordLoginFailure(ip);
  assert.equal(checkLoginLockout(ip).locked, true);
  clearLoginAttempts(ip);
  assert.equal(checkLoginLockout(ip).locked, false);
});

test("checkLoginLockout handles malformed stored data gracefully", () => {
  const db = core.getDbInstance();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('login_attempts', 'login:192.0.2.6', ?)"
  ).run("not-valid-json");
  const result = checkLoginLockout("192.0.2.6");
  assert.equal(result.locked, false);
});

test("checkLoginLockout prunes and unlocks when all timestamps are expired", () => {
  const db = core.getDbInstance();
  // Insert timestamps 20 minutes ago (outside 15-min window)
  const oldTimestamps = Array.from({ length: 10 }, (_, i) => Date.now() - 20 * 60 * 1000 - i);
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('login_attempts', 'login:192.0.2.7', ?)"
  ).run(JSON.stringify(oldTimestamps));
  const result = checkLoginLockout("192.0.2.7");
  assert.equal(result.locked, false);
  // Row should be pruned
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'login_attempts' AND key = ?")
    .get("login:192.0.2.7");
  assert.equal(row, undefined);
});
