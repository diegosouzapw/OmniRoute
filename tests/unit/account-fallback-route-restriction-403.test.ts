/**
 * Issue #2929 — Fire Pass (fpk_*) API keys incorrectly marked as unavailable
 * when the models endpoint returns 403.
 *
 * Fireworks Fire Pass keys return `403 "Fire Pass API keys are not authorized
 * for this route."` on /models while still serving chat. That route-restriction
 * 403 used to fall into the api-key-403 branch (→ AUTH_ERROR retryable fallback)
 * or the generic "all other errors" default (→ transient cooldown), either of
 * which cools down / marks the connection unavailable.
 *
 * A route-restriction 403 must be treated as benign for connection health:
 * shouldFallback=false, no cooldown.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");

test("#2929 route-restriction 403 does NOT cool down the connection", () => {
  const result = checkFallbackError(
    403,
    "Fire Pass API keys are not authorized for this route.",
    0,
    null,
    "fireworks"
  );
  assert.equal(result.shouldFallback, false, "route-restriction 403 must not trigger fallback/cooldown");
  assert.equal(result.cooldownMs, 0, "route-restriction 403 must not impose a cooldown");
});

test("#2929 a genuine api-key 403 still triggers fallback (no over-broadening)", () => {
  // A 403 whose body does NOT indicate a route restriction must keep the
  // existing behavior (auth-error / transient fallback), so real bad keys still
  // get cooled down.
  const result = checkFallbackError(403, "invalid api key", 0, null, "fireworks");
  assert.equal(
    result.shouldFallback,
    true,
    "a non-route-restriction 403 must still be treated as fallback-worthy"
  );
});

test("#2929 case-insensitive match on the route-restriction phrase", () => {
  const result = checkFallbackError(
    403,
    "ERROR: Not Authorized For This Route",
    0,
    null,
    "fireworks"
  );
  assert.equal(result.shouldFallback, false);
});
