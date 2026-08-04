// Regression guard for #8247: checkFallbackError() must not classify a 403
// insufficient_quota body as connection-wide creditsExhausted when the
// provider is a per-model-quota provider (e.g. openai-compatible-*). The
// whole point of hasPerModelQuota() is to keep such failures model-scoped
// instead of terminalling the entire connection.
import test from "node:test";
import assert from "node:assert/strict";
import { checkFallbackError, hasPerModelQuota } from "../../open-sse/services/accountFallback.ts";

const PROVIDER = "openai-compatible-cegp";
const MODEL = "gpt-5.6-luna";
const UPSTREAM_BODY = JSON.stringify({
  error: {
    code: "insufficient_quota",
    type: "insufficient_quota",
    message: "You have exceeded your quota, reset after 24s",
  },
});

test("#8247: per-model-quota provider 403 insufficient_quota is NOT connection-wide creditsExhausted", () => {
  assert.equal(hasPerModelQuota(PROVIDER, MODEL), true);
  const result = checkFallbackError(403, UPSTREAM_BODY, 0, MODEL, PROVIDER);
  assert.ok(
    !result.creditsExhausted,
    "per-model-quota providers must not terminal the whole connection on a per-model 403 " +
      `(got creditsExhausted=${result.creditsExhausted})`
  );
  assert.equal(result.shouldFallback, true, "the failure must still be fallback-worthy");
  assert.equal(
    result.reason,
    "quota_exhausted",
    "should still be classified as quota-exhausted, just model-scoped instead of connection-wide"
  );
});

test("#8247: non-per-model-quota provider (plain openai apikey) still terminals on 403 insufficient_quota", () => {
  assert.equal(hasPerModelQuota("openai", MODEL), false);
  const result = checkFallbackError(403, UPSTREAM_BODY, 0, MODEL, "openai");
  assert.equal(
    result.creditsExhausted,
    true,
    "original sub2api-ported behavior for single-model-per-connection providers must not regress"
  );
});
