import test from "node:test";
import assert from "node:assert/strict";

import { TheOldLlmExecutor, tokenCache } from "../../open-sse/executors/theoldllm.ts";

const SSE_BODY =
  'data: {"choices":[{"delta":{"content":"Hello"}}]}\n' +
  'data: {"choices":[{"delta":{"content":" world"}}]}\n' +
  "data: [DONE]\n";

// #3296: with a valid cached token the executor takes the direct-fetch path and
// never enters the token-refresh branch. It read the SAME upstream Response with
// .text() twice (once for the token-rejection check, once for the final body),
// which throws "Body is unusable: Body has already been read" → caught → [502].
test("theoldllm does not double-read the upstream body on the cached-token path (#3296)", async () => {
  const originalFetch = globalThis.fetch;
  // Pre-populate the cached token so execute() uses the direct fetch (no Playwright).
  tokenCache.value = "cached-token";
  tokenCache.expiresAt = Date.now() + 60_000;

  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    return new Response(SSE_BODY, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as typeof fetch;

  try {
    const executor = new TheOldLlmExecutor();
    const result = await executor.execute({
      model: "gpt-5.4",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {} as never,
      signal: null,
    });

    // Before the fix this was 502 with "Body has already been read".
    assert.equal(result.response.status, 200);
    assert.equal(fetchCalls, 1, "should fetch upstream exactly once on the cached-token path");

    const json = (await result.response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    assert.equal(json.choices?.[0]?.message?.content, "Hello world");
  } finally {
    globalThis.fetch = originalFetch;
    tokenCache.value = "";
    tokenCache.expiresAt = 0;
  }
});
