import test from "node:test";
import assert from "node:assert/strict";

const { isClientDisconnectError } = await import("../../open-sse/utils/streamHandler.ts");

test("client disconnect: AbortError is a client disconnect, not a provider failure", () => {
  const err = new Error("aborted");
  err.name = "AbortError";
  assert.equal(isClientDisconnectError(err), true);
});

test("client disconnect: ResponseAborted is a client disconnect", () => {
  const err = new Error("The response was aborted");
  err.name = "ResponseAborted";
  assert.equal(isClientDisconnectError(err), true);
});

test("client disconnect: 'Controller is already closed' TypeError is a client disconnect", () => {
  // Thrown when OmniRoute enqueues into a response stream the client already closed.
  // name is "TypeError", so this must be matched by message, not name.
  const err = new TypeError("Invalid state: Controller is already closed");
  assert.equal(isClientDisconnectError(err), true);
});

test("client disconnect: a real provider 502/500 is NOT a client disconnect", () => {
  const err = Object.assign(new Error("Upstream stream failed"), { statusCode: 502 });
  assert.equal(isClientDisconnectError(err), false);
});

test("client disconnect: a rate-limit (429) error is NOT a client disconnect", () => {
  const err = Object.assign(new Error("rate_limit_error"), { statusCode: 429 });
  assert.equal(isClientDisconnectError(err), false);
});

test("client disconnect: null / string / plain object are NOT client disconnects", () => {
  assert.equal(isClientDisconnectError(null), false);
  assert.equal(isClientDisconnectError(undefined), false);
  assert.equal(isClientDisconnectError("Controller is already closed"), false);
  assert.equal(isClientDisconnectError({}), false);
});
