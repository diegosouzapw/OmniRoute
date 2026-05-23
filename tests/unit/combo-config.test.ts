import test from "node:test";
import assert from "node:assert/strict";

const { resolveComboConfig, getDefaultComboConfig } =
  await import("../../open-sse/services/comboConfig.ts");
const { createComboSchema, updateComboDefaultsSchema } =
  await import("../../src/shared/validation/schemas.ts");

test("getDefaultComboConfig returns a fresh copy of the defaults", () => {
  const first = getDefaultComboConfig();
  const second = getDefaultComboConfig();

  assert.notEqual(first, second);
  assert.equal(first.strategy, "priority");
  assert.equal(first.maxRetries, 1);
  assert.equal(first.retryDelayMs, 2000);
  assert.equal(first.fallbackDelayMs, 0);
  assert.ok(!("timeoutMs" in first));
  assert.ok(!("healthCheckEnabled" in first));
  assert.equal(first.handoffThreshold, 0.85);
  assert.equal(first.maxMessagesForSummary, 30);
  assert.deepEqual(first.handoffProviders, ["codex"]);
  assert.equal(first.failoverBeforeRetry, true);
  assert.equal(first.maxSetRetries, 0);
  assert.equal(first.setRetryDelayMs, 2000);
  assert.equal(first.evalRouting.enabled, false);
  assert.equal(first.evalRouting.maxAgeHours, 720);

  first.strategy = "weighted";
  assert.equal(second.strategy, "priority");
});

test("resolveComboConfig applies the full cascade from defaults to combo overrides", () => {
  const result = resolveComboConfig(
    {
      config: {
        maxRetries: 4,
      },
    },
    {
      comboDefaults: {
        strategy: "round-robin",
        timeoutMs: 120000,
      },
      providerOverrides: {
        openai: {
          timeoutMs: 60000,
          retryDelayMs: 500,
          fallbackDelayMs: 100,
        },
      },
    },
    "openai"
  );

  assert.equal(result.strategy, "round-robin");
  assert.equal(result.retryDelayMs, 500);
  assert.equal(result.fallbackDelayMs, 100);
  assert.equal(result.maxRetries, 4);
  assert.ok(!("timeoutMs" in result));
  assert.ok(!("healthCheckEnabled" in result));
});

test("resolveComboConfig preserves nested routing defaults for partial overrides", () => {
  const result = resolveComboConfig(
    {
      config: {
        shadowRouting: { enabled: true },
        evalRouting: { enabled: true, suiteIds: ["coding-proficiency"] },
      },
    },
    {
      comboDefaults: {
        shadowRouting: { sampleRate: 0.5 },
        evalRouting: { maxAgeHours: 168 },
      },
    }
  );

  assert.equal(result.shadowRouting.enabled, true);
  assert.equal(result.shadowRouting.sampleRate, 0.5);
  assert.equal(result.shadowRouting.maxTargets, 2);
  assert.equal(result.shadowRouting.timeoutMs, 30000);
  assert.equal(result.evalRouting.enabled, true);
  assert.deepEqual(result.evalRouting.suiteIds, ["coding-proficiency"]);
  assert.equal(result.evalRouting.maxAgeHours, 168);
  assert.equal(result.evalRouting.minCases, 1);
  assert.equal(result.evalRouting.cacheTtlMs, 60000);
});

test("resolveComboConfig ignores null, undefined, and legacy resilience overrides", () => {
  const result = resolveComboConfig(
    {
      config: {
        timeoutMs: null,
        trackMetrics: false,
      },
    },
    {
      comboDefaults: {
        timeoutMs: undefined,
        queueTimeoutMs: 15000,
      },
      providerOverrides: {
        openai: {
          strategy: null,
          concurrencyPerModel: 9,
        },
      },
    },
    "openai"
  );

  assert.ok(!("timeoutMs" in result));
  assert.equal(result.queueTimeoutMs, 15000);
  assert.equal(result.concurrencyPerModel, 9);
  assert.equal(result.trackMetrics, false);
  assert.equal(result.strategy, "priority");
});

test("updateComboDefaultsSchema accepts arbitrarily large timeout defaults and provider overrides", () => {
  const parsed = updateComboDefaultsSchema.parse({
    comboDefaults: {
      timeoutMs: 3600000,
    },
    providerOverrides: {
      anthropic: {
        timeoutMs: 5400000,
      },
    },
  });

  assert.equal(parsed.comboDefaults.timeoutMs, 3600000);
  assert.equal(parsed.providerOverrides.anthropic.timeoutMs, 5400000);
});

test("resolveComboConfig preserves explicit empty handoffProviders overrides", () => {
  const result = resolveComboConfig(
    {
      config: {
        handoffProviders: [],
      },
    },
    {
      comboDefaults: {
        handoffProviders: ["codex"],
      },
    }
  );

  assert.deepEqual(result.handoffProviders, []);
});

test("resolveComboConfig skips provider overrides when provider is absent", () => {
  const result = resolveComboConfig(
    { config: {} },
    {
      comboDefaults: { strategy: "random" },
      providerOverrides: {
        openai: { strategy: "weighted" },
      },
    }
  );

  assert.equal(result.strategy, "random");
});

test("resolveComboConfig tolerates invalid or missing inputs and falls back to defaults", () => {
  assert.deepEqual(resolveComboConfig(null, null, "openai"), getDefaultComboConfig());
  assert.deepEqual(resolveComboConfig({}, { comboDefaults: null }, null), getDefaultComboConfig());
});

test("createComboSchema accepts context-relay strategy with handoff config", () => {
  const parsed = createComboSchema.parse({
    name: "codex-relay",
    models: ["codex/gpt-5.4"],
    strategy: "context-relay",
    config: {
      handoffThreshold: 0.85,
      maxMessagesForSummary: 24,
      handoffModel: "",
    },
  });

  assert.equal(parsed.strategy, "context-relay");
  assert.equal(parsed.config.handoffThreshold, 0.85);
  assert.equal(parsed.config.maxMessagesForSummary, 24);
});

test("createComboSchema accepts eval-driven routing config", () => {
  const parsed = createComboSchema.parse({
    name: "eval-ranked",
    models: ["openai/gpt-4o-mini", "anthropic/claude-3-haiku"],
    strategy: "priority",
    config: {
      evalRouting: {
        enabled: true,
        suiteIds: ["golden-set", "coding-proficiency"],
        maxAgeHours: 168,
        minCases: 5,
        qualityWeight: 0.9,
        latencyWeight: 0.1,
        cacheTtlMs: 30000,
      },
    },
  });

  assert.equal(parsed.config.evalRouting.enabled, true);
  assert.deepEqual(parsed.config.evalRouting.suiteIds, ["golden-set", "coding-proficiency"]);
});

test("createComboSchema accepts SLA-aware auto routing config", () => {
  const parsed = createComboSchema.parse({
    name: "sla-auto",
    models: ["openai/gpt-4o-mini", "gemini/gemini-2.5-flash"],
    strategy: "auto",
    config: {
      routerStrategy: "sla-aware",
      slaTargetP95Ms: "1500",
      slaMaxErrorRate: "0.05",
      slaMaxCostPer1MTokens: "4.5",
      slaHardConstraints: true,
      sla: {
        targetP95Ms: "2000",
        maxErrorRate: "0.1",
        hardConstraints: false,
      },
    },
  });

  assert.equal(parsed.strategy, "auto");
  assert.equal(parsed.config.routerStrategy, "sla-aware");
  assert.equal(parsed.config.slaTargetP95Ms, 1500);
  assert.equal(parsed.config.slaMaxErrorRate, 0.05);
  assert.equal(parsed.config.slaMaxCostPer1MTokens, 4.5);
  assert.equal(parsed.config.slaHardConstraints, true);
  assert.equal(parsed.config.sla.targetP95Ms, 2000);
  assert.equal(parsed.config.sla.maxErrorRate, 0.1);
});

test("createComboSchema accepts structured combo steps with pinned connection and combo refs", () => {
  const parsed = createComboSchema.parse({
    name: "codex-pinned",
    strategy: "priority",
    models: [
      {
        kind: "model",
        id: "step-codex-a",
        providerId: "codex",
        model: "gpt-5.4",
        connectionId: "conn-codex-a",
        weight: 10,
      },
      {
        kind: "combo-ref",
        id: "step-fallback",
        comboName: "backup-codex",
        weight: 5,
      },
    ],
  });

  assert.equal(parsed.models[0].kind, "model");
  assert.equal(parsed.models[0].providerId, "codex");
  assert.equal(parsed.models[0].connectionId, "conn-codex-a");
  assert.equal(parsed.models[1].kind, "combo-ref");
  assert.equal(parsed.models[1].comboName, "backup-codex");
});

test("createComboSchema accepts composite tiers that reference normalized combo steps", () => {
  const parsed = createComboSchema.parse({
    name: "tiered-codex",
    strategy: "priority",
    models: [
      {
        kind: "model",
        id: "step-primary",
        providerId: "codex",
        model: "gpt-5.4",
        connectionId: "conn-codex-a",
      },
      {
        kind: "model",
        id: "step-backup",
        providerId: "codex",
        model: "gpt-5.4",
        connectionId: "conn-codex-b",
      },
    ],
    config: {
      compositeTiers: {
        defaultTier: "primary",
        tiers: {
          primary: {
            stepId: "step-primary",
            fallbackTier: "backup",
            label: "Codex A",
          },
          backup: {
            stepId: "step-backup",
            description: "Fallback account",
          },
        },
      },
    },
  });

  assert.equal(parsed.config.compositeTiers.defaultTier, "primary");
  assert.equal(parsed.config.compositeTiers.tiers.primary.stepId, "step-primary");
  assert.equal(parsed.config.compositeTiers.tiers.primary.fallbackTier, "backup");
  assert.equal(parsed.config.compositeTiers.tiers.backup.stepId, "step-backup");
});

test("updateComboDefaultsSchema rejects composite tiers in global defaults and provider overrides", () => {
  const result = updateComboDefaultsSchema.safeParse({
    comboDefaults: {
      compositeTiers: {
        defaultTier: "primary",
        tiers: {
          primary: {
            stepId: "step-primary",
          },
        },
      },
    },
    providerOverrides: {
      codex: {
        compositeTiers: {
          defaultTier: "backup",
          tiers: {
            backup: {
              stepId: "step-backup",
            },
          },
        },
      },
    },
  });

  assert.equal(result.success, false);
  assert.deepEqual(
    result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
    [
      {
        path: "comboDefaults.compositeTiers",
        message: "compositeTiers is only supported on concrete combos",
      },
      {
        path: "providerOverrides.codex.compositeTiers",
        message: "compositeTiers is only supported on concrete combos",
      },
    ]
  );
});

test("createComboSchema accepts failoverBeforeRetry, maxSetRetries and setRetryDelayMs", () => {
  const parsed = createComboSchema.parse({
    name: "failover-test",
    models: ["openai/gpt-4"],
    strategy: "priority",
    config: {
      failoverBeforeRetry: true,
      maxSetRetries: 3,
      setRetryDelayMs: 1500,
    },
  });

  assert.equal(parsed.config.failoverBeforeRetry, true);
  assert.equal(parsed.config.maxSetRetries, 3);
  assert.equal(parsed.config.setRetryDelayMs, 1500);
});

test("createComboSchema coerces string numbers for maxSetRetries and setRetryDelayMs", () => {
  const parsed = createComboSchema.parse({
    name: "coerce-test",
    models: ["openai/gpt-4"],
    strategy: "priority",
    config: {
      maxSetRetries: "2",
      setRetryDelayMs: "500",
    },
  });

  assert.equal(parsed.config.maxSetRetries, 2);
  assert.equal(parsed.config.setRetryDelayMs, 500);
});

test("createComboSchema rejects maxSetRetries out of range", () => {
  const tooHigh = createComboSchema.safeParse({
    name: "bad-max",
    models: ["openai/gpt-4"],
    strategy: "priority",
    config: { maxSetRetries: 11 },
  });
  assert.equal(tooHigh.success, false);

  const negative = createComboSchema.safeParse({
    name: "bad-max",
    models: ["openai/gpt-4"],
    strategy: "priority",
    config: { maxSetRetries: -1 },
  });
  assert.equal(negative.success, false);
});

test("createComboSchema rejects setRetryDelayMs out of range", () => {
  const tooHigh = createComboSchema.safeParse({
    name: "bad-delay",
    models: ["openai/gpt-4"],
    strategy: "priority",
    config: { setRetryDelayMs: 60001 },
  });
  assert.equal(tooHigh.success, false);

  const negative = createComboSchema.safeParse({
    name: "bad-delay",
    models: ["openai/gpt-4"],
    strategy: "priority",
    config: { setRetryDelayMs: -1 },
  });
  assert.equal(negative.success, false);
});

test("resolveComboConfig cascades failoverBeforeRetry, maxSetRetries and setRetryDelayMs", () => {
  const result = resolveComboConfig(
    {
      config: {
        failoverBeforeRetry: true,
        maxSetRetries: 2,
        setRetryDelayMs: 3000,
      },
    },
    {
      comboDefaults: {
        failoverBeforeRetry: false,
        maxSetRetries: 0,
        setRetryDelayMs: 2000,
      },
    }
  );

  assert.equal(result.failoverBeforeRetry, true);
  assert.equal(result.maxSetRetries, 2);
  assert.equal(result.setRetryDelayMs, 3000);
});
