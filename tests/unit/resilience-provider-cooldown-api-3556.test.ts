/**
 * Regression test for #3556 / fix: providerCooldown missing from GET+PATCH /api/resilience
 *
 * The ResilienceTab component fetches GET /api/resilience and expects a `providerCooldown`
 * field; likewise PATCH must accept and persist it. Without both, the Settings → Resilience
 * page crashes on load and cannot save the provider-cooldown configuration.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

// Validate the schema accepts providerCooldown
import { updateResilienceSchema } from "../../src/shared/validation/schemas.js";
// Validate settings roundtrip
import {
  resolveResilienceSettings,
  mergeResilienceSettings,
} from "../../src/lib/resilience/settings.js";

describe("providerCooldown in updateResilienceSchema", () => {
  it("accepts a valid providerCooldown patch", () => {
    const result = updateResilienceSchema.safeParse({
      providerCooldown: {
        enabled: true,
        minRetryCooldownMs: 3000,
        maxRetryCooldownMs: 120000,
      },
    });
    assert.equal(result.success, true, `Schema rejected valid patch: ${JSON.stringify(result)}`);
  });

  it("accepts partial providerCooldown patch", () => {
    const result = updateResilienceSchema.safeParse({
      providerCooldown: { enabled: false },
    });
    assert.equal(result.success, true, `Schema rejected partial patch: ${JSON.stringify(result)}`);
  });

  it("rejects unknown keys inside providerCooldown", () => {
    const result = updateResilienceSchema.safeParse({
      providerCooldown: { enabled: true, unknownKey: 42 },
    });
    assert.equal(result.success, false, "Schema should reject unknown keys");
  });

  it("rejects providerCooldown max below min", () => {
    const result = updateResilienceSchema.safeParse({
      providerCooldown: {
        minRetryCooldownMs: 120000,
        maxRetryCooldownMs: 30000,
      },
    });
    assert.equal(result.success, false, "Schema should reject contradictory cooldown bounds");
  });
});

describe("providerCooldown roundtrip through mergeResilienceSettings", () => {
  it("merges providerCooldown overrides correctly", () => {
    const base = resolveResilienceSettings({});
    const merged = mergeResilienceSettings(base, {
      providerCooldown: { enabled: true, minRetryCooldownMs: 2000 },
    });
    assert.equal(merged.providerCooldown.enabled, true);
    assert.equal(merged.providerCooldown.minRetryCooldownMs, 2000);
    // maxRetryCooldownMs should remain from default
    assert.ok(merged.providerCooldown.maxRetryCooldownMs > 0);
  });

  it("resolveResilienceSettings returns providerCooldown field", () => {
    const settings = resolveResilienceSettings({});
    assert.ok("providerCooldown" in settings, "providerCooldown missing from resolved settings");
    assert.ok("enabled" in settings.providerCooldown);
    assert.ok("minRetryCooldownMs" in settings.providerCooldown);
    assert.ok("maxRetryCooldownMs" in settings.providerCooldown);
  });
});
