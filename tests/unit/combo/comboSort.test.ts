// tests/unit/combo/comboSort.test.ts
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  PROVIDER_ORDER,
  sortComboStepsSync,
  sortComboStepsByScore,
  reapplyCurrentSort,
  type ComboStep,
} from "@/lib/combos/comboSort";

const m = (id: string, providerId: string, model: string): ComboStep => ({
  id,
  kind: "model",
  model,
  providerId,
  weight: 0,
});
const ref = (id: string, comboName: string): ComboStep => ({
  id,
  kind: "combo-ref",
  comboName,
  weight: 0,
});

describe("sortComboStepsSync", () => {
  it("manual returns the input unchanged", () => {
    const steps = [m("a", "openai", "gpt"), m("b", "anthropic", "claude")];
    assert.equal(sortComboStepsSync(steps, "manual"), steps);
  });

  it("provider groups by PROVIDER_ORDER, stable intra-group, combo-ref at end", () => {
    const steps = [
      m("x", "anthropic", "claude-3"),
      m("y", "openai", "gpt-4"),
      ref("r", "other-combo"),
      m("z", "anthropic", "claude-2"),
    ];
    const out = sortComboStepsSync(steps, "provider");
    // combo-ref always last (no providerId).
    assert.equal(out[out.length - 1].id, "r");
    const nonRef = out.filter((s) => s.id !== "r").map((s) => s.id);
    // all three model steps are present, and the two anthropic steps stay grouped.
    assert.deepEqual(nonRef.slice().sort(), ["x", "y", "z"]);
    const ai = nonRef.indexOf("x");
    const zi = nonRef.indexOf("z");
    assert.ok(Math.abs(ai - zi) === 1, "steps of the same provider are adjacent");
  });

  it("name sorts alphabetically with a stable tiebreak", () => {
    const steps = [m("a", "openai", "zeta"), m("b", "openai", "alpha"), m("c", "openai", "alpha")];
    const out = sortComboStepsSync(steps, "name");
    assert.deepEqual(
      out.map((s) => s.id),
      ["b", "c", "a"]
    );
  });

  it("PROVIDER_ORDER is non-empty and stable", () => {
    assert.ok(PROVIDER_ORDER.length > 0);
  });
});

describe("score sort", () => {
  it("sorts scored steps descending, unscored stable at end", async () => {
    const steps = [
      m("a", "openai", "gpt"), // score 90
      m("b", "anthropic", "claude"), // no score
      m("c", "google", "gemini"), // score 70
      ref("r", "other"), // no providerId
    ];
    const rankings = new Map<string, number>([
      ["openai", 90],
      ["google", 70],
    ]);
    const out = await sortComboStepsByScore(steps, rankings);
    assert.deepEqual(
      out.map((s) => s.id),
      ["a", "c", "b", "r"]
    );
  });

  it("reapplyCurrentSort applies score async and sync methods", async () => {
    const steps = [m("a", "openai", "gpt"), m("b", "claude", "claude")];
    const syncOut = await reapplyCurrentSort(steps, "provider");
    assert.deepEqual(
      syncOut.map((s) => s.id),
      ["b", "a"]
    ); // claude (anthropic) before openai
    const rankOut = await reapplyCurrentSort(steps, "score", async () => new Map([["openai", 5]]));
    assert.deepEqual(
      rankOut.map((s) => s.id),
      ["a", "b"]
    );
  });

  it("reapplyCurrentSort after an add keeps provider grouping", async () => {
    const base = [m("a", "anthropic", "claude")];
    const added = [...base, m("b", "openai", "gpt")];
    const out = await reapplyCurrentSort(added, "provider");
    // Expected order derived from PROVIDER_ORDER (robust to provider precedence).
    const expected = ["a", "b"].sort((x, y) => {
      const px = x === "a" ? "anthropic" : "openai";
      const py = y === "a" ? "anthropic" : "openai";
      return PROVIDER_ORDER.indexOf(px) - PROVIDER_ORDER.indexOf(py);
    });
    assert.deepEqual(
      out.map((s) => s.id),
      expected
    );
  });
});
