// Image routes must feed the same per-key accounting chat does.
//
// Before this change `/v1/images/generations` and `/v1/images/edits` never
// wrote `usage_history`, so a usage-limited API key could generate images
// without its daily/weekly USD spend ever moving (apiKeyUsageLimits re-prices
// `usage_history` only). The combo path and every edit path also wrote
// `call_logs` rows without the API key and without the selected connection.
//
// Every test drives the public route handler with a real API key and a mocked
// upstream, then reads the outcome back through the same code that enforces the
// limit (`getApiKeyUsageLimitStatus` / `enforceApiKeyPolicy` on the next call).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-usage-accounting-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-usage-accounting-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

const originalFetch = globalThis.fetch;

// $/1M tokens. 25,000 image output tokens at $40/1M = $1.00 per call.
const IMAGE_PRICE = { input: 5, output: 40, cached: 1.25 };
const IMAGE_USAGE = {
  total_tokens: 25_050,
  input_tokens: 50,
  output_tokens: 25_000,
  input_tokens_details: { text_tokens: 50, image_tokens: 0 },
};
const EXPECTED_CALL_USD = 1.00025;

type UsageRow = {
  provider: string;
  model: string;
  api_key_id: string | null;
  connection_id: string | null;
  endpoint: string | null;
  combo_strategy: string | null;
  tokens_input: number;
  tokens_output: number;
  success: number;
};

type CallLogRow = {
  path: string;
  status: number;
  api_key_id: string | null;
  api_key_name: string | null;
  connection_id: string | null;
};

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-image-usage`,
    apiKey: `${provider}-upstream-key`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function createLimitedKey(weeklyUsageLimitUsd: number) {
  const created = await apiKeysDb.createApiKey("Image usage key", "machine-image-usage");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    weeklyUsageLimitUsd,
  });
  apiKeysDb.clearApiKeyCaches();
  return created;
}

async function spendOf(key: string) {
  const metadata = await apiKeysDb.getApiKeyMetadata(key);
  assert.ok(metadata, "API key metadata must exist");
  return usageLimits.getApiKeyUsageLimitStatus(metadata);
}

function usageRows(): UsageRow[] {
  return core
    .getDbInstance()
    .prepare(
      `SELECT provider, model, api_key_id, connection_id, endpoint, combo_strategy,
              tokens_input, tokens_output, success
         FROM usage_history ORDER BY id`
    )
    .all() as UsageRow[];
}

async function callLogRows(pathPrefix: string): Promise<CallLogRow[]> {
  assert.equal(await waitForCallLogSaves(5_000), true, "call log writes must settle");
  return core
    .getDbInstance()
    .prepare(
      `SELECT path, status, api_key_id, api_key_name, connection_id
         FROM call_logs WHERE path LIKE ? ORDER BY timestamp`
    )
    .all(`${pathPrefix}%`) as CallLogRow[];
}

function mockOpenAiCompatibleImageUpstream(expectedUrl: string) {
  const hits: string[] = [];
  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    assert.equal(stringUrl, expectedUrl);
    hits.push(stringUrl);
    return new Response(
      JSON.stringify({
        created: 1_790_000_000,
        data: [{ b64_json: "aW1hZ2UtYnl0ZXM=" }],
        usage: IMAGE_USAGE,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  return hits;
}

function generationRequest(key: string, model: string) {
  return new Request("http://localhost/api/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, prompt: "a lighthouse at dusk" }),
  });
}

test("direct /v1/images/generations moves the key's USD spend and the limit then blocks the key", async () => {
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(1);
  const hits = mockOpenAiCompatibleImageUpstream("https://api.openai.com/v1/images/generations");

  assert.equal((await spendOf(key.key)).weeklySpentUsd, 0);

  const response = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
  assert.equal(response.status, 200);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.usage, undefined, "client payload shape is unchanged");

  const rows = usageRows();
  assert.equal(rows.length, 1, "one usage_history row per successful image call");
  assert.equal(rows[0].provider, "openai");
  assert.equal(rows[0].model, "gpt-image-2");
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal(rows[0].connection_id, connection.id);
  assert.equal(rows[0].endpoint, "/v1/images/generations");
  assert.equal(rows[0].tokens_input, 50);
  assert.equal(rows[0].tokens_output, 25_000);

  const status = await spendOf(key.key);
  assert.equal(status.weeklySpentUsd, EXPECTED_CALL_USD);
  assert.equal(status.weeklyExceeded, true);

  // The next request with the same key is refused by the existing policy check.
  const blocked = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
  assert.equal(blocked.status, 400);
  const blockedBody = (await blocked.json()) as { error: { message: string } };
  assert.match(blockedBody.error.message, /weekly usage quota/i);
  assert.equal(hits.length, 1, "the blocked call never reaches the upstream");
});

test("image combo generation records usage and call_logs against the key and the selected connection", async () => {
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(100);
  await combosDb.createCombo({
    name: "image-usage-combo",
    strategy: "priority",
    models: ["openai/gpt-image-2"],
  });
  mockOpenAiCompatibleImageUpstream("https://api.openai.com/v1/images/generations");

  const response = await imageRoute.POST(generationRequest(key.key, "image-usage-combo"));
  assert.equal(response.status, 200);

  const rows = usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].provider, "openai");
  assert.equal(rows[0].model, "gpt-image-2");
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal(rows[0].connection_id, connection.id);
  assert.equal(rows[0].combo_strategy, "priority");
  assert.equal((await spendOf(key.key)).weeklySpentUsd, EXPECTED_CALL_USD);

  const logs = await callLogRows("/v1/images/generations");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 200);
  assert.equal(logs[0].api_key_id, key.id);
  assert.equal(logs[0].api_key_name, "Image usage key");
  assert.equal(logs[0].connection_id, connection.id);
});

test("/v1/images/edits records usage and call_logs against the key and the selected connection", async () => {
  const model = "google/gemini-3.1-flash-image-preview";
  await updatePricing({ openrouter: { [model]: IMAGE_PRICE } });
  const connection = await seedConnection("openrouter");
  const key = await createLimitedKey(100);
  mockOpenAiCompatibleImageUpstream("https://openrouter.ai/api/v1/images");

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${key.key}` },
      body: JSON.stringify({
        model: `openrouter/${model}`,
        prompt: "add a red hat",
        images: [
          `data:image/png;base64,${Buffer.from([0x89, 0x50, 0x4e, 0x47, 1]).toString("base64")}`,
        ],
      }),
    })
  );
  assert.equal(response.status, 200);

  const rows = usageRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].provider, "openrouter");
  assert.equal(rows[0].model, model);
  assert.equal(rows[0].api_key_id, key.id);
  assert.equal(rows[0].connection_id, connection.id);
  assert.equal(rows[0].endpoint, "/v1/images/edits");
  assert.equal((await spendOf(key.key)).weeklySpentUsd, EXPECTED_CALL_USD);

  const logs = await callLogRows("/v1/images/edits");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].api_key_id, key.id);
  assert.equal(logs[0].connection_id, connection.id);
});

test("an image call whose upstream reports no usage does not lock a limited key through an unpriced $0 row", async () => {
  // No pricing row for the model (the fresh-install default for most image
  // models) and no `usage` in the upstream body. A zero-token row here would
  // trip the fail-closed guard for unpriced usage (#12341) and block the key
  // for the rest of the window, so the call is attributed in call_logs only.
  const connection = await seedConnection("openai");
  const key = await createLimitedKey(100);
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ created: 1, data: [{ url: "https://cdn.example.com/a.png" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const response = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
  assert.equal(response.status, 200);
  assert.deepEqual(usageRows(), []);
  const status = await spendOf(key.key);
  assert.equal(status.weeklyExceeded, false);
  assert.equal(status.weeklyHasUnpricedUsage, false);

  const logs = await callLogRows("/v1/images/generations");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].api_key_id, key.id);
  assert.equal(logs[0].connection_id, connection.id);
});

test("an image call that reports usage for an unpriced model does not lock the key out of priced chat models", async () => {
  await updatePricing({ openai: { "gpt-4o-mini": { input: 0.15, output: 0.6, cached: 0.075 } } });
  await seedConnection("openai");
  const key = await createLimitedKey(100);
  mockOpenAiCompatibleImageUpstream("https://api.openai.com/v1/images/generations");

  const response = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-1"));
  assert.equal(response.status, 200);
  assert.deepEqual(usageRows(), []);
  const status = await spendOf(key.key);
  assert.equal(status.weeklyExceeded, false);
  assert.equal(status.weeklyHasUnpricedUsage, false);
});

test("a failed image call records no successful usage and leaves the key's spend untouched", async () => {
  await updatePricing({ openai: { "gpt-image-2": IMAGE_PRICE } });
  await seedConnection("openai");
  const key = await createLimitedKey(100);
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "upstream exploded" } }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });

  const response = await imageRoute.POST(generationRequest(key.key, "openai/gpt-image-2"));
  assert.equal(response.status, 500);
  assert.deepEqual(
    usageRows().filter((row) => row.success === 1),
    []
  );
  assert.equal((await spendOf(key.key)).weeklySpentUsd, 0);
});
