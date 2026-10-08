import { test } from "node:test";
import assert from "node:assert/strict";

import { cleanResponse, stripCitations } from "../../open-sse/executors/perplexity-web/protocol.ts";

// Follow-up to #13968: CITATION_RE strips any [n] token, and cleanResponse()
// runs on the whole answer before tool mode turns <tool> text into tool_calls.
// Subscript indexing is spelled exactly like a citation marker, so `arr[0]`
// was being eaten in rendered code blocks and in tool-call arguments alike.
// Citations must still be stripped in prose; code regions must survive.

const FENCED = ["```python", "print(arr[0], arr[12])", "x = [0]", "```"].join("\n");

test("fenced code keeps subscripts and list literals", () => {
  assert.equal(cleanResponse(FENCED), FENCED);
});

test("inline code spans keep subscripts", () => {
  assert.equal(cleanResponse("use `arr[0]` here"), "use `arr[0]` here");
});

test("tool payloads keep subscripts", () => {
  const tool =
    '<tool>{"name":"write_file","arguments":{"content":"v = arr[0]\\nw = m[12]"}}</tool>';
  assert.equal(cleanResponse(tool), tool);
});

test("prose citations are still stripped", () => {
  assert.equal(cleanResponse("text [1] more"), "text more");
  assert.equal(cleanResponse("text [1][2] more"), "text more");
  assert.equal(cleanResponse("text [3]."), "text.");
  assert.equal(cleanResponse("text[4] more"), "text more");
});

test("citations around a protected region are still stripped", () => {
  assert.equal(cleanResponse("see [1] `arr[0]` and [2] done"), "see `arr[0]` and done");
  assert.equal(
    cleanResponse(["intro [1]", "```py", "y = b[3]", "```", "outro [2]"].join("\n")),
    ["intro", "```py", "y = b[3]", "```", "outro"].join("\n")
  );
});

test("an unterminated fence or tool block still protects the tail", () => {
  assert.equal(cleanResponse("```py\nz = c[7]"), "```py\nz = c[7]");
  assert.equal(cleanResponse('<tool>{"content":"z = c[7]"}'), '<tool>{"content":"z = c[7]"}');
});

test("stripCitations leaves text without protected regions untouched apart from markers", () => {
  assert.equal(stripCitations("plain [5] text"), "plain text");
  assert.equal(stripCitations("no markers here"), "no markers here");
});

test("indentation behaviour from #13968 is unchanged", () => {
  const py = ["```python", "def f(x):", "    if x:", "        return 1", "```"].join("\n");
  assert.equal(cleanResponse(py), py);
  assert.equal(cleanResponse("a = 1    # aligned comment"), "a = 1    # aligned comment");
  assert.equal(cleanResponse("  keep  ", false), "  keep  ");
});
