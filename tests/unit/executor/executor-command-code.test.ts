import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../../open-sse/executors/commandCode.ts");

describe("CommandCodeExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.CommandCodeExecutor();
    assert.ok(executor);
  });

  it("can be instantiated with custom provider", () => {
    const executor = new mod.CommandCodeExecutor("custom-provider");
    assert.ok(executor);
  });

  it("buildUrl targets the documented /provider/v1/chat/completions endpoint (#10265)", () => {
    const executor = new mod.CommandCodeExecutor();
    const url = executor.buildUrl();
    assert.ok(typeof url === "string");
    assert.ok(
      url.includes("/provider/v1/chat/completions"),
      `expected the documented provider API endpoint, got: ${url}`
    );
    assert.ok(url.includes("commandcode"));
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

  it("posts a flat OpenAI chat.completions body (no CLI envelope) to /provider/v1/chat/completions (#10265)", async () => {
    const calls: Array<{ url: string; init: RequestInit; body: unknown }> = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({
        url: String(url),
        init: init || {},
        body: JSON.parse(String((init as RequestInit | undefined)?.body)),
      });
      return new Response("", { status: 200 });
    }) as typeof fetch;

    const executor = new mod.CommandCodeExecutor();
    const body = {
      model: "gpt-5.4",
      messages: [
        { role: "user", content: "hi" },
        {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "lookup", arguments: '{"q":"docs"}' },
            },
            // Missing arguments entirely stays missing — passthrough, no CLI
            // envelope injection of a synthetic `arguments` field.
            { id: "call_2", type: "function", function: { name: "search" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "r1" },
        { role: "tool", tool_call_id: "call_2", content: "r2" },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "lookup",
            description: "lookup",
            parameters: { type: "object", properties: { q: { type: "string" } } },
          },
        },
      ],
    };

    try {
      await executor.execute({
        model: "gpt-5.4",
        body,
        stream: false,
        credentials: { apiKey: "fake-key" },
        signal: null,
      });
    } finally {
      globalThis.fetch = originalFetch;
    }

    assert.equal(calls.length, 1, "exactly one upstream call");
    assert.ok(
      calls[0].url.includes("/provider/v1/chat/completions"),
      `expected documented provider endpoint, got: ${calls[0].url}`
    );
    const sent = calls[0].body as Record<string, unknown>;
    // No CLI envelope.
    assert.equal(sent.config, undefined, "CLI envelope `config` must not be sent");
    assert.equal(sent.params, undefined, "CLI envelope `params` wrapper must not be sent");
    assert.equal(sent.model, "gpt-5.4", "flat OpenAI model at top level");
    assert.equal((sent.messages as Array<{ role: string }>)[0].role, "user");
    // Assistant tool_calls pass through unchanged (no CLI tool-call/tool-result parts).
    const assistant = (sent.messages as Array<Record<string, unknown>>).find(
      (m) => m.role === "assistant"
    );
    assert.ok(assistant, "assistant turn present");
    const toolCalls = assistant?.tool_calls as Array<{
      id: string;
      function: { name: string; arguments?: string };
    }>;
    assert.equal(toolCalls.length, 2, "both tool calls pass through untouched");
    assert.equal(toolCalls[0].function.name, "lookup");
    assert.equal(toolCalls[0].function.arguments, '{"q":"docs"}');
    assert.equal(toolCalls[1].function.arguments, undefined, "missing arguments stays missing (no injection)");
    // Tool role message (OpenAI flat) preserved.
    const toolMsg = (sent.messages as Array<Record<string, unknown>>).find(
      (m) => m.role === "tool"
    );
    assert.equal(toolMsg?.tool_call_id, "call_1");
    assert.equal(
      (sent.tools as Array<{ function: { name: string } }>)[0].function.name,
      "lookup",
      "tool definitions pass through in OpenAI shape (no rename)"
    );
  });

  it("passes through the upstream OpenAI response and drops CLI-impersonation headers (#10265)", async () => {
    const calls: Array<{ url: string; init: RequestInit }> = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), init: init || {} });
      const chunk =
        'data: {"id":"c1","object":"chat.completion.chunk","model":"gpt-5.4",' +
        '"choices":[{"index":0,"delta":{"content":"hi"}}]}\n\n' +
        'data: {"id":"c1","object":"chat.completion.chunk","model":"gpt-5.4",' +
        '"choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":' +
        '{"prompt_tokens":2,"completion_tokens":1,"total_tokens":3}}\n\n' +
        "data: [DONE]\n\n";
      return new Response(chunk, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }) as typeof fetch;

    const executor = new mod.CommandCodeExecutor();
    let result: { response: Response; headers: Record<string, string> } | null = null;
    try {
      result = await executor.execute({
        model: "gpt-5.4",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: { apiKey: "fake-key" },
        signal: null,
      });
    } finally {
      globalThis.fetch = originalFetch;
    }

    assert.ok(result, "execute returned a result");
    const headers = result.headers;
    assert.equal(headers["x-command-code-version"], undefined, "CLI-impersonation header dropped");
    assert.equal(headers["x-cli-environment"], undefined, "CLI-impersonation header dropped");
    assert.equal(headers.Authorization, "Bearer fake-key");

    // The upstream OpenAI SSE passes through untouched (no CLI re-parsing).
    const text = await result.response.text();
    assert.ok(text.includes("chat.completion.chunk"), "OpenAI-format SSE passed through");
    assert.ok(text.includes('"content":"hi"'), "delta content preserved");
    assert.ok(text.includes("[DONE]"), "stream terminator preserved");
    assert.ok(text.includes('"prompt_tokens":2'), "OpenAI usage block passed through");
  });
});