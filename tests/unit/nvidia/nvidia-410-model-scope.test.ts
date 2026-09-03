import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-nvidia-410-model-scope-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "nvidia-410-model-scope-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const auth = await import("../../../src/sse/services/auth.ts");
const fallback = await import("../../../open-sse/services/accountFallback.ts");

const DEAD_MODEL = "deepseek-ai/deepseek-v4-pro";
const HEALTHY_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b";

const GONE_BODY = JSON.stringify({
  type: "about:blank",
  title: "Gone",
  status: 410,
  detail:
    "The model 'deepseek-ai/deepseek-v4-pro' has reached its end of life " +
    "and is no longer available.",
});

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedNvidiaConnection() {
  return providersDb.createProviderConnection({
    provider: "nvidia",
    authType: "apikey",
    name: "nvidia-410-model-scope",
    apiKey: "sk-nvidia-410-model-scope",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("NVIDIA 410 Gone stays model-scoped and leaves the connection usable", async () => {
  const connection = await seedNvidiaConnection();

  assert.equal(
    fallback.hasPerModelQuota("nvidia", DEAD_MODEL),
    true,
    "NVIDIA must use per-model failure scoping"
  );

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    GONE_BODY,
    "nvidia",
    DEAD_MODEL
  );

  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(
    after?.rateLimitedUntil ?? null,
    null,
    "410 for one retired NVIDIA model must not apply a connection-wide cooldown"
  );

  assert.equal(
    after?.testStatus,
    "active",
    "410 for one retired NVIDIA model must leave the NVIDIA connection active"
  );

  assert.equal(
    fallback.isModelLocked("nvidia", connection.id, DEAD_MODEL),
    true,
    "the retired model itself should be locked"
  );

  assert.equal(
    fallback.isModelLocked("nvidia", connection.id, HEALTHY_MODEL),
    false,
    "a healthy sibling NVIDIA model must remain unlocked"
  );

  const healthyCredentials = await auth.getProviderCredentials("nvidia", null, null, HEALTHY_MODEL);

  assert.equal(
    healthyCredentials?.connectionId,
    connection.id,
    "the same NVIDIA connection must remain selectable for healthy sibling models"
  );
});

test("non-per-model provider keeps 410 connection-scoped", async () => {
  assert.equal(
    fallback.hasPerModelQuota("openai", DEAD_MODEL),
    false,
    "plain OpenAI API-key connections are not per-model quota providers"
  );

  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-410-connection-scope",
    apiKey: "sk-openai-410-connection-scope",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    "Gone",
    "openai",
    DEAD_MODEL
  );

  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.ok(
    after?.rateLimitedUntil,
    "non-per-model providers should retain the existing connection-level 410 behavior"
  );

  assert.equal(
    after?.testStatus,
    "unavailable",
    "410 model scoping must not be applied globally to every provider"
  );
});

test("other per-model providers retain existing 410 connection scope", async () => {
  assert.equal(
    fallback.hasPerModelQuota("gemini", DEAD_MODEL),
    true,
    "Gemini provides a non-NVIDIA per-model control case"
  );

  const connection = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "gemini-410-control",
    apiKey: "sk-gemini-410-control",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    "Gone",
    "gemini",
    DEAD_MODEL
  );

  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.ok(
    after?.rateLimitedUntil,
    "410 must remain connection-scoped for per-model providers without an explicit 410 contract"
  );

  assert.equal(
    after?.testStatus,
    "unavailable",
    "the NVIDIA-specific 410 fix must not change other provider semantics"
  );

  assert.equal(
    fallback.isModelLocked("gemini", connection.id, DEAD_MODEL),
    false,
    "a generic per-model provider must not inherit NVIDIA's 410 model lock"
  );
});
