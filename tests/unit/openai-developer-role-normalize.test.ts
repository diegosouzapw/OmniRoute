import { test } from "node:test";
import assert from "node:assert/strict";

import { filterToOpenAIFormat } from "../../open-sse/translator/helpers/openaiHelper.ts";

// Ported from upstream decolua/9router#1011 — many OpenAI-compatible providers
// reject the `developer` role (introduced by OpenAI Responses API). Normalize to
// `system` so passthrough requests keep working downstream.
test("filterToOpenAIFormat normalizes developer role to system", () => {
  const body = {
    messages: [
      { role: "developer", content: "You are helpful" },
      { role: "user", content: "Hi" },
    ],
  };

  const out = filterToOpenAIFormat(body);

  assert.equal(out.messages[0].role, "system");
  assert.equal(out.messages[0].content, "You are helpful");
  assert.equal(out.messages[1].role, "user");
});

test("filterToOpenAIFormat normalizes developer role with array content", () => {
  const body = {
    messages: [
      {
        role: "developer",
        content: [{ type: "text", text: "Be concise" }],
      },
    ],
  };

  const out = filterToOpenAIFormat(body);

  assert.equal(out.messages[0].role, "system");
  assert.deepEqual(out.messages[0].content, [{ type: "text", text: "Be concise" }]);
});
