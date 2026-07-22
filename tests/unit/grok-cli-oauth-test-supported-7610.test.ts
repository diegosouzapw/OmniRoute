import test from "node:test";
import assert from "node:assert/strict";

// #7610 bug #2: `grok-cli` was absent from OAUTH_TEST_CONFIG in
// src/app/api/providers/[id]/test/route.ts, so "Test Connection" for a Grok
// Build (OAuth) connection always fell through to the generic
// "Provider test not supported" branch, regardless of whether the token was
// actually healthy.
const { testOAuthConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");

test("#7610: grok-cli OAuth connection test is no longer 'unsupported'", async () => {
  const connection = {
    provider: "grok-cli",
    accessToken: "healthy-access-token",
    refreshToken: "healthy-refresh-token",
    // Far in the future — not expired, so this exercises the checkExpiry
    // "still valid" branch rather than the refresh path.
    tokenExpiresAt: new Date(Date.now() + 3600_000).toISOString(),
  };

  const result = await testOAuthConnection(connection);

  assert.notEqual(result.diagnosis?.type, "unsupported");
  assert.notEqual(result.error, "Provider test not supported");
  assert.equal(result.valid, true);
});
