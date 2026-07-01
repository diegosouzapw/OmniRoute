import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { LegacyProviderModelCapabilitiesInput } from "../../src/shared/types/modelConfig";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-model-caps-null-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");

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

test("boolean null overrides mask registry capabilities as explicit unknown", async () => {
  modelsDb.mergeModelCompatOverride("gemini", "gemini-2.5-pro", {
    capabilities: { supportsVision: null, supportsTools: null },
  });
  modelsDb.mergeModelCompatOverride("gemini", "gemini-2.0-flash-thinking-exp-01-21", {
    capabilities: { supportsReasoning: null },
  });

  const pro = modelCapabilities.getResolvedModelCapabilities({
    provider: "gemini",
    model: "gemini-2.5-pro",
  });
  const thinking = modelCapabilities.getResolvedModelCapabilities({
    provider: "gemini",
    model: "gemini-2.0-flash-thinking-exp-01-21",
  });

  assert.equal(pro.supportsVision, null);
  assert.equal(pro.supportsTools, null);
  assert.equal(pro.toolCalling, true);
  assert.equal(thinking.supportsThinking, null);
  assert.equal(thinking.reasoning, true);
});

test("model capability overrides feed the runtime resolver", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "anthropic-compatible-cc-test",
    "conn-a",
    [
      {
        id: "claude-opus-4-7",
        name: "Claude Opus 4.7",
        source: "imported",
        capabilities: {
          supportsReasoning: true,
          supportsXHighEffort: true,
          supportsMaxEffort: true,
          contextWindow: 200000,
        },
      },
    ]
  );

  let runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "anthropic-compatible-cc-test",
    model: "claude-opus-4-7",
  });
  assert.equal(runtime.supportsXHighEffort, true);
  assert.equal(runtime.supportsMaxEffort, true);
  assert.equal(runtime.contextWindow, 200000);

  modelsDb.mergeModelCompatOverride("anthropic-compatible-cc-test", "claude-opus-4-7", {
    capabilities: { supportsXHighEffort: null, supportsMaxEffort: null },
  });

  runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "anthropic-compatible-cc-test",
    model: "claude-opus-4-7",
  });
  assert.equal(runtime.supportsXHighEffort, null);
  assert.equal(runtime.supportsMaxEffort, null);
  assert.equal(
    modelCapabilities.supportsXHighEffort({
      provider: "anthropic-compatible-cc-test",
      model: "claude-opus-4-7",
    }),
    true
  );
  assert.equal(
    modelCapabilities.supportsMaxEffort({
      provider: "anthropic-compatible-cc-test",
      model: "claude-opus-4-7",
    }),
    true
  );

  modelsDb.mergeModelCompatOverride("anthropic-compatible-cc-test", "claude-opus-4-7", {
    capabilities: { supportsXHighEffort: false, supportsMaxEffort: false, contextWindow: null },
  });

  runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "anthropic-compatible-cc-test",
    model: "claude-opus-4-7",
  });
  assert.equal(runtime.supportsXHighEffort, false);
  assert.equal(runtime.supportsMaxEffort, false);
  assert.equal(runtime.contextWindow, null);
});

test("capability aliases do not override explicit null masks in the same patch", async () => {
  modelsDb.mergeModelCompatOverride("claude", "claude-sonnet-4-6", {
    capabilities: {
      supportsTools: null,
      toolCalling: true,
      contextWindow: null,
      maxInputTokens: 200000,
      thinkingBudgetCap: null,
      maxThinkingBudget: 32000,
    } satisfies LegacyProviderModelCapabilitiesInput,
  });

  const override = modelsDb
    .getModelCompatOverrides("claude")
    .find((model) => model.id === "claude-sonnet-4-6");
  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "claude",
    model: "claude-sonnet-4-6",
  });

  assert.equal(override?.capabilities?.supportsTools, null);
  assert.equal(override?.capabilities?.contextWindow, null);
  assert.equal(override?.capabilities?.maxInputTokens, null);
  assert.equal(override?.capabilities?.thinkingBudgetCap, null);
  assert.equal(runtime.supportsTools, null);
  assert.equal(runtime.contextWindow, null);
  assert.equal(runtime.maxInputTokens, null);
  assert.equal(runtime.thinkingBudgetCap, null);
});
