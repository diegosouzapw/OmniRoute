// Model discovery for the built-in `openrouter` provider was pinned to the
// GLOBAL catalog URL in PROVIDER_MODELS_CONFIG
// ("https://openrouter.ai/api/v1/models"), so the per-connection base-URL
// override ("Advanced → override base URL", stored as
// providerSpecificData.baseUrl) was silently ignored on the DISCOVERY path —
// while the INFERENCE path honored it all along
// (open-sse/executors/base.ts `resolveBaseUrl`: "Operator's manual override
// always wins (#6147)").
//
// Consequence: a connection pointed at a different OpenRouter region (for
// example the EU in-region endpoint https://eu.openrouter.ai/api/v1) kept
// importing the global catalog, so the per-connection model list — and the
// auto-sync that maintains it — advertised models that the configured endpoint
// cannot serve. Those ids only failed later, at inference time, which made the
// misconfiguration look like a provider outage rather than a catalog mismatch.
//
// The two OpenRouter catalogs genuinely differ: the global endpoint advertises
// ~444 model ids, the EU in-region endpoint ~58 (a strict subset).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openrouter-baseurl-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

const EU_BASE_URL = "https://eu.openrouter.ai/api/v1";
const GLOBAL_CATALOG_URL = "https://openrouter.ai/api/v1/models";

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOpenRouterConnection(providerSpecificData: Record<string, unknown>) {
  return providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: `openrouter-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "[REDACTED:auth_header]",
    isActive: true,
    testStatus: "active",
    providerSpecificData,
  });
}

async function discover(connectionId: string) {
  const seenUrls: string[] = [];
  globalThis.fetch = async (url) => {
    seenUrls.push(String(url));
    return Response.json({ data: [{ id: "openai/gpt-5.6-luna", name: "GPT-5.6 Luna" }] });
  };

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models?refresh=true`),
    { params: { id: connectionId } }
  );
  return { response, seenUrls };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("openrouter model discovery honors the per-connection base URL override", async () => {
  const connection = await seedOpenRouterConnection({ baseUrl: EU_BASE_URL });

  const { response, seenUrls } = await discover(connection.id);
  assert.equal(response.status, 200);

  assert.ok(
    seenUrls.some((url) => url.startsWith(`${EU_BASE_URL}/models`)),
    `expected discovery against the overridden base URL, got: ${JSON.stringify(seenUrls)}`
  );
  assert.ok(
    !seenUrls.some((url) => url.startsWith(GLOBAL_CATALOG_URL)),
    `expected the hardcoded global catalog NOT to be used, got: ${JSON.stringify(seenUrls)}`
  );
});

test("openrouter discovery still uses the built-in global catalog when no override is set", async () => {
  const connection = await seedOpenRouterConnection({});

  const { response, seenUrls } = await discover(connection.id);
  assert.equal(response.status, 200);

  assert.ok(
    seenUrls.some((url) => url.startsWith(GLOBAL_CATALOG_URL)),
    `expected the built-in global catalog, got: ${JSON.stringify(seenUrls)}`
  );
});
