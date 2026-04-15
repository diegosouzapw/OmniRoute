import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

/**
 * Regression: claude-to-claude passthrough translateRequest was called with
 * an extra argument (the previous translatedBody object) before the stream
 * parameter, causing stream to receive an object instead of a boolean.
 * Upstream Anthropic rejected with: "stream: Input should be a valid boolean"
 *
 * Fix: open-sse/handlers/chatCore.ts — removed stray translatedBody arg.
 */

test("Claude passthrough: stream field must be a boolean (stream=true)", () => {
  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    stream: true,
    messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
  };

  // Simulate the claude->openai->claude round-trip from chatCore passthrough
  const openaiBody = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    body.model,
    structuredClone(body),
    true,
    null,
    null,
    null
  );

  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    body.model,
    { ...openaiBody, _disableToolPrefix: true },
    true,
    null,
    null,
    null
  );

  assert.equal(typeof result.stream, "boolean", "stream must be a boolean, not an object");
  assert.equal(result.stream, true);
});

test("Claude passthrough: stream field must be a boolean (stream=false)", () => {
  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    stream: false,
    messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
  };

  const openaiBody = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    body.model,
    structuredClone(body),
    false,
    null,
    null,
    null
  );

  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    body.model,
    { ...openaiBody, _disableToolPrefix: true },
    false,
    null,
    null,
    null
  );

  assert.equal(typeof result.stream, "boolean", "stream must be a boolean, not an object");
  assert.equal(result.stream, false);
});

test("Claude passthrough: passing an object as stream propagates invalid type (guard)", () => {
  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
  };

  const openaiBody = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    body.model,
    structuredClone(body),
    true,
    null,
    null,
    null
  );

  // Simulate the old bug: passing openaiBody (an object) where stream should be
  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    body.model,
    { ...openaiBody, _disableToolPrefix: true },
    openaiBody, // BUG: object instead of boolean
    null,
    null,
    null
  );

  // This test documents the bug: if an object is passed as stream, it ends up
  // in the translated body as a non-boolean, which Anthropic rejects.
  assert.notEqual(
    typeof result.stream,
    "boolean",
    "passing an object as stream should produce a non-boolean (documents the bug)"
  );
});
