import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/huggingchat.ts");

describe("HuggingChatExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.HuggingChatExecutor();
    assert.ok(executor);
  });

  it("returns 400 when messages are missing", async () => {
    const executor = new mod.HuggingChatExecutor();
    const result = await executor.execute({
      model: "meta-llama/Llama-3.3-70B-Instruct",
      body: {},
      stream: false,
      credentials: { apiKey: "hf-chat=fake-cookie" },
      signal: null,
    });
    assert.equal(result.response.status, 400);
    const json = await result.response.json();
    assert.ok(json.error.message.includes("Missing or empty messages"));
  });

  it("returns 400 when messages array is empty", async () => {
    const executor = new mod.HuggingChatExecutor();
    const result = await executor.execute({
      model: "test",
      body: { messages: [] },
      stream: false,
      credentials: { apiKey: "hf-chat=fake" },
      signal: null,
    });
    assert.equal(result.response.status, 400);
  });

  it("returns 401 when cookie is missing", async () => {
    const executor = new mod.HuggingChatExecutor();
    const result = await executor.execute({
      model: "test",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });
    assert.equal(result.response.status, 401);
    const json = await result.response.json();
    assert.ok(json.error.message.includes("session cookie"));
  });

  it("returns { response, url, headers, transformedBody } shape", async () => {
    const executor = new mod.HuggingChatExecutor();
    const result = await executor.execute({
      model: "test",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });
    assert.ok(result.response instanceof Response);
    assert.ok(typeof result.url === "string");
    assert.ok(typeof result.headers === "object");
  });
});
