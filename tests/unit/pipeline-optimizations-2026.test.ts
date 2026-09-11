import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getCircuitBreaker, STATE } from "../../src/shared/utils/circuitBreaker.ts";
import {
  buildOmniRouteResponseMetaHeaders,
  attachOmniRouteMetaHeaders,
} from "../../src/domain/omnirouteResponseMeta.ts";
import { OMNIROUTE_RESPONSE_HEADERS } from "../../src/shared/constants/headers.ts";

describe("Pipeline Optimizations 2026 Suite", () => {
  it("passively refreshes OPEN circuit breakers to HALF_OPEN when reset timeout has elapsed on read (lazy recovery)", async () => {
    const breaker = getCircuitBreaker("test-lazy-recovery-provider-2026", {
      failureThreshold: 1,
      resetTimeout: 50, // 50ms fast timeout
    });

    // Cause breaker to OPEN
    try {
      await breaker.execute(async () => {
        throw new Error("Trigger OPEN state");
      });
    } catch {
      // Expected failure
    }

    assert.equal(breaker.state, STATE.OPEN);

    // Sleep past resetTimeout (70ms)
    await new Promise((resolve) => setTimeout(resolve, 70));

    // Lazy recovery on read (canExecute / getStatus)
    assert.equal(breaker.canExecute(), true);
    assert.equal(breaker.state, STATE.HALF_OPEN);
  });

  it("builds and attaches targetAttempts and failureReason meta headers", () => {
    const meta = buildOmniRouteResponseMetaHeaders({
      model: "agentic-code-fast",
      provider: "anthropic",
      targetAttempts: 3,
      failureReason: "Provider circuit open on candidate #1, fallback succeeded",
      fallbackAttempts: 2,
    });

    assert.equal(meta[OMNIROUTE_RESPONSE_HEADERS.targetAttempts], "3");
    assert.equal(
      meta[OMNIROUTE_RESPONSE_HEADERS.failureReason],
      "Provider circuit open on candidate #1, fallback succeeded"
    );
    assert.equal(meta[OMNIROUTE_RESPONSE_HEADERS.fallbackAttempts], "2");

    const responseHeaders = new Headers();
    attachOmniRouteMetaHeaders(responseHeaders, {
      targetAttempts: 4,
      failureReason: "Rate limit encountered on primary connection",
    });

    assert.equal(responseHeaders.get("x-omniroute-target-attempts"), "4");
    assert.equal(
      responseHeaders.get("x-omniroute-failure-reason"),
      "Rate limit encountered on primary connection"
    );
  });
});
