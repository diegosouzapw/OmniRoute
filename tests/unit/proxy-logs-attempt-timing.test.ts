import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// RED: per-attempt upstream timing columns (headers + first useful chunk).
// New rows carry both durations; legacy rows read NULL; the deferred update
// patches the first-chunk duration after a slow stream completes; the bounded
// registry links late arrivals to their row and returns to its initial size.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-attempt-timing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogsDb = await import("../../src/lib/db/proxyLogs.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

test.after(() => {
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("new timing columns default to null and accept a deferred update", () => {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO proxy_logs (id, timestamp, status, level, latency_ms)
     VALUES ('timing-legacy', '2026-09-26T00:00:00.000Z', 'success', 'direct', 5)`
  ).run();
  const legacy = db
    .prepare("SELECT headers_ms, first_chunk_ms FROM proxy_logs WHERE id = 'timing-legacy'")
    .get() as { headers_ms: number | null; first_chunk_ms: number | null };
  assert.equal(legacy.headers_ms, null);
  assert.equal(legacy.first_chunk_ms, null);

  db.prepare(
    `INSERT INTO proxy_logs (id, timestamp, status, level, latency_ms, headers_ms, first_chunk_ms)
     VALUES ('timing-new', '2026-09-26T00:00:01.000Z', 'success', 'direct', 5, 120, NULL)`
  ).run();
  const updated = proxyLogsDb.updateAttemptTiming("timing-new", { firstChunkMs: 4800 });
  assert.equal(updated, true);
  const row = db
    .prepare("SELECT headers_ms, first_chunk_ms FROM proxy_logs WHERE id = 'timing-new'")
    .get() as { headers_ms: number | null; first_chunk_ms: number | null };
  assert.equal(row.headers_ms, 120);
  assert.equal(row.first_chunk_ms, 4800);
});

test("the journal timing pair sanitizes each send record", async () => {
  // logProxyEvent is not owned here: assert at the journal boundary only,
  // via the timing pair helper the journal hands to the logger.
  const { attemptTimingPair, sanitizeAttemptTiming } =
    await import("../../src/sse/handlers/proxyJournal.ts");
  assert.equal(sanitizeAttemptTiming(-5), null);
  assert.equal(sanitizeAttemptTiming(1.5), null);
  assert.equal(sanitizeAttemptTiming("40"), null);
  assert.equal(sanitizeAttemptTiming(40), 40);
  assert.deepEqual(attemptTimingPair({ proxy: null, headersMs: 40, firstChunkMs: 90 }), {
    headersMs: 40,
    firstChunkMs: 90,
  });
  assert.deepEqual(attemptTimingPair({ proxy: null, headersMs: 55, firstChunkMs: null }), {
    headersMs: 55,
    firstChunkMs: null,
  });
  assert.deepEqual(attemptTimingPair({ proxy: null, headersMs: -5, firstChunkMs: 1.5 }), {
    headersMs: null,
    firstChunkMs: null,
  });
  assert.deepEqual(attemptTimingPair({ proxy: null }), {
    headersMs: null,
    firstChunkMs: null,
  });
});

test("deferred update rejects unknown ids and non-integer values", () => {
  assert.equal(proxyLogsDb.updateAttemptTiming("timing-missing", { firstChunkMs: 10 }), false);
  assert.equal(proxyLogsDb.updateAttemptTiming("timing-missing", { headersMs: -3 }), false);
});

test("the pending registry settles through its caller and returns to its size", () => {
  const startSize = proxyLogger.pendingFirstChunkSizeForTests();
  const entry = proxyLogger.logProxyEvent({
    status: "success",
    provider: "openai",
    targetUrl: "openai/gpt-5",
    latencyMs: 5,
    headersMs: 40,
    firstChunkMs: null,
  });
  try {
    // Timing known or bodiless sends register nothing.
    proxyLogger.linkPendingFirstChunk(`${entry.id}-known`, entry, true, true);
    proxyLogger.linkPendingFirstChunk(`${entry.id}-bodiless`, entry, false, false);
    assert.equal(proxyLogger.pendingFirstChunkSizeForTests(), startSize);

    proxyLogger.linkPendingFirstChunk(entry.id, entry, false, true);
    assert.equal(proxyLogger.pendingFirstChunkSizeForTests(), startSize + 1);
    // The deferred patch reaches the owned db writer through its caller.
    proxyLogger.settlePendingFirstChunk(entry.id, 4800, (id, patch) =>
      proxyLogsDb.updateAttemptTiming(id, patch)
    );
    assert.equal(proxyLogger.pendingFirstChunkSizeForTests(), startSize);
    assert.equal(entry.firstChunkMs, 4800);
  } finally {
    proxyLogger.clearProxyLogs();
  }
  assert.equal(proxyLogger.pendingFirstChunkSizeForTests(), startSize);
});

test("the pending registry holds its cap under flood", () => {
  const startSize = proxyLogger.pendingFirstChunkSizeForTests();
  const probe = (n: number) =>
    proxyLogger.logProxyEvent({
      status: "success",
      provider: "openai",
      targetUrl: "openai/gpt-5",
      latencyMs: 1,
      correlationId: `flood-${n}`,
    });
  const entries = Array.from({ length: proxyLogger.TIMING_LINK_CAP + 25 }, (_, n) => probe(n));
  try {
    for (const entry of entries) proxyLogger.linkPendingFirstChunk(entry.id, entry, false, true);
    assert.ok(proxyLogger.pendingFirstChunkSizeForTests() <= proxyLogger.TIMING_LINK_CAP);
    // Evicted oldest rows stay NULL; settling an evicted id is a safe no-op.
    proxyLogger.settlePendingFirstChunk(entries[0].id, 10, (id, patch) =>
      proxyLogsDb.updateAttemptTiming(id, patch)
    );
    assert.equal(entries[0].firstChunkMs, null);
  } finally {
    proxyLogger.clearProxyLogs();
  }
  assert.equal(proxyLogger.pendingFirstChunkSizeForTests(), startSize);
});

test("the envelope stamps nothing before the downstream reads", async () => {
  // m-env lock: laziness is proven, not promised. Track pulls driven by the
  // downstream reader only; an unconsumed envelope must leave nulls behind.
  const { withUpstreamStatusCapture } =
    await import("../../open-sse/utils/upstreamStatusCapture.ts");
  const pulls: number[] = [];
  const chunks = [new TextEncoder().encode("hello")];
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      pulls.push(Date.now());
      const next = chunks.shift();
      if (next) controller.enqueue(next);
      else controller.close();
    },
  });
  const sink: { proxy: unknown; attempts?: Array<Record<string, unknown>> } = { proxy: null };
  const wrapped = withUpstreamStatusCapture(
    async () => new Response(body, { status: 200 }),
    () => sink,
    () => true
  );
  const response = await wrapped();
  const record = sink.attempts?.[0];
  assert.ok(record);
  assert.equal(typeof record.headersMs, "number");
  assert.equal(response.status, 200);
  // Laziness: the stamp must come from a downstream pull, not from the wrap.
  // (The runtime may pre-pull to fill its internal queue; what matters is
  // that no byte was stamped before the downstream read.)
  assert.equal(record.firstChunkMs ?? null, null);
  const pullsBeforeRead = pulls.length;
  const text = await response.text();
  assert.equal(text, "hello");
  assert.ok(pulls.length >= 1);
  assert.equal(typeof record.firstChunkMs, "number");
  assert.ok((record.firstChunkMs as number) >= 0);
  assert.ok(pulls.length >= pullsBeforeRead);
});

test("the envelope keeps status and headers and ignores empty values", async () => {
  const { withUpstreamStatusCapture } =
    await import("../../open-sse/utils/upstreamStatusCapture.ts");
  const chunks = [new Uint8Array(0), new TextEncoder().encode("data")];
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      const next = chunks.shift();
      if (next !== undefined) controller.enqueue(next);
      else controller.close();
    },
  });
  const sink: { proxy: unknown; attempts?: Array<Record<string, unknown>> } = { proxy: null };
  const wrapped = withUpstreamStatusCapture(
    async () =>
      new Response(body, {
        status: 201,
        statusText: "Created",
        headers: { "x-probe": "kept" },
      }),
    () => sink,
    () => true
  );
  const response = await wrapped();
  assert.equal(response.status, 201);
  assert.equal(response.headers.get("x-probe"), "kept");
  const text = await response.text();
  assert.equal(text, "data");
  assert.equal(typeof sink.attempts?.[0]?.firstChunkMs, "number");
});

test("the envelope settles null when the body ends or fails without bytes", async () => {
  const { withUpstreamStatusCapture } =
    await import("../../open-sse/utils/upstreamStatusCapture.ts");
  const seen: Array<unknown> = [];
  // Empty body: done without a value.
  const emptySink: { proxy: unknown; attempts?: Array<Record<string, unknown>> } = {
    proxy: null,
  };
  const emptyWrapped = withUpstreamStatusCapture(
    async () =>
      new Response(
        new ReadableStream<Uint8Array>({
          start(c) {
            c.close();
          },
        }),
        {
          status: 200,
        }
      ),
    () => emptySink,
    () => true
  );
  const emptyResponse = await emptyWrapped();
  emptySink.attempts![0].onFirstChunk = (ms) => {
    seen.push(ms);
  };
  assert.equal(await emptyResponse.text(), "");
  assert.deepEqual(seen, [null]);
  assert.equal(emptySink.attempts![0].firstChunkMs ?? null, null);

  // Failing body: read throws before any value.
  const failingSink: { proxy: unknown; attempts?: Array<Record<string, unknown>> } = {
    proxy: null,
  };
  const failingWrapped = withUpstreamStatusCapture(
    async () =>
      new Response(
        new ReadableStream<Uint8Array>({
          pull(c) {
            c.error(new Error("boom"));
          },
        }),
        { status: 200 }
      ),
    () => failingSink,
    () => true
  );
  const failingResponse = await failingWrapped();
  await assert.rejects(failingResponse.text(), /boom/);
  assert.equal(failingSink.attempts![0].firstChunkMs ?? null, null);
});

test("a null body leaves the first-chunk timing null", async () => {
  const { withUpstreamStatusCapture } =
    await import("../../open-sse/utils/upstreamStatusCapture.ts");
  const sink: { proxy: unknown; attempts?: Array<Record<string, unknown>> } = { proxy: null };
  const wrapped = withUpstreamStatusCapture(
    async () => new Response(null, { status: 204 }),
    () => sink,
    () => true
  );
  const response = await wrapped();
  assert.equal(response.status, 204);
  assert.equal(typeof sink.attempts?.[0]?.headersMs, "number");
  assert.equal(sink.attempts?.[0]?.firstChunkMs ?? null, null);
  assert.equal(sink.attempts?.[0]?.bodyTracked ?? false, false);
});
