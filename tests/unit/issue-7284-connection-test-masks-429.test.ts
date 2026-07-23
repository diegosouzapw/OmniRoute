import test from "node:test";
import assert from "node:assert/strict";

const { validateOpenAILikeProvider } = await import(
  "../../src/lib/providers/validation/openaiFormat.ts"
);

test("#7284: a 429 chat-probe response is reported with a rate-limit warning, not plain valid", async () => {
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = (async (url: string | URL | Request) => {
    callCount += 1;
    const href =
      typeof url === "string" ? url : "url" in url ? url.url : url instanceof URL ? url.href : "";
    if (href.includes("/models")) {
      return new Response("not found", { status: 404 });
    }
    return new Response(JSON.stringify({ error: { message: "Too Many Requests" } }), {
      status: 429,
    });
  }) as typeof fetch;

  try {
    const result = await validateOpenAILikeProvider({
      provider: "opencode-zen",
      apiKey: "test-key",
      baseUrl: "https://opencode.ai/zen/v1",
      modelId: "test-model",
      providerSpecificData: {},
    });

    assert.equal(callCount, 2, "expected a /models probe followed by a chat probe");

    const typedResult = result as { valid: boolean; error: string | null; warning?: string };

    assert.equal(typedResult.valid, true, "429 on the chat probe should still be treated as valid");
    assert.equal(typedResult.error, null);
    assert.equal(
      typeof typedResult.warning,
      "string",
      "429 response must carry a warning field signaling the rate limit"
    );
    assert.match(typedResult.warning as string, /rate limit/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
