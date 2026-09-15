import assert from "node:assert/strict";
import test from "node:test";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { GithubExecutor } from "../../open-sse/executors/github.ts";
import {
  fetchGitHubCopilotModels,
  parseGitHubCopilotModels,
} from "../../open-sse/services/githubCopilotModels.ts";

test("Copilot catalog puts Astra first among GPT models with Copilot-specific limits", () => {
  const model = getModelsByProviderId("github").find((entry) => entry.id.startsWith("gpt-"));
  assert.ok(model);
  assert.equal(model.id, "gpt-6-astra");
  assert.equal(model.contextLength, 1000000);
  assert.equal(model.maxInputTokens, 872000);
  assert.equal(model.maxOutputTokens, 128000);
  assert.equal(model.toolCalling, true);
  assert.equal(model.supportsVision, true);
  assert.equal(model.supportsReasoning, true);
  assert.deepEqual(model.supportedThinkingEfforts, ["low", "medium", "high", "xhigh", "max"]);
});

test("Copilot Astra routes streaming and non-streaming calls through Responses", () => {
  const executor = new GithubExecutor();
  for (const stream of [false, true]) {
    assert.equal(
      executor.buildUrl("gpt-6-astra", stream),
      "https://api.githubcopilot.com/responses"
    );
  }
});

test("Copilot Astra survives fallback discovery while live discovery respects policy", async () => {
  const fallback = await fetchGitHubCopilotModels({
    token: "",
    fallbackModels: getModelsByProviderId("github"),
  });
  assert.equal(fallback.source, "fallback");
  assert.ok(fallback.models.some((model) => model.id === "gpt-6-astra"));

  const model = {
    id: "gpt-6-astra",
    capabilities: { type: "chat" },
    supported_endpoints: ["/responses", "ws:/responses"],
    policy: { state: "enabled" },
    model_picker_enabled: true,
  };
  assert.equal(parseGitHubCopilotModels({ data: [model] })[0].id, model.id);
  assert.deepEqual(
    parseGitHubCopilotModels({ data: [{ ...model, policy: { state: "disabled" } }] }),
    []
  );
  assert.deepEqual(
    parseGitHubCopilotModels({ data: [{ ...model, model_picker_enabled: false }] }),
    []
  );
});
