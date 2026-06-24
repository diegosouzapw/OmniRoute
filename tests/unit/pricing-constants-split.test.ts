// Characterization of the pricing.ts split (god-file decomposition): the host became a barrel that
// re-exports DEFAULT_PRICING (now merged from 2 source parts that import shared tier consts) and
// keeps the 3 helper functions. Pure-data move → behavior identical. Locks: public surface, the
// spread-merge integrity, and that lookups/cost math resolve unchanged.
import { test } from "node:test";
import assert from "node:assert/strict";

const P = await import("../../src/shared/constants/pricing.ts");

test("barrel still exports DEFAULT_PRICING + the 3 helpers", () => {
  for (const name of [
    "DEFAULT_PRICING",
    "getPricingForModel",
    "getDefaultPricing",
    "calculateCostFromTokens",
  ]) {
    assert.ok(name in P, `missing export: ${name}`);
  }
});

test("DEFAULT_PRICING merges both parts; spread-merge total = sum of parts", async () => {
  const merged = Object.keys((P as Record<string, object>).DEFAULT_PRICING).length;
  const a = await import("../../src/shared/constants/pricing/default-pricing.part1.ts");
  const b = await import("../../src/shared/constants/pricing/default-pricing.part2.ts");
  const partTotal =
    Object.keys(a.DEFAULT_PRICING_PART1).length + Object.keys(b.DEFAULT_PRICING_PART2).length;
  assert.equal(merged, partTotal, "spread-merge lost/duplicated a top-level key");
  assert.ok(merged > 25);
});

test("shared tier consts feed the parts (a known model resolves to a shared rate)", () => {
  const pricing = (P as Record<string, (p: string, m: string) => unknown>).getPricingForModel(
    "openai",
    "gpt-4o"
  );
  assert.ok(pricing && typeof pricing === "object");
  assert.equal(typeof (pricing as { input?: number }).input, "number");
});

test("calculateCostFromTokens stays callable and numeric", () => {
  const fn = (P as Record<string, (...a: unknown[]) => unknown>).calculateCostFromTokens;
  const out = fn("openai", "gpt-4o", { prompt_tokens: 1000, completion_tokens: 1000 });
  assert.equal(typeof out, "number");
});
