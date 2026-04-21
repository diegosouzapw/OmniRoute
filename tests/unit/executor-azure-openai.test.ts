import test from "node:test";
import assert from "node:assert/strict";

import { AzureOpenAIExecutor } from "../../open-sse/executors/azure-openai.ts";

test("AzureOpenAIExecutor.buildUrl uses deployment-based Azure chat completions URLs", () => {
  const executor = new AzureOpenAIExecutor();
  const url = executor.buildUrl("gpt-4o-prod", true, 0, {
    apiKey: "azure-key",
    providerSpecificData: {
      baseUrl: "https://my-resource.openai.azure.com/",
      apiVersion: "2025-04-01-preview",
    },
  });

  assert.equal(
    url,
    "https://my-resource.openai.azure.com/openai/deployments/gpt-4o-prod/chat/completions?api-version=2025-04-01-preview"
  );
});

test("AzureOpenAIExecutor.buildHeaders uses api-key auth and SSE accept for streaming", () => {
  const executor = new AzureOpenAIExecutor();

  assert.deepEqual(executor.buildHeaders({ apiKey: "azure-key" }, true), {
    "Content-Type": "application/json",
    "api-key": "azure-key",
    Accept: "text/event-stream",
  });

  assert.deepEqual(executor.buildHeaders({ apiKey: "azure-key" }, false), {
    "Content-Type": "application/json",
    "api-key": "azure-key",
  });
});
