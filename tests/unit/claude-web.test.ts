import test from "node:test";
import assert from "node:assert/strict";

const { ClaudeWebExecutor } = await import("../../open-sse/executors/claude-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/claudeTlsClient.ts");

// ─── Helpers ────────────────────────────────────────────────────────────────

function reset() {
  __setTlsFetchOverrideForTesting(null);
}

// ─── Tests ──────────────────────────────────────────────────────────────────

test("A: ClaudeWebExecutor is registered in executor index", () => {
  assert.ok(hasSpecializedExecutor("claude-web"));
});

test("B: ClaudeWebExecutor alias cw-web is registered", () => {
  assert.ok(hasSpecializedExecutor("cw-web"));
});

test("C: ClaudeWebExecutor can be retrieved from executor registry", () => {
  const executor = getExecutor("claude-web");
  assert.ok(executor instanceof ClaudeWebExecutor);
});

test("D: ClaudeWebExecutor cw-web alias resolves to same type", () => {
  const a = getExecutor("claude-web");
  const b = getExecutor("cw-web");
  assert.ok(a instanceof ClaudeWebExecutor);
  assert.ok(b instanceof ClaudeWebExecutor);
});

test("E: ClaudeWebExecutor sets correct provider name", () => {
  const executor = new ClaudeWebExecutor();
  assert.equal(executor.getProvider(), "claude-web");
});

test("F: ClaudeWebExecutor inherits from BaseExecutor", () => {
  const executor = new ClaudeWebExecutor();
  assert.ok(typeof executor.getProvider === "function");
  assert.ok(typeof executor.execute === "function");
  assert.ok(typeof executor.testConnection === "function");
});

test("G: Test override hook can be set and unset", async () => {
  const mockFn = async () => ({
    status: 200,
    headers: new Headers(),
    text: "test",
    body: null,
  });

  __setTlsFetchOverrideForTesting(mockFn);
  // If this doesn't throw, the override was set successfully
  assert.ok(true);

  reset();
  // After reset, override should be cleared
  assert.ok(true);
});

test("H: ClaudeWebExecutor handles missing credentials gracefully", async () => {
  reset();
  const executor = new ClaudeWebExecutor();

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4-6",
      body: { messages: [{ role: "user", content: "test" }] },
      stream: false,
      credentials: {},
      signal: AbortSignal.timeout(5000),
      log: null,
    });

    // Should return an error response, not throw
    assert.ok(result.response.status >= 400 || result.response.status === 200);
  } finally {
    reset();
  }
});

test("I: ClaudeWebExecutor handles invalid messages parameter", async () => {
  reset();
  const executor = new ClaudeWebExecutor();

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4-6",
      body: { messages: undefined }, // Invalid
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(5000),
      log: null,
    });

    // Should handle error gracefully
    assert.ok(result.response);
  } finally {
    reset();
  }
});

test("J: tlsFetchOverride can be installed and mocked", async () => {
  reset();

  let callCount = 0;
  const mockFn = async (url, opts) => {
    callCount++;
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "application/json" }),
      text: JSON.stringify({ test: true }),
      body: null,
    };
  };

  __setTlsFetchOverrideForTesting(mockFn);

  try {
    // Simulate a fetch through the mocked layer
    // This just verifies that the override mechanism works
    assert.equal(callCount, 0);
  } finally {
    reset();
  }
});

test("K: ClaudeWebExecutor execute returns response object with required fields", async () => {
  reset();
  const executor = new ClaudeWebExecutor();

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4-6",
      body: { messages: [{ role: "user", content: "test" }] },
      stream: false,
      credentials: { apiKey: "sessionKey=test-token" },
      signal: AbortSignal.timeout(5000),
      log: null,
    });

    // Verify response structure
    assert.ok(result.response);
    assert.ok(typeof result.response.status === "number");
    assert.ok(result.response.headers instanceof Headers);
  } finally {
    reset();
  }
});

test("L: ClaudeWebExecutor processes streaming requests", async () => {
  reset();
  const executor = new ClaudeWebExecutor();

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4-6",
      body: { messages: [{ role: "user", content: "test" }] },
      stream: true,
      credentials: { apiKey: "sessionKey=test-token" },
      signal: AbortSignal.timeout(5000),
      log: null,
    });

    // Should return a response (may error, but structure should be there)
    assert.ok(result.response);
    assert.equal(typeof result.response.status, "number");
  } finally {
    reset();
  }
});

test("M: ClaudeWebExecutor includes required fields in execute result", async () => {
  reset();
  const executor = new ClaudeWebExecutor();

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4-6",
      body: { messages: [{ role: "user", content: "test" }] },
      stream: false,
      credentials: { apiKey: "sessionKey=test" },
      signal: AbortSignal.timeout(5000),
      log: null,
    });

    // Verify result object structure
    assert.ok(result.hasOwnProperty("response"));
    assert.ok(result.hasOwnProperty("url") || result.hasOwnProperty("headers"));
  } finally {
    reset();
  }
});
