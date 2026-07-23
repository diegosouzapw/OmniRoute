/**
 * #6467 — intra-message dedup for the session-dedup compression engine.
 *
 * Before this change the engine bailed out whenever a single message was present
 * (`msgTexts.length < 2`), so a lone message that repeats a large multi-line block
 * inside itself was never deduplicated. The fix adds a single-message path that
 * replaces the repeated block with a `[dedup:ref sha=…]` marker (keeping the first
 * occurrence).
 *
 * Run: node --import tsx/esm --test tests/unit/compression/session-dedup-intra-message-6467.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { sessionDedupEngine } from "../../../open-sse/services/compression/engines/session-dedup/index.ts";

// A block that comfortably clears both thresholds: ≥ MIN_BLOCK_LINES (3) lines and
// ≥ minBlockChars (80) chars.
const BLOCK = `function expensiveCalc(x) {
  const a = x * 2;
  const b = a + 100;
  const c = b * b - 7;
  return c;
}`;

function singleMessageBody(repeats: number): Record<string, unknown> {
  const parts: string[] = [];
  for (let i = 0; i < repeats; i++) {
    parts.push(`--- section ${i} ---`);
    parts.push(BLOCK);
  }
  return { messages: [{ role: "user", content: parts.join("\n") }] };
}

describe("session-dedup intra-message dedup (#6467)", () => {
  it("deduplicates a block repeated within a single message", () => {
    const body = singleMessageBody(3);
    const result = sessionDedupEngine.apply(body, { stepConfig: {} });

    assert.equal(result.compressed, true, "a single message with an internal repeat must compress");
    const text = (result.body.messages as Array<{ content: string }>)[0].content;
    assert.match(text, /\[dedup:ref sha=/, "repeated occurrences must be replaced by a ref marker");
    // The first occurrence is kept verbatim; the block must still be recoverable once.
    assert.ok(text.includes(BLOCK), "the first occurrence of the block must be preserved");
    // 3 occurrences → 1 kept + 2 markers.
    const markerCount = (text.match(/\[dedup:ref sha=/g) || []).length;
    assert.equal(markerCount, 2, "two of the three occurrences must become markers");
  });

  it("leaves a single message with no internal repetition untouched", () => {
    const body = singleMessageBody(1);
    const result = sessionDedupEngine.apply(body, { stepConfig: {} });
    assert.equal(result.compressed, false, "no repeated block → no compression");
  });
});
