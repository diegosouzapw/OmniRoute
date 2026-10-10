/**
 * Regression test: PATCH /api/resilience accepts the streamRecovery block.
 *
 * The route stores the whole resolved object on every write, including
 * streamRecovery, and the stored value wins over flags and environment on
 * read. The validation schema did not accept that block, so the stored
 * value could never be changed through the API.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { updateResilienceSchema } from "../../src/shared/validation/schemas.js";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  resolveResilienceSettings,
} from "../../src/lib/resilience/settings.js";

describe("streamRecovery in updateResilienceSchema", () => {
  it("accepts a partial streamRecovery patch", () => {
    const result = updateResilienceSchema.safeParse({
      streamRecovery: { continueMidStream: false },
    });
    assert.equal(result.success, true, `Schema rejected valid patch: ${JSON.stringify(result)}`);
  });

  it("rejects unknown keys inside streamRecovery", () => {
    const result = updateResilienceSchema.safeParse({
      streamRecovery: { enabled: true, unknownKey: 1 },
    });
    assert.equal(result.success, false, "Schema should reject unknown keys");
  });

  it("rejects unknown keys inside throughputWatchdog", () => {
    const result = updateResilienceSchema.safeParse({
      streamRecovery: { throughputWatchdog: { enabled: true, unknownKey: 1 } },
    });
    assert.equal(result.success, false, "Schema should reject unknown watchdog keys");
  });

  it("rejects out-of-range watchdog bounds", () => {
    for (const value of [-1, 600_001]) {
      const result = updateResilienceSchema.safeParse({
        streamRecovery: { throughputWatchdog: { warmupMs: value } },
      });
      assert.equal(result.success, false, `warmupMs ${value} should be rejected`);
    }
    const windowResult = updateResilienceSchema.safeParse({
      streamRecovery: { throughputWatchdog: { windowMs: 999 } },
    });
    assert.equal(windowResult.success, false, "windowMs 999 should be rejected");
    for (const field of ["minUsefulBytesPerSecond", "minUsefulBytes"] as const) {
      const result = updateResilienceSchema.safeParse({
        streamRecovery: { throughputWatchdog: { [field]: 0 } },
      });
      assert.equal(result.success, false, `${field} 0 should be rejected`);
    }
  });

  it("accepts watchdog bounds at the edges", () => {
    const result = updateResilienceSchema.safeParse({
      streamRecovery: {
        throughputWatchdog: { warmupMs: 0, windowMs: 1_000 },
      },
    });
    assert.equal(result.success, true, `Schema rejected edge bounds: ${JSON.stringify(result)}`);
    const upper = updateResilienceSchema.safeParse({
      streamRecovery: {
        throughputWatchdog: { warmupMs: 600_000, windowMs: 600_000 },
      },
    });
    assert.equal(upper.success, true, `Schema rejected edge bounds: ${JSON.stringify(upper)}`);
  });

  it("rejects a non-boolean flag value", () => {
    const result = updateResilienceSchema.safeParse({
      streamRecovery: { enabled: "yes" },
    });
    assert.equal(result.success, false, "Schema should require a boolean flag");
  });

  it("covers every stored block", () => {
    const shape = updateResilienceSchema.shape as Record<string, unknown>;
    for (const key of Object.keys(DEFAULT_RESILIENCE_SETTINGS)) {
      assert.ok(key in shape, `${key} stored by the route is missing from validation`);
    }
  });
});

describe("streamRecovery roundtrip through mergeResilienceSettings", () => {
  it("stores and reads back continueMidStream false", () => {
    const base = resolveResilienceSettings({});
    const merged = mergeResilienceSettings(base, {
      streamRecovery: { continueMidStream: false },
    });
    assert.equal(merged.streamRecovery.continueMidStream, false);
  });

  it("leaves streamRecovery unchanged when another block is patched", () => {
    const base = resolveResilienceSettings({});
    const withRecovery = mergeResilienceSettings(base, {
      streamRecovery: { continueMidStream: false },
    });
    const merged = mergeResilienceSettings(withRecovery, {
      providerCooldown: { enabled: true },
    });
    assert.deepEqual(merged.streamRecovery, withRecovery.streamRecovery);
  });

  it("keeps flag and environment defaults when nothing is stored", () => {
    const resolved = resolveResilienceSettings({});
    assert.deepEqual(resolved.streamRecovery, DEFAULT_RESILIENCE_SETTINGS.streamRecovery);
  });
});
