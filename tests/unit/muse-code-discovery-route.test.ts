/**
 * Muse Code subscription discovery through the real models route: an OAuth
 * connection's subscription key drives live Meta catalog discovery, and the
 * returned catalog reflects the account's models rather than the static
 * registry. Upstream Meta traffic is stubbed; SQLite runs isolated per file.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-muse-discovery-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Import the route (and its fetch chain) at file load, before any test
// stubs globalThis.fetch, so proxy helpers pin the real native fetch.
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

type SeenRequest = {
  url: string;
  method: string;
  authorization: string | null;
};

const FAKE_SUBSCRIPTION_KEY = ["test-discovery-subscription-key-", "z".repeat(12)].join("");

async function resetStorage(): Promise<void> {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedOAuthConnection() {
  return providersDb.createProviderConnection({
    provider: "muse-code",
    authType: "oauth",
    name: "muse-discovery-test",
    accessToken: FAKE_SUBSCRIPTION_KEY,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { accountId: "user-123", isSubsActive: true },
  });
}

test("muse-code OAuth discovery returns the account catalog with the subscription bearer", async () => {
  const connection = await seedOAuthConnection();
  const seen: SeenRequest[] = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const requestUrl = String(url);
    const headers = new Headers(init?.headers as HeadersInit | undefined);
    seen.push({
      url: requestUrl,
      method: (init?.method || "GET").toUpperCase(),
      authorization: headers.get("authorization"),
    });
    if (requestUrl === "https://api.meta.ai/v1/models") {
      return Response.json({
        data: [
          { id: "muse-spark-1.3-contributor", object: "model" },
          { id: "muse-spark-1.2", object: "model" },
        ],
      });
    }
    throw new Error(`Unexpected fetch: ${requestUrl}`);
  }) as typeof globalThis.fetch;

  const response = await modelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  try {
    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      source?: string;
      models?: Array<{ id: string }>;
    };
    assert.equal(body.source, "api");
    const ids = (body.models ?? []).map((model) => model.id);
    assert.ok(ids.includes("muse-spark-1.3-contributor"), `live Spark id missing: ${ids}`);
    assert.ok(ids.includes("muse-spark-1.2"), `live Spark id missing: ${ids}`);
    assert.ok(!ids.includes("llama-4-maverick"), `static-only id leaked into live catalog: ${ids}`);
    const discoveryCall = seen.find((call) => call.url === "https://api.meta.ai/v1/models");
    assert.ok(discoveryCall, "expected a live Meta discovery request");
    assert.equal(discoveryCall?.method, "GET");
    assert.equal(discoveryCall?.authorization, `Bearer ${FAKE_SUBSCRIPTION_KEY}`);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
