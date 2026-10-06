/**
 * #10360 — the executor-result contract guard must not hot-loop the router.
 *
 * Two defects, one symptom (`tests/unit/batch_api.test.ts` hanging forever):
 *
 * 1. CROSS-REALM FALSE POSITIVE. The guard added in #10256 used a bare
 *    `result.response instanceof Response`. OmniRoute's default egress
 *    (`open-sse/utils/proxyFetch.ts`) is the npm `undici` package's `fetch`,
 *    whose `Response` class is NOT `globalThis.Response` — so every ordinary
 *    upstream response arrived as a "contract violation". The guard must
 *    recognize a structurally valid Response from any realm.
 *
 * 2. TRANSIENT MISCLASSIFICATION. A genuine contract violation is an INTERNAL
 *    bug, not a flaky upstream. It carried no `.status`, so chatCore's default
 *    mapped it to 502 → the connection got cooled down as "rate limited", the
 *    provider breaker counted it, and `processSingleItemWithRetry` (which
 *    retries 429/502/504 up to 200×/24h) span forever. It must surface as a
 *    terminal internal 500 carrying a stable error code, and every resilience
 *    layer must treat that code as request-scoped: no cooldown, no breaker.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { Response as UndiciResponse } from "undici";

import { normalizeExecutorResult } from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";
import { EXECUTOR_CONTRACT_VIOLATION_CODE } from "../../open-sse/config/constants.ts";
import {
  isRequestScopedUpstreamFailure,
  shouldSkipConnDisable,
} from "../../open-sse/services/combo/comboPredicates.ts";
import { shouldTripProviderBreakerForResult } from "../../src/sse/handlers/chatPredicates.ts";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";

// ─── 1. Cross-realm Response acceptance ──────────────────────────────────────

test("undici's Response is a different class than the global one (premise)", () => {
  assert.notEqual(
    UndiciResponse as unknown,
    globalThis.Response as unknown,
    "if these ever become the same class the cross-realm guard below is moot"
  );
  assert.equal(
    new UndiciResponse("x", { status: 200 }) instanceof globalThis.Response,
    false,
    "premise: an undici Response fails a bare `instanceof Response`"
  );
});

test("normalizeExecutorResult accepts a cross-realm Response in the capture-object arm", () => {
  const response = new UndiciResponse(JSON.stringify({ ok: true }), { status: 401 });

  const normalized = normalizeExecutorResult({
    response,
    url: "https://api.openai.com/v1/chat/completions",
    headers: { "x-req": "1" },
    transformedBody: { a: 1 },
  });

  assert.equal(normalized.response, response as unknown);
  assert.equal(normalized.response.status, 401);
  assert.equal(normalized.url, "https://api.openai.com/v1/chat/completions");
  assert.deepEqual(normalized.headers, { "x-req": "1" });
  assert.deepEqual(normalized.transformedBody, { a: 1 });
});

test("normalizeExecutorResult accepts a bare cross-realm Response", () => {
  const response = new UndiciResponse("body", { status: 503 });

  const normalized = normalizeExecutorResult(response);

  assert.equal(normalized.response, response as unknown);
  assert.equal(normalized.response.status, 503);
  assert.equal(normalized.url, "");
  assert.deepEqual(normalized.headers, {});
  assert.equal(normalized.transformedBody, null);
});

// ─── 2. A genuine violation is terminal, not a transient provider failure ────

function captureThrow(run: () => unknown): Error & { status?: unknown; code?: unknown } {
  try {
    run();
  } catch (err) {
    return err as Error & { status?: unknown; code?: unknown };
  }
  throw new assert.AssertionError({ message: "expected normalizeExecutorResult to throw" });
}

test("a genuinely malformed executor result still throws", () => {
  assert.throws(() => normalizeExecutorResult({}), /must contain a Response/);
  assert.throws(() => normalizeExecutorResult(undefined), /must contain a Response/);
  assert.throws(() => normalizeExecutorResult({ response: "not-a-response" }), /must contain a/);
  // A partial look-alike (no body readers) must NOT slip past the duck-type.
  assert.throws(
    () => normalizeExecutorResult({ response: { status: 200, ok: true } }),
    /must contain a Response/
  );
});

test("the contract-violation error carries an internal-terminal status + stable code", () => {
  const err = captureThrow(() => normalizeExecutorResult({ response: "not-a-response" }));

  assert.equal(err.status, 500, "an internal contract violation is a 500, never a provider 502");
  assert.equal(
    err.code,
    EXECUTOR_CONTRACT_VIOLATION_CODE,
    "chatCore reads `.code` (getUpstreamErrorIdentifier) to tag the surfaced error"
  );
  assert.equal(EXECUTOR_CONTRACT_VIOLATION_CODE, "executor_contract_violation");
});

test("the contract-violation code is classified as a request-scoped failure", () => {
  assert.equal(isRequestScopedUpstreamFailure({ code: EXECUTOR_CONTRACT_VIOLATION_CODE }), true);
});

test("a contract violation must not cool the connection down", () => {
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 500,
        errorCode: EXECUTOR_CONTRACT_VIOLATION_CODE,
        errorType: null,
        error: "Executor result must contain a Response",
      },
      false,
      false,
      "openai"
    ),
    true,
    "our own bug must never mark the operator's account as rate-limited/unavailable"
  );
});

test("a contract violation must not trip the provider circuit breaker", () => {
  assert.equal(
    shouldTripProviderBreakerForResult(
      {
        status: 500,
        errorCode: EXECUTOR_CONTRACT_VIOLATION_CODE,
        errorType: null,
        error: "Executor result must contain a Response",
      },
      false,
      false
    ),
    false,
    "500 is a breaker-failure status, but this one never reached the provider"
  );
});

test("checkFallbackError treats the contract violation as terminal — no retry, no cooldown", () => {
  const decision = checkFallbackError(
    500,
    "[500]: Executor result must contain a Response",
    0,
    "gpt-4o-mini",
    "openai",
    null,
    null,
    { code: EXECUTOR_CONTRACT_VIOLATION_CODE }
  );

  assert.equal(decision.shouldFallback, false, "retrying our own bug just reproduces it");
  assert.equal(decision.cooldownMs, 0, "no connection cooldown for an internal defect");
  assert.equal(decision.skipProviderBreaker, true);
});

test("a real provider 500 is still retryable (the terminal branch is not over-broad)", () => {
  const decision = checkFallbackError(500, "Internal server error", 0, null, "openai");

  assert.equal(decision.shouldFallback, true);
  assert.ok(decision.cooldownMs > 0, "a genuine upstream 500 keeps its backoff cooldown");
});
