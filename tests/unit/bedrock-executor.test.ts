import test from "node:test";
import assert from "node:assert/strict";

const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { buildBedrockConverseBody, buildBedrockUrl } =
  await import("../../open-sse/executors/bedrock.ts");

test("Bedrock uses a specialized executor and builds Converse URLs", () => {
  assert.equal(hasSpecializedExecutor("bedrock"), true);
  assert.equal(getExecutor("bedrock").constructor.name, "BedrockExecutor");
  assert.equal(
    buildBedrockUrl({
      baseUrl: "https://bedrock-runtime.us-west-2.amazonaws.com",
      model: "amazon.nova-lite-v1:0",
    }),
    "https://bedrock-runtime.us-west-2.amazonaws.com/model/amazon.nova-lite-v1%3A0/converse"
  );
});

test("Bedrock transforms OpenAI chat payloads into Converse format with tools", () => {
  const payload = buildBedrockConverseBody({
    messages: [
      { role: "system", content: "You are terse." },
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: "call_weather",
            type: "function",
            function: {
              name: "get_weather",
              arguments: '{"city":"Sao Paulo"}',
            },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_weather",
        content: "27C",
      },
    ],
    max_tokens: 64,
    temperature: 0.3,
    top_p: 0.8,
    stop: ["END"],
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Fetch weather",
          parameters: {
            type: "object",
            properties: {
              city: { type: "string" },
            },
          },
        },
      },
    ],
    tool_choice: "required",
  });

  assert.deepEqual(payload.system, [{ text: "You are terse." }]);
  assert.deepEqual(payload.inferenceConfig, {
    maxTokens: 64,
    temperature: 0.3,
    topP: 0.8,
    stopSequences: ["END"],
  });
  assert.equal(payload.toolConfig.toolChoice.any.constructor, Object);
  assert.equal(payload.messages[0].role, "user");
  assert.deepEqual(payload.messages[0].content, [{ text: "hello" }]);
  assert.equal(payload.messages[1].role, "assistant");
  assert.equal(payload.messages[1].content[0].toolUse.toolUseId, "call_weather");
  assert.equal(payload.messages[2].role, "user");
  assert.equal(payload.messages[2].content[0].toolResult.toolUseId, "call_weather");
});

test("Bedrock executor signs Converse requests and returns non-streaming OpenAI JSON", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(
      JSON.stringify({
        output: {
          message: {
            role: "assistant",
            content: [{ text: "hello from bedrock" }],
          },
        },
        stopReason: "end_turn",
        usage: {
          inputTokens: 5,
          outputTokens: 3,
          totalTokens: 8,
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const executor = getExecutor("bedrock");
    const result = await executor.execute({
      model: "amazon.nova-lite-v1:0",
      body: {
        model: "amazon.nova-lite-v1:0",
        messages: [{ role: "user", content: "hello" }],
        max_tokens: 8,
      },
      stream: false,
      credentials: {
        apiKey: "AKIA_TEST:secret-test::us-west-2",
      },
    });

    assert.equal(
      captured.url,
      "https://bedrock-runtime.us-west-2.amazonaws.com/model/amazon.nova-lite-v1%3A0/converse"
    );
    assert.equal(typeof captured.headers.Authorization, "string");
    assert.equal(captured.headers["Content-Type"], "application/json");
    assert.equal(captured.body.messages[0].role, "user");

    const responseBody = await result.response.json();
    assert.equal(responseBody.choices[0].message.content, "hello from bedrock");
    assert.equal(responseBody.usage.total_tokens, 8);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Bedrock executor synthesizes SSE for streaming chat clients", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        output: {
          message: {
            role: "assistant",
            content: [{ text: "streamed bedrock" }],
          },
        },
        stopReason: "end_turn",
        usage: {
          inputTokens: 4,
          outputTokens: 2,
          totalTokens: 6,
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  try {
    const executor = getExecutor("bedrock");
    const result = await executor.execute({
      model: "amazon.nova-lite-v1:0",
      body: {
        model: "amazon.nova-lite-v1:0",
        messages: [{ role: "user", content: "hello" }],
      },
      stream: true,
      credentials: {
        apiKey: "AKIA_TEST:secret-test::us-west-2",
      },
    });

    assert.equal(result.response.headers.get("content-type"), "text/event-stream");
    const raw = await result.response.text();
    assert.match(raw, /streamed bedrock/);
    assert.match(raw, /\[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
