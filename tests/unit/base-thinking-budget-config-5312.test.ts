/**
 * TDD regression for #5312 (FIX B / RC-B): base.ts force-injects adaptive thinking
 * for the native Claude OAuth wire-image path WITHOUT consulting the operator's
 * Thinking-Budget config, so the dashboard mode is ignored for Claude Code traffic.
 *
 * Expected behavior:
 *  - mode=auto (strip): the default adaptive injection is suppressed.
 *  - default/passthrough (no operator config): adaptive is still injected so the
 *    native Claude Code behavior is UNCHANGED (#4633 must not regress).
 *  - mode=custom/adaptive producing thinking.type="enabled": remapped to
 *    type="adaptive" + output_config.effort, because Opus 4.7/4.8 reject "enabled".
 *
 * Harness mirrors tests/unit/claude-thinking-tool-choice-guard.test.ts.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import {
  setThinkingBudgetConfig,
  getThinkingBudgetConfig,
  DEFAULT_THINKING_CONFIG,
} from "../../open-sse/services/thinkingBudget.ts";

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
      credentials: { accessToken: "sk-ant-oat-test-5312" },
      // #5480: the default adaptive-thinking injection (and the native-Claude-Code wire
      // image these #5312 cases exercise) is gated behind a real Claude Code client
      // (`x-app: cli` / `claude-code` UA). A bare OAuth token from a generic OpenAI-compat
      // client must opt in via x-omniroute-thinking, so identify as a Claude Code client here.
      clientHeaders: { "x-app": "cli" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.ok(upstreamBody, "fetch must have been called");
  return upstreamBody!;
}

test.afterEach(() => {
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("#5312 RC-B: default/passthrough config still injects adaptive thinking (#4633 preserved)", async () => {
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
  assert.equal(getThinkingBudgetConfig().mode, "passthrough");
  const upstream = await captureUpstreamBody({
    messages: [{ role: "user", content: "hi" }],
  });
  assert.deepEqual(
    upstream.thinking,
    { type: "adaptive" },
    "adaptive thinking must still be injected for native Claude Code by default"
  );
  assert.deepEqual(upstream.output_config, { effort: "high" });
});

test("#5312 RC-B: mode=auto suppresses the forced adaptive injection (strip honored)", async () => {
  setThinkingBudgetConfig({ mode: "auto" });
  const upstream = await captureUpstreamBody({
    messages: [{ role: "user", content: "hi" }],
  });
  assert.equal(
    upstream.thinking,
    undefined,
    "operator chose auto (strip) — thinking must NOT be force-injected"
  );
  assert.equal(upstream.output_config, undefined, "no effort hint should be injected in auto mode");
});

test("#5312 RC-B: custom-budget enabled block is remapped to adaptive (Opus 4.8 rejects enabled)", async () => {
  setThinkingBudgetConfig({ mode: "custom", customBudget: 8192 });
  // Simulate what applyThinkingBudget produces upstream for a custom budget.
  const upstream = await captureUpstreamBody({
    messages: [{ role: "user", content: "hi" }],
    thinking: { type: "enabled", budget_tokens: 8192 },
  });
  assert.deepEqual(
    upstream.thinking,
    { type: "adaptive" },
    "type=enabled must be remapped to adaptive for the Claude OAuth path"
  );
  assert.deepEqual(
    upstream.output_config,
    { effort: "medium" },
    "8192 budget maps to medium effort"
  );
});
