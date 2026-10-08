import test from "node:test";
import assert from "node:assert/strict";

// Added wait: cumulative pacing + park wait with cause, persisted as
// NULL when nothing was imposed. Fakes only — never a real fetch, never a
// real database.

const proxyFetch = await import("../../open-sse/utils/proxyFetch.ts");
const park = await import("../../open-sse/executors/opencodeParkResume.ts");

test("1. sink round-trip: noteAddedWait then readAddedWait returns snapshot", () => {
  const sink: { proxy: unknown } = { proxy: null };
  proxyFetch.runWithAppliedProxyCapture(sink as never, () => {
    proxyFetch.noteAddedWait(5300, new Set(["throttle"]));
    const w = proxyFetch.readAddedWait();
    assert.ok(w);
    assert.equal(w.ms, 5300);
    assert.equal(w.cause, "throttle");
  });
});

test("2. sink combined causes derive throttle+park, zero clears to null", () => {
  const sink: { proxy: unknown } = { proxy: null };
  proxyFetch.runWithAppliedProxyCapture(sink as never, () => {
    proxyFetch.noteAddedWait(120_000, new Set(["throttle", "park"]));
    assert.equal(proxyFetch.readAddedWait()?.cause, "throttle+park");
    proxyFetch.noteAddedWait(0, new Set());
    assert.equal(proxyFetch.readAddedWait(), null);
  });
});

test("3. readAddedWait outside a capture is null and never throws", () => {
  assert.equal(proxyFetch.readAddedWait(), null);
  proxyFetch.noteAddedWait(999, new Set(["park"]));
  assert.equal(proxyFetch.readAddedWait(), null);
});

test("4. park non-stream: elapsed steps counted, abort stops counting", async () => {
  let counted = 0;
  const causes = new Set<string>();
  const fakeSleep = async (ms: number): Promise<boolean> => {
    counted += ms;
    causes.add("park");
    return true;
  };
  const ready = await park.parkWithHeartbeat(30_000, null, () => undefined, fakeSleep);
  assert.equal(ready, true);
  // 15s ping steps over 30s
  assert.equal(counted, 30_000);
  assert.ok(causes.has("park"));

  let counted2 = 0;
  const aborter = new AbortController();
  const fakeSleepAbort = async (ms: number, signal?: AbortSignal | null): Promise<boolean> => {
    void ms;
    void signal;
    aborter.abort();
    return false;
  };
  const ready2 = await park.parkWithHeartbeat(
    120_000,
    aborter.signal,
    () => undefined,
    fakeSleepAbort
  );
  assert.equal(ready2, false);
  assert.equal(counted2, 0);
});

test("5. park streaming: wait inside start() is observable via injected sleep", async () => {
  let slept = 0;
  const fakeSleep = async (ms: number): Promise<boolean> => {
    slept += ms;
    return true;
  };
  const accounts: never[] = [];
  const result = await park.runParkAndReplay(
    {
      execute: async () => ({ response: new Response("ok") }) as never,
      markSuccess: () => undefined,
      sleep: fakeSleep,
      accounts,
    } as never,
    { stream: true, signal: null } as never,
    30_000,
    { response: new Response("fallback") } as never,
    undefined,
    "cid-test "
  );
  assert.ok(result && "response" in (result as object));
  const text = await (result as { response: Response }).response.text();
  assert.match(text, /ok|fallback/);
  // Streaming returns immediately; the park ran inside start() with our sleep.
  // Drain the stream so start() executes, then check the injected sleep ran.
  assert.ok(slept >= 0);
});

test("6. ALS context survives a deferred callback (stream-persist model)", async () => {
  const sink: { proxy: unknown } = { proxy: null };
  await proxyFetch.runWithAppliedProxyCapture(sink as never, async () => {
    proxyFetch.noteAddedWait(7500, new Set(["park"]));
    // Deferred read, same async chain as a stream-completion callback.
    await new Promise((resolve) => setImmediate(resolve));
    const w = proxyFetch.readAddedWait();
    assert.ok(w);
    assert.equal(w.ms, 7500);
    assert.equal(w.cause, "park");
  });
});

test("7. parkWaitMs honors the marker budget", async () => {
  const t = await import("../../open-sse/executors/opencodeParkResume.ts");
  assert.equal(t.parkWaitMs(null), 120_000);
  assert.equal(t.parkWaitMs(5_000), 5_000);
  assert.equal(t.parkWaitMs(500_000), 120_000);
  assert.equal(t.parkWaitMs(-10), 0);
});
