import { test } from "node:test";
import assert from "node:assert/strict";
import Bottleneck from "bottleneck";

const { runAsProbe, isProbeContext } = await import("../../src/shared/utils/probeOrigin.ts");

test("runAsProbe propagates through nested async/await; false outside", async () => {
  assert.equal(isProbeContext(), false);
  await runAsProbe(async () => {
    assert.equal(isProbeContext(), true);
    await Promise.resolve();
    const inner = async () => {
      await Promise.resolve();
      return isProbeContext();
    };
    assert.equal(await inner(), true);
    await new Promise((r) => setTimeout(r, 5));
    assert.equal(isProbeContext(), true);
  });
  assert.equal(isProbeContext(), false);
});

test("queued scheduler job wrapped in runAsProbe keeps the probe context", async () => {
  const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 50 });
  let insideQueuedJob: boolean | null = null;
  // Schedule job 1 WITHOUT awaiting it so job 2 really queues behind it
  // (maxConcurrent 1 + minTime 50) — the queued job must execute with the
  // probe context established at scheduling time.
  const job1 = limiter.schedule(() => new Promise((r) => setTimeout(r, 30)));
  const job2 = limiter.schedule(() =>
    runAsProbe(() => {
      insideQueuedJob = isProbeContext();
      return Promise.resolve();
    })
  );
  await Promise.all([job1, job2]);
  assert.equal(insideQueuedJob, true);
});
