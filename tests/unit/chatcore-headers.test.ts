import test from "node:test";
import assert from "node:assert/strict";

import { getHeaderValueCaseInsensitive } from "../../open-sse/handlers/chatCore/headers.ts";

test("getHeaderValueCaseInsensitive reads Headers and plain objects, case-insensitively", () => {
  const h = new Headers({ "Content-Type": "text/event-stream" });
  assert.equal(getHeaderValueCaseInsensitive(h, "content-type"), "text/event-stream");

  const obj = { Accept: "text/event-stream", "X-Foo": "bar" };
  assert.equal(getHeaderValueCaseInsensitive(obj, "accept"), "text/event-stream");
  assert.equal(getHeaderValueCaseInsensitive(obj, "x-foo"), "bar");

  // plain-object values are trimmed
  assert.equal(getHeaderValueCaseInsensitive({ Accept: "  v  " }, "accept"), "v");
  // missing / non-object -> null
  assert.equal(getHeaderValueCaseInsensitive({ Accept: "x" }, "missing"), null);
  assert.equal(getHeaderValueCaseInsensitive(null, "accept"), null);
  assert.equal(getHeaderValueCaseInsensitive(undefined, "accept"), null);
});
