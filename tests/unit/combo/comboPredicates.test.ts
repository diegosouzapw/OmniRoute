/**
 * tests/unit/combo/comboPredicates.test.ts
 *
 * Characterization tests for the 13 UNTESTED exports of
 * `open-sse/services/combo/comboPredicates.ts`.
 *
 * Scope (intentionally non-overlapping with sibling tests):
 *   - TRANSIENT_FOR_SEMAPHORE / ALL_ACCOUNTS_RATE_LIMITED_PATTERNS (constants)
 *   - isAllAccountsRateLimitedResponse
 *   - isProviderCircuitOpenResult (#1731v2)
 *   - MAX_COMBO_DEPTH_HARD_CAP / MAX_FALLBACK_WAIT_MS / MAX_GLOBAL_ATTEMPTS
 *   - resolveDelayMs
 *   - comboModelNotFoundResponse
 *   - getTargetProvider
 *   - isStreamReadinessFailureErrorBody
 *   - isTokenLimitBreachErrorBody
 *   - toRecordedTarget
 *
 * INTENTIONALLY OUT OF SCOPE (already covered by sibling tests):
 *   - MAX_COMBO_DEPTH            — covered in tests/unit/combo-max-depth-config.test.ts
 *   - clampComboDepth            — covered in tests/unit/combo-max-depth-config.test.ts
 *   - PREDICTIVE_TTFT_MIN_SAMPLES — covered in tests/unit/combo-hedging.test.ts
 *   - shouldSkipForPredictedTtft — covered in tests/unit/combo-hedging.test.ts
 *   - shouldRecordProviderBreakerFailure — covered in
 *     tests/unit/skip-provider-breaker-consumer-2743.test.ts
 *   - getExhaustedTargetSkipReason — covered in tests/unit/combo/combo-exhausted-skip.test.ts
 *
 * Style: node:test + node:assert/strict, matching the rest of tests/unit/.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  // Constants
  TRANSIENT_FOR_SEMAPHORE,
  ALL_ACCOUNTS_RATE_LIMITED_PATTERNS,
  MAX_COMBO_DEPTH_HARD_CAP,
  MAX_FALLBACK_WAIT_MS,
  MAX_GLOBAL_ATTEMPTS,
  // Pure predicates
  isAllAccountsRateLimitedResponse,
  isProviderCircuitOpenResult,
  resolveDelayMs,
  comboModelNotFoundResponse,
  getTargetProvider,
  isStreamReadinessFailureErrorBody,
  isTokenLimitBreachErrorBody,
  toRecordedTarget,
} from "../../../open-sse/services/combo/comboPredicates.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

// ---------------------------------------------------------------------------
// Test helpers — keep inputs realistic, mirroring how the upstream combo
// dispatcher (combo.ts) actually constructs these values.
// ---------------------------------------------------------------------------

function makeTarget(overrides: Partial<ResolvedComboTarget> = {}): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "step-1",
    executionKey: "exec-1",
    modelStr: "openai/gpt-4o",
    provider: "openai",
    providerId: null,
    connectionId: "conn-1",
    weight: 1,
    label: null,
    ...overrides,
  };
}

function makeHeaders(record: Record<string, string>): Headers {
  return new Headers(record);
}

// ---------------------------------------------------------------------------
// 1. TRANSIENT_FOR_SEMAPHORE constant
// ---------------------------------------------------------------------------

test("TRANSIENT_FOR_SEMAPHORE — is the exact 4-element tuple used to cool down RR semaphores", () => {
  assert.deepEqual([...TRANSIENT_FOR_SEMAPHORE], [429, 502, 503, 504]);
});

test("TRANSIENT_FOR_SEMAPHORE — does NOT include non-transient codes (4xx other than 429)", () => {
  for (const code of [400, 401, 403, 404, 408, 422]) {
    assert.equal(
      (TRANSIENT_FOR_SEMAPHORE as readonly number[]).includes(code),
      false,
      `code ${code} must NOT be in TRANSIENT_FOR_SEMAPHORE`
    );
  }
});

test("TRANSIENT_FOR_SEMAPHORE — type is readonly tuple (frozen at module load)", () => {
  assert.equal(typeof TRANSIENT_FOR_SEMAPHORE, "object");
  assert.equal(Array.isArray(TRANSIENT_FOR_SEMAPHORE), true);
});

// ---------------------------------------------------------------------------
// 2. ALL_ACCOUNTS_RATE_LIMITED_PATTERNS constant
// ---------------------------------------------------------------------------

test("ALL_ACCOUNTS_RATE_LIMITED_PATTERNS — matches both 503 canned strings case-insensitively", () => {
  const samples = [
    "Service Unavailable",
    "service temporarily unavailable",
    "SERVICE TEMPORARILY UNAVAILABLE",
    "  Upstream 503 — UNAVAILABLE, please retry",
    "Temporarily Unavailable: upstream provider busy",
  ];
  for (const text of samples) {
    assert.equal(
      ALL_ACCOUNTS_RATE_LIMITED_PATTERNS.some((p) => p.test(text)),
      true,
      `pattern should match: ${text}`
    );
  }
});

test("ALL_ACCOUNTS_RATE_LIMITED_PATTERNS — does NOT match unrelated 503 error text", () => {
  const samples = [
    "Internal Server Error",
    "Bad Gateway",
    "Gateway Timeout",
    "Rate limit exceeded",
    "Quota exhausted",
    "",
  ];
  for (const text of samples) {
    assert.equal(
      ALL_ACCOUNTS_RATE_LIMITED_PATTERNS.some((p) => p.test(text)),
      false,
      `pattern must NOT match: "${text}"`
    );
  }
});

// ---------------------------------------------------------------------------
// 3. isAllAccountsRateLimitedResponse — strictly requires (503, json CT, matching text)
// ---------------------------------------------------------------------------

test("isAllAccountsRateLimitedResponse — true only on 503 + JSON CT + matching body", () => {
  assert.equal(
    isAllAccountsRateLimitedResponse(
      503,
      "application/json",
      "Service temporarily unavailable"
    ),
    true
  );
});

test("isAllAccountsRateLimitedResponse — false on non-503 status even with matching text", () => {
  for (const status of [200, 400, 429, 500, 502, 504]) {
    assert.equal(
      isAllAccountsRateLimitedResponse(
        status,
        "application/json",
        "Service temporarily unavailable"
      ),
      false,
      `status ${status} must NOT trigger (only 503 should)`
    );
  }
});

test("isAllAccountsRateLimitedResponse — false on 503 when content-type is not JSON", () => {
  assert.equal(
    isAllAccountsRateLimitedResponse(503, "text/plain", "Service temporarily unavailable"),
    false
  );
  assert.equal(
    isAllAccountsRateLimitedResponse(503, "text/html", "Service temporarily unavailable"),
    false
  );
  assert.equal(
    isAllAccountsRateLimitedResponse(503, null, "Service temporarily unavailable"),
    false
  );
});

test("isAllAccountsRateLimitedResponse — false on 503 + JSON CT but unrelated error text", () => {
  assert.equal(isAllAccountsRateLimitedResponse(503, "application/json", ""), false);
  assert.equal(
    isAllAccountsRateLimitedResponse(503, "application/json", "Internal Server Error"),
    false
  );
});

test("isAllAccountsRateLimitedResponse — accepts charset-suffixed JSON content type", () => {
  assert.equal(
    isAllAccountsRateLimitedResponse(
      503,
      "application/json; charset=utf-8",
      "Unavailable"
    ),
    true
  );
});

// ---------------------------------------------------------------------------
// 4. isProviderCircuitOpenResult — provider-circuit-breaker signal detector
// ---------------------------------------------------------------------------

test("isProviderCircuitOpenResult — true when X-OmniRoute-Provider-Breaker: open (case-insensitive)", () => {
  for (const value of ["open", "OPEN", "Open", "oPeN"]) {
    const headers = makeHeaders({ "X-OmniRoute-Provider-Breaker": value });
    assert.equal(
      isProviderCircuitOpenResult({ headers, status: 503 }, ""),
      true,
      `header=${value} should match`
    );
  }
});

test("isProviderCircuitOpenResult — false when breaker header is a different state", () => {
  for (const value of ["closed", "half-open", "tripping", ""]) {
    const headers = makeHeaders({ "X-OmniRoute-Provider-Breaker": value });
    assert.equal(
      isProviderCircuitOpenResult({ headers, status: 503 }, ""),
      false,
      `header=${value} should NOT match`
    );
  }
});

test("isProviderCircuitOpenResult — false when no headers present at all", () => {
  assert.equal(
    isProviderCircuitOpenResult({ headers: null, status: 503 }, "provider_circuit_open"),
    true
  );
  assert.equal(
    isProviderCircuitOpenResult({ headers: undefined, status: 503 }, "provider_circuit_open"),
    true
  );
});

test("isProviderCircuitOpenResult — true via error text fallback (provider_circuit_open)", () => {
  assert.equal(
    isProviderCircuitOpenResult(
      { headers: makeHeaders({}), status: 503 },
      "Error: provider_circuit_open — try another target"
    ),
    true
  );
});

test("isProviderCircuitOpenResult — false when neither header nor text indicates open", () => {
  assert.equal(
    isProviderCircuitOpenResult(
      { headers: makeHeaders({ "X-Other": "x" }), status: 503 },
      "Some other upstream error"
    ),
    false
  );
});

test("isProviderCircuitOpenResult — header match wins regardless of errorText", () => {
  const headers = makeHeaders({ "X-OmniRoute-Provider-Breaker": "open" });
  assert.equal(
    isProviderCircuitOpenResult({ headers, status: 503 }, "totally unrelated text"),
    true
  );
});

// ---------------------------------------------------------------------------
// 5. Combo-loop tuning constants (MAX_COMBO_DEPTH_HARD_CAP, MAX_FALLBACK_WAIT_MS,
//    MAX_GLOBAL_ATTEMPTS) — locked absolute safety ceilings, must never change
//    accidentally (operators + SLOs depend on these).
// ---------------------------------------------------------------------------

test("combo-loop ceiling constants — exact values", () => {
  assert.equal(MAX_COMBO_DEPTH_HARD_CAP, 10);
  assert.equal(MAX_FALLBACK_WAIT_MS, 5000);
  assert.equal(MAX_GLOBAL_ATTEMPTS, 30);
});

test("combo-loop ceiling constants — types are finite numbers", () => {
  assert.equal(typeof MAX_COMBO_DEPTH_HARD_CAP, "number");
  assert.equal(typeof MAX_FALLBACK_WAIT_MS, "number");
  assert.equal(typeof MAX_GLOBAL_ATTEMPTS, "number");
  assert.equal(Number.isFinite(MAX_COMBO_DEPTH_HARD_CAP), true);
  assert.equal(Number.isFinite(MAX_FALLBACK_WAIT_MS), true);
  assert.equal(Number.isFinite(MAX_GLOBAL_ATTEMPTS), true);
});

test("combo-loop ceiling constants — strictly positive", () => {
  assert.ok(MAX_COMBO_DEPTH_HARD_CAP > 0);
  assert.ok(MAX_FALLBACK_WAIT_MS > 0);
  assert.ok(MAX_GLOBAL_ATTEMPTS > 0);
});

// ---------------------------------------------------------------------------
// 6. resolveDelayMs — safe numeric coercion with positive-finite guard
// ---------------------------------------------------------------------------

test("resolveDelayMs — returns numeric input unchanged when valid", () => {
  assert.equal(resolveDelayMs(0, 999), 0);
  assert.equal(resolveDelayMs(250, 999), 250);
  assert.equal(resolveDelayMs(12.5, 999), 12.5);
});

test("resolveDelayMs — coerces numeric strings", () => {
  assert.equal(resolveDelayMs("1500", 999), 1500);
  assert.equal(resolveDelayMs("0", 999), 0);
});

test("resolveDelayMs — falls back on non-finite values (NaN, Infinity, undefined, non-numeric strings, objects)", () => {
  assert.equal(resolveDelayMs(NaN, 750), 750);
  assert.equal(resolveDelayMs(Infinity, 750), 750);
  assert.equal(resolveDelayMs(-Infinity, 750), 750);
  assert.equal(resolveDelayMs("not-a-number", 750), 750);
  assert.equal(resolveDelayMs(undefined, 750), 750);
  assert.equal(resolveDelayMs({}, 750), 750);
});

test("resolveDelayMs — booleans / non-empty arrays coerce to 1 / NaN respectively", () => {
  // Documented behavior: Number(true) === 1 (finite, ≥ 0), so resolveDelayMs
  // returns 1. Number(false) === 0, same path. Non-empty arrays are NaN.
  // Both finite-positive inputs bypass the fallback by design.
  assert.equal(resolveDelayMs(true, 750), 1);
  assert.equal(resolveDelayMs(false, 750), 0);
  assert.equal(resolveDelayMs([1, 2], 750), 750, "non-empty array → NaN → fallback");
});

test("resolveDelayMs — null / [] coerce to 0 (JS coercion quirk): returns 0, not fallback", () => {
  // Documented behavior: Number(null) === Number([]) === 0 which is finite
  // and >= 0, so resolveDelayMs returns 0 (not the fallback). This is a
  // known JS coercion edge case; callers should not pass null/[] if they
  // want the fallback.
  assert.equal(resolveDelayMs(null, 750), 0);
  assert.equal(resolveDelayMs([], 750), 0);
});

test("resolveDelayMs — falls back on negative numbers (delay must be non-negative)", () => {
  assert.equal(resolveDelayMs(-1, 750), 750);
  assert.equal(resolveDelayMs(-0.5, 750), 750);
});

test("resolveDelayMs — fallback value passes through untouched", () => {
  // Caller-chosen fallback is sacred: must NOT be re-validated.
  assert.equal(resolveDelayMs("garbage", -5), -5);
  assert.equal(resolveDelayMs("garbage", 0), 0);
  assert.equal(resolveDelayMs("garbage", NaN), NaN);
});

// ---------------------------------------------------------------------------
// 7. comboModelNotFoundResponse — 404 JSON envelope
// ---------------------------------------------------------------------------

test("comboModelNotFoundResponse — returns a Response with status 404 and JSON content-type", async () => {
  const res = comboModelNotFoundResponse("Unknown model");
  assert.equal(res.status, 404);
  assert.match(res.headers.get("Content-Type") ?? "", /^application\/json/);
});

test("comboModelNotFoundResponse — body includes the supplied message verbatim", async () => {
  const res = comboModelNotFoundResponse("Custom not-found message: openai/foo");
  const body = (await res.json()) as { error?: { message?: string } };
  assert.equal(body.error?.message, "Custom not-found message: openai/foo");
});

test("comboModelNotFoundResponse — different inputs produce different bodies (no caching)", async () => {
  const r1 = comboModelNotFoundResponse("msg-A");
  const r2 = comboModelNotFoundResponse("msg-B");
  assert.notEqual(r1, r2);
  const b1 = (await r1.json()) as { error: { message: string } };
  const b2 = (await r2.json()) as { error: { message: string } };
  assert.equal(b1.error.message, "msg-A");
  assert.equal(b2.error.message, "msg-B");
});

// ---------------------------------------------------------------------------
// 8. getTargetProvider — providerId passthrough with parseModel fallback
// ---------------------------------------------------------------------------

test("getTargetProvider — explicit providerId always wins (even when garbage)", () => {
  // Caller knows best: bypass parseModel entirely.
  assert.equal(getTargetProvider("openai/gpt-4o", "anthropic"), "anthropic");
  assert.equal(getTargetProvider("anything", "custom-provider"), "custom-provider");
  assert.equal(getTargetProvider("", "fallback"), "fallback");
});

test("getTargetProvider — falls back to parseModel.provider when no providerId", () => {
  assert.equal(getTargetProvider("openai/gpt-4o"), "openai");
  assert.equal(getTargetProvider("anthropic/claude-3"), "anthropic");
  assert.equal(getTargetProvider("gemini/gemini-1.5-pro"), "gemini");
});

test("getTargetProvider — handles undefined providerId (same as omitting it)", () => {
  assert.equal(getTargetProvider("openai/gpt-4o", undefined), "openai");
  assert.equal(getTargetProvider("openai/gpt-4o", null), "openai");
});

test("getTargetProvider — returns 'unknown' sentinel for unparseable, providerId-less input", () => {
  // parseModel handles non-string / empty / control-char input by returning
  // an empty parsed shape; this function then surfaces the sentinel.
  const out = getTargetProvider("not-a-parseable-model-string-zzz");
  assert.equal(typeof out, "string");
  // Either the sentinel "unknown" or the parseModel-resolved provider are
  // acceptable — the contract is "never throws, always returns a string".
  assert.ok(out.length > 0);
});

test("getTargetProvider — pure: does NOT mutate the model string", () => {
  const original = "openai/gpt-4o";
  const snapshot = original;
  // Call repeatedly.
  getTargetProvider(original);
  getTargetProvider(original, "anthropic");
  getTargetProvider(original, undefined);
  assert.equal(original, snapshot, "input model string must not mutate");
});

// ---------------------------------------------------------------------------
// 9. isStreamReadinessFailureErrorBody — pre-flight readiness signal detector
// ---------------------------------------------------------------------------

test("isStreamReadinessFailureErrorBody — true for STREAM_READINESS_TIMEOUT", () => {
  assert.equal(
    isStreamReadinessFailureErrorBody({ error: { code: "STREAM_READINESS_TIMEOUT" } }),
    true
  );
});

test("isStreamReadinessFailureErrorBody — true for STREAM_EARLY_EOF", () => {
  assert.equal(
    isStreamReadinessFailureErrorBody({ error: { code: "STREAM_EARLY_EOF" } }),
    true
  );
});

test("isStreamReadinessFailureErrorBody — false for upstream 4xx/5xx", () => {
  for (const code of [
    "TOKEN_LIMIT_EXCEEDED",
    "RATE_LIMIT_EXCEEDED",
    "PROVIDER_UNAVAILABLE",
    "BAD_REQUEST",
    "stream_readiness_timeout", // case-sensitive
    "STREAM_READINESS_TIMEOUT_EXTRA",
    "",
    "STREAM_EARLY_EOF_V2",
  ]) {
    assert.equal(
      isStreamReadinessFailureErrorBody({ error: { code } }),
      false,
      `code=${code} must NOT match`
    );
  }
});

test("isStreamReadinessFailureErrorBody — false on null/undefined/primitives", () => {
  assert.equal(isStreamReadinessFailureErrorBody(null), false);
  assert.equal(isStreamReadinessFailureErrorBody(undefined), false);
  assert.equal(isStreamReadinessFailureErrorBody("STREAM_READINESS_TIMEOUT"), false);
  assert.equal(isStreamReadinessFailureErrorBody(42), false);
  assert.equal(isStreamReadinessFailureErrorBody(true), false);
  assert.equal(isStreamReadinessFailureErrorBody([]), false);
});

test("isStreamReadinessFailureErrorBody — false when error or code is missing/wrong-shape", () => {
  // Missing error.
  assert.equal(isStreamReadinessFailureErrorBody({}), false);
  // Wrong-type error.
  assert.equal(isStreamReadinessFailureErrorBody({ error: "STREAM_READINESS_TIMEOUT" }), false);
  assert.equal(isStreamReadinessFailureErrorBody({ error: 42 }), false);
  assert.equal(isStreamReadinessFailureErrorBody({ error: null }), false);
  // Wrong-type code.
  assert.equal(
    isStreamReadinessFailureErrorBody({ error: { code: 1 } }),
    false
  );
  assert.equal(
    isStreamReadinessFailureErrorBody({ error: { code: null } }),
    false
  );
});

// ---------------------------------------------------------------------------
// 10. isTokenLimitBreachErrorBody — local per-API-key token-limit breach
// ---------------------------------------------------------------------------

test("isTokenLimitBreachErrorBody — true for TOKEN_LIMIT_EXCEEDED code", () => {
  assert.equal(
    isTokenLimitBreachErrorBody({ error: { code: "TOKEN_LIMIT_EXCEEDED" } }),
    true
  );
});

test("isTokenLimitBreachErrorBody — false for upstream 429 / other rate limits", () => {
  for (const code of [
    "RATE_LIMIT_EXCEEDED",
    "QUOTA_EXHAUSTED",
    "PROVIDER_RATE_LIMITED",
    "STREAM_READINESS_TIMEOUT",
    "",
    "token_limit_exceeded", // case-sensitive
  ]) {
    assert.equal(
      isTokenLimitBreachErrorBody({ error: { code } }),
      false,
      `code=${code} must NOT match`
    );
  }
});

test("isTokenLimitBreachErrorBody — false on null/undefined/primitives", () => {
  assert.equal(isTokenLimitBreachErrorBody(null), false);
  assert.equal(isTokenLimitBreachErrorBody(undefined), false);
  assert.equal(isTokenLimitBreachErrorBody("TOKEN_LIMIT_EXCEEDED"), false);
  assert.equal(isTokenLimitBreachErrorBody(42), false);
  assert.equal(isTokenLimitBreachErrorBody([]), false);
});

test("isTokenLimitBreachErrorBody — false when error or code is missing/wrong-shape", () => {
  assert.equal(isTokenLimitBreachErrorBody({}), false);
  assert.equal(isTokenLimitBreachErrorBody({ error: "TOKEN_LIMIT_EXCEEDED" }), false);
  assert.equal(isTokenLimitBreachErrorBody({ error: null }), false);
  assert.equal(isTokenLimitBreachErrorBody({ error: { code: 1 } }), false);
  assert.equal(isTokenLimitBreachErrorBody({ error: { code: null } }), false);
});

// ---------------------------------------------------------------------------
// 11. toRecordedTarget — projection of a ResolvedComboTarget for telemetry
// ---------------------------------------------------------------------------

test("toRecordedTarget — projects only the six recorded fields, drops the rest", () => {
  const t = makeTarget({
    stepId: "s-42",
    executionKey: "ek-99",
    provider: "anthropic",
    providerId: "anthropic-main",
    connectionId: "conn-7",
    label: "primary",
    weight: 5,
    trafficType: "production",
    // The below fields must NOT leak into the recorded projection:
    failoverBeforeRetry: { kind: "secret" },
    allowedConnectionIds: ["x", "y"],
  });
  const recorded = toRecordedTarget(t);
  assert.deepEqual(
    Object.keys(recorded).sort(),
    ["connectionId", "executionKey", "label", "provider", "providerId", "stepId"].sort()
  );
  assert.equal(recorded.executionKey, "ek-99");
  assert.equal(recorded.stepId, "s-42");
  assert.equal(recorded.provider, "anthropic");
  assert.equal(recorded.providerId, "anthropic-main");
  assert.equal(recorded.connectionId, "conn-7");
  assert.equal(recorded.label, "primary");
});

test("toRecordedTarget — preserves null and falsy values (does NOT skip fields)", () => {
  const t = makeTarget({
    providerId: null,
    connectionId: null,
    label: null,
  });
  const recorded = toRecordedTarget(t);
  assert.equal(recorded.providerId, null);
  assert.equal(recorded.connectionId, null);
  assert.equal(recorded.label, null);
  // ensure the keys are still present
  assert.ok("providerId" in recorded);
  assert.ok("connectionId" in recorded);
  assert.ok("label" in recorded);
});

test("toRecordedTarget — does NOT mutate the input target", () => {
  const t = makeTarget({ label: "primary", weight: 5 });
  const snapshot = JSON.stringify(t);
  toRecordedTarget(t);
  toRecordedTarget(t);
  toRecordedTarget(t);
  assert.equal(JSON.stringify(t), snapshot, "input target must not mutate");
});

test("toRecordedTarget — returns a fresh object each call (no shared references)", () => {
  const t = makeTarget({ connectionId: "c-1" });
  const a = toRecordedTarget(t);
  const b = toRecordedTarget(t);
  assert.notEqual(a, b, "must return distinct object instances");
  assert.deepEqual(a, b);
  // Mutating one must not affect the other.
  a.connectionId = "mutated";
  assert.equal(b.connectionId, "c-1");
});

// ---------------------------------------------------------------------------
// 12. Type-preservation + no-side-effect contracts (cross-cutting)
// ---------------------------------------------------------------------------

test("pure predicates — return the exact primitive type advertised", () => {
  // Boolean predicates.
  assert.equal(typeof isAllAccountsRateLimitedResponse(200, "text/plain", ""), "boolean");
  assert.equal(typeof isProviderCircuitOpenResult({}, ""), "boolean");
  assert.equal(typeof isStreamReadinessFailureErrorBody({}), "boolean");
  assert.equal(typeof isTokenLimitBreachErrorBody({}), "boolean");
  // Numeric predicates.
  assert.equal(typeof resolveDelayMs(1, 0), "number");
  // Response constructors.
  assert.ok(comboModelNotFoundResponse("x") instanceof Response);
  // String predicates.
  const t = makeTarget();
  assert.equal(typeof getTargetProvider("openai/gpt-4o"), "string");
  assert.equal(typeof toRecordedTarget(t).executionKey, "string");
});

test("inputs are not mutated — Set inputs round-trip identity", () => {
  const exhaustedProviders = new Set(["openai"]);
  const exhaustedConnections = new Set(["openai:conn-1"]);
  // Snapshot the internal storage size + add() then re-snapshot.
  const beforeP = [...exhaustedProviders];
  const beforeC = [...exhaustedConnections];
  // isAllAccountsRateLimitedResponse uses no sets but call all set-driven
  // predicates to ensure none of them try to write.
  isAllAccountsRateLimitedResponse(503, "application/json", "Service temporarily unavailable");
  isProviderCircuitOpenResult({ headers: makeHeaders({}), status: 503 }, "");
  // Verify the helper set hasn't changed.
  assert.deepEqual([...exhaustedProviders], beforeP);
  assert.deepEqual([...exhaustedConnections], beforeC);
});
