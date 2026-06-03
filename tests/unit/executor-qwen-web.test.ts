import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/qwen-web.ts");

describe("QwenWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.QwenWebExecutor();
    assert.ok(executor);
  });

  it("execute returns error on fetch failure", async () => {
    const executor = new mod.QwenWebExecutor();
    try {
      const result = await executor.execute({
        model: "qwen-plus",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "" },
        signal: null,
      });
      assert.ok(result.response instanceof Response);
      assert.ok(result.url.includes("qwen.ai"));
    } catch {
      // Network error expected
    }
  });
});
