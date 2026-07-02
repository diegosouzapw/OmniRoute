import test from "node:test";
import assert from "node:assert/strict";
import { getUpstreamErrorIdentifier } from "../getUpstreamErrorIdentifier.ts";

/**
 * Test suite for the extracted `getUpstreamErrorIdentifier` leaf (PR-020,
 * chatCore god-file decomposition, #3501).
 *
 * Each test verifies one specific behaviour from the function's JSDoc contract:
 *   - non-object inputs (null / undefined / primitives) collapse to `undefined`,
 *   - object-shaped inputs with a string `code` are returned verbatim,
 *   - object-shaped inputs with non-string `code` (number, boolean, object, etc.) collapse
 *     to `undefined` — no `String()` coercion,
 *   - empty-string `code` is treated as "no code" so callers never have to special-case
 *     `""` downstream,
 *   - real `Error` subclasses are treated as plain objects (the `.code` property is
 *     checked normally; this matches how error-classifier looks at the same field),
 *   - the input is never mutated.
 */

// ── 1. Happy path: object with a non-empty string code ───────────────────────
test("getUpstreamErrorIdentifier: returns the code verbatim when it is a non-empty string", () => {
  const err = { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests" };
  assert.equal(getUpstreamErrorIdentifier(err), "RATE_LIMIT_EXCEEDED");
});

// ── 2. Empty-string code is treated as "no code" ─────────────────────────────
test("getUpstreamErrorIdentifier: empty-string code returns undefined", () => {
  // Empty strings are an extremely common "code present but unusable" shape from
  // generic upstream errors (e.g. an openai 500 with a body of `{}`). Pin this so
  // callers don't have to defend against `""` separately.
  const err = { code: "", message: "no useful code" };
  assert.equal(getUpstreamErrorIdentifier(err), undefined);
});

// ── 3. null input ────────────────────────────────────────────────────────────
test("getUpstreamErrorIdentifier: null input returns undefined", () => {
  assert.equal(getUpstreamErrorIdentifier(null), undefined);
});

// ── 4. undefined input ────────────────────────────────────────────────────────
test("getUpstreamErrorIdentifier: undefined input returns undefined", () => {
  assert.equal(getUpstreamErrorIdentifier(undefined), undefined);
});

// ── 5. Primitive inputs never throw and always return undefined ───────────────
test("getUpstreamErrorIdentifier: string primitive returns undefined", () => {
  assert.equal(getUpstreamErrorIdentifier("RATE_LIMIT_EXCEEDED"), undefined);
});

test("getUpstreamErrorIdentifier: number primitive returns undefined", () => {
  assert.equal(getUpstreamErrorIdentifier(429), undefined);
});

test("getUpstreamErrorIdentifier: boolean primitive returns undefined", () => {
  assert.equal(getUpstreamErrorIdentifier(false), undefined);
});

// ── 6. Non-string code values are not coerced ────────────────────────────────
test("getUpstreamErrorIdentifier: numeric code is treated as missing (no coercion)", () => {
  // The contract is "string code" — numeric codes must NOT be String()'d; doing so
  // would couple us to whether `429 === "429"` patterns ever appear in logs.
  const err = { code: 429 };
  assert.equal(getUpstreamErrorIdentifier(err), undefined);
});

test("getUpstreamErrorIdentifier: boolean code returns undefined", () => {
  const err = { code: true };
  assert.equal(getUpstreamErrorIdentifier(err), undefined);
});

test("getUpstreamErrorIdentifier: object-as-code returns undefined", () => {
  // Some upstream errors nest the actual reason inside a code object; the leaf here
  // intentionally does NOT drill in — the parent executor's error-classifier owns
  // shape-specific extraction.
  const err = { code: { reason: "rate_limit" } };
  assert.equal(getUpstreamErrorIdentifier(err), undefined);
});

// ── 7. Objects without a `code` field at all are not errors ──────────────────
test("getUpstreamErrorIdentifier: object without code property returns undefined", () => {
  const err = { message: "boom", status: 500 };
  assert.equal(getUpstreamErrorIdentifier(err), undefined);
});

// ── 8. Real Error instances ──────────────────────────────────────────────────
test("getUpstreamErrorIdentifier: real Error instance returns undefined when no code is attached", () => {
  // A plain `new Error("boom")` has no `.code`, so the leaf returns undefined. This
  // is the most common case — the upstream `code` only shows up after classification.
  assert.equal(getUpstreamErrorIdentifier(new Error("boom")), undefined);
});

test("getUpstreamErrorIdentifier: real Error with attached code property returns the code", () => {
  // Some executor wrappers do `err.code = "..."` then rethrow. Confirm the leaf reads
  // through the Error instance to find the same `.code` property.
  const err = new Error("upstream said no") as Error & { code: string };
  err.code = "CONTEXT_LENGTH_EXCEEDED";
  assert.equal(getUpstreamErrorIdentifier(err), "CONTEXT_LENGTH_EXCEEDED");
});

// ── 9. Arrays are objects, but not error-shaped, and never carry .code ────────
test("getUpstreamErrorIdentifier: arrays return undefined", () => {
  // Arrays pass `typeof === "object"`. They might carry extra props in edge cases but
  // upstream error contract never uses arrays as the error root.
  assert.equal(getUpstreamErrorIdentifier([]), undefined);
  assert.equal(getUpstreamErrorIdentifier(["RATE_LIMIT_EXCEEDED"]), undefined);
});

// ── 10. The input is not mutated ──────────────────────────────────────────────
test("getUpstreamErrorIdentifier: does not mutate the input object", () => {
  const err = { code: "QUOTA_EXHAUSTED", message: "billing" };
  const snapshot = { code: "QUOTA_EXHAUSTED", message: "billing" };
  getUpstreamErrorIdentifier(err);
  assert.deepEqual(err, snapshot);
});

test("getUpstreamErrorIdentifier: does not mutate the input when called twice with nested nulls", () => {
  // The null/primitive branch is the only branch that doesn't read the object at all,
  // but pin that even the read-only branches return undefined cleanly.
  assert.equal(getUpstreamErrorIdentifier(null), undefined);
  assert.equal(getUpstreamErrorIdentifier(null), undefined);
});

// ── 11. Whitespace-only code strings are non-empty, so they ARE returned ──────
test("getUpstreamErrorIdentifier: whitespace-only code is returned as-is (length > 0 check only)", () => {
  // The contract is `length > 0`; we explicitly do not trim. Whitespace strings are
  // returned verbatim so callers can choose to trim or normalize themselves. This
  // prevents the leaf from silently rewriting upstream namespaced codes that happen
  // to contain leading/trailing whitespace.
  const err = { code: " " };
  assert.equal(getUpstreamErrorIdentifier(err), " ");
});

// ── 12. Stable return type: string | undefined (never null) ───────────────────
test("getUpstreamErrorIdentifier: never returns null (only string or undefined)", () => {
  const cases: unknown[] = [
    null,
    undefined,
    { code: "" },
    { code: "OK" },
    { code: 0 },
    { message: "no code" },
  ];
  for (const input of cases) {
    const out = getUpstreamErrorIdentifier(input);
    assert.ok(out === undefined || typeof out === "string", `unexpected output for ${JSON.stringify(input)}: ${JSON.stringify(out)}`);
  }
});
