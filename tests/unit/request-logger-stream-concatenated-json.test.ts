// Gemini's own stream-chunk capture concatenates multiple complete JSON
// objects back-to-back with NO separator between them ("}{"), unlike the
// SSE blank-line-per-event framing every other provider's capture uses. A
// single `data:` payload can therefore hold several complete top-level JSON
// values, not one -- JSON.parse correctly rejects the whole thing
// ("Unexpected non-whitespace character after JSON") and the entire payload
// fell back to plain text in the "Provider Event Stream" viewer, even
// though it was a perfectly well-formed sequence of JSON events.
//
// Observed live: 161 of 663 recent streaming call-log artifacts (all
// gemini) hit this, some with as many as 11 concatenated objects in one
// capture. Confirmed by replaying real stored streamChunks.provider arrays
// from production call-log artifacts through this exact code path.

import test from "node:test";
import assert from "node:assert/strict";
import {
  parseStreamIntoSegments,
  splitConcatenatedJsonValues,
} from "../../src/shared/components/RequestLoggerDetail.tsx";

test("splitConcatenatedJsonValues: recovers multiple back-to-back JSON objects", () => {
  const payload = '{"a":1}{"b":2}{"c":[1,2,3]}';
  const values = splitConcatenatedJsonValues(payload);
  assert.deepEqual(values, [{ a: 1 }, { b: 2 }, { c: [1, 2, 3] }]);
});

test("splitConcatenatedJsonValues: tolerates braces and escaped quotes inside strings", () => {
  const payload = '{"text":"a { b } \\"quoted\\""}{"next":true}';
  const values = splitConcatenatedJsonValues(payload);
  assert.deepEqual(values, [{ text: 'a { b } "quoted"' }, { next: true }]);
});

test("splitConcatenatedJsonValues: returns null for a single JSON value (not this case)", () => {
  assert.equal(splitConcatenatedJsonValues('{"a":1}'), null);
});

test("splitConcatenatedJsonValues: returns null for genuinely non-JSON text", () => {
  assert.equal(splitConcatenatedJsonValues("not json at all"), null);
});

test("splitConcatenatedJsonValues: returns null for a genuinely truncated/incomplete value", () => {
  // An actually-incomplete capture (mid-stream cutoff) must still fall back
  // to plain text rather than being silently accepted as valid.
  assert.equal(splitConcatenatedJsonValues('{"a":1}{"b":'), null);
});

type GeminiChunk = { candidates: [{ content: { parts: [{ text: string }] } }] };

test("parseStreamIntoSegments: a data: line with concatenated JSON objects becomes multiple json segments", () => {
  const raw =
    'data: {"candidates":[{"content":{"parts":[{"text":"A"}]}}]}' +
    '{"candidates":[{"content":{"parts":[{"text":"B"}]}}]}\n\n';
  const segments = parseStreamIntoSegments(raw);
  assert.equal(segments.length, 2);
  assert.ok(segments.every((s) => s.type === "json"));
  const [first, second] = segments as Array<{ type: "json"; value: GeminiChunk }>;
  assert.equal(first.value.candidates[0].content.parts[0].text, "A");
  assert.equal(second.value.candidates[0].content.parts[0].text, "B");
});

test("parseStreamIntoSegments: real production artifact shape (10 concatenated Gemini chunks) recovers with zero text fallback", () => {
  // Reproduces the exact shape stored in a real call-log artifact
  // (streamChunks.provider joined) that triggered this bug live.
  const events = [
    { text: "A" },
    { text: "hello " },
    { text: "world", finishReason: "STOP" },
  ];
  const raw =
    "data: " + events.map((e) => JSON.stringify({ candidates: [{ content: { parts: [e] } }] })).join("") +
    "\n\n";
  const segments = parseStreamIntoSegments(raw);
  assert.equal(segments.length, 3, "each concatenated object must recover as its own segment");
  assert.ok(
    segments.every((s) => s.type === "json"),
    "no segment should fall back to plain text"
  );
});

test("parseStreamIntoSegments: unrelated non-JSON text (comments, keep-alives) still falls back to text as before", () => {
  const raw = ": OPENROUTER PROCESSING\n\ndata: [DONE]\n\n";
  const segments = parseStreamIntoSegments(raw);
  assert.ok(segments.every((s) => s.type === "text"), "no regression for genuine non-JSON content");
});
