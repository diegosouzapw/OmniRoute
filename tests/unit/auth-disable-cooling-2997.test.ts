import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-disable-cooling-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// #2997 — Test 1: a recoverable error on a connection flagged disableCooling
// must NOT write a transient cooldown (no rateLimitedUntil, testStatus stays out of
// "unavailable"). The connection records its lastError/backoff but stays eligible.
test("markAccountUnavailable skips transient cooldown when disableCooling is set", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    apiKey: "sk-disable-cooling",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { disableCooling: true },
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    503,
    "temporary upstream error",
    "glm",
    "glm-5.1"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);

  assert.equal(result.shouldFallback, true);
  // No transient cooldown should be applied.
  assert.ok(!after.rateLimitedUntil, "rateLimitedUntil must not be set when disableCooling is on");
  assert.notEqual(
    after.testStatus,
    "unavailable",
    "testStatus must not become 'unavailable' when disableCooling is on"
  );
  // The error is still recorded (backoff/lastError path), connection stays usable.
  assert.equal(Number(after.errorCode), 503);
  assert.ok(after.lastError, "lastError must still be recorded");
});

// #2997 — Test 2 (load-bearing): the flag must NEVER rescue a terminal state.
// A 401 still expires the connection; a 402 still exhausts credits — both DESPITE
// disableCooling being set. The guard only skips the TRANSIENT cooldown branch.
test("markAccountUnavailable still applies terminal 'expired' despite disableCooling", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-disable-cooling-expired",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { disableCooling: true },
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    401,
    "unauthorized",
    "openai",
    "gpt-4.1"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);

  assert.equal(result.shouldFallback, true);
  assert.equal(after.testStatus, "expired");
});

test("markAccountUnavailable still applies terminal 'credits_exhausted' despite disableCooling", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-disable-cooling-credits",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { disableCooling: true },
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    402,
    "payment required",
    "openai",
    "gpt-4.1"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);

  assert.equal(result.shouldFallback, true);
  assert.equal(after.testStatus, "credits_exhausted");
});

// #2997 — Test 3: regression — a connection WITHOUT the flag keeps the default
// transient cooldown behavior (rateLimitedUntil set, testStatus 'unavailable').
test("markAccountUnavailable still applies transient cooldown without disableCooling", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    apiKey: "sk-default-cooling",
    isActive: true,
    testStatus: "active",
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    503,
    "temporary upstream error",
    "glm",
    "glm-5.1"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
  assert.ok(after.rateLimitedUntil, "rateLimitedUntil must be set for default behavior");
  assert.equal(after.testStatus, "unavailable");
});

// #2997 — Test 4: selection eligibility — after a recoverable error, the flagged
// connection is still selectable, while an unflagged sibling that hit the same
// error is filtered out by its cooldown.
test("getProviderCredentials keeps a disableCooling connection eligible after a recoverable error", async () => {
  await resetStorage();

  const flagged = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    apiKey: "sk-flagged-eligible",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { disableCooling: true },
  });

  const unflagged = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    apiKey: "sk-unflagged-cooled",
    isActive: true,
    testStatus: "active",
  });

  await auth.markAccountUnavailable(
    (flagged as any).id,
    503,
    "temporary upstream error",
    "glm",
    "glm-5.1"
  );
  await auth.markAccountUnavailable(
    (unflagged as any).id,
    503,
    "temporary upstream error",
    "glm",
    "glm-5.1"
  );

  // Selection must keep returning the flagged connection (never the cooled sibling).
  for (let i = 0; i < 8; i++) {
    const selected = await auth.getProviderCredentials("glm");
    assert.ok(selected, "expected a selectable connection");
    assert.equal(
      selected.connectionId,
      (flagged as any).id,
      "disableCooling connection must stay eligible while the unflagged sibling is cooled"
    );
  }
});
