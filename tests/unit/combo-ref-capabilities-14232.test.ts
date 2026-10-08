import test from "node:test";
import assert from "node:assert/strict";

import {
  computeComboCapabilities,
  projectCombo,
} from "../../src/app/api/v1/combos/projectCombo.ts";
import { resolveNestedComboTargets } from "../../open-sse/services/combo/comboStructure.ts";

/**
 * #14232 (slice 1): a combo that routes through a combo-ref never had its
 * nested targets expanded when /v1/combos computed capabilities, so the
 * projection hardcoded `multimodal: false` for every nested combo. /v1/models
 * resolves the same combo through resolveNestedComboTargets and intersects the
 * vision flags of the actual leaves, so the two catalog endpoints disagreed
 * about the same combo. The doc contract on computeComboCapabilities always
 * said only *unresolvable* combo-refs should force false.
 */

const COMBOS = [
  {
    name: "inner-vision",
    strategy: "priority",
    models: [
      { kind: "model", model: "prov-a/vision-model" },
      { kind: "model", model: "prov-b/vision-model" },
    ],
  },
  {
    name: "inner-text",
    strategy: "priority",
    models: [{ kind: "model", model: "prov-c/text-model" }],
  },
  {
    name: "outer-nested",
    strategy: "priority",
    models: [
      { kind: "combo-ref", comboName: "inner-vision" },
      { kind: "model", model: "prov-d/vision-model" },
    ],
  },
  {
    name: "outer-mixed",
    strategy: "priority",
    models: [
      { kind: "combo-ref", comboName: "inner-vision" },
      { kind: "model", model: "prov-c/text-model" },
    ],
  },
  {
    name: "outer-dangling",
    strategy: "priority",
    models: [{ kind: "combo-ref", comboName: "no-such-combo" }],
  },
  {
    name: "outer-self-cycle",
    strategy: "priority",
    models: [
      { kind: "combo-ref", comboName: "outer-self-cycle" },
      { kind: "model", model: "prov-a/vision-model" },
    ],
  },
] as const;

const visionOnly = (model: string) => ({
  supportsVision: model.endsWith("vision-model") ? (true as const) : (false as const),
  reasoning: false,
});

test("#14232 combo-ref targets are expanded for capability computation", () => {
  const caps = computeComboCapabilities(
    COMBOS[2] as unknown as Record<string, unknown>,
    visionOnly,
    COMBOS as unknown as Record<string, unknown>[]
  );
  // inner-vision's two leaves plus the direct step are all vision-capable, so
  // the combo must advertise multimodal instead of the hardcoded false.
  assert.equal(caps.multimodal, true);
});

test("#14232 the weakest nested member still caps the combo", () => {
  const caps = computeComboCapabilities(
    COMBOS[3] as unknown as Record<string, unknown>,
    visionOnly,
    COMBOS as unknown as Record<string, unknown>[]
  );
  assert.equal(caps.multimodal, false);
});

test("#14232 a dangling combo-ref stays conservative", () => {
  const caps = computeComboCapabilities(
    COMBOS[4] as unknown as Record<string, unknown>,
    visionOnly,
    COMBOS as unknown as Record<string, unknown>[]
  );
  assert.equal(caps.multimodal, false);
  assert.equal(caps.reasoning, false);
});

test("#14232 a self-referencing combo does not hang and stays honest", () => {
  const caps = computeComboCapabilities(
    COMBOS[5] as unknown as Record<string, unknown>,
    visionOnly,
    COMBOS as unknown as Record<string, unknown>[]
  );
  // The cycle resolves to just the direct vision step.
  assert.equal(caps.multimodal, true);
});

test("#14232 legacy callers without a collection keep the conservative result", () => {
  const caps = computeComboCapabilities(
    COMBOS[2] as unknown as Record<string, unknown>,
    visionOnly
  );
  assert.equal(caps.multimodal, false);
});

test("#14232 projectCombo forwards the collection to the capability pass", () => {
  const projected = projectCombo(COMBOS[2] as unknown as Record<string, unknown>, {
    includeCapabilities: true,
    resolveCapabilities: visionOnly,
    allCombos: COMBOS as unknown as Record<string, unknown>[],
  });
  assert.ok(projected);
  assert.equal(projected.capabilities?.multimodal, true);
});

test("#14232 expansion agrees with the runtime resolver", () => {
  // Whatever the routing runtime would dispatch is exactly what the projection
  // now evaluates — pinned via the same function catalog.ts uses.
  const resolved = resolveNestedComboTargets(
    COMBOS[2] as unknown as Parameters<typeof resolveNestedComboTargets>[0],
    COMBOS as unknown as Parameters<typeof resolveNestedComboTargets>[1]
  );
  assert.deepEqual(resolved.map((t) => t.modelStr).sort(), [
    "prov-a/vision-model",
    "prov-b/vision-model",
    "prov-d/vision-model",
  ]);
});
