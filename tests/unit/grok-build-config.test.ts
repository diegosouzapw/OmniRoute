import assert from "node:assert/strict";
import test from "node:test";

import {
  applyGrokBuildConfig,
  GrokBuildConfigConflictError,
  parseGrokBuildConfig,
  resetGrokBuildConfig,
} from "../../src/shared/services/grokBuildConfig.ts";

const main = {
  baseUrl: "http://localhost:20128/v1",
  apiKey: "sk-test",
  model: "openai/gpt-5.5",
  contextWindow: 400000,
};

test("apply adds the main slot and preserves unrelated TOML", () => {
  const source = [
    "# user comment",
    "[models]",
    'default = "custom"',
    'theme = "dark"',
    "",
    "[model.custom]",
    'model = "custom-model"',
    'base_url = "https://example.test/v1"',
    "",
  ].join("\n");

  const result = applyGrokBuildConfig(source, main);
  const parsed = parseGrokBuildConfig(result);

  assert.equal(parsed.default, "omniroute");
  assert.equal(parsed.model?.model, main.model);
  assert.equal(parsed.model?.context_window, main.contextWindow);
  assert.match(result, /# omniroute-prev-default = "custom"/);
  assert.match(result, /# user comment/);
  assert.match(result, /theme = "dark"/);
  assert.match(result, /\[model\.custom\]/);
});

test("apply records an absent default once and reset removes it", () => {
  const appliedTwice = applyGrokBuildConfig(applyGrokBuildConfig("[ui]\ncompact = true\n", main), {
    ...main,
    model: "anthropic/claude-opus-4-1",
  });

  assert.equal(appliedTwice.match(/omniroute-prev-default/g)?.length, 1);
  const reset = resetGrokBuildConfig(appliedTwice);
  assert.doesNotMatch(reset, /^default\s*=/m);
  assert.doesNotMatch(reset, /\[model\.omniroute\]/);
  assert.match(reset, /\[ui\]\ncompact = true/);
});

test("reset never restores the obsolete grok-build default", () => {
  const source = [
    "[models]",
    'default = "omniroute"',
    "",
    '# omniroute-prev-default = "grok-build"',
    "[model.omniroute]",
    '# omniroute-managed = "true"',
    'model = "openai/gpt-5.5"',
    'base_url = "http://localhost:20128/v1"',
    'name = "OmniRoute"',
    'description = "Routed via OmniRoute gateway"',
    'api_backend = "chat_completions"',
    "",
  ].join("\n");

  const result = resetGrokBuildConfig(source);
  assert.doesNotMatch(result, /^default\s*=/m);
  assert.doesNotMatch(result, /grok-build/);
});

test("apply manages all subagent slots and keeps context windows", () => {
  const result = applyGrokBuildConfig(
    ["[subagents.models]", 'general-purpose = "old-general"', 'explore = "old-explore"', ""].join(
      "\n"
    ),
    {
      ...main,
      subagentModels: {
        "general-purpose": { model: "google/gemini-2.5-pro", contextWindow: 1048576 },
        plan: { model: "anthropic/claude-sonnet-4", contextWindow: 200000 },
      },
    }
  );
  const parsed = parseGrokBuildConfig(result);

  assert.equal(parsed.subagentMappings["general-purpose"], "omniroute-general-purpose");
  assert.equal(parsed.subagentMappings.explore, "old-explore");
  assert.equal(parsed.subagentMappings.plan, "omniroute-plan");
  assert.equal(parsed.subagentModels["general-purpose"]?.context_window, 1048576);
  assert.equal(parsed.subagentModels.plan?.context_window, 200000);
  assert.match(result, /omniroute-prev-subagent-general-purpose = "old-general"/);
  assert.match(result, /omniroute-prev-subagent-plan = "__omniroute_unset__"/);
});

test("an absent subagentModels property preserves current subagent values", () => {
  const source = applyGrokBuildConfig("", {
    ...main,
    subagentModels: { explore: { model: "xai/grok-4", contextWindow: 256000 } },
  });
  const result = applyGrokBuildConfig(source, { ...main, model: "openai/gpt-5.5-codex" });

  assert.equal(parseGrokBuildConfig(result).subagentModels.explore?.model, "xai/grok-4");
});

test("an empty subagentModels object removes all managed overrides", () => {
  const source = applyGrokBuildConfig('[subagents.models]\nexplore = "user-explore"\n', {
    ...main,
    subagentModels: {
      explore: { model: "xai/grok-4", contextWindow: 256000 },
      plan: { model: "openai/gpt-5.5", contextWindow: 400000 },
    },
  });
  const result = applyGrokBuildConfig(source, { ...main, subagentModels: {} });
  const parsed = parseGrokBuildConfig(result);

  assert.equal(parsed.subagentMappings.explore, "user-explore");
  assert.equal(parsed.subagentMappings.plan, null);
  assert.doesNotMatch(result, /\[model\.omniroute-(?:explore|plan)\]/);
});

test("reset restores only mappings that still reference managed slots", () => {
  let source = applyGrokBuildConfig('[subagents.models]\nexplore = "old-explore"\n', {
    ...main,
    subagentModels: { explore: { model: "xai/grok-4", contextWindow: 256000 } },
  });
  source = source.replace('explore = "omniroute-explore"', 'explore = "user-changed-explore"');

  const result = resetGrokBuildConfig(source);
  assert.match(result, /explore = "user-changed-explore"/);
  assert.doesNotMatch(result, /omniroute-prev-subagent/);
});

test("apply accepts the exact legacy OmniRoute table", () => {
  const legacy = [
    "[model.omniroute]",
    'model = "grok-4.5"',
    'base_url = "http://localhost:20128/v1"',
    'name = "OmniRoute"',
    'description = "Routed via OmniRoute gateway"',
    'api_backend = "chat_completions"',
    'api_key = "sk-old"',
    "",
  ].join("\n");

  assert.doesNotThrow(() => applyGrokBuildConfig(legacy, main));
});

test("apply rejects an unowned model.omniroute table", () => {
  const source = [
    "[model.omniroute]",
    'model = "private-model"',
    'base_url = "https://example.test/v1"',
    'name = "User model"',
    'api_backend = "chat_completions"',
    "",
  ].join("\n");

  assert.throws(() => applyGrokBuildConfig(source, main), GrokBuildConfigConflictError);
});
