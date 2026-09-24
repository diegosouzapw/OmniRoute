import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-learned-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports are required because DATA_DIR must be set before DB modules evaluate.
await import("../../src/lib/db/core.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const requestCapModule = await import("../../open-sse/services/rateLimitManager/requestCap.ts");
const { parseRequestCapFromBody } = requestCapModule;
const { classifyErrorText } = await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");
const { findMatchingErrorRule } = await import("../../open-sse/config/errorConfig.ts");
const { STANDARD_HEADERS } = await import("../../open-sse/services/rateLimitManager/headers.ts");
const { DEFAULT_RESILIENCE_SETTINGS } = await import("../../src/lib/resilience/settings.ts");
const Bottleneck = (await import("bottleneck")).default;

const TOKENROUTER_429 = JSON.stringify({
  error: {
    message: "You have reached the request limit: Maximum 5 requests within 1 minutes",
    type: "rate_limit_error",
  },
});

type Captured = {
  options: Record<string, unknown>;
  updates: Record<string, unknown>[];
};

function captureLimiters(): Captured[] {
  const captured: Captured[] = [];
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    const limiter = new Bottleneck(options);
    const entry: Captured = { options: { ...options }, updates: [] };
    const original = limiter.updateSettings.bind(limiter);
    limiter.updateSettings = (updates) => {
      entry.updates.push({ ...updates });
      return original(updates);
    };
    captured.push(entry);
    return limiter;
  });
  return captured;
}

test.beforeEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("parseRequestCapFromBody reads hard request caps from 429 bodies", () => {
  assert.deepEqual(parseRequestCapFromBody(TOKENROUTER_429), { requests: 5, windowMs: 60_000 });
  assert.deepEqual(parseRequestCapFromBody(JSON.parse(TOKENROUTER_429)), {
    requests: 5,
    windowMs: 60_000,
  });
  assert.deepEqual(parseRequestCapFromBody("429: Maximum 100 requests within 30 seconds"), {
    requests: 100,
    windowMs: 30_000,
  });
  assert.deepEqual(parseRequestCapFromBody("Rate limit exceeded: 60 requests per minute"), {
    requests: 60,
    windowMs: 60_000,
  });
  assert.deepEqual(parseRequestCapFromBody("You hit the limit of 10 requests per 2 minutes"), {
    requests: 10,
    windowMs: 120_000,
  });
  assert.deepEqual(parseRequestCapFromBody("Rate limit: 20 RPM"), {
    requests: 20,
    windowMs: 60_000,
  });
  assert.deepEqual(parseRequestCapFromBody("Rate limit: 20 rpm, current usage: 4 rpm"), {
    requests: 20,
    windowMs: 60_000,
  });
  assert.deepEqual(parseRequestCapFromBody("quota: 1000 requests per hour"), {
    requests: 1000,
    windowMs: 3_600_000,
  });
});

test("parseRequestCapFromBody ignores bodies without a request cap", () => {
  assert.equal(parseRequestCapFromBody("Rate limit exceeded. Please retry after 20s."), null);
  assert.equal(parseRequestCapFromBody(""), null);
  assert.equal(parseRequestCapFromBody(null), null);
  assert.equal(parseRequestCapFromBody({ error: { message: "overloaded" } }), null);
  assert.equal(parseRequestCapFromBody("Maximum 0 requests within 1 minutes"), null);
  assert.equal(parseRequestCapFromBody("processed 5 requests in 3 days"), null);
  // usage statements are not ceilings
  assert.equal(parseRequestCapFromBody("You made 120 requests in 1 minute; the limit is 60"), null);
  assert.equal(parseRequestCapFromBody("Your 3 requests in 10 seconds exceeded the plan"), null);
  assert.equal(
    parseRequestCapFromBody("Rate limit exceeded: you sent 120 requests in 1 minute"),
    null
  );
  assert.equal(parseRequestCapFromBody("Generate: 7 requests per minute"), null);
  // the rpm shorthand needs a cap word before the figure too, or a low usage
  // figure pins the connection; a cap word after it is deliberately not enough
  assert.equal(parseRequestCapFromBody("Current usage: 4 rpm"), null);
  assert.equal(parseRequestCapFromBody("Rate limit hit: you have made 3 rpm"), null);
  assert.equal(parseRequestCapFromBody("Throttled: 20 RPM exceeded"), null);
});

test("a 429 with a request cap paces the limiter and is learned", async () => {
  const connectionId = "tokenrouter-cap-conn";
  const captured = captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);

  // The pipeline records headers first (which evicts the limiter on a 429)
  // and then the body.
  rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, "glm-free");
  rateLimitManager.updateFromResponseBody(
    "tokenrouter",
    connectionId,
    TOKENROUTER_429,
    429,
    "glm-free"
  );

  const learned = rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`];
  assert.ok(learned, "cap should be recorded as a learned limit");
  assert.equal(learned.capRequests, 5);
  assert.equal(learned.capWindowMs, 60_000);
  assert.equal(learned.minTime, 12_000);
  assert.equal(learned.limit, 5);

  const fresh = captured.at(-1)!;
  const capUpdate = fresh.updates.find((u) => u.reservoirRefreshAmount === 5);
  assert.ok(capUpdate, "the rebuilt limiter should receive the cap");
  assert.equal(capUpdate.reservoir, 0);
  assert.equal(capUpdate.reservoirRefreshInterval, 60_000);
  assert.equal(capUpdate.minTime, 12_000);
});

test("a learned cap survives the limiter eviction on the next 429", async () => {
  const connectionId = "tokenrouter-evict-conn";
  const captured = captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);

  rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, "glm-free");
  rateLimitManager.updateFromResponseBody(
    "tokenrouter",
    connectionId,
    TOKENROUTER_429,
    429,
    "glm-free"
  );
  // A second 429 (say from an in-flight request) whose body says nothing useful.
  rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, "glm-free");
  rateLimitManager.updateFromResponseBody("tokenrouter", connectionId, "{}", 429, "glm-free");

  const before = captured.length;
  await rateLimitManager.withRateLimit("tokenrouter", connectionId, "glm-free", async () => "ok");
  assert.equal(captured.length, before + 1, "the next request builds a fresh limiter");

  const rebuilt = captured.at(-1)!.options;
  assert.equal(rebuilt.reservoir, 5);
  assert.equal(rebuilt.reservoirRefreshAmount, 5);
  assert.equal(rebuilt.reservoirRefreshInterval, 60_000);
  assert.equal(rebuilt.minTime, 12_000);
});

test("a learned cap is restored from persistence after a restart", async () => {
  const connectionId = "tokenrouter-restart-conn";
  captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);
  rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
  rateLimitManager.updateFromResponseBody("tokenrouter", connectionId, TOKENROUTER_429, 429, null);
  await rateLimitManager.__flushLearnedLimitsForTests();

  await rateLimitManager.__resetRateLimitManagerForTests();
  await rateLimitManager.initializeRateLimits();

  const restored = rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`];
  assert.ok(restored, "cap should be reloaded from settings");
  assert.equal(restored.capRequests, 5);
  assert.equal(restored.capWindowMs, 60_000);

  const captured = captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);
  await rateLimitManager.withRateLimit("tokenrouter", connectionId, null, async () => "ok");
  const options = captured.at(-1)!.options;
  assert.equal(options.reservoir, 5);
  assert.equal(options.reservoirRefreshInterval, 60_000);
  assert.equal(options.minTime, 12_000);
});

test("TokenRouter capacity 503 bodies classify as model capacity, not a provider outage", () => {
  for (const text of ["503 system disk overloaded", "system cpu overloaded"]) {
    assert.equal(classifyErrorText(text), RateLimitReason.MODEL_CAPACITY, text);
    const rule = findMatchingErrorRule(503, text);
    assert.equal(rule?.reason, "model_capacity", text);
    assert.equal(rule?.backoff, true, text);
  }
});

test("a cap never paces closer than the operator minTime floor", async () => {
  const connectionId = "tokenrouter-floor-conn";
  const captured = captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);
  await rateLimitManager.applyRequestQueueSettings({
    ...DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    minTimeBetweenRequestsMs: 200,
  });
  try {
    rateLimitManager.enableRateLimitProtection(connectionId);
    rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
    rateLimitManager.updateFromResponseBody(
      "tokenrouter",
      connectionId,
      "Rate limit exceeded: 1000 requests per minute",
      429,
      null
    );

    const learned = rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`];
    assert.equal(learned.capRequests, 1000);
    assert.equal(learned.minTime, 200, "window/N = 60ms is below the 200ms floor");
    const capUpdate = captured.at(-1)!.updates.find((u) => u.reservoirRefreshAmount === 1000);
    assert.equal(capUpdate?.minTime, 200);
  } finally {
    await rateLimitManager.applyRequestQueueSettings(DEFAULT_RESILIENCE_SETTINGS.requestQueue);
  }
});

test("an explicit RPM override outranks a learned cap", async () => {
  const connectionId = "tokenrouter-override-conn";
  const captured = captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);
  rateLimitManager.refreshConnectionRateLimits(connectionId, { rpm: 100 });

  rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
  rateLimitManager.updateFromResponseBody("tokenrouter", connectionId, TOKENROUTER_429, 429, null);
  rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
  await rateLimitManager.withRateLimit("tokenrouter", connectionId, null, async () => "ok");

  const rebuilt = captured.at(-1)!.options;
  assert.equal(rebuilt.reservoir, 100, "the operator's rpm override wins at construction");
  assert.equal(rebuilt.reservoirRefreshInterval, 60_000);

  // and at runtime: the body path must not pace the live limiter with the cap
  const bodyPathLimiter = captured.find((c) =>
    c.updates.some((u) => u.reservoir === 0 && u.reservoirRefreshAmount === undefined)
  );
  assert.ok(bodyPathLimiter, "body path only spends the window under an rpm override");
  assert.ok(
    captured.every((c) => !c.updates.some((u) => u.reservoirRefreshAmount === 5)),
    "no live update applied the 5-per-minute cap"
  );
  const learned = rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`];
  assert.equal(learned.capRequests, 5, "cap still recorded for when the override goes");
});

test("a header-learned update keeps the body-learned cap", async () => {
  const connectionId = "tokenrouter-merge-conn";
  captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);
  rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
  rateLimitManager.updateFromResponseBody("tokenrouter", connectionId, TOKENROUTER_429, 429, null);
  rateLimitManager.updateFromHeaders(
    "tokenrouter",
    connectionId,
    { [STANDARD_HEADERS.limit]: "100", [STANDARD_HEADERS.remaining]: "90" },
    200,
    null
  );

  const learned = rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`];
  assert.equal(learned.limit, 100, "header value recorded");
  assert.equal(learned.capRequests, 5, "cap not dropped by the header update");
  assert.equal(learned.capWindowMs, 60_000);
});

test("the body path rebuilds the limiter even when the header hook did not run", async () => {
  const connectionId = "tokenrouter-body-only-conn";
  const captured = captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);
  await rateLimitManager.withRateLimit("tokenrouter", connectionId, null, async () => "warm");
  const before = captured.length;

  rateLimitManager.updateFromResponseBody("tokenrouter", connectionId, TOKENROUTER_429, 429, null);

  assert.equal(captured.length, before + 1, "a fresh limiter carries the cap in its options");
  const rebuilt = captured.at(-1)!;
  assert.equal(rebuilt.options.reservoir, 5);
  assert.equal(rebuilt.options.reservoirRefreshInterval, 60_000);
  assert.ok(
    rebuilt.updates.some((u) => u.reservoir === 0),
    "and starts with an empty reservoir"
  );
});

test("an operator refresh of a connection forgets its learned cap", async () => {
  const connectionId = "tokenrouter-refresh-conn";
  const captured = captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);
  rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
  rateLimitManager.updateFromResponseBody("tokenrouter", connectionId, TOKENROUTER_429, 429, null);
  assert.equal(rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`].capRequests, 5);

  rateLimitManager.refreshConnectionRateLimits(connectionId, { minTime: 50 });

  const learned = rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`];
  assert.equal(learned.capRequests, undefined, "cap cleared");
  assert.equal(learned.provider, "tokenrouter", "entry itself kept");
  await rateLimitManager.withRateLimit("tokenrouter", connectionId, null, async () => "ok");
  assert.notEqual(captured.at(-1)!.options.reservoir, 5, "rebuilt limiter is uncapped");

  // the clear reaches persistence too
  await rateLimitManager.__flushLearnedLimitsForTests();
  await rateLimitManager.__resetRateLimitManagerForTests();
  await rateLimitManager.initializeRateLimits();
  const restored = rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`];
  assert.equal(restored?.capRequests, undefined, "cap does not come back after a restart");
});

test("a cap that cannot be honoured within the queue budget is not learned", async () => {
  const connectionId = "tokenrouter-huge-window-conn";
  captureLimiters();
  rateLimitManager.enableRateLimitProtection(connectionId);
  rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
  rateLimitManager.updateFromResponseBody(
    "tokenrouter",
    connectionId,
    "Quota exceeded: limit of 1 requests per 24 hours",
    429,
    null
  );

  assert.equal(rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`], undefined);
});

test("a persisted cap that no longer fits the queue budget is not re-applied", async () => {
  // A real connection row, so the restart below auto-enables it and builds its
  // limiter before the persisted limits load, the way boot does.
  const connection = await providersDb.createProviderConnection({
    provider: "tokenrouter",
    authType: "apikey",
    name: "budget-shrank",
    apiKey: "sk-budget-shrank",
    isActive: true,
  });
  const connectionId = connection.id;
  try {
    captureLimiters();
    rateLimitManager.enableRateLimitProtection(connectionId);
    // Learned while the operator allowed requests to wait ten minutes.
    rateLimitManager.refreshConnectionRateLimits(connectionId, { maxWaitMs: 600_000 });
    rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
    rateLimitManager.updateFromResponseBody(
      "tokenrouter",
      connectionId,
      "Quota exceeded: limit of 1 requests per 5 minutes",
      429,
      null
    );
    assert.equal(
      rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`].minTime,
      300_000
    );
    await rateLimitManager.__flushLearnedLimitsForTests();

    // Restart without the override: the budget is back to the 90s default.
    await rateLimitManager.__resetRateLimitManagerForTests();
    const captured = captureLimiters();
    await rateLimitManager.initializeRateLimits();

    const restored = rateLimitManager.getLearnedLimits()[`tokenrouter:${connectionId}`];
    assert.equal(restored?.capRequests, 1, "the cap itself is still remembered");
    const booted = captured.at(-1)!;
    assert.ok(booted, "boot builds the auto-enabled connection's limiter");
    assert.ok(
      booted.updates.every((u) => u.reservoirRefreshAmount !== 1 && u.minTime !== 300_000),
      "the restore path must not pace the live limiter with the oversized cap"
    );

    const before = captured.length;
    rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
    await rateLimitManager.withRateLimit("tokenrouter", connectionId, null, async () => "ok");
    assert.equal(captured.length, before + 1, "the 429 rebuilds the limiter");
    const rebuilt = captured.at(-1)!.options;
    assert.notEqual(rebuilt.reservoir, 1, "the rebuild path must not carry the oversized cap");
    assert.notEqual(rebuilt.minTime, 300_000);
  } finally {
    await providersDb.deleteProviderConnection(connectionId);
  }
});

test("a persisted cap that fits the queue budget is applied to the boot-time limiter", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "tokenrouter",
    authType: "apikey",
    name: "budget-fits",
    apiKey: "sk-budget-fits",
    isActive: true,
  });
  const connectionId = connection.id;
  try {
    captureLimiters();
    rateLimitManager.enableRateLimitProtection(connectionId);
    rateLimitManager.updateFromHeaders("tokenrouter", connectionId, {}, 429, null);
    rateLimitManager.updateFromResponseBody(
      "tokenrouter",
      connectionId,
      TOKENROUTER_429,
      429,
      null
    );
    await rateLimitManager.__flushLearnedLimitsForTests();

    await rateLimitManager.__resetRateLimitManagerForTests();
    const captured = captureLimiters();
    await rateLimitManager.initializeRateLimits();

    const booted = captured.at(-1)!;
    assert.equal(booted.options.id, `tokenrouter:${connectionId}`);
    assert.ok(
      booted.updates.some((u) => u.reservoirRefreshAmount === 5 && u.minTime === 12_000),
      "the restore path paces the boot-time limiter with the persisted cap"
    );
  } finally {
    await providersDb.deleteProviderConnection(connectionId);
  }
});

test("isValidRequestCap bounds what the restore path accepts", () => {
  const { isValidRequestCap } = requestCapModule;
  assert.equal(isValidRequestCap({ requests: 5, windowMs: 60_000 }), true);
  assert.equal(isValidRequestCap({ requests: 0, windowMs: 60_000 }), false);
  assert.equal(isValidRequestCap({ requests: 2.5, windowMs: 60_000 }), false);
  assert.equal(isValidRequestCap({ requests: 5, windowMs: 1e12 }), false);
  assert.equal(isValidRequestCap({ requests: 5, windowMs: 10 }), false);
  assert.equal(isValidRequestCap({ requests: 5, windowMs: Number.NaN }), false);
});
