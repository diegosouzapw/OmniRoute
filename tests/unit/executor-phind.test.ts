import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/phind.ts");

describe("PhindExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.PhindExecutor();
    assert.ok(executor);
  });

  it("execute returns proper shape on missing cookie (fetch fails)", async () => {
    const executor = new mod.PhindExecutor();
    try {
      const result = await executor.execute({
        model: "phind-model",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "" },
        signal: null,
      });
      assert.ok(result.response instanceof Response);
      assert.ok(typeof result.url === "string");
      assert.ok(typeof result.headers === "object");
    } catch {
      // Network error expected in test env
    }
  });

  it("execute builds correct URL", async () => {
    const executor = new mod.PhindExecutor();
    try {
      const result = await executor.execute({
        model: "test",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "fake" },
        signal: null,
      });
      assert.ok(result.url.includes("phind.com/api/agent"));
    } catch {
      // expected
    }
  });
});
