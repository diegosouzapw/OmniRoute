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
        controller.enqueue(new TextEncoder().encode('a0:{"text":", world!"}\nad:{}\n'));
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

  it("cancels and unlocks the upstream reader after an early done event", async () => {
    let upstreamCancelled = false;
    const upstream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("ad:{}\n"));
      },
      cancel() {
        upstreamCancelled = true;
      },
    });
    const upstreamReader = upstream.getReader();
    const stream = createOpenAIArenaStream({ reader: upstreamReader, model: "test-model" });

    const responseText = await new Response(stream).text();

    assert.match(responseText, /\[DONE\]/);
    assert.equal(upstreamCancelled, true);
    assert.equal(upstream.locked, false);
  });

  it("projects reader failures as sanitized stackless stream errors", async () => {
    const upstreamError = new Error(
      "Arena reader failed at /srv/private/lmarena-reader.ts:17:5; " +
        "access_token=lmarena-reader-secret\n" +
        "    at SecretReaderFrame (/srv/private/lmarena-reader-stack.ts:2:3)"
    );
    const upstreamReader = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.error(upstreamError);
      },
    }).getReader();
    const errorLogs: string[] = [];
    const stream = createOpenAIArenaStream({
      reader: upstreamReader,
      model: "test-model",
      log: { error: (_scope, message) => errorLogs.push(String(message)) },
    });

    let projectedError: unknown;
    try {
      await stream.getReader().read();
      assert.fail("reader must reject when the Arena reader fails");
    } catch (error) {
      projectedError = error;
    }

    assert.ok(projectedError instanceof Error);
    assert.equal(projectedError.stack, undefined, "public stream error must not carry a stack");
    assert.equal(
      (projectedError as Error & { cause?: unknown }).cause,
      undefined,
      "public stream error must not carry the upstream cause"
    );
    assert.equal(errorLogs.length, 1);
    const publicOutput = `${errorLogs.join("\n")}\n${projectedError.message}`;
    assert.match(publicOutput, /Arena reader failed/);
    assert.doesNotMatch(publicOutput, /\/srv\/private\/lmarena-reader(?:-stack)?\.ts/);
    assert.doesNotMatch(publicOutput, /lmarena-reader-secret|SecretReaderFrame/);
  });

  it("uses a stable fallback for stack-only reader failures", async () => {
    const upstreamReader = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.error(
          new Error("\n    at SecretOnlyFrame (/srv/private/lmarena-reader-stack-only.ts:2:3)")
        );
      },
    }).getReader();
    const errorLogs: string[] = [];
    const stream = createOpenAIArenaStream({
      reader: upstreamReader,
      model: "test-model",
      log: { error: (_scope, message) => errorLogs.push(String(message)) },
    });

    let projectedError: unknown;
    try {
      await stream.getReader().read();
      assert.fail("reader must reject when the Arena reader fails");
    } catch (error) {
      projectedError = error;
    }

    assert.ok(projectedError instanceof Error);
    assert.equal(projectedError.message, "Arena upstream stream error");
    assert.equal(projectedError.stack, undefined);
    assert.equal((projectedError as Error & { cause?: unknown }).cause, undefined);
    assert.deepEqual(errorLogs, ["Streaming error: Arena upstream stream error"]);
  });

  it("fails closed when reader failure coercion and metadata access throw", async () => {
    const hostileFailure = {
      get name() {
        throw new Error("access_token=name-secret at /srv/private/name.ts:1:2");
      },
      get statusCode() {
        throw new Error("access_token=status-secret at /srv/private/status.ts:1:2");
      },
      toString() {
        throw new Error("access_token=coercion-secret at /srv/private/coercion.ts:1:2");
      },
    };
    const upstreamReader = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.error(hostileFailure);
      },
    }).getReader();
    const errorLogs: string[] = [];
    const stream = createOpenAIArenaStream({
      reader: upstreamReader,
      model: "test-model",
      log: { error: (_scope, message) => errorLogs.push(String(message)) },
    });

    let projectedError: unknown;
    try {
      await stream.getReader().read();
      assert.fail("reader must reject when the Arena reader fails");
    } catch (error) {
      projectedError = error;
    }

    assert.ok(projectedError instanceof Error);
    assert.equal(projectedError.message, "Arena upstream stream error");
    assert.equal(projectedError.stack, undefined);
    assert.deepEqual(errorLogs, ["Streaming error: Arena upstream stream error"]);
  });

  it("preserves safe disconnect classification without retaining upstream metadata", async () => {
    const upstreamError = new Error(
      "Abort failed at /srv/private/lmarena-abort.ts:17:5; " + "access_token=lmarena-abort-secret"
    ) as Error & { cause?: unknown; statusCode?: number };
    upstreamError.name = "AbortError";
    upstreamError.cause = new Error("private abort cause");
    upstreamError.statusCode = 499;
    const upstreamReader = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.error(upstreamError);
      },
    }).getReader();
    const stream = createOpenAIArenaStream({ reader: upstreamReader, model: "test-model" });

    let projectedError: unknown;
    try {
      await stream.getReader().read();
      assert.fail("reader must reject when the Arena reader aborts");
    } catch (error) {
      projectedError = error;
    }

    assert.ok(projectedError instanceof Error);
    assert.equal(projectedError.name, "AbortError");
    assert.equal(projectedError.stack, undefined);
    assert.equal((projectedError as Error & { cause?: unknown }).cause, undefined);
    assert.equal((projectedError as Error & { statusCode?: number }).statusCode, 499);
    assert.doesNotMatch(projectedError.message, /lmarena-abort-secret|\/srv\/private/);
  });
});
