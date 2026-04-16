import test from "node:test";
import assert from "node:assert/strict";

const { validateCompositeTiersConfig } = await import("../../src/lib/combos/compositeTiers.ts");

function createComboInput(overrides = {}) {
  return {
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
          },
          backup: {
            stepId: "step-backup",
          },
        },
      },
    },
    ...overrides,
  };
}

test("validateCompositeTiersConfig accepts a valid tier graph that references combo steps", () => {
  const result = validateCompositeTiersConfig(createComboInput());

  assert.deepEqual(result, { success: true });
});

test("validateCompositeTiersConfig rejects tiers that point to missing step ids", () => {
  const result = validateCompositeTiersConfig(
    createComboInput({
      config: {
        compositeTiers: {
          defaultTier: "primary",
          tiers: {
            primary: {
              stepId: "step-missing",
            },
          },
        },
      },
    })
  );

  assert.equal(result.success, false);
  assert.deepEqual(result.error.details, [
    {
      field: "config.compositeTiers.tiers.primary.stepId",
      message: 'stepId "step-missing" does not exist in combo.models',
    },
  ]);
});

test("validateCompositeTiersConfig rejects duplicate step ownership across tiers", () => {
  const result = validateCompositeTiersConfig(
    createComboInput({
      config: {
        compositeTiers: {
          defaultTier: "primary",
          tiers: {
            primary: {
              stepId: "step-primary",
            },
            backup: {
              stepId: "step-primary",
            },
          },
        },
      },
    })
  );

  assert.equal(result.success, false);
  assert.deepEqual(result.error.details, [
    {
      field: "config.compositeTiers.tiers.backup.stepId",
      message: 'stepId "step-primary" is already assigned to tier "primary"',
    },
  ]);
});

test("validateCompositeTiersConfig rejects fallback cycles", () => {
  const result = validateCompositeTiersConfig(
    createComboInput({
      config: {
        compositeTiers: {
          defaultTier: "primary",
          tiers: {
            primary: {
              stepId: "step-primary",
              fallbackTier: "backup",
            },
            backup: {
              stepId: "step-backup",
              fallbackTier: "primary",
            },
          },
        },
      },
    })
  );

  assert.equal(result.success, false);
  assert.deepEqual(result.error.details, [
    {
      field: "config.compositeTiers.tiers.primary.fallbackTier",
      message: "fallbackTier cycle detected: primary -> backup -> primary",
    },
  ]);
});
