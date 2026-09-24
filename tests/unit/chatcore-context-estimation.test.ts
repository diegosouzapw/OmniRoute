import test from "node:test";
import assert from "node:assert/strict";

import {
  estimateFinalInputTokenBreakdown,
  estimateFinalInputTokens,
} from "../../open-sse/handlers/chatCore/contextEstimation.ts";
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

test("estimateFinalInputTokenBreakdown identifies auxiliary input after compression", () => {
  const body = {
    messages: [{ role: "user", content: "compressed message" }],
    tools: [{ name: "lookup", description: "tool schema" }],
    system: "system prompt",
    instructions: "instructions",
  };
  const breakdown = estimateFinalInputTokenBreakdown(body);

  assert.deepEqual(breakdown, {
    messages: estimateTokens(body.messages),
    tools: estimateTokens(body.tools),
    system: estimateTokens(body.system),
    instructions: estimateTokens(body.instructions),
    total:
      estimateTokens(body.messages) +
      estimateTokens(body.tools) +
      estimateTokens(body.system) +
      estimateTokens(body.instructions),
  });
  assert.equal(estimateFinalInputTokens(body), breakdown.total);
});

test("estimateTokens accepts the unknown JSON values it already serializes", () => {
  assert.equal(estimateTokens(true), 1);
  assert.equal(estimateTokens(42), 1);
  assert.equal(estimateTokens(undefined), 0);
});
