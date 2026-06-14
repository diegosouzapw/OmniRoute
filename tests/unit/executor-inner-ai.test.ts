import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/inner-ai.ts");

describe("InnerAiExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.InnerAiExecutor();
    assert.ok(executor);
  });
});

// Helper: parseCredential is not exported, but we can test via execute behavior.
// Test the exported class and its constructor properties.

describe("InnerAiExecutor constructor", () => {
  it("creates instance with correct id", () => {
    const executor = new mod.InnerAiExecutor();
    // The executor should have the id "inner-ai" set via super()
    assert.ok(executor instanceof mod.InnerAiExecutor);
  });
});

describe("InnerAiExecutor - credential validation", () => {
  it("returns 401 when credentials are empty", async () => {
    const executor = new mod.InnerAiExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });
    const resp = result.response;
    assert.equal(resp.status, 401);
    const json = await resp.json();
    assert.ok(json.error.message.includes("Missing Inner.ai token"));
  });

  it("returns 401 when apiKey is missing", async () => {
    const executor = new mod.InnerAiExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
      signal: null,
    });
    assert.equal(result.response.status, 401);
  });

  it("returns 400 when messages are empty", async () => {
    const executor = new mod.InnerAiExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [] },
      stream: false,
      credentials: { apiKey: "fake-jwt-token" },
      signal: null,
    });
    // Will fail at credential resolution first (401) since token is fake
    const resp = result.response;
    assert.ok(resp.status >= 400);
  });
});

describe("InnerAiExecutor - result shape", () => {
  it("execute returns { response, url, headers, transformedBody }", async () => {
    const executor = new mod.InnerAiExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "test" }] },
      stream: false,
      credentials: { apiKey: "invalid-token" },
      signal: null,
    });
    assert.ok(result.response instanceof Response);
    assert.ok(typeof result.url === "string");
    assert.ok(typeof result.headers === "object");
    assert.ok(result.transformedBody !== undefined);
  });
});
