import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyCursorError,
  classifyCursorErrorKind,
  isCursorBenignCancelError,
  isCursorRequestTooLargeDetail,
  resolveCursorEmptyTurnError,
  CURSOR_EMPTY_TURN_MESSAGE,
} from "../../../open-sse/executors/cursor/cursorErrors.ts";

test("classifyCursorErrorKind: resource_exhausted without size cue is rate_limit", () => {
  assert.equal(classifyCursorErrorKind("resource_exhausted: quota exhausted"), "rate_limit");
  assert.equal(classifyCursorErrorKind("You're out of usage. Increase limits"), "rate_limit");
});

test("classifyCursorErrorKind: resource_exhausted + size cue is invalid", () => {
  assert.equal(classifyCursorErrorKind("resource_exhausted: tool catalog too large"), "invalid");
  assert.equal(isCursorRequestTooLargeDetail("tool catalog too large"), true);
  assert.equal(
    isCursorRequestTooLargeDetail("resource_exhausted while loading tool catalog: quota exhausted"),
    false
  );
});

test("classifyCursorErrorKind: auth cues", () => {
  assert.equal(classifyCursorErrorKind("Authentication error"), "auth");
  assert.equal(classifyCursorErrorKind("unauthenticated"), "auth");
});

test("classifyCursorErrorKind: AI Model Not Found is rate_limit (Cursor out-of-usage)", () => {
  assert.equal(
    classifyCursorErrorKind("not_found: AI Model Not Found (reset after 109h 9s)"),
    "rate_limit"
  );
  assert.equal(classifyCursorErrorKind("not_found: AI Model Not Found"), "rate_limit");
  assert.equal(classifyCursorErrorKind("model not found"), "invalid");
});

test("classifyCursorError redacts credentials and paths", () => {
  const out = classifyCursorError(
    "Authentication failed authorization=secret-token path=/Users/alice/code/file"
  );
  assert.equal(out.kind, "auth");
  assert.equal(out.status, 401);
  assert.match(out.message, /\[REDACTED\]/);
  assert.match(out.message, /\[REDACTED_PATH\]/);
  assert.doesNotMatch(out.message, /secret-token/);
  assert.doesNotMatch(out.message, /\/Users\/alice/);
});

test("isCursorBenignCancelError recognizes NGHTTP2_CANCEL / suspend", () => {
  assert.equal(isCursorBenignCancelError({ code: "NGHTTP2_CANCEL" }), true);
  assert.equal(isCursorBenignCancelError(new Error("nghttp2_cancel")), true);
  assert.equal(isCursorBenignCancelError(new Error("Cursor stream suspended")), true);
  assert.equal(isCursorBenignCancelError(new Error("resource_exhausted")), false);
});

test("resolveCursorEmptyTurnError: no upstream → actionable 502", () => {
  const out = resolveCursorEmptyTurnError({});
  assert.equal(out.status, 502);
  assert.equal(out.message, CURSOR_EMPTY_TURN_MESSAGE);
});

test("resolveCursorEmptyTurnError: quotaExhaustedHint → 429", () => {
  const out = resolveCursorEmptyTurnError({ quotaExhaustedHint: true });
  assert.equal(out.status, 429);
  assert.equal(out.type, "rate_limit_error");
  assert.equal(out.message, CURSOR_EMPTY_TURN_MESSAGE);
});

test("resolveCursorEmptyTurnError: classifies upstream quota message as 429", () => {
  const out = resolveCursorEmptyTurnError({
    upstreamMessage: "resource_exhausted: too many requests",
  });
  assert.equal(out.status, 429);
  assert.equal(out.kind, "rate_limit");
});
