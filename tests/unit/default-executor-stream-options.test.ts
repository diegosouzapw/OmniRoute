import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("DefaultExecutor injects include_usage for streaming OpenAI-format requests", () => {
  const executor = new DefaultExecutor("openai-compatible-llamacpp");
  const transformed = executor.transformRequest(
    "llama-3.3-70b-instruct",
    {
      model: "llama-3.3-70b-instruct",
      messages: [{ role: "user", content: "hello" }],
      stream_options: { foo: "bar" },
    },
    true,
    {
      apiKey: "sk-local",
      providerSpecificData: {
        baseUrl: "http://localhost:8080/v1",
      },
    }
  );

  assert.deepEqual(transformed.stream_options, {
    foo: "bar",
    include_usage: true,
  });
});

test("DefaultExecutor does not inject include_usage for non-streaming requests", () => {
  const executor = new DefaultExecutor("openai-compatible-llamacpp");
  const transformed = executor.transformRequest(
    "llama-3.3-70b-instruct",
    {
      model: "llama-3.3-70b-instruct",
      messages: [{ role: "user", content: "hello" }],
    },
    false,
    {
      apiKey: "sk-local",
      providerSpecificData: {
        baseUrl: "http://localhost:8080/v1",
      },
    }
  );

  assert.equal(transformed.stream_options, undefined);
});

test("DefaultExecutor does not inject include_usage for non-OpenAI formats", () => {
  const executor = new DefaultExecutor("anthropic");
  const transformed = executor.transformRequest(
    "claude-sonnet-4-5",
    {
      model: "claude-sonnet-4-5",
      messages: [{ role: "user", content: "hello" }],
      max_tokens: 32,
    },
    true,
    {
      apiKey: "sk-anthropic",
      providerSpecificData: {},
    }
  );

  assert.equal(transformed.stream_options, undefined);
});
