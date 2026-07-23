import { test } from "node:test";
import assert from "node:assert/strict";
import {
  smartFilterText,
  clampMcpAccessibilityConfig,
} from "../../../open-sse/services/compression/engines/mcpAccessibility/index.ts";
import { DEFAULT_MCP_ACCESSIBILITY_CONFIG } from "../../../open-sse/services/compression/engines/mcpAccessibility/constants.ts";

// smartFilterText reserves 300 chars for the truncation tail/notice, so any maxTextChars below
// that leaves headSize <= 0 and the whole tool result is replaced by the notice (total data
// loss). The DB normalizer floored maxTextChars only at > 0, and the production read path in
// server.ts bypassed bounding entirely. clampMcpAccessibilityConfig is the shared guard.
test("clamps maxTextChars below the tail reserve to the default", () => {
  for (const bad of [1, 50, 300, 599]) {
    assert.equal(
      clampMcpAccessibilityConfig({ maxTextChars: bad }).maxTextChars,
      DEFAULT_MCP_ACCESSIBILITY_CONFIG.maxTextChars,
      `maxTextChars=${bad} must fall back to default`
    );
  }
});

test("keeps a sane maxTextChars (>= 600)", () => {
  assert.equal(clampMcpAccessibilityConfig({ maxTextChars: 600 }).maxTextChars, 600);
  assert.equal(clampMcpAccessibilityConfig({ maxTextChars: 1000 }).maxTextChars, 1000);
  assert.equal(clampMcpAccessibilityConfig({ maxTextChars: 1234.9 }).maxTextChars, 1234);
});

test("bounds the other numeric fields and honors enabled", () => {
  const c = clampMcpAccessibilityConfig({
    collapseThreshold: -5,
    minLengthToProcess: 0,
    collapseKeepHead: -1,
    enabled: false,
  });
  assert.equal(c.collapseThreshold, DEFAULT_MCP_ACCESSIBILITY_CONFIG.collapseThreshold);
  assert.equal(c.minLengthToProcess, DEFAULT_MCP_ACCESSIBILITY_CONFIG.minLengthToProcess);
  assert.equal(c.collapseKeepHead, DEFAULT_MCP_ACCESSIBILITY_CONFIG.collapseKeepHead);
  assert.equal(c.enabled, false);
});

test("a clamped config never lets smartFilterText truncate the whole text away", () => {
  // The previously-dangerous stored value: maxTextChars=50 → clamps to default, so a
  // 1000-char tool result is NOT replaced wholesale by the truncation notice.
  const cfg = clampMcpAccessibilityConfig({ maxTextChars: 50, minLengthToProcess: 1 });
  const out = smartFilterText("A".repeat(1000), cfg);
  assert.ok(out.includes("A".repeat(500)), "content preserved (not nuked by a tiny maxTextChars)");
});
