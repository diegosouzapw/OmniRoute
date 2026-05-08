import test from "node:test";
import assert from "node:assert/strict";

import {
  ensureStreamReadiness,
  hasUsefulStreamContent,
} from "../../open-sse/utils/streamReadiness.ts";

const encoder = new TextEncoder();

function streamFromChunks(chunks: string[], delayMs = 0): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of chunks) {
        if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });
}

test("hasUsefulStreamContent ignores keepalives and lifecycle-only chunks", () => {
  assert.equal(hasUsefulStreamContent(": keepalive\n\n"), false);
  assert.equal(hasUsefulStreamContent("event: ping\ndata: {}\n\n"), false);
  assert.equal(
    hasUsefulStreamContent(`data: ${JSON.stringify({ type: "response.created" })}\n\n`),
    false
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { role: "assistant" }, index: 0 }] })}\n\n`
    ),
    false
  );
});

test("hasUsefulStreamContent detects text, reasoning, and tool deltas", () => {
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { content: "hello" }, index: 0 }] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { content: " " }, index: 0 }] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { reasoning_content: "thinking" }, index: 0 }] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ choices: [{ delta: { tool_calls: [{ function: { name: "read" } }] }, index: 0 }] })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ type: "content_block_delta", delta: { text: "hello" } })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "hello" })}\n\n`
    ),
    true
  );
  assert.equal(
    hasUsefulStreamContent(
      `data: ${JSON.stringify({ response: { candidates: [{ content: { parts: [{ text: "hello" }] } }] } })}\n\n`
    ),
    true
  );
});

test("ensureStreamReadiness preserves buffered chunks when stream starts", async () => {
  const response = new Response(
    streamFromChunks([
      `data: ${JSON.stringify({ type: "response.created" })}\n\n`,
      `data: ${JSON.stringify({ choices: [{ delta: { content: "hello" }, index: 0 }] })}\n\n`,
      `data: ${JSON.stringify({ choices: [{ delta: { content: " world" }, index: 0 }] })}\n\n`,
    ]),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

  const result = await ensureStreamReadiness(response, { timeoutMs: 100 });
  assert.equal(result.ok, true);
  const text = await result.response.text();
  assert.match(text, /response\.created/);
  assert.match(text, /hello/);
  assert.match(text, / world/);
});

test("ensureStreamReadiness returns 504 when no useful content arrives before timeout", async () => {
  const response = new Response(
    streamFromChunks(
      [": keepalive\n\n", `data: ${JSON.stringify({ type: "response.created" })}\n\n`],
      20
    ),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

  const result = await ensureStreamReadiness(response, { timeoutMs: 10 });
  assert.equal(result.ok, false);
  assert.equal(result.response.status, 504);
  assert.match(await result.response.text(), /STREAM_READINESS_TIMEOUT/);
});

test("ensureStreamReadiness returns 502 when stream ends without useful content", async () => {
  const response = new Response(streamFromChunks([": keepalive\n\n"]), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = await ensureStreamReadiness(response, { timeoutMs: 100 });
  assert.equal(result.ok, false);
  assert.equal(result.response.status, 502);
});
