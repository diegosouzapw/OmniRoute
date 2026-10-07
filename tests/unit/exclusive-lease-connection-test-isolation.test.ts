import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-test-isolation-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

let externalCalls = 0;
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  externalCalls += 1;
  throw new Error("unexpected external provider/model call");
};

const core = await import("../../src/lib/db/core.ts");
const leases = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const providerModels = await import("../../src/app/api/providers/[id]/models/route.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");
const codexResetCredits = await import("../../src/lib/usage/codexResetCredits.ts");

const OWNER = "vlo_TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT";

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("connection verification skips an ACTIVE exclusive lease before any probe or mutation", async () => {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO provider_connections
     (id, provider, auth_type, name, api_key, is_active, test_status, created_at, updated_at)
     VALUES (?, ?, 'apikey', ?, ?, 1, 'active', ?, ?)`
  ).run(
    "leased-test-connection",
    "openai",
    "leased test connection",
    "synthetic-key",
    new Date().toISOString(),
    new Date().toISOString()
  );
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "managed-key",
    provider: "openai",
    connectionId: "leased-test-connection",
  });
  assert.equal(acquired.kind, "ACQUIRED");

  const result = await testSingleConnection("leased-test-connection");

  assert.equal(result.valid, false);
  assert.equal(result.skipped, true);
  assert.equal(result.diagnosis?.code, "exclusive_lease_active");
  assert.equal(externalCalls, 0);
  const row = db
    .prepare("SELECT test_status, last_tested, last_error FROM provider_connections WHERE id = ?")
    .get("leased-test-connection") as {
    test_status: string;
    last_tested: string | null;
    last_error: string | null;
  };
  assert.equal(row.test_status, "active");
  assert.equal(row.last_tested, null);
  assert.equal(row.last_error, null);
});

test("model discovery and reset-credit paths reject ACTIVE leased connections", async () => {
  const response = await providerModels.GET(
    new Request("http://omniroute.local/api/providers/leased-test-connection/models"),
    { params: { id: "leased-test-connection" } }
  );
  assert.equal(response.status, 409);

  await assert.rejects(
    codexResetCredits.listCodexResetCredits("leased-test-connection"),
    (error: unknown) =>
      error instanceof Error &&
      (error as Error & { status?: number }).status === 409 &&
      /exclusive lease/i.test(error.message)
  );
  assert.equal(externalCalls, 0);
});

test("quota refresh proceeds on an ACTIVE leased usage-supported connection", async () => {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO provider_connections
     (id, provider, auth_type, name, api_key, is_active, test_status, created_at, updated_at)
     VALUES (?, ?, 'apikey', ?, ?, 1, 'active', ?, ?)`
  ).run(
    "leased-quota-connection",
    "deepseek",
    "leased quota connection",
    "synthetic-deepseek-key",
    new Date().toISOString(),
    new Date().toISOString()
  );
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: "vlo_QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",
    apiKeyId: "managed-quota-key",
    provider: "deepseek",
    connectionId: "leased-quota-connection",
  });
  assert.equal(acquired.kind, "ACQUIRED");

  externalCalls = 0;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    externalCalls += 1;
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    if (url === "https://api.deepseek.com/user/balance") {
      return new Response(
        JSON.stringify({
          is_available: true,
          balance_infos: [
            {
              currency: "USD",
              total_balance: "10.00",
              granted_balance: "0.00",
              topped_up_balance: "10.00",
            },
          ],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    throw new Error(`unexpected fetch call: ${url}`);
  };

  const result = await providerLimits.fetchLiveProviderLimits("leased-quota-connection");
  assert.equal(result.connection.id, "leased-quota-connection");
  const quotas = result.usage.quotas as { credits_usd?: { remaining?: number } };
  assert.equal(quotas?.credits_usd?.remaining, 10);
  assert.equal(externalCalls, 1);
});
