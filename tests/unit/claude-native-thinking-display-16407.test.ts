import test from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";

class NativeClaudeExecutor extends BaseExecutor {
  constructor(provider = "claude") {
    super(provider, { baseUrls: ["https://api.anthropic.com/v1/messages"] });
  }
  needsRefresh() {
    return false;
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    return structuredClone(body);
  }
}

async function capture(
  thinking: Record<string, unknown> | undefined,
  summarizeThinking?: boolean,
  extra: Record<string, unknown> = {},
  clientHeaders: Record<string, string> = {},
  provider = "claude"
) {
  const originalFetch = globalThis.fetch;
  let sent: Record<string, unknown> | undefined;
  globalThis.fetch = async (_url, init) => {
    sent = JSON.parse(String(init?.body));
    return Response.json({ content: [{ type: "text", text: "ok" }] });
  };
  try {
    await new NativeClaudeExecutor(provider).execute({
      // Manual budgets remain supported on 4.6; Sonnet 5 only accepts adaptive thinking.
      model: thinking?.type === "enabled" ? "claude-sonnet-4-6" : "claude-sonnet-5",
      body: { messages: [{ role: "user", content: "hello" }], thinking, ...extra },
      stream: false,
      credentials: {
        accessToken: "sk-ant-oat-test-display-16407",
        providerSpecificData: { requestDefaults: { summarizeThinking } },
      },
      clientHeaders,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.ok(sent, "the final upstream payload was captured");
  return sent;
}

for (const thinking of [{ type: "adaptive" }, { type: "enabled", budget_tokens: 2048 }]) {
  test(`native Claude honors summary opt-in for ${thinking.type}`, async () => {
    const sent = await capture(thinking, true);
    assert.deepEqual(sent.thinking, { ...thinking, display: "summarized" });
  });
}

for (const preference of [undefined, false]) {
  test(`native Claude preserves absent display when summary preference is ${preference}`, async () => {
    const sent = await capture({ type: "adaptive" }, preference);
    assert.deepEqual(sent.thinking, { type: "adaptive" });
  });
}

for (const display of ["omitted", "updates"]) {
  test(`an explicit ${display} display wins over the connection default`, async () => {
    const thinking = { type: "adaptive", display };
    assert.deepEqual((await capture(thinking, true)).thinking, thinking);
  });
}

for (const type of ["disabled", "between_tools"]) {
  test(`${type} never receives an unsupported display field`, async () => {
    const sent = await capture({ type }, true);
    assert.deepEqual(sent.thinking, { type });
    assert.equal(sent.context_management, undefined);
  });
}

test("the opt-in does not enable thinking on a generic client", async () => {
  assert.equal((await capture(undefined, true)).thinking, undefined);
});

test("an explicit off header still removes thinking", async () => {
  const sent = await capture({ type: "adaptive" }, true, {}, { "x-omniroute-thinking": "off" });
  assert.equal(sent.thinking, undefined);
});

test("forced tool use still removes thinking", async () => {
  const sent = await capture({ type: "adaptive" }, true, {
    tools: [{ name: "lookup", description: "Lookup", input_schema: { type: "object" } }],
    tool_choice: { type: "tool", name: "lookup" },
  });
  assert.equal(sent.thinking, undefined);
});

test("another provider does not acquire the native display default", async () => {
  const sent = await capture({ type: "adaptive" }, true, {}, {}, "openai");
  assert.deepEqual(sent.thinking, { type: "adaptive" });
});

test("active thinking retains its existing context-management pairing without the opt-in", async () => {
  const sent = await capture({ type: "adaptive" }, false);
  assert.deepEqual(sent.context_management, {
    edits: [{ type: "clear_thinking_20251015", keep: "all" }],
  });
});

test("explicit context-management policy survives the summary opt-in", async () => {
  const contextManagement = { edits: [{ type: "clear_thinking_20251015", keep: 2 }] };
  const sent = await capture({ type: "adaptive" }, true, {
    context_management: contextManagement,
  });
  assert.deepEqual(sent.context_management, contextManagement);
  assert.deepEqual(sent.thinking, { type: "adaptive", display: "summarized" });
});
