// tests/unit/chatcore-stream-error-result.test.ts
// Characterization of isSemaphoreCapacityError / createStreamingErrorResult /
// getUpstreamErrorIdentifier — streaming error-result helpers extracted from handleChatCore
// (chatCore god-file decomposition, #3501). Locks the semaphore code matching, the SSE error
// envelope shape (status, headers, `data: {...}\n\ndata: [DONE]\n\n` body, optional code/type), and
// the string-code extraction.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isSemaphoreCapacityError,
  createStreamingErrorResult,
  getUpstreamErrorIdentifier,
} from "../../open-sse/handlers/chatCore/streamErrorResult.ts";

test("isSemaphoreCapacityError matches the two semaphore codes only", () => {
  assert.equal(isSemaphoreCapacityError({ code: "SEMAPHORE_TIMEOUT" }), true);
  assert.equal(isSemaphoreCapacityError({ code: "SEMAPHORE_QUEUE_FULL" }), true);
  assert.equal(isSemaphoreCapacityError({ code: "OTHER" }), false);
  assert.equal(isSemaphoreCapacityError(null), false);
  assert.equal(isSemaphoreCapacityError("SEMAPHORE_TIMEOUT"), false);
});

test("createStreamingErrorResult builds an SSE error envelope with [DONE] terminator", async () => {
  const result = createStreamingErrorResult(503, "boom");
  assert.equal(result.success, false);
  assert.equal(result.status, 503);
  assert.equal(result.error, "boom");
  assert.equal(result.response.status, 503);
  assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
  assert.equal(result.response.headers.get("X-Accel-Buffering"), "no");
  const body = await result.response.text();
  assert.ok(body.startsWith("data: "));
  assert.ok(body.endsWith("data: [DONE]\n\n"));
  const json = JSON.parse(body.slice("data: ".length, body.indexOf("\n\n")));
  assert.equal(json.error.message, "boom");
});

test("createStreamingErrorResult attaches optional code and type", async () => {
  const result = createStreamingErrorResult(429, "slow down", "rate_limited", "rate_limit_error");
  const body = await result.response.text();
  const json = JSON.parse(body.slice("data: ".length, body.indexOf("\n\n")));
  assert.equal(json.error.code, "rate_limited");
  assert.equal(json.error.type, "rate_limit_error");
});

test("getUpstreamErrorIdentifier returns a non-empty string code or undefined", () => {
  assert.equal(getUpstreamErrorIdentifier({ code: "ECONNRESET" }), "ECONNRESET");
  assert.equal(getUpstreamErrorIdentifier({ code: "" }), undefined);
  assert.equal(getUpstreamErrorIdentifier({ code: 123 }), undefined);
  assert.equal(getUpstreamErrorIdentifier(null), undefined);
  assert.equal(getUpstreamErrorIdentifier("ECONNRESET"), undefined);
});
