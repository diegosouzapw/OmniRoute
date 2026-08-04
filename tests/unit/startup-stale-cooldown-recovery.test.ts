/**
 * TDD regression guard for issue #3625 (Part A).
 *
 * After an unclean process crash (SIGKILL / large-body burst), provider
 * connections can be left in the DB with a far-future `rate_limited_until`
 * (stale exponential-backoff value). On restart, getProviderCredentials()
 * skips those connections and Bottleneck queues time out at 120 s.
 *
 * The fix: on startup, scan `provider_connections` and clear transient
 * cooldown fields for any non-terminal connection that has a
 * `rate_limited_until` set (past *or* future). Terminal states
 * (banned / expired / credits_exhausted) must not be touched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-startup-cooldown-recovery-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
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

// ─── helpers ────────────────────────────────────────────────────────────────

/** Far-future epoch ms (simulates a crash-burst backoff). */
const FAR_FUTURE = Date.now() + 60 * 60 * 1000; // +1 hour

/** Slightly past timestamp (normal lazy expiry — also cleared on startup). */
const JUST_PAST = Date.now() - 10_000; // -10 s

// ─── tests ──────────────────────────────────────────────────────────────────

test("clearStaleCrashCooldowns clears far-future transient cooldown on restart", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Stale Cooldown",
    apiKey: "sk-test",
  });

  // Simulate crash-burst state: far-future cooldown, transient error fields
  await providersDb.updateProviderConnection(conn.id, {
    ...conn,
    rateLimitedUntil: new Date(FAR_FUTURE).toISOString(),
    testStatus: "unavailable",
    lastError: "upstream timeout",
    lastErrorType: "timeout",
    backoffLevel: 3,
  });

  // Verify pre-condition: connection has a far-future cooldown persisted
  const pre = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(
    pre?.rateLimitedUntil && new Date(pre.rateLimitedUntil as string).getTime() > Date.now(),
    "connection should have a future rate_limited_until before recovery"
  );

  // Run startup recovery
  const result = providersDb.clearStaleCrashCooldowns();

  assert.ok(result.cleared >= 1, `expected at least 1 cleared, got ${result.cleared}`);

  // Verify post-condition: cooldown is gone (cleanNulls strips null → undefined)
  const updated = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(!updated?.rateLimitedUntil, "rateLimitedUntil should be absent/falsy after recovery");
  assert.equal(updated?.testStatus, "active", "testStatus should be 'active' after recovery");
  assert.equal(updated?.backoffLevel, 0, "backoffLevel should be 0 after recovery");
  assert.ok(!updated?.lastError, "lastError should be absent/falsy after recovery");
  assert.ok(!updated?.lastErrorType, "lastErrorType should be absent/falsy after recovery");
});

test("clearStaleCrashCooldowns clears past-dated transient cooldown on restart", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Past Cooldown",
    apiKey: "sk-anth",
  });

  await providersDb.updateProviderConnection(conn.id, {
    ...conn,
    rateLimitedUntil: new Date(JUST_PAST).toISOString(),
    testStatus: "unavailable",
    backoffLevel: 1,
  });

  const result = providersDb.clearStaleCrashCooldowns();

  assert.ok(result.cleared >= 1, `expected at least 1 cleared, got ${result.cleared}`);

  const updated = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(!updated?.rateLimitedUntil, "past cooldown should also be cleared on startup");
  assert.equal(updated?.testStatus, "active", "testStatus should be 'active'");
  assert.equal(updated?.backoffLevel, 0, "backoffLevel should be 0");
});

test("clearStaleCrashCooldowns does NOT clear terminal states (banned)", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Banned Key",
    apiKey: "sk-banned",
  });

  await providersDb.updateProviderConnection(conn.id, {
    ...conn,
    rateLimitedUntil: new Date(FAR_FUTURE).toISOString(),
    testStatus: "banned",
    backoffLevel: 5,
  });

  const result = providersDb.clearStaleCrashCooldowns();

  // The banned connection must NOT be cleared
  const updated = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(updated?.testStatus, "banned", "banned connection must not be touched");
  assert.ok(
    updated?.rateLimitedUntil,
    "rate_limited_until on a banned connection must not be cleared"
  );
  // cleared count should be 0 (only the banned conn exists in this test)
  assert.equal(result.cleared, 0, "no transient connections to clear");
});

test("clearStaleCrashCooldowns does NOT clear terminal states (expired)", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "oauth",
    name: "Expired Token",
  });

  await providersDb.updateProviderConnection(conn.id, {
    ...conn,
    rateLimitedUntil: new Date(FAR_FUTURE).toISOString(),
    testStatus: "expired",
    backoffLevel: 2,
  });

  providersDb.clearStaleCrashCooldowns();

  const updated = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(updated?.testStatus, "expired", "expired connection must not be touched");
});

test("clearStaleCrashCooldowns does NOT clear terminal states (credits_exhausted)", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Exhausted",
    apiKey: "sk-exhausted",
  });

  await providersDb.updateProviderConnection(conn.id, {
    ...conn,
    rateLimitedUntil: new Date(FAR_FUTURE).toISOString(),
    testStatus: "credits_exhausted",
    backoffLevel: 4,
  });

  providersDb.clearStaleCrashCooldowns();

  const updated = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(
    updated?.testStatus,
    "credits_exhausted",
    "credits_exhausted connection must not be touched"
  );
});

test("clearStaleCrashCooldowns returns cleared=0 when no transient cooldowns exist", async () => {
  // Create a clean connection (no cooldown)
  await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "Clean",
    apiKey: "ai-key",
  });

  const result = providersDb.clearStaleCrashCooldowns();

  assert.equal(result.cleared, 0, "no cooldowns to clear");
});

test("clearStaleCrashCooldowns handles mixed transient + terminal connections correctly", async () => {
  // Transient — should be cleared
  const transient1 = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Transient 1",
    apiKey: "sk-t1",
  });
  await providersDb.updateProviderConnection(transient1.id, {
    ...transient1,
    rateLimitedUntil: new Date(FAR_FUTURE).toISOString(),
    testStatus: "unavailable",
    backoffLevel: 2,
  });

  const transient2 = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Transient 2",
    apiKey: "sk-t2",
  });
  await providersDb.updateProviderConnection(transient2.id, {
    ...transient2,
    rateLimitedUntil: new Date(JUST_PAST).toISOString(),
    testStatus: "unavailable",
    backoffLevel: 1,
  });

  // Terminal — must NOT be cleared
  const terminal = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Banned",
    apiKey: "sk-banned",
  });
  await providersDb.updateProviderConnection(terminal.id, {
    ...terminal,
    rateLimitedUntil: new Date(FAR_FUTURE).toISOString(),
    testStatus: "banned",
    backoffLevel: 5,
  });

  const result = providersDb.clearStaleCrashCooldowns();

  assert.equal(result.cleared, 2, "exactly 2 transient connections cleared");

  const updatedT1 = await providersDb.getProviderConnectionById(transient1.id);
  assert.ok(!updatedT1?.rateLimitedUntil, "transient1 cooldown cleared");
  assert.equal(updatedT1?.testStatus, "active", "transient1 status active");

  const updatedT2 = await providersDb.getProviderConnectionById(transient2.id);
  assert.ok(!updatedT2?.rateLimitedUntil, "transient2 cooldown cleared");
  assert.equal(updatedT2?.testStatus, "active", "transient2 status active");

  const updatedTerminal = await providersDb.getProviderConnectionById(terminal.id);
  assert.equal(updatedTerminal?.testStatus, "banned", "terminal connection untouched");
  assert.ok(
    updatedTerminal?.rateLimitedUntil,
    "terminal rate_limited_until preserved"
  );
});
