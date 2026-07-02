import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ProviderModelCapabilities } from "../../src/shared/types/modelConfig";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-model-caps-tokens-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");

type GeminiRequestForTest = {
  generationConfig: {
    thinkingConfig?: {
      thinkingBudget: number;
      includeThoughts: boolean;
    };
  };
};

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("OpenAI-compatible model names do not force max_tokens rewrite", () => {
  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai-compatible-review",
    model: "o3-mini",
  });

  assert.equal(runtime.supportsMaxTokens, true);
  assert.equal(
    modelCapabilities.supportsMaxTokens({ provider: "openai-compatible-review", model: "o3-mini" }),
    true
  );
});

test("OpenAI-format gateways do not force max_tokens rewrite from model names", () => {
  for (const provider of ["openrouter", "deepinfra", "vercel-ai-gateway"] as const) {
    const runtime = modelCapabilities.getResolvedModelCapabilities({
      provider,
      model: "openai/o3-mini",
    });
    assert.equal(runtime.supportsMaxTokens, true, provider);
  }
});

test("OpenAI to Claude translator preserves max effort when max support is unknown", async () => {
  const { openaiToClaudeRequest } =
    await import("../../open-sse/translator/request/openai-to-claude.ts");

  modelsDb.mergeModelCompatOverride("anthropic-compatible-cc-test", "claude-opus-4-7", {
    capabilities: { supportsMaxEffort: null },
  });

  const result = openaiToClaudeRequest(
    "claude-opus-4-7",
    {
      messages: [{ role: "user", content: "Think at max" }],
      reasoning_effort: "max",
    },
    false,
    { _provider: "anthropic-compatible-cc-test" }
  );

  assert.deepEqual(result.thinking, { type: "adaptive" });
  assert.deepEqual(result.output_config, { effort: "max" });
});

test("OpenAI to Claude translator downgrades max only when max support is explicit false", async () => {
  const { openaiToClaudeRequest } =
    await import("../../open-sse/translator/request/openai-to-claude.ts");

  modelsDb.mergeModelCompatOverride("anthropic-compatible-cc-test", "claude-opus-4-7", {
    capabilities: { supportsMaxEffort: false },
  });

  const result = openaiToClaudeRequest(
    "claude-opus-4-7",
    {
      messages: [{ role: "user", content: "Think at max" }],
      reasoning_effort: "max",
    },
    false,
    { _provider: "anthropic-compatible-cc-test" }
  );

  assert.deepEqual(result.thinking, { type: "adaptive" });
  assert.deepEqual(result.output_config, { effort: "high" });
});

test("context token delete markers mask context and max-input aliases together", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    {
      id: "provider/model-context-alias",
      name: "Provider Model Context Alias",
      source: "imported",
      capabilities: { contextWindow: 200000, maxInputTokens: 200000, maxOutputTokens: 8192 },
    },
  ]);

  modelsDb.mergeModelCompatOverride("openrouter", "provider/model-context-alias", {
    capabilities: { contextWindow: null },
  });

  const snapshot = modelsDb.getProviderModelConfigSnapshot(
    "openrouter",
    "provider/model-context-alias"
  );
  assert.equal(snapshot.capabilities?.contextWindow, undefined);
  assert.equal(snapshot.capabilities?.maxInputTokens, undefined);
  assert.equal(snapshot.capabilities?.maxOutputTokens, 8192);
});

test("synced explicit null token limits are preserved as unknown markers", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-a", [
    {
      id: "gpt-4.1",
      name: "GPT-4.1",
      source: "imported",
      capabilities: {
        contextWindow: null,
        maxOutputTokens: null,
      } as unknown as ProviderModelCapabilities,
    },
  ]);

  const snapshot = modelsDb.getProviderModelConfigSnapshot("openai", "gpt-4.1");
  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai",
    model: "gpt-4.1",
  });

  assert.deepEqual(snapshot.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
  });
  assert.equal(snapshot.capabilities, undefined);
  assert.equal(runtime.contextWindow, null);
  assert.equal(runtime.maxOutputTokens, null);
  assert.equal(runtime.contextWindowExplicitlyUnset, true);
  assert.equal(runtime.maxOutputTokensExplicitlyUnset, true);
});

test("legacy snake_case null token limits are preserved as unknown markers", async () => {
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
    )
    .run(
      "openai:conn-a",
      JSON.stringify([
        {
          id: "gpt-4.1",
          name: "GPT-4.1",
          source: "imported",
          max_input_tokens: null,
          max_output_tokens: null,
        },
      ])
    );

  const snapshot = modelsDb.getProviderModelConfigSnapshot("openai", "gpt-4.1");
  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai",
    model: "gpt-4.1",
  });

  assert.deepEqual(snapshot.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
  });
  assert.equal(runtime.contextWindow, null);
  assert.equal(runtime.maxOutputTokens, null);
  assert.equal(runtime.contextWindowExplicitlyUnset, true);
  assert.equal(runtime.maxOutputTokensExplicitlyUnset, true);
});

test("explicit null thinking budgets prevent Gemini fallback thinking budgets", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    {
      id: "provider/model-thinking-budget",
      name: "Provider Model Thinking Budget",
      source: "imported",
      capabilities: { defaultThinkingBudget: 8192 },
    },
  ]);

  modelsDb.mergeModelCompatOverride("openrouter", "provider/model-thinking-budget", {
    capabilities: { defaultThinkingBudget: null, thinkingBudgetCap: null },
  });

  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openrouter",
    model: "provider/model-thinking-budget",
  });
  assert.equal(runtime.defaultThinkingBudget, 0);
  assert.equal(runtime.defaultThinkingBudgetExplicitlyUnset, true);
  assert.equal(runtime.thinkingBudgetCapExplicitlyUnset, true);

  modelsDb.mergeModelCompatOverride("gemini", "gemini-2.5-pro", {
    capabilities: { defaultThinkingBudget: null, thinkingBudgetCap: null },
  });

  const autoFallback = openaiToGeminiRequest(
    "gemini-2.5-pro",
    { messages: [{ role: "user", content: "hello" }] },
    false,
    { _provider: "gemini" }
  ) as GeminiRequestForTest;
  assert.equal(autoFallback.generationConfig.thinkingConfig, undefined);

  const mediumEffort = openaiToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: "hello" }],
      reasoning_effort: "medium",
    },
    false,
    { _provider: "gemini" }
  ) as GeminiRequestForTest;
  assert.equal(mediumEffort.generationConfig.thinkingConfig, undefined);

  const maxEffort = openaiToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: "hello" }],
      reasoning_effort: "max",
    },
    false,
    { _provider: "gemini" }
  ) as GeminiRequestForTest;
  assert.equal(maxEffort.generationConfig.thinkingConfig, undefined);
});
