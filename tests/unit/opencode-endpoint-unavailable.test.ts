import test from "node:test";
import assert from "node:assert/strict";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";
import { providerRuleRegistry } from "../../open-sse/config/providerErrorRules.ts";

// checkFallbackError is positional: (status, errorText, backoffLevel = 0,
// _model = null, provider = null, headers = null, profileOverride = null,
// structuredError?, …). ruleScope IS on the return type (#10334) but only for
// allowlisted providers — the cast is convenience, not necessity.
const VERBATIM_BODY = `{"type":"server_error","message":"Error from provider (Console): Upstream request failed: Endpoint is unavailable."}`;

test("opencode 400/429 endpoint-unavailable", async (t) => {
  await t.test("locks the model on the pinned verbatim (opencode, 400)", () => {
    const r = checkFallbackError(400, VERBATIM_BODY, 0, null, "opencode");
    assert.equal(r.shouldFallback, true);
    assert.equal((r as { ruleScope?: string }).ruleScope, "model");
    assert.equal(r.reason, "model_capacity");
  });

  await t.test(
    "locks the model on the pinned verbatim (opencode-zen, distinctly registered)",
    () => {
      assert.ok(providerRuleRegistry.get("opencode-zen"), "zen key registered");
      const r = checkFallbackError(429, VERBATIM_BODY, 0, null, "opencode-zen");
      assert.equal(r.shouldFallback, true);
      assert.equal((r as { ruleScope?: string }).ruleScope, "model");
      assert.equal(r.reason, "model_capacity");
    }
  );

  await t.test("locks the model on the measured 429 (opencode)", () => {
    const r = checkFallbackError(429, VERBATIM_BODY, 0, null, "opencode");
    assert.equal(r.shouldFallback, true);
    assert.equal((r as { ruleScope?: string }).ruleScope, "model");
    assert.equal(r.reason, "model_capacity");
  });

  await t.test("body marker wins over the exhausted-account header", () => {
    const r = checkFallbackError(429, VERBATIM_BODY, 0, null, "opencode", {
      "x-ratelimit-remaining-requests": "0",
    });
    assert.equal(r.shouldFallback, true);
    assert.equal((r as { ruleScope?: string }).ruleScope, "model");
    assert.equal(r.reason, "model_capacity");
  });

  await t.test("same header without the marker keeps the connection scope", () => {
    const r = checkFallbackError(429, "rate limit reached, slow down", 0, null, "opencode", {
      "x-ratelimit-remaining-requests": "0",
    });
    assert.equal(r.reason, "quota_exhausted");
    assert.equal((r as { ruleScope?: string }).ruleScope, "connection");
  });

  await t.test("generic 429 without headers keeps rotating accounts", () => {
    const r = checkFallbackError(429, "Rate limit exceeded", 0, null, "opencode");
    assert.equal(r.shouldFallback, true);
    assert.equal(r.reason, "rate_limit_exceeded");
    assert.equal((r as { ruleScope?: string }).ruleScope ?? null, null);
  });
});
