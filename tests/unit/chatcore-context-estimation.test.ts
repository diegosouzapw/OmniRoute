import test from "node:test";
import assert from "node:assert/strict";

import { estimateFinalInputTokens } from "../../open-sse/handlers/chatCore/contextEstimation.ts";
import { estimateTokens } from "../../open-sse/services/contextManager.ts";

test("estimateFinalInputTokens counts nested request contents and auxiliary fields", () => {
  const contents = [{ role: "user", parts: [{ text: "nested Gemini request" }] }];
  const tools = [{ name: "lookup", description: "find a record" }];
  const body = {
    request: { contents },
    tools,
    system: "system prompt",
    instructions: 42,
  };

  assert.equal(
    estimateFinalInputTokens(body),
    estimateTokens(contents) +
      estimateTokens(tools) +
      estimateTokens(body.system) +
      estimateTokens(body.instructions)
  );
});

test("estimateFinalInputTokens ignores a malformed nested request and uses input", () => {
  const input = [{ role: "user", content: "fallback input" }];
  const body = {
    request: "not an object",
    input,
  };

  assert.equal(estimateFinalInputTokens(body), estimateTokens(input));
});

test("estimateTokens accepts the unknown JSON values it already serializes", () => {
  assert.equal(estimateTokens(true), 1);
  assert.equal(estimateTokens(42), 1);
  assert.equal(estimateTokens(undefined), 0);
});
