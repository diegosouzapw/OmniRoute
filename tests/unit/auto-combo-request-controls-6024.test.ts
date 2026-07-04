import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for #6024 / #6025 / #6023 — per-request auto-combo routing controls.
// A caller can steer an `auto` combo per request via two headers:
//   X-OmniRoute-Mode:   fast | balanced | quality | <raw mode-pack name>   (#6024/#6025)
//   X-OmniRoute-Budget: <max USD per request>                              (#6023)
// The pure resolvers below turn the raw header values into an override the
// auto-combo engine already knows how to consume (config.modePack / config.budgetCap).

const { resolveRequestModePack, parseRequestBudgetCap } = await import(
  "../../open-sse/services/autoCombo/requestControls.ts"
);

test("#6024 friendly presets map to mode packs and override combo config", () => {
  assert.deepEqual(resolveRequestModePack("fast"), { override: true, modePack: "ship-fast" });
  assert.deepEqual(resolveRequestModePack("quality"), {
    override: true,
    modePack: "quality-first",
  });
  assert.deepEqual(resolveRequestModePack("cheap"), { override: true, modePack: "cost-saver" });
  assert.deepEqual(resolveRequestModePack("reliable"), {
    override: true,
    modePack: "reliability-first",
  });
});

test("#6024 'balanced'/'default' override to the default profile (no pack)", () => {
  assert.deepEqual(resolveRequestModePack("balanced"), { override: true, modePack: undefined });
  assert.deepEqual(resolveRequestModePack("default"), { override: true, modePack: undefined });
});

test("#6025 raw mode-pack names pass through (case-insensitive, trimmed)", () => {
  assert.deepEqual(resolveRequestModePack("ship-fast"), {
    override: true,
    modePack: "ship-fast",
  });
  assert.deepEqual(resolveRequestModePack("  Quality-First  "), {
    override: true,
    modePack: "quality-first",
  });
});

test("#6025 unknown/empty/non-string input does NOT override (keeps combo config)", () => {
  for (const bad of ["", "   ", "not-a-real-pack", null, undefined, 42, {}]) {
    assert.deepEqual(
      resolveRequestModePack(bad as unknown),
      { override: false, modePack: undefined },
      `input ${JSON.stringify(bad)} must not override`
    );
  }
});

test("#6023 budget header parses a positive USD amount, rejects garbage", () => {
  assert.equal(parseRequestBudgetCap("0.05"), 0.05);
  assert.equal(parseRequestBudgetCap("2"), 2);
  assert.equal(parseRequestBudgetCap(1.5), 1.5);
  assert.equal(parseRequestBudgetCap("  0.5 "), 0.5);
  // rejected → undefined (fall back to combo config)
  for (const bad of ["0", "-1", "abc", "", "  ", null, undefined, NaN, Infinity, 0, -3]) {
    assert.equal(
      parseRequestBudgetCap(bad as unknown),
      undefined,
      `input ${JSON.stringify(bad)} must be rejected`
    );
  }
});
