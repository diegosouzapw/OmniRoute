import { test } from "node:test";
import assert from "node:assert/strict";
import {
  classifyProviderBreakerResult,
  isChatGptWebBridgeFailure,
  shouldTripProviderBreakerForResult,
} from "../../src/sse/handlers/chatPredicates.ts";
import {
  recordProviderFailure,
  clearProviderFailure,
  isProviderInCooldown,
} from "../../open-sse/services/accountFallback.ts";
import { PROVIDER_PROFILES } from "../../open-sse/config/constants.ts";
import { describeBridgeLoadFailure } from "../../open-sse/utils/chatgptWebFirstParty.ts";
import { classifyProviderProbeResult } from "../../src/sse/handlers/providerProbeClassification.ts";
import { shouldSkipConnDisable } from "../../open-sse/services/combo/comboPredicates.ts";

// Network-layer errors and OmniRoute's own queue timeouts must NOT trip the
// provider circuit breaker. These are not provider failures — the provider never
// saw the request, so it may be perfectly healthy while only the network path is
// broken (single-model path; the combo same-provider dead-proxy case is #8376's
// contract and stays untouched).
test("proxy_unreachable errorCode does NOT trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 502, errorCode: "proxy_unreachable", errorType: null, error: "ECONNREFUSED" },
    false,
    false
  );
  assert.equal(result, false);
});
test("RATE_LIMIT_QUEUE_TIMEOUT errorCode does NOT trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 503, errorCode: "RATE_LIMIT_QUEUE_TIMEOUT", errorType: null, error: "queue expired" },
    false,
    false
  );
  assert.equal(result, false);
});
test("RATE_LIMIT_QUEUE_WEDGED errorCode does NOT trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 503, errorCode: "RATE_LIMIT_QUEUE_WEDGED", errorType: null, error: "limiter wedged" },
    false,
    false
  );
  assert.equal(result, false);
});
test("genuine 502 without proxy_unreachable DOES trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 502, errorCode: null, errorType: null, error: "upstream error" },
    false,
    false
  );
  assert.equal(result, true);
});
test("genuine 503 without queue timeout DOES trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 503, errorCode: null, errorType: null, error: "service unavailable" },
    false,
    false
  );
  assert.equal(result, true);
});
test("ChatGPT Web bridge 502 does not trip the provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    {
      status: 502,
      errorCode: null,
      errorType: null,
      error: "ChatGPT Web first-party challenge bridge is incomplete",
    },
    false,
    false,
    "chatgpt-web"
  );
  assert.equal(result, false);
});
test("ChatGPT Web bridge failure is ignored without disabling the connection", () => {
  const outcome = classifyProviderBreakerResult(
    {
      success: false,
      status: 502,
      errorCode: null,
      errorType: null,
      error: "ChatGPT Web first-party request client is unavailable",
    },
    false,
    false,
    "chatgpt-web"
  );
  assert.equal(outcome, "ignore");
});
test("ChatGPT Web browser-launch failure is local, not a dead account", () => {
  // Playwright reports a missing/unlaunchable binary like this; it must not disable
  // the connection (regression: it surfaced as `Account ... unavailable (502)`).
  assert.equal(
    isChatGptWebBridgeFailure(
      "chatgpt-web",
      "browserType.launch: Executable doesn't exist at /home/u/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome"
    ),
    true
  );
  assert.equal(
    isChatGptWebBridgeFailure("chatgpt-web", "ChatGPT Web first-party bridge did not initialize"),
    true
  );
  assert.equal(
    isChatGptWebBridgeFailure("chatgpt-web", "ChatGPT Web request scope is unavailable"),
    true
  );
  assert.equal(
    isChatGptWebBridgeFailure(
      "chatgpt-web",
      "ChatGPT Web first-party conversation returned a non-SSE response (the app shell)"
    ),
    true
  );
  // Other providers keep their existing classification.
  assert.equal(
    isChatGptWebBridgeFailure("gemini-web", "browserType.launch: Executable doesn't exist"),
    false
  );
});

test("ChatGPT Web bridge-module load failure (CSP / page error) is a local bridge failure", () => {
  // The base's bridge injector reports every load failure through
  // describeBridgeLoadFailure(); that message must be isolated like the others.
  const message = describeBridgeLoadFailure([
    { kind: "csp", detail: "script-src blocked blob:https://chatgpt.com/1" },
  ]);
  assert.equal(isChatGptWebBridgeFailure("chatgpt-web", message), true);
  assert.equal(isChatGptWebBridgeFailure("chatgpt-web", describeBridgeLoadFailure([])), true);
  assert.equal(isChatGptWebBridgeFailure("gemini-web", message), false);
});

test("an acquired HALF_OPEN probe that hits a ChatGPT Web bridge failure does not re-open the breaker", () => {
  const result = {
    success: false,
    status: 502,
    errorCode: null,
    errorType: null,
    error: "ChatGPT Web first-party bridge did not initialize",
  };
  assert.equal(classifyProviderProbeResult(result, "chatgpt-web"), "ignore");
  // Other providers keep the ordinary upstream policy for the same 502.
  assert.equal(classifyProviderProbeResult(result, "openai"), "failure");
  assert.equal(classifyProviderProbeResult({ result }, "chatgpt-web"), "ignore");
});

test("a ChatGPT Web bridge failure never disables the connection (single-model and combo)", () => {
  const result = {
    status: 502,
    errorCode: null,
    errorType: null,
    error: new Error("ChatGPT Web first-party challenge bridge is incomplete"),
  };
  assert.equal(shouldSkipConnDisable(result, false, false, "chatgpt-web"), true);
  // Same synthetic 502 from another provider keeps the ordinary account policy.
  assert.equal(shouldSkipConnDisable(result, false, false, "openai"), false);
});

test("isCombo=true prevents breaker trip regardless of error", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 502, errorCode: null, errorType: null, error: "upstream error" },
    true,
    false
  );
  assert.equal(result, false);
});
test("forceLiveComboTest=true prevents breaker trip (combo will try next target)", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 502, errorCode: null, errorType: null, error: "upstream error" },
    false,
    true
  );
  assert.equal(result, false);
});

// #12254: the single-model call site accounts for a RESOLVED dispatch result exactly
// once through this classifier — `breaker.execute()` no longer reads a resolved
// `{ success: false, status: 5xx }` as a success.
test("classifyProviderBreakerResult: a resolved 503 on the single-model path is a failure", () => {
  const outcome = classifyProviderBreakerResult(
    { success: false, status: 503, errorCode: null, errorType: null, error: "service unavailable" },
    false,
    false
  );
  assert.equal(outcome, "failure");
});
test("classifyProviderBreakerResult: a successful single-model dispatch is a success", () => {
  const outcome = classifyProviderBreakerResult({ success: true, status: 200 }, false, false);
  assert.equal(outcome, "success");
});
test("classifyProviderBreakerResult: excluded failures are ignored, not counted as successes", () => {
  const outcome = classifyProviderBreakerResult(
    { success: false, status: 502, errorCode: "proxy_unreachable", errorType: null },
    false,
    false
  );
  assert.equal(outcome, "ignore");
});
test("classifyProviderBreakerResult: combo dispatches leave accounting to combo.ts (success and failure)", () => {
  assert.equal(
    classifyProviderBreakerResult({ success: true, status: 200 }, true, false),
    "ignore"
  );
  assert.equal(
    classifyProviderBreakerResult({ success: false, status: 503, errorCode: null }, true, false),
    "ignore"
  );
});
test("classifyProviderBreakerResult: live combo tests never touch the breaker", () => {
  assert.equal(
    classifyProviderBreakerResult({ success: true, status: 200 }, false, true),
    "ignore"
  );
  assert.equal(
    classifyProviderBreakerResult({ success: false, status: 503, errorCode: null }, false, true),
    "ignore"
  );
});

test("queue-timeout recordProviderFailure never opens the provider breaker", () => {
  // Control first: that many real failures WOULD open the breaker — proving the
  // isQueueTimeout flag, not an inert provider, is what keeps it closed.
  const control = "test-qt-control-provider";
  clearProviderFailure(control);
  const threshold = PROVIDER_PROFILES.apikey.circuitBreakerThreshold;
  for (let i = 0; i < threshold; i++) {
    recordProviderFailure(control, undefined, undefined, null, {});
  }
  assert.equal(isProviderInCooldown(control), true, "sanity: real failures open the breaker");

  // The queue-timeout path must never reach the breaker, no matter how many fire.
  const provider = "test-qt-provider";
  clearProviderFailure(provider);
  for (let i = 0; i < threshold; i++) {
    recordProviderFailure(provider, undefined, undefined, null, { isQueueTimeout: true });
  }
  assert.equal(isProviderInCooldown(provider), false, "queue timeouts must not open the breaker");
});

test("same-provider network errors in one window dedup to a single failure", () => {
  // Several combo targets on the same provider failing one network event (a VPN blip)
  // must count once, not per target — otherwise one blip opens the provider breaker.
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;
  try {
    const provider = "test-net-dedup-provider";
    clearProviderFailure(provider);
    const threshold = PROVIDER_PROFILES.apikey.circuitBreakerThreshold;
    for (let i = 0; i < threshold; i++) {
      recordProviderFailure(provider, undefined, undefined, null, { isNetworkError: true });
      now += 500; // every call inside the same 10s window
    }
    assert.equal(
      isProviderInCooldown(provider),
      false,
      "one transient network event must not open the breaker"
    );
  } finally {
    Date.now = originalNow;
  }
});

test("persistent dead proxy across windows still opens the breaker", () => {
  // A genuinely dead proxy keeps failing across requests (past the dedup window), so it
  // must still accumulate to the breaker threshold — the dedup must not shield real pain.
  const originalNow = Date.now;
  let now = 1_700_000_000_000;
  Date.now = () => now;
  try {
    const provider = "test-net-deadproxy-provider";
    clearProviderFailure(provider);
    const threshold = PROVIDER_PROFILES.apikey.circuitBreakerThreshold;
    for (let i = 0; i < threshold; i++) {
      recordProviderFailure(provider, undefined, undefined, null, { isNetworkError: true });
      now += 11_000; // past each 10s window
    }
    assert.equal(
      isProviderInCooldown(provider),
      true,
      "a persistent network failure must still accumulate to the threshold"
    );
  } finally {
    Date.now = originalNow;
  }
});
