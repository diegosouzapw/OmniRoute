import test from "node:test";
import assert from "node:assert/strict";

import { BedrockExecutor, openAIToBedrockConverse } from "../../open-sse/executors/bedrock.ts";

function credentials(region = "eu-west-2") {
  return {
    apiKey: "bedrock-key",
    providerSpecificData: { region },
  };
}

test("BedrockExecutor builds regional native Converse URLs", () => {
  const executor = new BedrockExecutor();

  assert.equal(
    executor.buildUrl("anthropic.claude-sonnet-4-6", false, 0, credentials()),
    "https://bedrock-runtime.eu-west-2.amazonaws.com/model/anthropic.claude-sonnet-4-6/converse"
  );
  assert.equal(
    executor.buildUrl("anthropic.claude-sonnet-4-6", true, 0, credentials()),
    "https://bedrock-runtime.eu-west-2.amazonaws.com/model/anthropic.claude-sonnet-4-6/converse-stream"
  );
});

test("openAIToBedrockConverse maps OpenAI chat messages and tools to Bedrock Converse", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-sonnet-4-6", {
    messages: [
      { role: "system", content: "You are concise." },
      { role: "user", content: "What is the weather?" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_weather",
            type: "function",
            function: { name: "get_weather", arguments: '{"city":"Berlin"}' },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_weather", content: "12C" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get weather",
          parameters: { type: "object", properties: { city: { type: "string" } } },
        },
      },
    ],
    tool_choice: "auto",
    max_tokens: 64,
    temperature: 0.2,
  });

  assert.equal(payload.modelId, "anthropic.claude-sonnet-4-6");
  assert.deepEqual(payload.system, [{ text: "You are concise." }]);
  assert.equal(payload.messages[0].role, "user");
  assert.deepEqual(payload.messages[0].content, [{ text: "What is the weather?" }]);
  assert.equal(payload.messages[1].content[0].toolUse.name, "get_weather");
  assert.deepEqual(payload.messages[1].content[0].toolUse.input, { city: "Berlin" });
  assert.equal(payload.messages[2].content[0].toolResult.toolUseId, "call_weather");
  assert.equal(payload.toolConfig.tools[0].toolSpec.name, "get_weather");
  assert.deepEqual(payload.toolConfig.toolChoice, { auto: {} });
  assert.deepEqual(payload.inferenceConfig, { maxTokens: 64, temperature: 0.2 });
});

test("BedrockExecutor converts non-streaming Converse output to OpenAI chat completion JSON", async () => {
  const sent = [];
  const executor = new BedrockExecutor(() => ({
    send: async (command) => {
      sent.push(command);
      return {
        output: { message: { content: [{ text: "Hallo" }] } },
        stopReason: "end_turn",
        usage: { inputTokens: 3, outputTokens: 2, totalTokens: 5 },
      };
    },
  }));

  const result = await executor.execute({
    model: "anthropic.claude-sonnet-4-6",
    body: { messages: [{ role: "user", content: "Hi" }], max_tokens: 8 },
    stream: false,
    credentials: credentials(),
  });

  assert.equal(sent[0].constructor.name, "ConverseCommand");
  assert.equal(sent[0].input.modelId, "anthropic.claude-sonnet-4-6");
  assert.equal(result.response.status, 200);
  const body = await result.response.json();
  assert.equal(body.model, "anthropic.claude-sonnet-4-6");
  assert.equal(body.choices[0].message.content, "Hallo");
  assert.equal(body.usage.total_tokens, 5);
});

test("BedrockExecutor converts ConverseStream output to OpenAI SSE chunks", async () => {
  async function* bedrockStream() {
    yield { contentBlockDelta: { contentBlockIndex: 0, delta: { text: "Hal" } } };
    yield { contentBlockDelta: { contentBlockIndex: 0, delta: { text: "lo" } } };
    yield { messageStop: { stopReason: "end_turn" } };
    yield { metadata: { usage: { inputTokens: 1, outputTokens: 2, totalTokens: 3 } } };
  }

  const executor = new BedrockExecutor(() => ({
    send: async (command) => {
      assert.equal(command.constructor.name, "ConverseStreamCommand");
      return { stream: bedrockStream() };
    },
  }));

  const result = await executor.execute({
    model: "anthropic.claude-sonnet-4-6",
    body: { messages: [{ role: "user", content: "Hi" }], stream: true },
    stream: true,
    credentials: credentials(),
  });

  assert.equal(result.response.status, 200);
  assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
  const text = await result.response.text();
  assert.match(text, /"role":"assistant"/);
  assert.match(text, /"content":"Hal"/);
  assert.match(text, /"content":"lo"/);
  assert.match(text, /"finish_reason":"stop"/);
  assert.match(text, /data: \[DONE\]/);
});
