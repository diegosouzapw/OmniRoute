import test from "node:test";
import assert from "node:assert/strict";

const { normalizeHeaders, getHeader } = await import("../../open-sse/utils/headers.ts");

test("normalizeHeaders flattens a global Headers instance to plain object with lower-cased keys", () => {
  const h = new Headers({
    "Content-Type": "application/json",
    "Retry-After": "10",
    "X-Custom": "value",
  });

  const plain = normalizeHeaders(h);

  assert.deepEqual(plain, {
    "content-type": "application/json",
    "retry-after": "10",
    "x-custom": "value",
  });
});

test("normalizeHeaders accepts a plain object and lower-cases its keys", () => {
  const plain = normalizeHeaders({
    "X-Codex-5h-Usage": "42",
    "Retry-After": "5",
  });

  assert.equal(plain["x-codex-5h-usage"], "42");
  assert.equal(plain["retry-after"], "5");
});

test("normalizeHeaders returns {} for null / undefined / empty inputs", () => {
  assert.deepEqual(normalizeHeaders(null), {});
  assert.deepEqual(normalizeHeaders(undefined), {});
  assert.deepEqual(normalizeHeaders({}), {});
});

test("normalizeHeaders survives an object that throws on forEach (cross-undici-instance simulation)", () => {
  // Simulate the failure mode described in #2751: an object that *looks* like Headers
  // but throws when .forEach is called (because the private #headers slot belongs to a
  // different undici copy). The helper must fall back to entries(), then plain enum.
  const throwingForEach = {
    forEach: () => {
      throw new TypeError("Cannot read private member #headers");
    },
    entries: () => [
      ["X-Survived", "yes"],
      ["Retry-After", "1"],
    ][Symbol.iterator](),
  };

  const plain = normalizeHeaders(throwingForEach as unknown as Headers);
  assert.equal(plain["x-survived"], "yes");
  assert.equal(plain["retry-after"], "1");
});

test("normalizeHeaders falls back to Object.entries when neither forEach nor entries works", () => {
  const noIterators = { "X-Plain": "ok", "Other": "value" };
  const plain = normalizeHeaders(noIterators);
  assert.equal(plain["x-plain"], "ok");
  assert.equal(plain["other"], "value");
});

test("getHeader returns the value (case-insensitive) or null", () => {
  const h = new Headers({ "Retry-After": "30" });
  assert.equal(getHeader(h, "retry-after"), "30");
  assert.equal(getHeader(h, "Retry-After"), "30");
  assert.equal(getHeader(h, "missing"), null);
  assert.equal(getHeader(null, "any"), null);
});
