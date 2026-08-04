/**
 * Claude native OAuth — `thinking` must not be injected when tool_choice forces a tool.
 *
 * The Claude Code wire-image emulation in base.ts injects `thinking:{type:"adaptive"}`
 * for non-Haiku Claude models. Anthropic rejects `thinking` (enabled/adaptive) when
 * `tool_choice` forces a specific tool (`{type:"any"|"tool"}`) with:
 *   400 "Thinking may not be enabled when tool_choice forces tool use."
 * So Opus/Sonnet calls that force a tool (e.g. Claude Code's `message_user`) 400'd.
 *
 * Fix: treat forced tool_choice as an implicit `thinking: off` — strip thinking only
 * when forced, preserve the adaptive injection otherwise.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";

// Minimal claude executor: passthrough transformRequest, no refresh — exercises
// exactly base.ts's claude-OAuth wire-image path (same harness as #4307).
class ClaudeLikeExecutor extends BaseExecutor {
  constructor() {
    super("claude", { baseUrls: ["https://api.anthropic.com/v1/messages"] });
  }
  needsRefresh() {
    return false;
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    return { ...body };
  }
}

const TOOLS = [
  { name: "message_user", description: "Send a message", input_schema: { type: "object" } },
];

async function captureUpstreamBody(
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const executor = new ClaudeLikeExecutor();
  const originalFetch = globalThis.fetch;
  let upstreamBody: Record<string, unknown> | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    upstreamBody = JSON.parse(String(init.body));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  try {
    await executor.execute({
      model: "claude-opus-4-8",
      body,
      stream: false,
      // OAuth token (sk-ant-oat…) with NO apiKey => wire-image path fires.
      credentials: { accessToken: "sk-ant-oat-test-thinkguard" },
      // #5480: the default adaptive-thinking injection is gated behind a real Claude Code
      // client (`x-app: cli` / `claude-code` UA). A bare OAuth token (generic OpenAI-compat
      // client) must opt in via x-omniroute-thinking and no longer gets force-injected, so
      // these tests now identify as a Claude Code client to exercise the adaptive path.
      clientHeaders: { "x-app": "cli" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.ok(upstreamBody, "fetch must have been called");
  return upstreamBody!;
}

test("forced tool_choice strips injected thinking (avoids Anthropic 400)", async () => {
  const upstream = await captureUpstreamBody({
    messages: [{ role: "user", content: "hi" }],
    tools: TOOLS,
    tool_choice: { type: "tool", name: "message_user" },
  });
  assert.equal(
    upstream.thinking,
    undefined,
    "thinking must NOT be present when tool_choice forces a tool"
  );
});

test("non-forced call still injects adaptive thinking (behavior preserved)", async () => {
  const upstream = await captureUpstreamBody({
    messages: [{ role: "user", content: "hi" }],
    tools: TOOLS,
    // no tool_choice → not forced → adaptive thinking still injected
  });
  assert.deepEqual(
    upstream.thinking,
    { type: "adaptive" },
    "adaptive thinking must still be injected when tool_choice does not force a tool"
  );
});
