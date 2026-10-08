import test from "node:test";
import assert from "node:assert/strict";

import {
  isUsageQuotaKeyAllowed,
  normalizeUsageQuotasForProvider,
  sanitizeUsageQuotasForProvider,
} from "../../src/lib/usage/providerLimits/quotaNormalize.ts";

test("quota key allowed: static model IDs are always allowed", () => {
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "claude-sonnet-4-6"), true);
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "gemini-3.7-flash-high"), true);
  assert.equal(isUsageQuotaKeyAllowed("agy", "claude-sonnet-4-6"), true);
  assert.equal(isUsageQuotaKeyAllowed("agy", "gemini-3.7-flash-medium"), true);
});

test("quota key allowed: future dynamic live catalog model IDs are allowed when in liveModelIds set", () => {
  const liveSet = new Set(["gemini-3.9-flash-high", "gemini-4.0-pro"]);

  // Without live set, unknown model is rejected by the static antigravity allowlist.
  // (agy quota keys use the discoverable denylist since #12866 — covered by
  // agy-provider.test.ts "test 9" — so an unknown chat id is already allowed there.)
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "gemini-3.9-flash-high"), false);

  // With live set, unknown model is allowed
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "gemini-3.9-flash-high", liveSet), true);
  assert.equal(isUsageQuotaKeyAllowed("agy", "gemini-3.9-flash-high", liveSet), true);
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "gemini-4.0-pro", liveSet), true);

  // Model not in static and not in live set is still rejected
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "unrecognized-future-model", liveSet), false);
});

test("normalizeUsageQuotasForProvider preserves future models from live discovery", () => {
  const liveSet = new Set(["gemini-3.9-flash-high"]);
  const rawQuotas = {
    "gemini-3.7-flash-high": { remainingFraction: 0.8 },
    "gemini-3.9-flash-high": { remainingFraction: 1.0 },
    "non-existent-retired-model": { remainingFraction: 0.0 },
  };

  const normalized = normalizeUsageQuotasForProvider("antigravity", rawQuotas, liveSet);
  assert.ok(normalized);
  assert.ok(normalized["gemini-3.7-flash-high"], "static model preserved");
  assert.ok(normalized["gemini-3.9-flash-high"], "future live model preserved");
  assert.equal(normalized["non-existent-retired-model"], undefined, "unsupported model stripped");
});

test("sanitizeUsageQuotasForProvider handles full usage object with live model ids", () => {
  const liveSet = new Set(["gemini-3.9-flash-medium"]);
  const usage = {
    provider: "agy",
    quotas: {
      "gemini-3.8-flash-medium": { remainingFraction: 0.9 },
      "gemini-3.9-flash-medium": { remainingFraction: 1.0 },
      // agy strips non-chat ids via the discoverable denylist (#12866), not unknown ids.
      tab_flash_lite_preview: { remainingFraction: 0.0 },
    },
  };

  const sanitized = sanitizeUsageQuotasForProvider("agy", usage, liveSet);
  assert.ok(sanitized.quotas);
  const quotas = sanitized.quotas as Record<string, unknown>;
  assert.ok(quotas["gemini-3.8-flash-medium"]);
  assert.ok(quotas["gemini-3.9-flash-medium"]);
  assert.equal(quotas["tab_flash_lite_preview"], undefined);
});
