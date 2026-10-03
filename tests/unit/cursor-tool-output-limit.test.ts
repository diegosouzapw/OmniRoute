/**
 * Cursor caps what a tool result may carry: an MCP text result over 40000
 * bytes is cut at that byte with a notice that tells the model not to retry and
 * nothing about where the cut fell, and a ReadSuccess over 100000 characters is
 * rejected outright. Either way the model loses the lines it asked for and
 * guesses offsets. The router fits results under those caps itself, on a line
 * boundary, and says which line the result stops at.
 * Run: node --import tsx/esm --test tests/unit/cursor-tool-output-limit.test.ts
 */
import assert from "node:assert/strict";
import test from "node:test";

import {
  encodeExecMcpResult,
  encodeExecReadSuccess,
} from "../../open-sse/utils/cursorAgentProtobuf/execResults.ts";
import {
  CURSOR_MCP_TEXT_MAX_BYTES,
  CURSOR_READ_CONTENT_MAX_BYTES,
  fitCursorToolOutput,
} from "../../open-sse/utils/cursorAgentProtobuf/toolOutputLimit.ts";
import { decodeFields } from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";

function numbered(count: number, width: number, format = (n: number) => `${n}: `, first = 1) {
  return Array.from({ length: count }, (_, i) => {
    const prefix = format(first + i);
    return prefix + "x".repeat(Math.max(0, width - prefix.length));
  }).join("\n");
}

function field(bytes: Buffer, n: number) {
  return decodeFields(bytes).find((f) => f.fieldNumber === n);
}

test("a result under the cap passes through untouched", () => {
  const text = numbered(10, 20);
  assert.deepEqual(fitCursorToolOutput(text, 1000), { text, truncated: false });
});

test("an oversized result is cut on a line boundary and names the last line shown", () => {
  const text = numbered(3000, 30);
  const { text: fitted, truncated } = fitCursorToolOutput(text, 38000);
  assert.equal(truncated, true);
  assert.ok(Buffer.byteLength(fitted) <= 38000, `${Buffer.byteLength(fitted)} bytes`);

  const [body, notice] = fitted.split("\n\n[");
  const kept = body.split("\n");
  const original = text.split("\n");
  assert.deepEqual(kept, original.slice(0, kept.length), "only whole lines are kept");
  const last = kept.length;
  assert.match(notice, new RegExp(`line ${last}\\b`));
  assert.match(notice, new RegExp(`line ${last + 1}\\b`));
  assert.match(notice, /3000 lines/);
});

test("line numbers in Claude Code and OpenCode formats are recognised", () => {
  for (const format of [
    (n: number) => `${String(n).padStart(6)}→`,
    (n: number) => `${String(n).padStart(5, "0")}| `,
  ]) {
    // Numbered from 2001, as a ranged read returns it.
    const { text: fitted } = fitCursorToolOutput(numbered(2000, 40, format, 2001), 30000);
    const kept = fitted.split("\n\n[")[0].split("\n");
    assert.match(fitted, new RegExp(`line ${2000 + kept.length}\\b`));
  }
});

test("output without line numbers says how many of its lines were kept", () => {
  const text = Array.from({ length: 3000 }, () => "y".repeat(29)).join("\n");
  const { text: fitted } = fitCursorToolOutput(text, 38000);
  const kept = fitted.split("\n\n[")[0].split("\n").length;
  assert.match(fitted, new RegExp(`first ${kept} of 3000 lines`));
});

test("the byte cap holds for multi-byte text", () => {
  const text = Array.from({ length: 3000 }, (_, i) => `${i + 1}: ${"é".repeat(20)}`).join("\n");
  const { text: fitted, truncated } = fitCursorToolOutput(text, 38000);
  assert.equal(truncated, true);
  assert.ok(Buffer.byteLength(fitted) <= 38000);
});

test("an MCP result over Cursor's inline limit is fitted before it is sent", () => {
  const text = numbered(2000, 27);
  assert.ok(Buffer.byteLength(text) > 40000);
  const frame = encodeExecMcpResult(3, "exec-mcp-3", text, false);
  const ecm = field(frame.subarray(5), 2)!.bytes;
  const success = field(field(ecm, 11)!.bytes, 1)!.bytes;
  const item = field(success, 1)!.bytes;
  const sent = field(field(item, 1)!.bytes, 1)!.bytes.toString("utf8");
  assert.ok(Buffer.byteLength(sent) <= CURSOR_MCP_TEXT_MAX_BYTES);
  assert.ok(CURSOR_MCP_TEXT_MAX_BYTES < 40000);
  assert.match(sent, /continue from line \d+/);
});

test("a held read over Cursor's read limit is fitted and marked truncated", () => {
  const text = numbered(3000, 46);
  assert.ok(text.length > 100000);
  const frame = encodeExecReadSuccess(3, "exec-read-3", "/repo/big.txt", text, {
    offset: 1,
    limit: 3000,
  });
  const ecm = field(frame.subarray(5), 2)!.bytes;
  const success = field(field(ecm, 7)!.bytes, 1)!.bytes;
  const content = field(success, 2)!.bytes.toString("utf8");
  assert.ok(Buffer.byteLength(content) <= CURSOR_READ_CONTENT_MAX_BYTES);
  assert.ok(CURSOR_READ_CONTENT_MAX_BYTES < 100000);
  assert.equal(field(success, 6)?.varint, 1n, "truncated");
  assert.equal(field(success, 3)?.varint, 3000n, "total_lines counts the client's whole result");
});

// A held read answers Cursor's own read tool, and Cursor renders the slice
// against total_lines: "... N lines not shown ..." before and after it. The
// client reports only the lines it returned, so the file length is unknown
// unless the client states it. total_lines must never claim the file ends
// where a full window of lines ends.
function heldRead(content: string, range?: { offset?: number; limit?: number }) {
  const frame = encodeExecReadSuccess(3, "exec-read-3", "/repo/huge.py", content, range);
  const ecm = field(frame.subarray(5), 2)!.bytes;
  const success = field(field(ecm, 7)!.bytes, 1)!.bytes;
  return {
    content: field(success, 2)!.bytes.toString("utf8"),
    totalLines: field(success, 3)?.varint,
    rangeApplied: field(success, 8)?.varint,
  };
}

test("a short window marks the end of the file", () => {
  const read = heldRead(numbered(5, 10, undefined, 4400), { offset: 4400, limit: 50 });
  assert.equal(read.totalLines, 4404n);
  assert.equal(read.content, numbered(5, 10, undefined, 4400));
  assert.equal(read.rangeApplied, 1n);
});

test("a full window says the file may continue after it", () => {
  const read = heldRead(numbered(20, 10, undefined, 101), { offset: 101, limit: 20 });
  assert.equal(read.totalLines, 120n);
  assert.match(read.content, /may continue after line 120\b/);
  assert.match(read.content, /line 121\b/);
});

test("a whole-file read that hit the client's line cap says the file may continue", () => {
  const read = heldRead(numbered(2000, 10));
  assert.equal(read.totalLines, 2000n);
  assert.match(read.content, /may continue after line 2000\b/);
  assert.equal(read.rangeApplied, undefined);
  assert.equal(heldRead(numbered(10, 10)).content, numbered(10, 10));
  // Claude Code returns a whole file past 2000 lines when it fits its budget.
  const whole = heldRead(numbered(2500, 10));
  assert.equal(whole.totalLines, 2500n);
  assert.equal(whole.content, numbered(2500, 10));
});

test("a file length stated by the client is used as total_lines", () => {
  const warning =
    "<system-reminder>Warning: the file exists but is shorter than the provided offset (8000). The file has 4404 lines.</system-reminder>";
  const read = heldRead(warning, { offset: 8000, limit: 20 });
  assert.equal(read.totalLines, 4404n);
  assert.equal(read.content, warning);
});
