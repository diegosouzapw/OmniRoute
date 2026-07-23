import test from "node:test";
import assert from "node:assert/strict";

import { isEmptyContentResponse } from "../../open-sse/services/errorClassifier.ts";

// #3572 — A valid max_tokens-truncated upstream response (HTTP 200, a legitimate
// terminal stop_reason/finish_reason, empty content) must NOT be misclassified as
// an empty/silent-failure response (which gets rewritten into a synthetic 502).
// The empty-content guard must only fire when content is empty AND there is no
// legitimate terminal stop_reason — i.e. a genuine fake-success / silent failure.

test("#3572 Claude: empty content + stop_reason=max_tokens is NOT empty-failure", () => {
  assert.equal(
    isEmptyContentResponse({
      type: "message",
      role: "assistant",
      content: [],
      stop_reason: "max_tokens",
      usage: { output_tokens: 1 },
    }),
    false
  );
});

test("#3572 Claude: empty content + stop_reason=tool_use is NOT empty-failure", () => {
  assert.equal(isEmptyContentResponse({ content: [], stop_reason: "tool_use" }), false);
});

test("#3572 Claude: empty content with NO stop_reason IS still empty-failure", () => {
  assert.equal(isEmptyContentResponse({ content: [] }), true);
  assert.equal(isEmptyContentResponse({ content: [], stop_reason: null }), true);
});

test("#3572 Claude: empty content + stop_reason=end_turn stays flagged (fake-success guard preserved)", () => {
  assert.equal(isEmptyContentResponse({ content: [], stop_reason: "end_turn" }), true);
});

test("#3572 OpenAI: empty content + finish_reason=length is NOT empty-failure", () => {
  assert.equal(
    isEmptyContentResponse({
      choices: [{ index: 0, message: { content: "" }, finish_reason: "length" }],
    }),
    false
  );
});

test("#3572 OpenAI: empty delta + finish_reason=length (stream chunk) is NOT empty-failure", () => {
  assert.equal(
    isEmptyContentResponse({
      choices: [{ index: 0, delta: { content: "" }, finish_reason: "length" }],
    }),
    false
  );
});

test("#3572 OpenAI: empty content + finish_reason=stop stays flagged (fake-success guard preserved)", () => {
  assert.equal(
    isEmptyContentResponse({
      choices: [{ index: 0, message: { content: "" }, finish_reason: "stop" }],
    }),
    true
  );
});

test("#3572 OpenAI: empty content + finish_reason=content_filter is NOT empty-failure (safety-filtered response)", () => {
  assert.equal(
    isEmptyContentResponse({
      choices: [{ index: 0, message: { content: "" }, finish_reason: "content_filter" }],
    }),
    false
  );
});

test("#3572 OpenAI: empty content + finish_reason=content_filter (stream chunk) is NOT empty-failure", () => {
  assert.equal(
    isEmptyContentResponse({
      choices: [{ index: 0, delta: { content: "" }, finish_reason: "content_filter" }],
    }),
    false
  );
});

test("#3572 regression: non-empty content is never flagged", () => {
  assert.equal(isEmptyContentResponse({ content: [{ type: "text", text: "hi" }] }), false);
  assert.equal(
    isEmptyContentResponse({ choices: [{ message: { content: "hi" }, finish_reason: "length" }] }),
    false
  );
});
