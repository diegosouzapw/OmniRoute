import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-capabilities-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");

function buildCapability(overrides = {}) {
  return {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: null,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
    ...overrides,
  };
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("canonical model capability resolver lets exact synced metadata override global specs", () => {
  modelsDevSync.saveModelsDevCapabilities({
    openai: {
      "gpt-4o": buildCapability({
        tool_call: false,
        reasoning: false,
        attachment: true,
        structured_output: true,
        temperature: true,
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
        family: "gpt-4",
        status: "stable",
        limit_context: 256000,
        limit_input: 256000,
        limit_output: 12345,
      }),
    },
    antigravity: {
      "gemini-3.1-pro-high": buildCapability({
        tool_call: false,
        reasoning: false,
        modalities_input: JSON.stringify(["text"]),
        modalities_output: JSON.stringify(["text"]),
        limit_context: 1024,
        limit_output: 9999,
      }),
    },
  });

  const gpt4o = modelCapabilities.getResolvedModelCapabilities("openai/gpt-4o");
  assert.equal(gpt4o.toolCalling, false);
  assert.equal(gpt4o.reasoning, false);
  assert.equal(gpt4o.supportsVision, true);
  assert.equal(gpt4o.contextWindow, 256000);
  assert.equal(gpt4o.maxInputTokens, 256000);
  assert.equal(gpt4o.maxOutputTokens, 12345);
  assert.equal(modelCapabilities.getModelContextLimit("openai", "gpt-4o"), 256000);
  assert.equal(modelCapabilities.capMaxOutputTokens("openai/gpt-4o", 999999), 12345);

  const geminiHigh = modelCapabilities.getResolvedModelCapabilities(
    "antigravity/gemini-3.1-pro-high"
  );
  assert.equal(geminiHigh.toolCalling, false);
  assert.equal(geminiHigh.reasoning, false);
  assert.equal(geminiHigh.supportsThinking, false);
  assert.equal(geminiHigh.contextWindow, 1024);
  assert.equal(geminiHigh.maxOutputTokens, 9999);
  assert.equal(geminiHigh.defaultThinkingBudget, 24576);
  assert.equal(
    modelCapabilities.capThinkingBudget("antigravity/gemini-3.1-pro-high", 40000),
    32768
  );

  const codexGpt55 = modelCapabilities.getResolvedModelCapabilities("codex/gpt-5.5");
  assert.equal(codexGpt55.contextWindow, 1050000);
  assert.equal(codexGpt55.maxOutputTokens, 128000);
  assert.equal(codexGpt55.supportsThinking, true);
  assert.equal(codexGpt55.supportsVision, true);
});

test("GPT OSS and DeepSeek Reasoner models support tool calling", () => {
  // GPT OSS models should not be blocked by the heuristic
  assert.equal(modelCapabilities.supportsToolCalling("fake-provider/gpt-oss-120b"), true);
  assert.equal(modelCapabilities.supportsToolCalling("gpt-oss-120b"), true);
  assert.equal(modelCapabilities.supportsToolCalling("nvidia/openai/gpt-oss-20b"), false); // in registry

  // DeepSeek Reasoner supports tool calling
  assert.equal(modelCapabilities.supportsToolCalling("deepseek-reasoner"), true);
  assert.equal(modelCapabilities.supportsToolCalling("deepseek/deepseek-r1"), true);

  // Full capability resolution
  const gptOss = modelCapabilities.getResolvedModelCapabilities("fake-provider/gpt-oss-120b");
  assert.equal(gptOss.toolCalling, true);
  const deepseek = modelCapabilities.getResolvedModelCapabilities("deepseek/deepseek-reasoner");
  assert.equal(deepseek.toolCalling, true);
});
