import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-auxiliary-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "exclusive-lease-auxiliary-test-secret";

let externalCalls = 0;
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  externalCalls += 1;
  throw new Error("unexpected external provider/model call");
};

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const leases = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const translator = await import("../../src/app/api/translator/send/route.ts");
const translatorPreview = await import("../../src/app/api/translator/translate/route.ts");
const modelTests = await import("../../src/lib/api/modelTestRunner.ts");
const vnc = await import("../../src/lib/vncSession/service.ts");
const usageRoute = await import("../../src/app/api/usage/[connectionId]/route.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

const OWNER = "vlo_UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU";

async function seedConnection(name: string, provider = "openai"): Promise<{ id: string }> {
  return (await providers.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    isActive: true,
    testStatus: "active",
    priority: 1,
    providerSpecificData: {},
  })) as { id: string };
}

async function markLeaseOnly(connectionId: string): Promise<void> {
  await apiKeys.createApiKey("managed auxiliary", "test", ["lease:exclusive"], {
    allowedConnections: [connectionId],
  });
}

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  externalCalls = 0;
  globalThis.fetch = async () => {
    externalCalls += 1;
    throw new Error("unexpected external provider/model call");
  };
}

test.beforeEach(resetStorage);
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("translator send accepts a FREE lease-capable connection and attempts provider fetch", async () => {
  const connection = await seedConnection("translator-free-lease");
  await markLeaseOnly(connection.id);

  const _response = await translator.POST(
    new Request("http://omniroute.local/api/translator/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "openai",
        body: { model: "gpt-4.1-mini", messages: [{ role: "user", content: "test" }] },
      }),
    })
  );

  assert.equal(externalCalls, 1);
});

test("translator send excludes an ACTIVE leased connection before provider fetch", async () => {
  const connection = await seedConnection("translator-active-lease");
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "managed-key",
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");

  const response = await translator.POST(
    new Request("http://omniroute.local/api/translator/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "openai",
        body: { model: "gpt-4.1-mini", messages: [{ role: "user", content: "test" }] },
      }),
    })
  );

  assert.equal(response.status, 400);
  assert.equal(externalCalls, 0);
});

test("translator request preview materializes a FREE lease-capable credential", async () => {
  const connection = await seedConnection("translator-preview-free-lease");
  await markLeaseOnly(connection.id);

  const response = await translatorPreview.POST(
    new Request("http://omniroute.local/api/translator/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        step: 4,
        provider: "openai",
        body: { model: "gpt-4.1-mini", messages: [{ role: "user", content: "test" }] },
      }),
    })
  );
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.equal(body.includes("sk-translator-preview-free-lease"), true);
  assert.equal(externalCalls, 0);
});

test("translator request preview never materializes an ACTIVE leased credential", async () => {
  const connection = await seedConnection("translator-preview-active-lease");
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "managed-key",
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");

  const response = await translatorPreview.POST(
    new Request("http://omniroute.local/api/translator/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        step: 4,
        provider: "openai",
        body: { model: "gpt-4.1-mini", messages: [{ role: "user", content: "test" }] },
      }),
    })
  );
  const body = await response.text();

  assert.equal(response.status, 400);
  assert.equal(body.includes("sk-translator-preview-active-lease"), false);
  assert.equal(externalCalls, 0);
});

test("browser-login start accepts FREE lease-capable connection past isolation check", async () => {
  const connection = await seedConnection("vnc-free-lease");
  await markLeaseOnly(connection.id);

  await assert.rejects(
    vnc.startSession(connection.id),
    /Browser login is not supported for provider 'openai'/
  );
  assert.equal(externalCalls, 0);
});

test("browser-login start rejects ACTIVE leased connections before Docker or provider access", async () => {
  const connection = await seedConnection("vnc-active-lease-start");
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "managed-key",
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");

  await assert.rejects(
    vnc.startSession(connection.id),
    /unavailable for managed lease connections/
  );
  assert.equal(externalCalls, 0);
});

test("forced model tests accept FREE lease-capable connections and attempt model dispatch", async () => {
  await apiKeys.createApiKey("internal test key", "test");
  const connection = await seedConnection("model-test-free-lease");
  await markLeaseOnly(connection.id);

  const result = await modelTests.runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4.1-mini",
    connectionId: connection.id,
  });

  assert.notEqual(result.httpStatus, 409);
  assert.doesNotMatch(result.error || "", /unavailable for managed lease connections/);
  assert.equal(externalCalls, 1);
});

test("forced model tests reject ACTIVE leased connections before any model dispatch", async () => {
  const connection = await seedConnection("model-test-active-lease");
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "managed-key",
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");

  const result = await modelTests.runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4.1-mini",
    connectionId: connection.id,
  });

  assert.equal(result.httpStatus, 409);
  assert.equal(externalCalls, 0);
});

test("browser-login harvest rejects ACTIVE leased connections before credential mutation", async () => {
  const connection = await seedConnection("vnc-active-lease");
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "managed-key",
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");

  await assert.rejects(
    vnc.harvestSession(connection.id, "missing-session"),
    /unavailable for managed lease connections/
  );
  assert.equal(externalCalls, 0);
});

test("usage refresh allows FREE lease-reserved connection and queries provider quota", async () => {
  const connection = await seedConnection("deepseek-free-lease", "deepseek");
  await markLeaseOnly(connection.id);

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

  const response = await usageRoute.GET(
    new Request(`http://omniroute.local/api/usage/${connection.id}`),
    { params: Promise.resolve({ connectionId: connection.id }) }
  );

  assert.equal(response.status, 200);
  assert.equal(externalCalls, 1);
  const data = (await response.json()) as { quotas?: { credits_usd?: { remaining?: number } } };
  assert.equal(data?.quotas?.credits_usd?.remaining, 10);
});

test("usage refresh allows ACTIVE leased connection and queries provider quota", async () => {
  const connection = await seedConnection("deepseek-active-lease", "deepseek");
  await markLeaseOnly(connection.id);
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "managed-key",
    provider: "deepseek",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");

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

  const response = await usageRoute.GET(
    new Request(`http://omniroute.local/api/usage/${connection.id}`),
    { params: Promise.resolve({ connectionId: connection.id }) }
  );

  assert.equal(response.status, 200);
  assert.equal(externalCalls, 1);
  const data = (await response.json()) as { quotas?: { credits_usd?: { remaining?: number } } };
  assert.equal(data?.quotas?.credits_usd?.remaining, 10);
});

test("syncAllProviderLimits refreshes all active supported connections regardless of lease state", async () => {
  const freeConn = await seedConnection("deepseek-bulk-free", "deepseek");
  const activeConn = await seedConnection("deepseek-bulk-active", "deepseek");
  await markLeaseOnly(freeConn.id);
  await markLeaseOnly(activeConn.id);

  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "managed-key",
    provider: "deepseek",
    connectionId: activeConn.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");

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

  const result = await providerLimits.syncAllProviderLimits({
    source: "manual",
    concurrency: 2,
  });

  assert.ok(result.caches[freeConn.id]);
  assert.ok(result.caches[activeConn.id]);
  assert.equal(externalCalls, 2);
});
