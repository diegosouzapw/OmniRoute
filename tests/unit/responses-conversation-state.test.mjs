import test from "node:test";
import assert from "node:assert/strict";

const {
  buildStatefulResponsesBody,
  rememberPreviousResponseId,
  clearPreviousResponseId,
  extractResponsesResponseId,
} = await import("../../open-sse/services/responsesConversationState.ts");

test("Responses state: first Claude turn enables store without previous_response_id", () => {
  clearPreviousResponseId("session-a");

  const result = buildStatefulResponsesBody(
    {
      messages: [{ role: "user", content: "hello" }],
      tools: [{ name: "Bash" }],
    },
    "session-a"
  );

  assert.equal(result.previousResponseId, null);
  assert.equal(result.body.store, true);
  assert.equal(result.body.previous_response_id, undefined);
  assert.equal(result.trimmedMessages, false);
  assert.equal(result.body.messages.length, 1);
});

test("Responses state: subsequent Claude turn keeps only delta after last assistant", () => {
  rememberPreviousResponseId("session-b", "resp_prev_123");

  const result = buildStatefulResponsesBody(
    {
      messages: [
        { role: "user", content: "big reminder blob" },
        { role: "assistant", content: "previous answer" },
        { role: "user", content: "new question" },
      ],
      max_tokens: 1024,
    },
    "session-b"
  );

  assert.equal(result.previousResponseId, "resp_prev_123");
  assert.equal(result.body.previous_response_id, "resp_prev_123");
  assert.equal(result.body.store, true);
  assert.equal(result.trimmedMessages, true);
  assert.deepEqual(result.body.messages, [{ role: "user", content: "new question" }]);
});

test("Responses state: response id extraction works for streamed provider payload summaries", () => {
  const payload = {
    _streamed: true,
    summary: {
      id: "resp_stream_456",
      object: "response",
    },
  };

  assert.equal(extractResponsesResponseId(payload), "resp_stream_456");
});
