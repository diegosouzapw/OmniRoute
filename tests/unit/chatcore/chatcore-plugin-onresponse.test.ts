// Characterization of runPluginOnResponseHook — the plugin onResponse hook extracted from
// handleChatCore's streaming finalization (chatCore god-file decomposition, #3501). Hooks are
// in-memory (no DB). Locks: a registered onResponse hook receives the request context plus the
// real response payload (status + data or streamed flag), and the helper is fire-and-forget /
// fail-open (no registered hooks → no-op). #8711: must not hardcode { status: 200 } only.
import { test, after } from "node:test";
import assert from "node:assert/strict";

const { registerHook, unregisterHook } = await import("../../../src/lib/plugins/hooks.ts");const { runPluginOnResponseHook, runPluginOnStreamCompleteHook } = await import("../../../open-sse/handlers/chatCore/pluginOnResponse.ts");

async function waitFor(pred: () => boolean, timeoutMs = 2000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) {
    await new Promise((r) => setTimeout(r, 10));
  }
}

after(() => {
  unregisterHook("onResponse", "test-onresponse-plugin");
  unregisterHook("onStreamComplete", "test-onstreamcomplete-plugin");
});

test("no registered hooks → resolves without throwing (no-op)", async () => {
  await assert.doesNotReject(
    runPluginOnResponseHook({
      requestId: "req-noop",
      body: { messages: [] },
      model: "gpt-x",
      provider: "openai",
      apiKeyInfo: null,
      response: { status: 200, data: { choices: [] } },
    })
  );
});

test("registered onResponse hook receives the request context and response payload (#8711)", async () => {
  let captured: Record<string, unknown> | undefined;
  registerHook("onResponse", "test-onresponse-plugin", async (ctx: Record<string, unknown>) => {
    captured = ctx;
    return {};
  });

  const responseBody = {
    id: "chatcmpl-test",
    choices: [{ message: { role: "assistant", content: "hello" } }],
  };

  await runPluginOnResponseHook({
    requestId: "req-42",
    body: { messages: [{ role: "user", content: "hi" }] },
    model: "gpt-4o",
    provider: "openai",
    apiKeyInfo: { id: "key-1" },
    response: { status: 200, data: responseBody },
  });

  await waitFor(() => captured !== undefined);
  assert.ok(captured, "expected the onResponse hook to be invoked");
  assert.equal(captured!.requestId, "req-42");
  assert.equal(captured!.model, "gpt-4o");
  assert.equal(captured!.provider, "openai");
  assert.deepEqual(captured!.response, { status: 200, data: responseBody });
});

test("streaming success path passes streamed flag without materialized body", async () => {
  let captured: Record<string, unknown> | undefined;
  registerHook("onResponse", "test-onresponse-plugin", async (ctx: Record<string, unknown>) => {
    captured = ctx;
    return {};
  });

  await runPluginOnResponseHook({
    requestId: "req-stream",
    body: { messages: [{ role: "user", content: "hi" }], stream: true },
    model: "gpt-4o",
    provider: "openai",
    apiKeyInfo: null,
    response: { status: 200, streamed: true },
  });

  await waitFor(() => captured !== undefined);
  assert.deepEqual(captured!.response, { status: 200, streamed: true });
  assert.equal((captured!.response as { data?: unknown }).data, undefined);
});

test("headers passed to the hook are visible in PluginContext", async () => {
  let captured: Record<string, unknown> | undefined;
  registerHook("onResponse", "test-ctx-headers", async (ctx: Record<string, unknown>) => {
    captured = ctx;
    return {};
  });

  const testHeaders = { "x-trace-id": "abc-123", "x-session-id": "sess-789" };
  await runPluginOnResponseHook({
    requestId: "req-headers",
    body: { messages: [{ role: "user", content: "hi" }] },
    model: "gpt-4o",
    provider: "openai",
    apiKeyInfo: null,
    headers: testHeaders,
    response: { status: 200, data: { ok: true } },
  });

  await waitFor(() => captured !== undefined);
  assert.ok(captured, "expected the onResponse hook to be invoked");
  assert.deepEqual(captured!.headers, testHeaders);
});

test("no headers arg → backward compatible (undefined in ctx)", async () => {
  let captured: Record<string, unknown> | undefined;
  registerHook("onResponse", "test-ctx-noheaders", async (ctx: Record<string, unknown>) => {
    captured = ctx;
    return {};
  });

  await runPluginOnResponseHook({
    requestId: "req-noheaders",
    body: { messages: [{ role: "user", content: "hi" }] },
    model: "gpt-4o",
    provider: "openai",
    apiKeyInfo: null,
    response: { status: 200, data: { ok: true } },
  });

  await waitFor(() => captured !== undefined);
  assert.equal(captured!.headers, undefined);
});

test("a throwing hook never rejects the caller (fail-open)", async () => {
  registerHook("onResponse", "test-onresponse-plugin", async () => {
    throw new Error("boom");
  });
  await assert.doesNotReject(
    runPluginOnResponseHook({
      requestId: "req-throw",
      body: {},
      model: "m",
      provider: "p",
      apiKeyInfo: null,
      response: { status: 200, data: { ok: true } },
    })
  );
  await new Promise((r) => setTimeout(r, 30));
});

// ── onStreamComplete hook tests (#9571) ──

test("onStreamComplete: no registered hooks resolves without throwing (no-op)", async () => {
  const start = Date.now();
  await assert.doesNotReject(
    runPluginOnStreamCompleteHook({
      status: 200,
      usage: { prompt_tokens: 10, completion_tokens: 20 },
      ttft: 150,
      model: "gpt-4",
      provider: "openai",
      errorCode: undefined,
      startTime: start - 500,
    })
  );
});

test("onStreamComplete: registered hook receives usage + timing payload", async () => {
  let captured: Record<string, unknown> | undefined;
  registerHook(
    "onStreamComplete",
    "test-onstreamcomplete-plugin",
    async (payload: Record<string, unknown>) => {
      captured = payload;
    }
  );

  const startTime = Date.now() - 500;
  await runPluginOnStreamCompleteHook({
    status: 200,
    usage: { prompt_tokens: 42, completion_tokens: 100, reasoning_tokens: 5 },
    ttft: 200,
    model: "claude-3-opus",
    provider: "anthropic",
    errorCode: undefined,
    startTime,
  });

  await waitFor(() => captured !== undefined);
  assert.ok(captured, "expected onStreamComplete hook to be invoked");

  // payload shape: status, usage, timing, model, provider
  assert.equal(captured!.status, 200);
  assert.ok(captured!.usage, "usage should be present");
  assert.equal((captured!.usage as Record<string, number>).prompt_tokens, 42);
  assert.equal((captured!.usage as Record<string, number>).completion_tokens, 100);
  assert.equal((captured!.usage as Record<string, number>).reasoning_tokens, 5);

  assert.ok(captured!.timing, "timing should be present");
  const timing = captured!.timing as Record<string, number>;
  assert.equal(timing.ttft, 200);
  assert.ok(timing.latencyMs > 450, "latencyMs should be near 500");

  assert.equal(captured!.model, "claude-3-opus");
  assert.equal(captured!.provider, "anthropic");
  assert.equal(captured!.errorCode, undefined);
});

test("onStreamComplete: payload includes cache token fields when present", async () => {
  let captured: Record<string, unknown> | undefined;
  registerHook(
    "onStreamComplete",
    "test-onstreamcomplete-plugin",
    async (payload: Record<string, unknown>) => {
      captured = payload;
    }
  );

  await runPluginOnStreamCompleteHook({
    status: 200,
    usage: {
      prompt_tokens: 50,
      completion_tokens: 30,
      cache_read_input_tokens: 20,
      cache_creation_input_tokens: 10,
    },
    ttft: 100,
    model: "gpt-4",
    provider: "openai",
    errorCode: undefined,
    startTime: Date.now(),
  });

  await waitFor(() => captured !== undefined);
  assert.ok(captured);
  const usage = captured!.usage as Record<string, number>;
  assert.equal(usage.cache_read_input_tokens, 20);
  assert.equal(usage.cache_creation_input_tokens, 10);
});

test("onStreamComplete: throwing hook never rejects the caller (fail-open)", async () => {
  registerHook("onStreamComplete", "test-onstreamcomplete-plugin", async () => {
    throw new Error("stream-complete-boom");
  });

  await assert.doesNotReject(
    runPluginOnStreamCompleteHook({
      status: 500,
      usage: undefined,
      ttft: undefined,
      model: "gpt-4",
      provider: "openai",
      errorCode: "upstream_error",
      startTime: Date.now(),
    })
  );
  await new Promise((r) => setTimeout(r, 30));
});

test("onStreamComplete: errorCode is passed through when provided", async () => {
  let captured: Record<string, unknown> | undefined;
  registerHook(
    "onStreamComplete",
    "test-onstreamcomplete-plugin",
    async (payload: Record<string, unknown>) => {
      captured = payload;
    }
  );

  await runPluginOnStreamCompleteHook({
    status: 502,
    usage: undefined,
    ttft: undefined,
    model: "grok-3",
    provider: "xai",
    errorCode: "upstream_timeout",
    startTime: Date.now(),
  });

  await waitFor(() => captured !== undefined);
  assert.ok(captured);
  assert.equal(captured!.status, 502);
  assert.equal(captured!.errorCode, "upstream_timeout");
  assert.equal(captured!.model, "grok-3");
  assert.equal(captured!.provider, "xai");
});
