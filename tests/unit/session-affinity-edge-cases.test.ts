/**
 * Edge-case unit tests for `extractSessionAffinityKey`, `getFirstInputText`,
 * and `extractTextForSessionHash` — focused on the functions extracted from
 * `auth.ts` into `sessionAffinityPin.ts`.
 *
 * Covers:
 * - Array payloads passed as `body` (asRecord Array.isArray guard)
 * - Multimodal payloads with base64 images (DoS protection via recognized text fields)
 * - Deeply nested message structures
 * - Empty / null / undefined edge cases
 * - Large payload truncation (SESSION_HASH_TEXT_LIMIT = 4096)
 * - Google Gemini contents/parts format
 * - OpenAI Legacy / Anthropic / Ollama prompt field
 * - normalizeSessionKey DoS protection
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const { extractSessionAffinityKey, readHeaderValue } =
  await import("../../src/sse/services/sessionAffinityPin.ts");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function sha256hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

// ---------------------------------------------------------------------------
// 1. asRecord Array guard — body is an array, not an object
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey returns null for a bare array body with no extractable text", () => {
  // A bare array like `[1, 2, 3]` should be treated as non-record and produce
  // null — not crash or misinterpret array indices as keys.
  const result = extractSessionAffinityKey([1, 2, 3]);
  assert.equal(result, null);
});

test("extractSessionAffinityKey returns null for an empty array body", () => {
  assert.equal(extractSessionAffinityKey([]), null);
});

test("extractSessionAffinityKey returns null for null body", () => {
  assert.equal(extractSessionAffinityKey(null), null);
});

test("extractSessionAffinityKey returns null for undefined body", () => {
  assert.equal(extractSessionAffinityKey(undefined), null);
});

// ---------------------------------------------------------------------------
// 2. Standard message-based payloads (OpenAI-style)
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey hashes the first user message content", () => {
  const body = {
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "Hello world" },
    ],
  };
  const result = extractSessionAffinityKey(body);
  const expected = `input:sha256:${sha256hex("Hello world")}`;
  assert.equal(result, expected);
});

test("extractSessionAffinityKey falls back to first message if no user role", () => {
  const body = {
    messages: [{ role: "assistant", content: "I am here" }],
  };
  const result = extractSessionAffinityKey(body);
  const expected = `input:sha256:${sha256hex("I am here")}`;
  assert.equal(result, expected);
});

// ---------------------------------------------------------------------------
// 3. Input-based payloads (Codex-style)
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey handles string input directly", () => {
  const body = { input: "simple text input" };
  const result = extractSessionAffinityKey(body);
  const expected = `input:sha256:${sha256hex("simple text input")}`;
  assert.equal(result, expected);
});

test("extractSessionAffinityKey handles array input with content parts", () => {
  const body = {
    input: [{ content: "first part" }, { content: "second part" }],
  };
  const result = extractSessionAffinityKey(body);
  // getFirstInputText iterates input array, extracts content from first item
  const expected = `input:sha256:${sha256hex("first part")}`;
  assert.equal(result, expected);
});

// ---------------------------------------------------------------------------
// 4. Multimodal payloads — base64 images (DoS protection)
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey ignores large non-text multimodal content", () => {
  // Simulate a multimodal message with a 1MB base64 image
  const largeBase64 = "A".repeat(1_000_000);
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this image" },
          { type: "image_url", image_url: { url: `data:image/png;base64,${largeBase64}` } },
        ],
      },
    ],
  };

  const result = extractSessionAffinityKey(body);

  // Should produce a valid hash
  assert.ok(result !== null);
  assert.ok(result!.startsWith("input:sha256:"));

  // Should extract the text part "Describe this image" from the content array
  const expected = `input:sha256:${sha256hex("Describe this image")}`;
  assert.equal(result, expected);
});

test("extractSessionAffinityKey returns null for multimodal content with ONLY non-text parts", () => {
  // When content is an array but has no text/content string fields,
  // we return null rather than JSON.stringifying (prevents DoS + hash collisions)
  const body = {
    messages: [
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: "data:image/png;base64,abc123" } }],
      },
    ],
  };
  const result = extractSessionAffinityKey(body);
  // No extractable text → no input-based session affinity
  // (users should use explicit session IDs for image-only requests)
  assert.equal(result, null);
});

// ---------------------------------------------------------------------------
// 5. Large string payloads — truncation at 4096 chars
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey produces same hash regardless of text length beyond 4096", () => {
  const base = "x".repeat(4096);
  const body1 = { input: base + "AAAA" };
  const body2 = { input: base + "BBBB" };

  const result1 = extractSessionAffinityKey(body1);
  const result2 = extractSessionAffinityKey(body2);

  // Both should hash only the first 4096 chars (the slice in extractSessionAffinityKey)
  assert.equal(result1, result2);
  const expected = `input:sha256:${sha256hex(base)}`;
  assert.equal(result1, expected);
});

// ---------------------------------------------------------------------------
// 6. Explicit session keys take priority over input hashing
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey prefers header session ID over body content", () => {
  const body = { input: "some text" };
  const headers = new Headers({ "x-codex-session-id": "my-session-123" });
  const result = extractSessionAffinityKey(body, headers);
  assert.equal(result, "header:my-session-123");
});

test("extractSessionAffinityKey prefers metadata.session_id over input hashing", () => {
  const body = {
    metadata: { session_id: "meta-sess-42" },
    input: "some text",
  };
  const result = extractSessionAffinityKey(body);
  assert.equal(result, "metadata:meta-sess-42");
});

// ---------------------------------------------------------------------------
// 7. Empty / whitespace-only content
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey returns null for whitespace-only input", () => {
  assert.equal(extractSessionAffinityKey({ input: "   " }), null);
});

test("extractSessionAffinityKey bounds direct input before scanning whitespace", () => {
  assert.equal(extractSessionAffinityKey({ input: `${" ".repeat(4096)}A` }), null);
});

test("extractSessionAffinityKey bounds recognized text fields before scanning whitespace", () => {
  const lateText = `${" ".repeat(4096)}A`;
  const bodies = [
    { input: { text: lateText } },
    { messages: [{ role: "user", content: [{ type: "text", text: lateText }] }] },
    { prompt: lateText },
    { query: lateText },
    { instruction: lateText },
  ];

  for (const body of bodies) {
    assert.equal(extractSessionAffinityKey(body), null);
  }
});

test("extractSessionAffinityKey returns null for empty string input", () => {
  assert.equal(extractSessionAffinityKey({ input: "" }), null);
});

test("extractSessionAffinityKey returns null for messages with empty content", () => {
  const body = { messages: [{ role: "user", content: "" }] };
  assert.equal(extractSessionAffinityKey(body), null);
});

// ---------------------------------------------------------------------------
// 8. readHeaderValue edge cases
// ---------------------------------------------------------------------------

test("readHeaderValue handles record-style headers with array values", () => {
  const headers = { "x-session-id": ["first-val", "second-val"] };
  assert.equal(readHeaderValue(headers, "x-session-id"), "first-val");
});

test("readHeaderValue returns null for empty string header value", () => {
  const headers = new Headers({ "x-session-id": "" });
  assert.equal(readHeaderValue(headers, "x-session-id"), null);
});

test("readHeaderValue returns null for whitespace-only header value", () => {
  const headers = new Headers({ "x-session-id": "   " });
  assert.equal(readHeaderValue(headers, "x-session-id"), null);
});

// ---------------------------------------------------------------------------
// 9. Object input — text field extraction (no JSON.stringify)
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey returns null for object input without text fields", () => {
  // Objects without recognisable .text/.content/.prompt fields return null —
  // no JSON.stringify, no DoS, no hash collision
  const body = {
    input: { nested: { deep: "value" } },
  };
  assert.equal(extractSessionAffinityKey(body), null);
});

test("extractSessionAffinityKey extracts .text field from object input", () => {
  const body = {
    input: { text: "meaningful content", metadata: { irrelevant: true } },
  };
  const result = extractSessionAffinityKey(body);
  const expected = `input:sha256:${sha256hex("meaningful content")}`;
  assert.equal(result, expected);
});

test("extractSessionAffinityKey extracts .content field from object input", () => {
  const body = {
    input: { content: "another text field", type: "document" },
  };
  const result = extractSessionAffinityKey(body);
  const expected = `input:sha256:${sha256hex("another text field")}`;
  assert.equal(result, expected);
});

test("extractSessionAffinityKey does not enumerate arbitrary object input", () => {
  const input = new Proxy(
    {},
    {
      ownKeys() {
        throw new Error("arbitrary input must not be serialized or enumerated");
      },
    }
  );

  assert.equal(extractSessionAffinityKey({ input }), null);
});

// ---------------------------------------------------------------------------
// 10. Empty payload collision prevention (adversarial review finding)
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey returns null for { input: [] } — prevents hash collision", () => {
  // Empty array input must not produce a shared session key
  assert.equal(extractSessionAffinityKey({ input: [] }), null);
});

test("extractSessionAffinityKey returns null for { input: {} } — prevents hash collision", () => {
  // Empty object input must not produce a shared session key
  assert.equal(extractSessionAffinityKey({ input: {} }), null);
});

test("extractSessionAffinityKey returns null for message without content field", () => {
  // { role: "user" } with no content field must not produce a shared structural hash
  const body = { messages: [{ role: "user" }] };
  assert.equal(extractSessionAffinityKey(body), null);
});

// ---------------------------------------------------------------------------
// 11. OpenAI Legacy / Anthropic /v1/complete / Ollama — prompt field
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey extracts root-level prompt field", () => {
  const body = { prompt: "Once upon a time" };
  const expected = `input:sha256:${sha256hex("Once upon a time")}`;
  assert.equal(extractSessionAffinityKey(body), expected);
});

test("extractSessionAffinityKey ignores empty prompt field", () => {
  assert.equal(extractSessionAffinityKey({ prompt: "" }), null);
  assert.equal(extractSessionAffinityKey({ prompt: "   " }), null);
});

// ---------------------------------------------------------------------------
// 12. Google Gemini — contents / parts format
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey extracts text from Gemini contents format", () => {
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: "Explain quantum computing" }],
      },
    ],
  };
  const expected = `input:sha256:${sha256hex("Explain quantum computing")}`;
  assert.equal(extractSessionAffinityKey(body), expected);
});

test("extractSessionAffinityKey extracts text from Gemini multi-part content", () => {
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { text: "First part" },
          { inlineData: { mimeType: "image/png", data: "abc123" } },
          { text: "Second part" },
        ],
      },
    ],
  };
  const expected = `input:sha256:${sha256hex("First part\nSecond part")}`;
  assert.equal(extractSessionAffinityKey(body), expected);
});

test("extractSessionAffinityKey returns null for Gemini image-only parts", () => {
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ inlineData: { mimeType: "image/png", data: "abc123" } }],
      },
    ],
  };
  assert.equal(extractSessionAffinityKey(body), null);
});

test("extractSessionAffinityKey prefers messages over contents", () => {
  // If both messages and contents exist, messages takes priority
  const body = {
    messages: [{ role: "user", content: "From messages" }],
    contents: [{ role: "user", parts: [{ text: "From contents" }] }],
  };
  const expected = `input:sha256:${sha256hex("From messages")}`;
  assert.equal(extractSessionAffinityKey(body), expected);
});

// ---------------------------------------------------------------------------
// 13. Other root-level text fields — query, instruction
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey extracts root-level query field", () => {
  const body = { query: "search for something" };
  const expected = `input:sha256:${sha256hex("search for something")}`;
  assert.equal(extractSessionAffinityKey(body), expected);
});

test("extractSessionAffinityKey extracts root-level instruction field", () => {
  const body = { instruction: "translate to French" };
  const expected = `input:sha256:${sha256hex("translate to French")}`;
  assert.equal(extractSessionAffinityKey(body), expected);
});

// ---------------------------------------------------------------------------
// 14. normalizeSessionKey DoS protection (adversarial review R3)
// ---------------------------------------------------------------------------

test("extractSessionAffinityKey rejects overlong session IDs instead of truncating them", () => {
  const sharedPrefix = "A".repeat(4096);

  assert.equal(extractSessionAffinityKey({ session_id: `${sharedPrefix}X` }), null);
  assert.equal(extractSessionAffinityKey({ session_id: `${sharedPrefix}Y` }), null);
});

test("extractSessionAffinityKey rejects an overlong whitespace-padded session ID", () => {
  const whitespacePaddedSessionId = `${" ".repeat(4096)}A`;

  assert.equal(
    extractSessionAffinityKey({ metadata: { session_id: whitespacePaddedSessionId } }),
    null
  );
});
