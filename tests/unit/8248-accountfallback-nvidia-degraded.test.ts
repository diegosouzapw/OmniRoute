// Regression guard for #8248: checkFallbackError() must classify NVIDIA NIM's
// "Function <uuid> ... DEGRADED" function-state 400 body as fallback-worthy
// (model-unhealthy), instead of falling through to the generic
// shouldFallback:false/UNKNOWN branch.
import test from "node:test";
import assert from "node:assert/strict";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";

test("#8248: nvidia NIM DEGRADED function-state 400 is classified as fallback-worthy (model unhealthy)", () => {
  const body =
    'Function id "d290f1ee-6c54-4b01-90e6-d701748f0851" submitted for inference is DEGRADED';
  const res = checkFallbackError(400, body, 0, null, "nvidia");
  assert.equal(
    res.shouldFallback,
    true,
    `expected DEGRADED NIM function-state 400 to be classified as fallback-worthy, got shouldFallback=${res.shouldFallback} reason=${res.reason}`
  );
});

test("#8248: unrelated generic 400 body is still not fallback-worthy (no regression)", () => {
  const res = checkFallbackError(400, "some unrelated generic 400 body text", 0, null, "nvidia");
  assert.equal(res.shouldFallback, false);
});

test("#8248: existing malformed-request 400 branch still wins over the new DEGRADED pattern", () => {
  const res = checkFallbackError(
    400,
    "messages must alternate between user and assistant",
    0,
    null,
    "nvidia"
  );
  assert.equal(res.shouldFallback, true);
  assert.equal(res.reason, "model_capacity");
});
