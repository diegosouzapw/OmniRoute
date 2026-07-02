import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-model-caps-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const contextManager = await import("../../open-sse/services/contextManager.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function writeCustomModels(providerId: string, models: unknown[]) {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)")
    .run(providerId, JSON.stringify(models));
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("explicit reasoning override can enable models blocked by heuristic deny-list", async () => {
  modelsDb.mergeModelCompatOverride("antigravity", "gemini-3-pro", {
    capabilities: { supportsReasoning: true },
  });

  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "antigravity",
    model: "gemini-3-pro",
  });

  assert.equal(runtime.reasoning, true);
  assert.equal(runtime.supportsThinking, true);
});

test("Antigravity registry reasoning metadata wins over legacy deny-list", () => {
  for (const model of [
    "claude-sonnet-4-6",
    "gemini-2.5-pro",
    "gemini-3.1-pro-high",
    "gemini-3.1-pro-low",
  ]) {
    const runtime = modelCapabilities.getResolvedModelCapabilities({
      provider: "antigravity",
      model,
    });

    assert.equal(runtime.supportsThinking, true, model);
    assert.equal(runtime.reasoning, true, model);
  }
});

test("Claude Code compatible effort resolver honors provider-specific xhigh/max overrides", async () => {
  const { resolveClaudeCodeCompatibleEffort } =
    await import("../../open-sse/services/claudeCodeCompatible.ts");

  modelsDb.mergeModelCompatOverride("anthropic-compatible-cc-test", "claude-opus-4-7", {
    capabilities: { supportsXHighEffort: false, supportsMaxEffort: false },
  });

  for (const effort of ["xhigh", "max"]) {
    assert.equal(
      resolveClaudeCodeCompatibleEffort(
        { output_config: { effort } },
        null,
        "claude-opus-4-7",
        "anthropic-compatible-cc-test"
      ),
      "high"
    );
  }
});

test("Claude Code compatible effort resolver treats xhigh/max null overrides as unknown", async () => {
  const { resolveClaudeCodeCompatibleEffort } =
    await import("../../open-sse/services/claudeCodeCompatible.ts");

  modelsDb.mergeModelCompatOverride("anthropic-compatible-cc-test", "claude-opus-4-7", {
    capabilities: { supportsXHighEffort: null, supportsMaxEffort: null },
  });

  assert.equal(
    resolveClaudeCodeCompatibleEffort(
      { output_config: { effort: "xhigh" } },
      null,
      "claude-opus-4-7",
      "anthropic-compatible-cc-test"
    ),
    "xhigh"
  );
  assert.equal(
    resolveClaudeCodeCompatibleEffort(
      { output_config: { effort: "max" } },
      null,
      "claude-opus-4-7",
      "anthropic-compatible-cc-test"
    ),
    "max"
  );
});

test("CC-compatible aggregate model IDs resolve through their provider node prefix", () => {
  const fable = modelCapabilities.getResolvedModelCapabilities({
    provider: "cc-compatible",
    model: "free-anthropic/claude-fable-5",
  });

  assert.equal(fable.provider, "anthropic-compatible-cc-free-anthropic");
  assert.equal(fable.model, "claude-fable-5");
  assert.equal(fable.supportsVision, true);
  assert.equal(fable.supportsTools, true);
  assert.equal(fable.supportsThinking, true);
  assert.equal(fable.supportsXHighEffort, true);
  assert.equal(fable.supportsMaxEffort, true);
  assert.equal(fable.contextWindow, 1000000);
  assert.equal(fable.maxOutputTokens, 128000);

  const opus46 = modelCapabilities.getResolvedModelCapabilities({
    provider: "cc-compatible",
    model: "free-anthropic/claude-opus-4-6",
  });
  assert.equal(opus46.provider, "anthropic-compatible-cc-free-anthropic");
  assert.equal(opus46.model, "claude-opus-4-6");
  assert.equal(opus46.supportsXHighEffort, false);
  assert.equal(opus46.supportsMaxEffort, true);
});

test("capability patches can clear legacy custom model token limits", async () => {
  await modelsDb.addCustomModel(
    "openrouter",
    "manual/model",
    "Manual Model",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    { inputTokenLimit: 32000, outputTokenLimit: 4096 }
  );

  let snapshot = modelsDb.getProviderModelConfigSnapshot("openrouter", "manual/model");
  assert.equal(snapshot.capabilities?.contextWindow, 32000);
  assert.equal(snapshot.capabilities?.maxOutputTokens, 4096);

  await modelsDb.updateCustomModel("openrouter", "manual/model", {
    capabilities: {
      contextWindow: null,
      maxInputTokens: null,
      inputTokenLimit: null,
      maxOutputTokens: null,
      outputTokenLimit: null,
    },
  });

  const [row] = await modelsDb.getCustomModels("openrouter");
  snapshot = modelsDb.getProviderModelConfigSnapshot("openrouter", "manual/model");
  assert.equal(row.inputTokenLimit, undefined);
  assert.equal(row.outputTokenLimit, undefined);
  assert.deepEqual(row.capabilities, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
  });
  assert.deepEqual(row.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
  });
  assert.equal(snapshot.capabilities, undefined);
});

test("custom models keep unknown effort capabilities when not explicitly configured", async () => {
  await modelsDb.addCustomModel("openrouter", "manual/no-effort", "Manual No Effort");

  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openrouter",
    model: "manual/no-effort",
  });

  assert.equal(runtime.supportsXHighEffort, null);
  assert.equal(runtime.supportsMaxEffort, null);
  assert.equal(
    modelCapabilities.supportsXHighEffort({ provider: "openrouter", model: "manual/no-effort" }),
    true
  );
  assert.equal(
    modelCapabilities.supportsMaxEffort({ provider: "openrouter", model: "manual/no-effort" }),
    true
  );
});

test("custom OpenAI-compatible Claude-like models keep effort capabilities unknown", async () => {
  await modelsDb.addCustomModel(
    "openai-compatible-demo",
    "claude-fable-5",
    "Claude Fable via OpenAI-compatible"
  );

  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai-compatible-demo",
    model: "claude-fable-5",
  });

  assert.equal(runtime.supportsXHighEffort, null);
  assert.equal(runtime.supportsMaxEffort, null);
});

test("generic Anthropic-compatible models do not inherit Claude effort capabilities", () => {
  for (const model of ["claude-fable-5", "claude-opus-4-7", "claude-opus-4-6"]) {
    const runtime = modelCapabilities.getResolvedModelCapabilities({
      provider: "anthropic-compatible-demo",
      model,
    });
    assert.equal(runtime.supportsXHighEffort, null, `${model} xhigh should remain unknown`);
    assert.equal(runtime.supportsMaxEffort, null, `${model} max should remain unknown`);
  }
});

test("custom CC-compatible models still inherit shared CC effort capabilities", async () => {
  await modelsDb.addCustomModel("anthropic-compatible-cc-test", "claude-fable-5", "Claude Fable 5");
  await modelsDb.addCustomModel(
    "anthropic-compatible-cc-test",
    "claude-opus-4-6",
    "Claude Opus 4.6"
  );
  await modelsDb.addCustomModel(
    "anthropic-compatible-cc-test",
    "free-anthropic/claude-fable-5",
    "Claude Fable 5 via CC route"
  );

  const fable = modelCapabilities.getResolvedModelCapabilities({
    provider: "anthropic-compatible-cc-test",
    model: "claude-fable-5",
  });
  assert.equal(fable.supportsXHighEffort, true);
  assert.equal(fable.supportsMaxEffort, true);

  const opus46 = modelCapabilities.getResolvedModelCapabilities({
    provider: "anthropic-compatible-cc-test",
    model: "claude-opus-4-6",
  });
  assert.equal(opus46.supportsXHighEffort, false);
  assert.equal(opus46.supportsMaxEffort, true);

  const routedFable = modelCapabilities.getResolvedModelCapabilities({
    provider: "anthropic-compatible-cc-test",
    model: "free-anthropic/claude-fable-5",
  });
  assert.equal(routedFable.supportsTools, true);
  assert.equal(routedFable.supportsThinking, true);
  assert.equal(routedFable.supportsVision, true);
  assert.equal(routedFable.supportsXHighEffort, true);
  assert.equal(routedFable.supportsMaxEffort, true);
  assert.equal(routedFable.contextWindow, 1_000_000);
  assert.equal(routedFable.maxOutputTokens, 128_000);
});

test("custom numeric delete markers mask registry token limits for same-id models", async () => {
  await modelsDb.addCustomModel(
    "openai",
    "gpt-4.1",
    "GPT-4.1 Custom",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    { inputTokenLimit: 32000, outputTokenLimit: 4096 }
  );

  let runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai",
    model: "gpt-4.1",
  });
  assert.equal(runtime.contextWindow, 32000);
  assert.equal(runtime.maxOutputTokens, 4096);

  await modelsDb.updateCustomModel("openai", "gpt-4.1", {
    capabilities: { contextWindow: null, maxOutputTokens: null },
  });

  const [row] = await modelsDb.getCustomModels("openai");
  const snapshot = modelsDb.getProviderModelConfigSnapshot("openai", "gpt-4.1");
  runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai",
    model: "gpt-4.1",
  });

  assert.deepEqual(row.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
  });
  assert.equal(snapshot.capabilities, undefined);
  assert.equal(runtime.contextWindow, null);
  assert.equal(runtime.maxInputTokens, null);
  assert.equal(runtime.maxOutputTokens, null);

  await modelsDb.resetProviderModelConfig("openai", "gpt-4.1");

  runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai",
    model: "gpt-4.1",
  });
  assert.equal(runtime.contextWindow, 32000);
  assert.equal(runtime.maxOutputTokens, 4096);
});

test("replaceCustomModels preserves explicit null capability overrides", async () => {
  await modelsDb.replaceCustomModels("openrouter", [
    {
      id: "provider/replace-mask",
      name: "Provider Replace Mask",
      source: "imported",
      inputTokenLimit: 1000,
      outputTokenLimit: 200,
    },
  ]);

  await modelsDb.updateCustomModel("openrouter", "provider/replace-mask", {
    capabilities: { contextWindow: null, maxOutputTokens: null },
  });

  await modelsDb.replaceCustomModels("openrouter", [
    {
      id: "provider/replace-mask",
      name: "Provider Replace Mask",
      source: "imported",
      inputTokenLimit: 1000,
      outputTokenLimit: 200,
    },
  ]);

  const [row] = await modelsDb.getCustomModels("openrouter");
  const snapshot = modelsDb.getProviderModelConfigSnapshot("openrouter", "provider/replace-mask");
  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openrouter",
    model: "provider/replace-mask",
  });

  assert.deepEqual(row.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
  });
  assert.deepEqual(snapshot.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
  });
  assert.equal(snapshot.capabilities, undefined);
  assert.equal(runtime.contextWindow, null);
  assert.equal(runtime.maxInputTokens, null);
  assert.equal(runtime.maxOutputTokens, null);
});

test("context manager treats explicit null context as no configured limit", async () => {
  await modelsDb.addCustomModel(
    "openai",
    "gpt-4.1",
    "GPT-4.1 Custom",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    { inputTokenLimit: 32000 }
  );
  await modelsDb.updateCustomModel("openai", "gpt-4.1", {
    capabilities: { contextWindow: null },
  });

  assert.equal(contextManager.getTokenLimit("openai", "gpt-4.1"), null);
  assert.deepEqual(
    contextManager.resolveComboContextLimit({
      provider: "openai",
      model: "gpt-4.1",
      comboTargetLimits: [8192],
    }),
    { limit: null, source: "target" }
  );
  assert.equal(
    contextManager.compressContext(
      {
        model: "gpt-4.1",
        messages: [{ role: "user", content: "x".repeat(100000) }],
      },
      { provider: "openai" }
    ).compressed,
    false
  );
});

test("request translators use provider-scoped output and thinking caps", async () => {
  await modelsDb.addCustomModel(
    "anthropic-compatible-cc-test",
    "claude-provider-cap-test",
    "Claude Provider Cap Test",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    { outputTokenLimit: 4096 }
  );
  await modelsDb.addCustomModel(
    "vertex",
    "gemini-provider-cap-test",
    "Gemini Provider Cap Test",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    { outputTokenLimit: 1234 },
    {
      capabilities: {
        defaultThinkingBudget: 456,
        thinkingBudgetCap: 789,
      },
    }
  );

  const { openaiToClaudeRequest } =
    await import("../../open-sse/translator/request/openai-to-claude.ts");
  const { openaiToGeminiRequest } =
    await import("../../open-sse/translator/request/openai-to-gemini.ts");
  const { claudeToGeminiRequest } =
    await import("../../open-sse/translator/request/claude-to-gemini.ts");

  const claude = openaiToClaudeRequest(
    "claude-provider-cap-test",
    {
      messages: [{ role: "user", content: "think" }],
      max_tokens: 1000,
      reasoning_effort: "high",
    },
    false,
    { _provider: "anthropic-compatible-cc-test" }
  );
  assert.equal(claude.max_tokens, 4096);
  assert.deepEqual(claude.thinking, { type: "enabled", budget_tokens: 3072 });

  const gemini = openaiToGeminiRequest(
    "gemini-provider-cap-test",
    {
      messages: [{ role: "user", content: "think" }],
      max_tokens: 9999,
      reasoning_effort: "high",
    },
    false,
    { _provider: "vertex" }
  );
  assert.equal(gemini.generationConfig.maxOutputTokens, 1234);
  assert.deepEqual(gemini.generationConfig.thinkingConfig, {
    thinkingBudget: 789,
    includeThoughts: true,
  });

  const claudeToGemini = claudeToGeminiRequest(
    "gemini-provider-cap-test",
    {
      messages: [{ role: "user", content: "think" }],
      max_tokens: 9999,
      output_config: { effort: "high" },
    },
    false,
    { _provider: "vertex" }
  );
  assert.equal(claudeToGemini.generationConfig.maxOutputTokens, 1234);
  assert.deepEqual(claudeToGemini.generationConfig.thinkingConfig, {
    thinkingBudget: 789,
    includeThoughts: true,
  });
});

test("malformed model JSON rows fail open during model config reads", async () => {
  const db = core.getDbInstance();
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "customModels",
    "openrouter",
    "{not-json"
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "syncedAvailableModels",
    "openrouter:bad",
    "{not-json"
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "syncedAvailableModels",
    "openrouter:good",
    JSON.stringify([{ id: "provider/good", name: "Good Model", source: "imported" }])
  );

  assert.deepEqual(await modelsDb.getCustomModels("openrouter"), []);
  assert.deepEqual(await modelsDb.getSyncedAvailableModelsForConnection("openrouter", "bad"), []);
  assert.deepEqual(await modelsDb.getSyncedAvailableModels("openrouter"), [
    { id: "provider/good", name: "Good Model", source: "imported" },
  ]);
  const replaced = await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "bad", [
    { id: "provider/new", name: "New Model", source: "imported" },
  ]);
  assert.deepEqual(replaced.map((model) => model.id).sort(), ["provider/good", "provider/new"]);
});

test("capability updates canonicalize legacy thinking fields on custom models", async () => {
  writeCustomModels("openrouter", [
    {
      id: "legacy/thinking-model",
      name: "Legacy Thinking Model",
      source: "manual",
      supportsThinking: false,
      reasoningEfforts: ["low"],
    },
  ]);

  await modelsDb.updateCustomModel("openrouter", "legacy/thinking-model", {
    capabilities: { supportsReasoning: true },
  });

  const [row] = (await modelsDb.getCustomModels("openrouter")) as Array<Record<string, unknown>>;
  const capabilities = row.capabilities as Record<string, unknown> | undefined;
  assert.equal(row.supportsThinking, undefined);
  assert.equal(row.reasoningEfforts, undefined);
  assert.equal(row.supportsReasoning, undefined);
  assert.equal(capabilities?.supportsThinking, undefined);
  assert.equal(capabilities?.reasoningEfforts, undefined);
  assert.equal(capabilities?.supportsReasoning, true);
});

test("capability delete markers mask synced model config snapshots until reset", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    {
      id: "provider/model-mask",
      name: "Provider Model Mask",
      source: "imported",
      capabilities: { contextWindow: 200000, maxOutputTokens: 8192, supportsVision: true },
    },
  ]);

  modelsDb.mergeModelCompatOverride("openrouter", "provider/model-mask", {
    capabilities: {
      contextWindow: null,
      maxInputTokens: null,
      inputTokenLimit: null,
      maxOutputTokens: null,
      outputTokenLimit: null,
      supportsVision: null,
      supportsTools: null,
    },
  });

  let snapshot = modelsDb.getProviderModelConfigSnapshot("openrouter", "provider/model-mask");
  const runtimeBefore = modelCapabilities.getResolvedModelCapabilities({
    provider: "openrouter",
    model: "provider/model-mask",
  });

  assert.deepEqual(snapshot.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
    supportsVision: null,
    supportsTools: null,
  });
  assert.equal(snapshot.capabilities?.supportsVision, undefined);
  assert.equal(snapshot.capabilities?.supportsTools, undefined);
  assert.equal(snapshot.capabilities?.contextWindow, undefined);
  assert.equal(snapshot.capabilities?.maxOutputTokens, undefined);
  assert.equal(runtimeBefore.supportsVision, null);
  assert.equal(runtimeBefore.supportsTools, null);
  assert.equal(runtimeBefore.toolCalling, true);
  assert.equal(runtimeBefore.contextWindow, null);
  assert.equal(runtimeBefore.maxInputTokens, null);
  assert.equal(runtimeBefore.maxOutputTokens, null);
  assert.equal(runtimeBefore.contextWindowExplicitlyUnset, true);
  assert.equal(runtimeBefore.maxOutputTokensExplicitlyUnset, true);

  await modelsDb.resetProviderModelConfig("openrouter", "provider/model-mask");

  snapshot = modelsDb.getProviderModelConfigSnapshot("openrouter", "provider/model-mask");
  const runtimeAfter = modelCapabilities.getResolvedModelCapabilities({
    provider: "openrouter",
    model: "provider/model-mask",
  });
  assert.equal(snapshot.capabilities?.contextWindow, 200000);
  assert.equal(snapshot.capabilities?.maxOutputTokens, 8192);
  assert.equal(runtimeAfter.contextWindow, 200000);
  assert.equal(runtimeAfter.maxOutputTokens, 8192);
});

test("reset removes legacy custom rows that shadow synced models while keeping manual-only rows", async () => {
  writeCustomModels("openrouter", [
    {
      id: "provider/legacy-synced",
      name: "Legacy Synced Model",
      source: "imported",
      isHidden: true,
      capabilities: {
        supportsVision: false,
        maxOutputTokens: 2048,
      },
    },
    {
      id: "manual/legacy-only",
      name: "Manual Legacy Only",
      source: "manual",
      inputTokenLimit: 32000,
      supportsVision: false,
    },
  ]);
  await modelsDb.addCustomModel(
    "openrouter",
    "manual/synced-same-id",
    "Manual Synced Same ID",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    { inputTokenLimit: 32000 },
    { capabilities: { supportsVision: false } }
  );
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    {
      id: "provider/legacy-synced",
      name: "Synced Model",
      source: "imported",
      capabilities: {
        supportsVision: true,
        contextWindow: 128000,
        maxOutputTokens: 8192,
      },
    },
    {
      id: "manual/synced-same-id",
      name: "Synced Same ID",
      source: "imported",
      capabilities: {
        supportsVision: true,
        contextWindow: 128000,
        maxOutputTokens: 8192,
      },
    },
  ]);

  const resetSynced = await modelsDb.resetProviderModelConfig(
    "openrouter",
    "provider/legacy-synced"
  );
  const customAfterSyncedReset = await modelsDb.getCustomModels("openrouter");
  const syncedOverride = modelsDb
    .getModelCompatOverrides("openrouter")
    .find((model) => model.id === "provider/legacy-synced");
  const syncedSnapshot = modelsDb.getProviderModelConfigSnapshot(
    "openrouter",
    "provider/legacy-synced"
  );

  assert.equal(resetSynced?.name, "Synced Model");
  assert.equal(resetSynced?.capabilities?.supportsVision, true);
  assert.equal(resetSynced?.capabilities?.contextWindow, 128000);
  assert.equal(
    customAfterSyncedReset.some((model) => model.id === "provider/legacy-synced"),
    false
  );
  assert.equal(
    customAfterSyncedReset.some((model) => model.id === "manual/legacy-only"),
    true
  );
  assert.deepEqual(syncedOverride, { id: "provider/legacy-synced", isHidden: true });
  assert.equal(modelsDb.getModelIsHidden("openrouter", "provider/legacy-synced"), true);
  assert.equal(syncedSnapshot.source, "synced");
  assert.equal(syncedSnapshot.capabilities?.supportsVision, true);
  assert.equal(syncedSnapshot.capabilities?.maxOutputTokens, 8192);

  const resetManualSynced = await modelsDb.resetProviderModelConfig(
    "openrouter",
    "manual/synced-same-id"
  );
  const manualSyncedSnapshot = modelsDb.getProviderModelConfigSnapshot(
    "openrouter",
    "manual/synced-same-id"
  );
  const customAfterManualSyncedReset = await modelsDb.getCustomModels("openrouter");

  assert.equal(resetManualSynced?.name, "Synced Same ID");
  assert.equal(resetManualSynced?.capabilities?.supportsVision, true);
  assert.equal(manualSyncedSnapshot.source, "synced");
  assert.equal(manualSyncedSnapshot.capabilities?.contextWindow, 128000);
  assert.equal(
    customAfterManualSyncedReset.some((model) => model.id === "manual/synced-same-id"),
    false
  );

  const resetManual = await modelsDb.resetProviderModelConfig("openrouter", "manual/legacy-only");
  const customAfterManualReset = await modelsDb.getCustomModels("openrouter");
  const manualRow = customAfterManualReset.find((model) => model.id === "manual/legacy-only");

  assert.equal(resetManual?.id, "manual/legacy-only");
  assert.equal(manualRow?.source, "manual");
  assert.equal(manualRow?.capabilities, undefined);
  assert.equal(manualRow?.baseline?.id, "manual/legacy-only");
});

test("custom model reset preserves baseline null capability masks", async () => {
  writeCustomModels("openai", [
    {
      id: "gpt-4.1",
      name: "GPT-4.1 Edited",
      source: "imported",
      capabilities: { supportsVision: true },
      baseline: {
        id: "gpt-4.1",
        name: "GPT-4.1 Baseline",
        source: "imported",
        capabilityOverrides: {
          supportsVision: null,
          supportsMaxEffort: null,
        },
      },
    },
  ]);

  await modelsDb.resetProviderModelConfig("openai", "gpt-4.1");

  const snapshot = modelsDb.getProviderModelConfigSnapshot("openai", "gpt-4.1");
  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai",
    model: "gpt-4.1",
  });

  assert.deepEqual(snapshot.capabilityOverrides, {
    supportsVision: null,
    supportsMaxEffort: null,
  });
  assert.equal(snapshot.capabilities?.supportsVision, undefined);
  assert.equal(runtime.supportsVision, null);
  assert.equal(runtime.supportsMaxEffort, null);
});
