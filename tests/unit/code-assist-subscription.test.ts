import test from "node:test";
import assert from "node:assert/strict";
import {
  extractCodeAssistOnboardTierId,
  extractCodeAssistSubscriptionTier,
} from "../../open-sse/services/codeAssistSubscription.ts";

test("extractCodeAssistSubscriptionTier prefers paidTier over currentTier", () => {
  assert.equal(
    extractCodeAssistSubscriptionTier({
      paidTier: { id: "tier_google_one_ai_pro", name: "Google One AI Premium" },
      currentTier: { id: "free-tier", name: "Free" },
    }),
    "Google One AI Premium"
  );
});

test("extractCodeAssistSubscriptionTier uses currentTier when not ineligible", () => {
  assert.equal(
    extractCodeAssistSubscriptionTier({
      currentTier: { id: "tier_pro", name: "Pro" },
      allowedTiers: [{ id: "free-tier", isDefault: true }],
    }),
    "Pro"
  );
});

test("extractCodeAssistSubscriptionTier uses restricted default when ineligible", () => {
  assert.equal(
    extractCodeAssistSubscriptionTier({
      ineligibleTiers: [{ reasonCode: "POLICY" }],
      currentTier: { id: "tier_ultra", name: "Ultra" },
      allowedTiers: [{ id: "tier_pro", name: "Pro", isDefault: true }],
    }),
    "Pro (Restricted)"
  );
});

test("extractCodeAssistOnboardTierId prefers paidTier id for onboarding", () => {
  assert.equal(
    extractCodeAssistOnboardTierId({
      paidTier: { id: "tier_google_one_ai_pro" },
      currentTier: { id: "free-tier" },
    }),
    "tier_google_one_ai_pro"
  );
});

test("extractCodeAssistOnboardTierId skips currentTier when ineligible", () => {
  assert.equal(
    extractCodeAssistOnboardTierId({
      ineligibleTiers: [{}],
      currentTier: { id: "tier_ultra" },
      allowedTiers: [{ id: "tier_pro", isDefault: true }],
    }),
    "tier_pro"
  );
});

test("extractCodeAssistOnboardTierId falls back to legacy-tier", () => {
  assert.equal(extractCodeAssistOnboardTierId({}), "legacy-tier");
});
