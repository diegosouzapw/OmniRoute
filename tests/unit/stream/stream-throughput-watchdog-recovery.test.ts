import { test } from "node:test";
import assert from "node:assert/strict";

import {
  createRecoverableStream,
  ThroughputWatchdogError,
} from "../../../open-sse/services/streamRecovery.ts";

const encoder = new TextEncoder();
const heartbeat = 'event: ping\ndata: {"type":"ping"}\n\n';
const content = (text: string) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`;

function streamFrom(chunks: string[], beforeChunk?: (index: number) => void) {
  let index = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (index >= chunks.length) {
        controller.close();
        return;
      }
      beforeChunk?.(index);
      controller.enqueue(encoder.encode(chunks[index++]));
    },
  });
}

async function collect(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let error: Error | null = null;
  try {
    for (;;) {
      const result = await reader.read();
      if (result.done) break;
      if (result.value) text += decoder.decode(result.value, { stream: true });
    }
  } catch (caught) {
    error = caught as Error;
  }
  return { text, error };
}

test("watchdog abort re-enters early recovery once and finalizes once", async () => {
  let clock = 0;
  let reopened = 0;
  let finalized = 0;
  let watchdogAborts = 0;
  const initial = streamFrom([heartbeat, heartbeat, heartbeat], (index) => {
    clock = index * 1_000;
  });
  const recovered = streamFrom([content("recovered"), "data: [DONE]\n\n"]);
  const stream = createRecoverableStream(
    initial,
    async () => {
      reopened += 1;
      return recovered;
    },
    {
      finalize: () => {
        finalized += 1;
      },
      now: () => 0,
      throughputWatchdog: {
        enabled: true,
        warmupMs: 0,
        windowMs: 1_000,
        minUsefulBytesPerSecond: 1,
        minUsefulBytes: 1,
        now: () => clock,
      },
      onWatchdogAbort: () => {
        watchdogAborts += 1;
      },
    }
  );

  const result = await collect(stream);
  assert.equal(result.error, null);
  assert.equal(result.text, `${content("recovered")}data: [DONE]\n\n`);
  assert.equal(reopened, 1);
  assert.equal(watchdogAborts, 1);
  assert.equal(finalized, 1);
});

test("post-commit watchdog abort never performs an unsafe full replay", async () => {
  let clock = 0;
  let reopened = 0;
  let finalized = 0;
  let holdbackClock = 0;
  const initial = streamFrom([content("visible"), heartbeat, heartbeat], (index) => {
    clock = index * 1_000;
  });
  const stream = createRecoverableStream(
    initial,
    async () => {
      reopened += 1;
      return streamFrom([content("duplicated"), "data: [DONE]\n\n"]);
    },
    {
      finalize: () => {
        finalized += 1;
      },
      now: () => {
        holdbackClock += 1_000;
        return holdbackClock;
      },
      throughputWatchdog: {
        enabled: true,
        warmupMs: 0,
        windowMs: 1_000,
        minUsefulBytesPerSecond: 100,
        minUsefulBytes: 1,
        now: () => clock,
      },
    }
  );

  const result = await collect(stream);
  assert.equal(result.text, content("visible"));
  assert.ok(result.error instanceof ThroughputWatchdogError);
  assert.equal(reopened, 0, "visible output forbids transparent replay");
  assert.equal(finalized, 1, "usage/semaphore finalization remains exactly once");
});
