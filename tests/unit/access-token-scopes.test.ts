import test from "node:test";
import assert from "node:assert/strict";
import {
  ACCESS_SCOPES,
  isAccessScope,
  scopeSatisfies,
  normalizeScope,
} from "../../src/lib/accessTokens/scopes.ts";

test("ACCESS_SCOPES are exactly read/write/admin", () => {
  assert.deepEqual([...ACCESS_SCOPES], ["read", "write", "admin"]);
});

test("isAccessScope accepts valid scopes and rejects anything else", () => {
  assert.equal(isAccessScope("read"), true);
  assert.equal(isAccessScope("write"), true);
  assert.equal(isAccessScope("admin"), true);
  assert.equal(isAccessScope("superuser"), false);
  assert.equal(isAccessScope(""), false);
  assert.equal(isAccessScope(null), false);
  assert.equal(isAccessScope(undefined), false);
  assert.equal(isAccessScope(3), false);
});

test("scopeSatisfies enforces the admin ⊃ write ⊃ read hierarchy", () => {
  // admin satisfies everything
  assert.equal(scopeSatisfies("admin", "read"), true);
  assert.equal(scopeSatisfies("admin", "write"), true);
  assert.equal(scopeSatisfies("admin", "admin"), true);
  // write satisfies read+write, not admin
  assert.equal(scopeSatisfies("write", "read"), true);
  assert.equal(scopeSatisfies("write", "write"), true);
  assert.equal(scopeSatisfies("write", "admin"), false);
  // read satisfies only read
  assert.equal(scopeSatisfies("read", "read"), true);
  assert.equal(scopeSatisfies("read", "write"), false);
  assert.equal(scopeSatisfies("read", "admin"), false);
});

test("scopeSatisfies returns false for invalid `have` scopes (fail closed)", () => {
  assert.equal(scopeSatisfies("bogus", "read"), false);
  assert.equal(scopeSatisfies(null, "read"), false);
  assert.equal(scopeSatisfies(undefined, "read"), false);
  assert.equal(scopeSatisfies("", "read"), false);
});

test("normalizeScope falls back to read by default for invalid input", () => {
  assert.equal(normalizeScope("write"), "write");
  assert.equal(normalizeScope("admin"), "admin");
  assert.equal(normalizeScope("bogus"), "read");
  assert.equal(normalizeScope(undefined), "read");
  assert.equal(normalizeScope(null), "read");
});

test("normalizeScope honors a custom fallback", () => {
  assert.equal(normalizeScope("bogus", "write"), "write");
  assert.equal(normalizeScope(undefined, "admin"), "admin");
});
