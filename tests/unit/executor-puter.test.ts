import test from "node:test";
import assert from "node:assert/strict";

import { PuterExecutor } from "../../open-sse/executors/puter.ts";

test("PuterExecutor.buildUrl always uses Puter OpenAI endpoint", () => {
  const executor = new PuterExecutor();
  assert.equal(
    executor.buildUrl("gpt-4.1", true),
    "https://api.puter.com/puterai/openai/v1/chat/completions"
  );
});

test("PuterExecutor.buildHeaders supports API key, access token and optional SSE accept", () => {
  const executor = new PuterExecutor();
  const apiKeyHeaders = executor.buildHeaders({ apiKey: "puter-key" }, true);
  const accessTokenHeaders = executor.buildHeaders({ accessToken: "puter-token" }, false);

  assert.deepEqual(apiKeyHeaders, {
    "Content-Type": "application/json",
    Authorization: "Bearer puter-key",
    Accept: "text/event-stream",
  });
  assert.deepEqual(accessTokenHeaders, {
    "Content-Type": "application/json",
    Authorization: "Bearer puter-token",
  });
});

test("PuterExecutor.transformRequest is a passthrough", () => {
  const executor = new PuterExecutor();
  const body = {
    model: "google/gemini-2.5-pro",
    messages: [{ role: "user", content: "hello" }],
  };
  assert.equal(executor.transformRequest(body.model, body, true, {}), body);
});

test("PuterExecutor.execute uses inherited BaseExecutor flow", async () => {
  const executor = new PuterExecutor();
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (url, options) => {
    captured = { url: String(url), options };
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const body = {
      model: "google/gemini-2.5-pro",
      messages: [{ role: "user", content: "hello" }],
    };
    const result = await executor.execute({
      model: body.model,
      body,
      stream: false,
      credentials: { apiKey: "puter-key" },
    });

    assert.equal(result.response.status, 200);
    assert.equal(result.transformedBody, body);
    assert.equal(result.url, "https://api.puter.com/puterai/openai/v1/chat/completions");
    assert.equal(captured.options.headers.Authorization, "Bearer puter-key");
    assert.equal(captured.options.body, JSON.stringify(body));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
