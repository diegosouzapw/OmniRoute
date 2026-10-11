/**
 * buildModelComboUsage — inverts the combo list into a model-id → combo-names map.
 *
 * Backs the "used in combo X" badge on the provider detail page. The mapping must
 * scope by `providerId` (a model id is only unique within a provider) and must
 * strip only the FIRST path segment of the combo step's `model` string — that
 * first segment is the routing prefix (e.g. `oc-xkiro-vps`), while the model id
 * itself can contain slashes (e.g. `qwen/qwen-plus-2025-07-28:free`).
 */

import test from "node:test";
import assert from "node:assert/strict";

const { buildModelComboUsage } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/hooks/useModelComboUsage.ts");

const PROVIDER = "openai-compatible-chat-98d8f762-87c0-4229-90f0-a47cf27367b7";
const OTHER_PROVIDER = "openai-compatible-chat-488142fb-4cb1-49aa-b832-5328d533c83d";

test("maps a provider's combo steps to model ids, stripping only the routing prefix", () => {
  const combos = [
    {
      name: "vps-qwen",
      models: [
        {
          kind: "model",
          model: "oc-xkiro-vps/qwen/qwen-plus-2025-07-28:free",
          providerId: PROVIDER,
        },
        {
          kind: "model",
          model: "oc-xkiro-vps/qwen/qwen3-coder-plus:free",
          providerId: PROVIDER,
        },
      ],
    },
  ];

  assert.deepEqual(buildModelComboUsage(combos, PROVIDER), {
    "qwen/qwen-plus-2025-07-28:free": ["vps-qwen"],
    "qwen/qwen3-coder-plus:free": ["vps-qwen"],
  });
});

test("ignores steps belonging to a different provider", () => {
  const combos = [
    {
      name: "vpc-combo",
      models: [
        { kind: "model", model: "oc-atria-asi-vps/Atria-Dawn-Preview", providerId: OTHER_PROVIDER },
      ],
    },
  ];

  assert.deepEqual(buildModelComboUsage(combos, PROVIDER), {});
});

test("collects every combo that references the same model, without duplicates", () => {
  const combos = [
    {
      name: "combo-a",
      models: [{ kind: "model", model: "oc/gpt-4o", providerId: PROVIDER }],
    },
    {
      name: "combo-b",
      models: [
        { kind: "model", model: "different-prefix/gpt-4o", providerId: PROVIDER },
        { kind: "model", model: "oc/gpt-4o", providerId: PROVIDER },
      ],
    },
  ];

  assert.deepEqual(buildModelComboUsage(combos, PROVIDER), {
    "gpt-4o": ["combo-a", "combo-b"],
  });
});

test("skips non-model steps (combo-ref / provider-wildcard)", () => {
  const combos = [
    {
      name: "mixed",
      models: [
        { kind: "combo-ref", comboName: "other", weight: 0 },
        { kind: "provider-wildcard", providerId: PROVIDER, modelPattern: "qwen/*", weight: 0 },
        { kind: "model", model: "oc/gpt-4o", providerId: PROVIDER },
      ],
    },
  ];

  assert.deepEqual(buildModelComboUsage(combos, PROVIDER), { "gpt-4o": ["mixed"] });
});

test("handles a step whose model has no prefix separator", () => {
  const combos = [
    {
      name: "bare",
      models: [{ kind: "model", model: "gpt-4o", providerId: PROVIDER }],
    },
  ];

  assert.deepEqual(buildModelComboUsage(combos, PROVIDER), { "gpt-4o": ["bare"] });
});

test("returns an empty map for malformed input", () => {
  assert.deepEqual(buildModelComboUsage(undefined, PROVIDER), {});
  assert.deepEqual(buildModelComboUsage(null, PROVIDER), {});
  assert.deepEqual(buildModelComboUsage("nope", PROVIDER), {});
  assert.deepEqual(buildModelComboUsage([], ""), {});
  assert.deepEqual(
    buildModelComboUsage([{ name: "no-steps", models: "not-an-array" }], PROVIDER),
    {}
  );
  assert.deepEqual(
    buildModelComboUsage([{ models: [{ kind: "model", model: "oc/x" }] }], PROVIDER),
    {}
  );
});
