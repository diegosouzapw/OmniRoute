import test from "node:test";
import assert from "node:assert/strict";

/**
 * agentrouter.org quota model, as declared by the `providerErrorRules.ts`
 * classification layer:
 *  - "额度不足" (quota insufficient) is ACCOUNT-wide and temporary → the rule
 *    declares scope "connection".
 *  - "无权访问模型" (no access to this model) is permanent PER MODEL → the rule
 *    declares scope "model".
 * Status matching accepts both the raw upstream 403 AND the restated 429
 * (upstreamStatusRestatement.ts rewrites 403→429 before classification).
 *
 * #10334 — `ProviderErrorRuleMatch.scope` is now CONSUMED for agentrouter:
 * `checkFallbackError` surfaces it as `ruleScope` on its return value (see
 * A11/A12 below), and a raw 403 is no longer an early-return dead end for
 * this provider — `honorsRuleLockScope("agentrouter")` gates a dedicated
 * pre-check that consults the provider rules BEFORE the generic apikey
 * FORBIDDEN branch (see A7/A12). This is an EXCLUSIVE allowlist
 * (`honorsRuleLockScope`, A14): every other provider's `scope` stays
 * declared-but-unconsumed exactly as before (A13). See
 * `docs/architecture/RESILIENCE_GUIDE.md` §7 for the full writeup — Tasks 2/3
 * of #10334 wire the surfaced `ruleScope` into the persistence layer
 * (markAccountUnavailable / combo target exhaustion).
 */

const { providerRuleRegistry, getProviderErrorRuleMatch } = await import(
  "../../../open-sse/config/providerErrorRules.ts"
);
const { classifyError, checkFallbackError } = await import(
  "../../../open-sse/services/accountFallback.ts"
);
const { RateLimitReason } = await import("../../../open-sse/config/constants.ts");

test("A1: agentrouter is registered in providerRuleRegistry", () => {
  const rules = providerRuleRegistry.get("agentrouter");
  assert.ok(rules && rules.length > 0);
});

test("A2: quota body → quota_exhausted scope connection (restated 429)", () => {
  const match = getProviderErrorRuleMatch("agentrouter", 429, {}, {
    error: { message: "用户额度不足，请充值" },
  });
  assert.ok(match, "quota body must match");
  assert.equal(match.reason, "quota_exhausted");
  assert.equal(match.scope, "connection");
});

test("A3: quota body also matches the raw (pre-restatement) 403", () => {
  const match = getProviderErrorRuleMatch("agentrouter", 403, {}, "用户额度不足");
  assert.ok(match);
  assert.equal(match.reason, "quota_exhausted");
});

test("A4: 无权访问模型 → auth_error scope model, at the RULE layer (getProviderErrorRuleMatch directly) — since #10334 this rule DOES receive production traffic for agentrouter via the honorsRuleLockScope pre-check in checkFallbackError (see A12)", () => {
  const match = getProviderErrorRuleMatch("agentrouter", 403, {}, {
    error: { message: "无权访问模型 claude-sonnet-4" },
  });
  assert.ok(match);
  assert.equal(match.reason, "auth_error");
  assert.equal(match.scope, "model");
});

test("A5: classifyError layer guard — quota text wins over the 403→AUTH_ERROR status fallback (classifyError itself has no production caller today; the production guard is A6/checkFallbackError)", () => {
  const reason = classifyError(403, "用户额度不足", {
    provider: "agentrouter",
    headers: {},
    body: { error: { message: "用户额度不足" } },
  });
  assert.equal(reason, RateLimitReason.QUOTA_EXHAUSTED);
});

test("A6: guard — restated quota error is retryable, never terminal, and now actually classified as quota_exhausted", () => {
  // Status 429 (post-restatement) reaches checkFallbackError's provider-rule
  // lookup. resolveRuleMatchBody() hands agentrouter the full error text
  // (instead of just the stripped {code, type} structuredError every other
  // provider gets), so the "额度不足" rule actually fires here — this is the
  // production path the restatement hook (Task 2) feeds into.
  const result = checkFallbackError(429, "用户额度不足", 0, null, "agentrouter", null);
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "quota_exhausted");
  assert.ok(!result.permanent, "quota misstatus must never be permanent");
  assert.ok(!result.creditsExhausted, "must not trip CREDITS_EXHAUSTED_SIGNALS");
  assert.ok(result.cooldownMs > 0, "must carry a real cooldown");
});

test("A7: guard — raw 403 quota (hook bypassed) is still not account-deactivation", () => {
  // Since #10334, a raw (pre-restatement) 403 for agentrouter DOES reach the
  // provider rules: checkFallbackError's honorsRuleLockScope pre-check runs
  // BEFORE the generic apikey-category FORBIDDEN branch and matches the
  // "额度不足" rule here (reason quota_exhausted, scope connection — see A11).
  // In the real pipeline, chatCore's upstreamStatusRestatement hook (Task 2)
  // still converts 403→429 before checkFallbackError sees it, so this raw-403
  // path is what a hook-bypassed request hits — and it must still not be
  // misclassified as permanent account deactivation, regardless of which
  // branch (pre-check or the old apikey-FORBIDDEN fallback) ultimately fires.
  const result = checkFallbackError(403, "用户额度不足", 0, null, "agentrouter", null);
  assert.equal(result.shouldFallback, true);
  assert.ok(!result.permanent);
});

test("A8: plain agentrouter 403 (no quota text) keeps the default apikey auth path", () => {
  const match = getProviderErrorRuleMatch("agentrouter", 403, {}, "Invalid API key");
  assert.equal(match, null);
});

test("A9: resolveRuleMatchBody hands full text ONLY to allowlisted providers", async () => {
  const { resolveRuleMatchBody } = await import(
    "../../../open-sse/config/providerErrorRules.ts"
  );
  const structured = { code: "rate_limited", type: "requests" };
  assert.equal(resolveRuleMatchBody("agentrouter", structured, "用户额度不足"), "用户额度不足");
  assert.equal(resolveRuleMatchBody("opencode", structured, "monthly usage limit reached"), structured);
  assert.equal(resolveRuleMatchBody("openrouter", null, "some error text"), null);
  assert.equal(resolveRuleMatchBody("agentrouter", structured, ""), structured);
});

test("A10: other providers' checkFallbackError behavior is unchanged (exclusivity)", () => {
  // opencode's body-text rule ("organization_quota_exceeded") must still NOT
  // fire through checkFallbackError — the allowlist is agentrouter-only, so
  // opencode keeps getting only the stripped structuredError as the match
  // body (null here, since no structuredError arg is passed), same as before
  // this fix. Baseline captured on the pre-fix code with this exact input:
  //   { shouldFallback: true, cooldownMs: 3000, baseCooldownMs: 3000,
  //     newBackoffLevel: 1, usedUpstreamRetryHint: false,
  //     reason: "rate_limit_exceeded" }
  // i.e. it falls through to the generic 429 configured rule, NOT the
  // opencode-quota-exhausted-body provider rule — asserting `reason` here is
  // exactly what proves the allowlist didn't leak to opencode.
  const result = checkFallbackError(
    429,
    '{"error":{"message":"organization_quota_exceeded"}}',
    0,
    null,
    "opencode",
    null
  );
  assert.ok(result.shouldFallback);
  assert.equal(result.reason, "rate_limit_exceeded");
  assert.equal(result.cooldownMs, 3000);
});

test("A11: checkFallbackError surfaces ruleScope=connection for agentrouter quota", () => {
  const result = checkFallbackError(429, "用户额度不足", 0, null, "agentrouter", null);
  assert.equal(result.ruleScope, "connection");
  assert.equal(result.reason, "quota_exhausted");
  assert.ok(!result.permanent);
});

test("A12: checkFallbackError 403 无权访问模型 carries the rule's scope + cooldown", () => {
  const result = checkFallbackError(403, "无权访问模型 claude-opus-5", 0, null, "agentrouter", null);
  assert.equal(result.ruleScope, "model");
  assert.equal(result.reason, "auth_error");
  assert.equal(result.baseCooldownMs, 6 * 60 * 60 * 1000);
});

test("A13: exclusivity — ruleScope stays undefined for other providers", () => {
  const opencode = checkFallbackError(
    429,
    '{"error":{"message":"organization_quota_exceeded"}}',
    0,
    null,
    "opencode",
    null
  );
  assert.equal(opencode.ruleScope, undefined);
  const openrouter = checkFallbackError(402, "credits exhausted", 0, null, "openrouter", null);
  assert.equal(openrouter.ruleScope, undefined);
});

test("A14: honorsRuleLockScope allowlist is agentrouter-only", async () => {
  const { honorsRuleLockScope } = await import("../../../open-sse/config/providerErrorRules.ts");
  assert.equal(honorsRuleLockScope("agentrouter"), true);
  assert.equal(honorsRuleLockScope("AgentRouter"), true);
  assert.equal(honorsRuleLockScope("opencode"), false);
  assert.equal(honorsRuleLockScope(null), false);
});
