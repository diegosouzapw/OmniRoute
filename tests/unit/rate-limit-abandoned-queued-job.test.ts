import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rl-abandoned-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const resilienceSettings = await import("../../src/lib/resilience/settings.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const { cancelQueuedJob, ABANDONED_JOB_DROP_MESSAGE } =
  await import("../../open-sse/services/rateLimitManager/queuedJobCancel.ts");
const Bottleneck = (await import("bottleneck")).default;
const { createRequire } = await import("node:module");

// The rpm window is shortened so one refresh fits in a unit test. The queue
// budget is generous (a loaded CI box can take hundreds of ms just to dispatch
// the first job) and the refresh comes well after it, so the abandoned callers
// always time out before the next window opens.
const QUEUE_WAIT_MS = 1_000;
const REFRESH_MS = 2_500;

function wait(ms: number) {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
}

// Bottleneck hops through setTimeout(0) at every step, so poll instead of
// guessing a fixed delay (timer resolution varies across platforms).
async function waitFor(condition: () => boolean, message: string, timeoutMs = 5_000) {
  const deadline = Date.now() + timeoutMs;
  while (!condition()) {
    if (Date.now() >= deadline) throw new Error(message);
    await wait(5);
  }
}

async function useOverrideLimiter(connectionId: string, overrides: Record<string, number>) {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    requestsPerMinute: 0,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });
  // Same limiter the manager builds from the override, with the 60s rpm window
  // shortened so one refresh fits in a unit test.
  rateLimitManager.__setLimiterFactoryForTests(
    (options) =>
      new Bottleneck({
        ...options,
        ...(options.reservoirRefreshInterval ? { reservoirRefreshInterval: REFRESH_MS } : {}),
      })
  );
  rateLimitManager.enableRateLimitProtection(connectionId);
  rateLimitManager.refreshConnectionRateLimits(connectionId, overrides);
}

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("queue-timed-out callers do not spend the next rpm window of a live request", async () => {
  const connectionId = "abandoned-rpm-conn";
  await useOverrideLimiter(connectionId, { rpm: 1, maxWaitMs: QUEUE_WAIT_MS });

  let abandonedRuns = 0;
  const burst = Array.from({ length: 5 }, (_, i) =>
    rateLimitManager
      .withRateLimit("openai", connectionId, null, async () => {
        if (i > 0) abandonedRuns++;
        return i;
      })
      .then(
        () => "ok",
        (error: Error & { code?: string }) => error.code
      )
  );
  assert.deepEqual(await Promise.all(burst), [
    "ok",
    "RATE_LIMIT_QUEUE_TIMEOUT",
    "RATE_LIMIT_QUEUE_TIMEOUT",
    "RATE_LIMIT_QUEUE_TIMEOUT",
    "RATE_LIMIT_QUEUE_TIMEOUT",
  ]);
  await waitFor(
    () => rateLimitManager.getRateLimitStatus("openai", connectionId).queued === 0,
    "timed-out callers must leave the Bottleneck queue"
  );

  // One refresh later the window has one token again. It belongs to the live
  // request, not to the first of four abandoned jobs queued ahead of it.
  await wait(REFRESH_MS + 50);
  assert.equal(
    await rateLimitManager.withRateLimit("openai", connectionId, null, async () => "live"),
    "live"
  );
  assert.equal(abandonedRuns, 0, "abandoned work must never run");
});

test("an aborted queued caller leaves the queue immediately", async () => {
  const connectionId = "abandoned-abort-conn";
  await useOverrideLimiter(connectionId, { rpm: 1 });

  assert.equal(
    await rateLimitManager.withRateLimit("openai", connectionId, null, async () => "first"),
    "first"
  );
  const controller = new AbortController();
  let ran = false;
  const pending = rateLimitManager.withRateLimit(
    "openai",
    connectionId,
    null,
    async () => {
      ran = true;
    },
    controller.signal
  );
  await waitFor(
    () => rateLimitManager.getRateLimitStatus("openai", connectionId).queued === 1,
    "the second caller never queued behind the spent reservoir"
  );
  controller.abort();
  await assert.rejects(pending, { name: "AbortError" });
  await waitFor(
    () => rateLimitManager.getRateLimitStatus("openai", connectionId).queued === 0,
    "the aborted caller must leave the Bottleneck queue"
  );

  await wait(REFRESH_MS + 50);
  assert.equal(
    await rateLimitManager.withRateLimit("openai", connectionId, null, async () => "live"),
    "live"
  );
  assert.equal(ran, false);
});

test("cancelQueuedJob removes only the named QUEUED job and keeps FIFO order", async () => {
  const limiter = new Bottleneck({ maxConcurrent: 1 });
  const order: string[] = [];
  const { promise: gate, resolve: openGate } = Promise.withResolvers<void>();
  const running = limiter.schedule({ id: "running" }, async () => {
    await gate;
    order.push("running");
  });
  const jobs = ["a", "b", "c"].map((id) =>
    limiter
      .schedule({ id }, async () => {
        order.push(id);
        return "ran";
      })
      .catch((error: Error) => error.message)
  );
  await waitFor(() => limiter.counts().QUEUED === 3, "jobs a, b and c never queued");

  assert.equal(await cancelQueuedJob(limiter, "running"), false, "an executing job stays");
  assert.equal(await cancelQueuedJob(limiter, "missing"), false);
  assert.equal(await cancelQueuedJob(limiter, "b"), true);
  assert.equal(await cancelQueuedJob(limiter, "b"), false, "already removed");
  assert.equal(limiter.counts().QUEUED, 2);
  assert.equal(limiter.queued(), 2);

  openGate();
  await running;
  assert.deepEqual(await Promise.all(jobs), ["ran", ABANDONED_JOB_DROP_MESSAGE, "ran"]);
  assert.deepEqual(order, ["running", "a", "c"]);
  await limiter.disconnect();
});

// cancelQueuedJob reaches Bottleneck internals (no public cancel API). A
// Bottleneck upgrade that reshapes them would silently degrade the fix back to
// "abandoned jobs stay queued" (cancelQueuedJob falls back to `false`), so pin
// the exact version and shape it was verified against and fail loudly here.
type GuardNode = {
  value: { options?: { id?: string }; doDrop?: unknown };
  prev: unknown;
  next: unknown;
};
type GuardList = { _first: GuardNode | null; _last: unknown; length: number; decr?: unknown };
type GuardInternals = {
  _submitLock?: { schedule?: unknown };
  _registerLock?: { schedule?: unknown };
  _queues?: { _lists?: GuardList[] };
};

test("Bottleneck internals used by cancelQueuedJob are still the verified shape", async () => {
  const require = createRequire(import.meta.url);
  const { version } = require("bottleneck/package.json") as { version: string };
  assert.equal(
    version,
    "2.19.5",
    "bottleneck changed version: re-verify open-sse/services/rateLimitManager/queuedJobCancel.ts " +
      "(_submitLock, _registerLock, _queues._lists DLList, job.options.id, job.doDrop) then update this pin"
  );

  const limiter = new Bottleneck({ maxConcurrent: 1 });
  const internals = limiter as unknown as GuardInternals;
  assert.equal(typeof internals._submitLock?.schedule, "function", "_submitLock.schedule");
  assert.equal(typeof internals._registerLock?.schedule, "function", "_registerLock.schedule");
  assert.ok(Array.isArray(internals._queues?._lists), "_queues._lists must be an array");
  assert.equal(typeof limiter.jobStatus, "function", "jobStatus");

  const { promise: gate, resolve: openGate } = Promise.withResolvers<void>();
  const running = limiter.schedule({ id: "guard-running" }, () => gate);
  const queued = limiter.schedule({ id: "guard-queued" }, async () => "ran").catch(() => "dropped");
  await waitFor(() => limiter.jobStatus("guard-queued") === "QUEUED", "guard job never queued");

  const list = internals._queues?._lists?.find((l) => l?._first);
  assert.ok(list, "a queued job must sit in one of _queues._lists");
  for (const key of ["_first", "_last", "length"]) assert.ok(key in list, `DLList.${key}`);
  assert.equal(typeof list.decr, "function", "DLList.decr");
  const node = list._first as GuardNode;
  for (const key of ["value", "prev", "next"]) assert.ok(key in node, `DLList node.${key}`);
  assert.equal(node.value.options?.id, "guard-queued", "job.options.id");
  assert.equal(typeof node.value.doDrop, "function", "job.doDrop");

  assert.equal(await cancelQueuedJob(limiter, "guard-queued"), true);
  openGate();
  await running;
  assert.equal(await queued, "dropped");
  await limiter.disconnect();
});
