import assert from "node:assert/strict";
import test from "node:test";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { GithubExecutor } from "../../open-sse/executors/github.ts";
import { fetchGitHubCopilotModels } from "../../open-sse/services/githubCopilotModels.ts";

test("Copilot Kimi K3 exposes the upstream limits and replaces K2.7", () => {
  const models = getModelsByProviderId("github");
  const kimiModels = models.filter((model) => model.id.startsWith("kimi-"));
  assert.deepEqual(
    kimiModels.map((model) => model.id),
    ["kimi-k3"]
  );
  const model = kimiModels[0];
  assert.equal(model.name, "Kimi K3");
  assert.equal(model.contextLength, 1048576);
  assert.equal(model.maxInputTokens, 917504);
  assert.equal(model.maxOutputTokens, 131072);
  assert.equal(model.toolCalling, true);
  assert.equal(model.supportsVision, true);
  assert.equal(model.supportsReasoning, true);
  assert.deepEqual(model.supportedThinkingEfforts, ["low", "high", "max"]);
});

test("Copilot Kimi K3 uses Chat Completions for streaming and non-streaming calls", () => {
  const executor = new GithubExecutor();
  for (const stream of [false, true]) {
    assert.equal(
      executor.buildUrl("kimi-k3", stream),
      "https://api.githubcopilot.com/chat/completions"
    );
  }
});

test("Copilot fallback discovery retains Kimi K3", async () => {
  const result = await fetchGitHubCopilotModels({
    token: "",
    fallbackModels: getModelsByProviderId("github"),
  });
  assert.equal(result.source, "fallback");
  assert.ok(result.models.some((model) => model.id === "kimi-k3"));
});
