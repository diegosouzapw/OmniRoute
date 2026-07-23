/**
 * Regression test for #7818 — TierCoverageWidget must honor the same
 * provider-tier override the router uses, so a tiered custom provider shows
 * up in the correct bucket instead of always landing in tier2 ("Cheap").
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyConnection } = await import(
  "../../src/app/(dashboard)/dashboard/TierCoverageWidget.tsx"
);

test("classifyConnection uses the override before falling back to registry membership", () => {
  // A custom provider id has no NOAUTH/OAUTH registry entry, so without an
  // override it always falls to tier2 ("Cheap") — the exact gap #7818 reports.
  assert.equal(classifyConnection("my-custom-endpoint-123", {}), "tier2");

  // With an explicit override, each ProviderTier maps to its widget bucket.
  assert.equal(
    classifyConnection("my-custom-endpoint-123", { "my-custom-endpoint-123": "premium" }),
    "tier1"
  );
  assert.equal(
    classifyConnection("my-custom-endpoint-123", { "my-custom-endpoint-123": "cheap" }),
    "tier2"
  );
  assert.equal(
    classifyConnection("my-custom-endpoint-123", { "my-custom-endpoint-123": "free" }),
    "tier3"
  );
});

test("classifyConnection override lookup is case-insensitive on the provider id", () => {
  assert.equal(
    classifyConnection("My-Custom-Endpoint", { "my-custom-endpoint": "free" }),
    "tier3"
  );
});

test("classifyConnection falls back to registry membership when no override matches", () => {
  // openai is a well-known OAuth-registry-less API-key provider -> tier2 by default.
  assert.equal(classifyConnection("openai", {}), "tier2");
});
