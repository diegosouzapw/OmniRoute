import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-exact-key-health-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

const originalFetch = globalThis.fetch;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const { selfFetchWithRetry } =
  await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const { getAllKeyHealth, recordKeyFailure, removeConnectionHealth } =
  await import("../../open-sse/services/apiKeyRotator.ts");

type StoredKeyHealth = {
  status: "active" | "warning" | "invalid";
  failures: number;
  lastFailure: string | null;
  lastSuccess: string | null;
  totalRequests: number;
  totalFailures: number;
};

const WARNING_HEALTH: StoredKeyHealth = {
  status: "warning",
  failures: 1,
  lastFailure: "2026-08-26T01:00:00.000Z",
  lastSuccess: null,
  totalRequests: 1,
  totalFailures: 1,
};

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createConnection(args: {
  name: string;
  rateLimitedUntil?: string | null;
  primary?: StoredKeyHealth;
  extra?: StoredKeyHealth;
}) {
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: args.name,
    apiKey: `test-key-${args.name}`,
    testStatus: args.rateLimitedUntil ? "unavailable" : "active",
    rateLimitedUntil: args.rateLimitedUntil ?? null,
    providerSpecificData: {
      extraApiKeys: [`test-extra-${args.name}`],
      apiKeyHealth: {
        ...(args.primary ? { primary: args.primary } : {}),
        ...(args.extra ? { extra_0: args.extra } : {}),
      },
    },
  });
  assert.ok(created?.id);
  return created as { id: string };
}

test.beforeEach(async () => {
  await resetStorage();
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ data: [{ id: "available-model" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("authoritative validation clears only the exact primary credential during a quota cooldown", async () => {
  const cooldown = new Date(Date.now() + 60_000).toISOString();
  const connection = await createConnection({
    name: "primary-recovery",
    rateLimitedUntil: cooldown,
    primary: WARNING_HEALTH,
    extra: WARNING_HEALTH,
  });

  const result = await testSingleConnection(connection.id);
  assert.equal(result.valid, true);

  const updated = await providersDb.getProviderConnectionById(connection.id);
  const health = updated.providerSpecificData?.apiKeyHealth as Record<string, StoredKeyHealth>;

  assert.equal(health.primary.status, "active");
  assert.equal(health.primary.failures, 0);
  assert.equal(health.extra_0.status, "warning");
  assert.equal(health.extra_0.failures, 1);
  assert.equal(
    updated.rateLimitedUntil,
    cooldown,
    "credential success must preserve quota cooldown"
  );

  const inMemory = getAllKeyHealth();
  assert.equal(inMemory[`${connection.id}:primary`]?.status, "active");
  assert.equal(inMemory[`${connection.id}:extra_0`]?.status, "warning");
  removeConnectionHealth(connection.id);
});

test("validating the primary key cannot clear a warning on another key", async () => {
  const connection = await createConnection({
    name: "other-key-isolation",
    extra: WARNING_HEALTH,
  });

  const result = await testSingleConnection(connection.id);
  assert.equal(result.valid, true);

  const updated = await providersDb.getProviderConnectionById(connection.id);
  const health = updated.providerSpecificData?.apiKeyHealth as Record<string, StoredKeyHealth>;
  assert.equal(health.primary, undefined);
  assert.equal(health.extra_0.status, "warning");
  assert.equal(health.extra_0.failures, 1);
  removeConnectionHealth(connection.id);
});

test("model-sync 409 remains model telemetry and cannot mutate API-key health", async () => {
  const connectionId = "model-sync-conflict";
  const before = recordKeyFailure(connectionId, "primary");

  const response = await selfFetchWithRetry("http://127.0.0.1/models", {
    fetch: async () =>
      new Response(JSON.stringify({ error: "Model discovery deferred" }), { status: 409 }),
    maxRetries: 1,
    skipReadinessGate: true,
  });

  assert.equal(response.status, 409);
  assert.deepEqual(getAllKeyHealth()[`${connectionId}:primary`], before);
  removeConnectionHealth(connectionId);
});
