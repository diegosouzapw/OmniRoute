/**
 * tests/unit/stream-timing.test.ts
 *
 * Canonical stream instrumentation (open-sse/utils/streamTiming.ts):
 *  - TTFT = first-forwarded-SSE-chunk latency (NOT token-level) — documented
 *  - ITL = mean inter-chunk gap (chunk-latency proxy)
 *  - first-byte vs first-forward distinction
 *  - interruption marking
 *  - malformed/empty chunks do not corrupt timing
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createStreamTiming, type StreamTiming } from "../../open-sse/utils/streamTiming.ts";

// streamTiming samples a high-resolution monotonic clock (performance.now).
// `setTimeout(N)` does NOT guarantee that clock advances by a full N ms before
// the callback runs: libuv schedules timers against its own cached loop clock,
// which can trail performance.now() by a fraction of a millisecond, so a freshly
// sampled performance.now() delta occasionally lands just under the nominal
// sleep. Lower-bound timing assertions allow this scheduling slack. Event-loop
// load only makes timers fire LATE (larger delta), never earlier, so the bound
// stays safe on slow CI while remaining tight enough to prove a real delay.
const TIMER_SLACK_MS = 5;

test("ttft() is null when nothing was forwarded", () => {
  const t = createStreamTiming();
  t.markByte();
  assert.equal(t.ttftMs(), null);
  assert.equal(t.avgItlMs(), null);
});

test("ttft() measures first-forwarded-chunk latency (byte vs forward distinguished)", async () => {
  const t = createStreamTiming();
  t.markByte(); // first upstream byte arrives immediately
  await new Promise((r) => setTimeout(r, 20));
  t.markForward(); // first chunk forwarded 20ms later
  const ttft = t.ttftMs();
  assert.ok(ttft !== null && ttft >= 20 - TIMER_SLACK_MS && ttft < 5000, `ttft=${ttft}`);
  assert.ok(t.firstByteAt !== null);
  assert.ok(t.firstByteAt! < t.firstForwardAt!, "first byte precedes first forward");
});

test("avgItlMs() measures mean inter-chunk gap across multiple chunks", async () => {
  const t = createStreamTiming();
  for (let i = 0; i < 4; i++) {
    t.markForward();
    await new Promise((r) => setTimeout(r, 10));
  }
  const itl = t.avgItlMs();
  assert.ok(itl !== null && itl >= 10 - TIMER_SLACK_MS && itl < 5000, `itl=${itl}`);
  assert.equal(t.forwardedChunks, 4);
});

test("empty chunks do not corrupt timing (markByte without forward)", () => {
  const t = createStreamTiming();
  t.markByte();
  t.markByte(); // duplicate bytes are idempotent for first-byte
  assert.equal(t.ttftMs(), null, "no forward → no ttft");
  t.markForward();
  assert.ok(t.ttftMs() !== null);
});

test("malformed/keepalive-only traffic (no forward) yields no ttft", () => {
  const t = createStreamTiming();
  // Simulate a provider that only sends keepalives/blank lines, never data.
  for (let i = 0; i < 5; i++) t.markByte();
  assert.equal(t.ttftMs(), null);
  assert.equal(t.forwardedChunks, 0);
});

test("interruption is recorded and does not reset other timing", async () => {
  const t = createStreamTiming();
  t.markForward();
  await new Promise((r) => setTimeout(r, 5));
  t.markForward();
  t.markInterrupted();
  assert.equal(t.interrupted, true);
  assert.ok(t.ttftMs() !== null);
  assert.ok(t.avgItlMs() !== null);
});

test("normal completion: totalMs() is monotonic and >= first-forward latency", async () => {
  const t = createStreamTiming();
  await new Promise((r) => setTimeout(r, 15));
  t.markForward();
  const total = t.totalMs();
  const ttft = t.ttftMs();
  assert.ok(total >= 15 - TIMER_SLACK_MS, `total=${total}`);
  assert.ok(ttft !== null && ttft <= total, "ttft must be <= total duration");
});

test("max inter-chunk samples are bounded (memory bound)", async () => {
  const t = createStreamTiming();
  for (let i = 0; i < 200; i++) t.markForward();
  assert.ok(t.interChunkGaps.length <= 32, `bounded to 32 samples, got ${t.interChunkGaps.length}`);
});
