import test from "node:test";
import assert from "node:assert/strict";

import {
  getChatCompletionsEarlyKeepaliveModel,
  shouldUseEarlyKeepaliveForChatCompletions,
} from "../../src/app/api/v1/chat/completions/earlyKeepalive.ts";

test("chat completions early keepalive applies to explicit streaming requests", () => {
  assert.equal(
    shouldUseEarlyKeepaliveForChatCompletions({ stream: true }, "application/json"),
    true
  );
});

test("chat completions early keepalive follows Accept negotiation when stream is omitted", () => {
  assert.equal(
    shouldUseEarlyKeepaliveForChatCompletions(
      { model: "openai/gpt-4.1" },
      "application/json, text/event-stream"
    ),
    true
  );
});

test("chat completions early keepalive respects Accept q values", () => {
  assert.equal(
    shouldUseEarlyKeepaliveForChatCompletions(
      { model: "openai/gpt-4.1" },
      "application/json, text/event-stream;q=0"
    ),
    false
  );
  assert.equal(
    shouldUseEarlyKeepaliveForChatCompletions(
      { model: "openai/gpt-4.1" },
      "application/json, TEXT/EVENT-STREAM ; Q=0.25"
    ),
    true
  );
});

test("chat completions early keepalive respects explicit stream=false", () => {
  assert.equal(
    shouldUseEarlyKeepaliveForChatCompletions(
      { stream: false },
      "application/json, text/event-stream"
    ),
    false
  );
});

test("chat completions early keepalive stays off for non-streaming requests", () => {
  assert.equal(
    shouldUseEarlyKeepaliveForChatCompletions({ model: "openai/gpt-4.1" }, "application/json"),
    false
  );
  assert.equal(shouldUseEarlyKeepaliveForChatCompletions(null, "text/event-stream"), false);
});

test("chat completions early keepalive extracts string models only", () => {
  assert.equal(getChatCompletionsEarlyKeepaliveModel({ model: "claude-web/opus" }), "claude-web/opus");
  assert.equal(getChatCompletionsEarlyKeepaliveModel({ model: 123 }), undefined);
  assert.equal(getChatCompletionsEarlyKeepaliveModel(null), undefined);
});
