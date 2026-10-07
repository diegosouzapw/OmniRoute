import assert from "node:assert/strict";
import test from "node:test";
import { shortCallId } from "../../../src/shared/utils/formatting.ts";

// Regression guard: naive id.slice(0, 8) truncation showed as little as 3
// significant characters for ids with decorative prefixes (call-, call_call-,
// etc.), making tool-call/tool-result ids visually indistinguishable in the
// conversation context view. shortCallId finds the actual guid/hex entropy
// and truncates that instead, git-log-short-hash style.

test("extracts a git-log-style short id from a real UUID-shaped call id", () => {
  assert.equal(shortCallId("call-bf7c895d-ae74-421c-890b-6f47eab77508"), "bf7c895");
});

test("extracts the first uuid segment from a composite/doubled-prefix id", () => {
  assert.equal(
    shortCallId("call_call-c5602375-cb46-40e8-867a-4b6ac50f6d2d_fc_cal_f08ecb5ec5"),
    "c560237"
  );
});

test("falls back to a leading hex run when there is no full uuid", () => {
  assert.equal(shortCallId("toolu_01a2b3c4d5e6f7089900"), "01a2b3c");
});

test("falls back to a plain slice when the id has no recognizable hex/uuid segment", () => {
  assert.equal(shortCallId("call_1"), "call_1");
});

test("respects a custom length", () => {
  assert.equal(shortCallId("call-bf7c895d-ae74-421c-890b-6f47eab77508", 4), "bf7c");
});

test("returns an empty string for missing input", () => {
  assert.equal(shortCallId(null), "");
  assert.equal(shortCallId(undefined), "");
  assert.equal(shortCallId(""), "");
});
