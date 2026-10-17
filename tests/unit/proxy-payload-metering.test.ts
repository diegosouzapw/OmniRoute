import test from "node:test";
import assert from "node:assert/strict";
import {
  meterPayloadAttempt,
  submittedBodyBytes,
} from "../../open-sse/utils/proxyPayloadMetering.ts";

// Pure transport seam: no network, timers, database, processes or credentials.
test("null bodies complete without wrapping the original response", { timeout: 1000 }, async () => {
  for (const status of [200, 204, 304]) {
    const upstream = new Response(null, { status, headers: { "x-fixture": "no-body" } });
    const deltas: Array<Record<string, number>> = [];
    const response = await meterPayloadAttempt(
      async () => upstream,
      "fixture",
      {},
      (delta) => deltas.push(delta)
    );
    assert.equal(response, upstream);
    assert.equal(response.body, null);
    assert.equal(response.headers.get("x-fixture"), "no-body");
    assert.deepEqual(deltas, [
      { attempts: 1, uploadBytes: 0, knownUploadAttempts: 1 },
      { completedDownloads: 1 },
    ]);
  }
});

test(
  "submitted upload uses UTF-8 bytes and does not inspect unknown streams",
  { timeout: 1000 },
  () => {
    assert.equal(submittedBodyBytes("https://fixture.invalid", { body: "é🙂" }), 6);
    let pulls = 0;
    const body = new ReadableStream(
      {
        pull() {
          pulls++;
        },
      },
      { highWaterMark: 0 }
    );
    assert.equal(submittedBodyBytes("https://fixture.invalid", { body }), null);
    assert.equal(pulls, 0);
  }
);

test(
  "response is counted only as consumed and retains identity on partial cancellation",
  { timeout: 1000 },
  async () => {
    const deltas: Array<Record<string, number>> = [];
    let pulls = 0;
    let cancelled: unknown;
    const upstream = new Response(
      new ReadableStream<Uint8Array>(
        {
          pull(controller) {
            pulls++;
            controller.enqueue(new Uint8Array([1, 2, 3]));
          },
          cancel(reason) {
            cancelled = reason;
          },
        },
        { highWaterMark: 0 }
      ),
      { status: 429, headers: { "x-fixture": "yes" } }
    );
    Object.defineProperty(upstream, "url", { value: "https://fixture.invalid/final" });
    Object.defineProperty(upstream, "redirected", { value: true });
    const result = await meterPayloadAttempt(
      async () => upstream,
      "fixture",
      { body: "é🙂" },
      (d) => deltas.push(d)
    );
    await Promise.resolve();
    assert.equal(pulls, 0);
    assert.equal(result.url, upstream.url);
    assert.equal(result.redirected, true);
    assert.equal(result.status, 429);
    assert.equal(result.headers.get("x-fixture"), "yes");
    const reader = result.body!.getReader();
    assert.deepEqual((await reader.read()).value, new Uint8Array([1, 2, 3]));
    await reader.cancel("stop");
    assert.equal(cancelled, "stop");
    assert.deepEqual(deltas, [
      { attempts: 1, uploadBytes: 6, knownUploadAttempts: 1 },
      { downloadBytes: 3 },
      { cancelledDownloads: 1 },
    ]);
  }
);

test(
  "EOF, errors, failed sends and unknown uploads remain distinguishable",
  { timeout: 1000 },
  async () => {
    const deltas: Array<Record<string, number>> = [];
    const record = (d: Record<string, number>) => deltas.push(d);
    const result = await meterPayloadAttempt(
      async () => new Response("é🙂"),
      "fixture",
      {},
      record
    );
    assert.equal(await result.text(), "é🙂");
    assert.deepEqual(deltas, [
      { attempts: 1, uploadBytes: 0, knownUploadAttempts: 1 },
      { downloadBytes: 6 },
      { completedDownloads: 1 },
    ]);
    const failure = new Error("fixture failure");
    await assert.rejects(
      meterPayloadAttempt(
        async () => {
          throw failure;
        },
        "fixture",
        { body: new FormData() },
        record
      ),
      (e) => e === failure
    );
    assert.deepEqual(deltas.slice(-2), [
      { attempts: 1, uploadBytes: 0, knownUploadAttempts: 0 },
      { failedAttempts: 1 },
    ]);
    const errored = await meterPayloadAttempt(
      async () =>
        new Response(
          new ReadableStream(
            {
              pull(c) {
                c.error(failure);
              },
            },
            { highWaterMark: 0 }
          )
        ),
      "fixture",
      {},
      record
    );
    await assert.rejects(errored.text(), (e) => e === failure);
    assert.deepEqual(deltas.at(-1), { erroredDownloads: 1 });
  }
);

test(
  "supported byte bodies use the supplied view and unknown Request bodies stay unread",
  { timeout: 1000 },
  () => {
    const bytes = new Uint8Array(10);
    assert.equal(submittedBodyBytes("fixture", { body: bytes.subarray(2, 5) }), 3);
    assert.equal(submittedBodyBytes("fixture", { body: new DataView(bytes.buffer, 2, 4) }), 4);
    assert.equal(submittedBodyBytes("fixture", { body: bytes.buffer }), 10);
    assert.equal(submittedBodyBytes("fixture", { body: new Blob(["é"]) }), 2);
    assert.equal(submittedBodyBytes("fixture", { body: new URLSearchParams({ q: "é" }) }), 8);
    const req = new Request("https://fixture.invalid", { method: "POST", body: "abc" });
    assert.equal(submittedBodyBytes(req), null);
    assert.equal(req.bodyUsed, false);
  }
);

test(
  "cancellation during a pending read forwards once without charging discarded bytes",
  { timeout: 1000 },
  async () => {
    let started!: () => void;
    const ready = new Promise<void>((resolve) => {
      started = resolve;
    });
    let resolvePull!: () => void;
    const pending = new Promise<void>((resolve) => {
      resolvePull = resolve;
    });
    let cancels = 0;
    const source = new ReadableStream<Uint8Array>(
      {
        pull() {
          started();
          return pending;
        },
        cancel() {
          cancels++;
          resolvePull();
        },
      },
      { highWaterMark: 0 }
    );
    const deltas: Array<Record<string, number>> = [];
    const result = await meterPayloadAttempt(
      async () => new Response(source),
      "fixture",
      {},
      (d) => deltas.push(d)
    );
    const reader = result.body!.getReader();
    const read = reader.read();
    await ready;
    await reader.cancel("pending cancel");
    assert.equal((await read).done, true);
    assert.equal(cancels, 1);
    assert.deepEqual(deltas, [
      { attempts: 1, uploadBytes: 0, knownUploadAttempts: 1 },
      { cancelledDownloads: 1 },
    ]);
  }
);

test(
  "Request input abort is observed when init omits signal without consuming its body",
  { timeout: 1000 },
  async () => {
    const abort = new AbortController();
    const input = new Request("https://fixture.invalid", {
      method: "POST",
      body: "abc",
      signal: abort.signal,
    });
    const deltas: Array<Record<string, number>> = [];
    let reads = 0;
    const response = await meterPayloadAttempt(
      async () =>
        new Response(
          new ReadableStream<Uint8Array>(
            {
              pull(c) {
                reads++;
                c.enqueue(new Uint8Array([1]));
              },
            },
            { highWaterMark: 0 }
          )
        ),
      input,
      {},
      (d) => deltas.push(d)
    );
    abort.abort();
    assert.equal(reads, 0);
    assert.equal(input.bodyUsed, false);
    assert.deepEqual(deltas, [
      { attempts: 1, uploadBytes: 0, knownUploadAttempts: 0 },
      { cancelledDownloads: 1 },
    ]);
    await response.body!.cancel();
    assert.equal(deltas.length, 2);
  }
);
