import test from "node:test";
import assert from "node:assert/strict";

import { buildOAuthConnectionCreatePayload } from "../../src/lib/oauth/connectionPersistence.ts";

// Regression for #5326: a freshly created OAuth connection (e.g. antigravity) used
// to persist only `expiresAt`, leaving `tokenExpiresAt` null. The dashboard token
// badge prefers `tokenExpiresAt` and falls back to the original grant clock when it
// is null, flashing a false "Token Expired" until the first background refresh.
// The create payload must mirror the computed expiry into BOTH fields.
test("buildOAuthConnectionCreatePayload mirrors expiresAt into tokenExpiresAt (#5326)", () => {
  const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();
  const tokenData = {
    accessToken: "at-123",
    refreshToken: "rt-123",
    email: "user@example.com",
    expiresIn: 3600,
  };

  const payload = buildOAuthConnectionCreatePayload("antigravity", tokenData, expiresAt);

  assert.equal(payload.provider, "antigravity");
  assert.equal(payload.authType, "oauth");
  assert.equal(payload.testStatus, "active");
  assert.equal(payload.expiresAt, expiresAt);
  // The fix: tokenExpiresAt is set (was null/undefined before) and equals expiresAt.
  assert.equal(payload.tokenExpiresAt, expiresAt);
  assert.equal(payload.tokenExpiresAt, payload.expiresAt);
  // tokenData fields are still carried through.
  assert.equal(payload.accessToken, "at-123");
  assert.equal(payload.refreshToken, "rt-123");
});

test("buildOAuthConnectionCreatePayload keeps tokenExpiresAt null when expiry is unknown", () => {
  const payload = buildOAuthConnectionCreatePayload(
    "antigravity",
    { accessToken: "at-456" },
    null
  );

  assert.equal(payload.expiresAt, null);
  assert.equal(payload.tokenExpiresAt, null);
});
