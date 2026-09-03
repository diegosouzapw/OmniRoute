import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

// Import the patch module to test it in isolation
import { applyBottleneckDoExpirePatch } from "../../../open-sse/services/bottleneckPatch.ts";

// Bottleneck's internal Job / States classes are not part of the public
// exports, so load them directly to build a deterministic RUNNING-state job.
// A real schedule() parks the job in QUEUED then advances it through RUNNING
// on _run; reproducing that exactly lets us hit the RUNNING branch that the
// expiry timer reaches — the branch the (now-fixed) patch is responsible for.
const require = createRequire(import.meta.url);
const BottleneckJob = require("bottleneck/lib/Job.js");
const BottleneckStates = require("bottleneck/lib/States.js");

const fakeEvents = { trigger: async () => false };

/** Build a Job that Bottleneck `_run` accepts (state QUEUED under options.id). */
function buildParkedJob() {
  const states = new BottleneckStates(["RECEIVED", "QUEUED", "RUNNING", "EXECUTING", "DONE"]);
  const job = new BottleneckJob(
    () => {},
    [],
    { id: "patch-under-test", expiration: 5000 },
    { id: "patch-under-test" },
    true,
    fakeEvents,
    states,
    Promise
  );
  states.start(job.options.id); // -> RECEIVED (idx 0)
  states.next(job.options.id); // -> QUEUED (idx 1) — what _run expects
  return { job, states };
}

test("applyBottleneckDoExpirePatch is idempotent", () => {
  // Should not throw on multiple calls
  applyBottleneckDoExpirePatch();
  applyBottleneckDoExpirePatch();
  assert.ok(true, "patch applied twice without error");
});

test("patched _run still dispatches jobs correctly", async () => {
  applyBottleneckDoExpirePatch();

  const { default: Bottleneck } = await import("bottleneck");
  const limiter = new Bottleneck({
    id: "test-doexpire-patch",
    maxConcurrent: 2,
    minTime: 0,
  });

  // Job should execute normally (no expiration triggered)
  const result = await limiter.schedule({ expiration: 5000 }, async () => {
    return "patched-ok";
  });

  assert.equal(result, "patched-ok");
  await limiter.disconnect();
});

test("patched doExpire advances a RUNNING job to EXECUTING instead of crashing", async () => {
  applyBottleneckDoExpirePatch();

  const { default: Bottleneck } = await import("bottleneck");
  const limiter = new Bottleneck({ id: "test-doexpire-parked", maxConcurrent: 1, minTime: 0 });
  try {
    const { job, states } = buildParkedJob();
    // _run calls doRun (QUEUED -> RUNNING), then parks the job in RUNNING for
    // `wait` ms before dispatching to EXECUTING. A large wait holds it in the
    // exact state the expiry timer can reach — the branch the patch guards.
    limiter._run("parked", job, 10000);
    assert.equal(states.jobStatus(job.options.id), "RUNNING", "job must be RUNNING before expiry");

    // Fire doExpire while the job is RUNNING. Unpatched Bottleneck compares
    // `options.id === "RUNNING"` (always false), so _assertStatus("EXECUTING")
    // throws and the job is stuck forever. The patched doExpire must advance
    // RUNNING -> EXECUTING first, then run the original doExpire cleanly.
    job.doExpire(() => true, () => {}, () => {});
    assert.equal(
      states.jobStatus(job.options.id),
      "EXECUTING",
      "patched doExpire must advance a RUNNING job to EXECUTING before the original runs"
    );
  } finally {
    await limiter.disconnect();
  }
});

test("unpatched Bottleneck doExpire throws on a RUNNING job (the leak the patch guards)", async () => {
  // Lock the motivating bug: with Job.js:162 comparing options.id === "RUNNING"
  // (always false) the job is never advanced, so _assertStatus("EXECUTING")
  // throws and the job is stuck in RUNNING with a running-slot never freed.
  // Proving this FAILS without the patch is what makes the patched test above
  // a real signal rather than a vacuous pass-on-empty.
  const { job, states } = buildParkedJob();
  states.next(job.options.id); // -> RUNNING
  assert.equal(states.jobStatus(job.options.id), "RUNNING");
  assert.throws(
    () => BottleneckJob.prototype.doExpire.call(job, () => true, () => {}, () => {}),
    /expected EXECUTING/,
    "the unpatched doExpire must throw when the job is RUNNING, or the bug is already fixed upstream and the patch is dead"
  );
  // Stays stuck in RUNNING (no advance leaked into a broken slot count).
  assert.equal(states.jobStatus(job.options.id), "RUNNING");
});

test("patch does not affect jobs without expiration", async () => {
  applyBottleneckDoExpirePatch();

  const { default: Bottleneck } = await import("bottleneck");
  const limiter = new Bottleneck({
    id: "test-no-expiration",
    maxConcurrent: 2,
    minTime: 0,
  });

  // Job without expiration should work exactly as before
  const result = await limiter.schedule(async () => {
    return "no-expire";
  });

  assert.equal(result, "no-expire");
  await limiter.disconnect();
});
