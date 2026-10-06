import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-deepseek-efforts-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "deepseek-efforts-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelDiscovery = await import("../../src/lib/providerModels/modelDiscovery.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { sanitizeReasoningEffortForProvider } = await import("../../open-sse/executors/base.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("DeepSeek registries declare none/low/high/max on both V4 models", () => {
  const expectedEfforts = ["none", "low", "high", "max"];
  for (const providerId of ["deepseek", "opencode-go"]) {
    const models = new Map((REGISTRY[providerId]?.models || []).map((model) => [model.id, model]));
    for (const modelId of ["deepseek-v4-flash", "deepseek-v4-pro"]) {
      assert.deepEqual(models.get(modelId)?.supportedThinkingEfforts, expectedEfforts);
      for (const effort of expectedEfforts) {
        assert.equal(
          models.has(`${modelId}-${effort}`),
          false,
          `${providerId} should derive ${modelId}-${effort} from the base model metadata`
        );
      }
    }
  }
});

test("DeepSeek catalog exposes only the declared effort aliases", async () => {
  await providersDb.createProviderConnection({
    provider: "deepseek",
    authType: "apikey",
    name: "deepseek-efforts",
    apiKey: "deepseek-test-key",
    isActive: true,
    testStatus: "active",
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };
  const ids = new Set(body.data.map((model) => model.id));

  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-flash-none")));
  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-flash-low")));
  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-flash-high")));
  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-flash-max")));
  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-pro-none")));
  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-pro-low")));
  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-pro-high")));
  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-pro-max")));
});

test("OpenCode Go catalog derives the declared V4 effort aliases from base models", async () => {
  await providersDb.createProviderConnection({
    provider: "opencode-go",
    authType: "apikey",
    name: "opencode-go-deepseek-efforts",
    apiKey: "opencode-go-test-key",
    isActive: true,
    testStatus: "active",
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as {
    data: Array<{ id: string; capabilities?: { effort_tiers?: string[] } }>;
  };
  const models = new Map(body.data.map((model) => [model.id, model]));
  const expectedEfforts = ["none", "low", "high", "max"];

  for (const modelId of ["deepseek-v4-flash", "deepseek-v4-pro"]) {
    const baseId = `opencode-go/${modelId}`;
    assert.deepEqual(models.get(baseId)?.capabilities?.effort_tiers, expectedEfforts);
    for (const effort of expectedEfforts) {
      assert.ok(models.has(`${baseId}-${effort}`), `${baseId}-${effort} must be advertised`);
    }
    assert.equal(models.has(`${baseId}-medium`), false);
  }
});
test("Crof synced reasoning metadata exposes exactly none/low/medium/high/max aliases", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "crof",
    authType: "apikey",
    name: "crof-live-efforts",
    apiKey: "crof-test-key",
    isActive: true,
    testStatus: "active",
  });
  const modelId = "crof-live-reasoning-model";

  await modelDiscovery.persistDiscoveredModels("crof", connection.id, [
    { id: modelId, name: "Crof Live Reasoning Model", reasoning_effort: true },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };
  const aliases = new Set(
    body.data.map((model) => model.id).filter((id) => id.startsWith(`crof/${modelId}-`))
  );
  assert.deepEqual(
    aliases,
    new Set([
      `crof/${modelId}-none`,
      `crof/${modelId}-low`,
      `crof/${modelId}-medium`,
      `crof/${modelId}-high`,
      `crof/${modelId}-max`,
    ])
  );
});

test("Crof static GLM 5.2 effort aliases survive a stale synced cache", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "crof",
    authType: "apikey",
    name: "crof-stale-glm-5-2",
    apiKey: "crof-stale-glm-5-2-key",
    isActive: true,
    testStatus: "active",
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection("crof", connection.id, [
    {
      id: "glm-5.2",
      name: "GLM 5.2",
      supportedEndpoints: ["chat"],
    },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };
  const aliases = new Set(
    body.data.map((model) => model.id).filter((id) => id.startsWith("crof/glm-5.2-"))
  );

  assert.deepEqual(
    aliases,
    new Set([
      "crof/glm-5.2-none",
      "crof/glm-5.2-low",
      "crof/glm-5.2-medium",
      "crof/glm-5.2-high",
      "crof/glm-5.2-max",
    ])
  );
});

test("Crof synced effort aliases resolve to the base model at request time", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "crof",
    authType: "apikey",
    name: "crof-runtime-efforts",
    apiKey: "crof-runtime-key",
    isActive: true,
    testStatus: "active",
  });
  const modelId = "crof-runtime-reasoning-model";

  await modelDiscovery.persistDiscoveredModels("crof", connection.id, [
    { id: modelId, reasoning_effort: true },
  ]);

  const info = await getModelInfo(`crof/${modelId}-medium`);
  assert.equal(info.provider, "crof");
  assert.equal(info.model, modelId);
  assert.equal(info.resolvedThinkingEffort, "medium");

  const maxInfo = await getModelInfo(`crof/${modelId}-max`);
  assert.equal(maxInfo.model, modelId);
  assert.equal(maxInfo.resolvedThinkingEffort, "max");
});

test("hardcoded DeepSeek effort suffixes resolve through the static registry", async () => {
  const flashLow = await getModelInfo("ds/deepseek-v4-flash-low");
  assert.equal(flashLow.provider, "deepseek");
  assert.equal(flashLow.model, "deepseek-v4-flash");
  assert.equal(flashLow.resolvedThinkingEffort, "low");

  const flashNone = await getModelInfo("deepseek/deepseek-v4-flash-none");
  assert.equal(flashNone.model, "deepseek-v4-flash");
  assert.equal(flashNone.resolvedThinkingEffort, "none");

  const proLow = await getModelInfo("ds/deepseek-v4-pro-low");
  assert.equal(proLow.model, "deepseek-v4-pro");
  assert.equal(proLow.resolvedThinkingEffort, "low");
});

test("OpenCode Go V4 suffixes resolve from base-model effort metadata", async () => {
  for (const modelId of ["deepseek-v4-flash", "deepseek-v4-pro"]) {
    for (const effort of ["none", "low", "high", "max"]) {
      const info = await getModelInfo(`opencode-go/${modelId}-${effort}`);
      assert.equal(info.provider, "opencode-go");
      assert.equal(info.model, modelId);
      assert.equal(info.resolvedThinkingEffort, effort);
    }
  }
});

test("native DeepSeek preserves the documented low effort for Flash and Pro", () => {
  for (const model of ["deepseek-v4-flash", "deepseek-v4-pro"]) {
    const body = { model, reasoning_effort: "low" };
    assert.equal(
      sanitizeReasoningEffortForProvider(body, "deepseek", model),
      body,
      `${model} must pass low through unchanged`
    );
  }
});

test("non-DeepSeek static reasoning models do not advertise unresolvable effort aliases", async () => {
  // cheaperinference declares deepseek-v4-flash/pro with supportsReasoning: true
  // but no supportedThinkingEfforts — the catalog must NOT synthesize
  // cheaperinference/deepseek-v4-flash-{low,high,...} ids for them (#9485 review #1).
  await providersDb.createProviderConnection({
    provider: "cheaperinference",
    authType: "apikey",
    name: "cheaperinference-blast-radius",
    apiKey: "cheaperinference-test-key",
    isActive: true,
    testStatus: "active",
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };
  const ids = body.data.map((model) => model.id);

  // Static base models for cheaperinference should still be present
  assert.ok(
    ids.some((id) => id.endsWith("cheaperinference/deepseek-v4-flash")),
    "cheaperinference/deepseek-v4-flash base entry should still be present"
  );
  // But NO effort-suffixed aliases should be synthesized
  assert.equal(
    ids.some((id) =>
      /cheaperinference\/deepseek-v4-flash-(none|low|medium|high|max|xhigh)$/.test(id)
    ),
    false,
    "cheaperinference static reasoning models must not advertise unresolvable effort aliases"
  );
  assert.equal(
    ids.some((id) =>
      /cheaperinference\/deepseek-v4-pro-(none|low|medium|high|max|xhigh)$/.test(id)
    ),
    false,
    "cheaperinference static reasoning models must not advertise unresolvable effort aliases"
  );
});

test("custom model named deepseek-v4-flash-low is not rewritten by registry suffix resolution", async () => {
  // A custom (DB) model literally named deepseek-v4-flash-low on the deepseek
  // provider must not be silently rewritten to deepseek-v4-flash + effort low,
  // which would drop its custom apiFormat/targetFormat metadata (#9485 review #3).
  await modelsDb.addCustomModel(
    "deepseek",
    "deepseek-v4-flash-low",
    "deepseek-v4-flash-low",
    "manual",
    "responses",
    ["chat"],
    "responses"
  );

  const info = await getModelInfo("ds/deepseek-v4-flash-low");
  // The model id should be preserved as the literal custom id, not rewritten
  assert.equal(info.model, "deepseek-v4-flash-low");
  // The custom apiFormat must survive (not dropped by registry rewriting)
  assert.equal(info.apiFormat, "responses");
  // No resolved effort should be injected — this is a distinct custom model
  assert.equal(info.resolvedThinkingEffort, undefined);
});

test("none effort resolves and stays explicit through provider sanitation", async () => {
  // The format translator subsequently carries this as reasoning.effort:"none"
  // on DeepSeek's default Responses route, which disables thinking.
  const flashNone = await getModelInfo("ds/deepseek-v4-flash-none");
  assert.equal(flashNone.model, "deepseek-v4-flash");
  assert.equal(flashNone.resolvedThinkingEffort, "none");

  const sanitized = sanitizeReasoningEffortForProvider(
    { model: "deepseek-v4-flash", reasoning_effort: "none" },
    "deepseek",
    "deepseek-v4-flash"
  ) as Record<string, unknown>;
  assert.equal(sanitized.reasoning_effort, "none");
});

test("suffixed Flash low remains valid before alias resolution", () => {
  // Preserve low even if a future route sanitizes the raw suffixed id before
  // resolving it to the registered base model.
  const sanitizedSuffixed = sanitizeReasoningEffortForProvider(
    { model: "deepseek-v4-flash-low", reasoning_effort: "low" },
    "deepseek",
    "deepseek-v4-flash-low"
  ) as Record<string, unknown>;
  assert.equal(sanitizedSuffixed.reasoning_effort, "low");
});
