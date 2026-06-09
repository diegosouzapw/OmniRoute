/**
 * Tests for detectFormatFromEndpoint — the endpoint-aware format detector that
 * fixes Cursor Responses-API bodies sent to /chat/completions.
 *
 * Cursor sends Responses-API-shaped payloads (with `input`, `reasoning.effort`,
 * `prompt_cache_retention`) to /v1/chat/completions. Without the body-sniff on
 * the chat/completions path the detector returned "openai", the translator built
 * `input` from `messages` (undefined), and the upstream received an empty input.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { detectFormatFromEndpoint } = await import("../../open-sse/services/provider.ts");

// ── /responses path ──────────────────────────────────────────────────────────

test("detectFormatFromEndpoint: /responses path → openai-responses regardless of body", () => {
  assert.equal(detectFormatFromEndpoint({}, "/v1/responses"), "openai-responses");
  assert.equal(detectFormatFromEndpoint({ messages: [] }, "/responses"), "openai-responses");
});

// ── /messages path ────────────────────────────────────────────────────────────

test("detectFormatFromEndpoint: /messages path → claude", () => {
  assert.equal(detectFormatFromEndpoint({}, "/v1/messages"), "claude");
  assert.equal(detectFormatFromEndpoint({ messages: [] }, "messages"), "claude");
});

// ── /chat/completions path — standard OpenAI body ────────────────────────────

test("detectFormatFromEndpoint: /chat/completions with messages array → openai", () => {
  const body = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] };
  assert.equal(detectFormatFromEndpoint(body, "/v1/chat/completions"), "openai");
});

test("detectFormatFromEndpoint: /chat/completions with empty messages array → openai", () => {
  assert.equal(detectFormatFromEndpoint({ messages: [] }, "/v1/chat/completions"), "openai");
});

// ── /chat/completions path — Cursor Responses-API body ───────────────────────

test("detectFormatFromEndpoint: /chat/completions with input but no messages → openai-responses", () => {
  const cursorBody = {
    model: "gpt-4o",
    input: [{ role: "user", content: "hello" }],
    reasoning: { effort: "high" },
  };
  assert.equal(detectFormatFromEndpoint(cursorBody, "/v1/chat/completions"), "openai-responses");
});

test("detectFormatFromEndpoint: /chat/completions with string input and no messages → openai-responses", () => {
  assert.equal(
    detectFormatFromEndpoint({ input: "hello" }, "/chat/completions"),
    "openai-responses"
  );
});

test("detectFormatFromEndpoint: /chat/completions with input AND messages → openai (messages wins)", () => {
  // When both fields are present the body is ambiguous; treat it as a normal
  // chat-completions request so that the existing messages path is preserved.
  const body = { input: "hi", messages: [{ role: "user", content: "hi" }] };
  assert.equal(detectFormatFromEndpoint(body, "/v1/chat/completions"), "openai");
});

test("detectFormatFromEndpoint: /chat/completions with input: undefined → openai (falsy input ignored)", () => {
  assert.equal(
    detectFormatFromEndpoint({ input: undefined, model: "x" }, "/v1/chat/completions"),
    "openai"
  );
});

// ── /completions (non-chat) path ─────────────────────────────────────────────

test("detectFormatFromEndpoint: /completions path with messages → openai", () => {
  assert.equal(
    detectFormatFromEndpoint({ messages: [] }, "/v1/completions"),
    "openai"
  );
});

test("detectFormatFromEndpoint: /completions path with input and no messages → openai-responses", () => {
  assert.equal(
    detectFormatFromEndpoint({ input: "hello" }, "/completions"),
    "openai-responses"
  );
});

// ── No path / unknown path — falls back to body-based detection ───────────────

test("detectFormatFromEndpoint: no path falls back to body-based detectFormat", () => {
  // Pure messages body → openai
  assert.equal(
    detectFormatFromEndpoint({ messages: [{ role: "user", content: "hi" }] }),
    "openai"
  );
});

test("detectFormatFromEndpoint: unknown path falls back to body-based detectFormat", () => {
  assert.equal(
    detectFormatFromEndpoint({ messages: [] }, "/v1/custom/endpoint"),
    "openai"
  );
});
