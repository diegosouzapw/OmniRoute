import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tokenexpiresat-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "tokenexpiresat-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { buildOAuthConnectionCreatePayload } =
  await import("../../src/lib/oauth/connectionPersistence.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

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
  const payload = buildOAuthConnectionCreatePayload("antigravity", { accessToken: "at-456" }, null);

  assert.equal(payload.expiresAt, null);
  assert.equal(payload.tokenExpiresAt, null);
});

// The two cases above assert the payload object only, which is why the create path
// could drop the field for as long as it did. `createProviderConnection` copies
// optional fields through an allowlist, and `tokenExpiresAt` was not on it, so the
// insert bound NULL however good the payload was. Persist and read it back.
test("a created connection keeps tokenExpiresAt through the database", async () => {
  core.resetDbInstance();
  const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();
  const payload = buildOAuthConnectionCreatePayload(
    "antigravity",
    {
      accessToken: "at-789",
      refreshToken: "rt-789",
      email: "roundtrip@example.com",
      expiresIn: 3600,
    },
    expiresAt
  );
  assert.equal(payload.tokenExpiresAt, expiresAt, "precondition: the payload carries it");

  const created = await providersDb.createProviderConnection(payload);
  const readBack = (await providersDb.getProviderConnections({})).find(
    (c: { id: string }) => c.id === created.id
  );

  assert.ok(readBack, "the connection was persisted");
  assert.equal(readBack.expiresAt, expiresAt);
  // The dashboard badge and tokenHealthCheck both prefer tokenExpiresAt and fall back
  // to expiresAt only when it is null, so a NULL here is a false "Token Expired".
  assert.equal(readBack.tokenExpiresAt, expiresAt);
});
