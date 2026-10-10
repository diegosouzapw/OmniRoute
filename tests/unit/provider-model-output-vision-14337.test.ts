import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-output-14337-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const providers = await import("../../src/lib/db/providers.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const overrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const { getExplicitModelOutputCap } = await import("../../src/lib/modelCapabilities.ts");
const route = await import("../../src/app/api/provider-models/route.ts");
const discovery = await import("../../src/app/api/providers/[id]/models/route.ts");
const { enforceOutputTokenBudget } =
  await import("../../open-sse/handlers/chatCore/outputTokenBudget.ts");
const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  globalThis.fetch = async () => {
    throw new Error("Unexpected external request");
  };
});
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
const request = (body: Record<string, unknown>, method = "PUT") =>
  new Request("http://localhost/api/provider-models", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
const put = (value: unknown, provider = "openai", modelId = "gpt-4o") =>
  route.PUT(request({ provider, modelId, maxOutputTokenOverride: value }));

test("synced models save an output override consumed by runtime without creating a custom row", async () => {
  const response = await put(4096);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).maxOutputTokenOverride, 4096);
  assert.equal(overrides.getModelCapabilityOverride("openai", "gpt-4o", "max_output_tokens"), 4096);
  assert.equal(overrides.getModelCapabilityOverride("openai", "gpt-4o", "max_token"), null);
  assert.equal(getExplicitModelOutputCap({ provider: "openai", model: "gpt-4o" }), 4096);
  const capped = enforceOutputTokenBudget(
    { max_tokens: 16000, max_completion_tokens: 16000, max_output_tokens: 16000 },
    100,
    128000,
    0,
    getExplicitModelOutputCap({ provider: "openai", model: "gpt-4o" })
  );
  assert.equal(capped.ok, true);
  if (capped.ok)
    assert.deepEqual(capped.body, {
      max_tokens: 4096,
      max_completion_tokens: 4096,
      max_output_tokens: 4096,
    });
  assert.deepEqual(await models.getCustomModels("openai"), []);
});

test("GET returns provider-scoped output overrides for synced and custom rows", async () => {
  const staleRow = { id: "custom-14337", name: "Custom", maxOutputTokenOverride: 99999 };
  await models.replaceCustomModels("openai", [staleRow]);
  contextOverrides.setModelContextOverride("openai", "custom-14337", 128000, "manual");
  overrides.setModelCapabilityOverride("openai/gpt-4o", "max_output_tokens", 4096);
  overrides.setModelCapabilityOverride("openai/custom-14337", "max_output_tokens", 2048);
  overrides.setModelCapabilityOverride("anthropic/other", "max_output_tokens", 1024);
  overrides.setModelCapabilityOverride("openai/gpt-4o", "max_input_tokens", 64000);
  const response = await route.GET(
    new Request("http://localhost/api/provider-models?provider=openai")
  );
  const body = await response.json();
  assert.deepEqual(
    body.modelOutputOverrides
      ?.map((row: { modelId: string; maxOutputTokenOverride: number }) => [
        row.modelId,
        row.maxOutputTokenOverride,
      ])
      .sort(),
    [
      ["custom-14337", 2048],
      ["gpt-4o", 4096],
    ]
  );
  assert.equal(
    body.models.find((row: { id: string }) => row.id === "custom-14337")?.maxOutputTokenOverride,
    2048
  );
});

test("clearing the override restores the runtime catalog default", async () => {
  const original = getExplicitModelOutputCap({ provider: "openai", model: "gpt-4o" });
  overrides.setModelCapabilityOverride("openai/gpt-4o", "max_output_tokens", 1234);
  const response = await put(null);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).maxOutputTokenOverride, null);
  assert.equal(overrides.getModelCapabilityOverride("openai", "gpt-4o", "max_output_tokens"), null);
  assert.equal(getExplicitModelOutputCap({ provider: "openai", model: "gpt-4o" }), original);
});

test("re-sync preserves an operator output override", async () => {
  assert.equal((await put(4096)).status, 200);
  await models.replaceSyncedAvailableModelsForConnection("openai", "synthetic-sync", [
    { id: "gpt-4o", name: "Changed upstream name", outputTokenLimit: 99999 },
  ]);
  assert.equal(getExplicitModelOutputCap({ provider: "openai", model: "gpt-4o" }), 4096);
});

test("invalid values cannot overwrite an existing output override", async () => {
  overrides.setModelCapabilityOverride("openai/gpt-4o", "max_output_tokens", 2048);
  for (const invalid of [0, -1, 1.5, "1024", true]) {
    assert.equal((await put(invalid)).status, 400, `Reject ${JSON.stringify(invalid)}`);
    assert.equal(
      overrides.getModelCapabilityOverride("openai", "gpt-4o", "max_output_tokens"),
      2048
    );
  }
});

test("unknown providers leave no output override behind", async () => {
  assert.equal((await put(2048, "not-a-provider-14337")).status, 400);
  assert.equal(
    overrides.getModelCapabilityOverride("not-a-provider-14337", "gpt-4o", "max_output_tokens"),
    null
  );
});

test("custom creation still accepts max_output_tokens independently of the override", async () => {
  const response = await route.POST(
    request(
      { provider: "openai-compatible-output-test", modelId: "custom", max_output_tokens: 8192 },
      "POST"
    )
  );
  assert.equal(response.status, 200);
  assert.equal(
    (await models.getCustomModels("openai-compatible-output-test"))[0]?.outputTokenLimit,
    8192
  );
});

test("provider union catalog exposes positive synced vision without promoting false or unknown", async () => {
  const connection = await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "synthetic-reader",
    apiKey: "synthetic-only",
    isActive: true,
    providerSpecificData: { autoFetchModels: false },
  });
  await models.replaceSyncedAvailableModelsForConnection("openai", "other-synthetic-connection", [
    { id: "vision-14337", name: "Vision", supportsVision: true },
    { id: "text-14337", name: "Text", supportsVision: false },
    { id: "unknown-14337", name: "Unknown" },
  ]);
  const response = await discovery.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(
    body.models.find((row: { id: string }) => row.id === "vision-14337")?.supportsVision,
    true
  );
  assert.equal(
    body.models.find((row: { id: string }) => row.id === "text-14337")?.supportsVision,
    undefined
  );
  assert.equal(
    Object.hasOwn(
      body.models.find((row: { id: string }) => row.id === "unknown-14337"),
      "supportsVision"
    ),
    false
  );
});
