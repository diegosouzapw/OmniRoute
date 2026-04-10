import test from "node:test";
import assert from "node:assert/strict";

process.env.NODE_ENV = "test";

const tokenHealthCheck = await import("../../src/lib/tokenHealthCheck.ts");

test("buildRefreshFailureUpdate keeps active connections routable after refresh failure", () => {
  const now = "2026-04-09T04:40:00.000Z";

  const update = tokenHealthCheck.buildRefreshFailureUpdate(
    {
      testStatus: "active",
      expiredRetryCount: 2,
    },
    now
  );

  assert.equal(update.testStatus, "active");
  assert.equal(update.lastError, "Health check: token refresh failed");
  assert.equal(update.lastErrorType, "token_refresh_failed");
  assert.equal(update.lastErrorSource, "oauth");
  assert.equal(update.errorCode, "refresh_failed");
  assert.equal(update.lastHealthCheckAt, now);
  assert.equal("expiredRetryCount" in update, false);
  assert.equal("expiredRetryAt" in update, false);
});

test("buildRefreshFailureUpdate preserves expired retry tracking", () => {
  const now = "2026-04-09T04:41:00.000Z";

  const update = tokenHealthCheck.buildRefreshFailureUpdate(
    {
      testStatus: "expired",
      expiredRetryCount: 2,
    },
    now
  );

  assert.equal(update.testStatus, "expired");
  assert.equal(update.expiredRetryCount, 3);
  assert.equal(update.expiredRetryAt, now);
});
