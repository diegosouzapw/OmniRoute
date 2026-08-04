import { test } from "node:test";
import assert from "node:assert/strict";

import { combineModalCredential } from "@/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers";

// #5446 — Modal auth requires TWO credentials (Token ID + Token Secret) joined
// as `Bearer <TOKEN_ID>:<TOKEN_SECRET>`. The add-connection form collects them in
// two fields and combines them into the single encrypted `apiKey` value; the
// generic bearer executor then emits `Bearer <apiKey>` unchanged.
test("combineModalCredential — joins id + secret with a colon", () => {
  assert.equal(combineModalCredential("ak-abc123", "as-def456"), "ak-abc123:as-def456");
});

test("combineModalCredential — trims surrounding whitespace on both fields", () => {
  assert.equal(combineModalCredential("  ak-abc  ", "  as-def  "), "ak-abc:as-def");
});

test("combineModalCredential — no secret returns the id verbatim (supports pasting a combined id:secret)", () => {
  assert.equal(combineModalCredential("ak-abc:as-def", ""), "ak-abc:as-def");
  assert.equal(combineModalCredential("ak-abc", "   "), "ak-abc");
});

test("combineModalCredential — id empty but secret present returns the secret", () => {
  assert.equal(combineModalCredential("", "as-def"), "as-def");
});

test("combineModalCredential — both empty returns empty string", () => {
  assert.equal(combineModalCredential("", ""), "");
  assert.equal(combineModalCredential("   ", "   "), "");
});
