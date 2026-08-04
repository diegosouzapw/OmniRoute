import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/zai-web.ts");

test("#8014 RED: ZaiWebExecutor must POST to the current chat.z.ai v2 chat-completions endpoint, not the stale unversioned path", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  globalThis.fetch = (async (url: string) => {
    capturedUrl = String(url);
    if (capturedUrl === "https://chat.z.ai/api/chat/completions") {
      return new Response(JSON.stringify({ detail: "Not Found" }), { status: 404 });
    }
    return new Response("data: [DONE]\n\n", {
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as typeof fetch;

  try {
    const executor = new mod.ZaiWebExecutor();
    const result = await executor.execute({
      model: "glm-4.6",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: { apiKey: "token=abc123" },
      signal: null,
    });

    assert.equal(
      capturedUrl,
      "https://chat.z.ai/api/v2/chat/completions",
      `zai-web executor POSTed to a stale endpoint (${capturedUrl}) — matches #8014's model-independent 404 "Not Found"`
    );
    assert.notEqual(
      result.response.status,
      404,
      "chat call must not 404 when the endpoint path is correct"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
