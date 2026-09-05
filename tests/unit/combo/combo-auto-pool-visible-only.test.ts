import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression coverage for the "auto combos must only pick user-visible models"
// fix (2026-08-15): a provider whose connection only has synced/free models
// (e.g. OpenRouter with importFreeModelsOnly) must NOT surface catalog-only
// models like `openrouter/auto` in any auto candidate pool. The pool must be
// built from what the user actually has visible (synced + custom non-hidden),
// falling back to the static catalog only when the user has no synced/custom
// models for that provider at all.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-visible-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const virtualFactory = await import("../../../open-sse/services/autoCombo/virtualFactory.ts");
const combo = await import("../../../open-sse/services/combo.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => resetStorage());

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

async function createOpenRouterConnectionWithFreeSync() {
  const conn = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "OpenRouter",
    apiKey: "sk-test-openrouter",
    providerSpecificData: { importFreeModelsOnly: true },
  });
  const connectionId = (conn as { id?: string }).id;
  assert.ok(connectionId, "created openrouter connection must expose an id");
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", connectionId, [
    {
      id: "liquid/lfm-2.5-2.6b:free",
      name: "LiquidAI: LFM2.5-2.6B (free)",
      source: "imported" as const,
    },
    {
      id: "nvidia/nemotron-3.5-lightning:free",
      name: "NVIDIA: Nemotron 3.5 Lightning (free)",
      source: "imported" as const,
    },
  ]);
  return connectionId;
}

test("virtual auto-combo pool excludes catalog-only models (openrouter/auto) when only free models are synced", async () => {
  await createOpenRouterConnectionWithFreeSync();

  const prepared = await virtualFactory.prepareVirtualAutoComboInputs();
  const pool = prepared.regularCandidates;
  assert.ok(pool.length > 0, "expected a non-empty pool for the active openrouter connection");

  assert.ok(
    !pool.some((c) => c.provider === "openrouter" && c.model === "auto"),
    "openrouter/auto must NOT be a candidate: the user never synced it (catalog-only model)"
  );

  assert.ok(
    pool.some((c) => c.provider === "openrouter" && c.model === "liquid/lfm-2.5-2.6b:free"),
    "a synced free model must remain a candidate"
  );
  assert.ok(
    pool.some(
      (c) => c.provider === "openrouter" && c.model === "nvidia/nemotron-3.5-lightning:free"
    ),
    "the second synced free model must remain a candidate"
  );
});

test("expandAutoComboCandidatePool excludes catalog-only models (openrouter/auto) when only free models are synced", async () => {
  await createOpenRouterConnectionWithFreeSync();

  const expanded = await combo.expandAutoComboCandidatePool([], { config: {} });
  assert.ok(expanded.length > 0, "expected expansion from the active openrouter connection");

  assert.ok(
    !expanded.some((t) => t.provider === "openrouter" && t.modelStr === "openrouter/auto"),
    "expanded pool must NOT include openrouter/auto: the user never synced it"
  );

  assert.ok(
    expanded.some(
      (t) => t.provider === "openrouter" && t.modelStr === "openrouter/liquid/lfm-2.5-2.6b:free"
    ),
    "a synced free model must be expanded into the pool"
  );
});

test("virtual auto-combo pool falls back to the static catalog when the provider has no synced/custom models", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });

  const prepared = await virtualFactory.prepareVirtualAutoComboInputs();
  const pool = prepared.regularCandidates;
  const openaiCandidates = pool.filter((c) => c.provider === "openai");
  assert.ok(
    openaiCandidates.length > 0,
    "openai with no synced models must still get catalog candidates (fallback)"
  );
  assert.ok(
    openaiCandidates.some((c) => c.model === "gpt-4o-mini"),
    "the configured default must remain among catalog-fallback candidates"
  );
});
test("virtual auto-combo pool filters EVERY provider with partial sync, not just openrouter", async () => {
  // openai: sync only gpt-4o-mini (gpt-4o and gpt-4o-turbo exist in the static
  // catalog but are NOT synced → must be absent). kilocode: 359 synced models,
  // all with the kilocode provider prefix in the static registry → must be the
  // only kilocode candidates.
  const openaiConn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
  });
  const kilocodeConn = await providersDb.createProviderConnection({
    provider: "kilocode",
    authType: "apikey",
    name: "KiloCode",
    apiKey: "sk-test-kilocode",
  });
  const openaiId = (openaiConn as { id?: string }).id;
  const kilocodeId = (kilocodeConn as { id?: string }).id;
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", openaiId, [
    { id: "gpt-4o-mini", name: "GPT-4o mini", source: "imported" as const },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("kilocode", kilocodeId, [
    { id: "kilocode/gpt-oss-120b", name: "GPT-OSS 120B", source: "imported" as const },
    { id: "kilocode/qwen3-coder", name: "Qwen3 Coder", source: "imported" as const },
  ]);

  const prepared = await virtualFactory.prepareVirtualAutoComboInputs();
  const pool = prepared.regularCandidates;

  const openaiCandidates = pool.filter((c) => c.provider === "openai");
  assert.ok(
    openaiCandidates.some((c) => c.model === "gpt-4o-mini"),
    "synced openai model must be a candidate"
  );
  assert.ok(
    !openaiCandidates.some((c) => c.model !== "gpt-4o-mini"),
    `only the synced openai model may be a candidate, got: ${openaiCandidates.map((c) => c.model).join(", ")}`
  );

  const kilocodeCandidates = pool.filter((c) => c.provider === "kilocode");
  assert.deepEqual(
    kilocodeCandidates.map((c) => c.model).sort(),
    ["kilocode/gpt-oss-120b", "kilocode/qwen3-coder"],
    "kilocode pool must contain exactly the two synced models"
  );
});
