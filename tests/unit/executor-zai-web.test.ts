import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/zai-web.ts");

describe("ZaiWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.ZaiWebExecutor();
    assert.ok(executor);
  });

  it("extracts the token cookie value from a full Cookie header", () => {
    assert.equal(mod.extractZaiToken("token=abc123; other=xyz"), "abc123");
    assert.equal(mod.extractZaiToken("Cookie: other=xyz; token=abc123"), "abc123");
  });

  it("accepts a bare JWT/token with no cookie name prefix", () => {
    // a bare token with no '=' and no ';' falls through to the raw string
    assert.equal(
      mod.extractZaiToken("eyJhbGciOiJIUzI1NiJ9.payload.sig"),
      "eyJhbGciOiJIUzI1NiJ9.payload.sig"
    );
    assert.equal(mod.extractZaiToken("plainsessiontoken"), "plainsessiontoken");
  });

  it("returns empty string when no cookie is provided", () => {
    assert.equal(mod.extractZaiToken(""), "");
  });

  it("parses the internal z.ai delta_content/phase SSE envelope", () => {
    const delta = mod.parseZaiFrame({
      type: "chat:completion",
      data: { delta_content: "Hello", phase: "answer", done: false },
    });
    assert.deepEqual(delta, { content: "Hello", reasoning: "", done: false });
  });

  it("routes thinking-phase content into the reasoning field", () => {
    const delta = mod.parseZaiFrame({
      type: "chat:completion",
      data: { delta_content: "pondering...", phase: "thinking", done: false },
    });
    assert.deepEqual(delta, { content: "", reasoning: "pondering...", done: false });
  });

  it("detects end-of-stream from the internal envelope", () => {
    const delta = mod.parseZaiFrame({
      type: "chat:completion",
      data: { phase: "done", done: true },
    });
    assert.equal(delta?.done, true);
  });

  it("parses an OpenAI-shaped pass-through frame", () => {
    const delta = mod.parseZaiFrame({
      choices: [{ delta: { content: "Hi there" }, finish_reason: null }],
    });
    assert.deepEqual(delta, { content: "Hi there", reasoning: "", done: false });
  });

  it("detects end-of-stream from an OpenAI-shaped finish_reason", () => {
    const delta = mod.parseZaiFrame({
      choices: [{ delta: {}, finish_reason: "stop" }],
    });
    assert.equal(delta?.done, true);
  });

  it("returns null for frames with no usable delta", () => {
    assert.equal(mod.parseZaiFrame(null), null);
    assert.equal(mod.parseZaiFrame({}), null);
    assert.equal(mod.parseZaiFrame({ data: { phase: "answer" } }), null);
  });

  it("folds non-string message content into JSON strings", () => {
    const folded = mod.foldMessages([
      { role: "user", content: "hi" },
      { role: "user", content: { foo: "bar" } },
    ]);
    assert.deepEqual(folded, [
      { role: "user", content: "hi" },
      { role: "user", content: '{"foo":"bar"}' },
    ]);
  });

  it("returns a credential error when no cookie is provided", async () => {
    const executor = new mod.ZaiWebExecutor();
    const result = await executor.execute({
      model: "glm-4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });

    assert.equal(result.response.status, 400);
    assert.equal(new URL(result.url).hostname, "chat.z.ai");
    const parsed = await result.response.json();
    assert.match(parsed.error.message, /Z\.ai session/);
  });

  it("sends the cookie + bearer token and builds the request body", async () => {
    const originalFetch = globalThis.fetch;
    let capturedUrl = "";
    let capturedInit: RequestInit | undefined;
    globalThis.fetch = (async (url: string, init?: RequestInit) => {
      capturedUrl = String(url);
      capturedInit = init;
      return new Response("data: [DONE]\n\n", {
        headers: { "Content-Type": "text/event-stream" },
      });
    }) as typeof fetch;

    try {
      const executor = new mod.ZaiWebExecutor();
      await executor.execute({
        model: "glm-4.6",
        body: { messages: [{ role: "user", content: "hello" }] },
        stream: false,
        credentials: { apiKey: "token=abc123; foo=bar" },
        signal: null,
      });

      assert.equal(capturedUrl, "https://chat.z.ai/api/chat/completions");
      const headers = capturedInit?.headers as Record<string, string>;
      assert.equal(headers.Cookie, "token=abc123; foo=bar");
      assert.equal(headers.Authorization, "Bearer abc123");

      const parsedBody = JSON.parse(String(capturedInit?.body));
      assert.equal(parsedBody.model, "glm-4.6");
      assert.equal(parsedBody.stream, true);
      assert.deepEqual(parsedBody.messages, [{ role: "user", content: "hello" }]);
      assert.equal(parsedBody.features.web_search, false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("aggregates streamed internal-envelope deltas into a non-streaming completion", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(
        [
          `data: ${JSON.stringify({ type: "chat:completion", data: { delta_content: "Hel", phase: "answer", done: false } })}`,
          `data: ${JSON.stringify({ type: "chat:completion", data: { delta_content: "lo", phase: "answer", done: false } })}`,
          `data: ${JSON.stringify({ type: "chat:completion", data: { phase: "done", done: true } })}`,
          "data: [DONE]",
          "",
          "",
        ].join("\n"),
        { headers: { "Content-Type": "text/event-stream" } }
      )) as typeof fetch;

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "glm-4.6",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "token=abc123" },
        signal: null,
      });

      const completion = await result.response.json();
      assert.equal(completion.choices[0].message.content, "Hello");
      assert.equal(completion.choices[0].finish_reason, "stop");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("streams internal-envelope deltas as OpenAI-shaped SSE chunks", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(
        [
          `data: ${JSON.stringify({ type: "chat:completion", data: { delta_content: "Hi", phase: "answer", done: false } })}`,
          `data: ${JSON.stringify({ type: "chat:completion", data: { phase: "done", done: true } })}`,
          "",
          "",
        ].join("\n"),
        { headers: { "Content-Type": "text/event-stream" } }
      )) as typeof fetch;

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "glm-4.6",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: { apiKey: "token=abc123" },
        signal: null,
      });

      const text = await result.response.text();
      assert.match(text, /"content":"Hi"/);
      assert.match(text, /"finish_reason":"stop"/);
      assert.match(text, /data: \[DONE\]/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("propagates upstream HTTP errors", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response("session expired", { status: 401 })) as typeof fetch;

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "glm-4.6",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "token=abc123" },
        signal: null,
      });

      assert.equal(result.response.status, 401);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
