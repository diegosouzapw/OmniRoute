import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-limits-recovery-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-provider-limits-recovery-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function withMockedFetch(fetchImpl: typeof fetch, fn: () => Promise<void>) {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    await fn();
  } finally {
    globalThis.fetch = previousFetch;
  }
}

async function createGlmConnectionWithTransientCooldown() {
  return providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Recovery ${Date.now()}`,
    apiKey: "glm-test-key",
    testStatus: "unavailable",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    lastError: "rate limit exceeded",
    lastErrorType: "rate_limited",
    lastErrorSource: "executor",
    errorCode: 429,
    backoffLevel: 2,
  });
}

function glmQuotaResponse() {
  // Mirrors open-sse/services/usage/glm.ts: TOKENS_LIMIT window with remaining.
  return new Response(
    JSON.stringify({
      code: 200,
      success: true,
      data: {
        planName: "max",
        limits: [
          {
            type: "TOKENS_LIMIT",
            unit: 3,
            number: 5,
            percentage: 13,
            nextResetTime: Math.floor(Date.now() / 1000) + 3 * 3600,
            models: [],
          },
        ],
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("successful GLM quota refresh clears transient rate-limit state", async () => {
  const connection = await createGlmConnectionWithTransientCooldown();
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch(
    (() => glmQuotaResponse()) as typeof fetch,
    async () => {
      await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
    }
  );

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "active", "testStatus should be reset to active");
  assert.equal(updated.rateLimitedUntil, undefined, "rateLimitedUntil should be cleared");
  assert.equal(updated.errorCode, undefined, "errorCode should be cleared");
  assert.equal(updated.lastErrorType, undefined, "lastErrorType should be cleared");
  assert.equal(updated.backoffLevel, 0, "backoffLevel should be reset to 0");
});

async function createGlmConnectionWithStatus(status: string) {
  return providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "GLM " + status + " " + Date.now(),
    apiKey: "glm-test-key",
    testStatus: status,
    lastError: "permanent failure",
    lastErrorType: "permanent",
    errorCode: 403,
    backoffLevel: 1,
  });
}

test("successful quota refresh does not clear terminal credits_exhausted status", async () => {
  const connection = await createGlmConnectionWithStatus("credits_exhausted");
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch(
    (() => glmQuotaResponse()) as typeof fetch,
    async () => {
      await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
    }
  );

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "credits_exhausted");
  assert.equal(updated.lastErrorType, "permanent");
});

test("successful quota refresh does not clear terminal banned status", async () => {
  const connection = await createGlmConnectionWithStatus("banned");
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch(
    (() => glmQuotaResponse()) as typeof fetch,
    async () => {
      await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
    }
  );

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "banned");
});

test("successful quota refresh does not clear terminal expired status", async () => {
  const connection = await createGlmConnectionWithStatus("expired");
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch(
    (() => glmQuotaResponse()) as typeof fetch,
    async () => {
      await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
    }
  );

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "expired");
});

test("error-only quota response does not clear transient state", async () => {
  const connection = await createGlmConnectionWithTransientCooldown();
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch(
    (() =>
      new Response(JSON.stringify({ message: "GLM quota API error (429)" }), {
        status: 429,
        headers: { "content-type": "application/json" },
      })) as typeof fetch,
    async () => {
      await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
    }
  );

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "unavailable", "transient state should not be cleared on error");
  assert.equal(updated.lastErrorType, "rate_limited");
});
