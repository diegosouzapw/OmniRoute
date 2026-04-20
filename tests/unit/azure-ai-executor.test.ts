import test from "node:test";
import assert from "node:assert/strict";

const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { AZURE_AI_DEFAULT_API_VERSION, buildAzureAiHeaders, buildAzureAiUrl } =
  await import("../../open-sse/executors/azure-ai.ts");

test("Azure AI uses a specialized executor and builds Foundry chat URLs", () => {
  assert.equal(hasSpecializedExecutor("azure-ai"), true);
  assert.equal(getExecutor("azure-ai").constructor.name, "AzureAIExecutor");
  assert.equal(
    buildAzureAiUrl("https://demo.models.ai.azure.com", "2024-10-21"),
    "https://demo.models.ai.azure.com/models/chat/completions?api-version=2024-10-21"
  );
  assert.equal(
    buildAzureAiUrl("https://demo.models.ai.azure.com/models/chat/completions"),
    `https://demo.models.ai.azure.com/models/chat/completions?api-version=${AZURE_AI_DEFAULT_API_VERSION}`
  );
});

test("Azure AI builds api-key and anthropic headers for Claude models", () => {
  const headers = buildAzureAiHeaders({
    apiKey: "azure-ai-key",
    baseUrl: "https://demo.models.ai.azure.com",
    model: "claude-sonnet-4-6",
  });

  assert.equal(headers["api-key"], "azure-ai-key");
  assert.equal(headers["anthropic-version"], "2023-06-01");
  assert.equal(headers.Accept, "text/event-stream");
  assert.equal(headers["Content-Type"], "application/json");
});

test("Azure AI executor routes requests to the Foundry endpoint with model-aware headers", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(JSON.stringify({ id: "chatcmpl_azure_ai" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const executor = getExecutor("azure-ai");
    const result = await executor.execute({
      model: "claude-sonnet-4-6",
      body: {
        model: "claude-sonnet-4-6",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      },
      stream: true,
      credentials: {
        apiKey: "azure-ai-key",
        providerSpecificData: {
          baseUrl: "https://demo.models.ai.azure.com",
          apiVersion: "2024-10-21",
        },
      },
    });

    assert.equal(
      captured.url,
      "https://demo.models.ai.azure.com/models/chat/completions?api-version=2024-10-21"
    );
    assert.equal(captured.headers["api-key"], "azure-ai-key");
    assert.equal(captured.headers["anthropic-version"], "2023-06-01");
    assert.equal(captured.headers.Accept, "text/event-stream");
    assert.equal(captured.body.model, "claude-sonnet-4-6");
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
