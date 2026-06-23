// Characterization of runPluginOnResponseHook — the plugin onResponse hook extracted from
// handleChatCore's streaming finalization (chatCore god-file decomposition, #3501). Hooks are
// in-memory (no DB). Locks: a registered onResponse hook receives the request context + status-200
// response, and the helper is fire-and-forget / fail-open (no registered hooks → no-op).
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
    })
  );
});

test("registered onResponse hook receives the request context and status-200 response", async () => {
  let captured: Record<string, unknown> | undefined;
  registerHook("onResponse", "test-onresponse-plugin", async (ctx: Record<string, unknown>) => {
    captured = ctx;
    return {};
  });

  await runPluginOnResponseHook({
    requestId: "req-42",
    body: { messages: [{ role: "user", content: "hi" }] },
    model: "gpt-4o",
    provider: "openai",
    apiKeyInfo: { id: "key-1" },
  });

  await waitFor(() => captured !== undefined);
  assert.ok(captured, "expected the onResponse hook to be invoked");
  assert.equal(captured!.requestId, "req-42");
  assert.equal(captured!.model, "gpt-4o");
  assert.equal(captured!.provider, "openai");
  assert.deepEqual(captured!.response, { status: 200 });
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
    })
  );
  await new Promise((r) => setTimeout(r, 30));
});
