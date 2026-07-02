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

  // PR #5592: after a conversation is created, the executor GETs
  // /chat/api/v2/conversations/{id} to obtain the root parent message id.
  // When that GET fails or returns malformed data, fetchInitialParentMessageId
  // returns null and the executor must surface a 502 instead of proceeding with
  // an undefined parent id. This defensive path was previously untested.
  it("returns 502 when the initial parent message id cannot be fetched", async () => {
    const realFetch = globalThis.fetch;
    globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      const method = (init?.method || "GET").toUpperCase();
      if (method === "POST") {
        // Step 1: conversation creation succeeds.
        return new Response(JSON.stringify({ conversationId: "conv-test-123" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      // Step 2: the parent-message GET fails -> fetchInitialParentMessageId -> null.
      return new Response("", { status: 500 });
    }) as typeof globalThis.fetch;

    try {
      const executor = new mod.HuggingChatExecutor();
      const result = await executor.execute({
        model: "meta-llama/Llama-4-Scout-17B-16E-Instruct",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "hf-chat=fake-cookie" },
        signal: null,
      });
      assert.equal(result.response.status, 502);
      const json = await result.response.json();
      assert.ok(
        json.error.message.includes("initial parent message id"),
        `expected the parent-message 502 message, got: ${json.error.message}`
      );
      // Rule #12 sanity: the error body carries a static message, never a stack frame.
      assert.ok(!json.error.message.includes("at /"));
    } finally {
      globalThis.fetch = realFetch;
    }
  });
});
