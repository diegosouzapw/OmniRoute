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
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { sanitizeReasoningEffortForProvider } = await import("../../open-sse/executors/base.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("DeepSeek registry declares the documented per-model thinking efforts", () => {
  const models = new Map((REGISTRY.deepseek?.models || []).map((model) => [model.id, model]));

  assert.deepEqual(models.get("deepseek-v4-flash")?.supportedThinkingEfforts, [
    "none",
    "low",
    "high",
    "max",
  ]);
  assert.deepEqual(models.get("deepseek-v4-pro")?.supportedThinkingEfforts, [
    "none",
    "high",
    "max",
  ]);
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
  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-pro-high")));
  assert.ok([...ids].some((id) => id.endsWith("deepseek-v4-pro-max")));
  assert.equal(
    [...ids].some((id) => id.endsWith("deepseek-v4-pro-low")),
    false,
    "Pro does not advertise low"
  );
});

test("hardcoded DeepSeek effort suffixes resolve through the static registry", async () => {
  const flashLow = await getModelInfo("ds/deepseek-v4-flash-low");
  assert.equal(flashLow.provider, "deepseek");
  assert.equal(flashLow.model, "deepseek-v4-flash");
  assert.equal(flashLow.resolvedThinkingEffort, "low");

  const flashNone = await getModelInfo("deepseek/deepseek-v4-flash-none");
  assert.equal(flashNone.model, "deepseek-v4-flash");
  assert.equal(flashNone.resolvedThinkingEffort, "none");

  const unsupportedProLow = await getModelInfo("ds/deepseek-v4-pro-low");
  assert.equal(unsupportedProLow.model, "deepseek-v4-pro-low");
  assert.equal(unsupportedProLow.resolvedThinkingEffort, undefined);
});

test("native DeepSeek preserves Flash low while clamping unsupported Pro low", () => {
  const flash = sanitizeReasoningEffortForProvider(
    { model: "deepseek-v4-flash", reasoning_effort: "low" },
    "deepseek",
    "deepseek-v4-flash"
  ) as Record<string, unknown>;
  assert.equal(flash.reasoning_effort, "low");

  const pro = sanitizeReasoningEffortForProvider(
    { model: "deepseek-v4-pro", reasoning_effort: "low" },
    "deepseek",
    "deepseek-v4-pro"
  ) as Record<string, unknown>;
  assert.equal(pro.reasoning_effort, "high");
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
    ids.some((id) => /cheaperinference\/deepseek-v4-flash-(none|low|medium|high|max|xhigh)$/.test(id)),
    false,
    "cheaperinference static reasoning models must not advertise unresolvable effort aliases"
  );
  assert.equal(
    ids.some((id) => /cheaperinference\/deepseek-v4-pro-(none|low|medium|high|max|xhigh)$/.test(id)),
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

test("none effort resolves and passes through the native DeepSeek sanitizer unchanged", async () => {
  // The -none suffix resolves to base + effort "none", which reaches the native
  // DeepSeek endpoint as reasoning_effort: "none" unchanged (#9485 review #8).
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

test("isFlash check is robust to suffixed model ids", () => {
  // A suffixed id like deepseek-v4-flash-low must still be recognized as Flash
  // so its low effort is preserved, not clamped to high (#9485 review #5).
  const sanitizedSuffixed = sanitizeReasoningEffortForProvider(
    { model: "deepseek-v4-flash-low", reasoning_effort: "low" },
    "deepseek",
    "deepseek-v4-flash-low"
  ) as Record<string, unknown>;
  assert.equal(sanitizedSuffixed.reasoning_effort, "low");
});
