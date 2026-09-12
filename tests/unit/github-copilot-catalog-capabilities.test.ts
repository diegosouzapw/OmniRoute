import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { isRetiredGitHubCopilotModelId } from "../../open-sse/config/providers/registry/github/retiredModels.ts";
import { GithubExecutor } from "../../open-sse/executors/github.ts";
import { fetchGitHubCopilotModels } from "../../open-sse/services/githubCopilotModels.ts";

type CapturedModel = {
  id: string;
  capabilities: {
    limits: {
      max_context_window_tokens: number;
      max_prompt_tokens: number;
      max_output_tokens: number;
    };
    supports: {
      tool_calls: boolean;
      vision: boolean;
      reasoning_effort?: string[];
      max_thinking_budget?: number;
    };
  };
  supported_endpoints: string[];
};

// Sanitized upstream capabilities only: no credentials, billing, or account policy.
const snapshot = JSON.parse(
  readFileSync(
    new URL("../fixtures/providers/github-copilot-capabilities.json", import.meta.url),
    "utf8"
  )
) as { models: CapturedModel[] };

const models = getModelsByProviderId("github");
const executor = new GithubExecutor();

for (const upstream of snapshot.models) {
  test(`Copilot ${upstream.id} matches captured upstream capabilities and routes`, () => {
    const model = models.find((entry) => entry.id === upstream.id);
    if (isRetiredGitHubCopilotModelId("github", upstream.id)) {
      assert.equal(model, undefined, "Retired models must not return with a catalog refresh");
      return;
    }
    assert.ok(model);
    const { limits, supports } = upstream.capabilities;
    assert.equal(model.contextLength, limits.max_context_window_tokens);
    assert.equal(model.maxInputTokens, limits.max_prompt_tokens);
    assert.equal(model.maxOutputTokens, limits.max_output_tokens);
    assert.equal(model.toolCalling, supports.tool_calls);
    assert.equal(model.supportsVision, supports.vision);
    if (supports.reasoning_effort?.length || supports.max_thinking_budget) {
      assert.equal(model.supportsReasoning, true);
    }
    assert.deepEqual(model.supportedThinkingEfforts, supports.reasoning_effort);
    if (supports.reasoning_effort?.includes("xhigh")) {
      assert.equal(model.supportsXHighEffort, true);
    }
    for (const stream of [false, true]) {
      const endpoint = new URL(executor.buildUrl(model.id, stream)).pathname;
      assert.ok(upstream.supported_endpoints.includes(endpoint), `${model.id}: ${endpoint}`);
    }
  });
}

test("Every retained Copilot model survives static fallback discovery in catalog order", async () => {
  const result = await fetchGitHubCopilotModels({ token: "", fallbackModels: models });
  assert.equal(result.source, "fallback");
  assert.deepEqual(
    result.models.map((model) => model.id),
    models.map((model) => model.id)
  );
});
