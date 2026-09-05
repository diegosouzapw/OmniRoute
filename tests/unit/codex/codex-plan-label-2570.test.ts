// Port of upstream decolua/9router PR #2570 (feat(ui): show Codex plan labels
// in provider and quota views).
//
// Two independent gaps this closes:
//
// 1. providerPageHelpers.getCodexPlanLabel — the provider-detail ConnectionRow
//    never surfaced the Codex subscription plan (persisted at OAuth import
//    time in providerSpecificData.chatgptPlanType — see
//    src/lib/oauth/services/codexImport.ts) anywhere in the row UI.
//
// 2. ProviderLimits/utils.resolvePlanValue — the quota-view plan badge
//    machinery already existed (tierByConnection / QuotaCardHeader), but its
//    persisted-metadata fallback list did not include chatgptPlanType. When
//    the live Codex usage endpoint does not return a plan_type field (usage
//    service falls back to the literal string "unknown" — see
//    open-sse/services/usage/codex.ts), the badge fell through to "Unknown"
//    instead of the plan captured at login.
import { test } from "node:test";
import assert from "node:assert/strict";
import { getCodexPlanLabel } from "@/app/(dashboard)/dashboard/providers/[id]/codexPlanLabel";
import { resolvePlanValue } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils";

test("getCodexPlanLabel returns the trimmed chatgptPlanType for codex connections", () => {
  assert.equal(getCodexPlanLabel(true, { chatgptPlanType: "  Pro  " }), "Pro");
});

test("getCodexPlanLabel returns empty string when not a codex connection", () => {
  assert.equal(getCodexPlanLabel(false, { chatgptPlanType: "Pro" }), "");
});

test("getCodexPlanLabel returns empty string when chatgptPlanType is missing/blank", () => {
  assert.equal(getCodexPlanLabel(true, {}), "");
  assert.equal(getCodexPlanLabel(true, { chatgptPlanType: "   " }), "");
  assert.equal(getCodexPlanLabel(true, undefined), "");
});

test("resolvePlanValue falls back to the persisted Codex chatgptPlanType when the live plan is unknown", () => {
  // Reproduces the exact shape open-sse/services/usage/codex.ts returns when
  // the upstream Codex usage endpoint omits plan_type/planType.
  assert.equal(resolvePlanValue("unknown", { chatgptPlanType: "Pro" }), "Pro");
});

test("resolvePlanValue still prefers a real live plan over the persisted Codex fallback", () => {
  assert.equal(resolvePlanValue("Team", { chatgptPlanType: "Pro" }), "Team");
});

test("resolvePlanValue returns null when neither live nor persisted Codex plan is available", () => {
  assert.equal(resolvePlanValue("unknown", {}), null);
  assert.equal(resolvePlanValue(null, null), null);
});
