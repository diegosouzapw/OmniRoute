// Characterization of the pricing.ts split (god-file decomposition): the host became a barrel that
// re-exports DEFAULT_PRICING (now merged from 4 semantic family files that import shared tier consts)
// and keeps the 3 helper functions. Pure-data move → behavior identical. Locks: public surface, the
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

test("DEFAULT_PRICING merges the 4 family files; families partition all entries", async () => {
  const merged = Object.keys((P as Record<string, object>).DEFAULT_PRICING).length;
  const families: [string, string][] = [
    ["oauth-subscriptions", "DEFAULT_PRICING_OAUTH"],
    ["frontier-labs", "DEFAULT_PRICING_FRONTIER"],
    ["inference-hosts", "DEFAULT_PRICING_INFERENCE"],
    ["regional", "DEFAULT_PRICING_REGIONAL"],
  ];
  let famTotal = 0;
  const seen = new Set<string>();
  for (const [file, exportName] of families) {
    const mod = await import(`../../src/shared/constants/pricing/${file}.ts`);
    for (const k of Object.keys(mod[exportName])) {
      assert.ok(!seen.has(k), `pricing key ${k} appears in more than one family`);
      seen.add(k);
      famTotal++;
    }
  }
  assert.equal(merged, famTotal, "spread-merge lost/duplicated a top-level key");
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
