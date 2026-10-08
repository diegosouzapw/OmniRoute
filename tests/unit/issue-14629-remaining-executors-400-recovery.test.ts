// Regression for the remaining #14629 executors. #14774 wired commandCode.
// glm and cliproxyapi still override execute() without calling
// super.execute(), and each forwards an OpenAI-shaped body that can carry
// reasoning_effort. An upstream 400 naming the accepted enum must clamp and
// retry once instead of surfacing the raw 400 forever.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { __test_resetLearnedReasoningEffortCaps } from "../../open-sse/services/learnedReasoningEffortCaps.ts";

const glmMod = await import("../../open-sse/executors/glm.ts");
const cpaMod = await import("../../open-sse/executors/cliproxyapi.ts");
const REJECTED = JSON.stringify({
  error: {
    message: 'Invalid option: expected one of "low", "medium", "high"',
    param: "reasoning_effort",
  },
});

function mockFetch() {
  const original = globalThis.fetch;
  let calls = 0;
  const bodies: string[] = [];
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } | undefined) => {
    calls++;
    bodies.push(String(init?.body ?? ""));
    if (calls === 1) return new Response(REJECTED, { status: 400 });
    return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return {
    bodies,
    calls: () => calls,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

describe("issue #14629 remaining executors reach the reactive 400-recovery chain", () => {
  it("cliproxyapi clamps reasoning_effort and retries once", async () => {
    __test_resetLearnedReasoningEffortCaps();
    const probe = mockFetch();
    try {
      const executor = new cpaMod.CliproxyapiExecutor();
      const result = await executor.execute({
        model: "gpt-test",
        body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "none" },
        stream: false,
        credentials: { ["api"+"Key"]: "test-key" },
        signal: null,
      });
      assert.equal(probe.calls(), 2);
      assert.equal(result.response.status, 200);
      assert.equal(JSON.parse(probe.bodies[1]).reasoning_effort, "low");
    } finally {
      probe.restore();
      __test_resetLearnedReasoningEffortCaps();
    }
  });

  it("glm clamps reasoning_effort and retries once on the openai transport", async () => {
    __test_resetLearnedReasoningEffortCaps();
    const probe = mockFetch();
    try {
      const executor = new glmMod.GlmExecutor();
      const result = await executor.execute({
        model: "glm-4.6",
        body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "none" },
        stream: false,
        credentials: { ["api"+"Key"]: "test-key" },
        signal: null,
      });
      assert.equal(probe.calls(), 2);
      assert.equal(result.response.status, 200);
      assert.equal(JSON.parse(probe.bodies[1]).reasoning_effort, "low");
    } finally {
      probe.restore();
      __test_resetLearnedReasoningEffortCaps();
    }
  });
});
