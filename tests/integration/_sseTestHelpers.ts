// tests/integration/_sseTestHelpers.ts
// Shared SSE stream builders for integration tests.

const enc = new TextEncoder();

/** 200 + SSE stream with a single OpenAI-format chunk, then [DONE]. */
export function buildValidSSEStream(text: string): Response {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(
        enc.encode(
          `data: ${JSON.stringify({
            id: "chatcmpl_test",
            object: "chat.completion.chunk",
            choices: [{ index: 0, delta: { role: "assistant", content: text } }],
          })}\n\n`
        )
      );
      controller.enqueue(enc.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

/** 200 + SSE stream with a single Gemini-format chunk, then [DONE]. */
export function buildGeminiSSEStream(text: string): Response {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(
        enc.encode(
          `data: ${JSON.stringify({
            candidates: [{ content: { parts: [{ text }], role: "model" }, index: 0 }],
            usageMetadata: { promptTokenCount: 4, candidatesTokenCount: 2, totalTokenCount: 6 },
          })}\n\n`
        )
      );
      controller.enqueue(enc.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

/** 200 + SSE stream that contains an error payload on the first data: line. */
export function buildBrokenSSEStream(errorMessage: string): Response {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(
        enc.encode(`data: ${JSON.stringify({ error: { message: errorMessage } })}\n\n`)
      );
      controller.enqueue(enc.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

/** 200 + immediately-closed empty SSE stream (only [DONE]). */
export function buildEmptySSEStream(): Response {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(enc.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

/**
 * 200 + ReadableStream that never enqueues data.
 * Closes on abort signal so the stream readiness check cleans up promptly.
 */
export function hungStream(init?: RequestInit, contentType = "text/event-stream"): Response {
  const stream = new ReadableStream({
    start(controller) {
      init?.signal?.addEventListener("abort", () => {
        try {
          controller.close();
        } catch {}
      });
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": contentType } });
}

/**
 * 200 + SSE stream that waits `delayMs` before emitting `buildPayload(controller)`.
 * Aborts cleanly if the signal fires before the delay completes.
 */
export function buildDelayedSSEStream(
  delayMs: number,
  buildPayload: (controller: ReadableStreamDefaultController) => void,
  init?: RequestInit
): Response {
  const stream = new ReadableStream({
    async start(controller) {
      const aborted = new Promise<void>((resolve) => {
        init?.signal?.addEventListener("abort", () => resolve(), { once: true });
      });
      await Promise.race([new Promise((r) => setTimeout(r, delayMs)), aborted]);
      if (init?.signal?.aborted) {
        try {
          controller.close();
        } catch {}
        return;
      }
      buildPayload(controller);
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}
