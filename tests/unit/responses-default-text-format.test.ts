import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const RESPONSES_PROVIDER = "openai-compatible-responses-lmstudio";
const CHAT_PROVIDER = "openai-compatible-chat-1234";

test("DefaultExecutor: defaults text.format to { type: 'text' } for openai-compatible-responses when text.format is absent", () => {
  const executor = new DefaultExecutor(RESPONSES_PROVIDER);
  const body = { input: "Say OK", text: { verbosity: "medium" } };
  const result = executor.transformRequest("llama-3", body, false, {}) as Record<string, unknown>;
  const text = result.text as Record<string, unknown>;
  assert.deepEqual(text.format, { type: "text" });
  assert.equal(text.verbosity, "medium");
});

test("DefaultExecutor: defaults text.format when text is an empty object", () => {
  const executor = new DefaultExecutor(RESPONSES_PROVIDER);
  const body = { input: "Say OK", text: {} };
  const result = executor.transformRequest("llama-3", body, false, {}) as Record<string, unknown>;
  const text = result.text as Record<string, unknown>;
  assert.deepEqual(text.format, { type: "text" });
});

test("DefaultExecutor: does not overwrite an existing text.format", () => {
  const executor = new DefaultExecutor(RESPONSES_PROVIDER);
  const fmt = { type: "json_schema", name: "x", schema: { type: "object" } };
  const body = { input: "Say OK", text: { format: fmt } };
  const result = executor.transformRequest("llama-3", body, false, {}) as Record<string, unknown>;
  const text = result.text as Record<string, unknown>;
  assert.deepEqual(text.format, fmt);
});

test("DefaultExecutor: no-op when there is no text field", () => {
  const executor = new DefaultExecutor(RESPONSES_PROVIDER);
  const body = { input: "Say OK" };
  const result = executor.transformRequest("llama-3", body, false, {}) as Record<string, unknown>;
  assert.equal(result.text, undefined);
});

test("DefaultExecutor: does not default text.format for non-responses openai-compatible provider", () => {
  const executor = new DefaultExecutor(CHAT_PROVIDER);
  const body = { messages: [{ role: "user", content: "hi" }], text: { verbosity: "medium" } };
  const result = executor.transformRequest("llama-3", body, false, {}) as Record<string, unknown>;
  const text = result.text as Record<string, unknown>;
  assert.equal(text.format, undefined);
});

test("DefaultExecutor: does not default text.format for non-openai-compatible provider (Codex guard)", () => {
  const executor = new DefaultExecutor("openai");
  const body = { messages: [{ role: "user", content: "hi" }], text: { verbosity: "medium" } };
  const result = executor.transformRequest("gpt-4o", body, false, {}) as Record<string, unknown>;
  const text = result.text as Record<string, unknown>;
  assert.equal(text.format, undefined);
});
