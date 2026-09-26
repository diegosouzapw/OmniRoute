import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("DefaultExecutor maps max_tokens for GPT-6 OpenAI models", () => {
  const executor = new DefaultExecutor("openai");

  for (const model of ["gpt-6-luna", "openai/gpt-6-sol"]) {
    const result = executor.transformRequest(
      model,
      { model, messages: [{ role: "user", content: "Reply OK" }], max_tokens: 8 },
      false,
      {}
    ) as Record<string, unknown>;

    assert.equal(result.max_completion_tokens, 8, `${model} uses the modern output-token key`);
    assert.equal("max_tokens" in result, false, `${model} omits the rejected legacy key`);
  }
});

test("DefaultExecutor does not apply the GPT generation rule to GPT-3.5 model IDs", () => {
  const executor = new DefaultExecutor("openai");
  const result = executor.transformRequest(
    "gpt-35-turbo",
    { model: "gpt-35-turbo", messages: [{ role: "user", content: "Reply OK" }], max_tokens: 8 },
    false,
    {}
  ) as Record<string, unknown>;

  assert.equal(result.max_tokens, 8);
  assert.equal("max_completion_tokens" in result, false);
});
