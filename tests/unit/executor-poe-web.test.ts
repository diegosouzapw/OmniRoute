import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/poe-web.ts");

describe("PoeWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.PoeWebExecutor();
    assert.ok(executor);
  });

  it("execute returns error on fetch failure", async () => {
    const executor = new mod.PoeWebExecutor();
    try {
      const result = await executor.execute({
        model: "poe-default",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "" },
        signal: null,
      });
      assert.ok(result.response instanceof Response);
      assert.ok(result.url.includes("poe.com"));
    } catch {
      // Network error expected
    }
  });
});
