import test from "node:test";
import assert from "node:assert/strict";
import { isCallbackStateAcceptable } from "../../src/shared/components/oauthCallbackState.ts";

test("a relayed callback must echo the active attempt's state (GHSA-3fxv-j4h8-9mgg)", () => {
  assert.equal(isCallbackStateAcceptable("abc", "abc"), true);
  assert.equal(isCallbackStateAcceptable("abc", "other"), false);
  assert.equal(isCallbackStateAcceptable("abc", null), false);
  assert.equal(isCallbackStateAcceptable("abc", undefined), false);
  assert.equal(isCallbackStateAcceptable("abc", ""), false);
});

test("an attempt without a state has nothing to bind to", () => {
  assert.equal(isCallbackStateAcceptable(null, null), true);
  assert.equal(isCallbackStateAcceptable(undefined, "x"), true);
  assert.equal(isCallbackStateAcceptable("", null), true);
});
