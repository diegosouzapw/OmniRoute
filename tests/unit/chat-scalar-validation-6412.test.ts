import test from "node:test";
import assert from "node:assert/strict";

// #6412: invalid chat-completion scalars (temperature out of range, max_tokens
// as a string, stream="yes", negative top_p) used to sail through the API
// boundary — the `/v1/chat/completions` route only ran the prompt-injection
// guard, then handleChat only validated JSON-parse + empty-messages. Bad
// scalars first surfaced deep in provider credential resolution as an
// unrelated 404 "No active credentials for provider: <x>", confusing users.
//
// Fix: `chatCompletionScalarSchema` (a `.passthrough()` variant of
// `chatCompletionSchema` that keeps only the scalar validators) is applied at
// the top of `handleChat`, right after the empty-messages guard, before any
// policy / provider lookup. This test pins the schema's shape so a future edit
// can't quietly relax it.

const { chatCompletionScalarSchema } = await import("../../src/shared/schemas/validation.ts");

test("#6412 rejects string max_tokens", () => {
  const result = chatCompletionScalarSchema.safeParse({
    model: "openrouter/deepseek/deepseek-r1:free",
    messages: [{ role: "user", content: "hi" }],
    max_tokens: "not-a-number",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0].path[0], "max_tokens");
  }
});

test("#6412 rejects out-of-range temperature", () => {
  const result = chatCompletionScalarSchema.safeParse({
    model: "openrouter/deepseek/deepseek-r1:free",
    messages: [{ role: "user", content: "hi" }],
    temperature: 99,
  });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0].path[0], "temperature");
  }
});

test("#6412 rejects non-boolean stream", () => {
  const result = chatCompletionScalarSchema.safeParse({
    model: "openrouter/deepseek/deepseek-r1:free",
    messages: [{ role: "user", content: "hi" }],
    stream: "yes",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0].path[0], "stream");
  }
});

test("#6412 rejects negative top_p", () => {
  const result = chatCompletionScalarSchema.safeParse({
    model: "openrouter/deepseek/deepseek-r1:free",
    messages: [{ role: "user", content: "hi" }],
    top_p: -5,
  });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0].path[0], "top_p");
  }
});

test("#6412 accepts a valid scalar body", () => {
  const result = chatCompletionScalarSchema.safeParse({
    model: "openrouter/deepseek/deepseek-r1:free",
    messages: [{ role: "user", content: "hi" }],
    temperature: 0.7,
    max_tokens: 128,
    top_p: 0.9,
    stream: false,
  });
  assert.equal(result.success, true);
});

test("#6412 passthrough preserves unknown fields (e.g. Responses-API `input`, `reasoning_effort`)", () => {
  const result = chatCompletionScalarSchema.safeParse({
    input: [{ role: "user", content: "hi" }], // Responses API — no `messages`
    reasoning_effort: "high",
    custom_provider_ext: { foo: "bar" },
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual((result.data as any).input, [{ role: "user", content: "hi" }]);
    assert.equal((result.data as any).reasoning_effort, "high");
    assert.deepEqual((result.data as any).custom_provider_ext, { foo: "bar" });
  }
});

test("#6412 omitted scalars are fine (no forced defaults)", () => {
  const result = chatCompletionScalarSchema.safeParse({
    model: "openrouter/deepseek/deepseek-r1:free",
    messages: [{ role: "user", content: "hi" }],
  });
  assert.equal(result.success, true);
});
