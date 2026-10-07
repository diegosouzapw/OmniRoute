/**
 * TDD regression guard for issue #3625 (Part A) and future quota cooldown preservation.
 *
 * After an unclean process crash (SIGKILL / large-body burst), provider
 * connections can be left in the DB with expired transient cooldowns.
 * On startup, scan `provider_connections` and clear stale transient
 * cooldown fields for any non-terminal connection that has an EXPIRED or
 * unparseable `rate_limited_until`.
 *
 * FUTURE timestamps (such as weekly/monthly quota cooldowns) MUST be
 * preserved so that restarts/recreates do not wipe active cooldowns and
 * immediately dispatch into upstream 429s.
 *
 * Terminal states (banned / expired / credits_exhausted) must not be touched.
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
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─── helpers ────────────────────────────────────────────────────────────────

/** Far-future epoch ms (simulates a multi-day quota reset or active cooldown). */
const FAR_FUTURE = Date.now() + 6 * 24 * 60 * 60 * 1000; // +6 days

/** Slightly past timestamp (normal lazy expiry — cleared on startup). */
const JUST_PAST = Date.now() - 10_000; // -10 s

// ─── tests ──────────────────────────────────────────────────────────────────

test("clearStaleCrashCooldowns PRESERVES future transient cooldown on restart", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Future Cooldown",
    apiKey: "sk-test",
  });

  await providersDb.updateProviderConnection(conn.id, {
    ...conn,
    rateLimitedUntil: new Date(FAR_FUTURE).toISOString(),
    testStatus: "unavailable",
    lastError: "upstream weekly quota exhausted",
    lastErrorType: "quota_exhausted",
    backoffLevel: 3,
  });

  const pre = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(
    pre?.rateLimitedUntil && new Date(pre.rateLimitedUntil as string).getTime() > Date.now(),
    "connection should have a future rate_limited_until before recovery"
  );

  const result = providersDb.clearStaleCrashCooldowns();
  assert.equal(result.cleared, 0, "future cooldown must NOT be cleared on startup");

  const updated = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(updated?.rateLimitedUntil, "future rateLimitedUntil must remain intact");
  assert.equal(updated?.testStatus, "unavailable", "testStatus should remain unavailable");
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
    lastError: "upstream timeout",
    lastErrorType: "timeout",
    errorCode: 504,
    backoffLevel: 1,
  });

  const result = providersDb.clearStaleCrashCooldowns();

  assert.ok(result.cleared >= 1, `expected at least 1 cleared, got ${result.cleared}`);

  const updated = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(!updated?.rateLimitedUntil, "past cooldown should also be cleared on startup");
  assert.equal(updated?.testStatus, "active", "testStatus should be 'active'");
  assert.equal(updated?.backoffLevel, 0, "backoffLevel should be 0");
  // The startup sweep resets the whole transient cluster, not just the cooldown:
  assert.ok(!updated?.lastError, "lastError should be absent/falsy after recovery");
  assert.ok(!updated?.lastErrorType, "lastErrorType should be absent/falsy after recovery");
  assert.ok(!updated?.errorCode, "errorCode should be absent/falsy after recovery");
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

  const updated = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(updated?.testStatus, "banned", "banned connection must not be touched");
  assert.ok(
    updated?.rateLimitedUntil,
    "rate_limited_until on a banned connection must not be cleared"
  );
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
  // Future transient — should be PRESERVED
  const futureTransient = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Future Transient",
    apiKey: "sk-t1",
  });
  await providersDb.updateProviderConnection(futureTransient.id, {
    ...futureTransient,
    rateLimitedUntil: new Date(FAR_FUTURE).toISOString(),
    testStatus: "unavailable",
    backoffLevel: 2,
  });

  // Past transient — should be CLEARED
  const pastTransient = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Past Transient",
    apiKey: "sk-t2",
  });
  await providersDb.updateProviderConnection(pastTransient.id, {
    ...pastTransient,
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

  assert.equal(result.cleared, 1, "only 1 past transient connection cleared");

  const updatedFuture = await providersDb.getProviderConnectionById(futureTransient.id);
  assert.ok(updatedFuture?.rateLimitedUntil, "future cooldown preserved");
  assert.equal(updatedFuture?.testStatus, "unavailable", "future transient status preserved");

  const updatedPast = await providersDb.getProviderConnectionById(pastTransient.id);
  assert.ok(!updatedPast?.rateLimitedUntil, "past transient cooldown cleared");
  assert.equal(updatedPast?.testStatus, "active", "past transient status active");

  const updatedTerminal = await providersDb.getProviderConnectionById(terminal.id);
  assert.equal(updatedTerminal?.testStatus, "banned", "terminal connection untouched");
  assert.ok(updatedTerminal?.rateLimitedUntil, "terminal rate_limited_until preserved");
});
