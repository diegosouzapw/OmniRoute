import test from "node:test";
import assert from "node:assert/strict";

const { handleImageGeneration } = await import(
  "../../open-sse/handlers/imageGeneration.ts"
);

function restore<T>(fn: () => T): T {
  const originalFetch = globalThis.fetch;
  try {
    return fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function makeAbortError() {
  return Object.create(Error.prototype, {
    message: { value: "The operation was aborted", writable: true, configurable: true },
    name: { value: "AbortError", writable: true, configurable: true },
  });
}

test("fetch timeout in OpenAI provider path returns 504 and sanitized error", () =>
  restore(async () => {
    globalThis.fetch = async () => {
      throw makeAbortError();
    };

    const result = await handleImageGeneration({
      body: { model: "openai/gpt-image-2", prompt: "timeout test" },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 504);
    assert.match(result.error, /Image provider error:/);
  }));

test("non-timeout fetch error still returns 502", () =>
  restore(async () => {
    globalThis.fetch = async () => {
      throw new Error("network down");
    };

    const result = await handleImageGeneration({
      body: { model: "openai/gpt-image-2", prompt: "network error test" },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  }));

test("successful image gen passes AbortSignal and returns URL", () =>
  restore(async () => {
    let seenSignal: AbortSignal | null = null;

    globalThis.fetch = async (url, options) => {
      seenSignal = (options as RequestInit).signal ?? null;
      return new Response(
        JSON.stringify({
          created: 999,
          data: [{ url: "https://cdn.example.com/timeout-test.png" }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    };

    const result = await handleImageGeneration({
      body: { model: "openai/gpt-image-2", prompt: "success test" },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(seenSignal, "AbortSignal should be passed through fetchWithTimeout");
    assert.equal(result.data.data[0].url, "https://cdn.example.com/timeout-test.png");
  }));
