import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-cooldown-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "embed-cooldown-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: `${provider}-key`,
    isActive: true,
    testStatus: "active",
  });
  return (conn as Record<string, unknown>).id as string;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#10347: markAccountUnavailable triggers cooldown on embedding 402", async () => {
  await resetStorage();
  const connId = await seedConnection("mistral");

  const result = await auth.markAccountUnavailable(
    connId,
    402,
    "Check your subscription on https://admin.mistral.ai/subscription",
    "mistral",
    "mistral-embed"
  );

  assert.strictEqual(result.shouldFallback, true, "402 must trigger account cooldown");

  // Verify the connection was marked — 402 is terminal (credits_exhausted),
  // which sets testStatus but not rateLimitedUntil
  const conn = await providersDb.getProviderConnectionById(connId);
  assert.strictEqual(
    conn.testStatus,
    "credits_exhausted",
    "402 must mark connection credits_exhausted"
  );
});

test("#10347: markAccountUnavailable triggers cooldown on embedding 500", async () => {
  await resetStorage();
  const connId = await seedConnection("mistral");

  const result = await auth.markAccountUnavailable(
    connId,
    500,
    "Internal server error",
    "mistral",
    "mistral-embed"
  );

  assert.strictEqual(result.shouldFallback, true, "500 must trigger account cooldown");
  const conn = await providersDb.getProviderConnectionById(connId);
  assert.strictEqual(conn.testStatus, "unavailable", "500 must mark connection unavailable");
});

test("#10347: embedding 400 (bad request) does NOT trigger account cooldown", async () => {
  await resetStorage();
  const connId = await seedConnection("mistral");

  // 400 bad request is a client error, not an account issue — should not cool down
  const result = await auth.markAccountUnavailable(
    connId,
    400,
    "Invalid embedding input format",
    "mistral",
    "mistral-embed"
  );

  // Generic 400 returns shouldFallback:false (not account-fallback-worthy)
  assert.strictEqual(result.shouldFallback, false, "400 bad request must not trigger cooldown");
  const conn = await providersDb.getProviderConnectionById(connId);
  assert.strictEqual(conn.testStatus, "active", "400 must keep connection active");
});
