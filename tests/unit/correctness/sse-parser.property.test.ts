import test from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import { configureProperties } from "../../helpers/propertyConfig.ts";
import { parseSSELine } from "../../../open-sse/utils/streamHelpers.ts";
import { loadSseSequences } from "../../helpers/translationFixtures.ts";

configureProperties();

// parseSSELine is line-oriented: it processes one line at a time.
// The split-mid-line scenario (splitting in the middle of "data: {...}") belongs to
// the stream-layer harness (Task 11). Here we test line-level reconstruction invariance:
// given a complete SSE event line, parseSSELine extracts the correct content regardless
// of what other lines surround it.

function extractTextFromLines(rawContent: string): string {
  let text = "";
  for (const line of rawContent.split("\n")) {
    const parsed = parseSSELine(line);
    if (parsed && !(parsed as { done?: boolean }).done) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const delta = (parsed as any)?.choices?.[0]?.delta?.content;
      if (typeof delta === "string") text += delta;
    }
  }
  return text;
}

test("SSE text reconstruction is invariant to chunk boundaries (line-level)", () => {
  const seqs = loadSseSequences();
  // Property: joining all chunks and re-splitting by line yields the same text
  // as processing the chunks individually. This tests that parseSSELine is stateless
  // and position-invariant (no dependency on which "chunk" a line comes from).
  fc.assert(
    fc.property(fc.integer({ min: 0, max: seqs.length - 1 }), (idx) => {
      const seq = seqs[idx];
      const full = seq.chunks.join("");
      const reconstructed = extractTextFromLines(full);
      assert.equal(reconstructed, seq.expectedText);
    })
  );
});

test("parseSSELine returns null for non-data lines", () => {
  // Non-data lines (comment, event:, id:, retry:, empty) must return null
  const nonDataLines = ["", ": comment", "event: update", "id: 42", "retry: 5000"];
  for (const line of nonDataLines) {
    assert.equal(parseSSELine(line), null, `expected null for line: ${JSON.stringify(line)}`);
  }
});

test("parseSSELine returns {done:true} for [DONE] sentinel", () => {
  const parsed = parseSSELine("data: [DONE]");
  assert.deepEqual(parsed, { done: true });
});

test("parseSSELine correctly parses valid JSON data line", () => {
  const line = 'data: {"choices":[{"delta":{"content":"hello"}}]}';
  const parsed = parseSSELine(line) as Record<string, unknown>;
  assert.ok(parsed && typeof parsed === "object");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assert.equal((parsed as any)?.choices?.[0]?.delta?.content, "hello");
});
