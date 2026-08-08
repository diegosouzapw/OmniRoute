/**
 * Regression test for #9306 — Arena AI streaming response must produce
 * Uint8Array chunks (not raw strings) so downstream consumers like
 * ensureStreamReadiness / TextDecoder.decode() do not throw TypeError.
 *
 * Run: node --import tsx/esm --test tests/unit/lmarena-stream-readiness-repro-9306.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ensureStreamReadiness } from "../../open-sse/utils/streamReadiness.ts";
import { createOpenAIArenaStream } from "../../open-sse/executors/lmarena/response.ts";

describe("Arena AI stream readiness (#9306)", () => {
  it("produces Uint8Array chunks consumable by ensureStreamReadiness", async () => {
    // Simulate the upstream Arena TLS reader returning Uint8Array chunks
    const upstreamReader = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('a0:{"text":"Hello"}\n'));
        controller.enqueue(
          new TextEncoder().encode('a0:{"text":", world!"}\nad:{}\n')
        );
        controller.close();
      },
    }).getReader();

    const stream = createOpenAIArenaStream({
      reader: upstreamReader,
      model: "test-model",
      signal: new AbortController().signal,
    });

    // Wrap in a Response so ensureStreamReadiness can consume it
    const response = new Response(stream, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });

    // This should not throw TypeError
    const result = await ensureStreamReadiness(response, {
      timeoutMs: 5000,
      provider: "lmarena",
      model: "test-model",
    });

    assert.ok(result.ok, "Stream readiness should succeed, not throw ERR_INVALID_ARG_TYPE");
    if (result.ok) {
      // Verify the stream body can be read
      const reader = result.response.body?.getReader();
      assert.ok(reader, "Should have a readable body");
      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }
      fullText += decoder.decode();
      // Should contain the SSE data we sent
      assert.ok(fullText.includes("Hello"), "Stream should contain the SSE text");
      assert.ok(fullText.includes("world"), "Stream should contain the SSE text");
      assert.ok(fullText.includes("[DONE]"), "Stream should end with [DONE] marker");
    }
  });

  it("does not throw TypeError when reading chunks directly", async () => {
    const upstreamReader = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('a0:{"text":"Hello"}\nad:{}\n'));
        controller.close();
      },
    }).getReader();

    const stream = createOpenAIArenaStream({
      reader: upstreamReader,
      model: "test-model",
      signal: new AbortController().signal,
    });

    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      // If value is a string, this would throw
      chunks.push(value);
    }
    // All chunks should be Uint8Array, not string
    assert.ok(chunks.length > 0, "Should have produced at least one chunk");
    for (const chunk of chunks) {
      assert.ok(chunk instanceof Uint8Array, "Each chunk must be Uint8Array, not string");
    }
  });
});
