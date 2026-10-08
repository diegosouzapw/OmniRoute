import test from "node:test";
import assert from "node:assert/strict";
import {
  defersQuotaCutoff,
  hasCodexCreditOptIn,
} from "../../src/lib/providers/quotaCutoffOptIns.ts";
import { isCodexPaidCreditsEnabled } from "../../src/lib/providers/codexPaidCredits.ts";
import { evaluateQuotaCutoff } from "../../open-sse/services/quotaPreflight.ts";

test("Claude extra usage defers the subscription cutoff only when explicitly allowed", () => {
  assert.equal(defersQuotaCutoff("claude", { blockExtraUsage: false }), true);
  assert.equal(defersQuotaCutoff("claude", { blockExtraUsage: true }), false);
  assert.equal(defersQuotaCutoff("claude", {}), false);
});

test("Codex paid credits defer the subscription cutoff except for Spark", () => {
  const optedIn = { allowPaidCredits: true };
  assert.equal(defersQuotaCutoff("codex", optedIn, "codex/gpt-5.5"), true);
  assert.equal(defersQuotaCutoff("codex", optedIn, "codex/gpt-5.3-codex-spark"), false);
  assert.equal(defersQuotaCutoff("codex", { allowPaidCredits: false }, "codex/gpt-5.5"), false);
  assert.equal(defersQuotaCutoff("openai", optedIn, "gpt-5.5"), false);
});

test("the Codex credit opt-in is read from runtime credentials without trusting their shape", () => {
  const credentials = { providerSpecificData: { allowPaidCredits: true } };
  assert.equal(hasCodexCreditOptIn("codex", credentials, "codex/gpt-5.5"), true);
  assert.equal(hasCodexCreditOptIn("claude", credentials, "claude-opus-5"), false);
  assert.equal(hasCodexCreditOptIn("codex", null, "codex/gpt-5.5"), false);
  assert.equal(hasCodexCreditOptIn("codex", "not-an-object", "codex/gpt-5.5"), false);
  assert.equal(hasCodexCreditOptIn("codex", {}, "codex/gpt-5.5"), false);
});

// #13337 — paid Codex credits can incur charges, so the behavior is default-OFF: only an explicit
// per-connection `allowPaidCredits: true` turns it on.
test("Codex paid credits are disabled by default and only an explicit boolean true enables them", () => {
  assert.equal(isCodexPaidCreditsEnabled("codex", undefined, "codex/gpt-5.5"), false);
  assert.equal(isCodexPaidCreditsEnabled("codex", null, "codex/gpt-5.5"), false);
  assert.equal(isCodexPaidCreditsEnabled("codex", {}, "codex/gpt-5.5"), false);
  assert.equal(
    isCodexPaidCreditsEnabled("codex", { allowPaidCredits: "true" }, "codex/gpt-5.5"),
    false
  );
  assert.equal(isCodexPaidCreditsEnabled("codex", { allowPaidCredits: 1 }, "codex/gpt-5.5"), false);
  assert.equal(
    isCodexPaidCreditsEnabled("codex", { allowPaidCredits: true }, "codex/gpt-5.5"),
    true
  );
  // Without the opt-in, an unknown-usage Codex account is not blocked by the paid-credit gate.
  assert.deepEqual(
    evaluateQuotaCutoff(null, undefined, {
      provider: "codex",
      requestedModel: "codex/gpt-5.5",
      providerSpecificData: {},
    }),
    { proceed: true }
  );
});

// #13337 × #15574 — the full local quota-filtering opt-out (quotaPreflightEnabled=false AND
// limitPolicy.enabled=false) wins over allowPaidCredits: the account is served unfiltered and
// the upstream decides, instead of being force-preflighted and blocked as quota_unavailable.
test("the full Codex quota-filtering opt-out takes precedence over the paid-credit gate", () => {
  const fullOptOut = {
    allowPaidCredits: true,
    quotaPreflightEnabled: false,
    limitPolicy: { enabled: false },
  };
  const scope = {
    provider: "codex",
    requestedModel: "codex/gpt-5.5",
    providerSpecificData: fullOptOut,
  };
  assert.equal(isCodexPaidCreditsEnabled("codex", fullOptOut, "codex/gpt-5.5"), false);
  assert.equal(
    hasCodexCreditOptIn("codex", { providerSpecificData: fullOptOut }, "codex/gpt-5.5"),
    false
  );
  assert.equal(evaluateQuotaCutoff(null, undefined, scope).proceed, true);
  assert.equal(
    evaluateQuotaCutoff(
      { used: 100, total: 100, percentUsed: 1, limitReached: true },
      undefined,
      scope
    ).proceed,
    true
  );

  // Disabling only the preflight keeps the mandatory credit check (documented toggle behavior).
  const preflightOnlyOff = { allowPaidCredits: true, quotaPreflightEnabled: false };
  assert.equal(
    hasCodexCreditOptIn("codex", { providerSpecificData: preflightOnlyOff }, "codex/gpt-5.5"),
    true
  );
  assert.deepEqual(
    evaluateQuotaCutoff(null, undefined, { ...scope, providerSpecificData: preflightOnlyOff }),
    { proceed: false, reason: "quota_unavailable" }
  );
});
