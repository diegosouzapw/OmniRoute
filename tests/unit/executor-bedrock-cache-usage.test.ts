import test from "node:test";
import assert from "node:assert/strict";

import { BedrockExecutor } from "../../open-sse/executors/bedrock.ts";

// Bedrock Converse reports prompt-cache usage as `cacheReadInputTokens` and
// `cacheWriteInputTokens`; `inputTokens` then counts only the non-cached input.
const CONVERSE_USAGE = {
  inputTokens: 3,
  outputTokens: 2,
  totalTokens: 125,
  cacheReadInputTokens: 100,
  cacheWriteInputTokens: 20,
};

function credentials() {
  return { apiKey: "bedrock-key", providerSpecificData: { region: "eu-west-2" } };
}

test("BedrockExecutor surfaces Converse prompt-cache usage on a non-streaming response", async () => {
  const executor = new BedrockExecutor(() => ({
    send: async () => ({
      output: { message: { content: [{ text: "Hallo" }] } },
      stopReason: "end_turn",
      usage: CONVERSE_USAGE,
    }),
  }));

  const result = await executor.execute({
    model: "anthropic.claude-sonnet-4-6",
    body: { messages: [{ role: "user", content: "Hi" }], max_tokens: 8 },
    stream: false,
    credentials: credentials(),
  });

  const { usage } = await result.response.json();
  assert.equal(usage.cache_read_input_tokens, 100);
  assert.equal(usage.cache_creation_input_tokens, 20);
  assert.equal(usage.prompt_tokens, 123);
  assert.equal(usage.completion_tokens, 2);
  assert.equal(usage.total_tokens, 125);
});

test("BedrockExecutor surfaces Converse prompt-cache usage on a streaming response", async () => {
  async function* bedrockStream() {
    yield { contentBlockDelta: { contentBlockIndex: 0, delta: { text: "Hallo" } } };
    yield { messageStop: { stopReason: "end_turn" } };
    yield { metadata: { usage: CONVERSE_USAGE } };
  }
  const executor = new BedrockExecutor(() => ({
    send: async () => ({ stream: bedrockStream() }),
  }));

  const result = await executor.execute({
    model: "anthropic.claude-sonnet-4-6",
    body: { messages: [{ role: "user", content: "Hi" }], stream: true },
    stream: true,
    credentials: credentials(),
  });

  const chunks = (await result.response.text())
    .split("\n")
    .filter((line) => line.startsWith("data:") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(5)));
  const usage = chunks.find((chunk) => chunk.usage)?.usage;
  assert.ok(usage, "expected a usage chunk");
  assert.equal(usage.cache_read_input_tokens, 100);
  assert.equal(usage.cache_creation_input_tokens, 20);
  assert.equal(usage.prompt_tokens, 123);
});

test("BedrockExecutor leaves usage unchanged when Converse reports no cache activity", async () => {
  const executor = new BedrockExecutor(() => ({
    send: async () => ({
      output: { message: { content: [{ text: "Hallo" }] } },
      stopReason: "end_turn",
      usage: { inputTokens: 3, outputTokens: 2, totalTokens: 5 },
    }),
  }));

  const result = await executor.execute({
    model: "anthropic.claude-sonnet-4-6",
    body: { messages: [{ role: "user", content: "Hi" }], max_tokens: 8 },
    stream: false,
    credentials: credentials(),
  });

  const { usage } = await result.response.json();
  assert.equal(usage.prompt_tokens, 3);
  assert.equal(usage.total_tokens, 5);
  assert.equal(usage.cache_read_input_tokens, 0);
  assert.equal(usage.cache_creation_input_tokens, 0);
});
