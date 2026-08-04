import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #4259: Cloudflare Workers AI `/ai/models/search` returns objects shaped like
// `{ id: "<uuid>", name: "@cf/meta/llama-3.1-8b-instruct" }` — the human-usable
// model identifier is `name`, while `id` is an internal UUID. Discovery must use
// `name` as the callable model id; otherwise the dashboard/import shows UUIDs.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cf-models-4259-"));
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

async function seedConnection(provider: string, overrides: Record<string, any> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

async function callRoute(connectionId: string, search = "") {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models${search}`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#4259 cloudflare-ai discovery uses the model name (slug) as id, not the UUID", async () => {
  const connection = await seedConnection("cloudflare-ai", {
    apiKey: "cf-token",
    providerSpecificData: { accountId: "acc-123" },
  });

  const LLAMA_UUID = "429b9e8b-d99e-44de-91ad-706cf8183658";
  const QWEN_UUID = "f8703a00-ed54-4c83-bcd9-706cf8183999";

  let calledUrl = "";
  globalThis.fetch = (async (url: any) => {
    calledUrl = String(url);
    return Response.json({
      result: [
        {
          id: LLAMA_UUID,
          name: "@cf/meta/llama-3.1-8b-instruct",
          description: "Llama 3.1 8B Instruct",
          task: { name: "Text Generation" },
        },
        {
          id: QWEN_UUID,
          name: "@cf/qwen/qwen1.5-0.5b-chat",
          description: "Qwen 1.5 0.5B Chat",
          task: { name: "Text Generation" },
        },
      ],
    });
  }) as typeof fetch;

  const response = await callRoute(connection.id, "?refresh=true");
  assert.equal(response.status, 200);

  // Sanity: hit the Cloudflare models search endpoint with the configured account.
  assert.ok(
    calledUrl.includes("/accounts/acc-123/ai/models/search"),
    `unexpected discovery URL: ${calledUrl}`
  );

  const body = await response.json();
  assert.equal(body.source, "api");
  const ids: string[] = body.models.map((m: any) => m.id);

  // The human-usable slug must be the id (RED before the fix — id was the UUID).
  assert.ok(
    ids.includes("@cf/meta/llama-3.1-8b-instruct"),
    `expected slug id, got ${JSON.stringify(ids)}`
  );
  assert.ok(
    ids.includes("@cf/qwen/qwen1.5-0.5b-chat"),
    `expected slug id, got ${JSON.stringify(ids)}`
  );
  // The internal UUID must never be exposed as a callable model id.
  assert.ok(!ids.includes(LLAMA_UUID), "UUID must not be used as a model id");
  assert.ok(!ids.includes(QWEN_UUID), "UUID must not be used as a model id");
});
