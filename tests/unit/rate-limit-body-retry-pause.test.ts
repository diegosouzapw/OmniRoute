/**
 * Decisions of open-sse/services/rateLimitManager/bodyRetryPause.ts without
 * timers or limiters: when a body-stated 429 wait becomes a model lockout, and
 * when a recorded limiter pause turns a caller away. The end-to-end behaviour
 * through the rate-limit manager is in rate-limit-long-body-retry-lockout.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";

const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const bodyRetryPause = await import("../../open-sse/services/rateLimitManager/bodyRetryPause.ts");
const { LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE } =
  await import("../../open-sse/services/rateLimitManager/errors.ts");

type BodyRetry = Parameters<typeof bodyRetryPause.lockModelForLongBodyRetry>[0];

const MODEL = "gemini-3.6-flash";
const NOW = 1_000_000;
const DAY_MS = 24 * 60 * 60 * 1000;
const RETRY_INFO_TYPE = "type.googleapis.com/google.rpc.RetryInfo";

function errorBody(details: unknown[]): string {
  return JSON.stringify({ error: { code: 429, status: "RESOURCE_EXHAUSTED", details } });
}

function retryInfoBody(retryDelay: string): string {
  return errorBody([{ "@type": RETRY_INFO_TYPE, retryDelay }]);
}

function proseBody(seconds: number): string {
  return JSON.stringify({
    error: { message: `Rate limit reached. Please retry after ${seconds}s` },
  });
}

function isQueueTimeout(err: unknown): boolean {
  return (err as { code?: unknown } | null)?.code === LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE;
}

test.afterEach(() => {
  accountFallback.clearAllModelLockouts();
});

test("checkLimiterPause compares the recorded pause with the remaining budget", () => {
  const limiter = {};
  assert.equal(bodyRetryPause.checkLimiterPause(limiter, 5_000, "p/m", NOW), null, "no pause");

  bodyRetryPause.rememberLimiterPause(limiter, NOW + 20_000);
  assert.equal(bodyRetryPause.checkLimiterPause(limiter, 30_000, "p/m", NOW), null);
  assert.equal(bodyRetryPause.checkLimiterPause(limiter, 20_000, "p/m", NOW), null);
  const err = bodyRetryPause.checkLimiterPause(limiter, 5_000, "p/m", NOW);
  assert.ok(isQueueTimeout(err), "a pause past the budget is a queue timeout");
  assert.match(String(err?.message), /lasts 20000ms more, past the 5000ms left/);
  assert.equal(
    bodyRetryPause.checkLimiterPause(limiter, 5_000, "p/m", NOW + 15_000),
    null,
    "the same pause fits once less of it is left"
  );
});

test("noteLimiterUpdate forgets the pause on a reservoir or refresh change, not on pacing", () => {
  for (const updates of [
    { reservoir: null },
    { reservoir: 5 },
    { reservoirRefreshInterval: 1_000 },
    { reservoirRefreshAmount: 10 },
  ]) {
    const limiter = {};
    bodyRetryPause.rememberLimiterPause(limiter, NOW + 20_000);
    bodyRetryPause.noteLimiterUpdate(limiter, updates);
    assert.equal(
      bodyRetryPause.checkLimiterPause(limiter, 5_000, "p/m", NOW),
      null,
      `${Object.keys(updates)[0]} must forget the pause`
    );
  }

  const limiter = {};
  bodyRetryPause.rememberLimiterPause(limiter, NOW + 20_000);
  bodyRetryPause.noteLimiterUpdate(limiter, { minTime: 200, maxConcurrent: 2 });
  assert.ok(bodyRetryPause.checkLimiterPause(limiter, 5_000, "p/m", NOW), "pacing keeps it");
});

test("lockModelForLongBodyRetry locks only a 429 typed RetryInfo wait past the budget on a model-scoped limiter", () => {
  const base: BodyRetry = {
    provider: "gemini",
    connectionId: "conn-decision",
    scopedModel: MODEL,
    status: 429,
    reason: "rate_limit_exceeded",
  };
  const decide = (
    overrides: Partial<BodyRetry>,
    budgetMs = 30_000,
    body: unknown = retryInfoBody("86399s")
  ) => bodyRetryPause.lockModelForLongBodyRetry({ ...base, ...overrides }, budgetMs, body);

  assert.equal(decide({ status: 503 }), false, "only 429s convert");
  assert.equal(decide({ scopedModel: null }), false, "a connection-wide limiter keeps the pause");
  assert.equal(decide({}, 30_000, retryInfoBody("30s")), false, "a wait that fits is pacing");
  assert.equal(decide({}, 0), false, "maxWaitMs 0 means the queue has no wait deadline");
  assert.equal(decide({}, 30_000, proseBody(86_399)), false, "a prose hint is not authoritative");
  const untyped = errorBody([{ retryDelay: "86399s" }]);
  assert.equal(decide({}, 30_000, untyped), false, "an untyped retryDelay is not RetryInfo");
  const otherType = errorBody([
    { "@type": "type.googleapis.com/google.rpc.QuotaFailure", retryDelay: "86399s" },
  ]);
  assert.equal(decide({}, 30_000, otherType), false, "nor is one under another @type");
  assert.equal(accountFallback.getModelLockoutInfo("gemini", "conn-decision", MODEL), null);

  assert.equal(decide({}), true);
  const lock = accountFallback.getModelLockoutInfo("gemini", "conn-decision", MODEL);
  assert.ok(lock && lock.remainingMs > 86_390_000 && lock.remainingMs <= 86_399_000);

  assert.equal(decide({ connectionId: "conn-ceiling" }, 30_000, retryInfoBody("999999s")), true);
  const capped = accountFallback.getModelLockoutInfo("gemini", "conn-ceiling", MODEL);
  assert.ok(capped && capped.remainingMs <= DAY_MS, "capped at the 24h hint ceiling");
});

test("lockModelForLongBodyRetry also locks the requested name an alias resolved to the model", () => {
  const retry: BodyRetry = {
    provider: "gemini",
    connectionId: "conn-alias",
    scopedModel: MODEL,
    requestedModel: "my-flash-alias",
    status: 429,
    reason: "rate_limit_exceeded",
  };
  assert.equal(
    bodyRetryPause.lockModelForLongBodyRetry(retry, 30_000, retryInfoBody("86399s")),
    true
  );
  assert.equal(accountFallback.isModelLocked("gemini", "conn-alias", MODEL), true);
  assert.equal(accountFallback.isModelLocked("gemini", "conn-alias", "my-flash-alias"), true);
  assert.equal(accountFallback.isModelLocked("gemini", "conn-alias", "gemini-2.5-pro"), false);
});

test("the requested name is locked exactly, so an alias across quota families or scopes keeps its own serving", () => {
  const lockAlias = (provider: string, scopedModel: string, requestedModel: string) =>
    bodyRetryPause.lockModelForLongBodyRetry(
      {
        provider,
        connectionId: `conn-${provider}`,
        scopedModel,
        requestedModel,
        status: 429,
        reason: "rate_limit_exceeded",
      },
      30_000,
      retryInfoBody("86399s")
    );

  // Antigravity limits per quota family: a Gemini-named alias for a Claude model.
  assert.equal(lockAlias("antigravity", "claude-sonnet-4-5", "gemini-2.5-pro"), true);
  assert.equal(
    accountFallback.isModelLocked("antigravity", "conn-antigravity", "claude-sonnet-4-5"),
    true
  );
  assert.equal(
    accountFallback.isModelLocked("antigravity", "conn-antigravity", "gemini-2.5-pro"),
    true
  );
  assert.equal(
    accountFallback.isModelLocked("antigravity", "conn-antigravity", "gemini-2.5-flash"),
    false,
    "the alias's Gemini family keeps serving"
  );

  // Codex limits and locks per quota scope: a codex-scope alias for the spark model.
  assert.equal(lockAlias("codex", "gpt-5.3-codex-spark", "gpt-5.5"), true);
  assert.equal(accountFallback.isModelLocked("codex", "conn-codex", "gpt-5.5"), true);
  assert.equal(
    accountFallback.isModelLocked("codex", "conn-codex", "gpt-5.4"),
    false,
    "the alias's codex scope keeps serving"
  );
});

test("antigravity locks the exact model, never its quota family, like its other quota locks", () => {
  for (const provider of ["antigravity", "agy"]) {
    const connectionId = `conn-${provider}-exact`;
    const retry: BodyRetry = {
      provider,
      connectionId,
      scopedModel: "claude-sonnet-4-5",
      status: 429,
      reason: "rate_limit_exceeded",
    };
    assert.equal(
      bodyRetryPause.lockModelForLongBodyRetry(retry, 30_000, retryInfoBody("86399s")),
      true
    );
    assert.equal(accountFallback.isModelLocked(provider, connectionId, "claude-sonnet-4-5"), true);
    assert.equal(
      accountFallback.isModelLocked(provider, connectionId, "claude-opus-4-5"),
      false,
      `${provider}: the rest of the Claude family keeps serving`
    );
  }
});

test("retryInfoDelayMs reads only a typed RetryInfo detail, like the google_rpc_retry_info provenance", () => {
  assert.equal(bodyRetryPause.retryInfoDelayMs(retryInfoBody("5s")), 5_000);
  assert.equal(bodyRetryPause.retryInfoDelayMs(JSON.parse(retryInfoBody("5s"))), 5_000);
  assert.equal(
    bodyRetryPause.retryInfoDelayMs({ details: [{ "@type": RETRY_INFO_TYPE, retryDelay: "5s" }] }),
    5_000
  );
  assert.equal(bodyRetryPause.retryInfoDelayMs(retryInfoBody("999999s")), DAY_MS);
  assert.equal(bodyRetryPause.retryInfoDelayMs({ details: [{ retryDelay: "5s" }] }), null);
  assert.equal(bodyRetryPause.retryInfoDelayMs(proseBody(5)), null);
  assert.equal(bodyRetryPause.retryInfoDelayMs("not json"), null);
  assert.equal(bodyRetryPause.retryInfoDelayMs(null), null);
  assert.equal(bodyRetryPause.retryInfoDelayMs({ error: "Rate limited" }), null);
});
