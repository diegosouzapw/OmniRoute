/**
 * openai-compatible multi-upstream gateways must not poison the whole
 * connection when a single upstream returns 402. CredentialHealth probes
 * (/models or a representative model) and per-key 402 handling stay
 * model-scoped; true connection-wide auth failures remain connection-scoped.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compat-402-health-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { recordKeyHealthStatus } = await import("../../open-sse/handlers/chatCore/keyHealth.ts");
const { getAllKeyHealth, resetKeyStatus } =
  await import("../../open-sse/services/apiKeyRotator.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const { buildApiKeyConnectionTestResult } =
  await import("../../src/app/api/providers/[id]/test/apiKeyTestResult.ts");

const COMPAT_PROVIDER = "openai-compatible-chat-402-health";
const PAID_MODEL = "paid-upstream-model";
const FREE_MODEL = "free-upstream-model";
const CREDITS_402 = "Add credits to continue, or switch to a free model";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedCompatibleConnection(overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider: COMPAT_PROVIDER,
    authType: "apikey",
    apiKey: "sk-compat-gateway",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://gateway.example.test/v1",
      validationModelId: PAID_MODEL,
    },
    ...overrides,
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

test("valid 402 status is preserved so CredentialHealth can lock only the probed model", () => {
  const result = buildApiKeyConnectionTestResult(
    { valid: true, warning: "per-model 402", statusCode: 402 },
    null,
    { type: "ok", source: "upstream", message: null, code: null }
  );
  assert.equal(result.valid, true);
  assert.equal(result.statusCode, 402);
});

test("live 402 on one openai-compatible model keeps the connection active", async () => {
  await resetStorage();
  const conn = await seedCompatibleConnection();

  const result = await auth.markAccountUnavailable(
    (conn as { id: string }).id,
    402,
    CREDITS_402,
    COMPAT_PROVIDER,
    PAID_MODEL
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById((conn as { id: string }).id);
  assert.equal(after.testStatus, "active");
  assert.notEqual(after.testStatus, "credits_exhausted");

  const paidLockout = accountFallback.getModelLockoutInfo(
    COMPAT_PROVIDER,
    (conn as { id: string }).id,
    PAID_MODEL
  );
  assert.equal(paidLockout?.reason, "credits");

  const freeLockout = accountFallback.getModelLockoutInfo(
    COMPAT_PROVIDER,
    (conn as { id: string }).id,
    FREE_MODEL
  );
  assert.equal(freeLockout, null);

  const selected = await auth.getProviderCredentials(COMPAT_PROVIDER, null, null, FREE_MODEL);
  assert.ok(selected, "sibling model must still resolve credentials on the same connection");
  assert.equal(selected.connectionId, (conn as { id: string }).id);
});

test("402 on an openai-compatible key does not invalidate the credential for sibling models", () => {
  const connId = "openai-compatible-chat-key-402";
  recordKeyHealthStatus(402, {
    connectionId: connId,
    provider: COMPAT_PROVIDER,
    apiKey: "sk-compat-gateway",
    providerSpecificData: {},
  });

  assert.equal(
    getAllKeyHealth()[`${connId}:primary`],
    undefined,
    "per-model 402 must not mark the openai-compatible key invalid"
  );
  resetKeyStatus(connId, "primary");
});

test("402 still terminalizes a single-credential OpenAI key (#5239)", () => {
  const connId = "openai-single-key-402";
  recordKeyHealthStatus(402, {
    connectionId: connId,
    provider: "openai",
    apiKey: "sk-openai",
    providerSpecificData: {},
  });

  assert.equal(getAllKeyHealth()[`${connId}:primary`]?.status, "invalid");
  resetKeyStatus(connId, "primary");
});

test("CredentialHealth representative-model 402 stays connection-active and model-scoped", async () => {
  await resetStorage();
  const conn = await seedCompatibleConnection();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: CREDITS_402 }), { status: 402 });
  };

  try {
    const probe = await testSingleConnection((conn as { id: string }).id, PAID_MODEL);
    assert.equal(probe.valid, true);
    assert.equal(probe.statusCode, 402);

    const after = await providersDb.getProviderConnectionById((conn as { id: string }).id);
    assert.equal(after.testStatus, "active");
    assert.notEqual(after.testStatus, "credits_exhausted");
    assert.notEqual(after.testStatus, "error");

    const paidLockout = accountFallback.getModelLockoutInfo(
      COMPAT_PROVIDER,
      (conn as { id: string }).id,
      PAID_MODEL
    );
    assert.equal(paidLockout?.reason, "credits");

    const freeLockout = accountFallback.getModelLockoutInfo(
      COMPAT_PROVIDER,
      (conn as { id: string }).id,
      FREE_MODEL
    );
    assert.equal(freeLockout, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CredentialHealth /models 402 does not fail the openai-compatible connection", async () => {
  await resetStorage();
  const conn = await seedCompatibleConnection({
    providerSpecificData: { baseUrl: "https://gateway.example.test/v1" },
  });
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "Payment required" }), { status: 402 });

  try {
    const probe = await testSingleConnection((conn as { id: string }).id);
    assert.equal(probe.valid, true);

    const after = await providersDb.getProviderConnectionById((conn as { id: string }).id);
    assert.equal(after.testStatus, "active");
    assert.notEqual(after.testStatus, "credits_exhausted");
    assert.notEqual(after.testStatus, "error");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
