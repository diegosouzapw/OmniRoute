import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import {
  peekFirstAntigravitySseEvent,
  AntigravityPreResponseTimeoutError,
} from "../../open-sse/executors/antigravity/executeAttempt.ts";
import {
  seedAntigravityIdeVersionCache,
  seedAntigravityCliVersionCache,
  clearAntigravityVersionCaches,
} from "../../open-sse/services/antigravityVersion.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

describe("Part D - Antigravity silent-body watchdog and failover", () => {
  it("peekFirstAntigravitySseEvent throws AntigravityPreResponseTimeoutError on silent body", async () => {
    // A 200 response whose body never yields any chunks (silent open body)
    const silentStream = new ReadableStream<Uint8Array>({
      start() {
        // never enqueues, never closes
      },
    });
    const silentResponse = new Response(silentStream, { status: 200 });

    await assert.rejects(
      async () => {
        await peekFirstAntigravitySseEvent(silentResponse, "https://api.test/silent", 50);
      },
      (err: unknown) => {
        assert.ok(err instanceof AntigravityPreResponseTimeoutError);
        assert.equal(err.status, 504);
        assert.equal(err.code, "ANTIGRAVITY_PRE_RESPONSE_TIMEOUT");
        return true;
      }
    );
  });

  it("peekFirstAntigravitySseEvent returns replayable response intact when first event arrives", async () => {
    const encoder = new TextEncoder();
    const healthyStream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          encoder.encode('data: {"candidates":[{"content":{"parts":[{"text":"hi"}]}}]}\n\n')
        );
        controller.enqueue(
          encoder.encode('data: {"candidates":[{"content":{"parts":[{"text":" world"}]}}]}\n\n')
        );
        controller.close();
      },
    });
    const healthyResponse = new Response(healthyStream, { status: 200 });

    const result = await peekFirstAntigravitySseEvent(
      healthyResponse,
      "https://api.test/healthy",
      500
    );
    assert.equal(result.status, 200);

    const reader = result.body!.getReader();
    const chunks: string[] = [];
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(decoder.decode(value));
    }
    const fullText = chunks.join("");
    assert.ok(fullText.includes("hi"));
    assert.ok(fullText.includes("world"));
  });

  it("execute fails over when first base URL has a silent 200 response and returns intact stream from second base URL", async () => {
    seedAntigravityIdeVersionCache("1.11.5");
    seedAntigravityCliVersionCache("1.11.5");

    const executor = new AntigravityExecutor({ streamReadinessTimeoutMs: 50 });
    const encoder = new TextEncoder();

    let streamGenAttempt = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      const urlStr = String(input);
      if (!urlStr.includes("v1internal:streamGenerateContent")) {
        return new Response(JSON.stringify({ version: "1.11.5" }), { status: 200 });
      }

      streamGenAttempt++;
      if (streamGenAttempt === 1) {
        // First endpoint: silent body (never enqueues, never closes)
        const silentStream = new ReadableStream<Uint8Array>({
          start() {
            // silent open body
          },
        });
        return new Response(silentStream, {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      } else {
        // Second endpoint: healthy stream
        const healthyStream = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(
              encoder.encode(
                'data: {"candidates":[{"content":{"parts":[{"text":"success from fallback"}]}}]}\n\n'
              )
            );
            controller.close();
          },
        });
        return new Response(healthyStream, {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      }
    }) as unknown as typeof fetch;

    try {
      const creds = {
        accessToken: "test-token",
        projectId: "test-project",
      };

      const res = await executor.execute({
        model: "gemini-2.5-flash",
        stream: true,
        body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
        credentials: creds,
      });

      assert.equal(
        streamGenAttempt,
        2,
        `failed over to second base URL (attempts=${streamGenAttempt})`
      );
      assert.ok(res.response.ok);

      // Drain the response body and assert exact SSE content intact
      const reader = res.response.body!.getReader();
      const chunks: string[] = [];
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(decoder.decode(value));
      }
      const fullText = chunks.join("");
      assert.ok(
        fullText.includes("success from fallback"),
        `Expected body to contain 'success from fallback', got: ${fullText}`
      );
    } finally {
      globalThis.fetch = originalFetch;
      clearAntigravityVersionCaches();
    }
  });

  it("execute does NOT fail over when first base URL is healthy and preserves stream", async () => {
    seedAntigravityIdeVersionCache("1.11.5");
    seedAntigravityCliVersionCache("1.11.5");

    const executor = new AntigravityExecutor({ streamReadinessTimeoutMs: 100 });
    const encoder = new TextEncoder();

    let streamGenAttempt = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      const urlStr = String(input);
      if (!urlStr.includes("v1internal:streamGenerateContent")) {
        return new Response(JSON.stringify({ version: "1.11.5" }), { status: 200 });
      }

      streamGenAttempt++;
      const healthyStream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(
            encoder.encode(
              'data: {"candidates":[{"content":{"parts":[{"text":"healthy first attempt"}]}}]}\n\n'
            )
          );
          controller.close();
        },
      });
      return new Response(healthyStream, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }) as unknown as typeof fetch;

    try {
      const creds = {
        accessToken: "test-token",
        projectId: "test-project",
      };

      const res = await executor.execute({
        model: "gemini-2.5-flash",
        stream: true,
        body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
        credentials: creds,
      });

      assert.equal(streamGenAttempt, 1, `only made 1 attempt (attempts=${streamGenAttempt})`);
      assert.ok(res.response.ok);

      const reader = res.response.body!.getReader();
      const chunks: string[] = [];
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(decoder.decode(value));
      }
      const fullText = chunks.join("");
      assert.ok(
        fullText.includes("healthy first attempt"),
        `Expected body to contain 'healthy first attempt', got: ${fullText}`
      );
    } finally {
      globalThis.fetch = originalFetch;
      clearAntigravityVersionCaches();
    }
  });
});
