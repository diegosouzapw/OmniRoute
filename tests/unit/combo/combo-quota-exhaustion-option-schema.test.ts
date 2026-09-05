import test from "node:test";
import assert from "node:assert/strict";
import {
  createComboSchema,
  requiresQuotaOnlyComboRefExecute,
  updateComboSchema,
} from "../../../src/shared/validation/schemas/combo.ts";
import { normalizeComboStep } from "../../../src/lib/combos/steps.ts";

const modelStep = {
  kind: "model" as const,
  model: "openai/gpt-4o",
  fallbackOnlyOnQuotaExhaustion: true,
};
const comboRefStep = {
  kind: "combo-ref" as const,
  comboName: "child",
  fallbackOnlyOnQuotaExhaustion: true,
};

test("create/update accept and preserve strict quota-only booleans on model and combo-ref steps", () => {
  const payload = {
    name: "quota-only",
    strategy: "priority" as const,
    models: [modelStep, comboRefStep],
    config: { nestedComboMode: "execute" as const },
  };
  const created = createComboSchema.parse(payload);
  assert.equal(created.models[0].fallbackOnlyOnQuotaExhaustion, true);
  assert.equal(created.models[1].fallbackOnlyOnQuotaExhaustion, true);

  const updated = updateComboSchema.parse(payload);
  assert.equal(updated.models?.[0].fallbackOnlyOnQuotaExhaustion, true);
  assert.equal(updated.models?.[1].fallbackOnlyOnQuotaExhaustion, true);

  for (const bad of ["true", 1, null]) {
    assert.equal(
      createComboSchema.safeParse({
        ...payload,
        models: [{ ...modelStep, fallbackOnlyOnQuotaExhaustion: bad }],
      }).success,
      false
    );
  }
});

test("non-priority combos preserve the dormant option", () => {
  const parsed = createComboSchema.parse({
    name: "dormant",
    strategy: "weighted",
    models: [modelStep],
  });
  assert.equal(parsed.models[0].fallbackOnlyOnQuotaExhaustion, true);
  assert.equal(normalizeComboStep(parsed.models[0])?.fallbackOnlyOnQuotaExhaustion, true);
});

test("only active priority combo refs require execute mode", () => {
  assert.equal(
    createComboSchema.safeParse({ name: "invalid-ref", models: [comboRefStep] }).success,
    false
  );
  assert.equal(
    createComboSchema.safeParse({
      name: "valid-ref",
      models: [comboRefStep],
      config: { nestedComboMode: "execute" },
    }).success,
    true
  );
  assert.equal(
    createComboSchema.safeParse({
      name: "dormant-ref",
      strategy: "weighted",
      models: [comboRefStep],
    }).success,
    true
  );
  assert.equal(
    createComboSchema.safeParse({
      name: "ordinary-ref",
      models: [{ kind: "combo-ref", comboName: "child" }],
    }).success,
    true
  );
});

test("partial updates defer active combo-ref validation to the merged route state", () => {
  assert.equal(updateComboSchema.safeParse({ models: [comboRefStep] }).success, true);
  assert.equal(updateComboSchema.safeParse({ strategy: "priority" }).success, true);
  assert.equal(
    requiresQuotaOnlyComboRefExecute({
      strategy: "priority",
      models: [comboRefStep],
      config: {},
    }),
    true
  );
  assert.equal(
    requiresQuotaOnlyComboRefExecute({
      strategy: "weighted",
      models: [comboRefStep],
      config: {},
    }),
    false
  );
});

test("normalization omits false and preserves true", () => {
  const disabled = normalizeComboStep({ ...modelStep, fallbackOnlyOnQuotaExhaustion: false });
  const enabled = normalizeComboStep(modelStep);
  assert.equal("fallbackOnlyOnQuotaExhaustion" in (disabled || {}), false);
  assert.equal(enabled?.fallbackOnlyOnQuotaExhaustion, true);
});
