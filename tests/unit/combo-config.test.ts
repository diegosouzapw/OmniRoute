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
  assert.ok(!("timeoutMs" in first));
  assert.ok(!("healthCheckEnabled" in first));
  assert.equal(first.handoffThreshold, 0.85);
  assert.equal(first.maxMessagesForSummary, 30);
  assert.deepEqual(first.handoffProviders, ["codex"]);

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
        },
      },
    },
    "openai"
  );

  assert.equal(result.strategy, "round-robin");
  assert.equal(result.retryDelayMs, 500);
  assert.equal(result.maxRetries, 4);
  assert.ok(!("timeoutMs" in result));
  assert.ok(!("healthCheckEnabled" in result));
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
