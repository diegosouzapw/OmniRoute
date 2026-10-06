/**
 * Regression test — silent SSE close on OpenAI Responses-format clients.
 *
 * Companion to #10443 (OpenAI chat completions) and #7699 (Claude). A healthy
 * OpenAI Responses stream ALWAYS terminates with an explicit
 * `response.completed` event; it is the format's only terminal marker and
 * carries the final status/usage. When the upstream forwards content deltas
 * and then closes without that event, Responses-format clients (Codex CLI and
 * other /v1/responses consumers) previously received a silent mid-stream
 * close — indistinguishable from a healthy end, so the client waits on a
 * completion event that never arrives. The close must surface a synthetic
 * `response.failed` instead, keeping everything already forwarded.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createDisconnectAwareStream, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function createNoopAbortWritableStream(): { getWriter: () => { abort: () => Promise<void> } } {
  return { getWriter: () => ({ abort: () => Promise.resolve() }) };
}

async function drainStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const parts: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
  }
  return new TextDecoder().decode(
    parts.reduce((acc, c) => {
      const merged = new Uint8Array(acc.length + c.length);
      merged.set(acc, 0);
      merged.set(c, acc.length);
      return merged;
    }, new Uint8Array(0))
  );
}

async function runClientStream(
  upstreamChunks: string[],
  clientResponseFormat: string | null
): Promise<string> {
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      for (const chunk of upstreamChunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });
  const transformedBody = upstream.pipeThrough(transform);

  const sc = createStreamController({
    provider: "opencode-go",
    model: "muse-spark-1.2-contributor",
    clientResponseFormat,
  });

  const wrapped = createDisconnectAwareStream(
    { readable: transformedBody, writable: createNoopAbortWritableStream() },
    sc
  );

  return drainStream(wrapped);
}

test("Responses format: content then bare close emits response.failed, not a silent close", async () => {
  const text = await runClientStream(
    [
      'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"partial"}\n\n',
    ],
    FORMATS.OPENAI_RESPONSES
  );

  // The forwarded content survives...
  assert.match(text, /partial/);
  // ...and the close must be flagged with the format's failure terminal.
  assert.match(text, /response\.failed/);
  assert.match(text, /Upstream stream ended without a terminal marker/);
});

test("Responses format: response.completed counts as terminal, no synthetic failure", async () => {
  const text = await runClientStream(
    [
      'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"done"}\n\n',
      'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n',
    ],
    FORMATS.OPENAI_RESPONSES
  );

  assert.match(text, /done/);
  assert.match(text, /response\.completed/);
  assert.doesNotMatch(text, /response\.failed/);
  assert.doesNotMatch(text, /Upstream stream ended without a terminal marker/);
});

test("Responses format: OPENAI_RESPONSE alias gets the same bare-close verdict", async () => {
  const text = await runClientStream(
    [
      'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"partial"}\n\n',
    ],
    FORMATS.OPENAI_RESPONSE
  );

  assert.match(text, /partial/);
  assert.match(text, /response\.failed/);
});
