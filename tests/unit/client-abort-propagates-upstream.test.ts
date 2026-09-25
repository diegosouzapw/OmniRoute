import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";

const { executeWithUpstreamStartTimeout } =
  await import("../../open-sse/handlers/chatCore/upstreamTimeouts.ts");
const { createStreamController, pipeWithDisconnect } =
  await import("../../open-sse/utils/streamHandler.ts");
const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitFor(cond: () => boolean, ms = 2000) {
  const end = Date.now() + ms;
  while (!cond() && Date.now() < end) await sleep(10);
  return cond();
}

// Fake upstream: sends SSE headers + a first chunk, then keeps "decoding" until
// the socket closes. Records whether the request was aborted after headers.
function startFakeUpstream() {
  const state = { closedEarly: false, reqs: 0 };
  const server = http.createServer((_req, res) => {
    state.reqs++;
    res.writeHead(200, { "content-type": "text/event-stream" });
    res.write('data: {"choices":[{"delta":{"content":"a"}}]}\n\n');
    const t = setInterval(() => res.write('data: {"choices":[{"delta":{"content":"b"}}]}\n\n'), 20);
    res.on("close", () => {
      clearInterval(t);
      if (!res.writableEnded) state.closedEarly = true;
    });
  });
  return new Promise<{ url: string; state: typeof state; close: () => Promise<void> }>((resolve) =>
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as AddressInfo;
      resolve({
        url: `http://127.0.0.1:${port}/`,
        state,
        close: () =>
          new Promise<void>((r) => {
            server.closeAllConnections();
            server.close(() => r());
          }),
      });
    })
  );
}

test("start-timeout wrapper: client abort after headers still aborts the upstream fetch", async () => {
  const up = await startFakeUpstream();
  try {
    const client = new AbortController();
    const res = await executeWithUpstreamStartTimeout({
      executor: {},
      provider: "test",
      model: "m",
      connectionTimeoutMs: 5000,
      signal: client.signal,
      execute: (signal) => fetch(up.url, { signal }),
    });
    const reader = res.body!.getReader();
    await reader.read(); // headers + first chunk received: the race has settled
    assert.equal(up.state.closedEarly, false);

    client.abort("client_gone");

    assert.equal(await waitFor(() => up.state.closedEarly), true, "upstream saw the abort");
    await assert.rejects(async () => {
      for (;;) if ((await reader.read()).done) break;
    });
  } finally {
    await up.close();
  }
});

test("start-timeout wrapper: non-aborted stream is unchanged and completes", async () => {
  const chunks = ["a", "b", "c"];
  const client = new AbortController();
  const res = await executeWithUpstreamStartTimeout({
    executor: {},
    provider: "test",
    model: "m",
    connectionTimeoutMs: 5000,
    signal: client.signal,
    execute: async () => new Response(chunks.join("")),
  });
  assert.equal(await res.text(), "abc");
});

test("start-timeout wrapper: failed attempt does not keep the client-abort link", async () => {
  const client = new AbortController();
  let inner: AbortSignal | null = null;
  await assert.rejects(
    executeWithUpstreamStartTimeout({
      executor: {},
      provider: "test",
      model: "m",
      connectionTimeoutMs: 5000,
      signal: client.signal,
      execute: async (s) => {
        inner = s;
        throw new Error("boom");
      },
    }),
    /boom/
  );
  client.abort();
  assert.equal(inner!.aborted, false);
});

test("pipeWithDisconnect: client disconnect cancels the upstream body", async () => {
  let upstreamCancelled: unknown = null;
  let i = 0;
  const body = new ReadableStream<Uint8Array>({
    async pull(c) {
      await sleep(10);
      c.enqueue(new TextEncoder().encode(`data: ${i++}\n\n`));
    },
    cancel(reason) {
      upstreamCancelled = reason ?? "cancelled";
    },
  });
  const clientAbort = new AbortController();
  const sc = createStreamController({
    provider: "test",
    model: "m",
    clientAbortSignal: clientAbort.signal,
  });
  const out = pipeWithDisconnect(
    new Response(body),
    new TransformStream<Uint8Array, Uint8Array>(),
    sc
  );
  const reader = out.getReader();
  await reader.read();
  clientAbort.abort();
  // Pull-side path: handleDisconnect flips isConnected, next pull must cancel upstream.
  await Promise.race([reader.read().catch(() => {}), sleep(500)]);
  assert.equal(await waitFor(() => upstreamCancelled !== null), true);
});

test("pipeWithDisconnect: a normal stream is forwarded intact and not cancelled", async () => {
  let cancelled = false;
  const enc = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(enc.encode('data: {"choices":[{"delta":{"content":"hi"}}]}\n\n'));
      c.enqueue(enc.encode('data: {"choices":[{"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n'));
      c.close();
    },
    cancel() {
      cancelled = true;
    },
  });
  const sc = createStreamController({ provider: "test", model: "m" });
  const out = pipeWithDisconnect(
    new Response(body),
    new TransformStream<Uint8Array, Uint8Array>(),
    sc
  );
  const text = await new Response(out).text();
  assert.match(text, /hi/);
  assert.match(text, /\[DONE\]/);
  assert.equal(cancelled, false);
});

const silentLog = { warn() {} };

test("validateResponseQuality: peek exits promptly on client abort", async () => {
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    pull() {
      return new Promise(() => {}); // upstream still prefilling: never yields
    },
    cancel() {
      cancelled = true;
    },
  });
  const res = new Response(body, { headers: { "content-type": "text/event-stream" } });
  const ac = new AbortController();
  const p = validateResponseQuality(res, true, silentLog, undefined, ac.signal);
  await sleep(30);
  const t0 = Date.now();
  ac.abort();
  const out = await Promise.race([p, sleep(1000).then(() => "hung")]);
  assert.notEqual(out, "hung");
  assert.ok(Date.now() - t0 < 500);
  assert.equal(await waitFor(() => cancelled), true);
});

test("validateResponseQuality: already-aborted signal returns without reading", async () => {
  const res = new Response(new ReadableStream({ pull: () => new Promise(() => {}) }), {
    headers: { "content-type": "text/event-stream" },
  });
  const ac = new AbortController();
  ac.abort();
  const out = await Promise.race([
    validateResponseQuality(res, true, silentLog, undefined, ac.signal),
    sleep(1000).then(() => "hung"),
  ]);
  assert.notEqual(out, "hung");
});

test("validateResponseQuality: non-aborted stream with signal behaves as before", async () => {
  const enc = new TextEncoder();
  const res = new Response(
    new ReadableStream({
      start(c) {
        c.enqueue(enc.encode('data: {"choices":[{"delta":{"content":"x"}}]}\n\n'));
        c.enqueue(enc.encode("data: [DONE]\n\n"));
        c.close();
      },
    }),
    { headers: { "content-type": "text/event-stream" } }
  );
  const out = await validateResponseQuality(
    res,
    true,
    silentLog,
    undefined,
    new AbortController().signal
  );
  assert.equal(out.valid, true);
  assert.ok(out.clonedResponse);
  assert.match(await out.clonedResponse!.text(), /\[DONE\]/);
});
