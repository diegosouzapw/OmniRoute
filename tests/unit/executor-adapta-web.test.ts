import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/adapta-web.ts");

describe("AdaptaWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.AdaptaWebExecutor();
    assert.ok(executor);
  });

  it("returns 401 when credentials are missing", async () => {
    const executor = new mod.AdaptaWebExecutor();
    const result = await executor.execute({
      model: "adapta-one",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
      signal: null,
    });
    assert.equal(result.response.status, 401);
    const json = await result.response.json();
    assert.ok(json.error.message.includes("Missing Adapta credentials"));
  });

  it("returns 401 when apiKey is empty", async () => {
    const executor = new mod.AdaptaWebExecutor();
    const result = await executor.execute({
      model: "adapta-one",
      body: { messages: [{ role: "user", content: "test" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });
    assert.equal(result.response.status, 401);
  });

  it("execute returns proper result shape on auth failure", async () => {
    const executor = new mod.AdaptaWebExecutor();
    const result = await executor.execute({
      model: "adapta-one",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "invalid-jwt" },
      signal: null,
    });
    assert.ok(result.response instanceof Response);
    assert.ok(typeof result.url === "string");
    assert.ok(typeof result.headers === "object");
    assert.ok(result.transformedBody !== undefined);
  });

  it("testConnection returns false for invalid credentials", async () => {
    const executor = new mod.AdaptaWebExecutor();
    const connected = await executor.testConnection({ apiKey: "" });
    assert.equal(connected, false);
  });
});
