// Characterization of runPluginOnResponseHook — the plugin onResponse hook extracted from
// handleChatCore's streaming finalization (chatCore god-file decomposition, #3501). Hooks are
// in-memory (no DB). Locks: a registered onResponse hook receives the request context plus the
// real response payload (status + data or streamed flag), and the helper is fire-and-forget /
// fail-open (no registered hooks → no-op). #8711: must not hardcode { status: 200 } only.
import { test, after } from "node:test";
import assert from "node:assert/strict";

const { registerHook, unregisterHook } = await import("../../src/lib/plugins/hooks.ts");
const { runPluginOnResponseHook } = await import(
  "../../open-sse/handlers/chatCore/pluginOnResponse.ts"
);

async function waitFor(pred: () => boolean, timeoutMs = 2000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) {
    await new Promise((r) => setTimeout(r, 10));
  }
}

after(() => {
  unregisterHook("onResponse", "test-onresponse-plugin");
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
