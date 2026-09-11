import test from "node:test";
import assert from "node:assert/strict";
import {
  checkFallbackError,
  recordModelLockoutFailure,
  isModelLocked,
  clearAllModelLockouts,
} from "../../open-sse/services/accountFallback.ts";
import { isModelScoped400 } from "../../open-sse/services/combo/comboPredicates.ts";
import { providerRuleRegistry } from "../../open-sse/config/providerErrorRules.ts";

// checkFallbackError is positional: (status, errorText, backoffLevel = 0,
// _model = null, provider = null, headers = null, profileOverride = null,
// structuredError?, …). ruleScope IS on the return type (accountFallback.ts:1686,
// #10334) but always undefined for non-allowlisted providers until the fenced
// pre-check + HONORS widening land — RED fails on values alone; the cast is
// convenience, not necessity.
const VERBATIM_BODY = `{"type":"server_error","message":"Error from provider (Console): Upstream request failed: Model is unavailable."}`;

test("opencode 400 model-unavailable", async (t) => {
  await t.test("locks the model on the pinned verbatim (opencode)", () => {
    const r = checkFallbackError(400, VERBATIM_BODY, 0, null, "opencode");
    assert.equal(r.shouldFallback, true);
    assert.equal((r as { ruleScope?: string }).ruleScope, "model");
    assert.equal(r.reason, "model_capacity");
  });

  await t.test(
    "locks the model on the pinned verbatim (opencode-zen, distinctly registered)",
    () => {
      assert.ok(providerRuleRegistry.get("opencode-zen"), "zen key registered");
      const r = checkFallbackError(400, VERBATIM_BODY, 0, null, "opencode-zen");
      assert.equal(r.shouldFallback, true);
      assert.equal((r as { ruleScope?: string }).ruleScope, "model");
    }
  );

  await t.test("malformed 400 does NOT take the model lock (zero-cooldown guard preserved)", () => {
    // #2101 infinite-loop guard (accountFallback.ts:2231-2237, re-pinned by
    // accountfallback-ratelimit-400-4976.test.ts:38-44): a malformed 400 stays
    // {shouldFallback:true, cooldownMs:0, reason:model_capacity} — "terminal"
    // MEANS zero-cooldown, not shouldFallback:false. The new model-lock branch
    // must not fire here: no ruleScope, no persisted lock.
    const r = checkFallbackError(
      400,
      `{"type":"invalid_request","message":"improperly formed request: invalid message format"}`,
      0,
      null,
      "opencode"
    );
    assert.equal(r.shouldFallback, true);
    assert.equal(r.cooldownMs, 0);
    assert.equal(r.reason, "model_capacity");
    assert.equal((r as { ruleScope?: string }).ruleScope, undefined);
  });

  await t.test("model-unavailable write persists a readable model lock", () => {
    // Direct round-trip on the same getModelLockKey tuple both paths share
    // (exact-model key for these inputs): the auth.ts model branch calls
    // recordModelLockoutFailure with the same (provider, connectionId, model,
    // "model_capacity", 400) tuple, and combo routing reads it via isModelLocked.
    clearAllModelLockouts();
    recordModelLockoutFailure(
      "opencode",
      "conn-test-400",
      "deepseek-v4-flash-free",
      "model_capacity",
      400,
      0,
      null,
      { exactCooldownMs: 3_600_000, maxCooldownMs: 1_800_000 }
    );
    assert.equal(isModelLocked("opencode", "conn-test-400", "deepseek-v4-flash-free"), true);
    clearAllModelLockouts();
  });

  await t.test(
    "headers-only quota rule still surfaces connection scope (pre-existing, HONORS now honors it)",
    () => {
      // The quota-exhausted-headers rule keys on headers alone, so it matched
      // before this PR too — but ruleScope stayed undefined (opencode not in
      // HONORS). Widening HONORS surfaces the rule's declared connection scope
      // on header-passing paths (accountFallback 429 branch, combo executors).
      // Body markers stay inert without FULL_TEXT (separate assert below).
      // HONORS side effect (documented in the PR body): the pre-existing 429
      // headers rule now yields scope=connection for the whole opencode family,
      // where the persistence layer previously re-derived scope via
      // hasPerModelQuota(). opencode is not per-model-quota (no passthrough in
      // either registry), so both derivations agree on connection — pinned here
      // for all four family members plus the monthly-quota body rule, which
      // keeps its exact verbatim cooldown (13 days, not the scaled default).
      for (const provider of ["opencode", "opencode-zen", "opencode-go", "opencode-cli"]) {
        const r = checkFallbackError(429, "rate limit reached, slow down", 0, null, provider, {
          "x-ratelimit-remaining-requests": "0",
        });
        assert.equal(r.reason, "quota_exhausted", provider);
        assert.equal((r as { ruleScope?: string }).ruleScope, "connection", provider);
        // Same body without headers: no rule fires, scope stays undefined.
        const r2 = checkFallbackError(
          429,
          "rate limit reached, slow down",
          0,
          null,
          provider,
          null
        );
        assert.equal((r2 as { ruleScope?: string }).ruleScope, undefined, provider);
      }
      // Pins parser day-granularity (parseResetCountdownMs), not this PR's code:
      // relax to a range if the parser ever learns hour/minute residuals.
      const monthly = checkFallbackError(
        429,
        "[429] Monthly usage limit reached. Resets in 13 days.",
        0,
        null,
        "opencode",
        null
      );
      assert.equal(monthly.reason, "quota_exhausted");
      assert.ok(
        monthly.cooldownMs >= 13 * 24 * 60 * 60 * 1000 &&
          monthly.cooldownMs < 14 * 24 * 60 * 60 * 1000
      );
      assert.equal((monthly as { ruleScope?: string }).ruleScope, undefined);
    }
  );

  await t.test("quota-body markers stay inert without FULL_TEXT", () => {
    // FULL_TEXT_RULE_PROVIDERS is still agentrouter-only: quota-body markers
    // (organization_quota_exceeded, plan_limit_reached, account_quota_exceeded)
    // must NOT surface a rule scope — the #10880 egress block stays reachable.
    for (const marker of [
      "organization_quota_exceeded",
      "plan_limit_reached",
      "account_quota_exceeded",
    ]) {
      const r = checkFallbackError(
        429,
        `{"error":{"message":"${marker}"}}`,
        0,
        null,
        "opencode",
        null
      );
      assert.equal(r.reason, "rate_limit_exceeded", marker);
      assert.equal((r as { ruleScope?: string }).ruleScope, undefined, marker);
    }
  });

  await t.test("verbatim stays terminal on non-family providers", () => {
    // The new model-lock branch is fenced on OPENCODE_FAMILY: the verbatim
    // under any other provider must stay shouldFallback:false (generic 400).
    for (const provider of ["agentrouter", "openrouter", "minimax", "mimocode", "unknown-vendor"]) {
      const r = checkFallbackError(400, VERBATIM_BODY, 0, null, provider);
      assert.equal(r.shouldFallback, false, provider);
    }
  });

  await t.test("combo model-scope classifier still matches (regression)", () => {
    assert.equal(isModelScoped400(VERBATIM_BODY), true);
  });
});
