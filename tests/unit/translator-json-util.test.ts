import test from "node:test";
import assert from "node:assert/strict";

// Unit coverage for the extracted safeParseJSON util and the two distinct
// fallbacks its callers rely on:
//   - geminiHelper.tryParseJSON  -> null fallback on parse error
//   - openai-to-claude tryParseJSON -> raw-string passthrough on parse error
const { safeParseJSON } = await import("../../open-sse/translator/helpers/jsonUtil.ts");
const gemini = await import("../../open-sse/translator/helpers/geminiHelper.ts");

test("safeParseJSON: non-string input is returned unchanged (passthrough)", () => {
  assert.equal(safeParseJSON(42, null), 42);
  assert.equal(safeParseJSON(null, "fb"), null);
  assert.equal(safeParseJSON(undefined, "fb"), undefined);
  const obj = { a: 1 };
  assert.equal(safeParseJSON(obj, null), obj);
});

test("safeParseJSON: valid JSON strings parse regardless of fallback", () => {
  assert.deepEqual(safeParseJSON('{"a":1}', null), { a: 1 });
  assert.deepEqual(safeParseJSON("[1,2,3]", "ignored"), [1, 2, 3]);
  assert.equal(safeParseJSON("42", null), 42);
  assert.equal(safeParseJSON("true", null), true);
  assert.equal(safeParseJSON("null", "ignored"), null);
});

test("safeParseJSON: invalid JSON returns the caller-chosen fallback", () => {
  // null fallback (geminiHelper semantics)
  assert.equal(safeParseJSON("not json", null), null);
  assert.equal(safeParseJSON("{broken}", null), null);
  assert.equal(safeParseJSON("", null), null);

  // raw-string passthrough fallback (openai-to-claude semantics)
  assert.equal(safeParseJSON("not json", "not json"), "not json");
  assert.equal(safeParseJSON("{broken", "{broken"), "{broken");
});

test("geminiHelper.tryParseJSON still returns null on parse error (re-export delegates)", () => {
  assert.deepEqual(gemini.tryParseJSON('{"ok":true}'), { ok: true });
  assert.equal(gemini.tryParseJSON("{broken"), null);
  assert.equal(gemini.tryParseJSON("not json"), null);
  assert.equal(gemini.tryParseJSON(""), null);
  // non-string passthrough preserved
  assert.equal(gemini.tryParseJSON(123), 123);
});
