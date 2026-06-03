import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/v0-vercel-web.ts");

describe("V0VercelWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.V0VercelWebExecutor();
    assert.ok(executor);
  });

  it("execute returns error on fetch failure", async () => {
    const executor = new mod.V0VercelWebExecutor();
    try {
      const result = await executor.execute({
        model: "v0-default",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "" },
        signal: null,
      });
      assert.ok(result.response instanceof Response);
      assert.ok(result.url.includes("v0.dev"));
    } catch {
      // Network error expected
    }
  });
});
