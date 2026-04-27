import test from "node:test";
import assert from "node:assert/strict";
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
