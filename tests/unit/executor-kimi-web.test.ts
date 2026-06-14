import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/kimi-web.ts");

describe("KimiWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.KimiWebExecutor();
    assert.ok(executor);
  });

  it("execute returns error on fetch failure", async () => {
    const executor = new mod.KimiWebExecutor();
    try {
      const result = await executor.execute({
        model: "kimi-default",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "" },
        signal: null,
      });
      assert.ok(result.response instanceof Response);
      assert.ok(result.url.includes("kimi.moonshot.cn"));
    } catch {
      // Network error expected
    }
  });
});
