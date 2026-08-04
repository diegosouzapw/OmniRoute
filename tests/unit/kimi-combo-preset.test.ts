// Kimi Coding combo preset — pure data + gate logic.
// See src/app/(dashboard)/dashboard/combos/kimiComboPreset.ts.
import test from "node:test";
import assert from "node:assert/strict";

const kimiComboPreset = await import(
  "../../src/app/(dashboard)/dashboard/combos/kimiComboPreset.ts"
);
const createComboSchema = (
  await import("../../src/shared/validation/schemas/combo.ts")
).createComboSchema;

test("KIMI_CODING_PRESET_NAME is the exact combo name used everywhere (card gate, POST payload)", () => {
  assert.equal(kimiComboPreset.KIMI_CODING_PRESET_NAME, "Kimi Coding");
  assert.equal(kimiComboPreset.KIMI_CODING_PRESET.name, kimiComboPreset.KIMI_CODING_PRESET_NAME);
});

test("KIMI_CODING_PRESET uses priority strategy — kimi-k3 primary, kimi-coding/kimi-web fallback in order", () => {
  const preset = kimiComboPreset.KIMI_CODING_PRESET;
  assert.equal(preset.strategy, "priority");
  assert.deepEqual(
    preset.models.map((m) => [m.provider, m.model]),
    [
      ["moonshot", "kimi-k3"],
      ["kimi-coding", "k3"],
      ["kimi-web", "k3"],
    ],
    "moonshot/kimi-k3 must be first (priority strategy = array order = fallback order)"
  );
  for (const m of preset.models) {
    assert.equal(typeof m.weight, "number");
  }
});

test("KIMI_CODING_PRESET is a valid createComboSchema payload (would not 400 on POST /api/combos)", () => {
  const result = createComboSchema.safeParse(kimiComboPreset.KIMI_CODING_PRESET);
  assert.equal(result.success, true, result.success ? "" : JSON.stringify(result.error?.issues));
});

test("hasKimiCodingPreset detects an existing preset combo by name, case-sensitively", () => {
  assert.equal(kimiComboPreset.hasKimiCodingPreset([]), false);
  assert.equal(kimiComboPreset.hasKimiCodingPreset([{ name: "Some other combo" }]), false);
  assert.equal(kimiComboPreset.hasKimiCodingPreset([{ name: "Kimi Coding" }]), true);
  assert.equal(
    kimiComboPreset.hasKimiCodingPreset([{ name: "foo" }, { name: "Kimi Coding" }, { name: "bar" }]),
    true
  );
  assert.equal(kimiComboPreset.hasKimiCodingPreset([{ name: "kimi coding" }]), false);
  assert.equal(kimiComboPreset.hasKimiCodingPreset([{ name: null }, {}]), false);
});
