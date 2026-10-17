// A long reasoning prelude can push the first visible output past the early probe
// window. `streamEmittedOutput()` must still report it: a failure after that point is
// final for the request, so the failure path must not retry an already delivered stream.
import test from "node:test";
import assert from "node:assert/strict";

// One write = one forwarded observation on the passthrough sink (see sseOutputSink.ts).
delete process.env.SSE_FRAME_COALESCE_MS;

const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { streamEmittedOutput } = await import("../../open-sse/utils/streamTiming.ts");

const silentFrame = (i: number) =>
  `data: {"id":"c${i}","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant"}}]}\n\n`;
const contentFrame = (i: number) =>
  `data: {"id":"c${i}","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"x"}}]}\n\n`;

const silentFrames = (from: number, to: number) => {
  const frames: string[] = [];
  for (let i = from; i < to; i++) frames.push(silentFrame(i));
  return frames;
};

/** Forward every chunk, then read {@link streamEmittedOutput} while the stream is live. */
async function emittedWhileLive(chunks: string[]): Promise<boolean> {
  const transform = createPassthroughStreamWithLogger("grok-cli", null, null, "grok-4.6");
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  for (const chunk of chunks) {
    await writer.write(new TextEncoder().encode(chunk));
    // Read one forwarded chunk per write so every observation happened before the live read.
    await reader.read();
  }
  const emitted = streamEmittedOutput(transform);
  // Close + drain so the transform's idle watchdog is cleared and the runner exits.
  await writer.close().catch(() => {});
  while (!(await reader.read().catch(() => ({ done: true }))).done);
  return emitted;
}

test("output that starts after the first 64 forwarded chunks is reported once a later chunk is probed", async () => {
  const chunks = [...silentFrames(0, 199)];
  for (let i = 199; i < 209; i++) chunks.push(contentFrame(i));
  assert.equal(await emittedWhileLive(chunks), true);
});

test("a silent stream of more than 64 chunks reports no output", async () => {
  assert.equal(await emittedWhileLive(silentFrames(0, 209)), false);
});

test("output within the first 64 forwarded chunks is reported immediately", async () => {
  assert.equal(await emittedWhileLive([silentFrame(0), silentFrame(1), contentFrame(2)]), true);
});

test("a single late chunk before the next probe stays unreported", async () => {
  const chunks = [...silentFrames(0, 199), contentFrame(199)];
  assert.equal(await emittedWhileLive(chunks), false);
});
