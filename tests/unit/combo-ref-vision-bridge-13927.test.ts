/**
 * Repro probe for #13927: combo-ref hop strips image parts.
 *
 * getComboVisionBridgeDecision() treats ANY top-level `combo-ref` step as an
 * unconditional "process" (describe images as text) without ever resolving
 * the nested combo to see whether its actual leaf targets support vision.
 * For a pass-through combo whose single member is a combo-ref to another
 * combo made entirely of vision-capable models, this wrongly triggers the
 * describe-and-replace path instead of "skip" (pass the image through raw),
 * which is what happens for the flat inner combo or the leaf model called
 * directly.
 */
import test from "node:test";
import assert from "node:assert/strict";

process.env.DATA_DIR = `/tmp/omniroute-test-13927-${Date.now()}`;

const { getComboVisionBridgeDecision } = await import("../../src/lib/guardrails/visionBridge.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
});

test("#13927: nested combo-ref to an all-vision-capable inner combo should resolve to skip, not process", async () => {
  // Inner combo: flat, all leaf targets are proven vision-capable
  // (command-code/gpt-5.5 is asserted vision-capable elsewhere, e.g.
  // tests/unit/vision-bridge-native-skip.test.ts).
  await combosDb.createCombo({
    name: "inner-vision-combo-13927",
    models: [{ providerId: "command-code", model: "gpt-5.5", weight: 1 }],
  });

  // Outer combo: single member is a combo-ref to the inner (all-vision) combo
  // -- exactly the "preset/default -> preset/deepseek-flash-latest" shape from
  // the issue.
  await combosDb.createCombo({
    name: "outer-passthrough-combo-13927",
    models: [{ kind: "combo-ref", comboName: "inner-vision-combo-13927" }],
  });

  const innerDecision = await getComboVisionBridgeDecision("inner-vision-combo-13927");
  assert.equal(
    innerDecision,
    "skip",
    "sanity: the flat inner combo (all vision-capable targets) must resolve to skip"
  );

  const outerDecision = await getComboVisionBridgeDecision("outer-passthrough-combo-13927");
  assert.equal(
    outerDecision,
    "skip",
    "BUG #13927: outer combo whose only member is a combo-ref to an all-vision-capable " +
      "combo must ALSO resolve to skip (image should pass through raw), not 'process' " +
      "(which describes the image as text and drops the raw bytes before the leaf ever sees them)"
  );
});

test("#13927: combo-ref to a mixed-capability inner combo resolves to process", async () => {
  // Inner combo mixes one vision-capable and one non-vision-capable leaf.
  await combosDb.createCombo({
    name: "inner-mixed-combo-13927",
    models: [
      { providerId: "command-code", model: "gpt-5.5", weight: 1 },
      { providerId: "mistral", model: "mistral-large-latest", weight: 1 },
    ],
  });

  await combosDb.createCombo({
    name: "outer-mixed-ref-combo-13927",
    models: [{ kind: "combo-ref", comboName: "inner-mixed-combo-13927" }],
  });

  const decision = await getComboVisionBridgeDecision("outer-mixed-ref-combo-13927");
  assert.equal(
    decision,
    "process",
    "a combo-ref to a mixed inner combo must resolve real leaf capabilities and still " +
      "describe images (some real leaves cannot see them)"
  );
});

test("#13927: combo-ref to a zero-vision inner combo resolves to no-vision", async () => {
  await combosDb.createCombo({
    name: "inner-zero-vision-combo-13927",
    models: [{ providerId: "mistral", model: "mistral-large-latest", weight: 1 }],
  });

  await combosDb.createCombo({
    name: "outer-zero-vision-ref-combo-13927",
    models: [{ kind: "combo-ref", comboName: "inner-zero-vision-combo-13927" }],
  });

  const decision = await getComboVisionBridgeDecision("outer-zero-vision-ref-combo-13927");
  assert.equal(
    decision,
    "no-vision",
    "a combo-ref to an all-non-vision inner combo must behave like a text-only model " +
      "(reroute-eligible), matching the flat-combo 'no-vision' outcome"
  );
});

test("#13927: circular combo-ref chain falls back safely and never throws", async () => {
  // A -> B -> A. Neither combo has a real leaf model, only cyclic combo-refs,
  // so both sides of the cycle hit the visited-set guard.
  await combosDb.createCombo({
    name: "circular-a-13927",
    models: [{ kind: "combo-ref", comboName: "circular-b-13927" }],
  });
  await combosDb.createCombo({
    name: "circular-b-13927",
    models: [{ kind: "combo-ref", comboName: "circular-a-13927" }],
  });

  await assert.doesNotReject(async () => {
    const decision = await getComboVisionBridgeDecision("circular-a-13927");
    // Implementation-plan contract: an unresolvable/circular combo-ref step is
    // folded in as a non-vision-capable leaf rather than forcing the whole
    // combo back to "process" -- with no other real leaf present, that lands
    // on "no-vision" (safe, reroute-eligible), never a crash.
    assert.equal(decision, "no-vision");
  });
});

test("#13927: circular combo-ref mixed with a real vision-capable leaf resolves to process", async () => {
  // A real vision-capable leaf plus an unresolvable circular combo-ref: the
  // circular hop still contributes a conservative non-vision leaf, so the
  // combo is "mixed" and must describe images, not skip.
  await combosDb.createCombo({
    name: "circular-c-13927",
    models: [{ kind: "combo-ref", comboName: "circular-d-13927" }],
  });
  await combosDb.createCombo({
    name: "circular-d-13927",
    models: [{ kind: "combo-ref", comboName: "circular-c-13927" }],
  });
  await combosDb.createCombo({
    name: "outer-circular-mixed-combo-13927",
    models: [
      { providerId: "command-code", model: "gpt-5.5", weight: 1 },
      { kind: "combo-ref", comboName: "circular-c-13927" },
    ],
  });

  const decision = await getComboVisionBridgeDecision("outer-circular-mixed-combo-13927");
  assert.equal(decision, "process");
});
