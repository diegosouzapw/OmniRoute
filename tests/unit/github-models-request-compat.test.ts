import assert from "node:assert/strict";
import test from "node:test";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("github-models uses max_completion_tokens for namespaced recent OpenAI models", () => {
  const executor = new DefaultExecutor("github-models");

  for (const model of [
    "openai/gpt-5",
    "openai/gpt-5-chat",
    "openai/gpt-5-mini",
    "openai/o4-mini",
  ]) {
    const transformed = executor.transformRequest(
      model,
      {
        model,
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 2_048,
        stream: false,
      },
      false,
      { providerSpecificData: {} }
    ) as Record<string, unknown>;

    assert.equal(transformed.max_tokens, undefined, `${model} must not send max_tokens`);
    assert.equal(
      transformed.max_completion_tokens,
      2_048,
      `${model} must send max_completion_tokens`
    );
  }
});

test("github-models leaves legacy namespaced OpenAI models on max_tokens", () => {
  const executor = new DefaultExecutor("github-models");
  const transformed = executor.transformRequest(
    "openai/gpt-4.1",
    {
      model: "openai/gpt-4.1",
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 2_048,
      stream: false,
    },
    false,
    { providerSpecificData: {} }
  ) as Record<string, unknown>;

  assert.equal(transformed.max_tokens, 2_048);
  assert.equal(transformed.max_completion_tokens, undefined);
});
