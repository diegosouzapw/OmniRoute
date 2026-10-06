import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_WEIGHTS,
  normalizeScoringWeights,
  validateWeights,
} from "../../open-sse/services/autoCombo/scoring.ts";
import { DEFAULT_INTELLIGENT_WEIGHTS } from "../../src/lib/combos/intelligentRouting.ts";
import { scoringWeightsSchema } from "../../src/shared/validation/schemas/combo.ts";

// `scoringWeightsSchema` is `.optional()` at the point of use; parse through the
// inner object so a missing schema key surfaces as a dropped property rather than
// as `undefined` for the whole value.
function parseWeights(input: Record<string, number>): Record<string, number> {
  const parsed = scoringWeightsSchema.parse(input);
  assert.ok(parsed, "the weights schema returned nothing for a valid payload");
  return parsed as Record<string, number>;
}

test("the weights schema accepts exactly the factors the scorer declares", () => {
  const declared = Object.keys(DEFAULT_WEIGHTS).sort();
  const accepted = Object.keys(parseWeights(DEFAULT_WEIGHTS as Record<string, number>)).sort();
  assert.deepEqual(
    accepted,
    declared,
    "a factor the scorer weighs is missing from the schema (or vice versa) — " +
      "adding a factor to DEFAULT_WEIGHTS means adding it here too"
  );
});

test("saving the default weights gives back the default weights", () => {
  const saved = parseWeights(DEFAULT_WEIGHTS as Record<string, number>);
  for (const [factor, weight] of Object.entries(DEFAULT_WEIGHTS)) {
    assert.equal(saved[factor], weight, `weight for "${factor}" did not survive validation`);
  }
});

test("an explicit anti-concentration weight survives validation", () => {
  const saved = parseWeights({
    ...(DEFAULT_WEIGHTS as Record<string, number>),
    connectionDensity: 0.2,
  });
  assert.equal(saved.connectionDensity, 0.2);
});

test("an explicit quality weight survives validation", () => {
  const saved = parseWeights({ ...(DEFAULT_WEIGHTS as Record<string, number>), quality: 0.1 });
  assert.equal(saved.quality, 0.1);
});

test("an unknown key is still dropped — the schema does not become permissive", () => {
  const saved = parseWeights({
    ...(DEFAULT_WEIGHTS as Record<string, number>),
    notAFactor: 0.5,
  });
  assert.ok(
    !("notAFactor" in saved),
    "the schema must name the factors it accepts, not accept anything"
  );
});

// The dashboard keeps its own copy of the weight table: it is imported by a client
// component, and the scorer's module pulls the tier resolver and per-provider cost
// data behind it. The copy is deliberate; these three tests are what keeps it honest.
test("the dashboard sliders offer exactly the factors the scorer weighs", () => {
  assert.deepEqual(
    Object.keys(DEFAULT_INTELLIGENT_WEIGHTS).sort(),
    Object.keys(DEFAULT_WEIGHTS).sort(),
    "a factor the scorer weighs has no slider (or vice versa)"
  );
});

test("the dashboard defaults are the engine defaults", () => {
  for (const [factor, weight] of Object.entries(DEFAULT_WEIGHTS)) {
    assert.equal(
      (DEFAULT_INTELLIGENT_WEIGHTS as Record<string, number>)[factor],
      weight,
      `the slider default for "${factor}" is not the engine's default`
    );
  }
});

test("the dashboard defaults are a distribution", () => {
  const total = Object.values(DEFAULT_INTELLIGENT_WEIGHTS).reduce((a, b) => a + b, 0);
  assert.ok(
    validateWeights(DEFAULT_INTELLIGENT_WEIGHTS as never),
    `slider defaults sum to ${total.toFixed(4)}, so the percentages shown to the operator do not add up to 100%`
  );
});

// This is the one behaviour change in the fix, pinned rather than described.
// A config stored while the schema still stripped the two keys came back with
// them absent; `normalizeScoringWeights` read that as a deliberate zero and
// renormalized the remaining thirteen upward. Now the schema supplies the
// engine's own defaults, so the distribution is the intended one. Anyone who
// wants the old numbers back has to change this test on purpose.
test("a config saved without the two keys now scores with the engine's distribution", () => {
  const savedUnderTheOldSchema: Record<string, number> = { ...DEFAULT_WEIGHTS };
  delete savedUnderTheOldSchema.connectionDensity;
  delete savedUnderTheOldSchema.quality;

  const before = normalizeScoringWeights(savedUnderTheOldSchema as never);
  const after = normalizeScoringWeights(parseWeights(savedUnderTheOldSchema) as never);

  assert.equal(
    Number((before.quota ?? 0).toFixed(4)),
    0.1549,
    "before the fix the thirteen surviving weights were renormalized upward"
  );
  assert.equal(Number((after.quota ?? 0).toFixed(4)), 0.1429, "now they are the engine's values");
  assert.equal(before.connectionDensity ?? 0, 0, "anti-concentration used to be silently off");
  assert.ok((after.connectionDensity ?? 0) > 0, "and now it votes, which is the point");
});
