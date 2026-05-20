/**
 * Issue #2300 — Public projection of combo metadata for GET /v1/combos.
 * Verifies that internal routing details (connectionId, weights) are stripped
 * before being exposed to API-key callers.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { projectCombo, projectComboStep } =
  await import("../../src/app/api/v1/combos/projectCombo.ts");

test("#2300 projectComboStep keeps model + providerId, drops connectionId/weight/label", () => {
  const out = projectComboStep({
    id: "step_internal_id",
    kind: "model",
    model: "anthropic/claude-sonnet-4",
    providerId: "anthropic",
    connectionId: "conn_secret_xyz",
    weight: 0.7,
    label: "primary",
    tags: ["fast"],
  });

  assert.deepEqual(out, {
    kind: "model",
    model: "anthropic/claude-sonnet-4",
    providerId: "anthropic",
  });
});

test("#2300 projectComboStep keeps combo-ref's comboName, drops weight/label", () => {
  const out = projectComboStep({
    id: "step_internal",
    kind: "combo-ref",
    comboName: "fallback-combo",
    weight: 0.3,
    label: "secondary",
  });

  assert.deepEqual(out, { kind: "combo-ref", comboName: "fallback-combo" });
});

test("#2300 projectComboStep returns null for unknown kinds + malformed steps", () => {
  assert.equal(projectComboStep({ kind: "unknown" }), null);
  assert.equal(projectComboStep({ kind: "model" }), null); // missing model
  assert.equal(projectComboStep({ kind: "combo-ref" }), null); // missing comboName
  assert.equal(projectComboStep({}), null);
  assert.equal(projectComboStep({ not_a_kind: true }), null);
});

test("#2300 projectCombo preserves name/strategy/description, projects models", () => {
  const out = projectCombo({
    id: "internal_id",
    name: "my-combo",
    strategy: "priority",
    description: "primary route",
    sortOrder: 5,
    models: [
      {
        kind: "model",
        model: "openai/gpt-5",
        providerId: "openai",
        connectionId: "conn_X",
        weight: 1,
      },
    ],
    schemaVersion: 2,
    config: { secret: "should-not-leak" },
  });

  assert.deepEqual(out, {
    name: "my-combo",
    strategy: "priority",
    description: "primary route",
    models: [{ kind: "model", model: "openai/gpt-5", providerId: "openai" }],
  });

  const serialized = JSON.stringify(out);
  assert.ok(!serialized.includes("conn_X"), "connection id must not leak");
  assert.ok(!serialized.includes("should-not-leak"), "config.secret must not leak");
  assert.ok(!serialized.includes("sortOrder"), "sortOrder must not leak");
});

test("#2300 projectCombo defaults strategy to 'priority' when missing", () => {
  const out = projectCombo({ name: "default-strategy", models: [] });
  assert.equal(out?.strategy, "priority");
});

test("#2300 projectCombo returns null for empty name", () => {
  assert.equal(projectCombo({ name: "", models: [] }), null);
  assert.equal(projectCombo({ name: "   ", models: [] }), null);
  assert.equal(projectCombo({ models: [] }), null);
});

test("#2300 projectCombo filters out malformed step entries silently", () => {
  const out = projectCombo({
    name: "noisy",
    strategy: "auto",
    models: [
      { kind: "model", model: "openai/gpt-5" },
      "not-an-object",
      null,
      { kind: "unknown" },
      { kind: "model" }, // missing model
    ],
  });
  assert.equal(out?.models.length, 1);
  assert.equal(out?.models[0].model, "openai/gpt-5");
});

test("#2300 projectCombo omits description when empty", () => {
  const out = projectCombo({ name: "no-desc", strategy: "priority", models: [] });
  assert.equal("description" in (out ?? {}), false);
});
