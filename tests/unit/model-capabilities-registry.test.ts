import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { MODEL_SPECS } from "../../src/shared/constants/modelSpecs.ts";

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
      "gpt-4o-2024-11-20": buildCapability({
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
      // gemini-pro-agent is the callable High id and resolves to the shared
      // Gemini 3.1 Pro capability family.
      "gemini-3.1-pro": buildCapability({
        tool_call: false,
        reasoning: false,
        modalities_input: JSON.stringify(["text"]),
        modalities_output: JSON.stringify(["text"]),
        limit_context: 1024,
        limit_output: 9999,
      }),
    },
  });

  const gpt4o = modelCapabilities.getResolvedModelCapabilities("openai/gpt-4o-2024-11-20");
  assert.equal(gpt4o.toolCalling, false);
  assert.equal(gpt4o.reasoning, false);
  assert.equal(gpt4o.supportsVision, true);
  assert.equal(gpt4o.contextWindow, 256000);
  assert.equal(gpt4o.maxInputTokens, 256000);
  assert.equal(gpt4o.maxOutputTokens, 12345);
  assert.equal(modelCapabilities.getModelContextLimit("openai", "gpt-4o-2024-11-20"), 256000);
  assert.equal(modelCapabilities.capMaxOutputTokens("openai/gpt-4o-2024-11-20", 999999), 12345);

  const geminiHigh = modelCapabilities.getResolvedModelCapabilities("antigravity/gemini-pro-agent");
  assert.equal(geminiHigh.toolCalling, false);
  assert.equal(geminiHigh.reasoning, false);
  assert.equal(geminiHigh.supportsThinking, false);
  assert.equal(geminiHigh.contextWindow, 1024);
  assert.equal(geminiHigh.maxOutputTokens, 9999);
  assert.equal(geminiHigh.defaultThinkingBudget, 24576);
  assert.equal(modelCapabilities.capThinkingBudget("antigravity/gemini-pro-agent", 40000), 32768);

  const codexGpt55 = modelCapabilities.getResolvedModelCapabilities("codex/gpt-5.5");
  assert.equal(codexGpt55.contextWindow, 400000);
  // #6191: max_input_tokens is a distinct, smaller cap than the context window.
  assert.equal(codexGpt55.maxInputTokens, 272000);
  assert.equal(codexGpt55.maxOutputTokens, 128000);
  assert.equal(codexGpt55.supportsThinking, true);
  assert.equal(codexGpt55.supportsVision, true);

  const bedrockSonnet46 = modelCapabilities.getResolvedModelCapabilities(
    "bedrock/eu.anthropic.claude-sonnet-4-6"
  );
  assert.equal(bedrockSonnet46.contextWindow, 1000000);
  assert.equal(bedrockSonnet46.maxInputTokens, 1000000);
  assert.equal(bedrockSonnet46.maxOutputTokens, 64000);
  assert.equal(bedrockSonnet46.supportsVision, true);

  const bedrockSonnet45 = modelCapabilities.getResolvedModelCapabilities(
    "bedrock/anthropic.claude-sonnet-4-5"
  );
  assert.equal(bedrockSonnet45.contextWindow, 200000);
  assert.equal(bedrockSonnet45.maxOutputTokens, 64000);

  const bedrockOpus46 = modelCapabilities.getResolvedModelCapabilities(
    "bedrock/anthropic.claude-opus-4-6"
  );
  assert.equal(bedrockOpus46.contextWindow, 1000000);
  assert.equal(bedrockOpus46.maxOutputTokens, 128000);

  const bareGpt55 = modelCapabilities.getResolvedModelCapabilities("gpt-5.5");
  assert.equal(bareGpt55.contextWindow, 1050000);
});

test("unknown models keep maxOutputTokens null instead of using a generic default", () => {
  const unknown = modelCapabilities.getResolvedModelCapabilities(
    "openai-compatible-local/custom-large-output-model"
  );

  assert.equal(unknown.contextWindow, null);
  assert.equal(unknown.maxInputTokens, null);
  assert.equal(unknown.maxOutputTokens, null);
  assert.equal(
    modelCapabilities.capMaxOutputTokens(
      "openai-compatible-local/custom-large-output-model",
      32000
    ),
    32000
  );
  assert.equal(
    modelCapabilities.capMaxOutputTokens("openai-compatible-local/custom-large-output-model"),
    null
  );
});

test("Antigravity Gemini 3.5 upstream IDs share the Flash capability profile", () => {
  for (const modelId of [
    "gemini-3.5-flash-extra-low",
    "gemini-3.5-flash-low",
    "gemini-3-flash-agent",
  ]) {
    const spec = MODEL_SPECS[modelId];
    assert.ok(spec, `missing exact MODEL_SPECS entry for ${modelId}`);
    const capabilities = modelCapabilities.getResolvedModelCapabilities(`antigravity/${modelId}`);
    assert.equal(capabilities.contextWindow, 1048576, modelId);
    assert.equal(capabilities.maxOutputTokens, 65536, modelId);
    assert.equal(capabilities.supportsThinking, false, modelId);
    assert.equal(capabilities.supportsTools, true, modelId);
    assert.equal(capabilities.supportsVision, true, modelId);
  }
});

test("Antigravity Gemini 3.6 tier IDs share the Flash capability profile", () => {
  for (const modelId of [
    "gemini-3.6-flash-high",
    "gemini-3.6-flash-medium",
    "gemini-3.6-flash-low",
  ]) {
    const spec = MODEL_SPECS[modelId];
    assert.ok(spec, `missing exact MODEL_SPECS entry for ${modelId}`);
    const capabilities = modelCapabilities.getResolvedModelCapabilities(`antigravity/${modelId}`);
    assert.equal(capabilities.contextWindow, 1048576, modelId);
    assert.equal(capabilities.maxOutputTokens, 65536, modelId);
    assert.equal(capabilities.supportsThinking, false, modelId);
    assert.equal(capabilities.supportsTools, true, modelId);
    assert.equal(capabilities.supportsVision, true, modelId);
  }
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

test("Kimi K2.6 supports vision capability", () => {
  const kimi = modelCapabilities.getResolvedModelCapabilities("kimi-k2.6");
  assert.equal(kimi.supportsVision, true);
  assert.equal(kimi.supportsThinking, true);
  assert.equal(kimi.supportsTools, true);
  assert.equal(kimi.contextWindow, 262144);
  assert.equal(kimi.maxOutputTokens, 262144);

  // Also test via alias
  const kimiThinking = modelCapabilities.getResolvedModelCapabilities("kimi-k2.6-thinking");
  assert.equal(kimiThinking.supportsVision, true);
});

test("Kimi K2.7 Code resolves full capabilities instead of the degraded import defaults (#3761)", () => {
  // Spec-driven, so it works for any provider serving the model.
  const kimi = modelCapabilities.getResolvedModelCapabilities("kimi-k2.7-code");
  assert.equal(kimi.contextWindow, 262144);
  assert.equal(kimi.maxOutputTokens, 262144);
  assert.equal(kimi.supportsVision, true);
  assert.equal(kimi.supportsThinking, true);
  assert.equal(kimi.supportsTools, true);

  // The reported case: imported via Ollama Cloud's "import from /models". Before the
  // fix this had no spec/registry entry, so context fell back to the 128000 default
  // and max output to 8192, with vision dropped.
  const ollama = modelCapabilities.getResolvedModelCapabilities("ollama-cloud/kimi-k2.7-code");
  assert.equal(ollama.contextWindow, 262144);
  assert.equal(ollama.maxOutputTokens, 262144);
  assert.equal(ollama.supportsVision, true);
  assert.notEqual(ollama.contextWindow, 128000);
  assert.notEqual(ollama.maxOutputTokens, 8192);
});

test("GLM-5.2 context limits respect provider-hosted caps", () => {
  modelsDevSync.saveModelsDevCapabilities({
    huggingface: {
      "zai-org/GLM-5.2": buildCapability({
        limit_context: 128000,
        limit_input: 128000,
        limit_output: 128000,
      }),
    },
    "cloudflare-ai": {
      "@cf/zai-org/glm-5.2": buildCapability({
        limit_context: 128000,
        limit_input: 128000,
        limit_output: 128000,
      }),
    },
    zenmux: {
      "z-ai/glm-5.2": buildCapability({
        limit_context: 128000,
        limit_input: 128000,
        limit_output: 128000,
      }),
    },
  });

  for (const modelId of ["glm-5.2", "opencode-go/glm-5.2", "opencode/glm-5.2", "oc/glm-5.2"]) {
    const capabilities = modelCapabilities.getResolvedModelCapabilities(modelId);
    assert.equal(capabilities.contextWindow, 1000000, modelId);
    assert.equal(capabilities.maxInputTokens, 1000000, modelId);
  }

  for (const modelId of ["zenmux/z-ai/glm-5.2", "zenmux/z-ai/glm-5.2-free"]) {
    const capabilities = modelCapabilities.getResolvedModelCapabilities(modelId);
    assert.equal(capabilities.contextWindow, 1000000, modelId);
    assert.equal(capabilities.maxInputTokens, 1000000, modelId);
  }

  for (const modelId of ["cloudflare-ai/@cf/zai-org/glm-5.2", "cf/@cf/zai-org/glm-5.2"]) {
    const capabilities = modelCapabilities.getResolvedModelCapabilities(modelId);
    assert.equal(capabilities.contextWindow, 262144, modelId);
    assert.equal(capabilities.maxInputTokens, 262144, modelId);
  }

  for (const modelId of ["huggingface/zai-org/GLM-5.2", "hf/zai-org/GLM-5.2"]) {
    const capabilities = modelCapabilities.getResolvedModelCapabilities(modelId);
    assert.equal(capabilities.contextWindow, 262144, modelId);
    assert.equal(capabilities.maxInputTokens, 262144, modelId);
  }
});
