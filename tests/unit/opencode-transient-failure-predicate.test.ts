import { describe, it } from "node:test";
import assert from "node:assert";
import { isRetriableUpstreamFailure } from "../../open-sse/executors/opencodeTransientFailure.ts";

const EMPTY_400_BODY = JSON.stringify({
  id: "chatcmpl-abc123",
  choices: [{ message: {}, finish_reason: null }],
});
const REAL_400_BODY = JSON.stringify({ error: { message: "bad request" } });

describe("isRetriableUpstreamFailure", () => {
  it("matches 500/502/503/504 by status alone, no body needed", () => {
    assert.strictEqual(isRetriableUpstreamFailure(500), true);
    assert.strictEqual(isRetriableUpstreamFailure(502), true);
    assert.strictEqual(isRetriableUpstreamFailure(503), true);
    assert.strictEqual(isRetriableUpstreamFailure(504), true);
  });
  it("matches 500 even with a body present (status short-circuits first)", () => {
    assert.strictEqual(isRetriableUpstreamFailure(500, "Internal server error"), true);
  });
  it("matches empty 400 with body", () => {
    assert.strictEqual(isRetriableUpstreamFailure(400, EMPTY_400_BODY), true);
  });
  it("rejects real-error 400", () => {
    assert.strictEqual(isRetriableUpstreamFailure(400, REAL_400_BODY), false);
  });
  it("rejects 400 without body (absent = non-empty = no retry)", () => {
    assert.strictEqual(isRetriableUpstreamFailure(400), false);
    assert.strictEqual(isRetriableUpstreamFailure(400, ""), false);
  });
  it("rejects 403/429/200", () => {
    assert.strictEqual(isRetriableUpstreamFailure(403), false);
    assert.strictEqual(isRetriableUpstreamFailure(429), false);
    assert.strictEqual(isRetriableUpstreamFailure(200), false);
  });
});
