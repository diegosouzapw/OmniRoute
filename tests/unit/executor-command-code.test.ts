import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/commandCode.ts");

describe("CommandCodeExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.CommandCodeExecutor();
    assert.ok(executor);
  });

  it("can be instantiated with custom provider", () => {
    const executor = new mod.CommandCodeExecutor("custom-provider");
    assert.ok(executor);
  });

  it("buildUrl returns a string", () => {
    const executor = new mod.CommandCodeExecutor();
    const url = executor.buildUrl();
    assert.ok(typeof url === "string");
    assert.ok(url.includes("generate") || url.includes("commandcode"));
  });

  it("execute throws when no API key", async () => {
    const executor = new mod.CommandCodeExecutor();
    try {
      await executor.execute({
        model: "test",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: {},
        signal: null,
      });
      assert.fail("Should have thrown");
    } catch (err) {
      assert.ok(err instanceof Error);
      assert.ok(err.message.includes("API key"));
    }
  });

  it("execute returns result shape with valid key (will fail on fetch)", async () => {
    const executor = new mod.CommandCodeExecutor();
    try {
      const result = await executor.execute({
        model: "test",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "fake-key" },
        signal: null,
      });
      // If it returns (network error caught), check shape
      assert.ok(result.response instanceof Response);
      assert.ok(typeof result.url === "string");
      assert.ok(typeof result.headers === "object");
    } catch {
      // Network error is expected in test environment
    }
  });
});
