import test, { describe, it } from "node:test";
import assert from "node:assert/strict";

import { getHeaderValueCaseInsensitive, resolveCompressionHeader } from "../../open-sse/handlers/chatCore/headers.ts";

test("getHeaderValueCaseInsensitive reads a Headers instance via .get()", () => {
  const h = new Headers({ "Content-Type": "text/event-stream" });
  // Headers.get is itself case-insensitive, so a lowercase lookup hits the value.
  assert.equal(getHeaderValueCaseInsensitive(h, "content-type"), "text/event-stream");
  assert.equal(getHeaderValueCaseInsensitive(h, "Content-Type"), "text/event-stream");
  // Missing header on a Headers instance returns null (Headers.get contract).
  assert.equal(getHeaderValueCaseInsensitive(h, "x-missing"), null);
});

test("getHeaderValueCaseInsensitive matches plain-object keys case-insensitively", () => {
  const obj = { Accept: "text/event-stream", "X-Foo": "bar" };
  assert.equal(getHeaderValueCaseInsensitive(obj, "accept"), "text/event-stream");
  assert.equal(getHeaderValueCaseInsensitive(obj, "ACCEPT"), "text/event-stream");
  assert.equal(getHeaderValueCaseInsensitive(obj, "x-foo"), "bar");
});

test("getHeaderValueCaseInsensitive trims plain-object string values", () => {
  assert.equal(getHeaderValueCaseInsensitive({ Accept: "  v  " }, "accept"), "v");
});

test("getHeaderValueCaseInsensitive ignores blank and non-string plain-object values", () => {
  // whitespace-only value: value.trim() is falsy -> skipped -> null
  assert.equal(getHeaderValueCaseInsensitive({ Accept: "   " }, "accept"), null);
  // empty string -> skipped -> null
  assert.equal(getHeaderValueCaseInsensitive({ Accept: "" }, "accept"), null);
  // non-string values are not strings -> skipped -> null
  assert.equal(getHeaderValueCaseInsensitive({ "Content-Length": 42 }, "content-length"), null);
  assert.equal(getHeaderValueCaseInsensitive({ Flag: true }, "flag"), null);
});

test("getHeaderValueCaseInsensitive returns null for missing key on plain object", () => {
  assert.equal(getHeaderValueCaseInsensitive({ Accept: "x" }, "missing"), null);
});

test("getHeaderValueCaseInsensitive returns null for null/undefined/non-object inputs", () => {
  assert.equal(getHeaderValueCaseInsensitive(null, "accept"), null);
  assert.equal(getHeaderValueCaseInsensitive(undefined, "accept"), null);
  // a non-object (typeof !== "object") short-circuits to null
  assert.equal(
    getHeaderValueCaseInsensitive("text/event-stream" as unknown as Record<string, unknown>, "accept"),
    null
  );
});

describe("resolveCompressionHeader", () => {
  it("reads the raw value case-insensitively and trims it", () => {
    assert.equal(resolveCompressionHeader({ "x-omniroute-compression": "  engine:rtk " }), "engine:rtk");
    assert.equal(resolveCompressionHeader(new Headers({ "X-OmniRoute-Compression": "off" })), "off");
  });

  it("returns null when absent or blank", () => {
    assert.equal(resolveCompressionHeader({}), null);
    assert.equal(resolveCompressionHeader({ "x-omniroute-compression": "   " }), null);
    assert.equal(resolveCompressionHeader(null), null);
  });
});
