import { test } from "node:test";
import assert from "node:assert/strict";

import { sanitizeNotionAssistantText } from "../../open-sse/services/notionStreamParser.ts";

test("returns an empty string for empty or falsy input", () => {
  assert.equal(sanitizeNotionAssistantText(""), "");
});

test("strips a leading BOM and surrounding whitespace", () => {
  assert.equal(sanitizeNotionAssistantText("﻿  hello  "), "hello");
});

test("removes self-closing and paired lang tags anywhere in the text", () => {
  assert.equal(sanitizeNotionAssistantText("<lang en/>hello<lang zh>world</lang>"), "helloworld");
});

test("keeps ordinary text untouched aside from trimming", () => {
  assert.equal(sanitizeNotionAssistantText("  plain response  "), "plain response");
});

test("drops the whole text when it is only an unclosed leading lang tag", () => {
  assert.equal(sanitizeNotionAssistantText("<lang en"), "");
});

test("keeps text after an unclosed-looking lang tag once a '>' appears anywhere", () => {
  // The guard only fires when there is no '>' at all; a real tag closes normally
  // and is stripped by the earlier replace, not by the empty-string guard.
  assert.equal(sanitizeNotionAssistantText("<lang en>hello"), "hello");
});
