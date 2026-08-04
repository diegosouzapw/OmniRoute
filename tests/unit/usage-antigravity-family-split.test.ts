// Characterization of the services/usage.ts Antigravity-family split (god-file decomposition): the
// full Antigravity (Gemini Code Assist) usage family — code-assist tier/plan mapping, credit probing,
// the user-quota/available-models fetchers + their module-level caches, and getAntigravityUsage —
// moved into services/usage/antigravity.ts. The 4 data caches + their proactive TTL-purge setInterval
// moved as a unit (the previously-shared purge timer was split so each module owns its own cleanup).
// Behavior-preserving move; the fetcher + quota math stay covered by usage-utils / usage-service-
// hardening / code-assist-subscription (which exercise them via usage.ts __testing).
import { test } from "node:test";
import assert from "node:assert/strict";

const A = await import("../../open-sse/services/usage/antigravity.ts");
const HOST = await import("../../open-sse/services/usage.ts");

test("leaf exports the host-facing Antigravity helpers", () => {
  for (const name of [
    "getAntigravityUsage",
    "getAntigravityPlanLabel",
    "mapCodeAssistSubscriptionToPlanLabel",
    "mapCodeAssistTierIdToLabel",
    "mapSubscriptionTierStringToPlanLabel",
  ]) {
    assert.equal(typeof (A as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("host __testing re-exports the same Antigravity function identities", () => {
  const t = (HOST as Record<string, Record<string, unknown>>).__testing;
  assert.equal(t.getAntigravityPlanLabel, A.getAntigravityPlanLabel);
  assert.equal(t.mapCodeAssistSubscriptionToPlanLabel, A.mapCodeAssistSubscriptionToPlanLabel);
  assert.equal(t.mapCodeAssistTierIdToLabel, A.mapCodeAssistTierIdToLabel);
  assert.equal(t.mapSubscriptionTierStringToPlanLabel, A.mapSubscriptionTierStringToPlanLabel);
});

test("mapCodeAssistTierIdToLabel maps known tier ids, null otherwise", () => {
  // unknown tier id → null (the label mapping only knows specific ids)
  assert.equal(A.mapCodeAssistTierIdToLabel("totally-unknown-tier"), null);
  // shape: always string|null
  const out = A.mapCodeAssistTierIdToLabel("free-tier");
  assert.ok(out === null || typeof out === "string");
});

test("getAntigravityPlanLabel returns a string for arbitrary input (never throws)", () => {
  assert.equal(typeof A.getAntigravityPlanLabel(null), "string");
  assert.equal(typeof A.getAntigravityPlanLabel({ tier: "x" }, { other: 1 }), "string");
});
