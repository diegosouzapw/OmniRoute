import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-management-route-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function buildPatchRequest(url, body) {
  return new Request(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function buildGetRequest(url = "http://localhost/api/provider-models") {
  return new Request(url, { method: "GET" });
}

type ProviderModelsResponse = {
  models?: Record<string, Array<{ id: string; isHidden?: boolean }>> | Array<{ id: string }>;
  modelCompatOverrides?: Array<{ id: string; isHidden?: boolean }>;
  hiddenModelsByProvider?: Record<string, string[]>;
};

async function getBody(response: Response): Promise<ProviderModelsResponse> {
  return (await response.json()) as ProviderModelsResponse;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("provider-models GET returns an empty hiddenModelsByProvider map with no hidden models", async () => {
  const response = await providerModelsRoute.GET(buildGetRequest());
  const body = await getBody(response);

  assert.equal(response.status, 200);
  assert.deepEqual(body.hiddenModelsByProvider, {});
  assert.ok(typeof body.models === "object" && body.models !== null);
  assert.ok(Array.isArray(body.modelCompatOverrides));
});

test("provider-models GET surfaces hidden custom and catalog-override models per provider", async () => {
  // Hidden custom model (customModels namespace).
  await modelsDb.addCustomModel(
    "openai",
    "gpt-hidden",
    "GPT Hidden",
    "manual",
    "chat-completions",
    ["chat"]
  );
  await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=openai&modelId=gpt-hidden", {
      isHidden: true,
    })
  );
  // Hidden catalog override (modelCompatOverrides namespace) + a visible sibling.
  await providerModelsRoute.PATCH(
    buildPatchRequest(
      "http://localhost/api/provider-models?provider=claude&modelId=claude-sonnet-4-6",
      { isHidden: true }
    )
  );
  await modelsDb.addCustomModel("claude", "claude-visible", "Claude Visible", "manual", "chat", [
    "chat",
  ]);

  const response = await providerModelsRoute.GET(buildGetRequest());
  const body = await getBody(response);

  assert.equal(response.status, 200);
  // `models` is keyed by provider (getAllCustomModels shape) — assert the hidden
  // custom row landed under its provider, and that the hidden map only carries
  // hidden ids (custom + catalog-override), never the visible sibling.
  const modelsByProvider = body.models as Record<string, Array<{ id: string }>>;
  assert.ok(Array.isArray(modelsByProvider.openai));
  assert.ok(modelsByProvider.openai.some((model) => model.id === "gpt-hidden"));
  assert.deepEqual(body.hiddenModelsByProvider, {
    openai: ["gpt-hidden"],
    claude: ["claude-sonnet-4-6"],
  });
  assert.equal(body.hiddenModelsByProvider!.claude.includes("claude-visible"), false);
});

test("provider-models GET keeps the original models and modelCompatOverrides contract", async () => {
  await modelsDb.addCustomModel("openai", "gpt-test", "GPT Test", "manual", "chat-completions", [
    "chat",
  ]);
  await providerModelsRoute.PATCH(
    buildPatchRequest(
      "http://localhost/api/provider-models?provider=claude&modelId=claude-sonnet-4-6",
      { isHidden: true }
    )
  );

  // Per-provider GET keeps the array-shaped models + modelCompatOverrides contract
  // while still returning the global hidden map (#9203).
  const response = await providerModelsRoute.GET(
    buildGetRequest("http://localhost/api/provider-models?provider=claude")
  );
  const body = await getBody(response);

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.models));
  assert.ok(Array.isArray(body.modelCompatOverrides));
  assert.ok(
    body.modelCompatOverrides!.some(
      (override) => override.id === "claude-sonnet-4-6" && override.isHidden
    )
  );
  assert.deepEqual(body.hiddenModelsByProvider, {
    claude: ["claude-sonnet-4-6"],
  });
});

test("provider-models PATCH updates hidden flag for custom models", async () => {
  await modelsDb.addCustomModel("openai", "gpt-test", "GPT Test", "manual", "chat-completions", [
    "chat",
  ]);

  const response = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=openai&modelId=gpt-test", {
      isHidden: true,
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);

  const models = await modelsDb.getCustomModels("openai");
  assert.equal(models.find((model) => model.id === "gpt-test")?.isHidden, true);
});

test("provider-models PATCH persists visibility overrides for catalog models", async () => {
  const response = await providerModelsRoute.PATCH(
    buildPatchRequest(
      "http://localhost/api/provider-models?provider=claude&modelId=claude-sonnet-4-6",
      { isHidden: true }
    )
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);

  const overrides = modelsDb.getModelCompatOverrides("claude");
  assert.equal(overrides.find((model) => model.id === "claude-sonnet-4-6")?.isHidden, true);
});

test("provider-models PATCH supports bulk visibility updates", async () => {
  await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      isHidden: true,
      modelIds: ["claude-opus-4-6", "claude-sonnet-4-6"],
    })
  );

  const response = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      isHidden: false,
      modelIds: ["claude-opus-4-6", "claude-sonnet-4-6"],
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.updated, 2);

  const overrides = modelsDb.getModelCompatOverrides("claude");
  assert.equal(overrides.find((model) => model.id === "claude-opus-4-6")?.isHidden, false);
  assert.equal(overrides.find((model) => model.id === "claude-sonnet-4-6")?.isHidden, false);
});

test("provider-models PATCH validates required fields", async () => {
  const response = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      modelIds: ["claude-sonnet-4-6"],
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "isHidden boolean is required");
});
