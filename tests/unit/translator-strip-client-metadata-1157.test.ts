import test from "node:test";
import assert from "node:assert/strict";

const openaiHelper = await import("../../open-sse/translator/helpers/openaiHelper.ts");

// Regression for upstream issue 9router#1157: Codex-origin requests carry a
// top-level `client_metadata` object. On the OpenAI->OpenAI chat-completions
// passthrough, `filterToOpenAIFormat` is the only sanitizer, and it forwarded
// `client_metadata` to api.openai.com, which rejects it with
// 400 "Unknown parameter: 'client_metadata'". It must be stripped alongside
// the other Claude/Codex-specific fields.
test("filterToOpenAIFormat strips top-level client_metadata (9router#1157)", () => {
  const body = {
    messages: [{ role: "user", content: "hi" }],
    client_metadata: { user_id: "abc", session_id: "xyz" },
    metadata: { remove: true },
    anthropic_version: "2023-06-01",
  };

  const result = openaiHelper.filterToOpenAIFormat(body);

  assert.equal("client_metadata" in result, false);
  assert.equal("metadata" in result, false);
  assert.equal("anthropic_version" in result, false);
  assert.equal(result.messages.length, 1);
});
