import test from "node:test";
import assert from "node:assert/strict";

const {
  resolveComboConfig,
  getDefaultComboConfig,
  resolveComboTargetTimeoutMs,
  DEFAULT_COMBO_TARGET_TIMEOUT_MS,
  COMBO_TARGET_TIMEOUT_WAIT_BUFFER_MS,
  isComboCooldownWaitEligible,
  resolveComboTargetTimeoutMsForCombo,
  resolveComboQueueDepth,
} = await import("../../open-sse/services/comboConfig.ts");
const { createComboSchema, updateComboDefaultsSchema } =
  await import("../../src/shared/validation/schemas.ts");
const { MAX_TIMER_TIMEOUT_MS } = await import("../../src/shared/utils/runtimeTimeouts.ts");

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
  assert.equal(first.nestedComboMode, "flatten");
  assert.equal(first.failoverBeforeRetry, true);
  assert.equal(first.maxSetRetries, 0);
  assert.equal(first.setRetryDelayMs, 2000);
  assert.equal(first.reasoningTokenBufferEnabled, true);
  assert.equal(first.zeroLatencyOptimizationsEnabled, false);
  assert.equal(first.hedging, false);
  assert.equal(first.fallbackCompressionMode, "lite");
  assert.equal(first.fallbackCompressionThreshold, 1000);
  assert.equal(first.predictiveTtftMs, 0);
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
        targetTimeoutMs: 90000,
      },
      providerOverrides: {
        openai: {
          timeoutMs: 60000,
          targetTimeoutMs: 45000,
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
  assert.equal(result.targetTimeoutMs, 45000);
  assert.ok(!("timeoutMs" in result));
  assert.ok(!("healthCheckEnabled" in result));
});

test("resolveComboConfig cascades reasoning token buffer feature flag", () => {
  const providerDisabled = resolveComboConfig(
    {},
    {
      comboDefaults: {
        reasoningTokenBufferEnabled: true,
      },
      providerOverrides: {
        openai: {
          reasoningTokenBufferEnabled: false,
        },
      },
    },
    "openai"
  );

  const comboEnabled = resolveComboConfig(
    {
      config: {
        reasoningTokenBufferEnabled: true,
      },
    },
    {
      comboDefaults: {
        reasoningTokenBufferEnabled: false,
      },
    }
  );

  assert.equal(providerDisabled.reasoningTokenBufferEnabled, false);
  assert.equal(comboEnabled.reasoningTokenBufferEnabled, true);
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
      targetTimeoutMs: 30000,
      reasoningTokenBufferEnabled: false,
    },
    providerOverrides: {
      anthropic: {
        timeoutMs: 5400000,
        targetTimeoutMs: 45000,
        reasoningTokenBufferEnabled: false,
      },
    },
  });

  assert.equal(parsed.comboDefaults.timeoutMs, 3600000);
  assert.equal(parsed.comboDefaults.targetTimeoutMs, 30000);
  assert.equal(parsed.comboDefaults.reasoningTokenBufferEnabled, false);
  assert.equal(parsed.providerOverrides.anthropic.timeoutMs, 5400000);
  assert.equal(parsed.providerOverrides.anthropic.targetTimeoutMs, 45000);
  assert.equal(parsed.providerOverrides.anthropic.reasoningTokenBufferEnabled, false);
});

test("combo config schema accepts explicit zero-latency opt-in controls", () => {
  const parsed = createComboSchema.parse({
    name: "zero-latency-opt-in",
    models: ["openai/gpt-4o-mini", "anthropic/claude-3-haiku"],
    config: {
      zeroLatencyOptimizationsEnabled: true,
      hedging: true,
      hedgeDelayMs: 250,
      fallbackCompressionMode: "lite",
      fallbackCompressionThreshold: 2500,
      predictiveTtftMs: 1800,
    },
  });

  assert.equal(parsed.config.zeroLatencyOptimizationsEnabled, true);
  assert.equal(parsed.config.hedging, true);
  assert.equal(parsed.config.hedgeDelayMs, 250);
  assert.equal(parsed.config.fallbackCompressionMode, "lite");
  assert.equal(parsed.config.fallbackCompressionThreshold, 2500);
  assert.equal(parsed.config.predictiveTtftMs, 1800);
});

test("combo config schema auto-promotes the zero-latency gate for legacy configs without opt-in", () => {
  // Pre-3.8.33 combos carry zero-latency subfeatures without the
  // zeroLatencyOptimizationsEnabled gate. The schema now auto-promotes the gate
  // (instead of 400-ing on the first GUI edit) so they round-trip. See #4774/#4382.
  const result = createComboSchema.safeParse({
    name: "zero-latency-legacy",
    models: ["openai/gpt-4o-mini", "anthropic/claude-3-haiku"],
    config: {
      hedging: true,
      fallbackCompressionMode: "lite",
      predictiveTtftMs: 1800,
    },
  });

  assert.equal(result.success, true);
  assert.equal(result.data.config.zeroLatencyOptimizationsEnabled, true);
  // The enabled subfeatures are preserved verbatim.
  assert.equal(result.data.config.hedging, true);
  assert.equal(result.data.config.fallbackCompressionMode, "lite");
  assert.equal(result.data.config.predictiveTtftMs, 1800);
});

test("combo config schema leaves the zero-latency gate untouched when no subfeature is enabled", () => {
  // A plain config with no zero-latency subfeature must NOT be auto-promoted —
  // the gate stays at its default (false) so we don't silently flip optimizations on.
  const result = createComboSchema.safeParse({
    name: "no-zero-latency",
    models: ["openai/gpt-4o-mini", "anthropic/claude-3-haiku"],
    config: {
      fallbackCompressionMode: "off",
    },
  });

  assert.equal(result.success, true);
  assert.notEqual(result.data.config.zeroLatencyOptimizationsEnabled, true);
});

test("combo config schema no longer rejects v3.8.31-era removed config keys (#4382 round-trip)", () => {
  // Keys dropped after v3.8.31 still live in stored JSON. The schema switched
  // .strict() (which 400'd) → .passthrough(); the route + migration 103 scrub them.
  const result = createComboSchema.safeParse({
    name: "legacy-removed-keys",
    models: ["openai/gpt-4o-mini", "anthropic/claude-3-haiku"],
    config: {
      queueDepth: 4,
      fallbackDelayMs: 200,
      maxComboDepth: 3,
      shadowRouting: { enabled: false },
      resetAwareEnabled: true,
    },
  });

  assert.equal(result.success, true);
});

test("combo config schema allows zero-latency tuning fields when subfeatures stay disabled", () => {
  const parsed = createComboSchema.parse({
    name: "zero-latency-disabled-tuning",
    models: ["openai/gpt-4o-mini", "anthropic/claude-3-haiku"],
    config: {
      hedgeDelayMs: 250,
      fallbackCompressionMode: "off",
      fallbackCompressionThreshold: 2500,
      predictiveTtftMs: 0,
    },
  });

  assert.equal(parsed.config.hedgeDelayMs, 250);
  assert.equal(parsed.config.fallbackCompressionMode, "off");
  assert.equal(parsed.config.fallbackCompressionThreshold, 2500);
  assert.equal(parsed.config.predictiveTtftMs, 0);
});

test("resolveComboTargetTimeoutMs inherits the upstream timeout and only shortens it", () => {
  assert.equal(resolveComboTargetTimeoutMs({}, 600000), 600000);
  assert.equal(resolveComboTargetTimeoutMs({ targetTimeoutMs: 30000 }, 600000), 30000);
  assert.equal(resolveComboTargetTimeoutMs({ targetTimeoutMs: 900000 }, 600000), 600000);
  assert.equal(resolveComboTargetTimeoutMs({ targetTimeoutMs: 0 }, 600000), 600000);
  assert.equal(resolveComboTargetTimeoutMs({ targetTimeoutMs: 30000 }, 0), 30000);
  assert.equal(resolveComboTargetTimeoutMs({}, 0), 0);
  assert.equal(
    resolveComboTargetTimeoutMs({ targetTimeoutMs: 999999999999 }, 0),
    MAX_TIMER_TIMEOUT_MS
  );
  assert.equal(resolveComboTargetTimeoutMs({}, 999999999999), MAX_TIMER_TIMEOUT_MS);
});

test("resolveComboTargetTimeoutMs falls back to the saner combo default when unset", () => {
  // The combo default is the documented 120s fallback-latency cap.
  assert.equal(DEFAULT_COMBO_TARGET_TIMEOUT_MS, 120000);
  // Unset config → use the default (capped at the ceiling), NOT the full upstream ceiling.
  // This is what shortens a hung-target failover from 600s to 120s (escalated cmqlrhd7c).
  assert.equal(resolveComboTargetTimeoutMs({}, 600000, 120000), 120000);
  // Operators can still extend beyond the default, up to the ceiling.
  assert.equal(resolveComboTargetTimeoutMs({ targetTimeoutMs: 300000 }, 600000, 120000), 300000);
  // Explicit config above the ceiling is still capped at the ceiling.
  assert.equal(resolveComboTargetTimeoutMs({ targetTimeoutMs: 900000 }, 600000, 120000), 600000);
  // A default larger than the ceiling is clamped to the ceiling.
  assert.equal(resolveComboTargetTimeoutMs({}, 100000, 120000), 100000);
  // Backward-compat: omitting the default arg keeps the legacy inherit-the-ceiling behavior.
  assert.equal(resolveComboTargetTimeoutMs({}, 600000), 600000);
  // Disabled upstream timeout (0 = unbounded) stays unbounded even with a default present.
  assert.equal(resolveComboTargetTimeoutMs({}, 0, 120000), 0);
});

// #7360 follow-up: a "default" auto-strategy combo hitting Gemini TPM/RPM on both
// targets waits out cooldowns for up to comboCooldownWait.budgetMs (default 130s), but
// DEFAULT_COMBO_TARGET_TIMEOUT_MS (120s) is shorter — the per-target timeout was cutting
// the wait off early and returning a synthetic 524 instead of letting the wait finish.
test("isComboCooldownWaitEligible only engages for quota-share/auto with the feature enabled", () => {
  assert.equal(isComboCooldownWaitEligible("auto", { enabled: true }), true);
  assert.equal(isComboCooldownWaitEligible("quota-share", { enabled: true }), true);
  assert.equal(isComboCooldownWaitEligible("auto", { enabled: false }), false);
  assert.equal(isComboCooldownWaitEligible("fill-first", { enabled: true }), false);
  assert.equal(isComboCooldownWaitEligible("priority", { enabled: true }), false);
});

test("resolveComboTargetTimeoutMsForCombo raises the floor to cover the cooldown-wait budget for eligible strategies", () => {
  const comboCooldownWait = { enabled: true, budgetMs: 130000 };

  // Wait-eligible strategy: floor is budget + buffer (150s), not the 120s default.
  assert.equal(
    resolveComboTargetTimeoutMsForCombo({}, 600000, "auto", comboCooldownWait),
    130000 + COMBO_TARGET_TIMEOUT_WAIT_BUFFER_MS
  );
  assert.equal(
    resolveComboTargetTimeoutMsForCombo({}, 600000, "quota-share", comboCooldownWait),
    130000 + COMBO_TARGET_TIMEOUT_WAIT_BUFFER_MS
  );

  // Not wait-eligible (wrong strategy, or feature disabled): unchanged 120s default.
  assert.equal(
    resolveComboTargetTimeoutMsForCombo({}, 600000, "fill-first", comboCooldownWait),
    DEFAULT_COMBO_TARGET_TIMEOUT_MS
  );
  assert.equal(
    resolveComboTargetTimeoutMsForCombo({}, 600000, "auto", { enabled: false, budgetMs: 130000 }),
    DEFAULT_COMBO_TARGET_TIMEOUT_MS
  );

  // A small budget below the 120s default never lowers the floor.
  assert.equal(
    resolveComboTargetTimeoutMsForCombo({}, 600000, "auto", { enabled: true, budgetMs: 5000 }),
    DEFAULT_COMBO_TARGET_TIMEOUT_MS
  );

  // Explicit per-combo targetTimeoutMs still wins over the derived floor.
  assert.equal(
    resolveComboTargetTimeoutMsForCombo(
      { targetTimeoutMs: 45000 },
      600000,
      "auto",
      comboCooldownWait
    ),
    45000
  );

  // The derived floor is still capped at the upstream ceiling.
  assert.equal(resolveComboTargetTimeoutMsForCombo({}, 100000, "auto", comboCooldownWait), 100000);
});

test("combo timeout schema rejects values beyond the safe timer limit", () => {
  const result = createComboSchema.safeParse({
    name: "unsafe-timeout",
    models: ["openai/gpt-4"],
    config: {
      targetTimeoutMs: MAX_TIMER_TIMEOUT_MS + 1,
    },
  });

  assert.equal(result.success, false);
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
    models: ["codex/gpt-5.6-sol"],
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
        model: "gpt-5.6-sol",
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
        model: "gpt-5.6-sol",
        connectionId: "conn-codex-a",
      },
      {
        kind: "model",
        id: "step-backup",
        providerId: "codex",
        model: "gpt-5.6-sol",
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

test("createComboSchema accepts nestedComboMode and rejects invalid values", () => {
  const parsed = createComboSchema.parse({
    name: "nested-execute",
    models: [{ kind: "combo-ref", comboName: "child" }],
    strategy: "priority",
    config: { nestedComboMode: "execute" },
  });
  assert.equal(parsed.config.nestedComboMode, "execute");

  const flatten = createComboSchema.parse({
    name: "nested-flatten",
    models: ["openai/gpt-4o-mini"],
    config: { nestedComboMode: "flatten" },
  });
  assert.equal(flatten.config.nestedComboMode, "flatten");

  const invalid = createComboSchema.safeParse({
    name: "nested-invalid",
    models: ["openai/gpt-4o-mini"],
    config: { nestedComboMode: "redirect" },
  });
  assert.equal(invalid.success, false);
});

test("createComboSchema accepts per-combo stickyRoundRobinLimit and rejects out-of-range", () => {
  const parsed = createComboSchema.parse({
    name: "sticky-override",
    models: ["openai/gpt-4o-mini"],
    strategy: "round-robin",
    config: { stickyRoundRobinLimit: 2 },
  });
  assert.equal(parsed.config.stickyRoundRobinLimit, 2);

  const tooHigh = createComboSchema.safeParse({
    name: "sticky-too-high",
    models: ["openai/gpt-4o-mini"],
    strategy: "round-robin",
    config: { stickyRoundRobinLimit: 1001 },
  });
  assert.equal(tooHigh.success, false);
});

test("createComboSchema accepts per-combo stickyWeightedLimit and rejects out-of-range", () => {
  const parsed = createComboSchema.parse({
    name: "sticky-weighted",
    models: [{ model: "openai/gpt-4o-mini", weight: 100 }],
    strategy: "weighted",
    config: { stickyWeightedLimit: 2 },
  });
  assert.equal(parsed.config.stickyWeightedLimit, 2);

  const tooHigh = createComboSchema.safeParse({
    name: "sticky-weighted-too-high",
    models: [{ model: "openai/gpt-4o-mini", weight: 100 }],
    strategy: "weighted",
    config: { stickyWeightedLimit: 1001 },
  });
  assert.equal(tooHigh.success, false);
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

test("resolveComboConfig cascades nestedComboMode", () => {
  const result = resolveComboConfig(
    { config: { nestedComboMode: "execute" } },
    { comboDefaults: { nestedComboMode: "flatten" } }
  );
  assert.equal(result.nestedComboMode, "execute");

  const defaulted = resolveComboConfig({ config: {} }, { comboDefaults: {} });
  assert.equal(defaulted.nestedComboMode, "flatten");
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

// Issue #3872: combo round-robin always queued ~20 deep before cascading on
// semaphore saturation because handleRoundRobinCombo never threaded a queue depth
// into accountSemaphore.acquire (it fell back to the hardcoded DEFAULT_MAX_QUEUE_SIZE
// of 20). Expose `queueDepth` as combo config so operators can shrink the pre-cascade
// queue (0 = fail over immediately) for faster failover, while keeping 20 as the
// backward-compatible default.
test("getDefaultComboConfig exposes the backward-compatible queueDepth default of 20", () => {
  assert.equal(getDefaultComboConfig().queueDepth, 20);
});

test("resolveComboConfig cascades queueDepth from defaults through provider and combo overrides", () => {
  const fromDefault = resolveComboConfig({ config: {} }, { comboDefaults: {} });
  assert.equal(fromDefault.queueDepth, 20);

  const cascaded = resolveComboConfig(
    {
      config: {
        queueDepth: 1,
      },
    },
    {
      comboDefaults: {
        queueDepth: 10,
      },
      providerOverrides: {
        openai: {
          queueDepth: 5,
        },
      },
    },
    "openai"
  );

  // Most specific (combo.config) wins over provider override and global default.
  assert.equal(cascaded.queueDepth, 1);
});

test("resolveComboQueueDepth defaults to 20, honors configured values, and clamps the range", () => {
  assert.equal(resolveComboQueueDepth(null), 20);
  assert.equal(resolveComboQueueDepth({}), 20);
  assert.equal(resolveComboQueueDepth({ queueDepth: 5 }), 5);
  // 0 is a valid, meaningful value: queue nothing → fail over to the next member immediately.
  assert.equal(resolveComboQueueDepth({ queueDepth: 0 }), 0);
  // Invalid / negative inputs fall back to the safe default.
  assert.equal(resolveComboQueueDepth({ queueDepth: -3 }), 20);
  assert.equal(resolveComboQueueDepth({ queueDepth: Number.NaN }), 20);
  // Out-of-range high values are clamped, not trusted.
  assert.equal(resolveComboQueueDepth({ queueDepth: 99999 }), 100);
  // Fractional values floor to an integer queue slot count.
  assert.equal(resolveComboQueueDepth({ queueDepth: 3.9 }), 3);
});

test("createComboSchema accepts queueDepth, coerces strings, and allows 0 for immediate failover", () => {
  const parsed = createComboSchema.parse({
    name: "fast-failover",
    models: ["openai/gpt-4o-mini", "anthropic/claude-3-haiku"],
    strategy: "round-robin",
    config: {
      queueDepth: "0",
    },
  });

  assert.equal(parsed.config.queueDepth, 0);
});

test("createComboSchema rejects queueDepth outside the supported range", () => {
  const tooHigh = createComboSchema.safeParse({
    name: "bad-queue-depth-high",
    models: ["openai/gpt-4"],
    strategy: "round-robin",
    config: { queueDepth: 101 },
  });
  assert.equal(tooHigh.success, false);

  const negative = createComboSchema.safeParse({
    name: "bad-queue-depth-negative",
    models: ["openai/gpt-4"],
    strategy: "round-robin",
    config: { queueDepth: -1 },
  });
  assert.equal(negative.success, false);
});

// ─── Fusion strategy config (judgeModel + fusionTuning) ──────────────────
// Backs the dashboard combo-editor Fusion fields (judge model + tuning). The
// editor only writes these; the backend (open-sse/services/fusion.ts) reads
// config.judgeModel / config.fusionTuning. The schema must accept + bound them.

test("createComboSchema accepts judgeModel and fusionTuning for a fusion combo", () => {
  const result = createComboSchema.safeParse({
    name: "fusion-panel",
    models: ["cc/claude-opus-4-7", "cx/gpt-5.5", "glm/glm-5.1"],
    strategy: "fusion",
    config: {
      judgeModel: "cc/claude-opus-4-7",
      fusionTuning: { minPanel: 2, stragglerGraceMs: 8000, panelHardTimeoutMs: 90000 },
    },
  });
  assert.equal(result.success, true);
  assert.equal(result.data.config.judgeModel, "cc/claude-opus-4-7");
  assert.deepEqual(result.data.config.fusionTuning, {
    minPanel: 2,
    stragglerGraceMs: 8000,
    panelHardTimeoutMs: 90000,
  });
});

test("createComboSchema accepts a fusion combo with no fusion config (defaults apply at runtime)", () => {
  const result = createComboSchema.safeParse({
    name: "fusion-bare",
    models: ["cc/claude-opus-4-7", "cx/gpt-5.5"],
    strategy: "fusion",
    config: {},
  });
  assert.equal(result.success, true);
});

test("createComboSchema coerces numeric-string fusionTuning values", () => {
  const result = createComboSchema.safeParse({
    name: "fusion-coerce",
    models: ["a/m1", "b/m2"],
    strategy: "fusion",
    config: { fusionTuning: { minPanel: "3", stragglerGraceMs: "5000" } },
  });
  assert.equal(result.success, true);
  assert.equal(result.data.config.fusionTuning.minPanel, 3);
  assert.equal(result.data.config.fusionTuning.stragglerGraceMs, 5000);
});

test("createComboSchema rejects out-of-range fusionTuning values", () => {
  const minPanelTooHigh = createComboSchema.safeParse({
    name: "fusion-bad-minpanel",
    models: ["a/m1", "b/m2"],
    strategy: "fusion",
    config: { fusionTuning: { minPanel: 51 } },
  });
  assert.equal(minPanelTooHigh.success, false);

  const graceNegative = createComboSchema.safeParse({
    name: "fusion-bad-grace",
    models: ["a/m1", "b/m2"],
    strategy: "fusion",
    config: { fusionTuning: { stragglerGraceMs: -1 } },
  });
  assert.equal(graceNegative.success, false);

  const hardTimeoutTooLow = createComboSchema.safeParse({
    name: "fusion-bad-hardtimeout",
    models: ["a/m1", "b/m2"],
    strategy: "fusion",
    config: { fusionTuning: { panelHardTimeoutMs: 500 } },
  });
  assert.equal(hardTimeoutTooLow.success, false);
});

test("createComboSchema rejects unknown keys inside fusionTuning (strict object)", () => {
  const result = createComboSchema.safeParse({
    name: "fusion-unknown-key",
    models: ["a/m1", "b/m2"],
    strategy: "fusion",
    config: { fusionTuning: { minPanel: 2, bogusKey: 1 } },
  });
  assert.equal(result.success, false);
});
