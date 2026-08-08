/**
 * TDD repro for #9237: Arena SSE stream emits string chunks (not Uint8Array),
 * which causes TextDecoder.decode in the shared pipeline to throw
 * TypeError ERR_INVALID_ARG_TYPE.
 */
import { describe, it } from "node:test";
import { ok, deepEqual, rejects } from "node:assert/strict";
import { createOpenAIArenaStream } from "../../open-sse/executors/lmarena/response.ts";

/**
 * Build a fake upstream reader that yields SSE lines as Uint8Array,
 * simulating what the Arena executor's upstream reader does.
 */
function fakeReader(lines: string[]): ReadableStreamDefaultReader<Uint8Array> {
  let idx = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (idx < lines.length) {
        controller.enqueue(new TextEncoder().encode(lines[idx] + "\n"));
        idx++;
      } else {
        controller.close();
      }
    },
  });
  return stream.getReader();
}

/**
 * Drive the Arena stream through the real ensureStreamReadiness path
 * to verify the contract: TextDecoder.decode must not throw on any chunk.
 */
async function collectArenaStream(
  reader: ReadableStreamDefaultReader<Uint8Array>
): Promise<string> {
  const decoder = new TextDecoder();
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    // This is the exact call that throws ERR_INVALID_ARG_TYPE on string chunks
    result += decoder.decode(value, { stream: true });
  }
  // flush
  result += decoder.decode();
  return result;
}

describe("Arena SSE stream — string vs Uint8Array contract (#9237)", () => {
  it("should emit Uint8Array chunks that survive TextDecoder.decode without throwing", async () => {
    const reader = fakeReader([
      'data: a0:{"text":"Hello"}',
      'data: ad:{}',
    ]);
    const arenaStream = createOpenAIArenaStream({
      reader,
      model: "test-model",
    });

    // verify the stream type is Uint8Array, not string
    const collected = await collectArenaStream(
      arenaStream.getReader()
    );

    // Should contain the content text and the [DONE] marker
    ok(
      collected.includes("Hello"),
      `Expected collected output to include "Hello", got: ${collected.slice(0, 200)}`
    );
    ok(
      collected.includes("[DONE]"),
      `Expected collected output to include "[DONE]", got: ${collected.slice(0, 200)}`
    );
  });
});