/**
 * A 429 whose body asks for a retry longer than the request-queue budget used to
 * freeze that key's limiter for the whole wait (Gemini's daily quota answers with
 * `RetryInfo.retryDelay: "86399s"`). Nothing else recorded the wait: no model
 * lockout, no cooldown. The combo kept coming back to the frozen key, every
 * request sat out the full queue budget (maxWaitMs, 30 s by default) and died as a
 * local 503 "Request exceeded queue budget"; ten such keys burned a 300 s combo
 * timeout without a single upstream call.
 *
 * Expected now:
 *   - a typed RetryInfo wait longer than the queue budget, on a limiter that is
 *     already scoped to the model, becomes a model lockout on that connection
 *     (the signal account selection, and the combo pre-dispatch gate for targets
 *     pinned to the connection, already skip on), for the requested name too when
 *     an alias resolved it, that the failure path's own shorter lockout does not
 *     cut short, and leaves the queue unfrozen;
 *   - every other long wait (prose hint, untyped field, connection-wide limiter,
 *     no model) keeps the limiter pause, and a pause the caller's remaining queue
 *     time cannot outlast fails at once instead of waiting that time out — but
 *     never one the limiter's own refresh would serve in time.
 */
import test from "node:test";
import assert from "node:assert/strict";

// The cases below assume the default 30 s queue budget (maxWaitMs).
delete process.env.RATE_LIMIT_MAX_WAIT_MS;

const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE } =
  await import("../../open-sse/services/rateLimitManager/errors.ts");
const Bottleneck = (await import("bottleneck")).default;

const MODEL = "gemini-3.6-flash";
const DAY_MS = 24 * 60 * 60 * 1000;
// The queue budget handed to withRateLimit, and how fast "at once" must be. The
// gap between them keeps the timing assertions far from a slow runner's jitter.
const BUDGET_MS = 5_000;
const AT_ONCE_MS = 2_500;

function gemini429Body(retryDelay: string): string {
  return JSON.stringify({
    error: {
      code: 429,
      message: "You exceeded your current quota, please check your plan and billing details.",
      status: "RESOURCE_EXHAUSTED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.QuotaFailure",
          violations: [
            {
              quotaMetric: "generativelanguage.googleapis.com/generate_content_free_tier_requests",
              quotaId: "GenerateRequestsPerDayPerProjectPerModel-FreeTier",
            },
          ],
        },
        { "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay },
      ],
    },
  });
}

function prose429Body(seconds: number): string {
  return JSON.stringify({
    error: { message: `Rate limit reached. Please retry after ${seconds}s` },
  });
}

/** The exact sequence chatCore and the provider pipeline run on an upstream 429. */
function record429(provider: string, connectionId: string, model: string | null, body: string) {
  rateLimitManager.updateFromHeaders(provider, connectionId, new Headers(), 429, model);
  rateLimitManager.updateFromResponseBody(provider, connectionId, body, 429, model);
}

async function warm(provider: string, connectionId: string, model: string | null) {
  rateLimitManager.enableRateLimitProtection(connectionId);
  await rateLimitManager.withRateLimit(provider, connectionId, model, async () => "warm");
}

function isQueueTimeout(err: unknown): boolean {
  return (err as { code?: unknown } | null)?.code === LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE;
}

async function assertTurnedAwayAtOnce(provider: string, conn: string, model: string | null) {
  const started = Date.now();
  await assert.rejects(
    rateLimitManager.withRateLimit(provider, conn, model, async () => "late", null, BUDGET_MS),
    isQueueTimeout
  );
  const waited = Date.now() - started;
  assert.ok(waited < AT_ONCE_MS, `waited ${waited}ms behind a pause that outlasts the budget`);
}

test.afterEach(async () => {
  accountFallback.clearAllModelLockouts();
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test("429 with a daily-quota RetryInfo locks the model on that connection instead of freezing its queue", async () => {
  const conn = "conn-long-retry-lock";
  await warm("gemini", conn, MODEL);

  record429("gemini", conn, MODEL, gemini429Body("86399s"));

  assert.equal(
    accountFallback.isModelLocked("gemini", conn, MODEL),
    true,
    "account selection (and the combo gate for pinned targets) skips on isModelLocked()"
  );
  const lock = accountFallback.getModelLockoutInfo("gemini", conn, MODEL);
  assert.ok(lock, "expected a model lockout for the body-stated wait");
  assert.ok(
    lock.remainingMs > 86_390_000 && lock.remainingMs <= 86_399_000,
    `lockout should last the stated 86399s, got ${lock.remainingMs}ms`
  );
  assert.equal(
    accountFallback.isModelLocked("gemini", conn, "gemini-2.5-pro"),
    false,
    "other models on the same connection keep serving"
  );

  // The queue must not hold the key frozen for a day behind the lockout.
  const started = Date.now();
  const result = await rateLimitManager.withRateLimit(
    "gemini",
    conn,
    MODEL,
    async () => "served",
    null,
    BUDGET_MS
  );
  assert.equal(result, "served");
  assert.ok(Date.now() - started < AT_ONCE_MS, `queue held the call ${Date.now() - started}ms`);
});

test("a body-stated lockout never outlasts the 24h retry-hint ceiling", async () => {
  const conn = "conn-long-retry-ceiling";
  await warm("gemini", conn, MODEL);

  record429("gemini", conn, MODEL, gemini429Body("999999s"));

  const lock = accountFallback.getModelLockoutInfo("gemini", conn, MODEL);
  assert.ok(lock, "expected a model lockout");
  assert.ok(lock.remainingMs <= DAY_MS, `lockout ${lock.remainingMs}ms exceeds 24h`);
  assert.ok(lock.remainingMs > DAY_MS - 10_000, `lockout ${lock.remainingMs}ms should be ~24h`);
});

test("a pause that outlasts the caller's remaining queue time fails at once instead of waiting it out", async () => {
  const conn = "conn-long-retry-fastfail";
  await warm("gemini", conn, MODEL);

  // 20 s fits the default 30 s queue budget, so the limiter pauses (no lockout)...
  record429("gemini", conn, MODEL, gemini429Body("20s"));
  assert.equal(accountFallback.getModelLockoutInfo("gemini", conn, MODEL), null);

  // ...but this caller has 5 s left: waiting cannot end in a dispatch.
  await assertTurnedAwayAtOnce("gemini", conn, MODEL);
});

test("with no model to lock, a long body pause still fails fast instead of eating the queue budget", async () => {
  const conn = "conn-long-retry-nomodel";
  await warm("gemini", conn, null);

  record429("gemini", conn, null, gemini429Body("86399s"));

  await assertTurnedAwayAtOnce("gemini", conn, null);
});

test("a prose retry hint never becomes a lockout; its pause still turns callers away at once", async () => {
  const conn = "conn-long-retry-prose";
  await warm("gemini", conn, MODEL);

  // Prose hints are capped by the lockout policy elsewhere; here they stay a pause.
  record429("gemini", conn, MODEL, prose429Body(3_600));
  assert.equal(accountFallback.getModelLockoutInfo("gemini", conn, MODEL), null);

  await assertTurnedAwayAtOnce("gemini", conn, MODEL);
});

test("a retryDelay outside a typed RetryInfo detail never becomes a lockout; its pause still turns callers away at once", async () => {
  const conn = "conn-long-retry-untyped";
  await warm("gemini", conn, MODEL);

  record429(
    "gemini",
    conn,
    MODEL,
    JSON.stringify({ error: { details: [{ retryDelay: "86399s" }] } })
  );
  assert.equal(accountFallback.getModelLockoutInfo("gemini", conn, MODEL), null);

  await assertTurnedAwayAtOnce("gemini", conn, MODEL);
});

test("on a connection-wide limiter a long RetryInfo keeps pausing the connection instead of locking one model", async () => {
  const conn = "conn-long-retry-connwide";
  await warm("openai", conn, "gpt-4o");

  record429("openai", conn, "gpt-4o", gemini429Body("86399s"));
  assert.equal(
    accountFallback.getModelLockoutInfo("openai", conn, "gpt-4o"),
    null,
    "a per-model lock would let other models on the paused connection through"
  );

  // The whole connection stays paused, so another model is turned away too.
  await assertTurnedAwayAtOnce("openai", conn, "gpt-4.1");
});

test("the requested name is locked with the resolved model, so a combo target naming an alias skips the key", async () => {
  const conn = "conn-long-retry-alias";
  await warm("gemini", conn, MODEL);

  // chatCore hands over the resolved model and the name the client asked for.
  rateLimitManager.updateFromHeaders("gemini", conn, new Headers(), 429, MODEL);
  rateLimitManager.updateFromResponseBody(
    "gemini",
    conn,
    gemini429Body("86399s"),
    429,
    MODEL,
    "my-flash-alias"
  );

  assert.equal(accountFallback.isModelLocked("gemini", conn, MODEL), true);
  assert.equal(
    accountFallback.isModelLocked("gemini", conn, "my-flash-alias"),
    true,
    "account selection (and the combo gate for pinned targets) checks the requested name"
  );
});

test("the failure path's own short lockout after the 429 (the 3 s base in #16442) keeps the RetryInfo lock", async () => {
  const conn = "conn-long-retry-short-relock";
  await warm("gemini", conn, MODEL);

  record429("gemini", conn, MODEL, gemini429Body("1104s"));
  // src/sse/services/auth.ts then records its own lockout at the API-key base cooldown.
  accountFallback.recordModelLockoutFailure("gemini", conn, MODEL, "rate_limited", 429, 3_000);

  const lock = accountFallback.getModelLockoutInfo("gemini", conn, MODEL);
  assert.ok(lock, "expected a model lockout");
  assert.ok(lock.remainingMs > 1_100_000, `the lockout shrank to ${lock.remainingMs}ms`);
});

test("guard: a short body pause inside the queue budget still holds the call and then serves it", async () => {
  const conn = "conn-long-retry-short";
  await warm("gemini", conn, MODEL);

  record429("gemini", conn, MODEL, gemini429Body("1s"));
  assert.equal(accountFallback.getModelLockoutInfo("gemini", conn, MODEL), null);

  const started = Date.now();
  const result = await rateLimitManager.withRateLimit(
    "gemini",
    conn,
    MODEL,
    async () => "after-pause",
    null,
    BUDGET_MS
  );
  const waited = Date.now() - started;
  assert.equal(result, "after-pause");
  assert.ok(waited >= 500, `the 1s pause was not honoured (waited ${waited}ms)`);
});

test("guard: once the reservoir is relaxed, a recorded pause no longer fails calls fast", async () => {
  const conn = "conn-long-retry-relaxed";
  await warm("openai", conn, "gpt-4o");

  record429("openai", conn, "gpt-4o", prose429Body(20));
  // A later response reports plenty of headroom and relaxes the reservoir.
  rateLimitManager.updateFromHeaders(
    "openai",
    conn,
    new Headers({
      "x-ratelimit-limit-requests": "100",
      "x-ratelimit-remaining-requests": "90",
      "x-ratelimit-reset-requests": "60s",
    }),
    200,
    "gpt-4o"
  );

  const started = Date.now();
  const result = await rateLimitManager.withRateLimit(
    "openai",
    conn,
    "gpt-4o",
    async () => "relaxed",
    null,
    BUDGET_MS
  );
  assert.equal(result, "relaxed");
  assert.ok(Date.now() - started < AT_ONCE_MS, `relaxed limiter held the call`);
});

test("guard: the per-target deadline (abort signal) ends a wait behind a body pause", async () => {
  const conn = "conn-long-retry-abort";
  await warm("gemini", conn, MODEL);

  record429("gemini", conn, MODEL, gemini429Body("20s"));

  const controller = new AbortController();
  const deadline = new Error("combo per-model timeout");
  const timer = setTimeout(() => controller.abort(deadline), 200);
  const started = Date.now();
  try {
    await assert.rejects(
      rateLimitManager.withRateLimit(
        "gemini",
        conn,
        MODEL,
        async () => "late",
        controller.signal,
        30_000
      ),
      (err: unknown) => err === deadline
    );
  } finally {
    clearTimeout(timer);
  }
  const waited = Date.now() - started;
  assert.ok(waited < AT_ONCE_MS, `abort took ${waited}ms to end the queue wait`);
});

test("guard: a recorded pause never outlasts the refresh clock of the limiter it was set on", async () => {
  const conn = "conn-long-retry-anchor";
  await warm("gemini", conn, MODEL);

  // Bottleneck starts the refresh clock when the limiter is built. A build that
  // stalls (slow logging, a busy event loop) must not stretch the recorded pause
  // past that clock, or the fail-fast would turn away a call the refill serves.
  const STALL_MS = 2_500;
  let builtAt = 0;
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    builtAt = Date.now();
    const limiter = new Bottleneck(options);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, STALL_MS);
    return limiter;
  });
  record429("gemini", conn, MODEL, gemini429Body("4s"));

  // About 1.5 s of the 4 s pause are left, well inside a 3 s budget.
  const result = await rateLimitManager.withRateLimit(
    "gemini",
    conn,
    MODEL,
    async () => "refilled",
    null,
    3_000
  );
  assert.equal(result, "refilled");
  // The refill comes 4 s after the build, however long the stall took.
  assert.ok(Date.now() - builtAt >= 4_000, "the call waited for the refill");
});
