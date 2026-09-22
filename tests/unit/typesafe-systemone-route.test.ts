import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-typesafe-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "typesafe-route-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1Route = await import("../../src/app/api/v1/systemone/route.ts");
const nativeSystemOneRoute = await import("../../src/app/api/typesafe/v1/systemone/route.ts");
const nativeModelsRoute = await import("../../src/app/api/typesafe/v1/models/route.ts");
const modelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

const originalFetch = globalThis.fetch;

test.before(async () => {
  await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    name: "typesafe-route-test",
    apiKey: "typesafe-provider-key",
    isActive: true,
    testStatus: "active",
  });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function systemOneRequest(url: string, model: string): Request {
  return new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-typesafe-sdk": "typesafe-sdk/0.6.0",
      "x-typesafe-runtime": "node/24",
    },
    body: JSON.stringify({
      state: "Help!",
      model,
      questions: {
        urgent: { type: "noul", instructions: "Is this urgent?" },
      },
    }),
  });
}

test("POST /v1/systemone resolves typesafe/model ids and forwards the upstream model only", async () => {
  let upstreamUrl = "";
  let upstreamBody: Record<string, unknown> = {};
  let upstreamHeaders = new Headers();
  globalThis.fetch = async (input, init) => {
    upstreamUrl = String(input);
    upstreamBody = JSON.parse(String(init?.body));
    upstreamHeaders = new Headers(init?.headers);
    return Response.json(
      {
        model: "jev-1.13.0",
        answers: { urgent: { type: "noul", noul: 0.9 } },
        usage: { input_tokens: 120, output_tokens: 20 },
      },
      { headers: { "x-typesafe-request-id": "route-request-1" } }
    );
  };

  const response = await v1Route.POST(
    systemOneRequest("http://localhost/v1/systemone", "typesafe/jev-latest")
  );
  assert.equal(response.status, 200);
  assert.equal(upstreamUrl, "https://api.typesafe.ai/v1/systemone");
  assert.equal(upstreamBody.model, "jev-latest");
  assert.equal(upstreamHeaders.get("authorization"), "Bearer typesafe-provider-key");
  assert.equal(upstreamHeaders.get("x-typesafe-sdk"), "typesafe-sdk/0.6.0");
  assert.equal(response.headers.get("x-typesafe-request-id"), "route-request-1");
});

test("the SDK namespace exposes the same System One operation", async () => {
  let upstreamModel = "";
  globalThis.fetch = async (_input, init) => {
    upstreamModel = JSON.parse(String(init?.body)).model;
    return Response.json({
      model: "jev-1.13.0",
      answers: { urgent: { type: "noul", noul: 0.5 } },
      usage: { input_tokens: 100, output_tokens: 10 },
    });
  };

  const response = await nativeSystemOneRoute.POST(
    systemOneRequest("http://localhost/typesafe/v1/systemone", "jev-preview")
  );
  assert.equal(response.status, 200);
  assert.equal(upstreamModel, "jev-preview");
});

test("GET /typesafe/v1/models preserves TypeSafe's native discovery envelope", async () => {
  let upstreamUrl = "";
  globalThis.fetch = async (input, init) => {
    upstreamUrl = String(input);
    assert.equal(new Headers(init?.headers).get("authorization"), "Bearer typesafe-provider-key");
    return Response.json({
      models: [
        { name: "jev-latest", description: "Stable Jev", release_date: "2026-09-14" },
        { name: "jev-preview", description: "Preview Jev", release_date: "2026-09-14" },
      ],
    });
  };

  const response = await nativeModelsRoute.GET(
    new Request("http://localhost/typesafe/v1/models", { method: "GET" })
  );
  assert.equal(response.status, 200);
  assert.equal(upstreamUrl, "https://api.typesafe.ai/v1/models");
  const json = (await response.json()) as { models: Array<{ name: string }> };
  assert.deepEqual(
    json.models.map((model) => model.name),
    ["jev-latest", "jev-preview"]
  );
});

test("the unified catalog advertises Jev only on the System One endpoint", async () => {
  modelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await modelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );
  assert.equal(response.status, 200);
  const catalog = (await response.json()) as {
    data: Array<{
      id: string;
      type?: string;
      supported_endpoints?: string[];
      api_format?: string;
    }>;
  };
  const jev = catalog.data.filter((model) => model.id === "typesafe/jev-latest");

  assert.equal(jev.length, 1);
  assert.equal(jev[0]?.type, "systemone");
  assert.deepEqual(jev[0]?.supported_endpoints, ["systemone"]);
  assert.equal(jev[0]?.api_format, "systemone");
});

test("route validation uses TypeSafe's 422 detail shape and rejects unknown models", async () => {
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("upstream should not be called");
  };

  const invalid = await v1Route.POST(
    new Request("http://localhost/v1/systemone", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ state: "state", model: "jev-latest", questions: {} }),
    })
  );
  assert.equal(invalid.status, 422);
  const invalidBody = (await invalid.json()) as { detail: Array<{ loc: string[] }> };
  assert.ok(Array.isArray(invalidBody.detail));

  const unknown = await v1Route.POST(
    systemOneRequest("http://localhost/v1/systemone", "openai/gpt-5")
  );
  assert.equal(unknown.status, 400);
  const unknownBody = (await unknown.json()) as { detail: { error_type: string } };
  assert.equal(unknownBody.detail.error_type, "api_usage_error");
  assert.equal(fetchCalls, 0);
});
