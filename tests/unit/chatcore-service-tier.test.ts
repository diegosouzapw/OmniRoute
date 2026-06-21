// tests/unit/chatcore-service-tier.test.ts
// Characterization of the Codex service-tier resolvers extracted from handleChatCore
// (chatCore god-file decomposition, #3501). Locks the provider!=="codex" short-circuit,
// the request-body service_tier normalization + defaults fallback, and the recursive
// descent through nested `response` payloads in resolveReportedServiceTier.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  resolveEffectiveServiceTier,
  resolveReportedServiceTier,
} from "../../open-sse/handlers/chatCore/serviceTier.ts";

test("resolveEffectiveServiceTier: non-codex provider is always standard", () => {
  assert.equal(resolveEffectiveServiceTier("openai", undefined, { service_tier: "flex" }), "standard");
  assert.equal(resolveEffectiveServiceTier(null, undefined, { service_tier: "priority" }), "standard");
});

test("resolveEffectiveServiceTier: codex reads a valid request service_tier", () => {
  assert.equal(resolveEffectiveServiceTier("codex", undefined, { service_tier: "priority" }), "priority");
  assert.equal(resolveEffectiveServiceTier("codex", undefined, { service_tier: "flex" }), "flex");
});

test("resolveEffectiveServiceTier: codex with blank/absent/non-string service_tier falls back to defaults", () => {
  // No providerSpecificData default → "standard"
  assert.equal(resolveEffectiveServiceTier("codex", undefined, {}), "standard");
  assert.equal(resolveEffectiveServiceTier("codex", undefined, { service_tier: "   " }), "standard");
  assert.equal(resolveEffectiveServiceTier("codex", undefined, { service_tier: 7 }), "standard");
  assert.equal(resolveEffectiveServiceTier("codex", undefined, undefined), "standard");
  // Non-object body is treated as empty record → defaults
  assert.equal(resolveEffectiveServiceTier("codex", undefined, "not-an-object"), "standard");
  assert.equal(resolveEffectiveServiceTier("codex", undefined, [1, 2]), "standard");
});

test("resolveEffectiveServiceTier: codex honors the providerSpecificData serviceTier default", () => {
  const psd = { requestDefaults: { serviceTier: "priority" } };
  assert.equal(resolveEffectiveServiceTier("codex", psd, {}), "priority");
  // An explicit, valid request tier still wins over the default
  assert.equal(resolveEffectiveServiceTier("codex", psd, { service_tier: "flex" }), "flex");
});

test("resolveReportedServiceTier: non-codex / missing payload → null", () => {
  assert.equal(resolveReportedServiceTier("openai", { service_tier: "flex" }), null);
  assert.equal(resolveReportedServiceTier("codex", null), null);
  assert.equal(resolveReportedServiceTier("codex", undefined), null);
  assert.equal(resolveReportedServiceTier("codex", []), null);
});

test("resolveReportedServiceTier: reads a top-level service_tier", () => {
  assert.equal(resolveReportedServiceTier("codex", { service_tier: "priority" }), "priority");
});

test("resolveReportedServiceTier: descends into nested response payloads", () => {
  assert.equal(
    resolveReportedServiceTier("codex", { response: { service_tier: "flex" } }),
    "flex"
  );
  assert.equal(
    resolveReportedServiceTier("codex", { response: { response: { service_tier: "priority" } } }),
    "priority"
  );
});

test("resolveReportedServiceTier: stops after maxDepth and returns null when nothing matches", () => {
  // 4 levels deep but default maxDepth=3 → never reaches the leaf tier
  const deep = { response: { response: { response: { service_tier: "priority" } } } };
  assert.equal(resolveReportedServiceTier("codex", deep), null);
  // No service_tier anywhere → null
  assert.equal(resolveReportedServiceTier("codex", { response: { foo: "bar" } }), null);
});
