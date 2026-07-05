import test from "node:test";
import assert from "node:assert/strict";

import {
  PROVIDER_ID_TO_ALIAS,
  PROVIDER_MODELS,
  findModelName,
  getDefaultModel,
  getModelTargetFormat,
  getModelsByProviderId,
  getProviderModels,
  isValidModel,
  supportsClaudeMaxEffort,
  supportsXHighEffort,
  supportsXHighEffortForMaxNormalization,
} from "../../open-sse/config/providerModels.ts";
import { GITHUB_COPILOT_MODEL_ALLOWLIST } from "../../open-sse/services/githubCopilotModels.ts";

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

  assert.equal(getModelTargetFormat("openai", firstModel.id), firstModel.targetFormat || null);
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
    [string, string] | undefined;
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
  const ids = githubModels.map((model) => model.id);

  assert.deepEqual(ids, [...GITHUB_COPILOT_MODEL_ALLOWLIST]);
  assert.equal(getModelTargetFormat("gh", "gpt-5.3-codex"), "openai-responses");
  assert.equal(getModelTargetFormat("gh", "claude-opus-4.6"), null);
  assert.equal(getModelTargetFormat("gh", "claude-opus-4.8-fast"), null);
  assert.equal(getModelTargetFormat("gh", "gemini-3.5-flash"), null);
  assert.equal(getModelTargetFormat("gh", "kimi-k2.7-code"), null);
  assert.equal(ids.includes("gpt-4"), false);
  assert.equal(ids.includes("gpt-4o"), false);
  assert.equal(ids.includes("gpt-5.4-nano"), false);
  assert.equal(ids.includes("gpt-5.1"), false);
  assert.equal(ids.includes("gpt-5.1-codex"), false);
  assert.equal(ids.includes("claude-opus-4.1"), false);
  assert.equal(ids.includes("claude-opus-4-5-20251101"), false);
  assert.equal(ids.includes("gemini-3-flash-preview"), false);
});

test("Kiro registry exposes the current CLI model lineup with context windows", () => {
  const kiroModels = getProviderModels("kr");
  const byId = new Map(kiroModels.map((model) => [model.id, model]));

  // Kiro's real upstream Claude lineup (#6170): Sonnet 5 / Sonnet 4.5 / Haiku 4.5.
  // The Opus 4.x and Sonnet 4.6 ids were fabricated (copied from the Anthropic
  // catalog) and returned upstream 400 "Invalid model" — removed.
  assert.ok(byId.has("claude-sonnet-5"));
  assert.equal(byId.get("claude-sonnet-5")?.contextLength, 1000000);
  assert.ok(byId.has("claude-sonnet-4.5"));
  assert.ok(byId.has("claude-haiku-4.5"));
  assert.equal(byId.has("claude-opus-4.7"), false);
  assert.equal(byId.has("claude-sonnet-4.6"), false);
  assert.equal(byId.has("claude-sonnet-4-6"), false);
  assert.equal(byId.has("claude-haiku-4-5"), false);
});

test("Claude max effort support excludes Haiku family and non-Claude IDs", () => {
  assert.equal(supportsClaudeMaxEffort("claude-opus-4-7"), true);
  assert.equal(supportsClaudeMaxEffort("claude-opus-4-6"), true);
  assert.equal(supportsClaudeMaxEffort("claude-sonnet-4-6"), true);
  assert.equal(supportsClaudeMaxEffort("claude-sonnet-4-5-20250929"), true);
  assert.equal(supportsClaudeMaxEffort("claude-haiku-4-5-20251001"), false);
  assert.equal(supportsClaudeMaxEffort("claude-3-5-haiku-20241022"), false);
  assert.equal(supportsClaudeMaxEffort("anthropic/claude-haiku-4.5"), false);
  assert.equal(supportsClaudeMaxEffort("vendor/haiku-compatible-claude-sonnet-4-6"), true);
  assert.equal(supportsClaudeMaxEffort("gpt-5"), false);
  assert.equal(supportsClaudeMaxEffort("claude-future-5-0"), true);
});

test("xhigh effort support defaults to pass-through and opts out explicit false models", () => {
  const claudeModels = new Set(getModelsByProviderId("claude").map((model) => model.id));

  assert.ok(claudeModels.has("claude-opus-4-8"));
  assert.equal(supportsXHighEffort("claude", "claude-opus-4-8"), true);
  assert.equal(supportsXHighEffort("claude", "claude-opus-4-7"), true);
  assert.equal(supportsXHighEffort("claude", "claude-opus-4-6"), false);
  assert.equal(supportsXHighEffort("claude", "claude-sonnet-4-6"), false);
  assert.equal(supportsXHighEffort("claude", "claude-future-5-0"), true);
  assert.equal(supportsXHighEffort("anthropic-compatible-test", "claude-opus-4-6"), false);
  assert.equal(supportsXHighEffort("anthropic-compatible-test", "claude-opus-4-7"), true);
  assert.equal(supportsXHighEffort("anthropic-compatible-cc-test", "claude-opus-4-6"), false);
  assert.equal(supportsXHighEffort("anthropic-compatible-cc-test", "claude-opus-4-7"), true);
  assert.equal(supportsXHighEffort("openrouter", "deepseek/deepseek-v4-pro"), true);
  assert.equal(supportsXHighEffort("openrouter", "anthropic/claude-opus-4.6"), false);
  assert.equal(supportsXHighEffort("openrouter", "anthropic/claude-opus-4.7"), true);
  assert.equal(supportsXHighEffort("openrouter", "anthropic/claude-opus-4.5"), false);
  assert.equal(supportsXHighEffort("bedrock", "anthropic.claude-opus-4-6"), false);
  assert.equal(supportsXHighEffort("bedrock", "anthropic.claude-opus-4-7"), true);
  assert.equal(supportsXHighEffort("github", "claude-opus-4.6"), false);
  assert.equal(supportsXHighEffort("github", "claude-opus-4.7"), true);
  assert.equal(supportsXHighEffort("unknown-provider", "vendor/claude-opus-4.6"), false);
  assert.equal(
    supportsXHighEffort("openrouter", "anthropic/claude-opus-4.6-thinking-xhigh"),
    false
  );
  assert.equal(supportsXHighEffort("deepseek", "deepseek-v4-pro"), true);
});

test("max normalization follows xhigh opt-out behavior", () => {
  assert.equal(
    supportsXHighEffortForMaxNormalization("openai-compatible-free1", "gemini-3.1-pro-preview"),
    true
  );
  assert.equal(supportsXHighEffortForMaxNormalization("xiaomi-mimo", "mimo-v2.5-pro"), true);
  assert.equal(
    supportsXHighEffortForMaxNormalization("anthropic-compatible-cc-test", "claude-opus-4-6"),
    false
  );
  assert.equal(
    supportsXHighEffortForMaxNormalization("anthropic-compatible-cc-test", "claude-opus-4-7"),
    true
  );
  assert.equal(
    supportsXHighEffortForMaxNormalization("anthropic-compatible-test", "claude-opus-4-6"),
    false
  );
  assert.equal(
    supportsXHighEffortForMaxNormalization("anthropic-compatible-test", "claude-opus-4-7"),
    true
  );
  assert.equal(
    supportsXHighEffortForMaxNormalization("openrouter", "deepseek/deepseek-v4-pro"),
    true
  );
  assert.equal(
    supportsXHighEffortForMaxNormalization("openrouter", "anthropic/claude-opus-4.6"),
    false
  );
  assert.equal(
    supportsXHighEffortForMaxNormalization("openrouter", "anthropic/claude-opus-4.7"),
    true
  );
  assert.equal(
    supportsXHighEffortForMaxNormalization("bedrock", "anthropic.claude-opus-4-6"),
    false
  );
});
