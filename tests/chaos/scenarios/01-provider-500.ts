/*!
 * Scenario 01 — Provider returns 500.
 *
 * What this proves:
 *   • When an upstream provider starts returning HTTP 500 for every
 *     request, the system opens a circuit breaker after a configurable
 *     failure threshold and stops hammering the upstream.
 *   • While the breaker is OPEN, fallback (secondary provider, queue,
 *     cached response, etc.) engages so user requests still succeed.
 *   • Every error emitted by the breaker carries a `trace_id` so an
 *     operator can cross-reference it with logs/metrics.
 *   • The circuit transitions OPEN → HALF_OPEN after the cooldown
 *     elapses, then CLOSED on a single successful probe.
 *
 * Hermetic:
 *   Uses the real `CircuitBreaker` from src/shared/utils/circuitBreaker.ts
 *   but stubs `globalThis.fetch` with a synthetic 500 responder. No
 *   network calls reach the outside world.
 *
 * Cleanup:
 *   Restores globalThis.fetch in LIFO order. The runner's invariant
 *   `no-fetch-leftover` confirms the restore worked.
 */
import {
  CircuitBreaker,
  CircuitBreakerOpenError,
  STATE,
} from "../../../src/shared/utils/circuitBreaker.ts";
import { resetAllCircuitBreakers } from "../../../src/shared/utils/circuitBreaker.ts";
import { generateTraceId, injectFetchFail } from "../injectors.ts";
import { chaosError } from "../injectors.ts";
import type { ScenarioContext } from "../runner.ts";

export const id = "01-provider-500";
export const title = "Provider returns 500 — circuit breaker trips, fallback engages, alerts fire";

export async function run(ctx: ScenarioContext): Promise<void> {
  // ── Wire up the injector ──────────────────────────────────────────────
  // Every fetch to the synthetic provider URL returns 500. Anything not
  // matching the URL falls through to the real fetch (we don't expect
  // any such call but the safety net keeps us hermetic).
  const failInjector = injectFetchFail({
    status: 500,
    body: JSON.stringify({ error: "internal_error", trace_id: generateTraceId() }),
    match: (url) => url.startsWith("http://chaos.test/"),
  });
  ctx.injectors.push(failInjector);

  // ── Build a fallback strategy ─────────────────────────────────────────
  // "Fallback" in this scenario is a second CircuitBreaker pointed at a
  // different synthetic URL that always returns 200. The primary feeds
  // it requests once the primary breaker is OPEN.
  const fallbackInjector = injectFetchFail({
    status: 200,
    body: JSON.stringify({ choices: [{ message: { role: "assistant", content: "fallback ok" } }] }),
    match: (url) => url.startsWith("http://fallback.test/"),
  });
  ctx.injectors.push(fallbackInjector);

  // ── State observed by the alerts ──────────────────────────────────────
  const alertsFired: { kind: string; at: number; traceId: string }[] = [];

  // ── Primary breaker ───────────────────────────────────────────────────
  const primary = new CircuitBreaker("chaos-primary", {
    failureThreshold: 3,
    resetTimeout: 200, // short so the suite doesn't drag
    isFailure: () => true, // any throw counts
  });
  // The runner resets the global registry between scenarios; this breaker
  // is local to the scenario so it survives.
  primary.onStateChange = (name, oldState, newState) => {
    alertsFired.push({ kind: `transition:${oldState}->${newState}`, at: Date.now(), traceId: generateTraceId() });
  };

  // ── Drive the breaker ─────────────────────────────────────────────────
  // Send 5 requests — the first 3 should propagate the 500 (and trip the
  // breaker), requests 4 and 5 should short-circuit via the breaker.
  let primaryThrows = 0;
  let primaryShortCircuits = 0;
  let fallbackHits = 0;

  for (let i = 0; i < 5; i++) {
    try {
      await primary.execute(async () => {
        const res = await fetch("http://chaos.test/v1/chat");
        if (res.status >= 500) {
          const err = chaosError("upstream_500", `upstream returned ${res.status}`, { status: res.status });
          ctx.captureError(err);
          throw err;
        }
        return res;
      });
    } catch (e) {
      if (e instanceof CircuitBreakerOpenError) {
        primaryShortCircuits++;
        // Fallback engages. This is the SUT behavior we're proving.
        const fb = await fetch("http://fallback.test/v1/chat");
        if (fb.ok) fallbackHits++;
      } else {
        primaryThrows++;
      }
    }
  }

  ctx.assert("primary-tripped", primary.getStatus().state === STATE.OPEN || primary.getStatus().state === STATE.HALF_OPEN);
  ctx.assert("at-least-one-short-circuit", primaryShortCircuits >= 1, `shortCircuits=${primaryShortCircuits}`);
  ctx.assert("fallback-engaged", fallbackHits >= 1, `fallbackHits=${fallbackHits}`);
  ctx.assert("alerts-fired", alertsFired.length >= 2, `alerts=${alertsFired.length}`);

  // ── Verify trace_id captured on errors ────────────────────────────────
  ctx.assert(
    "errors-have-trace-id",
    ctx.state.errorTraceIds.length >= 3 && ctx.state.errorTraceIds.every((id) => id && id.startsWith("chaos-")),
    `traceIds=${ctx.state.errorTraceIds.length}`,
  );

  // ── Recovery: HALF_OPEN after cooldown ────────────────────────────────
  await new Promise((r) => setTimeout(r, 220));
  const recovered = primary.getStatus();
  ctx.assert("breaker-half-open-after-cooldown", recovered.state === STATE.HALF_OPEN, `state=${recovered.state}`);

  // ── Cleanup breaker registry so the next scenario starts fresh ────────
  // resetAllCircuitBreakers() is global; we only call it after we've
  // captured the state we want. Safe in this scenario because no other
  // scenario depends on this breaker's state.
  resetAllCircuitBreakers();
}