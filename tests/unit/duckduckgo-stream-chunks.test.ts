import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { DuckDuckGoWebExecutor } from "../../open-sse/executors/duckduckgo-web.ts";

type DuckDuckGoResponseProcessor = {
  processResponse(
    response: Response,
    streaming: boolean,
    hasTools: boolean,
    requestedTools: unknown[]
  ): Promise<Response>;
};

async function transformChunks(chunks: Uint8Array[]): Promise<string> {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
  const executor = new DuckDuckGoWebExecutor() as unknown as DuckDuckGoResponseProcessor;
  const response = await executor.processResponse(
    new Response(body, { headers: { "Content-Type": "text/event-stream" } }),
    true,
    false,
    []
  );
  return response.text();
}

describe("DuckDuckGo streaming chunk boundaries", () => {
  it("preserves a data line split across transport chunks", async () => {
    const encoder = new TextEncoder();
    const output = await transformChunks([
      encoder.encode('data: {"message":"hel'),
      encoder.encode('lo"}\n[DONE]\n'),
    ]);

    assert.equal(
      output,
      'data: {"choices":[{"delta":{"content":"hello"},"index":0}]}\n\n' + "data: [DONE]\n\n"
    );
  });

  it("preserves a multi-byte UTF-8 character split across transport chunks", async () => {
    const encoded = new TextEncoder().encode('data: {"message":"café ☕"}');
    const coffeeStart = encoded.indexOf(0xe2);
    assert.notEqual(coffeeStart, -1, "fixture must contain the three-byte coffee character");

    const output = await transformChunks([
      encoded.slice(0, coffeeStart + 1),
      encoded.slice(coffeeStart + 1),
    ]);

    assert.equal(output, 'data: {"choices":[{"delta":{"content":"café ☕"},"index":0}]}\n\n');
  });
});
