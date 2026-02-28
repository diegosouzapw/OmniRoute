import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

// ═══════════════════════════════════════════════════════════════
//  IFlowExecutor Unit Tests
//  Tests for HMAC-SHA256 signature, headers, URL building
//  Fixes: https://github.com/diegosouzapw/OmniRoute/issues/114
// ═══════════════════════════════════════════════════════════════

const { IFlowExecutor } = await import("../../open-sse/executors/iflow.ts");

// ─── Constructor ──────────────────────────────────────────────

test("IFlowExecutor: constructor sets provider to 'iflow'", () => {
  const executor = new IFlowExecutor();
  assert.equal(executor.getProvider(), "iflow");
});

// ─── createIFlowSignature ─────────────────────────────────────

test("IFlowExecutor: createIFlowSignature returns valid HMAC-SHA256 hex", () => {
  const executor = new IFlowExecutor();
  const userAgent = "iFlow-Cli";
  const sessionID = "session-test-123";
  const timestamp = 1700000000000;
  const apiKey = "test-api-key-secret";

  const signature = executor.createIFlowSignature(userAgent, sessionID, timestamp, apiKey);

  // Verify it's a valid hex string (64 chars for SHA256)
  assert.match(signature, /^[0-9a-f]{64}$/);

  // Verify reproducibility — same inputs produce same signature
  const signature2 = executor.createIFlowSignature(userAgent, sessionID, timestamp, apiKey);
  assert.equal(signature, signature2);

  // Verify against manual HMAC computation
  const payload = `${userAgent}:${sessionID}:${timestamp}`;
  const expected = crypto.createHmac("sha256", apiKey).update(payload).digest("hex");
  assert.equal(signature, expected);
});

test("IFlowExecutor: createIFlowSignature returns empty string when apiKey is empty", () => {
  const executor = new IFlowExecutor();
  const result = executor.createIFlowSignature("agent", "session", 123, "");
  assert.equal(result, "");
});

test("IFlowExecutor: createIFlowSignature returns empty string when apiKey is null", () => {
  const executor = new IFlowExecutor();
  const result = executor.createIFlowSignature("agent", "session", 123, null);
  assert.equal(result, "");
});

// ─── buildHeaders ─────────────────────────────────────────────

test("IFlowExecutor: buildHeaders includes iflow-specific headers", () => {
  const executor = new IFlowExecutor();
  const credentials = { apiKey: "test-key-123" };

  const headers = executor.buildHeaders(credentials, true);

  // Must include required iflow headers
  assert.ok(headers["session-id"], "Missing session-id header");
  assert.ok(headers["x-iflow-timestamp"], "Missing x-iflow-timestamp header");
  assert.ok(headers["x-iflow-signature"], "Missing x-iflow-signature header");

  // session-id format
  assert.ok(
    headers["session-id"].startsWith("session-"),
    "session-id should start with 'session-'"
  );

  // timestamp is a number string
  assert.match(headers["x-iflow-timestamp"], /^\d+$/);

  // signature is hex
  assert.match(headers["x-iflow-signature"], /^[0-9a-f]{64}$/);

  // Authorization
  assert.equal(headers["Authorization"], "Bearer test-key-123");

  // Content-Type
  assert.equal(headers["Content-Type"], "application/json");

  // Streaming Accept
  assert.equal(headers["Accept"], "text/event-stream");
});

test("IFlowExecutor: buildHeaders omits Accept header when stream is false", () => {
  const executor = new IFlowExecutor();
  const credentials = { apiKey: "test-key" };

  const headers = executor.buildHeaders(credentials, false);

  assert.equal(headers["Accept"], undefined);
});

test("IFlowExecutor: buildHeaders uses accessToken when apiKey is missing", () => {
  const executor = new IFlowExecutor();
  const credentials = { accessToken: "oauth-token-123" };

  const headers = executor.buildHeaders(credentials);

  assert.equal(headers["Authorization"], "Bearer oauth-token-123");
  // Signature should still be generated using the accessToken
  assert.ok(headers["x-iflow-signature"].length > 0);
});

test("IFlowExecutor: buildHeaders generates unique session IDs per call", () => {
  const executor = new IFlowExecutor();
  const credentials = { apiKey: "key" };

  const headers1 = executor.buildHeaders(credentials);
  const headers2 = executor.buildHeaders(credentials);

  assert.notEqual(headers1["session-id"], headers2["session-id"]);
});

// ─── buildUrl ─────────────────────────────────────────────────

test("IFlowExecutor: buildUrl returns config baseUrl", () => {
  const executor = new IFlowExecutor();
  const url = executor.buildUrl("qwen3-coder-plus", true);

  assert.equal(url, "https://apis.iflow.cn/v1/chat/completions");
});

// ─── transformRequest ─────────────────────────────────────────

test("IFlowExecutor: transformRequest passes body through unchanged", () => {
  const executor = new IFlowExecutor();
  const body = {
    model: "deepseek-r1",
    messages: [{ role: "user", content: "Hello" }],
    stream: true,
  };

  const result = executor.transformRequest("deepseek-r1", body, true, {});
  assert.deepEqual(result, body);
});

// ─── Integration: executor registry ───────────────────────────

test("IFlowExecutor: getExecutor('iflow') returns IFlowExecutor instance", async () => {
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const executor = getExecutor("iflow");
  assert.ok(executor instanceof IFlowExecutor, "Should return IFlowExecutor instance");
});
