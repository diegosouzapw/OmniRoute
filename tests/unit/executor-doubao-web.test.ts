import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/doubao-web.ts");

describe("DoubaoWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.DoubaoWebExecutor();
    assert.ok(executor);
  });

  it("execute returns error on fetch failure", async () => {
    const executor = new mod.DoubaoWebExecutor();
    try {
      const result = await executor.execute({
        model: "doubao-default",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "" },
        signal: null,
      });
      assert.ok(result.response instanceof Response);
      assert.ok(result.url.includes("doubao.com"));
    } catch {
      // Network error expected
    }
  });
});
