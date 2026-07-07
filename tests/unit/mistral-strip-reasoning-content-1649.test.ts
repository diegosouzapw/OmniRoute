/**
 * Regression guard for upstream 9router#1649.
 *
 * Mistral's API returns 422 (extra_forbidden) when an assistant message carries
 * a `reasoning_content` field (replayed thinking from a prior turn, e.g. via the
 * Codex /responses path). The field is nested per-message, so the generic
 * top-level 400/field-downgrade retry in base.ts never covered it. DefaultExecutor
 * now strips `reasoning_content` from every message for provider "mistral" only —
 * DeepSeek (which requires replayed reasoning_content) must be unaffected.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const STREAM = false;
const CREDENTIALS = { apiKey: "k" } as Record<string, unknown>;

function bodyWithReasoningContent() {
  return {
    model: "mistral-large",
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", content: "answer", reasoning_content: "internal chain of thought" },
    ],
    stream: STREAM,
  };
}

test("DefaultExecutor.transformRequest strips nested reasoning_content for mistral", () => {
  const out = new DefaultExecutor("mistral").transformRequest(
    "mistral-large",
    bodyWithReasoningContent(),
    STREAM,
    CREDENTIALS
  ) as Record<string, unknown>;
  const messages = out.messages as Array<Record<string, unknown>>;
  const assistant = messages.find((m) => m.role === "assistant") as Record<string, unknown>;
  assert.equal(
    Object.prototype.hasOwnProperty.call(assistant, "reasoning_content"),
    false,
    "mistral assistant message must not carry reasoning_content"
  );
  assert.equal(assistant.content, "answer", "the rest of the message must be preserved");
  assert.equal(messages.length, 2, "no messages dropped");
});

test("DefaultExecutor.transformRequest preserves reasoning_content for non-mistral (deepseek)", () => {
  const out = new DefaultExecutor("deepseek").transformRequest(
    "deepseek-chat",
    bodyWithReasoningContent(),
    STREAM,
    CREDENTIALS
  ) as Record<string, unknown>;
  const messages = out.messages as Array<Record<string, unknown>>;
  const assistant = messages.find((m) => m.role === "assistant") as Record<string, unknown>;
  assert.equal(
    assistant.reasoning_content,
    "internal chain of thought",
    "deepseek requires replayed reasoning_content — must be preserved"
  );
});
