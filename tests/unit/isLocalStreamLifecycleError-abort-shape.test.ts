import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isLocalStreamLifecycleError } from "../../src/shared/utils/circuitBreaker.ts";

describe("isLocalStreamLifecycleError — AbortError shape discrimination", () => {
  // Case 1: bare abort() with no reason → AbortError → should return TRUE
  // (This is the current buggy behavior — internal timeouts produce AbortError
  // which is indistinguishable from a real client disconnect.)
  it("returns TRUE for bare AbortController.abort() with no reason", () => {
    const controller = new AbortController();
    controller.abort(); // no reason → DOMException { name: "AbortError" }
    // Simulate what Node does: the signal's reason is a DOMException
    const reason = controller.signal.reason;
    assert.equal(isLocalStreamLifecycleError(reason), true);
  });

  // Case 2: abort(reason) where reason.name = "TimeoutError" → should return FALSE
  // (This is the fixed pattern from base.ts — internal timeouts should NOT be
  // treated as client disconnects.)
  it("returns FALSE for abort(reason) with name 'TimeoutError'", () => {
    const controller = new AbortController();
    const err = new Error("Fetch timeout after 120000ms on https://example.com");
    err.name = "TimeoutError";
    controller.abort(err);
    assert.equal(isLocalStreamLifecycleError(controller.signal.reason), false);
  });

  // Case 3: abort(reason) where reason.name = "BodyTimeoutError" → should return FALSE
  it("returns FALSE for abort(reason) with name 'BodyTimeoutError'", () => {
    const controller = new AbortController();
    const err = new Error("Body Timeout Error");
    err.name = "BodyTimeoutError";
    controller.abort(err);
    assert.equal(isLocalStreamLifecycleError(controller.signal.reason), false);
  });

  // Case 4: message "controller is already closed" → should return TRUE (existing)
  it("returns TRUE for message 'controller is already closed'", () => {
    const err = new Error("controller is already closed");
    assert.equal(isLocalStreamLifecycleError(err), true);
  });

  // Case 5: message "request_signal_aborted" → should return TRUE (existing)
  it("returns TRUE for message 'request_signal_aborted'", () => {
    const err = new Error("request_signal_aborted");
    assert.equal(isLocalStreamLifecycleError(err), true);
  });

  // Case 6: message "client disconnected" → should return TRUE (existing)
  it("returns TRUE for message 'client disconnected'", () => {
    const err = new Error("client disconnected");
    assert.equal(isLocalStreamLifecycleError(err), true);
  });
});
