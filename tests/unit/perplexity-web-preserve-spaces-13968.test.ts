import { test } from "node:test";
import assert from "node:assert/strict";

import { cleanResponse } from "../../open-sse/executors/perplexity-web/protocol.ts";

// #13968: the non-streaming path (which tool mode always uses) collapsed every
// run of spaces to one, so code written through perplexity-web lost its
// indentation. Runs of spaces must survive; citation cleanup must still leave
// single spacing behind.

const PY = ["```python", "def f(x):", "    if x:", "        return 1", "    return 0", "```"].join(
  "\n"
);

test("cleanResponse keeps leading indentation and internal runs of spaces", () => {
  assert.equal(cleanResponse(PY), PY);
  assert.equal(cleanResponse("a = 1    # aligned comment"), "a = 1    # aligned comment");
});

test("cleanResponse still removes citations without leaving double spaces", () => {
  assert.equal(cleanResponse("text [1] more"), "text more");
  assert.equal(cleanResponse("text [1][2] more"), "text more");
  assert.equal(cleanResponse("text [3]."), "text.");
  assert.equal(cleanResponse("text[4] more"), "text more");
});

test("cleanResponse trim and blank-line squashing are unchanged", () => {
  assert.equal(cleanResponse("  hello  "), "hello");
  assert.equal(cleanResponse("a\n\n\n\nb"), "a\n\nb");
  assert.equal(cleanResponse("  keep  ", false), "  keep  ");
});
