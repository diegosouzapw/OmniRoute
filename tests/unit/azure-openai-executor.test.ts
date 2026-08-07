import test from "node:test";
import assert from "node:assert/strict";

import { AzureOpenAIExecutor } from "../../open-sse/executors/azure-openai.ts";

test("AzureOpenAIExecutor builds deployment-based chat URLs from the resource endpoint", () => {
  const executor = new AzureOpenAIExecutor();
  const url = executor.buildUrl("my-gpt4o-deployment", true, 0, {
    providerSpecificData: {
      baseUrl: "https://my-resource.openai.azure.com",
    },
  });

  assert.equal(
    url,
    "https://my-resource.openai.azure.com/openai/deployments/my-gpt4o-deployment/chat/completions?api-version=2024-12-01-preview"
  );
});

test("AzureOpenAIExecutor strips duplicated /openai suffixes from configured base URLs", () => {
  const executor = new AzureOpenAIExecutor();
  const url = executor.buildUrl("deploy-1", false, 0, {
    providerSpecificData: {
      baseUrl: "https://my-resource.openai.azure.com/openai/",
      apiVersion: "2025-01-01-preview",
    },
  });

  assert.equal(
    url,
    "https://my-resource.openai.azure.com/openai/deployments/deploy-1/chat/completions?api-version=2025-01-01-preview"
  );
});

test("AzureOpenAIExecutor uses api-key auth headers instead of Bearer auth", () => {
  const executor = new AzureOpenAIExecutor();
  const headers = executor.buildHeaders({ apiKey: "azure-key-123" }, true);

  assert.deepEqual(headers, {
    "Content-Type": "application/json",
    "api-key": "azure-key-123",
    Accept: "text/event-stream",
  });
});

test("AzureOpenAIExecutor normalizes GPT-5 token parameters without mutating the source", () => {
  const executor = new AzureOpenAIExecutor();
  const body = Object.freeze({
    max_tokens: 4096,
    messages: Object.freeze([{ role: "user", content: "Hello" }]),
  });

  const result = executor.transformRequest("gpt-5-chat-deployment", body, false, {});

  assert.deepEqual(result, {
    max_completion_tokens: 4096,
    messages: body.messages,
  });
  assert.equal(body.max_tokens, 4096);
});

test("AzureOpenAIExecutor preserves explicit max_completion_tokens", () => {
  const executor = new AzureOpenAIExecutor();

  const result = executor.transformRequest(
    "o3-reasoning-deployment",
    { max_tokens: 1024, max_completion_tokens: 8192 },
    false,
    {}
  );

  assert.deepEqual(result, { max_completion_tokens: 8192 });
});

test("AzureOpenAIExecutor omits unsupported GPT-5 temperature values", () => {
  const executor = new AzureOpenAIExecutor();

  assert.deepEqual(
    executor.transformRequest("gpt-5-chat-deployment", { temperature: 0.2 }, false, {}),
    {}
  );
  assert.deepEqual(
    executor.transformRequest("gpt-5-chat-deployment", { temperature: 1 }, false, {}),
    { temperature: 1 }
  );
});

test("AzureOpenAIExecutor removes incompatible reasoning effort and preserves tools", () => {
  const executor = new AzureOpenAIExecutor();
  const tools = Object.freeze([{ type: "function", function: { name: "get_weather" } }]);
  const body = Object.freeze({
    tools,
    tool_choice: "auto",
    reasoning_effort: "medium",
  });

  const withTools = executor.transformRequest("gpt-5-chat-deployment", body, false, {});
  const none = executor.transformRequest(
    "o4-mini-deployment",
    { reasoning_effort: "none" },
    false,
    {}
  );
  const withoutTools = executor.transformRequest(
    "o3-reasoning-deployment",
    { reasoning_effort: "medium" },
    false,
    {}
  );

  assert.deepEqual(withTools, { tools, tool_choice: "auto" });
  assert.deepEqual(none, {});
  assert.deepEqual(withoutTools, { reasoning_effort: "medium" });
  assert.equal(body.reasoning_effort, "medium");
});

test("AzureOpenAIExecutor keeps GPT-4 parameters while retaining generic sanitization", () => {
  const executor = new AzureOpenAIExecutor();
  const body = {
    max_tokens: 1024,
    temperature: 0.2,
    reasoning_effort: "none",
    prompt_cache_retention: "24h",
  };

  const result = executor.transformRequest("gpt-4o-deployment", body, false, {});

  assert.deepEqual(result, {
    max_tokens: 1024,
    temperature: 0.2,
    reasoning_effort: "none",
  });
  assert.equal(body.prompt_cache_retention, "24h");
});
