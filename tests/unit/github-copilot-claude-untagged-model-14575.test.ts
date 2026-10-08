import test from "node:test";
import assert from "node:assert/strict";

import { GithubExecutor } from "../../open-sse/executors/github.ts";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { githubProvider } from "../../open-sse/config/providers/registry/github/index.ts";
import { gheCopilotProvider } from "../../open-sse/config/providers/registry/ghe-copilot/index.ts";
import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";

const UNREGISTERED_CLAUDE_MODEL = "claude-opus-5.5";

test("sanity: claude-opus-5.5 is not (yet) in the curated github registry", () => {
  const entry = githubProvider.models.find((m) => m.id === UNREGISTERED_CLAUDE_MODEL);
  assert.equal(entry, undefined);
});

test("BUG #14575: chatCore's resolved targetFormat disagrees with GithubExecutor.buildUrl()'s endpoint for an untagged claude-* model", () => {
  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: "github",
    resolvedModel: UNREGISTERED_CLAUDE_MODEL,
    apiFormat: undefined,
    sourceFormat: "openai",
    customModelTargetFormat: undefined,
    providerSpecificData: null,
  });

  const executor = new GithubExecutor();
  const url = executor.buildUrl(UNREGISTERED_CLAUDE_MODEL, false, 0, { apiKey: "test-token" });
  const routedToAnthropicNative = url === githubProvider.messagesUrl;

  assert.equal(routedToAnthropicNative, true);
  assert.equal(
    targetFormat,
    "claude",
    "BUG #14575: chatCore resolved a non-Claude targetFormat " +
      JSON.stringify(targetFormat) +
      " for a model that GithubExecutor.buildUrl() routes to the Anthropic-native /v1/messages endpoint"
  );
});

test("control: a CURATED claude-* model (claude-opus-5) has matching targetFormat + endpoint (no mismatch)", () => {
  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: "github",
    resolvedModel: "claude-opus-5",
    apiFormat: undefined,
    sourceFormat: "openai",
    customModelTargetFormat: undefined,
    providerSpecificData: null,
  });
  const executor = new GithubExecutor();
  const url = executor.buildUrl("claude-opus-5", false, 0, { apiKey: "test-token" });
  assert.equal(targetFormat, "claude");
  assert.equal(url, githubProvider.messagesUrl);
});

test("BUG #14575 (ghe-copilot parity): an untagged claude-* id resolves targetFormat 'claude' for the ghe-copilot alias too", () => {
  const entry = gheCopilotProvider.models.find((m) => m.id === UNREGISTERED_CLAUDE_MODEL);
  assert.equal(
    entry,
    undefined,
    "sanity: claude-opus-5.5 must not be in the curated ghe-copilot registry"
  );

  const targetFormat = getModelTargetFormat("ghe-copilot", UNREGISTERED_CLAUDE_MODEL);
  assert.equal(
    targetFormat,
    "claude",
    "ghe-copilot executor's own name-regex routes any claude-named model to the Anthropic-native endpoint " +
      "(open-sse/executors/ghe-copilot.ts:117); getModelTargetFormat must resolve the same targetFormat"
  );
});
