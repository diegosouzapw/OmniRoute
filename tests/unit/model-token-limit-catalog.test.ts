import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-limit-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const capabilityOverrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const models = await import("../../src/lib/db/models.ts");
const providers = await import("../../src/lib/db/providers.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const overrideRoute = await import("../../src/app/api/model-capability-overrides/route.ts");

const TARGET = "openai/gpt-5.6";
const LIMITS = { context: 372000, input: 353400, output: 128000 };

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  catalog.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function getModel(target = TARGET) {
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  return body.data.find((model) => model.id === target);
}

test("v1 model catalog projects effective context, input, and output overrides and invalidates on delete", async () => {
  assert.equal(contextOverrides.setModelContextOverride("openai", "gpt-5.6", LIMITS.context), true);
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(TARGET, "max_input_tokens", LIMITS.input),
    true
  );
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(TARGET, "max_output_tokens", LIMITS.output),
    true
  );
  await providers.createProviderConnection({
    provider: "openai",
    authType: "api_key",
    name: "token-limit-catalog",
    apiKey: "sk-test",
  });

  const initial = await getModel();
  assert.ok(initial);
  assert.deepEqual(
    {
      context_length: initial.context_length,
      max_input_tokens: initial.max_input_tokens,
      max_output_tokens: initial.max_output_tokens,
    },
    {
      context_length: LIMITS.context,
      max_input_tokens: LIMITS.input,
      max_output_tokens: LIMITS.output,
    }
  );

  const sentinelOutput = 111111;
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(TARGET, "max_output_tokens", sentinelOutput),
    true
  );
  assert.equal((await getModel())?.max_output_tokens, sentinelOutput);
  assert.equal(
    capabilityOverrides.removeModelCapabilityOverride(TARGET, "max_output_tokens"),
    true
  );
  assert.notEqual((await getModel())?.max_output_tokens, sentinelOutput);
});

test("v1 model catalog projects a synced Codex context to both public aliases", async () => {
  const target = "codex/gpt-5.6-sol";
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-token-limit-catalog",
    accessToken: "test-access-token",
  });
  assert.equal(typeof connection.id, "string");
  await models.replaceSyncedAvailableModelsForConnection("codex", connection.id as string, [
    {
      id: "gpt-5.6-sol",
      name: "GPT 5.6 Sol",
      source: "provider",
      supportedEndpoints: ["responses"],
      inputTokenLimit: 272000,
      outputTokenLimit: 128000,
    },
  ]);
  assert.equal(
    contextOverrides.setModelContextOverride("codex", "gpt-5.6-sol", LIMITS.context),
    true
  );
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(target, "max_input_tokens", LIMITS.input),
    true
  );
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(target, "max_output_tokens", LIMITS.output),
    true
  );

  for (const publicId of ["cx/gpt-5.6-sol", "codex/gpt-5.6-sol"]) {
    const projected = await getModel(publicId);
    assert.ok(projected, `expected ${publicId} in the public catalog`);
    assert.deepEqual(
      {
        context_length: projected.context_length,
        max_input_tokens: projected.max_input_tokens,
        max_output_tokens: projected.max_output_tokens,
      },
      {
        context_length: LIMITS.context,
        max_input_tokens: LIMITS.input,
        max_output_tokens: LIMITS.output,
      },
      `${publicId} must retain the persisted Codex token-limit overrides`
    );
  }

  const canonical = await getModel("codex/gpt-5.6-sol");
  assert.equal(canonical?.type, "image");
  assert.deepEqual(canonical?.output_modalities, ["image"]);
  assert.ok(Array.isArray(canonical?.supported_sizes));

  assert.equal(contextOverrides.removeModelContextOverride("codex", "gpt-5.6-sol"), true);
  assert.equal(
    (await getModel("codex/gpt-5.6-sol"))?.context_length,
    undefined,
    "the specialty row must not inherit the synced chat context after override removal"
  );
  assert.equal((await getModel("cx/gpt-5.6-sol"))?.context_length, 272000);
});

test("v1 model catalog projects an exact raw-alias context override", async () => {
  const target = "github/claude-opus-4.8";
  assert.equal(contextOverrides.setModelContextOverride("github", "claude-opus-4.8", 333333), true);
  await providers.createProviderConnection({
    provider: "github",
    authType: "api_key",
    name: "raw-alias-token-limit-catalog",
    apiKey: "ghp-test",
  });

  assert.equal(
    (await getModel(target))?.context_length,
    333333,
    "the catalog entry keeps its raw alias and must project that exact override"
  );
});

test("v1 model catalog projects a compatible provider prefix override stored under its node id", async () => {
  const nodeId = "openai-compatible-chat-context-override";
  const prefix = "wawapi-openai";
  const modelId = "grok-4.6";
  const contextWindow = 500000;
  await providers.createProviderNode({
    id: nodeId,
    type: "openai-compatible",
    prefix,
    name: "WawAPI (OpenAI)",
    apiType: "chat",
    baseUrl: "https://example.com/v1",
  });
  const connection = await providers.createProviderConnection({
    provider: nodeId,
    authType: "api_key",
    name: "compatible-provider-token-limit-catalog",
    apiKey: "sk-test",
  });
  assert.equal(typeof connection.id, "string");
  await models.replaceSyncedAvailableModelsForConnection(nodeId, connection.id as string, [
    { id: modelId, name: modelId, source: "imported" },
  ]);

  const patch = await overrideRoute.PATCH(
    new Request("http://localhost/api/model-capability-overrides", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        target: `${prefix}/${modelId}`,
        key: "context_length",
        value: contextWindow,
      }),
    })
  );
  assert.equal(patch.status, 200);
  assert.equal(
    contextOverrides.getModelContextOverrideRecord(nodeId, modelId)?.realContext,
    contextWindow,
    "the public prefix target must persist under the internal provider node id"
  );

  assert.equal(
    (await getModel(`${prefix}/${modelId}`))?.context_length,
    contextWindow,
    "the public catalog row must read the override stored under the internal provider node id"
  );
});

test("v1 model catalog overlays same-id custom metadata before final overrides", async () => {
  const providerId = "openai-compatible-chat-custom-precedence";
  const prefix = "custom-precedence";
  const modelId = "shared-model";
  await providers.createProviderNode({
    id: providerId,
    type: "openai-compatible",
    prefix,
    name: "Custom Precedence",
    apiType: "chat",
    baseUrl: "https://example.com/v1",
  });
  const connection = await providers.createProviderConnection({
    provider: providerId,
    authType: "api_key",
    name: "custom-precedence-catalog",
    apiKey: "sk-test",
  });
  await models.replaceSyncedAvailableModelsForConnection(providerId, connection.id as string, [
    {
      id: modelId,
      name: "Discovered name",
      source: "imported",
      inputTokenLimit: 128000,
      supportsVision: true,
    },
  ]);
  await models.addCustomModel(
    providerId,
    modelId,
    "Operator name",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    { outputTokenLimit: 32000 },
    false
  );

  const customProjected = await getModel(`${prefix}/${modelId}`);
  assert.ok(customProjected);
  assert.equal(customProjected.max_output_tokens, 32000);

  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(
      `${prefix}/${modelId}`,
      "max_output_tokens",
      64000
    ),
    true
  );
  assert.equal(contextOverrides.setModelContextOverride(providerId, modelId, 500000), true);

  const projected = await getModel(`${prefix}/${modelId}`);
  assert.ok(projected);
  assert.equal(projected.name, "Operator name");
  assert.equal(projected.context_length, 500000);
  assert.equal(projected.max_output_tokens, 64000);
  assert.equal((projected.capabilities as Record<string, unknown>)?.vision, false);
  assert.deepEqual(projected.input_modalities, ["text"]);
});
