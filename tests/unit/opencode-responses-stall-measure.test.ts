import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { noteStallShadow } from "../../open-sse/executors/opencodeResponsesStall.ts";

function silentBody(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({ pull() {} });
}

function talkingBody(): ReadableStream<Uint8Array> {
  const text =
    'event: response.created\ndata: {"type":"response.created","response":{"id":"r1"}}\n\n';
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
}

function watchedResult(body: ReadableStream<Uint8Array>): {
  response: Response;
} {
  return { response: new Response(body, { status: 200 }) };
}

async function settle(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 60));
}

describe("silent stream shadow measurement", () => {
  it("shadow counts a silent streamed reply while the guard stays off", async () => {
    const seen: string[] = [];
    const result = watchedResult(silentBody());
    const returned = noteStallShadow(result, {
      stream: true,
      requestFormat: "openai-responses",
      windowMs: 0,
      log: { warn: (_tag, message) => seen.push(message) },
      cid: "",
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    assert.equal(returned, result);
    await settle();
    assert.equal(seen.length, 1);
    assert.match(seen[0] as string, /silent streamed reply past 30ms/);
    assert.match(seen[0] as string, /shadow count 1/);
    await result.response.body?.cancel().catch(() => {});
  });

  it("shadow stays silent on a talking body", async () => {
    const seen: string[] = [];
    const result = watchedResult(talkingBody());
    noteStallShadow(result, {
      stream: true,
      requestFormat: "openai-responses",
      windowMs: 0,
      log: { warn: (_tag, message) => seen.push(message) },
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    await settle();
    assert.deepEqual(seen, []);
    const text = await result.response.text();
    assert.match(text, /response\.created/);
  });

  it("shadow ignores non-streamed and non-responses requests", async () => {
    const seen: string[] = [];
    noteStallShadow(watchedResult(silentBody()), {
      stream: false,
      requestFormat: "openai-responses",
      windowMs: 0,
      log: { warn: (_tag, message) => seen.push(message) },
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    noteStallShadow(watchedResult(silentBody()), {
      stream: true,
      requestFormat: "openai-chat",
      windowMs: 0,
      log: { warn: (_tag, message) => seen.push(message) },
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    await settle();
    assert.deepEqual(seen, []);
  });

  it("shadow stays off while the guard is armed", async () => {
    const seen: string[] = [];
    const result = watchedResult(silentBody());
    noteStallShadow(result, {
      stream: true,
      requestFormat: "openai-responses",
      windowMs: 50,
      log: { warn: (_tag, message) => seen.push(message) },
      readBound: () => 80_000,
      readConfigured: () => 50,
    });
    await settle();
    assert.deepEqual(seen, []);
    await result.response.body?.cancel().catch(() => {});
  });

  it("shadow storage stays constant after several requests", async () => {
    const seen: string[] = [];
    for (let i = 0; i < 5; i++) {
      const result = watchedResult(silentBody());
      noteStallShadow(result, {
        stream: true,
        requestFormat: "openai-responses",
        windowMs: 0,
        log: { warn: (_tag, message) => seen.push(message) },
        readBound: () => 80_000,
        readConfigured: () => 20,
      });
      await result.response.body?.cancel().catch(() => {});
    }
    await settle();
    assert.equal(seen.length, 5);
  });
});
