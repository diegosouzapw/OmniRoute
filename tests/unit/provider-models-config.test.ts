import test from "node:test";
import assert from "node:assert/strict";

import {
  PROVIDER_ID_TO_ALIAS,
  PROVIDER_MODELS,
  findModelName,
  getDefaultModel,
  getMaxEffortSupport,
  getModelTargetFormat,
  getModelsByProviderId,
  getProviderModels,
  getXHighEffortSupport,
  isValidModel,
  supportsXHighEffort,
} from "../../open-sse/config/providerModels.ts";
import { buildNewModelCapabilities } from "../../src/app/(dashboard)/dashboard/providers/[id]/customModelFormHelpers.ts";
import { effectiveModelCapabilitiesFromRows } from "../../src/app/(dashboard)/dashboard/providers/[id]/modelConfigHelpers.ts";
import { providerModelCapabilitiesSchema } from "../../src/shared/validation/schemas/misc.ts";

test("provider models helpers expose model lists and defaults", () => {
  const openaiModels = getProviderModels("openai");

  assert.ok(Array.isArray(openaiModels));
  assert.ok(openaiModels.length > 0);
  assert.equal(getProviderModels("provider-that-does-not-exist").length, 0);
  assert.equal(getDefaultModel("openai"), openaiModels[0].id);
  assert.equal(getDefaultModel("provider-that-does-not-exist"), null);
});

test("provider models helpers validate and resolve model metadata", () => {
  const openaiModels = PROVIDER_MODELS.openai;
  const firstModel = openaiModels[0];

  assert.equal(isValidModel("openai", firstModel.id), true);
  assert.equal(isValidModel("openai", "missing-model"), false);
  assert.equal(
    isValidModel("passthrough-provider", "anything-goes", new Set(["passthrough-provider"])),
    true
  );

  assert.equal(findModelName("openai", firstModel.id), firstModel.name);
  assert.equal(findModelName("openai", "missing-model"), "missing-model");
  assert.equal(findModelName("missing-provider", "missing-model"), "missing-model");

  assert.equal(
    getModelTargetFormat("openai", firstModel.id),
    firstModel.compat?.targetFormat || null
  );
  assert.equal(getModelTargetFormat("openai", "missing-model"), null);
  assert.equal(getModelTargetFormat("missing-provider", "missing-model"), null);
});

test("provider models helpers resolve provider IDs through aliases", () => {
  const firstProviderId = Object.keys(PROVIDER_ID_TO_ALIAS)[0];
  const alias = PROVIDER_ID_TO_ALIAS[firstProviderId] || firstProviderId;

  assert.deepEqual(getModelsByProviderId(firstProviderId), PROVIDER_MODELS[alias] || []);
  assert.deepEqual(getModelsByProviderId("provider-that-does-not-exist"), []);
});

test("getProviderModels returns models for both the alias and the raw provider id", () => {
  // Pick a provider whose alias differs from its id (e.g. "github" → "gh").
  const aliased = Object.entries(PROVIDER_ID_TO_ALIAS).find(([id, a]) => id !== a) as
    | [string, string]
    | undefined;
  if (!aliased) return; // no aliased providers → trivially satisfied

  const [rawId, alias] = aliased;
  const byAlias = getProviderModels(alias);
  const byRawId = getProviderModels(rawId);

  assert.ok(byAlias.length > 0, `expected models under alias "${alias}"`);
  assert.deepEqual(
    byRawId,
    byAlias,
    `getProviderModels("${rawId}") should return the same models as getProviderModels("${alias}")`
  );
});

test("Claude Code compatible custom providers share the cc default model list", () => {
  const ccModels = getProviderModels("cc");
  const compatibleModels = getProviderModels("anthropic-compatible-cc-test");

  assert.ok(ccModels.length > 0);
  assert.deepEqual(
    compatibleModels.map((model) => model.id),
    ccModels.map((model) => model.id)
  );
  assert.deepEqual(
    getModelsByProviderId("anthropic-compatible-cc-test").map((model) => model.id),
    ccModels.map((model) => model.id)
  );
  assert.equal(getDefaultModel("anthropic-compatible-cc-test"), getDefaultModel("cc"));
  assert.equal(isValidModel("anthropic-compatible-cc-test", "claude-fable-5"), true);
});

test("provider model metadata helpers resolve raw provider IDs and aliases", () => {
  const providerId = "gitlawb-gmi";
  const alias = PROVIDER_ID_TO_ALIAS[providerId];
  assert.equal(alias, "glb-gmi");

  const modelId = "anthropic/claude-opus-4.7";
  assert.equal(isValidModel(alias, modelId), true);
  assert.equal(isValidModel(providerId, modelId), true);
  assert.equal(findModelName(providerId, modelId), findModelName(alias, modelId));
  assert.equal(getModelTargetFormat(providerId, modelId), getModelTargetFormat(alias, modelId));
});

test("Reka registry exposes preset models", () => {
  const rekaModels = getModelsByProviderId("reka");
  const ids = rekaModels.map((model) => model.id);

  assert.equal(PROVIDER_ID_TO_ALIAS.reka, "reka");
  assert.equal(getDefaultModel("reka"), "reka-flash-3");
  assert.deepEqual(ids, ["reka-flash-3", "reka-flash", "reka-edge-2603"]);
  assert.equal(isValidModel("reka", "reka-edge-2603"), true);
  assert.equal(isValidModel("reka", "reka-flash"), true);
});

test("GitHub Copilot registry reflects the current supported model lineup", () => {
  const githubModels = getProviderModels("gh");
  const ids = new Set(githubModels.map((model) => model.id));

  assert.ok(ids.has("gpt-5.3-codex"));
  assert.ok(ids.has("gpt-5.4"));
  assert.ok(ids.has("gpt-5.4-mini"));
  assert.ok(ids.has("claude-opus-4.7"));
  assert.ok(ids.has("claude-opus-4.6"));
  assert.ok(ids.has("claude-sonnet-4.6"));
  assert.ok(ids.has("gemini-3-flash-preview"));
  assert.equal(getModelTargetFormat("gh", "gpt-5.3-codex"), "openai-responses");
  assert.equal(getModelTargetFormat("gh", "claude-opus-4.6"), null);
  assert.equal(ids.has("gpt-5.1"), false);
  assert.equal(ids.has("gpt-5.1-codex"), false);
  assert.equal(ids.has("claude-opus-4.1"), false);
});

test("Kiro registry exposes the current CLI model lineup with context windows", () => {
  const kiroModels = getProviderModels("kr");
  const byId = new Map(kiroModels.map((model) => [model.id, model]));

  assert.ok(byId.has("claude-opus-4.7"));
  assert.equal(byId.get("claude-opus-4.7")?.capabilities?.contextWindow, 1000000);
  assert.ok(byId.has("claude-sonnet-4.6"));
  assert.ok(byId.has("claude-haiku-4.5"));
  assert.equal(byId.has("claude-opus-4-7"), false);
  assert.equal(byId.has("claude-sonnet-4-6"), false);
  assert.equal(byId.has("claude-haiku-4-5"), false);
});

test("Claude max effort support is explicit provider-scoped metadata", () => {
  assert.equal(getMaxEffortSupport("claude", "claude-opus-4-7"), true);
  assert.equal(getMaxEffortSupport("claude", "claude-opus-4-6"), true);
  assert.equal(getMaxEffortSupport("claude", "claude-sonnet-4-6"), true);
  assert.equal(getMaxEffortSupport("claude", "claude-sonnet-4-5-20250929"), true);
  assert.equal(getMaxEffortSupport("claude", "claude-haiku-4-5-20251001"), false);
  assert.equal(getMaxEffortSupport("claude", "claude-future-5-0"), undefined);
  assert.equal(getMaxEffortSupport("unknown-provider", "vendor/claude-sonnet-4-6"), undefined);
});

test("xhigh effort support defaults to pass-through and opts out explicit false models", () => {
  const claudeModels = new Set(getModelsByProviderId("claude").map((model) => model.id));

  assert.ok(claudeModels.has("claude-opus-4-8"));
  assert.equal(supportsXHighEffort("claude", "claude-opus-4-8"), true);
  assert.equal(supportsXHighEffort("claude", "claude-opus-4-7"), true);
  assert.equal(supportsXHighEffort("claude", "claude-opus-4-6"), false);
  assert.equal(supportsXHighEffort("claude", "claude-sonnet-4-6"), false);
  assert.equal(supportsXHighEffort("claude", "claude-future-5-0"), true);
  assert.equal(getXHighEffortSupport("anthropic-compatible-test", "claude-opus-4-6"), undefined);
  assert.equal(getXHighEffortSupport("anthropic-compatible-test", "claude-opus-4-7"), undefined);
  assert.equal(supportsXHighEffort("anthropic-compatible-cc-test", "claude-opus-4-6"), false);
  assert.equal(supportsXHighEffort("anthropic-compatible-cc-test", "claude-opus-4-7"), true);
  assert.equal(supportsXHighEffort("openrouter", "deepseek/deepseek-v4-pro"), true);
  assert.equal(getXHighEffortSupport("openrouter", "anthropic/claude-opus-4.6"), undefined);
  assert.equal(getXHighEffortSupport("openrouter", "anthropic/claude-opus-4.7"), undefined);
  assert.equal(getXHighEffortSupport("openrouter", "anthropic/claude-opus-4.5"), undefined);
  assert.equal(getXHighEffortSupport("bedrock", "anthropic.claude-opus-4-6"), undefined);
  assert.equal(getXHighEffortSupport("bedrock", "anthropic.claude-opus-4-7"), undefined);
  assert.equal(getXHighEffortSupport("github", "claude-opus-4.6"), undefined);
  assert.equal(getXHighEffortSupport("github", "claude-opus-4.7"), undefined);
  assert.equal(getXHighEffortSupport("unknown-provider", "vendor/claude-opus-4.6"), undefined);
  assert.equal(
    getXHighEffortSupport("openrouter", "anthropic/claude-opus-4.6-thinking-xhigh"),
    undefined
  );
  assert.equal(supportsXHighEffort("deepseek", "deepseek-v4-pro"), true);
  assert.equal(getXHighEffortSupport("claude", "claude-opus-4-6"), false);
  assert.equal(getXHighEffortSupport("unknown-provider", "future-model"), undefined);
});

test("literal max effort support is separate from xhigh support", () => {
  assert.equal(getMaxEffortSupport("claude", "claude-opus-4-7"), true);
  assert.equal(getMaxEffortSupport("claude", "claude-opus-4-6"), true);
  assert.equal(getMaxEffortSupport("claude", "claude-haiku-4-5-20251001"), false);
  assert.equal(getMaxEffortSupport("anthropic", "claude-haiku-4.5"), false);
  assert.equal(getMaxEffortSupport("anthropic", "claude-opus-4.6"), true);
  assert.equal(getMaxEffortSupport("anthropic-compatible-cc-test", "claude-opus-4-7"), true);
  assert.equal(getMaxEffortSupport("anthropic-compatible-test", "claude-opus-4-7"), undefined);
  assert.equal(getMaxEffortSupport("cc-compatible", "free-anthropic/claude-fable-5"), true);
  assert.equal(getMaxEffortSupport("cc-compatible", "free-anthropic/claude-opus-4-6"), true);
  assert.equal(getMaxEffortSupport("openrouter", "claude-opus-4-7"), undefined);
  assert.equal(getMaxEffortSupport("openrouter", "anthropic/claude-opus-4.7"), undefined);
  assert.equal(
    getMaxEffortSupport("anthropic-compatible-test", "anthropic/claude-opus-4.7"),
    undefined
  );
  assert.equal(getMaxEffortSupport("opencode-go", "deepseek-v4-pro"), true);
  assert.equal(getMaxEffortSupport("opencode-go", "unknown-deepseek-foo"), undefined);
  assert.equal(getMaxEffortSupport("ollama-cloud", "glm-5.1"), true);
  assert.equal(getMaxEffortSupport("ollama-cloud", "glm-5.2"), undefined);
  assert.equal(getMaxEffortSupport("openai-compatible-free1", "gemini-3.1-pro-preview"), undefined);
  assert.equal(getMaxEffortSupport("openai-compatible-free1", "future-model"), undefined);
});

test("provider detail model config helper reflects resolved xhigh and max capabilities", () => {
  const model = {
    id: "claude-opus-4-7",
    capabilities: {
      supportsReasoning: true,
      contextWindow: 200000,
      maxOutputTokens: 32000,
    },
  };

  let capabilities = effectiveModelCapabilitiesFromRows(
    "anthropic-compatible-cc-test",
    "claude-opus-4-7",
    model,
    undefined
  );
  assert.equal(capabilities.supportsReasoning, true);
  assert.equal(capabilities.contextWindow, 200000);
  assert.equal(capabilities.supportsXHighEffort, true);
  assert.equal(capabilities.supportsMaxEffort, true);

  capabilities = effectiveModelCapabilitiesFromRows(
    "anthropic-compatible-cc-test",
    "claude-opus-4-7",
    model,
    {
      id: "claude-opus-4-7",
      capabilities: {
        supportsXHighEffort: false,
        supportsMaxEffort: false,
      },
    }
  );
  assert.equal(capabilities.supportsXHighEffort, false);
  assert.equal(capabilities.supportsMaxEffort, false);
});

test("provider detail helper resolves CC-compatible aggregate model prefixes", () => {
  const fable = effectiveModelCapabilitiesFromRows(
    "cc-compatible",
    "free-anthropic/claude-fable-5",
    { id: "free-anthropic/claude-fable-5" },
    undefined
  );
  assert.equal(fable.supportsVision, true);
  assert.equal(fable.supportsTools, true);
  assert.equal(fable.supportsReasoning, true);
  assert.equal(fable.supportsXHighEffort, true);
  assert.equal(fable.supportsMaxEffort, true);
  assert.equal(fable.contextWindow, 1000000);
  assert.equal(fable.maxOutputTokens, 128000);

  const customProviderFable = effectiveModelCapabilitiesFromRows(
    "anthropic-compatible-cc-free-anthropic",
    "free-anthropic/claude-fable-5",
    { id: "free-anthropic/claude-fable-5" },
    undefined
  );
  assert.equal(customProviderFable.supportsVision, true);
  assert.equal(customProviderFable.supportsTools, true);
  assert.equal(customProviderFable.supportsReasoning, true);
  assert.equal(customProviderFable.supportsXHighEffort, true);
  assert.equal(customProviderFable.supportsMaxEffort, true);
  assert.equal(customProviderFable.contextWindow, 1000000);
  assert.equal(customProviderFable.maxOutputTokens, 128000);

  const opus46 = effectiveModelCapabilitiesFromRows(
    "cc-compatible",
    "free-anthropic/claude-opus-4-6",
    { id: "free-anthropic/claude-opus-4-6" },
    undefined
  );
  assert.equal(opus46.supportsXHighEffort, false);
  assert.equal(opus46.supportsMaxEffort, true);
});

test("provider detail helper keeps custom unknown effort capabilities unset", () => {
  const capabilities = effectiveModelCapabilitiesFromRows(
    "openrouter",
    "manual/no-effort",
    { id: "manual/no-effort", source: "manual" },
    undefined
  );

  assert.equal(Object.prototype.hasOwnProperty.call(capabilities, "supportsXHighEffort"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(capabilities, "supportsMaxEffort"), false);
});

test("provider detail helper keeps arbitrary OpenAI-compatible max effort unknown by default", () => {
  const capabilities = effectiveModelCapabilitiesFromRows(
    "openai-compatible-free1",
    "future-model",
    { id: "future-model", source: "imported" },
    undefined
  );

  assert.equal(Object.prototype.hasOwnProperty.call(capabilities, "supportsXHighEffort"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(capabilities, "supportsMaxEffort"), false);
});

test("provider detail helper does not infer OpenAI-compatible model family capabilities", () => {
  const capabilities = effectiveModelCapabilitiesFromRows(
    "openai-compatible-free1",
    "gemini-3.1-pro-preview",
    { id: "gemini-3.1-pro-preview", source: "imported" },
    undefined
  );

  assert.equal(Object.prototype.hasOwnProperty.call(capabilities, "supportsXHighEffort"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(capabilities, "supportsMaxEffort"), false);
});

test("custom model capability form keeps unknown distinct from explicit false", () => {
  assert.deepEqual(
    buildNewModelCapabilities({
      supportsVision: "unknown",
      supportsTools: "unknown",
      supportsThinking: "unknown",
      supportsXHigh: "unknown",
      supportsMax: "unknown",
      contextWindow: "",
      maxOutputTokens: "",
      defaultThinkingBudget: "",
      thinkingBudgetCap: "",
    }),
    {}
  );

  assert.deepEqual(
    buildNewModelCapabilities({
      supportsVision: "no",
      supportsTools: "yes",
      supportsThinking: "no",
      supportsXHigh: "unknown",
      supportsMax: "no",
      contextWindow: "",
      maxOutputTokens: "",
      defaultThinkingBudget: "0",
      thinkingBudgetCap: "32000",
    }),
    {
      supportsVision: false,
      supportsTools: true,
      supportsReasoning: false,
      supportsMaxEffort: false,
      defaultThinkingBudget: 0,
      thinkingBudgetCap: 32000,
    }
  );
});

test("provider model capability schema allows zero only for thinking budgets", () => {
  assert.deepEqual(
    providerModelCapabilitiesSchema.parse({
      defaultThinkingBudget: 0,
      thinkingBudgetCap: 0,
    }),
    {
      defaultThinkingBudget: 0,
      thinkingBudgetCap: 0,
    }
  );

  assert.throws(() => providerModelCapabilitiesSchema.parse({ contextWindow: 0 }));
  assert.throws(() => providerModelCapabilitiesSchema.parse({ maxOutputTokens: 0 }));
});
