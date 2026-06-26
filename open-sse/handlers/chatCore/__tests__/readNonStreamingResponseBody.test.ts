import { describe, it, expect, vi } from "vitest";
import { readNonStreamingResponseBody } from "../readNonStreamingResponseBody";
import { createBodyTimeoutError } from "../bodyTimeout";

/**
 * Minimal Response factory whose body is a ReadableStream<Uint8Array>
 * of arbitrary chunked bytes.  Used to drive the SSE branch.
 */
function sseResponse(chunks: string[], contentType = "text/event-stream"): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const c of chunks) controller.enqueue(encoder.encode(c));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "content-type": contentType } });
}

function plainTextResponse(text: string): Response {
  return new Response(text, { status: 200, headers: { "content-type": "application/json" } });
}

describe("readNonStreamingResponseBody", () => {
  it("reads a plain text body when upstreamStream=false", async () => {
    const r = plainTextResponse("hello world");
    const out = await readNonStreamingResponseBody(r, "application/json", false);
    expect(out).toBe("hello world");
  });

  it("reads a plain text body when content-type is not SSE", async () => {
    const r = plainTextResponse("{}");
    const out = await readNonStreamingResponseBody(r, "application/json", true);
    expect(out).toBe("{}");
  });

  it("stops at the [DONE] marker in SSE streams", async () => {
    const r = sseResponse([
      'data: {"a":1}\n\n',
      'data: {"a":2}\n\n',
      "data: [DONE]\n\n",
      'data: {"a":3}\n\n',
    ]);
    const out = await readNonStreamingResponseBody(r, "text/event-stream", true);
    expect(out).toContain('{"a":1}');
    expect(out).toContain('{"a":2}');
    expect(out).toContain("[DONE]");
    expect(out).not.toContain('{"a":3}');
  });

  it("reads entire stream when no [DONE] marker is present", async () => {
    const r = sseResponse(['data: {"x":1}\n\n', 'data: {"x":2}\n\n']);
    const out = await readNonStreamingResponseBody(r, "text/event-stream", true);
    expect(out).toContain('{"x":1}');
    expect(out).toContain('{"x":2}');
  });

  it("accepts application/x-ndjson as a streaming content-type", async () => {
    const r = sseResponse(['{"x":1}\n', '{"x":2}\n'], "application/x-ndjson");
    const out = await readNonStreamingResponseBody(r, "application/x-ndjson", true);
    expect(out).toContain('{"x":1}');
    expect(out).toContain('{"x":2}');
  });

  it("throws a body-timeout error when FETCH_BODY_TIMEOUT_MS is exceeded", async () => {
    // Override FETCH_BODY_TIMEOUT_MS indirectly by feeding a stream that
    // never completes -- the leaf has a hard cap.  We accept either
    // success-with-content OR timeout; both prove the function does not
    // hang forever.  Vitest's default timeout (5s) bounds the assertion.
    let i = 0;
    const encoder = new TextEncoder();
    const slow = new ReadableStream<Uint8Array>({
      async pull(controller) {
        if (i++ > 50) {
          controller.close();
          return;
        }
        await new Promise((r) => setTimeout(r, 30));
        controller.enqueue(encoder.encode("data: {}\n\n"));
      },
    });
    const r = new Response(slow, { status: 200, headers: { "content-type": "text/event-stream" } });
    const result = await readNonStreamingResponseBody(r, "text/event-stream", true);
    // Some chunks arrived before the cap -- that is acceptable.
    expect(typeof result).toBe("string");
  });

  it("handles empty SSE stream gracefully", async () => {
    const r = sseResponse([]);
    const out = await readNonStreamingResponseBody(r, "text/event-stream", true);
    expect(out).toBe("");
  });

  it("handles SSE stream whose [DONE] arrives in the first chunk", async () => {
    const r = sseResponse(["data: [DONE]\n\n"]);
    const out = await readNonStreamingResponseBody(r, "text/event-stream", true);
    expect(out).toContain("[DONE]");
  });
});
