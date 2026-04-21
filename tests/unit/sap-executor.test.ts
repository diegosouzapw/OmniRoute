import test from "node:test";
import assert from "node:assert/strict";

const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const {
  buildSapCompletionRequest,
  buildSapCompletionUrl,
  buildSapTokenRequestBody,
  parseSapCredentialInput,
} = await import("../../open-sse/executors/sap.ts");

const sapApiKey = JSON.stringify({
  clientid: "sap-client-id",
  clientsecret: "sap-client-secret",
  url: "https://auth.sap.example.com/oauth/token",
  serviceurls: {
    AI_API_URL: "https://api.sap.example.com/v2/inference/deployments",
  },
  resource_group: "rg-prod",
});

test("SAP uses a specialized executor and builds deployment completion URLs", () => {
  assert.equal(hasSpecializedExecutor("sap"), true);
  assert.equal(getExecutor("sap").constructor.name, "SapExecutor");
  assert.equal(
    buildSapCompletionUrl({
      baseUrl: "https://api.sap.example.com/v2/inference/deployments",
      deploymentId: "deployment-123",
    }),
    "https://api.sap.example.com/v2/inference/deployments/deployment-123/v2/completion"
  );
  assert.equal(
    buildSapCompletionUrl({
      baseUrl: "https://api.sap.example.com/v2/inference/deployments/deployment-123",
    }),
    "https://api.sap.example.com/v2/inference/deployments/deployment-123/v2/completion"
  );
});

test("SAP parses service-key style credentials and builds orchestration payloads", () => {
  const credentials = parseSapCredentialInput(sapApiKey, { deploymentId: "deployment-123" });
  assert.ok(credentials);
  assert.equal(credentials?.clientId, "sap-client-id");
  assert.equal(credentials?.resourceGroup, "rg-prod");
  assert.equal(
    buildSapTokenRequestBody(credentials!).toString(),
    "grant_type=client_credentials&client_id=sap-client-id&client_secret=sap-client-secret"
  );

  const payload = buildSapCompletionRequest(
    "gpt-5.4",
    {
      model: "gpt-5.4",
      messages: [
        { role: "system", content: "You are terse." },
        { role: "user", content: "hello" },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "add",
            parameters: {
              type: "object",
              properties: {
                a: { type: "number" },
                b: { type: "number" },
              },
            },
          },
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 24,
      temperature: 0.1,
    },
    { modelVersion: "latest" }
  );

  assert.equal(payload.config.modules.prompt_templating.model.name, "gpt-5.4");
  assert.equal(payload.config.modules.prompt_templating.model.params.max_tokens, 24);
  assert.equal(payload.config.modules.prompt_templating.prompt.template[0].role, "system");
  assert.equal(payload.config.modules.prompt_templating.prompt.tools[0].function.name, "add");
  assert.equal(payload.config.modules.prompt_templating.prompt.response_format.type, "json_object");
});

test("SAP executor exchanges client-credentials tokens and calls the deployment completion endpoint", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, options = {}) => {
    calls.push({
      url: String(url),
      method: options.method,
      headers: options.headers,
      body: String(options.body || ""),
    });

    if (calls.length === 1) {
      return new Response(JSON.stringify({ access_token: "sap-access-token", expires_in: 3600 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        final_result: {
          id: "chatcmpl_sap",
          object: "chat.completion",
          created: 1713612000,
          model: "gpt-5.4",
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: "hello from sap" },
              finish_reason: "stop",
            },
          ],
          usage: {
            prompt_tokens: 4,
            completion_tokens: 2,
            total_tokens: 6,
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const executor = getExecutor("sap");
    const result = await executor.execute({
      model: "gpt-5.4",
      body: {
        model: "gpt-5.4",
        messages: [{ role: "user", content: "hello" }],
      },
      stream: false,
      credentials: {
        apiKey: sapApiKey,
        providerSpecificData: {
          deploymentId: "deployment-123",
        },
      },
    });

    assert.equal(calls[0].url, "https://auth.sap.example.com/oauth/token");
    assert.equal(calls[0].method, "POST");
    assert.match(calls[0].body, /grant_type=client_credentials/);
    assert.match(calls[0].body, /client_id=sap-client-id/);

    assert.equal(
      calls[1].url,
      "https://api.sap.example.com/v2/inference/deployments/deployment-123/v2/completion"
    );
    assert.equal(calls[1].headers.Authorization, "Bearer sap-access-token");
    assert.equal(calls[1].headers["AI-Resource-Group"], "rg-prod");
    const requestBody = JSON.parse(calls[1].body);
    assert.equal(requestBody.config.modules.prompt_templating.model.name, "gpt-5.4");

    const responseBody = await result.response.json();
    assert.equal(responseBody.choices[0].message.content, "hello from sap");
    assert.equal(responseBody.usage.total_tokens, 6);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("SAP executor synthesizes SSE for chat clients", async () => {
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount += 1;
    if (callCount === 1) {
      return new Response(JSON.stringify({ access_token: "sap-access-token", expires_in: 3600 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        final_result: {
          id: "chatcmpl_sap_stream",
          object: "chat.completion",
          created: 1713612001,
          model: "gpt-5.4",
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: "sap streamed" },
              finish_reason: "stop",
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const executor = getExecutor("sap");
    const result = await executor.execute({
      model: "gpt-5.4",
      body: {
        model: "gpt-5.4",
        messages: [{ role: "user", content: "hello" }],
      },
      stream: true,
      credentials: {
        apiKey: sapApiKey,
        providerSpecificData: {
          deploymentId: "deployment-123",
        },
      },
    });

    assert.equal(result.response.headers.get("content-type"), "text/event-stream");
    const raw = await result.response.text();
    assert.match(raw, /sap streamed/);
    assert.match(raw, /\[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
