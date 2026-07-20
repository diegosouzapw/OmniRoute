import test from "node:test";
import assert from "node:assert/strict";

import { createPassthroughStreamWithLogger } from "../../open-sse/utils/stream.ts";

/**
 * Regression tests for #7800 — SSE stream omits finish_reason on final chunk.
 *
 * Some providers close the SSE stream without emitting a terminal chunk carrying
 * a non-null finish_reason. The OpenAI spec requires the last chunk to include
 * finish_reason (e.g. "stop"); strict clients (pi CLI) reject the stream with
 * "Stream ended without finish_reason".
 *
 * These tests drive the REAL passthrough transform stream and verify that a
 * synthetic finish_reason chunk is injected before [DONE] when the upstream
 * omitted one, and that it is NOT injected when the upstream already sent one.
 */

function makeChunk(content: string | null, finishReason: string | null): string {
  const chunk = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      {
        index: 0,
        delta: content !== null ? { content } : {},
        finish_reason: finishReason,
      },
    ],
  };
  return `data: ${JSON.stringify(chunk)}\n\n`;
}

async function runPassthrough(rawSSE: string): Promise<string> {
  const transform = createPassthroughStreamWithLogger(
    "test-provider",
    null,
    null,
    "test-model",
    "conn-7800",
    { model: "test-model" }
  );

  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readAll = (async () => {
    const out: string[] = [];
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      out.push(decoder.decode(value));
    }
    return out.join("");
  })();

  await writer.write(encoder.encode(rawSSE));
  await writer.close();

  return readAll;
}

/** Parse all SSE data payloads (excluding [DONE]) from a raw SSE string. */
function parseDataEvents(raw: string): Record<string, unknown>[] {
  const events: Record<string, unknown>[] = [];
  for (const line of raw.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      events.push(JSON.parse(payload) as Record<string, unknown>);
    } catch {
      // skip metadata comments / non-JSON
    }
  }
  return events;
}

test("#7800: synthetic finish_reason chunk injected when upstream omits it", async () => {
  // Provider sends content chunks with finish_reason: null, then [DONE]
  // WITHOUT a terminal chunk carrying finish_reason.
  const rawSSE = [
    makeChunk("Hello", null),
    makeChunk(" world", null),
    "data: [DONE]\n\n",
  ].join("");

  const result = await runPassthrough(rawSSE);
  const events = parseDataEvents(result);

  // The last data event before [DONE] must have finish_reason: "stop"
  const finishEvents = events.filter(
    (e) => e.choices?.[0]?.finish_reason && e.choices[0].finish_reason !== null
  );
  assert.equal(
    finishEvents.length,
    1,
    "Expected exactly one chunk with non-null finish_reason"
  );
  assert.equal(
    finishEvents[0].choices[0].finish_reason,
    "stop",
    "Synthetic finish_reason should be 'stop'"
  );
  assert.equal(
    finishEvents[0].object,
    "chat.completion.chunk",
    "Synthetic chunk should have correct object type"
  );

  // [DONE] should still be present
  assert.match(result, /data: \[DONE\]/);
});

test("#7800: no synthetic chunk when upstream already sends finish_reason", async () => {
  // Provider sends content chunks AND a proper terminal chunk with finish_reason.
  const rawSSE = [
    makeChunk("Hello", null),
    makeChunk(" world", null),
    makeChunk(null, "stop"),
    "data: [DONE]\n\n",
  ].join("");

  const result = await runPassthrough(rawSSE);
  const events = parseDataEvents(result);

  const finishEvents = events.filter(
    (e) => e.choices?.[0]?.finish_reason && e.choices[0].finish_reason !== null
  );
  assert.equal(
    finishEvents.length,
    1,
    "Expected exactly one chunk with non-null finish_reason (from upstream, not synthetic)"
  );
  assert.equal(finishEvents[0].choices[0].finish_reason, "stop");

  // [DONE] should still be present
  assert.match(result, /data: \[DONE\]/);
});

test("#7800: synthetic finish_reason is 'tool_calls' when tool calls were used", async () => {
  // Provider sends tool_call chunks but no finish_reason chunk, then [DONE].
  const toolCallChunk = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: 0,
              id: "call_1",
              type: "function",
              function: { name: "get_weather", arguments: '{"city":"NYC"}' },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  };

  const rawSSE = [
    `data: ${JSON.stringify(toolCallChunk)}\n\n`,
    "data: [DONE]\n\n",
  ].join("");

  const result = await runPassthrough(rawSSE);
  const events = parseDataEvents(result);

  const finishEvents = events.filter(
    (e) => e.choices?.[0]?.finish_reason && e.choices[0].finish_reason !== null
  );
  assert.equal(finishEvents.length, 1);
  assert.equal(
    finishEvents[0].choices[0].finish_reason,
    "tool_calls",
    "Synthetic finish_reason should be 'tool_calls' when tool calls were present"
  );
});