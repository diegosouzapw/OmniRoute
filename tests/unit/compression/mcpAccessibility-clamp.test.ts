import { test } from "node:test";
import assert from "node:assert/strict";
import { smartFilterText } from "../../../open-sse/services/compression/engines/mcpAccessibility/index.ts";
import { DEFAULT_MCP_ACCESSIBILITY_CONFIG } from "../../../open-sse/services/compression/engines/mcpAccessibility/constants.ts";

// F5.3: `headSize = config.maxTextChars - 300` goes negative when maxTextChars is below the
// 300-char tail reservation, and `out.slice(0, negative)` counts from the END — silently
// keeping a wrong (and oversized) fragment instead of the intended head. maxTextChars is
// only floored to > 0 on the write path, so a stored value in [1,300] reaches this code.
test("clamps head to >=0 when maxTextChars is below the tail reservation (≤300)", () => {
  const config = {
    ...DEFAULT_MCP_ACCESSIBILITY_CONFIG,
    maxTextChars: 50,
    minLengthToProcess: 1,
  };
  const input = "A".repeat(500);
  const out = smartFilterText(input, config);

  // Bug: headSize = -250 → slice(0,-250) keeps the first 250 chars → output leaks a long
  // run of 'A' and is far larger than maxTextChars. Fixed: headSize clamps to 0 → empty
  // head → output is just the truncation notice (which contains no capital 'A').
  assert.ok(!out.includes("A"), "head must be empty (clamped) — no leaked content from a negative slice");
  assert.ok(out.includes("truncated"), "still emits the truncation notice");
});

test("reports omitted chars relative to the filtered text, not the raw input", () => {
  // Noise lines get stripped before truncation, so `omitted` must be measured against the
  // filtered text (`out`), not the longer raw `text`.
  const noise = "- generic:\n".repeat(10); // stripped by NOISE_PATTERNS
  const input = noise + "B".repeat(1000);
  const config = {
    ...DEFAULT_MCP_ACCESSIBILITY_CONFIG,
    maxTextChars: 400,
    minLengthToProcess: 1,
  };
  const out = smartFilterText(input, config);
  const match = out.match(/truncated (\d+) chars/);
  assert.ok(match, "emits a truncation notice with an omitted count");
  const omitted = Number(match[1]);
  // Filtered text is ~1010 chars; head keeps 100 → omitted ~910. The raw input is 1110, so
  // the buggy `text.length - head.length` would report ~1010 (> filtered length).
  assert.ok(
    omitted <= 1000,
    `omitted must reflect the filtered text (<=1000), got ${omitted}`
  );
});
