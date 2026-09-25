import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A quota-exhausted classification parks the connection until the cached
// quota reset. Production (2026-09-24): Cursor's empty-turn message contains
// "usage/quota exhausted", the text rule classified a 502 as quota_exhausted,
// and the only Cursor connection was parked until its billing-cycle end
// (~30 days) while the usage poller reported every window 99–100% available.
// A 5xx is not a quota verdict, so it never parks until a cached reset.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-park-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-park-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { CURSOR_EMPTY_TURN_MESSAGE } =
  await import("../../open-sse/executors/cursor/cursorErrors.ts");

test.after(() => {
  quotaCache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const DAY_MS = 24 * 60 * 60 * 1000;
const cycleEnd = () => new Date(Date.now() + 30 * DAY_MS).toISOString();

async function cursorConnection(): Promise<string> {
  const connection = await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    accessToken: "cursor-access-token",
    isActive: true,
    testStatus: "active",
  });
  return (connection as { id: string }).id;
}

test("a 5xx with a quota text match does not park until the cached billing-cycle reset", async () => {
  const connectionId = await cursorConnection();
  const resetAt = cycleEnd();
  quotaCache.setQuotaCache(connectionId, "cursor", {
    Total: { remainingPercentage: 99.96, resetAt },
    "Auto + Composer": { remainingPercentage: 99.95, resetAt },
    API: { remainingPercentage: 100, resetAt },
  });

  const result = await auth.markAccountUnavailable(
    connectionId,
    502,
    CURSOR_EMPTY_TURN_MESSAGE,
    "cursor",
    "claude-fable-5-1-thinking-max"
  );
  const after = await providersDb.getProviderConnectionById(connectionId);
  const parkedMs = new Date(after.rateLimitedUntil).getTime() - Date.now();

  assert.ok(result.cooldownMs < 60 * 60 * 1000, `cooldown ${result.cooldownMs}ms`);
  assert.ok(parkedMs < 60 * 60 * 1000, `parked until ${after.rateLimitedUntil}`);
});

test("a 5xx does not park on a spent pool either (e.g. Cursor's API pool)", async () => {
  const connectionId = await cursorConnection();
  quotaCache.setQuotaCache(connectionId, "cursor", {
    Total: { remainingPercentage: 60, resetAt: cycleEnd() },
    "Auto + Composer": { remainingPercentage: 99, resetAt: cycleEnd() },
    API: { remainingPercentage: 0, resetAt: cycleEnd() },
  });

  const result = await auth.markAccountUnavailable(
    connectionId,
    502,
    CURSOR_EMPTY_TURN_MESSAGE,
    "cursor",
    "auto"
  );

  assert.ok(result.cooldownMs < 60 * 60 * 1000, `cooldown ${result.cooldownMs}ms`);
});

test("a real quota error (429) still parks the connection until the cached reset", async () => {
  const connectionId = await cursorConnection();
  const windowReset = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  quotaCache.setQuotaCache(connectionId, "cursor", {
    Total: { remainingPercentage: 40, resetAt: cycleEnd() },
    API: { remainingPercentage: 0, resetAt: windowReset },
  });

  const result = await auth.markAccountUnavailable(
    connectionId,
    429,
    "You have exceeded your quota. Your quota exhausted for this window.",
    "cursor",
    "auto"
  );
  const after = await providersDb.getProviderConnectionById(connectionId);

  assert.ok(Math.abs(result.cooldownMs - 2 * 60 * 60 * 1000) < 2_000);
  assert.ok(
    Math.abs(new Date(after.rateLimitedUntil).getTime() - new Date(windowReset).getTime()) < 100
  );
});
