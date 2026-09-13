// Test for per-model credit exhaustion on passthrough providers (e.g. b.ai, aggregators).
// When a specific model fails with HTTP 400 "credit insufficient balance: balance=0"
// or quota exhaustion, it must lock out ONLY that model, keeping the connection active
// so other models (e.g. free models like qwen3.8-flash) on the same key remain usable.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bai-credit-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

const BAI_INSUFFICIENT_BALANCE_400 =
  "[400]: credit insufficient balance: balance=0 required=6792 (request id: 20260913093939137112807c955d5685unboZPV)";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

interface SeededConn {
  id: string;
}

async function seedConnection(
  provider: string,
  extra: Record<string, unknown> = {}
): Promise<SeededConn> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: "test-key",
    isActive: true,
    testStatus: "active",
    ...extra,
  });
  return conn as unknown as SeededConn;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("b.ai HTTP 400 credit insufficient balance locks only the requested model, connection stays active", async () => {
  await resetStorage();
  accountFallback.clearAllModelLockouts();

  const conn = await seedConnection("bai", {
    name: "ggdayup",
  });

  const result = await auth.markAccountUnavailable(
    conn.id,
    400,
    BAI_INSUFFICIENT_BALANCE_400,
    "bai",
    "glm-5.3-flash"
  );

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);

  // Connection must NOT be terminated or rate-limited connection-wide
  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after?.testStatus, "active", "connection testStatus must remain active");
  assert.ok(!after?.rateLimitedUntil, "connection rateLimitedUntil must not be set");
  assert.equal(after?.lastErrorType, "quota_exhausted");
  assert.equal(Number(after?.errorCode), 400);

  // The paid/exhausted model is locked out for this connection
  const glmLockout = accountFallback.getModelLockoutInfo("bai", conn.id, "glm-5.3-flash");
  assert.ok(glmLockout, "glm-5.3-flash must be locked out");
  assert.equal(glmLockout?.reason, "quota_exhausted");

  // Other models on b.ai (e.g. free model qwen3.8-flash) remain eligible
  const qwenLockout = accountFallback.getModelLockoutInfo("bai", conn.id, "qwen3.8-flash");
  assert.equal(qwenLockout, null, "qwen3.8-flash must not be locked out");
});

test("compatible provider HTTP 400 insufficient balance locks only the model", async () => {
  await resetStorage();
  accountFallback.clearAllModelLockouts();

  const conn = await seedConnection("openai-compatible-chat-123", {
    name: "aggregator",
    providerSpecificData: { passthroughModels: true },
  });

  const result = await auth.markAccountUnavailable(
    conn.id,
    400,
    "insufficient balance for model claude-3-opus",
    "openai-compatible-chat-123",
    "claude-3-opus"
  );

  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after?.testStatus, "active");
  assert.ok(!after?.rateLimitedUntil);

  const opusLockout = accountFallback.getModelLockoutInfo(
    "openai-compatible-chat-123",
    conn.id,
    "claude-3-opus"
  );
  assert.ok(opusLockout);
  assert.equal(opusLockout?.reason, "quota_exhausted");

  const freeLockout = accountFallback.getModelLockoutInfo(
    "openai-compatible-chat-123",
    conn.id,
    "free-llama-3"
  );
  assert.equal(freeLockout, null);
});

test("single-model non-passthrough provider (openai) still terminates connection on credit exhaustion", async () => {
  await resetStorage();
  accountFallback.clearAllModelLockouts();

  const conn = await seedConnection("openai", {
    name: "openai-account",
  });

  const result = await auth.markAccountUnavailable(
    conn.id,
    400,
    "insufficient balance",
    "openai",
    "gpt-4o"
  );

  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(
    after?.testStatus,
    "credits_exhausted",
    "single-model provider must be marked credits_exhausted"
  );
});
