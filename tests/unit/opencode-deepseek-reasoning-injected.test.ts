import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");

/**
 * Regression test for upstream decolua/9router#1099 (issue #1543):
 *
 * OpenCode is a meta-provider that proxies multi-turn chats to thinking-mode
 * upstreams (DeepSeek V4 Flash, Kimi, MiniMax, ...). Those upstreams require
 * `reasoning_content` to be echoed back on every assistant message in the
 * conversation history; otherwise they return:
 *
 *     400 Bad Request — reasoning_content must be passed back
 *
 * Standard OpenAI clients do not preserve `reasoning_content` across turns, so
 * OpencodeExecutor.transformRequest must inject a non-empty placeholder on any
 * assistant message that lacks it when routing to a thinking-mode model.
 */
describe("OpencodeExecutor — DeepSeek reasoning_content injection (#1099)", () => {
  const executor = new OpencodeExecutor("opencode-zen");

  function buildBody(extraAssistant: Record<string, unknown>) {
    return {
      model: "oc/deepseek-v4-flash-free",
      stream: true,
      messages: [
        { role: "user", content: "hi" },
        { role: "assistant", content: "previous answer", ...extraAssistant },
        { role: "user", content: "follow up" },
      ],
    };
  }

  it("injects reasoning_content on an assistant message that lacks it (deepseek model)", () => {
    const out = executor.transformRequest(
      "oc/deepseek-v4-flash-free",
      buildBody({}),
      true,
      { apiKey: "test" } as never
    );
    const assistant = out.messages.find((m: { role: string }) => m.role === "assistant");
    assert.equal(typeof assistant.reasoning_content, "string");
    assert.ok(
      assistant.reasoning_content.length > 0,
      "expected non-empty reasoning_content placeholder injected"
    );
  });

  it("preserves an existing non-empty reasoning_content instead of overwriting", () => {
    const original = "prior chain of thought";
    const out = executor.transformRequest(
      "oc/deepseek-v4-flash-free",
      buildBody({ reasoning_content: original }),
      true,
      { apiKey: "test" } as never
    );
    const assistant = out.messages.find((m: { role: string }) => m.role === "assistant");
    assert.equal(assistant.reasoning_content, original);
  });

  it("injects for kimi-family models routed through opencode", () => {
    const body = {
      model: "oc/kimi-k2-thinking",
      stream: false,
      messages: [
        { role: "user", content: "hi" },
        { role: "assistant", content: "answer" },
      ],
    };
    const out = executor.transformRequest("oc/kimi-k2-thinking", body, false, {
      apiKey: "test",
    } as never);
    const assistant = out.messages.find((m: { role: string }) => m.role === "assistant");
    assert.equal(typeof assistant.reasoning_content, "string");
    assert.ok(assistant.reasoning_content.length > 0);
  });

  it("does not inject for non-thinking opencode models (no false positives)", () => {
    const body = {
      model: "oc/gpt-5",
      stream: false,
      messages: [
        { role: "user", content: "hi" },
        { role: "assistant", content: "answer" },
      ],
    };
    const out = executor.transformRequest("oc/gpt-5", body, false, {
      apiKey: "test",
    } as never);
    const assistant = out.messages.find((m: { role: string }) => m.role === "assistant");
    assert.equal(assistant.reasoning_content, undefined);
  });
});
