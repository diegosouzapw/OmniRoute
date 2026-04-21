import test from "node:test";
import assert from "node:assert/strict";

const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { WATSONX_DEFAULT_API_VERSION, buildWatsonxRequestBody, buildWatsonxUrl } =
  await import("../../open-sse/executors/watsonx.ts");

test("WatsonX uses a specialized executor and builds text/chat URLs for foundation and deployment models", () => {
  assert.equal(hasSpecializedExecutor("watsonx"), true);
  assert.equal(getExecutor("watsonx").constructor.name, "WatsonxExecutor");
  assert.equal(
    buildWatsonxUrl({
      baseUrl: "https://us-south.ml.cloud.ibm.com",
      model: "ibm/granite-3-8b-instruct",
    }),
    `https://us-south.ml.cloud.ibm.com/ml/v1/text/chat?version=${WATSONX_DEFAULT_API_VERSION}`
  );
  assert.equal(
    buildWatsonxUrl({
      baseUrl: "https://us-south.ml.cloud.ibm.com/ml/v1/text/chat",
      model: "deployment/demo-serving-name",
      apiVersion: "2025-01-01",
    }),
    "https://us-south.ml.cloud.ibm.com/ml/v1/deployments/demo-serving-name/text/chat?version=2025-01-01"
  );
});

test("WatsonX transforms OpenAI chat payloads into IBM text/chat request bodies", () => {
  const payload = buildWatsonxRequestBody(
    "mistralai/mistral-large",
    {
      model: "mistralai/mistral-large",
      messages: [
        { role: "system", content: "You are terse." },
        { role: "user", content: [{ type: "text", text: "2 + 4?" }] },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_add",
              type: "function",
              function: {
                name: "add",
                arguments: '{"a":2,"b":4}',
              },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_add",
          content: "6",
        },
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
      tool_choice: "required",
      max_tokens: 16,
      temperature: 0.2,
    },
    { projectId: "project-123" }
  );

  assert.equal(payload.model_id, "mistralai/mistral-large");
  assert.equal(payload.project_id, "project-123");
  assert.equal(payload.tool_choice_option, "required");
  assert.equal(payload.max_tokens, 16);
  assert.equal(payload.temperature, 0.2);
  assert.equal(Array.isArray(payload.messages), true);
  assert.deepEqual(payload.messages[3].content, [{ type: "text", text: "6" }]);
  assert.equal(payload.messages[2].tool_calls[0].function.name, "add");
});

test("WatsonX executor exchanges IAM tokens and calls the text/chat endpoint", async () => {
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
      return new Response(JSON.stringify({ access_token: "ibm-iam-token", expires_in: 3600 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        id: "chatcmpl_watsonx",
        model_id: "mistralai/mistral-large",
        created_at: "2026-04-20T12:00:00Z",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: "hello from watsonx",
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 3,
          completion_tokens: 2,
          total_tokens: 5,
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const executor = getExecutor("watsonx");
    const result = await executor.execute({
      model: "mistralai/mistral-large",
      body: {
        model: "mistralai/mistral-large",
        messages: [{ role: "user", content: "hello" }],
        max_tokens: 8,
      },
      stream: false,
      credentials: {
        apiKey: "watsonx-api-key",
        providerSpecificData: {
          baseUrl: "https://us-south.ml.cloud.ibm.com",
          projectId: "project-123",
        },
      },
    });

    assert.equal(calls[0].url, "https://iam.cloud.ibm.com/identity/token");
    assert.equal(calls[0].method, "POST");
    assert.match(calls[0].body, /grant_type=urn%3Aibm%3Aparams%3Aoauth%3Agrant-type%3Aapikey/);
    assert.match(calls[0].body, /apikey=watsonx-api-key/);

    assert.equal(
      calls[1].url,
      `https://us-south.ml.cloud.ibm.com/ml/v1/text/chat?version=${WATSONX_DEFAULT_API_VERSION}`
    );
    assert.equal(calls[1].headers.Authorization, "Bearer ibm-iam-token");
    const requestBody = JSON.parse(calls[1].body);
    assert.equal(requestBody.model_id, "mistralai/mistral-large");
    assert.equal(requestBody.project_id, "project-123");
    assert.equal(requestBody.messages[0].role, "user");

    const responseBody = await result.response.json();
    assert.equal(responseBody.model, "mistralai/mistral-large");
    assert.equal(responseBody.choices[0].message.content, "hello from watsonx");
    assert.equal(responseBody.usage.total_tokens, 5);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("WatsonX executor synthesizes SSE for chat clients when stream=true", async () => {
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount += 1;
    if (callCount === 1) {
      return new Response(JSON.stringify({ access_token: "ibm-iam-token", expires_in: 3600 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        id: "chatcmpl_watsonx_stream",
        model_id: "ibm/granite-3-8b-instruct",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              tool_calls: [
                {
                  id: "chatcmpl-tool-1",
                  type: "function",
                  function: {
                    name: "get_weather",
                    arguments: '{"city":"Sao Paulo"}',
                  },
                },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
        usage: {
          prompt_tokens: 7,
          completion_tokens: 4,
          total_tokens: 11,
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const executor = getExecutor("watsonx");
    const result = await executor.execute({
      model: "ibm/granite-3-8b-instruct",
      body: {
        model: "ibm/granite-3-8b-instruct",
        messages: [{ role: "user", content: "hello" }],
      },
      stream: true,
      credentials: {
        apiKey: "watsonx-api-key",
        providerSpecificData: {
          projectId: "project-123",
        },
      },
    });

    assert.equal(result.response.headers.get("content-type"), "text/event-stream");
    const raw = await result.response.text();
    assert.match(raw, /tool_calls/);
    assert.match(raw, /\[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
