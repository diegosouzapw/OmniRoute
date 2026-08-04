/**
 * TDD regression test — rate-limit watchdog wedge recovery
 * (open-sse/services/rateLimitManager.ts watchdogTick).
 *
 * Live incident (dashboard log id 1784465227489-a2cbc0): a request sat with
 * ZERO real upstream activity (queued=2, running=0, executing=0 the entire
 * time) until the real client (a separate, already-running agent sharing the
 * same Gemini account) gave up and disconnected after ~60s. The watchdog DID
 * detect the wedge and fire "force-resetting" at ~26s in, but its recovery —
 * `limiter.disconnect()` — only releases Bottleneck's heartbeat timer; it does
 * NOT reject the jobs already QUEUED on that instance. Callers still awaiting
 * `limiter.schedule()` on the (now orphaned) old instance just hang forever —
 * getLimiter() only ever hands out a FRESH instance to *future* callers — so
 * the dispatch is left dangling until the outer ~300s per-target timeout
 * eventually aborts it, long past most real clients' patience.
 *
 * The fix switches the wedge branch to `limiter.stop({ dropWaitingJobs: true })`,
 * which Bottleneck's own contract (node_modules/bottleneck/bottleneck.d.ts
 * StopOptions) guarantees rejects exactly the RECEIVED/QUEUED/RUNNING jobs on
 * THAT instance immediately. This test verifies that underlying contract
 * directly against the real `bottleneck` dependency (not a mock) — reservoir:0
 * is the one way to deterministically force a genuine QUEUED-with-nothing-
 * running state without needing Bottleneck's internal timers to actually wedge,
 * since OmniRoute's own public settings API treats a "0" override as
 * "unlimited" (resolveRpm/resolveMaxConcurrent) and can never produce a true
 * zero-capacity limiter through withRateLimit() itself.
 */
import test from "node:test";
import assert from "node:assert/strict";
import Bottleneck from "bottleneck";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("disconnect() leaves a genuinely queued (nothing-running) job hanging forever", async () => {
  const limiter = new Bottleneck({ reservoir: 0 }); // zero capacity — job queues, never runs
  let settled = false;
  const jobPromise = limiter
    .schedule(() => Promise.resolve("never-reached"))
    .then(
      (v) => {
        settled = true;
        return v;
      },
      (err) => {
        settled = true;
        throw err;
      }
    );

  await wait(20);
  assert.equal(limiter.counts().QUEUED, 1, "job should be queued (reservoir exhausted)");
  assert.equal(limiter.counts().RUNNING, 0, "nothing should be running");
  assert.equal(limiter.counts().EXECUTING, 0, "nothing should be executing");

  await limiter.disconnect();
  await wait(50);

  assert.equal(
    settled,
    false,
    "disconnect() must NOT settle the queued job — this is exactly the hang the wedge-recovery bug hit"
  );

  // Prevent an unhandled rejection warning when the process exits with this
  // promise still pending — it will never settle, which is the point of the test.
  jobPromise.catch(() => {});
});

test("stop({ dropWaitingJobs: true }) rejects a genuinely queued (nothing-running) job immediately", async () => {
  const limiter = new Bottleneck({ reservoir: 0 });
  const jobPromise = limiter.schedule(() => Promise.resolve("never-reached"));
  // Attach a rejection handler synchronously so Node never sees an unhandled
  // rejection window between scheduling and the assertion below.
  const settledPromise = jobPromise.then(
    (v) => ({ ok: true as const, v }),
    (err) => ({ ok: false as const, err })
  );

  await wait(20);
  assert.equal(limiter.counts().QUEUED, 1, "job should be queued (reservoir exhausted)");
  assert.equal(limiter.counts().RUNNING, 0, "nothing should be running");

  // Mirrors rateLimitManager.ts's wedge-recovery call exactly.
  await limiter.stop({
    dropWaitingJobs: true,
    dropErrorMessage: "rate-limit-watchdog-wedge-reset",
  });

  const settled = await Promise.race([settledPromise, wait(500).then(() => "timed-out" as const)]);
  assert.notEqual(
    settled,
    "timed-out",
    "expected the queued job to reject promptly after stop({ dropWaitingJobs: true }), not hang"
  );
  assert.equal((settled as { ok: boolean }).ok, false, "expected the queued job to reject");
  assert.equal(
    (settled as { ok: false; err: Error }).err.message,
    "rate-limit-watchdog-wedge-reset",
    "expected Bottleneck to reject with our dropErrorMessage verbatim"
  );
});

test("watchdog wedge branch uses stop({ dropWaitingJobs: true }), not disconnect()", async () => {
  const source = await import("node:fs/promises").then((fs) =>
    fs.readFile(new URL("../../open-sse/services/rateLimitManager.ts", import.meta.url), "utf8")
  );

  const wedgeBlockStart = source.indexOf("WEDGED:");
  assert.ok(wedgeBlockStart >= 0, "expected to find the WEDGED log line in rateLimitManager.ts");
  const wedgeBlock = source.slice(wedgeBlockStart, wedgeBlockStart + 1500);

  assert.ok(
    wedgeBlock.includes("stop({ dropWaitingJobs: true"),
    "wedge-recovery branch must call stop({ dropWaitingJobs: true }) so orphaned queued jobs reject " +
      "promptly instead of hanging until the outer per-target timeout (live incident 1784465227489-a2cbc0)"
  );
  assert.ok(
    !/limiter\.disconnect\(\)/.test(wedgeBlock),
    "wedge-recovery branch must not still call disconnect() — it doesn't reject queued jobs"
  );
});
