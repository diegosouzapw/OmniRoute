import { test } from "node:test";
import assert from "node:assert/strict";
import { smartFilterText } from "@omniroute/open-sse/services/compression/engines/mcpAccessibility/index.ts";
import { DEFAULT_MCP_ACCESSIBILITY_CONFIG } from "@omniroute/open-sse/services/compression/engines/mcpAccessibility/constants.ts";

test("collapses ≥30 sibling buttons into head + summary + tail", () => {
  const lines = [];
  for (let i = 0; i < 50; i++) {
    lines.push(`  - button "Item ${i}" [ref=e${i}]`);
  }
  const input = lines.join("\n").padEnd(3000, " ");
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.ok(out.includes("Item 0"), "keeps head");
  assert.ok(out.includes("Item 49"), "keeps tail");
  assert.ok(out.includes('similar "button" items omitted'), "summarizes middle");
  assert.ok(out.length < input.length, "compressed");
});

test("preserves [ref=eXX] anchors during truncation", () => {
  const huge = '  - button "X" [ref=e123]\n' + "a".repeat(60000);
  const out = smartFilterText(huge, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.ok(out.includes("[ref=e123]"), "preserves refs even on truncate");
  assert.ok(out.length <= 50500, "respects maxTextChars + footer");
});

test('removes noise lines (- generic:, - text: "")', () => {
  const input = ['  - button "OK"', "  - generic:", '  - text: ""', '  - link "Sign in"']
    .join("\n")
    .padEnd(3000, " ");
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.ok(!out.includes("- generic:"), "drops generic noise");
  assert.ok(!out.match(/- text: ""/), "drops empty text noise");
  assert.ok(out.includes("button"), "keeps signal");
});

test("returns unchanged when below minLengthToProcess", () => {
  const small = "tiny";
  const out = smartFilterText(small, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.equal(out, small);
});
