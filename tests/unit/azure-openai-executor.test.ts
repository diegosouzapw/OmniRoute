import test from "node:test";
import assert from "node:assert/strict";

const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const {
  AZURE_OPENAI_DEFAULT_API_VERSION,
  AZURE_OPENAI_RESPONSES_API_VERSION,
  buildAzureOpenAIHeaders,
  buildAzureOpenAIUrl,
  resolveAzureOpenAIDeployment,
} = await import("../../open-sse/executors/azure-openai.ts");

test("Azure OpenAI uses a specialized executor and builds deployment URLs", () => {
  assert.equal(hasSpecializedExecutor("azure-openai"), true);
  assert.equal(getExecutor("azure-openai").constructor.name, "AzureOpenAIExecutor");
  assert.equal(
    buildAzureOpenAIUrl({
      baseUrl: "https://demo.openai.azure.com",
      deployment: "gpt41-prod",
    }),
    `https://demo.openai.azure.com/openai/deployments/gpt41-prod/chat/completions?api-version=${AZURE_OPENAI_DEFAULT_API_VERSION}`
  );
  assert.equal(
    buildAzureOpenAIUrl({
      baseUrl: "https://demo.openai.azure.com/openai",
      deployment: "gpt51-codex-prod",
      apiType: "responses",
    }),
    `https://demo.openai.azure.com/openai/deployments/gpt51-codex-prod/responses?api-version=${AZURE_OPENAI_RESPONSES_API_VERSION}`
  );
});

test("Azure OpenAI resolves deployment names from regional models and deployment maps", () => {
  assert.equal(
    resolveAzureOpenAIDeployment("global/gpt-5.1-codex", {
      deploymentMap: {
        "gpt-5.1-codex": "gpt51-codex-prod",
      },
    }),
    "gpt51-codex-prod"
  );
  assert.equal(
    resolveAzureOpenAIDeployment("us/gpt-4.1-2025-04-14", {
      deploymentName: "gpt41-prod",
    }),
    "gpt41-prod"
  );
});

test("Azure OpenAI builds api-key headers for Azure resources", () => {
  const headers = buildAzureOpenAIHeaders({
    apiKey: "azure-openai-key",
    baseUrl: "https://demo.openai.azure.com",
  });

  assert.equal(headers["api-key"], "azure-openai-key");
  assert.equal(headers.Accept, "text/event-stream");
  assert.equal(headers["Content-Type"], "application/json");
});

test("Azure OpenAI executor routes chat requests through deployment-specific chat completions", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(JSON.stringify({ id: "chatcmpl_azure_openai" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const executor = getExecutor("azure-openai");
    const result = await executor.execute({
      model: "gpt-5.4",
      body: {
        model: "gpt-5.4",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      },
      stream: true,
      credentials: {
        apiKey: "azure-openai-key",
        providerSpecificData: {
          baseUrl: "https://demo.openai.azure.com",
          apiVersion: "2024-10-21",
          deploymentMap: {
            "gpt-5.4": "gpt54-prod",
          },
        },
      },
    });

    assert.equal(
      captured.url,
      "https://demo.openai.azure.com/openai/deployments/gpt54-prod/chat/completions?api-version=2024-10-21"
    );
    assert.equal(captured.headers["api-key"], "azure-openai-key");
    assert.equal(captured.headers.Accept, "text/event-stream");
    assert.equal(captured.body.model, undefined);
    assert.deepEqual(captured.body.messages, [{ role: "user", content: "test" }]);
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Azure OpenAI executor routes responses models through deployment-specific responses API", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(JSON.stringify({ id: "resp_azure_openai" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const executor = getExecutor("azure-openai");
    const result = await executor.execute({
      model: "gpt-5.1-codex",
      body: {
        model: "gpt-5.1-codex",
        input: "test",
        max_output_tokens: 1,
      },
      stream: true,
      credentials: {
        apiKey: "azure-openai-key",
        providerSpecificData: {
          baseUrl: "https://demo.openai.azure.com",
          deploymentMap: {
            "gpt-5.1-codex": "gpt51-codex-prod",
          },
        },
      },
    });

    assert.equal(
      captured.url,
      `https://demo.openai.azure.com/openai/deployments/gpt51-codex-prod/responses?api-version=${AZURE_OPENAI_RESPONSES_API_VERSION}`
    );
    assert.equal(captured.headers["api-key"], "azure-openai-key");
    assert.equal(captured.body.model, undefined);
    assert.equal(captured.body.input, "test");
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
