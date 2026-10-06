import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rate-limit-manager-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports are required because DATA_DIR must be set before DB modules evaluate.
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const resilienceSettings = await import("../../src/lib/resilience/settings.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const rateLimitErrors = await import("../../open-sse/services/rateLimitManager/errors.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const Bottleneck = (await import("bottleneck")).default;

// These integration-style tests exercise real Bottleneck timer/event behavior.
function wait(ms) {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
}

// A real deadline is intentional: these tests drive real Bottleneck queues, and
// a broken cleanup path otherwise leaves Node's test process pending forever.
async function settleWithin<T>(
  promise: Promise<T>,
  message: string,
  timeoutMs = 2_000
): Promise<T> {
  let timeout: NodeJS.Timeout;
  const deadline = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  try {
    return await Promise.race([promise, deadline]);
  } finally {
    clearTimeout(timeout);
  }
}

type TestBottleneck = InstanceType<typeof Bottleneck> & {
  _drainAll: (...args: unknown[]) => Promise<unknown>;
};

/**
 * Fault injection for the observed Bottleneck failure mode: jobs enter the real
 * Bottleneck queue, but its internal drain loop stops making progress. Keep the
 * private mutation in this one helper so the tests otherwise exercise public
 * manager and Bottleneck behavior.
 */
function injectDrainWedge(limiter: InstanceType<typeof Bottleneck>): TestBottleneck {
  const wedged = limiter as TestBottleneck;
  wedged._drainAll = () => Promise.resolve(null);
  return wedged;
}

async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  message: string
): Promise<void> {
  const deadline = Date.now() + 1_000;
  while (!(await condition())) {
    if (Date.now() >= deadline) throw new Error(message);
    await wait(5);
  }
}

async function expectWedgeError(promise: Promise<unknown>): Promise<void> {
  await assert.rejects(
    settleWithin(promise, "stranded limiter caller did not reject after wedge recovery"),
    (error: Error & { code?: string }) => {
      assert.equal(error.code, "RATE_LIMIT_QUEUE_WEDGED");
      assert.deepEqual(rateLimitErrors.getTrustedLocalRateLimitError(error), {
        code: "RATE_LIMIT_QUEUE_WEDGED",
        status: 503,
      });
      return true;
    }
  );
}

async function flushBackgroundWork() {
  await wait(50);
  const { promise, resolve } = Promise.withResolvers<void>();
  setImmediate(resolve);
  await promise;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  await flushBackgroundWork();
});

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  await flushBackgroundWork();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("rate limit manager bypasses disabled connections and exposes inactive status", async () => {
  const result = await rateLimitManager.withRateLimit("openai", "disabled-conn", null, async () => {
    return "bypassed";
  });

  assert.equal(result, "bypassed");
  assert.deepEqual(rateLimitManager.getRateLimitStatus("openai", "disabled-conn"), {
    enabled: false,
    active: false,
    queued: 0,
    running: 0,
  });
  assert.deepEqual(rateLimitManager.getAllRateLimitStatus(), {});
});

test("idle-capacity watchdog honors grace, cleans up in order, and rejects the stranded caller", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 240_000,
    requestsPerMinute: 0,
    concurrentRequests: 1,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  const cleanupEvents: string[] = [];
  let limitersCreated = 0;
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    const limiter = new Bottleneck(options);
    limitersCreated++;
    if (limitersCreated === 1) {
      injectDrainWedge(limiter);
      const originalStop = limiter.stop.bind(limiter);
      const originalDisconnect = limiter.disconnect.bind(limiter);
      limiter.stop = async (stopOptions) => {
        cleanupEvents.push("stop:start");
        await originalStop(stopOptions);
        cleanupEvents.push("stop:done");
      };
      limiter.disconnect = async (flush) => {
        cleanupEvents.push("disconnect");
        await originalDisconnect(flush);
      };
    }
    return limiter;
  });

  rateLimitManager.enableRateLimitProtection("idle-capacity-conn");
  let executions = 0;
  const pending = rateLimitManager.withRateLimit(
    "openai",
    "idle-capacity-conn",
    "gpt-4o",
    async () => {
      executions++;
      return "must-not-run";
    }
  );

  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", "idle-capacity-conn").queued === 1,
    "the injected drain failure never established a real queued job"
  );
  const queuedObservedAt = Date.now();

  await settleWithin(
    rateLimitManager.__runLimiterWatchdogForTests(queuedObservedAt + 9_000),
    "watchdog grace-period scan did not finish"
  );
  assert.equal(
    rateLimitManager.getRateLimitStatus("openai", "idle-capacity-conn").queued,
    1,
    "the queue must survive before the 10s stability grace"
  );

  await settleWithin(
    rateLimitManager.__runLimiterWatchdogForTests(queuedObservedAt + 11_000),
    "watchdog wedge cleanup did not finish"
  );
  await expectWedgeError(pending);

  assert.equal(executions, 0, "watchdog recovery must never replay application work");
  assert.equal(limitersCreated, 1, "dropped callers must not create a replacement limiter");
  assert.deepEqual(cleanupEvents, ["stop:start", "stop:done", "disconnect"]);
});

test("wedge eviction rejects every queued caller and preserves learned state for future traffic", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 240_000,
    requestsPerMinute: 60,
    concurrentRequests: 6,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  const createdOptions: Bottleneck.ConstructorOptions[] = [];
  const createdLimiters: InstanceType<typeof Bottleneck>[] = [];
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    createdOptions.push({ ...options });
    const limiter = new Bottleneck(options);
    createdLimiters.push(limiter);
    if (createdLimiters.length === 1) injectDrainWedge(limiter);
    return limiter;
  });

  const connectionId = "learned-state-conn";
  rateLimitManager.enableRateLimitProtection(connectionId);
  rateLimitManager.updateFromHeaders(
    "openai",
    connectionId,
    {
      "x-ratelimit-limit-requests": "100",
      "x-ratelimit-remaining-requests": "1",
      "x-ratelimit-reset-requests": "60s",
    },
    200,
    "gpt-4o"
  );
  await waitForCondition(
    async () =>
      (await rateLimitManager.__getLimiterStateForTests("openai", connectionId, "gpt-4o"))
        ?.reservoir === 1,
    "the learned reservoir was not applied"
  );

  let executions = 0;
  const stranded = Array.from({ length: 3 }, () =>
    rateLimitManager.withRateLimit("openai", connectionId, "gpt-4o", async () => {
      executions++;
      return "must-not-run";
    })
  );
  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", connectionId).queued === 3,
    "all callers did not enter the wedged queue"
  );

  await settleWithin(
    rateLimitManager.__runLimiterWatchdogForTests(Date.now() + 11_000),
    "multi-caller wedge cleanup did not finish"
  );
  const settled = await settleWithin(
    Promise.allSettled(stranded),
    "not every stranded limiter caller settled"
  );
  assert.equal(executions, 0);
  assert.equal(createdLimiters.length, 1, "wedge recovery must not retry any dropped caller");
  for (const result of settled) {
    assert.equal(result.status, "rejected");
    assert.equal((result as PromiseRejectedResult).reason.code, "RATE_LIMIT_QUEUE_WEDGED");
  }

  assert.equal(
    await rateLimitManager.withRateLimit("openai", connectionId, "gpt-4o", async () => "future"),
    "future"
  );
  assert.equal(createdLimiters.length, 2, "future traffic should create one replacement limiter");
  assert.equal(createdOptions[1].reservoir, 1, "replacement must retain the remaining reservoir");
  assert.equal(createdOptions[1].minTime, 590, "replacement must retain learned request spacing");

  const queuedAfterPreservedPermit = rateLimitManager.withRateLimit(
    "openai",
    connectionId,
    "gpt-4o",
    async () => "after-refill"
  );
  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", connectionId).queued === 1,
    "the preserved reservoir should allow only one request"
  );
  await createdLimiters[1].incrementReservoir(1);
  assert.equal(await queuedAfterPreservedPermit, "after-refill");
});

test("global settings changed after eviction replace stale pending configuration", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "wedge-global-settings",
    apiKey: "sk-wedge-global-settings",
    isActive: true,
    rateLimitProtection: true,
  });
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 240_000,
    requestsPerMinute: 60,
    concurrentRequests: 6,
    minTimeBetweenRequestsMs: 0,
  });

  const createdOptions: Bottleneck.ConstructorOptions[] = [];
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    createdOptions.push({ ...options });
    const limiter = new Bottleneck(options);
    if (createdOptions.length === 1) injectDrainWedge(limiter);
    return limiter;
  });

  const pending = rateLimitManager.withRateLimit(
    "openai",
    connection.id,
    "gpt-4o",
    async () => "must-not-run"
  );
  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", connection.id).queued === 1,
    "global-settings caller did not enter the wedged queue"
  );
  await settleWithin(
    rateLimitManager.__runLimiterWatchdogForTests(Date.now() + 11_000),
    "global-settings wedge cleanup did not finish"
  );
  await expectWedgeError(pending);

  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 240_000,
    requestsPerMinute: 8,
    concurrentRequests: 3,
    minTimeBetweenRequestsMs: 31,
  });
  assert.equal(
    await rateLimitManager.withRateLimit(
      "openai",
      connection.id,
      "gpt-4o",
      async () => "new-policy"
    ),
    "new-policy"
  );
  assert.equal(createdOptions[1].reservoir, 8);
  assert.equal(createdOptions[1].maxConcurrent, 3);
  assert.equal(createdOptions[1].minTime, 31);
});

test("connection overrides changed after eviction replace stale pending configuration", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 240_000,
    requestsPerMinute: 60,
    concurrentRequests: 6,
    minTimeBetweenRequestsMs: 0,
  });
  const createdOptions: Bottleneck.ConstructorOptions[] = [];
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    createdOptions.push({ ...options });
    const limiter = new Bottleneck(options);
    if (createdOptions.length === 1) injectDrainWedge(limiter);
    return limiter;
  });

  const connectionId = "wedge-override-conn";
  rateLimitManager.enableRateLimitProtection(connectionId);
  const pending = rateLimitManager.withRateLimit(
    "openai",
    connectionId,
    "gpt-4o",
    async () => "must-not-run"
  );
  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", connectionId).queued === 1,
    "override caller did not enter the wedged queue"
  );
  await settleWithin(
    rateLimitManager.__runLimiterWatchdogForTests(Date.now() + 11_000),
    "override wedge cleanup did not finish"
  );
  await expectWedgeError(pending);

  rateLimitManager.refreshConnectionRateLimits(connectionId, {
    rpm: 7,
    maxConcurrent: 2,
    minTime: 25,
  });
  assert.equal(
    await rateLimitManager.withRateLimit(
      "openai",
      connectionId,
      "gpt-4o",
      async () => "new-override"
    ),
    "new-override"
  );
  assert.equal(createdOptions[1].reservoir, 7);
  assert.equal(createdOptions[1].maxConcurrent, 2);
  assert.equal(createdOptions[1].minTime, 25);
});

test("disable and re-enable discard learned state preserved by an earlier wedge", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 240_000,
    requestsPerMinute: 60,
    concurrentRequests: 6,
    minTimeBetweenRequestsMs: 0,
  });
  const createdOptions: Bottleneck.ConstructorOptions[] = [];
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    createdOptions.push({ ...options });
    const limiter = new Bottleneck(options);
    if (createdOptions.length === 1) injectDrainWedge(limiter);
    return limiter;
  });

  const connectionId = "wedge-reenabled-conn";
  rateLimitManager.enableRateLimitProtection(connectionId);
  rateLimitManager.updateFromHeaders(
    "openai",
    connectionId,
    {
      "x-ratelimit-limit-requests": "100",
      "x-ratelimit-remaining-requests": "1",
      "x-ratelimit-reset-requests": "60s",
    },
    200,
    "gpt-4o"
  );
  await waitForCondition(
    async () =>
      (await rateLimitManager.__getLimiterStateForTests("openai", connectionId, "gpt-4o"))
        ?.reservoir === 1,
    "learned reservoir was not applied before disable/re-enable"
  );

  const pending = rateLimitManager.withRateLimit(
    "openai",
    connectionId,
    "gpt-4o",
    async () => "must-not-run"
  );
  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", connectionId).queued === 1,
    "disable/re-enable caller did not enter the wedged queue"
  );
  await settleWithin(
    rateLimitManager.__runLimiterWatchdogForTests(Date.now() + 11_000),
    "disable/re-enable wedge cleanup did not finish"
  );
  await expectWedgeError(pending);

  rateLimitManager.disableRateLimitProtection(connectionId);
  rateLimitManager.enableRateLimitProtection(connectionId);
  assert.equal(
    await rateLimitManager.withRateLimit("openai", connectionId, "gpt-4o", async () => "reenabled"),
    "reenabled"
  );
  assert.equal(createdOptions[1].reservoir, 60);
  assert.equal(createdOptions[1].minTime, 0);
});

test("idle-capacity watchdog preserves a legitimate exhausted-reservoir queue", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 240_000,
    requestsPerMinute: 1,
    concurrentRequests: 1,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  let limiter: TestBottleneck | null = null;
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    limiter = new Bottleneck(options) as TestBottleneck;
    return limiter;
  });
  rateLimitManager.enableRateLimitProtection("zero-reservoir-conn");
  assert.equal(
    await rateLimitManager.withRateLimit(
      "openai",
      "zero-reservoir-conn",
      "gpt-4o",
      async () => "first"
    ),
    "first"
  );

  const pending = rateLimitManager.withRateLimit(
    "openai",
    "zero-reservoir-conn",
    "gpt-4o",
    async () => "after-refresh"
  );
  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", "zero-reservoir-conn").queued === 1,
    "the exhausted reservoir did not queue the follow-up"
  );

  await settleWithin(
    rateLimitManager.__runLimiterWatchdogForTests(Date.now() + 150_000),
    "zero-reservoir watchdog scan did not finish"
  );
  assert.equal(
    rateLimitManager.getRateLimitStatus("openai", "zero-reservoir-conn").queued,
    1,
    "a zero-reservoir wait must survive regardless of elapsed time"
  );

  assert.ok(limiter);
  await limiter.incrementReservoir(1);
  assert.equal(await pending, "after-refresh");
});

test("idle-capacity watchdog preserves a real Bottleneck minTime wait", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 240_000,
    requestsPerMinute: 0,
    concurrentRequests: 1,
    minTimeBetweenRequestsMs: 100,
    maxQueueDepth: 0,
  });

  rateLimitManager.enableRateLimitProtection("min-time-conn");
  await rateLimitManager.withRateLimit("openai", "min-time-conn", "gpt-4o", async () => "first");
  const pending = rateLimitManager.withRateLimit(
    "openai",
    "min-time-conn",
    "gpt-4o",
    async () => "after-min-time"
  );
  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", "min-time-conn").running === 1,
    "Bottleneck did not place the minTime-delayed job in RUNNING"
  );

  await settleWithin(
    rateLimitManager.__runLimiterWatchdogForTests(Date.now() + 150_000),
    "minTime watchdog scan did not finish"
  );
  assert.equal(
    rateLimitManager.getRateLimitStatus("openai", "min-time-conn").running,
    1,
    "a legitimate RUNNING minTime delay must not be evicted"
  );
  assert.equal(await pending, "after-min-time");
});

test("events from an evicted limiter cannot erase replacement queue progress", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 240_000,
    requestsPerMinute: 0,
    concurrentRequests: 1,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  const limiters: InstanceType<typeof Bottleneck>[] = [];
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    const limiter = new Bottleneck(options);
    limiters.push(limiter);
    if (limiters.length === 2) injectDrainWedge(limiter);
    return limiter;
  });

  const connectionId = "stale-listener-conn";
  rateLimitManager.enableRateLimitProtection(connectionId);
  const { promise: oldGate, resolve: releaseOld } = Promise.withResolvers<void>();
  const oldExecuting = rateLimitManager.withRateLimit(
    "openai",
    connectionId,
    "gpt-4o",
    async () => {
      await oldGate;
      return "old-first";
    }
  );
  await waitForCondition(
    () => limiters[0]?.counts().EXECUTING === 1,
    "the old limiter did not begin executing"
  );
  const oldQueued = rateLimitManager.withRateLimit(
    "openai",
    connectionId,
    "gpt-4o",
    async () => "old-second"
  );
  await waitForCondition(
    () => limiters[0]?.counts().QUEUED === 1,
    "the old limiter did not queue its second job"
  );

  rateLimitManager.refreshConnectionRateLimits(connectionId, {});
  const replacementPending = rateLimitManager.withRateLimit(
    "openai",
    connectionId,
    "gpt-4o",
    async () => "must-not-run"
  );
  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", connectionId).queued === 1,
    "the replacement limiter did not establish its queue"
  );

  releaseOld();
  assert.equal(await oldExecuting, "old-first");
  assert.equal(await oldQueued, "old-second");

  await settleWithin(
    rateLimitManager.__runLimiterWatchdogForTests(Date.now() + 11_000),
    "stale-listener watchdog cleanup did not finish"
  );
  await expectWedgeError(replacementPending);
});

test("watchdog ticks are serialized while an eligibility check is in flight", async () => {
  const { promise: checkGate, resolve: releaseCheck } = Promise.withResolvers<void>();
  let checks = 0;
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    const limiter = injectDrainWedge(new Bottleneck(options));
    const originalCheck = limiter.check.bind(limiter);
    limiter.check = async (weight) => {
      checks++;
      await checkGate;
      return originalCheck(weight);
    };
    return limiter;
  });

  const connectionId = "serialized-watchdog-conn";
  rateLimitManager.enableRateLimitProtection(connectionId);
  const pending = rateLimitManager.withRateLimit(
    "openai",
    connectionId,
    "gpt-4o",
    async () => "must-not-run"
  );
  await waitForCondition(
    () => rateLimitManager.getRateLimitStatus("openai", connectionId).queued === 1,
    "the serialized-watchdog fixture did not queue"
  );

  const now = Date.now() + 11_000;
  const firstTick = rateLimitManager.__runLimiterWatchdogForTests(now);
  const secondTick = rateLimitManager.__runLimiterWatchdogForTests(now);
  await waitForCondition(() => checks === 1, "the first tick did not reach limiter.check()");
  releaseCheck();
  await settleWithin(
    Promise.all([firstTick, secondTick]),
    "serialized watchdog scans did not finish"
  );
  await expectWedgeError(pending);
  assert.equal(checks, 1, "overlapping watchdog calls must share one scan");
});

test("application errors resembling Bottleneck failures remain untouched", async () => {
  rateLimitManager.enableRateLimitProtection("lookalike-error-conn");
  for (const message of [
    "This job timed out after 240000 ms.",
    "rate-limit-watchdog-wedge-reset",
  ]) {
    const applicationError = new Error(message);
    await assert.rejects(
      rateLimitManager.withRateLimit("openai", "lookalike-error-conn", "gpt-4o", async () => {
        throw applicationError;
      }),
      (error) => error === applicationError
    );
  }
});

test("withRateLimit forwards AbortController DOMException without mutating it", async () => {
  const connectionId = "conn-abort-domexception";
  const controller = new AbortController();
  rateLimitManager.enableRateLimitProtection(connectionId);

  const pending = rateLimitManager.withRateLimit(
    "github-models",
    connectionId,
    "microsoft/phi-4-reasoning",
    async () => {
      await wait(50);
      return "late";
    },
    controller.signal
  );

  controller.abort();

  await assert.rejects(pending, (error: unknown) => {
    assert.ok(error instanceof DOMException);
    assert.equal(error.name, "AbortError");
    return true;
  });
});

test("rate limit manager handles soft over-limit warnings and normal header learning", async () => {
  rateLimitManager.enableRateLimitProtection("conn-over-limit");
  rateLimitManager.updateFromHeaders(
    "openai",
    "conn-over-limit",
    { "x-ratelimit-over-limit": "yes" },
    200
  );

  const softStatus = rateLimitManager.getRateLimitStatus("openai", "conn-over-limit");
  assert.equal(softStatus.enabled, true);
  assert.equal(softStatus.active, true);

  rateLimitManager.enableRateLimitProtection("conn-low-remaining");
  rateLimitManager.updateFromHeaders(
    "openai",
    "conn-low-remaining",
    {
      "x-ratelimit-limit-requests": "100",
      "x-ratelimit-remaining-requests": "5",
      "x-ratelimit-reset-requests": "30s",
    },
    200
  );
  await rateLimitManager.__flushLearnedLimitsForTests();

  const learnedLimits = rateLimitManager.getLearnedLimits();
  const learnedEntry = learnedLimits["openai:conn-low-remaining"];
  assert.equal(learnedEntry.provider, "openai");
  assert.equal(learnedEntry.connectionId, "conn-low-remaining");
  assert.equal(learnedEntry.limit, 100);
  assert.equal(learnedEntry.remaining, 5);
  assert.ok(learnedEntry.minTime > 0);

  rateLimitManager.enableRateLimitProtection("conn-high-remaining");
  rateLimitManager.updateFromHeaders(
    "claude",
    "conn-high-remaining",
    {
      get(name) {
        const map = {
          "anthropic-ratelimit-requests-limit": "100",
          "anthropic-ratelimit-requests-remaining": "70",
          "anthropic-ratelimit-requests-reset": new Date(Date.now() + 30_000).toISOString(),
        };
        return map[name] ?? null;
      },
    },
    200
  );
  await rateLimitManager.__flushLearnedLimitsForTests();

  const allStatuses = rateLimitManager.getAllRateLimitStatus();
  assert.ok(allStatuses["openai:conn-over-limit"]);
  assert.ok(allStatuses["openai:conn-low-remaining"]);
  assert.ok(allStatuses["claude:conn-high-remaining"]);
});

test("rate limit manager handles 429 limiter teardown and disable cleanup", async () => {
  rateLimitManager.enableRateLimitProtection("conn-429");
  rateLimitManager.updateFromHeaders("openai", "conn-429", { "retry-after": "1s" }, 429, "gpt-4o");
  await wait(25);

  assert.equal(rateLimitManager.getRateLimitStatus("openai", "conn-429").active, false);

  rateLimitManager.enableRateLimitProtection("conn-disable");
  rateLimitManager.updateFromHeaders(
    "gemini",
    "conn-disable",
    {
      "x-ratelimit-limit-requests": "60",
      "x-ratelimit-remaining-requests": "4",
      "x-ratelimit-reset-requests": "10s",
    },
    200,
    "gemini-2.5-flash"
  );
  await rateLimitManager.__flushLearnedLimitsForTests();
  assert.ok(rateLimitManager.getAllRateLimitStatus()["gemini:conn-disable:gemini-2.5-flash"]);

  rateLimitManager.disableRateLimitProtection("conn-disable");
  assert.equal(rateLimitManager.isRateLimitEnabled("conn-disable"), false);
  assert.equal(rateLimitManager.getRateLimitStatus("gemini", "conn-disable").active, false);
});

test("rate limit manager uses model-scoped limiter keys for GitHub Copilot (#1624)", async () => {
  rateLimitManager.enableRateLimitProtection("conn-github");
  rateLimitManager.updateFromHeaders(
    "github",
    "conn-github",
    {
      "x-ratelimit-limit-requests": "50",
      "x-ratelimit-remaining-requests": "3",
      "x-ratelimit-reset-requests": "15s",
    },
    200,
    "gpt-5.1-codex-max"
  );
  await rateLimitManager.__flushLearnedLimitsForTests();

  // GitHub should use model-scoped key: github:conn-github:gpt-5.1-codex-max
  const allStatuses = rateLimitManager.getAllRateLimitStatus();
  assert.ok(
    allStatuses["github:conn-github:gpt-5.1-codex-max"],
    "GitHub limiter key should be model-scoped (github:conn:model)"
  );
  // Verify the limiter state is model-scoped via test helper
  const limiterState = await rateLimitManager.__getLimiterStateForTests(
    "github",
    "conn-github",
    "gpt-5.1-codex-max"
  );
  assert.equal(limiterState?.key, "github:conn-github:gpt-5.1-codex-max");
});

test("rate limit manager parses retry hints from response bodies and locks models", async () => {
  rateLimitManager.enableRateLimitProtection("conn-body");
  rateLimitManager.updateFromResponseBody(
    "openai",
    "conn-body",
    {
      error: {
        details: [{ retryDelay: "2s" }],
        message: "Please retry later",
      },
    },
    429,
    "gpt-4o"
  );

  assert.equal(accountFallback.getModelLockoutInfo("openai", "conn-body", "gpt-4o"), null);
  const limiterState = await rateLimitManager.__getLimiterStateForTests(
    "openai",
    "conn-body",
    "gpt-4o"
  );
  assert.equal(limiterState?.key, "openai:conn-body");
  assert.equal(rateLimitManager.getRateLimitStatus("openai", "conn-body").active, true);

  rateLimitManager.updateFromResponseBody(
    "openai",
    "conn-body",
    JSON.stringify({ error: { type: "rate_limit_error" } }),
    429,
    null
  );
  assert.equal(rateLimitManager.getRateLimitStatus("openai", "conn-body").active, true);
});

test("RATE_LIMIT_AUTO_ENABLE env var overrides dashboard auto-enable setting", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Env Override",
    apiKey: "sk-env",
    isActive: true,
  });

  // Dashboard says auto-enable on, but env says off → off wins
  const original = process.env.RATE_LIMIT_AUTO_ENABLE;
  process.env.RATE_LIMIT_AUTO_ENABLE = "false";
  try {
    await rateLimitManager.initializeRateLimits();
    assert.equal(rateLimitManager.isRateLimitEnabled(conn.id), false);
  } finally {
    if (original === undefined) delete process.env.RATE_LIMIT_AUTO_ENABLE;
    else process.env.RATE_LIMIT_AUTO_ENABLE = original;
  }

  // Reset and verify the opposite: env=true forces on even when dashboard would be off
  await rateLimitManager.__resetRateLimitManagerForTests();
  process.env.RATE_LIMIT_AUTO_ENABLE = "true";
  try {
    await rateLimitManager.applyRequestQueueSettings({
      ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
      autoEnableApiKeyProviders: false,
    });
    assert.equal(rateLimitManager.isRateLimitEnabled(conn.id), true);
  } finally {
    if (original === undefined) delete process.env.RATE_LIMIT_AUTO_ENABLE;
    else process.env.RATE_LIMIT_AUTO_ENABLE = original;
  }
});

test("rate limit manager recomputes auto-enabled API key connections when queue settings change", async () => {
  const autoConnection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Auto OpenAI",
    apiKey: "sk-auto",
    isActive: true,
  });
  const explicitConnection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Explicit OpenAI",
    apiKey: "sk-explicit",
    isActive: true,
    rateLimitProtection: true,
  });

  await rateLimitManager.initializeRateLimits();

  assert.equal(rateLimitManager.isRateLimitEnabled(autoConnection.id), true);
  assert.equal(rateLimitManager.isRateLimitEnabled(explicitConnection.id), true);
  assert.ok(rateLimitManager.getAllRateLimitStatus()[`openai:${autoConnection.id}`]);

  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
  });

  assert.equal(rateLimitManager.isRateLimitEnabled(autoConnection.id), false);
  assert.equal(rateLimitManager.isRateLimitEnabled(explicitConnection.id), true);
  assert.equal(rateLimitManager.getAllRateLimitStatus()[`openai:${autoConnection.id}`], undefined);

  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: true,
  });

  assert.equal(rateLimitManager.isRateLimitEnabled(autoConnection.id), true);
  assert.equal(rateLimitManager.isRateLimitEnabled(explicitConnection.id), true);
  assert.ok(rateLimitManager.getAllRateLimitStatus()[`openai:${autoConnection.id}`]);
});

test("withRateLimit rejects cleanly when the caller aborts with the default DOMException reason", async () => {
  // `AbortController.abort()` called with no argument (e.g. modelTestRunner's
  // timeout path) produces a native DOMException as `signal.reason`, whose
  // `name` is a read-only getter. withRateLimit's abort handling used to
  // mutate `reason.name = "AbortError"` in place, which throws
  // `TypeError: Cannot set property name of [object DOMException] which has
  // only a getter` instead of rejecting with a clean AbortError — surfacing
  // as an unhandled rejection rather than the intended timeout/slow result.
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "abort-reason-regression",
    apiKey: "sk-abort-reason-regression",
    isActive: true,
  });
  rateLimitManager.enableRateLimitProtection(String(connection.id));
  const controller = new AbortController();
  const pending = rateLimitManager.withRateLimit(
    "openai",
    String(connection.id),
    "gpt-4o",
    () => {
      const { promise, reject } = Promise.withResolvers<never>();
      controller.signal.addEventListener("abort", () => reject(controller.signal.reason), {
        once: true,
      });
      return promise;
    },
    controller.signal
  );

  controller.abort(); // no reason argument -> default DOMException

  await assert.rejects(pending, (err) => {
    assert.ok(err instanceof Error);
    assert.equal(err.name, "AbortError");
    return true;
  });
});
