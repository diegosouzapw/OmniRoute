// Regression for #14629: the reactive 400-recovery chain in
// BaseExecutor.execute() (open-sse/executors/base.ts) was unreachable from
// CommandCodeExecutor because it overrides execute() without calling
// super.execute(). This wires the shared reasoning-effort clamp-and-retry
// helper (open-sse/executors/base/reasoningEffortRecovery.ts) directly into
// CommandCodeExecutor.execute() so an upstream 400 naming the accepted
// reasoning_effort enum is clamped and retried instead of surfaced forever.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { __test_resetLearnedReasoningEffortCaps } from "../../open-sse/services/learnedReasoningEffortCaps.ts";

const mod = await import("../../open-sse/executors/commandCode.ts");

describe("issue #14629 — commandCode reaches the reactive 400-recovery chain", () => {
  it("clamps reasoning_effort and retries once instead of surfacing the raw 400 forever", async () => {
    __test_resetLearnedReasoningEffortCaps();
    const originalFetch = globalThis.fetch;
    let fetchCallCount = 0;
    const seenBodies: string[] = [];

    globalThis.fetch = (async (_url, init) => {
      fetchCallCount++;
      seenBodies.push(String(init?.body ?? ""));
      if (fetchCallCount === 1) {
        return new Response(
          JSON.stringify({
            error: {
              message: 'Invalid option: expected one of "low", "medium", "high", "xhigh", "max"',
              param: "reasoning_effort",
            },
          }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({
          id: "chatcmpl-1",
          object: "chat.completion",
          created: 0,
          model: "command-code/meituan/LongCat-2.0",
          choices: [
            { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }) as typeof fetch;

    try {
      const executor = new mod.CommandCodeExecutor();
      const result = await executor.execute({
        model: "command-code/meituan/LongCat-2.0",
        body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "none" },
        stream: false,
        credentials: { apiKey: "fake-key" },
        signal: null,
      });

      assert.equal(fetchCallCount, 2, "expected a reactive retry after the 400 clamp");
      assert.equal(result.response.status, 200, "the retried request must surface the 200");
      const retriedBody = JSON.parse(seenBodies[1]);
      assert.equal(
        retriedBody.reasoning_effort,
        "low",
        "reasoning_effort must be clamped to the nearest accepted value >= the original demand"
      );
    } finally {
      globalThis.fetch = originalFetch;
      __test_resetLearnedReasoningEffortCaps();
    }
  });

  it("still surfaces a raw 400 unmodified when the error text names no recognized enum", async () => {
    __test_resetLearnedReasoningEffortCaps();
    const originalFetch = globalThis.fetch;
    let fetchCallCount = 0;

    globalThis.fetch = (async () => {
      fetchCallCount++;
      return new Response(JSON.stringify({ error: { message: "internal server error" } }), {
        status: 400,
      });
    }) as typeof fetch;

    try {
      const executor = new mod.CommandCodeExecutor();
      const result = await executor.execute({
        model: "command-code/meituan/LongCat-2.0",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "fake-key" },
        signal: null,
      });

      assert.equal(fetchCallCount, 1, "no recognized enum in the body means no retry");
      assert.equal(result.response.status, 400);
    } finally {
      globalThis.fetch = originalFetch;
      __test_resetLearnedReasoningEffortCaps();
    }
  });
});
