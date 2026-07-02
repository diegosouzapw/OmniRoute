import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

// Regression: upstream 9router#419
// When a client (e.g. Fabric-AI) POSTs /v1/responses with input:[] (empty array), the
// translator used to produce messages:[] which every upstream provider rejects with
// "400: messages: at least one message is required". Treat an empty input[] the same
// as an empty string — inject a placeholder user message so the request is always valid.
test("Responses -> Chat: empty input[] injects placeholder user message (not messages:[])", () => {
  const result = openaiResponsesToOpenAIRequest("gpt-4o", { input: [] }, null, null) as Record<
    string,
    unknown
  >;

  assert.ok(Array.isArray(result.messages), "messages should be an array");
  const messages = result.messages as Array<Record<string, unknown>>;
  assert.ok(messages.length > 0, "messages should not be empty (upstream rejects messages:[])");

  const userMessages = messages.filter((m) => m.role === "user");
  assert.ok(userMessages.length > 0, "at least one user message should be present");
});

test("Responses -> Chat: empty input[] still preserves instructions as system message", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    { instructions: "Be terse.", input: [] },
    null,
    null
  ) as Record<string, unknown>;

  const messages = result.messages as Array<Record<string, unknown>>;
  assert.ok(messages.length >= 2, "instructions + placeholder = at least 2 messages");
  assert.equal(messages[0].role, "system");
  assert.equal(messages[0].content, "Be terse.");
  const userMessages = messages.filter((m) => m.role === "user");
  assert.ok(userMessages.length > 0, "at least one user message should be present");
});
