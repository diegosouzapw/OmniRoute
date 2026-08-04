import { test } from "node:test";
import assert from "node:assert/strict";

import { parseSSELine, stripAnsiCodes } from "../../open-sse/utils/streamHelpers.ts";

test("parseSSELine resolves an ANSI/VT100-prefixed data: frame (gemini-cli redraw)", () => {
  // gemini-cli prefixes SSE frames with cursor-redraw escapes (\x1b[2K clears the
  // line, \x1b[1A moves the cursor up). 0x1b is not whitespace, so before the fix
  // trimStart().startsWith("data:") failed and the frame was silently dropped (#2273).
  const line = `\x1b[2K\x1b[1Adata: ${JSON.stringify({
    choices: [{ delta: { content: "hi" } }],
  })}`;
  const r = parseSSELine(line);
  assert.ok(r, "expected a parsed payload, got null (frame was dropped)");
  assert.equal(r?.choices?.[0]?.delta?.content, "hi");
});

test("parseSSELine returns null for a pure-ANSI line (nothing after stripping)", () => {
  assert.equal(parseSSELine("\x1b[2K\x1b[1A"), null);
});

test("stripAnsiCodes strips CSI/SGR/OSC/C0 but preserves \\t \\n \\r", () => {
  // CSI cursor moves + SGR color codes
  assert.equal(stripAnsiCodes("\x1b[2K\x1b[1Ahello"), "hello");
  assert.equal(stripAnsiCodes("\x1b[31mred\x1b[0m"), "red");
  // OSC sequence terminated by BEL (\x07)
  assert.equal(stripAnsiCodes("\x1b]0;title\x07text"), "text");
  // OSC sequence terminated by ST (\x1b\\)
  assert.equal(stripAnsiCodes("\x1b]8;;https://x\x1b\\link"), "link");
  // stray C0 control byte
  assert.equal(stripAnsiCodes("a\x00b"), "ab");
  // whitespace preserved
  assert.equal(stripAnsiCodes("a\tb\nc\rd"), "a\tb\nc\rd");
});

test("stripAnsiCodes passes null/undefined through unchanged", () => {
  assert.equal(stripAnsiCodes(null), null);
  assert.equal(stripAnsiCodes(undefined), undefined);
});

test("stripAnsiCodes runs in linear time on adversarial input (ReDoS guard)", () => {
  const hostile = "\x1b[" + "0;".repeat(50000) + "m";
  const start = Date.now();
  stripAnsiCodes(hostile);
  assert.ok(Date.now() - start < 1000, "stripAnsiCodes should not backtrack catastrophically");
});
