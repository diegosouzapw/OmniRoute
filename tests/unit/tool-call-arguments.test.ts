import test from "node:test";
import assert from "node:assert/strict";

import { appendToolCallArgumentDelta } from "../../open-sse/utils/toolCallArguments.ts";

/**
 * Helper: reduce a list of incremental delta fragments the way the streaming
 * accumulators do (sseParser / responsesTransformer / translators).
 */
function accumulate(fragments: string[]): string {
  return fragments.reduce<string>((acc, frag) => appendToolCallArgumentDelta(acc, frag), "");
}

test("appendToolCallArgumentDelta concatenates incremental fragments verbatim", () => {
  assert.equal(accumulate(['{"q":"hel', 'lo"}']), '{"q":"hello"}');
});

test("appendToolCallArgumentDelta preserves repeated characters across fragment boundaries (#3701 anti-truncation)", () => {
  // The previous fuzzy-dedup heuristic dropped a byte here, turning the buffer's
  // trailing "x" + the next "x" into a single "x". Repeated chars must survive.
  assert.equal(accumulate(['{"a":"', "x", "x", '"}']), '{"a":"xx"}');
  // A shell command with a doubled letter must not be silently truncated
  // (`ls -ll` → `ls -l` was the real-world corruption).
  assert.equal(accumulate(['{"cmd":"l', 'l -l"}']), '{"cmd":"ll -l"}');
  // A doubled letter that straddles a single-char fragment boundary survives.
  assert.equal(accumulate(['{"path":"/a/bb', 'b/c"}']), '{"path":"/a/bbb/c"}');
});

test("appendToolCallArgumentDelta dedups an identical full-snapshot repeat", () => {
  const args = JSON.stringify({ command: "find /tmp -name test.txt" });
  assert.equal(appendToolCallArgumentDelta(args, args), args);
});

test("appendToolCallArgumentDelta replaces a growing full snapshot instead of concatenating", () => {
  assert.equal(appendToolCallArgumentDelta('{"a"', '{"a":1}'), '{"a":1}');
  assert.equal(appendToolCallArgumentDelta('{"command":"ec', '{"command":"echo hi"}'), '{"command":"echo hi"}');
});

test("appendToolCallArgumentDelta handles empty / non-string inputs", () => {
  assert.equal(appendToolCallArgumentDelta("", "x"), "x");
  assert.equal(appendToolCallArgumentDelta("x", ""), "x");
  assert.equal(appendToolCallArgumentDelta(undefined, "x"), "x");
  assert.equal(appendToolCallArgumentDelta("x", undefined), "x");
  assert.equal(appendToolCallArgumentDelta(null, null), "");
  assert.equal(appendToolCallArgumentDelta(42, "x"), "x");
});
