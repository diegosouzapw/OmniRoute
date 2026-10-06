import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { timingSafeCompare } from "../../src/shared/utils/timingSafeCompare.ts";

// GHSA-7434-6q4c-33fh — the OIDC callback compared the CSRF `state` cookie with
// `!==` while every sibling callback already used a constant-time compare. Low
// severity on its own (single-use nonce), but the pattern gets copied, so the
// guard below pins the two callsites to the shared helper.

test("timingSafeCompare accepts identical values", () => {
  assert.equal(timingSafeCompare("abc123", "abc123"), true);
  assert.equal(timingSafeCompare("", ""), true);
});

test("timingSafeCompare rejects different values, including same-length ones", () => {
  assert.equal(timingSafeCompare("abc123", "abc124"), false);
  assert.equal(timingSafeCompare("abc123", "xbc123"), false);
  assert.equal(timingSafeCompare("abc", "abcdef"), false);
  assert.equal(timingSafeCompare("abcdef", "abc"), false);
});

test("timingSafeCompare compares null/undefined by identity, never as a match", () => {
  assert.equal(timingSafeCompare(null, null), true);
  assert.equal(timingSafeCompare(undefined, undefined), true);
  assert.equal(timingSafeCompare(null, undefined), false);
  assert.equal(timingSafeCompare(null, "abc"), false);
  assert.equal(timingSafeCompare("abc", undefined), false);
  assert.equal(timingSafeCompare(undefined, ""), false);
});

test("timingSafeCompare is byte-exact, not unicode-normalizing", () => {
  // "é" precomposed vs decomposed — different bytes, must not match.
  assert.equal(timingSafeCompare("é", "é"), false);
});

function sourceOf(relPath: string): string {
  return readFileSync(fileURLToPath(new URL(`../../${relPath}`, import.meta.url)), "utf8");
}

test("the OIDC callback validates `state` with the constant-time helper", () => {
  const source = sourceOf("src/app/api/auth/oidc/callback/route.ts");
  assert.ok(
    source.includes("timingSafeCompare"),
    "oidc/callback must compare the state cookie in constant time (GHSA-7434-6q4c-33fh)"
  );
  assert.ok(
    !/storedState\s*!==\s*returnedState/.test(source),
    "the short-circuiting `!==` state comparison is back"
  );
});

test("the internal admission bypass compares its bearer in constant time", () => {
  const source = sourceOf("src/shared/middleware/chatAdmissionIdentity.ts");
  assert.ok(
    source.includes("timingSafeCompare"),
    "isInternalAdmissionBypass gates a bypass on a shared secret — compare it in constant time"
  );
});
