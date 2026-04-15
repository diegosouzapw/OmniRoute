import test from "node:test";
import assert from "node:assert/strict";

const degradation = await import("../../src/domain/degradation.ts");

test.beforeEach(() => {
  degradation.resetDegradationRegistry();
});

test.after(() => {
  degradation.resetDegradationRegistry();
});

test("withDegradation returns full capability when the primary path succeeds", async () => {
  const result = await degradation.withDegradation(
    "semantic-search",
    async () => "primary-result",
    async () => "fallback-result",
    "safe-default"
  );

  assert.equal(result.result, "primary-result");
  assert.deepEqual(result.status, {
    level: "full",
    feature: "semantic-search",
    capability: "Full capability",
    reason: "",
    since: result.status.since,
  });
  assert.deepEqual(degradation.getFeatureStatus("semantic-search"), result.status);
  assert.equal(degradation.hasAnyDegradation(), false);
  assert.deepEqual(degradation.getDegradationSummary(), {
    full: 1,
    reduced: 0,
    minimal: 0,
    default: 0,
  });
});

test("withDegradation reports reduced capability, calls onDegrade, and preserves since across repeated degradation", async () => {
  const seen = [];

  const first = await degradation.withDegradation(
    "rate-limit-cache",
    async () => {
      throw new Error("redis unavailable");
    },
    async () => "memory-fallback",
    "safe-default",
    {
      reducedCapability: "In-memory fallback",
      onDegrade: (status) => seen.push(status),
    }
  );

  await new Promise((resolve) => setTimeout(resolve, 10));

  const second = await degradation.withDegradation(
    "rate-limit-cache",
    async () => {
      throw new Error("redis unavailable");
    },
    async () => "memory-fallback-again",
    "safe-default",
    {
      reducedCapability: "In-memory fallback",
      onDegrade: (status) => seen.push(status),
    }
  );

  assert.equal(first.result, "memory-fallback");
  assert.equal(first.status.level, "reduced");
  assert.equal(first.status.capability, "In-memory fallback");
  assert.equal(first.status.reason, "redis unavailable");
  assert.equal(second.status.level, "reduced");
  assert.equal(second.status.since, first.status.since);
  assert.equal(seen.length, 2);
  assert.equal(degradation.hasAnyDegradation(), true);
});

test("withDegradation falls back to the safe default when both implementations fail and the report sorts worst-first", async () => {
  await degradation.withDegradation(
    "cache-layer",
    async () => {
      throw new Error("cache offline");
    },
    async () => "memory-fallback",
    "safe-default"
  );

  const finalFallback = await degradation.withDegradation(
    "billing-export",
    async () => {
      throw new Error("primary offline");
    },
    async () => {
      throw new Error("fallback offline");
    },
    { exported: false },
    {
      defaultCapability: "Disabled export",
    }
  );

  assert.deepEqual(finalFallback.result, { exported: false });
  assert.equal(finalFallback.status.level, "default");
  assert.equal(finalFallback.status.capability, "Disabled export");
  assert.equal(finalFallback.status.reason, "primary offline → fallback offline");
  assert.deepEqual(
    degradation.getDegradationReport().map((entry) => ({
      feature: entry.feature,
      level: entry.level,
    })),
    [
      { feature: "billing-export", level: "default" },
      { feature: "cache-layer", level: "reduced" },
    ]
  );
});

test("withDegradationSync supports reduced and default modes and reset clears the registry", () => {
  const reduced = degradation.withDegradationSync(
    "sync-feature",
    () => {
      throw new Error("primary failed");
    },
    () => "fallback-result",
    "safe-default",
    {
      reducedCapability: "Fallback mode",
    }
  );

  const fallback = degradation.withDegradationSync(
    "sync-default",
    () => {
      throw new Error("primary failed");
    },
    () => {
      throw new Error("fallback failed");
    },
    "safe-default"
  );

  assert.equal(reduced.result, "fallback-result");
  assert.equal(reduced.status.level, "reduced");
  assert.equal(reduced.status.capability, "Fallback mode");
  assert.equal(fallback.result, "safe-default");
  assert.equal(fallback.status.level, "default");
  assert.match(fallback.status.reason, /primary failed/);

  degradation.resetDegradationRegistry();
  assert.equal(degradation.getFeatureStatus("sync-feature"), null);
  assert.deepEqual(degradation.getDegradationReport(), []);
});

test("degradation helpers cover custom capabilities and primitive error values", async () => {
  const seen = [];

  const full = await degradation.withDegradation(
    "custom-full",
    async () => "primary",
    async () => "fallback",
    "safe-default",
    {
      fullCapability: "Primary path available",
    }
  );

  const reduced = await degradation.withDegradation(
    "custom-reduced",
    async () => {
      throw "primary-string-error";
    },
    async () => "fallback",
    "safe-default",
    {
      reducedCapability: "Secondary path available",
      onDegrade: (status) => seen.push(status.feature),
    }
  );

  const fallback = await degradation.withDegradation(
    "custom-default",
    async () => {
      throw "primary-primitive";
    },
    async () => {
      throw "fallback-primitive";
    },
    "safe-default",
    {
      defaultCapability: "Static safe mode",
      onDegrade: (status) => seen.push(status.feature),
    }
  );

  const fullSync = degradation.withDegradationSync(
    "sync-custom-full",
    () => "sync-primary",
    () => "sync-fallback",
    "sync-safe",
    {
      fullCapability: "Sync primary path",
    }
  );

  const reducedSync = degradation.withDegradationSync(
    "sync-custom-reduced",
    () => {
      throw "sync-primary-error";
    },
    () => "sync-fallback",
    "sync-safe",
    {
      reducedCapability: "Sync fallback path",
      onDegrade: (status) => seen.push(status.feature),
    }
  );

  const defaultSync = degradation.withDegradationSync(
    "sync-custom-default",
    () => {
      throw "sync-primary-primitive";
    },
    () => {
      throw "sync-fallback-primitive";
    },
    "sync-safe",
    {
      defaultCapability: "Sync safe mode",
      onDegrade: (status) => seen.push(status.feature),
    }
  );

  assert.equal(full.status.capability, "Primary path available");
  assert.equal(reduced.status.capability, "Secondary path available");
  assert.equal(reduced.status.reason, "primary-string-error");
  assert.equal(fallback.status.capability, "Static safe mode");
  assert.equal(fallback.status.reason, "primary-primitive → fallback-primitive");
  assert.equal(fullSync.status.capability, "Sync primary path");
  assert.equal(reducedSync.status.capability, "Sync fallback path");
  assert.equal(reducedSync.status.reason, "sync-primary-error");
  assert.equal(defaultSync.status.capability, "Sync safe mode");
  assert.equal(defaultSync.status.reason, "sync-primary-primitive → sync-fallback-primitive");
  assert.deepEqual(seen, [
    "custom-reduced",
    "custom-default",
    "sync-custom-reduced",
    "sync-custom-default",
  ]);
});
