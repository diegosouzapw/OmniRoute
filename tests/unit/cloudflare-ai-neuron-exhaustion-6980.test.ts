/**
 * Issue #6980 — Cloudflare Workers AI daily neuron exhaustion 429 must be
 * classified as quota_exhausted (not transient rate_limit).
 *
 * Two layers of defense:
 *  1. Provider-specific rule in providerErrorRules.ts → getProviderErrorRuleMatch
 *  2. Global QUOTA_PATTERNS in classify429.ts → looksLikeQuotaExhausted
 *
 * Without these, the 429 body "you have used up your daily free allocation of
 * 10,000 neurons" matches no keyword, falls through to rate_limit (~60s cooldown),
 * and the combo router keeps cycling through every cloudflare model on retry
 * against a budget that only resets at UTC midnight.
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  getProviderErrorRuleMatch,
  providerRuleRegistry,
} from "../../open-sse/config/providerErrorRules.ts";
import { classify429, looksLikeQuotaExhausted } from "../../src/shared/utils/classify429.ts";

// ─── Fixtures ────────────────────────────────────────────────────────────────

const CF_NEURON_BODY =
  "you have used up your daily free allocation of 10,000 neurons, please upgrade to Cloudflare's Workers Paid plan";

const CF_NEURON_BODY_JSON = {
  errors: [
    {
      code: 4006,
      message:
        "you have used up your daily free allocation of 10,000 neurons, please upgrade to Cloudflare's Workers Paid plan",
    },
  ],
};

// ─── Tests: provider-specific rule (primary path) ───────────────────────────

describe("#6980 provider rule: cloudflare-ai neuron exhaustion", () => {
  test("cloudflare-ai is registered in providerRuleRegistry", () => {
    assert.ok(providerRuleRegistry.has("cloudflare-ai"));
  });

  test("429 with plain-string neuron body → quota_exhausted, scope connection", () => {
    const result = getProviderErrorRuleMatch("cloudflare-ai", 429, {}, CF_NEURON_BODY);
    assert.ok(result, "expected a match");
    assert.equal(result!.reason, "quota_exhausted");
    assert.equal(result!.scope, "connection");
    // No explicit cooldownMs — recordModelLockoutFailure resolves to next UTC midnight.
    assert.equal(result!.cooldownMs, undefined);
  });

  test("429 with JSON-structured neuron body → quota_exhausted", () => {
    const result = getProviderErrorRuleMatch("cloudflare-ai", 429, {}, CF_NEURON_BODY_JSON);
    assert.ok(result);
    assert.equal(result!.reason, "quota_exhausted");
    assert.equal(result!.scope, "connection");
  });

  test("non-429 status does not match even with neuron body", () => {
    const result = getProviderErrorRuleMatch("cloudflare-ai", 500, {}, CF_NEURON_BODY);
    assert.equal(result, null);
  });

  test("429 with unrelated body does not match", () => {
    const result = getProviderErrorRuleMatch(
      "cloudflare-ai",
      429,
      {},
      {
        error: "rate limited, try again later",
      }
    );
    assert.equal(result, null);
  });

  test("provider name matching is case-insensitive", () => {
    const result = getProviderErrorRuleMatch("Cloudflare-AI", 429, {}, CF_NEURON_BODY);
    assert.ok(result);
    assert.equal(result!.reason, "quota_exhausted");
  });
});

// ─── Tests: classify429 defense-in-depth (fallback path) ────────────────────

describe("#6980 classify429: daily free allocation pattern", () => {
  test("looksLikeQuotaExhausted matches neuron body string", () => {
    assert.ok(looksLikeQuotaExhausted(CF_NEURON_BODY));
  });

  test("looksLikeQuotaExhausted matches neuron body JSON-stringified", () => {
    assert.ok(looksLikeQuotaExhausted(CF_NEURON_BODY_JSON));
  });

  test("classify429 returns quota_exhausted for neuron body", () => {
    assert.equal(classify429({ status: 429, body: CF_NEURON_BODY }), "quota_exhausted");
  });

  test("classify429 returns quota_exhausted for neuron JSON body", () => {
    assert.equal(classify429({ status: 429, body: CF_NEURON_BODY_JSON }), "quota_exhausted");
  });

  test("classify429 returns rate_limit for generic 429 without quota keywords", () => {
    assert.equal(classify429({ status: 429, body: "Too many requests" }), "rate_limit");
  });
});
