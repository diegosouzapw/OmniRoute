/**
 * Tests for the /v1beta path branch in detectFormatFromEndpoint (#14165).
 *
 * The /v1beta Gemini ingress converts gemini → openai chat format before
 * re-entering handleChat, but the request URL keeps its /v1beta path. Without
 * a path branch, detectFormat's `max_tokens` heuristic misread the converted
 * body (messages + max_tokens) as claude, so non-streaming replies came back
 * anthropic-shaped (lost by the route's OpenAI→Gemini converter) and streaming
 * replies were zero bytes (the SSE translator received claude events it never
 * converts).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { detectFormatFromEndpoint, detectFormatFromUrl } =
  await import("../../open-sse/services/provider.ts");
const { convertGeminiToInternal } =
  await import("../../src/app/api/v1beta/models/[...path]/convertGeminiToInternal.ts");

test("#14165: converted openai body on a /v1beta URL detects as openai, not claude", () => {
  const converted = {
    model: "gemini-3.8-flash",
    messages: [{ role: "user", content: "Reply with exactly: OK-1" }],
    max_tokens: 1024,
    stream: true,
  };
  assert.equal(
    detectFormatFromEndpoint(converted, "/v1beta/models/gemini-3.8-flash:streamGenerateContent"),
    "openai"
  );
});

test("#14165: detectFormatFromUrl with the full v1beta ingress URL detects as openai", () => {
  const converted = {
    model: "gemini-3.8-flash",
    messages: [{ role: "user", content: "hi" }],
    max_tokens: 1024,
  };
  assert.equal(
    detectFormatFromUrl(
      converted,
      "http://localhost:20128/v1beta/models/gemini-3.8-flash:generateContent?alt=sse"
    ),
    "openai"
  );
});

test("#14165: a raw gemini body on a /v1beta path still detects as gemini", () => {
  const raw = {
    contents: [{ role: "user", parts: [{ text: "hi" }] }],
    generationConfig: { maxOutputTokens: 1024 },
  };
  assert.equal(
    detectFormatFromEndpoint(raw, "/v1beta/models/gemini-3.8-flash:streamGenerateContent"),
    "gemini"
  );
});

test("#14165: convertGeminiToInternal emits the openai shape the branch relies on", () => {
  const out = convertGeminiToInternal(
    {
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      generationConfig: { maxOutputTokens: 1024 },
    },
    "gemini-3.8-flash",
    true
  );
  assert.ok(Array.isArray(out.messages), "converted body must carry messages");
  assert.equal(out.max_tokens, 1024);
  assert.equal(out.contents, undefined, "converted body must drop the gemini envelope");
});
