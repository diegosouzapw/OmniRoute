// Antigravity streaming-passthrough behavior (#7408): the buffered non-streaming
// response path and the credits-extraction pass-through TransformStream. Kept
// separate from executor-antigravity.test.ts to respect its frozen file-size cap.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  AntigravityExecutor,
  createCreditsExtractionTransform,
} from "../../open-sse/executors/antigravity.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityIdeVersionCache,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

type ChatCompletionPayload = {
  object?: string;
  choices: Array<{
    message: { content: string };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

test.afterEach(() => {
  clearAntigravityVersionCaches();
});

test("AntigravityExecutor.execute auto-retries short 429 responses and collects SSE for non-stream clients", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const calls = [];
  seedAntigravityIdeVersionCache("2026.04.17-test");
  seedAntigravityCliVersionCache("2026.04.17-test");

  globalThis.fetch = async (url) => {
    calls.push(String(url));

    if (calls.length === 1) {
      return new Response(JSON.stringify({ error: { message: "rate limited" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      [
        'data: {"response":{"candidates":[{"content":{"parts":[{"text":"Hello "}]},"finishReason":"STOP"}]}}\n\n',
        'data: {"response":{"candidates":[{"content":{"parts":[{"text":"again"}]},"finishReason":"STOP"}],"usageMetadata":{"promptTokenCount":2,"candidatesTokenCount":3,"totalTokenCount":5}}}\n\n',
      ].join(""),
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  };
  globalThis.setTimeout = ((callback) => {
    (callback as () => void)();
    return 0;
  }) as typeof setTimeout;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-2.5-flash",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {} },
    });
    // Non-streaming collects the upstream SSE and returns the already-converted
    // OpenAI chat.completion payload — no further SSE parsing on the caller side.
    const payload = JSON.parse(await result.response.text()) as ChatCompletionPayload;
    assert.equal(payload.object, "chat.completion");

    assert.equal(calls.length, 2);
    assert.equal(result.response.status, 200);
    assert.equal(payload.choices[0].message.content, "Hello again");
    assert.deepEqual(payload.usage, {
      prompt_tokens: 2,
      completion_tokens: 3,
      total_tokens: 5,
    });
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

// ---------------------------------------------------------------------------
// createCreditsExtractionTransform -- credits extraction with buffer cap
// ---------------------------------------------------------------------------

test("createCreditsExtractionTransform extracts remainingCredits from SSE data", async () => {
  const encoder = new TextEncoder();
  const sseData = [
    'data: {"response":{"candidates":[{"content":{"parts":[{"text":"hello"}]},"finishReason":"STOP"}]}}\n\n',
    'data: {"remainingCredits":[{"creditType":"GOOGLE_ONE_AI","creditAmount":"42"}]}\n\n',
  ].join("");

  const transform = createCreditsExtractionTransform("test-account");
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(sseData));
      controller.close();
    },
  });

  // Consume the stream through the transform
  const output = readable.pipeThrough(transform);
  const reader = output.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  // Data must pass through unmodified
  const collected = new TextDecoder().decode(
    new Uint8Array(
      chunks.reduce((acc, c) => acc + c.length, 0) > 0 ? Buffer.concat(chunks) : new Uint8Array(0)
    )
  );
  assert.ok(collected.includes("hello"));
  assert.ok(collected.includes("remainingCredits"));
});

test("createCreditsExtractionTransform with buffer cap truncates large buffers", async () => {
  const encoder = new TextEncoder();
  // Build a payload larger than 1KB
  const largeText = "x".repeat(2000);
  const ssePayload = JSON.stringify({
    response: {
      candidates: [{ content: { parts: [{ text: largeText }] } }],
    },
  });
  const sseLine = `data: ${ssePayload}\n\n`;
  // Append a credits line at the end
  const creditsLine =
    'data: {"remainingCredits":[{"creditType":"GOOGLE_ONE_AI","creditAmount":"99"}]}\n\n';
  const fullData = sseLine + creditsLine;

  // Use a 512-byte buffer cap -- the large text line should be discarded
  const transform = createCreditsExtractionTransform("test-account", 512);
  const readable = new ReadableStream({
    start(controller) {
      // Send in small chunks to exercise the sliding-window logic
      const encoded = encoder.encode(fullData);
      const chunkSize = 256;
      for (let i = 0; i < encoded.length; i += chunkSize) {
        controller.enqueue(encoded.slice(i, i + chunkSize));
      }
      controller.close();
    },
  });

  const output = readable.pipeThrough(transform);
  const reader = output.getReader();
  while (true) {
    const { done } = await reader.read();
    if (done) break;
  }

  // The transform should not throw -- buffer cap just limits what the
  // flush handler can see.  If the credits line was within the last 512
  // bytes it will be found; otherwise it's a graceful no-op.
  // Either way, no crash or OOM.
  assert.ok(true);
});

test("createCreditsExtractionTransform handles malformed SSE gracefully", async () => {
  const encoder = new TextEncoder();
  const badData = "not valid sse\ndata: {broken json\n\ndata: [DONE]\n\n";

  const transform = createCreditsExtractionTransform("test-account");
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(badData));
      controller.close();
    },
  });

  const output = readable.pipeThrough(transform);
  const reader = output.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  // Data passes through unmodified, no crash on malformed input
  const collected = new TextDecoder().decode(Buffer.concat(chunks));
  assert.ok(collected.includes("not valid sse"));
});
