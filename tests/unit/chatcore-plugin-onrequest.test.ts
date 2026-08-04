// Characterization of runPluginOnRequestHook — the plugin onRequest gate extracted from
// handleChatCore's request entry (chatCore god-file decomposition, #3501). Hooks are in-memory.
// Locks: the discriminated result — blocked (403 Response) vs body-rewrite vs pass-through — and
// fail-open on a throwing hook.
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

const { registerHook, unregisterHook } = await import("../../src/lib/plugins/hooks.ts");
const { runPluginOnRequestHook } = await import(
  "../../open-sse/handlers/chatCore/pluginOnRequest.ts"
);

const PLUGIN = "test-onrequest-plugin";

afterEach(() => {
  unregisterHook("onRequest", PLUGIN);
});

function baseArgs(overrides: Record<string, unknown> = {}) {
  return {
    requestId: "req-1",
    body: { messages: [{ role: "user", content: "hi" }] },
    model: "gpt-x",
    provider: "openai",
    apiKeyInfo: null,
    ...overrides,
  } as Parameters<typeof runPluginOnRequestHook>[0];
}

test("no registered hooks → pass-through (blocked:false, no body)", async () => {
  const gate = await runPluginOnRequestHook(baseArgs());
  assert.equal(gate.blocked, false);
});

test("a blocking hook → blocked:true with a 403 JSON Response", async () => {
  registerHook("onRequest", PLUGIN, async () => ({
    blocked: true,
    response: { error: "nope" },
  }));
  const gate = await runPluginOnRequestHook(baseArgs());
  assert.equal(gate.blocked, true);
  if (!gate.blocked) return;
  assert.equal(gate.response.status, 403);
  const payload = await gate.response.json();
  assert.deepEqual(payload, { error: "nope" });
});

test("a blocking hook without a response → generic plugin_block 403", async () => {
  registerHook("onRequest", PLUGIN, async () => ({ blocked: true }));
  const gate = await runPluginOnRequestHook(baseArgs());
  assert.equal(gate.blocked, true);
  if (!gate.blocked) return;
  assert.equal(gate.response.status, 403);
  const payload = (await gate.response.json()) as { error?: { type?: string } };
  assert.equal(payload.error?.type, "plugin_block");
});

test("a body-rewriting hook → blocked:false with the new body", async () => {
  const rewritten = { messages: [{ role: "user", content: "rewritten" }] };
  registerHook("onRequest", PLUGIN, async () => ({ body: rewritten }));
  const gate = await runPluginOnRequestHook(baseArgs());
  assert.equal(gate.blocked, false);
  if (gate.blocked) return;
  assert.deepEqual(gate.body, rewritten);
});

test("a throwing hook → fail-open pass-through (blocked:false)", async () => {
  registerHook("onRequest", PLUGIN, async () => {
    throw new Error("boom");
  });
  const gate = await runPluginOnRequestHook(baseArgs());
  assert.equal(gate.blocked, false);
});
