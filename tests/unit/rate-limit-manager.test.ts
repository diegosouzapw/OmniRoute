import test from "node:test";
import assert from "node:assert/strict";
import Bottleneck from "bottleneck";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rate-limit-manager-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const resilienceSettings = await import("../../src/lib/resilience/settings.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function flushBackgroundWork() {
  await wait(50);
  await new Promise((resolve) => setImmediate(resolve));
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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

test("queue expiry does not invoke the provider after a late dispatch", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 100,
    requestsPerMinute: 0,
    concurrentRequests: 1,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  rateLimitManager.enableRateLimitProtection("queue-expiry-conn");
  let resolveFirstStarted: () => void = () => undefined;
  const firstStarted = new Promise<void>((resolve) => {
    resolveFirstStarted = resolve;
  });
  const first = rateLimitManager.withRateLimit(
    "openai",
    "queue-expiry-conn",
    "gpt-4o",
    async () => {
      resolveFirstStarted();
      await wait(300);
      return "first";
    }
  );
  await firstStarted;

  let secondCalls = 0;
  await assert.rejects(
    rateLimitManager.withRateLimit("openai", "queue-expiry-conn", "gpt-4o", async () => {
      secondCalls++;
      return "late";
    }),
    (error: { code?: string }) => error.code === "RATE_LIMIT_QUEUE_TIMEOUT"
  );

  await first;
  await wait(50);
  assert.equal(secondCalls, 0, "a queue-expired job must not invoke the provider later");
});

test("queue expiry does not drop other queued jobs", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 500,
    requestsPerMinute: 0,
    concurrentRequests: 1,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  rateLimitManager.enableRateLimitProtection("queue-peer-conn");
  let resolveFirstExecuting: () => void = () => undefined;
  const firstExecuting = new Promise<void>((resolve) => {
    resolveFirstExecuting = resolve;
  });
  let releaseFirst: () => void = () => undefined;
  const first = rateLimitManager.withRateLimit("openai", "queue-peer-conn", null, async () => {
    resolveFirstExecuting();
    await new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });
    return "first";
  });
  await firstExecuting;

  const second = rateLimitManager.withRateLimit(
    "openai",
    "queue-peer-conn",
    null,
    async () => "expired"
  );
  await wait(400);

  let thirdCalls = 0;
  const third = rateLimitManager.withRateLimit("openai", "queue-peer-conn", null, async () => {
    thirdCalls++;
    return "third";
  });
  await assert.rejects(
    second,
    (error: { code?: string }) => error.code === "RATE_LIMIT_QUEUE_TIMEOUT"
  );
  releaseFirst();
  await Promise.all([first, third]);
  assert.equal(thirdCalls, 1, "a peer queued job must survive another job's expiry");
});

test("global RPM lease is shared across enabled provider connections", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 1000,
    requestsPerMinute: 2,
    concurrentRequests: 10,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  rateLimitManager.enableRateLimitProtection("global-rpm-a");
  rateLimitManager.enableRateLimitProtection("global-rpm-b");
  let calls = 0;
  await rateLimitManager.withRateLimit("openai", "global-rpm-a", null, async () => {
    calls++;
  });
  await rateLimitManager.withRateLimit("anthropic", "global-rpm-b", null, async () => {
    calls++;
  });

  await assert.rejects(
    rateLimitManager.withRateLimit("openai", "global-rpm-a", null, async () => {
      calls++;
    }),
    (error: { code?: string }) => error.code === "RATE_LIMIT_QUEUE_TIMEOUT"
  );
  assert.equal(calls, 2, "the global lease blocks the third dispatch across providers");
});

test("provider/account RPM lease failure does not consume the global lease", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 1000,
    requestsPerMinute: 2,
    concurrentRequests: 10,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  rateLimitManager.enableRateLimitProtection("provider-rpm-a");
  rateLimitManager.enableRateLimitProtection("provider-rpm-b");
  rateLimitManager.refreshConnectionRateLimits("provider-rpm-a", { rpm: 1 });

  let calls = 0;
  await rateLimitManager.withRateLimit("openai", "provider-rpm-a", null, async () => {
    calls++;
  });

  await assert.rejects(
    rateLimitManager.withRateLimit("openai", "provider-rpm-a", null, async () => {
      calls++;
    }),
    (error: { code?: string }) => error.code === "RATE_LIMIT_QUEUE_TIMEOUT"
  );

  await rateLimitManager.withRateLimit("anthropic", "provider-rpm-b", null, async () => {
    calls++;
  });
  assert.equal(calls, 2, "the failed provider lease did not consume the second global lease");
});

test("aborted queued work releases its pre-dispatch RPM lease", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 1000,
    requestsPerMinute: 2,
    concurrentRequests: 1,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  rateLimitManager.enableRateLimitProtection("abort-lease-conn");
  rateLimitManager.enableRateLimitProtection("abort-lease-other");
  let resolveFirstExecuting: () => void = () => undefined;
  const firstExecuting = new Promise<void>((resolve) => {
    resolveFirstExecuting = resolve;
  });
  let releaseFirst: () => void = () => undefined;
  const firstStarted = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });
  const first = rateLimitManager.withRateLimit("openai", "abort-lease-conn", null, async () => {
    resolveFirstExecuting();
    await firstStarted;
    return "first";
  });
  await firstExecuting;

  const controller = new AbortController();
  let abortedCalls = 0;
  const queued = rateLimitManager.withRateLimit(
    "openai",
    "abort-lease-conn",
    null,
    async () => {
      abortedCalls++;
      return "should-not-dispatch";
    },
    controller.signal
  );
  await wait(20);
  controller.abort();
  await assert.rejects(queued, (error: { name?: string }) => error.name === "AbortError");

  let thirdCalls = 0;
  await rateLimitManager.withRateLimit("anthropic", "abort-lease-other", null, async () => {
    thirdCalls++;
  });
  releaseFirst();
  await first;
  assert.equal(abortedCalls, 0, "aborted queued work must not invoke the provider");
  assert.equal(thirdCalls, 1, "aborted work must return its unused global lease");
});

test("aborting one queued request does not drop queued peers", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 1000,
    requestsPerMinute: 0,
    concurrentRequests: 1,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  const connectionId = "abort-peer-conn";
  rateLimitManager.enableRateLimitProtection(connectionId);
  let resolveFirstExecuting: () => void = () => undefined;
  const firstExecuting = new Promise<void>((resolve) => {
    resolveFirstExecuting = resolve;
  });
  let releaseFirst: () => void = () => undefined;
  const first = rateLimitManager.withRateLimit("test-provider", connectionId, null, async () => {
    resolveFirstExecuting();
    await new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });
  });

  await firstExecuting;
  const limiter = rateLimitManager.__getLimiterForTests("test-provider", connectionId);
  const controller = new AbortController();
  let abortedCalls = 0;
  const aborted = rateLimitManager.withRateLimit(
    "test-provider",
    connectionId,
    null,
    async () => {
      abortedCalls++;
    },
    controller.signal
  );
  let peerCalls = 0;
  const peer = rateLimitManager.withRateLimit("test-provider", connectionId, null, async () => {
    peerCalls++;
  });
  for (let attempt = 0; attempt < 200 && limiter.counts().QUEUED < 2; attempt++) {
    await wait(5);
  }
  assert.ok(limiter.counts().QUEUED >= 2, "both queued requests must be present before abort");
  controller.abort();
  await assert.rejects(aborted, (error: { name?: string }) => error.name === "AbortError");

  releaseFirst();
  await Promise.all([first, peer]);
  assert.equal(abortedCalls, 0, "aborted queued work must not invoke the provider");
  assert.equal(peerCalls, 1);
});

test("dispatched provider failures retain their RPM lease", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 500,
    requestsPerMinute: 1,
    concurrentRequests: 10,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  rateLimitManager.enableRateLimitProtection("failed-dispatch-a");
  rateLimitManager.enableRateLimitProtection("failed-dispatch-b");
  await assert.rejects(
    rateLimitManager.withRateLimit("openai", "failed-dispatch-a", null, async () => {
      throw new Error("upstream failure");
    }),
    /upstream failure/
  );

  let secondCalls = 0;
  await assert.rejects(
    rateLimitManager.withRateLimit("anthropic", "failed-dispatch-b", null, async () => {
      secondCalls++;
    }),
    (error: { code?: string }) => error.code === "RATE_LIMIT_QUEUE_TIMEOUT"
  );
  assert.equal(secondCalls, 0, "a dispatched failure still counts against the RPM window");
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

test("rate limit manager blocks admission after an upstream 429 retry hint", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    concurrentRequests: 1,
    requestsPerMinute: 0,
    maxWaitMs: 100,
  });
  rateLimitManager.enableRateLimitProtection("conn-429-block");
  rateLimitManager.updateFromHeaders(
    "openai",
    "conn-429-block",
    { "retry-after": "1s" },
    429,
    "gpt-4o"
  );

  let providerCalls = 0;
  await assert.rejects(
    rateLimitManager.withRateLimit("openai", "conn-429-block", "gpt-4o", async () => {
      providerCalls++;
    }),
    (error: unknown) => {
      const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
      assert.equal(code, "RATE_LIMIT_QUEUE_TIMEOUT");
      assert.match(String((error as Error).message), /upstream rate-limit cooldown/);
      return true;
    }
  );
  assert.equal(providerCalls, 0);
});

test("rate limit manager blocks a zero-remaining header window until reset", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    concurrentRequests: 1,
    requestsPerMinute: 0,
    maxWaitMs: 100,
  });
  rateLimitManager.enableRateLimitProtection("conn-zero-remaining");
  rateLimitManager.updateFromHeaders(
    "openai",
    "conn-zero-remaining",
    {
      "x-ratelimit-limit-requests": "10",
      "x-ratelimit-remaining-requests": "0",
      "x-ratelimit-reset-requests": "1s",
    },
    200
  );

  let providerCalls = 0;
  await assert.rejects(
    rateLimitManager.withRateLimit("openai", "conn-zero-remaining", null, async () => {
      providerCalls++;
    }),
    (error: unknown) => {
      const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
      assert.equal(code, "RATE_LIMIT_QUEUE_TIMEOUT");
      assert.match(String((error as Error).message), /upstream rate-limit cooldown/);
      return true;
    }
  );
  assert.equal(providerCalls, 0);
});

test("rate limit manager keeps learned header windows model-scoped where limiters are model-scoped", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    concurrentRequests: 1,
    requestsPerMinute: 0,
    maxWaitMs: 100,
  });
  rateLimitManager.enableRateLimitProtection("conn-model-header");
  rateLimitManager.updateFromHeaders(
    "github",
    "conn-model-header",
    {
      "x-ratelimit-limit-requests": "10",
      "x-ratelimit-remaining-requests": "0",
      "x-ratelimit-reset-requests": "1s",
    },
    200,
    "model-a"
  );

  let providerCalls = 0;
  await rateLimitManager.withRateLimit("github", "conn-model-header", "model-b", async () => {
    providerCalls++;
  });
  assert.equal(providerCalls, 1);
});

test("rate limit watchdog resets a queued limiter with received work", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    concurrentRequests: 1,
    requestsPerMinute: 0,
    maxWaitMs: 5_000,
  });
  rateLimitManager.enableRateLimitProtection("conn-wedge");
  const limiter = new Bottleneck({ reservoir: 0, id: "test-provider:conn-wedge" });
  rateLimitManager.__installLimiterForTests("test-provider", "conn-wedge", limiter);

  let providerCalls = 0;
  const pending = rateLimitManager.withRateLimit("test-provider", "conn-wedge", null, async () => {
    providerCalls++;
  });
  await wait(100);
  const counts = limiter.counts();
  assert.equal(counts.RECEIVED, 0);
  assert.ok(counts.QUEUED > 0);

  rateLimitManager.__setLastDispatchAtForTests(
    "test-provider",
    "conn-wedge",
    null,
    Date.now() - 120_001
  );
  rateLimitManager.__runRateLimitWatchdogForTests();

  await assert.rejects(pending, (error: unknown) => {
    const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
    assert.equal(code, "RATE_LIMIT_QUEUE_WEDGED");
    return true;
  });
  assert.equal(providerCalls, 0);
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
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    maxWaitMs: 100,
    requestsPerMinute: 0,
  });
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

  let providerCalls = 0;
  await assert.rejects(
    rateLimitManager.withRateLimit("openai", "conn-body", "gpt-4o", async () => {
      providerCalls++;
    }),
    (error: unknown) => {
      const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
      assert.equal(code, "RATE_LIMIT_QUEUE_TIMEOUT");
      assert.match(String((error as Error).message), /upstream rate-limit cooldown/);
      return true;
    }
  );
  assert.equal(providerCalls, 0);

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
  // Mirror how a real executor call behaves: it settles once the signal it
  // was handed aborts, so this job doesn't dangle forever in Bottleneck once
  // withRateLimit's own Promise.race settles via the abort path below.
  const settlesOnAbort = (signal) =>
    new Promise((_resolve, reject) => {
      signal.addEventListener("abort", () => reject(signal.reason), { once: true });
    });

  const pending = rateLimitManager.withRateLimit(
    "openai",
    String(connection.id),
    "gpt-4o",
    () => settlesOnAbort(controller.signal),
    controller.signal
  );

  controller.abort(); // no reason argument -> default DOMException

  await assert.rejects(pending, (err) => {
    assert.ok(err instanceof Error);
    assert.equal(err.name, "AbortError");
    return true;
  });
});
