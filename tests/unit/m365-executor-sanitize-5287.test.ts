import test from "node:test";
import assert from "node:assert/strict";
import {
  CopilotM365WebExecutor,
  __setWebSocketImplForTests,
} from "../../open-sse/executors/copilot-m365-web.ts";

// A fake `ws` instance that emits an `error` carrying a stack-trace-laden message right after
// construction. This drives the executor's wsChat ReadableStream error path and proves the
// Rule #12 sanitization (#5287): the raw error/stack must never reach the SSE
// `data: {error:{message}}` frame.
class FakeWebSocket {
  handlers: Record<string, (arg?: unknown) => void> = {};
  constructor(_url: string, _opts?: unknown) {
    queueMicrotask(() => {
      const err = new Error(
        "ECONNREFUSED 10.0.0.5:443\n    at TLSSocket.onError (/home/app/open-sse/executors/copilot-m365-web.ts:167:14)"
      );
      this.handlers["error"]?.(err);
    });
  }
  on(event: string, cb: (arg?: unknown) => void) {
    this.handlers[event] = cb;
    return this;
  }
  send() {}
  close() {}
}

test("#5287 wsChat sanitizes a ws error before emitting it into the SSE stream (Rule #12)", async () => {
  __setWebSocketImplForTests(FakeWebSocket as never);
  try {
    const executor = new CopilotM365WebExecutor();
    const result = await executor.execute({
      body: { messages: [{ role: "user", content: "hello" }] },
      model: "copilot-m365",
      stream: true,
      credentials: { apiKey: "opaque-token", providerSpecificData: { chathubPath: "u@t" } },
    } as never);

    const text = await result.response.text();

    // An SSE error frame is emitted...
    assert.ok(text.includes('"error"'), `expected an SSE error frame, got: ${text}`);
    // ...but the raw stack path must be stripped by sanitizeErrorMessage (Rule #12).
    assert.ok(!text.includes("/home/app/"), `raw stack path leaked into SSE: ${text}`);
    assert.ok(
      !/\bat\s+\S+\s+\(\/.+\.ts:\d+/.test(text),
      `raw stack frame leaked into SSE: ${text}`
    );
  } finally {
    __setWebSocketImplForTests(null);
  }
});
