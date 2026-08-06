import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { createPassthroughStreamWithLogger } from "../../open-sse/utils/stream.ts";

const encoder = new TextEncoder();

async function runPassthrough(provider: string, input: string, chunkSize = input.length) {
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (let index = 0; index < input.length; index += chunkSize) {
        controller.enqueue(encoder.encode(input.slice(index, index + chunkSize)));
      }
      controller.close();
    },
  });

  return new Response(
    source.pipeThrough(
      createPassthroughStreamWithLogger(
        provider,
        null,
        null,
        "MiniMax-M2.7",
        "minimax-thinking-signature-2706",
        { messages: [] },
        null,
        null,
        null,
        FORMATS.CLAUDE
      )
    )
  ).text();
}

function parseDataEvents(raw: string): Record<string, unknown>[] {
  return raw
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6))
    .filter((payload) => payload && payload !== "[DONE]")
    .map((payload) => JSON.parse(payload) as Record<string, unknown>);
}

function thinkingStart(signature?: string) {
  return {
    type: "content_block_start",
    index: 0,
    content_block: {
      type: "thinking",
      thinking: "",
      ...(signature === undefined ? {} : { signature }),
    },
  };
}

test("MiniMax registries opt into thinking signature normalization", () => {
  assert.equal(getRegistryEntry("minimax")?.ensureThinkingSignature, true);
  assert.equal(getRegistryEntry("minimax-cn")?.ensureThinkingSignature, true);
});

test("unsigned MiniMax thinking block starts receive an empty signature", async () => {
  const event = thinkingStart();
  const output = await runPassthrough(
    "minimax",
    `event: content_block_start\ndata: ${JSON.stringify(event)}\n\n`
  );
  const firstEvent = parseDataEvents(output)[0];

  assert.equal((firstEvent.content_block as Record<string, unknown>).signature, "");
});

test("fragmented MiniMax streams preserve real signatures and later signature deltas", async () => {
  const start = thinkingStart();
  const signatureDelta = {
    type: "content_block_delta",
    index: 0,
    delta: { type: "signature_delta", signature: "minimax-signature" },
  };
  const input =
    `event: content_block_start\ndata: ${JSON.stringify(start)}\n\n` +
    `event: content_block_delta\ndata: ${JSON.stringify(signatureDelta)}\n\n`;
  const events = parseDataEvents(await runPassthrough("minimax-cn", input, 7));

  assert.equal((events[0].content_block as Record<string, unknown>).signature, "");
  assert.deepEqual(events[1].delta, signatureDelta.delta);

  const existing = parseDataEvents(
    await runPassthrough(
      "minimax",
      `event: content_block_start\ndata: ${JSON.stringify(thinkingStart("real-signature"))}\n\n`
    )
  )[0];
  assert.equal((existing.content_block as Record<string, unknown>).signature, "real-signature");
});

test("unrelated providers do not receive the MiniMax signature placeholder", async () => {
  const events = parseDataEvents(
    await runPassthrough(
      "deepseek",
      `event: content_block_start\ndata: ${JSON.stringify(thinkingStart())}\n\n`
    )
  );

  assert.equal("signature" in (events[0].content_block as Record<string, unknown>), false);
});
