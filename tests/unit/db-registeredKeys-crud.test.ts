import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-regkeys-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const rk = await import("../../src/lib/db/registeredKeys.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

await resetStorage();

// ──────────────── issueRegisteredKey ────────────────

test("issueRegisteredKey creates a key and returns it with rawKey", async () => {
  await resetStorage();
  const result = rk.issueRegisteredKey({
    name: "Test Key",
    provider: "openai",
    accountId: "acc-1",
  });

  assert.ok("rawKey" in result && !("idempotencyConflict" in result));
  assert.ok(result.rawKey.startsWith("ork_"));
  assert.equal(result.name, "Test Key");
  assert.equal(result.provider, "openai");
  assert.equal(result.accountId, "acc-1");
  assert.equal(result.isActive, true);
  assert.ok(result.id);
  assert.ok(result.keyPrefix);
});

test("issueRegisteredKey with idempotency key", async () => {
  await resetStorage();
  const first = rk.issueRegisteredKey({
    name: "Idempotent",
    idempotencyKey: "idem-1",
  });

  const second = rk.issueRegisteredKey({
    name: "Should Conflict",
    idempotencyKey: "idem-1",
  });

  assert.ok("idempotencyConflict" in second);
  assert.equal(second.idempotencyConflict, true);
  assert.equal(second.existing.id, (first as any).id);
});

test("issueRegisteredKey with expiresAt and budgets", async () => {
  await resetStorage();
  const result = rk.issueRegisteredKey({
    name: "Budgeted Key",
    provider: "anthropic",
    expiresAt: "2027-01-01T00:00:00Z",
    dailyBudget: 100,
    hourlyBudget: 10,
  });

  assert.ok("rawKey" in result);
  assert.equal(result.expiresAt, "2027-01-01T00:00:00Z");
  assert.equal(result.dailyBudget, 100);
  assert.equal(result.hourlyBudget, 10);
});

test("issueRegisteredKey without provider skips provider quotas", async () => {
  await resetStorage();
  const result = rk.issueRegisteredKey({ name: "No Provider Key" });
  assert.ok("rawKey" in result);
});

// ──────────────── getRegisteredKey ────────────────

test("getRegisteredKey returns key by id", async () => {
  await resetStorage();
  const created = rk.issueRegisteredKey({ name: "Get Me" }) as any;
  const loaded = rk.getRegisteredKey(created.id);
  assert.ok(loaded !== null);
  assert.equal(loaded.name, "Get Me");
  assert.equal(loaded.id, created.id);
});

test("getRegisteredKey returns null for missing id", () => {
  assert.equal(rk.getRegisteredKey("no-such-id"), null);
});

// ──────────────── listRegisteredKeys ────────────────

test("listRegisteredKeys returns all keys", async () => {
  await resetStorage();
  rk.issueRegisteredKey({ name: "Key A", provider: "openai" });
  rk.issueRegisteredKey({ name: "Key B", provider: "anthropic" });

  const all = rk.listRegisteredKeys();
  assert.equal(all.length, 2);
});

test("listRegisteredKeys filters by provider", async () => {
  await resetStorage();
  rk.issueRegisteredKey({ name: "OA", provider: "openai" });
  rk.issueRegisteredKey({ name: "AN", provider: "anthropic" });

  const filtered = rk.listRegisteredKeys({ provider: "openai" });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].name, "OA");
});

test("listRegisteredKeys filters by accountId", async () => {
  await resetStorage();
  rk.issueRegisteredKey({ name: "Acc1 Key", accountId: "acc-1" });
  rk.issueRegisteredKey({ name: "Acc2 Key", accountId: "acc-2" });

  const filtered = rk.listRegisteredKeys({ accountId: "acc-1" });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].name, "Acc1 Key");
});

// ──────────────── revokeRegisteredKey ────────────────

test("revokeRegisteredKey deactivates a key", async () => {
  await resetStorage();
  const created = rk.issueRegisteredKey({ name: "Revoke Me" }) as any;
  assert.equal(created.isActive, true);

  const revoked = rk.revokeRegisteredKey(created.id);
  assert.equal(revoked, true);

  const loaded = rk.getRegisteredKey(created.id);
  assert.equal(loaded!.isActive, false);
  assert.ok(loaded!.revokedAt);
});

test("revokeRegisteredKey returns false for already revoked or missing key", async () => {
  await resetStorage();
  assert.equal(rk.revokeRegisteredKey("no-such-id"), false);

  const created = rk.issueRegisteredKey({ name: "To Revoke" }) as any;
  rk.revokeRegisteredKey(created.id);
  assert.equal(rk.revokeRegisteredKey(created.id), false);
});

// ──────────────── validateRegisteredKey ────────────────

test("validateRegisteredKey validates raw key by hash", async () => {
  await resetStorage();
  const created = rk.issueRegisteredKey({ name: "Validate Me" }) as any;

  const validated = rk.validateRegisteredKey(created.rawKey);
  assert.ok(validated !== null);
  assert.equal(validated.name, "Validate Me");
});

test("validateRegisteredKey returns null for invalid key", () => {
  assert.equal(rk.validateRegisteredKey("ork_invalid"), null);
});

test("validateRegisteredKey returns null for revoked key", async () => {
  await resetStorage();
  const created = rk.issueRegisteredKey({ name: "Soon Revoked" }) as any;
  rk.revokeRegisteredKey(created.id);
  assert.equal(rk.validateRegisteredKey(created.rawKey), null);
});

// ──────────────── incrementRegisteredKeyUsage ────────────────

test("incrementRegisteredKeyUsage bumps counters", async () => {
  await resetStorage();
  const created = rk.issueRegisteredKey({
    name: "Usage Test",
    dailyBudget: 100,
    hourlyBudget: 50,
  }) as any;

  assert.equal(created.dailyUsed, 0);
  assert.equal(created.hourlyUsed, 0);

  rk.incrementRegisteredKeyUsage(created.id);
  const loaded = rk.getRegisteredKey(created.id);
  assert.equal(loaded!.dailyUsed, 1);
  assert.equal(loaded!.hourlyUsed, 1);
});

test("validateRegisteredKey respects budget limits", async () => {
  await resetStorage();
  const created = rk.issueRegisteredKey({
    name: "Budget Limit",
    dailyBudget: 3,
  }) as any;

  assert.ok(rk.validateRegisteredKey(created.rawKey) !== null);
  rk.incrementRegisteredKeyUsage(created.id);
  rk.incrementRegisteredKeyUsage(created.id);
  rk.incrementRegisteredKeyUsage(created.id);
  // After 3 increments, daily_used == daily_budget == 3
  assert.equal(rk.validateRegisteredKey(created.rawKey), null);
});

// ──────────────── checkQuota ────────────────

test("checkQuota returns allowed true when no limits set", async () => {
  await resetStorage();
  const result = rk.checkQuota("openai", "acc-1");
  assert.equal(result.allowed, true);
});

test("checkQuota returns allowed true with no provider or account", () => {
  const result = rk.checkQuota("", "");
  assert.equal(result.allowed, true);
});

test("checkQuota rejects when hourly limit exceeded", async () => {
  await resetStorage();
  rk.setProviderKeyLimit("limited-provider", { hourlyIssueLimit: 2 });
  rk.issueRegisteredKey({ name: "K1", provider: "limited-provider" });
  rk.issueRegisteredKey({ name: "K2", provider: "limited-provider" });

  const result = rk.checkQuota("limited-provider");
  assert.equal(result.allowed, false);
  assert.equal(result.errorCode, "PROVIDER_QUOTA_EXCEEDED");
});

test("checkQuota rejects when max active keys exceeded", async () => {
  await resetStorage();
  rk.setProviderKeyLimit("maxed-provider", { maxActiveKeys: 1 });
  rk.issueRegisteredKey({ name: "Only One", provider: "maxed-provider" });

  const result = rk.checkQuota("maxed-provider");
  assert.equal(result.allowed, false);
  assert.equal(result.errorCode, "MAX_ACTIVE_KEYS_EXCEEDED");
});

test("checkQuota account-level rejection", async () => {
  await resetStorage();
  rk.setAccountKeyLimit("limited-account", { dailyIssueLimit: 1 });
  rk.issueRegisteredKey({ name: "Only", accountId: "limited-account" });

  const result = rk.checkQuota("", "limited-account");
  assert.equal(result.allowed, false);
  assert.equal(result.errorCode, "ACCOUNT_QUOTA_EXCEEDED");
});

// ──────────────── setProviderKeyLimit / getProviderKeyLimit ────────────────

test("setProviderKeyLimit and getProviderKeyLimit round-trip", async () => {
  await resetStorage();
  rk.setProviderKeyLimit("test-provider", {
    maxActiveKeys: 5,
    dailyIssueLimit: 100,
    hourlyIssueLimit: 20,
  });

  const limit = rk.getProviderKeyLimit("test-provider");
  assert.ok(limit !== null);
  assert.equal(limit.provider, "test-provider");
  assert.equal(limit.maxActiveKeys, 5);
  assert.equal(limit.dailyIssueLimit, 100);
  assert.equal(limit.hourlyIssueLimit, 20);
});

test("getProviderKeyLimit returns null for unknown provider", () => {
  assert.equal(rk.getProviderKeyLimit("no-such-provider"), null);
});

test("setProviderKeyLimit with partial limits", async () => {
  await resetStorage();
  rk.setProviderKeyLimit("partial-provider", { maxActiveKeys: 3 });
  const limit = rk.getProviderKeyLimit("partial-provider");
  assert.equal(limit!.maxActiveKeys, 3);
  assert.equal(limit!.dailyIssueLimit, null);
  assert.equal(limit!.hourlyIssueLimit, null);
});

// ──────────────── setAccountKeyLimit / getAccountKeyLimit ────────────────

test("setAccountKeyLimit and getAccountKeyLimit round-trip", async () => {
  await resetStorage();
  rk.setAccountKeyLimit("test-account", {
    maxActiveKeys: 10,
    dailyIssueLimit: 200,
    hourlyIssueLimit: 50,
  });

  const limit = rk.getAccountKeyLimit("test-account");
  assert.ok(limit !== null);
  assert.equal(limit.accountId, "test-account");
  assert.equal(limit.maxActiveKeys, 10);
  assert.equal(limit.dailyIssueLimit, 200);
  assert.equal(limit.hourlyIssueLimit, 50);
});

test("getAccountKeyLimit returns null for unknown account", () => {
  assert.equal(rk.getAccountKeyLimit("no-such-account"), null);
});
