// #8082: the built-in `poe` provider (passthroughModels:true, no baseUrl field
// exposed in the UI) is routed through the generic OpenAI-style model-discovery
// branch, which resolves its base URL ONLY from
// `connection.providerSpecificData.baseUrl` OR `getRegistryEntry("poe")?.baseUrl`.
// There was no REGISTRY entry for "poe", so discovery always failed with
// {"error":"No base URL configured for provider"} even though the actual
// inference/validation path (src/lib/providers/validation/audioMiscProviders.ts)
// has always had a hardcoded "https://api.poe.com/v1" fallback and worked fine.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-poe-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("provider models route resolves the built-in Poe registry base URL instead of failing with 'No base URL configured for provider' (#8082)", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "poe",
    authType: "apikey",
    name: "poe-8082",
    apiKey: "poe-test-key",
    isActive: true,
    testStatus: "active",
    // Mirrors the built-in provider's UI: no baseUrl field is exposed for Poe,
    // so providerSpecificData never carries one.
    providerSpecificData: {},
  });

  const seenRequests: Array<{ url: string; authorization: string | null }> = [];
  globalThis.fetch = async (url, init) => {
    const headers = new Headers(init?.headers as HeadersInit | undefined);
    seenRequests.push({ url: String(url), authorization: headers.get("authorization") });
    return Response.json({ data: [{ id: "gpt-5.2", name: "GPT-5.2" }] });
  };

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { error?: string };

  assert.notEqual(body.error, "No base URL configured for provider");
  assert.equal(response.status, 200);
  assert.ok(
    seenRequests.some((req) => req.url.startsWith("https://api.poe.com/v1")),
    `expected a request against the Poe registry base URL, got: ${JSON.stringify(seenRequests)}`
  );
});
