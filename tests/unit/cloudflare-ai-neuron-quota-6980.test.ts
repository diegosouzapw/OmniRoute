// Issue #6980 — Cloudflare Workers AI "daily free allocation" (neuron) 429 must be
// classified as quota_exhausted (account-wide, resets at UTC midnight), not a transient
// rate_limit. Covers both the providerErrorRules entry and the classify429 QUOTA_PATTERNS
// defense-in-depth path.
import test from "node:test";
import assert from "node:assert/strict";

import { getProviderErrorRuleMatch } from "../../open-sse/config/providerErrorRules.ts";
import { classify429 } from "../../src/shared/utils/classify429.ts";

const CLOUDFLARE_BODY = {
  errors: [
    {
      code: 4006,
      message:
        "you have used up your daily free allocation of 10,000 neurons, please upgrade to Cloudflare's Workers Paid plan",
    },
  ],
};

test("#6980 cloudflare-ai 429 with 'daily free allocation' is quota_exhausted (connection scope)", () => {
  const match = getProviderErrorRuleMatch("cloudflare-ai", 429, {}, CLOUDFLARE_BODY);
  assert.ok(match, "expected a provider rule match for cloudflare-ai neuron exhaustion");
  assert.equal(match!.reason, "quota_exhausted");
  assert.equal(match!.scope, "connection");
});

test("#6980 cloudflare-ai generic 429 (no allocation wording) does NOT match the quota rule", () => {
  const match = getProviderErrorRuleMatch("cloudflare-ai", 429, {}, { error: "rate limit exceeded" });
  assert.equal(match, null, "generic rate-limit 429 must not be classified as quota_exhausted");
});

test("#6980 classify429 QUOTA_PATTERNS catches cloudflare neuron wording (defense-in-depth)", () => {
  const kind = classify429({ status: 429, body: CLOUDFLARE_BODY });
  assert.equal(kind, "quota_exhausted");
});
